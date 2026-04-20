/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       ada.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Ada.Interface\Gordic.Ada.Interface.csproj
*    created     2026-02-16 14:33:38
*    files       Controls\IGISPPriloha.d.ts
*                Controls\IGMajsmajADA.d.ts
*                Controls\IGMatskcmADA.d.ts
*                Controls\IGSrvcpsk.d.ts
*                Controls\IGSrvcsaz.d.ts
*                Controls\IGSrvcskp.d.ts
*                Controls\IGSrvctas.d.ts
*                Controls\IGSrvctva.d.ts
*                Controls\IGSrvscsp.d.ts
*                Controls\IGSrvspla.d.ts
*                Controls\IGSrvspsk.d.ts
*                Controls\IGSrvspsp.d.ts
*                Controls\IGSrvsskp.d.ts
*                Controls\IGSrvstzd.d.ts
*                Controls\IGSrvsvyb.d.ts
*                Controls\IGSrvsxpf.d.ts
*                Doklad\IGAdaDoklad.d.ts
*                Doklad\IGAdaKompetenti.d.ts
*                Doklad\IGAdaServis.d.ts
*                Doklad\IGAdaSeznamHistorie.d.ts
*                Doklad\IGAdaSeznamISP.d.ts
*                Doklad\IGAdaSeznamPoznamky.d.ts
*                Doklad\IGAdaSeznamSouvisejici.d.ts
*                Doklad\IGAdaSeznamZapisu.d.ts
*                Doklad\IGAkceSrvdeds.d.ts
*                Doklad\IGAkceSrvdtzd.d.ts
*                Doklad\IGAkceSrvvpsp.d.ts
*                Doklad\IGSrvdlim.d.ts
*                Doklad\IGSrvsdde.d.ts
*                Doklad\IGSrvsmsa.d.ts
*                Doklad\IGSrvsppa.d.ts
*                Doklad\IGVepspla.d.ts
*                Doklad\IGWflsesxAda.d.ts
*                Doklad\Dto\GAgDokladyFilterDto.d.ts
*                Doklad\Dto\GAkceDto.d.ts
*                Doklad\Dto\GAkceGenerDto.d.ts
*                Doklad\Dto\GAkceHistorieDto.d.ts
*                Doklad\Dto\GAkceKopieDto.d.ts
*                Doklad\Dto\GAkcePoznamkyDto.d.ts
*                Doklad\Dto\GAkceVysledekDto.d.ts
*                Doklad\Dto\GDetailDokladuDto.d.ts
*                Doklad\Dto\GDokladyPocetDto.d.ts
*                Doklad\Dto\GEpospriDokladyDto.d.ts
*                Doklad\Dto\GEvzspriDokladyDto.d.ts
*                Doklad\Dto\GFucDokladyDto.d.ts
*                Doklad\Dto\GISPAkceDto.d.ts
*                Doklad\Dto\GKdfspidDokladyDto.d.ts
*                Doklad\Dto\GKompetentiAkceDto.d.ts
*                Doklad\Dto\GPoctyDokladuAkceDto.d.ts
*                Doklad\Dto\GPolozkaEDSDto.d.ts
*                Doklad\Dto\GPolozkaRZDDto.d.ts
*                Doklad\Dto\GPolozkaSdPDto.d.ts
*                Doklad\Dto\GRozpisAkceDto.d.ts
*                Doklad\Dto\GRozspidDokladyDto.d.ts
*                Doklad\Dto\GSestavyAdaFilterDto.d.ts
*                Doklad\Dto\GSeznamAdaFilterDto.d.ts
*                Doklad\Dto\GSeznamAdaHledanychDto.d.ts
*                Doklad\Dto\GSeznamDokladuDto.d.ts
*                Doklad\Dto\GSeznamRozpisAdaFilterDto.d.ts
*                Doklad\Dto\GSeznamZapisuAdaFilterDto.d.ts
*                Doklad\Dto\GSmlspidDokladyDto.d.ts
*                Doklad\Dto\GSrvacioALLDto.d.ts
*                Doklad\Dto\GSrvacioDto.d.ts
*                Doklad\Dto\GSrvdciaSeznamZapisuDto.d.ts
*                Doklad\Dto\GSrvdpozNoteDto.d.ts
*                Doklad\Dto\GSrvscisDto.d.ts
*                Doklad\Dto\GSrvsppaDto.d.ts
*                Doklad\Dto\GUctspidDokladyDto.d.ts
*                Doklad\Dto\GVepsplaDto.d.ts
*                Doklad\Dto\GVepsplaFilterDto.d.ts
*                Doklad\Dto\GVepsplaSuma.d.ts
*                Doklad\Dto\GVfpspriDokladyDto.d.ts
*                Dto\GAdaAttachmentDto.d.ts
*                Dto\GAdaFilterDto.d.ts
*                Dto\GEkosrarDto.d.ts
*                Dto\GEvzcspeDto.d.ts
*                Dto\GGincaktADADto.d.ts
*                Dto\GISPPrilohaDto.d.ts
*                Dto\GMajsmajADADto.d.ts
*                Dto\GMatskcmADADto.d.ts
*                Dto\GSrvcpskDto.d.ts
*                Dto\GSrvcpskFilterDto.d.ts
*                Dto\GSrvcsazDto.d.ts
*                Dto\GSrvcskpDto.d.ts
*                Dto\GSrvcsreDto.d.ts
*                Dto\GSrvcstzDto.d.ts
*                Dto\GSrvctasDto.d.ts
*                Dto\GsrvctvaDto.d.ts
*                Dto\GSrvdlimDto.d.ts
*                Dto\GSrvscspDto.d.ts
*                Dto\GSrvsddeDto.d.ts
*                Dto\GSrvsmsa.d.ts
*                Dto\GSrvsoblDto.d.ts
*                Dto\GSrvsplaDto.d.ts
*                Dto\GSrvsprrDto.d.ts
*                Dto\GSrvspskDto.d.ts
*                Dto\GSrvspskFilterDto.d.ts
*                Dto\GSrvspspDto.d.ts
*                Dto\GSrvsskpDto.d.ts
*                Dto\GSrvstipDto.d.ts
*                Dto\GSrvstriDto.d.ts
*                Dto\GSrvstzdDto.d.ts
*                Dto\GSrvsvybDto.d.ts
*                Dto\GSrvsxpfDto.d.ts
*                Dto\GSrvsxpfFilterDto.d.ts
*                Dto\GSrvvprrDto.d.ts
*                Dto\GSrvvtipDto.d.ts
*                Dto\GVepcstpDto.d.ts
*                Init\GAdaGlobalsBase.d.ts
*                Init\IGAdaKnihaInit.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGISPPriloha.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Autogenerated.*/
	const enum FilterPrilohaISP {
		/**Autogenerated.*/
		ixs,
		/**Autogenerated.*/
		ixb,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGMajsmajADA.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Autogenerated.*/
	const enum FilterMajsmajADA {
		/**Autogenerated.*/
		ixs_maj,
		/**Autogenerated.*/
		inv_cis,
		/**Ičo*/
		ico,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGMatskcmADA.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Autogenerated.*/
	const enum FilterMatskcmADA {
		/**Autogenerated.*/
		idk,
		/**nazev*/
		nazev,
		/**fast*/
		fast,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvcpsk.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Skupiny
	* @domain FinAkce
	* @businessObject PodskupinaADA
	*/
	interface PodskupinaADA {
		/**Detail Skupiny*/
		read(rq?:Gordic.Ada.Interface.GSrvcpskDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvcpskDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvcpskDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvcpskDto>>;
		/**Seznam Skupiny*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvcpskDto>>;
		/**Založení Skupiny*/
		create(rq?:Gordic.Ada.Interface.GSrvcpskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcpskDto>>;
		/**Oprava Skupiny*/
		update(rq?:Gordic.Ada.Interface.GSrvcpskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcpskDto>>;
		/**Oprava resp. založení Skupiny*/
		upsert(rq?:Gordic.Ada.Interface.GSrvcpskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcpskDto>>;
		/**Odstranění Skupiny*/
		delete(rq?:Gordic.Ada.Interface.GSrvcpskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcpskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcpskDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PodskupinaADA: ServiceBase & Catalog.PodskupinaADA;
	}
	const PodskupinaADA: Client["PodskupinaADA"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Skupiny*/
	const enum GSrvcpskFilter {
		/**skp_akce*/
		skp_akce,
		/**psk_akce*/
		psk_akce,
		/**psk_akce_txt*/
		psk_akce_txt,
		/**k_v*/
		k_v,
		/**k_s*/
		k_s,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvcsaz.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Autogenerated.*/
	const enum FilterSrvcsaz {
		/**Autogenerated.*/
		stav_az,
		/**Autogenerated.*/
		stav_az_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvcskp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Skupiny
	* @domain FinAkce
	* @businessObject SkupinaADA
	*/
	interface SkupinaADA {
		/**Detail Skupiny*/
		read(rq?:Gordic.Ada.Interface.GSrvcskpDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvcskpDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvcskpDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvcskpDto>>;
		/**Seznam Skupiny*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvcskpDto>>;
		/**Založení Skupiny*/
		create(rq?:Gordic.Ada.Interface.GSrvcskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcskpDto>>;
		/**Oprava Skupiny*/
		update(rq?:Gordic.Ada.Interface.GSrvcskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcskpDto>>;
		/**Oprava resp. založení Skupiny*/
		upsert(rq?:Gordic.Ada.Interface.GSrvcskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcskpDto>>;
		/**Odstranění Skupiny*/
		delete(rq?:Gordic.Ada.Interface.GSrvcskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvcskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvcskpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SkupinaADA: ServiceBase & Catalog.SkupinaADA;
	}
	const SkupinaADA: Client["SkupinaADA"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Skupiny*/
	const enum GSrvcskpFilter {
		/**skp_akce*/
		skp_akce,
		/**skp_akce_txt*/
		skp_akce_txt,
		/**k_v*/
		k_v,
		/**k_s*/
		k_s,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvctas.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Autogenerated.*/
	const enum FilterSrvctas {
		/**Autogenerated.*/
		typ_akce_sum,
		/**Autogenerated.*/
		typ_akce_sum_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvctva.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Autogenerated.*/
	const enum FilterSrvctva {
		/**Autogenerated.*/
		typ_vzb,
		/**Autogenerated.*/
		typ_vzb_txt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvscsp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Typy číselníků
	* @domain FinAkce
	* @businessObject TypCiselniku
	*/
	interface TypCiselniku {
		/**Detail Typy číselníků*/
		read(rq?:Gordic.Ada.Interface.GSrvscspDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvscspDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvscspDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvscspDto>>;
		/**Seznam Typy číselníků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvscspDto>>;
		/**Založení Typy číselníků*/
		create(rq?:Gordic.Ada.Interface.GSrvscspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscspDto>>;
		/**Oprava Typy číselníků*/
		update(rq?:Gordic.Ada.Interface.GSrvscspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscspDto>>;
		/**Oprava resp. založení Typy číselníků*/
		upsert(rq?:Gordic.Ada.Interface.GSrvscspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscspDto>>;
		/**Odstranění Typy číselníků*/
		delete(rq?:Gordic.Ada.Interface.GSrvscspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscspDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypCiselniku: ServiceBase & Catalog.TypCiselniku;
	}
	const TypCiselniku: Client["TypCiselniku"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Typy číselníků*/
	const enum GSrvscspFilter {
		/**ixs_csp*/
		ixs_csp,
		/**nazev*/
		nazev,
		/**zkratka*/
		zkratka,
		/**poznamka*/
		poznamka,
		/**nazev_skp*/
		nazev_skp,
		/**zkratka_skp*/
		zkratka_skp,
		/**delka_skp*/
		delka_skp,
		/**nazev_psk*/
		nazev_psk,
		/**zkratka_psk*/
		zkratka_psk,
		/**delka_psk*/
		delka_psk,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvspla.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vlastní eko inicializace ADA
	* @domain FinAkce
	* @businessObject AkceKniha
	*/
	interface AkceKniha {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvsplaDto>>;
		/**Read*/
		read(rq?:Gordic.Ada.Interface.GSrvsplaDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvsplaDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvsplaDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvsplaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceKniha: ServiceBase & Catalog.AkceKniha;
	}
	const AkceKniha: Client["AkceKniha"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Kniha ADA*/
	const enum GSrvsplaFilter {
		/**ixs_pla*/
		ixs_pla,
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**nazev*/
		nazev,
		/**zkratka*/
		zkratka,
		/**poznamka*/
		poznamka,
		/**aktivita*/
		aktivita,
		/**ktg_akce*/
		ktg_akce,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**cpps_msk*/
		cpps_msk,
		/**ixp_den_old*/
		ixp_den_old,
		/**priz_az_def*/
		priz_az_def,
		/**priz_gen_cis*/
		priz_gen_cis,
		/**ixs_csp*/
		ixs_csp,
		/**priz_ram_doh*/
		priz_ram_doh,
		/**no_ixs_pla*/
		no_ixs_pla,
		/**norok*/
		norok,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvspsk.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Skupiny
	* @domain FinAkce
	* @businessObject PodskupinaADADyn
	*/
	interface PodskupinaADADyn {
		/**Detail Skupiny*/
		read(rq?:Gordic.Ada.Interface.GSrvspskDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvspskDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvspskDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvspskDto>>;
		/**Seznam Skupiny*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvspskDto>>;
		/**Založení Skupiny*/
		create(rq?:Gordic.Ada.Interface.GSrvspskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspskDto>>;
		/**Oprava Skupiny*/
		update(rq?:Gordic.Ada.Interface.GSrvspskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspskDto>>;
		/**Oprava resp. založení Skupiny*/
		upsert(rq?:Gordic.Ada.Interface.GSrvspskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspskDto>>;
		/**Odstranění Skupiny*/
		delete(rq?:Gordic.Ada.Interface.GSrvspskDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspskDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspskDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PodskupinaADADyn: ServiceBase & Catalog.PodskupinaADADyn;
	}
	const PodskupinaADADyn: Client["PodskupinaADADyn"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Podskupiny dyman*/
	const enum GSrvspskFilter {
		/**ixs_csp*/
		ixs_csp,
		/**skp_akc*/
		skp_akc,
		/**psk_akc*/
		psk_akc,
		/**nazev*/
		nazev,
		/**zkratka*/
		zkratka,
		/**poznamka*/
		poznamka,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvspsp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - položky SdP
	* @domain FinAkce
	* @businessObject PolozkaSdP
	*/
	interface PolozkaSdP {
		/**Detail položky SdP*/
		read(rq?:Gordic.Ada.Interface.GSrvspspDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvspspDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvspspDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvspspDto>>;
		/**Seznam položky SdP*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvspspDto>>;
		/**Založení položky SdP*/
		create(rq?:Gordic.Ada.Interface.GSrvspspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspspDto>>;
		/**Oprava položky SdP*/
		update(rq?:Gordic.Ada.Interface.GSrvspspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspspDto>>;
		/**Oprava resp. založení položky SdP*/
		upsert(rq?:Gordic.Ada.Interface.GSrvspspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspspDto>>;
		/**Odstranění položky SdP*/
		delete(rq?:Gordic.Ada.Interface.GSrvspspDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvspspDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvspspDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PolozkaSdP: ServiceBase & Catalog.PolozkaSdP;
	}
	const PolozkaSdP: Client["PolozkaSdP"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro položky SdP*/
	const enum GSrvspspFilter {
		/**id_psp*/
		id_psp,
		/**nazev*/
		nazev,
		/**zkratka*/
		zkratka,
		/**poznamka*/
		poznamka,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvsskp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Skupiny
	* @domain FinAkce
	* @businessObject SkupinaADADyn
	*/
	interface SkupinaADADyn {
		/**Detail Skupiny*/
		read(rq?:Gordic.Ada.Interface.GSrvsskpDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvsskpDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvsskpDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvsskpDto>>;
		/**Seznam Skupiny*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvsskpDto>>;
		/**Založení Skupiny*/
		create(rq?:Gordic.Ada.Interface.GSrvsskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsskpDto>>;
		/**Oprava Skupiny*/
		update(rq?:Gordic.Ada.Interface.GSrvsskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsskpDto>>;
		/**Oprava resp. založení Skupiny*/
		upsert(rq?:Gordic.Ada.Interface.GSrvsskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsskpDto>>;
		/**Odstranění Skupiny*/
		delete(rq?:Gordic.Ada.Interface.GSrvsskpDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsskpDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsskpDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SkupinaADADyn: ServiceBase & Catalog.SkupinaADADyn;
	}
	const SkupinaADADyn: Client["SkupinaADADyn"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Skupiny*/
	const enum GSrvsskpFilter {
		/**ixs_csp*/
		ixs_csp,
		/**skp_akc*/
		skp_akc,
		/**nazev*/
		nazev,
		/**zkratka*/
		zkratka,
		/**poznamka*/
		poznamka,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvstzd.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - položky SdP
	* @domain FinAkce
	* @businessObject TypZdroje
	*/
	interface TypZdroje {
		/**Detail položky SdP*/
		read(rq?:Gordic.Ada.Interface.GSrvstzdDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvstzdDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvstzdDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvstzdDto>>;
		/**Seznam položky SdP*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvstzdDto>>;
		/**Založení položky SdP*/
		create(rq?:Gordic.Ada.Interface.GSrvstzdDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvstzdDto>>;
		/**Oprava položky SdP*/
		update(rq?:Gordic.Ada.Interface.GSrvstzdDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvstzdDto>>;
		/**Oprava resp. založení položky SdP*/
		upsert(rq?:Gordic.Ada.Interface.GSrvstzdDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvstzdDto>>;
		/**Odstranění položky SdP*/
		delete(rq?:Gordic.Ada.Interface.GSrvstzdDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvstzdDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvstzdDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypZdroje: ServiceBase & Catalog.TypZdroje;
	}
	const TypZdroje: Client["TypZdroje"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro položky SdP*/
	const enum GSrvstzdFilter {
		/**id_tzd*/
		id_tzd,
		/**nazev*/
		nazev,
		/**zkratka*/
		zkratka,
		/**poznamka*/
		poznamka,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvsvyb.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Autogenerated.*/
	const enum FilterSrvsvyb {
		/**Autogenerated.*/
		id_vyb,
		/**nazev*/
		nazev,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Controls\IGSrvsxpf.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - projekty EDS
	* @domain FinAkce
	* @businessObject ProjektEDS
	*/
	interface ProjektEDS {
		/**Detail projekty EDS*/
		read(rq?:Gordic.Ada.Interface.GSrvsxpfDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvsxpfDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvsxpfDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvsxpfDto>>;
		/**Seznam projekty EDS*/
		list(rq?:Gordic.Ada.Interface.GSrvsxpfFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvsxpfDto>>;
		/**Založení projekty EDS*/
		create(rq?:Gordic.Ada.Interface.GSrvsxpfDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsxpfDto>>;
		/**Oprava projekty EDS*/
		update(rq?:Gordic.Ada.Interface.GSrvsxpfDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsxpfDto>>;
		/**Oprava resp. založení projekty EDS*/
		upsert(rq?:Gordic.Ada.Interface.GSrvsxpfDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsxpfDto>>;
		/**Odstranění projekty EDS*/
		delete(rq?:Gordic.Ada.Interface.GSrvsxpfDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsxpfDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsxpfDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ProjektEDS: ServiceBase & Catalog.ProjektEDS;
	}
	const ProjektEDS: Client["ProjektEDS"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro projekty EDS*/
	const enum GSrvsxpfFilter {
		/**xpf_pf*/
		xpf_pf,
		/**nazev*/
		nazev,
		/**uroven*/
		uroven,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**aktivita*/
		aktivita,
		/**rok_od*/
		rok_od,
		/**rok_do*/
		rok_do,
		/**ico*/
		ico,
		/**kod_uct*/
		kod_uct,
		/**priz_eds*/
		priz_eds,
		/**rok_od*/
		rok,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaDoklad.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Doklady Ada
	*     
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface Akce {
		/**
		*     ISL Seznam akci
		*     
		*/
		list(rq?:Gordic.Ada.Interface.GSeznamAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Pocet akci
		*     
		*/
		listCount(rq?:Gordic.Ada.Interface.GSeznamAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**
		*     ISL Select Detailu
		*     
		*/
		read(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Select Detailu
		*     
		*/
		read_Detail(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Nova_Akce_Init
		*     
		*/
		nova_Akce_Init(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Update Detailu
		*     
		*/
		update(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL create Detailu
		*     
		*/
		create(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Aktivace Akce
		*     
		*/
		aktivace(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Deaktivace Akce
		*     
		*/
		deaktivace(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Lze Set stav realizace Akce
		*     
		*/
		lze_Set_Stav_Realizace(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Set stav realizace Akce
		*     
		*/
		set_Stav_Realizace(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Lze Set stav AZ Akce
		*     
		*/
		lze_Set_Stav_AZ(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Set stav AZ Akce
		*     
		*/
		set_Stav_AZ(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Seznam Rozpis akce
		*     
		*/
		list_rozpis_akce(rq?:Gordic.Ada.Interface.GSeznamRozpisAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GRozpisAkceDto>>;
		/**
		*     ISL List Seznam DokladyBPLAkce
		*     
		*/
		listDokladyBPLAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GKdfspidDto>>;
		/**
		*     ISL List Seznam DokladySMLAkce
		*     
		*/
		listDokladySMLAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSmlspidDokladyDto>>;
		/**
		*     ISL List Seznam DokladyROZAkce
		*     
		*/
		listDokladyROZAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GRozspidDokladyDto>>;
		/**
		*     ISL List Seznam DokladyEVZAkce
		*     
		*/
		listDokladyEVZAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GEvzspriDokladyDto>>;
		/**
		*     ISL List Seznam DokladyRZAAkce
		*     
		*/
		listDokladyRZAAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GEvzspriDokladyDto>>;
		/**
		*     ISL List Seznam DokladyEPOAkce
		*     
		*/
		listDokladyEPOAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GEpospriDokladyDto>>;
		/**
		*     ISL List Seznam DokladyVFPAkce
		*     
		*/
		listDokladyVFPAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GVfpspriDokladyDto>>;
		/**
		*     ISL List Seznam DokladyUCTAkce
		*     
		*/
		listDokladyUCTAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GUctspidDokladyDto>>;
		/**
		*     ISL List Seznam DokladyFUCAkce
		*     
		*/
		listDokladyFUCAkce(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GFucDokladyDto>>;
		/**ISL Pocet Dokladu akce*/
		readPoctyDokladu(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GPoctyDokladuAkceDto>>;
		/**
		*     ISL Sumy akce
		*     
		*/
		readSumyAkce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceSumyDto>>;
		/**
		*     ISL Sumy akce ALL
		*     
		*/
		readSumyAkceALL(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceSumyALLDto>>;
		/**
		*     ISL Kopie akce - lze
		*     
		*/
		lze_Kopie_Akce(rq?:Gordic.Ada.Interface.GAkceKopieDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceKopieDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceKopieDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Kopie akce - lze pre
		*     
		*/
		lze_Kopie_Akce_Pre(rq?:Gordic.Ada.Interface.GAkceKopieDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceKopieDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceKopieDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Kopie akce
		*     
		*/
		kopie_Akce(rq?:Gordic.Ada.Interface.GAkceKopieDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceKopieDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceKopieDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Kopie akce - lze preevidence
		*     
		*/
		lze_Preevidence_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Kopie akce
		*     
		*/
		preevidence_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Predani akce - lze predat
		*     
		*/
		lze_Predani_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Predani akce
		*     
		*/
		predani_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Prevzeti akce - lze prevzit
		*     
		*/
		lze_Nastavit_Real_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Prevzeti akce
		*     
		*/
		nastavit_Real_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Slouceni akce
		*     
		*/
		slouceni_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Sdruzeni akce
		*     
		*/
		sdruzeni_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Prevzeti akce - lze prevzit
		*     
		*/
		lze_Prevzeti_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Prevzeti akce
		*     
		*/
		prevzeti_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL schvaleni akce - lze schvalit
		*     
		*/
		lze_Schvaleni_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**
		*     ISL Schvaleni akce
		*     
		*/
		schvaleni_Akce(rq?:Gordic.Ada.Interface.GAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     generuj_cislo_akce
		*     
		*/
		generuj_Cislo(rq?:Gordic.Ada.Interface.GAkceGenerDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkceGenerDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkceGenerDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceGenerDto>>;
		/**
		*     Akce existuje
		*     
		*/
		akce_Existuje(rq?:CallParams<{a_rok:number,a_ico:string,a_cislo:string,a_ixs_cia:string}>): _Task<{a_rok:number,a_ico:string,a_cislo:string,a_ixs_cia:string},boolean>;
		/**
		*     ISL porovnani vlastnosti
		*     
		*/
		porovnej_Vlastnosti(rq?:CallParams<{in_typ_obj:number,in_old_objekt:string,in_new_objekt:string}>): _Task<{in_typ_obj:number,in_old_objekt:string,in_new_objekt:string},boolean>;
		/**
		*     Komtrola Planovane vydaje
		*     
		*/
		kontrola_Planovane_Vydaje(rq?:CallParams<{in_data:Gordic.Ada.Interface.GAkceDto}>): _Task<{in_data:Gordic.Ada.Interface.GAkceDto},Gordic.Ada.Interface.GAkceVysledekDto>;
		/**
		*     ISL Seznam Rozpis akce - sumář
		*     
		*/
		list_Rozpis_Akce_Sumar(rq?:Gordic.Ada.Interface.GSeznamAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**
		*     ISL Seznam Rozpis akce (rozpad)
		*     
		*/
		list_Rozpis_Akce_Sumar_Rozpad(rq?:Gordic.Ada.Interface.GSeznamAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GRozpisAkceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Akce: ServiceBase & Catalog.Akce;
	}
	const Akce: Client["Akce"];
}
declare namespace Gordic.Ada.Interface {
	/**
	*     Výčet filtračních kritérií pro filtr seznamu rozpisu akce 
	*     
	*/
	const enum FilRozpisAda {
		/**cislo*/
		cislo,
		/**rok*/
		rok,
		/**rok*/
		rok_fin,
		/**ico*/
		ico,
		/**ico_fin*/
		ico_fin,
		/**ucs*/
		ucs,
		/**nks*/
		nks,
		/**cfuDto*/
		cfuDto,
		/**cfu*/
		cfu,
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
		/**uek*/
		uek,
		/**uel*/
		uel,
		/**uem*/
		uem,
		/**uen*/
		uen,
		/**te5*/
		te5,
		/**te6*/
		te6,
		/**te7*/
		te7,
		/**te8*/
		te8,
		/**te9*/
		te9,
		/**c0c1_kc*/
		c0c1_kc,
		/**c0c1_2*/
		c0c1_2,
		/**xuete*/
		xuete,
		/**drd*/
		drd,
	}
	/**
	*     Výčet filtračních kritérií pro filtr seznamu dokladů ADA
	*     
	*/
	const enum FilDokladyAda {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**nazev*/
		nazev,
		/**typ_akce*/
		typ,
		/**ixs_fun_akt*/
		ixs_fun_akt,
		/**prijmeni*/
		prijmeni,
		/**jmeno*/
		jmeno,
		/**os_cislo*/
		os_cislo,
		/**telefon*/
		telefon,
		/**nks*/
		nks,
		/**cis_real*/
		cis_real,
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
		/**uek*/
		uek,
		/**uel*/
		uel,
		/**uem*/
		uem,
		/**uen*/
		uen,
		/**te5*/
		te5,
		/**te6*/
		te6,
		/**te7*/
		te7,
		/**te8*/
		te8,
		/**te9*/
		te9,
		/**xuete*/
		xuete,
		/**cfu*/
		cfu,
		/**cfuDto*/
		cfuDto,
		/**skp_akce*/
		skp_akce,
		/**psk_akce*/
		psk_akce,
		/**ixs_csp*/
		ixs_csp,
		/**skp_akc*/
		skp_akc,
		/**psk_akc*/
		psk_akc,
		/**aktivita*/
		aktivita,
		/**vlastnosti*/
		vlastnosti,
		/**stav_real*/
		stav_real,
		/**fin_od*/
		fin_od,
		/**fin_do*/
		fin_do,
		/**real_od*/
		real_od,
		/**real_do*/
		real_do,
		/**upresneni*/
		upresneni,
		/**Stav INP*/
		stav_inp,
		/**Stav AZ ld*/
		priz_az,
		/**Stav AZ*/
		stav_az,
		/**Typ akce sum*/
		typ_akce_sum,
		/**id_eds*/
		id_eds,
		/**id_psp*/
		id_psp,
		/**id_tzd*/
		id_tzd,
		/**id_tzd_tzd*/
		id_tzd_tzd,
		/**id_tzd_vyb*/
		id_tzd_vyb,
		/**id_tzd_eds*/
		id_tzd_eds,
		/**isp_nepozadopvano*/
		isp_nepozadopvano,
		/**isp_splneno*/
		isp_splneno,
		/**isp_nesplneno*/
		isp_nesplneno,
		/**isp_nesplneno*/
		isp_nenastaveno,
		/**ixs_prr*/
		ixs_prr,
		/**ixs_tri*/
		ixs_tri,
		/**ixs_pla*/
		ixs_pla,
		/**komp*/
		komp,
		/**ixs_fun_az*/
		ixs_fun_az,
		/**priz_ram_doh*/
		priz_ram_doh,
		/**typ_vzb*/
		typ_vzb,
		/**dat_zmena*/
		dat_zmena,
		/**ixp_spis_ip*/
		ixp_spis_ip,
		/**akt_znacka_spis_ip*/
		akt_znacka_spis_ip,
		/**stav_spis_ip*/
		stav_spis_ip,
		/**ixp_dok_ip*/
		ixp_dok_ip,
		/**akt_znacka_dok_ip*/
		akt_znacka_dok_ip,
		/**stav_dok_ip*/
		stav_dok_ip,
		/**filtr_financovani*/
		filtr_financovani,
		/**ixs_cia*/
		ixs_cia,
		/**drd*/
		drd,
		/**ixp*/
		ixp,
		/**ucs*/
		ucs,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaKompetenti.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Doklady Ada
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkceKompetenti {
		/**ISL List Seznam kompeterů akce*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GKompetentiAkceDto>>;
		/**ISL Select Detailu kompetenta*/
		read(rq?:Gordic.Ada.Interface.GKompetentiAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GKompetentiAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GKompetentiAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GKompetentiAkceDto>>;
		/**ISL Update Detailu kompetenta*/
		update(rq?:Gordic.Ada.Interface.GKompetentiAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GKompetentiAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GKompetentiAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GKompetentiAkceDto>>;
		/**ISL create Detailu kompetenta*/
		create(rq?:Gordic.Ada.Interface.GKompetentiAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GKompetentiAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GKompetentiAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GKompetentiAkceDto>>;
		/**ISL Odstranění kompetenta*/
		delete(rq?:Gordic.Ada.Interface.GKompetentiAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GKompetentiAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GKompetentiAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GKompetentiAkceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceKompetenti: ServiceBase & Catalog.AkceKompetenti;
	}
	const AkceKompetenti: Client["AkceKompetenti"];
}
declare namespace Gordic.Ada.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu rozpisu akce*/
	const enum FilKompetentAda {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_fun*/
		ixs_fun,
		/**ixs_pla*/
		ixs_pla,
		/**cis_real*/
		cis_real,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaServis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Servis
	* @domain FinAkce
	* @businessObject AkceServis
	*/
	interface AkceServis {
		/**Aktualizace dat MAJ*/
		aktualizace_Maj(rq?:CallParams<{in_mesic:number}>): _Task<{in_mesic:number},void>;
		/**Přepočet akce*/
		prepocet_Akce(rq?:CallParams<{in_cislo:string}>): _Task<{in_cislo:string},number>;
		/**ISL List Seznam akcí pro přepočetet*/
		list_Prepocet(rq?:Gordic.Ada.Interface.GSeznamAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceDto>>;
		/**Kontrola TSK*/
		kontrola_TSK(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Kontrola MC*/
		kontrola_MC(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Aktualizace TSK*/
		aktualizace_TSK(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Aktualizace MC*/
		aktualizace_MC(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Aktualizace STV*/
		aktualizace_STV(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Nacteni obsahu davky*/
		loadFromFile(rq?:CallParams<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,nazev:string}>): _Task<{fileInfo:Gordic.General.ApplicationInterface.GFileInfoDto,nazev:string},GServiceSaveResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Výmaz prac*/
		vymaz_Prac(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Pocet prac*/
		pocet_Prac(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Kontrola*/
		kontrola(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Presun*/
		presun(rq?:CallParams<{}>): _Task<{},GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Kontrola_Vysledek*/
		kontrola_Vysledek(rq?:CallParams<{}>): _Task<{},GServiceListResponse<Gordic.Ada.Interface.GSrvdciaSeznamZapisuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceServis: ServiceBase & Catalog.AkceServis;
	}
	const AkceServis: Client["AkceServis"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaSeznamHistorie.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Doklady Ada
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkceHistorie {
		/**Načte seznam zapisu historie akce*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceHistorieDto>>;
		/**Načte seznam zapisu historie akce vše*/
		list_All(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceHistorieDto>>;
		/**Načte seznam zapisu historie akce vše s planovanim*/
		list_All_S_Planovanim(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceHistorieDto>>;
		/**Načte seznam zapisu historie posledni zmeny*/
		list_Zmenene(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceHistorieDto>>;
		/**Načte seznam zapisu historie mnou zobrazene dle posledni zmeny*/
		list_Zobrazene(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceHistorieDto>>;
		/**Načte seznam knih dle zapisu historie mnou zobrazene dle posledni zmeny*/
		list_Zobrazene_Kniha(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkceHistorieDto>>;
		/**ISL Update Detailu kompetenta*/
		create(rq?:CallParams<{cislo:string,zmena_txt:string,poznamka:string}>): _Task<{cislo:string,zmena_txt:string,poznamka:string},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceHistorie: ServiceBase & Catalog.AkceHistorie;
	}
	const AkceHistorie: Client["AkceHistorie"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaSeznamISP.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Doklady Ada
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkceISP {
		/**ISL Seznam  ISP akce*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**List_Blokace IP*/
		list_Blokace(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,string>;
		/**ISL Select Detailu ISP*/
		read(rq?:Gordic.Ada.Interface.GISPAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GISPAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GISPAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL Update Detailu ISP*/
		update(rq?:Gordic.Ada.Interface.GISPAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL Update ixb na Detailu ISP*/
		update_Ixb(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>,old_ixb:string}>): _Task<{rq:GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>,old_ixb:string},GServiceSaveResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL create Detailu ISP*/
		create(rq?:Gordic.Ada.Interface.GISPAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL delete Detailu ISP*/
		delete(rq?:Gordic.Ada.Interface.GISPAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL default noveho zapisu*/
		read_Novy_Zapis(rq?:Gordic.Ada.Interface.GISPAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GISPAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GISPAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL ISP All*/
		read_ISP_ALL(rq?:Gordic.Ada.Interface.GISPAkceDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GISPAkceDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GISPAkceDto>,GServiceReadResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL Seznam ISP predpis*/
		list_Predpis_ISP(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL Seznam  ISP akce pro schvaleni*/
		list_Ke_Schvaleni(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL Seznam  ISP akce pro schvaleni*/
		list_K_Priprave(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL List Seznam ISP k finalizaci*/
		finalizace_Prilohy(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GISPAkceDto>>;
		/**ISL Změna typAg u dokumentu*/
		zmena_TypAG_Ixp(rq?:Gordic.Ada.Interface.GISPAkceDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GISPAkceDto>,GServiceSaveResponse<Gordic.Ada.Interface.GISPAkceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceISP: ServiceBase & Catalog.AkceISP;
	}
	const AkceISP: Client["AkceISP"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaSeznamPoznamky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Doklady Ada
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkcePoznamky {
		/**ISL List poznamek akce*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAkcePoznamkyDto>>;
		/**ISL Read poznamka akce*/
		read(rq?:Gordic.Ada.Interface.GAkcePoznamkyDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkcePoznamkyDto>>;
		/**Odstranění poznmmky*/
		delete(rq?:Gordic.Ada.Interface.GAkcePoznamkyDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkcePoznamkyDto>>;
		/**ISL Update Detailu poznamky*/
		update(rq?:Gordic.Ada.Interface.GAkcePoznamkyDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkcePoznamkyDto>>;
		/**ISL create poznamky*/
		create(rq?:Gordic.Ada.Interface.GAkcePoznamkyDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GAkcePoznamkyDto>,GServiceSaveResponse<Gordic.Ada.Interface.GAkcePoznamkyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkcePoznamky: ServiceBase & Catalog.AkcePoznamky;
	}
	const AkcePoznamky: Client["AkcePoznamky"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaSeznamSouvisejici.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Doklady Ada
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkceSouvisejici {
		/**ListCount*/
		listCount(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**ListCount_Navazane*/
		listCount_Navazane(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**ListCount_Navazane - nadrizene*/
		listCount_Navazane_Nad(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**ISL List Seznam souvisejici akce*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvscisDto>>;
		/**ISL List Seznam navazanych akci*/
		list_Navazane(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvscisDto>>;
		/**ISL List Seznam navazanych akci - nadrazene*/
		list_Navazane_Nad(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvscisDto>>;
		/**ISL Select Detailu souvisejici*/
		read(rq?:Gordic.Ada.Interface.GSrvscisDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvscisDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvscisDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvscisDto>>;
		/**ISL Update Detailu souvisejici*/
		update(rq?:Gordic.Ada.Interface.GSrvscisDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscisDto>>;
		/**ISL create Detailu souvisejici*/
		create(rq?:Gordic.Ada.Interface.GSrvscisDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscisDto>>;
		/**ISL Odstranění souvisejici*/
		delete(rq?:Gordic.Ada.Interface.GSrvscisDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscisDto>>;
		/**ISL Odstranění souvisejici*/
		oddelit(rq?:Gordic.Ada.Interface.GSrvscisDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvscisDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvscisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceSouvisejici: ServiceBase & Catalog.AkceSouvisejici;
	}
	const AkceSouvisejici: Client["AkceSouvisejici"];
}
declare namespace Gordic.Ada.Interface {
	/**Výčet filtračních kritérií pro filtr seznamu souvisejici*/
	const enum FilSouvisejiciAda {
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**cislo_old*/
		cislo_old,
		/**rok_od*/
		rok_od,
		/**rok_do*/
		rok_do,
		/**aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAdaSeznamZapisu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**
	*     Doklady Ada
	*     
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkceZapisy {
		/**
		*     List
		*     
		*/
		list(rq?:Gordic.Ada.Interface.GSeznamZapisuAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvdciaSeznamZapisuDto>>;
		/**
		*     ISL Pocet zapisu akce
		*     
		*/
		listCount(rq?:Gordic.Ada.Interface.GSeznamZapisuAdaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**
		*     ISL create zapsiu
		*     
		*/
		create(rq?:Gordic.Ada.Interface.GSrvdciaSeznamZapisuDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdciaSeznamZapisuDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdciaSeznamZapisuDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvdciaSeznamZapisuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceZapisy: ServiceBase & Catalog.AkceZapisy;
	}
	const AkceZapisy: Client["AkceZapisy"];
}
declare namespace Gordic.Ada.Interface {
	/**
	*     Výčet filtračních kritérií pro filtr seznamu zapisů akce 
	*     
	*/
	const enum FilZapisyAda {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**nks*/
		nks,
		/**cislo*/
		cislo,
		/**radek*/
		radek,
		/**drd*/
		drd_msk,
		/**cfuDto*/
		cfuDto,
		/**cfu*/
		cfu,
		/**drd*/
		drd,
		/**mesic*/
		mesic,
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
		/**uek*/
		uek,
		/**uel*/
		uel,
		/**uem*/
		uem,
		/**uen*/
		uen,
		/**te5*/
		te5,
		/**te6*/
		te6,
		/**te7*/
		te7,
		/**te8*/
		te8,
		/**te9*/
		te9,
		/**c0*/
		c0,
		/**c1*/
		c1,
		/**fin_od*/
		fin_od,
		/**fin_do*/
		fin_do,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAkceSrvdeds.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky SdP Akce
	* @domain FinAkce
	* @businessObject EDSAkce
	*/
	interface AkceEDS {
		/**Detail balanční verze*/
		read(rq?:Gordic.Ada.Interface.GPolozkaEDSDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaEDSDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaEDSDto>,GServiceReadResponse<Gordic.Ada.Interface.GPolozkaEDSDto>>;
		/**Seznam balanční verze*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GPolozkaEDSDto>>;
		/**ListCount*/
		listCount(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení balanční verze*/
		create(rq?:Gordic.Ada.Interface.GPolozkaEDSDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaEDSDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaEDSDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaEDSDto>>;
		/**Oprava balanční verze*/
		update(rq?:Gordic.Ada.Interface.GPolozkaEDSDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaEDSDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaEDSDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaEDSDto>>;
		/**Odstranění balanční verze*/
		delete(rq?:Gordic.Ada.Interface.GPolozkaEDSDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaEDSDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaEDSDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaEDSDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceEDS: ServiceBase & Catalog.AkceEDS;
	}
	const AkceEDS: Client["AkceEDS"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro balanční verze*/
	const enum GSrvdedsFilter {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_cia*/
		ixs_cia,
		/**id_eds*/
		id_eds,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAkceSrvdtzd.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky RZD Akce
	* @domain FinAkce
	* @businessObject RZDAkce
	*/
	interface AkceRZD {
		/**Detail balanční verze*/
		read(rq?:Gordic.Ada.Interface.GPolozkaRZDDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaRZDDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaRZDDto>,GServiceReadResponse<Gordic.Ada.Interface.GPolozkaRZDDto>>;
		/**Seznam navázanych položek SdP*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GPolozkaRZDDto>>;
		/**ListCount*/
		listCount(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení balanční verze*/
		create(rq?:Gordic.Ada.Interface.GPolozkaRZDDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaRZDDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaRZDDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaRZDDto>>;
		/**Oprava balanční verze*/
		update(rq?:Gordic.Ada.Interface.GPolozkaRZDDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaRZDDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaRZDDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaRZDDto>>;
		/**Odstranění balanční verze*/
		delete(rq?:Gordic.Ada.Interface.GPolozkaRZDDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaRZDDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaRZDDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaRZDDto>>;
		/**Kontrola na limit*/
		kontrola_Limit(rq?:Gordic.Ada.Interface.GPolozkaRZDDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaRZDDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaRZDDto>,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**aktualizace limitu TZD*/
		napocti_Limit(rq?:Gordic.Ada.Interface.GSrvdlimDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvdlimDto>>;
		/**test zda se budou zpracovavat limity*/
		zpracovani_Limit(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceReadResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceRZD: ServiceBase & Catalog.AkceRZD;
	}
	const AkceRZD: Client["AkceRZD"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro balanční verze*/
	const enum GSrvdtzdFilter {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_cia*/
		ixs_cia,
		/**id_tzd*/
		id_tzd,
		/**rok_zdr*/
		rok_zdr,
		/**castka_zdr*/
		castka_zdr,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**id_vyb*/
		id_vyb,
		/**id_eds*/
		id_eds,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGAkceSrvvpsp.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Položky SdP Akce
	* @domain FinAkce
	* @businessObject SdpAkce
	*/
	interface AkceSdp {
		/**Detail balanční verze*/
		read(rq?:Gordic.Ada.Interface.GPolozkaSdPDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaSdPDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GPolozkaSdPDto>,GServiceReadResponse<Gordic.Ada.Interface.GPolozkaSdPDto>>;
		/**Seznam navázanych položek SdP*/
		list(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GPolozkaSdPDto>>;
		/**ISL Pocet zapisu akce*/
		listCount(rq?:Gordic.Ada.Interface.GAgDokladyFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení balanční verze*/
		create(rq?:Gordic.Ada.Interface.GPolozkaSdPDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaSdPDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaSdPDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaSdPDto>>;
		/**Oprava balanční verze*/
		update(rq?:Gordic.Ada.Interface.GPolozkaSdPDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaSdPDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaSdPDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaSdPDto>>;
		/**Odstranění balanční verze*/
		delete(rq?:Gordic.Ada.Interface.GPolozkaSdPDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaSdPDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GPolozkaSdPDto>,GServiceSaveResponse<Gordic.Ada.Interface.GPolozkaSdPDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceSdp: ServiceBase & Catalog.AkceSdp;
	}
	const AkceSdp: Client["AkceSdp"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro balanční verze*/
	const enum GSrvvpspFilter {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_cia*/
		ixs_cia,
		/**id_eds*/
		id_eds,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGSrvdlim.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Seznam rkai pro přípravu.
	* @domain LimityAP
	* @businessObject LimityAP
	*/
	interface LimityAP {
		/**Detail Seznam rkai pro přípravu.*/
		read(rq?:Gordic.Ada.Interface.GSrvdlimDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvdlimDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvdlimDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvdlimDto>>;
		/**Seznam Seznam rkai pro přípravu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvdlimDto>>;
		/**Počet Seznam rkai pro přípravu.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Seznam rkai pro přípravu.*/
		create(rq?:Gordic.Ada.Interface.GSrvdlimDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvdlimDto>>;
		/**Oprava Seznam rkai pro přípravu.*/
		update(rq?:Gordic.Ada.Interface.GSrvdlimDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvdlimDto>>;
		/**Oprava resp. založení Seznam rkai pro přípravu.*/
		upsert(rq?:Gordic.Ada.Interface.GSrvdlimDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvdlimDto>>;
		/**Odstranění Seznam rkai pro přípravu.*/
		delete(rq?:Gordic.Ada.Interface.GSrvdlimDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvdlimDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvdlimDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		LimityAP: ServiceBase & Catalog.LimityAP;
	}
	const LimityAP: Client["LimityAP"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Seznam rkai pro přípravu.*/
	const enum GSrvdlimFilter {
		/**Ičo.*/
		ico,
		/**Rok.*/
		rok,
		/**Id tzd.*/
		id_tzd,
		/**Id vyb.*/
		id_vyb,
		/**Id eds.*/
		id_eds,
		/**Rok lim.*/
		rok_lim,
		/**C limit.*/
		c_limit,
		/**C limit vaz.*/
		c_limit_vaz,
		/**C limit nevaz.*/
		c_limit_nevaz,
		/**Aktivita.*/
		aktivita,
		/**Datumum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**ixs_fun.*/
		ixs_fun,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGSrvsdde.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Subrady ADA
	* @domain FinAkce
	* @businessObject AkceSubrada
	*/
	interface AkceSubrada {
		/**Seznam Subrady ADA*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvsddeDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceSubrada: ServiceBase & Catalog.AkceSubrada;
	}
	const AkceSubrada: Client["AkceSubrada"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Subrady ADA*/
	const enum GSrvsddeFilter {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**ixs_pla*/
		ixs_pla,
		/**subrada*/
		subrada,
		/**nazev*/
		nazev,
		/**maska*/
		maska,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**cislo_od*/
		cislo_od,
		/**cislo_do*/
		cislo_do,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGSrvsmsa.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Seznam ADA konfigurace.
	* @domain ADAKonfigurace
	* @businessObject Srvsmsa
	*/
	interface Srvsmsa {
		/**Detail Seznam ADA konfigurace.*/
		read(rq?:Gordic.Ada.Interface.GSrvsmsaDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvsmsaDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvsmsaDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvsmsaDto>>;
		/**Seznam Seznam ADA konfigurace.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvsmsaDto>>;
		/**Založení Seznam ADA konfigurace.*/
		create(rq?:Gordic.Ada.Interface.GSrvsmsaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsmsaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsmsaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsmsaDto>>;
		/**Oprava Seznam ADA konfigurace.*/
		update(rq?:Gordic.Ada.Interface.GSrvsmsaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsmsaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsmsaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsmsaDto>>;
		/**Oprava resp. založení Seznam ADA konfigurace.*/
		upsert(rq?:Gordic.Ada.Interface.GSrvsmsaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsmsaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsmsaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsmsaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Srvsmsa: ServiceBase & Catalog.Srvsmsa;
	}
	const Srvsmsa: Client["Srvsmsa"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Seznam ADA konfigurace.*/
	const enum GSrvsmsaFilter {
		/**Ičo.*/
		ico,
		/**Rok od.*/
		rok_od,
		/**Ktg akce.*/
		ktg_akce,
		/**Te1 msk.*/
		te1_msk,
		/**Rok do.*/
		rok_do,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGSrvsppa.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Seznam rkai pro přípravu.
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkcePriprava {
		/**Seznam alci pro přípravu z BAR.*/
		generateBAR(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
		/**Detail Seznam rkai pro přípravu.*/
		read(rq?:Gordic.Ada.Interface.GSrvsppaDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GSrvsppaDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GSrvsppaDto>,GServiceReadResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
		/**Seznam Seznam rkai pro přípravu.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
		/**Počet Seznam rkai pro přípravu.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Seznam rkai pro přípravu.*/
		create(rq?:Gordic.Ada.Interface.GSrvsppaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
		/**Oprava Seznam rka
		*     i pro přípravu.
		*/
		update(rq?:Gordic.Ada.Interface.GSrvsppaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
		/**Oprava Seznam rkai pro přípravu.*/
		updateAll(rq?:Gordic.Ada.Interface.GSrvsppaDto|CallParams<GServiceGroupRequest<Gordic.Ada.Interface.GSrvsppaDto>>): _Task<GServiceGroupRequest<Gordic.Ada.Interface.GSrvsppaDto>,GServiceGroupResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
		/**Odstranění Seznam rkai pro přípravu.*/
		delete(rq?:Gordic.Ada.Interface.GSrvsppaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
		/**Odstranění Seznam rkai pro přípravu.*/
		delete_All(rq?:CallParams<{rq:GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>,vlastni:boolean}>): _Task<{rq:GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>,vlastni:boolean},GServiceActionResponse<Gordic.Ada.Interface.GAkceVysledekDto>>;
		/**Založení akce pro přípravu.*/
		create_Akce(rq?:Gordic.Ada.Interface.GSrvsppaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GSrvsppaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GSrvsppaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkcePriprava: ServiceBase & Catalog.AkcePriprava;
	}
	const AkcePriprava: Client["AkcePriprava"];
}
declare namespace Gordic.Ada.Interface {
	/**Filtr pro Seznam rkai pro přípravu.*/
	const enum GSrvsppaFilter {
		/**Rok.*/
		rok,
		/**Ičo.*/
		ico,
		/**Číslo.*/
		cislo,
		/**Název.*/
		nazev,
		/**Typ.*/
		typ,
		/**Adresa1.*/
		adresa1,
		/**Adresa2.*/
		adresa2,
		/**Psc.*/
		psc,
		/**Adresa3.*/
		adresa3,
		/**Fin od.*/
		fin_od,
		/**Fin do.*/
		fin_do,
		/**Real od.*/
		real_od,
		/**Real do.*/
		real_do,
		/**Příjmení.*/
		prijmeni,
		/**Jméno.*/
		jmeno,
		/**Os číslo.*/
		os_cislo,
		/**Telefon.*/
		telefon,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Ktg akce.*/
		ktg_akce,
		/**Skp akce.*/
		skp_akce,
		/**Psk akce.*/
		psk_akce,
		/**Aktivita.*/
		aktivita,
		/**Inv cis.*/
		inv_cis,
		/**Mandatar.*/
		mandatar,
		/**T nks.*/
		t_nks,
		/**Nákladové středisko.*/
		nks,
		/**Xpf pf.*/
		xpf_pf,
		/**Zad.*/
		zad,
		/**Cevid.*/
		cevid,
		/**Cpp.*/
		cpp,
		/**Chp.*/
		chp,
		/**Cip.*/
		cip,
		/**C nato.*/
		c_nato,
		/**C ipf.*/
		c_ipf,
		/**Cpps01.*/
		cpps01,
		/**Cpps02.*/
		cpps02,
		/**Cpps03.*/
		cpps03,
		/**Cpps04.*/
		cpps04,
		/**Cpps05.*/
		cpps05,
		/**Identifikátor pla.*/
		ixs_pla,
		/**Mj.*/
		mj,
		/**C pd.*/
		c_pd,
		/**Číslo pd.*/
		cislo_pd,
		/**Xpf nato.*/
		xpf_nato,
		/**Cis real.*/
		cis_real,
		/**Prij dot.*/
		prij_dot,
		/**Skp.*/
		skp,
		/**C celk.*/
		c_celk,
		/**Identifikátor cia.*/
		ixs_cia,
		/**Funkce akt.*/
		ixs_fun_akt,
		/**Účetní středisko.*/
		ucs,
		/**Funkce zad.*/
		ixs_fun_zad,
		/**Typ vzb.*/
		typ_vzb,
		/**Upresneni.*/
		upresneni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGVepspla.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - věcný profil ADA
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkceVecnyProfil {
		/**Detail věcný profil ADA*/
		read(rq?:Gordic.Ada.Interface.GVepsplaDto|CallParams<GServiceReadRequest<Gordic.Ada.Interface.GVepsplaDto>>): _Task<GServiceReadRequest<Gordic.Ada.Interface.GVepsplaDto>,GServiceReadResponse<Gordic.Ada.Interface.GVepsplaDto>>;
		/**Seznam věcný profil ADA*/
		list(rq?:Gordic.Ada.Interface.GVepsplaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GVepsplaDto>>;
		/**Založení věcný profil ADA*/
		create(rq?:Gordic.Ada.Interface.GVepsplaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GVepsplaDto>>;
		/**Oprava věcný profil ADA*/
		update(rq?:Gordic.Ada.Interface.GVepsplaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GVepsplaDto>>;
		/**Odstranění věcný profil ADA*/
		delete(rq?:Gordic.Ada.Interface.GVepsplaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GVepsplaDto>>;
		/**Zrušení Odstranění věcný profil ADA*/
		undelete(rq?:Gordic.Ada.Interface.GVepsplaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GVepsplaDto>>;
		/**Schvalit věcný profil ADA*/
		schvalit(rq?:Gordic.Ada.Interface.GVepsplaDto|CallParams<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>>): _Task<GServiceSaveRequest<Gordic.Ada.Interface.GVepsplaDto>,GServiceSaveResponse<Gordic.Ada.Interface.GVepsplaDto>>;
		/**Seznam su pro věcný profil ADA*/
		list_Suma(rq?:Gordic.Ada.Interface.GVepsplaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GVepsplaSumaDto>>;
		/**CreateNewDefaultItem*/
		createNewDefaultItem(rq?:CallParams<{in_cislo:string}>): _Task<{in_cislo:string},GServiceReadResponse<Gordic.Ada.Interface.GVepsplaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkceVecnyProfil: ServiceBase & Catalog.AkceVecnyProfil;
	}
	const AkceVecnyProfil: Client["AkceVecnyProfil"];
}
declare namespace Gordic.Ada.Interface {
	/**Permissions pro věcný profil*/
	interface GVepsplaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno založit nový záznam*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat záznam*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno schválit záznam*/
		LzeSchvalit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat záznam*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zrušit storno záznamu*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GVepsplaPermissionsNames { LzeNovy = "LzeNovy", LzeEvidovat = "LzeEvidovat", LzeSchvalit = "LzeSchvalit", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno",}
	const enum GVepsplaPermissionsFragments { LzeNovy = "*", LzeEvidovat = "*", LzeSchvalit = "*", LzeStornovat = "*", LzeZrusitStorno = "*",}
	const enum GVepsplaPermissionsTypes { LzeNovy = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeSchvalit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GVepsplaPermissionsTypeLengths {}
	/**Filtr pro věcný profil ADA*/
	const enum GVepsplaFilter {
		/**ico*/
		ico,
		/**rok*/
		rok,
		/**cislo*/
		cislo,
		/**cis_plan*/
		cis_plan,
		/**ixs_poz*/
		ixs_poz,
		/**cis_poz*/
		cis_poz,
		/**m_plan*/
		m_plan,
		/**m_vz*/
		m_vz,
		/**m_sml*/
		m_sml,
		/**m_vz_sml*/
		m_vz_sml,
		/**m_obj*/
		m_obj,
		/**m_obj_sml*/
		m_obj_sml,
		/**m_fak*/
		m_fak,
		/**m_maj*/
		m_maj,
		/**c_plan*/
		c_plan,
		/**c_vz*/
		c_vz,
		/**c_sml*/
		c_sml,
		/**c_vz_sml*/
		c_vz_sml,
		/**c_obj*/
		c_obj,
		/**c_obj_sml*/
		c_obj_sml,
		/**c_fak*/
		c_fak,
		/**c_maj*/
		c_maj,
		/**skp*/
		skp,
		/**mat_cis*/
		mat_cis,
		/**nazev_skp*/
		nazev_skp,
		/**nazev*/
		nazev,
		/**skupina_id*/
		skupina_id,
		/**drh_id*/
		drh_id,
		/**mj*/
		mj,
		/**vyr_cis*/
		vyr_cis,
		/**kod_pol*/
		kod_pol,
		/**ucs*/
		ucs,
		/**nks*/
		nks,
		/**nks_zad*/
		nks_zad,
		/**duvod_poz*/
		duvod_poz,
		/**drh_poz*/
		drh_poz,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**inv_cis*/
		inv_cis,
		/**popis*/
		popis,
		/**ixs_dup*/
		ixs_dup,
		/**znam*/
		znam,
		/**vp_stav*/
		vp_stav,
		/**rok_vp*/
		rok_vp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\IGWflsesxAda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**I(Isl)GWflsesx - Přílohy obecného subjektu.
	* @domain FinAkce
	* @businessObject FinAkce
	*/
	interface AkcePrilohy {
		/**Vrátí seznam historie písemnosti dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Ada.Interface.GAdaAttachmentDto>>;
		read(rq?:Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto|CallParams<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Wfl.Interface.GIxsAttachmentReadRequestDto>,GServiceReadResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		upsert(rq?:Gordic.Wfl.Interface.GAttachmentUploadDto|CallParams<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>>): _Task<GServiceSaveRequest<Gordic.Wfl.Interface.GAttachmentUploadDto>,GServiceSaveResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		remove(rq?:Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentRemoveRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GAttachmentDto>>;
		/**DownloadAll*/
		downloadAll(rq?:Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GIxsAttachmentDownloadAllRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GDownloadAllAttachmentsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AkcePrilohy: ServiceBase & Catalog.AkcePrilohy;
	}
	const AkcePrilohy: Client["AkcePrilohy"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GAgDokladyFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
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
		/**ixs_fun*/
		ixs_fun,
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
		/**ixp*/
		ixp,
		/**ixs_pri*/
		ixs_pri,
		/**ucs*/
		ucs,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GAkceDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Testovaci verze Detailu dokladu DTO*/
	interface GAkceDto {
		/**DBCOLUMN:SeznamDokladu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokladu.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:SeznamDokladu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ*/
		typ?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_txt*/
		typ_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.adresa1*/
		adresa1?: string|null;
		/**DBCOLUMN:SeznamDokladu.adresa2*/
		adresa2?: string|null;
		/**DBCOLUMN:SeznamDokladu.psc*/
		psc?: string|null;
		/**DBCOLUMN:SeznamDokladu.adresa3*/
		adresa3?: string|null;
		/**DBCOLUMN:SeznamDokladu.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:SeznamDokladu.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:SeznamDokladu.real_od*/
		real_od?: number|null;
		/**DBCOLUMN:SeznamDokladu.real_do*/
		real_do?: number|null;
		/**DBCOLUMN:SeznamDokladujmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:SeznamDokladu.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:SeznamDokladu.os_cislo*/
		os_cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.telefon*/
		telefon?: string|null;
		/**DBCOLUMN:SeznamDokladu.upresneni*/
		upresneni?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamDokladu.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ktg_akce*/
		ktg_akce?: number|null;
		/**DBCOLUMN:SeznamDokladu.skp_akc*/
		skp_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akc*/
		psk_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.skp_akc*/
		skp_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akc*/
		psk_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamDokladu.aktivita_s*/
		aktivita_s?: string|null;
		/**DBCOLUMN:SeznamDokladu.stav_real*/
		stav_real?: number|null;
		/**DBCOLUMN:SeznamDokladu.stav_real_txt*/
		stav_real_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:SeznamDokladu.mandatar*/
		mandatar?: string|null;
		/**DBCOLUMN:SeznamDokladu.t_nks*/
		t_nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamDokladu.xpf_pf*/
		xpf_pf?: string|null;
		/**DBCOLUMN:SeznamDokladu.zad*/
		zad?: string|null;
		/**DBCOLUMN:SeznamDokladu.cevid*/
		cevid?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpp*/
		cpp?: string|null;
		/**DBCOLUMN:SeznamDokladu.chp*/
		chp?: string|null;
		/**DBCOLUMN:SeznamDokladu.cip*/
		cip?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_nato*/
		c_nato?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_ipf*/
		c_ipf?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.cpps01*/
		cpps01?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps02*/
		cpps02?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps03*/
		cpps03?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps04*/
		cpps04?: string|null;
		/**DBCOLUMN:SeznamDokladu.cpps05*/
		cpps05?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla_txt*/
		ixs_pla_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.mj*/
		mj?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_pd*/
		c_pd?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.cislo_pd*/
		cislo_pd?: string|null;
		/**DBCOLUMN:SeznamDokladu.xpf_nato*/
		xpf_nato?: string|null;
		/**DBCOLUMN:SeznamDokladu.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamDokladu.prij_dot*/
		prij_dot?: string|null;
		/**DBCOLUMN:SeznamDokladu.skp*/
		skp?: string|null;
		/**DBCOLUMN:SeznamDokladu.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_nazev*/
		ixs_fun_akt_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_nazev_ref*/
		ixs_fun_akt_nazev_ref?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_az*/
		ixs_fun_az?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_az_nazev*/
		ixs_fun_az_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_az_nazev_ref*/
		ixs_fun_az_nazev_ref?: string|null;
		/**DBCOLUMN:SeznamDokladu.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_zad*/
		ixs_fun_zad?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_zad_nazev*/
		ixs_fun_zad_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_sro_az*/
		ixs_sro_az?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_vzb*/
		typ_vzb?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_vzb_txt*/
		typ_vzb_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladu.priz_az*/
		priz_az?: number|null;
		/**DBCOLUMN:SeznamDokladu.stav_az*/
		stav_az?: number|null;
		/**DBCOLUMN:SeznamDokladu.priz_az_txt*/
		stav_az_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.typ_akce_sum*/
		typ_akce_sum?: number|null;
		/**DBCOLUMN:SeznamDokladu.typ_akce_sum_txt*/
		typ_akce_sum_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.stav_inp*/
		stav_inp?: number|null;
		/**DBCOLUMN:SeznamDokladu.priz_az_b*/
		priz_az_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.stav_inp_b*/
		stav_inp_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.priz_az_s*/
		priz_az_s?: string|null;
		/**DBCOLUMN:SeznamDokladu.stav_inp_s*/
		stav_inp_s?: string|null;
		/**DBCOLUMN:SeznamDokladu.pocet_kompetentu*/
		pocet_kompetentu?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_isp*/
		pocet_isp?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_dtzd*/
		pocet_dtzd?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_rozpis*/
		pocet_rozpis?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_priloh*/
		pocet_priloh?: number|null;
		/**DBCOLUMN:SeznamDokladu.c_0*/
		c_0?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_kc*/
		c_kc?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_1*/
		c_1?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2*/
		c_2?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_3*/
		c_3?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_4*/
		c_4?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_6*/
		c_6?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_7*/
		c_7?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_8*/
		c_8?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_9*/
		c_9?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_10*/
		c_10?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_11*/
		c_11?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_12*/
		c_12?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_13*/
		c_13?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_14*/
		c_14?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_15*/
		c_15?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_16*/
		c_16?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_17*/
		c_17?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_18*/
		c_18?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_21*/
		c_21?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_23*/
		c_23?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_25*/
		c_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_34*/
		c_34?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_54*/
		c_54?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_66*/
		c_66?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2_3_7_8*/
		c_2_3_7_8?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_23_25*/
		c_23_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2_3_7_8_23_25*/
		c_2_3_7_8_23_25?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_2_3_7_8_23_25_14_34_54*/
		c_2_3_7_8_23_25_14_34_54?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_6_18*/
		c_6_18?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_10_11*/
		c_10_11?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_15_16_17*/
		c_15_16_17?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_nasmlouvat*/
		c_zbyva_nasmlouvat?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.c_zbyva_cerpat*/
		c_zbyva_cerpat?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladu.vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**DBCOLUMN:SeznamDokladu.new_rok*/
		new_rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_pla*/
		new_ixs_pla?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_cislo*/
		new_cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_fun_akt*/
		new_ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_aktivita*/
		new_aktivita?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_stav_real*/
		new_stav_real?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_stav_az*/
		new_stav_az?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_typ*/
		new_typ?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csl*/
		ixs_csl?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csp*/
		ixs_csp?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_prr*/
		ixs_prr?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_prr_txt*/
		ixs_prr_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_prr*/
		new_ixs_prr?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_tri*/
		ixs_tri?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_tri_txt*/
		ixs_tri_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_tri_prr*/
		new_tri_prr?: string|null;
		/**DBCOLUMN:SeznamDokladu.priz_ram_doh*/
		priz_ram_doh?: number|null;
		/**DBCOLUMN:SeznamDokladu.priz_ram_doh_b*/
		priz_ram_doh_b?: boolean|null;
		/**Permissions*/
		Permissions?: Gordic.Ada.Interface.GAkcePermissions|null;
		/**Navigacni vlastnost pro Vlastnosti*/
		Vlastnost?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Navigacni vlastnost pro Vlastnika (ixs_fun_akt)*/
		Vlastnik?: Gordic.Gin.Interface.GFunkcniMistoDto|null;
		/**DBCOLUMN:SeznamDokladu.pocet_kompetentu_ja*/
		pocet_kompetentu_ja?: number|null;
		/**DBCOLUMN:SeznamDokladu.pocet_prr*/
		pocet_prr?: number|null;
		/**JsemKompetent*/
		JsemKompetent?: boolean|null;
		/**JsemKompetentAZ*/
		JsemKompetentAZ?: boolean|null;
		/**mazat_kompetenty*/
		mazat_kompetenty?: boolean|null;
		/**new _kompetenti*/
		new_kompetenti?: Gordic.Ada.Interface.GKompetentiAkceDto[]|null;
		/**DBCOLUMN:SeznamDokladu.prev_nazev_skp*/
		prev_nazev_skp?: string|null;
		/**DBCOLUMN:SeznamDokladu.prev_nazev_psk*/
		prev_nazev_psk?: string|null;
		/**ControlsSystemAggregated*/
		ControlsSystemAggregated?: Gordic.Gin.Interface.GControlsSystemAggregatedDto|null;
		/**vlastnictvi*/
		vlastnictvi?: number|null;
	}
	const enum GAkceDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", nazev = "nazev", typ = "typ", typ_txt = "typ_txt", adresa1 = "adresa1", adresa2 = "adresa2", psc = "psc", adresa3 = "adresa3", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", prijmeni = "prijmeni", jmeno = "jmeno", os_cislo = "os_cislo", telefon = "telefon", upresneni = "upresneni", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ktg_akce = "ktg_akce", skp_akce = "skp_akce", psk_akce = "psk_akce", skp_akc = "skp_akc", psk_akc = "psk_akc", aktivita = "aktivita", aktivita_s = "aktivita_s", stav_real = "stav_real", stav_real_txt = "stav_real_txt", inv_cis = "inv_cis", mandatar = "mandatar", t_nks = "t_nks", nks = "nks", xpf_pf = "xpf_pf", zad = "zad", cevid = "cevid", cpp = "cpp", chp = "chp", cip = "cip", c_nato = "c_nato", c_ipf = "c_ipf", cpps01 = "cpps01", cpps02 = "cpps02", cpps03 = "cpps03", cpps04 = "cpps04", cpps05 = "cpps05", ixs_pla = "ixs_pla", ixs_pla_txt = "ixs_pla_txt", mj = "mj", c_pd = "c_pd", cislo_pd = "cislo_pd", xpf_nato = "xpf_nato", cis_real = "cis_real", prij_dot = "prij_dot", skp = "skp", c_celk = "c_celk", ixs_fun_akt = "ixs_fun_akt", ixs_fun_akt_nazev = "ixs_fun_akt_nazev", ixs_fun_akt_nazev_ref = "ixs_fun_akt_nazev_ref", ixs_fun_az = "ixs_fun_az", ixs_fun_az_nazev = "ixs_fun_az_nazev", ixs_fun_az_nazev_ref = "ixs_fun_az_nazev_ref", ucs = "ucs", ixs_fun_zad = "ixs_fun_zad", ixs_fun_zad_nazev = "ixs_fun_zad_nazev", ixs_sro_az = "ixs_sro_az", typ_vzb = "typ_vzb", typ_vzb_txt = "typ_vzb_txt", dat_mpd = "dat_mpd", priz_az = "priz_az", stav_az = "stav_az", stav_az_txt = "stav_az_txt", typ_akce_sum = "typ_akce_sum", typ_akce_sum_txt = "typ_akce_sum_txt", stav_inp = "stav_inp", priz_az_b = "priz_az_b", stav_inp_b = "stav_inp_b", priz_az_s = "priz_az_s", stav_inp_s = "stav_inp_s", pocet_kompetentu = "pocet_kompetentu", pocet_isp = "pocet_isp", pocet_dtzd = "pocet_dtzd", pocet_rozpis = "pocet_rozpis", pocet_priloh = "pocet_priloh", c_0 = "c_0", c_kc = "c_kc", c_1 = "c_1", c_2 = "c_2", c_3 = "c_3", c_4 = "c_4", c_6 = "c_6", c_7 = "c_7", c_8 = "c_8", c_9 = "c_9", c_10 = "c_10", c_11 = "c_11", c_12 = "c_12", c_13 = "c_13", c_14 = "c_14", c_15 = "c_15", c_16 = "c_16", c_17 = "c_17", c_18 = "c_18", c_21 = "c_21", c_23 = "c_23", c_25 = "c_25", c_34 = "c_34", c_54 = "c_54", c_66 = "c_66", c_2_3_7_8 = "c_2_3_7_8", c_23_25 = "c_23_25", c_2_3_7_8_23_25 = "c_2_3_7_8_23_25", c_2_3_7_8_23_25_14_34_54 = "c_2_3_7_8_23_25_14_34_54", c_6_18 = "c_6_18", c_10_11 = "c_10_11", c_15_16_17 = "c_15_16_17", c_zbyva_nasmlouvat = "c_zbyva_nasmlouvat", c_zbyva_cerpat = "c_zbyva_cerpat", vlastnosti = "vlastnosti", new_rok = "new_rok", new_ixs_pla = "new_ixs_pla", new_cislo = "new_cislo", new_ixs_fun_akt = "new_ixs_fun_akt", new_aktivita = "new_aktivita", new_stav_real = "new_stav_real", new_stav_az = "new_stav_az", new_typ = "new_typ", ixs_csl = "ixs_csl", ixs_csp = "ixs_csp", ixs_prr = "ixs_prr", ixs_prr_txt = "ixs_prr_txt", new_ixs_prr = "new_ixs_prr", ixs_tri = "ixs_tri", ixs_tri_txt = "ixs_tri_txt", new_tri_prr = "new_tri_prr", priz_ram_doh = "priz_ram_doh", priz_ram_doh_b = "priz_ram_doh_b", Permissions = "Permissions", Vlastnost = "Vlastnost", Vlastnik = "Vlastnik", pocet_kompetentu_ja = "pocet_kompetentu_ja", pocet_prr = "pocet_prr", JsemKompetent = "JsemKompetent", JsemKompetentAZ = "JsemKompetentAZ", mazat_kompetenty = "mazat_kompetenty", new_kompetenti = "new_kompetenti", prev_nazev_skp = "prev_nazev_skp", prev_nazev_psk = "prev_nazev_psk", ControlsSystemAggregated = "ControlsSystemAggregated", vlastnictvi = "vlastnictvi",}
	const enum GAkceDtoFragments { rok = "main", ico = "main", cislo = "main", ixs_cia = "main", nazev = "main", typ = "main", typ_txt = "main", adresa1 = "main", adresa2 = "main", psc = "main", adresa3 = "main", fin_od = "main", fin_do = "main", real_od = "main", real_do = "main", prijmeni = "main", jmeno = "main", os_cislo = "main", telefon = "main", upresneni = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main", ktg_akce = "main", skp_akce = "main", psk_akce = "main", skp_akc = "main", psk_akc = "main", aktivita = "main", aktivita_s = "main", stav_real = "main", stav_real_txt = "main", inv_cis = "main", mandatar = "main", t_nks = "main", nks = "main", xpf_pf = "main", zad = "main", cevid = "main", cpp = "main", chp = "main", cip = "main", c_nato = "main", c_ipf = "main", cpps01 = "main", cpps02 = "main", cpps03 = "main", cpps04 = "main", cpps05 = "main", ixs_pla = "main", ixs_pla_txt = "main", mj = "main", c_pd = "main", cislo_pd = "main", xpf_nato = "main", cis_real = "main", prij_dot = "main", skp = "main", c_celk = "main", ixs_fun_akt = "main", ixs_fun_akt_nazev = "main", ixs_fun_akt_nazev_ref = "main", ixs_fun_az = "main", ixs_fun_az_nazev = "main", ixs_fun_az_nazev_ref = "main", ucs = "main", ixs_fun_zad = "main", ixs_fun_zad_nazev = "main", ixs_sro_az = "main", typ_vzb = "main", typ_vzb_txt = "main", dat_mpd = "main", priz_az = "main", stav_az = "main", stav_az_txt = "main", typ_akce_sum = "main", typ_akce_sum_txt = "main", stav_inp = "main", priz_az_b = "main", stav_inp_b = "main", priz_az_s = "main", stav_inp_s = "main", pocet_kompetentu = "main", pocet_isp = "main", pocet_dtzd = "main", pocet_rozpis = "main", pocet_priloh = "main", c_0 = "main", c_kc = "main", c_1 = "main", c_2 = "main", c_3 = "main", c_4 = "main", c_6 = "main", c_7 = "main", c_8 = "main", c_9 = "main", c_10 = "main", c_11 = "main", c_12 = "main", c_13 = "main", c_14 = "main", c_15 = "main", c_16 = "main", c_17 = "main", c_18 = "main", c_21 = "main", c_23 = "main", c_25 = "main", c_34 = "main", c_54 = "main", c_66 = "main", c_2_3_7_8 = "main", c_23_25 = "main", c_2_3_7_8_23_25 = "main", c_2_3_7_8_23_25_14_34_54 = "main", c_6_18 = "main", c_10_11 = "main", c_15_16_17 = "main", c_zbyva_nasmlouvat = "main", c_zbyva_cerpat = "main", vlastnosti = "main", new_rok = "main", new_ixs_pla = "main", new_cislo = "main", new_ixs_fun_akt = "main", new_aktivita = "main", new_stav_real = "main", new_stav_az = "main", new_typ = "main", ixs_csl = "main", ixs_csp = "main", ixs_prr = "main", ixs_prr_txt = "main", new_ixs_prr = "main", ixs_tri = "main", ixs_tri_txt = "main", new_tri_prr = "main", priz_ram_doh = "main", priz_ram_doh_b = "main", Permissions = "main", Vlastnost = "main", Vlastnik = "main", pocet_kompetentu_ja = "main", pocet_prr = "main", JsemKompetent = "main", JsemKompetentAZ = "main", mazat_kompetenty = "main", new_kompetenti = "main", prev_nazev_skp = "main", prev_nazev_psk = "main", ControlsSystemAggregated = "DSG_FRAGMENT", vlastnictvi = "*",}
	const enum GAkceDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", nazev = "string", typ = "number", typ_txt = "string", adresa1 = "string", adresa2 = "string", psc = "string", adresa3 = "string", fin_od = "number", fin_do = "number", real_od = "number", real_do = "number", prijmeni = "string", jmeno = "string", os_cislo = "string", telefon = "string", upresneni = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ktg_akce = "number", skp_akce = "string", psk_akce = "string", skp_akc = "string", psk_akc = "string", aktivita = "number", aktivita_s = "string", stav_real = "number", stav_real_txt = "string", inv_cis = "string", mandatar = "string", t_nks = "string", nks = "string", xpf_pf = "string", zad = "string", cevid = "string", cpp = "string", chp = "string", cip = "string", c_nato = "JsonDecimal", c_ipf = "JsonDecimal", cpps01 = "string", cpps02 = "string", cpps03 = "string", cpps04 = "string", cpps05 = "string", ixs_pla = "string", ixs_pla_txt = "string", mj = "string", c_pd = "JsonDecimal", cislo_pd = "string", xpf_nato = "string", cis_real = "string", prij_dot = "string", skp = "string", c_celk = "JsonDecimal", ixs_fun_akt = "string", ixs_fun_akt_nazev = "string", ixs_fun_akt_nazev_ref = "string", ixs_fun_az = "string", ixs_fun_az_nazev = "string", ixs_fun_az_nazev_ref = "string", ucs = "string", ixs_fun_zad = "string", ixs_fun_zad_nazev = "string", ixs_sro_az = "string", typ_vzb = "number", typ_vzb_txt = "string", dat_mpd = "JsonDate", priz_az = "number", stav_az = "number", stav_az_txt = "string", typ_akce_sum = "number", typ_akce_sum_txt = "string", stav_inp = "number", priz_az_b = "boolean", stav_inp_b = "boolean", priz_az_s = "string", stav_inp_s = "string", pocet_kompetentu = "number", pocet_isp = "number", pocet_dtzd = "number", pocet_rozpis = "number", pocet_priloh = "number", c_0 = "JsonDecimal", c_kc = "JsonDecimal", c_1 = "JsonDecimal", c_2 = "JsonDecimal", c_3 = "JsonDecimal", c_4 = "JsonDecimal", c_6 = "JsonDecimal", c_7 = "JsonDecimal", c_8 = "JsonDecimal", c_9 = "JsonDecimal", c_10 = "JsonDecimal", c_11 = "JsonDecimal", c_12 = "JsonDecimal", c_13 = "JsonDecimal", c_14 = "JsonDecimal", c_15 = "JsonDecimal", c_16 = "JsonDecimal", c_17 = "JsonDecimal", c_18 = "JsonDecimal", c_21 = "JsonDecimal", c_23 = "JsonDecimal", c_25 = "JsonDecimal", c_34 = "JsonDecimal", c_54 = "JsonDecimal", c_66 = "JsonDecimal", c_2_3_7_8 = "JsonDecimal", c_23_25 = "JsonDecimal", c_2_3_7_8_23_25 = "JsonDecimal", c_2_3_7_8_23_25_14_34_54 = "JsonDecimal", c_6_18 = "JsonDecimal", c_10_11 = "JsonDecimal", c_15_16_17 = "JsonDecimal", c_zbyva_nasmlouvat = "JsonDecimal", c_zbyva_cerpat = "JsonDecimal", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", new_rok = "number", new_ixs_pla = "string", new_cislo = "string", new_ixs_fun_akt = "string", new_aktivita = "number", new_stav_real = "number", new_stav_az = "number", new_typ = "number", ixs_csl = "string", ixs_csp = "string", ixs_prr = "string", ixs_prr_txt = "string", new_ixs_prr = "string", ixs_tri = "string", ixs_tri_txt = "string", new_tri_prr = "string", priz_ram_doh = "number", priz_ram_doh_b = "boolean", Permissions = "Gordic.Ada.Interface.GAkcePermissions", Vlastnost = "Gordic.Gin.Interface.GGinVlastnostiDataDto", Vlastnik = "Gordic.Gin.Interface.GFunkcniMistoDto", pocet_kompetentu_ja = "number", pocet_prr = "number", JsemKompetent = "boolean", JsemKompetentAZ = "boolean", mazat_kompetenty = "boolean", new_kompetenti = "Gordic.Ada.Interface.GKompetentiAkceDto[]", prev_nazev_skp = "string", prev_nazev_psk = "string", ControlsSystemAggregated = "Gordic.Gin.Interface.GControlsSystemAggregatedDto", vlastnictvi = "number",}
	const enum GAkceDtoTypeLengths { ico = 10, cislo = 16, ixs_cia = 12, nazev = 254, typ_txt = 254, adresa1 = 50, adresa2 = 50, psc = 12, adresa3 = 50, prijmeni = 36, jmeno = 24, os_cislo = 10, telefon = 254, upresneni = 254, zmenu_prov = 12, zmenu_prov_txt = 254, skp_akce = 6, psk_akce = 4, skp_akc = 20, psk_akc = 20, inv_cis = 12, mandatar = 5, t_nks = 50, nks = 12, xpf_pf = 63, zad = 35, cevid = 6, cpp = 6, chp = 6, cip = 13, cpps01 = 6, cpps02 = 6, cpps03 = 6, cpps04 = 6, cpps05 = 6, ixs_pla = 12, ixs_pla_txt = 12, mj = 5, cislo_pd = 20, xpf_nato = 20, cis_real = 6, prij_dot = 254, skp = 15, ixs_fun_akt = 12, ixs_fun_akt_nazev = 254, ixs_fun_akt_nazev_ref = 254, ixs_fun_az = 12, ixs_fun_az_nazev = 254, ixs_fun_az_nazev_ref = 254, ucs = 10, ixs_fun_zad = 12, ixs_fun_zad_nazev = 254, ixs_sro_az = 12, typ_vzb_txt = 254, new_ixs_pla = 12, new_cislo = 12, new_ixs_fun_akt = 12, ixs_csl = 12, ixs_csp = 12, ixs_prr = 12, ixs_prr_txt = 12, new_ixs_prr = 12, ixs_tri = 12, ixs_tri_txt = 12, new_tri_prr = 12,}
	/**GAkcePermissions*/
	interface GAkcePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
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
	const enum GAkcePermissionsNames { LzeCist = "LzeCist", LzeEditovat = "LzeEditovat", LzeMazat = "LzeMazat", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat", JsemVlastnik = "JsemVlastnik",}
	const enum GAkcePermissionsFragments { LzeCist = "*", LzeEditovat = "*", LzeMazat = "*", LzePredat = "*", LzePrevzit = "*", LzePreevidovat = "*", JsemVlastnik = "*",}
	const enum GAkcePermissionsTypes { LzeCist = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeMazat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", JsemVlastnik = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GAkcePermissionsTypeLengths {}
	/**GAkcePermissions*/
	interface GAkceServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
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
	const enum GAkceServicePermissionsNames { LzeVytvorit = "LzeVytvorit", LzeEditovat = "LzeEditovat", LzeMazat = "LzeMazat", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat",}
	const enum GAkceServicePermissionsFragments { LzeVytvorit = "*", LzeEditovat = "*", LzeMazat = "*", LzePredat = "*", LzePrevzit = "*", LzePreevidovat = "*",}
	const enum GAkceServicePermissionsTypes { LzeVytvorit = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeMazat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GAkceServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GAkceGenerDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Testovaci verze Detailu dokladu DTO*/
	interface GAkceGenerDto {
		/**DBCOLUMN:SeznamDokladu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokladu.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:SeznamDokladu.cislo_od*/
		cislo_od?: string|null;
		/**DBCOLUMN:SeznamDokladu.cislo_do*/
		cislo_do?: string|null;
		/**DBCOLUMN:SeznamDokladu.maska*/
		maska?: string|null;
	}
	const enum GAkceGenerDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", cislo_od = "cislo_od", cislo_do = "cislo_do", maska = "maska",}
	const enum GAkceGenerDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_cia = "*", cislo_od = "*", cislo_do = "*", maska = "*",}
	const enum GAkceGenerDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", cislo_od = "string", cislo_do = "string", maska = "string",}
	const enum GAkceGenerDtoTypeLengths { ico = 10, cislo = 16, ixs_cia = 12, cislo_od = 16, cislo_do = 16, maska = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GAkceHistorieDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvhcia*/
	interface GAkceHistorieDto {
		/**DBCOLUMN:srvhcia.cislo*/
		rok?: number|null;
		/**DBCOLUMN:srvhcia.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvhcia.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:srvhcia.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:srvhcia.popis*/
		zmena_txt?: string|null;
		/**DBCOLUMN:srvhcia.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:srvhcia.zmenu_prov*/
		nazev_rf?: string|null;
		/**DBCOLUMN:srvhcia.nazev_plan*/
		nazev_plan?: string|null;
	}
	const enum GAkceHistorieDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", ixs_pla = "ixs_pla", dat_zmena = "dat_zmena", zmena_txt = "zmena_txt", poznamka = "poznamka", nazev_rf = "nazev_rf", nazev_plan = "nazev_plan",}
	const enum GAkceHistorieDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_cia = "*", ixs_pla = "*", dat_zmena = "*", zmena_txt = "*", poznamka = "*", nazev_rf = "*", nazev_plan = "*",}
	const enum GAkceHistorieDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", ixs_pla = "string", dat_zmena = "JsonDate", zmena_txt = "string", poznamka = "string", nazev_rf = "string", nazev_plan = "string",}
	const enum GAkceHistorieDtoTypeLengths { ico = 10, cislo = 16, ixs_cia = 12, ixs_pla = 12, zmena_txt = 254, poznamka = 254, nazev_rf = 254, nazev_plan = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GAkceKopieDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Testovaci verze Detailu dokladu DTO*/
	interface GAkceKopieDto {
		/**DBCOLUMN:SeznamDokladu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokladu.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csl*/
		ixs_csl?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_prr*/
		ixs_prr?: string|null;
		/**DBCOLUMN:SeznamDokladu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla_txt*/
		ixs_pla_txt?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_rok*/
		new_rok?: number|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_pla*/
		new_ixs_pla?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_cislo*/
		new_cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.new_ixs_fun_akt*/
		new_ixs_fun_akt?: string|null;
		/**DBCOLUMN:SeznamDokladu.priz_kopie_komp_b*/
		priz_kopie_komp_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.priz_kopie_pozn_b*/
		priz_kopie_pozn_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.priz_kopie_isp_b*/
		priz_kopie_isp_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.priz_kopie_hist_pla_b*/
		priz_kopie_hist_pla_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.priz_kopie_vp_b*/
		priz_kopie_vp_b?: boolean|null;
		/**DBCOLUMN:SeznamDokladu.priz_kopie_pril_b*/
		priz_kopie_pril_b?: boolean|null;
	}
	const enum GAkceKopieDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", ixs_csl = "ixs_csl", ixs_prr = "ixs_prr", aktivita = "aktivita", ixs_pla = "ixs_pla", ixs_pla_txt = "ixs_pla_txt", ixs_fun_akt = "ixs_fun_akt", new_rok = "new_rok", new_ixs_pla = "new_ixs_pla", new_cislo = "new_cislo", new_ixs_fun_akt = "new_ixs_fun_akt", priz_kopie_komp_b = "priz_kopie_komp_b", priz_kopie_pozn_b = "priz_kopie_pozn_b", priz_kopie_isp_b = "priz_kopie_isp_b", priz_kopie_hist_pla_b = "priz_kopie_hist_pla_b", priz_kopie_vp_b = "priz_kopie_vp_b", priz_kopie_pril_b = "priz_kopie_pril_b",}
	const enum GAkceKopieDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_cia = "*", ixs_csl = "*", ixs_prr = "*", aktivita = "*", ixs_pla = "*", ixs_pla_txt = "*", ixs_fun_akt = "*", new_rok = "*", new_ixs_pla = "*", new_cislo = "*", new_ixs_fun_akt = "*", priz_kopie_komp_b = "*", priz_kopie_pozn_b = "*", priz_kopie_isp_b = "*", priz_kopie_hist_pla_b = "*", priz_kopie_vp_b = "*", priz_kopie_pril_b = "*",}
	const enum GAkceKopieDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", ixs_csl = "string", ixs_prr = "string", aktivita = "number", ixs_pla = "string", ixs_pla_txt = "string", ixs_fun_akt = "string", new_rok = "number", new_ixs_pla = "string", new_cislo = "string", new_ixs_fun_akt = "string", priz_kopie_komp_b = "boolean", priz_kopie_pozn_b = "boolean", priz_kopie_isp_b = "boolean", priz_kopie_hist_pla_b = "boolean", priz_kopie_vp_b = "boolean", priz_kopie_pril_b = "boolean",}
	const enum GAkceKopieDtoTypeLengths { ico = 10, cislo = 16, ixs_cia = 12, ixs_csl = 12, ixs_prr = 12, ixs_pla = 12, ixs_pla_txt = 12, ixs_fun_akt = 12, new_ixs_pla = 12, new_cislo = 12, new_ixs_fun_akt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GAkcePoznamkyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvdpoz*/
	interface GAkcePoznamkyDto {
		/**DBCOLUMN:srvdpoz.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvdpoz.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvdpoz.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:srvdpoz.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:srvdpoz.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:srvdpoz.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:srvdpoz.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:srvdpoz.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:srvdpoz.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:srvdpoz.nazev_ref*/
		nazev_ref?: string|null;
		/**Název rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:srvdpoz.aktivita*/
		aktivita?: number|null;
	}
	const enum GAkcePoznamkyDtoNames { rok = "rok", ico = "ico", cislo = "cislo", por_cislo = "por_cislo", typ_ag = "typ_ag", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_fun = "ixs_fun", nazev_ref = "nazev_ref", nazev_rf = "nazev_rf", aktivita = "aktivita",}
	const enum GAkcePoznamkyDtoFragments { rok = "*", ico = "*", cislo = "*", por_cislo = "*", typ_ag = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", ixs_fun = "*", nazev_ref = "*", nazev_rf = "*", aktivita = "*",}
	const enum GAkcePoznamkyDtoTypes { rok = "number", ico = "string", cislo = "string", por_cislo = "number", typ_ag = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_fun = "string", nazev_ref = "string", nazev_rf = "string", aktivita = "number",}
	const enum GAkcePoznamkyDtoTypeLengths { ico = 10, cislo = 16, poznamka = 254, zmenu_prov = 12, ixs_fun = 12, nazev_ref = 254, nazev_rf = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GAkceVysledekDto.d.ts 

declare namespace Gordic.Ada.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GDetailDokladuDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GDokladyPocetDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO na filtrovani agendovych dokladu*/
	interface GDokladyPocetDto {
		/**DBCOLUMN:pocet*/
		pocet?: number|null;
	}
	const enum GDokladyPocetDtoNames { pocet = "pocet",}
	const enum GDokladyPocetDtoFragments { pocet = "*",}
	const enum GDokladyPocetDtoTypes { pocet = "number",}
	const enum GDokladyPocetDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GEpospriDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:epospri*/
	interface GEpospriDokladyDto {
		/**DBCOLUMN:epospri.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:epospri.lic*/
		lic?: string|null;
		/**DBCOLUMN:epospri.ico*/
		ico?: string|null;
		/**DBCOLUMN:epospri.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:epospri.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:epospri.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:epospri.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:epospri.ac*/
		ac?: string|null;
		/**DBCOLUMN:epospri.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:epospri.s_po*/
		s_po?: number|null;
		/**DBCOLUMN:epospri.soutez_po*/
		soutez_po?: string|null;
		/**DBCOLUMN:epospri.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:epospri.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:epospri.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:epospri.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:epospri.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_zpo*/
		dat_zpo?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_kos_s*/
		dat_kos_s?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:epospri.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:epospri.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:epospri.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:epospri.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:epospri.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:epospri.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:epospri.cj_po*/
		cj_po?: string|null;
		/**DBCOLUMN:epospri.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:epospri.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:epospri.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:epospri.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:epospri.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:epospri.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:epospri.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:epospri.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:epospri.priz_prip*/
		priz_prip?: number|null;
		/**DBCOLUMN:epospri.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:epospri.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:epospri.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:epospri.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:epospri.mena*/
		mena?: number|null;
		/**DBCOLUMN:epospri.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:epospri.priz_cast*/
		priz_cast?: number|null;
		/**DBCOLUMN:epospri.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:epospri.typ_po*/
		typ_po?: number|null;
		/**DBCOLUMN:epospri.dat_ozn*/
		dat_ozn?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_vra*/
		dat_vra?: JsonDate|null;
		/**DBCOLUMN:epospri.dat_uko*/
		dat_uko?: JsonDate|null;
		/**DBCOLUMN:rozspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:rozspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
	}
	const enum GEpospriDokladyDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac = "ac", nazev = "nazev", s_po = "s_po", soutez_po = "soutez_po", cis_por = "cis_por", s_sou = "s_sou", rezim_pri = "rezim_pri", c = "c", dat_pri = "dat_pri", dat_zpo = "dat_zpo", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp = "ixp", cj_po = "cj_po", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixp_den = "ixp_den", ac_ag = "ac_ag", priz_prip = "priz_prip", priz_view = "priz_view", typ_fin = "typ_fin", pred_urc = "pred_urc", lim_zac = "lim_zac", mena = "mena", c_mena = "c_mena", priz_cast = "priz_cast", dat_sch = "dat_sch", typ_po = "typ_po", dat_ozn = "dat_ozn", dat_vra = "dat_vra", dat_uko = "dat_uko", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt",}
	const enum GEpospriDokladyDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", ac = "*", nazev = "*", s_po = "*", soutez_po = "*", cis_por = "*", s_sou = "*", rezim_pri = "*", c = "*", dat_pri = "*", dat_zpo = "*", dat_zad_p = "*", dat_zad_s = "*", dat_sml_p = "*", dat_sml_s = "*", dat_kos_p = "*", dat_kos_s = "*", dat_real_p = "*", dat_real_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", dat_zmena = "*", zmenu_prov = "*", ixp = "*", cj_po = "*", poznamka = "*", c_plan = "*", c_sch = "*", c_ps = "*", fin_od = "*", fin_do = "*", ixp_den = "*", ac_ag = "*", priz_prip = "*", priz_view = "*", typ_fin = "*", pred_urc = "*", lim_zac = "*", mena = "*", c_mena = "*", priz_cast = "*", dat_sch = "*", typ_po = "*", dat_ozn = "*", dat_vra = "*", dat_uko = "*", esu_txt = "*", ktg_typ_txt = "*",}
	const enum GEpospriDokladyDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac = "string", nazev = "string", s_po = "number", soutez_po = "string", cis_por = "number", s_sou = "number", rezim_pri = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zpo = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", dat_real_p = "JsonDate", dat_real_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz = "number", cis_ner = "number", pri_pri = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp = "string", cj_po = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixp_den = "string", ac_ag = "string", priz_prip = "number", priz_view = "number", typ_fin = "number", pred_urc = "number", lim_zac = "number", mena = "number", c_mena = "JsonDecimal", priz_cast = "number", dat_sch = "JsonDate", typ_po = "number", dat_ozn = "JsonDate", dat_vra = "JsonDate", dat_uko = "JsonDate", esu_txt = "string", ktg_typ_txt = "string",}
	const enum GEpospriDokladyDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac = 20, nazev = 100, soutez_po = 30, zmenu_prov = 12, ixp = 12, cj_po = 30, poznamka = 254, ixp_den = 12, ac_ag = 20, esu_txt = 254, ktg_typ_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GEvzspriDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:evzspri*/
	interface GEvzspriDokladyDto {
		/**DBCOLUMN:evzspri.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:evzspri.lic*/
		lic?: string|null;
		/**DBCOLUMN:evzspri.ico*/
		ico?: string|null;
		/**DBCOLUMN:evzspri.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:evzspri.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:evzspri.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:evzspri.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:evzspri.ac_ver_zak*/
		ac_ver_zak?: string|null;
		/**DBCOLUMN:evzspri.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:evzspri.s_vz*/
		s_vz?: number|null;
		/**DBCOLUMN:evzspri.soutez*/
		soutez?: string|null;
		/**DBCOLUMN:evzspri.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:evzspri.s_sou*/
		s_sou?: number|null;
		/**DBCOLUMN:evzspri.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:evzspri.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_zvz*/
		dat_zvz?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_sml_p*/
		dat_sml_p?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_sml_s*/
		dat_sml_s?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_kos_p*/
		dat_kos_p?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_kos_s*/
		dat_kos_s?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_real_p*/
		dat_real_p?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_real_s*/
		dat_real_s?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:evzspri.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:evzspri.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:evzspri.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:evzspri.regi_list*/
		regi_list?: number|null;
		/**DBCOLUMN:evzspri.stan_jak*/
		stan_jak?: number|null;
		/**DBCOLUMN:evzspri.stan_svr*/
		stan_svr?: number|null;
		/**DBCOLUMN:evzspri.schv_spec*/
		schv_spec?: number|null;
		/**DBCOLUMN:evzspri.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:evzspri.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:evzspri.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:evzspri.cj_vz*/
		cj_vz?: string|null;
		/**DBCOLUMN:evzspri.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:evzspri.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:evzspri.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:evzspri.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:evzspri.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:evzspri.priz_prip*/
		priz_prip?: number|null;
		/**DBCOLUMN:evzspri.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:evzspri.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:evzspri.cis_zakon*/
		cis_zakon?: number|null;
		/**DBCOLUMN:evzspri.pred_urc*/
		pred_urc?: number|null;
		/**DBCOLUMN:evzspri.lim_zac*/
		lim_zac?: number|null;
		/**DBCOLUMN:evzspri.mena*/
		mena?: number|null;
		/**DBCOLUMN:evzspri.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.priz_cast*/
		priz_cast?: number|null;
		/**DBCOLUMN:evzspri.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:evzspri.dat_pred_ozn*/
		dat_pred_ozn?: JsonDate|null;
		/**DBCOLUMN:evzspri.priz_pred_ozn*/
		priz_pred_ozn?: number|null;
		/**DBCOLUMN:evzspri.priz_zad*/
		priz_zad?: number|null;
		/**DBCOLUMN:evzspri.zast_zad*/
		zast_zad?: string|null;
		/**DBCOLUMN:evzspri.poc_vyz*/
		poc_vyz?: number|null;
		/**DBCOLUMN:evzspri.vys_riz*/
		vys_riz?: number|null;
		/**DBCOLUMN:evzspri.dru_riz*/
		dru_riz?: number|null;
		/**DBCOLUMN:evzspri.ixs_aza*/
		ixs_aza?: string|null;
		/**DBCOLUMN:evzspri.por_cis_aza*/
		por_cis_aza?: number|null;
		/**DBCOLUMN:evzspri.priz_bloupd*/
		priz_bloupd?: number|null;
		/**DBCOLUMN:evzspri.priz_rel_rlz*/
		priz_rel_rlz?: number|null;
		/**DBCOLUMN:evzspri.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:evzspri.dan_proc*/
		dan_proc?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.c_plan_bez*/
		c_plan_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.c_sch_bez*/
		c_sch_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.c_uhr_bez*/
		c_uhr_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.c_nav_bez*/
		c_nav_bez?: JsonDecimal|null;
		/**DBCOLUMN:evzspri.ixs_pri_nad*/
		ixs_pri_nad?: string|null;
		/**DBCOLUMN:evzspri.priz_bfin*/
		priz_bfin?: number|null;
		/**DBCOLUMN:evzspri.priz_revo*/
		priz_revo?: number|null;
		/**DBCOLUMN:evzspri.priz_kort*/
		priz_kort?: number|null;
		/**DBCOLUMN:evzspri.priz_zve_vevz*/
		priz_zve_vevz?: number|null;
		/**DBCOLUMN:evzspri.priz_zve_prof*/
		priz_zve_prof?: number|null;
		/**DBCOLUMN:evzspri.priz_zve_etrz*/
		priz_zve_etrz?: number|null;
		/**DBCOLUMN:evzspri.vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**DBCOLUMN:evzspri.vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**DBCOLUMN:evzspri.vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**DBCOLUMN:evzspri.priz_rs_nad*/
		priz_rs_nad?: number|null;
		/**DBCOLUMN:evzspri.priz_rs_dil*/
		priz_rs_dil?: number|null;
		/**DBCOLUMN:evzspri.priz_relcas_m*/
		priz_relcas_m?: number|null;
		/**DBCOLUMN:evzspri.priz_relcas_c*/
		priz_relcas_c?: number|null;
		/**DBCOLUMN:evzspri.kat_pru*/
		kat_pru?: number|null;
		/**DBCOLUMN:evzspri.priz_zve_inen*/
		priz_zve_inen?: number|null;
		/**DBCOLUMN:evzspri.vz_cislo_inen*/
		vz_cislo_inen?: string|null;
		/**DBCOLUMN:evzspri.vz_cislo_ivz*/
		vz_cislo_ivz?: string|null;
		/**DBCOLUMN:rozspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:rozspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
	}
	const enum GEvzspriDokladyDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac_ver_zak = "ac_ver_zak", nazev = "nazev", s_vz = "s_vz", soutez = "soutez", cis_por = "cis_por", s_sou = "s_sou", rezim_pri = "rezim_pri", c = "c", dat_pri = "dat_pri", dat_zvz = "dat_zvz", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_sml_p = "dat_sml_p", dat_sml_s = "dat_sml_s", dat_kos_p = "dat_kos_p", dat_kos_s = "dat_kos_s", dat_real_p = "dat_real_p", dat_real_s = "dat_real_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", regi_list = "regi_list", stan_jak = "stan_jak", stan_svr = "stan_svr", schv_spec = "schv_spec", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixp = "ixp", cj_vz = "cj_vz", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixp_den = "ixp_den", ac_ag = "ac_ag", priz_prip = "priz_prip", priz_view = "priz_view", typ_fin = "typ_fin", cis_zakon = "cis_zakon", pred_urc = "pred_urc", lim_zac = "lim_zac", mena = "mena", c_mena = "c_mena", priz_cast = "priz_cast", dat_sch = "dat_sch", dat_pred_ozn = "dat_pred_ozn", priz_pred_ozn = "priz_pred_ozn", priz_zad = "priz_zad", zast_zad = "zast_zad", poc_vyz = "poc_vyz", vys_riz = "vys_riz", dru_riz = "dru_riz", ixs_aza = "ixs_aza", por_cis_aza = "por_cis_aza", priz_bloupd = "priz_bloupd", priz_rel_rlz = "priz_rel_rlz", dan_typ = "dan_typ", dan_proc = "dan_proc", c_plan_bez = "c_plan_bez", c_sch_bez = "c_sch_bez", c_uhr = "c_uhr", c_uhr_bez = "c_uhr_bez", c_nav_bez = "c_nav_bez", ixs_pri_nad = "ixs_pri_nad", priz_bfin = "priz_bfin", priz_revo = "priz_revo", priz_kort = "priz_kort", priz_zve_vevz = "priz_zve_vevz", priz_zve_prof = "priz_zve_prof", priz_zve_etrz = "priz_zve_etrz", vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", priz_rs_nad = "priz_rs_nad", priz_rs_dil = "priz_rs_dil", priz_relcas_m = "priz_relcas_m", priz_relcas_c = "priz_relcas_c", kat_pru = "kat_pru", priz_zve_inen = "priz_zve_inen", vz_cislo_inen = "vz_cislo_inen", vz_cislo_ivz = "vz_cislo_ivz", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt",}
	const enum GEvzspriDokladyDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", ac_ver_zak = "*", nazev = "*", s_vz = "*", soutez = "*", cis_por = "*", s_sou = "*", rezim_pri = "*", c = "*", dat_pri = "*", dat_zvz = "*", dat_zad_p = "*", dat_zad_s = "*", dat_sml_p = "*", dat_sml_s = "*", dat_kos_p = "*", dat_kos_s = "*", dat_real_p = "*", dat_real_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", regi_list = "*", stan_jak = "*", stan_svr = "*", schv_spec = "*", dat_zmena = "*", zmenu_prov = "*", ixp = "*", cj_vz = "*", poznamka = "*", c_plan = "*", c_sch = "*", c_ps = "*", fin_od = "*", fin_do = "*", ixp_den = "*", ac_ag = "*", priz_prip = "*", priz_view = "*", typ_fin = "*", cis_zakon = "*", pred_urc = "*", lim_zac = "*", mena = "*", c_mena = "*", priz_cast = "*", dat_sch = "*", dat_pred_ozn = "*", priz_pred_ozn = "*", priz_zad = "*", zast_zad = "*", poc_vyz = "*", vys_riz = "*", dru_riz = "*", ixs_aza = "*", por_cis_aza = "*", priz_bloupd = "*", priz_rel_rlz = "*", dan_typ = "*", dan_proc = "*", c_plan_bez = "*", c_sch_bez = "*", c_uhr = "*", c_uhr_bez = "*", c_nav_bez = "*", ixs_pri_nad = "*", priz_bfin = "*", priz_revo = "*", priz_kort = "*", priz_zve_vevz = "*", priz_zve_prof = "*", priz_zve_etrz = "*", vz_cislo_vevz = "*", vz_cislo_prof = "*", vz_cislo_etrz = "*", priz_rs_nad = "*", priz_rs_dil = "*", priz_relcas_m = "*", priz_relcas_c = "*", kat_pru = "*", priz_zve_inen = "*", vz_cislo_inen = "*", vz_cislo_ivz = "*", esu_txt = "*", ktg_typ_txt = "*",}
	const enum GEvzspriDokladyDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac_ver_zak = "string", nazev = "string", s_vz = "number", soutez = "string", cis_por = "number", s_sou = "number", rezim_pri = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zvz = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_sml_p = "JsonDate", dat_sml_s = "JsonDate", dat_kos_p = "JsonDate", dat_kos_s = "JsonDate", dat_real_p = "JsonDate", dat_real_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz = "number", cis_ner = "number", pri_pri = "number", regi_list = "number", stan_jak = "number", stan_svr = "number", schv_spec = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixp = "string", cj_vz = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixp_den = "string", ac_ag = "string", priz_prip = "number", priz_view = "number", typ_fin = "number", cis_zakon = "number", pred_urc = "number", lim_zac = "number", mena = "number", c_mena = "JsonDecimal", priz_cast = "number", dat_sch = "JsonDate", dat_pred_ozn = "JsonDate", priz_pred_ozn = "number", priz_zad = "number", zast_zad = "string", poc_vyz = "number", vys_riz = "number", dru_riz = "number", ixs_aza = "string", por_cis_aza = "number", priz_bloupd = "number", priz_rel_rlz = "number", dan_typ = "number", dan_proc = "JsonDecimal", c_plan_bez = "JsonDecimal", c_sch_bez = "JsonDecimal", c_uhr = "JsonDecimal", c_uhr_bez = "JsonDecimal", c_nav_bez = "JsonDecimal", ixs_pri_nad = "string", priz_bfin = "number", priz_revo = "number", priz_kort = "number", priz_zve_vevz = "number", priz_zve_prof = "number", priz_zve_etrz = "number", vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", priz_rs_nad = "number", priz_rs_dil = "number", priz_relcas_m = "number", priz_relcas_c = "number", kat_pru = "number", priz_zve_inen = "number", vz_cislo_inen = "string", vz_cislo_ivz = "string", esu_txt = "string", ktg_typ_txt = "string",}
	const enum GEvzspriDokladyDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac_ver_zak = 30, nazev = 100, soutez = 30, zmenu_prov = 12, ixp = 12, cj_vz = 30, poznamka = 254, ixp_den = 12, ac_ag = 20, zast_zad = 150, ixs_aza = 12, ixs_pri_nad = 12, vz_cislo_vevz = 30, vz_cislo_prof = 30, vz_cislo_etrz = 30, vz_cislo_inen = 30, vz_cislo_ivz = 30, esu_txt = 254, ktg_typ_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GFucDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:fucspid*/
	interface GFucDokladyDto {
		/**DBCOLUMN:uctspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:uctspid.lic*/
		lic?: string|null;
		/**DBCOLUMN:uctspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:uctspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:uctspid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:uctspid.nks*/
		nks?: string|null;
		/**DBCOLUMN:uctspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:uctspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:uctspid.rok*/
		rok?: number|null;
		/**DBCOLUMN:uctspid.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:uctspid.den*/
		den?: number|null;
		/**DBCOLUMN:uctspid.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:uctspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:uctspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:uctspid.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:uctspid.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:uctspid.dat_zau*/
		dat_zau?: JsonDate|null;
		/**DBCOLUMN:uctspid.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:uctspid.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:uctspid.ac_ixe*/
		ac_ixe?: string|null;
		/**DBCOLUMN:uctspid.stav_ac_ixe*/
		stav_ac_ixe?: number|null;
		/**DBCOLUMN:uctspid.drd*/
		drd?: number|null;
		/**DBCOLUMN:uctspid.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:uctspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctspid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:uctspid.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:uctspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:uctspid.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:uctspid.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:uctspid.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:uctspid.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:uctspid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:uctspid.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:uctspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:uctspid.uus*/
		uus?: string|null;
		/**DBCOLUMN:uctspid.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:uctspid.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:uctspid.int_dok*/
		int_dok?: number|null;
		/**DBCOLUMN:uctspid.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:rozspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:rozspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
	}
	const enum GFucDokladyDtoNames { ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", rok_dph = "rok_dph", mesic_dph = "mesic_dph", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", ixs_esu = "ixs_esu", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", int_dok = "int_dok", subrada = "subrada", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt",}
	const enum GFucDokladyDtoFragments { ixp = "*", lic = "*", popis = "*", ico = "*", ucs = "*", nks = "*", ixp_den = "*", ac = "*", rok = "*", mesic = "*", den = "*", dat_prij_pod = "*", ixs_typ = "*", ktg_typ = "*", eko_akt = "*", dat_evid = "*", dat_zau = "*", s_zau = "*", s_sto = "*", ac_ixe = "*", stav_ac_ixe = "*", drd = "*", c = "*", dat_zmena = "*", zmenu_prov = "*", typ_ag = "*", ixs_fun_akt = "*", rok_dph = "*", mesic_dph = "*", bu_vl = "*", sk_vl = "*", priz_view = "*", ac_ag = "*", ixs_esu = "*", uus = "*", cis_real = "*", ixs_fun_vyriz = "*", int_dok = "*", subrada = "*", esu_txt = "*", ktg_typ_txt = "*",}
	const enum GFucDokladyDtoTypes { ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", rok_dph = "number", mesic_dph = "number", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", ixs_esu = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", int_dok = "number", subrada = "number", esu_txt = "string", ktg_typ_txt = "string",}
	const enum GFucDokladyDtoTypeLengths { ixp = 12, lic = 4, popis = 254, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, ixs_typ = 12, ac_ixe = 20, zmenu_prov = 12, ixs_fun_akt = 12, bu_vl = 34, sk_vl = 11, ac_ag = 20, ixs_esu = 12, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, esu_txt = 254, ktg_typ_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GISPAkceDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvsinp*/
	interface GISPAkceDto {
		/**DBCOLUMN:srvsinp.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvsinp.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvsinp.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:srvsinp.ixs_csl*/
		ixs_csl?: string|null;
		/**DBCOLUMN:srvsinp.ixs_prr*/
		ixs_prr?: string|null;
		/**DBCOLUMN:srvsinp.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:srvsinp.ixs*/
		ixs?: string|null;
		/**DBCOLUMN:srvsinp.radek*/
		radek?: number|null;
		/**DBCOLUMN:srvsinp.ixs_tip*/
		ixs_tip?: string|null;
		/**DBCOLUMN:srvsinp.s_inp*/
		s_inp?: number|null;
		/**DBCOLUMN:srvsinp.dat_inp*/
		dat_inp?: JsonDate|null;
		/**DBCOLUMN:srvsinp.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:srvsinp.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:srvsinp.akt_znacka_spis*/
		akt_znacka_spis?: string|null;
		/**DBCOLUMN:srvsinp.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:srvsinp.aktivita_new*/
		aktivita_new?: number|null;
		/**DBCOLUMN:srvsinp.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:srvsinp.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:srvsinp.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:ginszmp.nazev_rf*/
		nazev_rf?: string|null;
		/**DBCOLUMN:ginszmp.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:ginszmp.nazev_fun*/
		nazev_fun?: string|null;
		/**DBCOLUMN:srvstip.nazev*/
		srvstip_nazev?: string|null;
		/**DBCOLUMN:evzcspe.schv_spec_txt*/
		schv_spec_txt?: string|null;
		/**DBCOLUMN:srvstip.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:srvvtip.priz_pov*/
		priz_pov?: number|null;
		/**DBCOLUMN:srvvtip.priz_pov_ixb*/
		priz_pov_ixb?: number|null;
		/**DBCOLUMN:wflsixb.popis*/
		popis_ixb?: string|null;
		/**DBCOLUMN:wflsixb.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:wflsixb.velikost*/
		velikost?: number|null;
		/**DBCOLUMN:gincakt.aktivita_txt*/
		aktivita_txt?: string|null;
		/**DBCOLUMN:gincakt.dat_inp_txt*/
		dat_inp_txt?: string|null;
		/**DBCOLUMN:gincakt.popis_ixb_label*/
		popis_ixb_label?: string|null;
		/**DBCOLUMN:gincakt.stav1*/
		stav1?: string|null;
		/**DBCOLUMN:gincakt.stav1_color*/
		stav1_color?: string|null;
		/**DBCOLUMN:gincakt.dat_inp_zobr*/
		dat_inp_zobr?: string|null;
		/**DBCOLUMN:srvvtip.priz_pov_zapl*/
		priz_pov_zapl?: number|null;
		/**DBCOLUMN:srvvtip.priz_pov_kompl*/
		priz_pov_kompl?: number|null;
		/**DBCOLUMN:srvvtip.priz_pov_schv*/
		priz_pov_schv?: number|null;
		/**DBCOLUMN:srvvtip.ixs_tip_next*/
		ixs_tip_next?: string|null;
		/**DBCOLUMN:srvvtip.ixs_sro_predklad*/
		ixs_sro_predklad?: string|null;
		/**DBCOLUMN:srvvtip.ixs_sro_schvalov*/
		ixs_sro_schvalov?: string|null;
		/**DBCOLUMN:srvvtip.ixs_fun_pred*/
		ixs_fun_pred?: string|null;
		/**DBCOLUMN:srvvtip.ixs_fun_schv*/
		ixs_fun_schv?: string|null;
		/**DBCOLUMN:srvvtip.nazev_fun_pred*/
		nazev_fun_pred?: string|null;
		/**DBCOLUMN:srvvtip.nazev_fun_schv*/
		nazev_fun_schv?: string|null;
		/**DBCOLUMN:srvsinp.dat_poz_schv*/
		dat_poz_schv?: JsonDate|null;
		/**DBCOLUMN:srvcia.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:srvvtip.nazev_fun_akt*/
		nazev_fun_akt?: string|null;
		/**DBCOLUMN:gincakt.stav_text_new*/
		stav_text_new?: string|null;
		/**DBCOLUMN:srvstip.zdroj_dok*/
		zdroj_dok?: number|null;
		/**DBCOLUMN:zdroj_dok_txt*/
		zdroj_dok_txt?: string|null;
		/**DBCOLUMN:srvstip.typ_spec*/
		typ_spec?: number|null;
		/**DBCOLUMN:typ_spec_txt*/
		typ_spec_txt?: string|null;
		/**DBCOLUMN:typ_spec_zkr*/
		typ_spec_zkr?: string|null;
		/**DBCOLUMN:lze_editovat*/
		lze_editovat?: boolean|null;
		/**DBCOLUMN:lze_editovat_txt*/
		lze_editovat_txt?: string|null;
		/**DBCOLUMN:srvvtip.zpusob_schv*/
		zpusob_schv?: number|null;
		/**DBCOLUMN:srvvtip.priz_blok_vp*/
		priz_blok_vp?: number|null;
		/**DBCOLUMN:srvvtip.priz_blok_rz*/
		priz_blok_rz?: number|null;
		/**DBCOLUMN:srvvtip.priz_blok_sdp*/
		priz_blok_sdp?: number|null;
		/**DBCOLUMN:srvvtip.priz_blok_eds*/
		priz_blok_eds?: number|null;
		/**DBCOLUMN:srvvtip.priz_blok_rv*/
		priz_blok_rv?: number|null;
		/**DBCOLUMN:srvvtip.priz_blok_pri*/
		priz_blok_pri?: number|null;
		/**Permissions*/
		Permissions?: Gordic.Ada.Interface.GAkceISPPermissions|null;
		/**JsemKompetent*/
		JsemKompetent?: number|null;
		/**DBCOLUMN:SeznamDokladu.cis_real*/
		cis_real?: string|null;
		/**Poc_Pril_Pruv_List*/
		poc_pril_pruv_list?: number|null;
	}
	const enum GISPAkceDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_csl = "ixs_csl", ixs_prr = "ixs_prr", ixs_pla = "ixs_pla", ixs = "ixs", radek = "radek", ixs_tip = "ixs_tip", s_inp = "s_inp", dat_inp = "dat_inp", ixp = "ixp", ixp_spis = "ixp_spis", akt_znacka_spis = "akt_znacka_spis", aktivita = "aktivita", aktivita_new = "aktivita_new", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixb = "ixb", nazev_rf = "nazev_rf", nazev_ref = "nazev_ref", nazev_fun = "nazev_fun", srvstip_nazev = "srvstip_nazev", schv_spec_txt = "schv_spec_txt", k_v = "k_v", priz_pov = "priz_pov", priz_pov_ixb = "priz_pov_ixb", popis_ixb = "popis_ixb", soubor = "soubor", velikost = "velikost", aktivita_txt = "aktivita_txt", dat_inp_txt = "dat_inp_txt", popis_ixb_label = "popis_ixb_label", stav1 = "stav1", stav1_color = "stav1_color", dat_inp_zobr = "dat_inp_zobr", priz_pov_zapl = "priz_pov_zapl", priz_pov_kompl = "priz_pov_kompl", priz_pov_schv = "priz_pov_schv", ixs_tip_next = "ixs_tip_next", ixs_sro_predklad = "ixs_sro_predklad", ixs_sro_schvalov = "ixs_sro_schvalov", ixs_fun_pred = "ixs_fun_pred", ixs_fun_schv = "ixs_fun_schv", nazev_fun_pred = "nazev_fun_pred", nazev_fun_schv = "nazev_fun_schv", dat_poz_schv = "dat_poz_schv", ixs_fun_akt = "ixs_fun_akt", nazev_fun_akt = "nazev_fun_akt", stav_text_new = "stav_text_new", zdroj_dok = "zdroj_dok", zdroj_dok_txt = "zdroj_dok_txt", typ_spec = "typ_spec", typ_spec_txt = "typ_spec_txt", typ_spec_zkr = "typ_spec_zkr", lze_editovat = "lze_editovat", lze_editovat_txt = "lze_editovat_txt", zpusob_schv = "zpusob_schv", priz_blok_vp = "priz_blok_vp", priz_blok_rz = "priz_blok_rz", priz_blok_sdp = "priz_blok_sdp", priz_blok_eds = "priz_blok_eds", priz_blok_rv = "priz_blok_rv", priz_blok_pri = "priz_blok_pri", Permissions = "Permissions", JsemKompetent = "JsemKompetent", cis_real = "cis_real", poc_pril_pruv_list = "poc_pril_pruv_list",}
	const enum GISPAkceDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_csl = "*", ixs_prr = "*", ixs_pla = "*", ixs = "*", radek = "*", ixs_tip = "*", s_inp = "*", dat_inp = "*", ixp = "*", ixp_spis = "*", akt_znacka_spis = "*", aktivita = "*", aktivita_new = "*", dat_zmena = "*", zmenu_prov = "*", ixb = "*", nazev_rf = "*", nazev_ref = "*", nazev_fun = "*", srvstip_nazev = "*", schv_spec_txt = "*", k_v = "*", priz_pov = "*", priz_pov_ixb = "*", popis_ixb = "*", soubor = "*", velikost = "*", aktivita_txt = "*", dat_inp_txt = "*", popis_ixb_label = "*", stav1 = "*", stav1_color = "*", dat_inp_zobr = "*", priz_pov_zapl = "*", priz_pov_kompl = "*", priz_pov_schv = "*", ixs_tip_next = "*", ixs_sro_predklad = "*", ixs_sro_schvalov = "*", ixs_fun_pred = "*", ixs_fun_schv = "*", nazev_fun_pred = "*", nazev_fun_schv = "*", dat_poz_schv = "*", ixs_fun_akt = "*", nazev_fun_akt = "*", stav_text_new = "*", zdroj_dok = "*", zdroj_dok_txt = "*", typ_spec = "*", typ_spec_txt = "*", typ_spec_zkr = "*", lze_editovat = "*", lze_editovat_txt = "*", zpusob_schv = "*", priz_blok_vp = "*", priz_blok_rz = "*", priz_blok_sdp = "*", priz_blok_eds = "*", priz_blok_rv = "*", priz_blok_pri = "*", Permissions = "*", JsemKompetent = "*", cis_real = "*", poc_pril_pruv_list = "*",}
	const enum GISPAkceDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_csl = "string", ixs_prr = "string", ixs_pla = "string", ixs = "string", radek = "number", ixs_tip = "string", s_inp = "number", dat_inp = "JsonDate", ixp = "string", ixp_spis = "string", akt_znacka_spis = "string", aktivita = "number", aktivita_new = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixb = "string", nazev_rf = "string", nazev_ref = "string", nazev_fun = "string", srvstip_nazev = "string", schv_spec_txt = "string", k_v = "number", priz_pov = "number", priz_pov_ixb = "number", popis_ixb = "string", soubor = "string", velikost = "number", aktivita_txt = "string", dat_inp_txt = "string", popis_ixb_label = "string", stav1 = "string", stav1_color = "string", dat_inp_zobr = "string", priz_pov_zapl = "number", priz_pov_kompl = "number", priz_pov_schv = "number", ixs_tip_next = "string", ixs_sro_predklad = "string", ixs_sro_schvalov = "string", ixs_fun_pred = "string", ixs_fun_schv = "string", nazev_fun_pred = "string", nazev_fun_schv = "string", dat_poz_schv = "JsonDate", ixs_fun_akt = "string", nazev_fun_akt = "string", stav_text_new = "string", zdroj_dok = "number", zdroj_dok_txt = "string", typ_spec = "number", typ_spec_txt = "string", typ_spec_zkr = "string", lze_editovat = "boolean", lze_editovat_txt = "string", zpusob_schv = "number", priz_blok_vp = "number", priz_blok_rz = "number", priz_blok_sdp = "number", priz_blok_eds = "number", priz_blok_rv = "number", priz_blok_pri = "number", Permissions = "Gordic.Ada.Interface.GAkceISPPermissions", JsemKompetent = "number", cis_real = "string", poc_pril_pruv_list = "number",}
	const enum GISPAkceDtoTypeLengths { ico = 10, cislo = 16, ixs_csl = 12, ixs_prr = 12, ixs_pla = 12, ixs_tip = 12, ixp = 12, ixp_spis = 12, akt_znacka_spis = 50, zmenu_prov = 12, ixb = 12, nazev_rf = 254, nazev_ref = 254, nazev_fun = 254, srvstip_nazev = 254, schv_spec_txt = 254, popis_ixb = 254, soubor = 254, aktivita_txt = 254, dat_inp_txt = 254, popis_ixb_label = 254, stav1 = 254, stav1_color = 254, dat_inp_zobr = 254, ixs_tip_next = 12, ixs_sro_predklad = 12, ixs_sro_schvalov = 12, ixs_fun_pred = 12, ixs_fun_schv = 12, nazev_fun_pred = 254, nazev_fun_schv = 254, ixs_fun_akt = 12, nazev_fun_akt = 254, stav_text_new = 254, zdroj_dok_txt = 254, typ_spec_txt = 254, typ_spec_zkr = 1, lze_editovat_txt = 254, cis_real = 6,}
	/**GAkcePermissions*/
	interface GAkceISPPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**CanEdit*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**JsemVlastnik*/
		JsemVlastnik: Gordic.General.ApplicationInterface.GPermission;
		/**JsemKompetent*/
		JsemKompetent: Gordic.General.ApplicationInterface.GPermission;
		/**JsemRealizator*/
		JsemRealizator: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GAkceISPPermissionsNames { LzeEditovat = "LzeEditovat", JsemVlastnik = "JsemVlastnik", JsemKompetent = "JsemKompetent", JsemRealizator = "JsemRealizator",}
	const enum GAkceISPPermissionsFragments { LzeEditovat = "*", JsemVlastnik = "*", JsemKompetent = "*", JsemRealizator = "*",}
	const enum GAkceISPPermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", JsemVlastnik = "Gordic.General.ApplicationInterface.GPermission", JsemKompetent = "Gordic.General.ApplicationInterface.GPermission", JsemRealizator = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GAkceISPPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GKdfspidDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:kdfspid*/
	interface GKdfspidDto {
		/**DBCOLUMN:kdfspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:kdfspid.lic*/
		lic?: string|null;
		/**DBCOLUMN:kdfspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:kdfspid.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:kdfspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:kdfspid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:kdfspid.nks*/
		nks?: string|null;
		/**DBCOLUMN:kdfspid.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:kdfspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:kdfspid.vs*/
		vs?: string|null;
		/**DBCOLUMN:kdfspid.ks*/
		ks?: string|null;
		/**DBCOLUMN:kdfspid.ss*/
		ss?: string|null;
		/**DBCOLUMN:kdfspid.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:kdfspid.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:kdfspid.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:kdfspid.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:kdfspid.zp*/
		zp?: number|null;
		/**DBCOLUMN:kdfspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:kdfspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:kdfspid.ps_sml_stav*/
		ps_sml_stav?: number|null;
		/**DBCOLUMN:kdfspid.ps_sml*/
		ps_sml?: string|null;
		/**DBCOLUMN:kdfspid.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:kdfspid.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:kdfspid.dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**DBCOLUMN:kdfspid.dat_zau*/
		dat_zau?: JsonDate|null;
		/**DBCOLUMN:kdfspid.dat_uhr*/
		dat_uhr?: JsonDate|null;
		/**DBCOLUMN:kdfspid.dat_kry*/
		dat_kry?: JsonDate|null;
		/**DBCOLUMN:kdfspid.dat_lik*/
		dat_lik?: JsonDate|null;
		/**DBCOLUMN:kdfspid.mena*/
		mena?: number|null;
		/**DBCOLUMN:kdfspid.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_zust*/
		c_zust?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_kzauc*/
		c_kzauc?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z0*/
		c_z0?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d0*/
		c_d0?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z1*/
		c_z1?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d1*/
		c_d1?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z2*/
		c_z2?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d2*/
		c_d2?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_upr*/
		c_upr?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.s_por*/
		s_por?: number|null;
		/**DBCOLUMN:kdfspid.s_uhr*/
		s_uhr?: number|null;
		/**DBCOLUMN:kdfspid.s_kry*/
		s_kry?: number|null;
		/**DBCOLUMN:kdfspid.s_lik*/
		s_lik?: number|null;
		/**DBCOLUMN:kdfspid.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:kdfspid.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:kdfspid.s_tis*/
		s_tis?: number|null;
		/**DBCOLUMN:kdfspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:kdfspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:kdfspid.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:kdfspid.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:kdfspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:kdfspid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:kdfspid.znam*/
		znam?: number|null;
		/**DBCOLUMN:kdfspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:kdfspid.c_vaz*/
		c_vaz?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:kdfspid.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:kdfspid.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:kdfspid.c_dor*/
		c_dor?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:kdfspid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:kdfspid.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:kdfspid.c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.typ_pen*/
		typ_pen?: number|null;
		/**DBCOLUMN:kdfspid.stav_vym*/
		stav_vym?: number|null;
		/**DBCOLUMN:kdfspid.c_za_z*/
		c_za_z?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_za_d*/
		c_za_d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:kdfspid.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:kdfspid.typ_dor*/
		typ_dor?: number|null;
		/**DBCOLUMN:kdfspid.c_vaz_mena*/
		c_vaz_mena?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_vyuc*/
		c_vyuc?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_zx*/
		c_zx?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.priz_por*/
		priz_por?: number|null;
		/**DBCOLUMN:kdfspid.priz_opp*/
		priz_opp?: number|null;
		/**DBCOLUMN:kdfspid.typ_upr*/
		typ_upr?: string|null;
		/**DBCOLUMN:kdfspid.s_cro*/
		s_cro?: number|null;
		/**DBCOLUMN:kdfspid.priz_pdp*/
		priz_pdp?: number|null;
		/**DBCOLUMN:kdfspid.kurz_akt*/
		kurz_akt?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_celk_mena*/
		c_celk_mena?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_zust_mena*/
		c_zust_mena?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_kuhr_mena*/
		c_kuhr_mena?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z1d*/
		c_z1d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d1d*/
		c_d1d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z2d*/
		c_z2d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d2d*/
		c_d2d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_vyuc_mena*/
		c_vyuc_mena?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.dat_dor*/
		dat_dor?: JsonDate|null;
		/**DBCOLUMN:kdfspid.c_z3*/
		c_z3?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d3*/
		c_d3?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z3d*/
		c_z3d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d3d*/
		c_d3d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z4*/
		c_z4?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d4*/
		c_d4?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_z4d*/
		c_z4d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.c_d4d*/
		c_d4d?: JsonDecimal|null;
		/**DBCOLUMN:kdfspid.priz_fuc*/
		priz_fuc?: number|null;
		/**DBCOLUMN:kdfspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:kdfspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:kdfspid.mena_txt*/
		mena_txt?: string|null;
		/**DBCOLUMN:kdfspid.s_uhr_txt*/
		s_uhr_txt?: string|null;
		/**DBCOLUMN:typ_bpl*/
		typ_bpl?: string|null;
		/**DBCOLUMN:vec*/
		vec?: string|null;
	}
	const enum GKdfspidDtoNames { ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", zp = "zp", ixp_den = "ixp_den", ac = "ac", ps_sml_stav = "ps_sml_stav", ps_sml = "ps_sml", dat_vyst = "dat_vyst", dat_spl = "dat_spl", dat_zdan = "dat_zdan", dat_zau = "dat_zau", dat_uhr = "dat_uhr", dat_kry = "dat_kry", dat_lik = "dat_lik", mena = "mena", c_mena = "c_mena", c_celk = "c_celk", c_kuhr = "c_kuhr", c_zust = "c_zust", c_kzauc = "c_kzauc", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_upr = "c_upr", s_por = "s_por", s_uhr = "s_uhr", s_kry = "s_kry", s_lik = "s_lik", s_zau = "s_zau", s_sto = "s_sto", s_tis = "s_tis", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", znam = "znam", ixs_fun_akt = "ixs_fun_akt", c_vaz = "c_vaz", rok_dph = "rok_dph", mesic_dph = "mesic_dph", priz_dph = "priz_dph", c_dor = "c_dor", kurz = "kurz", dat_uup = "dat_uup", priz_view = "priz_view", ac_ag = "ac_ag", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", stav_vym = "stav_vym", c_za_z = "c_za_z", c_za_d = "c_za_d", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", typ_dor = "typ_dor", c_vaz_mena = "c_vaz_mena", c_vyuc = "c_vyuc", c_zx = "c_zx", priz_por = "priz_por", priz_opp = "priz_opp", typ_upr = "typ_upr", s_cro = "s_cro", priz_pdp = "priz_pdp", kurz_akt = "kurz_akt", c_celk_mena = "c_celk_mena", c_zust_mena = "c_zust_mena", c_kuhr_mena = "c_kuhr_mena", c_z1d = "c_z1d", c_d1d = "c_d1d", c_z2d = "c_z2d", c_d2d = "c_d2d", c_vyuc_mena = "c_vyuc_mena", dat_dor = "dat_dor", c_z3 = "c_z3", c_d3 = "c_d3", c_z3d = "c_z3d", c_d3d = "c_d3d", c_z4 = "c_z4", c_d4 = "c_d4", c_z4d = "c_z4d", c_d4d = "c_d4d", priz_fuc = "priz_fuc", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt", mena_txt = "mena_txt", s_uhr_txt = "s_uhr_txt", typ_bpl = "typ_bpl", vec = "vec",}
	const enum GKdfspidDtoFragments { ixp = "*", lic = "*", ixs_esu = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", zp = "*", ixp_den = "*", ac = "*", ps_sml_stav = "*", ps_sml = "*", dat_vyst = "*", dat_spl = "*", dat_zdan = "*", dat_zau = "*", dat_uhr = "*", dat_kry = "*", dat_lik = "*", mena = "*", c_mena = "*", c_celk = "*", c_kuhr = "*", c_zust = "*", c_kzauc = "*", c_z0 = "*", c_d0 = "*", c_z1 = "*", c_d1 = "*", c_z2 = "*", c_d2 = "*", c_upr = "*", s_por = "*", s_uhr = "*", s_kry = "*", s_lik = "*", s_zau = "*", s_sto = "*", s_tis = "*", ktg_typ = "*", ixs_typ = "*", eko_akt = "*", dat_evid = "*", dat_zmena = "*", zmenu_prov = "*", znam = "*", ixs_fun_akt = "*", c_vaz = "*", rok_dph = "*", mesic_dph = "*", priz_dph = "*", c_dor = "*", kurz = "*", dat_uup = "*", priz_view = "*", ac_ag = "*", c_sazba_pen = "*", proc_sazba_pen = "*", typ_pen = "*", stav_vym = "*", c_za_z = "*", c_za_d = "*", cis_real = "*", ixs_fun_vyriz = "*", typ_dor = "*", c_vaz_mena = "*", c_vyuc = "*", c_zx = "*", priz_por = "*", priz_opp = "*", typ_upr = "*", s_cro = "*", priz_pdp = "*", kurz_akt = "*", c_celk_mena = "*", c_zust_mena = "*", c_kuhr_mena = "*", c_z1d = "*", c_d1d = "*", c_z2d = "*", c_d2d = "*", c_vyuc_mena = "*", dat_dor = "*", c_z3 = "*", c_d3 = "*", c_z3d = "*", c_d3d = "*", c_z4 = "*", c_d4 = "*", c_z4d = "*", c_d4d = "*", priz_fuc = "*", esu_txt = "*", ktg_typ_txt = "*", mena_txt = "*", s_uhr_txt = "*", typ_bpl = "*", vec = "*",}
	const enum GKdfspidDtoTypes { ixp = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", zp = "number", ixp_den = "string", ac = "string", ps_sml_stav = "number", ps_sml = "string", dat_vyst = "JsonDate", dat_spl = "JsonDate", dat_zdan = "JsonDate", dat_zau = "JsonDate", dat_uhr = "JsonDate", dat_kry = "JsonDate", dat_lik = "JsonDate", mena = "number", c_mena = "JsonDecimal", c_celk = "JsonDecimal", c_kuhr = "JsonDecimal", c_zust = "JsonDecimal", c_kzauc = "JsonDecimal", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_upr = "JsonDecimal", s_por = "number", s_uhr = "number", s_kry = "number", s_lik = "number", s_zau = "number", s_sto = "number", s_tis = "number", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", znam = "number", ixs_fun_akt = "string", c_vaz = "JsonDecimal", rok_dph = "number", mesic_dph = "number", priz_dph = "number", c_dor = "JsonDecimal", kurz = "JsonDecimal", dat_uup = "JsonDate", priz_view = "number", ac_ag = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", stav_vym = "number", c_za_z = "JsonDecimal", c_za_d = "JsonDecimal", cis_real = "string", ixs_fun_vyriz = "string", typ_dor = "number", c_vaz_mena = "JsonDecimal", c_vyuc = "JsonDecimal", c_zx = "JsonDecimal", priz_por = "number", priz_opp = "number", typ_upr = "string", s_cro = "number", priz_pdp = "number", kurz_akt = "JsonDecimal", c_celk_mena = "JsonDecimal", c_zust_mena = "JsonDecimal", c_kuhr_mena = "JsonDecimal", c_z1d = "JsonDecimal", c_d1d = "JsonDecimal", c_z2d = "JsonDecimal", c_d2d = "JsonDecimal", c_vyuc_mena = "JsonDecimal", dat_dor = "JsonDate", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z3d = "JsonDecimal", c_d3d = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", c_z4d = "JsonDecimal", c_d4d = "JsonDecimal", priz_fuc = "number", esu_txt = "string", ktg_typ_txt = "string", mena_txt = "string", s_uhr_txt = "string", typ_bpl = "string", vec = "string",}
	const enum GKdfspidDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, ico_esu = 10, ico = 10, ucs = 10, nks = 12, ac_esu = 60, popis = 254, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ixp_den = 12, ac = 20, ps_sml = 12, ixs_typ = 12, zmenu_prov = 12, ixs_fun_akt = 12, ac_ag = 20, cis_real = 6, ixs_fun_vyriz = 12, typ_upr = 15, esu_txt = 254, ktg_typ_txt = 254, mena_txt = 254, s_uhr_txt = 254, typ_bpl = 3, vec = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GKompetentiAkceDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Kompetenti akce DTO*/
	interface GKompetentiAkceDto {
		/**DBCOLUMN:SeznamKompetentu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamKompetentu.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamKompetentu.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamKompetentu.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:SeznamKompetentu.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:SeznamKompetentu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamKompetentu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamKompetentu.kompetent_txt*/
		kompetent_txt?: string|null;
		/**DBCOLUMN:SeznamKompetentu.cis_real*/
		cis_real?: string|null;
	}
	const enum GKompetentiAkceDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_fun = "ixs_fun", ixs_pla = "ixs_pla", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kompetent_txt = "kompetent_txt", cis_real = "cis_real",}
	const enum GKompetentiAkceDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_fun = "*", ixs_pla = "*", dat_zmena = "*", zmenu_prov = "*", kompetent_txt = "*", cis_real = "*",}
	const enum GKompetentiAkceDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_fun = "string", ixs_pla = "string", dat_zmena = "JsonDate", zmenu_prov = "string", kompetent_txt = "string", cis_real = "string",}
	const enum GKompetentiAkceDtoTypeLengths { ico = 10, cislo = 16, ixs_fun = 12, ixs_pla = 12, zmenu_prov = 12, cis_real = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GPoctyDokladuAkceDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**pocty dokladu akce DTO*/
	interface GPoctyDokladuAkceDto {
		/**DBCOLUMN:nazev_roz*/
		nazev_roz?: string|null;
		/**DBCOLUMN:pocet_roz*/
		pocet_roz?: number|null;
		/**DBCOLUMN:nazev_sml*/
		nazev_sml?: string|null;
		/**DBCOLUMN:pocet_sml*/
		pocet_sml?: number|null;
		/**DBCOLUMN:nazev_obj*/
		nazev_obj?: string|null;
		/**DBCOLUMN:pocet_obj*/
		pocet_obj?: number|null;
		/**DBCOLUMN:nazev_kdf*/
		nazev_kdf?: string|null;
		/**DBCOLUMN:pocet_kdf*/
		pocet_kdf?: number|null;
		/**DBCOLUMN:nazev_kof*/
		nazev_kof?: string|null;
		/**DBCOLUMN:pocet_kof*/
		pocet_kof?: number|null;
		/**DBCOLUMN:nazev_pou*/
		nazev_pou?: string|null;
		/**DBCOLUMN:pocet_pou*/
		pocet_pou?: number|null;
		/**DBCOLUMN:nazev_pre*/
		nazev_pre?: string|null;
		/**DBCOLUMN:pocet_pre*/
		pocet_pre?: number|null;
		/**DBCOLUMN:nazev_evz*/
		nazev_evz?: string|null;
		/**DBCOLUMN:pocet_evz*/
		pocet_evz?: number|null;
		/**DBCOLUMN:nazev_rza*/
		nazev_rza?: string|null;
		/**DBCOLUMN:pocet_rza*/
		pocet_rza?: number|null;
		/**DBCOLUMN:nazev_epo*/
		nazev_epo?: string|null;
		/**DBCOLUMN:pocet_epo*/
		pocet_epo?: number|null;
		/**DBCOLUMN:nazev_vfp*/
		nazev_vfp?: string|null;
		/**DBCOLUMN:pocet_vfp*/
		pocet_vfp?: number|null;
		/**DBCOLUMN:nazev_uct*/
		nazev_uct?: string|null;
		/**DBCOLUMN:pocet_uct*/
		pocet_uct?: number|null;
		/**DBCOLUMN:zkratka_roz*/
		zkratka_roz?: string|null;
		/**DBCOLUMN:zkratka_sml*/
		zkratka_sml?: string|null;
		/**DBCOLUMN:zkratka_obj*/
		zkratka_obj?: string|null;
		/**DBCOLUMN:zkratka_kdf*/
		zkratka_kdf?: string|null;
		/**DBCOLUMN:zkratka_kof*/
		zkratka_kof?: string|null;
		/**DBCOLUMN:zkratka_pou*/
		zkratka_pou?: string|null;
		/**DBCOLUMN:zkratka_pre*/
		zkratka_pre?: string|null;
		/**DBCOLUMN:zkratka_evz*/
		zkratka_evz?: string|null;
		/**DBCOLUMN:zkratka_rza*/
		zkratka_rza?: string|null;
		/**DBCOLUMN:zkratka_epo*/
		zkratka_epo?: string|null;
		/**DBCOLUMN:zkratka_vfp*/
		zkratka_vfp?: string|null;
		/**DBCOLUMN:zkratka_uct*/
		zkratka_uct?: string|null;
	}
	const enum GPoctyDokladuAkceDtoNames { nazev_roz = "nazev_roz", pocet_roz = "pocet_roz", nazev_sml = "nazev_sml", pocet_sml = "pocet_sml", nazev_obj = "nazev_obj", pocet_obj = "pocet_obj", nazev_kdf = "nazev_kdf", pocet_kdf = "pocet_kdf", nazev_kof = "nazev_kof", pocet_kof = "pocet_kof", nazev_pou = "nazev_pou", pocet_pou = "pocet_pou", nazev_pre = "nazev_pre", pocet_pre = "pocet_pre", nazev_evz = "nazev_evz", pocet_evz = "pocet_evz", nazev_rza = "nazev_rza", pocet_rza = "pocet_rza", nazev_epo = "nazev_epo", pocet_epo = "pocet_epo", nazev_vfp = "nazev_vfp", pocet_vfp = "pocet_vfp", nazev_uct = "nazev_uct", pocet_uct = "pocet_uct", zkratka_roz = "zkratka_roz", zkratka_sml = "zkratka_sml", zkratka_obj = "zkratka_obj", zkratka_kdf = "zkratka_kdf", zkratka_kof = "zkratka_kof", zkratka_pou = "zkratka_pou", zkratka_pre = "zkratka_pre", zkratka_evz = "zkratka_evz", zkratka_rza = "zkratka_rza", zkratka_epo = "zkratka_epo", zkratka_vfp = "zkratka_vfp", zkratka_uct = "zkratka_uct",}
	const enum GPoctyDokladuAkceDtoFragments { nazev_roz = "*", pocet_roz = "*", nazev_sml = "*", pocet_sml = "*", nazev_obj = "*", pocet_obj = "*", nazev_kdf = "*", pocet_kdf = "*", nazev_kof = "*", pocet_kof = "*", nazev_pou = "*", pocet_pou = "*", nazev_pre = "*", pocet_pre = "*", nazev_evz = "*", pocet_evz = "*", nazev_rza = "*", pocet_rza = "*", nazev_epo = "*", pocet_epo = "*", nazev_vfp = "*", pocet_vfp = "*", nazev_uct = "*", pocet_uct = "*", zkratka_roz = "*", zkratka_sml = "*", zkratka_obj = "*", zkratka_kdf = "*", zkratka_kof = "*", zkratka_pou = "*", zkratka_pre = "*", zkratka_evz = "*", zkratka_rza = "*", zkratka_epo = "*", zkratka_vfp = "*", zkratka_uct = "*",}
	const enum GPoctyDokladuAkceDtoTypes { nazev_roz = "string", pocet_roz = "number", nazev_sml = "string", pocet_sml = "number", nazev_obj = "string", pocet_obj = "number", nazev_kdf = "string", pocet_kdf = "number", nazev_kof = "string", pocet_kof = "number", nazev_pou = "string", pocet_pou = "number", nazev_pre = "string", pocet_pre = "number", nazev_evz = "string", pocet_evz = "number", nazev_rza = "string", pocet_rza = "number", nazev_epo = "string", pocet_epo = "number", nazev_vfp = "string", pocet_vfp = "number", nazev_uct = "string", pocet_uct = "number", zkratka_roz = "string", zkratka_sml = "string", zkratka_obj = "string", zkratka_kdf = "string", zkratka_kof = "string", zkratka_pou = "string", zkratka_pre = "string", zkratka_evz = "string", zkratka_rza = "string", zkratka_epo = "string", zkratka_vfp = "string", zkratka_uct = "string",}
	const enum GPoctyDokladuAkceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GPolozkaEDSDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro srvdeds*/
	interface GPolozkaEDSDto {
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**cislo*/
		cislo?: string|null;
		/**ixs_cia*/
		ixs_cia?: string|null;
		/**id_eds*/
		id_eds?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_eds*/
		nazev_eds?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
	}
	const enum GPolozkaEDSDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", id_eds = "id_eds", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_eds = "nazev_eds", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GPolozkaEDSDtoFragments { rok = "main", ico = "main", cislo = "main", ixs_cia = "main", id_eds = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", nazev_eds = "main", zmenu_prov_txt = "main",}
	const enum GPolozkaEDSDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", id_eds = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_eds = "string", zmenu_prov_txt = "string",}
	const enum GPolozkaEDSDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GPolozkaRZDDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro srvvpsp*/
	interface GPolozkaRZDDto {
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**cislo*/
		cislo?: string|null;
		/**ixs_cia*/
		ixs_cia?: string|null;
		/**id_tzd*/
		id_tzd?: string|null;
		/**rok_zdr*/
		rok_zdr?: number|null;
		/**rok_zdr*/
		castka_zdr?: JsonDecimal|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_tzd*/
		nazev_tzd?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**id_vyb*/
		id_vyb?: string|null;
		/**nazev_vyb*/
		nazev_vyb?: string|null;
		/**id_vyb*/
		id_eds?: string|null;
		/**nazev_vyb*/
		nazev_eds?: string|null;
		/**stav_rozpis*/
		stav_rozpis?: number|null;
		/**stav_rozpis_txt*/
		stav_rozpis_txt?: string|null;
	}
	const enum GPolozkaRZDDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", id_tzd = "id_tzd", rok_zdr = "rok_zdr", castka_zdr = "castka_zdr", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_tzd = "nazev_tzd", zmenu_prov_txt = "zmenu_prov_txt", id_vyb = "id_vyb", nazev_vyb = "nazev_vyb", id_eds = "id_eds", nazev_eds = "nazev_eds", stav_rozpis = "stav_rozpis", stav_rozpis_txt = "stav_rozpis_txt",}
	const enum GPolozkaRZDDtoFragments { rok = "main", ico = "main", cislo = "main", ixs_cia = "main", id_tzd = "main", rok_zdr = "main", castka_zdr = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", nazev_tzd = "main", zmenu_prov_txt = "main", id_vyb = "main", nazev_vyb = "main", id_eds = "main", nazev_eds = "main", stav_rozpis = "main", stav_rozpis_txt = "main",}
	const enum GPolozkaRZDDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", id_tzd = "string", rok_zdr = "number", castka_zdr = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_tzd = "string", zmenu_prov_txt = "string", id_vyb = "string", nazev_vyb = "string", id_eds = "string", nazev_eds = "string", stav_rozpis = "number", stav_rozpis_txt = "string",}
	const enum GPolozkaRZDDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GPolozkaSdPDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro srvvpsp*/
	interface GPolozkaSdPDto {
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**cislo*/
		cislo?: string|null;
		/**ixs_cia*/
		ixs_cia?: string|null;
		/**id_psp*/
		id_psp?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev_eds*/
		nazev_psp?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
	}
	const enum GPolozkaSdPDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", id_psp = "id_psp", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_psp = "nazev_psp", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GPolozkaSdPDtoFragments { rok = "main", ico = "main", cislo = "main", ixs_cia = "main", id_psp = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", nazev_psp = "main", zmenu_prov_txt = "main",}
	const enum GPolozkaSdPDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", id_psp = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_psp = "string", zmenu_prov_txt = "string",}
	const enum GPolozkaSdPDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GRozpisAkceDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Rozpis akce DTO*/
	interface GRozpisAkceDto {
		/**DBCOLUMN:RozpisAkce.ico*/
		ico?: string|null;
		/**DBCOLUMN:RozpisAkce.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:RozpisAkce.nks*/
		nks?: string|null;
		/**DBCOLUMN:RozpisAkce.rok*/
		rok?: number|null;
		/**DBCOLUMN:RozpisAkce.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:RozpisAkce.drd*/
		drd?: number|null;
		/**DBCOLUMN:RozpisAkce.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:RozpisAkce.uea*/
		uea?: string|null;
		/**DBCOLUMN:RozpisAkce.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:RozpisAkce.uec*/
		uec?: string|null;
		/**DBCOLUMN:RozpisAkce.ued*/
		ued?: string|null;
		/**DBCOLUMN:RozpisAkce.uee*/
		uee?: string|null;
		/**DBCOLUMN:RozpisAkce.uef*/
		uef?: string|null;
		/**DBCOLUMN:RozpisAkce.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:RozpisAkce.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:RozpisAkce.uei*/
		uei?: string|null;
		/**DBCOLUMN:RozpisAkce.uej*/
		uej?: string|null;
		/**DBCOLUMN:RozpisAkce.te0*/
		te0?: string|null;
		/**DBCOLUMN:RozpisAkce.te1*/
		te1?: string|null;
		/**DBCOLUMN:RozpisAkce.te2*/
		te2?: string|null;
		/**DBCOLUMN:RozpisAkce.te3*/
		te3?: string|null;
		/**DBCOLUMN:RozpisAkce.te4*/
		te4?: string|null;
		/**DBCOLUMN:RozpisAkce.uek*/
		uek?: string|null;
		/**DBCOLUMN:RozpisAkce.uel*/
		uel?: string|null;
		/**DBCOLUMN:RozpisAkce.uem*/
		uem?: string|null;
		/**DBCOLUMN:RozpisAkce.uen*/
		uen?: string|null;
		/**DBCOLUMN:RozpisAkce.te5*/
		te5?: string|null;
		/**DBCOLUMN:RozpisAkce.te6*/
		te6?: string|null;
		/**DBCOLUMN:RozpisAkce.te7*/
		te7?: string|null;
		/**DBCOLUMN:RozpisAkce.te8*/
		te8?: string|null;
		/**DBCOLUMN:RozpisAkce.te9*/
		te9?: string|null;
		/**DBCOLUMN:RozpisAkce.kc0*/
		kc0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.kc1*/
		kc1?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.sm0*/
		sm0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.sm1*/
		sm1?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.km0*/
		km0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.km1*/
		km1?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.mj*/
		mj?: string|null;
		/**DBCOLUMN:RozpisAkce.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:RozpisAkce.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamDokladu.c0c1_kc*/
		c0c1_kc?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_23*/
		c0_23?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_23*/
		c1_23?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_13*/
		c0_13?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_13*/
		c1_13?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_14*/
		c0_14?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_14*/
		c1_14?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_24*/
		c0_24?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_24*/
		c1_24?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_25*/
		c0_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_25*/
		c1_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_26*/
		c0_26?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_26*/
		c1_26?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_30*/
		c0_30?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_30*/
		c1_30?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_31*/
		c0_31?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_31*/
		c1_31?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_0*/
		c0_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_0*/
		c1_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_2*/
		c0_2?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_2*/
		c1_2?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_3*/
		c0_3?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_3*/
		c1_3?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_6*/
		c0_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_6*/
		c1_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_7*/
		c0_7?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_7*/
		c1_7?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_8*/
		c0_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_8*/
		c1_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_10*/
		c0_10?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_10*/
		c1_10?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_11*/
		c0_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_11*/
		c1_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_12*/
		c0_12?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_12*/
		c1_12?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_15*/
		c0_15?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_15*/
		c1_15?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_16*/
		c0_16?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_16*/
		c1_16?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_17*/
		c0_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_17*/
		c1_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_18*/
		c0_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_18*/
		c1_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_22*/
		c0_22?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_22*/
		c1_22?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.ca_0*/
		ca_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.cb_0*/
		cb_0?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.ca_6*/
		ca_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.cb_6*/
		cb_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.ca_18*/
		ca_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.cb_18*/
		cb_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:RozpisAkce.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:RozpisAkce.c0_21*/
		c0_21?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_21*/
		c1_21?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_34*/
		c0_34?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_34*/
		c1_34?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_54*/
		c0_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_54*/
		c1_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_66*/
		c0_66?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_66*/
		c1_66?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_62*/
		c0_62?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_62*/
		c1_62?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_63*/
		c0_63?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_63*/
		c1_63?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_67*/
		c0_67?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_67*/
		c1_67?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0_68*/
		c0_68?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c1_68*/
		c1_68?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_2*/
		c0c1_2?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_3*/
		c0c1_3?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_7*/
		c0c1_7?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_8*/
		c0c1_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_2_3_7_8*/
		c0c1_2_3_7_8?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_23*/
		c0c1_23?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_25*/
		c0c1_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_23_25*/
		c0c1_23_25?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_6*/
		c0c1_6?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_18*/
		c0c1_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_6_18*/
		c0c1_6_18?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_12*/
		c0c1_12?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_10*/
		c0c1_10?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_11*/
		c0c1_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_10_11*/
		c0c1_10_11?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_15*/
		c0c1_15?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_16*/
		c0c1_16?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_17*/
		c0c1_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_15_16_17*/
		c0c1_15_16_17?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_14*/
		c0c1_14?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_342*/
		c0c1_34?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_54*/
		c0c1_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_14_34_54*/
		c0c1_14_34_54?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_66*/
		c0c1_66?: JsonDecimal|null;
		/**DBCOLUMN:RozpisAkce.c0c1_0*/
		c0c1_0?: JsonDecimal|null;
	}
	const enum GRozpisAkceDtoNames { ico = "ico", ucs = "ucs", nks = "nks", rok = "rok", xuete = "xuete", drd = "drd", mesic = "mesic", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", kc0 = "kc0", kc1 = "kc1", sm0 = "sm0", sm1 = "sm1", km0 = "km0", km1 = "km1", mj = "mj", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c0c1_kc = "c0c1_kc", c0_23 = "c0_23", c1_23 = "c1_23", c0_13 = "c0_13", c1_13 = "c1_13", c0_14 = "c0_14", c1_14 = "c1_14", c0_24 = "c0_24", c1_24 = "c1_24", c0_25 = "c0_25", c1_25 = "c1_25", c0_26 = "c0_26", c1_26 = "c1_26", c0_30 = "c0_30", c1_30 = "c1_30", c0_31 = "c0_31", c1_31 = "c1_31", c0_0 = "c0_0", c1_0 = "c1_0", c0_2 = "c0_2", c1_2 = "c1_2", c0_3 = "c0_3", c1_3 = "c1_3", c0_6 = "c0_6", c1_6 = "c1_6", c0_7 = "c0_7", c1_7 = "c1_7", c0_8 = "c0_8", c1_8 = "c1_8", c0_10 = "c0_10", c1_10 = "c1_10", c0_11 = "c0_11", c1_11 = "c1_11", c0_12 = "c0_12", c1_12 = "c1_12", c0_15 = "c0_15", c1_15 = "c1_15", c0_16 = "c0_16", c1_16 = "c1_16", c0_17 = "c0_17", c1_17 = "c1_17", c0_18 = "c0_18", c1_18 = "c1_18", c0_22 = "c0_22", c1_22 = "c1_22", ca_0 = "ca_0", cb_0 = "cb_0", ca_6 = "ca_6", cb_6 = "cb_6", ca_18 = "ca_18", cb_18 = "cb_18", priz_char = "priz_char", druh_char = "druh_char", c0_21 = "c0_21", c1_21 = "c1_21", c0_34 = "c0_34", c1_34 = "c1_34", c0_54 = "c0_54", c1_54 = "c1_54", c0_66 = "c0_66", c1_66 = "c1_66", c0_62 = "c0_62", c1_62 = "c1_62", c0_63 = "c0_63", c1_63 = "c1_63", c0_67 = "c0_67", c1_67 = "c1_67", c0_68 = "c0_68", c1_68 = "c1_68", c0c1_2 = "c0c1_2", c0c1_3 = "c0c1_3", c0c1_7 = "c0c1_7", c0c1_8 = "c0c1_8", c0c1_2_3_7_8 = "c0c1_2_3_7_8", c0c1_23 = "c0c1_23", c0c1_25 = "c0c1_25", c0c1_23_25 = "c0c1_23_25", c0c1_6 = "c0c1_6", c0c1_18 = "c0c1_18", c0c1_6_18 = "c0c1_6_18", c0c1_12 = "c0c1_12", c0c1_10 = "c0c1_10", c0c1_11 = "c0c1_11", c0c1_10_11 = "c0c1_10_11", c0c1_15 = "c0c1_15", c0c1_16 = "c0c1_16", c0c1_17 = "c0c1_17", c0c1_15_16_17 = "c0c1_15_16_17", c0c1_14 = "c0c1_14", c0c1_34 = "c0c1_34", c0c1_54 = "c0c1_54", c0c1_14_34_54 = "c0c1_14_34_54", c0c1_66 = "c0c1_66", c0c1_0 = "c0c1_0",}
	const enum GRozpisAkceDtoFragments { ico = "*", ucs = "*", nks = "*", rok = "*", xuete = "*", drd = "*", mesic = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", kc0 = "*", kc1 = "*", sm0 = "*", sm1 = "*", km0 = "*", km1 = "*", mj = "*", dat_zmena = "*", zmenu_prov = "*", c0c1_kc = "*", c0_23 = "*", c1_23 = "*", c0_13 = "*", c1_13 = "*", c0_14 = "*", c1_14 = "*", c0_24 = "*", c1_24 = "*", c0_25 = "*", c1_25 = "*", c0_26 = "*", c1_26 = "*", c0_30 = "*", c1_30 = "*", c0_31 = "*", c1_31 = "*", c0_0 = "*", c1_0 = "*", c0_2 = "*", c1_2 = "*", c0_3 = "*", c1_3 = "*", c0_6 = "*", c1_6 = "*", c0_7 = "*", c1_7 = "*", c0_8 = "*", c1_8 = "*", c0_10 = "*", c1_10 = "*", c0_11 = "*", c1_11 = "*", c0_12 = "*", c1_12 = "*", c0_15 = "*", c1_15 = "*", c0_16 = "*", c1_16 = "*", c0_17 = "*", c1_17 = "*", c0_18 = "*", c1_18 = "*", c0_22 = "*", c1_22 = "*", ca_0 = "*", cb_0 = "*", ca_6 = "*", cb_6 = "*", ca_18 = "*", cb_18 = "*", priz_char = "*", druh_char = "*", c0_21 = "*", c1_21 = "*", c0_34 = "*", c1_34 = "*", c0_54 = "*", c1_54 = "*", c0_66 = "*", c1_66 = "*", c0_62 = "*", c1_62 = "*", c0_63 = "*", c1_63 = "*", c0_67 = "*", c1_67 = "*", c0_68 = "*", c1_68 = "*", c0c1_2 = "*", c0c1_3 = "*", c0c1_7 = "*", c0c1_8 = "*", c0c1_2_3_7_8 = "*", c0c1_23 = "*", c0c1_25 = "*", c0c1_23_25 = "*", c0c1_6 = "*", c0c1_18 = "*", c0c1_6_18 = "*", c0c1_12 = "*", c0c1_10 = "*", c0c1_11 = "*", c0c1_10_11 = "*", c0c1_15 = "*", c0c1_16 = "*", c0c1_17 = "*", c0c1_15_16_17 = "*", c0c1_14 = "*", c0c1_34 = "*", c0c1_54 = "*", c0c1_14_34_54 = "*", c0c1_66 = "*", c0c1_0 = "*",}
	const enum GRozpisAkceDtoTypes { ico = "string", ucs = "string", nks = "string", rok = "number", xuete = "string", drd = "number", mesic = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", kc0 = "JsonDecimal", kc1 = "JsonDecimal", sm0 = "JsonDecimal", sm1 = "JsonDecimal", km0 = "JsonDecimal", km1 = "JsonDecimal", mj = "string", dat_zmena = "JsonDate", zmenu_prov = "string", c0c1_kc = "JsonDecimal", c0_23 = "JsonDecimal", c1_23 = "JsonDecimal", c0_13 = "JsonDecimal", c1_13 = "JsonDecimal", c0_14 = "JsonDecimal", c1_14 = "JsonDecimal", c0_24 = "JsonDecimal", c1_24 = "JsonDecimal", c0_25 = "JsonDecimal", c1_25 = "JsonDecimal", c0_26 = "JsonDecimal", c1_26 = "JsonDecimal", c0_30 = "JsonDecimal", c1_30 = "JsonDecimal", c0_31 = "JsonDecimal", c1_31 = "JsonDecimal", c0_0 = "JsonDecimal", c1_0 = "JsonDecimal", c0_2 = "JsonDecimal", c1_2 = "JsonDecimal", c0_3 = "JsonDecimal", c1_3 = "JsonDecimal", c0_6 = "JsonDecimal", c1_6 = "JsonDecimal", c0_7 = "JsonDecimal", c1_7 = "JsonDecimal", c0_8 = "JsonDecimal", c1_8 = "JsonDecimal", c0_10 = "JsonDecimal", c1_10 = "JsonDecimal", c0_11 = "JsonDecimal", c1_11 = "JsonDecimal", c0_12 = "JsonDecimal", c1_12 = "JsonDecimal", c0_15 = "JsonDecimal", c1_15 = "JsonDecimal", c0_16 = "JsonDecimal", c1_16 = "JsonDecimal", c0_17 = "JsonDecimal", c1_17 = "JsonDecimal", c0_18 = "JsonDecimal", c1_18 = "JsonDecimal", c0_22 = "JsonDecimal", c1_22 = "JsonDecimal", ca_0 = "JsonDecimal", cb_0 = "JsonDecimal", ca_6 = "JsonDecimal", cb_6 = "JsonDecimal", ca_18 = "JsonDecimal", cb_18 = "JsonDecimal", priz_char = "number", druh_char = "number", c0_21 = "JsonDecimal", c1_21 = "JsonDecimal", c0_34 = "JsonDecimal", c1_34 = "JsonDecimal", c0_54 = "JsonDecimal", c1_54 = "JsonDecimal", c0_66 = "JsonDecimal", c1_66 = "JsonDecimal", c0_62 = "JsonDecimal", c1_62 = "JsonDecimal", c0_63 = "JsonDecimal", c1_63 = "JsonDecimal", c0_67 = "JsonDecimal", c1_67 = "JsonDecimal", c0_68 = "JsonDecimal", c1_68 = "JsonDecimal", c0c1_2 = "JsonDecimal", c0c1_3 = "JsonDecimal", c0c1_7 = "JsonDecimal", c0c1_8 = "JsonDecimal", c0c1_2_3_7_8 = "JsonDecimal", c0c1_23 = "JsonDecimal", c0c1_25 = "JsonDecimal", c0c1_23_25 = "JsonDecimal", c0c1_6 = "JsonDecimal", c0c1_18 = "JsonDecimal", c0c1_6_18 = "JsonDecimal", c0c1_12 = "JsonDecimal", c0c1_10 = "JsonDecimal", c0c1_11 = "JsonDecimal", c0c1_10_11 = "JsonDecimal", c0c1_15 = "JsonDecimal", c0c1_16 = "JsonDecimal", c0c1_17 = "JsonDecimal", c0c1_15_16_17 = "JsonDecimal", c0c1_14 = "JsonDecimal", c0c1_34 = "JsonDecimal", c0c1_54 = "JsonDecimal", c0c1_14_34_54 = "JsonDecimal", c0c1_66 = "JsonDecimal", c0c1_0 = "JsonDecimal",}
	const enum GRozpisAkceDtoTypeLengths { ico = 10, ucs = 10, nks = 12, xuete = 148, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, mj = 5, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GRozspidDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:rozspid*/
	interface GRozspidDokladyDto {
		/**DBCOLUMN:rozspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:rozspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:rozspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:rozspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:rozspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:rozspid.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:rozspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:rozspid.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:rozspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:rozspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:rozspid.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:rozspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:rozspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
	}
	const enum GRozspidDokladyDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", ico = "ico", popis = "popis", ac = "ac", ac_sml = "ac_sml", ixp_den = "ixp_den", c = "c", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt",}
	const enum GRozspidDokladyDtoFragments { ixp = "*", ixs_esu = "*", ico = "*", popis = "*", ac = "*", ac_sml = "*", ixp_den = "*", c = "*", ktg_typ = "*", ixs_typ = "*", eko_akt = "*", esu_txt = "*", ktg_typ_txt = "*",}
	const enum GRozspidDokladyDtoTypes { ixp = "string", ixs_esu = "string", ico = "string", popis = "string", ac = "string", ac_sml = "string", ixp_den = "string", c = "JsonDecimal", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", esu_txt = "string", ktg_typ_txt = "string",}
	const enum GRozspidDokladyDtoTypeLengths { ixp = 12, ixs_esu = 12, ico = 10, popis = 254, ac = 30, ac_sml = 30, ixp_den = 12, ixs_typ = 12, esu_txt = 254, ktg_typ_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSestavyAdaFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Filtr pro seznam dokladu*/
	interface GSestavyAdaFilterDto {
		/**cislo*/
		stavba?: GIntervalDto<string>|null;
		/**cislo*/
		objekt?: GIntervalDto<string>|null;
		/**cislo*/
		mandatar?: GIntervalDto<string>|null;
		/**uea*/
		uea?: GIntervalDto<string>|null;
		/**ueb*/
		ueb?: GIntervalDto<string>|null;
		/**inv_cis*/
		inv_cis?: GIntervalDto<string>|null;
		/**rok*/
		rok?: number|null;
		/**mesic*/
		mesic?: number|null;
		/**nks*/
		nks?: string|null;
		/**priz_nulove*/
		priz_nulove?: number|null;
	}
	const enum GSestavyAdaFilterDtoNames { stavba = "stavba", objekt = "objekt", mandatar = "mandatar", uea = "uea", ueb = "ueb", inv_cis = "inv_cis", rok = "rok", mesic = "mesic", nks = "nks", priz_nulove = "priz_nulove",}
	const enum GSestavyAdaFilterDtoFragments { stavba = "*", objekt = "*", mandatar = "*", uea = "*", ueb = "*", inv_cis = "*", rok = "*", mesic = "*", nks = "*", priz_nulove = "*",}
	const enum GSestavyAdaFilterDtoTypes { stavba = "GIntervalDto<string>", objekt = "GIntervalDto<string>", mandatar = "GIntervalDto<string>", uea = "GIntervalDto<string>", ueb = "GIntervalDto<string>", inv_cis = "GIntervalDto<string>", rok = "number", mesic = "number", nks = "string", priz_nulove = "number",}
	const enum GSestavyAdaFilterDtoTypeLengths {}
	/**Výčet filtračních kritérií pro filtr seznamu Akcí*/
	const enum FilSestavyAda {
		/**rok*/
		rok,
		/**mesic*/
		mesic,
		/**nks*/
		nks,
		/**stavba*/
		stavba,
		/**obkekt*/
		objekt,
		/**mandatar*/
		mandatar,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**inv_cis*/
		inv_cis,
		/**priz_nulove*/
		priz_nulove,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSeznamAdaFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Filtr pro seznam dokladu*/
	interface GSeznamAdaFilterDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**ixs_cia*/
		ixs_cia?: string|null;
		/**ixs_pla*/
		ixs_pla?: string|null;
		/**Cislo akce*/
		cislo?: GIntervalDto<string>|null;
		/**Aktivita*/
		aktivita?: GBaseFilter<number>|null;
		/**Stav realizace*/
		stav_real?: GBaseFilter<number>|null;
		/**Nazev*/
		nazev?: GBaseFilter<string>|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: GBaseFilter<string>|null;
		/**typ akce*/
		typ?: GBaseFilter<number>|null;
		/**cfuDto*/
		cfuDto?: Gordic.Eko.Interface.GCfuFilterDto[]|null;
		/**DBCOLUMN:SeznamDokladu.skp_akce*/
		skp_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akce*/
		psk_akce?: string|null;
		/**DBCOLUMN:SeznamDokladu.skp_akc*/
		skp_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.psk_akc*/
		psk_akc?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_csp*/
		ixs_csp?: string|null;
		/**vlastnosti*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**DBCOLUMN:SeznamDokladu.cis_real*/
		cis_real?: string|null;
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
		/**DBCOLUMN:SeznamDokladu.upresneni*/
		upresneni?: GBaseFilter<string>|null;
		/**Stav INP*/
		stav_inp?: GBaseFilter<number>|null;
		/**Stav AZ old*/
		priz_az?: GBaseFilter<number>|null;
		/**Stav AZ*/
		stav_az?: GBaseFilter<number>|null;
		/**ixs_fun_az*/
		ixs_fun_az?: GBaseFilter<string>|null;
		/**Typ akce sum*/
		typ_akce_sum?: GBaseFilter<number>|null;
		/**id_eds*/
		id_eds?: GIntervalDto<string>|null;
		/**id_psp*/
		id_psp?: GIntervalDto<string>|null;
		/**id_tzd*/
		id_tzd?: GBaseFilter<string>|null;
		/**id_tzd_tzd*/
		id_tzd_tzd?: GBaseFilter<string>|null;
		/**id_tzd_vyb*/
		id_tzd_vyb?: GBaseFilter<string>|null;
		/**id_tzd_eds*/
		id_tzd_eds?: GBaseFilter<string>|null;
		/**isp_nepozadopvano*/
		isp_nepozadopvano?: GBaseFilter<string>|null;
		/**isp_splneno*/
		isp_splneno?: GBaseFilter<string>|null;
		/**isp_nesplneno*/
		isp_nesplneno?: GBaseFilter<string>|null;
		/**isp_nenastaveno*/
		isp_nenastaveno?: GBaseFilter<string>|null;
		/**ixs_prr*/
		ixs_prr?: GBaseFilter<string>|null;
		/**ixs_tri*/
		ixs_tri?: GBaseFilter<string>|null;
		/**komp*/
		komp?: GBaseFilter<string>|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**Typ VZB*/
		typ_vzb?: GBaseFilter<number>|null;
		/**priz_ram_doh*/
		priz_ram_doh?: GBaseFilter<number>|null;
		/**ixp_spis_ip*/
		ixp_spis_ip?: string|null;
		/**ixp_dok_ip*/
		ixp_dok_ip?: string|null;
		/**akt_znacka_spis_ip*/
		akt_znacka_spis_ip?: string|null;
		/**Stav spisu*/
		stav_spis_ip?: GBaseFilter<number>|null;
		/**akt_znacka_dok_ip*/
		akt_znacka_dok_ip?: string|null;
		/**Stav dok*/
		stav_dok_ip?: GBaseFilter<number>|null;
		/**filtr_financovani*/
		filtr_financovani?: number|null;
		/**akt_cislo*/
		akt_cislo?: string|null;
		/**nazevFiltru*/
		nazevFiltru?: string|null;
	}
	const enum GSeznamAdaFilterDtoNames { ico = "ico", rok = "rok", ixs_cia = "ixs_cia", ixs_pla = "ixs_pla", cislo = "cislo", aktivita = "aktivita", stav_real = "stav_real", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", typ = "typ", cfuDto = "cfuDto", skp_akce = "skp_akce", psk_akce = "psk_akce", skp_akc = "skp_akc", psk_akc = "psk_akc", ixs_csp = "ixs_csp", vlastnosti = "vlastnosti", cis_real = "cis_real", nks = "nks", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", upresneni = "upresneni", stav_inp = "stav_inp", priz_az = "priz_az", stav_az = "stav_az", ixs_fun_az = "ixs_fun_az", typ_akce_sum = "typ_akce_sum", id_eds = "id_eds", id_psp = "id_psp", id_tzd = "id_tzd", id_tzd_tzd = "id_tzd_tzd", id_tzd_vyb = "id_tzd_vyb", id_tzd_eds = "id_tzd_eds", isp_nepozadopvano = "isp_nepozadopvano", isp_splneno = "isp_splneno", isp_nesplneno = "isp_nesplneno", isp_nenastaveno = "isp_nenastaveno", ixs_prr = "ixs_prr", ixs_tri = "ixs_tri", komp = "komp", dat_zmena = "dat_zmena", typ_vzb = "typ_vzb", priz_ram_doh = "priz_ram_doh", ixp_spis_ip = "ixp_spis_ip", ixp_dok_ip = "ixp_dok_ip", akt_znacka_spis_ip = "akt_znacka_spis_ip", stav_spis_ip = "stav_spis_ip", akt_znacka_dok_ip = "akt_znacka_dok_ip", stav_dok_ip = "stav_dok_ip", filtr_financovani = "filtr_financovani", akt_cislo = "akt_cislo", nazevFiltru = "nazevFiltru",}
	const enum GSeznamAdaFilterDtoFragments { ico = "*", rok = "*", ixs_cia = "*", ixs_pla = "*", cislo = "*", aktivita = "*", stav_real = "*", nazev = "*", ixs_fun_akt = "*", typ = "*", cfuDto = "*", skp_akce = "*", psk_akce = "*", skp_akc = "*", psk_akc = "*", ixs_csp = "*", vlastnosti = "*", cis_real = "*", nks = "*", fin_od = "*", fin_do = "*", real_od = "*", real_do = "*", upresneni = "*", stav_inp = "*", priz_az = "*", stav_az = "*", ixs_fun_az = "*", typ_akce_sum = "*", id_eds = "*", id_psp = "*", id_tzd = "*", id_tzd_tzd = "*", id_tzd_vyb = "*", id_tzd_eds = "*", isp_nepozadopvano = "*", isp_splneno = "*", isp_nesplneno = "*", isp_nenastaveno = "*", ixs_prr = "*", ixs_tri = "*", komp = "*", dat_zmena = "*", typ_vzb = "*", priz_ram_doh = "*", ixp_spis_ip = "*", ixp_dok_ip = "*", akt_znacka_spis_ip = "*", stav_spis_ip = "*", akt_znacka_dok_ip = "*", stav_dok_ip = "*", filtr_financovani = "*", akt_cislo = "*", nazevFiltru = "*",}
	const enum GSeznamAdaFilterDtoTypes { ico = "string", rok = "number", ixs_cia = "string", ixs_pla = "string", cislo = "GIntervalDto<string>", aktivita = "GBaseFilter<number>", stav_real = "GBaseFilter<number>", nazev = "GBaseFilter<string>", ixs_fun_akt = "GBaseFilter<string>", typ = "GBaseFilter<number>", cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", skp_akce = "string", psk_akce = "string", skp_akc = "string", psk_akc = "string", ixs_csp = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", cis_real = "string", nks = "string", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", real_od = "GIntervalDto<number>", real_do = "GIntervalDto<number>", upresneni = "GBaseFilter<string>", stav_inp = "GBaseFilter<number>", priz_az = "GBaseFilter<number>", stav_az = "GBaseFilter<number>", ixs_fun_az = "GBaseFilter<string>", typ_akce_sum = "GBaseFilter<number>", id_eds = "GIntervalDto<string>", id_psp = "GIntervalDto<string>", id_tzd = "GBaseFilter<string>", id_tzd_tzd = "GBaseFilter<string>", id_tzd_vyb = "GBaseFilter<string>", id_tzd_eds = "GBaseFilter<string>", isp_nepozadopvano = "GBaseFilter<string>", isp_splneno = "GBaseFilter<string>", isp_nesplneno = "GBaseFilter<string>", isp_nenastaveno = "GBaseFilter<string>", ixs_prr = "GBaseFilter<string>", ixs_tri = "GBaseFilter<string>", komp = "GBaseFilter<string>", dat_zmena = "JsonDate", typ_vzb = "GBaseFilter<number>", priz_ram_doh = "GBaseFilter<number>", ixp_spis_ip = "string", ixp_dok_ip = "string", akt_znacka_spis_ip = "string", stav_spis_ip = "GBaseFilter<number>", akt_znacka_dok_ip = "string", stav_dok_ip = "GBaseFilter<number>", filtr_financovani = "number", akt_cislo = "string", nazevFiltru = "string",}
	const enum GSeznamAdaFilterDtoTypeLengths { nazev = 100, ixs_fun_akt = 12, skp_akce = 6, psk_akce = 4, skp_akc = 20, psk_akc = 20, ixs_csp = 12, cis_real = 6, nks = 12, upresneni = 254, ixs_fun_az = 12, ixs_prr = 12, ixs_tri = 12,}
	/**Enum pro elementy masky*/
	const enum MaskaElementyEnum {
		/**Elementy*/
		Element,
	}
	/**DTO ulozeneho filtru*/
	interface GSeznamAdaFilterStoredDto extends Gordic.Ada.Interface.GSeznamAdaFilterDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamAdaFilterStoredDtoNames { id = "id", name = "name", description = "description", ico = "ico", rok = "rok", ixs_cia = "ixs_cia", ixs_pla = "ixs_pla", cislo = "cislo", aktivita = "aktivita", stav_real = "stav_real", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", typ = "typ", cfuDto = "cfuDto", skp_akce = "skp_akce", psk_akce = "psk_akce", skp_akc = "skp_akc", psk_akc = "psk_akc", ixs_csp = "ixs_csp", vlastnosti = "vlastnosti", cis_real = "cis_real", nks = "nks", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", upresneni = "upresneni", stav_inp = "stav_inp", priz_az = "priz_az", stav_az = "stav_az", ixs_fun_az = "ixs_fun_az", typ_akce_sum = "typ_akce_sum", id_eds = "id_eds", id_psp = "id_psp", id_tzd = "id_tzd", id_tzd_tzd = "id_tzd_tzd", id_tzd_vyb = "id_tzd_vyb", id_tzd_eds = "id_tzd_eds", isp_nepozadopvano = "isp_nepozadopvano", isp_splneno = "isp_splneno", isp_nesplneno = "isp_nesplneno", isp_nenastaveno = "isp_nenastaveno", ixs_prr = "ixs_prr", ixs_tri = "ixs_tri", komp = "komp", dat_zmena = "dat_zmena", typ_vzb = "typ_vzb", priz_ram_doh = "priz_ram_doh", ixp_spis_ip = "ixp_spis_ip", ixp_dok_ip = "ixp_dok_ip", akt_znacka_spis_ip = "akt_znacka_spis_ip", stav_spis_ip = "stav_spis_ip", akt_znacka_dok_ip = "akt_znacka_dok_ip", stav_dok_ip = "stav_dok_ip", filtr_financovani = "filtr_financovani", akt_cislo = "akt_cislo", nazevFiltru = "nazevFiltru",}
	const enum GSeznamAdaFilterStoredDtoFragments { id = "*", name = "*", description = "*", ico = "*", rok = "*", ixs_cia = "*", ixs_pla = "*", cislo = "*", aktivita = "*", stav_real = "*", nazev = "*", ixs_fun_akt = "*", typ = "*", cfuDto = "*", skp_akce = "*", psk_akce = "*", skp_akc = "*", psk_akc = "*", ixs_csp = "*", vlastnosti = "*", cis_real = "*", nks = "*", fin_od = "*", fin_do = "*", real_od = "*", real_do = "*", upresneni = "*", stav_inp = "*", priz_az = "*", stav_az = "*", ixs_fun_az = "*", typ_akce_sum = "*", id_eds = "*", id_psp = "*", id_tzd = "*", id_tzd_tzd = "*", id_tzd_vyb = "*", id_tzd_eds = "*", isp_nepozadopvano = "*", isp_splneno = "*", isp_nesplneno = "*", isp_nenastaveno = "*", ixs_prr = "*", ixs_tri = "*", komp = "*", dat_zmena = "*", typ_vzb = "*", priz_ram_doh = "*", ixp_spis_ip = "*", ixp_dok_ip = "*", akt_znacka_spis_ip = "*", stav_spis_ip = "*", akt_znacka_dok_ip = "*", stav_dok_ip = "*", filtr_financovani = "*", akt_cislo = "*", nazevFiltru = "*",}
	const enum GSeznamAdaFilterStoredDtoTypes { id = "string", name = "string", description = "string", ico = "string", rok = "number", ixs_cia = "string", ixs_pla = "string", cislo = "GIntervalDto<string>", aktivita = "GBaseFilter<number>", stav_real = "GBaseFilter<number>", nazev = "GBaseFilter<string>", ixs_fun_akt = "GBaseFilter<string>", typ = "GBaseFilter<number>", cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", skp_akce = "string", psk_akce = "string", skp_akc = "string", psk_akc = "string", ixs_csp = "string", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", cis_real = "string", nks = "string", fin_od = "GIntervalDto<number>", fin_do = "GIntervalDto<number>", real_od = "GIntervalDto<number>", real_do = "GIntervalDto<number>", upresneni = "GBaseFilter<string>", stav_inp = "GBaseFilter<number>", priz_az = "GBaseFilter<number>", stav_az = "GBaseFilter<number>", ixs_fun_az = "GBaseFilter<string>", typ_akce_sum = "GBaseFilter<number>", id_eds = "GIntervalDto<string>", id_psp = "GIntervalDto<string>", id_tzd = "GBaseFilter<string>", id_tzd_tzd = "GBaseFilter<string>", id_tzd_vyb = "GBaseFilter<string>", id_tzd_eds = "GBaseFilter<string>", isp_nepozadopvano = "GBaseFilter<string>", isp_splneno = "GBaseFilter<string>", isp_nesplneno = "GBaseFilter<string>", isp_nenastaveno = "GBaseFilter<string>", ixs_prr = "GBaseFilter<string>", ixs_tri = "GBaseFilter<string>", komp = "GBaseFilter<string>", dat_zmena = "JsonDate", typ_vzb = "GBaseFilter<number>", priz_ram_doh = "GBaseFilter<number>", ixp_spis_ip = "string", ixp_dok_ip = "string", akt_znacka_spis_ip = "string", stav_spis_ip = "GBaseFilter<number>", akt_znacka_dok_ip = "string", stav_dok_ip = "GBaseFilter<number>", filtr_financovani = "number", akt_cislo = "string", nazevFiltru = "string",}
	const enum GSeznamAdaFilterStoredDtoTypeLengths { nazev = 100, ixs_fun_akt = 12, skp_akce = 6, psk_akce = 4, skp_akc = 20, psk_akc = 20, ixs_csp = 12, cis_real = 6, nks = 12, upresneni = 254, ixs_fun_az = 12, ixs_prr = 12, ixs_tri = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSeznamAdaHledanychDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Filtr pro seznam dokladu*/
	interface GSeznamAdaHledanychDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**ixs_cia*/
		ixs_cia?: string|null;
		/**Cislo akce*/
		cislo?: string|null;
		/**Nazev*/
		nazev?: string|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**kniha*/
		kniha?: string|null;
		/**kniha_nazev*/
		kniha_nazev?: string|null;
	}
	const enum GSeznamAdaHledanychDtoNames { ico = "ico", rok = "rok", ixs_cia = "ixs_cia", cislo = "cislo", nazev = "nazev", ixs_fun_akt = "ixs_fun_akt", kniha = "kniha", kniha_nazev = "kniha_nazev",}
	const enum GSeznamAdaHledanychDtoFragments { ico = "*", rok = "*", ixs_cia = "*", cislo = "*", nazev = "*", ixs_fun_akt = "*", kniha = "*", kniha_nazev = "*",}
	const enum GSeznamAdaHledanychDtoTypes { ico = "string", rok = "number", ixs_cia = "string", cislo = "string", nazev = "string", ixs_fun_akt = "string", kniha = "string", kniha_nazev = "string",}
	const enum GSeznamAdaHledanychDtoTypeLengths { nazev = 100, ixs_fun_akt = 12, kniha = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSeznamDokladuDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSeznamRozpisAdaFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Filtr pro seznam rozpisu*/
	interface GSeznamRozpisAdaDto extends Gordic.Eko.Interface.GCfuFilterDto {
		/**ucs*/
		ucs?: GIntervalDto<string>|null;
		/**uus*/
		uus?: GIntervalDto<string>|null;
		/**nks*/
		nks?: GIntervalDto<string>|null;
		/**ico_fin*/
		ico_fin?: GIntervalDto<string>|null;
		/**rok*/
		rok_fin?: GIntervalDto<number>|null;
		/**c0c1_kc*/
		c0c1_kc?: GIntervalDto<JsonDecimal>|null;
		/**c0c1_2*/
		c0c1_2?: GIntervalDto<JsonDecimal>|null;
	}
	const enum GSeznamRozpisAdaDtoNames { ucs = "ucs", uus = "uus", nks = "nks", ico_fin = "ico_fin", rok_fin = "rok_fin", c0c1_kc = "c0c1_kc", c0c1_2 = "c0c1_2", cfu = "cfu",}
	const enum GSeznamRozpisAdaDtoFragments { ucs = "*", uus = "*", nks = "*", ico_fin = "*", rok_fin = "*", c0c1_kc = "*", c0c1_2 = "*", cfu = "*",}
	const enum GSeznamRozpisAdaDtoTypes { ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", ico_fin = "GIntervalDto<string>", rok_fin = "GIntervalDto<number>", c0c1_kc = "GIntervalDto<JsonDecimal>", c0c1_2 = "GIntervalDto<JsonDecimal>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GSeznamRozpisAdaDtoTypeLengths {}
	/**celý Filtr pro seznam dokladu*/
	interface GSeznamRozpisAdaFilterDto {
		/**cislo*/
		cislo?: string|null;
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**cfuDto*/
		cfuDto?: Gordic.Ada.Interface.GSeznamRozpisAdaDto|null;
	}
	const enum GSeznamRozpisAdaFilterDtoNames { cislo = "cislo", ico = "ico", rok = "rok", cfuDto = "cfuDto",}
	const enum GSeznamRozpisAdaFilterDtoFragments { cislo = "*", ico = "*", rok = "*", cfuDto = "*",}
	const enum GSeznamRozpisAdaFilterDtoTypes { cislo = "string", ico = "string", rok = "number", cfuDto = "Gordic.Ada.Interface.GSeznamRozpisAdaDto",}
	const enum GSeznamRozpisAdaFilterDtoTypeLengths {}
	/**DTO ulozeneho filtru*/
	interface GSeznamRozpisAdaFilterStoredDto extends Gordic.Ada.Interface.GSeznamRozpisAdaFilterDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamRozpisAdaFilterStoredDtoNames { id = "id", name = "name", description = "description", cislo = "cislo", ico = "ico", rok = "rok", cfuDto = "cfuDto",}
	const enum GSeznamRozpisAdaFilterStoredDtoFragments { id = "*", name = "*", description = "*", cislo = "*", ico = "*", rok = "*", cfuDto = "*",}
	const enum GSeznamRozpisAdaFilterStoredDtoTypes { id = "string", name = "string", description = "string", cislo = "string", ico = "string", rok = "number", cfuDto = "Gordic.Ada.Interface.GSeznamRozpisAdaDto",}
	const enum GSeznamRozpisAdaFilterStoredDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSeznamZapisuAdaFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Filtr pro seznam dokladu*/
	interface GSeznamZapisuAdaDto extends Gordic.Eko.Interface.GCfuFilterDto {
		/**ico_fin*/
		ico_fin?: GIntervalDto<string>|null;
		/**rok*/
		rok_fin?: GIntervalDto<number>|null;
		/**ucs*/
		ucs?: GIntervalDto<string>|null;
		/**uus*/
		uus?: GIntervalDto<string>|null;
		/**nks*/
		nks?: GIntervalDto<string>|null;
		/**drd_msk*/
		drd_msk_fin?: string|null;
		/**drd_msk*/
		drd?: number|null;
		/**mesic*/
		mesic?: GIntervalDto<number>|null;
		/**den*/
		den?: GIntervalDto<number>|null;
		/**Doklad*/
		ac?: GIntervalDto<string>|null;
		/**Popis dokladu*/
		pdok?: string|null;
		/**Popis dokladu*/
		popis?: string|null;
		/**MD*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**Dal*/
		c1?: GIntervalDto<JsonDecimal>|null;
		/**MD - Dal*/
		c0c1?: GIntervalDto<JsonDecimal>|null;
		/**AS MD*/
		c0_as?: GIntervalDto<JsonDecimal>|null;
		/**AS DAL*/
		c1_as?: GIntervalDto<JsonDecimal>|null;
		/**AS P-V*/
		c0c1_as?: GIntervalDto<JsonDecimal>|null;
		/**ROK DPH*/
		rok_uej?: GIntervalDto<number>|null;
		/**Mesic DPH*/
		mesic_uej?: GIntervalDto<number>|null;
		/**ZD*/
		zd?: GIntervalDto<number>|null;
		/**PID Primarni*/
		ixp_prim?: string|null;
		/**Agendove cislo*/
		ac_ag?: GIntervalDto<string>|null;
		/**Datum zmeny*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**esu_ico*/
		esu_ico?: string|null;
		/**esu_rc*/
		esu_rc?: string|null;
	}
	const enum GSeznamZapisuAdaDtoNames { ico_fin = "ico_fin", rok_fin = "rok_fin", ucs = "ucs", uus = "uus", nks = "nks", drd_msk_fin = "drd_msk_fin", drd = "drd", mesic = "mesic", den = "den", ac = "ac", pdok = "pdok", popis = "popis", c0 = "c0", c1 = "c1", c0c1 = "c0c1", c0_as = "c0_as", c1_as = "c1_as", c0c1_as = "c0c1_as", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", ixp_prim = "ixp_prim", ac_ag = "ac_ag", dat_zmena = "dat_zmena", typ_ag = "typ_ag", esu_txt = "esu_txt", esu_ico = "esu_ico", esu_rc = "esu_rc", cfu = "cfu",}
	const enum GSeznamZapisuAdaDtoFragments { ico_fin = "*", rok_fin = "*", ucs = "*", uus = "*", nks = "*", drd_msk_fin = "*", drd = "*", mesic = "*", den = "*", ac = "*", pdok = "*", popis = "*", c0 = "*", c1 = "*", c0c1 = "*", c0_as = "*", c1_as = "*", c0c1_as = "*", rok_uej = "*", mesic_uej = "*", zd = "*", ixp_prim = "*", ac_ag = "*", dat_zmena = "*", typ_ag = "*", esu_txt = "*", esu_ico = "*", esu_rc = "*", cfu = "*",}
	const enum GSeznamZapisuAdaDtoTypes { ico_fin = "GIntervalDto<string>", rok_fin = "GIntervalDto<number>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", drd_msk_fin = "string", drd = "number", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", ac = "GIntervalDto<string>", pdok = "string", popis = "string", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>", c0c1 = "GIntervalDto<JsonDecimal>", c0_as = "GIntervalDto<JsonDecimal>", c1_as = "GIntervalDto<JsonDecimal>", c0c1_as = "GIntervalDto<JsonDecimal>", rok_uej = "GIntervalDto<number>", mesic_uej = "GIntervalDto<number>", zd = "GIntervalDto<number>", ixp_prim = "string", ac_ag = "GIntervalDto<string>", dat_zmena = "GIntervalDto<JsonDate>", typ_ag = "number", esu_txt = "string", esu_ico = "string", esu_rc = "string", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GSeznamZapisuAdaDtoTypeLengths {}
	/**celý Filtr pro seznam dokladu*/
	interface GSeznamZapisuAdaFilterDto {
		/**cislo*/
		cislo?: string|null;
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**cfuDto*/
		cfuDto?: Gordic.Ada.Interface.GSeznamZapisuAdaDto|null;
		/**drd_msk*/
		drd_msk?: string|null;
		/**drd_msk_txt*/
		drd_msk_txt?: string|null;
		/**fin_od*/
		fin_od?: number|null;
		/**fin_do*/
		fin_do?: number|null;
	}
	const enum GSeznamZapisuAdaFilterDtoNames { cislo = "cislo", ico = "ico", rok = "rok", cfuDto = "cfuDto", drd_msk = "drd_msk", drd_msk_txt = "drd_msk_txt", fin_od = "fin_od", fin_do = "fin_do",}
	const enum GSeznamZapisuAdaFilterDtoFragments { cislo = "*", ico = "*", rok = "*", cfuDto = "*", drd_msk = "*", drd_msk_txt = "*", fin_od = "*", fin_do = "*",}
	const enum GSeznamZapisuAdaFilterDtoTypes { cislo = "string", ico = "string", rok = "number", cfuDto = "Gordic.Ada.Interface.GSeznamZapisuAdaDto", drd_msk = "string", drd_msk_txt = "string", fin_od = "number", fin_do = "number",}
	const enum GSeznamZapisuAdaFilterDtoTypeLengths {}
	/**DTO ulozeneho filtru*/
	interface GSeznamZapisuAdaFilterStoredDto extends Gordic.Ada.Interface.GSeznamZapisuAdaFilterDto {
		/**Id*/
		id?: string|null;
		/**Name*/
		name?: string|null;
		/**Description*/
		description?: string|null;
	}
	const enum GSeznamZapisuAdaFilterStoredDtoNames { id = "id", name = "name", description = "description", cislo = "cislo", ico = "ico", rok = "rok", cfuDto = "cfuDto", drd_msk = "drd_msk", drd_msk_txt = "drd_msk_txt", fin_od = "fin_od", fin_do = "fin_do",}
	const enum GSeznamZapisuAdaFilterStoredDtoFragments { id = "*", name = "*", description = "*", cislo = "*", ico = "*", rok = "*", cfuDto = "*", drd_msk = "*", drd_msk_txt = "*", fin_od = "*", fin_do = "*",}
	const enum GSeznamZapisuAdaFilterStoredDtoTypes { id = "string", name = "string", description = "string", cislo = "string", ico = "string", rok = "number", cfuDto = "Gordic.Ada.Interface.GSeznamZapisuAdaDto", drd_msk = "string", drd_msk_txt = "string", fin_od = "number", fin_do = "number",}
	const enum GSeznamZapisuAdaFilterStoredDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSmlspidDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:smlspid*/
	interface GSmlspidDokladyDto {
		/**DBCOLUMN:smlspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:smlspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:smlspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:smlspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:smlspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:smlspid.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:smlspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:smlspid.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:smlspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:smlspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:smlspid.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:smlspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:smlspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:typ_sml*/
		typ_sml?: string|null;
	}
	const enum GSmlspidDokladyDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", ico = "ico", popis = "popis", ac = "ac", ac_sml = "ac_sml", ixp_den = "ixp_den", c = "c", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt", typ_sml = "typ_sml",}
	const enum GSmlspidDokladyDtoFragments { ixp = "*", ixs_esu = "*", ico = "*", popis = "*", ac = "*", ac_sml = "*", ixp_den = "*", c = "*", ktg_typ = "*", ixs_typ = "*", eko_akt = "*", esu_txt = "*", ktg_typ_txt = "*", typ_sml = "*",}
	const enum GSmlspidDokladyDtoTypes { ixp = "string", ixs_esu = "string", ico = "string", popis = "string", ac = "string", ac_sml = "string", ixp_den = "string", c = "JsonDecimal", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", esu_txt = "string", ktg_typ_txt = "string", typ_sml = "string",}
	const enum GSmlspidDokladyDtoTypeLengths { ixp = 12, ixs_esu = 12, ico = 10, popis = 254, ac = 30, ac_sml = 30, ixp_den = 12, ixs_typ = 12, esu_txt = 254, ktg_typ_txt = 254, typ_sml = 3,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSrvacioALLDto.d.ts 

declare namespace Gordic.Ada.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSrvacioDto.d.ts 

declare namespace Gordic.Ada.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSrvdciaSeznamZapisuDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvdcia*/
	interface GSrvdciaSeznamZapisuDto {
		/**DBCOLUMN:srvdcia.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvdcia.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvdcia.cislo*/
		cislo?: string|null;
		/**DBCOLUMN:srvdcia.radek*/
		radek?: number|null;
		/**DBCOLUMN:srvdcia.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:srvdcia.xuete*/
		xuete?: string|null;
		/**DBCOLUMN:srvdcia.drd*/
		drd?: number|null;
		/**DBCOLUMN:srvdcia.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:srvdcia.komp*/
		komp?: string|null;
		/**DBCOLUMN:srvdcia.nks*/
		nks?: string|null;
		/**DBCOLUMN:srvdcia.den*/
		den?: number|null;
		/**DBCOLUMN:srvdcia.c0*/
		c0?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.c1*/
		c1?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.uea*/
		uea?: string|null;
		/**DBCOLUMN:srvdcia.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:srvdcia.uec*/
		uec?: string|null;
		/**DBCOLUMN:srvdcia.ued*/
		ued?: string|null;
		/**DBCOLUMN:srvdcia.uee*/
		uee?: string|null;
		/**DBCOLUMN:srvdcia.uef*/
		uef?: string|null;
		/**DBCOLUMN:srvdcia.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:srvdcia.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:srvdcia.uei*/
		uei?: string|null;
		/**DBCOLUMN:srvdcia.uej*/
		uej?: string|null;
		/**DBCOLUMN:srvdcia.te0*/
		te0?: string|null;
		/**DBCOLUMN:srvdcia.te1*/
		te1?: string|null;
		/**DBCOLUMN:srvdcia.te2*/
		te2?: string|null;
		/**DBCOLUMN:srvdcia.te3*/
		te3?: string|null;
		/**DBCOLUMN:srvdcia.te4*/
		te4?: string|null;
		/**DBCOLUMN:srvdcia.uek*/
		uek?: string|null;
		/**DBCOLUMN:srvdcia.uel*/
		uel?: string|null;
		/**DBCOLUMN:srvdcia.uem*/
		uem?: string|null;
		/**DBCOLUMN:srvdcia.uen*/
		uen?: string|null;
		/**DBCOLUMN:srvdcia.te5*/
		te5?: string|null;
		/**DBCOLUMN:srvdcia.te6*/
		te6?: string|null;
		/**DBCOLUMN:srvdcia.te7*/
		te7?: string|null;
		/**DBCOLUMN:srvdcia.te8*/
		te8?: string|null;
		/**DBCOLUMN:srvdcia.te9*/
		te9?: string|null;
		/**DBCOLUMN:srvdcia.t_ico*/
		t_ico?: string|null;
		/**DBCOLUMN:srvdcia.c0_s*/
		c0_s?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.c1_s*/
		c1_s?: JsonDecimal|null;
		/**DBCOLUMN:srvdcia.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:srvdcia.ac*/
		ac?: string|null;
		/**DBCOLUMN:srvdcia.ac_p*/
		ac_p?: string|null;
		/**DBCOLUMN:srvdcia.dat_inv_maj*/
		dat_inv_maj?: JsonDate|null;
		/**DBCOLUMN:srvdcia.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:srvdcia.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:srvdcia.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:srvdcia.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:srvdcia.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:srvdcia.uec_uc*/
		uec_uc?: string|null;
		/**DBCOLUMN:srvdcia.ued_uc*/
		ued_uc?: string|null;
		/**DBCOLUMN:srvdcia.uee_uc*/
		uee_uc?: string|null;
		/**DBCOLUMN:srvdcia.uef_uc*/
		uef_uc?: string|null;
		/**DBCOLUMN:srvdcia.ueg_uc*/
		ueg_uc?: string|null;
		/**DBCOLUMN:srvdcia.ueh_uc*/
		ueh_uc?: string|null;
		/**DBCOLUMN:srvdcia.uei_uc*/
		uei_uc?: string|null;
		/**DBCOLUMN:srvdcia.uej_uc*/
		uej_uc?: string|null;
		/**DBCOLUMN:srvdcia.te0_uc*/
		te0_uc?: string|null;
		/**DBCOLUMN:srvdcia.te1_uc*/
		te1_uc?: string|null;
		/**DBCOLUMN:srvdcia.te2_uc*/
		te2_uc?: string|null;
		/**DBCOLUMN:srvdcia.te3_uc*/
		te3_uc?: string|null;
		/**DBCOLUMN:srvdcia.te4_uc*/
		te4_uc?: string|null;
		/**DBCOLUMN:srvdcia.uek_uc*/
		uek_uc?: string|null;
		/**DBCOLUMN:srvdcia.uel_uc*/
		uel_uc?: string|null;
		/**DBCOLUMN:srvdcia.uem_uc*/
		uem_uc?: string|null;
		/**DBCOLUMN:srvdcia.uen_uc*/
		uen_uc?: string|null;
		/**DBCOLUMN:srvdcia.te5_uc*/
		te5_uc?: string|null;
		/**DBCOLUMN:srvdcia.te6_uc*/
		te6_uc?: string|null;
		/**DBCOLUMN:srvdcia.te7_uc*/
		te7_uc?: string|null;
		/**DBCOLUMN:srvdcia.te8_uc*/
		te8_uc?: string|null;
		/**DBCOLUMN:srvdcia.te9_uc*/
		te9_uc?: string|null;
		/**DBCOLUMN:srvdcia.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:srvdcia.priz_char*/
		priz_char?: number|null;
		/**DBCOLUMN:srvdcia.druh_char*/
		druh_char?: number|null;
		/**DBCOLUMN:srvdcia.nks_uc*/
		nks_uc?: string|null;
		/**DBCOLUMN:srvdcia.lic*/
		lic?: string|null;
		/**DBCOLUMN:srvdcia.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:srvdcia.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:srvdcia.stav_kch*/
		stav_kch?: number|null;
		/**DBCOLUMN:srvdcia.popis*/
		popis?: string|null;
	}
	const enum GSrvdciaSeznamZapisuDtoNames { rok = "rok", ico = "ico", cislo = "cislo", radek = "radek", ucs = "ucs", xuete = "xuete", drd = "drd", mesic = "mesic", komp = "komp", nks = "nks", den = "den", c0 = "c0", c1 = "c1", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", t_ico = "t_ico", c0_s = "c0_s", c1_s = "c1_s", typ_org = "typ_org", ac = "ac", ac_p = "ac_p", dat_inv_maj = "dat_inv_maj", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uec_uc = "uec_uc", ued_uc = "ued_uc", uee_uc = "uee_uc", uef_uc = "uef_uc", ueg_uc = "ueg_uc", ueh_uc = "ueh_uc", uei_uc = "uei_uc", uej_uc = "uej_uc", te0_uc = "te0_uc", te1_uc = "te1_uc", te2_uc = "te2_uc", te3_uc = "te3_uc", te4_uc = "te4_uc", uek_uc = "uek_uc", uel_uc = "uel_uc", uem_uc = "uem_uc", uen_uc = "uen_uc", te5_uc = "te5_uc", te6_uc = "te6_uc", te7_uc = "te7_uc", te8_uc = "te8_uc", te9_uc = "te9_uc", radek_z = "radek_z", priz_char = "priz_char", druh_char = "druh_char", nks_uc = "nks_uc", lic = "lic", ixp = "ixp", typ_ag = "typ_ag", stav_kch = "stav_kch", popis = "popis",}
	const enum GSrvdciaSeznamZapisuDtoFragments { rok = "*", ico = "*", cislo = "*", radek = "*", ucs = "*", xuete = "*", drd = "*", mesic = "*", komp = "*", nks = "*", den = "*", c0 = "*", c1 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", t_ico = "*", c0_s = "*", c1_s = "*", typ_org = "*", ac = "*", ac_p = "*", dat_inv_maj = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", uea_uc = "*", ueb_uc = "*", uec_uc = "*", ued_uc = "*", uee_uc = "*", uef_uc = "*", ueg_uc = "*", ueh_uc = "*", uei_uc = "*", uej_uc = "*", te0_uc = "*", te1_uc = "*", te2_uc = "*", te3_uc = "*", te4_uc = "*", uek_uc = "*", uel_uc = "*", uem_uc = "*", uen_uc = "*", te5_uc = "*", te6_uc = "*", te7_uc = "*", te8_uc = "*", te9_uc = "*", radek_z = "*", priz_char = "*", druh_char = "*", nks_uc = "*", lic = "*", ixp = "*", typ_ag = "*", stav_kch = "*", popis = "*",}
	const enum GSrvdciaSeznamZapisuDtoTypes { rok = "number", ico = "string", cislo = "string", radek = "number", ucs = "string", xuete = "string", drd = "number", mesic = "number", komp = "string", nks = "string", den = "number", c0 = "JsonDecimal", c1 = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", t_ico = "string", c0_s = "JsonDecimal", c1_s = "JsonDecimal", typ_org = "number", ac = "string", ac_p = "string", dat_inv_maj = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", uea_uc = "string", ueb_uc = "string", uec_uc = "string", ued_uc = "string", uee_uc = "string", uef_uc = "string", ueg_uc = "string", ueh_uc = "string", uei_uc = "string", uej_uc = "string", te0_uc = "string", te1_uc = "string", te2_uc = "string", te3_uc = "string", te4_uc = "string", uek_uc = "string", uel_uc = "string", uem_uc = "string", uen_uc = "string", te5_uc = "string", te6_uc = "string", te7_uc = "string", te8_uc = "string", te9_uc = "string", radek_z = "number", priz_char = "number", druh_char = "number", nks_uc = "string", lic = "string", ixp = "string", typ_ag = "number", stav_kch = "number", popis = "string",}
	const enum GSrvdciaSeznamZapisuDtoTypeLengths { ico = 10, cislo = 16, ucs = 10, xuete = 148, komp = 10, nks = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, t_ico = 50, ac = 20, ac_p = 20, zmenu_prov = 12, uea_uc = 3, ueb_uc = 4, uec_uc = 12, ued_uc = 12, uee_uc = 12, uef_uc = 3, ueg_uc = 16, ueh_uc = 4, uei_uc = 4, uej_uc = 12, te0_uc = 16, te1_uc = 16, te2_uc = 16, te3_uc = 6, te4_uc = 12, uek_uc = 6, uel_uc = 10, uem_uc = 10, uen_uc = 6, te5_uc = 30, te6_uc = 12, te7_uc = 20, te8_uc = 12, te9_uc = 20, nks_uc = 12, lic = 4, ixp = 12, popis = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSrvdpozNoteDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro poznámky z tabulky vas.Srvdpoz*/
	interface GSrvdpozNoteDto extends Gordic.Gin.Interface.GNoteDto {
		/**Pořadové číslo poznámky.*/
		porCislo?: number|null;
		/**DBCOLUMN:srvdpoz.rok*/
		rok?: number|null;
		/**DBCOLUMN:srvdpoz.ico*/
		ico?: string|null;
		/**DBCOLUMN:srvdpoz.cislo*/
		cislo?: string|null;
		/**Id*/
		Id?: string|null;
	}
	const enum GSrvdpozNoteDtoNames { porCislo = "porCislo", rok = "rok", ico = "ico", cislo = "cislo", Id = "Id", text = "text", category = "category", author = "author", dateCreated = "dateCreated", editor = "editor", dateModified = "dateModified", isActive = "isActive", isOwn = "isOwn", uzo = "uzo", porCisloPuv = "porCisloPuv", Permissions = "Permissions",}
	const enum GSrvdpozNoteDtoFragments { porCislo = "*", rok = "*", ico = "*", cislo = "*", Id = "*", text = "*", category = "*", author = "*", dateCreated = "*", editor = "*", dateModified = "*", isActive = "*", isOwn = "*", uzo = "*", porCisloPuv = "*", Permissions = "*",}
	const enum GSrvdpozNoteDtoTypes { porCislo = "number", rok = "number", ico = "string", cislo = "string", Id = "string", text = "string", category = "string", author = "string", dateCreated = "JsonDate", editor = "string", dateModified = "JsonDate", isActive = "boolean", isOwn = "boolean", uzo = "string", porCisloPuv = "number", Permissions = "number",}
	const enum GSrvdpozNoteDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSrvscisDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvscis*/
	interface GSrvscisDto {
		/**ico*/
		ico?: string|null;
		/**cislo*/
		cislo?: string|null;
		/**cislo_old*/
		cislo_old?: string|null;
		/**rok_od*/
		rok_od?: number|null;
		/**rok_do*/
		rok_do?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**aktivita_cis_old*/
		aktivita_cislo_old?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
	}
	const enum GSrvscisDtoNames { ico = "ico", cislo = "cislo", cislo_old = "cislo_old", rok_od = "rok_od", rok_do = "rok_do", aktivita = "aktivita", aktivita_cislo_old = "aktivita_cislo_old", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GSrvscisDtoFragments { ico = "main", cislo = "main", cislo_old = "main", rok_od = "main", rok_do = "main", aktivita = "main", aktivita_cislo_old = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main",}
	const enum GSrvscisDtoTypes { ico = "string", cislo = "string", cislo_old = "string", rok_od = "number", rok_do = "number", aktivita = "number", aktivita_cislo_old = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string",}
	const enum GSrvscisDtoTypeLengths { ico = 10, cislo = 16, cislo_old = 16, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GSrvsppaDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Datový objekt popisující Seznam rkai pro přípravu.*/
	interface GSrvsppaDto {
		/**Rok.*/
		rok?: number|null;
		/**Ičo.*/
		ico?: string|null;
		/**Číslo.*/
		cislo?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Typ.*/
		typ?: number|null;
		/**Adresa1.*/
		adresa1?: string|null;
		/**Adresa2.*/
		adresa2?: string|null;
		/**Psc.*/
		psc?: string|null;
		/**Adresa3.*/
		adresa3?: string|null;
		/**Fin od.*/
		fin_od?: number|null;
		/**Fin do.*/
		fin_do?: number|null;
		/**Real od.*/
		real_od?: number|null;
		/**Real do.*/
		real_do?: number|null;
		/**Příjmení.*/
		prijmeni?: string|null;
		/**Jméno.*/
		jmeno?: string|null;
		/**Os číslo.*/
		os_cislo?: string|null;
		/**Telefon.*/
		telefon?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ktg akce.*/
		ktg_akce?: number|null;
		/**Skp akce.*/
		skp_akce?: string|null;
		/**Psk akce.*/
		psk_akce?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Inv cis.*/
		inv_cis?: string|null;
		/**Mandatar.*/
		mandatar?: string|null;
		/**T nks.*/
		t_nks?: string|null;
		/**Nákladové středisko.*/
		nks?: string|null;
		/**Xpf pf.*/
		xpf_pf?: string|null;
		/**Zad.*/
		zad?: string|null;
		/**Cevid.*/
		cevid?: string|null;
		/**Cpp.*/
		cpp?: string|null;
		/**Chp.*/
		chp?: string|null;
		/**Cip.*/
		cip?: string|null;
		/**C nato.*/
		c_nato?: JsonDecimal|null;
		/**C ipf.*/
		c_ipf?: JsonDecimal|null;
		/**Cpps01.*/
		cpps01?: string|null;
		/**Cpps02.*/
		cpps02?: string|null;
		/**Cpps03.*/
		cpps03?: string|null;
		/**Cpps04.*/
		cpps04?: string|null;
		/**Cpps05.*/
		cpps05?: string|null;
		/**Identifikátor pla.*/
		ixs_pla?: string|null;
		/**Mj.*/
		mj?: string|null;
		/**C pd.*/
		c_pd?: JsonDecimal|null;
		/**Číslo pd.*/
		cislo_pd?: string|null;
		/**Xpf nato.*/
		xpf_nato?: string|null;
		/**Cis real.*/
		cis_real?: string|null;
		/**Prij dot.*/
		prij_dot?: string|null;
		/**Skp.*/
		skp?: string|null;
		/**C celk.*/
		c_celk?: JsonDecimal|null;
		/**Identifikátor cia.*/
		ixs_cia?: string|null;
		/**Funkce akt.*/
		ixs_fun_akt?: string|null;
		/**Účetní středisko.*/
		ucs?: string|null;
		/**Funkce zad.*/
		ixs_fun_zad?: string|null;
		/**Typ vzb.*/
		typ_vzb?: number|null;
		/**Upresneni.*/
		upresneni?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_nazev*/
		ixs_fun_akt_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_fun_akt_nazev_ref*/
		ixs_fun_akt_nazev_ref?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_pla_txt*/
		ixs_pla_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GSrvsppaDtoNames { rok = "rok", ico = "ico", cislo = "cislo", nazev = "nazev", typ = "typ", adresa1 = "adresa1", adresa2 = "adresa2", psc = "psc", adresa3 = "adresa3", fin_od = "fin_od", fin_do = "fin_do", real_od = "real_od", real_do = "real_do", prijmeni = "prijmeni", jmeno = "jmeno", os_cislo = "os_cislo", telefon = "telefon", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_akce = "ktg_akce", skp_akce = "skp_akce", psk_akce = "psk_akce", aktivita = "aktivita", inv_cis = "inv_cis", mandatar = "mandatar", t_nks = "t_nks", nks = "nks", xpf_pf = "xpf_pf", zad = "zad", cevid = "cevid", cpp = "cpp", chp = "chp", cip = "cip", c_nato = "c_nato", c_ipf = "c_ipf", cpps01 = "cpps01", cpps02 = "cpps02", cpps03 = "cpps03", cpps04 = "cpps04", cpps05 = "cpps05", ixs_pla = "ixs_pla", mj = "mj", c_pd = "c_pd", cislo_pd = "cislo_pd", xpf_nato = "xpf_nato", cis_real = "cis_real", prij_dot = "prij_dot", skp = "skp", c_celk = "c_celk", ixs_cia = "ixs_cia", ixs_fun_akt = "ixs_fun_akt", ucs = "ucs", ixs_fun_zad = "ixs_fun_zad", typ_vzb = "typ_vzb", upresneni = "upresneni", ixs_fun_akt_nazev = "ixs_fun_akt_nazev", ixs_fun_akt_nazev_ref = "ixs_fun_akt_nazev_ref", ixs_pla_txt = "ixs_pla_txt", pocet = "pocet",}
	const enum GSrvsppaDtoFragments { rok = "main", ico = "main", cislo = "main", nazev = "main", typ = "main", adresa1 = "main", adresa2 = "main", psc = "main", adresa3 = "main", fin_od = "main", fin_do = "main", real_od = "main", real_do = "main", prijmeni = "main", jmeno = "main", os_cislo = "main", telefon = "main", dat_zmena = "main", zmenu_prov = "main", ktg_akce = "main", skp_akce = "main", psk_akce = "main", aktivita = "main", inv_cis = "main", mandatar = "main", t_nks = "main", nks = "main", xpf_pf = "main", zad = "main", cevid = "main", cpp = "main", chp = "main", cip = "main", c_nato = "main", c_ipf = "main", cpps01 = "main", cpps02 = "main", cpps03 = "main", cpps04 = "main", cpps05 = "main", ixs_pla = "main", mj = "main", c_pd = "main", cislo_pd = "main", xpf_nato = "main", cis_real = "main", prij_dot = "main", skp = "main", c_celk = "main", ixs_cia = "main", ixs_fun_akt = "main", ucs = "main", ixs_fun_zad = "main", typ_vzb = "main", upresneni = "main", ixs_fun_akt_nazev = "main", ixs_fun_akt_nazev_ref = "main", ixs_pla_txt = "main", pocet = "main",}
	const enum GSrvsppaDtoTypes { rok = "number", ico = "string", cislo = "string", nazev = "string", typ = "number", adresa1 = "string", adresa2 = "string", psc = "string", adresa3 = "string", fin_od = "number", fin_do = "number", real_od = "number", real_do = "number", prijmeni = "string", jmeno = "string", os_cislo = "string", telefon = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_akce = "number", skp_akce = "string", psk_akce = "string", aktivita = "number", inv_cis = "string", mandatar = "string", t_nks = "string", nks = "string", xpf_pf = "string", zad = "string", cevid = "string", cpp = "string", chp = "string", cip = "string", c_nato = "JsonDecimal", c_ipf = "JsonDecimal", cpps01 = "string", cpps02 = "string", cpps03 = "string", cpps04 = "string", cpps05 = "string", ixs_pla = "string", mj = "string", c_pd = "JsonDecimal", cislo_pd = "string", xpf_nato = "string", cis_real = "string", prij_dot = "string", skp = "string", c_celk = "JsonDecimal", ixs_cia = "string", ixs_fun_akt = "string", ucs = "string", ixs_fun_zad = "string", typ_vzb = "number", upresneni = "string", ixs_fun_akt_nazev = "string", ixs_fun_akt_nazev_ref = "string", ixs_pla_txt = "string", pocet = "number",}
	const enum GSrvsppaDtoTypeLengths { ico = 10, cislo = 16, nazev = 254, adresa1 = 50, adresa2 = 50, psc = 12, adresa3 = 50, prijmeni = 100, jmeno = 100, os_cislo = 10, telefon = 254, zmenu_prov = 12, skp_akce = 6, psk_akce = 4, inv_cis = 50, mandatar = 5, t_nks = 50, nks = 12, xpf_pf = 63, zad = 35, cevid = 6, cpp = 6, chp = 6, cip = 13, cpps01 = 6, cpps02 = 6, cpps03 = 6, cpps04 = 6, cpps05 = 6, ixs_pla = 12, mj = 5, cislo_pd = 20, xpf_nato = 20, cis_real = 6, prij_dot = 254, skp = 15, ixs_cia = 12, ixs_fun_akt = 12, ucs = 10, ixs_fun_zad = 12, upresneni = 254, ixs_fun_akt_nazev = 254, ixs_fun_akt_nazev_ref = 254, ixs_pla_txt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GUctspidDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:uctspid*/
	interface GUctspidDokladyDto {
		/**DBCOLUMN:uctspid.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:uctspid.lic*/
		lic?: string|null;
		/**DBCOLUMN:uctspid.popis*/
		popis?: string|null;
		/**DBCOLUMN:uctspid.ico*/
		ico?: string|null;
		/**DBCOLUMN:uctspid.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:uctspid.nks*/
		nks?: string|null;
		/**DBCOLUMN:uctspid.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:uctspid.ac*/
		ac?: string|null;
		/**DBCOLUMN:uctspid.rok*/
		rok?: number|null;
		/**DBCOLUMN:uctspid.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:uctspid.den*/
		den?: number|null;
		/**DBCOLUMN:uctspid.dat_prij_pod*/
		dat_prij_pod?: JsonDate|null;
		/**DBCOLUMN:uctspid.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:uctspid.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:uctspid.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:uctspid.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:uctspid.dat_zau*/
		dat_zau?: JsonDate|null;
		/**DBCOLUMN:uctspid.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:uctspid.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:uctspid.ac_ixe*/
		ac_ixe?: string|null;
		/**DBCOLUMN:uctspid.stav_ac_ixe*/
		stav_ac_ixe?: number|null;
		/**DBCOLUMN:uctspid.drd*/
		drd?: number|null;
		/**DBCOLUMN:uctspid.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:uctspid.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctspid.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:uctspid.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:uctspid.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:uctspid.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:uctspid.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:uctspid.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:uctspid.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:uctspid.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:uctspid.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:uctspid.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:uctspid.uus*/
		uus?: string|null;
		/**DBCOLUMN:uctspid.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:uctspid.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:uctspid.int_dok*/
		int_dok?: number|null;
		/**DBCOLUMN:uctspid.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:rozspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:rozspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
	}
	const enum GUctspidDokladyDtoNames { ixp = "ixp", lic = "lic", popis = "popis", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", rok = "rok", mesic = "mesic", den = "den", dat_prij_pod = "dat_prij_pod", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zau = "dat_zau", s_zau = "s_zau", s_sto = "s_sto", ac_ixe = "ac_ixe", stav_ac_ixe = "stav_ac_ixe", drd = "drd", c = "c", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_ag = "typ_ag", ixs_fun_akt = "ixs_fun_akt", rok_dph = "rok_dph", mesic_dph = "mesic_dph", bu_vl = "bu_vl", sk_vl = "sk_vl", priz_view = "priz_view", ac_ag = "ac_ag", ixs_esu = "ixs_esu", uus = "uus", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", int_dok = "int_dok", subrada = "subrada", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt",}
	const enum GUctspidDokladyDtoFragments { ixp = "*", lic = "*", popis = "*", ico = "*", ucs = "*", nks = "*", ixp_den = "*", ac = "*", rok = "*", mesic = "*", den = "*", dat_prij_pod = "*", ixs_typ = "*", ktg_typ = "*", eko_akt = "*", dat_evid = "*", dat_zau = "*", s_zau = "*", s_sto = "*", ac_ixe = "*", stav_ac_ixe = "*", drd = "*", c = "*", dat_zmena = "*", zmenu_prov = "*", typ_ag = "*", ixs_fun_akt = "*", rok_dph = "*", mesic_dph = "*", bu_vl = "*", sk_vl = "*", priz_view = "*", ac_ag = "*", ixs_esu = "*", uus = "*", cis_real = "*", ixs_fun_vyriz = "*", int_dok = "*", subrada = "*", esu_txt = "*", ktg_typ_txt = "*",}
	const enum GUctspidDokladyDtoTypes { ixp = "string", lic = "string", popis = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", rok = "number", mesic = "number", den = "number", dat_prij_pod = "JsonDate", ixs_typ = "string", ktg_typ = "number", eko_akt = "number", dat_evid = "JsonDate", dat_zau = "JsonDate", s_zau = "number", s_sto = "number", ac_ixe = "string", stav_ac_ixe = "number", drd = "number", c = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", typ_ag = "number", ixs_fun_akt = "string", rok_dph = "number", mesic_dph = "number", bu_vl = "string", sk_vl = "string", priz_view = "number", ac_ag = "string", ixs_esu = "string", uus = "string", cis_real = "string", ixs_fun_vyriz = "string", int_dok = "number", subrada = "number", esu_txt = "string", ktg_typ_txt = "string",}
	const enum GUctspidDokladyDtoTypeLengths { ixp = 12, lic = 4, popis = 254, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, ixs_typ = 12, ac_ixe = 20, zmenu_prov = 12, ixs_fun_akt = 12, bu_vl = 34, sk_vl = 11, ac_ag = 20, ixs_esu = 12, uus = 10, cis_real = 6, ixs_fun_vyriz = 12, esu_txt = 254, ktg_typ_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GVepsplaDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Vepspla*/
	interface GVepsplaDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**cislo*/
		cislo?: string|null;
		/**cis_plan*/
		cis_plan?: number|null;
		/**ixs_poz*/
		ixs_poz?: string|null;
		/**cis_poz*/
		cis_poz?: string|null;
		/**m_plan*/
		m_plan?: JsonDecimal|null;
		/**m_vz*/
		m_vz?: JsonDecimal|null;
		/**m_sml*/
		m_sml?: JsonDecimal|null;
		/**m_vz_sml*/
		m_vz_sml?: JsonDecimal|null;
		/**m_obj*/
		m_obj?: JsonDecimal|null;
		/**m_obj_sml*/
		m_obj_sml?: JsonDecimal|null;
		/**m_fak*/
		m_fak?: JsonDecimal|null;
		/**m_maj*/
		m_maj?: JsonDecimal|null;
		/**c_plan*/
		c_plan?: JsonDecimal|null;
		/**c_vz*/
		c_vz?: JsonDecimal|null;
		/**c_sml*/
		c_sml?: JsonDecimal|null;
		/**c_vz_sml*/
		c_vz_sml?: JsonDecimal|null;
		/**c_obj*/
		c_obj?: JsonDecimal|null;
		/**c_obj_sml*/
		c_obj_sml?: JsonDecimal|null;
		/**c_fak*/
		c_fak?: JsonDecimal|null;
		/**c_maj*/
		c_maj?: JsonDecimal|null;
		/**skp*/
		skp?: string|null;
		/**mat_cis*/
		mat_cis?: string|null;
		/**mat_cis_nazev*/
		mat_cis_nazev?: string|null;
		/**nazev_skp*/
		nazev_skp?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**skupina_id*/
		skupina_id?: number|null;
		/**drh_id*/
		drh_id?: number|null;
		/**mj*/
		mj?: string|null;
		/**mj_nazev*/
		mj_nazev?: string|null;
		/**vyr_cis*/
		vyr_cis?: string|null;
		/**kod_pol*/
		kod_pol?: string|null;
		/**kod_pol_nazev*/
		kod_pol_nazev?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**nks*/
		nks?: string|null;
		/**nks_zad*/
		nks_zad?: string|null;
		/**duvod_poz*/
		duvod_poz?: number|null;
		/**drh_poz*/
		drh_poz?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**inv_cis*/
		inv_cis?: string|null;
		/**popis*/
		popis?: string|null;
		/**ixs_dup*/
		ixs_dup?: string|null;
		/**ixs_dup_nazev*/
		ixs_dup_nazev?: string|null;
		/**znam*/
		znam?: number|null;
		/**vp_stav*/
		vp_stav?: number|null;
		/**vp_stav_nazev*/
		vp_stav_nazev?: string|null;
		/**rok_vp*/
		rok_vp?: number|null;
		/**Permissions (povolení akcí)*/
		Permissions?: Gordic.Ada.Interface.GVepsplaPermissions|null;
	}
	const enum GVepsplaDtoNames { ico = "ico", rok = "rok", cislo = "cislo", cis_plan = "cis_plan", ixs_poz = "ixs_poz", cis_poz = "cis_poz", m_plan = "m_plan", m_vz = "m_vz", m_sml = "m_sml", m_vz_sml = "m_vz_sml", m_obj = "m_obj", m_obj_sml = "m_obj_sml", m_fak = "m_fak", m_maj = "m_maj", c_plan = "c_plan", c_vz = "c_vz", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_obj = "c_obj", c_obj_sml = "c_obj_sml", c_fak = "c_fak", c_maj = "c_maj", skp = "skp", mat_cis = "mat_cis", mat_cis_nazev = "mat_cis_nazev", nazev_skp = "nazev_skp", nazev = "nazev", skupina_id = "skupina_id", drh_id = "drh_id", mj = "mj", mj_nazev = "mj_nazev", vyr_cis = "vyr_cis", kod_pol = "kod_pol", kod_pol_nazev = "kod_pol_nazev", ucs = "ucs", nks = "nks", nks_zad = "nks_zad", duvod_poz = "duvod_poz", drh_poz = "drh_poz", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", inv_cis = "inv_cis", popis = "popis", ixs_dup = "ixs_dup", ixs_dup_nazev = "ixs_dup_nazev", znam = "znam", vp_stav = "vp_stav", vp_stav_nazev = "vp_stav_nazev", rok_vp = "rok_vp", Permissions = "Permissions",}
	const enum GVepsplaDtoFragments { ico = "*", rok = "*", cislo = "*", cis_plan = "*", ixs_poz = "*", cis_poz = "*", m_plan = "*", m_vz = "*", m_sml = "*", m_vz_sml = "*", m_obj = "*", m_obj_sml = "*", m_fak = "*", m_maj = "*", c_plan = "*", c_vz = "*", c_sml = "*", c_vz_sml = "*", c_obj = "*", c_obj_sml = "*", c_fak = "*", c_maj = "*", skp = "*", mat_cis = "*", mat_cis_nazev = "*", nazev_skp = "*", nazev = "*", skupina_id = "*", drh_id = "*", mj = "*", mj_nazev = "*", vyr_cis = "*", kod_pol = "*", kod_pol_nazev = "*", ucs = "*", nks = "*", nks_zad = "*", duvod_poz = "*", drh_poz = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", inv_cis = "*", popis = "*", ixs_dup = "*", ixs_dup_nazev = "*", znam = "*", vp_stav = "*", vp_stav_nazev = "*", rok_vp = "*", Permissions = "*",}
	const enum GVepsplaDtoTypes { ico = "string", rok = "number", cislo = "string", cis_plan = "number", ixs_poz = "string", cis_poz = "string", m_plan = "JsonDecimal", m_vz = "JsonDecimal", m_sml = "JsonDecimal", m_vz_sml = "JsonDecimal", m_obj = "JsonDecimal", m_obj_sml = "JsonDecimal", m_fak = "JsonDecimal", m_maj = "JsonDecimal", c_plan = "JsonDecimal", c_vz = "JsonDecimal", c_sml = "JsonDecimal", c_vz_sml = "JsonDecimal", c_obj = "JsonDecimal", c_obj_sml = "JsonDecimal", c_fak = "JsonDecimal", c_maj = "JsonDecimal", skp = "string", mat_cis = "string", mat_cis_nazev = "string", nazev_skp = "string", nazev = "string", skupina_id = "number", drh_id = "number", mj = "string", mj_nazev = "string", vyr_cis = "string", kod_pol = "string", kod_pol_nazev = "string", ucs = "string", nks = "string", nks_zad = "string", duvod_poz = "number", drh_poz = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", inv_cis = "string", popis = "string", ixs_dup = "string", ixs_dup_nazev = "string", znam = "number", vp_stav = "number", vp_stav_nazev = "string", rok_vp = "number", Permissions = "Gordic.Ada.Interface.GVepsplaPermissions",}
	const enum GVepsplaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GVepsplaFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO na filtrovani agendovych dokladu*/
	interface GVepsplaFilterDto {
		/**DBCOLUMN:rok*/
		rok?: number|null;
		/**DBCOLUMN:ico*/
		ico?: string|null;
		/**DBCOLUMN:cislo*/
		cislo?: string|null;
		/**DBCOLUMN:SeznamDokladu.ixs_cia*/
		ixs_cia?: string|null;
		/**DBCOLUMN:vp_stav*/
		vp_stav?: GBaseFilter<number>|null;
		/**DBCOLUMN:epospri.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:epospri.rok_do*/
		rok_do?: number|null;
	}
	const enum GVepsplaFilterDtoNames { rok = "rok", ico = "ico", cislo = "cislo", ixs_cia = "ixs_cia", vp_stav = "vp_stav", rok_od = "rok_od", rok_do = "rok_do",}
	const enum GVepsplaFilterDtoFragments { rok = "*", ico = "*", cislo = "*", ixs_cia = "*", vp_stav = "*", rok_od = "*", rok_do = "*",}
	const enum GVepsplaFilterDtoTypes { rok = "number", ico = "string", cislo = "string", ixs_cia = "string", vp_stav = "GBaseFilter<number>", rok_od = "number", rok_do = "number",}
	const enum GVepsplaFilterDtoTypeLengths { ico = 10, cislo = 12, ixs_cia = 12,}
	/**Výčet filtračních kritérií pro filtr seznamu Akcí*/
	const enum FilVepspla {
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**cislo*/
		cislo,
		/**ixs_cia*/
		ixs_cia,
		/**vp_stav*/
		vp_stav,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GVepsplaSuma.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Vepspla*/
	interface GVepsplaSumaDto {
		/**ico*/
		ico?: string|null;
		/**rok*/
		rok?: number|null;
		/**cislo*/
		cislo?: string|null;
		/**rok_vp*/
		rok_vp?: number|null;
		/**c_plan*/
		c_plan?: JsonDecimal|null;
		/**c_fin*/
		c_fin?: JsonDecimal|null;
		/**c_rozdil*/
		c_rozdil?: JsonDecimal|null;
		/**vp_stav*/
		vp_stav?: number|null;
	}
	const enum GVepsplaSumaDtoNames { ico = "ico", rok = "rok", cislo = "cislo", rok_vp = "rok_vp", c_plan = "c_plan", c_fin = "c_fin", c_rozdil = "c_rozdil", vp_stav = "vp_stav",}
	const enum GVepsplaSumaDtoFragments { ico = "*", rok = "*", cislo = "*", rok_vp = "*", c_plan = "*", c_fin = "*", c_rozdil = "*", vp_stav = "*",}
	const enum GVepsplaSumaDtoTypes { ico = "string", rok = "number", cislo = "string", rok_vp = "number", c_plan = "JsonDecimal", c_fin = "JsonDecimal", c_rozdil = "JsonDecimal", vp_stav = "number",}
	const enum GVepsplaSumaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Doklad\Dto\GVfpspriDokladyDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:vfpspri*/
	interface GVfpspriDokladyDto {
		/**DBCOLUMN:vfpspri.ixs_pri*/
		ixs_pri?: string|null;
		/**DBCOLUMN:vfpspri.lic*/
		lic?: string|null;
		/**DBCOLUMN:vfpspri.ico*/
		ico?: string|null;
		/**DBCOLUMN:vfpspri.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:vfpspri.rok_zal*/
		rok_zal?: number|null;
		/**DBCOLUMN:vfpspri.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:vfpspri.ixs_fun_komp*/
		ixs_fun_komp?: string|null;
		/**DBCOLUMN:vfpspri.ac*/
		ac?: string|null;
		/**DBCOLUMN:vfpspri.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:vfpspri.s_dgr*/
		s_dgr?: number|null;
		/**DBCOLUMN:vfpspri.cis_por*/
		cis_por?: number|null;
		/**DBCOLUMN:vfpspri.s_sdg*/
		s_sdg?: number|null;
		/**DBCOLUMN:vfpspri.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:vfpspri.dat_pri*/
		dat_pri?: JsonDate|null;
		/**DBCOLUMN:vfpspri.dat_zdg*/
		dat_zdg?: JsonDate|null;
		/**DBCOLUMN:vfpspri.dat_zad_p*/
		dat_zad_p?: JsonDate|null;
		/**DBCOLUMN:vfpspri.dat_zad_s*/
		dat_zad_s?: JsonDate|null;
		/**DBCOLUMN:vfpspri.dat_uza_p*/
		dat_uza_p?: JsonDate|null;
		/**DBCOLUMN:vfpspri.dat_uza_s*/
		dat_uza_s?: JsonDate|null;
		/**DBCOLUMN:vfpspri.cis_duz*/
		cis_duz?: number|null;
		/**DBCOLUMN:vfpspri.cis_ner*/
		cis_ner?: number|null;
		/**DBCOLUMN:vfpspri.pri_pri*/
		pri_pri?: number|null;
		/**DBCOLUMN:vfpspri.stan_pig*/
		stan_pig?: number|null;
		/**DBCOLUMN:vfpspri.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:vfpspri.cj_dgr*/
		cj_dgr?: string|null;
		/**DBCOLUMN:vfpspri.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:vfpspri.c_plan*/
		c_plan?: JsonDecimal|null;
		/**DBCOLUMN:vfpspri.c_sch*/
		c_sch?: JsonDecimal|null;
		/**DBCOLUMN:vfpspri.c_ps*/
		c_ps?: JsonDecimal|null;
		/**DBCOLUMN:vfpspri.fin_od*/
		fin_od?: number|null;
		/**DBCOLUMN:vfpspri.fin_do*/
		fin_do?: number|null;
		/**DBCOLUMN:vfpspri.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:vfpspri.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:vfpspri.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:vfpspri.typ_fin*/
		typ_fin?: number|null;
		/**DBCOLUMN:vfpspri.cis_prg*/
		cis_prg?: string|null;
		/**DBCOLUMN:vfpspri.dat_p_lhu*/
		dat_p_lhu?: JsonDate|null;
		/**DBCOLUMN:vfpspri.zpus_pd*/
		zpus_pd?: number|null;
		/**DBCOLUMN:vfpspri.proc_max_spol*/
		proc_max_spol?: JsonDecimal|null;
		/**DBCOLUMN:vfpspri.priz_isprofin*/
		priz_isprofin?: number|null;
		/**DBCOLUMN:vfpspri.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:vfpspri.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:vfpspri.typ_dgr*/
		typ_dgr?: string|null;
		/**DBCOLUMN:vfpspri.rezim_pri*/
		rezim_pri?: number|null;
		/**DBCOLUMN:vfpspri.zps_fin*/
		zps_fin?: number|null;
		/**DBCOLUMN:vfpspri.cis_ucl*/
		cis_ucl?: string|null;
		/**DBCOLUMN:vfpspri.dat_sch*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:vfpspri.cislo_usn_dt*/
		cislo_usn_dt?: string|null;
		/**DBCOLUMN:vfpspri.druh_dtp*/
		druh_dtp?: number|null;
		/**DBCOLUMN:vfpspri.ixs_pri_dtp*/
		ixs_pri_dtp?: string|null;
		/**DBCOLUMN:vfpspri.priz_ext*/
		priz_ext?: number|null;
		/**DBCOLUMN:vfpspri.oblast_dt*/
		oblast_dt?: string|null;
		/**DBCOLUMN:vfpspri.typ_phl*/
		typ_phl?: string|null;
		/**DBCOLUMN:rozspid.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:rozspid.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
	}
	const enum GVfpspriDokladyDtoNames { ixs_pri = "ixs_pri", lic = "lic", ico = "ico", ucs = "ucs", rok_zal = "rok_zal", cis_real = "cis_real", ixs_fun_komp = "ixs_fun_komp", ac = "ac", nazev = "nazev", s_dgr = "s_dgr", cis_por = "cis_por", s_sdg = "s_sdg", c = "c", dat_pri = "dat_pri", dat_zdg = "dat_zdg", dat_zad_p = "dat_zad_p", dat_zad_s = "dat_zad_s", dat_uza_p = "dat_uza_p", dat_uza_s = "dat_uza_s", cis_duz = "cis_duz", cis_ner = "cis_ner", pri_pri = "pri_pri", stan_pig = "stan_pig", ixp = "ixp", cj_dgr = "cj_dgr", poznamka = "poznamka", c_plan = "c_plan", c_sch = "c_sch", c_ps = "c_ps", fin_od = "fin_od", fin_do = "fin_do", ixp_den = "ixp_den", ac_ag = "ac_ag", priz_view = "priz_view", typ_fin = "typ_fin", cis_prg = "cis_prg", dat_p_lhu = "dat_p_lhu", zpus_pd = "zpus_pd", proc_max_spol = "proc_max_spol", priz_isprofin = "priz_isprofin", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_dgr = "typ_dgr", rezim_pri = "rezim_pri", zps_fin = "zps_fin", cis_ucl = "cis_ucl", dat_sch = "dat_sch", cislo_usn_dt = "cislo_usn_dt", druh_dtp = "druh_dtp", ixs_pri_dtp = "ixs_pri_dtp", priz_ext = "priz_ext", oblast_dt = "oblast_dt", typ_phl = "typ_phl", esu_txt = "esu_txt", ktg_typ_txt = "ktg_typ_txt",}
	const enum GVfpspriDokladyDtoFragments { ixs_pri = "*", lic = "*", ico = "*", ucs = "*", rok_zal = "*", cis_real = "*", ixs_fun_komp = "*", ac = "*", nazev = "*", s_dgr = "*", cis_por = "*", s_sdg = "*", c = "*", dat_pri = "*", dat_zdg = "*", dat_zad_p = "*", dat_zad_s = "*", dat_uza_p = "*", dat_uza_s = "*", cis_duz = "*", cis_ner = "*", pri_pri = "*", stan_pig = "*", ixp = "*", cj_dgr = "*", poznamka = "*", c_plan = "*", c_sch = "*", c_ps = "*", fin_od = "*", fin_do = "*", ixp_den = "*", ac_ag = "*", priz_view = "*", typ_fin = "*", cis_prg = "*", dat_p_lhu = "*", zpus_pd = "*", proc_max_spol = "*", priz_isprofin = "*", dat_zmena = "*", zmenu_prov = "*", typ_dgr = "*", rezim_pri = "*", zps_fin = "*", cis_ucl = "*", dat_sch = "*", cislo_usn_dt = "*", druh_dtp = "*", ixs_pri_dtp = "*", priz_ext = "*", oblast_dt = "*", typ_phl = "*", esu_txt = "*", ktg_typ_txt = "*",}
	const enum GVfpspriDokladyDtoTypes { ixs_pri = "string", lic = "string", ico = "string", ucs = "string", rok_zal = "number", cis_real = "string", ixs_fun_komp = "string", ac = "string", nazev = "string", s_dgr = "number", cis_por = "number", s_sdg = "number", c = "JsonDecimal", dat_pri = "JsonDate", dat_zdg = "JsonDate", dat_zad_p = "JsonDate", dat_zad_s = "JsonDate", dat_uza_p = "JsonDate", dat_uza_s = "JsonDate", cis_duz = "number", cis_ner = "number", pri_pri = "number", stan_pig = "number", ixp = "string", cj_dgr = "string", poznamka = "string", c_plan = "JsonDecimal", c_sch = "JsonDecimal", c_ps = "JsonDecimal", fin_od = "number", fin_do = "number", ixp_den = "string", ac_ag = "string", priz_view = "number", typ_fin = "number", cis_prg = "string", dat_p_lhu = "JsonDate", zpus_pd = "number", proc_max_spol = "JsonDecimal", priz_isprofin = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_dgr = "string", rezim_pri = "number", zps_fin = "number", cis_ucl = "string", dat_sch = "JsonDate", cislo_usn_dt = "string", druh_dtp = "number", ixs_pri_dtp = "string", priz_ext = "number", oblast_dt = "string", typ_phl = "string", esu_txt = "string", ktg_typ_txt = "string",}
	const enum GVfpspriDokladyDtoTypeLengths { ixs_pri = 12, lic = 4, ico = 10, ucs = 10, cis_real = 6, ixs_fun_komp = 12, ac = 20, nazev = 100, ixp = 12, cj_dgr = 30, poznamka = 254, ixp_den = 12, ac_ag = 20, cis_prg = 20, zmenu_prov = 12, typ_dgr = 10, cis_ucl = 8, cislo_usn_dt = 50, ixs_pri_dtp = 12, oblast_dt = 10, typ_phl = 4, esu_txt = 254, ktg_typ_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GAdaAttachmentDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**GAdaAttachmentDto*/
	interface GAdaAttachmentDto extends Gordic.Wfl.Interface.GAttachmentDto {
		/**Navazane_ISP*/
		Navazane_ISP?: string|null;
	}
	const enum GAdaAttachmentDtoNames { Navazane_ISP = "Navazane_ISP", LastChangeTime = "LastChangeTime", File = "File", Activity = "Activity", Category = "Category", Description = "Description", Podoba = "Podoba", PodobaTxt = "PodobaTxt", Forma = "Forma", FormaTxt = "FormaTxt", PorCisloContainer = "PorCisloContainer", Ixp = "Ixp", Ixs = "Ixs", PorCislo = "PorCislo", PorCisloUser = "PorCisloUser", LastChangeUser = "LastChangeUser", IxsCar = "IxsCar", StUtajId = "StUtajId", StUtajIdTxt = "StUtajIdTxt", Duvod = "Duvod", StUtajIdPosledniDuvod = "StUtajIdPosledniDuvod", IsFavorite = "IsFavorite", PageCount = "PageCount", Permissions = "Permissions", Id = "Id", p_Id = "p_Id", Name = "Name",}
	const enum GAdaAttachmentDtoFragments { Navazane_ISP = "*", LastChangeTime = "*", File = "*", Activity = "*", Category = "*", Description = "*", Podoba = "*", PodobaTxt = "*", Forma = "*", FormaTxt = "*", PorCisloContainer = "*", Ixp = "*", Ixs = "*", PorCislo = "*", PorCisloUser = "*", LastChangeUser = "*", IxsCar = "*", StUtajId = "*", StUtajIdTxt = "*", Duvod = "*", StUtajIdPosledniDuvod = "*", IsFavorite = "*", PageCount = "*", Permissions = "*", Id = "*", p_Id = "*", Name = "*",}
	const enum GAdaAttachmentDtoTypes { Navazane_ISP = "string", LastChangeTime = "JsonDate", File = "Gordic.Wfl.Interface.GAttachmentFileDto", Activity = "number", Category = "Gordic.Wfl.Interface.GAttachmentCategoriesDto", Description = "string", Podoba = "number", PodobaTxt = "string", Forma = "number", FormaTxt = "string", PorCisloContainer = "number", Ixp = "string", Ixs = "string", PorCislo = "number", PorCisloUser = "number", LastChangeUser = "string", IxsCar = "string", StUtajId = "number", StUtajIdTxt = "string", Duvod = "string", StUtajIdPosledniDuvod = "string", IsFavorite = "boolean", PageCount = "number", Permissions = "number", Id = "string", p_Id = "string", Name = "string",}
	const enum GAdaAttachmentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GAdaFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Filtr pro dvou-radkovy filtr nad gridem*/
	interface GAdaFilterDto extends Gordic.Eko.Interface.GCfuTopoFilterDto {
		/**drd_msk*/
		drd_msk?: string|null;
		/**rok*/
		rok?: GIntervalDto<number>|null;
		/**mesic*/
		mesic?: GIntervalDto<number>|null;
		/**den*/
		den?: GIntervalDto<number>|null;
		/**Doklad*/
		ac?: GIntervalDto<string>|null;
		/**Popis dokladu*/
		pdok?: string|null;
		/**Popis dokladu*/
		popis?: string|null;
		/**MD*/
		c0?: GIntervalDto<JsonDecimal>|null;
		/**Dal*/
		c1?: GIntervalDto<JsonDecimal>|null;
		/**???*/
		c2?: GIntervalDto<JsonDecimal>|null;
		/**MD - Dal*/
		c0c1?: GIntervalDto<JsonDecimal>|null;
		/**AS MD*/
		c0_as?: GIntervalDto<JsonDecimal>|null;
		/**AS DAL*/
		c1_as?: GIntervalDto<JsonDecimal>|null;
		/**AS P-V*/
		c0c1_as?: GIntervalDto<JsonDecimal>|null;
		/**ROK DPH*/
		rok_uej?: GIntervalDto<number>|null;
		/**Mesic DPH*/
		mesic_uej?: GIntervalDto<number>|null;
		/**ZD*/
		zd?: GIntervalDto<number>|null;
		/**PID*/
		ixp?: Gordic.Ada.Interface.GAdaFilterDto.GEkoIxpFilterDto|null;
		/**PID Primarni*/
		ixp_prim?: string|null;
		/**Agendove cislo*/
		ac_ag?: GIntervalDto<string>|null;
		/**Datum zmeny*/
		dat_zmena?: GIntervalDto<JsonDate>|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**ixs_ico*/
		ixs_esu?: string|null;
		/**esu_ico*/
		esu_ico?: string|null;
		/**esu_rc*/
		esu_rc?: string|null;
		/**id_hdr_ris*/
		id_hdr_ris?: GIntervalDto<string>|null;
		/**ixs_msk*/
		ixs_msk?: string|null;
		/**Zmenu prov.*/
		nazev_rf?: string|null;
		/**typ dokuemntu*/
		ixs_typ?: string|null;
		/**generated*/
		kc0?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		kc1?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		kc2?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		nazev?: string|null;
		/**generated*/
		radek?: number|null;
		/**generated*/
		sc0?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc1?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc2?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc3?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc4?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc5?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc6?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc7?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc8?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		sc9?: GIntervalDto<JsonDecimal>|null;
		/**generated*/
		radek_hdr?: GIntervalDto<number>|null;
		/**generated*/
		te0?: GIntervalDto<string>|null;
		/**generated*/
		te1?: GIntervalDto<string>|null;
		/**generated*/
		te2?: GIntervalDto<string>|null;
		/**generated*/
		te3?: GIntervalDto<string>|null;
		/**generated*/
		te4?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uea*/
		uea?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueb*/
		ueb?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uec*/
		uec?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ued*/
		ued?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uee*/
		uee?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uef*/
		uef?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueg*/
		ueg?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.ueh*/
		ueh?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uei*/
		uei?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uej*/
		uej?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uel*/
		uek?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uel*/
		uel?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uem*/
		uem?: GIntervalDto<string>|null;
		/**DBCOLUMN:SeznamAat.uen*/
		uen?: GIntervalDto<string>|null;
		/**generated*/
		te5?: GIntervalDto<string>|null;
		/**generated*/
		te6?: GIntervalDto<string>|null;
		/**generated*/
		te7?: GIntervalDto<string>|null;
		/**generated*/
		te8?: GIntervalDto<string>|null;
		/**generated*/
		te9?: GIntervalDto<string>|null;
		/**Status*/
		status?: boolean|null;
		/**
		*     Priznak blokace
		*     
		*/
		priz_blok?: number|null;
		/**MD*/
		c_navrh?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_sl?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_cerpani_rs?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_ru?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_cerpani_ru?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_14?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_mrz?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_act?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_vz?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_vz_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj_sml?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_obj_blk?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_fak?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_rsm?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_disp?: GIntervalDto<JsonDecimal>|null;
		/**MD*/
		c_uct?: GIntervalDto<JsonDecimal>|null;
		druh_char?: GIntervalDto<number>|null;
		priz_char?: GIntervalDto<number>|null;
		/**
		*     Par 1
		*     
		*/
		value0?: GIntervalDto<string>|null;
		/**
		*     Par 2
		*     
		*/
		value1?: GIntervalDto<string>|null;
	}
	const enum GAdaFilterDtoNames { drd_msk = "drd_msk", rok = "rok", mesic = "mesic", den = "den", ac = "ac", pdok = "pdok", popis = "popis", c0 = "c0", c1 = "c1", c2 = "c2", c0c1 = "c0c1", c0_as = "c0_as", c1_as = "c1_as", c0c1_as = "c0c1_as", rok_uej = "rok_uej", mesic_uej = "mesic_uej", zd = "zd", ixp = "ixp", ixp_prim = "ixp_prim", ac_ag = "ac_ag", dat_zmena = "dat_zmena", typ_ag = "typ_ag", esu_txt = "esu_txt", ixs_esu = "ixs_esu", esu_ico = "esu_ico", esu_rc = "esu_rc", id_hdr_ris = "id_hdr_ris", ixs_msk = "ixs_msk", nazev_rf = "nazev_rf", ixs_typ = "ixs_typ", kc0 = "kc0", kc1 = "kc1", kc2 = "kc2", nazev = "nazev", radek = "radek", sc0 = "sc0", sc1 = "sc1", sc2 = "sc2", sc3 = "sc3", sc4 = "sc4", sc5 = "sc5", sc6 = "sc6", sc7 = "sc7", sc8 = "sc8", sc9 = "sc9", radek_hdr = "radek_hdr", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", status = "status", priz_blok = "priz_blok", c_navrh = "c_navrh", c_sl = "c_sl", c_cerpani_rs = "c_cerpani_rs", c_ru = "c_ru", c_cerpani_ru = "c_cerpani_ru", c_14 = "c_14", c_mrz = "c_mrz", c_act = "c_act", c_vz = "c_vz", c_sml = "c_sml", c_vz_sml = "c_vz_sml", c_obj = "c_obj", c_obj_sml = "c_obj_sml", c_obj_blk = "c_obj_blk", c_fak = "c_fak", c_rsm = "c_rsm", c_disp = "c_disp", c_uct = "c_uct", druh_char = "druh_char", priz_char = "priz_char", value0 = "value0", value1 = "value1", ico = "ico", ucs = "ucs", uus = "uus", nks = "nks", cfu = "cfu",}
	const enum GAdaFilterDtoFragments { drd_msk = "*", rok = "*", mesic = "*", den = "*", ac = "*", pdok = "*", popis = "*", c0 = "*", c1 = "*", c2 = "*", c0c1 = "*", c0_as = "*", c1_as = "*", c0c1_as = "*", rok_uej = "*", mesic_uej = "*", zd = "*", ixp = "*", ixp_prim = "*", ac_ag = "*", dat_zmena = "*", typ_ag = "*", esu_txt = "*", ixs_esu = "*", esu_ico = "*", esu_rc = "*", id_hdr_ris = "*", ixs_msk = "*", nazev_rf = "*", ixs_typ = "*", kc0 = "*", kc1 = "*", kc2 = "*", nazev = "*", radek = "*", sc0 = "*", sc1 = "*", sc2 = "*", sc3 = "*", sc4 = "*", sc5 = "*", sc6 = "*", sc7 = "*", sc8 = "*", sc9 = "*", radek_hdr = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", status = "*", priz_blok = "*", c_navrh = "*", c_sl = "*", c_cerpani_rs = "*", c_ru = "*", c_cerpani_ru = "*", c_14 = "*", c_mrz = "*", c_act = "*", c_vz = "*", c_sml = "*", c_vz_sml = "*", c_obj = "*", c_obj_sml = "*", c_obj_blk = "*", c_fak = "*", c_rsm = "*", c_disp = "*", c_uct = "*", druh_char = "*", priz_char = "*", value0 = "*", value1 = "*", ico = "*", ucs = "*", uus = "*", nks = "*", cfu = "*",}
	const enum GAdaFilterDtoTypes { drd_msk = "string", rok = "GIntervalDto<number>", mesic = "GIntervalDto<number>", den = "GIntervalDto<number>", ac = "GIntervalDto<string>", pdok = "string", popis = "string", c0 = "GIntervalDto<JsonDecimal>", c1 = "GIntervalDto<JsonDecimal>", c2 = "GIntervalDto<JsonDecimal>", c0c1 = "GIntervalDto<JsonDecimal>", c0_as = "GIntervalDto<JsonDecimal>", c1_as = "GIntervalDto<JsonDecimal>", c0c1_as = "GIntervalDto<JsonDecimal>", rok_uej = "GIntervalDto<number>", mesic_uej = "GIntervalDto<number>", zd = "GIntervalDto<number>", ixp = "Gordic.Ada.Interface.GAdaFilterDto.GEkoIxpFilterDto", ixp_prim = "string", ac_ag = "GIntervalDto<string>", dat_zmena = "GIntervalDto<JsonDate>", typ_ag = "number", esu_txt = "string", ixs_esu = "string", esu_ico = "string", esu_rc = "string", id_hdr_ris = "GIntervalDto<string>", ixs_msk = "string", nazev_rf = "string", ixs_typ = "string", kc0 = "GIntervalDto<JsonDecimal>", kc1 = "GIntervalDto<JsonDecimal>", kc2 = "GIntervalDto<JsonDecimal>", nazev = "string", radek = "number", sc0 = "GIntervalDto<JsonDecimal>", sc1 = "GIntervalDto<JsonDecimal>", sc2 = "GIntervalDto<JsonDecimal>", sc3 = "GIntervalDto<JsonDecimal>", sc4 = "GIntervalDto<JsonDecimal>", sc5 = "GIntervalDto<JsonDecimal>", sc6 = "GIntervalDto<JsonDecimal>", sc7 = "GIntervalDto<JsonDecimal>", sc8 = "GIntervalDto<JsonDecimal>", sc9 = "GIntervalDto<JsonDecimal>", radek_hdr = "GIntervalDto<number>", te0 = "GIntervalDto<string>", te1 = "GIntervalDto<string>", te2 = "GIntervalDto<string>", te3 = "GIntervalDto<string>", te4 = "GIntervalDto<string>", uea = "GIntervalDto<string>", ueb = "GIntervalDto<string>", uec = "GIntervalDto<string>", ued = "GIntervalDto<string>", uee = "GIntervalDto<string>", uef = "GIntervalDto<string>", ueg = "GIntervalDto<string>", ueh = "GIntervalDto<string>", uei = "GIntervalDto<string>", uej = "GIntervalDto<string>", uek = "GIntervalDto<string>", uel = "GIntervalDto<string>", uem = "GIntervalDto<string>", uen = "GIntervalDto<string>", te5 = "GIntervalDto<string>", te6 = "GIntervalDto<string>", te7 = "GIntervalDto<string>", te8 = "GIntervalDto<string>", te9 = "GIntervalDto<string>", status = "boolean", priz_blok = "number", c_navrh = "GIntervalDto<JsonDecimal>", c_sl = "GIntervalDto<JsonDecimal>", c_cerpani_rs = "GIntervalDto<JsonDecimal>", c_ru = "GIntervalDto<JsonDecimal>", c_cerpani_ru = "GIntervalDto<JsonDecimal>", c_14 = "GIntervalDto<JsonDecimal>", c_mrz = "GIntervalDto<JsonDecimal>", c_act = "GIntervalDto<JsonDecimal>", c_vz = "GIntervalDto<JsonDecimal>", c_sml = "GIntervalDto<JsonDecimal>", c_vz_sml = "GIntervalDto<JsonDecimal>", c_obj = "GIntervalDto<JsonDecimal>", c_obj_sml = "GIntervalDto<JsonDecimal>", c_obj_blk = "GIntervalDto<JsonDecimal>", c_fak = "GIntervalDto<JsonDecimal>", c_rsm = "GIntervalDto<JsonDecimal>", c_disp = "GIntervalDto<JsonDecimal>", c_uct = "GIntervalDto<JsonDecimal>", druh_char = "GIntervalDto<number>", priz_char = "GIntervalDto<number>", value0 = "GIntervalDto<string>", value1 = "GIntervalDto<string>", ico = "GIntervalDto<string>", ucs = "GIntervalDto<string>", uus = "GIntervalDto<string>", nks = "GIntervalDto<string>", cfu = "ObjectLiteral<GIntervalDto<string>>",}
	const enum GAdaFilterDtoTypeLengths {}
}
declare namespace Gordic.Ada.Interface.GAdaFilterDto {
	/**Pomocna trida pro formular Gordic.Filter.ixp*/
	interface GEkoIxpFilterDto {
		/**PID*/
		ixp?: string|null;
		/**PID souvisejici*/
		ixp_s?: boolean|null;
	}
	const enum GEkoIxpFilterDtoNames { ixp = "ixp", ixp_s = "ixp_s",}
	const enum GEkoIxpFilterDtoFragments { ixp = "*", ixp_s = "*",}
	const enum GEkoIxpFilterDtoTypes { ixp = "string", ixp_s = "boolean",}
	const enum GEkoIxpFilterDtoTypeLengths {}
}
declare namespace Gordic.Ada.Interface {
	/**DTO elementu*/
	interface GAdaElementsDto {
		/**Jednotlive elementy*/
		filters?: Gordic.Ada.Interface.GAdaFilterDto[]|null;
	}
	const enum GAdaElementsDtoNames { filters = "filters",}
	const enum GAdaElementsDtoFragments { filters = "*",}
	const enum GAdaElementsDtoTypes { filters = "Gordic.Ada.Interface.GAdaFilterDto[]",}
	const enum GAdaElementsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GEkosrarDto.d.ts 

declare namespace Gordic.Ada.Interface {
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

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GEvzcspeDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:evzcspe*/
	interface GEvzcspeDto {
		/**DBCOLUMN:evzcspe.schv_spec*/
		schv_spec?: number|null;
		/**DBCOLUMN:evzcspe.schv_spec_txt*/
		schv_spec_txt?: string|null;
		/**DBCOLUMN:evzcspe.typ_org*/
		k_v?: number|null;
	}
	const enum GEvzcspeDtoNames { schv_spec = "schv_spec", schv_spec_txt = "schv_spec_txt", k_v = "k_v",}
	const enum GEvzcspeDtoFragments { schv_spec = "*", schv_spec_txt = "*", k_v = "*",}
	const enum GEvzcspeDtoTypes { schv_spec = "number", schv_spec_txt = "string", k_v = "number",}
	const enum GEvzcspeDtoTypeLengths { schv_spec_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GGincaktADADto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:gincakt*/
	interface GGincaktADADto {
		/**DBCOLUMN:gincakt.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekosrar.aktivita_txt*/
		aktivita_txt?: string|null;
	}
	const enum GGincaktADADtoNames { aktivita = "aktivita", aktivita_txt = "aktivita_txt",}
	const enum GGincaktADADtoFragments { aktivita = "*", aktivita_txt = "*",}
	const enum GGincaktADADtoTypes { aktivita = "number", aktivita_txt = "string",}
	const enum GGincaktADADtoTypeLengths { aktivita_txt = 120,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GISPPrilohaDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:wflsesx*/
	interface GISPPrilohaDto {
		/**DBCOLUMN:wflsesx.ixs*/
		ixs?: string|null;
		/**DBCOLUMN:wflsesx.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:popis*/
		popis?: string|null;
		/**DBCOLUMN:popis_dms*/
		popis_dms?: string|null;
	}
	const enum GISPPrilohaDtoNames { ixs = "ixs", ixb = "ixb", popis = "popis", popis_dms = "popis_dms",}
	const enum GISPPrilohaDtoFragments { ixs = "*", ixb = "*", popis = "*", popis_dms = "*",}
	const enum GISPPrilohaDtoTypes { ixs = "string", ixb = "string", popis = "string", popis_dms = "string",}
	const enum GISPPrilohaDtoTypeLengths { ixs = 12, ixb = 12, popis = 254, popis_dms = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GMajsmajADADto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:gincakt*/
	interface GMajsmajADADto {
		/**DBCOLUMN:matsmaj.ixs_maj*/
		ixs_maj?: string|null;
		/**DBCOLUMN:matsmaj.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:matsmaj.nazev*/
		nazev?: string|null;
	}
	const enum GMajsmajADADtoNames { ixs_maj = "ixs_maj", inv_cis = "inv_cis", nazev = "nazev",}
	const enum GMajsmajADADtoFragments { ixs_maj = "*", inv_cis = "*", nazev = "*",}
	const enum GMajsmajADADtoTypes { ixs_maj = "string", inv_cis = "string", nazev = "string",}
	const enum GMajsmajADADtoTypeLengths { ixs_maj = 12, inv_cis = 12, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GMatskcmADADto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:gincakt*/
	interface GMatskcmADADto {
		/**DBCOLUMN:matskcm.idk*/
		idk?: string|null;
		/**DBCOLUMN:matskcm.nazev*/
		nazev?: string|null;
	}
	const enum GMatskcmADADtoNames { idk = "idk", nazev = "nazev",}
	const enum GMatskcmADADtoFragments { idk = "*", nazev = "*",}
	const enum GMatskcmADADtoTypes { idk = "string", nazev = "string",}
	const enum GMatskcmADADtoTypeLengths { idk = 13, nazev = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvcpskDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvcpsk*/
	interface GSrvcpskDto {
		/**skp_akce*/
		skp_akce?: string|null;
		/**psk_akce*/
		psk_akce?: string|null;
		/**psk_akce_txt*/
		psk_akce_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
		/**skp_akce_txt*/
		skp_akce_txt?: string|null;
	}
	const enum GSrvcpskDtoNames { skp_akce = "skp_akce", psk_akce = "psk_akce", psk_akce_txt = "psk_akce_txt", k_v = "k_v", k_s = "k_s", skp_akce_txt = "skp_akce_txt",}
	const enum GSrvcpskDtoFragments { skp_akce = "main", psk_akce = "main", psk_akce_txt = "main", k_v = "main", k_s = "main", skp_akce_txt = "skp_akce_txt",}
	const enum GSrvcpskDtoTypes { skp_akce = "string", psk_akce = "string", psk_akce_txt = "string", k_v = "number", k_s = "string", skp_akce_txt = "string",}
	const enum GSrvcpskDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvcpskFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**filtr DTO pro srvsxpf*/
	interface GSrvcpskFilterDto {
		/**skp_akce*/
		skp_akce?: string|null;
		/**psk_akce*/
		psk_akce?: string|null;
	}
	const enum GSrvcpskFilterDtoNames { skp_akce = "skp_akce", psk_akce = "psk_akce",}
	const enum GSrvcpskFilterDtoFragments { skp_akce = "*", psk_akce = "*",}
	const enum GSrvcpskFilterDtoTypes { skp_akce = "string", psk_akce = "string",}
	const enum GSrvcpskFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvcsazDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvcsaz*/
	interface GSrvcsazDto {
		/**Stav az*/
		stav_az?: number|null;
		/**Stav az txt*/
		stav_az_txt?: string|null;
		/**k v*/
		k_v?: number|null;
		/**k s*/
		k_s?: string|null;
	}
	const enum GSrvcsazDtoNames { stav_az = "stav_az", stav_az_txt = "stav_az_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSrvcsazDtoFragments { stav_az = "main", stav_az_txt = "main", k_v = "main", k_s = "main",}
	const enum GSrvcsazDtoTypes { stav_az = "number", stav_az_txt = "string", k_v = "number", k_s = "string",}
	const enum GSrvcsazDtoTypeLengths { stav_az_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvcskpDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvcskp*/
	interface GSrvcskpDto {
		/**skp_akce*/
		skp_akce?: string|null;
		/**skp_akce_txt*/
		skp_akce_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
	}
	const enum GSrvcskpDtoNames { skp_akce = "skp_akce", skp_akce_txt = "skp_akce_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSrvcskpDtoFragments { skp_akce = "main", skp_akce_txt = "main", k_v = "main", k_s = "main",}
	const enum GSrvcskpDtoTypes { skp_akce = "string", skp_akce_txt = "string", k_v = "number", k_s = "string",}
	const enum GSrvcskpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvcsreDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvcsre*/
	interface GSrvcsreDto {
		/**DBCOLUMN:srvcsre.stav_real*/
		stav_real?: number|null;
		/**DBCOLUMN:srvcsre.stav_real_txt*/
		stav_real_txt?: string|null;
		/**DBCOLUMN:srvcsre.stav_akce*/
		stav_akce?: number|null;
		/**DBCOLUMN:srvcsre.k_v*/
		k_v?: number|null;
	}
	const enum GSrvcsreDtoNames { stav_real = "stav_real", stav_real_txt = "stav_real_txt", stav_akce = "stav_akce", k_v = "k_v",}
	const enum GSrvcsreDtoFragments { stav_real = "*", stav_real_txt = "*", stav_akce = "*", k_v = "*",}
	const enum GSrvcsreDtoTypes { stav_real = "number", stav_real_txt = "string", stav_akce = "number", k_v = "number",}
	const enum GSrvcsreDtoTypeLengths { stav_real_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvcstzDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Datový objekt popisující Seznam rkai pro přípravu.*/
	interface GSrvcstzDto {
		/**Stav rozpis.*/
		stav_rozpis?: number|null;
		/**Stav rozpis txt.*/
		stav_rozpis_txt?: string|null;
		/**K v.*/
		k_v?: number|null;
		/**K s.*/
		k_s?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GSrvcstzDtoNames { stav_rozpis = "stav_rozpis", stav_rozpis_txt = "stav_rozpis_txt", k_v = "k_v", k_s = "k_s", pocet = "pocet",}
	const enum GSrvcstzDtoFragments { stav_rozpis = "main", stav_rozpis_txt = "main", k_v = "main", k_s = "main", pocet = "main",}
	const enum GSrvcstzDtoTypes { stav_rozpis = "number", stav_rozpis_txt = "string", k_v = "number", k_s = "string", pocet = "number",}
	const enum GSrvcstzDtoTypeLengths { stav_rozpis_txt = 50, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvctasDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvctas*/
	interface GSrvctasDto {
		/**Typ akce sum*/
		typ_akce_sum?: number|null;
		/**Typ akce sum txt*/
		typ_akce_sum_txt?: string|null;
		/**k v*/
		k_v?: number|null;
		/**k s*/
		k_s?: string|null;
	}
	const enum GSrvctasDtoNames { typ_akce_sum = "typ_akce_sum", typ_akce_sum_txt = "typ_akce_sum_txt", k_v = "k_v", k_s = "k_s",}
	const enum GSrvctasDtoFragments { typ_akce_sum = "main", typ_akce_sum_txt = "main", k_v = "main", k_s = "main",}
	const enum GSrvctasDtoTypes { typ_akce_sum = "number", typ_akce_sum_txt = "string", k_v = "number", k_s = "string",}
	const enum GSrvctasDtoTypeLengths { typ_akce_sum_txt = 254, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GsrvctvaDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvstip*/
	interface GSrvctvaDto {
		/**DBCOLUMN:srvctva.typ_vzb	ixs_prr*/
		typ_vzb?: number|null;
		/**DBCOLUMN:srvctva.typ_vzb_txt*/
		typ_vzb_txt?: string|null;
	}
	const enum GSrvctvaDtoNames { typ_vzb = "typ_vzb", typ_vzb_txt = "typ_vzb_txt",}
	const enum GSrvctvaDtoFragments { typ_vzb = "*", typ_vzb_txt = "*",}
	const enum GSrvctvaDtoTypes { typ_vzb = "number", typ_vzb_txt = "string",}
	const enum GSrvctvaDtoTypeLengths { typ_vzb_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvdlimDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Datový objekt popisující Seznam rkai pro přípravu.*/
	interface GSrvdlimDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Id tzd.*/
		id_tzd?: string|null;
		/**Id vyb.*/
		id_vyb?: string|null;
		/**Id eds.*/
		id_eds?: string|null;
		/**Rok lim.*/
		rok_lim?: number|null;
		/**C limit.*/
		c_limit?: JsonDecimal|null;
		/**C limit vaz.*/
		c_limit_vaz?: JsonDecimal|null;
		/**C limit nevaz.*/
		c_limit_nevaz?: JsonDecimal|null;
		/**c_mozno_zaplanovat*/
		c_mozno_zaplanovat?: JsonDecimal|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Id tzd.*/
		nazev_tzd?: string|null;
		/**Id vyb.*/
		nazev_vyb?: string|null;
		/**Id eds.*/
		nazev_eds?: string|null;
		/**jsem_spravce.*/
		jsem_spravce?: number|null;
		/**DBCOLUMN:SeznamDokladu.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**operace*/
		operace?: number|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GSrvdlimDtoNames { ico = "ico", rok = "rok", id_tzd = "id_tzd", id_vyb = "id_vyb", id_eds = "id_eds", rok_lim = "rok_lim", c_limit = "c_limit", c_limit_vaz = "c_limit_vaz", c_limit_nevaz = "c_limit_nevaz", c_mozno_zaplanovat = "c_mozno_zaplanovat", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_tzd = "nazev_tzd", nazev_vyb = "nazev_vyb", nazev_eds = "nazev_eds", jsem_spravce = "jsem_spravce", zmenu_prov_txt = "zmenu_prov_txt", operace = "operace", pocet = "pocet",}
	const enum GSrvdlimDtoFragments { ico = "main", rok = "main", id_tzd = "main", id_vyb = "main", id_eds = "main", rok_lim = "main", c_limit = "main", c_limit_vaz = "main", c_limit_nevaz = "main", c_mozno_zaplanovat = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", nazev_tzd = "main", nazev_vyb = "main", nazev_eds = "main", jsem_spravce = "main", zmenu_prov_txt = "main", operace = "main", pocet = "main",}
	const enum GSrvdlimDtoTypes { ico = "string", rok = "number", id_tzd = "string", id_vyb = "string", id_eds = "string", rok_lim = "number", c_limit = "JsonDecimal", c_limit_vaz = "JsonDecimal", c_limit_nevaz = "JsonDecimal", c_mozno_zaplanovat = "JsonDecimal", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_tzd = "string", nazev_vyb = "string", nazev_eds = "string", jsem_spravce = "number", zmenu_prov_txt = "string", operace = "number", pocet = "number",}
	const enum GSrvdlimDtoTypeLengths { ico = 10, id_tzd = 20, id_vyb = 20, id_eds = 63, zmenu_prov = 12, zmenu_prov_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvscspDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvscsp*/
	interface GSrvscspDto {
		/**ixs_csp*/
		ixs_csp?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**nazev_skp*/
		nazev_skp?: string|null;
		/**zkratka_skp*/
		zkratka_skp?: string|null;
		/**delka_skp*/
		delka_skp?: number|null;
		/**nazev_psk*/
		nazev_psk?: string|null;
		/**zkratka_psk*/
		zkratka_psk?: string|null;
		/**delka_psk*/
		delka_psk?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSrvscspDtoNames { ixs_csp = "ixs_csp", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", nazev_skp = "nazev_skp", zkratka_skp = "zkratka_skp", delka_skp = "delka_skp", nazev_psk = "nazev_psk", zkratka_psk = "zkratka_psk", delka_psk = "delka_psk", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvscspDtoFragments { ixs_csp = "main", nazev = "main", zkratka = "main", poznamka = "main", nazev_skp = "main", zkratka_skp = "main", delka_skp = "main", nazev_psk = "main", zkratka_psk = "main", delka_psk = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GSrvscspDtoTypes { ixs_csp = "string", nazev = "string", zkratka = "string", poznamka = "string", nazev_skp = "string", zkratka_skp = "string", delka_skp = "number", nazev_psk = "string", zkratka_psk = "string", delka_psk = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvscspDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsddeDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvsdde*/
	interface GSrvsddeDto {
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**ixs_pla*/
		ixs_pla?: string|null;
		/**subrada*/
		subrada?: number|null;
		/**nazev*/
		nazev?: string|null;
		/**maska*/
		maska?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**cislo_od*/
		cislo_od?: string|null;
		/**cislo_do*/
		cislo_do?: string|null;
	}
	const enum GSrvsddeDtoNames { rok = "rok", ico = "ico", ixs_pla = "ixs_pla", subrada = "subrada", nazev = "nazev", maska = "maska", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cislo_od = "cislo_od", cislo_do = "cislo_do",}
	const enum GSrvsddeDtoFragments { rok = "main", ico = "main", ixs_pla = "main", subrada = "main", nazev = "main", maska = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", cislo_od = "main", cislo_do = "main",}
	const enum GSrvsddeDtoTypes { rok = "number", ico = "string", ixs_pla = "string", subrada = "number", nazev = "string", maska = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cislo_od = "string", cislo_do = "string",}
	const enum GSrvsddeDtoTypeLengths { ico = 10, ixs_pla = 12, nazev = 50, maska = 50, zmenu_prov = 12, cislo_od = 16, cislo_do = 16,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsmsa.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Datový objekt popisující Seznam ADA konfigurace.*/
	interface GSrvsmsaDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok od.*/
		rok_od?: number|null;
		/**Ktg akce.*/
		ktg_akce?: number|null;
		/**Te1 msk.*/
		te1_msk?: string|null;
		/**Rok do.*/
		rok_do?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Ktg_akce_txt.*/
		ktg_akce_txt?: string|null;
		/**zmenu_prov_txt.*/
		zmenu_prov_txt?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GSrvsmsaDtoNames { ico = "ico", rok_od = "rok_od", ktg_akce = "ktg_akce", te1_msk = "te1_msk", rok_do = "rok_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ktg_akce_txt = "ktg_akce_txt", zmenu_prov_txt = "zmenu_prov_txt", pocet = "pocet",}
	const enum GSrvsmsaDtoFragments { ico = "main", rok_od = "main", ktg_akce = "main", te1_msk = "main", rok_do = "main", dat_zmena = "main", zmenu_prov = "main", ktg_akce_txt = "ktg_akce_txt", zmenu_prov_txt = "zmenu_prov_txt", pocet = "main",}
	const enum GSrvsmsaDtoTypes { ico = "string", rok_od = "number", ktg_akce = "number", te1_msk = "string", rok_do = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ktg_akce_txt = "string", zmenu_prov_txt = "string", pocet = "number",}
	const enum GSrvsmsaDtoTypeLengths { ico = 10, te1_msk = 16, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsoblDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Datový objekt popisující Seznam rkai pro přípravu.*/
	interface GSrvsoblDto {
		/**Ičo.*/
		ico?: string|null;
		/**Rok.*/
		rok?: number|null;
		/**Id tzd.*/
		id_tzd?: string|null;
		/**Id vyb.*/
		id_vyb?: string|null;
		/**Id eds.*/
		id_eds?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Id tzd.*/
		nazev_tzd?: string|null;
		/**Id vyb.*/
		nazev_vyb?: string|null;
		/**Id eds.*/
		nazev_eds?: string|null;
		/**jsem_spravce.*/
		jsem_spravce?: number|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GSrvsoblDtoNames { ico = "ico", rok = "rok", id_tzd = "id_tzd", id_vyb = "id_vyb", id_eds = "id_eds", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_tzd = "nazev_tzd", nazev_vyb = "nazev_vyb", nazev_eds = "nazev_eds", jsem_spravce = "jsem_spravce", pocet = "pocet",}
	const enum GSrvsoblDtoFragments { ico = "main", rok = "main", id_tzd = "main", id_vyb = "main", id_eds = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", nazev_tzd = "main", nazev_vyb = "main", nazev_eds = "main", jsem_spravce = "main", pocet = "main",}
	const enum GSrvsoblDtoTypes { ico = "string", rok = "number", id_tzd = "string", id_vyb = "string", id_eds = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_tzd = "string", nazev_vyb = "string", nazev_eds = "string", jsem_spravce = "number", pocet = "number",}
	const enum GSrvsoblDtoTypeLengths { ico = 10, id_tzd = 20, id_vyb = 20, id_eds = 63, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsplaDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvspla*/
	interface GSrvsplaDto extends Gordic.Eko.Interface.GEkosdenDto {
		/**ixs_pla*/
		ixs_pla?: string|null;
		/**ico*/
		ico?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**ktg_akce*/
		ktg_akce?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**cpps_msk*/
		cpps_msk?: string|null;
		/**ixp_den_old*/
		ixp_den_old?: string|null;
		/**priz_az_def*/
		priz_az_def?: number|null;
		/**priz_gen_cis*/
		priz_gen_cis?: number|null;
		/**ixs_csp*/
		ixs_csp?: string|null;
		/**priz_ram_doh*/
		priz_ram_doh?: number|null;
		/**ixs_prr_def*/
		ixs_prr_def?: string|null;
		/**DBCOLUMN:SeznamDokladu.pocet_prr*/
		pocet_prr?: number|null;
		/**ixs_csp_txt*/
		ixs_csp_txt?: string|null;
		/**ktg_akce_txt*/
		ktg_akce_txt?: string|null;
	}
	const enum GSrvsplaDtoNames { ixs_pla = "ixs_pla", ico = "ico", poznamka = "poznamka", ktg_akce = "ktg_akce", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cpps_msk = "cpps_msk", ixp_den_old = "ixp_den_old", priz_az_def = "priz_az_def", priz_gen_cis = "priz_gen_cis", ixs_csp = "ixs_csp", priz_ram_doh = "priz_ram_doh", ixs_prr_def = "ixs_prr_def", pocet_prr = "pocet_prr", ixs_csp_txt = "ixs_csp_txt", ktg_akce_txt = "ktg_akce_txt", ixp_den = "ixp_den", aktivita = "aktivita", nazev = "nazev", rok = "rok", prefix = "prefix", suffix = "suffix", ktg_den = "ktg_den", typ_den = "typ_den", zkratka = "zkratka", subrada = "subrada", akt_subrady = "akt_subrady", ktg_den_txt = "ktg_den_txt", akt_subrady_txt = "akt_subrady_txt", typ_ag = "typ_ag", ixs_vpk = "ixs_vpk",}
	const enum GSrvsplaDtoFragments { ixs_pla = "main", ico = "main", poznamka = "main", ktg_akce = "main", dat_zmena = "main", zmenu_prov = "main", cpps_msk = "main", ixp_den_old = "main", priz_az_def = "main", priz_gen_cis = "main", ixs_csp = "main", priz_ram_doh = "main", ixs_prr_def = "main", pocet_prr = "*", ixs_csp_txt = "ixs_csp_txt", ktg_akce_txt = "ktg_akce_txt", ixp_den = "*", aktivita = "*", nazev = "*", rok = "*", prefix = "*", suffix = "*", ktg_den = "*", typ_den = "*", zkratka = "*", subrada = "*", akt_subrady = "*", ktg_den_txt = "*", akt_subrady_txt = "*", typ_ag = "*", ixs_vpk = "*",}
	const enum GSrvsplaDtoTypes { ixs_pla = "string", ico = "string", poznamka = "string", ktg_akce = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cpps_msk = "string", ixp_den_old = "string", priz_az_def = "number", priz_gen_cis = "number", ixs_csp = "string", priz_ram_doh = "number", ixs_prr_def = "string", pocet_prr = "number", ixs_csp_txt = "string", ktg_akce_txt = "string", ixp_den = "string", aktivita = "number", nazev = "string", rok = "number", prefix = "string", suffix = "string", ktg_den = "number", typ_den = "number", zkratka = "string", subrada = "number", akt_subrady = "number", ktg_den_txt = "string", akt_subrady_txt = "string", typ_ag = "number", ixs_vpk = "string",}
	const enum GSrvsplaDtoTypeLengths { ixp_den = 12, nazev = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsprrDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvsprr*/
	interface GSrvsprrDto {
		/**ixs_prr*/
		ixs_prr?: string|null;
		/**ixs_pla*/
		ixs_pla?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**rok_od*/
		rok_od?: number|null;
		/**rok_do*/
		rok_do?: number|null;
		/**ixs_sro_az*/
		ixs_sro_az?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSrvsprrDtoNames { ixs_prr = "ixs_prr", ixs_pla = "ixs_pla", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", rok_od = "rok_od", rok_do = "rok_do", ixs_sro_az = "ixs_sro_az", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvsprrDtoFragments { ixs_prr = "main", ixs_pla = "main", nazev = "main", zkratka = "main", poznamka = "main", rok_od = "main", rok_do = "main", ixs_sro_az = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GSrvsprrDtoTypes { ixs_prr = "string", ixs_pla = "string", nazev = "string", zkratka = "string", poznamka = "string", rok_od = "number", rok_do = "number", ixs_sro_az = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvsprrDtoTypeLengths { ixs_prr = 12, ixs_pla = 12, nazev = 100, zkratka = 16, poznamka = 254, ixs_sro_az = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvspskDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvspsk*/
	interface GSrvspskDto {
		/**ixs_csp*/
		ixs_csp?: string|null;
		/**skp_akc*/
		skp_akc?: string|null;
		/**psk_akc*/
		psk_akc?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSrvspskDtoNames { ixs_csp = "ixs_csp", skp_akc = "skp_akc", psk_akc = "psk_akc", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvspskDtoFragments { ixs_csp = "main", skp_akc = "main", psk_akc = "main", nazev = "main", zkratka = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GSrvspskDtoTypes { ixs_csp = "string", skp_akc = "string", psk_akc = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvspskDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvspskFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**filtr DTO pro srvsxpf*/
	interface GSrvspskFilterDto {
		/**ixs_csp*/
		ixs_csp?: string|null;
		/**skp_akc*/
		skp_akc?: string|null;
		/**psk_akc*/
		psk_akc?: string|null;
	}
	const enum GSrvspskFilterDtoNames { ixs_csp = "ixs_csp", skp_akc = "skp_akc", psk_akc = "psk_akc",}
	const enum GSrvspskFilterDtoFragments { ixs_csp = "*", skp_akc = "*", psk_akc = "*",}
	const enum GSrvspskFilterDtoTypes { ixs_csp = "string", skp_akc = "string", psk_akc = "string",}
	const enum GSrvspskFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvspspDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro srvspsp*/
	interface GSrvspspDto {
		/**id_psp*/
		id_psp?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
	}
	const enum GSrvspspDtoNames { id_psp = "id_psp", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GSrvspspDtoFragments { id_psp = "main", nazev = "main", zkratka = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main",}
	const enum GSrvspspDtoTypes { id_psp = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string",}
	const enum GSrvspspDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsskpDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvsskp*/
	interface GSrvsskpDto {
		/**ixs_csp*/
		ixs_csp?: string|null;
		/**skp_akc*/
		skp_akc?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**ixs_csp_txt*/
		ixs_csp_txt?: string|null;
	}
	const enum GSrvsskpDtoNames { ixs_csp = "ixs_csp", skp_akc = "skp_akc", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_csp_txt = "ixs_csp_txt",}
	const enum GSrvsskpDtoFragments { ixs_csp = "main", skp_akc = "main", nazev = "main", zkratka = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", ixs_csp_txt = "ixs_csp_txt",}
	const enum GSrvsskpDtoTypes { ixs_csp = "string", skp_akc = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_csp_txt = "string",}
	const enum GSrvsskpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvstipDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvstip*/
	interface GSrvstipDto {
		/**DBCOLUMN:srvstip.ixs_tip*/
		ixs_tip?: string|null;
		/**DBCOLUMN:srvstip.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:srvstip.priz_pov*/
		priz_pov?: number|null;
		/**DBCOLUMN:srvstip.priz_pov_ixb*/
		priz_pov_ixb?: number|null;
		/**DBCOLUMN:srvstip.ixs_sro_predklad*/
		ixs_sro_predklad?: string|null;
		/**DBCOLUMN:srvstip.ixs_sro_schvalov*/
		ixs_sro_schvalov?: string|null;
		/**DBCOLUMN:srvvtip.zdroj_dok*/
		zdroj_dok?: number|null;
	}
	const enum GSrvstipDtoNames { ixs_tip = "ixs_tip", nazev = "nazev", priz_pov = "priz_pov", priz_pov_ixb = "priz_pov_ixb", ixs_sro_predklad = "ixs_sro_predklad", ixs_sro_schvalov = "ixs_sro_schvalov", zdroj_dok = "zdroj_dok",}
	const enum GSrvstipDtoFragments { ixs_tip = "*", nazev = "*", priz_pov = "*", priz_pov_ixb = "*", ixs_sro_predklad = "*", ixs_sro_schvalov = "*", zdroj_dok = "*",}
	const enum GSrvstipDtoTypes { ixs_tip = "string", nazev = "string", priz_pov = "number", priz_pov_ixb = "number", ixs_sro_predklad = "string", ixs_sro_schvalov = "string", zdroj_dok = "number",}
	const enum GSrvstipDtoTypeLengths { ixs_tip = 12, nazev = 254, ixs_sro_predklad = 12, ixs_sro_schvalov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvstriDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Srvstri*/
	interface GSrvstriDto {
		/**ixs_prr*/
		ixs_tri?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**rok_od*/
		rok_od?: number|null;
		/**rok_do*/
		rok_do?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
	}
	const enum GSrvstriDtoNames { ixs_tri = "ixs_tri", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", rok_od = "rok_od", rok_do = "rok_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GSrvstriDtoFragments { ixs_tri = "main", nazev = "main", zkratka = "main", poznamka = "main", rok_od = "main", rok_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GSrvstriDtoTypes { ixs_tri = "string", nazev = "string", zkratka = "string", poznamka = "string", rok_od = "number", rok_do = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GSrvstriDtoTypeLengths { ixs_tri = 12, nazev = 100, zkratka = 16, poznamka = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvstzdDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro srvstzd*/
	interface GSrvstzdDto {
		/**id_tzd*/
		id_tzd?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
	}
	const enum GSrvstzdDtoNames { id_tzd = "id_tzd", nazev = "nazev", zkratka = "zkratka", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GSrvstzdDtoFragments { id_tzd = "main", nazev = "main", zkratka = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "main",}
	const enum GSrvstzdDtoTypes { id_tzd = "string", nazev = "string", zkratka = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string",}
	const enum GSrvstzdDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsvybDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**Datový objekt popisující Seznam rkai pro přípravu.*/
	interface GSrvsvybDto {
		/**Ičo.*/
		ico?: string|null;
		/**Id vyb.*/
		id_vyb?: string|null;
		/**Kod.*/
		kod?: string|null;
		/**Název.*/
		nazev?: string|null;
		/**Rok od.*/
		rok_od?: number|null;
		/**Rok do.*/
		rok_do?: number|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Počet položek.*/
		pocet?: number|null;
	}
	const enum GSrvsvybDtoNames { ico = "ico", id_vyb = "id_vyb", kod = "kod", nazev = "nazev", rok_od = "rok_od", rok_do = "rok_do", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pocet = "pocet",}
	const enum GSrvsvybDtoFragments { ico = "main", id_vyb = "main", kod = "main", nazev = "main", rok_od = "main", rok_do = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", pocet = "main",}
	const enum GSrvsvybDtoTypes { ico = "string", id_vyb = "string", kod = "string", nazev = "string", rok_od = "number", rok_do = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", pocet = "number",}
	const enum GSrvsvybDtoTypeLengths { ico = 10, id_vyb = 20, kod = 20, nazev = 100, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsxpfDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro srvsxpf*/
	interface GSrvsxpfDto {
		/**xpf_pf*/
		xpf_pf?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**uroven*/
		uroven?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**rok_od*/
		rok_od?: number|null;
		/**rok_do*/
		rok_do?: number|null;
		/**ico*/
		ico?: string|null;
		/**kod_uct*/
		kod_uct?: string|null;
		/**priz_eds*/
		priz_eds?: number|null;
		/**priz_eds_b*/
		priz_eds_b?: boolean|null;
		/**uroven_txt*/
		uroven_txt?: string|null;
		/**zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**xpf_pf_prg*/
		xpf_pf_prg?: string|null;
		/**xpf_pf_prj*/
		xpf_pf_prj?: string|null;
	}
	const enum GSrvsxpfDtoNames { xpf_pf = "xpf_pf", nazev = "nazev", uroven = "uroven", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", rok_od = "rok_od", rok_do = "rok_do", ico = "ico", kod_uct = "kod_uct", priz_eds = "priz_eds", priz_eds_b = "priz_eds_b", uroven_txt = "uroven_txt", zmenu_prov_txt = "zmenu_prov_txt", xpf_pf_prg = "xpf_pf_prg", xpf_pf_prj = "xpf_pf_prj",}
	const enum GSrvsxpfDtoFragments { xpf_pf = "main", nazev = "main", uroven = "main", dat_zmena = "main", zmenu_prov = "main", aktivita = "main", rok_od = "main", rok_do = "main", ico = "main", kod_uct = "main", priz_eds = "main", priz_eds_b = "main", uroven_txt = "uroven_txt", zmenu_prov_txt = "main", xpf_pf_prg = "main", xpf_pf_prj = "main",}
	const enum GSrvsxpfDtoTypes { xpf_pf = "string", nazev = "string", uroven = "string", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", rok_od = "number", rok_do = "number", ico = "string", kod_uct = "string", priz_eds = "number", priz_eds_b = "boolean", uroven_txt = "string", zmenu_prov_txt = "string", xpf_pf_prg = "string", xpf_pf_prj = "string",}
	const enum GSrvsxpfDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvsxpfFilterDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**filtr DTO pro srvsxpf*/
	interface GSrvsxpfFilterDto {
		/**xpf_pf*/
		xpf_pf?: string|null;
		/**uroven*/
		uroven?: string|null;
	}
	const enum GSrvsxpfFilterDtoNames { xpf_pf = "xpf_pf", uroven = "uroven",}
	const enum GSrvsxpfFilterDtoFragments { xpf_pf = "*", uroven = "*",}
	const enum GSrvsxpfFilterDtoTypes { xpf_pf = "string", uroven = "string",}
	const enum GSrvsxpfFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvvprrDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvvprr*/
	interface GSrvvprrDto {
		/**DBCOLUMN:srvvtip.ixs_tip*/
		ixs_tip?: string|null;
		/**DBCOLUMN:srvvtip.ixs_prr*/
		ixs_prr?: string|null;
		/**DBCOLUMN:srvvtip.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:srvvtip.priz_pov*/
		priz_pov?: number|null;
		/**DBCOLUMN:srvvtip.priz_pov_ixb*/
		priz_pov_ixb?: number|null;
		/**DBCOLUMN:srvvtip.ixs_sro_predklad*/
		ixs_sro_predklad?: string|null;
		/**DBCOLUMN:srvvtip.ixs_sro_schvalov*/
		ixs_sro_schvalov?: string|null;
		/**DBCOLUMN:srvvtip.zdroj_dok*/
		zdroj_dok?: number|null;
		/**DBCOLUMN:srvvtip.zpusob_schv*/
		zpusob_schv?: number|null;
		/**DBCOLUMN:srvstip.typ_spec*/
		typ_spec?: number|null;
	}
	const enum GSrvvprrDtoNames { ixs_tip = "ixs_tip", ixs_prr = "ixs_prr", nazev = "nazev", priz_pov = "priz_pov", priz_pov_ixb = "priz_pov_ixb", ixs_sro_predklad = "ixs_sro_predklad", ixs_sro_schvalov = "ixs_sro_schvalov", zdroj_dok = "zdroj_dok", zpusob_schv = "zpusob_schv", typ_spec = "typ_spec",}
	const enum GSrvvprrDtoFragments { ixs_tip = "*", ixs_prr = "*", nazev = "*", priz_pov = "*", priz_pov_ixb = "*", ixs_sro_predklad = "*", ixs_sro_schvalov = "*", zdroj_dok = "*", zpusob_schv = "*", typ_spec = "*",}
	const enum GSrvvprrDtoTypes { ixs_tip = "string", ixs_prr = "string", nazev = "string", priz_pov = "number", priz_pov_ixb = "number", ixs_sro_predklad = "string", ixs_sro_schvalov = "string", zdroj_dok = "number", zpusob_schv = "number", typ_spec = "number",}
	const enum GSrvvprrDtoTypeLengths { ixs_tip = 12, ixs_prr = 12, nazev = 254, ixs_sro_predklad = 12, ixs_sro_schvalov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GSrvvtipDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DBTABLE:srvvtip*/
	interface GSrvvtipDto {
		/**DBCOLUMN:srvvtip.ixs_tip*/
		ixs_tip?: string|null;
		/**DBCOLUMN:srvvtip.ixs_pla*/
		ixs_pla?: string|null;
		/**DBCOLUMN:srvvtip.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:srvvtip.priz_pov*/
		priz_pov?: number|null;
		/**DBCOLUMN:srvvtip.priz_pov_ixb*/
		priz_pov_ixb?: number|null;
		/**DBCOLUMN:srvvtip.ixs_sro_predklad*/
		ixs_sro_predklad?: string|null;
		/**DBCOLUMN:srvvtip.ixs_sro_schvalov*/
		ixs_sro_schvalov?: string|null;
		/**DBCOLUMN:srvvtip.zdroj_dok*/
		zdroj_dok?: number|null;
		/**DBCOLUMN:srvvtip.zpusob_schv*/
		zpusob_schv?: number|null;
		/**DBCOLUMN:srvstip.typ_spec*/
		typ_spec?: number|null;
	}
	const enum GSrvvtipDtoNames { ixs_tip = "ixs_tip", ixs_pla = "ixs_pla", nazev = "nazev", priz_pov = "priz_pov", priz_pov_ixb = "priz_pov_ixb", ixs_sro_predklad = "ixs_sro_predklad", ixs_sro_schvalov = "ixs_sro_schvalov", zdroj_dok = "zdroj_dok", zpusob_schv = "zpusob_schv", typ_spec = "typ_spec",}
	const enum GSrvvtipDtoFragments { ixs_tip = "*", ixs_pla = "*", nazev = "*", priz_pov = "*", priz_pov_ixb = "*", ixs_sro_predklad = "*", ixs_sro_schvalov = "*", zdroj_dok = "*", zpusob_schv = "*", typ_spec = "*",}
	const enum GSrvvtipDtoTypes { ixs_tip = "string", ixs_pla = "string", nazev = "string", priz_pov = "number", priz_pov_ixb = "number", ixs_sro_predklad = "string", ixs_sro_schvalov = "string", zdroj_dok = "number", zpusob_schv = "number", typ_spec = "number",}
	const enum GSrvvtipDtoTypeLengths { ixs_tip = 12, ixs_pla = 12, nazev = 254, ixs_sro_predklad = 12, ixs_sro_schvalov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Dto\GVepcstpDto.d.ts 

declare namespace Gordic.Ada.Interface {
	/**DTO pro Vepcstp*/
	interface GVepcstpDto {
		/**vp_stav*/
		vp_stav?: number|null;
		/**vp_stav_txt*/
		vp_stav_txt?: string|null;
		/**k_v*/
		k_v?: number|null;
		/**k_s*/
		k_s?: string|null;
	}
	const enum GVepcstpDtoNames { vp_stav = "vp_stav", vp_stav_txt = "vp_stav_txt", k_v = "k_v", k_s = "k_s",}
	const enum GVepcstpDtoFragments { vp_stav = "*", vp_stav_txt = "*", k_v = "*", k_s = "*",}
	const enum GVepcstpDtoTypes { vp_stav = "number", vp_stav_txt = "string", k_v = "number", k_s = "string",}
	const enum GVepcstpDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Init\GAdaGlobalsBase.d.ts 

declare namespace Gordic.Ada.Interface {
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
	/**Přístup k operaci editace příloh*/
	const enum PristupKEditaciPrilohEnum {
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
	/**Přístup k uloze*/
	const enum PristupKUlozeEnum {
		/**Ne*/
		Ne=0,
		/**Ano*/
		Ano_Prohlizeni=1,
		/**Ano_Editace*/
		Ano_Editace=2,
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
	/**Rezim provozu ADA*/
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
	/**Typ zpracování ADA*/
	const enum TypZpracovaniEnum {
		/**typ zpracování = online - default*/
		Online=10,
		/**typ zpracování = offline*/
		Offline=20,
	}
	/**Typ zpracování organizací ADA*/
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
	/**Stav realizace akce*/
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
	/**Stav realizace akce*/
	const enum StavAZAkceEnum {
		/**ZpetAZ*/
		ZpetAZ=-1,
		/**Nezabezepeceno*/
		Nezabezepeceno=0,
		/**Nafinancovano*/
		Nafinancovano=2,
		/**Zahajeno*/
		Zahajeno=3,
		/**Ukonceno*/
		Ukonceno=1,
	}
	/**Stav realizace akce*/
	const enum TypAkceSumEnum {
		/**Samostatna*/
		Samostatna=0,
		/**Souhrnna*/
		Souhrnna=1,
		/**Sdruzena*/
		Sdruzena=2,
		/**Obalkova*/
		Obalkova=3,
		/**Seskupena*/
		Seskupena=4,
	}
	/**Typ preevidence akce*/
	const enum TypSpravyLimityAPEnum {
		/**NE*/
		Ne=0,
		/**Ano - prohlizeni*/
		Ano_Prohlizeni=1,
		/**Ano - editace*/
		Ano_Editace=2,
		/**Ano - del přístupů*/
		Ano_DlePristupu=3,
	}
	/**Globální parametry pro ADA. Načtené při startu aplikace*/
	interface GAdaGlobalsBase {
		/**Je_DSG*/
		Je_DSG?: boolean|null;
		/**Je_DB_388_1_70*/
		Je_DB_388_1_70?: boolean|null;
		/**Je_DB_388_3_46*/
		Je_DB_388_3_46?: boolean|null;
		/**Typ zpracování organizace*/
		TypZpOrgan?: Gordic.Ada.Interface.TypZpOrganEnum|null;
		/**Typ zpracování*/
		TypZpracovani?: Gordic.Ada.Interface.TypZpracovaniEnum|null;
		/**Typ zpracování*/
		TypZpracovani_Tabulka?: string|null;
		/**Rezim provozu*/
		RezimProvozu?: Gordic.Ada.Interface.RezimProvozuEnum|null;
		/**zobledneni obdobi financovani akce*/
		Zohlednit_Financovani?: boolean|null;
		/**Gen_Cislo_Od*/
		Gen_Cislo_Od?: string|null;
		/**Gen_Cislo_Do*/
		Gen_Cislo_Do?: string|null;
		/**Administrace EDS*/
		Param_Administrace_EDS?: boolean|null;
		/**Administrace PZP*/
		Param_Administrace_PSP?: boolean|null;
		/**Administrace TZD*/
		Param_Administrace_TZD?: boolean|null;
		/**Administrace SKP*/
		Param_Administrace_SKP?: boolean|null;
		/**Administrace EDS*/
		Param_Administrace_TypCis?: boolean|null;
		/**Administrace Plany*/
		Param_Administrace_Plany_Visible?: boolean|null;
		/**Administrace Plany*/
		Param_Administrace_ISP_Visible?: boolean|null;
		/**Administrace PRR*/
		Param_Administrace_PRR_Visible?: boolean|null;
		/**Administrace Tridy*/
		Param_Administrace_Tridy_Visible?: boolean|null;
		/**Administrace vydajove bloky*/
		Param_Administrace_Vydajove_Bloky_Visible?: boolean|null;
		/**Administrace Oblasti limitu*/
		Param_Administrace_Oblasti_Limitu_Visible?: boolean|null;
		/**Administrace Obdobi SRV*/
		Param_Obdobi_SRV_Visible?: boolean|null;
		/**Schvaleni akce*/
		Param_Schvaleni_Akce?: boolean|null;
		/**Rezim prace nevlastnika akce*/
		Param_Rezim_Vlastnik?: boolean|null;
		/**editace celk nakladu akce*/
		Param_Edit_Celk?: boolean|null;
		/**přednastavení realizátora*/
		Param_Prednastavit_Real?: boolean|null;
		/**Param_Uloha_Sprava_AZ*/
		Param_Uloha_Sprava_AZ?: Gordic.Ada.Interface.PristupKUlozeEnum|null;
		/**Param_Uloha_Priprava_IP*/
		Param_Uloha_Priprava_IP?: Gordic.Ada.Interface.PristupKUlozeEnum|null;
		/**Param_Uloha_Schvalovani_IP*/
		Param_Uloha_Schvalovani_IP?: Gordic.Ada.Interface.PristupKUlozeEnum|null;
		/**Schvaleni akce vazat na schvaleni IP*/
		Param_Schval_Akce_Spl_IP?: Gordic.Ada.Interface.TypProvedeniOperaceEnum|null;
		/**Param_Uloha_Podpora_Dokumentu_IP*/
		Param_Rozsireni_Podpora_Dokumentu_IP?: boolean|null;
		/**Param_Uloha_Podpora_Externi_Schcvalovani_IP*/
		Param_Rozsireni_Externi_Schcvalovani_IP?: boolean|null;
		/**Param_Rozsireni_Limity_AP*/
		Param_Rozsireni_Limity_AP?: boolean|null;
		/**Param_Rozsireni_Specifikace_PP*/
		Param_Rozsireni_Specifikace_PP?: boolean|null;
		/**Param_Rozsireni_Zmenove_Rizeni*/
		Param_Rozsireni_Zmenove_Rizeni?: boolean|null;
		/**Param_RP_Podpora_Specifikace_PP*/
		Param_RP_Podpora_Specifikace_PP?: boolean|null;
		/**Param_RP_Podpora_Zmenove_Rizeni*/
		Param_RP_Podpora_Zmenove_Rizeni?: boolean|null;
		/**Param_RP_Podpora_Dokumentu_IP*/
		Param_RP_Podpora_Dokumentu_IP?: boolean|null;
		/**Param_RP_Podpora_Spisu_IP*/
		Param_RP_Podpora_Spisu_IP?: boolean|null;
		/**Param_RP_Podpora_Externi_Schcvalovani_IP*/
		Param_RP_Podpora_Externi_Schcvalovani_IP?: boolean|null;
		/**Param_Sprava_Limity_AP*/
		Param_Sprava_Limity_AP?: boolean|null;
		/**Param_Uloha_Limity_AP*/
		Param_Uloha_Limity_AP?: Gordic.Ada.Interface.TypSpravyLimityAPEnum|null;
		/**Param_RP_Ukoncen_Akce*/
		Param_RP_Ukonceni_Akce?: boolean|null;
		/**Preevidence*/
		Param_Akce_Preevidence?: Gordic.Ada.Interface.TypPreevidenceAkceEnum|null;
		/**Predat*/
		Param_Akce_Predat?: Gordic.Ada.Interface.TypPredatPrevzitAkceEnum|null;
		/**Prevzit*/
		Param_Akce_Prevzit?: Gordic.Ada.Interface.TypPredatPrevzitAkceEnum|null;
		/**Automaticke schvaleni akce pro porizeni*/
		Param_Akce_AutSchv?: Gordic.Ada.Interface.TypAutomatSchvaleniNovaAkceEnum|null;
		/**Editace EDS*/
		Param_Editace_EDS?: Gordic.Ada.Interface.PristupKEditaciEnum|null;
		/**Editace PZP*/
		Param_Editace_PSP?: Gordic.Ada.Interface.PristupKEditaciEnum|null;
		/**Editace TZD*/
		Param_Editace_TZD?: Gordic.Ada.Interface.PristupKEditaciEnum|null;
		/**Param_Edit_El_Pri*/
		Param_Edit_El_Pri?: Gordic.Ada.Interface.PristupKEditaciPrilohEnum|null;
		/**Param_Zobr_El_Pri_Nevlastnik*/
		Param_Zobr_El_Pri_Nevlastnik?: Gordic.Ada.Interface.TypProvedeniOperaceEnum|null;
		/**Editace textoveho profilu*/
		Param_Akce_Editace_TP?: boolean|null;
		/**Blokace zalozani nove akce*/
		Param_Akce_Editace_TP_Novy?: boolean|null;
		/**Editace finančního profilu*/
		Param_Akce_Editace_FP?: boolean|null;
		/**Editace kompetentuu*/
		Param_Editace_Komp_Akce?: Gordic.Ada.Interface.PristupKEditaciKompEnum|null;
		/**Editace ISP*/
		Param_Editace_ISP?: Gordic.Ada.Interface.PristupKEditaciISPEnum|null;
		/**uloha Priprava planu*/
		Param_Uloha_Plan?: boolean|null;
		/**uloha Priprava planu - generovani*/
		Param_Uloha_Plan_GEN?: boolean|null;
		/**uloha Priprava planu - rozdeleni*/
		Param_Uloha_Plan_ROZDEL?: boolean|null;
		/**uloha Priprava planu - zaplanovani*/
		Param_Uloha_Plan_PLANUJ?: boolean|null;
		/**uloha Priprava planu - zaplanovani - akce upravit/predat*/
		Param_Plan_Upravit?: boolean|null;
		/**uloha Priprava planu - zaplanovani - akce zaplanovat*/
		Param_Plan_Zaplanovani?: boolean|null;
		/**uloha Priprava planu - zaplanovani - akce schvalit*/
		Param_Plan_Schvaleni?: boolean|null;
		/**otevirani agenddovych detailu*/
		Parametr_Zobrazeni_AG_Detailu_KDF?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_KOF?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_POU?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_PRE?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_EVZ?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_VFP?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_EPO?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_RZA?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_SML?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_OBJ?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_FUC?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_UCT?: boolean|null;
		Parametr_Zobrazeni_AG_Detailu_ROZ?: boolean|null;
		/**Aktual_Maj*/
		Aktual_Maj?: boolean|null;
		/**BAR_Typ_Inst*/
		BAR_Typ_Inst?: Gordic.Ada.Interface.SrvTypIntalaceEnum|null;
		/**Moje_Cis_Real*/
		Moje_Cis_Real?: string|null;
		/**Pocet_Let_Plan*/
		Pocet_Let_Plan?: number|null;
		/**maska čísla plánu ve sloupci TE1*/
		cis_real?: string|null;
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
		/**nazev programu EDS*/
		nazev_prg_eds?: string|null;
		/**zacatek programu EDS*/
		zacatek_prg_eds?: number|null;
		/**délka programu EDS*/
		delka_prg_eds?: number|null;
		/**délka kodu UCT*/
		delka_kod_uct?: number|null;
		/**nazev projektu EDS*/
		nazev_prj_eds?: string|null;
		/**zacatek projektu EDS*/
		zacatek_prj_eds?: number|null;
		/**délka projektu EDS*/
		delka_prj_eds?: number|null;
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
	}
	const enum GAdaGlobalsBaseNames { Je_DSG = "Je_DSG", Je_DB_388_1_70 = "Je_DB_388_1_70", Je_DB_388_3_46 = "Je_DB_388_3_46", TypZpOrgan = "TypZpOrgan", TypZpracovani = "TypZpracovani", TypZpracovani_Tabulka = "TypZpracovani_Tabulka", RezimProvozu = "RezimProvozu", Zohlednit_Financovani = "Zohlednit_Financovani", Gen_Cislo_Od = "Gen_Cislo_Od", Gen_Cislo_Do = "Gen_Cislo_Do", Param_Administrace_EDS = "Param_Administrace_EDS", Param_Administrace_PSP = "Param_Administrace_PSP", Param_Administrace_TZD = "Param_Administrace_TZD", Param_Administrace_SKP = "Param_Administrace_SKP", Param_Administrace_TypCis = "Param_Administrace_TypCis", Param_Administrace_Plany_Visible = "Param_Administrace_Plany_Visible", Param_Administrace_ISP_Visible = "Param_Administrace_ISP_Visible", Param_Administrace_PRR_Visible = "Param_Administrace_PRR_Visible", Param_Administrace_Tridy_Visible = "Param_Administrace_Tridy_Visible", Param_Administrace_Vydajove_Bloky_Visible = "Param_Administrace_Vydajove_Bloky_Visible", Param_Administrace_Oblasti_Limitu_Visible = "Param_Administrace_Oblasti_Limitu_Visible", Param_Obdobi_SRV_Visible = "Param_Obdobi_SRV_Visible", Param_Schvaleni_Akce = "Param_Schvaleni_Akce", Param_Rezim_Vlastnik = "Param_Rezim_Vlastnik", Param_Edit_Celk = "Param_Edit_Celk", Param_Prednastavit_Real = "Param_Prednastavit_Real", Param_Uloha_Sprava_AZ = "Param_Uloha_Sprava_AZ", Param_Uloha_Priprava_IP = "Param_Uloha_Priprava_IP", Param_Uloha_Schvalovani_IP = "Param_Uloha_Schvalovani_IP", Param_Schval_Akce_Spl_IP = "Param_Schval_Akce_Spl_IP", Param_Rozsireni_Podpora_Dokumentu_IP = "Param_Rozsireni_Podpora_Dokumentu_IP", Param_Rozsireni_Externi_Schcvalovani_IP = "Param_Rozsireni_Externi_Schcvalovani_IP", Param_Rozsireni_Limity_AP = "Param_Rozsireni_Limity_AP", Param_Rozsireni_Specifikace_PP = "Param_Rozsireni_Specifikace_PP", Param_Rozsireni_Zmenove_Rizeni = "Param_Rozsireni_Zmenove_Rizeni", Param_RP_Podpora_Specifikace_PP = "Param_RP_Podpora_Specifikace_PP", Param_RP_Podpora_Zmenove_Rizeni = "Param_RP_Podpora_Zmenove_Rizeni", Param_RP_Podpora_Dokumentu_IP = "Param_RP_Podpora_Dokumentu_IP", Param_RP_Podpora_Spisu_IP = "Param_RP_Podpora_Spisu_IP", Param_RP_Podpora_Externi_Schcvalovani_IP = "Param_RP_Podpora_Externi_Schcvalovani_IP", Param_Sprava_Limity_AP = "Param_Sprava_Limity_AP", Param_Uloha_Limity_AP = "Param_Uloha_Limity_AP", Param_RP_Ukonceni_Akce = "Param_RP_Ukonceni_Akce", Param_Akce_Preevidence = "Param_Akce_Preevidence", Param_Akce_Predat = "Param_Akce_Predat", Param_Akce_Prevzit = "Param_Akce_Prevzit", Param_Akce_AutSchv = "Param_Akce_AutSchv", Param_Editace_EDS = "Param_Editace_EDS", Param_Editace_PSP = "Param_Editace_PSP", Param_Editace_TZD = "Param_Editace_TZD", Param_Edit_El_Pri = "Param_Edit_El_Pri", Param_Zobr_El_Pri_Nevlastnik = "Param_Zobr_El_Pri_Nevlastnik", Param_Akce_Editace_TP = "Param_Akce_Editace_TP", Param_Akce_Editace_TP_Novy = "Param_Akce_Editace_TP_Novy", Param_Akce_Editace_FP = "Param_Akce_Editace_FP", Param_Editace_Komp_Akce = "Param_Editace_Komp_Akce", Param_Editace_ISP = "Param_Editace_ISP", Param_Uloha_Plan = "Param_Uloha_Plan", Param_Uloha_Plan_GEN = "Param_Uloha_Plan_GEN", Param_Uloha_Plan_ROZDEL = "Param_Uloha_Plan_ROZDEL", Param_Uloha_Plan_PLANUJ = "Param_Uloha_Plan_PLANUJ", Param_Plan_Upravit = "Param_Plan_Upravit", Param_Plan_Zaplanovani = "Param_Plan_Zaplanovani", Param_Plan_Schvaleni = "Param_Plan_Schvaleni", Parametr_Zobrazeni_AG_Detailu_KDF = "Parametr_Zobrazeni_AG_Detailu_KDF", Parametr_Zobrazeni_AG_Detailu_KOF = "Parametr_Zobrazeni_AG_Detailu_KOF", Parametr_Zobrazeni_AG_Detailu_POU = "Parametr_Zobrazeni_AG_Detailu_POU", Parametr_Zobrazeni_AG_Detailu_PRE = "Parametr_Zobrazeni_AG_Detailu_PRE", Parametr_Zobrazeni_AG_Detailu_EVZ = "Parametr_Zobrazeni_AG_Detailu_EVZ", Parametr_Zobrazeni_AG_Detailu_VFP = "Parametr_Zobrazeni_AG_Detailu_VFP", Parametr_Zobrazeni_AG_Detailu_EPO = "Parametr_Zobrazeni_AG_Detailu_EPO", Parametr_Zobrazeni_AG_Detailu_RZA = "Parametr_Zobrazeni_AG_Detailu_RZA", Parametr_Zobrazeni_AG_Detailu_SML = "Parametr_Zobrazeni_AG_Detailu_SML", Parametr_Zobrazeni_AG_Detailu_OBJ = "Parametr_Zobrazeni_AG_Detailu_OBJ", Parametr_Zobrazeni_AG_Detailu_FUC = "Parametr_Zobrazeni_AG_Detailu_FUC", Parametr_Zobrazeni_AG_Detailu_UCT = "Parametr_Zobrazeni_AG_Detailu_UCT", Parametr_Zobrazeni_AG_Detailu_ROZ = "Parametr_Zobrazeni_AG_Detailu_ROZ", Aktual_Maj = "Aktual_Maj", BAR_Typ_Inst = "BAR_Typ_Inst", Moje_Cis_Real = "Moje_Cis_Real", Pocet_Let_Plan = "Pocet_Let_Plan", cis_real = "cis_real", te1_msk = "te1_msk", te1_msk_org = "te1_msk_org", te1_msk_nula = "te1_msk_nula", b_te1_msk_full = "b_te1_msk_full", te1_msk_start = "te1_msk_start", te1_msk_stop = "te1_msk_stop", rok_srv = "rok_srv", delka_akce = "delka_akce", nazev_prg_eds = "nazev_prg_eds", zacatek_prg_eds = "zacatek_prg_eds", delka_prg_eds = "delka_prg_eds", delka_kod_uct = "delka_kod_uct", nazev_prj_eds = "nazev_prj_eds", zacatek_prj_eds = "zacatek_prj_eds", delka_prj_eds = "delka_prj_eds", titulek_ico_nazev = "titulek_ico_nazev", titulek_ucs_nazev = "titulek_ucs_nazev", titulek_uus_nazev = "titulek_uus_nazev", titulek_nks_nazev = "titulek_nks_nazev", titulek_ico = "titulek_ico", titulek_ucs = "titulek_ucs", titulek_uus = "titulek_uus", titulek_nks = "titulek_nks",}
	const enum GAdaGlobalsBaseFragments { Je_DSG = "*", Je_DB_388_1_70 = "*", Je_DB_388_3_46 = "*", TypZpOrgan = "*", TypZpracovani = "*", TypZpracovani_Tabulka = "*", RezimProvozu = "*", Zohlednit_Financovani = "*", Gen_Cislo_Od = "*", Gen_Cislo_Do = "*", Param_Administrace_EDS = "*", Param_Administrace_PSP = "*", Param_Administrace_TZD = "*", Param_Administrace_SKP = "*", Param_Administrace_TypCis = "*", Param_Administrace_Plany_Visible = "*", Param_Administrace_ISP_Visible = "*", Param_Administrace_PRR_Visible = "*", Param_Administrace_Tridy_Visible = "*", Param_Administrace_Vydajove_Bloky_Visible = "*", Param_Administrace_Oblasti_Limitu_Visible = "*", Param_Obdobi_SRV_Visible = "*", Param_Schvaleni_Akce = "*", Param_Rezim_Vlastnik = "*", Param_Edit_Celk = "*", Param_Prednastavit_Real = "*", Param_Uloha_Sprava_AZ = "*", Param_Uloha_Priprava_IP = "*", Param_Uloha_Schvalovani_IP = "*", Param_Schval_Akce_Spl_IP = "*", Param_Rozsireni_Podpora_Dokumentu_IP = "*", Param_Rozsireni_Externi_Schcvalovani_IP = "*", Param_Rozsireni_Limity_AP = "*", Param_Rozsireni_Specifikace_PP = "*", Param_Rozsireni_Zmenove_Rizeni = "*", Param_RP_Podpora_Specifikace_PP = "*", Param_RP_Podpora_Zmenove_Rizeni = "*", Param_RP_Podpora_Dokumentu_IP = "*", Param_RP_Podpora_Spisu_IP = "*", Param_RP_Podpora_Externi_Schcvalovani_IP = "*", Param_Sprava_Limity_AP = "*", Param_Uloha_Limity_AP = "*", Param_RP_Ukonceni_Akce = "*", Param_Akce_Preevidence = "*", Param_Akce_Predat = "*", Param_Akce_Prevzit = "*", Param_Akce_AutSchv = "*", Param_Editace_EDS = "*", Param_Editace_PSP = "*", Param_Editace_TZD = "*", Param_Edit_El_Pri = "*", Param_Zobr_El_Pri_Nevlastnik = "*", Param_Akce_Editace_TP = "*", Param_Akce_Editace_TP_Novy = "*", Param_Akce_Editace_FP = "*", Param_Editace_Komp_Akce = "*", Param_Editace_ISP = "*", Param_Uloha_Plan = "*", Param_Uloha_Plan_GEN = "*", Param_Uloha_Plan_ROZDEL = "*", Param_Uloha_Plan_PLANUJ = "*", Param_Plan_Upravit = "*", Param_Plan_Zaplanovani = "*", Param_Plan_Schvaleni = "*", Parametr_Zobrazeni_AG_Detailu_KDF = "*", Parametr_Zobrazeni_AG_Detailu_KOF = "*", Parametr_Zobrazeni_AG_Detailu_POU = "*", Parametr_Zobrazeni_AG_Detailu_PRE = "*", Parametr_Zobrazeni_AG_Detailu_EVZ = "*", Parametr_Zobrazeni_AG_Detailu_VFP = "*", Parametr_Zobrazeni_AG_Detailu_EPO = "*", Parametr_Zobrazeni_AG_Detailu_RZA = "*", Parametr_Zobrazeni_AG_Detailu_SML = "*", Parametr_Zobrazeni_AG_Detailu_OBJ = "*", Parametr_Zobrazeni_AG_Detailu_FUC = "*", Parametr_Zobrazeni_AG_Detailu_UCT = "*", Parametr_Zobrazeni_AG_Detailu_ROZ = "*", Aktual_Maj = "*", BAR_Typ_Inst = "*", Moje_Cis_Real = "*", Pocet_Let_Plan = "*", cis_real = "*", te1_msk = "*", te1_msk_org = "*", te1_msk_nula = "*", b_te1_msk_full = "*", te1_msk_start = "*", te1_msk_stop = "*", rok_srv = "*", delka_akce = "*", nazev_prg_eds = "*", zacatek_prg_eds = "*", delka_prg_eds = "*", delka_kod_uct = "*", nazev_prj_eds = "*", zacatek_prj_eds = "*", delka_prj_eds = "*", titulek_ico_nazev = "*", titulek_ucs_nazev = "*", titulek_uus_nazev = "*", titulek_nks_nazev = "*", titulek_ico = "*", titulek_ucs = "*", titulek_uus = "*", titulek_nks = "*",}
	const enum GAdaGlobalsBaseTypes { Je_DSG = "boolean", Je_DB_388_1_70 = "boolean", Je_DB_388_3_46 = "boolean", TypZpOrgan = "Gordic.Ada.Interface.TypZpOrganEnum", TypZpracovani = "Gordic.Ada.Interface.TypZpracovaniEnum", TypZpracovani_Tabulka = "string", RezimProvozu = "Gordic.Ada.Interface.RezimProvozuEnum", Zohlednit_Financovani = "boolean", Gen_Cislo_Od = "string", Gen_Cislo_Do = "string", Param_Administrace_EDS = "boolean", Param_Administrace_PSP = "boolean", Param_Administrace_TZD = "boolean", Param_Administrace_SKP = "boolean", Param_Administrace_TypCis = "boolean", Param_Administrace_Plany_Visible = "boolean", Param_Administrace_ISP_Visible = "boolean", Param_Administrace_PRR_Visible = "boolean", Param_Administrace_Tridy_Visible = "boolean", Param_Administrace_Vydajove_Bloky_Visible = "boolean", Param_Administrace_Oblasti_Limitu_Visible = "boolean", Param_Obdobi_SRV_Visible = "boolean", Param_Schvaleni_Akce = "boolean", Param_Rezim_Vlastnik = "boolean", Param_Edit_Celk = "boolean", Param_Prednastavit_Real = "boolean", Param_Uloha_Sprava_AZ = "Gordic.Ada.Interface.PristupKUlozeEnum", Param_Uloha_Priprava_IP = "Gordic.Ada.Interface.PristupKUlozeEnum", Param_Uloha_Schvalovani_IP = "Gordic.Ada.Interface.PristupKUlozeEnum", Param_Schval_Akce_Spl_IP = "Gordic.Ada.Interface.TypProvedeniOperaceEnum", Param_Rozsireni_Podpora_Dokumentu_IP = "boolean", Param_Rozsireni_Externi_Schcvalovani_IP = "boolean", Param_Rozsireni_Limity_AP = "boolean", Param_Rozsireni_Specifikace_PP = "boolean", Param_Rozsireni_Zmenove_Rizeni = "boolean", Param_RP_Podpora_Specifikace_PP = "boolean", Param_RP_Podpora_Zmenove_Rizeni = "boolean", Param_RP_Podpora_Dokumentu_IP = "boolean", Param_RP_Podpora_Spisu_IP = "boolean", Param_RP_Podpora_Externi_Schcvalovani_IP = "boolean", Param_Sprava_Limity_AP = "boolean", Param_Uloha_Limity_AP = "Gordic.Ada.Interface.TypSpravyLimityAPEnum", Param_RP_Ukonceni_Akce = "boolean", Param_Akce_Preevidence = "Gordic.Ada.Interface.TypPreevidenceAkceEnum", Param_Akce_Predat = "Gordic.Ada.Interface.TypPredatPrevzitAkceEnum", Param_Akce_Prevzit = "Gordic.Ada.Interface.TypPredatPrevzitAkceEnum", Param_Akce_AutSchv = "Gordic.Ada.Interface.TypAutomatSchvaleniNovaAkceEnum", Param_Editace_EDS = "Gordic.Ada.Interface.PristupKEditaciEnum", Param_Editace_PSP = "Gordic.Ada.Interface.PristupKEditaciEnum", Param_Editace_TZD = "Gordic.Ada.Interface.PristupKEditaciEnum", Param_Edit_El_Pri = "Gordic.Ada.Interface.PristupKEditaciPrilohEnum", Param_Zobr_El_Pri_Nevlastnik = "Gordic.Ada.Interface.TypProvedeniOperaceEnum", Param_Akce_Editace_TP = "boolean", Param_Akce_Editace_TP_Novy = "boolean", Param_Akce_Editace_FP = "boolean", Param_Editace_Komp_Akce = "Gordic.Ada.Interface.PristupKEditaciKompEnum", Param_Editace_ISP = "Gordic.Ada.Interface.PristupKEditaciISPEnum", Param_Uloha_Plan = "boolean", Param_Uloha_Plan_GEN = "boolean", Param_Uloha_Plan_ROZDEL = "boolean", Param_Uloha_Plan_PLANUJ = "boolean", Param_Plan_Upravit = "boolean", Param_Plan_Zaplanovani = "boolean", Param_Plan_Schvaleni = "boolean", Parametr_Zobrazeni_AG_Detailu_KDF = "boolean", Parametr_Zobrazeni_AG_Detailu_KOF = "boolean", Parametr_Zobrazeni_AG_Detailu_POU = "boolean", Parametr_Zobrazeni_AG_Detailu_PRE = "boolean", Parametr_Zobrazeni_AG_Detailu_EVZ = "boolean", Parametr_Zobrazeni_AG_Detailu_VFP = "boolean", Parametr_Zobrazeni_AG_Detailu_EPO = "boolean", Parametr_Zobrazeni_AG_Detailu_RZA = "boolean", Parametr_Zobrazeni_AG_Detailu_SML = "boolean", Parametr_Zobrazeni_AG_Detailu_OBJ = "boolean", Parametr_Zobrazeni_AG_Detailu_FUC = "boolean", Parametr_Zobrazeni_AG_Detailu_UCT = "boolean", Parametr_Zobrazeni_AG_Detailu_ROZ = "boolean", Aktual_Maj = "boolean", BAR_Typ_Inst = "Gordic.Ada.Interface.SrvTypIntalaceEnum", Moje_Cis_Real = "string", Pocet_Let_Plan = "number", cis_real = "string", te1_msk = "string", te1_msk_org = "string", te1_msk_nula = "string", b_te1_msk_full = "boolean", te1_msk_start = "number", te1_msk_stop = "number", rok_srv = "number", delka_akce = "number", nazev_prg_eds = "string", zacatek_prg_eds = "number", delka_prg_eds = "number", delka_kod_uct = "number", nazev_prj_eds = "string", zacatek_prj_eds = "number", delka_prj_eds = "number", titulek_ico_nazev = "string", titulek_ucs_nazev = "string", titulek_uus_nazev = "string", titulek_nks_nazev = "string", titulek_ico = "string", titulek_ucs = "string", titulek_uus = "string", titulek_nks = "string",}
	const enum GAdaGlobalsBaseTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Ada.Interface\Init\IGAdaKnihaInit.d.ts 

declare namespace Gordic.Ada.Interface {
	/**FilterAdaKniha*/
	const enum FilterAdaKniha {
		/**The ixp den*/
		ixp_den,
		/**The nazev*/
		nazev,
		/**The typ ag*/
		typ_ag,
		/**The KTG den*/
		ktg_den,
		/**The typ den*/
		typ_den,
		/**The NKS*/
		nks,
		/**The ucs*/
		ucs,
		/**The ico*/
		ico,
		/**The rok*/
		rok,
		/**The rok*/
		norok,
		/**The aktivita*/
		aktivita,
		/**The pouze akt obd*/
		pouzeAktObd,
		/**The prefix*/
		prefix,
		/**The suffix*/
		suffix,
		/**The suffix*/
		subrada,
	}
}

//#endregion

