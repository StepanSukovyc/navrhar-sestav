/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ron.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ron.Interface\Gordic.Ron.Interface.csproj
*    created     2026-02-16 14:37:09
*    files       Dto\Faze\GFazeDto.d.ts
*                Dto\Masky\GMaskaDetailDto.d.ts
*                Dto\Masky\GMaskaDto.d.ts
*                Dto\Prava\GPravaDto.d.ts
*                Dto\Rozpisy\GRozpisDto.d.ts
*                Services\IGMaskService.d.ts
*                Services\IGPravaService.d.ts
*                Services\IGRozpisService.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Dto\Faze\GFazeDto.d.ts 

declare namespace Gordic.Ron.Interface {
	/**DTO pro faze.*/
	interface GFazeDto {
		faz?: number|null;
		faz_txt?: string|null;
		rok_od?: number|null;
		rok_do?: number|null;
		k_v?: number|null;
		aktivita?: number|null;
		dat_zmena?: JsonDate|null;
		zmenu_prov?: string|null;
		zmenu_prov_rf?: string|null;
	}
	const enum GFazeDtoNames { faz = "faz", faz_txt = "faz_txt", rok_od = "rok_od", rok_do = "rok_do", k_v = "k_v", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_rf = "zmenu_prov_rf",}
	const enum GFazeDtoFragments { faz = "*", faz_txt = "*", rok_od = "*", rok_do = "*", k_v = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_rf = "*",}
	const enum GFazeDtoTypes { faz = "number", faz_txt = "string", rok_od = "number", rok_do = "number", k_v = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_rf = "string",}
	const enum GFazeDtoTypeLengths { faz_txt = 254, zmenu_prov = 12, zmenu_prov_rf = 200,}
	/**Enum pro filtrování nad GFazeDto.*/
	const enum GFazeFilterEnum {
		faz,
		faz_txt,
		rok_od,
		rok_do,
		k_v,
		aktivita,
		dat_zmena,
		zmenu_prov,
		zmenu_prov_rf,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Dto\Masky\GMaskaDetailDto.d.ts 

declare namespace Gordic.Ron.Interface {
	interface GMaskaDetailDto extends Gordic.Eko.Interface.GCfuFilterDto {
		au?: GIntervalDto<string>|null;
		odpa?: GIntervalDto<string>|null;
		pol?: GIntervalDto<string>|null;
		zj?: GIntervalDto<string>|null;
		uz?: GIntervalDto<string>|null;
		orj?: GIntervalDto<string>|null;
		org?: GIntervalDto<string>|null;
		radek?: number|null;
		popis?: string|null;
		datumZmeny?: GIntervalDto<JsonDate>|null;
		md?: GIntervalDto<JsonDecimal>|null;
		dal?: GIntervalDto<JsonDecimal>|null;
		rokDPH?: GIntervalDto<string>|null;
		meDPH?: GIntervalDto<string>|null;
		zd?: GIntervalDto<string>|null;
		agenda?: string|null;
		puvod?: string|null;
		den?: GIntervalDto<number>|null;
		mesic?: GIntervalDto<number>|null;
		doklad?: GIntervalDto<string>|null;
		ucs?: GIntervalDto<string>|null;
		uus?: GIntervalDto<string>|null;
		ns?: GIntervalDto<string>|null;
		ixs_msk?: string|null;
		kniha?: string|null;
		stav?: string|null;
		rozpis?: string|null;
		faze?: number|null;
		h?: string|null;
		pid?: string|null;
	}
	const enum GMaskaDetailDtoNames { au = "au", odpa = "odpa", pol = "pol", zj = "zj", uz = "uz", orj = "orj", org = "org", radek = "radek", popis = "popis", datumZmeny = "datumZmeny", md = "md", dal = "dal", rokDPH = "rokDPH", meDPH = "meDPH", zd = "zd", agenda = "agenda", puvod = "puvod", den = "den", mesic = "mesic", doklad = "doklad", ucs = "ucs", uus = "uus", ns = "ns", ixs_msk = "ixs_msk", kniha = "kniha", stav = "stav", rozpis = "rozpis", faze = "faze", h = "h", pid = "pid", cfu = "cfu",}
	const enum GMaskaDetailDtoFragments { au = "*", odpa = "*", pol = "*", zj = "*", uz = "*", orj = "*", org = "*", radek = "*", popis = "*", datumZmeny = "*", md = "*", dal = "*", rokDPH = "*", meDPH = "*", zd = "*", agenda = "*", puvod = "*", den = "*", mesic = "*", doklad = "*", ucs = "*", uus = "*", ns = "*", ixs_msk = "*", kniha = "*", stav = "*", rozpis = "*", faze = "*", h = "*", pid = "*", cfu = "*",}
	const enum GMaskaDetailDtoTypes { au = "GIntervalDto<string>", odpa = "GIntervalDto<string>", pol = "GIntervalDto<string>", zj = "GIntervalDto<string>", uz = "GIntervalDto<string>", orj = "GIntervalDto<string>", org = "GIntervalDto<string>", radek = "number", popis = "string", datumZmeny = "GIntervalDto<JsonDate>", md = "GIntervalDto<JsonDecimal>", dal = "GIntervalDto<JsonDecimal>", rokDPH = "GIntervalDto<string>", meDPH = "GIntervalDto<string>", zd = "GIntervalDto<string>", agenda = "string", puvod = "string", den = "GIntervalDto<number>", mesic = "GIntervalDto<number>", doklad = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", ns = "GIntervalDto<string>", ixs_msk = "string", kniha = "string", stav = "string", rozpis = "string", faze = "number", h = "string", pid = "string", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GMaskaDetailDtoTypeLengths { au = 4, odpa = 12, pol = 12, zj = 3, uz = 16, orj = 20, org = 16, doklad = 20, ucs = 10, uus = 10, ns = 12, kniha = 10, stav = 20, rozpis = 20, h = 70, pid = 254,}
	/**Enum pro filtraci dat třídy GMaskaDetailDto*/
	const enum GMaskaDetailFiltrEnum {
		/**DBCOLUMN:Seznam.ixs_msk*/
		ixs_msk,
		/**DBCOLUMN:Seznam.radek*/
		radek,
		/**DBCOLUMN:Seznam.ac_0*/
		ac_0,
		/**DBCOLUMN:Seznam.ac_1*/
		ac_1,
		/**DBCOLUMN:Seznam.drd_msk*/
		drd_msk,
		/**DBCOLUMN:Seznam.dat_zmena_0*/
		dat_zmena_0,
		/**DBCOLUMN:Seznam.dat_zmena_1*/
		dat_zmena_1,
		/**DBCOLUMN:Seznam.sc0_0*/
		sc0_0,
		/**DBCOLUMN:Seznam.sc0_1*/
		sc0_1,
		/**DBCOLUMN:Seznam.sc1_0*/
		sc1_0,
		/**DBCOLUMN:Seznam.sc1_1*/
		sc1_1,
		/**DBCOLUMN:Seznam.sc2_0*/
		sc2_0,
		/**DBCOLUMN:Seznam.sc2_1*/
		sc2_1,
		/**DBCOLUMN:Seznam.kc0_0*/
		kc0_0,
		/**DBCOLUMN:Seznam.kc0_1*/
		kc0_1,
		/**DBCOLUMN:Seznam.kc1_0*/
		kc1_0,
		/**DBCOLUMN:Seznam.kc1_1*/
		kc1_1,
		/**DBCOLUMN:Seznam.kc2_0*/
		kc2_0,
		/**DBCOLUMN:Seznam.kc2_1*/
		kc2_1,
		/**DBCOLUMN:Seznam.c0_0*/
		c0_0,
		/**DBCOLUMN:Seznam.c0_1*/
		c0_1,
		/**DBCOLUMN:Seznam.c1_0*/
		c1_0,
		/**DBCOLUMN:Seznam.c1_1*/
		c1_1,
		/**DBCOLUMN:Seznam.uea_0*/
		uea_0,
		/**DBCOLUMN:Seznam.uea_1*/
		uea_1,
		/**DBCOLUMN:Seznam.ueb_0*/
		ueb_0,
		/**DBCOLUMN:Seznam.ueb_1*/
		ueb_1,
		/**DBCOLUMN:Seznam.uec_0*/
		uec_0,
		/**DBCOLUMN:Seznam.uec_1*/
		uec_1,
		/**DBCOLUMN:Seznam.ued_0*/
		ued_0,
		/**DBCOLUMN:Seznam.ued_1*/
		ued_1,
		/**DBCOLUMN:Seznam.uee_0*/
		uee_0,
		/**DBCOLUMN:Seznam.uee_1*/
		uee_1,
		/**DBCOLUMN:Seznam.uef_0*/
		uef_0,
		/**DBCOLUMN:Seznam.uef_1*/
		uef_1,
		/**DBCOLUMN:Seznam.ueg_0*/
		ueg_0,
		/**DBCOLUMN:Seznam.ueg_1*/
		ueg_1,
		/**DBCOLUMN:Seznam.ueh_0*/
		ueh_0,
		/**DBCOLUMN:Seznam.ueh_1*/
		ueh_1,
		/**DBCOLUMN:Seznam.uei_0*/
		uei_0,
		/**DBCOLUMN:Seznam.uei_1*/
		uei_1,
		/**DBCOLUMN:Seznam.uej_0*/
		uej_0,
		/**DBCOLUMN:Seznam.uej_1*/
		uej_1,
		/**DBCOLUMN:Seznam.te0_0*/
		te0_0,
		/**DBCOLUMN:Seznam.te0_1*/
		te0_1,
		/**DBCOLUMN:Seznam.te1_0*/
		te1_0,
		/**DBCOLUMN:Seznam.te1_1*/
		te1_1,
		/**DBCOLUMN:Seznam.te2_0*/
		te2_0,
		/**DBCOLUMN:Seznam.te2_1*/
		te2_1,
		/**DBCOLUMN:Seznam.te3_0*/
		te3_0,
		/**DBCOLUMN:Seznam.te3_1*/
		te3_1,
		/**DBCOLUMN:Seznam.te4_0*/
		te4_0,
		/**DBCOLUMN:Seznam.te4_1*/
		te4_1,
		/**DBCOLUMN:Seznam.nazev*/
		nazev,
		/**DBCOLUMN:Seznam.popis*/
		popis,
		/**DBCOLUMN:Seznam.rok_0*/
		rok_0,
		/**DBCOLUMN:Seznam.rok_1*/
		rok_1,
		/**DBCOLUMN:Seznam.mesic_0*/
		mesic_0,
		/**DBCOLUMN:Seznam.mesic_1*/
		mesic_1,
		/**DBCOLUMN:Seznam.den_0*/
		den_0,
		/**DBCOLUMN:Seznam.den_1*/
		den_1,
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag,
		/**DBCOLUMN:Seznam.ico_esu*/
		ico_esu,
		/**DBCOLUMN:Seznam.rc_esu*/
		rc_esu,
		/**DBCOLUMN:Seznam.ico_0*/
		ico_0,
		/**DBCOLUMN:Seznam.ico_1*/
		ico_1,
		/**DBCOLUMN:Seznam.ucs_0*/
		ucs_0,
		/**DBCOLUMN:Seznam.ucs_1*/
		ucs_1,
		/**DBCOLUMN:Seznam.uus_0*/
		uus_0,
		/**DBCOLUMN:Seznam.uus_1*/
		uus_1,
		/**DBCOLUMN:Seznam.nks_0*/
		nks_0,
		/**DBCOLUMN:Seznam.nks_1*/
		nks_1,
		/**DBCOLUMN:Seznam.c2_0*/
		c2_0,
		/**DBCOLUMN:Seznam.c2_1*/
		c2_1,
		/**DBCOLUMN:Seznam.m0_0*/
		m0_0,
		/**DBCOLUMN:Seznam.m0_1*/
		m0_1,
		/**DBCOLUMN:Seznam.m1_0*/
		m1_0,
		/**DBCOLUMN:Seznam.m1_1*/
		m1_1,
		/**DBCOLUMN:Seznam.m2_0*/
		m2_0,
		/**DBCOLUMN:Seznam.m2_1*/
		m2_1,
		/**DBCOLUMN:Seznam.m3_0*/
		m3_0,
		/**DBCOLUMN:Seznam.m3_1*/
		m3_1,
		/**DBCOLUMN:Seznam.m4_0*/
		m4_0,
		/**DBCOLUMN:Seznam.m4_1*/
		m4_1,
		/**DBCOLUMN:Seznam.m5_0*/
		m5_0,
		/**DBCOLUMN:Seznam.m5_1*/
		m5_1,
		/**DBCOLUMN:Seznam.d0_0*/
		d0_0,
		/**DBCOLUMN:Seznam.d0_1*/
		d0_1,
		/**DBCOLUMN:Seznam.d1_0*/
		d1_0,
		/**DBCOLUMN:Seznam.d1_1*/
		d1_1,
		/**DBCOLUMN:Seznam.d2_0*/
		d2_0,
		/**DBCOLUMN:Seznam.d2_1*/
		d2_1,
		/**DBCOLUMN:Seznam.d3_0*/
		d3_0,
		/**DBCOLUMN:Seznam.d3_1*/
		d3_1,
		/**DBCOLUMN:Seznam.d4_0*/
		d4_0,
		/**DBCOLUMN:Seznam.d4_1*/
		d4_1,
		/**DBCOLUMN:Seznam.d5_0*/
		d5_0,
		/**DBCOLUMN:Seznam.d5_1*/
		d5_1,
		/**DBCOLUMN:Seznam.kni_zkratka*/
		kni_zkratka,
		/**DBCOLUMN:Seznam.stav_zpr_zap_txt*/
		stav_zpr_zap_txt,
		/**DBCOLUMN:Seznam.stav_roz_txt*/
		stav_roz_txt,
		/**DBCOLUMN:Seznam.stav_uzl_txt*/
		stav_uzl_txt,
		/**DBCOLUMN:Seznam.puvod*/
		puvod,
		/**DBCOLUMN:Seznam.faz_0*/
		faz_0,
		/**DBCOLUMN:Seznam.faz_1*/
		faz_1,
		/**DBCOLUMN:Seznam.nak_mnozstvi_0*/
		nak_mnozstvi_0,
		/**DBCOLUMN:Seznam.nak_mnozstvi_1*/
		nak_mnozstvi_1,
		/**DBCOLUMN:Seznam.nak_prvjedn_txt*/
		nak_prvjedn_txt,
		/**DBCOLUMN:Seznam.uek_0*/
		uek_0,
		/**DBCOLUMN:Seznam.uek_1*/
		uek_1,
		/**DBCOLUMN:Seznam.uel_0*/
		uel_0,
		/**DBCOLUMN:Seznam.uel_1*/
		uel_1,
		/**DBCOLUMN:Seznam.uem_0*/
		uem_0,
		/**DBCOLUMN:Seznam.uem_1*/
		uem_1,
		/**DBCOLUMN:Seznam.uen_0*/
		uen_0,
		/**DBCOLUMN:Seznam.uen_1*/
		uen_1,
		/**DBCOLUMN:Seznam.te5_0*/
		te5_0,
		/**DBCOLUMN:Seznam.te5_1*/
		te5_1,
		/**DBCOLUMN:Seznam.te6_0*/
		te6_0,
		/**DBCOLUMN:Seznam.te6_1*/
		te6_1,
		/**DBCOLUMN:Seznam.te7_0*/
		te7_0,
		/**DBCOLUMN:Seznam.te7_1*/
		te7_1,
		/**DBCOLUMN:Seznam.te8_0*/
		te8_0,
		/**DBCOLUMN:Seznam.te8_1*/
		te8_1,
		/**DBCOLUMN:Seznam.te9_0*/
		te9_0,
		/**DBCOLUMN:Seznam.te9_1*/
		te9_1,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Dto\Masky\GMaskaDto.d.ts 

declare namespace Gordic.Ron.Interface {
	/**DTO pro masky.*/
	interface GMaskaDto {
		ixs_msk?: string|null;
		zmenu_prov?: string|null;
		ixs_fun_akt?: string|null;
		nazev?: string|null;
		poznamka?: string|null;
		typ_masky?: number|null;
		vid_zazn?: number|null;
		aktivita?: number|null;
		dat_zmena?: JsonDate|null;
		typ_masky_zkr?: string|null;
		typ_masky_txt?: string|null;
		ixs_fun_akt_rf?: string|null;
		zmenu_prov_rf?: string|null;
		prava_txt?: string|null;
		Detail?: Gordic.Ron.Interface.GMaskaDetailDto|null;
	}
	const enum GMaskaDtoNames { ixs_msk = "ixs_msk", zmenu_prov = "zmenu_prov", ixs_fun_akt = "ixs_fun_akt", nazev = "nazev", poznamka = "poznamka", typ_masky = "typ_masky", vid_zazn = "vid_zazn", aktivita = "aktivita", dat_zmena = "dat_zmena", typ_masky_zkr = "typ_masky_zkr", typ_masky_txt = "typ_masky_txt", ixs_fun_akt_rf = "ixs_fun_akt_rf", zmenu_prov_rf = "zmenu_prov_rf", prava_txt = "prava_txt", Detail = "Detail",}
	const enum GMaskaDtoFragments { ixs_msk = "*", zmenu_prov = "*", ixs_fun_akt = "*", nazev = "*", poznamka = "*", typ_masky = "*", vid_zazn = "*", aktivita = "*", dat_zmena = "*", typ_masky_zkr = "*", typ_masky_txt = "*", ixs_fun_akt_rf = "*", zmenu_prov_rf = "*", prava_txt = "*", Detail = "*",}
	const enum GMaskaDtoTypes { ixs_msk = "string", zmenu_prov = "string", ixs_fun_akt = "string", nazev = "string", poznamka = "string", typ_masky = "number", vid_zazn = "number", aktivita = "number", dat_zmena = "JsonDate", typ_masky_zkr = "string", typ_masky_txt = "string", ixs_fun_akt_rf = "string", zmenu_prov_rf = "string", prava_txt = "string", Detail = "Gordic.Ron.Interface.GMaskaDetailDto",}
	const enum GMaskaDtoTypeLengths { nazev = 254, poznamka = 254,}
	/**Enum pro filtrování.*/
	const enum GMaskaFiltrEnum {
		ixs_msk,
		nazev,
		typ_masky,
		vid_zazn,
		poznamka,
		aktivita,
		dat_zmena,
		zmenu_prov,
		ixs_fun_akt,
		ixs_fun_akt_rf,
		zmenu_prov_rf,
		typ_masky_zkr,
		typ_masky_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Dto\Prava\GPravaDto.d.ts 

declare namespace Gordic.Ron.Interface {
	/**DTO pro práva.*/
	interface GPravaDto {
		ixs_obj?: string|null;
		p0?: number|null;
		p1?: number|null;
		p2?: number|null;
		p3?: number|null;
		p4?: number|null;
		p5?: number|null;
		p6?: number|null;
		p7?: number|null;
		vid_zazn?: number|null;
		nazev_rf?: string|null;
		zkratka?: string|null;
		readonly vlastnikPrav?: string|null;
		readonly pristup?: string|null;
	}
	const enum GPravaDtoNames { ixs_obj = "ixs_obj", p0 = "p0", p1 = "p1", p2 = "p2", p3 = "p3", p4 = "p4", p5 = "p5", p6 = "p6", p7 = "p7", vid_zazn = "vid_zazn", nazev_rf = "nazev_rf", zkratka = "zkratka", vlastnikPrav = "vlastnikPrav", pristup = "pristup",}
	const enum GPravaDtoFragments { ixs_obj = "*", p0 = "*", p1 = "*", p2 = "*", p3 = "*", p4 = "*", p5 = "*", p6 = "*", p7 = "*", vid_zazn = "*", nazev_rf = "*", zkratka = "*", vlastnikPrav = "*", pristup = "*",}
	const enum GPravaDtoTypes { ixs_obj = "string", p0 = "number", p1 = "number", p2 = "number", p3 = "number", p4 = "number", p5 = "number", p6 = "number", p7 = "number", vid_zazn = "number", nazev_rf = "string", zkratka = "string", vlastnikPrav = "string", pristup = "string",}
	const enum GPravaDtoTypeLengths {}
	/**Enum pro filtrování.*/
	const enum GPravaFiltrEnum {
		ixs_obj,
		ixs_usr,
		p0,
		p1,
		p2,
		p3,
		p4,
		p5,
		p6,
		p7,
		vid_zazn,
		nazev_rf,
		zkratka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Dto\Rozpisy\GRozpisDto.d.ts 

declare namespace Gordic.Ron.Interface {
	/**DTO pro rozpisy.*/
	interface GRozpisDto {
		ixs_rps?: string|null;
		nazev?: string|null;
		poznamka?: string|null;
		vid_zazn?: number|null;
		aktivita?: number|null;
		dat_zmena?: JsonDate|null;
		zmenu_prov?: string|null;
		ixs_fun_akt?: string|null;
		ixs_fun_akt_rf?: string|null;
		zmenu_prov_rf?: string|null;
		prava_txt?: string|null;
		faz?: number|null;
		sloupce_rps?: string|null;
	}
	const enum GRozpisDtoNames { ixs_rps = "ixs_rps", nazev = "nazev", poznamka = "poznamka", vid_zazn = "vid_zazn", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_rf = "ixs_fun_akt_rf", zmenu_prov_rf = "zmenu_prov_rf", prava_txt = "prava_txt", faz = "faz", sloupce_rps = "sloupce_rps",}
	const enum GRozpisDtoFragments { ixs_rps = "*", nazev = "*", poznamka = "*", vid_zazn = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun_akt = "*", ixs_fun_akt_rf = "*", zmenu_prov_rf = "*", prava_txt = "*", faz = "*", sloupce_rps = "*",}
	const enum GRozpisDtoTypes { ixs_rps = "string", nazev = "string", poznamka = "string", vid_zazn = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun_akt = "string", ixs_fun_akt_rf = "string", zmenu_prov_rf = "string", prava_txt = "string", faz = "number", sloupce_rps = "string",}
	const enum GRozpisDtoTypeLengths { nazev = 254, poznamka = 254, zmenu_prov = 12, sloupce_rps = 2000,}
	/**Enum pro filtrování.*/
	const enum GRoozpisFilterEnum {
		ixs_rps,
		nazev,
		poznamka,
		vid_zazn,
		aktivita,
		dat_zmena,
		zmenu_prov,
		ixs_fun_akt,
		faz,
		sloupce_rps,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Services\IGMaskService.d.ts 

declare namespace Gordic.Isl.Catalog {
	interface MaskService {
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ron.Interface.GMaskaDto>>;
		delete(rq?:Gordic.Ron.Interface.GMaskaDto|CallParams<GServiceSaveRequest<Gordic.Ron.Interface.GMaskaDto>>): _Task<GServiceSaveRequest<Gordic.Ron.Interface.GMaskaDto>,GServiceSaveResponse<Gordic.Ron.Interface.GMaskaDto>>;
		read(rq?:Gordic.Ron.Interface.GMaskaDto|CallParams<GServiceReadRequest<Gordic.Ron.Interface.GMaskaDto>>): _Task<GServiceReadRequest<Gordic.Ron.Interface.GMaskaDto>,GServiceReadResponse<Gordic.Ron.Interface.GMaskaDto>>;
		upsert(rq?:Gordic.Ron.Interface.GMaskaDto|CallParams<GServiceSaveRequest<Gordic.Ron.Interface.GMaskaDto>>): _Task<GServiceSaveRequest<Gordic.Ron.Interface.GMaskaDto>,GServiceSaveResponse<Gordic.Ron.Interface.GMaskaDto>>;
		readDetail(rq?:Gordic.Ron.Interface.GMaskaDetailDto|CallParams<GServiceReadRequest<Gordic.Ron.Interface.GMaskaDetailDto>>): _Task<GServiceReadRequest<Gordic.Ron.Interface.GMaskaDetailDto>,GServiceListResponse<Gordic.Ron.Interface.GMaskaDetailDto>>;
		upsertDetail(rq?:Gordic.Ron.Interface.GMaskaDetailDto|CallParams<GServiceSaveRequest<Gordic.Ron.Interface.GMaskaDetailDto>>): _Task<GServiceSaveRequest<Gordic.Ron.Interface.GMaskaDetailDto>,GServiceSaveResponse<Gordic.Ron.Interface.GMaskaDetailDto>>;
		deleteDetail(rq?:CallParams<{maskDetailRow:Gordic.Ron.Interface.GMaskaDetailDto}>): _Task<{maskDetailRow:Gordic.Ron.Interface.GMaskaDetailDto},number>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		MaskService: ServiceBase & Catalog.MaskService;
	}
	const MaskService: Client["MaskService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Services\IGPravaService.d.ts 

declare namespace Gordic.Isl.Catalog {
	interface PravaService {
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ron.Interface.GPravaDto>>;
		read(rq?:Gordic.Ron.Interface.GPravaDto|CallParams<GServiceReadRequest<Gordic.Ron.Interface.GPravaDto>>): _Task<GServiceReadRequest<Gordic.Ron.Interface.GPravaDto>,GServiceReadResponse<Gordic.Ron.Interface.GPravaDto>>;
		delete(rq?:Gordic.Ron.Interface.GPravaDto|CallParams<GServiceSaveRequest<Gordic.Ron.Interface.GPravaDto>>): _Task<GServiceSaveRequest<Gordic.Ron.Interface.GPravaDto>,GServiceSaveResponse<Gordic.Ron.Interface.GPravaDto>>;
		upsert(rq?:Gordic.Ron.Interface.GPravaDto|CallParams<GServiceSaveRequest<Gordic.Ron.Interface.GPravaDto>>): _Task<GServiceSaveRequest<Gordic.Ron.Interface.GPravaDto>,GServiceSaveResponse<Gordic.Ron.Interface.GPravaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PravaService: ServiceBase & Catalog.PravaService;
	}
	const PravaService: Client["PravaService"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ron.Interface\Services\IGRozpisService.d.ts 

declare namespace Gordic.Isl.Catalog {
	interface RozpisService {
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ron.Interface.GRozpisDto>>;
		read(rq?:Gordic.Ron.Interface.GRozpisDto|CallParams<GServiceReadRequest<Gordic.Ron.Interface.GRozpisDto>>): _Task<GServiceReadRequest<Gordic.Ron.Interface.GRozpisDto>,GServiceReadResponse<Gordic.Ron.Interface.GRozpisDto>>;
		upsert(rq?:Gordic.Ron.Interface.GRozpisDto|CallParams<GServiceSaveRequest<Gordic.Ron.Interface.GRozpisDto>>): _Task<GServiceSaveRequest<Gordic.Ron.Interface.GRozpisDto>,GServiceSaveResponse<Gordic.Ron.Interface.GRozpisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		RozpisService: ServiceBase & Catalog.RozpisService;
	}
	const RozpisService: Client["RozpisService"];
}

//#endregion

