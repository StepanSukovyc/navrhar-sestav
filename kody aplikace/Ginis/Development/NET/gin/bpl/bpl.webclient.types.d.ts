/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       bpl.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Bpl.WebClient\Gordic.Bpl.WebClient.csproj
*    created     2026-02-16 14:33:58
*    files       Controls\Kontace\Dto\VstupySchvaleniDto.d.ts
*                DTO\GDphDto.d.ts
*                DTO\GEkosuvlDto.d.ts
*                DTO\GHromadneOperaceParametryDto.d.ts
*                DTO\GRozvrhErrorDto.d.ts
*                DTO\GSchvaleniResultDto.d.ts
*                DTO\GUctdddeDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Bpl.WebClient\Controls\Kontace\Dto\VstupySchvaleniDto.d.ts 

declare namespace Gordic.Bpl.WebClient {
	/**Vstupy pro metodu schválení krytí/likvidace*/
	interface VstupySchvaleniDto {
		/**zda je v pořádku dph1*/
		confirmDph1?: boolean|null;
		/**zda je v pořádku dph2*/
		confirmDph2?: boolean|null;
		/**zda je v pořádku dph3*/
		confirmDph3?: boolean|null;
		/**zda spouštět schvalovací storovku s parametrem schválit bez kontroly*/
		confirmSchvaleniBezKontroly?: boolean|null;
		/**zda zobrazovat dialog pro výběr subřady, je-li třeba, když je false, už byl zobrazen a nezobrazuj znovu*/
		zobrazovatDialogVyberSubradu?: boolean|null;
		/**Subřada*/
		subrada?: number|null;
		/**Uus*/
		uus?: string|null;
		/**Dvojí účtování*/
		dvojiUctovani?: boolean|null;
		/**ixsEsu*/
		ixsEsu?: string|null;
	}
	const enum VstupySchvaleniDtoNames { confirmDph1 = "confirmDph1", confirmDph2 = "confirmDph2", confirmDph3 = "confirmDph3", confirmSchvaleniBezKontroly = "confirmSchvaleniBezKontroly", zobrazovatDialogVyberSubradu = "zobrazovatDialogVyberSubradu", subrada = "subrada", uus = "uus", dvojiUctovani = "dvojiUctovani", ixsEsu = "ixsEsu",}
	const enum VstupySchvaleniDtoFragments { confirmDph1 = "*", confirmDph2 = "*", confirmDph3 = "*", confirmSchvaleniBezKontroly = "*", zobrazovatDialogVyberSubradu = "*", subrada = "*", uus = "*", dvojiUctovani = "*", ixsEsu = "*",}
	const enum VstupySchvaleniDtoTypes { confirmDph1 = "boolean", confirmDph2 = "boolean", confirmDph3 = "boolean", confirmSchvaleniBezKontroly = "boolean", zobrazovatDialogVyberSubradu = "boolean", subrada = "number", uus = "string", dvojiUctovani = "boolean", ixsEsu = "string",}
	const enum VstupySchvaleniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.WebClient\DTO\GDphDto.d.ts 

declare namespace Gordic.Bpl.WebClient {
	/**DTO k DPH*/
	interface GDphDto {
		/**Částka bez DPH*/
		c_z0?: JsonDecimal|null;
		c_z1?: JsonDecimal|null;
		c_d1?: JsonDecimal|null;
		c_z2?: JsonDecimal|null;
		c_d2?: JsonDecimal|null;
		c_z3?: JsonDecimal|null;
		c_d3?: JsonDecimal|null;
		c_z1_d?: JsonDecimal|null;
		c_d1_d?: JsonDecimal|null;
		c_z2_d?: JsonDecimal|null;
		c_d2_d?: JsonDecimal|null;
		c_z3_d?: JsonDecimal|null;
		c_d3_d?: JsonDecimal|null;
		c_zaokr?: JsonDecimal|null;
		prvniNazev?: string|null;
		druhyNazev?: string|null;
	}
	const enum GDphDtoNames { c_z0 = "c_z0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_z3 = "c_z3", c_d3 = "c_d3", c_z1_d = "c_z1_d", c_d1_d = "c_d1_d", c_z2_d = "c_z2_d", c_d2_d = "c_d2_d", c_z3_d = "c_z3_d", c_d3_d = "c_d3_d", c_zaokr = "c_zaokr", prvniNazev = "prvniNazev", druhyNazev = "druhyNazev",}
	const enum GDphDtoFragments { c_z0 = "*", c_z1 = "*", c_d1 = "*", c_z2 = "*", c_d2 = "*", c_z3 = "*", c_d3 = "*", c_z1_d = "*", c_d1_d = "*", c_z2_d = "*", c_d2_d = "*", c_z3_d = "*", c_d3_d = "*", c_zaokr = "*", prvniNazev = "*", druhyNazev = "*",}
	const enum GDphDtoTypes { c_z0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z1_d = "JsonDecimal", c_d1_d = "JsonDecimal", c_z2_d = "JsonDecimal", c_d2_d = "JsonDecimal", c_z3_d = "JsonDecimal", c_d3_d = "JsonDecimal", c_zaokr = "JsonDecimal", prvniNazev = "string", druhyNazev = "string",}
	const enum GDphDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.WebClient\DTO\GEkosuvlDto.d.ts 

declare namespace Gordic.Bpl.WebClient {
	/**DTO k vlastním bankovním účtům*/
	interface GEkosuvlDto {
		/**Subrada*/
		subrada_duz?: number|null;
		/**Uus*/
		uus?: string|null;
	}
	const enum GEkosuvlDtoNames { subrada_duz = "subrada_duz", uus = "uus",}
	const enum GEkosuvlDtoFragments { subrada_duz = "*", uus = "*",}
	const enum GEkosuvlDtoTypes { subrada_duz = "number", uus = "string",}
	const enum GEkosuvlDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.WebClient\DTO\GHromadneOperaceParametryDto.d.ts 

declare namespace Gordic.Bpl.WebClient {
	/**DTO pro přenos parametrů z doplňkových parametrů z dialogů hromadných operací*/
	interface GHromadneOperaceParametryDto {
		/**Důvod - storno + odstorno + redistribuce*/
		Duvod?: string|null;
		/**Stav - změna stavu zaúčtování*/
		Stav?: number|null;
		/**Kniha - cílová kniha pro přeevidenci*/
		ixp_den?: string|null;
		/**Kniha - rok knihy pro přeevidenci*/
		rok?: number|null;
		/**Zpracovatel - cílová zpracovatel pro redistribuci*/
		ixs_fun_akt?: string|null;
		/**Zpracovatel - cílový referent*/
		ixs_ref?: string|null;
		/**Kompetent - cílový kompetent pro redistribuci*/
		ixs_fun_vyriz?: string|null;
		/**Kompetent - cílový kompetent pro redistribuci*/
		cis_real?: string|null;
		/**Kompetent - cílový uzel pro redistribuci*/
		ixs_SU?: string|null;
		/**Zatrženo - Změnit kompetenta*/
		Kompetent?: boolean|null;
		/**Zatrženo - související dokumenty*/
		SouvisejiciDokumenty?: boolean|null;
	}
	const enum GHromadneOperaceParametryDtoNames { Duvod = "Duvod", Stav = "Stav", ixp_den = "ixp_den", rok = "rok", ixs_fun_akt = "ixs_fun_akt", ixs_ref = "ixs_ref", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", ixs_SU = "ixs_SU", Kompetent = "Kompetent", SouvisejiciDokumenty = "SouvisejiciDokumenty",}
	const enum GHromadneOperaceParametryDtoFragments { Duvod = "*", Stav = "*", ixp_den = "*", rok = "*", ixs_fun_akt = "*", ixs_ref = "*", ixs_fun_vyriz = "*", cis_real = "*", ixs_SU = "*", Kompetent = "*", SouvisejiciDokumenty = "*",}
	const enum GHromadneOperaceParametryDtoTypes { Duvod = "string", Stav = "number", ixp_den = "string", rok = "number", ixs_fun_akt = "string", ixs_ref = "string", ixs_fun_vyriz = "string", cis_real = "string", ixs_SU = "string", Kompetent = "boolean", SouvisejiciDokumenty = "boolean",}
	const enum GHromadneOperaceParametryDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.WebClient\DTO\GRozvrhErrorDto.d.ts 

declare namespace Gordic.Bpl.WebClient {
	/**DTO k Rozvrhu error*/
	interface GRozvrhErrorDto {
		/**Slovo, které je potreba pořídit*/
		poradi?: number|null;
		/**Možnost pořízení do rozvrhu*/
		moznostPorizeni?: number|null;
		/**Řádek pro pořízení do rozvrhu*/
		radekRozvrhu?: Gordic.Eko.Interface.GUctdrozMoreDto|null;
	}
	const enum GRozvrhErrorDtoNames { poradi = "poradi", moznostPorizeni = "moznostPorizeni", radekRozvrhu = "radekRozvrhu",}
	const enum GRozvrhErrorDtoFragments { poradi = "*", moznostPorizeni = "*", radekRozvrhu = "*",}
	const enum GRozvrhErrorDtoTypes { poradi = "number", moznostPorizeni = "number", radekRozvrhu = "Gordic.Eko.Interface.GUctdrozMoreDto",}
	const enum GRozvrhErrorDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.WebClient\DTO\GSchvaleniResultDto.d.ts 

declare namespace Gordic.Bpl.WebClient {
	/**DTO ke schválení rozvrhu*/
	interface GSchvaleniResultDto {
		/**Zda storovka dopadla bez chyby*/
		success?: boolean|null;
		/**Zda má uživatel možnost schválit bez kontroly přečerpání*/
		moznostSchvalitBezKontroly?: boolean|null;
		/**Hláška ze storovky*/
		message?: string|null;
		/**Chyba na rozvrh*/
		rozvrhErrorDto?: Gordic.Bpl.WebClient.GRozvrhErrorDto|null;
		/**Od jakého místa se má znovu spustit kontrola testDph()*/
		dphStartPoint?: number|null;
	}
	const enum GSchvaleniResultDtoNames { success = "success", moznostSchvalitBezKontroly = "moznostSchvalitBezKontroly", message = "message", rozvrhErrorDto = "rozvrhErrorDto", dphStartPoint = "dphStartPoint",}
	const enum GSchvaleniResultDtoFragments { success = "*", moznostSchvalitBezKontroly = "*", message = "*", rozvrhErrorDto = "*", dphStartPoint = "*",}
	const enum GSchvaleniResultDtoTypes { success = "boolean", moznostSchvalitBezKontroly = "boolean", message = "string", rozvrhErrorDto = "Gordic.Bpl.WebClient.GRozvrhErrorDto", dphStartPoint = "number",}
	const enum GSchvaleniResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.WebClient\DTO\GUctdddeDto.d.ts 

declare namespace Gordic.Bpl.WebClient {
	/**DBTABLE:uctddde*/
	interface GUctdddeDto {
		/**DBCOLUMN:uctddde.rok*/
		rok?: number|null;
		/**DBCOLUMN:uctddde.ico*/
		ico?: string|null;
		/**DBCOLUMN:uctddde.subrada*/
		subrada?: number|null;
		/**DBCOLUMN:uctddde.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:uctddde.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:uctddde.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:uctddde.ac_cislo_do*/
		ac_cislo_do?: number|null;
		/**DBCOLUMN:uctddde.ac_cislo_od*/
		ac_cislo_od?: number|null;
		/**DBCOLUMN:uctddde.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:uctddde.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:uctddde.mesic_od*/
		mesic_od?: number|null;
	}
	const enum GUctdddeDtoNames { rok = "rok", ico = "ico", subrada = "subrada", zkratka = "zkratka", nazev = "nazev", aktivita = "aktivita", ac_cislo_do = "ac_cislo_do", ac_cislo_od = "ac_cislo_od", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mesic_od = "mesic_od",}
	const enum GUctdddeDtoFragments { rok = "*", ico = "*", subrada = "*", zkratka = "*", nazev = "*", aktivita = "*", ac_cislo_do = "*", ac_cislo_od = "*", dat_zmena = "*", zmenu_prov = "*", mesic_od = "*",}
	const enum GUctdddeDtoTypes { rok = "number", ico = "string", subrada = "number", zkratka = "string", nazev = "string", aktivita = "number", ac_cislo_do = "number", ac_cislo_od = "number", dat_zmena = "JsonDate", zmenu_prov = "string", mesic_od = "number",}
	const enum GUctdddeDtoTypeLengths { ico = 10, zkratka = 16, nazev = 50, zmenu_prov = 12,}
}

//#endregion

