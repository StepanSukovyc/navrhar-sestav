/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       spi.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Spi.Client\Gordic.Spi.Client.csproj
*    created     2026-02-16 14:33:49
*    files       spi.fields.d.ts
*                Others\SpiDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Spi.Client\spi.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - Spisovny
    * keys: ["ixs_ska"]
    * columns: ["ixs_ska", "ixs_spi", "nazev", "nazev_add", "skar_znak", "priz_skar", "priz_mimskr", "priz_ske", "rok_skartace", "aktivita", "ixs_esu", "dat_zmena", "zmenu_prov", "nazev_rf"]
    * filters: ["nazev","ixs_spi","ixs_ska","priz_skar","priz_mimskr","aktivita","PouzeSNesmazanymObsahem"]
    */
    class Spisska extends Base<Gordic.Spi.Interface.GSpisskaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SpisskaDto = Gordic.Spi.Interface.GSpisskaDto;
    type SpisskaDtoNames = Gordic.Spi.Interface.GSpisskaDtoNames;
    type SpisskaDtoFragments = Gordic.Spi.Interface.GSpisskaDtoFragments;
    type SpisskaDtoTypes = Gordic.Spi.Interface.GSpisskaDtoTypes;
    type SpisskaDtoTypeLengths = Gordic.Spi.Interface.GSpisskaDtoTypeLengths;

    /**
    * Klientská část AL - Úložná místa
    * keys: ["ixs_ulm"]
    * columns: ["ixs_ulm","aktivita","popis","budova_kod","segment_kod","mistnost_kod","budova_naz","segment_naz","mistnost_naz","ixs_spi"]
    * filters: ["ixs_ulm","aktivita","mistnost_kod","budova_kod","segment_kod","kod_tyu","ixs_spi","popis"]
    */
    class SpiSpisulm extends Base<Gordic.Spi.Interface.GSpisulmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SpiSpisulmDto = Gordic.Spi.Interface.GSpisulmDto;
    type SpiSpisulmDtoNames = Gordic.Spi.Interface.GSpisulmDtoNames;
    type SpiSpisulmDtoFragments = Gordic.Spi.Interface.GSpisulmDtoFragments;
    type SpiSpisulmDtoTypes = Gordic.Spi.Interface.GSpisulmDtoTypes;
    type SpiSpisulmDtoTypeLengths = Gordic.Spi.Interface.GSpisulmDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - Spisovny
    * FieldOptions
    * itemTemplate: "{nazev_add}"
    * helperColumns: ["nazev_add", "skar_znak", "ixs_ska"]
    *
    * DataReader
    * keys: ["ixs_ska"]
    * columns: ["ixs_ska", "ixs_spi", "nazev", "nazev_add", "skar_znak", "priz_skar", "priz_mimskr", "priz_ske", "rok_skartace", "aktivita", "ixs_esu", "dat_zmena", "zmenu_prov", "nazev_rf"]
    * filters: ["nazev","ixs_spi","ixs_ska","priz_skar","priz_mimskr","aktivita","PouzeSNesmazanymObsahem"]
    */
    function spisska(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Spi.Interface.GSpisskaDto>): GSelectBoxOptions<Gordic.Spi.Interface.GSpisskaDto>;
    /**
    * Klientská část AL - Úložná místa
    * FieldOptions
    * itemTemplate: "{popis}"
    * helperColumns: ["popis", "ixs_ulm"]
    *
    * DataReader
    * keys: ["ixs_ulm"]
    * columns: ["ixs_ulm","aktivita","popis","budova_kod","segment_kod","mistnost_kod","budova_naz","segment_naz","mistnost_naz","ixs_spi"]
    * filters: ["ixs_ulm","aktivita","mistnost_kod","budova_kod","segment_kod","kod_tyu","ixs_spi","popis"]
    */
    function spiSpisulm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Spi.Interface.GSpisulmDto>): GSelectBoxOptions<Gordic.Spi.Interface.GSpisulmDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská část AL - Spisovny
    */
    function spisska(): Selectors.DefaultSelectorOptions<Gordic.Spi.Interface.GSpisskaDto>;
    /**
    * Klientská část AL - Úložná místa
    */
    function spiSpisulm(): Selectors.DefaultSelectorOptions<Gordic.Spi.Interface.GSpisulmDto>;}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Client\Others\SpiDto.d.ts 

