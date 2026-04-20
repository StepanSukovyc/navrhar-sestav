/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       eko.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Eko.WebClient\Gordic.Eko.WebClient.csproj
*    created     2026-02-16 14:33:52
*    files       Eko\Adp\UctRoz\cs\Dto\GPredkontaceDefAkceDto.d.ts
*                Eko\Adp\UctRoz\cs\Dto\GPredkontaceDto.d.ts
*                Eko\Adp\UctRoz\cs\Dto\GVybraneZapisyDto.d.ts
*                Eko\Cfu\GridFormatExtensions.d.ts
*                Eko\Doklady\DanovaEvidence\GDanovaEvidenceFormDto.d.ts
*                Eko\Doklady\DTO\GRedistribuceParametryDto.d.ts
*                Eko\Doklady\Smlouvy\GInputZUlohDto.d.ts
*                Eko\Doklady\Smlouvy\GVyberSmlouvyInitDto.d.ts
*                Eko\Doklady\Vazby\GNovaVazbaDto.d.ts
*                Eko\Doklady\Vazby\GVazbyDto.d.ts
*                Eko\Doklady\Zapisy\GZapisyDto.d.ts
*                Eko\Filters\GFilterOptionsDtoNG.d.ts
*                Eko\Magic\Dto\DataWordContent.d.ts
*                Eko\Magic\Dto\GDataSentenceDto.d.ts
*                Eko\Magic\Dto\GDataWordDto.d.ts
*                Eko\Magic\Dto\GDataWordsModelDto.d.ts
*                Eko\ObecneSeskupeni\GObecneSeskupeniDto.d.ts
*                Eko\ObecneSeskupeni\GObecneSeskupeniObsahDto.d.ts
*                Eko\ObecneSeskupeni\GObecneSeskupeniObsahRequestDto.d.ts
*                Eko\ObecneSeskupeni\GObecneSeskupeniRequestDto.d.ts
*                Eko\ObecneSeskupeni\GObecneSeskupeniSkoRequestDto.d.ts
*                Eko\Porizovac\DataSentence\DataSentence.d.ts
*                Eko\Porizovac\GNewRecordDlg\Dto\GDataSentenceCodesDto.d.ts
*                Eko\Porizovac\GNewRecordDlg\Dto\GNewRecordModelDto.d.ts
*                Eko\Porizovac\GNewRecordDlg\Dto\GTextCodeDto.d.ts
*                Eko\Rozbory\GEkoParamsDto.d.ts
*                Eko\Rozbory\GEkoPozadavekDetailDto.d.ts
*                Eko\Rozbory\GEkoReportInfoDto.d.ts
*                Eko\Rozbory\GFilterOptionsDto.d.ts
*                Eko\Rozbory\GFilterParamsDto.d.ts
*                Eko\UctRoz\definice.d.ts
*                Gin\Controls\GResponseDto.d.ts
*                Gin\Controls\GResponseInfoDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Adp\UctRoz\cs\Dto\GPredkontaceDefAkceDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO pro definici akce pro JS*/
	interface GPredkontaceDefAkceDto {
		/**pid smlouvy*/
		pidsml?: string|null;
		/**hodnota*/
		value?: string|null;
		/**radek smlouvy*/
		radeksml?: number|null;
		/**agendove cislo*/
		ac_sml?: string|null;
		/**rok smlouvy*/
		rok_sml?: number|null;
		/**Kopirovani z*/
		copyFrom?: Gordic.Eko.WebClient.GPredkontaceCopyDto|null;
		copyFromUEA?: Gordic.Eko.WebClient.GPredkontaceCopyDto|null;
		actionRadios?: string|null;
		radiosHodnotaNS?: string|null;
		/**Obraceni znamenka*/
		invertSign?: boolean|null;
		/**opcna strana*/
		oppositeSide?: boolean|null;
		fromHelp?: boolean|null;
		action?: Gordic.Eko.WebClient.GPredkontaceActionDto|null;
	}
	const enum GPredkontaceDefAkceDtoNames { pidsml = "pidsml", value = "value", radeksml = "radeksml", ac_sml = "ac_sml", rok_sml = "rok_sml", copyFrom = "copyFrom", copyFromUEA = "copyFromUEA", actionRadios = "actionRadios", radiosHodnotaNS = "radiosHodnotaNS", invertSign = "invertSign", oppositeSide = "oppositeSide", fromHelp = "fromHelp", action = "action",}
	const enum GPredkontaceDefAkceDtoFragments { pidsml = "*", value = "*", radeksml = "*", ac_sml = "*", rok_sml = "*", copyFrom = "*", copyFromUEA = "*", actionRadios = "*", radiosHodnotaNS = "*", invertSign = "*", oppositeSide = "*", fromHelp = "*", action = "*",}
	const enum GPredkontaceDefAkceDtoTypes { pidsml = "string", value = "string", radeksml = "number", ac_sml = "string", rok_sml = "number", copyFrom = "Gordic.Eko.WebClient.GPredkontaceCopyDto", copyFromUEA = "Gordic.Eko.WebClient.GPredkontaceCopyDto", actionRadios = "string", radiosHodnotaNS = "string", invertSign = "boolean", oppositeSide = "boolean", fromHelp = "boolean", action = "Gordic.Eko.WebClient.GPredkontaceActionDto",}
	const enum GPredkontaceDefAkceDtoTypeLengths {}
	interface GPredkontaceCopyDto {
		/**index kopirovaneho radku*/
		index?: number|null;
		/**Z predchazejiciho radku*/
		isPredchazejici?: boolean|null;
	}
	const enum GPredkontaceCopyDtoNames { index = "index", isPredchazejici = "isPredchazejici",}
	const enum GPredkontaceCopyDtoFragments { index = "*", isPredchazejici = "*",}
	const enum GPredkontaceCopyDtoTypes { index = "number", isPredchazejici = "boolean",}
	const enum GPredkontaceCopyDtoTypeLengths {}
	interface GPredkontaceActionDto {
		/**index kopirovaneho radku*/
		val?: number|null;
	}
	const enum GPredkontaceActionDtoNames { val = "val",}
	const enum GPredkontaceActionDtoFragments { val = "*",}
	const enum GPredkontaceActionDtoTypes { val = "number",}
	const enum GPredkontaceActionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Adp\UctRoz\cs\Dto\GPredkontaceDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO predavane do detailu predkontace v js*/
	interface GPredkontaceDto {
		/**Identifikator kontace*/
		IDKontace?: string|null;
		/**Identifikator kontace - zdroj kopie*/
		IDKontaceSource?: string|null;
		/**Jmeno kontace - zdroje kopie*/
		NazevSource?: string|null;
		/**Hlavicka kontace*/
		Hlavicka?: Gordic.Eko.Interface.GUctRozskonDto|null;
		/**Zapisy kontace*/
		Zapisy?: Gordic.Eko.Interface.GUctRozdkonDto[]|null;
		/**Modifykovany cfu pro predkontaci*/
		EkoCfuModify: Gordic.Gui.WebApp.GGridFormatDto;
		/**Povoleni zverejnit*/
		PovoleniZverejnit?: Gordic.Eko.Interface.GPredkontaceAkceDto|null;
	}
	const enum GPredkontaceDtoNames { IDKontace = "IDKontace", IDKontaceSource = "IDKontaceSource", NazevSource = "NazevSource", Hlavicka = "Hlavicka", Zapisy = "Zapisy", EkoCfuModify = "EkoCfuModify", PovoleniZverejnit = "PovoleniZverejnit",}
	const enum GPredkontaceDtoFragments { IDKontace = "*", IDKontaceSource = "*", NazevSource = "*", Hlavicka = "*", Zapisy = "*", EkoCfuModify = "*", PovoleniZverejnit = "*",}
	const enum GPredkontaceDtoTypes { IDKontace = "string", IDKontaceSource = "string", NazevSource = "string", Hlavicka = "Gordic.Eko.Interface.GUctRozskonDto", Zapisy = "Gordic.Eko.Interface.GUctRozdkonDto[]", EkoCfuModify = "Gordic.Gui.WebApp.GGridFormatDto", PovoleniZverejnit = "Gordic.Eko.Interface.GPredkontaceAkceDto",}
	const enum GPredkontaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Adp\UctRoz\cs\Dto\GVybraneZapisyDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DBTABLE:uctdpep*/
	interface GVybraneZapisyDto {
		/**DBCOLUMN:uctdpep.radek_z*/
		radek_z?: number|null;
		/**DBCOLUMN:uctdpep.ixp*/
		ixp?: string|null;
	}
	const enum GVybraneZapisyDtoNames { radek_z = "radek_z", ixp = "ixp",}
	const enum GVybraneZapisyDtoFragments { radek_z = "*", ixp = "*",}
	const enum GVybraneZapisyDtoTypes { radek_z = "number", ixp = "string",}
	const enum GVybraneZapisyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Cfu\GridFormatExtensions.d.ts 

declare namespace Gordic.Data {
    interface GridFormat<TRow = any> {
        /**
         * Přidá Cfu set do grid formátu
         */
        addSortedEkoCfuSet(content: GContent, options?: boolean | Gordic.Eko.WebClient.GPorizovacGridOptions<TRow> | IGEkoCfuSetOptions<TRow>): this; //TODO: GGridColumnDto a GGridFormatDto se nachazeji v Gui.WebApp - budou se muset presunout do Gui.WebControls

        /**
         * Přidá Cfu set do grid formátu 
         */
        addSortedEkoCfuSet(content: GridFormat<TRow>, options?: boolean | Gordic.Eko.WebClient.GPorizovacGridOptions<TRow> | IGEkoCfuSetOptions<TRow>): this; //TODO: GGridColumnDto a GGridFormatDto se nachazeji v Gui.WebApp - budou se muset presunout do Gui.WebControls
        /**
         * Přidá Cfu set do grid formátu 
         */
        addSortedEkoCfuSet(): this; //TODO: GGridColumnDto a GGridFormatDto se nachazeji v Gui.WebApp - budou se muset presunout do Gui.WebControls

        getBaseCfuSet(content: GContent): GGridColumn<TRow>[];
        getBaseCfuSet(dto: Gordic.Gui.WebApp.GGridColumnDto[]): GGridColumn<TRow>[];

        addBplKontaceSet(content: GContent, options?: boolean | Gordic.Eko.WebClient.GPorizovacGridOptions<TRow> | IGEkoCfuSetOptions<TRow>): this; //TODO: GGridColumnDto a GGridFormatDto se nachazeji v Gui.WebApp - budou se muset presunout do Gui.WebControls


    }

    //Z DataSentence.d.ts

