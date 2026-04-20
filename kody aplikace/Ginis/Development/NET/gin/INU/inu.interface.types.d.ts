/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       inu.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Inu.Interface\Gordic.Inu.Interface.csproj
*    created     2026-02-16 14:33:52
*    files       Base\IGInusexp.d.ts
*                Base\IGInusimp.d.ts
*                DataSety\GEkocpfd.Dto.d.ts
*                DataSety\GEkodobd.Dto.d.ts
*                DataSety\GEkohkhl.Dto.d.ts
*                DataSety\GEkolobd.Dto.d.ts
*                DataSety\GEkolstv.Dto.d.ts
*                DataSety\GEkosazd.Dto.d.ts
*                DataSety\GEkosazo.Dto.d.ts
*                DataSety\GEkoskhl.Dto.d.ts
*                DataSety\GEkosucs.Dto.d.ts
*                DataSety\GUctdxua.Dto.d.ts
*                DataSety\GUctRozMesObdobi.Dto.d.ts
*                DataSety\GUctsblk.Dto.d.ts
*                Dto\GAgendyKnihyDto.d.ts
*                Dto\GEkodobdZobrDto.d.ts
*                Dto\GekohhzoDto.d.ts
*                Dto\GExport.Dto.d.ts
*                Dto\GInuBaseRequestDto.d.ts
*                Dto\GInusexpDto.d.ts
*                Dto\GInusimpDto.d.ts
*                Dto\GPrepocetStavuDto.d.ts
*                Dto\GServisVysledekDto.d.ts
*                Dto\GUctdxwaDto.d.ts
*                Dto\GUctsxwaDto.d.ts
*                Dto\HlaseniDPH\GDokladyHlaseniDPHDto.d.ts
*                Dto\HlaseniDPH\GHlaseniDPHDto.d.ts
*                Dto\HlaseniDPH\GInuPodatHlaseniRequestDto.d.ts
*                Dto\HlaseniDPH\GInuPodatNastaveniDto.d.ts
*                Dto\Obdobi\GInuKontrolaObdobiDto.d.ts
*                Dto\Obdobi\GInuObdobiDto.d.ts
*                Dto\Obdobi\GInuObdobiVyabraneDto.d.ts
*                Dto\Obdobi\GInuOpenCloseRequestDto.d.ts
*                Dto\ObdobiDPH\GPrepocetStavuDto.d.ts
*                Dto\ObdobiKHDPH\GSeznamObdobiKHDPHDto.d.ts
*                Dto\PriznaniDPH\GHlavickaPriznaniDPHDto.d.ts
*                Dto\PriznaniDPH\GInuPriznaniDPHActionResponseDto.d.ts
*                Dto\PriznaniDPH\GKontrolaNeprouctovanychResponseDto.d.ts
*                Dto\PriznaniDPH\GNeprouctovaneDokladuDto.d.ts
*                Dto\PriznaniDPH\GSeznamPriznaniDPHDto.d.ts
*                Dto\PriznaniDPH\GSeznamUUSDto.d.ts
*                Dto\UzaverkaUcetni\GInuAgendytDto.d.ts
*                Dto\UzaverkaUcetni\GInuAgendytProUzavreniDto.d.ts
*                Dto\UzaverkaUcetni\GInuAnulaceZacatekUzaverkyNastaveniDto.d.ts
*                Dto\UzaverkaUcetni\GInuAnulaceZacatekUzaverkyRequestDto.d.ts
*                Dto\UzaverkaUcetni\GInuChybyUzaverkyDto.d.ts
*                Dto\UzaverkaUcetni\GInuKnihyDto.d.ts
*                Dto\UzaverkaUcetni\GInuRokDto.d.ts
*                Dto\UzaverkaUcetni\GInuUcsLicDto.d.ts
*                Dto\UzaverkaUcetni\GInuUzaverkyKnihyResponseDto.d.ts
*                Dto\UzaverkaUcetni\GInuUzaverkyPovoleniResponseDto.d.ts
*                Dto\UzaverkaUcetni\GInuUzaverkyRokuDto.d.ts
*                Dto\UzaverkaUcetni\GInuUzaverkyZaverecneZapisyNastaveniDto.d.ts
*                Dto\UzaverkaUcetni\GInuUzaverkyZaverecneZapisyRequestDto.d.ts
*                Dto\UzaverkaUcetni\GInuVybraneKnihyDto.d.ts
*                Dto\UzaverkaUcetni\GInuZacatekUzaverkyNastaveniDto.d.ts
*                Dto\UzaverkaUcetni\GInuZacatekUzaverkyRequestDto.d.ts
*                Dto\UzavreniMesice\GInuGroupOpenCloseRequestDto.d.ts
*                Dto\UzavreniMesice\GInuOpenCloseRequestDto.d.ts
*                Dto\UzavreniMesice\GInuUzavreniMesiceNastaveniDto.d.ts
*                Enums\GEAktivitaObdobi.d.ts
*                Enums\GEInuAgenda.d.ts
*                Enums\GEOperaceNaZapisech.d.ts
*                Enums\GEOperaceRocniUzaverky.d.ts
*                Enums\GEOperaceSObdobim.d.ts
*                Enums\GERezimDPH.d.ts
*                Enums\GERezimProvozu.d.ts
*                Enums\GEStavPriznaniDPH.d.ts
*                Enums\GEStavUzaverky.d.ts
*                Enums\GETypBlokaceDleStavuKontrolyDPH.d.ts
*                Enums\GETypPriznaniDPH.d.ts
*                Enums\GETypySeznamuRocniUzaverky.d.ts
*                Enums\GEUrovenKontrolyMesice.d.ts
*                Init\GInuGlobalsBase.d.ts
*                ISL\IGInuBlokacniOkruhy.d.ts
*                ISL\IGInuiUzaverkaUcetnihoObdobi.d.ts
*                ISL\IGInuKontrolniHlaseni.d.ts
*                ISL\IGInuObdobiDPH.d.ts
*                ISL\IGInuObdobiUCtRoz.d.ts
*                ISL\IGInuPriznaniDPH – kopie.d.ts
*                ISL\IGInuPriznaniDPH.d.ts
*                ISL\IGInuWflsesx.d.ts
*                Objekty\GInuGlobalParams.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Base\IGInusexp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Seznam exportovaných dávek.
	* @domain DavkaExport
	* @businessObject DavkaExport
	*/
	interface Inusexp {
		/**Detail Seznam exportovaných dávek.*/
		read(rq?:Gordic.Inu.Interface.GInusexpDto|CallParams<GServiceReadRequest<Gordic.Inu.Interface.GInusexpDto>>): _Task<GServiceReadRequest<Gordic.Inu.Interface.GInusexpDto>,GServiceReadResponse<Gordic.Inu.Interface.GInusexpDto>>;
		/**Seznam Seznam exportovaných dávek.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Inu.Interface.GInusexpDto>>;
		/**Počet Seznam exportovaných dávek.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Seznam exportovaných dávek.*/
		create(rq?:Gordic.Inu.Interface.GInusexpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusexpDto>>;
		/**Oprava Seznam exportovaných dávek.*/
		update(rq?:Gordic.Inu.Interface.GInusexpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusexpDto>>;
		/**Oprava resp. založení Seznam exportovaných dávek.*/
		upsert(rq?:Gordic.Inu.Interface.GInusexpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusexpDto>>;
		/**Odstranění Seznam exportovaných dávek.*/
		delete(rq?:Gordic.Inu.Interface.GInusexpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusexpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusexpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Inusexp: ServiceBase & Catalog.Inusexp;
	}
	const Inusexp: Client["Inusexp"];
}
declare namespace Gordic.Inu.Interface {
	/**Filtr pro Seznam exportovaných dávek.*/
	const enum GInusexpFilter {
		/**Identifikátor exp.*/
		ixs_exp,
		/**Rok.*/
		rok,
		/**Mesic.*/
		mesic,
		/**Exp Typ.*/
		exp_typ,
		/**Exp format.*/
		exp_format,
		/**Soubor.*/
		soubor,
		/**Zkratka.*/
		zkratka,
		/**Popis.*/
		popis,
		/**Mail.*/
		mail,
		/**Datum zmena exp.*/
		dat_zmena_exp,
		/**Zmenu prov exp.*/
		zmenu_prov_exp,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Base\IGInusimp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Seznam davek
	* @domain InuDavka
	* @businessObject InuDavka
	*/
	interface InuDavka {
		/**Detail Seznam davek*/
		read(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceReadRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceReadRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceReadResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Seznam Seznam davek*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Seznam Seznam zapisu davky*/
		list_Zapisy(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Inu.Interface.GUctdxuaDto>>;
		/**Seznam zapisu davky - prouztovane*/
		list_Zapisy_Prouctovane(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Inu.Interface.GUctdxuaDto>>;
		/**Seznam Seznam zapisu davky s chzbami*/
		list_Zapisy_Chyba(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Inu.Interface.GInuChybyUzaverkyDto>>;
		/**Založení Seznam davek*/
		create(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Oprava Seznam davek*/
		update(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Oprava resp. založení Seznam davek*/
		upsert(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Odstranění Seznam davek*/
		delete(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Test davky*/
		test(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Prouctovani davky*/
		prouctovat(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Prouctovani davky do ag dokladu*/
		prouctovat_Doklad(rq?:Gordic.Inu.Interface.GInusimpDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Změna stavu*/
		zmenaStavu(rq?:CallParams<{ixsImp:string,stavImp:number}>): _Task<{ixsImp:string,stavImp:number},GServiceSaveResponse<Gordic.Inu.Interface.GInusimpDto>>;
		/**Nacti_Davku*/
		nacti_Davku(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto}>): _Task<{rq:GServiceSaveRequest<Gordic.Inu.Interface.GInusimpDto>,fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto},GServiceSaveResponse<Gordic.Inu.Interface.GServisVysledekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuDavka: ServiceBase & Catalog.InuDavka;
	}
	const InuDavka: Client["InuDavka"];
}
declare namespace Gordic.Inu.Interface {
	/**Filtr pro Seznam davek*/
	const enum GInuDavkaCilProuctovani {
		/**Denik*/
		Denik=0,
		/**Agenda*/
		Agenda=1,
		/**DenikAgenda*/
		DenikAgenda=2,
	}
	/**Filtr pro Seznam davek*/
	const enum GInusimpFilter {
		/**ixs_imp*/
		ixs_imp,
		/**zkratka*/
		zkratka,
		/**popis*/
		popis,
		/**stav_imp*/
		stav_imp,
		/**soubor*/
		soubor,
		/**dat_zmena_nact*/
		dat_zmena_nact,
		/**dat_zmena_zprac*/
		dat_zmena_zprac,
		/**zmenu_prov_nact*/
		zmenu_prov_nact,
		/**zmenu_prov_zprac*/
		zmenu_prov_zprac,
		/**typ*/
		typ,
		/**kon_suma*/
		kon_suma,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkocpfd.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkocpfdDto {
		/**DBCOLUMN:Seznam.radek_dph*/
		radek_dph?: string|null;
		/**DBCOLUMN:Seznam.rok_dph_od*/
		rok_dph_od?: number|null;
		/**DBCOLUMN:Seznam.mesic_dph_od*/
		mesic_dph_od?: number|null;
		/**DBCOLUMN:Seznam.rok_dph_do*/
		rok_dph_do?: number|null;
		/**DBCOLUMN:Seznam.mesic_dph_do*/
		mesic_dph_do?: number|null;
		/**DBCOLUMN:Seznam.nazev_dph*/
		nazev_dph?: string|null;
		/**DBCOLUMN:Seznam.priz_zobr*/
		priz_zobr?: string|null;
		/**DBCOLUMN:Seznam.priz_zobr_xls*/
		priz_zobr_xls?: string|null;
		/**DBCOLUMN:Seznam.priz_sum*/
		priz_sum?: number|null;
		/**DBCOLUMN:Seznam.uex_val*/
		uex_val?: string|null;
		/**DBCOLUMN:Seznam.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:Seznam.c_zaklad*/
		c_zaklad?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vstup*/
		c_vstup?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_vystup*/
		c_vystup?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.priznak*/
		priznak?: string|null;
		/**DBCOLUMN:Seznam.text_zaklad*/
		text_zaklad?: string|null;
		/**DBCOLUMN:Seznam.text_vstup*/
		text_vstup?: string|null;
		/**DBCOLUMN:Seznam.text_vystup*/
		text_vystup?: string|null;
	}
	const enum GEkocpfdDtoNames { radek_dph = "radek_dph", rok_dph_od = "rok_dph_od", mesic_dph_od = "mesic_dph_od", rok_dph_do = "rok_dph_do", mesic_dph_do = "mesic_dph_do", nazev_dph = "nazev_dph", priz_zobr = "priz_zobr", priz_zobr_xls = "priz_zobr_xls", priz_sum = "priz_sum", uex_val = "uex_val", poradi = "poradi", c_zaklad = "c_zaklad", c_vstup = "c_vstup", c_vystup = "c_vystup", priznak = "priznak", text_zaklad = "text_zaklad", text_vstup = "text_vstup", text_vystup = "text_vystup",}
	const enum GEkocpfdDtoFragments { radek_dph = "*", rok_dph_od = "*", mesic_dph_od = "*", rok_dph_do = "*", mesic_dph_do = "*", nazev_dph = "*", priz_zobr = "*", priz_zobr_xls = "*", priz_sum = "*", uex_val = "*", poradi = "*", c_zaklad = "*", c_vstup = "*", c_vystup = "*", priznak = "*", text_zaklad = "*", text_vstup = "*", text_vystup = "*",}
	const enum GEkocpfdDtoTypes { radek_dph = "string", rok_dph_od = "number", mesic_dph_od = "number", rok_dph_do = "number", mesic_dph_do = "number", nazev_dph = "string", priz_zobr = "string", priz_zobr_xls = "string", priz_sum = "number", uex_val = "string", poradi = "number", c_zaklad = "JsonDecimal", c_vstup = "JsonDecimal", c_vystup = "JsonDecimal", priznak = "string", text_zaklad = "string", text_vstup = "string", text_vystup = "string",}
	const enum GEkocpfdDtoTypeLengths { radek_dph = 5, nazev_dph = 254, priz_zobr = 3, priz_zobr_xls = 6, uex_val = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkodobd.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkodobdDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.s_uzav*/
		s_uzav?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.krok_uza*/
		krok_uza?: number|null;
	}
	const enum GEkodobdDtoNames { rok = "rok", ico = "ico", ucs = "ucs", lic = "lic", typ_ag = "typ_ag", s_uzav = "s_uzav", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", krok_uza = "krok_uza",}
	const enum GEkodobdDtoFragments { rok = "*", ico = "*", ucs = "*", lic = "*", typ_ag = "*", s_uzav = "*", dat_zmena = "*", zmenu_prov = "*", krok_uza = "*",}
	const enum GEkodobdDtoTypes { rok = "number", ico = "string", ucs = "string", lic = "string", typ_ag = "number", s_uzav = "number", dat_zmena = "JsonDate", zmenu_prov = "string", krok_uza = "number",}
	const enum GEkodobdDtoTypeLengths { ico = 10, ucs = 10, lic = 4, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkohkhl.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkohkhlDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:Seznam.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**DBCOLUMN:Seznam.cj_vyzvy*/
		cj_vyzvy?: string|null;
		/**DBCOLUMN:Seznam.vyzva_odp*/
		vyzva_odp?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_dph*/
		s_dph?: number|null;
		/**DBCOLUMN:Seznam.s_prep_dph*/
		s_prep_dph?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.typ_priz_dph_txt*/
		typ_priz_dph_txt?: string|null;
	}
	const enum GEkohkhlDtoNames { ico = "ico", rok_dph = "rok_dph", mesic_dph = "mesic_dph", por_cislo = "por_cislo", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", cj_vyzvy = "cj_vyzvy", vyzva_odp = "vyzva_odp", dat_od = "dat_od", dat_do = "dat_do", s_dph = "s_dph", s_prep_dph = "s_prep_dph", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_priz_dph_txt = "typ_priz_dph_txt",}
	const enum GEkohkhlDtoFragments { ico = "*", rok_dph = "*", mesic_dph = "*", por_cislo = "*", dat_priz_max = "*", dat_priz_dph = "*", dat_zjist_dod = "*", typ_priz_dph = "*", cj_vyzvy = "*", vyzva_odp = "*", dat_od = "*", dat_do = "*", s_dph = "*", s_prep_dph = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_priz_dph_txt = "*",}
	const enum GEkohkhlDtoTypes { ico = "string", rok_dph = "number", mesic_dph = "number", por_cislo = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", cj_vyzvy = "string", vyzva_odp = "string", dat_od = "JsonDate", dat_do = "JsonDate", s_dph = "number", s_prep_dph = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_priz_dph_txt = "string",}
	const enum GEkohkhlDtoTypeLengths { ico = 10, cj_vyzvy = 32, vyzva_odp = 3, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkolobd.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkolobdDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.akce_obd*/
		akce_obd?: number|null;
		/**DBCOLUMN:Seznam.vysledek*/
		vysledek?: number|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.akce_obd_txt*/
		akce_obd_txt?: string|null;
	}
	const enum GEkolobdDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", akce_obd = "akce_obd", vysledek = "vysledek", typ_ag = "typ_ag", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_ref = "nazev_ref", akce_obd_txt = "akce_obd_txt",}
	const enum GEkolobdDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", akce_obd = "*", vysledek = "*", typ_ag = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", nazev_ref = "*", akce_obd_txt = "*",}
	const enum GEkolobdDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", akce_obd = "number", vysledek = "number", typ_ag = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_ref = "string", akce_obd_txt = "string",}
	const enum GEkolobdDtoTypeLengths { lic = 4, ico = 10, ucs = 10, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkolstv.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkolstvDto {
		/**DBCOLUMN:Seznam.ser_cislo*/
		ser_cislo?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.procname*/
		procname?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.db_err*/
		db_err?: number|null;
		/**DBCOLUMN:Seznam.isam_err*/
		isam_err?: number|null;
		/**DBCOLUMN:Seznam.gor_err*/
		gor_err?: number|null;
		/**DBCOLUMN:Seznam.stav_prep*/
		stav_prep?: number|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_akt*/
		dat_akt?: JsonDate|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.num_rows*/
		num_rows?: number|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
	}
	const enum GEkolstvDtoNames { ser_cislo = "ser_cislo", lic = "lic", dat_zmena = "dat_zmena", procname = "procname", ico = "ico", ucs = "ucs", rok = "rok", mesic = "mesic", db_err = "db_err", isam_err = "isam_err", gor_err = "gor_err", stav_prep = "stav_prep", zmenu_prov = "zmenu_prov", dat_akt = "dat_akt", popis = "popis", num_rows = "num_rows", typ_ag = "typ_ag", nazev_ref = "nazev_ref",}
	const enum GEkolstvDtoFragments { ser_cislo = "*", lic = "*", dat_zmena = "*", procname = "*", ico = "*", ucs = "*", rok = "*", mesic = "*", db_err = "*", isam_err = "*", gor_err = "*", stav_prep = "*", zmenu_prov = "*", dat_akt = "*", popis = "*", num_rows = "*", typ_ag = "*", nazev_ref = "*",}
	const enum GEkolstvDtoTypes { ser_cislo = "number", lic = "string", dat_zmena = "JsonDate", procname = "string", ico = "string", ucs = "string", rok = "number", mesic = "number", db_err = "number", isam_err = "number", gor_err = "number", stav_prep = "number", zmenu_prov = "string", dat_akt = "JsonDate", popis = "string", num_rows = "number", typ_ag = "number", nazev_ref = "string",}
	const enum GEkolstvDtoTypeLengths { lic = 4, procname = 18, ico = 10, ucs = 10, zmenu_prov = 12, popis = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkosazd.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosazdDto {
		/**DBCOLUMN:Seznam.ixs_dsu*/
		ixs_dsu?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**DBCOLUMN:Seznam.s_dph*/
		s_dph?: number|null;
		/**DBCOLUMN:Seznam.s_prep_dph*/
		s_prep_dph?: number|null;
		/**DBCOLUMN:Seznam.platce_dph*/
		platce_dph?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.koef_zal*/
		koef_zal?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.koef_vyp*/
		koef_vyp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.eko_akt_txt*/
		eko_akt_txt?: string|null;
		/**DBCOLUMN:Seznam.s_dph_txt*/
		s_dph_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_priz_dph_txt*/
		typ_priz_dph_txt?: string|null;
		/**DBCOLUMN:Seznam.s_prep_dph_txt*/
		s_prep_dph_txt?: string|null;
	}
	const enum GEkosazdDtoNames { ixs_dsu = "ixs_dsu", rok = "rok", mesic = "mesic", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", s_prep_dph = "s_prep_dph", platce_dph = "platce_dph", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", koef_zal = "koef_zal", koef_vyp = "koef_vyp", eko_akt_txt = "eko_akt_txt", s_dph_txt = "s_dph_txt", typ_priz_dph_txt = "typ_priz_dph_txt", s_prep_dph_txt = "s_prep_dph_txt",}
	const enum GEkosazdDtoFragments { ixs_dsu = "*", rok = "*", mesic = "*", dat_priz_max = "*", dat_priz_dph = "*", dat_zjist_dod = "*", typ_priz_dph = "*", s_dph = "*", s_prep_dph = "*", platce_dph = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", koef_zal = "*", koef_vyp = "*", eko_akt_txt = "*", s_dph_txt = "*", typ_priz_dph_txt = "*", s_prep_dph_txt = "*",}
	const enum GEkosazdDtoTypes { ixs_dsu = "string", rok = "number", mesic = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", s_dph = "number", s_prep_dph = "number", platce_dph = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", koef_zal = "JsonDecimal", koef_vyp = "JsonDecimal", eko_akt_txt = "string", s_dph_txt = "string", typ_priz_dph_txt = "string", s_prep_dph_txt = "string",}
	const enum GEkosazdDtoTypeLengths { ixs_dsu = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkosazo.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosazoDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**DBCOLUMN:Seznam.s_dph*/
		s_dph?: number|null;
		/**DBCOLUMN:Seznam.s_prep_dph*/
		s_prep_dph?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.platce_dph*/
		platce_dph?: number|null;
		/**DBCOLUMN:Seznam.koef_zal*/
		koef_zal?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.koef_vyp*/
		koef_vyp?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.s_dph_txt*/
		s_dph_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_priz_dph_txt*/
		typ_priz_dph_txt?: string|null;
		/**DBCOLUMN:Seznam.s_prep_dph_txt*/
		s_prep_dph_txt?: string|null;
		/**DBCOLUMN:Seznam.eko_akt_txt*/
		eko_akt_txt?: string|null;
	}
	const enum GEkosazoDtoNames { ico = "ico", rok = "rok", mesic = "mesic", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", s_prep_dph = "s_prep_dph", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", platce_dph = "platce_dph", koef_zal = "koef_zal", koef_vyp = "koef_vyp", s_dph_txt = "s_dph_txt", typ_priz_dph_txt = "typ_priz_dph_txt", s_prep_dph_txt = "s_prep_dph_txt", eko_akt_txt = "eko_akt_txt",}
	const enum GEkosazoDtoFragments { ico = "*", rok = "*", mesic = "*", dat_priz_max = "*", dat_priz_dph = "*", dat_zjist_dod = "*", typ_priz_dph = "*", s_dph = "*", s_prep_dph = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", platce_dph = "*", koef_zal = "*", koef_vyp = "*", s_dph_txt = "*", typ_priz_dph_txt = "*", s_prep_dph_txt = "*", eko_akt_txt = "*",}
	const enum GEkosazoDtoTypes { ico = "string", rok = "number", mesic = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", s_dph = "number", s_prep_dph = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", platce_dph = "number", koef_zal = "JsonDecimal", koef_vyp = "JsonDecimal", s_dph_txt = "string", typ_priz_dph_txt = "string", s_prep_dph_txt = "string", eko_akt_txt = "string",}
	const enum GEkosazoDtoTypeLengths { ico = 10, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkoskhl.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkoskhlDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:Seznam.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:Seznam.dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**DBCOLUMN:Seznam.typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**DBCOLUMN:Seznam.cj_vyzvy*/
		cj_vyzvy?: string|null;
		/**DBCOLUMN:Seznam.vyzva_odp*/
		vyzva_odp?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_dph*/
		s_dph?: number|null;
		/**DBCOLUMN:Seznam.s_prep_dph*/
		s_prep_dph?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.eko_akt_txt*/
		eko_akt_txt?: string|null;
		/**DBCOLUMN:Seznam.s_dph_txt*/
		s_dph_txt?: string|null;
		/**DBCOLUMN:Seznam.typ_priz_dph_txt*/
		typ_priz_dph_txt?: string|null;
		/**DBCOLUMN:Seznam.s_prep_dph_txt*/
		s_prep_dph_txt?: string|null;
	}
	const enum GEkoskhlDtoNames { ico = "ico", rok_dph = "rok_dph", mesic_dph = "mesic_dph", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", cj_vyzvy = "cj_vyzvy", vyzva_odp = "vyzva_odp", dat_od = "dat_od", dat_do = "dat_do", s_dph = "s_dph", s_prep_dph = "s_prep_dph", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", eko_akt_txt = "eko_akt_txt", s_dph_txt = "s_dph_txt", typ_priz_dph_txt = "typ_priz_dph_txt", s_prep_dph_txt = "s_prep_dph_txt",}
	const enum GEkoskhlDtoFragments { ico = "*", rok_dph = "*", mesic_dph = "*", dat_priz_max = "*", dat_priz_dph = "*", dat_zjist_dod = "*", typ_priz_dph = "*", cj_vyzvy = "*", vyzva_odp = "*", dat_od = "*", dat_do = "*", s_dph = "*", s_prep_dph = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", eko_akt_txt = "*", s_dph_txt = "*", typ_priz_dph_txt = "*", s_prep_dph_txt = "*",}
	const enum GEkoskhlDtoTypes { ico = "string", rok_dph = "number", mesic_dph = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", cj_vyzvy = "string", vyzva_odp = "string", dat_od = "JsonDate", dat_do = "JsonDate", s_dph = "number", s_prep_dph = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", eko_akt_txt = "string", s_dph_txt = "string", typ_priz_dph_txt = "string", s_prep_dph_txt = "string",}
	const enum GEkoskhlDtoTypeLengths { ico = 10, cj_vyzvy = 32, vyzva_odp = 3, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GEkosucs.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkosucsDto {
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.stav*/
		stav?: number|null;
		/**DBCOLUMN:Seznam.stav_txt*/
		stav_txt?: string|null;
	}
	const enum GEkosucsDtoNames { ico = "ico", ucs = "ucs", nazev = "nazev", stav = "stav", stav_txt = "stav_txt",}
	const enum GEkosucsDtoFragments { ico = "*", ucs = "*", nazev = "*", stav = "*", stav_txt = "*",}
	const enum GEkosucsDtoTypes { ico = "string", ucs = "string", nazev = "string", stav = "number", stav_txt = "string",}
	const enum GEkosucsDtoTypeLengths { ico = 10, ucs = 10, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GUctdxua.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GUctdxuaDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.stav_zap*/
		stav_zap?: number|null;
		/**DBCOLUMN:Seznam.s_prep*/
		s_prep?: number|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.ixs_imp*/
		ixs_imp?: string|null;
		/**DBCOLUMN:Seznam.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:Seznam.druh_char*/
		druh_char?: number|null;
	}
	const enum GUctdxuaDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", popis = "popis", stav_zap = "stav_zap", s_prep = "s_prep", uus = "uus", ixs_imp = "ixs_imp", priz_char = "priz_char", druh_char = "druh_char",}
	const enum GUctdxuaDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*", radek_z = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", popis = "*", stav_zap = "*", s_prep = "*", uus = "*", ixs_imp = "*", priz_char = "*", druh_char = "*",}
	const enum GUctdxuaDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", popis = "string", stav_zap = "number", s_prep = "number", uus = "string", ixs_imp = "string", priz_char = "number", druh_char = "number",}
	const enum GUctdxuaDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, popis = 254, uus = 10, ixs_imp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GUctRozMesObdobi.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GUctRozMesObdobiDto {
		/**DBCOLUMN:Seznam.sl1*/
		sl1?: string|null;
		/**DBCOLUMN:Seznam.sl2*/
		sl2?: number|null;
		/**DBCOLUMN:Seznam.sl3*/
		sl3?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.akt_obd*/
		akt_obd?: number|null;
		/**DBCOLUMN:Seznam.stav*/
		stav?: number|null;
		/**DBCOLUMN:Seznam.blok*/
		blok?: number|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.priz_schv*/
		priz_schv?: number|null;
		/**DBCOLUMN:Seznam.priz_delstav*/
		priz_delstav?: number|null;
	}
	const enum GUctRozMesObdobiDtoNames { sl1 = "sl1", sl2 = "sl2", sl3 = "sl3", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", akt_obd = "akt_obd", stav = "stav", blok = "blok", drd = "drd", priz_schv = "priz_schv", priz_delstav = "priz_delstav",}
	const enum GUctRozMesObdobiDtoFragments { sl1 = "*", sl2 = "*", sl3 = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", akt_obd = "*", stav = "*", blok = "*", drd = "*", priz_schv = "*", priz_delstav = "*",}
	const enum GUctRozMesObdobiDtoTypes { sl1 = "string", sl2 = "number", sl3 = "number", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", akt_obd = "number", stav = "number", blok = "number", drd = "number", priz_schv = "number", priz_delstav = "number",}
	const enum GUctRozMesObdobiDtoTypeLengths { lic = 4, ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\DataSety\GUctsblk.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GUctsblkDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.id_blk*/
		id_blk?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GUctsblkDtoNames { rok = "rok", ico = "ico", ucs = "ucs", id_blk = "id_blk", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GUctsblkDtoFragments { rok = "*", ico = "*", ucs = "*", id_blk = "*", nazev = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GUctsblkDtoTypes { rok = "number", ico = "string", ucs = "string", id_blk = "number", nazev = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GUctsblkDtoTypeLengths { ico = 10, ucs = 10, nazev = 50, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GAgendyKnihyDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GAgendyKnihyDto {
		/**DBCOLUMN:Seznam.agenda*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.typ_ag_txt*/
		typ_ag_txt?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GAgendyKnihyDtoNames { typ_ag = "typ_ag", ixp_den = "ixp_den", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", nazev = "nazev", poznamka = "poznamka", typ_ag_txt = "typ_ag_txt", aktivita = "aktivita", aktivita_txt = "aktivita_txt",}
	const enum GAgendyKnihyDtoFragments { typ_ag = "*", ixp_den = "*", rok = "*", lic = "*", ico = "*", ucs = "*", uus = "*", nks = "*", nazev = "*", poznamka = "*", typ_ag_txt = "*", aktivita = "*", aktivita_txt = "*",}
	const enum GAgendyKnihyDtoTypes { typ_ag = "number", ixp_den = "string", rok = "number", lic = "string", ico = "string", ucs = "string", uus = "string", nks = "string", nazev = "string", poznamka = "string", typ_ag_txt = "string", aktivita = "number", aktivita_txt = "string",}
	const enum GAgendyKnihyDtoTypeLengths { lic = 4, ico = 10, ucs = 10, uus = 10, nks = 10, nazev = 254, poznamka = 254, typ_ag_txt = 254, aktivita_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GEkodobdZobrDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GEkodobdZobrDto extends Gordic.Inu.Interface.GEkodobdDto {
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.nazev_fun*/
		nazev_fun?: string|null;
		/**DBCOLUMN:Seznam.typ_ag_txt*/
		typ_ag_txt?: string|null;
		/**DBCOLUMN:Seznam.zkr_ag*/
		zkr_ag?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena_txt*/
		dat_zmena_txt?: string|null;
		/**DBCOLUMN:Seznam.barva_txt*/
		barva_txt?: string|null;
		/**DBCOLUMN:Seznam.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:Seznam.aktivita_color*/
		aktivita_color?: string|null;
		/**DBCOLUMN:Seznam.pocetZrusena*/
		pocetZrusena?: number|null;
		/**DBCOLUMN:Seznam.pocetUzavrena*/
		pocetUzavrena?: number|null;
		/**DBCOLUMN:Seznam.pocetUzavrenaNeodlita*/
		pocetUzavrenaNeodlita?: number|null;
		/**DBCOLUMN:Seznam.pocetOtevrena*/
		pocetOtevrena?: number|null;
		/**DBCOLUMN:Seznam.pocetPripravena*/
		pocetPripravena?: number|null;
		/**DBCOLUMN:Seznam.pocetZrusena_txt*/
		pocetZrusena_txt?: string|null;
		/**DBCOLUMN:Seznam.pocetUzavrena_txt*/
		pocetUzavrena_txt?: string|null;
		/**DBCOLUMN:Seznam.pocetUzavrenaNeodlita_txt*/
		pocetUzavrenaNeodlita_txt?: string|null;
		/**DBCOLUMN:Seznam.pocetOtevrena_txt*/
		pocetOtevrena_txt?: string|null;
		/**DBCOLUMN:Seznam.pocetPripravena_txt*/
		pocetPripravena_txt?: string|null;
		/**DBCOLUMN:Seznam.blok_uzaverky*/
		blok_uzaverky?: number|null;
		/**DBCOLUMN:Seznam.stav_uzavreni*/
		stav_uzavreni?: number|null;
		/**DBCOLUMN:Seznam.stav_uzav*/
		stav_uzav?: string|null;
		/**DBCOLUMN:Seznam.stav_ag*/
		stav_ag?: string|null;
	}
	const enum GEkodobdZobrDtoNames { nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", typ_ag_txt = "typ_ag_txt", zkr_ag = "zkr_ag", dat_zmena_txt = "dat_zmena_txt", barva_txt = "barva_txt", aktivita_txt = "aktivita_txt", aktivita_color = "aktivita_color", pocetZrusena = "pocetZrusena", pocetUzavrena = "pocetUzavrena", pocetUzavrenaNeodlita = "pocetUzavrenaNeodlita", pocetOtevrena = "pocetOtevrena", pocetPripravena = "pocetPripravena", pocetZrusena_txt = "pocetZrusena_txt", pocetUzavrena_txt = "pocetUzavrena_txt", pocetUzavrenaNeodlita_txt = "pocetUzavrenaNeodlita_txt", pocetOtevrena_txt = "pocetOtevrena_txt", pocetPripravena_txt = "pocetPripravena_txt", blok_uzaverky = "blok_uzaverky", stav_uzavreni = "stav_uzavreni", stav_uzav = "stav_uzav", stav_ag = "stav_ag", rok = "rok", ico = "ico", ucs = "ucs", lic = "lic", typ_ag = "typ_ag", s_uzav = "s_uzav", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", krok_uza = "krok_uza",}
	const enum GEkodobdZobrDtoFragments { nazev_ref = "*", nazev_fun = "*", typ_ag_txt = "*", zkr_ag = "*", dat_zmena_txt = "*", barva_txt = "*", aktivita_txt = "*", aktivita_color = "*", pocetZrusena = "*", pocetUzavrena = "*", pocetUzavrenaNeodlita = "*", pocetOtevrena = "*", pocetPripravena = "*", pocetZrusena_txt = "*", pocetUzavrena_txt = "*", pocetUzavrenaNeodlita_txt = "*", pocetOtevrena_txt = "*", pocetPripravena_txt = "*", blok_uzaverky = "*", stav_uzavreni = "*", stav_uzav = "*", stav_ag = "*", rok = "*", ico = "*", ucs = "*", lic = "*", typ_ag = "*", s_uzav = "*", dat_zmena = "*", zmenu_prov = "*", krok_uza = "*",}
	const enum GEkodobdZobrDtoTypes { nazev_ref = "string", nazev_fun = "string", typ_ag_txt = "string", zkr_ag = "string", dat_zmena_txt = "string", barva_txt = "string", aktivita_txt = "string", aktivita_color = "string", pocetZrusena = "number", pocetUzavrena = "number", pocetUzavrenaNeodlita = "number", pocetOtevrena = "number", pocetPripravena = "number", pocetZrusena_txt = "string", pocetUzavrena_txt = "string", pocetUzavrenaNeodlita_txt = "string", pocetOtevrena_txt = "string", pocetPripravena_txt = "string", blok_uzaverky = "number", stav_uzavreni = "number", stav_uzav = "string", stav_ag = "string", rok = "number", ico = "string", ucs = "string", lic = "string", typ_ag = "number", s_uzav = "number", dat_zmena = "JsonDate", zmenu_prov = "string", krok_uza = "number",}
	const enum GEkodobdZobrDtoTypeLengths { ico = 10, ucs = 10, lic = 4, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GekohhzoDto.d.ts 

declare namespace Gordic.Eko.Interface {
	/**DTO pro*/
	interface GDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
		/**por_cislo*/
		por_cislo?: number|null;
		/**dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**dat_akt_zdo*/
		dat_akt_zdo?: JsonDate|null;
		/**dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**typ_priz_dph*/
		typ_priz_dph?: number|null;
		typ_priz_dph_txt?: string|null;
		/**s_dph*/
		s_dph?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**platce_dph*/
		platce_dph?: number|null;
	}
	const enum GDtoNames { ico = "ico", rok = "rok", mesic = "mesic", por_cislo = "por_cislo", dat_priz_max = "dat_priz_max", dat_akt_zdo = "dat_akt_zdo", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", typ_priz_dph_txt = "typ_priz_dph_txt", s_dph = "s_dph", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", platce_dph = "platce_dph",}
	const enum GDtoFragments { ico = "main", rok = "main", mesic = "main", por_cislo = "main", dat_priz_max = "main", dat_akt_zdo = "main", dat_priz_dph = "main", dat_zjist_dod = "main", typ_priz_dph = "main", typ_priz_dph_txt = "main", s_dph = "main", dat_zmena = "main", zmenu_prov = "main", platce_dph = "main",}
	const enum GDtoTypes { ico = "string", rok = "number", mesic = "number", por_cislo = "number", dat_priz_max = "JsonDate", dat_akt_zdo = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", typ_priz_dph_txt = "string", s_dph = "number", dat_zmena = "JsonDate", zmenu_prov = "string", platce_dph = "number",}
	const enum GDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GExport.Dto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GExportDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.rok_uej*/
		rok_uej?: number|null;
		/**DBCOLUMN:Seznam.mesic_uej*/
		mesic_uej?: number|null;
		/**DBCOLUMN:Seznam.uus*/
		uus?: string|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
	}
	const enum GExportDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", popis = "popis", rok_uej = "rok_uej", mesic_uej = "mesic_uej", uus = "uus", ixs_esu = "ixs_esu", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr",}
	const enum GExportDtoFragments { rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", ac = "*", radek_z = "*", nks = "*", ixp = "*", drd = "*", aktivita = "*", den = "*", c0 = "*", c1 = "*", typ_ag = "*", stav_kch = "*", dat_zmena = "*", zmenu_prov = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", popis = "*", rok_uej = "*", mesic_uej = "*", uus = "*", ixs_esu = "*", id_hdr_ris = "*", radek_hdr = "*",}
	const enum GExportDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", popis = "string", rok_uej = "number", mesic_uej = "number", uus = "string", ixs_esu = "string", id_hdr_ris = "string", radek_hdr = "number",}
	const enum GExportDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, popis = 254, uus = 10, ixs_esu = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GInuBaseRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Predek vstupniho pozadavku*/
	interface GInuBaseRequestDto {
		/**ucs*/
		agenda?: Gordic.Inu.Interface.GEInuAgenda|null;
		/**ucs*/
		ucs?: string|null;
		/**lic*/
		lic?: string|null;
		/**mesic*/
		mesic?: number|null;
		/**Id zpravy*/
		IdMessage?: string|null;
	}
	const enum GInuBaseRequestDtoNames { agenda = "agenda", ucs = "ucs", lic = "lic", mesic = "mesic", IdMessage = "IdMessage",}
	const enum GInuBaseRequestDtoFragments { agenda = "*", ucs = "*", lic = "*", mesic = "*", IdMessage = "*",}
	const enum GInuBaseRequestDtoTypes { agenda = "Gordic.Inu.Interface.GEInuAgenda", ucs = "string", lic = "string", mesic = "number", IdMessage = "string",}
	const enum GInuBaseRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GInusexpDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Datový objekt popisující Seznam exportovaných dávek.*/
	interface GInusexpDto {
		/**Identifikátor exp.*/
		ixs_exp?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Exp Typ.*/
		exp_typ?: string|null;
		/**Exp format.*/
		exp_format?: string|null;
		/**Soubor.*/
		soubor?: string|null;
		/**Zkratka.*/
		zkratka?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**Mail.*/
		mail?: string|null;
		/**Datum zmena exp.*/
		dat_zmena_exp?: JsonDate|null;
		/**Zmenu prov exp.*/
		zmenu_prov_exp?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**nazecRF změnu provedl.*/
		zmenu_prov_txt?: string|null;
		/**nazecRF změnu provedl exp.*/
		zmenu_prov_exp_txt?: string|null;
		/**priloha*/
		priloha?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GInusexpDtoNames { ixs_exp = "ixs_exp", rok = "rok", mesic = "mesic", exp_typ = "exp_typ", exp_format = "exp_format", soubor = "soubor", zkratka = "zkratka", popis = "popis", mail = "mail", dat_zmena_exp = "dat_zmena_exp", zmenu_prov_exp = "zmenu_prov_exp", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", zmenu_prov_exp_txt = "zmenu_prov_exp_txt", priloha = "priloha", pocet = "pocet",}
	const enum GInusexpDtoFragments { ixs_exp = "main", rok = "main", mesic = "main", exp_typ = "main", exp_format = "main", soubor = "main", zkratka = "main", popis = "main", mail = "main", dat_zmena_exp = "main", zmenu_prov_exp = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main", zmenu_prov_exp_txt = "main", priloha = "main", pocet = "main",}
	const enum GInusexpDtoTypes { ixs_exp = "string", rok = "number", mesic = "number", exp_typ = "string", exp_format = "string", soubor = "string", zkratka = "string", popis = "string", mail = "string", dat_zmena_exp = "JsonDate", zmenu_prov_exp = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", zmenu_prov_exp_txt = "string", priloha = "string", pocet = "number",}
	const enum GInusexpDtoTypeLengths { ixs_exp = 12, exp_typ = 5, exp_format = 5, soubor = 254, zkratka = 16, popis = 254, mail = 254, zmenu_prov_exp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GInusimpDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro Inusimp*/
	interface GInusimpDto {
		/**ixs imp*/
		ixs_imp?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**popis*/
		popis?: string|null;
		/**Stav imp*/
		stav_imp?: number|null;
		/**soubor*/
		soubor?: string|null;
		/**datum změna nact*/
		dat_zmena_nact?: JsonDate|null;
		/**datum změna zprac*/
		dat_zmena_zprac?: JsonDate|null;
		/**zmenu prov nact*/
		zmenu_prov_nact?: string|null;
		/**zmenu prov zprac*/
		zmenu_prov_zprac?: string|null;
		/**Typ*/
		typ?: string|null;
		/**kon suma*/
		kon_suma?: string|null;
		/**zmenu prov nact_txt*/
		zmenu_prov_nact_txt?: string|null;
		/**zmenu prov zprac_txt*/
		zmenu_prov_zprac_txt?: string|null;
		/**ixp_dok*/
		ixp_dok?: string|null;
		/**ixs_typ_dok*/
		ixs_typ_dok?: string|null;
		/**ixs_typ_dok_txt*/
		ixs_typ_dok_txt?: string|null;
		/**stav_imp_txt*/
		stav_imp_txt?: string|null;
		/**vlastnik*/
		vlastnik?: string|null;
		/**priloha*/
		priloha?: string|null;
		/**in_ixp_den*/
		in_ixp_den?: string|null;
		/**in_ixs_fun*/
		in_ixs_fun?: string|null;
		/**in_ixs_su*/
		in_ixs_su?: string|null;
		/**in_ixs_typ*/
		in_ixs_typ?: string|null;
		/**in_ktg_typ*/
		in_ktg_typ?: number|null;
		/**in_subrada*/
		in_subrada?: number|null;
		/**1.parametr standartu GIN SPG*/
		v_err_code?: number|null;
		/**2.parametr standartu GIN SPG*/
		v_sql_err?: number|null;
		/**3.parametr standartu GIN SPG*/
		v_isam_err?: number|null;
		/**4.parametr standartu GIN SPG*/
		v_txt_err?: string|null;
		/**5.parametr standartu GIN SPG*/
		o_lok_err?: string|null;
		/**hlaska do notifikace*/
		o_hlaska?: string|null;
	}
	const enum GInusimpDtoNames { ixs_imp = "ixs_imp", zkratka = "zkratka", popis = "popis", stav_imp = "stav_imp", soubor = "soubor", dat_zmena_nact = "dat_zmena_nact", dat_zmena_zprac = "dat_zmena_zprac", zmenu_prov_nact = "zmenu_prov_nact", zmenu_prov_zprac = "zmenu_prov_zprac", typ = "typ", kon_suma = "kon_suma", zmenu_prov_nact_txt = "zmenu_prov_nact_txt", zmenu_prov_zprac_txt = "zmenu_prov_zprac_txt", ixp_dok = "ixp_dok", ixs_typ_dok = "ixs_typ_dok", ixs_typ_dok_txt = "ixs_typ_dok_txt", stav_imp_txt = "stav_imp_txt", vlastnik = "vlastnik", priloha = "priloha", in_ixp_den = "in_ixp_den", in_ixs_fun = "in_ixs_fun", in_ixs_su = "in_ixs_su", in_ixs_typ = "in_ixs_typ", in_ktg_typ = "in_ktg_typ", in_subrada = "in_subrada", v_err_code = "v_err_code", v_sql_err = "v_sql_err", v_isam_err = "v_isam_err", v_txt_err = "v_txt_err", o_lok_err = "o_lok_err", o_hlaska = "o_hlaska",}
	const enum GInusimpDtoFragments { ixs_imp = "main", zkratka = "main", popis = "main", stav_imp = "main", soubor = "main", dat_zmena_nact = "main", dat_zmena_zprac = "main", zmenu_prov_nact = "main", zmenu_prov_zprac = "main", typ = "main", kon_suma = "main", zmenu_prov_nact_txt = "main", zmenu_prov_zprac_txt = "main", ixp_dok = "main", ixs_typ_dok = "main", ixs_typ_dok_txt = "main", stav_imp_txt = "stav_imp_txt", vlastnik = "main", priloha = "main", in_ixp_den = "main", in_ixs_fun = "main", in_ixs_su = "main", in_ixs_typ = "main", in_ktg_typ = "main", in_subrada = "main", v_err_code = "*", v_sql_err = "*", v_isam_err = "*", v_txt_err = "*", o_lok_err = "*", o_hlaska = "*",}
	const enum GInusimpDtoTypes { ixs_imp = "string", zkratka = "string", popis = "string", stav_imp = "number", soubor = "string", dat_zmena_nact = "JsonDate", dat_zmena_zprac = "JsonDate", zmenu_prov_nact = "string", zmenu_prov_zprac = "string", typ = "string", kon_suma = "string", zmenu_prov_nact_txt = "string", zmenu_prov_zprac_txt = "string", ixp_dok = "string", ixs_typ_dok = "string", ixs_typ_dok_txt = "string", stav_imp_txt = "string", vlastnik = "string", priloha = "string", in_ixp_den = "string", in_ixs_fun = "string", in_ixs_su = "string", in_ixs_typ = "string", in_ktg_typ = "number", in_subrada = "number", v_err_code = "number", v_sql_err = "number", v_isam_err = "number", v_txt_err = "string", o_lok_err = "string", o_hlaska = "string",}
	const enum GInusimpDtoTypeLengths { ixs_imp = 12, zkratka = 254, popis = 254, soubor = 254, zmenu_prov_nact = 12, zmenu_prov_zprac = 12, typ = 5, kon_suma = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GPrepocetStavuDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DBTABLE:Seznam*/
	interface GPrepocetStavuDto {
		/**DBCOLUMN:Seznam.agenda*/
		agenda?: Gordic.Inu.Interface.GEInuAgenda|null;
		/**DBCOLUMN:Seznam.operace*/
		operace?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**1.parametr standartu GIN SPG*/
		v_err_code?: number|null;
		/**2.parametr standartu GIN SPG*/
		v_sql_err?: number|null;
		/**3.parametr standartu GIN SPG*/
		v_isam_err?: number|null;
		/**4.parametr standartu GIN SPG*/
		v_txt_err?: string|null;
		/**5.parametr standartu GIN SPG*/
		o_lok_err?: string|null;
		/**hlaska do notifikace*/
		o_hlaska?: string|null;
	}
	const enum GPrepocetStavuDtoNames { agenda = "agenda", operace = "operace", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", v_err_code = "v_err_code", v_sql_err = "v_sql_err", v_isam_err = "v_isam_err", v_txt_err = "v_txt_err", o_lok_err = "o_lok_err", o_hlaska = "o_hlaska",}
	const enum GPrepocetStavuDtoFragments { agenda = "*", operace = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", v_err_code = "*", v_sql_err = "*", v_isam_err = "*", v_txt_err = "*", o_lok_err = "*", o_hlaska = "*",}
	const enum GPrepocetStavuDtoTypes { agenda = "Gordic.Inu.Interface.GEInuAgenda", operace = "string", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", v_err_code = "number", v_sql_err = "number", v_isam_err = "number", v_txt_err = "string", o_lok_err = "string", o_hlaska = "string",}
	const enum GPrepocetStavuDtoTypeLengths { lic = 4, ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GServisVysledekDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**pocty dokladu akce DTO*/
	interface GServisVysledekDto {
		/**DBCOLUMN:vysledek*/
		vysledek?: boolean|null;
		/**DBCOLUMN:vysledek_txt*/
		vysledek_txt?: string|null;
		/**DBCOLUMN:varovani*/
		varovani?: string|null;
		/**DBCOLUMN:varovani*/
		varovani_txt?: string|null;
		/**DBCOLUMN:chyba*/
		chyba?: string|null;
		/**DBCOLUMN:pocet*/
		pocet?: number|null;
		/**DBCOLUMN:pocet2*/
		pocet2?: number|null;
	}
	const enum GServisVysledekDtoNames { vysledek = "vysledek", vysledek_txt = "vysledek_txt", varovani = "varovani", varovani_txt = "varovani_txt", chyba = "chyba", pocet = "pocet", pocet2 = "pocet2",}
	const enum GServisVysledekDtoFragments { vysledek = "*", vysledek_txt = "*", varovani = "*", varovani_txt = "*", chyba = "*", pocet = "*", pocet2 = "*",}
	const enum GServisVysledekDtoTypes { vysledek = "boolean", vysledek_txt = "string", varovani = "string", varovani_txt = "string", chyba = "string", pocet = "number", pocet2 = "number",}
	const enum GServisVysledekDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GUctdxwaDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Datový objekt popisující Seznam rkai pro přípravu.*/
	interface GUctdxwaDto {
		/**Rok.*/
		rok?: number|null;
		/**Lic.*/
		lic?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Radek z.*/
		radek_z?: number|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Identifikátor.*/
		ixp?: string|null;
		/**Drd.*/
		drd?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Den.*/
		den?: number|null;
		/**C0.*/
		c0?: JsonDecimal|null;
		/**C1.*/
		c1?: JsonDecimal|null;
		/**Typ ag.*/
		typ_ag?: number|null;
		/**Stav kch.*/
		stav_kch?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
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
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
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
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**Identifikátor kon.*/
		ixs_kon?: string|null;
		/**Popis.*/
		popis?: string|null;
		/**S prep.*/
		s_prep?: number|null;
		/**Účtárna.*/
		uus?: string|null;
		/**Rok uej.*/
		rok_uej?: number|null;
		/**Mesic uej.*/
		mesic_uej?: number|null;
		/**Zd.*/
		zd?: number|null;
		/**Identifikátor imp.*/
		ixs_imp?: string|null;
		/**Identifikátor esu.*/
		ixs_esu?: string|null;
		/**Priz char.*/
		priz_char?: number|null;
		/**Druh char.*/
		druh_char?: number|null;
		/**Id hdr ris.*/
		id_hdr_ris?: string|null;
		/**Radek hdr.*/
		radek_hdr?: number|null;
		/**Lic_txt.*/
		lic_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**1.parametr standartu GIN SPG*/
		err_code?: number|null;
		/**4.parametr standartu GIN SPG*/
		txt_err?: string|null;
	}
	const enum GUctdxwaDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", ixs_kon = "ixs_kon", popis = "popis", s_prep = "s_prep", uus = "uus", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", ixs_imp = "ixs_imp", ixs_esu = "ixs_esu", priz_char = "priz_char", druh_char = "druh_char", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", lic_txt = "lic_txt", pocet = "pocet", err_code = "err_code", txt_err = "txt_err",}
	const enum GUctdxwaDtoFragments { rok = "main", lic = "main", ico = "main", ucs = "main", mesic = "main", ac = "main", radek_z = "main", nks = "main", ixp = "main", drd = "main", aktivita = "main", den = "main", c0 = "main", c1 = "main", typ_ag = "main", stav_kch = "main", dat_zmena = "main", zmenu_prov = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", uek = "main", uel = "main", uem = "main", uen = "main", ixs_kon = "main", popis = "main", s_prep = "main", uus = "main", rok_uej = "main", mesic_uej = "main", zd = "main", ixs_imp = "main", ixs_esu = "main", priz_char = "main", druh_char = "main", id_hdr_ris = "main", radek_hdr = "main", lic_txt = "lic_txt", pocet = "main", err_code = "main", txt_err = "main",}
	const enum GUctdxwaDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", ixs_kon = "string", popis = "string", s_prep = "number", uus = "string", rok_uej = "number", mesic_uej = "number", zd = "number", ixs_imp = "string", ixs_esu = "string", priz_char = "number", druh_char = "number", id_hdr_ris = "string", radek_hdr = "number", lic_txt = "string", pocet = "number", err_code = "number", txt_err = "string",}
	const enum GUctdxwaDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ac = 20, nks = 12, ixp = 12, zmenu_prov = 12, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, uek = 6, uel = 10, uem = 10, uen = 6, ixs_kon = 12, popis = 254, uus = 10, ixs_imp = 12, ixs_esu = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\GUctsxwaDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Datový objekt popisující Seznam rkai pro přípravu.*/
	interface GUctsxwaDto {
		/**Rok.*/
		rok?: number|null;
		/**Lic.*/
		lic?: string|null;
		/**Ičo.*/
		ico?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Mesic.*/
		mesic?: number|null;
		/**Agendové číslo.*/
		ac?: string|null;
		/**Radek z.*/
		radek_z?: number|null;
		/**Radek pz.*/
		radek_pz?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Drd.*/
		drd?: number|null;
		/**Identifikátor.*/
		ixp?: string|null;
		/**Identifikátor imp.*/
		ixs_imp?: string|null;
		/**Lic_txt.*/
		lic_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GUctsxwaDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", radek_pz = "radek_pz", popis = "popis", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", drd = "drd", ixp = "ixp", ixs_imp = "ixs_imp", lic_txt = "lic_txt", pocet = "pocet",}
	const enum GUctsxwaDtoFragments { rok = "main", lic = "main", ico = "main", ucs = "main", mesic = "main", ac = "main", radek_z = "main", radek_pz = "main", popis = "main", dat_zmena = "main", zmenu_prov = "main", drd = "main", ixp = "main", ixs_imp = "main", lic_txt = "lic_txt", pocet = "main",}
	const enum GUctsxwaDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", radek_pz = "number", popis = "string", dat_zmena = "JsonDate", zmenu_prov = "string", drd = "number", ixp = "string", ixs_imp = "string", lic_txt = "string", pocet = "number",}
	const enum GUctsxwaDtoTypeLengths { lic = 4, ico = 10, ucs = 10, ac = 20, popis = 254, zmenu_prov = 12, ixp = 12, ixs_imp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\HlaseniDPH\GDokladyHlaseniDPHDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro vysledek kontroly kontrolniho hlaseni*/
	interface GKontrolaHlaseniDPHDto {
		seznam_obdobi?: string|null;
		doklady?: Gordic.Inu.Interface.GDokladHlaseniDPHDto[]|null;
	}
	const enum GKontrolaHlaseniDPHDtoNames { seznam_obdobi = "seznam_obdobi", doklady = "doklady",}
	const enum GKontrolaHlaseniDPHDtoFragments { seznam_obdobi = "*", doklady = "*",}
	const enum GKontrolaHlaseniDPHDtoTypes { seznam_obdobi = "string", doklady = "Gordic.Inu.Interface.GDokladHlaseniDPHDto[]",}
	const enum GKontrolaHlaseniDPHDtoTypeLengths {}
	/**DTO pro doklady kontrolniho hlaseni*/
	interface GDokladHlaseniDPHDto {
		/**radek*/
		radek?: number|null;
		/**s1*/
		s1?: string|null;
		/**s2*/
		s2?: string|null;
		/**s3*/
		s3?: string|null;
		/**s4*/
		s4?: string|null;
		/**s5*/
		s5?: string|null;
		/**s6*/
		s6?: string|null;
		/**s7*/
		s7?: string|null;
		/**s8*/
		s8?: string|null;
	}
	const enum GDokladHlaseniDPHDtoNames { radek = "radek", s1 = "s1", s2 = "s2", s3 = "s3", s4 = "s4", s5 = "s5", s6 = "s6", s7 = "s7", s8 = "s8",}
	const enum GDokladHlaseniDPHDtoFragments { radek = "main", s1 = "main", s2 = "main", s3 = "main", s4 = "main", s5 = "main", s6 = "main", s7 = "main", s8 = "main",}
	const enum GDokladHlaseniDPHDtoTypes { radek = "number", s1 = "string", s2 = "string", s3 = "string", s4 = "string", s5 = "string", s6 = "string", s7 = "string", s8 = "string",}
	const enum GDokladHlaseniDPHDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\HlaseniDPH\GHlaseniDPHDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro kontrolni hlaseni*/
	interface GHlaseniDPHDto {
		/**rok_dph*/
		rok_dph?: number|null;
		/**ico*/
		ico?: string|null;
		/**mesic_dph*/
		mesic_dph?: number|null;
		/**por_cislo*/
		por_cislo?: number|null;
		/**dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**s_dph*/
		s_dph?: number|null;
		/**typ_priz_dph_txt*/
		typ_priz_dph_txt?: string|null;
		/**cj_vyzvy*/
		cj_vyzvy?: string|null;
		/**vyzva_odp*/
		vyzva_odp?: string|null;
	}
	const enum GHlaseniDPHDtoNames { rok_dph = "rok_dph", ico = "ico", mesic_dph = "mesic_dph", por_cislo = "por_cislo", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", typ_priz_dph_txt = "typ_priz_dph_txt", cj_vyzvy = "cj_vyzvy", vyzva_odp = "vyzva_odp",}
	const enum GHlaseniDPHDtoFragments { rok_dph = "main", ico = "main", mesic_dph = "main", por_cislo = "main", dat_priz_max = "main", dat_priz_dph = "main", dat_zjist_dod = "main", typ_priz_dph = "main", s_dph = "main", typ_priz_dph_txt = "main", cj_vyzvy = "main", vyzva_odp = "main",}
	const enum GHlaseniDPHDtoTypes { rok_dph = "number", ico = "string", mesic_dph = "number", por_cislo = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", s_dph = "number", typ_priz_dph_txt = "string", cj_vyzvy = "string", vyzva_odp = "string",}
	const enum GHlaseniDPHDtoTypeLengths { ico = 21, typ_priz_dph_txt = 101, cj_vyzvy = 65, vyzva_odp = 7,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\HlaseniDPH\GInuPodatHlaseniRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO podani kontrolniho hlaseni*/
	interface GInuPodatHlaseniRequestDto {
		/**Vstupni DTO*/
		Vstup?: Gordic.Inu.Interface.GEkohkhlDto|null;
		/**Nastaveni podani hlaseni (kroky prubehu...)*/
		Nastaveni?: Gordic.Inu.Interface.GInuPodatNastaveniDto|null;
	}
	const enum GInuPodatHlaseniRequestDtoNames { Vstup = "Vstup", Nastaveni = "Nastaveni",}
	const enum GInuPodatHlaseniRequestDtoFragments { Vstup = "*", Nastaveni = "*",}
	const enum GInuPodatHlaseniRequestDtoTypes { Vstup = "Gordic.Inu.Interface.GEkohkhlDto", Nastaveni = "Gordic.Inu.Interface.GInuPodatNastaveniDto",}
	const enum GInuPodatHlaseniRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\HlaseniDPH\GInuPodatNastaveniDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro nastaveni podani kontrolniho hlaseni*/
	interface GInuPodatNastaveniDto {
		/**Nalezeny neprouctovane doklady*/
		OtazkaNeprouctovaneDoklady?: boolean|null;
	}
	const enum GInuPodatNastaveniDtoNames { OtazkaNeprouctovaneDoklady = "OtazkaNeprouctovaneDoklady",}
	const enum GInuPodatNastaveniDtoFragments { OtazkaNeprouctovaneDoklady = "*",}
	const enum GInuPodatNastaveniDtoTypes { OtazkaNeprouctovaneDoklady = "boolean",}
	const enum GInuPodatNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\Obdobi\GInuKontrolaObdobiDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro seznam obdobi*/
	interface GInuKontrolaObdobiDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**nks*/
		nks?: string|null;
		/**uus*/
		uus?: string|null;
		/**lic*/
		lic?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**nazev*/
		nazev?: string|null;
		/**stav_kon*/
		stav_kon?: number|null;
		/**stav_obd*/
		stav_obd?: string|null;
		/**stav_kon_puv*/
		stav_kon_puv?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GInuKontrolaObdobiDtoNames { ico = "ico", ucs = "ucs", nks = "nks", uus = "uus", lic = "lic", aktivita = "aktivita", nazev = "nazev", stav_kon = "stav_kon", stav_obd = "stav_obd", stav_kon_puv = "stav_kon_puv", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GInuKontrolaObdobiDtoFragments { ico = "main", ucs = "main", nks = "main", uus = "main", lic = "main", aktivita = "main", nazev = "main", stav_kon = "main", stav_obd = "main", stav_kon_puv = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GInuKontrolaObdobiDtoTypes { ico = "string", ucs = "string", nks = "string", uus = "string", lic = "string", aktivita = "number", nazev = "string", stav_kon = "number", stav_obd = "string", stav_kon_puv = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GInuKontrolaObdobiDtoTypeLengths { ico = 10, ucs = 10, nks = 12, uus = 10, lic = 4, nazev = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\Obdobi\GInuObdobiDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO s podmnozinou informaci v Globals*/
	interface GInuObdobiDto {
		/**DBCOLUMN:Seznam.sl1*/
		sl1?: string|null;
		/**DBCOLUMN:Seznam.sl2*/
		sl2?: number|null;
		/**DBCOLUMN:Seznam.sl3*/
		sl3?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.akt_obd*/
		akt_obd?: number|null;
		/**DBCOLUMN:Seznam.stav*/
		stav?: number|null;
		/**DBCOLUMN:Seznam.blok*/
		blok?: number|null;
		/**DBCOLUMN:Seznam.drd*/
		drd?: number|null;
		/**DBCOLUMN:Seznam.priz_schv*/
		priz_schv?: number|null;
		/**DBCOLUMN:Seznam.priz_delstav*/
		priz_delstav?: number|null;
		/**DBCOLUMN:Seznam.mesic_txt*/
		mesic_txt?: string|null;
		/**DBCOLUMN:Seznam.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:Seznam.aktivita_color*/
		aktivita_color?: string|null;
		/**DBCOLUMN:Seznam.barva_txt*/
		barva_txt?: string|null;
		/**DBCOLUMN:Seznam.aktualni_stavy_ikona*/
		aktualni_stavy_ikona?: string|null;
		/**DBCOLUMN:Seznam.pocet_zapisu_celkem*/
		pocet_zapisu_celkem?: number|null;
		/**DBCOLUMN:Seznam.pocet_zapisu_neprepocteno*/
		pocet_zapisu_neprepocteno?: number|null;
		/**DBCOLUMN:Seznam.pocet_zapisu_celkem_txt*/
		pocet_zapisu_celkem_txt?: string|null;
		/**DBCOLUMN:Seznam.pocet_zapisu_neprepocteno_txt*/
		pocet_zapisu_neprepocteno_txt?: string|null;
		/**DBCOLUMN:Seznam.aktivita_zkr*/
		aktivita_zkr?: string|null;
		/**DBCOLUMN:Seznam.blokace_zkr*/
		blokace_zkr?: string|null;
		/**DBCOLUMN:Seznam.schvaleni_zkr*/
		schvaleni_zkr?: string|null;
		/**DBCOLUMN:Seznam.blokace_txt*/
		blokace_txt?: string|null;
		/**DBCOLUMN:Seznam.schvaleni_txt*/
		schvaleni_txt?: string|null;
	}
	const enum GInuObdobiDtoNames { sl1 = "sl1", sl2 = "sl2", sl3 = "sl3", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", akt_obd = "akt_obd", stav = "stav", blok = "blok", drd = "drd", priz_schv = "priz_schv", priz_delstav = "priz_delstav", mesic_txt = "mesic_txt", aktivita_txt = "aktivita_txt", aktivita_color = "aktivita_color", barva_txt = "barva_txt", aktualni_stavy_ikona = "aktualni_stavy_ikona", pocet_zapisu_celkem = "pocet_zapisu_celkem", pocet_zapisu_neprepocteno = "pocet_zapisu_neprepocteno", pocet_zapisu_celkem_txt = "pocet_zapisu_celkem_txt", pocet_zapisu_neprepocteno_txt = "pocet_zapisu_neprepocteno_txt", aktivita_zkr = "aktivita_zkr", blokace_zkr = "blokace_zkr", schvaleni_zkr = "schvaleni_zkr", blokace_txt = "blokace_txt", schvaleni_txt = "schvaleni_txt",}
	const enum GInuObdobiDtoFragments { sl1 = "*", sl2 = "*", sl3 = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", akt_obd = "*", stav = "*", blok = "*", drd = "*", priz_schv = "*", priz_delstav = "*", mesic_txt = "*", aktivita_txt = "*", aktivita_color = "*", barva_txt = "*", aktualni_stavy_ikona = "*", pocet_zapisu_celkem = "*", pocet_zapisu_neprepocteno = "*", pocet_zapisu_celkem_txt = "*", pocet_zapisu_neprepocteno_txt = "*", aktivita_zkr = "*", blokace_zkr = "*", schvaleni_zkr = "*", blokace_txt = "*", schvaleni_txt = "*",}
	const enum GInuObdobiDtoTypes { sl1 = "string", sl2 = "number", sl3 = "number", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", akt_obd = "number", stav = "number", blok = "number", drd = "number", priz_schv = "number", priz_delstav = "number", mesic_txt = "string", aktivita_txt = "string", aktivita_color = "string", barva_txt = "string", aktualni_stavy_ikona = "string", pocet_zapisu_celkem = "number", pocet_zapisu_neprepocteno = "number", pocet_zapisu_celkem_txt = "string", pocet_zapisu_neprepocteno_txt = "string", aktivita_zkr = "string", blokace_zkr = "string", schvaleni_zkr = "string", blokace_txt = "string", schvaleni_txt = "string",}
	const enum GInuObdobiDtoTypeLengths { lic = 4, ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\Obdobi\GInuObdobiVyabraneDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO s podmnozinou informaci v Globals*/
	interface GInuObdobiVyabraneDto extends Gordic.Inu.Interface.GInuObdobiDto {
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
	}
	const enum GInuObdobiVyabraneDtoNames { wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", sl1 = "sl1", sl2 = "sl2", sl3 = "sl3", rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", akt_obd = "akt_obd", stav = "stav", blok = "blok", drd = "drd", priz_schv = "priz_schv", priz_delstav = "priz_delstav", mesic_txt = "mesic_txt", aktivita_txt = "aktivita_txt", aktivita_color = "aktivita_color", barva_txt = "barva_txt", aktualni_stavy_ikona = "aktualni_stavy_ikona", pocet_zapisu_celkem = "pocet_zapisu_celkem", pocet_zapisu_neprepocteno = "pocet_zapisu_neprepocteno", pocet_zapisu_celkem_txt = "pocet_zapisu_celkem_txt", pocet_zapisu_neprepocteno_txt = "pocet_zapisu_neprepocteno_txt", aktivita_zkr = "aktivita_zkr", blokace_zkr = "blokace_zkr", schvaleni_zkr = "schvaleni_zkr", blokace_txt = "blokace_txt", schvaleni_txt = "schvaleni_txt",}
	const enum GInuObdobiVyabraneDtoFragments { wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", sl1 = "*", sl2 = "*", sl3 = "*", rok = "*", lic = "*", ico = "*", ucs = "*", mesic = "*", akt_obd = "*", stav = "*", blok = "*", drd = "*", priz_schv = "*", priz_delstav = "*", mesic_txt = "*", aktivita_txt = "*", aktivita_color = "*", barva_txt = "*", aktualni_stavy_ikona = "*", pocet_zapisu_celkem = "*", pocet_zapisu_neprepocteno = "*", pocet_zapisu_celkem_txt = "*", pocet_zapisu_neprepocteno_txt = "*", aktivita_zkr = "*", blokace_zkr = "*", schvaleni_zkr = "*", blokace_txt = "*", schvaleni_txt = "*",}
	const enum GInuObdobiVyabraneDtoTypes { wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", sl1 = "string", sl2 = "number", sl3 = "number", rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", akt_obd = "number", stav = "number", blok = "number", drd = "number", priz_schv = "number", priz_delstav = "number", mesic_txt = "string", aktivita_txt = "string", aktivita_color = "string", barva_txt = "string", aktualni_stavy_ikona = "string", pocet_zapisu_celkem = "number", pocet_zapisu_neprepocteno = "number", pocet_zapisu_celkem_txt = "string", pocet_zapisu_neprepocteno_txt = "string", aktivita_zkr = "string", blokace_zkr = "string", schvaleni_zkr = "string", blokace_txt = "string", schvaleni_txt = "string",}
	const enum GInuObdobiVyabraneDtoTypeLengths { lic = 4, ico = 10, ucs = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\Obdobi\GInuOpenCloseRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO schvaleni  - vstup (pozadavek)*/
	interface GInuSchvalitDto extends Gordic.Inu.Interface.GInuBaseRequestDto {
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Inu.Interface.GInuUzavreniMesiceNastaveniDto|null;
	}
	const enum GInuSchvalitDtoNames { Nastaveni = "Nastaveni", agenda = "agenda", ucs = "ucs", lic = "lic", mesic = "mesic", IdMessage = "IdMessage",}
	const enum GInuSchvalitDtoFragments { Nastaveni = "*", agenda = "*", ucs = "*", lic = "*", mesic = "*", IdMessage = "*",}
	const enum GInuSchvalitDtoTypes { Nastaveni = "Gordic.Inu.Interface.GInuUzavreniMesiceNastaveniDto", agenda = "Gordic.Inu.Interface.GEInuAgenda", ucs = "string", lic = "string", mesic = "number", IdMessage = "string",}
	const enum GInuSchvalitDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\ObdobiDPH\GPrepocetStavuDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Seznam obdobi DPH*/
	interface GSeznamObdobiDPHDto {
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		dat_priz_max?: JsonDate|null;
		dat_priz_dph?: JsonDate|null;
		dat_zjist_dod?: JsonDate|null;
		typ_priz_dph?: number|null;
		s_dph?: number|null;
		s_prep_dph?: number|null;
		aktivita?: number|null;
		s_prep_dph_txt?: string|null;
		typ_priz_dph_txt?: string|null;
		/**typ_dph*/
		typ_dph?: string|null;
		/**typ_dph_txt*/
		typ_dph_txt?: string|null;
	}
	const enum GSeznamObdobiDPHDtoNames { rok = "rok", ico = "ico", mesic = "mesic", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", s_prep_dph = "s_prep_dph", aktivita = "aktivita", s_prep_dph_txt = "s_prep_dph_txt", typ_priz_dph_txt = "typ_priz_dph_txt", typ_dph = "typ_dph", typ_dph_txt = "typ_dph_txt",}
	const enum GSeznamObdobiDPHDtoFragments { rok = "*", ico = "*", mesic = "*", dat_priz_max = "*", dat_priz_dph = "*", dat_zjist_dod = "*", typ_priz_dph = "*", s_dph = "*", s_prep_dph = "*", aktivita = "*", s_prep_dph_txt = "*", typ_priz_dph_txt = "*", typ_dph = "*", typ_dph_txt = "*",}
	const enum GSeznamObdobiDPHDtoTypes { rok = "number", ico = "string", mesic = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", s_dph = "number", s_prep_dph = "number", aktivita = "number", s_prep_dph_txt = "string", typ_priz_dph_txt = "string", typ_dph = "string", typ_dph_txt = "string",}
	const enum GSeznamObdobiDPHDtoTypeLengths { ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\ObdobiKHDPH\GSeznamObdobiKHDPHDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Seznam obdobi HKDPH*/
	interface GSeznamObdobiKHDPHDto {
		/**por_cislo*/
		por_cislo?: number|null;
		/**rok_dph*/
		rok_dph?: number|null;
		/**ico*/
		ico?: string|null;
		/**mesic_dph*/
		mesic_dph?: number|null;
		/**dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**s_dph*/
		s_dph?: number|null;
		/**s_prep_dph*/
		s_prep_dph?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**s_prep_dph_txt*/
		s_prep_dph_txt?: string|null;
		/**typ_dph*/
		typ_dph?: string|null;
		/**typ_dph_txt*/
		typ_dph_txt?: string|null;
		/**typ_priz_DPH_txt*/
		typ_priz_dph_txt?: string|null;
	}
	const enum GSeznamObdobiKHDPHDtoNames { por_cislo = "por_cislo", rok_dph = "rok_dph", ico = "ico", mesic_dph = "mesic_dph", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", s_prep_dph = "s_prep_dph", aktivita = "aktivita", s_prep_dph_txt = "s_prep_dph_txt", typ_dph = "typ_dph", typ_dph_txt = "typ_dph_txt", typ_priz_dph_txt = "typ_priz_dph_txt",}
	const enum GSeznamObdobiKHDPHDtoFragments { por_cislo = "main", rok_dph = "main", ico = "main", mesic_dph = "main", dat_priz_max = "main", dat_priz_dph = "main", dat_zjist_dod = "main", typ_priz_dph = "main", s_dph = "main", s_prep_dph = "main", aktivita = "main", s_prep_dph_txt = "main", typ_dph = "main", typ_dph_txt = "*", typ_priz_dph_txt = "main",}
	const enum GSeznamObdobiKHDPHDtoTypes { por_cislo = "number", rok_dph = "number", ico = "string", mesic_dph = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", s_dph = "number", s_prep_dph = "number", aktivita = "number", s_prep_dph_txt = "string", typ_dph = "string", typ_dph_txt = "string", typ_priz_dph_txt = "string",}
	const enum GSeznamObdobiKHDPHDtoTypeLengths { ico = 21, s_prep_dph_txt = 101, typ_dph = 1, typ_priz_dph_txt = 101,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\PriznaniDPH\GHlavickaPriznaniDPHDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro hlavicku priznani k DPH*/
	interface GHlavickaPriznaniDPHDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
		/**por_cislo*/
		por_cislo?: number|null;
		/**dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**dat_akt_zdo*/
		dat_akt_zdo?: JsonDate|null;
		/**dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**s_dph*/
		s_dph?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**platce_dph*/
		platce_dph?: number|null;
		typ_priz_dph_txt?: string|null;
	}
	const enum GHlavickaPriznaniDPHDtoNames { ico = "ico", rok = "rok", mesic = "mesic", por_cislo = "por_cislo", dat_priz_max = "dat_priz_max", dat_akt_zdo = "dat_akt_zdo", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", platce_dph = "platce_dph", typ_priz_dph_txt = "typ_priz_dph_txt",}
	const enum GHlavickaPriznaniDPHDtoFragments { ico = "main", rok = "main", mesic = "main", por_cislo = "main", dat_priz_max = "main", dat_akt_zdo = "main", dat_priz_dph = "main", dat_zjist_dod = "main", typ_priz_dph = "main", s_dph = "main", dat_zmena = "main", zmenu_prov = "main", platce_dph = "main", typ_priz_dph_txt = "main",}
	const enum GHlavickaPriznaniDPHDtoTypes { ico = "string", rok = "number", mesic = "number", por_cislo = "number", dat_priz_max = "JsonDate", dat_akt_zdo = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", s_dph = "number", dat_zmena = "JsonDate", zmenu_prov = "string", platce_dph = "number", typ_priz_dph_txt = "string",}
	const enum GHlavickaPriznaniDPHDtoTypeLengths { ico = 21, zmenu_prov = 25,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\PriznaniDPH\GInuPriznaniDPHActionResponseDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Predek DTO pro predani vysledku  read danoveho priznani*/
	interface GInuPriznaniDPHActionResponseDto {
		/**Zdanovaci obdobi*/
		ZdanovaciObdobi?: Gordic.Inu.Interface.GEkosazoDto|null;
		/**Hlavicke priznani DPH*/
		HlavickaPriznani?: Gordic.Inu.Interface.GHlavickaPriznaniDPHDto|null;
		/**Polozky priznani DPH*/
		PolozkyPriznani?: Gordic.Inu.Interface.GEkocpfdDto[]|null;
	}
	const enum GInuPriznaniDPHActionResponseDtoNames { ZdanovaciObdobi = "ZdanovaciObdobi", HlavickaPriznani = "HlavickaPriznani", PolozkyPriznani = "PolozkyPriznani",}
	const enum GInuPriznaniDPHActionResponseDtoFragments { ZdanovaciObdobi = "*", HlavickaPriznani = "*", PolozkyPriznani = "*",}
	const enum GInuPriznaniDPHActionResponseDtoTypes { ZdanovaciObdobi = "Gordic.Inu.Interface.GEkosazoDto", HlavickaPriznani = "Gordic.Inu.Interface.GHlavickaPriznaniDPHDto", PolozkyPriznani = "Gordic.Inu.Interface.GEkocpfdDto[]",}
	const enum GInuPriznaniDPHActionResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\PriznaniDPH\GKontrolaNeprouctovanychResponseDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro vysledek kontroly neprouctovanych dokladu*/
	interface GKontrolaNeprouctovanychResponseDto {
		Message?: string|null;
		/**Vysledek*/
		Result?: boolean|null;
		/**Seznma neprouctovanych dokladu*/
		SeznamDokladu?: Gordic.Inu.Interface.GNeprouctovaneDokladuDto[]|null;
	}
	const enum GKontrolaNeprouctovanychResponseDtoNames { Message = "Message", Result = "Result", SeznamDokladu = "SeznamDokladu",}
	const enum GKontrolaNeprouctovanychResponseDtoFragments { Message = "*", Result = "*", SeznamDokladu = "*",}
	const enum GKontrolaNeprouctovanychResponseDtoTypes { Message = "string", Result = "boolean", SeznamDokladu = "Gordic.Inu.Interface.GNeprouctovaneDokladuDto[]",}
	const enum GKontrolaNeprouctovanychResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\PriznaniDPH\GNeprouctovaneDokladuDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro seznam neprouctovanych dokladu*/
	interface GNeprouctovaneDokladuDto {
		/**por_cislo*/
		por_cislo?: number|null;
		/**agenda*/
		agenda?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**doklad*/
		doklad?: string|null;
		/**pid*/
		pid?: string|null;
		/**uus*/
		uus?: string|null;
	}
	const enum GNeprouctovaneDokladuDtoNames { por_cislo = "por_cislo", agenda = "agenda", nazev = "nazev", doklad = "doklad", pid = "pid", uus = "uus",}
	const enum GNeprouctovaneDokladuDtoFragments { por_cislo = "main", agenda = "main", nazev = "main", doklad = "main", pid = "main", uus = "main",}
	const enum GNeprouctovaneDokladuDtoTypes { por_cislo = "number", agenda = "string", nazev = "string", doklad = "string", pid = "string", uus = "string",}
	const enum GNeprouctovaneDokladuDtoTypeLengths { agenda = 3, nazev = 101, doklad = 121, pid = 25, uus = 21,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\PriznaniDPH\GSeznamPriznaniDPHDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro seznam priznani*/
	interface GSeznamPriznaniDPHDto {
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**mesic*/
		mesic?: number|null;
		/**por_cislo*/
		por_cislo?: number|null;
		/**dat_priz_max*/
		dat_priz_max?: JsonDate|null;
		/**dat_priz_dph*/
		dat_priz_dph?: JsonDate|null;
		/**dat_zjist_dod*/
		dat_zjist_dod?: JsonDate|null;
		/**typ_priz_dph*/
		typ_priz_dph?: number|null;
		/**s_dph*/
		s_dph?: number|null;
		/**dat_akt_zdo*/
		dat_akt_zdo?: JsonDate|null;
		/**typ_priz_dph_txt*/
		typ_priz_dph_txt?: string|null;
		/**ixs_esu_txt*/
		ixs_esu_txt?: string|null;
	}
	const enum GSeznamPriznaniDPHDtoNames { rok = "rok", ico = "ico", mesic = "mesic", por_cislo = "por_cislo", dat_priz_max = "dat_priz_max", dat_priz_dph = "dat_priz_dph", dat_zjist_dod = "dat_zjist_dod", typ_priz_dph = "typ_priz_dph", s_dph = "s_dph", dat_akt_zdo = "dat_akt_zdo", typ_priz_dph_txt = "typ_priz_dph_txt", ixs_esu_txt = "ixs_esu_txt",}
	const enum GSeznamPriznaniDPHDtoFragments { rok = "main", ico = "main", mesic = "main", por_cislo = "main", dat_priz_max = "main", dat_priz_dph = "main", dat_zjist_dod = "main", typ_priz_dph = "main", s_dph = "main", dat_akt_zdo = "main", typ_priz_dph_txt = "main", ixs_esu_txt = "ixs_esu_txt",}
	const enum GSeznamPriznaniDPHDtoTypes { rok = "number", ico = "string", mesic = "number", por_cislo = "number", dat_priz_max = "JsonDate", dat_priz_dph = "JsonDate", dat_zjist_dod = "JsonDate", typ_priz_dph = "number", s_dph = "number", dat_akt_zdo = "JsonDate", typ_priz_dph_txt = "string", ixs_esu_txt = "string",}
	const enum GSeznamPriznaniDPHDtoTypeLengths { ico = 10, typ_priz_dph_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\PriznaniDPH\GSeznamUUSDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO seznam uctaren*/
	interface GSeznamUUSDto {
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**uus*/
		uus?: string|null;
		/**nazev*/
		nazev?: string|null;
	}
	const enum GSeznamUUSDtoNames { ico = "ico", ucs = "ucs", uus = "uus", nazev = "nazev",}
	const enum GSeznamUUSDtoFragments { ico = "main", ucs = "main", uus = "main", nazev = "main",}
	const enum GSeznamUUSDtoTypes { ico = "string", ucs = "string", uus = "string", nazev = "string",}
	const enum GSeznamUUSDtoTypeLengths { ico = 21, ucs = 21, uus = 21, nazev = 101,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuAgendytDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro seznam ucs a lic*/
	interface GInuUcsLicDto {
		/**rok*/
		ucs?: string|null;
		/**rok*/
		lic?: string|null;
	}
	const enum GInuUcsLicDtoNames { ucs = "ucs", lic = "lic",}
	const enum GInuUcsLicDtoFragments { ucs = "main", lic = "main",}
	const enum GInuUcsLicDtoTypes { ucs = "string", lic = "string",}
	const enum GInuUcsLicDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuAgendytProUzavreniDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro seznam agned pro uzavreni*/
	interface GInuAgendytProUzavreniDto {
		/**typ_ag*/
		typ_ag?: number|null;
		/**typ_ag_txt*/
		typ_ag_txt?: string|null;
		/**blok_uzaverky*/
		blok_uzaverky?: number|null;
		/**stav_uzavreni*/
		stav_uzavreni?: number|null;
		/**stav_uzav*/
		stav_uzav?: string|null;
		/**stav_ag*/
		stav_ag?: string|null;
		/**ixs_ext_txt*/
		ixs_ext_txt?: string|null;
		/**ktg_ag_txt*/
		ktg_ag_txt?: string|null;
		/**typ_ag_rsx_txt*/
		typ_ag_rsx_txt?: string|null;
		/**typ_uct_txt*/
		typ_uct_txt?: string|null;
	}
	const enum GInuAgendytProUzavreniDtoNames { typ_ag = "typ_ag", typ_ag_txt = "typ_ag_txt", blok_uzaverky = "blok_uzaverky", stav_uzavreni = "stav_uzavreni", stav_uzav = "stav_uzav", stav_ag = "stav_ag", ixs_ext_txt = "ixs_ext_txt", ktg_ag_txt = "ktg_ag_txt", typ_ag_rsx_txt = "typ_ag_rsx_txt", typ_uct_txt = "typ_uct_txt",}
	const enum GInuAgendytProUzavreniDtoFragments { typ_ag = "main", typ_ag_txt = "main", blok_uzaverky = "main", stav_uzavreni = "main", stav_uzav = "main", stav_ag = "main", ixs_ext_txt = "ixs_ext_txt", ktg_ag_txt = "ktg_ag_txt", typ_ag_rsx_txt = "typ_ag_rsx_txt", typ_uct_txt = "typ_uct_txt",}
	const enum GInuAgendytProUzavreniDtoTypes { typ_ag = "number", typ_ag_txt = "string", blok_uzaverky = "number", stav_uzavreni = "number", stav_uzav = "string", stav_ag = "string", ixs_ext_txt = "string", ktg_ag_txt = "string", typ_ag_rsx_txt = "string", typ_uct_txt = "string",}
	const enum GInuAgendytProUzavreniDtoTypeLengths { typ_ag_txt = 100, stav_uzav = 1, stav_ag = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuAnulaceZacatekUzaverkyNastaveniDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO zacatak ucetni uzaverky - nastaveni uzavreni*/
	interface GInuAnulaceZacatekUzaverkyNastaveniDto {
		/**Opravdu zrušit zahájení uzávěrky období {0}?*/
		OtazkaOpravduZrusit?: boolean|null;
	}
	const enum GInuAnulaceZacatekUzaverkyNastaveniDtoNames { OtazkaOpravduZrusit = "OtazkaOpravduZrusit",}
	const enum GInuAnulaceZacatekUzaverkyNastaveniDtoFragments { OtazkaOpravduZrusit = "*",}
	const enum GInuAnulaceZacatekUzaverkyNastaveniDtoTypes { OtazkaOpravduZrusit = "boolean",}
	const enum GInuAnulaceZacatekUzaverkyNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuAnulaceZacatekUzaverkyRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO zacatek uzaverky mesicniho období  - vstup (pozadavek)*/
	interface GInuAnulaceZacatekUzaverkyRequestDto extends Gordic.Inu.Interface.GInuBaseRequestDto {
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Inu.Interface.GInuAnulaceZacatekUzaverkyNastaveniDto|null;
	}
	const enum GInuAnulaceZacatekUzaverkyRequestDtoNames { Nastaveni = "Nastaveni", agenda = "agenda", ucs = "ucs", lic = "lic", mesic = "mesic", IdMessage = "IdMessage",}
	const enum GInuAnulaceZacatekUzaverkyRequestDtoFragments { Nastaveni = "*", agenda = "*", ucs = "*", lic = "*", mesic = "*", IdMessage = "*",}
	const enum GInuAnulaceZacatekUzaverkyRequestDtoTypes { Nastaveni = "Gordic.Inu.Interface.GInuAnulaceZacatekUzaverkyNastaveniDto", agenda = "Gordic.Inu.Interface.GEInuAgenda", ucs = "string", lic = "string", mesic = "number", IdMessage = "string",}
	const enum GInuAnulaceZacatekUzaverkyRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuChybyUzaverkyDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro vypis chyb pri kontorle na prouctovani*/
	interface GInuChybyUzaverkyDto {
		/**rok*/
		rok?: number|null;
		/**lic*/
		lic?: string|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**mesic*/
		mesic?: number|null;
		/**ac*/
		ac?: string|null;
		/**radek_z*/
		radek_z?: number|null;
		/**err_code*/
		err_code?: number|null;
		/**txt_err*/
		popischyby?: string|null;
		/**txt_err*/
		txt_err?: string|null;
		/**nks*/
		nks?: string|null;
		/**ixp*/
		ixp?: string|null;
		/**drd*/
		drd?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**den*/
		den?: number|null;
		/**c0*/
		c0?: JsonDecimal|null;
		/**c1*/
		c1?: JsonDecimal|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**stav_kch*/
		stav_kch?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**te0*/
		te0?: string|null;
		/**te1*/
		te1?: string|null;
		/**te2*/
		te2?: string|null;
		/**te3*/
		te3?: string|null;
		/**te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**uea*/
		uea?: string|null;
		/**ueb*/
		ueb?: string|null;
		/**uec*/
		uec?: string|null;
		/**ued*/
		ued?: string|null;
		/**uee*/
		uee?: string|null;
		/**uef*/
		uef?: string|null;
		/**ueg*/
		ueg?: string|null;
		/**ueh*/
		ueh?: string|null;
		/**uei*/
		uei?: string|null;
		/**uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
	}
	const enum GInuChybyUzaverkyDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", err_code = "err_code", popischyby = "popischyby", txt_err = "txt_err", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen",}
	const enum GInuChybyUzaverkyDtoFragments { rok = "main", lic = "main", ico = "main", ucs = "main", mesic = "main", ac = "main", radek_z = "main", err_code = "main", popischyby = "main", txt_err = "main", nks = "main", ixp = "main", drd = "main", aktivita = "main", den = "main", c0 = "main", c1 = "main", typ_ag = "main", stav_kch = "main", dat_zmena = "main", zmenu_prov = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", uek = "main", uel = "main", uem = "main", uen = "main",}
	const enum GInuChybyUzaverkyDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", err_code = "number", popischyby = "string", txt_err = "string", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string",}
	const enum GInuChybyUzaverkyDtoTypeLengths { lic = 9, ico = 21, ucs = 21, ac = 41, popischyby = 509, txt_err = 509, nks = 25, ixp = 25, zmenu_prov = 25, te0 = 33, te1 = 33, te2 = 33, te3 = 13, te4 = 25, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 7, ueb = 9, uec = 25, ued = 25, uee = 25, uef = 7, ueg = 33, ueh = 9, uei = 9, uej = 25, uek = 6, uel = 10, uem = 10, uen = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuKnihyDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro*/
	interface GInuKnihyDto {
		/**DTO seznam knih pro uzaverku*/
		typ_ag?: number|null;
		/**ixp_den*/
		ixp_den?: string|null;
		stav_txt?: string|null;
		/**rok*/
		rok?: number|null;
		/**nazev*/
		nazev?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**ucs*/
		ucs?: string|null;
		nks?: string|null;
		/**uus*/
		uus?: string|null;
		/**ico*/
		ico?: string|null;
		/**lic*/
		lic?: string|null;
		/**aktivita_txt*/
		aktivita_txt?: string|null;
		/**ixs_vpk_txt*/
		ixs_vpk_txt?: string|null;
	}
	const enum GInuKnihyDtoNames { typ_ag = "typ_ag", ixp_den = "ixp_den", stav_txt = "stav_txt", rok = "rok", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", ucs = "ucs", nks = "nks", uus = "uus", ico = "ico", lic = "lic", aktivita_txt = "aktivita_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GInuKnihyDtoFragments { typ_ag = "main", ixp_den = "main", stav_txt = "main", rok = "main", nazev = "main", poznamka = "main", aktivita = "main", ucs = "main", nks = "main", uus = "main", ico = "main", lic = "main", aktivita_txt = "aktivita_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GInuKnihyDtoTypes { typ_ag = "number", ixp_den = "string", stav_txt = "string", rok = "number", nazev = "string", poznamka = "string", aktivita = "number", ucs = "string", nks = "string", uus = "string", ico = "string", lic = "string", aktivita_txt = "string", ixs_vpk_txt = "string",}
	const enum GInuKnihyDtoTypeLengths { ixp_den = 12, nazev = 50, poznamka = 50, ucs = 10, uus = 10, ico = 10, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuRokDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro seznam roku*/
	interface GInuRokDto {
		/**rok*/
		rok?: number|null;
	}
	const enum GInuRokDtoNames { rok = "rok",}
	const enum GInuRokDtoFragments { rok = "main",}
	const enum GInuRokDtoTypes { rok = "number",}
	const enum GInuRokDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuUcsLicDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro seznam agendy*/
	interface GInuAgendytDto {
		/**rok*/
		typ_ag?: number|null;
		aktivita?: number|null;
		/**rok*/
		typ_ag_txt?: string|null;
	}
	const enum GInuAgendytDtoNames { typ_ag = "typ_ag", aktivita = "aktivita", typ_ag_txt = "typ_ag_txt",}
	const enum GInuAgendytDtoFragments { typ_ag = "main", aktivita = "main", typ_ag_txt = "main",}
	const enum GInuAgendytDtoTypes { typ_ag = "number", aktivita = "number", typ_ag_txt = "string",}
	const enum GInuAgendytDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuUzaverkyKnihyResponseDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO  seznam knih uzaverky- responce*/
	interface GInuUzaverkyKnihyResponseDto {
		/**Povoleni starrtu uzaverky*/
		Seznam?: Gordic.Inu.Interface.GInuKnihyDto[]|null;
		/**Pocet zrusenych knih*/
		PocetZrusena?: number|null;
		/**Pocet uzavrenych knih*/
		PocetUzavrena?: number|null;
		/**Pocet uzavrenych neodlitych knih*/
		PocetUzavrenaNeodlita?: number|null;
		/**Pocet otevrenych knih*/
		PocetOtevrena?: number|null;
		/**Pocet pripravenych knih*/
		PocetPripravena?: number|null;
	}
	const enum GInuUzaverkyKnihyResponseDtoNames { Seznam = "Seznam", PocetZrusena = "PocetZrusena", PocetUzavrena = "PocetUzavrena", PocetUzavrenaNeodlita = "PocetUzavrenaNeodlita", PocetOtevrena = "PocetOtevrena", PocetPripravena = "PocetPripravena",}
	const enum GInuUzaverkyKnihyResponseDtoFragments { Seznam = "*", PocetZrusena = "*", PocetUzavrena = "*", PocetUzavrenaNeodlita = "*", PocetOtevrena = "*", PocetPripravena = "*",}
	const enum GInuUzaverkyKnihyResponseDtoTypes { Seznam = "Gordic.Inu.Interface.GInuKnihyDto[]", PocetZrusena = "number", PocetUzavrena = "number", PocetUzavrenaNeodlita = "number", PocetOtevrena = "number", PocetPripravena = "number",}
	const enum GInuUzaverkyKnihyResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuUzaverkyPovoleniResponseDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO  povoleni akci uzaverky - responce*/
	interface GInuUzaverkyPovoleniResponseDto {
		/**Povoleni starrtu uzaverky*/
		ZacatekUzaverky: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni anulace starrtu uzaverky*/
		ZacatekUzaverkyAnulace: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni zaverecnych ucetnich zapisu*/
		ZaverecneUcetniZapisy: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni anylace zaverecnych ucetnich zapisu*/
		ZaverecneUcetniZapisyAnulace: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavreni ucetnich chyb*/
		UzavreniUcetnichKnih: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni anulace uzavreni ucetnich chyb*/
		UzavreniUcetnichKnihAnulace: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni otevreni ucetnich knih*/
		OtevreniUcetnichKnih: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni anulace otevreni ucetnich knih*/
		OtevreniUcetnichKnihAnulace: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni uzavreni rozpoctu*/
		UzavreniRozpoctu: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni anulace uzavreni rozpoctu*/
		UzavreniRozpoctuAnulace: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni otevreni ennv*/
		OtevreniENNV: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni anulace otevreni ennv*/
		OtevreniENNVAnulace: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni presun uzavrenych dat*/
		PresunUzavrenychDat: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni presun uzavrenych dat*/
		PresunUzavrenychDatAnulace: Gordic.General.ApplicationInterface.GPermission;
		/**Povoleni archivace agendovych knih*/
		ArchivaceAgendovychKnih: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GInuUzaverkyPovoleniResponseDtoNames { ZacatekUzaverky = "ZacatekUzaverky", ZacatekUzaverkyAnulace = "ZacatekUzaverkyAnulace", ZaverecneUcetniZapisy = "ZaverecneUcetniZapisy", ZaverecneUcetniZapisyAnulace = "ZaverecneUcetniZapisyAnulace", UzavreniUcetnichKnih = "UzavreniUcetnichKnih", UzavreniUcetnichKnihAnulace = "UzavreniUcetnichKnihAnulace", OtevreniUcetnichKnih = "OtevreniUcetnichKnih", OtevreniUcetnichKnihAnulace = "OtevreniUcetnichKnihAnulace", UzavreniRozpoctu = "UzavreniRozpoctu", UzavreniRozpoctuAnulace = "UzavreniRozpoctuAnulace", OtevreniENNV = "OtevreniENNV", OtevreniENNVAnulace = "OtevreniENNVAnulace", PresunUzavrenychDat = "PresunUzavrenychDat", PresunUzavrenychDatAnulace = "PresunUzavrenychDatAnulace", ArchivaceAgendovychKnih = "ArchivaceAgendovychKnih",}
	const enum GInuUzaverkyPovoleniResponseDtoFragments { ZacatekUzaverky = "*", ZacatekUzaverkyAnulace = "*", ZaverecneUcetniZapisy = "*", ZaverecneUcetniZapisyAnulace = "*", UzavreniUcetnichKnih = "*", UzavreniUcetnichKnihAnulace = "*", OtevreniUcetnichKnih = "*", OtevreniUcetnichKnihAnulace = "*", UzavreniRozpoctu = "*", UzavreniRozpoctuAnulace = "*", OtevreniENNV = "*", OtevreniENNVAnulace = "*", PresunUzavrenychDat = "*", PresunUzavrenychDatAnulace = "*", ArchivaceAgendovychKnih = "*",}
	const enum GInuUzaverkyPovoleniResponseDtoTypes { ZacatekUzaverky = "Gordic.General.ApplicationInterface.GPermission", ZacatekUzaverkyAnulace = "Gordic.General.ApplicationInterface.GPermission", ZaverecneUcetniZapisy = "Gordic.General.ApplicationInterface.GPermission", ZaverecneUcetniZapisyAnulace = "Gordic.General.ApplicationInterface.GPermission", UzavreniUcetnichKnih = "Gordic.General.ApplicationInterface.GPermission", UzavreniUcetnichKnihAnulace = "Gordic.General.ApplicationInterface.GPermission", OtevreniUcetnichKnih = "Gordic.General.ApplicationInterface.GPermission", OtevreniUcetnichKnihAnulace = "Gordic.General.ApplicationInterface.GPermission", UzavreniRozpoctu = "Gordic.General.ApplicationInterface.GPermission", UzavreniRozpoctuAnulace = "Gordic.General.ApplicationInterface.GPermission", OtevreniENNV = "Gordic.General.ApplicationInterface.GPermission", OtevreniENNVAnulace = "Gordic.General.ApplicationInterface.GPermission", PresunUzavrenychDat = "Gordic.General.ApplicationInterface.GPermission", PresunUzavrenychDatAnulace = "Gordic.General.ApplicationInterface.GPermission", ArchivaceAgendovychKnih = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GInuUzaverkyPovoleniResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuUzaverkyRokuDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO  seznam knih uzaverky- responce*/
	interface GInuUzaverkyRokuDto {
		/**agenda*/
		agenda?: Gordic.Inu.Interface.GEInuAgenda|null;
		/**krok*/
		krok?: Gordic.Inu.Interface.GEOperaceRocniUzaverky|null;
		/**operace*/
		operace?: Gordic.Inu.Interface.GEOperaceNaZapisech|null;
	}
	const enum GInuUzaverkyRokuDtoNames { agenda = "agenda", krok = "krok", operace = "operace",}
	const enum GInuUzaverkyRokuDtoFragments { agenda = "*", krok = "*", operace = "*",}
	const enum GInuUzaverkyRokuDtoTypes { agenda = "Gordic.Inu.Interface.GEInuAgenda", krok = "Gordic.Inu.Interface.GEOperaceRocniUzaverky", operace = "Gordic.Inu.Interface.GEOperaceNaZapisech",}
	const enum GInuUzaverkyRokuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuUzaverkyZaverecneZapisyNastaveniDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO zacatak ucetni uzaverky - nastaveni uzavreni*/
	interface GInuUzaverkyZaverecneZapisyNastaveniDto {
		/**Předchozí závěrečné zápisy nebyly proúčtovány, přepsat ?*/
		OtazkaPrepsatZapisy?: boolean|null;
		/**Vygenerovan report*/
		VygenerovabReport?: boolean|null;
	}
	const enum GInuUzaverkyZaverecneZapisyNastaveniDtoNames { OtazkaPrepsatZapisy = "OtazkaPrepsatZapisy", VygenerovabReport = "VygenerovabReport",}
	const enum GInuUzaverkyZaverecneZapisyNastaveniDtoFragments { OtazkaPrepsatZapisy = "*", VygenerovabReport = "*",}
	const enum GInuUzaverkyZaverecneZapisyNastaveniDtoTypes { OtazkaPrepsatZapisy = "boolean", VygenerovabReport = "boolean",}
	const enum GInuUzaverkyZaverecneZapisyNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuUzaverkyZaverecneZapisyRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO zacatek uzaverky mesicniho období  - vstup (pozadavek)*/
	interface GInuUzaverkyZaverecneZapisyRequestDto extends Gordic.Inu.Interface.GInuBaseRequestDto {
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyNastaveniDto|null;
	}
	const enum GInuUzaverkyZaverecneZapisyRequestDtoNames { Nastaveni = "Nastaveni", agenda = "agenda", ucs = "ucs", lic = "lic", mesic = "mesic", IdMessage = "IdMessage",}
	const enum GInuUzaverkyZaverecneZapisyRequestDtoFragments { Nastaveni = "*", agenda = "*", ucs = "*", lic = "*", mesic = "*", IdMessage = "*",}
	const enum GInuUzaverkyZaverecneZapisyRequestDtoTypes { Nastaveni = "Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyNastaveniDto", agenda = "Gordic.Inu.Interface.GEInuAgenda", ucs = "string", lic = "string", mesic = "number", IdMessage = "string",}
	const enum GInuUzaverkyZaverecneZapisyRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuVybraneKnihyDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO pro vybrane knihy*/
	interface GInuVybraneKnihyDto extends Gordic.Inu.Interface.GInuKnihyDto {
		/**Vybrany radek*/
		wiz_check?: boolean|null;
		/**Text chyby*/
		wiz_txt_err?: string|null;
		/**Vysledek akce*/
		wiz_kind?: number|null;
	}
	const enum GInuVybraneKnihyDtoNames { wiz_check = "wiz_check", wiz_txt_err = "wiz_txt_err", wiz_kind = "wiz_kind", typ_ag = "typ_ag", ixp_den = "ixp_den", stav_txt = "stav_txt", rok = "rok", nazev = "nazev", poznamka = "poznamka", aktivita = "aktivita", ucs = "ucs", nks = "nks", uus = "uus", ico = "ico", lic = "lic", aktivita_txt = "aktivita_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GInuVybraneKnihyDtoFragments { wiz_check = "*", wiz_txt_err = "*", wiz_kind = "*", typ_ag = "main", ixp_den = "main", stav_txt = "main", rok = "main", nazev = "main", poznamka = "main", aktivita = "main", ucs = "main", nks = "main", uus = "main", ico = "main", lic = "main", aktivita_txt = "aktivita_txt", ixs_vpk_txt = "ixs_vpk_txt",}
	const enum GInuVybraneKnihyDtoTypes { wiz_check = "boolean", wiz_txt_err = "string", wiz_kind = "number", typ_ag = "number", ixp_den = "string", stav_txt = "string", rok = "number", nazev = "string", poznamka = "string", aktivita = "number", ucs = "string", nks = "string", uus = "string", ico = "string", lic = "string", aktivita_txt = "string", ixs_vpk_txt = "string",}
	const enum GInuVybraneKnihyDtoTypeLengths { ixp_den = 12, nazev = 50, poznamka = 50, ucs = 10, uus = 10, ico = 10, lic = 4,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuZacatekUzaverkyNastaveniDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO zacatak ucetni uzaverky - nastaveni uzavreni*/
	interface GInuZacatekUzaverkyNastaveniDto {
		/**Otazka Ještě nebyla provedena uzávěrka období {0}, opravdu zahájit uzávěrku období {1} ?*/
		OtazkaNebylaUzaverkaPredchazejicihoObdobi?: boolean|null;
		/**Otazka Opravdu zahájit uzávěrku období {0}?*/
		OtazkaOpravduUzavrit?: boolean|null;
	}
	const enum GInuZacatekUzaverkyNastaveniDtoNames { OtazkaNebylaUzaverkaPredchazejicihoObdobi = "OtazkaNebylaUzaverkaPredchazejicihoObdobi", OtazkaOpravduUzavrit = "OtazkaOpravduUzavrit",}
	const enum GInuZacatekUzaverkyNastaveniDtoFragments { OtazkaNebylaUzaverkaPredchazejicihoObdobi = "*", OtazkaOpravduUzavrit = "*",}
	const enum GInuZacatekUzaverkyNastaveniDtoTypes { OtazkaNebylaUzaverkaPredchazejicihoObdobi = "boolean", OtazkaOpravduUzavrit = "boolean",}
	const enum GInuZacatekUzaverkyNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzaverkaUcetni\GInuZacatekUzaverkyRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO anulace zacatku uzaverky mesicniho období  - vstup (pozadavek)*/
	interface GInuZacatekUzaverkyRequestDto extends Gordic.Inu.Interface.GInuBaseRequestDto {
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Inu.Interface.GInuZacatekUzaverkyNastaveniDto|null;
	}
	const enum GInuZacatekUzaverkyRequestDtoNames { Nastaveni = "Nastaveni", agenda = "agenda", ucs = "ucs", lic = "lic", mesic = "mesic", IdMessage = "IdMessage",}
	const enum GInuZacatekUzaverkyRequestDtoFragments { Nastaveni = "*", agenda = "*", ucs = "*", lic = "*", mesic = "*", IdMessage = "*",}
	const enum GInuZacatekUzaverkyRequestDtoTypes { Nastaveni = "Gordic.Inu.Interface.GInuZacatekUzaverkyNastaveniDto", agenda = "Gordic.Inu.Interface.GEInuAgenda", ucs = "string", lic = "string", mesic = "number", IdMessage = "string",}
	const enum GInuZacatekUzaverkyRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzavreniMesice\GInuGroupOpenCloseRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO hromadne uzavreni/otevreni obdobi  - vstup (pozadavek)*/
	interface GInuGroupOpenCloseRequestDto extends Gordic.Inu.Interface.GInuBaseRequestDto {
		/**Druh operace*/
		Operace?: Gordic.Inu.Interface.GEOperaceSObdobim|null;
		/**Seznam s obdobimi*/
		Seznam?: Gordic.Inu.Interface.GInuObdobiVyabraneDto[]|null;
		/**Typ Agendy*/
		TypAg?: Gordic.Inu.Interface.GEInuAgenda|null;
		/**id reportu*/
		ReportID?: string|null;
	}
	const enum GInuGroupOpenCloseRequestDtoNames { Operace = "Operace", Seznam = "Seznam", TypAg = "TypAg", ReportID = "ReportID", agenda = "agenda", ucs = "ucs", lic = "lic", mesic = "mesic", IdMessage = "IdMessage",}
	const enum GInuGroupOpenCloseRequestDtoFragments { Operace = "*", Seznam = "*", TypAg = "*", ReportID = "*", agenda = "*", ucs = "*", lic = "*", mesic = "*", IdMessage = "*",}
	const enum GInuGroupOpenCloseRequestDtoTypes { Operace = "Gordic.Inu.Interface.GEOperaceSObdobim", Seznam = "Gordic.Inu.Interface.GInuObdobiVyabraneDto[]", TypAg = "Gordic.Inu.Interface.GEInuAgenda", ReportID = "string", agenda = "Gordic.Inu.Interface.GEInuAgenda", ucs = "string", lic = "string", mesic = "number", IdMessage = "string",}
	const enum GInuGroupOpenCloseRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzavreniMesice\GInuOpenCloseRequestDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO uzavreni obdobi  - vstup (pozadavek)*/
	interface GInuOpenCloseRequestDto extends Gordic.Inu.Interface.GInuBaseRequestDto {
		/**id reportu*/
		ReportID?: string|null;
		/**Atribut spusteni v hramadne operaci (zmena vyjimek)*/
		GroupOperation?: boolean|null;
		/**Nastaveni evidence (kroky prubehu...)*/
		Nastaveni?: Gordic.Inu.Interface.GInuUzavreniMesiceNastaveniDto|null;
	}
	const enum GInuOpenCloseRequestDtoNames { ReportID = "ReportID", GroupOperation = "GroupOperation", Nastaveni = "Nastaveni", agenda = "agenda", ucs = "ucs", lic = "lic", mesic = "mesic", IdMessage = "IdMessage",}
	const enum GInuOpenCloseRequestDtoFragments { ReportID = "*", GroupOperation = "*", Nastaveni = "*", agenda = "*", ucs = "*", lic = "*", mesic = "*", IdMessage = "*",}
	const enum GInuOpenCloseRequestDtoTypes { ReportID = "string", GroupOperation = "boolean", Nastaveni = "Gordic.Inu.Interface.GInuUzavreniMesiceNastaveniDto", agenda = "Gordic.Inu.Interface.GEInuAgenda", ucs = "string", lic = "string", mesic = "number", IdMessage = "string",}
	const enum GInuOpenCloseRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Dto\UzavreniMesice\GInuUzavreniMesiceNastaveniDto.d.ts 

declare namespace Gordic.Inu.Interface {
	/**DTO uzavreni mesice - nastaveni uzavreni*/
	interface GInuUzavreniMesiceNastaveniDto {
		/**Otazka na chyby pri uzavreni mesice*/
		OtazkaKontrolaProvedena?: boolean|null;
		/**Atribut vegenerovane sestavy*/
		VygenerovanaSestava?: boolean|null;
	}
	const enum GInuUzavreniMesiceNastaveniDtoNames { OtazkaKontrolaProvedena = "OtazkaKontrolaProvedena", VygenerovanaSestava = "VygenerovanaSestava",}
	const enum GInuUzavreniMesiceNastaveniDtoFragments { OtazkaKontrolaProvedena = "*", VygenerovanaSestava = "*",}
	const enum GInuUzavreniMesiceNastaveniDtoTypes { OtazkaKontrolaProvedena = "boolean", VygenerovanaSestava = "boolean",}
	const enum GInuUzavreniMesiceNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEAktivitaObdobi.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Aktivita obdobi*/
	const enum GEAktivitaObdobi {
		/**Otevrene*/
		Otevrene=100,
		/**Uzavrene*/
		Uzavrene=500,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEInuAgenda.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Typ agendy*/
	const enum GEInuAgenda {
		/**ROZ*/
		ROZ=50,
		/**UCT*/
		UCT=40,
		/**UCR*/
		UCR=150,
		/**PRE*/
		PRE=230,
		/**PPH*/
		PPH=320,
		/**POZ*/
		POZ=860,
		/**POU*/
		POU=180,
		/**POK*/
		POK=90,
		/**KOF*/
		KOF=80,
		KDF=70,
		/**FUc*/
		FUC=330,
		/**BUC*/
		BUC=100,
		/**SML*/
		SML=110,
		/**MAJ*/
		MAJ=260,
		/**MAT*/
		MAT=60,
		/**EVZ*/
		EVZ=510,
		/**DDP*/
		DDP=350,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEOperaceNaZapisech.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Operace na pripravenych zapisech*/
	const enum GEOperaceNaZapisech {
		/**Testovani zapisu*/
		Testovani=1,
		/**Prouctovani zapisu*/
		Prouctovani=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEOperaceRocniUzaverky.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Typy operaci rocni uzaverky*/
	const enum GEOperaceRocniUzaverky {
		/**Zacatek rocni uzaverky*/
		ZacatekUzaverky,
		/**Zaverecne zapisy rocni uzaverky*/
		ZaverecneZapisy,
		/**Anulace Zacatek rocni uzaverky*/
		ZacatekUzaverkyAnulace,
		/**Test zavewrecncyh zapisu pred zauctovanim*/
		TestZaverZapisu,
		/**Prouctovani zaverecnych zapisu*/
		ProuctovaniZaverZapisu,
		/**Anulace prouctovani zaverecnych zapisu*/
		ProuctovaniZaverZapisuAnulace,
		/**Zapisu uzavreni knih*/
		ZapisyUzavreniKnih,
		/**Test zapisu uzavreni knih*/
		TestZapisuUzavreniKnih,
		/**Prouctovani zapisu uzavreni knih*/
		ProuctovaniZapisuUzavreniKnih,
		/**Anulace Uzavreni knih*/
		ZapisyUzavreniKnihAnulace,
		/**Zapisy otevreni knih*/
		ZapisyOtevreniKnih,
		/**Test zapisu otevreni knih*/
		TestZapisuOtevreniKnih,
		/**Prouctovani zapisu otevreni knih*/
		ProuctovaniZapisuOtevreniKnih,
		/**Anulovani prouctovani zapisu otevreni knih*/
		ProuctovaniZapisuOtevreniKnihAnulovani,
		/**Zapisy uzavreni ROZu*/
		ZapisyUzavreniRozu,
		/**Testovani zapisu uzavreni ROZu*/
		TestZapisyUzavreniRozu,
		/**Prouctovani zapisu uzavreni ROZu*/
		ProuctovaniZapisyUzavreniRozu,
		/**Anulace prouctovanych zapisu uzavreni ROZu*/
		ProuctovaniZapisyUzavreniRozuAnulace,
		/**Zapisy otevreni ENNV*/
		ZapisyOtevreniENNV,
		/**Zapisy otevreni ENNV - anulace*/
		ZapisyOtevreniENNVAnulace,
		/**Test zapisu otevreni ENNV*/
		TestZapisyOtevreniENNV,
		/**Prouctovani zapisu otevreni ENNV*/
		ProuctovaniZapisuOtevreniENNV,
		/**anulace prouctovani zapisu otevreni ENNV*/
		ProuctovaniZapisuOtevreniENNVAnulace,
		/**Presun dat do archivnich tabulek (xx)*/
		PresunDat,
		/**Anulovani presunu dat. Z archivnihc tabulek se presunou do aktualnich*/
		PresunDatAnulace,
		/**Archivace agendovych knih*/
		ArchivaceAgendovychKnih,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEOperaceSObdobim.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Typu operaci se stavy*/
	const enum GEOperaceSObdobim {
		/**Otevreni obdobi*/
		OtevreniObdobi=10,
		/**Uzavreni obdobi*/
		UzavreniObdobi=20,
		/**Zpetne otevit uzavreni obdobi*/
		ZpetneOtevritUzavreniObdobi=30,
		/**Prirazeni / odrazeni blokacniho okruhu*/
		BlokacniOkruhy,
		/**Aktualizace obdobi*/
		AktualizaceObdobi,
		/**Aktualizace stavu*/
		AktualizaceStavu,
		/**Preadt uzaverku obdobi ke schvaleni*/
		PredatKeSchvaleni=40,
		ZrusitPredatKeSchvaleni,
		SchvalitUzaverku,
		MPDImportVse,
		MPDExportVse,
		MPDImportLic,
		MPDExportLic,
		DetailObdobi,
		StavKontroly,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GERezimDPH.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Rezim zpracovani priznani DPH*/
	const enum GERezimDPH {
		/**rezim ico*/
		ICO=0,
		/**rezim uctarna*/
		UCS=1,
		/**rezim ucetni stredisko*/
		UUS=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GERezimProvozu.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Rezim provozu Inu*/
	const enum RezimProvozuEnum {
		/**režim provozu = Základní - vidím vše - default*/
		Zaklad=0,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEStavPriznaniDPH.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Stav priznani DPH*/
	const enum GEStavPriznaniDPH {
		/**Otevrene*/
		Otevrene=0,
		/**Zpetne otevrene*/
		ZpetneOtevrene=10,
		/**Uzavrene*/
		Uzavrene=20,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEStavUzaverky.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Stav uzaverky*/
	const enum GEStavUzaverky {
		/**Chyba*/
		ChybaUzaverky=-1,
		/**Obdobi otevreno - uzaverka nezacala*/
		Otevreno0=0,
		/**Obdobi otevreno - uzaverka nezacala*/
		Otevreno=100,
		/**Pripraveno k uzaverce*/
		PripravenoKUZaverce=300,
		/**Provedeny zaverecne zapisy*/
		ProvedenyZaverecneZapisy=310,
		/**Provedeny zapisy uzavreni (uzavreno a jeste neni otevreno)*/
		ProvedenyZapisyUzavreni=320,
		/**Prevedeny zapisy otevreni = uzavreno, nearchivovano*/
		ProvedenyZapisyOtevreni=330,
		/**Uzavreno, odlito*/
		UzavrenoArchivovano=500,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GETypBlokaceDleStavuKontrolyDPH.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Typ blokace tovrby DPh pokud nedopadne kontrola*/
	const enum GETypBlokaceDleStavuKontrolyDPH {
		/**Blokovany akce*/
		AkceBlokovany=0,
		/**Neblokovany zadne akce*/
		AkceNeblokovany=1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GETypPriznaniDPH.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Typ priznani DPH*/
	const enum GETypPriznaniDPH {
		/**Jeste nebylo podano*/
		Zadne=0,
		/**radne*/
		Radne=10,
		/**Opravne*/
		Opravne=20,
		/**Dodatecne*/
		Dodatecne=30,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GETypySeznamuRocniUzaverky.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Typy seznamu rocni uzaverky*/
	const enum GETypySeznamuRocniUzaverky {
		/**Seznam pro zaverecne zapisy - UCT*/
		ZaverecneUcetniZapisy,
		/**Seznam pro uzavreni ucetnich knih - UCT*/
		UzavreniUcetnichKnih,
		/**Seznam pro otevreni ucetnich knih - UCT*/
		OtevreniUcetnichKnih,
		/**Seznam pro uzavreni rozpoctu - ROZ*/
		UzavreniRozpoctu,
		/**Otevreni ennv - ROZ*/
		OtevreniENNV,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Enums\GEUrovenKontrolyMesice.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Uroven kontroly dat mesicnich uzaverek*/
	const enum GEUrovenKontrolyMesice {
		/**Bez kontroly*/
		BezKontroly=0,
		/**Úrověň kontroly UCS*/
		UCS=10,
		/**Úrověň kontroly UUS*/
		UUS=20,
		/**Úrověň kontroly NKS*/
		NKS=30,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Init\GInuGlobalsBase.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Globální parametry pro Inu. Načtené při startu aplikace*/
	interface GInuGlobalsBase {
		/**Globalni_Parametry*/
		Globalni_Parametry: Gordic.Inu.Interface.GInuGlobalParams;
		/**Rezim provozu*/
		RezimProvozu?: Gordic.Inu.Interface.RezimProvozuEnum|null;
		/**maska čísla plánu ve sloupci TE1*/
		cis_real?: string|null;
		/**maska čísla plánu ve sloupci TE1*/
		te1_msk?: string|null;
		/**příznak, že maska TE1_MSK odpovídá plné délce TE1 - číslo plánu = TE1*/
		b_te1_msk_full?: boolean|null;
		/**start masky čísla plánu v TE1*/
		te1_msk_start?: number|null;
		/**konec masky čísla plánu v TE1*/
		te1_msk_stop?: number|null;
		/**rok sběru*/
		rok_srv?: number|null;
	}
	const enum GInuGlobalsBaseNames { Globalni_Parametry = "Globalni_Parametry", RezimProvozu = "RezimProvozu", cis_real = "cis_real", te1_msk = "te1_msk", b_te1_msk_full = "b_te1_msk_full", te1_msk_start = "te1_msk_start", te1_msk_stop = "te1_msk_stop", rok_srv = "rok_srv",}
	const enum GInuGlobalsBaseFragments { Globalni_Parametry = "*", RezimProvozu = "*", cis_real = "*", te1_msk = "*", b_te1_msk_full = "*", te1_msk_start = "*", te1_msk_stop = "*", rok_srv = "*",}
	const enum GInuGlobalsBaseTypes { Globalni_Parametry = "Gordic.Inu.Interface.GInuGlobalParams", RezimProvozu = "Gordic.Inu.Interface.RezimProvozuEnum", cis_real = "string", te1_msk = "string", b_te1_msk_full = "boolean", te1_msk_start = "number", te1_msk_stop = "number", rok_srv = "number",}
	const enum GInuGlobalsBaseTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuBlokacniOkruhy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s obdobimi*/
	interface InuBlokacniOkruhy {
		/**Nacteni seznamu obdobi*/
		list(rq?:CallParams<{ucs:string,mesic:number}>): _Task<{ucs:string,mesic:number},GServiceListResponse<Gordic.Inu.Interface.GUctsblkDto>>;
		/**spusteni blokace*/
		blokovat(rq?:CallParams<{seznamBlokaci:Gordic.Inu.Interface.GUctsblkDto[],mesic:number,ucs:string}>): _Task<{seznamBlokaci:Gordic.Inu.Interface.GUctsblkDto[],mesic:number,ucs:string},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuBlokacniOkruhy: ServiceBase & Catalog.InuBlokacniOkruhy;
	}
	const InuBlokacniOkruhy: Client["InuBlokacniOkruhy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuiUzaverkaUcetnihoObdobi.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro rocni uzaverku*/
	interface InuiUzaverkaUcetnihoObdobi {
		/**Spusteni rocni uzaverky*/
		zacatekRocniUzaverky(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuZacatekUzaverkyRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuZacatekUzaverkyRequestDto},void>;
		/**Zacatek rocni uzaverky*/
		zruseniRocniUzaverky(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuAnulaceZacatekUzaverkyRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuAnulaceZacatekUzaverkyRequestDto},void>;
		/**Zaverecne zapisy rocni uzaverky*/
		listZaverecneZapisy(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Inu.Interface.GUctdxuaDto>>;
		/**Zaverecne zapisy rocni uzaverky*/
		seznamZapisu(rq?:CallParams<{akce:Gordic.Inu.Interface.GETypySeznamuRocniUzaverky}>): _Task<{akce:Gordic.Inu.Interface.GETypySeznamuRocniUzaverky},GServiceListResponse<Gordic.Inu.Interface.GUctdxuaDto>>;
		/**Zaverecne zapisy rocni uzaverky*/
		zaverecneZapisy(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto},number>;
		/**Test pripravenych zapisu k zauctovani*/
		testPripravenychZapisuUCT(rq?:CallParams<{}>): _Task<{},void>;
		/**Prouctovani zaverecnych zapisu*/
		prouctovaniZaverZapisu(rq?:CallParams<{}>): _Task<{},void>;
		/**Anulace prouctovanych zaverecnych zapisu*/
		prouctovaniZaverZapisuAnulace(rq?:CallParams<{}>): _Task<{},void>;
		/**Zapisy knihrocni uzaverky*/
		zapisyUzavKnih(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto},number>;
		/**Test pripravenych zapisu knih k zauctovani*/
		testZapisyUzavreniKnih(rq?:CallParams<{}>): _Task<{},void>;
		/**Prouctovani zapisu uzavreni knih*/
		prouctovaniZapisyUzavreniKnih(rq?:CallParams<{}>): _Task<{},void>;
		/**Anulace zauctovani uzavereni knih*/
		zapisyUzavreniKnihAnulace(rq?:CallParams<{}>): _Task<{},void>;
		/**Tvorba zapisu uzavreni knih*/
		zapisyOtevreniKnih(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto},number>;
		/**Test zapisu otevreni knih*/
		testZapisyOtevreniKnih(rq?:CallParams<{}>): _Task<{},void>;
		/**Prouctovani zapisu otevreni knih*/
		prouctovaniZapisyOtevreniKnih(rq?:CallParams<{}>): _Task<{},void>;
		/**Anulace prouctovani otevreni knih*/
		prouctovaniZapisyOtevreniKnihAnulace(rq?:CallParams<{}>): _Task<{},void>;
		/**Tvorba zapisu uzavreni rozu*/
		zapisyUzavreniROZu(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto},number>;
		/**Prouctovani zapisu uzavreni ROZu*/
		prouctovaniZapisyUzavreniROZu(rq?:CallParams<{}>): _Task<{},void>;
		/**Test zapisu uzavreni ROZu*/
		testZapisyUzavreniROZu(rq?:CallParams<{}>): _Task<{},void>;
		/**Anulace zauctovani zapisu uzavrenu rozu*/
		prouctovaniZapisyUzavreniROZuAnulace(rq?:CallParams<{}>): _Task<{},void>;
		/**Tvorba zapisu oteverni ENNV*/
		zapisyOtevreniENNV(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuUzaverkyZaverecneZapisyRequestDto},number>;
		/**Test zapisu uzavreni ROZu*/
		testZapisyOtevreniENNV(rq?:CallParams<{}>): _Task<{},void>;
		/**Anulace zauctovani uzavereni knih*/
		zapisyOtevreniENNVAnulace(rq?:CallParams<{}>): _Task<{},void>;
		/**Prouctovani zapisu otevreni ENNv*/
		prouctovaniZapisyOtevreniENNV(rq?:CallParams<{}>): _Task<{},void>;
		/**Anulace zauctovani zapisu orevreni rozu*/
		prouctovaniZapisyOtevreniENNVAnulace(rq?:CallParams<{}>): _Task<{},void>;
		/**Presun dat do archivu*/
		presunDatDoArchivu(rq?:CallParams<{}>): _Task<{},void>;
		/**seznam chyb*/
		listErrors(rq?:CallParams<{agenda:Gordic.Inu.Interface.GEInuAgenda}>): _Task<{agenda:Gordic.Inu.Interface.GEInuAgenda},GServiceListResponse<Gordic.Inu.Interface.GInuChybyUzaverkyDto>>;
		/**Povoleni akci uzaverky*/
		povoleniAkci(rq?:CallParams<{}>): _Task<{},Gordic.Inu.Interface.GInuUzaverkyPovoleniResponseDto>;
		/**Seznam pouzitych obdobi*/
		listPouziteObdobi(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Inu.Interface.GInuRokDto>>;
		/**Anulace zauctovani uzavereni knih*/
		listRegistorvanychIC(rq?:CallParams<{rok:number}>): _Task<{rok:number},string[]>;
		/**Sezam ucetnich stredisek*/
		listUCS(rq?:CallParams<{rok:number,ico:string}>): _Task<{rok:number,ico:string},GServiceListResponse<Gordic.Inu.Interface.GInuUcsLicDto>>;
		/**Sezam agend*/
		listAgend(rq?:CallParams<{rok:number,ico:string,lic:string,ucs:string}>): _Task<{rok:number,ico:string,lic:string,ucs:string},GServiceListResponse<Gordic.Inu.Interface.GInuAgendytDto>>;
		/**Sezam agend pro uzaverku*/
		listAgendyProUzaverku(rq?:CallParams<{rok:number,ico:string,lic:string,ucs:string}>): _Task<{rok:number,ico:string,lic:string,ucs:string},GServiceListResponse<Gordic.Inu.Interface.GInuAgendytProUzavreniDto>>;
		/**Sezam knih pro danou agnedu*/
		listKnihy(rq?:CallParams<{typAg:number,rok:number,ico:string,ucs:string}>): _Task<{typAg:number,rok:number,ico:string,ucs:string},Gordic.Inu.Interface.GInuUzaverkyKnihyResponseDto>;
		/**Odliti knihy*/
		odlitiKnihy(rq?:CallParams<{typAg:number,rok:number,lic:string,ico:string,ucs:string,nks:string,ixpDen:string}>): _Task<{typAg:number,rok:number,lic:string,ico:string,ucs:string,nks:string,ixpDen:string},void>;
		/**Sezam knih pro danou agendu*/
		listKnihyProUzavreni(rq?:CallParams<{typAg:number,rok:number,ico:string,ucs:string}>): _Task<{typAg:number,rok:number,ico:string,ucs:string},GServiceListResponse<Gordic.Inu.Interface.GInuVybraneKnihyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuiUzaverkaUcetnihoObdobi: ServiceBase & Catalog.InuiUzaverkaUcetnihoObdobi;
	}
	const InuiUzaverkaUcetnihoObdobi: Client["InuiUzaverkaUcetnihoObdobi"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuKontrolniHlaseni.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro kontrolni hlaseni*/
	interface InuKontrolniHlaseni {
		/**Seznam kontrolnich hlaseni*/
		list(rq?:CallParams<{mesic:number}>): _Task<{mesic:number},GServiceListResponse<Gordic.Inu.Interface.GHlaseniDPHDto>>;
		/**Nacteni kontrolniho hlaseni*/
		read(rq?:CallParams<{porCislo:number,mesic:number,skutdatPriznani:JsonDate}>): _Task<{porCislo:number,mesic:number,skutdatPriznani:JsonDate},GServiceReadResponse<Gordic.Inu.Interface.GEkohkhlDto>>;
		/**Ulozeni kontrolniho hlaseni*/
		upsert(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuPodatHlaseniRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuPodatHlaseniRequestDto},void>;
		/**Prepocet stavu KH DPH*/
		prepocetStavuKHDPH(rq?:CallParams<{mesic:number}>): _Task<{mesic:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuKontrolniHlaseni: ServiceBase & Catalog.InuKontrolniHlaseni;
	}
	const InuKontrolniHlaseni: Client["InuKontrolniHlaseni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuObdobiDPH.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s obdobim*/
	interface InuObdobiDPH {
		/**Seznam obdobi DPH*/
		list(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Inu.Interface.GSeznamObdobiDPHDto>>;
		/**Detail zdan obdobi*/
		read(rq?:CallParams<{rok:number,mesic:number}>): _Task<{rok:number,mesic:number},GServiceReadResponse<Gordic.Inu.Interface.GEkosazoDto>>;
		/**Ulozeni detailu zdanovaciho obdobi DPH*/
		upsert(rq?:Gordic.Inu.Interface.GEkosazoDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GEkosazoDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GEkosazoDto>,void>;
		/**Prepocet stavu DPH*/
		prepocetStavuDPH(rq?:CallParams<{ico:string,rok:number,mesic:number}>): _Task<{ico:string,rok:number,mesic:number},void>;
		/**Stav priznani DPH*/
		kontrolaVlivuZmenNaHlaseniDPH(rq?:CallParams<{}>): _Task<{},Gordic.Inu.Interface.GKontrolaHlaseniDPHDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuObdobiDPH: ServiceBase & Catalog.InuObdobiDPH;
	}
	const InuObdobiDPH: Client["InuObdobiDPH"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuObdobiUCtRoz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro praci s obdobim*/
	interface InuObdobi {
		/**Nacteni seznamu obdobi*/
		list(rq?:CallParams<{TypAg:Gordic.Inu.Interface.GEInuAgenda,ucs:string,rok:number,obdobiOd:number,obdobiDo:number,obdobiOtevrene:boolean,obdobiUzavrene:boolean}>): _Task<{TypAg:Gordic.Inu.Interface.GEInuAgenda,ucs:string,rok:number,obdobiOd:number,obdobiDo:number,obdobiOtevrene:boolean,obdobiUzavrene:boolean},GServiceListResponse<Gordic.Inu.Interface.GUctRozMesObdobiDto>>;
		/**Upraveny seznam pro karticky*/
		seznam(rq?:CallParams<{typAg:Gordic.Inu.Interface.GEInuAgenda,ucs:string,obdobiOd:number,obdobiDo:number,obdobiOtevrene:boolean,obdobiUzavrene:boolean}>): _Task<{typAg:Gordic.Inu.Interface.GEInuAgenda,ucs:string,obdobiOd:number,obdobiDo:number,obdobiOtevrene:boolean,obdobiUzavrene:boolean},GServiceListResponse<Gordic.Inu.Interface.GInuObdobiDto>>;
		/**Otevreni obdobi*/
		open(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuOpenCloseRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuOpenCloseRequestDto},Gordic.Inu.Interface.GInuObdobiDto>;
		/**Uzavreni obdobi*/
		close(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuOpenCloseRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuOpenCloseRequestDto},Gordic.Inu.Interface.GInuObdobiVyabraneDto>;
		/**Zpetne otevreni obdobi*/
		unClose(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuOpenCloseRequestDto}>): _Task<{rq:Gordic.Inu.Interface.GInuOpenCloseRequestDto},Gordic.Inu.Interface.GInuObdobiDto>;
		/**Aktualizovat obdobi*/
		aktualizovat(rq?:CallParams<{agenda:Gordic.Inu.Interface.GEInuAgenda,ucs:string,lokalita:string}>): _Task<{agenda:Gordic.Inu.Interface.GEInuAgenda,ucs:string,lokalita:string},void>;
		/**Obdobi k otevreni*/
		getObdodobiKOtevreni(rq?:CallParams<{agenda:Gordic.Inu.Interface.GEInuAgenda,lokalita:string,ucs:string}>): _Task<{agenda:Gordic.Inu.Interface.GEInuAgenda,lokalita:string,ucs:string},number>;
		/**Upraveny seznam pro karticky*/
		seznamObdobiProAkce(rq?:CallParams<{typAg:Gordic.Inu.Interface.GEInuAgenda,obdobi:number,akce:Gordic.Inu.Interface.GEOperaceSObdobim}>): _Task<{typAg:Gordic.Inu.Interface.GEInuAgenda,obdobi:number,akce:Gordic.Inu.Interface.GEOperaceSObdobim},GServiceListResponse<Gordic.Inu.Interface.GInuObdobiVyabraneDto>>;
		/**Pouzite obdobi v roce*/
		pouziteObdobi(rq?:CallParams<{}>): _Task<{},number[]>;
		/**Povoleni operace*/
		isAllowedAction(rq?:CallParams<{typAg:Gordic.Inu.Interface.GEInuAgenda,operace:Gordic.Inu.Interface.GEOperaceSObdobim}>): _Task<{typAg:Gordic.Inu.Interface.GEInuAgenda,operace:Gordic.Inu.Interface.GEOperaceSObdobim},Gordic.General.ApplicationInterface.GPermission>;
		/**Predat ke schvaleni*/
		predatKeSchvaleni(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuSchvalitDto}>): _Task<{rq:Gordic.Inu.Interface.GInuSchvalitDto},Gordic.Inu.Interface.GInuObdobiDto>;
		/**SchvalitPredat ke schvaleni*/
		schvalit(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuSchvalitDto}>): _Task<{rq:Gordic.Inu.Interface.GInuSchvalitDto},Gordic.Inu.Interface.GInuObdobiDto>;
		/**Odschvalit*/
		odSchvalit(rq?:CallParams<{rq:Gordic.Inu.Interface.GInuSchvalitDto}>): _Task<{rq:Gordic.Inu.Interface.GInuSchvalitDto},Gordic.Inu.Interface.GInuObdobiDto>;
		/**seznam obdobi s vysledky kontrol*/
		listKontrolaObdobi(rq?:CallParams<{mesic:number,ucs:string,rucniKontrola:boolean}>): _Task<{mesic:number,ucs:string,rucniKontrola:boolean},GServiceListResponse<Gordic.Inu.Interface.GInuKontrolaObdobiDto>>;
		/**Ulozeni vysledku kontrol*/
		ulozeniStavuRucniKontroly(rq?:CallParams<{seznamRucnichKontrol:Gordic.Inu.Interface.GInuKontrolaObdobiDto[],lokalita:string,mesic:number}>): _Task<{seznamRucnichKontrol:Gordic.Inu.Interface.GInuKontrolaObdobiDto[],lokalita:string,mesic:number},void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuObdobi: ServiceBase & Catalog.InuObdobi;
	}
	const InuObdobi: Client["InuObdobi"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuPriznaniDPH – kopie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro obdobi KH DPH*/
	interface InuObdobiKHDPH {
		/**Seznam obdobi DPH*/
		list(rq?:CallParams<{mesic:number}>): _Task<{mesic:number},GServiceListResponse<Gordic.Inu.Interface.GSeznamObdobiKHDPHDto>>;
		/**Detail obdobi KH*/
		read(rq?:CallParams<{mesic:number}>): _Task<{mesic:number},GServiceReadResponse<Gordic.Inu.Interface.GEkoskhlDto>>;
		/**Ulozeni detailu zdanovaciho obdobi DPH*/
		upsert(rq?:Gordic.Inu.Interface.GEkoskhlDto|CallParams<GServiceSaveRequest<Gordic.Inu.Interface.GEkoskhlDto>>): _Task<GServiceSaveRequest<Gordic.Inu.Interface.GEkoskhlDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuObdobiKHDPH: ServiceBase & Catalog.InuObdobiKHDPH;
	}
	const InuObdobiKHDPH: Client["InuObdobiKHDPH"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuPriznaniDPH.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhrani pro priznani DPH*/
	interface InuPriznaniDPH {
		/**Seznam obdobi DPH*/
		list(rq?:CallParams<{mesic:number}>): _Task<{mesic:number},GServiceListResponse<Gordic.Inu.Interface.GSeznamPriznaniDPHDto>>;
		/**Nacteni danoveho priznani*/
		read(rq?:CallParams<{porCislo:number,mesic:number,datSkutPriznani:JsonDate,uus:string,typPriznani:Gordic.Inu.Interface.GETypPriznaniDPH}>): _Task<{porCislo:number,mesic:number,datSkutPriznani:JsonDate,uus:string,typPriznani:Gordic.Inu.Interface.GETypPriznaniDPH},GServiceReadResponse<Gordic.Inu.Interface.GInuPriznaniDPHActionResponseDto>>;
		/**Kontrola na neprouctovane doklady*/
		kontrolaNeprouctovanychDokladu(rq?:CallParams<{mesic:number}>): _Task<{mesic:number},Gordic.Inu.Interface.GKontrolaNeprouctovanychResponseDto>;
		/**Ulozeni priznani k DPH*/
		priznat(rq?:CallParams<{porCislo:number,typPriznani:Gordic.Inu.Interface.GETypPriznaniDPH,datSkutPriznani:JsonDate,datumZjisteni:JsonDate,rokPriznani:number,mesicPriznani:number}>): _Task<{porCislo:number,typPriznani:Gordic.Inu.Interface.GETypPriznaniDPH,datSkutPriznani:JsonDate,datumZjisteni:JsonDate,rokPriznani:number,mesicPriznani:number},void>;
		/**Seznam moznych uctaren*/
		listUUS(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Eko.Interface.GekosuusDto>>;
		/**Stav priznani DPH*/
		stavPriznaniDPH(rq?:CallParams<{mesicPriznani:number}>): _Task<{mesicPriznani:number},Gordic.Inu.Interface.GEStavPriznaniDPH>;
		/**Povoleni priznat*/
		povoleniPriznani(rq?:CallParams<{mesicPriznani:number}>): _Task<{mesicPriznani:number},Gordic.General.ApplicationInterface.GPermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		InuPriznaniDPH: ServiceBase & Catalog.InuPriznaniDPH;
	}
	const InuPriznaniDPH: Client["InuPriznaniDPH"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\ISL\IGInuWflsesx.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**I(Isl)GWflsesx - Přílohy obecného subjektu.
	* @domain DavkaPriloha
	* @businessObject DavkaPriloha
	*/
	interface DavkaPriloha {
		/**Vrátí seznam historie písemnosti dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		read(rq?:Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		upsert(rq?:Gordic.Wfl.Interface.GAttachmentUploadDto|CallParams<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>>): _Task<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>,GServiceSaveResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		remove(rq?:Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		/**DownloadAll*/
		downloadAll(rq?:Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GDownloadAllAttachmentsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkaPriloha: ServiceBase & Catalog.DavkaPriloha;
	}
	const DavkaPriloha: Client["DavkaPriloha"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Inu.Interface\Objekty\GInuGlobalParams.d.ts 

declare namespace Gordic.Inu.Interface {
	/**Objekt pro převod databazovych parametrů do vlastností třídy*/
	interface GInuGlobalParams {
		/**Debug mode*/
		DebugMode?: boolean|null;
		/**Max. počet otevřených období ROZ*/
		readonly MaxPocetOtevrenychObdobiRoz?: number|null;
		/**Max. počet otevřených období UCT*/
		readonly MaxPocetOtevrenychObdobiUct?: number|null;
		/**INU - ŘP Uzávěrka období ROZ - Znovuotevření měsíce*/
		readonly PovoleniZnovuOtevreniMesiceROZ?: boolean|null;
		/**INU - ŘP Uzávěrka období UCT - Znovuotevření měsíce*/
		readonly PovoleniZnovuOtevreniMesiceUCT?: boolean|null;
		/**ŘP Uzávěrka období ROZ - Otevření nového měsíce*/
		readonly PovoleniOtevreniMesiceROZ?: boolean|null;
		/**INU - ŘP Uzávěrka období UCT - Otevření nového měsíce*/
		readonly PovoleniOtevreniMesiceUCT?: boolean|null;
		/**INU - ŘP Uzávěrka období ROZ - Aktualizace období*/
		readonly PovoleniAktualizaceObdobiROZ?: boolean|null;
		/**INU - ŘP Uzávěrka období UCT - Aktualizace období*/
		readonly PovoleniAktualizaceObdobiUCT?: boolean|null;
		/**INU - ŘP Uzávěrka období ROZ - Kontrolní chod při uzavření měsíce*/
		readonly PovoleniKontrolnihoChoduPriUzaverkyMesiceROZ?: boolean|null;
		/**INU - ŘP Uzávěrka období UCT - Kontrolní chod při uzavření měsíce*/
		readonly PovoleniKontrolnihoChoduPriUzaverkyMesiceUCT?: boolean|null;
		/**INU - ŘP Uzávěrka období ROZ - Schválení uzávěrky*/
		readonly PovoleniSchvaleniUzaverkyObdobiROZ?: boolean|null;
		/**INU - ŘP Uzávěrka období UCT - Schválení uzávěrky*/
		readonly PovoleniSchvaleniUzaverkyObdobiUCT?: boolean|null;
		/**INU - ŘP Uzávěrka období - Povolení schvalovaciho procesu*/
		readonly PovoleniSchvalovacihoProcesu?: boolean|null;
		/**INU - ŘP Uzávěrka období ROZ - Uzavření měsíce*/
		readonly PovoleniUzavreniMesiceROZ?: boolean|null;
		/**INU - ŘP Uzávěrka období UCT - Uzavření měsíce*/
		readonly PovoleniUzavreniMesiceUCT?: boolean|null;
		/**INU - Úrověň kontroly dat měsíčních uzávěrek*/
		readonly UrovenKontrolyMesicnichUzaverek?: Gordic.Inu.Interface.GEUrovenKontrolyMesice|null;
		/**INU - ŘP Povolení nastavení stavu období dle vazby na funkci*/
		readonly PovoleniNastaveniObdobiDleVazbyNaFunkci?: boolean|null;
		/**INU - ŘP Povolení nastavení stavu období dle vazby na funkci*/
		readonly PovoleniBlokacnichOkruhu?: boolean|null;
		/**INU - ŘP Replikace - Export - Aktuální licence*/
		readonly PovoleniRepExpAktLicence?: boolean|null;
		/**INU - ŘP Replikace - Export - Všechny licence*/
		readonly PovoleniRepExpVsechLicenci?: boolean|null;
		/**INU - ŘP Replikace - Import - Aktuální licence*/
		readonly PovoleniRepImpAktLicence?: boolean|null;
		/**INU - ŘP Replikace - Import - Všechny licence*/
		readonly PovoleniRepImpVsechLicenci?: boolean|null;
		/**INU - ŘP Replikace - povolení funkcianality replikací*/
		readonly PovoleniFunkcionalityReplikaci?: boolean|null;
		/**INU - ŘP Přepočet stavů - Povolení provedení*/
		readonly PovoleniPrepoctuStavu?: boolean|null;
		/**INU - ŘP Aktualizace stavů - povolení provedení*/
		readonly PovoleniAktualizaceStavu?: boolean|null;
		/**INU - ŘP Kontrola stavů - Povolení provedení*/
		readonly PovoleniKontrolyStavu?: boolean|null;
		/**INU - ŘP Nastavování režimu aktualizace stavů*/
		readonly PovoleniKonfiguraceAktualizaceStavu?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost provedení zahájeni*/
		readonly PovoleniZahajeniUzaverky?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost provedení záv.záp*/
		readonly PovoleniZaverZapisu?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost archivace agendových knih*/
		readonly PovoleniArchivaceAgendovychKnih?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost uzavření knih roz*/
		readonly PovoleniUzavreniKnihRoz?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost otevření ENNV*/
		readonly PovoleniOtevreniENNV?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost anulování uzavření knih rozpočtu*/
		readonly PovoleniAnulovaniUzavreni?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost anulování otevření ENNV*/
		readonly PovoleniAnulovaniOtevreniiENNV?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost uzavření účet. kn*/
		readonly PovoleniUzavreniKnihUct?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost anulování uzavření účet. knih*/
		readonly PovoleniAnulovaniUzavreniKnihUct?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost anulování otevření knih*/
		readonly PovoleniAnulovaniOtevrenychKnih?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost anulování záv.zápisů*/
		readonly PovoleniAnulovatZaverecneZapisy?: boolean|null;
		/**INU - ŘP Uzávěrka roku - Možnost otevření knih*/
		readonly PovoleniOtevreniKnih?: boolean|null;
		/**INU - Uzávěrka roku - samostatná uzávěrka rozpočtu*/
		readonly PovoleniRocniUzaverkyROZu?: boolean|null;
		/**Je povolena kumulace nks v uzaverkach*/
		readonly PovolenaKumulaceNKSVUzav?: number|null;
		/**Je povolena kumulace nks v uzaverkach*/
		readonly VrcholStromuKCH?: string|null;
		/**Parametr, zda otevirat knihy davkou*/
		readonly OtevreniKnihDavkou?: boolean|null;
		/**Kontrola příslušnosti NKS k UCS*/
		readonly KontrolaPrislusnostiNKSkUCS?: boolean|null;
		/**pouziti uus z davky*/
		readonly ParamDavkaPouzitUUS?: boolean|null;
		/**INU - ŘP Povolení tisku*/
		readonly PovoleniTisku?: boolean|null;
		/**INU - ŘP Limity bankovních účtů - povolení editace*/
		readonly PovoleniBankovnichLimitu?: boolean|null;
		/**Parametr pro povoleni priznani DPH*/
		readonly DPHEditace?: boolean|null;
		/**INU - ŘP Období DPH - editace (Možnost aktivních operací s obdobími DPH )*/
		readonly PovoleniEditaceObdobiDPH?: boolean|null;
		/**INU - ŘP Provádění přepočtu stavů DPH*/
		readonly PovoleniProvadeniPrepoctuStavuDPH?: boolean|null;
		/**Možnost provádět přiznání DPH*/
		readonly PovoleniProvadetPriznaniDPH?: boolean|null;
		/**Rezim zpracovani priznani DPH*/
		readonly RezimZpracovaniDPH?: Gordic.Inu.Interface.GERezimDPH|null;
		/**INU - ŘP DPH - Editace zálohového koeficientu*/
		readonly PovoleniEditaceZalohovehoKoeficientuDPH?: boolean|null;
		/**INU - ŘP Režim evidence dávek zápisů (dokumentový/NEDOKUMENTOVÝ)*/
		readonly RezimEvidenceDavekDokumentovy?: boolean|null;
		/**INU - ŘP DPH - Editace vypořádávacího koeficientu*/
		readonly PovoleniEditaceVyporadacihoKoeficientuDPH?: boolean|null;
		/**inu_rad_dphblkk	INU - ŘP Blokace provedení přiznání DPH dle stavu kontroly*/
		readonly BlokaceAkciDleKontrolDPH?: Gordic.Inu.Interface.GETypBlokaceDleStavuKontrolyDPH|null;
		/**inu_rad_expdata	INU - ŘP Export dat - provedení exportu*/
		readonly PovoleniExportDat?: boolean|null;
		/**inu_rad_impdata	INU - ŘP Import dat - provedení importu*/
		readonly PovoleniImportDat?: boolean|null;
		/**inu_rad_expauto	INU - ŘP Export dat - provedení exportu pro sumarizaci*/
		readonly PovoleniExportDatSumarizace?: boolean|null;
		/**inu_rad_dvkrozp	INU - ŘP Import dat - Kontrola překročení limitu rozpočtu*/
		readonly PovoleniImportKontrolaRozpocet?: boolean|null;
		/**Načtení parametru pro povoleni prevedeni rozpoctove davky na jednostranny rozpocet*/
		readonly PovoleniPrevoduNaJednostrannyRozpocet?: boolean|null;
		/**Načtení parametru pro kumulaci dat v dávce na IČO*/
		readonly KumulaceDatVDavceNaIco?: boolean|null;
		/**Načtení parametru typ_instalace. Default je ACR*/
		readonly TypInstalace?: Gordic.Inu.Interface.GETypInstalace|null;
	}
	const enum GInuGlobalParamsNames { DebugMode = "DebugMode", MaxPocetOtevrenychObdobiRoz = "MaxPocetOtevrenychObdobiRoz", MaxPocetOtevrenychObdobiUct = "MaxPocetOtevrenychObdobiUct", PovoleniZnovuOtevreniMesiceROZ = "PovoleniZnovuOtevreniMesiceROZ", PovoleniZnovuOtevreniMesiceUCT = "PovoleniZnovuOtevreniMesiceUCT", PovoleniOtevreniMesiceROZ = "PovoleniOtevreniMesiceROZ", PovoleniOtevreniMesiceUCT = "PovoleniOtevreniMesiceUCT", PovoleniAktualizaceObdobiROZ = "PovoleniAktualizaceObdobiROZ", PovoleniAktualizaceObdobiUCT = "PovoleniAktualizaceObdobiUCT", PovoleniKontrolnihoChoduPriUzaverkyMesiceROZ = "PovoleniKontrolnihoChoduPriUzaverkyMesiceROZ", PovoleniKontrolnihoChoduPriUzaverkyMesiceUCT = "PovoleniKontrolnihoChoduPriUzaverkyMesiceUCT", PovoleniSchvaleniUzaverkyObdobiROZ = "PovoleniSchvaleniUzaverkyObdobiROZ", PovoleniSchvaleniUzaverkyObdobiUCT = "PovoleniSchvaleniUzaverkyObdobiUCT", PovoleniSchvalovacihoProcesu = "PovoleniSchvalovacihoProcesu", PovoleniUzavreniMesiceROZ = "PovoleniUzavreniMesiceROZ", PovoleniUzavreniMesiceUCT = "PovoleniUzavreniMesiceUCT", UrovenKontrolyMesicnichUzaverek = "UrovenKontrolyMesicnichUzaverek", PovoleniNastaveniObdobiDleVazbyNaFunkci = "PovoleniNastaveniObdobiDleVazbyNaFunkci", PovoleniBlokacnichOkruhu = "PovoleniBlokacnichOkruhu", PovoleniRepExpAktLicence = "PovoleniRepExpAktLicence", PovoleniRepExpVsechLicenci = "PovoleniRepExpVsechLicenci", PovoleniRepImpAktLicence = "PovoleniRepImpAktLicence", PovoleniRepImpVsechLicenci = "PovoleniRepImpVsechLicenci", PovoleniFunkcionalityReplikaci = "PovoleniFunkcionalityReplikaci", PovoleniPrepoctuStavu = "PovoleniPrepoctuStavu", PovoleniAktualizaceStavu = "PovoleniAktualizaceStavu", PovoleniKontrolyStavu = "PovoleniKontrolyStavu", PovoleniKonfiguraceAktualizaceStavu = "PovoleniKonfiguraceAktualizaceStavu", PovoleniZahajeniUzaverky = "PovoleniZahajeniUzaverky", PovoleniZaverZapisu = "PovoleniZaverZapisu", PovoleniArchivaceAgendovychKnih = "PovoleniArchivaceAgendovychKnih", PovoleniUzavreniKnihRoz = "PovoleniUzavreniKnihRoz", PovoleniOtevreniENNV = "PovoleniOtevreniENNV", PovoleniAnulovaniUzavreni = "PovoleniAnulovaniUzavreni", PovoleniAnulovaniOtevreniiENNV = "PovoleniAnulovaniOtevreniiENNV", PovoleniUzavreniKnihUct = "PovoleniUzavreniKnihUct", PovoleniAnulovaniUzavreniKnihUct = "PovoleniAnulovaniUzavreniKnihUct", PovoleniAnulovaniOtevrenychKnih = "PovoleniAnulovaniOtevrenychKnih", PovoleniAnulovatZaverecneZapisy = "PovoleniAnulovatZaverecneZapisy", PovoleniOtevreniKnih = "PovoleniOtevreniKnih", PovoleniRocniUzaverkyROZu = "PovoleniRocniUzaverkyROZu", PovolenaKumulaceNKSVUzav = "PovolenaKumulaceNKSVUzav", VrcholStromuKCH = "VrcholStromuKCH", OtevreniKnihDavkou = "OtevreniKnihDavkou", KontrolaPrislusnostiNKSkUCS = "KontrolaPrislusnostiNKSkUCS", ParamDavkaPouzitUUS = "ParamDavkaPouzitUUS", PovoleniTisku = "PovoleniTisku", PovoleniBankovnichLimitu = "PovoleniBankovnichLimitu", DPHEditace = "DPHEditace", PovoleniEditaceObdobiDPH = "PovoleniEditaceObdobiDPH", PovoleniProvadeniPrepoctuStavuDPH = "PovoleniProvadeniPrepoctuStavuDPH", PovoleniProvadetPriznaniDPH = "PovoleniProvadetPriznaniDPH", RezimZpracovaniDPH = "RezimZpracovaniDPH", PovoleniEditaceZalohovehoKoeficientuDPH = "PovoleniEditaceZalohovehoKoeficientuDPH", RezimEvidenceDavekDokumentovy = "RezimEvidenceDavekDokumentovy", PovoleniEditaceVyporadacihoKoeficientuDPH = "PovoleniEditaceVyporadacihoKoeficientuDPH", BlokaceAkciDleKontrolDPH = "BlokaceAkciDleKontrolDPH", PovoleniExportDat = "PovoleniExportDat", PovoleniImportDat = "PovoleniImportDat", PovoleniExportDatSumarizace = "PovoleniExportDatSumarizace", PovoleniImportKontrolaRozpocet = "PovoleniImportKontrolaRozpocet", PovoleniPrevoduNaJednostrannyRozpocet = "PovoleniPrevoduNaJednostrannyRozpocet", KumulaceDatVDavceNaIco = "KumulaceDatVDavceNaIco", TypInstalace = "TypInstalace",}
	const enum GInuGlobalParamsFragments { DebugMode = "*", MaxPocetOtevrenychObdobiRoz = "*", MaxPocetOtevrenychObdobiUct = "*", PovoleniZnovuOtevreniMesiceROZ = "*", PovoleniZnovuOtevreniMesiceUCT = "*", PovoleniOtevreniMesiceROZ = "*", PovoleniOtevreniMesiceUCT = "*", PovoleniAktualizaceObdobiROZ = "*", PovoleniAktualizaceObdobiUCT = "*", PovoleniKontrolnihoChoduPriUzaverkyMesiceROZ = "*", PovoleniKontrolnihoChoduPriUzaverkyMesiceUCT = "*", PovoleniSchvaleniUzaverkyObdobiROZ = "*", PovoleniSchvaleniUzaverkyObdobiUCT = "*", PovoleniSchvalovacihoProcesu = "*", PovoleniUzavreniMesiceROZ = "*", PovoleniUzavreniMesiceUCT = "*", UrovenKontrolyMesicnichUzaverek = "*", PovoleniNastaveniObdobiDleVazbyNaFunkci = "*", PovoleniBlokacnichOkruhu = "*", PovoleniRepExpAktLicence = "*", PovoleniRepExpVsechLicenci = "*", PovoleniRepImpAktLicence = "*", PovoleniRepImpVsechLicenci = "*", PovoleniFunkcionalityReplikaci = "*", PovoleniPrepoctuStavu = "*", PovoleniAktualizaceStavu = "*", PovoleniKontrolyStavu = "*", PovoleniKonfiguraceAktualizaceStavu = "*", PovoleniZahajeniUzaverky = "*", PovoleniZaverZapisu = "*", PovoleniArchivaceAgendovychKnih = "*", PovoleniUzavreniKnihRoz = "*", PovoleniOtevreniENNV = "*", PovoleniAnulovaniUzavreni = "*", PovoleniAnulovaniOtevreniiENNV = "*", PovoleniUzavreniKnihUct = "*", PovoleniAnulovaniUzavreniKnihUct = "*", PovoleniAnulovaniOtevrenychKnih = "*", PovoleniAnulovatZaverecneZapisy = "*", PovoleniOtevreniKnih = "*", PovoleniRocniUzaverkyROZu = "*", PovolenaKumulaceNKSVUzav = "*", VrcholStromuKCH = "*", OtevreniKnihDavkou = "*", KontrolaPrislusnostiNKSkUCS = "*", ParamDavkaPouzitUUS = "*", PovoleniTisku = "*", PovoleniBankovnichLimitu = "*", DPHEditace = "*", PovoleniEditaceObdobiDPH = "*", PovoleniProvadeniPrepoctuStavuDPH = "*", PovoleniProvadetPriznaniDPH = "*", RezimZpracovaniDPH = "*", PovoleniEditaceZalohovehoKoeficientuDPH = "*", RezimEvidenceDavekDokumentovy = "*", PovoleniEditaceVyporadacihoKoeficientuDPH = "*", BlokaceAkciDleKontrolDPH = "*", PovoleniExportDat = "*", PovoleniImportDat = "*", PovoleniExportDatSumarizace = "*", PovoleniImportKontrolaRozpocet = "*", PovoleniPrevoduNaJednostrannyRozpocet = "*", KumulaceDatVDavceNaIco = "*", TypInstalace = "*",}
	const enum GInuGlobalParamsTypes { DebugMode = "boolean", MaxPocetOtevrenychObdobiRoz = "number", MaxPocetOtevrenychObdobiUct = "number", PovoleniZnovuOtevreniMesiceROZ = "boolean", PovoleniZnovuOtevreniMesiceUCT = "boolean", PovoleniOtevreniMesiceROZ = "boolean", PovoleniOtevreniMesiceUCT = "boolean", PovoleniAktualizaceObdobiROZ = "boolean", PovoleniAktualizaceObdobiUCT = "boolean", PovoleniKontrolnihoChoduPriUzaverkyMesiceROZ = "boolean", PovoleniKontrolnihoChoduPriUzaverkyMesiceUCT = "boolean", PovoleniSchvaleniUzaverkyObdobiROZ = "boolean", PovoleniSchvaleniUzaverkyObdobiUCT = "boolean", PovoleniSchvalovacihoProcesu = "boolean", PovoleniUzavreniMesiceROZ = "boolean", PovoleniUzavreniMesiceUCT = "boolean", UrovenKontrolyMesicnichUzaverek = "Gordic.Inu.Interface.GEUrovenKontrolyMesice", PovoleniNastaveniObdobiDleVazbyNaFunkci = "boolean", PovoleniBlokacnichOkruhu = "boolean", PovoleniRepExpAktLicence = "boolean", PovoleniRepExpVsechLicenci = "boolean", PovoleniRepImpAktLicence = "boolean", PovoleniRepImpVsechLicenci = "boolean", PovoleniFunkcionalityReplikaci = "boolean", PovoleniPrepoctuStavu = "boolean", PovoleniAktualizaceStavu = "boolean", PovoleniKontrolyStavu = "boolean", PovoleniKonfiguraceAktualizaceStavu = "boolean", PovoleniZahajeniUzaverky = "boolean", PovoleniZaverZapisu = "boolean", PovoleniArchivaceAgendovychKnih = "boolean", PovoleniUzavreniKnihRoz = "boolean", PovoleniOtevreniENNV = "boolean", PovoleniAnulovaniUzavreni = "boolean", PovoleniAnulovaniOtevreniiENNV = "boolean", PovoleniUzavreniKnihUct = "boolean", PovoleniAnulovaniUzavreniKnihUct = "boolean", PovoleniAnulovaniOtevrenychKnih = "boolean", PovoleniAnulovatZaverecneZapisy = "boolean", PovoleniOtevreniKnih = "boolean", PovoleniRocniUzaverkyROZu = "boolean", PovolenaKumulaceNKSVUzav = "number", VrcholStromuKCH = "string", OtevreniKnihDavkou = "boolean", KontrolaPrislusnostiNKSkUCS = "boolean", ParamDavkaPouzitUUS = "boolean", PovoleniTisku = "boolean", PovoleniBankovnichLimitu = "boolean", DPHEditace = "boolean", PovoleniEditaceObdobiDPH = "boolean", PovoleniProvadeniPrepoctuStavuDPH = "boolean", PovoleniProvadetPriznaniDPH = "boolean", RezimZpracovaniDPH = "Gordic.Inu.Interface.GERezimDPH", PovoleniEditaceZalohovehoKoeficientuDPH = "boolean", RezimEvidenceDavekDokumentovy = "boolean", PovoleniEditaceVyporadacihoKoeficientuDPH = "boolean", BlokaceAkciDleKontrolDPH = "Gordic.Inu.Interface.GETypBlokaceDleStavuKontrolyDPH", PovoleniExportDat = "boolean", PovoleniImportDat = "boolean", PovoleniExportDatSumarizace = "boolean", PovoleniImportKontrolaRozpocet = "boolean", PovoleniPrevoduNaJednostrannyRozpocet = "boolean", KumulaceDatVDavceNaIco = "boolean", TypInstalace = "Gordic.Inu.Interface.GETypInstalace",}
	const enum GInuGlobalParamsTypeLengths {}
	/**Vycet typu instalace*/
	const enum GETypInstalace {
		ACR=10,
		CIVIL=20,
		BIS=30,
		PRAC=40,
	}
}

//#endregion