declare namespace Gordic.Spi.Client {
	/**filtr prevzatych do spisovny*/
	interface GPrehledPrevzatychFilterDto {
		/**Datum vzniku*/
		Datum?: Gordic.Wfl.Interface.Lists.WflDateIntervalDto|null;
		/**vlastní*/
		Vlastni?: boolean|null;
		/**predano ze spisovny*/
		ZeSpisovny?: boolean|null;
		/**Predavajici*/
		Predavajici?: Gordic.Wfl.Interface.GSuFunRefDto|null;
		/**Predavajici spisovna*/
		IxsSpiPredavajici?: string|null;
	}
	const enum GPrehledPrevzatychFilterDtoNames { Datum = "Datum", Vlastni = "Vlastni", ZeSpisovny = "ZeSpisovny", Predavajici = "Predavajici", IxsSpiPredavajici = "IxsSpiPredavajici",}
	const enum GPrehledPrevzatychFilterDtoFragments { Datum = "*", Vlastni = "*", ZeSpisovny = "*", Predavajici = "*", IxsSpiPredavajici = "*",}
	const enum GPrehledPrevzatychFilterDtoTypes { Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", ZeSpisovny = "boolean", Predavajici = "Gordic.Wfl.Interface.GSuFunRefDto", IxsSpiPredavajici = "string",}
	const enum GPrehledPrevzatychFilterDtoTypeLengths {}
	/**filtr ulozenych do spisovny*/
	interface GPrehledUlozenychFilterDto {
		/**Stav sul*/
		StavSul?: number|null;
		/**Datum vzniku*/
		dat_vzniku?: GIntervalDto<JsonDate>|null;
		/**Datum vzniku*/
		dat_uloz_spi?: GIntervalDto<JsonDate>|null;
		/**vlastní*/
		Vlastni?: boolean|null;
		/**vlastní*/
		FiltrDleData?: boolean|null;
		/**vlastní*/
		VcetneVnorenychULM?: boolean|null;
		/**ixs ULM*/
		IxsUlm?: string|null;
	}
	const enum GPrehledUlozenychFilterDtoNames { StavSul = "StavSul", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", Vlastni = "Vlastni", FiltrDleData = "FiltrDleData", VcetneVnorenychULM = "VcetneVnorenychULM", IxsUlm = "IxsUlm",}
	const enum GPrehledUlozenychFilterDtoFragments { StavSul = "*", dat_vzniku = "*", dat_uloz_spi = "*", Vlastni = "*", FiltrDleData = "*", VcetneVnorenychULM = "*", IxsUlm = "*",}
	const enum GPrehledUlozenychFilterDtoTypes { StavSul = "number", dat_vzniku = "GIntervalDto<JsonDate>", dat_uloz_spi = "GIntervalDto<JsonDate>", Vlastni = "boolean", FiltrDleData = "boolean", VcetneVnorenychULM = "boolean", IxsUlm = "string",}
	const enum GPrehledUlozenychFilterDtoTypeLengths {}
	/**filtr baliku*/
	interface GSeznamDokSpisFilterDto {
		/**Datum odeslani*/
		Datum?: Gordic.Wfl.Interface.Lists.WflDateIntervalDto|null;
		/**vlastní*/
		Vlastni?: boolean|null;
		/**vlastní*/
		Rok?: number|null;
	}
	const enum GSeznamDokSpisFilterDtoNames { Datum = "Datum", Vlastni = "Vlastni", Rok = "Rok",}
	const enum GSeznamDokSpisFilterDtoFragments { Datum = "*", Vlastni = "*", Rok = "*",}
	const enum GSeznamDokSpisFilterDtoTypes { Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", Rok = "number",}
	const enum GSeznamDokSpisFilterDtoTypeLengths {}
	/**prehled vypujcek dto*/
	interface GPrehledVypujcekFilterDto extends Gordic.Spi.Client.GSeznamDokSpisFilterDto {
		/**typ vypujceni*/
		TypVypujceni?: Gordic.Spi.Interface.TypVypujceniEnum|null;
		/**stav vypujcky*/
		StavVypujceni?: Gordic.Spi.Interface.StavVypujceniEnum|null;
		/**typ seznamu*/
		TypSeznamuVypujcek?: Gordic.Spi.Interface.TypSeznamuVypujcekEnum|null;
		/**spisovna, ze které bylo vypujceno*/
		ZeSpisovny?: string|null;
		/**PID vypujcniho listku*/
		IxsVyl?: string|null;
		/**interní subjekt ktery si vypujcil*/
		InterniSubjekt?: Gordic.Wfl.Interface.GSuFunRefDto|null;
		/**ixs ESU, ketrý si vypujcil*/
		ExterniSubject?: Gordic.Wfl.Interface.GEsuIxsStruktura|null;
	}
	const enum GPrehledVypujcekFilterDtoNames { TypVypujceni = "TypVypujceni", StavVypujceni = "StavVypujceni", TypSeznamuVypujcek = "TypSeznamuVypujcek", ZeSpisovny = "ZeSpisovny", IxsVyl = "IxsVyl", InterniSubjekt = "InterniSubjekt", ExterniSubject = "ExterniSubject", Datum = "Datum", Vlastni = "Vlastni", Rok = "Rok",}
	const enum GPrehledVypujcekFilterDtoFragments { TypVypujceni = "*", StavVypujceni = "*", TypSeznamuVypujcek = "*", ZeSpisovny = "*", IxsVyl = "*", InterniSubjekt = "*", ExterniSubject = "*", Datum = "*", Vlastni = "*", Rok = "*",}
	const enum GPrehledVypujcekFilterDtoTypes { TypVypujceni = "Gordic.Spi.Interface.TypVypujceniEnum", StavVypujceni = "Gordic.Spi.Interface.StavVypujceniEnum", TypSeznamuVypujcek = "Gordic.Spi.Interface.TypSeznamuVypujcekEnum", ZeSpisovny = "string", IxsVyl = "string", InterniSubjekt = "Gordic.Wfl.Interface.GSuFunRefDto", ExterniSubject = "Gordic.Wfl.Interface.GEsuIxsStruktura", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", Rok = "number",}
	const enum GPrehledVypujcekFilterDtoTypeLengths {}
	/**filtr TypSeznamu Spi*/
	interface GTypSeznamuSpiFilterDto {
		/**samostatné dok. spis / v balíku*/
		TypSeznamu?: Gordic.Spi.Interface.TypSeznamuSpi|null;
	}
	const enum GTypSeznamuSpiFilterDtoNames { TypSeznamu = "TypSeznamu",}
	const enum GTypSeznamuSpiFilterDtoFragments { TypSeznamu = "*",}
	const enum GTypSeznamuSpiFilterDtoTypes { TypSeznamu = "Gordic.Spi.Interface.TypSeznamuSpi",}
	const enum GTypSeznamuSpiFilterDtoTypeLengths {}
	/**filtr baliku*/
	interface GSeznamKPrevzetiDoSpisovnyFilterDto extends Gordic.Spi.Interface.GPrevzetiDoSpisovnyBaseDto {
		/**Datum odeslani*/
		Datum?: GIntervalDto<JsonDate>|null;
		/**vlastní*/
		Vlastni?: boolean|null;
		/**typ akce s umistenim*/
		AkceSUmistenim?: Gordic.Spi.Interface.TypAkceSUmistenim|null;
		/**typ pisemnosti*/
		IxsTyp?: string|null;
		/**spisovy plan*/
		SpPlan?: string|null;
		/**spisovy znak*/
		SpZnak?: string|null;
		/**Vcetne podrizenych sp.znaku*/
		VcetnePodrizeneSpZnaky?: boolean|null;
		/**typ externi agendy*/
		TypAg?: number|null;
		/**typ externi agendy*/
		TypFiltrDleDatumu?: Gordic.Wfl.Interface.TypFiltrDleDatumu|null;
		/**Typ seznamu*/
		TypSeznamu?: Gordic.Spi.Interface.TypDokSpisKPrevzeti|null;
		/**Uzavrit pri prevzeti*/
		Uzavrit?: boolean|null;
		/**Smazat umistenii*/
		SmazatUmisteni?: boolean|null;
	}
	const enum GSeznamKPrevzetiDoSpisovnyFilterDtoNames { Datum = "Datum", Vlastni = "Vlastni", AkceSUmistenim = "AkceSUmistenim", IxsTyp = "IxsTyp", SpPlan = "SpPlan", SpZnak = "SpZnak", VcetnePodrizeneSpZnaky = "VcetnePodrizeneSpZnaky", TypAg = "TypAg", TypFiltrDleDatumu = "TypFiltrDleDatumu", TypSeznamu = "TypSeznamu", Uzavrit = "Uzavrit", SmazatUmisteni = "SmazatUmisteni", IxsSuPredavajici = "IxsSuPredavajici", IxsFunPredavajici = "IxsFunPredavajici", IxsSpisovnyOd = "IxsSpisovnyOd", TypPrevzeti = "TypPrevzeti", IxsBaliku = "IxsBaliku", IxsUmisteni = "IxsUmisteni", PrevzitProMimSkartaci = "PrevzitProMimSkartaci", CelySU = "CelySU", Selected = "Selected", logPorCislo = "logPorCislo", ikc = "ikc",}
	const enum GSeznamKPrevzetiDoSpisovnyFilterDtoFragments { Datum = "*", Vlastni = "*", AkceSUmistenim = "*", IxsTyp = "*", SpPlan = "*", SpZnak = "*", VcetnePodrizeneSpZnaky = "*", TypAg = "*", TypFiltrDleDatumu = "*", TypSeznamu = "*", Uzavrit = "*", SmazatUmisteni = "*", IxsSuPredavajici = "*", IxsFunPredavajici = "*", IxsSpisovnyOd = "*", TypPrevzeti = "*", IxsBaliku = "*", IxsUmisteni = "*", PrevzitProMimSkartaci = "*", CelySU = "*", Selected = "*", logPorCislo = "*", ikc = "*",}
	const enum GSeznamKPrevzetiDoSpisovnyFilterDtoTypes { Datum = "GIntervalDto<JsonDate>", Vlastni = "boolean", AkceSUmistenim = "Gordic.Spi.Interface.TypAkceSUmistenim", IxsTyp = "string", SpPlan = "string", SpZnak = "string", VcetnePodrizeneSpZnaky = "boolean", TypAg = "number", TypFiltrDleDatumu = "Gordic.Wfl.Interface.TypFiltrDleDatumu", TypSeznamu = "Gordic.Spi.Interface.TypDokSpisKPrevzeti", Uzavrit = "boolean", SmazatUmisteni = "boolean", IxsSuPredavajici = "string", IxsFunPredavajici = "string", IxsSpisovnyOd = "string", TypPrevzeti = "Gordic.Spi.Interface.TypPrevzetiDoSpisovny", IxsBaliku = "string", IxsUmisteni = "string", PrevzitProMimSkartaci = "boolean", CelySU = "boolean", Selected = "string[]", logPorCislo = "number", ikc = "JsonDecimal",}
	const enum GSeznamKPrevzetiDoSpisovnyFilterDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GVyberSpiDto {
		/**Autogenerated.*/
		IxsSpi?: string|null;
		/**Autogenerated.*/
		Nazev?: string|null;
	}
	const enum GVyberSpiDtoNames { IxsSpi = "IxsSpi", Nazev = "Nazev",}
	const enum GVyberSpiDtoFragments { IxsSpi = "*", Nazev = "*",}
	const enum GVyberSpiDtoTypes { IxsSpi = "string", Nazev = "string",}
	const enum GVyberSpiDtoTypeLengths {}
}

//#endregion

