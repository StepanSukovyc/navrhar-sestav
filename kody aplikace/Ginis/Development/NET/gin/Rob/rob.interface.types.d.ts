/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rob.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rob.Interface\Gordic.Rob.Interface.csproj
*    created     2026-02-16 14:33:55
*    files       Dto\BaseDto\GGincstaDto.d.ts
*                Dto\BaseDto\GNemskatDto.d.ts
*                Dto\BaseDto\GNemsobcDto.d.ts
*                Dto\BaseDto\GNemsosuDto.d.ts
*                Dto\BaseDto\GRobceakDto.d.ts
*                Dto\BaseDto\GRobcjmeDto.d.ts
*                Dto\BaseDto\GRobcksoDto.d.ts
*                Dto\BaseDto\GRobcrstDto.d.ts
*                Dto\BaseDto\GRobctpoDto.d.ts
*                Dto\BaseDto\GRobcvzdDto.d.ts
*                Dto\BaseDto\GRobddavDto.d.ts
*                Dto\BaseDto\GRobddopDto.d.ts
*                Dto\BaseDto\GRobddvsDto.d.ts
*                Dto\BaseDto\GRobdoprDto.d.ts
*                Dto\BaseDto\GRobdprnDto.d.ts
*                Dto\BaseDto\GRobdsidDto.d.ts
*                Dto\BaseDto\GRobdudaDto.d.ts
*                Dto\BaseDto\GRobdunlDto.d.ts
*                Dto\BaseDto\GRobdzzmDto.d.ts
*                Dto\BaseDto\GRobhidoDto.d.ts
*                Dto\BaseDto\GRobhosoDto.d.ts
*                Dto\BaseDto\GRoblakcDto.d.ts
*                Dto\BaseDto\GRoblszrDto.d.ts
*                Dto\BaseDto\GRobsadrDto.d.ts
*                Dto\BaseDto\GRobsbydDto.d.ts
*                Dto\BaseDto\GRobsdadDto.d.ts
*                Dto\BaseDto\GRobsdavDto.d.ts
*                Dto\BaseDto\GRobsduvDto.d.ts
*                Dto\BaseDto\GRobsidoDto.d.ts
*                Dto\BaseDto\GRobsjmeDto.d.ts
*                Dto\BaseDto\GRobsjubDto.d.ts
*                Dto\BaseDto\GRobsoknDto.d.ts
*                Dto\BaseDto\GRobsosoDto.d.ts
*                Dto\BaseDto\GRobspriDto.d.ts
*                Dto\BaseDto\GRobsprnDto.d.ts
*                Dto\BaseDto\GRobssezDto.d.ts
*                Dto\BaseDto\GRobssidDto.d.ts
*                Dto\BaseDto\GRobstdoDto.d.ts
*                Dto\BaseDto\GRobsudaDto.d.ts
*                Dto\BaseDto\GRobsuisDto.d.ts
*                Dto\BaseDto\GRobsunlDto.d.ts
*                Dto\BaseDto\GRobsvdnDto.d.ts
*                Dto\BaseDto\GRobsztpDto.d.ts
*                Dto\BaseDto\GRobtvolDto.d.ts
*                Dto\BaseDto\GRobtvsoDto.d.ts
*                Dto\BaseDto\GRobvjmeDto.d.ts
*                Dto\BaseDto\GRobvosoDto.d.ts
*                Dto\BaseDto\GRobvpriDto.d.ts
*                Dto\BaseDto\GRobvpruDto.d.ts
*                Dto\BaseDto\GRobvpzpDto.d.ts
*                Dto\BaseDto\GRobvrciDto.d.ts
*                Dto\BaseDto\GRobvstoDto.d.ts
*                Dto\BaseDto\GRobvvpoDto.d.ts
*                Dto\BaseDto\GSzrsadrDto.d.ts
*                Dto\BaseDto\GSzrsoboDto.d.ts
*                Dto\BaseDto\GSzrsrobDto.d.ts
*                Dto\ExtendedDto\GBydlistePotvrzOZmeneROBDto.d.ts
*                Dto\ExtendedDto\GDavkyAktObcaneDto.d.ts
*                Dto\ExtendedDto\GDavkyAktROBDto.d.ts
*                Dto\ExtendedDto\GDavkyAktVysKontrolyROBDto.d.ts
*                Dto\ExtendedDto\GDavkyMCDto.d.ts
*                Dto\ExtendedDto\GDavkySouborRobDto.d.ts
*                Dto\ExtendedDto\GDavkySouboryRobDto.d.ts
*                Dto\ExtendedDto\GDavkyZakDto.d.ts
*                Dto\ExtendedDto\GDavkyZakObcaneDto.d.ts
*                Dto\ExtendedDto\GDokladyZmenaPobytuROBDto.d.ts
*                Dto\ExtendedDto\GDorucovaciAdrROBDto.d.ts
*                Dto\ExtendedDto\GDruhaStranaKartyROBDto.d.ts
*                Dto\ExtendedDto\GDruhyNezarazeniDto.d.ts
*                Dto\ExtendedDto\GDuvodyPristupuROBDto.d.ts
*                Dto\ExtendedDto\GGDPRParamsROBDto.d.ts
*                Dto\ExtendedDto\GListPrihlaseniKeZmenamISZRROBDto.d.ts
*                Dto\ExtendedDto\GLogyROBDto.d.ts
*                Dto\ExtendedDto\GObjektAdresaROBDto.d.ts
*                Dto\ExtendedDto\GObjektHistROBDto.d.ts
*                Dto\ExtendedDto\GObjektROBDto.d.ts
*                Dto\ExtendedDto\GOkresROBDto.d.ts
*                Dto\ExtendedDto\GOpravnenaOsobaROBDto.d.ts
*                Dto\ExtendedDto\GOsoba1ROBDto.d.ts
*                Dto\ExtendedDto\GOsobaArchivBydlistROBDto.d.ts
*                Dto\ExtendedDto\GOsobaArchivPrijmeniROBDto.d.ts
*                Dto\ExtendedDto\GOsobaArchivRCROBDto.d.ts
*                Dto\ExtendedDto\GOsobaBydlisteROBDto.d.ts
*                Dto\ExtendedDto\GOsobaDalsiJmenaROBDto.d.ts
*                Dto\ExtendedDto\GOsobaDalsiObcanstviROBDto.d.ts
*                Dto\ExtendedDto\GOsobaDetailROBDto.d.ts
*                Dto\ExtendedDto\GOsobaDiteROBDto.d.ts
*                Dto\ExtendedDto\GOsobaJmenoROBDto.d.ts
*                Dto\ExtendedDto\GOsobaPrijmeniROBDto.d.ts
*                Dto\ExtendedDto\GOsobaPrukazROBDto.d.ts
*                Dto\ExtendedDto\GOsobaRodinaROBDto.d.ts
*                Dto\ExtendedDto\GOsobaRodPrislDetailROBDto.d.ts
*                Dto\ExtendedDto\GOsobaRodPrislROBDto.d.ts
*                Dto\ExtendedDto\GOsobaSpolubydliciROBDto.d.ts
*                Dto\ExtendedDto\GOsobaVypisGDPRROBDto.d.ts
*                Dto\ExtendedDto\GOsobaVyrazeniROBDto.d.ts
*                Dto\ExtendedDto\GOsobaVztahROBDto.d.ts
*                Dto\ExtendedDto\GSprPoplatekROBDto.d.ts
*                Dto\ExtendedDto\GSprPoplatkyROBDto.d.ts
*                Dto\ExtendedDto\GSyncRobROBDto.d.ts
*                Dto\ExtendedDto\GSyncROBvsESUROBDto.d.ts
*                Dto\ExtendedDto\GSzrsadrDsROBDto.d.ts
*                Dto\ExtendedDto\GSZRSROBDto.d.ts
*                Dto\ExtendedDto\GTiskParamsKartaRobDto.d.ts
*                Dto\ExtendedDto\GTypJmenaROBDto.d.ts
*                Dto\ExtendedDto\GUdajeIseoROBDto.d.ts
*                Dto\ExtendedDto\GUdajeIseoRodPrislROBDto.d.ts
*                Dto\ExtendedDto\GUdalostOvdoveniROBDto.d.ts
*                Dto\ExtendedDto\GUdalostROBDto.d.ts
*                Dto\ExtendedDto\GUdalostRozvodROBDto.d.ts
*                Dto\ExtendedDto\GUdalostSnatekROBDto.d.ts
*                Dto\ExtendedDto\GUdalostUcastnikROBDto.d.ts
*                Dto\ExtendedDto\GUdalostZaznamROBDto.d.ts
*                Dto\ExtendedDto\GVyhledaniOsobyROBDto.d.ts
*                Dto\ExtendedDto\GZadostISROBDto.d.ts
*                Dto\ExtendedDto\GZakazTPROBDto.d.ts
*                Dto\ExtendedDto\GZmenySzrROBDto.d.ts
*                Dto\Filters\GListArchivniROBFilterDto.d.ts
*                Dto\Filters\GOsobaROBFilterDto.d.ts
*                Dto\Permissions\GRobBaseDetailPermissions.d.ts
*                Dto\PorovnaniREN\GBytyRENROBDto.d.ts
*                Dto\PorovnaniREN\GKatastralniUzemiROBDto.d.ts
*                Dto\PorovnaniREN\GObecKatastruNemROBDto.d.ts
*                Dto\PorovnaniREN\GPrazdneObjektyROBDto.d.ts
*                Dto\PorovnaniREN\GRenDetPorovnaniROBDto.d.ts
*                Dto\PorovnaniREN\GRenPorovnaniROBDto.d.ts
*                Dto\PorovnaniREN\GRodinneDomyRENROBDto.d.ts
*                Dto\Readers\GReaderRobstdoDto.d.ts
*                Dto\SeznamyRob\GListArchivniEvidenceROBDto.d.ts
*                Dto\SeznamyRob\GListISZRZUDROBDto.d.ts
*                Dto\SeznamyRob\GListOsobRopBezOmezeniROBDto.d.ts
*                Dto\SeznamyRob\GListOsobyRopROBDto.d.ts
*                Dto\SeznamyRob\GListServisCelaEvidenceROBDto.d.ts
*                Dto\SeznamyUdalosti\GListUdalostiNarozeniROBDto.d.ts
*                Dto\SeznamyUdalosti\GListUdalostiPrijmeniJmenoROBDto.d.ts
*                Dto\SeznamyUdalosti\GListUdalostiROBDto.d.ts
*                Dto\SeznamyUdalosti\GListUdalostiSnatekRozvodROBDto.d.ts
*                Dto\SeznamyUdalosti\GListUdalostiUmrtiROBDto.d.ts
*                Dto\SeznamyUdalosti\GListUdalostiZmenyPobytuROBDto.d.ts
*                Dto\Statistika\GStatistikaBydlisteROBDto.d.ts
*                Dto\Statistika\GStatistikaOstatniROBDto.d.ts
*                Dto\Statistika\GStatistikaPodilObyvatelROBDto.d.ts
*                Dto\Statistika\GStatistikaPodkladProCOROBDto.d.ts
*                Dto\Statistika\GStatistikaPohybObyvatelROBDto.d.ts
*                Dto\Statistika\GStatistikaPrijmeniJmenoROBDto.d.ts
*                Dto\Statistika\GStatistikaStavObyvatelROBDto.d.ts
*                Dto\Statistika\GStatistikaVekovaStrukturaROBDto.d.ts
*                Dto\Statistika\GStatistikaVekSlozObceROBDto.d.ts
*                Dto\Statistika\GStatistikaVolObvodyROBDto.d.ts
*                Gdpr\Gordic.Rob.Interface.ZmenaOsoHistorieEnum.d.ts
*                Isl\Gordic.Rob.Interface.IGBydlistePotvrzOZmeneROB.d.ts
*                Isl\Gordic.Rob.Interface.IGDokladyZmenaPobytuROB.d.ts
*                Isl\Gordic.Rob.Interface.IGDorucovaciAdrROB.d.ts
*                Isl\Gordic.Rob.Interface.IGDruhTrvalehoPobytuROB.d.ts
*                Isl\Gordic.Rob.Interface.IGDuvodyPristupuROB.d.ts
*                Isl\Gordic.Rob.Interface.IGJubileaROB.d.ts
*                Isl\Gordic.Rob.Interface.IGListArchivniEvidenceROB.d.ts
*                Isl\Gordic.Rob.Interface.IGListISZRZUDROB.d.ts
*                Isl\Gordic.Rob.Interface.IGListOsobRopBezOmezeniROB.d.ts
*                Isl\Gordic.Rob.Interface.IGListOsobyRopROB.d.ts
*                Isl\Gordic.Rob.Interface.IGListPrihlaseniKeZmenamISZRROBROB.d.ts
*                Isl\Gordic.Rob.Interface.IGListServisCelaEvidenceROB.d.ts
*                Isl\Gordic.Rob.Interface.IGlogyROB.d.ts
*                Isl\Gordic.Rob.Interface.IGObjektAdresaROB.d.ts
*                Isl\Gordic.Rob.Interface.IGObjektHistROB.d.ts
*                Isl\Gordic.Rob.Interface.IGObjektROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOkresROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOpravnenaOsobaROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsoba1ROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaArchivPrijmeniROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaArchivRCROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaBydlisteROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaDalsiJmenaROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaDalsiObcanstviROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaDetailROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaJmenoROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaPrijmeniROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaPrukazROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaRodPrislROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaSpolubydliciROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaVypisGDPRROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaVyrazeniROB.d.ts
*                Isl\Gordic.Rob.Interface.IGOsobaVztahROB.d.ts
*                Isl\Gordic.Rob.Interface.IGPrirustekROB.d.ts
*                Isl\Gordic.Rob.Interface.IGSprPoplatkyROB.d.ts
*                Isl\Gordic.Rob.Interface.IGStatistikaVekSlozeniObceROB.d.ts
*                Isl\Gordic.Rob.Interface.IGSyncROBvsESUROB.d.ts
*                Isl\Gordic.Rob.Interface.IGUdalostROB.d.ts
*                Isl\Gordic.Rob.Interface.IGUdalostZaznamROB.d.ts
*                Isl\Gordic.Rob.Interface.IGZadostISROB.d.ts
*                Isl\Gordic.Rob.Interface.IGZakazTPROB.d.ts
*                Isl\Gordic.Rob.Interface.IGZmenySzrROB.d.ts
*                Isl\Davky\Gordic.Rob.Interface.IGDavkyAktObcaneROB.d.ts
*                Isl\Davky\Gordic.Rob.Interface.IGDavkyAktROB.d.ts
*                Isl\Davky\Gordic.Rob.Interface.IGDavkyZakObcaneROB.d.ts
*                Isl\Davky\Gordic.Rob.Interface.IGDavkyZakROB.d.ts
*                Isl\PorovnaniREN\Gordic.Rob.Interface.IGPorovnaniRENROB.d.ts
*                Isl\PorovnaniREN\Gordic.Rob.Interface.IGRenDetPorovnaniROB.d.ts
*                Isl\PorovnaniREN\Gordic.Rob.Interface.IGRenPorovnaniROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaBydlisteROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaOstatniROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPoctyObyvatelVolObvodyROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPoctyPrijemniAJmenROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPodilObyvatelROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPodkladProCOROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPohybObyvatelROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaStavObyvatelROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaVekovaStrukturaROB.d.ts
*                Isl\Statistika\Gordic.Rob.Interface.IGStatistikaVekoveSlozeniObceROB.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GGincstaDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:gincsta
	*      Stát
	*/
	interface GGincstaDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Stát*/
		stat?: number|null;
		/**Stát*/
		stat_txt?: string|null;
		/**Plný anglický název (ISO 3166-1)*/
		stat_txt_orig?: string|null;
		/**Zkrácený český název*/
		stat_zkr?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Dvoumístný alfabetický kód (A-2)
		*      Kódy podle Standardů státního informačního systému - Dvoumístný alfabetický kód (A-2)
		*/
		stat_sis_aa?: string|null;
		/**Trojmístný alfabetický kód (A-3)
		*      Kódy podle Standardů státního informačního systému - Trojmístný alfabetický kód (A-3)
		*/
		stat_sis_aaa?: string|null;
		/**Trojmístný numerický kód (N-3)
		*       Kódy podle Standardů státního informačního systému - Trojmístný numerický kód (N-3)
		*/
		stat_sis_nnn?: number|null;
		/**Aktivita
		*      Aktivita záznamu
		*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**CS podoba názvu
		*      Pomocná forma uložení názvu státu podel pravidel CS sloupců
		*/
		cs_stat_txt?: string|null;
		/**Příznak EU
		*      Příznak, že stát patří do skupiny států EU
		*/
		priz_eu?: number|null;
		/**Kód země EU*/
		kod_zeme_eu?: string|null;
		/**Světadíl*/
		svetadil?: number|null;
		/**Příznak IBAN*/
		priz_iban?: number|null;
		/**Kód podle ARI*/
		stat_csu?: number|null;
		/**?*/
		stat_mf?: number|null;
		/**ID přihlášení*/
		ixs_lpc?: string|null;
		/**Zkrácený anglický název*/
		stat_zkr_orig?: string|null;
		/**?*/
		priz_sepa?: number|null;
	}
	const enum GGincstaDtoNames { stat = "stat", stat_txt = "stat_txt", stat_txt_orig = "stat_txt_orig", stat_zkr = "stat_zkr", k_v = "k_v", k_s = "k_s", stat_sis_aa = "stat_sis_aa", stat_sis_aaa = "stat_sis_aaa", stat_sis_nnn = "stat_sis_nnn", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs_stat_txt = "cs_stat_txt", priz_eu = "priz_eu", kod_zeme_eu = "kod_zeme_eu", svetadil = "svetadil", priz_iban = "priz_iban", stat_csu = "stat_csu", stat_mf = "stat_mf", ixs_lpc = "ixs_lpc", stat_zkr_orig = "stat_zkr_orig", priz_sepa = "priz_sepa", Permissions = "Permissions",}
	const enum GGincstaDtoFragments { stat = "Base", stat_txt = "Base", stat_txt_orig = "Base", stat_zkr = "Base", k_v = "Base", k_s = "Base", stat_sis_aa = "Base", stat_sis_aaa = "Base", stat_sis_nnn = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cs_stat_txt = "Base", priz_eu = "Base", kod_zeme_eu = "Base", svetadil = "Base", priz_iban = "Base", stat_csu = "Base", stat_mf = "Base", ixs_lpc = "Base", stat_zkr_orig = "Base", priz_sepa = "Base", Permissions = "*",}
	const enum GGincstaDtoTypes { stat = "number", stat_txt = "string", stat_txt_orig = "string", stat_zkr = "string", k_v = "number", k_s = "string", stat_sis_aa = "string", stat_sis_aaa = "string", stat_sis_nnn = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs_stat_txt = "string", priz_eu = "number", kod_zeme_eu = "string", svetadil = "number", priz_iban = "number", stat_csu = "number", stat_mf = "number", ixs_lpc = "string", stat_zkr_orig = "string", priz_sepa = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GGincstaDtoTypeLengths { stat_txt = 254, stat_txt_orig = 254, stat_zkr = 100, k_s = 15, stat_sis_aa = 2, stat_sis_aaa = 3, zmenu_prov = 12, cs_stat_txt = 254, kod_zeme_eu = 2, ixs_lpc = 12, stat_zkr_orig = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GNemskatDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:nemskat
	*      Katastrální území
	*/
	interface GNemskatDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
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
		/**CS název*/
		cs_nazev?: string|null;
	}
	const enum GNemskatDtoNames { kod_kat_uzemi = "kod_kat_uzemi", kod_obce = "kod_obce", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prac_cislo = "prac_cislo", ciselna_rada = "ciselna_rada", cs_nazev = "cs_nazev", Permissions = "Permissions",}
	const enum GNemskatDtoFragments { kod_kat_uzemi = "Base", kod_obce = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", prac_cislo = "Base", ciselna_rada = "Base", cs_nazev = "Base", Permissions = "*",}
	const enum GNemskatDtoTypes { kod_kat_uzemi = "number", kod_obce = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prac_cislo = "number", ciselna_rada = "number", cs_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GNemskatDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 254, zmenu_prov = 12, cs_nazev = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GNemsobcDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:nemsobc
	*      Obec katastru nemovitostí
	*/
	interface GNemsobcDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
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
		/**CS název*/
		cs_nazev?: string|null;
	}
	const enum GNemsobcDtoNames { kod_obce = "kod_obce", kod_okresu = "kod_okresu", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs_nazev = "cs_nazev", Permissions = "Permissions",}
	const enum GNemsobcDtoFragments { kod_obce = "Base", kod_okresu = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cs_nazev = "Base", Permissions = "*",}
	const enum GNemsobcDtoTypes { kod_obce = "number", kod_okresu = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GNemsobcDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, cs_nazev = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GNemsosuDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:nemsosu
	*      Fyzická nebo právnická osoba jako vlastník nebo jiný oprávněný
	*/
	interface GNemsosuDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
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
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
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
		cs_nazev_osu?: string|null;
		cs_prijmeni?: string|null;
		cs_jmeno?: string|null;
	}
	const enum GNemsosuDtoNames { id_opr_subj = "id_opr_subj", stav_dat = "stav_dat", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", id_pr_kontx = "id_pr_kontx", id_rizeni_vzn = "id_rizeni_vzn", id_rizeni_zan = "id_rizeni_zan", id_opr_subj_1 = "id_opr_subj_1", id_opr_subj_2 = "id_opr_subj_2", id_zdroj = "id_zdroj", typ_opr_subj = "typ_opr_subj", char_opr_subj = "char_opr_subj", ico_num = "ico_num", doplnek_ico = "doplnek_ico", nazev_osu = "nazev_osu", nazev_u = "nazev_u", rodne_cislo = "rodne_cislo", titul_pred = "titul_pred", jmeno = "jmeno", jmeno_u = "jmeno_u", prijmeni = "prijmeni", prijmeni_u = "prijmeni_u", titul_za = "titul_za", cislo_domovni = "cislo_domovni", cislo_orient = "cislo_orient", nazev_ulice = "nazev_ulice", cast_obce = "cast_obce", obec = "obec", okres = "okres", stat = "stat", psc = "psc", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mestska_cast = "mestska_cast", cp_ce = "cp_ce", dat_vzniku2 = "dat_vzniku2", id_rizeni_vzn2 = "id_rizeni_vzn2", kod_adrm = "kod_adrm", id_opr_subj_nad = "id_opr_subj_nad", cs_nazev_osu = "cs_nazev_osu", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", Permissions = "Permissions",}
	const enum GNemsosuDtoFragments { id_opr_subj = "Base", stav_dat = "Base", dat_vzniku = "Base", dat_zaniku = "Base", id_pr_kontx = "Base", id_rizeni_vzn = "Base", id_rizeni_zan = "Base", id_opr_subj_1 = "Base", id_opr_subj_2 = "Base", id_zdroj = "Base", typ_opr_subj = "Base", char_opr_subj = "Base", ico_num = "Base", doplnek_ico = "Base", nazev_osu = "Base", nazev_u = "Base", rodne_cislo = "Base", titul_pred = "Base", jmeno = "Base", jmeno_u = "Base", prijmeni = "Base", prijmeni_u = "Base", titul_za = "Base", cislo_domovni = "Base", cislo_orient = "Base", nazev_ulice = "Base", cast_obce = "Base", obec = "Base", okres = "Base", stat = "Base", psc = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", mestska_cast = "Base", cp_ce = "Base", dat_vzniku2 = "Base", id_rizeni_vzn2 = "Base", kod_adrm = "Base", id_opr_subj_nad = "Base", cs_nazev_osu = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", Permissions = "*",}
	const enum GNemsosuDtoTypes { id_opr_subj = "string", stav_dat = "number", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", id_pr_kontx = "number", id_rizeni_vzn = "string", id_rizeni_zan = "string", id_opr_subj_1 = "string", id_opr_subj_2 = "string", id_zdroj = "string", typ_opr_subj = "string", char_opr_subj = "number", ico_num = "number", doplnek_ico = "number", nazev_osu = "string", nazev_u = "string", rodne_cislo = "string", titul_pred = "string", jmeno = "string", jmeno_u = "string", prijmeni = "string", prijmeni_u = "string", titul_za = "string", cislo_domovni = "number", cislo_orient = "string", nazev_ulice = "string", cast_obce = "string", obec = "string", okres = "string", stat = "string", psc = "number", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mestska_cast = "string", cp_ce = "number", dat_vzniku2 = "JsonDate", id_rizeni_vzn2 = "string", kod_adrm = "number", id_opr_subj_nad = "string", cs_nazev_osu = "string", cs_prijmeni = "string", cs_jmeno = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GNemsosuDtoTypeLengths { id_opr_subj = 30, id_rizeni_vzn = 30, id_rizeni_zan = 30, id_opr_subj_1 = 30, id_opr_subj_2 = 30, id_zdroj = 30, typ_opr_subj = 10, nazev_osu = 254, nazev_u = 254, rodne_cislo = 10, titul_pred = 35, jmeno = 100, jmeno_u = 100, prijmeni = 100, prijmeni_u = 100, titul_za = 35, cislo_orient = 4, nazev_ulice = 48, cast_obce = 48, obec = 48, okres = 48, stat = 100, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, mestska_cast = 48, id_rizeni_vzn2 = 30, id_opr_subj_nad = 30, cs_nazev_osu = 254, cs_prijmeni = 100, cs_jmeno = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobceakDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robceak
	*      Ekonomická aktivita
	*/
	interface GRobceakDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Ekonomická aktivita*/
		ekon_aktivita?: number|null;
		/**Ekonomická aktivita textově*/
		ekon_aktivita_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GRobceakDtoNames { ekon_aktivita = "ekon_aktivita", ekon_aktivita_txt = "ekon_aktivita_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", Permissions = "Permissions",}
	const enum GRobceakDtoFragments { ekon_aktivita = "Base", ekon_aktivita_txt = "Base", k_v = "Base", k_s = "Base", k_xml = "Base", Permissions = "*",}
	const enum GRobceakDtoTypes { ekon_aktivita = "number", ekon_aktivita_txt = "string", k_v = "number", k_s = "string", k_xml = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobceakDtoTypeLengths { ekon_aktivita_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobcjmeDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robcjme
	*      Typ jména
	*/
	interface GRobcjmeDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		typ_jme?: number|null;
		/**Typ jména textově*/
		typ_jme_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GRobcjmeDtoNames { typ_jme = "typ_jme", typ_jme_txt = "typ_jme_txt", k_v = "k_v", k_s = "k_s", Permissions = "Permissions",}
	const enum GRobcjmeDtoFragments { typ_jme = "Base", typ_jme_txt = "Base", k_v = "Base", k_s = "Base", Permissions = "*",}
	const enum GRobcjmeDtoTypes { typ_jme = "number", typ_jme_txt = "string", k_v = "number", k_s = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobcjmeDtoTypeLengths { typ_jme_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobcksoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robckso
	*      Kvalifikátor státního občanství
	*/
	interface GRobcksoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Kvalifikátor státního občanství*/
		kval_st_obc?: number|null;
		/**Kvalifikátor státního občanství textově*/
		kval_st_obc_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GRobcksoDtoNames { kval_st_obc = "kval_st_obc", kval_st_obc_txt = "kval_st_obc_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", Permissions = "Permissions",}
	const enum GRobcksoDtoFragments { kval_st_obc = "Base", kval_st_obc_txt = "Base", k_v = "Base", k_s = "Base", k_xml = "Base", Permissions = "*",}
	const enum GRobcksoDtoTypes { kval_st_obc = "number", kval_st_obc_txt = "string", k_v = "number", k_s = "string", k_xml = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobcksoDtoTypeLengths { kval_st_obc_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobcrstDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robcrst
	*      Rodinný stav
	*/
	interface GRobcrstDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		rod_stav?: number|null;
		rod_stav_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		rod_stav_txt_m?: string|null;
		rod_stav_txt_z?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GRobcrstDtoNames { rod_stav = "rod_stav", rod_stav_txt = "rod_stav_txt", k_v = "k_v", k_s = "k_s", rod_stav_txt_m = "rod_stav_txt_m", rod_stav_txt_z = "rod_stav_txt_z", k_xml = "k_xml", Permissions = "Permissions",}
	const enum GRobcrstDtoFragments { rod_stav = "Base", rod_stav_txt = "Base", k_v = "Base", k_s = "Base", rod_stav_txt_m = "Base", rod_stav_txt_z = "Base", k_xml = "Base", Permissions = "*",}
	const enum GRobcrstDtoTypes { rod_stav = "number", rod_stav_txt = "string", k_v = "number", k_s = "string", rod_stav_txt_m = "string", rod_stav_txt_z = "string", k_xml = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobcrstDtoTypeLengths { rod_stav_txt = 50, k_s = 15, rod_stav_txt_m = 50, rod_stav_txt_z = 50, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobctpoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robctpo
	*      Typ pobytu
	*/
	interface GRobctpoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
		/**Export do DDP*/
		export_ddp?: number|null;
	}
	const enum GRobctpoDtoNames { typ_pobytu = "typ_pobytu", typ_pobytu_txt = "typ_pobytu_txt", k_v = "k_v", k_s = "k_s", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", k_xml = "k_xml", export_ddp = "export_ddp", Permissions = "Permissions",}
	const enum GRobctpoDtoFragments { typ_pobytu = "Base", typ_pobytu_txt = "Base", k_v = "Base", k_s = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", k_xml = "Base", export_ddp = "Base", Permissions = "*",}
	const enum GRobctpoDtoTypes { typ_pobytu = "number", typ_pobytu_txt = "string", k_v = "number", k_s = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", k_xml = "string", export_ddp = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobctpoDtoTypeLengths { typ_pobytu_txt = 50, k_s = 15, zmenu_prov = 12, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobcvzdDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robcvzd
	*      Typy vzdělání
	*/
	interface GRobcvzdDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Vzdělání*/
		vzdelani?: number|null;
		/**Vzdělání textově*/
		vzdelani_txt?: string|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**Sloupec s možným využitím pro uložení údajů pro XML*/
		k_xml?: string|null;
	}
	const enum GRobcvzdDtoNames { vzdelani = "vzdelani", vzdelani_txt = "vzdelani_txt", k_v = "k_v", k_s = "k_s", k_xml = "k_xml", Permissions = "Permissions",}
	const enum GRobcvzdDtoFragments { vzdelani = "Base", vzdelani_txt = "Base", k_v = "Base", k_s = "Base", k_xml = "Base", Permissions = "*",}
	const enum GRobcvzdDtoTypes { vzdelani = "number", vzdelani_txt = "string", k_v = "number", k_s = "string", k_xml = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobcvzdDtoTypeLengths { vzdelani_txt = 50, k_s = 15, k_xml = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobddavDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robddav
	*      Detail zakádací dávky s údaji o občanech
	*/
	interface GRobddavDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor dávky*/
		ixs_dav?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Rodné příjmení*/
		rod_prij?: string|null;
		/**Rodné číslo*/
		rod_cis?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		cobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Doplněk čísla domovního*/
		dcd?: string|null;
		/**Číslo domovní*/
		cislo_dom?: string|null;
		/**Číslo orientační*/
		cislo_or?: string|null;
		/**Psč*/
		psc?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Místo narození*/
		misto_naroz?: string|null;
		/**Stát narození*/
		m_nar_stat?: string|null;
		/**Datum úmrtí*/
		dat_umrti?: JsonDate|null;
		/**Místo úmrtí*/
		misto_umrti?: string|null;
		/**Stát úmrtí*/
		m_umr_stat?: string|null;
		/**Občanství*/
		obcanstvi?: string|null;
		/**Doručovací adresa obec*/
		dor_cr_obec?: string|null;
		/**Doručovací adresa část obce*/
		dor_cr_cobce?: string|null;
		/**Doručovací adresa ulice*/
		dor_cr_ulice?: string|null;
		/**Doručovací adresa doplněk čísla domovního*/
		dor_cr_dcd?: string|null;
		/**Doručovací adresa číslo domovní*/
		dor_cr_c_dom?: string|null;
		/**Doručovací adresa číslo orientační*/
		dor_cr_c_or?: string|null;
		/**Doručovací adresa psč*/
		dor_cr_psc?: string|null;
		/**Doručovací adresa ostatní*/
		dor_ostatni?: string|null;
		/**Doručovací adresa typ*/
		dor_adr_typ?: string|null;
		/**Datum od*/
		datum_od?: JsonDate|null;
		/**Datum do*/
		datum_do?: JsonDate|null;
		typ_ds?: string|null;
		ds_id?: string|null;
		/**Stav jména*/
		stav_jmeno?: number|null;
		/**Stav příjmení*/
		stav_prij?: number|null;
		/**Stav adresy*/
		stav_adresa?: number|null;
		/**Stav data narození*/
		stav_dat_nar?: number|null;
		/**Stav místa narození*/
		stav_m_nar?: number|null;
		/**Stav Data úmrtí*/
		stav_dat_umr?: number|null;
		/**Stav místa úmrtí*/
		stav_m_umr?: number|null;
		/**Stav občanství*/
		stav_obcanstvi?: number|null;
		/**Stav doručovací adresy*/
		stav_d_adresa?: number|null;
		/**Stav datové schránky*/
		stav_dat_sch?: number|null;
		/**Příznak Zpracování*/
		zpracovano?: number|null;
		/**Stav v rob*/
		stav_rob?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt_unl?: string|null;
	}
	const enum GRobddavDtoNames { ixs_dav = "ixs_dav", por_cislo = "por_cislo", jmeno = "jmeno", prijmeni = "prijmeni", rod_prij = "rod_prij", rod_cis = "rod_cis", ixs_oso = "ixs_oso", obec = "obec", cobce = "cobce", ulice = "ulice", dcd = "dcd", cislo_dom = "cislo_dom", cislo_or = "cislo_or", psc = "psc", dat_naroz = "dat_naroz", misto_naroz = "misto_naroz", m_nar_stat = "m_nar_stat", dat_umrti = "dat_umrti", misto_umrti = "misto_umrti", m_umr_stat = "m_umr_stat", obcanstvi = "obcanstvi", dor_cr_obec = "dor_cr_obec", dor_cr_cobce = "dor_cr_cobce", dor_cr_ulice = "dor_cr_ulice", dor_cr_dcd = "dor_cr_dcd", dor_cr_c_dom = "dor_cr_c_dom", dor_cr_c_or = "dor_cr_c_or", dor_cr_psc = "dor_cr_psc", dor_ostatni = "dor_ostatni", dor_adr_typ = "dor_adr_typ", datum_od = "datum_od", datum_do = "datum_do", typ_ds = "typ_ds", ds_id = "ds_id", stav_jmeno = "stav_jmeno", stav_prij = "stav_prij", stav_adresa = "stav_adresa", stav_dat_nar = "stav_dat_nar", stav_m_nar = "stav_m_nar", stav_dat_umr = "stav_dat_umr", stav_m_umr = "stav_m_umr", stav_obcanstvi = "stav_obcanstvi", stav_d_adresa = "stav_d_adresa", stav_dat_sch = "stav_dat_sch", zpracovano = "zpracovano", stav_rob = "stav_rob", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_pobytu_txt_unl = "typ_pobytu_txt_unl", Permissions = "Permissions",}
	const enum GRobddavDtoFragments { ixs_dav = "Base", por_cislo = "Base", jmeno = "Base", prijmeni = "Base", rod_prij = "Base", rod_cis = "Base", ixs_oso = "Base", obec = "Base", cobce = "Base", ulice = "Base", dcd = "Base", cislo_dom = "Base", cislo_or = "Base", psc = "Base", dat_naroz = "Base", misto_naroz = "Base", m_nar_stat = "Base", dat_umrti = "Base", misto_umrti = "Base", m_umr_stat = "Base", obcanstvi = "Base", dor_cr_obec = "Base", dor_cr_cobce = "Base", dor_cr_ulice = "Base", dor_cr_dcd = "Base", dor_cr_c_dom = "Base", dor_cr_c_or = "Base", dor_cr_psc = "Base", dor_ostatni = "Base", dor_adr_typ = "Base", datum_od = "Base", datum_do = "Base", typ_ds = "Base", ds_id = "Base", stav_jmeno = "Base", stav_prij = "Base", stav_adresa = "Base", stav_dat_nar = "Base", stav_m_nar = "Base", stav_dat_umr = "Base", stav_m_umr = "Base", stav_obcanstvi = "Base", stav_d_adresa = "Base", stav_dat_sch = "Base", zpracovano = "Base", stav_rob = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", typ_pobytu_txt_unl = "Base", Permissions = "*",}
	const enum GRobddavDtoTypes { ixs_dav = "string", por_cislo = "number", jmeno = "string", prijmeni = "string", rod_prij = "string", rod_cis = "string", ixs_oso = "string", obec = "string", cobce = "string", ulice = "string", dcd = "string", cislo_dom = "string", cislo_or = "string", psc = "string", dat_naroz = "JsonDate", misto_naroz = "string", m_nar_stat = "string", dat_umrti = "JsonDate", misto_umrti = "string", m_umr_stat = "string", obcanstvi = "string", dor_cr_obec = "string", dor_cr_cobce = "string", dor_cr_ulice = "string", dor_cr_dcd = "string", dor_cr_c_dom = "string", dor_cr_c_or = "string", dor_cr_psc = "string", dor_ostatni = "string", dor_adr_typ = "string", datum_od = "JsonDate", datum_do = "JsonDate", typ_ds = "string", ds_id = "string", stav_jmeno = "number", stav_prij = "number", stav_adresa = "number", stav_dat_nar = "number", stav_m_nar = "number", stav_dat_umr = "number", stav_m_umr = "number", stav_obcanstvi = "number", stav_d_adresa = "number", stav_dat_sch = "number", zpracovano = "number", stav_rob = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_pobytu_txt_unl = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobddavDtoTypeLengths { ixs_dav = 12, jmeno = 100, prijmeni = 100, rod_prij = 100, rod_cis = 10, ixs_oso = 12, obec = 48, cobce = 48, ulice = 48, dcd = 1, cislo_dom = 6, cislo_or = 6, psc = 6, misto_naroz = 100, m_nar_stat = 50, misto_umrti = 100, m_umr_stat = 50, obcanstvi = 50, dor_cr_obec = 48, dor_cr_cobce = 48, dor_cr_ulice = 48, dor_cr_dcd = 1, dor_cr_c_dom = 6, dor_cr_c_or = 6, dor_cr_psc = 6, dor_ostatni = 254, dor_adr_typ = 3, typ_ds = 3, ds_id = 100, poznamka = 254, zmenu_prov = 12, typ_pobytu_txt_unl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobddopDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robddop
	*      Doklady předložené při změně pobytu
	*/
	interface GRobddopDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor bydliště*/
		ixs_byd?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Identifikátor dokladu*/
		ixs_tdo?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobddopDtoNames { ixs_byd = "ixs_byd", por_cislo = "por_cislo", ixs_tdo = "ixs_tdo", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobddopDtoFragments { ixs_byd = "Base", por_cislo = "Base", ixs_tdo = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobddopDtoTypes { ixs_byd = "string", por_cislo = "number", ixs_tdo = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobddopDtoTypeLengths { ixs_byd = 12, ixs_tdo = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobddvsDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robddvs
	*      Detail dávky seznamu voličů
	*/
	interface GRobddvsDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Idenifikátor dávky*/
		ixs_dvs?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Id voliče*/
		id_volic?: number|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Identifikátor Seznamu*/
		ixs_sez?: string|null;
		/**Okrsek*/
		ido?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Rodné příjmení*/
		rod_prij?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		cobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Doplněk čísla domovního*/
		dcd?: string|null;
		/**Číslo domovní*/
		cislo_dom?: string|null;
		/**Číslo orientační*/
		cislo_or?: string|null;
		/**Občanství*/
		obcanstvi?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Místo narození*/
		misto_naroz?: string|null;
		/**Stát narození*/
		m_nar_stat?: string|null;
		/**Stav jméno*/
		stav_jmeno?: number|null;
		/**Stav příjmení*/
		stav_prij?: number|null;
		/**Stav adresa*/
		stav_adresa?: number|null;
		/**Stav občanství*/
		stav_obcanstvi?: number|null;
		/**Stav datum narození*/
		stav_dat_nar?: number|null;
		/**Zpracováno*/
		zpracovano?: number|null;
		/**Stav ROV*/
		stav_rov?: number|null;
		/**Stav ROB*/
		stav_rob?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobddvsDtoNames { ixs_dvs = "ixs_dvs", por_cislo = "por_cislo", id_volic = "id_volic", ixs_oso = "ixs_oso", ixs_sez = "ixs_sez", ido = "ido", jmeno = "jmeno", prijmeni = "prijmeni", rod_prij = "rod_prij", obec = "obec", cobce = "cobce", ulice = "ulice", dcd = "dcd", cislo_dom = "cislo_dom", cislo_or = "cislo_or", obcanstvi = "obcanstvi", dat_naroz = "dat_naroz", misto_naroz = "misto_naroz", m_nar_stat = "m_nar_stat", stav_jmeno = "stav_jmeno", stav_prij = "stav_prij", stav_adresa = "stav_adresa", stav_obcanstvi = "stav_obcanstvi", stav_dat_nar = "stav_dat_nar", zpracovano = "zpracovano", stav_rov = "stav_rov", stav_rob = "stav_rob", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobddvsDtoFragments { ixs_dvs = "Base", por_cislo = "Base", id_volic = "Base", ixs_oso = "Base", ixs_sez = "Base", ido = "Base", jmeno = "Base", prijmeni = "Base", rod_prij = "Base", obec = "Base", cobce = "Base", ulice = "Base", dcd = "Base", cislo_dom = "Base", cislo_or = "Base", obcanstvi = "Base", dat_naroz = "Base", misto_naroz = "Base", m_nar_stat = "Base", stav_jmeno = "Base", stav_prij = "Base", stav_adresa = "Base", stav_obcanstvi = "Base", stav_dat_nar = "Base", zpracovano = "Base", stav_rov = "Base", stav_rob = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobddvsDtoTypes { ixs_dvs = "string", por_cislo = "number", id_volic = "number", ixs_oso = "string", ixs_sez = "string", ido = "string", jmeno = "string", prijmeni = "string", rod_prij = "string", obec = "string", cobce = "string", ulice = "string", dcd = "string", cislo_dom = "string", cislo_or = "string", obcanstvi = "string", dat_naroz = "JsonDate", misto_naroz = "string", m_nar_stat = "string", stav_jmeno = "number", stav_prij = "number", stav_adresa = "number", stav_obcanstvi = "number", stav_dat_nar = "number", zpracovano = "number", stav_rov = "number", stav_rob = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobddvsDtoTypeLengths { ixs_dvs = 12, ixs_oso = 12, ixs_sez = 12, ido = 15, jmeno = 100, prijmeni = 100, rod_prij = 100, obec = 48, cobce = 48, ulice = 48, dcd = 1, cislo_dom = 6, cislo_or = 6, obcanstvi = 50, misto_naroz = 100, m_nar_stat = 50, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobdoprDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdopr
	*      Oprávněná osoba, vlastník (druhá strana přihlašovacího lístku k pobytu)
	*/
	interface GRobdoprDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor bydliště*/
		ixs_byd?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobdoprDtoNames { ixs_byd = "ixs_byd", por_cislo = "por_cislo", ixs_esu = "ixs_esu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobdoprDtoFragments { ixs_byd = "Base", por_cislo = "Base", ixs_esu = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobdoprDtoTypes { ixs_byd = "string", por_cislo = "number", ixs_esu = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobdoprDtoTypeLengths { ixs_byd = 12, ixs_esu = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobdprnDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdprn
	*      Detail porovnání ROB s registrem nemovitostí
	*/
	interface GRobdprnDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor porovnání*/
		ixs_prn?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Titul před jménem*/
		titul_pred?: string|null;
		/**Titul za jménem*/
		titul_za?: string|null;
		/**Rodné číslo*/
		rodne_cislo?: string|null;
		/**Byrliště z Ren*/
		bydliste_ku?: string|null;
		/**Bydliště*/
		bydliste?: string|null;
		/**Id budovy*/
		id_budovy?: string|null;
		/**Typ budovy*/
		typ_budovy?: number|null;
		/**Kód části obce*/
		kod_casti_obce?: number|null;
		/**Název části obce*/
		nazev_casti_obce?: string|null;
		/**Číslo domovní*/
		cislo_domovni?: number|null;
		/**Doplněk čísla domovního*/
		dcd_zobraz?: string|null;
		/**Podíl nemovitosti*/
		podil_nem?: string|null;
		/**Podíl čitatel*/
		podil_citatel?: number|null;
		/**Podíl jmenovatel*/
		podil_jmenov?: number|null;
		/**Typ nemovitosti*/
		typ_nemovitosti?: string|null;
		/**Kód katastrálního území*/
		kod_kat_uzemi?: number|null;
		/**Název katastrálního území*/
		nazev_kat_uzemi?: string|null;
		/**Číslo parceli*/
		cislo_par?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Číslo bytu*/
		cislo_bytu?: number|null;
		/**SJM*/
		s_sjm?: number|null;
		/**Číslo LV*/
		cislo_lv?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Ičo*/
		ico?: number|null;
	}
	const enum GRobdprnDtoNames { ixs_prn = "ixs_prn", por_cislo = "por_cislo", jmeno = "jmeno", prijmeni = "prijmeni", titul_pred = "titul_pred", titul_za = "titul_za", rodne_cislo = "rodne_cislo", bydliste_ku = "bydliste_ku", bydliste = "bydliste", id_budovy = "id_budovy", typ_budovy = "typ_budovy", kod_casti_obce = "kod_casti_obce", nazev_casti_obce = "nazev_casti_obce", cislo_domovni = "cislo_domovni", dcd_zobraz = "dcd_zobraz", podil_nem = "podil_nem", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", typ_nemovitosti = "typ_nemovitosti", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", cislo_par = "cislo_par", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_bytu = "cislo_bytu", s_sjm = "s_sjm", cislo_lv = "cislo_lv", nazev = "nazev", ico = "ico", Permissions = "Permissions",}
	const enum GRobdprnDtoFragments { ixs_prn = "Base", por_cislo = "Base", jmeno = "Base", prijmeni = "Base", titul_pred = "Base", titul_za = "Base", rodne_cislo = "Base", bydliste_ku = "Base", bydliste = "Base", id_budovy = "Base", typ_budovy = "Base", kod_casti_obce = "Base", nazev_casti_obce = "Base", cislo_domovni = "Base", dcd_zobraz = "Base", podil_nem = "Base", podil_citatel = "Base", podil_jmenov = "Base", typ_nemovitosti = "Base", kod_kat_uzemi = "Base", nazev_kat_uzemi = "Base", cislo_par = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cislo_bytu = "Base", s_sjm = "Base", cislo_lv = "Base", nazev = "Base", ico = "Base", Permissions = "*",}
	const enum GRobdprnDtoTypes { ixs_prn = "string", por_cislo = "number", jmeno = "string", prijmeni = "string", titul_pred = "string", titul_za = "string", rodne_cislo = "string", bydliste_ku = "string", bydliste = "string", id_budovy = "string", typ_budovy = "number", kod_casti_obce = "number", nazev_casti_obce = "string", cislo_domovni = "number", dcd_zobraz = "string", podil_nem = "string", podil_citatel = "number", podil_jmenov = "number", typ_nemovitosti = "string", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", cislo_par = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_bytu = "number", s_sjm = "number", cislo_lv = "number", nazev = "string", ico = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobdprnDtoTypeLengths { ixs_prn = 12, jmeno = 100, prijmeni = 100, titul_pred = 35, titul_za = 35, rodne_cislo = 10, bydliste_ku = 254, bydliste = 254, id_budovy = 30, nazev_casti_obce = 48, dcd_zobraz = 1, podil_nem = 50, typ_nemovitosti = 60, nazev_kat_uzemi = 48, cislo_par = 200, poznamka = 254, zmenu_prov = 12, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobdsidDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdsid
	*      Inicializační dávka
	*/
	interface GRobdsidDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor zakládací dávky*/
		ixs_sid?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Identifikátor občana*/
		pco?: number|null;
		/**Rodné číslo*/
		rod_cis?: string|null;
		/**Jméno*/
		jm?: string|null;
		/**Rodné příjmení*/
		rpr?: string|null;
		/**Příjmení*/
		pr?: string|null;
		/**Rodinný stav*/
		rod_stav?: number|null;
		/**Státní příslušnost*/
		stat_prisl?: string|null;
		/**Objekt*/
		txt_ob?: string|null;
		/**Blok domu*/
		txt_bl?: string|null;
		/**Ulice*/
		txt_ul?: string|null;
		/**Číslo domu*/
		cislo_dom?: string|null;
		/**Číslo orientační*/
		cislo_or?: string|null;
		/**Psč*/
		psc?: number|null;
		/**Typ pobytu*/
		typ_pob?: number|null;
		matr_sn?: string|null;
		m_nar_umr?: string|null;
		rod_cis_p?: string|null;
		jm_p?: string|null;
		rpr_p?: string|null;
		pr_p?: string|null;
		rod_cis_m?: string|null;
		jm_m?: string|null;
		rpr_m?: string|null;
		pr_m?: string|null;
		rod_cis_o?: string|null;
		jm_o?: string|null;
		rpr_o?: string|null;
		pr_o?: string|null;
		rc_deti?: string|null;
		dat_tp_od?: JsonDate|null;
		typ_omez?: number|null;
		omez_zpus?: string|null;
		zak_pob?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Dtum rodinného stavu od*/
		dat_r_stav_od?: JsonDate|null;
		/**Příznak zpracování*/
		zpracovano?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Stav v rob*/
		stav_rob?: number|null;
		/**Typ čísla domovního*/
		c_dom_typ?: string|null;
		/**Znak v čísle orientačním*/
		znak_c_or?: string|null;
		/**Okres*/
		okres?: string|null;
		/**Pohlaví*/
		pohl?: string|null;
		/**Titul*/
		titul?: string|null;
		/**Blokace*/
		blokace?: JsonDecimal|null;
		/**Dodací adresa*/
		dadresa?: string|null;
		/**Typ doručovací adresy*/
		typ_dor_adr?: number|null;
		/**Státní příslušnost*/
		stat_prisl_o?: string|null;
	}
	const enum GRobdsidDtoNames { ixs_sid = "ixs_sid", por_cislo = "por_cislo", pco = "pco", rod_cis = "rod_cis", jm = "jm", rpr = "rpr", pr = "pr", rod_stav = "rod_stav", stat_prisl = "stat_prisl", txt_ob = "txt_ob", txt_bl = "txt_bl", txt_ul = "txt_ul", cislo_dom = "cislo_dom", cislo_or = "cislo_or", psc = "psc", typ_pob = "typ_pob", matr_sn = "matr_sn", m_nar_umr = "m_nar_umr", rod_cis_p = "rod_cis_p", jm_p = "jm_p", rpr_p = "rpr_p", pr_p = "pr_p", rod_cis_m = "rod_cis_m", jm_m = "jm_m", rpr_m = "rpr_m", pr_m = "pr_m", rod_cis_o = "rod_cis_o", jm_o = "jm_o", rpr_o = "rpr_o", pr_o = "pr_o", rc_deti = "rc_deti", dat_tp_od = "dat_tp_od", typ_omez = "typ_omez", omez_zpus = "omez_zpus", zak_pob = "zak_pob", popis = "popis", dat_r_stav_od = "dat_r_stav_od", zpracovano = "zpracovano", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_oso = "ixs_oso", stav_rob = "stav_rob", c_dom_typ = "c_dom_typ", znak_c_or = "znak_c_or", okres = "okres", pohl = "pohl", titul = "titul", blokace = "blokace", dadresa = "dadresa", typ_dor_adr = "typ_dor_adr", stat_prisl_o = "stat_prisl_o", Permissions = "Permissions",}
	const enum GRobdsidDtoFragments { ixs_sid = "Base", por_cislo = "Base", pco = "Base", rod_cis = "Base", jm = "Base", rpr = "Base", pr = "Base", rod_stav = "Base", stat_prisl = "Base", txt_ob = "Base", txt_bl = "Base", txt_ul = "Base", cislo_dom = "Base", cislo_or = "Base", psc = "Base", typ_pob = "Base", matr_sn = "Base", m_nar_umr = "Base", rod_cis_p = "Base", jm_p = "Base", rpr_p = "Base", pr_p = "Base", rod_cis_m = "Base", jm_m = "Base", rpr_m = "Base", pr_m = "Base", rod_cis_o = "Base", jm_o = "Base", rpr_o = "Base", pr_o = "Base", rc_deti = "Base", dat_tp_od = "Base", typ_omez = "Base", omez_zpus = "Base", zak_pob = "Base", popis = "Base", dat_r_stav_od = "Base", zpracovano = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_oso = "Base", stav_rob = "Base", c_dom_typ = "Base", znak_c_or = "Base", okres = "Base", pohl = "Base", titul = "Base", blokace = "Base", dadresa = "Base", typ_dor_adr = "Base", stat_prisl_o = "Base", Permissions = "*",}
	const enum GRobdsidDtoTypes { ixs_sid = "string", por_cislo = "number", pco = "number", rod_cis = "string", jm = "string", rpr = "string", pr = "string", rod_stav = "number", stat_prisl = "string", txt_ob = "string", txt_bl = "string", txt_ul = "string", cislo_dom = "string", cislo_or = "string", psc = "number", typ_pob = "number", matr_sn = "string", m_nar_umr = "string", rod_cis_p = "string", jm_p = "string", rpr_p = "string", pr_p = "string", rod_cis_m = "string", jm_m = "string", rpr_m = "string", pr_m = "string", rod_cis_o = "string", jm_o = "string", rpr_o = "string", pr_o = "string", rc_deti = "string", dat_tp_od = "JsonDate", typ_omez = "number", omez_zpus = "string", zak_pob = "string", popis = "string", dat_r_stav_od = "JsonDate", zpracovano = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_oso = "string", stav_rob = "number", c_dom_typ = "string", znak_c_or = "string", okres = "string", pohl = "string", titul = "string", blokace = "JsonDecimal", dadresa = "string", typ_dor_adr = "number", stat_prisl_o = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobdsidDtoTypeLengths { ixs_sid = 12, rod_cis = 10, jm = 100, rpr = 100, pr = 100, stat_prisl = 48, txt_ob = 48, txt_bl = 48, txt_ul = 48, cislo_dom = 6, cislo_or = 6, matr_sn = 60, m_nar_umr = 60, rod_cis_p = 10, jm_p = 100, rpr_p = 100, pr_p = 100, rod_cis_m = 10, jm_m = 100, rpr_m = 100, pr_m = 100, rod_cis_o = 10, jm_o = 100, rpr_o = 100, pr_o = 100, rc_deti = 254, omez_zpus = 254, zak_pob = 254, popis = 254, poznamka = 254, zmenu_prov = 12, ixs_oso = 12, c_dom_typ = 1, znak_c_or = 1, okres = 200, pohl = 1, titul = 200, dadresa = 200, stat_prisl_o = 1024,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobdudaDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robduda
	*      Účastník události (ROB/MTK)
	*/
	interface GRobdudaDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor události*/
		ixs_uda?: string|null;
		/**Typ účastníka*/
		ucast?: number|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Platnost rodného čísla*/
		kval_rc?: number|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Nové příjmení*/
		nove_prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Nové jméno*/
		nove_jmeno?: string|null;
		/**Rodné příjmení*/
		rod_prijmeni?: string|null;
		/**Titul před jménem*/
		titul_pred?: string|null;
		/**Titul za jménem*/
		titul_za?: string|null;
		/**Datum narození*/
		dat_nar?: JsonDate|null;
		/**Místo narození*/
		misto_nar?: string|null;
		/**Stát narození*/
		stat_nar?: number|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Rodinný stav*/
		rod_stav?: number|null;
		/**Zaměstnání*/
		zamestnani?: string|null;
		/**Sátní občanství*/
		stat_obcan?: string|null;
		/**Typ průkazu*/
		typ_pruk?: number|null;
		/**Číslo průkazu*/
		cislo_pruk?: string|null;
		/**Kdo Průkaz vydal*/
		vydal_pruk?: string|null;
		/**Datum vydání průkazu*/
		dat_vyd_pruk?: JsonDate|null;
		/**Stát*/
		stat?: number|null;
		/**Okres*/
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Pražský obvod*/
		p_obvod?: string|null;
		/**Městská část*/
		m_cast?: string|null;
		/**Část obce*/
		cast_obce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo domu*/
		cislo_domu?: string|null;
		/**Poštovní směrovací číslo*/
		psc?: string|null;
		/**Jméno 2. pád*/
		jmeno_2pad?: string|null;
		/**Jméno 7. pád*/
		jmeno_7pad?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Kdo provedl změnu*/
		zmenu_prov?: string|null;
		/**Druhé jméno*/
		druhe_jmeno?: string|null;
		/**Druhé příjmení*/
		druhe_prijmeni?: string|null;
		/**Místo narození - Božkov*/
		misto_nar_boz?: string|null;
		/**Rodné číslo vydáno*/
		rl_vydany?: string|null;
		/**Datum vydání rodného čísla*/
		dat_vydani_rl?: JsonDate|null;
		/**Ročník rodného čísla*/
		rocnik_rl?: string|null;
		/**Číslo rodného čísla*/
		cislo_rl?: number|null;
		/**Datum platnosti průkazu*/
		dat_platnost_pruk?: JsonDate|null;
		/**Strana rodného listu*/
		strana_rl?: number|null;
		/**Nové příjmení - D*/
		nove_prijmeni_d?: string|null;
		/**Nové jméno - D*/
		nove_jmeno_d?: string|null;
		/**Okres narození*/
		okres_nar?: string|null;
		/**Identifikátor ESU*/
		ixs_esu?: string|null;
		/**Datum narození text*/
		dat_nar_text?: string|null;
		/**Telefon*/
		telefon?: string|null;
		/**Datum vydání rozhodnutí*/
		dat_vyd_rozh?: JsonDate|null;
		/**Identifikátor ESU Soud*/
		ixs_esu_soud?: string|null;
		/**Datum pravomocnosti*/
		dat_prav_moc?: JsonDate|null;
		/**Datum lhůty*/
		dat_lhuta?: JsonDate|null;
		/**Číslo rozhodnutí*/
		cj_rozhodnuti?: string|null;
		/**Soud*/
		soud?: string|null;
		/**Datum narození text*/
		dat_nar_txt?: string|null;
		/**Stát narození text*/
		stat_nar_txt?: string|null;
		/**Pohlaví text*/
		pohlavi_txt?: string|null;
		/**Rodinný stav text*/
		rod_stav_txt?: string|null;
		/**Stát text*/
		stat_txt?: string|null;
		/**Overen správnosti*/
		sveprav_over_dne?: JsonDate|null;
		/**Kdo vydal úřední list*/
		ul_vydan_kym?: string|null;
		/**Datum vydání úředního listu*/
		ul_vydan_dne?: JsonDate|null;
		/**Mužský tvar příjmení*/
		prijmeni_muz_tvar?: string|null;
	}
	const enum GRobdudaDtoNames { ixs_uda = "ixs_uda", ucast = "ucast", por_cislo = "por_cislo", rc = "rc", kval_rc = "kval_rc", prijmeni = "prijmeni", nove_prijmeni = "nove_prijmeni", jmeno = "jmeno", nove_jmeno = "nove_jmeno", rod_prijmeni = "rod_prijmeni", titul_pred = "titul_pred", titul_za = "titul_za", dat_nar = "dat_nar", misto_nar = "misto_nar", stat_nar = "stat_nar", pohlavi = "pohlavi", rod_stav = "rod_stav", zamestnani = "zamestnani", stat_obcan = "stat_obcan", typ_pruk = "typ_pruk", cislo_pruk = "cislo_pruk", vydal_pruk = "vydal_pruk", dat_vyd_pruk = "dat_vyd_pruk", stat = "stat", okres = "okres", obec = "obec", p_obvod = "p_obvod", m_cast = "m_cast", cast_obce = "cast_obce", ulice = "ulice", cislo_domu = "cislo_domu", psc = "psc", jmeno_2pad = "jmeno_2pad", jmeno_7pad = "jmeno_7pad", ixs_oso = "ixs_oso", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", druhe_jmeno = "druhe_jmeno", druhe_prijmeni = "druhe_prijmeni", misto_nar_boz = "misto_nar_boz", rl_vydany = "rl_vydany", dat_vydani_rl = "dat_vydani_rl", rocnik_rl = "rocnik_rl", cislo_rl = "cislo_rl", dat_platnost_pruk = "dat_platnost_pruk", strana_rl = "strana_rl", nove_prijmeni_d = "nove_prijmeni_d", nove_jmeno_d = "nove_jmeno_d", okres_nar = "okres_nar", ixs_esu = "ixs_esu", dat_nar_text = "dat_nar_text", telefon = "telefon", dat_vyd_rozh = "dat_vyd_rozh", ixs_esu_soud = "ixs_esu_soud", dat_prav_moc = "dat_prav_moc", dat_lhuta = "dat_lhuta", cj_rozhodnuti = "cj_rozhodnuti", soud = "soud", dat_nar_txt = "dat_nar_txt", stat_nar_txt = "stat_nar_txt", pohlavi_txt = "pohlavi_txt", rod_stav_txt = "rod_stav_txt", stat_txt = "stat_txt", sveprav_over_dne = "sveprav_over_dne", ul_vydan_kym = "ul_vydan_kym", ul_vydan_dne = "ul_vydan_dne", prijmeni_muz_tvar = "prijmeni_muz_tvar", Permissions = "Permissions",}
	const enum GRobdudaDtoFragments { ixs_uda = "Base", ucast = "Base", por_cislo = "Base", rc = "Base", kval_rc = "Base", prijmeni = "Base", nove_prijmeni = "Base", jmeno = "Base", nove_jmeno = "Base", rod_prijmeni = "Base", titul_pred = "Base", titul_za = "Base", dat_nar = "Base", misto_nar = "Base", stat_nar = "Base", pohlavi = "Base", rod_stav = "Base", zamestnani = "Base", stat_obcan = "Base", typ_pruk = "Base", cislo_pruk = "Base", vydal_pruk = "Base", dat_vyd_pruk = "Base", stat = "Base", okres = "Base", obec = "Base", p_obvod = "Base", m_cast = "Base", cast_obce = "Base", ulice = "Base", cislo_domu = "Base", psc = "Base", jmeno_2pad = "Base", jmeno_7pad = "Base", ixs_oso = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", druhe_jmeno = "Base", druhe_prijmeni = "Base", misto_nar_boz = "Base", rl_vydany = "Base", dat_vydani_rl = "Base", rocnik_rl = "Base", cislo_rl = "Base", dat_platnost_pruk = "Base", strana_rl = "Base", nove_prijmeni_d = "Base", nove_jmeno_d = "Base", okres_nar = "Base", ixs_esu = "Base", dat_nar_text = "Base", telefon = "Base", dat_vyd_rozh = "Base", ixs_esu_soud = "Base", dat_prav_moc = "Base", dat_lhuta = "Base", cj_rozhodnuti = "Base", soud = "Base", dat_nar_txt = "Base", stat_nar_txt = "Base", pohlavi_txt = "Base", rod_stav_txt = "Base", stat_txt = "Base", sveprav_over_dne = "Base", ul_vydan_kym = "Base", ul_vydan_dne = "Base", prijmeni_muz_tvar = "Base", Permissions = "*",}
	const enum GRobdudaDtoTypes { ixs_uda = "string", ucast = "number", por_cislo = "number", rc = "string", kval_rc = "number", prijmeni = "string", nove_prijmeni = "string", jmeno = "string", nove_jmeno = "string", rod_prijmeni = "string", titul_pred = "string", titul_za = "string", dat_nar = "JsonDate", misto_nar = "string", stat_nar = "number", pohlavi = "number", rod_stav = "number", zamestnani = "string", stat_obcan = "string", typ_pruk = "number", cislo_pruk = "string", vydal_pruk = "string", dat_vyd_pruk = "JsonDate", stat = "number", okres = "string", obec = "string", p_obvod = "string", m_cast = "string", cast_obce = "string", ulice = "string", cislo_domu = "string", psc = "string", jmeno_2pad = "string", jmeno_7pad = "string", ixs_oso = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", druhe_jmeno = "string", druhe_prijmeni = "string", misto_nar_boz = "string", rl_vydany = "string", dat_vydani_rl = "JsonDate", rocnik_rl = "string", cislo_rl = "number", dat_platnost_pruk = "JsonDate", strana_rl = "number", nove_prijmeni_d = "string", nove_jmeno_d = "string", okres_nar = "string", ixs_esu = "string", dat_nar_text = "string", telefon = "string", dat_vyd_rozh = "JsonDate", ixs_esu_soud = "string", dat_prav_moc = "JsonDate", dat_lhuta = "JsonDate", cj_rozhodnuti = "string", soud = "string", dat_nar_txt = "string", stat_nar_txt = "string", pohlavi_txt = "string", rod_stav_txt = "string", stat_txt = "string", sveprav_over_dne = "JsonDate", ul_vydan_kym = "string", ul_vydan_dne = "JsonDate", prijmeni_muz_tvar = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobdudaDtoTypeLengths { ixs_uda = 12, rc = 100, prijmeni = 100, nove_prijmeni = 100, jmeno = 100, nove_jmeno = 100, rod_prijmeni = 100, titul_pred = 35, titul_za = 35, misto_nar = 48, zamestnani = 50, stat_obcan = 50, cislo_pruk = 254, vydal_pruk = 254, okres = 32, obec = 48, p_obvod = 48, m_cast = 48, cast_obce = 48, ulice = 48, cislo_domu = 48, psc = 48, jmeno_2pad = 100, jmeno_7pad = 100, zmenu_prov = 100, druhe_jmeno = 100, druhe_prijmeni = 100, misto_nar_boz = 48, rl_vydany = 100, rocnik_rl = 12, nove_prijmeni_d = 100, nove_jmeno_d = 100, okres_nar = 32, ixs_esu = 12, dat_nar_text = 50, telefon = 100, ixs_esu_soud = 12, cj_rozhodnuti = 100, soud = 50, dat_nar_txt = 50, stat_nar_txt = 50, pohlavi_txt = 50, rod_stav_txt = 50, stat_txt = 50, ul_vydan_kym = 50, prijmeni_muz_tvar = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobdunlDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdunl
	*      Aktualizační dávka detail
	*/
	interface GRobdunlDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		ixs_unl?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Kód obce*/
		kod_ob?: number|null;
		/**Pco*/
		pco?: number|null;
		/**Důvod změny*/
		duv_zm?: number|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rod_cis?: string|null;
		/**Jméno*/
		jm?: string|null;
		/**Rodné příjmení*/
		rpr?: string|null;
		/**Příjmení*/
		pr?: string|null;
		/**Rodinný stav*/
		rod_stav?: number|null;
		/**Státní příslušnost*/
		stat_prisl?: string|null;
		/**Státní příslušnost textově*/
		stat_prisl_txt?: string|null;
		/**Obec textově*/
		txt_ob?: string|null;
		/**Blok domu textově*/
		txt_bl?: string|null;
		/**Ulice textově*/
		txt_ul?: string|null;
		/**Číslo domu*/
		cislo_dom?: string|null;
		/**Číslo orientační*/
		cislo_or?: string|null;
		/**Psč*/
		psc?: string|null;
		/**Okres*/
		okres?: number|null;
		/**Typ pobytu*/
		typ_pob?: number|null;
		/**Rodné číslo*/
		rod_cisn?: string|null;
		jmn?: string|null;
		rprn?: string|null;
		prn?: string|null;
		rod_stavn?: number|null;
		stat_prisln?: string|null;
		stat_prisln_txt?: string|null;
		txt_obn?: string|null;
		txt_bln?: string|null;
		txt_uln?: string|null;
		cislo_domn?: string|null;
		cislo_orn?: string|null;
		pscn?: string|null;
		okresn?: number|null;
		typ_pobn?: number|null;
		pohlavin?: number|null;
		matr_sn?: string|null;
		m_nar_umr?: string|null;
		ixs_oso_p?: string|null;
		rod_cis_p?: string|null;
		jm_p?: string|null;
		rpr_p?: string|null;
		pr_p?: string|null;
		ixs_oso_m?: string|null;
		rod_cis_m?: string|null;
		jm_m?: string|null;
		rpr_m?: string|null;
		pr_m?: string|null;
		ixs_oso_o?: string|null;
		rod_cis_o?: string|null;
		jm_o?: string|null;
		rpr_o?: string|null;
		pr_o?: string|null;
		rc_deti?: string|null;
		dat_tp_od?: JsonDate|null;
		typ_omez?: number|null;
		omez_zpus?: string|null;
		zak_pob?: string|null;
		volna_pol?: string|null;
		rod_stav_od?: JsonDate|null;
		text_1?: string|null;
		text_2?: string|null;
		text_3?: string|null;
		datum_ucinnosti?: JsonDate|null;
		datum_zavedeno?: JsonDate|null;
		auto_zprac?: number|null;
		nacteno_z_davky?: number|null;
		stav_zprac?: number|null;
		duvod_odmitnuti?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		c_dom_typ?: string|null;
		znak_c_or?: string|null;
		c_dom_typn?: string|null;
		znak_c_orn?: string|null;
		titul?: string|null;
		blokace?: JsonDecimal|null;
		dadresa?: string|null;
		typ_dor_adr?: number|null;
		stat_prisl_o?: string|null;
		typ_pobytu_txt_unl?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
	}
	const enum GRobdunlDtoNames { ixs_unl = "ixs_unl", por_cislo = "por_cislo", kod_ob = "kod_ob", pco = "pco", duv_zm = "duv_zm", ixs_oso = "ixs_oso", rod_cis = "rod_cis", jm = "jm", rpr = "rpr", pr = "pr", rod_stav = "rod_stav", stat_prisl = "stat_prisl", stat_prisl_txt = "stat_prisl_txt", txt_ob = "txt_ob", txt_bl = "txt_bl", txt_ul = "txt_ul", cislo_dom = "cislo_dom", cislo_or = "cislo_or", psc = "psc", okres = "okres", typ_pob = "typ_pob", rod_cisn = "rod_cisn", jmn = "jmn", rprn = "rprn", prn = "prn", rod_stavn = "rod_stavn", stat_prisln = "stat_prisln", stat_prisln_txt = "stat_prisln_txt", txt_obn = "txt_obn", txt_bln = "txt_bln", txt_uln = "txt_uln", cislo_domn = "cislo_domn", cislo_orn = "cislo_orn", pscn = "pscn", okresn = "okresn", typ_pobn = "typ_pobn", pohlavin = "pohlavin", matr_sn = "matr_sn", m_nar_umr = "m_nar_umr", ixs_oso_p = "ixs_oso_p", rod_cis_p = "rod_cis_p", jm_p = "jm_p", rpr_p = "rpr_p", pr_p = "pr_p", ixs_oso_m = "ixs_oso_m", rod_cis_m = "rod_cis_m", jm_m = "jm_m", rpr_m = "rpr_m", pr_m = "pr_m", ixs_oso_o = "ixs_oso_o", rod_cis_o = "rod_cis_o", jm_o = "jm_o", rpr_o = "rpr_o", pr_o = "pr_o", rc_deti = "rc_deti", dat_tp_od = "dat_tp_od", typ_omez = "typ_omez", omez_zpus = "omez_zpus", zak_pob = "zak_pob", volna_pol = "volna_pol", rod_stav_od = "rod_stav_od", text_1 = "text_1", text_2 = "text_2", text_3 = "text_3", datum_ucinnosti = "datum_ucinnosti", datum_zavedeno = "datum_zavedeno", auto_zprac = "auto_zprac", nacteno_z_davky = "nacteno_z_davky", stav_zprac = "stav_zprac", duvod_odmitnuti = "duvod_odmitnuti", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_dom_typ = "c_dom_typ", znak_c_or = "znak_c_or", c_dom_typn = "c_dom_typn", znak_c_orn = "znak_c_orn", titul = "titul", blokace = "blokace", dadresa = "dadresa", typ_dor_adr = "typ_dor_adr", stat_prisl_o = "stat_prisl_o", typ_pobytu_txt_unl = "typ_pobytu_txt_unl", dat_naroz = "dat_naroz", Permissions = "Permissions",}
	const enum GRobdunlDtoFragments { ixs_unl = "Base", por_cislo = "Base", kod_ob = "Base", pco = "Base", duv_zm = "Base", ixs_oso = "Base", rod_cis = "Base", jm = "Base", rpr = "Base", pr = "Base", rod_stav = "Base", stat_prisl = "Base", stat_prisl_txt = "Base", txt_ob = "Base", txt_bl = "Base", txt_ul = "Base", cislo_dom = "Base", cislo_or = "Base", psc = "Base", okres = "Base", typ_pob = "Base", rod_cisn = "Base", jmn = "Base", rprn = "Base", prn = "Base", rod_stavn = "Base", stat_prisln = "Base", stat_prisln_txt = "Base", txt_obn = "Base", txt_bln = "Base", txt_uln = "Base", cislo_domn = "Base", cislo_orn = "Base", pscn = "Base", okresn = "Base", typ_pobn = "Base", pohlavin = "Base", matr_sn = "Base", m_nar_umr = "Base", ixs_oso_p = "Base", rod_cis_p = "Base", jm_p = "Base", rpr_p = "Base", pr_p = "Base", ixs_oso_m = "Base", rod_cis_m = "Base", jm_m = "Base", rpr_m = "Base", pr_m = "Base", ixs_oso_o = "Base", rod_cis_o = "Base", jm_o = "Base", rpr_o = "Base", pr_o = "Base", rc_deti = "Base", dat_tp_od = "Base", typ_omez = "Base", omez_zpus = "Base", zak_pob = "Base", volna_pol = "Base", rod_stav_od = "Base", text_1 = "Base", text_2 = "Base", text_3 = "Base", datum_ucinnosti = "Base", datum_zavedeno = "Base", auto_zprac = "Base", nacteno_z_davky = "Base", stav_zprac = "Base", duvod_odmitnuti = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", c_dom_typ = "Base", znak_c_or = "Base", c_dom_typn = "Base", znak_c_orn = "Base", titul = "Base", blokace = "Base", dadresa = "Base", typ_dor_adr = "Base", stat_prisl_o = "Base", typ_pobytu_txt_unl = "Base", dat_naroz = "Base", Permissions = "*",}
	const enum GRobdunlDtoTypes { ixs_unl = "string", por_cislo = "number", kod_ob = "number", pco = "number", duv_zm = "number", ixs_oso = "string", rod_cis = "string", jm = "string", rpr = "string", pr = "string", rod_stav = "number", stat_prisl = "string", stat_prisl_txt = "string", txt_ob = "string", txt_bl = "string", txt_ul = "string", cislo_dom = "string", cislo_or = "string", psc = "string", okres = "number", typ_pob = "number", rod_cisn = "string", jmn = "string", rprn = "string", prn = "string", rod_stavn = "number", stat_prisln = "string", stat_prisln_txt = "string", txt_obn = "string", txt_bln = "string", txt_uln = "string", cislo_domn = "string", cislo_orn = "string", pscn = "string", okresn = "number", typ_pobn = "number", pohlavin = "number", matr_sn = "string", m_nar_umr = "string", ixs_oso_p = "string", rod_cis_p = "string", jm_p = "string", rpr_p = "string", pr_p = "string", ixs_oso_m = "string", rod_cis_m = "string", jm_m = "string", rpr_m = "string", pr_m = "string", ixs_oso_o = "string", rod_cis_o = "string", jm_o = "string", rpr_o = "string", pr_o = "string", rc_deti = "string", dat_tp_od = "JsonDate", typ_omez = "number", omez_zpus = "string", zak_pob = "string", volna_pol = "string", rod_stav_od = "JsonDate", text_1 = "string", text_2 = "string", text_3 = "string", datum_ucinnosti = "JsonDate", datum_zavedeno = "JsonDate", auto_zprac = "number", nacteno_z_davky = "number", stav_zprac = "number", duvod_odmitnuti = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_dom_typ = "string", znak_c_or = "string", c_dom_typn = "string", znak_c_orn = "string", titul = "string", blokace = "JsonDecimal", dadresa = "string", typ_dor_adr = "number", stat_prisl_o = "string", typ_pobytu_txt_unl = "string", dat_naroz = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobdunlDtoTypeLengths { ixs_unl = 12, ixs_oso = 12, rod_cis = 10, jm = 50, rpr = 50, pr = 50, stat_prisl = 48, stat_prisl_txt = 120, txt_ob = 48, txt_bl = 48, txt_ul = 48, cislo_dom = 6, cislo_or = 6, psc = 5, rod_cisn = 10, jmn = 50, rprn = 50, prn = 50, stat_prisln = 30, stat_prisln_txt = 120, txt_obn = 48, txt_bln = 48, txt_uln = 48, cislo_domn = 6, cislo_orn = 6, pscn = 5, matr_sn = 60, m_nar_umr = 60, ixs_oso_p = 12, rod_cis_p = 10, jm_p = 50, rpr_p = 50, pr_p = 50, ixs_oso_m = 12, rod_cis_m = 10, jm_m = 50, rpr_m = 50, pr_m = 50, ixs_oso_o = 12, rod_cis_o = 10, jm_o = 50, rpr_o = 50, pr_o = 50, rc_deti = 254, omez_zpus = 254, zak_pob = 254, volna_pol = 254, text_1 = 254, text_2 = 254, text_3 = 254, poznamka = 254, zmenu_prov = 12, c_dom_typ = 1, znak_c_or = 1, c_dom_typn = 1, znak_c_orn = 1, titul = 200, dadresa = 200, stat_prisl_o = 5, typ_pobytu_txt_unl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobdzzmDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdzzm
	*      Záznamy k události
	*/
	interface GRobdzzmDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor události*/
		ixs_uda?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Kód záznamu*/
		kod_zzm?: number|null;
		/**Datum záznamu*/
		dat_zzm?: JsonDate|null;
		/**Název*/
		nazev?: string|null;
		/**Záznamy1*/
		zaznamy1?: string|null;
		/**Záznamy2*/
		zaznamy2?: string|null;
		/**Záznamy3*/
		zaznamy3?: string|null;
		/**Záznamy4*/
		zaznamy4?: string|null;
		/**Editovatelný*/
		priz_ro?: number|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Podpis*/
		s_podpis?: number|null;
		/**Datum zaevidování*/
		dat_zaevidovani?: JsonDate|null;
		/**Identifikátor listu*/
		ixs_lis?: string|null;
		/**Záznamy5*/
		zaznamy5?: string|null;
		/**Záznamy6*/
		zaznamy6?: string|null;
		/**Záznamy7*/
		zaznamy7?: string|null;
		/**Záznamy8*/
		zaznamy8?: string|null;
		/**Rtf*/
		s_rtf?: number|null;
		/**Poskytovatel zdravotních služeb*/
		pos_zdr_slu?: string|null;
	}
	const enum GRobdzzmDtoNames { ixs_uda = "ixs_uda", por_cislo = "por_cislo", kod_zzm = "kod_zzm", dat_zzm = "dat_zzm", nazev = "nazev", zaznamy1 = "zaznamy1", zaznamy2 = "zaznamy2", zaznamy3 = "zaznamy3", zaznamy4 = "zaznamy4", priz_ro = "priz_ro", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_podpis = "s_podpis", dat_zaevidovani = "dat_zaevidovani", ixs_lis = "ixs_lis", zaznamy5 = "zaznamy5", zaznamy6 = "zaznamy6", zaznamy7 = "zaznamy7", zaznamy8 = "zaznamy8", s_rtf = "s_rtf", pos_zdr_slu = "pos_zdr_slu", Permissions = "Permissions",}
	const enum GRobdzzmDtoFragments { ixs_uda = "Base", por_cislo = "Base", kod_zzm = "Base", dat_zzm = "Base", nazev = "Base", zaznamy1 = "Base", zaznamy2 = "Base", zaznamy3 = "Base", zaznamy4 = "Base", priz_ro = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_podpis = "Base", dat_zaevidovani = "Base", ixs_lis = "Base", zaznamy5 = "Base", zaznamy6 = "Base", zaznamy7 = "Base", zaznamy8 = "Base", s_rtf = "Base", pos_zdr_slu = "Base", Permissions = "*",}
	const enum GRobdzzmDtoTypes { ixs_uda = "string", por_cislo = "number", kod_zzm = "number", dat_zzm = "JsonDate", nazev = "string", zaznamy1 = "string", zaznamy2 = "string", zaznamy3 = "string", zaznamy4 = "string", priz_ro = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_podpis = "number", dat_zaevidovani = "JsonDate", ixs_lis = "string", zaznamy5 = "string", zaznamy6 = "string", zaznamy7 = "string", zaznamy8 = "string", s_rtf = "number", pos_zdr_slu = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobdzzmDtoTypeLengths { ixs_uda = 12, nazev = 60, zaznamy1 = 254, zaznamy2 = 254, zaznamy3 = 254, zaznamy4 = 254, zmenu_prov = 12, ixs_lis = 12, zaznamy5 = 254, zaznamy6 = 254, zaznamy7 = 254, zaznamy8 = 254, pos_zdr_slu = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobhidoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robhido
	*      Objekty registru obyvatel - historie
	*/
	interface GRobhidoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor objektu*/
		ixs_ido?: string|null;
		/**Pořadvé číslo*/
		por_cislo?: number|null;
		/**Identifikátor objektu*/
		ixs_obj?: string|null;
		/**Id*/
		id?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Doplněk čísla domovního*/
		dcd?: string|null;
		/**Číslo domovní*/
		cd?: number|null;
		/**Poštovní směrovací číslo*/
		psc?: string|null;
		/**Stát*/
		stat?: number|null;
		/**Obvod*/
		obvod?: number|null;
		/**CS obec*/
		cs_obec?: string|null;
		/**CS castobce*/
		cs_cast_obce?: string|null;
		/**CS ulice*/
		cs_ulice?: string|null;
		/**Okres*/
		okres?: string|null;
		/**X-ová souřadnice definičního bodu stavebního objektu v souř. systému JTSK*/
		x_jtsk?: JsonDecimal|null;
		/**Y-ová souřadnice definičního bodu stavebního objektu v souř. systému JTSK*/
		y_jtsk?: JsonDecimal|null;
		/**X-ová souřadnice definičního bodu stavebního objektu v souř. systému S-42*/
		x_s42?: JsonDecimal|null;
		/**Y-ová souřadnice definičního bodu stavebního objektu v souř. systému S-42*/
		y_s42?: JsonDecimal|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Změna adresy*/
		zmena_adr?: number|null;
		/**Důvod změny*/
		zmena_adr_det?: number|null;
		/**Důvod změny textově*/
		zmena_txt?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
	}
	const enum GRobhidoDtoNames { ixs_ido = "ixs_ido", por_cislo = "por_cislo", ixs_obj = "ixs_obj", id = "id", obec = "obec", castobce = "castobce", ulice = "ulice", cor = "cor", pcor = "pcor", dcd = "dcd", cd = "cd", psc = "psc", stat = "stat", obvod = "obvod", cs_obec = "cs_obec", cs_cast_obce = "cs_cast_obce", cs_ulice = "cs_ulice", okres = "okres", x_jtsk = "x_jtsk", y_jtsk = "y_jtsk", x_s42 = "x_s42", y_s42 = "y_s42", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmena_adr = "zmena_adr", zmena_adr_det = "zmena_adr_det", zmena_txt = "zmena_txt", ixp = "ixp", Permissions = "Permissions",}
	const enum GRobhidoDtoFragments { ixs_ido = "Base", por_cislo = "Base", ixs_obj = "Base", id = "Base", obec = "Base", castobce = "Base", ulice = "Base", cor = "Base", pcor = "Base", dcd = "Base", cd = "Base", psc = "Base", stat = "Base", obvod = "Base", cs_obec = "Base", cs_cast_obce = "Base", cs_ulice = "Base", okres = "Base", x_jtsk = "Base", y_jtsk = "Base", x_s42 = "Base", y_s42 = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zmena_adr = "Base", zmena_adr_det = "Base", zmena_txt = "Base", ixp = "Base", Permissions = "*",}
	const enum GRobhidoDtoTypes { ixs_ido = "string", por_cislo = "number", ixs_obj = "string", id = "string", obec = "string", castobce = "string", ulice = "string", cor = "number", pcor = "string", dcd = "string", cd = "number", psc = "string", stat = "number", obvod = "number", cs_obec = "string", cs_cast_obce = "string", cs_ulice = "string", okres = "string", x_jtsk = "JsonDecimal", y_jtsk = "JsonDecimal", x_s42 = "JsonDecimal", y_s42 = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmena_adr = "number", zmena_adr_det = "number", zmena_txt = "string", ixp = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobhidoDtoTypeLengths { ixs_ido = 12, ixs_obj = 12, id = 12, obec = 48, castobce = 48, ulice = 48, pcor = 1, dcd = 1, psc = 5, cs_obec = 48, cs_cast_obce = 48, cs_ulice = 48, okres = 48, poznamka = 50, zmenu_prov = 12, zmena_txt = 100, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobhosoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robhoso
	*      Historie přístupů k osobě
	*/
	interface GRobhosoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Vazební identifikátor osoby*/
		ixs_oso?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Typ změny*/
		zmena_oso?: number|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**Identifikátor adresy*/
		ixs_adr?: string|null;
		/**Identifikátor navázané osoby*/
		ixs_oso_vaz?: string|null;
		/**Důvod účel hledání*/
		duvod_ucel?: string|null;
		/**Seznam údajů*/
		seznam_udaju?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
	}
	const enum GRobhosoDtoNames { ixs_oso = "ixs_oso", por_cislo = "por_cislo", zmena_oso = "zmena_oso", typ_ag = "typ_ag", ixs_adr = "ixs_adr", ixs_oso_vaz = "ixs_oso_vaz", duvod_ucel = "duvod_ucel", seznam_udaju = "seznam_udaju", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp = "ixp", Permissions = "Permissions",}
	const enum GRobhosoDtoFragments { ixs_oso = "Base", por_cislo = "Base", zmena_oso = "Base", typ_ag = "Base", ixs_adr = "Base", ixs_oso_vaz = "Base", duvod_ucel = "Base", seznam_udaju = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixp = "Base", Permissions = "*",}
	const enum GRobhosoDtoTypes { ixs_oso = "string", por_cislo = "number", zmena_oso = "number", typ_ag = "number", ixs_adr = "string", ixs_oso_vaz = "string", duvod_ucel = "string", seznam_udaju = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobhosoDtoTypeLengths { ixs_oso = 12, ixs_adr = 12, ixs_oso_vaz = 12, duvod_ucel = 254, seznam_udaju = 254, zmenu_prov = 12, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRoblakcDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:roblakc
	*      Logování náhledů do registru
	*/
	interface GRoblakcDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Typ akce*/
		typ_akce?: number|null;
		/**Typ dat*/
		typ_data?: number|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Kód obce*/
		kod_o?: number|null;
		/**Identifikátor občana*/
		pco?: number|null;
		/**Popis akce*/
		test_akce?: string|null;
		/**Důvod změny*/
		duvod?: string|null;
		/**Počet změn*/
		pocet?: number|null;
		/**Identifikátor důvodu*/
		ixs_duv?: string|null;
		/**Identifikátor databázového připojení*/
		log_por_cislo?: number|null;
		/**Programová fáze*/
		faze?: string|null;
	}
	const enum GRoblakcDtoNames { zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", typ_akce = "typ_akce", typ_data = "typ_data", ixs_oso = "ixs_oso", kod_o = "kod_o", pco = "pco", test_akce = "test_akce", duvod = "duvod", pocet = "pocet", ixs_duv = "ixs_duv", log_por_cislo = "log_por_cislo", faze = "faze", Permissions = "Permissions",}
	const enum GRoblakcDtoFragments { zmenu_prov = "Base", dat_zmena = "Base", typ_akce = "Base", typ_data = "Base", ixs_oso = "Base", kod_o = "Base", pco = "Base", test_akce = "Base", duvod = "Base", pocet = "Base", ixs_duv = "Base", log_por_cislo = "Base", faze = "Base", Permissions = "*",}
	const enum GRoblakcDtoTypes { zmenu_prov = "string", dat_zmena = "JsonDate", typ_akce = "number", typ_data = "number", ixs_oso = "string", kod_o = "number", pco = "number", test_akce = "string", duvod = "string", pocet = "number", ixs_duv = "string", log_por_cislo = "number", faze = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRoblakcDtoTypeLengths { zmenu_prov = 12, ixs_oso = 12, test_akce = 254, duvod = 254, ixs_duv = 12, faze = 8,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRoblszrDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:roblszr
	*      Žurnál změn z ISZR
	*/
	interface GRoblszrDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Vazební identifikátor osoby*/
		ixs_oso?: string|null;
		/**Typ změny*/
		szr_zmena?: number|null;
		/**Popis*/
		popis?: string|null;
		/**Zud*/
		s_zud?: number|null;
		/**Datum provedení změny*/
		dat_prov?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Změna ISEO*/
		s_zmena_iseo?: number|null;
	}
	const enum GRoblszrDtoNames { ixs_oso = "ixs_oso", szr_zmena = "szr_zmena", popis = "popis", s_zud = "s_zud", dat_prov = "dat_prov", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_zmena_iseo = "s_zmena_iseo", Permissions = "Permissions",}
	const enum GRoblszrDtoFragments { ixs_oso = "Base", szr_zmena = "Base", popis = "Base", s_zud = "Base", dat_prov = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_zmena_iseo = "Base", Permissions = "*",}
	const enum GRoblszrDtoTypes { ixs_oso = "string", szr_zmena = "number", popis = "string", s_zud = "number", dat_prov = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", s_zmena_iseo = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRoblszrDtoTypeLengths { ixs_oso = 12, popis = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsadrDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsadr
	*      Adresy registru obyvatel
	*/
	interface GRobsadrDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátr adresy objektu*/
		ixs_adr?: string|null;
		/**Identifikátor objektu*/
		ixs_ido?: string|null;
		/**Blok domu*/
		blok_domu?: string|null;
		/**Vchod*/
		vchod?: string|null;
		/**Byt*/
		byt?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Id územně identifikačního registru*/
		id_uir?: JsonDecimal|null;
	}
	const enum GRobsadrDtoNames { ixs_adr = "ixs_adr", ixs_ido = "ixs_ido", blok_domu = "blok_domu", vchod = "vchod", byt = "byt", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_uir = "id_uir", Permissions = "Permissions",}
	const enum GRobsadrDtoFragments { ixs_adr = "Base", ixs_ido = "Base", blok_domu = "Base", vchod = "Base", byt = "Base", dat_od = "Base", dat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", id_uir = "Base", Permissions = "*",}
	const enum GRobsadrDtoTypes { ixs_adr = "string", ixs_ido = "string", blok_domu = "string", vchod = "string", byt = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_uir = "JsonDecimal", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsadrDtoTypeLengths { ixs_adr = 12, ixs_ido = 12, blok_domu = 8, vchod = 5, byt = 5, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsbydDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsbyd
	*      Bydliště osob
	*/
	interface GRobsbydDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor bydliště*/
		ixs_byd?: string|null;
		/**vazební identifikátor obyvatele*/
		ixs_oso?: string|null;
		/**vazební identifikátor stavebního objektu*/
		ixs_adr?: string|null;
		/**Typ bydliště*/
		typ_bydl?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Stav bydliště*/
		stav_bydl?: number|null;
		/**Důvod stěhování*/
		duvod_steh?: number|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Předchozí bydliště*/
		ixs_byd_nad?: string|null;
		/**Idetifikátor stavby*/
		ixs_sta?: string|null;
		/**Stav převzetí*/
		stav_prev?: number|null;
		/**Datum provedení změny*/
		dat_prov?: JsonDate|null;
		/**První část záznamu*/
		zaznamy_1?: string|null;
		/**Druhá část záznamu*/
		zaznamy_2?: string|null;
		/**Příznak že se jedná o adresu úřadu*/
		s_adresa_uradu?: number|null;
	}
	const enum GRobsbydDtoNames { ixs_byd = "ixs_byd", ixs_oso = "ixs_oso", ixs_adr = "ixs_adr", typ_bydl = "typ_bydl", dat_od = "dat_od", dat_do = "dat_do", stav_bydl = "stav_bydl", duvod_steh = "duvod_steh", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_byd_nad = "ixs_byd_nad", ixs_sta = "ixs_sta", stav_prev = "stav_prev", dat_prov = "dat_prov", zaznamy_1 = "zaznamy_1", zaznamy_2 = "zaznamy_2", s_adresa_uradu = "s_adresa_uradu", Permissions = "Permissions",}
	const enum GRobsbydDtoFragments { ixs_byd = "Base", ixs_oso = "Base", ixs_adr = "Base", typ_bydl = "Base", dat_od = "Base", dat_do = "Base", stav_bydl = "Base", duvod_steh = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_byd_nad = "Base", ixs_sta = "Base", stav_prev = "Base", dat_prov = "Base", zaznamy_1 = "Base", zaznamy_2 = "Base", s_adresa_uradu = "Base", Permissions = "*",}
	const enum GRobsbydDtoTypes { ixs_byd = "string", ixs_oso = "string", ixs_adr = "string", typ_bydl = "number", dat_od = "JsonDate", dat_do = "JsonDate", stav_bydl = "number", duvod_steh = "number", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_byd_nad = "string", ixs_sta = "string", stav_prev = "number", dat_prov = "JsonDate", zaznamy_1 = "string", zaznamy_2 = "string", s_adresa_uradu = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsbydDtoTypeLengths { ixs_byd = 12, ixs_oso = 12, ixs_adr = 12, poznamka = 50, zmenu_prov = 12, ixs_byd_nad = 12, ixs_sta = 12, zaznamy_1 = 254, zaznamy_2 = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsdadDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsdad
	*      Doručovací adresa
	*/
	interface GRobsdadDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor doručovací adresy*/
		ixs_dad?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Vazební identifikátor stavebního objektu*/
		ixs_adr?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Typ doručovací adresy*/
		typ_dor_adr?: number|null;
		/**Telefon*/
		tel?: string|null;
		/**Fax*/
		fax?: string|null;
		/**Email*/
		email?: string|null;
		/**P.O.BOX*/
		pobox?: string|null;
		/**Volný text*/
		volny_text?: string|null;
	}
	const enum GRobsdadDtoNames { ixs_dad = "ixs_dad", ixs_oso = "ixs_oso", ixs_adr = "ixs_adr", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dor_adr = "typ_dor_adr", tel = "tel", fax = "fax", email = "email", pobox = "pobox", volny_text = "volny_text", Permissions = "Permissions",}
	const enum GRobsdadDtoFragments { ixs_dad = "Base", ixs_oso = "Base", ixs_adr = "Base", dat_od = "Base", dat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", typ_dor_adr = "Base", tel = "Base", fax = "Base", email = "Base", pobox = "Base", volny_text = "Base", Permissions = "*",}
	const enum GRobsdadDtoTypes { ixs_dad = "string", ixs_oso = "string", ixs_adr = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dor_adr = "number", tel = "string", fax = "string", email = "string", pobox = "string", volny_text = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsdadDtoTypeLengths { ixs_dad = 12, ixs_oso = 12, ixs_adr = 12, poznamka = 50, zmenu_prov = 12, tel = 50, fax = 50, email = 254, pobox = 50, volny_text = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsdavDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsdav
	*      Detail dávky s údaji o občanech
	*/
	interface GRobsdavDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		ixs_dav?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Datum načtení*/
		dat_nac?: JsonDate|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Obec*/
		obec_davka?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum kontroly*/
		dat_kontrola?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobsdavDtoNames { ixs_dav = "ixs_dav", nazev = "nazev", popis = "popis", dat_nac = "dat_nac", dat_od = "dat_od", dat_do = "dat_do", obec_davka = "obec_davka", poznamka = "poznamka", dat_kontrola = "dat_kontrola", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsdavDtoFragments { ixs_dav = "Base", nazev = "Base", popis = "Base", dat_nac = "Base", dat_od = "Base", dat_do = "Base", obec_davka = "Base", poznamka = "Base", dat_kontrola = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsdavDtoTypes { ixs_dav = "string", nazev = "string", popis = "string", dat_nac = "JsonDate", dat_od = "JsonDate", dat_do = "JsonDate", obec_davka = "string", poznamka = "string", dat_kontrola = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsdavDtoTypeLengths { ixs_dav = 12, nazev = 100, popis = 254, obec_davka = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsduvDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsduv
	*      Důvody přístupu do ROB
	*/
	interface GRobsduvDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor důvodu přístupu*/
		ixs_duv?: string|null;
		/**Název důvodu přístupu*/
		nazev?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobsduvDtoNames { ixs_duv = "ixs_duv", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsduvDtoFragments { ixs_duv = "Base", nazev = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsduvDtoTypes { ixs_duv = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsduvDtoTypeLengths { ixs_duv = 12, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsidoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsido
	*      Objekty registru obyvatel
	*/
	interface GRobsidoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor objektu*/
		ixs_ido?: string|null;
		/**Identifikátor objektu*/
		ixs_obj?: string|null;
		/**Index domu*/
		id?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Pražský obvod*/
		pobvod?: string|null;
		/**Městská část*/
		mcast?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Druh čísla domovního*/
		dcd?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Poštovní směrovací číslo*/
		psc?: string|null;
		/**Stát*/
		stat?: number|null;
		/**Obvod*/
		obvod?: number|null;
		/**CS obec*/
		cs_obec?: string|null;
		/**CS část obce*/
		cs_cast_obce?: string|null;
		/**CS ulice*/
		cs_ulice?: string|null;
		/**Okres*/
		okres?: string|null;
		/**X-ová souřadnice definičního bodu stavebního objektu v souř. systému JTSK*/
		x_jtsk?: JsonDecimal|null;
		/**Y-ová souřadnice definičního bodu stavebního objektu v souř. systému JTSK*/
		y_jtsk?: JsonDecimal|null;
		/**X-ová souřadnice definičního bodu stavebního objektu v souř. systému S-42*/
		x_s42?: JsonDecimal|null;
		/**Y-ová souřadnice definičního bodu stavebního objektu v souř. systému S-42*/
		y_s42?: JsonDecimal|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Identifikátor v rejstříku UIR-ADR*/
		id_uir?: JsonDecimal|null;
		/**Referenční údaje*/
		ref_udaje?: number|null;
		/**Kód adresního místa*/
		adresni_misto_kod?: number|null;
		/**Datum Aktualizace z iszr*/
		dat_akt_iszr?: JsonDate|null;
		/**Školský obvod*/
		skolsky_obvod?: number|null;
		/**Školský obvod mateřské školy*/
		skolsky_obvod_ms?: number|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**Okrsek pro roznášku*/
		okrsek_roznaska?: number|null;
	}
	const enum GRobsidoDtoNames { ixs_ido = "ixs_ido", ixs_obj = "ixs_obj", id = "id", obec = "obec", pobvod = "pobvod", mcast = "mcast", castobce = "castobce", ulice = "ulice", cor = "cor", pcor = "pcor", dcd = "dcd", cd = "cd", psc = "psc", stat = "stat", obvod = "obvod", cs_obec = "cs_obec", cs_cast_obce = "cs_cast_obce", cs_ulice = "cs_ulice", okres = "okres", x_jtsk = "x_jtsk", y_jtsk = "y_jtsk", x_s42 = "x_s42", y_s42 = "y_s42", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_uir = "id_uir", ref_udaje = "ref_udaje", adresni_misto_kod = "adresni_misto_kod", dat_akt_iszr = "dat_akt_iszr", skolsky_obvod = "skolsky_obvod", skolsky_obvod_ms = "skolsky_obvod_ms", ico = "ico", okrsek_roznaska = "okrsek_roznaska", Permissions = "Permissions",}
	const enum GRobsidoDtoFragments { ixs_ido = "Base", ixs_obj = "Base", id = "Base", obec = "Base", pobvod = "Base", mcast = "Base", castobce = "Base", ulice = "Base", cor = "Base", pcor = "Base", dcd = "Base", cd = "Base", psc = "Base", stat = "Base", obvod = "Base", cs_obec = "Base", cs_cast_obce = "Base", cs_ulice = "Base", okres = "Base", x_jtsk = "Base", y_jtsk = "Base", x_s42 = "Base", y_s42 = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", id_uir = "Base", ref_udaje = "Base", adresni_misto_kod = "Base", dat_akt_iszr = "Base", skolsky_obvod = "Base", skolsky_obvod_ms = "Base", ico = "Base", okrsek_roznaska = "Base", Permissions = "*",}
	const enum GRobsidoDtoTypes { ixs_ido = "string", ixs_obj = "string", id = "string", obec = "string", pobvod = "string", mcast = "string", castobce = "string", ulice = "string", cor = "number", pcor = "string", dcd = "string", cd = "number", psc = "string", stat = "number", obvod = "number", cs_obec = "string", cs_cast_obce = "string", cs_ulice = "string", okres = "string", x_jtsk = "JsonDecimal", y_jtsk = "JsonDecimal", x_s42 = "JsonDecimal", y_s42 = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_uir = "JsonDecimal", ref_udaje = "number", adresni_misto_kod = "number", dat_akt_iszr = "JsonDate", skolsky_obvod = "number", skolsky_obvod_ms = "number", ico = "string", okrsek_roznaska = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsidoDtoTypeLengths { ixs_ido = 12, ixs_obj = 12, id = 12, obec = 48, pobvod = 48, mcast = 48, castobce = 48, ulice = 48, pcor = 1, dcd = 1, psc = 12, cs_obec = 48, cs_cast_obce = 48, cs_ulice = 48, okres = 48, poznamka = 50, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsjmeDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsjme
	*      Registr jmen
	*/
	interface GRobsjmeDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Jméno*/
		jmeno?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobsjmeDtoNames { jmeno = "jmeno", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsjmeDtoFragments { jmeno = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsjmeDtoTypes { jmeno = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsjmeDtoTypeLengths { jmeno = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsjubDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsjub
	*      Seznam jubileí
	*/
	interface GRobsjubDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		ixs_jub?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
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
	const enum GRobsjubDtoNames { ixs_jub = "ixs_jub", nazev = "nazev", popis = "popis", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsjubDtoFragments { ixs_jub = "Base", nazev = "Base", popis = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsjubDtoTypes { ixs_jub = "string", nazev = "string", popis = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsjubDtoTypeLengths { ixs_jub = 12, nazev = 100, popis = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsoknDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsokn
	*      Nápověda - okresy
	*/
	interface GRobsoknDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Okres kód NUTS*/
		okres_nuts?: string|null;
		/**Okres*/
		okres?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobsoknDtoNames { okres_nuts = "okres_nuts", okres = "okres", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsoknDtoFragments { okres_nuts = "Base", okres = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsoknDtoTypes { okres_nuts = "string", okres = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsoknDtoTypeLengths { okres_nuts = 6, okres = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsosoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsoso
	*      Osoba v registru obyvatel
	*/
	interface GRobsosoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Vazební identifikátor osoby*/
		ixs_oso?: string|null;
		/**Platnost rodného čísla*/
		kval_rc?: number|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Doplněk rodného čísla*/
		rcd?: string|null;
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Kvalifikované státní občanství*/
		kval_st_obc?: number|null;
		/**Státní občanství*/
		stat_obc?: number|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**Národnost*/
		narodnost?: string|null;
		/**Okres narození*/
		okres_naroz?: string|null;
		/**Stát narození*/
		stat_naroz?: number|null;
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**Datum trvalého pobytu*/
		dat_tp?: JsonDate|null;
		/**Rodinný stav*/
		rod_stav?: number|null;
		/**Svéprávnost*/
		z_z?: number|null;
		/**Vzdělání*/
		vzdelani?: number|null;
		/**Zaměstnání*/
		zamestnani?: number|null;
		/**Ekonomická aktivita*/
		ekon_aktivita?: number|null;
		/**Vztah branná povinnost*/
		vztah_bp?: number|null;
		/**Kategorie obyvatel*/
		ktg_obyv?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**CS příjmení*/
		cs_prijmeni?: string|null;
		/**CS jmeno*/
		cs_jmeno?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum pávní moci způsobilosti*/
		dat_prav_moc_zz?: JsonDate|null;
		/**Číslo jednací způsobilosti*/
		cj_zz?: string|null;
		/**Název soudu*/
		nazev_soudu_zz?: string|null;
		/**Pořadové číslo občana*/
		pco?: number|null;
		/**Kód občana*/
		kod_ob?: number|null;
		/**Volební seznam*/
		vseznam?: number|null;
		/**Okrsek*/
		okrsek?: number|null;
		/**Byt*/
		byt?: string|null;
		/**Volební právo*/
		volebni_pravo?: number|null;
		/**Referenční údaje*/
		ref_udaje?: number|null;
		/**Aifo*/
		aifo?: string|null;
		/**Datum aktualizace z ISZR*/
		dat_akt_iszr?: JsonDate|null;
		/**Aifo z iseo*/
		aifo_iseo?: string|null;
		/**Datum aktualizace z Iseo*/
		dat_akt_iseo?: JsonDate|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		typ_pobytu_txt_unl?: string|null;
		/**Datum platnosti způsobilosti*/
		dat_do_zz?: JsonDate|null;
	}
	const enum GRobsosoDtoNames { ixs_oso = "ixs_oso", kval_rc = "kval_rc", rc = "rc", rcd = "rcd", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", kval_st_obc = "kval_st_obc", stat_obc = "stat_obc", mistonar = "mistonar", narodnost = "narodnost", okres_naroz = "okres_naroz", stat_naroz = "stat_naroz", typ_pobytu = "typ_pobytu", dat_tp = "dat_tp", rod_stav = "rod_stav", z_z = "z_z", vzdelani = "vzdelani", zamestnani = "zamestnani", ekon_aktivita = "ekon_aktivita", vztah_bp = "vztah_bp", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_prav_moc_zz = "dat_prav_moc_zz", cj_zz = "cj_zz", nazev_soudu_zz = "nazev_soudu_zz", pco = "pco", kod_ob = "kod_ob", vseznam = "vseznam", okrsek = "okrsek", byt = "byt", volebni_pravo = "volebni_pravo", ref_udaje = "ref_udaje", aifo = "aifo", dat_akt_iszr = "dat_akt_iszr", aifo_iseo = "aifo_iseo", dat_akt_iseo = "dat_akt_iseo", ico = "ico", typ_pobytu_txt_unl = "typ_pobytu_txt_unl", dat_do_zz = "dat_do_zz", Permissions = "Permissions",}
	const enum GRobsosoDtoFragments { ixs_oso = "Base", kval_rc = "Base", rc = "Base", rcd = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", kval_st_obc = "Base", stat_obc = "Base", mistonar = "Base", narodnost = "Base", okres_naroz = "Base", stat_naroz = "Base", typ_pobytu = "Base", dat_tp = "Base", rod_stav = "Base", z_z = "Base", vzdelani = "Base", zamestnani = "Base", ekon_aktivita = "Base", vztah_bp = "Base", ktg_obyv = "Base", stav_oso = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_prav_moc_zz = "Base", cj_zz = "Base", nazev_soudu_zz = "Base", pco = "Base", kod_ob = "Base", vseznam = "Base", okrsek = "Base", byt = "Base", volebni_pravo = "Base", ref_udaje = "Base", aifo = "Base", dat_akt_iszr = "Base", aifo_iseo = "Base", dat_akt_iseo = "Base", ico = "Base", typ_pobytu_txt_unl = "Base", dat_do_zz = "Base", Permissions = "*",}
	const enum GRobsosoDtoTypes { ixs_oso = "string", kval_rc = "number", rc = "string", rcd = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", kval_st_obc = "number", stat_obc = "number", mistonar = "string", narodnost = "string", okres_naroz = "string", stat_naroz = "number", typ_pobytu = "number", dat_tp = "JsonDate", rod_stav = "number", z_z = "number", vzdelani = "number", zamestnani = "number", ekon_aktivita = "number", vztah_bp = "number", ktg_obyv = "number", stav_oso = "number", cs_prijmeni = "string", cs_jmeno = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_prav_moc_zz = "JsonDate", cj_zz = "string", nazev_soudu_zz = "string", pco = "number", kod_ob = "number", vseznam = "number", okrsek = "number", byt = "string", volebni_pravo = "number", ref_udaje = "number", aifo = "string", dat_akt_iszr = "JsonDate", aifo_iseo = "string", dat_akt_iseo = "JsonDate", ico = "string", typ_pobytu_txt_unl = "string", dat_do_zz = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsosoDtoTypeLengths { ixs_oso = 12, rc = 10, rcd = 1, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, narodnost = 20, okres_naroz = 48, cs_prijmeni = 100, cs_jmeno = 100, poznamka = 50, zmenu_prov = 12, cj_zz = 100, nazev_soudu_zz = 50, byt = 5, aifo = 24, aifo_iseo = 24, ico = 10, typ_pobytu_txt_unl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobspriDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robspri
	*      Registr příjmení
	*/
	interface GRobspriDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobspriDtoNames { prijmeni = "prijmeni", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobspriDtoFragments { prijmeni = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobspriDtoTypes { prijmeni = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobspriDtoTypeLengths { prijmeni = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsprnDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsprn
	*      Porovnání ROB s registrem nemovitostí
	*/
	interface GRobsprnDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor porovnání*/
		ixs_prn?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Datum porovnání*/
		dat_porovnani?: JsonDate|null;
		/**Datum uložení*/
		dat_ulozeni?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobsprnDtoNames { ixs_prn = "ixs_prn", nazev = "nazev", popis = "popis", dat_porovnani = "dat_porovnani", dat_ulozeni = "dat_ulozeni", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsprnDtoFragments { ixs_prn = "Base", nazev = "Base", popis = "Base", dat_porovnani = "Base", dat_ulozeni = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsprnDtoTypes { ixs_prn = "string", nazev = "string", popis = "string", dat_porovnani = "JsonDate", dat_ulozeni = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsprnDtoTypeLengths { ixs_prn = 12, nazev = 100, popis = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobssezDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robssez
	*      Volební seznam (zvláštní seznam, komise, dodatek)
	*/
	interface GRobssezDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor seznamu*/
		ixs_sez?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Kód obce*/
		kod_o?: number|null;
		/**Pco*/
		pco?: number|null;
		/**Typ seznamu*/
		vseznam?: number|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Místo narození*/
		misto_nar?: string|null;
		/**Okres narození*/
		okres_nar?: string|null;
		/**Stát narození*/
		stat_nar?: number|null;
		/**Stát*/
		stat?: number|null;
		/**Okres*/
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Pražský obvod*/
		pobvod?: string|null;
		/**Městská část*/
		mcast?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Doplněk čísla domovního*/
		dcd?: string|null;
		/**Číslo ddomovní*/
		cd?: number|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Doplněk čísla orientačního*/
		pcor?: string|null;
		/**Poštovní směrovací číslo*/
		psc?: string|null;
		/**Okrsek*/
		okrsek?: number|null;
		/**Druh nezařazení*/
		druh_nez?: number|null;
		/**Identifikátor politické strany*/
		ixs_pol?: string|null;
		/**Identifikátor funkce*/
		ixs_fvk?: string|null;
		/**Odměna*/
		c_odmena?: JsonDecimal|null;
		/**Popis*/
		popis?: string|null;
		/**CS příjmení*/
		cs_prijmeni?: string|null;
		/**CS jméno*/
		cs_jmeno?: string|null;
		/**CS obec*/
		cs_obec?: string|null;
		/**CS část obce*/
		cs_cast_obce?: string|null;
		/**CS ulice*/
		cs_ulice?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Státní občanství*/
		stat_obc?: number|null;
		/**Pohlaví*/
		pohlavi?: number|null;
	}
	const enum GRobssezDtoNames { ixs_sez = "ixs_sez", ixs_oso = "ixs_oso", kod_o = "kod_o", pco = "pco", vseznam = "vseznam", por_cislo = "por_cislo", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", misto_nar = "misto_nar", okres_nar = "okres_nar", stat_nar = "stat_nar", stat = "stat", okres = "okres", obec = "obec", pobvod = "pobvod", mcast = "mcast", castobce = "castobce", ulice = "ulice", dcd = "dcd", cd = "cd", cor = "cor", pcor = "pcor", psc = "psc", okrsek = "okrsek", druh_nez = "druh_nez", ixs_pol = "ixs_pol", ixs_fvk = "ixs_fvk", c_odmena = "c_odmena", popis = "popis", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", cs_obec = "cs_obec", cs_cast_obce = "cs_cast_obce", cs_ulice = "cs_ulice", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", stat_obc = "stat_obc", pohlavi = "pohlavi", Permissions = "Permissions",}
	const enum GRobssezDtoFragments { ixs_sez = "Base", ixs_oso = "Base", kod_o = "Base", pco = "Base", vseznam = "Base", por_cislo = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", misto_nar = "Base", okres_nar = "Base", stat_nar = "Base", stat = "Base", okres = "Base", obec = "Base", pobvod = "Base", mcast = "Base", castobce = "Base", ulice = "Base", dcd = "Base", cd = "Base", cor = "Base", pcor = "Base", psc = "Base", okrsek = "Base", druh_nez = "Base", ixs_pol = "Base", ixs_fvk = "Base", c_odmena = "Base", popis = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", cs_obec = "Base", cs_cast_obce = "Base", cs_ulice = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", stat_obc = "Base", pohlavi = "Base", Permissions = "*",}
	const enum GRobssezDtoTypes { ixs_sez = "string", ixs_oso = "string", kod_o = "number", pco = "number", vseznam = "number", por_cislo = "number", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", misto_nar = "string", okres_nar = "string", stat_nar = "number", stat = "number", okres = "string", obec = "string", pobvod = "string", mcast = "string", castobce = "string", ulice = "string", dcd = "string", cd = "number", cor = "number", pcor = "string", psc = "string", okrsek = "number", druh_nez = "number", ixs_pol = "string", ixs_fvk = "string", c_odmena = "JsonDecimal", popis = "string", cs_prijmeni = "string", cs_jmeno = "string", cs_obec = "string", cs_cast_obce = "string", cs_ulice = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", stat_obc = "number", pohlavi = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobssezDtoTypeLengths { ixs_sez = 12, ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, misto_nar = 60, okres_nar = 48, okres = 48, obec = 48, pobvod = 48, mcast = 48, castobce = 48, ulice = 48, dcd = 1, pcor = 1, psc = 12, ixs_pol = 12, ixs_fvk = 12, popis = 254, cs_prijmeni = 100, cs_jmeno = 100, cs_obec = 48, cs_cast_obce = 48, cs_ulice = 48, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobssidDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robssid
	*      Inicializační dávka
	*/
	interface GRobssidDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**identifikátor inicializační dávky*/
		ixs_sid?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Datum načtení*/
		dat_nac?: JsonDate|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Kód obce*/
		kod_ob?: number|null;
		/**Obec*/
		obec_davka?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum kontroly*/
		dat_kontrola?: JsonDate|null;
	}
	const enum GRobssidDtoNames { ixs_sid = "ixs_sid", nazev = "nazev", popis = "popis", dat_nac = "dat_nac", dat_od = "dat_od", dat_do = "dat_do", kod_ob = "kod_ob", obec_davka = "obec_davka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_kontrola = "dat_kontrola", Permissions = "Permissions",}
	const enum GRobssidDtoFragments { ixs_sid = "Base", nazev = "Base", popis = "Base", dat_nac = "Base", dat_od = "Base", dat_do = "Base", kod_ob = "Base", obec_davka = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_kontrola = "Base", Permissions = "*",}
	const enum GRobssidDtoTypes { ixs_sid = "string", nazev = "string", popis = "string", dat_nac = "JsonDate", dat_od = "JsonDate", dat_do = "JsonDate", kod_ob = "number", obec_davka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_kontrola = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobssidDtoTypeLengths { ixs_sid = 12, nazev = 50, popis = 254, obec_davka = 48, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobstdoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robstdo
	*      Typ Dokladu
	*/
	interface GRobstdoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor dokladu*/
		ixs_tdo?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobstdoDtoNames { ixs_tdo = "ixs_tdo", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobstdoDtoFragments { ixs_tdo = "Base", nazev = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobstdoDtoTypes { ixs_tdo = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobstdoDtoTypeLengths { ixs_tdo = 12, nazev = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsudaDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsuda
	*      Událost
	*/
	interface GRobsudaDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Idenifikátor události*/
		ixs_uda?: string|null;
		/**Typ události*/
		typ_uda?: number|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**Ročník*/
		rocnik?: number|null;
		/**Strana*/
		strana?: number|null;
		/**Datum zápisu*/
		dat_zap_eo?: JsonDate|null;
		/**Datum události*/
		dat_uda?: JsonDate|null;
		/**Místo události*/
		misto_uda?: string|null;
		/**Stát události*/
		stat_uda?: number|null;
		/**Výrok*/
		vyrok?: string|null;
		/**Doklad*/
		cj_rozh?: string|null;
		/**Datum právní moci*/
		dat_prav_moc?: JsonDate|null;
		/**Platný*/
		s_platny?: number|null;
		/**Podpis*/
		s_podpis?: number|null;
		/**Oznámení*/
		s_oznameni?: number|null;
		/**Znak dítěte*/
		s_znak_dite?: number|null;
		/**Datum souhlasu*/
		dat_souhlas?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Místo události*/
		misto_uda_boz?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Identifikátor sta*/
		ixs_sta?: string|null;
		/**Schváleno*/
		schvaleno?: number|null;
		uca_nez?: number|null;
		/**Rozhodnutí*/
		cj_rozh_n?: string|null;
		/**Datum ze dne n*/
		dat_ze_dne_n?: JsonDate|null;
		/**Datum n*/
		dat_prm_n?: JsonDate|null;
		/**Vydal n*/
		vydal_n?: string|null;
		/**Popis*/
		popis_uda?: string|null;
		/**Datum podpisu*/
		dat_uda_pod?: JsonDate|null;
		/**Neurčeno*/
		s_neurceno?: number|null;
		/**Popis datum události*/
		popis_dat_uda?: string|null;
		/**Přejato*/
		s_prevzit?: number|null;
		/**Stav převzetí*/
		stav_prevzeti?: number|null;
		/**Overeno*/
		s_overeno?: number|null;
		/**Datum*/
		dat_overeni?: JsonDate|null;
		/**Popis ověření*/
		popis_overeni?: string|null;
		/**Občanský průkaz*/
		s_op?: number|null;
		/**Platnost OP*/
		dat_platnost_op?: JsonDate|null;
		/**Datum vydání OP*/
		dat_vydani?: JsonDate|null;
		/**Popis vydání OP*/
		popis_vydani?: string|null;
		/**Číslo CD*/
		s_cd?: number|null;
		/**Platnost CD*/
		dat_platnost_cd?: JsonDate|null;
		/**Zápis*/
		s_zapis?: number|null;
		/**Datum zápisu*/
		dat_zapis?: JsonDate|null;
		/**Popis zápisu*/
		popis_zapis?: string|null;
		/**Číslo CP*/
		cislo_cp?: string|null;
		/**Číslo OP*/
		cislo_op?: string|null;
		/**Čas svatby*/
		cas_svatby?: string|null;
		/**Spis*/
		ixp_spis?: string|null;
		/**Okres*/
		okres_uda?: string|null;
		/**Svazek*/
		svazek?: string|null;
		/**Datum iseo*/
		dat_iseo?: JsonDate|null;
		/**Rscp*/
		dat_rscp?: JsonDate|null;
		/**Datum předání*/
		dat_predani?: JsonDate|null;
		/**Datum podpisu uop*/
		dat_podpis_uop?: JsonDate|null;
		/**Textová událost*/
		dat_uda_txt?: string|null;
		/**Text*/
		stat_uda_txt?: string|null;
		/**Datum podpisu*/
		dat_podpis?: JsonDate|null;
		/**Ico*/
		ico?: string|null;
		/**Datum vydání*/
		dat_vydani_1?: JsonDate|null;
		/**Popis vydání*/
		popis_vydani_1?: string|null;
		/**Datum platnosti OP*/
		dat_platnost_op_1?: JsonDate|null;
		/**OP 1*/
		s_op_1?: number|null;
		/**Číslo OP 1*/
		cislo_op_1?: string|null;
	}
	const enum GRobsudaDtoNames { ixs_uda = "ixs_uda", typ_uda = "typ_uda", typ_ag = "typ_ag", rocnik = "rocnik", strana = "strana", dat_zap_eo = "dat_zap_eo", dat_uda = "dat_uda", misto_uda = "misto_uda", stat_uda = "stat_uda", vyrok = "vyrok", cj_rozh = "cj_rozh", dat_prav_moc = "dat_prav_moc", s_platny = "s_platny", s_podpis = "s_podpis", s_oznameni = "s_oznameni", s_znak_dite = "s_znak_dite", dat_souhlas = "dat_souhlas", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", misto_uda_boz = "misto_uda_boz", poznamka = "poznamka", ixs_sta = "ixs_sta", schvaleno = "schvaleno", uca_nez = "uca_nez", cj_rozh_n = "cj_rozh_n", dat_ze_dne_n = "dat_ze_dne_n", dat_prm_n = "dat_prm_n", vydal_n = "vydal_n", popis_uda = "popis_uda", dat_uda_pod = "dat_uda_pod", s_neurceno = "s_neurceno", popis_dat_uda = "popis_dat_uda", s_prevzit = "s_prevzit", stav_prevzeti = "stav_prevzeti", s_overeno = "s_overeno", dat_overeni = "dat_overeni", popis_overeni = "popis_overeni", s_op = "s_op", dat_platnost_op = "dat_platnost_op", dat_vydani = "dat_vydani", popis_vydani = "popis_vydani", s_cd = "s_cd", dat_platnost_cd = "dat_platnost_cd", s_zapis = "s_zapis", dat_zapis = "dat_zapis", popis_zapis = "popis_zapis", cislo_cp = "cislo_cp", cislo_op = "cislo_op", cas_svatby = "cas_svatby", ixp_spis = "ixp_spis", okres_uda = "okres_uda", svazek = "svazek", dat_iseo = "dat_iseo", dat_rscp = "dat_rscp", dat_predani = "dat_predani", dat_podpis_uop = "dat_podpis_uop", dat_uda_txt = "dat_uda_txt", stat_uda_txt = "stat_uda_txt", dat_podpis = "dat_podpis", ico = "ico", dat_vydani_1 = "dat_vydani_1", popis_vydani_1 = "popis_vydani_1", dat_platnost_op_1 = "dat_platnost_op_1", s_op_1 = "s_op_1", cislo_op_1 = "cislo_op_1", Permissions = "Permissions",}
	const enum GRobsudaDtoFragments { ixs_uda = "Base", typ_uda = "Base", typ_ag = "Base", rocnik = "Base", strana = "Base", dat_zap_eo = "Base", dat_uda = "Base", misto_uda = "Base", stat_uda = "Base", vyrok = "Base", cj_rozh = "Base", dat_prav_moc = "Base", s_platny = "Base", s_podpis = "Base", s_oznameni = "Base", s_znak_dite = "Base", dat_souhlas = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", misto_uda_boz = "Base", poznamka = "Base", ixs_sta = "Base", schvaleno = "Base", uca_nez = "Base", cj_rozh_n = "Base", dat_ze_dne_n = "Base", dat_prm_n = "Base", vydal_n = "Base", popis_uda = "Base", dat_uda_pod = "Base", s_neurceno = "Base", popis_dat_uda = "Base", s_prevzit = "Base", stav_prevzeti = "Base", s_overeno = "Base", dat_overeni = "Base", popis_overeni = "Base", s_op = "Base", dat_platnost_op = "Base", dat_vydani = "Base", popis_vydani = "Base", s_cd = "Base", dat_platnost_cd = "Base", s_zapis = "Base", dat_zapis = "Base", popis_zapis = "Base", cislo_cp = "Base", cislo_op = "Base", cas_svatby = "Base", ixp_spis = "Base", okres_uda = "Base", svazek = "Base", dat_iseo = "Base", dat_rscp = "Base", dat_predani = "Base", dat_podpis_uop = "Base", dat_uda_txt = "Base", stat_uda_txt = "Base", dat_podpis = "Base", ico = "Base", dat_vydani_1 = "Base", popis_vydani_1 = "Base", dat_platnost_op_1 = "Base", s_op_1 = "Base", cislo_op_1 = "Base", Permissions = "*",}
	const enum GRobsudaDtoTypes { ixs_uda = "string", typ_uda = "number", typ_ag = "number", rocnik = "number", strana = "number", dat_zap_eo = "JsonDate", dat_uda = "JsonDate", misto_uda = "string", stat_uda = "number", vyrok = "string", cj_rozh = "string", dat_prav_moc = "JsonDate", s_platny = "number", s_podpis = "number", s_oznameni = "number", s_znak_dite = "number", dat_souhlas = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", misto_uda_boz = "string", poznamka = "string", ixs_sta = "string", schvaleno = "number", uca_nez = "number", cj_rozh_n = "string", dat_ze_dne_n = "JsonDate", dat_prm_n = "JsonDate", vydal_n = "string", popis_uda = "string", dat_uda_pod = "JsonDate", s_neurceno = "number", popis_dat_uda = "string", s_prevzit = "number", stav_prevzeti = "number", s_overeno = "number", dat_overeni = "JsonDate", popis_overeni = "string", s_op = "number", dat_platnost_op = "JsonDate", dat_vydani = "JsonDate", popis_vydani = "string", s_cd = "number", dat_platnost_cd = "JsonDate", s_zapis = "number", dat_zapis = "JsonDate", popis_zapis = "string", cislo_cp = "string", cislo_op = "string", cas_svatby = "string", ixp_spis = "string", okres_uda = "string", svazek = "string", dat_iseo = "JsonDate", dat_rscp = "JsonDate", dat_predani = "JsonDate", dat_podpis_uop = "JsonDate", dat_uda_txt = "string", stat_uda_txt = "string", dat_podpis = "JsonDate", ico = "string", dat_vydani_1 = "JsonDate", popis_vydani_1 = "string", dat_platnost_op_1 = "JsonDate", s_op_1 = "number", cislo_op_1 = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsudaDtoTypeLengths { ixs_uda = 12, misto_uda = 100, vyrok = 50, cj_rozh = 100, zmenu_prov = 12, misto_uda_boz = 254, poznamka = 254, ixs_sta = 12, cj_rozh_n = 30, popis_uda = 100, cislo_cp = 30, cislo_op = 30, cislo_op_1 = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsuisDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsuis
	*      Žádost o výdej informací z informačního systému (informace vedené o osobě v IS)
	*/
	interface GRobsuisDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor žádosti ESU zadavatel*/
		ixs_uis?: string|null;
		ixs_esu_zad?: string|null;
		/**Identifikátor žádosti ESU zákonný zástupce*/
		ixs_esu_zak?: string|null;
		/**Identifikátor dokumentu zadavatel*/
		ixp_zad?: string|null;
		ixp_roz?: string|null;
		/**Číslo OP*/
		cislo_op?: string|null;
		/**Místo*/
		misto?: string|null;
		/**Datum vydání*/
		dat_vydani?: JsonDate|null;
		/**Datum zpracování*/
		dat_zprac?: JsonDate|null;
		/**Identifikátor zpracovatele*/
		ixs_fun_zprac?: string|null;
		/**Způsob vyřízení*/
		zpusob_vyriz?: number|null;
		/**Příznak vše*/
		s_vse?: number|null;
		/**Příznak historické záznamy*/
		s_historicke?: number|null;
		/**Příznak příjmení jméno*/
		s_prij_jme?: number|null;
		/**Příznak datum narození*/
		s_dat_naroz?: number|null;
		/**Příznak  pohlaví*/
		s_pohlavi?: number|null;
		/**Příznak místo narození*/
		s_mistonar?: number|null;
		/**Příznak rodné číslo*/
		s_rc?: number|null;
		/**Příznak státní občanství*/
		s_stat_obc?: number|null;
		/**Příznak adresa*/
		s_adresa?: number|null;
		/**Příznak datum trvalého pobytu od*/
		s_dat_tp_od?: number|null;
		/**Příznak způsobilost*/
		s_zpusobilost?: number|null;
		/**Příznak zákaz pobytu*/
		s_zakaz_pobytu?: number|null;
		/**Příznak rodné číslo rodiče*/
		s_rc_rodice?: number|null;
		/**Příznak rodinný stav*/
		s_rod_stav?: number|null;
		/**Příznak rodné číslo partnera*/
		s_rc_partner?: number|null;
		/**Příznak rodné číslo dítěte*/
		s_rc_dite?: number|null;
		/**Příznak osvojení*/
		s_osvojeni?: number|null;
		/**Příznak záznam o výdeji*/
		s_zaznam_o_vydeji?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Číslo OP zákonného zástupce*/
		cislo_op_zak?: string|null;
		/**Identifikátor ESU osoby blízké*/
		ixs_esu_obl?: string|null;
		/**Vztah osoby blízké*/
		vztah_obl?: number|null;
		/**Příznak předchozí adresa*/
		s_pred_adresa?: number|null;
		/**Příznak Doručovací adresa*/
		s_doruc_adresa?: number|null;
		/**Identifikátor žádosti*/
		s_sml_napomoc?: number|null;
		/**Příznak zastoupení členem domácnosti*/
		s_zast_clenem?: number|null;
		/**Příznak partnerství*/
		s_partnerstvi?: number|null;
		/**Příznak nezvěstnost*/
		s_nezcest?: number|null;
		/**Příznak nezvěstnost osoby blízké*/
		s_nezvest_obl?: number|null;
		/**Příznak úmrtí*/
		s_umrti?: number|null;
		/**Datum pobytu od*/
		datum_pobyt_od?: JsonDate|null;
	}
	const enum GRobsuisDtoNames { ixs_uis = "ixs_uis", ixs_esu_zad = "ixs_esu_zad", ixs_esu_zak = "ixs_esu_zak", ixp_zad = "ixp_zad", ixp_roz = "ixp_roz", cislo_op = "cislo_op", misto = "misto", dat_vydani = "dat_vydani", dat_zprac = "dat_zprac", ixs_fun_zprac = "ixs_fun_zprac", zpusob_vyriz = "zpusob_vyriz", s_vse = "s_vse", s_historicke = "s_historicke", s_prij_jme = "s_prij_jme", s_dat_naroz = "s_dat_naroz", s_pohlavi = "s_pohlavi", s_mistonar = "s_mistonar", s_rc = "s_rc", s_stat_obc = "s_stat_obc", s_adresa = "s_adresa", s_dat_tp_od = "s_dat_tp_od", s_zpusobilost = "s_zpusobilost", s_zakaz_pobytu = "s_zakaz_pobytu", s_rc_rodice = "s_rc_rodice", s_rod_stav = "s_rod_stav", s_rc_partner = "s_rc_partner", s_rc_dite = "s_rc_dite", s_osvojeni = "s_osvojeni", s_zaznam_o_vydeji = "s_zaznam_o_vydeji", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_op_zak = "cislo_op_zak", ixs_esu_obl = "ixs_esu_obl", vztah_obl = "vztah_obl", s_pred_adresa = "s_pred_adresa", s_doruc_adresa = "s_doruc_adresa", s_sml_napomoc = "s_sml_napomoc", s_zast_clenem = "s_zast_clenem", s_partnerstvi = "s_partnerstvi", s_nezcest = "s_nezcest", s_nezvest_obl = "s_nezvest_obl", s_umrti = "s_umrti", datum_pobyt_od = "datum_pobyt_od", Permissions = "Permissions",}
	const enum GRobsuisDtoFragments { ixs_uis = "Base", ixs_esu_zad = "Base", ixs_esu_zak = "Base", ixp_zad = "Base", ixp_roz = "Base", cislo_op = "Base", misto = "Base", dat_vydani = "Base", dat_zprac = "Base", ixs_fun_zprac = "Base", zpusob_vyriz = "Base", s_vse = "Base", s_historicke = "Base", s_prij_jme = "Base", s_dat_naroz = "Base", s_pohlavi = "Base", s_mistonar = "Base", s_rc = "Base", s_stat_obc = "Base", s_adresa = "Base", s_dat_tp_od = "Base", s_zpusobilost = "Base", s_zakaz_pobytu = "Base", s_rc_rodice = "Base", s_rod_stav = "Base", s_rc_partner = "Base", s_rc_dite = "Base", s_osvojeni = "Base", s_zaznam_o_vydeji = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cislo_op_zak = "Base", ixs_esu_obl = "Base", vztah_obl = "Base", s_pred_adresa = "Base", s_doruc_adresa = "Base", s_sml_napomoc = "Base", s_zast_clenem = "Base", s_partnerstvi = "Base", s_nezcest = "Base", s_nezvest_obl = "Base", s_umrti = "Base", datum_pobyt_od = "Base", Permissions = "*",}
	const enum GRobsuisDtoTypes { ixs_uis = "string", ixs_esu_zad = "string", ixs_esu_zak = "string", ixp_zad = "string", ixp_roz = "string", cislo_op = "string", misto = "string", dat_vydani = "JsonDate", dat_zprac = "JsonDate", ixs_fun_zprac = "string", zpusob_vyriz = "number", s_vse = "number", s_historicke = "number", s_prij_jme = "number", s_dat_naroz = "number", s_pohlavi = "number", s_mistonar = "number", s_rc = "number", s_stat_obc = "number", s_adresa = "number", s_dat_tp_od = "number", s_zpusobilost = "number", s_zakaz_pobytu = "number", s_rc_rodice = "number", s_rod_stav = "number", s_rc_partner = "number", s_rc_dite = "number", s_osvojeni = "number", s_zaznam_o_vydeji = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_op_zak = "string", ixs_esu_obl = "string", vztah_obl = "number", s_pred_adresa = "number", s_doruc_adresa = "number", s_sml_napomoc = "number", s_zast_clenem = "number", s_partnerstvi = "number", s_nezcest = "number", s_nezvest_obl = "number", s_umrti = "number", datum_pobyt_od = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsuisDtoTypeLengths { ixs_uis = 12, ixs_esu_zad = 12, ixs_esu_zak = 12, ixp_zad = 12, ixp_roz = 12, cislo_op = 50, misto = 48, ixs_fun_zprac = 12, poznamka = 254, zmenu_prov = 12, cislo_op_zak = 50, ixs_esu_obl = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsunlDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsunl
	*      Aktualizační dávka detail
	*/
	interface GRobsunlDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor detailu aktualizační dávky*/
		ixs_unl?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Datum načtení*/
		dat_nac?: JsonDate|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Kód obce*/
		kod_ob?: number|null;
		/**Obec*/
		obec_davka?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Datum kontroly*/
		dat_kontrola?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobsunlDtoNames { ixs_unl = "ixs_unl", nazev = "nazev", popis = "popis", dat_nac = "dat_nac", dat_od = "dat_od", dat_do = "dat_do", kod_ob = "kod_ob", obec_davka = "obec_davka", poznamka = "poznamka", dat_kontrola = "dat_kontrola", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsunlDtoFragments { ixs_unl = "Base", nazev = "Base", popis = "Base", dat_nac = "Base", dat_od = "Base", dat_do = "Base", kod_ob = "Base", obec_davka = "Base", poznamka = "Base", dat_kontrola = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsunlDtoTypes { ixs_unl = "string", nazev = "string", popis = "string", dat_nac = "JsonDate", dat_od = "JsonDate", dat_do = "JsonDate", kod_ob = "number", obec_davka = "string", poznamka = "string", dat_kontrola = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsunlDtoTypeLengths { ixs_unl = 12, nazev = 50, popis = 254, obec_davka = 48, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsvdnDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsvdn
	*      Druhy nezařazených občanů do voleb
	*/
	interface GRobsvdnDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		druh_nez?: number|null;
		/**Zkratka Druhu nezařazení*/
		zkratka?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Příznak vyřazení z voleb*/
		s_vyradit?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Vyřadit ze seznamu*/
		s_vyradit_seznam?: number|null;
		/**Zařadit do zvláštních*/
		s_zaradit_zvl?: number|null;
		/**Tisknot poznámku*/
		s_tisk_poznamky?: number|null;
		/**Formát poznámky*/
		format_poznamky?: string|null;
		/**Příznak rozdělení poznámky*/
		rozdelena_poznamka?: number|null;
	}
	const enum GRobsvdnDtoNames { druh_nez = "druh_nez", zkratka = "zkratka", popis = "popis", s_vyradit = "s_vyradit", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_vyradit_seznam = "s_vyradit_seznam", s_zaradit_zvl = "s_zaradit_zvl", s_tisk_poznamky = "s_tisk_poznamky", format_poznamky = "format_poznamky", rozdelena_poznamka = "rozdelena_poznamka", Permissions = "Permissions",}
	const enum GRobsvdnDtoFragments { druh_nez = "Base", zkratka = "Base", popis = "Base", s_vyradit = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_vyradit_seznam = "Base", s_zaradit_zvl = "Base", s_tisk_poznamky = "Base", format_poznamky = "Base", rozdelena_poznamka = "Base", Permissions = "*",}
	const enum GRobsvdnDtoTypes { druh_nez = "number", zkratka = "string", popis = "string", s_vyradit = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_vyradit_seznam = "number", s_zaradit_zvl = "number", s_tisk_poznamky = "number", format_poznamky = "string", rozdelena_poznamka = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsvdnDtoTypeLengths { zkratka = 10, popis = 50, poznamka = 50, zmenu_prov = 12, format_poznamky = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobsztpDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsztp
	*      Zákaz trvalého pobytu
	*/
	interface GRobsztpDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor zákazu trvalého pobytu*/
		ixs_ztp?: string|null;
		/**Identifikátor zákazu trvalého pobytu ESU*/
		ixs_esu_ztp?: string|null;
		/**Identifikátor adresy*/
		ixs_adr?: string|null;
		/**Identifikátor ESU zadavatele*/
		ixs_esu_zad?: string|null;
		/**Identifikátor ESU vydavatele*/
		ixs_esu_vyd?: string|null;
		/**Identifikátor rozhodnutí*/
		ixp_roz?: string|null;
		/**Číslo rozhodnutí*/
		cj_roz?: string|null;
		/**Popis*/
		popis_zakazu?: string|null;
		/**Datum rozhodnutí*/
		dat_roz?: JsonDate|null;
		/**Datum přijetí*/
		dat_prm?: JsonDate|null;
		/**Datum platnosti od*/
		dat_platnost_od?: JsonDate|null;
		/**Datum platnosti do*/
		dat_platnost_do?: JsonDate|null;
		/**Příznak vyhoštění*/
		s_vyhosteni?: number|null;
		/**Příznak důležitosti*/
		s_dulezitost?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobsztpDtoNames { ixs_ztp = "ixs_ztp", ixs_esu_ztp = "ixs_esu_ztp", ixs_adr = "ixs_adr", ixs_esu_zad = "ixs_esu_zad", ixs_esu_vyd = "ixs_esu_vyd", ixp_roz = "ixp_roz", cj_roz = "cj_roz", popis_zakazu = "popis_zakazu", dat_roz = "dat_roz", dat_prm = "dat_prm", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", s_vyhosteni = "s_vyhosteni", s_dulezitost = "s_dulezitost", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobsztpDtoFragments { ixs_ztp = "Base", ixs_esu_ztp = "Base", ixs_adr = "Base", ixs_esu_zad = "Base", ixs_esu_vyd = "Base", ixp_roz = "Base", cj_roz = "Base", popis_zakazu = "Base", dat_roz = "Base", dat_prm = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", s_vyhosteni = "Base", s_dulezitost = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobsztpDtoTypes { ixs_ztp = "string", ixs_esu_ztp = "string", ixs_adr = "string", ixs_esu_zad = "string", ixs_esu_vyd = "string", ixp_roz = "string", cj_roz = "string", popis_zakazu = "string", dat_roz = "JsonDate", dat_prm = "JsonDate", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", s_vyhosteni = "number", s_dulezitost = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobsztpDtoTypeLengths { ixs_ztp = 12, ixs_esu_ztp = 12, ixs_adr = 12, ixs_esu_zad = 12, ixs_esu_vyd = 12, ixp_roz = 12, cj_roz = 30, popis_zakazu = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobtvolDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robtvol
	*      Hlavní pracovní tabulka pro volby
	*/
	interface GRobtvolDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor voliče*/
		id_volic?: number|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Kód okrsku*/
		kod_o?: number|null;
		/**Počítačové číslo občana*/
		pco?: number|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Index pořadového čísla*/
		por_cislo_index?: number|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Datum osmnáctin*/
		dat_18?: JsonDate|null;
		/**Věk*/
		vek_datum?: number|null;
		/**Kvalifikace státního občanství*/
		kval_st_obc?: number|null;
		/**Státní občanství*/
		stat_obc?: number|null;
		/**Místo narození*/
		misto_nar?: string|null;
		/**Okres narození*/
		okres_nar?: string|null;
		/**Stát narození*/
		stat_nar?: number|null;
		/**Kategorie obyvatel*/
		ktg_obyv?: number|null;
		/**Typ Pobytu*/
		typ_pobytu?: number|null;
		/**Způsob zařazení*/
		zpus_zarad?: number|null;
		/**Stav voliče*/
		stav_volic?: number|null;
		/**Id průkazu*/
		id?: string|null;
		/**Stát*/
		stat?: number|null;
		/**Okres*/
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Pražský obvod*/
		pobvod?: string|null;
		/**Městská část*/
		mcast?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Součást adresy*/
		cor_cele?: string|null;
		/**Doplňující součást adresy*/
		cor?: string|null;
		/**Poštovní kód*/
		pcor?: string|null;
		/**Zajišťovací číslo*/
		s_cor_sude?: number|null;
		/**Datum změny*/
		dcd?: JsonDate|null;
		/**Číslo dokladu*/
		cd?: number|null;
		/**Adresa*/
		adresa?: string|null;
		/**Poštovní směrovací číslo*/
		psc?: string|null;
		/**Okresní úřad*/
		okrsek?: string|null;
		/**Druh nezletilosti*/
		druh_nez?: number|null;
		/**Identifikátor průkazu*/
		prukaz?: string|null;
		/**Písmeno*/
		pismeno?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Český přepis jména*/
		cs_prijmeni?: string|null;
		/**Český přepis jména*/
		cs_jmeno?: string|null;
		/**Český přepis obce*/
		cs_obec?: string|null;
		/**Český přepis části obce*/
		cs_cast_obce?: string|null;
		/**Český přepis ulice*/
		cs_ulice?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Kdo provedl změnu*/
		zmenu_prov?: string|null;
		/**Průkaz 2*/
		prukaz_2?: string|null;
		/**Průkaz 3*/
		prukaz_3?: string|null;
		/**Průkaz 4*/
		prukaz_4?: string|null;
		/**Okrsek pro roznášku*/
		okrsek_roznaska?: number|null;
		/**Záznam voliče*/
		z_z?: number|null;
		/**Volební právo*/
		volebni_pravo?: number|null;
	}
	const enum GRobtvolDtoNames { id_volic = "id_volic", ixs_oso = "ixs_oso", kod_o = "kod_o", pco = "pco", por_cislo = "por_cislo", por_cislo_index = "por_cislo_index", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", dat_18 = "dat_18", vek_datum = "vek_datum", kval_st_obc = "kval_st_obc", stat_obc = "stat_obc", misto_nar = "misto_nar", okres_nar = "okres_nar", stat_nar = "stat_nar", ktg_obyv = "ktg_obyv", typ_pobytu = "typ_pobytu", zpus_zarad = "zpus_zarad", stav_volic = "stav_volic", id = "id", stat = "stat", okres = "okres", obec = "obec", pobvod = "pobvod", mcast = "mcast", castobce = "castobce", ulice = "ulice", cor_cele = "cor_cele", cor = "cor", pcor = "pcor", s_cor_sude = "s_cor_sude", dcd = "dcd", cd = "cd", adresa = "adresa", psc = "psc", okrsek = "okrsek", druh_nez = "druh_nez", prukaz = "prukaz", pismeno = "pismeno", popis = "popis", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", cs_obec = "cs_obec", cs_cast_obce = "cs_cast_obce", cs_ulice = "cs_ulice", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prukaz_2 = "prukaz_2", prukaz_3 = "prukaz_3", prukaz_4 = "prukaz_4", okrsek_roznaska = "okrsek_roznaska", z_z = "z_z", volebni_pravo = "volebni_pravo", Permissions = "Permissions",}
	const enum GRobtvolDtoFragments { id_volic = "Base", ixs_oso = "Base", kod_o = "Base", pco = "Base", por_cislo = "Base", por_cislo_index = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", dat_18 = "Base", vek_datum = "Base", kval_st_obc = "Base", stat_obc = "Base", misto_nar = "Base", okres_nar = "Base", stat_nar = "Base", ktg_obyv = "Base", typ_pobytu = "Base", zpus_zarad = "Base", stav_volic = "Base", id = "Base", stat = "Base", okres = "Base", obec = "Base", pobvod = "Base", mcast = "Base", castobce = "Base", ulice = "Base", cor_cele = "Base", cor = "Base", pcor = "Base", s_cor_sude = "Base", dcd = "Base", cd = "Base", adresa = "Base", psc = "Base", okrsek = "Base", druh_nez = "Base", prukaz = "Base", pismeno = "Base", popis = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", cs_obec = "Base", cs_cast_obce = "Base", cs_ulice = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", prukaz_2 = "Base", prukaz_3 = "Base", prukaz_4 = "Base", okrsek_roznaska = "Base", z_z = "Base", volebni_pravo = "Base", Permissions = "*",}
	const enum GRobtvolDtoTypes { id_volic = "number", ixs_oso = "string", kod_o = "number", pco = "number", por_cislo = "number", por_cislo_index = "number", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", dat_18 = "JsonDate", vek_datum = "number", kval_st_obc = "number", stat_obc = "number", misto_nar = "string", okres_nar = "string", stat_nar = "number", ktg_obyv = "number", typ_pobytu = "number", zpus_zarad = "number", stav_volic = "number", id = "string", stat = "number", okres = "string", obec = "string", pobvod = "string", mcast = "string", castobce = "string", ulice = "string", cor_cele = "string", cor = "string", pcor = "string", s_cor_sude = "number", dcd = "JsonDate", cd = "number", adresa = "string", psc = "string", okrsek = "string", druh_nez = "number", prukaz = "string", pismeno = "string", popis = "string", cs_prijmeni = "string", cs_jmeno = "string", cs_obec = "string", cs_cast_obce = "string", cs_ulice = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prukaz_2 = "string", prukaz_3 = "string", prukaz_4 = "string", okrsek_roznaska = "number", z_z = "number", volebni_pravo = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobtvolDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, misto_nar = 60, okres_nar = 48, id = 12, okres = 48, obec = 48, pobvod = 48, mcast = 48, castobce = 48, ulice = 100, cor_cele = 12, cor = 12, pcor = 12, adresa = 255, psc = 12, okrsek = 48, prukaz = 12, pismeno = 1, popis = 255, cs_prijmeni = 255, cs_jmeno = 255, cs_obec = 255, cs_cast_obce = 255, cs_ulice = 255, poznamka = 255, zmenu_prov = 30, prukaz_2 = 12, prukaz_3 = 12, prukaz_4 = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobtvsoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robtvso
	*      Statistika věkového složení obce
	*/
	interface GRobtvsoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor funkčního místa*/
		ixs_fun?: string|null;
		/**Pořadové číslo*/
		id?: number|null;
		/**Obec*/
		obec?: string|null;
		/**ČástObce*/
		castobce?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Věková kategorie*/
		vek_kategorie?: string|null;
		/**Počet mužů*/
		pocet_muzi?: number|null;
		/**Počet žen*/
		pocet_zeny?: number|null;
		/**Celkový počet*/
		celkem?: number|null;
		/**Počet mužů v procentech*/
		pocet_muzi_proc?: JsonDecimal|null;
		/**Počet žen v procentech*/
		pocet_zeny_proc?: JsonDecimal|null;
		/**Počet celkem v procentech*/
		celkem_proc?: JsonDecimal|null;
	}
	const enum GRobtvsoDtoNames { ixs_fun = "ixs_fun", id = "id", obec = "obec", castobce = "castobce", popis = "popis", vek_kategorie = "vek_kategorie", pocet_muzi = "pocet_muzi", pocet_zeny = "pocet_zeny", celkem = "celkem", pocet_muzi_proc = "pocet_muzi_proc", pocet_zeny_proc = "pocet_zeny_proc", celkem_proc = "celkem_proc", Permissions = "Permissions",}
	const enum GRobtvsoDtoFragments { ixs_fun = "Base", id = "Base", obec = "Base", castobce = "Base", popis = "Base", vek_kategorie = "Base", pocet_muzi = "Base", pocet_zeny = "Base", celkem = "Base", pocet_muzi_proc = "Base", pocet_zeny_proc = "Base", celkem_proc = "Base", Permissions = "*",}
	const enum GRobtvsoDtoTypes { ixs_fun = "string", id = "number", obec = "string", castobce = "string", popis = "string", vek_kategorie = "string", pocet_muzi = "number", pocet_zeny = "number", celkem = "number", pocet_muzi_proc = "JsonDecimal", pocet_zeny_proc = "JsonDecimal", celkem_proc = "JsonDecimal", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobtvsoDtoTypeLengths { ixs_fun = 12, obec = 48, castobce = 48, popis = 150, vek_kategorie = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvjmeDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvjme
	*      Archiv jmen osoby
	*/
	interface GRobvjmeDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Typ jména*/
		typ_jme?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobvjmeDtoNames { ixs_oso = "ixs_oso", typ_jme = "typ_jme", dat_od = "dat_od", jmeno = "jmeno", dat_do = "dat_do", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobvjmeDtoFragments { ixs_oso = "Base", typ_jme = "Base", dat_od = "Base", jmeno = "Base", dat_do = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobvjmeDtoTypes { ixs_oso = "string", typ_jme = "number", dat_od = "JsonDate", jmeno = "string", dat_do = "JsonDate", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvjmeDtoTypeLengths { ixs_oso = 12, jmeno = 100, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvosoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvoso
	*      Vztahy osob
	*/
	interface GRobvosoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor první osoby*/
		ixs_oso_1?: string|null;
		/**Identifikátor druhé osoby*/
		ixs_oso_2?: string|null;
		/**Typ vztahu mezi osobami*/
		typ_vztahu?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobvosoDtoNames { ixs_oso_1 = "ixs_oso_1", ixs_oso_2 = "ixs_oso_2", typ_vztahu = "typ_vztahu", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobvosoDtoFragments { ixs_oso_1 = "Base", ixs_oso_2 = "Base", typ_vztahu = "Base", dat_od = "Base", dat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobvosoDtoTypes { ixs_oso_1 = "string", ixs_oso_2 = "string", typ_vztahu = "number", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvosoDtoTypeLengths { ixs_oso_1 = 12, ixs_oso_2 = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvpriDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvpri
	*      Příjmení osoby
	*/
	interface GRobvpriDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Typ příjmení*/
		typ_prij?: number|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobvpriDtoNames { ixs_oso = "ixs_oso", typ_prij = "typ_prij", dat_od = "dat_od", prijmeni = "prijmeni", dat_do = "dat_do", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobvpriDtoFragments { ixs_oso = "Base", typ_prij = "Base", dat_od = "Base", prijmeni = "Base", dat_do = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobvpriDtoTypes { ixs_oso = "string", typ_prij = "number", dat_od = "JsonDate", prijmeni = "string", dat_do = "JsonDate", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvpriDtoTypeLengths { ixs_oso = 12, prijmeni = 100, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvpruDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvpru
	*      Průkazy osob
	*/
	interface GRobvpruDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Typ průkazu*/
		typ_pruk?: number|null;
		/**Číslo průkazu*/
		cislo_pruk?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Vydal*/
		vydal?: string|null;
		/**Datum vydání průkazu*/
		dat_vyd?: JsonDate|null;
		/**Identifikátor průkazu*/
		ixp?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobvpruDtoNames { ixs_oso = "ixs_oso", typ_pruk = "typ_pruk", cislo_pruk = "cislo_pruk", dat_od = "dat_od", dat_do = "dat_do", vydal = "vydal", dat_vyd = "dat_vyd", ixp = "ixp", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobvpruDtoFragments { ixs_oso = "Base", typ_pruk = "Base", cislo_pruk = "Base", dat_od = "Base", dat_do = "Base", vydal = "Base", dat_vyd = "Base", ixp = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobvpruDtoTypes { ixs_oso = "string", typ_pruk = "number", cislo_pruk = "string", dat_od = "JsonDate", dat_do = "JsonDate", vydal = "string", dat_vyd = "JsonDate", ixp = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvpruDtoTypeLengths { ixs_oso = 12, cislo_pruk = 30, vydal = 50, ixp = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvpzpDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvpzp
	*      Potvrzení o změně adresy
	*/
	interface GRobvpzpDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor bydliště*/
		ixs_byd?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Číslo průkazu*/
		cislo?: string|null;
		/**Datum změny*/
		dat_zmeny?: JsonDate|null;
		/**Datum vydání průkazu*/
		dat_vydani?: JsonDate|null;
		/**Identifikátor fukčního místa
		*       Identifikátor fukčního místa které průkaz vydalo
		*/
		ixs_fun_vyd?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobvpzpDtoNames { ixs_byd = "ixs_byd", ixp = "ixp", cislo = "cislo", dat_zmeny = "dat_zmeny", dat_vydani = "dat_vydani", ixs_fun_vyd = "ixs_fun_vyd", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobvpzpDtoFragments { ixs_byd = "Base", ixp = "Base", cislo = "Base", dat_zmeny = "Base", dat_vydani = "Base", ixs_fun_vyd = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobvpzpDtoTypes { ixs_byd = "string", ixp = "string", cislo = "string", dat_zmeny = "JsonDate", dat_vydani = "JsonDate", ixs_fun_vyd = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvpzpDtoTypeLengths { ixs_byd = 12, ixp = 12, cislo = 8, ixs_fun_vyd = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvrciDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvrci
	*      Archiv rodných čísel
	*/
	interface GRobvrciDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor Osoby*/
		ixs_oso?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Doplněk rodného čísla*/
		rcd?: string|null;
		/**Platnost rodného čísla*/
		kval_rc?: number|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobvrciDtoNames { ixs_oso = "ixs_oso", dat_od = "dat_od", rc = "rc", rcd = "rcd", kval_rc = "kval_rc", dat_do = "dat_do", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobvrciDtoFragments { ixs_oso = "Base", dat_od = "Base", rc = "Base", rcd = "Base", kval_rc = "Base", dat_do = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobvrciDtoTypes { ixs_oso = "string", dat_od = "JsonDate", rc = "string", rcd = "string", kval_rc = "number", dat_do = "JsonDate", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvrciDtoTypeLengths { ixs_oso = 12, rc = 10, rcd = 1, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvstoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvsto
	*      Další státní občanství osoby
	*/
	interface GRobvstoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Stát*/
		stat?: number|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Kvalifikované státní občanství*/
		kval_st_obc?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GRobvstoDtoNames { ixs_oso = "ixs_oso", dat_od = "dat_od", stat = "stat", dat_do = "dat_do", kval_st_obc = "kval_st_obc", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRobvstoDtoFragments { ixs_oso = "Base", dat_od = "Base", stat = "Base", dat_do = "Base", kval_st_obc = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRobvstoDtoTypes { ixs_oso = "string", dat_od = "JsonDate", stat = "number", dat_do = "JsonDate", kval_st_obc = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvstoDtoTypeLengths { ixs_oso = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GRobvvpoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robvvpo
	*      Nezařazení občané do voleb
	*/
	interface GRobvvpoDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor Osoby*/
		ixs_oso?: string|null;
		/**Druh nezařazení*/
		druh_nez?: number|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Průkaz*/
		prukaz?: string|null;
		/**Průkaz2*/
		prukaz_2?: string|null;
		/**Průkaz3*/
		prukaz_3?: string|null;
		/**Průkaz4*/
		prukaz_4?: string|null;
	}
	const enum GRobvvpoDtoNames { ixs_oso = "ixs_oso", druh_nez = "druh_nez", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prukaz = "prukaz", prukaz_2 = "prukaz_2", prukaz_3 = "prukaz_3", prukaz_4 = "prukaz_4", Permissions = "Permissions",}
	const enum GRobvvpoDtoFragments { ixs_oso = "Base", druh_nez = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", prukaz = "Base", prukaz_2 = "Base", prukaz_3 = "Base", prukaz_4 = "Base", Permissions = "*",}
	const enum GRobvvpoDtoTypes { ixs_oso = "string", druh_nez = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prukaz = "string", prukaz_2 = "string", prukaz_3 = "string", prukaz_4 = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobvvpoDtoTypeLengths { ixs_oso = 12, poznamka = 50, zmenu_prov = 12, prukaz = 30, prukaz_2 = 30, prukaz_3 = 30, prukaz_4 = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GSzrsadrDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:szrsadr
	*      Adresní místa - stav
	*/
	interface GSzrsadrDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Kód adresního místa*/
		adresni_misto_kod?: number|null;
		/**Kód okresu*/
		okres_kod?: number|null;
		/**Kód obce*/
		obec_kod?: number|null;
		/**Kód části obce*/
		cast_obce_kod?: number|null;
		/**Kód ulice*/
		ulice_kod?: number|null;
		/**Kód pošty*/
		posta_kod?: number|null;
		/**Kód stavebního objektu*/
		staveb_objekt_kod?: number|null;
		/**Kód typu domovního čísla*/
		typ_cis_dom_kod?: number|null;
		/**Domovní číslo*/
		cislo_domovni?: number|null;
		/**Orientační číslo*/
		cislo_orientacni?: number|null;
		/**Písmeno u čísla orientačního*/
		cislo_or_pismeno?: string|null;
		/**Čas odpovědi*/
		cas_odpovedi?: JsonDate|null;
		/**Aktivita záznamu dle gincakt b*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Číslo popisné*/
		cpop?: string|null;
		/**Číslo orientační*/
		cor?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
		/**Kód volebního obvodu*/
		vo_kod?: number|null; 
	}
	const enum GSzrsadrDtoNames { adresni_misto_kod = "adresni_misto_kod", okres_kod = "okres_kod", obec_kod = "obec_kod", cast_obce_kod = "cast_obce_kod", ulice_kod = "ulice_kod", posta_kod = "posta_kod", staveb_objekt_kod = "staveb_objekt_kod", typ_cis_dom_kod = "typ_cis_dom_kod", cislo_domovni = "cislo_domovni", cislo_orientacni = "cislo_orientacni", cislo_or_pismeno = "cislo_or_pismeno", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cpop = "cpop", cor = "cor", dat_od = "dat_od", dat_do = "dat_do", vo_kod = "vo_kod", Permissions = "Permissions",}
	const enum GSzrsadrDtoFragments { adresni_misto_kod = "Base", okres_kod = "Base", obec_kod = "Base", cast_obce_kod = "Base", ulice_kod = "Base", posta_kod = "Base", staveb_objekt_kod = "Base", typ_cis_dom_kod = "Base", cislo_domovni = "Base", cislo_orientacni = "Base", cislo_or_pismeno = "Base", cas_odpovedi = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cpop = "Base", cor = "Base", dat_od = "Base", dat_do = "Base", vo_kod = "Base", Permissions = "*",}
	const enum GSzrsadrDtoTypes { adresni_misto_kod = "number", okres_kod = "number", obec_kod = "number", cast_obce_kod = "number", ulice_kod = "number", posta_kod = "number", staveb_objekt_kod = "number", typ_cis_dom_kod = "number", cislo_domovni = "number", cislo_orientacni = "number", cislo_or_pismeno = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cpop = "string", cor = "string", dat_od = "JsonDate", dat_do = "JsonDate", vo_kod = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSzrsadrDtoTypeLengths { cislo_or_pismeno = 1, zmenu_prov = 12, cpop = 8, cor = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GSzrsoboDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:szrsobo
	*      Obyvatel - občanství
	*/
	interface GSzrsoboDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		aifo?: string|null;
		kod_stat?: number|null;
		zmena_cas_obcanst?: JsonDate|null;
		stav_obcanstvi?: number|null;
		cas_odpovedi?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
	}
	const enum GSzrsoboDtoNames { aifo = "aifo", kod_stat = "kod_stat", zmena_cas_obcanst = "zmena_cas_obcanst", stav_obcanstvi = "stav_obcanstvi", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GSzrsoboDtoFragments { aifo = "*", kod_stat = "*", zmena_cas_obcanst = "*", stav_obcanstvi = "*", cas_odpovedi = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", Permissions = "*",}
	const enum GSzrsoboDtoTypes { aifo = "string", kod_stat = "number", zmena_cas_obcanst = "JsonDate", stav_obcanstvi = "number", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSzrsoboDtoTypeLengths { aifo = 24, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\BaseDto\GSzrsrobDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:szrsrob
	*      Obyvatel
	*/
	interface GSzrsrobDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Aifo*/
		aifo?: string|null;
		/**Kód adresního místa*/
		adresni_misto_kod?: number|null;
		/**Stav adresy pobytu*/
		stav_adr_pobytu?: number|null;
		/**Datum narození*/
		datum_narozeni?: JsonDate|null;
		/**Datum úmrtí*/
		datum_umrti?: JsonDate|null;
		/**Datum právní moci úmrtí*/
		dat_prav_moc_umrti?: JsonDate|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Přihlášení ke změnám*/
		prihlaseni_zmen?: number|null;
		/**Stav doručovací adresy*/
		stav_doruc_adr?: number|null;
		/**Doručovací adresa čr*/
		doruc_adr_cr?: number|null;
		/**Doručovací adresa ostatní*/
		doruc_adr_ostatni?: string|null;
		/**Stav místa narození*/
		stav_misto_naroz?: number|null;
		/**Místo narození čr*/
		misto_naroz_cr?: number|null;
		/**Místo narození svět*/
		misto_naroz_svet?: string|null;
		/**Stav místa úmrtí*/
		stav_misto_umrti?: number|null;
		/**Místo úmrtí čr*/
		misto_umrti_cr?: number|null;
		/**Místo úmrtí svět*/
		misto_umrti_svet?: string|null;
		/**Čas odpovědi*/
		cas_odpovedi?: JsonDate|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**OVM*/
		ovm?: string|null;
		/**AIS*/
		ais?: number|null;
		/**Agenda*/
		agenda?: string|null;
		/**Kód státu narození*/
		stat_kod_naroz?: number|null;
		/**Kód státu úmrtí*/
		stat_kod_umrti?: number|null;
		/**Id ds*/
		id_ds?: string|null;
		/**Datum aktualizace*/
		dat_akt?: JsonDate|null;
		/**Místo narození obec*/
		misto_nar_obec?: number|null;
		/**Místo úmrtí obec*/
		misto_umr_obec?: number|null;
		/**Stav aifo*/
		stav_aifo?: number|null;
		/**Stav id ds*/
		stav_id_ds?: number|null;
		/**Stav datum narození*/
		stav_datum_naroz?: number|null;
		/**Stav datum úmrtí*/
		stav_datum_umrti?: number|null;
		/**Stav datum právní moci úmrtí*/
		stav_dat_pra_umr?: number|null;
		/**Stav jména*/
		stav_jmeno?: number|null;
		/**Stav příjmení*/
		stav_prijmeni?: number|null;
		/**Datum změny aifo*/
		zmn_aifo?: JsonDate|null;
		/**Datum změny adresy pobytu*/
		zmn_adr_pobytu?: JsonDate|null;
		/**Datum změny doručovací adresy*/
		zmn_doruc_adr?: JsonDate|null;
		/**Datum změny místa narození*/
		zmn_misto_naroz?: JsonDate|null;
		/**Datum změny místa úmrtí*/
		zmn_misto_umrti?: JsonDate|null;
		/**Datum změny id ds*/
		zmn_id_ds?: JsonDate|null;
		/**Datum změny data narození*/
		zmn_datum_naroz?: JsonDate|null;
		/**Datum změny data úmrtí*/
		zmn_datum_umrti?: JsonDate|null;
		/**Datum změny data právní moci úmrtí*/
		zmn_dat_pra_umr?: JsonDate|null;
		/**Datum změny jména*/
		zmn_jmeno?: JsonDate|null;
		/**Datum změny příjmení*/
		zmn_prijmeni?: JsonDate|null;
		/**Příznak že se jedná o adresu úřadu*/
		adresa_uradu?: number|null;
		/**Email*/
		email?: string|null;
		/**Datum změny emailu*/
		zmn_email?: JsonDate|null;
		/**Omezení svéprávnosti*/
		omezeni_svp?: number|null;
		/**Datum změny omezení svéprávnosti*/
		zmn_omezeni_svp?: JsonDate|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Datum změny pohlaví*/
		zmn_pohlavi?: JsonDate|null;
		/**Rodinný, partnerský vztah stav*/
		rod_par_stav?: number|null;
		/**Datum změny rodinného/partnerského vztahu*/
		zmn_rod_par_stav?: JsonDate|null;
		/**Rodné příjmení*/
		rod_prijmeni?: string|null;
		/**Datum změny rodného příjmení*/
		zmn_rod_prijmeni?: JsonDate|null;
		/**Telefon*/
		telefon?: string|null;
		/**Datum změny telefonu*/
		zmn_telefon?: JsonDate|null;
		/**Stav email*/
		stav_email?: number|null;
		/**Stav omezení svéprávnosti*/
		stav_omezeni_svp?: number|null;
		/**Stav pohlaví*/
		stav_pohlavi?: number|null;
		/**Stav rodinného/partnerského stavu*/
		stav_rod_par_stav?: number|null;
		/**Stav rodného příjmení*/
		stav_rod_prijmeni?: number|null;
		/**Stav telefon*/
		stav_telefon?: number|null;
		/**Kód státu narození*/
		stat_kod_narozeni?: number|null;
	}
	const enum GSzrsrobDtoNames { aifo = "aifo", adresni_misto_kod = "adresni_misto_kod", stav_adr_pobytu = "stav_adr_pobytu", datum_narozeni = "datum_narozeni", datum_umrti = "datum_umrti", dat_prav_moc_umrti = "dat_prav_moc_umrti", jmeno = "jmeno", prijmeni = "prijmeni", prihlaseni_zmen = "prihlaseni_zmen", stav_doruc_adr = "stav_doruc_adr", doruc_adr_cr = "doruc_adr_cr", doruc_adr_ostatni = "doruc_adr_ostatni", stav_misto_naroz = "stav_misto_naroz", misto_naroz_cr = "misto_naroz_cr", misto_naroz_svet = "misto_naroz_svet", stav_misto_umrti = "stav_misto_umrti", misto_umrti_cr = "misto_umrti_cr", misto_umrti_svet = "misto_umrti_svet", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ovm = "ovm", ais = "ais", agenda = "agenda", stat_kod_naroz = "stat_kod_naroz", stat_kod_umrti = "stat_kod_umrti", id_ds = "id_ds", dat_akt = "dat_akt", misto_nar_obec = "misto_nar_obec", misto_umr_obec = "misto_umr_obec", stav_aifo = "stav_aifo", stav_id_ds = "stav_id_ds", stav_datum_naroz = "stav_datum_naroz", stav_datum_umrti = "stav_datum_umrti", stav_dat_pra_umr = "stav_dat_pra_umr", stav_jmeno = "stav_jmeno", stav_prijmeni = "stav_prijmeni", zmn_aifo = "zmn_aifo", zmn_adr_pobytu = "zmn_adr_pobytu", zmn_doruc_adr = "zmn_doruc_adr", zmn_misto_naroz = "zmn_misto_naroz", zmn_misto_umrti = "zmn_misto_umrti", zmn_id_ds = "zmn_id_ds", zmn_datum_naroz = "zmn_datum_naroz", zmn_datum_umrti = "zmn_datum_umrti", zmn_dat_pra_umr = "zmn_dat_pra_umr", zmn_jmeno = "zmn_jmeno", zmn_prijmeni = "zmn_prijmeni", adresa_uradu = "adresa_uradu", email = "email", zmn_email = "zmn_email", omezeni_svp = "omezeni_svp", zmn_omezeni_svp = "zmn_omezeni_svp", pohlavi = "pohlavi", zmn_pohlavi = "zmn_pohlavi", rod_par_stav = "rod_par_stav", zmn_rod_par_stav = "zmn_rod_par_stav", rod_prijmeni = "rod_prijmeni", zmn_rod_prijmeni = "zmn_rod_prijmeni", telefon = "telefon", zmn_telefon = "zmn_telefon", stav_email = "stav_email", stav_omezeni_svp = "stav_omezeni_svp", stav_pohlavi = "stav_pohlavi", stav_rod_par_stav = "stav_rod_par_stav", stav_rod_prijmeni = "stav_rod_prijmeni", stav_telefon = "stav_telefon", stat_kod_narozeni = "stat_kod_narozeni", Permissions = "Permissions",}
	const enum GSzrsrobDtoFragments { aifo = "Base", adresni_misto_kod = "Base", stav_adr_pobytu = "Base", datum_narozeni = "Base", datum_umrti = "Base", dat_prav_moc_umrti = "Base", jmeno = "Base", prijmeni = "Base", prihlaseni_zmen = "Base", stav_doruc_adr = "Base", doruc_adr_cr = "Base", doruc_adr_ostatni = "Base", stav_misto_naroz = "Base", misto_naroz_cr = "Base", misto_naroz_svet = "Base", stav_misto_umrti = "Base", misto_umrti_cr = "Base", misto_umrti_svet = "Base", cas_odpovedi = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ovm = "Base", ais = "Base", agenda = "Base", stat_kod_naroz = "Base", stat_kod_umrti = "Base", id_ds = "Base", dat_akt = "Base", misto_nar_obec = "Base", misto_umr_obec = "Base", stav_aifo = "Base", stav_id_ds = "Base", stav_datum_naroz = "Base", stav_datum_umrti = "Base", stav_dat_pra_umr = "Base", stav_jmeno = "Base", stav_prijmeni = "Base", zmn_aifo = "Base", zmn_adr_pobytu = "Base", zmn_doruc_adr = "Base", zmn_misto_naroz = "Base", zmn_misto_umrti = "Base", zmn_id_ds = "Base", zmn_datum_naroz = "Base", zmn_datum_umrti = "Base", zmn_dat_pra_umr = "Base", zmn_jmeno = "Base", zmn_prijmeni = "Base", adresa_uradu = "Base", email = "Base", zmn_email = "Base", omezeni_svp = "Base", zmn_omezeni_svp = "Base", pohlavi = "Base", zmn_pohlavi = "Base", rod_par_stav = "Base", zmn_rod_par_stav = "Base", rod_prijmeni = "Base", zmn_rod_prijmeni = "Base", telefon = "Base", zmn_telefon = "Base", stav_email = "Base", stav_omezeni_svp = "Base", stav_pohlavi = "Base", stav_rod_par_stav = "Base", stav_rod_prijmeni = "Base", stav_telefon = "Base", stat_kod_narozeni = "Base", Permissions = "*",}
	const enum GSzrsrobDtoTypes { aifo = "string", adresni_misto_kod = "number", stav_adr_pobytu = "number", datum_narozeni = "JsonDate", datum_umrti = "JsonDate", dat_prav_moc_umrti = "JsonDate", jmeno = "string", prijmeni = "string", prihlaseni_zmen = "number", stav_doruc_adr = "number", doruc_adr_cr = "number", doruc_adr_ostatni = "string", stav_misto_naroz = "number", misto_naroz_cr = "number", misto_naroz_svet = "string", stav_misto_umrti = "number", misto_umrti_cr = "number", misto_umrti_svet = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ovm = "string", ais = "number", agenda = "string", stat_kod_naroz = "number", stat_kod_umrti = "number", id_ds = "string", dat_akt = "JsonDate", misto_nar_obec = "number", misto_umr_obec = "number", stav_aifo = "number", stav_id_ds = "number", stav_datum_naroz = "number", stav_datum_umrti = "number", stav_dat_pra_umr = "number", stav_jmeno = "number", stav_prijmeni = "number", zmn_aifo = "JsonDate", zmn_adr_pobytu = "JsonDate", zmn_doruc_adr = "JsonDate", zmn_misto_naroz = "JsonDate", zmn_misto_umrti = "JsonDate", zmn_id_ds = "JsonDate", zmn_datum_naroz = "JsonDate", zmn_datum_umrti = "JsonDate", zmn_dat_pra_umr = "JsonDate", zmn_jmeno = "JsonDate", zmn_prijmeni = "JsonDate", adresa_uradu = "number", email = "string", zmn_email = "JsonDate", omezeni_svp = "number", zmn_omezeni_svp = "JsonDate", pohlavi = "number", zmn_pohlavi = "JsonDate", rod_par_stav = "number", zmn_rod_par_stav = "JsonDate", rod_prijmeni = "string", zmn_rod_prijmeni = "JsonDate", telefon = "string", zmn_telefon = "JsonDate", stav_email = "number", stav_omezeni_svp = "number", stav_pohlavi = "number", stav_rod_par_stav = "number", stav_rod_prijmeni = "number", stav_telefon = "number", stat_kod_narozeni = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSzrsrobDtoTypeLengths { aifo = 24, jmeno = 100, prijmeni = 100, doruc_adr_ostatni = 255, misto_naroz_svet = 100, misto_umrti_svet = 100, zmenu_prov = 12, ovm = 36, agenda = 15, id_ds = 100, email = 100, rod_prijmeni = 100, telefon = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GBydlistePotvrzOZmeneROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Potvrzení o změně adresy*/
	interface GBydlistePotvrzOZmeneROBDto extends Gordic.Rob.Interface.GRobvpzpDto {
		/**Rodné íslo osoby*/
		robsoso_rc?: string|null;
		/**Jméno osoby*/
		robsoso_jmeno?: string|null;
		/**Příjmení osoby*/
		robsoso_prijmeni?: string|null;
		/**Datum narozeí osoby*/
		robsoso_dat_naroz?: JsonDate|null;
		/**Stav osoby*/
		robsoso_stav_oso?: number|null;
		/**Identifikátor osoby*/
		robsoso_ixs_oso?: string|null;
		/**Datum odstěhování*/
		robsbyd_dat_do?: JsonDate|null;
		/**Stav bydliště*/
		robsbyd_stav_bydl?: number|null;
		/**Stav bydliště textově*/
		robcstb_stav_bydl_txt?: string|null;
		/**Rodné číslo s lomítkem*/
		rc_lomitko?: string|null;
		/**Stav bydliště textově*/
		stav_bydl_text?: string|null;
		/**Identifikátor funkce*/
		ixs_fun?: string|null;
	}
	const enum GBydlistePotvrzOZmeneROBDtoNames { robsoso_rc = "robsoso_rc", robsoso_jmeno = "robsoso_jmeno", robsoso_prijmeni = "robsoso_prijmeni", robsoso_dat_naroz = "robsoso_dat_naroz", robsoso_stav_oso = "robsoso_stav_oso", robsoso_ixs_oso = "robsoso_ixs_oso", robsbyd_dat_do = "robsbyd_dat_do", robsbyd_stav_bydl = "robsbyd_stav_bydl", robcstb_stav_bydl_txt = "robcstb_stav_bydl_txt", rc_lomitko = "rc_lomitko", stav_bydl_text = "stav_bydl_text", ixs_fun = "ixs_fun", ixs_byd = "ixs_byd", ixp = "ixp", cislo = "cislo", dat_zmeny = "dat_zmeny", dat_vydani = "dat_vydani", ixs_fun_vyd = "ixs_fun_vyd", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GBydlistePotvrzOZmeneROBDtoFragments { robsoso_rc = "Extended", robsoso_jmeno = "Extended", robsoso_prijmeni = "Extended", robsoso_dat_naroz = "Extended", robsoso_stav_oso = "Extended", robsoso_ixs_oso = "Extended", robsbyd_dat_do = "Extended", robsbyd_stav_bydl = "Extended", robcstb_stav_bydl_txt = "Extended", rc_lomitko = "Extended", stav_bydl_text = "Extended", ixs_fun = "Base", ixs_byd = "Base", ixp = "Base", cislo = "Base", dat_zmeny = "Base", dat_vydani = "Base", ixs_fun_vyd = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GBydlistePotvrzOZmeneROBDtoTypes { robsoso_rc = "string", robsoso_jmeno = "string", robsoso_prijmeni = "string", robsoso_dat_naroz = "JsonDate", robsoso_stav_oso = "number", robsoso_ixs_oso = "string", robsbyd_dat_do = "JsonDate", robsbyd_stav_bydl = "number", robcstb_stav_bydl_txt = "string", rc_lomitko = "string", stav_bydl_text = "string", ixs_fun = "string", ixs_byd = "string", ixp = "string", cislo = "string", dat_zmeny = "JsonDate", dat_vydani = "JsonDate", ixs_fun_vyd = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GBydlistePotvrzOZmeneROBDtoTypeLengths { ixs_fun = 12, ixs_byd = 12, ixp = 12, cislo = 8, ixs_fun_vyd = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkyAktObcaneDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro občany v aktualizační dávce*/
	interface GDavkyAktObcaneDto extends Gordic.Rob.Interface.GRobdunlDto {
		c_znak_or?: string|null;
		c_znak_orn?: string|null;
		duv_zm_txt?: string|null;
		stav_zprac_txt?: string|null;
		typ_pob_txt?: string|null;
		duvod_odmitnuti_tx?: string|null;
	}
	const enum GDavkyAktObcaneDtoNames { c_znak_or = "c_znak_or", c_znak_orn = "c_znak_orn", duv_zm_txt = "duv_zm_txt", stav_zprac_txt = "stav_zprac_txt", typ_pob_txt = "typ_pob_txt", duvod_odmitnuti_tx = "duvod_odmitnuti_tx", ixs_unl = "ixs_unl", por_cislo = "por_cislo", kod_ob = "kod_ob", pco = "pco", duv_zm = "duv_zm", ixs_oso = "ixs_oso", rod_cis = "rod_cis", jm = "jm", rpr = "rpr", pr = "pr", rod_stav = "rod_stav", stat_prisl = "stat_prisl", stat_prisl_txt = "stat_prisl_txt", txt_ob = "txt_ob", txt_bl = "txt_bl", txt_ul = "txt_ul", cislo_dom = "cislo_dom", cislo_or = "cislo_or", psc = "psc", okres = "okres", typ_pob = "typ_pob", rod_cisn = "rod_cisn", jmn = "jmn", rprn = "rprn", prn = "prn", rod_stavn = "rod_stavn", stat_prisln = "stat_prisln", stat_prisln_txt = "stat_prisln_txt", txt_obn = "txt_obn", txt_bln = "txt_bln", txt_uln = "txt_uln", cislo_domn = "cislo_domn", cislo_orn = "cislo_orn", pscn = "pscn", okresn = "okresn", typ_pobn = "typ_pobn", pohlavin = "pohlavin", matr_sn = "matr_sn", m_nar_umr = "m_nar_umr", ixs_oso_p = "ixs_oso_p", rod_cis_p = "rod_cis_p", jm_p = "jm_p", rpr_p = "rpr_p", pr_p = "pr_p", ixs_oso_m = "ixs_oso_m", rod_cis_m = "rod_cis_m", jm_m = "jm_m", rpr_m = "rpr_m", pr_m = "pr_m", ixs_oso_o = "ixs_oso_o", rod_cis_o = "rod_cis_o", jm_o = "jm_o", rpr_o = "rpr_o", pr_o = "pr_o", rc_deti = "rc_deti", dat_tp_od = "dat_tp_od", typ_omez = "typ_omez", omez_zpus = "omez_zpus", zak_pob = "zak_pob", volna_pol = "volna_pol", rod_stav_od = "rod_stav_od", text_1 = "text_1", text_2 = "text_2", text_3 = "text_3", datum_ucinnosti = "datum_ucinnosti", datum_zavedeno = "datum_zavedeno", auto_zprac = "auto_zprac", nacteno_z_davky = "nacteno_z_davky", stav_zprac = "stav_zprac", duvod_odmitnuti = "duvod_odmitnuti", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_dom_typ = "c_dom_typ", znak_c_or = "znak_c_or", c_dom_typn = "c_dom_typn", znak_c_orn = "znak_c_orn", titul = "titul", blokace = "blokace", dadresa = "dadresa", typ_dor_adr = "typ_dor_adr", stat_prisl_o = "stat_prisl_o", typ_pobytu_txt_unl = "typ_pobytu_txt_unl", Permissions = "Permissions",}
	const enum GDavkyAktObcaneDtoFragments { c_znak_or = "Extended", c_znak_orn = "Extended", duv_zm_txt = "Extended", stav_zprac_txt = "Extended", typ_pob_txt = "Extended", duvod_odmitnuti_tx = "Extended", ixs_unl = "Base", por_cislo = "Base", kod_ob = "Base", pco = "Base", duv_zm = "Base", ixs_oso = "Base", rod_cis = "Base", jm = "Base", rpr = "Base", pr = "Base", rod_stav = "Base", stat_prisl = "Base", stat_prisl_txt = "Base", txt_ob = "Base", txt_bl = "Base", txt_ul = "Base", cislo_dom = "Base", cislo_or = "Base", psc = "Base", okres = "Base", typ_pob = "Base", rod_cisn = "Base", jmn = "Base", rprn = "Base", prn = "Base", rod_stavn = "Base", stat_prisln = "Base", stat_prisln_txt = "Base", txt_obn = "Base", txt_bln = "Base", txt_uln = "Base", cislo_domn = "Base", cislo_orn = "Base", pscn = "Base", okresn = "Base", typ_pobn = "Base", pohlavin = "Base", matr_sn = "Base", m_nar_umr = "Base", ixs_oso_p = "Base", rod_cis_p = "Base", jm_p = "Base", rpr_p = "Base", pr_p = "Base", ixs_oso_m = "Base", rod_cis_m = "Base", jm_m = "Base", rpr_m = "Base", pr_m = "Base", ixs_oso_o = "Base", rod_cis_o = "Base", jm_o = "Base", rpr_o = "Base", pr_o = "Base", rc_deti = "Base", dat_tp_od = "Base", typ_omez = "Base", omez_zpus = "Base", zak_pob = "Base", volna_pol = "Base", rod_stav_od = "Base", text_1 = "Base", text_2 = "Base", text_3 = "Base", datum_ucinnosti = "Base", datum_zavedeno = "Base", auto_zprac = "Base", nacteno_z_davky = "Base", stav_zprac = "Base", duvod_odmitnuti = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", c_dom_typ = "Base", znak_c_or = "Base", c_dom_typn = "Base", znak_c_orn = "Base", titul = "Base", blokace = "Base", dadresa = "Base", typ_dor_adr = "Base", stat_prisl_o = "Base", typ_pobytu_txt_unl = "Base", Permissions = "*",}
	const enum GDavkyAktObcaneDtoTypes { c_znak_or = "string", c_znak_orn = "string", duv_zm_txt = "string", stav_zprac_txt = "string", typ_pob_txt = "string", duvod_odmitnuti_tx = "string", ixs_unl = "string", por_cislo = "number", kod_ob = "number", pco = "number", duv_zm = "number", ixs_oso = "string", rod_cis = "string", jm = "string", rpr = "string", pr = "string", rod_stav = "number", stat_prisl = "string", stat_prisl_txt = "string", txt_ob = "string", txt_bl = "string", txt_ul = "string", cislo_dom = "string", cislo_or = "string", psc = "string", okres = "number", typ_pob = "number", rod_cisn = "string", jmn = "string", rprn = "string", prn = "string", rod_stavn = "number", stat_prisln = "string", stat_prisln_txt = "string", txt_obn = "string", txt_bln = "string", txt_uln = "string", cislo_domn = "string", cislo_orn = "string", pscn = "string", okresn = "number", typ_pobn = "number", pohlavin = "number", matr_sn = "string", m_nar_umr = "string", ixs_oso_p = "string", rod_cis_p = "string", jm_p = "string", rpr_p = "string", pr_p = "string", ixs_oso_m = "string", rod_cis_m = "string", jm_m = "string", rpr_m = "string", pr_m = "string", ixs_oso_o = "string", rod_cis_o = "string", jm_o = "string", rpr_o = "string", pr_o = "string", rc_deti = "string", dat_tp_od = "JsonDate", typ_omez = "number", omez_zpus = "string", zak_pob = "string", volna_pol = "string", rod_stav_od = "JsonDate", text_1 = "string", text_2 = "string", text_3 = "string", datum_ucinnosti = "JsonDate", datum_zavedeno = "JsonDate", auto_zprac = "number", nacteno_z_davky = "number", stav_zprac = "number", duvod_odmitnuti = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_dom_typ = "string", znak_c_or = "string", c_dom_typn = "string", znak_c_orn = "string", titul = "string", blokace = "JsonDecimal", dadresa = "string", typ_dor_adr = "number", stat_prisl_o = "string", typ_pobytu_txt_unl = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDavkyAktObcaneDtoTypeLengths { ixs_unl = 12, ixs_oso = 12, rod_cis = 10, jm = 50, rpr = 50, pr = 50, stat_prisl = 48, stat_prisl_txt = 120, txt_ob = 48, txt_bl = 48, txt_ul = 48, cislo_dom = 6, cislo_or = 6, psc = 5, rod_cisn = 10, jmn = 50, rprn = 50, prn = 50, stat_prisln = 30, stat_prisln_txt = 120, txt_obn = 48, txt_bln = 48, txt_uln = 48, cislo_domn = 6, cislo_orn = 6, pscn = 5, matr_sn = 60, m_nar_umr = 60, ixs_oso_p = 12, rod_cis_p = 10, jm_p = 50, rpr_p = 50, pr_p = 50, ixs_oso_m = 12, rod_cis_m = 10, jm_m = 50, rpr_m = 50, pr_m = 50, ixs_oso_o = 12, rod_cis_o = 10, jm_o = 50, rpr_o = 50, pr_o = 50, rc_deti = 254, omez_zpus = 254, zak_pob = 254, volna_pol = 254, text_1 = 254, text_2 = 254, text_3 = 254, poznamka = 254, zmenu_prov = 12, c_dom_typ = 1, znak_c_or = 1, c_dom_typn = 1, znak_c_orn = 1, titul = 200, dadresa = 200, stat_prisl_o = 5, typ_pobytu_txt_unl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkyAktROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro detail aktualizační dávky*/
	interface GDavkyAktROBDto extends Gordic.Rob.Interface.GRobsunlDto {
	}
	const enum GDavkyAktROBDtoNames { ixs_unl = "ixs_unl", nazev = "nazev", popis = "popis", dat_nac = "dat_nac", dat_od = "dat_od", dat_do = "dat_do", kod_ob = "kod_ob", obec_davka = "obec_davka", poznamka = "poznamka", dat_kontrola = "dat_kontrola", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDavkyAktROBDtoFragments { ixs_unl = "Base", nazev = "Base", popis = "Base", dat_nac = "Base", dat_od = "Base", dat_do = "Base", kod_ob = "Base", obec_davka = "Base", poznamka = "Base", dat_kontrola = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GDavkyAktROBDtoTypes { ixs_unl = "string", nazev = "string", popis = "string", dat_nac = "JsonDate", dat_od = "JsonDate", dat_do = "JsonDate", kod_ob = "number", obec_davka = "string", poznamka = "string", dat_kontrola = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDavkyAktROBDtoTypeLengths { ixs_unl = 12, nazev = 50, popis = 254, obec_davka = 48, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkyAktVysKontrolyROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro výsledek kontroly souborů dávky*/
	interface GDavkyAktVysKontrolyROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Počet souborů narození v dávce*/
		pocetNarozeni?: number|null;
		/**Počet souborů úmrtí v dávce*/
		pocetUmrti?: number|null;
		/**Počet souborů přistěhování v dávce*/
		pocetPristehovani?: number|null;
		/**Počet souborů odstěhování v dávce*/
		pocetOdstehovani?: number|null;
		/**Poznámka k výsledku kontroly*/
		poznamka?: string|null;
	}
	const enum GDavkyAktVysKontrolyROBDtoNames { pocetNarozeni = "pocetNarozeni", pocetUmrti = "pocetUmrti", pocetPristehovani = "pocetPristehovani", pocetOdstehovani = "pocetOdstehovani", poznamka = "poznamka", Permissions = "Permissions",}
	const enum GDavkyAktVysKontrolyROBDtoFragments { pocetNarozeni = "*", pocetUmrti = "*", pocetPristehovani = "*", pocetOdstehovani = "*", poznamka = "*", Permissions = "*",}
	const enum GDavkyAktVysKontrolyROBDtoTypes { pocetNarozeni = "number", pocetUmrti = "number", pocetPristehovani = "number", pocetOdstehovani = "number", poznamka = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDavkyAktVysKontrolyROBDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkyMCDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dávka*/
	interface GDavkyMCDto extends Gordic.Rob.Interface.GRobdsidDto {
	}
	const enum GDavkyMCDtoNames { ixs_sid = "ixs_sid", por_cislo = "por_cislo", pco = "pco", rod_cis = "rod_cis", jm = "jm", rpr = "rpr", pr = "pr", rod_stav = "rod_stav", stat_prisl = "stat_prisl", txt_ob = "txt_ob", txt_bl = "txt_bl", txt_ul = "txt_ul", cislo_dom = "cislo_dom", cislo_or = "cislo_or", psc = "psc", typ_pob = "typ_pob", matr_sn = "matr_sn", m_nar_umr = "m_nar_umr", rod_cis_p = "rod_cis_p", jm_p = "jm_p", rpr_p = "rpr_p", pr_p = "pr_p", rod_cis_m = "rod_cis_m", jm_m = "jm_m", rpr_m = "rpr_m", pr_m = "pr_m", rod_cis_o = "rod_cis_o", jm_o = "jm_o", rpr_o = "rpr_o", pr_o = "pr_o", rc_deti = "rc_deti", dat_tp_od = "dat_tp_od", typ_omez = "typ_omez", omez_zpus = "omez_zpus", zak_pob = "zak_pob", popis = "popis", dat_r_stav_od = "dat_r_stav_od", zpracovano = "zpracovano", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_oso = "ixs_oso", stav_rob = "stav_rob", c_dom_typ = "c_dom_typ", znak_c_or = "znak_c_or", okres = "okres", pohl = "pohl", titul = "titul", blokace = "blokace", dadresa = "dadresa", typ_dor_adr = "typ_dor_adr", stat_prisl_o = "stat_prisl_o", Permissions = "Permissions",}
	const enum GDavkyMCDtoFragments { ixs_sid = "Base", por_cislo = "Base", pco = "Base", rod_cis = "Base", jm = "Base", rpr = "Base", pr = "Base", rod_stav = "Base", stat_prisl = "Base", txt_ob = "Base", txt_bl = "Base", txt_ul = "Base", cislo_dom = "Base", cislo_or = "Base", psc = "Base", typ_pob = "Base", matr_sn = "Base", m_nar_umr = "Base", rod_cis_p = "Base", jm_p = "Base", rpr_p = "Base", pr_p = "Base", rod_cis_m = "Base", jm_m = "Base", rpr_m = "Base", pr_m = "Base", rod_cis_o = "Base", jm_o = "Base", rpr_o = "Base", pr_o = "Base", rc_deti = "Base", dat_tp_od = "Base", typ_omez = "Base", omez_zpus = "Base", zak_pob = "Base", popis = "Base", dat_r_stav_od = "Base", zpracovano = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_oso = "Base", stav_rob = "Base", c_dom_typ = "Base", znak_c_or = "Base", okres = "Base", pohl = "Base", titul = "Base", blokace = "Base", dadresa = "Base", typ_dor_adr = "Base", stat_prisl_o = "Base", Permissions = "*",}
	const enum GDavkyMCDtoTypes { ixs_sid = "string", por_cislo = "number", pco = "number", rod_cis = "string", jm = "string", rpr = "string", pr = "string", rod_stav = "number", stat_prisl = "string", txt_ob = "string", txt_bl = "string", txt_ul = "string", cislo_dom = "string", cislo_or = "string", psc = "number", typ_pob = "number", matr_sn = "string", m_nar_umr = "string", rod_cis_p = "string", jm_p = "string", rpr_p = "string", pr_p = "string", rod_cis_m = "string", jm_m = "string", rpr_m = "string", pr_m = "string", rod_cis_o = "string", jm_o = "string", rpr_o = "string", pr_o = "string", rc_deti = "string", dat_tp_od = "JsonDate", typ_omez = "number", omez_zpus = "string", zak_pob = "string", popis = "string", dat_r_stav_od = "JsonDate", zpracovano = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_oso = "string", stav_rob = "number", c_dom_typ = "string", znak_c_or = "string", okres = "string", pohl = "string", titul = "string", blokace = "JsonDecimal", dadresa = "string", typ_dor_adr = "number", stat_prisl_o = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDavkyMCDtoTypeLengths { ixs_sid = 12, rod_cis = 10, jm = 100, rpr = 100, pr = 100, stat_prisl = 48, txt_ob = 48, txt_bl = 48, txt_ul = 48, cislo_dom = 6, cislo_or = 6, matr_sn = 60, m_nar_umr = 60, rod_cis_p = 10, jm_p = 100, rpr_p = 100, pr_p = 100, rod_cis_m = 10, jm_m = 100, rpr_m = 100, pr_m = 100, rod_cis_o = 10, jm_o = 100, rpr_o = 100, pr_o = 100, rc_deti = 254, omez_zpus = 254, zak_pob = 254, popis = 254, poznamka = 254, zmenu_prov = 12, ixs_oso = 12, c_dom_typ = 1, znak_c_or = 1, okres = 200, pohl = 1, titul = 200, dadresa = 200, stat_prisl_o = 1024,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkySouborRobDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro soubory dávek*/
	interface GDavkySouborRobDto {
		/**Data souboru*/
		fileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Identifikáor dávky*/
		ixs?: string|null;
	}
	const enum GDavkySouborRobDtoNames { fileInfo = "fileInfo", ixs = "ixs",}
	const enum GDavkySouborRobDtoFragments { fileInfo = "*", ixs = "*",}
	const enum GDavkySouborRobDtoTypes { fileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto", ixs = "string",}
	const enum GDavkySouborRobDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkySouboryRobDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro soubory dávek*/
	interface GDavkySouboryRobDto {
		/**Data souboru*/
		fileInfo?: Gordic.General.ApplicationInterface.GFileInfoDto[]|null;
		/**Identifikáor dávky*/
		ixs?: string|null;
		/**jestli se má vypočítar rč z data narození*/
		vypocitatRc?: boolean|null;
	}
	const enum GDavkySouboryRobDtoNames { fileInfo = "fileInfo", ixs = "ixs", vypocitatRc = "vypocitatRc",}
	const enum GDavkySouboryRobDtoFragments { fileInfo = "*", ixs = "*", vypocitatRc = "*",}
	const enum GDavkySouboryRobDtoTypes { fileInfo = "Gordic.General.ApplicationInterface.GFileInfoDto[]", ixs = "string", vypocitatRc = "boolean",}
	const enum GDavkySouboryRobDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkyZakDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro detail inicializační dávky*/
	interface GDavkyZakDto extends Gordic.Rob.Interface.GRobsdavDto {
	}
	const enum GDavkyZakDtoNames { ixs_dav = "ixs_dav", nazev = "nazev", popis = "popis", dat_nac = "dat_nac", dat_od = "dat_od", dat_do = "dat_do", obec_davka = "obec_davka", poznamka = "poznamka", dat_kontrola = "dat_kontrola", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDavkyZakDtoFragments { ixs_dav = "Base", nazev = "Base", popis = "Base", dat_nac = "Base", dat_od = "Base", dat_do = "Base", obec_davka = "Base", poznamka = "Base", dat_kontrola = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GDavkyZakDtoTypes { ixs_dav = "string", nazev = "string", popis = "string", dat_nac = "JsonDate", dat_od = "JsonDate", dat_do = "JsonDate", obec_davka = "string", poznamka = "string", dat_kontrola = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDavkyZakDtoTypeLengths { ixs_dav = 12, nazev = 100, popis = 254, obec_davka = 100, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDavkyZakObcaneDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro detail občana v zakádací dávce*/
	interface GDavkyZakObcaneDto extends Gordic.Rob.Interface.GRobddavDto {
		/**Stav v rob*/
		stav_rob_txt?: string|null;
		/**Doplněk čísla domovního zobrazení*/
		dcd_zobraz?: string|null;
	}
	const enum GDavkyZakObcaneDtoNames { stav_rob_txt = "stav_rob_txt", dcd_zobraz = "dcd_zobraz", ixs_dav = "ixs_dav", por_cislo = "por_cislo", jmeno = "jmeno", prijmeni = "prijmeni", rod_prij = "rod_prij", rod_cis = "rod_cis", ixs_oso = "ixs_oso", obec = "obec", cobce = "cobce", ulice = "ulice", dcd = "dcd", cislo_dom = "cislo_dom", cislo_or = "cislo_or", psc = "psc", dat_naroz = "dat_naroz", misto_naroz = "misto_naroz", m_nar_stat = "m_nar_stat", dat_umrti = "dat_umrti", misto_umrti = "misto_umrti", m_umr_stat = "m_umr_stat", obcanstvi = "obcanstvi", dor_cr_obec = "dor_cr_obec", dor_cr_cobce = "dor_cr_cobce", dor_cr_ulice = "dor_cr_ulice", dor_cr_dcd = "dor_cr_dcd", dor_cr_c_dom = "dor_cr_c_dom", dor_cr_c_or = "dor_cr_c_or", dor_cr_psc = "dor_cr_psc", dor_ostatni = "dor_ostatni", dor_adr_typ = "dor_adr_typ", datum_od = "datum_od", datum_do = "datum_do", typ_ds = "typ_ds", ds_id = "ds_id", stav_jmeno = "stav_jmeno", stav_prij = "stav_prij", stav_adresa = "stav_adresa", stav_dat_nar = "stav_dat_nar", stav_m_nar = "stav_m_nar", stav_dat_umr = "stav_dat_umr", stav_m_umr = "stav_m_umr", stav_obcanstvi = "stav_obcanstvi", stav_d_adresa = "stav_d_adresa", stav_dat_sch = "stav_dat_sch", zpracovano = "zpracovano", stav_rob = "stav_rob", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_pobytu_txt_unl = "typ_pobytu_txt_unl", Permissions = "Permissions",}
	const enum GDavkyZakObcaneDtoFragments { stav_rob_txt = "Extended", dcd_zobraz = "Extended", ixs_dav = "Base", por_cislo = "Base", jmeno = "Base", prijmeni = "Base", rod_prij = "Base", rod_cis = "Base", ixs_oso = "Base", obec = "Base", cobce = "Base", ulice = "Base", dcd = "Base", cislo_dom = "Base", cislo_or = "Base", psc = "Base", dat_naroz = "Base", misto_naroz = "Base", m_nar_stat = "Base", dat_umrti = "Base", misto_umrti = "Base", m_umr_stat = "Base", obcanstvi = "Base", dor_cr_obec = "Base", dor_cr_cobce = "Base", dor_cr_ulice = "Base", dor_cr_dcd = "Base", dor_cr_c_dom = "Base", dor_cr_c_or = "Base", dor_cr_psc = "Base", dor_ostatni = "Base", dor_adr_typ = "Base", datum_od = "Base", datum_do = "Base", typ_ds = "Base", ds_id = "Base", stav_jmeno = "Base", stav_prij = "Base", stav_adresa = "Base", stav_dat_nar = "Base", stav_m_nar = "Base", stav_dat_umr = "Base", stav_m_umr = "Base", stav_obcanstvi = "Base", stav_d_adresa = "Base", stav_dat_sch = "Base", zpracovano = "Base", stav_rob = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", typ_pobytu_txt_unl = "Base", Permissions = "*",}
	const enum GDavkyZakObcaneDtoTypes { stav_rob_txt = "string", dcd_zobraz = "string", ixs_dav = "string", por_cislo = "number", jmeno = "string", prijmeni = "string", rod_prij = "string", rod_cis = "string", ixs_oso = "string", obec = "string", cobce = "string", ulice = "string", dcd = "string", cislo_dom = "string", cislo_or = "string", psc = "string", dat_naroz = "JsonDate", misto_naroz = "string", m_nar_stat = "string", dat_umrti = "JsonDate", misto_umrti = "string", m_umr_stat = "string", obcanstvi = "string", dor_cr_obec = "string", dor_cr_cobce = "string", dor_cr_ulice = "string", dor_cr_dcd = "string", dor_cr_c_dom = "string", dor_cr_c_or = "string", dor_cr_psc = "string", dor_ostatni = "string", dor_adr_typ = "string", datum_od = "JsonDate", datum_do = "JsonDate", typ_ds = "string", ds_id = "string", stav_jmeno = "number", stav_prij = "number", stav_adresa = "number", stav_dat_nar = "number", stav_m_nar = "number", stav_dat_umr = "number", stav_m_umr = "number", stav_obcanstvi = "number", stav_d_adresa = "number", stav_dat_sch = "number", zpracovano = "number", stav_rob = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_pobytu_txt_unl = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDavkyZakObcaneDtoTypeLengths { ixs_dav = 12, jmeno = 100, prijmeni = 100, rod_prij = 100, rod_cis = 10, ixs_oso = 12, obec = 48, cobce = 48, ulice = 48, dcd = 1, cislo_dom = 6, cislo_or = 6, psc = 6, misto_naroz = 100, m_nar_stat = 50, misto_umrti = 100, m_umr_stat = 50, obcanstvi = 50, dor_cr_obec = 48, dor_cr_cobce = 48, dor_cr_ulice = 48, dor_cr_dcd = 1, dor_cr_c_dom = 6, dor_cr_c_or = 6, dor_cr_psc = 6, dor_ostatni = 254, dor_adr_typ = 3, typ_ds = 3, ds_id = 100, poznamka = 254, zmenu_prov = 12, typ_pobytu_txt_unl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDokladyZmenaPobytuROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Doklady předložené při změně pobytu*/
	interface GDokladyZmenaPobytuROBDto extends Gordic.Rob.Interface.GRobddopDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**ixs_tdo*/
		nazev?: string|null;
	}
	const enum GDokladyZmenaPobytuROBDtoNames { Zmena = "Zmena", nazev = "nazev", ixs_byd = "ixs_byd", por_cislo = "por_cislo", ixs_tdo = "ixs_tdo", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDokladyZmenaPobytuROBDtoFragments { Zmena = "ZMENA", nazev = "Extended", ixs_byd = "Base", por_cislo = "Base", ixs_tdo = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GDokladyZmenaPobytuROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", nazev = "string", ixs_byd = "string", por_cislo = "number", ixs_tdo = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDokladyZmenaPobytuROBDtoTypeLengths { nazev = 12, ixs_byd = 12, ixs_tdo = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDorucovaciAdrROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Doručovací adresa*/
	interface GDorucovaciAdrROBDto extends Gordic.Rob.Interface.GRobsdadDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Jméno*/
		robsoso_jmeno?: string|null;
		/**Příjmení*/
		robsoso_prijmeni?: string|null;
		/**Rodné číslo*/
		robsoso_rc?: string|null;
		/**Rodné číslo s lomítkem*/
		robsoso_rc_lomitko?: string|null;
		/**Obec*/
		robsido_obec?: string|null;
		/**Část obce*/
		robsido_castobce?: string|null;
		/**Ulice*/
		robsido_ulice?: string|null;
		/**Domovní číslo*/
		robsido_cd?: number|null;
		/**Číslo orientační*/
		robsido_cor?: number|null;
		/**Písmeno čísla orientačního*/
		robsido_pcor?: string|null;
		/**Okres*/
		robsido_okres?: string|null;
		/**Městská část*/
		robsido_mcast?: string|null;
		/**Pražský obvod*/
		robsido_pobvod?: string|null;
		/**Doplněk čísla domovního*/
		robsido_dcd?: string|null;
		/**Psč*/
		robsido_psc?: string|null;
		/**Stát*/
		robsido_stat?: number|null;
		/**Id*/
		robsido_id?: string|null;
	}
	const enum GDorucovaciAdrROBDtoNames { Zmena = "Zmena", robsoso_jmeno = "robsoso_jmeno", robsoso_prijmeni = "robsoso_prijmeni", robsoso_rc = "robsoso_rc", robsoso_rc_lomitko = "robsoso_rc_lomitko", robsido_obec = "robsido_obec", robsido_castobce = "robsido_castobce", robsido_ulice = "robsido_ulice", robsido_cd = "robsido_cd", robsido_cor = "robsido_cor", robsido_pcor = "robsido_pcor", robsido_okres = "robsido_okres", robsido_mcast = "robsido_mcast", robsido_pobvod = "robsido_pobvod", robsido_dcd = "robsido_dcd", robsido_psc = "robsido_psc", robsido_stat = "robsido_stat", robsido_id = "robsido_id", ixs_dad = "ixs_dad", ixs_oso = "ixs_oso", ixs_adr = "ixs_adr", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dor_adr = "typ_dor_adr", tel = "tel", fax = "fax", email = "email", pobox = "pobox", volny_text = "volny_text", Permissions = "Permissions",}
	const enum GDorucovaciAdrROBDtoFragments { Zmena = "ZMENA", robsoso_jmeno = "Extended2", robsoso_prijmeni = "Extended2", robsoso_rc = "Extended2", robsoso_rc_lomitko = "Extended2", robsido_obec = "Extended", robsido_castobce = "Extended", robsido_ulice = "Extended", robsido_cd = "Extended", robsido_cor = "Extended", robsido_pcor = "Extended", robsido_okres = "Extended", robsido_mcast = "Extended", robsido_pobvod = "Extended", robsido_dcd = "Extended", robsido_psc = "Extended", robsido_stat = "Extended", robsido_id = "Extended", ixs_dad = "Base", ixs_oso = "Base", ixs_adr = "Base", dat_od = "Base", dat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", typ_dor_adr = "Base", tel = "Base", fax = "Base", email = "Base", pobox = "Base", volny_text = "Base", Permissions = "*",}
	const enum GDorucovaciAdrROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", robsoso_jmeno = "string", robsoso_prijmeni = "string", robsoso_rc = "string", robsoso_rc_lomitko = "string", robsido_obec = "string", robsido_castobce = "string", robsido_ulice = "string", robsido_cd = "number", robsido_cor = "number", robsido_pcor = "string", robsido_okres = "string", robsido_mcast = "string", robsido_pobvod = "string", robsido_dcd = "string", robsido_psc = "string", robsido_stat = "number", robsido_id = "string", ixs_dad = "string", ixs_oso = "string", ixs_adr = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dor_adr = "number", tel = "string", fax = "string", email = "string", pobox = "string", volny_text = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDorucovaciAdrROBDtoTypeLengths { ixs_dad = 12, ixs_oso = 12, ixs_adr = 12, poznamka = 50, zmenu_prov = 12, tel = 50, fax = 50, email = 254, pobox = 50, volny_text = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDruhaStranaKartyROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Druhá strana karty*/
	interface GDruhaStranaKartyROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Identifikátor bydliště*/
		ixs_byd?: string|null;
	}
	const enum GDruhaStranaKartyROBDtoNames { ixs_oso = "ixs_oso", ixs_byd = "ixs_byd", Permissions = "Permissions",}
	const enum GDruhaStranaKartyROBDtoFragments { ixs_oso = "Base", ixs_byd = "Base", Permissions = "*",}
	const enum GDruhaStranaKartyROBDtoTypes { ixs_oso = "string", ixs_byd = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDruhaStranaKartyROBDtoTypeLengths { ixs_oso = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDruhyNezarazeniDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Druhy nezařazení do voleb*/
	interface GDruhyNezarazeniDto extends Gordic.Rob.Interface.GRobsvdnDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GDruhyNezarazeniDtoNames { Zmena = "Zmena", druh_nez = "druh_nez", zkratka = "zkratka", popis = "popis", s_vyradit = "s_vyradit", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_vyradit_seznam = "s_vyradit_seznam", s_zaradit_zvl = "s_zaradit_zvl", s_tisk_poznamky = "s_tisk_poznamky", format_poznamky = "format_poznamky", rozdelena_poznamka = "rozdelena_poznamka", Permissions = "Permissions",}
	const enum GDruhyNezarazeniDtoFragments { Zmena = "ZMENA", druh_nez = "Base", zkratka = "Base", popis = "Base", s_vyradit = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_vyradit_seznam = "Base", s_zaradit_zvl = "Base", s_tisk_poznamky = "Base", format_poznamky = "Base", rozdelena_poznamka = "Base", Permissions = "*",}
	const enum GDruhyNezarazeniDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", druh_nez = "number", zkratka = "string", popis = "string", s_vyradit = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_vyradit_seznam = "number", s_zaradit_zvl = "number", s_tisk_poznamky = "number", format_poznamky = "string", rozdelena_poznamka = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDruhyNezarazeniDtoTypeLengths { zkratka = 10, popis = 50, poznamka = 50, zmenu_prov = 12, format_poznamky = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GDuvodyPristupuROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Důvody přístupů*/
	interface GDuvodyPristupuROBDto extends Gordic.Rob.Interface.GRobsduvDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Aktivita textově*/
		aktivita_txt?: string|null;
	}
	const enum GDuvodyPristupuROBDtoNames { Zmena = "Zmena", aktivita_txt = "aktivita_txt", ixs_duv = "ixs_duv", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GDuvodyPristupuROBDtoFragments { Zmena = "ZMENA", aktivita_txt = "Extended", ixs_duv = "Base", nazev = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GDuvodyPristupuROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", aktivita_txt = "string", ixs_duv = "string", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GDuvodyPristupuROBDtoTypeLengths { ixs_duv = 12, nazev = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GGDPRParamsROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	interface GGDPRParamsROBDto {
		/**LogovatGDPR*/
		logovatGDPR?: boolean|null;
		/**Důvod/účel logování*/
		duvodUcel?: string|null;
		/**Seznam údajů*/
		seznamUdaju?: string|null;
	}
	const enum GGDPRParamsROBDtoNames { logovatGDPR = "logovatGDPR", duvodUcel = "duvodUcel", seznamUdaju = "seznamUdaju",}
	const enum GGDPRParamsROBDtoFragments { logovatGDPR = "Base", duvodUcel = "Base", seznamUdaju = "Base",}
	const enum GGDPRParamsROBDtoTypes { logovatGDPR = "boolean", duvodUcel = "string", seznamUdaju = "string",}
	const enum GGDPRParamsROBDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GListPrihlaseniKeZmenamISZRROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro osoby přihlášené ke změnám ISZR*/
	interface GListPrihlaseniKeZmenamISZRROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Vazební identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**AIS*/
		ais?: number|null;
		/**Agenda*/
		agenda?: string|null;
		/**Stav osoby textově*/
		stav_oso_txt?: string|null;
		/**Příznak že se jedná o změny AISV*/
		aisv_zmena?: number|null;
	}
	const enum GListPrihlaseniKeZmenamISZRROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", ais = "ais", agenda = "agenda", stav_oso_txt = "stav_oso_txt", aisv_zmena = "aisv_zmena", Permissions = "Permissions",}
	const enum GListPrihlaseniKeZmenamISZRROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", ais = "Base", agenda = "Base", stav_oso_txt = "Base", aisv_zmena = "Base", Permissions = "*",}
	const enum GListPrihlaseniKeZmenamISZRROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", ais = "number", agenda = "string", stav_oso_txt = "string", aisv_zmena = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListPrihlaseniKeZmenamISZRROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, agenda = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GLogyROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Logy rob*/
	interface GLogyROBDto extends Gordic.Rob.Interface.GRoblakcDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Typ akce textově*/
		typ_akce_txt?: string|null;
		/**Typ dat textově*/
		typ_data_txt?: string|null;
		/**Rodné číslo*/
		robsoso_rc?: string|null;
		/**Příjmení*/
		robsoso_prijmeni?: string|null;
		/**Jméno*/
		robsoso_jmeno?: string|null;
		/**Titul před jménem*/
		robsoso_tit_pred?: string|null;
		/**Titul za jménem*/
		robsoso_tit_za?: string|null;
		/**Typ pobytu*/
		robsoso_typ_pobytu?: number|null;
		/**Stav osoby*/
		robsoso_stav_oso?: number|null;
		/**Název*/
		robsduv_nazev?: string|null;
	}
	const enum GLogyROBDtoNames { Zmena = "Zmena", typ_akce_txt = "typ_akce_txt", typ_data_txt = "typ_data_txt", robsoso_rc = "robsoso_rc", robsoso_prijmeni = "robsoso_prijmeni", robsoso_jmeno = "robsoso_jmeno", robsoso_tit_pred = "robsoso_tit_pred", robsoso_tit_za = "robsoso_tit_za", robsoso_typ_pobytu = "robsoso_typ_pobytu", robsoso_stav_oso = "robsoso_stav_oso", robsduv_nazev = "robsduv_nazev", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", typ_akce = "typ_akce", typ_data = "typ_data", ixs_oso = "ixs_oso", kod_o = "kod_o", pco = "pco", test_akce = "test_akce", duvod = "duvod", pocet = "pocet", ixs_duv = "ixs_duv", log_por_cislo = "log_por_cislo", faze = "faze", Permissions = "Permissions",}
	const enum GLogyROBDtoFragments { Zmena = "ZMENA", typ_akce_txt = "Extended", typ_data_txt = "Extended", robsoso_rc = "Extended", robsoso_prijmeni = "Extended", robsoso_jmeno = "Extended", robsoso_tit_pred = "Extended", robsoso_tit_za = "Extended", robsoso_typ_pobytu = "Extended", robsoso_stav_oso = "Extended", robsduv_nazev = "Extended", zmenu_prov = "Base", dat_zmena = "Base", typ_akce = "Base", typ_data = "Base", ixs_oso = "Base", kod_o = "Base", pco = "Base", test_akce = "Base", duvod = "Base", pocet = "Base", ixs_duv = "Base", log_por_cislo = "Base", faze = "Base", Permissions = "*",}
	const enum GLogyROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", typ_akce_txt = "string", typ_data_txt = "string", robsoso_rc = "string", robsoso_prijmeni = "string", robsoso_jmeno = "string", robsoso_tit_pred = "string", robsoso_tit_za = "string", robsoso_typ_pobytu = "number", robsoso_stav_oso = "number", robsduv_nazev = "string", zmenu_prov = "string", dat_zmena = "JsonDate", typ_akce = "number", typ_data = "number", ixs_oso = "string", kod_o = "number", pco = "number", test_akce = "string", duvod = "string", pocet = "number", ixs_duv = "string", log_por_cislo = "number", faze = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GLogyROBDtoTypeLengths { robsoso_rc = 10, robsoso_prijmeni = 100, robsoso_jmeno = 100, robsoso_tit_pred = 35, robsoso_tit_za = 35, robsduv_nazev = 254, zmenu_prov = 12, ixs_oso = 12, test_akce = 254, duvod = 254, ixs_duv = 12, faze = 8,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GObjektAdresaROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Adresa objektu*/
	interface GObjektAdresaROBDto extends Gordic.Rob.Interface.GRobsadrDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GObjektAdresaROBDtoNames { Zmena = "Zmena", ixs_adr = "ixs_adr", ixs_ido = "ixs_ido", blok_domu = "blok_domu", vchod = "vchod", byt = "byt", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_uir = "id_uir", Permissions = "Permissions",}
	const enum GObjektAdresaROBDtoFragments { Zmena = "ZMENA", ixs_adr = "Base", ixs_ido = "Base", blok_domu = "Base", vchod = "Base", byt = "Base", dat_od = "Base", dat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", id_uir = "Base", Permissions = "*",}
	const enum GObjektAdresaROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_adr = "string", ixs_ido = "string", blok_domu = "string", vchod = "string", byt = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_uir = "JsonDecimal", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GObjektAdresaROBDtoTypeLengths { ixs_adr = 12, ixs_ido = 12, blok_domu = 8, vchod = 5, byt = 5, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GObjektHistROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Historie změn objektů*/
	interface GObjektHistROBDto extends Gordic.Rob.Interface.GRobhidoDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**zmena_adr_det_txt*/
		zmena_adr_det_txt?: string|null;
		/**dcd_zobraz*/
		dcd_zobraz?: string|null;
	}
	const enum GObjektHistROBDtoNames { Zmena = "Zmena", zmena_adr_det_txt = "zmena_adr_det_txt", dcd_zobraz = "dcd_zobraz", ixs_ido = "ixs_ido", por_cislo = "por_cislo", ixs_obj = "ixs_obj", id = "id", obec = "obec", castobce = "castobce", ulice = "ulice", cor = "cor", pcor = "pcor", dcd = "dcd", cd = "cd", psc = "psc", stat = "stat", obvod = "obvod", cs_obec = "cs_obec", cs_cast_obce = "cs_cast_obce", cs_ulice = "cs_ulice", okres = "okres", x_jtsk = "x_jtsk", y_jtsk = "y_jtsk", x_s42 = "x_s42", y_s42 = "y_s42", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmena_adr = "zmena_adr", zmena_adr_det = "zmena_adr_det", zmena_txt = "zmena_txt", ixp = "ixp", Permissions = "Permissions",}
	const enum GObjektHistROBDtoFragments { Zmena = "ZMENA", zmena_adr_det_txt = "Extended", dcd_zobraz = "Extended", ixs_ido = "Base", por_cislo = "Base", ixs_obj = "Base", id = "Base", obec = "Base", castobce = "Base", ulice = "Base", cor = "Base", pcor = "Base", dcd = "Base", cd = "Base", psc = "Base", stat = "Base", obvod = "Base", cs_obec = "Base", cs_cast_obce = "Base", cs_ulice = "Base", okres = "Base", x_jtsk = "Base", y_jtsk = "Base", x_s42 = "Base", y_s42 = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", zmena_adr = "Base", zmena_adr_det = "Base", zmena_txt = "Base", ixp = "Base", Permissions = "*",}
	const enum GObjektHistROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", zmena_adr_det_txt = "string", dcd_zobraz = "string", ixs_ido = "string", por_cislo = "number", ixs_obj = "string", id = "string", obec = "string", castobce = "string", ulice = "string", cor = "number", pcor = "string", dcd = "string", cd = "number", psc = "string", stat = "number", obvod = "number", cs_obec = "string", cs_cast_obce = "string", cs_ulice = "string", okres = "string", x_jtsk = "JsonDecimal", y_jtsk = "JsonDecimal", x_s42 = "JsonDecimal", y_s42 = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmena_adr = "number", zmena_adr_det = "number", zmena_txt = "string", ixp = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GObjektHistROBDtoTypeLengths { zmena_adr_det_txt = 254, dcd_zobraz = 254, ixs_ido = 12, ixs_obj = 12, id = 12, obec = 48, castobce = 48, ulice = 48, pcor = 1, dcd = 1, psc = 5, cs_obec = 48, cs_cast_obce = 48, cs_ulice = 48, okres = 48, poznamka = 50, zmenu_prov = 12, zmena_txt = 100, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GObjektROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Objekt (robsido)*/
	interface GObjektROBDto extends Gordic.Rob.Interface.GRobsidoDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Dcd pro načtení hodnoty z robcdcd jako číslo*/
		dcd_cislo?: number|null;
		dcd_zobraz?: string|null;
		uir_zobraz?: string|null;
		ruian_zobraz?: string|null;
	}
	const enum GObjektROBDtoNames { Zmena = "Zmena", dcd_cislo = "dcd_cislo", dcd_zobraz = "dcd_zobraz", uir_zobraz = "uir_zobraz", ruian_zobraz = "ruian_zobraz", ixs_ido = "ixs_ido", ixs_obj = "ixs_obj", id = "id", obec = "obec", pobvod = "pobvod", mcast = "mcast", castobce = "castobce", ulice = "ulice", cor = "cor", pcor = "pcor", dcd = "dcd", cd = "cd", psc = "psc", stat = "stat", obvod = "obvod", cs_obec = "cs_obec", cs_cast_obce = "cs_cast_obce", cs_ulice = "cs_ulice", okres = "okres", x_jtsk = "x_jtsk", y_jtsk = "y_jtsk", x_s42 = "x_s42", y_s42 = "y_s42", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", id_uir = "id_uir", ref_udaje = "ref_udaje", adresni_misto_kod = "adresni_misto_kod", dat_akt_iszr = "dat_akt_iszr", skolsky_obvod = "skolsky_obvod", skolsky_obvod_ms = "skolsky_obvod_ms", ico = "ico", okrsek_roznaska = "okrsek_roznaska", Permissions = "Permissions",}
	const enum GObjektROBDtoFragments { Zmena = "ZMENA", dcd_cislo = "Extended", dcd_zobraz = "Extended", uir_zobraz = "Extended", ruian_zobraz = "Extended", ixs_ido = "Base", ixs_obj = "Base", id = "Base", obec = "Base", pobvod = "Base", mcast = "Base", castobce = "Base", ulice = "Base", cor = "Base", pcor = "Base", dcd = "Base", cd = "Base", psc = "Base", stat = "Base", obvod = "Base", cs_obec = "Base", cs_cast_obce = "Base", cs_ulice = "Base", okres = "Base", x_jtsk = "Base", y_jtsk = "Base", x_s42 = "Base", y_s42 = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", id_uir = "Base", ref_udaje = "Base", adresni_misto_kod = "Base", dat_akt_iszr = "Base", skolsky_obvod = "Base", skolsky_obvod_ms = "Base", ico = "Base", okrsek_roznaska = "Base", Permissions = "*",}
	const enum GObjektROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", dcd_cislo = "number", dcd_zobraz = "string", uir_zobraz = "string", ruian_zobraz = "string", ixs_ido = "string", ixs_obj = "string", id = "string", obec = "string", pobvod = "string", mcast = "string", castobce = "string", ulice = "string", cor = "number", pcor = "string", dcd = "string", cd = "number", psc = "string", stat = "number", obvod = "number", cs_obec = "string", cs_cast_obce = "string", cs_ulice = "string", okres = "string", x_jtsk = "JsonDecimal", y_jtsk = "JsonDecimal", x_s42 = "JsonDecimal", y_s42 = "JsonDecimal", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", id_uir = "JsonDecimal", ref_udaje = "number", adresni_misto_kod = "number", dat_akt_iszr = "JsonDate", skolsky_obvod = "number", skolsky_obvod_ms = "number", ico = "string", okrsek_roznaska = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GObjektROBDtoTypeLengths { ixs_ido = 12, ixs_obj = 12, id = 12, obec = 48, pobvod = 48, mcast = 48, castobce = 48, ulice = 48, pcor = 1, dcd = 1, psc = 12, cs_obec = 48, cs_cast_obce = 48, cs_ulice = 48, okres = 48, poznamka = 50, zmenu_prov = 12, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOkresROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Okres*/
	interface GOkresROBDto extends Gordic.Rob.Interface.GRobsoknDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GOkresROBDtoNames { Zmena = "Zmena", okres_nuts = "okres_nuts", okres = "okres", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOkresROBDtoFragments { Zmena = "ZMENA", okres_nuts = "Base", okres = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOkresROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", okres_nuts = "string", okres = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOkresROBDtoTypeLengths { okres_nuts = 6, okres = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOpravnenaOsobaROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdopr
	*      Oprávněná osoba, vlastník (druhá strana přihlašovacího lístku k pobytu)
	*/
	interface GOpravnenaOsobaROBDto extends Gordic.Rob.Interface.GRobdoprDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Externí subjekt textově*/
		esu_txt?: string|null;
	}
	const enum GOpravnenaOsobaROBDtoNames { Zmena = "Zmena", esu_txt = "esu_txt", ixs_byd = "ixs_byd", por_cislo = "por_cislo", ixs_esu = "ixs_esu", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOpravnenaOsobaROBDtoFragments { Zmena = "ZMENA", esu_txt = "Extended", ixs_byd = "Base", por_cislo = "Base", ixs_esu = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOpravnenaOsobaROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", esu_txt = "string", ixs_byd = "string", por_cislo = "number", ixs_esu = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOpravnenaOsobaROBDtoTypeLengths { ixs_byd = 12, ixs_esu = 12, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsoba1ROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Osoba*/
	interface GOsoba1ROBDto extends Gordic.Rob.Interface.GRobsosoDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Stát narození textově*/
		stat_naroz_txt?: string|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Stav osoby textově*/
		stav_oso_txt?: string|null;
		/**Rodinný stav textově*/
		rod_stav_txt?: string|null;
		/**Stát textově*/
		stat_obc_txt?: string|null;
		/**kval_st_obc_txt*/
		kval_st_obc_txt?: string|null;
		/**Kategorie obyvatele textově*/
		ktg_obyv_txt?: string|null;
		/**Ekonomická aktivita textově*/
		ekon_aktivita_txt?: string|null;
		/**Vzdělání textově*/
		vzdelani_txt?: string|null;
		/**z_z_txt*/
		z_z_txt?: string|null;
		/**Zaměstnání textově*/
		zamestnani_txt?: string|null;
		/**agenda*/
		logovat_gdpr?: boolean|null;
		/**Důvod účel logování GDPR*/
		duvod_ucel?: string|null;
		/**Seznam údajů*/
		seznam_udaju?: string|null;
		/**Typ vztahu*/
		typ_vztahu?: number|null;
	}
	const enum GOsoba1ROBDtoNames { Zmena = "Zmena", stat_naroz_txt = "stat_naroz_txt", typ_pobytu_txt = "typ_pobytu_txt", stav_oso_txt = "stav_oso_txt", rod_stav_txt = "rod_stav_txt", stat_obc_txt = "stat_obc_txt", kval_st_obc_txt = "kval_st_obc_txt", ktg_obyv_txt = "ktg_obyv_txt", ekon_aktivita_txt = "ekon_aktivita_txt", vzdelani_txt = "vzdelani_txt", z_z_txt = "z_z_txt", zamestnani_txt = "zamestnani_txt", logovat_gdpr = "logovat_gdpr", duvod_ucel = "duvod_ucel", seznam_udaju = "seznam_udaju", typ_vztahu = "typ_vztahu", ixs_oso = "ixs_oso", kval_rc = "kval_rc", rc = "rc", rcd = "rcd", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", kval_st_obc = "kval_st_obc", stat_obc = "stat_obc", mistonar = "mistonar", narodnost = "narodnost", okres_naroz = "okres_naroz", stat_naroz = "stat_naroz", typ_pobytu = "typ_pobytu", dat_tp = "dat_tp", rod_stav = "rod_stav", z_z = "z_z", vzdelani = "vzdelani", zamestnani = "zamestnani", ekon_aktivita = "ekon_aktivita", vztah_bp = "vztah_bp", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_prav_moc_zz = "dat_prav_moc_zz", cj_zz = "cj_zz", nazev_soudu_zz = "nazev_soudu_zz", pco = "pco", kod_ob = "kod_ob", vseznam = "vseznam", okrsek = "okrsek", byt = "byt", volebni_pravo = "volebni_pravo", ref_udaje = "ref_udaje", aifo = "aifo", dat_akt_iszr = "dat_akt_iszr", aifo_iseo = "aifo_iseo", dat_akt_iseo = "dat_akt_iseo", ico = "ico", typ_pobytu_txt_unl = "typ_pobytu_txt_unl", dat_do_zz = "dat_do_zz", Permissions = "Permissions",}
	const enum GOsoba1ROBDtoFragments { Zmena = "ZMENA", stat_naroz_txt = "Extended", typ_pobytu_txt = "Extended", stav_oso_txt = "Extended", rod_stav_txt = "Extended", stat_obc_txt = "Extended", kval_st_obc_txt = "Extended", ktg_obyv_txt = "Extended", ekon_aktivita_txt = "Extended", vzdelani_txt = "Extended", z_z_txt = "Extended", zamestnani_txt = "Extended", logovat_gdpr = "Extended", duvod_ucel = "Extended", seznam_udaju = "Extended", typ_vztahu = "Extended", ixs_oso = "Base", kval_rc = "Base", rc = "Base", rcd = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", kval_st_obc = "Base", stat_obc = "Base", mistonar = "Base", narodnost = "Base", okres_naroz = "Base", stat_naroz = "Base", typ_pobytu = "Base", dat_tp = "Base", rod_stav = "Base", z_z = "Base", vzdelani = "Base", zamestnani = "Base", ekon_aktivita = "Base", vztah_bp = "Base", ktg_obyv = "Base", stav_oso = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_prav_moc_zz = "Base", cj_zz = "Base", nazev_soudu_zz = "Base", pco = "Base", kod_ob = "Base", vseznam = "Base", okrsek = "Base", byt = "Base", volebni_pravo = "Base", ref_udaje = "Base", aifo = "Base", dat_akt_iszr = "Base", aifo_iseo = "Base", dat_akt_iseo = "Base", ico = "Base", typ_pobytu_txt_unl = "Base", dat_do_zz = "Base", Permissions = "*",}
	const enum GOsoba1ROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", stat_naroz_txt = "string", typ_pobytu_txt = "string", stav_oso_txt = "string", rod_stav_txt = "string", stat_obc_txt = "string", kval_st_obc_txt = "string", ktg_obyv_txt = "string", ekon_aktivita_txt = "string", vzdelani_txt = "string", z_z_txt = "string", zamestnani_txt = "string", logovat_gdpr = "boolean", duvod_ucel = "string", seznam_udaju = "string", typ_vztahu = "number", ixs_oso = "string", kval_rc = "number", rc = "string", rcd = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", kval_st_obc = "number", stat_obc = "number", mistonar = "string", narodnost = "string", okres_naroz = "string", stat_naroz = "number", typ_pobytu = "number", dat_tp = "JsonDate", rod_stav = "number", z_z = "number", vzdelani = "number", zamestnani = "number", ekon_aktivita = "number", vztah_bp = "number", ktg_obyv = "number", stav_oso = "number", cs_prijmeni = "string", cs_jmeno = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_prav_moc_zz = "JsonDate", cj_zz = "string", nazev_soudu_zz = "string", pco = "number", kod_ob = "number", vseznam = "number", okrsek = "number", byt = "string", volebni_pravo = "number", ref_udaje = "number", aifo = "string", dat_akt_iszr = "JsonDate", aifo_iseo = "string", dat_akt_iseo = "JsonDate", ico = "string", typ_pobytu_txt_unl = "string", dat_do_zz = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsoba1ROBDtoTypeLengths { ixs_oso = 12, rc = 10, rcd = 1, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, narodnost = 20, okres_naroz = 48, cs_prijmeni = 100, cs_jmeno = 100, poznamka = 50, zmenu_prov = 12, cj_zz = 100, nazev_soudu_zz = 50, byt = 5, aifo = 24, aifo_iseo = 24, ico = 10, typ_pobytu_txt_unl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaArchivBydlistROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Archiv bydlišť osoby*/
	interface GOsobaArchivBydlistROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**DBCOLUMN:robsbyd.ixs_byd_nad*/
		ixs_byd_nad?: string|null;
		/**Datum od*/
		dat_od?: JsonDate|null;
		/**Stav bydliště*/
		stav_bydl?: number|null;
		/**DBCOLUMN:robsbyd.dat_prov*/
		dat_prov?: JsonDate|null;
		/**Stav bydliště textově*/
		stav_bydl_txt?: string|null;
		/**Stav bydliště textově*/
		pred_stav_bydl?: string|null;
		/**Okres*/
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Druh čísla domovního*/
		dcd?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Část obce*/
		castobce?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Psč*/
		psc?: string|null;
		/**Okres*/
		new_okres?: string|null;
		/**Obec*/
		new_obec?: string|null;
		/**Ulice*/
		new_ulice?: string|null;
		/**Druh čísla domovního*/
		new_dcd?: string|null;
		/**Domovní číslo*/
		new_cd?: number|null;
		/**Část obce*/
		new_castobce?: string|null;
		/**Číslo orientační*/
		new_cor?: number|null;
		/**Písmeno u čísla orientačního*/
		new_pcor?: string|null;
		/**Psč*/
		new_psc?: string|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**dat_od_txt*/
		dat_od_txt?: string|null;
		/**dat_prov_txt*/
		dat_prov_txt?: string|null;
		/**bydliste_od*/
		bydliste_od?: string|null;
		/**bydliste_kam*/
		bydliste_kam?: string|null;
	}
	const enum GOsobaArchivBydlistROBDtoNames { rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", stav_oso = "stav_oso", ixs_byd_nad = "ixs_byd_nad", dat_od = "dat_od", stav_bydl = "stav_bydl", dat_prov = "dat_prov", stav_bydl_txt = "stav_bydl_txt", pred_stav_bydl = "pred_stav_bydl", okres = "okres", obec = "obec", ulice = "ulice", dcd = "dcd", cd = "cd", castobce = "castobce", cor = "cor", pcor = "pcor", psc = "psc", new_okres = "new_okres", new_obec = "new_obec", new_ulice = "new_ulice", new_dcd = "new_dcd", new_cd = "new_cd", new_castobce = "new_castobce", new_cor = "new_cor", new_pcor = "new_pcor", new_psc = "new_psc", Zmena = "Zmena", dat_od_txt = "dat_od_txt", dat_prov_txt = "dat_prov_txt", bydliste_od = "bydliste_od", bydliste_kam = "bydliste_kam", Permissions = "Permissions",}
	const enum GOsobaArchivBydlistROBDtoFragments { rc = "Base", prijmeni = "Base", jmeno = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", stav_oso = "Base", ixs_byd_nad = "Base", dat_od = "Base", stav_bydl = "Base", dat_prov = "Base", stav_bydl_txt = "Base", pred_stav_bydl = "Base", okres = "Base", obec = "Base", ulice = "Base", dcd = "Base", cd = "Base", castobce = "Base", cor = "Base", pcor = "Base", psc = "Base", new_okres = "Base", new_obec = "Base", new_ulice = "Base", new_dcd = "Base", new_cd = "Base", new_castobce = "Base", new_cor = "Base", new_pcor = "Base", new_psc = "Base", Zmena = "ZMENA", dat_od_txt = "Extended", dat_prov_txt = "Extended", bydliste_od = "Extended", bydliste_kam = "Extended", Permissions = "*",}
	const enum GOsobaArchivBydlistROBDtoTypes { rc = "string", prijmeni = "string", jmeno = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", stav_oso = "number", ixs_byd_nad = "string", dat_od = "JsonDate", stav_bydl = "number", dat_prov = "JsonDate", stav_bydl_txt = "string", pred_stav_bydl = "string", okres = "string", obec = "string", ulice = "string", dcd = "string", cd = "number", castobce = "string", cor = "number", pcor = "string", psc = "string", new_okres = "string", new_obec = "string", new_ulice = "string", new_dcd = "string", new_cd = "number", new_castobce = "string", new_cor = "number", new_pcor = "string", new_psc = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", dat_od_txt = "string", dat_prov_txt = "string", bydliste_od = "string", bydliste_kam = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaArchivBydlistROBDtoTypeLengths { rc = 10, prijmeni = 100, jmeno = 100, tit_pred = 35, tit_za = 35, ixs_byd_nad = 12, stav_bydl_txt = 12, pred_stav_bydl = 12, okres = 48, obec = 48, ulice = 48, dcd = 1, castobce = 48, pcor = 1, psc = 12, new_okres = 48, new_obec = 48, new_ulice = 48, new_dcd = 1, new_castobce = 48, new_pcor = 1, new_psc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaArchivPrijmeniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Archiv příjmení*/
	interface GOsobaArchivPrijmeniROBDto extends Gordic.Rob.Interface.GRobvpriDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GOsobaArchivPrijmeniROBDtoNames { Zmena = "Zmena", ixs_oso = "ixs_oso", typ_prij = "typ_prij", dat_od = "dat_od", prijmeni = "prijmeni", dat_do = "dat_do", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaArchivPrijmeniROBDtoFragments { Zmena = "ZMENA", ixs_oso = "Base", typ_prij = "Base", dat_od = "Base", prijmeni = "Base", dat_do = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaArchivPrijmeniROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_oso = "string", typ_prij = "number", dat_od = "JsonDate", prijmeni = "string", dat_do = "JsonDate", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaArchivPrijmeniROBDtoTypeLengths { ixs_oso = 12, prijmeni = 100, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaArchivRCROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro archiv rodnýc čísel občana*/
	interface GOsobaArchivRCROBDto extends Gordic.Rob.Interface.GRobvrciDto {
		/**Rodné číslo původní*/
		rc_puv?: string|null;
		/**Doplněk rodného čísla původní*/
		rcd_puv?: string|null;
		/**Datum počátku platnosti záznamu původní*/
		dat_od_puv?: JsonDate|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GOsobaArchivRCROBDtoNames { rc_puv = "rc_puv", rcd_puv = "rcd_puv", dat_od_puv = "dat_od_puv", Zmena = "Zmena", ixs_oso = "ixs_oso", dat_od = "dat_od", rc = "rc", rcd = "rcd", kval_rc = "kval_rc", dat_do = "dat_do", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaArchivRCROBDtoFragments { rc_puv = "Extended", rcd_puv = "Extended", dat_od_puv = "Extended", Zmena = "ZMENA", ixs_oso = "Base", dat_od = "Base", rc = "Base", rcd = "Base", kval_rc = "Base", dat_do = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaArchivRCROBDtoTypes { rc_puv = "string", rcd_puv = "string", dat_od_puv = "JsonDate", Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_oso = "string", dat_od = "JsonDate", rc = "string", rcd = "string", kval_rc = "number", dat_do = "JsonDate", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaArchivRCROBDtoTypeLengths { rc_puv = 10, rcd_puv = 1, ixs_oso = 12, rc = 10, rcd = 1, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaBydlisteROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Bydliště osoby*/
	interface GOsobaBydlisteROBDto extends Gordic.Rob.Interface.GRobsbydDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**GObjektAdresaROBDto*/
		ObjektAdresaROB?: Gordic.Rob.Interface.GObjektAdresaROBDto|null;
		/**GObjektROBDto*/
		ObjektROB?: Gordic.Rob.Interface.GObjektROBDto|null;
		/**Potvrtení o změně bydliště*/
		PotvrzeniROB?: Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto|null;
		/**Předchozí bydliště*/
		PredchoziBydlisteROB?: Gordic.Rob.Interface.GOsobaBydlisteROBDto|null;
		/**Stát textově*/
		stat_txt?: string|null;
		/**Dcd textově*/
		dcd_txt?: string|null;
		/**Změnit změnu provedl*/
		zmenaZmenuProv?: boolean|null;
	}
	const enum GOsobaBydlisteROBDtoNames { Zmena = "Zmena", ObjektAdresaROB = "ObjektAdresaROB", ObjektROB = "ObjektROB", PotvrzeniROB = "PotvrzeniROB", PredchoziBydlisteROB = "PredchoziBydlisteROB", stat_txt = "stat_txt", dcd_txt = "dcd_txt", zmenaZmenuProv = "zmenaZmenuProv", ixs_byd = "ixs_byd", ixs_oso = "ixs_oso", ixs_adr = "ixs_adr", typ_bydl = "typ_bydl", dat_od = "dat_od", dat_do = "dat_do", stav_bydl = "stav_bydl", duvod_steh = "duvod_steh", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_byd_nad = "ixs_byd_nad", ixs_sta = "ixs_sta", stav_prev = "stav_prev", dat_prov = "dat_prov", zaznamy_1 = "zaznamy_1", zaznamy_2 = "zaznamy_2", s_adresa_uradu = "s_adresa_uradu", Permissions = "Permissions",}
	const enum GOsobaBydlisteROBDtoFragments { Zmena = "ZMENA", ObjektAdresaROB = "OBJEKTADRESAROB", ObjektROB = "OBJEKTROB", PotvrzeniROB = "POTVRZENIROB", PredchoziBydlisteROB = "PREDCHOZIBYDLISTEROB", stat_txt = "Extended", dcd_txt = "Extended", zmenaZmenuProv = "Extended", ixs_byd = "Base", ixs_oso = "Base", ixs_adr = "Base", typ_bydl = "Base", dat_od = "Base", dat_do = "Base", stav_bydl = "Base", duvod_steh = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_byd_nad = "Base", ixs_sta = "Base", stav_prev = "Base", dat_prov = "Base", zaznamy_1 = "Base", zaznamy_2 = "Base", s_adresa_uradu = "Base", Permissions = "*",}
	const enum GOsobaBydlisteROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ObjektAdresaROB = "Gordic.Rob.Interface.GObjektAdresaROBDto", ObjektROB = "Gordic.Rob.Interface.GObjektROBDto", PotvrzeniROB = "Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto", PredchoziBydlisteROB = "Gordic.Rob.Interface.GOsobaBydlisteROBDto", stat_txt = "string", dcd_txt = "string", zmenaZmenuProv = "boolean", ixs_byd = "string", ixs_oso = "string", ixs_adr = "string", typ_bydl = "number", dat_od = "JsonDate", dat_do = "JsonDate", stav_bydl = "number", duvod_steh = "number", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_byd_nad = "string", ixs_sta = "string", stav_prev = "number", dat_prov = "JsonDate", zaznamy_1 = "string", zaznamy_2 = "string", s_adresa_uradu = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaBydlisteROBDtoTypeLengths { stat_txt = 254, dcd_txt = 254, ixs_byd = 12, ixs_oso = 12, ixs_adr = 12, poznamka = 50, zmenu_prov = 12, ixs_byd_nad = 12, ixs_sta = 12, zaznamy_1 = 254, zaznamy_2 = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaDalsiJmenaROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Další jména osoby*/
	interface GOsobaDalsiJmenaROBDto extends Gordic.Rob.Interface.GRobvjmeDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Typ jména textověl*/
		typ_jme_txt?: string|null;
		/**Typ jména*/
		typ_jme_pred?: number|null;
		/**Datum od*/
		dat_od_pred?: JsonDate|null;
		/**Jméno*/
		jmeno_pred?: string|null;
	}
	const enum GOsobaDalsiJmenaROBDtoNames { Zmena = "Zmena", typ_jme_txt = "typ_jme_txt", typ_jme_pred = "typ_jme_pred", dat_od_pred = "dat_od_pred", jmeno_pred = "jmeno_pred", ixs_oso = "ixs_oso", typ_jme = "typ_jme", dat_od = "dat_od", jmeno = "jmeno", dat_do = "dat_do", k_v = "k_v", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaDalsiJmenaROBDtoFragments { Zmena = "ZMENA", typ_jme_txt = "Extended", typ_jme_pred = "Base", dat_od_pred = "Base", jmeno_pred = "Base", ixs_oso = "Base", typ_jme = "Base", dat_od = "Base", jmeno = "Base", dat_do = "Base", k_v = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaDalsiJmenaROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", typ_jme_txt = "string", typ_jme_pred = "number", dat_od_pred = "JsonDate", jmeno_pred = "string", ixs_oso = "string", typ_jme = "number", dat_od = "JsonDate", jmeno = "string", dat_do = "JsonDate", k_v = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaDalsiJmenaROBDtoTypeLengths { jmeno_pred = 100, ixs_oso = 12, jmeno = 100, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaDalsiObcanstviROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Další občanství*/
	interface GOsobaDalsiObcanstviROBDto extends Gordic.Rob.Interface.GRobvstoDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Stát textově*/
		stat_txt?: string|null;
		/**Kvalifikátor textově*/
		kval_st_obc_txt?: string|null;
		/**Datum od*/
		dat_od_pred?: JsonDate|null;
		/**Kód státu*/
		stat_pred?: number|null;
	}
	const enum GOsobaDalsiObcanstviROBDtoNames { Zmena = "Zmena", stat_txt = "stat_txt", kval_st_obc_txt = "kval_st_obc_txt", dat_od_pred = "dat_od_pred", stat_pred = "stat_pred", ixs_oso = "ixs_oso", dat_od = "dat_od", stat = "stat", dat_do = "dat_do", kval_st_obc = "kval_st_obc", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaDalsiObcanstviROBDtoFragments { Zmena = "ZMENA", stat_txt = "Extended", kval_st_obc_txt = "Extended", dat_od_pred = "Extended", stat_pred = "Extended", ixs_oso = "Base", dat_od = "Base", stat = "Base", dat_do = "Base", kval_st_obc = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaDalsiObcanstviROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", stat_txt = "string", kval_st_obc_txt = "string", dat_od_pred = "JsonDate", stat_pred = "number", ixs_oso = "string", dat_od = "JsonDate", stat = "number", dat_do = "JsonDate", kval_st_obc = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaDalsiObcanstviROBDtoTypeLengths { ixs_oso = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaDetailROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro detail osoby*/
	interface GOsobaDetailROBDto extends Gordic.Rob.Interface.GOsoba1ROBDto {
		/**GOsobaBydlisteROBDto*/
		OsobaBydlisteROB?: Gordic.Rob.Interface.GOsobaBydlisteROBDto|null;
		/**GOsobaBydlisteROBDto*/
		OsobaPredchoziBydlisteROB?: Gordic.Rob.Interface.GOsobaBydlisteROBDto|null;
		/**GOsobaVyrazeniROBDto*/
		VyrazeniROB?: Gordic.Rob.Interface.GOsobaVyrazeniROBDto|null;
		/**GOsobaPrukazROBDto*/
		PrukazROB?: Gordic.Rob.Interface.GOsobaPrukazROBDto|null;
		/**GDorucovaciAdrROBDto*/
		DorucovaciAdresaROB?: Gordic.Rob.Interface.GDorucovaciAdrROBDto|null;
		/**Otec*/
		Otec?: Gordic.Rob.Interface.GOsobaRodPrislROBDto|null;
		/**Matka*/
		Matka?: Gordic.Rob.Interface.GOsobaRodPrislROBDto|null;
		/**Partner*/
		Partner?: Gordic.Rob.Interface.GOsobaRodPrislROBDto|null;
		/**Pěstoun*/
		Pestoun?: Gordic.Rob.Interface.GOsobaRodPrislROBDto|null;
		/**pohlavi_txt*/
		pohlavi_txt?: string|null;
		/**misto_naroz_cr_txt*/
		misto_naroz_cr_txt?: string|null;
		/**okres_naroz_cr_txt*/
		okres_naroz_cr_txt?: string|null;
		/**misto_naroz_pobvod*/
		misto_naroz_pobvod?: string|null;
		/**stat_naroz_iszr*/
		stat_naroz_iszr?: number|null;
		/**stat_obc_iszr*/
		stat_obc_iszr?: number|null;
		/**stat_obc_iszr_2*/
		stat_obc_iszr_2?: number|null;
		/**cislo_op_iszr*/
		cislo_op_iszr?: string|null;
		/**cislo_op*/
		cislo_op?: string|null;
		/**rocnik*/
		rocnik?: number|null;
		/**iszr*/
		iszr?: string|null;
		/**aifo_txt*/
		aifo_txt?: string|null;
		/**prihlaseni_zmen_txt*/
		prihlaseni_zmen_txt?: string|null;
		/**rc_lomitko*/
		rc_lomitko?: string|null;
		/**zmena_txt*/
		zmena_txt?: string|null;
		/**dcd_zobraz*/
		dcd_zobraz?: string|null;
		/**dat_od_txt*/
		dat_od_txt?: string|null;
		/**dat_od*/
		dat_od?: JsonDate|null;
		/**vek*/
		vek?: number|null;
		/**dat_naroz_txt*/
		dat_naroz_txt?: string|null;
		/**prihlaseni_zmen*/
		prihlaseni_zmen?: number|null;
		/**agenda*/
		agenda?: string|null;
		/**Datum aktualizace ISZR textově*/
		dat_akt_iszr_txt?: string|null;
		/**Aifo*/
		aifo_check?: boolean|null;
		/**druh nezařazení do voleb*/
		druh_nez?: number|null;
		/**Identifikátor osoby ke které je vztah*/
		ixs_oso_vztah?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Identifikátor bydliště*/
		ixs_byd?: string|null;
		/**Rodné číslo*/
		profil_rc?: string|null;
		/**rc_lomitko*/
		profil_rc_lomitko?: string|null;
		/**Příjmení osoby*/
		profil_prijmeni?: string|null;
		/**Jméno*/
		profil_jmeno?: string|null;
	}
	const enum GOsobaDetailROBDtoNames { OsobaBydlisteROB = "OsobaBydlisteROB", OsobaPredchoziBydlisteROB = "OsobaPredchoziBydlisteROB", VyrazeniROB = "VyrazeniROB", PrukazROB = "PrukazROB", DorucovaciAdresaROB = "DorucovaciAdresaROB", Otec = "Otec", Matka = "Matka", Partner = "Partner", Pestoun = "Pestoun", pohlavi_txt = "pohlavi_txt", misto_naroz_cr_txt = "misto_naroz_cr_txt", okres_naroz_cr_txt = "okres_naroz_cr_txt", misto_naroz_pobvod = "misto_naroz_pobvod", stat_naroz_iszr = "stat_naroz_iszr", stat_obc_iszr = "stat_obc_iszr", stat_obc_iszr_2 = "stat_obc_iszr_2", cislo_op_iszr = "cislo_op_iszr", cislo_op = "cislo_op", rocnik = "rocnik", iszr = "iszr", aifo_txt = "aifo_txt", prihlaseni_zmen_txt = "prihlaseni_zmen_txt", rc_lomitko = "rc_lomitko", zmena_txt = "zmena_txt", dcd_zobraz = "dcd_zobraz", dat_od_txt = "dat_od_txt", dat_od = "dat_od", vek = "vek", dat_naroz_txt = "dat_naroz_txt", prihlaseni_zmen = "prihlaseni_zmen", agenda = "agenda", dat_akt_iszr_txt = "dat_akt_iszr_txt", aifo_check = "aifo_check", druh_nez = "druh_nez", ixs_oso_vztah = "ixs_oso_vztah", ixs_esu = "ixs_esu", ixs_byd = "ixs_byd", profil_rc = "profil_rc", profil_rc_lomitko = "profil_rc_lomitko", profil_prijmeni = "profil_prijmeni", profil_jmeno = "profil_jmeno", Zmena = "Zmena", stat_naroz_txt = "stat_naroz_txt", typ_pobytu_txt = "typ_pobytu_txt", stav_oso_txt = "stav_oso_txt", rod_stav_txt = "rod_stav_txt", stat_obc_txt = "stat_obc_txt", kval_st_obc_txt = "kval_st_obc_txt", ktg_obyv_txt = "ktg_obyv_txt", ekon_aktivita_txt = "ekon_aktivita_txt", vzdelani_txt = "vzdelani_txt", z_z_txt = "z_z_txt", zamestnani_txt = "zamestnani_txt", logovat_gdpr = "logovat_gdpr", duvod_ucel = "duvod_ucel", seznam_udaju = "seznam_udaju", typ_vztahu = "typ_vztahu", ixs_oso = "ixs_oso", kval_rc = "kval_rc", rc = "rc", rcd = "rcd", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", kval_st_obc = "kval_st_obc", stat_obc = "stat_obc", mistonar = "mistonar", narodnost = "narodnost", okres_naroz = "okres_naroz", stat_naroz = "stat_naroz", typ_pobytu = "typ_pobytu", dat_tp = "dat_tp", rod_stav = "rod_stav", z_z = "z_z", vzdelani = "vzdelani", zamestnani = "zamestnani", ekon_aktivita = "ekon_aktivita", vztah_bp = "vztah_bp", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_prav_moc_zz = "dat_prav_moc_zz", cj_zz = "cj_zz", nazev_soudu_zz = "nazev_soudu_zz", pco = "pco", kod_ob = "kod_ob", vseznam = "vseznam", okrsek = "okrsek", byt = "byt", volebni_pravo = "volebni_pravo", ref_udaje = "ref_udaje", aifo = "aifo", dat_akt_iszr = "dat_akt_iszr", aifo_iseo = "aifo_iseo", dat_akt_iseo = "dat_akt_iseo", ico = "ico", typ_pobytu_txt_unl = "typ_pobytu_txt_unl", dat_do_zz = "dat_do_zz", Permissions = "Permissions",}
	const enum GOsobaDetailROBDtoFragments { OsobaBydlisteROB = "*", OsobaPredchoziBydlisteROB = "*", VyrazeniROB = "*", PrukazROB = "*", DorucovaciAdresaROB = "*", Otec = "*", Matka = "*", Partner = "*", Pestoun = "*", pohlavi_txt = "Extended", misto_naroz_cr_txt = "Extended", okres_naroz_cr_txt = "Extended", misto_naroz_pobvod = "Extended", stat_naroz_iszr = "Extended", stat_obc_iszr = "Extended", stat_obc_iszr_2 = "Extended", cislo_op_iszr = "Extended", cislo_op = "Extended", rocnik = "Extended", iszr = "Extended", aifo_txt = "Extended", prihlaseni_zmen_txt = "Extended", rc_lomitko = "Extended", zmena_txt = "Extended", dcd_zobraz = "Extended", dat_od_txt = "Extended", dat_od = "Extended", vek = "Extended", dat_naroz_txt = "Extended", prihlaseni_zmen = "Extended", agenda = "Extended", dat_akt_iszr_txt = "Extended", aifo_check = "Extended", druh_nez = "Extended", ixs_oso_vztah = "Extended", ixs_esu = "Extended", ixs_byd = "Extended", profil_rc = "Extended", profil_rc_lomitko = "Extended", profil_prijmeni = "Extended", profil_jmeno = "Extended", Zmena = "ZMENA", stat_naroz_txt = "Extended", typ_pobytu_txt = "Extended", stav_oso_txt = "Extended", rod_stav_txt = "Extended", stat_obc_txt = "Extended", kval_st_obc_txt = "Extended", ktg_obyv_txt = "Extended", ekon_aktivita_txt = "Extended", vzdelani_txt = "Extended", z_z_txt = "Extended", zamestnani_txt = "Extended", logovat_gdpr = "Extended", duvod_ucel = "Extended", seznam_udaju = "Extended", typ_vztahu = "Extended", ixs_oso = "Base", kval_rc = "Base", rc = "Base", rcd = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", kval_st_obc = "Base", stat_obc = "Base", mistonar = "Base", narodnost = "Base", okres_naroz = "Base", stat_naroz = "Base", typ_pobytu = "Base", dat_tp = "Base", rod_stav = "Base", z_z = "Base", vzdelani = "Base", zamestnani = "Base", ekon_aktivita = "Base", vztah_bp = "Base", ktg_obyv = "Base", stav_oso = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_prav_moc_zz = "Base", cj_zz = "Base", nazev_soudu_zz = "Base", pco = "Base", kod_ob = "Base", vseznam = "Base", okrsek = "Base", byt = "Base", volebni_pravo = "Base", ref_udaje = "Base", aifo = "Base", dat_akt_iszr = "Base", aifo_iseo = "Base", dat_akt_iseo = "Base", ico = "Base", typ_pobytu_txt_unl = "Base", dat_do_zz = "Base", Permissions = "*",}
	const enum GOsobaDetailROBDtoTypes { OsobaBydlisteROB = "Gordic.Rob.Interface.GOsobaBydlisteROBDto", OsobaPredchoziBydlisteROB = "Gordic.Rob.Interface.GOsobaBydlisteROBDto", VyrazeniROB = "Gordic.Rob.Interface.GOsobaVyrazeniROBDto", PrukazROB = "Gordic.Rob.Interface.GOsobaPrukazROBDto", DorucovaciAdresaROB = "Gordic.Rob.Interface.GDorucovaciAdrROBDto", Otec = "Gordic.Rob.Interface.GOsobaRodPrislROBDto", Matka = "Gordic.Rob.Interface.GOsobaRodPrislROBDto", Partner = "Gordic.Rob.Interface.GOsobaRodPrislROBDto", Pestoun = "Gordic.Rob.Interface.GOsobaRodPrislROBDto", pohlavi_txt = "string", misto_naroz_cr_txt = "string", okres_naroz_cr_txt = "string", misto_naroz_pobvod = "string", stat_naroz_iszr = "number", stat_obc_iszr = "number", stat_obc_iszr_2 = "number", cislo_op_iszr = "string", cislo_op = "string", rocnik = "number", iszr = "string", aifo_txt = "string", prihlaseni_zmen_txt = "string", rc_lomitko = "string", zmena_txt = "string", dcd_zobraz = "string", dat_od_txt = "string", dat_od = "JsonDate", vek = "number", dat_naroz_txt = "string", prihlaseni_zmen = "number", agenda = "string", dat_akt_iszr_txt = "string", aifo_check = "boolean", druh_nez = "number", ixs_oso_vztah = "string", ixs_esu = "string", ixs_byd = "string", profil_rc = "string", profil_rc_lomitko = "string", profil_prijmeni = "string", profil_jmeno = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", stat_naroz_txt = "string", typ_pobytu_txt = "string", stav_oso_txt = "string", rod_stav_txt = "string", stat_obc_txt = "string", kval_st_obc_txt = "string", ktg_obyv_txt = "string", ekon_aktivita_txt = "string", vzdelani_txt = "string", z_z_txt = "string", zamestnani_txt = "string", logovat_gdpr = "boolean", duvod_ucel = "string", seznam_udaju = "string", typ_vztahu = "number", ixs_oso = "string", kval_rc = "number", rc = "string", rcd = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", kval_st_obc = "number", stat_obc = "number", mistonar = "string", narodnost = "string", okres_naroz = "string", stat_naroz = "number", typ_pobytu = "number", dat_tp = "JsonDate", rod_stav = "number", z_z = "number", vzdelani = "number", zamestnani = "number", ekon_aktivita = "number", vztah_bp = "number", ktg_obyv = "number", stav_oso = "number", cs_prijmeni = "string", cs_jmeno = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_prav_moc_zz = "JsonDate", cj_zz = "string", nazev_soudu_zz = "string", pco = "number", kod_ob = "number", vseznam = "number", okrsek = "number", byt = "string", volebni_pravo = "number", ref_udaje = "number", aifo = "string", dat_akt_iszr = "JsonDate", aifo_iseo = "string", dat_akt_iseo = "JsonDate", ico = "string", typ_pobytu_txt_unl = "string", dat_do_zz = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaDetailROBDtoTypeLengths { ixs_oso_vztah = 12, profil_rc = 10, profil_prijmeni = 100, profil_jmeno = 100, ixs_oso = 12, rc = 10, rcd = 1, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, narodnost = 20, okres_naroz = 48, cs_prijmeni = 100, cs_jmeno = 100, poznamka = 50, zmenu_prov = 12, cj_zz = 100, nazev_soudu_zz = 50, byt = 5, aifo = 24, aifo_iseo = 24, ico = 10, typ_pobytu_txt_unl = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaDiteROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dítě osoby*/
	interface GOsobaDiteROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**Okres*/
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Část obce*/
		castobce?: string|null;
		/**Druh čísla domovního*/
		dcd?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Psč*/
		psc?: string|null;
		/**Blok Domu*/
		blok_domu?: string|null;
		/**Vchod*/
		vchod?: string|null;
		/**Byt*/
		byt?: string|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**typ_pobytu_txt*/
		typ_pobytu_txt?: string|null;
		/**Typ vztahu osoby*/
		typ_vztahu?: number|null;
		/**Typ vztahu osoby textově*/
		typ_vztahu_txt?: string|null;
		/**Typ vztahu osoby textově*/
		dat_naroz_txt?: string|null;
	}
	const enum GOsobaDiteROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", typ_pobytu = "typ_pobytu", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", okres = "okres", obec = "obec", ulice = "ulice", cd = "cd", castobce = "castobce", dcd = "dcd", cor = "cor", pcor = "pcor", psc = "psc", blok_domu = "blok_domu", vchod = "vchod", byt = "byt", Zmena = "Zmena", typ_pobytu_txt = "typ_pobytu_txt", typ_vztahu = "typ_vztahu", typ_vztahu_txt = "typ_vztahu_txt", dat_naroz_txt = "dat_naroz_txt", Permissions = "Permissions",}
	const enum GOsobaDiteROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", typ_pobytu = "Base", ktg_obyv = "Base", stav_oso = "Base", okres = "Base", obec = "Base", ulice = "Base", cd = "Base", castobce = "Base", dcd = "Base", cor = "Base", pcor = "Base", psc = "Base", blok_domu = "Base", vchod = "Base", byt = "Base", Zmena = "ZMENA", typ_pobytu_txt = "Extended", typ_vztahu = "Extended", typ_vztahu_txt = "Extended", dat_naroz_txt = "Extended", Permissions = "*",}
	const enum GOsobaDiteROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", typ_pobytu = "number", ktg_obyv = "number", stav_oso = "number", okres = "string", obec = "string", ulice = "string", cd = "number", castobce = "string", dcd = "string", cor = "number", pcor = "string", psc = "string", blok_domu = "string", vchod = "string", byt = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", typ_pobytu_txt = "string", typ_vztahu = "number", typ_vztahu_txt = "string", dat_naroz_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaDiteROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, okres = 48, obec = 48, ulice = 48, castobce = 48, dcd = 1, pcor = 1, psc = 12, blok_domu = 8, vchod = 5, byt = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaJmenoROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Jméno*/
	interface GOsobaJmenoROBDto extends Gordic.Rob.Interface.GRobsjmeDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Púvodní jméno*/
		puvodni_jmeno?: string|null;
	}
	const enum GOsobaJmenoROBDtoNames { Zmena = "Zmena", puvodni_jmeno = "puvodni_jmeno", jmeno = "jmeno", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaJmenoROBDtoFragments { Zmena = "ZMENA", puvodni_jmeno = "Extended", jmeno = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaJmenoROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", puvodni_jmeno = "string", jmeno = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaJmenoROBDtoTypeLengths { puvodni_jmeno = 100, jmeno = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaPrijmeniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Příjmení*/
	interface GOsobaPrijmeniROBDto extends Gordic.Rob.Interface.GRobspriDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Púvodní příjmení*/
		puvodni_prijmeni?: string|null;
	}
	const enum GOsobaPrijmeniROBDtoNames { Zmena = "Zmena", puvodni_prijmeni = "puvodni_prijmeni", prijmeni = "prijmeni", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaPrijmeniROBDtoFragments { Zmena = "ZMENA", puvodni_prijmeni = "Extended", prijmeni = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaPrijmeniROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", puvodni_prijmeni = "string", prijmeni = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaPrijmeniROBDtoTypeLengths { puvodni_prijmeni = 100, prijmeni = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaPrukazROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Průkaz občana*/
	interface GOsobaPrukazROBDto extends Gordic.Rob.Interface.GRobvpruDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Číslo průkazu původní*/
		cislo_pruk_puvodni?: string|null;
	}
	const enum GOsobaPrukazROBDtoNames { Zmena = "Zmena", cislo_pruk_puvodni = "cislo_pruk_puvodni", ixs_oso = "ixs_oso", typ_pruk = "typ_pruk", cislo_pruk = "cislo_pruk", dat_od = "dat_od", dat_do = "dat_do", vydal = "vydal", dat_vyd = "dat_vyd", ixp = "ixp", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaPrukazROBDtoFragments { Zmena = "ZMENA", cislo_pruk_puvodni = "Extended", ixs_oso = "Base", typ_pruk = "Base", cislo_pruk = "Base", dat_od = "Base", dat_do = "Base", vydal = "Base", dat_vyd = "Base", ixp = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaPrukazROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", cislo_pruk_puvodni = "string", ixs_oso = "string", typ_pruk = "number", cislo_pruk = "string", dat_od = "JsonDate", dat_do = "JsonDate", vydal = "string", dat_vyd = "JsonDate", ixp = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaPrukazROBDtoTypeLengths { cislo_pruk_puvodni = 30, ixs_oso = 12, cislo_pruk = 30, vydal = 50, ixp = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaRodinaROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Rodina osoby*/
	interface GOsobaRodinaROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Identifikátor druhé osoby*/
		ixs_oso_1?: string|null;
		/**Typ vztahu*/
		typ_vztahu?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Typ vztahu textově*/
		typ_vztahu_txt?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GOsobaRodinaROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", typ_pobytu = "typ_pobytu", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", typ_pobytu_txt = "typ_pobytu_txt", ixs_oso_1 = "ixs_oso_1", typ_vztahu = "typ_vztahu", aktivita = "aktivita", typ_vztahu_txt = "typ_vztahu_txt", poznamka = "poznamka", Zmena = "Zmena", Permissions = "Permissions",}
	const enum GOsobaRodinaROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", typ_pobytu = "Base", ktg_obyv = "Base", stav_oso = "Base", typ_pobytu_txt = "Base", ixs_oso_1 = "Base", typ_vztahu = "Base", aktivita = "Base", typ_vztahu_txt = "Base", poznamka = "Base", Zmena = "ZMENA", Permissions = "*",}
	const enum GOsobaRodinaROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", typ_pobytu = "number", ktg_obyv = "number", stav_oso = "number", typ_pobytu_txt = "string", ixs_oso_1 = "string", typ_vztahu = "number", aktivita = "number", typ_vztahu_txt = "string", poznamka = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaRodinaROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, ixs_oso_1 = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaRodPrislDetailROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Osoba (nahrazuje DetailRodPrislDataSet)*/
	interface GOsobaRodPrislDetailROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Typ vztahu*/
		typ_vztahu?: number|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**agenda*/
		logovat_gdpr?: boolean|null;
		/**Důvod účel logování GDPR*/
		duvod_ucel?: string|null;
		/**Seznam údajů*/
		seznam_udaju?: string|null;
	}
	const enum GOsobaRodPrislDetailROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", mistonar = "mistonar", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_vztahu = "typ_vztahu", Zmena = "Zmena", logovat_gdpr = "logovat_gdpr", duvod_ucel = "duvod_ucel", seznam_udaju = "seznam_udaju", Permissions = "Permissions",}
	const enum GOsobaRodPrislDetailROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", mistonar = "Base", ktg_obyv = "Base", stav_oso = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", typ_vztahu = "Base", Zmena = "ZMENA", logovat_gdpr = "Extended", duvod_ucel = "Extended", seznam_udaju = "Extended", Permissions = "*",}
	const enum GOsobaRodPrislDetailROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", mistonar = "string", ktg_obyv = "number", stav_oso = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_vztahu = "number", Zmena = "Gordic.Gin.Interface.GGinszmpDto", logovat_gdpr = "boolean", duvod_ucel = "string", seznam_udaju = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaRodPrislDetailROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaRodPrislROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Rodinný příslušník osoby*/
	interface GOsobaRodPrislROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Existuje rodné číslo u osoby*/
		bez_rc?: boolean|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**DBCOLUMN:robsoso.typ_pobytu*/
		typ_pobytu?: number|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**Typ vztahu textově*/
		robctyv_typ_vztahu_txt?: string|null;
		/**identifikátor osoby*/
		robvoso_ixs_oso_1?: string|null;
		/**Typ vztahu*/
		robvoso_typ_vztahu?: number|null;
		/**Poznámka*/
		robvoso_poznamka?: string|null;
		/**Aktivita*/
		robvoso_aktivita?: number|null;
		/**Datum změny*/
		robvoso_dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		robvoso_zmenu_prov?: string|null;
		/**Okres*/
		robsido_okres?: string|null;
		/**Obec*/
		robsido_obec?: string|null;
		/**Ulice*/
		robsido_ulice?: string|null;
		/**Domovní číslo*/
		robsido_cd?: number|null;
		/**Část obce*/
		robsido_castobce?: string|null;
		/**DBCOLUMN:robsido.dcd*/
		robsido_dcd?: string|null;
		/**DBCOLUMN:robsido.cor*/
		robsido_cor?: number|null;
		/**DBCOLUMN:robsido.pcor*/
		robsido_pcor?: string|null;
		/**Psč*/
		robsido_psc?: string|null;
		/**Blok Domu*/
		robsadr_blok_domu?: string|null;
		/**Vchod*/
		robsadr_vchod?: string|null;
		/**Byt*/
		robsadr_byt?: string|null;
		/**typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Datum narovení textově*/
		dat_naroz_txt?: string|null;
		/**Datum narovení textově*/
		logovat_gdpr?: boolean|null;
		/**Důvod /účel*/
		duvod_ucel?: string|null;
		/**Seznam údajů*/
		seznam_udaju?: string|null;
	}
	const enum GOsobaRodPrislROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", bez_rc = "bez_rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", mistonar = "mistonar", typ_pobytu = "typ_pobytu", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", robctyv_typ_vztahu_txt = "robctyv_typ_vztahu_txt", robvoso_ixs_oso_1 = "robvoso_ixs_oso_1", robvoso_typ_vztahu = "robvoso_typ_vztahu", robvoso_poznamka = "robvoso_poznamka", robvoso_aktivita = "robvoso_aktivita", robvoso_dat_zmena = "robvoso_dat_zmena", robvoso_zmenu_prov = "robvoso_zmenu_prov", robsido_okres = "robsido_okres", robsido_obec = "robsido_obec", robsido_ulice = "robsido_ulice", robsido_cd = "robsido_cd", robsido_castobce = "robsido_castobce", robsido_dcd = "robsido_dcd", robsido_cor = "robsido_cor", robsido_pcor = "robsido_pcor", robsido_psc = "robsido_psc", robsadr_blok_domu = "robsadr_blok_domu", robsadr_vchod = "robsadr_vchod", robsadr_byt = "robsadr_byt", typ_pobytu_txt = "typ_pobytu_txt", dat_naroz_txt = "dat_naroz_txt", logovat_gdpr = "logovat_gdpr", duvod_ucel = "duvod_ucel", seznam_udaju = "seznam_udaju", Permissions = "Permissions",}
	const enum GOsobaRodPrislROBDtoFragments { ixs_oso = "Base", rc = "Base", bez_rc = "Extended", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", mistonar = "Base", typ_pobytu = "Base", ktg_obyv = "Base", stav_oso = "Base", robctyv_typ_vztahu_txt = "Extended", robvoso_ixs_oso_1 = "Extended", robvoso_typ_vztahu = "Extended", robvoso_poznamka = "Extended", robvoso_aktivita = "Extended", robvoso_dat_zmena = "Extended", robvoso_zmenu_prov = "Extended", robsido_okres = "Extended", robsido_obec = "Extended", robsido_ulice = "Extended", robsido_cd = "Extended", robsido_castobce = "Extended", robsido_dcd = "Extended", robsido_cor = "Extended", robsido_pcor = "Extended", robsido_psc = "Extended", robsadr_blok_domu = "Extended", robsadr_vchod = "Extended", robsadr_byt = "Extended", typ_pobytu_txt = "Extended", dat_naroz_txt = "Extended", logovat_gdpr = "Extended", duvod_ucel = "Extended", seznam_udaju = "Extended", Permissions = "*",}
	const enum GOsobaRodPrislROBDtoTypes { ixs_oso = "string", rc = "string", bez_rc = "boolean", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", mistonar = "string", typ_pobytu = "number", ktg_obyv = "number", stav_oso = "number", robctyv_typ_vztahu_txt = "string", robvoso_ixs_oso_1 = "string", robvoso_typ_vztahu = "number", robvoso_poznamka = "string", robvoso_aktivita = "number", robvoso_dat_zmena = "JsonDate", robvoso_zmenu_prov = "string", robsido_okres = "string", robsido_obec = "string", robsido_ulice = "string", robsido_cd = "number", robsido_castobce = "string", robsido_dcd = "string", robsido_cor = "number", robsido_pcor = "string", robsido_psc = "string", robsadr_blok_domu = "string", robsadr_vchod = "string", robsadr_byt = "string", typ_pobytu_txt = "string", dat_naroz_txt = "string", logovat_gdpr = "boolean", duvod_ucel = "string", seznam_udaju = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaRodPrislROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, robctyv_typ_vztahu_txt = 50, robvoso_ixs_oso_1 = 12, robvoso_poznamka = 50, robvoso_zmenu_prov = 12, robsido_okres = 48, robsido_obec = 48, robsido_ulice = 48, robsido_castobce = 48, robsido_dcd = 1, robsido_pcor = 1, robsido_psc = 12, robsadr_blok_domu = 8, robsadr_vchod = 5, robsadr_byt = 5,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaSpolubydliciROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Spolubydlící osoby*/
	interface GOsobaSpolubydliciROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Identifikátor adresy*/
		ixs_adr?: string|null;
		/**Identifikátor dokladu*/
		ixs_ido?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**Okres narození*/
		okres_naroz?: string|null;
		/**Okres*/
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo domu*/
		cd?: number|null;
		/**Část obce*/
		castobce?: string|null;
		/**Doplněk čísla domu*/
		dcd?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno čísla orientačního*/
		pcor?: string|null;
		/**PSČ*/
		psc?: string|null;
		/**Blok domu*/
		blok_domu?: string|null;
		/**Vchod*/
		vchod?: string|null;
		/**Byt*/
		byt?: string|null;
		/**Datum narození (textová reprezentace)*/
		dat_naroz_txt?: string|null;
	}
	const enum GOsobaSpolubydliciROBDtoNames { ixs_oso = "ixs_oso", ixs_adr = "ixs_adr", ixs_ido = "ixs_ido", rc = "rc", tit_pred = "tit_pred", prijmeni = "prijmeni", jmeno = "jmeno", tit_za = "tit_za", dat_naroz = "dat_naroz", rodprij = "rodprij", mistonar = "mistonar", okres_naroz = "okres_naroz", okres = "okres", obec = "obec", ulice = "ulice", cd = "cd", castobce = "castobce", dcd = "dcd", cor = "cor", pcor = "pcor", psc = "psc", blok_domu = "blok_domu", vchod = "vchod", byt = "byt", dat_naroz_txt = "dat_naroz_txt", Permissions = "Permissions",}
	const enum GOsobaSpolubydliciROBDtoFragments { ixs_oso = "Base", ixs_adr = "Base", ixs_ido = "Base", rc = "Base", tit_pred = "Base", prijmeni = "Base", jmeno = "Base", tit_za = "Base", dat_naroz = "Base", rodprij = "Base", mistonar = "Base", okres_naroz = "Base", okres = "Base", obec = "Base", ulice = "Base", cd = "Base", castobce = "Base", dcd = "Base", cor = "Base", pcor = "Base", psc = "Base", blok_domu = "Base", vchod = "Base", byt = "Base", dat_naroz_txt = "Extended", Permissions = "*",}
	const enum GOsobaSpolubydliciROBDtoTypes { ixs_oso = "string", ixs_adr = "string", ixs_ido = "string", rc = "string", tit_pred = "string", prijmeni = "string", jmeno = "string", tit_za = "string", dat_naroz = "JsonDate", rodprij = "string", mistonar = "string", okres_naroz = "string", okres = "string", obec = "string", ulice = "string", cd = "number", castobce = "string", dcd = "string", cor = "number", pcor = "string", psc = "string", blok_domu = "string", vchod = "string", byt = "string", dat_naroz_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaSpolubydliciROBDtoTypeLengths { ixs_oso = 12, ixs_adr = 12, ixs_ido = 12, rc = 10, tit_pred = 35, prijmeni = 100, jmeno = 100, tit_za = 35, rodprij = 100, mistonar = 60, okres_naroz = 48, okres = 48, obec = 48, ulice = 48, castobce = 48, dcd = 1, pcor = 1, psc = 12, blok_domu = 8, vchod = 5, byt = 5, dat_naroz_txt = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaVypisGDPRROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Výpis využití údajů osoby*/
	interface GOsobaVypisGDPRROBDto extends Gordic.Rob.Interface.GRobhosoDto {
		robczme_zmena_oso_txt?: string|null;
		ginctag_zkr_ag?: string|null;
		ginszmp_nazev_rf?: string|null;
	}
	const enum GOsobaVypisGDPRROBDtoNames { robczme_zmena_oso_txt = "robczme_zmena_oso_txt", ginctag_zkr_ag = "ginctag_zkr_ag", ginszmp_nazev_rf = "ginszmp_nazev_rf", ixs_oso = "ixs_oso", por_cislo = "por_cislo", zmena_oso = "zmena_oso", typ_ag = "typ_ag", ixs_adr = "ixs_adr", ixs_oso_vaz = "ixs_oso_vaz", duvod_ucel = "duvod_ucel", seznam_udaju = "seznam_udaju", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp = "ixp", Permissions = "Permissions",}
	const enum GOsobaVypisGDPRROBDtoFragments { robczme_zmena_oso_txt = "Extended", ginctag_zkr_ag = "Extended", ginszmp_nazev_rf = "Extended", ixs_oso = "Base", por_cislo = "Base", zmena_oso = "Base", typ_ag = "Base", ixs_adr = "Base", ixs_oso_vaz = "Base", duvod_ucel = "Base", seznam_udaju = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixp = "Base", Permissions = "*",}
	const enum GOsobaVypisGDPRROBDtoTypes { robczme_zmena_oso_txt = "string", ginctag_zkr_ag = "string", ginszmp_nazev_rf = "string", ixs_oso = "string", por_cislo = "number", zmena_oso = "number", typ_ag = "number", ixs_adr = "string", ixs_oso_vaz = "string", duvod_ucel = "string", seznam_udaju = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaVypisGDPRROBDtoTypeLengths { ixs_oso = 12, ixs_adr = 12, ixs_oso_vaz = 12, duvod_ucel = 254, seznam_udaju = 254, zmenu_prov = 12, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaVyrazeniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Vyřazení občana z voleb*/
	interface GOsobaVyrazeniROBDto extends Gordic.Rob.Interface.GRobvvpoDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**GDruhyNezarazeniDto*/
		DruhNezarazeni?: Gordic.Rob.Interface.GDruhyNezarazeniDto|null;
	}
	const enum GOsobaVyrazeniROBDtoNames { Zmena = "Zmena", DruhNezarazeni = "DruhNezarazeni", ixs_oso = "ixs_oso", druh_nez = "druh_nez", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prukaz = "prukaz", prukaz_2 = "prukaz_2", prukaz_3 = "prukaz_3", prukaz_4 = "prukaz_4", Permissions = "Permissions",}
	const enum GOsobaVyrazeniROBDtoFragments { Zmena = "ZMENA", DruhNezarazeni = "DRUHNEZARAZENI", ixs_oso = "Base", druh_nez = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", prukaz = "Base", prukaz_2 = "Base", prukaz_3 = "Base", prukaz_4 = "Base", Permissions = "*",}
	const enum GOsobaVyrazeniROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", DruhNezarazeni = "Gordic.Rob.Interface.GDruhyNezarazeniDto", ixs_oso = "string", druh_nez = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prukaz = "string", prukaz_2 = "string", prukaz_3 = "string", prukaz_4 = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaVyrazeniROBDtoTypeLengths { ixs_oso = 12, poznamka = 50, zmenu_prov = 12, prukaz = 30, prukaz_2 = 30, prukaz_3 = 30, prukaz_4 = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GOsobaVztahROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Vztah mezi dvěma osobami*/
	interface GOsobaVztahROBDto extends Gordic.Rob.Interface.GRobvosoDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GOsobaVztahROBDtoNames { Zmena = "Zmena", ixs_oso_1 = "ixs_oso_1", ixs_oso_2 = "ixs_oso_2", typ_vztahu = "typ_vztahu", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GOsobaVztahROBDtoFragments { Zmena = "ZMENA", ixs_oso_1 = "Base", ixs_oso_2 = "Base", typ_vztahu = "Base", dat_od = "Base", dat_do = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GOsobaVztahROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_oso_1 = "string", ixs_oso_2 = "string", typ_vztahu = "number", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaVztahROBDtoTypeLengths { ixs_oso_1 = 12, ixs_oso_2 = 12, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GSprPoplatekROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro Detail správního poplatku*/
	interface GSprPoplatekROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor dokladu*/
		idPokDokladu?: string|null;
		/**Identifikátor externího subjektu*/
		ixsEsu?: string|null;
		/**Identifikátor deníku*/
		ixpDen?: string|null;
		/**Identifikátor funkčního místa*/
		ixsFun?: string|null;
		/**SU, funkce která bude vlastníkem pokladního dokladu*/
		ixsSu?: string|null;
		/**Identifikátor kontace*/
		ixsKon?: string|null;
		/**Variabilní symbol*/
		vs?: string|null;
		/**Částka poplatku*/
		castka?: JsonDecimal|null;
		/**Popis*/
		popis?: string|null;
	}
	const enum GSprPoplatekROBDtoNames { idPokDokladu = "idPokDokladu", ixsEsu = "ixsEsu", ixpDen = "ixpDen", ixsFun = "ixsFun", ixsSu = "ixsSu", ixsKon = "ixsKon", vs = "vs", castka = "castka", popis = "popis", Permissions = "Permissions",}
	const enum GSprPoplatekROBDtoFragments { idPokDokladu = "Base", ixsEsu = "Base", ixpDen = "Base", ixsFun = "Base", ixsSu = "Base", ixsKon = "Base", vs = "Base", castka = "Base", popis = "Base", Permissions = "*",}
	const enum GSprPoplatekROBDtoTypes { idPokDokladu = "string", ixsEsu = "string", ixpDen = "string", ixsFun = "string", ixsSu = "string", ixsKon = "string", vs = "string", castka = "JsonDecimal", popis = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSprPoplatekROBDtoTypeLengths { ixsEsu = 12, ixpDen = 12, ixsFun = 12, ixsSu = 12, ixsKon = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GSprPoplatkyROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**GSprPoplatkyROBDto*/
	interface GSprPoplatkyROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor bydliště*/
		ixs_byd?: string|null;
		/**PK pokladního dokladu*/
		ixp?: string|null;
		/**Kód stavu storna dokladu*/
		s_sto?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Ekonomická aktivita dokladu
		*      Používá pouze 100
		*/
		eko_akt?: number|null;
		/**Nepoužívá se*/
		arw?: number|null;
		/**Idenfitikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Agendové číslo
		*      Generuje se v okamžiku evidence do pokladní knihy, datum generace je uložen v dat_evid
		*/
		ac?: string|null;
		/**PK pokladní knihy vlastnící doklad*/
		ixp_den?: string|null;
		/**Popis pokladního dokladu*/
		popis?: string|null;
		/**Kód stavu pokladního dokladu*/
		up_stav?: number|null;
		ginsesu_esu_txt?: string|null;
		pokcups_up_stav_txt?: string|null;
		/**Kód stavu tisku*/
		s_tis?: number|null;
		pokdpep_vs?: string|null;
		/**Částka dokladu v účetní měně*/
		c_celkem?: JsonDecimal|null;
		/**Datum podání pokladního dokladu
		*      Okamžik zarezervování IXP dokladu
		*/
		dat_vyst?: JsonDate|null;
	}
	const enum GSprPoplatkyROBDtoNames { ixs_byd = "ixs_byd", ixp = "ixp", s_sto = "s_sto", lic = "lic", eko_akt = "eko_akt", arw = "arw", ixs_esu = "ixs_esu", ac = "ac", ixp_den = "ixp_den", popis = "popis", up_stav = "up_stav", ginsesu_esu_txt = "ginsesu_esu_txt", pokcups_up_stav_txt = "pokcups_up_stav_txt", s_tis = "s_tis", pokdpep_vs = "pokdpep_vs", c_celkem = "c_celkem", dat_vyst = "dat_vyst", Permissions = "Permissions",}
	const enum GSprPoplatkyROBDtoFragments { ixs_byd = "Base", ixp = "Base", s_sto = "Base", lic = "Base", eko_akt = "Base", arw = "Base", ixs_esu = "Base", ac = "Base", ixp_den = "Base", popis = "Base", up_stav = "Base", ginsesu_esu_txt = "Base", pokcups_up_stav_txt = "Base", s_tis = "Base", pokdpep_vs = "Base", c_celkem = "Base", dat_vyst = "Base", Permissions = "*",}
	const enum GSprPoplatkyROBDtoTypes { ixs_byd = "string", ixp = "string", s_sto = "number", lic = "string", eko_akt = "number", arw = "number", ixs_esu = "string", ac = "string", ixp_den = "string", popis = "string", up_stav = "number", ginsesu_esu_txt = "string", pokcups_up_stav_txt = "string", s_tis = "number", pokdpep_vs = "string", c_celkem = "JsonDecimal", dat_vyst = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSprPoplatkyROBDtoTypeLengths { ixs_byd = 12, ixp = 12, lic = 4, ixs_esu = 12, ac = 20, ixp_den = 12, popis = 254, ginsesu_esu_txt = 254, pokcups_up_stav_txt = 254, pokdpep_vs = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GSyncRobROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro ynchromizaci s Rob*/
	interface GSyncRobROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Agenda*/
		agenda?: string|null;
		/**Důvod přístupu*/
		duvod?: string|null;
		/**Role*/
		agendova_role?: string|null;
		/**Status*/
		status?: string|null;
		/**Popis*/
		popis?: string|null;
		/**Osoba*/
		HledanyOsoba?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Bydliště*/
		HledanyBydliste?: Gordic.Rob.Interface.GOsobaBydlisteROBDto|null;
		/**Průkaz*/
		HledanyPrukaz?: Gordic.Rob.Interface.GOsobaPrukazROBDto|null;
		/**Osoba*/
		VROBOsoba?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Bydliště*/
		VROBBydliste?: Gordic.Rob.Interface.GOsobaBydlisteROBDto|null;
		/**Číslo průkazu*/
		vROBDokladCislo?: string|null;
		/**Hledat dle adresy*/
		dleAdresy?: boolean|null;
		/**Hledat s diakritikou*/
		diakritika?: boolean|null;
		/**Datum úmrtí*/
		vROBDatUmr?: JsonDate|null;
		/**Místo úmrtí*/
		vROBMistoUmr?: string|null;
		/**Kód státu úmrtí*/
		vROBStatKodUmr?: number|null;
		/**Doručovací adresa*/
		vROBDorucAdresaRuian?: number|null;
		/**Doručovací adresa ostatní*/
		vROBDorucAdresaOstatniRuian?: string|null;
		/**Doručovací adresa datum od*/
		vROBDatOdDorucAdr?: JsonDate|null;
	}
	const enum GSyncRobROBDtoNames { agenda = "agenda", duvod = "duvod", agendova_role = "agendova_role", status = "status", popis = "popis", HledanyOsoba = "HledanyOsoba", HledanyBydliste = "HledanyBydliste", HledanyPrukaz = "HledanyPrukaz", VROBOsoba = "VROBOsoba", VROBBydliste = "VROBBydliste", vROBDokladCislo = "vROBDokladCislo", dleAdresy = "dleAdresy", diakritika = "diakritika", vROBDatUmr = "vROBDatUmr", vROBMistoUmr = "vROBMistoUmr", vROBStatKodUmr = "vROBStatKodUmr", vROBDorucAdresaRuian = "vROBDorucAdresaRuian", vROBDorucAdresaOstatniRuian = "vROBDorucAdresaOstatniRuian", vROBDatOdDorucAdr = "vROBDatOdDorucAdr", Permissions = "Permissions",}
	const enum GSyncRobROBDtoFragments { agenda = "Base", duvod = "Base", agendova_role = "Base", status = "Base", popis = "Base", HledanyOsoba = "Base", HledanyBydliste = "Base", HledanyPrukaz = "Base", VROBOsoba = "Base", VROBBydliste = "Base", vROBDokladCislo = "Base", dleAdresy = "Base", diakritika = "Base", vROBDatUmr = "Base", vROBMistoUmr = "Base", vROBStatKodUmr = "Base", vROBDorucAdresaRuian = "Base", vROBDorucAdresaOstatniRuian = "Base", vROBDatOdDorucAdr = "Base", Permissions = "*",}
	const enum GSyncRobROBDtoTypes { agenda = "string", duvod = "string", agendova_role = "string", status = "string", popis = "string", HledanyOsoba = "Gordic.Rob.Interface.GOsoba1ROBDto", HledanyBydliste = "Gordic.Rob.Interface.GOsobaBydlisteROBDto", HledanyPrukaz = "Gordic.Rob.Interface.GOsobaPrukazROBDto", VROBOsoba = "Gordic.Rob.Interface.GOsoba1ROBDto", VROBBydliste = "Gordic.Rob.Interface.GOsobaBydlisteROBDto", vROBDokladCislo = "string", dleAdresy = "boolean", diakritika = "boolean", vROBDatUmr = "JsonDate", vROBMistoUmr = "string", vROBStatKodUmr = "number", vROBDorucAdresaRuian = "number", vROBDorucAdresaOstatniRuian = "string", vROBDatOdDorucAdr = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSyncRobROBDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GSyncROBvsESUROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Rob vs ESU*/
	interface GSyncROBvsESUROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Vazební identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**Okres narození*/
		okres_naroz?: string|null;
		/**Identifikátr adresy objektu*/
		ixs_adr?: string|null;
		/**Blok domu*/
		blok_domu?: string|null;
		/**Vchod*/
		vchod?: string|null;
		/**Byt*/
		byt?: string|null;
		/**Identifikátor objektu*/
		ixs_ido?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Okres*/
		okres?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Část obce*/
		castobce?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Druh čísla domovního*/
		dcd?: string|null;
		/**Poštovní směrovací číslo*/
		psc?: string|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Pohlaví textově*/
		pohlavi_txt?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**rc_lomitko*/
		rc_lomitko?: string|null;
		/**dcd_zobraz*/
		dcd_zobraz?: string|null;
		/**Stav záznamu*/
		stav_zaznamu?: string|null;
		/**Ročník*/
		rocnik?: number|null;
		/**Řazení*/
		razeni?: string|null;
	}
	const enum GSyncROBvsESUROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", mistonar = "mistonar", okres_naroz = "okres_naroz", ixs_adr = "ixs_adr", blok_domu = "blok_domu", vchod = "vchod", byt = "byt", ixs_ido = "ixs_ido", obec = "obec", okres = "okres", ulice = "ulice", cd = "cd", castobce = "castobce", cor = "cor", pcor = "pcor", dcd = "dcd", psc = "psc", typ_pobytu_txt = "typ_pobytu_txt", pohlavi_txt = "pohlavi_txt", dat_od = "dat_od", ixs_esu = "ixs_esu", rc_lomitko = "rc_lomitko", dcd_zobraz = "dcd_zobraz", stav_zaznamu = "stav_zaznamu", rocnik = "rocnik", razeni = "razeni", Permissions = "Permissions",}
	const enum GSyncROBvsESUROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", mistonar = "Base", okres_naroz = "Base", ixs_adr = "Base", blok_domu = "Base", vchod = "Base", byt = "Base", ixs_ido = "Base", obec = "Base", okres = "Base", ulice = "Base", cd = "Base", castobce = "Base", cor = "Base", pcor = "Base", dcd = "Base", psc = "Base", typ_pobytu_txt = "Base", pohlavi_txt = "Base", dat_od = "Base", ixs_esu = "Base", rc_lomitko = "Base", dcd_zobraz = "Base", stav_zaznamu = "Base", rocnik = "Base", razeni = "Base", Permissions = "*",}
	const enum GSyncROBvsESUROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", mistonar = "string", okres_naroz = "string", ixs_adr = "string", blok_domu = "string", vchod = "string", byt = "string", ixs_ido = "string", obec = "string", okres = "string", ulice = "string", cd = "number", castobce = "string", cor = "number", pcor = "string", dcd = "string", psc = "string", typ_pobytu_txt = "string", pohlavi_txt = "string", dat_od = "JsonDate", ixs_esu = "string", rc_lomitko = "string", dcd_zobraz = "string", stav_zaznamu = "string", rocnik = "number", razeni = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSyncROBvsESUROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, okres_naroz = 48, ixs_adr = 12, blok_domu = 8, vchod = 5, byt = 5, ixs_ido = 12, obec = 48, okres = 48, ulice = 48, castobce = 48, pcor = 1, dcd = 1, psc = 12, ixs_esu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GSzrsadrDsROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**GSzrsadrDsROBDto*/
	interface GSzrsadrDsROBDto extends Gordic.Rob.Interface.GSzrsadrDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Název obce*/
		obec_nazev?: string|null;
		/**Název části obce*/
		cast_obce_nazev?: string|null;
		/**Název ulice*/
		ulice_nazev?: string|null;
		/**Název okresu*/
		okres_nazev?: string|null;
		/**Název pošty*/
		posta_nazev?: string|null;
		/**Typ čísla domovního textově*/
		typ_cis_dom_kod_txt?: string|null;
	}
	const enum GSzrsadrDsROBDtoNames { Zmena = "Zmena", obec_nazev = "obec_nazev", cast_obce_nazev = "cast_obce_nazev", ulice_nazev = "ulice_nazev", okres_nazev = "okres_nazev", posta_nazev = "posta_nazev", typ_cis_dom_kod_txt = "typ_cis_dom_kod_txt", adresni_misto_kod = "adresni_misto_kod", okres_kod = "okres_kod", obec_kod = "obec_kod", cast_obce_kod = "cast_obce_kod", ulice_kod = "ulice_kod", posta_kod = "posta_kod", staveb_objekt_kod = "staveb_objekt_kod", typ_cis_dom_kod = "typ_cis_dom_kod", cislo_domovni = "cislo_domovni", cislo_orientacni = "cislo_orientacni", cislo_or_pismeno = "cislo_or_pismeno", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cpop = "cpop", cor = "cor", dat_od = "dat_od", dat_do = "dat_do", vo_kod = "vo_kod", Permissions = "Permissions",}
	const enum GSzrsadrDsROBDtoFragments { Zmena = "ZMENA", obec_nazev = "Extended", cast_obce_nazev = "Extended", ulice_nazev = "Extended", okres_nazev = "Extended", posta_nazev = "Extended", typ_cis_dom_kod_txt = "Extended", adresni_misto_kod = "Base", okres_kod = "Base", obec_kod = "Base", cast_obce_kod = "Base", ulice_kod = "Base", posta_kod = "Base", staveb_objekt_kod = "Base", typ_cis_dom_kod = "Base", cislo_domovni = "Base", cislo_orientacni = "Base", cislo_or_pismeno = "Base", cas_odpovedi = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cpop = "Base", cor = "Base", dat_od = "Base", dat_do = "Base", vo_kod = "Base", Permissions = "*",}
	const enum GSzrsadrDsROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", obec_nazev = "string", cast_obce_nazev = "string", ulice_nazev = "string", okres_nazev = "string", posta_nazev = "string", typ_cis_dom_kod_txt = "string", adresni_misto_kod = "number", okres_kod = "number", obec_kod = "number", cast_obce_kod = "number", ulice_kod = "number", posta_kod = "number", staveb_objekt_kod = "number", typ_cis_dom_kod = "number", cislo_domovni = "number", cislo_orientacni = "number", cislo_or_pismeno = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cpop = "string", cor = "string", dat_od = "JsonDate", dat_do = "JsonDate", vo_kod = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSzrsadrDsROBDtoTypeLengths { cislo_or_pismeno = 1, zmenu_prov = 12, cpop = 8, cor = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GSZRSROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro GSZRSROB*/
	interface GSZRSROBDto extends Gordic.Rob.Interface.GSzrsrobDto {
	}
	const enum GSZRSROBDtoNames { aifo = "aifo", adresni_misto_kod = "adresni_misto_kod", stav_adr_pobytu = "stav_adr_pobytu", datum_narozeni = "datum_narozeni", datum_umrti = "datum_umrti", dat_prav_moc_umrti = "dat_prav_moc_umrti", jmeno = "jmeno", prijmeni = "prijmeni", prihlaseni_zmen = "prihlaseni_zmen", stav_doruc_adr = "stav_doruc_adr", doruc_adr_cr = "doruc_adr_cr", doruc_adr_ostatni = "doruc_adr_ostatni", stav_misto_naroz = "stav_misto_naroz", misto_naroz_cr = "misto_naroz_cr", misto_naroz_svet = "misto_naroz_svet", stav_misto_umrti = "stav_misto_umrti", misto_umrti_cr = "misto_umrti_cr", misto_umrti_svet = "misto_umrti_svet", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ovm = "ovm", ais = "ais", agenda = "agenda", stat_kod_naroz = "stat_kod_naroz", stat_kod_umrti = "stat_kod_umrti", id_ds = "id_ds", dat_akt = "dat_akt", misto_nar_obec = "misto_nar_obec", misto_umr_obec = "misto_umr_obec", stav_aifo = "stav_aifo", stav_id_ds = "stav_id_ds", stav_datum_naroz = "stav_datum_naroz", stav_datum_umrti = "stav_datum_umrti", stav_dat_pra_umr = "stav_dat_pra_umr", stav_jmeno = "stav_jmeno", stav_prijmeni = "stav_prijmeni", zmn_aifo = "zmn_aifo", zmn_adr_pobytu = "zmn_adr_pobytu", zmn_doruc_adr = "zmn_doruc_adr", zmn_misto_naroz = "zmn_misto_naroz", zmn_misto_umrti = "zmn_misto_umrti", zmn_id_ds = "zmn_id_ds", zmn_datum_naroz = "zmn_datum_naroz", zmn_datum_umrti = "zmn_datum_umrti", zmn_dat_pra_umr = "zmn_dat_pra_umr", zmn_jmeno = "zmn_jmeno", zmn_prijmeni = "zmn_prijmeni", adresa_uradu = "adresa_uradu", email = "email", zmn_email = "zmn_email", omezeni_svp = "omezeni_svp", zmn_omezeni_svp = "zmn_omezeni_svp", pohlavi = "pohlavi", zmn_pohlavi = "zmn_pohlavi", rod_par_stav = "rod_par_stav", zmn_rod_par_stav = "zmn_rod_par_stav", rod_prijmeni = "rod_prijmeni", zmn_rod_prijmeni = "zmn_rod_prijmeni", telefon = "telefon", zmn_telefon = "zmn_telefon", stav_email = "stav_email", stav_omezeni_svp = "stav_omezeni_svp", stav_pohlavi = "stav_pohlavi", stav_rod_par_stav = "stav_rod_par_stav", stav_rod_prijmeni = "stav_rod_prijmeni", stav_telefon = "stav_telefon", Permissions = "Permissions",}
	const enum GSZRSROBDtoFragments { aifo = "Base", adresni_misto_kod = "Base", stav_adr_pobytu = "Base", datum_narozeni = "Base", datum_umrti = "Base", dat_prav_moc_umrti = "Base", jmeno = "Base", prijmeni = "Base", prihlaseni_zmen = "Base", stav_doruc_adr = "Base", doruc_adr_cr = "Base", doruc_adr_ostatni = "Base", stav_misto_naroz = "Base", misto_naroz_cr = "Base", misto_naroz_svet = "Base", stav_misto_umrti = "Base", misto_umrti_cr = "Base", misto_umrti_svet = "Base", cas_odpovedi = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ovm = "Base", ais = "Base", agenda = "Base", stat_kod_naroz = "Base", stat_kod_umrti = "Base", id_ds = "Base", dat_akt = "Base", misto_nar_obec = "Base", misto_umr_obec = "Base", stav_aifo = "Base", stav_id_ds = "Base", stav_datum_naroz = "Base", stav_datum_umrti = "Base", stav_dat_pra_umr = "Base", stav_jmeno = "Base", stav_prijmeni = "Base", zmn_aifo = "Base", zmn_adr_pobytu = "Base", zmn_doruc_adr = "Base", zmn_misto_naroz = "Base", zmn_misto_umrti = "Base", zmn_id_ds = "Base", zmn_datum_naroz = "Base", zmn_datum_umrti = "Base", zmn_dat_pra_umr = "Base", zmn_jmeno = "Base", zmn_prijmeni = "Base", adresa_uradu = "Base", email = "Base", zmn_email = "Base", omezeni_svp = "Base", zmn_omezeni_svp = "Base", pohlavi = "Base", zmn_pohlavi = "Base", rod_par_stav = "Base", zmn_rod_par_stav = "Base", rod_prijmeni = "Base", zmn_rod_prijmeni = "Base", telefon = "Base", zmn_telefon = "Base", stav_email = "Base", stav_omezeni_svp = "Base", stav_pohlavi = "Base", stav_rod_par_stav = "Base", stav_rod_prijmeni = "Base", stav_telefon = "Base", Permissions = "*",}
	const enum GSZRSROBDtoTypes { aifo = "string", adresni_misto_kod = "number", stav_adr_pobytu = "number", datum_narozeni = "JsonDate", datum_umrti = "JsonDate", dat_prav_moc_umrti = "JsonDate", jmeno = "string", prijmeni = "string", prihlaseni_zmen = "number", stav_doruc_adr = "number", doruc_adr_cr = "number", doruc_adr_ostatni = "string", stav_misto_naroz = "number", misto_naroz_cr = "number", misto_naroz_svet = "string", stav_misto_umrti = "number", misto_umrti_cr = "number", misto_umrti_svet = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ovm = "string", ais = "number", agenda = "string", stat_kod_naroz = "number", stat_kod_umrti = "number", id_ds = "string", dat_akt = "JsonDate", misto_nar_obec = "number", misto_umr_obec = "number", stav_aifo = "number", stav_id_ds = "number", stav_datum_naroz = "number", stav_datum_umrti = "number", stav_dat_pra_umr = "number", stav_jmeno = "number", stav_prijmeni = "number", zmn_aifo = "JsonDate", zmn_adr_pobytu = "JsonDate", zmn_doruc_adr = "JsonDate", zmn_misto_naroz = "JsonDate", zmn_misto_umrti = "JsonDate", zmn_id_ds = "JsonDate", zmn_datum_naroz = "JsonDate", zmn_datum_umrti = "JsonDate", zmn_dat_pra_umr = "JsonDate", zmn_jmeno = "JsonDate", zmn_prijmeni = "JsonDate", adresa_uradu = "number", email = "string", zmn_email = "JsonDate", omezeni_svp = "number", zmn_omezeni_svp = "JsonDate", pohlavi = "number", zmn_pohlavi = "JsonDate", rod_par_stav = "number", zmn_rod_par_stav = "JsonDate", rod_prijmeni = "string", zmn_rod_prijmeni = "JsonDate", telefon = "string", zmn_telefon = "JsonDate", stav_email = "number", stav_omezeni_svp = "number", stav_pohlavi = "number", stav_rod_par_stav = "number", stav_rod_prijmeni = "number", stav_telefon = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GSZRSROBDtoTypeLengths { aifo = 24, jmeno = 100, prijmeni = 100, doruc_adr_ostatni = 255, misto_naroz_svet = 100, misto_umrti_svet = 100, zmenu_prov = 12, ovm = 36, agenda = 15, id_ds = 100, email = 100, rod_prijmeni = 100, telefon = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GTiskParamsKartaRobDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro parametry tisku karty občana*/
	interface GTiskParamsKartaRobDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**rob_rad_uzd*/
		rob_rad_uzd?: string|null;
		/**Parametry tisku RT*/
		parametryTiskRT?: string|null;
	}
	const enum GTiskParamsKartaRobDtoNames { ixs_oso = "ixs_oso", rob_rad_uzd = "rob_rad_uzd", parametryTiskRT = "parametryTiskRT",}
	const enum GTiskParamsKartaRobDtoFragments { ixs_oso = "*", rob_rad_uzd = "*", parametryTiskRT = "*",}
	const enum GTiskParamsKartaRobDtoTypes { ixs_oso = "string", rob_rad_uzd = "string", parametryTiskRT = "string",}
	const enum GTiskParamsKartaRobDtoTypeLengths {}
	/**Dto pro parametry tisku formulářů*/
	interface GTiskParamsFormulareRobDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Psč*/
		psc?: string|null;
		/**Pošta*/
		posta?: string|null;
		/**Název úřadu*/
		nazev_uradu?: string|null;
		/**Vedoucí odboru*/
		vedouci?: string|null;
		/**Sídlo úřadu*/
		sidlo?: string|null;
		/**?*/
		v_e?: string|null;
		/**Název referenta*/
		nazev_ref?: string|null;
	}
	const enum GTiskParamsFormulareRobDtoNames { ixs_oso = "ixs_oso", psc = "psc", posta = "posta", nazev_uradu = "nazev_uradu", vedouci = "vedouci", sidlo = "sidlo", v_e = "v_e", nazev_ref = "nazev_ref",}
	const enum GTiskParamsFormulareRobDtoFragments { ixs_oso = "*", psc = "*", posta = "*", nazev_uradu = "*", vedouci = "*", sidlo = "*", v_e = "*", nazev_ref = "*",}
	const enum GTiskParamsFormulareRobDtoTypes { ixs_oso = "string", psc = "string", posta = "string", nazev_uradu = "string", vedouci = "string", sidlo = "string", v_e = "string", nazev_ref = "string",}
	const enum GTiskParamsFormulareRobDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GTypJmenaROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Typ dalšího jména*/
	interface GTypJmenaROBDto extends Gordic.Rob.Interface.GRobcjmeDto {
	}
	const enum GTypJmenaROBDtoNames { typ_jme = "typ_jme", typ_jme_txt = "typ_jme_txt", k_v = "k_v", k_s = "k_s", Permissions = "Permissions",}
	const enum GTypJmenaROBDtoFragments { typ_jme = "Base", typ_jme_txt = "Base", k_v = "Base", k_s = "Base", Permissions = "*",}
	const enum GTypJmenaROBDtoTypes { typ_jme = "number", typ_jme_txt = "string", k_v = "number", k_s = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GTypJmenaROBDtoTypeLengths { typ_jme_txt = 50, k_s = 15,}
	/**ENUM:robcjme*/
	const enum GTypJmenaROBEnum {
		/**neurčeno*/
		_0=0,
		/**jméno (současné)*/
		_1=1,
		/**druhé současné jméno*/
		_2=2,
		/**předchozí jméno 1 (poslední před souč. jménem)*/
		_3=3,
		/**předchozí jméno 2*/
		_4=4,
		/**předchozí jméno 3*/
		_5=5,
		/**předchozí jméno 4*/
		_6=6,
		/**předchozí jméno 5*/
		_7=7,
		/**předchozí jméno 6*/
		_8=8,
		/**předchozí jméno 7 (nejstarší)*/
		_9=9,
	}
	function GTypJmenaROBEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GTypJmenaROBEnum, Gordic.Rob.Interface.GTypJmenaROBDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdajeIseoROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdprn
	*      Dto pro předávání údajů z ISEO
	*/
	interface GUdajeIseoROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**AIFO*/
		aifo?: string|null;
		/**Rodné číslo*/
		rodneCislo?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodnePrijmeni?: string|null;
		/**Datum narození*/
		datumNarozeni?: JsonDate|null;
		/**Místo narození*/
		mistoNarozeni?: string|null;
		/**Okrsek narození*/
		okrsekNarozeni?: string|null;
		/**Stát narození*/
		statNarozeni?: number|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Rodinný stav*/
		rodStav?: number|null;
		/**Typ pobytu*/
		typPobytu?: number|null;
		/**Datum pobytu od*/
		datumPobytuOd?: JsonDate|null;
		/**Okres*/
		okres?: string|null;
		/**Obec*/
		obec?: string|null;
		/**PSČ*/
		PSC?: string|null;
		/**Stát pobytu*/
		stat?: number|null;
		/**Městská část*/
		mCast?: string|null;
		/**P. obvod*/
		pObvod?: string|null;
		/**Část obce*/
		castObce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo orientační*/
		cisloOr?: string|null;
		/**Písmeno čísla orientačního*/
		pismenoCisloOr?: string|null;
		/**Číslo domu*/
		cisloDomu?: string|null;
		/**Typ čísla domu*/
		typCislaDomu?: number|null;
		/**Stát občanství*/
		statObc?: number|null;
		/**Svéprávnost*/
		svepravnost?: number|null;
		/**Otec*/
		otec?: Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto|null;
		/**Matka*/
		matka?: Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto|null;
		/**Partner*/
		partner?: Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto|null;
		/**Děti*/
		deti?: Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto[]|null;
		/**Osoba v Iseo*/
		OsobaVIseo?: Gordic.Rob.Interface.GUdajeIseoROBDto|null;
	}
	const enum GUdajeIseoROBDtoNames { aifo = "aifo", rodneCislo = "rodneCislo", prijmeni = "prijmeni", jmeno = "jmeno", rodnePrijmeni = "rodnePrijmeni", datumNarozeni = "datumNarozeni", mistoNarozeni = "mistoNarozeni", okrsekNarozeni = "okrsekNarozeni", statNarozeni = "statNarozeni", pohlavi = "pohlavi", rodStav = "rodStav", typPobytu = "typPobytu", datumPobytuOd = "datumPobytuOd", okres = "okres", obec = "obec", PSC = "PSC", stat = "stat", mCast = "mCast", pObvod = "pObvod", castObce = "castObce", ulice = "ulice", cisloOr = "cisloOr", pismenoCisloOr = "pismenoCisloOr", cisloDomu = "cisloDomu", typCislaDomu = "typCislaDomu", statObc = "statObc", svepravnost = "svepravnost", otec = "otec", matka = "matka", partner = "partner", deti = "deti", OsobaVIseo = "OsobaVIseo", Permissions = "Permissions",}
	const enum GUdajeIseoROBDtoFragments { aifo = "Base", rodneCislo = "Base", prijmeni = "Base", jmeno = "Base", rodnePrijmeni = "Base", datumNarozeni = "Base", mistoNarozeni = "Base", okrsekNarozeni = "Base", statNarozeni = "Base", pohlavi = "Base", rodStav = "Base", typPobytu = "Base", datumPobytuOd = "Base", okres = "Base", obec = "Base", PSC = "Base", stat = "Base", mCast = "Base", pObvod = "Base", castObce = "Base", ulice = "Base", cisloOr = "Base", pismenoCisloOr = "Base", cisloDomu = "Base", typCislaDomu = "Base", statObc = "Base", svepravnost = "Base", otec = "Base", matka = "Base", partner = "Base", deti = "Base", OsobaVIseo = "Base", Permissions = "*",}
	const enum GUdajeIseoROBDtoTypes { aifo = "string", rodneCislo = "string", prijmeni = "string", jmeno = "string", rodnePrijmeni = "string", datumNarozeni = "JsonDate", mistoNarozeni = "string", okrsekNarozeni = "string", statNarozeni = "number", pohlavi = "number", rodStav = "number", typPobytu = "number", datumPobytuOd = "JsonDate", okres = "string", obec = "string", PSC = "string", stat = "number", mCast = "string", pObvod = "string", castObce = "string", ulice = "string", cisloOr = "string", pismenoCisloOr = "string", cisloDomu = "string", typCislaDomu = "number", statObc = "number", svepravnost = "number", otec = "Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto", matka = "Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto", partner = "Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto", deti = "Gordic.Rob.Interface.GUdajeIseoRodPrislROBDto[]", OsobaVIseo = "Gordic.Rob.Interface.GUdajeIseoROBDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdajeIseoROBDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdajeIseoRodPrislROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robdprn
	*      Dto pro rodinné příslušníky v údajích z ISEO
	*/
	interface GUdajeIseoRodPrislROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Chyba*/
		chyba?: boolean|null;
		/**ROB / AISEO*/
		registr?: string|null;
	}
	const enum GUdajeIseoRodPrislROBDtoNames { rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", chyba = "chyba", registr = "registr", Permissions = "Permissions",}
	const enum GUdajeIseoRodPrislROBDtoFragments { rc = "Base", prijmeni = "Base", jmeno = "Base", chyba = "Base", registr = "Base", Permissions = "*",}
	const enum GUdajeIseoRodPrislROBDtoTypes { rc = "string", prijmeni = "string", jmeno = "string", chyba = "boolean", registr = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdajeIseoRodPrislROBDtoTypeLengths { rc = 10, prijmeni = 100, jmeno = 100, registr = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdalostOvdoveniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro událost ovdovění*/
	interface GUdalostOvdoveniROBDto extends Gordic.Rob.Interface.GUdalostROBDto {
		/**Osoba1*/
		Osoba1?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Osoba2*/
		Osoba2?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Partnerstí true, manželství false*/
		partnerstvi?: boolean|null;
	}
	const enum GUdalostOvdoveniROBDtoNames { Osoba1 = "Osoba1", Osoba2 = "Osoba2", partnerstvi = "partnerstvi", Zmena = "Zmena", PoznamkyUmrti = "PoznamkyUmrti", ucastnik = "ucastnik", ucastnik2 = "ucastnik2", ixs_oso = "ixs_oso", typ_ucast = "typ_ucast", ixs_uda = "ixs_uda", typ_uda = "typ_uda", typ_ag = "typ_ag", rocnik = "rocnik", strana = "strana", dat_zap_eo = "dat_zap_eo", dat_uda = "dat_uda", misto_uda = "misto_uda", stat_uda = "stat_uda", vyrok = "vyrok", cj_rozh = "cj_rozh", dat_prav_moc = "dat_prav_moc", s_platny = "s_platny", s_podpis = "s_podpis", s_oznameni = "s_oznameni", s_znak_dite = "s_znak_dite", dat_souhlas = "dat_souhlas", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", misto_uda_boz = "misto_uda_boz", poznamka = "poznamka", ixs_sta = "ixs_sta", schvaleno = "schvaleno", uca_nez = "uca_nez", cj_rozh_n = "cj_rozh_n", dat_ze_dne_n = "dat_ze_dne_n", dat_prm_n = "dat_prm_n", vydal_n = "vydal_n", popis_uda = "popis_uda", dat_uda_pod = "dat_uda_pod", s_neurceno = "s_neurceno", popis_dat_uda = "popis_dat_uda", s_prevzit = "s_prevzit", stav_prevzeti = "stav_prevzeti", s_overeno = "s_overeno", dat_overeni = "dat_overeni", popis_overeni = "popis_overeni", s_op = "s_op", dat_platnost_op = "dat_platnost_op", dat_vydani = "dat_vydani", popis_vydani = "popis_vydani", s_cd = "s_cd", dat_platnost_cd = "dat_platnost_cd", s_zapis = "s_zapis", dat_zapis = "dat_zapis", popis_zapis = "popis_zapis", cislo_cp = "cislo_cp", cislo_op = "cislo_op", cas_svatby = "cas_svatby", ixp_spis = "ixp_spis", okres_uda = "okres_uda", svazek = "svazek", dat_iseo = "dat_iseo", dat_rscp = "dat_rscp", dat_predani = "dat_predani", dat_podpis_uop = "dat_podpis_uop", dat_uda_txt = "dat_uda_txt", stat_uda_txt = "stat_uda_txt", dat_podpis = "dat_podpis", ico = "ico", dat_vydani_1 = "dat_vydani_1", popis_vydani_1 = "popis_vydani_1", dat_platnost_op_1 = "dat_platnost_op_1", s_op_1 = "s_op_1", cislo_op_1 = "cislo_op_1", Permissions = "Permissions",}
	const enum GUdalostOvdoveniROBDtoFragments { Osoba1 = "OSOBA2", Osoba2 = "OSOBA2", partnerstvi = "*", Zmena = "ZMENA", PoznamkyUmrti = "POZNAMKY", ucastnik = "Ucastnik", ucastnik2 = "Ucastnik2", ixs_oso = "Extended", typ_ucast = "Extended", ixs_uda = "Base", typ_uda = "Base", typ_ag = "Base", rocnik = "Base", strana = "Base", dat_zap_eo = "Base", dat_uda = "Base", misto_uda = "Base", stat_uda = "Base", vyrok = "Base", cj_rozh = "Base", dat_prav_moc = "Base", s_platny = "Base", s_podpis = "Base", s_oznameni = "Base", s_znak_dite = "Base", dat_souhlas = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", misto_uda_boz = "Base", poznamka = "Base", ixs_sta = "Base", schvaleno = "Base", uca_nez = "Base", cj_rozh_n = "Base", dat_ze_dne_n = "Base", dat_prm_n = "Base", vydal_n = "Base", popis_uda = "Base", dat_uda_pod = "Base", s_neurceno = "Base", popis_dat_uda = "Base", s_prevzit = "Base", stav_prevzeti = "Base", s_overeno = "Base", dat_overeni = "Base", popis_overeni = "Base", s_op = "Base", dat_platnost_op = "Base", dat_vydani = "Base", popis_vydani = "Base", s_cd = "Base", dat_platnost_cd = "Base", s_zapis = "Base", dat_zapis = "Base", popis_zapis = "Base", cislo_cp = "Base", cislo_op = "Base", cas_svatby = "Base", ixp_spis = "Base", okres_uda = "Base", svazek = "Base", dat_iseo = "Base", dat_rscp = "Base", dat_predani = "Base", dat_podpis_uop = "Base", dat_uda_txt = "Base", stat_uda_txt = "Base", dat_podpis = "Base", ico = "Base", dat_vydani_1 = "Base", popis_vydani_1 = "Base", dat_platnost_op_1 = "Base", s_op_1 = "Base", cislo_op_1 = "Base", Permissions = "*",}
	const enum GUdalostOvdoveniROBDtoTypes { Osoba1 = "Gordic.Rob.Interface.GOsoba1ROBDto", Osoba2 = "Gordic.Rob.Interface.GOsoba1ROBDto", partnerstvi = "boolean", Zmena = "Gordic.Gin.Interface.GGinszmpDto", PoznamkyUmrti = "Gordic.Rob.Interface.GUdalostZaznamROBDto", ucastnik = "Gordic.Rob.Interface.GUdalostUcastnikROBDto", ucastnik2 = "Gordic.Rob.Interface.GUdalostUcastnikROBDto", ixs_oso = "string", typ_ucast = "number", ixs_uda = "string", typ_uda = "number", typ_ag = "number", rocnik = "number", strana = "number", dat_zap_eo = "JsonDate", dat_uda = "JsonDate", misto_uda = "string", stat_uda = "number", vyrok = "string", cj_rozh = "string", dat_prav_moc = "JsonDate", s_platny = "number", s_podpis = "number", s_oznameni = "number", s_znak_dite = "number", dat_souhlas = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", misto_uda_boz = "string", poznamka = "string", ixs_sta = "string", schvaleno = "number", uca_nez = "number", cj_rozh_n = "string", dat_ze_dne_n = "JsonDate", dat_prm_n = "JsonDate", vydal_n = "string", popis_uda = "string", dat_uda_pod = "JsonDate", s_neurceno = "number", popis_dat_uda = "string", s_prevzit = "number", stav_prevzeti = "number", s_overeno = "number", dat_overeni = "JsonDate", popis_overeni = "string", s_op = "number", dat_platnost_op = "JsonDate", dat_vydani = "JsonDate", popis_vydani = "string", s_cd = "number", dat_platnost_cd = "JsonDate", s_zapis = "number", dat_zapis = "JsonDate", popis_zapis = "string", cislo_cp = "string", cislo_op = "string", cas_svatby = "string", ixp_spis = "string", okres_uda = "string", svazek = "string", dat_iseo = "JsonDate", dat_rscp = "JsonDate", dat_predani = "JsonDate", dat_podpis_uop = "JsonDate", dat_uda_txt = "string", stat_uda_txt = "string", dat_podpis = "JsonDate", ico = "string", dat_vydani_1 = "JsonDate", popis_vydani_1 = "string", dat_platnost_op_1 = "JsonDate", s_op_1 = "number", cislo_op_1 = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdalostOvdoveniROBDtoTypeLengths { ixs_oso = 12, ixs_uda = 12, misto_uda = 100, vyrok = 50, cj_rozh = 100, zmenu_prov = 12, misto_uda_boz = 254, poznamka = 254, ixs_sta = 12, cj_rozh_n = 30, popis_uda = 100, cislo_cp = 30, cislo_op = 30, cislo_op_1 = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdalostROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Události*/
	interface GUdalostROBDto extends Gordic.Rob.Interface.GRobsudaDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**záznam k události*/
		PoznamkyUmrti?: Gordic.Rob.Interface.GUdalostZaznamROBDto|null;
		/**Účastník události*/
		ucastnik?: Gordic.Rob.Interface.GUdalostUcastnikROBDto|null;
		/**Účastník události 2*/
		ucastnik2?: Gordic.Rob.Interface.GUdalostUcastnikROBDto|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Typ účastníka*/
		typ_ucast?: number|null;
	}
	const enum GUdalostROBDtoNames { Zmena = "Zmena", PoznamkyUmrti = "PoznamkyUmrti", ucastnik = "ucastnik", ucastnik2 = "ucastnik2", ixs_oso = "ixs_oso", typ_ucast = "typ_ucast", ixs_uda = "ixs_uda", typ_uda = "typ_uda", typ_ag = "typ_ag", rocnik = "rocnik", strana = "strana", dat_zap_eo = "dat_zap_eo", dat_uda = "dat_uda", misto_uda = "misto_uda", stat_uda = "stat_uda", vyrok = "vyrok", cj_rozh = "cj_rozh", dat_prav_moc = "dat_prav_moc", s_platny = "s_platny", s_podpis = "s_podpis", s_oznameni = "s_oznameni", s_znak_dite = "s_znak_dite", dat_souhlas = "dat_souhlas", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", misto_uda_boz = "misto_uda_boz", poznamka = "poznamka", ixs_sta = "ixs_sta", schvaleno = "schvaleno", uca_nez = "uca_nez", cj_rozh_n = "cj_rozh_n", dat_ze_dne_n = "dat_ze_dne_n", dat_prm_n = "dat_prm_n", vydal_n = "vydal_n", popis_uda = "popis_uda", dat_uda_pod = "dat_uda_pod", s_neurceno = "s_neurceno", popis_dat_uda = "popis_dat_uda", s_prevzit = "s_prevzit", stav_prevzeti = "stav_prevzeti", s_overeno = "s_overeno", dat_overeni = "dat_overeni", popis_overeni = "popis_overeni", s_op = "s_op", dat_platnost_op = "dat_platnost_op", dat_vydani = "dat_vydani", popis_vydani = "popis_vydani", s_cd = "s_cd", dat_platnost_cd = "dat_platnost_cd", s_zapis = "s_zapis", dat_zapis = "dat_zapis", popis_zapis = "popis_zapis", cislo_cp = "cislo_cp", cislo_op = "cislo_op", cas_svatby = "cas_svatby", ixp_spis = "ixp_spis", okres_uda = "okres_uda", svazek = "svazek", dat_iseo = "dat_iseo", dat_rscp = "dat_rscp", dat_predani = "dat_predani", dat_podpis_uop = "dat_podpis_uop", dat_uda_txt = "dat_uda_txt", stat_uda_txt = "stat_uda_txt", dat_podpis = "dat_podpis", ico = "ico", dat_vydani_1 = "dat_vydani_1", popis_vydani_1 = "popis_vydani_1", dat_platnost_op_1 = "dat_platnost_op_1", s_op_1 = "s_op_1", cislo_op_1 = "cislo_op_1", Permissions = "Permissions",}
	const enum GUdalostROBDtoFragments { Zmena = "ZMENA", PoznamkyUmrti = "POZNAMKY", ucastnik = "Ucastnik", ucastnik2 = "Ucastnik2", ixs_oso = "Extended", typ_ucast = "Extended", ixs_uda = "Base", typ_uda = "Base", typ_ag = "Base", rocnik = "Base", strana = "Base", dat_zap_eo = "Base", dat_uda = "Base", misto_uda = "Base", stat_uda = "Base", vyrok = "Base", cj_rozh = "Base", dat_prav_moc = "Base", s_platny = "Base", s_podpis = "Base", s_oznameni = "Base", s_znak_dite = "Base", dat_souhlas = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", misto_uda_boz = "Base", poznamka = "Base", ixs_sta = "Base", schvaleno = "Base", uca_nez = "Base", cj_rozh_n = "Base", dat_ze_dne_n = "Base", dat_prm_n = "Base", vydal_n = "Base", popis_uda = "Base", dat_uda_pod = "Base", s_neurceno = "Base", popis_dat_uda = "Base", s_prevzit = "Base", stav_prevzeti = "Base", s_overeno = "Base", dat_overeni = "Base", popis_overeni = "Base", s_op = "Base", dat_platnost_op = "Base", dat_vydani = "Base", popis_vydani = "Base", s_cd = "Base", dat_platnost_cd = "Base", s_zapis = "Base", dat_zapis = "Base", popis_zapis = "Base", cislo_cp = "Base", cislo_op = "Base", cas_svatby = "Base", ixp_spis = "Base", okres_uda = "Base", svazek = "Base", dat_iseo = "Base", dat_rscp = "Base", dat_predani = "Base", dat_podpis_uop = "Base", dat_uda_txt = "Base", stat_uda_txt = "Base", dat_podpis = "Base", ico = "Base", dat_vydani_1 = "Base", popis_vydani_1 = "Base", dat_platnost_op_1 = "Base", s_op_1 = "Base", cislo_op_1 = "Base", Permissions = "*",}
	const enum GUdalostROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", PoznamkyUmrti = "Gordic.Rob.Interface.GUdalostZaznamROBDto", ucastnik = "Gordic.Rob.Interface.GUdalostUcastnikROBDto", ucastnik2 = "Gordic.Rob.Interface.GUdalostUcastnikROBDto", ixs_oso = "string", typ_ucast = "number", ixs_uda = "string", typ_uda = "number", typ_ag = "number", rocnik = "number", strana = "number", dat_zap_eo = "JsonDate", dat_uda = "JsonDate", misto_uda = "string", stat_uda = "number", vyrok = "string", cj_rozh = "string", dat_prav_moc = "JsonDate", s_platny = "number", s_podpis = "number", s_oznameni = "number", s_znak_dite = "number", dat_souhlas = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", misto_uda_boz = "string", poznamka = "string", ixs_sta = "string", schvaleno = "number", uca_nez = "number", cj_rozh_n = "string", dat_ze_dne_n = "JsonDate", dat_prm_n = "JsonDate", vydal_n = "string", popis_uda = "string", dat_uda_pod = "JsonDate", s_neurceno = "number", popis_dat_uda = "string", s_prevzit = "number", stav_prevzeti = "number", s_overeno = "number", dat_overeni = "JsonDate", popis_overeni = "string", s_op = "number", dat_platnost_op = "JsonDate", dat_vydani = "JsonDate", popis_vydani = "string", s_cd = "number", dat_platnost_cd = "JsonDate", s_zapis = "number", dat_zapis = "JsonDate", popis_zapis = "string", cislo_cp = "string", cislo_op = "string", cas_svatby = "JsonDate", ixp_spis = "number", okres_uda = "string", svazek = "number", dat_iseo = "JsonDate", dat_rscp = "JsonDate", dat_predani = "JsonDate", dat_podpis_uop = "JsonDate", dat_uda_txt = "string", stat_uda_txt = "string", dat_podpis = "JsonDate", ico = "string", dat_vydani_1 = "JsonDate", popis_vydani_1 = "string", dat_platnost_op_1 = "JsonDate", s_op_1 = "number", cislo_op_1 = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdalostROBDtoTypeLengths { ixs_oso = 12, ixs_uda = 12, misto_uda = 100, vyrok = 50, cj_rozh = 100, zmenu_prov = 12, misto_uda_boz = 254, poznamka = 254, ixs_sta = 12, cj_rozh_n = 30, popis_uda = 100, cislo_cp = 30, cislo_op = 30, cislo_op_1 = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdalostRozvodROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro událost rozvod*/
	interface GUdalostRozvodROBDto extends Gordic.Rob.Interface.GUdalostROBDto {
		/**Osoba1*/
		Osoba1?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Osoba2*/
		Osoba2?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Partnerstí true, manželství false*/
		partnerstvi?: boolean|null;
		/**Nové příjmení osoby1*/
		nov_prij_os1?: string|null;
		/**Nové příjmení osoby*/
		nov_prij_os2?: string|null;
	}
	const enum GUdalostRozvodROBDtoNames { Osoba1 = "Osoba1", Osoba2 = "Osoba2", partnerstvi = "partnerstvi", nov_prij_os1 = "nov_prij_os1", nov_prij_os2 = "nov_prij_os2", ixs_uda = "ixs_uda", typ_uda = "typ_uda", typ_ag = "typ_ag", rocnik = "rocnik", strana = "strana", dat_zap_eo = "dat_zap_eo", dat_uda = "dat_uda", misto_uda = "misto_uda", stat_uda = "stat_uda", vyrok = "vyrok", cj_rozh = "cj_rozh", dat_prav_moc = "dat_prav_moc", s_platny = "s_platny", s_podpis = "s_podpis", s_oznameni = "s_oznameni", s_znak_dite = "s_znak_dite", dat_souhlas = "dat_souhlas", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", misto_uda_boz = "misto_uda_boz", poznamka = "poznamka", ixs_sta = "ixs_sta", schvaleno = "schvaleno", uca_nez = "uca_nez", cj_rozh_n = "cj_rozh_n", dat_ze_dne_n = "dat_ze_dne_n", dat_prm_n = "dat_prm_n", vydal_n = "vydal_n", popis_uda = "popis_uda", dat_uda_pod = "dat_uda_pod", s_neurceno = "s_neurceno", popis_dat_uda = "popis_dat_uda", s_prevzit = "s_prevzit", stav_prevzeti = "stav_prevzeti", s_overeno = "s_overeno", dat_overeni = "dat_overeni", popis_overeni = "popis_overeni", s_op = "s_op", dat_platnost_op = "dat_platnost_op", dat_vydani = "dat_vydani", popis_vydani = "popis_vydani", s_cd = "s_cd", dat_platnost_cd = "dat_platnost_cd", s_zapis = "s_zapis", dat_zapis = "dat_zapis", popis_zapis = "popis_zapis", cislo_cp = "cislo_cp", cislo_op = "cislo_op", cas_svatby = "cas_svatby", ixp_spis = "ixp_spis", okres_uda = "okres_uda", svazek = "svazek", dat_iseo = "dat_iseo", dat_rscp = "dat_rscp", dat_predani = "dat_predani", dat_podpis_uop = "dat_podpis_uop", dat_uda_txt = "dat_uda_txt", stat_uda_txt = "stat_uda_txt", dat_podpis = "dat_podpis", ico = "ico", Zmena = "Zmena", PoznamkyUmrti = "PoznamkyUmrti", ucastnik = "ucastnik", ixs_oso = "ixs_oso", typ_ucast = "typ_ucast", Permissions = "Permissions",}
	const enum GUdalostRozvodROBDtoFragments { Osoba1 = "OSOBA2", Osoba2 = "OSOBA2", partnerstvi = "*", nov_prij_os1 = "*", nov_prij_os2 = "*", ixs_uda = "Base", typ_uda = "Base", typ_ag = "Base", rocnik = "Base", strana = "Base", dat_zap_eo = "Base", dat_uda = "Base", misto_uda = "Base", stat_uda = "Base", vyrok = "Base", cj_rozh = "Base", dat_prav_moc = "Base", s_platny = "Base", s_podpis = "Base", s_oznameni = "Base", s_znak_dite = "Base", dat_souhlas = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", misto_uda_boz = "Base", poznamka = "Base", ixs_sta = "Base", schvaleno = "Base", uca_nez = "Base", cj_rozh_n = "Base", dat_ze_dne_n = "Base", dat_prm_n = "Base", vydal_n = "Base", popis_uda = "Base", dat_uda_pod = "Base", s_neurceno = "Base", popis_dat_uda = "Base", s_prevzit = "Base", stav_prevzeti = "Base", s_overeno = "Base", dat_overeni = "Base", popis_overeni = "Base", s_op = "Base", dat_platnost_op = "Base", dat_vydani = "Base", popis_vydani = "Base", s_cd = "Base", dat_platnost_cd = "Base", s_zapis = "Base", dat_zapis = "Base", popis_zapis = "Base", cislo_cp = "Base", cislo_op = "Base", cas_svatby = "Base", ixp_spis = "Base", okres_uda = "Base", svazek = "Base", dat_iseo = "Base", dat_rscp = "Base", dat_predani = "Base", dat_podpis_uop = "Base", dat_uda_txt = "Base", stat_uda_txt = "Base", dat_podpis = "Base", ico = "Base", Zmena = "ZMENA", PoznamkyUmrti = "POZNAMKY", ucastnik = "Ucastnik", ixs_oso = "Extended", typ_ucast = "Extended", Permissions = "*",}
	const enum GUdalostRozvodROBDtoTypes { Osoba1 = "Gordic.Rob.Interface.GOsoba1ROBDto", Osoba2 = "Gordic.Rob.Interface.GOsoba1ROBDto", partnerstvi = "boolean", nov_prij_os1 = "string", nov_prij_os2 = "string", ixs_uda = "string", typ_uda = "number", typ_ag = "number", rocnik = "number", strana = "number", dat_zap_eo = "JsonDate", dat_uda = "JsonDate", misto_uda = "string", stat_uda = "number", vyrok = "string", cj_rozh = "string", dat_prav_moc = "JsonDate", s_platny = "number", s_podpis = "number", s_oznameni = "number", s_znak_dite = "number", dat_souhlas = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", misto_uda_boz = "string", poznamka = "string", ixs_sta = "string", schvaleno = "number", uca_nez = "number", cj_rozh_n = "string", dat_ze_dne_n = "JsonDate", dat_prm_n = "JsonDate", vydal_n = "string", popis_uda = "string", dat_uda_pod = "JsonDate", s_neurceno = "number", popis_dat_uda = "string", s_prevzit = "number", stav_prevzeti = "number", s_overeno = "number", dat_overeni = "JsonDate", popis_overeni = "string", s_op = "number", dat_platnost_op = "JsonDate", dat_vydani = "JsonDate", popis_vydani = "string", s_cd = "number", dat_platnost_cd = "JsonDate", s_zapis = "number", dat_zapis = "JsonDate", popis_zapis = "string", cislo_cp = "string", cislo_op = "string", cas_svatby = "string", ixp_spis = "string", okres_uda = "string", svazek = "string", dat_iseo = "JsonDate", dat_rscp = "JsonDate", dat_predani = "JsonDate", dat_podpis_uop = "JsonDate", dat_uda_txt = "string", stat_uda_txt = "string", dat_podpis = "JsonDate", ico = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", PoznamkyUmrti = "Gordic.Rob.Interface.GUdalostZaznamROBDto", ucastnik = "Gordic.Rob.Interface.GUdalostUcastnikROBDto", ixs_oso = "string", typ_ucast = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdalostRozvodROBDtoTypeLengths { ixs_uda = 12, misto_uda = 100, vyrok = 50, cj_rozh = 100, zmenu_prov = 12, misto_uda_boz = 254, poznamka = 254, ixs_sta = 12, cj_rozh_n = 30, vydal_n = 50, popis_uda = 50, popis_dat_uda = 50, popis_overeni = 100, popis_vydani = 100, popis_zapis = 100, cislo_cp = 20, cislo_op = 20, cas_svatby = 5, ixp_spis = 12, okres_uda = 50, svazek = 100, dat_uda_txt = 100, stat_uda_txt = 100, ico = 10, ixs_oso = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdalostSnatekROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro událost sňatek*/
	interface GUdalostSnatekROBDto extends Gordic.Rob.Interface.GUdalostROBDto {
		/**Osoba1*/
		Osoba1?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Osoba2*/
		Osoba2?: Gordic.Rob.Interface.GOsoba1ROBDto|null;
		/**Partnerstí true, manželství false*/
		partnerstvi?: boolean|null;
		/**Nové příjmení osoby1*/
		nov_prij_os1?: string|null;
		/**Nové příjmení osoby*/
		nov_prij_os2?: string|null;
	}
	const enum GUdalostSnatekROBDtoNames { Osoba1 = "Osoba1", Osoba2 = "Osoba2", partnerstvi = "partnerstvi", nov_prij_os1 = "nov_prij_os1", nov_prij_os2 = "nov_prij_os2", ixs_uda = "ixs_uda", typ_uda = "typ_uda", typ_ag = "typ_ag", rocnik = "rocnik", strana = "strana", dat_zap_eo = "dat_zap_eo", dat_uda = "dat_uda", misto_uda = "misto_uda", stat_uda = "stat_uda", vyrok = "vyrok", cj_rozh = "cj_rozh", dat_prav_moc = "dat_prav_moc", s_platny = "s_platny", s_podpis = "s_podpis", s_oznameni = "s_oznameni", s_znak_dite = "s_znak_dite", dat_souhlas = "dat_souhlas", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", misto_uda_boz = "misto_uda_boz", poznamka = "poznamka", ixs_sta = "ixs_sta", schvaleno = "schvaleno", uca_nez = "uca_nez", cj_rozh_n = "cj_rozh_n", dat_ze_dne_n = "dat_ze_dne_n", dat_prm_n = "dat_prm_n", vydal_n = "vydal_n", popis_uda = "popis_uda", dat_uda_pod = "dat_uda_pod", s_neurceno = "s_neurceno", popis_dat_uda = "popis_dat_uda", s_prevzit = "s_prevzit", stav_prevzeti = "stav_prevzeti", s_overeno = "s_overeno", dat_overeni = "dat_overeni", popis_overeni = "popis_overeni", s_op = "s_op", dat_platnost_op = "dat_platnost_op", dat_vydani = "dat_vydani", popis_vydani = "popis_vydani", s_cd = "s_cd", dat_platnost_cd = "dat_platnost_cd", s_zapis = "s_zapis", dat_zapis = "dat_zapis", popis_zapis = "popis_zapis", cislo_cp = "cislo_cp", cislo_op = "cislo_op", cas_svatby = "cas_svatby", ixp_spis = "ixp_spis", okres_uda = "okres_uda", svazek = "svazek", dat_iseo = "dat_iseo", dat_rscp = "dat_rscp", dat_predani = "dat_predani", dat_podpis_uop = "dat_podpis_uop", dat_uda_txt = "dat_uda_txt", stat_uda_txt = "stat_uda_txt", dat_podpis = "dat_podpis", ico = "ico", Zmena = "Zmena", PoznamkyUmrti = "PoznamkyUmrti", ucastnik = "ucastnik", ixs_oso = "ixs_oso", typ_ucast = "typ_ucast", Permissions = "Permissions",}
	const enum GUdalostSnatekROBDtoFragments { Osoba1 = "OSOBA2", Osoba2 = "OSOBA2", partnerstvi = "*", nov_prij_os1 = "*", nov_prij_os2 = "*", ixs_uda = "Base", typ_uda = "Base", typ_ag = "Base", rocnik = "Base", strana = "Base", dat_zap_eo = "Base", dat_uda = "Base", misto_uda = "Base", stat_uda = "Base", vyrok = "Base", cj_rozh = "Base", dat_prav_moc = "Base", s_platny = "Base", s_podpis = "Base", s_oznameni = "Base", s_znak_dite = "Base", dat_souhlas = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", misto_uda_boz = "Base", poznamka = "Base", ixs_sta = "Base", schvaleno = "Base", uca_nez = "Base", cj_rozh_n = "Base", dat_ze_dne_n = "Base", dat_prm_n = "Base", vydal_n = "Base", popis_uda = "Base", dat_uda_pod = "Base", s_neurceno = "Base", popis_dat_uda = "Base", s_prevzit = "Base", stav_prevzeti = "Base", s_overeno = "Base", dat_overeni = "Base", popis_overeni = "Base", s_op = "Base", dat_platnost_op = "Base", dat_vydani = "Base", popis_vydani = "Base", s_cd = "Base", dat_platnost_cd = "Base", s_zapis = "Base", dat_zapis = "Base", popis_zapis = "Base", cislo_cp = "Base", cislo_op = "Base", cas_svatby = "Base", ixp_spis = "Base", okres_uda = "Base", svazek = "Base", dat_iseo = "Base", dat_rscp = "Base", dat_predani = "Base", dat_podpis_uop = "Base", dat_uda_txt = "Base", stat_uda_txt = "Base", dat_podpis = "Base", ico = "Base", Zmena = "ZMENA", PoznamkyUmrti = "POZNAMKY", ucastnik = "Ucastnik", ixs_oso = "Extended", typ_ucast = "Extended", Permissions = "*",}
	const enum GUdalostSnatekROBDtoTypes { Osoba1 = "Gordic.Rob.Interface.GOsoba1ROBDto", Osoba2 = "Gordic.Rob.Interface.GOsoba1ROBDto", partnerstvi = "boolean", nov_prij_os1 = "string", nov_prij_os2 = "string", ixs_uda = "string", typ_uda = "number", typ_ag = "number", rocnik = "number", strana = "number", dat_zap_eo = "JsonDate", dat_uda = "JsonDate", misto_uda = "string", stat_uda = "number", vyrok = "string", cj_rozh = "string", dat_prav_moc = "JsonDate", s_platny = "number", s_podpis = "number", s_oznameni = "number", s_znak_dite = "number", dat_souhlas = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", misto_uda_boz = "string", poznamka = "string", ixs_sta = "string", schvaleno = "number", uca_nez = "number", cj_rozh_n = "string", dat_ze_dne_n = "JsonDate", dat_prm_n = "JsonDate", vydal_n = "string", popis_uda = "string", dat_uda_pod = "JsonDate", s_neurceno = "number", popis_dat_uda = "string", s_prevzit = "number", stav_prevzeti = "number", s_overeno = "number", dat_overeni = "JsonDate", popis_overeni = "string", s_op = "number", dat_platnost_op = "JsonDate", dat_vydani = "JsonDate", popis_vydani = "string", s_cd = "number", dat_platnost_cd = "JsonDate", s_zapis = "number", dat_zapis = "JsonDate", popis_zapis = "string", cislo_cp = "string", cislo_op = "string", cas_svatby = "string", ixp_spis = "string", okres_uda = "string", svazek = "string", dat_iseo = "JsonDate", dat_rscp = "JsonDate", dat_predani = "JsonDate", dat_podpis_uop = "JsonDate", dat_uda_txt = "string", stat_uda_txt = "string", dat_podpis = "JsonDate", ico = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", PoznamkyUmrti = "Gordic.Rob.Interface.GUdalostZaznamROBDto", ucastnik = "Gordic.Rob.Interface.GUdalostUcastnikROBDto", ixs_oso = "string", typ_ucast = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdalostSnatekROBDtoTypeLengths { ixs_uda = 12, misto_uda = 100, vyrok = 50, cj_rozh = 100, zmenu_prov = 12, misto_uda_boz = 254, poznamka = 254, ixs_sta = 12, cj_rozh_n = 30, vydal_n = 50, popis_uda = 50, popis_dat_uda = 50, popis_overeni = 100, popis_vydani = 100, popis_zapis = 100, cislo_cp = 20, cislo_op = 20, cas_svatby = 5, ixp_spis = 12, okres_uda = 50, svazek = 100, dat_uda_txt = 100, stat_uda_txt = 100, ico = 10, ixs_oso = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdalostUcastnikROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Účastník události*/
	interface GUdalostUcastnikROBDto extends Gordic.Rob.Interface.GRobdudaDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GUdalostUcastnikROBDtoNames { Zmena = "Zmena", ixs_uda = "ixs_uda", ucast = "ucast", por_cislo = "por_cislo", rc = "rc", kval_rc = "kval_rc", prijmeni = "prijmeni", nove_prijmeni = "nove_prijmeni", jmeno = "jmeno", nove_jmeno = "nove_jmeno", rod_prijmeni = "rod_prijmeni", titul_pred = "titul_pred", titul_za = "titul_za", dat_nar = "dat_nar", misto_nar = "misto_nar", stat_nar = "stat_nar", pohlavi = "pohlavi", rod_stav = "rod_stav", zamestnani = "zamestnani", stat_obcan = "stat_obcan", typ_pruk = "typ_pruk", cislo_pruk = "cislo_pruk", vydal_pruk = "vydal_pruk", dat_vyd_pruk = "dat_vyd_pruk", stat = "stat", okres = "okres", obec = "obec", p_obvod = "p_obvod", m_cast = "m_cast", cast_obce = "cast_obce", ulice = "ulice", cislo_domu = "cislo_domu", psc = "psc", jmeno_2pad = "jmeno_2pad", jmeno_7pad = "jmeno_7pad", ixs_oso = "ixs_oso", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", druhe_jmeno = "druhe_jmeno", druhe_prijmeni = "druhe_prijmeni", misto_nar_boz = "misto_nar_boz", rl_vydany = "rl_vydany", dat_vydani_rl = "dat_vydani_rl", rocnik_rl = "rocnik_rl", cislo_rl = "cislo_rl", dat_platnost_pruk = "dat_platnost_pruk", strana_rl = "strana_rl", nove_prijmeni_d = "nove_prijmeni_d", nove_jmeno_d = "nove_jmeno_d", okres_nar = "okres_nar", ixs_esu = "ixs_esu", dat_nar_text = "dat_nar_text", telefon = "telefon", dat_vyd_rozh = "dat_vyd_rozh", ixs_esu_soud = "ixs_esu_soud", dat_prav_moc = "dat_prav_moc", dat_lhuta = "dat_lhuta", cj_rozhodnuti = "cj_rozhodnuti", soud = "soud", dat_nar_txt = "dat_nar_txt", stat_nar_txt = "stat_nar_txt", pohlavi_txt = "pohlavi_txt", rod_stav_txt = "rod_stav_txt", stat_txt = "stat_txt", sveprav_over_dne = "sveprav_over_dne", ul_vydan_kym = "ul_vydan_kym", ul_vydan_dne = "ul_vydan_dne", prijmeni_muz_tvar = "prijmeni_muz_tvar", Permissions = "Permissions",}
	const enum GUdalostUcastnikROBDtoFragments { Zmena = "ZMENA", ixs_uda = "Base", ucast = "Base", por_cislo = "Base", rc = "Base", kval_rc = "Base", prijmeni = "Base", nove_prijmeni = "Base", jmeno = "Base", nove_jmeno = "Base", rod_prijmeni = "Base", titul_pred = "Base", titul_za = "Base", dat_nar = "Base", misto_nar = "Base", stat_nar = "Base", pohlavi = "Base", rod_stav = "Base", zamestnani = "Base", stat_obcan = "Base", typ_pruk = "Base", cislo_pruk = "Base", vydal_pruk = "Base", dat_vyd_pruk = "Base", stat = "Base", okres = "Base", obec = "Base", p_obvod = "Base", m_cast = "Base", cast_obce = "Base", ulice = "Base", cislo_domu = "Base", psc = "Base", jmeno_2pad = "Base", jmeno_7pad = "Base", ixs_oso = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", druhe_jmeno = "Base", druhe_prijmeni = "Base", misto_nar_boz = "Base", rl_vydany = "Base", dat_vydani_rl = "Base", rocnik_rl = "Base", cislo_rl = "Base", dat_platnost_pruk = "Base", strana_rl = "Base", nove_prijmeni_d = "Base", nove_jmeno_d = "Base", okres_nar = "Base", ixs_esu = "Base", dat_nar_text = "Base", telefon = "Base", dat_vyd_rozh = "Base", ixs_esu_soud = "Base", dat_prav_moc = "Base", dat_lhuta = "Base", cj_rozhodnuti = "Base", soud = "Base", dat_nar_txt = "Base", stat_nar_txt = "Base", pohlavi_txt = "Base", rod_stav_txt = "Base", stat_txt = "Base", sveprav_over_dne = "Base", ul_vydan_kym = "Base", ul_vydan_dne = "Base", prijmeni_muz_tvar = "Base", Permissions = "*",}
	const enum GUdalostUcastnikROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_uda = "string", ucast = "number", por_cislo = "number", rc = "string", kval_rc = "number", prijmeni = "string", nove_prijmeni = "string", jmeno = "string", nove_jmeno = "string", rod_prijmeni = "string", titul_pred = "string", titul_za = "string", dat_nar = "JsonDate", misto_nar = "string", stat_nar = "number", pohlavi = "number", rod_stav = "number", zamestnani = "string", stat_obcan = "string", typ_pruk = "number", cislo_pruk = "string", vydal_pruk = "string", dat_vyd_pruk = "JsonDate", stat = "number", okres = "string", obec = "string", p_obvod = "string", m_cast = "string", cast_obce = "string", ulice = "string", cislo_domu = "string", psc = "string", jmeno_2pad = "string", jmeno_7pad = "string", ixs_oso = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", druhe_jmeno = "string", druhe_prijmeni = "string", misto_nar_boz = "string", rl_vydany = "number", dat_vydani_rl = "JsonDate", rocnik_rl = "number", cislo_rl = "number", dat_platnost_pruk = "JsonDate", strana_rl = "string", nove_prijmeni_d = "string", nove_jmeno_d = "string", okres_nar = "number", ixs_esu = "number", dat_nar_text = "string", telefon = "string", dat_vyd_rozh = "JsonDate", ixs_esu_soud = "number", dat_prav_moc = "JsonDate", dat_lhuta = "JsonDate", cj_rozhodnuti = "string", soud = "string", dat_nar_txt = "string", stat_nar_txt = "string", pohlavi_txt = "string", rod_stav_txt = "string", stat_txt = "string", sveprav_over_dne = "JsonDate", ul_vydan_kym = "string", ul_vydan_dne = "JsonDate", prijmeni_muz_tvar = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdalostUcastnikROBDtoTypeLengths { ixs_uda = 12, rc = 100, prijmeni = 100, nove_prijmeni = 100, jmeno = 100, nove_jmeno = 100, rod_prijmeni = 100, titul_pred = 35, titul_za = 35, misto_nar = 48, zamestnani = 50, stat_obcan = 50, cislo_pruk = 254, vydal_pruk = 254, okres = 32, obec = 48, p_obvod = 48, m_cast = 48, cast_obce = 48, ulice = 48, cislo_domu = 48, psc = 48, jmeno_2pad = 100, jmeno_7pad = 100, zmenu_prov = 100, druhe_jmeno = 100, druhe_prijmeni = 100, misto_nar_boz = 48, strana_rl = 100, nove_prijmeni_d = 100, nove_jmeno_d = 100, dat_nar_text = 50, telefon = 100, cj_rozhodnuti = 100, soud = 50, dat_nar_txt = 50, stat_nar_txt = 50, pohlavi_txt = 50, rod_stav_txt = 50, stat_txt = 50, ul_vydan_kym = 50, prijmeni_muz_tvar = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GUdalostZaznamROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro záznamy k události (poznámky)*/
	interface GUdalostZaznamROBDto extends Gordic.Rob.Interface.GRobdzzmDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GUdalostZaznamROBDtoNames { Zmena = "Zmena", ixs_uda = "ixs_uda", por_cislo = "por_cislo", kod_zzm = "kod_zzm", dat_zzm = "dat_zzm", nazev = "nazev", zaznamy1 = "zaznamy1", zaznamy2 = "zaznamy2", zaznamy3 = "zaznamy3", zaznamy4 = "zaznamy4", priz_ro = "priz_ro", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_podpis = "s_podpis", dat_zaevidovani = "dat_zaevidovani", ixs_lis = "ixs_lis", zaznamy5 = "zaznamy5", zaznamy6 = "zaznamy6", zaznamy7 = "zaznamy7", zaznamy8 = "zaznamy8", s_rtf = "s_rtf", pos_zdr_slu = "pos_zdr_slu", Permissions = "Permissions",}
	const enum GUdalostZaznamROBDtoFragments { Zmena = "ZMENA", ixs_uda = "Base", por_cislo = "Base", kod_zzm = "Base", dat_zzm = "Base", nazev = "Base", zaznamy1 = "Base", zaznamy2 = "Base", zaznamy3 = "Base", zaznamy4 = "Base", priz_ro = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_podpis = "Base", dat_zaevidovani = "Base", ixs_lis = "Base", zaznamy5 = "Base", zaznamy6 = "Base", zaznamy7 = "Base", zaznamy8 = "Base", s_rtf = "Base", pos_zdr_slu = "Base", Permissions = "*",}
	const enum GUdalostZaznamROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_uda = "string", por_cislo = "number", kod_zzm = "number", dat_zzm = "JsonDate", nazev = "string", zaznamy1 = "string", zaznamy2 = "string", zaznamy3 = "string", zaznamy4 = "string", priz_ro = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_podpis = "number", dat_zaevidovani = "JsonDate", ixs_lis = "string", zaznamy5 = "string", zaznamy6 = "string", zaznamy7 = "string", zaznamy8 = "string", s_rtf = "number", pos_zdr_slu = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUdalostZaznamROBDtoTypeLengths { ixs_uda = 12, nazev = 60, zaznamy1 = 254, zaznamy2 = 254, zaznamy3 = 254, zaznamy4 = 254, zmenu_prov = 12, ixs_lis = 12, zaznamy5 = 254, zaznamy6 = 254, zaznamy7 = 254, zaznamy8 = 254, pos_zdr_slu = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GVyhledaniOsobyROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Data pro vyhledání Osoby v ROB*/
	interface GVyhledaniOsobyROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
	}
	const enum GVyhledaniOsobyROBDtoNames { prijmeni = "prijmeni", jmeno = "jmeno", dat_naroz = "dat_naroz", obec = "obec", castobce = "castobce", ulice = "ulice", cd = "cd", Permissions = "Permissions",}
	const enum GVyhledaniOsobyROBDtoFragments { prijmeni = "Base", jmeno = "Base", dat_naroz = "Base", obec = "Base", castobce = "Base", ulice = "Base", cd = "Base", Permissions = "*",}
	const enum GVyhledaniOsobyROBDtoTypes { prijmeni = "string", jmeno = "string", dat_naroz = "JsonDate", obec = "string", castobce = "string", ulice = "string", cd = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GVyhledaniOsobyROBDtoTypeLengths { prijmeni = 100, jmeno = 100, obec = 48, castobce = 48, ulice = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GZadostISROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Žádost o výdej informací z informačního systému (informace vedené o osobě v IS)*/
	interface GZadostISROBDto extends Gordic.Rob.Interface.GRobsuisDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Rodné číslo*/
		zad_rc?: string|null;
		/**Titul před jménem*/
		zad_tit_pred?: string|null;
		/**Příjmení osoby*/
		zad_prijmeni?: string|null;
		/**Jméno*/
		zad_jmeno?: string|null;
		/**Titul za jménem*/
		zad_tit_za?: string|null;
		/**Rc s lomítkem*/
		zad_rc_lomitko?: string|null;
	}
	const enum GZadostISROBDtoNames { Zmena = "Zmena", zad_rc = "zad_rc", zad_tit_pred = "zad_tit_pred", zad_prijmeni = "zad_prijmeni", zad_jmeno = "zad_jmeno", zad_tit_za = "zad_tit_za", zad_rc_lomitko = "zad_rc_lomitko", ixs_uis = "ixs_uis", ixs_esu_zad = "ixs_esu_zad", ixs_esu_zak = "ixs_esu_zak", ixp_zad = "ixp_zad", ixp_roz = "ixp_roz", cislo_op = "cislo_op", misto = "misto", dat_vydani = "dat_vydani", dat_zprac = "dat_zprac", ixs_fun_zprac = "ixs_fun_zprac", zpusob_vyriz = "zpusob_vyriz", s_vse = "s_vse", s_historicke = "s_historicke", s_prij_jme = "s_prij_jme", s_dat_naroz = "s_dat_naroz", s_pohlavi = "s_pohlavi", s_mistonar = "s_mistonar", s_rc = "s_rc", s_stat_obc = "s_stat_obc", s_adresa = "s_adresa", s_dat_tp_od = "s_dat_tp_od", s_zpusobilost = "s_zpusobilost", s_zakaz_pobytu = "s_zakaz_pobytu", s_rc_rodice = "s_rc_rodice", s_rod_stav = "s_rod_stav", s_rc_partner = "s_rc_partner", s_rc_dite = "s_rc_dite", s_osvojeni = "s_osvojeni", s_zaznam_o_vydeji = "s_zaznam_o_vydeji", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_op_zak = "cislo_op_zak", ixs_esu_obl = "ixs_esu_obl", vztah_obl = "vztah_obl", s_pred_adresa = "s_pred_adresa", s_doruc_adresa = "s_doruc_adresa", s_sml_napomoc = "s_sml_napomoc", s_zast_clenem = "s_zast_clenem", s_partnerstvi = "s_partnerstvi", s_nezcest = "s_nezcest", s_nezvest_obl = "s_nezvest_obl", s_umrti = "s_umrti", datum_pobyt_od = "datum_pobyt_od", Permissions = "Permissions",}
	const enum GZadostISROBDtoFragments { Zmena = "ZMENA", zad_rc = "Extended", zad_tit_pred = "Extended", zad_prijmeni = "Extended", zad_jmeno = "Extended", zad_tit_za = "Extended", zad_rc_lomitko = "Extended", ixs_uis = "Base", ixs_esu_zad = "Base", ixs_esu_zak = "Base", ixp_zad = "Base", ixp_roz = "Base", cislo_op = "Base", misto = "Base", dat_vydani = "Base", dat_zprac = "Base", ixs_fun_zprac = "Base", zpusob_vyriz = "Base", s_vse = "Base", s_historicke = "Base", s_prij_jme = "Base", s_dat_naroz = "Base", s_pohlavi = "Base", s_mistonar = "Base", s_rc = "Base", s_stat_obc = "Base", s_adresa = "Base", s_dat_tp_od = "Base", s_zpusobilost = "Base", s_zakaz_pobytu = "Base", s_rc_rodice = "Base", s_rod_stav = "Base", s_rc_partner = "Base", s_rc_dite = "Base", s_osvojeni = "Base", s_zaznam_o_vydeji = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cislo_op_zak = "Base", ixs_esu_obl = "Base", vztah_obl = "Base", s_pred_adresa = "Base", s_doruc_adresa = "Base", s_sml_napomoc = "Base", s_zast_clenem = "Base", s_partnerstvi = "Base", s_nezcest = "Base", s_nezvest_obl = "Base", s_umrti = "Base", datum_pobyt_od = "Base", Permissions = "*",}
	const enum GZadostISROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", zad_rc = "string", zad_tit_pred = "string", zad_prijmeni = "string", zad_jmeno = "string", zad_tit_za = "string", zad_rc_lomitko = "string", ixs_uis = "string", ixs_esu_zad = "string", ixs_esu_zak = "string", ixp_zad = "string", ixp_roz = "string", cislo_op = "string", misto = "string", dat_vydani = "JsonDate", dat_zprac = "JsonDate", ixs_fun_zprac = "string", zpusob_vyriz = "number", s_vse = "number", s_historicke = "number", s_prij_jme = "number", s_dat_naroz = "number", s_pohlavi = "number", s_mistonar = "number", s_rc = "number", s_stat_obc = "number", s_adresa = "number", s_dat_tp_od = "number", s_zpusobilost = "number", s_zakaz_pobytu = "number", s_rc_rodice = "number", s_rod_stav = "number", s_rc_partner = "number", s_rc_dite = "number", s_osvojeni = "number", s_zaznam_o_vydeji = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_op_zak = "string", ixs_esu_obl = "string", vztah_obl = "number", s_pred_adresa = "number", s_doruc_adresa = "number", s_sml_napomoc = "number", s_zast_clenem = "number", s_partnerstvi = "number", s_nezcest = "number", s_nezvest_obl = "number", s_umrti = "number", datum_pobyt_od = "JsonDate", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GZadostISROBDtoTypeLengths { zad_rc = 10, zad_tit_pred = 35, zad_prijmeni = 100, zad_jmeno = 100, zad_tit_za = 35, zad_rc_lomitko = 35, ixs_uis = 12, ixs_esu_zad = 12, ixs_esu_zak = 12, ixp_zad = 12, ixp_roz = 12, cislo_op = 50, misto = 48, ixs_fun_zprac = 12, poznamka = 254, zmenu_prov = 12, cislo_op_zak = 50, ixs_esu_obl = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GZakazTPROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Zákaz trvalého pobytu*/
	interface GZakazTPROBDto extends Gordic.Rob.Interface.GRobsztpDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Rodné číslo s lomítkem*/
		rc_lomitko?: string|null;
	}
	const enum GZakazTPROBDtoNames { Zmena = "Zmena", rc = "rc", tit_pred = "tit_pred", prijmeni = "prijmeni", jmeno = "jmeno", tit_za = "tit_za", obec = "obec", castobce = "castobce", ulice = "ulice", cor = "cor", pcor = "pcor", cd = "cd", rc_lomitko = "rc_lomitko", ixs_ztp = "ixs_ztp", ixs_esu_ztp = "ixs_esu_ztp", ixs_adr = "ixs_adr", ixs_esu_zad = "ixs_esu_zad", ixs_esu_vyd = "ixs_esu_vyd", ixp_roz = "ixp_roz", cj_roz = "cj_roz", popis_zakazu = "popis_zakazu", dat_roz = "dat_roz", dat_prm = "dat_prm", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", s_vyhosteni = "s_vyhosteni", s_dulezitost = "s_dulezitost", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GZakazTPROBDtoFragments { Zmena = "ZMENA", rc = "Extended", tit_pred = "Extended", prijmeni = "Extended", jmeno = "Extended", tit_za = "Extended", obec = "Extended", castobce = "Extended", ulice = "Extended", cor = "Extended", pcor = "Extended", cd = "Extended", rc_lomitko = "Extended", ixs_ztp = "Base", ixs_esu_ztp = "Base", ixs_adr = "Base", ixs_esu_zad = "Base", ixs_esu_vyd = "Base", ixp_roz = "Base", cj_roz = "Base", popis_zakazu = "Base", dat_roz = "Base", dat_prm = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", s_vyhosteni = "Base", s_dulezitost = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GZakazTPROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", rc = "string", tit_pred = "string", prijmeni = "string", jmeno = "string", tit_za = "string", obec = "string", castobce = "string", ulice = "string", cor = "number", pcor = "string", cd = "number", rc_lomitko = "string", ixs_ztp = "string", ixs_esu_ztp = "string", ixs_adr = "string", ixs_esu_zad = "string", ixs_esu_vyd = "string", ixp_roz = "string", cj_roz = "string", popis_zakazu = "string", dat_roz = "JsonDate", dat_prm = "JsonDate", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", s_vyhosteni = "number", s_dulezitost = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GZakazTPROBDtoTypeLengths { rc = 10, tit_pred = 35, prijmeni = 100, jmeno = 100, tit_za = 35, obec = 48, castobce = 48, ulice = 48, pcor = 1, ixs_ztp = 12, ixs_esu_ztp = 12, ixs_adr = 12, ixs_esu_zad = 12, ixs_esu_vyd = 12, ixp_roz = 12, cj_roz = 30, popis_zakazu = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\ExtendedDto\GZmenySzrROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Změny SZR*/
	interface GZmenySzrROBDto extends Gordic.Rob.Interface.GRoblszrDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Text změny*/
		szr_zmena_txt?: string|null;
		/**Příjmení osoby*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Rodné číslo s lomítkem*/
		rc_lomitko?: string|null;
	}
	const enum GZmenySzrROBDtoNames { Zmena = "Zmena", szr_zmena_txt = "szr_zmena_txt", prijmeni = "prijmeni", jmeno = "jmeno", rc = "rc", rc_lomitko = "rc_lomitko", ixs_oso = "ixs_oso", szr_zmena = "szr_zmena", popis = "popis", s_zud = "s_zud", dat_prov = "dat_prov", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_zmena_iseo = "s_zmena_iseo", Permissions = "Permissions",}
	const enum GZmenySzrROBDtoFragments { Zmena = "ZMENA", szr_zmena_txt = "Extended", prijmeni = "Extended", jmeno = "Extended", rc = "Extended", rc_lomitko = "Extended", ixs_oso = "Base", szr_zmena = "Base", popis = "Base", s_zud = "Base", dat_prov = "Base", dat_zmena = "Base", zmenu_prov = "Base", s_zmena_iseo = "Base", Permissions = "*",}
	const enum GZmenySzrROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", szr_zmena_txt = "string", prijmeni = "string", jmeno = "string", rc = "string", rc_lomitko = "string", ixs_oso = "string", szr_zmena = "number", popis = "string", s_zud = "number", dat_prov = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", s_zmena_iseo = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GZmenySzrROBDtoTypeLengths { prijmeni = 100, jmeno = 100, rc = 10, rc_lomitko = 10, ixs_oso = 12, popis = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Filters\GListArchivniROBFilterDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Osoba filter*/
	interface GListArchivniROBFilterDto {
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Datum narození interval*/
		dat_naroz_start?: JsonDate|null;
		/**Datum narození interval*/
		dat_naroz_end?: JsonDate|null;
		/**Typ události*/
		typ_uda?: number|null;
	}
	const enum GListArchivniROBFilterDtoNames { rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", pohlavi = "pohlavi", ktg_obyv = "ktg_obyv", dat_naroz_start = "dat_naroz_start", dat_naroz_end = "dat_naroz_end", typ_uda = "typ_uda",}
	const enum GListArchivniROBFilterDtoFragments { rc = "*", prijmeni = "*", jmeno = "*", rodprij = "*", pohlavi = "*", ktg_obyv = "*", dat_naroz_start = "*", dat_naroz_end = "*", typ_uda = "*",}
	const enum GListArchivniROBFilterDtoTypes { rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", pohlavi = "number", ktg_obyv = "number", dat_naroz_start = "JsonDate", dat_naroz_end = "JsonDate", typ_uda = "number",}
	const enum GListArchivniROBFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Filters\GOsobaROBFilterDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Osoba filter*/
	interface GOsobaROBFilterDto {
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Cizinci*/
		cizinci?: boolean|null;
		/**Děti pro převod do dospělých*/
		deti_pro_prevod?: boolean|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castObce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**pcor*/
		pcor?: string|null;
		/**Datum narození interval*/
		dat_naroz_start?: JsonDate|null;
		/**Datum narození interval*/
		dat_naroz_end?: JsonDate|null;
		/**Rodiný stav*/
		rod_stav?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
	}
	const enum GOsobaROBFilterDtoNames { rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", pohlavi = "pohlavi", typ_pobytu = "typ_pobytu", ktg_obyv = "ktg_obyv", aktivita = "aktivita", cizinci = "cizinci", deti_pro_prevod = "deti_pro_prevod", obec = "obec", castObce = "castObce", ulice = "ulice", cd = "cd", cor = "cor", pcor = "pcor", dat_naroz_start = "dat_naroz_start", dat_naroz_end = "dat_naroz_end", rod_stav = "rod_stav", stav_oso = "stav_oso",}
	const enum GOsobaROBFilterDtoFragments { rc = "*", prijmeni = "*", jmeno = "*", rodprij = "*", pohlavi = "*", typ_pobytu = "*", ktg_obyv = "*", aktivita = "*", cizinci = "*", deti_pro_prevod = "*", obec = "*", castObce = "*", ulice = "*", cd = "*", cor = "*", pcor = "*", dat_naroz_start = "*", dat_naroz_end = "*", rod_stav = "*", stav_oso = "*",}
	const enum GOsobaROBFilterDtoTypes { rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", pohlavi = "number", typ_pobytu = "number", ktg_obyv = "number", aktivita = "number", cizinci = "boolean", deti_pro_prevod = "boolean", obec = "string", castObce = "string", ulice = "string", cd = "number", cor = "number", pcor = "string", dat_naroz_start = "JsonDate", dat_naroz_end = "JsonDate", rod_stav = "number", stav_oso = "number",}
	const enum GOsobaROBFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Permissions\GRobBaseDetailPermissions.d.ts 

declare namespace Gordic.Rob.Interface {
	/**DBTABLE:robsadr
	*      Základní Permissions pro Rob
	*/
	interface GRobBaseDetailPermissions extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
	}
	const enum GRobBaseDetailPermissionsNames { Permissions = "Permissions",}
	const enum GRobBaseDetailPermissionsFragments { Permissions = "*",}
	const enum GRobBaseDetailPermissionsTypes { Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRobBaseDetailPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\PorovnaniREN\GBytyRENROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Byty REN*/
	interface GBytyRENROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		nemsjed_id_jednotky?: string|null;
		nemsjed_id_telesa?: string|null;
		nemsjed_cislo_jednotky?: JsonDecimal|null;
		nemsjed_zp_vyuz_jed?: number|null;
		nemszvj_nazev?: string|null;
		nemsbud_id_budovy?: string|null;
		nemsbud_typ_budovy?: number|null;
		nemscbu_typ_budovy?: number|null;
		nemsbud_kod_casti_obce?: number|null;
		nemsbud_cislo_domovni?: number|null;
		nemscbu_cislo_domovni?: number|null;
		nemsbud_zp_vyuz_bud?: number|null;
		nemspar_kod_kat_uzemi?: number|null;
		nazev_kat_uzemi?: string|null;
		nemstbu_nazev?: string|null;
		nemszvb_nazev?: string|null;
		nemscob_nazev?: string|null;
		robsido_obec?: string|null;
		robsido_castobce?: string|null;
		robsido_ulice?: string|null;
		robsido_cd?: number|null;
		robsido_dcd?: string|null;
		robsido_cor?: number|null;
		nemstel_cislo_tel?: number|null;
	}
	const enum GBytyRENROBDtoNames { nemsjed_id_jednotky = "nemsjed_id_jednotky", nemsjed_id_telesa = "nemsjed_id_telesa", nemsjed_cislo_jednotky = "nemsjed_cislo_jednotky", nemsjed_zp_vyuz_jed = "nemsjed_zp_vyuz_jed", nemszvj_nazev = "nemszvj_nazev", nemsbud_id_budovy = "nemsbud_id_budovy", nemsbud_typ_budovy = "nemsbud_typ_budovy", nemscbu_typ_budovy = "nemscbu_typ_budovy", nemsbud_kod_casti_obce = "nemsbud_kod_casti_obce", nemsbud_cislo_domovni = "nemsbud_cislo_domovni", nemscbu_cislo_domovni = "nemscbu_cislo_domovni", nemsbud_zp_vyuz_bud = "nemsbud_zp_vyuz_bud", nemspar_kod_kat_uzemi = "nemspar_kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", nemstbu_nazev = "nemstbu_nazev", nemszvb_nazev = "nemszvb_nazev", nemscob_nazev = "nemscob_nazev", robsido_obec = "robsido_obec", robsido_castobce = "robsido_castobce", robsido_ulice = "robsido_ulice", robsido_cd = "robsido_cd", robsido_dcd = "robsido_dcd", robsido_cor = "robsido_cor", nemstel_cislo_tel = "nemstel_cislo_tel", Permissions = "Permissions",}
	const enum GBytyRENROBDtoFragments { nemsjed_id_jednotky = "Base", nemsjed_id_telesa = "Base", nemsjed_cislo_jednotky = "Base", nemsjed_zp_vyuz_jed = "Base", nemszvj_nazev = "Base", nemsbud_id_budovy = "Base", nemsbud_typ_budovy = "Base", nemscbu_typ_budovy = "Base", nemsbud_kod_casti_obce = "Base", nemsbud_cislo_domovni = "Base", nemscbu_cislo_domovni = "Base", nemsbud_zp_vyuz_bud = "Base", nemspar_kod_kat_uzemi = "Base", nazev_kat_uzemi = "Base", nemstbu_nazev = "Base", nemszvb_nazev = "Base", nemscob_nazev = "Base", robsido_obec = "Base", robsido_castobce = "Base", robsido_ulice = "Base", robsido_cd = "Base", robsido_dcd = "Base", robsido_cor = "Base", nemstel_cislo_tel = "Base", Permissions = "*",}
	const enum GBytyRENROBDtoTypes { nemsjed_id_jednotky = "string", nemsjed_id_telesa = "string", nemsjed_cislo_jednotky = "JsonDecimal", nemsjed_zp_vyuz_jed = "number", nemszvj_nazev = "string", nemsbud_id_budovy = "string", nemsbud_typ_budovy = "number", nemscbu_typ_budovy = "number", nemsbud_kod_casti_obce = "number", nemsbud_cislo_domovni = "number", nemscbu_cislo_domovni = "number", nemsbud_zp_vyuz_bud = "number", nemspar_kod_kat_uzemi = "number", nazev_kat_uzemi = "string", nemstbu_nazev = "string", nemszvb_nazev = "string", nemscob_nazev = "string", robsido_obec = "string", robsido_castobce = "string", robsido_ulice = "string", robsido_cd = "number", robsido_dcd = "string", robsido_cor = "number", nemstel_cislo_tel = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GBytyRENROBDtoTypeLengths { nemsjed_id_jednotky = 30, nemsbud_id_budovy = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\PorovnaniREN\GKatastralniUzemiROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro katastrální území*/
	interface GKatastralniUzemiROBDto extends Gordic.Rob.Interface.GNemskatDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GKatastralniUzemiROBDtoNames { Zmena = "Zmena", kod_kat_uzemi = "kod_kat_uzemi", kod_obce = "kod_obce", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prac_cislo = "prac_cislo", ciselna_rada = "ciselna_rada", cs_nazev = "cs_nazev", Permissions = "Permissions",}
	const enum GKatastralniUzemiROBDtoFragments { Zmena = "ZMENA", kod_kat_uzemi = "Base", kod_obce = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", prac_cislo = "Base", ciselna_rada = "Base", cs_nazev = "Base", Permissions = "*",}
	const enum GKatastralniUzemiROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", kod_kat_uzemi = "number", kod_obce = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prac_cislo = "number", ciselna_rada = "number", cs_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GKatastralniUzemiROBDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 254, zmenu_prov = 12, cs_nazev = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\PorovnaniREN\GObecKatastruNemROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro Obec katastru nemovitostí*/
	interface GObecKatastruNemROBDto extends Gordic.Rob.Interface.GNemsobcDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GObecKatastruNemROBDtoNames { Zmena = "Zmena", kod_obce = "kod_obce", kod_okresu = "kod_okresu", nazev = "nazev", dat_platnost_od = "dat_platnost_od", dat_platnost_do = "dat_platnost_do", ixs_dav = "ixs_dav", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs_nazev = "cs_nazev", Permissions = "Permissions",}
	const enum GObecKatastruNemROBDtoFragments { Zmena = "ZMENA", kod_obce = "Base", kod_okresu = "Base", nazev = "Base", dat_platnost_od = "Base", dat_platnost_do = "Base", ixs_dav = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cs_nazev = "Base", Permissions = "*",}
	const enum GObecKatastruNemROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", kod_obce = "number", kod_okresu = "number", nazev = "string", dat_platnost_od = "JsonDate", dat_platnost_do = "JsonDate", ixs_dav = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs_nazev = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GObecKatastruNemROBDtoTypeLengths { nazev = 48, ixs_dav = 12, poznamka = 50, zmenu_prov = 12, cs_nazev = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\PorovnaniREN\GPrazdneObjektyROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro srovnání dvou uložených porovnání s REN*/
	interface GPrazdneObjektyROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Titul před jménem*/
		titul_pred?: string|null;
		/**Titul za jménem*/
		titul_za?: string|null;
		/**Rodné číslo*/
		rodne_cislo?: string|null;
		/**Bydliště ku*/
		bydliste_ku?: string|null;
		/**Bydliště*/
		bydliste?: string|null;
		/**ID budovy*/
		id_budovy?: string|null;
		/**Typ budovy*/
		typ_budovy?: number|null;
		/**Kód části obce*/
		kod_casti_obce?: number|null;
		/**Název části obce*/
		nazev_casti_obce?: string|null;
		/**Domovní číslo*/
		cislo_domovni?: number|null;
		/**DBCOLUMN:robdprn.dcd_zobraz*/
		dcd_zobraz?: string|null;
		/**Podíl na nemovitosti*/
		podil_nem?: string|null;
		/**DBCOLUMN:robdprn.podil_citatel*/
		podil_citatel?: number|null;
		/**DBCOLUMN:robdprn.podil_jmenov*/
		podil_jmenov?: number|null;
		/**Typ nemovitosti*/
		typ_nemovitosti?: string|null;
		/**Kód katast území*/
		kod_kat_uzemi?: number|null;
		/**Název katastr území*/
		nazev_kat_uzemi?: string|null;
		/**Číslo parceli*/
		cislo_par?: string|null;
		/**Číslo bytu*/
		cislo_bytu?: number|null;
		/**DBCOLUMN:robdprn.s_sjm*/
		s_sjm?: number|null;
		/**DBCOLUMN:robdprn.cislo_lv*/
		cislo_lv?: number|null;
		/**Změna*/
		zmena?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Ičo*/
		ico?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
	}
	const enum GPrazdneObjektyROBDtoNames { jmeno = "jmeno", prijmeni = "prijmeni", titul_pred = "titul_pred", titul_za = "titul_za", rodne_cislo = "rodne_cislo", bydliste_ku = "bydliste_ku", bydliste = "bydliste", id_budovy = "id_budovy", typ_budovy = "typ_budovy", kod_casti_obce = "kod_casti_obce", nazev_casti_obce = "nazev_casti_obce", cislo_domovni = "cislo_domovni", dcd_zobraz = "dcd_zobraz", podil_nem = "podil_nem", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", typ_nemovitosti = "typ_nemovitosti", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", cislo_par = "cislo_par", cislo_bytu = "cislo_bytu", s_sjm = "s_sjm", cislo_lv = "cislo_lv", zmena = "zmena", nazev = "nazev", ico = "ico", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GPrazdneObjektyROBDtoFragments { jmeno = "Base", prijmeni = "Base", titul_pred = "Base", titul_za = "Base", rodne_cislo = "Base", bydliste_ku = "Base", bydliste = "Base", id_budovy = "Base", typ_budovy = "Base", kod_casti_obce = "Base", nazev_casti_obce = "Base", cislo_domovni = "Base", dcd_zobraz = "Base", podil_nem = "Base", podil_citatel = "Base", podil_jmenov = "Base", typ_nemovitosti = "Base", kod_kat_uzemi = "Base", nazev_kat_uzemi = "Base", cislo_par = "Base", cislo_bytu = "Base", s_sjm = "Base", cislo_lv = "Base", zmena = "Base", nazev = "Base", ico = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GPrazdneObjektyROBDtoTypes { jmeno = "string", prijmeni = "string", titul_pred = "string", titul_za = "string", rodne_cislo = "string", bydliste_ku = "string", bydliste = "string", id_budovy = "string", typ_budovy = "number", kod_casti_obce = "number", nazev_casti_obce = "string", cislo_domovni = "number", dcd_zobraz = "string", podil_nem = "string", podil_citatel = "number", podil_jmenov = "number", typ_nemovitosti = "string", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", cislo_par = "string", cislo_bytu = "number", s_sjm = "number", cislo_lv = "number", zmena = "number", nazev = "string", ico = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPrazdneObjektyROBDtoTypeLengths { jmeno = 100, prijmeni = 100, titul_pred = 35, titul_za = 35, rodne_cislo = 10, bydliste_ku = 254, bydliste = 254, id_budovy = 30, nazev_casti_obce = 48, dcd_zobraz = 1, podil_nem = 50, typ_nemovitosti = 60, nazev_kat_uzemi = 48, cislo_par = 200, nazev = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\PorovnaniREN\GRenDetPorovnaniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro detail porovnání ROB s REN*/
	interface GRenDetPorovnaniROBDto extends Gordic.Rob.Interface.GRobdprnDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GRenDetPorovnaniROBDtoNames { Zmena = "Zmena", ixs_prn = "ixs_prn", por_cislo = "por_cislo", jmeno = "jmeno", prijmeni = "prijmeni", titul_pred = "titul_pred", titul_za = "titul_za", rodne_cislo = "rodne_cislo", bydliste_ku = "bydliste_ku", bydliste = "bydliste", id_budovy = "id_budovy", typ_budovy = "typ_budovy", kod_casti_obce = "kod_casti_obce", nazev_casti_obce = "nazev_casti_obce", cislo_domovni = "cislo_domovni", dcd_zobraz = "dcd_zobraz", podil_nem = "podil_nem", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", typ_nemovitosti = "typ_nemovitosti", kod_kat_uzemi = "kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", cislo_par = "cislo_par", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_bytu = "cislo_bytu", s_sjm = "s_sjm", cislo_lv = "cislo_lv", nazev = "nazev", ico = "ico", Permissions = "Permissions",}
	const enum GRenDetPorovnaniROBDtoFragments { Zmena = "ZMENA", ixs_prn = "Base", por_cislo = "Base", jmeno = "Base", prijmeni = "Base", titul_pred = "Base", titul_za = "Base", rodne_cislo = "Base", bydliste_ku = "Base", bydliste = "Base", id_budovy = "Base", typ_budovy = "Base", kod_casti_obce = "Base", nazev_casti_obce = "Base", cislo_domovni = "Base", dcd_zobraz = "Base", podil_nem = "Base", podil_citatel = "Base", podil_jmenov = "Base", typ_nemovitosti = "Base", kod_kat_uzemi = "Base", nazev_kat_uzemi = "Base", cislo_par = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", cislo_bytu = "Base", s_sjm = "Base", cislo_lv = "Base", nazev = "Base", ico = "Base", Permissions = "*",}
	const enum GRenDetPorovnaniROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_prn = "string", por_cislo = "number", jmeno = "string", prijmeni = "string", titul_pred = "string", titul_za = "string", rodne_cislo = "string", bydliste_ku = "string", bydliste = "string", id_budovy = "string", typ_budovy = "number", kod_casti_obce = "number", nazev_casti_obce = "string", cislo_domovni = "number", dcd_zobraz = "string", podil_nem = "string", podil_citatel = "number", podil_jmenov = "number", typ_nemovitosti = "string", kod_kat_uzemi = "number", nazev_kat_uzemi = "string", cislo_par = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_bytu = "number", s_sjm = "number", cislo_lv = "number", nazev = "string", ico = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenDetPorovnaniROBDtoTypeLengths { ixs_prn = 12, jmeno = 100, prijmeni = 100, titul_pred = 35, titul_za = 35, rodne_cislo = 10, bydliste_ku = 254, bydliste = 254, id_budovy = 30, nazev_casti_obce = 48, dcd_zobraz = 1, podil_nem = 50, typ_nemovitosti = 60, nazev_kat_uzemi = 48, cislo_par = 200, poznamka = 254, zmenu_prov = 12, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\PorovnaniREN\GRenPorovnaniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro porovnání ROB s REN*/
	interface GRenPorovnaniROBDto extends Gordic.Rob.Interface.GRobsprnDto {
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GRenPorovnaniROBDtoNames { Zmena = "Zmena", ixs_prn = "ixs_prn", nazev = "nazev", popis = "popis", dat_porovnani = "dat_porovnani", dat_ulozeni = "dat_ulozeni", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GRenPorovnaniROBDtoFragments { Zmena = "ZMENA", ixs_prn = "Base", nazev = "Base", popis = "Base", dat_porovnani = "Base", dat_ulozeni = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GRenPorovnaniROBDtoTypes { Zmena = "Gordic.Gin.Interface.GGinszmpDto", ixs_prn = "string", nazev = "string", popis = "string", dat_porovnani = "JsonDate", dat_ulozeni = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRenPorovnaniROBDtoTypeLengths { ixs_prn = 12, nazev = 100, popis = 254, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\PorovnaniREN\GRodinneDomyRENROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Rodinné domy REN*/
	interface GRodinneDomyRENROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		nemsbud_id_budovy?: string|null;
		nemsbud_typ_budovy?: number|null;
		nemsbud_kod_casti_obce?: number|null;
		nemsbud_cislo_domovni?: number|null;
		nemsbud_zp_vyuz_bud?: number|null;
		nemsbud_id_telesa?: string|null;
		nemspar_kod_kat_uzemi?: number|null;
		nazev_kat_uzemi?: string|null;
		nemstbu_nazev?: string|null;
		nemszvb_nazev?: string|null;
		nemscob_nazev?: string|null;
		robsido_obec?: string|null;
		robsido_castobce?: string|null;
		robsido_ulice?: string|null;
		robsido_cd?: number|null;
		robsido_dcd?: string|null;
		robsido_cor?: number|null;
		nemstel_cislo_tel?: number|null;
	}
	const enum GRodinneDomyRENROBDtoNames { nemsbud_id_budovy = "nemsbud_id_budovy", nemsbud_typ_budovy = "nemsbud_typ_budovy", nemsbud_kod_casti_obce = "nemsbud_kod_casti_obce", nemsbud_cislo_domovni = "nemsbud_cislo_domovni", nemsbud_zp_vyuz_bud = "nemsbud_zp_vyuz_bud", nemsbud_id_telesa = "nemsbud_id_telesa", nemspar_kod_kat_uzemi = "nemspar_kod_kat_uzemi", nazev_kat_uzemi = "nazev_kat_uzemi", nemstbu_nazev = "nemstbu_nazev", nemszvb_nazev = "nemszvb_nazev", nemscob_nazev = "nemscob_nazev", robsido_obec = "robsido_obec", robsido_castobce = "robsido_castobce", robsido_ulice = "robsido_ulice", robsido_cd = "robsido_cd", robsido_dcd = "robsido_dcd", robsido_cor = "robsido_cor", nemstel_cislo_tel = "nemstel_cislo_tel", Permissions = "Permissions",}
	const enum GRodinneDomyRENROBDtoFragments { nemsbud_id_budovy = "Base", nemsbud_typ_budovy = "Base", nemsbud_kod_casti_obce = "Base", nemsbud_cislo_domovni = "Base", nemsbud_zp_vyuz_bud = "Base", nemsbud_id_telesa = "Base", nemspar_kod_kat_uzemi = "Base", nazev_kat_uzemi = "Base", nemstbu_nazev = "Base", nemszvb_nazev = "Base", nemscob_nazev = "Base", robsido_obec = "Base", robsido_castobce = "Base", robsido_ulice = "Base", robsido_cd = "Base", robsido_dcd = "Base", robsido_cor = "Base", nemstel_cislo_tel = "Base", Permissions = "*",}
	const enum GRodinneDomyRENROBDtoTypes { nemsbud_id_budovy = "string", nemsbud_typ_budovy = "number", nemsbud_kod_casti_obce = "number", nemsbud_cislo_domovni = "number", nemsbud_zp_vyuz_bud = "number", nemsbud_id_telesa = "string", nemspar_kod_kat_uzemi = "number", nazev_kat_uzemi = "string", nemstbu_nazev = "string", nemszvb_nazev = "string", nemscob_nazev = "string", robsido_obec = "string", robsido_castobce = "string", robsido_ulice = "string", robsido_cd = "number", robsido_dcd = "string", robsido_cor = "number", nemstel_cislo_tel = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GRodinneDomyRENROBDtoTypeLengths { nemsbud_id_budovy = 30, nemsbud_id_telesa = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Readers\GReaderRobstdoDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Typ Dokladu*/
	interface GReaderRobstdoDto extends Gordic.Rob.Interface.GRobstdoDto {
	}
	const enum GReaderRobstdoDtoNames { ixs_tdo = "ixs_tdo", nazev = "nazev", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", Permissions = "Permissions",}
	const enum GReaderRobstdoDtoFragments { ixs_tdo = "Base", nazev = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", Permissions = "*",}
	const enum GReaderRobstdoDtoTypes { ixs_tdo = "string", nazev = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GReaderRobstdoDtoTypeLengths { ixs_tdo = 12, nazev = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyRob\GListArchivniEvidenceROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro List archivní evidence*/
	interface GListArchivniEvidenceROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**Datum trvalého pobytu*/
		dat_tp?: JsonDate|null;
		/**Datum odstěhování*/
		dat_odsteh?: JsonDate|null;
		/**Datum úmrtí*/
		dat_umrti?: JsonDate|null;
		/**Identifikátor události*/
		robsuda_ixs_uda?: string|null;
		/**Pohlaví stav textově*/
		pohlavi_txt?: string|null;
		/**Datum změny*/
		datum_zmeny?: JsonDate|null;
		/**Druh změny*/
		druh_zmeny?: string|null;
		/**Rc s lomítkem*/
		rc_lomitko?: string|null;
		/**Poznámka k úmrtí*/
		poznamka_umrti?: string|null;
	}
	const enum GListArchivniEvidenceROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", aktivita = "aktivita", stav_oso = "stav_oso", dat_tp = "dat_tp", dat_odsteh = "dat_odsteh", dat_umrti = "dat_umrti", robsuda_ixs_uda = "robsuda_ixs_uda", pohlavi_txt = "pohlavi_txt", datum_zmeny = "datum_zmeny", druh_zmeny = "druh_zmeny", rc_lomitko = "rc_lomitko", poznamka_umrti = "poznamka_umrti", Permissions = "Permissions",}
	const enum GListArchivniEvidenceROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", aktivita = "Base", stav_oso = "Base", dat_tp = "Base", dat_odsteh = "Base", dat_umrti = "Base", robsuda_ixs_uda = "Base", pohlavi_txt = "Base", datum_zmeny = "Base", druh_zmeny = "Base", rc_lomitko = "Base", poznamka_umrti = "Base", Permissions = "*",}
	const enum GListArchivniEvidenceROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", aktivita = "number", stav_oso = "number", dat_tp = "JsonDate", dat_odsteh = "JsonDate", dat_umrti = "JsonDate", robsuda_ixs_uda = "string", pohlavi_txt = "string", datum_zmeny = "JsonDate", druh_zmeny = "string", rc_lomitko = "string", poznamka_umrti = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListArchivniEvidenceROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, tit_pred = 35, tit_za = 35, robsuda_ixs_uda = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyRob\GListISZRZUDROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro list porovnání ISZR - ROB (ZUD)*/
	interface GListISZRZUDROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Státní občanství*/
		stat_obc?: number|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**Okres narození*/
		okres_naroz?: string|null;
		/**Stát narození*/
		stat_naroz?: number|null;
		/**DBCOLUMN:robsoso.cs_prijmeni*/
		cs_prijmeni?: string|null;
		/**DBCOLUMN:robsoso.cs_jmeno*/
		cs_jmeno?: string|null;
		/**DBCOLUMN:robsoso.ref_udaje*/
		ref_udaje?: number|null;
		/**Aifo*/
		aifo?: string|null;
		/**Datum aktualizace ISZR*/
		dat_akt_iszr?: JsonDate|null;
		/**Datum od kdy bydlí*/
		dat_od?: JsonDate|null;
		/**Identifikátor objektu*/
		ixs_ido?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Okres*/
		okres?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Část obce*/
		castobce?: string|null;
		/**Druh čísla domovního*/
		dcd?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Poštovní směrovací číslo*/
		psc?: string|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Kód adresního místa*/
		robsido_adresni_misto_kod?: number|null;
		/**Identifikátr adresy objektu*/
		ixs_adr?: string|null;
		/**Blok domu*/
		blok_domu?: string|null;
		/**Vchod*/
		vchod?: string|null;
		/**Byt*/
		byt?: string|null;
		/**Kód adresního místa*/
		szrsrob_adresni_misto_kod?: number|null;
		/**Jméno*/
		szrsrob_jmeno?: string|null;
		/**Příjmení*/
		szrsrob_prijmeni?: string|null;
		/**Datum narození*/
		szrsrob_datum_narozeni?: JsonDate|null;
		/**Datum úmrtí*/
		szrsrob_datum_umrti?: JsonDate|null;
		/**Místo narození čr*/
		szrsrob_misto_naroz_cr?: number|null;
		/**Místo narození obec*/
		szrsrob_misto_nar_obec?: number|null;
		/**Místo narození svět*/
		szrsrob_misto_naroz_svet?: string|null;
		/**Přihlášení ke změnám*/
		szrsrob_prihlaseni_zmen?: number|null;
		/**Datum aktualizace*/
		szrsrob_dat_akt?: JsonDate|null;
		/**Čas odpovědi*/
		szrsrob_cas_odpovedi?: JsonDate|null;
		/**Doručovací adresa čr*/
		szrsrob_doruc_adr_cr?: number|null;
		/**Doručovací adresa ostatní*/
		szrsrob_doruc_adr_ostatni?: string|null;
		/**Volný text*/
		robsdad_volny_text?: string|null;
		/**robsido_da_adresni_misto_kod*/
		robsido_da_adresni_misto_kod?: number|null;
		/**Pohlaví textově*/
		pohlavi_txt?: string|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Místo narození Čr textově*/
		misto_naroz_cr_txt?: string|null;
		/**Okres narození Čr textově*/
		okres_naroz_cr_txt?: string|null;
		/**misto_naroz_pobvod*/
		misto_naroz_pobvod?: string|null;
		/**Stát narození iszr*/
		stat_naroz_iszr?: number|null;
		/**stat_obc_iszr*/
		stat_obc_iszr?: number|null;
		/**stat_obc_iszr_2*/
		stat_obc_iszr_2?: number|null;
		/**Číslo op iszr*/
		cislo_op_iszr?: string|null;
		/**Číslo op*/
		cislo_op?: string|null;
		/**Rč s lomítkem*/
		rc_lomitko?: string|null;
		/**Ročník*/
		rocnik?: number|null;
		/**dcd_zobraz*/
		dcd_zobraz?: string|null;
		/**Iszr*/
		iszr?: string|null;
		/**Aifo textově*/
		aifo_txt?: string|null;
		/**prihlaseni_zmen_txt*/
		prihlaseni_zmen_txt?: string|null;
		/**zmena_txt*/
		zmena_txt?: string|null;
	}
	const enum GListISZRZUDROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", stat_obc = "stat_obc", mistonar = "mistonar", okres_naroz = "okres_naroz", stat_naroz = "stat_naroz", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", ref_udaje = "ref_udaje", aifo = "aifo", dat_akt_iszr = "dat_akt_iszr", dat_od = "dat_od", ixs_ido = "ixs_ido", obec = "obec", okres = "okres", ulice = "ulice", cd = "cd", castobce = "castobce", dcd = "dcd", cor = "cor", psc = "psc", pcor = "pcor", robsido_adresni_misto_kod = "robsido_adresni_misto_kod", ixs_adr = "ixs_adr", blok_domu = "blok_domu", vchod = "vchod", byt = "byt", szrsrob_adresni_misto_kod = "szrsrob_adresni_misto_kod", szrsrob_jmeno = "szrsrob_jmeno", szrsrob_prijmeni = "szrsrob_prijmeni", szrsrob_datum_narozeni = "szrsrob_datum_narozeni", szrsrob_datum_umrti = "szrsrob_datum_umrti", szrsrob_misto_naroz_cr = "szrsrob_misto_naroz_cr", szrsrob_misto_nar_obec = "szrsrob_misto_nar_obec", szrsrob_misto_naroz_svet = "szrsrob_misto_naroz_svet", szrsrob_prihlaseni_zmen = "szrsrob_prihlaseni_zmen", szrsrob_dat_akt = "szrsrob_dat_akt", szrsrob_cas_odpovedi = "szrsrob_cas_odpovedi", szrsrob_doruc_adr_cr = "szrsrob_doruc_adr_cr", szrsrob_doruc_adr_ostatni = "szrsrob_doruc_adr_ostatni", robsdad_volny_text = "robsdad_volny_text", robsido_da_adresni_misto_kod = "robsido_da_adresni_misto_kod", pohlavi_txt = "pohlavi_txt", typ_pobytu_txt = "typ_pobytu_txt", misto_naroz_cr_txt = "misto_naroz_cr_txt", okres_naroz_cr_txt = "okres_naroz_cr_txt", misto_naroz_pobvod = "misto_naroz_pobvod", stat_naroz_iszr = "stat_naroz_iszr", stat_obc_iszr = "stat_obc_iszr", stat_obc_iszr_2 = "stat_obc_iszr_2", cislo_op_iszr = "cislo_op_iszr", cislo_op = "cislo_op", rc_lomitko = "rc_lomitko", rocnik = "rocnik", dcd_zobraz = "dcd_zobraz", iszr = "iszr", aifo_txt = "aifo_txt", prihlaseni_zmen_txt = "prihlaseni_zmen_txt", zmena_txt = "zmena_txt", Permissions = "Permissions",}
	const enum GListISZRZUDROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", stat_obc = "Base", mistonar = "Base", okres_naroz = "Base", stat_naroz = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", ref_udaje = "Base", aifo = "Base", dat_akt_iszr = "Base", dat_od = "Base", ixs_ido = "Base", obec = "Base", okres = "Base", ulice = "Base", cd = "Base", castobce = "Base", dcd = "Base", cor = "Base", psc = "Base", pcor = "Base", robsido_adresni_misto_kod = "Base", ixs_adr = "Base", blok_domu = "Base", vchod = "Base", byt = "Base", szrsrob_adresni_misto_kod = "Base", szrsrob_jmeno = "Base", szrsrob_prijmeni = "Base", szrsrob_datum_narozeni = "Base", szrsrob_datum_umrti = "Base", szrsrob_misto_naroz_cr = "Base", szrsrob_misto_nar_obec = "Base", szrsrob_misto_naroz_svet = "Base", szrsrob_prihlaseni_zmen = "Base", szrsrob_dat_akt = "Base", szrsrob_cas_odpovedi = "Base", szrsrob_doruc_adr_cr = "Base", szrsrob_doruc_adr_ostatni = "Base", robsdad_volny_text = "Base", robsido_da_adresni_misto_kod = "Base", pohlavi_txt = "Base", typ_pobytu_txt = "Base", misto_naroz_cr_txt = "Base", okres_naroz_cr_txt = "Base", misto_naroz_pobvod = "Base", stat_naroz_iszr = "Base", stat_obc_iszr = "Base", stat_obc_iszr_2 = "Base", cislo_op_iszr = "Base", cislo_op = "Base", rc_lomitko = "Base", rocnik = "Base", dcd_zobraz = "Base", iszr = "Base", aifo_txt = "Base", prihlaseni_zmen_txt = "Base", zmena_txt = "Base", Permissions = "*",}
	const enum GListISZRZUDROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", stat_obc = "number", mistonar = "string", okres_naroz = "string", stat_naroz = "number", cs_prijmeni = "string", cs_jmeno = "string", ref_udaje = "number", aifo = "string", dat_akt_iszr = "JsonDate", dat_od = "JsonDate", ixs_ido = "string", obec = "string", okres = "string", ulice = "string", cd = "number", castobce = "string", dcd = "string", cor = "number", psc = "string", pcor = "string", robsido_adresni_misto_kod = "number", ixs_adr = "string", blok_domu = "string", vchod = "string", byt = "string", szrsrob_adresni_misto_kod = "number", szrsrob_jmeno = "string", szrsrob_prijmeni = "string", szrsrob_datum_narozeni = "JsonDate", szrsrob_datum_umrti = "JsonDate", szrsrob_misto_naroz_cr = "number", szrsrob_misto_nar_obec = "number", szrsrob_misto_naroz_svet = "string", szrsrob_prihlaseni_zmen = "number", szrsrob_dat_akt = "JsonDate", szrsrob_cas_odpovedi = "JsonDate", szrsrob_doruc_adr_cr = "number", szrsrob_doruc_adr_ostatni = "string", robsdad_volny_text = "string", robsido_da_adresni_misto_kod = "number", pohlavi_txt = "string", typ_pobytu_txt = "string", misto_naroz_cr_txt = "string", okres_naroz_cr_txt = "string", misto_naroz_pobvod = "string", stat_naroz_iszr = "number", stat_obc_iszr = "number", stat_obc_iszr_2 = "number", cislo_op_iszr = "string", cislo_op = "string", rc_lomitko = "string", rocnik = "number", dcd_zobraz = "string", iszr = "string", aifo_txt = "string", prihlaseni_zmen_txt = "string", zmena_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListISZRZUDROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, okres_naroz = 48, cs_prijmeni = 100, cs_jmeno = 100, aifo = 24, ixs_ido = 12, obec = 48, okres = 48, ulice = 48, castobce = 48, dcd = 1, psc = 12, pcor = 1, ixs_adr = 12, blok_domu = 8, vchod = 5, byt = 5, szrsrob_jmeno = 100, szrsrob_prijmeni = 100, szrsrob_misto_naroz_svet = 100, szrsrob_doruc_adr_ostatni = 255,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyRob\GListOsobRopBezOmezeniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro list osob Rop bez omezení*/
	interface GListOsobRopBezOmezeniROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**GObjektAdresaROBDto*/
		AdresaROB?: Gordic.Rob.Interface.GObjektAdresaROBDto|null;
		/**GObjektROBDto*/
		ObjektROB?: Gordic.Rob.Interface.GObjektROBDto|null;
		/**Rč s lomítkem*/
		rc_lomitko?: string|null;
		/**dcd_zobraz*/
		dcd_zobraz?: string|null;
	}
	const enum GListOsobRopBezOmezeniROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", tit_pred = "tit_pred", tit_za = "tit_za", dat_naroz = "dat_naroz", stav_oso = "stav_oso", AdresaROB = "AdresaROB", ObjektROB = "ObjektROB", rc_lomitko = "rc_lomitko", dcd_zobraz = "dcd_zobraz", Permissions = "Permissions",}
	const enum GListOsobRopBezOmezeniROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", tit_pred = "Base", tit_za = "Base", dat_naroz = "Base", stav_oso = "Base", AdresaROB = "ADRESAROB", ObjektROB = "OBJEKTROB", rc_lomitko = "Base", dcd_zobraz = "Base", Permissions = "*",}
	const enum GListOsobRopBezOmezeniROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", tit_pred = "string", tit_za = "string", dat_naroz = "JsonDate", stav_oso = "number", AdresaROB = "Gordic.Rob.Interface.GObjektAdresaROBDto", ObjektROB = "Gordic.Rob.Interface.GObjektROBDto", rc_lomitko = "string", dcd_zobraz = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListOsobRopBezOmezeniROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, tit_pred = 35, tit_za = 35,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyRob\GListOsobyRopROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro List Osoby Rop*/
	interface GListOsobyRopROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Příjmení*/
		cs_prijmeni?: string|null;
		/**Jméno*/
		cs_jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Typ státního občanství*/
		kval_st_obc?: number|null;
		/**Státní občanství*/
		stat_obc?: number|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**Národnost*/
		narodnost?: string|null;
		/**Okres narození*/
		okres_naroz?: string|null;
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**Rodinný stav*/
		rod_stav?: number|null;
		/**Svéprávnost*/
		z_z?: number|null;
		/**Vzdělání*/
		vzdelani?: number|null;
		/**Ekonomická aktivita*/
		ekon_aktivita?: number|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Volební právo*/
		volebni_pravo?: number|null;
		/**DBCOLUMN:robsoso.ref_udaje*/
		ref_udaje?: number|null;
		/**Aifo*/
		aifo?: string|null;
		/**Datum aktualizace ISZR*/
		dat_akt_iszr?: JsonDate|null;
		/**Datum od*/
		dat_od?: JsonDate|null;
		/**Datum do*/
		dat_do?: JsonDate|null;
		/**Identifikátor adresy*/
		ixs_adr?: string|null;
		/**Blok Domu*/
		blok_domu?: string|null;
		/**Vchod*/
		vchod?: string|null;
		/**Byt*/
		byt?: string|null;
		ixs_ido?: string|null;
		/**GObjektROBDto*/
		ObjektROB?: Gordic.Rob.Interface.GObjektROBDto|null;
		/**GObjektROBDto*/
		BydlisteROB?: Gordic.Rob.Interface.GOsobaBydlisteROBDto|null;
		/**GObjektROBDto*/
		AdresaROB?: Gordic.Rob.Interface.GObjektAdresaROBDto|null;
		/**Přihlášení změn*/
		prihlaseni_zmen?: number|null;
		/**Agenda*/
		agenda?: string|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Stav osoby textově*/
		stav_oso_txt?: string|null;
		/**Pohlaví stav textově*/
		pohlavi_txt?: string|null;
		/**Kategorie obyvatele textově*/
		ktg_obyv_txt?: string|null;
		/**dat_naroz_txt*/
		dat_naroz_txt?: string|null;
		/**dat_od_txt*/
		dat_od_txt?: string|null;
		/**dcd_zobraz*/
		dcd_zobraz?: string|null;
		/**Ročník*/
		rocnik?: number|null;
		/**Věk*/
		vek?: number|null;
		/**Iszr*/
		iszr?: string|null;
		/**Aifo textově*/
		aifo_txt?: string|null;
		/**prihlaseni_zmen_txt*/
		prihlaseni_zmen_txt?: string|null;
		/**rc_lomitko*/
		rc_lomitko?: string|null;
	}
	const enum GListOsobyRopROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", kval_st_obc = "kval_st_obc", stat_obc = "stat_obc", mistonar = "mistonar", narodnost = "narodnost", okres_naroz = "okres_naroz", typ_pobytu = "typ_pobytu", rod_stav = "rod_stav", z_z = "z_z", vzdelani = "vzdelani", ekon_aktivita = "ekon_aktivita", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", poznamka = "poznamka", volebni_pravo = "volebni_pravo", ref_udaje = "ref_udaje", aifo = "aifo", dat_akt_iszr = "dat_akt_iszr", dat_od = "dat_od", dat_do = "dat_do", ixs_adr = "ixs_adr", blok_domu = "blok_domu", vchod = "vchod", byt = "byt", ixs_ido = "ixs_ido", ObjektROB = "ObjektROB", BydlisteROB = "BydlisteROB", AdresaROB = "AdresaROB", prihlaseni_zmen = "prihlaseni_zmen", agenda = "agenda", typ_pobytu_txt = "typ_pobytu_txt", stav_oso_txt = "stav_oso_txt", pohlavi_txt = "pohlavi_txt", ktg_obyv_txt = "ktg_obyv_txt", dat_naroz_txt = "dat_naroz_txt", dat_od_txt = "dat_od_txt", dcd_zobraz = "dcd_zobraz", rocnik = "rocnik", vek = "vek", iszr = "iszr", aifo_txt = "aifo_txt", prihlaseni_zmen_txt = "prihlaseni_zmen_txt", rc_lomitko = "rc_lomitko", Permissions = "Permissions",}
	const enum GListOsobyRopROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", kval_st_obc = "Base", stat_obc = "Base", mistonar = "Base", narodnost = "Base", okres_naroz = "Base", typ_pobytu = "Base", rod_stav = "Base", z_z = "Base", vzdelani = "Base", ekon_aktivita = "Base", ktg_obyv = "Base", stav_oso = "Base", poznamka = "Base", volebni_pravo = "Base", ref_udaje = "Base", aifo = "Base", dat_akt_iszr = "Base", dat_od = "Base", dat_do = "Base", ixs_adr = "Base", blok_domu = "Base", vchod = "Base", byt = "Base", ixs_ido = "Base", ObjektROB = "OBJEKTROB", BydlisteROB = "*", AdresaROB = "*", prihlaseni_zmen = "Base", agenda = "Base", typ_pobytu_txt = "Base", stav_oso_txt = "Base", pohlavi_txt = "Base", ktg_obyv_txt = "Base", dat_naroz_txt = "Base", dat_od_txt = "Base", dcd_zobraz = "Base", rocnik = "Base", vek = "Base", iszr = "Base", aifo_txt = "Base", prihlaseni_zmen_txt = "Base", rc_lomitko = "Base", Permissions = "*",}
	const enum GListOsobyRopROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", cs_prijmeni = "string", cs_jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", kval_st_obc = "number", stat_obc = "number", mistonar = "string", narodnost = "string", okres_naroz = "string", typ_pobytu = "number", rod_stav = "number", z_z = "number", vzdelani = "number", ekon_aktivita = "number", ktg_obyv = "number", stav_oso = "number", poznamka = "string", volebni_pravo = "number", ref_udaje = "number", aifo = "string", dat_akt_iszr = "JsonDate", dat_od = "JsonDate", dat_do = "JsonDate", ixs_adr = "string", blok_domu = "string", vchod = "string", byt = "string", ixs_ido = "string", ObjektROB = "Gordic.Rob.Interface.GObjektROBDto", BydlisteROB = "Gordic.Rob.Interface.GOsobaBydlisteROBDto", AdresaROB = "Gordic.Rob.Interface.GObjektAdresaROBDto", prihlaseni_zmen = "number", agenda = "string", typ_pobytu_txt = "string", stav_oso_txt = "string", pohlavi_txt = "string", ktg_obyv_txt = "string", dat_naroz_txt = "string", dat_od_txt = "string", dcd_zobraz = "string", rocnik = "number", vek = "number", iszr = "string", aifo_txt = "string", prihlaseni_zmen_txt = "string", rc_lomitko = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListOsobyRopROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, cs_prijmeni = 100, cs_jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, narodnost = 20, okres_naroz = 48, poznamka = 50, aifo = 24, ixs_adr = 12, blok_domu = 8, vchod = 5, byt = 5, agenda = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyRob\GListServisCelaEvidenceROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro list celé evidence servis*/
	interface GListServisCelaEvidenceROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo*/
		rc?: string|null;
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Rodné příjmení*/
		rodprij?: string|null;
		/**Titul před jménem*/
		tit_pred?: string|null;
		/**Titul za jménem*/
		tit_za?: string|null;
		/**Pohlaví*/
		pohlavi?: number|null;
		/**Datum narození*/
		dat_naroz?: JsonDate|null;
		/**Místo narození*/
		mistonar?: string|null;
		/**Okres narození*/
		okres_naroz?: string|null;
		/**Stát narození*/
		stat_naroz?: number|null;
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**Rodinný stav*/
		rod_stav?: number|null;
		/**Kategorie obyvatele*/
		ktg_obyv?: number|null;
		/**Stav osoby*/
		stav_oso?: number|null;
		/**DBCOLUMN:robsoso.cs_prijmeni*/
		cs_prijmeni?: string|null;
		/**DBCOLUMN:robsoso.cs_jmeno*/
		cs_jmeno?: string|null;
		/**Typ pobytu textově*/
		typ_pobytu_txt?: string|null;
		/**Rc s lomítkem*/
		rc_lomitko?: string|null;
		/**robsbyd_pocet*/
		robsbyd_pocet?: number|null;
		/**otec_pocet*/
		otec_pocet?: number|null;
		/**matka_pocet*/
		matka_pocet?: number|null;
		/**partner_pocet*/
		partner_pocet?: number|null;
		/**Ročník*/
		rocnik?: number|null;
	}
	const enum GListServisCelaEvidenceROBDtoNames { ixs_oso = "ixs_oso", rc = "rc", prijmeni = "prijmeni", jmeno = "jmeno", rodprij = "rodprij", tit_pred = "tit_pred", tit_za = "tit_za", pohlavi = "pohlavi", dat_naroz = "dat_naroz", mistonar = "mistonar", okres_naroz = "okres_naroz", stat_naroz = "stat_naroz", typ_pobytu = "typ_pobytu", rod_stav = "rod_stav", ktg_obyv = "ktg_obyv", stav_oso = "stav_oso", cs_prijmeni = "cs_prijmeni", cs_jmeno = "cs_jmeno", typ_pobytu_txt = "typ_pobytu_txt", rc_lomitko = "rc_lomitko", robsbyd_pocet = "robsbyd_pocet", otec_pocet = "otec_pocet", matka_pocet = "matka_pocet", partner_pocet = "partner_pocet", rocnik = "rocnik", Permissions = "Permissions",}
	const enum GListServisCelaEvidenceROBDtoFragments { ixs_oso = "Base", rc = "Base", prijmeni = "Base", jmeno = "Base", rodprij = "Base", tit_pred = "Base", tit_za = "Base", pohlavi = "Base", dat_naroz = "Base", mistonar = "Base", okres_naroz = "Base", stat_naroz = "Base", typ_pobytu = "Base", rod_stav = "Base", ktg_obyv = "Base", stav_oso = "Base", cs_prijmeni = "Base", cs_jmeno = "Base", typ_pobytu_txt = "Base", rc_lomitko = "Base", robsbyd_pocet = "Base", otec_pocet = "Base", matka_pocet = "Base", partner_pocet = "Base", rocnik = "Base", Permissions = "*",}
	const enum GListServisCelaEvidenceROBDtoTypes { ixs_oso = "string", rc = "string", prijmeni = "string", jmeno = "string", rodprij = "string", tit_pred = "string", tit_za = "string", pohlavi = "number", dat_naroz = "JsonDate", mistonar = "string", okres_naroz = "string", stat_naroz = "number", typ_pobytu = "number", rod_stav = "number", ktg_obyv = "number", stav_oso = "number", cs_prijmeni = "string", cs_jmeno = "string", typ_pobytu_txt = "string", rc_lomitko = "string", robsbyd_pocet = "number", otec_pocet = "number", matka_pocet = "number", partner_pocet = "number", rocnik = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListServisCelaEvidenceROBDtoTypeLengths { ixs_oso = 12, rc = 10, prijmeni = 100, jmeno = 100, rodprij = 100, tit_pred = 35, tit_za = 35, mistonar = 60, okres_naroz = 48, cs_prijmeni = 100, cs_jmeno = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyUdalosti\GListUdalostiNarozeniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**List událost narození*/
	interface GListUdalostiNarozeniROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor události*/
		ixs_uda?: string|null;
		/**Typ události*/
		typ_uda?: number|null;
		/**Datum události*/
		dat_uda?: JsonDate|null;
		/**Místo události*/
		misto_uda?: string|null;
		/**DBCOLUMN:robsuda.dat_zap_eo*/
		dat_zap_eo?: JsonDate|null;
		/**Rodné číslo*/
		robduda_rc?: string|null;
		/**Příjmení*/
		robduda_prijmeni?: string|null;
		/**Jméno*/
		robduda_jmeno?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Pohlaví*/
		robduda_pohlavi?: number|null;
		/**Identifikátor osoby otec*/
		ixs_oso_otec?: string|null;
		/**Rodné číslo otec*/
		rc_otec?: string|null;
		/**Rodné číslo s lomítkem otec*/
		rc_otec_lomitko?: string|null;
		/**Příjmení otec*/
		prijmeni_otec?: string|null;
		/**Jméno otec*/
		jmeno_otec?: string|null;
		/**Datum narození otec*/
		dat_naroz_otec?: JsonDate|null;
		/**pocet_otec*/
		pocet_otec?: number|null;
		/**Identifikátor osoby matka*/
		ixs_oso_matka?: string|null;
		/**Rodné číslo matka*/
		rc_matka?: string|null;
		/**Rodné číslo s lomítkem matka*/
		rc_matka_lomitko?: string|null;
		/**Příjmení matka*/
		prijmeni_matka?: string|null;
		/**Jméno matka*/
		jmeno_matka?: string|null;
		/**Datum narození matka*/
		dat_naroz_matka?: JsonDate|null;
		/**pocet_matka*/
		pocet_matka?: number|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		robsido_castobce?: string|null;
		/**Ulice*/
		robsido_ulice?: string|null;
		/**Domovní číslo*/
		robsido_cd?: number|null;
		/**DBCOLUMN:robsido.cor*/
		robsido_cor?: number|null;
		/**DBCOLUMN:robsido.pcor*/
		robsido_pcor?: string|null;
		/**Rodné číslo s lomítkem*/
		rc_lomitko?: string|null;
	}
	const enum GListUdalostiNarozeniROBDtoNames { ixs_uda = "ixs_uda", typ_uda = "typ_uda", dat_uda = "dat_uda", misto_uda = "misto_uda", dat_zap_eo = "dat_zap_eo", robduda_rc = "robduda_rc", robduda_prijmeni = "robduda_prijmeni", robduda_jmeno = "robduda_jmeno", ixs_oso = "ixs_oso", robduda_pohlavi = "robduda_pohlavi", ixs_oso_otec = "ixs_oso_otec", rc_otec = "rc_otec", rc_otec_lomitko = "rc_otec_lomitko", prijmeni_otec = "prijmeni_otec", jmeno_otec = "jmeno_otec", dat_naroz_otec = "dat_naroz_otec", pocet_otec = "pocet_otec", ixs_oso_matka = "ixs_oso_matka", rc_matka = "rc_matka", rc_matka_lomitko = "rc_matka_lomitko", prijmeni_matka = "prijmeni_matka", jmeno_matka = "jmeno_matka", dat_naroz_matka = "dat_naroz_matka", pocet_matka = "pocet_matka", obec = "obec", robsido_castobce = "robsido_castobce", robsido_ulice = "robsido_ulice", robsido_cd = "robsido_cd", robsido_cor = "robsido_cor", robsido_pcor = "robsido_pcor", rc_lomitko = "rc_lomitko", Permissions = "Permissions",}
	const enum GListUdalostiNarozeniROBDtoFragments { ixs_uda = "Base", typ_uda = "Base", dat_uda = "Base", misto_uda = "Base", dat_zap_eo = "Base", robduda_rc = "Base", robduda_prijmeni = "Base", robduda_jmeno = "Base", ixs_oso = "Base", robduda_pohlavi = "Base", ixs_oso_otec = "Base", rc_otec = "Base", rc_otec_lomitko = "Base", prijmeni_otec = "Base", jmeno_otec = "Base", dat_naroz_otec = "Base", pocet_otec = "Base", ixs_oso_matka = "Base", rc_matka = "Base", rc_matka_lomitko = "Base", prijmeni_matka = "Base", jmeno_matka = "Base", dat_naroz_matka = "Base", pocet_matka = "Base", obec = "Base", robsido_castobce = "Base", robsido_ulice = "Base", robsido_cd = "Base", robsido_cor = "Base", robsido_pcor = "Base", rc_lomitko = "Base", Permissions = "*",}
	const enum GListUdalostiNarozeniROBDtoTypes { ixs_uda = "string", typ_uda = "number", dat_uda = "JsonDate", misto_uda = "string", dat_zap_eo = "JsonDate", robduda_rc = "string", robduda_prijmeni = "string", robduda_jmeno = "string", ixs_oso = "string", robduda_pohlavi = "number", ixs_oso_otec = "string", rc_otec = "string", rc_otec_lomitko = "string", prijmeni_otec = "string", jmeno_otec = "string", dat_naroz_otec = "JsonDate", pocet_otec = "number", ixs_oso_matka = "string", rc_matka = "string", rc_matka_lomitko = "string", prijmeni_matka = "string", jmeno_matka = "string", dat_naroz_matka = "JsonDate", pocet_matka = "number", obec = "string", robsido_castobce = "string", robsido_ulice = "string", robsido_cd = "number", robsido_cor = "number", robsido_pcor = "string", rc_lomitko = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListUdalostiNarozeniROBDtoTypeLengths { ixs_uda = 12, misto_uda = 100, robduda_rc = 100, robduda_prijmeni = 100, robduda_jmeno = 100, ixs_oso = 12, ixs_oso_otec = 12, rc_otec = 10, prijmeni_otec = 100, jmeno_otec = 100, ixs_oso_matka = 12, rc_matka = 10, prijmeni_matka = 100, jmeno_matka = 100, obec = 48, robsido_castobce = 48, robsido_ulice = 48, robsido_pcor = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyUdalosti\GListUdalostiPrijmeniJmenoROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**List událost změna příjmení nebo jména*/
	interface GListUdalostiPrijmeniJmenoROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor události*/
		ixs_uda?: string|null;
		/**Typ události*/
		typ_uda?: number|null;
		/**Datum události*/
		dat_uda?: JsonDate|null;
		/**DBCOLUMN:robsuda.dat_zap_eo*/
		dat_zap_eo?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Rodné číslo*/
		robduda_rc?: string|null;
		/**Příjmení*/
		robduda_prijmeni?: string|null;
		/**Jméno*/
		robduda_jmeno?: string|null;
		/**Nové příjmení*/
		robduda_nove_prijmeni?: string|null;
		/**Nové jméno*/
		robduda_nove_jmeno?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo s lomítkem*/
		rc_lomitko?: string|null;
	}
	const enum GListUdalostiPrijmeniJmenoROBDtoNames { ixs_uda = "ixs_uda", typ_uda = "typ_uda", dat_uda = "dat_uda", dat_zap_eo = "dat_zap_eo", poznamka = "poznamka", robduda_rc = "robduda_rc", robduda_prijmeni = "robduda_prijmeni", robduda_jmeno = "robduda_jmeno", robduda_nove_prijmeni = "robduda_nove_prijmeni", robduda_nove_jmeno = "robduda_nove_jmeno", ixs_oso = "ixs_oso", rc_lomitko = "rc_lomitko", Permissions = "Permissions",}
	const enum GListUdalostiPrijmeniJmenoROBDtoFragments { ixs_uda = "Base", typ_uda = "Base", dat_uda = "Base", dat_zap_eo = "Base", poznamka = "Base", robduda_rc = "Base", robduda_prijmeni = "Base", robduda_jmeno = "Base", robduda_nove_prijmeni = "Base", robduda_nove_jmeno = "Base", ixs_oso = "Base", rc_lomitko = "Base", Permissions = "*",}
	const enum GListUdalostiPrijmeniJmenoROBDtoTypes { ixs_uda = "string", typ_uda = "number", dat_uda = "JsonDate", dat_zap_eo = "JsonDate", poznamka = "string", robduda_rc = "string", robduda_prijmeni = "string", robduda_jmeno = "string", robduda_nove_prijmeni = "string", robduda_nove_jmeno = "string", ixs_oso = "string", rc_lomitko = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListUdalostiPrijmeniJmenoROBDtoTypeLengths { ixs_uda = 12, poznamka = 254, robduda_rc = 100, robduda_prijmeni = 100, robduda_jmeno = 100, robduda_nove_prijmeni = 100, robduda_nove_jmeno = 100, ixs_oso = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyUdalosti\GListUdalostiROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	interface GListUdalostiROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor události*/
		ixs?: string|null;
		/**Datum události*/
		dat_uda?: JsonDate|null;
		/**Typ události*/
		typ_uda?: number|null;
		/**Typ události textově*/
		typ_uda_txt?: string|null;
		/**Popis události*/
		popis_uda?: string|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Název referenta*/
		nazev_rf?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**DBCOLUMN:robsido.cd*/
		cd?: number|null;
		/**DBCOLUMN:robsido.cor*/
		cor?: number|null;
		/**Typ pobytu*/
		typ_pobytu?: number|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GListUdalostiROBDtoNames { ixs = "ixs", dat_uda = "dat_uda", typ_uda = "typ_uda", typ_uda_txt = "typ_uda_txt", popis_uda = "popis_uda", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", obec = "obec", castobce = "castobce", ulice = "ulice", cd = "cd", cor = "cor", typ_pobytu = "typ_pobytu", Zmena = "Zmena", Permissions = "Permissions",}
	const enum GListUdalostiROBDtoFragments { ixs = "Base", dat_uda = "Base", typ_uda = "Base", typ_uda_txt = "Base", popis_uda = "Base", zmenu_prov = "Base", nazev_rf = "Base", obec = "Base", castobce = "Base", ulice = "Base", cd = "Base", cor = "Base", typ_pobytu = "Base", Zmena = "ZMENA", Permissions = "*",}
	const enum GListUdalostiROBDtoTypes { ixs = "string", dat_uda = "JsonDate", typ_uda = "number", typ_uda_txt = "string", popis_uda = "string", zmenu_prov = "string", nazev_rf = "string", obec = "string", castobce = "string", ulice = "string", cd = "number", cor = "number", typ_pobytu = "number", Zmena = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListUdalostiROBDtoTypeLengths { ixs = 12, typ_uda_txt = 254, popis_uda = 50, zmenu_prov = 12, nazev_rf = 254, obec = 48, castobce = 48, ulice = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyUdalosti\GListUdalostiSnatekRozvodROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**List událost sňatek / rozvod*/
	interface GListUdalostiSnatekRozvodROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor události*/
		ixs_uda?: string|null;
		/**Typ události*/
		typ_uda?: number|null;
		/**Datum události*/
		dat_uda?: JsonDate|null;
		/**Místo události*/
		misto_uda?: string|null;
		/**DBCOLUMN:robsuda.dat_zap_eo*/
		dat_zap_eo?: JsonDate|null;
		/**DBCOLUMN:robsuda.cj_rozh*/
		cj_rozh?: string|null;
		/**Datum právní moci*/
		dat_prav_moc?: JsonDate|null;
		/**Rodné číslo ženich*/
		zenich_rc?: string|null;
		/**Příjmení ženich*/
		zenich_prijmeni?: string|null;
		/**Jméno ženich*/
		zenich_jmeno?: string|null;
		/**Identifikátor osoby ženich*/
		zenich_ixs_oso?: string|null;
		/**Titul před jménem ženich*/
		zenich_titul_pred?: string|null;
		/**Titul za jménem ženich*/
		zenich_titul_za?: string|null;
		/**Datum narození ženich*/
		zenich_dat_nar?: JsonDate|null;
		/**Rodné číslo s lomítkem ženich*/
		zenich_rc_lomitko?: string|null;
		/**Rodné číslo nevěsta*/
		nevesta_rc?: string|null;
		/**Příjmení nevěsta*/
		nevesta_prijmeni?: string|null;
		/**Jméno nevěsta*/
		nevesta_jmeno?: string|null;
		/**Identifikátor osoby nevěsta*/
		nevesta_ixs_oso?: string|null;
		/**Titul před jménem nevěsta*/
		nevesta_titul_pred?: string|null;
		/**Titul za jménem nevěsta*/
		nevesta_titul_za?: string|null;
		/**Datum narození nevěsta*/
		nevesta_dat_nar?: JsonDate|null;
		/**Rodné číslo s lomítkem nevěsta*/
		nevesta_rc_lomitko?: string|null;
	}
	const enum GListUdalostiSnatekRozvodROBDtoNames { ixs_uda = "ixs_uda", typ_uda = "typ_uda", dat_uda = "dat_uda", misto_uda = "misto_uda", dat_zap_eo = "dat_zap_eo", cj_rozh = "cj_rozh", dat_prav_moc = "dat_prav_moc", zenich_rc = "zenich_rc", zenich_prijmeni = "zenich_prijmeni", zenich_jmeno = "zenich_jmeno", zenich_ixs_oso = "zenich_ixs_oso", zenich_titul_pred = "zenich_titul_pred", zenich_titul_za = "zenich_titul_za", zenich_dat_nar = "zenich_dat_nar", zenich_rc_lomitko = "zenich_rc_lomitko", nevesta_rc = "nevesta_rc", nevesta_prijmeni = "nevesta_prijmeni", nevesta_jmeno = "nevesta_jmeno", nevesta_ixs_oso = "nevesta_ixs_oso", nevesta_titul_pred = "nevesta_titul_pred", nevesta_titul_za = "nevesta_titul_za", nevesta_dat_nar = "nevesta_dat_nar", nevesta_rc_lomitko = "nevesta_rc_lomitko", Permissions = "Permissions",}
	const enum GListUdalostiSnatekRozvodROBDtoFragments { ixs_uda = "Base", typ_uda = "Base", dat_uda = "Base", misto_uda = "Base", dat_zap_eo = "Base", cj_rozh = "Base", dat_prav_moc = "Base", zenich_rc = "Base", zenich_prijmeni = "Base", zenich_jmeno = "Base", zenich_ixs_oso = "Base", zenich_titul_pred = "Base", zenich_titul_za = "Base", zenich_dat_nar = "Base", zenich_rc_lomitko = "Base", nevesta_rc = "Base", nevesta_prijmeni = "Base", nevesta_jmeno = "Base", nevesta_ixs_oso = "Base", nevesta_titul_pred = "Base", nevesta_titul_za = "Base", nevesta_dat_nar = "Base", nevesta_rc_lomitko = "Base", Permissions = "*",}
	const enum GListUdalostiSnatekRozvodROBDtoTypes { ixs_uda = "string", typ_uda = "number", dat_uda = "JsonDate", misto_uda = "string", dat_zap_eo = "JsonDate", cj_rozh = "string", dat_prav_moc = "JsonDate", zenich_rc = "string", zenich_prijmeni = "string", zenich_jmeno = "string", zenich_ixs_oso = "string", zenich_titul_pred = "string", zenich_titul_za = "string", zenich_dat_nar = "JsonDate", zenich_rc_lomitko = "string", nevesta_rc = "string", nevesta_prijmeni = "string", nevesta_jmeno = "string", nevesta_ixs_oso = "string", nevesta_titul_pred = "string", nevesta_titul_za = "string", nevesta_dat_nar = "JsonDate", nevesta_rc_lomitko = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListUdalostiSnatekRozvodROBDtoTypeLengths { ixs_uda = 12, misto_uda = 100, cj_rozh = 100, zenich_rc = 100, zenich_prijmeni = 100, zenich_jmeno = 100, zenich_ixs_oso = 12, zenich_titul_pred = 35, zenich_titul_za = 35, nevesta_rc = 100, nevesta_prijmeni = 100, nevesta_jmeno = 100, nevesta_ixs_oso = 12, nevesta_titul_pred = 35, nevesta_titul_za = 35,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyUdalosti\GListUdalostiUmrtiROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**List událost úmrtí*/
	interface GListUdalostiUmrtiROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor události*/
		ixs_uda?: string|null;
		/**Typ události*/
		typ_uda?: number|null;
		/**Datum události*/
		dat_uda?: JsonDate|null;
		/**Místo události*/
		misto_uda?: string|null;
		/**Datum zápisu*/
		dat_zapis?: JsonDate|null;
		/**DBCOLUMN:robsuda.dat_zap_eo*/
		dat_zap_eo?: JsonDate|null;
		/**Rodné číslo*/
		robduda_rc?: string|null;
		/**Datum narození*/
		robduda_dat_nar?: JsonDate|null;
		/**Titul před jménem*/
		robduda_titul_pred?: string|null;
		/**Příjmení*/
		robduda_prijmeni?: string|null;
		/**Jméno*/
		robduda_jmeno?: string|null;
		/**Titul za jménem*/
		robduda_titul_za?: string|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Pohlaví*/
		robduda_pohlavi?: number|null;
		/**Typ pobytu*/
		robsoso_typ_pobytu?: number|null;
		robsoso_pocet?: number|null;
		robsoso_pocet_mrtva?: number|null;
		robsido_pocet_tp?: number|null;
		/**Část obce*/
		robsido_castobce?: string|null;
		/**Ulice*/
		robsido_ulice?: string|null;
		/**Domovní číslo*/
		robsido_cd?: number|null;
		/**DBCOLUMN:robsido.cor*/
		robsido_cor?: number|null;
		/**DBCOLUMN:robsido.pcor*/
		robsido_pcor?: string|null;
		/**Rodné číslo s lomítkem*/
		rc_lomitko?: string|null;
	}
	const enum GListUdalostiUmrtiROBDtoNames { ixs_uda = "ixs_uda", typ_uda = "typ_uda", dat_uda = "dat_uda", misto_uda = "misto_uda", dat_zapis = "dat_zapis", dat_zap_eo = "dat_zap_eo", robduda_rc = "robduda_rc", robduda_dat_nar = "robduda_dat_nar", robduda_titul_pred = "robduda_titul_pred", robduda_prijmeni = "robduda_prijmeni", robduda_jmeno = "robduda_jmeno", robduda_titul_za = "robduda_titul_za", ixs_oso = "ixs_oso", robduda_pohlavi = "robduda_pohlavi", robsoso_typ_pobytu = "robsoso_typ_pobytu", robsoso_pocet = "robsoso_pocet", robsoso_pocet_mrtva = "robsoso_pocet_mrtva", robsido_pocet_tp = "robsido_pocet_tp", robsido_castobce = "robsido_castobce", robsido_ulice = "robsido_ulice", robsido_cd = "robsido_cd", robsido_cor = "robsido_cor", robsido_pcor = "robsido_pcor", rc_lomitko = "rc_lomitko", Permissions = "Permissions",}
	const enum GListUdalostiUmrtiROBDtoFragments { ixs_uda = "Base", typ_uda = "Base", dat_uda = "Base", misto_uda = "Base", dat_zapis = "Base", dat_zap_eo = "Base", robduda_rc = "Base", robduda_dat_nar = "Base", robduda_titul_pred = "Base", robduda_prijmeni = "Base", robduda_jmeno = "Base", robduda_titul_za = "Base", ixs_oso = "Base", robduda_pohlavi = "Base", robsoso_typ_pobytu = "Base", robsoso_pocet = "Base", robsoso_pocet_mrtva = "Base", robsido_pocet_tp = "Base", robsido_castobce = "Base", robsido_ulice = "Base", robsido_cd = "Base", robsido_cor = "Base", robsido_pcor = "Base", rc_lomitko = "Base", Permissions = "*",}
	const enum GListUdalostiUmrtiROBDtoTypes { ixs_uda = "string", typ_uda = "number", dat_uda = "JsonDate", misto_uda = "string", dat_zapis = "JsonDate", dat_zap_eo = "JsonDate", robduda_rc = "string", robduda_dat_nar = "JsonDate", robduda_titul_pred = "string", robduda_prijmeni = "string", robduda_jmeno = "string", robduda_titul_za = "string", ixs_oso = "string", robduda_pohlavi = "number", robsoso_typ_pobytu = "number", robsoso_pocet = "number", robsoso_pocet_mrtva = "number", robsido_pocet_tp = "number", robsido_castobce = "string", robsido_ulice = "string", robsido_cd = "number", robsido_cor = "number", robsido_pcor = "string", rc_lomitko = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListUdalostiUmrtiROBDtoTypeLengths { ixs_uda = 12, misto_uda = 100, robduda_rc = 100, robduda_titul_pred = 35, robduda_prijmeni = 100, robduda_jmeno = 100, robduda_titul_za = 35, ixs_oso = 12, robsido_castobce = 48, robsido_ulice = 48, robsido_pcor = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\SeznamyUdalosti\GListUdalostiZmenyPobytuROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**List změny pobytu*/
	interface GListUdalostiZmenyPobytuROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**DBCOLUMN:robsbyd.ixs_byd_nad*/
		ixs_byd_nad?: string|null;
		/**Datum od*/
		robsbyd_dat_od?: JsonDate|null;
		/**Stav bydliště*/
		robsbyd_stav_bydl?: number|null;
		/**DBCOLUMN:robsbyd.dat_prov*/
		robsbyd_dat_prov?: JsonDate|null;
		/**Stav bydliště*/
		robsbyd_old_stav_bydl?: number|null;
		/**Rodné číslo*/
		robsoso_rc?: string|null;
		/**Příjmení*/
		robsoso_prijmeni?: string|null;
		/**Jméno*/
		robsoso_jmeno?: string|null;
		/**Titul před jménem*/
		robsoso_tit_pred?: string|null;
		/**Titul za jménem*/
		robsoso_tit_za?: string|null;
		/**Datum narození*/
		robsoso_dat_naroz?: JsonDate|null;
		/**Stav osoby*/
		robsoso_stav_oso?: number|null;
		/**Pohlaví*/
		robsoso_pohlavi?: number|null;
		/**Identifikátor osoby*/
		ixs_oso?: string|null;
		/**Rodné číslo s lomítkem*/
		rc_lomitko?: string|null;
		/**Stav bydliště textově*/
		robcstb_stav_bydl_txt?: string|null;
		/**Okres*/
		robsido_okres?: string|null;
		/**Obec*/
		robsido_obec?: string|null;
		/**Ulice*/
		robsido_ulice?: string|null;
		/**Domovní číslo*/
		robsido_cd?: number|null;
		/**Část obce*/
		robsido_castobce?: string|null;
		/**DBCOLUMN:robsido.dcd*/
		robsido_dcd?: string|null;
		/**DBCOLUMN:robsido.cor*/
		robsido_cor?: number|null;
		/**DBCOLUMN:robsido.pcor*/
		robsido_pcor?: string|null;
		/**Psč*/
		robsido_psc?: string|null;
		/**Okres*/
		robsido_new_okres?: string|null;
		/**Obec*/
		robsido_new_obec?: string|null;
		/**Ulice*/
		robsido_new_ulice?: string|null;
		/**Domovní číslo*/
		robsido_new_cd?: number|null;
		/**Část obce*/
		robsido_new_castobce?: string|null;
		/**DBCOLUMN:robsido.dcd*/
		robsido_new_dcd?: string|null;
		/**DBCOLUMN:robsido.cor*/
		robsido_new_cor?: number|null;
		/**DBCOLUMN:robsido.pcor*/
		robsido_new_pcor?: string|null;
		/**Psč*/
		robsido_new_psc?: string|null;
		/**Rodné číslo s lomítkem*/
		adresa?: string|null;
		/**Rodné číslo s lomítkem*/
		adresa_new?: string|null;
		/**Stav bydliště textově*/
		stav_bydl_text?: string|null;
	}
	const enum GListUdalostiZmenyPobytuROBDtoNames { ixs_byd_nad = "ixs_byd_nad", robsbyd_dat_od = "robsbyd_dat_od", robsbyd_stav_bydl = "robsbyd_stav_bydl", robsbyd_dat_prov = "robsbyd_dat_prov", robsbyd_old_stav_bydl = "robsbyd_old_stav_bydl", robsoso_rc = "robsoso_rc", robsoso_prijmeni = "robsoso_prijmeni", robsoso_jmeno = "robsoso_jmeno", robsoso_tit_pred = "robsoso_tit_pred", robsoso_tit_za = "robsoso_tit_za", robsoso_dat_naroz = "robsoso_dat_naroz", robsoso_stav_oso = "robsoso_stav_oso", robsoso_pohlavi = "robsoso_pohlavi", ixs_oso = "ixs_oso", rc_lomitko = "rc_lomitko", robcstb_stav_bydl_txt = "robcstb_stav_bydl_txt", robsido_okres = "robsido_okres", robsido_obec = "robsido_obec", robsido_ulice = "robsido_ulice", robsido_cd = "robsido_cd", robsido_castobce = "robsido_castobce", robsido_dcd = "robsido_dcd", robsido_cor = "robsido_cor", robsido_pcor = "robsido_pcor", robsido_psc = "robsido_psc", robsido_new_okres = "robsido_new_okres", robsido_new_obec = "robsido_new_obec", robsido_new_ulice = "robsido_new_ulice", robsido_new_cd = "robsido_new_cd", robsido_new_castobce = "robsido_new_castobce", robsido_new_dcd = "robsido_new_dcd", robsido_new_cor = "robsido_new_cor", robsido_new_pcor = "robsido_new_pcor", robsido_new_psc = "robsido_new_psc", adresa = "adresa", adresa_new = "adresa_new", stav_bydl_text = "stav_bydl_text", Permissions = "Permissions",}
	const enum GListUdalostiZmenyPobytuROBDtoFragments { ixs_byd_nad = "Base", robsbyd_dat_od = "Base", robsbyd_stav_bydl = "Base", robsbyd_dat_prov = "Base", robsbyd_old_stav_bydl = "Base", robsoso_rc = "Base", robsoso_prijmeni = "Base", robsoso_jmeno = "Base", robsoso_tit_pred = "Base", robsoso_tit_za = "Base", robsoso_dat_naroz = "Base", robsoso_stav_oso = "Base", robsoso_pohlavi = "Base", ixs_oso = "Base", rc_lomitko = "Base", robcstb_stav_bydl_txt = "Base", robsido_okres = "Base", robsido_obec = "Base", robsido_ulice = "Base", robsido_cd = "Base", robsido_castobce = "Base", robsido_dcd = "Base", robsido_cor = "Base", robsido_pcor = "Base", robsido_psc = "Base", robsido_new_okres = "Base", robsido_new_obec = "Base", robsido_new_ulice = "Base", robsido_new_cd = "Base", robsido_new_castobce = "Base", robsido_new_dcd = "Base", robsido_new_cor = "Base", robsido_new_pcor = "Base", robsido_new_psc = "Base", adresa = "Base", adresa_new = "Base", stav_bydl_text = "Base", Permissions = "*",}
	const enum GListUdalostiZmenyPobytuROBDtoTypes { ixs_byd_nad = "string", robsbyd_dat_od = "JsonDate", robsbyd_stav_bydl = "number", robsbyd_dat_prov = "JsonDate", robsbyd_old_stav_bydl = "number", robsoso_rc = "string", robsoso_prijmeni = "string", robsoso_jmeno = "string", robsoso_tit_pred = "string", robsoso_tit_za = "string", robsoso_dat_naroz = "JsonDate", robsoso_stav_oso = "number", robsoso_pohlavi = "number", ixs_oso = "string", rc_lomitko = "string", robcstb_stav_bydl_txt = "string", robsido_okres = "string", robsido_obec = "string", robsido_ulice = "string", robsido_cd = "number", robsido_castobce = "string", robsido_dcd = "string", robsido_cor = "number", robsido_pcor = "string", robsido_psc = "string", robsido_new_okres = "string", robsido_new_obec = "string", robsido_new_ulice = "string", robsido_new_cd = "number", robsido_new_castobce = "string", robsido_new_dcd = "string", robsido_new_cor = "number", robsido_new_pcor = "string", robsido_new_psc = "string", adresa = "string", adresa_new = "string", stav_bydl_text = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListUdalostiZmenyPobytuROBDtoTypeLengths { ixs_byd_nad = 12, robsoso_rc = 10, robsoso_prijmeni = 100, robsoso_jmeno = 100, robsoso_tit_pred = 35, robsoso_tit_za = 35, ixs_oso = 12, robcstb_stav_bydl_txt = 50, robsido_okres = 48, robsido_obec = 48, robsido_ulice = 48, robsido_castobce = 48, robsido_dcd = 1, robsido_pcor = 1, robsido_psc = 12, robsido_new_okres = 48, robsido_new_obec = 48, robsido_new_ulice = 48, robsido_new_castobce = 48, robsido_new_dcd = 1, robsido_new_pcor = 1, robsido_new_psc = 12, stav_bydl_text = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaBydlisteROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku bydliště*/
	interface GStatistikaBydlisteROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Identifikátor objektu*/
		ixs_ido?: string|null;
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Druh čísla domovního*/
		dcd?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Druh čísla domovního pro zobrazení*/
		dcd_zobraz?: string|null;
		/**Počet*/
		pocet?: number|null;
	}
	const enum GStatistikaBydlisteROBDtoNames { ixs_ido = "ixs_ido", obec = "obec", castobce = "castobce", ulice = "ulice", cor = "cor", pcor = "pcor", dcd = "dcd", cd = "cd", dcd_zobraz = "dcd_zobraz", pocet = "pocet", Permissions = "Permissions",}
	const enum GStatistikaBydlisteROBDtoFragments { ixs_ido = "Base", obec = "Base", castobce = "Base", ulice = "Base", cor = "Base", pcor = "Base", dcd = "Base", cd = "Base", dcd_zobraz = "Base", pocet = "Base", Permissions = "*",}
	const enum GStatistikaBydlisteROBDtoTypes { ixs_ido = "string", obec = "string", castobce = "string", ulice = "string", cor = "number", pcor = "string", dcd = "string", cd = "number", dcd_zobraz = "string", pocet = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaBydlisteROBDtoTypeLengths { ixs_ido = 12, obec = 48, castobce = 48, ulice = 48, pcor = 1, dcd = 1, dcd_zobraz = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaOstatniROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro ostatní statistiky*/
	interface GStatistikaOstatniROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Popis*/
		popis?: string|null;
		/**Popis další*/
		popis_dalsi?: string|null;
		/**Počet žen*/
		zeny_pocet?: number|null;
		/**Počet mužů*/
		muzi_pocet?: number|null;
		/**Počet dívek*/
		divky_pocet?: number|null;
		/**Počet chlapců*/
		chlapci_pocet?: number|null;
		/**Počet celkem*/
		celkem_pocet?: number|null;
	}
	const enum GStatistikaOstatniROBDtoNames { popis = "popis", popis_dalsi = "popis_dalsi", zeny_pocet = "zeny_pocet", muzi_pocet = "muzi_pocet", divky_pocet = "divky_pocet", chlapci_pocet = "chlapci_pocet", celkem_pocet = "celkem_pocet", Permissions = "Permissions",}
	const enum GStatistikaOstatniROBDtoFragments { popis = "Base", popis_dalsi = "Base", zeny_pocet = "Base", muzi_pocet = "Base", divky_pocet = "Base", chlapci_pocet = "Base", celkem_pocet = "Base", Permissions = "*",}
	const enum GStatistikaOstatniROBDtoTypes { popis = "string", popis_dalsi = "string", zeny_pocet = "number", muzi_pocet = "number", divky_pocet = "number", chlapci_pocet = "number", celkem_pocet = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaOstatniROBDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaPodilObyvatelROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku podíl obyvatel*/
	interface GStatistikaPodilObyvatelROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Rok*/
		rok?: number|null;
		/**V předproduktivním věku*/
		predprod_vek?: number|null;
		/**V produktivním věku*/
		prod_vek?: number|null;
		/**Po produktivním věku*/
		poprod_vek?: number|null;
		/**V předproduktivním věku v procentech*/
		predprod_vek_proc?: JsonDecimal|null;
		/**V produktivním věku v procentech*/
		prod_vek_proc?: JsonDecimal|null;
		/**Po produktivním věku v procentech*/
		poprod_vek_proc?: JsonDecimal|null;
	}
	const enum GStatistikaPodilObyvatelROBDtoNames { rok = "rok", predprod_vek = "predprod_vek", prod_vek = "prod_vek", poprod_vek = "poprod_vek", predprod_vek_proc = "predprod_vek_proc", prod_vek_proc = "prod_vek_proc", poprod_vek_proc = "poprod_vek_proc", Permissions = "Permissions",}
	const enum GStatistikaPodilObyvatelROBDtoFragments { rok = "Base", predprod_vek = "Base", prod_vek = "Base", poprod_vek = "Base", predprod_vek_proc = "Base", prod_vek_proc = "Base", poprod_vek_proc = "Base", Permissions = "*",}
	const enum GStatistikaPodilObyvatelROBDtoTypes { rok = "number", predprod_vek = "number", prod_vek = "number", poprod_vek = "number", predprod_vek_proc = "JsonDecimal", prod_vek_proc = "JsonDecimal", poprod_vek_proc = "JsonDecimal", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaPodilObyvatelROBDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaPodkladProCOROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku podklad CO*/
	interface GStatistikaPodkladProCOROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Položka*/
		polozka?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Počet*/
		pocet?: number|null;
	}
	const enum GStatistikaPodkladProCOROBDtoNames { obec = "obec", castobce = "castobce", polozka = "polozka", nazev = "nazev", pocet = "pocet", Permissions = "Permissions",}
	const enum GStatistikaPodkladProCOROBDtoFragments { obec = "Base", castobce = "Base", polozka = "Base", nazev = "Base", pocet = "Base", Permissions = "*",}
	const enum GStatistikaPodkladProCOROBDtoTypes { obec = "string", castobce = "string", polozka = "number", nazev = "string", pocet = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaPodkladProCOROBDtoTypeLengths { obec = 48, castobce = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaPohybObyvatelROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku pohyb obyvatel*/
	interface GStatistikaPohybObyvatelROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Měsíc*/
		mesic?: string|null;
		/**Pohlaví*/
		pohlavi?: string|null;
		/**Přistěhovaní*/
		pristehovani?: number|null;
		/**Narození*/
		narozeni?: number|null;
		/**Ostěhovaní*/
		odstehovani?: number|null;
		/**Úmrtí*/
		umrti?: number|null;
		/**Přestěhovaní z*/
		prestehovani_z?: number|null;
		/**Přestěhovaní do*/
		prestehovani_do?: number|null;
		/**Počet celkem*/
		celkem_pocet?: number|null;
		/**Stav*/
		stav?: number|null;
	}
	const enum GStatistikaPohybObyvatelROBDtoNames { mesic = "mesic", pohlavi = "pohlavi", pristehovani = "pristehovani", narozeni = "narozeni", odstehovani = "odstehovani", umrti = "umrti", prestehovani_z = "prestehovani_z", prestehovani_do = "prestehovani_do", celkem_pocet = "celkem_pocet", stav = "stav", Permissions = "Permissions",}
	const enum GStatistikaPohybObyvatelROBDtoFragments { mesic = "Base", pohlavi = "Base", pristehovani = "Base", narozeni = "Base", odstehovani = "Base", umrti = "Base", prestehovani_z = "Base", prestehovani_do = "Base", celkem_pocet = "Base", stav = "Base", Permissions = "*",}
	const enum GStatistikaPohybObyvatelROBDtoTypes { mesic = "string", pohlavi = "string", pristehovani = "number", narozeni = "number", odstehovani = "number", umrti = "number", prestehovani_z = "number", prestehovani_do = "number", celkem_pocet = "number", stav = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaPohybObyvatelROBDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaPrijmeniJmenoROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku počtů příjmení a jmen*/
	interface GStatistikaPrijmeniJmenoROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Příjmení*/
		prijmeni?: string|null;
		/**Jméno*/
		jmeno?: string|null;
		/**Počet*/
		pocet?: number|null;
	}
	const enum GStatistikaPrijmeniJmenoROBDtoNames { prijmeni = "prijmeni", jmeno = "jmeno", pocet = "pocet", Permissions = "Permissions",}
	const enum GStatistikaPrijmeniJmenoROBDtoFragments { prijmeni = "Base", jmeno = "Base", pocet = "Base", Permissions = "*",}
	const enum GStatistikaPrijmeniJmenoROBDtoTypes { prijmeni = "string", jmeno = "string", pocet = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaPrijmeniJmenoROBDtoTypeLengths { prijmeni = 100, jmeno = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaStavObyvatelROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku stav obyvatel*/
	interface GStatistikaStavObyvatelROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Obec*/
		obec?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo orientační*/
		cor?: number|null;
		/**Písmeno u čísla orientačního*/
		pcor?: string|null;
		/**Domovní číslo*/
		cd?: number|null;
		/**Druh čísla domovního pro zobrazení*/
		dcd_zobraz?: string|null;
		/**Počet žen*/
		zeny_pocet?: number|null;
		/**Počet mužů*/
		muzi_pocet?: number|null;
		/**Počet celkem*/
		celkem_pocet?: number|null;
	}
	const enum GStatistikaStavObyvatelROBDtoNames { obec = "obec", castobce = "castobce", ulice = "ulice", cor = "cor", pcor = "pcor", cd = "cd", dcd_zobraz = "dcd_zobraz", zeny_pocet = "zeny_pocet", muzi_pocet = "muzi_pocet", celkem_pocet = "celkem_pocet", Permissions = "Permissions",}
	const enum GStatistikaStavObyvatelROBDtoFragments { obec = "Base", castobce = "Base", ulice = "Base", cor = "Base", pcor = "Base", cd = "Base", dcd_zobraz = "Base", zeny_pocet = "Base", muzi_pocet = "Base", celkem_pocet = "Base", Permissions = "*",}
	const enum GStatistikaStavObyvatelROBDtoTypes { obec = "string", castobce = "string", ulice = "string", cor = "number", pcor = "string", cd = "number", dcd_zobraz = "string", zeny_pocet = "number", muzi_pocet = "number", celkem_pocet = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaStavObyvatelROBDtoTypeLengths { obec = 48, castobce = 48, ulice = 48, pcor = 1, dcd_zobraz = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaVekovaStrukturaROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku věkovou strukturu*/
	interface GStatistikaVekovaStrukturaROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Obec*/
		obec?: string|null;
		/**ČástObce*/
		castobce?: string|null;
		/**Počet žen*/
		zeny_pocet?: number|null;
		/**Věk ženy*/
		zeny_vek?: JsonDecimal|null;
		/**Počet mužů*/
		muzi_pocet?: number|null;
		/**Věk muži*/
		muzi_vek?: JsonDecimal|null;
		/**Počet dívek*/
		divky_pocet?: number|null;
		/**Věk dívek*/
		divky_vek?: JsonDecimal|null;
		/**Počet chlapců*/
		chlapci_pocet?: number|null;
		/**Věk chlapců*/
		chlapci_vek?: JsonDecimal|null;
		/**Celkem počet*/
		celkem_pocet?: number|null;
		/**Celkem věk*/
		celkem_vek?: JsonDecimal|null;
	}
	const enum GStatistikaVekovaStrukturaROBDtoNames { obec = "obec", castobce = "castobce", zeny_pocet = "zeny_pocet", zeny_vek = "zeny_vek", muzi_pocet = "muzi_pocet", muzi_vek = "muzi_vek", divky_pocet = "divky_pocet", divky_vek = "divky_vek", chlapci_pocet = "chlapci_pocet", chlapci_vek = "chlapci_vek", celkem_pocet = "celkem_pocet", celkem_vek = "celkem_vek", Permissions = "Permissions",}
	const enum GStatistikaVekovaStrukturaROBDtoFragments { obec = "Base", castobce = "Base", zeny_pocet = "Base", zeny_vek = "Base", muzi_pocet = "Base", muzi_vek = "Base", divky_pocet = "Base", divky_vek = "Base", chlapci_pocet = "Base", chlapci_vek = "Base", celkem_pocet = "Base", celkem_vek = "Base", Permissions = "*",}
	const enum GStatistikaVekovaStrukturaROBDtoTypes { obec = "string", castobce = "string", zeny_pocet = "number", zeny_vek = "JsonDecimal", muzi_pocet = "number", muzi_vek = "JsonDecimal", divky_pocet = "number", divky_vek = "JsonDecimal", chlapci_pocet = "number", chlapci_vek = "JsonDecimal", celkem_pocet = "number", celkem_vek = "JsonDecimal", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaVekovaStrukturaROBDtoTypeLengths { obec = 48, castobce = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaVekSlozObceROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku věkového složení obce*/
	interface GStatistikaVekSlozeniObceROBDto extends Gordic.Rob.Interface.GRobtvsoDto {
	}
	const enum GStatistikaVekSlozeniObceROBDtoNames { ixs_fun = "ixs_fun", id = "id", obec = "obec", castobce = "castobce", popis = "popis", vek_kategorie = "vek_kategorie", pocet_muzi = "pocet_muzi", pocet_zeny = "pocet_zeny", celkem = "celkem", pocet_muzi_proc = "pocet_muzi_proc", pocet_zeny_proc = "pocet_zeny_proc", celkem_proc = "celkem_proc", Permissions = "Permissions",}
	const enum GStatistikaVekSlozeniObceROBDtoFragments { ixs_fun = "Base", id = "Base", obec = "Base", castobce = "Base", popis = "Base", vek_kategorie = "Base", pocet_muzi = "Base", pocet_zeny = "Base", celkem = "Base", pocet_muzi_proc = "Base", pocet_zeny_proc = "Base", celkem_proc = "Base", Permissions = "*",}
	const enum GStatistikaVekSlozeniObceROBDtoTypes { ixs_fun = "string", id = "number", obec = "string", castobce = "string", popis = "string", vek_kategorie = "string", pocet_muzi = "number", pocet_zeny = "number", celkem = "number", pocet_muzi_proc = "JsonDecimal", pocet_zeny_proc = "JsonDecimal", celkem_proc = "JsonDecimal", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaVekSlozeniObceROBDtoTypeLengths { ixs_fun = 12, obec = 48, castobce = 48, popis = 150, vek_kategorie = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Dto\Statistika\GStatistikaVolObvodyROBDto.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Dto pro statistiku volebních obvodů*/
	interface GStatistikaVolObvodyROBDto extends Gordic.Rob.Interface.GRobBaseDetailPermissions {
		/**Obvod kód*/
		obvod?: number|null;
		/**Počet*/
		pocet?: number|null;
	}
	const enum GStatistikaVolObvodyROBDtoNames { obvod = "obvod", pocet = "pocet", Permissions = "Permissions",}
	const enum GStatistikaVolObvodyROBDtoFragments { obvod = "Base", pocet = "Base", Permissions = "*",}
	const enum GStatistikaVolObvodyROBDtoTypes { obvod = "number", pocet = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GStatistikaVolObvodyROBDtoTypeLengths { obvod = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Gdpr\Gordic.Rob.Interface.ZmenaOsoHistorieEnum.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Výčtový typ pro ukládání do historie osoby*/
	const enum ZmenaOsoHistorieEnum {
		/**Založení osoby*/
		ZalozeniOsoby=10,
		/**Oprava osoby*/
		OpravaOsoby=20,
		/**Změna aktivity osoby*/
		ZmenaAktivityOsoby=60,
		/**Oprava adresy*/
		OpravaAdresy=70,
		/**Zobrazení detailu osoby*/
		ZobrazeniDetailuOsoby=410,
		/**Zobrazení údajů osoby v seznamu*/
		NahledOsoVSeznamu=420,
		/**Zobrazení údajů osoby v seznamu na detailu*/
		NahledOsoVDetailu=422,
		/**Tisk*/
		Tisk=430,
		/**Tisk detailu*/
		TiskDetailuOsoby=432,
		/**Export*/
		Export=440,
		/**ISZR - přihlášení ke změnám v SZR ROB*/
		ISZRPrihlaseniKeZmenam=502,
		/**ISZR - odhlášení od změn v SZR ROB*/
		ISZROdhlaseniOdZmen=504,
		/**ověření osoby v ISZR*/
		ISZROvereniOsoby=510,
		/**ověření osoby v ISZR s převzetím a uložením dat*/
		ISZROvereniOsobyPrevzetiDat=515,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGBydlistePotvrzOZmeneROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro potvrzení o změně pobytu
	* @domain RegObyvatel
	* @businessObject RobPotvrzeniOZmenePobytu
	*/
	interface BydlistePotvrzOZmeneROB {
		/**List - Načtení seznamu potvrzení o změně pobytu*/
		listPotvrzeniOsoby(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>>;
		/**List - Načtení seznamu potvrzení o změně pobytu*/
		listVydanychPotvrzeniTP(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>>;
		/**Read - Načtení detailu potvrzení o změně pobytu*/
		read(rq?:Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>>;
		/**Upsert - Založení/oprava detailu potvrzení o změně pobytu*/
		upsert(rq?:Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GBydlistePotvrzOZmeneROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BydlistePotvrzOZmeneROB: ServiceBase & Catalog.BydlistePotvrzOZmeneROB;
	}
	const BydlistePotvrzOZmeneROB: Client["BydlistePotvrzOZmeneROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GBydlistePotvrzOZmeneROBFilter {
		/**Jméno osoby*/
		jmeno,
		/**Příjmení osoby*/
		prijmeni,
		/**Rodné číslo*/
		rc,
		/**Datum vydání*/
		dat_vydani,
		/**Identifikátor osoby*/
		ixs_oso,
		/**Identifikátor bydliště*/
		ixs_byd,
		/**Ixp*/
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGDokladyZmenaPobytuROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro Doklady předložené při změně pobytu
	* @domain RegObyvatel
	* @businessObject RobDokladyZmenaPobytu 
	*/
	interface DokladyZmenaPobytuROB {
		/**List - Načtení seznamu dokladů předložených při změně pobytu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>;
		/**Read - Načtení detailu dokladu předloženého při změně pobytu*/
		read(rq?:Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>;
		/**Založení detailu dokladu předloženého při změně pobytu*/
		create(rq?:Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>;
		/**Oprava detailu dokladu předloženého při změně pobytu*/
		update(rq?:Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GDokladyZmenaPobytuROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DokladyZmenaPobytuROB: ServiceBase & Catalog.DokladyZmenaPobytuROB;
	}
	const DokladyZmenaPobytuROB: Client["DokladyZmenaPobytuROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDokladyZmenaPobytuROBFilter {
		/**DBCOLUMN:robddop.ixs_byd*/
		ixs_byd,
		/**DBCOLUMN:robddop.por_cislo*/
		por_cislo,
		/**DBCOLUMN:robddop.aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGDorucovaciAdrROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro doručovací adresu
	* @domain RegObyvatel
	* @businessObject RobDorucovaciAdr
	*/
	interface DorucovaciAdrROB {
		/**List - Načtení seznamu doručovacích adres*/
		list(rq?:CallParams<{rq:GServiceListRequest,logovatGDPR:boolean}>): _Task<{rq:GServiceListRequest,logovatGDPR:boolean},GServiceListResponse<Gordic.Rob.Interface.GDorucovaciAdrROBDto>>;
		/**Read - Načtení detailu doručovací adresy*/
		read(rq?:Gordic.Rob.Interface.GDorucovaciAdrROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GDorucovaciAdrROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GDorucovaciAdrROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GDorucovaciAdrROBDto>>;
		/**Create - Založení detailu doručovací adresy*/
		create(rq?:Gordic.Rob.Interface.GDorucovaciAdrROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDorucovaciAdrROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDorucovaciAdrROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDorucovaciAdrROBDto>>;
		/**Update - Oprava detailu doručovací adresy*/
		update(rq?:Gordic.Rob.Interface.GDorucovaciAdrROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDorucovaciAdrROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDorucovaciAdrROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDorucovaciAdrROBDto>>;
		/**Test existence doručovací adresy*/
		testDorucAdr(rq?:CallParams<{ixsOso:string}>): _Task<{ixsOso:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DorucovaciAdrROB: ServiceBase & Catalog.DorucovaciAdrROB;
	}
	const DorucovaciAdrROB: Client["DorucovaciAdrROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDorucovaciAdrROBFilter {
		/**Jméno osoby*/
		robsoso_rc,
		/**Jméno osoby*/
		robsoso_jmeno,
		/**Příjmení osoby*/
		robsoso_prijmeni,
		/**Stav osoby*/
		robsoso_stav_oso,
		/**Aktivita osoby*/
		robsoso_aktivita,
		/**Kategoie obyvatele*/
		robsoso_ktg_obyv,
		/**Datum od*/
		dat_od,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGDruhTrvalehoPobytuROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro druh trvalého pobytu
	* @domain RegObyvatel
	* @businessObject RobDruhTrvalehoPobytu
	*/
	interface DruhTrvalehoPobytuROB {
		/**List - Načtení seznamu druhů trvalého pobytu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GRobctpoDto>>;
		/**Read - Načtení detailu druhu trvalého pobytu*/
		read(rq?:Gordic.Rob.Interface.GRobctpoDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GRobctpoDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GRobctpoDto>,GServiceReadResponse<Gordic.Rob.Interface.GRobctpoDto>>;
		/**Update - Oprava detailu typu trvalého pobytu*/
		update(rq?:Gordic.Rob.Interface.GRobctpoDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GRobctpoDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GRobctpoDto>,GServiceSaveResponse<Gordic.Rob.Interface.GRobctpoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DruhTrvalehoPobytuROB: ServiceBase & Catalog.DruhTrvalehoPobytuROB;
	}
	const DruhTrvalehoPobytuROB: Client["DruhTrvalehoPobytuROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDruhTrvalehoPobytuROBFilter {
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGDuvodyPristupuROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro důvody přístupů
	* @domain RegObyvatel
	* @businessObject RobDuvodyPristupu
	*/
	interface DuvodyPristupuROB {
		/**List - Načtení seznamu důvodů přístupu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GDuvodyPristupuROBDto>>;
		/**Read - Načtení detailu důvodu přístupu*/
		read(rq?:Gordic.Rob.Interface.GDuvodyPristupuROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GDuvodyPristupuROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GDuvodyPristupuROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GDuvodyPristupuROBDto>>;
		/**Upsert - Založení/oprava detailu důvodu přístupu*/
		upsert(rq?:Gordic.Rob.Interface.GDuvodyPristupuROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDuvodyPristupuROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDuvodyPristupuROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDuvodyPristupuROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DuvodyPristupuROB: ServiceBase & Catalog.DuvodyPristupuROB;
	}
	const DuvodyPristupuROB: Client["DuvodyPristupuROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDuvodyPristupuROBFilter {
		/**Identifikátor důvodu*/
		ixs_duv,
		/**Název*/
		nazev,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGJubileaROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro jubilea
	* @domain RegObyvatel
	* @businessObject Jubilea 
	*/
	interface JubileaROB {
		/**List - List Jubileí*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GRobsjubDto>>;
		/**Read - Jubilea*/
		read(rq?:Gordic.Rob.Interface.GRobsjubDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GRobsjubDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GRobsjubDto>,GServiceReadResponse<Gordic.Rob.Interface.GRobsjubDto>>;
		/**Vytvoření záznamu jubilea*/
		create(rq?:Gordic.Rob.Interface.GRobsjubDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GRobsjubDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GRobsjubDto>,GServiceSaveResponse<Gordic.Rob.Interface.GRobsjubDto>>;
		/**Oprava detailu jubiela*/
		update(rq?:Gordic.Rob.Interface.GRobsjubDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GRobsjubDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GRobsjubDto>,GServiceSaveResponse<Gordic.Rob.Interface.GRobsjubDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		JubileaROB: ServiceBase & Catalog.JubileaROB;
	}
	const JubileaROB: Client["JubileaROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GJubileaROBFilter {
		ixs_jub,
		nazev,
		popis,
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGListArchivniEvidenceROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro List archivní evidence
	* @domain RegObyvatel
	* @businessObject ListArchivniEvidenceROB
	*/
	interface ListArchivniEvidenceROB {
		/**List - Načtení seznamu osob v archivní evidenci*/
		listArchivniEvidenceROB(rq?:CallParams<{rq:GServiceListRequest,logovatGDPR:boolean}>): _Task<{rq:GServiceListRequest,logovatGDPR:boolean},GServiceListResponse<Gordic.Rob.Interface.GListArchivniEvidenceROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ListArchivniEvidenceROB: ServiceBase & Catalog.ListArchivniEvidenceROB;
	}
	const ListArchivniEvidenceROB: Client["ListArchivniEvidenceROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGListISZRZUDROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro list porovnani ISZR - ROB (ZUD)
	* @domain RegObyvatel
	* @businessObject ListISZRZUDROB
	*/
	interface ListISZRZUDROB {
		/**List - Načtení seznamu porovnani ISZR - ROB (ZUD)*/
		listISZRZUD(rq?:CallParams<{rq:GServiceListRequest,logovatGDPR:boolean}>): _Task<{rq:GServiceListRequest,logovatGDPR:boolean},GServiceListResponse<Gordic.Rob.Interface.GListISZRZUDROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ListISZRZUDROB: ServiceBase & Catalog.ListISZRZUDROB;
	}
	const ListISZRZUDROB: Client["ListISZRZUDROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGListOsobRopBezOmezeniROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro list osob Rop bez omezení
	* @domain RegObyvatel
	* @businessObject ListOsobRopBezOmezeniROB
	*/
	interface ListOsobRopBezOmezeniROB {
		/**List - Načtení seznamu osob Rop bez omezení*/
		listOsobRopBezOmezeni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListOsobRopBezOmezeniROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ListOsobRopBezOmezeniROB: ServiceBase & Catalog.ListOsobRopBezOmezeniROB;
	}
	const ListOsobRopBezOmezeniROB: Client["ListOsobRopBezOmezeniROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGListOsobyRopROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro List Osoby Rop
	* @domain RegObyvatel
	* @businessObject ListOsobyRopROB
	*/
	interface ListOsobyRopROB {
		/**List - Načtení seznamu osob*/
		listOsobROB(rq?:CallParams<{rq:GServiceListRequest,odstehovaniAdresaKam:boolean,orderBy:string,logovatGDPR:boolean,duvodUcel:string,seznamUdaju:string}>): _Task<{rq:GServiceListRequest,odstehovaniAdresaKam:boolean,orderBy:string,logovatGDPR:boolean,duvodUcel:string,seznamUdaju:string},GServiceListResponse<Gordic.Rob.Interface.GListOsobyRopROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ListOsobyRopROB: ServiceBase & Catalog.ListOsobyRopROB;
	}
	const ListOsobyRopROB: Client["ListOsobyRopROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Filtrační kritéria pro filtr*/
	const enum GListOsobyRopROBFilter {
		/**Děti pro převod do dospělých*/
		deti_pro_prevod,
		/**Jméno osoby*/
		jmeno,
		/**Příjmení osoby*/
		prijmeni,
		/**Rodné příjmení osoby*/
		rodprij,
		/**Rodné číslo*/
		rc,
		/**Obec*/
		obec,
		/**Část obce*/
		castObce,
		/**Ulice*/
		ulice,
		/**Číslo domu*/
		cd,
		/**Druh čísla domu*/
		dcd,
		/**Číslo orientační*/
		cor,
		/**Písmeno čísla orientačního*/
		pcor,
		/**Aktivita*/
		aktivita,
		/**Identifikátor - ixs_oso*/
		ixs_oso,
		/**Typ pobytu*/
		typ_pobytu,
		/**Stav osoby*/
		stav_oso,
		/**Pohlaví*/
		pohlavi,
		/**Kategorie*/
		ktg_obyv,
		/**Datum narození*/
		dat_naroz,
		/**Datum narození od*/
		dat_naroz_start,
		/**Datum narození do*/
		dat_naroz_end,
		/**Rodinný stav*/
		rod_stav,
		/**Identifikátor objektu*/
		ixs_ido,
		/**Svéprávnost*/
		z_z,
		/**Cizinci*/
		cizinci,
		/**s AIFO*/
		sAIFO,
		/**bez AIFO*/
		bezAIFO,
		/**chyba_bydliste*/
		chyba_bydliste,
		/**vice_otcu*/
		vice_otcu,
		/**vice_matek*/
		vice_matek,
		/**vice_partneru*/
		vice_partneru,
		/**ixs_dav*/
		ixs_dav,
		/**tit_pred*/
		tit_pred,
		/**tit_za*/
		tit_za,
		/**obvod*/
		obvod,
		/**skolsky_obvod*/
		skolsky_obvod,
		/**skolsky_obvod_ms*/
		skolsky_obvod_ms,
		/**stat_obc*/
		stat_obc,
		/**narodnost*/
		narodnost,
		/**ekon_aktivita*/
		ekon_aktivita,
		/**vzdelani*/
		vzdelani,
		/**zamestnani*/
		zamestnani,
		/**kval_st_obc*/
		kval_st_obc,
		/**stat_naroz*/
		stat_naroz,
		/**okres_naroz*/
		okres_naroz,
		/**mistonar*/
		mistonar,
		/**stav_bydl*/
		stav_bydl,
		/**okres*/
		okres,
		/**pobvod*/
		pobvod,
		/**mcast*/
		mcast,
		/**blok_domu*/
		blok_domu,
		/**vchod*/
		vchod,
		/**byt*/
		byt,
		/**index domu*/
		id,
		/**cd_sloz*/
		cd_sloz,
		/**cor_sloz*/
		cor_sloz,
		/**dat naroz den*/
		dat_naroz_den,
		/**dat naroz mesic*/
		dat_naroz_mesic,
		/**dat naroz mesic den*/
		dat_naroz_mesic_den,
		/**dat naroz rok*/
		dat_naroz_rok,
		/**Obec - CaseSensitive*/
		obecCaseSensitive,
		/**Část obce - CaseSensitive*/
		castObceCaseSensitive,
		/**Jméno osoby - CaseSensitive*/
		jmenoCaseSensitive,
		/**Příjmení osoby - CaseSensitive*/
		prijmeniCaseSensitive,
		/**Ulice - CaseSensitive*/
		uliceCaseSensitive,
		/**bez události přistěhování*/
		bez_pristehovani,
		/**Bez občanů s omezenou svéprávností - bez práva volit*/
		bez_prava_volit,
		/**datum pobyt od*/
		dat_od,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGListPrihlaseniKeZmenamISZRROBROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro list osob přihlášených ke změnám ISZR
	* @domain RegObyvatel
	* @businessObject ListPrihlaseniKeZmenamISZRROB
	*/
	interface ListPrihlaseniKeZmenamISZRROB {
		/**List - Načtení seznamu osob přihlášených ke změnám ISZR*/
		list(rq?:CallParams<{rq:GServiceListRequest,logovatGDPR:boolean}>): _Task<{rq:GServiceListRequest,logovatGDPR:boolean},GServiceListResponse<Gordic.Rob.Interface.GListPrihlaseniKeZmenamISZRROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ListPrihlaseniKeZmenamISZRROB: ServiceBase & Catalog.ListPrihlaseniKeZmenamISZRROB;
	}
	const ListPrihlaseniKeZmenamISZRROB: Client["ListPrihlaseniKeZmenamISZRROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GListPrihlaseniKeZmenamISZRROBFilter {
		/**Identifikátor Osoby*/
		ixs_oso,
		/**prihlaseni_zmen*/
		prihlaseni_zmen,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGListServisCelaEvidenceROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface pro list celé evidence servis
	* @domain RegObyvatel
	* @businessObject ListServisCelaEvidenceROB
	*/
	interface ListServisCelaEvidenceROB {
		/**List - Načtení seznamu celé evidence servis*/
		listServisCelaEvidence(rq?:CallParams<{rq:GServiceListRequest,logovatGDPR:boolean}>): _Task<{rq:GServiceListRequest,logovatGDPR:boolean},GServiceListResponse<Gordic.Rob.Interface.GListServisCelaEvidenceROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ListServisCelaEvidenceROB: ServiceBase & Catalog.ListServisCelaEvidenceROB;
	}
	const ListServisCelaEvidenceROB: Client["ListServisCelaEvidenceROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGlogyROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro logy
	* @domain RegObyvatel
	* @businessObject RobLogy
	*/
	interface LogyROB {
		/**List - Načtení seznamu logů*/
		listLogyOsoby(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GLogyROBDto>>;
		/**List - Načtení seznamu logů*/
		listLogy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GLogyROBDto>>;
		/**Insert - Uložení záznamu logu*/
		insert(rq?:Gordic.Rob.Interface.GLogyROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GLogyROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GLogyROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GLogyROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LogyROB: ServiceBase & Catalog.LogyROB;
	}
	const LogyROB: Client["LogyROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GLogyOsobyROBFilter {
		/**identifikátor osoby*/
		ixs_oso,
		/**Datum uložení logu*/
		dat_zmena,
		/**ixs_su*/
		ixs_su,
		/**ixs_fun*/
		ixs_fun,
		/**ixs_ref*/
		ixs_ref,
		/**typ_akce*/
		typ_akce,
		/**typ_data*/
		typ_data,
		/**Aktivita*/
		aktivita,
	}
	/**Výčet filtračních kritérií pro filtr*/
	const enum GLogyROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Datum uložení logu*/
		dat_zmena,
		/**ixs_su*/
		ixs_su,
		/**ixs_fun*/
		ixs_fun,
		/**ixs_ref*/
		ixs_ref,
		/**typ_akce*/
		typ_akce,
		/**typ_data*/
		typ_data,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGObjektAdresaROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro adresy objektů
	* @domain RegObyvatel
	* @businessObject RobObjektAdresa
	*/
	interface ObjektAdresaROB {
		/**List - Načtení seznamu adres objektů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GObjektAdresaROBDto>>;
		/**Read - Načtení detailu adresy objektu*/
		read(rq?:Gordic.Rob.Interface.GObjektAdresaROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GObjektAdresaROBDto>>;
		/**Create - Založení detailu adresy objektu*/
		create(rq?:Gordic.Rob.Interface.GObjektAdresaROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GObjektAdresaROBDto>>;
		/**Update - Oprada detailu adresy objektu*/
		update(rq?:Gordic.Rob.Interface.GObjektAdresaROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GObjektAdresaROBDto>>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GObjektAdresaROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GObjektAdresaROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GObjektAdresaROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ObjektAdresaROB: ServiceBase & Catalog.ObjektAdresaROB;
	}
	const ObjektAdresaROB: Client["ObjektAdresaROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GObjektAdresaROBFilter {
		/**Identifikátor objektu*/
		ixs_ido,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGObjektHistROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro historii změn objektů
	* @domain RegObyvatel
	* @businessObject RobHistorieZmenObjektu
	*/
	interface ObjektHistROB {
		/**List - Načtení seznamu historie změn objektů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GObjektHistROBDto>>;
		/**Read - Načtení detailu historie změn objektů*/
		read(rq?:Gordic.Rob.Interface.GObjektHistROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GObjektHistROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GObjektHistROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GObjektHistROBDto>>;
		/**Create - Založení detailu historie změn objektů*/
		create(rq?:Gordic.Rob.Interface.GObjektHistROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GObjektHistROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GObjektHistROBDto>,void>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GObjektHistROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GObjektHistROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GObjektHistROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GObjektHistROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ObjektHistROB: ServiceBase & Catalog.ObjektHistROB;
	}
	const ObjektHistROB: Client["ObjektHistROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GObjektHistROBFilter {
		/**Identifikátor objektu*/
		ixs_ido,
		/**obvod*/
		obvod,
		/**Index domu*/
		id,
		/**Obec*/
		obec,
		/**Část obce*/
		castobce,
		/**Ulice*/
		ulice,
		/**Číslo domovní*/
		cd,
		/**Číslo orientační*/
		cor,
		/**Písmeno u čísla orientačního*/
		pcor,
		/**dat_zmena*/
		dat_zmena,
		/**zmena_adr*/
		zmena_adr,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGObjektROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro objekty
	* @domain RegObyvatel
	* @businessObject RobObjekt
	*/
	interface ObjektROB {
		/**List - Načtení seznamu historie změn objektů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GObjektROBDto>>;
		/**List - Načtení seznamu ulic*/
		listUlice(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GUliceROBDto>>;
		/**Read - Načtení detailu objektu*/
		read(rq?:Gordic.Rob.Interface.GObjektROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GObjektROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GObjektROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GObjektROBDto>>;
		/**Create - Založení detailu objektu*/
		create(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Rob.Interface.GObjektROBDto>,zapisHistorii:boolean,vytvorAdresu:boolean,generujIxs:boolean}>): _Task<{rq:GServiceSaveRequest<Gordic.Rob.Interface.GObjektROBDto>,zapisHistorii:boolean,vytvorAdresu:boolean,generujIxs:boolean},GServiceSaveResponse<Gordic.Rob.Interface.GObjektROBDto>>;
		/**Update - Oprava detailu objektu*/
		update(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Rob.Interface.GObjektROBDto>,zapisHistorii:boolean,zmenaAdr:number,zmenaTxt:string}>): _Task<{rq:GServiceSaveRequest<Gordic.Rob.Interface.GObjektROBDto>,zapisHistorii:boolean,zmenaAdr:number,zmenaTxt:string},GServiceSaveResponse<Gordic.Rob.Interface.GObjektROBDto>>;
		/**Oprava ulice a části obce*/
		opravaUliceCastObce(rq?:CallParams<{puvodniUlice:string,puvodniCastObce:string,puvodniAktivita:number,novaUlice:string,novaCastObce:string,novaAktivita:number}>): _Task<{puvodniUlice:string,puvodniCastObce:string,puvodniAktivita:number,novaUlice:string,novaCastObce:string,novaAktivita:number},void>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GObjektROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GObjektROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GObjektROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GObjektROBDto>>;
		/**Vrácení objektu objektu podle obce, ulice, cd*/
		vratObjektPodleUdaju(rq?:CallParams<{obec:string,ulice:string,cd:string}>): _Task<{obec:string,ulice:string,cd:string},GServiceReadResponse<Gordic.Rob.Interface.GObjektROBDto>>;
		/**Počet osob v objektu*/
		pocetOsob(rq?:CallParams<{ixs_ido:string}>): _Task<{ixs_ido:string},number>;
		/**Test existence indexu domu*/
		existujeIndex(rq?:CallParams<{ixs_ido:string,index:string}>): _Task<{ixs_ido:string,index:string},boolean>;
		/**Test existence objektu přes ulici, část obce a aktivitu*/
		existujeUliceCastObceAktivita(rq?:CallParams<{ulice:string,castObce:string,aktivita:number}>): _Task<{ulice:string,castObce:string,aktivita:number},boolean>;
		/**Hromadné přidělení volebního okrsku*/
		hromadnePrirazeniOkrsku(rq?:CallParams<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,sudaLicha:number,okrsek:number}>): _Task<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,sudaLicha:number,okrsek:number},void>;
		/**Hromadné přidělení volebního okrsku pro roznášku*/
		hromadnePrirazeniOkrskuRoznaska(rq?:CallParams<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,sudaLicha:number,okrsekRoznaska:number}>): _Task<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,sudaLicha:number,okrsekRoznaska:number},void>;
		/**Hromadné přidělení volebního okrsku
		*     Text pro čekací oknoAdresář ze soubory
		*/
		hromadnePrirazeniOkrskuZeSouboru(rq?:CallParams<{waitText:string,adresar:string}>): _Task<{waitText:string,adresar:string},void>;
		/**Hromadné přidělení volebního okrsku*/
		hromadnePrirazeniSkolskehoObvodu(rq?:CallParams<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,skolskyObvod:number}>): _Task<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,skolskyObvod:number},void>;
		/**Hromadné přidělení volebního okrsku MŠ*/
		hromadnePrirazeniSkolskehoObvoduMs(rq?:CallParams<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,skolskyObvodMs:number}>): _Task<{obec:string,castObce:string,ulice:string,dcd:number,cdOd:number,cdDo:number,corOd:number,corDo:number,pcorOd:string,pcorDo:string,skolskyObvodMs:number},void>;
		/**Hromadné přejmenování objektů*/
		hromadnePrejmenovaniObjektu(rq?:CallParams<{obec:string,pObvodPuvodni:string,pObvodNova:string,mCastPuvodni:string,mCastNova:string,castObcePuvodni:string,castObceNova:string,ulicePuvodni:string,uliceNova:string,pscPuvodni:string,pscNova:string,okrsekPuvodni:number,okrsekNova:number}>): _Task<{obec:string,pObvodPuvodni:string,pObvodNova:string,mCastPuvodni:string,mCastNova:string,castObcePuvodni:string,castObceNova:string,ulicePuvodni:string,uliceNova:string,pscPuvodni:string,pscNova:string,okrsekPuvodni:number,okrsekNova:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ObjektROB: ServiceBase & Catalog.ObjektROB;
	}
	const ObjektROB: Client["ObjektROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GObjektROBFilter {
		/**zda hledat pouze obydlené objekty (0 - všechny, 1 - obydlené, 2 - neobydlené)*/
		obydlene,
		/**zda hledat objekty s vazbou na RUIAN (0 - všechny, 1 - s RUIAN, 2 - bez RUIAN)*/
		ruian,
		/**Identifikátor objektu*/
		ixs_ido,
		/**Index domu*/
		id,
		/**Obec*/
		obec,
		/**Pražský obvod*/
		pobvod,
		/**Městská část*/
		mcast,
		/**Část obce*/
		castobce,
		/**Ulice*/
		ulice,
		/**Číslo orientační*/
		cor,
		/**Písmeno u čísla orientačního*/
		pcor,
		/**Druh čísla domovního*/
		dcd,
		/**Číslo domovní*/
		cd,
		/**PSČ*/
		psc,
		/**Stát*/
		stat,
		/**Okrsek*/
		obvod,
		/**Školský obvod*/
		skolsky_obvod,
		/**Školský obvod MŠ*/
		skolsky_obvod_ms,
		/**Okres*/
		okres,
		/**Identifikátor v rejstříku UIR-ADR*/
		id_uir,
		/**Aktivita*/
		aktivita,
	}
	/**Dto pro List ulic*/
	interface GUliceROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor objektu*/
		ixs_ido?: string|null;
		/**Část obce*/
		castobce?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
	}
	const enum GUliceROBDtoNames { ixs_ido = "ixs_ido", castobce = "castobce", ulice = "ulice", aktivita = "aktivita", Permissions = "Permissions",}
	const enum GUliceROBDtoFragments { ixs_ido = "Base", castobce = "Base", ulice = "Base", aktivita = "Base", Permissions = "*",}
	const enum GUliceROBDtoTypes { ixs_ido = "string", castobce = "string", ulice = "string", aktivita = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GUliceROBDtoTypeLengths { ixs_ido = 12, castobce = 48, ulice = 48,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOkresROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro okres
	* @domain RegObyvatel
	* @businessObject RobOkres
	*/
	interface OkresROB {
		/**Read - Načtení detailu*/
		read(rq?:Gordic.Rob.Interface.GOkresROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOkresROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOkresROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOkresROBDto>>;
		/**List - Načtení seznamu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOkresROBDto>>;
		/**Úprava okresu*/
		update(rq?:Gordic.Rob.Interface.GOkresROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOkresROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOkresROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOkresROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OkresROB: ServiceBase & Catalog.OkresROB;
	}
	const OkresROB: Client["OkresROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOkresROBFilter {
		/**Okres NUTS*/
		okres_nuts,
		/**Okres*/
		okres,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOpravnenaOsobaROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro oprávněné osoby
	* @domain RegObyvatel
	* @businessObject RobOpravnenaOsoba
	*/
	interface OpravnenaOsobaROB {
		/**List - Načtení seznamu údaje o vlastnících*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>;
		/**Read - Načtení detailu oprávněné osoby*/
		read(rq?:Gordic.Rob.Interface.GOpravnenaOsobaROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>;
		/**Založení detailu oprávněné osoby*/
		create(rq?:Gordic.Rob.Interface.GOpravnenaOsobaROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>;
		/**Oprava detailu oprávněné osoby*/
		update(rq?:Gordic.Rob.Interface.GOpravnenaOsobaROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GOpravnenaOsobaROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GOpravnenaOsobaROBDto>>;
		/**Test zda pro ixsByd a porCislo existuje záznam v robdopr*/
		testRobdopr(rq?:CallParams<{ixsByd:string,porCislo:number}>): _Task<{ixsByd:string,porCislo:number},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OpravnenaOsobaROB: ServiceBase & Catalog.OpravnenaOsobaROB;
	}
	const OpravnenaOsobaROB: Client["OpravnenaOsobaROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOpravnenaOsobaROBFilter {
		/**Identifikátor bydliště*/
		ixs_byd,
		/**DBCOLUMN:robdopr.por_cislo*/
		por_cislo,
		/**DBCOLUMN:robdopr.aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsoba1ROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro osobu ROB (nahrazuje IGRobsoso)
	* @domain RegObyvatel
	* @businessObject RobOsoba1
	*/
	interface Osoba1ROB {
		/**Read - Načtení detailu osoby*/
		read(rq?:Gordic.Rob.Interface.GOsoba1ROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsoba1ROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsoba1ROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsoba1ROBDto>>;
		/**Create - Založení detailu osoby*/
		create(rq?:Gordic.Rob.Interface.GOsoba1ROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsoba1ROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsoba1ROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsoba1ROBDto>>;
		/**Update - Oprava detailu osoby*/
		update(rq?:Gordic.Rob.Interface.GOsoba1ROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsoba1ROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsoba1ROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsoba1ROBDto>>;
		/**Získání ixs_oso z odstěhovaných (pokud existuje) osoby se zadaným RČ - osoba musí být napojena na ESU*/
		getOdstehIxsOsoEsu(rq?:CallParams<{rc:string}>): _Task<{rc:string},string>;
		/**Zjistí zda v tabulce robsoso existuje zadané ixs_oso*/
		existujeIxsOso(rq?:CallParams<{ixsOso:string}>): _Task<{ixsOso:string},boolean>;
		/**Převede děti na dospělé*/
		prevedDetiDoDospelych(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Rob.Interface.GListOsobyRopROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Osoba1ROB: ServiceBase & Catalog.Osoba1ROB;
	}
	const Osoba1ROB: Client["Osoba1ROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Filtrační kritéria pro filtr*/
	const enum GOsoba1ROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaArchivPrijmeniROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro archiv příjmení občana
	* @domain RegObyvatel
	* @businessObject ArchivniPrijmeni
	*/
	interface OsobaArchivPrijmeniROB {
		/**List - archiv příjmení*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaArchivPrijmeniROBDto>>;
		/**Vytvoření záznamu změny příjmení*/
		create(rq?:Gordic.Rob.Interface.GOsobaArchivPrijmeniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaArchivPrijmeniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaArchivPrijmeniROBDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaArchivPrijmeniROB: ServiceBase & Catalog.OsobaArchivPrijmeniROB;
	}
	const OsobaArchivPrijmeniROB: Client["OsobaArchivPrijmeniROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaArchivPrijmeniROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Datum od*/
		dat_od,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaArchivRCROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro archiv rodná čísla občana
	* @domain RegObyvatel
	* @businessObject RobArchivRC 
	*/
	interface OsobaArchivRCROB {
		/**List - Načtení seznamu rodných čísel osoby*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>;
		/**Read - Načtení detailu rodných čísel osoby*/
		read(rq?:Gordic.Rob.Interface.GOsobaArchivRCROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>;
		/**Založení detailu dokladu předloženého při změně pobytu*/
		create(rq?:Gordic.Rob.Interface.GOsobaArchivRCROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>;
		/**Update - Oprava detailu dokladu předloženého při změně pobytu*/
		update(rq?:Gordic.Rob.Interface.GOsobaArchivRCROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GOsobaArchivRCROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GOsobaArchivRCROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GOsobaArchivRCROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaArchivRCROB: ServiceBase & Catalog.OsobaArchivRCROB;
	}
	const OsobaArchivRCROB: Client["OsobaArchivRCROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaArchivRCROBFilter {
		/**DBCOLUMN:robvrci.ixs_oso*/
		ixs_oso,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaBydlisteROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro průkaz občana
	* @domain RegObyvatel
	* @businessObject RobBydliste
	*/
	interface OsobaBydlisteROB {
		/**Read - Načtení detailu bydliště osoby*/
		read(rq?:Gordic.Rob.Interface.GOsobaBydlisteROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>;
		/**Read - Načtení detailu předchozího bydliště osoby*/
		readBydlisteIxsNad(rq?:Gordic.Rob.Interface.GOsobaBydlisteROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>;
		/**Create - Založení detailu předchozího bydliště osoby*/
		create(rq?:Gordic.Rob.Interface.GOsobaBydlisteROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>;
		/**Update - Oprava detailu bydliště osoby*/
		update(rq?:Gordic.Rob.Interface.GOsobaBydlisteROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GOsobaBydlisteROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GOsobaBydlisteROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GOsobaBydlisteROBDto>>;
		/**Test zda pro ixs_oso a stav_bydl existuje robsbyd*/
		testRobsbyd(rq?:CallParams<{ixsOso:string,stavBydl:number}>): _Task<{ixsOso:string,stavBydl:number},number>;
		/**Test zda existuje robsbyd (ixs_byd)*/
		testRobsbyd(rq?:CallParams<{ixsByd:string}>): _Task<{ixsByd:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaBydlisteROB: ServiceBase & Catalog.OsobaBydlisteROB;
	}
	const OsobaBydlisteROB: Client["OsobaBydlisteROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaBydlisteROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaDalsiJmenaROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro další jména osoby
	* @domain RegObyvatel
	* @businessObject RobOsobaDalsiJmena
	*/
	interface OsobaDalsiJmenaROB {
		/**List - Načtení seznamu dalších jmen osoby*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto>>;
		/**Read - Načtení detailu dalšího jména osoby*/
		read(rq?:Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto>>;
		/**Upsert - Založení/oprava detailu dalšího jména osoby*/
		upsert(rq?:Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaDalsiJmenaROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaDalsiJmenaROB: ServiceBase & Catalog.OsobaDalsiJmenaROB;
	}
	const OsobaDalsiJmenaROB: Client["OsobaDalsiJmenaROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaDalsiJmenaROBFilter {
		/**Identifikáor osoby*/
		ixs_oso,
		/**Typ jména*/
		typ_jme,
		/**Datum od*/
		dat_od,
		/**Jméno*/
		jmeno,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaDalsiObcanstviROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro další občanství osoby
	* @domain RegObyvatel
	* @businessObject RobOsobaDalsiObcanstvi
	*/
	interface OsobaDalsiObcanstviROB {
		/**List - Načtení seznamu dalších občanství osoby*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>>;
		/**Read - Načtení detailu dalšího občanství osoby*/
		read(rq?:Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>>;
		/**Upsert - Založení/oprava detailu dalšího občanství osoby*/
		upsert(rq?:Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>>;
		/**Nastavení aktivity dalšího občanství osoby*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GOsobaDalsiObcanstviROBDto>>;
		/**Smazání všech ostatních občanství*/
		smazVsechnyObcanstviOsoby(rq?:CallParams<{ixsOso:string}>): _Task<{ixsOso:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaDalsiObcanstviROB: ServiceBase & Catalog.OsobaDalsiObcanstviROB;
	}
	const OsobaDalsiObcanstviROB: Client["OsobaDalsiObcanstviROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaDalsiObcanstviROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Datum od*/
		dat_od,
		/**Kód státu*/
		stat,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaDetailROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro osobu ROB (nahrazuje IGRobsoso)
	* @domain RegObyvatel
	* @businessObject RobOsobaDetail
	*/
	interface OsobaDetailROB {
		/**Read - Načtení detailu osoby na detailu*/
		read(rq?:Gordic.Rob.Interface.GOsoba1ROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsoba1ROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsoba1ROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsoba1ROBDto>>;
		/**Read - Načtení detailu rodinného příslušníka*/
		readRodPrisl(rq?:Gordic.Rob.Interface.GOsobaRodPrislDetailROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaRodPrislDetailROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaRodPrislDetailROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaRodPrislDetailROBDto>>;
		/**List - Načtení seznamu dětí osoby*/
		listDetiOsobyROB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaDiteROBDto>>;
		/**List - Načtení seznamu dětí osoby i těch bez bydliště*/
		listDetiOsobyROBVse(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaDiteROBDto>>;
		/**List - Načtení seznamu rodiny osoby*/
		listRodinaOsobyROB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaRodinaROBDto>>;
		/**List - Načtení seznamu logů osoby*/
		listLogyOsobyROB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GLogyROBDto>>;
		/**List - Načtení seznamu archivu bydlišť osoby*/
		listArchivBydlistOsobyROB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaArchivBydlistROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaDetailROB: ServiceBase & Catalog.OsobaDetailROB;
	}
	const OsobaDetailROB: Client["OsobaDetailROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Filtrační kritéria pro filtr*/
	const enum GOsobaDetailROBFilter {
		/**Jméno osoby*/
		jmeno,
		/**Příjmení osoby*/
		prijmeni,
		/**Rodné číslo*/
		rc,
		/**Aktivita*/
		aktivita,
		/**Identifikátor - ixs_oso*/
		ixs_oso,
		/**Typ pobytu*/
		typ_pobytu,
		/**Stav osoby*/
		stav_oso,
		/**Pohlaví*/
		pohlavi,
		/**Kategorie*/
		ktg_obyv,
		/**Datum narození*/
		dat_naroz,
		/**Svéprávnost*/
		z_z,
	}
	/**Filtrační kritéria pro filtr děti osoby*/
	const enum GOsobaDiteROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Aktivita*/
		aktivita,
	}
	/**Filtrační kritéria pro filtr rodina osoby*/
	const enum GOsobaRodinaROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Typ vztahu*/
		typ_vztahu,
		/**Aktivita*/
		aktivita,
	}
	/**Filtrační kritéria pro filtr seznamu logů*/
	const enum GOsobaLogyROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Datum uložení logu*/
		dat_zmena,
		/**ixs_su*/
		ixs_su,
		/**ixs_fun*/
		ixs_fun,
		/**ixs_ref*/
		ixs_ref,
		/**typ_akce*/
		typ_akce,
		/**typ_data*/
		typ_data,
		/**Aktivita*/
		aktivita,
	}
	/**Filtrační kritéria pro filtr archív bydlišť*/
	const enum GOsobaArchivBydlistROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Rodné číslo*/
		rc,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaJmenoROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro číselník jmen
	* @domain RegObyvatel
	* @businessObject RobJmeno
	*/
	interface OsobaJmenoROB {
		/**Read - Načtení detailu jména*/
		read(rq?:Gordic.Rob.Interface.GOsobaJmenoROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaJmenoROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaJmenoROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaJmenoROBDto>>;
		/**Create - Založení detailu jména*/
		create(rq?:Gordic.Rob.Interface.GOsobaJmenoROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaJmenoROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaJmenoROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaJmenoROBDto>>;
		/**Update - Oprava detailu jména*/
		update(rq?:Gordic.Rob.Interface.GOsobaJmenoROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaJmenoROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaJmenoROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaJmenoROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaJmenoROB: ServiceBase & Catalog.OsobaJmenoROB;
	}
	const OsobaJmenoROB: Client["OsobaJmenoROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaJmenoROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaPrijmeniROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro číselník příjmení
	* @domain RegObyvatel
	* @businessObject RobPrijmeni
	*/
	interface OsobaPrijmeniROB {
		/**Read - Načtení detailu příjmení*/
		read(rq?:Gordic.Rob.Interface.GOsobaPrijmeniROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>>;
		/**Create - Založení detailu příjmení*/
		create(rq?:Gordic.Rob.Interface.GOsobaPrijmeniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>>;
		/**Update - Oprava detailu příjmení*/
		update(rq?:Gordic.Rob.Interface.GOsobaPrijmeniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaPrijmeniROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaPrijmeniROB: ServiceBase & Catalog.OsobaPrijmeniROB;
	}
	const OsobaPrijmeniROB: Client["OsobaPrijmeniROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaPrijmeniROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaPrukazROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro průkaz občana
	* @domain RegObyvatel
	* @businessObject RobPrukaz
	*/
	interface OsobaPrukazROB {
		/**List - Načtení seznamu průkazů občana*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaPrukazROBDto>>;
		/**Read - Načtení detailu průkazu občana*/
		read(rq?:Gordic.Rob.Interface.GOsobaPrukazROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaPrukazROBDto>>;
		/**Create - Založení detailu vyřazení občana z voleb*/
		create(rq?:Gordic.Rob.Interface.GOsobaPrukazROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaPrukazROBDto>>;
		/**Update - Oprava detailu vyřazení občana z voleb*/
		update(rq?:Gordic.Rob.Interface.GOsobaPrukazROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaPrukazROBDto>>;
		/**Nastavení aktivity průkazu občana*/
		zneaktivniPrukaz(rq?:Gordic.Rob.Interface.GOsobaPrukazROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GOsobaPrukazROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GOsobaPrukazROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaPrukazROB: ServiceBase & Catalog.OsobaPrukazROB;
	}
	const OsobaPrukazROB: Client["OsobaPrukazROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaPrukazROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Typ průkazu*/
		typ_pruk,
		/**Číslo průkazu*/
		cislo_pruk,
		/**Datum od*/
		dat_od,
		/**Datum do*/
		dat_do,
		/**Datum vydání*/
		dat_vyd,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro oblast ROB
	* @domain RegObyvatel
	* @businessObject RobOsoba
	*/
	interface OsobaROB {
		/**List - Načtení seznamu osob*/
		listOsobROB(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaDetailROBDto>>;
		/**List - Načtení seznamu rodiny osoby*/
		listOsobaRodina(rq?:CallParams<{rq:GServiceListRequest,ixsOso:string}>): _Task<{rq:GServiceListRequest,ixsOso:string},GServiceListResponse<Gordic.Rob.Interface.GOsobaRodinaROBDto>>;
		/**Read - Načtení detailu osoby*/
		read(rq?:Gordic.Rob.Interface.GOsobaDetailROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaDetailROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaDetailROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaDetailROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaROB: ServiceBase & Catalog.OsobaROB;
	}
	const OsobaROB: Client["OsobaROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Rodné číslo*/
		rc,
		/**Příjmení*/
		prijmeni,
		/**Jméno*/
		jmeno,
		/**Rodné příjmení*/
		rodprij,
		/**Pohlaví*/
		pohlavi,
		/**Typ pobytu*/
		typ_pobytu,
		/**Kategorie obyvatele*/
		ktg_obyv,
		/**Stav osoby*/
		stav_oso,
		/**Aktivita*/
		aktivita,
		/**Aifo*/
		aifo,
		/**DBCOLUMN:robsoso.ico*/
		ico,
		/**Zda u odstěhování načíst místo adresy odkud adresu kam (1 = T / 0 = F, defaut false)*/
		odstehovaniAdresaKam,
		/**Zda se má zalogovat GDPR (1 = T / 0 = F, defaut false)*/
		logovatGDPR,
		/**Důvod / účel pro logování GDPR (string)*/
		duvodUcel,
		/**Seznam údajů pro logování GDPR (string)*/
		seznamUdaju,
		/**ORDER BY*/
		orderBy,
		/**Děti pro převod do dospělých*/
		deti_pro_prevod,
		/**Cizinci*/
		cizinci,
		/**Obec*/
		obec,
		/**Část obce*/
		castobce,
		/**Ulice*/
		ulice,
		/**Domovní číslo*/
		cd,
		/**Číslo orientační*/
		cor,
		/**pcor*/
		pcor,
		/**Datum narození interval*/
		dat_naroz_start,
		/**Datum narození interval*/
		dat_naroz_end,
	}
	/**Dto pro filter rodiny*/
	interface GOsobaRodinaROBFilterDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Typ vztahu*/
		typ_vztahu?: number|null;
	}
	const enum GOsobaRodinaROBFilterDtoNames { typ_vztahu = "typ_vztahu", Permissions = "Permissions",}
	const enum GOsobaRodinaROBFilterDtoFragments { typ_vztahu = "*", Permissions = "*",}
	const enum GOsobaRodinaROBFilterDtoTypes { typ_vztahu = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GOsobaRodinaROBFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaRodPrislROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro rodinné příslušníky osoby
	* @domain RegObyvatel
	* @businessObject RobOsobaRodPrisl
	*/
	interface OsobaRodPrislROB {
		/**Read - Načtení detailu rodinného příslušníka*/
		read(rq?:Gordic.Rob.Interface.GOsobaRodPrislROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaRodPrislROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaRodPrislROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaRodPrislROBDto>>;
		/**List - Načtení seznamu dětí osoby*/
		listDetiOsoby(rq?:CallParams<{ixsOso:string,rq:GServiceListRequest}>): _Task<{ixsOso:string,rq:GServiceListRequest},GServiceListResponse<Gordic.Rob.Interface.GOsobaRodPrislROBDto>>;
		/**List - Načtení seznamu rodiny osoby*/
		listRodinaOsoby(rq?:CallParams<{ixsOso:string,rq:GServiceListRequest}>): _Task<{ixsOso:string,rq:GServiceListRequest},GServiceListResponse<Gordic.Rob.Interface.GOsobaRodPrislROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaRodPrislROB: ServiceBase & Catalog.OsobaRodPrislROB;
	}
	const OsobaRodPrislROB: Client["OsobaRodPrislROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaRodPrislDetiROBFilter {
		/**Aktivita*/
		aktivita,
	}
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaRodPrislRodinaROBFilter {
		/**Typ vztahu*/
		typ_vztahu,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaSpolubydliciROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro rodinné příslušníky osoby
	* @domain RegObyvatel
	* @businessObject RobOsobaSpolubydlici
	*/
	interface OsobaSpolubydliciROB {
		/**List - List spolubydlících osoby*/
		list(rq?:CallParams<{ixsOso:string,ixsAdr:string}>): _Task<{ixsOso:string,ixsAdr:string},GServiceListResponse<Gordic.Rob.Interface.GOsobaSpolubydliciROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaSpolubydliciROB: ServiceBase & Catalog.OsobaSpolubydliciROB;
	}
	const OsobaSpolubydliciROB: Client["OsobaSpolubydliciROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaSpolubydliciROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaVypisGDPRROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro výpis využití údajů osoby
	* @domain RegObyvatel
	* @businessObject RobVypisGDPRROB
	*/
	interface OsobaVypisGDPRROB {
		/**List - Načtení seznamu využití údajů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaVypisGDPRROBDto>>;
		/**Read - Načtení detailu využití údajů*/
		read(rq?:Gordic.Rob.Interface.GOsobaVypisGDPRROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaVypisGDPRROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaVypisGDPRROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaVypisGDPRROBDto>>;
		/**Uloží záznam do hitorie změn osoby - kvůli GDPR*/
		ulozZapisDoHistorie(rq?:CallParams<{ixsOso:string,testovatIxsOso:boolean,zmenaOso:Gordic.Rob.Interface.ZmenaOsoHistorieEnum,ixsAdr:string,ixsOsoVaz:string,duvodUcel:string,seznamUdaju:string,newTransaction:boolean}>): _Task<{ixsOso:string,testovatIxsOso:boolean,zmenaOso:Gordic.Rob.Interface.ZmenaOsoHistorieEnum,ixsAdr:string,ixsOsoVaz:string,duvodUcel:string,seznamUdaju:string,newTransaction:boolean},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaVypisGDPRROB: ServiceBase & Catalog.OsobaVypisGDPRROB;
	}
	const OsobaVypisGDPRROB: Client["OsobaVypisGDPRROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaVypisGDPRROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Datum uložení logu*/
		dat_zmena_od,
		/**Datum uložení logu*/
		dat_zmena_do,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaVyrazeniROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro vyřazení občana z voleb
	* @domain RegObyvatel
	* @businessObject RobVyrazeni
	*/
	interface OsobaVyrazeniROB {
		/**Read - Načtení detailu vyřazení občana z voleb*/
		read(rq?:Gordic.Rob.Interface.GOsobaVyrazeniROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>>;
		/**Create - Založení detailu vyřazení občana z voleb*/
		create(rq?:Gordic.Rob.Interface.GOsobaVyrazeniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>>;
		/**Update - Oprava detailu vyřazení občana z voleb*/
		update(rq?:Gordic.Rob.Interface.GOsobaVyrazeniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaVyrazeniROBDto>>;
		/**Nové číslo VP*/
		vratNoveCisloVP(rq?:CallParams<{vp:number}>): _Task<{vp:number},string>;
		/**Otestuje existenbci čísla VP v DB*/
		otestujPouzitiCislaVP(rq?:CallParams<{cisloVP:string,ixsOso:string}>): _Task<{cisloVP:string,ixsOso:string},boolean>;
		/**Vymaže čísla VP*/
		vymazCislaVP(rq?:CallParams<{}>): _Task<{},void>;
		/**Zjistí zda exituje ixs_oso ve vyřazení*/
		existujeIxsOso(rq?:CallParams<{ixsOso:string,aktivita:boolean}>): _Task<{ixsOso:string,aktivita:boolean},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaVyrazeniROB: ServiceBase & Catalog.OsobaVyrazeniROB;
	}
	const OsobaVyrazeniROB: Client["OsobaVyrazeniROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaVyrazeniROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGOsobaVztahROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro vztah osoby
	* @domain RegObyvatel
	* @businessObject RobVztahOsoby
	*/
	interface OsobaVztahROB {
		/**List - Načtení seznamu vztahů osoby*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GOsobaVztahROBDto>>;
		/**Read - Načtení detailu vztahu osoby*/
		read(rq?:Gordic.Rob.Interface.GOsobaVztahROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GOsobaVztahROBDto>>;
		/**Create - Založení detailu vztahu osoby*/
		create(rq?:Gordic.Rob.Interface.GOsobaVztahROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaVztahROBDto>>;
		/**Update - Oprava detailu vztahu osoby*/
		update(rq?:Gordic.Rob.Interface.GOsobaVztahROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GOsobaVztahROBDto>>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GOsobaVztahROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GOsobaVztahROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GOsobaVztahROBDto>>;
		/**Zruší rodinné vztahy dle RC*/
		zrusVztahyDleRC(rq?:CallParams<{ixsOso:string,rc:string,typVztahu:number}>): _Task<{ixsOso:string,rc:string,typVztahu:number},void>;
		/**Zruší rodinné vztahy dle identifikátoru osoby a typu vztahu*/
		zrusVztahy(rq?:CallParams<{ixsOso:string,typVztahu:number}>): _Task<{ixsOso:string,typVztahu:number},void>;
		/**Zruší všechny rodinné vztahy dle identifikátoru osoby*/
		zrusVsechnyVztahy(rq?:CallParams<{ixsOso:string}>): _Task<{ixsOso:string},void>;
		/**Zruší rodinné vztahy dle identifikátorů*/
		zrusVztahyDleIdentifikatoru(rq?:CallParams<{ixsOso1:string,ixsOso2:string,typVztahu:number}>): _Task<{ixsOso1:string,ixsOso2:string,typVztahu:number},void>;
		/**Zjistí počet zadaného rodinného vztahu*/
		pocetRodVztahu(rq?:CallParams<{ixsOso:string,typVztahu:number}>): _Task<{ixsOso:string,typVztahu:number},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		OsobaVztahROB: ServiceBase & Catalog.OsobaVztahROB;
	}
	const OsobaVztahROB: Client["OsobaVztahROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GOsobaVztahROBFilter {
		/**Identifikátor první osoby*/
		ixs_oso_1,
		/**Identifikátor osoby ke které je vztah*/
		ixs_oso_2,
		/**Typ vztahu*/
		typ_vztahu,
		/**Rodné číslo*/
		rc,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGPrirustekROB.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGSprPoplatkyROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro změny szr
	* @domain RegObyvatel
	* @businessObject RobSprávní poplatky
	*/
	interface SprPoplatkyROB {
		/**List - List poplatků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GSprPoplatkyROBDto>>;
		/**Storno poplatku*/
		stornujPoplatek(rq?:CallParams<{ixpUpr:string,ixpReal:string,radekUhr:number}>): _Task<{ixpUpr:string,ixpReal:string,radekUhr:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SprPoplatkyROB: ServiceBase & Catalog.SprPoplatkyROB;
	}
	const SprPoplatkyROB: Client["SprPoplatkyROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GSprPoplatkyROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGStatistikaVekSlozeniObceROB.d.ts 

declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GStatistikaVekSlozeniObceROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGSyncROBvsESUROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku věkového složení obce
	* @domain RegObyvatel
	* @businessObject SyncROBvsESUROB 
	*/
	interface SyncROBvsESUROB {
		/**List - Načtení seznamu*/
		listSyncROBvsESU(rq?:CallParams<{rq:GServiceListRequest,logovatGDPR:boolean}>): _Task<{rq:GServiceListRequest,logovatGDPR:boolean},GServiceListResponse<Gordic.Rob.Interface.GSyncROBvsESUROBDto>>;
		/**List - Načtení seznamu*/
		listEsu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GSyncROBvsESUROBDto>>;
		/**Pokusí se dohledat osobu v ESU a zjistit stav validnosti*/
		kontrolaZaznamu(rq?:CallParams<{ixsEsu:string,ixsOso:string,rc:string,prijmeni:string,jmeno:string,obec:string,castobce:string,ulice:string,cd:number,urPristup:number,shodaRCPrijmeniJmeno:boolean}>): _Task<{ixsEsu:string,ixsOso:string,rc:string,prijmeni:string,jmeno:string,obec:string,castobce:string,ulice:string,cd:number,urPristup:number,shodaRCPrijmeniJmeno:boolean},number>;
		/**Nastaví stupeň verifikace ESU na 50 a ixs_oso na zaslané ixs_oso u zasleného ixs_esu*/
		nastavStupenVerESU(rq?:CallParams<{ixsEsu:string,ixsOso:string}>): _Task<{ixsEsu:string,ixsOso:string},void>;
		/**Přesune ESU do nové úrovně přístupu*/
		presunESUUrovenPristupu(rq?:CallParams<{ixsEsu:string,urPristupu:number}>): _Task<{ixsEsu:string,urPristupu:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SyncROBvsESUROB: ServiceBase & Catalog.SyncROBvsESUROB;
	}
	const SyncROBvsESUROB: Client["SyncROBvsESUROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GSyncROBvsESUROBFilter {
		/**Rodné číslo*/
		rc,
		/**jméno*/
		jmeno,
		/**příjmení*/
		prijmeni,
		/**Aktivita*/
		aktivita,
	}
	/**Filtrační kritéria pro filtr seznamu ESU*/
	const enum GSeznamESUFilter {
		/**identifikátor ESU*/
		ixs_esu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGUdalostROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro události
	* @domain RegObyvatel
	* @businessObject RobUdalost
	*/
	interface UdalostROB {
		/**List - Načtení seznamu událostí občana*/
		listUdalosti(rq?:CallParams<{rq:GServiceListRequest,ixsOso:string}>): _Task<{rq:GServiceListRequest,ixsOso:string},GServiceListResponse<Gordic.Rob.Interface.GListUdalostiROBDto>>;
		/**List - Načtení seznamu úmrtí*/
		listUdalostiUmrti(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiUmrtiROBDto>>;
		/**List - Načtení seznamu narození*/
		listUdalostiNarozeni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiNarozeniROBDto>>;
		/**List - Načtení seznamu sňatků*/
		listUdalostiSnatek(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiSnatekRozvodROBDto>>;
		/**List - Načtení seznamu rozvodů*/
		listUdalostiRozvod(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiSnatekRozvodROBDto>>;
		/**List - Načtení seznamu změna příjmení*/
		listUdalostiZmenyPrijmeni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiPrijmeniJmenoROBDto>>;
		/**List - Načtení seznamu změn jmen*/
		listUdalostiZmenyJmen(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiPrijmeniJmenoROBDto>>;
		/**List - Načtení seznamu změny pobytu*/
		listUdalostiZmenyPobytu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiZmenyPobytuROBDto>>;
		/**List - statistika změn událostí*/
		listUdalostiStatistikaZmen(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GListUdalostiStatistikaZmenROBDto>>;
		/**Read - Načtení detailu události*/
		read(rq?:Gordic.Rob.Interface.GUdalostROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GUdalostROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GUdalostROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GUdalostROBDto>>;
		/**Create - Založení detailu události*/
		create(rq?:Gordic.Rob.Interface.GUdalostROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GUdalostROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GUdalostROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GUdalostROBDto>>;
		/**Update - Oprava detailu události*/
		update(rq?:Gordic.Rob.Interface.GUdalostROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GUdalostROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GUdalostROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GUdalostROBDto>>;
		/**Vytvoří událost narození + účastník narození*/
		noveNarozeni(rq?:CallParams<{ixsOso:string}>): _Task<{ixsOso:string},string>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdalostROB: ServiceBase & Catalog.UdalostROB;
	}
	const UdalostROB: Client["UdalostROB"];
}
declare namespace Gordic.Rob.Interface {
	/**List událost narození*/
	interface GListUdalostiStatistikaZmenROBDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Název události*/
		nazev_udalosti?: string|null;
		/**Počet*/
		pocet?: number|null;
	}
	const enum GListUdalostiStatistikaZmenROBDtoNames { nazev_udalosti = "nazev_udalosti", pocet = "pocet", Permissions = "Permissions",}
	const enum GListUdalostiStatistikaZmenROBDtoFragments { nazev_udalosti = "Base", pocet = "Base", Permissions = "*",}
	const enum GListUdalostiStatistikaZmenROBDtoTypes { nazev_udalosti = "string", pocet = "number", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GListUdalostiStatistikaZmenROBDtoTypeLengths {}
	/**Výčet filtračních kritérií pro filtr*/
	const enum GUdalostROBFilter {
	}
	/**Filtrační kritéria pro filtr seznamu událostí*/
	const enum GListUdalostiROBFilter {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Jméno osoby*/
		jmeno,
		/**Příjmení osoby*/
		prijmeni,
		/**Nové jméno osoby*/
		nove_jmeno,
		/**Nové příjmení osoby*/
		nove_prijmeni,
		/**Rodné číslo*/
		rc,
		/**Typ pobytu*/
		typ_pobytu,
		/**Datum události*/
		dat_uda,
		/**Datum zápisu EO*/
		dat_zap_eo,
		/**Zda se má zalogovat GDPR (1 = T / 0 = F, defaut false)*/
		logovatGDPR,
	}
	/**Filtrační kritéria pro filtr seznamu událostí*/
	const enum FiltrUdalostiSnatekRozvodROB {
		/**Příjmení osoby - ženich*/
		zenich_prijmeni,
		/**Rodné číslo - ženich*/
		zenich_rc,
		/**Příjmení osoby - nevěsta*/
		nevesta_prijmeni,
		/**Rodné číslo - nevěsta*/
		nevesta_rc,
		/**Datum události*/
		dat_uda,
		/**Datum zápisu EO*/
		dat_zap_eo,
		/**Datum právní moci*/
		dat_prav_moc,
		/**Zda se má zalogovat GDPR (1 = T / 0 = F, defaut false)*/
		logovatGDPR,
	}
	/**Filtrační kritéria pro filtr seznamu událostí*/
	const enum FiltrUdalostiZmenyPobytuROB {
		/**Identifikátor osoby*/
		ixs_oso,
		/**Příjmení*/
		prijmeni,
		/**Rodné číslo*/
		rc,
		/**Jméno*/
		jmeno,
		/**Datum od*/
		dat_od,
		/**Datum zápisu*/
		dat_prov,
		/**Datum narození*/
		dat_naroz,
		/**Stav bydliště*/
		stav_bydl,
		/**Pohlaví*/
		pohlavi,
		/**Typ pobytu*/
		typ_pobytu,
		/**Obec*/
		robsido_obec,
		/**Část obce*/
		robsido_castobce,
		/**Obec*/
		robsido_new_obec,
		/**Část obce*/
		robsido_new_castobce,
		/**Ulice*/
		robsido_ulice,
		/**Ulice*/
		robsido_new_ulice,
		/**Číslo domu*/
		robsido_cd,
		/**Číslo domu*/
		robsido_new_cd,
		/**Druh čísla domu*/
		robsido_dcd,
		/**Druh čísla domu*/
		robsido_new_dcd,
		/**Číslo orientační*/
		robsido_cor,
		/**Číslo orientační*/
		robsido_new_cor,
		/**Písmeno čísla orientačního*/
		robsido_pcor,
		/**Písmeno čísla orientačního*/
		robsido_new_pcor,
		/**Zda se má zalogovat GDPR (1 = T / 0 = F, defaut false)*/
		logovatGDPR,
	}
	/**Filtrační kritéria pro filtr seznamu událostí*/
	const enum FiltrUdalostiStatistikaROB {
		/**True pokud se vyhledává podle data změny, jinak False (default) podle data zápisu*/
		datumZmeny,
		/**Rodné číslo*/
		datumOd,
		/**Jméno*/
		datumDo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGUdalostZaznamROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro záznamy k události (poznámky)
	* @domain RegObyvatel
	* @businessObject RobUdalostZaznam 
	*/
	interface UdalostZaznamROB {
		/**Read - Načtení detailu záznamu k události*/
		read(rq?:Gordic.Rob.Interface.GUdalostZaznamROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GUdalostZaznamROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GUdalostZaznamROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GUdalostZaznamROBDto>>;
		/**Oprava detailu dokladu předloženého při změně pobytu*/
		upsert(rq?:Gordic.Rob.Interface.GUdalostZaznamROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GUdalostZaznamROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GUdalostZaznamROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GUdalostZaznamROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UdalostZaznamROB: ServiceBase & Catalog.UdalostZaznamROB;
	}
	const UdalostZaznamROB: Client["UdalostZaznamROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GUdalostZaznamROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGZadostISROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro žádost o poskytnutí údajů z IS
	* @domain RegObyvatel
	* @businessObject ZadostIS
	*/
	interface ZadostISROB {
		/**Read - Načtení detailu žádosti o výdej informací z informačního systému*/
		read(rq?:Gordic.Rob.Interface.GZadostISROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GZadostISROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GZadostISROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GZadostISROBDto>>;
		/**List - žádostí o výdej informací z informačního systému*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GZadostISROBDto>>;
		/**Vytvoření žádosti o poskytnutí údajů z IS*/
		create(rq?:Gordic.Rob.Interface.GZadostISROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GZadostISROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GZadostISROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GZadostISROBDto>>;
		/**Úprava žádosti o poskytnutí údajů z IS*/
		update(rq?:Gordic.Rob.Interface.GZadostISROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GZadostISROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GZadostISROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GZadostISROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZadostISROB: ServiceBase & Catalog.ZadostISROB;
	}
	const ZadostISROB: Client["ZadostISROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GZadostISROBFilter {
		/**Identifikátor*/
		ixs_uis,
		/**Rodné číslo*/
		rc,
		/**Příjmení*/
		prijmeni,
		/**Jméno*/
		jmeno,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGZakazTPROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro zákaz trvalého pobytu
	* @domain RegObyvatel
	* @businessObject ZakazTP
	*/
	interface ZakazTPROB {
		/**Read - Načtení detailu účastníka události*/
		read(rq?:Gordic.Rob.Interface.GZakazTPROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GZakazTPROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GZakazTPROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GZakazTPROBDto>>;
		/**List - zákazů trvalého pobytu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GZakazTPROBDto>>;
		/**Vytvoření zákazu trvalého pobytu*/
		create(rq?:Gordic.Rob.Interface.GZakazTPROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GZakazTPROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GZakazTPROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GZakazTPROBDto>>;
		/**Úprava zákazu trvalého pobytu*/
		update(rq?:Gordic.Rob.Interface.GZakazTPROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GZakazTPROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GZakazTPROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GZakazTPROBDto>>;
		/**Ověří zda má RČ zákaz pobytu*/
		overitZakazPobytu(rq?:CallParams<{rc:string}>): _Task<{rc:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZakazTPROB: ServiceBase & Catalog.ZakazTPROB;
	}
	const ZakazTPROB: Client["ZakazTPROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GZakazTPROBFilter {
		/**rodné číslo*/
		rc,
		/**příjmení*/
		prijmeni,
		/**jméno*/
		jmeno,
		/**datum platnosti od*/
		dat_platnost_od,
		/**datum platnosti do*/
		dat_platnost_do,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Gordic.Rob.Interface.IGZmenySzrROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro změny szr
	* @domain RegObyvatel
	* @businessObject RobZmenySzr
	*/
	interface ZmenySzrROB {
		/**List - List změn SZR*/
		list(rq?:CallParams<{rq:GServiceListRequest,logovatGDPR:boolean}>): _Task<{rq:GServiceListRequest,logovatGDPR:boolean},GServiceListResponse<Gordic.Rob.Interface.GZmenySzrROBDto>>;
		/**Vytvoření záznamu změny SZR*/
		create(rq?:Gordic.Rob.Interface.GZmenySzrROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GZmenySzrROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GZmenySzrROBDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZmenySzrROB: ServiceBase & Catalog.ZmenySzrROB;
	}
	const ZmenySzrROB: Client["ZmenySzrROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GZmenySzrROBFilter {
		/**ixs_oso*/
		ixs_oso,
		/**typ změny*/
		szr_zmena,
		/**datum provedení*/
		dat_prov,
		/**jméno*/
		jmeno,
		/**příjmení*/
		prijmeni,
		/**rodné číslo*/
		rc,
		/**změna ISEO*/
		s_zmena_iseo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Davky\Gordic.Rob.Interface.IGDavkyAktObcaneROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro detail osoby v aktualizační dávce
	* @domain RegObyvatel
	* @businessObject RobDavkyAktObcane
	*/
	interface DavkyAktObcaneROB {
		/**List - List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GDavkyAktObcaneDto>>;
		/**Read*/
		read(rq?:Gordic.Rob.Interface.GDavkyAktObcaneDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GDavkyAktObcaneDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GDavkyAktObcaneDto>,GServiceReadResponse<Gordic.Rob.Interface.GDavkyAktObcaneDto>>;
		/**Create*/
		create(rq?:Gordic.Rob.Interface.GDavkyAktObcaneDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktObcaneDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktObcaneDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyAktObcaneDto>>;
		/**Update*/
		update(rq?:Gordic.Rob.Interface.GDavkyAktObcaneDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktObcaneDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktObcaneDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyAktObcaneDto>>;
		/**Načte dávku ze souborů pražské městské části*/
		nactiDavkyMC(rq?:CallParams<{waitText:string,ixsUnl:string,adresar:string}>): _Task<{waitText:string,ixsUnl:string,adresar:string},string>;
		/**Vrátí počty jednotlivých dávek v souborech*/
		zkontrolujSouboryDavek(rq?:CallParams<{soubory:Gordic.General.ApplicationInterface.GFileInfoDto[]}>): _Task<{soubory:Gordic.General.ApplicationInterface.GFileInfoDto[]},Gordic.Rob.Interface.GDavkyAktVysKontrolyROBDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkyAktObcaneROB: ServiceBase & Catalog.DavkyAktObcaneROB;
	}
	const DavkyAktObcaneROB: Client["DavkyAktObcaneROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDavkyAktObcaneROBFilter {
		/**Identifikátor robsdav*/
		ixs_unl,
		/**Pořadové číslo*/
		por_cislo,
		/**Aktivita*/
		aktivita,
		/**Rodné číslo*/
		rod_cisn,
		/**Příjmení*/
		prn,
		/**Jméno*/
		jmn,
		/**Důvod změny*/
		duv_zm,
		/**Stav zpracování*/
		stav_zprac,
		/**Typ pobytu*/
		typ_pob,
		/**Důvod odmítnutí*/
		duvod_odmitnuti,
		/**Datum účinnosti*/
		datum_ucinnosti,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Davky\Gordic.Rob.Interface.IGDavkyAktROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro detail aktualizační dávky
	* @domain RegObyvatel
	* @businessObject RobDavkyAkt
	*/
	interface DavkyAktROB {
		/**List - List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GDavkyAktROBDto>>;
		/**Read*/
		read(rq?:Gordic.Rob.Interface.GDavkyAktROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GDavkyAktROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GDavkyAktROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GDavkyAktROBDto>>;
		/**Create*/
		create(rq?:Gordic.Rob.Interface.GDavkyAktROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyAktROBDto>>;
		/**Update*/
		update(rq?:Gordic.Rob.Interface.GDavkyAktROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyAktROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyAktROBDto>>;
		/**Odstranit robsunl*/
		odstranitRobsunl(rq?:CallParams<{ixsUnl:string}>): _Task<{ixsUnl:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkyAktROB: ServiceBase & Catalog.DavkyAktROB;
	}
	const DavkyAktROB: Client["DavkyAktROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDavkyAktROBFilter {
		/**Aktivita*/
		aktivita,
		ixs_unl,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Davky\Gordic.Rob.Interface.IGDavkyZakObcaneROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro detail osoby v zakládací dávce
	* @domain RegObyvatel
	* @businessObject RobDavkyZakObcaneROB
	*/
	interface DavkyZakObcaneROB {
		/**List - List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GDavkyZakObcaneDto>>;
		/**Read*/
		read(rq?:Gordic.Rob.Interface.GDavkyZakObcaneDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GDavkyZakObcaneDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GDavkyZakObcaneDto>,GServiceReadResponse<Gordic.Rob.Interface.GDavkyZakObcaneDto>>;
		/**Create*/
		create(rq?:Gordic.Rob.Interface.GDavkyZakObcaneDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakObcaneDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakObcaneDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyZakObcaneDto>>;
		/**Update*/
		update(rq?:Gordic.Rob.Interface.GDavkyZakObcaneDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakObcaneDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakObcaneDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyZakObcaneDto>>;
		/**Zkontroluje a porovná data v dávce s daty v ROB*/
		kontrolaRobddavROB(rq?:CallParams<{ixsDav:string,porCislo:number}>): _Task<{ixsDav:string,porCislo:number},void>;
		/**Doplní doručovací adresy z dat v dávce*/
		opravaDorucAdrZDavky(rq?:CallParams<{ixsDav:string}>): _Task<{ixsDav:string},void>;
		/**Otestuje zda se v tabulce robsoso nachází nějaké záznamy*/
		testExistRobsosoZaznamy(rq?:CallParams<{}>): _Task<{},boolean>;
		/**Otestuje zda se v tabulce robsido nachází nějaké záznamy*/
		testExistRobsidoZaznamy(rq?:CallParams<{}>): _Task<{},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkyZakObcaneROB: ServiceBase & Catalog.DavkyZakObcaneROB;
	}
	const DavkyZakObcaneROB: Client["DavkyZakObcaneROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDavkyZakObcaneROBFilter {
		/**Identifikátor robsdav*/
		ixs_dav,
		/**Aktivita*/
		aktivita,
		/**Rodné číslo*/
		rod_cis,
		/**Příjmení*/
		prijmeni,
		/**Jméno*/
		jmeno,
		/**Stav v ROB*/
		stav_rob,
		/**Identifikátor osoby v ROB*/
		ixs_oso,
		/**Typ dorucovací adresy*/
		dor_adr_typ,
		/**Pořadové číslo*/
		por_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Davky\Gordic.Rob.Interface.IGDavkyZakROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro detail zakládací dávky
	* @domain RegObyvatel
	* @businessObject RobDavkyZak
	*/
	interface DavkyZakROB {
		/**List - List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GDavkyZakDto>>;
		/**Read*/
		read(rq?:Gordic.Rob.Interface.GDavkyZakDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GDavkyZakDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GDavkyZakDto>,GServiceReadResponse<Gordic.Rob.Interface.GDavkyZakDto>>;
		/**Create*/
		create(rq?:Gordic.Rob.Interface.GDavkyZakDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyZakDto>>;
		/**Update*/
		update(rq?:Gordic.Rob.Interface.GDavkyZakDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GDavkyZakDto>,GServiceSaveResponse<Gordic.Rob.Interface.GDavkyZakDto>>;
		/**Odstranit robsdav*/
		odstranitRobsdav(rq?:CallParams<{ixsDav:string}>): _Task<{ixsDav:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkyZakROB: ServiceBase & Catalog.DavkyZakROB;
	}
	const DavkyZakROB: Client["DavkyZakROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GDavkyZakROBFilter {
		/**Identifikátor robsdav*/
		ixs_dav,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\PorovnaniREN\Gordic.Rob.Interface.IGPorovnaniRENROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro prázdné objekty
	* @domain RegObyvatel
	* @businessObject RobPrazdneObjekty
	*/
	interface PrazdneObjektyROB {
		/**Seznam prázdných objektů*/
		list(rq?:CallParams<{rq:GServiceListRequest,typNemovitosti:number}>): _Task<{rq:GServiceListRequest,typNemovitosti:number},GServiceListResponse<Gordic.Rob.Interface.GPrazdneObjektyROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PrazdneObjektyROB: ServiceBase & Catalog.PrazdneObjektyROB;
	}
	const PrazdneObjektyROB: Client["PrazdneObjektyROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Filtrační kritéria pro filtr robsdav*/ 
	const enum GPrazdneObjektyROBFilter {
		/**kód katastrálního území*/
		kod_kat_uzemi,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\PorovnaniREN\Gordic.Rob.Interface.IGRenDetPorovnaniROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro robdprn - detail porovnání ROB s REN
	* @domain RegObyvatel
	* @businessObject RobRenDetPorovnani
	*/
	interface RenDetPorovnaniROB {
		/**List - Načtení seznamu detailů porovnání s REN*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GRenDetPorovnaniROBDto>>;
		/**Read - Načtení detailu robdprn*/
		read(rq?:Gordic.Rob.Interface.GRenDetPorovnaniROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GRenDetPorovnaniROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GRenDetPorovnaniROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GRenDetPorovnaniROBDto>>;
		/**Create - Založení detailu robdprn*/
		create(rq?:Gordic.Rob.Interface.GRenDetPorovnaniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GRenDetPorovnaniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GRenDetPorovnaniROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GRenDetPorovnaniROBDto>>;
		/**Srovnání dvou uložených porovnání s REN*/
		srovnaniUlozenychPorovnani(rq?:CallParams<{ixsPrn1:string,ixsPrn2:string}>): _Task<{ixsPrn1:string,ixsPrn2:string},GServiceListResponse<Gordic.Rob.Interface.GPrazdneObjektyROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RenDetPorovnaniROB: ServiceBase & Catalog.RenDetPorovnaniROB;
	}
	const RenDetPorovnaniROB: Client["RenDetPorovnaniROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Filtrační kritéria pro filtr robsdav*/
	const enum GRenDetPorovnaniROBFilter {
		/**Přadované číslo*/
		por_cislo,
		/**Identifikátor robdprn*/
		ixs_prn,
		/**Aktivita*/
		aktivita,
		/**id_budovy*/
		id_budovy,
		/**typ_nemovitosti*/
		typ_nemovitosti,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\PorovnaniREN\Gordic.Rob.Interface.IGRenPorovnaniROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface AL pro robsprn - porovnání ROB s REN
	* @domain RegObyvatel
	* @businessObject RobRenPorovnani
	*/
	interface RenPorovnaniROB {
		/**Read - Načtení detailu robsprn*/
		read(rq?:Gordic.Rob.Interface.GRenPorovnaniROBDto|CallParams<GServiceReadRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>>): _Task<GServiceReadRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>,GServiceReadResponse<Gordic.Rob.Interface.GRenPorovnaniROBDto>>;
		/**Založení detailu robsprn*/
		create(rq?:Gordic.Rob.Interface.GRenPorovnaniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GRenPorovnaniROBDto>>;
		/**Oprava detailu robsprn*/
		update(rq?:Gordic.Rob.Interface.GRenPorovnaniROBDto|CallParams<GServiceSaveRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>>): _Task<GServiceSaveRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>,GServiceSaveResponse<Gordic.Rob.Interface.GRenPorovnaniROBDto>>;
		/**List - Načtení seznamu robsprn*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GRenPorovnaniROBDto>>;
		/**Změna aktivity záznamu*/
		nastavitAktivitu(rq?:Gordic.Rob.Interface.GRenPorovnaniROBDto|CallParams<GServiceActionRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>>): _Task<GServiceActionRequest<Gordic.Rob.Interface.GRenPorovnaniROBDto>,GServiceActionResponse<Gordic.Rob.Interface.GRenPorovnaniROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RenPorovnaniROB: ServiceBase & Catalog.RenPorovnaniROB;
	}
	const RenPorovnaniROB: Client["RenPorovnaniROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Filtrační kritéria pro filtr robsdav*/
	const enum GRenPorovnaniROBFilter {
		/**DBCOLUMN:robsprn.ixs_prn*/
		ixs_prn,
		/**DBCOLUMN:robsprn.nazev*/
		nazev,
		/**DBCOLUMN:robsprn.popis*/
		popis,
		/**DBCOLUMN:robsprn.dat_porovnani*/
		dat_porovnani,
		/**DBCOLUMN:robsprn.dat_ulozeni*/
		dat_ulozeni,
		/**DBCOLUMN:robsprn.poznamka*/
		poznamka,
		/**DBCOLUMN:robsprn.aktivita*/
		aktivita,
		/**DBCOLUMN:robsprn.dat_zmena*/
		dat_zmena,
		/**DBCOLUMN:robsprn.zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaBydlisteROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku bydliště
	* @domain RegObyvatel
	* @businessObject StatistikaBydliste
	*/
	interface StatistikaBydlisteROB {
		/**List - Počty obyvatel dle části obce*/
		statistikaPoctyObyvatelCastObce(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaBydlisteROBDto>>;
		/**List - Počty obyvatel dle ulice*/
		statistikaPoctyObyvatelUlice(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaBydlisteROBDto>>;
		/**List - Počty obyvatel dle čp*/
		statistikaPoctyPoctyObyvatelCP(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaBydlisteROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaBydlisteROB: ServiceBase & Catalog.StatistikaBydlisteROB;
	}
	const StatistikaBydlisteROB: Client["StatistikaBydlisteROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Filtrační kritéria pro filtr seznamu*/
	const enum GStatistikaBydlisteROBFilter {
		/**Obec*/
		obec,
		/**Část obce*/
		castobce,
		/**Ulice*/
		ulice,
		/**Typ pobytu*/
		typ_pobytu,
		/**Datum narození*/
		dat_naroz,
		/**Číslo orientační*/
		cor,
		/**Písmeno čísla orientačního*/
		pcor,
		/**Druh čísla domovního*/
		dcd,
		/**Číslo domovní*/
		cd,
		/**Volební okrsek*/
		obvod,
		/**Index domu*/
		id,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaOstatniROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro ostatní statistiky
	* @domain RegObyvatel
	* @businessObject StatistikaOstatni
	*/
	interface StatistikaOstatniROB {
		/**List - Rodinné stavy*/
		statistikaRodinneStavy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaOstatniROBDto>>;
		/**List - Národnosti*/
		statistikaNarodnosti(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaOstatniROBDto>>;
		/**List - Ekonomická aktivita*/
		statistikaEkonAktivita(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaOstatniROBDto>>;
		/**List - Občanství*/
		statistikaObcanstvi(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaOstatniROBDto>>;
		/**List - Vzdělání*/
		statistikaVzdelani(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaOstatniROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaOstatniROB: ServiceBase & Catalog.StatistikaOstatniROB;
	}
	const StatistikaOstatniROB: Client["StatistikaOstatniROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPoctyObyvatelVolObvodyROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku obyvatel dle vol. obvodů
	* @domain RegObyvatel
	* @businessObject StatistikaPoctyObyvatelVolObvody
	*/
	interface StatistikaPoctyObyvatelVolObvody {
		/**List - Počty obyvatel dle vol. obvodů*/
		statistikaPoctyObyvatelVolObvody(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaVolObvodyROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaPoctyObyvatelVolObvody: ServiceBase & Catalog.StatistikaPoctyObyvatelVolObvody;
	}
	const StatistikaPoctyObyvatelVolObvody: Client["StatistikaPoctyObyvatelVolObvody"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GStatistikaPoctyObyvatelVolObvodyROBFilter {
		/**Datum narození*/
		dat_naroz,
		/**Omezení svéprávnosti*/
		bez_omezeni_svepravnosti,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPoctyPrijemniAJmenROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku jmen a příjmení
	* @domain RegObyvatel
	* @businessObject StatistikaPoctyPrijemniAJmen
	*/
	interface StatistikaPoctyPrijemniAJmenROB {
		/**List - Počty příjmení*/
		statistikaPoctyPrijmeni(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaPrijmeniJmenoROBDto>>;
		/**List - Počty jmen*/
		statistikaPoctyJmen(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaPrijmeniJmenoROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaPoctyPrijemniAJmenROB: ServiceBase & Catalog.StatistikaPoctyPrijemniAJmenROB;
	}
	const StatistikaPoctyPrijemniAJmenROB: Client["StatistikaPoctyPrijemniAJmenROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GStatistikaPoctyPrijemniAJmenROBFilter {
		/**Jméno osoby*/
		jmeno,
		/**Příjmení osoby*/
		prijmeni,
		/**Typ pobytu*/
		typ_pobytu,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPodilObyvatelROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku podíl obyvatel
	* @domain RegObyvatel
	* @businessObject StatistikaPodilObyvatel
	*/
	interface StatistikaPodilObyvatelROB {
		/**List - podíl obyvatel*/
		statistikaPodilObyvatel(rq?:CallParams<{rq:GServiceListRequest,duchodovyVek:number}>): _Task<{rq:GServiceListRequest,duchodovyVek:number},GServiceListResponse<Gordic.Rob.Interface.GStatistikaPodilObyvatelROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaPodilObyvatelROB: ServiceBase & Catalog.StatistikaPodilObyvatelROB;
	}
	const StatistikaPodilObyvatelROB: Client["StatistikaPodilObyvatelROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPodkladProCOROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro podklad pro CO
	* @domain RegObyvatel
	* @businessObject StatistikaPodkladProCO
	*/
	interface StatistikaPodkladProCOROB {
		/**List - Podklad pro CO*/
		statistikaPodkladProCO(rq?:CallParams<{rq:GServiceListRequest,dleCastiObce:boolean}>): _Task<{rq:GServiceListRequest,dleCastiObce:boolean},GServiceListResponse<Gordic.Rob.Interface.GStatistikaPodkladProCOROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaPodkladProCOROB: ServiceBase & Catalog.StatistikaPodkladProCOROB;
	}
	const StatistikaPodkladProCOROB: Client["StatistikaPodkladProCOROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaPohybObyvatelROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku pohyb obyvatel
	* @domain RegObyvatel
	* @businessObject StatistikaPohybObyvatel
	*/
	interface StatistikaPohybObyvatelROB {
		/**List - Pohyb obyvatel*/
		statistikaPohybObyvatel(rq?:CallParams<{typPobytu:number,rok:number,souctova:boolean,mesic:number,castObce:string}>): _Task<{typPobytu:number,rok:number,souctova:boolean,mesic:number,castObce:string},GServiceListResponse<Gordic.Rob.Interface.GStatistikaPohybObyvatelROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaPohybObyvatelROB: ServiceBase & Catalog.StatistikaPohybObyvatelROB;
	}
	const StatistikaPohybObyvatelROB: Client["StatistikaPohybObyvatelROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GStatistikaPohybObyvatelROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaStavObyvatelROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku stav obyvatel
	* @domain RegObyvatel
	* @businessObject StatistikaStavObyvatel
	*/
	interface StatistikaStavObyvatelROB {
		/**List - Stav obyvatel k datu*/
		statistikaStavObyvatelKDatu(rq?:CallParams<{typPobytu:number,datum:JsonDate}>): _Task<{typPobytu:number,datum:JsonDate},GServiceListResponse<Gordic.Rob.Interface.GStatistikaStavObyvatelROBDto>>;
		/**List - Stav obyvatel k datu (kategorie)*/
		statistikaStavObyvatelKDatuKategorie(rq?:CallParams<{typPobytu:number,datum:JsonDate,vek:number}>): _Task<{typPobytu:number,datum:JsonDate,vek:number},GServiceListResponse<Gordic.Rob.Interface.GStatistikaStavObyvatelROBDto>>;
		/**List - Potencionální voliči k datu*/
		statistikaVoliciKDatu(rq?:CallParams<{typPobytu:number,datum:JsonDate}>): _Task<{typPobytu:number,datum:JsonDate},GServiceListResponse<Gordic.Rob.Interface.GStatistikaStavObyvatelROBDto>>;
		/**List - Stav obyvatel k datu - ulice*/
		statistikaStavObyvatelKDatuUlice(rq?:CallParams<{typPobytu:number,datum:JsonDate,ulice:string,cd:number,cor:number}>): _Task<{typPobytu:number,datum:JsonDate,ulice:string,cd:number,cor:number},GServiceListResponse<Gordic.Rob.Interface.GStatistikaStavObyvatelROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaStavObyvatelROB: ServiceBase & Catalog.StatistikaStavObyvatelROB;
	}
	const StatistikaStavObyvatelROB: Client["StatistikaStavObyvatelROB"];
}
declare namespace Gordic.Rob.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GStatistikaStavObyvatelROBFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaVekovaStrukturaROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku věková struktura
	* @domain RegObyvatel
	* @businessObject StatistikaVekovaStruktura
	*/
	interface StatistikaVekovaStrukturaROB {
		/**List - Věková struktura*/
		statistikaVekovaStruktura(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Rob.Interface.GStatistikaVekovaStrukturaROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaVekovaStrukturaROB: ServiceBase & Catalog.StatistikaVekovaStrukturaROB;
	}
	const StatistikaVekovaStrukturaROB: Client["StatistikaVekovaStrukturaROB"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Rob.Interface\Isl\Statistika\Gordic.Rob.Interface.IGStatistikaVekoveSlozeniObceROB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro statistiku věkového složení obce
	* @domain RegObyvatel
	* @businessObject StatistikaVekoveSlozeniObce
	*/
	interface StatistikaVekoveSlozeniObceROB {
		/**List - Věkové složení obce*/
		statistikaVekoveSlozeniObce(rq?:CallParams<{rq:GServiceListRequest,rozmezi:number,dleCasti:boolean,kDatu:JsonDate}>): _Task<{rq:GServiceListRequest,rozmezi:number,dleCasti:boolean,kDatu:JsonDate},GServiceListResponse<Gordic.Rob.Interface.GStatistikaVekSlozeniObceROBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		StatistikaVekoveSlozeniObceROB: ServiceBase & Catalog.StatistikaVekoveSlozeniObceROB;
	}
	const StatistikaVekoveSlozeniObceROB: Client["StatistikaVekoveSlozeniObceROB"];
}

//#endregion

