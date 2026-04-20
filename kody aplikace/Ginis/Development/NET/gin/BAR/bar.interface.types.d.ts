/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       bar.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Bar.Interface\Gordic.Bar.Interface.csproj
*    created     2026-02-16 14:33:50
*    files       Doklad\IGBardn00.d.ts
*                Doklad\IGBarsver.d.ts
*                Doklad\IGSrvdixp.d.ts
*                Doklad\IGSrvdixw.d.ts
*                Doklad\IGSrvsixp.d.ts
*                Doklad\IGSrvsixw.d.ts
*                Dto\GAgDokladyFilterDto.d.ts
*                Dto\GAkceSumyALLDto.d.ts
*                Dto\GAkceSumyDto.d.ts
*                Dto\GAkceVysledekDto.d.ts
*                Dto\GBarCastkyDto.d.ts
*                Dto\GBarChybySchvaleniDto.d.ts
*                Dto\GBardn00Dto.d.ts
*                Dto\GBarSchvaleniDto.d.ts
*                Dto\GBarsverDto.d.ts
*                Dto\GBarVerzeDto.d.ts
*                Dto\GEkosrarDto.d.ts
*                Dto\GServisVysledekDto.d.ts
*                Dto\GSeznamBarFilterDto.d.ts
*                Dto\GSrvdixpDto.d.ts
*                Dto\GSrvdixwDto.d.ts
*                Dto\GSrvscfuDto.d.ts
*                Dto\GSrvsixpDto.d.ts
*                Dto\GSrvsixwDto.d.ts
*                Dto\GUctdxwaDto.d.ts
*                Init\GBarGlobalsBase.d.ts
*                Init\IGBarEkoInit.d.ts
*                Init\IGBarInit.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Doklad\IGBardn00.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Data verze BAR
	* @domain BalancniVerzeData
	* @businessObject BalancniVerzeData
	*/
	interface BalancniVerzeData {
		/**Nastav verze BAR*/
		set_Verze(rq?:Gordic.Bar.Interface.GBarVerzeDto|CallParams<GServiceActionRequest<Gordic.Bar.Interface.GBarVerzeDto>>): _Task<GServiceActionRequest<Gordic.Bar.Interface.GBarVerzeDto>,GServiceActionResponse<Gordic.Bar.Interface.GBarVerzeDto>>;
		/**Detail Data verze BAR*/
		read(rq?:Gordic.Bar.Interface.GBardn00Dto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GBardn00Dto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GBardn00Dto>,GServiceReadResponse<Gordic.Bar.Interface.GBardn00Dto>>;
		/**Seznam Data verze BAR*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GBardn00Dto>>;
		/**Sumář Seznam Data verze BAR*/
		list_Sum(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GBardn00Dto>>;
		/**Založení Data verze BAR*/
		create_List(rq?:Gordic.Bar.Interface.GBarVerzeDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GBarVerzeDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GBarVerzeDto>,GServiceSaveResponse<Gordic.Bar.Interface.GBarVerzeDto>>;
		/**Schválení rozpočtu do dokladu ROZ*/
		schvalit_Rozpocet(rq?:Gordic.Bar.Interface.GBarSchvaleniDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GBarSchvaleniDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GBarSchvaleniDto>,GServiceSaveResponse<Gordic.Bar.Interface.GBarSchvaleniDto>>;
		/**Seznam Seznam davek*/
		list_Zapisy_Chyba(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GBarChybySchvaleniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BalancniVerzeData: ServiceBase & Catalog.BalancniVerzeData;
	}
	const BalancniVerzeData: Client["BalancniVerzeData"];
}
declare namespace Gordic.Bar.Interface {
	/**Filtr pro Data verze BAR*/
	const enum GBardn00Filter {
		/**rok*/
		rok,
		/**verze_c*/
		verze_c,
		/**verze_k*/
		verze_k,
		/**lic*/
		lic,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**mesic*/
		mesic,
		/**komp*/
		komp,
		/**radek_z*/
		radek_z,
		/**nks*/
		nks,
		/**typ_org*/
		typ_org,
		/**ixp*/
		ixp,
		/**drd*/
		drd,
		/**den*/
		den,
		/**c0*/
		c0,
		/**c1*/
		c1,
		/**c0_new*/
		c0_new,
		/**c1_new*/
		c1_new,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**uec*/
		uec,
		/**ued*/
		ued,
		/**uee*/
		uee,
		/**uef*/
		uef,
		/**ueg*/
		ueg,
		/**ueh*/
		ueh,
		/**uei*/
		uei,
		/**uej*/
		uej,
		/**te0*/
		te0,
		/**te1*/
		te1,
		/**te2*/
		te2,
		/**te3*/
		te3,
		/**te4*/
		te4,
		/**popis*/
		popis,
		/**t_ico*/
		t_ico,
		/**t_nks*/
		t_nks,
		/**t_te0*/
		t_te0,
		/**t_te1*/
		t_te1,
		/**sor_id*/
		sor_id,
		/**c0_it*/
		c0_it,
		/**c1_it*/
		c1_it,
		/**m*/
		m,
		/**m_new*/
		m_new,
		/**m_it*/
		m_it,
		/**xpf_fs*/
		xpf_fs,
		/**xpf_pf*/
		xpf_pf,
		/**priz_blok*/
		priz_blok,
		/**komodita*/
		komodita,
		/**uus*/
		uus,
		/**ixp_prim*/
		ixp_prim,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Doklad\IGBarsver.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Verze BAR
	* @domain BalancniVerze
	* @businessObject BalancniVerze
	*/
	interface BalancniVerze {
		/**Detail Verze BAR*/
		read(rq?:Gordic.Bar.Interface.GBarsverDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GBarsverDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GBarsverDto>,GServiceReadResponse<Gordic.Bar.Interface.GBarsverDto>>;
		/**Seznam Verze BAR*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GBarsverDto>>;
		/**Založení Verze BAR*/
		create(rq?:Gordic.Bar.Interface.GBarsverDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GBarsverDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GBarsverDto>,GServiceSaveResponse<Gordic.Bar.Interface.GBarsverDto>>;
		/**Odstranění Verze BAR*/
		delete(rq?:Gordic.Bar.Interface.GBarsverDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GBarsverDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GBarsverDto>,GServiceSaveResponse<Gordic.Bar.Interface.GBarsverDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BalancniVerze: ServiceBase & Catalog.BalancniVerze;
	}
	const BalancniVerze: Client["BalancniVerze"];
}
declare namespace Gordic.Bar.Interface {
	/**Filtr pro Verze BAR*/
	const enum GBarsverFilter {
		/**ico*/
		ico,
		/**rok*/
		rok,
		/**komp_dec*/
		komp_dec,
		/**verze_c*/
		verze_c,
		/**verze_k*/
		verze_k,
		/**s_nav*/
		s_nav,
		/**priz_sehr*/
		priz_sehr,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**c_max*/
		c_max,
		/**verze_c_num*/
		verze_c_num,
		/**popis*/
		popis,
		/**priz_prac*/
		priz_prac,
		/**priz_xx*/
		priz_xx,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Doklad\IGSrvdixp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Finanční profil požadavku
	* @domain PozadavekFinProfil
	* @businessObject PozadavekFinProfil
	*/
	interface PozadavekFinProfil {
		/**Detail Finanční profil požadavku*/
		read(rq?:Gordic.Bar.Interface.GSrvdixpDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvdixpDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvdixpDto>,GServiceReadResponse<Gordic.Bar.Interface.GSrvdixpDto>>;
		/**Seznam Finanční profil požadavku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GSrvdixpDto>>;
		/**Založení Finanční profil požadavku*/
		create(rq?:Gordic.Bar.Interface.GSrvdixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixpDto>>;
		/**Oprava Finanční profil požadavku*/
		update(rq?:Gordic.Bar.Interface.GSrvdixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixpDto>>;
		/**Oprava resp. založení Finanční profil požadavku*/
		upsert(rq?:Gordic.Bar.Interface.GSrvdixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixpDto>>;
		/**Odstranění Finanční profil požadavku*/
		delete(rq?:Gordic.Bar.Interface.GSrvdixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixpDto>>;
		/**default noveho zapisu*/
		novy_Zapis(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Bar.Interface.GSrvdixpDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PozadavekFinProfil: ServiceBase & Catalog.PozadavekFinProfil;
	}
	const PozadavekFinProfil: Client["PozadavekFinProfil"];
}
declare namespace Gordic.Bar.Interface {
	/**Filtr pro Finanční profil požadavku*/
	const enum GSrvdixpFilter {
		/**rok_srv*/
		rok_srv,
		/**ixp*/
		ixp,
		/**cislo*/
		cislo,
		/**radek_z*/
		radek_z,
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**mesic*/
		mesic,
		/**komp*/
		komp,
		/**nks*/
		nks,
		/**drd*/
		drd,
		/**den*/
		den,
		/**c0*/
		c0,
		/**c1*/
		c1,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**uec*/
		uec,
		/**ued*/
		ued,
		/**uee*/
		uee,
		/**uef*/
		uef,
		/**ueg*/
		ueg,
		/**ueh*/
		ueh,
		/**uei*/
		uei,
		/**uej*/
		uej,
		/**te0*/
		te0,
		/**te1*/
		te1,
		/**te2*/
		te2,
		/**te3*/
		te3,
		/**te4*/
		te4,
		/**popis*/
		popis,
		/**t_ico*/
		t_ico,
		/**t_nks*/
		t_nks,
		/**c0_s*/
		c0_s,
		/**c1_s*/
		c1_s,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**aktivita*/
		aktivita,
		/**xpf_pf*/
		xpf_pf,
		/**xpf_fs*/
		xpf_fs,
		/**komodita*/
		komodita,
		/**typ_org*/
		typ_org,
		/**uus*/
		uus,
		/**priz_blok*/
		priz_blok,
		/**ixp_prim*/
		ixp_prim,
		/**ixp_roz*/
		ixp_roz,
		/**xuete*/
		xuete,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Doklad\IGSrvdixw.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Finanční profil požadavku
	* @domain PozadavekFinProfilImport
	* @businessObject PozadavekFinProfilImport
	*/
	interface PozadavekFinProfilImport {
		/**Detail Finanční profil požadavku*/
		read(rq?:Gordic.Bar.Interface.GSrvdixwDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvdixwDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvdixwDto>,GServiceReadResponse<Gordic.Bar.Interface.GSrvdixwDto>>;
		/**Seznam Finanční profil požadavku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GSrvdixwDto>>;
		/**Založení Finanční profil požadavku*/
		create(rq?:Gordic.Bar.Interface.GSrvdixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixwDto>>;
		/**Oprava Finanční profil požadavku*/
		update(rq?:Gordic.Bar.Interface.GSrvdixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixwDto>>;
		/**Oprava resp. založení Finanční profil požadavku*/
		upsert(rq?:Gordic.Bar.Interface.GSrvdixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixwDto>>;
		/**Odstranění Finanční profil požadavku*/
		delete(rq?:Gordic.Bar.Interface.GSrvdixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvdixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvdixwDto>>;
		/**default noveho zapisu*/
		novy_Zapis(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},Gordic.Bar.Interface.GSrvdixwDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PozadavekFinProfilImport: ServiceBase & Catalog.PozadavekFinProfilImport;
	}
	const PozadavekFinProfilImport: Client["PozadavekFinProfilImport"];
}
declare namespace Gordic.Bar.Interface {
	/**Filtr pro Finanční profil požadavku*/
	const enum GSrvdixwFilter {
		/**rok_srv*/
		rok_srv,
		/**ixp*/
		ixp,
		/**cislo*/
		cislo,
		/**radek_z*/
		radek_z,
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**mesic*/
		mesic,
		/**komp*/
		komp,
		/**nks*/
		nks,
		/**drd*/
		drd,
		/**den*/
		den,
		/**c0*/
		c0,
		/**c1*/
		c1,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**uec*/
		uec,
		/**ued*/
		ued,
		/**uee*/
		uee,
		/**uef*/
		uef,
		/**ueg*/
		ueg,
		/**ueh*/
		ueh,
		/**uei*/
		uei,
		/**uej*/
		uej,
		/**te0*/
		te0,
		/**te1*/
		te1,
		/**te2*/
		te2,
		/**te3*/
		te3,
		/**te4*/
		te4,
		/**popis*/
		popis,
		/**t_ico*/
		t_ico,
		/**t_nks*/
		t_nks,
		/**c0_s*/
		c0_s,
		/**c1_s*/
		c1_s,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**aktivita*/
		aktivita,
		/**xpf_pf*/
		xpf_pf,
		/**xpf_fs*/
		xpf_fs,
		/**komodita*/
		komodita,
		/**typ_org*/
		typ_org,
		/**uus*/
		uus,
		/**priz_blok*/
		priz_blok,
		/**ixp_prim*/
		ixp_prim,
		/**ixp_roz*/
		ixp_roz,
		/**xuete*/
		xuete,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Doklad\IGSrvsixp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Hlavička požadavku
	* @domain PozadavekHlavicka
	* @businessObject PozadavekHlavicka
	*/
	interface PozadavekHlavicka {
		/**Detail Hlavička požadavku*/
		read(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceReadResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**Seznam Hlavička požadavku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**Založení Hlavička požadavku*/
		create(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**Oprava Hlavička požadavku*/
		update(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**Oprava resp. založení Hlavička požadavku*/
		upsert(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**Odstranění Hlavička požadavku*/
		delete(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**ISL Predani akce - lze predat*/
		lze_Predani_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceReadResponse<Gordic.Bar.Interface.GAkceVysledekDto>>;
		/**ISL Predani akce*/
		predani_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**ISL Prevzeti akce - lze prevzit*/
		lze_Prevzeti_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceReadResponse<Gordic.Bar.Interface.GAkceVysledekDto>>;
		/**ISL Prevzeti akce*/
		prevzeti_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**ISL Aktivace Akce*/
		aktivace(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
		/**ISL Deaktivace Akce*/
		deaktivace(rq?:Gordic.Bar.Interface.GSrvsixpDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixpDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PozadavekHlavicka: ServiceBase & Catalog.PozadavekHlavicka;
	}
	const PozadavekHlavicka: Client["PozadavekHlavicka"];
}
declare namespace Gordic.Bar.Interface {
	/**Filtr pro Hlavička požadavku*/
	const enum GSrvsixpFilter {
		/**rok_srv*/
		rok_srv,
		/**ixp*/
		ixp,
		/**cislo*/
		cislo,
		/**nazev*/
		nazev,
		/**typ*/
		typ,
		/**adresa1*/
		adresa1,
		/**adresa2*/
		adresa2,
		/**psc*/
		psc,
		/**adresa3*/
		adresa3,
		/**fin_od*/
		fin_od,
		/**fin_do*/
		fin_do,
		/**real_od*/
		real_od,
		/**real_do*/
		real_do,
		/**prijmeni*/
		prijmeni,
		/**jmeno*/
		jmeno,
		/**os_cislo*/
		os_cislo,
		/**telefon*/
		telefon,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**c_celk*/
		c_celk,
		/**c_min_sk*/
		c_min_sk,
		/**c_min_roz*/
		c_min_roz,
		/**c_akt_poz*/
		c_akt_poz,
		/**c_dal_poz*/
		c_dal_poz,
		/**ktg_akce*/
		ktg_akce,
		/**dat_inv_maj*/
		dat_inv_maj,
		/**skp_akce*/
		skp_akce,
		/**psk_akce*/
		psk_akce,
		/**aktivita*/
		aktivita,
		/**t_nks*/
		t_nks,
		/**nks*/
		nks,
		/**c_celk_puv*/
		c_celk_puv,
		/**orj_puv*/
		orj_puv,
		/**xpf_pf*/
		xpf_pf,
		/**xpf_nato*/
		xpf_nato,
		/**c_nato*/
		c_nato,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**ixs_fun_akt*/
		ixs_fun_akt,
		/**upresneni*/
		upresneni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Doklad\IGSrvsixw.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Hlavička požadavku
	* @domain PozadavekHlavickaImport
	* @businessObject PozadavekHlavickaImport
	*/
	interface PozadavekHlavickaImport {
		/**Detail Hlavička požadavku*/
		read(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceReadResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**Seznam Hlavička požadavku*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**Založení Hlavička požadavku*/
		create(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**Oprava Hlavička požadavku*/
		update(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**Oprava resp. založení Hlavička požadavku*/
		upsert(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**Odstranění Hlavička požadavku*/
		delete(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**ISL Predani akce - lze predat*/
		lze_Predani_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceReadResponse<Gordic.Bar.Interface.GAkceVysledekDto>>;
		/**ISL Predani akce*/
		predani_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**ISL Prevzeti akce - lze prevzit*/
		lze_Prevzeti_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceReadRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceReadResponse<Gordic.Bar.Interface.GAkceVysledekDto>>;
		/**ISL Prevzeti akce*/
		prevzeti_Pozadavku(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**ISL Aktivace Akce*/
		aktivace(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**ISL Deaktivace Akce*/
		deaktivace(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GSrvsixwDto>>;
		/**Nacti_Davku*/
		nacti_Davku(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto}>): _Task<{rq:GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto},GServiceSaveResponse<Gordic.Bar.Interface.GServisVysledekDto>>;
		/**Nacti_Davku*/
		presun_Davku(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GServisVysledekDto>>;
		/**Init_Rok*/
		init_Rok(rq?:Gordic.Bar.Interface.GSrvsixwDto|CallParams<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>>): _Task<GServiceSaveRequest<Gordic.Bar.Interface.GSrvsixwDto>,GServiceSaveResponse<Gordic.Bar.Interface.GServisVysledekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PozadavekHlavickaImport: ServiceBase & Catalog.PozadavekHlavickaImport;
	}
	const PozadavekHlavickaImport: Client["PozadavekHlavickaImport"];
}
declare namespace Gordic.Bar.Interface {
	/**Filtr pro Hlavička požadavku*/
	const enum GSrvsixwFilter {
		/**rok_srv*/
		rok_srv,
		/**ixp*/
		ixp,
		/**cislo*/
		cislo,
		/**nazev*/
		nazev,
		/**typ*/
		typ,
		/**adresa1*/
		adresa1,
		/**adresa2*/
		adresa2,
		/**psc*/
		psc,
		/**adresa3*/
		adresa3,
		/**fin_od*/
		fin_od,
		/**fin_do*/
		fin_do,
		/**real_od*/
		real_od,
		/**real_do*/
		real_do,
		/**prijmeni*/
		prijmeni,
		/**jmeno*/
		jmeno,
		/**os_cislo*/
		os_cislo,
		/**telefon*/
		telefon,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**c_celk*/
		c_celk,
		/**c_min_sk*/
		c_min_sk,
		/**c_min_roz*/
		c_min_roz,
		/**c_akt_poz*/
		c_akt_poz,
		/**c_dal_poz*/
		c_dal_poz,
		/**ktg_akce*/
		ktg_akce,
		/**dat_inv_maj*/
		dat_inv_maj,
		/**skp_akce*/
		skp_akce,
		/**psk_akce*/
		psk_akce,
		/**aktivita*/
		aktivita,
		/**t_nks*/
		t_nks,
		/**nks*/
		nks,
		/**c_celk_puv*/
		c_celk_puv,
		/**orj_puv*/
		orj_puv,
		/**xpf_pf*/
		xpf_pf,
		/**xpf_nato*/
		xpf_nato,
		/**c_nato*/
		c_nato,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**ixs_fun_akt*/
		ixs_fun_akt,
		/**upresneni*/
		upresneni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GAgDokladyFilterDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO na filtrovani agendovych dokladu*/
	interface GAgDokladyFilterDto {
		/**DBCOLUMN:rok*/
		rok?: number|null;
		/**DBCOLUMN:ico*/
		ico?: string|null;
		/**DBCOLUMN:cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csl*/
		ixs_csl?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_prr*/
		ixs_prr?: string|null;
		/**DBCOLUMN:rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:rok_srv*/
		rok_srv?: number|null;
		/**DBCOLUMN:typ*/
		typ?: string|null;
		/**DBCOLUMN:SeznamDokladu.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:aktivita*/
		aktivita?: GBaseFilter<number>|null;
	}
	const enum GAgDokladyFilterDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", ixs_csl = "ixs_csl", ixs_prr = "ixs_prr", rok_od = "rok_od", rok_do = "rok_do", rok_srv = "rok_srv", typ = "typ", cis_real = "cis_real", ixs_pla = "ixs_pla", aktivita = "aktivita",}
	const enum GAgDokladyFilterDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_cia = "*", ixs_csl = "*", ixs_prr = "*", rok_od = "*", rok_do = "*", rok_srv = "*", typ = "*", cis_real = "*", ixs_pla = "*", aktivita = "*",}
	const enum GAgDokladyFilterDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", ixs_csl = "string", ixs_prr = "string", rok_od = "number", rok_do = "number", rok_srv = "number", typ = "string", cis_real = "string", ixs_pla = "string", aktivita = "GBaseFilter<number>",}
	const enum GAgDokladyFilterDtoTypeLengths { ico = 10, cislo = 12, ixs_cia = 12, ixs_csl = 12, ixs_prr = 12, typ = 3, ixs_pla = 12,}
	/**Výčet filtračních kritérií pro filtr seznamu Akcí*/
	const enum FilDokladyAg {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_cia*/
		ixs_cia,
		/**ixs_csl*/
		ixs_csl,
		/**ixs_pla*/
		ixs_pla,
		/**ixs_prr*/
		ixs_prr,
		/**rok_od*/
		rok_od,
		/**rok_do*/
		rok_do,
		/**rok_srv*/
		rok_srv,
		/**typ*/
		typ,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GAkceSumyALLDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DBTABLE:srvacio*/
	interface GAkceSumyALLDto {
		/**DBCOLUMN:srvacio.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvacio.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvacio.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:srvacio.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_prof*/
		c_prof?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_ru*/
		c_ru?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_akt*/
		c_akt?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_dal*/
		c_dal?: JsonDecimal|null;
	}
	const enum GAkceSumyALLDtoNames { rok = "rok", ico = "ico", cislo = "cislo", c_celk = "c_celk", c_plan = "c_plan", c_prof = "c_prof", c_ru = "c_ru", c_akt = "c_akt", c_dal = "c_dal",}
	const enum GAkceSumyALLDtoFragments { rok = "*", ico = "*", cislo = "*", c_celk = "*", c_plan = "*", c_prof = "*", c_ru = "*", c_akt = "*", c_dal = "*",}
	const enum GAkceSumyALLDtoTypes { rok = "number", ico = "string", cislo = "string", c_celk = "JsonDecimal", c_plan = "JsonDecimal", c_prof = "JsonDecimal", c_ru = "JsonDecimal", c_akt = "JsonDecimal", c_dal = "JsonDecimal",}
	const enum GAkceSumyALLDtoTypeLengths { ico = 10, cislo = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GAkceSumyDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DBTABLE:srvacio*/
	interface GAkceSumyDto {
		/**DBCOLUMN:srvacio.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvacio.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvacio.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:srvacio.c_0*/
		c_0?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_1*/
		c_1?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_2*/
		c_2?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_3*/
		c_3?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_4*/
		c_4?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_5*/
		c_5?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_6*/
		c_6?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_7*/
		c_7?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_8*/
		c_8?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_9*/
		c_9?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_10*/
		c_10?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:srvacio.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:srvacio.c_11*/
		c_11?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_12*/
		c_12?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_15*/
		c_15?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_16*/
		c_16?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_21*/
		c_21?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_23*/
		c_23?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_17*/
		c_17?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_18*/
		c_18?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_34*/
		c_34?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_54*/
		c_54?: JsonDecimal|null;
		/**DBCOLUMN:srvacio.c_66*/
		c_66?: JsonDecimal|null;
	}
	const enum GAkceSumyDtoNames { rok = "rok", ico = "ico", cislo = "cislo", c_0 = "c_0", c_1 = "c_1", c_2 = "c_2", c_3 = "c_3", c_4 = "c_4", c_5 = "c_5", c_6 = "c_6", c_7 = "c_7", c_8 = "c_8", c_9 = "c_9", c_10 = "c_10", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_11 = "c_11", c_12 = "c_12", c_15 = "c_15", c_16 = "c_16", c_21 = "c_21", c_23 = "c_23", c_17 = "c_17", c_18 = "c_18", c_34 = "c_34", c_54 = "c_54", c_66 = "c_66",}
	const enum GAkceSumyDtoFragments { rok = "*", ico = "*", cislo = "*", c_0 = "*", c_1 = "*", c_2 = "*", c_3 = "*", c_4 = "*", c_5 = "*", c_6 = "*", c_7 = "*", c_8 = "*", c_9 = "*", c_10 = "*", dat_zmena = "*", zmenu_prov = "*", c_11 = "*", c_12 = "*", c_15 = "*", c_16 = "*", c_21 = "*", c_23 = "*", c_17 = "*", c_18 = "*", c_34 = "*", c_54 = "*", c_66 = "*",}
	const enum GAkceSumyDtoTypes { rok = "number", ico = "string", cislo = "string", c_0 = "JsonDecimal", c_1 = "JsonDecimal", c_2 = "JsonDecimal", c_3 = "JsonDecimal", c_4 = "JsonDecimal", c_5 = "JsonDecimal", c_6 = "JsonDecimal", c_7 = "JsonDecimal", c_8 = "JsonDecimal", c_9 = "JsonDecimal", c_10 = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", c_11 = "JsonDecimal", c_12 = "JsonDecimal", c_15 = "JsonDecimal", c_16 = "JsonDecimal", c_21 = "JsonDecimal", c_23 = "JsonDecimal", c_17 = "JsonDecimal", c_18 = "JsonDecimal", c_34 = "JsonDecimal", c_54 = "JsonDecimal", c_66 = "JsonDecimal",}
	const enum GAkceSumyDtoTypeLengths { ico = 10, cislo = 16, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GAkceVysledekDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**pocty dokladu akce DTO*/
	interface GAkceVysledekDto {
		/**DBCOLUMN:vysledek*/
		vysledek?: boolean|null;
		/**DBCOLUMN:vysledek_txt*/
		vysledek_txt?: string|null;
		/**DBCOLUMN:varovani*/
		varovani?: string|null;
		/**DBCOLUMN:chyba*/
		chyba?: string|null;
		/**DBCOLUMN:pocet*/
		pocet?: number|null;
		/**DBCOLUMN:pocet2*/
		pocet2?: number|null;
	}
	const enum GAkceVysledekDtoNames { vysledek = "vysledek", vysledek_txt = "vysledek_txt", varovani = "varovani", chyba = "chyba", pocet = "pocet", pocet2 = "pocet2",}
	const enum GAkceVysledekDtoFragments { vysledek = "*", vysledek_txt = "*", varovani = "*", chyba = "*", pocet = "*", pocet2 = "*",}
	const enum GAkceVysledekDtoTypes { vysledek = "boolean", vysledek_txt = "string", varovani = "string", chyba = "string", pocet = "number", pocet2 = "number",}
	const enum GAkceVysledekDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GBarCastkyDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro balancování částek*/
	interface GBarCastkyDto {
		/**c0_new*/
		c0_new?: JsonDecimal|null;
		/**c1_new*/
		c1_new?: JsonDecimal|null;
		/**c0_new_balanc*/
		c0_new_balanc?: JsonDecimal|null;
		/**c1_new_balanc*/
		c1_new_balanc?: JsonDecimal|null;
		/**procent*/
		procent?: JsonDecimal|null;
		/**rozdil*/
		rozdil?: JsonDecimal|null;
	}
	const enum GBarCastkyDtoNames { c0_new = "c0_new", c1_new = "c1_new", c0_new_balanc = "c0_new_balanc", c1_new_balanc = "c1_new_balanc", procent = "procent", rozdil = "rozdil",}
	const enum GBarCastkyDtoFragments { c0_new = "main", c1_new = "main", c0_new_balanc = "main", c1_new_balanc = "main", procent = "main", rozdil = "main",}
	const enum GBarCastkyDtoTypes { c0_new = "JsonDecimal", c1_new = "JsonDecimal", c0_new_balanc = "JsonDecimal", c1_new_balanc = "JsonDecimal", procent = "JsonDecimal", rozdil = "JsonDecimal",}
	const enum GBarCastkyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GBarChybySchvaleniDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro vypis chyb pri kontorle na prouctovani*/
	interface GBarChybySchvaleniDto {
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
	const enum GBarChybySchvaleniDtoNames { rok = "rok", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", ac = "ac", radek_z = "radek_z", err_code = "err_code", popischyby = "popischyby", txt_err = "txt_err", nks = "nks", ixp = "ixp", drd = "drd", aktivita = "aktivita", den = "den", c0 = "c0", c1 = "c1", typ_ag = "typ_ag", stav_kch = "stav_kch", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen",}
	const enum GBarChybySchvaleniDtoFragments { rok = "main", lic = "main", ico = "main", ucs = "main", mesic = "main", ac = "main", radek_z = "main", err_code = "main", popischyby = "main", txt_err = "main", nks = "main", ixp = "main", drd = "main", aktivita = "main", den = "main", c0 = "main", c1 = "main", typ_ag = "main", stav_kch = "main", dat_zmena = "main", zmenu_prov = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", uek = "main", uel = "main", uem = "main", uen = "main",}
	const enum GBarChybySchvaleniDtoTypes { rok = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", ac = "string", radek_z = "number", err_code = "number", popischyby = "string", txt_err = "string", nks = "string", ixp = "string", drd = "number", aktivita = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", typ_ag = "number", stav_kch = "number", dat_zmena = "JsonDate", zmenu_prov = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string",}
	const enum GBarChybySchvaleniDtoTypeLengths { lic = 9, ico = 21, ucs = 21, ac = 41, popischyby = 509, txt_err = 509, nks = 25, ixp = 25, zmenu_prov = 25, te0 = 33, te1 = 33, te2 = 33, te3 = 13, te4 = 25, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uea = 7, ueb = 9, uec = 25, ued = 25, uee = 25, uef = 7, ueg = 33, ueh = 9, uei = 9, uej = 25, uek = 6, uel = 10, uem = 10, uen = 6,}
	/**Filtr pro Seznam davek*/
	const enum GBarSchvaleniFilter {
		/**typ*/
		typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GBardn00Dto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Bardn00*/
	interface GBardn00Dto {
		/**rok*/
		rok?: number|null;
		/**verze c*/
		verze_c?: string|null;
		/**verze k*/
		verze_k?: number|null;
		/**lic*/
		lic?: string|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**mesic*/
		mesic?: number|null;
		/**komp*/
		komp?: string|null;
		/**radek z*/
		radek_z?: number|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**Typ org*/
		typ_org?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**drd*/
		drd?: number|null;
		/**den*/
		den?: number|null;
		/**c0*/
		c0?: JsonDecimal|null;
		/**c1*/
		c1?: JsonDecimal|null;
		/**c0 new*/
		c0_new?: JsonDecimal|null;
		/**c1 new*/
		c1_new?: JsonDecimal|null;
		/**pp*/
		pp?: JsonDecimal|null;
		/**pv*/
		pv?: JsonDecimal|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
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
		/**popis*/
		popis?: string|null;
		/**t ičo*/
		t_ico?: string|null;
		/**t nks*/
		t_nks?: string|null;
		/**t te0*/
		t_te0?: string|null;
		/**t te1*/
		t_te1?: string|null;
		/**sor id*/
		sor_id?: number|null;
		/**c0 it*/
		c0_it?: JsonDecimal|null;
		/**c1 it*/
		c1_it?: JsonDecimal|null;
		/**m*/
		m?: JsonDecimal|null;
		/**m new*/
		m_new?: JsonDecimal|null;
		/**m it*/
		m_it?: JsonDecimal|null;
		/**xpf fs*/
		xpf_fs?: string|null;
		/**xpf pf*/
		xpf_pf?: string|null;
		/**priz blok*/
		priz_blok?: number|null;
		/**komodita*/
		komodita?: string|null;
		/**účtárna*/
		uus?: string|null;
		/**ixp prim*/
		ixp_prim?: string|null;
		/**nazev_rf změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**nazev_rf změnu provedl*/
		klik?: string|null;
	}
	const enum GBardn00DtoNames { rok = "rok", verze_c = "verze_c", verze_k = "verze_k", lic = "lic", ico = "ico", ucs = "ucs", mesic = "mesic", komp = "komp", radek_z = "radek_z", nks = "nks", typ_org = "typ_org", ixp = "ixp", drd = "drd", den = "den", c0 = "c0", c1 = "c1", c0_new = "c0_new", c1_new = "c1_new", pp = "pp", pv = "pv", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", popis = "popis", t_ico = "t_ico", t_nks = "t_nks", t_te0 = "t_te0", t_te1 = "t_te1", sor_id = "sor_id", c0_it = "c0_it", c1_it = "c1_it", m = "m", m_new = "m_new", m_it = "m_it", xpf_fs = "xpf_fs", xpf_pf = "xpf_pf", priz_blok = "priz_blok", komodita = "komodita", uus = "uus", ixp_prim = "ixp_prim", zmenu_prov_txt = "zmenu_prov_txt", klik = "klik",}
	const enum GBardn00DtoFragments { rok = "main", verze_c = "main", verze_k = "main", lic = "main", ico = "main", ucs = "main", mesic = "main", komp = "main", radek_z = "main", nks = "main", typ_org = "main", ixp = "main", drd = "main", den = "main", c0 = "main", c1 = "main", c0_new = "main", c1_new = "main", pp = "main", pv = "main", dat_zmena = "main", zmenu_prov = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", popis = "main", t_ico = "main", t_nks = "main", t_te0 = "main", t_te1 = "main", sor_id = "main", c0_it = "main", c1_it = "main", m = "main", m_new = "main", m_it = "main", xpf_fs = "main", xpf_pf = "main", priz_blok = "main", komodita = "main", uus = "main", ixp_prim = "main", zmenu_prov_txt = "main", klik = "main",}
	const enum GBardn00DtoTypes { rok = "number", verze_c = "string", verze_k = "number", lic = "string", ico = "string", ucs = "string", mesic = "number", komp = "string", radek_z = "number", nks = "string", typ_org = "number", ixp = "string", drd = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", c0_new = "JsonDecimal", c1_new = "JsonDecimal", pp = "JsonDecimal", pv = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", popis = "string", t_ico = "string", t_nks = "string", t_te0 = "string", t_te1 = "string", sor_id = "number", c0_it = "JsonDecimal", c1_it = "JsonDecimal", m = "JsonDecimal", m_new = "JsonDecimal", m_it = "JsonDecimal", xpf_fs = "string", xpf_pf = "string", priz_blok = "number", komodita = "string", uus = "string", ixp_prim = "string", zmenu_prov_txt = "string", klik = "string",}
	const enum GBardn00DtoTypeLengths { verze_c = 10, lic = 4, ico = 10, ucs = 10, komp = 10, nks = 12, ixp = 12, zmenu_prov = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, popis = 254, t_ico = 50, t_nks = 50, t_te0 = 50, t_te1 = 200, xpf_fs = 20, xpf_pf = 63, komodita = 15, uus = 10, ixp_prim = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GBarSchvaleniDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Inusimp*/
	interface GBarSchvaleniDto {
		/**ixs imp*/
		ixs_imp?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**popis*/
		popis?: string|null;
		/**Stav imp*/
		stav_imp?: number|null;
		/**Stav imp*/
		typ_kontroly?: number|null;
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
	const enum GBarSchvaleniDtoNames { ixs_imp = "ixs_imp", zkratka = "zkratka", popis = "popis", stav_imp = "stav_imp", typ_kontroly = "typ_kontroly", soubor = "soubor", dat_zmena_nact = "dat_zmena_nact", dat_zmena_zprac = "dat_zmena_zprac", zmenu_prov_nact = "zmenu_prov_nact", zmenu_prov_zprac = "zmenu_prov_zprac", typ = "typ", kon_suma = "kon_suma", zmenu_prov_nact_txt = "zmenu_prov_nact_txt", zmenu_prov_zprac_txt = "zmenu_prov_zprac_txt", stav_imp_txt = "stav_imp_txt", vlastnik = "vlastnik", priloha = "priloha", in_ixp_den = "in_ixp_den", in_ixs_fun = "in_ixs_fun", in_ixs_su = "in_ixs_su", in_ixs_typ = "in_ixs_typ", in_ktg_typ = "in_ktg_typ", in_subrada = "in_subrada", v_err_code = "v_err_code", v_sql_err = "v_sql_err", v_isam_err = "v_isam_err", v_txt_err = "v_txt_err", o_lok_err = "o_lok_err", o_hlaska = "o_hlaska",}
	const enum GBarSchvaleniDtoFragments { ixs_imp = "main", zkratka = "main", popis = "main", stav_imp = "main", typ_kontroly = "main", soubor = "main", dat_zmena_nact = "main", dat_zmena_zprac = "main", zmenu_prov_nact = "main", zmenu_prov_zprac = "main", typ = "main", kon_suma = "main", zmenu_prov_nact_txt = "main", zmenu_prov_zprac_txt = "main", stav_imp_txt = "stav_imp_txt", vlastnik = "main", priloha = "main", in_ixp_den = "main", in_ixs_fun = "main", in_ixs_su = "main", in_ixs_typ = "main", in_ktg_typ = "main", in_subrada = "main", v_err_code = "*", v_sql_err = "*", v_isam_err = "*", v_txt_err = "*", o_lok_err = "*", o_hlaska = "*",}
	const enum GBarSchvaleniDtoTypes { ixs_imp = "string", zkratka = "string", popis = "string", stav_imp = "number", typ_kontroly = "number", soubor = "string", dat_zmena_nact = "JsonDate", dat_zmena_zprac = "JsonDate", zmenu_prov_nact = "string", zmenu_prov_zprac = "string", typ = "string", kon_suma = "string", zmenu_prov_nact_txt = "string", zmenu_prov_zprac_txt = "string", stav_imp_txt = "string", vlastnik = "string", priloha = "string", in_ixp_den = "string", in_ixs_fun = "string", in_ixs_su = "string", in_ixs_typ = "string", in_ktg_typ = "number", in_subrada = "number", v_err_code = "number", v_sql_err = "number", v_isam_err = "number", v_txt_err = "string", o_lok_err = "string", o_hlaska = "string",}
	const enum GBarSchvaleniDtoTypeLengths { ixs_imp = 12, zkratka = 254, popis = 254, soubor = 254, zmenu_prov_nact = 12, zmenu_prov_zprac = 12, typ = 5, kon_suma = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GBarsverDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Barsver*/
	interface GBarsverDto {
		/**ičo*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**komp dec*/
		komp_dec?: string|null;
		/**komp dec*/
		komp_dec_txt?: string|null;
		/**verze c*/
		verze_c?: string|null;
		/**verze k*/
		verze_k?: number|null;
		/**s nav*/
		s_nav?: number|null;
		/**priz sehr*/
		priz_sehr?: number|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**nazev_rf změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**c max*/
		c_max?: JsonDecimal|null;
		/**verze c num*/
		verze_c_num?: number|null;
		/**popis*/
		popis?: string|null;
		/**priz prac*/
		priz_prac?: number|null;
		/**priz xx*/
		priz_xx?: number|null;
		/**priz_sehr_txt*/
		priz_sehr_txt?: string|null;
		/**s_nav_txt*/
		s_nav_txt?: string|null;
	}
	const enum GBarsverDtoNames { ico = "ico", rok = "rok", komp_dec = "komp_dec", komp_dec_txt = "komp_dec_txt", verze_c = "verze_c", verze_k = "verze_k", s_nav = "s_nav", priz_sehr = "priz_sehr", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", c_max = "c_max", verze_c_num = "verze_c_num", popis = "popis", priz_prac = "priz_prac", priz_xx = "priz_xx", priz_sehr_txt = "priz_sehr_txt", s_nav_txt = "s_nav_txt",}
	const enum GBarsverDtoFragments { ico = "main", rok = "main", komp_dec = "main", komp_dec_txt = "main", verze_c = "main", verze_k = "main", s_nav = "main", priz_sehr = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main", c_max = "main", verze_c_num = "main", popis = "main", priz_prac = "main", priz_xx = "main", priz_sehr_txt = "priz_sehr_txt", s_nav_txt = "s_nav_txt",}
	const enum GBarsverDtoTypes { ico = "string", rok = "number", komp_dec = "string", komp_dec_txt = "string", verze_c = "string", verze_k = "number", s_nav = "number", priz_sehr = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", c_max = "JsonDecimal", verze_c_num = "number", popis = "string", priz_prac = "number", priz_xx = "number", priz_sehr_txt = "string", s_nav_txt = "string",}
	const enum GBarsverDtoTypeLengths { ico = 10, komp_dec = 10, verze_c = 10, zmenu_prov = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GBarVerzeDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Bardn00*/
	interface GBarVerzeDto {
		/**rok*/
		rok?: number|null;
		/**ičo*/
		ico?: string|null;
		/**verze c*/
		verze_c?: string|null;
		/**verze k*/
		verze_k?: number|null;
		/**lic*/
		data_bar?: Gordic.Bar.Interface.GBardn00Dto[]|null;
	}
	const enum GBarVerzeDtoNames { rok = "rok", ico = "ico", verze_c = "verze_c", verze_k = "verze_k", data_bar = "data_bar",}
	const enum GBarVerzeDtoFragments { rok = "main", ico = "main", verze_c = "main", verze_k = "main", data_bar = "main",}
	const enum GBarVerzeDtoTypes { rok = "number", ico = "string", verze_c = "string", verze_k = "number", data_bar = "Gordic.Bar.Interface.GBardn00Dto[]",}
	const enum GBarVerzeDtoTypeLengths { ico = 10, verze_c = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GEkosrarDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DBTABLE:ekosrar*/
	interface GEkosrarDto {
		/**DBCOLUMN:ekosrar.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekosrar.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosrar.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ekosrar.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:ekosrar.org*/
		org?: string|null;
		/**DBCOLUMN:ekosrar.dor2*/
		dor2?: string|null;
	}
	const enum GEkosrarDtoNames { ico = "ico", aktivita = "aktivita", nazev = "nazev", typ_org = "typ_org", org = "org", dor2 = "dor2",}
	const enum GEkosrarDtoFragments { ico = "*", aktivita = "*", nazev = "*", typ_org = "*", org = "*", dor2 = "*",}
	const enum GEkosrarDtoTypes { ico = "string", aktivita = "number", nazev = "string", typ_org = "number", org = "string", dor2 = "string",}
	const enum GEkosrarDtoTypeLengths { ico = 10, nazev = 120, org = 16, dor2 = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GServisVysledekDto.d.ts 

declare namespace Gordic.Bar.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GSeznamBarFilterDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**Filtr pro seznam dokladu*/
	interface GSeznamBarFilterDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**ixs_cia*/
		ixp?: string|null;
		/**Cislo akce*/
		cislo?: GIntervalDto<string>|null;
		/**Aktivita*/
		aktivita?: GBaseFilter<number>|null;
		/**Nazev*/
		nazev?: GBaseFilter<string>|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: GBaseFilter<string>|null;
		/**cfuDto*/
		cfuDto?: Gordic.Eko.Interface.GCfuFilterDto[]|null;
		/**DBCOLUMN:SeznamDokladu.skp_akce*/
		skp_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akce*/
		psk_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.fin_od*/
		fin_od?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDokladu.fin_do*/
		fin_do?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDokladu.real_od*/
		real_od?: GIntervalDto<number>|null;
		/**DBCOLUMN:SeznamDokladu.real_do*/
		real_do?: GIntervalDto<number>|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**nazevFiltru*/
		nazevFiltru?: string|null;
	}
	const enum GSeznamBarFilterDtoNames { ico = "ico", rok = "rok", ixp = "ixp", cislo = "cislo", aktivita = "aktivita", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", cfuDto = "cfuDto", skp_akce = "skp_akce", psk_akce = "psk_akce", nks = "nks", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", dat_zmena = "dat_zmena", nazevFiltru = "nazevFiltru",}
	const enum GSeznamBarFilterDtoFragments { ico = "*", rok = "*", ixp = "*", cislo = "*", aktivita = "*", nazev = "*", ixs_fun_akt = "*", cfuDto = "*", skp_akce = "*", psk_akce = "*", nks = "*", fin_od = "*", fin_do = "*", real_od = "*", real_do = "*", dat_zmena = "*", nazevFiltru = "*",}
	const enum GSeznamBarFilterDtoTypes { ico = "string", rok = "number", ixp = "string", cislo = "GIntervalDto<string>", aktivita = "GBaseFilter<number>", nazev = "GBaseFilter<string>", ixs_fun_akt = "GBaseFilter<string>", cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", skp_akce = "string", psk_akce = "string", nks = "string", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", real_od = "GIntervalDto<number>", real_do = "GIntervalDto<number>", dat_zmena = "JsonDate", nazevFiltru = "string",}
	const enum GSeznamBarFilterDtoTypeLengths { nazev = 100, ixs_fun_akt = 12, skp_akce = 6, psk_akce = 4, nks = 12,}
	/**Enum pro elementy masky*/
	const enum MaskaElementyEnum {
		/**Elementy*/
		Element,
	}
	/**DTO ulozeneho filtru*/
	interface GSeznamAdaFilterStoredDto extends Gordic.Bar.Interface.GSeznamBarFilterDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamAdaFilterStoredDtoNames { id = "id", name = "name", description = "description", ico = "ico", rok = "rok", ixp = "ixp", cislo = "cislo", aktivita = "aktivita", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", cfuDto = "cfuDto", skp_akce = "skp_akce", psk_akce = "psk_akce", nks = "nks", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", dat_zmena = "dat_zmena", nazevFiltru = "nazevFiltru",}
	const enum GSeznamAdaFilterStoredDtoFragments { id = "*", name = "*", description = "*", ico = "*", rok = "*", ixp = "*", cislo = "*", aktivita = "*", nazev = "*", ixs_fun_akt = "*", cfuDto = "*", skp_akce = "*", psk_akce = "*", nks = "*", fin_od = "*", fin_do = "*", real_od = "*", real_do = "*", dat_zmena = "*", nazevFiltru = "*",}
	const enum GSeznamAdaFilterStoredDtoTypes { id = "string", name = "string", description = "string", ico = "string", rok = "number", ixp = "string", cislo = "GIntervalDto<string>", aktivita = "GBaseFilter<number>", nazev = "GBaseFilter<string>", ixs_fun_akt = "GBaseFilter<string>", cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", skp_akce = "string", psk_akce = "string", nks = "string", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", real_od = "GIntervalDto<number>", real_do = "GIntervalDto<number>", dat_zmena = "JsonDate", nazevFiltru = "string",}
	const enum GSeznamAdaFilterStoredDtoTypeLengths { nazev = 100, ixs_fun_akt = 12, skp_akce = 6, psk_akce = 4, nks = 12,}
	/**Výèet filtraèních kritérií pro filtr seznamu Akcí*/
	const enum FilDokladyBarAg {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**ixp*/
		ixp,
		/**cislo*/
		cislo,
		/**rok_od*/
		rok_od,
		/**rok_do*/
		rok_do,
		/**rok_srv*/
		rok_srv,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GSrvdixpDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Srvdixp*/
	interface GSrvdixpDto {
		/**rok srv*/
		rok_srv?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**číslo*/
		cislo?: string|null;
		/**radek z*/
		radek_z?: number|null;
		/**rok*/
		rok?: number|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**mesic*/
		mesic?: number|null;
		/**komp*/
		komp?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**drd*/
		drd?: number|null;
		/**den*/
		den?: number|null;
		/**c0*/
		c0?: JsonDecimal|null;
		/**c1*/
		c1?: JsonDecimal|null;
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
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
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
		/**popis*/
		popis?: string|null;
		/**t ičo*/
		t_ico?: string|null;
		/**t nks*/
		t_nks?: string|null;
		/**c0 s*/
		c0_s?: JsonDecimal|null;
		/**c1 s*/
		c1_s?: JsonDecimal|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**xpf pf*/
		xpf_pf?: string|null;
		/**xpf fs*/
		xpf_fs?: string|null;
		/**komodita*/
		komodita?: string|null;
		/**Typ org*/
		typ_org?: number|null;
		/**účtárna*/
		uus?: string|null;
		/**priz blok*/
		priz_blok?: number|null;
		/**ixp prim*/
		ixp_prim?: string|null;
		/**ixp roz*/
		ixp_roz?: string|null;
		/**xuete*/
		xuete?: string|null;
		/**nazev_rf změnu provedl*/
		zmenu_prov_txt?: string|null;
	}
	const enum GSrvdixpDtoNames { rok_srv = "rok_srv", ixp = "ixp", cislo = "cislo", radek_z = "radek_z", rok = "rok", ico = "ico", ucs = "ucs", mesic = "mesic", komp = "komp", nks = "nks", drd = "drd", den = "den", c0 = "c0", c1 = "c1", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis = "popis", t_ico = "t_ico", t_nks = "t_nks", c0_s = "c0_s", c1_s = "c1_s", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", xpf_pf = "xpf_pf", xpf_fs = "xpf_fs", komodita = "komodita", typ_org = "typ_org", uus = "uus", priz_blok = "priz_blok", ixp_prim = "ixp_prim", ixp_roz = "ixp_roz", xuete = "xuete", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GSrvdixpDtoFragments { rok_srv = "main", ixp = "main", cislo = "main", radek_z = "main", rok = "main", ico = "main", ucs = "main", mesic = "main", komp = "main", nks = "main", drd = "main", den = "main", c0 = "main", c1 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", popis = "main", t_ico = "main", t_nks = "main", c0_s = "main", c1_s = "main", dat_zmena = "main", zmenu_prov = "main", aktivita = "main", xpf_pf = "main", xpf_fs = "main", komodita = "main", typ_org = "main", uus = "main", priz_blok = "main", ixp_prim = "main", ixp_roz = "main", xuete = "main", zmenu_prov_txt = "main",}
	const enum GSrvdixpDtoTypes { rok_srv = "number", ixp = "string", cislo = "string", radek_z = "number", rok = "number", ico = "string", ucs = "string", mesic = "number", komp = "string", nks = "string", drd = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis = "string", t_ico = "string", t_nks = "string", c0_s = "JsonDecimal", c1_s = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", xpf_pf = "string", xpf_fs = "string", komodita = "string", typ_org = "number", uus = "string", priz_blok = "number", ixp_prim = "string", ixp_roz = "string", xuete = "string", zmenu_prov_txt = "string",}
	const enum GSrvdixpDtoTypeLengths { ixp = 12, cislo = 16, ico = 10, ucs = 10, komp = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, popis = 254, t_ico = 50, t_nks = 50, zmenu_prov = 12, xpf_pf = 63, xpf_fs = 20, komodita = 15, uus = 10, ixp_prim = 12, ixp_roz = 12, xuete = 148,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GSrvdixwDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Srvdixw*/
	interface GSrvdixwDto {
		/**rok srv*/
		rok_srv?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**číslo*/
		cislo?: string|null;
		/**ac*/
		ac?: string|null;
		/**radek z*/
		radek_z?: number|null;
		/**rok*/
		rok?: number|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**mesic*/
		mesic?: number|null;
		/**komp*/
		komp?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**drd*/
		drd?: number|null;
		/**den*/
		den?: number|null;
		/**c0*/
		c0?: JsonDecimal|null;
		/**c1*/
		c1?: JsonDecimal|null;
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
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
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
		/**popis*/
		popis?: string|null;
		/**t ičo*/
		t_ico?: string|null;
		/**t nks*/
		t_nks?: string|null;
		/**c0 s*/
		c0_s?: JsonDecimal|null;
		/**c1 s*/
		c1_s?: JsonDecimal|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**xpf pf*/
		xpf_pf?: string|null;
		/**xpf fs*/
		xpf_fs?: string|null;
		/**komodita*/
		komodita?: string|null;
		/**Typ org*/
		typ_org?: number|null;
		/**účtárna*/
		uus?: string|null;
		/**priz blok*/
		priz_blok?: number|null;
		/**ixp prim*/
		ixp_prim?: string|null;
		/**ixp roz*/
		ixp_roz?: string|null;
		/**xuete*/
		xuete?: string|null;
		/**nazev_rf změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**ixs_imp*/
		ixs_imp?: string|null;
	}
	const enum GSrvdixwDtoNames { rok_srv = "rok_srv", ixp = "ixp", cislo = "cislo", ac = "ac", radek_z = "radek_z", rok = "rok", ico = "ico", ucs = "ucs", mesic = "mesic", komp = "komp", nks = "nks", drd = "drd", den = "den", c0 = "c0", c1 = "c1", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", popis = "popis", t_ico = "t_ico", t_nks = "t_nks", c0_s = "c0_s", c1_s = "c1_s", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", xpf_pf = "xpf_pf", xpf_fs = "xpf_fs", komodita = "komodita", typ_org = "typ_org", uus = "uus", priz_blok = "priz_blok", ixp_prim = "ixp_prim", ixp_roz = "ixp_roz", xuete = "xuete", zmenu_prov_txt = "zmenu_prov_txt", ixs_imp = "ixs_imp",}
	const enum GSrvdixwDtoFragments { rok_srv = "main", ixp = "main", cislo = "main", ac = "main", radek_z = "main", rok = "main", ico = "main", ucs = "main", mesic = "main", komp = "main", nks = "main", drd = "main", den = "main", c0 = "main", c1 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uek = "main", uel = "main", uem = "main", uen = "main", te5 = "main", te6 = "main", te7 = "main", te8 = "main", te9 = "main", popis = "main", t_ico = "main", t_nks = "main", c0_s = "main", c1_s = "main", dat_zmena = "main", zmenu_prov = "main", aktivita = "main", xpf_pf = "main", xpf_fs = "main", komodita = "main", typ_org = "main", uus = "main", priz_blok = "main", ixp_prim = "main", ixp_roz = "main", xuete = "main", zmenu_prov_txt = "main", ixs_imp = "main",}
	const enum GSrvdixwDtoTypes { rok_srv = "number", ixp = "string", cislo = "string", ac = "string", radek_z = "number", rok = "number", ico = "string", ucs = "string", mesic = "number", komp = "string", nks = "string", drd = "number", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", popis = "string", t_ico = "string", t_nks = "string", c0_s = "JsonDecimal", c1_s = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", xpf_pf = "string", xpf_fs = "string", komodita = "string", typ_org = "number", uus = "string", priz_blok = "number", ixp_prim = "string", ixp_roz = "string", xuete = "string", zmenu_prov_txt = "string", ixs_imp = "string",}
	const enum GSrvdixwDtoTypeLengths { ixp = 12, cislo = 16, ac = 30, ico = 10, ucs = 10, komp = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, popis = 254, t_ico = 50, t_nks = 50, zmenu_prov = 12, xpf_pf = 63, xpf_fs = 20, komodita = 15, uus = 10, ixp_prim = 12, ixp_roz = 12, xuete = 148, ixs_imp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GSrvscfuDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Srvscfu*/
	interface GSrvscfuDto {
		/**rok*/
		rok?: number|null;
		/**ičo*/
		ico?: string|null;
		/**uroven num*/
		uroven_num?: number|null;
		/**uroven*/
		uroven?: string|null;
		/**db název*/
		db_nazev?: string|null;
		/**název*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poradi*/
		poradi?: number|null;
		/**pouziti*/
		pouziti?: number|null;
		/**pouziti_eko*/
		pouziti_ekocfu?: number|null;
		/**prazdny*/
		prazdny?: string|null;
		/**zobrazovany*/
		zobrazovany?: string|null;
		/**delka*/
		delka?: number|null;
		/**delka db*/
		delka_db?: number|null;
		/**uroven ginis*/
		uroven_ginis?: string|null;
		/**atribut*/
		atribut?: string|null;
		/**název zobr*/
		nazev_zobr?: string|null;
	}
	const enum GSrvscfuDtoNames { rok = "rok", ico = "ico", uroven_num = "uroven_num", uroven = "uroven", db_nazev = "db_nazev", nazev = "nazev", zkratka = "zkratka", poradi = "poradi", pouziti = "pouziti", pouziti_ekocfu = "pouziti_ekocfu", prazdny = "prazdny", zobrazovany = "zobrazovany", delka = "delka", delka_db = "delka_db", uroven_ginis = "uroven_ginis", atribut = "atribut", nazev_zobr = "nazev_zobr",}
	const enum GSrvscfuDtoFragments { rok = "main", ico = "main", uroven_num = "main", uroven = "main", db_nazev = "main", nazev = "main", zkratka = "main", poradi = "main", pouziti = "main", pouziti_ekocfu = "main", prazdny = "main", zobrazovany = "main", delka = "main", delka_db = "main", uroven_ginis = "main", atribut = "main", nazev_zobr = "main",}
	const enum GSrvscfuDtoTypes { rok = "number", ico = "string", uroven_num = "number", uroven = "string", db_nazev = "string", nazev = "string", zkratka = "string", poradi = "number", pouziti = "number", pouziti_ekocfu = "number", prazdny = "string", zobrazovany = "string", delka = "number", delka_db = "number", uroven_ginis = "string", atribut = "string", nazev_zobr = "string",}
	const enum GSrvscfuDtoTypeLengths { ico = 10, uroven = 1, db_nazev = 3, nazev = 50, zkratka = 16, prazdny = 13, zobrazovany = 13, uroven_ginis = 2, atribut = 1, nazev_zobr = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GSrvsixpDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Srvsixp*/
	interface GSrvsixpDto {
		/**rok srv*/
		rok_srv?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**číslo*/
		cislo?: string|null;
		/**název*/
		nazev?: string|null;
		/**Typ*/
		typ?: number|null;
		/**Typ_txt*/
		typ_txt?: string|null;
		/**adresa1*/
		adresa1?: string|null;
		/**adresa2*/
		adresa2?: string|null;
		/**psc*/
		psc?: string|null;
		/**adresa3*/
		adresa3?: string|null;
		/**fin od*/
		fin_od?: number|null;
		/**fin do*/
		fin_do?: number|null;
		/**real od*/
		real_od?: number|null;
		/**real do*/
		real_do?: number|null;
		/**příjmení*/
		prijmeni?: string|null;
		/**jméno*/
		jmeno?: string|null;
		/**os číslo*/
		os_cislo?: string|null;
		/**telefon*/
		telefon?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**c celk*/
		c_celk?: JsonDecimal|null;
		/**c min sk*/
		c_min_sk?: JsonDecimal|null;
		/**c min roz*/
		c_min_roz?: JsonDecimal|null;
		/**c akt poz*/
		c_akt_poz?: JsonDecimal|null;
		/**c dal poz*/
		c_dal_poz?: JsonDecimal|null;
		/**ktg akce*/
		ktg_akce?: number|null;
		/**datum inv maj*/
		dat_inv_maj?: JsonDate|null;
		/**skp akce*/
		skp_akce?: string|null;
		/**psk akce*/
		psk_akce?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**t nks*/
		t_nks?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**c celk puv*/
		c_celk_puv?: JsonDecimal|null;
		/**orj puv*/
		orj_puv?: string|null;
		/**xpf pf*/
		xpf_pf?: string|null;
		/**xpf nato*/
		xpf_nato?: string|null;
		/**c nato*/
		c_nato?: JsonDecimal|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**funkce akt*/
		ixs_fun_akt?: string|null;
		/**ixs_fun_akt_nazev*/
		ixs_fun_akt_nazev?: string|null;
		/**ixs_fun_akt_nazev_ref*/
		ixs_fun_akt_nazev_ref?: string|null;
		/**upresneni*/
		upresneni?: string|null;
		/**nazev_rf změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**vlastnictvi*/
		vlastnictvi?: number|null;
		/**new funkce akt*/
		new_ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.aktivita_s*/
		aktivita_s?: string|null;
		/**ixs_imp*/
		ixs_imp?: string|null;
		/**Permissions*/
		Permissions?: Gordic.Bar.Interface.GPozadavekPermissions|null;
	}
	const enum GSrvsixpDtoNames { rok_srv = "rok_srv", ixp = "ixp", cislo = "cislo", nazev = "nazev", typ = "typ", typ_txt = "typ_txt", adresa1 = "adresa1", adresa2 = "adresa2", psc = "psc", adresa3 = "adresa3", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", prijmeni = "prijmeni", jmeno = "jmeno", os_cislo = "os_cislo", telefon = "telefon", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_celk = "c_celk", c_min_sk = "c_min_sk", c_min_roz = "c_min_roz", c_akt_poz = "c_akt_poz", c_dal_poz = "c_dal_poz", ktg_akce = "ktg_akce", dat_inv_maj = "dat_inv_maj", skp_akce = "skp_akce", psk_akce = "psk_akce", aktivita = "aktivita", t_nks = "t_nks", nks = "nks", c_celk_puv = "c_celk_puv", orj_puv = "orj_puv", xpf_pf = "xpf_pf", xpf_nato = "xpf_nato", c_nato = "c_nato", ico = "ico", ucs = "ucs", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_nazev = "ixs_fun_akt_nazev", ixs_fun_akt_nazev_ref = "ixs_fun_akt_nazev_ref", upresneni = "upresneni", zmenu_prov_txt = "zmenu_prov_txt", vlastnictvi = "vlastnictvi", new_ixs_fun_akt = "new_ixs_fun_akt", aktivita_s = "aktivita_s", ixs_imp = "ixs_imp", Permissions = "Permissions",}
	const enum GSrvsixpDtoFragments { rok_srv = "main", ixp = "main", cislo = "main", nazev = "main", typ = "main", typ_txt = "main", adresa1 = "main", adresa2 = "main", psc = "main", adresa3 = "main", fin_od = "main", fin_do = "main", real_od = "main", real_do = "main", prijmeni = "main", jmeno = "main", os_cislo = "main", telefon = "main", dat_zmena = "main", zmenu_prov = "main", c_celk = "main", c_min_sk = "main", c_min_roz = "main", c_akt_poz = "main", c_dal_poz = "main", ktg_akce = "main", dat_inv_maj = "main", skp_akce = "main", psk_akce = "main", aktivita = "main", t_nks = "main", nks = "main", c_celk_puv = "main", orj_puv = "main", xpf_pf = "main", xpf_nato = "main", c_nato = "main", ico = "main", ucs = "main", ixs_fun_akt = "main", ixs_fun_akt_nazev = "main", ixs_fun_akt_nazev_ref = "main", upresneni = "main", zmenu_prov_txt = "main", vlastnictvi = "*", new_ixs_fun_akt = "main", aktivita_s = "main", ixs_imp = "main", Permissions = "main",}
	const enum GSrvsixpDtoTypes { rok_srv = "number", ixp = "string", cislo = "string", nazev = "string", typ = "number", typ_txt = "string", adresa1 = "string", adresa2 = "string", psc = "string", adresa3 = "string", fin_od = "number", fin_do = "number", real_od = "number", real_do = "number", prijmeni = "string", jmeno = "string", os_cislo = "string", telefon = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c_celk = "JsonDecimal", c_min_sk = "JsonDecimal", c_min_roz = "JsonDecimal", c_akt_poz = "JsonDecimal", c_dal_poz = "JsonDecimal", ktg_akce = "number", dat_inv_maj = "JsonDate", skp_akce = "string", psk_akce = "string", aktivita = "number", t_nks = "string", nks = "string", c_celk_puv = "JsonDecimal", orj_puv = "string", xpf_pf = "string", xpf_nato = "string", c_nato = "JsonDecimal", ico = "string", ucs = "string", ixs_fun_akt = "string", ixs_fun_akt_nazev = "string", ixs_fun_akt_nazev_ref = "string", upresneni = "string", zmenu_prov_txt = "string", vlastnictvi = "number", new_ixs_fun_akt = "string", aktivita_s = "string", ixs_imp = "string", Permissions = "Gordic.Bar.Interface.GPozadavekPermissions",}
	const enum GSrvsixpDtoTypeLengths { ixp = 12, cislo = 16, nazev = 254, adresa1 = 50, adresa2 = 50, psc = 12, adresa3 = 50, prijmeni = 100, jmeno = 100, os_cislo = 10, telefon = 254, zmenu_prov = 12, skp_akce = 6, psk_akce = 4, t_nks = 50, nks = 12, orj_puv = 4, xpf_pf = 63, xpf_nato = 20, ico = 10, ucs = 10, ixs_fun_akt = 12, ixs_fun_akt_nazev = 12, ixs_fun_akt_nazev_ref = 12, upresneni = 254, new_ixs_fun_akt = 12, ixs_imp = 12,}
	/**GAkcePermissions*/
	interface GPozadavekPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**CanRead*/
		LzeCist: Gordic.General.ApplicationInterface.GPermission;
		/**CanEdit*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**CanDelete*/
		LzeMazat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePredat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePrevzit*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**LzePreevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**JsemVlastnik*/
		JsemVlastnik: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPozadavekPermissionsNames { LzeCist = "LzeCist", LzeEditovat = "LzeEditovat", LzeMazat = "LzeMazat", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat", JsemVlastnik = "JsemVlastnik",}
	const enum GPozadavekPermissionsFragments { LzeCist = "*", LzeEditovat = "*", LzeMazat = "*", LzePredat = "*", LzePrevzit = "*", LzePreevidovat = "*", JsemVlastnik = "*",}
	const enum GPozadavekPermissionsTypes { LzeCist = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeMazat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", JsemVlastnik = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPozadavekPermissionsTypeLengths {}
	/**GAkcePermissions*/
	interface GPozadavekServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**CanCreate*/
		LzeVytvorit: Gordic.General.ApplicationInterface.GPermission;
		/**CanEdit*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**CanDelete*/
		LzeMazat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePredat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**LzePrevzit*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**LzePreevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPozadavekServicePermissionsNames { LzeVytvorit = "LzeVytvorit", LzeEditovat = "LzeEditovat", LzeMazat = "LzeMazat", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat",}
	const enum GPozadavekServicePermissionsFragments { LzeVytvorit = "*", LzeEditovat = "*", LzeMazat = "*", LzePredat = "*", LzePrevzit = "*", LzePreevidovat = "*",}
	const enum GPozadavekServicePermissionsTypes { LzeVytvorit = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeMazat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPozadavekServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GSrvsixwDto.d.ts 

declare namespace Gordic.Bar.Interface {
	/**DTO pro Srvsixp*/
	interface GSrvsixwDto {
		/**rok srv*/
		rok_srv?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**číslo*/
		cislo?: string|null;
		/**název*/
		nazev?: string|null;
		/**Typ*/
		typ?: number|null;
		/**Typ_txt*/
		typ_txt?: string|null;
		/**adresa1*/
		adresa1?: string|null;
		/**adresa2*/
		adresa2?: string|null;
		/**psc*/
		psc?: string|null;
		/**adresa3*/
		adresa3?: string|null;
		/**fin od*/
		fin_od?: number|null;
		/**fin do*/
		fin_do?: number|null;
		/**real od*/
		real_od?: number|null;
		/**real do*/
		real_do?: number|null;
		/**příjmení*/
		prijmeni?: string|null;
		/**jméno*/
		jmeno?: string|null;
		/**os číslo*/
		os_cislo?: string|null;
		/**telefon*/
		telefon?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**c celk*/
		c_celk?: JsonDecimal|null;
		/**c min sk*/
		c_min_sk?: JsonDecimal|null;
		/**c min roz*/
		c_min_roz?: JsonDecimal|null;
		/**c akt poz*/
		c_akt_poz?: JsonDecimal|null;
		/**c dal poz*/
		c_dal_poz?: JsonDecimal|null;
		/**ktg akce*/
		ktg_akce?: number|null;
		/**datum inv maj*/
		dat_inv_maj?: JsonDate|null;
		/**skp akce*/
		skp_akce?: string|null;
		/**psk akce*/
		psk_akce?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**t nks*/
		t_nks?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**c celk puv*/
		c_celk_puv?: JsonDecimal|null;
		/**orj puv*/
		orj_puv?: string|null;
		/**xpf pf*/
		xpf_pf?: string|null;
		/**xpf nato*/
		xpf_nato?: string|null;
		/**c nato*/
		c_nato?: JsonDecimal|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**funkce akt*/
		ixs_fun_akt?: string|null;
		/**ixs_fun_akt_nazev*/
		ixs_fun_akt_nazev?: string|null;
		/**ixs_fun_akt_nazev_ref*/
		ixs_fun_akt_nazev_ref?: string|null;
		/**upresneni*/
		upresneni?: string|null;
		/**nazev_rf změnu provedl*/
		zmenu_prov_txt?: string|null;
		/**vlastnictvi*/
		vlastnictvi?: number|null;
		/**new funkce akt*/
		new_ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.aktivita_s*/
		aktivita_s?: string|null;
		/**ixs_imp*/
		ixs_imp?: string|null;
	}
	const enum GSrvsixwDtoNames { rok_srv = "rok_srv", ixp = "ixp", cislo = "cislo", nazev = "nazev", typ = "typ", typ_txt = "typ_txt", adresa1 = "adresa1", adresa2 = "adresa2", psc = "psc", adresa3 = "adresa3", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", prijmeni = "prijmeni", jmeno = "jmeno", os_cislo = "os_cislo", telefon = "telefon", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_celk = "c_celk", c_min_sk = "c_min_sk", c_min_roz = "c_min_roz", c_akt_poz = "c_akt_poz", c_dal_poz = "c_dal_poz", ktg_akce = "ktg_akce", dat_inv_maj = "dat_inv_maj", skp_akce = "skp_akce", psk_akce = "psk_akce", aktivita = "aktivita", t_nks = "t_nks", nks = "nks", c_celk_puv = "c_celk_puv", orj_puv = "orj_puv", xpf_pf = "xpf_pf", xpf_nato = "xpf_nato", c_nato = "c_nato", ico = "ico", ucs = "ucs", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_nazev = "ixs_fun_akt_nazev", ixs_fun_akt_nazev_ref = "ixs_fun_akt_nazev_ref", upresneni = "upresneni", zmenu_prov_txt = "zmenu_prov_txt", vlastnictvi = "vlastnictvi", new_ixs_fun_akt = "new_ixs_fun_akt", aktivita_s = "aktivita_s", ixs_imp = "ixs_imp",}
	const enum GSrvsixwDtoFragments { rok_srv = "main", ixp = "main", cislo = "main", nazev = "main", typ = "main", typ_txt = "main", adresa1 = "main", adresa2 = "main", psc = "main", adresa3 = "main", fin_od = "main", fin_do = "main", real_od = "main", real_do = "main", prijmeni = "main", jmeno = "main", os_cislo = "main", telefon = "main", dat_zmena = "main", zmenu_prov = "main", c_celk = "main", c_min_sk = "main", c_min_roz = "main", c_akt_poz = "main", c_dal_poz = "main", ktg_akce = "main", dat_inv_maj = "main", skp_akce = "main", psk_akce = "main", aktivita = "main", t_nks = "main", nks = "main", c_celk_puv = "main", orj_puv = "main", xpf_pf = "main", xpf_nato = "main", c_nato = "main", ico = "main", ucs = "main", ixs_fun_akt = "main", ixs_fun_akt_nazev = "main", ixs_fun_akt_nazev_ref = "main", upresneni = "main", zmenu_prov_txt = "main", vlastnictvi = "*", new_ixs_fun_akt = "main", aktivita_s = "main", ixs_imp = "main",}
	const enum GSrvsixwDtoTypes { rok_srv = "number", ixp = "string", cislo = "string", nazev = "string", typ = "number", typ_txt = "string", adresa1 = "string", adresa2 = "string", psc = "string", adresa3 = "string", fin_od = "number", fin_do = "number", real_od = "number", real_do = "number", prijmeni = "string", jmeno = "string", os_cislo = "string", telefon = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c_celk = "JsonDecimal", c_min_sk = "JsonDecimal", c_min_roz = "JsonDecimal", c_akt_poz = "JsonDecimal", c_dal_poz = "JsonDecimal", ktg_akce = "number", dat_inv_maj = "JsonDate", skp_akce = "string", psk_akce = "string", aktivita = "number", t_nks = "string", nks = "string", c_celk_puv = "JsonDecimal", orj_puv = "string", xpf_pf = "string", xpf_nato = "string", c_nato = "JsonDecimal", ico = "string", ucs = "string", ixs_fun_akt = "string", ixs_fun_akt_nazev = "string", ixs_fun_akt_nazev_ref = "string", upresneni = "string", zmenu_prov_txt = "string", vlastnictvi = "number", new_ixs_fun_akt = "string", aktivita_s = "string", ixs_imp = "string",}
	const enum GSrvsixwDtoTypeLengths { ixp = 12, cislo = 16, nazev = 254, adresa1 = 50, adresa2 = 50, psc = 12, adresa3 = 50, prijmeni = 100, jmeno = 100, os_cislo = 10, telefon = 254, zmenu_prov = 12, skp_akce = 6, psk_akce = 4, t_nks = 50, nks = 12, orj_puv = 4, xpf_pf = 63, xpf_nato = 20, ico = 10, ucs = 10, ixs_fun_akt = 12, ixs_fun_akt_nazev = 12, ixs_fun_akt_nazev_ref = 12, upresneni = 254, new_ixs_fun_akt = 12, ixs_imp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Dto\GUctdxwaDto.d.ts 

declare namespace Gordic.Bar.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Init\GBarGlobalsBase.d.ts 

declare namespace Gordic.Bar.Interface {
	/**Přístup k operaci editace kompetentů*/
	const enum PristupKEditaciKompEnum {
		/**Ne*/
		Ne=0,
		/**Ano*/
		Ano=1,
		/**Dle_Detailu*/
		Dle_Detailu=2,
		/**Dle_Kompetenta*/
		Dle_Kompetenta=3,
		/**Dle_Realizatora*/
		Dle_Realizatora=4,
	}
	/**Přístup k operaci editace ISP*/
	const enum PristupKEditaciISPEnum {
		/**Ne*/
		Ne=0,
		/**Ano*/
		Ano=1,
		/**Dle_Detailu*/
		Dle_Detailu=2,
		/**Dle_Kompetenta*/
		Dle_Kompetenta=3,
		/**Dle_Realizatora*/
		Dle_Realizatora=4,
	}
	/**Přístup k operaci*/
	const enum PristupKEditaciEnum {
		/**Ne*/
		Ne=0,
		/**Ano*/
		Ano=1,
		/**Dle_Detailu*/
		Dle_Detailu=2,
	}
	/**Rezim provozu BAR*/
	const enum RezimProvozuEnum {
		/**režim provozu = Základní - vidím vše - default*/
		Zaklad=0,
		/**režim provozu = Realizátor*/
		Real=10,
		/**režim provozu = Kompetent*/
		Komp=20,
	}
	/**Typ instalace SRV*/
	const enum SrvTypIntalaceEnum {
		/**MO*/
		MO=10,
		/**CIVIL*/
		CIVIL=20,
		/**ISTA*/
		ISTA=30,
		/**UO*/
		UP=40,
	}
	/**Typ zpracování BAR*/
	const enum TypZpracovaniEnum {
		/**typ zpracování = online - default*/
		Online=0,
		/**typ zpracování = offline*/
		Offline=10,
	}
	/**Typ zpracování organizací BAR*/
	const enum TypZpOrganEnum {
		/**typ zpracování organizace = NKS - default*/
		Nks=0,
		/**typ zpracování organizace = ADO*/
		Ado=10,
	}
	/**Typ schvalovani akce*/
	const enum TypAutomatSchvaleniNovaAkceEnum {
		/**Typ schvalovani akce - NeAutomat, bez cisla akce*/
		Ne=0,
		/**Typ schvalovani akce - automat*/
		Ano=1,
		/**Typ schvalovani akce - NeAutomat, s cislem akce*/
		NeSCislem=2,
		/**Typ schvalovani akce - NeAutomat, s procesem schvalování*/
		NeSprocesem=3,
	}
	/**Typ preevidence akce*/
	const enum TypPreevidenceAkceEnum {
		/**Typ preevidence akce - ne*/
		Ne=0,
		/**Typ preevidence akce - ano*/
		Ano=1,
		/**Typ preevidence akce - vlastni*/
		Vlastni=2,
	}
	/**Typ preevidence akce*/
	const enum TypPredatPrevzitAkceEnum {
		/**Typ predat akce - ne*/
		Ne=0,
		/**Typ predat akce - ano*/
		Ano=1,
	}
	/**Typ preevidence akce*/
	const enum TypProvedeniOperaceEnum {
		/**Provedeni operace - ne*/
		Ne=0,
		/**Provedeni operace - ano*/
		Ano=1,
	}
	/**AktivitaAkce*/
	const enum AktivitaAkceEnum {
		/**Aktivni*/
		Aktivni=100,
		/**Návrh*/
		Navrh=300,
		/**Neaktivní*/
		Neaktivni=500,
		/**Zrušená*/
		Zrusena=500,
	}
	/**AktivitaAkce*/
	const enum StavRealizaceAkceEnum {
		/**Zpet - dynamicky*/
		Zpet=0,
		/**Schváleno*/
		Schvaleno=110,
		/**Zahajováno*/
		Zahajovano=120,
		/**Realizace*/
		Realizace=130,
		/**Zpožděno*/
		Zpozdeno=140,
		/**Navrh*/
		Navrh=310,
		/**Evidováno*/
		Evidovano=320,
		/**Zaplánováno*/
		Zaplanovano=330,
		/**Zkompletováno*/
		Zkompletovano=340,
		/**Pozastaveno*/
		Pozastaveno=510,
		/**Ukončeno*/
		Ukonceno=520,
		/**Stornováno*/
		Stornovano=910,
	}
	/**Globální parametry pro BAR. Načtené při startu aplikace*/
	interface GBarGlobalsBase {
		/**gin_gen_ixp*/
		gin_gen_ixp?: boolean|null;
		/**akt_kompetence*/
		akt_kompetence?: string|null;
		/**g_verze_c*/
		g_verze_c?: string|null;
		/**g_verze_k*/
		g_verze_k?: number|null;
		/**Je_DSG*/
		Je_DSG?: boolean|null;
		/**Je_DB_388_3_46*/
		Je_DB_388_3_46?: boolean|null;
		/**Typ zpracování organizace*/
		TypZpOrgan?: Gordic.Bar.Interface.TypZpOrganEnum|null;
		/**Typ zpracování	TypZpracovani*/
		TypZpracovani?: Gordic.Bar.Interface.TypZpracovaniEnum|null;
		/**TypZpracovani_Tabulka*/
		TypZpracovani_Tabulka?: string|null;
		/**Editace textoveho profilu*/
		Param_Pozadavek_Editace_TP?: boolean|null;
		/**Editace finančního profilu*/
		Param_Pozadavek_Editace_FP?: boolean|null;
		/**Kontrola na rozvrh v pořizovači*/
		Param_Kontrola_Rozvrh?: boolean|null;
		/**Predat*/
		Param_Pozadavek_Predat?: Gordic.Bar.Interface.TypPredatPrevzitAkceEnum|null;
		/**Prevzit*/
		Param_Pozadavek_Prevzit?: Gordic.Bar.Interface.TypPredatPrevzitAkceEnum|null;
		/**Param_Rezim_Vlastnik*/
		Param_Rezim_Vlastnik?: boolean|null;
		/**BAR_Typ_Inst*/
		BAR_Typ_Inst?: Gordic.Bar.Interface.SrvTypIntalaceEnum|null;
		/**maska čísla plánu ve sloupci TE1*/
		te1_msk?: string|null;
		/**maska čísla plánu ve sloupci TE1 pro ORG*/
		te1_msk_org?: string|null;
		/**nulové číslo akce*/
		te1_msk_nula?: string|null;
		/**příznak, že maska TE1_MSK odpovídá plné délce TE1 - číslo plánu = TE1*/
		b_te1_msk_full?: boolean|null;
		/**start masky čísla plánu v TE1*/
		te1_msk_start?: number|null;
		/**konec masky čísla plánu v TE1*/
		te1_msk_stop?: number|null;
		/**rok sběru*/
		rok_srv?: number|null;
		/**délka akce*/
		delka_akce?: number|null;
		/**PrizCheckUete*/
		PrizCheckUete?: number|null;
		/**titulek_ico_nazev*/
		titulek_ico_nazev?: string|null;
		/**titulek_ucs_nazev*/
		titulek_ucs_nazev?: string|null;
		/**titulek_uus_nazev*/
		titulek_uus_nazev?: string|null;
		/**titulek_nks_nazev*/
		titulek_nks_nazev?: string|null;
		/**titulek_ico*/
		titulek_ico?: string|null;
		/**titulek_ucs*/
		titulek_ucs?: string|null;
		/**titulek_uus*/
		titulek_uus?: string|null;
		/**titulek_nks*/
		titulek_nks?: string|null;
		/**Konfigurace_balanc*/
		Konfigurace_balanc?: Gordic.Bar.Interface.GSrvscfuDto[]|null;
	}
	const enum GBarGlobalsBaseNames { gin_gen_ixp = "gin_gen_ixp", akt_kompetence = "akt_kompetence", g_verze_c = "g_verze_c", g_verze_k = "g_verze_k", Je_DSG = "Je_DSG", Je_DB_388_3_46 = "Je_DB_388_3_46", TypZpOrgan = "TypZpOrgan", TypZpracovani = "TypZpracovani", TypZpracovani_Tabulka = "TypZpracovani_Tabulka", Param_Pozadavek_Editace_TP = "Param_Pozadavek_Editace_TP", Param_Pozadavek_Editace_FP = "Param_Pozadavek_Editace_FP", Param_Kontrola_Rozvrh = "Param_Kontrola_Rozvrh", Param_Pozadavek_Predat = "Param_Pozadavek_Predat", Param_Pozadavek_Prevzit = "Param_Pozadavek_Prevzit", Param_Rezim_Vlastnik = "Param_Rezim_Vlastnik", BAR_Typ_Inst = "BAR_Typ_Inst", te1_msk = "te1_msk", te1_msk_org = "te1_msk_org", te1_msk_nula = "te1_msk_nula", b_te1_msk_full = "b_te1_msk_full", te1_msk_start = "te1_msk_start", te1_msk_stop = "te1_msk_stop", rok_srv = "rok_srv", delka_akce = "delka_akce", PrizCheckUete = "PrizCheckUete", titulek_ico_nazev = "titulek_ico_nazev", titulek_ucs_nazev = "titulek_ucs_nazev", titulek_uus_nazev = "titulek_uus_nazev", titulek_nks_nazev = "titulek_nks_nazev", titulek_ico = "titulek_ico", titulek_ucs = "titulek_ucs", titulek_uus = "titulek_uus", titulek_nks = "titulek_nks", Konfigurace_balanc = "Konfigurace_balanc",}
	const enum GBarGlobalsBaseFragments { gin_gen_ixp = "*", akt_kompetence = "*", g_verze_c = "*", g_verze_k = "*", Je_DSG = "*", Je_DB_388_3_46 = "*", TypZpOrgan = "*", TypZpracovani = "*", TypZpracovani_Tabulka = "*", Param_Pozadavek_Editace_TP = "*", Param_Pozadavek_Editace_FP = "*", Param_Kontrola_Rozvrh = "*", Param_Pozadavek_Predat = "*", Param_Pozadavek_Prevzit = "*", Param_Rezim_Vlastnik = "*", BAR_Typ_Inst = "*", te1_msk = "*", te1_msk_org = "*", te1_msk_nula = "*", b_te1_msk_full = "*", te1_msk_start = "*", te1_msk_stop = "*", rok_srv = "*", delka_akce = "*", PrizCheckUete = "*", titulek_ico_nazev = "*", titulek_ucs_nazev = "*", titulek_uus_nazev = "*", titulek_nks_nazev = "*", titulek_ico = "*", titulek_ucs = "*", titulek_uus = "*", titulek_nks = "*", Konfigurace_balanc = "*",}
	const enum GBarGlobalsBaseTypes { gin_gen_ixp = "boolean", akt_kompetence = "string", g_verze_c = "string", g_verze_k = "number", Je_DSG = "boolean", Je_DB_388_3_46 = "boolean", TypZpOrgan = "Gordic.Bar.Interface.TypZpOrganEnum", TypZpracovani = "Gordic.Bar.Interface.TypZpracovaniEnum", TypZpracovani_Tabulka = "string", Param_Pozadavek_Editace_TP = "boolean", Param_Pozadavek_Editace_FP = "boolean", Param_Kontrola_Rozvrh = "boolean", Param_Pozadavek_Predat = "Gordic.Bar.Interface.TypPredatPrevzitAkceEnum", Param_Pozadavek_Prevzit = "Gordic.Bar.Interface.TypPredatPrevzitAkceEnum", Param_Rezim_Vlastnik = "boolean", BAR_Typ_Inst = "Gordic.Bar.Interface.SrvTypIntalaceEnum", te1_msk = "string", te1_msk_org = "string", te1_msk_nula = "string", b_te1_msk_full = "boolean", te1_msk_start = "number", te1_msk_stop = "number", rok_srv = "number", delka_akce = "number", PrizCheckUete = "number", titulek_ico_nazev = "string", titulek_ucs_nazev = "string", titulek_uus_nazev = "string", titulek_nks_nazev = "string", titulek_ico = "string", titulek_ucs = "string", titulek_uus = "string", titulek_nks = "string", Konfigurace_balanc = "Gordic.Bar.Interface.GSrvscfuDto[]",}
	const enum GBarGlobalsBaseTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Init\IGBarEkoInit.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Bar.Interface\Init\IGBarInit.d.ts 


//#endregion

