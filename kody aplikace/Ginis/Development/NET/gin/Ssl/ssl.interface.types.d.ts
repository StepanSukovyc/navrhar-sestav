/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ssl.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ssl.Interface\Gordic.Ssl.Interface.csproj
*    created     2026-02-16 14:33:49
*    files       AsyncTaskDto\GPretriditDoVecneSkupinyDto.d.ts
*                AsyncTaskDto\GUzavreniVecneSkupinyDto.d.ts
*                Detail pisemnosti\Gordic.Ssl.Interface.IGDetSslspid.d.ts
*                Detail pisemnosti\Dto\SeznamKopiiDokumentuDto.d.ts
*                Detail spisu\Dto\SeznamSbernyArchSpisuDto.d.ts
*                DTO\GDashboardCountFiltersDto.d.ts
*                DTO\GDokumentCreateRequestDto.d.ts
*                DTO\GDokumentDeleteRequestDto.d.ts
*                DTO\GDokumentDeleteResponseDto.d.ts
*                DTO\GDokumentDto.d.ts
*                DTO\GDokumentFilterDto.d.ts
*                DTO\GDokumentUpdateRequestDto.d.ts
*                DTO\GEnums.d.ts
*                DTO\GGinsvskDto.d.ts
*                DTO\GInputImportSpisPlanDto.d.ts
*                DTO\GSeznamKatastruDto.d.ts
*                DTO\GSpisDto.d.ts
*                DTO\GSpisFilterDto.d.ts
*                DTO\GSsldospDto.d.ts
*                DTO\GSslspidDto.d.ts
*                DTO\GSslspidFilterDto.d.ts
*                DTO\GSslspidGetDashboardCountsDto.d.ts
*                DTO\SeznamObsahDiluDto.d.ts
*                DTO\SeznamObsahTypovehoSpisuDto.d.ts
*                DTO\Ruzne\GExportElDokumentuDto.d.ts
*                Eklep\IGEklepSsl.d.ts
*                Eklep\IGSsldeko.d.ts
*                Eklep\IGSsldeks.d.ts
*                Eklep\IGSslseklPripominkoveRizeni.d.ts
*                Eklep\IGSslsoek.d.ts
*                Eklep\IGSslspek.d.ts
*                Eklep\IGSslspem.d.ts
*                Eklep\IGSslspepPredplneniEklepPrilohy.d.ts
*                Eklep\Dto\GEklepRuznaDto.d.ts
*                Eklep\Dto\GSsldeklDto.d.ts
*                Eklep\Dto\GSsldekoDto.d.ts
*                Eklep\Dto\GSsldekpDto.d.ts
*                Eklep\Dto\GSsldeksDto.d.ts
*                Eklep\Dto\GSsldereDto.d.ts
*                Eklep\Dto\GSslderpDto.d.ts
*                Eklep\Dto\GSslseklDto.d.ts
*                Eklep\Dto\GSslseklFilterDto.d.ts
*                Eklep\Dto\GSslsekpPredplneniEklepDto.d.ts
*                Eklep\Dto\GSslsoekDto.d.ts
*                Eklep\Dto\GSslspekDto.d.ts
*                Eklep\Dto\GSslspemDto.d.ts
*                Eklep\Dto\GSslspepPredplneniEklepPrilohyDto.d.ts
*                Gin\DokumentObrazekNaDetailu.d.ts
*                Gin\IGDokument.d.ts
*                Gin\IGSpis.d.ts
*                Gin\IGSpisovyPlan.d.ts
*                Gin\IGSsl.d.ts
*                Gin\IGSslspid.d.ts
*                Gin\IGSslspidShared.d.ts
*                Gin\IGVecnaSkupina.d.ts
*                Kontrola metadat\Dto\ControlNevalidityFields.d.ts
*                Kontrola metadat\Dto\NeevidDokSpisNevalidiFields.d.ts
*                Kontrola metadat\Dto\OpravaMetadatNevalidPolozekDokSpisDetailDto.d.ts
*                Kontrola metadat\Dto\OpravaMetadatNevalidPolozekDokSpisSaveDto.d.ts
*                NEN\IGNenSsl.d.ts
*                NEN\Dto\GNenDto.d.ts
*                Ostatni\Typove datasety\Gordic.Ssl.Interface.SeznamSpisovychDeniku.Dto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\AsyncTaskDto\GPretriditDoVecneSkupinyDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dto pro přetřídění do jiné věcné skupiny request*/
	interface GPretriditDoVecneSkupinyRequestDto {
		/**Původní věcná skupina*/
		ixs_vsk_old?: string|null;
		/**Původní věcná skupina txt*/
		ixs_vsk_old_txt?: string|null;
		/**Nová věcná skupina*/
		ixs_vsk_new?: string|null;
		/**Nová věcná skupina txt*/
		ixs_vsk_new_txt?: string|null;
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Funkční místo txt*/
		ixs_fun_txt?: string|null;
		/**ID spisů*/
		spisy?: Gordic.Ssl.Interface.GSpisVecneSkupinyDto[]|null;
		/**Identifikátor dat v temp tabulce*/
		ikc?: number|null;
		/**Datum po4čátku*/
		dat_start?: JsonDate|null;
		/**Pořadí logu do databáze*/
		log_por_cislo?: number|null;
		/**Pouze vybrané spisy*/
		pouze_vybrane_spisy?: boolean|null;
		/**Včetně uzavřených*/
		vcetne_uzavrenych?: boolean|null;
		/**Pouze uzavřené*/
		pouze_uzavrene?: boolean|null;
	}
	const enum GPretriditDoVecneSkupinyRequestDtoNames { ixs_vsk_old = "ixs_vsk_old", ixs_vsk_old_txt = "ixs_vsk_old_txt", ixs_vsk_new = "ixs_vsk_new", ixs_vsk_new_txt = "ixs_vsk_new_txt", ixs_fun = "ixs_fun", ixs_fun_txt = "ixs_fun_txt", spisy = "spisy", ikc = "ikc", dat_start = "dat_start", log_por_cislo = "log_por_cislo", pouze_vybrane_spisy = "pouze_vybrane_spisy", vcetne_uzavrenych = "vcetne_uzavrenych", pouze_uzavrene = "pouze_uzavrene",}
	const enum GPretriditDoVecneSkupinyRequestDtoFragments { ixs_vsk_old = "*", ixs_vsk_old_txt = "*", ixs_vsk_new = "*", ixs_vsk_new_txt = "*", ixs_fun = "*", ixs_fun_txt = "*", spisy = "*", ikc = "*", dat_start = "*", log_por_cislo = "*", pouze_vybrane_spisy = "*", vcetne_uzavrenych = "*", pouze_uzavrene = "*",}
	const enum GPretriditDoVecneSkupinyRequestDtoTypes { ixs_vsk_old = "string", ixs_vsk_old_txt = "string", ixs_vsk_new = "string", ixs_vsk_new_txt = "string", ixs_fun = "string", ixs_fun_txt = "string", spisy = "Gordic.Ssl.Interface.GSpisVecneSkupinyDto[]", ikc = "number", dat_start = "JsonDate", log_por_cislo = "number", pouze_vybrane_spisy = "boolean", vcetne_uzavrenych = "boolean", pouze_uzavrene = "boolean",}
	const enum GPretriditDoVecneSkupinyRequestDtoTypeLengths {}
	/**Dto pro přetřídění do jiné věcné skupiny response*/
	interface GPretriditDoVecneSkupinyResponseDto {
		/**Identifikátor dat v temp tabulce*/
		ikc?: number|null;
		/**Pořadí přihlášení*/
		log_por_cislo?: number|null;
		/**Původní věcná skupina*/
		ixs_vsk_old?: string|null;
		/**Původní věcná skupina*/
		ixs_vsk_old_txt?: string|null;
		/**Nová věcná skupina*/
		ixs_vsk_new?: string|null;
		/**Nová věcná skupina*/
		ixs_vsk_new_txt?: string|null;
		/**Počet úspěšných*/
		pocetUspesnych?: number|null;
		/**Počet úspěšných*/
		pocetNeuspesnych?: number|null;
		/**Datum a čas startu*/
		dat_start?: JsonDate|null;
		/**Datum a čas startu*/
		dat_end?: JsonDate|null;
		/**Funkční místo*/
		ixs_fun?: string|null;
		/**Funkční místo txt*/
		ixs_fun_txt?: string|null;
	}
	const enum GPretriditDoVecneSkupinyResponseDtoNames { ikc = "ikc", log_por_cislo = "log_por_cislo", ixs_vsk_old = "ixs_vsk_old", ixs_vsk_old_txt = "ixs_vsk_old_txt", ixs_vsk_new = "ixs_vsk_new", ixs_vsk_new_txt = "ixs_vsk_new_txt", pocetUspesnych = "pocetUspesnych", pocetNeuspesnych = "pocetNeuspesnych", dat_start = "dat_start", dat_end = "dat_end", ixs_fun = "ixs_fun", ixs_fun_txt = "ixs_fun_txt",}
	const enum GPretriditDoVecneSkupinyResponseDtoFragments { ikc = "*", log_por_cislo = "*", ixs_vsk_old = "*", ixs_vsk_old_txt = "*", ixs_vsk_new = "*", ixs_vsk_new_txt = "*", pocetUspesnych = "*", pocetNeuspesnych = "*", dat_start = "*", dat_end = "*", ixs_fun = "*", ixs_fun_txt = "*",}
	const enum GPretriditDoVecneSkupinyResponseDtoTypes { ikc = "number", log_por_cislo = "number", ixs_vsk_old = "string", ixs_vsk_old_txt = "string", ixs_vsk_new = "string", ixs_vsk_new_txt = "string", pocetUspesnych = "number", pocetNeuspesnych = "number", dat_start = "JsonDate", dat_end = "JsonDate", ixs_fun = "string", ixs_fun_txt = "string",}
	const enum GPretriditDoVecneSkupinyResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\AsyncTaskDto\GUzavreniVecneSkupinyDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dto pro požadavek uzavření věcné skupiny*/
	interface GUzavreniVecneSkupinyRequestDto {
		/**Původní věcná skupina*/
		ixs_vsk_puvodni?: string|null;
		/**Cílová věcná skupina*/
		ixs_vsk_cilova?: string|null;
	}
	const enum GUzavreniVecneSkupinyRequestDtoNames { ixs_vsk_puvodni = "ixs_vsk_puvodni", ixs_vsk_cilova = "ixs_vsk_cilova",}
	const enum GUzavreniVecneSkupinyRequestDtoFragments { ixs_vsk_puvodni = "*", ixs_vsk_cilova = "*",}
	const enum GUzavreniVecneSkupinyRequestDtoTypes { ixs_vsk_puvodni = "string", ixs_vsk_cilova = "string",}
	const enum GUzavreniVecneSkupinyRequestDtoTypeLengths {}
	/**Dto pro odpověď uzavření věcné skupiny*/
	interface GUzavreniVecneSkupinyResponseDto {
		/**Původní věcná skupina*/
		ixs_vsk_puvodni?: string|null;
		/**Textová reprezentace původní věcné skupiny*/
		ixs_vsk_puvodni_txt?: string|null;
		/**Cílová věcná skupina*/
		ixs_vsk_cilova?: string|null;
		/**Textová reprezentace cílové věcné skupiny*/
		ixs_vsk_cilova_txt?: string|null;
		/**Počet přetříděných*/
		pocet_pretridenych?: number|null;
	}
	const enum GUzavreniVecneSkupinyResponseDtoNames { ixs_vsk_puvodni = "ixs_vsk_puvodni", ixs_vsk_puvodni_txt = "ixs_vsk_puvodni_txt", ixs_vsk_cilova = "ixs_vsk_cilova", ixs_vsk_cilova_txt = "ixs_vsk_cilova_txt", pocet_pretridenych = "pocet_pretridenych",}
	const enum GUzavreniVecneSkupinyResponseDtoFragments { ixs_vsk_puvodni = "*", ixs_vsk_puvodni_txt = "*", ixs_vsk_cilova = "*", ixs_vsk_cilova_txt = "*", pocet_pretridenych = "*",}
	const enum GUzavreniVecneSkupinyResponseDtoTypes { ixs_vsk_puvodni = "string", ixs_vsk_puvodni_txt = "string", ixs_vsk_cilova = "string", ixs_vsk_cilova_txt = "string", pocet_pretridenych = "number",}
	const enum GUzavreniVecneSkupinyResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Detail pisemnosti\Gordic.Ssl.Interface.IGDetSslspid.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Sloupce tabulky Sslspid*/
	const enum ColSslspid {
		/**arw*/
		arw,
		/**Stupeň utajení*/
		st_utaj_id,
		/**Obsah*/
		obsah_text,
		/**Poznámka*/
		poznamka,
		/**Počet listů*/
		poc_listu_ZRUSENO_presunuto_do_WFL,
		/**Počet stran*/
		poc_stran_ZRUSENO_presunuto_do_WFL,
		/**Počet příloh*/
		poc_priloh_ZRUSENO_presunuto_do_WFL,
		/**Počet kopií*/
		poc_kop_ZRUSENO_presunuto_do_WFL,
		/**?*/
		poc_kopii,
		/**Datum přijetí/podání*/
		dat_prij_pod,
		/**Identifikátor spisového uzlu podřízeného?*/
		ixs_su_pod,
		/**datum evidence*/
		dat_evid,
		/**Odesláno kam*/
		odeslano_kam,
		/**Řešitel*/
		s_resitel,
		/**Název řešitele*/
		nazev_resitel,
		/**stav vyřízení?*/
		s_vyriz,
		/**typ vyřízení*/
		typ_vyriz,
		/**?*/
		vyriz_komu,
		/**Poznámka k vyřízení*/
		vyriz_pozn,
		/**Identifikátor osoby, která provedla vyřízení*/
		ixs_zmp_vyriz,
		/**stav schválení*/
		s_schval,
		/**identifikátor funkce, která schválila*/
		ixs_fun_schval,
		/**název schválení?*/
		nazev_schval,
		/**Identifikátor osoby, která provedla schválení*/
		ixs_zmp_schval,
		/**stav uzavření*/
		s_uzav,
		/**stav?*/
		s_stor,
		/**stav?*/
		s_ztrat,
		/**datum uzavření*/
		dat_uzav,
		/**identifikátor osoby, která provedla uzavření*/
		ixs_zmp_uzav,
		/**umístění*/
		umisteni,
		/**stav písemnosti*/
		stav_pis_ext,
		/**?*/
		vztah_spis,
		/**stav originálu ?*/
		s_orig,
		/**?*/
		pr_moc,
		/**?*/
		dat_pr_moc,
		/**?*/
		s_agp,
		/**?*/
		s_zastav,
	}
	/**Počet sloupců v výsledkové tabulce sslspid - písemnosti ssl*/
	const enum ColCntSslspid {
		/**počet sloupců*/
		Count=49,
	}
	/**Počet sloupců v výsledkové tabulce sslspid - písemnosti ssl*/
	const enum MakeSpisConfirmStatus {
		/**None*/
		None=0,
		/**Confirm*/
		Confirm=1,
		/**Confirmed*/
		Confirmed=2,
		/**Prepared*/
		ConfirmedAndPrepared=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Detail pisemnosti\Dto\SeznamKopiiDokumentuDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DTO seznamu obsahu spisu*/
	interface SeznamKopiiDokumentuDto {
		/**Autogenerated.*/
		ixp_orig?: string|null;
		/**Autogenerated.*/
		ixp_kop?: string|null;
		/**Autogenerated.*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		s_fyz?: number|null;
		/**Autogenerated.*/
		s_sgn?: number|null;
		/**Autogenerated.*/
		stav_dist?: number|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		typ_spis?: number|null;
		/**Autogenerated.*/
		priz_cj?: number|null;
		/**Autogenerated.*/
		s_prij?: number|null;
		/**Autogenerated.*/
		predat_kam?: string|null;
		/**Autogenerated.*/
		vlastnik?: string|null;
		/**Autogenerated.*/
		cislo_spisu?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		typ_entity_ico?: number|null;
	}
	const enum SeznamKopiiDokumentuDtoNames { ixp_orig = "ixp_orig", ixp_kop = "ixp_kop", nazev_rf = "nazev_rf", nazev = "nazev", poznamka = "poznamka", dat_zmena = "dat_zmena", stav_pis = "stav_pis", s_ele = "s_ele", s_fyz = "s_fyz", s_sgn = "s_sgn", stav_dist = "stav_dist", typ_ag = "typ_ag", typ_spis = "typ_spis", priz_cj = "priz_cj", s_prij = "s_prij", predat_kam = "predat_kam", vlastnik = "vlastnik", cislo_spisu = "cislo_spisu", akt_znacka = "akt_znacka", typ_entity_ico = "typ_entity_ico",}
	const enum SeznamKopiiDokumentuDtoFragments { ixp_orig = "*", ixp_kop = "*", nazev_rf = "*", nazev = "*", poznamka = "*", dat_zmena = "*", stav_pis = "*", s_ele = "*", s_fyz = "*", s_sgn = "*", stav_dist = "*", typ_ag = "*", typ_spis = "*", priz_cj = "*", s_prij = "*", predat_kam = "*", vlastnik = "*", cislo_spisu = "*", akt_znacka = "*", typ_entity_ico = "*",}
	const enum SeznamKopiiDokumentuDtoTypes { ixp_orig = "string", ixp_kop = "string", nazev_rf = "string", nazev = "string", poznamka = "string", dat_zmena = "JsonDate", stav_pis = "number", s_ele = "number", s_fyz = "number", s_sgn = "number", stav_dist = "number", typ_ag = "number", typ_spis = "number", priz_cj = "number", s_prij = "number", predat_kam = "string", vlastnik = "string", cislo_spisu = "string", akt_znacka = "string", typ_entity_ico = "number",}
	const enum SeznamKopiiDokumentuDtoTypeLengths { nazev_rf = 50, nazev = 100, poznamka = 254, predat_kam = 25, vlastnik = 75, cislo_spisu = 40, akt_znacka = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Detail spisu\Dto\SeznamSbernyArchSpisuDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Ssl dokument Dto GDetSslsdcj*/
	interface SeznamSbernyArchSpisuDto {
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		ixp_top?: string|null;
		/**Autogenerated.*/
		typ_spis?: number|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		dat_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_do?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		typ_entity_order?: number|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		dat_zmena_dok?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		fun_resitel_txt?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		vztah_spis?: number|null;
		/**Autogenerated.*/
		puvod?: number|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		s_prij?: number|null;
		/**Autogenerated.*/
		odeslano_kam?: string|null;
		/**Autogenerated.*/
		ixs_typ?: string|null;
		/**Autogenerated.*/
		ixs_typ_txt?: string|null;
		/**Autogenerated.*/
		dat_pod?: JsonDate|null;
		/**Autogenerated.*/
		prio_odkud?: string|null;
		/**Autogenerated.*/
		por_cislo_uziv?: number|null;
		/**Autogenerated.*/
		priz_cj?: number|null;
		/**Autogenerated.*/
		priz_cj_txt?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		misto_vzniku?: string|null;
		/**Autogenerated.*/
		zp_vyriz1?: string|null;
		/**Autogenerated.*/
		zp_vyriz2?: string|null;
		/**Autogenerated.*/
		zp_vyriz?: string|null;
		/**Autogenerated.*/
		s_fyz?: number|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		s_sgn?: number|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		s_schval?: number|null;
		/**Autogenerated.*/
		dat_vyriz?: JsonDate|null;
		/**Autogenerated.*/
		dat_vyriz_do?: JsonDate|null;
		/**Autogenerated.*/
		zas_vyprav?: number|null;
		/**Autogenerated.*/
		zas_doruc?: number|null;
		/**Autogenerated.*/
		zasilek?: string|null;
		/**Autogenerated.*/
		typ_vyriz?: number|null;
		/**Autogenerated.*/
		spis_pl?: string|null;
		/**Autogenerated.*/
		spis_znak?: string|null;
		/**Autogenerated.*/
		skar_znak?: string|null;
		/**Autogenerated.*/
		skar_lhuta?: number|null;
		/**Autogenerated.*/
		skar_znak2?: string|null;
		/**Autogenerated.*/
		skar_lhuta2?: number|null;
		/**Autogenerated.*/
		dat_dtermin?: JsonDate|null;
		/**Autogenerated.*/
		dilci_termin?: number|null;
		/**Autogenerated.*/
		el_bitmap?: number|null;
		/**Autogenerated.*/
		doctype_bitmap?: number|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		uzo?: string|null;
		/**Autogenerated.*/
		aktivita_nad?: number|null;
		/**Autogenerated.*/
		typ_entity_ico?: number|null;
		/**Autogenerated.*/
		vlastnictvi_doruceni_ico?: number|null;
		/**Autogenerated.*/
		pozice_spis_ico?: number|null;
		/**Autogenerated.*/
		technicke_vlastnosti_ico?: number|null;
		/**Autogenerated.*/
		stav_zpracovani_ico?: number|null;
		/**Autogenerated.*/
		stav_epk_txt?: string|null;
		/**Autogenerated.*/
		typ_pozad_pod_txt?: string|null;
		/**ico ident_txt*/
		ident_txt?: string|null;
		/**ico obr_1*/
		obr_1?: string|null;
		/**ico obr_1*/
		obr_2?: string|null;
		/**dok_poznamka*/
		dok_poznamka?: string|null;
		/**dok_poznamka*/
		st_utaj_id_txt?: string|null;
		/**dok_poznamka*/
		sp_zn_odes?: string|null;
		/**typFormyDokumentu*/
		typFormyDokumentu?: Gordic.Wfl.Interface.TypFormyDokumentu|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**Umístění*/
		umisteni_txt?: string|null;
		/**nazev_spu_ixs_typ*/
		nazev_spu_ixs_typ?: string|null;
		/**skar_znak_ixs_typ*/
		skar_znak_ixs_typ?: string|null;
		/**skar_lhuta_ixs_typ.*/
		skar_lhuta_ixs_typ?: number|null;
		/**ktg_spu_ixs_typ.*/
		ktg_spu_ixs_typ?: number|null;
	}
	const enum SeznamSbernyArchSpisuDtoNames { ixp_spis = "ixp_spis", ixp = "ixp", ixp_top = "ixp_top", typ_spis = "typ_spis", stav_pis = "stav_pis", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", typ_entity_order = "typ_entity_order", poznamka = "poznamka", dat_zmena = "dat_zmena", dat_zmena_dok = "dat_zmena_dok", zmenu_prov = "zmenu_prov", nazev_rf = "nazev_rf", fun_resitel_txt = "fun_resitel_txt", por_cislo = "por_cislo", vztah_spis = "vztah_spis", puvod = "puvod", nazev = "nazev", s_prij = "s_prij", odeslano_kam = "odeslano_kam", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", dat_pod = "dat_pod", prio_odkud = "prio_odkud", por_cislo_uziv = "por_cislo_uziv", priz_cj = "priz_cj", priz_cj_txt = "priz_cj_txt", akt_znacka = "akt_znacka", misto_vzniku = "misto_vzniku", zp_vyriz1 = "zp_vyriz1", zp_vyriz2 = "zp_vyriz2", zp_vyriz = "zp_vyriz", s_fyz = "s_fyz", s_ele = "s_ele", s_sgn = "s_sgn", priz_spis = "priz_spis", typ_ag = "typ_ag", s_schval = "s_schval", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zas_vyprav = "zas_vyprav", zas_doruc = "zas_doruc", zasilek = "zasilek", typ_vyriz = "typ_vyriz", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", skar_znak2 = "skar_znak2", skar_lhuta2 = "skar_lhuta2", dat_dtermin = "dat_dtermin", dilci_termin = "dilci_termin", el_bitmap = "el_bitmap", doctype_bitmap = "doctype_bitmap", m_vyber = "m_vyber", uzo = "uzo", aktivita_nad = "aktivita_nad", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", pozice_spis_ico = "pozice_spis_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_epk_txt = "stav_epk_txt", typ_pozad_pod_txt = "typ_pozad_pod_txt", ident_txt = "ident_txt", obr_1 = "obr_1", obr_2 = "obr_2", dok_poznamka = "dok_poznamka", st_utaj_id_txt = "st_utaj_id_txt", sp_zn_odes = "sp_zn_odes", typFormyDokumentu = "typFormyDokumentu", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", zmenu_prov_txt = "zmenu_prov_txt", umisteni_txt = "umisteni_txt", nazev_spu_ixs_typ = "nazev_spu_ixs_typ", skar_znak_ixs_typ = "skar_znak_ixs_typ", skar_lhuta_ixs_typ = "skar_lhuta_ixs_typ", ktg_spu_ixs_typ = "ktg_spu_ixs_typ",}
	const enum SeznamSbernyArchSpisuDtoFragments { ixp_spis = "*", ixp = "*", ixp_top = "*", typ_spis = "*", stav_pis = "*", dat_od = "*", dat_do = "*", aktivita = "*", typ_entity_order = "*", poznamka = "*", dat_zmena = "*", dat_zmena_dok = "*", zmenu_prov = "*", nazev_rf = "*", fun_resitel_txt = "*", por_cislo = "*", vztah_spis = "*", puvod = "*", nazev = "*", s_prij = "*", odeslano_kam = "*", ixs_typ = "*", ixs_typ_txt = "*", dat_pod = "*", prio_odkud = "*", por_cislo_uziv = "*", priz_cj = "*", priz_cj_txt = "*", akt_znacka = "*", misto_vzniku = "*", zp_vyriz1 = "*", zp_vyriz2 = "*", zp_vyriz = "*", s_fyz = "*", s_ele = "*", s_sgn = "*", priz_spis = "*", typ_ag = "*", s_schval = "*", dat_vyriz = "*", dat_vyriz_do = "*", zas_vyprav = "*", zas_doruc = "*", zasilek = "*", typ_vyriz = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", skar_znak2 = "*", skar_lhuta2 = "*", dat_dtermin = "*", dilci_termin = "*", el_bitmap = "*", doctype_bitmap = "*", m_vyber = "*", uzo = "*", aktivita_nad = "*", typ_entity_ico = "*", vlastnictvi_doruceni_ico = "*", pozice_spis_ico = "*", technicke_vlastnosti_ico = "*", stav_zpracovani_ico = "*", stav_epk_txt = "*", typ_pozad_pod_txt = "*", ident_txt = "*", obr_1 = "*", obr_2 = "*", dok_poznamka = "*", st_utaj_id_txt = "*", sp_zn_odes = "*", typFormyDokumentu = "*", ixs_fun_akt = "*", ixs_su_akt = "*", zmenu_prov_txt = "*", umisteni_txt = "*", nazev_spu_ixs_typ = "*", skar_znak_ixs_typ = "*", skar_lhuta_ixs_typ = "*", ktg_spu_ixs_typ = "*",}
	const enum SeznamSbernyArchSpisuDtoTypes { ixp_spis = "string", ixp = "string", ixp_top = "string", typ_spis = "number", stav_pis = "number", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", typ_entity_order = "number", poznamka = "string", dat_zmena = "JsonDate", dat_zmena_dok = "JsonDate", zmenu_prov = "string", nazev_rf = "string", fun_resitel_txt = "string", por_cislo = "number", vztah_spis = "number", puvod = "number", nazev = "string", s_prij = "number", odeslano_kam = "string", ixs_typ = "string", ixs_typ_txt = "string", dat_pod = "JsonDate", prio_odkud = "string", por_cislo_uziv = "number", priz_cj = "number", priz_cj_txt = "string", akt_znacka = "string", misto_vzniku = "string", zp_vyriz1 = "string", zp_vyriz2 = "string", zp_vyriz = "string", s_fyz = "number", s_ele = "number", s_sgn = "number", priz_spis = "number", typ_ag = "number", s_schval = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zas_vyprav = "number", zas_doruc = "number", zasilek = "string", typ_vyriz = "number", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", skar_znak2 = "string", skar_lhuta2 = "number", dat_dtermin = "JsonDate", dilci_termin = "number", el_bitmap = "number", doctype_bitmap = "number", m_vyber = "number", uzo = "string", aktivita_nad = "number", typ_entity_ico = "number", vlastnictvi_doruceni_ico = "number", pozice_spis_ico = "number", technicke_vlastnosti_ico = "number", stav_zpracovani_ico = "number", stav_epk_txt = "string", typ_pozad_pod_txt = "string", ident_txt = "string", obr_1 = "string", obr_2 = "string", dok_poznamka = "string", st_utaj_id_txt = "string", sp_zn_odes = "string", typFormyDokumentu = "Gordic.Wfl.Interface.TypFormyDokumentu", ixs_fun_akt = "string", ixs_su_akt = "string", zmenu_prov_txt = "string", umisteni_txt = "string", nazev_spu_ixs_typ = "string", skar_znak_ixs_typ = "string", skar_lhuta_ixs_typ = "number", ktg_spu_ixs_typ = "number",}
	const enum SeznamSbernyArchSpisuDtoTypeLengths { ixp_spis = 12, ixp = 12, ixp_top = 12, poznamka = 100, zmenu_prov = 12, nazev_rf = 200, fun_resitel_txt = 200, nazev = 100, odeslano_kam = 100, ixs_typ = 12, ixs_typ_txt = 50, prio_odkud = 50, priz_cj_txt = 1, akt_znacka = 50, misto_vzniku = 100, zp_vyriz1 = 50, zp_vyriz2 = 50, zp_vyriz = 50, zasilek = 50, spis_pl = 5, spis_znak = 50, skar_znak = 10, skar_znak2 = 10, uzo = 1, stav_epk_txt = 50, typ_pozad_pod_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GDashboardCountFiltersDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dto s fitry pro počty na úvodní obrazovce.*/
	interface GDashboardCountFiltersDto {
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_KE_ZPRACOVANI?: string|null;
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_KE_ZPRACOVANI?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_K_UZAVRENI?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_TERMINY?: string|null;
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI?: string|null;
		/**Fragmenty*/
		FRAGMENT_BAREVNE_OZNACENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI?: string|null;
		/**The dokumenty ke zpracovani.*/
		DokumentyKeZpracovani?: Gordic.Ssl.Interface.GDokumentFilterDto|null;
		/**The dokumenty ke zpracovani ve vlastnictvi*/
		DokumentyKeZpracovaniVeVlastnictvi?: Gordic.Ssl.Interface.GDokumentFilterDto|null;
		/**The dokumenty ke zpracovani v redistribuci*/
		DokumentyKeZpracovaniVRedistribuci?: Gordic.Ssl.Interface.GDokumentFilterDto|null;
		/**The spisy ke zpracovani*/
		SpisyKeZpracovani?: Gordic.Ssl.Interface.GSpisFilterDto|null;
		/**The spisy ke zpracovani ve vlastnictvi*/
		SpisyKeZpracovaniVeVlastnictvi?: Gordic.Ssl.Interface.GSpisFilterDto|null;
		/**The spisy ke zpracovani v redistribuci*/
		SpisyKeZpracovaniVRedistribuci?: Gordic.Ssl.Interface.GSpisFilterDto|null;
		/**The spisy k uzavreni*/
		SpisyKUzavreni?: Gordic.Ssl.Interface.GSpisFilterDto|null;
		/**The spisy k uzavreni s vyrizenou zadosti v rak*/
		SpisyKUzavreniSVyrizenouZadostiVRak?: Gordic.Ssl.Interface.GSpisFilterDto|null;
		/**The spisy pred terminem*/
		SpisyPredTerminem?: Gordic.Ssl.Interface.GSpisFilterDto|null;
		/**The spisy po terminu*/
		SpisyPoTerminu?: Gordic.Ssl.Interface.GSpisFilterDto|null;
		/**The dokumenty po terminu*/
		DokumentyPoTerminu?: Gordic.Ssl.Interface.GDokumentFilterDto|null;
		/**The dokumenty a spisy k predani*/
		DokumentyASpisyKPredani?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The dokumenty a spisy k prevzeti*/
		DokumentyASpisyKPrevzeti?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The pocet barevne oznacenych celkem*/
		BarevneOznacene?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The pocet barevne oznacenych cervene*/
		BarevneOznaceneCervena?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The pocet barevne oznacenych zelene*/
		BarevneOznaceneZelena?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The pocet barevne oznacenych modre*/
		BarevneOznaceneModra?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The pocet barevne oznacenych fialove*/
		BarevneOznaceneFialova?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The pocet barevne oznacenych zlute*/
		BarevneOznaceneZluta?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The pocet barevne oznacenych bile*/
		BarevneOznaceneBila?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The dokumenty a spisy ve vlastnictvi*/
		DokumentyASpisyVeVlastnictvi?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
		/**The dokumenty a spisy ke zpracovani*/
		DokumentyASpisyKeZpracovani?: Gordic.Ssl.Interface.GSslspidFilterDto|null;
	}
	const enum GDashboardCountFiltersDtoNames { FRAGMENT_DOKUMENTY_KE_ZPRACOVANI = "FRAGMENT_DOKUMENTY_KE_ZPRACOVANI", FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE = "FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE", FRAGMENT_SPISY_KE_ZPRACOVANI = "FRAGMENT_SPISY_KE_ZPRACOVANI", FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE = "FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE", FRAGMENT_SPISY_K_UZAVRENI = "FRAGMENT_SPISY_K_UZAVRENI", FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE = "FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE", FRAGMENT_TERMINY = "FRAGMENT_TERMINY", FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI = "FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI", FRAGMENT_BAREVNE_OZNACENE = "FRAGMENT_BAREVNE_OZNACENE", FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI = "FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI", DokumentyKeZpracovani = "DokumentyKeZpracovani", DokumentyKeZpracovaniVeVlastnictvi = "DokumentyKeZpracovaniVeVlastnictvi", DokumentyKeZpracovaniVRedistribuci = "DokumentyKeZpracovaniVRedistribuci", SpisyKeZpracovani = "SpisyKeZpracovani", SpisyKeZpracovaniVeVlastnictvi = "SpisyKeZpracovaniVeVlastnictvi", SpisyKeZpracovaniVRedistribuci = "SpisyKeZpracovaniVRedistribuci", SpisyKUzavreni = "SpisyKUzavreni", SpisyKUzavreniSVyrizenouZadostiVRak = "SpisyKUzavreniSVyrizenouZadostiVRak", SpisyPredTerminem = "SpisyPredTerminem", SpisyPoTerminu = "SpisyPoTerminu", DokumentyPoTerminu = "DokumentyPoTerminu", DokumentyASpisyKPredani = "DokumentyASpisyKPredani", DokumentyASpisyKPrevzeti = "DokumentyASpisyKPrevzeti", BarevneOznacene = "BarevneOznacene", BarevneOznaceneCervena = "BarevneOznaceneCervena", BarevneOznaceneZelena = "BarevneOznaceneZelena", BarevneOznaceneModra = "BarevneOznaceneModra", BarevneOznaceneFialova = "BarevneOznaceneFialova", BarevneOznaceneZluta = "BarevneOznaceneZluta", BarevneOznaceneBila = "BarevneOznaceneBila", DokumentyASpisyVeVlastnictvi = "DokumentyASpisyVeVlastnictvi", DokumentyASpisyKeZpracovani = "DokumentyASpisyKeZpracovani",}
	const enum GDashboardCountFiltersDtoFragments { FRAGMENT_DOKUMENTY_KE_ZPRACOVANI = "*", FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE = "*", FRAGMENT_SPISY_KE_ZPRACOVANI = "*", FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE = "*", FRAGMENT_SPISY_K_UZAVRENI = "*", FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE = "*", FRAGMENT_TERMINY = "*", FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI = "*", FRAGMENT_BAREVNE_OZNACENE = "*", FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI = "*", DokumentyKeZpracovani = "DOKUMENTY_KE_ZPRACOVANI", DokumentyKeZpracovaniVeVlastnictvi = "DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE", DokumentyKeZpracovaniVRedistribuci = "DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE", SpisyKeZpracovani = "SPISY_KE_ZPRACOVANI", SpisyKeZpracovaniVeVlastnictvi = "SPISY_KE_ZPRACOVANI_ROZSIRENE", SpisyKeZpracovaniVRedistribuci = "SPISY_KE_ZPRACOVANI_ROZSIRENE", SpisyKUzavreni = "SPISY_K_UZAVRENI", SpisyKUzavreniSVyrizenouZadostiVRak = "SPISY_K_UZAVRENI_ROZSIRENE", SpisyPredTerminem = "TERMINY", SpisyPoTerminu = "TERMINY", DokumentyPoTerminu = "TERMINY", DokumentyASpisyKPredani = "DOKUMENTY_A_SPISY_PREVZETI_PREDANI", DokumentyASpisyKPrevzeti = "DOKUMENTY_A_SPISY_PREVZETI_PREDANI", BarevneOznacene = "BAREVNE_OZNACENE", BarevneOznaceneCervena = "BAREVNE_OZNACENE", BarevneOznaceneZelena = "BAREVNE_OZNACENE", BarevneOznaceneModra = "BAREVNE_OZNACENE", BarevneOznaceneFialova = "BAREVNE_OZNACENE", BarevneOznaceneZluta = "BAREVNE_OZNACENE", BarevneOznaceneBila = "BAREVNE_OZNACENE", DokumentyASpisyVeVlastnictvi = "DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI", DokumentyASpisyKeZpracovani = "DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI",}
	const enum GDashboardCountFiltersDtoTypes { FRAGMENT_DOKUMENTY_KE_ZPRACOVANI = "string", FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE = "string", FRAGMENT_SPISY_KE_ZPRACOVANI = "string", FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE = "string", FRAGMENT_SPISY_K_UZAVRENI = "string", FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE = "string", FRAGMENT_TERMINY = "string", FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI = "string", FRAGMENT_BAREVNE_OZNACENE = "string", FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI = "string", DokumentyKeZpracovani = "Gordic.Ssl.Interface.GDokumentFilterDto", DokumentyKeZpracovaniVeVlastnictvi = "Gordic.Ssl.Interface.GDokumentFilterDto", DokumentyKeZpracovaniVRedistribuci = "Gordic.Ssl.Interface.GDokumentFilterDto", SpisyKeZpracovani = "Gordic.Ssl.Interface.GSpisFilterDto", SpisyKeZpracovaniVeVlastnictvi = "Gordic.Ssl.Interface.GSpisFilterDto", SpisyKeZpracovaniVRedistribuci = "Gordic.Ssl.Interface.GSpisFilterDto", SpisyKUzavreni = "Gordic.Ssl.Interface.GSpisFilterDto", SpisyKUzavreniSVyrizenouZadostiVRak = "Gordic.Ssl.Interface.GSpisFilterDto", SpisyPredTerminem = "Gordic.Ssl.Interface.GSpisFilterDto", SpisyPoTerminu = "Gordic.Ssl.Interface.GSpisFilterDto", DokumentyPoTerminu = "Gordic.Ssl.Interface.GDokumentFilterDto", DokumentyASpisyKPredani = "Gordic.Ssl.Interface.GSslspidFilterDto", DokumentyASpisyKPrevzeti = "Gordic.Ssl.Interface.GSslspidFilterDto", BarevneOznacene = "Gordic.Ssl.Interface.GSslspidFilterDto", BarevneOznaceneCervena = "Gordic.Ssl.Interface.GSslspidFilterDto", BarevneOznaceneZelena = "Gordic.Ssl.Interface.GSslspidFilterDto", BarevneOznaceneModra = "Gordic.Ssl.Interface.GSslspidFilterDto", BarevneOznaceneFialova = "Gordic.Ssl.Interface.GSslspidFilterDto", BarevneOznaceneZluta = "Gordic.Ssl.Interface.GSslspidFilterDto", BarevneOznaceneBila = "Gordic.Ssl.Interface.GSslspidFilterDto", DokumentyASpisyVeVlastnictvi = "Gordic.Ssl.Interface.GSslspidFilterDto", DokumentyASpisyKeZpracovani = "Gordic.Ssl.Interface.GSslspidFilterDto",}
	const enum GDashboardCountFiltersDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GDokumentCreateRequestDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro načtení informací o dokumentu (IGDokument.Create).*/
	interface GDokumentCreateRequestDto {
		/**Fragmenty podle kterých se načtou aktuální data.
		*     Pokud je null (default), pak se data vracet nebudou
		*/
		ReadDataFragements?: string[]|null;
		/**Data dokumentu.*/
		Dokument?: Gordic.Ssl.Interface.GDokumentCreateDto|null;
	}
	const enum GDokumentCreateRequestDtoNames { ReadDataFragements = "ReadDataFragements", Dokument = "Dokument",}
	const enum GDokumentCreateRequestDtoFragments { ReadDataFragements = "*", Dokument = "*",}
	const enum GDokumentCreateRequestDtoTypes { ReadDataFragements = "string[]", Dokument = "Gordic.Ssl.Interface.GDokumentCreateDto",}
	const enum GDokumentCreateRequestDtoTypeLengths {}
	interface GDokumentCreateDto {
		/**The validation group vlastni*/
		VALIDATION_GROUP_VLASTNI?: string|null;
		/**The validation group vlastni*/
		VALIDATION_GROUP_CIZI?: string|null;
		/**Identifikátor dokumentu. Pokud není vyplněn, tak se vygeneruje.*/
		ixp?: string|null;
		/**Gets or sets the akt znacka.*/
		akt_znacka?: string|null;
		/**Gets or sets the nazev.*/
		nazev?: string|null;
		/**Gets or sets the ixs typ.*/
		ixs_typ?: string|null;
		/**Gets or sets the st utaj identifier.*/
		st_utaj_id?: number|null;
		/**Gets or sets the spis pl.*/
		spis_pl?: string|null;
		/**Gets or sets the spis znak.*/
		spis_znak?: string|null;
		/**Gets or sets the obsah text.*/
		obsah_text?: string|null;
		/**Gets or sets the poznamka.*/
		poznamka?: string|null;
		/**Gets or sets the poc listu.*/
		poc_listu?: string|null;
		/**Gets or sets the poc priloh.*/
		poc_priloh?: number|null;
		/**Gets or sets the poc stran.*/
		poc_stran?: number|null;
		/**Gets or sets the poc kop.*/
		poc_kop?: number|null;
		/**Gets or sets the poc l priloh.*/
		poc_l_priloh?: string|null;
		/**Gets or sets the ixs fun resitel.*/
		ixs_fun_resitel?: string|null;
		/**Gets or sets the umisteni.*/
		umisteni?: string|null;
		/**Gets or sets the barcode.*/
		barcode?: string|null;
		/**Gets or sets the dat prij pod.*/
		dat_prij_pod?: JsonDate|null;
		/**Identidikátor pro související.*/
		IxpInitProVazbuSouvisejicich?: string|null;
		/**Profil douření pro cizí dokumenty.
		*     Pokud je null, pak se dokument zakládá jako vlastní.
		*/
		Doruceni?: Gordic.Ssl.Interface.GDokumentDoruceniCreateDto|null;
	}
	const enum GDokumentCreateDtoNames { VALIDATION_GROUP_VLASTNI = "VALIDATION_GROUP_VLASTNI", VALIDATION_GROUP_CIZI = "VALIDATION_GROUP_CIZI", ixp = "ixp", akt_znacka = "akt_znacka", nazev = "nazev", ixs_typ = "ixs_typ", st_utaj_id = "st_utaj_id", spis_pl = "spis_pl", spis_znak = "spis_znak", obsah_text = "obsah_text", poznamka = "poznamka", poc_listu = "poc_listu", poc_priloh = "poc_priloh", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_l_priloh = "poc_l_priloh", ixs_fun_resitel = "ixs_fun_resitel", umisteni = "umisteni", barcode = "barcode", dat_prij_pod = "dat_prij_pod", IxpInitProVazbuSouvisejicich = "IxpInitProVazbuSouvisejicich", Doruceni = "Doruceni",}
	const enum GDokumentCreateDtoFragments { VALIDATION_GROUP_VLASTNI = "*", VALIDATION_GROUP_CIZI = "*", ixp = "*", akt_znacka = "*", nazev = "*", ixs_typ = "*", st_utaj_id = "*", spis_pl = "*", spis_znak = "*", obsah_text = "*", poznamka = "*", poc_listu = "*", poc_priloh = "*", poc_stran = "*", poc_kop = "*", poc_l_priloh = "*", ixs_fun_resitel = "*", umisteni = "*", barcode = "*", dat_prij_pod = "*", IxpInitProVazbuSouvisejicich = "*", Doruceni = "*",}
	const enum GDokumentCreateDtoTypes { VALIDATION_GROUP_VLASTNI = "string", VALIDATION_GROUP_CIZI = "string", ixp = "string", akt_znacka = "string", nazev = "string", ixs_typ = "string", st_utaj_id = "number", spis_pl = "string", spis_znak = "string", obsah_text = "string", poznamka = "string", poc_listu = "string", poc_priloh = "number", poc_stran = "number", poc_kop = "number", poc_l_priloh = "string", ixs_fun_resitel = "string", umisteni = "string", barcode = "string", dat_prij_pod = "JsonDate", IxpInitProVazbuSouvisejicich = "string", Doruceni = "Gordic.Ssl.Interface.GDokumentDoruceniCreateDto",}
	const enum GDokumentCreateDtoTypeLengths { akt_znacka = 50, nazev = 50,}
	interface GDokumentDoruceniCreateDto {
		/**Gets or sets the dat prij pod.*/
		dat_prij_pod?: JsonDate|null;
		/**Gets or sets the por zast.*/
		por_zast?: number|null;
		/**Gets or sets the lic zast.*/
		lic_zast?: string|null;
		/**Gets or sets the zast text.*/
		zast_txt?: string|null;
		/**Gets or sets the stat.*/
		stat?: number|null;
		/**Gets or sets the PSC.*/
		psc?: string|null;
		/**Gets or sets the dat odes.*/
		dat_odes?: JsonDate|null;
		/**Gets or sets the znacka odes.*/
		znacka_odes?: string|null;
		/**Gets or sets the dat ze dne.*/
		dat_ze_dne?: JsonDate|null;
		/**Gets or sets the pod cis.*/
		pod_cis?: string|null;
		/**Gets or sets the zpusob dor.*/
		zpusob_dor?: number|null;
		/**Gets or sets the druh zas.*/
		druh_zas?: number|null;
		/**Gets or sets the druh zas zach.*/
		druh_zas_zach?: number|null;
		/**Gets or sets the ixs esu.*/
		ixs_esu?: string|null;
		/**Gets or sets the poznamka.*/
		poznamka?: string|null;
	}
	const enum GDokumentDoruceniCreateDtoNames { dat_prij_pod = "dat_prij_pod", por_zast = "por_zast", lic_zast = "lic_zast", zast_txt = "zast_txt", stat = "stat", psc = "psc", dat_odes = "dat_odes", znacka_odes = "znacka_odes", dat_ze_dne = "dat_ze_dne", pod_cis = "pod_cis", zpusob_dor = "zpusob_dor", druh_zas = "druh_zas", druh_zas_zach = "druh_zas_zach", ixs_esu = "ixs_esu", poznamka = "poznamka",}
	const enum GDokumentDoruceniCreateDtoFragments { dat_prij_pod = "*", por_zast = "*", lic_zast = "*", zast_txt = "*", stat = "*", psc = "*", dat_odes = "*", znacka_odes = "*", dat_ze_dne = "*", pod_cis = "*", zpusob_dor = "*", druh_zas = "*", druh_zas_zach = "*", ixs_esu = "*", poznamka = "*",}
	const enum GDokumentDoruceniCreateDtoTypes { dat_prij_pod = "JsonDate", por_zast = "number", lic_zast = "string", zast_txt = "string", stat = "number", psc = "string", dat_odes = "JsonDate", znacka_odes = "string", dat_ze_dne = "JsonDate", pod_cis = "string", zpusob_dor = "number", druh_zas = "number", druh_zas_zach = "number", ixs_esu = "string", poznamka = "string",}
	const enum GDokumentDoruceniCreateDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GDokumentDeleteRequestDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro vymazání dokumentu (IGDokument.Delete).*/
	interface GDokumentDeleteRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Důvod smazání dokumentu.*/
		Duvod?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
	}
	const enum GDokumentDeleteRequestDtoNames { Ixp = "Ixp", Duvod = "Duvod", DatZmena = "DatZmena",}
	const enum GDokumentDeleteRequestDtoFragments { Ixp = "*", Duvod = "*", DatZmena = "*",}
	const enum GDokumentDeleteRequestDtoTypes { Ixp = "string", Duvod = "string", DatZmena = "JsonDate",}
	const enum GDokumentDeleteRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GDokumentDeleteResponseDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Návratové parametry metody pro vymazání dokumentu (IGDokument.Delete).*/
	interface GDokumentDeleteResponseDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
	}
	const enum GDokumentDeleteResponseDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GDokumentDeleteResponseDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GDokumentDeleteResponseDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GDokumentDeleteResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GDokumentDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dokument Ssl (dto) - sslspid.*/
	interface GDokumentDto extends Gordic.Ssl.Interface.GSslspidDto {
	}
	const enum GDokumentDtoNames { Spis = "Spis", SpisovyUzelPod = "SpisovyUzelPod", SpisPrirazeny = "SpisPrirazeny", IdentifikatorOriginalu = "IdentifikatorOriginalu", IxpPoslednihoSpisu = "IxpPoslednihoSpisu", VMinulostiVeSpisu = "VMinulostiVeSpisu", ObrazekNaDetailu = "ObrazekNaDetailu", Kopie = "Kopie", obsah_text = "obsah_text", obsah_text_2 = "obsah_text_2", obsah_text_3 = "obsah_text_3", obsah_text_4 = "obsah_text_4", poznamka = "poznamka", poc_kopii = "poc_kopii", dat_prij_pod = "dat_prij_pod", ixs_su_pod = "ixs_su_pod", dat_evid = "dat_evid", cj_spis = "cj_spis", odeslano_kam = "odeslano_kam", s_resitel = "s_resitel", ixs_fun_resitel = "ixs_fun_resitel", s_vyriz = "s_vyriz", typ_vyriz = "typ_vyriz", vyriz_komu = "vyriz_komu", vyriz_pozn = "vyriz_pozn", ixs_zmp_vyriz = "ixs_zmp_vyriz", ixs_fun_schval = "ixs_fun_schval", ixs_zmp_schval = "ixs_zmp_schval", s_uzav = "s_uzav", dat_uzav = "dat_uzav", ixs_zmp_uzav = "ixs_zmp_uzav", s_stor = "s_stor", s_ztrat = "s_ztrat", stav_pis_ext = "stav_pis_ext", vztah_spis = "vztah_spis", pr_moc = "pr_moc", dat_pr_moc = "dat_pr_moc", s_agp = "s_agp", s_zastav = "s_zastav", dat_vykonav = "dat_vykonav", ObsahTextProSeznam = "ObsahTextProSeznam", SSchvalSsl = "SSchvalSsl", Balik = "Balik", PorCisloVSpisu = "PorCisloVSpisu", Resitel = "Resitel", ZmenuProvedlVyriz = "ZmenuProvedlVyriz", Schvalovatel = "Schvalovatel", Schvalil = "Schvalil", Uzavrel = "Uzavrel", Permissions = "Permissions", typ_ag_txt = "typ_ag_txt", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", st_utaj_id_orig = "st_utaj_id_orig", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", ixp_spis_prir = "ixp_spis_prir", ixs_skr = "ixs_skr", ixs_obd = "ixs_obd", por_cislo_obd = "por_cislo_obd", dat_prenosu = "dat_prenosu", dat_znepristupneni = "dat_znepristupneni", rok_kon_spu = "rok_kon_spu", StavSul = "StavSul", PrizSkn = "PrizSkn", PrizVyp = "PrizVyp", IdExtArch = "IdExtArch", PrizVBaliku = "PrizVBaliku", ixs_zup = "ixs_zup", ZupStavSul = "ZupStavSul", PrilohaHlavni = "PrilohaHlavni", Prilohy = "Prilohy", PrilohyElektronicke = "PrilohyElektronicke", EpkDokument = "EpkDokument", SkartacniZnak = "SkartacniZnak", VecnaSkupina = "VecnaSkupina", UzivatelskaPoznamka = "UzivatelskaPoznamka", Rak = "Rak", PopisSpoUda = "PopisSpoUda", DuvodPozSkar = "DuvodPozSkar", PrizPozSkar = "PrizPozSkar", RokDoPozSkar = "RokDoPozSkar", StavPisSpis = "StavPisSpis", dat_mpd0 = "dat_mpd0", ixs_lpc = "ixs_lpc", uziv_sl_a = "uziv_sl_a", uziv_sl_a2 = "uziv_sl_a2", uziv_sl_a3 = "uziv_sl_a3", uziv_sl_b = "uziv_sl_b", uziv_sl_b2 = "uziv_sl_b2", uziv_sl_b3 = "uziv_sl_b3", uziv_sl_c = "uziv_sl_c", uziv_sl_c2 = "uziv_sl_c2", uziv_sl_d = "uziv_sl_d", uziv_sl_d2 = "uziv_sl_d2", uziv_sl_j = "uziv_sl_j", uziv_sl_j2 = "uziv_sl_j2", uziv_sl_k = "uziv_sl_k", uziv_sl_k2 = "uziv_sl_k2", uziv_sl_n = "uziv_sl_n", HistorieZmen = "HistorieZmen", AktualniRedistribuce = "AktualniRedistribuce", HistorieRedistribuce = "HistorieRedistribuce", HistoriePoznamek = "HistoriePoznamek", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", termin_ico = "termin_ico", dat_dtermin = "dat_dtermin", doplnujici_informace_ico = "doplnujici_informace_ico", priz_kop = "priz_kop", priz_kopie = "priz_kopie", stav_epk0 = "stav_epk0", stav_epk_txt = "stav_epk_txt", typ_pozad_pod_txt = "typ_pozad_pod_txt", epk_po_pozad_vyr = "epk_po_pozad_vyr", dat_vyriz_do = "dat_vyriz_do", dat_vyriz_do_wflsdcj = "dat_vyriz_do_wflsdcj", dat_vyriz_do_sslsdcj = "dat_vyriz_do_sslsdcj", TerminVyrizeni = "TerminVyrizeni", ZpVyrizTxtDleIxsCj = "ZpVyrizTxtDleIxsCj", Vlastnictvi = "Vlastnictvi", vlastnik = "vlastnik", CoJsemZac = "CoJsemZac", VlastnikFunkce = "VlastnikFunkce", VlastnikSpisovyUzel = "VlastnikSpisovyUzel", Sslstyp = "Sslstyp", ZmenuProvedl = "ZmenuProvedl", SpisovyPlan = "SpisovyPlan", SpisovyZnak = "SpisovyZnak", VlastnikAgendovyFunkce = "VlastnikAgendovyFunkce", VlastnikAgendovySpisovyUzel = "VlastnikAgendovySpisovyUzel", CisloJednaci = "CisloJednaci", UmisteniData = "UmisteniData", Nazev__sslstyp = "Nazev__sslstyp", Predano__uzlu = "Predano__uzlu", Predano__osobe = "Predano__osobe", Predano__od__osoby = "Predano__od__osoby", TypSpousteciUdalosti = "TypSpousteciUdalosti", PrizKonfliktSka = "PrizKonfliktSka", StavVytezezniElektronickehoObrazu = "StavVytezezniElektronickehoObrazu", IxpTss = "IxpTss", DotceneSubjekty = "DotceneSubjekty", KlicovaSlova = "KlicovaSlova", Formulare = "Formulare", Doruceni = "Doruceni", Redistribuce = "Redistribuce", Souvisejici = "Souvisejici", s_orig = "s_orig", priz_dupli = "priz_dupli", TypAgendy = "TypAgendy", Vlastnosti = "Vlastnosti", PoznamkaPosledni = "PoznamkaPosledni", ico_status = "ico_status", UlozenoListu = "UlozenoListu", UrovenPristupu = "UrovenPristupu", priz_zob_zast = "priz_zob_zast", ext_akt_znacka = "ext_akt_znacka", CislaJednaciHistoricka = "CislaJednaciHistoricka", Wflszne = "Wflszne", ixp = "ixp", lic = "lic", rok = "rok", status_pis = "status_pis", typ_duv_del = "typ_duv_del", dat_del = "dat_del",}
	const enum GDokumentDtoFragments { Spis = "SPIS", SpisovyUzelPod = "SPISOVY_UZEL_PODAL", SpisPrirazeny = "SPIS_PRIRAZENY", IdentifikatorOriginalu = "IDENTIFIKATOR_ORIGINALU", IxpPoslednihoSpisu = "IXP_POSLEDNIHO_SPISU", VMinulostiVeSpisu = "V_MINULOSTI_VE_SPISU", ObrazekNaDetailu = "OBRAZEK_NA_DETAILU", Kopie = "KOPIE", obsah_text = "SSLSPID", obsah_text_2 = "SSLSPID", obsah_text_3 = "SSLSPID", obsah_text_4 = "SSLSPID", poznamka = "SSLSPID", poc_kopii = "SSLSPID", dat_prij_pod = "SSLSPID", ixs_su_pod = "SSLSPID", dat_evid = "SSLSPID", cj_spis = "SSLSPID", odeslano_kam = "SSLSPID", s_resitel = "SSLSPID", ixs_fun_resitel = "SSLSPID", s_vyriz = "SSLSPID", typ_vyriz = "SSLSPID", vyriz_komu = "SSLSPID", vyriz_pozn = "SSLSPID", ixs_zmp_vyriz = "SSLSPID", ixs_fun_schval = "SSLSPID", ixs_zmp_schval = "SSLSPID", s_uzav = "SSLSPID", dat_uzav = "SSLSPID", ixs_zmp_uzav = "SSLSPID", s_stor = "SSLSPID", s_ztrat = "SSLSPID", stav_pis_ext = "SSLSPID", vztah_spis = "SSLSPID", pr_moc = "SSLSPID", dat_pr_moc = "SSLSPID", s_agp = "SSLSPID", s_zastav = "SSLSPID", dat_vykonav = "SSLSPID", ObsahTextProSeznam = "SSLSPID", SSchvalSsl = "SSLSPID", Balik = "BALIK", PorCisloVSpisu = "SPIS_PORADI", Resitel = "RESITEL", ZmenuProvedlVyriz = "ZMENU_PROVEDL_VYRIZ", Schvalovatel = "SCHVALOVATEL", Schvalil = "ZMENU_PROVEDL_SCHVALIL", Uzavrel = "ZMENU_PROVEDL_UZAVREL", Permissions = "PERMISSIONS", typ_ag_txt = "WFLSIXP", ixp_spis = "WFLSPID", priz_spis = "WFLSPID", ixs_fun_akt = "WFLSPID", ixs_su_akt = "WFLSPID", nazev = "WFLSPID", akt_znacka = "WFLSPID", stav_dist = "WFLSPID", stav_pis = "WFLSPID", typ_ag = "WFLSPID", ktg_typ = "WFLSPID", ixs_typ = "WFLSPID", s_prij = "WFLSPID", s_ssl = "WFLSPID", dat_zmena = "WFLSPID", zmenu_prov = "WFLSPID", s_ele = "WFLSPID", s_fyz = "WFLSPID", misto_vzniku = "WFLSPID", s_sgn = "WFLSPID", dat_pod = "WFLSPID", cs_akt_znacka = "WFLSPID", priz_view_ssl = "WFLSPID", uzo = "WFLSPID", spis_pl = "WFLSPID", spis_znak = "WFLSPID", ixs_fun_wfl = "WFLSPID", s_uloz = "WFLSPID", dat_uloz = "WFLSPID", ixs_su_wfl = "WFLSPID", s_odes = "WFLSPID", priz_cj = "WFLSPID", dat_vyriz = "WFLSPID", ixs_cj = "WFLSPID", puvod = "WFLSPID", s_schval = "WFLSPID", umisteni = "WFLSPID", st_utaj_id = "WFLSPID", st_utaj_id_orig = "WFLSPID", skar_znak = "WFLSPID", skar_lhuta = "WFLSPID", rok_spo_uda = "WFLSPID", ixs_vsk = "WFLSPID", ixp_top = "WFLSPID", ixp_soucast = "WFLSPID", typ_spis = "WFLSPID", barcode = "WFLSPID", skar_lhuta_spra = "WFLSPID", ixs_ext = "WFLSPID", rok_skartace = "WFLSPID", ixs_spu = "WFLSPID", poc_listu = "WFLSPID", poc_stran = "WFLSPID", poc_kop = "WFLSPID", poc_priloh = "WFLSPID", poc_l_priloh = "WFLSPID", cj = "WFLSPID", ico = "WFLSPID", ixp_spis_prir = "WFLSPID", ixs_skr = "ZNEPRISTUPNENI", ixs_obd = "ZNEPRISTUPNENI", por_cislo_obd = "ZNEPRISTUPNENI", dat_prenosu = "ZNEPRISTUPNENI", dat_znepristupneni = "ZNEPRISTUPNENI", rok_kon_spu = "ZNEPRISTUPNENI", StavSul = "SPISOVNA", PrizSkn = "SPISOVNA", PrizVyp = "SPISOVNA", IdExtArch = "SPISOVNA", PrizVBaliku = "SPISOVNA_V_BALIKU", ixs_zup = "SPISOVNA", ZupStavSul = "SPISOVNA", PrilohaHlavni = "PRILOHA_HLAVNI", Prilohy = "PRILOHY", PrilohyElektronicke = "PRILOHY_ELEKTRONICKE", EpkDokument = "EPK", SkartacniZnak = "SKARTACNI_ZNAK", VecnaSkupina = "VECNA_SKUPINA", UzivatelskaPoznamka = "UZIVATELSKA_POZNAMKA", Rak = "RAK", PopisSpoUda = "SPOUSTECI_UDALOST", DuvodPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", PrizPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", RokDoPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", StavPisSpis = "SPIS_STAV", dat_mpd0 = "SERVISNI", ixs_lpc = "SERVISNI", uziv_sl_a = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_a2 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_a3 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b2 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b3 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_c = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_c2 = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_d = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_d2 = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_j = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_j2 = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_k = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_k2 = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_n = "UZIVATELSKE_SLOUPCE_DETAIL", HistorieZmen = "HISTORIE_ZMEN", AktualniRedistribuce = "AKTUALNI_REDISTRIBUCE", HistorieRedistribuce = "HISTORIE_REDISTRIBUCE", HistoriePoznamek = "HISTORIE_POZNAMEK", typ_entity_ico = "TYP_ENTITY_ICON", vlastnictvi_doruceni_ico = "NOT-USED", technicke_vlastnosti_ico = "TECHNICKE_VLASTNOSTI_ICON", pozice_spis_ico = "POZICE_SPIS_ICON", stav_zpracovani_ico = "STAV_ZPRACOVANI_ICON", vlastnictvi_redistribuce_ico = "NOT-USED", termin_ico = "TERMIN_ICON", dat_dtermin = "DILCI_TERMIN", doplnujici_informace_ico = "DOPLNUJICI_INFORMACE_ICON", priz_kop = "PRIZNAK_KOPIE", priz_kopie = "PRIZNAK_KOPIE", stav_epk0 = "EPK_TXT", stav_epk_txt = "EPK_TXT", typ_pozad_pod_txt = "EPK_TXT", epk_po_pozad_vyr = "EPK_AVIZACE", dat_vyriz_do = "DATUM_VYRIZENI", dat_vyriz_do_wflsdcj = "DATUM_VYRIZENI", dat_vyriz_do_sslsdcj = "DATUM_VYRIZENI", TerminVyrizeni = "DATUM_VYRIZENI", ZpVyrizTxtDleIxsCj = "ZPUSOB_VYRIZENI", Vlastnictvi = "VLASTNICTVI", vlastnik = "VLASTNICTVI", CoJsemZac = "CO_JSEM_ZAC", VlastnikFunkce = "VLASTNIK_FUNKCE", VlastnikSpisovyUzel = "VLASTNIK_SPISOVY_UZEL", Sslstyp = "TYP_PISEMNOSTI", ZmenuProvedl = "ZMENU_PROVEDL", SpisovyPlan = "SPISOVY_PLAN", SpisovyZnak = "SPISOVY_ZNAK", VlastnikAgendovyFunkce = "VLASTNIK_AGENDOVY_FUNKCE", VlastnikAgendovySpisovyUzel = "VLASTNIK_AGENDOVY_SPISOVY_UZEL", CisloJednaci = "CISLO_JEDNACI", UmisteniData = "UMISTENI", Nazev__sslstyp = "WFLSPID", Predano__uzlu = "WFLSPID", Predano__osobe = "WFLSPID", Predano__od__osoby = "WFLSPID", TypSpousteciUdalosti = "TYP_SPOUSTECI_UDALOSTI", PrizKonfliktSka = "PRIZ_KONFLIKT_SKA", StavVytezezniElektronickehoObrazu = "STAV_VYTEZENI_ELEKTRONICKEHO_OBRAZU", IxpTss = "IXP_TSS", DotceneSubjekty = "DOTCENE_SUBJEKTY", KlicovaSlova = "KLICOVA_SLOVA", Formulare = "FORMULARE", Doruceni = "DORUCENI", Redistribuce = "REDISTRIBUCE", Souvisejici = "SOUVISEJICI", s_orig = "NOT-USED", priz_dupli = "PRIZ_DUPLI", TypAgendy = "TYP_AGENDY", Vlastnosti = "VLASTNOSTI", PoznamkaPosledni = "POZNAMKA_POSLEDNI", ico_status = "ICO_STATUS", UlozenoListu = "ULOZENO_LISTU", UrovenPristupu = "UROVEN_PRISTUPU", priz_zob_zast = "WFLSPID", ext_akt_znacka = "WFLSPID", CislaJednaciHistoricka = "CISLO_JEDNACI_HISTORICKA", Wflszne = "WFLSZNE", ixp = "*", lic = "WFLSIXP", rok = "WFLSIXP", status_pis = "WFLSIXP", typ_duv_del = "WFLSIXP", dat_del = "WFLSIXP",}
	const enum GDokumentDtoTypes { Spis = "Gordic.Ssl.Interface.GSpisDto", SpisovyUzelPod = "Gordic.Gin.Interface.GGinspodDto", SpisPrirazeny = "Gordic.Ssl.Interface.GSpisDto", IdentifikatorOriginalu = "string", IxpPoslednihoSpisu = "string", VMinulostiVeSpisu = "boolean", ObrazekNaDetailu = "Gordic.Ssl.Interface.DokumentObrazekNaDetailu", Kopie = "Gordic.Ssl.Interface.SeznamKopiiDokumentuDto[]", obsah_text = "string", obsah_text_2 = "string", obsah_text_3 = "string", obsah_text_4 = "string", poznamka = "string", poc_kopii = "number", dat_prij_pod = "JsonDate", ixs_su_pod = "string", dat_evid = "JsonDate", cj_spis = "string", odeslano_kam = "string", s_resitel = "number", ixs_fun_resitel = "string", s_vyriz = "number", typ_vyriz = "Gordic.Ginis.DbModel.GSslctvyEnum", vyriz_komu = "string", vyriz_pozn = "string", ixs_zmp_vyriz = "string", ixs_fun_schval = "string", ixs_zmp_schval = "string", s_uzav = "number", dat_uzav = "JsonDate", ixs_zmp_uzav = "string", s_stor = "number", s_ztrat = "number", stav_pis_ext = "number", vztah_spis = "Gordic.Ginis.DbModel.GSslcvspEnum", pr_moc = "number", dat_pr_moc = "JsonDate", s_agp = "number", s_zastav = "number", dat_vykonav = "JsonDate", ObsahTextProSeznam = "string", SSchvalSsl = "number", Balik = "Gordic.Spi.Interface.GBalikDto", PorCisloVSpisu = "number", Resitel = "Gordic.Gin.Interface.GFunkcniMistoDto", ZmenuProvedlVyriz = "Gordic.Gin.Interface.GGinszmpDto", Schvalovatel = "Gordic.Gin.Interface.GFunkcniMistoDto", Schvalil = "Gordic.Gin.Interface.GGinszmpDto", Uzavrel = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Ssl.Interface.GSslspidPermissionsDto", typ_ag_txt = "string", ixp_spis = "string", priz_spis = "Gordic.Ginis.DbModel.GWflcpriEnum", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "Gordic.Ginis.DbModel.GWflcstaEnum", stav_pis = "Gordic.Ginis.DbModel.GWflcstpEnum", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "Gordic.Ginis.DbModel.GWflcsprEnum", s_ssl = "Gordic.Ginis.DbModel.GWflcsslEnum", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "Gordic.Ginis.DbModel.GWflceleEnum", s_fyz = "Gordic.Ginis.DbModel.GWflcfyzEnum", misto_vzniku = "string", s_sgn = "Gordic.Ginis.DbModel.GWflcsgnEnum", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", priz_cj = "Gordic.Ginis.DbModel.GWflcpcjEnum", dat_vyriz = "JsonDate", ixs_cj = "string", puvod = "Gordic.Ginis.DbModel.GWflcpuvEnum", s_schval = "number", umisteni = "string", st_utaj_id = "number", st_utaj_id_orig = "Gordic.Ginis.DbModel.GGincstuEnum", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", typ_spis = "Gordic.Ginis.DbModel.GWflctysEnum", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string", ixp_spis_prir = "string", ixs_skr = "string", ixs_obd = "string", por_cislo_obd = "number", dat_prenosu = "JsonDate", dat_znepristupneni = "JsonDate", rok_kon_spu = "number", StavSul = "number", PrizSkn = "number", PrizVyp = "number", IdExtArch = "string", PrizVBaliku = "number", ixs_zup = "string", ZupStavSul = "number", PrilohaHlavni = "Gordic.Wfl.Interface.GEmptyDto", Prilohy = "Gordic.Wfl.Interface.GPrilohaDto[]", PrilohyElektronicke = "Gordic.Wfl.Interface.GPrilohaElektronickaDto[]", EpkDokument = "Gordic.Wfl.Interface.GDokumentWflEpkPriznakyDto", SkartacniZnak = "Gordic.Wfl.Interface.GSkartacniZnakDto", VecnaSkupina = "Gordic.Gin.Interface.GVecnaSkupinaDto", UzivatelskaPoznamka = "Gordic.Wfl.Interface.GUzivatelskaPoznamkaDto", Rak = "JsonDecimal", PopisSpoUda = "string", DuvodPozSkar = "string", PrizPozSkar = "number", RokDoPozSkar = "number", StavPisSpis = "number", dat_mpd0 = "JsonDate", ixs_lpc = "string", uziv_sl_a = "string", uziv_sl_a2 = "string", uziv_sl_a3 = "string", uziv_sl_b = "string", uziv_sl_b2 = "string", uziv_sl_b3 = "string", uziv_sl_c = "string", uziv_sl_c2 = "string", uziv_sl_d = "string", uziv_sl_d2 = "string", uziv_sl_j = "string", uziv_sl_j2 = "string", uziv_sl_k = "string", uziv_sl_k2 = "string", uziv_sl_n = "string", HistorieZmen = "Gordic.Wfl.Interface.GWflhpisDto[]", AktualniRedistribuce = "Gordic.Wfl.Interface.GWflstopDto[]", HistorieRedistribuce = "Gordic.Wfl.Interface.GWflhupiDto", HistoriePoznamek = "Gordic.Wfl.Interface.GWfldpozIslDto[]", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", dat_dtermin = "JsonDate", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", priz_kop = "number", priz_kopie = "string", stav_epk0 = "number", stav_epk_txt = "string", typ_pozad_pod_txt = "string", epk_po_pozad_vyr = "string", dat_vyriz_do = "JsonDate", dat_vyriz_do_wflsdcj = "JsonDate", dat_vyriz_do_sslsdcj = "JsonDate", TerminVyrizeni = "JsonDate", ZpVyrizTxtDleIxsCj = "string", Vlastnictvi = "string", vlastnik = "string", CoJsemZac = "Gordic.Wfl.Interface.GIdentifikatorCoJsemZac", VlastnikFunkce = "Gordic.Gin.Interface.GFunkcniMistoDto", VlastnikSpisovyUzel = "Gordic.Gin.Interface.GGinspodDto", Sslstyp = "Gordic.Gin.Interface.GTypDokumentuDto", ZmenuProvedl = "Gordic.Gin.Interface.GGinszmpDto", SpisovyPlan = "Gordic.Wfl.Interface.GSpisovyPlanDto", SpisovyZnak = "Gordic.Wfl.Interface.GSpisovyZnakDto", VlastnikAgendovyFunkce = "Gordic.Gin.Interface.GFunkcniMistoDto", VlastnikAgendovySpisovyUzel = "Gordic.Gin.Interface.GGinspodDto", CisloJednaci = "Gordic.Wfl.Interface.GCisloJednaciDto", UmisteniData = "Gordic.Wfl.Interface.GUmisteniDto", Nazev__sslstyp = "string", Predano__uzlu = "string", Predano__osobe = "string", Predano__od__osoby = "string", TypSpousteciUdalosti = "Gordic.Gin.Interface.GTypSpousteciUdalostiDto", PrizKonfliktSka = "number", StavVytezezniElektronickehoObrazu = "Gordic.Ginis.DbModel.GGincsvyEnum", IxpTss = "string", DotceneSubjekty = "Gordic.Wfl.Interface.GDotcenySubjektDto[]", KlicovaSlova = "Gordic.Wfl.Interface.GKeyWordDto[]", Formulare = "Gordic.Gin.Interface.GFormularDto[]", Doruceni = "Gordic.Wfl.Interface.GProfilDoruceniDto", Redistribuce = "Gordic.Wfl.Interface.GWflstopDto", Souvisejici = "Gordic.Wfl.Interface.GSeznamSouvisejicichDokumentuDto[]", s_orig = "number", priz_dupli = "number", TypAgendy = "Gordic.Gin.Interface.GTypAgendyDto", Vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", PoznamkaPosledni = "string", ico_status = "number", UlozenoListu = "Gordic.Wfl.Interface.GWfldulpDto", UrovenPristupu = "Gordic.Gin.Interface.GUrovenPristupuDto", priz_zob_zast = "number", ext_akt_znacka = "string", CislaJednaciHistoricka = "string[]", Wflszne = "Gordic.Wfl.Interface.GWflszneDto", ixp = "string", lic = "string", rok = "number", status_pis = "Gordic.Ginis.DbModel.GWflcumpEnum", typ_duv_del = "Gordic.Ginis.DbModel.GWflctddEnum", dat_del = "JsonDate",}
	const enum GDokumentDtoTypeLengths { obsah_text = 254, obsah_text_2 = 254, obsah_text_3 = 254, obsah_text_4 = 254, poznamka = 254, cj_spis = 50, odeslano_kam = 100, vyriz_komu = 100, vyriz_pozn = 254, nazev = 100, akt_znacka = 50, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, umisteni = 20, skar_znak = 2, ixs_vsk = 12, barcode = 50, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, PopisSpoUda = 254, DuvodPozSkar = 254, uziv_sl_a = 254, uziv_sl_a2 = 254, uziv_sl_a3 = 254, uziv_sl_b = 254, uziv_sl_b2 = 254, uziv_sl_b3 = 254, uziv_sl_c = 254, uziv_sl_c2 = 254, uziv_sl_d = 254, uziv_sl_d2 = 254, uziv_sl_j = 254, uziv_sl_j2 = 254, uziv_sl_k = 254, uziv_sl_k2 = 254, uziv_sl_n = 254, vlastnik = 200, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GDokumentFilterDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dokument Filter Dto.*/
	interface GDokumentFilterDto extends Gordic.Ssl.Interface.GSslspidFilterDto {
	}
	const enum GDokumentFilterDtoNames { FILTER_GROUP_SSLSPID = "FILTER_GROUP_SSLSPID", obsah_text = "obsah_text", poznamka = "poznamka", poc_kopii = "poc_kopii", dat_prij_pod = "dat_prij_pod", ixs_su_pod = "ixs_su_pod", dat_evid = "dat_evid", cj_spis = "cj_spis", odeslano_kam = "odeslano_kam", s_resitel = "s_resitel", ixs_fun_resitel = "ixs_fun_resitel", s_vyriz = "s_vyriz", typ_vyriz = "typ_vyriz", vyriz_komu = "vyriz_komu", vyriz_pozn = "vyriz_pozn", ixs_zmp_vyriz = "ixs_zmp_vyriz", ixs_fun_schval = "ixs_fun_schval", ixs_zmp_schval = "ixs_zmp_schval", s_uzav = "s_uzav", dat_uzav = "dat_uzav", ixs_zmp_uzav = "ixs_zmp_uzav", s_stor = "s_stor", s_ztrat = "s_ztrat", vztah_spis = "vztah_spis", pr_moc = "pr_moc", dat_pr_moc = "dat_pr_moc", s_agp = "s_agp", s_zastav = "s_zastav", obsah_text_slozeny = "obsah_text_slozeny", SubjektIxs = "SubjektIxs", SubjektTypeIxs = "SubjektTypeIxs", SubjectStructOrg = "SubjectStructOrg", FILTER_GROUP_WFLSPID = "FILTER_GROUP_WFLSPID", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", st_utaj_id_orig = "st_utaj_id_orig", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", ixs_zup = "ixs_zup", dat_mpd0 = "dat_mpd0", ixs_lpc = "ixs_lpc", uziv_sl_a = "uziv_sl_a", uziv_sl_a2 = "uziv_sl_a2", uziv_sl_a3 = "uziv_sl_a3", uziv_sl_b = "uziv_sl_b", uziv_sl_b2 = "uziv_sl_b2", uziv_sl_b3 = "uziv_sl_b3", uziv_sl_c = "uziv_sl_c", uziv_sl_c2 = "uziv_sl_c2", uziv_sl_d = "uziv_sl_d", uziv_sl_d2 = "uziv_sl_d2", uziv_sl_j = "uziv_sl_j", uziv_sl_j2 = "uziv_sl_j2", uziv_sl_k = "uziv_sl_k", uziv_sl_k2 = "uziv_sl_k2", uziv_sl_n = "uziv_sl_n", dat_dtermin = "dat_dtermin", priz_kop = "priz_kop", priz_kopie = "priz_kopie", stav_epk_txt = "stav_epk_txt", typ_pozad_pod_txt = "typ_pozad_pod_txt", dat_vyriz_do = "dat_vyriz_do", zp_vyriz_txt = "zp_vyriz_txt", s_orig = "s_orig", fulltext = "fulltext", VyrizenaZadostVRak = "VyrizenaZadostVRak", DilciTermin = "DilciTermin", ixs_fun_akt_wflstop = "ixs_fun_akt_wflstop", ixs_su_akt_wflstop = "ixs_su_akt_wflstop", ixs_fun_cil_wflstop = "ixs_fun_cil_wflstop", ixs_su_do_wflstop = "ixs_su_do_wflstop", ixs_su_cil_wflhtop = "ixs_su_cil_wflhtop", dat_cil_wflhtop = "dat_cil_wflhtop", ixb_wflsepx = "ixb_wflsepx", SOhledemNaAgendu = "SOhledemNaAgendu", DatumovyIntervalValue = "DatumovyIntervalValue", DatumovyIntervalFactor = "DatumovyIntervalFactor", Vlastni = "Vlastni", IxsFunPredavajici = "IxsFunPredavajici", IxsSuPredavajici = "IxsSuPredavajici", IxsOrjPredavajici = "IxsOrjPredavajici", IxsFunPrebirajici = "IxsFunPrebirajici", IxsSuPrebirajici = "IxsSuPrebirajici", IxsOrjPrebirajici = "IxsOrjPrebirajici", RedistribucePredavajiciVlastnictvi = "RedistribucePredavajiciVlastnictvi", RedistribucePrebirajiciVlastnictvi = "RedistribucePrebirajiciVlastnictvi", IDokumentyNaCeste = "IDokumentyNaCeste", dat_vyriz_do_wflsdcj = "dat_vyriz_do_wflsdcj", stav_cj_wflsdcj = "stav_cj_wflsdcj", sslden_wflsdcj = "sslden_wflsdcj", rok_wflsdcj = "rok_wflsdcj", por_cislo_wflsdcj = "por_cislo_wflsdcj", DokumentAktualnihoUzlu = "DokumentAktualnihoUzlu", IxsFunVsechnyFunkcePrebirajiciho = "IxsFunVsechnyFunkcePrebirajiciho", ProEkoAgendy = "ProEkoAgendy", KategorieTypuDokumentuDleTypuAgendy = "KategorieTypuDokumentuDleTypuAgendy", ico_status = "ico_status", ixs_car_wflspri = "ixs_car_wflspri", FILTER_GROUP_WFLSIXP = "FILTER_GROUP_WFLSIXP", ixp = "ixp", lic = "lic", rok = "rok", status_pis = "status_pis", typ_duv_del = "typ_duv_del",}
	const enum GDokumentFilterDtoFragments { FILTER_GROUP_SSLSPID = "*", obsah_text = "SSLSPID", poznamka = "SSLSPID", poc_kopii = "SSLSPID", dat_prij_pod = "SSLSPID", ixs_su_pod = "SSLSPID", dat_evid = "SSLSPID", cj_spis = "SSLSPID", odeslano_kam = "SSLSPID", s_resitel = "SSLSPID", ixs_fun_resitel = "SSLSPID", s_vyriz = "SSLSPID", typ_vyriz = "SSLSPID", vyriz_komu = "SSLSPID", vyriz_pozn = "SSLSPID", ixs_zmp_vyriz = "SSLSPID", ixs_fun_schval = "SSLSPID", ixs_zmp_schval = "SSLSPID", s_uzav = "SSLSPID", dat_uzav = "SSLSPID", ixs_zmp_uzav = "SSLSPID", s_stor = "SSLSPID", s_ztrat = "SSLSPID", vztah_spis = "SSLSPID", pr_moc = "SSLSPID", dat_pr_moc = "SSLSPID", s_agp = "SSLSPID", s_zastav = "SSLSPID", obsah_text_slozeny = "SSLSPID", SubjektIxs = "*", SubjektTypeIxs = "*", SubjectStructOrg = "*", FILTER_GROUP_WFLSPID = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", st_utaj_id_orig = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*", ixs_zup = "*", dat_mpd0 = "*", ixs_lpc = "*", uziv_sl_a = "*", uziv_sl_a2 = "*", uziv_sl_a3 = "*", uziv_sl_b = "*", uziv_sl_b2 = "*", uziv_sl_b3 = "*", uziv_sl_c = "*", uziv_sl_c2 = "*", uziv_sl_d = "*", uziv_sl_d2 = "*", uziv_sl_j = "*", uziv_sl_j2 = "*", uziv_sl_k = "*", uziv_sl_k2 = "*", uziv_sl_n = "*", dat_dtermin = "*", priz_kop = "*", priz_kopie = "*", stav_epk_txt = "*", typ_pozad_pod_txt = "*", dat_vyriz_do = "*", zp_vyriz_txt = "*", s_orig = "*", fulltext = "*", VyrizenaZadostVRak = "*", DilciTermin = "*", ixs_fun_akt_wflstop = "*", ixs_su_akt_wflstop = "*", ixs_fun_cil_wflstop = "*", ixs_su_do_wflstop = "*", ixs_su_cil_wflhtop = "*", dat_cil_wflhtop = "*", ixb_wflsepx = "*", SOhledemNaAgendu = "*", DatumovyIntervalValue = "*", DatumovyIntervalFactor = "*", Vlastni = "*", IxsFunPredavajici = "*", IxsSuPredavajici = "*", IxsOrjPredavajici = "*", IxsFunPrebirajici = "*", IxsSuPrebirajici = "*", IxsOrjPrebirajici = "*", RedistribucePredavajiciVlastnictvi = "*", RedistribucePrebirajiciVlastnictvi = "*", IDokumentyNaCeste = "*", dat_vyriz_do_wflsdcj = "*", stav_cj_wflsdcj = "*", sslden_wflsdcj = "*", rok_wflsdcj = "*", por_cislo_wflsdcj = "*", DokumentAktualnihoUzlu = "*", IxsFunVsechnyFunkcePrebirajiciho = "*", ProEkoAgendy = "*", KategorieTypuDokumentuDleTypuAgendy = "*", ico_status = "*", ixs_car_wflspri = "*", FILTER_GROUP_WFLSIXP = "*", ixp = "*", lic = "*", rok = "*", status_pis = "*", typ_duv_del = "*",}
	const enum GDokumentFilterDtoTypes { FILTER_GROUP_SSLSPID = "string", obsah_text = "GBaseFilter<string>", poznamka = "GBaseFilter<string>", poc_kopii = "GBaseFilter<number>", dat_prij_pod = "GBaseFilter<JsonDate>", ixs_su_pod = "GBaseFilter<string>", dat_evid = "GBaseFilter<JsonDate>", cj_spis = "GBaseFilter<string>", odeslano_kam = "GBaseFilter<string>", s_resitel = "number", ixs_fun_resitel = "GBaseFilter<string>", s_vyriz = "number", typ_vyriz = "Gordic.Ginis.DbModel.GSslctvyEnum[]", vyriz_komu = "GBaseFilter<string>", vyriz_pozn = "GBaseFilter<string>", ixs_zmp_vyriz = "GBaseFilter<string>", ixs_fun_schval = "GBaseFilter<string>", ixs_zmp_schval = "GBaseFilter<string>", s_uzav = "number", dat_uzav = "GBaseFilter<JsonDate>", ixs_zmp_uzav = "GBaseFilter<string>", s_stor = "number", s_ztrat = "number", vztah_spis = "Gordic.Ginis.DbModel.GSslcvspEnum[]", pr_moc = "GBaseFilter<number>", dat_pr_moc = "GBaseFilter<JsonDate>", s_agp = "number", s_zastav = "number", obsah_text_slozeny = "GBaseFilter<string>", SubjektIxs = "string", SubjektTypeIxs = "Gordic.Gin.Interface.IxsType", SubjectStructOrg = "Gordic.Gin.Interface.SubjectStructOrgEnum", FILTER_GROUP_WFLSPID = "string", ixp_spis = "GBaseFilter<string>", priz_spis = "Gordic.Ginis.DbModel.GWflcpriEnum[]", ixs_fun_akt = "string[]", ixs_su_akt = "string[]", nazev = "GBaseFilter<string>", akt_znacka = "GBaseFilter<string>", stav_dist = "Gordic.Ginis.DbModel.GWflcstaEnum[]", stav_pis = "Gordic.Ginis.DbModel.GWflcstpEnum[]", typ_ag = "number[]", ktg_typ = "GBaseFilter<number>", ixs_typ = "string[]", s_prij = "Gordic.Ginis.DbModel.GWflcsprEnum[]", s_ssl = "Gordic.Ginis.DbModel.GWflcsslEnum[]", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "string", s_ele = "Gordic.Ginis.DbModel.GWflceleEnum[]", s_fyz = "Gordic.Ginis.DbModel.GWflcfyzEnum[]", misto_vzniku = "GBaseFilter<string>", s_sgn = "Gordic.Ginis.DbModel.GWflcsgnEnum[]", dat_pod = "GIntervalDto<JsonDate>", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string[]", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string[]", s_uloz = "number", dat_uloz = "GBaseFilter<JsonDate>", ixs_su_wfl = "string[]", s_odes = "number", priz_cj = "Gordic.Ginis.DbModel.GWflcpcjEnum[]", dat_vyriz = "GIntervalDto<JsonDate>", ixs_cj = "string", puvod = "Gordic.Ginis.DbModel.GWflcpuvEnum[]", s_schval = "number", umisteni = "string", st_utaj_id = "number", st_utaj_id_orig = "Gordic.Ginis.DbModel.GGincstuEnum[]", skar_znak = "GBaseFilter<string>", skar_lhuta = "GBaseFilter<number>", rok_spo_uda = "GBaseFilter<number>", ixp_top = "GBaseFilter<string>", typ_spis = "Gordic.Ginis.DbModel.GWflctysEnum[]", barcode = "GBaseFilter<string>", skar_lhuta_spra = "GBaseFilter<number>", ixs_ext = "GBaseFilter<string>", rok_skartace = "GBaseFilter<number>", ixs_spu = "GBaseFilter<string>", poc_listu = "GBaseFilter<string>", poc_stran = "GBaseFilter<number>", poc_kop = "GBaseFilter<number>", poc_priloh = "GBaseFilter<number>", poc_l_priloh = "GBaseFilter<string>", cj = "GBaseFilter<string>", ico = "GBaseFilter<string>", ixs_zup = "string", dat_mpd0 = "GBaseFilter<JsonDate>", ixs_lpc = "GBaseFilter<string>", uziv_sl_a = "GBaseFilter<string>", uziv_sl_a2 = "GBaseFilter<string>", uziv_sl_a3 = "GBaseFilter<string>", uziv_sl_b = "GBaseFilter<string>", uziv_sl_b2 = "GBaseFilter<string>", uziv_sl_b3 = "GBaseFilter<string>", uziv_sl_c = "GBaseFilter<string>", uziv_sl_c2 = "GBaseFilter<string>", uziv_sl_d = "GBaseFilter<string>", uziv_sl_d2 = "GBaseFilter<string>", uziv_sl_j = "GBaseFilter<string>", uziv_sl_j2 = "GBaseFilter<string>", uziv_sl_k = "GBaseFilter<string>", uziv_sl_k2 = "GBaseFilter<string>", uziv_sl_n = "GBaseFilter<string>", dat_dtermin = "JsonDate", priz_kop = "number", priz_kopie = "string", stav_epk_txt = "string", typ_pozad_pod_txt = "string", dat_vyriz_do = "GIntervalDto<JsonDate>", zp_vyriz_txt = "string", s_orig = "number", fulltext = "string", VyrizenaZadostVRak = "boolean", DilciTermin = "GIntervalDto<JsonDate>", ixs_fun_akt_wflstop = "string[]", ixs_su_akt_wflstop = "string[]", ixs_fun_cil_wflstop = "string[]", ixs_su_do_wflstop = "string[]", ixs_su_cil_wflhtop = "string[]", dat_cil_wflhtop = "GIntervalDto<JsonDate>", ixb_wflsepx = "GBaseFilter<string>", SOhledemNaAgendu = "boolean", DatumovyIntervalValue = "GIntervalDto<JsonDate>", DatumovyIntervalFactor = "'DP' | 'DV' | 'DZ'", Vlastni = "boolean", IxsFunPredavajici = "string", IxsSuPredavajici = "string", IxsOrjPredavajici = "string", IxsFunPrebirajici = "string", IxsSuPrebirajici = "string", IxsOrjPrebirajici = "string", RedistribucePredavajiciVlastnictvi = "Gordic.Gin.Interface.SubjektSelectedInfo", RedistribucePrebirajiciVlastnictvi = "Gordic.Gin.Interface.SubjektSelectedInfo", IDokumentyNaCeste = "boolean", dat_vyriz_do_wflsdcj = "GIntervalDto<JsonDate>", stav_cj_wflsdcj = "number[]", sslden_wflsdcj = "GBaseFilter<string>", rok_wflsdcj = "GBaseFilter<number>", por_cislo_wflsdcj = "GBaseFilter<number>", DokumentAktualnihoUzlu = "boolean", IxsFunVsechnyFunkcePrebirajiciho = "string", ProEkoAgendy = "boolean", KategorieTypuDokumentuDleTypuAgendy = "number", ico_status = "number", ixs_car_wflspri = "GBaseFilter<string>", FILTER_GROUP_WFLSIXP = "string", ixp = "GBaseFilter<string>", lic = "GBaseFilter<string>", rok = "GBaseFilter<number>", status_pis = "Gordic.Ginis.DbModel.GWflcumpEnum[]", typ_duv_del = "Gordic.Ginis.DbModel.GWflctddEnum[]",}
	const enum GDokumentFilterDtoTypeLengths { obsah_text = 254, poznamka = 100, cj_spis = 50, odeslano_kam = 100, vyriz_komu = 100, vyriz_pozn = 254, nazev = 100, akt_znacka = 50, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, umisteni = 20, skar_znak = 2, barcode = 50, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, uziv_sl_a = 254, uziv_sl_a2 = 254, uziv_sl_a3 = 254, uziv_sl_b = 254, uziv_sl_b2 = 254, uziv_sl_b3 = 254, uziv_sl_c = 254, uziv_sl_c2 = 254, uziv_sl_d = 254, uziv_sl_d2 = 254, uziv_sl_j = 254, uziv_sl_j2 = 254, uziv_sl_k = 254, uziv_sl_k2 = 254, uziv_sl_n = 254, sslden_wflsdcj = 7, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GDokumentUpdateRequestDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro aktualizaci informací o dokumentu (IGDokument.Update).*/
	interface GDokumentUpdateRequestDto {
		/**Fragmenty podle kterých se načtou aktuální data.
		*     Pokud je null (default), pak se data vracet nebudou
		*/
		ReadDataFragements?: string[]|null;
		/**Data dokumentu.*/
		Dokument?: Gordic.Ssl.Interface.GDokumentUpdateDto|null;
	}
	const enum GDokumentUpdateRequestDtoNames { ReadDataFragements = "ReadDataFragements", Dokument = "Dokument",}
	const enum GDokumentUpdateRequestDtoFragments { ReadDataFragements = "*", Dokument = "*",}
	const enum GDokumentUpdateRequestDtoTypes { ReadDataFragements = "string[]", Dokument = "Gordic.Ssl.Interface.GDokumentUpdateDto",}
	const enum GDokumentUpdateRequestDtoTypeLengths {}
	interface GDokumentUpdateDto {
		/**The validation group vlastni*/
		VALIDATION_GROUP_VLASTNI?: string|null;
		/**The validation group vlastni*/
		VALIDATION_GROUP_CIZI?: string|null;
		/**Gets or sets the ixp.*/
		ixp?: string|null;
		/**Gets or sets the dat prij pod.*/
		dat_zmena?: JsonDate|null;
		/**Gets or sets the akt znacka.*/
		akt_znacka?: string|null;
		/**Gets or sets the nazev.*/
		nazev?: string|null;
		/**Gets or sets the ixs typ.*/
		ixs_typ?: string|null;
		/**Gets or sets the st utaj identifier.*/
		st_utaj_id?: number|null;
		/**Gets or sets the spis pl.*/
		spis_pl?: string|null;
		/**Gets or sets the spis znak.*/
		spis_znak?: string|null;
		/**Gets or sets the obsah text.*/
		obsah_text?: string|null;
		/**Gets or sets the poznamka.*/
		poznamka?: string|null;
		/**Gets or sets the poc listu.*/
		poc_listu?: string|null;
		/**Gets or sets the poc priloh.*/
		poc_priloh?: number|null;
		/**Gets or sets the poc stran.*/
		poc_stran?: number|null;
		/**Gets or sets the poc kop.*/
		poc_kop?: number|null;
		/**Gets or sets the poc l priloh.*/
		poc_l_priloh?: string|null;
		/**Gets or sets the ixs fun resitel.*/
		ixs_fun_resitel?: string|null;
		/**Gets or sets the umisteni.*/
		umisteni?: string|null;
		/**Gets or sets the dat prij pod.*/
		dat_prij_pod?: JsonDate|null;
		/**Gets or sets the s SSL.*/
		s_ssl?: number|null;
		/**Gets or sets the cj ext.*/
		cj_ext?: string|null;
		/**Gets or sets the dat vyriz do.*/
		dat_vyriz_do?: JsonDate|null;
		/**Gets or sets the duvod zt.*/
		duvod_zt?: string|null;
		/**Gets or sets the typ ag.*/
		typ_ag?: number|null;
		/**Gets or sets a value indicating whether [zapis hist].*/
		zapisHist?: boolean|null;
		/**Gets or sets the doruceni.*/
		Doruceni?: Gordic.Ssl.Interface.GDokumentDoruceniUpdateDto|null;
		/**Gets or sets the vlastnosti.*/
		Vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
	}
	const enum GDokumentUpdateDtoNames { VALIDATION_GROUP_VLASTNI = "VALIDATION_GROUP_VLASTNI", VALIDATION_GROUP_CIZI = "VALIDATION_GROUP_CIZI", ixp = "ixp", dat_zmena = "dat_zmena", akt_znacka = "akt_znacka", nazev = "nazev", ixs_typ = "ixs_typ", st_utaj_id = "st_utaj_id", spis_pl = "spis_pl", spis_znak = "spis_znak", obsah_text = "obsah_text", poznamka = "poznamka", poc_listu = "poc_listu", poc_priloh = "poc_priloh", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_l_priloh = "poc_l_priloh", ixs_fun_resitel = "ixs_fun_resitel", umisteni = "umisteni", dat_prij_pod = "dat_prij_pod", s_ssl = "s_ssl", cj_ext = "cj_ext", dat_vyriz_do = "dat_vyriz_do", duvod_zt = "duvod_zt", typ_ag = "typ_ag", zapisHist = "zapisHist", Doruceni = "Doruceni", Vlastnosti = "Vlastnosti",}
	const enum GDokumentUpdateDtoFragments { VALIDATION_GROUP_VLASTNI = "*", VALIDATION_GROUP_CIZI = "*", ixp = "*", dat_zmena = "*", akt_znacka = "*", nazev = "*", ixs_typ = "*", st_utaj_id = "*", spis_pl = "*", spis_znak = "*", obsah_text = "*", poznamka = "*", poc_listu = "*", poc_priloh = "*", poc_stran = "*", poc_kop = "*", poc_l_priloh = "*", ixs_fun_resitel = "*", umisteni = "*", dat_prij_pod = "*", s_ssl = "*", cj_ext = "*", dat_vyriz_do = "*", duvod_zt = "*", typ_ag = "*", zapisHist = "*", Doruceni = "*", Vlastnosti = "*",}
	const enum GDokumentUpdateDtoTypes { VALIDATION_GROUP_VLASTNI = "string", VALIDATION_GROUP_CIZI = "string", ixp = "string", dat_zmena = "JsonDate", akt_znacka = "string", nazev = "string", ixs_typ = "string", st_utaj_id = "number", spis_pl = "string", spis_znak = "string", obsah_text = "string", poznamka = "string", poc_listu = "string", poc_priloh = "number", poc_stran = "number", poc_kop = "number", poc_l_priloh = "string", ixs_fun_resitel = "string", umisteni = "string", dat_prij_pod = "JsonDate", s_ssl = "number", cj_ext = "string", dat_vyriz_do = "JsonDate", duvod_zt = "string", typ_ag = "number", zapisHist = "boolean", Doruceni = "Gordic.Ssl.Interface.GDokumentDoruceniUpdateDto", Vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto",}
	const enum GDokumentUpdateDtoTypeLengths {}
	interface GDokumentDoruceniUpdateDto {
		/**Gets or sets the por zast.*/
		por_zast?: number|null;
		/**Gets or sets the lic zast.*/
		lic_zast?: string|null;
		/**Gets or sets the zast text.*/
		zast_txt?: string|null;
		/**Gets or sets the stat.*/
		stat?: number|null;
		/**Gets or sets the PSC.*/
		psc?: string|null;
		/**Gets or sets the dat odes.*/
		dat_odes?: JsonDate|null;
		/**Gets or sets the znacka odes.*/
		znacka_odes?: string|null;
		/**Gets or sets the dat ze dne.*/
		dat_ze_dne?: JsonDate|null;
		/**Gets or sets the pod cis.*/
		pod_cis?: string|null;
		/**Gets or sets the zpusob dor.*/
		zpusob_dor?: number|null;
		/**Gets or sets the druh zas.*/
		druh_zas?: number|null;
		/**Gets or sets the druh zas zach.*/
		druh_zas_zach?: number|null;
		/**Gets or sets the ixs esu.*/
		ixs_esu?: string|null;
		/**Gets or sets the poznamka.*/
		poznamka?: string|null;
		/**Gets or sets the sp znacka odes.*/
		sp_znacka_odes?: string|null;
		/**Gets or sets the dat doruc.*/
		dat_doruc?: JsonDate|null;
		/**Gets or sets the ixs su cil.*/
		ixs_su_cil?: string|null;
		/**Gets or sets the ixs fun cil.*/
		ixs_fun_cil?: string|null;
	}
	const enum GDokumentDoruceniUpdateDtoNames { por_zast = "por_zast", lic_zast = "lic_zast", zast_txt = "zast_txt", stat = "stat", psc = "psc", dat_odes = "dat_odes", znacka_odes = "znacka_odes", dat_ze_dne = "dat_ze_dne", pod_cis = "pod_cis", zpusob_dor = "zpusob_dor", druh_zas = "druh_zas", druh_zas_zach = "druh_zas_zach", ixs_esu = "ixs_esu", poznamka = "poznamka", sp_znacka_odes = "sp_znacka_odes", dat_doruc = "dat_doruc", ixs_su_cil = "ixs_su_cil", ixs_fun_cil = "ixs_fun_cil",}
	const enum GDokumentDoruceniUpdateDtoFragments { por_zast = "*", lic_zast = "*", zast_txt = "*", stat = "*", psc = "*", dat_odes = "*", znacka_odes = "*", dat_ze_dne = "*", pod_cis = "*", zpusob_dor = "*", druh_zas = "*", druh_zas_zach = "*", ixs_esu = "*", poznamka = "*", sp_znacka_odes = "*", dat_doruc = "*", ixs_su_cil = "*", ixs_fun_cil = "*",}
	const enum GDokumentDoruceniUpdateDtoTypes { por_zast = "number", lic_zast = "string", zast_txt = "string", stat = "number", psc = "string", dat_odes = "JsonDate", znacka_odes = "string", dat_ze_dne = "JsonDate", pod_cis = "string", zpusob_dor = "number", druh_zas = "number", druh_zas_zach = "number", ixs_esu = "string", poznamka = "string", sp_znacka_odes = "string", dat_doruc = "JsonDate", ixs_su_cil = "string", ixs_fun_cil = "string",}
	const enum GDokumentDoruceniUpdateDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GEnums.d.ts 

////declare namespace Gordic.Ssl.Interface.GDokumentDto {
////    /**
////     * Konstanty fragmentů.
////     *
////     * @author  TFeik
////     * @since 484.1.0.8
////     */
////    const enum FRAGMENT {
////        // GWflspidDto
////        WFLSIXP = 'WFLSIXP',
////        WFLSPID = 'WFLSPID',
////        SPISOVNA = 'SPISOVNA',
////        PRILOHA_HLAVNI = 'PRILOHA_HLAVNI',
////        PRILOHY = 'PRILOHY',
////        SPIS = 'SPIS',
////        EPK = 'EPK',
////        EPK_TXT = 'EPK_TXT',
////        RAK = 'RAK',
////        POZASTAVENI_SKARTACNI_OPERACE = 'POZASTAVENI_SKARTACNI_OPERACE',
////        SPIS_STAV = 'SPIS_STAV',
////        SPIS_PORADI = 'SPIS_PORADI',
////        SERVISNI = 'SERVISNI',
////        SPOUSTECI_UDALOST = 'SPOUSTECI_UDALOST',
////        UZIVATELSKE_SLOUPCE_SEZNAM = 'UZIVATELSKE_SLOUPCE_SEZNAM',
////        UZIVATELSKE_SLOUPCE_HLEDANI = 'UZIVATELSKE_SLOUPCE_HLEDANI',
////        UZIVATELSKE_SLOUPCE_DETAIL = 'UZIVATELSKE_SLOUPCE_DETAIL',
////        HISTORIE_ZMEN = 'HISTORIE_ZMEN',
////        HISTORIE_REDISTRIBUCE = 'HISTORIE_REDISTRIBUCE',
////        HISTORIE_POZNAMEK = 'HISTORIE_POZNAMEK',
////        CO_JSEM_ZAC = 'CO_JSEM_ZAC',
////        TYP_ENTITY_ICON = 'TYP_ENTITY_ICON',
////        TECHNICKE_VLASTNOSTI_ICON = 'TECHNICKE_VLASTNOSTI_ICON',
////        POZICE_SPIS_ICON = 'POZICE_SPIS_ICON',
////        STAV_ZPRACOVANI_ICON = 'STAV_ZPRACOVANI_ICON',
////        STAV_TERMIN_ICON = 'STAV_TERMIN_ICON',
////        DOPLNUJICI_INFORMACE_ICON = "DOPLNUJICI_INFORMACE_ICON",
////        DILCI_TERMIN = "DILCI_TERMIN",
////        PRIZNAK_KOPIE = "PRIZNAK_KOPIE",
////        DATUM_VYRIZENI = "DATUM_VYRIZENI",
////        ZPUSOB_VYRIZENI = "ZPUSOB_VYRIZENI",
////        VLASTNICTVI = "VLASTNICTVI",
////        VALIDATORS = 'VALIDATORS',
////        DOTCENE_SUBJEKTY = 'DOTCENE_SUBJEKTY',
////        KLICOVA_SLOVA = 'KLICOVA_SLOVA',
////        FORMULARE = 'FORMULARE',
////        DORUCENI = 'DORUCENI',
////        REDISTRIBUCE = 'REDISTRIBUCE',
////        SOUVISEJICI = 'SOUVISEJICI',
////        KOPIE = 'KOPIE',
////        SPISOVY_PLAN = 'SPISOVY_PLAN',
////        SPISOVY_ZNAK = 'SPISOVY_ZNAK',
////        VLASTNIK_FUNKCE = 'VLASTNIK_FUNKCE',
////        VLASTNIK_SPISOVY_UZEL = 'VLASTNIK_SPISOVY_UZEL',
////        TYP_PISEMNOSTI = 'TYP_PISEMNOSTI',
////        ZMENU_PROVEDL = 'ZMENU_PROVEDL',
////        VLASTNIK_AGENDOVY_FUNKCE = 'VLASTNIK_AGENDOVY_FUNKCE',
////        VLASTNIK_AGENDOVY_SPISOVY_UZEL = 'VLASTNIK_AGENDOVY_SPISOVY_UZEL',
////        CISLO_JEDNACI = 'CISLO_JEDNACI',
////        UMISTENI = 'UMISTENI',
////        EXTERNI_SYSTEM = 'EXTERNI_SYSTEM',
////        TYP_SPOUSTECI_UDALOSTI = 'TYP_SPOUSTECI_UDALOSTI',
////        SPISOVY_UZEL_PODAL = 'SPISOVY_UZEL_PODAL',
////        PERMISSIONS = 'PERMISSIONS',
////        // GDokumentDto
////        SSLSPID = 'SSLSPID',
////        RESITEL = 'RESITEL',
////        ZMENU_PROVEDL_VYRIZ = 'ZMENU_PROVEDL_VYRIZ',
////        ZMENU_PROVEDL_SCHVALIL = 'ZMENU_PROVEDL_SCHVALIL',
////        ZMENU_PROVEDL_UZAVREL = 'ZMENU_PROVEDL_UZAVREL',
////        SCHVALOVATEL = 'SCHVALOVATEL',
////        BALIK = 'BALIK'
////    }
////}

declare namespace Gordic.Ssl.Interface.GSslspidStatic {
    type FRAGMENT = Wfl.Interface.GWflspidStatic.FRAGMENT | 'SSLSPID' | 'RESITEL' | 'ZMENU_PROVEDL_VYRIZ'
        | 'ZMENU_PROVEDL_SCHVALIL' | 'ZMENU_PROVEDL_UZAVREL' | 'SCHVALOVATEL' | 'SPIS_PORADI' | 'BALIK'
        | 'SPISOVY_UZEL_PODAL' | 'SPIS' | 'SPIS_PRIRAZENY' | 'IDENTIFIKATOR_ORIGINALU' | 'IXP_POSLEDNIHO_SPISU'
        | 'V_MINULOSTI_VE_SPISU' | 'OBRAZEK_NA_DETAILU' | 'PERMISSIONS_ACTIONS_VYRIDIT_DLE_EPK';
}

declare namespace Gordic.Ssl.Interface.GSslsdcjStatic {
    type FRAGMENT = Ssl.Interface.GSslspidStatic.FRAGMENT | 'SSLSDCJ' | 'PRERUSENO_DAT_DO' | 'PRERUSENO_DUVOD'
        | 'DATUM_ODESLANI_VYRIZUJICI_PISEMNOSTI' | 'POCET_JINOAGENDOVYCH_DOKUMENTU_VE_SPISU';
}

declare namespace Gordic.Ssl.Interface.GDashboardCountFiltersDto {
    type FRAGMENT = 'DOKUMENTY_KE_ZPRACOVANI' | 'DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE' | 'SPISY_KE_ZPRACOVANI'
        | 'SPISY_KE_ZPRACOVANI_ROZSIRENE' | 'SPISY_K_UZAVRENI' | 'SPISY_K_UZAVRENI_ROZSIRENE' | 'TERMINY'
        | 'DOKUMENTY_A_SPISY_PREVZETI_PREDANI' | 'BAREVNE_OZNACENE' | 'DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI';
}

declare namespace Gordic.Ssl.Interface.GDashboardCountsDto {
    type FRAGMENT = Ssl.Interface.GDashboardCountFiltersDto.FRAGMENT;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GGinsvskDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:ginsvsk
	*      Věcná skupina
	*/
	interface GGinsvskDto {
		/**Identifikátor věcné skupiny
		*      Strojně generovaný identifikátor věcné skupiny
		*/
		ixs_vsk?: string|null;
		/**IČo organizace
		*      IČo organizace, která používá tuto věcnou skupinu
		*/
		ico?: string|null;
		/**Název věcné skupiny
		*      Název věcné skupiny
		*/
		nazev?: string|null;
		/**Čas otevření
		*      Čas otevření věcné skupiny
		*/
		dat_od?: JsonDate|null;
		/**Čas uzavření
		*      Čas uzavření věcné skupiny.
		*/
		dat_do?: JsonDate|null;
		/**Spisový znak
		*      Plně určený spisový znak.
		*/
		spis_znak?: string|null;
		/**Jednoduchý spisový znak
		*      Jednoduchý spisový znak
		*/
		spis_znak_short?: string|null;
		/**Nadřízená věcná skupina
		*      Nadřízená věcná skupina
		*/
		ixs_vsk_nad?: string|null;
		/**Skartační režimy*/
		ixs_skr?: string|null;
		/**Určení spis.znaku*/
		urceni_spis_z?: number|null;
		/**Způsob přiřazení ČJj*/
		zpus_prid_cj?: number|null;
		/**Formát ČJ
		*      Formátovací předpis pro vyskládání textové podoby ČJ
		*/
		format_cj?: string|null;
		/**Trvalý skartační souhlas*/
		priz_trvskar?: number|null;
		/**Spisový plán OD
		*      Spisový plán OD
		*/
		ixs_spn_od?: string|null;
		/**Spisový plán DO*/
		ixs_spn_do?: string|null;
		/**Předchozí spisový znak*/
		ixs_vsk_prev?: string|null;
		/**Následující spisový znak*/
		ixs_vsk_next?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		cs2_spis_znak?: string|null;
		cs2_spis_znak_shor?: string|null;
		/**obd_vsk období číselník - dny roky atd.
		*      obd_vsk období číselník - dny roky atd.
		*/
		obd_vsk?: number|null;
		/**Kam byly entity věcné skupiny přetříděny (např. při přetřídění TS)
		*      Kam byly entity věcné skupiny přetříděny (např. při přetřídění TS)
		*/
		ixs_vsk_pret?: string|null;
		pocet_obd_vsk?: number|null;
		priz_vazba_fun?: number|null;
		priz_kon_form?: number|null;
		/**Skartace pozastavena*/
		priz_poz_skar?: number|null;
		duvod_poz_skar?: string|null;
		ixs_zmp_poz_skar?: string|null;
		dat_poz_skar?: JsonDate|null;
	}
	const enum GGinsvskDtoNames { ixs_vsk = "ixs_vsk", ico = "ico", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", spis_znak = "spis_znak", spis_znak_short = "spis_znak_short", ixs_vsk_nad = "ixs_vsk_nad", ixs_skr = "ixs_skr", urceni_spis_z = "urceni_spis_z", zpus_prid_cj = "zpus_prid_cj", format_cj = "format_cj", priz_trvskar = "priz_trvskar", ixs_spn_od = "ixs_spn_od", ixs_spn_do = "ixs_spn_do", ixs_vsk_prev = "ixs_vsk_prev", ixs_vsk_next = "ixs_vsk_next", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs2_spis_znak = "cs2_spis_znak", cs2_spis_znak_shor = "cs2_spis_znak_shor", obd_vsk = "obd_vsk", ixs_vsk_pret = "ixs_vsk_pret", pocet_obd_vsk = "pocet_obd_vsk", priz_vazba_fun = "priz_vazba_fun", priz_kon_form = "priz_kon_form", priz_poz_skar = "priz_poz_skar", duvod_poz_skar = "duvod_poz_skar", ixs_zmp_poz_skar = "ixs_zmp_poz_skar", dat_poz_skar = "dat_poz_skar",}
	const enum GGinsvskDtoFragments { ixs_vsk = "*", ico = "*", nazev = "*", dat_od = "*", dat_do = "*", spis_znak = "*", spis_znak_short = "*", ixs_vsk_nad = "*", ixs_skr = "*", urceni_spis_z = "*", zpus_prid_cj = "*", format_cj = "*", priz_trvskar = "*", ixs_spn_od = "*", ixs_spn_do = "*", ixs_vsk_prev = "*", ixs_vsk_next = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cs2_spis_znak = "*", cs2_spis_znak_shor = "*", obd_vsk = "*", ixs_vsk_pret = "*", pocet_obd_vsk = "*", priz_vazba_fun = "*", priz_kon_form = "*", priz_poz_skar = "*", duvod_poz_skar = "*", ixs_zmp_poz_skar = "*", dat_poz_skar = "*",}
	const enum GGinsvskDtoTypes { ixs_vsk = "string", ico = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", spis_znak = "string", spis_znak_short = "string", ixs_vsk_nad = "string", ixs_skr = "string", urceni_spis_z = "number", zpus_prid_cj = "number", format_cj = "string", priz_trvskar = "number", ixs_spn_od = "string", ixs_spn_do = "string", ixs_vsk_prev = "string", ixs_vsk_next = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs2_spis_znak = "string", cs2_spis_znak_shor = "string", obd_vsk = "number", ixs_vsk_pret = "string", pocet_obd_vsk = "number", priz_vazba_fun = "number", priz_kon_form = "number", priz_poz_skar = "number", duvod_poz_skar = "string", ixs_zmp_poz_skar = "string", dat_poz_skar = "JsonDate",}
	const enum GGinsvskDtoTypeLengths { ixs_vsk = 12, ico = 10, nazev = 100, spis_znak = 255, spis_znak_short = 50, ixs_vsk_nad = 12, ixs_skr = 12, format_cj = 60, ixs_spn_od = 12, ixs_spn_do = 12, ixs_vsk_prev = 12, ixs_vsk_next = 12, poznamka = 254, zmenu_prov = 12, cs2_spis_znak = 254, cs2_spis_znak_shor = 254, ixs_vsk_pret = 12, duvod_poz_skar = 254, ixs_zmp_poz_skar = 12,}
	/**Rozšíření DTO pro věcnou skupinu*/
	interface GGinsvskExtDto extends Gordic.Ssl.Interface.GGinsvskDto {
		/**Textová reprezentace skartačního režimu*/
		ixs_skr_txt?: string|null;
	}
	const enum GGinsvskExtDtoNames { ixs_skr_txt = "ixs_skr_txt", ixs_vsk = "ixs_vsk", ico = "ico", nazev = "nazev", dat_od = "dat_od", dat_do = "dat_do", spis_znak = "spis_znak", spis_znak_short = "spis_znak_short", ixs_vsk_nad = "ixs_vsk_nad", ixs_skr = "ixs_skr", urceni_spis_z = "urceni_spis_z", zpus_prid_cj = "zpus_prid_cj", format_cj = "format_cj", priz_trvskar = "priz_trvskar", ixs_spn_od = "ixs_spn_od", ixs_spn_do = "ixs_spn_do", ixs_vsk_prev = "ixs_vsk_prev", ixs_vsk_next = "ixs_vsk_next", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cs2_spis_znak = "cs2_spis_znak", cs2_spis_znak_shor = "cs2_spis_znak_shor", obd_vsk = "obd_vsk", ixs_vsk_pret = "ixs_vsk_pret", pocet_obd_vsk = "pocet_obd_vsk", priz_vazba_fun = "priz_vazba_fun", priz_kon_form = "priz_kon_form", priz_poz_skar = "priz_poz_skar", duvod_poz_skar = "duvod_poz_skar", ixs_zmp_poz_skar = "ixs_zmp_poz_skar", dat_poz_skar = "dat_poz_skar",}
	const enum GGinsvskExtDtoFragments { ixs_skr_txt = "*", ixs_vsk = "*", ico = "*", nazev = "*", dat_od = "*", dat_do = "*", spis_znak = "*", spis_znak_short = "*", ixs_vsk_nad = "*", ixs_skr = "*", urceni_spis_z = "*", zpus_prid_cj = "*", format_cj = "*", priz_trvskar = "*", ixs_spn_od = "*", ixs_spn_do = "*", ixs_vsk_prev = "*", ixs_vsk_next = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", cs2_spis_znak = "*", cs2_spis_znak_shor = "*", obd_vsk = "*", ixs_vsk_pret = "*", pocet_obd_vsk = "*", priz_vazba_fun = "*", priz_kon_form = "*", priz_poz_skar = "*", duvod_poz_skar = "*", ixs_zmp_poz_skar = "*", dat_poz_skar = "*",}
	const enum GGinsvskExtDtoTypes { ixs_skr_txt = "string", ixs_vsk = "string", ico = "string", nazev = "string", dat_od = "JsonDate", dat_do = "JsonDate", spis_znak = "string", spis_znak_short = "string", ixs_vsk_nad = "string", ixs_skr = "string", urceni_spis_z = "number", zpus_prid_cj = "number", format_cj = "string", priz_trvskar = "number", ixs_spn_od = "string", ixs_spn_do = "string", ixs_vsk_prev = "string", ixs_vsk_next = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cs2_spis_znak = "string", cs2_spis_znak_shor = "string", obd_vsk = "number", ixs_vsk_pret = "string", pocet_obd_vsk = "number", priz_vazba_fun = "number", priz_kon_form = "number", priz_poz_skar = "number", duvod_poz_skar = "string", ixs_zmp_poz_skar = "string", dat_poz_skar = "JsonDate",}
	const enum GGinsvskExtDtoTypeLengths { ixs_vsk = 12, ico = 10, nazev = 100, spis_znak = 255, spis_znak_short = 50, ixs_vsk_nad = 12, ixs_skr = 12, format_cj = 60, ixs_spn_od = 12, ixs_spn_do = 12, ixs_vsk_prev = 12, ixs_vsk_next = 12, poznamka = 254, zmenu_prov = 12, cs2_spis_znak = 254, cs2_spis_znak_shor = 254, ixs_vsk_pret = 12, duvod_poz_skar = 254, ixs_zmp_poz_skar = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GInputImportSpisPlanDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Objekt reprezentující vstup do inportu spisového plánu*/
	interface GInputImportSpisPlanDto {
		/**soubor*/
		file?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**oddělovač*/
		separator?: string|null;
		/**Identifikátor spisového plánu*/
		spis_pl?: string|null;
		/**Název spisového plánu*/
		nazev?: string|null;
	}
	const enum GInputImportSpisPlanDtoNames { file = "file", separator = "separator", spis_pl = "spis_pl", nazev = "nazev",}
	const enum GInputImportSpisPlanDtoFragments { file = "*", separator = "*", spis_pl = "*", nazev = "*",}
	const enum GInputImportSpisPlanDtoTypes { file = "Gordic.General.ApplicationInterface.GFileInfoDto", separator = "string", spis_pl = "string", nazev = "string",}
	const enum GInputImportSpisPlanDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GSeznamKatastruDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:SeznamKatastru*/
	interface GSeznamKatastruDto {
		/**DBCOLUMN:SeznamKatastru.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamKatastru.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:SeznamKatastru.cis_katastr*/
		cis_katastr?: number|null;
		/**DBCOLUMN:SeznamKatastru.cis_katastr_txt*/
		cis_katastr_txt?: string|null;
		/**DBCOLUMN:SeznamKatastru.cis_par1*/
		cis_par1?: number|null;
		/**DBCOLUMN:SeznamKatastru.cis_par2*/
		cis_par2?: number|null;
		/**DBCOLUMN:SeznamKatastru.cis_pop*/
		cis_pop?: string|null;
		/**DBCOLUMN:SeznamKatastru.cis_parcelni*/
		cis_parcelni?: string|null;
		/**DBCOLUMN:SeznamKatastru.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:SeznamKatastru.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamKatastru.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:SeznamKatastru.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamKatastru.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamKatastru.cis_mc*/
		cis_mc?: number|null;
		/**DBCOLUMN:SeznamKatastru.cis_cam*/
		cis_cam?: number|null;
		/**DBCOLUMN:SeznamKatastru.cis_mc_txt*/
		cis_mc_txt?: string|null;
		/**DBCOLUMN:SeznamKatastru.cis_cam_txt*/
		cis_cam_txt?: string|null;
		/**DBCOLUMN:SeznamKatastru.esu_txt*/
		esu_txt?: string|null;
	}
	const enum GSeznamKatastruDtoNames { ixp = "ixp", por_cislo = "por_cislo", cis_katastr = "cis_katastr", cis_katastr_txt = "cis_katastr_txt", cis_par1 = "cis_par1", cis_par2 = "cis_par2", cis_pop = "cis_pop", cis_parcelni = "cis_parcelni", ulice = "ulice", nazev = "nazev", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cis_mc = "cis_mc", cis_cam = "cis_cam", cis_mc_txt = "cis_mc_txt", cis_cam_txt = "cis_cam_txt", esu_txt = "esu_txt",}
	const enum GSeznamKatastruDtoFragments { ixp = "*", por_cislo = "*", cis_katastr = "*", cis_katastr_txt = "*", cis_par1 = "*", cis_par2 = "*", cis_pop = "*", cis_parcelni = "*", ulice = "*", nazev = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", cis_mc = "*", cis_cam = "*", cis_mc_txt = "*", cis_cam_txt = "*", esu_txt = "*",}
	const enum GSeznamKatastruDtoTypes { ixp = "string", por_cislo = "number", cis_katastr = "number", cis_katastr_txt = "string", cis_par1 = "number", cis_par2 = "number", cis_pop = "string", cis_parcelni = "string", ulice = "string", nazev = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", cis_mc = "number", cis_cam = "number", cis_mc_txt = "string", cis_cam_txt = "string", esu_txt = "string",}
	const enum GSeznamKatastruDtoTypeLengths { ixp = 12, cis_pop = 10, cis_parcelni = 25, ulice = 48, nazev = 254, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GSpisDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Spis (dto) - sslsdcj.*/
	interface GSpisDto extends Gordic.Ssl.Interface.GSslspidDto {
		/**deník ssl*/
		sslden?: string|null;
		/**rok sslsdcj*/
		rok_sslsdcj?: number|null;
		/**pořadové číslo*/
		por_cislo?: number|null;
		/**číslo jednací*/
		cj_sslsdcj?: string|null;
		/**doplněk spisové značky/čísla jednacího*/
		cj_ext?: string|null;
		/**identifikátor spisu.*/
		ixp_spis_sslsdcj?: string|null;
		/**identifikátor iniciační písemnosti*/
		ixp_init?: string|null;
		/**identifikátor vyřizující písemnosti*/
		ixp_vyriz?: string|null;
		/**Název spisu.*/
		nazev_sslsdcj?: string|null;
		/**identifikátor spisového uzlu ?*/
		ixs_su?: string|null;
		/**zkratka spisového uzlu ?*/
		zkratka_su?: string|null;
		/**počet písemností ve spisu*/
		pocet_pis?: number|null;
		/**Datum a čas poslední změny spisu.*/
		dat_zmena_sslsdcj?: JsonDate|null;
		/**Identifikátor autora poslední změny spisu.*/
		zmenu_prov_sslsdcj?: string|null;
		/**počet dokumentů aktuálně vložených ve spisu*/
		pocet_vlozenych_dok?: number|null;
		/**datum založení spisu*/
		dat_zal?: JsonDate|null;
		/**Příznak uzavření.*/
		s_uzav_sslsdcj?: number|null;
		/**Datum uzavření.*/
		dat_uzav_sslsdcj?: JsonDate|null;
		/**kdo založil spis*/
		ixs_zmp_zal?: string|null;
		/**značka odesilatele*/
		znacka_odes?: string|null;
		/**Příznak zastavení.*/
		s_zastav_sslsdcj?: number|null;
		/**identifikátor priorovaného spisu*/
		ixp_prior?: string|null;
		/**Zda má nabytou právní moc.*/
		pr_moc_sslsdcj?: number|null;
		/**Datum nabytí právní moci.*/
		dat_pr_moc_sslsdcj?: JsonDate|null;
		/**stav priorace spisu*/
		s_prior?: number|null;
		/**klíčová slova*/
		kl_slova?: string|null;
		/**Gets or sets the s po term.*/
		s_po_term?: number|null;
		/**Gets or sets the cj souv text.*/
		cj_souv_txt?: string|null;
		/**The dat vyriz do*/
		zp_vyriz_txt?: string|null;
		/**Gets or sets the priz ZSCH.*/
		priz_zsch?: number|null;
		/**Gets or sets the priz akt.*/
		priz_akt?: number|null;
		/**Gets or sets the osc.*/
		osc?: string|null;
		/**Gets or sets the prav kval.*/
		prav_kval?: string|null;
		/**Gets or sets the zakon c.*/
		zakon_c?: string|null;
		/**Gets or sets the znacka ts.*/
		znacka_ts?: string|null;
		/**způsob vyřízení*/
		zp_vyriz?: string|null;
		/**stav spisu*/
		stav_spis?: number|null;
		/**odesláno listů*/
		odeslano_listu?: number|null;
		/**uloženo listů*/
		ulozeno_listu?: number|null;
		/**svazků příloh*/
		sv_priloh?: string|null;
		/**velikost el. dokumentů - zjišťuje se jen při zapnutém parametru*/
		velikost_el?: JsonDecimal|null;
		/**ixs typového spisu*/
		ixs_tss?: string|null;
		/**ixp nadřízené složky*/
		ixp_nad?: string|null;
		/**ixp nadřízené složky*/
		ixp_top_slozka?: string|null;
		/**preruseni do data*/
		preruseno_dat_do?: JsonDate|null;
		/**důvod preruseni*/
		preruseno_duvod?: string|null;
		/**Datum odeslání vyřizující písemnosti.*/
		DatumOdeslaniVyrizujiciPisemnosti?: JsonDate|null;
		/**Datum podání iniciačního dokumentu.*/
		DatumPodaniIniciacnihoDokumentu?: JsonDate|null;
		/**Počet jinoagendových dokumentů ve spisu.*/
		PocetJinoagendovychDokumentuVSpisu?: number|null;
		/**eKLEP - Zpracované připomínkové řízení.*/
		PripominkoveRizeniZpacovane?: Gordic.Ssl.Interface.GSslseklDto[]|null;
		/**Identifikátor dílu.*/
		IxpDil?: string|null;
		/**Oprávnění.*/
		Permissions?: Gordic.Ssl.Interface.GSpisPermissionsDto|null;
	}
	const enum GSpisDtoNames { sslden = "sslden", rok_sslsdcj = "rok_sslsdcj", por_cislo = "por_cislo", cj_sslsdcj = "cj_sslsdcj", cj_ext = "cj_ext", ixp_spis_sslsdcj = "ixp_spis_sslsdcj", ixp_init = "ixp_init", ixp_vyriz = "ixp_vyriz", nazev_sslsdcj = "nazev_sslsdcj", ixs_su = "ixs_su", zkratka_su = "zkratka_su", pocet_pis = "pocet_pis", dat_zmena_sslsdcj = "dat_zmena_sslsdcj", zmenu_prov_sslsdcj = "zmenu_prov_sslsdcj", pocet_vlozenych_dok = "pocet_vlozenych_dok", dat_zal = "dat_zal", s_uzav_sslsdcj = "s_uzav_sslsdcj", dat_uzav_sslsdcj = "dat_uzav_sslsdcj", ixs_zmp_zal = "ixs_zmp_zal", znacka_odes = "znacka_odes", s_zastav_sslsdcj = "s_zastav_sslsdcj", ixp_prior = "ixp_prior", pr_moc_sslsdcj = "pr_moc_sslsdcj", dat_pr_moc_sslsdcj = "dat_pr_moc_sslsdcj", s_prior = "s_prior", kl_slova = "kl_slova", s_po_term = "s_po_term", cj_souv_txt = "cj_souv_txt", zp_vyriz_txt = "zp_vyriz_txt", priz_zsch = "priz_zsch", priz_akt = "priz_akt", osc = "osc", prav_kval = "prav_kval", zakon_c = "zakon_c", znacka_ts = "znacka_ts", zp_vyriz = "zp_vyriz", stav_spis = "stav_spis", odeslano_listu = "odeslano_listu", ulozeno_listu = "ulozeno_listu", sv_priloh = "sv_priloh", velikost_el = "velikost_el", ixs_tss = "ixs_tss", ixp_nad = "ixp_nad", ixp_top_slozka = "ixp_top_slozka", preruseno_dat_do = "preruseno_dat_do", preruseno_duvod = "preruseno_duvod", DatumOdeslaniVyrizujiciPisemnosti = "DatumOdeslaniVyrizujiciPisemnosti", DatumPodaniIniciacnihoDokumentu = "DatumPodaniIniciacnihoDokumentu", PocetJinoagendovychDokumentuVSpisu = "PocetJinoagendovychDokumentuVSpisu", PripominkoveRizeniZpacovane = "PripominkoveRizeniZpacovane", IxpDil = "IxpDil", Permissions = "Permissions", Spis = "Spis", SpisovyUzelPod = "SpisovyUzelPod", SpisPrirazeny = "SpisPrirazeny", IdentifikatorOriginalu = "IdentifikatorOriginalu", IxpPoslednihoSpisu = "IxpPoslednihoSpisu", VMinulostiVeSpisu = "VMinulostiVeSpisu", ObrazekNaDetailu = "ObrazekNaDetailu", Kopie = "Kopie", obsah_text = "obsah_text", obsah_text_2 = "obsah_text_2", obsah_text_3 = "obsah_text_3", obsah_text_4 = "obsah_text_4", poznamka = "poznamka", poc_kopii = "poc_kopii", dat_prij_pod = "dat_prij_pod", ixs_su_pod = "ixs_su_pod", dat_evid = "dat_evid", cj_spis = "cj_spis", odeslano_kam = "odeslano_kam", s_resitel = "s_resitel", ixs_fun_resitel = "ixs_fun_resitel", s_vyriz = "s_vyriz", typ_vyriz = "typ_vyriz", vyriz_komu = "vyriz_komu", vyriz_pozn = "vyriz_pozn", ixs_zmp_vyriz = "ixs_zmp_vyriz", ixs_fun_schval = "ixs_fun_schval", ixs_zmp_schval = "ixs_zmp_schval", s_uzav = "s_uzav", dat_uzav = "dat_uzav", ixs_zmp_uzav = "ixs_zmp_uzav", s_stor = "s_stor", s_ztrat = "s_ztrat", stav_pis_ext = "stav_pis_ext", vztah_spis = "vztah_spis", pr_moc = "pr_moc", dat_pr_moc = "dat_pr_moc", s_agp = "s_agp", s_zastav = "s_zastav", dat_vykonav = "dat_vykonav", ObsahTextProSeznam = "ObsahTextProSeznam", SSchvalSsl = "SSchvalSsl", Balik = "Balik", PorCisloVSpisu = "PorCisloVSpisu", Resitel = "Resitel", ZmenuProvedlVyriz = "ZmenuProvedlVyriz", Schvalovatel = "Schvalovatel", Schvalil = "Schvalil", Uzavrel = "Uzavrel", typ_ag_txt = "typ_ag_txt", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", st_utaj_id_orig = "st_utaj_id_orig", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", ixp_spis_prir = "ixp_spis_prir", ixs_skr = "ixs_skr", ixs_obd = "ixs_obd", por_cislo_obd = "por_cislo_obd", dat_prenosu = "dat_prenosu", dat_znepristupneni = "dat_znepristupneni", rok_kon_spu = "rok_kon_spu", StavSul = "StavSul", PrizSkn = "PrizSkn", PrizVyp = "PrizVyp", IdExtArch = "IdExtArch", IdSkartrizNda = "IdSkartrizNda", PrizVBaliku = "PrizVBaliku", ixs_zup = "ixs_zup", ZupStavSul = "ZupStavSul", PrilohaHlavni = "PrilohaHlavni", Prilohy = "Prilohy", PrilohyElektronicke = "PrilohyElektronicke", EpkDokument = "EpkDokument", SkartacniZnak = "SkartacniZnak", VecnaSkupina = "VecnaSkupina", UzivatelskaPoznamka = "UzivatelskaPoznamka", Rak = "Rak", PopisSpoUda = "PopisSpoUda", DuvodPozSkar = "DuvodPozSkar", PrizPozSkar = "PrizPozSkar", RokDoPozSkar = "RokDoPozSkar", StavPisSpis = "StavPisSpis", dat_mpd0 = "dat_mpd0", ixs_lpc = "ixs_lpc", uziv_sl_a = "uziv_sl_a", uziv_sl_a2 = "uziv_sl_a2", uziv_sl_a3 = "uziv_sl_a3", uziv_sl_b = "uziv_sl_b", uziv_sl_b2 = "uziv_sl_b2", uziv_sl_b3 = "uziv_sl_b3", uziv_sl_c = "uziv_sl_c", uziv_sl_c2 = "uziv_sl_c2", uziv_sl_d = "uziv_sl_d", uziv_sl_d2 = "uziv_sl_d2", uziv_sl_j = "uziv_sl_j", uziv_sl_j2 = "uziv_sl_j2", uziv_sl_k = "uziv_sl_k", uziv_sl_k2 = "uziv_sl_k2", uziv_sl_n = "uziv_sl_n", HistorieZmen = "HistorieZmen", AktualniRedistribuce = "AktualniRedistribuce", HistorieRedistribuce = "HistorieRedistribuce", HistoriePoznamek = "HistoriePoznamek", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", termin_ico = "termin_ico", dat_dtermin = "dat_dtermin", doplnujici_informace_ico = "doplnujici_informace_ico", priz_kop = "priz_kop", priz_kopie = "priz_kopie", stav_epk0 = "stav_epk0", stav_epk_txt = "stav_epk_txt", typ_pozad_pod_txt = "typ_pozad_pod_txt", epk_po_pozad_vyr = "epk_po_pozad_vyr", dat_vyriz_do = "dat_vyriz_do", dat_vyriz_do_wflsdcj = "dat_vyriz_do_wflsdcj", dat_vyriz_do_sslsdcj = "dat_vyriz_do_sslsdcj", TerminVyrizeni = "TerminVyrizeni", ZpVyrizTxtDleIxsCj = "ZpVyrizTxtDleIxsCj", Vlastnictvi = "Vlastnictvi", vlastnik = "vlastnik", CoJsemZac = "CoJsemZac", VlastnikFunkce = "VlastnikFunkce", VlastnikSpisovyUzel = "VlastnikSpisovyUzel", Sslstyp = "Sslstyp", ZmenuProvedl = "ZmenuProvedl", SpisovyPlan = "SpisovyPlan", SpisovyZnak = "SpisovyZnak", VlastnikAgendovyFunkce = "VlastnikAgendovyFunkce", VlastnikAgendovySpisovyUzel = "VlastnikAgendovySpisovyUzel", CisloJednaci = "CisloJednaci", UmisteniData = "UmisteniData", Nazev__sslstyp = "Nazev__sslstyp", Predano__uzlu = "Predano__uzlu", Predano__osobe = "Predano__osobe", Predano__od__osoby = "Predano__od__osoby", TypSpousteciUdalosti = "TypSpousteciUdalosti", PrizKonfliktSka = "PrizKonfliktSka", StavVytezezniElektronickehoObrazu = "StavVytezezniElektronickehoObrazu", IxpTss = "IxpTss", DotceneSubjekty = "DotceneSubjekty", KlicovaSlova = "KlicovaSlova", Formulare = "Formulare", Doruceni = "Doruceni", Redistribuce = "Redistribuce", Souvisejici = "Souvisejici", s_orig = "s_orig", priz_dupli = "priz_dupli", TypAgendy = "TypAgendy", Vlastnosti = "Vlastnosti", PoznamkaPosledni = "PoznamkaPosledni", ico_status = "ico_status", UlozenoListu = "UlozenoListu", UrovenPristupu = "UrovenPristupu", priz_zob_zast = "priz_zob_zast", ext_akt_znacka = "ext_akt_znacka", CislaJednaciHistoricka = "CislaJednaciHistoricka", Wflszne = "Wflszne", ixp = "ixp", lic = "lic", rok = "rok", status_pis = "status_pis", typ_duv_del = "typ_duv_del", dat_del = "dat_del",}
	const enum GSpisDtoFragments { sslden = "SSLSDCJ", rok_sslsdcj = "SSLSDCJ", por_cislo = "SSLSDCJ", cj_sslsdcj = "SSLSDCJ", cj_ext = "SSLSDCJ", ixp_spis_sslsdcj = "SSLSDCJ", ixp_init = "SSLSDCJ", ixp_vyriz = "SSLSDCJ", nazev_sslsdcj = "SSLSDCJ", ixs_su = "SSLSDCJ", zkratka_su = "SSLSDCJ", pocet_pis = "SSLSDCJ", dat_zmena_sslsdcj = "SSLSDCJ", zmenu_prov_sslsdcj = "SSLSDCJ", pocet_vlozenych_dok = "SSLSDCJ", dat_zal = "SSLSDCJ", s_uzav_sslsdcj = "SSLSDCJ", dat_uzav_sslsdcj = "SSLSDCJ", ixs_zmp_zal = "SSLSDCJ", znacka_odes = "SSLSDCJ", s_zastav_sslsdcj = "SSLSDCJ", ixp_prior = "SSLSDCJ", pr_moc_sslsdcj = "SSLSDCJ", dat_pr_moc_sslsdcj = "SSLSDCJ", s_prior = "SSLSDCJ", kl_slova = "SSLSDCJ", s_po_term = "SSLSDCJ", cj_souv_txt = "SSLSDCJ", zp_vyriz_txt = "SSLSDCJ", priz_zsch = "SSLSDCJ", priz_akt = "SSLSDCJ", osc = "SSLSDCJ", prav_kval = "SSLSDCJ", zakon_c = "SSLSDCJ", znacka_ts = "SSLSDCJ", zp_vyriz = "SSLSDCJ", stav_spis = "SSLSDCJ", odeslano_listu = "SSLSDCJ", ulozeno_listu = "SSLSDCJ", sv_priloh = "SSLSDCJ", velikost_el = "SSLSDCJ", ixs_tss = "SSLSDCJ", ixp_nad = "SSLSDCJ", ixp_top_slozka = "SSLSDCJ", preruseno_dat_do = "PRERUSENO_DAT_DO", preruseno_duvod = "PRERUSENO_DUVOD", DatumOdeslaniVyrizujiciPisemnosti = "DATUM_ODESLANI_VYRIZUJICI_PISEMNOSTI", DatumPodaniIniciacnihoDokumentu = "DATUM_PODANI_INICIACNIHO_DOKUMENTU", PocetJinoagendovychDokumentuVSpisu = "POCET_JINOAGENDOVYCH_DOKUMENTU_VE_SPISU", PripominkoveRizeniZpacovane = "*", IxpDil = "DIL", Permissions = "PERMISSIONS_FIELDS", Spis = "SPIS", SpisovyUzelPod = "SPISOVY_UZEL_PODAL", SpisPrirazeny = "SPIS_PRIRAZENY", IdentifikatorOriginalu = "IDENTIFIKATOR_ORIGINALU", IxpPoslednihoSpisu = "IXP_POSLEDNIHO_SPISU", VMinulostiVeSpisu = "V_MINULOSTI_VE_SPISU", ObrazekNaDetailu = "OBRAZEK_NA_DETAILU", Kopie = "KOPIE", obsah_text = "SSLSPID", obsah_text_2 = "SSLSPID", obsah_text_3 = "SSLSPID", obsah_text_4 = "SSLSPID", poznamka = "SSLSPID", poc_kopii = "SSLSPID", dat_prij_pod = "SSLSPID", ixs_su_pod = "SSLSPID", dat_evid = "SSLSPID", cj_spis = "SSLSPID", odeslano_kam = "SSLSPID", s_resitel = "SSLSPID", ixs_fun_resitel = "SSLSPID", s_vyriz = "SSLSPID", typ_vyriz = "SSLSPID", vyriz_komu = "SSLSPID", vyriz_pozn = "SSLSPID", ixs_zmp_vyriz = "SSLSPID", ixs_fun_schval = "SSLSPID", ixs_zmp_schval = "SSLSPID", s_uzav = "SSLSPID", dat_uzav = "SSLSPID", ixs_zmp_uzav = "SSLSPID", s_stor = "SSLSPID", s_ztrat = "SSLSPID", stav_pis_ext = "SSLSPID", vztah_spis = "SSLSPID", pr_moc = "SSLSPID", dat_pr_moc = "SSLSPID", s_agp = "SSLSPID", s_zastav = "SSLSPID", dat_vykonav = "SSLSPID", ObsahTextProSeznam = "SSLSPID", SSchvalSsl = "SSLSPID", Balik = "BALIK", PorCisloVSpisu = "SPIS_PORADI", Resitel = "RESITEL", ZmenuProvedlVyriz = "ZMENU_PROVEDL_VYRIZ", Schvalovatel = "SCHVALOVATEL", Schvalil = "ZMENU_PROVEDL_SCHVALIL", Uzavrel = "ZMENU_PROVEDL_UZAVREL", typ_ag_txt = "WFLSIXP", ixp_spis = "WFLSPID", priz_spis = "WFLSPID", ixs_fun_akt = "WFLSPID", ixs_su_akt = "WFLSPID", nazev = "WFLSPID", akt_znacka = "WFLSPID", stav_dist = "WFLSPID", stav_pis = "WFLSPID", typ_ag = "WFLSPID", ktg_typ = "WFLSPID", ixs_typ = "WFLSPID", s_prij = "WFLSPID", s_ssl = "WFLSPID", dat_zmena = "WFLSPID", zmenu_prov = "WFLSPID", s_ele = "WFLSPID", s_fyz = "WFLSPID", misto_vzniku = "WFLSPID", s_sgn = "WFLSPID", dat_pod = "WFLSPID", cs_akt_znacka = "WFLSPID", priz_view_ssl = "WFLSPID", uzo = "WFLSPID", spis_pl = "WFLSPID", spis_znak = "WFLSPID", ixs_fun_wfl = "WFLSPID", s_uloz = "WFLSPID", dat_uloz = "WFLSPID", ixs_su_wfl = "WFLSPID", s_odes = "WFLSPID", priz_cj = "WFLSPID", dat_vyriz = "WFLSPID", ixs_cj = "WFLSPID", puvod = "WFLSPID", s_schval = "WFLSPID", umisteni = "WFLSPID", st_utaj_id = "WFLSPID", st_utaj_id_orig = "WFLSPID", skar_znak = "WFLSPID", skar_lhuta = "WFLSPID", rok_spo_uda = "WFLSPID", ixs_vsk = "WFLSPID", ixp_top = "WFLSPID", ixp_soucast = "WFLSPID", typ_spis = "WFLSPID", barcode = "WFLSPID", skar_lhuta_spra = "WFLSPID", ixs_ext = "WFLSPID", rok_skartace = "WFLSPID", ixs_spu = "WFLSPID", poc_listu = "WFLSPID", poc_stran = "WFLSPID", poc_kop = "WFLSPID", poc_priloh = "WFLSPID", poc_l_priloh = "WFLSPID", cj = "WFLSPID", ico = "WFLSPID", ixp_spis_prir = "WFLSPID", ixs_skr = "ZNEPRISTUPNENI", ixs_obd = "ZNEPRISTUPNENI", por_cislo_obd = "ZNEPRISTUPNENI", dat_prenosu = "ZNEPRISTUPNENI", dat_znepristupneni = "ZNEPRISTUPNENI", rok_kon_spu = "ZNEPRISTUPNENI", StavSul = "SPISOVNA", PrizSkn = "SPISOVNA", PrizVyp = "SPISOVNA", IdExtArch = "SPISOVNA", IdSkartrizNda = "SPISOVNA", PrizVBaliku = "SPISOVNA_V_BALIKU", ixs_zup = "SPISOVNA", ZupStavSul = "SPISOVNA", PrilohaHlavni = "PRILOHA_HLAVNI", Prilohy = "PRILOHY", PrilohyElektronicke = "PRILOHY_ELEKTRONICKE", EpkDokument = "EPK", SkartacniZnak = "SKARTACNI_ZNAK", VecnaSkupina = "VECNA_SKUPINA", UzivatelskaPoznamka = "UZIVATELSKA_POZNAMKA", Rak = "RAK", PopisSpoUda = "SPOUSTECI_UDALOST", DuvodPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", PrizPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", RokDoPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", StavPisSpis = "SPIS_STAV", dat_mpd0 = "SERVISNI", ixs_lpc = "SERVISNI", uziv_sl_a = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_a2 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_a3 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b2 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b3 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_c = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_c2 = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_d = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_d2 = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_j = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_j2 = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_k = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_k2 = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_n = "UZIVATELSKE_SLOUPCE_DETAIL", HistorieZmen = "HISTORIE_ZMEN", AktualniRedistribuce = "AKTUALNI_REDISTRIBUCE", HistorieRedistribuce = "HISTORIE_REDISTRIBUCE", HistoriePoznamek = "HISTORIE_POZNAMEK", typ_entity_ico = "TYP_ENTITY_ICON", vlastnictvi_doruceni_ico = "NOT-USED", technicke_vlastnosti_ico = "TECHNICKE_VLASTNOSTI_ICON", pozice_spis_ico = "POZICE_SPIS_ICON", stav_zpracovani_ico = "STAV_ZPRACOVANI_ICON", vlastnictvi_redistribuce_ico = "NOT-USED", termin_ico = "TERMIN_ICON", dat_dtermin = "DILCI_TERMIN", doplnujici_informace_ico = "DOPLNUJICI_INFORMACE_ICON", priz_kop = "PRIZNAK_KOPIE", priz_kopie = "PRIZNAK_KOPIE", stav_epk0 = "EPK_TXT", stav_epk_txt = "EPK_TXT", typ_pozad_pod_txt = "EPK_TXT", epk_po_pozad_vyr = "EPK_AVIZACE", dat_vyriz_do = "DATUM_VYRIZENI", dat_vyriz_do_wflsdcj = "DATUM_VYRIZENI", dat_vyriz_do_sslsdcj = "DATUM_VYRIZENI", TerminVyrizeni = "DATUM_VYRIZENI", ZpVyrizTxtDleIxsCj = "ZPUSOB_VYRIZENI", Vlastnictvi = "VLASTNICTVI", vlastnik = "VLASTNICTVI", CoJsemZac = "CO_JSEM_ZAC", VlastnikFunkce = "VLASTNIK_FUNKCE", VlastnikSpisovyUzel = "VLASTNIK_SPISOVY_UZEL", Sslstyp = "TYP_PISEMNOSTI", ZmenuProvedl = "ZMENU_PROVEDL", SpisovyPlan = "SPISOVY_PLAN", SpisovyZnak = "SPISOVY_ZNAK", VlastnikAgendovyFunkce = "VLASTNIK_AGENDOVY_FUNKCE", VlastnikAgendovySpisovyUzel = "VLASTNIK_AGENDOVY_SPISOVY_UZEL", CisloJednaci = "CISLO_JEDNACI", UmisteniData = "UMISTENI", Nazev__sslstyp = "WFLSPID", Predano__uzlu = "WFLSPID", Predano__osobe = "WFLSPID", Predano__od__osoby = "WFLSPID", TypSpousteciUdalosti = "TYP_SPOUSTECI_UDALOSTI", PrizKonfliktSka = "PRIZ_KONFLIKT_SKA", StavVytezezniElektronickehoObrazu = "STAV_VYTEZENI_ELEKTRONICKEHO_OBRAZU", IxpTss = "IXP_TSS", DotceneSubjekty = "DOTCENE_SUBJEKTY", KlicovaSlova = "KLICOVA_SLOVA", Formulare = "FORMULARE", Doruceni = "DORUCENI", Redistribuce = "REDISTRIBUCE", Souvisejici = "SOUVISEJICI", s_orig = "NOT-USED", priz_dupli = "PRIZ_DUPLI", TypAgendy = "TYP_AGENDY", Vlastnosti = "VLASTNOSTI", PoznamkaPosledni = "POZNAMKA_POSLEDNI", ico_status = "ICO_STATUS", UlozenoListu = "ULOZENO_LISTU", UrovenPristupu = "UROVEN_PRISTUPU", priz_zob_zast = "WFLSPID", ext_akt_znacka = "WFLSPID", CislaJednaciHistoricka = "CISLO_JEDNACI_HISTORICKA", Wflszne = "WFLSZNE", ixp = "*", lic = "WFLSIXP", rok = "WFLSIXP", status_pis = "WFLSIXP", typ_duv_del = "WFLSIXP", dat_del = "WFLSIXP",}
	const enum GSpisDtoTypes { sslden = "string", rok_sslsdcj = "number", por_cislo = "number", cj_sslsdcj = "string", cj_ext = "string", ixp_spis_sslsdcj = "string", ixp_init = "string", ixp_vyriz = "string", nazev_sslsdcj = "string", ixs_su = "string", zkratka_su = "string", pocet_pis = "number", dat_zmena_sslsdcj = "JsonDate", zmenu_prov_sslsdcj = "string", pocet_vlozenych_dok = "number", dat_zal = "JsonDate", s_uzav_sslsdcj = "number", dat_uzav_sslsdcj = "JsonDate", ixs_zmp_zal = "string", znacka_odes = "string", s_zastav_sslsdcj = "number", ixp_prior = "string", pr_moc_sslsdcj = "number", dat_pr_moc_sslsdcj = "JsonDate", s_prior = "number", kl_slova = "string", s_po_term = "number", cj_souv_txt = "string", zp_vyriz_txt = "string", priz_zsch = "number", priz_akt = "number", osc = "string", prav_kval = "string", zakon_c = "string", znacka_ts = "string", zp_vyriz = "string", stav_spis = "number", odeslano_listu = "number", ulozeno_listu = "number", sv_priloh = "string", velikost_el = "JsonDecimal", ixs_tss = "string", ixp_nad = "string", ixp_top_slozka = "string", preruseno_dat_do = "JsonDate", preruseno_duvod = "string", DatumOdeslaniVyrizujiciPisemnosti = "JsonDate", DatumPodaniIniciacnihoDokumentu = "JsonDate", PocetJinoagendovychDokumentuVSpisu = "number", PripominkoveRizeniZpacovane = "Gordic.Ssl.Interface.GSslseklDto[]", IxpDil = "string", Permissions = "Gordic.Ssl.Interface.GSpisPermissionsDto", Spis = "Gordic.Ssl.Interface.GSpisDto", SpisovyUzelPod = "Gordic.Gin.Interface.GGinspodDto", SpisPrirazeny = "Gordic.Ssl.Interface.GSpisDto", IdentifikatorOriginalu = "string", IxpPoslednihoSpisu = "string", VMinulostiVeSpisu = "boolean", ObrazekNaDetailu = "Gordic.Ssl.Interface.DokumentObrazekNaDetailu", Kopie = "Gordic.Ssl.Interface.SeznamKopiiDokumentuDto[]", obsah_text = "string", obsah_text_2 = "string", obsah_text_3 = "string", obsah_text_4 = "string", poznamka = "string", poc_kopii = "number", dat_prij_pod = "JsonDate", ixs_su_pod = "string", dat_evid = "JsonDate", cj_spis = "string", odeslano_kam = "string", s_resitel = "number", ixs_fun_resitel = "string", s_vyriz = "number", typ_vyriz = "Gordic.Ginis.DbModel.GSslctvyEnum", vyriz_komu = "string", vyriz_pozn = "string", ixs_zmp_vyriz = "string", ixs_fun_schval = "string", ixs_zmp_schval = "string", s_uzav = "number", dat_uzav = "JsonDate", ixs_zmp_uzav = "string", s_stor = "number", s_ztrat = "number", stav_pis_ext = "number", vztah_spis = "Gordic.Ginis.DbModel.GSslcvspEnum", pr_moc = "number", dat_pr_moc = "JsonDate", s_agp = "number", s_zastav = "number", dat_vykonav = "JsonDate", ObsahTextProSeznam = "string", SSchvalSsl = "number", Balik = "Gordic.Spi.Interface.GBalikDto", PorCisloVSpisu = "number", Resitel = "Gordic.Gin.Interface.GFunkcniMistoDto", ZmenuProvedlVyriz = "Gordic.Gin.Interface.GGinszmpDto", Schvalovatel = "Gordic.Gin.Interface.GFunkcniMistoDto", Schvalil = "Gordic.Gin.Interface.GGinszmpDto", Uzavrel = "Gordic.Gin.Interface.GGinszmpDto", typ_ag_txt = "string", ixp_spis = "string", priz_spis = "Gordic.Ginis.DbModel.GWflcpriEnum", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "Gordic.Ginis.DbModel.GWflcstaEnum", stav_pis = "Gordic.Ginis.DbModel.GWflcstpEnum", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "Gordic.Ginis.DbModel.GWflcsprEnum", s_ssl = "Gordic.Ginis.DbModel.GWflcsslEnum", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "Gordic.Ginis.DbModel.GWflceleEnum", s_fyz = "Gordic.Ginis.DbModel.GWflcfyzEnum", misto_vzniku = "string", s_sgn = "Gordic.Ginis.DbModel.GWflcsgnEnum", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", priz_cj = "Gordic.Ginis.DbModel.GWflcpcjEnum", dat_vyriz = "JsonDate", ixs_cj = "string", puvod = "Gordic.Ginis.DbModel.GWflcpuvEnum", s_schval = "number", umisteni = "string", st_utaj_id = "number", st_utaj_id_orig = "Gordic.Ginis.DbModel.GGincstuEnum", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", typ_spis = "Gordic.Ginis.DbModel.GWflctysEnum", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string", ixp_spis_prir = "string", ixs_skr = "string", ixs_obd = "string", por_cislo_obd = "number", dat_prenosu = "JsonDate", dat_znepristupneni = "JsonDate", rok_kon_spu = "number", StavSul = "number", PrizSkn = "number", PrizVyp = "number", IdExtArch = "string", IdSkartrizNda = "string", PrizVBaliku = "number", ixs_zup = "string", ZupStavSul = "number", PrilohaHlavni = "Gordic.Wfl.Interface.GEmptyDto", Prilohy = "Gordic.Wfl.Interface.GPrilohaDto[]", PrilohyElektronicke = "Gordic.Wfl.Interface.GPrilohaElektronickaDto[]", EpkDokument = "Gordic.Wfl.Interface.GDokumentWflEpkPriznakyDto", SkartacniZnak = "Gordic.Wfl.Interface.GSkartacniZnakDto", VecnaSkupina = "Gordic.Gin.Interface.GVecnaSkupinaDto", UzivatelskaPoznamka = "Gordic.Wfl.Interface.GUzivatelskaPoznamkaDto", Rak = "JsonDecimal", PopisSpoUda = "string", DuvodPozSkar = "string", PrizPozSkar = "number", RokDoPozSkar = "number", StavPisSpis = "number", dat_mpd0 = "JsonDate", ixs_lpc = "string", uziv_sl_a = "string", uziv_sl_a2 = "string", uziv_sl_a3 = "string", uziv_sl_b = "string", uziv_sl_b2 = "string", uziv_sl_b3 = "string", uziv_sl_c = "string", uziv_sl_c2 = "string", uziv_sl_d = "string", uziv_sl_d2 = "string", uziv_sl_j = "string", uziv_sl_j2 = "string", uziv_sl_k = "string", uziv_sl_k2 = "string", uziv_sl_n = "string", HistorieZmen = "Gordic.Wfl.Interface.GWflhpisDto[]", AktualniRedistribuce = "Gordic.Wfl.Interface.GWflstopDto[]", HistorieRedistribuce = "Gordic.Wfl.Interface.GWflhupiDto", HistoriePoznamek = "Gordic.Wfl.Interface.GWfldpozIslDto[]", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", dat_dtermin = "JsonDate", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", priz_kop = "number", priz_kopie = "string", stav_epk0 = "number", stav_epk_txt = "string", typ_pozad_pod_txt = "string", epk_po_pozad_vyr = "string", dat_vyriz_do = "JsonDate", dat_vyriz_do_wflsdcj = "JsonDate", dat_vyriz_do_sslsdcj = "JsonDate", TerminVyrizeni = "JsonDate", ZpVyrizTxtDleIxsCj = "string", Vlastnictvi = "string", vlastnik = "string", CoJsemZac = "Gordic.Wfl.Interface.GIdentifikatorCoJsemZac", VlastnikFunkce = "Gordic.Gin.Interface.GFunkcniMistoDto", VlastnikSpisovyUzel = "Gordic.Gin.Interface.GGinspodDto", Sslstyp = "Gordic.Gin.Interface.GTypDokumentuDto", ZmenuProvedl = "Gordic.Gin.Interface.GGinszmpDto", SpisovyPlan = "Gordic.Wfl.Interface.GSpisovyPlanDto", SpisovyZnak = "Gordic.Wfl.Interface.GSpisovyZnakDto", VlastnikAgendovyFunkce = "Gordic.Gin.Interface.GFunkcniMistoDto", VlastnikAgendovySpisovyUzel = "Gordic.Gin.Interface.GGinspodDto", CisloJednaci = "Gordic.Wfl.Interface.GCisloJednaciDto", UmisteniData = "Gordic.Wfl.Interface.GUmisteniDto", Nazev__sslstyp = "string", Predano__uzlu = "string", Predano__osobe = "string", Predano__od__osoby = "string", TypSpousteciUdalosti = "Gordic.Gin.Interface.GTypSpousteciUdalostiDto", PrizKonfliktSka = "number", StavVytezezniElektronickehoObrazu = "Gordic.Ginis.DbModel.GGincsvyEnum", IxpTss = "string", DotceneSubjekty = "Gordic.Wfl.Interface.GDotcenySubjektDto[]", KlicovaSlova = "Gordic.Wfl.Interface.GKeyWordDto[]", Formulare = "Gordic.Gin.Interface.GFormularDto[]", Doruceni = "Gordic.Wfl.Interface.GProfilDoruceniDto", Redistribuce = "Gordic.Wfl.Interface.GWflstopDto", Souvisejici = "Gordic.Wfl.Interface.GSeznamSouvisejicichDokumentuDto[]", s_orig = "number", priz_dupli = "number", TypAgendy = "Gordic.Gin.Interface.GTypAgendyDto", Vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", PoznamkaPosledni = "string", ico_status = "number", UlozenoListu = "Gordic.Wfl.Interface.GWfldulpDto", UrovenPristupu = "Gordic.Gin.Interface.GUrovenPristupuDto", priz_zob_zast = "number", ext_akt_znacka = "string", CislaJednaciHistoricka = "string[]", Wflszne = "Gordic.Wfl.Interface.GWflszneDto", ixp = "string", lic = "string", rok = "number", status_pis = "Gordic.Ginis.DbModel.GWflcumpEnum", typ_duv_del = "Gordic.Ginis.DbModel.GWflctddEnum", dat_del = "JsonDate",}
	const enum GSpisDtoTypeLengths { sslden = 7, cj_sslsdcj = 50, cj_ext = 10, nazev_sslsdcj = 100, zkratka_su = 16, znacka_odes = 50, kl_slova = 254, cj_souv_txt = 50, osc = 100, prav_kval = 100, zakon_c = 20, znacka_ts = 50, zp_vyriz = 15, sv_priloh = 10, obsah_text = 254, obsah_text_2 = 254, obsah_text_3 = 254, obsah_text_4 = 254, poznamka = 254, cj_spis = 50, odeslano_kam = 100, vyriz_komu = 100, vyriz_pozn = 254, nazev = 100, akt_znacka = 50, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, umisteni = 20, skar_znak = 2, ixs_vsk = 12, barcode = 50, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, PopisSpoUda = 254, DuvodPozSkar = 254, uziv_sl_a = 254, uziv_sl_a2 = 254, uziv_sl_a3 = 254, uziv_sl_b = 254, uziv_sl_b2 = 254, uziv_sl_b3 = 254, uziv_sl_c = 254, uziv_sl_c2 = 254, uziv_sl_d = 254, uziv_sl_d2 = 254, uziv_sl_j = 254, uziv_sl_j2 = 254, uziv_sl_k = 254, uziv_sl_k2 = 254, uziv_sl_n = 254, vlastnik = 200, lic = 4,}
	/**Oprávnění spisu.*/
	interface GSpisPermissionsDto extends Gordic.Ssl.Interface.GSslspidPermissionsDto {
		/**Příznak povolení tlačítka vyřídit - p_vyri*/
		LzeVyridit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení tlačítka vyřídit - p_vyri*/
		LzeVyriditSpis: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Předání do externí agendy*/
		LzeExportovatSpis: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - zrušit vyřízení*/
		LzeVytvoritSpisBezIniciacniPisemnosti: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - zrušit vyřízení - p_odvyridit*/
		LzeZrusitVyrizeni: Gordic.General.ApplicationInterface.GPermission;
		/**Vrátí informaci, zda lze odvyřídit spis - p_oduzavreni*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze spis priorovat - p_prio*/
		LzePriorovat: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze zrušit prioraci spisu - p_odprio*/
		LzeZrusitPrioraci: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení tlačítka uzavřít - p_uzav*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení tlačítka uzavřít - p_uzav*/
		LzeVyriditNeboUzavritSpis: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze spis vyřídit a uzavřít naráz - zda lze provést obě akce naráz na dialogu vyřízení/uzavření spisu (např. pokud už je spis vyřízen, pak se vrací false) - NEPOUŽÍVAT na řízení volby v menu na spisu - tu je potřeba řídit dle LzeVyriditNeboUzavritSpis*/
		LzeVyriditAUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vložení nějaké písemnosti do tohoto spisu - p_vlozpis*/
		LzeVlozitDoSpisu: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vložení nějaké písemnosti do tohoto spisu - p_vlozpis*/
		LzeVlozitDoTypovehoSpisu: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vložení nějaké písemnosti do tohoto spisu - p_vlozpis*/
		LzeVyjmoutZTypovehoSpisu: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lzev součásti odstranit poslední díl*/
		LzeOdstranitPosledniDil: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vložení nějaké entity do součásti (nově spis do součásti/dílu a součást do součásti)*/
		LzeVlozitDoSoucasti: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vyjmutí dílu ze součásti*/
		LzeVyjmoutZeSoucasti: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vyjmutí spisu ze součásti*/
		LzeSpisVyjmoutZeSoucasti: Gordic.General.ApplicationInterface.GPermission;
		/**Zda je povolené editovat typ spisu*/
		LzeEditovatTypSpisu: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení editace způsobu vyřízení u uzavřených/vyřízených*/
		LzeEditovatZpVyriz: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení editace uloženo listů vyřízení u uzavřených/vyřízených*/
		LzeEditovatUlozenoListu: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GSpisPermissionsDtoNames { LzeVyridit = "LzeVyridit", LzeVyriditSpis = "LzeVyriditSpis", LzeExportovatSpis = "LzeExportovatSpis", LzeVytvoritSpisBezIniciacniPisemnosti = "LzeVytvoritSpisBezIniciacniPisemnosti", LzeZrusitVyrizeni = "LzeZrusitVyrizeni", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzePriorovat = "LzePriorovat", LzeZrusitPrioraci = "LzeZrusitPrioraci", LzeUzavrit = "LzeUzavrit", LzeVyriditNeboUzavritSpis = "LzeVyriditNeboUzavritSpis", LzeVyriditAUzavrit = "LzeVyriditAUzavrit", LzeVlozitDoSpisu = "LzeVlozitDoSpisu", LzeVlozitDoTypovehoSpisu = "LzeVlozitDoTypovehoSpisu", LzeVyjmoutZTypovehoSpisu = "LzeVyjmoutZTypovehoSpisu", LzeOdstranitPosledniDil = "LzeOdstranitPosledniDil", LzeVlozitDoSoucasti = "LzeVlozitDoSoucasti", LzeVyjmoutZeSoucasti = "LzeVyjmoutZeSoucasti", LzeSpisVyjmoutZeSoucasti = "LzeSpisVyjmoutZeSoucasti", LzeEditovatTypSpisu = "LzeEditovatTypSpisu", LzeEditovatZpVyriz = "LzeEditovatZpVyriz", LzeEditovatUlozenoListu = "LzeEditovatUlozenoListu", LzeElObrazVytezitPDF = "LzeElObrazVytezitPDF", LzeElObrazVytezitPDFFormular = "LzeElObrazVytezitPDFFormular", LzeElObrazVytezitMetadata = "LzeElObrazVytezitMetadata", LzeZobrazitDetailUlozeni = "LzeZobrazitDetailUlozeni", LzeZmenitUlozeni = "LzeZmenitUlozeni", LzeZmenitFormu = "LzeZmenitFormu", LzeKlicovaSlova = "LzeKlicovaSlova", LzePisemnostVlozit = "LzePisemnostVlozit", LzePisemnostVyjmout = "LzePisemnostVyjmout", LzeVytvoritSpis = "LzeVytvoritSpis", LzeVytvoritSpisDoSoucasti = "LzeVytvoritSpisDoSoucasti", LzeVytvoritTypovySpis = "LzeVytvoritTypovySpis", LzeZobrazitOdeslani = "LzeZobrazitOdeslani", LzePripravovatOdeslani = "LzePripravovatOdeslani", LzeEditovatOdeslani = "LzeEditovatOdeslani", LzeZtratit = "LzeZtratit", LzeNalezt = "LzeNalezt", LzePrerusit = "LzePrerusit", LzeObnovit = "LzeObnovit", LzeVyrizovat = "LzeVyrizovat", LzeVyriditAdActa = "LzeVyriditAdActa", LzeUzavritSoucast = "LzeUzavritSoucast", LzeVyriditDokumentVeSpisuVeStareMetodice = "LzeVyriditDokumentVeSpisuVeStareMetodice", LzePredatDoEA = "LzePredatDoEA", LzePredatDoEAzEKO = "LzePredatDoEAzEKO", LzePrevzitZEA = "LzePrevzitZEA", LzeInformovatEA = "LzeInformovatEA", LzeZrusitVyrizeniAdActa = "LzeZrusitVyrizeniAdActa", LzeStornovat = "LzeStornovat", LzeZrusitOdeslaniOriginalu = "LzeZrusitOdeslaniOriginalu", LzeNabytPravniMoc = "LzeNabytPravniMoc", LzeVytvoritKopiiPisemnosti = "LzeVytvoritKopiiPisemnosti", LzeVytvoritDuplikat2 = "LzeVytvoritDuplikat2", LzeOdeslatOriginal = "LzeOdeslatOriginal", LzeZmenitStupenUtajeni = "LzeZmenitStupenUtajeni", LzeNastavitPriznakZobrazitelnostiZastupemIRP = "LzeNastavitPriznakZobrazitelnostiZastupemIRP", LzeRozsirProfilWflPisemnostiDoSsl = "LzeRozsirProfilWflPisemnostiDoSsl", LzeEditovatTerminSpisuJenKontrolaParam = "LzeEditovatTerminSpisuJenKontrolaParam", LzeVyriditDokumentSOhledemNaEpk = "LzeVyriditDokumentSOhledemNaEpk", LzeVyriditDokumentSOhledemNaEpkDotaz = "LzeVyriditDokumentSOhledemNaEpkDotaz", LzeEditovat = "LzeEditovat", LzeEditovatSpisovyZnak = "LzeEditovatSpisovyZnak", LzeEditovatKlicovaSlova = "LzeEditovatKlicovaSlova", LzeEditovatJenutnyDotazNaPreuruseniRedistribuce = "LzeEditovatJenutnyDotazNaPreuruseniRedistribuce", LzeVlozitElObraz = "LzeVlozitElObraz", LzeVlozitElObrazEpk = "LzeVlozitElObrazEpk", LzeOznacitJakoElObraz = "LzeOznacitJakoElObraz", LzeZamenitElObraz = "LzeZamenitElObraz", LzeZnovuVlozitElObraz = "LzeZnovuVlozitElObraz", LzeElEditovatPriznakPlatneVerze = "LzeElEditovatPriznakPlatneVerze", LzeElEditovatPriznakArchivace = "LzeElEditovatPriznakArchivace", LzeElCteni = "LzeElCteni", LzeElCteniZasilky = "LzeElCteniZasilky", LzeElCteniElPodani = "LzeElCteniElPodani", LzeElCteniOdeslaneZasilky = "LzeElCteniOdeslaneZasilky", LzeOtevritElObraz = "LzeOtevritElObraz", LzeOtevritElObrazDotaz = "LzeOtevritElObrazDotaz", LzeElObrazSetVisualSignPosition = "LzeElObrazSetVisualSignPosition", LzeOtevritElPrilohy = "LzeOtevritElPrilohy", LzeOtevritElPrilohyDotaz = "LzeOtevritElPrilohyDotaz", LzeElPrilohySetVisualSignPosition = "LzeElPrilohySetVisualSignPosition", LzePridatElPrilohy = "LzePridatElPrilohy", LzePridatElPrilohyNeboNeEl = "LzePridatElPrilohyNeboNeEl", LzeZneaktivnitPrilohu = "LzeZneaktivnitPrilohu", LzeSouvisejiciEditovat = "LzeSouvisejiciEditovat", LzeSouvisejiciEditovatTypVazby = "LzeSouvisejiciEditovatTypVazby", LzeIRPPridatOpravneni = "LzeIRPPridatOpravneni", LzeIRPPridatPravidlo = "LzeIRPPridatPravidlo", LzePridatPrilohy = "LzePridatPrilohy", LzePridatPoznamkuDoHistorie = "LzePridatPoznamkuDoHistorie", LzePridatUzivatelskouPoznamku = "LzePridatUzivatelskouPoznamku", LzeElEditaceBezKontrolyStavuUzavreno = "LzeElEditaceBezKontrolyStavuUzavreno", LzeElEditacePrilohBezKontrolyStavuUzavreno = "LzeElEditacePrilohBezKontrolyStavuUzavreno", LzeElEditace = "LzeElEditace", LzeElPrejmenovat = "LzeElPrejmenovat", LzeEditovatElObraz = "LzeEditovatElObraz", LzeEditovatElPrilohy = "LzeEditovatElPrilohy", LzeEditovatKategoriiElPrilohy = "LzeEditovatKategoriiElPrilohy", LzeOdstranitElPrilohy = "LzeOdstranitElPrilohy", LzeOdstranitRadekElPrilohy = "LzeOdstranitRadekElPrilohy", LzeOdstranitPrilohy = "LzeOdstranitPrilohy", LzeZneaktivnitElPrilohy = "LzeZneaktivnitElPrilohy", LzeZverejnitEl = "LzeZverejnitEl", LzeZverejnitElPresZadostiMenu = "LzeZverejnitElPresZadostiMenu", LzeZverejnitElPresZadosti = "LzeZverejnitElPresZadosti", LzeZverejnitElObraz = "LzeZverejnitElObraz", LzeZverejnitElPrilohu = "LzeZverejnitElPrilohu", LzeZverejnitElNaUrDesku = "LzeZverejnitElNaUrDesku", LzeZverejnitOznacitKeZverejneni = "LzeZverejnitOznacitKeZverejneni", LzeZverejnitElObrazOznacitKeZverejneni = "LzeZverejnitElObrazOznacitKeZverejneni", LzeZverejnitElObrazNaUrDesku = "LzeZverejnitElObrazNaUrDesku", LzeZverejnitElObrazDoDiplomchainu = "LzeZverejnitElObrazDoDiplomchainu", LzeZneaktivnitElObraz = "LzeZneaktivnitElObraz", LzeOdstranitElObraz = "LzeOdstranitElObraz", LzeKartuCist = "LzeKartuCist", LzeZalozitVyrizujiciDok = "LzeZalozitVyrizujiciDok", LzeZrusitPrideleni = "LzeZrusitPrideleni", LzePridelit = "LzePridelit", LzeZamitnoutPrideleniZeSeznamu = "LzeZamitnoutPrideleniZeSeznamu", LzePreevidovatCj = "LzePreevidovatCj", LzeNastavitVyrizujiciDokumentCj = "LzeNastavitVyrizujiciDokumentCj", LzeNastavitJakoVyrizujiciDokumentCj = "LzeNastavitJakoVyrizujiciDokumentCj", LzeVlastnostiPredplnit = "LzeVlastnostiPredplnit", LzeOdeslatNedokladovane = "LzeOdeslatNedokladovane", LzePriraditJakoVyrizujiciDokumentCj = "LzePriraditJakoVyrizujiciDokumentCj", LzeOdebratVyrizujiciDokumentCj = "LzeOdebratVyrizujiciDokumentCj", LzeVyriditCj = "LzeVyriditCj", LzeOdvyriditCj = "LzeOdvyriditCj", LzePridavatAOdebiratFormulare = "LzePridavatAOdebiratFormulare", LzeSchvalit = "LzeSchvalit", LzeSchvalovat = "LzeSchvalovat", LzePridatZadostOPodpis = "LzePridatZadostOPodpis", LzePridatZadostDoEpk = "LzePridatZadostDoEpk", LzePridatZadostDoEpkPouzeVzitNaVedomi = "LzePridatZadostDoEpkPouzeVzitNaVedomi", LzeSchvalovaciProces = "LzeSchvalovaciProces", LzeSchvalovaciProcesNerizeny = "LzeSchvalovaciProcesNerizeny", LzeSchvalovaciProcesRizenyNovy = "LzeSchvalovaciProcesRizenyNovy", LzeSchvalovaciProcesRizeny = "LzeSchvalovaciProcesRizeny", LzeVyriditZadostOPodpis = "LzeVyriditZadostOPodpis", LzeZverejneni = "LzeZverejneni", LzeZverejneniEditovat = "LzeZverejneniEditovat", LzePosoudit = "LzePosoudit", LzeElPodepsatDoPdf = "LzeElPodepsatDoPdf", LzeElPodepsatObraz = "LzeElPodepsatObraz", LzeElPodepsat = "LzeElPodepsat", LzeOveritElPodpis = "LzeOveritElPodpis", LzeElObrazOtevritAUzamknout = "LzeElObrazOtevritAUzamknout", LzeElObrazOdemknout = "LzeElObrazOdemknout", LzeOdSchvalit = "LzeOdSchvalit", LzeDokumentPriraditKeSpisu = "LzeDokumentPriraditKeSpisu", LzeDokumentPriraditKeSpisuZrusit = "LzeDokumentPriraditKeSpisuZrusit", LzeKonvertovatDoPdf = "LzeKonvertovatDoPdf", LzeKonvertovatDoPdfZobrazitDialog = "LzeKonvertovatDoPdfZobrazitDialog", LzeZobrazitIniciacniDokument = "LzeZobrazitIniciacniDokument", LzeZobrazitVyrizujiciDokument = "LzeZobrazitVyrizujiciDokument", LzeZnovupodat = "LzeZnovupodat", LzeZmenitUzo = "LzeZmenitUzo", LzeZmenitDatumVytvoreni = "LzeZmenitDatumVytvoreni", JeAktivniMuzeBytUlozenNeboArchivovan = "JeAktivniMuzeBytUlozenNeboArchivovan", LzeVlozitDoBaliku = "LzeVlozitDoBaliku", LzeVyjmoutZBaliku = "LzeVyjmoutZBaliku", LzeTrasy = "LzeTrasy", LzeOperativneUlozit = "LzeOperativneUlozit", LzeVytvoritNovouKopii = "LzeVytvoritNovouKopii", LzeVytvoritDuplikat = "LzeVytvoritDuplikat", LzeOznacitJakoPreevidovaniZNahradniEvidence = "LzeOznacitJakoPreevidovaniZNahradniEvidence", LzeVytvoritSouvisejiciUkol = "LzeVytvoritSouvisejiciUkol", LzeRakVytvoritZadostZdf = "LzeRakVytvoritZadostZdf", LzeRakVytvoritZadostAkNeAk = "LzeRakVytvoritZadostAkNeAk", LzeRakVytvoritZadostNapojeniNaVstup = "LzeRakVytvoritZadostNapojeniNaVstup", LzeRakKonverze = "LzeRakKonverze", LzePredat = "LzePredat", LzeVratitDoWfl = "LzeVratitDoWfl", LzePrevzit = "LzePrevzit", LzePrevzitZeSeznamu = "LzePrevzitZeSeznamu", LzePrevzitZeSeznamuRedistribuceKPrevzeti = "LzePrevzitZeSeznamuRedistribuceKPrevzeti", LzeTrasuOdstranit = "LzeTrasuOdstranit", LzeTrasuEditovat = "LzeTrasuEditovat", LzeInterniFormularEditovat = "LzeInterniFormularEditovat", LzeInterniFormularUlozitNovouVerzi = "LzeInterniFormularUlozitNovouVerzi", LzeInterniFormularUlozitPdf = "LzeInterniFormularUlozitPdf", LzePridavatVlastnosti = "LzePridavatVlastnosti", LzeEditovatVlastnosti = "LzeEditovatVlastnosti", LzeEditovatDotceneSubjekty = "LzeEditovatDotceneSubjekty", LzeTSpisVlozit = "LzeTSpisVlozit", LzeTSpisVyjmout = "LzeTSpisVyjmout", LzeZobrazitSoucast = "LzeZobrazitSoucast", LzeZobrazitDil = "LzeZobrazitDil", LzeZobrazitTypovySpis = "LzeZobrazitTypovySpis", LzeTSpisVytvorit = "LzeTSpisVytvorit", LzeEvidovatCj = "LzeEvidovatCj", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno", JePovolenaPraceVAgendeBezOmezeniEa = "JePovolenaPraceVAgendeBezOmezeniEa", LzeOdStornovat = "LzeOdStornovat", LzeEditovatPristup2 = "LzeEditovatPristup2", LzeEditovatPristup = "LzeEditovatPristup", LzeEditovatVec = "LzeEditovatVec", LzeEditovatVecPodrobne = "LzeEditovatVecPodrobne", LzeEditovatPoznamku = "LzeEditovatPoznamku", LzeEditovatNovePodaniNeboEditacniRezim = "LzeEditovatNovePodaniNeboEditacniRezim", LzeEditovatPocty = "LzeEditovatPocty", LzeEditovatAktZnacku = "LzeEditovatAktZnacku", LzeEditovatCjExt = "LzeEditovatCjExt", LzeEditovatSpZnExt = "LzeEditovatSpZnExt", LzeEditovatTypDokumentu = "LzeEditovatTypDokumentu", LzeEditovatDatumPodani = "LzeEditovatDatumPodani", LzeEditovatDatumPodaniPriPodani = "LzeEditovatDatumPodaniPriPodani", LzeEditovatSpisPlanAZnak = "LzeEditovatSpisPlanAZnak", LzeEditovatPozastaveniSkartacniOperace = "LzeEditovatPozastaveniSkartacniOperace", LzeEditovatUmisteni = "LzeEditovatUmisteni", LzeEditovatCj = "LzeEditovatCj", LzeEditovatSpousteciUdalostAPopis = "LzeEditovatSpousteciUdalostAPopis", JeShodnyExterniSystemAJePovolenaAktivniPrace = "JeShodnyExterniSystemAJePovolenaAktivniPrace", LzeEditovatDilciTermin = "LzeEditovatDilciTermin", LzeOveritPodpisElObraz = "LzeOveritPodpisElObraz", LzeZobrazitHistoriiOvereniElObraz = "LzeZobrazitHistoriiOvereniElObraz", LzeEditovatSpousteciUdalostNsesss2023 = "LzeEditovatSpousteciUdalostNsesss2023",}
	const enum GSpisPermissionsDtoFragments { LzeVyridit = "PERMISSIONS_ACTIONS", LzeVyriditSpis = "PERMISSIONS_ACTIONS", LzeExportovatSpis = "PERMISSIONS_ACTIONS", LzeVytvoritSpisBezIniciacniPisemnosti = "PERMISSIONS_ACTIONS", LzeZrusitVyrizeni = "PERMISSIONS_ACTIONS", LzeZrusitUzavreni = "PERMISSIONS_ACTIONS", LzePriorovat = "PERMISSIONS_ACTIONS", LzeZrusitPrioraci = "PERMISSIONS_ACTIONS", LzeUzavrit = "PERMISSIONS_ACTIONS", LzeVyriditNeboUzavritSpis = "PERMISSIONS_ACTIONS", LzeVyriditAUzavrit = "PERMISSIONS_ACTIONS", LzeVlozitDoSpisu = "PERMISSIONS_ACTIONS", LzeVlozitDoTypovehoSpisu = "PERMISSIONS_ACTIONS", LzeVyjmoutZTypovehoSpisu = "PERMISSIONS_ACTIONS", LzeOdstranitPosledniDil = "PERMISSIONS_ACTIONS", LzeVlozitDoSoucasti = "PERMISSIONS_ACTIONS", LzeVyjmoutZeSoucasti = "PERMISSIONS_ACTIONS", LzeSpisVyjmoutZeSoucasti = "PERMISSIONS_ACTIONS", LzeEditovatTypSpisu = "PERMISSIONS_FIELDS", LzeEditovatZpVyriz = "PERMISSIONS_FIELDS", LzeEditovatUlozenoListu = "PERMISSIONS_FIELDS", LzeElObrazVytezitPDF = "PERMISSIONS_ACTIONS", LzeElObrazVytezitPDFFormular = "PERMISSIONS_ACTIONS", LzeElObrazVytezitMetadata = "PERMISSIONS_ACTIONS", LzeZobrazitDetailUlozeni = "PERMISSIONS_ACTIONS", LzeZmenitUlozeni = "PERMISSIONS_ACTIONS", LzeZmenitFormu = "PERMISSIONS_ACTIONS_EPK", LzeKlicovaSlova = "PERMISSIONS_ACTIONS", LzePisemnostVlozit = "PERMISSIONS_ACTIONS", LzePisemnostVyjmout = "PERMISSIONS_ACTIONS", LzeVytvoritSpis = "PERMISSIONS_ACTIONS", LzeVytvoritSpisDoSoucasti = "PERMISSIONS_ACTIONS", LzeVytvoritTypovySpis = "PERMISSIONS_ACTIONS", LzeZobrazitOdeslani = "PERMISSIONS_ACTIONS", LzePripravovatOdeslani = "PERMISSIONS_ACTIONS", LzeEditovatOdeslani = "PERMISSIONS_ACTIONS", LzeZtratit = "PERMISSIONS_ACTIONS", LzeNalezt = "PERMISSIONS_ACTIONS", LzePrerusit = "PERMISSIONS_ACTIONS", LzeObnovit = "PERMISSIONS_ACTIONS", LzeVyrizovat = "PERMISSIONS_ACTIONS", LzeVyriditAdActa = "PERMISSIONS_ACTIONS", LzeUzavritSoucast = "PERMISSIONS_ACTIONS", LzeVyriditDokumentVeSpisuVeStareMetodice = "PERMISSIONS_ACTIONS", LzePredatDoEA = "PERMISSIONS_ACTIONS", LzePredatDoEAzEKO = "PERMISSIONS_ACTIONS", LzePrevzitZEA = "PERMISSIONS_ACTIONS", LzeInformovatEA = "PERMISSIONS_ACTIONS", LzeZrusitVyrizeniAdActa = "PERMISSIONS_ACTIONS", LzeStornovat = "PERMISSIONS_ACTIONS", LzeZrusitOdeslaniOriginalu = "PERMISSIONS_ACTIONS", LzeNabytPravniMoc = "PERMISSIONS_ACTIONS", LzeVytvoritKopiiPisemnosti = "PERMISSIONS_ACTIONS", LzeVytvoritDuplikat2 = "PERMISSIONS_ACTIONS", LzeOdeslatOriginal = "PERMISSIONS_ACTIONS", LzeZmenitStupenUtajeni = "PERMISSIONS_ACTIONS_SPISOVNA", LzeNastavitPriznakZobrazitelnostiZastupemIRP = "PERMISSIONS_ACTIONS_SPISOVNA", LzeRozsirProfilWflPisemnostiDoSsl = "PERMISSIONS_ACTIONS", LzeEditovatTerminSpisuJenKontrolaParam = "PERMISSIONS_FIELDS", LzeVyriditDokumentSOhledemNaEpk = "PERMISSIONS_ACTIONS_VYRIDIT_DLE_EPK", LzeVyriditDokumentSOhledemNaEpkDotaz = "PERMISSIONS_ACTIONS_VYRIDIT_DLE_EPK", LzeEditovat = "PERMISSIONS_ACTIONS", LzeEditovatSpisovyZnak = "PERMISSIONS_ACTIONS", LzeEditovatKlicovaSlova = "PERMISSIONS_ACTIONS", LzeEditovatJenutnyDotazNaPreuruseniRedistribuce = "PERMISSIONS_ACTIONS", LzeVlozitElObraz = "PERMISSIONS_ACTIONS", LzeVlozitElObrazEpk = "PERMISSIONS_ACTIONS", LzeOznacitJakoElObraz = "PERMISSIONS_ACTIONS", LzeZamenitElObraz = "PERMISSIONS_ACTIONS", LzeZnovuVlozitElObraz = "PERMISSIONS_ACTIONS", LzeElEditovatPriznakPlatneVerze = "PERMISSIONS_ACTIONS", LzeElEditovatPriznakArchivace = "PERMISSIONS_ACTIONS", LzeElCteni = "PERMISSIONS_ACTIONS", LzeElCteniZasilky = "PERMISSIONS_ACTIONS", LzeElCteniElPodani = "PERMISSIONS_ACTIONS_DORUCENI", LzeElCteniOdeslaneZasilky = "PERMISSIONS_ACTIONS", LzeOtevritElObraz = "PERMISSIONS_ACTIONS", LzeOtevritElObrazDotaz = "PERMISSIONS_ACTIONS", LzeElObrazSetVisualSignPosition = "*", LzeOtevritElPrilohy = "PERMISSIONS_ACTIONS", LzeOtevritElPrilohyDotaz = "PERMISSIONS_ACTIONS", LzeElPrilohySetVisualSignPosition = "PERMISSIONS_ACTIONS", LzePridatElPrilohy = "PERMISSIONS_ACTIONS", LzePridatElPrilohyNeboNeEl = "PERMISSIONS_ACTIONS", LzeZneaktivnitPrilohu = "PERMISSIONS_ACTIONS", LzeSouvisejiciEditovat = "PERMISSIONS_ACTIONS", LzeSouvisejiciEditovatTypVazby = "PERMISSIONS_ACTIONS", LzeIRPPridatOpravneni = "PERMISSIONS_ACTIONS", LzeIRPPridatPravidlo = "PERMISSIONS_ACTIONS", LzePridatPrilohy = "PERMISSIONS_ACTIONS", LzePridatPoznamkuDoHistorie = "PERMISSIONS_ACTIONS_EPK", LzePridatUzivatelskouPoznamku = "PERMISSIONS_ACTIONS_EPK", LzeElEditaceBezKontrolyStavuUzavreno = "PERMISSIONS_ACTIONS", LzeElEditacePrilohBezKontrolyStavuUzavreno = "PERMISSIONS_ACTIONS", LzeElEditace = "PERMISSIONS_ACTIONS", LzeElPrejmenovat = "PERMISSIONS_ACTIONS", LzeEditovatElObraz = "PERMISSIONS_ACTIONS", LzeEditovatElPrilohy = "PERMISSIONS_ACTIONS", LzeEditovatKategoriiElPrilohy = "PERMISSIONS_ACTIONS", LzeOdstranitElPrilohy = "PERMISSIONS_ACTIONS", LzeOdstranitRadekElPrilohy = "PERMISSIONS_ACTIONS", LzeOdstranitPrilohy = "PERMISSIONS_ACTIONS", LzeZneaktivnitElPrilohy = "PERMISSIONS_ACTIONS", LzeZverejnitEl = "PERMISSIONS_ACTIONS", LzeZverejnitElPresZadostiMenu = "PERMISSIONS_ACTIONS", LzeZverejnitElPresZadosti = "PERMISSIONS_ACTIONS", LzeZverejnitElObraz = "PERMISSIONS_ACTIONS", LzeZverejnitElPrilohu = "PERMISSIONS_ACTIONS", LzeZverejnitElNaUrDesku = "PERMISSIONS_ACTIONS", LzeZverejnitOznacitKeZverejneni = "PERMISSIONS_ACTIONS", LzeZverejnitElObrazOznacitKeZverejneni = "PERMISSIONS_ACTIONS", LzeZverejnitElObrazNaUrDesku = "PERMISSIONS_ACTIONS", LzeZverejnitElObrazDoDiplomchainu = "PERMISSIONS_ACTIONS", LzeZneaktivnitElObraz = "PERMISSIONS_ACTIONS", LzeOdstranitElObraz = "PERMISSIONS_ACTIONS", LzeKartuCist = "PERMISSIONS_ACTIONS", LzeZalozitVyrizujiciDok = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeZrusitPrideleni = "PERMISSIONS_ACTIONS_REDISTRIBUCE", LzePridelit = "PERMISSIONS_ACTIONS", LzeZamitnoutPrideleniZeSeznamu = "PERMISSIONS_ACTIONS", LzePreevidovatCj = "PERMISSIONS_ACTIONS", LzeNastavitVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeNastavitJakoVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS", LzeVlastnostiPredplnit = "PERMISSIONS_ACTIONS", LzeOdeslatNedokladovane = "PERMISSIONS_ACTIONS", LzePriraditJakoVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS", LzeOdebratVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeVyriditCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeOdvyriditCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzePridavatAOdebiratFormulare = "PERMISSIONS_ACTIONS", LzeSchvalit = "PERMISSIONS_ACTIONS", LzeSchvalovat = "PERMISSIONS_ACTIONS", LzePridatZadostOPodpis = "PERMISSIONS_ACTIONS", LzePridatZadostDoEpk = "PERMISSIONS_ACTIONS", LzePridatZadostDoEpkPouzeVzitNaVedomi = "PERMISSIONS_ACTIONS_SPISOVNA", LzeSchvalovaciProces = "PERMISSIONS_ACTIONS", LzeSchvalovaciProcesNerizeny = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI", LzeSchvalovaciProcesRizenyNovy = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI_EPK", LzeSchvalovaciProcesRizeny = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI", LzeVyriditZadostOPodpis = "PERMISSIONS_ACTIONS", LzeZverejneni = "PERMISSIONS_ACTIONS", LzeZverejneniEditovat = "PERMISSIONS_ACTIONS", LzePosoudit = "PERMISSIONS_ACTIONS", LzeElPodepsatDoPdf = "PERMISSIONS_ACTIONS", LzeElPodepsatObraz = "PERMISSIONS_ACTIONS", LzeElPodepsat = "PERMISSIONS_ACTIONS", LzeOveritElPodpis = "PERMISSIONS_ACTIONS", LzeElObrazOtevritAUzamknout = "PERMISSIONS_ACTIONS", LzeElObrazOdemknout = "PERMISSIONS_ACTIONS", LzeOdSchvalit = "PERMISSIONS_ACTIONS", LzeDokumentPriraditKeSpisu = "PERMISSIONS_ACTIONS", LzeDokumentPriraditKeSpisuZrusit = "PERMISSIONS_ACTIONS", LzeKonvertovatDoPdf = "PERMISSIONS_ACTIONS_DORUCENI", LzeKonvertovatDoPdfZobrazitDialog = "PERMISSIONS_ACTIONS_DORUCENI", LzeZobrazitIniciacniDokument = "PERMISSIONS_ACTIONS", LzeZobrazitVyrizujiciDokument = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeZnovupodat = "PERMISSIONS_ACTIONS", LzeZmenitUzo = "PERMISSIONS_ACTIONS", LzeZmenitDatumVytvoreni = "PERMISSIONS_ACTIONS", JeAktivniMuzeBytUlozenNeboArchivovan = "PERMISSIONS_ACTIONS", LzeVlozitDoBaliku = "PERMISSIONS_ACTIONS", LzeVyjmoutZBaliku = "PERMISSIONS_ACTIONS_SPISOVNA", LzeTrasy = "PERMISSIONS_ACTIONS", LzeOperativneUlozit = "PERMISSIONS_ACTIONS", LzeVytvoritNovouKopii = "PERMISSIONS_ACTIONS", LzeVytvoritDuplikat = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI", LzeOznacitJakoPreevidovaniZNahradniEvidence = "PERMISSIONS_ACTIONS", LzeVytvoritSouvisejiciUkol = "PERMISSIONS_ACTIONS", LzeRakVytvoritZadostZdf = "PERMISSIONS_ACTIONS", LzeRakVytvoritZadostAkNeAk = "PERMISSIONS_ACTIONS_EPK_SPIS_STAV", LzeRakVytvoritZadostNapojeniNaVstup = "PERMISSIONS_ACTIONS_SPIS_STAV", LzeRakKonverze = "PERMISSIONS_ACTIONS_EPK_SPIS_STAV", LzePredat = "PERMISSIONS_ACTIONS", LzeVratitDoWfl = "PERMISSIONS_ACTIONS", LzePrevzit = "PERMISSIONS_ACTIONS", LzePrevzitZeSeznamu = "PERMISSIONS_ACTIONS", LzePrevzitZeSeznamuRedistribuceKPrevzeti = "PERMISSIONS_ACTIONS", LzeTrasuOdstranit = "PERMISSIONS_ACTIONS", LzeTrasuEditovat = "PERMISSIONS_ACTIONS", LzeInterniFormularEditovat = "PERMISSIONS_ACTIONS", LzeInterniFormularUlozitNovouVerzi = "PERMISSIONS_ACTIONS", LzeInterniFormularUlozitPdf = "PERMISSIONS_ACTIONS_DORUCENI", LzePridavatVlastnosti = "PERMISSIONS_ACTIONS", LzeEditovatVlastnosti = "PERMISSIONS_ACTIONS", LzeEditovatDotceneSubjekty = "PERMISSIONS_ACTIONS", LzeTSpisVlozit = "PERMISSIONS_ACTIONS", LzeTSpisVyjmout = "PERMISSIONS_ACTIONS", LzeZobrazitSoucast = "PERMISSIONS_ACTIONS", LzeZobrazitDil = "PERMISSIONS_ACTIONS", LzeZobrazitTypovySpis = "PERMISSIONS_ACTIONS", LzeTSpisVytvorit = "PERMISSIONS_ACTIONS", LzeEvidovatCj = "PERMISSIONS_ACTIONS", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "PERMISSIONS_ACTIONS", JePovolenaPraceVAgendeBezOmezeniEa = "PERMISSIONS_ACTIONS", LzeOdStornovat = "PERMISSIONS_ACTIONS", LzeEditovatPristup2 = "PERMISSIONS_FIELDS", LzeEditovatPristup = "PERMISSIONS_FIELDS", LzeEditovatVec = "PERMISSIONS_FIELDS", LzeEditovatVecPodrobne = "PERMISSIONS_FIELDS", LzeEditovatPoznamku = "PERMISSIONS_FIELDS", LzeEditovatNovePodaniNeboEditacniRezim = "PERMISSIONS_FIELDS", LzeEditovatPocty = "PERMISSIONS_FIELDS", LzeEditovatAktZnacku = "PERMISSIONS_FIELDS", LzeEditovatCjExt = "PERMISSIONS_FIELDS", LzeEditovatSpZnExt = "PERMISSIONS_FIELDS", LzeEditovatTypDokumentu = "PERMISSIONS_FIELDS", LzeEditovatDatumPodani = "PERMISSIONS_FIELDS_SPIS_STAV", LzeEditovatDatumPodaniPriPodani = "PERMISSIONS_FIELDS", LzeEditovatSpisPlanAZnak = "PERMISSIONS_FIELDS", LzeEditovatPozastaveniSkartacniOperace = "PERMISSIONS_FIELDS_SPISOVNA", LzeEditovatUmisteni = "PERMISSIONS_FIELDS_SPISOVNA", LzeEditovatCj = "PERMISSIONS_FIELDS", LzeEditovatSpousteciUdalostAPopis = "PERMISSIONS_FIELDS_SPIS_ZNAK_SPISOVNA", JeShodnyExterniSystemAJePovolenaAktivniPrace = "PERMISSIONS_ACTIONS", LzeEditovatDilciTermin = "PERMISSIONS_ACTIONS", LzeOveritPodpisElObraz = "PERMISSIONS_ACTIONS", LzeZobrazitHistoriiOvereniElObraz = "PERMISSIONS_ACTIONS", LzeEditovatSpousteciUdalostNsesss2023 = "PERMISSIONS_ACTIONS",}
	const enum GSpisPermissionsDtoTypes { LzeVyridit = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditSpis = "Gordic.General.ApplicationInterface.GPermission", LzeExportovatSpis = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritSpisBezIniciacniPisemnosti = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitVyrizeni = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzePriorovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitPrioraci = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditNeboUzavritSpis = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditAUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDoSpisu = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDoTypovehoSpisu = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutZTypovehoSpisu = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitPosledniDil = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDoSoucasti = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutZeSoucasti = "Gordic.General.ApplicationInterface.GPermission", LzeSpisVyjmoutZeSoucasti = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatTypSpisu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatZpVyriz = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatUlozenoListu = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazVytezitPDF = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazVytezitPDFFormular = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazVytezitMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitDetailUlozeni = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitUlozeni = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitFormu = "Gordic.General.ApplicationInterface.GPermission", LzeKlicovaSlova = "Gordic.General.ApplicationInterface.GPermission", LzePisemnostVlozit = "Gordic.General.ApplicationInterface.GPermission", LzePisemnostVyjmout = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritSpis = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritSpisDoSoucasti = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritTypovySpis = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitOdeslani = "Gordic.General.ApplicationInterface.GPermission", LzePripravovatOdeslani = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatOdeslani = "Gordic.General.ApplicationInterface.GPermission", LzeZtratit = "Gordic.General.ApplicationInterface.GPermission", LzeNalezt = "Gordic.General.ApplicationInterface.GPermission", LzePrerusit = "Gordic.General.ApplicationInterface.GPermission", LzeObnovit = "Gordic.General.ApplicationInterface.GPermission", LzeVyrizovat = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditAdActa = "Gordic.General.ApplicationInterface.GPermission", LzeUzavritSoucast = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditDokumentVeSpisuVeStareMetodice = "Gordic.General.ApplicationInterface.GPermission", LzePredatDoEA = "Gordic.General.ApplicationInterface.GPermission", LzePredatDoEAzEKO = "Gordic.General.ApplicationInterface.GPermission", LzePrevzitZEA = "Gordic.General.ApplicationInterface.GPermission", LzeInformovatEA = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitVyrizeniAdActa = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitOdeslaniOriginalu = "Gordic.General.ApplicationInterface.GPermission", LzeNabytPravniMoc = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritKopiiPisemnosti = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritDuplikat2 = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatOriginal = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitStupenUtajeni = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitPriznakZobrazitelnostiZastupemIRP = "Gordic.General.ApplicationInterface.GPermission", LzeRozsirProfilWflPisemnostiDoSsl = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatTerminSpisuJenKontrolaParam = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditDokumentSOhledemNaEpk = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditDokumentSOhledemNaEpkDotaz = "boolean", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpisovyZnak = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatKlicovaSlova = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatJenutnyDotazNaPreuruseniRedistribuce = "boolean", LzeVlozitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitElObrazEpk = "Gordic.General.ApplicationInterface.GPermission", LzeOznacitJakoElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZamenitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZnovuVlozitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeElEditovatPriznakPlatneVerze = "Gordic.General.ApplicationInterface.GPermission", LzeElEditovatPriznakArchivace = "Gordic.General.ApplicationInterface.GPermission", LzeElCteni = "Gordic.General.ApplicationInterface.GPermission", LzeElCteniZasilky = "Gordic.General.ApplicationInterface.GPermission", LzeElCteniElPodani = "Gordic.General.ApplicationInterface.GPermission", LzeElCteniOdeslaneZasilky = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElObrazDotaz = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazSetVisualSignPosition = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElPrilohyDotaz = "Gordic.General.ApplicationInterface.GPermission", LzeElPrilohySetVisualSignPosition = "Gordic.General.ApplicationInterface.GPermission", LzePridatElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzePridatElPrilohyNeboNeEl = "Gordic.General.ApplicationInterface.GPermission", LzeZneaktivnitPrilohu = "Gordic.General.ApplicationInterface.GPermission", LzeSouvisejiciEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeSouvisejiciEditovatTypVazby = "Gordic.General.ApplicationInterface.GPermission", LzeIRPPridatOpravneni = "Gordic.General.ApplicationInterface.GPermission", LzeIRPPridatPravidlo = "Gordic.General.ApplicationInterface.GPermission", LzePridatPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzePridatPoznamkuDoHistorie = "Gordic.General.ApplicationInterface.GPermission", LzePridatUzivatelskouPoznamku = "Gordic.General.ApplicationInterface.GPermission", LzeElEditaceBezKontrolyStavuUzavreno = "Gordic.General.ApplicationInterface.GPermission", LzeElEditacePrilohBezKontrolyStavuUzavreno = "Gordic.General.ApplicationInterface.GPermission", LzeElEditace = "Gordic.General.ApplicationInterface.GPermission", LzeElPrejmenovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatKategoriiElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitRadekElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeZneaktivnitElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitEl = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElPresZadostiMenu = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElPresZadosti = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElPrilohu = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElNaUrDesku = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitOznacitKeZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObrazOznacitKeZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObrazNaUrDesku = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObrazDoDiplomchainu = "Gordic.General.ApplicationInterface.GPermission", LzeZneaktivnitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeKartuCist = "Gordic.General.ApplicationInterface.GPermission", LzeZalozitVyrizujiciDok = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitPrideleni = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzeZamitnoutPrideleniZeSeznamu = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovatCj = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitJakoVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeVlastnostiPredplnit = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatNedokladovane = "Gordic.General.ApplicationInterface.GPermission", LzePriraditJakoVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeOdebratVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditCj = "Gordic.General.ApplicationInterface.GPermission", LzeOdvyriditCj = "Gordic.General.ApplicationInterface.GPermission", LzePridavatAOdebiratFormulare = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovat = "Gordic.General.ApplicationInterface.GPermission", LzePridatZadostOPodpis = "Gordic.General.ApplicationInterface.GPermission", LzePridatZadostDoEpk = "Gordic.General.ApplicationInterface.GPermission", LzePridatZadostDoEpkPouzeVzitNaVedomi = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProces = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProcesNerizeny = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProcesRizenyNovy = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProcesRizeny = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditZadostOPodpis = "Gordic.General.ApplicationInterface.GPermission", LzeZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeZverejneniEditovat = "Gordic.General.ApplicationInterface.GPermission", LzePosoudit = "Gordic.General.ApplicationInterface.GPermission", LzeElPodepsatDoPdf = "Gordic.General.ApplicationInterface.GPermission", LzeElPodepsatObraz = "Gordic.General.ApplicationInterface.GPermission", LzeElPodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOveritElPodpis = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazOtevritAUzamknout = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazOdemknout = "Gordic.General.ApplicationInterface.GPermission", LzeOdSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeDokumentPriraditKeSpisu = "Gordic.General.ApplicationInterface.GPermission", LzeDokumentPriraditKeSpisuZrusit = "Gordic.General.ApplicationInterface.GPermission", LzeKonvertovatDoPdf = "Gordic.General.ApplicationInterface.GPermission", LzeKonvertovatDoPdfZobrazitDialog = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitIniciacniDokument = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitVyrizujiciDokument = "Gordic.General.ApplicationInterface.GPermission", LzeZnovupodat = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitUzo = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitDatumVytvoreni = "Gordic.General.ApplicationInterface.GPermission", JeAktivniMuzeBytUlozenNeboArchivovan = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDoBaliku = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutZBaliku = "Gordic.General.ApplicationInterface.GPermission", LzeTrasy = "Gordic.General.ApplicationInterface.GPermission", LzeOperativneUlozit = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritNovouKopii = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritDuplikat = "Gordic.General.ApplicationInterface.GPermission", LzeOznacitJakoPreevidovaniZNahradniEvidence = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritSouvisejiciUkol = "Gordic.General.ApplicationInterface.GPermission", LzeRakVytvoritZadostZdf = "Gordic.General.ApplicationInterface.GPermission", LzeRakVytvoritZadostAkNeAk = "Gordic.General.ApplicationInterface.GPermission", LzeRakVytvoritZadostNapojeniNaVstup = "Gordic.General.ApplicationInterface.GPermission", LzeRakKonverze = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePrevzitZeSeznamu = "Gordic.General.ApplicationInterface.GPermission", LzePrevzitZeSeznamuRedistribuceKPrevzeti = "Gordic.General.ApplicationInterface.GPermission", LzeTrasuOdstranit = "Gordic.General.ApplicationInterface.GPermission", LzeTrasuEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeInterniFormularEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeInterniFormularUlozitNovouVerzi = "Gordic.General.ApplicationInterface.GPermission", LzeInterniFormularUlozitPdf = "Gordic.General.ApplicationInterface.GPermission", LzePridavatVlastnosti = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVlastnosti = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDotceneSubjekty = "Gordic.General.ApplicationInterface.GPermission", LzeTSpisVlozit = "Gordic.General.ApplicationInterface.GPermission", LzeTSpisVyjmout = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitSoucast = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitDil = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitTypovySpis = "Gordic.General.ApplicationInterface.GPermission", LzeTSpisVytvorit = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovatCj = "Gordic.General.ApplicationInterface.GPermission", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "Gordic.General.ApplicationInterface.GPermission", JePovolenaPraceVAgendeBezOmezeniEa = "Gordic.General.ApplicationInterface.GPermission", LzeOdStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPristup2 = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPristup = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVec = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVecPodrobne = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPoznamku = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatNovePodaniNeboEditacniRezim = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocty = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatAktZnacku = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatCjExt = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpZnExt = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatTypDokumentu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDatumPodani = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDatumPodaniPriPodani = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpisPlanAZnak = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPozastaveniSkartacniOperace = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatUmisteni = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatCj = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpousteciUdalostAPopis = "Gordic.General.ApplicationInterface.GPermission", JeShodnyExterniSystemAJePovolenaAktivniPrace = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDilciTermin = "Gordic.General.ApplicationInterface.GPermission", LzeOveritPodpisElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitHistoriiOvereniElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpousteciUdalostNsesss2023 = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSpisPermissionsDtoTypeLengths {}
	/**GDokumentFilter.*/
	const enum GSpisFilter {
		/**PID - Průvodní Identifikátor Dokumentu.*/
		ixp,
		/**Licence databáze, do které písemnost patří.*/
		lic,
		/**The rok*/
		rok,
		/**Status písemnosti - zda je v archivní databázi (100) nebo v aktivní (0).*/
		status_pis,
		/**Důvod vymazaní.*/
		typ_duv_del,
		/**Datum vymazání.*/
		dat_del,
		/**Identifikátor spisu ve kterém je dokument vložen.*/
		ixp_spis=1000,
		/**Příznak zda se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu).*/
		priz_spis,
		/**Identifikátor aktuálního vlastníka (funkce) dokumentu.*/
		ixs_fun_akt,
		/**Identifikátor aktuálního vlastníka (uzel) dokumentu.*/
		ixs_su_akt,
		/**Název dokumentu.*/
		nazev,
		/**Číslo jednací nebo agendové číslo nebo sp. značka spisu.*/
		akt_znacka,
		/**Stav distribuce.*/
		stav_dist,
		/**Stav dokumentu (písemnosti).*/
		stav_pis,
		/**Agenda, do které dokument patří.*/
		typ_ag,
		/**Kategorie typu dokumentu.*/
		ktg_typ,
		/**Identifikátpor typu písemnosti.*/
		ixs_typ,
		/**Příznak, že k dokumentu existuje profil o doručení - záznam v tabulce wflspio.*/
		s_prij,
		/**Zda existuje profil SSL pro tento dokument.*/
		s_ssl,
		/**Datum a čas poslední změny dokumentu.*/
		dat_zmena,
		/**Identifikátor autora poslední změny dokumentu.*/
		zmenu_prov,
		/**Příznak, zda existuje elektronická verze dokumentu.*/
		s_ele,
		/**Příznak, zda existuje fyzická verze dokumentu.*/
		s_fyz,
		/**Místo vzniku dokumentu.*/
		misto_vzniku,
		/**Příznak, zda je elektronický dokument podepsaný.*/
		s_sgn,
		/**Datum podání dokumentu.*/
		dat_pod,
		/**cs_akt_znacka*/
		cs_akt_znacka,
		/**Příznak zda byl dokument přečten aktuálním vlastníkem.*/
		priz_view_ssl,
		/**Barva.*/
		uzo,
		/**Identifikátor spisového plánu.*/
		spis_pl,
		/**Identifikátor spisového znaku.*/
		spis_znak,
		/**Identifikátor funkce agendového vlastníka.*/
		ixs_fun_wfl,
		/**Příznak uložení.*/
		s_uloz,
		/**Datum uložení.*/
		dat_uloz,
		/**Identifikátor uzlu agendového vlastníka.*/
		ixs_su_wfl,
		/**Příznak zda byl odeslán včetně originálu.*/
		s_odes,
		/**Příznak zda existuje profil čísla jednacího.*/
		priz_cj,
		/**Datum vyřízení.*/
		dat_vyriz,
		/**Identifikátor Číslo jednací.*/
		ixs_cj,
		/**Původ dokumentu.*/
		puvod,
		/**Příznak schválení dokumentu (úrovně wfl).*/
		s_schval,
		/**Identifikátor umístění dokumentu.*/
		umisteni,
		/**Stupeň utajení dokumentu (hodnoty různé dle implementace).*/
		st_utaj_id,
		/**Stupeň utajení dokumentu.*/
		st_utaj_id_orig,
		/**Skartační znak upravené oproti spisovému znaku.*/
		skar_znak,
		/**Skartační lhůta upravené oproti spisovému znaku.*/
		skar_lhuta,
		/**Rok spouštěcí události.*/
		rok_spo_uda,
		/**Identifikátor věcné skupiny.*/
		ixs_vsk,
		/**Identifikátor nejvyší entity.*/
		ixp_top,
		/**Příznak, o jaky typ dokumentu se jedna.*/
		typ_spis,
		/**Alternativní čárový kód převzatýz externího systému.*/
		barcode,
		/**Skartační lhůta pro správní řízení.*/
		skar_lhuta_spra,
		/**Identifikátor externího systému.*/
		ixs_ext,
		/**Rok předpokládané skartace dokumentu.*/
		rok_skartace,
		/**Identifikátor typu spousteci udalosti.*/
		ixs_spu,
		/**Počet listů dokumentu.*/
		poc_listu,
		/**Počet stran dokumentu.*/
		poc_stran,
		/**Počet kopií fyzických - text box na detailu písemnosti.*/
		poc_kop,
		/**Počet příloh dokumentu.*/
		poc_priloh,
		/**Počet listů příloh.*/
		poc_l_priloh,
		/**Číslo jednací pro zobrazenív seznamech.*/
		cj,
		/**Identifikační číslo organizace do které patří dokument.*/
		ico,
		/**Stav ve spisovně.*/
		StavSul,
		/**Příznak skartačního návrhu.*/
		PrizSkn,
		/**Příznak vypůjčení ze spisovny.*/
		PrizVyp,
		/**Příznak zda je dokument v balíku (>0).*/
		PrizVBaliku,
		/**Identifikátor balíku, ve kterém je dokument.*/
		ixs_zup,
		/**Příznak zda je žádost v Rak.*/
		Rak,
		/**Popis spouštěcí události.*/
		PopisSpoUda,
		/**Důvod pozastavení skartační operace.*/
		DuvodPozSkar,
		/**Příznak pozastavení skartační operace.*/
		PrizPozSkar,
		/**Datum do pozastavení skartační operace.*/
		RokDoPozSkar,
		/**Stav spisu ve kterém je dokument vložen (pokud není vložen ve spisu pak vrací 0).*/
		StavPisSpis,
		/**Datum vzniku záznamu.*/
		dat_mpd0,
		/**Identifikátor LPC.*/
		ixs_lpc,
		/**Uživatelsky nastavitelný sloupec A.*/
		uziv_sl_a,
		/**Uživatelsky nastavitelný sloupec A2.*/
		uziv_sl_a2,
		/**Uživatelsky nastavitelný sloupec A3.*/
		uziv_sl_a3,
		/**Uživatelsky nastavitelný sloupec B.*/
		uziv_sl_b,
		/**Uživatelsky nastavitelný sloupec B2.*/
		uziv_sl_b2,
		/**Uživatelsky nastavitelný sloupec B3.*/
		uziv_sl_b3,
		/**Uživatelsky nastavitelný sloupec C.*/
		uziv_sl_c,
		/**Uživatelsky nastavitelný sloupec C2.*/
		uziv_sl_c2,
		/**Uživatelsky nastavitelný sloupec D.*/
		uziv_sl_d,
		/**Uživatelsky nastavitelný sloupec D2.*/
		uziv_sl_d2,
		/**Uživatelsky nastavitelný sloupec J.*/
		uziv_sl_j,
		/**Uživatelsky nastavitelný sloupec J2.*/
		uziv_sl_j2,
		/**Uživatelsky nastavitelný sloupec K.*/
		uziv_sl_k,
		/**Uživatelsky nastavitelný sloupec K2.*/
		uziv_sl_k2,
		/**Uživatelsky nastavitelný sloupec N.*/
		uziv_sl_n,
		/**Typ entity.*/
		typ_entity_ico,
		/**CoJsemZac*/
		CoJsemZac,
		/**Hledání podle textu dle vlastního uvážení.*/
		fulltext,
		/**Má vyřízenou žádost v RAK.*/
		VyrizenaZadostVRak,
		/**The dilci termin*/
		DilciTermin,
		/**The ixs fun akt wflstop*/
		ixs_fun_akt_wflstop,
		/**The ixs su akt wflstop*/
		ixs_su_akt_wflstop,
		/**The ixs fun akt wflstop - jednoradkovy pro Multipole*/
		IxsFunPredavajici,
		/**The ixs su akt wflstop - jednoradkovy pro Multipole*/
		IxsSuPredavajici,
		/**The ixs orj pro redistribuci - jednoradkovy pro Multipole*/
		IxsOrjPredavajici,
		/**The ixs fun cil wflstop*/
		ixs_fun_cil_wflstop,
		/**The ixs su akt wflstop*/
		ixs_su_do_wflstop,
		/**The ixs su cil wflhtop - uzel historicky*/
		ixs_su_cil_wflhtop,
		/**The ixs fun cil wflhtop - funkce historicky*/
		ixs_fun_cil_wflhtop,
		/**The dat cil wflhtop - datum redistribuce historicky*/
		dat_cil_wflhtop,
		/**The stav top wflhtop*/
		stav_top_wflhtop,
		/**The ixs su start wflhtop*/
		ixs_su_start_wflhtop,
		/**The ixs fun start wflhtop*/
		ixs_fun_start_wflhtop,
		/**The dat zmena wflhupi - datum redistribuce (Historie pohybu)*/
		dat_zmena_wflhupi,
		/**The typ upi wflhupi*/
		typ_upi_wflhupi,
		/**The ixs fun od wflhupi*/
		ixs_fun_od_wflhupi,
		/**The ixs su od wflhupi*/
		ixs_su_od_wflhupi,
		/**The priz spis wflhupi*/
		priz_spis_wflhupi,
		/**The ixs su do wflhupi*/
		ixs_su_do_wflhupi,
		/**The ixs fun do wflhupi*/
		ixs_fun_do_wflhupi,
		/**The wflhupi.ixs_fun_od != wflhupi.ixs_fun_do*/
		NepredanoFunkciSamaNaSebeWflhupi,
		/**The ixs fun cil wflstop - jednoradkovy pro Multipole*/
		IxsFunPrebirajici,
		/**The ixs su akt wflstop - jednoradkovy pro Multipole*/
		IxsSuPrebirajici,
		/**The ixs orj pro redistribuci - jednoradkovy pro Multipole*/
		IxsOrjPrebirajici,
		/**subjekt předávající ve filtru vlastnictví.*/
		RedistribucePredavajiciVlastnictvi,
		/**subjekt přebírající ve filtru vlastnictví.*/
		RedistribucePrebirajiciVlastnictvi,
		/**Pomocné filtrovaní na redistribuci.*/
		IDokumentyNaCeste,
		/**Aktivní (aktivita 100) záznam přílohy (ixb) z tabulky wflspx*/
		ixb_wflsepx,
		/**Ber ohled na agendu.*/
		SOhledemNaAgendu,
		/**Datumový interval (typ datumu přepíná pomocí faktoru).*/
		DatumovyIntervalValue,
		/**Datumový interval (typ datumu přepíná pomocí faktoru).*/
		DatumovyIntervalFactor,
		/**Filtrovaní na funkci [true] či na spisový uzel [false]. Pokud se nemá použít, pak je null.*/
		Vlastni,
		/**Datum vyřízení spisu do z wflsdcj*/
		dat_vyriz_do_wflsdcj,
		/**the stav cj wflsdcj*/
		stav_cj_wflsdcj,
		/**the stav sslden wflsdcj*/
		sslden_wflsdcj,
		/**the stav rok wflsdcj*/
		rok_wflsdcj,
		/**the stav por cislo wflsdcj*/
		por_cislo_wflsdcj,
		/**the dokument patri aktualnimu uzlu*/
		DokumentAktualnihoUzlu,
		/**Zda je originál*/
		s_orig,
		/**The ixs fun cil wflstop - Všechny funkce, které uživatel může mít.*/
		IxsFunVsechnyFunkcePrebirajiciho,
		/**Dle kategorie agendy 10.*/
		ProEkoAgendy,
		/**Filtr na kategorie typu dokumentu, který se načte dle zadaného typu agendy.*/
		KategorieTypuDokumentuDleTypuAgendy,
		/**ikona vysledku hromadne operace*/
		ico_status,
		/**Čárový kód přílohy.*/
		ixs_car_wflspri,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceTyp,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceSubjectIxs,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceSubjectTypeIxs,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceIxsSuDo,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceIxsFunDo,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceIxsFunOd,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceCileneNotFyzicky,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceDateInterval,
		/**ID skartačního reimu.*/
		ixs_skr,
		/**ID evidenčního období.*/
		ixs_obd,
		/**Pořadí v rámci období.*/
		por_cislo_obd,
		/**Datum přenosu.*/
		dat_prenosu,
		/**Datum znepřístupnní.*/
		dat_znepristupneni,
		/**Předpokládaný rok kontroly spoutěcí události.*/
		rok_kon_spu,
		/**Filtrovaní na vlastnictví všemi funkcemi aktuálně přihlášeného referenta.*/
		VlastnictviVsechnyFunkceReferenta,
		/**Historie čísel jednacích.*/
		cs_cj_doc_ssldspi,
		/**Filtrování na spisové znaky definované parametrem XXX.*/
		DefinovaneSpisoveZnaky,
		/**Věc podrobně.*/
		obsah_text=2000,
		/**Poznámka.*/
		poznamka,
		/**Počet kopií písemnosti v ssl (tlačítko kopie).*/
		poc_kopii,
		/**Datum příjmu dokumentu.*/
		dat_prij_pod,
		/**Identifikátor spisového uzlu který podal.*/
		ixs_su_pod,
		/**Datum evidence.*/
		dat_evid,
		/**Spisová značka spisu, ve které je dokument vložený.*/
		cj_spis,
		/**Název subjektu, kterému byl dokument odeslán.*/
		odeslano_kam,
		/**Příznak, zda má řešitele.*/
		s_resitel,
		/**Identifikátor funkce řešitele.*/
		ixs_fun_resitel,
		/**Příznak, zda je vyřízeno.*/
		s_vyriz,
		/**Typ vyřízení.*/
		typ_vyriz,
		/**Popis jak bylo vyřízeno.*/
		vyriz_komu,
		/**Poznámka k vyřízení.*/
		vyriz_pozn,
		/**Identifikátor kdo provedl změnu při vyřizování.*/
		ixs_zmp_vyriz,
		/**Identifikátor schvalovatele.*/
		ixs_fun_schval,
		/**Identifikátor subjektu, který naposledy změnil schválení.*/
		ixs_zmp_schval,
		/**Příznak uzavření.*/
		s_uzav,
		/**Datum uzavření.*/
		dat_uzav,
		/**Identifikátor kdo poslední provedl změnu uzavření.*/
		ixs_zmp_uzav,
		/**Příznak stornování.*/
		s_stor,
		/**Příznak ztracení.*/
		s_ztrat,
		/**Vztah písemnosti ke spisu.*/
		vztah_spis,
		/**Zda má nabytou právní moc.*/
		pr_moc,
		/**Datum nabytí právní moci.*/
		dat_pr_moc,
		/**Příznak rozšířeního (agendového) profilu.*/
		s_agp,
		/**Příznak zastavení.*/
		s_zastav,
		/**Věc podrobně (skládá dohromady všechny obsah_text a upravuje konce řádků).*/
		obsah_text_slozeny,
		/**Věc podrobně pro použití v seznamu (obsahuje prvnich 254 znaků věci podrobně - sloupec obsah_text s odstranenym odradkovanim).*/
		obsah_text_pro_seznam,
		/**Zda je vyplněn schvalovatel.*/
		SSchvalSsl,
		/**Pořadové číslo dokumentu ve spisu, není-li to dokument v spisu, je GInt32.Null.*/
		PorCisloVSpisu,
		/**Identifikátor filtru vlastictví.*/
		SubjektIxs,
		/**Typ identifikátoru filtru vlastictví.*/
		SubjektTypeIxs,
		/**Datum vykonavatelnosti.*/
		dat_vykonav,
		/**deník ssl*/
		sslden=3000,
		/**rok sslsdcj*/
		rok_sslsdcj,
		/**pořadové číslo*/
		por_cislo,
		/**číslo jednací*/
		cj_sslsdcj,
		/**doplněk spisové značky/čísla jednacího*/
		cj_ext,
		/**identifikátor iniciační písemnosti*/
		ixp_init,
		/**identifikátor vyřizující písemnosti*/
		ixp_vyriz,
		/**Název spisu.*/
		nazev_sslsdcj,
		/**identifikátor spisového uzlu ?*/
		ixs_su,
		/**zkratka spisového uzlu ?*/
		zkratka_su,
		/**počet písemností ve spisu*/
		pocet_pis,
		/**Datum a čas poslední změny spisu.*/
		dat_zmena_sslsdcj,
		/**Identifikátor autora poslední změny spisu.*/
		zmenu_prov_sslsdcj,
		/**počet dokumentů aktuálně vložených ve spisu*/
		pocet_vlozenych_dok,
		/**datum založení spisu*/
		dat_zal,
		/**kdo založil spis*/
		ixs_zmp_zal,
		/**značka odesilatele*/
		znacka_odes,
		/**identifikátor priorovaného spisu*/
		ixp_prior,
		/**stav priorace spisu*/
		s_prior,
		/**klíčová slova*/
		kl_slova,
		/**způsob vyřízení*/
		zp_vyriz,
		/**stav spisu*/
		stav_spis,
		/**odesláno listů*/
		odeslano_listu,
		/**uloženo listů*/
		ulozeno_listu,
		/**svazků příloh*/
		sv_priloh,
		/**velikost el. dokumentů - zjišťuje se jen při zapnutém parametru*/
		velikost_el,
		/**ixs typového spisu*/
		ixs_tss,
		/**ixp nadřízené složky*/
		ixp_nad,
		/**ixp nadřízené složky*/
		ixp_top_slozka,
		/**The s po term*/
		s_po_term,
		/**Datum vyřízení spisu do z sslssdcj*/
		dat_vyriz_do_sslsdcj,
		/**The priz ZSCH*/
		priz_zsch,
		/**The priz akt*/
		priz_akt,
		/**The osc*/
		osc,
		/**The prav kval*/
		prav_kval,
		/**The zakon c*/
		zakon_c,
		/**The znacka ts*/
		znacka_ts,
		/**Zda má nabytou právní moc.*/
		pr_moc_sslsdcj,
		/**Datum nabytí právní moci.*/
		dat_pr_moc_sslsdcj,
		/**Příznak zastavení.*/
		s_zastav_sslsdcj,
		/**Příznak uzavření.*/
		s_uzav_sslsdcj,
		/**Datum uzavření.*/
		dat_uzav_sslsdcj,
		/**identifikátor spisu.*/
		ixp_spis_sslsdcj,
		/**the spis patri aktualnimu uzlu*/
		SpisAktualnihoUzlu,
		/**the spis patri aktualnimu uzlu v obdobi - intervalu od do*/
		SpisAktualnihoUzluOdDo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GSpisFilterDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Spis Filter Dto.*/
	interface GSpisFilterDto extends Gordic.Ssl.Interface.GSslspidFilterDto {
		/**The filter group SSLSDCJ*/
		FILTER_GROUP_SSLSDCJ?: string|null;
		/**deník ssl*/
		sslden?: GBaseFilter<string>|null;
		/**rok sslsdcj*/
		rok_sslsdcj?: GBaseFilter<number>|null;
		/**pořadové číslo*/
		por_cislo?: GBaseFilter<number>|null;
		/**číslo jednací rozšíření*/
		cj_ext?: GBaseFilter<string>|null;
		/**identifikátor iniciační písemnosti*/
		ixp_init?: GBaseFilter<string>|null;
		/**identifikátor vyřizující písemnosti*/
		ixp_vyriz?: GBaseFilter<string>|null;
		/**identifikátor spisového uzlu ?*/
		ixs_su?: GBaseFilter<string>|null;
		/**zkratka spisového uzlu ?*/
		zkratka_su?: GBaseFilter<string>|null;
		/**počet písemností ve spisu*/
		pocet_pis?: GBaseFilter<number>|null;
		/**počet dokumentů aktuálně vložených ve spisu*/
		pocet_vlozenych_dok?: GBaseFilter<number>|null;
		/**datum založení spisu*/
		dat_zal?: GBaseFilter<JsonDate>|null;
		/**kdo založil spis*/
		ixs_zmp_zal?: GBaseFilter<string>|null;
		/**značka odesilatele*/
		znacka_odes?: GBaseFilter<string>|null;
		/**identifikátor priorovaného spisu*/
		ixp_prior?: GBaseFilter<string>|null;
		/**stav priorace spisu*/
		s_prior?: number[]|null;
		/**klíčová slova*/
		kl_slova?: GBaseFilter<string>|null;
		/**způsob vyřízení*/
		zp_vyriz?: GBaseFilter<string>|null;
		/**stav spisu*/
		stav_spis?: number[]|null;
		/**odesláno listů*/
		odeslano_listu?: GBaseFilter<number>|null;
		/**uloženo listů*/
		ulozeno_listu?: GBaseFilter<number>|null;
		/**svazků příloh*/
		sv_priloh?: GBaseFilter<string>|null;
		/**velikost el. dokumentů - zjišťuje se jen při zapnutém parametru*/
		velikost_el?: GBaseFilter<JsonDecimal>|null;
		/**ixs typového spisu*/
		ixs_tss?: GBaseFilter<string>|null;
		/**ixp nadřízené složky*/
		ixp_nad?: GBaseFilter<string>|null;
		/**ixp nadřízené složky*/
		ixp_top_slozka?: GBaseFilter<string>|null;
		/**Gets or sets the s po term.*/
		s_po_term?: number[]|null;
		/**Gets or sets the cj souv text.*/
		cj_souv_txt?: string|null;
		/**Gets or sets the priz ZSCH.*/
		priz_zsch?: number[]|null;
		/**Gets or sets the priz akt.*/
		priz_akt?: number|null;
		/**Gets or sets the osc.*/
		osc?: string|null;
		/**Gets or sets the prav kval.*/
		prav_kval?: string|null;
		/**Gets or sets the zakon c.*/
		zakon_c?: string|null;
		/**Gets or sets the znacka ts.*/
		znacka_ts?: string|null;
		/**Datum vyřízení spisu do z sslssdcj*/
		dat_vyriz_do_sslsdcj?: GIntervalDto<JsonDate>|null;
		/**SpisAktualnihoUzlu*/
		SpisAktualnihoUzlu?: boolean|null;
		/**SpisAktualnihoUzluOdDo*/
		SpisAktualnihoUzluOdDo?: GIntervalDto<JsonDate>|null;
	}
	const enum GSpisFilterDtoNames { FILTER_GROUP_SSLSDCJ = "FILTER_GROUP_SSLSDCJ", sslden = "sslden", rok_sslsdcj = "rok_sslsdcj", por_cislo = "por_cislo", cj_ext = "cj_ext", ixp_init = "ixp_init", ixp_vyriz = "ixp_vyriz", ixs_su = "ixs_su", zkratka_su = "zkratka_su", pocet_pis = "pocet_pis", pocet_vlozenych_dok = "pocet_vlozenych_dok", dat_zal = "dat_zal", ixs_zmp_zal = "ixs_zmp_zal", znacka_odes = "znacka_odes", ixp_prior = "ixp_prior", s_prior = "s_prior", kl_slova = "kl_slova", zp_vyriz = "zp_vyriz", stav_spis = "stav_spis", odeslano_listu = "odeslano_listu", ulozeno_listu = "ulozeno_listu", sv_priloh = "sv_priloh", velikost_el = "velikost_el", ixs_tss = "ixs_tss", ixp_nad = "ixp_nad", ixp_top_slozka = "ixp_top_slozka", s_po_term = "s_po_term", cj_souv_txt = "cj_souv_txt", priz_zsch = "priz_zsch", priz_akt = "priz_akt", osc = "osc", prav_kval = "prav_kval", zakon_c = "zakon_c", znacka_ts = "znacka_ts", dat_vyriz_do_sslsdcj = "dat_vyriz_do_sslsdcj", SpisAktualnihoUzlu = "SpisAktualnihoUzlu", SpisAktualnihoUzluOdDo = "SpisAktualnihoUzluOdDo", FILTER_GROUP_SSLSPID = "FILTER_GROUP_SSLSPID", obsah_text = "obsah_text", poznamka = "poznamka", poc_kopii = "poc_kopii", dat_prij_pod = "dat_prij_pod", ixs_su_pod = "ixs_su_pod", dat_evid = "dat_evid", cj_spis = "cj_spis", odeslano_kam = "odeslano_kam", s_resitel = "s_resitel", ixs_fun_resitel = "ixs_fun_resitel", s_vyriz = "s_vyriz", typ_vyriz = "typ_vyriz", vyriz_komu = "vyriz_komu", vyriz_pozn = "vyriz_pozn", ixs_zmp_vyriz = "ixs_zmp_vyriz", ixs_fun_schval = "ixs_fun_schval", ixs_zmp_schval = "ixs_zmp_schval", s_uzav = "s_uzav", dat_uzav = "dat_uzav", ixs_zmp_uzav = "ixs_zmp_uzav", s_stor = "s_stor", s_ztrat = "s_ztrat", vztah_spis = "vztah_spis", pr_moc = "pr_moc", dat_pr_moc = "dat_pr_moc", s_agp = "s_agp", s_zastav = "s_zastav", dat_vykonav = "dat_vykonav", obsah_text_slozeny = "obsah_text_slozeny", SubjektIxs = "SubjektIxs", SubjektTypeIxs = "SubjektTypeIxs", SubjectStructOrg = "SubjectStructOrg", FILTER_GROUP_WFLSPID = "FILTER_GROUP_WFLSPID", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", st_utaj_id_orig = "st_utaj_id_orig", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", ixs_zup = "ixs_zup", dat_mpd0 = "dat_mpd0", ixs_lpc = "ixs_lpc", uziv_sl_a = "uziv_sl_a", uziv_sl_a2 = "uziv_sl_a2", uziv_sl_a3 = "uziv_sl_a3", uziv_sl_b = "uziv_sl_b", uziv_sl_b2 = "uziv_sl_b2", uziv_sl_b3 = "uziv_sl_b3", uziv_sl_c = "uziv_sl_c", uziv_sl_c2 = "uziv_sl_c2", uziv_sl_d = "uziv_sl_d", uziv_sl_d2 = "uziv_sl_d2", uziv_sl_j = "uziv_sl_j", uziv_sl_j2 = "uziv_sl_j2", uziv_sl_k = "uziv_sl_k", uziv_sl_k2 = "uziv_sl_k2", uziv_sl_n = "uziv_sl_n", dat_dtermin = "dat_dtermin", priz_kop = "priz_kop", priz_kopie = "priz_kopie", stav_epk_txt = "stav_epk_txt", typ_pozad_pod_txt = "typ_pozad_pod_txt", dat_vyriz_do = "dat_vyriz_do", zp_vyriz_txt = "zp_vyriz_txt", s_orig = "s_orig", fulltext = "fulltext", VyrizenaZadostVRak = "VyrizenaZadostVRak", DilciTermin = "DilciTermin", ixs_fun_akt_wflstop = "ixs_fun_akt_wflstop", ixs_su_akt_wflstop = "ixs_su_akt_wflstop", ixs_fun_cil_wflstop = "ixs_fun_cil_wflstop", ixs_su_do_wflstop = "ixs_su_do_wflstop", ixs_su_cil_wflhtop = "ixs_su_cil_wflhtop", ixs_fun_cil_wflhtop = "ixs_fun_cil_wflhtop", dat_cil_wflhtop = "dat_cil_wflhtop", stav_top_wflhtop = "stav_top_wflhtop", ixs_su_start_wflhtop = "ixs_su_start_wflhtop", ixs_fun_start_wflhtop = "ixs_fun_start_wflhtop", dat_zmena_wflhupi = "dat_zmena_wflhupi", typ_upi_wflhupi = "typ_upi_wflhupi", priz_spis_wflhupi = "priz_spis_wflhupi", ixs_fun_od_wflhupi = "ixs_fun_od_wflhupi", ixs_su_od_wflhupi = "ixs_su_od_wflhupi", ixs_su_do_wflhupi = "ixs_su_do_wflhupi", ixs_fun_do_wflhupi = "ixs_fun_do_wflhupi", NepredanoFunkciSamaNaSebeWflhupi = "NepredanoFunkciSamaNaSebeWflhupi", ixb_wflsepx = "ixb_wflsepx", SOhledemNaAgendu = "SOhledemNaAgendu", DatumovyIntervalValue = "DatumovyIntervalValue", DatumovyIntervalFactor = "DatumovyIntervalFactor", Vlastni = "Vlastni", IxsFunPredavajici = "IxsFunPredavajici", IxsSuPredavajici = "IxsSuPredavajici", IxsOrjPredavajici = "IxsOrjPredavajici", IxsFunPrebirajici = "IxsFunPrebirajici", IxsSuPrebirajici = "IxsSuPrebirajici", IxsOrjPrebirajici = "IxsOrjPrebirajici", RedistribucePredavajiciVlastnictvi = "RedistribucePredavajiciVlastnictvi", RedistribucePrebirajiciVlastnictvi = "RedistribucePrebirajiciVlastnictvi", IDokumentyNaCeste = "IDokumentyNaCeste", dat_vyriz_do_wflsdcj = "dat_vyriz_do_wflsdcj", stav_cj_wflsdcj = "stav_cj_wflsdcj", sslden_wflsdcj = "sslden_wflsdcj", rok_wflsdcj = "rok_wflsdcj", por_cislo_wflsdcj = "por_cislo_wflsdcj", DokumentAktualnihoUzlu = "DokumentAktualnihoUzlu", IxsFunVsechnyFunkcePrebirajiciho = "IxsFunVsechnyFunkcePrebirajiciho", ProEkoAgendy = "ProEkoAgendy", KategorieTypuDokumentuDleTypuAgendy = "KategorieTypuDokumentuDleTypuAgendy", ico_status = "ico_status", ixs_car_wflspri = "ixs_car_wflspri", ixs_skr = "ixs_skr", ixs_obd = "ixs_obd", por_cislo_obd = "por_cislo_obd", dat_prenosu = "dat_prenosu", dat_znepristupneni = "dat_znepristupneni", rok_kon_spu = "rok_kon_spu", VlastnictviVsechnyFunkceReferenta = "VlastnictviVsechnyFunkceReferenta", PrehledRedistribuceTyp = "PrehledRedistribuceTyp", PrehledRedistribuceSubjectIxs = "PrehledRedistribuceSubjectIxs", PrehledRedistribuceSubjectTypeIxs = "PrehledRedistribuceSubjectTypeIxs", PrehledRedistribuceIxsSuDo = "PrehledRedistribuceIxsSuDo", PrehledRedistribuceIxsFunDo = "PrehledRedistribuceIxsFunDo", PrehledRedistribuceIxsFunOd = "PrehledRedistribuceIxsFunOd", PrehledRedistribuceCileneNotFyzicky = "PrehledRedistribuceCileneNotFyzicky", PrehledRedistribuceDateInterval = "PrehledRedistribuceDateInterval", FILTER_GROUP_WFLSIXP = "FILTER_GROUP_WFLSIXP", ixp = "ixp", lic = "lic", rok = "rok", status_pis = "status_pis", typ_duv_del = "typ_duv_del", dat_del = "dat_del",}
	const enum GSpisFilterDtoFragments { FILTER_GROUP_SSLSDCJ = "*", sslden = "*", rok_sslsdcj = "*", por_cislo = "*", cj_ext = "*", ixp_init = "*", ixp_vyriz = "*", ixs_su = "*", zkratka_su = "*", pocet_pis = "*", pocet_vlozenych_dok = "*", dat_zal = "*", ixs_zmp_zal = "*", znacka_odes = "*", ixp_prior = "*", s_prior = "*", kl_slova = "*", zp_vyriz = "*", stav_spis = "*", odeslano_listu = "*", ulozeno_listu = "*", sv_priloh = "*", velikost_el = "*", ixs_tss = "*", ixp_nad = "*", ixp_top_slozka = "*", s_po_term = "*", cj_souv_txt = "*", priz_zsch = "*", priz_akt = "*", osc = "*", prav_kval = "*", zakon_c = "*", znacka_ts = "*", dat_vyriz_do_sslsdcj = "*", SpisAktualnihoUzlu = "*", SpisAktualnihoUzluOdDo = "*", FILTER_GROUP_SSLSPID = "*", obsah_text = "SSLSPID", poznamka = "SSLSPID", poc_kopii = "SSLSPID", dat_prij_pod = "SSLSPID", ixs_su_pod = "SSLSPID", dat_evid = "SSLSPID", cj_spis = "SSLSPID", odeslano_kam = "SSLSPID", s_resitel = "SSLSPID", ixs_fun_resitel = "SSLSPID", s_vyriz = "SSLSPID", typ_vyriz = "SSLSPID", vyriz_komu = "SSLSPID", vyriz_pozn = "SSLSPID", ixs_zmp_vyriz = "SSLSPID", ixs_fun_schval = "SSLSPID", ixs_zmp_schval = "SSLSPID", s_uzav = "SSLSPID", dat_uzav = "SSLSPID", ixs_zmp_uzav = "SSLSPID", s_stor = "SSLSPID", s_ztrat = "SSLSPID", vztah_spis = "SSLSPID", pr_moc = "SSLSPID", dat_pr_moc = "SSLSPID", s_agp = "SSLSPID", s_zastav = "SSLSPID", dat_vykonav = "SSLSPID", obsah_text_slozeny = "SSLSPID", SubjektIxs = "*", SubjektTypeIxs = "*", SubjectStructOrg = "*", FILTER_GROUP_WFLSPID = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", st_utaj_id_orig = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*", ixs_zup = "*", dat_mpd0 = "*", ixs_lpc = "*", uziv_sl_a = "*", uziv_sl_a2 = "*", uziv_sl_a3 = "*", uziv_sl_b = "*", uziv_sl_b2 = "*", uziv_sl_b3 = "*", uziv_sl_c = "*", uziv_sl_c2 = "*", uziv_sl_d = "*", uziv_sl_d2 = "*", uziv_sl_j = "*", uziv_sl_j2 = "*", uziv_sl_k = "*", uziv_sl_k2 = "*", uziv_sl_n = "*", dat_dtermin = "*", priz_kop = "*", priz_kopie = "*", stav_epk_txt = "*", typ_pozad_pod_txt = "*", dat_vyriz_do = "*", zp_vyriz_txt = "*", s_orig = "*", fulltext = "*", VyrizenaZadostVRak = "*", DilciTermin = "*", ixs_fun_akt_wflstop = "*", ixs_su_akt_wflstop = "*", ixs_fun_cil_wflstop = "*", ixs_su_do_wflstop = "*", ixs_su_cil_wflhtop = "*", ixs_fun_cil_wflhtop = "*", dat_cil_wflhtop = "*", stav_top_wflhtop = "*", ixs_su_start_wflhtop = "*", ixs_fun_start_wflhtop = "*", dat_zmena_wflhupi = "*", typ_upi_wflhupi = "*", priz_spis_wflhupi = "*", ixs_fun_od_wflhupi = "*", ixs_su_od_wflhupi = "*", ixs_su_do_wflhupi = "*", ixs_fun_do_wflhupi = "*", NepredanoFunkciSamaNaSebeWflhupi = "*", ixb_wflsepx = "*", SOhledemNaAgendu = "*", DatumovyIntervalValue = "*", DatumovyIntervalFactor = "*", Vlastni = "*", IxsFunPredavajici = "*", IxsSuPredavajici = "*", IxsOrjPredavajici = "*", IxsFunPrebirajici = "*", IxsSuPrebirajici = "*", IxsOrjPrebirajici = "*", RedistribucePredavajiciVlastnictvi = "*", RedistribucePrebirajiciVlastnictvi = "*", IDokumentyNaCeste = "*", dat_vyriz_do_wflsdcj = "*", stav_cj_wflsdcj = "*", sslden_wflsdcj = "*", rok_wflsdcj = "*", por_cislo_wflsdcj = "*", DokumentAktualnihoUzlu = "*", IxsFunVsechnyFunkcePrebirajiciho = "*", ProEkoAgendy = "*", KategorieTypuDokumentuDleTypuAgendy = "*", ico_status = "*", ixs_car_wflspri = "*", ixs_skr = "*", ixs_obd = "*", por_cislo_obd = "*", dat_prenosu = "*", dat_znepristupneni = "*", rok_kon_spu = "*", VlastnictviVsechnyFunkceReferenta = "*", PrehledRedistribuceTyp = "*", PrehledRedistribuceSubjectIxs = "*", PrehledRedistribuceSubjectTypeIxs = "*", PrehledRedistribuceIxsSuDo = "*", PrehledRedistribuceIxsFunDo = "*", PrehledRedistribuceIxsFunOd = "*", PrehledRedistribuceCileneNotFyzicky = "*", PrehledRedistribuceDateInterval = "*", FILTER_GROUP_WFLSIXP = "*", ixp = "*", lic = "*", rok = "*", status_pis = "*", typ_duv_del = "*", dat_del = "*",}
	const enum GSpisFilterDtoTypes { FILTER_GROUP_SSLSDCJ = "string", sslden = "GBaseFilter<string>", rok_sslsdcj = "GBaseFilter<number>", por_cislo = "GBaseFilter<number>", cj_ext = "GBaseFilter<string>", ixp_init = "GBaseFilter<string>", ixp_vyriz = "GBaseFilter<string>", ixs_su = "GBaseFilter<string>", zkratka_su = "GBaseFilter<string>", pocet_pis = "GBaseFilter<number>", pocet_vlozenych_dok = "GBaseFilter<number>", dat_zal = "GBaseFilter<JsonDate>", ixs_zmp_zal = "GBaseFilter<string>", znacka_odes = "GBaseFilter<string>", ixp_prior = "GBaseFilter<string>", s_prior = "number[]", kl_slova = "GBaseFilter<string>", zp_vyriz = "GBaseFilter<string>", stav_spis = "number[]", odeslano_listu = "GBaseFilter<number>", ulozeno_listu = "GBaseFilter<number>", sv_priloh = "GBaseFilter<string>", velikost_el = "GBaseFilter<JsonDecimal>", ixs_tss = "GBaseFilter<string>", ixp_nad = "GBaseFilter<string>", ixp_top_slozka = "GBaseFilter<string>", s_po_term = "number[]", cj_souv_txt = "string", priz_zsch = "number[]", priz_akt = "number", osc = "string", prav_kval = "string", zakon_c = "string", znacka_ts = "string", dat_vyriz_do_sslsdcj = "GIntervalDto<JsonDate>", SpisAktualnihoUzlu = "boolean", SpisAktualnihoUzluOdDo = "GIntervalDto<JsonDate>", FILTER_GROUP_SSLSPID = "string", obsah_text = "GBaseFilter<string>", poznamka = "GBaseFilter<string>", poc_kopii = "GBaseFilter<number>", dat_prij_pod = "GBaseFilter<JsonDate>", ixs_su_pod = "GBaseFilter<string>", dat_evid = "GBaseFilter<JsonDate>", cj_spis = "GBaseFilter<string>", odeslano_kam = "GBaseFilter<string>", s_resitel = "number", ixs_fun_resitel = "GBaseFilter<string>", s_vyriz = "number", typ_vyriz = "Gordic.Ginis.DbModel.GSslctvyEnum[]", vyriz_komu = "GBaseFilter<string>", vyriz_pozn = "GBaseFilter<string>", ixs_zmp_vyriz = "GBaseFilter<string>", ixs_fun_schval = "GBaseFilter<string>", ixs_zmp_schval = "GBaseFilter<string>", s_uzav = "number", dat_uzav = "GBaseFilter<JsonDate>", ixs_zmp_uzav = "GBaseFilter<string>", s_stor = "number", s_ztrat = "number", vztah_spis = "Gordic.Ginis.DbModel.GSslcvspEnum[]", pr_moc = "GBaseFilter<number>", dat_pr_moc = "GBaseFilter<JsonDate>", s_agp = "number", s_zastav = "number", dat_vykonav = "GBaseFilter<JsonDate>", obsah_text_slozeny = "GBaseFilter<string>", SubjektIxs = "string", SubjektTypeIxs = "Gordic.Gin.Interface.IxsType", SubjectStructOrg = "Gordic.Gin.Interface.SubjectStructOrgEnum", FILTER_GROUP_WFLSPID = "string", ixp_spis = "GBaseFilter<string>", priz_spis = "Gordic.Ginis.DbModel.GWflcpriEnum[]", ixs_fun_akt = "string[]", ixs_su_akt = "string[]", nazev = "GBaseFilter<string>", akt_znacka = "GBaseFilter<string>", stav_dist = "Gordic.Ginis.DbModel.GWflcstaEnum[]", stav_pis = "Gordic.Ginis.DbModel.GWflcstpEnum[]", typ_ag = "number[]", ktg_typ = "GBaseFilter<number>", ixs_typ = "string[]", s_prij = "Gordic.Ginis.DbModel.GWflcsprEnum[]", s_ssl = "Gordic.Ginis.DbModel.GWflcsslEnum[]", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "string", s_ele = "Gordic.Ginis.DbModel.GWflceleEnum[]", s_fyz = "Gordic.Ginis.DbModel.GWflcfyzEnum[]", misto_vzniku = "GBaseFilter<string>", s_sgn = "Gordic.Ginis.DbModel.GWflcsgnEnum[]", dat_pod = "GIntervalDto<JsonDate>", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string[]", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string[]", s_uloz = "number", dat_uloz = "GBaseFilter<JsonDate>", ixs_su_wfl = "string[]", s_odes = "number", priz_cj = "Gordic.Ginis.DbModel.GWflcpcjEnum[]", dat_vyriz = "GIntervalDto<JsonDate>", ixs_cj = "string", puvod = "Gordic.Ginis.DbModel.GWflcpuvEnum[]", s_schval = "number", umisteni = "string", st_utaj_id = "number", st_utaj_id_orig = "Gordic.Ginis.DbModel.GGincstuEnum[]", skar_znak = "GBaseFilter<string>", skar_lhuta = "GBaseFilter<number>", rok_spo_uda = "GBaseFilter<number>", ixp_top = "GBaseFilter<string>", typ_spis = "Gordic.Ginis.DbModel.GWflctysEnum[]", barcode = "GBaseFilter<string>", skar_lhuta_spra = "GBaseFilter<number>", ixs_ext = "GBaseFilter<string>", rok_skartace = "GBaseFilter<number>", ixs_spu = "GBaseFilter<string>", poc_listu = "GBaseFilter<string>", poc_stran = "GBaseFilter<number>", poc_kop = "GBaseFilter<number>", poc_priloh = "GBaseFilter<number>", poc_l_priloh = "GBaseFilter<string>", cj = "GBaseFilter<string>", ico = "GBaseFilter<string>", ixs_zup = "string", dat_mpd0 = "GBaseFilter<JsonDate>", ixs_lpc = "GBaseFilter<string>", uziv_sl_a = "GBaseFilter<string>", uziv_sl_a2 = "GBaseFilter<string>", uziv_sl_a3 = "GBaseFilter<string>", uziv_sl_b = "GBaseFilter<string>", uziv_sl_b2 = "GBaseFilter<string>", uziv_sl_b3 = "GBaseFilter<string>", uziv_sl_c = "GBaseFilter<string>", uziv_sl_c2 = "GBaseFilter<string>", uziv_sl_d = "GBaseFilter<string>", uziv_sl_d2 = "GBaseFilter<string>", uziv_sl_j = "GBaseFilter<string>", uziv_sl_j2 = "GBaseFilter<string>", uziv_sl_k = "GBaseFilter<string>", uziv_sl_k2 = "GBaseFilter<string>", uziv_sl_n = "GBaseFilter<string>", dat_dtermin = "JsonDate", priz_kop = "number", priz_kopie = "string", stav_epk_txt = "string", typ_pozad_pod_txt = "string", dat_vyriz_do = "GIntervalDto<JsonDate>", zp_vyriz_txt = "string", s_orig = "number", fulltext = "string", VyrizenaZadostVRak = "boolean", DilciTermin = "GIntervalDto<JsonDate>", ixs_fun_akt_wflstop = "string[]", ixs_su_akt_wflstop = "string[]", ixs_fun_cil_wflstop = "string[]", ixs_su_do_wflstop = "string[]", ixs_su_cil_wflhtop = "string[]", ixs_fun_cil_wflhtop = "string[]", dat_cil_wflhtop = "GIntervalDto<JsonDate>", stav_top_wflhtop = "GBaseFilter<number>", ixs_su_start_wflhtop = "string[]", ixs_fun_start_wflhtop = "string[]", dat_zmena_wflhupi = "GIntervalDto<JsonDate>", typ_upi_wflhupi = "GBaseFilter<number>", priz_spis_wflhupi = "GBaseFilter<number>", ixs_fun_od_wflhupi = "string[]", ixs_su_od_wflhupi = "string[]", ixs_su_do_wflhupi = "string[]", ixs_fun_do_wflhupi = "string[]", NepredanoFunkciSamaNaSebeWflhupi = "boolean", ixb_wflsepx = "GBaseFilter<string>", SOhledemNaAgendu = "boolean", DatumovyIntervalValue = "GIntervalDto<JsonDate>", DatumovyIntervalFactor = "'DP' | 'DV' | 'DZ'", Vlastni = "boolean", IxsFunPredavajici = "string", IxsSuPredavajici = "string", IxsOrjPredavajici = "string", IxsFunPrebirajici = "string", IxsSuPrebirajici = "string", IxsOrjPrebirajici = "string", RedistribucePredavajiciVlastnictvi = "Gordic.Gin.Interface.SubjektSelectedInfo", RedistribucePrebirajiciVlastnictvi = "Gordic.Gin.Interface.SubjektSelectedInfo", IDokumentyNaCeste = "boolean", dat_vyriz_do_wflsdcj = "GIntervalDto<JsonDate>", stav_cj_wflsdcj = "number[]", sslden_wflsdcj = "GBaseFilter<string>", rok_wflsdcj = "GBaseFilter<number>", por_cislo_wflsdcj = "GBaseFilter<number>", DokumentAktualnihoUzlu = "boolean", IxsFunVsechnyFunkcePrebirajiciho = "string", ProEkoAgendy = "boolean", KategorieTypuDokumentuDleTypuAgendy = "number", ico_status = "number", ixs_car_wflspri = "GBaseFilter<string>", ixs_skr = "GBaseFilter<string>", ixs_obd = "GBaseFilter<string>", por_cislo_obd = "GBaseFilter<number>", dat_prenosu = "GIntervalDto<JsonDate>", dat_znepristupneni = "GIntervalDto<JsonDate>", rok_kon_spu = "GBaseFilter<number>", VlastnictviVsechnyFunkceReferenta = "boolean", PrehledRedistribuceTyp = "number", PrehledRedistribuceSubjectIxs = "string", PrehledRedistribuceSubjectTypeIxs = "number", PrehledRedistribuceIxsSuDo = "string", PrehledRedistribuceIxsFunDo = "string", PrehledRedistribuceIxsFunOd = "string", PrehledRedistribuceCileneNotFyzicky = "boolean", PrehledRedistribuceDateInterval = "Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto", FILTER_GROUP_WFLSIXP = "string", ixp = "GBaseFilter<string>", lic = "GBaseFilter<string>", rok = "GBaseFilter<number>", status_pis = "Gordic.Ginis.DbModel.GWflcumpEnum[]", typ_duv_del = "Gordic.Ginis.DbModel.GWflctddEnum[]", dat_del = "GIntervalDto<JsonDate>",}
	const enum GSpisFilterDtoTypeLengths { sslden = 7, cj_ext = 10, zkratka_su = 16, znacka_odes = 50, kl_slova = 254, zp_vyriz = 15, sv_priloh = 10, cj_souv_txt = 50, osc = 100, prav_kval = 100, zakon_c = 20, znacka_ts = 50, obsah_text = 254, poznamka = 100, cj_spis = 50, odeslano_kam = 100, vyriz_komu = 100, vyriz_pozn = 254, nazev = 100, akt_znacka = 50, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, umisteni = 20, skar_znak = 2, barcode = 50, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, uziv_sl_a = 254, uziv_sl_a2 = 254, uziv_sl_a3 = 254, uziv_sl_b = 254, uziv_sl_b2 = 254, uziv_sl_b3 = 254, uziv_sl_c = 254, uziv_sl_c2 = 254, uziv_sl_d = 254, uziv_sl_d2 = 254, uziv_sl_j = 254, uziv_sl_j2 = 254, uziv_sl_k = 254, uziv_sl_k2 = 254, uziv_sl_n = 254, sslden_wflsdcj = 7, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GSsldospDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:ssldosp*/
	interface GSsldospDto {
		/**The fragment ssldosp*/
		FRAGMENT_SSLDOSP?: string|null;
		/**The fragment ssldosp*/
		FRAGMENT_ZMENU_PROVEDL?: string|null;
		/**DBCOLUMN:ssldosp.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:ssldosp.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:ssldosp.stav_pre*/
		stav_pre?: number|null;
		/**DBCOLUMN:ssldosp.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:ssldosp.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:ssldosp.delka_odl*/
		delka_odl?: number|null;
		/**DBCOLUMN:ssldosp.duvod*/
		duvod?: string|null;
		/**DBCOLUMN:ssldosp.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ssldosp.ixs_zmp_zal*/
		ixs_zmp_zal?: string|null;
		/**DBCOLUMN:ssldosp.ixs_zmp_zru*/
		ixs_zmp_zru?: string|null;
		/**DBCOLUMN:ssldosp.dat_do_orig*/
		dat_do_orig?: JsonDate|null;
		/**Autor posledního přerušení.*/
		ZmenuProvedlZalozeni?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Autor posledního obnovení.*/
		ZmenuProvedlZruseni?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GSsldospDtoNames { FRAGMENT_SSLDOSP = "FRAGMENT_SSLDOSP", FRAGMENT_ZMENU_PROVEDL = "FRAGMENT_ZMENU_PROVEDL", ixp_spis = "ixp_spis", por_cislo = "por_cislo", stav_pre = "stav_pre", dat_od = "dat_od", dat_do = "dat_do", delka_odl = "delka_odl", duvod = "duvod", poznamka = "poznamka", ixs_zmp_zal = "ixs_zmp_zal", ixs_zmp_zru = "ixs_zmp_zru", dat_do_orig = "dat_do_orig", ZmenuProvedlZalozeni = "ZmenuProvedlZalozeni", ZmenuProvedlZruseni = "ZmenuProvedlZruseni",}
	const enum GSsldospDtoFragments { FRAGMENT_SSLDOSP = "*", FRAGMENT_ZMENU_PROVEDL = "*", ixp_spis = "*", por_cislo = "*", stav_pre = "SSLDOSP", dat_od = "SSLDOSP", dat_do = "SSLDOSP", delka_odl = "SSLDOSP", duvod = "SSLDOSP", poznamka = "SSLDOSP", ixs_zmp_zal = "SSLDOSP", ixs_zmp_zru = "SSLDOSP", dat_do_orig = "SSLDOSP", ZmenuProvedlZalozeni = "ZMENU_PROVEDL", ZmenuProvedlZruseni = "ZMENU_PROVEDL",}
	const enum GSsldospDtoTypes { FRAGMENT_SSLDOSP = "string", FRAGMENT_ZMENU_PROVEDL = "string", ixp_spis = "string", por_cislo = "number", stav_pre = "number", dat_od = "JsonDate", dat_do = "JsonDate", delka_odl = "number", duvod = "string", poznamka = "string", ixs_zmp_zal = "string", ixs_zmp_zru = "string", dat_do_orig = "JsonDate", ZmenuProvedlZalozeni = "Gordic.Gin.Interface.GGinszmpDto", ZmenuProvedlZruseni = "Gordic.Gin.Interface.GGinszmpDto",}
	const enum GSsldospDtoTypeLengths { ixp_spis = 12, duvod = 254, poznamka = 254, ixs_zmp_zal = 12, ixs_zmp_zru = 12,}
	/**GSsldospFilter*/
	const enum GSsldospFilter {
		/**DBCOLUMN:ssldosp.ixp_spis*/
		ixp_spis,
		/**DBCOLUMN:ssldosp.por_cislo*/
		por_cislo,
		/**DBCOLUMN:ssldosp.stav_pre*/
		stav_pre,
		/**DBCOLUMN:ssldosp.dat_od*/
		dat_od,
		/**DBCOLUMN:ssldosp.dat_do*/
		dat_do,
		/**DBCOLUMN:ssldosp.delka_odl*/
		delka_odl,
		/**DBCOLUMN:ssldosp.duvod*/
		duvod,
		/**DBCOLUMN:ssldosp.poznamka*/
		poznamka,
		/**DBCOLUMN:ssldosp.ixs_zmp_zal*/
		ixs_zmp_zal,
		/**DBCOLUMN:ssldosp.ixs_zmp_zru*/
		ixs_zmp_zru,
		/**DBCOLUMN:ssldosp.dat_do_orig*/
		dat_do_orig,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GSslspidDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**GSslspidDto.*/
	interface GSslspidDto extends Gordic.Wfl.Interface.GWflspidDto {
		/**Spis, ve kterém je dokument vložen. (data z tabulky wflspid)*/
		Spis?: Gordic.Ssl.Interface.GSpisDto|null;
		/**Spisový uzel který podal.*/
		SpisovyUzelPod?: Gordic.Gin.Interface.GGinspodDto|null;
		/**Spis, ke kterému je dokument přiřazen.*/
		SpisPrirazeny?: Gordic.Ssl.Interface.GSpisDto|null;
		/**Identifikátor originálu.*/
		IdentifikatorOriginalu?: string|null;
		/**Ixp spisu, ve kterém byla písemnost naposledy vložena.*/
		IxpPoslednihoSpisu?: string|null;
		/**Zda byl dokument ve spisu. true, pokuď byl dokument někdy v minulosti ve spisu, jinak false.*/
		VMinulostiVeSpisu?: boolean|null;
		/**Obrázek pro zobrazení na detailu.*/
		ObrazekNaDetailu?: Gordic.Ssl.Interface.DokumentObrazekNaDetailu|null;
		/**Kopie.*/
		Kopie?: Gordic.Ssl.Interface.SeznamKopiiDokumentuDto[]|null;
		/**Věc podrobně (první část).*/
		obsah_text?: string|null;
		/**Věc podrobně (druhá část).*/
		obsah_text_2?: string|null;
		/**Věc podrobně (třetí část).*/
		obsah_text_3?: string|null;
		/**Věc podrobně (čtvrtá část).*/
		obsah_text_4?: string|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**Počet kopií písemnosti v ssl (tlačítko kopie).*/
		poc_kopii?: number|null;
		/**Datum příjmu dokumentu.*/
		dat_prij_pod?: JsonDate|null;
		/**Identifikátor spisového uzlu který podal.*/
		ixs_su_pod?: string|null;
		/**Datum evidence.*/
		dat_evid?: JsonDate|null;
		/**Spisová značka spisu, ve které je dokument vložený.*/
		cj_spis?: string|null;
		/**Název subjektu, kterému byl dokument odeslán.*/
		odeslano_kam?: string|null;
		/**Příznak, zda má řešitele.*/
		s_resitel?: number|null;
		/**Identifikátor funkce řešitele.*/
		ixs_fun_resitel?: string|null;
		/**Příznak, zda je vyřízeno.*/
		s_vyriz?: number|null;
		/**Typ vyřízení.*/
		typ_vyriz?: Gordic.Ginis.DbModel.GSslctvyEnum|null;
		/**Popis jak bylo vyřízeno.*/
		vyriz_komu?: string|null;
		/**Poznámka k vyřízení*/
		vyriz_pozn?: string|null;
		/**Identifikátor kdo provedl změnu při vyřizování.*/
		ixs_zmp_vyriz?: string|null;
		/**Identifikátor schvalovatele.*/
		ixs_fun_schval?: string|null;
		/**Identifikátor subjektu, který naposledy změnil schválení.*/
		ixs_zmp_schval?: string|null;
		/**Příznak uzavření.*/
		s_uzav?: number|null;
		/**Datum uzavření.*/
		dat_uzav?: JsonDate|null;
		/**Identifikátor kdo poslední provedl změnu uzavření.*/
		ixs_zmp_uzav?: string|null;
		/**Příznak stornování.*/
		s_stor?: number|null;
		/**Příznak ztracení.*/
		s_ztrat?: number|null;
		/**Externí stav dokumentu.*/
		stav_pis_ext?: number|null;
		/**Vztah písemnosti ke spisu.*/
		vztah_spis?: Gordic.Ginis.DbModel.GSslcvspEnum|null;
		/**Zda má nabytou právní moc.*/
		pr_moc?: number|null;
		/**Datum nabytí právní moci.*/
		dat_pr_moc?: JsonDate|null;
		/**Příznak rozšířeního (agendového) profilu.*/
		s_agp?: number|null;
		/**Příznak zastavení.*/
		s_zastav?: number|null;
		/**Datum vykonavatelnosti.*/
		dat_vykonav?: JsonDate|null;
		/**Věc podrobně pro použití v seznamu (obsahuje prvnich 254 znaků věci podrobně - sloupec obsah_text s odstranenym odradkovanim).*/
		ObsahTextProSeznam?: string|null;
		/**Zda je vyplněn schvalovatel.*/
		SSchvalSsl?: number|null;
		/**Balík, ve kterém je dokument.*/
		Balik?: Gordic.Spi.Interface.GBalikDto|null;
		/**Pořadové číslo dokumentu ve spisu, není-li to dokument v spisu, je GInt32.Null.*/
		PorCisloVSpisu?: number|null;
		/**Funkce řešitele.*/
		Resitel?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**Kdo provedl změnu při vyřizování.*/
		ZmenuProvedlVyriz?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Schvalovatel.*/
		Schvalovatel?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**Subjekt, který naposledy změnil schválení.*/
		Schvalil?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Kdo poslední provedl změnu uzavření.*/
		Uzavrel?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Oprávnění.*/
		Permissions?: Gordic.Ssl.Interface.GSslspidPermissionsDto|null;
	}
	const enum GSslspidDtoNames { Spis = "Spis", SpisovyUzelPod = "SpisovyUzelPod", SpisPrirazeny = "SpisPrirazeny", IdentifikatorOriginalu = "IdentifikatorOriginalu", IxpPoslednihoSpisu = "IxpPoslednihoSpisu", VMinulostiVeSpisu = "VMinulostiVeSpisu", ObrazekNaDetailu = "ObrazekNaDetailu", Kopie = "Kopie", obsah_text = "obsah_text", obsah_text_2 = "obsah_text_2", obsah_text_3 = "obsah_text_3", obsah_text_4 = "obsah_text_4", poznamka = "poznamka", poc_kopii = "poc_kopii", dat_prij_pod = "dat_prij_pod", ixs_su_pod = "ixs_su_pod", dat_evid = "dat_evid", cj_spis = "cj_spis", odeslano_kam = "odeslano_kam", s_resitel = "s_resitel", ixs_fun_resitel = "ixs_fun_resitel", s_vyriz = "s_vyriz", typ_vyriz = "typ_vyriz", vyriz_komu = "vyriz_komu", vyriz_pozn = "vyriz_pozn", ixs_zmp_vyriz = "ixs_zmp_vyriz", ixs_fun_schval = "ixs_fun_schval", ixs_zmp_schval = "ixs_zmp_schval", s_uzav = "s_uzav", dat_uzav = "dat_uzav", ixs_zmp_uzav = "ixs_zmp_uzav", s_stor = "s_stor", s_ztrat = "s_ztrat", stav_pis_ext = "stav_pis_ext", vztah_spis = "vztah_spis", pr_moc = "pr_moc", dat_pr_moc = "dat_pr_moc", s_agp = "s_agp", s_zastav = "s_zastav", dat_vykonav = "dat_vykonav", ObsahTextProSeznam = "ObsahTextProSeznam", SSchvalSsl = "SSchvalSsl", Balik = "Balik", PorCisloVSpisu = "PorCisloVSpisu", Resitel = "Resitel", ZmenuProvedlVyriz = "ZmenuProvedlVyriz", Schvalovatel = "Schvalovatel", Schvalil = "Schvalil", Uzavrel = "Uzavrel", Permissions = "Permissions", typ_ag_txt = "typ_ag_txt", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", st_utaj_id_orig = "st_utaj_id_orig", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", ixp_spis_prir = "ixp_spis_prir", ixs_skr = "ixs_skr", ixs_obd = "ixs_obd", por_cislo_obd = "por_cislo_obd", dat_prenosu = "dat_prenosu", dat_znepristupneni = "dat_znepristupneni", rok_kon_spu = "rok_kon_spu", StavSul = "StavSul", PrizSkn = "PrizSkn", PrizVyp = "PrizVyp", IdExtArch = "IdExtArch", PrizVBaliku = "PrizVBaliku", ixs_zup = "ixs_zup", ZupStavSul = "ZupStavSul", PrilohaHlavni = "PrilohaHlavni", Prilohy = "Prilohy", PrilohyElektronicke = "PrilohyElektronicke", EpkDokument = "EpkDokument", SkartacniZnak = "SkartacniZnak", VecnaSkupina = "VecnaSkupina", UzivatelskaPoznamka = "UzivatelskaPoznamka", Rak = "Rak", PopisSpoUda = "PopisSpoUda", DuvodPozSkar = "DuvodPozSkar", PrizPozSkar = "PrizPozSkar", RokDoPozSkar = "RokDoPozSkar", StavPisSpis = "StavPisSpis", dat_mpd0 = "dat_mpd0", ixs_lpc = "ixs_lpc", uziv_sl_a = "uziv_sl_a", uziv_sl_a2 = "uziv_sl_a2", uziv_sl_a3 = "uziv_sl_a3", uziv_sl_b = "uziv_sl_b", uziv_sl_b2 = "uziv_sl_b2", uziv_sl_b3 = "uziv_sl_b3", uziv_sl_c = "uziv_sl_c", uziv_sl_c2 = "uziv_sl_c2", uziv_sl_d = "uziv_sl_d", uziv_sl_d2 = "uziv_sl_d2", uziv_sl_j = "uziv_sl_j", uziv_sl_j2 = "uziv_sl_j2", uziv_sl_k = "uziv_sl_k", uziv_sl_k2 = "uziv_sl_k2", uziv_sl_n = "uziv_sl_n", HistorieZmen = "HistorieZmen", AktualniRedistribuce = "AktualniRedistribuce", HistorieRedistribuce = "HistorieRedistribuce", HistoriePoznamek = "HistoriePoznamek", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", termin_ico = "termin_ico", dat_dtermin = "dat_dtermin", doplnujici_informace_ico = "doplnujici_informace_ico", priz_kop = "priz_kop", priz_kopie = "priz_kopie", stav_epk0 = "stav_epk0", stav_epk_txt = "stav_epk_txt", typ_pozad_pod_txt = "typ_pozad_pod_txt", epk_po_pozad_vyr = "epk_po_pozad_vyr", dat_vyriz_do = "dat_vyriz_do", dat_vyriz_do_wflsdcj = "dat_vyriz_do_wflsdcj", dat_vyriz_do_sslsdcj = "dat_vyriz_do_sslsdcj", TerminVyrizeni = "TerminVyrizeni", ZpVyrizTxtDleIxsCj = "ZpVyrizTxtDleIxsCj", Vlastnictvi = "Vlastnictvi", vlastnik = "vlastnik", CoJsemZac = "CoJsemZac", VlastnikFunkce = "VlastnikFunkce", VlastnikSpisovyUzel = "VlastnikSpisovyUzel", Sslstyp = "Sslstyp", ZmenuProvedl = "ZmenuProvedl", SpisovyPlan = "SpisovyPlan", SpisovyZnak = "SpisovyZnak", VlastnikAgendovyFunkce = "VlastnikAgendovyFunkce", VlastnikAgendovySpisovyUzel = "VlastnikAgendovySpisovyUzel", CisloJednaci = "CisloJednaci", UmisteniData = "UmisteniData", Nazev__sslstyp = "Nazev__sslstyp", Predano__uzlu = "Predano__uzlu", Predano__osobe = "Predano__osobe", Predano__od__osoby = "Predano__od__osoby", TypSpousteciUdalosti = "TypSpousteciUdalosti", PrizKonfliktSka = "PrizKonfliktSka", StavVytezezniElektronickehoObrazu = "StavVytezezniElektronickehoObrazu", IxpTss = "IxpTss", DotceneSubjekty = "DotceneSubjekty", KlicovaSlova = "KlicovaSlova", Formulare = "Formulare", Doruceni = "Doruceni", Redistribuce = "Redistribuce", Souvisejici = "Souvisejici", s_orig = "s_orig", priz_dupli = "priz_dupli", TypAgendy = "TypAgendy", Vlastnosti = "Vlastnosti", PoznamkaPosledni = "PoznamkaPosledni", ico_status = "ico_status", UlozenoListu = "UlozenoListu", UrovenPristupu = "UrovenPristupu", priz_zob_zast = "priz_zob_zast", ext_akt_znacka = "ext_akt_znacka", CislaJednaciHistoricka = "CislaJednaciHistoricka", Wflszne = "Wflszne", ixp = "ixp", lic = "lic", rok = "rok", status_pis = "status_pis", typ_duv_del = "typ_duv_del", dat_del = "dat_del",}
	const enum GSslspidDtoFragments { Spis = "SPIS", SpisovyUzelPod = "SPISOVY_UZEL_PODAL", SpisPrirazeny = "SPIS_PRIRAZENY", IdentifikatorOriginalu = "IDENTIFIKATOR_ORIGINALU", IxpPoslednihoSpisu = "IXP_POSLEDNIHO_SPISU", VMinulostiVeSpisu = "V_MINULOSTI_VE_SPISU", ObrazekNaDetailu = "OBRAZEK_NA_DETAILU", Kopie = "KOPIE", obsah_text = "SSLSPID", obsah_text_2 = "SSLSPID", obsah_text_3 = "SSLSPID", obsah_text_4 = "SSLSPID", poznamka = "SSLSPID", poc_kopii = "SSLSPID", dat_prij_pod = "SSLSPID", ixs_su_pod = "SSLSPID", dat_evid = "SSLSPID", cj_spis = "SSLSPID", odeslano_kam = "SSLSPID", s_resitel = "SSLSPID", ixs_fun_resitel = "SSLSPID", s_vyriz = "SSLSPID", typ_vyriz = "SSLSPID", vyriz_komu = "SSLSPID", vyriz_pozn = "SSLSPID", ixs_zmp_vyriz = "SSLSPID", ixs_fun_schval = "SSLSPID", ixs_zmp_schval = "SSLSPID", s_uzav = "SSLSPID", dat_uzav = "SSLSPID", ixs_zmp_uzav = "SSLSPID", s_stor = "SSLSPID", s_ztrat = "SSLSPID", stav_pis_ext = "SSLSPID", vztah_spis = "SSLSPID", pr_moc = "SSLSPID", dat_pr_moc = "SSLSPID", s_agp = "SSLSPID", s_zastav = "SSLSPID", dat_vykonav = "SSLSPID", ObsahTextProSeznam = "SSLSPID", SSchvalSsl = "SSLSPID", Balik = "BALIK", PorCisloVSpisu = "SPIS_PORADI", Resitel = "RESITEL", ZmenuProvedlVyriz = "ZMENU_PROVEDL_VYRIZ", Schvalovatel = "SCHVALOVATEL", Schvalil = "ZMENU_PROVEDL_SCHVALIL", Uzavrel = "ZMENU_PROVEDL_UZAVREL", Permissions = "PERMISSIONS", typ_ag_txt = "WFLSIXP", ixp_spis = "WFLSPID", priz_spis = "WFLSPID", ixs_fun_akt = "WFLSPID", ixs_su_akt = "WFLSPID", nazev = "WFLSPID", akt_znacka = "WFLSPID", stav_dist = "WFLSPID", stav_pis = "WFLSPID", typ_ag = "WFLSPID", ktg_typ = "WFLSPID", ixs_typ = "WFLSPID", s_prij = "WFLSPID", s_ssl = "WFLSPID", dat_zmena = "WFLSPID", zmenu_prov = "WFLSPID", s_ele = "WFLSPID", s_fyz = "WFLSPID", misto_vzniku = "WFLSPID", s_sgn = "WFLSPID", dat_pod = "WFLSPID", cs_akt_znacka = "WFLSPID", priz_view_ssl = "WFLSPID", uzo = "WFLSPID", spis_pl = "WFLSPID", spis_znak = "WFLSPID", ixs_fun_wfl = "WFLSPID", s_uloz = "WFLSPID", dat_uloz = "WFLSPID", ixs_su_wfl = "WFLSPID", s_odes = "WFLSPID", priz_cj = "WFLSPID", dat_vyriz = "WFLSPID", ixs_cj = "WFLSPID", puvod = "WFLSPID", s_schval = "WFLSPID", umisteni = "WFLSPID", st_utaj_id = "WFLSPID", st_utaj_id_orig = "WFLSPID", skar_znak = "WFLSPID", skar_lhuta = "WFLSPID", rok_spo_uda = "WFLSPID", ixs_vsk = "WFLSPID", ixp_top = "WFLSPID", ixp_soucast = "WFLSPID", typ_spis = "WFLSPID", barcode = "WFLSPID", skar_lhuta_spra = "WFLSPID", ixs_ext = "WFLSPID", rok_skartace = "WFLSPID", ixs_spu = "WFLSPID", poc_listu = "WFLSPID", poc_stran = "WFLSPID", poc_kop = "WFLSPID", poc_priloh = "WFLSPID", poc_l_priloh = "WFLSPID", cj = "WFLSPID", ico = "WFLSPID", ixp_spis_prir = "WFLSPID", ixs_skr = "ZNEPRISTUPNENI", ixs_obd = "ZNEPRISTUPNENI", por_cislo_obd = "ZNEPRISTUPNENI", dat_prenosu = "ZNEPRISTUPNENI", dat_znepristupneni = "ZNEPRISTUPNENI", rok_kon_spu = "ZNEPRISTUPNENI", StavSul = "SPISOVNA", PrizSkn = "SPISOVNA", PrizVyp = "SPISOVNA", IdExtArch = "SPISOVNA", PrizVBaliku = "SPISOVNA_V_BALIKU", ixs_zup = "SPISOVNA", ZupStavSul = "SPISOVNA", PrilohaHlavni = "PRILOHA_HLAVNI", Prilohy = "PRILOHY", PrilohyElektronicke = "PRILOHY_ELEKTRONICKE", EpkDokument = "EPK", SkartacniZnak = "SKARTACNI_ZNAK", VecnaSkupina = "VECNA_SKUPINA", UzivatelskaPoznamka = "UZIVATELSKA_POZNAMKA", Rak = "RAK", PopisSpoUda = "SPOUSTECI_UDALOST", DuvodPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", PrizPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", RokDoPozSkar = "POZASTAVENI_SKARTACNI_OPERACE", StavPisSpis = "SPIS_STAV", dat_mpd0 = "SERVISNI", ixs_lpc = "SERVISNI", uziv_sl_a = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_a2 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_a3 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b2 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_b3 = "UZIVATELSKE_SLOUPCE_SEZNAM", uziv_sl_c = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_c2 = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_d = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_d2 = "UZIVATELSKE_SLOUPCE_HLEDANI", uziv_sl_j = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_j2 = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_k = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_k2 = "UZIVATELSKE_SLOUPCE_DETAIL", uziv_sl_n = "UZIVATELSKE_SLOUPCE_DETAIL", HistorieZmen = "HISTORIE_ZMEN", AktualniRedistribuce = "AKTUALNI_REDISTRIBUCE", HistorieRedistribuce = "HISTORIE_REDISTRIBUCE", HistoriePoznamek = "HISTORIE_POZNAMEK", typ_entity_ico = "TYP_ENTITY_ICON", vlastnictvi_doruceni_ico = "NOT-USED", technicke_vlastnosti_ico = "TECHNICKE_VLASTNOSTI_ICON", pozice_spis_ico = "POZICE_SPIS_ICON", stav_zpracovani_ico = "STAV_ZPRACOVANI_ICON", vlastnictvi_redistribuce_ico = "NOT-USED", termin_ico = "TERMIN_ICON", dat_dtermin = "DILCI_TERMIN", doplnujici_informace_ico = "DOPLNUJICI_INFORMACE_ICON", priz_kop = "PRIZNAK_KOPIE", priz_kopie = "PRIZNAK_KOPIE", stav_epk0 = "EPK_TXT", stav_epk_txt = "EPK_TXT", typ_pozad_pod_txt = "EPK_TXT", epk_po_pozad_vyr = "EPK_AVIZACE", dat_vyriz_do = "DATUM_VYRIZENI", dat_vyriz_do_wflsdcj = "DATUM_VYRIZENI", dat_vyriz_do_sslsdcj = "DATUM_VYRIZENI", TerminVyrizeni = "DATUM_VYRIZENI", ZpVyrizTxtDleIxsCj = "ZPUSOB_VYRIZENI", Vlastnictvi = "VLASTNICTVI", vlastnik = "VLASTNICTVI", CoJsemZac = "CO_JSEM_ZAC", VlastnikFunkce = "VLASTNIK_FUNKCE", VlastnikSpisovyUzel = "VLASTNIK_SPISOVY_UZEL", Sslstyp = "TYP_PISEMNOSTI", ZmenuProvedl = "ZMENU_PROVEDL", SpisovyPlan = "SPISOVY_PLAN", SpisovyZnak = "SPISOVY_ZNAK", VlastnikAgendovyFunkce = "VLASTNIK_AGENDOVY_FUNKCE", VlastnikAgendovySpisovyUzel = "VLASTNIK_AGENDOVY_SPISOVY_UZEL", CisloJednaci = "CISLO_JEDNACI", UmisteniData = "UMISTENI", Nazev__sslstyp = "WFLSPID", Predano__uzlu = "WFLSPID", Predano__osobe = "WFLSPID", Predano__od__osoby = "WFLSPID", TypSpousteciUdalosti = "TYP_SPOUSTECI_UDALOSTI", PrizKonfliktSka = "PRIZ_KONFLIKT_SKA", StavVytezezniElektronickehoObrazu = "STAV_VYTEZENI_ELEKTRONICKEHO_OBRAZU", IxpTss = "IXP_TSS", DotceneSubjekty = "DOTCENE_SUBJEKTY", KlicovaSlova = "KLICOVA_SLOVA", Formulare = "FORMULARE", Doruceni = "DORUCENI", Redistribuce = "REDISTRIBUCE", Souvisejici = "SOUVISEJICI", s_orig = "NOT-USED", priz_dupli = "PRIZ_DUPLI", TypAgendy = "TYP_AGENDY", Vlastnosti = "VLASTNOSTI", PoznamkaPosledni = "POZNAMKA_POSLEDNI", ico_status = "ICO_STATUS", UlozenoListu = "ULOZENO_LISTU", UrovenPristupu = "UROVEN_PRISTUPU", priz_zob_zast = "WFLSPID", ext_akt_znacka = "WFLSPID", CislaJednaciHistoricka = "CISLO_JEDNACI_HISTORICKA", Wflszne = "WFLSZNE", ixp = "*", lic = "WFLSIXP", rok = "WFLSIXP", status_pis = "WFLSIXP", typ_duv_del = "WFLSIXP", dat_del = "WFLSIXP",}
	const enum GSslspidDtoTypes { Spis = "Gordic.Ssl.Interface.GSpisDto", SpisovyUzelPod = "Gordic.Gin.Interface.GGinspodDto", SpisPrirazeny = "Gordic.Ssl.Interface.GSpisDto", IdentifikatorOriginalu = "string", IxpPoslednihoSpisu = "string", VMinulostiVeSpisu = "boolean", ObrazekNaDetailu = "Gordic.Ssl.Interface.DokumentObrazekNaDetailu", Kopie = "Gordic.Ssl.Interface.SeznamKopiiDokumentuDto[]", obsah_text = "string", obsah_text_2 = "string", obsah_text_3 = "string", obsah_text_4 = "string", poznamka = "string", poc_kopii = "number", dat_prij_pod = "JsonDate", ixs_su_pod = "string", dat_evid = "JsonDate", cj_spis = "string", odeslano_kam = "string", s_resitel = "number", ixs_fun_resitel = "string", s_vyriz = "number", typ_vyriz = "Gordic.Ginis.DbModel.GSslctvyEnum", vyriz_komu = "string", vyriz_pozn = "string", ixs_zmp_vyriz = "string", ixs_fun_schval = "string", ixs_zmp_schval = "string", s_uzav = "number", dat_uzav = "JsonDate", ixs_zmp_uzav = "string", s_stor = "number", s_ztrat = "number", stav_pis_ext = "number", vztah_spis = "Gordic.Ginis.DbModel.GSslcvspEnum", pr_moc = "number", dat_pr_moc = "JsonDate", s_agp = "number", s_zastav = "number", dat_vykonav = "JsonDate", ObsahTextProSeznam = "string", SSchvalSsl = "number", Balik = "Gordic.Spi.Interface.GBalikDto", PorCisloVSpisu = "number", Resitel = "Gordic.Gin.Interface.GFunkcniMistoDto", ZmenuProvedlVyriz = "Gordic.Gin.Interface.GGinszmpDto", Schvalovatel = "Gordic.Gin.Interface.GFunkcniMistoDto", Schvalil = "Gordic.Gin.Interface.GGinszmpDto", Uzavrel = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Ssl.Interface.GSslspidPermissionsDto", typ_ag_txt = "string", ixp_spis = "string", priz_spis = "Gordic.Ginis.DbModel.GWflcpriEnum", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "Gordic.Ginis.DbModel.GWflcstaEnum", stav_pis = "Gordic.Ginis.DbModel.GWflcstpEnum", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "Gordic.Ginis.DbModel.GWflcsprEnum", s_ssl = "Gordic.Ginis.DbModel.GWflcsslEnum", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "Gordic.Ginis.DbModel.GWflceleEnum", s_fyz = "Gordic.Ginis.DbModel.GWflcfyzEnum", misto_vzniku = "string", s_sgn = "Gordic.Ginis.DbModel.GWflcsgnEnum", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", priz_cj = "Gordic.Ginis.DbModel.GWflcpcjEnum", dat_vyriz = "JsonDate", ixs_cj = "string", puvod = "Gordic.Ginis.DbModel.GWflcpuvEnum", s_schval = "number", umisteni = "string", st_utaj_id = "number", st_utaj_id_orig = "Gordic.Ginis.DbModel.GGincstuEnum", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", typ_spis = "Gordic.Ginis.DbModel.GWflctysEnum", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string", ixp_spis_prir = "string", ixs_skr = "string", ixs_obd = "string", por_cislo_obd = "number", dat_prenosu = "JsonDate", dat_znepristupneni = "JsonDate", rok_kon_spu = "number", StavSul = "number", PrizSkn = "number", PrizVyp = "number", IdExtArch = "string", PrizVBaliku = "number", ixs_zup = "string", ZupStavSul = "number", PrilohaHlavni = "Gordic.Wfl.Interface.GEmptyDto", Prilohy = "Gordic.Wfl.Interface.GPrilohaDto[]", PrilohyElektronicke = "Gordic.Wfl.Interface.GPrilohaElektronickaDto[]", EpkDokument = "Gordic.Wfl.Interface.GDokumentWflEpkPriznakyDto", SkartacniZnak = "Gordic.Wfl.Interface.GSkartacniZnakDto", VecnaSkupina = "Gordic.Gin.Interface.GVecnaSkupinaDto", UzivatelskaPoznamka = "Gordic.Wfl.Interface.GUzivatelskaPoznamkaDto", Rak = "JsonDecimal", PopisSpoUda = "string", DuvodPozSkar = "string", PrizPozSkar = "number", RokDoPozSkar = "number", StavPisSpis = "number", dat_mpd0 = "JsonDate", ixs_lpc = "string", uziv_sl_a = "string", uziv_sl_a2 = "string", uziv_sl_a3 = "string", uziv_sl_b = "string", uziv_sl_b2 = "string", uziv_sl_b3 = "string", uziv_sl_c = "string", uziv_sl_c2 = "string", uziv_sl_d = "string", uziv_sl_d2 = "string", uziv_sl_j = "string", uziv_sl_j2 = "string", uziv_sl_k = "string", uziv_sl_k2 = "string", uziv_sl_n = "string", HistorieZmen = "Gordic.Wfl.Interface.GWflhpisDto[]", AktualniRedistribuce = "Gordic.Wfl.Interface.GWflstopDto[]", HistorieRedistribuce = "Gordic.Wfl.Interface.GWflhupiDto", HistoriePoznamek = "Gordic.Wfl.Interface.GWfldpozIslDto[]", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", vlastnictvi_doruceni_ico = "Gordic.Wfl.Interface.VlastnictviDoruceniIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", termin_ico = "Gordic.Wfl.Interface.TerminIco", dat_dtermin = "JsonDate", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", priz_kop = "number", priz_kopie = "string", stav_epk0 = "number", stav_epk_txt = "string", typ_pozad_pod_txt = "string", epk_po_pozad_vyr = "string", dat_vyriz_do = "JsonDate", dat_vyriz_do_wflsdcj = "JsonDate", dat_vyriz_do_sslsdcj = "JsonDate", TerminVyrizeni = "JsonDate", ZpVyrizTxtDleIxsCj = "string", Vlastnictvi = "string", vlastnik = "string", CoJsemZac = "Gordic.Wfl.Interface.GIdentifikatorCoJsemZac", VlastnikFunkce = "Gordic.Gin.Interface.GFunkcniMistoDto", VlastnikSpisovyUzel = "Gordic.Gin.Interface.GGinspodDto", Sslstyp = "Gordic.Gin.Interface.GTypDokumentuDto", ZmenuProvedl = "Gordic.Gin.Interface.GGinszmpDto", SpisovyPlan = "Gordic.Wfl.Interface.GSpisovyPlanDto", SpisovyZnak = "Gordic.Wfl.Interface.GSpisovyZnakDto", VlastnikAgendovyFunkce = "Gordic.Gin.Interface.GFunkcniMistoDto", VlastnikAgendovySpisovyUzel = "Gordic.Gin.Interface.GGinspodDto", CisloJednaci = "Gordic.Wfl.Interface.GCisloJednaciDto", UmisteniData = "Gordic.Wfl.Interface.GUmisteniDto", Nazev__sslstyp = "string", Predano__uzlu = "string", Predano__osobe = "string", Predano__od__osoby = "string", TypSpousteciUdalosti = "Gordic.Gin.Interface.GTypSpousteciUdalostiDto", PrizKonfliktSka = "number", StavVytezezniElektronickehoObrazu = "Gordic.Ginis.DbModel.GGincsvyEnum", IxpTss = "string", DotceneSubjekty = "Gordic.Wfl.Interface.GDotcenySubjektDto[]", KlicovaSlova = "Gordic.Wfl.Interface.GKeyWordDto[]", Formulare = "Gordic.Gin.Interface.GFormularDto[]", Doruceni = "Gordic.Wfl.Interface.GProfilDoruceniDto", Redistribuce = "Gordic.Wfl.Interface.GWflstopDto", Souvisejici = "Gordic.Wfl.Interface.GSeznamSouvisejicichDokumentuDto[]", s_orig = "number", priz_dupli = "number", TypAgendy = "Gordic.Gin.Interface.GTypAgendyDto", Vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", PoznamkaPosledni = "string", ico_status = "number", UlozenoListu = "Gordic.Wfl.Interface.GWfldulpDto", UrovenPristupu = "Gordic.Gin.Interface.GUrovenPristupuDto", priz_zob_zast = "number", ext_akt_znacka = "string", CislaJednaciHistoricka = "string[]", Wflszne = "Gordic.Wfl.Interface.GWflszneDto", ixp = "string", lic = "string", rok = "number", status_pis = "Gordic.Ginis.DbModel.GWflcumpEnum", typ_duv_del = "Gordic.Ginis.DbModel.GWflctddEnum", dat_del = "JsonDate",}
	const enum GSslspidDtoTypeLengths { obsah_text = 254, obsah_text_2 = 254, obsah_text_3 = 254, obsah_text_4 = 254, poznamka = 254, cj_spis = 50, odeslano_kam = 100, vyriz_komu = 100, vyriz_pozn = 254, nazev = 100, akt_znacka = 50, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, umisteni = 20, skar_znak = 2, ixs_vsk = 12, barcode = 50, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, PopisSpoUda = 254, DuvodPozSkar = 254, uziv_sl_a = 254, uziv_sl_a2 = 254, uziv_sl_a3 = 254, uziv_sl_b = 254, uziv_sl_b2 = 254, uziv_sl_b3 = 254, uziv_sl_c = 254, uziv_sl_c2 = 254, uziv_sl_d = 254, uziv_sl_d2 = 254, uziv_sl_j = 254, uziv_sl_j2 = 254, uziv_sl_k = 254, uziv_sl_k2 = 254, uziv_sl_n = 254, vlastnik = 200, lic = 4,}
	/**Oprávnění vztažené k dokumentu.*/
	interface GSslspidPermissionsDto extends Gordic.Wfl.Interface.GWflspidPermissionsDto {
		/**Zda lze vytěžit data z PDF*/
		LzeElObrazVytezitPDF: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze vytěžit data z PDF formuláře gin_ele_zprforf - GIN ELE - vytěžování dat ze souboru PDF (formuláře) do vlastností*/
		LzeElObrazVytezitPDFFormular: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze vytěžit metadata - napůl interaktivně*/
		LzeElObrazVytezitMetadata: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povoleni zobrazení uložení*/
		LzeZobrazitDetailUlozeni: Gordic.General.ApplicationInterface.GPermission;
		/**Príznak povoleni změny místa uložení - p_uloz*/
		LzeZmenitUlozeni: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení změny formy - vyjímky pro SPI, SUD, nově obsluha*/
		LzeZmenitFormu: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze pracovat s klíčovými slovy dokumentu*/
		LzeKlicovaSlova: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vložení této písemnosti do nějakého spisu - p_vlozpis*/
		LzePisemnostVlozit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolující vyjmutí této písemnosti z nějakého spisu - p_vlozpis*/
		LzePisemnostVyjmout: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení vytvoření spisu - p_vytvpis*/
		LzeVytvoritSpis: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení vytvoření spisu do soucasti*/
		LzeVytvoritSpisDoSoucasti: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení vytvoření typového spisu z dokumentu*/
		LzeVytvoritTypovySpis: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze zobrazit informace o odslání dokumentu - p_odes*/
		LzeZobrazitOdeslani: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze editovat/pripravovat informace o odeslání dokumentu - p_odes_edit*/
		LzePripravovatOdeslani: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze editovat/finalně odeslat informace o odeslání dokumentu - p_odes_edit*/
		LzeEditovatOdeslani: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - ztratit - p_ztra*/
		LzeZtratit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - nalézt - p_nale*/
		LzeNalezt: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - přerušit (zastavit)- p_poza*/
		LzePrerusit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - obnovit přerušení - p_obno*/
		LzeObnovit: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení vyřizování - použito POUZE v*/
		LzeVyrizovat: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Vyřídit Ac Acta - p_vznv*/
		LzeVyriditAdActa: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Uzavrit soucast*/
		LzeUzavritSoucast: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Vyřídit - vyrizeni dokumentu vlozeneho ve spisu pro starou metodiku - pozadavek MVCR*/
		LzeVyriditDokumentVeSpisuVeStareMetodice: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Předání do externí agendy*/
		LzePredatDoEA: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Předání do externí agendy v EKO modulu.*/
		LzePredatDoEAzEKO: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Předání do externí agendy*/
		LzePrevzitZEA: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Informovat externí agendu*/
		LzeInformovatEA: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - zrušit vyřízení (ad acta) - p_odvznv*/
		LzeZrusitVyrizeniAdActa: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - Stornovat/Zneplatnit spis či dokument - nově doplněny i logiky dle NSESSS 2023 (při zapnutém gin_n23_vedd se řídíme novým gin_n23_stor)*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - odStornovat spis či písemnost  -*/
		LzeZrusitOdeslaniOriginalu: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povolení položky menu činosti - nabýt právní moc - p_napm*/
		LzeNabytPravniMoc: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze vytvořit kopii písemnosti - p_kopie_nova A kontrola na to, zda spis není v redistribuci*/
		LzeVytvoritKopiiPisemnosti: Gordic.General.ApplicationInterface.GPermission;
		/**povolení zda lze vytvořit duplikát*/
		LzeVytvoritDuplikat2: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze odeslat originál - není u Aleše, ale u Lukáše, víc nevím*/
		LzeOdeslatOriginal: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze změnit supeň utajení  volba v menu činnnosti - změna spojená se zápisem do deníku*/
		LzeZmenitStupenUtajeni: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze nastavit příznak změny zástupu IRP.*/
		LzeNastavitPriznakZobrazitelnostiZastupemIRP: Gordic.General.ApplicationInterface.GPermission;
		/**Zda lze rozšířit profil písemnosti do SSL.*/
		LzeRozsirProfilWflPisemnostiDoSsl: Gordic.General.ApplicationInterface.GPermission;
		/**zda lze editovat termín - kontrola dvou parametrů*/
		LzeEditovatTerminSpisuJenKontrolaParam: Gordic.General.ApplicationInterface.GPermission;
		/**Kontrola zda není dokument v EPK a není nevyřízen v EPK (žádost směřovaná na jinou osobu, než je uživatel, který provádí vyřízení).*/
		LzeVyriditDokumentSOhledemNaEpk: Gordic.General.ApplicationInterface.GPermission;
		/**Zda se má zobrazit dotaz na vyřízení když je vložena žádost v epk.*/
		LzeVyriditDokumentSOhledemNaEpkDotaz?: boolean|null;
	}
	const enum GSslspidPermissionsDtoNames { LzeElObrazVytezitPDF = "LzeElObrazVytezitPDF", LzeElObrazVytezitPDFFormular = "LzeElObrazVytezitPDFFormular", LzeElObrazVytezitMetadata = "LzeElObrazVytezitMetadata", LzeZobrazitDetailUlozeni = "LzeZobrazitDetailUlozeni", LzeZmenitUlozeni = "LzeZmenitUlozeni", LzeZmenitFormu = "LzeZmenitFormu", LzeKlicovaSlova = "LzeKlicovaSlova", LzePisemnostVlozit = "LzePisemnostVlozit", LzePisemnostVyjmout = "LzePisemnostVyjmout", LzeVytvoritSpis = "LzeVytvoritSpis", LzeVytvoritSpisDoSoucasti = "LzeVytvoritSpisDoSoucasti", LzeVytvoritTypovySpis = "LzeVytvoritTypovySpis", LzeZobrazitOdeslani = "LzeZobrazitOdeslani", LzePripravovatOdeslani = "LzePripravovatOdeslani", LzeEditovatOdeslani = "LzeEditovatOdeslani", LzeZtratit = "LzeZtratit", LzeNalezt = "LzeNalezt", LzePrerusit = "LzePrerusit", LzeObnovit = "LzeObnovit", LzeVyrizovat = "LzeVyrizovat", LzeVyriditAdActa = "LzeVyriditAdActa", LzeUzavritSoucast = "LzeUzavritSoucast", LzeVyriditDokumentVeSpisuVeStareMetodice = "LzeVyriditDokumentVeSpisuVeStareMetodice", LzePredatDoEA = "LzePredatDoEA", LzePredatDoEAzEKO = "LzePredatDoEAzEKO", LzePrevzitZEA = "LzePrevzitZEA", LzeInformovatEA = "LzeInformovatEA", LzeZrusitVyrizeniAdActa = "LzeZrusitVyrizeniAdActa", LzeStornovat = "LzeStornovat", LzeZrusitOdeslaniOriginalu = "LzeZrusitOdeslaniOriginalu", LzeNabytPravniMoc = "LzeNabytPravniMoc", LzeVytvoritKopiiPisemnosti = "LzeVytvoritKopiiPisemnosti", LzeVytvoritDuplikat2 = "LzeVytvoritDuplikat2", LzeOdeslatOriginal = "LzeOdeslatOriginal", LzeZmenitStupenUtajeni = "LzeZmenitStupenUtajeni", LzeNastavitPriznakZobrazitelnostiZastupemIRP = "LzeNastavitPriznakZobrazitelnostiZastupemIRP", LzeRozsirProfilWflPisemnostiDoSsl = "LzeRozsirProfilWflPisemnostiDoSsl", LzeEditovatTerminSpisuJenKontrolaParam = "LzeEditovatTerminSpisuJenKontrolaParam", LzeVyriditDokumentSOhledemNaEpk = "LzeVyriditDokumentSOhledemNaEpk", LzeVyriditDokumentSOhledemNaEpkDotaz = "LzeVyriditDokumentSOhledemNaEpkDotaz", LzeEditovat = "LzeEditovat", LzeEditovatSpisovyZnak = "LzeEditovatSpisovyZnak", LzeEditovatKlicovaSlova = "LzeEditovatKlicovaSlova", LzeEditovatJenutnyDotazNaPreuruseniRedistribuce = "LzeEditovatJenutnyDotazNaPreuruseniRedistribuce", LzeVlozitElObraz = "LzeVlozitElObraz", LzeVlozitElObrazEpk = "LzeVlozitElObrazEpk", LzeOznacitJakoElObraz = "LzeOznacitJakoElObraz", LzeZamenitElObraz = "LzeZamenitElObraz", LzeZnovuVlozitElObraz = "LzeZnovuVlozitElObraz", LzeElEditovatPriznakPlatneVerze = "LzeElEditovatPriznakPlatneVerze", LzeElEditovatPriznakArchivace = "LzeElEditovatPriznakArchivace", LzeElCteni = "LzeElCteni", LzeElCteniZasilky = "LzeElCteniZasilky", LzeElCteniElPodani = "LzeElCteniElPodani", LzeElCteniOdeslaneZasilky = "LzeElCteniOdeslaneZasilky", LzeOtevritElObraz = "LzeOtevritElObraz", LzeOtevritElObrazDotaz = "LzeOtevritElObrazDotaz", LzeElObrazSetVisualSignPosition = "LzeElObrazSetVisualSignPosition", LzeOtevritElPrilohy = "LzeOtevritElPrilohy", LzeOtevritElPrilohyDotaz = "LzeOtevritElPrilohyDotaz", LzeElPrilohySetVisualSignPosition = "LzeElPrilohySetVisualSignPosition", LzePridatElPrilohy = "LzePridatElPrilohy", LzePridatElPrilohyNeboNeEl = "LzePridatElPrilohyNeboNeEl", LzeZneaktivnitPrilohu = "LzeZneaktivnitPrilohu", LzeSouvisejiciEditovat = "LzeSouvisejiciEditovat", LzeSouvisejiciEditovatTypVazby = "LzeSouvisejiciEditovatTypVazby", LzeIRPPridatOpravneni = "LzeIRPPridatOpravneni", LzeIRPPridatPravidlo = "LzeIRPPridatPravidlo", LzePridatPrilohy = "LzePridatPrilohy", LzePridatPoznamkuDoHistorie = "LzePridatPoznamkuDoHistorie", LzePridatUzivatelskouPoznamku = "LzePridatUzivatelskouPoznamku", LzeElEditaceBezKontrolyStavuUzavreno = "LzeElEditaceBezKontrolyStavuUzavreno", LzeElEditacePrilohBezKontrolyStavuUzavreno = "LzeElEditacePrilohBezKontrolyStavuUzavreno", LzeElEditace = "LzeElEditace", LzeElPrejmenovat = "LzeElPrejmenovat", LzeEditovatElObraz = "LzeEditovatElObraz", LzeEditovatElPrilohy = "LzeEditovatElPrilohy", LzeEditovatKategoriiElPrilohy = "LzeEditovatKategoriiElPrilohy", LzeOdstranitElPrilohy = "LzeOdstranitElPrilohy", LzeOdstranitRadekElPrilohy = "LzeOdstranitRadekElPrilohy", LzeOdstranitPrilohy = "LzeOdstranitPrilohy", LzeZneaktivnitElPrilohy = "LzeZneaktivnitElPrilohy", LzeZverejnitEl = "LzeZverejnitEl", LzeZverejnitElPresZadostiMenu = "LzeZverejnitElPresZadostiMenu", LzeZverejnitElPresZadosti = "LzeZverejnitElPresZadosti", LzeZverejnitElObraz = "LzeZverejnitElObraz", LzeZverejnitElPrilohu = "LzeZverejnitElPrilohu", LzeZverejnitElNaUrDesku = "LzeZverejnitElNaUrDesku", LzeZverejnitOznacitKeZverejneni = "LzeZverejnitOznacitKeZverejneni", LzeZverejnitElObrazOznacitKeZverejneni = "LzeZverejnitElObrazOznacitKeZverejneni", LzeZverejnitElObrazNaUrDesku = "LzeZverejnitElObrazNaUrDesku", LzeZverejnitElObrazDoDiplomchainu = "LzeZverejnitElObrazDoDiplomchainu", LzeZneaktivnitElObraz = "LzeZneaktivnitElObraz", LzeOdstranitElObraz = "LzeOdstranitElObraz", LzeKartuCist = "LzeKartuCist", LzeZalozitVyrizujiciDok = "LzeZalozitVyrizujiciDok", LzeZrusitPrideleni = "LzeZrusitPrideleni", LzePridelit = "LzePridelit", LzeZamitnoutPrideleniZeSeznamu = "LzeZamitnoutPrideleniZeSeznamu", LzePreevidovatCj = "LzePreevidovatCj", LzeNastavitVyrizujiciDokumentCj = "LzeNastavitVyrizujiciDokumentCj", LzeNastavitJakoVyrizujiciDokumentCj = "LzeNastavitJakoVyrizujiciDokumentCj", LzeVlastnostiPredplnit = "LzeVlastnostiPredplnit", LzeOdeslatNedokladovane = "LzeOdeslatNedokladovane", LzePriraditJakoVyrizujiciDokumentCj = "LzePriraditJakoVyrizujiciDokumentCj", LzeOdebratVyrizujiciDokumentCj = "LzeOdebratVyrizujiciDokumentCj", LzeVyriditCj = "LzeVyriditCj", LzeOdvyriditCj = "LzeOdvyriditCj", LzePridavatAOdebiratFormulare = "LzePridavatAOdebiratFormulare", LzeSchvalit = "LzeSchvalit", LzeSchvalovat = "LzeSchvalovat", LzePridatZadostOPodpis = "LzePridatZadostOPodpis", LzePridatZadostDoEpk = "LzePridatZadostDoEpk", LzePridatZadostDoEpkPouzeVzitNaVedomi = "LzePridatZadostDoEpkPouzeVzitNaVedomi", LzeSchvalovaciProces = "LzeSchvalovaciProces", LzeSchvalovaciProcesNerizeny = "LzeSchvalovaciProcesNerizeny", LzeSchvalovaciProcesRizenyNovy = "LzeSchvalovaciProcesRizenyNovy", LzeSchvalovaciProcesRizeny = "LzeSchvalovaciProcesRizeny", LzeVyriditZadostOPodpis = "LzeVyriditZadostOPodpis", LzeZverejneni = "LzeZverejneni", LzeZverejneniEditovat = "LzeZverejneniEditovat", LzePosoudit = "LzePosoudit", LzeElPodepsatDoPdf = "LzeElPodepsatDoPdf", LzeElPodepsatObraz = "LzeElPodepsatObraz", LzeElPodepsat = "LzeElPodepsat", LzeOveritElPodpis = "LzeOveritElPodpis", LzeElObrazOtevritAUzamknout = "LzeElObrazOtevritAUzamknout", LzeElObrazOdemknout = "LzeElObrazOdemknout", LzeOdSchvalit = "LzeOdSchvalit", LzeDokumentPriraditKeSpisu = "LzeDokumentPriraditKeSpisu", LzeDokumentPriraditKeSpisuZrusit = "LzeDokumentPriraditKeSpisuZrusit", LzeKonvertovatDoPdf = "LzeKonvertovatDoPdf", LzeKonvertovatDoPdfZobrazitDialog = "LzeKonvertovatDoPdfZobrazitDialog", LzeZobrazitIniciacniDokument = "LzeZobrazitIniciacniDokument", LzeZobrazitVyrizujiciDokument = "LzeZobrazitVyrizujiciDokument", LzeZnovupodat = "LzeZnovupodat", LzeZmenitUzo = "LzeZmenitUzo", LzeZmenitDatumVytvoreni = "LzeZmenitDatumVytvoreni", JeAktivniMuzeBytUlozenNeboArchivovan = "JeAktivniMuzeBytUlozenNeboArchivovan", LzeVlozitDoBaliku = "LzeVlozitDoBaliku", LzeVyjmoutZBaliku = "LzeVyjmoutZBaliku", LzeTrasy = "LzeTrasy", LzeOperativneUlozit = "LzeOperativneUlozit", LzeVytvoritNovouKopii = "LzeVytvoritNovouKopii", LzeVytvoritDuplikat = "LzeVytvoritDuplikat", LzeOznacitJakoPreevidovaniZNahradniEvidence = "LzeOznacitJakoPreevidovaniZNahradniEvidence", LzeVytvoritSouvisejiciUkol = "LzeVytvoritSouvisejiciUkol", LzeRakVytvoritZadostZdf = "LzeRakVytvoritZadostZdf", LzeRakVytvoritZadostAkNeAk = "LzeRakVytvoritZadostAkNeAk", LzeRakVytvoritZadostNapojeniNaVstup = "LzeRakVytvoritZadostNapojeniNaVstup", LzeRakKonverze = "LzeRakKonverze", LzePredat = "LzePredat", LzeVratitDoWfl = "LzeVratitDoWfl", LzePrevzit = "LzePrevzit", LzePrevzitZeSeznamu = "LzePrevzitZeSeznamu", LzeTrasuOdstranit = "LzeTrasuOdstranit", LzeTrasuEditovat = "LzeTrasuEditovat", LzeInterniFormularEditovat = "LzeInterniFormularEditovat", LzeInterniFormularUlozitNovouVerzi = "LzeInterniFormularUlozitNovouVerzi", LzeInterniFormularUlozitPdf = "LzeInterniFormularUlozitPdf", LzePridavatVlastnosti = "LzePridavatVlastnosti", LzeEditovatVlastnosti = "LzeEditovatVlastnosti", LzeEditovatDotceneSubjekty = "LzeEditovatDotceneSubjekty", LzeTSpisVlozit = "LzeTSpisVlozit", LzeTSpisVyjmout = "LzeTSpisVyjmout", LzeZobrazitSoucast = "LzeZobrazitSoucast", LzeZobrazitDil = "LzeZobrazitDil", LzeZobrazitTypovySpis = "LzeZobrazitTypovySpis", LzeTSpisVytvorit = "LzeTSpisVytvorit", LzeEvidovatCj = "LzeEvidovatCj", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno", JePovolenaPraceVAgendeBezOmezeniEa = "JePovolenaPraceVAgendeBezOmezeniEa", LzeOdStornovat = "LzeOdStornovat", LzeEditovatPristup2 = "LzeEditovatPristup2", LzeEditovatPristup = "LzeEditovatPristup", LzeEditovatVec = "LzeEditovatVec", LzeEditovatVecPodrobne = "LzeEditovatVecPodrobne", LzeEditovatPoznamku = "LzeEditovatPoznamku", LzeEditovatNovePodaniNeboEditacniRezim = "LzeEditovatNovePodaniNeboEditacniRezim", LzeEditovatPocty = "LzeEditovatPocty", LzeEditovatAktZnacku = "LzeEditovatAktZnacku", LzeEditovatCjExt = "LzeEditovatCjExt", LzeEditovatSpZnExt = "LzeEditovatSpZnExt", LzeEditovatTypDokumentu = "LzeEditovatTypDokumentu", LzeEditovatDatumPodani = "LzeEditovatDatumPodani", LzeEditovatDatumPodaniPriPodani = "LzeEditovatDatumPodaniPriPodani", LzeEditovatSpisPlanAZnak = "LzeEditovatSpisPlanAZnak", LzeEditovatPozastaveniSkartacniOperace = "LzeEditovatPozastaveniSkartacniOperace", LzeEditovatUmisteni = "LzeEditovatUmisteni", LzeEditovatCj = "LzeEditovatCj", LzeEditovatSpousteciUdalostAPopis = "LzeEditovatSpousteciUdalostAPopis", JeShodnyExterniSystemAJePovolenaAktivniPrace = "JeShodnyExterniSystemAJePovolenaAktivniPrace", LzeEditovatDilciTermin = "LzeEditovatDilciTermin", LzeOveritPodpisElObraz = "LzeOveritPodpisElObraz", LzeZobrazitHistoriiOvereniElObraz = "LzeZobrazitHistoriiOvereniElObraz", LzeEditovatSpousteciUdalostNsesss2023 = "LzeEditovatSpousteciUdalostNsesss2023",}
	const enum GSslspidPermissionsDtoFragments { LzeElObrazVytezitPDF = "PERMISSIONS_ACTIONS", LzeElObrazVytezitPDFFormular = "PERMISSIONS_ACTIONS", LzeElObrazVytezitMetadata = "PERMISSIONS_ACTIONS", LzeZobrazitDetailUlozeni = "PERMISSIONS_ACTIONS", LzeZmenitUlozeni = "PERMISSIONS_ACTIONS", LzeZmenitFormu = "PERMISSIONS_ACTIONS_EPK", LzeKlicovaSlova = "PERMISSIONS_ACTIONS", LzePisemnostVlozit = "PERMISSIONS_ACTIONS", LzePisemnostVyjmout = "PERMISSIONS_ACTIONS", LzeVytvoritSpis = "PERMISSIONS_ACTIONS", LzeVytvoritSpisDoSoucasti = "PERMISSIONS_ACTIONS", LzeVytvoritTypovySpis = "PERMISSIONS_ACTIONS", LzeZobrazitOdeslani = "PERMISSIONS_ACTIONS", LzePripravovatOdeslani = "PERMISSIONS_ACTIONS", LzeEditovatOdeslani = "PERMISSIONS_ACTIONS", LzeZtratit = "PERMISSIONS_ACTIONS", LzeNalezt = "PERMISSIONS_ACTIONS", LzePrerusit = "PERMISSIONS_ACTIONS", LzeObnovit = "PERMISSIONS_ACTIONS", LzeVyrizovat = "PERMISSIONS_ACTIONS", LzeVyriditAdActa = "PERMISSIONS_ACTIONS", LzeUzavritSoucast = "PERMISSIONS_ACTIONS", LzeVyriditDokumentVeSpisuVeStareMetodice = "PERMISSIONS_ACTIONS", LzePredatDoEA = "PERMISSIONS_ACTIONS", LzePredatDoEAzEKO = "PERMISSIONS_ACTIONS", LzePrevzitZEA = "PERMISSIONS_ACTIONS", LzeInformovatEA = "PERMISSIONS_ACTIONS", LzeZrusitVyrizeniAdActa = "PERMISSIONS_ACTIONS", LzeStornovat = "PERMISSIONS_ACTIONS", LzeZrusitOdeslaniOriginalu = "PERMISSIONS_ACTIONS", LzeNabytPravniMoc = "PERMISSIONS_ACTIONS", LzeVytvoritKopiiPisemnosti = "PERMISSIONS_ACTIONS", LzeVytvoritDuplikat2 = "PERMISSIONS_ACTIONS", LzeOdeslatOriginal = "PERMISSIONS_ACTIONS", LzeZmenitStupenUtajeni = "PERMISSIONS_ACTIONS_SPISOVNA", LzeNastavitPriznakZobrazitelnostiZastupemIRP = "PERMISSIONS_ACTIONS_SPISOVNA", LzeRozsirProfilWflPisemnostiDoSsl = "PERMISSIONS_ACTIONS", LzeEditovatTerminSpisuJenKontrolaParam = "PERMISSIONS_FIELDS", LzeVyriditDokumentSOhledemNaEpk = "PERMISSIONS_ACTIONS_VYRIDIT_DLE_EPK", LzeVyriditDokumentSOhledemNaEpkDotaz = "PERMISSIONS_ACTIONS_VYRIDIT_DLE_EPK", LzeEditovat = "PERMISSIONS_ACTIONS", LzeEditovatSpisovyZnak = "PERMISSIONS_ACTIONS", LzeEditovatKlicovaSlova = "PERMISSIONS_ACTIONS", LzeEditovatJenutnyDotazNaPreuruseniRedistribuce = "PERMISSIONS_ACTIONS", LzeVlozitElObraz = "PERMISSIONS_ACTIONS", LzeVlozitElObrazEpk = "PERMISSIONS_ACTIONS", LzeOznacitJakoElObraz = "PERMISSIONS_ACTIONS", LzeZamenitElObraz = "PERMISSIONS_ACTIONS", LzeZnovuVlozitElObraz = "PERMISSIONS_ACTIONS", LzeElEditovatPriznakPlatneVerze = "PERMISSIONS_ACTIONS", LzeElEditovatPriznakArchivace = "PERMISSIONS_ACTIONS", LzeElCteni = "PERMISSIONS_ACTIONS", LzeElCteniZasilky = "PERMISSIONS_ACTIONS", LzeElCteniElPodani = "PERMISSIONS_ACTIONS_DORUCENI", LzeElCteniOdeslaneZasilky = "PERMISSIONS_ACTIONS", LzeOtevritElObraz = "PERMISSIONS_ACTIONS", LzeOtevritElObrazDotaz = "PERMISSIONS_ACTIONS", LzeElObrazSetVisualSignPosition = "*", LzeOtevritElPrilohy = "PERMISSIONS_ACTIONS", LzeOtevritElPrilohyDotaz = "PERMISSIONS_ACTIONS", LzeElPrilohySetVisualSignPosition = "PERMISSIONS_ACTIONS", LzePridatElPrilohy = "PERMISSIONS_ACTIONS", LzePridatElPrilohyNeboNeEl = "PERMISSIONS_ACTIONS", LzeZneaktivnitPrilohu = "PERMISSIONS_ACTIONS", LzeSouvisejiciEditovat = "PERMISSIONS_ACTIONS", LzeSouvisejiciEditovatTypVazby = "PERMISSIONS_ACTIONS", LzeIRPPridatOpravneni = "PERMISSIONS_ACTIONS", LzeIRPPridatPravidlo = "PERMISSIONS_ACTIONS", LzePridatPrilohy = "PERMISSIONS_ACTIONS", LzePridatPoznamkuDoHistorie = "PERMISSIONS_ACTIONS_EPK", LzePridatUzivatelskouPoznamku = "PERMISSIONS_ACTIONS_EPK", LzeElEditaceBezKontrolyStavuUzavreno = "PERMISSIONS_ACTIONS", LzeElEditacePrilohBezKontrolyStavuUzavreno = "PERMISSIONS_ACTIONS", LzeElEditace = "PERMISSIONS_ACTIONS", LzeElPrejmenovat = "PERMISSIONS_ACTIONS", LzeEditovatElObraz = "PERMISSIONS_ACTIONS", LzeEditovatElPrilohy = "PERMISSIONS_ACTIONS", LzeEditovatKategoriiElPrilohy = "PERMISSIONS_ACTIONS", LzeOdstranitElPrilohy = "PERMISSIONS_ACTIONS", LzeOdstranitRadekElPrilohy = "PERMISSIONS_ACTIONS", LzeOdstranitPrilohy = "PERMISSIONS_ACTIONS", LzeZneaktivnitElPrilohy = "PERMISSIONS_ACTIONS", LzeZverejnitEl = "PERMISSIONS_ACTIONS", LzeZverejnitElPresZadostiMenu = "PERMISSIONS_ACTIONS", LzeZverejnitElPresZadosti = "PERMISSIONS_ACTIONS", LzeZverejnitElObraz = "PERMISSIONS_ACTIONS", LzeZverejnitElPrilohu = "PERMISSIONS_ACTIONS", LzeZverejnitElNaUrDesku = "PERMISSIONS_ACTIONS", LzeZverejnitOznacitKeZverejneni = "PERMISSIONS_ACTIONS", LzeZverejnitElObrazOznacitKeZverejneni = "PERMISSIONS_ACTIONS", LzeZverejnitElObrazNaUrDesku = "PERMISSIONS_ACTIONS", LzeZverejnitElObrazDoDiplomchainu = "PERMISSIONS_ACTIONS", LzeZneaktivnitElObraz = "PERMISSIONS_ACTIONS", LzeOdstranitElObraz = "PERMISSIONS_ACTIONS", LzeKartuCist = "PERMISSIONS_ACTIONS", LzeZalozitVyrizujiciDok = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeZrusitPrideleni = "PERMISSIONS_ACTIONS_REDISTRIBUCE", LzePridelit = "PERMISSIONS_ACTIONS", LzeZamitnoutPrideleniZeSeznamu = "PERMISSIONS_ACTIONS", LzePreevidovatCj = "PERMISSIONS_ACTIONS", LzeNastavitVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeNastavitJakoVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS", LzeVlastnostiPredplnit = "PERMISSIONS_ACTIONS", LzeOdeslatNedokladovane = "PERMISSIONS_ACTIONS", LzePriraditJakoVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS", LzeOdebratVyrizujiciDokumentCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeVyriditCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeOdvyriditCj = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzePridavatAOdebiratFormulare = "PERMISSIONS_ACTIONS", LzeSchvalit = "PERMISSIONS_ACTIONS", LzeSchvalovat = "PERMISSIONS_ACTIONS", LzePridatZadostOPodpis = "PERMISSIONS_ACTIONS", LzePridatZadostDoEpk = "PERMISSIONS_ACTIONS", LzePridatZadostDoEpkPouzeVzitNaVedomi = "PERMISSIONS_ACTIONS_SPISOVNA", LzeSchvalovaciProces = "PERMISSIONS_ACTIONS", LzeSchvalovaciProcesNerizeny = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI", LzeSchvalovaciProcesRizenyNovy = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI_EPK", LzeSchvalovaciProcesRizeny = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI", LzeVyriditZadostOPodpis = "PERMISSIONS_ACTIONS", LzeZverejneni = "PERMISSIONS_ACTIONS", LzeZverejneniEditovat = "PERMISSIONS_ACTIONS", LzePosoudit = "PERMISSIONS_ACTIONS", LzeElPodepsatDoPdf = "PERMISSIONS_ACTIONS", LzeElPodepsatObraz = "PERMISSIONS_ACTIONS", LzeElPodepsat = "PERMISSIONS_ACTIONS", LzeOveritElPodpis = "PERMISSIONS_ACTIONS", LzeElObrazOtevritAUzamknout = "PERMISSIONS_ACTIONS", LzeElObrazOdemknout = "PERMISSIONS_ACTIONS", LzeOdSchvalit = "PERMISSIONS_ACTIONS", LzeDokumentPriraditKeSpisu = "PERMISSIONS_ACTIONS", LzeDokumentPriraditKeSpisuZrusit = "PERMISSIONS_ACTIONS", LzeKonvertovatDoPdf = "PERMISSIONS_ACTIONS_DORUCENI", LzeKonvertovatDoPdfZobrazitDialog = "PERMISSIONS_ACTIONS_DORUCENI", LzeZobrazitIniciacniDokument = "PERMISSIONS_ACTIONS", LzeZobrazitVyrizujiciDokument = "PERMISSIONS_ACTIONS_CISLO_JEDNACI", LzeZnovupodat = "PERMISSIONS_ACTIONS", LzeZmenitUzo = "PERMISSIONS_ACTIONS", LzeZmenitDatumVytvoreni = "PERMISSIONS_ACTIONS", JeAktivniMuzeBytUlozenNeboArchivovan = "PERMISSIONS_ACTIONS", LzeVlozitDoBaliku = "PERMISSIONS_ACTIONS", LzeVyjmoutZBaliku = "PERMISSIONS_ACTIONS_SPISOVNA", LzeTrasy = "PERMISSIONS_ACTIONS", LzeOperativneUlozit = "PERMISSIONS_ACTIONS", LzeVytvoritNovouKopii = "PERMISSIONS_ACTIONS", LzeVytvoritDuplikat = "PERMISSIONS_ACTIONS_TYP_PISEMNOSTI", LzeOznacitJakoPreevidovaniZNahradniEvidence = "PERMISSIONS_ACTIONS", LzeVytvoritSouvisejiciUkol = "PERMISSIONS_ACTIONS", LzeRakVytvoritZadostZdf = "PERMISSIONS_ACTIONS", LzeRakVytvoritZadostAkNeAk = "PERMISSIONS_ACTIONS_EPK_SPIS_STAV", LzeRakVytvoritZadostNapojeniNaVstup = "PERMISSIONS_ACTIONS_SPIS_STAV", LzeRakKonverze = "PERMISSIONS_ACTIONS_EPK_SPIS_STAV", LzePredat = "PERMISSIONS_ACTIONS", LzeVratitDoWfl = "PERMISSIONS_ACTIONS", LzePrevzit = "PERMISSIONS_ACTIONS", LzePrevzitZeSeznamu = "PERMISSIONS_ACTIONS", LzeTrasuOdstranit = "PERMISSIONS_ACTIONS", LzeTrasuEditovat = "PERMISSIONS_ACTIONS", LzeInterniFormularEditovat = "PERMISSIONS_ACTIONS", LzeInterniFormularUlozitNovouVerzi = "PERMISSIONS_ACTIONS", LzeInterniFormularUlozitPdf = "PERMISSIONS_ACTIONS_DORUCENI", LzePridavatVlastnosti = "PERMISSIONS_ACTIONS", LzeEditovatVlastnosti = "PERMISSIONS_ACTIONS", LzeEditovatDotceneSubjekty = "PERMISSIONS_ACTIONS", LzeTSpisVlozit = "PERMISSIONS_ACTIONS", LzeTSpisVyjmout = "PERMISSIONS_ACTIONS", LzeZobrazitSoucast = "PERMISSIONS_ACTIONS", LzeZobrazitDil = "PERMISSIONS_ACTIONS", LzeZobrazitTypovySpis = "PERMISSIONS_ACTIONS", LzeTSpisVytvorit = "PERMISSIONS_ACTIONS", LzeEvidovatCj = "PERMISSIONS_ACTIONS", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "PERMISSIONS_ACTIONS", JePovolenaPraceVAgendeBezOmezeniEa = "PERMISSIONS_ACTIONS", LzeOdStornovat = "PERMISSIONS_ACTIONS", LzeEditovatPristup2 = "PERMISSIONS_FIELDS", LzeEditovatPristup = "PERMISSIONS_FIELDS", LzeEditovatVec = "PERMISSIONS_FIELDS", LzeEditovatVecPodrobne = "PERMISSIONS_FIELDS", LzeEditovatPoznamku = "PERMISSIONS_FIELDS", LzeEditovatNovePodaniNeboEditacniRezim = "PERMISSIONS_FIELDS", LzeEditovatPocty = "PERMISSIONS_FIELDS", LzeEditovatAktZnacku = "PERMISSIONS_FIELDS", LzeEditovatCjExt = "PERMISSIONS_FIELDS", LzeEditovatSpZnExt = "PERMISSIONS_FIELDS", LzeEditovatTypDokumentu = "PERMISSIONS_FIELDS", LzeEditovatDatumPodani = "PERMISSIONS_FIELDS_SPIS_STAV", LzeEditovatDatumPodaniPriPodani = "PERMISSIONS_FIELDS", LzeEditovatSpisPlanAZnak = "PERMISSIONS_FIELDS", LzeEditovatPozastaveniSkartacniOperace = "PERMISSIONS_FIELDS_SPISOVNA", LzeEditovatUmisteni = "PERMISSIONS_FIELDS_SPISOVNA", LzeEditovatCj = "PERMISSIONS_FIELDS", LzeEditovatSpousteciUdalostAPopis = "PERMISSIONS_FIELDS_SPIS_ZNAK_SPISOVNA", JeShodnyExterniSystemAJePovolenaAktivniPrace = "PERMISSIONS_ACTIONS", LzeEditovatDilciTermin = "PERMISSIONS_ACTIONS", LzeOveritPodpisElObraz = "PERMISSIONS_ACTIONS", LzeZobrazitHistoriiOvereniElObraz = "PERMISSIONS_ACTIONS", LzeEditovatSpousteciUdalostNsesss2023 = "PERMISSIONS_ACTIONS",}
	const enum GSslspidPermissionsDtoTypes { LzeElObrazVytezitPDF = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazVytezitPDFFormular = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazVytezitMetadata = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitDetailUlozeni = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitUlozeni = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitFormu = "Gordic.General.ApplicationInterface.GPermission", LzeKlicovaSlova = "Gordic.General.ApplicationInterface.GPermission", LzePisemnostVlozit = "Gordic.General.ApplicationInterface.GPermission", LzePisemnostVyjmout = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritSpis = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritSpisDoSoucasti = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritTypovySpis = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitOdeslani = "Gordic.General.ApplicationInterface.GPermission", LzePripravovatOdeslani = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatOdeslani = "Gordic.General.ApplicationInterface.GPermission", LzeZtratit = "Gordic.General.ApplicationInterface.GPermission", LzeNalezt = "Gordic.General.ApplicationInterface.GPermission", LzePrerusit = "Gordic.General.ApplicationInterface.GPermission", LzeObnovit = "Gordic.General.ApplicationInterface.GPermission", LzeVyrizovat = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditAdActa = "Gordic.General.ApplicationInterface.GPermission", LzeUzavritSoucast = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditDokumentVeSpisuVeStareMetodice = "Gordic.General.ApplicationInterface.GPermission", LzePredatDoEA = "Gordic.General.ApplicationInterface.GPermission", LzePredatDoEAzEKO = "Gordic.General.ApplicationInterface.GPermission", LzePrevzitZEA = "Gordic.General.ApplicationInterface.GPermission", LzeInformovatEA = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitVyrizeniAdActa = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitOdeslaniOriginalu = "Gordic.General.ApplicationInterface.GPermission", LzeNabytPravniMoc = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritKopiiPisemnosti = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritDuplikat2 = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatOriginal = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitStupenUtajeni = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitPriznakZobrazitelnostiZastupemIRP = "Gordic.General.ApplicationInterface.GPermission", LzeRozsirProfilWflPisemnostiDoSsl = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatTerminSpisuJenKontrolaParam = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditDokumentSOhledemNaEpk = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditDokumentSOhledemNaEpkDotaz = "boolean", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpisovyZnak = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatKlicovaSlova = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatJenutnyDotazNaPreuruseniRedistribuce = "boolean", LzeVlozitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitElObrazEpk = "Gordic.General.ApplicationInterface.GPermission", LzeOznacitJakoElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZamenitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZnovuVlozitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeElEditovatPriznakPlatneVerze = "Gordic.General.ApplicationInterface.GPermission", LzeElEditovatPriznakArchivace = "Gordic.General.ApplicationInterface.GPermission", LzeElCteni = "Gordic.General.ApplicationInterface.GPermission", LzeElCteniZasilky = "Gordic.General.ApplicationInterface.GPermission", LzeElCteniElPodani = "Gordic.General.ApplicationInterface.GPermission", LzeElCteniOdeslaneZasilky = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElObrazDotaz = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazSetVisualSignPosition = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOtevritElPrilohyDotaz = "Gordic.General.ApplicationInterface.GPermission", LzeElPrilohySetVisualSignPosition = "Gordic.General.ApplicationInterface.GPermission", LzePridatElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzePridatElPrilohyNeboNeEl = "Gordic.General.ApplicationInterface.GPermission", LzeZneaktivnitPrilohu = "Gordic.General.ApplicationInterface.GPermission", LzeSouvisejiciEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeSouvisejiciEditovatTypVazby = "Gordic.General.ApplicationInterface.GPermission", LzeIRPPridatOpravneni = "Gordic.General.ApplicationInterface.GPermission", LzeIRPPridatPravidlo = "Gordic.General.ApplicationInterface.GPermission", LzePridatPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzePridatPoznamkuDoHistorie = "Gordic.General.ApplicationInterface.GPermission", LzePridatUzivatelskouPoznamku = "Gordic.General.ApplicationInterface.GPermission", LzeElEditaceBezKontrolyStavuUzavreno = "Gordic.General.ApplicationInterface.GPermission", LzeElEditacePrilohBezKontrolyStavuUzavreno = "Gordic.General.ApplicationInterface.GPermission", LzeElEditace = "Gordic.General.ApplicationInterface.GPermission", LzeElPrejmenovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatKategoriiElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitRadekElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeZneaktivnitElPrilohy = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitEl = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElPresZadostiMenu = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElPresZadosti = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElPrilohu = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElNaUrDesku = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitOznacitKeZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObrazOznacitKeZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObrazNaUrDesku = "Gordic.General.ApplicationInterface.GPermission", LzeZverejnitElObrazDoDiplomchainu = "Gordic.General.ApplicationInterface.GPermission", LzeZneaktivnitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranitElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeKartuCist = "Gordic.General.ApplicationInterface.GPermission", LzeZalozitVyrizujiciDok = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitPrideleni = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzeZamitnoutPrideleniZeSeznamu = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovatCj = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeNastavitJakoVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeVlastnostiPredplnit = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatNedokladovane = "Gordic.General.ApplicationInterface.GPermission", LzePriraditJakoVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeOdebratVyrizujiciDokumentCj = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditCj = "Gordic.General.ApplicationInterface.GPermission", LzeOdvyriditCj = "Gordic.General.ApplicationInterface.GPermission", LzePridavatAOdebiratFormulare = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovat = "Gordic.General.ApplicationInterface.GPermission", LzePridatZadostOPodpis = "Gordic.General.ApplicationInterface.GPermission", LzePridatZadostDoEpk = "Gordic.General.ApplicationInterface.GPermission", LzePridatZadostDoEpkPouzeVzitNaVedomi = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProces = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProcesNerizeny = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProcesRizenyNovy = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalovaciProcesRizeny = "Gordic.General.ApplicationInterface.GPermission", LzeVyriditZadostOPodpis = "Gordic.General.ApplicationInterface.GPermission", LzeZverejneni = "Gordic.General.ApplicationInterface.GPermission", LzeZverejneniEditovat = "Gordic.General.ApplicationInterface.GPermission", LzePosoudit = "Gordic.General.ApplicationInterface.GPermission", LzeElPodepsatDoPdf = "Gordic.General.ApplicationInterface.GPermission", LzeElPodepsatObraz = "Gordic.General.ApplicationInterface.GPermission", LzeElPodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOveritElPodpis = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazOtevritAUzamknout = "Gordic.General.ApplicationInterface.GPermission", LzeElObrazOdemknout = "Gordic.General.ApplicationInterface.GPermission", LzeOdSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeDokumentPriraditKeSpisu = "Gordic.General.ApplicationInterface.GPermission", LzeDokumentPriraditKeSpisuZrusit = "Gordic.General.ApplicationInterface.GPermission", LzeKonvertovatDoPdf = "Gordic.General.ApplicationInterface.GPermission", LzeKonvertovatDoPdfZobrazitDialog = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitIniciacniDokument = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitVyrizujiciDokument = "Gordic.General.ApplicationInterface.GPermission", LzeZnovupodat = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitUzo = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitDatumVytvoreni = "Gordic.General.ApplicationInterface.GPermission", JeAktivniMuzeBytUlozenNeboArchivovan = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDoBaliku = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutZBaliku = "Gordic.General.ApplicationInterface.GPermission", LzeTrasy = "Gordic.General.ApplicationInterface.GPermission", LzeOperativneUlozit = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritNovouKopii = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritDuplikat = "Gordic.General.ApplicationInterface.GPermission", LzeOznacitJakoPreevidovaniZNahradniEvidence = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritSouvisejiciUkol = "Gordic.General.ApplicationInterface.GPermission", LzeRakVytvoritZadostZdf = "Gordic.General.ApplicationInterface.GPermission", LzeRakVytvoritZadostAkNeAk = "Gordic.General.ApplicationInterface.GPermission", LzeRakVytvoritZadostNapojeniNaVstup = "Gordic.General.ApplicationInterface.GPermission", LzeRakKonverze = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePrevzitZeSeznamu = "Gordic.General.ApplicationInterface.GPermission", LzeTrasuOdstranit = "Gordic.General.ApplicationInterface.GPermission", LzeTrasuEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeInterniFormularEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeInterniFormularUlozitNovouVerzi = "Gordic.General.ApplicationInterface.GPermission", LzeInterniFormularUlozitPdf = "Gordic.General.ApplicationInterface.GPermission", LzePridavatVlastnosti = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVlastnosti = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDotceneSubjekty = "Gordic.General.ApplicationInterface.GPermission", LzeTSpisVlozit = "Gordic.General.ApplicationInterface.GPermission", LzeTSpisVyjmout = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitSoucast = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitDil = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitTypovySpis = "Gordic.General.ApplicationInterface.GPermission", LzeTSpisVytvorit = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovatCj = "Gordic.General.ApplicationInterface.GPermission", JePovolenaPraceVAgendeAVlastnikAStavMaxUzavreno = "Gordic.General.ApplicationInterface.GPermission", JePovolenaPraceVAgendeBezOmezeniEa = "Gordic.General.ApplicationInterface.GPermission", LzeOdStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPristup2 = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPristup = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVec = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVecPodrobne = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPoznamku = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatNovePodaniNeboEditacniRezim = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocty = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatAktZnacku = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatCjExt = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpZnExt = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatTypDokumentu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDatumPodani = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDatumPodaniPriPodani = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpisPlanAZnak = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPozastaveniSkartacniOperace = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatUmisteni = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatCj = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpousteciUdalostAPopis = "Gordic.General.ApplicationInterface.GPermission", JeShodnyExterniSystemAJePovolenaAktivniPrace = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDilciTermin = "Gordic.General.ApplicationInterface.GPermission", LzeOveritPodpisElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeZobrazitHistoriiOvereniElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpousteciUdalostNsesss2023 = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GSslspidPermissionsDtoTypeLengths {}
	/**GSslspidFilter.*/
	const enum GSslspidFilter {
		/**PID - Průvodní Identifikátor Dokumentu.*/
		ixp,
		/**Licence databáze, do které písemnost patří.*/
		lic,
		/**The rok*/
		rok,
		/**Status písemnosti - zda je v archivní databázi (100) nebo v aktivní (0).*/
		status_pis,
		/**Důvod vymazaní.*/
		typ_duv_del,
		/**Datum vymazání.*/
		dat_del,
		/**Identifikátor spisu ve kterém je dokument vložen.*/
		ixp_spis=1000,
		/**Příznak zda se jedná o spis či písemnost(0-dokument,2-dokument vlozeny ve spisu).*/
		priz_spis,
		/**Identifikátor aktuálního vlastníka (funkce) dokumentu.*/
		ixs_fun_akt,
		/**Identifikátor aktuálního vlastníka (uzel) dokumentu.*/
		ixs_su_akt,
		/**Název dokumentu.*/
		nazev,
		/**Číslo jednací nebo agendové číslo nebo sp. značka spisu.*/
		akt_znacka,
		/**Stav distribuce.*/
		stav_dist,
		/**Stav dokumentu (písemnosti).*/
		stav_pis,
		/**Agenda, do které dokument patří.*/
		typ_ag,
		/**Kategorie typu dokumentu.*/
		ktg_typ,
		/**Identifikátpor typu písemnosti.*/
		ixs_typ,
		/**Příznak, že k dokumentu existuje profil o doručení - záznam v tabulce wflspio.*/
		s_prij,
		/**Zda existuje profil SSL pro tento dokument.*/
		s_ssl,
		/**Datum a čas poslední změny dokumentu.*/
		dat_zmena,
		/**Identifikátor autora poslední změny dokumentu.*/
		zmenu_prov,
		/**Příznak, zda existuje elektronická verze dokumentu.*/
		s_ele,
		/**Příznak, zda existuje fyzická verze dokumentu.*/
		s_fyz,
		/**Místo vzniku dokumentu.*/
		misto_vzniku,
		/**Příznak, zda je elektronický dokument podepsaný.*/
		s_sgn,
		/**Datum podání dokumentu.*/
		dat_pod,
		/**cs_akt_znacka*/
		cs_akt_znacka,
		/**Příznak zda byl dokument přečten aktuálním vlastníkem.*/
		priz_view_ssl,
		/**Barva.*/
		uzo,
		/**Identifikátor spisového plánu.*/
		spis_pl,
		/**Identifikátor spisového znaku.*/
		spis_znak,
		/**Identifikátor funkce agendového vlastníka.*/
		ixs_fun_wfl,
		/**Příznak uložení.*/
		s_uloz,
		/**Datum uložení.*/
		dat_uloz,
		/**Identifikátor uzlu agendového vlastníka.*/
		ixs_su_wfl,
		/**Příznak zda byl odeslán včetně originálu.*/
		s_odes,
		/**Příznak zda existuje profil čísla jednacího.*/
		priz_cj,
		/**Datum vyřízení.*/
		dat_vyriz,
		/**Identifikátor Číslo jednací.*/
		ixs_cj,
		/**Původ dokumentu.*/
		puvod,
		/**Příznak schválení dokumentu (úrovně wfl).*/
		s_schval,
		/**Identifikátor umístění dokumentu.*/
		umisteni,
		/**Stupeň utajení dokumentu (hodnoty různé dle implementace).*/
		st_utaj_id,
		/**Stupeň utajení dokumentu.*/
		st_utaj_id_orig,
		/**Skartační znak upravené oproti spisovému znaku.*/
		skar_znak,
		/**Skartační lhůta upravené oproti spisovému znaku.*/
		skar_lhuta,
		/**Rok spouštěcí události.*/
		rok_spo_uda,
		/**Identifikátor věcné skupiny.*/
		ixs_vsk,
		/**Identifikátor nejvyší entity.*/
		ixp_top,
		/**Příznak, o jaky typ dokumentu se jedna.*/
		typ_spis,
		/**Alternativní čárový kód převzatýz externího systému.*/
		barcode,
		/**Skartační lhůta pro správní řízení.*/
		skar_lhuta_spra,
		/**Identifikátor externího systému.*/
		ixs_ext,
		/**Rok předpokládané skartace dokumentu.*/
		rok_skartace,
		/**Identifikátor typu spousteci udalosti.*/
		ixs_spu,
		/**Počet listů dokumentu.*/
		poc_listu,
		/**Počet stran dokumentu.*/
		poc_stran,
		/**Počet kopií fyzických - text box na detailu písemnosti.*/
		poc_kop,
		/**Počet příloh dokumentu.*/
		poc_priloh,
		/**Počet listů příloh.*/
		poc_l_priloh,
		/**Číslo jednací pro zobrazenív seznamech.*/
		cj,
		/**Identifikační číslo organizace do které patří dokument.*/
		ico,
		/**Stav ve spisovně.*/
		StavSul,
		/**Příznak skartačního návrhu.*/
		PrizSkn,
		/**Příznak vypůjčení ze spisovny.*/
		PrizVyp,
		/**Příznak zda je dokument v balíku (>0).*/
		PrizVBaliku,
		/**Identifikátor balíku, ve kterém je dokument.*/
		ixs_zup,
		/**Příznak zda je žádost v Rak.*/
		Rak,
		/**Popis spouštěcí události.*/
		PopisSpoUda,
		/**Důvod pozastavení skartační operace.*/
		DuvodPozSkar,
		/**Příznak pozastavení skartační operace.*/
		PrizPozSkar,
		/**Datum do pozastavení skartační operace.*/
		RokDoPozSkar,
		/**Stav spisu ve kterém je dokument vložen (pokud není vložen ve spisu pak vrací 0).*/
		StavPisSpis,
		/**Datum vzniku záznamu.*/
		dat_mpd0,
		/**Identifikátor LPC.*/
		ixs_lpc,
		/**Uživatelsky nastavitelný sloupec A.*/
		uziv_sl_a,
		/**Uživatelsky nastavitelný sloupec A2.*/
		uziv_sl_a2,
		/**Uživatelsky nastavitelný sloupec A3.*/
		uziv_sl_a3,
		/**Uživatelsky nastavitelný sloupec B.*/
		uziv_sl_b,
		/**Uživatelsky nastavitelný sloupec B2.*/
		uziv_sl_b2,
		/**Uživatelsky nastavitelný sloupec B3.*/
		uziv_sl_b3,
		/**Uživatelsky nastavitelný sloupec C.*/
		uziv_sl_c,
		/**Uživatelsky nastavitelný sloupec C2.*/
		uziv_sl_c2,
		/**Uživatelsky nastavitelný sloupec D.*/
		uziv_sl_d,
		/**Uživatelsky nastavitelný sloupec D2.*/
		uziv_sl_d2,
		/**Uživatelsky nastavitelný sloupec J.*/
		uziv_sl_j,
		/**Uživatelsky nastavitelný sloupec J2.*/
		uziv_sl_j2,
		/**Uživatelsky nastavitelný sloupec K.*/
		uziv_sl_k,
		/**Uživatelsky nastavitelný sloupec K2.*/
		uziv_sl_k2,
		/**Uživatelsky nastavitelný sloupec N.*/
		uziv_sl_n,
		/**Typ entity.*/
		typ_entity_ico,
		/**CoJsemZac*/
		CoJsemZac,
		/**Hledání podle textu dle vlastního uvážení.*/
		fulltext,
		/**Má vyřízenou žádost v RAK.*/
		VyrizenaZadostVRak,
		/**The dilci termin*/
		DilciTermin,
		/**The ixs fun akt wflstop*/
		ixs_fun_akt_wflstop,
		/**The ixs su akt wflstop*/
		ixs_su_akt_wflstop,
		/**The ixs fun akt wflstop - jednoradkovy pro Multipole*/
		IxsFunPredavajici,
		/**The ixs su akt wflstop - jednoradkovy pro Multipole*/
		IxsSuPredavajici,
		/**The ixs orj pro redistribuci - jednoradkovy pro Multipole*/
		IxsOrjPredavajici,
		/**The ixs fun cil wflstop*/
		ixs_fun_cil_wflstop,
		/**The ixs su akt wflstop*/
		ixs_su_do_wflstop,
		/**The ixs su cil wflhtop - uzel historicky*/
		ixs_su_cil_wflhtop,
		/**The ixs fun cil wflhtop - funkce historicky*/
		ixs_fun_cil_wflhtop,
		/**The dat cil wflhtop - datum redistribuce historicky*/
		dat_cil_wflhtop,
		/**The stav top wflhtop*/
		stav_top_wflhtop,
		/**The ixs su start wflhtop*/
		ixs_su_start_wflhtop,
		/**The ixs fun start wflhtop*/
		ixs_fun_start_wflhtop,
		/**The dat zmena wflhupi - datum redistribuce (Historie pohybu)*/
		dat_zmena_wflhupi,
		/**The typ upi wflhupi*/
		typ_upi_wflhupi,
		/**The priz spis wflhupi*/
		priz_spis_wflhupi,
		/**The ixs fun od wflhupi*/
		ixs_fun_od_wflhupi,
		/**The ixs su od wflhupi*/
		ixs_su_od_wflhupi,
		/**The ixs su do wflhupi*/
		ixs_su_do_wflhupi,
		/**The ixs fun do wflhupi*/
		ixs_fun_do_wflhupi,
		/**The wflhupi.ixs_fun_od != wflhupi.ixs_fun_do*/
		NepredanoFunkciSamaNaSebeWflhupi,
		/**The ixs fun cil wflstop - jednoradkovy pro Multipole*/
		IxsFunPrebirajici,
		/**The ixs su akt wflstop - jednoradkovy pro Multipole*/
		IxsSuPrebirajici,
		/**The ixs orj pro redistribuci - jednoradkovy pro Multipole*/
		IxsOrjPrebirajici,
		/**subjekt předávající ve filtru vlastnictví.*/
		RedistribucePredavajiciVlastnictvi,
		/**subjekt přebírající ve filtru vlastnictví.*/
		RedistribucePrebirajiciVlastnictvi,
		/**Pomocné filtrovaní na redistribuci.*/
		IDokumentyNaCeste,
		/**Aktivní (aktivita 100) záznam přílohy (ixb) z tabulky wflspx*/
		ixb_wflsepx,
		/**Ber ohled na agendu.*/
		SOhledemNaAgendu,
		/**Datumový interval (typ datumu přepíná pomocí faktoru).*/
		DatumovyIntervalValue,
		/**Datumový interval (typ datumu přepíná pomocí faktoru).*/
		DatumovyIntervalFactor,
		/**Filtrovaní na funkci [true] či na spisový uzel [false]. Pokud se nemá použít, pak je null.*/
		Vlastni,
		/**Datum vyřízení spisu do z wflsdcj*/
		dat_vyriz_do_wflsdcj,
		/**the stav cj wflsdcj*/
		stav_cj_wflsdcj,
		/**the stav sslden wflsdcj*/
		sslden_wflsdcj,
		/**the stav rok wflsdcj*/
		rok_wflsdcj,
		/**the stav por cislo wflsdcj*/
		por_cislo_wflsdcj,
		/**the dokument patri aktualnimu uzlu*/
		DokumentAktualnihoUzlu,
		/**Zda je originál*/
		s_orig,
		/**The ixs fun cil wflstop - Všechny funkce, které uživatel může mít.*/
		IxsFunVsechnyFunkcePrebirajiciho,
		/**Dle kategorie agendy 10.*/
		ProEkoAgendy,
		/**Filtr na kategorie typu dokumentu, který se načte dle zadaného typu agendy.*/
		KategorieTypuDokumentuDleTypuAgendy,
		/**ikona vysledku hromadne operace*/
		ico_status,
		/**Čárový kód přílohy.*/
		ixs_car_wflspri,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceTyp,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceSubjectIxs,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceSubjectTypeIxs,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceIxsSuDo,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceIxsFunDo,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceIxsFunOd,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceCileneNotFyzicky,
		/**specifický filtr pro přehled redistribuce*/
		PrehledRedistribuceDateInterval,
		/**ID skartačního reimu.*/
		ixs_skr,
		/**ID evidenčního období.*/
		ixs_obd,
		/**Pořadí v rámci období.*/
		por_cislo_obd,
		/**Datum přenosu.*/
		dat_prenosu,
		/**Datum znepřístupnní.*/
		dat_znepristupneni,
		/**Předpokládaný rok kontroly spoutěcí události.*/
		rok_kon_spu,
		/**Filtrovaní na vlastnictví všemi funkcemi aktuálně přihlášeného referenta.*/
		VlastnictviVsechnyFunkceReferenta,
		/**Historie čísel jednacích.*/
		cs_cj_doc_ssldspi,
		/**Filtrování na spisové znaky definované parametrem XXX.*/
		DefinovaneSpisoveZnaky,
		/**Věc podrobně.*/
		obsah_text=2000,
		/**Poznámka.*/
		poznamka,
		/**Počet kopií písemnosti v ssl (tlačítko kopie).*/
		poc_kopii,
		/**Datum příjmu dokumentu.*/
		dat_prij_pod,
		/**Identifikátor spisového uzlu který podal.*/
		ixs_su_pod,
		/**Datum evidence.*/
		dat_evid,
		/**Spisová značka spisu, ve které je dokument vložený.*/
		cj_spis,
		/**Název subjektu, kterému byl dokument odeslán.*/
		odeslano_kam,
		/**Příznak, zda má řešitele.*/
		s_resitel,
		/**Identifikátor funkce řešitele.*/
		ixs_fun_resitel,
		/**Příznak, zda je vyřízeno.*/
		s_vyriz,
		/**Typ vyřízení.*/
		typ_vyriz,
		/**Popis jak bylo vyřízeno.*/
		vyriz_komu,
		/**Poznámka k vyřízení.*/
		vyriz_pozn,
		/**Identifikátor kdo provedl změnu při vyřizování.*/
		ixs_zmp_vyriz,
		/**Identifikátor schvalovatele.*/
		ixs_fun_schval,
		/**Identifikátor subjektu, který naposledy změnil schválení.*/
		ixs_zmp_schval,
		/**Příznak uzavření.*/
		s_uzav,
		/**Datum uzavření.*/
		dat_uzav,
		/**Identifikátor kdo poslední provedl změnu uzavření.*/
		ixs_zmp_uzav,
		/**Příznak stornování.*/
		s_stor,
		/**Příznak ztracení.*/
		s_ztrat,
		/**Vztah písemnosti ke spisu.*/
		vztah_spis,
		/**Zda má nabytou právní moc.*/
		pr_moc,
		/**Datum nabytí právní moci.*/
		dat_pr_moc,
		/**Příznak rozšířeního (agendového) profilu.*/
		s_agp,
		/**Příznak zastavení.*/
		s_zastav,
		/**Věc podrobně (skládá dohromady všechny obsah_text a upravuje konce řádků).*/
		obsah_text_slozeny,
		/**Věc podrobně pro použití v seznamu (obsahuje prvnich 254 znaků věci podrobně - sloupec obsah_text s odstranenym odradkovanim).*/
		obsah_text_pro_seznam,
		/**Zda je vyplněn schvalovatel.*/
		SSchvalSsl,
		/**Pořadové číslo dokumentu ve spisu, není-li to dokument v spisu, je GInt32.Null.*/
		PorCisloVSpisu,
		/**Identifikátor filtru vlastictví.*/
		SubjektIxs,
		/**Typ identifikátoru filtru vlastictví.*/
		SubjektTypeIxs,
		/**Datum vykonavatelnosti.*/
		dat_vykonav,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GSslspidFilterDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Sslpid Filter Dto.*/
	interface GSslspidFilterDto extends Gordic.Wfl.Interface.GWflspidFilterDto {
		/**The filter group sslspid*/
		FILTER_GROUP_SSLSPID?: string|null;
		/**Věc podrobně.*/
		obsah_text?: GBaseFilter<string>|null;
		/**Poznámka.*/
		poznamka?: GBaseFilter<string>|null;
		/**Počet kopií písemnosti v ssl (tlačítko kopie).*/
		poc_kopii?: GBaseFilter<number>|null;
		/**Datum příjmu dokumentu.*/
		dat_prij_pod?: GBaseFilter<JsonDate>|null;
		/**Identifikátor spisového uzlu který podal.*/
		ixs_su_pod?: GBaseFilter<string>|null;
		/**Datum evidence.*/
		dat_evid?: GBaseFilter<JsonDate>|null;
		/**Spisová značka spisu, ve které je dokument vložený.*/
		cj_spis?: GBaseFilter<string>|null;
		/**Název subjektu, kterému byl dokument odeslán.*/
		odeslano_kam?: GBaseFilter<string>|null;
		/**Příznak, zda má řešitele.*/
		s_resitel?: number|null;
		/**Identifikátor funkce řešitele.*/
		ixs_fun_resitel?: GBaseFilter<string>|null;
		/**Příznak, zda je vyřízeno.*/
		s_vyriz?: number|null;
		/**Typ vyřízení.*/
		typ_vyriz?: Gordic.Ginis.DbModel.GSslctvyEnum[]|null;
		/**Popis jak bylo vyřízeno.*/
		vyriz_komu?: GBaseFilter<string>|null;
		/**Poznámka k vyřízení*/
		vyriz_pozn?: GBaseFilter<string>|null;
		/**Identifikátor kdo provedl změnu při vyřizování.*/
		ixs_zmp_vyriz?: GBaseFilter<string>|null;
		/**Identifikátor schvalovatele.*/
		ixs_fun_schval?: GBaseFilter<string>|null;
		/**Identifikátor subjektu, který naposledy změnil schválení.*/
		ixs_zmp_schval?: GBaseFilter<string>|null;
		/**Příznak uzavření.*/
		s_uzav?: number|null;
		/**Datum uzavření.*/
		dat_uzav?: GBaseFilter<JsonDate>|null;
		/**Identifikátor kdo poslední provedl změnu uzavření.*/
		ixs_zmp_uzav?: GBaseFilter<string>|null;
		/**Příznak stornování.*/
		s_stor?: number|null;
		/**Příznak ztracení.*/
		s_ztrat?: number|null;
		/**Vztah písemnosti ke spisu.*/
		vztah_spis?: Gordic.Ginis.DbModel.GSslcvspEnum[]|null;
		/**Zda má nabytou právní moc.*/
		pr_moc?: GBaseFilter<number>|null;
		/**Datum nabytí právní moci.*/
		dat_pr_moc?: GBaseFilter<JsonDate>|null;
		/**Příznak rozšířeního (agendového) profilu.*/
		s_agp?: number|null;
		/**Příznak zastavení.*/
		s_zastav?: number|null;
		/**Datum vykonavatelnosti.*/
		dat_vykonav?: GBaseFilter<JsonDate>|null;
		/**Věc podrobně (skládá dohromady všechny obsah_text a upravuje konce řádků).*/
		obsah_text_slozeny?: GBaseFilter<string>|null;
		/**Identifikátor filtru vlastictví.*/
		SubjektIxs?: string|null;
		/**Typ identifikátoru filtru vlastnictví.*/
		SubjektTypeIxs?: Gordic.Gin.Interface.IxsType|null;
		/**Typ subjektu ve filtru vlastnictví.*/
		SubjectStructOrg?: Gordic.Gin.Interface.SubjectStructOrgEnum|null;
	}
	const enum GSslspidFilterDtoNames { FILTER_GROUP_SSLSPID = "FILTER_GROUP_SSLSPID", obsah_text = "obsah_text", poznamka = "poznamka", poc_kopii = "poc_kopii", dat_prij_pod = "dat_prij_pod", ixs_su_pod = "ixs_su_pod", dat_evid = "dat_evid", cj_spis = "cj_spis", odeslano_kam = "odeslano_kam", s_resitel = "s_resitel", ixs_fun_resitel = "ixs_fun_resitel", s_vyriz = "s_vyriz", typ_vyriz = "typ_vyriz", vyriz_komu = "vyriz_komu", vyriz_pozn = "vyriz_pozn", ixs_zmp_vyriz = "ixs_zmp_vyriz", ixs_fun_schval = "ixs_fun_schval", ixs_zmp_schval = "ixs_zmp_schval", s_uzav = "s_uzav", dat_uzav = "dat_uzav", ixs_zmp_uzav = "ixs_zmp_uzav", s_stor = "s_stor", s_ztrat = "s_ztrat", vztah_spis = "vztah_spis", pr_moc = "pr_moc", dat_pr_moc = "dat_pr_moc", s_agp = "s_agp", s_zastav = "s_zastav", dat_vykonav = "dat_vykonav", obsah_text_slozeny = "obsah_text_slozeny", SubjektIxs = "SubjektIxs", SubjektTypeIxs = "SubjektTypeIxs", SubjectStructOrg = "SubjectStructOrg", FILTER_GROUP_WFLSPID = "FILTER_GROUP_WFLSPID", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", st_utaj_id_orig = "st_utaj_id_orig", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", ixs_zup = "ixs_zup", dat_mpd0 = "dat_mpd0", ixs_lpc = "ixs_lpc", uziv_sl_a = "uziv_sl_a", uziv_sl_a2 = "uziv_sl_a2", uziv_sl_a3 = "uziv_sl_a3", uziv_sl_b = "uziv_sl_b", uziv_sl_b2 = "uziv_sl_b2", uziv_sl_b3 = "uziv_sl_b3", uziv_sl_c = "uziv_sl_c", uziv_sl_c2 = "uziv_sl_c2", uziv_sl_d = "uziv_sl_d", uziv_sl_d2 = "uziv_sl_d2", uziv_sl_j = "uziv_sl_j", uziv_sl_j2 = "uziv_sl_j2", uziv_sl_k = "uziv_sl_k", uziv_sl_k2 = "uziv_sl_k2", uziv_sl_n = "uziv_sl_n", dat_dtermin = "dat_dtermin", priz_kop = "priz_kop", priz_kopie = "priz_kopie", stav_epk_txt = "stav_epk_txt", typ_pozad_pod_txt = "typ_pozad_pod_txt", dat_vyriz_do = "dat_vyriz_do", zp_vyriz_txt = "zp_vyriz_txt", s_orig = "s_orig", fulltext = "fulltext", VyrizenaZadostVRak = "VyrizenaZadostVRak", DilciTermin = "DilciTermin", ixs_fun_akt_wflstop = "ixs_fun_akt_wflstop", ixs_su_akt_wflstop = "ixs_su_akt_wflstop", ixs_fun_cil_wflstop = "ixs_fun_cil_wflstop", ixs_su_do_wflstop = "ixs_su_do_wflstop", ixs_su_cil_wflhtop = "ixs_su_cil_wflhtop", ixs_fun_cil_wflhtop = "ixs_fun_cil_wflhtop", dat_cil_wflhtop = "dat_cil_wflhtop", stav_top_wflhtop = "stav_top_wflhtop", ixs_su_start_wflhtop = "ixs_su_start_wflhtop", ixs_fun_start_wflhtop = "ixs_fun_start_wflhtop", dat_zmena_wflhupi = "dat_zmena_wflhupi", typ_upi_wflhupi = "typ_upi_wflhupi", priz_spis_wflhupi = "priz_spis_wflhupi", ixs_fun_od_wflhupi = "ixs_fun_od_wflhupi", ixs_su_od_wflhupi = "ixs_su_od_wflhupi", ixs_su_do_wflhupi = "ixs_su_do_wflhupi", ixs_fun_do_wflhupi = "ixs_fun_do_wflhupi", NepredanoFunkciSamaNaSebeWflhupi = "NepredanoFunkciSamaNaSebeWflhupi", ixb_wflsepx = "ixb_wflsepx", SOhledemNaAgendu = "SOhledemNaAgendu", DatumovyIntervalValue = "DatumovyIntervalValue", DatumovyIntervalFactor = "DatumovyIntervalFactor", Vlastni = "Vlastni", IxsFunPredavajici = "IxsFunPredavajici", IxsSuPredavajici = "IxsSuPredavajici", IxsOrjPredavajici = "IxsOrjPredavajici", IxsFunPrebirajici = "IxsFunPrebirajici", IxsSuPrebirajici = "IxsSuPrebirajici", IxsOrjPrebirajici = "IxsOrjPrebirajici", RedistribucePredavajiciVlastnictvi = "RedistribucePredavajiciVlastnictvi", RedistribucePrebirajiciVlastnictvi = "RedistribucePrebirajiciVlastnictvi", IDokumentyNaCeste = "IDokumentyNaCeste", dat_vyriz_do_wflsdcj = "dat_vyriz_do_wflsdcj", stav_cj_wflsdcj = "stav_cj_wflsdcj", sslden_wflsdcj = "sslden_wflsdcj", rok_wflsdcj = "rok_wflsdcj", por_cislo_wflsdcj = "por_cislo_wflsdcj", DokumentAktualnihoUzlu = "DokumentAktualnihoUzlu", IxsFunVsechnyFunkcePrebirajiciho = "IxsFunVsechnyFunkcePrebirajiciho", ProEkoAgendy = "ProEkoAgendy", KategorieTypuDokumentuDleTypuAgendy = "KategorieTypuDokumentuDleTypuAgendy", ico_status = "ico_status", ixs_car_wflspri = "ixs_car_wflspri", ixs_skr = "ixs_skr", ixs_obd = "ixs_obd", por_cislo_obd = "por_cislo_obd", dat_prenosu = "dat_prenosu", dat_znepristupneni = "dat_znepristupneni", rok_kon_spu = "rok_kon_spu", VlastnictviVsechnyFunkceReferenta = "VlastnictviVsechnyFunkceReferenta", PrehledRedistribuceTyp = "PrehledRedistribuceTyp", PrehledRedistribuceSubjectIxs = "PrehledRedistribuceSubjectIxs", PrehledRedistribuceSubjectTypeIxs = "PrehledRedistribuceSubjectTypeIxs", PrehledRedistribuceIxsSuDo = "PrehledRedistribuceIxsSuDo", PrehledRedistribuceIxsFunDo = "PrehledRedistribuceIxsFunDo", PrehledRedistribuceIxsFunOd = "PrehledRedistribuceIxsFunOd", PrehledRedistribuceCileneNotFyzicky = "PrehledRedistribuceCileneNotFyzicky", PrehledRedistribuceDateInterval = "PrehledRedistribuceDateInterval", FILTER_GROUP_WFLSIXP = "FILTER_GROUP_WFLSIXP", ixp = "ixp", lic = "lic", rok = "rok", status_pis = "status_pis", typ_duv_del = "typ_duv_del", dat_del = "dat_del",}
	const enum GSslspidFilterDtoFragments { FILTER_GROUP_SSLSPID = "*", obsah_text = "SSLSPID", poznamka = "SSLSPID", poc_kopii = "SSLSPID", dat_prij_pod = "SSLSPID", ixs_su_pod = "SSLSPID", dat_evid = "SSLSPID", cj_spis = "SSLSPID", odeslano_kam = "SSLSPID", s_resitel = "SSLSPID", ixs_fun_resitel = "SSLSPID", s_vyriz = "SSLSPID", typ_vyriz = "SSLSPID", vyriz_komu = "SSLSPID", vyriz_pozn = "SSLSPID", ixs_zmp_vyriz = "SSLSPID", ixs_fun_schval = "SSLSPID", ixs_zmp_schval = "SSLSPID", s_uzav = "SSLSPID", dat_uzav = "SSLSPID", ixs_zmp_uzav = "SSLSPID", s_stor = "SSLSPID", s_ztrat = "SSLSPID", vztah_spis = "SSLSPID", pr_moc = "SSLSPID", dat_pr_moc = "SSLSPID", s_agp = "SSLSPID", s_zastav = "SSLSPID", dat_vykonav = "SSLSPID", obsah_text_slozeny = "SSLSPID", SubjektIxs = "*", SubjektTypeIxs = "*", SubjectStructOrg = "*", FILTER_GROUP_WFLSPID = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", st_utaj_id_orig = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*", ixs_zup = "*", dat_mpd0 = "*", ixs_lpc = "*", uziv_sl_a = "*", uziv_sl_a2 = "*", uziv_sl_a3 = "*", uziv_sl_b = "*", uziv_sl_b2 = "*", uziv_sl_b3 = "*", uziv_sl_c = "*", uziv_sl_c2 = "*", uziv_sl_d = "*", uziv_sl_d2 = "*", uziv_sl_j = "*", uziv_sl_j2 = "*", uziv_sl_k = "*", uziv_sl_k2 = "*", uziv_sl_n = "*", dat_dtermin = "*", priz_kop = "*", priz_kopie = "*", stav_epk_txt = "*", typ_pozad_pod_txt = "*", dat_vyriz_do = "*", zp_vyriz_txt = "*", s_orig = "*", fulltext = "*", VyrizenaZadostVRak = "*", DilciTermin = "*", ixs_fun_akt_wflstop = "*", ixs_su_akt_wflstop = "*", ixs_fun_cil_wflstop = "*", ixs_su_do_wflstop = "*", ixs_su_cil_wflhtop = "*", ixs_fun_cil_wflhtop = "*", dat_cil_wflhtop = "*", stav_top_wflhtop = "*", ixs_su_start_wflhtop = "*", ixs_fun_start_wflhtop = "*", dat_zmena_wflhupi = "*", typ_upi_wflhupi = "*", priz_spis_wflhupi = "*", ixs_fun_od_wflhupi = "*", ixs_su_od_wflhupi = "*", ixs_su_do_wflhupi = "*", ixs_fun_do_wflhupi = "*", NepredanoFunkciSamaNaSebeWflhupi = "*", ixb_wflsepx = "*", SOhledemNaAgendu = "*", DatumovyIntervalValue = "*", DatumovyIntervalFactor = "*", Vlastni = "*", IxsFunPredavajici = "*", IxsSuPredavajici = "*", IxsOrjPredavajici = "*", IxsFunPrebirajici = "*", IxsSuPrebirajici = "*", IxsOrjPrebirajici = "*", RedistribucePredavajiciVlastnictvi = "*", RedistribucePrebirajiciVlastnictvi = "*", IDokumentyNaCeste = "*", dat_vyriz_do_wflsdcj = "*", stav_cj_wflsdcj = "*", sslden_wflsdcj = "*", rok_wflsdcj = "*", por_cislo_wflsdcj = "*", DokumentAktualnihoUzlu = "*", IxsFunVsechnyFunkcePrebirajiciho = "*", ProEkoAgendy = "*", KategorieTypuDokumentuDleTypuAgendy = "*", ico_status = "*", ixs_car_wflspri = "*", ixs_skr = "*", ixs_obd = "*", por_cislo_obd = "*", dat_prenosu = "*", dat_znepristupneni = "*", rok_kon_spu = "*", VlastnictviVsechnyFunkceReferenta = "*", PrehledRedistribuceTyp = "*", PrehledRedistribuceSubjectIxs = "*", PrehledRedistribuceSubjectTypeIxs = "*", PrehledRedistribuceIxsSuDo = "*", PrehledRedistribuceIxsFunDo = "*", PrehledRedistribuceIxsFunOd = "*", PrehledRedistribuceCileneNotFyzicky = "*", PrehledRedistribuceDateInterval = "*", FILTER_GROUP_WFLSIXP = "*", ixp = "*", lic = "*", rok = "*", status_pis = "*", typ_duv_del = "*", dat_del = "*",}
	const enum GSslspidFilterDtoTypes { FILTER_GROUP_SSLSPID = "string", obsah_text = "GBaseFilter<string>", poznamka = "GBaseFilter<string>", poc_kopii = "GBaseFilter<number>", dat_prij_pod = "GBaseFilter<JsonDate>", ixs_su_pod = "GBaseFilter<string>", dat_evid = "GBaseFilter<JsonDate>", cj_spis = "GBaseFilter<string>", odeslano_kam = "GBaseFilter<string>", s_resitel = "number", ixs_fun_resitel = "GBaseFilter<string>", s_vyriz = "number", typ_vyriz = "Gordic.Ginis.DbModel.GSslctvyEnum[]", vyriz_komu = "GBaseFilter<string>", vyriz_pozn = "GBaseFilter<string>", ixs_zmp_vyriz = "GBaseFilter<string>", ixs_fun_schval = "GBaseFilter<string>", ixs_zmp_schval = "GBaseFilter<string>", s_uzav = "number", dat_uzav = "GBaseFilter<JsonDate>", ixs_zmp_uzav = "GBaseFilter<string>", s_stor = "number", s_ztrat = "number", vztah_spis = "Gordic.Ginis.DbModel.GSslcvspEnum[]", pr_moc = "GBaseFilter<number>", dat_pr_moc = "GBaseFilter<JsonDate>", s_agp = "number", s_zastav = "number", dat_vykonav = "GBaseFilter<JsonDate>", obsah_text_slozeny = "GBaseFilter<string>", SubjektIxs = "string", SubjektTypeIxs = "Gordic.Gin.Interface.IxsType", SubjectStructOrg = "Gordic.Gin.Interface.SubjectStructOrgEnum", FILTER_GROUP_WFLSPID = "string", ixp_spis = "GBaseFilter<string>", priz_spis = "Gordic.Ginis.DbModel.GWflcpriEnum[]", ixs_fun_akt = "string[]", ixs_su_akt = "string[]", nazev = "GBaseFilter<string>", akt_znacka = "GBaseFilter<string>", stav_dist = "Gordic.Ginis.DbModel.GWflcstaEnum[]", stav_pis = "Gordic.Ginis.DbModel.GWflcstpEnum[]", typ_ag = "number[]", ktg_typ = "GBaseFilter<number>", ixs_typ = "string[]", s_prij = "Gordic.Ginis.DbModel.GWflcsprEnum[]", s_ssl = "Gordic.Ginis.DbModel.GWflcsslEnum[]", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "string", s_ele = "Gordic.Ginis.DbModel.GWflceleEnum[]", s_fyz = "Gordic.Ginis.DbModel.GWflcfyzEnum[]", misto_vzniku = "GBaseFilter<string>", s_sgn = "Gordic.Ginis.DbModel.GWflcsgnEnum[]", dat_pod = "GIntervalDto<JsonDate>", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string[]", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string[]", s_uloz = "number", dat_uloz = "GBaseFilter<JsonDate>", ixs_su_wfl = "string[]", s_odes = "number", priz_cj = "Gordic.Ginis.DbModel.GWflcpcjEnum[]", dat_vyriz = "GIntervalDto<JsonDate>", ixs_cj = "string", puvod = "Gordic.Ginis.DbModel.GWflcpuvEnum[]", s_schval = "number", umisteni = "string", st_utaj_id = "number", st_utaj_id_orig = "Gordic.Ginis.DbModel.GGincstuEnum[]", skar_znak = "GBaseFilter<string>", skar_lhuta = "GBaseFilter<number>", rok_spo_uda = "GBaseFilter<number>", ixp_top = "GBaseFilter<string>", typ_spis = "Gordic.Ginis.DbModel.GWflctysEnum[]", barcode = "GBaseFilter<string>", skar_lhuta_spra = "GBaseFilter<number>", ixs_ext = "GBaseFilter<string>", rok_skartace = "GBaseFilter<number>", ixs_spu = "GBaseFilter<string>", poc_listu = "GBaseFilter<string>", poc_stran = "GBaseFilter<number>", poc_kop = "GBaseFilter<number>", poc_priloh = "GBaseFilter<number>", poc_l_priloh = "GBaseFilter<string>", cj = "GBaseFilter<string>", ico = "GBaseFilter<string>", ixs_zup = "string", dat_mpd0 = "GBaseFilter<JsonDate>", ixs_lpc = "GBaseFilter<string>", uziv_sl_a = "GBaseFilter<string>", uziv_sl_a2 = "GBaseFilter<string>", uziv_sl_a3 = "GBaseFilter<string>", uziv_sl_b = "GBaseFilter<string>", uziv_sl_b2 = "GBaseFilter<string>", uziv_sl_b3 = "GBaseFilter<string>", uziv_sl_c = "GBaseFilter<string>", uziv_sl_c2 = "GBaseFilter<string>", uziv_sl_d = "GBaseFilter<string>", uziv_sl_d2 = "GBaseFilter<string>", uziv_sl_j = "GBaseFilter<string>", uziv_sl_j2 = "GBaseFilter<string>", uziv_sl_k = "GBaseFilter<string>", uziv_sl_k2 = "GBaseFilter<string>", uziv_sl_n = "GBaseFilter<string>", dat_dtermin = "JsonDate", priz_kop = "number", priz_kopie = "string", stav_epk_txt = "string", typ_pozad_pod_txt = "string", dat_vyriz_do = "GIntervalDto<JsonDate>", zp_vyriz_txt = "string", s_orig = "number", fulltext = "string", VyrizenaZadostVRak = "boolean", DilciTermin = "GIntervalDto<JsonDate>", ixs_fun_akt_wflstop = "string[]", ixs_su_akt_wflstop = "string[]", ixs_fun_cil_wflstop = "string[]", ixs_su_do_wflstop = "string[]", ixs_su_cil_wflhtop = "string[]", ixs_fun_cil_wflhtop = "string[]", dat_cil_wflhtop = "GIntervalDto<JsonDate>", stav_top_wflhtop = "GBaseFilter<number>", ixs_su_start_wflhtop = "string[]", ixs_fun_start_wflhtop = "string[]", dat_zmena_wflhupi = "GIntervalDto<JsonDate>", typ_upi_wflhupi = "GBaseFilter<number>", priz_spis_wflhupi = "GBaseFilter<number>", ixs_fun_od_wflhupi = "string[]", ixs_su_od_wflhupi = "string[]", ixs_su_do_wflhupi = "string[]", ixs_fun_do_wflhupi = "string[]", NepredanoFunkciSamaNaSebeWflhupi = "boolean", ixb_wflsepx = "GBaseFilter<string>", SOhledemNaAgendu = "boolean", DatumovyIntervalValue = "GIntervalDto<JsonDate>", DatumovyIntervalFactor = "'DP' | 'DV' | 'DZ'", Vlastni = "boolean", IxsFunPredavajici = "string", IxsSuPredavajici = "string", IxsOrjPredavajici = "string", IxsFunPrebirajici = "string", IxsSuPrebirajici = "string", IxsOrjPrebirajici = "string", RedistribucePredavajiciVlastnictvi = "Gordic.Gin.Interface.SubjektSelectedInfo", RedistribucePrebirajiciVlastnictvi = "Gordic.Gin.Interface.SubjektSelectedInfo", IDokumentyNaCeste = "boolean", dat_vyriz_do_wflsdcj = "GIntervalDto<JsonDate>", stav_cj_wflsdcj = "number[]", sslden_wflsdcj = "GBaseFilter<string>", rok_wflsdcj = "GBaseFilter<number>", por_cislo_wflsdcj = "GBaseFilter<number>", DokumentAktualnihoUzlu = "boolean", IxsFunVsechnyFunkcePrebirajiciho = "string", ProEkoAgendy = "boolean", KategorieTypuDokumentuDleTypuAgendy = "number", ico_status = "number", ixs_car_wflspri = "GBaseFilter<string>", ixs_skr = "GBaseFilter<string>", ixs_obd = "GBaseFilter<string>", por_cislo_obd = "GBaseFilter<number>", dat_prenosu = "GIntervalDto<JsonDate>", dat_znepristupneni = "GIntervalDto<JsonDate>", rok_kon_spu = "GBaseFilter<number>", VlastnictviVsechnyFunkceReferenta = "boolean", PrehledRedistribuceTyp = "number", PrehledRedistribuceSubjectIxs = "string", PrehledRedistribuceSubjectTypeIxs = "number", PrehledRedistribuceIxsSuDo = "string", PrehledRedistribuceIxsFunDo = "string", PrehledRedistribuceIxsFunOd = "string", PrehledRedistribuceCileneNotFyzicky = "boolean", PrehledRedistribuceDateInterval = "Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto", FILTER_GROUP_WFLSIXP = "string", ixp = "GBaseFilter<string>", lic = "GBaseFilter<string>", rok = "GBaseFilter<number>", status_pis = "Gordic.Ginis.DbModel.GWflcumpEnum[]", typ_duv_del = "Gordic.Ginis.DbModel.GWflctddEnum[]", dat_del = "GIntervalDto<JsonDate>",}
	const enum GSslspidFilterDtoTypeLengths { obsah_text = 254, poznamka = 100, cj_spis = 50, odeslano_kam = 100, vyriz_komu = 100, vyriz_pozn = 254, nazev = 100, akt_znacka = 50, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, umisteni = 20, skar_znak = 2, barcode = 50, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, uziv_sl_a = 254, uziv_sl_a2 = 254, uziv_sl_a3 = 254, uziv_sl_b = 254, uziv_sl_b2 = 254, uziv_sl_b3 = 254, uziv_sl_c = 254, uziv_sl_c2 = 254, uziv_sl_d = 254, uziv_sl_d2 = 254, uziv_sl_j = 254, uziv_sl_j2 = 254, uziv_sl_k = 254, uziv_sl_k2 = 254, uziv_sl_n = 254, sslden_wflsdcj = 7, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\GSslspidGetDashboardCountsDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dto s počty a filtry pro zobrazení na úvodní obrazovce.*/
	interface GDashboardCountsDto {
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_KE_ZPRACOVANI?: string|null;
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_KE_ZPRACOVANI?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_K_UZAVRENI?: string|null;
		/**Fragmenty*/
		FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_TERMINY?: string|null;
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI?: string|null;
		/**Fragmenty*/
		FRAGMENT_BAREVNE_OZNACENE?: string|null;
		/**Fragmenty*/
		FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI?: string|null;
		/**The pocet dokumentu ke zpracovani celkem*/
		DokumentyKeZpracovani?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>|null;
		/**The pocet dokumentu ke zpracovani ve vlastnictvi*/
		DokumentyKeZpracovaniVeVlastnictvi?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>|null;
		/**The pocet dokumentu ke zpracovani v redistribuci*/
		DokumentyKeZpracovaniVRedistribuci?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>|null;
		/**The pocet spisu ke zpracovani celkem*/
		SpisyKeZpracovani?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>|null;
		/**The pocet spisu ke zpracovani ve vlastnictvi*/
		SpisyKeZpracovaniVeVlastnictvi?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>|null;
		/**The pocet spisu ke zpracovani v redistribuci*/
		SpisyKeZpracovaniVRedistribuci?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>|null;
		/**The pocet spisu k uzavreni celkem*/
		SpisyKUzavreni?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>|null;
		/**The pocet spisu k uzavreni s vyrizenou zadosti v rak*/
		SpisyKUzavreniSVyrizenouZadostiVRak?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>|null;
		/**The pocet spisu pred terminem*/
		SpisyPredTerminem?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>|null;
		/**The pocet spisu po terminu*/
		SpisyPoTerminu?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>|null;
		/**The pocet dokumentu po terminu*/
		DokumentyPoTerminu?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>|null;
		/**The pocet k predani*/
		DokumentyASpisyKPredani?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The dokumenty a spisy k prevzeti*/
		DokumentyASpisyKPrevzeti?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The pocet barevne oznacenych celkem*/
		BarevneOznacene?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The pocet barevne oznacenych cervene*/
		BarevneOznaceneCervena?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The pocet barevne oznacenych zelene*/
		BarevneOznaceneZelena?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The pocet barevne oznacenych modre*/
		BarevneOznaceneModra?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The pocet barevne oznacenych fialove*/
		BarevneOznaceneFialova?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The pocet barevne oznacenych zlute*/
		BarevneOznaceneZluta?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		/**The pocet barevne oznacenych bile*/
		BarevneOznaceneBila?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		DokumentyASpisyVeVlastnictvi?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
		DokumentyASpisyKeZpracovani?: Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>|null;
	}
	const enum GDashboardCountsDtoNames { FRAGMENT_DOKUMENTY_KE_ZPRACOVANI = "FRAGMENT_DOKUMENTY_KE_ZPRACOVANI", FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE = "FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE", FRAGMENT_SPISY_KE_ZPRACOVANI = "FRAGMENT_SPISY_KE_ZPRACOVANI", FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE = "FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE", FRAGMENT_SPISY_K_UZAVRENI = "FRAGMENT_SPISY_K_UZAVRENI", FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE = "FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE", FRAGMENT_TERMINY = "FRAGMENT_TERMINY", FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI = "FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI", FRAGMENT_BAREVNE_OZNACENE = "FRAGMENT_BAREVNE_OZNACENE", FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI = "FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI", DokumentyKeZpracovani = "DokumentyKeZpracovani", DokumentyKeZpracovaniVeVlastnictvi = "DokumentyKeZpracovaniVeVlastnictvi", DokumentyKeZpracovaniVRedistribuci = "DokumentyKeZpracovaniVRedistribuci", SpisyKeZpracovani = "SpisyKeZpracovani", SpisyKeZpracovaniVeVlastnictvi = "SpisyKeZpracovaniVeVlastnictvi", SpisyKeZpracovaniVRedistribuci = "SpisyKeZpracovaniVRedistribuci", SpisyKUzavreni = "SpisyKUzavreni", SpisyKUzavreniSVyrizenouZadostiVRak = "SpisyKUzavreniSVyrizenouZadostiVRak", SpisyPredTerminem = "SpisyPredTerminem", SpisyPoTerminu = "SpisyPoTerminu", DokumentyPoTerminu = "DokumentyPoTerminu", DokumentyASpisyKPredani = "DokumentyASpisyKPredani", DokumentyASpisyKPrevzeti = "DokumentyASpisyKPrevzeti", BarevneOznacene = "BarevneOznacene", BarevneOznaceneCervena = "BarevneOznaceneCervena", BarevneOznaceneZelena = "BarevneOznaceneZelena", BarevneOznaceneModra = "BarevneOznaceneModra", BarevneOznaceneFialova = "BarevneOznaceneFialova", BarevneOznaceneZluta = "BarevneOznaceneZluta", BarevneOznaceneBila = "BarevneOznaceneBila", DokumentyASpisyVeVlastnictvi = "DokumentyASpisyVeVlastnictvi", DokumentyASpisyKeZpracovani = "DokumentyASpisyKeZpracovani",}
	const enum GDashboardCountsDtoFragments { FRAGMENT_DOKUMENTY_KE_ZPRACOVANI = "*", FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE = "*", FRAGMENT_SPISY_KE_ZPRACOVANI = "*", FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE = "*", FRAGMENT_SPISY_K_UZAVRENI = "*", FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE = "*", FRAGMENT_TERMINY = "*", FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI = "*", FRAGMENT_BAREVNE_OZNACENE = "*", FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI = "*", DokumentyKeZpracovani = "DOKUMENTY_KE_ZPRACOVANI", DokumentyKeZpracovaniVeVlastnictvi = "DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE", DokumentyKeZpracovaniVRedistribuci = "DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE", SpisyKeZpracovani = "SPISY_KE_ZPRACOVANI", SpisyKeZpracovaniVeVlastnictvi = "SPISY_KE_ZPRACOVANI_ROZSIRENE", SpisyKeZpracovaniVRedistribuci = "SPISY_KE_ZPRACOVANI_ROZSIRENE", SpisyKUzavreni = "SPISY_K_UZAVRENI", SpisyKUzavreniSVyrizenouZadostiVRak = "SPISY_K_UZAVRENI_ROZSIRENE", SpisyPredTerminem = "TERMINY", SpisyPoTerminu = "TERMINY", DokumentyPoTerminu = "TERMINY", DokumentyASpisyKPredani = "DOKUMENTY_A_SPISY_PREVZETI_PREDANI", DokumentyASpisyKPrevzeti = "DOKUMENTY_A_SPISY_PREVZETI_PREDANI", BarevneOznacene = "BAREVNE_OZNACENE", BarevneOznaceneCervena = "BAREVNE_OZNACENE", BarevneOznaceneZelena = "BAREVNE_OZNACENE", BarevneOznaceneModra = "BAREVNE_OZNACENE", BarevneOznaceneFialova = "BAREVNE_OZNACENE", BarevneOznaceneZluta = "BAREVNE_OZNACENE", BarevneOznaceneBila = "BAREVNE_OZNACENE", DokumentyASpisyVeVlastnictvi = "DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI", DokumentyASpisyKeZpracovani = "DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI",}
	const enum GDashboardCountsDtoTypes { FRAGMENT_DOKUMENTY_KE_ZPRACOVANI = "string", FRAGMENT_DOKUMENTY_KE_ZPRACOVANI_ROZSIRENE = "string", FRAGMENT_SPISY_KE_ZPRACOVANI = "string", FRAGMENT_SPISY_KE_ZPRACOVANI_ROZSIRENE = "string", FRAGMENT_SPISY_K_UZAVRENI = "string", FRAGMENT_SPISY_K_UZAVRENI_ROZSIRENE = "string", FRAGMENT_TERMINY = "string", FRAGMENT_DOKUMENTY_A_SPISY_PREVZETI_PREDANI = "string", FRAGMENT_BAREVNE_OZNACENE = "string", FRAGMENT_DOKUMENTY_A_SPISY_VE_VLASTNICTVI_KE_ZPRACOVANI = "string", DokumentyKeZpracovani = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>", DokumentyKeZpracovaniVeVlastnictvi = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>", DokumentyKeZpracovaniVRedistribuci = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>", SpisyKeZpracovani = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>", SpisyKeZpracovaniVeVlastnictvi = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>", SpisyKeZpracovaniVRedistribuci = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>", SpisyKUzavreni = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>", SpisyKUzavreniSVyrizenouZadostiVRak = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>", SpisyPredTerminem = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>", SpisyPoTerminu = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSpisFilterDto>", DokumentyPoTerminu = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GDokumentFilterDto>", DokumentyASpisyKPredani = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", DokumentyASpisyKPrevzeti = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", BarevneOznacene = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", BarevneOznaceneCervena = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", BarevneOznaceneZelena = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", BarevneOznaceneModra = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", BarevneOznaceneFialova = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", BarevneOznaceneZluta = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", BarevneOznaceneBila = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", DokumentyASpisyVeVlastnictvi = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>", DokumentyASpisyKeZpracovani = "Gordic.Ssl.Interface.GDashboardCountItemDto<Gordic.Ssl.Interface.GSslspidFilterDto>",}
	const enum GDashboardCountsDtoTypeLengths {}
	interface GDashboardCountItemDto<TFilterDto> {
		/**The count*/
		Count?: number|null;
		/**The filter*/
		Filter?: TFilterDto|null;
	}
	const enum GDashboardCountItemDtoNames { Count = "Count", Filter = "Filter",}
	const enum GDashboardCountItemDtoFragments { Count = "*", Filter = "*",}
	const enum GDashboardCountItemDtoTypes { Count = "number", Filter = "TFilterDto",}
	const enum GDashboardCountItemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\SeznamObsahDiluDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dto pro obsah dílu*/
	interface SeznamObsahDiluDto {
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		ixp_dil?: string|null;
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_do?: JsonDate|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		por_cislo_uziv?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		dat_zmena_wflspid?: JsonDate|null;
		/**Autogenerated.*/
		ixp_top?: string|null;
		/**Autogenerated.*/
		ixp_soucast?: string|null;
		/**Autogenerated.*/
		ixs_vsk?: string|null;
		/**Autogenerated.*/
		typ_spis?: number|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		vlastnik?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**vsk_nazev*/
		vsk_nazev?: string|null;
		/**vsk_spis_znak*/
		vsk_spis_znak?: string|null;
		/**vsk_skar_znak*/
		vsk_skar_znak?: string|null;
		/**vsk_skar_lhuta*/
		vsk_skar_lhuta?: number|null;
		/**Autogenerated.*/
		s_fyz?: number|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		s_sgn?: number|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		s_ssl?: number|null;
		/**Autogenerated.*/
		el_bitmap?: number|null;
		/**Autogenerated.*/
		doctype_bitmap?: number|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		typ_entity_ico?: number|null;
		/**Autogenerated.*/
		technicke_vlastnosti_ico?: number|null;
		/**Autogenerated.*/
		stav_zpracovani_ico?: number|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_fun_akt*/
		zmenu_prov_txt?: string|null;
		/**typFormyDokumentu*/
		typFormyDokumentu?: Gordic.Wfl.Interface.TypFormyDokumentu|null;
	}
	const enum SeznamObsahDiluDtoNames { ixp = "ixp", ixp_dil = "ixp_dil", ixp_spis = "ixp_spis", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", aktivita = "aktivita", por_cislo = "por_cislo", por_cislo_uziv = "por_cislo_uziv", dat_zmena = "dat_zmena", dat_zmena_wflspid = "dat_zmena_wflspid", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixs_vsk = "ixs_vsk", typ_spis = "typ_spis", stav_pis = "stav_pis", vlastnik = "vlastnik", nazev = "nazev", akt_znacka = "akt_znacka", vsk_nazev = "vsk_nazev", vsk_spis_znak = "vsk_spis_znak", vsk_skar_znak = "vsk_skar_znak", vsk_skar_lhuta = "vsk_skar_lhuta", s_fyz = "s_fyz", s_ele = "s_ele", s_sgn = "s_sgn", priz_spis = "priz_spis", typ_ag = "typ_ag", s_ssl = "s_ssl", el_bitmap = "el_bitmap", doctype_bitmap = "doctype_bitmap", m_vyber = "m_vyber", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", ixs_fun_akt = "ixs_fun_akt", zmenu_prov_txt = "zmenu_prov_txt", typFormyDokumentu = "typFormyDokumentu",}
	const enum SeznamObsahDiluDtoFragments { ixp = "*", ixp_dil = "*", ixp_spis = "*", poznamka = "*", dat_od = "*", dat_do = "*", aktivita = "*", por_cislo = "*", por_cislo_uziv = "*", dat_zmena = "*", dat_zmena_wflspid = "*", ixp_top = "*", ixp_soucast = "*", ixs_vsk = "*", typ_spis = "*", stav_pis = "*", vlastnik = "*", nazev = "*", akt_znacka = "*", vsk_nazev = "*", vsk_spis_znak = "*", vsk_skar_znak = "*", vsk_skar_lhuta = "*", s_fyz = "*", s_ele = "*", s_sgn = "*", priz_spis = "*", typ_ag = "*", s_ssl = "*", el_bitmap = "*", doctype_bitmap = "*", m_vyber = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", stav_zpracovani_ico = "*", ixs_fun_akt = "*", zmenu_prov_txt = "*", typFormyDokumentu = "*",}
	const enum SeznamObsahDiluDtoTypes { ixp = "string", ixp_dil = "string", ixp_spis = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", aktivita = "number", por_cislo = "number", por_cislo_uziv = "number", dat_zmena = "JsonDate", dat_zmena_wflspid = "JsonDate", ixp_top = "string", ixp_soucast = "string", ixs_vsk = "string", typ_spis = "number", stav_pis = "number", vlastnik = "string", nazev = "string", akt_znacka = "string", vsk_nazev = "string", vsk_spis_znak = "string", vsk_skar_znak = "string", vsk_skar_lhuta = "number", s_fyz = "number", s_ele = "number", s_sgn = "number", priz_spis = "number", typ_ag = "number", s_ssl = "number", el_bitmap = "number", doctype_bitmap = "number", m_vyber = "number", typ_entity_ico = "number", technicke_vlastnosti_ico = "number", stav_zpracovani_ico = "number", ixs_fun_akt = "string", zmenu_prov_txt = "string", typFormyDokumentu = "Gordic.Wfl.Interface.TypFormyDokumentu",}
	const enum SeznamObsahDiluDtoTypeLengths { ixp = 12, ixp_dil = 12, ixp_spis = 12, poznamka = 100, ixp_top = 12, ixp_soucast = 12, ixs_vsk = 12, nazev = 100, akt_znacka = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\SeznamObsahTypovehoSpisuDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dto pro obsah typového spisu*/
	interface SeznamObsahTypovehoSpisuDto {
		/**Autogenerated.*/
		ixp_top?: string|null;
		/**Autogenerated.*/
		ixp_parent?: string|null;
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		ixp_soucast?: string|null;
		/**Autogenerated.*/
		ixp_spis?: string|null;
		/**Autogenerated.*/
		ixs_vsk?: string|null;
		/**Autogenerated.*/
		typ_spis?: number|null;
		/**Autogenerated.*/
		stav_pis?: number|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		vlastnik?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**vsk_nazev*/
		vsk_nazev?: string|null;
		/**vsk_spis_znak*/
		vsk_spis_znak?: string|null;
		/**vsk_skar_znak*/
		vsk_skar_znak?: string|null;
		/**vsk_skar_lhuta*/
		vsk_skar_lhuta?: number|null;
		/**Autogenerated.*/
		s_fyz?: number|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		s_sgn?: number|null;
		/**Autogenerated.*/
		priz_spis?: number|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		s_ssl?: number|null;
		/**Autogenerated.*/
		el_bitmap?: number|null;
		/**Autogenerated.*/
		doctype_bitmap?: number|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		typ_entity_ico?: number|null;
		/**Autogenerated.*/
		technicke_vlastnosti_ico?: number|null;
		/**Autogenerated.*/
		stav_zpracovani_ico?: number|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_fun_akt*/
		zmenu_prov_txt?: string|null;
		/**typFormyDokumentu*/
		typFormyDokumentu?: Gordic.Wfl.Interface.TypFormyDokumentu|null;
	}
	const enum SeznamObsahTypovehoSpisuDtoNames { ixp_top = "ixp_top", ixp_parent = "ixp_parent", ixp = "ixp", ixp_soucast = "ixp_soucast", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", typ_spis = "typ_spis", stav_pis = "stav_pis", aktivita = "aktivita", dat_zmena = "dat_zmena", vlastnik = "vlastnik", nazev = "nazev", akt_znacka = "akt_znacka", vsk_nazev = "vsk_nazev", vsk_spis_znak = "vsk_spis_znak", vsk_skar_znak = "vsk_skar_znak", vsk_skar_lhuta = "vsk_skar_lhuta", s_fyz = "s_fyz", s_ele = "s_ele", s_sgn = "s_sgn", priz_spis = "priz_spis", typ_ag = "typ_ag", s_ssl = "s_ssl", el_bitmap = "el_bitmap", doctype_bitmap = "doctype_bitmap", m_vyber = "m_vyber", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", stav_zpracovani_ico = "stav_zpracovani_ico", ixs_fun_akt = "ixs_fun_akt", zmenu_prov_txt = "zmenu_prov_txt", typFormyDokumentu = "typFormyDokumentu",}
	const enum SeznamObsahTypovehoSpisuDtoFragments { ixp_top = "*", ixp_parent = "*", ixp = "*", ixp_soucast = "*", ixp_spis = "*", ixs_vsk = "*", typ_spis = "*", stav_pis = "*", aktivita = "*", dat_zmena = "*", vlastnik = "*", nazev = "*", akt_znacka = "*", vsk_nazev = "*", vsk_spis_znak = "*", vsk_skar_znak = "*", vsk_skar_lhuta = "*", s_fyz = "*", s_ele = "*", s_sgn = "*", priz_spis = "*", typ_ag = "*", s_ssl = "*", el_bitmap = "*", doctype_bitmap = "*", m_vyber = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", stav_zpracovani_ico = "*", ixs_fun_akt = "*", zmenu_prov_txt = "*", typFormyDokumentu = "*",}
	const enum SeznamObsahTypovehoSpisuDtoTypes { ixp_top = "string", ixp_parent = "string", ixp = "string", ixp_soucast = "string", ixp_spis = "string", ixs_vsk = "string", typ_spis = "number", stav_pis = "number", aktivita = "number", dat_zmena = "JsonDate", vlastnik = "string", nazev = "string", akt_znacka = "string", vsk_nazev = "string", vsk_spis_znak = "string", vsk_skar_znak = "string", vsk_skar_lhuta = "number", s_fyz = "number", s_ele = "number", s_sgn = "number", priz_spis = "number", typ_ag = "number", s_ssl = "number", el_bitmap = "number", doctype_bitmap = "number", m_vyber = "number", typ_entity_ico = "number", technicke_vlastnosti_ico = "number", stav_zpracovani_ico = "number", ixs_fun_akt = "string", zmenu_prov_txt = "string", typFormyDokumentu = "Gordic.Wfl.Interface.TypFormyDokumentu",}
	const enum SeznamObsahTypovehoSpisuDtoTypeLengths { ixp_top = 12, ixp_parent = 12, ixp = 12, ixp_soucast = 12, ixp_spis = 12, ixs_vsk = 12, nazev = 100, akt_znacka = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\DTO\Ruzne\GExportElDokumentuDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Dto pro dialog exportu dokumentu*/
	interface GExportElDokumentuDto {
		/**Ixp*/
		Ixp?: string|null;
		/**Znacka*/
		Znacka?: boolean|null;
		/**JedenAdresar*/
		JedenAdresar?: boolean|null;
		/**JedenAdresar*/
		ExportovatDorucenkyDZ?: boolean|null;
		/**xxxx*/
		Zkratit?: boolean|null;
		/**PruvElPod*/
		PruvElPod?: boolean|null;
		/**xxxx*/
		Vse?: boolean|null;
		/**xxxx*/
		VseEnabled?: boolean|null;
		/**LabelInfo*/
		LabelInfo?: string|null;
		/**LabelInfo*/
		PouzeRozluka?: boolean|null;
		/**GridData*/
		GridData?: Gordic.Wfl.Interface.SsltixpDto[]|null;
		/**Počet*/
		Pocet?: string|null;
		/**Počet*/
		ErrorMessage?: string|null;
		/**Počet*/
		AdresarZakladni?: string|null;
		/**Počet*/
		SeznamExportovanych?: string[]|null;
		/**Počet*/
		VyslednaHlaska?: string[]|null;
		/**Počet*/
		Opravneni?: string[]|null;
		/**LabelInfo*/
		FileInfoDto?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**ExportovatObsahSpisu*/
		ExportovatObsahSpisu?: boolean|null;
		/**DataProSestavuExportObsahu*/
		ListDataProSestavuExportObsahu?: Gordic.Ssl.Interface.GExportElDokumentuGenerovaniObsahuSpisuDto[]|null;
		/**ListGenerovaniSestavyPruvodkyDto*/
		ListGenerovaniSestavyPruvodkyDto?: Gordic.Ssl.Interface.GExportElDokumentuGenerovaniSestavyPruvodkyDto[]|null;
		/**ListGenerovaniSestavyPruvodkyDto*/
		ListGenerovaniSestavyOdeslaniDto?: Gordic.Ssl.Interface.GExportElDokumentuGenerovaniSestavyOdeslaniDto[]|null;
		/**Důvod*/
		Duvod?: string|null;
		/**X0009*/
		X0009?: string|null;
	}
	const enum GExportElDokumentuDtoNames { Ixp = "Ixp", Znacka = "Znacka", JedenAdresar = "JedenAdresar", ExportovatDorucenkyDZ = "ExportovatDorucenkyDZ", Zkratit = "Zkratit", PruvElPod = "PruvElPod", Vse = "Vse", VseEnabled = "VseEnabled", LabelInfo = "LabelInfo", PouzeRozluka = "PouzeRozluka", GridData = "GridData", Pocet = "Pocet", ErrorMessage = "ErrorMessage", AdresarZakladni = "AdresarZakladni", SeznamExportovanych = "SeznamExportovanych", VyslednaHlaska = "VyslednaHlaska", Opravneni = "Opravneni", FileInfoDto = "FileInfoDto", ExportovatObsahSpisu = "ExportovatObsahSpisu", ListDataProSestavuExportObsahu = "ListDataProSestavuExportObsahu", ListGenerovaniSestavyPruvodkyDto = "ListGenerovaniSestavyPruvodkyDto", ListGenerovaniSestavyOdeslaniDto = "ListGenerovaniSestavyOdeslaniDto", Duvod = "Duvod", X0009 = "X0009",}
	const enum GExportElDokumentuDtoFragments { Ixp = "*", Znacka = "*", JedenAdresar = "*", ExportovatDorucenkyDZ = "*", Zkratit = "*", PruvElPod = "*", Vse = "*", VseEnabled = "*", LabelInfo = "*", PouzeRozluka = "*", GridData = "*", Pocet = "*", ErrorMessage = "*", AdresarZakladni = "*", SeznamExportovanych = "*", VyslednaHlaska = "*", Opravneni = "*", FileInfoDto = "*", ExportovatObsahSpisu = "*", ListDataProSestavuExportObsahu = "*", ListGenerovaniSestavyPruvodkyDto = "*", ListGenerovaniSestavyOdeslaniDto = "*", Duvod = "*", X0009 = "*",}
	const enum GExportElDokumentuDtoTypes { Ixp = "string", Znacka = "boolean", JedenAdresar = "boolean", ExportovatDorucenkyDZ = "boolean", Zkratit = "boolean", PruvElPod = "boolean", Vse = "boolean", VseEnabled = "boolean", LabelInfo = "string", PouzeRozluka = "boolean", GridData = "Gordic.Wfl.Interface.SsltixpDto[]", Pocet = "string", ErrorMessage = "string", AdresarZakladni = "string", SeznamExportovanych = "string[]", VyslednaHlaska = "string[]", Opravneni = "string[]", FileInfoDto = "Gordic.General.ApplicationInterface.GFileInfoDto", ExportovatObsahSpisu = "boolean", ListDataProSestavuExportObsahu = "Gordic.Ssl.Interface.GExportElDokumentuGenerovaniObsahuSpisuDto[]", ListGenerovaniSestavyPruvodkyDto = "Gordic.Ssl.Interface.GExportElDokumentuGenerovaniSestavyPruvodkyDto[]", ListGenerovaniSestavyOdeslaniDto = "Gordic.Ssl.Interface.GExportElDokumentuGenerovaniSestavyOdeslaniDto[]", Duvod = "string", X0009 = "string",}
	const enum GExportElDokumentuDtoTypeLengths {}
	/**Dto pro dialog exportu dokumentu*/
	interface GExportElDokumentuGenerovaniObsahuSpisuDto {
		/**IxpSpis*/
		IxpSpis?: string|null;
		/**Cesta*/
		Cesta?: string|null;
		/**Filename*/
		FileName?: string|null;
		/**IdReportu*/
		IdReportu?: string|null;
		/**X0000*/
		X0000?: string|null;
		/**X0001*/
		X0001?: string|null;
		/**X0002*/
		X0002?: string|null;
		/**X0003*/
		X0003?: string|null;
		/**X0002*/
		X0009?: string|null;
	}
	const enum GExportElDokumentuGenerovaniObsahuSpisuDtoNames { IxpSpis = "IxpSpis", Cesta = "Cesta", FileName = "FileName", IdReportu = "IdReportu", X0000 = "X0000", X0001 = "X0001", X0002 = "X0002", X0003 = "X0003", X0009 = "X0009",}
	const enum GExportElDokumentuGenerovaniObsahuSpisuDtoFragments { IxpSpis = "*", Cesta = "*", FileName = "*", IdReportu = "*", X0000 = "*", X0001 = "*", X0002 = "*", X0003 = "*", X0009 = "*",}
	const enum GExportElDokumentuGenerovaniObsahuSpisuDtoTypes { IxpSpis = "string", Cesta = "string", FileName = "string", IdReportu = "string", X0000 = "string", X0001 = "string", X0002 = "string", X0003 = "string", X0009 = "string",}
	const enum GExportElDokumentuGenerovaniObsahuSpisuDtoTypeLengths {}
	/**Dto pro dialog exportu dokumentu*/
	interface GExportElDokumentuGenerovaniSestavyPruvodkyDto {
		/**IxpSpis*/
		IxpSpis?: string|null;
		/**Cesta*/
		Cesta?: string|null;
		/**Filename*/
		FileName?: string|null;
		/**IdReportu*/
		IdReportu?: string|null;
		/**X0000*/
		X0000?: string|null;
		/**X0001*/
		X0001?: string|null;
		/**X0002*/
		X0002?: string|null;
		/**X0002*/
		X0009?: string|null;
	}
	const enum GExportElDokumentuGenerovaniSestavyPruvodkyDtoNames { IxpSpis = "IxpSpis", Cesta = "Cesta", FileName = "FileName", IdReportu = "IdReportu", X0000 = "X0000", X0001 = "X0001", X0002 = "X0002", X0009 = "X0009",}
	const enum GExportElDokumentuGenerovaniSestavyPruvodkyDtoFragments { IxpSpis = "*", Cesta = "*", FileName = "*", IdReportu = "*", X0000 = "*", X0001 = "*", X0002 = "*", X0009 = "*",}
	const enum GExportElDokumentuGenerovaniSestavyPruvodkyDtoTypes { IxpSpis = "string", Cesta = "string", FileName = "string", IdReportu = "string", X0000 = "string", X0001 = "string", X0002 = "string", X0009 = "string",}
	const enum GExportElDokumentuGenerovaniSestavyPruvodkyDtoTypeLengths {}
	/**Dto pro dialog exportu dokumentu*/
	interface GExportElDokumentuGenerovaniSestavyOdeslaniDto {
		/**IxpSpis*/
		IxpSpis?: string|null;
		/**Cesta*/
		Cesta?: string|null;
		/**Filename*/
		FileName?: string|null;
		/**IdReportu*/
		IdReportu?: string|null;
		/**X0000*/
		X0000?: string|null;
		/**X0001*/
		X0001?: string|null;
		/**X0002*/
		X0002?: string|null;
		/**X0002*/
		X0009?: string|null;
	}
	const enum GExportElDokumentuGenerovaniSestavyOdeslaniDtoNames { IxpSpis = "IxpSpis", Cesta = "Cesta", FileName = "FileName", IdReportu = "IdReportu", X0000 = "X0000", X0001 = "X0001", X0002 = "X0002", X0009 = "X0009",}
	const enum GExportElDokumentuGenerovaniSestavyOdeslaniDtoFragments { IxpSpis = "*", Cesta = "*", FileName = "*", IdReportu = "*", X0000 = "*", X0001 = "*", X0002 = "*", X0009 = "*",}
	const enum GExportElDokumentuGenerovaniSestavyOdeslaniDtoTypes { IxpSpis = "string", Cesta = "string", FileName = "string", IdReportu = "string", X0000 = "string", X0001 = "string", X0002 = "string", X0009 = "string",}
	const enum GExportElDokumentuGenerovaniSestavyOdeslaniDtoTypeLengths {}
	/**Dto pro dialog exportu dokumentu*/
	interface GExportElDokumentuGenerovaniObsahuSpisuGeneratorCustomDto {
		/**Cesta*/
		Cesta?: string|null;
		/**FileName*/
		FileName?: string|null;
	}
	const enum GExportElDokumentuGenerovaniObsahuSpisuGeneratorCustomDtoNames { Cesta = "Cesta", FileName = "FileName",}
	const enum GExportElDokumentuGenerovaniObsahuSpisuGeneratorCustomDtoFragments { Cesta = "*", FileName = "*",}
	const enum GExportElDokumentuGenerovaniObsahuSpisuGeneratorCustomDtoTypes { Cesta = "string", FileName = "string",}
	const enum GExportElDokumentuGenerovaniObsahuSpisuGeneratorCustomDtoTypeLengths {}
	/**VysledekExportuDokumentu*/
	const enum VysledekExportuDokumentu {
		/**identifikátor písemnosti*/
		ok,
		/**licence*/
		nemaElObrazNeboPrilohu,
		/**spisový plán*/
		neniOpravneniKeKarte,
		/**spisový plán*/
		neniOpravneniKElObrazuNeboPriloze,
		/**spisový plán*/
		nenastaveno,
	}
	/**Dto pro dialog exportu dokumentu*/
	interface GExportElDokumentuVyberDokumentuDto {
		/**Cesta*/
		ListDokumentu?: any|null;
		/**ZnackaText*/
		ZnackaText?: string|null;
		/**ssl_nev_posepk*/
		ssl_nev_posepk?: number|null;
		/**IxsFunAkt*/
		IxsFunAkt?: string|null;
	}
	const enum GExportElDokumentuVyberDokumentuDtoNames { ListDokumentu = "ListDokumentu", ZnackaText = "ZnackaText", ssl_nev_posepk = "ssl_nev_posepk", IxsFunAkt = "IxsFunAkt",}
	const enum GExportElDokumentuVyberDokumentuDtoFragments { ListDokumentu = "*", ZnackaText = "*", ssl_nev_posepk = "*", IxsFunAkt = "*",}
	const enum GExportElDokumentuVyberDokumentuDtoTypes { ListDokumentu = "any", ZnackaText = "string", ssl_nev_posepk = "number", IxsFunAkt = "string",}
	const enum GExportElDokumentuVyberDokumentuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGEklepSsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Obsluha EKLEP
	* @domain DRMS
	*/
	interface Eklep {
		/**Připojí se na EKLEP a stáhne nové materialy*/
		nactiNoveMaterialy(rq?:Gordic.Ssl.Interface.GNactiNoveMaterialyRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GNactiNoveMaterialyRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GNactiNoveMaterialyRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GNactiNoveMaterialyResponseDto>>;
		/**Odešle připomínku na EKLEP.*/
		odesliOdpovedPripominky(rq?:Gordic.Ssl.Interface.GOdesliOdpovedPripominkyRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GOdesliOdpovedPripominkyRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GOdesliOdpovedPripominkyRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GOdesliOdpovedPripominkyResponseDto>>;
		/**Stahne informace ktere materialy jsou stornované a případně je vystornuje*/
		zkontrolujStonovaneMaterialy(rq?:Gordic.Ssl.Interface.GZkontrolujStonovaneMaterialyRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GZkontrolujStonovaneMaterialyRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GZkontrolujStonovaneMaterialyRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GZkontrolujStonovaneMaterialyResponseDto>>;
		/**Stahne informace ktere materialy obsahují změnu a případně tyto změny aplikuje*/
		zkontrolujZmenyUMaterialu(rq?:Gordic.Ssl.Interface.GZkontrolujZmenyUMaterialuRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GZkontrolujZmenyUMaterialuRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GZkontrolujZmenyUMaterialuRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GZkontrolujZmenyUMaterialuResponseDto>>;
		/**GetSubjectEntries*/
		getSubjectEntries(rq?:Gordic.Ssl.Interface.GEklepGetSubjectEntriesRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GEklepGetSubjectEntriesRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GEklepGetSubjectEntriesRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GGEklepGetSubjectEntriesResponseDto>>;
		/**Nove připomínkové řízení*/
		novePripominkoveRizeni(rq?:Gordic.Ssl.Interface.GNovePripominkoveRizeniRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GNovePripominkoveRizeniRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GNovePripominkoveRizeniRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GNovePripominkoveRizeniResponseDto>>;
		/**UlozeniSouboruDoPredplneniOdeslani*/
		ulozeniSouboruDoPredplneniOdeslani(rq?:Gordic.Ssl.Interface.GEklepUlozeniSouboruProPredplneniOdeslaniDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GEklepUlozeniSouboruProPredplneniOdeslaniDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GEklepUlozeniSouboruProPredplneniOdeslaniDto>,GServiceActionResponse<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>;
		/**EvidovatDokumentEklep*/
		evidovatDokumentEklep(rq?:Gordic.Ssl.Interface.GEvidovatDokumentEklepRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GEvidovatDokumentEklepRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GEvidovatDokumentEklepRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GEvidovatDokumentEklepResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Eklep: ServiceBase & Catalog.Eklep;
	}
	const Eklep: Client["Eklep"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGSsldeko.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface Ssldeko {
		/**Šablony mailu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSsldekoDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ssl.Interface.GSsldekoDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSsldekoDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSsldekoDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSsldekoDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ssl.Interface.GSsldekoDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldekoDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldekoDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSsldekoDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ssl.Interface.GSsldekoDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldekoDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldekoDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSsldekoDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ssl.Interface.GSsldekoDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldekoDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldekoDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSsldekoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ssldeko: ServiceBase & Catalog.Ssldeko;
	}
	const Ssldeko: Client["Ssldeko"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGSsldeks.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface Ssldeks {
		/**Šablony mailu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSsldeksDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ssl.Interface.GSsldeksDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSsldeksDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSsldeksDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSsldeksDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ssl.Interface.GSsldeksDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldeksDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldeksDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSsldeksDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ssl.Interface.GSsldeksDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldeksDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldeksDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSsldeksDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ssl.Interface.GSsldeksDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldeksDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSsldeksDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSsldeksDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ssldeks: ServiceBase & Catalog.Ssldeks;
	}
	const Ssldeks: Client["Ssldeks"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGSslseklPripominkoveRizeni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface Sslsekl {
		/**Šablony mailu*/
		list(rq?:Gordic.Ssl.Interface.GSslseklFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslseklDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ssl.Interface.GSslseklDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslseklDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslseklDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslseklDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ssl.Interface.GSslseklDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslseklDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslseklDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslseklDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ssl.Interface.GSslseklDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslseklDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslseklDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslseklDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ssl.Interface.GSslseklDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslseklDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslseklDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslseklDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Sslsekl: ServiceBase & Catalog.Sslsekl;
	}
	const Sslsekl: Client["Sslsekl"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGSslsoek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface Sslsoek {
		/**Šablony mailu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslsoekDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ssl.Interface.GSslsoekDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslsoekDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslsoekDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslsoekDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ssl.Interface.GSslsoekDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslsoekDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslsoekDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslsoekDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ssl.Interface.GSslsoekDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslsoekDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslsoekDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslsoekDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ssl.Interface.GSslsoekDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslsoekDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslsoekDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslsoekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Sslsoek: ServiceBase & Catalog.Sslsoek;
	}
	const Sslsoek: Client["Sslsoek"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGSslspek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface Sslspek {
		/**Šablony mailu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslspekDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ssl.Interface.GSslspekDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspekDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspekDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslspekDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ssl.Interface.GSslspekDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspekDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspekDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspekDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ssl.Interface.GSslspekDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspekDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspekDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspekDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ssl.Interface.GSslspekDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspekDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspekDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Sslspek: ServiceBase & Catalog.Sslspek;
	}
	const Sslspek: Client["Sslspek"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGSslspem.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface Sslspem {
		/**Šablony mailu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslspemDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ssl.Interface.GSslspemDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspemDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspemDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslspemDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ssl.Interface.GSslspemDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspemDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspemDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspemDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ssl.Interface.GSslspemDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspemDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspemDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspemDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ssl.Interface.GSslspemDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspemDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspemDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspemDto>>;
		listPrilohy(rq?:Gordic.Ssl.Interface.GSslspemListPrilohyRequestData|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspemListPrilohyRequestData>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspemListPrilohyRequestData>,GServiceListResponse<Gordic.Ssl.Interface.GSslspemDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Sslspem: ServiceBase & Catalog.Sslspem;
	}
	const Sslspem: Client["Sslspem"];
}
declare namespace Gordic.Ssl.Interface {
	interface GSslspemListPrilohyRequestData {
		Ixp?: string|null;
		PidEklep?: string|null;
	}
	const enum GSslspemListPrilohyRequestDataNames { Ixp = "Ixp", PidEklep = "PidEklep",}
	const enum GSslspemListPrilohyRequestDataFragments { Ixp = "*", PidEklep = "*",}
	const enum GSslspemListPrilohyRequestDataTypes { Ixp = "string", PidEklep = "string",}
	const enum GSslspemListPrilohyRequestDataTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\IGSslspepPredplneniEklepPrilohy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface Sslspep {
		/**Šablony mailu*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>;
		/**Vrátí mail*/
		read(rq?:Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>;
		/**Uloží odesílané tělo mailu*/
		create(rq?:Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>;
		/**upraví již uložené tělo mailu*/
		update(rq?:Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>;
		/**upsert*/
		upsert(rq?:Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>;
		listPrilohy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Sslspep: ServiceBase & Catalog.Sslspep;
	}
	const Sslspep: Client["Sslspep"];
}
declare namespace Gordic.Ssl.Interface {
	interface GSslspepListPrilohyRequestData {
		Ixp?: string|null;
		IxsEkp?: string|null;
	}
	const enum GSslspepListPrilohyRequestDataNames { Ixp = "Ixp", IxsEkp = "IxsEkp",}
	const enum GSslspepListPrilohyRequestDataFragments { Ixp = "*", IxsEkp = "*",}
	const enum GSslspepListPrilohyRequestDataTypes { Ixp = "string", IxsEkp = "string",}
	const enum GSslspepListPrilohyRequestDataTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GEklepRuznaDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Vstupní DTO pro načtené nových materialu.*/
	interface GNactiNoveMaterialyRequestDto {
		/**pokracovatPresZamek*/
		pokracovatPresZamek?: boolean|null;
		/**zpracovatPouzeTentoPocet*/
		zpracovatPouzeTentoPocet?: number|null;
	}
	const enum GNactiNoveMaterialyRequestDtoNames { pokracovatPresZamek = "pokracovatPresZamek", zpracovatPouzeTentoPocet = "zpracovatPouzeTentoPocet",}
	const enum GNactiNoveMaterialyRequestDtoFragments { pokracovatPresZamek = "*", zpracovatPouzeTentoPocet = "*",}
	const enum GNactiNoveMaterialyRequestDtoTypes { pokracovatPresZamek = "boolean", zpracovatPouzeTentoPocet = "number",}
	const enum GNactiNoveMaterialyRequestDtoTypeLengths {}
	/**Výstupní DTO pro načtené nových materialu.*/
	interface GNactiNoveMaterialyResponseDto {
		/**odemknoutZamek*/
		jeAktivniZamek?: boolean|null;
		/**Gets or sets the pocet nactenych materialu.*/
		pocetNactenychMaterialu?: number|null;
		/**Gets or sets the pocet chybne zpracovanych materialu.*/
		pocetChybneZpracovanychMaterialu?: number|null;
		/**Gets or sets the pocet zpracovanych materialu.*/
		pocetZpracovanychMaterialu?: number|null;
		/**Gets or sets the chybove zpravy.*/
		chyboveZpravy?: string|null;
	}
	const enum GNactiNoveMaterialyResponseDtoNames { jeAktivniZamek = "jeAktivniZamek", pocetNactenychMaterialu = "pocetNactenychMaterialu", pocetChybneZpracovanychMaterialu = "pocetChybneZpracovanychMaterialu", pocetZpracovanychMaterialu = "pocetZpracovanychMaterialu", chyboveZpravy = "chyboveZpravy",}
	const enum GNactiNoveMaterialyResponseDtoFragments { jeAktivniZamek = "*", pocetNactenychMaterialu = "*", pocetChybneZpracovanychMaterialu = "*", pocetZpracovanychMaterialu = "*", chyboveZpravy = "*",}
	const enum GNactiNoveMaterialyResponseDtoTypes { jeAktivniZamek = "boolean", pocetNactenychMaterialu = "number", pocetChybneZpracovanychMaterialu = "number", pocetZpracovanychMaterialu = "number", chyboveZpravy = "string",}
	const enum GNactiNoveMaterialyResponseDtoTypeLengths {}
	/**Výstupní DTO pro načtené nových materialu.*/
	interface GNactiNoveMaterialyStazeneSouboryDto {
		/**cesta*/
		filePath?: string|null;
		/**Gets or sets the ixp dokumentu s odpovedi.*/
		fileName?: string|null;
		/**Gets or sets the ixp dokumentu s odpovedi.*/
		ixbNew?: string|null;
		/**typ_pril*/
		typ_pril?: Gordic.Ginis.DbModel.GSslcekpEnum|null;
	}
	const enum GNactiNoveMaterialyStazeneSouboryDtoNames { filePath = "filePath", fileName = "fileName", ixbNew = "ixbNew", typ_pril = "typ_pril",}
	const enum GNactiNoveMaterialyStazeneSouboryDtoFragments { filePath = "*", fileName = "*", ixbNew = "*", typ_pril = "*",}
	const enum GNactiNoveMaterialyStazeneSouboryDtoTypes { filePath = "string", fileName = "string", ixbNew = "string", typ_pril = "Gordic.Ginis.DbModel.GSslcekpEnum",}
	const enum GNactiNoveMaterialyStazeneSouboryDtoTypeLengths {}
	/**Výstupní DTO pro načtené nových materialu.*/
	interface GNactiNoveMaterialyPripravnaDataProNacteniMaterialuDto {
		/**ixpDoc*/
		ixpDoc?: string|null;
		/**IxsEsu*/
		ixsEsu?: string|null;
		/**ixp_sber_propo*/
		ixp_sber_pripo?: string|null;
		/**tempAdresar*/
		tempAdresar?: string|null;
	}
	const enum GNactiNoveMaterialyPripravnaDataProNacteniMaterialuDtoNames { ixpDoc = "ixpDoc", ixsEsu = "ixsEsu", ixp_sber_pripo = "ixp_sber_pripo", tempAdresar = "tempAdresar",}
	const enum GNactiNoveMaterialyPripravnaDataProNacteniMaterialuDtoFragments { ixpDoc = "*", ixsEsu = "*", ixp_sber_pripo = "*", tempAdresar = "*",}
	const enum GNactiNoveMaterialyPripravnaDataProNacteniMaterialuDtoTypes { ixpDoc = "string", ixsEsu = "string", ixp_sber_pripo = "string", tempAdresar = "string",}
	const enum GNactiNoveMaterialyPripravnaDataProNacteniMaterialuDtoTypeLengths {}
	/**Vstupní DTO pro odeslání odpovědi připomínky.*/
	interface GOdesliOdpovedPripominkyRequestDto {
		/**Gets or sets the ixp dokumentu s odpovedi.*/
		ixpDokumentuSOdpovedi?: string|null;
		/**Gets or sets the ixp dokumentu s odpovedi.*/
		typPripominky?: Gordic.Ginis.DbModel.GSslcektEnum|null;
		/**Gets or sets the ixp dokumentu s odpovedi.*/
		prilohy?: Gordic.Ssl.Interface.GAttachment2EklepDto[]|null;
	}
	const enum GOdesliOdpovedPripominkyRequestDtoNames { ixpDokumentuSOdpovedi = "ixpDokumentuSOdpovedi", typPripominky = "typPripominky", prilohy = "prilohy",}
	const enum GOdesliOdpovedPripominkyRequestDtoFragments { ixpDokumentuSOdpovedi = "*", typPripominky = "*", prilohy = "*",}
	const enum GOdesliOdpovedPripominkyRequestDtoTypes { ixpDokumentuSOdpovedi = "string", typPripominky = "Gordic.Ginis.DbModel.GSslcektEnum", prilohy = "Gordic.Ssl.Interface.GAttachment2EklepDto[]",}
	const enum GOdesliOdpovedPripominkyRequestDtoTypeLengths {}
	/**Výstupní DTO pro odeslání odpovědi připomínky.*/
	interface GOdesliOdpovedPripominkyResponseDto {
	}
	const enum GOdesliOdpovedPripominkyResponseDtoNames {}
	const enum GOdesliOdpovedPripominkyResponseDtoFragments {}
	const enum GOdesliOdpovedPripominkyResponseDtoTypes {}
	const enum GOdesliOdpovedPripominkyResponseDtoTypeLengths {}
	/**Dto pro práci s přílohami v EKLEP*/
	interface GAttachment2EklepDto extends Gordic.Wfl.Interface.GAttachment2Dto {
		/**typ_pril*/
		typ_pril?: Gordic.Ginis.DbModel.GSslcekpEnum|null;
		/**typ_pril_txt*/
		typ_pril_txt?: string|null;
	}
	const enum GAttachment2EklepDtoNames { typ_pril = "typ_pril", typ_pril_txt = "typ_pril_txt", FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_SERVICE = "FRAGMENT_SERVICE", FRAGMENT_TEXT = "FRAGMENT_TEXT", FRAGMENT_TYP_PRILOHY = "FRAGMENT_TYP_PRILOHY", FRAGMENT_WFLSPID = "FRAGMENT_WFLSPID", FRAGMENT_PERMISSIONS = "FRAGMENT_PERMISSIONS", ixp = "ixp", por_cislo = "por_cislo", je_hlavni_priloha = "je_hlavni_priloha", ixb = "ixb", aktivita = "aktivita", s_ele = "s_ele", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", obsah_text = "obsah_text", pocet = "pocet", poznamka = "poznamka", por_cislo_uziv = "por_cislo_uziv", st_utaj_id = "st_utaj_id", ixs_car = "ixs_car", PrilohaElektronicka = "PrilohaElektronicka", KategorieTypuPrilohy = "KategorieTypuPrilohy", TypPrilohyEnum = "TypPrilohyEnum", TypPrilohy = "TypPrilohy", FormaPrilohy = "FormaPrilohy", st_utaj_id_txt = "st_utaj_id_txt", st_utaj_id_duvod = "st_utaj_id_duvod", ktg_typ_pri = "ktg_typ_pri", Wflspid = "Wflspid", Permissions = "Permissions",}
	const enum GAttachment2EklepDtoFragments { typ_pril = "*", typ_pril_txt = "*", FRAGMENT_BASE = "*", FRAGMENT_SERVICE = "*", FRAGMENT_TEXT = "*", FRAGMENT_TYP_PRILOHY = "*", FRAGMENT_WFLSPID = "*", FRAGMENT_PERMISSIONS = "*", ixp = "*", por_cislo = "*", je_hlavni_priloha = "BASE", ixb = "BASE", aktivita = "BASE", s_ele = "BASE", dat_zmena = "SERVICE", zmenu_prov = "SERVICE", obsah_text = "TEXT", pocet = "BASE", poznamka = "TEXT", por_cislo_uziv = "BASE", st_utaj_id = "BASE", ixs_car = "BASE", PrilohaElektronicka = "*", KategorieTypuPrilohy = "*", TypPrilohyEnum = "TYP_PRILOHY", TypPrilohy = "*", FormaPrilohy = "*", st_utaj_id_txt = "TEXT", st_utaj_id_duvod = "TEXT", ktg_typ_pri = "*", Wflspid = "WFLSPID", Permissions = "PERMISSIONS",}
	const enum GAttachment2EklepDtoTypes { typ_pril = "Gordic.Ginis.DbModel.GSslcekpEnum", typ_pril_txt = "string", FRAGMENT_BASE = "string", FRAGMENT_SERVICE = "string", FRAGMENT_TEXT = "string", FRAGMENT_TYP_PRILOHY = "string", FRAGMENT_WFLSPID = "string", FRAGMENT_PERMISSIONS = "string", ixp = "string", por_cislo = "number", je_hlavni_priloha = "boolean", ixb = "string", aktivita = "Gordic.Ginis.DbModel.GGincaktEnum", s_ele = "number", dat_zmena = "JsonDate", zmenu_prov = "string", obsah_text = "string", pocet = "number", poznamka = "string", por_cislo_uziv = "number", st_utaj_id = "number", ixs_car = "string", PrilohaElektronicka = "Gordic.Wfl.Interface.GPrilohaElektronickaDto", KategorieTypuPrilohy = "Gordic.ControlsLogic.Interface.GWflcktpDto", TypPrilohyEnum = "Gordic.Wfl.Interface.GTypPrilohyEnum", TypPrilohy = "Gordic.ControlsLogic.Interface.GWflcprtDto", FormaPrilohy = "Gordic.ControlsLogic.Interface.GWflcforDto", st_utaj_id_txt = "string", st_utaj_id_duvod = "string", ktg_typ_pri = "number", Wflspid = "Gordic.Wfl.Interface.GWflspidDto", Permissions = "Gordic.Wfl.Interface.GAttachmentPermissionsDto",}
	const enum GAttachment2EklepDtoTypeLengths { obsah_text = 254, poznamka = 254, st_utaj_id_txt = 50, st_utaj_id_duvod = 254,}
	/**Vstupní DTO pro zkontrolování stornovaných*/
	interface GZkontrolujStonovaneMaterialyRequestDto {
		/**pokracovatPresZamek*/
		pokracovatPresZamek?: boolean|null;
	}
	const enum GZkontrolujStonovaneMaterialyRequestDtoNames { pokracovatPresZamek = "pokracovatPresZamek",}
	const enum GZkontrolujStonovaneMaterialyRequestDtoFragments { pokracovatPresZamek = "*",}
	const enum GZkontrolujStonovaneMaterialyRequestDtoTypes { pokracovatPresZamek = "boolean",}
	const enum GZkontrolujStonovaneMaterialyRequestDtoTypeLengths {}
	/**Výstupní DTO pro zkontrolování stornovaných*/
	interface GZkontrolujStonovaneMaterialyResponseDto {
		/**odemknoutZamek*/
		jeAktivniZamek?: boolean|null;
		/**pocetNactenychMaterialuKeStornu*/
		pocetNactenychMaterialuKeStornu?: number|null;
		/**Gets or sets the pocet chybne zpracovanych materialu.*/
		pocetUlozenychVGinis?: number|null;
		/**Gets or sets the pocet zpracovanych materialu.*/
		pocetNoveStornovanych?: number|null;
		/**Gets or sets the chybove zpravy.*/
		chyboveZpravy?: string|null;
		/**Gets or sets the pocet chybne zpracovanych materialu.*/
		pocetChybneZpracovanychMaterialu?: number|null;
	}
	const enum GZkontrolujStonovaneMaterialyResponseDtoNames { jeAktivniZamek = "jeAktivniZamek", pocetNactenychMaterialuKeStornu = "pocetNactenychMaterialuKeStornu", pocetUlozenychVGinis = "pocetUlozenychVGinis", pocetNoveStornovanych = "pocetNoveStornovanych", chyboveZpravy = "chyboveZpravy", pocetChybneZpracovanychMaterialu = "pocetChybneZpracovanychMaterialu",}
	const enum GZkontrolujStonovaneMaterialyResponseDtoFragments { jeAktivniZamek = "*", pocetNactenychMaterialuKeStornu = "*", pocetUlozenychVGinis = "*", pocetNoveStornovanych = "*", chyboveZpravy = "*", pocetChybneZpracovanychMaterialu = "*",}
	const enum GZkontrolujStonovaneMaterialyResponseDtoTypes { jeAktivniZamek = "boolean", pocetNactenychMaterialuKeStornu = "number", pocetUlozenychVGinis = "number", pocetNoveStornovanych = "number", chyboveZpravy = "string", pocetChybneZpracovanychMaterialu = "number",}
	const enum GZkontrolujStonovaneMaterialyResponseDtoTypeLengths {}
	/**Vstupní DTO pro zkontrolování změn*/
	interface GZkontrolujZmenyUMaterialuRequestDto {
		/**pokracovatPresZamek*/
		pokracovatPresZamek?: boolean|null;
	}
	const enum GZkontrolujZmenyUMaterialuRequestDtoNames { pokracovatPresZamek = "pokracovatPresZamek",}
	const enum GZkontrolujZmenyUMaterialuRequestDtoFragments { pokracovatPresZamek = "*",}
	const enum GZkontrolujZmenyUMaterialuRequestDtoTypes { pokracovatPresZamek = "boolean",}
	const enum GZkontrolujZmenyUMaterialuRequestDtoTypeLengths {}
	/**Výstupní DTO pro zkontrolování změn*/
	interface GZkontrolujZmenyUMaterialuResponseDto {
		/**odemknoutZamek*/
		jeAktivniZamek?: boolean|null;
		/**pocetNactenychMaterialuSeZmenou*/
		pocetNactenychMaterialuSeZmenou?: number|null;
		/**Gets or sets the pocet chybne zpracovanych materialu.*/
		pocetUlozenychVGinis?: number|null;
		/**Gets or sets the pocet zpracovanych materialu.*/
		pocetNoveZmenenych?: number|null;
		/**Gets or sets the pocet nove stazenych pripominek.*/
		pocetNoveStazenychPripominek?: number|null;
		/**Gets or sets the chybove zpravy.*/
		chyboveZpravy?: string|null;
		/**Gets or sets the pocet chybne zpracovanych materialu.*/
		pocetChybneZpracovanychMaterialu?: number|null;
	}
	const enum GZkontrolujZmenyUMaterialuResponseDtoNames { jeAktivniZamek = "jeAktivniZamek", pocetNactenychMaterialuSeZmenou = "pocetNactenychMaterialuSeZmenou", pocetUlozenychVGinis = "pocetUlozenychVGinis", pocetNoveZmenenych = "pocetNoveZmenenych", pocetNoveStazenychPripominek = "pocetNoveStazenychPripominek", chyboveZpravy = "chyboveZpravy", pocetChybneZpracovanychMaterialu = "pocetChybneZpracovanychMaterialu",}
	const enum GZkontrolujZmenyUMaterialuResponseDtoFragments { jeAktivniZamek = "*", pocetNactenychMaterialuSeZmenou = "*", pocetUlozenychVGinis = "*", pocetNoveZmenenych = "*", pocetNoveStazenychPripominek = "*", chyboveZpravy = "*", pocetChybneZpracovanychMaterialu = "*",}
	const enum GZkontrolujZmenyUMaterialuResponseDtoTypes { jeAktivniZamek = "boolean", pocetNactenychMaterialuSeZmenou = "number", pocetUlozenychVGinis = "number", pocetNoveZmenenych = "number", pocetNoveStazenychPripominek = "number", chyboveZpravy = "string", pocetChybneZpracovanychMaterialu = "number",}
	const enum GZkontrolujZmenyUMaterialuResponseDtoTypeLengths {}
	/**Vstupní DTO pro zkontrolování změn*/
	interface GZkontrolujEklepRequestDto {
		/**pokracovatPresZamek*/
		pokracovatPresZamek?: boolean|null;
	}
	const enum GZkontrolujEklepRequestDtoNames { pokracovatPresZamek = "pokracovatPresZamek",}
	const enum GZkontrolujEklepRequestDtoFragments { pokracovatPresZamek = "*",}
	const enum GZkontrolujEklepRequestDtoTypes { pokracovatPresZamek = "boolean",}
	const enum GZkontrolujEklepRequestDtoTypeLengths {}
	/**Výstupní DTO pro zkontrolování změn*/
	interface GZkontrolujEklepResponseDto {
	}
	const enum GZkontrolujEklepResponseDtoNames {}
	const enum GZkontrolujEklepResponseDtoFragments {}
	const enum GZkontrolujEklepResponseDtoTypes {}
	const enum GZkontrolujEklepResponseDtoTypeLengths {}
	/**Vstupní DTO pro zkontrolování změn*/
	interface GEklepGetSubjectEntriesRequestDto {
		/**SubjectType*/
		SubjectType?: string|null;
	}
	const enum GEklepGetSubjectEntriesRequestDtoNames { SubjectType = "SubjectType",}
	const enum GEklepGetSubjectEntriesRequestDtoFragments { SubjectType = "*",}
	const enum GEklepGetSubjectEntriesRequestDtoTypes { SubjectType = "string",}
	const enum GEklepGetSubjectEntriesRequestDtoTypeLengths {}
	/**Výstupní DTO pro zkontrolování změn*/
	interface GGEklepGetSubjectEntriesResponseDto {
		/**Code*/
		Data?: Gordic.Ssl.Interface.GGEklepGetSubjectEntriesResponseItemDto[]|null;
	}
	const enum GGEklepGetSubjectEntriesResponseDtoNames { Data = "Data",}
	const enum GGEklepGetSubjectEntriesResponseDtoFragments { Data = "*",}
	const enum GGEklepGetSubjectEntriesResponseDtoTypes { Data = "Gordic.Ssl.Interface.GGEklepGetSubjectEntriesResponseItemDto[]",}
	const enum GGEklepGetSubjectEntriesResponseDtoTypeLengths {}
	/**Výstupní DTO pro zkontrolování změn*/
	interface GGEklepGetSubjectEntriesResponseItemDto {
		/**Code*/
		Code?: string|null;
		/**Value*/
		Value?: string|null;
	}
	const enum GGEklepGetSubjectEntriesResponseItemDtoNames { Code = "Code", Value = "Value",}
	const enum GGEklepGetSubjectEntriesResponseItemDtoFragments { Code = "*", Value = "*",}
	const enum GGEklepGetSubjectEntriesResponseItemDtoTypes { Code = "string", Value = "string",}
	const enum GGEklepGetSubjectEntriesResponseItemDtoTypeLengths {}
	/**Vstupní DTO pro odeslání odpovědi připomínky.*/
	interface GNovePripominkoveRizeniRequestDto {
		/**Gets or sets the ixp dokumentu s odpovedi.*/
		prilohy?: Gordic.Ssl.Interface.GAttachment2EklepDto[]|null;
		/**keywords.*/
		keywords?: string[]|null;
		/**law_areas.*/
		law_areas?: string[]|null;
		/**typ_materialu.*/
		typ_materialu?: Gordic.Ginis.DbModel.GSslcekmEnum|null;
		/**description.*/
		description?: string|null;
		/**title.*/
		title?: string|null;
		/**mandate.*/
		mandate?: string|null;
		/**review_process_start.*/
		review_process_start?: JsonDate|null;
		/**review_process_finish.*/
		review_process_finish?: JsonDate|null;
		/**mandatory_reviewers.*/
		MandatoryReviewers?: Gordic.Ssl.Interface.GSsldereDto[]|null;
		/**other_reviewers.*/
		OtherReviewers?: Gordic.Ssl.Interface.GSsldereDto[]|null;
		/**title.*/
		ixp_doc?: string|null;
		/**title.*/
		ixp_spis?: string|null;
		/**idno_ext.*/
		idno_ext?: string|null;
	}
	const enum GNovePripominkoveRizeniRequestDtoNames { prilohy = "prilohy", keywords = "keywords", law_areas = "law_areas", typ_materialu = "typ_materialu", description = "description", title = "title", mandate = "mandate", review_process_start = "review_process_start", review_process_finish = "review_process_finish", MandatoryReviewers = "MandatoryReviewers", OtherReviewers = "OtherReviewers", ixp_doc = "ixp_doc", ixp_spis = "ixp_spis", idno_ext = "idno_ext",}
	const enum GNovePripominkoveRizeniRequestDtoFragments { prilohy = "*", keywords = "*", law_areas = "*", typ_materialu = "*", description = "*", title = "*", mandate = "*", review_process_start = "*", review_process_finish = "*", MandatoryReviewers = "*", OtherReviewers = "*", ixp_doc = "*", ixp_spis = "*", idno_ext = "*",}
	const enum GNovePripominkoveRizeniRequestDtoTypes { prilohy = "Gordic.Ssl.Interface.GAttachment2EklepDto[]", keywords = "string[]", law_areas = "string[]", typ_materialu = "Gordic.Ginis.DbModel.GSslcekmEnum", description = "string", title = "string", mandate = "string", review_process_start = "JsonDate", review_process_finish = "JsonDate", MandatoryReviewers = "Gordic.Ssl.Interface.GSsldereDto[]", OtherReviewers = "Gordic.Ssl.Interface.GSsldereDto[]", ixp_doc = "string", ixp_spis = "string", idno_ext = "string",}
	const enum GNovePripominkoveRizeniRequestDtoTypeLengths {}
	/**Výstupní DTO pro odeslání odpovědi připomínky.*/
	interface GNovePripominkoveRizeniResponseDto {
	}
	const enum GNovePripominkoveRizeniResponseDtoNames {}
	const enum GNovePripominkoveRizeniResponseDtoFragments {}
	const enum GNovePripominkoveRizeniResponseDtoTypes {}
	const enum GNovePripominkoveRizeniResponseDtoTypeLengths {}
	/**GSslEklepNovePripominkoveRizeniDto*/
	interface GSslEklepNovePripominkoveRizeniDto {
		/**description.*/
		description?: string|null;
		/**title.*/
		title?: string|null;
		/**mandate.*/
		mandate?: string|null;
		/**review_process_start.*/
		review_process_start?: JsonDate|null;
		/**review_process_finish.*/
		review_process_finish?: JsonDate|null;
		/**keywords.*/
		keywords?: string[]|null;
		/**law_areas.*/
		law_areas?: string[]|null;
		/**idno_ext.*/
		idno_ext?: string|null;
		/**typ_materialu.*/
		typ_materialu?: Gordic.Ginis.DbModel.GSslcekmEnum|null;
		/**MandatoryReviewers*/
		MandatoryReviewers?: Gordic.Ssl.Interface.GSslderpDto[]|null;
		/**MandatoryReviewers*/
		OtherReviewers?: Gordic.Ssl.Interface.GSslderpDto[]|null;
		/**eklepPredplneniPrilohy.*/
		eklepPredplneniPrilohy?: Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto[]|null;
	}
	const enum GSslEklepNovePripominkoveRizeniDtoNames { description = "description", title = "title", mandate = "mandate", review_process_start = "review_process_start", review_process_finish = "review_process_finish", keywords = "keywords", law_areas = "law_areas", idno_ext = "idno_ext", typ_materialu = "typ_materialu", MandatoryReviewers = "MandatoryReviewers", OtherReviewers = "OtherReviewers", eklepPredplneniPrilohy = "eklepPredplneniPrilohy",}
	const enum GSslEklepNovePripominkoveRizeniDtoFragments { description = "*", title = "*", mandate = "*", review_process_start = "*", review_process_finish = "*", keywords = "*", law_areas = "*", idno_ext = "*", typ_materialu = "*", MandatoryReviewers = "*", OtherReviewers = "*", eklepPredplneniPrilohy = "*",}
	const enum GSslEklepNovePripominkoveRizeniDtoTypes { description = "string", title = "string", mandate = "string", review_process_start = "JsonDate", review_process_finish = "JsonDate", keywords = "string[]", law_areas = "string[]", idno_ext = "string", typ_materialu = "Gordic.Ginis.DbModel.GSslcekmEnum", MandatoryReviewers = "Gordic.Ssl.Interface.GSslderpDto[]", OtherReviewers = "Gordic.Ssl.Interface.GSslderpDto[]", eklepPredplneniPrilohy = "Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto[]",}
	const enum GSslEklepNovePripominkoveRizeniDtoTypeLengths {}
	/**GSslEklepNovePripominkoveRizeniDto*/
	interface GSslEklepPripominkaDto {
		/**typPripominky.*/
		typPripominky?: Gordic.Ginis.DbModel.GSslcektEnum|null;
		/**eklepPredplneniPrilohy.*/
		eklepPredplneniPrilohy?: Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto[]|null;
	}
	const enum GSslEklepPripominkaDtoNames { typPripominky = "typPripominky", eklepPredplneniPrilohy = "eklepPredplneniPrilohy",}
	const enum GSslEklepPripominkaDtoFragments { typPripominky = "*", eklepPredplneniPrilohy = "*",}
	const enum GSslEklepPripominkaDtoTypes { typPripominky = "Gordic.Ginis.DbModel.GSslcektEnum", eklepPredplneniPrilohy = "Gordic.Ssl.Interface.GSslspepPredplneniEklepPrilohyDto[]",}
	const enum GSslEklepPripominkaDtoTypeLengths {}
	/**GUlozPriopominkuNaNamaVytvorenePripominkoveRizeniDto*/
	interface GUlozPriopominkuNaNamaVytvorenePripominkoveRizeniDto {
		/**ixpNovehoDoc.*/
		ixpNovehoDoc?: string|null;
		/**ixsEsu.*/
		ixsEsu?: string|null;
		/**tempAdresar*/
		tempAdresar?: string|null;
		/**pripraveneSoubory*/
		pripraveneSoubory?: Gordic.Ssl.Interface.GNactiNoveMaterialyStazeneSouboryDto[]|null;
	}
	const enum GUlozPriopominkuNaNamaVytvorenePripominkoveRizeniDtoNames { ixpNovehoDoc = "ixpNovehoDoc", ixsEsu = "ixsEsu", tempAdresar = "tempAdresar", pripraveneSoubory = "pripraveneSoubory",}
	const enum GUlozPriopominkuNaNamaVytvorenePripominkoveRizeniDtoFragments { ixpNovehoDoc = "*", ixsEsu = "*", tempAdresar = "*", pripraveneSoubory = "*",}
	const enum GUlozPriopominkuNaNamaVytvorenePripominkoveRizeniDtoTypes { ixpNovehoDoc = "string", ixsEsu = "string", tempAdresar = "string", pripraveneSoubory = "Gordic.Ssl.Interface.GNactiNoveMaterialyStazeneSouboryDto[]",}
	const enum GUlozPriopominkuNaNamaVytvorenePripominkoveRizeniDtoTypeLengths {}
	/**GUlozPriopominkuNaNamaVytvorenePripominkoveRizeniDto*/
	interface GEklepUlozeniSouboruProPredplneniOdeslaniDto {
		/**ixp_doc.*/
		ixp_doc?: string|null;
		/**ixb.*/
		ixb?: string|null;
		/**ser_cislo*/
		ser_cislo?: number|null;
		/**file_name.*/
		file_name?: string|null;
		/**typ_pril.*/
		typ_pril?: Gordic.Ginis.DbModel.GSslcekpEnum|null;
		/**pripraveneSoubory*/
		pripraveneSoubory?: Gordic.Ssl.Interface.GNactiNoveMaterialyStazeneSouboryDto[]|null;
		/**documenttype.*/
		documenttype?: Gordic.Ginis.DbModel.GSslcekdEnum|null;
	}
	const enum GEklepUlozeniSouboruProPredplneniOdeslaniDtoNames { ixp_doc = "ixp_doc", ixb = "ixb", ser_cislo = "ser_cislo", file_name = "file_name", typ_pril = "typ_pril", pripraveneSoubory = "pripraveneSoubory", documenttype = "documenttype",}
	const enum GEklepUlozeniSouboruProPredplneniOdeslaniDtoFragments { ixp_doc = "*", ixb = "*", ser_cislo = "*", file_name = "*", typ_pril = "*", pripraveneSoubory = "*", documenttype = "*",}
	const enum GEklepUlozeniSouboruProPredplneniOdeslaniDtoTypes { ixp_doc = "string", ixb = "string", ser_cislo = "number", file_name = "string", typ_pril = "Gordic.Ginis.DbModel.GSslcekpEnum", pripraveneSoubory = "Gordic.Ssl.Interface.GNactiNoveMaterialyStazeneSouboryDto[]", documenttype = "Gordic.Ginis.DbModel.GSslcekdEnum",}
	const enum GEklepUlozeniSouboruProPredplneniOdeslaniDtoTypeLengths {}
	/**GEvidovatDokumentEklepDto*/
	interface GEvidovatDokumentEklepRequestDto {
		/**ixp_doc.*/
		ixp?: string|null;
		/**ixb.*/
		ixs_typ?: string|null;
	}
	const enum GEvidovatDokumentEklepRequestDtoNames { ixp = "ixp", ixs_typ = "ixs_typ",}
	const enum GEvidovatDokumentEklepRequestDtoFragments { ixp = "*", ixs_typ = "*",}
	const enum GEvidovatDokumentEklepRequestDtoTypes { ixp = "string", ixs_typ = "string",}
	const enum GEvidovatDokumentEklepRequestDtoTypeLengths {}
	/**GEvidovatDokumentEklepDto*/
	interface GEvidovatDokumentEklepResponseDto {
	}
	const enum GEvidovatDokumentEklepResponseDtoNames {}
	const enum GEvidovatDokumentEklepResponseDtoFragments {}
	const enum GEvidovatDokumentEklepResponseDtoTypes {}
	const enum GEvidovatDokumentEklepResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSsldeklDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:ssldekl
	*      ssldekl
	*/
	interface GSsldeklDto {
		ixs_ekp?: string|null;
		law_area_eklep?: string|null;
	}
	const enum GSsldeklDtoNames { ixs_ekp = "ixs_ekp", law_area_eklep = "law_area_eklep",}
	const enum GSsldeklDtoFragments { ixs_ekp = "*", law_area_eklep = "*",}
	const enum GSsldeklDtoTypes { ixs_ekp = "string", law_area_eklep = "string",}
	const enum GSsldeklDtoTypeLengths { ixs_ekp = 12, law_area_eklep = 100,}
	const enum GSsldeklFilter {
		ixs_ekp,
		law_area_eklep,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSsldekoDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:ssldeko*/
	interface GSsldekoDto {
		/**DBCOLUMN:ssldeko.pid_eklep*/
		pid_eklep?: string|null;
		/**DBCOLUMN:ssldeko.law_area_eklep*/
		law_area_eklep?: string|null;
	}
	const enum GSsldekoDtoNames { pid_eklep = "pid_eklep", law_area_eklep = "law_area_eklep",}
	const enum GSsldekoDtoFragments { pid_eklep = "*", law_area_eklep = "*",}
	const enum GSsldekoDtoTypes { pid_eklep = "string", law_area_eklep = "string",}
	const enum GSsldekoDtoTypeLengths { pid_eklep = 12, law_area_eklep = 100,}
	/**Historie písemnosti.*/
	const enum GSsldekoFilter {
		/**pid_eklep*/
		pid_eklep,
		/**kl_slovo_eklep*/
		law_area_eklep,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSsldekpDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:ssldekp
	*      ssldekp
	*/
	interface GSsldekpDto {
		ixs_ekp?: string|null;
		kl_slovo_eklep?: string|null;
	}
	const enum GSsldekpDtoNames { ixs_ekp = "ixs_ekp", kl_slovo_eklep = "kl_slovo_eklep",}
	const enum GSsldekpDtoFragments { ixs_ekp = "*", kl_slovo_eklep = "*",}
	const enum GSsldekpDtoTypes { ixs_ekp = "string", kl_slovo_eklep = "string",}
	const enum GSsldekpDtoTypeLengths { ixs_ekp = 12, kl_slovo_eklep = 100,}
	/**Historie písemnosti.*/
	const enum GSsldekpFilter {
		/**ixs_ekp*/
		ixs_ekp,
		/**kl_slovo_eklep*/
		kl_slovo_eklep,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSsldeksDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:ssldeks*/
	interface GSsldeksDto {
		/**DBCOLUMN:ssldeks.pid_eklep*/
		pid_eklep?: string|null;
		/**DBCOLUMN:ssldeks.kl_slovo_eklep*/
		kl_slovo_eklep?: string|null;
	}
	const enum GSsldeksDtoNames { pid_eklep = "pid_eklep", kl_slovo_eklep = "kl_slovo_eklep",}
	const enum GSsldeksDtoFragments { pid_eklep = "*", kl_slovo_eklep = "*",}
	const enum GSsldeksDtoTypes { pid_eklep = "string", kl_slovo_eklep = "string",}
	const enum GSsldeksDtoTypeLengths { pid_eklep = 12, kl_slovo_eklep = 100,}
	/**Historie písemnosti.*/
	const enum GSsldeksFilter {
		/**pid_eklep*/
		pid_eklep,
		/**kl_slovo_eklep*/
		kl_slovo_eklep,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSsldereDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:ssldere*/
	interface GSsldereDto {
		/**DBCOLUMN:ssldere.pid_eklep*/
		pid_eklep?: string|null;
		/**DBCOLUMN:ssldere.reviewers*/
		reviewers?: string|null;
		/**DBCOLUMN:ssldere.reviewers*/
		mandatory?: number|null;
		/**DBCOLUMN:ssldere.reviewers*/
		reviewers_txt?: string|null;
	}
	const enum GSsldereDtoNames { pid_eklep = "pid_eklep", reviewers = "reviewers", mandatory = "mandatory", reviewers_txt = "reviewers_txt",}
	const enum GSsldereDtoFragments { pid_eklep = "*", reviewers = "*", mandatory = "*", reviewers_txt = "*",}
	const enum GSsldereDtoTypes { pid_eklep = "string", reviewers = "string", mandatory = "number", reviewers_txt = "string",}
	const enum GSsldereDtoTypeLengths { pid_eklep = 12, reviewers = 20, reviewers_txt = 150,}
	/**Historie písemnosti.*/
	const enum GSsldereFilter {
		/**pid_eklep*/
		pid_eklep,
		/**reviewers*/
		reviewers,
		/**reviewers*/
		mandatory,
		/**reviewers_txt*/
		reviewers_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslderpDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:sslderp*/
	interface GSslderpDto {
		/**DBCOLUMN:sslderp.ixs_ekp*/
		ixs_ekp?: string|null;
		/**DBCOLUMN:sslderp.reviewers*/
		reviewers?: string|null;
		/**DBCOLUMN:sslderp.reviewers*/
		mandatory?: number|null;
		/**DBCOLUMN:ssldere.reviewers*/
		reviewers_txt?: string|null;
	}
	const enum GSslderpDtoNames { ixs_ekp = "ixs_ekp", reviewers = "reviewers", mandatory = "mandatory", reviewers_txt = "reviewers_txt",}
	const enum GSslderpDtoFragments { ixs_ekp = "*", reviewers = "*", mandatory = "*", reviewers_txt = "*",}
	const enum GSslderpDtoTypes { ixs_ekp = "string", reviewers = "string", mandatory = "number", reviewers_txt = "string",}
	const enum GSslderpDtoTypeLengths { ixs_ekp = 12, reviewers = 20, reviewers_txt = 150,}
	/**Historie písemnosti.*/
	const enum GSslderpFilter {
		/**ixs_ekp*/
		ixs_ekp,
		/**reviewers*/
		reviewers,
		/**reviewers*/
		mandatory,
		/**reviewers_txt*/
		reviewers_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslseklDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:sslsekl*/
	interface GSslseklDto {
		/**Fragmenty.*/
		FRAGMENT_KEY?: string|null;
		/**Fragmenty.*/
		FRAGMENT_BASE?: string|null;
		/**Fragmenty.*/
		FRAGMENT_ZMENU_PROV?: string|null;
		/**Fragmenty.*/
		FRAGMENT_STAV_RIZENI?: string|null;
		/**PidEklepu*/
		pid_eklep?: string|null;
		/**DBCOLUMN:sslsekl.ixp_doc*/
		ixp_doc?: string|null;
		/**DBCOLUMN:sslsekl.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:sslsekl.ixp_vyriz_eklep*/
		ixp_vyriz_eklep?: string|null;
		/**DBCOLUMN:sslsekl.ixp_vyriz_eklep*/
		ixp_sber_pripo?: string|null;
		stav_rizeni?: Gordic.Ginis.DbModel.GSslceksEnum|null;
		dat_vytvoreni?: JsonDate|null;
		dat_rev_proc_start?: JsonDate|null;
		dat_rev_proc_finis?: JsonDate|null;
		dat_discarded?: JsonDate|null;
		idno_ext?: string|null;
		typ_materialu?: Gordic.Ginis.DbModel.GSslcekmEnum|null;
		title?: string|null;
		description?: string|null;
		stav_materialu?: Gordic.Ginis.DbModel.GSslcekeEnum|null;
		dat_modified?: JsonDate|null;
		priz_vznik_ginis?: Gordic.Ginis.DbModel.GGincpanEnum|null;
		mandate?: string|null;
		/**DBCOLUMN:sslsekl.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslsekl.zmenu_prov*/
		zmenu_prov?: string|null;
		/**StavRizeni.*/
		StavRizeni?: Gordic.Ginis.DbModel.GSslceksDto|null;
		/**TypMaterialu.*/
		TypMaterialu?: Gordic.Ginis.DbModel.GSslcekmDto|null;
		/**StavMaterialu.*/
		StavMaterialu?: Gordic.Ginis.DbModel.GSslcekeDto|null;
		/**Spis*/
		Spis?: Gordic.Ssl.Interface.GSpisDto|null;
		/**DokumentIniciacni*/
		DokumentIniciacni?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Keywords*/
		KeyWords?: Gordic.Ssl.Interface.GSsldeksDto[]|null;
		/**Keywords v jednom textu.*/
		readonly KeyWordsTxt?: string|null;
		/**Keywords*/
		LawAreas?: Gordic.Ssl.Interface.GSsldekoDto[]|null;
		/**LawAreas v jednom textu.*/
		readonly LawAreasTxt?: string|null;
		/**MandatoryReviewers*/
		MandatoryReviewers?: Gordic.Ssl.Interface.GSsldereDto[]|null;
		/**Keywords v jednom textu.*/
		readonly MandatoryReviewersTxt?: string|null;
		/**MandatoryReviewers*/
		OtherReviewers?: Gordic.Ssl.Interface.GSsldereDto[]|null;
		/**Keywords v jednom textu.*/
		readonly OtherReviewersTxt?: string|null;
	}
	const enum GSslseklDtoNames { FRAGMENT_KEY = "FRAGMENT_KEY", FRAGMENT_BASE = "FRAGMENT_BASE", FRAGMENT_ZMENU_PROV = "FRAGMENT_ZMENU_PROV", FRAGMENT_STAV_RIZENI = "FRAGMENT_STAV_RIZENI", pid_eklep = "pid_eklep", ixp_doc = "ixp_doc", ixp_spis = "ixp_spis", ixp_vyriz_eklep = "ixp_vyriz_eklep", ixp_sber_pripo = "ixp_sber_pripo", stav_rizeni = "stav_rizeni", dat_vytvoreni = "dat_vytvoreni", dat_rev_proc_start = "dat_rev_proc_start", dat_rev_proc_finis = "dat_rev_proc_finis", dat_discarded = "dat_discarded", idno_ext = "idno_ext", typ_materialu = "typ_materialu", title = "title", description = "description", stav_materialu = "stav_materialu", dat_modified = "dat_modified", priz_vznik_ginis = "priz_vznik_ginis", mandate = "mandate", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", StavRizeni = "StavRizeni", TypMaterialu = "TypMaterialu", StavMaterialu = "StavMaterialu", Spis = "Spis", DokumentIniciacni = "DokumentIniciacni", KeyWords = "KeyWords", KeyWordsTxt = "KeyWordsTxt", LawAreas = "LawAreas", LawAreasTxt = "LawAreasTxt", MandatoryReviewers = "MandatoryReviewers", MandatoryReviewersTxt = "MandatoryReviewersTxt", OtherReviewers = "OtherReviewers", OtherReviewersTxt = "OtherReviewersTxt",}
	const enum GSslseklDtoFragments { FRAGMENT_KEY = "*", FRAGMENT_BASE = "*", FRAGMENT_ZMENU_PROV = "*", FRAGMENT_STAV_RIZENI = "*", pid_eklep = "KEY", ixp_doc = "BASE", ixp_spis = "BASE", ixp_vyriz_eklep = "BASE", ixp_sber_pripo = "BASE", stav_rizeni = "BASE", dat_vytvoreni = "BASE", dat_rev_proc_start = "BASE", dat_rev_proc_finis = "BASE", dat_discarded = "BASE", idno_ext = "BASE", typ_materialu = "BASE", title = "BASE", description = "BASE", stav_materialu = "BASE", dat_modified = "BASE", priz_vznik_ginis = "BASE", mandate = "BASE", dat_zmena = "ZMENU_PROV", zmenu_prov = "ZMENU_PROV", StavRizeni = "*", TypMaterialu = "*", StavMaterialu = "*", Spis = "*", DokumentIniciacni = "*", KeyWords = "*", KeyWordsTxt = "KeyWords.*", LawAreas = "*", LawAreasTxt = "LawAreas.*", MandatoryReviewers = "*", MandatoryReviewersTxt = "MandatoryReviewers.*", OtherReviewers = "*", OtherReviewersTxt = "OtherReviewers.*",}
	const enum GSslseklDtoTypes { FRAGMENT_KEY = "string", FRAGMENT_BASE = "string", FRAGMENT_ZMENU_PROV = "string", FRAGMENT_STAV_RIZENI = "string", pid_eklep = "string", ixp_doc = "string", ixp_spis = "string", ixp_vyriz_eklep = "string", ixp_sber_pripo = "string", stav_rizeni = "Gordic.Ginis.DbModel.GSslceksEnum", dat_vytvoreni = "JsonDate", dat_rev_proc_start = "JsonDate", dat_rev_proc_finis = "JsonDate", dat_discarded = "JsonDate", idno_ext = "string", typ_materialu = "Gordic.Ginis.DbModel.GSslcekmEnum", title = "string", description = "string", stav_materialu = "Gordic.Ginis.DbModel.GSslcekeEnum", dat_modified = "JsonDate", priz_vznik_ginis = "Gordic.Ginis.DbModel.GGincpanEnum", mandate = "string", dat_zmena = "JsonDate", zmenu_prov = "string", StavRizeni = "Gordic.Ginis.DbModel.GSslceksDto", TypMaterialu = "Gordic.Ginis.DbModel.GSslcekmDto", StavMaterialu = "Gordic.Ginis.DbModel.GSslcekeDto", Spis = "Gordic.Ssl.Interface.GSpisDto", DokumentIniciacni = "Gordic.Ssl.Interface.GDokumentDto", KeyWords = "Gordic.Ssl.Interface.GSsldeksDto[]", KeyWordsTxt = "string", LawAreas = "Gordic.Ssl.Interface.GSsldekoDto[]", LawAreasTxt = "string", MandatoryReviewers = "Gordic.Ssl.Interface.GSsldereDto[]", MandatoryReviewersTxt = "string", OtherReviewers = "Gordic.Ssl.Interface.GSsldereDto[]", OtherReviewersTxt = "string",}
	const enum GSslseklDtoTypeLengths { pid_eklep = 12, zmenu_prov = 12,}
	/**Historie písemnosti.*/
	const enum GSslseklFilter {
		/**pid_eklep*/
		pid_eklep,
		/**pořadové číslo*/
		ixp_doc,
		/**obsah*/
		ixp_spis,
		/**Ixp_vyriz_eklep*/
		ixp_vyriz_eklep,
		stav_rizeni,
		dat_vytvoreni,
		dat_rev_proc_start,
		dat_rev_proc_finis,
		dat_discarded,
		idno_ext,
		typ_materialu,
		title,
		description,
		stav_materialu,
		dat_modified,
		/**DBCOLUMN:sslsekl,dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**Vytvořen v Ginis.*/
		priz_vznik_ginis,
		/**Důvod předložení materiálu*/
		mandate,
		/**Spisový uzel spisu.*/
		Spis_ixs_su_akt=1000,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslseklFilterDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Filtrační DTO pro připoménkové řízení v EKLEP.*/
	interface GSslseklFilterDto {
		/**PidEklepu*/
		pid_eklep?: GBaseFilter<string>|null;
		/**DBCOLUMN:sslsekl.ixp_doc*/
		ixp_doc?: GBaseFilter<string>|null;
		/**DBCOLUMN:sslsekl.ixp_spis*/
		ixp_spis?: GBaseFilter<string>|null;
		/**DBCOLUMN:sslsekl.ixp_vyriz_eklep*/
		ixp_vyriz_eklep?: GBaseFilter<string>|null;
		/**DBCOLUMN:sslsekl.ixp_vyriz_eklep*/
		ixp_sber_pripo?: GBaseFilter<string>|null;
		stav_rizeni?: Gordic.Ginis.DbModel.GSslceksEnum[]|null;
		dat_vytvoreni?: GIntervalDto<JsonDate>|null;
		dat_rev_proc_start?: GIntervalDto<JsonDate>|null;
		dat_rev_proc_finis?: GIntervalDto<JsonDate>|null;
		dat_discarded?: GIntervalDto<JsonDate>|null;
		idno_ext?: GBaseFilter<string>|null;
		typ_materialu?: Gordic.Ginis.DbModel.GSslcekmEnum[]|null;
		title?: GBaseFilter<string>|null;
		description?: GBaseFilter<string>|null;
		stav_materialu?: Gordic.Ginis.DbModel.GSslcekeEnum[]|null;
		dat_modified?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:sslsekl.dat_zmena*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**DBCOLUMN:sslsekl.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Vytvořeno v Ginis*/
		priz_vznik_ginis?: Gordic.Ginis.DbModel.GGincpanEnum|null;
		/**Důvod předložení materiálu*/
		mandate?: GBaseFilter<string>|null;
	}
	const enum GSslseklFilterDtoNames { pid_eklep = "pid_eklep", ixp_doc = "ixp_doc", ixp_spis = "ixp_spis", ixp_vyriz_eklep = "ixp_vyriz_eklep", ixp_sber_pripo = "ixp_sber_pripo", stav_rizeni = "stav_rizeni", dat_vytvoreni = "dat_vytvoreni", dat_rev_proc_start = "dat_rev_proc_start", dat_rev_proc_finis = "dat_rev_proc_finis", dat_discarded = "dat_discarded", idno_ext = "idno_ext", typ_materialu = "typ_materialu", title = "title", description = "description", stav_materialu = "stav_materialu", dat_modified = "dat_modified", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", priz_vznik_ginis = "priz_vznik_ginis", mandate = "mandate",}
	const enum GSslseklFilterDtoFragments { pid_eklep = "*", ixp_doc = "*", ixp_spis = "*", ixp_vyriz_eklep = "*", ixp_sber_pripo = "*", stav_rizeni = "*", dat_vytvoreni = "*", dat_rev_proc_start = "*", dat_rev_proc_finis = "*", dat_discarded = "*", idno_ext = "*", typ_materialu = "*", title = "*", description = "*", stav_materialu = "*", dat_modified = "*", dat_zmena = "*", zmenu_prov = "*", priz_vznik_ginis = "*", mandate = "*",}
	const enum GSslseklFilterDtoTypes { pid_eklep = "GBaseFilter<string>", ixp_doc = "GBaseFilter<string>", ixp_spis = "GBaseFilter<string>", ixp_vyriz_eklep = "GBaseFilter<string>", ixp_sber_pripo = "GBaseFilter<string>", stav_rizeni = "Gordic.Ginis.DbModel.GSslceksEnum[]", dat_vytvoreni = "GIntervalDto<JsonDate>", dat_rev_proc_start = "GIntervalDto<JsonDate>", dat_rev_proc_finis = "GIntervalDto<JsonDate>", dat_discarded = "GIntervalDto<JsonDate>", idno_ext = "GBaseFilter<string>", typ_materialu = "Gordic.Ginis.DbModel.GSslcekmEnum[]", title = "GBaseFilter<string>", description = "GBaseFilter<string>", stav_materialu = "Gordic.Ginis.DbModel.GSslcekeEnum[]", dat_modified = "GIntervalDto<JsonDate>", dat_zmena = "GIntervalDto<JsonDate>", zmenu_prov = "string", priz_vznik_ginis = "Gordic.Ginis.DbModel.GGincpanEnum", mandate = "GBaseFilter<string>",}
	const enum GSslseklFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslsekpPredplneniEklepDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:sslsekp
	*      sslsekp
	*/
	interface GSslsekpPredplneniEklepDto {
		ixs_ekp?: string|null;
		ixp_doc?: string|null;
		ixp_spis?: string|null;
		documenttype?: Gordic.Ginis.DbModel.GSslcekdEnum|null;
		dat_rev_proc_start?: JsonDate|null;
		dat_rev_proc_finis?: JsonDate|null;
		idno_ext?: string|null;
		typ_materialu?: Gordic.Ginis.DbModel.GSslcekmEnum|null;
		title?: string|null;
		description?: string|null;
		stav_materialu?: Gordic.Ginis.DbModel.GSslcekeEnum|null;
		mandate?: string|null;
		typ_pripominky?: string|null;
		/**TypMaterialu.*/
		TypMaterialu?: Gordic.Ginis.DbModel.GSslcekmDto|null;
		/**StavMaterialu.*/
		StavMaterialu?: Gordic.Ginis.DbModel.GSslcekeDto|null;
		/**Spis*/
		Spis?: Gordic.Ssl.Interface.GSpisDto|null;
		/**DokumentIniciacni*/
		DokumentIniciacni?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Keywords*/
		KeyWords?: Gordic.Ssl.Interface.GSsldekpDto[]|null;
		/**Keywords v jednom textu.*/
		readonly KeyWordsTxt?: string|null;
		/**Keywords*/
		LawAreas?: Gordic.Ssl.Interface.GSsldeklDto[]|null;
		/**LawAreas v jednom textu.*/
		readonly LawAreasTxt?: string|null;
		/**MandatoryReviewers*/
		MandatoryReviewers?: Gordic.Ssl.Interface.GSslderpDto[]|null;
		/**Keywords v jednom textu.*/
		readonly MandatoryReviewersTxt?: string|null;
		/**MandatoryReviewers*/
		OtherReviewers?: Gordic.Ssl.Interface.GSslderpDto[]|null;
		/**Keywords v jednom textu.*/
		readonly OtherReviewersTxt?: string|null;
	}
	const enum GSslsekpPredplneniEklepDtoNames { ixs_ekp = "ixs_ekp", ixp_doc = "ixp_doc", ixp_spis = "ixp_spis", documenttype = "documenttype", dat_rev_proc_start = "dat_rev_proc_start", dat_rev_proc_finis = "dat_rev_proc_finis", idno_ext = "idno_ext", typ_materialu = "typ_materialu", title = "title", description = "description", stav_materialu = "stav_materialu", mandate = "mandate", typ_pripominky = "typ_pripominky", TypMaterialu = "TypMaterialu", StavMaterialu = "StavMaterialu", Spis = "Spis", DokumentIniciacni = "DokumentIniciacni", KeyWords = "KeyWords", KeyWordsTxt = "KeyWordsTxt", LawAreas = "LawAreas", LawAreasTxt = "LawAreasTxt", MandatoryReviewers = "MandatoryReviewers", MandatoryReviewersTxt = "MandatoryReviewersTxt", OtherReviewers = "OtherReviewers", OtherReviewersTxt = "OtherReviewersTxt",}
	const enum GSslsekpPredplneniEklepDtoFragments { ixs_ekp = "*", ixp_doc = "*", ixp_spis = "*", documenttype = "*", dat_rev_proc_start = "*", dat_rev_proc_finis = "*", idno_ext = "*", typ_materialu = "*", title = "*", description = "*", stav_materialu = "*", mandate = "*", typ_pripominky = "*", TypMaterialu = "*", StavMaterialu = "*", Spis = "*", DokumentIniciacni = "*", KeyWords = "*", KeyWordsTxt = "KeyWords.*", LawAreas = "*", LawAreasTxt = "LawAreas.*", MandatoryReviewers = "*", MandatoryReviewersTxt = "MandatoryReviewers.*", OtherReviewers = "*", OtherReviewersTxt = "OtherReviewers.*",}
	const enum GSslsekpPredplneniEklepDtoTypes { ixs_ekp = "string", ixp_doc = "string", ixp_spis = "string", documenttype = "Gordic.Ginis.DbModel.GSslcekdEnum", dat_rev_proc_start = "JsonDate", dat_rev_proc_finis = "JsonDate", idno_ext = "string", typ_materialu = "Gordic.Ginis.DbModel.GSslcekmEnum", title = "string", description = "string", stav_materialu = "Gordic.Ginis.DbModel.GSslcekeEnum", mandate = "string", typ_pripominky = "string", TypMaterialu = "Gordic.Ginis.DbModel.GSslcekmDto", StavMaterialu = "Gordic.Ginis.DbModel.GSslcekeDto", Spis = "Gordic.Ssl.Interface.GSpisDto", DokumentIniciacni = "Gordic.Ssl.Interface.GDokumentDto", KeyWords = "Gordic.Ssl.Interface.GSsldekpDto[]", KeyWordsTxt = "string", LawAreas = "Gordic.Ssl.Interface.GSsldeklDto[]", LawAreasTxt = "string", MandatoryReviewers = "Gordic.Ssl.Interface.GSslderpDto[]", MandatoryReviewersTxt = "string", OtherReviewers = "Gordic.Ssl.Interface.GSslderpDto[]", OtherReviewersTxt = "string",}
	const enum GSslsekpPredplneniEklepDtoTypeLengths { ixs_ekp = 12, ixp_doc = 12, ixp_spis = 12, documenttype = 10, idno_ext = 100, typ_materialu = 4, title = 254, description = 254, stav_materialu = 4, mandate = 1024, typ_pripominky = 2,}
	/**Historie písemnosti.*/
	const enum GSslsekpFilter {
		/**ixs_ekp*/
		ixs_ekp,
		/**pořadové číslo*/
		ixp_doc,
		/**obsah*/
		ixp_spis,
		/**documenttype*/
		documenttype,
		dat_rev_proc_start,
		dat_rev_proc_finis,
		idno_ext,
		typ_materialu,
		title,
		description,
		stav_materialu,
		/**Důvod předložení materiálu*/
		mandate,
		/**typ_pripominky*/
		typ_pripominky,
		/**Spis_ixs_su_akt*/
		Spis_ixs_su_akt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslsoekDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:sslsoek*/
	interface GSslsoekDto {
		pid_eklep_pripomin?: string|null;
		ixp_vyriz_eklep?: string|null;
		/**PID EKLEP Puvodniho materialu*/
		pid_eklep?: string|null;
		akt_znacka?: string|null;
		/**PidEklepu*/
		typ_pripominky?: Gordic.Ginis.DbModel.GSslcektEnum|null;
		dat_vytvoreni?: JsonDate|null;
		/**DBCOLUMN:sslsoek.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslsoek.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Typ připomínky.*/
		TypPripominky?: Gordic.Ginis.DbModel.GSslcektDto|null;
		/**Připomínkové řízení (zpracované).*/
		PripominkoveRizeniZpracovane?: Gordic.Ssl.Interface.GSslseklDto|null;
	}
	const enum GSslsoekDtoNames { pid_eklep_pripomin = "pid_eklep_pripomin", ixp_vyriz_eklep = "ixp_vyriz_eklep", pid_eklep = "pid_eklep", akt_znacka = "akt_znacka", typ_pripominky = "typ_pripominky", dat_vytvoreni = "dat_vytvoreni", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", TypPripominky = "TypPripominky", PripominkoveRizeniZpracovane = "PripominkoveRizeniZpracovane",}
	const enum GSslsoekDtoFragments { pid_eklep_pripomin = "*", ixp_vyriz_eklep = "*", pid_eklep = "*", akt_znacka = "*", typ_pripominky = "*", dat_vytvoreni = "*", dat_zmena = "*", zmenu_prov = "*", TypPripominky = "*", PripominkoveRizeniZpracovane = "*",}
	const enum GSslsoekDtoTypes { pid_eklep_pripomin = "string", ixp_vyriz_eklep = "string", pid_eklep = "string", akt_znacka = "string", typ_pripominky = "Gordic.Ginis.DbModel.GSslcektEnum", dat_vytvoreni = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", TypPripominky = "Gordic.Ginis.DbModel.GSslcektDto", PripominkoveRizeniZpracovane = "Gordic.Ssl.Interface.GSslseklDto",}
	const enum GSslsoekDtoTypeLengths { pid_eklep_pripomin = 12, ixp_vyriz_eklep = 12, zmenu_prov = 12,}
	/**Historie písemnosti.*/
	const enum GSslsoekFilter {
		/**pid_eklep_pripomin*/
		pid_eklep_pripomin,
		/**ixp_vyriz_eklep*/
		ixp_vyriz_eklep,
		/**pid_eklep_material*/
		pid_eklep,
		/**aktZnacka*/
		akt_znacka,
		typ_pripominky,
		dat_vytvoreni,
		dat_zmena,
		zmenu_prov,
		PripominkoveRizeniZpracovane_ixp_doc=1000,
		PripominkoveRizeniZpracovane_ixp_spis,
		PripominkoveRizeniZpracovane_priz_vznik_ginis,
		/**Spisový uzel spisu.*/
		PripominkoveRizeniZpracovane_Spis_ixs_su_akt=1100,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslspekDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:sslspek*/
	interface GSslspekDto {
		/**pid_eklep_pripomin*/
		pid_eklep_pripomin?: string|null;
		/**ixb*/
		ixb?: string|null;
		/**ser_cislo*/
		ser_cislo?: number|null;
		/**file_name*/
		file_name?: string|null;
		/**typ Prilohy*/
		typ_pril?: Gordic.Ginis.DbModel.GSslcekpEnum|null;
		/**DBCOLUMN:sslspek.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslspek.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Typ přílohy.*/
		TypPrilohy?: Gordic.Ginis.DbModel.GSslcekpDto|null;
	}
	const enum GSslspekDtoNames { pid_eklep_pripomin = "pid_eklep_pripomin", ixb = "ixb", ser_cislo = "ser_cislo", file_name = "file_name", typ_pril = "typ_pril", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", TypPrilohy = "TypPrilohy",}
	const enum GSslspekDtoFragments { pid_eklep_pripomin = "*", ixb = "*", ser_cislo = "*", file_name = "*", typ_pril = "*", dat_zmena = "*", zmenu_prov = "*", TypPrilohy = "*",}
	const enum GSslspekDtoTypes { pid_eklep_pripomin = "string", ixb = "string", ser_cislo = "number", file_name = "string", typ_pril = "Gordic.Ginis.DbModel.GSslcekpEnum", dat_zmena = "JsonDate", zmenu_prov = "string", TypPrilohy = "Gordic.Ginis.DbModel.GSslcekpDto",}
	const enum GSslspekDtoTypeLengths { pid_eklep_pripomin = 12, ixb = 12, zmenu_prov = 12,}
	/**Historie písemnosti.*/
	const enum GSslspekFilter {
		/**ixp_vyriz_eklep*/
		pid_eklep_pripomin,
		/**pid_eklep_material*/
		ixb,
		/**aktZnacka*/
		ixs_ulo,
		/**aktZnacka*/
		por_cislo,
		/**ser_cislo*/
		ser_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslspemDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:sslspem*/
	interface GSslspemDto {
		/**pid_eklep*/
		pid_eklep?: string|null;
		/**ixb*/
		ixb?: string|null;
		/**ser_cislo*/
		ser_cislo?: number|null;
		/**file_name*/
		file_name?: string|null;
		/**typ Prilohy*/
		typ_pril?: Gordic.Ginis.DbModel.GSslcekpEnum|null;
		/**DBCOLUMN:sslspem.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:sslspem.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Typ přílohy.*/
		TypPrilohy?: Gordic.Ginis.DbModel.GSslcekpDto|null;
		/**Příloha.*/
		PrilohaElektronicka?: Gordic.Wfl.Interface.GPrilohaElektronickaDto|null;
	}
	const enum GSslspemDtoNames { pid_eklep = "pid_eklep", ixb = "ixb", ser_cislo = "ser_cislo", file_name = "file_name", typ_pril = "typ_pril", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", TypPrilohy = "TypPrilohy", PrilohaElektronicka = "PrilohaElektronicka",}
	const enum GSslspemDtoFragments { pid_eklep = "*", ixb = "*", ser_cislo = "*", file_name = "*", typ_pril = "*", dat_zmena = "*", zmenu_prov = "*", TypPrilohy = "*", PrilohaElektronicka = "*",}
	const enum GSslspemDtoTypes { pid_eklep = "string", ixb = "string", ser_cislo = "number", file_name = "string", typ_pril = "Gordic.Ginis.DbModel.GSslcekpEnum", dat_zmena = "JsonDate", zmenu_prov = "string", TypPrilohy = "Gordic.Ginis.DbModel.GSslcekpDto", PrilohaElektronicka = "Gordic.Wfl.Interface.GPrilohaElektronickaDto",}
	const enum GSslspemDtoTypeLengths { pid_eklep = 12, ixb = 12, zmenu_prov = 12,}
	/**Historie písemnosti.*/
	const enum GSslspemFilter {
		/**ixp_vyriz_eklep*/
		pid_eklep,
		/**pid_eklep_material*/
		ixb,
		/**aktZnacka*/
		ixs_ulo,
		/**aktZnacka*/
		por_cislo,
		/**ser_cislo*/
		ser_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Eklep\Dto\GSslspepPredplneniEklepPrilohyDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**DBTABLE:sslspep
	*      sslspep
	*/
	interface GSslspepPredplneniEklepPrilohyDto {
		ixs_ekp?: string|null;
		/**Elektronický soubor/obsah*/
		ixb?: string|null;
		ser_cislo?: number|null;
		file_name?: string|null;
		typ_pril?: Gordic.Ginis.DbModel.GSslcekpEnum|null;
		/**Změněno*/
		dat_zmena?: JsonDate|null;
		/**Změnil*/
		zmenu_prov?: string|null;
		/**Typ přílohy.*/
		TypPrilohy?: Gordic.Ginis.DbModel.GSslcekpDto|null;
		/**Příloha.*/
		PrilohaElektronicka?: Gordic.Wfl.Interface.GPrilohaElektronickaDto|null;
	}
	const enum GSslspepPredplneniEklepPrilohyDtoNames { ixs_ekp = "ixs_ekp", ixb = "ixb", ser_cislo = "ser_cislo", file_name = "file_name", typ_pril = "typ_pril", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", TypPrilohy = "TypPrilohy", PrilohaElektronicka = "PrilohaElektronicka",}
	const enum GSslspepPredplneniEklepPrilohyDtoFragments { ixs_ekp = "*", ixb = "*", ser_cislo = "*", file_name = "*", typ_pril = "*", dat_zmena = "*", zmenu_prov = "*", TypPrilohy = "*", PrilohaElektronicka = "*",}
	const enum GSslspepPredplneniEklepPrilohyDtoTypes { ixs_ekp = "string", ixb = "string", ser_cislo = "number", file_name = "string", typ_pril = "Gordic.Ginis.DbModel.GSslcekpEnum", dat_zmena = "JsonDate", zmenu_prov = "string", TypPrilohy = "Gordic.Ginis.DbModel.GSslcekpDto", PrilohaElektronicka = "Gordic.Wfl.Interface.GPrilohaElektronickaDto",}
	const enum GSslspepPredplneniEklepPrilohyDtoTypeLengths { ixs_ekp = 12, ixb = 12, file_name = 254, typ_pril = 3, zmenu_prov = 12,}
	/**Historie písemnosti.*/
	const enum GSslspepFilter {
		/**ixs_ekp*/
		ixs_ekp,
		/**pid_eklep_material*/
		ixb,
		/**aktZnacka*/
		ixs_ulo,
		/**aktZnacka*/
		por_cislo,
		/**ser_cislo*/
		ser_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\DokumentObrazekNaDetailu.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Výčtový typ pro obrázky na detailu dokumentu
	*     Kopie z Ssl.Client.DetailPisemnostiImageEnum.
	*/
	const enum DokumentObrazekNaDetailu {
		/**stornovaná písemnost*/
		StornovanaPisemnost=5,
		/**vlastní písemnost*/
		VlastniPisemnost=6,
		/**cizí písemnost*/
		CiziPisemnost=7,
		/**písemnost ve spisu*/
		PisemnostVeSpisu=9,
		/**agendová písemnost*/
		AgendovaPisemnost=17,
		/**ztracená písemnost*/
		ZtracenaPisemnost=18,
		/**vyřízená písemnost*/
		VyrizenaPisemnost=21,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\IGDokument.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGDokument
	* @domain DRMS
	* @businessObject Dokument
	*/
	interface Dokument {
		/**Vrátí data dokumentu.*/
		read(rq?:Gordic.Ssl.Interface.GDokumentReadRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentReadRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GDokumentDto>>;
		/**Vrátí seznam dokumentů dle zadaných kritérií.*/
		list(rq?:Gordic.Ssl.Interface.GDokumentFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GDokumentDto>>;
		/**Vrátí seznam dokumentů dle zadaných kritérií.
		*     !!! NEKONTROLUJE OPRÁVNĚNÍ !!!
		*/
		listBezKontrolyOpravneni(rq?:Gordic.Ssl.Interface.GDokumentFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GDokumentDto>>;
		/**Vytvoří nový dokument.*/
		create(rq?:Gordic.Ssl.Interface.GDokumentCreateRequestDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GDokumentCreateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GDokumentCreateRequestDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GDokumentDto>>;
		/**Aktualizuje dokument.*/
		update(rq?:Gordic.Ssl.Interface.GDokumentUpdateRequestDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GDokumentUpdateRequestDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GDokumentUpdateRequestDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GDokumentDto>>;
		/**Vymaže dokument.*/
		delete(rq?:Gordic.Ssl.Interface.GDokumentDeleteRequestDto|CallParams<GServiceSaveRequest<Gordic.Ssl.Interface.GDokumentDeleteRequestDto>>): _Task<GServiceSaveRequest<Gordic.Ssl.Interface.GDokumentDeleteRequestDto>,GServiceSaveResponse<Gordic.Ssl.Interface.GDokumentDeleteResponseDto>>;
		/**Vrátí parametry pro políčka gridu.*/
		getColumnParams(rq?:Gordic.Ssl.Interface.GDokumentGetColumnParamsRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentGetColumnParamsRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentGetColumnParamsRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GDokumentGetColumnParamsResponseDto>>;
		/**Vrátí parametry pro custoizovatelsný seznam dokumentů.*/
		getCustomListParamsCustomList(rq?:Gordic.Ssl.Interface.GDokumentGetCustomListParamsRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentGetCustomListParamsRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentGetCustomListParamsRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GDokumentGetCustomListParamsResponseDto>>;
		/**Předplnění mailu dle záznamu v tabulce wfldtom*/
		predplnitMail(rq?:Gordic.Wfl.Interface.GWFLPredplnitMailRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GWFLPredplnitMailRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GWFLPredplnitMailRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GWFLPredplnitMailResponseDto>>;
		/**Vrátí počet dokumentů dle zadaných kritérií.*/
		count(rq?:Gordic.Ssl.Interface.GDokumentFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Wfl.Interface.GCountDto>>;
		/**Vrátí počet dokumentů dle zadaných kritérií.
		*     !!! NEKONTROLUJE OPRÁVNĚNÍ !!!
		*/
		countBezKontrolyOpravneni(rq?:Gordic.Ssl.Interface.GDokumentFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Wfl.Interface.GCountDto>>;
		/**Vrátí dokument s přednastavenými výchozími hodnotami.*/
		getDefaultValues(rq?:Gordic.Ssl.Interface.GDokumentGetDefaultValuesRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentGetDefaultValuesRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GDokumentGetDefaultValuesRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GDokumentDto>>;
		/**Gets the lze editovat spousteci udalost a popis.*/
		getLzeEditovatSpousteciUdalostAPopis(rq?:Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisResponseDto>>;
		/**Gets the vlastnosti uzivatelske sloupce.*/
		getVlastnostiUzivatelskeSloupce(rq?:Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceResponseDto>>;
		/**Vrátí seznam prehled redistribuce*/
		seznamPrehledRedistribuceDokumentu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.DokSpisListDto>>;
		/**Vrátí dostupné formuláře pro typ dokumentu.*/
		seznamDostupnychFormularuDokumentu(rq?:Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto>,GServiceListResponse<Gordic.Wfl.Interface.GSslvfrmDto>>;
		/**Vrátí formuláře přiřazené konkrétnímu dokumentu.*/
		seznamFormularuKDokumentu(rq?:Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto>,GServiceListResponse<Gordic.Wfl.Interface.GSslvfrpDto>>;
		/**Přidá formuláře k dokumentu.*/
		pridejFormulareKDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GPridejFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GPridejFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GPridejFormulareKDokumentuResponseDto>>;
		/**Odstraní (konkrétní) formuláře z dokumentu (ostatní ponechá).*/
		odeberFormulareZDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuResponseDto>>;
		/**Odebere stávající formuláře z dokumentu a přiřadí k němu nové.*/
		nastavFormulareKDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GNastavFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GNastavFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GNastavFormulareKDokumentuResponseDto>>;
		/**Předá dokument.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predat(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatResponseDto>>;
		/**Předá dokument dle SSL.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatSsl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSslRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSslRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatSslResponseDto>>;
		/**Předá dokumenty hromadně.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatHromadneResponseDto>>;
		/**Převezme dokumenty.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitResponseDto>>;
		/**Převezme dokumenty hromadně.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitHromadneResponseDto>>;
		/**Převezme dokumenty hromadně dle Wfl.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitHromadneWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflResponseDto>>;
		/**Převezme dokumenty hromadně dle redistribuce.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitVRedistribuciHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneResponseDto>>;
		/**Předá dokumenty hromadně dle Wfl.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatHromadneWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatHromadneWflResponseDto>>;
		/**Přidělí dokument.*/
		pridelit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitResponseDto>>;
		/**Přidělí dokumenty hromadně.*/
		pridelitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitHromadneResponseDto>>;
		/**Hromadné přidělení dokumentu - žádost o schválení v EPK*/
		pridelitSchvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneResponseDto>>;
		/**Hromadné předání dokumentů - žádost o předání v EPK*/
		predatSchvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneResponseDto>>;
		/**Stop redistribuce dokumentu.*/
		stopRedistribuce(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStopRedistribuceResponseDto>>;
		/**Stop redistribuce dokumentů hromadně.*/
		stopRedistribuceHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneResponseDto>>;
		/**Zastaví redistribuci dokumentu.*/
		odmitnutiRedistribuce(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceResponseDto>>;
		/**Zastaví redistribuci dokumentů hromadně.*/
		odmitnutiRedistribuceHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneResponseDto>>;
		/**Hromadně schválí dokumenty.*/
		schvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitHromadneResponseDto>>;
		/**Hromadně zruší schválení dokumentů.*/
		zrusitSchvaleniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneResponseDto>>;
		/**Přidá změnu do historie dokumentu.*/
		pridatZmenuDoHistorie(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieResponseDto>>;
		/**Přidělí dokument do wfl.*/
		pridelitDoWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflResponseDto>>;
		/**Hromadně přidělí dokumenty do WFL.*/
		pridelitDoWflHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneResponseDto>>;
		/**Hromadně přidělí dokumenty do WFL přes temp.*/
		pridelitDoWflPresTempHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneResponseDto>>;
		/**Hromadně převezme dokumenty do WFL přes temp.*/
		prevzitDoWflPresTempHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneResponseDto>>;
		/**Hromadně přidá žádost o podpis dokumentů.*/
		pridatZadostOPodpisHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneResponseDto>>;
		/**Zneplatnění žádosti o podpis do podpisové knihy*/
		zneplatnitZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisResponseDto>>;
		/**Změna priority žádosti o podpis.*/
		zmenitPriorituZadostiOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisResponseDto>>;
		/**Odstranění žádosti o podpis.*/
		odstranitZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisResponseDto>>;
		/**Odstranění nepovinných a nepovinně volitelných žádosti o podpis, které nemají vyplněnou osobu.*/
		odstranitZadostOPodpisNepovinne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneResponseDto>>;
		/**Odstranění požadavku schvalovacího procesu.*/
		schvalovaciProcesOdstranitPozadavek(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekResponseDto>>;
		/**Vložení žádosti (připravené akt=600) o podpis do podpisové knihy.*/
		vlozZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy.*/
		pridatZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisResponseDto>>;
		/**Vloží žádost o podpis do podpisové knihy.*/
		schvalovaciProcesVlozPredpisDoEpk(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkResponseDto>>;
		/**Datum posunuté o X pracovních dní.*/
		datumPosunutyDlePracDni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy.*/
		schvalovaciProcesPripravUkon(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonResponseDto>>;
		/**Vytvoření předpisu EPK (více úkonů pro EPK) do stavu přípravy, následuje obvykle vyplnění osob a vložení do EPK.*/
		schvalovaciProcesPripravPredpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy, předplnění dle wfltepk.*/
		schvalovaciProcesPredpisPredpln(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnResponseDto>>;
		/**Editace žádosti/úkonu schval. předpisu.*/
		schvalovaciProcesEditaceUkonu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuResponseDto>>;
		/**Vyřízení žádosti o podpis.*/
		vyridZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisResponseDto>>;
		/**Test vyřízení žádosti o podpis.*/
		vyridZadostOPodpisTest(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisResponseDto>>;
		/**Schválení a vyřízení dokumentu (pouze ve vrstvě wfl).*/
		schvalitDokumentAVyridZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisResponseDto>>;
		/**Schválení dokumentu (pouze ve vrstvě wfl).*/
		schvalit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitResponseDto>>;
		/**Zrušení schválení dokumentu (pouze ve vrstvě wfl).*/
		odschvalit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdschvalitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdschvalitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdschvalitResponseDto>>;
		/**Stornování dokumentu.*/
		stornovat(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStornovatResponseDto>>;
		/**Zrušení storna dokumentu.*/
		zrusitStorno(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitStornoResponseDto>>;
		/**Hromadné zrušení storna dokumentů.*/
		zrusitStornoHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneResponseDto>>;
		/**Oprava editovatelných položek WFL profilu dokumentu.*/
		oprava(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOpravitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOpravitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOpravitResponseDto>>;
		/**Nastavení wfl příznaků fyzické a elektronické podoby dokumentu*/
		nastavWflPriznakySFyzSEle(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleResponseDto>>;
		/**Úprava věci dokumentu.*/
		updateVecWflspid(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidResponseDto>>;
		/**Úprava poznámky dokumentu.*/
		updatePoznamkaWfldpzn(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznResponseDto>>;
		/**Vrátí pro dannou písemnost a spis pořadové číslo písemnosti v spisu. Nepatří-li písemnost do spisu, vrací GInt32.Null*/
		poradoveCisloVSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuResponseDto>>;
		/**Vrátí identifikátor posledně vloženého dokumentu do spisu.*/
		posledniVlozenyDokument(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentResponseDto>>;
		/**Vytvoří spis pro interface.*/
		vytvoritSpisProInterface(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceResponseDto>>;
		/**Vytvoreni typového spisu.*/
		vytvoritTypovySpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisResponseDto>>;
		/**Vytvoreni spisu.*/
		vytvoritSpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisResponseDto>>;
		/**Vytvoreni spisu bez iniciační písemnosti.*/
		vytvoritSpisBezIniciacniPisemnosti(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDto>>;
		/**Zrušení vyřízení dokumentu.*/
		zruseniVyrizeni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniResponseDto>>;
		/**Předání do externí agendy která není IS.*/
		predaniDoExterniAgendy(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyResponseDto>>;
		/**Převzetí z externí agendy která není IS.*/
		prevzitZExterniAgendy(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyResponseDto>>;
		/**Informovat externí agendu / systém o existenci dokumentu / spisu.*/
		informovatExterniAgendu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduResponseDto>>;
		/**Stornování dokumentu.*/
		stornovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentStornovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentStornovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentStornovaniResponseDto>>;
		/**Ztracení dokumentu.*/
		ztraceni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZtraceniResponseDto>>;
		/**Znovupodání dokumentu.*/
		znovupodani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZnovupodaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZnovupodaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZnovupodaniResponseDto>>;
		/**Nabytí právní moci.*/
		nabytiPravniMoci(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNabytiPravniMociRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNabytiPravniMociRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNabytiPravniMociResponseDto>>;
		/**Nalezení dokumentu.*/
		nalezeni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNalezeniResponseDto>>;
		/**Přerušení (pozastavení) vyřizování dokumentu.*/
		prerusitVyrizovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniResponseDto>>;
		/**Přerušení (pozastavení) vyřizování dokumentu hromadně.*/
		prerusitVyrizovaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneResponseDto>>;
		/**Obnovení vyřizování dokumentu.*/
		obnovitVyrizovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniResponseDto>>;
		/**Obnovení vyřizování dokumentu hromadně.*/
		obnovitVyrizovaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneResponseDto>>;
		/**Nalezení dokumentu hromadně.*/
		nalezeniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNalezeniHromadneResponseDto>>;
		/**Zrušení vyřízení dokumentů hromadně.*/
		zruseniVyrizeniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneResponseDto>>;
		/**Ztracení dokumentů hromadně.*/
		ztraceniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZtraceniHromadneResponseDto>>;
		/**Editaci nebo přidání dílčího termínu hromadně.*/
		editaceDilcihoTerminuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneResponseDto>>;
		/**Přidá uživatelskou poznámku hromadně.*/
		pridaniUzivatelskePoznamkyHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneResponseDto>>;
		/**Nová kopie dokumentu.*/
		novaKopie(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopieRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopieRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopieResponseDto>>;
		/**Přiřazení dokumentu ke spisu.*/
		priraditKeSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuResponseDto>>;
		/**Zrušení / odebrání přiřazení dokumentu ke spisu.*/
		priraditKeSpisuZrusit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitResponseDto>>;
		/**Vyřízení dokumentu.*/
		vyridit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyriditResponseDto>>;
		/**Vyřízení dokumentu.*/
		vyriditVlozeneVeSpisuProStarouMetodiku(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDto>>;
		/**Rozšíří profil dokumentu do SSL.*/
		rozsirProfilWflPisemnostiDoSsl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslResponseDto>>;
		/**Vytvoření externího subjektu, podání dokumentu, vytvoření ČJ, vytvoření spisu, odeslání.*/
		esuCjOdes(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEsuCjOdesRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEsuCjOdesRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEsuCjOdesResponseDto>>;
		/**Vytvoření vlastních dokumentů a vložení do spisů hromadně.*/
		vytvorDokumentAVlozDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDto>>;
		/**Nalezení dokumentů posledně vložených do spisů.*/
		najdiDokPoslVlozDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDto>>;
		/**Hromadná změna spisového znaku.*/
		zmenaSpisovehoZnakuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneResponseDto>>;
		/**Hromadná změna IRP.*/
		zmenaIRPHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneResponseDto>>;
		/**Hromadná změna věci.*/
		zmenaVeciHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneResponseDto>>;
		/**Hromadná změna hodnoty vlastnosti.*/
		zmenaHodnotyVlastnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneResponseDto>>;
		/**Hromadné přidání vlastnosti.*/
		pridaniVlastnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneResponseDto>>;
		/**Hromadná změna přístupu k dokumentu.*/
		zmenaPristupuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneResponseDto>>;
		/**Hromadné nastavení první přílohy jako el. obraz (pokud ještě dokument el. obraz nemá).*/
		nastavitPrvniElPrilohuJakoObrazHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDto>>;
		/**Hromadně vytvoří duplikáty z šablony ixpSablony a vloží je do seznamu spisů.*/
		vytvoritDuplikatAVlozitDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDto>>;
		/**Hromadné odstranění žádosti EPK.*/
		zruseniZadostiEpkHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneResponseDto>>;
		/**Hromadná změna typu dokumentu*/
		zmenaTypuPisemnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneResponseDto>>;
		/**Hromadná změna přístupu k dokumentu.*/
		zmenaPristupuRPHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneResponseDto>>;
		/**Hromadné odeslání dokumentů na odesílatele (pro vlastní se dohledá odesílatel ze spisu ve kterém mohou být vloženy).*/
		odeslaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneResponseDto>>;
		/**Hromadné vyřízení dokumentů.*/
		vyrizeniPisemnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneResponseDto>>;
		/**Hromadná evidence dokumentů do ssl.*/
		evidenceDoSslHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneResponseDto>>;
		/**Změna přístupu dokumentu.*/
		zmenaPristupu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuResponseDto>>;
		/**Vytvoření nové kopie dokumentu s předáním.*/
		novaKopiePisemnostiSPredanim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimResponseDto>>;
		/**Vytvoření nové kopie dokumentu s přidělením.*/
		novaKopiePisemnostiSPridelenim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimResponseDto>>;
		/**Vytvoření nové kopie písemnosti s založením ČJ a předáním.*/
		novaKopiePisemnostiSZalozenimCjAPredanim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDto>>;
		/**Vytvoření nové kopie písemnosti s založením ČJ a přidělením.*/
		novaKopiePisemnostiSZalozenimCjAPridelenim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDto>>;
		/**Zaevidování emailu dle identifikátoru.*/
		emailGetFirstHash256(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256RequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256RequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256ResponseDto>>;
		/**Kontrola typu a velikosti souboru.*/
		kontrolaTypuAVelikostiSouboru(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruResponseDto>>;
		/**Zaevidování souboru s možností vytěžení dat z wordu a možností přidání el. obrazu*/
		evidujDokument(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidujDokumentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidujDokumentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEvidujDokumentResponseDto>>;
		/**Přidání el. přílohy k dokumentu.*/
		appendAttachment(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentAppendAttachmentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentAppendAttachmentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentAppendAttachmentResponseDto>>;
		/**Hromadně stornuje dokumenty.*/
		stornovatHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStornovatHromadneResponseDto>>;
		/**Získá lidský název daného dokumentu*/
		getEntityName(rq?:Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GDokumentGetEntityNameResponsetDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Dokument: ServiceBase & Catalog.Dokument;
	}
	const Dokument: Client["Dokument"];
}
declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro načtení informací o dokumentu (IGDokument.Read).*/
	interface GDokumentReadRequestDto extends Gordic.Ssl.Interface.GSslspidReadRequestDto {
	}
	const enum GDokumentReadRequestDtoNames { Ixp = "Ixp",}
	const enum GDokumentReadRequestDtoFragments { Ixp = "*",}
	const enum GDokumentReadRequestDtoTypes { Ixp = "string",}
	const enum GDokumentReadRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení parametrů (IGDokument.GetCustomListParams).*/
	interface GDokumentGetCustomListParamsRequestDto extends Gordic.Ssl.Interface.GSslspidGetCustomListParamsRequestDto {
	}
	const enum GDokumentGetCustomListParamsRequestDtoNames { VlastnostiUzivatelskeSloupceIxxs = "VlastnostiUzivatelskeSloupceIxxs",}
	const enum GDokumentGetCustomListParamsRequestDtoFragments { VlastnostiUzivatelskeSloupceIxxs = "*",}
	const enum GDokumentGetCustomListParamsRequestDtoTypes { VlastnostiUzivatelskeSloupceIxxs = "string",}
	const enum GDokumentGetCustomListParamsRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení parametrů (IGDokument.GetCustomListParams).*/
	interface GDokumentGetCustomListParamsResponseDto extends Gordic.Ssl.Interface.GSslspidGetCustomListParamsResponseDto {
	}
	const enum GDokumentGetCustomListParamsResponseDtoNames { ssl_rem_dokd = "ssl_rem_dokd", ssl_hled_zvecp = "ssl_hled_zvecp", IxsSu = "IxsSu", LicAdr = "LicAdr", DebugMode = "DebugMode", IsStaraMetodikaSsl = "IsStaraMetodikaSsl", ssl_term_pouz = "ssl_term_pouz", wfl_typspisy = "wfl_typspisy", gin_rad_konao = "gin_rad_konao", ssl_rad_makspis = "ssl_rad_makspis", existLicCertFormulare = "existLicCertFormulare", StavUkonuEpkVisible = "StavUkonuEpkVisible", IxsFun = "IxsFun", DokumentAktZnackaLabel = "DokumentAktZnackaLabel", SpisAktZnackaLabel = "SpisAktZnackaLabel", ssl_sez_pozn = "ssl_sez_pozn", ssl_uziv_sl_an = "ssl_uziv_sl_an", ssl_uziv_sla2n = "ssl_uziv_sla2n", ssl_uziv_sla3n = "ssl_uziv_sla3n", ssl_uziv_sl_bn = "ssl_uziv_sl_bn", ssl_uziv_slb2n = "ssl_uziv_slb2n", ssl_uziv_slb3n = "ssl_uziv_slb3n", gin_ele_dmspres = "gin_ele_dmspres", IsPovolenePouzitiVlastnosti = "IsPovolenePouzitiVlastnosti", VlastnostiUzivatelskeSloupce = "VlastnostiUzivatelskeSloupce",}
	const enum GDokumentGetCustomListParamsResponseDtoFragments { ssl_rem_dokd = "*", ssl_hled_zvecp = "*", IxsSu = "*", LicAdr = "*", DebugMode = "*", IsStaraMetodikaSsl = "*", ssl_term_pouz = "*", wfl_typspisy = "*", gin_rad_konao = "*", ssl_rad_makspis = "*", existLicCertFormulare = "*", StavUkonuEpkVisible = "*", IxsFun = "*", DokumentAktZnackaLabel = "*", SpisAktZnackaLabel = "*", ssl_sez_pozn = "*", ssl_uziv_sl_an = "*", ssl_uziv_sla2n = "*", ssl_uziv_sla3n = "*", ssl_uziv_sl_bn = "*", ssl_uziv_slb2n = "*", ssl_uziv_slb3n = "*", gin_ele_dmspres = "*", IsPovolenePouzitiVlastnosti = "*", VlastnostiUzivatelskeSloupce = "*",}
	const enum GDokumentGetCustomListParamsResponseDtoTypes { ssl_rem_dokd = "number", ssl_hled_zvecp = "number", IxsSu = "string", LicAdr = "string", DebugMode = "boolean", IsStaraMetodikaSsl = "boolean", ssl_term_pouz = "number", wfl_typspisy = "number", gin_rad_konao = "number", ssl_rad_makspis = "number", existLicCertFormulare = "boolean", StavUkonuEpkVisible = "boolean", IxsFun = "string", DokumentAktZnackaLabel = "string", SpisAktZnackaLabel = "string", ssl_sez_pozn = "number", ssl_uziv_sl_an = "string", ssl_uziv_sla2n = "string", ssl_uziv_sla3n = "string", ssl_uziv_sl_bn = "string", ssl_uziv_slb2n = "string", ssl_uziv_slb3n = "string", gin_ele_dmspres = "number", IsPovolenePouzitiVlastnosti = "boolean", VlastnostiUzivatelskeSloupce = "Gordic.Wfl.Interface.UzivSloupceSeznamuDto[]",}
	const enum GDokumentGetCustomListParamsResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení parametrů (IGDokument.GetCustomListParams).*/
	interface GDokumentGetColumnParamsRequestDto extends Gordic.Ssl.Interface.GSslspidGetColumnParamsRequestDto {
	}
	const enum GDokumentGetColumnParamsRequestDtoNames { VlastnostiUzivatelskeSloupceIxxs = "VlastnostiUzivatelskeSloupceIxxs",}
	const enum GDokumentGetColumnParamsRequestDtoFragments { VlastnostiUzivatelskeSloupceIxxs = "*",}
	const enum GDokumentGetColumnParamsRequestDtoTypes { VlastnostiUzivatelskeSloupceIxxs = "string",}
	const enum GDokumentGetColumnParamsRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení parametrů (IGDokument.GetColumnParams).*/
	interface GDokumentGetColumnParamsResponseDto extends Gordic.Ssl.Interface.GSslspidGetColumnParamsResponseDto {
	}
	const enum GDokumentGetColumnParamsResponseDtoNames { IsStaraMetodikaSsl = "IsStaraMetodikaSsl", ssl_term_pouz = "ssl_term_pouz", wfl_typspisy = "wfl_typspisy", gin_rad_konao = "gin_rad_konao", ssl_rad_makspis = "ssl_rad_makspis", existLicCertFormulare = "existLicCertFormulare", StavUkonuEpkVisible = "StavUkonuEpkVisible", IxsFun = "IxsFun", DokumentAktZnackaLabel = "DokumentAktZnackaLabel", SpisAktZnackaLabel = "SpisAktZnackaLabel", ssl_sez_pozn = "ssl_sez_pozn", ssl_uziv_sl_an = "ssl_uziv_sl_an", ssl_uziv_sla2n = "ssl_uziv_sla2n", ssl_uziv_sla3n = "ssl_uziv_sla3n", ssl_uziv_sl_bn = "ssl_uziv_sl_bn", ssl_uziv_slb2n = "ssl_uziv_slb2n", ssl_uziv_slb3n = "ssl_uziv_slb3n", gin_ele_dmspres = "gin_ele_dmspres", IsPovolenePouzitiVlastnosti = "IsPovolenePouzitiVlastnosti", VlastnostiUzivatelskeSloupce = "VlastnostiUzivatelskeSloupce",}
	const enum GDokumentGetColumnParamsResponseDtoFragments { IsStaraMetodikaSsl = "*", ssl_term_pouz = "*", wfl_typspisy = "*", gin_rad_konao = "*", ssl_rad_makspis = "*", existLicCertFormulare = "*", StavUkonuEpkVisible = "*", IxsFun = "*", DokumentAktZnackaLabel = "*", SpisAktZnackaLabel = "*", ssl_sez_pozn = "*", ssl_uziv_sl_an = "*", ssl_uziv_sla2n = "*", ssl_uziv_sla3n = "*", ssl_uziv_sl_bn = "*", ssl_uziv_slb2n = "*", ssl_uziv_slb3n = "*", gin_ele_dmspres = "*", IsPovolenePouzitiVlastnosti = "*", VlastnostiUzivatelskeSloupce = "*",}
	const enum GDokumentGetColumnParamsResponseDtoTypes { IsStaraMetodikaSsl = "boolean", ssl_term_pouz = "number", wfl_typspisy = "number", gin_rad_konao = "number", ssl_rad_makspis = "number", existLicCertFormulare = "boolean", StavUkonuEpkVisible = "boolean", IxsFun = "string", DokumentAktZnackaLabel = "string", SpisAktZnackaLabel = "string", ssl_sez_pozn = "number", ssl_uziv_sl_an = "string", ssl_uziv_sla2n = "string", ssl_uziv_sla3n = "string", ssl_uziv_sl_bn = "string", ssl_uziv_slb2n = "string", ssl_uziv_slb3n = "string", gin_ele_dmspres = "number", IsPovolenePouzitiVlastnosti = "boolean", VlastnostiUzivatelskeSloupce = "Gordic.Wfl.Interface.UzivSloupceSeznamuDto[]",}
	const enum GDokumentGetColumnParamsResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení výchozích hodnot dokumentu (IGDokument.GetDefaultValues).*/
	interface GDokumentGetDefaultValuesRequestDto extends Gordic.Ssl.Interface.GSslspidGetDefaultValuesRequestDto {
	}
	const enum GDokumentGetDefaultValuesRequestDtoNames {}
	const enum GDokumentGetDefaultValuesRequestDtoFragments {}
	const enum GDokumentGetDefaultValuesRequestDtoTypes {}
	const enum GDokumentGetDefaultValuesRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\IGSpis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGSpis
	* @domain DRMS
	* @businessObject Spis
	*/
	interface Spis {
		/**Vrátí data spisu.*/
		read(rq?:Gordic.Ssl.Interface.GSpisReadRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSpisReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSpisReadRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSpisDto>>;
		/**Vrátí seznam spisů dle zadaných kritérií.*/
		list(rq?:Gordic.Ssl.Interface.GSpisFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSpisDto>>;
		/**Vrátí seznam dokumentů dle zadaných kritérií.
		*     !!! NEKONTROLUJE OPRÁVNĚNÍ !!!
		*/
		listBezKontrolyOpravneni(rq?:Gordic.Ssl.Interface.GSpisFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSpisDto>>;
		/**Vrátí parametry pro políčka gridu.*/
		getColumnParams(rq?:Gordic.Ssl.Interface.GSpisGetColumnParamsRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSpisGetColumnParamsRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSpisGetColumnParamsRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSpisGetColumnParamsResponseDto>>;
		/**Vrátí parametry pro custoizovatelsný seznam dokumentů.*/
		getCustomListParamsCustomList(rq?:Gordic.Ssl.Interface.GSpisGetCustomListParamsRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSpisGetCustomListParamsRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSpisGetCustomListParamsRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSpisGetCustomListParamsResponseDto>>;
		/**Vrátí počet spisů dle zadaných kritérií.*/
		count(rq?:Gordic.Ssl.Interface.GSpisFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Wfl.Interface.GCountDto>>;
		/**Vrátí počet spisů dle zadaných kritérií.
		*     !!! NEKONTROLUJE OPRÁVNĚNÍ !!!
		*/
		countBezKontrolyOpravneni(rq?:Gordic.Ssl.Interface.GSpisFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Wfl.Interface.GCountDto>>;
		/**Načte identifikátor spisu pro danné číslo jednací.*/
		getIxpFromCj(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisGetIxpFromCjRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisGetIxpFromCjRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisGetIxpFromCjResponseDto>>;
		/**Obnoví záznam kl_slova v spisu podle aktuálně navázaných klíčových slov spisu.*/
		obnovPrehledKlicovychSlovSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisObnovPrehledKlicovychSlovSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisObnovPrehledKlicovychSlovSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisObnovPrehledKlicovychSlovSpisuResponseDto>>;
		/**Vložení dokumentu do spisu.*/
		vlozitDokumentDoSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVlozitDokumentDoSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVlozitDokumentDoSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVlozitDokumentDoSpisuResponseDto>>;
		/**Vložení součásti či dílu do typového spisu či součásti.*/
		vlozitSoucastDoSoucasti(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVlozitSoucastDoSoucastiRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVlozitSoucastDoSoucastiRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVlozitSoucastDoSoucastiResponseDto>>;
		/**Vložení dokumentů do spisu hromadně.*/
		vlozeniDokumentuDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVlozeniDokumentuDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVlozeniDokumentuDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVlozeniDokumentuDoSpisuHromadneResponseDto>>;
		/**Vložení vyjmutí dokumentů ze spisů hromadně.*/
		vyjmutiDokumentuZeSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyjmutiDokumentuZeSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyjmutiDokumentuZeSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVyjmutiDokumentuZeSpisuHromadneResponseDto>>;
		/**Hromadné uzavření spisů.*/
		uzavreniSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisUzavreniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisUzavreniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisUzavreniSpisuHromadneResponseDto>>;
		/**Vytvoří obraz spisu sloučením obrazů jednotlivých dokumentů ze sběrného archu.*/
		vytvoritObrazSpisuZObrazuDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVytvoritObrazSpisuZObrazuDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVytvoritObrazSpisuZObrazuDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVytvoritObrazSpisuZObrazuDokumentuResponseDto>>;
		/**Vytvoří spis bez iniciační písemnosti.*/
		vytvoritSpisBezIniciacniPisemnosti(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVytvoritSpisBezIniciacniPisemnostiResponseDto>>;
		/**Odstranění písemnosti ze spisu.*/
		odebratPisemnostZeSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdebratPisemnostZeSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdebratPisemnostZeSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisOdebratPisemnostZeSpisuResponseDto>>;
		/**Odstranění součásti ze součásti.*/
		odebratSoucastZeSoucasti(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdebratSoucastZeSoucastiRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdebratSoucastZeSoucastiRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisOdebratSoucastZeSoucastiResponseDto>>;
		/**Odstranění posledního otevřeného dílu v součásti.*/
		odstranitDil(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdstranitDilRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdstranitDilRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisOdstranitDilResponseDto>>;
		/**Priorování spisu do.*/
		priorivatSpisDo(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPriorivatSpisDoRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPriorivatSpisDoRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisPriorivatSpisDoResponseDto>>;
		/**Hromadně priorovat spisy do.*/
		priorovatSpisyDoHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPriorovatSpisyDoHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPriorovatSpisyDoHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisPriorovatSpisyDoHromadneResponseDto>>;
		/**Zrušení vyřízení dokumentu.*/
		zruseniVyrizeniSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniVyrizeniSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniVyrizeniSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZruseniVyrizeniSpisuResponseDto>>;
		/**Odpriorování spisu.*/
		odPriorivatSpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdPriorivatSpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOdPriorivatSpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisOdPriorivatSpisResponseDto>>;
		/**Vyřízení spisu.*/
		vyriditSpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyriditSpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyriditSpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVyriditSpisResponseDto>>;
		/**Hromadné vyřízení spisů.*/
		vyrizeniSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyrizeniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyrizeniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVyrizeniSpisuHromadneResponseDto>>;
		/**Hromadné zrušení vyřízení spisů.*/
		zruseniVyrizeniSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniVyrizeniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniVyrizeniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZruseniVyrizeniSpisuHromadneResponseDto>>;
		/**Hromadné zrušení uzavření spisů.*/
		zruseniUzavreniSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniUzavreniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniUzavreniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZruseniUzavreniSpisuHromadneResponseDto>>;
		/**Hromadné vyřízení a uzavření spisů.*/
		vyrizeniAUzavreniSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyrizeniAUzavreniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisVyrizeniAUzavreniSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisVyrizeniAUzavreniSpisuHromadneResponseDto>>;
		/**Uzavření spisu.*/
		uzavritSpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisUzavritSpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisUzavritSpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisUzavritSpisResponseDto>>;
		/**Zrušení uzavření a vyřízení typového spisu, součásti a dílu.*/
		zruseniUzavreniAVyrizeniEntity(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniUzavreniAVyrizeniEntityRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZruseniUzavreniAVyrizeniEntityRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZruseniUzavreniAVyrizeniEntityResponseDto>>;
		/**Zrušení uzavření spisu.*/
		zrusitUzavreniSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZrusitUzavreniSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZrusitUzavreniSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZrusitUzavreniSpisuResponseDto>>;
		/**Nastavení vyřizující písemnosti.*/
		nastavVyrizujiciPisemnost(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisNastavVyrizujiciPisemnostRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisNastavVyrizujiciPisemnostRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisNastavVyrizujiciPisemnostResponseDto>>;
		/**Zrušení nastavení vyřizující písemnosti.*/
		zrusNastaveniVyrizujiciPisemnosti(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZrusNastaveniVyrizujiciPisemnostiRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZrusNastaveniVyrizujiciPisemnostiRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZrusNastaveniVyrizujiciPisemnostiResponseDto>>;
		/**Kontrola spisového plánu dle datumu vyřízení.*/
		kontrolaSpisPlanu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisKontrolaSpisPlanuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisKontrolaSpisPlanuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisKontrolaSpisPlanuResponseDto>>;
		/**Oprava profilu spisu.*/
		opravaProfiluSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOpravaProfiluSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOpravaProfiluSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisOpravaProfiluSpisuResponseDto>>;
		/**Oprava profilu spisu.*/
		opravaProfiluSpisuIUzav(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOpravaProfiluSpisuIUzavRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisOpravaProfiluSpisuIUzavRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisOpravaProfiluSpisuIUzavResponseDto>>;
		/**SeznamSbernyArchSpisu.*/
		seznamSbernyArchSpisu(rq?:Gordic.Ssl.Interface.SeznamSbernyArchSpisuRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.SeznamSbernyArchSpisuRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.SeznamSbernyArchSpisuRequestDto>,GServiceListResponse<Gordic.Ssl.Interface.SeznamSbernyArchSpisuDto>>;
		/**Provede posun dokumentu v sběrném archu nahoru.*/
		posunDokumentVSbernemArchuNahoru(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPosunDokumentVSbernemArchuNahoruRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPosunDokumentVSbernemArchuNahoruRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisPosunDokumentVSbernemArchuNahoruResponseDto>>;
		/**Provede posun dokumentu v sběrném archu dolu.*/
		posunDokumentVSbernemArchuDolu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPosunDokumentVSbernemArchuDoluRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPosunDokumentVSbernemArchuDoluRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisPosunDokumentVSbernemArchuDoluResponseDto>>;
		/**Ulozí poradí obsahu spisu.*/
		ulozPoradiVSbernemArchu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisUlozPoradiVSbernemArchuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisUlozPoradiVSbernemArchuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisUlozPoradiVSbernemArchuResponseDto>>;
		/**Provede hromadnou změnu zpracovatele.*/
		zmenaZpracovateleHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaZpracovateleHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaZpracovateleHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZmenaZpracovateleHromadneResponseDto>>;
		/**Provede hromadnou změnu schvalovatele.*/
		zmenaSchvalovateleHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaSchvalovateleHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaSchvalovateleHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZmenaSchvalovateleHromadneResponseDto>>;
		/**Provede hromadnou změnu externího čísla jednací.*/
		zmenaCjExtHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaCjExtHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaCjExtHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZmenaCjExtHromadneResponseDto>>;
		/**Provede hromadnou změnu (stringové) položky (např. poznámka).*/
		zmenaPolozkyHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaPolozkyHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaPolozkyHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZmenaPolozkyHromadneResponseDto>>;
		/**Provede hromadnou změnu položky v profilu doručení.*/
		zmenaPolozkyDoruceniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaPolozkyDoruceniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaPolozkyDoruceniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZmenaPolozkyDoruceniHromadneResponseDto>>;
		/**Provede hromadnou změnu položky v profilu doručení.*/
		zmenaUmisteniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaUmisteniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaUmisteniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZmenaUmisteniHromadneResponseDto>>;
		/**Provede hromadnou změnu typu.*/
		zmenaTypuDokumentuSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaTypuDokumentuSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisZmenaTypuDokumentuSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisZmenaTypuDokumentuSpisuHromadneResponseDto>>;
		/**Připravení tisku doručenek (uloží vybrané SXS do Wfltrpd).*/
		pripravTiskDorucenekDZDoWfltrpd(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPripravTiskDorucenekDZDoWfltrpdRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GSpisPripravTiskDorucenekDZDoWfltrpdRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GSpisPripravTiskDorucenekDZDoWfltrpdResponseDto>>;
		/**Vrátí spis s přednastavenými výchozími hodnotami.*/
		getDefaultValues(rq?:Gordic.Ssl.Interface.GSpisGetDefaultValuesRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSpisGetDefaultValuesRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSpisGetDefaultValuesRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSpisDto>>;
		/**Export spisu*/
		exportovatSpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GExportElDokumentuDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GExportElDokumentuDto>,throwExceptionNoPermission:boolean},GServiceReadResponse<Gordic.Ssl.Interface.GExportElDokumentuDto>>;
		/**Gets the lze editovat spousteci udalost a popis.*/
		getLzeEditovatSpousteciUdalostAPopis(rq?:Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisResponseDto>>;
		/**Gets the vlastnosti uzivatelske sloupce.*/
		getVlastnostiUzivatelskeSloupce(rq?:Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceResponseDto>>;
		/**Vrátí seznam prehled redistribuce*/
		seznamPrehledRedistribuceDokumentu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.DokSpisListDto>>;
		/**Vrátí dostupné formuláře pro typ dokumentu.*/
		seznamDostupnychFormularuDokumentu(rq?:Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto>,GServiceListResponse<Gordic.Wfl.Interface.GSslvfrmDto>>;
		/**Vrátí formuláře přiřazené konkrétnímu dokumentu.*/
		seznamFormularuKDokumentu(rq?:Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto>,GServiceListResponse<Gordic.Wfl.Interface.GSslvfrpDto>>;
		/**Přidá formuláře k dokumentu.*/
		pridejFormulareKDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GPridejFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GPridejFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GPridejFormulareKDokumentuResponseDto>>;
		/**Odstraní (konkrétní) formuláře z dokumentu (ostatní ponechá).*/
		odeberFormulareZDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuResponseDto>>;
		/**Odebere stávající formuláře z dokumentu a přiřadí k němu nové.*/
		nastavFormulareKDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GNastavFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GNastavFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GNastavFormulareKDokumentuResponseDto>>;
		/**Předá dokument.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predat(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatResponseDto>>;
		/**Předá dokument dle SSL.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatSsl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSslRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSslRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatSslResponseDto>>;
		/**Předá dokumenty hromadně.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatHromadneResponseDto>>;
		/**Převezme dokumenty.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitResponseDto>>;
		/**Převezme dokumenty hromadně.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitHromadneResponseDto>>;
		/**Převezme dokumenty hromadně dle Wfl.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitHromadneWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflResponseDto>>;
		/**Převezme dokumenty hromadně dle redistribuce.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitVRedistribuciHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneResponseDto>>;
		/**Předá dokumenty hromadně dle Wfl.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatHromadneWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatHromadneWflResponseDto>>;
		/**Přidělí dokument.*/
		pridelit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitResponseDto>>;
		/**Přidělí dokumenty hromadně.*/
		pridelitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitHromadneResponseDto>>;
		/**Hromadné přidělení dokumentu - žádost o schválení v EPK*/
		pridelitSchvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneResponseDto>>;
		/**Hromadné předání dokumentů - žádost o předání v EPK*/
		predatSchvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneResponseDto>>;
		/**Stop redistribuce dokumentu.*/
		stopRedistribuce(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStopRedistribuceResponseDto>>;
		/**Stop redistribuce dokumentů hromadně.*/
		stopRedistribuceHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneResponseDto>>;
		/**Zastaví redistribuci dokumentu.*/
		odmitnutiRedistribuce(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceResponseDto>>;
		/**Zastaví redistribuci dokumentů hromadně.*/
		odmitnutiRedistribuceHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneResponseDto>>;
		/**Hromadně schválí dokumenty.*/
		schvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitHromadneResponseDto>>;
		/**Hromadně zruší schválení dokumentů.*/
		zrusitSchvaleniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneResponseDto>>;
		/**Přidá změnu do historie dokumentu.*/
		pridatZmenuDoHistorie(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieResponseDto>>;
		/**Přidělí dokument do wfl.*/
		pridelitDoWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflResponseDto>>;
		/**Hromadně přidělí dokumenty do WFL.*/
		pridelitDoWflHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneResponseDto>>;
		/**Hromadně přidělí dokumenty do WFL přes temp.*/
		pridelitDoWflPresTempHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneResponseDto>>;
		/**Hromadně převezme dokumenty do WFL přes temp.*/
		prevzitDoWflPresTempHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneResponseDto>>;
		/**Hromadně přidá žádost o podpis dokumentů.*/
		pridatZadostOPodpisHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneResponseDto>>;
		/**Zneplatnění žádosti o podpis do podpisové knihy*/
		zneplatnitZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisResponseDto>>;
		/**Změna priority žádosti o podpis.*/
		zmenitPriorituZadostiOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisResponseDto>>;
		/**Odstranění žádosti o podpis.*/
		odstranitZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisResponseDto>>;
		/**Odstranění nepovinných a nepovinně volitelných žádosti o podpis, které nemají vyplněnou osobu.*/
		odstranitZadostOPodpisNepovinne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneResponseDto>>;
		/**Odstranění požadavku schvalovacího procesu.*/
		schvalovaciProcesOdstranitPozadavek(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekResponseDto>>;
		/**Vložení žádosti (připravené akt=600) o podpis do podpisové knihy.*/
		vlozZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy.*/
		pridatZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisResponseDto>>;
		/**Vloží žádost o podpis do podpisové knihy.*/
		schvalovaciProcesVlozPredpisDoEpk(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkResponseDto>>;
		/**Datum posunuté o X pracovních dní.*/
		datumPosunutyDlePracDni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy.*/
		schvalovaciProcesPripravUkon(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonResponseDto>>;
		/**Vytvoření předpisu EPK (více úkonů pro EPK) do stavu přípravy, následuje obvykle vyplnění osob a vložení do EPK.*/
		schvalovaciProcesPripravPredpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy, předplnění dle wfltepk.*/
		schvalovaciProcesPredpisPredpln(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnResponseDto>>;
		/**Editace žádosti/úkonu schval. předpisu.*/
		schvalovaciProcesEditaceUkonu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuResponseDto>>;
		/**Vyřízení žádosti o podpis.*/
		vyridZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisResponseDto>>;
		/**Test vyřízení žádosti o podpis.*/
		vyridZadostOPodpisTest(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisResponseDto>>;
		/**Schválení a vyřízení dokumentu (pouze ve vrstvě wfl).*/
		schvalitDokumentAVyridZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisResponseDto>>;
		/**Schválení dokumentu (pouze ve vrstvě wfl).*/
		schvalit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitResponseDto>>;
		/**Zrušení schválení dokumentu (pouze ve vrstvě wfl).*/
		odschvalit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdschvalitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdschvalitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdschvalitResponseDto>>;
		/**Stornování dokumentu.*/
		stornovat(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStornovatResponseDto>>;
		/**Zrušení storna dokumentu.*/
		zrusitStorno(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitStornoResponseDto>>;
		/**Hromadné zrušení storna dokumentů.*/
		zrusitStornoHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneResponseDto>>;
		/**Oprava editovatelných položek WFL profilu dokumentu.*/
		oprava(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOpravitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOpravitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOpravitResponseDto>>;
		/**Nastavení wfl příznaků fyzické a elektronické podoby dokumentu*/
		nastavWflPriznakySFyzSEle(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleResponseDto>>;
		/**Úprava věci dokumentu.*/
		updateVecWflspid(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidResponseDto>>;
		/**Úprava poznámky dokumentu.*/
		updatePoznamkaWfldpzn(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznResponseDto>>;
		/**Vrátí pro dannou písemnost a spis pořadové číslo písemnosti v spisu. Nepatří-li písemnost do spisu, vrací GInt32.Null*/
		poradoveCisloVSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuResponseDto>>;
		/**Vrátí identifikátor posledně vloženého dokumentu do spisu.*/
		posledniVlozenyDokument(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentResponseDto>>;
		/**Vytvoří spis pro interface.*/
		vytvoritSpisProInterface(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceResponseDto>>;
		/**Vytvoreni typového spisu.*/
		vytvoritTypovySpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisResponseDto>>;
		/**Vytvoreni spisu.*/
		vytvoritSpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisResponseDto>>;
		/**Vytvoreni spisu bez iniciační písemnosti.*/
		vytvoritSpisBezIniciacniPisemnosti(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDto>>;
		/**Zrušení vyřízení dokumentu.*/
		zruseniVyrizeni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniResponseDto>>;
		/**Předání do externí agendy která není IS.*/
		predaniDoExterniAgendy(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyResponseDto>>;
		/**Převzetí z externí agendy která není IS.*/
		prevzitZExterniAgendy(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyResponseDto>>;
		/**Informovat externí agendu / systém o existenci dokumentu / spisu.*/
		informovatExterniAgendu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduResponseDto>>;
		/**Stornování dokumentu.*/
		stornovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentStornovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentStornovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentStornovaniResponseDto>>;
		/**Ztracení dokumentu.*/
		ztraceni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZtraceniResponseDto>>;
		/**Znovupodání dokumentu.*/
		znovupodani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZnovupodaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZnovupodaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZnovupodaniResponseDto>>;
		/**Nabytí právní moci.*/
		nabytiPravniMoci(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNabytiPravniMociRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNabytiPravniMociRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNabytiPravniMociResponseDto>>;
		/**Nalezení dokumentu.*/
		nalezeni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNalezeniResponseDto>>;
		/**Přerušení (pozastavení) vyřizování dokumentu.*/
		prerusitVyrizovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniResponseDto>>;
		/**Přerušení (pozastavení) vyřizování dokumentu hromadně.*/
		prerusitVyrizovaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneResponseDto>>;
		/**Obnovení vyřizování dokumentu.*/
		obnovitVyrizovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniResponseDto>>;
		/**Obnovení vyřizování dokumentu hromadně.*/
		obnovitVyrizovaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneResponseDto>>;
		/**Nalezení dokumentu hromadně.*/
		nalezeniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNalezeniHromadneResponseDto>>;
		/**Zrušení vyřízení dokumentů hromadně.*/
		zruseniVyrizeniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneResponseDto>>;
		/**Ztracení dokumentů hromadně.*/
		ztraceniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZtraceniHromadneResponseDto>>;
		/**Editaci nebo přidání dílčího termínu hromadně.*/
		editaceDilcihoTerminuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneResponseDto>>;
		/**Přidá uživatelskou poznámku hromadně.*/
		pridaniUzivatelskePoznamkyHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneResponseDto>>;
		/**Nová kopie dokumentu.*/
		novaKopie(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopieRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopieRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopieResponseDto>>;
		/**Přiřazení dokumentu ke spisu.*/
		priraditKeSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuResponseDto>>;
		/**Zrušení / odebrání přiřazení dokumentu ke spisu.*/
		priraditKeSpisuZrusit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitResponseDto>>;
		/**Vyřízení dokumentu.*/
		vyridit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyriditResponseDto>>;
		/**Vyřízení dokumentu.*/
		vyriditVlozeneVeSpisuProStarouMetodiku(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDto>>;
		/**Rozšíří profil dokumentu do SSL.*/
		rozsirProfilWflPisemnostiDoSsl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslResponseDto>>;
		/**Vytvoření externího subjektu, podání dokumentu, vytvoření ČJ, vytvoření spisu, odeslání.*/
		esuCjOdes(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEsuCjOdesRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEsuCjOdesRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEsuCjOdesResponseDto>>;
		/**Vytvoření vlastních dokumentů a vložení do spisů hromadně.*/
		vytvorDokumentAVlozDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDto>>;
		/**Nalezení dokumentů posledně vložených do spisů.*/
		najdiDokPoslVlozDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDto>>;
		/**Hromadná změna spisového znaku.*/
		zmenaSpisovehoZnakuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneResponseDto>>;
		/**Hromadná změna IRP.*/
		zmenaIRPHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneResponseDto>>;
		/**Hromadná změna věci.*/
		zmenaVeciHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneResponseDto>>;
		/**Hromadná změna hodnoty vlastnosti.*/
		zmenaHodnotyVlastnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneResponseDto>>;
		/**Hromadné přidání vlastnosti.*/
		pridaniVlastnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneResponseDto>>;
		/**Hromadná změna přístupu k dokumentu.*/
		zmenaPristupuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneResponseDto>>;
		/**Hromadné nastavení první přílohy jako el. obraz (pokud ještě dokument el. obraz nemá).*/
		nastavitPrvniElPrilohuJakoObrazHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDto>>;
		/**Hromadně vytvoří duplikáty z šablony ixpSablony a vloží je do seznamu spisů.*/
		vytvoritDuplikatAVlozitDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDto>>;
		/**Hromadné odstranění žádosti EPK.*/
		zruseniZadostiEpkHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneResponseDto>>;
		/**Hromadná změna typu dokumentu*/
		zmenaTypuPisemnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneResponseDto>>;
		/**Hromadná změna přístupu k dokumentu.*/
		zmenaPristupuRPHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneResponseDto>>;
		/**Hromadné odeslání dokumentů na odesílatele (pro vlastní se dohledá odesílatel ze spisu ve kterém mohou být vloženy).*/
		odeslaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneResponseDto>>;
		/**Hromadné vyřízení dokumentů.*/
		vyrizeniPisemnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneResponseDto>>;
		/**Hromadná evidence dokumentů do ssl.*/
		evidenceDoSslHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneResponseDto>>;
		/**Změna přístupu dokumentu.*/
		zmenaPristupu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuResponseDto>>;
		/**Vytvoření nové kopie dokumentu s předáním.*/
		novaKopiePisemnostiSPredanim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimResponseDto>>;
		/**Vytvoření nové kopie dokumentu s přidělením.*/
		novaKopiePisemnostiSPridelenim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimResponseDto>>;
		/**Vytvoření nové kopie písemnosti s založením ČJ a předáním.*/
		novaKopiePisemnostiSZalozenimCjAPredanim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDto>>;
		/**Vytvoření nové kopie písemnosti s založením ČJ a přidělením.*/
		novaKopiePisemnostiSZalozenimCjAPridelenim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDto>>;
		/**Zaevidování emailu dle identifikátoru.*/
		emailGetFirstHash256(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256RequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256RequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256ResponseDto>>;
		/**Kontrola typu a velikosti souboru.*/
		kontrolaTypuAVelikostiSouboru(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruResponseDto>>;
		/**Zaevidování souboru s možností vytěžení dat z wordu a možností přidání el. obrazu*/
		evidujDokument(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidujDokumentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidujDokumentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEvidujDokumentResponseDto>>;
		/**Přidání el. přílohy k dokumentu.*/
		appendAttachment(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentAppendAttachmentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentAppendAttachmentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentAppendAttachmentResponseDto>>;
		/**Hromadně stornuje dokumenty.*/
		stornovatHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStornovatHromadneResponseDto>>;
		/**Vrátí dokument s přednastavenými výchozími hodnotami.*/
		getEntityName(rq?:Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GDokumentGetEntityNameResponsetDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Spis: ServiceBase & Catalog.Spis;
	}
	const Spis: Client["Spis"];
}
declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro načtení informací o spisu (IGSpis.Read).*/
	interface GSpisReadRequestDto extends Gordic.Ssl.Interface.GSslspidReadRequestDto {
	}
	const enum GSpisReadRequestDtoNames { Ixp = "Ixp",}
	const enum GSpisReadRequestDtoFragments { Ixp = "*",}
	const enum GSpisReadRequestDtoTypes { Ixp = "string",}
	const enum GSpisReadRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení parametrů (IGSpis.GetCustomListParams).*/
	interface GSpisGetCustomListParamsRequestDto extends Gordic.Ssl.Interface.GSslspidGetCustomListParamsRequestDto {
	}
	const enum GSpisGetCustomListParamsRequestDtoNames { VlastnostiUzivatelskeSloupceIxxs = "VlastnostiUzivatelskeSloupceIxxs",}
	const enum GSpisGetCustomListParamsRequestDtoFragments { VlastnostiUzivatelskeSloupceIxxs = "*",}
	const enum GSpisGetCustomListParamsRequestDtoTypes { VlastnostiUzivatelskeSloupceIxxs = "string",}
	const enum GSpisGetCustomListParamsRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení parametrů (IGSpis.GetCustomListParams).*/
	interface GSpisGetCustomListParamsResponseDto extends Gordic.Ssl.Interface.GSslspidGetCustomListParamsResponseDto {
	}
	const enum GSpisGetCustomListParamsResponseDtoNames { ssl_rem_dokd = "ssl_rem_dokd", ssl_hled_zvecp = "ssl_hled_zvecp", IxsSu = "IxsSu", LicAdr = "LicAdr", DebugMode = "DebugMode", IsStaraMetodikaSsl = "IsStaraMetodikaSsl", ssl_term_pouz = "ssl_term_pouz", wfl_typspisy = "wfl_typspisy", gin_rad_konao = "gin_rad_konao", ssl_rad_makspis = "ssl_rad_makspis", existLicCertFormulare = "existLicCertFormulare", StavUkonuEpkVisible = "StavUkonuEpkVisible", IxsFun = "IxsFun", DokumentAktZnackaLabel = "DokumentAktZnackaLabel", SpisAktZnackaLabel = "SpisAktZnackaLabel", ssl_sez_pozn = "ssl_sez_pozn", ssl_uziv_sl_an = "ssl_uziv_sl_an", ssl_uziv_sla2n = "ssl_uziv_sla2n", ssl_uziv_sla3n = "ssl_uziv_sla3n", ssl_uziv_sl_bn = "ssl_uziv_sl_bn", ssl_uziv_slb2n = "ssl_uziv_slb2n", ssl_uziv_slb3n = "ssl_uziv_slb3n", gin_ele_dmspres = "gin_ele_dmspres", IsPovolenePouzitiVlastnosti = "IsPovolenePouzitiVlastnosti", TestMinDbVersion524XXX002x34524XXX003x23 = "TestMinDbVersion524XXX002x34524XXX003x23", VlastnostiUzivatelskeSloupce = "VlastnostiUzivatelskeSloupce",}
	const enum GSpisGetCustomListParamsResponseDtoFragments { ssl_rem_dokd = "*", ssl_hled_zvecp = "*", IxsSu = "*", LicAdr = "*", DebugMode = "*", IsStaraMetodikaSsl = "*", ssl_term_pouz = "*", wfl_typspisy = "*", gin_rad_konao = "*", ssl_rad_makspis = "*", existLicCertFormulare = "*", StavUkonuEpkVisible = "*", IxsFun = "*", DokumentAktZnackaLabel = "*", SpisAktZnackaLabel = "*", ssl_sez_pozn = "*", ssl_uziv_sl_an = "*", ssl_uziv_sla2n = "*", ssl_uziv_sla3n = "*", ssl_uziv_sl_bn = "*", ssl_uziv_slb2n = "*", ssl_uziv_slb3n = "*", gin_ele_dmspres = "*", IsPovolenePouzitiVlastnosti = "*", TestMinDbVersion524XXX002x34524XXX003x23 = "*", VlastnostiUzivatelskeSloupce = "*",}
	const enum GSpisGetCustomListParamsResponseDtoTypes { ssl_rem_dokd = "number", ssl_hled_zvecp = "number", IxsSu = "string", LicAdr = "string", DebugMode = "boolean", IsStaraMetodikaSsl = "boolean", ssl_term_pouz = "number", wfl_typspisy = "number", gin_rad_konao = "number", ssl_rad_makspis = "number", existLicCertFormulare = "boolean", StavUkonuEpkVisible = "boolean", IxsFun = "string", DokumentAktZnackaLabel = "string", SpisAktZnackaLabel = "string", ssl_sez_pozn = "number", ssl_uziv_sl_an = "string", ssl_uziv_sla2n = "string", ssl_uziv_sla3n = "string", ssl_uziv_sl_bn = "string", ssl_uziv_slb2n = "string", ssl_uziv_slb3n = "string", gin_ele_dmspres = "number", IsPovolenePouzitiVlastnosti = "boolean", TestMinDbVersion524XXX002x34524XXX003x23 = "boolean", VlastnostiUzivatelskeSloupce = "Gordic.Wfl.Interface.UzivSloupceSeznamuDto[]",}
	const enum GSpisGetCustomListParamsResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení parametrů (IGSpis.GetCustomListParams).*/
	interface GSpisGetColumnParamsRequestDto extends Gordic.Ssl.Interface.GSslspidGetColumnParamsRequestDto {
	}
	const enum GSpisGetColumnParamsRequestDtoNames { VlastnostiUzivatelskeSloupceIxxs = "VlastnostiUzivatelskeSloupceIxxs",}
	const enum GSpisGetColumnParamsRequestDtoFragments { VlastnostiUzivatelskeSloupceIxxs = "*",}
	const enum GSpisGetColumnParamsRequestDtoTypes { VlastnostiUzivatelskeSloupceIxxs = "string",}
	const enum GSpisGetColumnParamsRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení parametrů (IGSpis.GetColumnParams).*/
	interface GSpisGetColumnParamsResponseDto extends Gordic.Ssl.Interface.GSslspidGetColumnParamsResponseDto {
	}
	const enum GSpisGetColumnParamsResponseDtoNames { IsStaraMetodikaSsl = "IsStaraMetodikaSsl", ssl_term_pouz = "ssl_term_pouz", wfl_typspisy = "wfl_typspisy", gin_rad_konao = "gin_rad_konao", ssl_rad_makspis = "ssl_rad_makspis", existLicCertFormulare = "existLicCertFormulare", StavUkonuEpkVisible = "StavUkonuEpkVisible", IxsFun = "IxsFun", DokumentAktZnackaLabel = "DokumentAktZnackaLabel", SpisAktZnackaLabel = "SpisAktZnackaLabel", ssl_sez_pozn = "ssl_sez_pozn", ssl_uziv_sl_an = "ssl_uziv_sl_an", ssl_uziv_sla2n = "ssl_uziv_sla2n", ssl_uziv_sla3n = "ssl_uziv_sla3n", ssl_uziv_sl_bn = "ssl_uziv_sl_bn", ssl_uziv_slb2n = "ssl_uziv_slb2n", ssl_uziv_slb3n = "ssl_uziv_slb3n", gin_ele_dmspres = "gin_ele_dmspres", IsPovolenePouzitiVlastnosti = "IsPovolenePouzitiVlastnosti", TestMinDbVersion524XXX002x34524XXX003x23 = "TestMinDbVersion524XXX002x34524XXX003x23", VlastnostiUzivatelskeSloupce = "VlastnostiUzivatelskeSloupce",}
	const enum GSpisGetColumnParamsResponseDtoFragments { IsStaraMetodikaSsl = "*", ssl_term_pouz = "*", wfl_typspisy = "*", gin_rad_konao = "*", ssl_rad_makspis = "*", existLicCertFormulare = "*", StavUkonuEpkVisible = "*", IxsFun = "*", DokumentAktZnackaLabel = "*", SpisAktZnackaLabel = "*", ssl_sez_pozn = "*", ssl_uziv_sl_an = "*", ssl_uziv_sla2n = "*", ssl_uziv_sla3n = "*", ssl_uziv_sl_bn = "*", ssl_uziv_slb2n = "*", ssl_uziv_slb3n = "*", gin_ele_dmspres = "*", IsPovolenePouzitiVlastnosti = "*", TestMinDbVersion524XXX002x34524XXX003x23 = "*", VlastnostiUzivatelskeSloupce = "*",}
	const enum GSpisGetColumnParamsResponseDtoTypes { IsStaraMetodikaSsl = "boolean", ssl_term_pouz = "number", wfl_typspisy = "number", gin_rad_konao = "number", ssl_rad_makspis = "number", existLicCertFormulare = "boolean", StavUkonuEpkVisible = "boolean", IxsFun = "string", DokumentAktZnackaLabel = "string", SpisAktZnackaLabel = "string", ssl_sez_pozn = "number", ssl_uziv_sl_an = "string", ssl_uziv_sla2n = "string", ssl_uziv_sla3n = "string", ssl_uziv_sl_bn = "string", ssl_uziv_slb2n = "string", ssl_uziv_slb3n = "string", gin_ele_dmspres = "number", IsPovolenePouzitiVlastnosti = "boolean", TestMinDbVersion524XXX002x34524XXX003x23 = "boolean", VlastnostiUzivatelskeSloupce = "Gordic.Wfl.Interface.UzivSloupceSeznamuDto[]",}
	const enum GSpisGetColumnParamsResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení identifikátoru spisu pro danné číslo jednací (IGSpis.GetIxpFromCj).*/
	interface GSpisGetIxpFromCjRequestDto {
		/**Deník.*/
		Denik?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**Pořadové číslo.*/
		PorCislo?: number|null;
	}
	const enum GSpisGetIxpFromCjRequestDtoNames { Denik = "Denik", Rok = "Rok", PorCislo = "PorCislo",}
	const enum GSpisGetIxpFromCjRequestDtoFragments { Denik = "*", Rok = "*", PorCislo = "*",}
	const enum GSpisGetIxpFromCjRequestDtoTypes { Denik = "string", Rok = "number", PorCislo = "number",}
	const enum GSpisGetIxpFromCjRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení identifikátoru spisu pro danné číslo jednací (IGSpis.GetIxpFromCj).*/
	interface GSpisGetIxpFromCjResponseDto {
		/**Identifikátor spisu pro danné číslo jednací.*/
		Ixp?: string|null;
	}
	const enum GSpisGetIxpFromCjResponseDtoNames { Ixp = "Ixp",}
	const enum GSpisGetIxpFromCjResponseDtoFragments { Ixp = "*",}
	const enum GSpisGetIxpFromCjResponseDtoTypes { Ixp = "string",}
	const enum GSpisGetIxpFromCjResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro obnovení záznamu kl_slova v spisu podle aktuálně navázaných klíčových slov spisu (IGSpis.ObnovPrehledKlicovychSlovSpisu).*/
	interface GSpisObnovPrehledKlicovychSlovSpisuRequestDto {
		/**Identifikátor spisu.*/
		Ixp?: string|null;
	}
	const enum GSpisObnovPrehledKlicovychSlovSpisuRequestDtoNames { Ixp = "Ixp",}
	const enum GSpisObnovPrehledKlicovychSlovSpisuRequestDtoFragments { Ixp = "*",}
	const enum GSpisObnovPrehledKlicovychSlovSpisuRequestDtoTypes { Ixp = "string",}
	const enum GSpisObnovPrehledKlicovychSlovSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro obnovení záznamu kl_slova v spisu podle aktuálně navázaných klíčových slov spisu (IGSpis.ObnovPrehledKlicovychSlovSpisu).*/
	interface GSpisObnovPrehledKlicovychSlovSpisuResponseDto {
	}
	const enum GSpisObnovPrehledKlicovychSlovSpisuResponseDtoNames {}
	const enum GSpisObnovPrehledKlicovychSlovSpisuResponseDtoFragments {}
	const enum GSpisObnovPrehledKlicovychSlovSpisuResponseDtoTypes {}
	const enum GSpisObnovPrehledKlicovychSlovSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vložení dokumentu do spisu (IGSpis.VlozitDokumentDoSpisu).*/
	interface GSpisVlozitDokumentDoSpisuRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Identifikátor dokumentu.*/
		IxpDokument?: string|null;
		/**Zda se ma nastavit rizeny pristup u vkladaneho dokumentu.*/
		NastaveniRPDokumentu?: boolean|null;
		/**Datum poslední změny vkládaného dokumentu.*/
		DatumZmenyDokument?: JsonDate|null;
	}
	const enum GSpisVlozitDokumentDoSpisuRequestDtoNames { IxpSpis = "IxpSpis", IxpDokument = "IxpDokument", NastaveniRPDokumentu = "NastaveniRPDokumentu", DatumZmenyDokument = "DatumZmenyDokument",}
	const enum GSpisVlozitDokumentDoSpisuRequestDtoFragments { IxpSpis = "*", IxpDokument = "*", NastaveniRPDokumentu = "*", DatumZmenyDokument = "*",}
	const enum GSpisVlozitDokumentDoSpisuRequestDtoTypes { IxpSpis = "string", IxpDokument = "string", NastaveniRPDokumentu = "boolean", DatumZmenyDokument = "JsonDate",}
	const enum GSpisVlozitDokumentDoSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vložení dokumentu do spisu (IGSpis.VlozitDokumentDoSpisu).*/
	interface GSpisVlozitDokumentDoSpisuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisVlozitDokumentDoSpisuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisVlozitDokumentDoSpisuResponseDtoFragments { DatZmena = "*",}
	const enum GSpisVlozitDokumentDoSpisuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisVlozitDokumentDoSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vložení součásti či dílu do typového spisu či součásti (IGSpis.VlozitSoucastDoSoucasti).*/
	interface GSpisVlozitSoucastDoSoucastiRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Identifikátor součásti.*/
		IxpSoucast?: string|null;
		/**Datum poslední změny vkládané součásti.*/
		DatumZmenySoucast?: JsonDate|null;
	}
	const enum GSpisVlozitSoucastDoSoucastiRequestDtoNames { IxpSpis = "IxpSpis", IxpSoucast = "IxpSoucast", DatumZmenySoucast = "DatumZmenySoucast",}
	const enum GSpisVlozitSoucastDoSoucastiRequestDtoFragments { IxpSpis = "*", IxpSoucast = "*", DatumZmenySoucast = "*",}
	const enum GSpisVlozitSoucastDoSoucastiRequestDtoTypes { IxpSpis = "string", IxpSoucast = "string", DatumZmenySoucast = "JsonDate",}
	const enum GSpisVlozitSoucastDoSoucastiRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vložení součásti či dílu do typového spisu či součásti (IGSpis.VlozitSoucastDoSoucasti).*/
	interface GSpisVlozitSoucastDoSoucastiResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisVlozitSoucastDoSoucastiResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisVlozitSoucastDoSoucastiResponseDtoFragments { DatZmena = "*",}
	const enum GSpisVlozitSoucastDoSoucastiResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisVlozitSoucastDoSoucastiResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vložení dokumentů do spisu hromadně (IGSpis.VlozeniDokumentuDoSpisuHromadne).*/
	interface GSpisVlozeniDokumentuDoSpisuHromadneRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Dokumenty.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**flagUserZmenaRizeny.*/
		UserZmenaRizeny?: boolean|null;
	}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneRequestDtoNames { IxpSpis = "IxpSpis", Dokumenty = "Dokumenty", UserZmenaRizeny = "UserZmenaRizeny",}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneRequestDtoFragments { IxpSpis = "*", Dokumenty = "*", UserZmenaRizeny = "*",}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneRequestDtoTypes { IxpSpis = "string", Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", UserZmenaRizeny = "boolean",}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vložení dokumentů do spisu hromadně (IGSpis.VlozeniDokumentuDoSpisuHromadne).*/
	interface GSpisVlozeniDokumentuDoSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisVlozeniDokumentuDoSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vyjmutí dokumentů ze spisů hromadně (IGSpis.VyjmutiDokumentuZeSpisu).*/
	interface GSpisVyjmutiDokumentuZeSpisuHromadneRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Dokumenty.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Důvod vyjmutí.*/
		Duvod?: string|null;
	}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneRequestDtoNames { IxpSpis = "IxpSpis", Dokumenty = "Dokumenty", Duvod = "Duvod",}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneRequestDtoFragments { IxpSpis = "*", Dokumenty = "*", Duvod = "*",}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneRequestDtoTypes { IxpSpis = "string", Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", Duvod = "string",}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vyjmutí dokumentů ze spisů hromadně (IGSpis.VyjmutiDokumentuZeSpisu).*/
	interface GSpisVyjmutiDokumentuZeSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisVyjmutiDokumentuZeSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro uzavření spisů hromadně (IGSpis.UzavreniSpisuHromadne).*/
	interface GSpisUzavreniSpisuHromadneRequestDto {
		/**Spisy k vyřízení.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Identifikátor funkce která uzavřela.*/
		IxsFunUzav?: string|null;
		/**Datum uzavření.*/
		DatumUzavreni?: JsonDate|null;
	}
	const enum GSpisUzavreniSpisuHromadneRequestDtoNames { Spisy = "Spisy", IxsFunUzav = "IxsFunUzav", DatumUzavreni = "DatumUzavreni",}
	const enum GSpisUzavreniSpisuHromadneRequestDtoFragments { Spisy = "*", IxsFunUzav = "*", DatumUzavreni = "*",}
	const enum GSpisUzavreniSpisuHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", IxsFunUzav = "string", DatumUzavreni = "JsonDate",}
	const enum GSpisUzavreniSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro uzavření spisů hromadně (IGSpis.UzavreniSpisuHromadne).*/
	interface GSpisUzavreniSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisUzavreniSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisUzavreniSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisUzavreniSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisUzavreniSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření obraz spisu sloučením obrazů jednotlivých dokumentů ze sběrného archu (IGSpis.VytvoritObrazSpisuZObrazuDokumentu).*/
	interface GSpisVytvoritObrazSpisuZObrazuDokumentuRequestDto {
		/**Identifikátor spisu.*/
		Ixp?: string|null;
	}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuRequestDtoNames { Ixp = "Ixp",}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuRequestDtoFragments { Ixp = "*",}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuRequestDtoTypes { Ixp = "string",}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření obraz spisu sloučením obrazů jednotlivých dokumentů ze sběrného archu (IGSpis.VytvoritObrazSpisuZObrazuDokumentu).*/
	interface GSpisVytvoritObrazSpisuZObrazuDokumentuResponseDto {
	}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuResponseDtoNames {}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuResponseDtoFragments {}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuResponseDtoTypes {}
	const enum GSpisVytvoritObrazSpisuZObrazuDokumentuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření spisu bez iniciační písemnosti (IGSpis.VytvoritSpisBezIniciacniPisemnosti).*/
	interface GSpisVytvoritSpisBezIniciacniPisemnostiRequestDto {
		/**Identifikátor spisu. Je-li null, vygeneruje se nový identifikátor*/
		IxpSpis?: string|null;
		/**Deník.*/
		Denik?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**Pořadí.*/
		Poradi?: number|null;
		/**Identifikátor funkce řešitele.*/
		IxsFunResitel?: string|null;
		/**Identifikátor funkce schvalovatele.*/
		IxsFunSchvalovatel?: string|null;
		/**Stupeň utajení.*/
		StUtaj?: number|null;
	}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiRequestDtoNames { IxpSpis = "IxpSpis", Denik = "Denik", Rok = "Rok", Poradi = "Poradi", IxsFunResitel = "IxsFunResitel", IxsFunSchvalovatel = "IxsFunSchvalovatel", StUtaj = "StUtaj",}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiRequestDtoFragments { IxpSpis = "*", Denik = "*", Rok = "*", Poradi = "*", IxsFunResitel = "*", IxsFunSchvalovatel = "*", StUtaj = "*",}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiRequestDtoTypes { IxpSpis = "string", Denik = "string", Rok = "number", Poradi = "number", IxsFunResitel = "string", IxsFunSchvalovatel = "string", StUtaj = "number",}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření spisu bez iniciační písemnosti (IGSpis.VytvoritSpisBezIniciacniPisemnosti).*/
	interface GSpisVytvoritSpisBezIniciacniPisemnostiResponseDto {
		/**Identifikátor spisu.*/
		Ixp?: string|null;
		/**Značka.*/
		AktZnacka?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**Deník.*/
		Denik?: string|null;
		/**Pořadí.*/
		Poradi?: number|null;
	}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiResponseDtoNames { Ixp = "Ixp", AktZnacka = "AktZnacka", Rok = "Rok", Denik = "Denik", Poradi = "Poradi",}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiResponseDtoFragments { Ixp = "*", AktZnacka = "*", Rok = "*", Denik = "*", Poradi = "*",}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiResponseDtoTypes { Ixp = "string", AktZnacka = "string", Rok = "number", Denik = "string", Poradi = "number",}
	const enum GSpisVytvoritSpisBezIniciacniPisemnostiResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro odstranění písemnosti ze spisu (IGSpis.OdebratPisemnostZeSpisu).*/
	interface GSpisOdebratPisemnostZeSpisuRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Identifikátor dokumentu.*/
		IxpDokument?: string|null;
		/**Důvod.*/
		Duvod?: string|null;
	}
	const enum GSpisOdebratPisemnostZeSpisuRequestDtoNames { IxpSpis = "IxpSpis", IxpDokument = "IxpDokument", Duvod = "Duvod",}
	const enum GSpisOdebratPisemnostZeSpisuRequestDtoFragments { IxpSpis = "*", IxpDokument = "*", Duvod = "*",}
	const enum GSpisOdebratPisemnostZeSpisuRequestDtoTypes { IxpSpis = "string", IxpDokument = "string", Duvod = "string",}
	const enum GSpisOdebratPisemnostZeSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro odstranění písemnosti ze spisu (IGSpis.OdebratPisemnostZeSpisu).*/
	interface GSpisOdebratPisemnostZeSpisuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisOdebratPisemnostZeSpisuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisOdebratPisemnostZeSpisuResponseDtoFragments { DatZmena = "*",}
	const enum GSpisOdebratPisemnostZeSpisuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisOdebratPisemnostZeSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro odstranění součásti ze součásti (IGSpis.OdebratSoucastZeSoucasti).*/
	interface GSpisOdebratSoucastZeSoucastiRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Identifikátor vyjímané součásti.*/
		IxpSoucast?: string|null;
		/**Důvod.*/
		Duvod?: string|null;
	}
	const enum GSpisOdebratSoucastZeSoucastiRequestDtoNames { IxpSpis = "IxpSpis", IxpSoucast = "IxpSoucast", Duvod = "Duvod",}
	const enum GSpisOdebratSoucastZeSoucastiRequestDtoFragments { IxpSpis = "*", IxpSoucast = "*", Duvod = "*",}
	const enum GSpisOdebratSoucastZeSoucastiRequestDtoTypes { IxpSpis = "string", IxpSoucast = "string", Duvod = "string",}
	const enum GSpisOdebratSoucastZeSoucastiRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro odstranění součásti ze součásti (IGSpis.OdebratSoucastZeSoucasti).*/
	interface GSpisOdebratSoucastZeSoucastiResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisOdebratSoucastZeSoucastiResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisOdebratSoucastZeSoucastiResponseDtoFragments { DatZmena = "*",}
	const enum GSpisOdebratSoucastZeSoucastiResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisOdebratSoucastZeSoucastiResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro odstranění posledního otevřeného dílu v součásti (IGSpis.OdstranitDil).*/
	interface GSpisOdstranitDilRequestDto {
		/**Identifikátor dílu.*/
		IxpSpis?: string|null;
	}
	const enum GSpisOdstranitDilRequestDtoNames { IxpSpis = "IxpSpis",}
	const enum GSpisOdstranitDilRequestDtoFragments { IxpSpis = "*",}
	const enum GSpisOdstranitDilRequestDtoTypes { IxpSpis = "string",}
	const enum GSpisOdstranitDilRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro odstranění posledního otevřeného dílu v součásti (IGSpis.OdstranitDil).*/
	interface GSpisOdstranitDilResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisOdstranitDilResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisOdstranitDilResponseDtoFragments { DatZmena = "*",}
	const enum GSpisOdstranitDilResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisOdstranitDilResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro priorování spisu do (IGSpis.PriorivatSpisDo).*/
	interface GSpisPriorivatSpisDoRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Identifikátor spisu, do kterého se bude priorovat.*/
		IxpSpisDo?: string|null;
	}
	const enum GSpisPriorivatSpisDoRequestDtoNames { Ixp = "Ixp", IxpSpisDo = "IxpSpisDo",}
	const enum GSpisPriorivatSpisDoRequestDtoFragments { Ixp = "*", IxpSpisDo = "*",}
	const enum GSpisPriorivatSpisDoRequestDtoTypes { Ixp = "string", IxpSpisDo = "string",}
	const enum GSpisPriorivatSpisDoRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro priorování spisu do (IGSpis.PriorivatSpisDo).*/
	interface GSpisPriorivatSpisDoResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisPriorivatSpisDoResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisPriorivatSpisDoResponseDtoFragments { DatZmena = "*",}
	const enum GSpisPriorivatSpisDoResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisPriorivatSpisDoResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro priorování spisu do hromadně (IGSpis.PriorovatSpisyDoHromadne).*/
	interface GSpisPriorovatSpisyDoHromadneRequestDto {
		/**Spisy.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Identifikátor spisu, do kterého se bude priorovat.*/
		IxpSpisDo?: string|null;
	}
	const enum GSpisPriorovatSpisyDoHromadneRequestDtoNames { Spisy = "Spisy", IxpSpisDo = "IxpSpisDo",}
	const enum GSpisPriorovatSpisyDoHromadneRequestDtoFragments { Spisy = "*", IxpSpisDo = "*",}
	const enum GSpisPriorovatSpisyDoHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", IxpSpisDo = "string",}
	const enum GSpisPriorovatSpisyDoHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro priorování spisu do hromadně (IGSpis.PriorovatSpisyDoHromadne).*/
	interface GSpisPriorovatSpisyDoHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisPriorovatSpisyDoHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisPriorovatSpisyDoHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisPriorovatSpisyDoHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisPriorovatSpisyDoHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení vyřízení spisu (IGSpis.ZruseniVyrizeniSpisu).*/
	interface GSpisZruseniVyrizeniSpisuRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
	}
	const enum GSpisZruseniVyrizeniSpisuRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GSpisZruseniVyrizeniSpisuRequestDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GSpisZruseniVyrizeniSpisuRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GSpisZruseniVyrizeniSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení vyřízení spisu (IGSpis.ZruseniVyrizeniSpisu).*/
	interface GSpisZruseniVyrizeniSpisuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisZruseniVyrizeniSpisuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisZruseniVyrizeniSpisuResponseDtoFragments { DatZmena = "*",}
	const enum GSpisZruseniVyrizeniSpisuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisZruseniVyrizeniSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro odpriorování spisu (IGSpis.OdPriorivatSpis).*/
	interface GSpisOdPriorivatSpisRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
	}
	const enum GSpisOdPriorivatSpisRequestDtoNames { Ixp = "Ixp",}
	const enum GSpisOdPriorivatSpisRequestDtoFragments { Ixp = "*",}
	const enum GSpisOdPriorivatSpisRequestDtoTypes { Ixp = "string",}
	const enum GSpisOdPriorivatSpisRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro odpriorování spisu (IGSpis.OdPriorivatSpis).*/
	interface GSpisOdPriorivatSpisResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisOdPriorivatSpisResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisOdPriorivatSpisResponseDtoFragments { DatZmena = "*",}
	const enum GSpisOdPriorivatSpisResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisOdPriorivatSpisResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vyřízení spisu (IGSpis.VyriditSpis).*/
	interface GSpisVyriditSpisRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
		/**Způsob vyřízení.*/
		ZpusobVyrizeni?: string|null;
		/**Datum vyřízení.*/
		DatumVyrizeni?: JsonDate|null;
		/**Poznámka vyřízení.*/
		Poznamka?: string|null;
		/**Identifikátor funkce schvalovatele.*/
		IxsFunSchval?: string|null;
		/**Identifikátor funkce řešeitele.*/
		IxsFunResitel?: string|null;
		/**Spisový plán.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
	}
	const enum GSpisVyriditSpisRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", ZpusobVyrizeni = "ZpusobVyrizeni", DatumVyrizeni = "DatumVyrizeni", Poznamka = "Poznamka", IxsFunSchval = "IxsFunSchval", IxsFunResitel = "IxsFunResitel", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak",}
	const enum GSpisVyriditSpisRequestDtoFragments { Ixp = "*", DatZmena = "*", ZpusobVyrizeni = "*", DatumVyrizeni = "*", Poznamka = "*", IxsFunSchval = "*", IxsFunResitel = "*", SpisPlan = "*", SpisZnak = "*",}
	const enum GSpisVyriditSpisRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", ZpusobVyrizeni = "string", DatumVyrizeni = "JsonDate", Poznamka = "string", IxsFunSchval = "string", IxsFunResitel = "string", SpisPlan = "string", SpisZnak = "string",}
	const enum GSpisVyriditSpisRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vyřízení spisu (IGSpis.VyriditSpis).*/
	interface GSpisVyriditSpisResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisVyriditSpisResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisVyriditSpisResponseDtoFragments { DatZmena = "*",}
	const enum GSpisVyriditSpisResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisVyriditSpisResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vyřízení spisu hromadně (IGSpis.VyrizeniSpisuHromadne).*/
	interface GSpisVyrizeniSpisuHromadneRequestDto {
		/**Spisy.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Způsob vyřízení.*/
		ZpusobVyrizeni?: string|null;
		/**Datum vyřízení.*/
		DatumVyrizeni?: JsonDate|null;
		/**Poznámka vyřízení.*/
		Poznamka?: string|null;
		/**Identifikátor funkce schvalovatele.*/
		IxsFunSchval?: string|null;
		/**Identifikátor funkce řešeitele.*/
		IxsFunResitel?: string|null;
		/**Spisový plán.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
	}
	const enum GSpisVyrizeniSpisuHromadneRequestDtoNames { Spisy = "Spisy", ZpusobVyrizeni = "ZpusobVyrizeni", DatumVyrizeni = "DatumVyrizeni", Poznamka = "Poznamka", IxsFunSchval = "IxsFunSchval", IxsFunResitel = "IxsFunResitel", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak",}
	const enum GSpisVyrizeniSpisuHromadneRequestDtoFragments { Spisy = "*", ZpusobVyrizeni = "*", DatumVyrizeni = "*", Poznamka = "*", IxsFunSchval = "*", IxsFunResitel = "*", SpisPlan = "*", SpisZnak = "*",}
	const enum GSpisVyrizeniSpisuHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", ZpusobVyrizeni = "string", DatumVyrizeni = "JsonDate", Poznamka = "string", IxsFunSchval = "string", IxsFunResitel = "string", SpisPlan = "string", SpisZnak = "string",}
	const enum GSpisVyrizeniSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vyřízení spisu hromadně (IGSpis.VyrizeniSpisuHromadne).*/
	interface GSpisVyrizeniSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisVyrizeniSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisVyrizeniSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisVyrizeniSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisVyrizeniSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení vyřízení spisu hromadně (IGSpis.ZruseniVyrizeniSpisuHromadne).*/
	interface GSpisZruseniVyrizeniSpisuHromadneRequestDto {
		/**Spisy.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
	}
	const enum GSpisZruseniVyrizeniSpisuHromadneRequestDtoNames { Spisy = "Spisy",}
	const enum GSpisZruseniVyrizeniSpisuHromadneRequestDtoFragments { Spisy = "*",}
	const enum GSpisZruseniVyrizeniSpisuHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]",}
	const enum GSpisZruseniVyrizeniSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení vyřízení spisu hromadně (IGSpis.ZruseniVyrizeniSpisuHromadne).*/
	interface GSpisZruseniVyrizeniSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZruseniVyrizeniSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZruseniVyrizeniSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZruseniVyrizeniSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZruseniVyrizeniSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení uzavření spisu hromadně (IGSpis.ZruseniUzavreniSpisuHromadne).*/
	interface GSpisZruseniUzavreniSpisuHromadneRequestDto {
		/**Spisy.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
	}
	const enum GSpisZruseniUzavreniSpisuHromadneRequestDtoNames { Spisy = "Spisy",}
	const enum GSpisZruseniUzavreniSpisuHromadneRequestDtoFragments { Spisy = "*",}
	const enum GSpisZruseniUzavreniSpisuHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]",}
	const enum GSpisZruseniUzavreniSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení uzavření spisu hromadně (IGSpis.ZruseniUzavreniSpisuHromadne).*/
	interface GSpisZruseniUzavreniSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZruseniUzavreniSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZruseniUzavreniSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZruseniUzavreniSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZruseniUzavreniSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vyřízení a uzavření spisu hromadně (IGSpis.VyrizeniAUzavreniSpisuHromadne).*/
	interface GSpisVyrizeniAUzavreniSpisuHromadneRequestDto {
		/**Spisy.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Způsob vyřízení.*/
		ZpusobVyrizeni?: string|null;
		/**Datum vyřízení.*/
		DatumVyrizeni?: JsonDate|null;
		/**Poznámka vyřízení.*/
		Poznamka?: string|null;
		/**Identifikátor funkce schvalovatele.*/
		IxsFunSchval?: string|null;
		/**Identifikátor funkce řešeitele.*/
		IxsFunResitel?: string|null;
		/**Spisový plán.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
		/**Identifikátor funkce, která uzavírá.*/
		IxsFunUzav?: string|null;
		/**Datum uzavření.*/
		DatumUzavreni?: JsonDate|null;
		/**Odesláno listů.*/
		OdeslanoListu?: number|null;
		/**Uloženo listů.*/
		UlozenoListu?: number|null;
	}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneRequestDtoNames { Spisy = "Spisy", ZpusobVyrizeni = "ZpusobVyrizeni", DatumVyrizeni = "DatumVyrizeni", Poznamka = "Poznamka", IxsFunSchval = "IxsFunSchval", IxsFunResitel = "IxsFunResitel", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak", IxsFunUzav = "IxsFunUzav", DatumUzavreni = "DatumUzavreni", OdeslanoListu = "OdeslanoListu", UlozenoListu = "UlozenoListu",}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneRequestDtoFragments { Spisy = "*", ZpusobVyrizeni = "*", DatumVyrizeni = "*", Poznamka = "*", IxsFunSchval = "*", IxsFunResitel = "*", SpisPlan = "*", SpisZnak = "*", IxsFunUzav = "*", DatumUzavreni = "*", OdeslanoListu = "*", UlozenoListu = "*",}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", ZpusobVyrizeni = "string", DatumVyrizeni = "JsonDate", Poznamka = "string", IxsFunSchval = "string", IxsFunResitel = "string", SpisPlan = "string", SpisZnak = "string", IxsFunUzav = "string", DatumUzavreni = "JsonDate", OdeslanoListu = "number", UlozenoListu = "number",}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vyřízení a uzavření spisu hromadně (IGSpis.VyrizeniAUzavreniSpisuHromadne).*/
	interface GSpisVyrizeniAUzavreniSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisVyrizeniAUzavreniSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro uzavření spisu (IGSpis.UzavritSpis).*/
	interface GSpisUzavritSpisRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor funkce, která uzavřela.*/
		IxsFunUzav?: string|null;
		/**Datum uzavření.*/
		DatumUzavreni?: JsonDate|null;
		/**Odesláno listů.*/
		OdeslanoListu?: number|null;
		/**Uloženo listů.*/
		UlozenoListu?: number|null;
		/**Skartační znak.*/
		SkartZnak?: string|null;
		/**Skartační lhůta.*/
		SkartLhuta?: number|null;
		/**Rok spouštěcí události.*/
		RokSpoUda?: number|null;
		/**Popis spouštěcí události.*/
		PopisSpoUda?: string|null;
		/**Svazků příloh NSESS 2018 2.7.9.*/
		SvPriloh?: string|null;
	}
	const enum GSpisUzavritSpisRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxsFunUzav = "IxsFunUzav", DatumUzavreni = "DatumUzavreni", OdeslanoListu = "OdeslanoListu", UlozenoListu = "UlozenoListu", SkartZnak = "SkartZnak", SkartLhuta = "SkartLhuta", RokSpoUda = "RokSpoUda", PopisSpoUda = "PopisSpoUda", SvPriloh = "SvPriloh",}
	const enum GSpisUzavritSpisRequestDtoFragments { Ixp = "*", DatZmena = "*", IxsFunUzav = "*", DatumUzavreni = "*", OdeslanoListu = "*", UlozenoListu = "*", SkartZnak = "*", SkartLhuta = "*", RokSpoUda = "*", PopisSpoUda = "*", SvPriloh = "*",}
	const enum GSpisUzavritSpisRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxsFunUzav = "string", DatumUzavreni = "JsonDate", OdeslanoListu = "number", UlozenoListu = "number", SkartZnak = "string", SkartLhuta = "number", RokSpoUda = "number", PopisSpoUda = "string", SvPriloh = "string",}
	const enum GSpisUzavritSpisRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro uzavření spisu (IGSpis.UzavritSpis).*/
	interface GSpisUzavritSpisResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisUzavritSpisResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisUzavritSpisResponseDtoFragments { DatZmena = "*",}
	const enum GSpisUzavritSpisResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisUzavritSpisResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení uzavření a vyřízení typového spisu, součásti a dílu (IGSpis.ZruseniUzavreniAVyrizeniEntity).*/
	interface GSpisZruseniUzavreniAVyrizeniEntityRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
	}
	const enum GSpisZruseniUzavreniAVyrizeniEntityRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GSpisZruseniUzavreniAVyrizeniEntityRequestDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GSpisZruseniUzavreniAVyrizeniEntityRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GSpisZruseniUzavreniAVyrizeniEntityRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení uzavření a vyřízení typového spisu, součásti a dílu (IGSpis.ZruseniUzavreniAVyrizeniEntity).*/
	interface GSpisZruseniUzavreniAVyrizeniEntityResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisZruseniUzavreniAVyrizeniEntityResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisZruseniUzavreniAVyrizeniEntityResponseDtoFragments { DatZmena = "*",}
	const enum GSpisZruseniUzavreniAVyrizeniEntityResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisZruseniUzavreniAVyrizeniEntityResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení uzavření spisu (IGSpis.ZrusitUzavreniSpisu).*/
	interface GSpisZrusitUzavreniSpisuRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
	}
	const enum GSpisZrusitUzavreniSpisuRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GSpisZrusitUzavreniSpisuRequestDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GSpisZrusitUzavreniSpisuRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GSpisZrusitUzavreniSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení uzavření spisu (IGSpis.ZrusitUzavreniSpisu).*/
	interface GSpisZrusitUzavreniSpisuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisZrusitUzavreniSpisuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisZrusitUzavreniSpisuResponseDtoFragments { DatZmena = "*",}
	const enum GSpisZrusitUzavreniSpisuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisZrusitUzavreniSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro nastavení vyřizující písemnosti (IGSpis.NastavVyrizujiciPisemnost).*/
	interface GSpisNastavVyrizujiciPisemnostRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor písemnosti, která má být nastavena jako vyřizující.*/
		IxpVyriz?: string|null;
	}
	const enum GSpisNastavVyrizujiciPisemnostRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxpVyriz = "IxpVyriz",}
	const enum GSpisNastavVyrizujiciPisemnostRequestDtoFragments { Ixp = "*", DatZmena = "*", IxpVyriz = "*",}
	const enum GSpisNastavVyrizujiciPisemnostRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxpVyriz = "string",}
	const enum GSpisNastavVyrizujiciPisemnostRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení nastavení vyřizující písemnosti (IGSpis.NastavVyrizujiciPisemnost).*/
	interface GSpisNastavVyrizujiciPisemnostResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisNastavVyrizujiciPisemnostResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisNastavVyrizujiciPisemnostResponseDtoFragments { DatZmena = "*",}
	const enum GSpisNastavVyrizujiciPisemnostResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisNastavVyrizujiciPisemnostResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení nastavení vyřizující písemnosti (IGSpis.ZrusNastaveniVyrizujiciPisemnosti).*/
	interface GSpisZrusNastaveniVyrizujiciPisemnostiRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor písemnosti, která má být zrušena jako vyřizující.*/
		IxpVyriz?: string|null;
	}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxpVyriz = "IxpVyriz",}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiRequestDtoFragments { Ixp = "*", DatZmena = "*", IxpVyriz = "*",}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxpVyriz = "string",}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro nastavení vyřizující písemnosti (IGSpis.ZrusNastaveniVyrizujiciPisemnosti).*/
	interface GSpisZrusNastaveniVyrizujiciPisemnostiResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiResponseDtoFragments { DatZmena = "*",}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisZrusNastaveniVyrizujiciPisemnostiResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro kontrolu spisového plánu dle datumu vyřízení (IGSpis.KontrolaSpisPlanu).*/
	interface GSpisKontrolaSpisPlanuRequestDto {
		/**Datum vyřízení.*/
		DatVyriz?: JsonDate|null;
	}
	const enum GSpisKontrolaSpisPlanuRequestDtoNames { DatVyriz = "DatVyriz",}
	const enum GSpisKontrolaSpisPlanuRequestDtoFragments { DatVyriz = "*",}
	const enum GSpisKontrolaSpisPlanuRequestDtoTypes { DatVyriz = "JsonDate",}
	const enum GSpisKontrolaSpisPlanuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro kontrolu spisového plánu dle datumu vyřízení (IGSpis.KontrolaSpisPlanu).*/
	interface GSpisKontrolaSpisPlanuResponseDto {
		/**Spisový plán.*/
		SpisPlan?: string|null;
	}
	const enum GSpisKontrolaSpisPlanuResponseDtoNames { SpisPlan = "SpisPlan",}
	const enum GSpisKontrolaSpisPlanuResponseDtoFragments { SpisPlan = "*",}
	const enum GSpisKontrolaSpisPlanuResponseDtoTypes { SpisPlan = "string",}
	const enum GSpisKontrolaSpisPlanuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro opravu profilu spisu (IGSpis.OpravaProfiluSpisu).*/
	interface GSpisOpravaProfiluSpisuRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
		/**Název spisu.*/
		Nazev?: string|null;
		/**Stupeň utajení.*/
		StUtaj?: number|null;
		/**Spisový plán.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
		/**Textový popis obsahu.*/
		ObsahText?: string|null;
		/**Poznámka.*/
		Poznamka?: string|null;
		/**Umístění.*/
		Umisteni?: string|null;
		/**Identifkátor funkce kdo vyřešil.*/
		IxsFunResitel?: string|null;
		/**Identifikátor funkce kdo schválil.*/
		IxsFunSchval?: string|null;
		/**Externí číslo jednací.*/
		CjExt?: string|null;
		/**Datum vyřízení do.*/
		DatVyrizDo?: JsonDate|null;
		/**Příznak změny.*/
		SZmena?: number|null;
		/**Důvod změny termínu.*/
		DuvodZt?: string|null;
		/**Pro MV, OSC, možno poslat prázdno.*/
		Osc?: string|null;
		/**Pro MV, právní kvalifikace, možno poslat prázdno.*/
		PravKval?: string|null;
		/**Pro MV, zákon č., možno poslat prázdno.*/
		ZakonC?: string|null;
		/**Pro MDČR, editace typu dokumentu, možno poslat prázdno.*/
		IxsTyp?: string|null;
		/**Příznak, zda se ma nastavit RP i u vložených dokumentu.*/
		ZmenitStUtajVlozenychDok?: number|null;
		/**PrizPozSkar.*/
		PrizPozSkar?: number|null;
		/**DuvodPozSkar.*/
		DuvodPozSkar?: string|null;
		/**RokDoPozSkar.*/
		RokDoPozSkar?: number|null;
	}
	const enum GSpisOpravaProfiluSpisuRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", Nazev = "Nazev", StUtaj = "StUtaj", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak", ObsahText = "ObsahText", Poznamka = "Poznamka", Umisteni = "Umisteni", IxsFunResitel = "IxsFunResitel", IxsFunSchval = "IxsFunSchval", CjExt = "CjExt", DatVyrizDo = "DatVyrizDo", SZmena = "SZmena", DuvodZt = "DuvodZt", Osc = "Osc", PravKval = "PravKval", ZakonC = "ZakonC", IxsTyp = "IxsTyp", ZmenitStUtajVlozenychDok = "ZmenitStUtajVlozenychDok", PrizPozSkar = "PrizPozSkar", DuvodPozSkar = "DuvodPozSkar", RokDoPozSkar = "RokDoPozSkar",}
	const enum GSpisOpravaProfiluSpisuRequestDtoFragments { Ixp = "*", DatZmena = "*", Nazev = "*", StUtaj = "*", SpisPlan = "*", SpisZnak = "*", ObsahText = "*", Poznamka = "*", Umisteni = "*", IxsFunResitel = "*", IxsFunSchval = "*", CjExt = "*", DatVyrizDo = "*", SZmena = "*", DuvodZt = "*", Osc = "*", PravKval = "*", ZakonC = "*", IxsTyp = "*", ZmenitStUtajVlozenychDok = "*", PrizPozSkar = "*", DuvodPozSkar = "*", RokDoPozSkar = "*",}
	const enum GSpisOpravaProfiluSpisuRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", Nazev = "string", StUtaj = "number", SpisPlan = "string", SpisZnak = "string", ObsahText = "string", Poznamka = "string", Umisteni = "string", IxsFunResitel = "string", IxsFunSchval = "string", CjExt = "string", DatVyrizDo = "JsonDate", SZmena = "number", DuvodZt = "string", Osc = "string", PravKval = "string", ZakonC = "string", IxsTyp = "string", ZmenitStUtajVlozenychDok = "number", PrizPozSkar = "number", DuvodPozSkar = "string", RokDoPozSkar = "number",}
	const enum GSpisOpravaProfiluSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro opravu profilu spisu (IGSpis.OpravaProfiluSpisu).*/
	interface GSpisOpravaProfiluSpisuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisOpravaProfiluSpisuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisOpravaProfiluSpisuResponseDtoFragments { DatZmena = "*",}
	const enum GSpisOpravaProfiluSpisuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisOpravaProfiluSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro opravu profilu spisu (IGSpis.OpravaProfiluSpisuIUzav).*/
	interface GSpisOpravaProfiluSpisuIUzavRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Datum poslední změny.*/
		DatZmena?: JsonDate|null;
		/**Název spisu.*/
		Nazev?: string|null;
		/**Stupeň utajení.*/
		StUtaj?: number|null;
		/**Spisový plán.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
		/**Textový popis obsahu.*/
		ObsahText?: string|null;
		/**Poznámka.*/
		Poznamka?: string|null;
		/**Umístění.*/
		Umisteni?: string|null;
		/**Identifkátor funkce kdo vyřešil.*/
		IxsFunResitel?: string|null;
		/**Identifikátor funkce kdo schválil.*/
		IxsFunSchval?: string|null;
		/**Externí číslo jednací.*/
		CjExt?: string|null;
		/**Datum vyřízení do.*/
		DatVyrizDo?: JsonDate|null;
		/**Příznak změny.*/
		SZmena?: number|null;
		/**Důvod změny termínu.*/
		DuvodZt?: string|null;
		/**Pro MV, OSC, možno poslat prázdno.*/
		Osc?: string|null;
		/**Pro MV, právní kvalifikace, možno poslat prázdno.*/
		PravKval?: string|null;
		/**Pro MV, zákon č., možno poslat prázdno.*/
		ZakonC?: string|null;
		/**Pro MDČR, editace typu dokumentu, možno poslat prázdno.*/
		IxsTyp?: string|null;
		/**Příznak, zda se ma nastavit RP i u vložených dokumentu.*/
		ZmenitStUtajVlozenychDok?: number|null;
		/**PrizPozSkar.*/
		PrizPozSkar?: number|null;
		/**DuvodPozSkar.*/
		DuvodPozSkar?: string|null;
		/**RokDoPozSkar.*/
		RokDoPozSkar?: number|null;
		/**Uloženo listů.*/
		UlozenoListu?: number|null;
		/**Způsob vyřízení.*/
		ZpVvyriz?: string|null;
	}
	const enum GSpisOpravaProfiluSpisuIUzavRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", Nazev = "Nazev", StUtaj = "StUtaj", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak", ObsahText = "ObsahText", Poznamka = "Poznamka", Umisteni = "Umisteni", IxsFunResitel = "IxsFunResitel", IxsFunSchval = "IxsFunSchval", CjExt = "CjExt", DatVyrizDo = "DatVyrizDo", SZmena = "SZmena", DuvodZt = "DuvodZt", Osc = "Osc", PravKval = "PravKval", ZakonC = "ZakonC", IxsTyp = "IxsTyp", ZmenitStUtajVlozenychDok = "ZmenitStUtajVlozenychDok", PrizPozSkar = "PrizPozSkar", DuvodPozSkar = "DuvodPozSkar", RokDoPozSkar = "RokDoPozSkar", UlozenoListu = "UlozenoListu", ZpVvyriz = "ZpVvyriz",}
	const enum GSpisOpravaProfiluSpisuIUzavRequestDtoFragments { Ixp = "*", DatZmena = "*", Nazev = "*", StUtaj = "*", SpisPlan = "*", SpisZnak = "*", ObsahText = "*", Poznamka = "*", Umisteni = "*", IxsFunResitel = "*", IxsFunSchval = "*", CjExt = "*", DatVyrizDo = "*", SZmena = "*", DuvodZt = "*", Osc = "*", PravKval = "*", ZakonC = "*", IxsTyp = "*", ZmenitStUtajVlozenychDok = "*", PrizPozSkar = "*", DuvodPozSkar = "*", RokDoPozSkar = "*", UlozenoListu = "*", ZpVvyriz = "*",}
	const enum GSpisOpravaProfiluSpisuIUzavRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", Nazev = "string", StUtaj = "number", SpisPlan = "string", SpisZnak = "string", ObsahText = "string", Poznamka = "string", Umisteni = "string", IxsFunResitel = "string", IxsFunSchval = "string", CjExt = "string", DatVyrizDo = "JsonDate", SZmena = "number", DuvodZt = "string", Osc = "string", PravKval = "string", ZakonC = "string", IxsTyp = "string", ZmenitStUtajVlozenychDok = "number", PrizPozSkar = "number", DuvodPozSkar = "string", RokDoPozSkar = "number", UlozenoListu = "number", ZpVvyriz = "string",}
	const enum GSpisOpravaProfiluSpisuIUzavRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro opravu profilu spisu (IGSpis.OpravaProfiluSpisuIUzav).*/
	interface GSpisOpravaProfiluSpisuIUzavResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GSpisOpravaProfiluSpisuIUzavResponseDtoNames { DatZmena = "DatZmena",}
	const enum GSpisOpravaProfiluSpisuIUzavResponseDtoFragments { DatZmena = "*",}
	const enum GSpisOpravaProfiluSpisuIUzavResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GSpisOpravaProfiluSpisuIUzavResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro seznam sberneho archu (IGSpis.SeznamSbernyArchSpisu).*/
	interface SeznamSbernyArchSpisuRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
	}
	const enum SeznamSbernyArchSpisuRequestDtoNames { IxpSpis = "IxpSpis",}
	const enum SeznamSbernyArchSpisuRequestDtoFragments { IxpSpis = "*",}
	const enum SeznamSbernyArchSpisuRequestDtoTypes { IxpSpis = "string",}
	const enum SeznamSbernyArchSpisuRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro posun dokumentu v sběrném archu nahoru (IGSpis.PosunDokumentVSbernemArchuNahoru).*/
	interface GSpisPosunDokumentVSbernemArchuNahoruRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Identifikátor dokumentu.*/
		IxpDokument?: string|null;
	}
	const enum GSpisPosunDokumentVSbernemArchuNahoruRequestDtoNames { IxpSpis = "IxpSpis", IxpDokument = "IxpDokument",}
	const enum GSpisPosunDokumentVSbernemArchuNahoruRequestDtoFragments { IxpSpis = "*", IxpDokument = "*",}
	const enum GSpisPosunDokumentVSbernemArchuNahoruRequestDtoTypes { IxpSpis = "string", IxpDokument = "string",}
	const enum GSpisPosunDokumentVSbernemArchuNahoruRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro posun dokumentu v sběrném archu nahoru (IGSpis.PosunDokumentVSbernemArchuNahoru).*/
	interface GSpisPosunDokumentVSbernemArchuNahoruResponseDto {
	}
	const enum GSpisPosunDokumentVSbernemArchuNahoruResponseDtoNames {}
	const enum GSpisPosunDokumentVSbernemArchuNahoruResponseDtoFragments {}
	const enum GSpisPosunDokumentVSbernemArchuNahoruResponseDtoTypes {}
	const enum GSpisPosunDokumentVSbernemArchuNahoruResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro posun dokumentu v sběrném archu dolu (IGSpis.PosunDokumentVSbernemArchuDolu).*/
	interface GSpisPosunDokumentVSbernemArchuDoluRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Identifikátor dokumentu.*/
		IxpDokument?: string|null;
	}
	const enum GSpisPosunDokumentVSbernemArchuDoluRequestDtoNames { IxpSpis = "IxpSpis", IxpDokument = "IxpDokument",}
	const enum GSpisPosunDokumentVSbernemArchuDoluRequestDtoFragments { IxpSpis = "*", IxpDokument = "*",}
	const enum GSpisPosunDokumentVSbernemArchuDoluRequestDtoTypes { IxpSpis = "string", IxpDokument = "string",}
	const enum GSpisPosunDokumentVSbernemArchuDoluRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro posun dokumentu v sběrném archu dolu (IGSpis.PosunDokumentVSbernemArchuDolu).*/
	interface GSpisPosunDokumentVSbernemArchuDoluResponseDto {
	}
	const enum GSpisPosunDokumentVSbernemArchuDoluResponseDtoNames {}
	const enum GSpisPosunDokumentVSbernemArchuDoluResponseDtoFragments {}
	const enum GSpisPosunDokumentVSbernemArchuDoluResponseDtoTypes {}
	const enum GSpisPosunDokumentVSbernemArchuDoluResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro uložení poradí obsahu spisu (IGSpis.UlozPoradiVSbernemArchu).*/
	interface GSpisUlozPoradiVSbernemArchuRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Identifikátory dokumentů v požadovaném pořadí (může obsahovat prázdné položky).*/
		IxpDokumenty?: string[]|null;
	}
	const enum GSpisUlozPoradiVSbernemArchuRequestDtoNames { IxpSpis = "IxpSpis", IxpDokumenty = "IxpDokumenty",}
	const enum GSpisUlozPoradiVSbernemArchuRequestDtoFragments { IxpSpis = "*", IxpDokumenty = "*",}
	const enum GSpisUlozPoradiVSbernemArchuRequestDtoTypes { IxpSpis = "string", IxpDokumenty = "string[]",}
	const enum GSpisUlozPoradiVSbernemArchuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro uložení poradí obsahu spisu (IGSpis.UlozPoradiVSbernemArchu).*/
	interface GSpisUlozPoradiVSbernemArchuResponseDto {
	}
	const enum GSpisUlozPoradiVSbernemArchuResponseDtoNames {}
	const enum GSpisUlozPoradiVSbernemArchuResponseDtoFragments {}
	const enum GSpisUlozPoradiVSbernemArchuResponseDtoTypes {}
	const enum GSpisUlozPoradiVSbernemArchuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu zpracovatele hromadně (IGSpis.ZmenaZpracovateleHromadne).*/
	interface GSpisZmenaZpracovateleHromadneRequestDto {
		/**Identifikátory.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Identifikátor funkce zpracovatele.*/
		IxsZpracovatele?: string|null;
		/**Zda se mají měnit i již vyplnění zpracovatelé.*/
		PrepisVyplnene?: boolean|null;
	}
	const enum GSpisZmenaZpracovateleHromadneRequestDtoNames { Spisy = "Spisy", IxsZpracovatele = "IxsZpracovatele", PrepisVyplnene = "PrepisVyplnene",}
	const enum GSpisZmenaZpracovateleHromadneRequestDtoFragments { Spisy = "*", IxsZpracovatele = "*", PrepisVyplnene = "*",}
	const enum GSpisZmenaZpracovateleHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", IxsZpracovatele = "string", PrepisVyplnene = "boolean",}
	const enum GSpisZmenaZpracovateleHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu zpracovatele hromadně (IGSpis.ZmenaZpracovateleHromadne).*/
	interface GSpisZmenaZpracovateleHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZmenaZpracovateleHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZmenaZpracovateleHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZmenaZpracovateleHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZmenaZpracovateleHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu schvalovatele hromadně (IGSpis.ZmenaSchvalovateleHromadne).*/
	interface GSpisZmenaSchvalovateleHromadneRequestDto {
		/**Identifikátory.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Identifikátor funkce schvalovatele.*/
		IxsSchvalovatel?: string|null;
		/**Zda se mají měnit i již vyplnění schvalovatele.*/
		PrepisVyplnene?: boolean|null;
	}
	const enum GSpisZmenaSchvalovateleHromadneRequestDtoNames { Spisy = "Spisy", IxsSchvalovatel = "IxsSchvalovatel", PrepisVyplnene = "PrepisVyplnene",}
	const enum GSpisZmenaSchvalovateleHromadneRequestDtoFragments { Spisy = "*", IxsSchvalovatel = "*", PrepisVyplnene = "*",}
	const enum GSpisZmenaSchvalovateleHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", IxsSchvalovatel = "string", PrepisVyplnene = "boolean",}
	const enum GSpisZmenaSchvalovateleHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu schvalovatele hromadně (IGSpis.ZmenaSchvalovateleHromadne).*/
	interface GSpisZmenaSchvalovateleHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZmenaSchvalovateleHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZmenaSchvalovateleHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZmenaSchvalovateleHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZmenaSchvalovateleHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu externího čísla jednací hromadně (IGSpis.ZmenaCjExtHromadne).*/
	interface GSpisZmenaCjExtHromadneRequestDto {
		/**Identifikátory.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Externí číslo jednací.*/
		CjExt?: string|null;
	}
	const enum GSpisZmenaCjExtHromadneRequestDtoNames { Spisy = "Spisy", CjExt = "CjExt",}
	const enum GSpisZmenaCjExtHromadneRequestDtoFragments { Spisy = "*", CjExt = "*",}
	const enum GSpisZmenaCjExtHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", CjExt = "string",}
	const enum GSpisZmenaCjExtHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu externího čísla jednací hromadně (IGSpis.ZmenaCjExtHromadne).*/
	interface GSpisZmenaCjExtHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZmenaCjExtHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZmenaCjExtHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZmenaCjExtHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZmenaCjExtHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu (stringové) položky (např. poznámka) hromadně (IGSpis.ZmenaPolozkyHromadne).*/
	interface GSpisZmenaPolozkyHromadneRequestDto {
		/**Identifikátory.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Název položky úrovně wflspid.*/
		PolozkaWflspid?: Gordic.Wfl.Interface.ColWflspid|null;
		/**Název položky úrovně slspid.*/
		PolozkaSslspid?: Gordic.Ssl.Interface.ColSslspid|null;
		/**Nová hodnota položky.*/
		PolozkaNovaHodnota?: string|null;
	}
	const enum GSpisZmenaPolozkyHromadneRequestDtoNames { Spisy = "Spisy", PolozkaWflspid = "PolozkaWflspid", PolozkaSslspid = "PolozkaSslspid", PolozkaNovaHodnota = "PolozkaNovaHodnota",}
	const enum GSpisZmenaPolozkyHromadneRequestDtoFragments { Spisy = "*", PolozkaWflspid = "*", PolozkaSslspid = "*", PolozkaNovaHodnota = "*",}
	const enum GSpisZmenaPolozkyHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", PolozkaWflspid = "Gordic.Wfl.Interface.ColWflspid", PolozkaSslspid = "Gordic.Ssl.Interface.ColSslspid", PolozkaNovaHodnota = "string",}
	const enum GSpisZmenaPolozkyHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu (stringové) položky (např. poznámka) hromadně (IGSpis.ZmenaPolozkyHromadne).*/
	interface GSpisZmenaPolozkyHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZmenaPolozkyHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZmenaPolozkyHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZmenaPolozkyHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZmenaPolozkyHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu položky v profilu doručení hromadně (IGSpis.ZmenaPolozkyDoruceniHromadne).*/
	interface GSpisZmenaPolozkyDoruceniHromadneRequestDto {
		/**Identifikátory.*/
		Spisy?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Název položky.*/
		Polozka?: Gordic.Wfl.Interface.ColWflspio|null;
		/**Nová hodnota položky.*/
		NovaHodnota?: string|null;
	}
	const enum GSpisZmenaPolozkyDoruceniHromadneRequestDtoNames { Spisy = "Spisy", Polozka = "Polozka", NovaHodnota = "NovaHodnota",}
	const enum GSpisZmenaPolozkyDoruceniHromadneRequestDtoFragments { Spisy = "*", Polozka = "*", NovaHodnota = "*",}
	const enum GSpisZmenaPolozkyDoruceniHromadneRequestDtoTypes { Spisy = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", Polozka = "Gordic.Wfl.Interface.ColWflspio", NovaHodnota = "string",}
	const enum GSpisZmenaPolozkyDoruceniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu položky v profilu doručení hromadně (IGSpis.ZmenaPolozkyDoruceniHromadne).*/
	interface GSpisZmenaPolozkyDoruceniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZmenaPolozkyDoruceniHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZmenaPolozkyDoruceniHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZmenaPolozkyDoruceniHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZmenaPolozkyDoruceniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu umístění hromadně (IGSpis.ZmenaUmisteniHromadne).*/
	interface GSpisZmenaUmisteniHromadneRequestDto {
		/**Identifikátory.*/
		Spisy?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Umístění.*/
		Umisteni?: string|null;
		/**Zda se má provádět změna i u dokumentů, které mají umístění nastaveno (true), nebo se má provádět pouze u dokumentů, které měly tyto údaje dosud nevyplněné (false).*/
		OpravVyplnene?: boolean|null;
	}
	const enum GSpisZmenaUmisteniHromadneRequestDtoNames { Spisy = "Spisy", Umisteni = "Umisteni", OpravVyplnene = "OpravVyplnene",}
	const enum GSpisZmenaUmisteniHromadneRequestDtoFragments { Spisy = "*", Umisteni = "*", OpravVyplnene = "*",}
	const enum GSpisZmenaUmisteniHromadneRequestDtoTypes { Spisy = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Umisteni = "string", OpravVyplnene = "boolean",}
	const enum GSpisZmenaUmisteniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu umístění hromadně (IGSpis.ZmenaUmisteniHromadne).*/
	interface GSpisZmenaUmisteniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZmenaUmisteniHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZmenaUmisteniHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZmenaUmisteniHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZmenaUmisteniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu typu hromadně (IGSpis.ZmenaTypuDokumentuSpisuHromadne).*/
	interface GSpisZmenaTypuDokumentuSpisuHromadneRequestDto {
		/**Identifikátory.*/
		Spisy?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Identifikátor typu.*/
		IxsTyp?: string|null;
		/**Zda se má provádět změna pouze na neurčených.*/
		ZmenitPouzeNeurcen?: boolean|null;
	}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneRequestDtoNames { Spisy = "Spisy", IxsTyp = "IxsTyp", ZmenitPouzeNeurcen = "ZmenitPouzeNeurcen",}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneRequestDtoFragments { Spisy = "*", IxsTyp = "*", ZmenitPouzeNeurcen = "*",}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneRequestDtoTypes { Spisy = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", IxsTyp = "string", ZmenitPouzeNeurcen = "boolean",}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu typu hromadně (IGSpis.ZmenaTypuDokumentuSpisuHromadne).*/
	interface GSpisZmenaTypuDokumentuSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GSpisZmenaTypuDokumentuSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro připravení tisku doručenek (IGSpis.PripravTiskDorucenekDZDoWfltrpd).*/
	interface GSpisPripravTiskDorucenekDZDoWfltrpdRequestDto {
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Zda se majípřipravit pouze doposud netisknuté.*/
		PouzeNetisknute?: boolean|null;
	}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdRequestDtoNames { Ixp = "Ixp", PouzeNetisknute = "PouzeNetisknute",}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdRequestDtoFragments { Ixp = "*", PouzeNetisknute = "*",}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdRequestDtoTypes { Ixp = "string", PouzeNetisknute = "boolean",}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro připravení tisku doručenek (IGSpis.PripravTiskDorucenekDZDoWfltrpd).*/
	interface GSpisPripravTiskDorucenekDZDoWfltrpdResponseDto {
		/**Počet záznamů k tisku.*/
		readonly Pocet?: number|null;
		/**Výběr SXS.*/
		VyberSxs?: Gordic.Wfl.Interface.GSxsVyber[]|null;
	}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdResponseDtoNames { Pocet = "Pocet", VyberSxs = "VyberSxs",}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdResponseDtoFragments { Pocet = "*", VyberSxs = "*",}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdResponseDtoTypes { Pocet = "number", VyberSxs = "Gordic.Wfl.Interface.GSxsVyber[]",}
	const enum GSpisPripravTiskDorucenekDZDoWfltrpdResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení výchozích hodnot dokumentu (IGSpis.GetDefaultValues).*/
	interface GSpisGetDefaultValuesRequestDto extends Gordic.Ssl.Interface.GSslspidGetDefaultValuesRequestDto {
	}
	const enum GSpisGetDefaultValuesRequestDtoNames {}
	const enum GSpisGetDefaultValuesRequestDtoFragments {}
	const enum GSpisGetDefaultValuesRequestDtoTypes {}
	const enum GSpisGetDefaultValuesRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\IGSpisovyPlan.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Spisový plán - sslsspl.
	* @domain DRMS
	*/
	interface SpisovyPlan {
		/**Import spisového plánu z XML nsesss pro spisový plán*/
		import(rq?:Gordic.Ssl.Interface.GSpisovyPlanImportRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSpisovyPlanImportRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSpisovyPlanImportRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSpisovyPlanImportResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SpisovyPlan: ServiceBase & Catalog.SpisovyPlan;
	}
	const SpisovyPlan: Client["SpisovyPlan"];
}
declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro načtení informací o spisovém plánu.*/
	interface GSpisovyPlanImportRequestDto {
		/**Xml dokument*/
		XmlDocument?: any|null;
		/**Oddělovací znaménka.*/
		Separator?: string|null;
		/**.
		*     (default: "") Poznámka
		*/
		Poznamka?: string|null;
		/**(default: true) Kontrola spisového uzlu a existence spisového plánu.*/
		Kontrola?: boolean|null;
		/**Identifikátor (nepovinná položka)*/
		Identifikator?: string|null;
		/**Název spisového plánu (nepovinná položka)*/
		Nazev?: string|null;
	}
	const enum GSpisovyPlanImportRequestDtoNames { XmlDocument = "XmlDocument", Separator = "Separator", Poznamka = "Poznamka", Kontrola = "Kontrola", Identifikator = "Identifikator", Nazev = "Nazev",}
	const enum GSpisovyPlanImportRequestDtoFragments { XmlDocument = "*", Separator = "*", Poznamka = "*", Kontrola = "*", Identifikator = "*", Nazev = "*",}
	const enum GSpisovyPlanImportRequestDtoTypes { XmlDocument = "any", Separator = "string", Poznamka = "string", Kontrola = "boolean", Identifikator = "string", Nazev = "string",}
	const enum GSpisovyPlanImportRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení informací o spisovém plánu.*/
	interface GSpisovyPlanImportResponseDto {
		/**Identifikátor spisového plánu.*/
		spis_pl?: string|null;
	}
	const enum GSpisovyPlanImportResponseDtoNames { spis_pl = "spis_pl",}
	const enum GSpisovyPlanImportResponseDtoFragments { spis_pl = "*",}
	const enum GSpisovyPlanImportResponseDtoTypes { spis_pl = "string",}
	const enum GSpisovyPlanImportResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\IGSsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGSsl
	* @domain DRMS
	*/
	interface Ssl {
		/**Vrátí filtry pro počty na dashboardu.*/
		createDashboardCountFilters(rq?:Gordic.Ssl.Interface.GSslCreateDashboardCountFiltersRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslCreateDashboardCountFiltersRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslCreateDashboardCountFiltersRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GDashboardCountFiltersDto>>;
		/**Gets the dashboard counts.*/
		getDashboardCounts(rq?:Gordic.Ssl.Interface.GSslGetDashboardCountsRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslGetDashboardCountsRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslGetDashboardCountsRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GDashboardCountsDto>>;
		/**Vrátí informace o modulu pro dashboard.*/
		getDashboardModulInfo(rq?:Gordic.Ssl.Interface.GSslGetDashboardModulInfoRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslGetDashboardModulInfoRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslGetDashboardModulInfoRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslGetDashboardModulInfoResponseDto>>;
		/**Test, zda již proběhla instalace požadovaného skriptu z reinstalačního balíku do databáze.*/
		testGdzScriptInstalled(rq?:CallParams<{idAkce:string[]}>): _Task<{idAkce:string[]},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Ssl: ServiceBase & Catalog.Ssl;
	}
	const Ssl: Client["Ssl"];
}
declare namespace Gordic.Ssl.Interface {
	/**GSslCreateDashboardCountFiltersRequestDto*/
	interface GSslCreateDashboardCountFiltersRequestDto {
		/**(default: [false]) Filtrovaní na funkci [true] či na spisový uzel [false]. Pokud se nemá použít, pak je null.*/
		Vlastni?: boolean|null;
		/**(default: [false]) Ber ohled na agendu.*/
		SOhledemNaAgendu?: boolean|null;
		/**Gets or sets the pocet vlastnich dnu spisu pred terminem.*/
		PocetVlastnichDnuSpisuPredTerminem?: number|null;
	}
	const enum GSslCreateDashboardCountFiltersRequestDtoNames { Vlastni = "Vlastni", SOhledemNaAgendu = "SOhledemNaAgendu", PocetVlastnichDnuSpisuPredTerminem = "PocetVlastnichDnuSpisuPredTerminem",}
	const enum GSslCreateDashboardCountFiltersRequestDtoFragments { Vlastni = "*", SOhledemNaAgendu = "*", PocetVlastnichDnuSpisuPredTerminem = "*",}
	const enum GSslCreateDashboardCountFiltersRequestDtoTypes { Vlastni = "boolean", SOhledemNaAgendu = "boolean", PocetVlastnichDnuSpisuPredTerminem = "number",}
	const enum GSslCreateDashboardCountFiltersRequestDtoTypeLengths {}
	interface GSslGetDashboardCountsRequestDto extends Gordic.Ssl.Interface.GSslCreateDashboardCountFiltersRequestDto {
	}
	const enum GSslGetDashboardCountsRequestDtoNames { Vlastni = "Vlastni", SOhledemNaAgendu = "SOhledemNaAgendu", PocetVlastnichDnuSpisuPredTerminem = "PocetVlastnichDnuSpisuPredTerminem",}
	const enum GSslGetDashboardCountsRequestDtoFragments { Vlastni = "*", SOhledemNaAgendu = "*", PocetVlastnichDnuSpisuPredTerminem = "*",}
	const enum GSslGetDashboardCountsRequestDtoTypes { Vlastni = "boolean", SOhledemNaAgendu = "boolean", PocetVlastnichDnuSpisuPredTerminem = "number",}
	const enum GSslGetDashboardCountsRequestDtoTypeLengths {}
	interface GSslGetDashboardModulInfoRequestDto {
	}
	const enum GSslGetDashboardModulInfoRequestDtoNames {}
	const enum GSslGetDashboardModulInfoRequestDtoFragments {}
	const enum GSslGetDashboardModulInfoRequestDtoTypes {}
	const enum GSslGetDashboardModulInfoRequestDtoTypeLengths {}
	interface GSslGetDashboardModulInfoResponseDto {
		NazevRef?: string|null;
		NazevFun?: string|null;
		ZastupTxt?: string|null;
		ZkratkaSu?: string|null;
		DatLoginTxt?: string|null;
		Faze?: string|null;
		FazeTxt?: string|null;
	}
	const enum GSslGetDashboardModulInfoResponseDtoNames { NazevRef = "NazevRef", NazevFun = "NazevFun", ZastupTxt = "ZastupTxt", ZkratkaSu = "ZkratkaSu", DatLoginTxt = "DatLoginTxt", Faze = "Faze", FazeTxt = "FazeTxt",}
	const enum GSslGetDashboardModulInfoResponseDtoFragments { NazevRef = "*", NazevFun = "*", ZastupTxt = "*", ZkratkaSu = "*", DatLoginTxt = "*", Faze = "*", FazeTxt = "*",}
	const enum GSslGetDashboardModulInfoResponseDtoTypes { NazevRef = "string", NazevFun = "string", ZastupTxt = "string", ZkratkaSu = "string", DatLoginTxt = "string", Faze = "string", FazeTxt = "string",}
	const enum GSslGetDashboardModulInfoResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\IGSslspid.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGSslspid
	* @domain DRMS
	*/
	interface Sslspid {
		/**Vrátí data sslspidu.*/
		read(rq?:Gordic.Ssl.Interface.GSslspidReadRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidReadRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslspidDto>>;
		/**Vrátí seznam sslspidů dle zadaných kritérií.*/
		list(rq?:Gordic.Ssl.Interface.GSslspidFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslspidDto>>;
		/**Vrátí seznam sslspidů dle zadaných kritérií.
		*     !!! NEKONTROLUJE OPRÁVNĚNÍ !!!
		*/
		listBezKontrolyOpravneni(rq?:Gordic.Ssl.Interface.GSslspidFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSslspidDto>>;
		/**Předplnění mailu dle záznamu v tabulce wfldtom*/
		predplnitMail(rq?:Gordic.Wfl.Interface.GWFLPredplnitMailRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GWFLPredplnitMailRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GWFLPredplnitMailRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GWFLPredplnitMailResponseDto>>;
		/**Úprava dat eko dokumentu.*/
		opravaDokumentuProEko(rq?:Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GSslspidOpravaDokumentuProEkoResponseDto>>;
		/**Vrátí parametry pro políčka gridu.*/
		getColumnParams(rq?:Gordic.Ssl.Interface.GSslspidGetColumnParamsRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidGetColumnParamsRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidGetColumnParamsRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslspidGetColumnParamsResponseDto>>;
		/**Vrátí parametry pro custoizovatelsný seznam sslspidů.*/
		getCustomListParamsCustomList(rq?:Gordic.Ssl.Interface.GSslspidGetCustomListParamsRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidGetCustomListParamsRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidGetCustomListParamsRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslspidGetCustomListParamsResponseDto>>;
		/**Vrátí počet sslspidů dle zadaných kritérií.*/
		count(rq?:Gordic.Ssl.Interface.GSslspidFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Wfl.Interface.GCountDto>>;
		/**Vrátí počet sslspidů dle zadaných kritérií.
		*     !!! NEKONTROLUJE OPRÁVNĚNÍ !!!
		*/
		countBezKontrolyOpravneni(rq?:Gordic.Ssl.Interface.GSslspidFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Wfl.Interface.GCountDto>>;
		/**Vrátí dokument s přednastavenými výchozími hodnotami.*/
		getDefaultValues(rq?:Gordic.Ssl.Interface.GSslspidGetDefaultValuesRequestDto|CallParams<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidGetDefaultValuesRequestDto>>): _Task<GServiceReadRequest<Gordic.Ssl.Interface.GSslspidGetDefaultValuesRequestDto>,GServiceReadResponse<Gordic.Ssl.Interface.GSslspidDto>>;
		/**Počet kopii dokumentu*/
		getPocetKopii(rq?:Gordic.Ssl.Interface.GSslsPidGetPocetKopiiRequesttDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GSslsPidGetPocetKopiiRequesttDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GSslsPidGetPocetKopiiRequesttDto>,GServiceActionResponse<Gordic.Ssl.Interface.GSslsPidGetPocetKopiiResponsetDto>>;
		/**Naplnění datasetu pro práci s Wordem z IXp*/
		naplnEleFromIxp(rq?:Gordic.Ssl.Interface.GSslNaplnEleFromIxpRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GSslNaplnEleFromIxpRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GSslNaplnEleFromIxpRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GSslNaplnEleFromIxpResponsetDto>>;
		/**Naplnění datasetu pro práci s Wordem*/
		naplnEle(rq?:Gordic.Ssl.Interface.GSslNaplnEleRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GSslNaplnEleRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GSslNaplnEleRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GSslNaplnEleResponsetDto>>;
		pripravSouborDolozky(rq?:Gordic.Ssl.Interface.GSslPripravSouborDolozkyRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GSslPripravSouborDolozkyRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GSslPripravSouborDolozkyRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GSslPripravSouborDolozkyResponseDto>>;
		ulozeniSouboruDolozky(rq?:Gordic.Ssl.Interface.GSslUlozeniSouboruDolozkyRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GSslUlozeniSouboruDolozkyRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GSslUlozeniSouboruDolozkyRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GSslUlozeniSouboruDolozkyResponseDto>>;
		/**Gets the lze editovat spousteci udalost a popis.*/
		getLzeEditovatSpousteciUdalostAPopis(rq?:Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GetLzeEditovatSpousteciUdalostAPopisResponseDto>>;
		/**Gets the vlastnosti uzivatelske sloupce.*/
		getVlastnostiUzivatelskeSloupce(rq?:Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GWflspidGetVlastnostiUzivatelskeSloupceResponseDto>>;
		/**Vrátí seznam prehled redistribuce*/
		seznamPrehledRedistribuceDokumentu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.DokSpisListDto>>;
		/**Vrátí dostupné formuláře pro typ dokumentu.*/
		seznamDostupnychFormularuDokumentu(rq?:Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamDostupnychFormularuDokumentuRequestDto>,GServiceListResponse<Gordic.Wfl.Interface.GSslvfrmDto>>;
		/**Vrátí formuláře přiřazené konkrétnímu dokumentu.*/
		seznamFormularuKDokumentu(rq?:Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GSeznamFormularuKDokumentuRequestDto>,GServiceListResponse<Gordic.Wfl.Interface.GSslvfrpDto>>;
		/**Přidá formuláře k dokumentu.*/
		pridejFormulareKDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GPridejFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GPridejFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GPridejFormulareKDokumentuResponseDto>>;
		/**Odstraní (konkrétní) formuláře z dokumentu (ostatní ponechá).*/
		odeberFormulareZDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GOdeberFormulareZDokumentuResponseDto>>;
		/**Odebere stávající formuláře z dokumentu a přiřadí k němu nové.*/
		nastavFormulareKDokumentu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GNastavFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GNastavFormulareKDokumentuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GNastavFormulareKDokumentuResponseDto>>;
		/**Předá dokument.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predat(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatResponseDto>>;
		/**Předá dokument dle SSL.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatSsl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSslRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSslRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatSslResponseDto>>;
		/**Předá dokumenty hromadně.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatHromadneResponseDto>>;
		/**Převezme dokumenty.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitResponseDto>>;
		/**Převezme dokumenty hromadně.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitHromadneResponseDto>>;
		/**Převezme dokumenty hromadně dle Wfl.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitHromadneWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitHromadneWflResponseDto>>;
		/**Převezme dokumenty hromadně dle redistribuce.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		prevzitVRedistribuciHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitVRedistribuciHromadneResponseDto>>;
		/**Předá dokumenty hromadně dle Wfl.
		*     IxsRefOd a IxsRefDo se vyplní, v případě že předává buď zástupný referent nebo se předává zástupnému referentovi danné funkce.
		*/
		predatHromadneWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatHromadneWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatHromadneWflResponseDto>>;
		/**Přidělí dokument.*/
		pridelit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitResponseDto>>;
		/**Přidělí dokumenty hromadně.*/
		pridelitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitHromadneResponseDto>>;
		/**Hromadné přidělení dokumentu - žádost o schválení v EPK*/
		pridelitSchvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitSchvalitHromadneResponseDto>>;
		/**Hromadné předání dokumentů - žádost o předání v EPK*/
		predatSchvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPredatSchvalitHromadneResponseDto>>;
		/**Stop redistribuce dokumentu.*/
		stopRedistribuce(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStopRedistribuceResponseDto>>;
		/**Stop redistribuce dokumentů hromadně.*/
		stopRedistribuceHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStopRedistribuceHromadneResponseDto>>;
		/**Zastaví redistribuci dokumentu.*/
		odmitnutiRedistribuce(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceResponseDto>>;
		/**Zastaví redistribuci dokumentů hromadně.*/
		odmitnutiRedistribuceHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdmitnutiRedistribuceHromadneResponseDto>>;
		/**Hromadně schválí dokumenty.*/
		schvalitHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitHromadneResponseDto>>;
		/**Hromadně zruší schválení dokumentů.*/
		zrusitSchvaleniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitSchvaleniHromadneResponseDto>>;
		/**Přidá změnu do historie dokumentu.*/
		pridatZmenuDoHistorie(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZmenuDoHistorieResponseDto>>;
		/**Přidělí dokument do wfl.*/
		pridelitDoWfl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflResponseDto>>;
		/**Hromadně přidělí dokumenty do WFL.*/
		pridelitDoWflHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflHromadneResponseDto>>;
		/**Hromadně přidělí dokumenty do WFL přes temp.*/
		pridelitDoWflPresTempHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridelitDoWflPresTempHromadneResponseDto>>;
		/**Hromadně převezme dokumenty do WFL přes temp.*/
		prevzitDoWflPresTempHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPrevzitDoWflPresTempHromadneResponseDto>>;
		/**Hromadně přidá žádost o podpis dokumentů.*/
		pridatZadostOPodpisHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisHromadneResponseDto>>;
		/**Zneplatnění žádosti o podpis do podpisové knihy*/
		zneplatnitZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZneplatnitZadostOPodpisResponseDto>>;
		/**Změna priority žádosti o podpis.*/
		zmenitPriorituZadostiOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZmenitPriorituZadostiOPodpisResponseDto>>;
		/**Odstranění žádosti o podpis.*/
		odstranitZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisResponseDto>>;
		/**Odstranění nepovinných a nepovinně volitelných žádosti o podpis, které nemají vyplněnou osobu.*/
		odstranitZadostOPodpisNepovinne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdstranitZadostOPodpisNepovinneResponseDto>>;
		/**Odstranění požadavku schvalovacího procesu.*/
		schvalovaciProcesOdstranitPozadavek(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesOdstranitPozadavekResponseDto>>;
		/**Vložení žádosti (připravené akt=600) o podpis do podpisové knihy.*/
		vlozZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentVlozZadostOPodpisResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy.*/
		pridatZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentPridatZadostOPodpisResponseDto>>;
		/**Vloží žádost o podpis do podpisové knihy.*/
		schvalovaciProcesVlozPredpisDoEpk(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesVlozPredpisDoEpkResponseDto>>;
		/**Datum posunuté o X pracovních dní.*/
		datumPosunutyDlePracDni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentDatumPosunutyDlePracDniResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy.*/
		schvalovaciProcesPripravUkon(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravUkonResponseDto>>;
		/**Vytvoření předpisu EPK (více úkonů pro EPK) do stavu přípravy, následuje obvykle vyplnění osob a vložení do EPK.*/
		schvalovaciProcesPripravPredpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPripravPredpisResponseDto>>;
		/**Přidání žádosti o podpis do podpisové knihy, předplnění dle wfltepk.*/
		schvalovaciProcesPredpisPredpln(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesPredpisPredplnResponseDto>>;
		/**Editace žádosti/úkonu schval. předpisu.*/
		schvalovaciProcesEditaceUkonu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalovaciProcesEditaceUkonuResponseDto>>;
		/**Vyřízení žádosti o podpis.*/
		vyridZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentVyridZadostOPodpisResponseDto>>;
		/**Test vyřízení žádosti o podpis.*/
		vyridZadostOPodpisTest(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentTestUspesnostiVyrizeniZadostiOPodpisResponseDto>>;
		/**Schválení a vyřízení dokumentu (pouze ve vrstvě wfl).*/
		schvalitDokumentAVyridZadostOPodpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitDokumentAVyridZadostOPodpisResponseDto>>;
		/**Schválení dokumentu (pouze ve vrstvě wfl).*/
		schvalit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentSchvalitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentSchvalitResponseDto>>;
		/**Zrušení schválení dokumentu (pouze ve vrstvě wfl).*/
		odschvalit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdschvalitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOdschvalitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOdschvalitResponseDto>>;
		/**Stornování dokumentu.*/
		stornovat(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStornovatResponseDto>>;
		/**Zrušení storna dokumentu.*/
		zrusitStorno(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitStornoResponseDto>>;
		/**Hromadné zrušení storna dokumentů.*/
		zrusitStornoHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentZrusitStornoHromadneResponseDto>>;
		/**Oprava editovatelných položek WFL profilu dokumentu.*/
		oprava(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOpravitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentOpravitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentOpravitResponseDto>>;
		/**Nastavení wfl příznaků fyzické a elektronické podoby dokumentu*/
		nastavWflPriznakySFyzSEle(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentNastavWflPriznakySFyzSEleResponseDto>>;
		/**Úprava věci dokumentu.*/
		updateVecWflspid(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentUpdateVecWflspidResponseDto>>;
		/**Úprava poznámky dokumentu.*/
		updatePoznamkaWfldpzn(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentUpdatePoznamkaWfldpznResponseDto>>;
		/**Vrátí pro dannou písemnost a spis pořadové číslo písemnosti v spisu. Nepatří-li písemnost do spisu, vrací GInt32.Null*/
		poradoveCisloVSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPoradoveCisloVSpisuResponseDto>>;
		/**Vrátí identifikátor posledně vloženého dokumentu do spisu.*/
		posledniVlozenyDokument(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPosledniVlozenyDokumentResponseDto>>;
		/**Vytvoří spis pro interface.*/
		vytvoritSpisProInterface(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisProInterfaceResponseDto>>;
		/**Vytvoreni typového spisu.*/
		vytvoritTypovySpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritTypovySpisResponseDto>>;
		/**Vytvoreni spisu.*/
		vytvoritSpis(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisResponseDto>>;
		/**Vytvoreni spisu bez iniciační písemnosti.*/
		vytvoritSpisBezIniciacniPisemnosti(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDto>>;
		/**Zrušení vyřízení dokumentu.*/
		zruseniVyrizeni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniResponseDto>>;
		/**Předání do externí agendy která není IS.*/
		predaniDoExterniAgendy(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPredaniDoExterniAgendyResponseDto>>;
		/**Převzetí z externí agendy která není IS.*/
		prevzitZExterniAgendy(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrevzitZExterniAgendyResponseDto>>;
		/**Informovat externí agendu / systém o existenci dokumentu / spisu.*/
		informovatExterniAgendu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentInformovatExterniAgenduResponseDto>>;
		/**Stornování dokumentu.*/
		stornovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentStornovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentStornovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentStornovaniResponseDto>>;
		/**Ztracení dokumentu.*/
		ztraceni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZtraceniResponseDto>>;
		/**Znovupodání dokumentu.*/
		znovupodani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZnovupodaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZnovupodaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZnovupodaniResponseDto>>;
		/**Nabytí právní moci.*/
		nabytiPravniMoci(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNabytiPravniMociRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNabytiPravniMociRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNabytiPravniMociResponseDto>>;
		/**Nalezení dokumentu.*/
		nalezeni(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNalezeniResponseDto>>;
		/**Přerušení (pozastavení) vyřizování dokumentu.*/
		prerusitVyrizovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniResponseDto>>;
		/**Přerušení (pozastavení) vyřizování dokumentu hromadně.*/
		prerusitVyrizovaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPrerusitVyrizovaniHromadneResponseDto>>;
		/**Obnovení vyřizování dokumentu.*/
		obnovitVyrizovani(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniResponseDto>>;
		/**Obnovení vyřizování dokumentu hromadně.*/
		obnovitVyrizovaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentObnovitVyrizovaniHromadneResponseDto>>;
		/**Nalezení dokumentu hromadně.*/
		nalezeniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNalezeniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNalezeniHromadneResponseDto>>;
		/**Zrušení vyřízení dokumentů hromadně.*/
		zruseniVyrizeniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniVyrizeniHromadneResponseDto>>;
		/**Ztracení dokumentů hromadně.*/
		ztraceniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZtraceniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZtraceniHromadneResponseDto>>;
		/**Editaci nebo přidání dílčího termínu hromadně.*/
		editaceDilcihoTerminuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEditaceDilcihoTerminuHromadneResponseDto>>;
		/**Přidá uživatelskou poznámku hromadně.*/
		pridaniUzivatelskePoznamkyHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPridaniUzivatelskePoznamkyHromadneResponseDto>>;
		/**Nová kopie dokumentu.*/
		novaKopie(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopieRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopieRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopieResponseDto>>;
		/**Přiřazení dokumentu ke spisu.*/
		priraditKeSpisu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuResponseDto>>;
		/**Zrušení / odebrání přiřazení dokumentu ke spisu.*/
		priraditKeSpisuZrusit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPriraditKeSpisuZrusitResponseDto>>;
		/**Vyřízení dokumentu.*/
		vyridit(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyriditResponseDto>>;
		/**Vyřízení dokumentu.*/
		vyriditVlozeneVeSpisuProStarouMetodiku(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDto>>;
		/**Rozšíří profil dokumentu do SSL.*/
		rozsirProfilWflPisemnostiDoSsl(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentRozsirProfilWflPisemnostiDoSslResponseDto>>;
		/**Vytvoření externího subjektu, podání dokumentu, vytvoření ČJ, vytvoření spisu, odeslání.*/
		esuCjOdes(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEsuCjOdesRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEsuCjOdesRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEsuCjOdesResponseDto>>;
		/**Vytvoření vlastních dokumentů a vložení do spisů hromadně.*/
		vytvorDokumentAVlozDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDto>>;
		/**Nalezení dokumentů posledně vložených do spisů.*/
		najdiDokPoslVlozDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDto>>;
		/**Hromadná změna spisového znaku.*/
		zmenaSpisovehoZnakuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaSpisovehoZnakuHromadneResponseDto>>;
		/**Hromadná změna IRP.*/
		zmenaIRPHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaIRPHromadneResponseDto>>;
		/**Hromadná změna věci.*/
		zmenaVeciHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaVeciHromadneResponseDto>>;
		/**Hromadná změna hodnoty vlastnosti.*/
		zmenaHodnotyVlastnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaHodnotyVlastnostiHromadneResponseDto>>;
		/**Hromadné přidání vlastnosti.*/
		pridaniVlastnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentPridaniVlastnostiHromadneResponseDto>>;
		/**Hromadná změna přístupu k dokumentu.*/
		zmenaPristupuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuHromadneResponseDto>>;
		/**Hromadné nastavení první přílohy jako el. obraz (pokud ještě dokument el. obraz nemá).*/
		nastavitPrvniElPrilohuJakoObrazHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDto>>;
		/**Hromadně vytvoří duplikáty z šablony ixpSablony a vloží je do seznamu spisů.*/
		vytvoritDuplikatAVlozitDoSpisuHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDto>>;
		/**Hromadné odstranění žádosti EPK.*/
		zruseniZadostiEpkHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZruseniZadostiEpkHromadneResponseDto>>;
		/**Hromadná změna typu dokumentu*/
		zmenaTypuPisemnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaTypuPisemnostiHromadneResponseDto>>;
		/**Hromadná změna přístupu k dokumentu.*/
		zmenaPristupuRPHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuRPHromadneResponseDto>>;
		/**Hromadné odeslání dokumentů na odesílatele (pro vlastní se dohledá odesílatel ze spisu ve kterém mohou být vloženy).*/
		odeslaniHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentOdeslaniHromadneResponseDto>>;
		/**Hromadné vyřízení dokumentů.*/
		vyrizeniPisemnostiHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentVyrizeniPisemnostiHromadneResponseDto>>;
		/**Hromadná evidence dokumentů do ssl.*/
		evidenceDoSslHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEvidenceDoSslHromadneResponseDto>>;
		/**Změna přístupu dokumentu.*/
		zmenaPristupu(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentZmenaPristupuRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentZmenaPristupuResponseDto>>;
		/**Vytvoření nové kopie dokumentu s předáním.*/
		novaKopiePisemnostiSPredanim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPredanimResponseDto>>;
		/**Vytvoření nové kopie dokumentu s přidělením.*/
		novaKopiePisemnostiSPridelenim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSPridelenimResponseDto>>;
		/**Vytvoření nové kopie písemnosti s založením ČJ a předáním.*/
		novaKopiePisemnostiSZalozenimCjAPredanim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDto>>;
		/**Vytvoření nové kopie písemnosti s založením ČJ a přidělením.*/
		novaKopiePisemnostiSZalozenimCjAPridelenim(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDto>>;
		/**Zaevidování emailu dle identifikátoru.*/
		emailGetFirstHash256(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256RequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256RequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEmailGetFirstHash256ResponseDto>>;
		/**Kontrola typu a velikosti souboru.*/
		kontrolaTypuAVelikostiSouboru(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentKontrolaTypuAVelikostiSouboruResponseDto>>;
		/**Zaevidování souboru s možností vytěžení dat z wordu a možností přidání el. obrazu*/
		evidujDokument(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidujDokumentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentEvidujDokumentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentEvidujDokumentResponseDto>>;
		/**Přidání el. přílohy k dokumentu.*/
		appendAttachment(rq?:CallParams<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentAppendAttachmentRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Ssl.Interface.GDokumentAppendAttachmentRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Ssl.Interface.GDokumentAppendAttachmentResponseDto>>;
		/**Hromadně stornuje dokumenty.*/
		stornovatHromadne(rq?:CallParams<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatHromadneRequestDto>,throwExceptionNoPermission:boolean}>): _Task<{request:GServiceActionRequest<Gordic.Wfl.Interface.GDokumentStornovatHromadneRequestDto>,throwExceptionNoPermission:boolean},GServiceActionResponse<Gordic.Wfl.Interface.GDokumentStornovatHromadneResponseDto>>;
		/**Získá lidský název daného dokumentu*/
		getEntityName(rq?:Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GDokumentGetEntityNameRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GDokumentGetEntityNameResponsetDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Sslspid: ServiceBase & Catalog.Sslspid;
	}
	const Sslspid: Client["Sslspid"];
}
declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro načtení informací o dokumentu (IGSslspid.Read).*/
	interface GSslspidReadRequestDto extends Gordic.Wfl.Interface.GDokumentWflReadRequestDto {
	}
	const enum GSslspidReadRequestDtoNames { Ixp = "Ixp",}
	const enum GSslspidReadRequestDtoFragments { Ixp = "*",}
	const enum GSslspidReadRequestDtoTypes { Ixp = "string",}
	const enum GSslspidReadRequestDtoTypeLengths {}
	/**Vstupní parametry metody OpravaDokumentuProEko.*/
	interface GSslspidOpravaDokumentuProEkoRequestDto {
		/**Dokument.*/
		Dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
	}
	const enum GSslspidOpravaDokumentuProEkoRequestDtoNames { Dokument = "Dokument",}
	const enum GSslspidOpravaDokumentuProEkoRequestDtoFragments { Dokument = "*",}
	const enum GSslspidOpravaDokumentuProEkoRequestDtoTypes { Dokument = "Gordic.Ssl.Interface.GDokumentDto",}
	const enum GSslspidOpravaDokumentuProEkoRequestDtoTypeLengths {}
	/**Výstupní parametry metody OpravaDokumentuProEko.*/
	interface GSslspidOpravaDokumentuProEkoResponseDto {
		/**Datum a čas změny.*/
		DatumZmeny?: JsonDate|null;
	}
	const enum GSslspidOpravaDokumentuProEkoResponseDtoNames { DatumZmeny = "DatumZmeny",}
	const enum GSslspidOpravaDokumentuProEkoResponseDtoFragments { DatumZmeny = "*",}
	const enum GSslspidOpravaDokumentuProEkoResponseDtoTypes { DatumZmeny = "JsonDate",}
	const enum GSslspidOpravaDokumentuProEkoResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení parametrů (IGSslspid.GetCustomListParams).*/
	interface GSslspidGetCustomListParamsRequestDto extends Gordic.Ssl.Interface.GSslspidGetColumnParamsRequestDto {
	}
	const enum GSslspidGetCustomListParamsRequestDtoNames { VlastnostiUzivatelskeSloupceIxxs = "VlastnostiUzivatelskeSloupceIxxs",}
	const enum GSslspidGetCustomListParamsRequestDtoFragments { VlastnostiUzivatelskeSloupceIxxs = "*",}
	const enum GSslspidGetCustomListParamsRequestDtoTypes { VlastnostiUzivatelskeSloupceIxxs = "string",}
	const enum GSslspidGetCustomListParamsRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení parametrů (IGSslspid.GetCustomListParams).*/
	interface GSslspidGetCustomListParamsResponseDto extends Gordic.Ssl.Interface.GSslspidGetColumnParamsResponseDto {
		/**The SSL rem dokd*/
		ssl_rem_dokd?: number|null;
		/**The gin_n23_vedd*/
		gin_n23_vedd?: number|null;
		/**The SSL hled zvecp*/
		ssl_hled_zvecp?: number|null;
		/**Název funkčního místa aktuálně přihlášeného uživatele.*/
		AktFunkceNazev?: string|null;
		/**Licence*/
		LicAdr?: string|null;
		/**Licence*/
		DebugMode?: boolean|null;
	}
	const enum GSslspidGetCustomListParamsResponseDtoNames { ssl_rem_dokd = "ssl_rem_dokd", gin_n23_vedd = "gin_n23_vedd", ssl_hled_zvecp = "ssl_hled_zvecp", AktFunkceNazev = "AktFunkceNazev", LicAdr = "LicAdr", DebugMode = "DebugMode", IsStaraMetodikaSsl = "IsStaraMetodikaSsl", ssl_term_pouz = "ssl_term_pouz", wfl_typspisy = "wfl_typspisy", gin_rad_konao = "gin_rad_konao", ssl_rad_makspis = "ssl_rad_makspis", ssl_uzooznacfun = "ssl_uzooznacfun", existLicCertFormulare = "existLicCertFormulare", StavUkonuEpkVisible = "StavUkonuEpkVisible", IxsFun = "IxsFun", IxsSu = "IxsSu", DokumentAktZnackaLabel = "DokumentAktZnackaLabel", SpisAktZnackaLabel = "SpisAktZnackaLabel", ssl_sez_pozn = "ssl_sez_pozn", ssl_uziv_sl_an = "ssl_uziv_sl_an", ssl_uziv_sla2n = "ssl_uziv_sla2n", ssl_uziv_sla3n = "ssl_uziv_sla3n", ssl_uziv_sl_bn = "ssl_uziv_sl_bn", ssl_uziv_slb2n = "ssl_uziv_slb2n", ssl_uziv_slb3n = "ssl_uziv_slb3n", gin_ele_dmspres = "gin_ele_dmspres", gin_n23_vecsk = "gin_n23_vecsk", IsPovolenePouzitiVlastnosti = "IsPovolenePouzitiVlastnosti", TestMinDbVersion524XXX002x34524XXX003x23 = "TestMinDbVersion524XXX002x34524XXX003x23", TestMinDbVersionProVecneSkupiny = "TestMinDbVersionProVecneSkupiny", VlastnostiUzivatelskeSloupce = "VlastnostiUzivatelskeSloupce",}
	const enum GSslspidGetCustomListParamsResponseDtoFragments { ssl_rem_dokd = "*", gin_n23_vedd = "*", ssl_hled_zvecp = "*", AktFunkceNazev = "*", LicAdr = "*", DebugMode = "*", IsStaraMetodikaSsl = "*", ssl_term_pouz = "*", wfl_typspisy = "*", gin_rad_konao = "*", ssl_rad_makspis = "*", ssl_uzooznacfun = "*", existLicCertFormulare = "*", StavUkonuEpkVisible = "*", IxsFun = "*", IxsSu = "*", DokumentAktZnackaLabel = "*", SpisAktZnackaLabel = "*", ssl_sez_pozn = "*", ssl_uziv_sl_an = "*", ssl_uziv_sla2n = "*", ssl_uziv_sla3n = "*", ssl_uziv_sl_bn = "*", ssl_uziv_slb2n = "*", ssl_uziv_slb3n = "*", gin_ele_dmspres = "*", gin_n23_vecsk = "*", IsPovolenePouzitiVlastnosti = "*", TestMinDbVersion524XXX002x34524XXX003x23 = "*", TestMinDbVersionProVecneSkupiny = "*", VlastnostiUzivatelskeSloupce = "*",}
	const enum GSslspidGetCustomListParamsResponseDtoTypes { ssl_rem_dokd = "number", gin_n23_vedd = "number", ssl_hled_zvecp = "number", AktFunkceNazev = "string", LicAdr = "string", DebugMode = "boolean", IsStaraMetodikaSsl = "boolean", ssl_term_pouz = "number", wfl_typspisy = "number", gin_rad_konao = "number", ssl_rad_makspis = "number", ssl_uzooznacfun = "number", existLicCertFormulare = "boolean", StavUkonuEpkVisible = "boolean", IxsFun = "string", IxsSu = "string", DokumentAktZnackaLabel = "string", SpisAktZnackaLabel = "string", ssl_sez_pozn = "number", ssl_uziv_sl_an = "string", ssl_uziv_sla2n = "string", ssl_uziv_sla3n = "string", ssl_uziv_sl_bn = "string", ssl_uziv_slb2n = "string", ssl_uziv_slb3n = "string", gin_ele_dmspres = "number", gin_n23_vecsk = "number", IsPovolenePouzitiVlastnosti = "boolean", TestMinDbVersion524XXX002x34524XXX003x23 = "boolean", TestMinDbVersionProVecneSkupiny = "boolean", VlastnostiUzivatelskeSloupce = "Gordic.Wfl.Interface.UzivSloupceSeznamuDto[]",}
	const enum GSslspidGetCustomListParamsResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení parametrů (IGSslspid.GetCustomListParams).*/
	interface GSslspidGetColumnParamsRequestDto extends Gordic.Wfl.Interface.GWflspidGetColumnParamsRequestDto {
	}
	const enum GSslspidGetColumnParamsRequestDtoNames { VlastnostiUzivatelskeSloupceIxxs = "VlastnostiUzivatelskeSloupceIxxs",}
	const enum GSslspidGetColumnParamsRequestDtoFragments { VlastnostiUzivatelskeSloupceIxxs = "*",}
	const enum GSslspidGetColumnParamsRequestDtoTypes { VlastnostiUzivatelskeSloupceIxxs = "string",}
	const enum GSslspidGetColumnParamsRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení parametrů (IGSslspid.GetColumnParams).*/
	interface GSslspidGetColumnParamsResponseDto extends Gordic.Wfl.Interface.GWflspidGetColumnParamsResponseDto {
	}
	const enum GSslspidGetColumnParamsResponseDtoNames { IsStaraMetodikaSsl = "IsStaraMetodikaSsl", ssl_term_pouz = "ssl_term_pouz", wfl_typspisy = "wfl_typspisy", gin_rad_konao = "gin_rad_konao", ssl_rad_makspis = "ssl_rad_makspis", ssl_uzooznacfun = "ssl_uzooznacfun", existLicCertFormulare = "existLicCertFormulare", StavUkonuEpkVisible = "StavUkonuEpkVisible", IxsFun = "IxsFun", IxsSu = "IxsSu", DokumentAktZnackaLabel = "DokumentAktZnackaLabel", SpisAktZnackaLabel = "SpisAktZnackaLabel", ssl_sez_pozn = "ssl_sez_pozn", ssl_uziv_sl_an = "ssl_uziv_sl_an", ssl_uziv_sla2n = "ssl_uziv_sla2n", ssl_uziv_sla3n = "ssl_uziv_sla3n", ssl_uziv_sl_bn = "ssl_uziv_sl_bn", ssl_uziv_slb2n = "ssl_uziv_slb2n", ssl_uziv_slb3n = "ssl_uziv_slb3n", gin_ele_dmspres = "gin_ele_dmspres", gin_n23_vecsk = "gin_n23_vecsk", IsPovolenePouzitiVlastnosti = "IsPovolenePouzitiVlastnosti", TestMinDbVersion524XXX002x34524XXX003x23 = "TestMinDbVersion524XXX002x34524XXX003x23", TestMinDbVersionProVecneSkupiny = "TestMinDbVersionProVecneSkupiny", VlastnostiUzivatelskeSloupce = "VlastnostiUzivatelskeSloupce",}
	const enum GSslspidGetColumnParamsResponseDtoFragments { IsStaraMetodikaSsl = "*", ssl_term_pouz = "*", wfl_typspisy = "*", gin_rad_konao = "*", ssl_rad_makspis = "*", ssl_uzooznacfun = "*", existLicCertFormulare = "*", StavUkonuEpkVisible = "*", IxsFun = "*", IxsSu = "*", DokumentAktZnackaLabel = "*", SpisAktZnackaLabel = "*", ssl_sez_pozn = "*", ssl_uziv_sl_an = "*", ssl_uziv_sla2n = "*", ssl_uziv_sla3n = "*", ssl_uziv_sl_bn = "*", ssl_uziv_slb2n = "*", ssl_uziv_slb3n = "*", gin_ele_dmspres = "*", gin_n23_vecsk = "*", IsPovolenePouzitiVlastnosti = "*", TestMinDbVersion524XXX002x34524XXX003x23 = "*", TestMinDbVersionProVecneSkupiny = "*", VlastnostiUzivatelskeSloupce = "*",}
	const enum GSslspidGetColumnParamsResponseDtoTypes { IsStaraMetodikaSsl = "boolean", ssl_term_pouz = "number", wfl_typspisy = "number", gin_rad_konao = "number", ssl_rad_makspis = "number", ssl_uzooznacfun = "number", existLicCertFormulare = "boolean", StavUkonuEpkVisible = "boolean", IxsFun = "string", IxsSu = "string", DokumentAktZnackaLabel = "string", SpisAktZnackaLabel = "string", ssl_sez_pozn = "number", ssl_uziv_sl_an = "string", ssl_uziv_sla2n = "string", ssl_uziv_sla3n = "string", ssl_uziv_sl_bn = "string", ssl_uziv_slb2n = "string", ssl_uziv_slb3n = "string", gin_ele_dmspres = "number", gin_n23_vecsk = "number", IsPovolenePouzitiVlastnosti = "boolean", TestMinDbVersion524XXX002x34524XXX003x23 = "boolean", TestMinDbVersionProVecneSkupiny = "boolean", VlastnostiUzivatelskeSloupce = "Gordic.Wfl.Interface.UzivSloupceSeznamuDto[]",}
	const enum GSslspidGetColumnParamsResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení výchozích hodnot dokumentu (IGDokument.GetDefaultValues).*/
	interface GSslspidGetDefaultValuesRequestDto extends Gordic.Wfl.Interface.GWflspidGetDefaultValuesRequestDto {
	}
	const enum GSslspidGetDefaultValuesRequestDtoNames {}
	const enum GSslspidGetDefaultValuesRequestDtoFragments {}
	const enum GSslspidGetDefaultValuesRequestDtoTypes {}
	const enum GSslspidGetDefaultValuesRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\IGSslspidShared.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**Vstupní parametry metody pro načtení pořadového čísla dokuemntu ve spisu (IGSslspid.PoradoveCisloVSpisu).*/
	interface GDokumentPoradoveCisloVSpisuRequestDto {
		/**Identifikátor dokumentu ve spisu.*/
		Ixp?: string|null;
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
	}
	const enum GDokumentPoradoveCisloVSpisuRequestDtoNames { Ixp = "Ixp", IxpSpis = "IxpSpis",}
	const enum GDokumentPoradoveCisloVSpisuRequestDtoFragments { Ixp = "*", IxpSpis = "*",}
	const enum GDokumentPoradoveCisloVSpisuRequestDtoTypes { Ixp = "string", IxpSpis = "string",}
	const enum GDokumentPoradoveCisloVSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení pořadového čísla dokuemntu ve spisu (IGSslspid.PoradoveCisloVSpisu).*/
	interface GDokumentPoradoveCisloVSpisuResponseDto {
		/**Pořadové číslo dokumentu v spisu. Nepatří-li písemnost do spisu, vrací GInt32.Null.*/
		PoradoveCislo?: number|null;
	}
	const enum GDokumentPoradoveCisloVSpisuResponseDtoNames { PoradoveCislo = "PoradoveCislo",}
	const enum GDokumentPoradoveCisloVSpisuResponseDtoFragments { PoradoveCislo = "*",}
	const enum GDokumentPoradoveCisloVSpisuResponseDtoTypes { PoradoveCislo = "number",}
	const enum GDokumentPoradoveCisloVSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro načtení identifikátoru posledně vloženého dokumentu do spisu (IGSslspid.PosledniVlozenyDokument).*/
	interface GDokumentPosledniVlozenyDokumentRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
	}
	const enum GDokumentPosledniVlozenyDokumentRequestDtoNames { IxpSpis = "IxpSpis",}
	const enum GDokumentPosledniVlozenyDokumentRequestDtoFragments { IxpSpis = "*",}
	const enum GDokumentPosledniVlozenyDokumentRequestDtoTypes { IxpSpis = "string",}
	const enum GDokumentPosledniVlozenyDokumentRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro načtení identifikátoru posledně vloženého dokumentu do spisu (IGSslspid.PosledniVlozenyDokument).*/
	interface GDokumentPosledniVlozenyDokumentResponseDto {
		/**Identifikátor posledně vloženého dokumentu do spisu.*/
		Ixp?: string|null;
	}
	const enum GDokumentPosledniVlozenyDokumentResponseDtoNames { Ixp = "Ixp",}
	const enum GDokumentPosledniVlozenyDokumentResponseDtoFragments { Ixp = "*",}
	const enum GDokumentPosledniVlozenyDokumentResponseDtoTypes { Ixp = "string",}
	const enum GDokumentPosledniVlozenyDokumentResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření spisu pro interface (IGSslspid.VytvoritSpisProInterface).*/
	interface GDokumentVytvoritSpisProInterfaceRequestDto {
		/**Identifikátor dokumentu ze kterého se bude spis vytvářet.*/
		Ixp?: string|null;
		/**The ixp spis*/
		IxpSpis?: string|null;
		/**The rok*/
		Rok?: number|null;
		/**The poradi*/
		Poradi?: number|null;
		/**The denik*/
		Denik?: string|null;
	}
	const enum GDokumentVytvoritSpisProInterfaceRequestDtoNames { Ixp = "Ixp", IxpSpis = "IxpSpis", Rok = "Rok", Poradi = "Poradi", Denik = "Denik",}
	const enum GDokumentVytvoritSpisProInterfaceRequestDtoFragments { Ixp = "*", IxpSpis = "*", Rok = "*", Poradi = "*", Denik = "*",}
	const enum GDokumentVytvoritSpisProInterfaceRequestDtoTypes { Ixp = "string", IxpSpis = "string", Rok = "number", Poradi = "number", Denik = "string",}
	const enum GDokumentVytvoritSpisProInterfaceRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření spisu pro interface (IGSslspid.VytvoritSpisProInterface).*/
	interface GDokumentVytvoritSpisProInterfaceResponseDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
	}
	const enum GDokumentVytvoritSpisProInterfaceResponseDtoNames { IxpSpis = "IxpSpis",}
	const enum GDokumentVytvoritSpisProInterfaceResponseDtoFragments { IxpSpis = "*",}
	const enum GDokumentVytvoritSpisProInterfaceResponseDtoTypes { IxpSpis = "string",}
	const enum GDokumentVytvoritSpisProInterfaceResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření typového spisu (IGSslspid.VytvoritTypovySpis).*/
	interface GDokumentVytvoritTypovySpisRequestDto {
		/**Identifikátor zakládajícího dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Značka - např. při importu z jiného systému - pokud je značka známa.*/
		AktZnacka?: string|null;
		/**Název.*/
		Nazev?: string|null;
		/**Uživatelsky zadaná část ČJ.*/
		CjUz?: string|null;
		/**Číslo jednací EXT.*/
		CjExt?: string|null;
		/**Šablona typového spisu.*/
		IxsTss?: string|null;
	}
	const enum GDokumentVytvoritTypovySpisRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", AktZnacka = "AktZnacka", Nazev = "Nazev", CjUz = "CjUz", CjExt = "CjExt", IxsTss = "IxsTss",}
	const enum GDokumentVytvoritTypovySpisRequestDtoFragments { Ixp = "*", DatZmena = "*", AktZnacka = "*", Nazev = "*", CjUz = "*", CjExt = "*", IxsTss = "*",}
	const enum GDokumentVytvoritTypovySpisRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", AktZnacka = "string", Nazev = "string", CjUz = "string", CjExt = "string", IxsTss = "string",}
	const enum GDokumentVytvoritTypovySpisRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření typového spisu (IGSslspid.VytvoritTypovySpis).*/
	interface GDokumentVytvoritTypovySpisResponseDto {
		/**Identifikátor nově vytvořeného spisu.*/
		IxpSpis?: string|null;
		/**AktZnacka.*/
		AktZnacka?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**Denik.*/
		Denik?: string|null;
		/**Poradi.*/
		Poradi?: number|null;
	}
	const enum GDokumentVytvoritTypovySpisResponseDtoNames { IxpSpis = "IxpSpis", AktZnacka = "AktZnacka", Rok = "Rok", Denik = "Denik", Poradi = "Poradi",}
	const enum GDokumentVytvoritTypovySpisResponseDtoFragments { IxpSpis = "*", AktZnacka = "*", Rok = "*", Denik = "*", Poradi = "*",}
	const enum GDokumentVytvoritTypovySpisResponseDtoTypes { IxpSpis = "string", AktZnacka = "string", Rok = "number", Denik = "string", Poradi = "number",}
	const enum GDokumentVytvoritTypovySpisResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření spisu (IGSslspid.VytvoritSpis).*/
	interface GDokumentVytvoritSpisRequestDto {
		/**Identifikátor iniciačního dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny iniciačního dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Spisový deník.*/
		Denik?: string|null;
		/**Pořadové číslo v deníku.*/
		PorCislo?: number|null;
		/**Rok.*/
		Rok?: number|null;
		/**Identifikátor funkce řešiltele.*/
		IxsFunResitel?: string|null;
		/**Identifikátor funkce schvalovatele.*/
		IxsFunSchvalovatel?: string|null;
		/**StUtajId.*/
		StUtajId?: number|null;
	}
	const enum GDokumentVytvoritSpisRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxpSpis = "IxpSpis", Denik = "Denik", PorCislo = "PorCislo", Rok = "Rok", IxsFunResitel = "IxsFunResitel", IxsFunSchvalovatel = "IxsFunSchvalovatel", StUtajId = "StUtajId",}
	const enum GDokumentVytvoritSpisRequestDtoFragments { Ixp = "*", DatZmena = "*", IxpSpis = "*", Denik = "*", PorCislo = "*", Rok = "*", IxsFunResitel = "*", IxsFunSchvalovatel = "*", StUtajId = "*",}
	const enum GDokumentVytvoritSpisRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxpSpis = "string", Denik = "string", PorCislo = "number", Rok = "number", IxsFunResitel = "string", IxsFunSchvalovatel = "string", StUtajId = "number",}
	const enum GDokumentVytvoritSpisRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření spisu (IGSslspid.VytvoritSpis).*/
	interface GDokumentVytvoritSpisResponseDto {
		/**Identifikátor nově vytvořeného spisu.*/
		IxpSpis?: string|null;
	}
	const enum GDokumentVytvoritSpisResponseDtoNames { IxpSpis = "IxpSpis",}
	const enum GDokumentVytvoritSpisResponseDtoFragments { IxpSpis = "*",}
	const enum GDokumentVytvoritSpisResponseDtoTypes { IxpSpis = "string",}
	const enum GDokumentVytvoritSpisResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření spisu bez iniciační písemnosti (IGSslspid.VytvoritSpisBezIniciacniPisemnosti).*/
	interface GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDto {
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Spisový deník.*/
		Denik?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**Pořadové číslo v deníku.*/
		Poradi?: number|null;
		/**Typ spisu.*/
		IxsTyp?: string|null;
		/**Identifikátor funkce řešiltele.*/
		IxsFunResitel?: string|null;
		/**Identifikátor funkce schvalovatele.*/
		IxsFunSchvalovatel?: string|null;
	}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDtoNames { IxpSpis = "IxpSpis", Denik = "Denik", Rok = "Rok", Poradi = "Poradi", IxsTyp = "IxsTyp", IxsFunResitel = "IxsFunResitel", IxsFunSchvalovatel = "IxsFunSchvalovatel",}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDtoFragments { IxpSpis = "*", Denik = "*", Rok = "*", Poradi = "*", IxsTyp = "*", IxsFunResitel = "*", IxsFunSchvalovatel = "*",}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDtoTypes { IxpSpis = "string", Denik = "string", Rok = "number", Poradi = "number", IxsTyp = "string", IxsFunResitel = "string", IxsFunSchvalovatel = "string",}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření spisu bez iniciační písemnosti (IGSslspid.VytvoritSpisBezIniciacniPisemnosti).*/
	interface GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDto {
		/**Identifikátor nově vytvořeného spisu.*/
		IxpSpis?: string|null;
	}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDtoNames { IxpSpis = "IxpSpis",}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDtoFragments { IxpSpis = "*",}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDtoTypes { IxpSpis = "string",}
	const enum GDokumentVytvoritSpisBezIniciacniPisemnostiResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení vyřízení dokumentu (IGSslspid.ZruseniVyrizeniDokumentu).*/
	interface GDokumentZruseniVyrizeniRequestDto {
		/**Identifikátor spisu.*/
		Ixp?: string|null;
		/**Spisový deník.*/
		DatZmena?: JsonDate|null;
	}
	const enum GDokumentZruseniVyrizeniRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GDokumentZruseniVyrizeniRequestDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GDokumentZruseniVyrizeniRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GDokumentZruseniVyrizeniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení vyřízení dokumentu (IGSslspid.ZruseniVyrizeniDokumentu).*/
	interface GDokumentZruseniVyrizeniResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentZruseniVyrizeniResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentZruseniVyrizeniResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentZruseniVyrizeniResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentZruseniVyrizeniResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro předání do externí agendy která není IS (IGSslspid.PredaniDoExterniAgendy).*/
	interface GDokumentPredaniDoExterniAgendyRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor externího systému.*/
		IxsExt?: string|null;
	}
	const enum GDokumentPredaniDoExterniAgendyRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxsExt = "IxsExt",}
	const enum GDokumentPredaniDoExterniAgendyRequestDtoFragments { Ixp = "*", DatZmena = "*", IxsExt = "*",}
	const enum GDokumentPredaniDoExterniAgendyRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxsExt = "string",}
	const enum GDokumentPredaniDoExterniAgendyRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro předání do externí agendy která není IS (IGSslspid.PredaniDoExterniAgendy).*/
	interface GDokumentPredaniDoExterniAgendyResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentPredaniDoExterniAgendyResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentPredaniDoExterniAgendyResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentPredaniDoExterniAgendyResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentPredaniDoExterniAgendyResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro převzetí z externí agendy která není IS (IGSslspid.PrevzitZExterniAgendy).*/
	interface GDokumentPrevzitZExterniAgendyRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
	}
	const enum GDokumentPrevzitZExterniAgendyRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GDokumentPrevzitZExterniAgendyRequestDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GDokumentPrevzitZExterniAgendyRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GDokumentPrevzitZExterniAgendyRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro převzetí z externí agendy která není IS (IGSslspid.PrevzitZExterniAgendy).*/
	interface GDokumentPrevzitZExterniAgendyResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentPrevzitZExterniAgendyResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentPrevzitZExterniAgendyResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentPrevzitZExterniAgendyResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentPrevzitZExterniAgendyResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro informování externí agendy / systému o existenci dokumentu / spisu (IGSslspid.InformovatExterniAgendu).*/
	interface GDokumentInformovatExterniAgenduRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor externího systému.*/
		IxsExt?: string|null;
	}
	const enum GDokumentInformovatExterniAgenduRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxsExt = "IxsExt",}
	const enum GDokumentInformovatExterniAgenduRequestDtoFragments { Ixp = "*", DatZmena = "*", IxsExt = "*",}
	const enum GDokumentInformovatExterniAgenduRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxsExt = "string",}
	const enum GDokumentInformovatExterniAgenduRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro informování externí agendy / systému o existenci dokumentu / spisu (IGSslspid.InformovatExterniAgendu).*/
	interface GDokumentInformovatExterniAgenduResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentInformovatExterniAgenduResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentInformovatExterniAgenduResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentInformovatExterniAgenduResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentInformovatExterniAgenduResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro stornování dokumentu / spisu (IGSslspid.StornovaniDokumentu).*/
	interface GDokumentStornovaniRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Důvod stornování dokumentu.*/
		Duvod?: string|null;
	}
	const enum GDokumentStornovaniRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", Duvod = "Duvod",}
	const enum GDokumentStornovaniRequestDtoFragments { Ixp = "*", DatZmena = "*", Duvod = "*",}
	const enum GDokumentStornovaniRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", Duvod = "string",}
	const enum GDokumentStornovaniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro stornování dokumentu (IGSslspid.StornovaniDokumentu).*/
	interface GDokumentStornovaniResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentStornovaniResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentStornovaniResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentStornovaniResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentStornovaniResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro ztracení dokumentu (IGSslspid.ZtraceniDokumentu).*/
	interface GDokumentZtraceniRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Důvod ztracení dokumentu.*/
		Duvod?: string|null;
	}
	const enum GDokumentZtraceniRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", Duvod = "Duvod",}
	const enum GDokumentZtraceniRequestDtoFragments { Ixp = "*", DatZmena = "*", Duvod = "*",}
	const enum GDokumentZtraceniRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", Duvod = "string",}
	const enum GDokumentZtraceniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro ztracení dokumentu (IGSslspid.ZtraceniDokumentu).*/
	interface GDokumentZtraceniResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentZtraceniResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentZtraceniResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentZtraceniResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentZtraceniResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro znovupodání dokumentu (IGSslspid.ZnovupodaniDokumentu).*/
	interface GDokumentZnovupodaniRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor cílového spisového uzlu.*/
		IxsSuCil?: string|null;
		/**Identifikátor cílové funkce.*/
		IxsFunCil?: string|null;
		/**Účel distribuce.*/
		UcelDist?: string|null;
	}
	const enum GDokumentZnovupodaniRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxsSuCil = "IxsSuCil", IxsFunCil = "IxsFunCil", UcelDist = "UcelDist",}
	const enum GDokumentZnovupodaniRequestDtoFragments { Ixp = "*", DatZmena = "*", IxsSuCil = "*", IxsFunCil = "*", UcelDist = "*",}
	const enum GDokumentZnovupodaniRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxsSuCil = "string", IxsFunCil = "string", UcelDist = "string",}
	const enum GDokumentZnovupodaniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro znovupodání dokumentu (IGSslspid.ZnovupodaniDokumentu).*/
	interface GDokumentZnovupodaniResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentZnovupodaniResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentZnovupodaniResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentZnovupodaniResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentZnovupodaniResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro nabytí právní moci (IGSslspid.NabytiPravniMociDokumentu).*/
	interface GDokumentNabytiPravniMociRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Datum nabytí právní moci.*/
		Datum?: JsonDate|null;
	}
	const enum GDokumentNabytiPravniMociRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", Datum = "Datum",}
	const enum GDokumentNabytiPravniMociRequestDtoFragments { Ixp = "*", DatZmena = "*", Datum = "*",}
	const enum GDokumentNabytiPravniMociRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", Datum = "JsonDate",}
	const enum GDokumentNabytiPravniMociRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro nabytí právní moci (IGSslspid.NabytiPravniMociDokumentu).*/
	interface GDokumentNabytiPravniMociResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentNabytiPravniMociResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentNabytiPravniMociResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentNabytiPravniMociResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentNabytiPravniMociResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro nalezení dokumentu (IGSslspid.Nalezeni).*/
	interface GDokumentNalezeniRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
	}
	const enum GDokumentNalezeniRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GDokumentNalezeniRequestDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GDokumentNalezeniRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GDokumentNalezeniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro nalezení dokumentu (IGSslspid.Nalezeni).*/
	interface GDokumentNalezeniResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentNalezeniResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentNalezeniResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentNalezeniResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentNalezeniResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro přerušení (pozastavení) vyřizování dokumentu (IGSslspid.PrerusitVyrizovani).*/
	interface GDokumentPrerusitVyrizovaniRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Datum do kterého se má vyřízení přerušit.*/
		DatumDo?: JsonDate|null;
		/**Důvod.*/
		Duvod?: string|null;
	}
	const enum GDokumentPrerusitVyrizovaniRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", DatumDo = "DatumDo", Duvod = "Duvod",}
	const enum GDokumentPrerusitVyrizovaniRequestDtoFragments { Ixp = "*", DatZmena = "*", DatumDo = "*", Duvod = "*",}
	const enum GDokumentPrerusitVyrizovaniRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", DatumDo = "JsonDate", Duvod = "string",}
	const enum GDokumentPrerusitVyrizovaniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro přerušení (pozastavení) vyřizování dokumentu (IGSslspid.PrerusitVyrizovani).*/
	interface GDokumentPrerusitVyrizovaniResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentPrerusitVyrizovaniResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentPrerusitVyrizovaniResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentPrerusitVyrizovaniResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentPrerusitVyrizovaniResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro přerušení (pozastavení) vyřizování dokumentu hromadně (IGSslspid.PrerusitVyrizovaniHromadne).*/
	interface GDokumentPrerusitVyrizovaniHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Datum do kterého se má vyřízení přerušit.*/
		DatumDo?: JsonDate|null;
		/**Důvod.*/
		Duvod?: string|null;
	}
	const enum GDokumentPrerusitVyrizovaniHromadneRequestDtoNames { Dokumenty = "Dokumenty", DatumDo = "DatumDo", Duvod = "Duvod",}
	const enum GDokumentPrerusitVyrizovaniHromadneRequestDtoFragments { Dokumenty = "*", DatumDo = "*", Duvod = "*",}
	const enum GDokumentPrerusitVyrizovaniHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", DatumDo = "JsonDate", Duvod = "string",}
	const enum GDokumentPrerusitVyrizovaniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro přerušení (pozastavení) vyřizování dokumentu hromadně (IGSslspid.PrerusitVyrizovaniHromadne).*/
	interface GDokumentPrerusitVyrizovaniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentPrerusitVyrizovaniHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentPrerusitVyrizovaniHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentPrerusitVyrizovaniHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentPrerusitVyrizovaniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro obnovení vyřizování dokumentu (IGSslspid.ObnovitVyrizovani).*/
	interface GDokumentObnovitVyrizovaniRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
	}
	const enum GDokumentObnovitVyrizovaniRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena",}
	const enum GDokumentObnovitVyrizovaniRequestDtoFragments { Ixp = "*", DatZmena = "*",}
	const enum GDokumentObnovitVyrizovaniRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate",}
	const enum GDokumentObnovitVyrizovaniRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro obnovení vyřizování dokumentu (IGSslspid.ObnovitVyrizovani).*/
	interface GDokumentObnovitVyrizovaniResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentObnovitVyrizovaniResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentObnovitVyrizovaniResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentObnovitVyrizovaniResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentObnovitVyrizovaniResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro obnovení vyřizování dokumentu hromadně (IGSslspid.ObnovitVyrizovaniHromadne).*/
	interface GDokumentObnovitVyrizovaniHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
	}
	const enum GDokumentObnovitVyrizovaniHromadneRequestDtoNames { Dokumenty = "Dokumenty",}
	const enum GDokumentObnovitVyrizovaniHromadneRequestDtoFragments { Dokumenty = "*",}
	const enum GDokumentObnovitVyrizovaniHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]",}
	const enum GDokumentObnovitVyrizovaniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro obnovení vyřizování dokumentu hromadně (IGSslspid.ObnovitVyrizovaniHromadne).*/
	interface GDokumentObnovitVyrizovaniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentObnovitVyrizovaniHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentObnovitVyrizovaniHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentObnovitVyrizovaniHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentObnovitVyrizovaniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro nalezení dokumentu hromadně (IGSslspid.NalezeniHromadne).*/
	interface GDokumentNalezeniHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
	}
	const enum GDokumentNalezeniHromadneRequestDtoNames { Dokumenty = "Dokumenty",}
	const enum GDokumentNalezeniHromadneRequestDtoFragments { Dokumenty = "*",}
	const enum GDokumentNalezeniHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]",}
	const enum GDokumentNalezeniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro nalezení dokumentu hromadně (IGSslspid.NalezeniHromadne).*/
	interface GDokumentNalezeniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentNalezeniHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentNalezeniHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentNalezeniHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentNalezeniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení vyřízení dokumentů hromadně (IGSslspid.ZruseniVyrizeniHromadne).*/
	interface GDokumentZruseniVyrizeniHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
	}
	const enum GDokumentZruseniVyrizeniHromadneRequestDtoNames { Dokumenty = "Dokumenty",}
	const enum GDokumentZruseniVyrizeniHromadneRequestDtoFragments { Dokumenty = "*",}
	const enum GDokumentZruseniVyrizeniHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]",}
	const enum GDokumentZruseniVyrizeniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení vyřízení dokumentů hromadně (IGSslspid.ZruseniVyrizeniHromadne).*/
	interface GDokumentZruseniVyrizeniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZruseniVyrizeniHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZruseniVyrizeniHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZruseniVyrizeniHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZruseniVyrizeniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro ztracení dokumentů hromadně (IGSslspid.ZtraceniHromadne).*/
	interface GDokumentZtraceniHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Důvod ztracení dokumentu.*/
		Duvod?: string|null;
	}
	const enum GDokumentZtraceniHromadneRequestDtoNames { Dokumenty = "Dokumenty", Duvod = "Duvod",}
	const enum GDokumentZtraceniHromadneRequestDtoFragments { Dokumenty = "*", Duvod = "*",}
	const enum GDokumentZtraceniHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", Duvod = "string",}
	const enum GDokumentZtraceniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro ztracení dokumentů hromadně (IGSslspid.ZtraceniHromadne).*/
	interface GDokumentZtraceniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZtraceniHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZtraceniHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZtraceniHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZtraceniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro editaci nebo přidání dílčího termínu hromadně (IGSslspid.EditaceDilcihoTerminuHromadne).*/
	interface GDokumentEditaceDilcihoTerminuHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Důvod ztracení dokumentu.*/
		Duvod?: string|null;
		/**Termín dokumentu.*/
		DatTermin?: JsonDate|null;
	}
	const enum GDokumentEditaceDilcihoTerminuHromadneRequestDtoNames { Dokumenty = "Dokumenty", Duvod = "Duvod", DatTermin = "DatTermin",}
	const enum GDokumentEditaceDilcihoTerminuHromadneRequestDtoFragments { Dokumenty = "*", Duvod = "*", DatTermin = "*",}
	const enum GDokumentEditaceDilcihoTerminuHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", Duvod = "string", DatTermin = "JsonDate",}
	const enum GDokumentEditaceDilcihoTerminuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro editaci nebo přidání dílčího termínu hromadně (IGSslspid.EditaceDilcihoTerminuHromadne).*/
	interface GDokumentEditaceDilcihoTerminuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentEditaceDilcihoTerminuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentEditaceDilcihoTerminuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentEditaceDilcihoTerminuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentEditaceDilcihoTerminuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro přidání uživatelské poznámky hromadně (IGSslspid.PridaniUzivatelskePoznamkyHromadne).*/
	interface GDokumentPridaniUzivatelskePoznamkyHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Poznámka*/
		Poznamka?: string|null;
		/**Typ poznámky.*/
		TypPoznamky?: Gordic.Wfl.Interface.TypPoznamky|null;
	}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneRequestDtoNames { Dokumenty = "Dokumenty", Poznamka = "Poznamka", TypPoznamky = "TypPoznamky",}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneRequestDtoFragments { Dokumenty = "*", Poznamka = "*", TypPoznamky = "*",}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", Poznamka = "string", TypPoznamky = "Gordic.Wfl.Interface.TypPoznamky",}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro přidání uživatelské poznámky hromadně (IGSslspid.PridaniUzivatelskePoznamkyHromadne).*/
	interface GDokumentPridaniUzivatelskePoznamkyHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentPridaniUzivatelskePoznamkyHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro novou kopii dokumentu (IGSslspid.NovaKopie).*/
	interface GDokumentNovaKopieRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor kopie písemnosti.*/
		IxpKopie?: string|null;
		/**Pokuď originál nemá el. obraz, je tento parametr ignorován. true - elektronický obraz bude zkopírován i v kopii, false - vznikne kopie bez el. obrazu.*/
		KopirujElObraz?: boolean|null;
		/**Zda kopirovat i originalni verzi obrazu pred konverzi.*/
		KopirujOrigElObraz?: boolean|null;
		/**Pokuď originál nemá el. obraz, je tento parametr ignorován. true - elektronické přílohy budou zkopírovány i v kopii, false - vznikne kopie bez el. příloh.*/
		KopirujPrilohy?: boolean|null;
		/**Zda kopirovat i originalni verzi priloh pred konverzi.*/
		KopirujOrigPrilohy?: boolean|null;
		/**Zda se mají kopírovat vlastnosti.*/
		KopirujVlastnosti?: boolean|null;
		/**Deník.*/
		Sslden?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**PorCislo.*/
		PorCislo?: number|null;
		/**Poznámka.*/
		Poznamka?: string|null;
	}
	const enum GDokumentNovaKopieRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxpKopie = "IxpKopie", KopirujElObraz = "KopirujElObraz", KopirujOrigElObraz = "KopirujOrigElObraz", KopirujPrilohy = "KopirujPrilohy", KopirujOrigPrilohy = "KopirujOrigPrilohy", KopirujVlastnosti = "KopirujVlastnosti", Sslden = "Sslden", Rok = "Rok", PorCislo = "PorCislo", Poznamka = "Poznamka",}
	const enum GDokumentNovaKopieRequestDtoFragments { Ixp = "*", DatZmena = "*", IxpKopie = "*", KopirujElObraz = "*", KopirujOrigElObraz = "*", KopirujPrilohy = "*", KopirujOrigPrilohy = "*", KopirujVlastnosti = "*", Sslden = "*", Rok = "*", PorCislo = "*", Poznamka = "*",}
	const enum GDokumentNovaKopieRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxpKopie = "string", KopirujElObraz = "boolean", KopirujOrigElObraz = "boolean", KopirujPrilohy = "boolean", KopirujOrigPrilohy = "boolean", KopirujVlastnosti = "boolean", Sslden = "string", Rok = "number", PorCislo = "number", Poznamka = "string",}
	const enum GDokumentNovaKopieRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro novou kopii dokumentu (IGSslspid.NovaKopie).*/
	interface GDokumentNovaKopieResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
		/**Identifikátor kopie písemnosti.*/
		IxpKopie?: string|null;
	}
	const enum GDokumentNovaKopieResponseDtoNames { IxpKopie = "IxpKopie", DatZmena = "DatZmena",}
	const enum GDokumentNovaKopieResponseDtoFragments { IxpKopie = "*", DatZmena = "*",}
	const enum GDokumentNovaKopieResponseDtoTypes { IxpKopie = "string", DatZmena = "JsonDate",}
	const enum GDokumentNovaKopieResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro přiřazení dokumentu ke spisu (IGSslspid.PriraditKeSpisu).*/
	interface GDokumentPriraditKeSpisuRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
	}
	const enum GDokumentPriraditKeSpisuRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxpSpis = "IxpSpis",}
	const enum GDokumentPriraditKeSpisuRequestDtoFragments { Ixp = "*", DatZmena = "*", IxpSpis = "*",}
	const enum GDokumentPriraditKeSpisuRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxpSpis = "string",}
	const enum GDokumentPriraditKeSpisuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro přiřazení dokumentu ke spisu (IGSslspid.PriraditKeSpisu).*/
	interface GDokumentPriraditKeSpisuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentPriraditKeSpisuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentPriraditKeSpisuResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentPriraditKeSpisuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentPriraditKeSpisuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zrušení / odebrání přiřazení dokumentu ke spisu (IGSslspid.PriraditKeSpisuZrusit).*/
	interface GDokumentPriraditKeSpisuZrusitRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor spisu.*/
		IxpSpis?: string|null;
		/**Důvod. 0-uživatelské odebrání.*/
		IntDuvod?: number|null;
		/**Textový důvod.*/
		Duvod?: string|null;
	}
	const enum GDokumentPriraditKeSpisuZrusitRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxpSpis = "IxpSpis", IntDuvod = "IntDuvod", Duvod = "Duvod",}
	const enum GDokumentPriraditKeSpisuZrusitRequestDtoFragments { Ixp = "*", DatZmena = "*", IxpSpis = "*", IntDuvod = "*", Duvod = "*",}
	const enum GDokumentPriraditKeSpisuZrusitRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxpSpis = "string", IntDuvod = "number", Duvod = "string",}
	const enum GDokumentPriraditKeSpisuZrusitRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zrušení / odebrání přiřazení dokumentu ke spisu (IGSslspid.PriraditKeSpisuZrusit).*/
	interface GDokumentPriraditKeSpisuZrusitResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentPriraditKeSpisuZrusitResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentPriraditKeSpisuZrusitResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentPriraditKeSpisuZrusitResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentPriraditKeSpisuZrusitResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vyřízení dokumentu (IGSslspid.Vyridit).*/
	interface GDokumentVyriditRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Datum vyřízení.*/
		DatVyriz?: JsonDate|null;
	}
	const enum GDokumentVyriditRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", DatVyriz = "DatVyriz",}
	const enum GDokumentVyriditRequestDtoFragments { Ixp = "*", DatZmena = "*", DatVyriz = "*",}
	const enum GDokumentVyriditRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", DatVyriz = "JsonDate",}
	const enum GDokumentVyriditRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vyřízení dokumentu (IGSslspid.Vyridit).*/
	interface GDokumentVyriditResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentVyriditResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentVyriditResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentVyriditResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentVyriditResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vyřízení dokumentu (IGSslspid.VyriditVlozeneVeSpisuProStarouMetodiku).*/
	interface GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Datum vyřízení.*/
		DatVyriz?: JsonDate|null;
		/**Důvod.*/
		Duvod?: string|null;
		/**Poznámka.*/
		Poznamka?: string|null;
		/**Spisový plán.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
	}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", DatVyriz = "DatVyriz", Duvod = "Duvod", Poznamka = "Poznamka", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak",}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDtoFragments { Ixp = "*", DatZmena = "*", DatVyriz = "*", Duvod = "*", Poznamka = "*", SpisPlan = "*", SpisZnak = "*",}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", DatVyriz = "JsonDate", Duvod = "string", Poznamka = "string", SpisPlan = "string", SpisZnak = "string",}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vyřízení dokumentu (IGSslspid.VyriditVlozeneVeSpisuProStarouMetodiku).*/
	interface GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentVyriditVlozeneVeSpisuProStarouMetodikuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro rozšíření profilu wfl do ssl s doplněním ssl profilových informací (evidenci do SSL) (IGSslspid.RozsirProfilWflPisemnostiDoSsl).*/
	interface GDokumentRozsirProfilWflPisemnostiDoSslRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Značka.*/
		AktZnacka?: string|null;
		/**Název dokumentu.*/
		Nazev?: string|null;
		/**Typ dokumentu.*/
		IxsTyp?: string|null;
		/**Stupeň utajení.*/
		StUtajId?: number|null;
		/**Spisový plán.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
		/**Detailní popis.*/
		ObsahText?: string|null;
		/**Poznámka.*/
		PoznamkaPid?: string|null;
		/**Počet listů.*/
		PocListu?: string|null;
		/**Počet příloh.*/
		PocPriloh?: number|null;
		/**Počet stran.*/
		PocStran?: number|null;
		/**Počet kopií.*/
		PocKop?: number|null;
		/**Počet listů příloh.*/
		PocListuPriloh?: string|null;
		/**Identifikátor funkce řešitele.*/
		IxsFunResitel?: string|null;
		/**Umístění (ve skříni, pod stolem, v koši...).*/
		Umisteni?: string|null;
		/**Datum vyřízení do.*/
		DatVyrizDo?: JsonDate|null;
		/**Důvod změny termínu (zapisuje se do historie, pokud je datum vyřízení do různé od předchozího datumu vyřízení do).*/
		DuvodZt?: string|null;
		/**Zda se má zapisovat do historie.*/
		ZapisHist?: boolean|null;
	}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", AktZnacka = "AktZnacka", Nazev = "Nazev", IxsTyp = "IxsTyp", StUtajId = "StUtajId", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak", ObsahText = "ObsahText", PoznamkaPid = "PoznamkaPid", PocListu = "PocListu", PocPriloh = "PocPriloh", PocStran = "PocStran", PocKop = "PocKop", PocListuPriloh = "PocListuPriloh", IxsFunResitel = "IxsFunResitel", Umisteni = "Umisteni", DatVyrizDo = "DatVyrizDo", DuvodZt = "DuvodZt", ZapisHist = "ZapisHist",}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslRequestDtoFragments { Ixp = "*", DatZmena = "*", AktZnacka = "*", Nazev = "*", IxsTyp = "*", StUtajId = "*", SpisPlan = "*", SpisZnak = "*", ObsahText = "*", PoznamkaPid = "*", PocListu = "*", PocPriloh = "*", PocStran = "*", PocKop = "*", PocListuPriloh = "*", IxsFunResitel = "*", Umisteni = "*", DatVyrizDo = "*", DuvodZt = "*", ZapisHist = "*",}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", AktZnacka = "string", Nazev = "string", IxsTyp = "string", StUtajId = "number", SpisPlan = "string", SpisZnak = "string", ObsahText = "string", PoznamkaPid = "string", PocListu = "string", PocPriloh = "number", PocStran = "number", PocKop = "number", PocListuPriloh = "string", IxsFunResitel = "string", Umisteni = "string", DatVyrizDo = "JsonDate", DuvodZt = "string", ZapisHist = "boolean",}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro rozšíření profilu wfl do ssl s doplněním ssl profilových informací (evidenci do SSL) (IGSslspid.RozsirProfilWflPisemnostiDoSsl).*/
	interface GDokumentRozsirProfilWflPisemnostiDoSslResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentRozsirProfilWflPisemnostiDoSslResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření externího subjektu, podání dokumentu, vytvoření ČJ, vytvoření spisu, odeslání (IGSslspid.EsuCjOdes).*/
	interface GDokumentEsuCjOdesRequestDto {
		/**Identifikátor externího systému.*/
		IxsExt?: string|null;
		/**Externí subjekt - Identifikátor externího subjetu.*/
		SubjektIdEsu?: string|null;
		/**Externí subjekt - Externí.*/
		SubjektExterni?: number|null;
		/**Externí subjekt - TypEsu.*/
		SubjektTypEsu?: number|null;
		/**Externí subjekt - Název.*/
		SubjektNazev?: string|null;
		/**Externí subjekt - Zkratka.*/
		SubjektZkratka?: string|null;
		/**Externí subjekt - Poznámka.*/
		SubjektPoznamka?: string|null;
		/**Externí subjekt - Stupeň verifikace.*/
		SubjektStupenVer?: number|null;
		/**Externí subjekt - Stát.*/
		SubjektStat?: number|null;
		/**Externí subjekt - Psč.*/
		SubjektPsc?: string|null;
		/**Externí subjekt - Obec.*/
		SubjektObec?: string|null;
		/**Externí subjekt - Část obce.*/
		SubjektCastObce?: string|null;
		/**Externí subjekt - Ulice.*/
		SubjektUlice?: string|null;
		/**Externí subjekt - Číslo orientační.*/
		SubjektCOr?: string|null;
		/**Externí subjekt - Číslo popisné.*/
		SubjektCPop?: string|null;
		/**Externí subjekt - Adresa - kód.*/
		SubjektAdresaKod?: string|null;
		/**Externí subjekt - PoBox.*/
		SubjektPobox?: string|null;
		/**Externí subjekt - Telefon.*/
		SubjektTel?: string|null;
		/**Externí subjekt - Email.*/
		SubjektMail?: string|null;
		/**Externí subjekt - Fax.*/
		SubjektFax?: string|null;
		/**Externí subjekt - Obchodní jméno.*/
		SubjektObJmeno?: string|null;
		/**Externí subjekt - TypOrg.*/
		SubjektTypOrg?: number|null;
		/**Externí subjekt - Ico.*/
		SubjektIco?: string|null;
		/**Externí subjekt - DIC.*/
		SubjektDic?: string|null;
		/**Externí subjekt - Rodné číslo.*/
		SubjektRC?: string|null;
		/**Externí subjekt - Jméno.*/
		SubjektJmeno?: string|null;
		/**Externí subjekt - Příjmení.*/
		SubjektPrijmeni?: string|null;
		/**Externí subjekt - Titul před jménem.*/
		SubjektTitPred?: string|null;
		/**Externí subjekt - Titul za jménem.*/
		SubjektTitZa?: string|null;
		/**Externí subjekt - EsuTxt.*/
		SubjektEsuTxt?: string|null;
		/**Externí subjekt - Adresní řádek 0.*/
		SubjektSt0?: string|null;
		/**Externí subjekt - Adresní řádek 1.*/
		SubjektSt1?: string|null;
		/**Externí subjekt - Adresní řádek 2.*/
		SubjektSt2?: string|null;
		/**Externí subjekt - Adresní řádek 3.*/
		SubjektSt3?: string|null;
		/**Externí subjekt - Adresní řádek 4.*/
		SubjektSt4?: string|null;
		/**Externí subjekt - Adresní řádek 5.*/
		SubjektSt5?: string|null;
		/**Externí subjekt - Adresní řádek 6.*/
		SubjektSt6?: string|null;
		/**Externí subjekt - Adresní řádek 7.*/
		SubjektSt7?: string|null;
		/**Externí subjekt - PrizVp.*/
		SubjektPrizVp?: number|null;
		/**Externí subjekt - Úroveň přístupu.*/
		SubjektUrPri?: number|null;
		/**Dokument - Identifikátor dokumentu.*/
		DokumentIdDok?: string|null;
		/**Dokument - Externí.*/
		DokumentExterni?: number|null;
		/**Dokument - Značka.*/
		DokumentAktZnacka?: string|null;
		/**Dokument - Typ dokumentu.*/
		DokumentIxsTyp?: string|null;
		/**Dokument - Název.*/
		DokumentNazev?: string|null;
		/**Dokument - Obsah.*/
		DokumentObsahText?: string|null;
		/**Dokument - Rok.*/
		DokumentRok?: number|null;
		/**Dokument - Deník.*/
		DokumentSslden?: string|null;
		/**Dokument - Pořadové číslo.*/
		DokumentPorCislo?: number|null;
		/**Spis - Identifikátor spisu.*/
		SpisIdSpis?: string|null;
		/**Spis - Externí.*/
		SpisExterni?: number|null;
		/**Odeslání - Způsob doručení.*/
		OdeslaniZpusobDor?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		/**Odeslání - Druh zásilky.*/
		OdeslaniDruhZas?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		/**Odeslání - Druh zásilky zach.*/
		OdeslaniDruhZasZach?: number|null;
		/**Odeslání - Příznak originálu.*/
		OdeslaniPrizOrig?: number|null;
		/**Odeslání - Typ obsahu.*/
		OdeslaniTypObsOb?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		/**Odeslání - Doručovací služby.*/
		OdeslaniKombSluzeb?: string|null;
	}
	const enum GDokumentEsuCjOdesRequestDtoNames { IxsExt = "IxsExt", SubjektIdEsu = "SubjektIdEsu", SubjektExterni = "SubjektExterni", SubjektTypEsu = "SubjektTypEsu", SubjektNazev = "SubjektNazev", SubjektZkratka = "SubjektZkratka", SubjektPoznamka = "SubjektPoznamka", SubjektStupenVer = "SubjektStupenVer", SubjektStat = "SubjektStat", SubjektPsc = "SubjektPsc", SubjektObec = "SubjektObec", SubjektCastObce = "SubjektCastObce", SubjektUlice = "SubjektUlice", SubjektCOr = "SubjektCOr", SubjektCPop = "SubjektCPop", SubjektAdresaKod = "SubjektAdresaKod", SubjektPobox = "SubjektPobox", SubjektTel = "SubjektTel", SubjektMail = "SubjektMail", SubjektFax = "SubjektFax", SubjektObJmeno = "SubjektObJmeno", SubjektTypOrg = "SubjektTypOrg", SubjektIco = "SubjektIco", SubjektDic = "SubjektDic", SubjektRC = "SubjektRC", SubjektJmeno = "SubjektJmeno", SubjektPrijmeni = "SubjektPrijmeni", SubjektTitPred = "SubjektTitPred", SubjektTitZa = "SubjektTitZa", SubjektEsuTxt = "SubjektEsuTxt", SubjektSt0 = "SubjektSt0", SubjektSt1 = "SubjektSt1", SubjektSt2 = "SubjektSt2", SubjektSt3 = "SubjektSt3", SubjektSt4 = "SubjektSt4", SubjektSt5 = "SubjektSt5", SubjektSt6 = "SubjektSt6", SubjektSt7 = "SubjektSt7", SubjektPrizVp = "SubjektPrizVp", SubjektUrPri = "SubjektUrPri", DokumentIdDok = "DokumentIdDok", DokumentExterni = "DokumentExterni", DokumentAktZnacka = "DokumentAktZnacka", DokumentIxsTyp = "DokumentIxsTyp", DokumentNazev = "DokumentNazev", DokumentObsahText = "DokumentObsahText", DokumentRok = "DokumentRok", DokumentSslden = "DokumentSslden", DokumentPorCislo = "DokumentPorCislo", SpisIdSpis = "SpisIdSpis", SpisExterni = "SpisExterni", OdeslaniZpusobDor = "OdeslaniZpusobDor", OdeslaniDruhZas = "OdeslaniDruhZas", OdeslaniDruhZasZach = "OdeslaniDruhZasZach", OdeslaniPrizOrig = "OdeslaniPrizOrig", OdeslaniTypObsOb = "OdeslaniTypObsOb", OdeslaniKombSluzeb = "OdeslaniKombSluzeb",}
	const enum GDokumentEsuCjOdesRequestDtoFragments { IxsExt = "*", SubjektIdEsu = "*", SubjektExterni = "*", SubjektTypEsu = "*", SubjektNazev = "*", SubjektZkratka = "*", SubjektPoznamka = "*", SubjektStupenVer = "*", SubjektStat = "*", SubjektPsc = "*", SubjektObec = "*", SubjektCastObce = "*", SubjektUlice = "*", SubjektCOr = "*", SubjektCPop = "*", SubjektAdresaKod = "*", SubjektPobox = "*", SubjektTel = "*", SubjektMail = "*", SubjektFax = "*", SubjektObJmeno = "*", SubjektTypOrg = "*", SubjektIco = "*", SubjektDic = "*", SubjektRC = "*", SubjektJmeno = "*", SubjektPrijmeni = "*", SubjektTitPred = "*", SubjektTitZa = "*", SubjektEsuTxt = "*", SubjektSt0 = "*", SubjektSt1 = "*", SubjektSt2 = "*", SubjektSt3 = "*", SubjektSt4 = "*", SubjektSt5 = "*", SubjektSt6 = "*", SubjektSt7 = "*", SubjektPrizVp = "*", SubjektUrPri = "*", DokumentIdDok = "*", DokumentExterni = "*", DokumentAktZnacka = "*", DokumentIxsTyp = "*", DokumentNazev = "*", DokumentObsahText = "*", DokumentRok = "*", DokumentSslden = "*", DokumentPorCislo = "*", SpisIdSpis = "*", SpisExterni = "*", OdeslaniZpusobDor = "*", OdeslaniDruhZas = "*", OdeslaniDruhZasZach = "*", OdeslaniPrizOrig = "*", OdeslaniTypObsOb = "*", OdeslaniKombSluzeb = "*",}
	const enum GDokumentEsuCjOdesRequestDtoTypes { IxsExt = "string", SubjektIdEsu = "string", SubjektExterni = "number", SubjektTypEsu = "number", SubjektNazev = "string", SubjektZkratka = "string", SubjektPoznamka = "string", SubjektStupenVer = "number", SubjektStat = "number", SubjektPsc = "string", SubjektObec = "string", SubjektCastObce = "string", SubjektUlice = "string", SubjektCOr = "string", SubjektCPop = "string", SubjektAdresaKod = "string", SubjektPobox = "string", SubjektTel = "string", SubjektMail = "string", SubjektFax = "string", SubjektObJmeno = "string", SubjektTypOrg = "number", SubjektIco = "string", SubjektDic = "string", SubjektRC = "string", SubjektJmeno = "string", SubjektPrijmeni = "string", SubjektTitPred = "string", SubjektTitZa = "string", SubjektEsuTxt = "string", SubjektSt0 = "string", SubjektSt1 = "string", SubjektSt2 = "string", SubjektSt3 = "string", SubjektSt4 = "string", SubjektSt5 = "string", SubjektSt6 = "string", SubjektSt7 = "string", SubjektPrizVp = "number", SubjektUrPri = "number", DokumentIdDok = "string", DokumentExterni = "number", DokumentAktZnacka = "string", DokumentIxsTyp = "string", DokumentNazev = "string", DokumentObsahText = "string", DokumentRok = "number", DokumentSslden = "string", DokumentPorCislo = "number", SpisIdSpis = "string", SpisExterni = "number", OdeslaniZpusobDor = "Gordic.Ginis.DbModel.GWflczpdEnum", OdeslaniDruhZas = "Gordic.Ginis.DbModel.GWflcdrzEnum", OdeslaniDruhZasZach = "number", OdeslaniPrizOrig = "number", OdeslaniTypObsOb = "Gordic.Ginis.DbModel.GWflctobEnum", OdeslaniKombSluzeb = "string",}
	const enum GDokumentEsuCjOdesRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření externího subjektu, podání dokumentu, vytvoření ČJ, vytvoření spisu, odeslání (IGSslspid.EsuCjOdes).*/
	interface GDokumentEsuCjOdesResponseDto {
		/**Identifikátor subjektu.*/
		IxsEsu?: string|null;
		/**Identifikátor subjektu - ixs případně vzniklého nového záznamu.*/
		IxsEsuNew?: string|null;
		/**Identifikátor dokumentu.*/
		IxpDok?: string|null;
		/**Identifikátor spisu.*/
		IxpSpi?: string|null;
		/**Identifikátor doručení.*/
		IdDoruc?: string|null;
		/**Licence.*/
		Lic?: string|null;
		/**Pořadové číslo.*/
		PorCislo?: number|null;
		/**Číslo jednací.*/
		CjDok?: string|null;
	}
	const enum GDokumentEsuCjOdesResponseDtoNames { IxsEsu = "IxsEsu", IxsEsuNew = "IxsEsuNew", IxpDok = "IxpDok", IxpSpi = "IxpSpi", IdDoruc = "IdDoruc", Lic = "Lic", PorCislo = "PorCislo", CjDok = "CjDok",}
	const enum GDokumentEsuCjOdesResponseDtoFragments { IxsEsu = "*", IxsEsuNew = "*", IxpDok = "*", IxpSpi = "*", IdDoruc = "*", Lic = "*", PorCislo = "*", CjDok = "*",}
	const enum GDokumentEsuCjOdesResponseDtoTypes { IxsEsu = "string", IxsEsuNew = "string", IxpDok = "string", IxpSpi = "string", IdDoruc = "string", Lic = "string", PorCislo = "number", CjDok = "string",}
	const enum GDokumentEsuCjOdesResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření vlastních dokumentů a vložení do spisů hromadně (IGSslspid.VytvorDokumentAVlozDoSpisuHromadne).*/
	interface GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDto {
		/**Identifikátory a datum změny spisů.*/
		Spisy?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Typ dokumentů.*/
		IxsTyp?: string|null;
		/**Věc.*/
		Vec?: string|null;
		/**Věc podrobně.*/
		ObsahText?: string|null;
		/**Počet listů.*/
		PocListu?: string|null;
		/**Počet příloh.*/
		PocPriloh?: number|null;
		/**Počet stran.*/
		PocStran?: number|null;
		/**Počet kopií.*/
		PocKopii?: number|null;
		/**Počet listů příloh.*/
		PocListuPriloh?: string|null;
	}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDtoNames { Spisy = "Spisy", IxsTyp = "IxsTyp", Vec = "Vec", ObsahText = "ObsahText", PocListu = "PocListu", PocPriloh = "PocPriloh", PocStran = "PocStran", PocKopii = "PocKopii", PocListuPriloh = "PocListuPriloh",}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDtoFragments { Spisy = "*", IxsTyp = "*", Vec = "*", ObsahText = "*", PocListu = "*", PocPriloh = "*", PocStran = "*", PocKopii = "*", PocListuPriloh = "*",}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDtoTypes { Spisy = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", IxsTyp = "string", Vec = "string", ObsahText = "string", PocListu = "string", PocPriloh = "number", PocStran = "number", PocKopii = "number", PocListuPriloh = "string",}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření vlastních dokumentů a vložení do spisů hromadně (IGSslspid.VytvorDokumentAVlozDoSpisuHromadne).*/
	interface GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
		/**Identifikátory dokumentů.*/
		Ixps?: string[]|null;
	}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDtoNames { Ixps = "Ixps", GroupResult = "GroupResult",}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDtoFragments { Ixps = "*", GroupResult = "*",}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDtoTypes { Ixps = "string[]", GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentVytvorDokumentAVlozDoSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro nalezení dokumentů posledně vložených do spisů hromadně (IGSslspid.NajdiDokPoslVlozDoSpisuHromadne).*/
	interface GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDto {
		/**Identifikátory a datum změny spisů.*/
		Spisy?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
	}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDtoNames { Spisy = "Spisy",}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDtoFragments { Spisy = "*",}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDtoTypes { Spisy = "Gordic.General.ApplicationInterface.GIxpDatZmena[]",}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro nalezení dokumentů posledně vložených do spisů hromadně (IGSslspid.NajdiDokPoslVlozDoSpisuHromadne).*/
	interface GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
		/**Identifikátory dokumentů.*/
		Ixps?: string[]|null;
	}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDtoNames { Ixps = "Ixps", GroupResult = "GroupResult",}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDtoFragments { Ixps = "*", GroupResult = "*",}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDtoTypes { Ixps = "string[]", GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentNajdiDokPoslVlozDoSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu spisového znaku hromadně (IGSslspid.ZmenaSpisovehoZnakuHromadne).*/
	interface GDokumentZmenaSpisovehoZnakuHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Spisový plánn.*/
		SpisPlan?: string|null;
		/**Spisový znak.*/
		SpisZnak?: string|null;
		/**Zda se má provádět změna i u dokumentů, které mají nastaven spisový plán a znak (true), nebo se má provádět pouze u dokumentů, které měly tyto údaje dosud nevyplněné (false).*/
		OpravVyplnene?: boolean|null;
		/**Zda se má provádět změna i u dokumentů, vlozenych v uzavrenem spisu.*/
		OpravVlozeneUzavSpisu?: boolean|null;
	}
	const enum GDokumentZmenaSpisovehoZnakuHromadneRequestDtoNames { Dokumenty = "Dokumenty", SpisPlan = "SpisPlan", SpisZnak = "SpisZnak", OpravVyplnene = "OpravVyplnene", OpravVlozeneUzavSpisu = "OpravVlozeneUzavSpisu",}
	const enum GDokumentZmenaSpisovehoZnakuHromadneRequestDtoFragments { Dokumenty = "*", SpisPlan = "*", SpisZnak = "*", OpravVyplnene = "*", OpravVlozeneUzavSpisu = "*",}
	const enum GDokumentZmenaSpisovehoZnakuHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", SpisPlan = "string", SpisZnak = "string", OpravVyplnene = "boolean", OpravVlozeneUzavSpisu = "boolean",}
	const enum GDokumentZmenaSpisovehoZnakuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu spisového znaku hromadně (IGSslspid.ZmenaSpisovehoZnakuHromadne).*/
	interface GDokumentZmenaSpisovehoZnakuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZmenaSpisovehoZnakuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZmenaSpisovehoZnakuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZmenaSpisovehoZnakuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZmenaSpisovehoZnakuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu IRP hromadně (IGSslspid.ZmenaIRPHromadne).*/
	interface GDokumentZmenaIRPHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Oprávnění.*/
		Opravneni?: Gordic.Wfl.Interface.GWflRPSeznamAktOprDto|null;
		/**Akce.*/
		Akce?: Gordic.Wfl.Interface.GEnumRpRecordStatus|null;
		/**Změnit pokud už existuje.*/
		ZmenitPokudUzExistuje?: boolean|null;
	}
	const enum GDokumentZmenaIRPHromadneRequestDtoNames { Dokumenty = "Dokumenty", Opravneni = "Opravneni", Akce = "Akce", ZmenitPokudUzExistuje = "ZmenitPokudUzExistuje",}
	const enum GDokumentZmenaIRPHromadneRequestDtoFragments { Dokumenty = "*", Opravneni = "*", Akce = "*", ZmenitPokudUzExistuje = "*",}
	const enum GDokumentZmenaIRPHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Opravneni = "Gordic.Wfl.Interface.GWflRPSeznamAktOprDto", Akce = "Gordic.Wfl.Interface.GEnumRpRecordStatus", ZmenitPokudUzExistuje = "boolean",}
	const enum GDokumentZmenaIRPHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu IRP hromadně (IGSslspid.ZmenaIRPHromadne).*/
	interface GDokumentZmenaIRPHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZmenaIRPHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZmenaIRPHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZmenaIRPHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZmenaIRPHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu věci hromadně (IGSslspid.ZmenaVeciHromadne).*/
	interface GDokumentZmenaVeciHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Věc.*/
		Vec?: string|null;
		/**Zda se má provádět změna i u dokumentů, které mají nastaven spisový plán a znak (true), nebo se má provádět pouze u dokumentů, které měly tyto údaje dosud nevyplněné (false).*/
		OpravVyplnene?: boolean|null;
	}
	const enum GDokumentZmenaVeciHromadneRequestDtoNames { Dokumenty = "Dokumenty", Vec = "Vec", OpravVyplnene = "OpravVyplnene",}
	const enum GDokumentZmenaVeciHromadneRequestDtoFragments { Dokumenty = "*", Vec = "*", OpravVyplnene = "*",}
	const enum GDokumentZmenaVeciHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Vec = "string", OpravVyplnene = "boolean",}
	const enum GDokumentZmenaVeciHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu věci hromadně (IGSslspid.ZmenaVeciHromadne).*/
	interface GDokumentZmenaVeciHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZmenaVeciHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZmenaVeciHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZmenaVeciHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZmenaVeciHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu hodnoty vlastnosti hromadně (IGSslspid.ZmenaHodnotyVlastnostiHromadne).*/
	interface GDokumentZmenaHodnotyVlastnostiHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Vlastnost.
		*     Potřebné vlastnosti jsou ixs_vla, ixs_pro, ixs_stv, ixs_vla, por_cislo, hovla, hovla_txt.
		*/
		Vlastnost?: Gordic.Gin.Interface.SeznamVlastnostiDto|null;
	}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneRequestDtoNames { Dokumenty = "Dokumenty", Vlastnost = "Vlastnost",}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneRequestDtoFragments { Dokumenty = "*", Vlastnost = "*",}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Vlastnost = "Gordic.Gin.Interface.SeznamVlastnostiDto",}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu hodnoty vlastnosti hromadně (IGSslspid.ZmenaHodnotyVlastnostiHromadne).*/
	interface GDokumentZmenaHodnotyVlastnostiHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZmenaHodnotyVlastnostiHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro přidání vlastnosti hromadně (IGSslspid.PridaniVlastnostiHromadne).*/
	interface GDokumentPridaniVlastnostiHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Vlastnost.
		*     Potřebné vlastnosti jsou ixs_vla, hovla, hovla_txt.
		*/
		Vlastnost?: Gordic.Gin.Interface.SeznamVlastnostiDto|null;
	}
	const enum GDokumentPridaniVlastnostiHromadneRequestDtoNames { Dokumenty = "Dokumenty", Vlastnost = "Vlastnost",}
	const enum GDokumentPridaniVlastnostiHromadneRequestDtoFragments { Dokumenty = "*", Vlastnost = "*",}
	const enum GDokumentPridaniVlastnostiHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Vlastnost = "Gordic.Gin.Interface.SeznamVlastnostiDto",}
	const enum GDokumentPridaniVlastnostiHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro přidání vlastnosti hromadně (IGSslspid.PridaniVlastnostiHromadne).*/
	interface GDokumentPridaniVlastnostiHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentPridaniVlastnostiHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentPridaniVlastnostiHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentPridaniVlastnostiHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentPridaniVlastnostiHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu přístupu hromadně (IGSslspid.ZmenaPristupuHromadne).*/
	interface GDokumentZmenaPristupuHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Přístup.*/
		Pristup?: number|null;
	}
	const enum GDokumentZmenaPristupuHromadneRequestDtoNames { Dokumenty = "Dokumenty", Pristup = "Pristup",}
	const enum GDokumentZmenaPristupuHromadneRequestDtoFragments { Dokumenty = "*", Pristup = "*",}
	const enum GDokumentZmenaPristupuHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Pristup = "number",}
	const enum GDokumentZmenaPristupuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu přístupu hromadně (IGSslspid.ZmenaPristupuHromadne).*/
	interface GDokumentZmenaPristupuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZmenaPristupuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZmenaPristupuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZmenaPristupuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZmenaPristupuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro nastavení první přílohy jako el. obraz (pokud ještě dokument el. obraz nemá) hromadně (IGSslspid.NastavitPrvniElPrilohuJakoObrazHromadne).*/
	interface GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Důvod.*/
		Duvod?: string|null;
	}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDtoNames { Dokumenty = "Dokumenty", Duvod = "Duvod",}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDtoFragments { Dokumenty = "*", Duvod = "*",}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", Duvod = "string",}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro nastavení první přílohy jako el. obraz (pokud ještě dokument el. obraz nemá) hromadně (IGSslspid.NastavitPrvniElPrilohuJakoObrazHromadne).*/
	interface GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentNastavitPrvniElPrilohuJakoObrazHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření duplikátů z šablony ixpSablony a vložení je do seznamu spisů hromadně (IGSslspid.VytvoritDuplikatAVlozitDoSpisuHromadne).*/
	interface GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Identifikátor šablony.*/
		IxpSablony?: string|null;
		/**Identifikátor elektronického obrazu.*/
		IxbObraz?: string|null;
		/**Identifikátory příloh.*/
		IxbPriloh?: string[]|null;
	}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDtoNames { Dokumenty = "Dokumenty", IxpSablony = "IxpSablony", IxbObraz = "IxbObraz", IxbPriloh = "IxbPriloh",}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDtoFragments { Dokumenty = "*", IxpSablony = "*", IxbObraz = "*", IxbPriloh = "*",}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", IxpSablony = "string", IxbObraz = "string", IxbPriloh = "string[]",}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření duplikátů z šablony ixpSablony a vložení je do seznamu spisů hromadně (IGSslspid.VytvoritDuplikatAVlozitDoSpisuHromadne).*/
	interface GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentVytvoritDuplikatAVlozitDoSpisuHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro odstranění žádosti EPK hromadně (IGSslspid.ZruseniZadostiEpkHromadne).*/
	interface GDokumentZruseniZadostiEpkHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpSerCisloDatZmena[]|null;
	}
	const enum GDokumentZruseniZadostiEpkHromadneRequestDtoNames { Dokumenty = "Dokumenty",}
	const enum GDokumentZruseniZadostiEpkHromadneRequestDtoFragments { Dokumenty = "*",}
	const enum GDokumentZruseniZadostiEpkHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpSerCisloDatZmena[]",}
	const enum GDokumentZruseniZadostiEpkHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro odstranění žádosti EPK hromadně (IGSslspid.ZruseniZadostiEpkHromadne).*/
	interface GDokumentZruseniZadostiEpkHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZruseniZadostiEpkHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZruseniZadostiEpkHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZruseniZadostiEpkHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZruseniZadostiEpkHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu typu dokumentu hromadně (IGSslspid.ZmenaTypuPisemnostiHromadne).*/
	interface GDokumentZmenaTypuPisemnostiHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Identifikáor typu písemnosti.*/
		IxsTyp?: string|null;
		/**Změnit pouze neurčené.*/
		ZmenitPouzeNeurcen?: boolean|null;
	}
	const enum GDokumentZmenaTypuPisemnostiHromadneRequestDtoNames { Dokumenty = "Dokumenty", IxsTyp = "IxsTyp", ZmenitPouzeNeurcen = "ZmenitPouzeNeurcen",}
	const enum GDokumentZmenaTypuPisemnostiHromadneRequestDtoFragments { Dokumenty = "*", IxsTyp = "*", ZmenitPouzeNeurcen = "*",}
	const enum GDokumentZmenaTypuPisemnostiHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", IxsTyp = "string", ZmenitPouzeNeurcen = "boolean",}
	const enum GDokumentZmenaTypuPisemnostiHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu typu dokumentu hromadně (IGSslspid.ZmenaTypuPisemnostiHromadne).*/
	interface GDokumentZmenaTypuPisemnostiHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZmenaTypuPisemnostiHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZmenaTypuPisemnostiHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZmenaTypuPisemnostiHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZmenaTypuPisemnostiHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu přístupu hromadně (IGSslspid.ZmenaPristupuRPHromadne).*/
	interface GDokumentZmenaPristupuRPHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Přístup.*/
		Pristup?: number|null;
		/**ZmenitRPDokVlozDoSpisu.*/
		ZmenitRPDokVlozDoSpisu?: boolean|null;
	}
	const enum GDokumentZmenaPristupuRPHromadneRequestDtoNames { Dokumenty = "Dokumenty", Pristup = "Pristup", ZmenitRPDokVlozDoSpisu = "ZmenitRPDokVlozDoSpisu",}
	const enum GDokumentZmenaPristupuRPHromadneRequestDtoFragments { Dokumenty = "*", Pristup = "*", ZmenitRPDokVlozDoSpisu = "*",}
	const enum GDokumentZmenaPristupuRPHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Pristup = "number", ZmenitRPDokVlozDoSpisu = "boolean",}
	const enum GDokumentZmenaPristupuRPHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu přístupu hromadně (IGSslspid.ZmenaPristupuRPHromadne).*/
	interface GDokumentZmenaPristupuRPHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentZmenaPristupuRPHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentZmenaPristupuRPHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentZmenaPristupuRPHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentZmenaPristupuRPHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro odeslání dokumentů na odesílatele hromadně (IGSslspid.OdeslaniHromadne).*/
	interface GDokumentOdeslaniHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**Způsob doručení.*/
		ZpusobDor?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		/**Druh zásilky.*/
		DruhZas?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		/**Druh zacházení se zásilkou.*/
		DruhZasZach?: number|null;
		/**Doplňkové služby.*/
		DoplnkoveSluzby?: number[]|null;
		/**Poznámka.*/
		Poznamka?: string|null;
		/**Typ obsluhy obálek.*/
		TypObsOb?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		/**Zda se mají dokumenty odeslat jako originály.*/
		OdeslatJakoOriginaly?: boolean|null;
		/**Zda se má automaticky generovat id zásilky.*/
		GenerovatIdZasilky?: boolean|null;
		/**Odesílat dokumenty posledně vložené do spisů.*/
		OdesDokPoslVlozDoSpis?: boolean|null;
		/**Pokud je vyplněno a je požadováno odeslání dokumentů posledně vložených do spisů tak se kontroluje i typ dokumentů - pokud se neshoduje není odeslání povoleno.*/
		IxsTypOdesDok?: string|null;
	}
	const enum GDokumentOdeslaniHromadneRequestDtoNames { Dokumenty = "Dokumenty", ZpusobDor = "ZpusobDor", DruhZas = "DruhZas", DruhZasZach = "DruhZasZach", DoplnkoveSluzby = "DoplnkoveSluzby", Poznamka = "Poznamka", TypObsOb = "TypObsOb", OdeslatJakoOriginaly = "OdeslatJakoOriginaly", GenerovatIdZasilky = "GenerovatIdZasilky", OdesDokPoslVlozDoSpis = "OdesDokPoslVlozDoSpis", IxsTypOdesDok = "IxsTypOdesDok",}
	const enum GDokumentOdeslaniHromadneRequestDtoFragments { Dokumenty = "*", ZpusobDor = "*", DruhZas = "*", DruhZasZach = "*", DoplnkoveSluzby = "*", Poznamka = "*", TypObsOb = "*", OdeslatJakoOriginaly = "*", GenerovatIdZasilky = "*", OdesDokPoslVlozDoSpis = "*", IxsTypOdesDok = "*",}
	const enum GDokumentOdeslaniHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", ZpusobDor = "Gordic.Ginis.DbModel.GWflczpdEnum", DruhZas = "Gordic.Ginis.DbModel.GWflcdrzEnum", DruhZasZach = "number", DoplnkoveSluzby = "number[]", Poznamka = "string", TypObsOb = "Gordic.Ginis.DbModel.GWflctobEnum", OdeslatJakoOriginaly = "boolean", GenerovatIdZasilky = "boolean", OdesDokPoslVlozDoSpis = "boolean", IxsTypOdesDok = "string",}
	const enum GDokumentOdeslaniHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro odeslání dokumentů na odesílatele hromadně (IGSslspid.OdeslaniHromadne).*/
	interface GDokumentOdeslaniHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
		/**Pole výsledků akce - ixp, mail, sxs obálky.*/
		Sxss?: string[]|null;
	}
	const enum GDokumentOdeslaniHromadneResponseDtoNames { Sxss = "Sxss", GroupResult = "GroupResult",}
	const enum GDokumentOdeslaniHromadneResponseDtoFragments { Sxss = "*", GroupResult = "*",}
	const enum GDokumentOdeslaniHromadneResponseDtoTypes { Sxss = "string[]", GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentOdeslaniHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vyřízení dokumentů hromadně (IGSslspid.VyrizeniPisemnostiHromadne).*/
	interface GDokumentVyrizeniPisemnostiHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]|null;
		/**Datum vyřízení.*/
		DatVyriz?: JsonDate|null;
	}
	const enum GDokumentVyrizeniPisemnostiHromadneRequestDtoNames { Dokumenty = "Dokumenty", DatVyriz = "DatVyriz",}
	const enum GDokumentVyrizeniPisemnostiHromadneRequestDtoFragments { Dokumenty = "*", DatVyriz = "*",}
	const enum GDokumentVyrizeniPisemnostiHromadneRequestDtoTypes { Dokumenty = "Gordic.Wfl.Interface.GIxpDatZmenaPrizSpis[]", DatVyriz = "JsonDate",}
	const enum GDokumentVyrizeniPisemnostiHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vyřízení dokumentů hromadně (IGSslspid.VyrizeniPisemnostiHromadne).*/
	interface GDokumentVyrizeniPisemnostiHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentVyrizeniPisemnostiHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentVyrizeniPisemnostiHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentVyrizeniPisemnostiHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentVyrizeniPisemnostiHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro evidenci dokumentů do ssl hromadně (IGSslspid.EvidenceDoSslHromadne).*/
	interface GDokumentEvidenceDoSslHromadneRequestDto {
		/**Identifikátory a datum změny předávaných dokumentů.*/
		Dokumenty?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
	}
	const enum GDokumentEvidenceDoSslHromadneRequestDtoNames { Dokumenty = "Dokumenty",}
	const enum GDokumentEvidenceDoSslHromadneRequestDtoFragments { Dokumenty = "*",}
	const enum GDokumentEvidenceDoSslHromadneRequestDtoTypes { Dokumenty = "Gordic.General.ApplicationInterface.GIxpDatZmena[]",}
	const enum GDokumentEvidenceDoSslHromadneRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro evidenci dokumentů do ssl hromadně (IGSslspid.EvidenceDoSslHromadne).*/
	interface GDokumentEvidenceDoSslHromadneResponseDto extends Gordic.Wfl.Interface.GGroupResultResponseDto {
	}
	const enum GDokumentEvidenceDoSslHromadneResponseDtoNames { GroupResult = "GroupResult",}
	const enum GDokumentEvidenceDoSslHromadneResponseDtoFragments { GroupResult = "*",}
	const enum GDokumentEvidenceDoSslHromadneResponseDtoTypes { GroupResult = "{ Key?: string | null, Error?: string | null, IsError?: boolean | null, RowState?: number | null }[]",}
	const enum GDokumentEvidenceDoSslHromadneResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro změnu přístupu dokumentu (IGSslspid.ZmenaPristupu).*/
	interface GDokumentZmenaPristupuRequestDto {
		/**Identifikátor spisu.*/
		Ixp?: string|null;
		/**Spisový deník.*/
		DatZmena?: JsonDate|null;
		/**Úroveň přístupu.*/
		StUtajId?: number|null;
	}
	const enum GDokumentZmenaPristupuRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", StUtajId = "StUtajId",}
	const enum GDokumentZmenaPristupuRequestDtoFragments { Ixp = "*", DatZmena = "*", StUtajId = "*",}
	const enum GDokumentZmenaPristupuRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", StUtajId = "number",}
	const enum GDokumentZmenaPristupuRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro změnu přístupu dokumentu (IGSslspid.ZmenaPristupu).*/
	interface GDokumentZmenaPristupuResponseDto extends Gordic.Wfl.Interface.GDatumZmenyResponseDto {
	}
	const enum GDokumentZmenaPristupuResponseDtoNames { DatZmena = "DatZmena",}
	const enum GDokumentZmenaPristupuResponseDtoFragments { DatZmena = "*",}
	const enum GDokumentZmenaPristupuResponseDtoTypes { DatZmena = "JsonDate",}
	const enum GDokumentZmenaPristupuResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření nové kopie dokumentu s předáním (IGSslspid.NovaKopiePisemnostiSPredanim).*/
	interface GDokumentNovaKopiePisemnostiSPredanimRequestDto {
		/**Identifikátor spisu.*/
		Ixp?: string|null;
		/**Spisový deník.*/
		DatZmena?: JsonDate|null;
		/**Typ vlastnictví.*/
		TypVlast?: number|null;
		/**Identifikátor kopie - je-li IsNull, bude vygenerován nový identifikátor a vrácen jako návratová hodnota metody.*/
		IxsKop?: string|null;
		/**Identifikace spisového uzlu na který má být kopie předána.*/
		IxsSu?: string|null;
		/**Identifikace funkce na kterou má být kopie předána - je-li IsNull, bude předáno pouze na uzel.*/
		IxsFun?: string|null;
		/**Účel distribuce (důvod).*/
		UcelDist?: string|null;
		/**Kopírovat elektronický obraz.*/
		KopirovatElObraz?: boolean|null;
		/**Kopírovat originální elektronický obraz.*/
		KopirovatOrigElObraz?: boolean|null;
		/**Kopírovat elektronické přílohy.*/
		KopirovatElPrilohy?: boolean|null;
		/**Kopírovat originální elektronické přílohy.*/
		KopirovatOrigElPrilohy?: boolean|null;
		/**Kopírovat vlastnosti.*/
		KopirovatVlastnosti?: boolean|null;
		/**Poznámka.*/
		Poznamka?: string|null;
	}
	const enum GDokumentNovaKopiePisemnostiSPredanimRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", TypVlast = "TypVlast", IxsKop = "IxsKop", IxsSu = "IxsSu", IxsFun = "IxsFun", UcelDist = "UcelDist", KopirovatElObraz = "KopirovatElObraz", KopirovatOrigElObraz = "KopirovatOrigElObraz", KopirovatElPrilohy = "KopirovatElPrilohy", KopirovatOrigElPrilohy = "KopirovatOrigElPrilohy", KopirovatVlastnosti = "KopirovatVlastnosti", Poznamka = "Poznamka",}
	const enum GDokumentNovaKopiePisemnostiSPredanimRequestDtoFragments { Ixp = "*", DatZmena = "*", TypVlast = "*", IxsKop = "*", IxsSu = "*", IxsFun = "*", UcelDist = "*", KopirovatElObraz = "*", KopirovatOrigElObraz = "*", KopirovatElPrilohy = "*", KopirovatOrigElPrilohy = "*", KopirovatVlastnosti = "*", Poznamka = "*",}
	const enum GDokumentNovaKopiePisemnostiSPredanimRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", TypVlast = "number", IxsKop = "string", IxsSu = "string", IxsFun = "string", UcelDist = "string", KopirovatElObraz = "boolean", KopirovatOrigElObraz = "boolean", KopirovatElPrilohy = "boolean", KopirovatOrigElPrilohy = "boolean", KopirovatVlastnosti = "boolean", Poznamka = "string",}
	const enum GDokumentNovaKopiePisemnostiSPredanimRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření nové kopie dokumentu s předáním (IGSslspid.NovaKopiePisemnostiSPredanim).*/
	interface GDokumentNovaKopiePisemnostiSPredanimResponseDto {
		/**Identifikátor vzniklé kopie.*/
		IxsKop?: string|null;
	}
	const enum GDokumentNovaKopiePisemnostiSPredanimResponseDtoNames { IxsKop = "IxsKop",}
	const enum GDokumentNovaKopiePisemnostiSPredanimResponseDtoFragments { IxsKop = "*",}
	const enum GDokumentNovaKopiePisemnostiSPredanimResponseDtoTypes { IxsKop = "string",}
	const enum GDokumentNovaKopiePisemnostiSPredanimResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření nové kopie dokumentu s přidělením (IGSslspid.NovaKopiePisemnostiSPridelenim).*/
	interface GDokumentNovaKopiePisemnostiSPridelenimRequestDto {
		/**Identifikátor spisu.*/
		Ixp?: string|null;
		/**Spisový deník.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor kopie - je-li IsNull, bude vygenerován nový identifikátor a vrácen jako návratová hodnota metody.*/
		IxsKop?: string|null;
		/**Identifikace spisového uzlu na který má být kopie předána.*/
		IxsSu?: string|null;
		/**Identifikace funkce na kterou má být kopie předána - je-li IsNull, bude předáno pouze na uzel.*/
		IxsFun?: string|null;
		/**Kopírovat elektronický obraz.*/
		KopirovatElObraz?: boolean|null;
		/**Kopírovat originální elektronický obraz.*/
		KopirovatOrigElObraz?: boolean|null;
		/**Kopírovat elektronické přílohy.*/
		KopirovatElPrilohy?: boolean|null;
		/**Kopírovat originální elektronické přílohy.*/
		KopirovatOrigElPrilohy?: boolean|null;
		/**Kopírovat vlastnosti.*/
		KopirovatVlastnosti?: boolean|null;
		/**Přidělení přímo.*/
		Primo?: boolean|null;
		/**Účel distribuce (důvod).*/
		UcelDist?: string|null;
		/**Poznámka.*/
		Poznamka?: string|null;
	}
	const enum GDokumentNovaKopiePisemnostiSPridelenimRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxsKop = "IxsKop", IxsSu = "IxsSu", IxsFun = "IxsFun", KopirovatElObraz = "KopirovatElObraz", KopirovatOrigElObraz = "KopirovatOrigElObraz", KopirovatElPrilohy = "KopirovatElPrilohy", KopirovatOrigElPrilohy = "KopirovatOrigElPrilohy", KopirovatVlastnosti = "KopirovatVlastnosti", Primo = "Primo", UcelDist = "UcelDist", Poznamka = "Poznamka",}
	const enum GDokumentNovaKopiePisemnostiSPridelenimRequestDtoFragments { Ixp = "*", DatZmena = "*", IxsKop = "*", IxsSu = "*", IxsFun = "*", KopirovatElObraz = "*", KopirovatOrigElObraz = "*", KopirovatElPrilohy = "*", KopirovatOrigElPrilohy = "*", KopirovatVlastnosti = "*", Primo = "*", UcelDist = "*", Poznamka = "*",}
	const enum GDokumentNovaKopiePisemnostiSPridelenimRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxsKop = "string", IxsSu = "string", IxsFun = "string", KopirovatElObraz = "boolean", KopirovatOrigElObraz = "boolean", KopirovatElPrilohy = "boolean", KopirovatOrigElPrilohy = "boolean", KopirovatVlastnosti = "boolean", Primo = "boolean", UcelDist = "string", Poznamka = "string",}
	const enum GDokumentNovaKopiePisemnostiSPridelenimRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření nové kopie dokumentu s přidělením (IGSslspid.NovaKopiePisemnostiSPridelenim).*/
	interface GDokumentNovaKopiePisemnostiSPridelenimResponseDto {
		/**Identifikátor vzniklé kopie.*/
		IxsKop?: string|null;
	}
	const enum GDokumentNovaKopiePisemnostiSPridelenimResponseDtoNames { IxsKop = "IxsKop",}
	const enum GDokumentNovaKopiePisemnostiSPridelenimResponseDtoFragments { IxsKop = "*",}
	const enum GDokumentNovaKopiePisemnostiSPridelenimResponseDtoTypes { IxsKop = "string",}
	const enum GDokumentNovaKopiePisemnostiSPridelenimResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření nové kopie dokumentu s založením ČJ a předáním (IGSslspid.NovaKopiePisemnostiSZalozenimCjAPredanim).*/
	interface GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny - je-li IsNull, logika si načte aktuální datum poslední změny písemnosti z databáze.*/
		DatZmena?: JsonDate|null;
		/**Typ vlastnictví.*/
		TypVlast?: number|null;
		/**Identifikátor kopie - je-li IsNull, bude vygenerován nový identifikátor a vrácen jako návratová hodnota metody.*/
		IxsKop?: string|null;
		/**Identifikace spisového uzlu na který má být kopie předána.*/
		IxsSu?: string|null;
		/**Identifikace funkce na kterou má být kopie předána - je-li IsNull, bude předáno pouze na uzel.*/
		IxsFun?: string|null;
		/**Účel distribuce (důvod).*/
		UcelDist?: string|null;
		/**Rok pro ČJ, je-li IsNull veme rok z kontextu.*/
		Rok?: number|null;
		/**Deník pro ČJ, je-li IsNull veme rok z kontextu.*/
		Sslden?: string|null;
		/**Pořadové číslo v deníku pro ČJ, je-li IsNull veme rok z kontextu.*/
		PorCislo?: number|null;
		/**Kopírovat elektronický obraz.*/
		KopirovatElObraz?: boolean|null;
		/**Kopírovat originální elektronický obraz.*/
		KopirovatOrigElObraz?: boolean|null;
		/**Kopírovat elektronické přílohy.*/
		KopirovatElPrilohy?: boolean|null;
		/**Kopírovat originální elektronické přílohy.*/
		KopirovatOrigElPrilohy?: boolean|null;
		/**Kopírovat vlastnosti.*/
		KopirovatVlastnosti?: boolean|null;
		/**Poznámka.*/
		Poznamka?: string|null;
	}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", TypVlast = "TypVlast", IxsKop = "IxsKop", IxsSu = "IxsSu", IxsFun = "IxsFun", UcelDist = "UcelDist", Rok = "Rok", Sslden = "Sslden", PorCislo = "PorCislo", KopirovatElObraz = "KopirovatElObraz", KopirovatOrigElObraz = "KopirovatOrigElObraz", KopirovatElPrilohy = "KopirovatElPrilohy", KopirovatOrigElPrilohy = "KopirovatOrigElPrilohy", KopirovatVlastnosti = "KopirovatVlastnosti", Poznamka = "Poznamka",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDtoFragments { Ixp = "*", DatZmena = "*", TypVlast = "*", IxsKop = "*", IxsSu = "*", IxsFun = "*", UcelDist = "*", Rok = "*", Sslden = "*", PorCislo = "*", KopirovatElObraz = "*", KopirovatOrigElObraz = "*", KopirovatElPrilohy = "*", KopirovatOrigElPrilohy = "*", KopirovatVlastnosti = "*", Poznamka = "*",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", TypVlast = "number", IxsKop = "string", IxsSu = "string", IxsFun = "string", UcelDist = "string", Rok = "number", Sslden = "string", PorCislo = "number", KopirovatElObraz = "boolean", KopirovatOrigElObraz = "boolean", KopirovatElPrilohy = "boolean", KopirovatOrigElPrilohy = "boolean", KopirovatVlastnosti = "boolean", Poznamka = "string",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření nové kopie dokumentu s založením ČJ a předáním (IGSslspid.NovaKopiePisemnostiSZalozenimCjAPredanim).*/
	interface GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDto {
		/**Identifikátor vzniklé kopie.*/
		IxsKop?: string|null;
		/**ČJ.*/
		Cj?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**Deník.*/
		Sslden?: string|null;
		/**Pořadové číslo.*/
		PorCislo?: number|null;
	}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDtoNames { IxsKop = "IxsKop", Cj = "Cj", Rok = "Rok", Sslden = "Sslden", PorCislo = "PorCislo",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDtoFragments { IxsKop = "*", Cj = "*", Rok = "*", Sslden = "*", PorCislo = "*",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDtoTypes { IxsKop = "string", Cj = "string", Rok = "number", Sslden = "string", PorCislo = "number",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPredanimResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření nové kopie dokumentu s založením ČJ a přidělením (IGSslspid.NovaKopiePisemnostiSZalozenimCjAPridelenim).*/
	interface GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum poslední změny - je-li IsNull, logika si načte aktuální datum poslední změny písemnosti z databáze.*/
		DatZmena?: JsonDate|null;
		/**Identifikátor kopie - je-li IsNull, bude vygenerován nový identifikátor a vrácen jako návratová hodnota metody.*/
		IxsKop?: string|null;
		/**Identifikace spisového uzlu na který má být kopie předána.*/
		IxsSu?: string|null;
		/**Identifikace funkce na kterou má být kopie předána - je-li IsNull, bude předáno pouze na uzel.*/
		IxsFun?: string|null;
		/**Účel distribuce (důvod).*/
		UcelDist?: string|null;
		/**Rok pro ČJ, je-li IsNull veme rok z kontextu.*/
		Rok?: number|null;
		/**Deník pro ČJ, je-li IsNull veme rok z kontextu.*/
		Sslden?: string|null;
		/**Pořadové číslo v deníku pro ČJ, je-li IsNull veme rok z kontextu.*/
		PorCislo?: number|null;
		/**Kopírovat elektronický obraz.*/
		KopirovatElObraz?: boolean|null;
		/**Kopírovat originální elektronický obraz.*/
		KopirovatOrigElObraz?: boolean|null;
		/**Kopírovat elektronické přílohy.*/
		KopirovatElPrilohy?: boolean|null;
		/**Kopírovat originální elektronické přílohy.*/
		KopirovatOrigElPrilohy?: boolean|null;
		/**Kopírovat vlastnosti.*/
		KopirovatVlastnosti?: boolean|null;
		/**Přidělení přímo.*/
		Primo?: boolean|null;
		/**Poznámka.*/
		Poznamka?: string|null;
	}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", IxsKop = "IxsKop", IxsSu = "IxsSu", IxsFun = "IxsFun", UcelDist = "UcelDist", Rok = "Rok", Sslden = "Sslden", PorCislo = "PorCislo", KopirovatElObraz = "KopirovatElObraz", KopirovatOrigElObraz = "KopirovatOrigElObraz", KopirovatElPrilohy = "KopirovatElPrilohy", KopirovatOrigElPrilohy = "KopirovatOrigElPrilohy", KopirovatVlastnosti = "KopirovatVlastnosti", Primo = "Primo", Poznamka = "Poznamka",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDtoFragments { Ixp = "*", DatZmena = "*", IxsKop = "*", IxsSu = "*", IxsFun = "*", UcelDist = "*", Rok = "*", Sslden = "*", PorCislo = "*", KopirovatElObraz = "*", KopirovatOrigElObraz = "*", KopirovatElPrilohy = "*", KopirovatOrigElPrilohy = "*", KopirovatVlastnosti = "*", Primo = "*", Poznamka = "*",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", IxsKop = "string", IxsSu = "string", IxsFun = "string", UcelDist = "string", Rok = "number", Sslden = "string", PorCislo = "number", KopirovatElObraz = "boolean", KopirovatOrigElObraz = "boolean", KopirovatElPrilohy = "boolean", KopirovatOrigElPrilohy = "boolean", KopirovatVlastnosti = "boolean", Primo = "boolean", Poznamka = "string",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro vytvoření nové kopie dokumentu s založením ČJ a přidělením (IGSslspid.NovaKopiePisemnostiSZalozenimCjAPridelenim).*/
	interface GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDto {
		/**Identifikátor vzniklé kopie.*/
		IxsKop?: string|null;
		/**ČJ.*/
		Cj?: string|null;
		/**Rok.*/
		Rok?: number|null;
		/**Deník.*/
		Sslden?: string|null;
		/**Pořadové číslo.*/
		PorCislo?: number|null;
	}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDtoNames { IxsKop = "IxsKop", Cj = "Cj", Rok = "Rok", Sslden = "Sslden", PorCislo = "PorCislo",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDtoFragments { IxsKop = "*", Cj = "*", Rok = "*", Sslden = "*", PorCislo = "*",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDtoTypes { IxsKop = "string", Cj = "string", Rok = "number", Sslden = "string", PorCislo = "number",}
	const enum GDokumentNovaKopiePisemnostiSZalozenimCjAPridelenimResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zaevidování emailu dle identifikátoru (IGSslspid.EmailGetFirstHash256).*/
	interface GDokumentEmailGetFirstHash256RequestDto {
		/**Identifikátor.*/
		EntryId?: string|null;
	}
	const enum GDokumentEmailGetFirstHash256RequestDtoNames { EntryId = "EntryId",}
	const enum GDokumentEmailGetFirstHash256RequestDtoFragments { EntryId = "*",}
	const enum GDokumentEmailGetFirstHash256RequestDtoTypes { EntryId = "string",}
	const enum GDokumentEmailGetFirstHash256RequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zaevidování emailu dle identifikátoru (IGSslspid.EmailGetFirstHash256).*/
	interface GDokumentEmailGetFirstHash256ResponseDto {
		/**Hash.*/
		Hash?: string|null;
	}
	const enum GDokumentEmailGetFirstHash256ResponseDtoNames { Hash = "Hash",}
	const enum GDokumentEmailGetFirstHash256ResponseDtoFragments { Hash = "*",}
	const enum GDokumentEmailGetFirstHash256ResponseDtoTypes { Hash = "string",}
	const enum GDokumentEmailGetFirstHash256ResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro kontrolu typu a velikosti souboru (IGSslspid.KontrolaTypuAVelikostiSouboru).*/
	interface GDokumentKontrolaTypuAVelikostiSouboruRequestDto {
		/**Cesta k souboru.*/
		FilePath?: string|null;
	}
	const enum GDokumentKontrolaTypuAVelikostiSouboruRequestDtoNames { FilePath = "FilePath",}
	const enum GDokumentKontrolaTypuAVelikostiSouboruRequestDtoFragments { FilePath = "*",}
	const enum GDokumentKontrolaTypuAVelikostiSouboruRequestDtoTypes { FilePath = "string",}
	const enum GDokumentKontrolaTypuAVelikostiSouboruRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro kontrolu typu a velikosti souboru (IGSslspid.KontrolaTypuAVelikostiSouboru).*/
	interface GDokumentKontrolaTypuAVelikostiSouboruResponseDto {
		/**Výsledek kontroly.*/
		VysledekKontroly?: boolean|null;
		/**Je špatný typ.*/
		JeSpatnyTyp?: boolean|null;
		/**Je velký.*/
		JeVelky?: boolean|null;
	}
	const enum GDokumentKontrolaTypuAVelikostiSouboruResponseDtoNames { VysledekKontroly = "VysledekKontroly", JeSpatnyTyp = "JeSpatnyTyp", JeVelky = "JeVelky",}
	const enum GDokumentKontrolaTypuAVelikostiSouboruResponseDtoFragments { VysledekKontroly = "*", JeSpatnyTyp = "*", JeVelky = "*",}
	const enum GDokumentKontrolaTypuAVelikostiSouboruResponseDtoTypes { VysledekKontroly = "boolean", JeSpatnyTyp = "boolean", JeVelky = "boolean",}
	const enum GDokumentKontrolaTypuAVelikostiSouboruResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zaevidování emailu dle identifikátoru (IGSslspid.EvidujEmailDNP).*/
	interface GDokumentEvidujEmailDNPRequestDto {
		/**Identifikátor.*/
		EntryId?: string|null;
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Cizí.*/
		cizi?: boolean|null;
		/**Odesilatel.*/
		odesilatel?: boolean|null;
	}
	const enum GDokumentEvidujEmailDNPRequestDtoNames { EntryId = "EntryId", Ixp = "Ixp", cizi = "cizi", odesilatel = "odesilatel",}
	const enum GDokumentEvidujEmailDNPRequestDtoFragments { EntryId = "*", Ixp = "*", cizi = "*", odesilatel = "*",}
	const enum GDokumentEvidujEmailDNPRequestDtoTypes { EntryId = "string", Ixp = "string", cizi = "boolean", odesilatel = "boolean",}
	const enum GDokumentEvidujEmailDNPRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zaevidování emailu dle identifikátoru (IGSslspid.EvidujEmailDNP).*/
	interface GDokumentEvidujEmailDNPResponseDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Je špatný typ.*/
		JeSpatnyTyp?: boolean|null;
		/**Je velký.*/
		JeVelky?: boolean|null;
	}
	const enum GDokumentEvidujEmailDNPResponseDtoNames { Ixp = "Ixp", JeSpatnyTyp = "JeSpatnyTyp", JeVelky = "JeVelky",}
	const enum GDokumentEvidujEmailDNPResponseDtoFragments { Ixp = "*", JeSpatnyTyp = "*", JeVelky = "*",}
	const enum GDokumentEvidujEmailDNPResponseDtoTypes { Ixp = "string", JeSpatnyTyp = "boolean", JeVelky = "boolean",}
	const enum GDokumentEvidujEmailDNPResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zaevidování emailu z dosle posty (IGSslspid.EvidujDokument).*/
	interface GDokumentEvidujDokumentRequestDto {
		/**Věc.*/
		Vec?: string|null;
		/**Věc podrobně.*/
		VecPodrobne?: string|null;
		/**Soubor el obrazu.*/
		SouborElObrazu?: string|null;
		/**Cizí.*/
		Cizi?: boolean|null;
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Typ písemnosti.*/
		TypPis?: string|null;
		/**Značka.*/
		AktZnacka?: string|null;
		/**Poznámka.*/
		Poznamka?: string|null;
		/**Identifikátor subjektu.*/
		IxsEsu?: string|null;
		/**Vytvořit čj.*/
		VytvoritCj?: boolean|null;
		/**Přidat el obraz.*/
		PridatElObraz?: boolean|null;
		/**Vytěžit položky wordu.*/
		VytezitPolozkyWordu?: boolean|null;
	}
	const enum GDokumentEvidujDokumentRequestDtoNames { Vec = "Vec", VecPodrobne = "VecPodrobne", SouborElObrazu = "SouborElObrazu", Cizi = "Cizi", Ixp = "Ixp", TypPis = "TypPis", AktZnacka = "AktZnacka", Poznamka = "Poznamka", IxsEsu = "IxsEsu", VytvoritCj = "VytvoritCj", PridatElObraz = "PridatElObraz", VytezitPolozkyWordu = "VytezitPolozkyWordu",}
	const enum GDokumentEvidujDokumentRequestDtoFragments { Vec = "*", VecPodrobne = "*", SouborElObrazu = "*", Cizi = "*", Ixp = "*", TypPis = "*", AktZnacka = "*", Poznamka = "*", IxsEsu = "*", VytvoritCj = "*", PridatElObraz = "*", VytezitPolozkyWordu = "*",}
	const enum GDokumentEvidujDokumentRequestDtoTypes { Vec = "string", VecPodrobne = "string", SouborElObrazu = "string", Cizi = "boolean", Ixp = "string", TypPis = "string", AktZnacka = "string", Poznamka = "string", IxsEsu = "string", VytvoritCj = "boolean", PridatElObraz = "boolean", VytezitPolozkyWordu = "boolean",}
	const enum GDokumentEvidujDokumentRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zaevidování emailu z dosle posty.*/
	interface GDokumentEvidujDokumentResponseDto {
	}
	const enum GDokumentEvidujDokumentResponseDtoNames {}
	const enum GDokumentEvidujDokumentResponseDtoFragments {}
	const enum GDokumentEvidujDokumentResponseDtoTypes {}
	const enum GDokumentEvidujDokumentResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro zaevidování souboru s možností vytěžení dat z wordu a možností přidání el. obrazu (IGSslspid.EvidujEmail).*/
	interface GDokumentEvidujEmailRequestDto {
		/**Identifikátor.*/
		EntryId?: string|null;
		/**Odesláno.*/
		Odeslano?: JsonDate|null;
		/**From.*/
		From?: string|null;
		/**Subject.*/
		Subject?: string|null;
		/**Body.*/
		Body?: string|null;
		/**To.*/
		To?: string|null;
		/**CC.*/
		CC?: string|null;
		/**BodyFormat.*/
		BodyFormat?: string|null;
		/**HtmlBody.*/
		HtmlBody?: string|null;
		/**Sender name.*/
		SenderName?: string|null;
		/**ToEmail.*/
		ToEmail?: string|null;
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Vlastní / cizí.*/
		VlastniCizi?: string|null;
		/**Nazev souboru el. obrazu. Pokud je prazdny, tak se ulozi telo mailu s priponou dle formatu mailu (txt, html).*/
		ElObrazFileName?: string|null;
		/**Soubor el. obrazu - eml nebo msg v BASE64.*/
		ElObrazFile?: string|null;
		/**Pole nazvu souboru priloh mailu.*/
		AttachmentsFileNames?: string[]|null;
		/**Pole souboru priloh mailu v BASE64.*/
		AttachmentsFiles?: string[]|null;
		/**Identifikátor odesialtele.*/
		IxsEsuOdes?: string|null;
		/**PorZast.*/
		PorZast?: number|null;
		/**LicZast.*/
		LicZast?: string|null;
		/**ZastTxt.*/
		ZastTxt?: string|null;
		/**Typ dokumentu z uzivatelskeho nastaveni.*/
		IxsTypUS?: string|null;
		/**Pristup z uzivatelskeho nastaveni.*/
		StUtajUS?: string|null;
		/**DateChange.*/
		DateChange?: JsonDate|null;
	}
	const enum GDokumentEvidujEmailRequestDtoNames { EntryId = "EntryId", Odeslano = "Odeslano", From = "From", Subject = "Subject", Body = "Body", To = "To", CC = "CC", BodyFormat = "BodyFormat", HtmlBody = "HtmlBody", SenderName = "SenderName", ToEmail = "ToEmail", Ixp = "Ixp", VlastniCizi = "VlastniCizi", ElObrazFileName = "ElObrazFileName", ElObrazFile = "ElObrazFile", AttachmentsFileNames = "AttachmentsFileNames", AttachmentsFiles = "AttachmentsFiles", IxsEsuOdes = "IxsEsuOdes", PorZast = "PorZast", LicZast = "LicZast", ZastTxt = "ZastTxt", IxsTypUS = "IxsTypUS", StUtajUS = "StUtajUS", DateChange = "DateChange",}
	const enum GDokumentEvidujEmailRequestDtoFragments { EntryId = "*", Odeslano = "*", From = "*", Subject = "*", Body = "*", To = "*", CC = "*", BodyFormat = "*", HtmlBody = "*", SenderName = "*", ToEmail = "*", Ixp = "*", VlastniCizi = "*", ElObrazFileName = "*", ElObrazFile = "*", AttachmentsFileNames = "*", AttachmentsFiles = "*", IxsEsuOdes = "*", PorZast = "*", LicZast = "*", ZastTxt = "*", IxsTypUS = "*", StUtajUS = "*", DateChange = "*",}
	const enum GDokumentEvidujEmailRequestDtoTypes { EntryId = "string", Odeslano = "JsonDate", From = "string", Subject = "string", Body = "string", To = "string", CC = "string", BodyFormat = "string", HtmlBody = "string", SenderName = "string", ToEmail = "string", Ixp = "string", VlastniCizi = "string", ElObrazFileName = "string", ElObrazFile = "string", AttachmentsFileNames = "string[]", AttachmentsFiles = "string[]", IxsEsuOdes = "string", PorZast = "number", LicZast = "string", ZastTxt = "string", IxsTypUS = "string", StUtajUS = "string", DateChange = "JsonDate",}
	const enum GDokumentEvidujEmailRequestDtoTypeLengths {}
	/**Výstupní parametry metody pro zaevidování souboru s možností vytěžení dat z wordu a možností přidání el. obrazu (IGSslspid.EvidujEmail).*/
	interface GDokumentEvidujEmailResponseDto {
		/**Výstup - text nebo identifikátor.*/
		Output?: string|null;
		/**Identifikátor.*/
		Ixp?: string|null;
		/**Message.*/
		Message?: string|null;
		/**DateChange.*/
		DateChange?: JsonDate|null;
	}
	const enum GDokumentEvidujEmailResponseDtoNames { Output = "Output", Ixp = "Ixp", Message = "Message", DateChange = "DateChange",}
	const enum GDokumentEvidujEmailResponseDtoFragments { Output = "*", Ixp = "*", Message = "*", DateChange = "*",}
	const enum GDokumentEvidujEmailResponseDtoTypes { Output = "string", Ixp = "string", Message = "string", DateChange = "JsonDate",}
	const enum GDokumentEvidujEmailResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro přidání el. přílohy k dokumentu (IGSslspid.AppendAttachment).*/
	interface GDokumentAppendAttachmentRequestDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Datum změny dokumentu.*/
		DatZmena?: JsonDate|null;
		/**Název souboru.*/
		FileName?: string|null;
		/**Obsah souboru v BASE64.*/
		File?: string|null;
		/**PrizVlastniDok.*/
		PrizVlastniDok?: boolean|null;
	}
	const enum GDokumentAppendAttachmentRequestDtoNames { Ixp = "Ixp", DatZmena = "DatZmena", FileName = "FileName", File = "File", PrizVlastniDok = "PrizVlastniDok",}
	const enum GDokumentAppendAttachmentRequestDtoFragments { Ixp = "*", DatZmena = "*", FileName = "*", File = "*", PrizVlastniDok = "*",}
	const enum GDokumentAppendAttachmentRequestDtoTypes { Ixp = "string", DatZmena = "JsonDate", FileName = "string", File = "string", PrizVlastniDok = "boolean",}
	const enum GDokumentAppendAttachmentRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro přidání el. přílohy k dokumentu (IGSslspid.AppendAttachment).*/
	interface GDokumentGetEntityNameRequestDto {
		/**Autogeneraded.*/
		Ixp?: string|null;
		/**Autogeneraded.*/
		TypSpis?: number|null;
		/**Autogeneraded.*/
		PrizSpis?: number|null;
		/**Autogeneraded.*/
		TypAg?: number|null;
		/**Autogeneraded.*/
		TypAgTxt?: string|null;
		/**Autogeneraded.*/
		SPrij?: number|null;
		/**Autogeneraded.*/
		PrizCj?: number|null;
		/**Autogeneraded.*/
		StavPis?: number|null;
		/**Autogeneraded.*/
		SOrig?: number|null;
		/**Autogeneraded.*/
		IxsExt?: string|null;
	}
	const enum GDokumentGetEntityNameRequestDtoNames { Ixp = "Ixp", TypSpis = "TypSpis", PrizSpis = "PrizSpis", TypAg = "TypAg", TypAgTxt = "TypAgTxt", SPrij = "SPrij", PrizCj = "PrizCj", StavPis = "StavPis", SOrig = "SOrig", IxsExt = "IxsExt",}
	const enum GDokumentGetEntityNameRequestDtoFragments { Ixp = "*", TypSpis = "*", PrizSpis = "*", TypAg = "*", TypAgTxt = "*", SPrij = "*", PrizCj = "*", StavPis = "*", SOrig = "*", IxsExt = "*",}
	const enum GDokumentGetEntityNameRequestDtoTypes { Ixp = "string", TypSpis = "number", PrizSpis = "number", TypAg = "number", TypAgTxt = "string", SPrij = "number", PrizCj = "number", StavPis = "number", SOrig = "number", IxsExt = "string",}
	const enum GDokumentGetEntityNameRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro přidání el. přílohy k dokumentu (IGSslspid.AppendAttachment).*/
	interface GDokumentGetEntityNameResponsetDto {
		/**The nazev*/
		Nazev?: string|null;
	}
	const enum GDokumentGetEntityNameResponsetDtoNames { Nazev = "Nazev",}
	const enum GDokumentGetEntityNameResponsetDtoFragments { Nazev = "*",}
	const enum GDokumentGetEntityNameResponsetDtoTypes { Nazev = "string",}
	const enum GDokumentGetEntityNameResponsetDtoTypeLengths {}
	/**Výstupní parametry metody pro přidání el. přílohy k dokumentu (IGSslspid.AppendAttachment).*/
	interface GDokumentAppendAttachmentResponseDto {
		/**Identifikátor přílohy.*/
		Ixb?: string|null;
	}
	const enum GDokumentAppendAttachmentResponseDtoNames { Ixb = "Ixb",}
	const enum GDokumentAppendAttachmentResponseDtoFragments { Ixb = "*",}
	const enum GDokumentAppendAttachmentResponseDtoTypes { Ixb = "string",}
	const enum GDokumentAppendAttachmentResponseDtoTypeLengths {}
	/**Pocet kopii dokumentu request Dto*/
	interface GSslsPidGetPocetKopiiResponsetDto {
		/**Pocet*/
		Pocet?: number|null;
	}
	const enum GSslsPidGetPocetKopiiResponsetDtoNames { Pocet = "Pocet",}
	const enum GSslsPidGetPocetKopiiResponsetDtoFragments { Pocet = "*",}
	const enum GSslsPidGetPocetKopiiResponsetDtoTypes { Pocet = "number",}
	const enum GSslsPidGetPocetKopiiResponsetDtoTypeLengths {}
	/**Request na Pocet kopii dokumentu request Dto*/
	interface GSslsPidGetPocetKopiiRequesttDto {
		/**Pocet*/
		IxpOriginalu?: string|null;
	}
	const enum GSslsPidGetPocetKopiiRequesttDtoNames { IxpOriginalu = "IxpOriginalu",}
	const enum GSslsPidGetPocetKopiiRequesttDtoFragments { IxpOriginalu = "*",}
	const enum GSslsPidGetPocetKopiiRequesttDtoTypes { IxpOriginalu = "string",}
	const enum GSslsPidGetPocetKopiiRequesttDtoTypeLengths {}
	/**Pocet kopii dokumentu request Dto*/
	interface GSslNaplnEleFromIxpResponsetDto {
		/**GDocumentDataSet*/
		Ds?: any|null;
	}
	const enum GSslNaplnEleFromIxpResponsetDtoNames { Ds = "Ds",}
	const enum GSslNaplnEleFromIxpResponsetDtoFragments { Ds = "*",}
	const enum GSslNaplnEleFromIxpResponsetDtoTypes { Ds = "any",}
	const enum GSslNaplnEleFromIxpResponsetDtoTypeLengths {}
	/**Request na Pocet kopii dokumentu request Dto*/
	interface GSslNaplnEleFromIxpRequestDto {
		/**Ixp*/
		Ixp?: string|null;
		/**Prefix pro jména formulářových polí ve Wordu.*/
		Prefix?: string|null;
		/**Dataset s položkami pro Word*/
		Ds?: any|null;
		/**podrizene*/
		Podrizene?: boolean|null;
		/**důvod pro zalogování GDPR - např. jméno šablony, pokud je prázdný pak se neloguje!!*/
		DuvodUcel?: string|null;
	}
	const enum GSslNaplnEleFromIxpRequestDtoNames { Ixp = "Ixp", Prefix = "Prefix", Ds = "Ds", Podrizene = "Podrizene", DuvodUcel = "DuvodUcel",}
	const enum GSslNaplnEleFromIxpRequestDtoFragments { Ixp = "*", Prefix = "*", Ds = "*", Podrizene = "*", DuvodUcel = "*",}
	const enum GSslNaplnEleFromIxpRequestDtoTypes { Ixp = "string", Prefix = "string", Ds = "any", Podrizene = "boolean", DuvodUcel = "string",}
	const enum GSslNaplnEleFromIxpRequestDtoTypeLengths {}
	/**Pocet kopii dokumentu request Dto*/
	interface GSslNaplnEleResponsetDto {
		/**Dataset s položkami pro Word*/
		Ds?: any|null;
	}
	const enum GSslNaplnEleResponsetDtoNames { Ds = "Ds",}
	const enum GSslNaplnEleResponsetDtoFragments { Ds = "*",}
	const enum GSslNaplnEleResponsetDtoTypes { Ds = "any",}
	const enum GSslNaplnEleResponsetDtoTypeLengths {}
	/**Request na Pocet kopii dokumentu request Dto*/
	interface GSslNaplnEleRequestDto {
		/**SslspidDto*/
		SslspidDto?: Gordic.Ssl.Interface.GSslspidDto|null;
		/**Prefix pro jména formulářových polí ve Wordu.*/
		Prefix?: string|null;
		/**GDocumentDataSet*/
		Ds?: any|null;
		/**podrizene*/
		Podrizene?: boolean|null;
		/**důvod pro zalogování GDPR - např. jméno šablony, pokud je prázdný pak se neloguje!!*/
		DuvodUcel?: string|null;
		/**ServerDatetime*/
		Current?: JsonDate|null;
	}
	const enum GSslNaplnEleRequestDtoNames { SslspidDto = "SslspidDto", Prefix = "Prefix", Ds = "Ds", Podrizene = "Podrizene", DuvodUcel = "DuvodUcel", Current = "Current",}
	const enum GSslNaplnEleRequestDtoFragments { SslspidDto = "*", Prefix = "*", Ds = "*", Podrizene = "*", DuvodUcel = "*", Current = "*",}
	const enum GSslNaplnEleRequestDtoTypes { SslspidDto = "Gordic.Ssl.Interface.GSslspidDto", Prefix = "string", Ds = "any", Podrizene = "boolean", DuvodUcel = "string", Current = "JsonDate",}
	const enum GSslNaplnEleRequestDtoTypeLengths {}
	/**Pocet kopii dokumentu request Dto*/
	interface GSslPripravSouborDolozkyRequestDto {
		/**FileInput*/
		FileinfoInput?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Ixp*/
		Ixp?: string|null;
	}
	const enum GSslPripravSouborDolozkyRequestDtoNames { FileinfoInput = "FileinfoInput", Ixp = "Ixp",}
	const enum GSslPripravSouborDolozkyRequestDtoFragments { FileinfoInput = "*", Ixp = "*",}
	const enum GSslPripravSouborDolozkyRequestDtoTypes { FileinfoInput = "Gordic.General.ApplicationInterface.GFileInfoDto", Ixp = "string",}
	const enum GSslPripravSouborDolozkyRequestDtoTypeLengths {}
	/**Pocet kopii dokumentu request Dto*/
	interface GSslPripravSouborDolozkyResponseDto {
		/**FileInput*/
		FileinfoResponse?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
	}
	const enum GSslPripravSouborDolozkyResponseDtoNames { FileinfoResponse = "FileinfoResponse",}
	const enum GSslPripravSouborDolozkyResponseDtoFragments { FileinfoResponse = "*",}
	const enum GSslPripravSouborDolozkyResponseDtoTypes { FileinfoResponse = "Gordic.General.ApplicationInterface.GFileInfoDto",}
	const enum GSslPripravSouborDolozkyResponseDtoTypeLengths {}
	/**Pocet kopii dokumentu request Dto*/
	interface GSslUlozeniSouboruDolozkyRequestDto {
		/**FileInput*/
		FileinfoInput?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		/**Ixp*/
		Ixp?: string|null;
	}
	const enum GSslUlozeniSouboruDolozkyRequestDtoNames { FileinfoInput = "FileinfoInput", Ixp = "Ixp",}
	const enum GSslUlozeniSouboruDolozkyRequestDtoFragments { FileinfoInput = "*", Ixp = "*",}
	const enum GSslUlozeniSouboruDolozkyRequestDtoTypes { FileinfoInput = "Gordic.General.ApplicationInterface.GFileInfoDto", Ixp = "string",}
	const enum GSslUlozeniSouboruDolozkyRequestDtoTypeLengths {}
	/**Pocet kopii dokumentu request Dto*/
	interface GSslUlozeniSouboruDolozkyResponseDto {
		/**Vysledek*/
		Vysledek?: boolean|null;
	}
	const enum GSslUlozeniSouboruDolozkyResponseDtoNames { Vysledek = "Vysledek",}
	const enum GSslUlozeniSouboruDolozkyResponseDtoFragments { Vysledek = "*",}
	const enum GSslUlozeniSouboruDolozkyResponseDtoTypes { Vysledek = "boolean",}
	const enum GSslUlozeniSouboruDolozkyResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Gin\IGVecnaSkupina.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Věcná skupina - ginsvsk
	* @domain DRMS
	* @businessObject VecnaSkupina
	*/
	interface VecnaSkupinaSsl {
		/**Spisy věcné skupiny*/
		spisyVecneSkupiny(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GSpisVecneSkupinyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VecnaSkupinaSsl: ServiceBase & Catalog.VecnaSkupinaSsl;
	}
	const VecnaSkupinaSsl: Client["VecnaSkupinaSsl"];
}
declare namespace Gordic.Ssl.Interface {
	/**Spis vecne skupiny*/
	interface GSpisVecneSkupinyDto {
		/**ID spisu*/
		ixp?: string|null;
		/**ID spisu*/
		ixp_spis?: string|null;
		/**Vlastník - funkce*/
		ixs_fun_akt?: string|null;
		/**Vlastník - funkce (txt)*/
		ixs_fun_akt_txt?: string|null;
		/**Vlastník - spisový uzel*/
		ixs_su_akt?: string|null;
		/**Vlastník - spisový uzel (txt)*/
		ixs_su_akt_txt?: string|null;
		/**Věc*/
		nazev?: string|null;
		/**Značka*/
		akt_znacka?: string|null;
		/**Typ dokumentu*/
		ixs_typ?: string|null;
		/**Typ dokumentu (txt)*/
		ixs_typ_txt?: string|null;
		/**Stav spisu*/
		stav_pis?: number|null;
		/**Stav spisu (txt)*/
		stav_pis_txt?: string|null;
	}
	const enum GSpisVecneSkupinyDtoNames { ixp = "ixp", ixp_spis = "ixp_spis", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_txt = "ixs_fun_akt_txt", ixs_su_akt = "ixs_su_akt", ixs_su_akt_txt = "ixs_su_akt_txt", nazev = "nazev", akt_znacka = "akt_znacka", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis = "stav_pis", stav_pis_txt = "stav_pis_txt",}
	const enum GSpisVecneSkupinyDtoFragments { ixp = "*", ixp_spis = "*", ixs_fun_akt = "*", ixs_fun_akt_txt = "*", ixs_su_akt = "*", ixs_su_akt_txt = "*", nazev = "*", akt_znacka = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis = "*", stav_pis_txt = "*",}
	const enum GSpisVecneSkupinyDtoTypes { ixp = "string", ixp_spis = "string", ixs_fun_akt = "string", ixs_fun_akt_txt = "string", ixs_su_akt = "string", ixs_su_akt_txt = "string", nazev = "string", akt_znacka = "string", ixs_typ = "string", ixs_typ_txt = "string", stav_pis = "number", stav_pis_txt = "string",}
	const enum GSpisVecneSkupinyDtoTypeLengths {}
	const enum GVecnaSkupinaSpisyFilterEnum {
		/**Věcná skupina*/
		ixs_vsk,
		/**Pouze nevyřízené*/
		pouze_neuzavrene,
		/**Pouze uzavřené*/
		pouze_uzavrene,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Kontrola metadat\Dto\ControlNevalidityFields.d.ts 

declare namespace Gordic.Ssl.Interface {
    /**Tlačítka kontroly nevalidity*/
	interface ControlNevalidityFields {
        /**počet příloh*/
		poc_priloh?: boolean|null;
        /**historie*/
		historie?: boolean|null;
        /**prevzato od*/
		ixs_su_od?: boolean|null;
        /**typ dokumentu*/
		ixs_typ?: boolean|null;
        /**typ dokumentu - filtr aktivity ssl*/
		ixs_typ_filter?: GBaseFilter<number>|null;
        /**značka odesílatele*/
		znacka_odes?: boolean|null;
        /**odesílatel*/
		ixs_esu?: boolean|null;
        /**počet listů str*/
		poc_listu_str?: boolean|null;
        /**počet listů*/
		poc_listu?: boolean|null;
        /**spisový plán*/
		spis_pl?: boolean|null;
        /**číslo jednací*/
		cj_spis?: boolean|null;
        /**Věc*/
		nazev?: boolean|null;
	}
	const enum ControlNevalidityFieldsNames { poc_priloh = "poc_priloh", historie = "historie", ixs_su_od = "ixs_su_od", ixs_typ = "ixs_typ", ixs_typ_filter = "ixs_typ_filter", znacka_odes = "znacka_odes", ixs_esu = "ixs_esu", poc_listu_str = "poc_listu_str", poc_listu = "poc_listu", spis_pl = "spis_pl", cj_spis = "cj_spis", nazev = "nazev",}
	const enum ControlNevalidityFieldsFragments { poc_priloh = "*", historie = "*", ixs_su_od = "*", ixs_typ = "*", ixs_typ_filter = "*", znacka_odes = "*", ixs_esu = "*", poc_listu_str = "*", poc_listu = "*", spis_pl = "*", cj_spis = "*", nazev = "*",}
	const enum ControlNevalidityFieldsTypes { poc_priloh = "boolean", historie = "boolean", ixs_su_od = "boolean", ixs_typ = "boolean", ixs_typ_filter = "GBaseFilter<number>", znacka_odes = "boolean", ixs_esu = "boolean", poc_listu_str = "boolean", poc_listu = "boolean", spis_pl = "boolean", cj_spis = "boolean", nazev = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Kontrola metadat\Dto\NeevidDokSpisNevalidiFields.d.ts 

declare namespace Gordic.Ssl.Interface {
    /**Tlačítka kontroly nevalidity*/
	interface NeevidDokSpisNevalidiFields {
        /**Věc*/
		nazev?: boolean|null;
        /**spisový plán/ spis. znak*/
		spis_pl?: boolean|null;
        /**číslo jednací*/
		cj_spis?: boolean|null;
        /**datum vytvoření*/
		dat_pod?: boolean|null;
        /**prevzato od*/
		ixs_su_od?: boolean|null;
	}
	const enum NeevidDokSpisNevalidiFieldsNames { nazev = "nazev", spis_pl = "spis_pl", cj_spis = "cj_spis", dat_pod = "dat_pod", ixs_su_od = "ixs_su_od",}
	const enum NeevidDokSpisNevalidiFieldsFragments { nazev = "*", spis_pl = "*", cj_spis = "*", dat_pod = "*", ixs_su_od = "*",}
	const enum NeevidDokSpisNevalidiFieldsTypes { nazev = "boolean", spis_pl = "boolean", cj_spis = "boolean", dat_pod = "boolean", ixs_su_od = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Kontrola metadat\Dto\OpravaMetadatNevalidPolozekDokSpisDetailDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**
	*     Dto kontroly metadat
	*     
	*/
	interface OpravaMetadatNevalidPolozekDokSpisDetailDto extends Gordic.Wfl.Interface.GEvidDokSpisDto {
		/**
		*     Příznak, jestli lze zobrazit metadata v detailu objektu
		*     
		*/
		lzeZobrazitMetadataDokSpis?: boolean|null;
		/**
		*     Příznak, jestli lze doplnit metadata v detailu objektu
		*     
		*/
		lzeDoplnitMetadataDokSpis?: boolean|null;
		/**
		*     Doplněk k číslu jednacímu
		*     
		*/
		cj_ext?: string|null;
		/**
		*     Filtr spisových znaků
		*     
		*/
		spis_znak_filter?: number[]|null;
		/**
		*     Licence
		*     
		*/
		lic?: string|null;
		/**
		*     Číslo chyby
		*     
		*/
		cislo_chyby?: number|null;
		/**
		*     dto poliček nevalidity
		*     
		*/
		dtoNevalidity?: Gordic.Ssl.Interface.ControlNevalidityFields|null;
	}
	const enum OpravaMetadatNevalidPolozekDokSpisDetailDtoNames { lzeZobrazitMetadataDokSpis = "lzeZobrazitMetadataDokSpis", lzeDoplnitMetadataDokSpis = "lzeDoplnitMetadataDokSpis", cj_ext = "cj_ext", spis_znak_filter = "spis_znak_filter", lic = "lic", cislo_chyby = "cislo_chyby", dtoNevalidity = "dtoNevalidity", ixp = "ixp", ixs_zup = "ixs_zup", priz_zup = "priz_zup", priz_spis = "priz_spis", ixp_spis = "ixp_spis", stav_sul = "stav_sul", priz_vyp = "priz_vyp", priz_skn = "priz_skn", ixs_vsk = "ixs_vsk", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev = "nazev", akt_znacka = "akt_znacka", ixs_su_od = "ixs_su_od", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", dat_vyriz = "dat_vyriz", dat_pod = "dat_pod", dat_skartace = "dat_skartace", dat_prij_spi = "dat_prij_spi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poz_skar = "poz_skar", dat_uzav = "dat_uzav", status_pis = "status_pis", obsah_text = "obsah_text", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", s_uzav = "s_uzav", ixs_lpc = "ixs_lpc", s_ele = "s_ele", s_fyz = "s_fyz", s_ssl = "s_ssl", priz_neevid = "priz_neevid", k_v = "k_v", stav_k_f = "stav_k_f", s_prij = "s_prij", ixs_esu = "ixs_esu", lic_zast = "lic_zast", por_zast = "por_zast", znacka_odes = "znacka_odes", ixs_typ = "ixs_typ", poc_listu = "poc_listu", poc_priloh = "poc_priloh", jeVeSpisovne = "jeVeSpisovne", jeVeSpivzup = "jeVeSpivzup",}
	const enum OpravaMetadatNevalidPolozekDokSpisDetailDtoFragments { lzeZobrazitMetadataDokSpis = "*", lzeDoplnitMetadataDokSpis = "*", cj_ext = "*", spis_znak_filter = "*", lic = "*", cislo_chyby = "*", dtoNevalidity = "*", ixp = "*", ixs_zup = "*", priz_zup = "*", priz_spis = "*", ixp_spis = "*", stav_sul = "*", priz_vyp = "*", priz_skn = "*", ixs_vsk = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", nazev = "*", akt_znacka = "*", ixs_su_od = "*", ixs_spi = "*", ixs_fun = "*", dat_vyriz = "*", dat_pod = "*", dat_skartace = "*", dat_prij_spi = "*", dat_zmena = "*", zmenu_prov = "*", poz_skar = "*", dat_uzav = "*", status_pis = "*", obsah_text = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", s_uzav = "*", ixs_lpc = "*", s_ele = "*", s_fyz = "*", s_ssl = "*", priz_neevid = "*", k_v = "*", stav_k_f = "*", s_prij = "*", ixs_esu = "*", lic_zast = "*", por_zast = "*", znacka_odes = "*", ixs_typ = "*", poc_listu = "*", poc_priloh = "*", jeVeSpisovne = "*", jeVeSpivzup = "*",}
	const enum OpravaMetadatNevalidPolozekDokSpisDetailDtoTypes { lzeZobrazitMetadataDokSpis = "boolean", lzeDoplnitMetadataDokSpis = "boolean", cj_ext = "string", spis_znak_filter = "number[]", lic = "string", cislo_chyby = "number", dtoNevalidity = "Gordic.Ssl.Interface.ControlNevalidityFields", ixp = "string", ixs_zup = "string", priz_zup = "number", priz_spis = "number", ixp_spis = "string", stav_sul = "number", priz_vyp = "number", priz_skn = "number", ixs_vsk = "string", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", nazev = "string", akt_znacka = "string", ixs_su_od = "string", ixs_spi = "string", ixs_fun = "string", dat_vyriz = "JsonDate", dat_pod = "JsonDate", dat_skartace = "JsonDate", dat_prij_spi = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", poz_skar = "string", dat_uzav = "JsonDate", status_pis = "number", obsah_text = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", s_uzav = "number", ixs_lpc = "string", s_ele = "number", s_fyz = "number", s_ssl = "number", priz_neevid = "number", k_v = "number", stav_k_f = "number", s_prij = "number", ixs_esu = "string", lic_zast = "string", por_zast = "number", znacka_odes = "string", ixs_typ = "string", poc_listu = "string", poc_priloh = "number", jeVeSpisovne = "boolean", jeVeSpivzup = "boolean",}
	const enum OpravaMetadatNevalidPolozekDokSpisDetailDtoTypeLengths { ixp = 12, ixs_zup = 12, ixp_spis = 12, ixs_vsk = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, nazev = 100, akt_znacka = 50, ixs_su_od = 12, ixs_spi = 12, ixs_fun = 12, zmenu_prov = 12, poz_skar = 50, obsah_text = 254, ixs_zmp_od = 12, ixs_lpc = 12, ixs_esu = 12, lic_zast = 4, znacka_odes = 50, ixs_typ = 12, poc_listu = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Kontrola metadat\Dto\OpravaMetadatNevalidPolozekDokSpisSaveDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**
	*     Dto s daty, které jsou předané k uložení z TS do C#
	*     
	*/
	interface OpravaMetadatNevalidPolozekDokSpisSaveDto extends Gordic.Wfl.Interface.GEvidDokSpisDto {
		/**
		*     cj_ext
		*     
		*/
		cj_ext?: string|null;
		/**
		*     historie
		*     
		*/
		historie?: string|null;
		/**
		*     lic
		*     
		*/
		lic?: string|null;
	}
	const enum OpravaMetadatNevalidPolozekDokSpisSaveDtoNames { cj_ext = "cj_ext", historie = "historie", lic = "lic", ixp = "ixp", ixs_zup = "ixs_zup", priz_zup = "priz_zup", priz_spis = "priz_spis", ixp_spis = "ixp_spis", stav_sul = "stav_sul", priz_vyp = "priz_vyp", priz_skn = "priz_skn", ixs_vsk = "ixs_vsk", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev = "nazev", akt_znacka = "akt_znacka", ixs_su_od = "ixs_su_od", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", dat_vyriz = "dat_vyriz", dat_pod = "dat_pod", dat_skartace = "dat_skartace", dat_prij_spi = "dat_prij_spi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poz_skar = "poz_skar", dat_uzav = "dat_uzav", status_pis = "status_pis", obsah_text = "obsah_text", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", s_uzav = "s_uzav", ixs_lpc = "ixs_lpc", s_ele = "s_ele", s_fyz = "s_fyz", s_ssl = "s_ssl", priz_neevid = "priz_neevid", k_v = "k_v", stav_k_f = "stav_k_f", s_prij = "s_prij", ixs_esu = "ixs_esu", lic_zast = "lic_zast", por_zast = "por_zast", znacka_odes = "znacka_odes", ixs_typ = "ixs_typ", poc_listu = "poc_listu", poc_priloh = "poc_priloh", jeVeSpisovne = "jeVeSpisovne", jeVeSpivzup = "jeVeSpivzup",}
	const enum OpravaMetadatNevalidPolozekDokSpisSaveDtoFragments { cj_ext = "*", historie = "*", lic = "*", ixp = "*", ixs_zup = "*", priz_zup = "*", priz_spis = "*", ixp_spis = "*", stav_sul = "*", priz_vyp = "*", priz_skn = "*", ixs_vsk = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", nazev = "*", akt_znacka = "*", ixs_su_od = "*", ixs_spi = "*", ixs_fun = "*", dat_vyriz = "*", dat_pod = "*", dat_skartace = "*", dat_prij_spi = "*", dat_zmena = "*", zmenu_prov = "*", poz_skar = "*", dat_uzav = "*", status_pis = "*", obsah_text = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", s_uzav = "*", ixs_lpc = "*", s_ele = "*", s_fyz = "*", s_ssl = "*", priz_neevid = "*", k_v = "*", stav_k_f = "*", s_prij = "*", ixs_esu = "*", lic_zast = "*", por_zast = "*", znacka_odes = "*", ixs_typ = "*", poc_listu = "*", poc_priloh = "*", jeVeSpisovne = "*", jeVeSpivzup = "*",}
	const enum OpravaMetadatNevalidPolozekDokSpisSaveDtoTypes { cj_ext = "string", historie = "string", lic = "string", ixp = "string", ixs_zup = "string", priz_zup = "number", priz_spis = "number", ixp_spis = "string", stav_sul = "number", priz_vyp = "number", priz_skn = "number", ixs_vsk = "string", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", nazev = "string", akt_znacka = "string", ixs_su_od = "string", ixs_spi = "string", ixs_fun = "string", dat_vyriz = "JsonDate", dat_pod = "JsonDate", dat_skartace = "JsonDate", dat_prij_spi = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", poz_skar = "string", dat_uzav = "JsonDate", status_pis = "number", obsah_text = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", s_uzav = "number", ixs_lpc = "string", s_ele = "number", s_fyz = "number", s_ssl = "number", priz_neevid = "number", k_v = "number", stav_k_f = "number", s_prij = "number", ixs_esu = "string", lic_zast = "string", por_zast = "number", znacka_odes = "string", ixs_typ = "string", poc_listu = "string", poc_priloh = "number", jeVeSpisovne = "boolean", jeVeSpivzup = "boolean",}
	const enum OpravaMetadatNevalidPolozekDokSpisSaveDtoTypeLengths { ixp = 12, ixs_zup = 12, ixp_spis = 12, ixs_vsk = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, nazev = 100, akt_znacka = 50, ixs_su_od = 12, ixs_spi = 12, ixs_fun = 12, zmenu_prov = 12, poz_skar = 50, obsah_text = 254, ixs_zmp_od = 12, ixs_lpc = 12, ixs_esu = 12, lic_zast = 4, znacka_odes = 50, ixs_typ = 12, poc_listu = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\NEN\IGNenSsl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Odeslané maily
	* @domain DRMS
	*/
	interface SslNen {
		/**VratSeznamCekajicichOperaci*/
		vratSeznamCekajicichOperaci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ssl.Interface.GVratSeznamCekajicichOperaciDataDto>>;
		/**PredejSpisovyObjekt*/
		predejSpisovyObjekt(rq?:Gordic.Ssl.Interface.GPredejSpisovyObjektRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GPredejSpisovyObjektRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GPredejSpisovyObjektRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GPredejSpisovyObjektResponseDto>>;
		/**ZiskejSpisovyObjekt*/
		ziskejSpisovyObjekt(rq?:Gordic.Ssl.Interface.GZiskejSpisovyObjektRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GZiskejSpisovyObjektRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GZiskejSpisovyObjektRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GZiskejSpisovyObjektResponseDto>>;
		/**ZiskejSpisovyObjekt*/
		ziskejSpisovyObjektVolaniZPrilohDokumentu(rq?:Gordic.Ssl.Interface.GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GZiskejSpisovyObjektVolaniZPrilohDokumentuResponseDto>>;
		/**PredejSpisoveObjekty*/
		predejSpisoveObjekty(rq?:Gordic.Ssl.Interface.GPredejSpisoveObjektyRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GPredejSpisoveObjektyRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GPredejSpisoveObjektyRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GPredejSpisoveObjektyResponseDto>>;
		/**ZiskejInfoSpisovyObjekt*/
		ziskejInfoSpisovyObjekt(rq?:Gordic.Ssl.Interface.GZiskejInfoSpisovyObjektRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GZiskejInfoSpisovyObjektRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GZiskejInfoSpisovyObjektRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GZiskejInfoSpisovyObjektResponseDto>>;
		/**ZalozDokumentZNen*/
		zalozDokumentZNen(rq?:Gordic.Ssl.Interface.GZalozDokumentRequestDto|CallParams<GServiceActionRequest<Gordic.Ssl.Interface.GZalozDokumentRequestDto>>): _Task<GServiceActionRequest<Gordic.Ssl.Interface.GZalozDokumentRequestDto>,GServiceActionResponse<Gordic.Ssl.Interface.GZalozDokumentResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SslNen: ServiceBase & Catalog.SslNen;
	}
	const SslNen: Client["SslNen"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\NEN\Dto\GNenDto.d.ts 

declare namespace Gordic.Ssl.Interface {
	/**GSeznamCekajicichOperaciFilter*/
	const enum GSeznamCekajicichOperaciFilter {
	}
	/**Dto pro kontrolu z EPK*/
	interface GVratSeznamCekajicichOperaciDataDto {
		/**OperaceIdentifikator*/
		OperaceIdentifikator?: string|null;
		/**OperaceIdentifikator*/
		OperaceStav?: string|null;
		/**OperaceIdentifikator*/
		OperaceStavTxt?: string|null;
		/**OperaceIdentifikator*/
		OperaceTyp?: string|null;
		/**OperaceIdentifikator*/
		OperaceTypTxt?: string|null;
		/**OperaceIdentifikator*/
		PouzeJedenDokument?: string|null;
	}
	const enum GVratSeznamCekajicichOperaciDataDtoNames { OperaceIdentifikator = "OperaceIdentifikator", OperaceStav = "OperaceStav", OperaceStavTxt = "OperaceStavTxt", OperaceTyp = "OperaceTyp", OperaceTypTxt = "OperaceTypTxt", PouzeJedenDokument = "PouzeJedenDokument",}
	const enum GVratSeznamCekajicichOperaciDataDtoFragments { OperaceIdentifikator = "*", OperaceStav = "*", OperaceStavTxt = "*", OperaceTyp = "*", OperaceTypTxt = "*", PouzeJedenDokument = "*",}
	const enum GVratSeznamCekajicichOperaciDataDtoTypes { OperaceIdentifikator = "string", OperaceStav = "string", OperaceStavTxt = "string", OperaceTyp = "string", OperaceTypTxt = "string", PouzeJedenDokument = "string",}
	const enum GVratSeznamCekajicichOperaciDataDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GVratSeznamCekajicichOperaciResponseDto {
		/**Seznam*/
		Seznam?: Gordic.Ssl.Interface.GVratSeznamCekajicichOperaciDataDto[]|null;
	}
	const enum GVratSeznamCekajicichOperaciResponseDtoNames { Seznam = "Seznam",}
	const enum GVratSeznamCekajicichOperaciResponseDtoFragments { Seznam = "*",}
	const enum GVratSeznamCekajicichOperaciResponseDtoTypes { Seznam = "Gordic.Ssl.Interface.GVratSeznamCekajicichOperaciDataDto[]",}
	const enum GVratSeznamCekajicichOperaciResponseDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GPredejSpisovyObjektRequestDto {
		/**TypOperace*/
		TypOperace?: Gordic.Ssl.Interface.TypOperace|null;
		/**HodnotaOperace*/
		HodnotaOperace?: string|null;
		/**PouzeJedenDokument*/
		PouzeJedenDokument?: boolean|null;
		/**Dokument*/
		Ixp?: string|null;
		/**Dokument*/
		Ixb?: string|null;
	}
	const enum GPredejSpisovyObjektRequestDtoNames { TypOperace = "TypOperace", HodnotaOperace = "HodnotaOperace", PouzeJedenDokument = "PouzeJedenDokument", Ixp = "Ixp", Ixb = "Ixb",}
	const enum GPredejSpisovyObjektRequestDtoFragments { TypOperace = "*", HodnotaOperace = "*", PouzeJedenDokument = "*", Ixp = "*", Ixb = "*",}
	const enum GPredejSpisovyObjektRequestDtoTypes { TypOperace = "Gordic.Ssl.Interface.TypOperace", HodnotaOperace = "string", PouzeJedenDokument = "boolean", Ixp = "string", Ixb = "string",}
	const enum GPredejSpisovyObjektRequestDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GPredejSpisovyObjektResponseDto {
	}
	const enum GPredejSpisovyObjektResponseDtoNames {}
	const enum GPredejSpisovyObjektResponseDtoFragments {}
	const enum GPredejSpisovyObjektResponseDtoTypes {}
	const enum GPredejSpisovyObjektResponseDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GPredejSpisoveObjektyRequestDto {
		/**TypOperace*/
		TypOperace?: Gordic.Ssl.Interface.TypOperace|null;
		/**HodnotaOperace*/
		HodnotaOperace?: string|null;
		/**PouzeJedenDokument*/
		PouzeJedenDokument?: boolean|null;
		/**Dokument*/
		Ixp?: string|null;
		/**Dokument*/
		Prilohy?: Gordic.Wfl.Interface.GAttachmentDto[]|null;
	}
	const enum GPredejSpisoveObjektyRequestDtoNames { TypOperace = "TypOperace", HodnotaOperace = "HodnotaOperace", PouzeJedenDokument = "PouzeJedenDokument", Ixp = "Ixp", Prilohy = "Prilohy",}
	const enum GPredejSpisoveObjektyRequestDtoFragments { TypOperace = "*", HodnotaOperace = "*", PouzeJedenDokument = "*", Ixp = "*", Prilohy = "*",}
	const enum GPredejSpisoveObjektyRequestDtoTypes { TypOperace = "Gordic.Ssl.Interface.TypOperace", HodnotaOperace = "string", PouzeJedenDokument = "boolean", Ixp = "string", Prilohy = "Gordic.Wfl.Interface.GAttachmentDto[]",}
	const enum GPredejSpisoveObjektyRequestDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GPredejSpisoveObjektyResponseDto {
		/**GGroupResult*/
		GroupResult?: Gordic.General.ApplicationInterface.GGroupResult|null;
	}
	const enum GPredejSpisoveObjektyResponseDtoNames { GroupResult = "GroupResult",}
	const enum GPredejSpisoveObjektyResponseDtoFragments { GroupResult = "*",}
	const enum GPredejSpisoveObjektyResponseDtoTypes { GroupResult = "Gordic.General.ApplicationInterface.GGroupResult",}
	const enum GPredejSpisoveObjektyResponseDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZiskejSpisovyObjektRequestDto {
		/**OperaceIdentifikator*/
		OperaceIdentifikator?: string|null;
		/**OperaceIdentifikator*/
		PokracovatSVytvorenimDokumentu?: boolean|null;
	}
	const enum GZiskejSpisovyObjektRequestDtoNames { OperaceIdentifikator = "OperaceIdentifikator", PokracovatSVytvorenimDokumentu = "PokracovatSVytvorenimDokumentu",}
	const enum GZiskejSpisovyObjektRequestDtoFragments { OperaceIdentifikator = "*", PokracovatSVytvorenimDokumentu = "*",}
	const enum GZiskejSpisovyObjektRequestDtoTypes { OperaceIdentifikator = "string", PokracovatSVytvorenimDokumentu = "boolean",}
	const enum GZiskejSpisovyObjektRequestDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZiskejSpisovyObjektResponseDto {
		/**NovyPidDokumentu*/
		NovyPidDokumentu?: string|null;
		/**FileName*/
		FileName?: string|null;
		/**UlozeniDokonceno*/
		UlozeniDokonceno?: boolean|null;
		/**FileName*/
		PIDNalezenehoDokumentu?: string|null;
		/**FileName*/
		SystemoveCisloNen?: string|null;
		/**FileName*/
		CisloJednaci?: string|null;
	}
	const enum GZiskejSpisovyObjektResponseDtoNames { NovyPidDokumentu = "NovyPidDokumentu", FileName = "FileName", UlozeniDokonceno = "UlozeniDokonceno", PIDNalezenehoDokumentu = "PIDNalezenehoDokumentu", SystemoveCisloNen = "SystemoveCisloNen", CisloJednaci = "CisloJednaci",}
	const enum GZiskejSpisovyObjektResponseDtoFragments { NovyPidDokumentu = "*", FileName = "*", UlozeniDokonceno = "*", PIDNalezenehoDokumentu = "*", SystemoveCisloNen = "*", CisloJednaci = "*",}
	const enum GZiskejSpisovyObjektResponseDtoTypes { NovyPidDokumentu = "string", FileName = "string", UlozeniDokonceno = "boolean", PIDNalezenehoDokumentu = "string", SystemoveCisloNen = "string", CisloJednaci = "string",}
	const enum GZiskejSpisovyObjektResponseDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDto {
		/**Ixp*/
		Ixp?: string|null;
		/**OperaceIdentifikator*/
		OperaceIdentifikator?: string|null;
		/**IxbPuv*/
		IxbPuv?: string|null;
		/**TypElp*/
		TypElp?: Gordic.Wfl.Interface.TypElpEpxEnum|null;
	}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDtoNames { Ixp = "Ixp", OperaceIdentifikator = "OperaceIdentifikator", IxbPuv = "IxbPuv", TypElp = "TypElp",}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDtoFragments { Ixp = "*", OperaceIdentifikator = "*", IxbPuv = "*", TypElp = "*",}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDtoTypes { Ixp = "string", OperaceIdentifikator = "string", IxbPuv = "string", TypElp = "Gordic.Wfl.Interface.TypElpEpxEnum",}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuRequestDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZiskejSpisovyObjektVolaniZPrilohDokumentuResponseDto {
		/**UlozeniDokonceno*/
		UlozeniDokonceno?: boolean|null;
	}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuResponseDtoNames { UlozeniDokonceno = "UlozeniDokonceno",}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuResponseDtoFragments { UlozeniDokonceno = "*",}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuResponseDtoTypes { UlozeniDokonceno = "boolean",}
	const enum GZiskejSpisovyObjektVolaniZPrilohDokumentuResponseDtoTypeLengths {}
	const enum TypOperace {
		/**Sběrový dokument*/
		OperaceIdentifikator,
		/**Dokument*/
		SystemoveCisloZP,
	}
	/**Ciselnikove Dto pro NEN*/
	interface GNenCiselnikDto {
		/**Hodnota*/
		Hodnota?: string|null;
		/**HodnotaTxt*/
		HodnotaTxt?: string|null;
	}
	const enum GNenCiselnikDtoNames { Hodnota = "Hodnota", HodnotaTxt = "HodnotaTxt",}
	const enum GNenCiselnikDtoFragments { Hodnota = "*", HodnotaTxt = "*",}
	const enum GNenCiselnikDtoTypes { Hodnota = "string", HodnotaTxt = "string",}
	const enum GNenCiselnikDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZiskejInfoSpisovyObjektRequestDto {
		/**OperaceIdentifikator*/
		OperaceIdentifikator?: string|null;
	}
	const enum GZiskejInfoSpisovyObjektRequestDtoNames { OperaceIdentifikator = "OperaceIdentifikator",}
	const enum GZiskejInfoSpisovyObjektRequestDtoFragments { OperaceIdentifikator = "*",}
	const enum GZiskejInfoSpisovyObjektRequestDtoTypes { OperaceIdentifikator = "string",}
	const enum GZiskejInfoSpisovyObjektRequestDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZiskejInfoSpisovyObjektResponseDto {
		/**OperaceIdentifikator*/
		OperaceIdentifikator?: string|null;
		/**SystemoveCisloNen*/
		SystemoveCisloNen?: string|null;
		/**CisloJednaci*/
		CisloJednaci?: string|null;
		/**PIDNalezenehoDokumentu*/
		PIDNalezenehoDokumentu?: string|null;
		/**Poznamka*/
		Poznamka?: string|null;
		/**Nazev*/
		Nazev?: string|null;
		/**Popis*/
		Popis?: string|null;
		/**Popis*/
		TypDokumentu?: string|null;
		/**Velikost*/
		Velikost?: string|null;
		/**Velikost*/
		AutorSouboru?: string|null;
		/**CisloVerze*/
		CisloVerze?: string|null;
		/**CisloVerze*/
		FazeZivotnihoCyklu?: string|null;
		/**PodfazeZivotnihoCyklu*/
		PodfazeZivotnihoCyklu?: string|null;
		/**DatumCasVytvoreni*/
		DatumCasVytvoreni?: JsonDate|null;
		/**PodaciDenikPoradi*/
		PodaciDenikPoradi?: number|null;
		/**Podacidenik*/
		PodaciDenik?: string|null;
		/**PodaciDenikRok*/
		PodaciDenikRok?: string|null;
		/**SkartacniLhuta*/
		SkartacniLhuta?: number|null;
		/**SkartacniZnak*/
		SkartacniZnak?: string|null;
		/**SpisovaZnacka*/
		SpisovaZnacka?: string|null;
		/**SpisovyPlan*/
		SpisovyPlan?: string|null;
		/**SpisovyZnak*/
		SpisovyZnak?: string|null;
		/**KlicovaSlova*/
		KlicovaSlova?: string|null;
		/**UkonNazev*/
		UkonNazev?: string|null;
		/**CjOdesilatel*/
		CjOdesilatel?: string|null;
		/**UkonKod*/
		UkonKod?: string|null;
	}
	const enum GZiskejInfoSpisovyObjektResponseDtoNames { OperaceIdentifikator = "OperaceIdentifikator", SystemoveCisloNen = "SystemoveCisloNen", CisloJednaci = "CisloJednaci", PIDNalezenehoDokumentu = "PIDNalezenehoDokumentu", Poznamka = "Poznamka", Nazev = "Nazev", Popis = "Popis", TypDokumentu = "TypDokumentu", Velikost = "Velikost", AutorSouboru = "AutorSouboru", CisloVerze = "CisloVerze", FazeZivotnihoCyklu = "FazeZivotnihoCyklu", PodfazeZivotnihoCyklu = "PodfazeZivotnihoCyklu", DatumCasVytvoreni = "DatumCasVytvoreni", PodaciDenikPoradi = "PodaciDenikPoradi", PodaciDenik = "PodaciDenik", PodaciDenikRok = "PodaciDenikRok", SkartacniLhuta = "SkartacniLhuta", SkartacniZnak = "SkartacniZnak", SpisovaZnacka = "SpisovaZnacka", SpisovyPlan = "SpisovyPlan", SpisovyZnak = "SpisovyZnak", KlicovaSlova = "KlicovaSlova", UkonNazev = "UkonNazev", CjOdesilatel = "CjOdesilatel", UkonKod = "UkonKod",}
	const enum GZiskejInfoSpisovyObjektResponseDtoFragments { OperaceIdentifikator = "*", SystemoveCisloNen = "*", CisloJednaci = "*", PIDNalezenehoDokumentu = "*", Poznamka = "*", Nazev = "*", Popis = "*", TypDokumentu = "*", Velikost = "*", AutorSouboru = "*", CisloVerze = "*", FazeZivotnihoCyklu = "*", PodfazeZivotnihoCyklu = "*", DatumCasVytvoreni = "*", PodaciDenikPoradi = "*", PodaciDenik = "*", PodaciDenikRok = "*", SkartacniLhuta = "*", SkartacniZnak = "*", SpisovaZnacka = "*", SpisovyPlan = "*", SpisovyZnak = "*", KlicovaSlova = "*", UkonNazev = "*", CjOdesilatel = "*", UkonKod = "*",}
	const enum GZiskejInfoSpisovyObjektResponseDtoTypes { OperaceIdentifikator = "string", SystemoveCisloNen = "string", CisloJednaci = "string", PIDNalezenehoDokumentu = "string", Poznamka = "string", Nazev = "string", Popis = "string", TypDokumentu = "string", Velikost = "string", AutorSouboru = "string", CisloVerze = "string", FazeZivotnihoCyklu = "string", PodfazeZivotnihoCyklu = "string", DatumCasVytvoreni = "JsonDate", PodaciDenikPoradi = "number", PodaciDenik = "string", PodaciDenikRok = "string", SkartacniLhuta = "number", SkartacniZnak = "string", SpisovaZnacka = "string", SpisovyPlan = "string", SpisovyZnak = "string", KlicovaSlova = "string", UkonNazev = "string", CjOdesilatel = "string", UkonKod = "string",}
	const enum GZiskejInfoSpisovyObjektResponseDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZalozDokumentRequestDto {
		/**OperaceIdentifikator*/
		OperaceIdentifikator?: string|null;
		/**OperaceIdentifikator*/
		SPrij?: number|null;
	}
	const enum GZalozDokumentRequestDtoNames { OperaceIdentifikator = "OperaceIdentifikator", SPrij = "SPrij",}
	const enum GZalozDokumentRequestDtoFragments { OperaceIdentifikator = "*", SPrij = "*",}
	const enum GZalozDokumentRequestDtoTypes { OperaceIdentifikator = "string", SPrij = "number",}
	const enum GZalozDokumentRequestDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GZalozDokumentResponseDto {
		/**NovyPidDokumentu*/
		NovyPidDokumentu?: string|null;
		/**FileName*/
		FileName?: string|null;
		/**UlozeniDokonceno*/
		UlozeniDokonceno?: boolean|null;
	}
	const enum GZalozDokumentResponseDtoNames { NovyPidDokumentu = "NovyPidDokumentu", FileName = "FileName", UlozeniDokonceno = "UlozeniDokonceno",}
	const enum GZalozDokumentResponseDtoFragments { NovyPidDokumentu = "*", FileName = "*", UlozeniDokonceno = "*",}
	const enum GZalozDokumentResponseDtoTypes { NovyPidDokumentu = "string", FileName = "string", UlozeniDokonceno = "boolean",}
	const enum GZalozDokumentResponseDtoTypeLengths {}
	/**Dto pro kontrolu z EPK*/
	interface GNenPodejDokumentDto {
		/**NovyPidDokumentu*/
		NovyPidDokumentu?: string|null;
		/**FileName*/
		FileName?: string|null;
		/**UlozeniDokonceno*/
		UlozeniDokonceno?: boolean|null;
	}
	const enum GNenPodejDokumentDtoNames { NovyPidDokumentu = "NovyPidDokumentu", FileName = "FileName", UlozeniDokonceno = "UlozeniDokonceno",}
	const enum GNenPodejDokumentDtoFragments { NovyPidDokumentu = "*", FileName = "*", UlozeniDokonceno = "*",}
	const enum GNenPodejDokumentDtoTypes { NovyPidDokumentu = "string", FileName = "string", UlozeniDokonceno = "boolean",}
	const enum GNenPodejDokumentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ssl.Interface\Ostatni\Typove datasety\Gordic.Ssl.Interface.SeznamSpisovychDeniku.Dto.d.ts 

declare namespace Gordic.Ssl.Interface {
    /**DBTABLE:SeznamSpisovychDeniku*/
	interface SeznamSpisovychDenikuDto {
        /**DBCOLUMN:SeznamSpisovychDeniku.sslden*/
		sslden?: string|null;
        /**DBCOLUMN:SeznamSpisovychDeniku.nazev*/
		nazev?: string|null;
        /**DBCOLUMN:SeznamSpisovychDeniku.poznamka*/
		poznamka?: string|null;
        /**DBCOLUMN:SeznamSpisovychDeniku.typ_den*/
		typ_den?: number|null;
        /**DBCOLUMN:SeznamSpisovychDeniku.priz_den_cj*/
		priz_den_cj?: number|null;
        /**DBCOLUMN:SeznamSpisovychDeniku.rok_akt*/
		rok_akt?: number|null;
	}
}

//#endregion