    //interface GridFormat<TRow> {
    //    addSortedEkoCfuSet(content: GContent, param: IGEkoCfuSetOptions<TRow> | boolean): this; //TODO: GGridColumnDto a GGridFormatDto se nachazeji v Gui.WebApp - budou se muset presunout do Gui.WebControls
    //}
    interface IGEkoCfuSetOptions<T = any, TDataWord = Gordic.Eko.WebClient.DataWordContent> {
        isEditable: boolean;
        dataSentence?: Eko.WebClient.GDataSentenceDto;
        fieldOptions?: IGDataCodesProperties<Partial<Gordic.Widget.GIMagicField.IOptions<TDataWord>>>;
        columnExtend?: IGDataCodesProperties<Partial<GGridColumn<T>>>;
    }

    interface IGDataCodesProperties<T = any> {
        uea?: T;
        ueb?: T;
        uec?: T;
        ued?: T;
        uee?: T;
        uef?: T;
        ueg?: T;
        ueh?: T;
        uei?: T;
        uej?: T;
        te0?: T;
        te1?: T;
        te2?: T;
        te3?: T;
        te4?: T;
        uek?: T;
        uel?: T;
        uem?: T;
        uen?: T;
        te5?: T;
        te6?: T;
        te7?: T;
        te8?: T;
        te9?: T;
        _global?: T;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Doklady\DanovaEvidence\GDanovaEvidenceFormDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Additional info for GDanovaEvidenceForm.*/
	interface GDanovaEvidenceFormInfoDto {
		/**The typ ag*/
		typAg?: number|null;
		/**The can edit parameter*/
		canEditParam?: boolean|null;
		/**The stav text*/
		stavText?: string|null;
	}
	const enum GDanovaEvidenceFormInfoDtoNames { typAg = "typAg", canEditParam = "canEditParam", stavText = "stavText",}
	const enum GDanovaEvidenceFormInfoDtoFragments { typAg = "*", canEditParam = "*", stavText = "*",}
	const enum GDanovaEvidenceFormInfoDtoTypes { typAg = "number", canEditParam = "boolean", stavText = "string",}
	const enum GDanovaEvidenceFormInfoDtoTypeLengths {}
	/**All data for GDanovaEvidenceForm.*/
	interface GDanovaEvidenceFormDataDto {
		/**The information dto*/
		infoDto: Gordic.Eko.WebClient.GDanovaEvidenceFormInfoDto;
		/**The header for KH*/
		hlavickaKH: Gordic.Eko.Interface.GEkospdeDto;
		/**The list of codes for KH*/
		polozkyKH: Gordic.Eko.WebClient.GEkodkplDtoExtended[];
	}
	const enum GDanovaEvidenceFormDataDtoNames { infoDto = "infoDto", hlavickaKH = "hlavickaKH", polozkyKH = "polozkyKH",}
	const enum GDanovaEvidenceFormDataDtoFragments { infoDto = "*", hlavickaKH = "*", polozkyKH = "*",}
	const enum GDanovaEvidenceFormDataDtoTypes { infoDto = "Gordic.Eko.WebClient.GDanovaEvidenceFormInfoDto", hlavickaKH = "Gordic.Eko.Interface.GEkospdeDto", polozkyKH = "Gordic.Eko.WebClient.GEkodkplDtoExtended[]",}
	const enum GDanovaEvidenceFormDataDtoTypeLengths {}
	/**Extended Ekospde*/
	interface GEkodkplDtoExtended extends Gordic.Eko.Interface.GEkodkplDto {
		/**The nazev*/
		nazev_kod?: string|null;
		/**The dan typ text*/
		dan_typ_txt?: string|null;
	}
	const enum GEkodkplDtoExtendedNames { nazev_kod = "nazev_kod", dan_typ_txt = "dan_typ_txt", ixp = "ixp", radek_pde = "radek_pde", typ_klas = "typ_klas", kod_klas = "kod_klas", dan_typ = "dan_typ", dan_proc = "dan_proc", c_z = "c_z", c_d = "c_d", radek_z = "radek_z", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GEkodkplDtoExtendedFragments { nazev_kod = "*", dan_typ_txt = "*", ixp = "*", radek_pde = "*", typ_klas = "*", kod_klas = "*", dan_typ = "*", dan_proc = "*", c_z = "*", c_d = "*", radek_z = "*", dat_zmena = "*", zmenu_prov = "*",}
	const enum GEkodkplDtoExtendedTypes { nazev_kod = "string", dan_typ_txt = "string", ixp = "string", radek_pde = "number", typ_klas = "number", kod_klas = "string", dan_typ = "number", dan_proc = "JsonDecimal", c_z = "JsonDecimal", c_d = "JsonDecimal", radek_z = "number", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GEkodkplDtoExtendedTypeLengths { ixp = 12, kod_klas = 15, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Doklady\DTO\GRedistribuceParametryDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO Datového slova*/
	interface GRedistribuceParametryDto {
	}
	const enum GRedistribuceParametryDtoNames {}
	const enum GRedistribuceParametryDtoFragments {}
	const enum GRedistribuceParametryDtoTypes {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Doklady\Smlouvy\GInputZUlohDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO predavane evidenci pristupnosti polozek menu*/
	interface GInputZUlohDto {
		ico?: string|null;
		ucs?: string|null;
		rok?: number|null;
		smlouva?: string|null;
		/**identifikator dokladu*/
		identifikator?: string|null;
		/**zkatka ulohy*/
		zkratakUlohu?: string|null;
		/**Pid dokladu, ze ktereho je volan vyber uloh*/
		ixpDokladu?: string|null;
		akt_znacka?: string|null;
	}
	const enum GInputZUlohDtoNames { ico = "ico", ucs = "ucs", rok = "rok", smlouva = "smlouva", identifikator = "identifikator", zkratakUlohu = "zkratakUlohu", ixpDokladu = "ixpDokladu", akt_znacka = "akt_znacka",}
	const enum GInputZUlohDtoFragments { ico = "*", ucs = "*", rok = "*", smlouva = "*", identifikator = "*", zkratakUlohu = "*", ixpDokladu = "*", akt_znacka = "*",}
	const enum GInputZUlohDtoTypes { ico = "string", ucs = "string", rok = "number", smlouva = "string", identifikator = "string", zkratakUlohu = "string", ixpDokladu = "string", akt_znacka = "string",}
	const enum GInputZUlohDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Doklady\Smlouvy\GVyberSmlouvyInitDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Init Dto*/
	interface GVyberSmlouvyInitDto {
		/**CFU set*/
		polCfuSet?: Gordic.Gui.WebApp.GGridFormatDto|null;
		/**Ac text*/
		acTxt?: string|null;
		/**Should filter by pol*/
		filtrovatPodlePol?: boolean|null;
		rozsirenaVeta?: boolean|null;
	}
	const enum GVyberSmlouvyInitDtoNames { polCfuSet = "polCfuSet", acTxt = "acTxt", filtrovatPodlePol = "filtrovatPodlePol", rozsirenaVeta = "rozsirenaVeta",}
	const enum GVyberSmlouvyInitDtoFragments { polCfuSet = "*", acTxt = "*", filtrovatPodlePol = "*", rozsirenaVeta = "*",}
	const enum GVyberSmlouvyInitDtoTypes { polCfuSet = "Gordic.Gui.WebApp.GGridFormatDto", acTxt = "string", filtrovatPodlePol = "boolean", rozsirenaVeta = "boolean",}
	const enum GVyberSmlouvyInitDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Doklady\Vazby\GNovaVazbaDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	interface GNovaVazbaResponseDto extends Gordic.Eko.WebClient.GResponseDto {
	}
	const enum GNovaVazbaResponseDtoNames { data = "data", info = "info",}
	const enum GNovaVazbaResponseDtoFragments { data = "*", info = "*",}
	const enum GNovaVazbaResponseDtoTypes { data = "object", info = "Gordic.Eko.WebClient.GResponseInfoDto[]",}
	const enum GNovaVazbaResponseDtoTypeLengths {}
	interface GNovaVazbaInputDto extends Gordic.Eko.WebClient.GVazbyInputDto {
		/**The typ ag*/
		typ_ag?: number|null;
		/**The zkratka ag*/
		zkratka_ag?: string|null;
	}
	const enum GNovaVazbaInputDtoNames { typ_ag = "typ_ag", zkratka_ag = "zkratka_ag", ixp = "ixp", drd = "drd", ktg_typ = "ktg_typ", lzePracovatSCizimiDoklady = "lzePracovatSCizimiDoklady", viewMode = "viewMode", rez = "rez", povolitOductovani = "povolitOductovani", povolitVazbuDanovyDokladNaPrim = "povolitVazbuDanovyDokladNaPrim", isOpravnyDanovyDokladUct = "isOpravnyDanovyDokladUct", radek = "radek",}
	const enum GNovaVazbaInputDtoFragments { typ_ag = "*", zkratka_ag = "*", ixp = "*", drd = "*", ktg_typ = "*", lzePracovatSCizimiDoklady = "*", viewMode = "*", rez = "*", povolitOductovani = "*", povolitVazbuDanovyDokladNaPrim = "*", isOpravnyDanovyDokladUct = "*", radek = "*",}
	const enum GNovaVazbaInputDtoTypes { typ_ag = "number", zkratka_ag = "string", ixp = "string", drd = "number", ktg_typ = "number", lzePracovatSCizimiDoklady = "boolean", viewMode = "boolean", rez = "Gordic.Eko.Interface.GERezimPraceSVazbami", povolitOductovani = "boolean", povolitVazbuDanovyDokladNaPrim = "boolean", isOpravnyDanovyDokladUct = "boolean", radek = "number",}
	const enum GNovaVazbaInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Doklady\Vazby\GVazbyDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	interface GVazbyResponseDto extends Gordic.Eko.WebClient.GResponseDto<Gordic.Eko.Interface.GVazbaDokladuDto[]> {
		/**Gets or sets the ixp hla.*/
		ixp_hla?: string|null;
		/**Gets or sets a value indicating whether kontrolni hlaseni operation is enabled.*/
		hasKH?: boolean|null;
		/**Gets or sets a value indicating whether remove operation is enabled.*/
		canRemove?: boolean|null;
		/**Gets or sets the remove reason text for tooltip.*/
		removeReason?: string|null;
		/**Gets or sets a value indicating whether this instance can rezervace.*/
		canRezervace?: boolean|null;
		/**Gets or sets a value indicating whether this instance can new.*/
		canCreate?: boolean|null;
		/**Gets or sets the create reason text for tooltip.*/
		createReason?: string|null;
		/**Gets or sets the typ ag.*/
		vlast_typ_ag?: number|null;
		/**Gets a value indicating whether this instance is fuc.*/
		readonly isFuc?: boolean|null;
		/**Gets or sets the uct zap counts.*/
		uct_zap_counts?: any|null;
		/**Gets or sets the rez zap counts.*/
		rez_zap_counts?: any|null;
		/**Gets the uct zap counts total.*/
		readonly uct_zap_counts_total?: number|null;
		/**Gets the rez zap counts total.*/
		readonly rez_zap_counts_total?: number|null;
	}
	const enum GVazbyResponseDtoNames { ixp_hla = "ixp_hla", hasKH = "hasKH", canRemove = "canRemove", removeReason = "removeReason", canRezervace = "canRezervace", canCreate = "canCreate", createReason = "createReason", vlast_typ_ag = "vlast_typ_ag", isFuc = "isFuc", uct_zap_counts = "uct_zap_counts", rez_zap_counts = "rez_zap_counts", uct_zap_counts_total = "uct_zap_counts_total", rez_zap_counts_total = "rez_zap_counts_total", data = "data", info = "info",}
	const enum GVazbyResponseDtoFragments { ixp_hla = "*", hasKH = "*", canRemove = "*", removeReason = "*", canRezervace = "*", canCreate = "*", createReason = "*", vlast_typ_ag = "*", isFuc = "*", uct_zap_counts = "*", rez_zap_counts = "*", uct_zap_counts_total = "*", rez_zap_counts_total = "*", data = "*", info = "*",}
	const enum GVazbyResponseDtoTypes { ixp_hla = "string", hasKH = "boolean", canRemove = "boolean", removeReason = "string", canRezervace = "boolean", canCreate = "boolean", createReason = "string", vlast_typ_ag = "number", isFuc = "boolean", uct_zap_counts = "any", rez_zap_counts = "any", uct_zap_counts_total = "number", rez_zap_counts_total = "number", data = "Gordic.Eko.Interface.GVazbaDokladuDto[]", info = "Gordic.Eko.WebClient.GResponseInfoDto[]",}
	const enum GVazbyResponseDtoTypeLengths {}
	interface GVazbyInputDto {
		/**Gets or sets the ixp.*/
		ixp: string;
		/**Gets or sets the DRD.*/
		drd: number;
		/**Gets or sets the KTG typ.*/
		ktg_typ: number;
		/**Gets or sets a value indicating whether [lze pracovat s cizimi doklady].*/
		lzePracovatSCizimiDoklady?: boolean|null;
		/**Gets or sets a value indicating whether [view mode].*/
		viewMode?: boolean|null;
		/**Gets or sets the rez.*/
		rez?: Gordic.Eko.Interface.GERezimPraceSVazbami|null;
		/**Gets or sets a value indicating whether [povolit oductovani].*/
		povolitOductovani?: boolean|null;
		/**Gets or sets a value indicating whether [povolit vazbu danovy doklad na prim].*/
		povolitVazbuDanovyDokladNaPrim?: boolean|null;
		/**Gets or sets a value indicating whether this instance is opravny danovy doklad uct.*/
		isOpravnyDanovyDokladUct?: boolean|null;
		/**RadekPde*/
		radek?: number|null;
	}
	const enum GVazbyInputDtoNames { ixp = "ixp", drd = "drd", ktg_typ = "ktg_typ", lzePracovatSCizimiDoklady = "lzePracovatSCizimiDoklady", viewMode = "viewMode", rez = "rez", povolitOductovani = "povolitOductovani", povolitVazbuDanovyDokladNaPrim = "povolitVazbuDanovyDokladNaPrim", isOpravnyDanovyDokladUct = "isOpravnyDanovyDokladUct", radek = "radek",}
	const enum GVazbyInputDtoFragments { ixp = "*", drd = "*", ktg_typ = "*", lzePracovatSCizimiDoklady = "*", viewMode = "*", rez = "*", povolitOductovani = "*", povolitVazbuDanovyDokladNaPrim = "*", isOpravnyDanovyDokladUct = "*", radek = "*",}
	const enum GVazbyInputDtoTypes { ixp = "string", drd = "number", ktg_typ = "number", lzePracovatSCizimiDoklady = "boolean", viewMode = "boolean", rez = "Gordic.Eko.Interface.GERezimPraceSVazbami", povolitOductovani = "boolean", povolitVazbuDanovyDokladNaPrim = "boolean", isOpravnyDanovyDokladUct = "boolean", radek = "number",}
	const enum GVazbyInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Doklady\Zapisy\GZapisyDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Input Dto for Zapisy*/
	interface GZapisyInputDto {
		/**The kumulace*/
		kumulace?: Gordic.Eko.Interface.GKumulaceEnum|null;
		/**The DRD - druh dokladu*/
		drd?: number|null;
		/**List ixp pripadu - fuc*/
		dok_prip_fuc?: string[]|null;
		/**List ixp pripadu*/
		dok_prip?: string[]|null;
		/**The ixp - ixp dokladu*/
		ixp?: string|null;
		/**ixp z vazeb*/
		vazbyIxp?: string|null;
		/**The is doklad fuc - je doklad z fuc?*/
		isDokladFuc?: boolean|null;
		/**Whether can oductovat uct recors*/
		canOductovatUct?: boolean|null;
		/**Whether can oductovat rezervation recors. CanRezervace must be true for this to be true.*/
		canOductovatRez?: boolean|null;
		/**Gets or sets a value indicating whether this instance is rezervace - canRezervace must be also true.*/
		isRezervace?: boolean|null;
		/**Gets or sets a value indicating whether this instance is pripad.*/
		isPripad?: boolean|null;
		/**Gets or sets the KTG typ.*/
		ktg_typ: number;
		/**Gets or sets a value indicating whether [lze pracovat s cizimi doklady].*/
		lzePracovatSCizimiDoklady?: boolean|null;
	}
	const enum GZapisyInputDtoNames { kumulace = "kumulace", drd = "drd", dok_prip_fuc = "dok_prip_fuc", dok_prip = "dok_prip", ixp = "ixp", vazbyIxp = "vazbyIxp", isDokladFuc = "isDokladFuc", canOductovatUct = "canOductovatUct", canOductovatRez = "canOductovatRez", isRezervace = "isRezervace", isPripad = "isPripad", ktg_typ = "ktg_typ", lzePracovatSCizimiDoklady = "lzePracovatSCizimiDoklady",}
	const enum GZapisyInputDtoFragments { kumulace = "*", drd = "*", dok_prip_fuc = "*", dok_prip = "*", ixp = "*", vazbyIxp = "*", isDokladFuc = "*", canOductovatUct = "*", canOductovatRez = "*", isRezervace = "*", isPripad = "*", ktg_typ = "*", lzePracovatSCizimiDoklady = "*",}
	const enum GZapisyInputDtoTypes { kumulace = "Gordic.Eko.Interface.GKumulaceEnum", drd = "number", dok_prip_fuc = "string[]", dok_prip = "string[]", ixp = "string", vazbyIxp = "string", isDokladFuc = "boolean", canOductovatUct = "boolean", canOductovatRez = "boolean", isRezervace = "boolean", isPripad = "boolean", ktg_typ = "number", lzePracovatSCizimiDoklady = "boolean",}
	const enum GZapisyInputDtoTypeLengths {}
	/**Output Dto for Zapisy*/
	interface GZapisyResponseDto extends Gordic.Eko.WebClient.GResponseDto<Gordic.Eko.Interface.GZapisyDto[]> {
		/**Whether show iissp or not.*/
		showIissp?: boolean|null;
		prizUr?: number|null;
		ixpHla?: string|null;
	}
	const enum GZapisyResponseDtoNames { showIissp = "showIissp", prizUr = "prizUr", ixpHla = "ixpHla", data = "data", info = "info",}
	const enum GZapisyResponseDtoFragments { showIissp = "*", prizUr = "*", ixpHla = "*", data = "*", info = "*",}
	const enum GZapisyResponseDtoTypes { showIissp = "boolean", prizUr = "number", ixpHla = "string", data = "Gordic.Eko.Interface.GZapisyDto[]", info = "Gordic.Eko.WebClient.GResponseInfoDto[]",}
	const enum GZapisyResponseDtoTypeLengths {}
	/**CustomDto for print action*/
	interface GZapisyTiskDto {
		/**ixp of current row*/
		ixp?: string|null;
		/**ixp from parent*/
		vazbyIxp?: string|null;
		/**ixp_hla*/
		ixpHla?: string|null;
		isRezervace?: boolean|null;
		isPripad?: boolean|null;
		kumulace?: Gordic.Eko.Interface.GKumulaceEnum|null;
	}
	const enum GZapisyTiskDtoNames { ixp = "ixp", vazbyIxp = "vazbyIxp", ixpHla = "ixpHla", isRezervace = "isRezervace", isPripad = "isPripad", kumulace = "kumulace",}
	const enum GZapisyTiskDtoFragments { ixp = "*", vazbyIxp = "*", ixpHla = "*", isRezervace = "*", isPripad = "*", kumulace = "*",}
	const enum GZapisyTiskDtoTypes { ixp = "string", vazbyIxp = "string", ixpHla = "string", isRezervace = "boolean", isPripad = "boolean", kumulace = "Gordic.Eko.Interface.GKumulaceEnum",}
	const enum GZapisyTiskDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Filters\GFilterOptionsDtoNG.d.ts 

//NOTE: bylo vygenerovano, ale doupraveno rucne - generator zatim neumi dedicnost a cteni [PropertyName=...]
/// <reference path="../Prefabs/Prefabs.ts" />

declare namespace Gordic.Eko.WebClient {
    export interface GFilterOptionBaseDto {
        /**Cesta k nazvu promenne ve filtru*/
        model: string;
        disabled?: boolean;
    }

    export interface GFilterLabeledOptionDto extends GFilterOptionBaseDto {
        /**Popisek (sekce)*/
        caption: string;
        /**Maximalni pocet znaku (POZOR! zatim se nevi, jestli se pouzije)*/
        maxLength?: number;
    }
    export interface GFilterOptionDto extends GFilterLabeledOptionDto {
        /**Pouze ty, co maji aktivitu 100*/
        onlyActive: boolean;
        /**Ico*/
        ico: string;
        /**AktProhl*/
        aktProhl: number;
    }
    export interface GFilterOptionUusDto extends GFilterOptionDto {
        /**Ucs*/
        ucs: string;
    }
    export interface GFilterOptionDrdDto extends GFilterLabeledOptionDto {
        /**Zobr. ucetnictvi*/
        showUct?: boolean;
        /**Zobr. rozpocet*/
        showRoz?: boolean;
        /**Zobr. ostatni*/
        showOst?: boolean;
        /** Polozky zobr. ve formulari */
        items?: GFilterOptionsDrdItem[];
    }

    export interface GFilterOptionsDrdItem {
        name: string;
        caption: string;
        dataSource: JQueryPromise<Gordic.Data.Readers.EkocdrdDto[]>;
    }

    export interface GFilterOptionAcDto extends GFilterLabeledOptionDto {
        /**AcElngth*/
        acLength: number;
        /**Rok*/
        rok: number;
        /**Ico*/
        ico: string;
        /**Aktivita*/
        aktivita: number;
        /**Subrada*/
        subrada: number;
        /**Zkratka*/
        zkratka: string;
        typ: number;
    }
    export interface IGFilterOptionZd extends GFilterLabeledOptionDto {
        isProEkoFilter: boolean
    }
    
    export interface IGFilterOptionCfu extends GFilterOptionBaseDto, Gordic.Eko.Prefabs.IGCfuOptions {
    }

    export interface IGFilterOptionRar extends GFilterLabeledOptionDto {
        /** Pouze ty, co maji aktivitu 100 */
        onlyActive: boolean;
    }

    export interface IGFilterOptionIco extends GFilterLabeledOptionDto {
        /** Pouze ty, co maji aktivitu 100 */
        onlyActive: boolean; 
    }
}
 

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Magic\Dto\DataWordContent.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Dto hodnoty datoveho slova*/
	interface DataWordContent {
		/**Kód datoveho slova*/
		code?: string|null;
		/**název datoveho slova*/
		name?: string|null;
	}
	const enum DataWordContentNames { code = "code", name = "name",}
	const enum DataWordContentFragments { code = "*", name = "*",}
	const enum DataWordContentTypes { code = "string", name = "string",}
	const enum DataWordContentTypeLengths {}
	/**DTO pro zobrazeni datove vety vcetne popisku*/
	interface DataWordContentWithInfo extends Gordic.Eko.WebClient.DataWordContent {
		/**Nazev datoveho slova*/
		title?: string|null;
	}
	const enum DataWordContentWithInfoNames { title = "title", code = "code", name = "name",}
	const enum DataWordContentWithInfoFragments { title = "*", code = "*", name = "*",}
	const enum DataWordContentWithInfoTypes { title = "string", code = "string", name = "string",}
	const enum DataWordContentWithInfoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Magic\Dto\GDataSentenceDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Zaklad pro datovou vetu a jeji parametry*/
	interface GDataSentenceBaseDto {
		/**Ico*/
		ico?: string|null;
		/**Rok*/
		rok?: number|null;
		/**IxsRoz*/
		ixsRoz?: string|null;
		/**Identifikator cfs*/
		ixsSax?: string|null;
		/**Druh dokumentu*/
		drd?: number|null;
		/**Priznak zda ma MD, DAL policka*/
		hasMDDal?: boolean|null;
		/**Typ datove vety, Ucetni nebo rozpoctova*/
		sentenceType?: Gordic.Eko.Interface.TypVetyEnum|null;
	}
	const enum GDataSentenceBaseDtoNames { ico = "ico", rok = "rok", ixsRoz = "ixsRoz", ixsSax = "ixsSax", drd = "drd", hasMDDal = "hasMDDal", sentenceType = "sentenceType",}
	const enum GDataSentenceBaseDtoFragments { ico = "*", rok = "*", ixsRoz = "*", ixsSax = "*", drd = "*", hasMDDal = "*", sentenceType = "*",}
	const enum GDataSentenceBaseDtoTypes { ico = "string", rok = "number", ixsRoz = "string", ixsSax = "string", drd = "number", hasMDDal = "boolean", sentenceType = "Gordic.Eko.Interface.TypVetyEnum",}
	const enum GDataSentenceBaseDtoTypeLengths {}
	const enum WildcardMode {
		normalX=0,
		asterisk=1,
	}
	const enum InputCharsMode {
		onlyNumbers=0,
		withoutXY=1,
		allChars=2,
	}
	/**DTO pro prvotni nastaveni datove vety*/
	interface GDataSentenceParamsDto extends Gordic.Eko.WebClient.GDataSentenceBaseDto {
		/**Ucetni stredisko*/
		ucs?: string|null;
		/**Nakladove stredisko*/
		nks?: string|null;
	}
	const enum GDataSentenceParamsDtoNames { ucs = "ucs", nks = "nks", ico = "ico", rok = "rok", ixsRoz = "ixsRoz", ixsSax = "ixsSax", drd = "drd", hasMDDal = "hasMDDal", sentenceType = "sentenceType",}
	const enum GDataSentenceParamsDtoFragments { ucs = "*", nks = "*", ico = "*", rok = "*", ixsRoz = "*", ixsSax = "*", drd = "*", hasMDDal = "*", sentenceType = "*",}
	const enum GDataSentenceParamsDtoTypes { ucs = "string", nks = "string", ico = "string", rok = "number", ixsRoz = "string", ixsSax = "string", drd = "number", hasMDDal = "boolean", sentenceType = "Gordic.Eko.Interface.TypVetyEnum",}
	const enum GDataSentenceParamsDtoTypeLengths {}
	/**DTO datove vety*/
	interface GDataSentenceDto extends Gordic.Eko.WebClient.GDataSentenceParamsDto {
		/**Priznak na pouziti autocomplete*/
		useAutocomplete?: boolean|null;
		/**Priznak preskoceni jednohodnotovych poli*/
		skipOneValueField?: boolean|null;
		/**Slovnik datovych slov*/
		unsortSequence?: number[]|null;
		/**Slovnik datovych slov*/
		allSortedDataWords?: GDataWordDto[]|null;
		/**NKS cleneni - kdyz je nastaveny prizRoz z ekoparams, nacita se rozvrh podle nks*/
		nksCleneni?: boolean|null;
		/**Typ zástupky*/
		wildcard?: Gordic.Eko.WebClient.WildcardMode|null;
		/**Typ zástupky*/
		inputCharsMode?: Gordic.Eko.WebClient.InputCharsMode|null;
	}
	const enum GDataSentenceDtoNames { useAutocomplete = "useAutocomplete", skipOneValueField = "skipOneValueField", unsortSequence = "unsortSequence", allSortedDataWords = "allSortedDataWords", nksCleneni = "nksCleneni", wildcard = "wildcard", inputCharsMode = "inputCharsMode", ucs = "ucs", nks = "nks", ico = "ico", rok = "rok", ixsRoz = "ixsRoz", ixsSax = "ixsSax", drd = "drd", hasMDDal = "hasMDDal", sentenceType = "sentenceType",}
	const enum GDataSentenceDtoFragments { useAutocomplete = "*", skipOneValueField = "*", unsortSequence = "*", allSortedDataWords = "*", nksCleneni = "*", wildcard = "*", inputCharsMode = "*", ucs = "*", nks = "*", ico = "*", rok = "*", ixsRoz = "*", ixsSax = "*", drd = "*", hasMDDal = "*", sentenceType = "*",}
	const enum GDataSentenceDtoTypes { useAutocomplete = "boolean", skipOneValueField = "boolean", unsortSequence = "number[]", allSortedDataWords = "GDataWordDto[]", nksCleneni = "boolean", wildcard = "Gordic.Eko.WebClient.WildcardMode", inputCharsMode = "Gordic.Eko.WebClient.InputCharsMode", ucs = "string", nks = "string", ico = "string", rok = "number", ixsRoz = "string", ixsSax = "string", drd = "number", hasMDDal = "boolean", sentenceType = "Gordic.Eko.Interface.TypVetyEnum",}
	const enum GDataSentenceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Magic\Dto\GDataWordDto.d.ts 

declare namespace Gordic.Eko.WebClient {
    /**DTO Datového slova*/
	interface GDataWordDto {
        /**Technologická zkratka (SAKRPZUJO); Používá se v CFS*/
		Atribut?: string|null;
        /**Název sloupce v DB (uea...) který odpovídá této položce rozpočtové věty*/
		DbNazev?: string|null;
        /**Maximální délka řetězce zadávaného do položky rozpočtové věty ve znacích*/
		Delka?: number|null;
        /**Maximální délka alokovaná v DB pro položku rozpočtové věty (vždy musí být >=  Delka)*/
		DelkaDb: number;
        /**Název položky rozpočtové věty*/
		Nazev?: string|null;
        /**Pořadí určuje v jakém pořadí se mají jednotlivé položky rozpočtové věty zobrazovat
        *         - ta s nejnižším číslem "Poradi" se má zobrazit první, ta s nejvyšším poslední.
        */
		Poradi?: number|null;
        /**Určuje, zda se má položka zobrazovat a plnit (1) či nemá (0).*/
		Pouziti: number;
        /**Nuly vyskládané na délku Delka; Používá se pro ukládání hodnot nepoužívaných
        *         slov (Pouziti=0 apod.)
        */
		Prazdny: string;
        /**Příznak zobrazení sloupců účetní věty v pořizovači krytí*/
		PrizKry?: number|null;
        /**Příznak zobrazení sloupců účetní věty v pořizovači likvidace*/
		PrizLik?: number|null;
        /**Příznak na to zda je strikně vybírán*/
		Strict?: boolean|null;
        /**Úroveň, poslední znak z DbNazev (a-j,0-5)*/
		Uroven?: string|null;
        /**Úroveň v modulech DOS - odpovídající úrověň v řadě G0; Používá se v CFS*/
		UrovenDos?: string|null;
        /**Úroveň v modulech Ginis - odpovídající úrověň v řadě G1; Používá se v CFS*/
		UrovenGinis?: string|null;
        /**Úroveň (číslo) 1 až 15*/
		UrovenNum: number;
        /**Zkratka položky rozpočtové věty (tohle se používá pro popis políček v prezentační
        *         vrstvě)
        */
		Zkratka?: string|null;
        /**Maska pro zobrazování daného slova. Vyskládané nuly na délku, kterou se má slovo
        *         zobrazovat; Používá pořizovačka
        */
		Zobrazovany: string;
        /**Hodnota datoveho slova*/
		Data?: Gordic.Eko.WebClient.DataWordContent|null;
        /**Přiznak editace*/
		CanEdit?: boolean|null;
	}
	const enum GDataWordDtoNames { Atribut = "Atribut", DbNazev = "DbNazev", Delka = "Delka", DelkaDb = "DelkaDb", Nazev = "Nazev", Poradi = "Poradi", Pouziti = "Pouziti", Prazdny = "Prazdny", PrizKry = "PrizKry", PrizLik = "PrizLik", Strict = "Strict", Uroven = "Uroven", UrovenDos = "UrovenDos", UrovenGinis = "UrovenGinis", UrovenNum = "UrovenNum", Zkratka = "Zkratka", Zobrazovany = "Zobrazovany", Data = "Data", CanEdit = "CanEdit",}
	const enum GDataWordDtoFragments { Atribut = "*", DbNazev = "*", Delka = "*", DelkaDb = "*", Nazev = "*", Poradi = "*", Pouziti = "*", Prazdny = "*", PrizKry = "*", PrizLik = "*", Strict = "*", Uroven = "*", UrovenDos = "*", UrovenGinis = "*", UrovenNum = "*", Zkratka = "*", Zobrazovany = "*", Data = "*", CanEdit = "*",}
	const enum GDataWordDtoTypes { Atribut = "string", DbNazev = "string", Delka = "number", DelkaDb = "number", Nazev = "string", Poradi = "number", Pouziti = "number", Prazdny = "string", PrizKry = "number", PrizLik = "number", Strict = "boolean", Uroven = "string", UrovenDos = "string", UrovenGinis = "string", UrovenNum = "number", Zkratka = "string", Zobrazovany = "string", Data = "Gordic.Eko.WebClient.DataWordContent", CanEdit = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Magic\Dto\GDataWordsModelDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO pro prenos datovych slov*/
	interface GDataWordsModelDto {
		/**UEA*/
		uea?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEB*/
		ueb?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEC*/
		uec?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UED*/
		ued?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEE*/
		uee?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEF*/
		uef?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEG*/
		ueg?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEH*/
		ueh?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEI*/
		uei?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEJ*/
		uej?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE0*/
		te0?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE1*/
		te1?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE2*/
		te2?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE3*/
		te3?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE4*/
		te4?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEK*/
		uek?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEL*/
		uel?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEM*/
		uem?: Gordic.Eko.WebClient.DataWordContent|null;
		/**UEN*/
		uen?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE5*/
		te5?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE6*/
		te6?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE7*/
		te7?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE8*/
		te8?: Gordic.Eko.WebClient.DataWordContent|null;
		/**TE9*/
		te9?: Gordic.Eko.WebClient.DataWordContent|null;
	}
	const enum GDataWordsModelDtoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9",}
	const enum GDataWordsModelDtoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*",}
	const enum GDataWordsModelDtoTypes { uea = "Gordic.Eko.WebClient.DataWordContent", ueb = "Gordic.Eko.WebClient.DataWordContent", uec = "Gordic.Eko.WebClient.DataWordContent", ued = "Gordic.Eko.WebClient.DataWordContent", uee = "Gordic.Eko.WebClient.DataWordContent", uef = "Gordic.Eko.WebClient.DataWordContent", ueg = "Gordic.Eko.WebClient.DataWordContent", ueh = "Gordic.Eko.WebClient.DataWordContent", uei = "Gordic.Eko.WebClient.DataWordContent", uej = "Gordic.Eko.WebClient.DataWordContent", te0 = "Gordic.Eko.WebClient.DataWordContent", te1 = "Gordic.Eko.WebClient.DataWordContent", te2 = "Gordic.Eko.WebClient.DataWordContent", te3 = "Gordic.Eko.WebClient.DataWordContent", te4 = "Gordic.Eko.WebClient.DataWordContent", uek = "Gordic.Eko.WebClient.DataWordContent", uel = "Gordic.Eko.WebClient.DataWordContent", uem = "Gordic.Eko.WebClient.DataWordContent", uen = "Gordic.Eko.WebClient.DataWordContent", te5 = "Gordic.Eko.WebClient.DataWordContent", te6 = "Gordic.Eko.WebClient.DataWordContent", te7 = "Gordic.Eko.WebClient.DataWordContent", te8 = "Gordic.Eko.WebClient.DataWordContent", te9 = "Gordic.Eko.WebClient.DataWordContent",}
	const enum GDataWordsModelDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\ObecneSeskupeni\GObecneSeskupeniDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO obecneho seskupeni*/
	interface GObecneSeskupeniDto {
		/**Id*/
		id?: string|null;
		/**ParentId*/
		parentId?: string|null;
		/**Nazev*/
		nazev?: string|null;
		/**OseTyp*/
		typOse?: string|null;
		/**Tag*/
		tag?: string|null;
		/**Hash*/
		hash?: string|null;
		/**Obecne seskupeni*/
		ixsOse?: string|null;
		/**Path*/
		path?: string|null;
		/**Stavy nodu pro ggrid (open,closed,unknown)*/
		nodeState?: string|null;
		/**Kategorie*/
		ixsKto?: string|null;
	}
	const enum GObecneSeskupeniDtoNames { id = "id", parentId = "parentId", nazev = "nazev", typOse = "typOse", tag = "tag", hash = "hash", ixsOse = "ixsOse", path = "path", nodeState = "nodeState", ixsKto = "ixsKto",}
	const enum GObecneSeskupeniDtoFragments { id = "*", parentId = "*", nazev = "*", typOse = "*", tag = "*", hash = "*", ixsOse = "*", path = "*", nodeState = "*", ixsKto = "*",}
	const enum GObecneSeskupeniDtoTypes { id = "string", parentId = "string", nazev = "string", typOse = "string", tag = "string", hash = "string", ixsOse = "string", path = "string", nodeState = "string", ixsKto = "string",}
	const enum GObecneSeskupeniDtoTypeLengths {}
	/**Obecne seskupeni (hodnota)*/
	interface GObecneSeskupeniHodnotaDto extends Gordic.Eko.WebClient.GObecneSeskupeniDto {
		/**Hodnota*/
		hodnota?: string|null;
	}
	const enum GObecneSeskupeniHodnotaDtoNames { hodnota = "hodnota", id = "id", parentId = "parentId", nazev = "nazev", typOse = "typOse", tag = "tag", hash = "hash", ixsOse = "ixsOse", path = "path", nodeState = "nodeState", ixsKto = "ixsKto",}
	const enum GObecneSeskupeniHodnotaDtoFragments { hodnota = "*", id = "*", parentId = "*", nazev = "*", typOse = "*", tag = "*", hash = "*", ixsOse = "*", path = "*", nodeState = "*", ixsKto = "*",}
	const enum GObecneSeskupeniHodnotaDtoTypes { hodnota = "string", id = "string", parentId = "string", nazev = "string", typOse = "string", tag = "string", hash = "string", ixsOse = "string", path = "string", nodeState = "string", ixsKto = "string",}
	const enum GObecneSeskupeniHodnotaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\ObecneSeskupeni\GObecneSeskupeniObsahDto.d.ts 

declare namespace Gordic.Eko.WebClient {
    /**DTO obsahu jednoho obecneho seskupeni*/
	interface GObecneSeskupeniObsahDto {
        /**element_ose*/
		element_ose?: string|null;
        /**ico*/
		ico?: string|null;
        /**ucs*/
		ucs?: string|null;
        /**uus*/
		uus?: string|null;
        /**rokmes_od*/
		rokmes_od?: string|null;
        /**rokmes_do*/
		rokmes_do?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\ObecneSeskupeni\GObecneSeskupeniObsahRequestDto.d.ts 

declare namespace Gordic.Eko.WebClient {
    /**Request k vybudovani obsahu obecneho seskupeni*/
	interface GObecneSeskupeniObsahRequestDto {
        /**IXS obecneho seskupeni*/
		ixsOse: string;
        /**Typ*/
		KS: string;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\ObecneSeskupeni\GObecneSeskupeniRequestDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Request pro zobrazeni obecneho seskupeni ve stromu*/
	interface GObecneSeskupeniRequestDto extends Gordic.Isl.GServiceListRequest {
		/**Id parenta*/
		parentId?: string|null;
		/**tag*/
		tag?: string|null;
		/**hash*/
		hash?: string|null;
		/**ixsOse*/
		ixsOse?: string|null;
		/**ixsKto*/
		ixsKto?: string|null;
		/**rokMesic*/
		rokMesic?: string|null;
		/**typOseKs*/
		typOseKs?: GBaseFilter<string>|null;
		/**Predvybrana polozka*/
		path?: string|null;
		/**typOse*/
		typOse?: string|null;
		/**Typy*/
		typy?: boolean|null;
		/**Zobrazovat urovne*/
		urovne?: boolean|null;
		/**Zobrazovat kategorie*/
		kategorie?: boolean|null;
		/**Zobrazovat hodnoty*/
		showLeaves?: boolean|null;
		/**Filtr na ixs_ose a vsechny vetve pod nim*/
		filterIxsOse?: string|null;
		/**Root IxsOse*/
		ixsOseRoot?: string|null;
		/**Varianta seskupeni modulu SKO*/
		isSko?: boolean|null;
		/**Datum od (pro SKO)*/
		datOd?: string|null;
		/**Datum do (pro SKO)*/
		datDo?: string|null;
		/**Hodnota listu*/
		hodnota?: string|null;
	}
	const enum GObecneSeskupeniRequestDtoNames { parentId = "parentId", tag = "tag", hash = "hash", ixsOse = "ixsOse", ixsKto = "ixsKto", rokMesic = "rokMesic", typOseKs = "typOseKs", path = "path", typOse = "typOse", typy = "typy", urovne = "urovne", kategorie = "kategorie", showLeaves = "showLeaves", filterIxsOse = "filterIxsOse", ixsOseRoot = "ixsOseRoot", isSko = "isSko", datOd = "datOd", datDo = "datDo", hodnota = "hodnota", data = "data", filters = "filters", FilterDto = "FilterDto", rowStart = "rowStart", rowLimit = "rowLimit", fragments = "fragments", fastFilter = "fastFilter", context = "context",}
	const enum GObecneSeskupeniRequestDtoFragments { parentId = "*", tag = "*", hash = "*", ixsOse = "*", ixsKto = "*", rokMesic = "*", typOseKs = "*", path = "*", typOse = "*", typy = "*", urovne = "*", kategorie = "*", showLeaves = "*", filterIxsOse = "*", ixsOseRoot = "*", isSko = "*", datOd = "*", datDo = "*", hodnota = "*", data = "*", filters = "*", FilterDto = "*", rowStart = "*", rowLimit = "*", fragments = "*", fastFilter = "*", context = "*",}
	const enum GObecneSeskupeniRequestDtoTypes { parentId = "string", tag = "string", hash = "string", ixsOse = "string", ixsKto = "string", rokMesic = "string", typOseKs = "GBaseFilter<string>", path = "string", typOse = "string", typy = "boolean", urovne = "boolean", kategorie = "boolean", showLeaves = "boolean", filterIxsOse = "string", ixsOseRoot = "string", isSko = "boolean", datOd = "string", datDo = "string", hodnota = "string", data = "Gordic.General.IGDto", filters = "Gordic.General.GFilter<Gordic.Eko.Interface.FilterOseTypy>[]", FilterDto = "Gordic.General.IGFilterDto<Gordic.Eko.Interface.FilterOseTypy>", rowStart = "number", rowLimit = "number", fragments = "string[]", fastFilter = "Gordic.General.ApplicationInterface.GFastFilterDto", context = "Gordic.General.ApplicationInterface.GRequestContext",}
	const enum GObecneSeskupeniRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\ObecneSeskupeni\GObecneSeskupeniSkoRequestDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Request pro obecne seskupeni SKO*/
	interface GObecneSeskupeniSkoRequestDto {
		/**Root ixsOse*/
		ixsOse?: string|null;
		/**Datum od*/
		datOd?: string|null;
		/**Datum do*/
		datDo?: string|null;
	}
	const enum GObecneSeskupeniSkoRequestDtoNames { ixsOse = "ixsOse", datOd = "datOd", datDo = "datDo",}
	const enum GObecneSeskupeniSkoRequestDtoFragments { ixsOse = "*", datOd = "*", datDo = "*",}
	const enum GObecneSeskupeniSkoRequestDtoTypes { ixsOse = "string", datOd = "string", datDo = "string",}
	const enum GObecneSeskupeniSkoRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Porizovac\DataSentence\DataSentence.d.ts 

declare namespace Gordic.Eko.WebClient {

    /**
     * Options pro rozšíření pořizovače v GridFormátu
     * @author PNovak
     * @date 2018-04-10
     */
    interface GPorizovacGridOptions<TRow, TDataWord = DataWordContent> {
        /** Příznak, zda se jedná o editovatelný grid */
        isEditable?: boolean;
        /** mod porizovacich poli */
        mode?: "normal" | "withoutCheck";
        /** Struktura datové věty */
        dataSentence?: GDataSentenceDto;
        /** Vlastnosti pořizovacího pole */
        fieldOptions?: Partial<Gordic.Widget.GIMagicField.IOptions<TDataWord>>;
        /** Vlastnosti managera pro pořizovač */
        managerOptions?: DataSentenceBaseManagerOptions<TRow>;
        /** Vlastnosti grid formátu */
        columnExtend?: ObjectLiteral<Partial<GGridColumn<TRow>>>;
        /**viditelné sloupce účetní věty */
        sentenceColumns?: string[];
        /**content urceny pro preloader, kdyz neni, pouzije se nejblizsi v DOMu*/
        loadingContent?: JQuery;
    }
}


/**
* Options základního managera datové věty
*/
interface DataSentenceBaseManagerOptions<TRow> {
    /**
     * Metoda pro prefiltrovani dat
     */
    dataWordsFilter?: (fieldName: string, dataView: Gordic.Eko.WebClient.DataWordContent[]) => JQuery.Promise<Gordic.Eko.WebClient.DataWordContent[]>
    /**
     * Příznak pro detekci obsloužení již otevřeného okna nápovědy
     */
    externalHelpDialog?: boolean;
    /** Událost na update hodnot nápovědy */
    dataWordInfoUpdated?: (ev, data: { data: Gordic.Eko.WebClient.DataWordContentWithInfo[] }) => void;
    /**
     * Budou se nacitat texty vcetne obsluhy
     */
    showDataWordsInfos?: boolean;
    /**
    * Počáteční hodnoty, slouží pro načtení
    */
    data?: TRow[],
    /**
    * Mód editace. Určuje, zda je manager použit pro řádkovou nebo buňkovou editaci
    * @default "row"
    */
    editMode?: "row" | "cell",

    /**
     * Druh dokumentu
     * @type {JQueryPromise<TRow> | null}
     */
    drd?: JQueryPromise<TRow> | null;
    /**
    * Index řádku
    */
    rowIndex?: number;
    /** mají se používat i nečíselné znaky*/
    useNonDigital?: boolean;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Porizovac\GNewRecordDlg\Dto\GDataSentenceCodesDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO urcene na prenos hodnot datove vety*/
	interface GDataSentenceCodesDto extends Gordic.Eko.WebClient.GDataSentenceParamsDto {
		/**hodnota UEA*/
		uea?: string|null;
		/**hodnota UEB*/
		ueb?: string|null;
		/**hodnota UEC*/
		uec?: string|null;
		/**hodnota UED*/
		ued?: string|null;
		/**hodnota UEE*/
		uee?: string|null;
		/**hodnota UEF*/
		uef?: string|null;
		/**hodnota UEG*/
		ueg?: string|null;
		/**hodnota UEH*/
		ueh?: string|null;
		/**hodnota UEI*/
		uei?: string|null;
		/**hodnota UEJ*/
		uej?: string|null;
		/**hodnota TE0*/
		te0?: string|null;
		/**hodnota TE1*/
		te1?: string|null;
		/**hodnota TE2*/
		te2?: string|null;
		/**hodnota TE3*/
		te3?: string|null;
		/**hodnota TE4*/
		te4?: string|null;
		/**hodnota UEK*/
		uek?: string|null;
		/**hodnota UEL*/
		uel?: string|null;
		/**hodnota UEM*/
		uem?: string|null;
		/**hodnota UEN*/
		uen?: string|null;
		/**hodnota TE5*/
		te5?: string|null;
		/**hodnota TE6*/
		te6?: string|null;
		/**hodnota TE7*/
		te7?: string|null;
		/**hodnota TE8*/
		te8?: string|null;
		/**hodnota TE9*/
		te9?: string|null;
		/**hodnota odkazu UEA*/
		o_uea?: string|null;
		/**hodnota odkazu UEB*/
		o_ueb?: string|null;
		/**hodnota odkazu UEC*/
		o_uec?: string|null;
		/**hodnota odkazu UED*/
		o_ued?: string|null;
		/**hodnota odkazu UEE*/
		o_uee?: string|null;
		/**hodnota odkazu UEF*/
		o_uef?: string|null;
		/**hodnota odkazu UEG*/
		o_ueg?: string|null;
		/**hodnota odkazu UEH*/
		o_ueh?: string|null;
		/**hodnota odkazu UEI*/
		o_uei?: string|null;
		/**hodnota odkazu UEJ*/
		o_uej?: string|null;
		/**hodnota odkazu TE0*/
		o_te0?: string|null;
		/**hodnota odkazu TE1*/
		o_te1?: string|null;
		/**hodnota odkazu TE2*/
		o_te2?: string|null;
		/**hodnota odkazu TE3*/
		o_te3?: string|null;
		/**hodnota odkazu TE4*/
		o_te4?: string|null;
		/**hodnota odkazu UEK*/
		o_uek?: string|null;
		/**hodnota odkazu UEL*/
		o_uel?: string|null;
		/**hodnota odkazu UEM*/
		o_uem?: string|null;
		/**hodnota odkazu UEN*/
		o_uen?: string|null;
		/**hodnota odkazu TE5*/
		o_te5?: string|null;
		/**hodnota odkazu TE6*/
		o_te6?: string|null;
		/**hodnota odkazu TE7*/
		o_te7?: string|null;
		/**hodnota odkazu TE8*/
		o_te8?: string|null;
		/**hodnota odkazu TE9*/
		o_te9?: string|null;
	}
	const enum GDataSentenceCodesDtoNames { uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", o_uea = "o_uea", o_ueb = "o_ueb", o_uec = "o_uec", o_ued = "o_ued", o_uee = "o_uee", o_uef = "o_uef", o_ueg = "o_ueg", o_ueh = "o_ueh", o_uei = "o_uei", o_uej = "o_uej", o_te0 = "o_te0", o_te1 = "o_te1", o_te2 = "o_te2", o_te3 = "o_te3", o_te4 = "o_te4", o_uek = "o_uek", o_uel = "o_uel", o_uem = "o_uem", o_uen = "o_uen", o_te5 = "o_te5", o_te6 = "o_te6", o_te7 = "o_te7", o_te8 = "o_te8", o_te9 = "o_te9", ucs = "ucs", nks = "nks", ico = "ico", rok = "rok", ixsRoz = "ixsRoz", ixsSax = "ixsSax", drd = "drd", hasMDDal = "hasMDDal", sentenceType = "sentenceType",}
	const enum GDataSentenceCodesDtoFragments { uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", o_uea = "*", o_ueb = "*", o_uec = "*", o_ued = "*", o_uee = "*", o_uef = "*", o_ueg = "*", o_ueh = "*", o_uei = "*", o_uej = "*", o_te0 = "*", o_te1 = "*", o_te2 = "*", o_te3 = "*", o_te4 = "*", o_uek = "*", o_uel = "*", o_uem = "*", o_uen = "*", o_te5 = "*", o_te6 = "*", o_te7 = "*", o_te8 = "*", o_te9 = "*", ucs = "*", nks = "*", ico = "*", rok = "*", ixsRoz = "*", ixsSax = "*", drd = "*", hasMDDal = "*", sentenceType = "*",}
	const enum GDataSentenceCodesDtoTypes { uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", o_uea = "string", o_ueb = "string", o_uec = "string", o_ued = "string", o_uee = "string", o_uef = "string", o_ueg = "string", o_ueh = "string", o_uei = "string", o_uej = "string", o_te0 = "string", o_te1 = "string", o_te2 = "string", o_te3 = "string", o_te4 = "string", o_uek = "string", o_uel = "string", o_uem = "string", o_uen = "string", o_te5 = "string", o_te6 = "string", o_te7 = "string", o_te8 = "string", o_te9 = "string", ucs = "string", nks = "string", ico = "string", rok = "number", ixsRoz = "string", ixsSax = "string", drd = "number", hasMDDal = "boolean", sentenceType = "Gordic.Eko.Interface.TypVetyEnum",}
	const enum GDataSentenceCodesDtoTypeLengths {}
	interface GDataSentenceModelDto extends Gordic.Eko.WebClient.GDataSentenceCodesDto {
		/**Ma dati*/
		c0?: JsonDecimal|null;
		/**Dal*/
		c1?: JsonDecimal|null;
	}
	const enum GDataSentenceModelDtoNames { c0 = "c0", c1 = "c1", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", o_uea = "o_uea", o_ueb = "o_ueb", o_uec = "o_uec", o_ued = "o_ued", o_uee = "o_uee", o_uef = "o_uef", o_ueg = "o_ueg", o_ueh = "o_ueh", o_uei = "o_uei", o_uej = "o_uej", o_te0 = "o_te0", o_te1 = "o_te1", o_te2 = "o_te2", o_te3 = "o_te3", o_te4 = "o_te4", o_uek = "o_uek", o_uel = "o_uel", o_uem = "o_uem", o_uen = "o_uen", o_te5 = "o_te5", o_te6 = "o_te6", o_te7 = "o_te7", o_te8 = "o_te8", o_te9 = "o_te9", ucs = "ucs", nks = "nks", ico = "ico", rok = "rok", ixsRoz = "ixsRoz", ixsSax = "ixsSax", drd = "drd", hasMDDal = "hasMDDal", sentenceType = "sentenceType",}
	const enum GDataSentenceModelDtoFragments { c0 = "*", c1 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", o_uea = "*", o_ueb = "*", o_uec = "*", o_ued = "*", o_uee = "*", o_uef = "*", o_ueg = "*", o_ueh = "*", o_uei = "*", o_uej = "*", o_te0 = "*", o_te1 = "*", o_te2 = "*", o_te3 = "*", o_te4 = "*", o_uek = "*", o_uel = "*", o_uem = "*", o_uen = "*", o_te5 = "*", o_te6 = "*", o_te7 = "*", o_te8 = "*", o_te9 = "*", ucs = "*", nks = "*", ico = "*", rok = "*", ixsRoz = "*", ixsSax = "*", drd = "*", hasMDDal = "*", sentenceType = "*",}
	const enum GDataSentenceModelDtoTypes { c0 = "JsonDecimal", c1 = "JsonDecimal", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", o_uea = "string", o_ueb = "string", o_uec = "string", o_ued = "string", o_uee = "string", o_uef = "string", o_ueg = "string", o_ueh = "string", o_uei = "string", o_uej = "string", o_te0 = "string", o_te1 = "string", o_te2 = "string", o_te3 = "string", o_te4 = "string", o_uek = "string", o_uel = "string", o_uem = "string", o_uen = "string", o_te5 = "string", o_te6 = "string", o_te7 = "string", o_te8 = "string", o_te9 = "string", ucs = "string", nks = "string", ico = "string", rok = "number", ixsRoz = "string", ixsSax = "string", drd = "number", hasMDDal = "boolean", sentenceType = "Gordic.Eko.Interface.TypVetyEnum",}
	const enum GDataSentenceModelDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Porizovac\GNewRecordDlg\Dto\GNewRecordModelDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO noveho zaznamu v rozvrhu*/
	interface GNewRecordModelDto {
		/**fullName*/
		fullName?: string|null;
		/**uroven*/
		sequence?: Gordic.Eko.WebClient.GTextCodeDto|null;
		/**Aktivita pro ucetnictvi*/
		aktivitaUct?: Gordic.Eko.WebClient.GTextCodeDto|null;
		/**Aktivita pro rozpocet*/
		aktivitaRoz?: Gordic.Eko.WebClient.GTextCodeDto|null;
		/**Bupsrr*/
		bupsrr?: string|null;
		/**ZD*/
		zd?: Gordic.Eko.WebClient.GTextCodeDto|null;
		/**Kumulace*/
		kumulace?: Gordic.Eko.WebClient.GTextCodeDto|null;
		/**Nazev noveho zaznamu*/
		name?: string|null;
		/**Datova veta - jak bude vypadat novy zaznam*/
		dataSentence?: any|null;
		/**Odkazovana datova veta - jak muze byt puvodni datova veta odkazana na jinou*/
		refDataSentence?: any|null;
		/**Příznak, zda se jedná o vytvořené dto z řádku uctdroz*/
		createdFromUctdrozRow?: boolean|null;
	}
	const enum GNewRecordModelDtoNames { fullName = "fullName", sequence = "sequence", aktivitaUct = "aktivitaUct", aktivitaRoz = "aktivitaRoz", bupsrr = "bupsrr", zd = "zd", kumulace = "kumulace", name = "name", dataSentence = "dataSentence", refDataSentence = "refDataSentence", createdFromUctdrozRow = "createdFromUctdrozRow",}
	const enum GNewRecordModelDtoFragments { fullName = "*", sequence = "*", aktivitaUct = "*", aktivitaRoz = "*", bupsrr = "*", zd = "*", kumulace = "*", name = "*", dataSentence = "*", refDataSentence = "*", createdFromUctdrozRow = "*",}
	const enum GNewRecordModelDtoTypes { fullName = "string", sequence = "Gordic.Eko.WebClient.GTextCodeDto", aktivitaUct = "Gordic.Eko.WebClient.GTextCodeDto", aktivitaRoz = "Gordic.Eko.WebClient.GTextCodeDto", bupsrr = "string", zd = "Gordic.Eko.WebClient.GTextCodeDto", kumulace = "Gordic.Eko.WebClient.GTextCodeDto", name = "string", dataSentence = "any", refDataSentence = "any", createdFromUctdrozRow = "boolean",}
	const enum GNewRecordModelDtoTypeLengths { bupsrr = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Porizovac\GNewRecordDlg\Dto\GTextCodeDto.d.ts 

declare namespace Gordic.Eko.WebClient {
    /**Obecne DTO, ktere reprezentuje kod a text*/
	interface GTextCodeDto {
        /**Zobrazovany text*/
		text: string;
        /**Hodnota prvku*/
		code: number;
	}
	const enum GTextCodeDtoNames { text = "text", code = "code",}
	const enum GTextCodeDtoFragments { text = "*", code = "*",}
	const enum GTextCodeDtoTypes { text = "string", code = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Rozbory\GEkoParamsDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO obs. podmnozinu UserProcess.EkoParams*/
	interface GEkoParamsDto {
		/**Příznak zda organizace v daném roce komunikuje se systémem Státní pokladny (IISSP)*/
		PrizIissp?: number|null;
		/**Ixs rozvrhu*/
		IxsRoz?: string|null;
		/**IČ*/
		Ico?: string|null;
		/**UCS*/
		Ucs?: string|null;
		/**NKS*/
		Nks?: string|null;
		/**Příznak odděleného sledování příjmů a výdajů (od 360) (0=nesledovat, 1=sledovat)*/
		PrizNpv?: number|null;
		/**Rok*/
		Rok?: number|null;
	}
	const enum GEkoParamsDtoNames { PrizIissp = "PrizIissp", IxsRoz = "IxsRoz", Ico = "Ico", Ucs = "Ucs", Nks = "Nks", PrizNpv = "PrizNpv", Rok = "Rok",}
	const enum GEkoParamsDtoFragments { PrizIissp = "*", IxsRoz = "*", Ico = "*", Ucs = "*", Nks = "*", PrizNpv = "*", Rok = "*",}
	const enum GEkoParamsDtoTypes { PrizIissp = "number", IxsRoz = "string", Ico = "string", Ucs = "string", Nks = "string", PrizNpv = "number", Rok = "number",}
	const enum GEkoParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Rozbory\GEkoPozadavekDetailDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**DTO objekt detailu pozadavku (v budoucnu mozna bude model)*/
	interface GEkoPozadavekDetailDto {
		/**IxsSes*/
		IxsSes?: string|null;
		/**Nazev*/
		Nazev?: string|null;
		/**Poznamka*/
		Poznamka?: string|null;
		/**Rok*/
		Rok?: number|null;
		/**Mesic*/
		Mesic?: number|null;
		/**Nazev vystupu*/
		Vystup?: string|null;
		/**TypPozadavku*/
		TypPozadavku?: Gordic.Eko.WebClient.GEkoTypMasky|null;
		/**VyberovaMaska*/
		VyberovaMaska?: boolean|null;
		/**VlastniZahlavi*/
		VlastniZahlavi?: boolean|null;
		/**Seskupeni*/
		ses?: string|null;
		ses_n?: boolean|null;
		/**Ico (plati pro vsechny krome externi sumarizace)*/
		ico?: string|null;
		/**Ico (plati pouze pro externi sumarizaci)*/
		IcoExt?: string|null;
		ico_n?: boolean|null;
		ico_s?: boolean|null;
		ucs?: string|null;
		ucs_n?: boolean|null;
		ucs_s?: boolean|null;
		uus?: string|null;
		uus_n?: boolean|null;
		uus_s?: boolean|null;
		nks?: string|null;
		nks_n?: boolean|null;
		nks_s?: boolean|null;
		flagSouhrne?: string|null;
		/**Jednotlive elementy*/
		elements?: Gordic.Eko.Interface.GEkoFilterRzbDto[]|null;
		/**Nazev masky*/
		msk_uzi_nazev?: string|null;
		/**Ixs masky*/
		ixs_msk_uzi?: string|null;
		/**Flag pap*/
		flagPap?: boolean|null;
		/**Identifikator sestavy*/
		Wrid?: string|null;
		/**Typ vystupu*/
		OutputStyle?: string|null;
		/**Nazev vystupniho formatu v lidsky citelne forme*/
		OutputStyleName?: string|null;
		/**Platnost sestav*/
		platnost?: string|null;
		/**ReportInfo*/
		ReportInfo?: Gordic.Eko.WebClient.GEkoReportInfoDto|null;
	}
	const enum GEkoPozadavekDetailDtoNames { IxsSes = "IxsSes", Nazev = "Nazev", Poznamka = "Poznamka", Rok = "Rok", Mesic = "Mesic", Vystup = "Vystup", TypPozadavku = "TypPozadavku", VyberovaMaska = "VyberovaMaska", VlastniZahlavi = "VlastniZahlavi", ses = "ses", ses_n = "ses_n", ico = "ico", IcoExt = "IcoExt", ico_n = "ico_n", ico_s = "ico_s", ucs = "ucs", ucs_n = "ucs_n", ucs_s = "ucs_s", uus = "uus", uus_n = "uus_n", uus_s = "uus_s", nks = "nks", nks_n = "nks_n", nks_s = "nks_s", flagSouhrne = "flagSouhrne", elements = "elements", msk_uzi_nazev = "msk_uzi_nazev", ixs_msk_uzi = "ixs_msk_uzi", flagPap = "flagPap", Wrid = "Wrid", OutputStyle = "OutputStyle", OutputStyleName = "OutputStyleName", platnost = "platnost", ReportInfo = "ReportInfo",}
	const enum GEkoPozadavekDetailDtoFragments { IxsSes = "*", Nazev = "*", Poznamka = "*", Rok = "*", Mesic = "*", Vystup = "*", TypPozadavku = "*", VyberovaMaska = "*", VlastniZahlavi = "*", ses = "*", ses_n = "*", ico = "*", IcoExt = "*", ico_n = "*", ico_s = "*", ucs = "*", ucs_n = "*", ucs_s = "*", uus = "*", uus_n = "*", uus_s = "*", nks = "*", nks_n = "*", nks_s = "*", flagSouhrne = "*", elements = "*", msk_uzi_nazev = "*", ixs_msk_uzi = "*", flagPap = "*", Wrid = "*", OutputStyle = "*", OutputStyleName = "*", platnost = "*", ReportInfo = "*",}
	const enum GEkoPozadavekDetailDtoTypes { IxsSes = "string", Nazev = "string", Poznamka = "string", Rok = "number", Mesic = "number", Vystup = "string", TypPozadavku = "Gordic.Eko.WebClient.GEkoTypMasky", VyberovaMaska = "boolean", VlastniZahlavi = "boolean", ses = "string", ses_n = "boolean", ico = "string", IcoExt = "string", ico_n = "boolean", ico_s = "boolean", ucs = "string", ucs_n = "boolean", ucs_s = "boolean", uus = "string", uus_n = "boolean", uus_s = "boolean", nks = "string", nks_n = "boolean", nks_s = "boolean", flagSouhrne = "string", elements = "Gordic.Eko.Interface.GEkoFilterRzbDto[]", msk_uzi_nazev = "string", ixs_msk_uzi = "string", flagPap = "boolean", Wrid = "string", OutputStyle = "string", OutputStyleName = "string", platnost = "string", ReportInfo = "Gordic.Eko.WebClient.GEkoReportInfoDto",}
	const enum GEkoPozadavekDetailDtoTypeLengths {}
	/**Typ masky*/
	const enum GEkoTypMasky {
		/**Veøejná maska*/
		Verejna=0,
		/**Osobní maska*/
		Osobni=10,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Rozbory\GEkoReportInfoDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Info o UCR sestave*/
	interface GEkoReportInfoDto {
		/**TypSestavy*/
		typSestavy?: Gordic.Eko.WebClient.GEkoTypSestavy|null;
		/**Umi sumace*/
		umiSumace?: boolean|null;
		/**Umi hromadne?*/
		umiHro?: boolean|null;
		/**Informace o sestave*/
		reportInfo?: Gordic.Report.Interface.GReportInfoDto|null;
	}
	const enum GEkoReportInfoDtoNames { typSestavy = "typSestavy", umiSumace = "umiSumace", umiHro = "umiHro", reportInfo = "reportInfo",}
	const enum GEkoReportInfoDtoFragments { typSestavy = "*", umiSumace = "*", umiHro = "*", reportInfo = "*",}
	const enum GEkoReportInfoDtoTypes { typSestavy = "Gordic.Eko.WebClient.GEkoTypSestavy", umiSumace = "boolean", umiHro = "boolean", reportInfo = "Gordic.Report.Interface.GReportInfoDto",}
	const enum GEkoReportInfoDtoTypeLengths {}
	/**Typ sestavy*/
	const enum GEkoTypSestavy {
		/**Zápisová (leze do ucrdxma)*/
		Zapisova=10,
		/**Stavová (leze do ucta0ar)*/
		Stavova=20,
		/**Obojetná (leze kam se jí zlíbí)*/
		ZapisovoStavova=30,
		/**AAT*/
		Financovani=100,
		/**Registr zavazku/pohledavek*/
		RegistrZP=200,
		/**Neurceno*/
		Neurceno=999,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Rozbory\GFilterOptionsDto.d.ts 

declare namespace Gordic.Eko.WebClient.Dto {
	/**Komplet options pro prefaby filtru v hlavicce gridu*/
	interface GFilterOptionsDto {
		/**UCS*/
		ucs?: Gordic.Eko.WebClient.GFilterOptionDto|null;
		/**UUS*/
		uus?: Gordic.Eko.WebClient.GFilterOptionUusDto|null;
		/**NKS*/
		nks?: Gordic.Eko.WebClient.GFilterOptionDto|null;
		/**DRD*/
		drd?: Gordic.Eko.WebClient.GFilterOptionDrdDto|null;
		/**AC*/
		ac?: Gordic.Eko.WebClient.GFilterOptionAcDto|null;
	}
	const enum GFilterOptionsDtoNames { ucs = "ucs", uus = "uus", nks = "nks", drd = "drd", ac = "ac",}
	const enum GFilterOptionsDtoFragments { ucs = "*", uus = "*", nks = "*", drd = "*", ac = "*",}
	const enum GFilterOptionsDtoTypes { ucs = "Gordic.Eko.WebClient.GFilterOptionDto", uus = "Gordic.Eko.WebClient.GFilterOptionUusDto", nks = "Gordic.Eko.WebClient.GFilterOptionDto", drd = "Gordic.Eko.WebClient.GFilterOptionDrdDto", ac = "Gordic.Eko.WebClient.GFilterOptionAcDto",}
	const enum GFilterOptionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\Rozbory\GFilterParamsDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Parametry filtru (pro elementy)*/
	interface GFilterParamsDto {
		/**Typ ulohy*/
		typUlohy: Gordic.Eko.WebClient.GProhlizeniEkoTaskType;
		/**ShowUct*/
		showUct: boolean;
		/**ShowRoz*/
		showRoz: boolean;
		/**ShowOst*/
		showOst: boolean;
		/**UctOnly*/
		uctOnly: boolean;
		/**RozOnly*/
		rozOnly: boolean;
		/**PrizIissp*/
		prizIissp: boolean;
		/**IxsRoz*/
		ixsRoz?: string|null;
	}
	const enum GFilterParamsDtoNames { typUlohy = "typUlohy", showUct = "showUct", showRoz = "showRoz", showOst = "showOst", uctOnly = "uctOnly", rozOnly = "rozOnly", prizIissp = "prizIissp", ixsRoz = "ixsRoz",}
	const enum GFilterParamsDtoFragments { typUlohy = "*", showUct = "*", showRoz = "*", showOst = "*", uctOnly = "*", rozOnly = "*", prizIissp = "*", ixsRoz = "*",}
	const enum GFilterParamsDtoTypes { typUlohy = "Gordic.Eko.WebClient.GProhlizeniEkoTaskType", showUct = "boolean", showRoz = "boolean", showOst = "boolean", uctOnly = "boolean", rozOnly = "boolean", prizIissp = "boolean", ixsRoz = "string",}
	const enum GFilterParamsDtoTypeLengths {}
	const enum GProhlizeniEkoTaskType {
		/**stavy rozpoctu*/
		RozpocetStav,
		/**zapisy rozpoctu*/
		RozpocetZapis,
		/**stavy ucetnictvi*/
		UcetnictviStav,
		/**zapisy ucetnictvi*/
		UcetnictviZapis,
		/**zapisy financovani*/
		FinancovaniZapis,
		/**zapisy danove evidence*/
		DanovaEvidenceZapis,
		/**zapisy danoveho priznani*/
		DanovePriznaniZapis,
		/**Zapisy primarnich pozEkovku*/
		PrimarniPozEkovkyZapis,
		/**Zapisy balancovani*/
		BalancovaniZapis,
		/**Vicelete financovani*/
		ViceleteFinancovaniZapis,
		/**Registr pohledavek a zavazku*/
		RegistrPZ,
		/**Saldokonto*/
		Saldokonto,
		/**Saldokontni zapisy*/
		SaldokontoZapis,
		/**Vsechny saldokontni zapisy ze seznamu*/
		SaldokontoZapisyVse,
		/**Ukazatele - strednedobi vyhled*/
		StrednedobyVyhled,
		/**Ukazatele - aktualni obdobi*/
		AktualniObdobi,
		/**Nezarazene zapisy*/
		IISSP_Nezarazene_zapisy,
		/**IISSP - preuctovani skutecnosti - stavy*/
		IISSP_Preuctovani_stavy,
		/**Bankovni ucty*/
		IISSP_Preuctovani_BankovniUcty,
		/**Registr davek*/
		IISSP_Preuctovani_RegistrDavek,
		/**Stavy rozpoctu*/
		IISSP_Stavy_StavyRozpoctu,
		/**Stavy cerpani rozpoctu*/
		IISSP_Stavy_StavyCerpaniRozpoctu,
		/**Stavy skutecnosti*/
		IISSP_Stavy_StavySkutecnosti,
		/**Inbox*/
		IISSP_Stavy_Inbox,
		/**Stav rezervaci*/
		IISSP_Stavy_StavyRezervaci,
		/**Stav rezervaci chyby*/
		IISSP_Stavy_StavyRezervaciChyby,
		/**Seznam pozadvku*/
		PozEkovekSeznam,
		/**Detail pozadvku*/
		PozEkovekDetail,
		/**Konsolidace -stavy*/
		KonsolidaceStavy,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Eko\UctRoz\definice.d.ts 

declare namespace Gordic.Eko.WebClient.Common {
    //function ZpracovaniZpravy(content: GContent, parametr: any): JQuery.Promise<any>;
    //function GetAllRows(grid: JQuery): any;
    //function OznaceneRadky(grid: JQuery): any;
    //function CelkovyPocetRadku(grid: JQuery): number;
    //function AktualniRadek(grid: JQuery): any;
}
//declare namespace EKOUtils { function CallRemoteService(methodName: string, params: object | null | undefined, remoteServiceName: string | null | undefined): JQueryPromise<any> }

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Gin\Controls\GResponseDto.d.ts 

declare namespace Gordic.Eko.WebClient {
    /**Dto for response. Contains info and data.*/
    interface GResponseDto<T=any> {
        /**The data*/
        data?: T|null;
        /**The information*/
        info?: Gordic.Eko.WebClient.GResponseInfoDto[]|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Eko.WebClient\Gin\Controls\GResponseInfoDto.d.ts 

declare namespace Gordic.Eko.WebClient {
	/**Info about response*/
	interface GResponseInfoDto {
		/**The kind*/
		kind?: Gordic.Eko.WebClient.GResponseInfoDto.GResponseInfoKind|null;
		/**The message*/
		message?: string|null;
		/**The data*/
		data?: object|null;
	}
	const enum GResponseInfoDtoNames { kind = "kind", message = "message", data = "data",}
	const enum GResponseInfoDtoFragments { kind = "*", message = "*", data = "*",}
	const enum GResponseInfoDtoTypes { kind = "Gordic.Eko.WebClient.GResponseInfoDto.GResponseInfoKind", message = "string", data = "object",}
	const enum GResponseInfoDtoTypeLengths {}
}
declare namespace Gordic.Eko.WebClient.GResponseInfoDto {
	const enum GResponseInfoKind {
		/**The success*/
		success//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.Makara2022.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		/**The information*/
		info//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.Makara2022.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		/**The warning*/
		warning//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.Makara2022.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
		/**The error*/
		error//Error generating initializer: System.InvalidOperationException: Sequence contains no elements

			//   at System.Linq.Enumerable.First[TSource](IEnumerable`1 source)

			//   at System.Linq.ImmutableArrayExtensions.First[T](ImmutableArray`1 immutableArray)

			//   at Gordic.Develop.Makara2022.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

