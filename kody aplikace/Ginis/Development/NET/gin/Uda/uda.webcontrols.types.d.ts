/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       uda.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Uda.WebControls\Gordic.Uda.WebControls.csproj
*    created     2026-02-16 14:34:01
*    files       Uda\ObecneTestyDto.d.ts
*                Uda\SamplePageDto.d.ts
*                Uda\VyveseniTabs\GVyveseniTabsDto.d.ts
*                Uda\VyveseniTabs\SouborDto.d.ts
*                Uda\VyveseniTabs\VyveseniHistDto.d.ts
*                Uda\Zaznamy\SeznamVyveseniDto.d.ts
*                Uda\ZverejneniTabs\ZverejneniDto.d.ts
*                Uda\ZverejneniTabs\ZverejneniHistDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\ObecneTestyDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Model pro zveřejnění*/
	interface ObecneTestyDto {
		/**Název*/
		nazev?: string|null;
		/**Popis*/
		popis?: string|null;
	}
	const enum ObecneTestyDtoNames { nazev = "nazev", popis = "popis",}
	const enum ObecneTestyDtoFragments { nazev = "*", popis = "*",}
	const enum ObecneTestyDtoTypes { nazev = "string", popis = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\SamplePageDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Model pro SamplePage*/
	interface SamplePageDto {
		/**Ixp*/
		ixp?: string|null;
	}
	const enum SamplePageDtoNames { ixp = "ixp",}
	const enum SamplePageDtoFragments { ixp = "*",}
	const enum SamplePageDtoTypes { ixp = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\VyveseniTabs\GVyveseniTabsDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Model pro vyvěšení*/
	interface VyveseniTabsDto {
		ixp?: string|null;
		ixb?: string|null;
		nazev?: string|null;
		/**Popis vyvěšení*/
		popis?: string|null;
		uloziste?: string|null;
		slozka?: string|null;
		dat_od?: JsonDate|null;
		dat_do?: JsonDate|null;
		flash?: string|null;
		/**Možno zobrazit el. obraz a přílohu*/
		lze_zobrazit?: boolean|null;
		/**Možno zveřejnit el. obraz*/
		lze_zverejnit_obr?: boolean|null;
		/**Možno zveřejnit přílohu*/
		lze_zverejnit_pri?: boolean|null;
		/**Soubory – všechny (z nich uživatel vybírá)*/
		souboryVsechny?: Gordic.Uda.WebControls.SouborDto[]|null;
		/**Soubory – inicializačně zaškrtnuté*/
		souboryZverejnitAtStart?: Gordic.Uda.WebControls.SouborDto[]|null;
		/**Soubory – ke zveřejnění (ty uživatel zaškrtl)*/
		souboryZverejnit?: Gordic.Uda.WebControls.SouborDto[]|null;
		/**Historie*/
		historie?: Gordic.Uda.WebControls.VyveseniHistDto[]|null;
		/**Automatické vyvěšování vs návrh*/
		is_automaticke_vyveseni?: boolean|null;
		/**Cílový stav vyvěšení*/
		stav?: string|null;
	}
	const enum VyveseniTabsDtoNames { ixp = "ixp", ixb = "ixb", nazev = "nazev", popis = "popis", uloziste = "uloziste", slozka = "slozka", dat_od = "dat_od", dat_do = "dat_do", flash = "flash", lze_zobrazit = "lze_zobrazit", lze_zverejnit_obr = "lze_zverejnit_obr", lze_zverejnit_pri = "lze_zverejnit_pri", souboryVsechny = "souboryVsechny", souboryZverejnitAtStart = "souboryZverejnitAtStart", souboryZverejnit = "souboryZverejnit", historie = "historie", is_automaticke_vyveseni = "is_automaticke_vyveseni", stav = "stav",}
	const enum VyveseniTabsDtoFragments { ixp = "*", ixb = "*", nazev = "*", popis = "*", uloziste = "*", slozka = "*", dat_od = "*", dat_do = "*", flash = "*", lze_zobrazit = "*", lze_zverejnit_obr = "*", lze_zverejnit_pri = "*", souboryVsechny = "*", souboryZverejnitAtStart = "*", souboryZverejnit = "*", historie = "*", is_automaticke_vyveseni = "*", stav = "*",}
	const enum VyveseniTabsDtoTypes { ixp = "string", ixb = "string", nazev = "string", popis = "string", uloziste = "string", slozka = "string", dat_od = "JsonDate", dat_do = "JsonDate", flash = "string", lze_zobrazit = "boolean", lze_zverejnit_obr = "boolean", lze_zverejnit_pri = "boolean", souboryVsechny = "Gordic.Uda.WebControls.SouborDto[]", souboryZverejnitAtStart = "Gordic.Uda.WebControls.SouborDto[]", souboryZverejnit = "Gordic.Uda.WebControls.SouborDto[]", historie = "Gordic.Uda.WebControls.VyveseniHistDto[]", is_automaticke_vyveseni = "boolean", stav = "string",}
	const enum VyveseniTabsDtoTypeLengths { ixp = 12, nazev = 254, popis = 1000,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\VyveseniTabs\SouborDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Soubor*/
	interface SouborDto {
		is_checked?: boolean|null;
		/**1 pro el. obraz / 0 pro přílohu*/
		typ?: number|null;
		typ_txt?: string|null;
		ixs_ulo?: string|null;
		ixb?: string|null;
		soubor?: string|null;
		poznamka?: string|null;
	}
	const enum SouborDtoNames { is_checked = "is_checked", typ = "typ", typ_txt = "typ_txt", ixs_ulo = "ixs_ulo", ixb = "ixb", soubor = "soubor", poznamka = "poznamka",}
	const enum SouborDtoFragments { is_checked = "*", typ = "*", typ_txt = "*", ixs_ulo = "*", ixb = "*", soubor = "*", poznamka = "*",}
	const enum SouborDtoTypes { is_checked = "boolean", typ = "number", typ_txt = "string", ixs_ulo = "string", ixb = "string", soubor = "string", poznamka = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\VyveseniTabs\VyveseniHistDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Seznam historie vyvěšení*/
	interface VyveseniHistDto {
		ixs_ulo?: string|null;
		por_cislo?: number|null;
		ixs_ulo_and_por_cislo?: string|null;
		stav?: string|null;
		nazev_kat?: string|null;
		nazev?: string|null;
		nazev_zdroj?: string|null;
		dat_od?: JsonDate|null;
		dat_do?: JsonDate|null;
		popis?: string|null;
		nazev_ref?: string|null;
		dat_zmena?: JsonDate|null;
		zmenu_prov_txt?: string|null;
		SouboryHistorie?: Gordic.Uda.Interface.SeznamPrilohDto[]|null;
	}
	const enum VyveseniHistDtoNames { ixs_ulo = "ixs_ulo", por_cislo = "por_cislo", ixs_ulo_and_por_cislo = "ixs_ulo_and_por_cislo", stav = "stav", nazev_kat = "nazev_kat", nazev = "nazev", nazev_zdroj = "nazev_zdroj", dat_od = "dat_od", dat_do = "dat_do", popis = "popis", nazev_ref = "nazev_ref", dat_zmena = "dat_zmena", zmenu_prov_txt = "zmenu_prov_txt", SouboryHistorie = "SouboryHistorie",}
	const enum VyveseniHistDtoFragments { ixs_ulo = "*", por_cislo = "*", ixs_ulo_and_por_cislo = "*", stav = "*", nazev_kat = "*", nazev = "*", nazev_zdroj = "*", dat_od = "*", dat_do = "*", popis = "*", nazev_ref = "*", dat_zmena = "*", zmenu_prov_txt = "*", SouboryHistorie = "*",}
	const enum VyveseniHistDtoTypes { ixs_ulo = "string", por_cislo = "number", ixs_ulo_and_por_cislo = "string", stav = "string", nazev_kat = "string", nazev = "string", nazev_zdroj = "string", dat_od = "JsonDate", dat_do = "JsonDate", popis = "string", nazev_ref = "string", dat_zmena = "JsonDate", zmenu_prov_txt = "string", SouboryHistorie = "Gordic.Uda.Interface.SeznamPrilohDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\Zaznamy\SeznamVyveseniDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Model pro SeznamVyveseni*/
	interface SeznamVyveseniDto {
		/**Ixp*/
		ixp?: string|null;
	}
	const enum SeznamVyveseniDtoNames { ixp = "ixp",}
	const enum SeznamVyveseniDtoFragments { ixp = "*",}
	const enum SeznamVyveseniDtoTypes { ixp = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\ZverejneniTabs\ZverejneniDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Model pro zveřejnění*/
	interface ZverejneniDto {
		/**Ixb souboru*/
		ixb?: string|null;
		/**Ixp dokladu*/
		ixp?: string|null;
		/**zda zobrazit okno pro zveřejnění (s historií) nebo jen historii*/
		hist_only?: boolean|null;
		soubor?: string|null;
		typ?: string|null;
		nazev?: string|null;
		/**Popis zveřejnění*/
		popis?: string|null;
		uloziste?: string|null;
		slozka?: string|null;
		flash?: string|null;
		lze_zverejnit?: number|null;
		/**Historie zveřejnění*/
		historie?: Gordic.Uda.WebControls.ZverejneniHistDto[]|null;
	}
	const enum ZverejneniDtoNames { ixb = "ixb", ixp = "ixp", hist_only = "hist_only", soubor = "soubor", typ = "typ", nazev = "nazev", popis = "popis", uloziste = "uloziste", slozka = "slozka", flash = "flash", lze_zverejnit = "lze_zverejnit", historie = "historie",}
	const enum ZverejneniDtoFragments { ixb = "*", ixp = "*", hist_only = "*", soubor = "*", typ = "*", nazev = "*", popis = "*", uloziste = "*", slozka = "*", flash = "*", lze_zverejnit = "*", historie = "*",}
	const enum ZverejneniDtoTypes { ixb = "string", ixp = "string", hist_only = "boolean", soubor = "string", typ = "string", nazev = "string", popis = "string", uloziste = "string", slozka = "string", flash = "string", lze_zverejnit = "number", historie = "Gordic.Uda.WebControls.ZverejneniHistDto[]",}
	const enum ZverejneniDtoTypeLengths { ixb = 12, nazev = 254, popis = 1000,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Uda.WebControls\Uda\ZverejneniTabs\ZverejneniHistDto.d.ts 

declare namespace Gordic.Uda.WebControls {
	/**Seznam historie zveřejnění*/
	interface ZverejneniHistDto {
		ixb?: string|null;
		dat_zmena?: JsonDate|null;
		nazev_ulz?: string|null;
		nazev_sloz?: string|null;
		nazev_rf?: string|null;
		soubor?: string|null;
		titulek?: string|null;
		popis?: string|null;
	}
	const enum ZverejneniHistDtoNames { ixb = "ixb", dat_zmena = "dat_zmena", nazev_ulz = "nazev_ulz", nazev_sloz = "nazev_sloz", nazev_rf = "nazev_rf", soubor = "soubor", titulek = "titulek", popis = "popis",}
	const enum ZverejneniHistDtoFragments { ixb = "*", dat_zmena = "*", nazev_ulz = "*", nazev_sloz = "*", nazev_rf = "*", soubor = "*", titulek = "*", popis = "*",}
	const enum ZverejneniHistDtoTypes { ixb = "string", dat_zmena = "JsonDate", nazev_ulz = "string", nazev_sloz = "string", nazev_rf = "string", soubor = "string", titulek = "string", popis = "string",}
}

//#endregion

