/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       wfl.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gordic.Wfl.WebClient.csproj
*    created     2026-02-16 14:33:58
*    files       Gin\Wfl\AppSettings\UAFileDatDto.d.ts
*                Gin\Wfl\AppSettings\dto\GHledaniZasilekSettingsDto.d.ts
*                Gin\Wfl\AppSettings\dto\GSgnSettingsDto.d.ts
*                Gin\Wfl\AppSettings\dto\GWflBaseSettingsDto.d.ts
*                Gin\Wfl\AppSettings\dto\GZasilkyHromadnaEditaceSettingsDto.d.ts
*                Gin\Wfl\AppSettings\dto\GZasilkySettingsDto.d.ts
*                Gin\Wfl\Common\Gordic.Wfl.WebClient.GCommonTs.d.ts
*                Gin\Wfl\Common\Dto\GGetZverejneniSmluvInputResponseDto.d.ts
*                Gin\Wfl\Common\Dto\GPridatElDokumentProIxsFormDto.d.ts
*                Gin\Wfl\Common\Dto\GWflCommonRuzneDto.d.ts
*                Gin\Wfl\Common\Dto\SSLProfil.d.ts
*                Gin\Wfl\Controls\GWflPidbar\gwflpidbar.d.ts
*                Gin\Wfl\DatoveSchranky\SKEdesk\Dto\GEformSKInputOptions.d.ts
*                Gin\Wfl\Detail\DetailBuilderComponents\GWflPrilohyComponent_custom.d.ts
*                Gin\Wfl\Detail\DetailBuilderComponents\Dto\WflComponentsDto.d.ts
*                Gin\Wfl\Detail\Dto\PozastSkartacniOperaceDto.d.ts
*                Gin\Wfl\Detail\Dto\StupenUtajeniDto.d.ts
*                Gin\Wfl\Detail\Dto\ZmenaSpouUdalostiDto.d.ts
*                Gin\Wfl\Detail\Forms\Dto\NastavFormulareKDokumentuDto.d.ts
*                Gin\Wfl\Detail\KontrolaMetadat\KontrolaMetadatDoplnPolozekItemDto.d.ts
*                Gin\Wfl\Detail\Odeslani\GOdeslaniEnums.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAdresniRadkyExtendedDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAdresyZasilkyConfigDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAsistentInfoDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAsistentSettingsDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniBaseFormDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniConfigDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniDokumentDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniDsFormDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniEDeskDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniEmailFormDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniEnabledActionsDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHistorieDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHkpFormDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHpFormDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHromadneDotcenymSubjektumNastaveniDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHromadneNastaveniDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniInterniDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniKartotekaOdpovedDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniParametryOdeslaniDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniPrilohaPisemnostiDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniSeznamDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniSeznamFormDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniSeznamPrilohEMailuDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniTiskAdresDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniTiskObalekRestrictionAlfItemsDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniZasilkaDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GPrilohaPisemnostiDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GSrvMethodCallInputDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GSrvMethodCallResultDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GWflMailStructDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GZkontrolovatZasilkuProEPKInputDto.d.ts
*                Gin\Wfl\Detail\Odeslani\Dto\GZkontrolovatZasilkuProEPKOutputDto.d.ts
*                Gin\Wfl\DocasneUloziste\Dto\GDocasneUlozisteDto.d.ts
*                Gin\Wfl\Dto\GWflDBParams.d.ts
*                Gin\Wfl\Predani\Dto\PrimePredaniDokumentuDlg.d.ts
*                Gin\Wfl\Prilohy\GAttachmentDtos.d.ts
*                Gin\Wfl\Prilohy\GAttachmentPermissionsEnum.d.ts
*                Gin\Wfl\Prilohy\gwflfilepreview.d.ts
*                Gin\Wfl\Prilohy\Dto\GAttachmentOpeningParamsDto.d.ts
*                Gin\Wfl\SignModule\Dto\GElObrazFileNameDto.d.ts
*                Gin\Wfl\SignModule\Dto\GFileContentDto.d.ts
*                Gin\Wfl\SignModule\Dto\GSignatureResultDto.d.ts
*                Gin\Wfl\SouvisejiciDokumenty\Dto\GSeznamSouvisejicichDokumentuDto.d.ts
*                Gin\Wfl\Zasilky\IGDetailZasilkyHandler.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyDzComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyEDeskComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyEmailComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHistoryComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHkpComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHpComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHpIczComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyInterniComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyVnoreneZasilkyComponentDto.d.ts
*                Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDoruceniZasilkyComponentDto.d.ts
*                Gin\Wfl\Zasilky\Dto\GDetailZasilkyDto.d.ts
*                Gin\Wfl\Zasilky\Dto\GLoadDetailZasilkyDto.d.ts
*                Gin\Wfl\Zasilky\Dto\GZasilkaInfoZHkpDto.d.ts
*                Gin\Wfl\Zasilky\Dto\GZasilkaInfoZHpDto.d.ts
*                Gin\Wfl\Zverejneni\GZverejneniPodaniDto.d.ts
*                Gin\Wfl\Zverejneni\GZverejneniSmluvPlanDto.d.ts
*                Gin\Wfl\Zverejneni\GZverejneniSmluvSeznamDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\AppSettings\UAFileDatDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**UAFileDatDto dto*/
	interface UAFileDatDto {
        /**Autogenerated.*/
		FileName?: string|null;
        /**Autogenerated.*/
		FileContent?: string|null;
	}
	const enum UAFileDatDtoNames { FileName = "FileName", FileContent = "FileContent",}
	const enum UAFileDatDtoFragments { FileName = "*", FileContent = "*",}
	const enum UAFileDatDtoTypes { FileName = "string", FileContent = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\AppSettings\dto\GHledaniZasilekSettingsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Dto uživatelského nastavení hledání zásilek v UserSettings (GStore).*/
	interface GHledaniZasilekSettingsDto extends Gordic.Wfl.Interface.Hledani.GHledaniZasilekDto {
	}
	const enum GHledaniZasilekSettingsDtoNames { TypHledani = "TypHledani", CaseSensitive = "CaseSensitive", DorSluzba = "DorSluzba", IdZasilky = "IdZasilky", IdDokumentu = "IdDokumentu", AktZnackaDok = "AktZnackaDok", PodaciCislo = "PodaciCislo", IdDZ = "IdDZ", IdEsu = "IdEsu", ObecAdresata = "ObecAdresata", StatAdresata = "StatAdresata", VolbaStatuAdresata = "VolbaStatuAdresata", IxsFunOdesl = "IxsFunOdesl", IxsSUOdesl = "IxsSUOdesl", IxsFunAkt = "IxsFunAkt", IxsSUAkt = "IxsSUAkt", ZastOsoba = "ZastOsoba", VecDokument = "VecDokument", Poznamka = "Poznamka", SpisovaZnacka = "SpisovaZnacka", StavDorucovani = "StavDorucovani", ZpusobVypraveni = "ZpusobVypraveni", DruhZasilky = "DruhZasilky", DruhZachazeni = "DruhZachazeni", DoplnkoveSluzby = "DoplnkoveSluzby", KombSluzebJeRovna = "KombSluzebJeRovna", TypObsahu = "TypObsahu", DatumVypr = "DatumVypr", DatumOdesl = "DatumOdesl", DatumUloz = "DatumUloz", DatumDoruc = "DatumDoruc", TypDatabase = "TypDatabase", DateInterval = "DateInterval", UserColumnsVlastnosti = "UserColumnsVlastnosti",}
	const enum GHledaniZasilekSettingsDtoFragments { TypHledani = "*", CaseSensitive = "*", DorSluzba = "*", IdZasilky = "*", IdDokumentu = "*", AktZnackaDok = "*", PodaciCislo = "*", IdDZ = "*", IdEsu = "*", ObecAdresata = "*", StatAdresata = "*", VolbaStatuAdresata = "*", IxsFunOdesl = "*", IxsSUOdesl = "*", IxsFunAkt = "*", IxsSUAkt = "*", ZastOsoba = "*", VecDokument = "*", Poznamka = "*", SpisovaZnacka = "*", StavDorucovani = "*", ZpusobVypraveni = "*", DruhZasilky = "*", DruhZachazeni = "*", DoplnkoveSluzby = "*", KombSluzebJeRovna = "*", TypObsahu = "*", DatumVypr = "*", DatumOdesl = "*", DatumUloz = "*", DatumDoruc = "*", TypDatabase = "*", DateInterval = "*", UserColumnsVlastnosti = "*",}
	const enum GHledaniZasilekSettingsDtoTypes { TypHledani = "Gordic.Wfl.Interface.TypHledaniZasilek", CaseSensitive = "boolean", DorSluzba = "string", IdZasilky = "string", IdDokumentu = "string", AktZnackaDok = "string", PodaciCislo = "string", IdDZ = "string", IdEsu = "string", ObecAdresata = "string", StatAdresata = "number", VolbaStatuAdresata = "Gordic.Wfl.Interface.TypFiltruDleStatu", IxsFunOdesl = "string", IxsSUOdesl = "string", IxsFunAkt = "string", IxsSUAkt = "string", ZastOsoba = "string", VecDokument = "string", Poznamka = "string", SpisovaZnacka = "string", StavDorucovani = "number[]", ZpusobVypraveni = "number[]", DruhZasilky = "number[]", DruhZachazeni = "number[]", DoplnkoveSluzby = "number[]", KombSluzebJeRovna = "boolean", TypObsahu = "number[]", DatumVypr = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", DatumOdesl = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", DatumUloz = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", DatumDoruc = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", TypDatabase = "number", DateInterval = "Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto", UserColumnsVlastnosti = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\AppSettings\dto\GSgnSettingsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Nastavení příloh, které se mají označit při přípravě odeslání zásilky.*/
	const enum OznaceniPrilohZasilky {
		/**Nenastaveno.*/
		Nenastaveno=0,
		/**Vše (obraz a přílohy).*/
		Vse=1,
		/**Nic.*/
		Nic=2,
		/**Pouze originál (obraz).*/
		PouzeOriginal=4,
	}
	/**Položka pro předvybrání příloh zásilky.*/
	const enum PolozkaPrilohZasilky {
		/**Hlavní příloha.*/
		HlavniPriloha=10,
		/**Verze hlavní přílohy před konverzí.*/
		HlavniPrilohaVerzePredKonverzi,
		/**Příloha.*/
		Priloha=20,
		/**Verze přílohy před konverzí.*/
		PrilohaVerzePredKonverzi,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\AppSettings\dto\GWflBaseSettingsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**predek wfl settings*/
	interface GWflBaseSettingsDto {
        /**po startu otevrit posldní ulohu*/
		spustitPosledniTask?: boolean|null;
	}
	const enum GWflBaseSettingsDtoNames { spustitPosledniTask = "spustitPosledniTask",}
	const enum GWflBaseSettingsDtoFragments { spustitPosledniTask = "*",}
	const enum GWflBaseSettingsDtoTypes { spustitPosledniTask = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\AppSettings\dto\GZasilkyHromadnaEditaceSettingsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Dto uživatelského nastavení zásilek v UserSettings (GStore).*/
	interface GZasilkyHromadnaEditaceSettingsDto {
		Asistent?: Gordic.Wfl.WebClient.GOdeslaniAsistentSettingsDto|null;
		DoplnkoveSluzby?: number[]|null;
		DoplnkoveSluzbyTxt?: string|null;
		DruhZasilky?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		DruhZasilkyTxt?: string|null;
		ElPostaElSoubor?: boolean|null;
		TypObsahuZasilky?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		TypObsahuZasilkyTxt?: string|null;
		ZpusobOdeslani?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		ZpusobOdeslaniTxt?: string|null;
	}
	const enum GZasilkyHromadnaEditaceSettingsDtoNames { Asistent = "Asistent", DoplnkoveSluzby = "DoplnkoveSluzby", DoplnkoveSluzbyTxt = "DoplnkoveSluzbyTxt", DruhZasilky = "DruhZasilky", DruhZasilkyTxt = "DruhZasilkyTxt", ElPostaElSoubor = "ElPostaElSoubor", TypObsahuZasilky = "TypObsahuZasilky", TypObsahuZasilkyTxt = "TypObsahuZasilkyTxt", ZpusobOdeslani = "ZpusobOdeslani", ZpusobOdeslaniTxt = "ZpusobOdeslaniTxt",}
	const enum GZasilkyHromadnaEditaceSettingsDtoFragments { Asistent = "*", DoplnkoveSluzby = "*", DoplnkoveSluzbyTxt = "*", DruhZasilky = "*", DruhZasilkyTxt = "*", ElPostaElSoubor = "*", TypObsahuZasilky = "*", TypObsahuZasilkyTxt = "*", ZpusobOdeslani = "*", ZpusobOdeslaniTxt = "*",}
	const enum GZasilkyHromadnaEditaceSettingsDtoTypes { Asistent = "Gordic.Wfl.WebClient.GOdeslaniAsistentSettingsDto", DoplnkoveSluzby = "number[]", DoplnkoveSluzbyTxt = "string", DruhZasilky = "Gordic.Ginis.DbModel.GWflcdrzEnum", DruhZasilkyTxt = "string", ElPostaElSoubor = "boolean", TypObsahuZasilky = "Gordic.Ginis.DbModel.GWflctobEnum", TypObsahuZasilkyTxt = "string", ZpusobOdeslani = "Gordic.Ginis.DbModel.GWflczpdEnum", ZpusobOdeslaniTxt = "string",}
	const enum GZasilkyHromadnaEditaceSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\AppSettings\dto\GZasilkySettingsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Dto uživatelského nastavení zásilek v UserSettings (GStore).*/
	interface GZasilkySettingsDto {
		Asistent?: Gordic.Wfl.WebClient.GOdeslaniAsistentSettingsDto|null;
		DoplnkoveSluzby?: number[]|null;
		DoplnkoveSluzbyTxt?: string|null;
		DruhZasilky?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		DruhZasilkyTxt?: string|null;
		/**Nastavení předvybrání příloh (a obrazu) zásilky.*/
		PredvybraniPrilohZasilky?: Gordic.Wfl.WebClient.OznaceniPrilohZasilky|null;
		/**Nastavení předvybrání příloh (a obrazu) zásilky.*/
		PredvybranePolozkyPrilohZasilky?: Gordic.Wfl.WebClient.PolozkaPrilohZasilky[]|null;
		TypObsahuZasilky?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		TypObsahuZasilkyTxt?: string|null;
		ZpusobOdeslani?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		ZpusobOdeslaniTxt?: string|null;
		/**Přednastaven příznaku "Do vlasních rukou" pro datové zprávy.*/
		DoVlastnichRukou?: boolean|null;
		/**Identifikátor poslední použité datov schránky jako odesilatele při odeslání.*/
		PosledniPouzitaDatovaSchrankaProOdeslani?: string|null;
		/**Přednastaven typu šablony pro tělo mailu.*/
		VyberSablonyTelaMailu?: number|null;
	}
	const enum GZasilkySettingsDtoNames { Asistent = "Asistent", DoplnkoveSluzby = "DoplnkoveSluzby", DoplnkoveSluzbyTxt = "DoplnkoveSluzbyTxt", DruhZasilky = "DruhZasilky", DruhZasilkyTxt = "DruhZasilkyTxt", PredvybraniPrilohZasilky = "PredvybraniPrilohZasilky", PredvybranePolozkyPrilohZasilky = "PredvybranePolozkyPrilohZasilky", TypObsahuZasilky = "TypObsahuZasilky", TypObsahuZasilkyTxt = "TypObsahuZasilkyTxt", ZpusobOdeslani = "ZpusobOdeslani", ZpusobOdeslaniTxt = "ZpusobOdeslaniTxt", DoVlastnichRukou = "DoVlastnichRukou", PosledniPouzitaDatovaSchrankaProOdeslani = "PosledniPouzitaDatovaSchrankaProOdeslani", VyberSablonyTelaMailu = "VyberSablonyTelaMailu",}
	const enum GZasilkySettingsDtoFragments { Asistent = "*", DoplnkoveSluzby = "*", DoplnkoveSluzbyTxt = "*", DruhZasilky = "*", DruhZasilkyTxt = "*", PredvybraniPrilohZasilky = "*", PredvybranePolozkyPrilohZasilky = "*", TypObsahuZasilky = "*", TypObsahuZasilkyTxt = "*", ZpusobOdeslani = "*", ZpusobOdeslaniTxt = "*", DoVlastnichRukou = "*", PosledniPouzitaDatovaSchrankaProOdeslani = "*", VyberSablonyTelaMailu = "*",}
	const enum GZasilkySettingsDtoTypes { Asistent = "Gordic.Wfl.WebClient.GOdeslaniAsistentSettingsDto", DoplnkoveSluzby = "number[]", DoplnkoveSluzbyTxt = "string", DruhZasilky = "Gordic.Ginis.DbModel.GWflcdrzEnum", DruhZasilkyTxt = "string", PredvybraniPrilohZasilky = "Gordic.Wfl.WebClient.OznaceniPrilohZasilky", PredvybranePolozkyPrilohZasilky = "Gordic.Wfl.WebClient.PolozkaPrilohZasilky[]", TypObsahuZasilky = "Gordic.Ginis.DbModel.GWflctobEnum", TypObsahuZasilkyTxt = "string", ZpusobOdeslani = "Gordic.Ginis.DbModel.GWflczpdEnum", ZpusobOdeslaniTxt = "string", DoVlastnichRukou = "boolean", PosledniPouzitaDatovaSchrankaProOdeslani = "string", VyberSablonyTelaMailu = "number",}
	const enum GZasilkySettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Common\Gordic.Wfl.WebClient.GCommonTs.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**struktura ikony pouzitelná i por LK - název, tooltip*/
	interface GIcon {
        /**název ikony*/
		icon?: string|null;
        /**popisek*/
		tooltip?: string|null;
	}
	const enum GIconNames { icon = "icon", tooltip = "tooltip",}
	const enum GIconFragments { icon = "*", tooltip = "*",}
	const enum GIconTypes { icon = "string", tooltip = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Common\Dto\GGetZverejneniSmluvInputResponseDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Výstupní DTO pro načtení parametrů potřebných k otevření dialogu zveřejnění smluv.*/
	interface GGetZverejneniSmluvInputResponseDto {
		/**ReadOnly režim.*/
		ReadOnlyRezim?: boolean|null;
		/**Přístup k tlačítku Zveřejnit.*/
		PristupKeZverejnit?: number|null;
		/**Přístup k tlačítku Schválit.*/
		PristupKeSchvalit?: number|null;
	}
	const enum GGetZverejneniSmluvInputResponseDtoNames { ReadOnlyRezim = "ReadOnlyRezim", PristupKeZverejnit = "PristupKeZverejnit", PristupKeSchvalit = "PristupKeSchvalit",}
	const enum GGetZverejneniSmluvInputResponseDtoFragments { ReadOnlyRezim = "*", PristupKeZverejnit = "*", PristupKeSchvalit = "*",}
	const enum GGetZverejneniSmluvInputResponseDtoTypes { ReadOnlyRezim = "boolean", PristupKeZverejnit = "number", PristupKeSchvalit = "number",}
	const enum GGetZverejneniSmluvInputResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Common\Dto\GPridatElDokumentProIxsFormDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GPridatElDokumentProIxsFormDto	GPridatElDokumentProIxsFormDto*/
	interface GPridatElDokumentProIxsFormDto extends Gordic.Gin.WebClient.GSelectFileDto {
	}
	const enum GPridatElDokumentProIxsFormDtoNames { Files = "Files", Title = "Title", Decription = "Decription",}
	const enum GPridatElDokumentProIxsFormDtoFragments { Files = "*", Title = "*", Decription = "*",}
	const enum GPridatElDokumentProIxsFormDtoTypes { Files = "Gordic.General.ApplicationInterface.GFileInfoDto[]", Title = "string", Decription = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Common\Dto\GWflCommonRuzneDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**UsingEpkInUsuDto dto*/
	interface GetNewPidForPodaniWFlUtilsDto {
		/**Autogenerated.*/
		JeDokumentPripravenkFyzDoevidovaniHlaska?: string|null;
		/**Autogenerated.*/
		Ixp?: string|null;
		/**Autogenerated.*/
		AktivaceSeckeMultipid?: boolean|null;
		/**Autogenerated.*/
		InternrniVypraveniHlaska?: string|null;
		/**Autogenerated.*/
		ListZasilekDto?: Gordic.Wfl.Interface.GZasilkaDto[]|null;
		/**Autogenerated.*/
		TypPid?: Gordic.Wfl.Interface.TypPid|null;
		/**Autogenerated.*/
		DorucenkaHlaska?: string|null;
		/**Autogenerated.*/
		PocetDorucenek?: number|null;
		/**Autogenerated.*/
		DorucenkaStornovanaHlaska?: string|null;
		/**Autogenerated.*/
		SxSProDetailZasilky?: string|null;
	}
	const enum GetNewPidForPodaniWFlUtilsDtoNames { JeDokumentPripravenkFyzDoevidovaniHlaska = "JeDokumentPripravenkFyzDoevidovaniHlaska", Ixp = "Ixp", AktivaceSeckeMultipid = "AktivaceSeckeMultipid", InternrniVypraveniHlaska = "InternrniVypraveniHlaska", ListZasilekDto = "ListZasilekDto", TypPid = "TypPid", DorucenkaHlaska = "DorucenkaHlaska", PocetDorucenek = "PocetDorucenek", DorucenkaStornovanaHlaska = "DorucenkaStornovanaHlaska", SxSProDetailZasilky = "SxSProDetailZasilky",}
	const enum GetNewPidForPodaniWFlUtilsDtoFragments { JeDokumentPripravenkFyzDoevidovaniHlaska = "*", Ixp = "*", AktivaceSeckeMultipid = "*", InternrniVypraveniHlaska = "*", ListZasilekDto = "*", TypPid = "*", DorucenkaHlaska = "*", PocetDorucenek = "*", DorucenkaStornovanaHlaska = "*", SxSProDetailZasilky = "*",}
	const enum GetNewPidForPodaniWFlUtilsDtoTypes { JeDokumentPripravenkFyzDoevidovaniHlaska = "string", Ixp = "string", AktivaceSeckeMultipid = "boolean", InternrniVypraveniHlaska = "string", ListZasilekDto = "Gordic.Wfl.Interface.GZasilkaDto[]", TypPid = "Gordic.Wfl.Interface.TypPid", DorucenkaHlaska = "string", PocetDorucenek = "number", DorucenkaStornovanaHlaska = "string", SxSProDetailZasilky = "string",}
	const enum GetNewPidForPodaniWFlUtilsDtoTypeLengths {}
	/**UsingEpkInUsuDto dto*/
	interface GetNewPidForPodaniWFlDto {
		/**Autogenerated.*/
		Ixp?: string|null;
		/**Autogenerated.*/
		EditovatExistujici?: boolean|null;
		/**Autogenerated.*/
		ListZasilekDto?: Gordic.Wfl.Interface.GZasilkaDto[]|null;
		/**Autogenerated.*/
		TypPid?: Gordic.Wfl.Interface.TypPid|null;
	}
	const enum GetNewPidForPodaniWFlDtoNames { Ixp = "Ixp", EditovatExistujici = "EditovatExistujici", ListZasilekDto = "ListZasilekDto", TypPid = "TypPid",}
	const enum GetNewPidForPodaniWFlDtoFragments { Ixp = "*", EditovatExistujici = "*", ListZasilekDto = "*", TypPid = "*",}
	const enum GetNewPidForPodaniWFlDtoTypes { Ixp = "string", EditovatExistujici = "boolean", ListZasilekDto = "Gordic.Wfl.Interface.GZasilkaDto[]", TypPid = "Gordic.Wfl.Interface.TypPid",}
	const enum GetNewPidForPodaniWFlDtoTypeLengths {}
	/**GetDetailInfoForOpening dto*/
	interface GetDetailInfoForOpeningRetDto {
		/**ixp*/
		ixp?: string|null;
		/**typ spisu*/
		typSpis?: number|null;
		/**Jde o SSD*/
		isSsd?: boolean|null;
		/**vyslednystav*/
		vyslednystav?: Gordic.Wfl.WebClient.GetDetailInfoForOpeningVyslednyStav|null;
		/**podrobnosti*/
		podrobnosti?: Gordic.Wfl.WebClient.GetDetailInfoForOpeningPodrobnostiDto|null;
	}
	const enum GetDetailInfoForOpeningRetDtoNames { ixp = "ixp", typSpis = "typSpis", isSsd = "isSsd", vyslednystav = "vyslednystav", podrobnosti = "podrobnosti",}
	const enum GetDetailInfoForOpeningRetDtoFragments { ixp = "*", typSpis = "*", isSsd = "*", vyslednystav = "*", podrobnosti = "*",}
	const enum GetDetailInfoForOpeningRetDtoTypes { ixp = "string", typSpis = "number", isSsd = "boolean", vyslednystav = "Gordic.Wfl.WebClient.GetDetailInfoForOpeningVyslednyStav", podrobnosti = "Gordic.Wfl.WebClient.GetDetailInfoForOpeningPodrobnostiDto",}
	const enum GetDetailInfoForOpeningRetDtoTypeLengths {}
	/**GetDetailInfoForOpening dto*/
	interface GetDetailInfoForOpeningPodrobnostiDto {
		/**ixp*/
		zakladniText?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**nazev*/
		datPod?: JsonDate|null;
	}
	const enum GetDetailInfoForOpeningPodrobnostiDtoNames { zakladniText = "zakladniText", nazev = "nazev", datPod = "datPod",}
	const enum GetDetailInfoForOpeningPodrobnostiDtoFragments { zakladniText = "*", nazev = "*", datPod = "*",}
	const enum GetDetailInfoForOpeningPodrobnostiDtoTypes { zakladniText = "string", nazev = "string", datPod = "JsonDate",}
	const enum GetDetailInfoForOpeningPodrobnostiDtoTypeLengths {}
	/**Vyslednystav otevření dokumentu*/
	const enum GetDetailInfoForOpeningVyslednyStav {
		/**nenalezeno*/
		Nenalezeno=0,
		/**NevalidniIxp*/
		NevalidniIxp=10,
		/**The zakaz pristupu*/
		ZakazPristupu=20,
		/**The zakaz pristupu*/
		ZakazPristupuSInformacemi=21,
		/**The zakaz pristupu*/
		Povoleno=30,
	}
	/**IxpInfoForOpeningInputDto dto*/
	interface IxpInfoForOpeningInputDto {
		/**Autogenerated.*/
		Ixp?: string|null;
		/**RezimPodani*/
		RezimPodani?: Gordic.Wfl.Interface.RezimPodaniEnum|null;
	}
	const enum IxpInfoForOpeningInputDtoNames { Ixp = "Ixp", RezimPodani = "RezimPodani",}
	const enum IxpInfoForOpeningInputDtoFragments { Ixp = "*", RezimPodani = "*",}
	const enum IxpInfoForOpeningInputDtoTypes { Ixp = "string", RezimPodani = "Gordic.Wfl.Interface.RezimPodaniEnum",}
	const enum IxpInfoForOpeningInputDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKontrolaESUVRegistrechDto {
		/**ZpusobDor*/
		ZpusDor?: number|null;
		/**IxsEsu*/
		IxsEsuOdesilatele?: string|null;
		/**CestaKZipu*/
		NewIxsEsuOdesilatele?: string|null;
		/**CestaKZipu*/
		TypDalsihoOvereni?: number|null;
		/**VyslednaZprava*/
		VyslednaZprava?: string|null;
		/**ESUIdDs*/
		ESUIdDs?: string|null;
		/**ESUStupenVer*/
		ESUStupenVer?: number|null;
		/**OtevritDetailEsu*/
		OtevritDetailEsu?: boolean|null;
		/**ProbehlPokusOOvereni*/
		ProbehlPokusOOvereni?: boolean|null;
	}
	const enum GKontrolaESUVRegistrechDtoNames { ZpusDor = "ZpusDor", IxsEsuOdesilatele = "IxsEsuOdesilatele", NewIxsEsuOdesilatele = "NewIxsEsuOdesilatele", TypDalsihoOvereni = "TypDalsihoOvereni", VyslednaZprava = "VyslednaZprava", ESUIdDs = "ESUIdDs", ESUStupenVer = "ESUStupenVer", OtevritDetailEsu = "OtevritDetailEsu", ProbehlPokusOOvereni = "ProbehlPokusOOvereni",}
	const enum GKontrolaESUVRegistrechDtoFragments { ZpusDor = "*", IxsEsuOdesilatele = "*", NewIxsEsuOdesilatele = "*", TypDalsihoOvereni = "*", VyslednaZprava = "*", ESUIdDs = "*", ESUStupenVer = "*", OtevritDetailEsu = "*", ProbehlPokusOOvereni = "*",}
	const enum GKontrolaESUVRegistrechDtoTypes { ZpusDor = "number", IxsEsuOdesilatele = "string", NewIxsEsuOdesilatele = "string", TypDalsihoOvereni = "number", VyslednaZprava = "string", ESUIdDs = "string", ESUStupenVer = "number", OtevritDetailEsu = "boolean", ProbehlPokusOOvereni = "boolean",}
	const enum GKontrolaESUVRegistrechDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface StrukturaNadrazenychEntityDto {
		/**Ixp*/
		Ixp?: string|null;
		/**Ixp*/
		Data?: Gordic.Wfl.WebClient.StrukturaNadrazenychEntityRowto[]|null;
		/**DataVecnaSkupina*/
		DataVecnaSkupina?: Gordic.Wfl.WebClient.StrukturaNadrazenychVecneSkupinyRowto[]|null;
	}
	const enum StrukturaNadrazenychEntityDtoNames { Ixp = "Ixp", Data = "Data", DataVecnaSkupina = "DataVecnaSkupina",}
	const enum StrukturaNadrazenychEntityDtoFragments { Ixp = "*", Data = "*", DataVecnaSkupina = "*",}
	const enum StrukturaNadrazenychEntityDtoTypes { Ixp = "string", Data = "Gordic.Wfl.WebClient.StrukturaNadrazenychEntityRowto[]", DataVecnaSkupina = "Gordic.Wfl.WebClient.StrukturaNadrazenychVecneSkupinyRowto[]",}
	const enum StrukturaNadrazenychEntityDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface StrukturaNadrazenychEntityRowto {
		/**Ixp*/
		Ixp?: string|null;
		/**Icon*/
		typ_entity_ico?: Gordic.Wfl.Interface.TypEntityIco|null;
		/**Icon*/
		Name?: string|null;
		/**Icon*/
		VecnaSkupina?: string|null;
		/**Icon*/
		Id_nad?: string|null;
	}
	const enum StrukturaNadrazenychEntityRowtoNames { Ixp = "Ixp", typ_entity_ico = "typ_entity_ico", Name = "Name", VecnaSkupina = "VecnaSkupina", Id_nad = "Id_nad",}
	const enum StrukturaNadrazenychEntityRowtoFragments { Ixp = "*", typ_entity_ico = "*", Name = "*", VecnaSkupina = "*", Id_nad = "*",}
	const enum StrukturaNadrazenychEntityRowtoTypes { Ixp = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", Name = "string", VecnaSkupina = "string", Id_nad = "string",}
	const enum StrukturaNadrazenychEntityRowtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface StrukturaNadrazenychVecneSkupinyRowto {
		/**Ixp*/
		Ixs_vsk?: string|null;
		/**Icon*/
		Name?: string|null;
		/**Icon*/
		Ixs_vsk_nad?: string|null;
	}
	const enum StrukturaNadrazenychVecneSkupinyRowtoNames { Ixs_vsk = "Ixs_vsk", Name = "Name", Ixs_vsk_nad = "Ixs_vsk_nad",}
	const enum StrukturaNadrazenychVecneSkupinyRowtoFragments { Ixs_vsk = "*", Name = "*", Ixs_vsk_nad = "*",}
	const enum StrukturaNadrazenychVecneSkupinyRowtoTypes { Ixs_vsk = "string", Name = "string", Ixs_vsk_nad = "string",}
	const enum StrukturaNadrazenychVecneSkupinyRowtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GPanelSouhrnDlgInputOptionsDto {
		/**Ixp*/
		Ixp?: string|null;
		/**Icon*/
		AktZnacka?: string|null;
	}
	const enum GPanelSouhrnDlgInputOptionsDtoNames { Ixp = "Ixp", AktZnacka = "AktZnacka",}
	const enum GPanelSouhrnDlgInputOptionsDtoFragments { Ixp = "*", AktZnacka = "*",}
	const enum GPanelSouhrnDlgInputOptionsDtoTypes { Ixp = "string", AktZnacka = "string",}
	const enum GPanelSouhrnDlgInputOptionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Common\Dto\SSLProfil.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Summary description for SSLProfil*/
	interface SSLProfil {
		SpisPlan?: string|null;
		SpisZnak?: string|null;
		SkartZnak?: string|null;
		SkartLhuta?: number|null;
		RokSkartace?: number|null;
	}
	const enum SSLProfilNames { SpisPlan = "SpisPlan", SpisZnak = "SpisZnak", SkartZnak = "SkartZnak", SkartLhuta = "SkartLhuta", RokSkartace = "RokSkartace",}
	const enum SSLProfilFragments { SpisPlan = "*", SpisZnak = "*", SkartZnak = "*", SkartLhuta = "*", RokSkartace = "*",}
	const enum SSLProfilTypes { SpisPlan = "string", SpisZnak = "string", SkartZnak = "string", SkartLhuta = "number", RokSkartace = "number",}
	const enum SSLProfilTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Controls\GWflPidbar\gwflpidbar.d.ts 

//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        gordic.wflpidbar.d.ts								</Name>
//    <Description> Widget - wflpidbar									</Description>
//    <Author>      thazmuka											</Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2018					</Copyright>
//    <Created>     2018-06-18											</Created>
//  </FileHeader>

/** interface (rozhraní) wflpidbaru */
declare interface IGWflPidBar {
	/** vstupní dto pro iconbar */
	dto: any | null,
	/** identifikátor */
	pid: string,
	/** příznak, že je identifikátor pidu zobrazen */
	pidVisible: boolean,
	/** příznak, že je komponenta ikon zobrazena */
    iconsVisible: boolean,
	/** příznak, že je komponenta klíčových slov zobrazena */
    keywordsVisible: boolean,
	/** zobrazení výběru barev */
    showColorbar: boolean
}

declare interface JQuery {
	/**
	 * vytvoření widgetu - komponenta gwflpid (gpidbar, giconbar, gkeywordsbar)
	 *
	 * @author thazmuka
	 * @since 480.1.0.76
	 *
	 * @param {GIntervalContextBoxOptions} options
	 * @returns {JQuery}
	 */
	gwflpidbar(options: IGWflPidBar): JQuery
	/** refresh (občerstvení) gwflpidbaru */
    gwflpidbar(method: "refresh", options: IGWflPidBar): JQuery
    gwflpidbar(method: "option", key: string, value: any): JQuery
    gwflpidbar(method: "option", options: IGWflPidBar ): JQuery
}


//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\DatoveSchranky\SKEdesk\Dto\GEformSKInputOptions.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Vstupní dto pro sk formuláře wfl*/
	interface GEformSKInputOptions {
		/**html*/
		html?: string|null;
		/**html*/
		codedHtml?: string|null;
		/**ixs_fsk*/
		ixs_fsk?: string|null;
		/**pospID*/
		pospID?: string|null;
		/**pospID*/
		pospVersion?: string|null;
		/**data v Base64*/
		xmlDataBase64?: string|null;
		/**Gets or sets the type of eform.*/
		typeOfEform?: Gordic.Psr.Interface.CreateEfromEnumType|null;
	}
	const enum GEformSKInputOptionsNames { html = "html", codedHtml = "codedHtml", ixs_fsk = "ixs_fsk", pospID = "pospID", pospVersion = "pospVersion", xmlDataBase64 = "xmlDataBase64", typeOfEform = "typeOfEform",}
	const enum GEformSKInputOptionsFragments { html = "*", codedHtml = "*", ixs_fsk = "*", pospID = "*", pospVersion = "*", xmlDataBase64 = "*", typeOfEform = "*",}
	const enum GEformSKInputOptionsTypes { html = "string", codedHtml = "string", ixs_fsk = "string", pospID = "string", pospVersion = "string", xmlDataBase64 = "string", typeOfEform = "Gordic.Psr.Interface.CreateEfromEnumType",}
	const enum GEformSKInputOptionsTypeLengths {}
	/**Vstupní dto pro dialog náhledu na sk formulář*/
	interface GEformDialogSKDlgInputOptions {
		/**html*/
		codedHtml?: string|null;
		/**codedHTMLFormDto*/
		codedHTMLFormDto?: Gordic.Wfl.Interface.CodedHTMLFormDto|null;
		/**html*/
		ixp?: string|null;
		/**ixs_fsk*/
		ixs_fsk?: string|null;
		/**pospID*/
		pospID?: string|null;
		/**pospID*/
		pospVersion?: string|null;
		/**attachmentDto*/
		attachmentDto?: Gordic.Wfl.Interface.GAttachmentDto|null;
		/**attachmentDto*/
		typeOfEform?: Gordic.Psr.Interface.CreateEfromEnumType|null;
		/**Gets or sets the formulare pro nahled.*/
		dataNahleduFormulare?: Gordic.Wfl.Interface.UPSRViewerDataForSkFormDto|null;
	}
	const enum GEformDialogSKDlgInputOptionsNames { codedHtml = "codedHtml", codedHTMLFormDto = "codedHTMLFormDto", ixp = "ixp", ixs_fsk = "ixs_fsk", pospID = "pospID", pospVersion = "pospVersion", attachmentDto = "attachmentDto", typeOfEform = "typeOfEform", dataNahleduFormulare = "dataNahleduFormulare",}
	const enum GEformDialogSKDlgInputOptionsFragments { codedHtml = "*", codedHTMLFormDto = "*", ixp = "*", ixs_fsk = "*", pospID = "*", pospVersion = "*", attachmentDto = "*", typeOfEform = "*", dataNahleduFormulare = "*",}
	const enum GEformDialogSKDlgInputOptionsTypes { codedHtml = "string", codedHTMLFormDto = "Gordic.Wfl.Interface.CodedHTMLFormDto", ixp = "string", ixs_fsk = "string", pospID = "string", pospVersion = "string", attachmentDto = "Gordic.Wfl.Interface.GAttachmentDto", typeOfEform = "Gordic.Psr.Interface.CreateEfromEnumType", dataNahleduFormulare = "Gordic.Wfl.Interface.UPSRViewerDataForSkFormDto",}
	const enum GEformDialogSKDlgInputOptionsTypeLengths {}
	/**Vstupní dto pro dialog náhledu na sk formulář*/
	interface GEformVyberFormulareDlgInputOptionsDto {
		/**html*/
		ixp?: string|null;
		/**ixs_fsk*/
		ixs_fsk?: string|null;
		/**typOtevreniDialogu*/
		typOtevreniDialogu?: Gordic.Wfl.WebClient.TypOtevreniDialoguGEformVyberFormulareDlg|null;
	}
	const enum GEformVyberFormulareDlgInputOptionsDtoNames { ixp = "ixp", ixs_fsk = "ixs_fsk", typOtevreniDialogu = "typOtevreniDialogu",}
	const enum GEformVyberFormulareDlgInputOptionsDtoFragments { ixp = "*", ixs_fsk = "*", typOtevreniDialogu = "*",}
	const enum GEformVyberFormulareDlgInputOptionsDtoTypes { ixp = "string", ixs_fsk = "string", typOtevreniDialogu = "Gordic.Wfl.WebClient.TypOtevreniDialoguGEformVyberFormulareDlg",}
	const enum GEformVyberFormulareDlgInputOptionsDtoTypeLengths {}
	/**Enum pro SK zprávy*/
	const enum TypOtevreniDialoguGEformVyberFormulareDlg {
		/**Pouze Vrati Vybranou hodnotu*/
		PouzeVratitVyber=0,
		/**Uloží do příloh*/
		UlozitDoPriloh=10,
	}
	/**Enum pro SK zprávy*/
	const enum TypZobrazeniHistorieKonverzaceSKZpravDlgEnum {
		/**VsePodleCorrelationId*/
		VsePodleCorrelationId,
		/**DorucenkyPodleRefferenceID*/
		DorucenkyPodleReferenceID,
	}
	/**HistorieKonverzaceSKZpravDlg*/
	interface HistorieKonverzaceSKZpravDto {
		/**poznamka*/
		poznamka?: string|null;
		/**ixb*/
		ixb?: string|null;
		/**message_id*/
		message_id?: string|null;
		/**correlation_id*/
		correlation_id?: string|null;
		/**business_id*/
		business_id?: string|null;
		/**reference_id*/
		reference_id?: string|null;
		/**message_type*/
		message_type?: string|null;
		/**mail_from*/
		mail_from?: string|null;
		/**dat_pod*/
		dat_pod?: JsonDate|null;
		/**dat_prij*/
		dat_prij?: JsonDate|null;
		/**dat_zprac*/
		dat_zprac?: JsonDate|null;
		/**nazev_fun_zprac*/
		nazev_fun_zprac?: string|null;
		/**mail_to*/
		mail_to?: string|null;
		/**poznamka*/
		nazev?: string|null;
		/**sxs*/
		sxs?: string|null;
		/**dat_odes*/
		dat_odes?: JsonDate|null;
		/**dat*/
		dat?: JsonDate|null;
		/**typ*/
		typ?: Gordic.Wfl.WebClient.TypHistorieKonverzaceSKZpravEnum|null;
		/**ixp*/
		ixp?: string|null;
	}
	const enum HistorieKonverzaceSKZpravDtoNames { poznamka = "poznamka", ixb = "ixb", message_id = "message_id", correlation_id = "correlation_id", business_id = "business_id", reference_id = "reference_id", message_type = "message_type", mail_from = "mail_from", dat_pod = "dat_pod", dat_prij = "dat_prij", dat_zprac = "dat_zprac", nazev_fun_zprac = "nazev_fun_zprac", mail_to = "mail_to", nazev = "nazev", sxs = "sxs", dat_odes = "dat_odes", dat = "dat", typ = "typ", ixp = "ixp",}
	const enum HistorieKonverzaceSKZpravDtoFragments { poznamka = "*", ixb = "*", message_id = "*", correlation_id = "*", business_id = "*", reference_id = "*", message_type = "*", mail_from = "*", dat_pod = "*", dat_prij = "*", dat_zprac = "*", nazev_fun_zprac = "*", mail_to = "*", nazev = "*", sxs = "*", dat_odes = "*", dat = "*", typ = "*", ixp = "*",}
	const enum HistorieKonverzaceSKZpravDtoTypes { poznamka = "string", ixb = "string", message_id = "string", correlation_id = "string", business_id = "string", reference_id = "string", message_type = "string", mail_from = "string", dat_pod = "JsonDate", dat_prij = "JsonDate", dat_zprac = "JsonDate", nazev_fun_zprac = "string", mail_to = "string", nazev = "string", sxs = "string", dat_odes = "JsonDate", dat = "JsonDate", typ = "Gordic.Wfl.WebClient.TypHistorieKonverzaceSKZpravEnum", ixp = "string",}
	const enum HistorieKonverzaceSKZpravDtoTypeLengths {}
	/**Enum pro SK zprávy*/
	const enum TypHistorieKonverzaceSKZpravEnum {
		/**Podani*/
		Podani,
		/**Informační zpráva*/
		Informacni,
		/**Zasilka*/
		Zasilka,
	}
	/**HistorieKonverzaceSKZpravDlg*/
	interface HistorieKonverzaceSKZpravInternalDto {
		/**correlation_id*/
		correlation_idList?: string[]|null;
		/**reference_id*/
		reference_idList?: string[]|null;
	}
	const enum HistorieKonverzaceSKZpravInternalDtoNames { correlation_idList = "correlation_idList", reference_idList = "reference_idList",}
	const enum HistorieKonverzaceSKZpravInternalDtoFragments { correlation_idList = "*", reference_idList = "*",}
	const enum HistorieKonverzaceSKZpravInternalDtoTypes { correlation_idList = "string[]", reference_idList = "string[]",}
	const enum HistorieKonverzaceSKZpravInternalDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\GWflPrilohyComponent_custom.d.ts 

declare namespace Gordic.Wfl.DetailBuilderComponents {
    export interface GWflPrilohyExtensions {
       refreshAttachments?: (cnt?:GContent) => boolean
    }
    
    export interface GWflPrilohyOptions {
        sidepanelTitle?: string
        useMainAttachment?: boolean
        attachmentPreviewOpts?: any
        kpiAttachmentUploaderOpts?: any
        readMainAttachment?: (cnt, ixp) => Interface.GAttachmentDto 
        refreshAttachments?: (cnt) => boolean
        getContentParams?: (inputDto, componentDto) => GContentInitializer
        initTab?: (tab) => void
    }

    export class WflPrilohy {
        static create(inputDto: { ixp: string }, componentDto: Wfl.WebClient.GWflPrilohyComponentDto, opts: GWflPrilohyOptions): Gin.DetailBuilder.GDetailBuilderComponent<Gin.DetailBuilder.GDetailBuilderContent>
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\DetailBuilderComponents\Dto\WflComponentsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**DTO for Zveřejnění component.*/
	interface GWflZverejneniComponentDto {
		/**Identifikátor dokumentu*/
		Ixp?: string|null;
		/**Aktuální řádek seznamu*/
		CurrentDataRowZs?: Gordic.Wfl.Interface.GZverejneniSmluvSeznamDto|null;
		/**změním stav -> 60, pro způsoby, které mají jenom zahájení a jsou ve stavu zveřejněno*/
		PseudoStorno?: boolean|null;
		/**Typ agendy*/
		TypAg?: number|null;
		/**nadřazená žádost ke zveřejnění*/
		NadRow?: Gordic.Wfl.Interface.GZverejneniSmluvSeznamDto|null;
		/**Přístup k tlačítku schválit*/
		PristupKeSchvalit?: number|null;
		/**Přístup k tlačítku zveřejnit*/
		PristupKeZverejnit?: number|null;
		/**ReadOnly režim*/
		ReadOnlyRezim?: boolean|null;
		/**Aktuální typ prováděné operace*/
		Operace?: number|null;
		/**DB parametr -*/
		gin_zve_easy?: number|null;
		/**Datum změny dokumentu - pro kontroly*/
		DokumentDatZmena?: JsonDate|null;
		/**Funkce ixs_fun (UserProcess.SessionInfo)*/
		ixs_fun?: string|null;
	}
	const enum GWflZverejneniComponentDtoNames { Ixp = "Ixp", CurrentDataRowZs = "CurrentDataRowZs", PseudoStorno = "PseudoStorno", TypAg = "TypAg", NadRow = "NadRow", PristupKeSchvalit = "PristupKeSchvalit", PristupKeZverejnit = "PristupKeZverejnit", ReadOnlyRezim = "ReadOnlyRezim", Operace = "Operace", gin_zve_easy = "gin_zve_easy", DokumentDatZmena = "DokumentDatZmena", ixs_fun = "ixs_fun",}
	const enum GWflZverejneniComponentDtoFragments { Ixp = "*", CurrentDataRowZs = "*", PseudoStorno = "*", TypAg = "*", NadRow = "*", PristupKeSchvalit = "*", PristupKeZverejnit = "*", ReadOnlyRezim = "*", Operace = "*", gin_zve_easy = "*", DokumentDatZmena = "*", ixs_fun = "*",}
	const enum GWflZverejneniComponentDtoTypes { Ixp = "string", CurrentDataRowZs = "Gordic.Wfl.Interface.GZverejneniSmluvSeznamDto", PseudoStorno = "boolean", TypAg = "number", NadRow = "Gordic.Wfl.Interface.GZverejneniSmluvSeznamDto", PristupKeSchvalit = "number", PristupKeZverejnit = "number", ReadOnlyRezim = "boolean", Operace = "number", gin_zve_easy = "number", DokumentDatZmena = "JsonDate", ixs_fun = "string",}
	const enum GWflZverejneniComponentDtoTypeLengths {}
	/**Dto for cinnosti component.*/
	interface GWflZalozkaZverejneniComponentDto {
		/**ixp.*/
		ixp?: string|null;
		/**ixp.*/
		ixs_zpv?: string|null;
		/**druhOperace.*/
		druhOperace?: string|null;
		/**Operace.*/
		Operace?: number|null;
		/**dat_zve.*/
		dat_zve?: JsonDate|null;
		/**druhOperace.*/
		stavZadosti?: string|null;
		/**id_zve.*/
		id_zve?: string|null;
		/**predmetPopis.*/
		predmetPopis?: string|null;
		/**ixs_ulz.*/
		ixs_ulz?: string|null;
		/**ixs_ulz.*/
		ktg_dms?: string|null;
		/**enabledUDE.*/
		enabledUDE?: boolean|null;
		/**enabledEPK.*/
		enabledEPK?: boolean|null;
		/**datumSejmutiVisible.*/
		datumSejmutiVisible?: boolean|null;
		/**DatZve.*/
		dat_od?: JsonDate|null;
		/**DatZve.*/
		dat_do?: JsonDate|null;
		/**duvodStahnout*/
		duvodStahnout?: string|null;
		/**duvodVisible.*/
		duvodVisible?: boolean|null;
		/**elObrazVisible.*/
		elObrazVisible?: boolean|null;
		/**dataDoGriduVybrane.*/
		dataDoGriduVybrane?: any|null;
		/**ixb_eodpoved*/
		ixb_eodpoved?: string|null;
		/**url_zve*/
		url_zve?: string|null;
		/**ixp_orig*/
		ixp_orig?: string|null;
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GWflZalozkaZverejneniComponentDtoNames { ixp = "ixp", ixs_zpv = "ixs_zpv", druhOperace = "druhOperace", Operace = "Operace", dat_zve = "dat_zve", stavZadosti = "stavZadosti", id_zve = "id_zve", predmetPopis = "predmetPopis", ixs_ulz = "ixs_ulz", ktg_dms = "ktg_dms", enabledUDE = "enabledUDE", enabledEPK = "enabledEPK", datumSejmutiVisible = "datumSejmutiVisible", dat_od = "dat_od", dat_do = "dat_do", duvodStahnout = "duvodStahnout", duvodVisible = "duvodVisible", elObrazVisible = "elObrazVisible", dataDoGriduVybrane = "dataDoGriduVybrane", ixb_eodpoved = "ixb_eodpoved", url_zve = "url_zve", ixp_orig = "ixp_orig", Validators = "Validators",}
	const enum GWflZalozkaZverejneniComponentDtoFragments { ixp = "*", ixs_zpv = "*", druhOperace = "*", Operace = "*", dat_zve = "*", stavZadosti = "*", id_zve = "*", predmetPopis = "*", ixs_ulz = "*", ktg_dms = "*", enabledUDE = "*", enabledEPK = "*", datumSejmutiVisible = "*", dat_od = "*", dat_do = "*", duvodStahnout = "*", duvodVisible = "*", elObrazVisible = "*", dataDoGriduVybrane = "*", ixb_eodpoved = "*", url_zve = "*", ixp_orig = "*", Validators = "*",}
	const enum GWflZalozkaZverejneniComponentDtoTypes { ixp = "string", ixs_zpv = "string", druhOperace = "string", Operace = "number", dat_zve = "JsonDate", stavZadosti = "string", id_zve = "string", predmetPopis = "string", ixs_ulz = "string", ktg_dms = "string", enabledUDE = "boolean", enabledEPK = "boolean", datumSejmutiVisible = "boolean", dat_od = "JsonDate", dat_do = "JsonDate", duvodStahnout = "string", duvodVisible = "boolean", elObrazVisible = "boolean", dataDoGriduVybrane = "any", ixb_eodpoved = "string", url_zve = "string", ixp_orig = "string", Validators = "object",}
	const enum GWflZalozkaZverejneniComponentDtoTypeLengths {}
	const enum GMainAttachmentKpiModeEnum {
		/**KPI with icon and text*/
		Default,
		/**KPI with icon only - without text*/
		Small,
	}
	/**Dto for Prilohy Component*/
	interface GIxsPrilohyComponentDto {
		/**IXS*/
		ixs?: string|null;
		islName?: string|null;
		/**Gets or sets the main component information.*/
		mainAttachmentInfo?: Gordic.Wfl.Interface.GAttachmentDto|null;
		mainAttachmentKpiMode?: Gordic.Wfl.WebClient.GMainAttachmentKpiModeEnum|null;
		attachmentVersionDialog?: string|null;
		attachmentPreviewTask?: string|null;
		attachmentDownloader?: string|null;
		attachmentUploader?: string|null;
		LzeVlozitElObraz?: boolean|null;
		/**Gets or sets the count.*/
		attachmentsCount?: number|null;
		/**Gets or sets the empty message.*/
		emptyMessage?: string|null;
		/**Gets or sets the NahledEleVisible.*/
		NahledEleVisible?: boolean|null;
		/**Gets or sets the PouzitPristup gin_ele_prifp*/
		PouzitPristup?: boolean|null;
		/**Přílohy lze pouze číst, nelze s nimi jinak nakládat*/
		readonly?: boolean|null;
	}
	const enum GIxsPrilohyComponentDtoNames { ixs = "ixs", islName = "islName", mainAttachmentInfo = "mainAttachmentInfo", mainAttachmentKpiMode = "mainAttachmentKpiMode", attachmentVersionDialog = "attachmentVersionDialog", attachmentPreviewTask = "attachmentPreviewTask", attachmentDownloader = "attachmentDownloader", attachmentUploader = "attachmentUploader", LzeVlozitElObraz = "LzeVlozitElObraz", attachmentsCount = "attachmentsCount", emptyMessage = "emptyMessage", NahledEleVisible = "NahledEleVisible", PouzitPristup = "PouzitPristup", readonly = "readonly",}
	const enum GIxsPrilohyComponentDtoFragments { ixs = "*", islName = "*", mainAttachmentInfo = "*", mainAttachmentKpiMode = "*", attachmentVersionDialog = "*", attachmentPreviewTask = "*", attachmentDownloader = "*", attachmentUploader = "*", LzeVlozitElObraz = "*", attachmentsCount = "*", emptyMessage = "*", NahledEleVisible = "*", PouzitPristup = "*", readonly = "*",}
	const enum GIxsPrilohyComponentDtoTypes { ixs = "string", islName = "string", mainAttachmentInfo = "Gordic.Wfl.Interface.GAttachmentDto", mainAttachmentKpiMode = "Gordic.Wfl.WebClient.GMainAttachmentKpiModeEnum", attachmentVersionDialog = "string", attachmentPreviewTask = "string", attachmentDownloader = "string", attachmentUploader = "string", LzeVlozitElObraz = "boolean", attachmentsCount = "number", emptyMessage = "string", NahledEleVisible = "boolean", PouzitPristup = "boolean", readonly = "boolean",}
	const enum GIxsPrilohyComponentDtoTypeLengths {}
	/**Dto for Prilohy Component*/
	interface GWflPrilohyComponentDto {
		/**Gets or sets the attachment cotnent class.*/
		attachmentMainContent?: string|null;
		/**Gets or sets the attachment main content dto. This overrides NazevUDA, PopisUDA and Ixp.*/
		attachmentMainContentDto?: object|null;
		/**Gets or sets the main component information.*/
		mainAttachmentInfo?: Gordic.Wfl.Interface.GAttachmentDto|null;
		mainAttachmentKpiMode?: Gordic.Wfl.WebClient.GMainAttachmentKpiModeEnum|null;
		/**Gets or sets the nazev uda.*/
		NazevUDA?: string|null;
		/**Gets or sets the popis uda.*/
		PopisUDA?: string|null;
		/**Gets or sets the popis uda.*/
		PovoleniAkci?: Gordic.Wfl.Interface.PrilohyPovoleniAkci|null;
		/**Gets or sets the PrizSpis.*/
		PrizSpis?: number|null;
		/**Gets or sets the NahledEleVisible.*/
		NahledEleVisible?: boolean|null;
		/**Gets or sets the PouzitPristup gin_ele_prifp*/
		PouzitPristup?: boolean|null;
		/**Gets or sets the PrizRezimUtaj*/
		PrizRezimUtaj?: boolean|null;
		/**Gets or sets the StUtajId*/
		StUtajId?: number|null;
		/**Gets or sets the WflPristupyPri*/
		WflPristupyPri?: number|null;
		LzeVlozitElObraz?: boolean|null;
		/**Gets or sets the attachment preview class.*/
		attachmentPreviewContent?: string|null;
		/**Gets or sets the attachment preview class.*/
		attachmentPreviewAsyncTask?: string|null;
		/**Gets or sets the count.*/
		attachmentsCount?: number|null;
		/**Gets or sets the count.*/
		ixb_elp?: string|null;
		/**Gets or sets the empty message.*/
		emptyMessage?: string|null;
		UsePlusFormatInCounts?: boolean|null;
	}
	const enum GWflPrilohyComponentDtoNames { attachmentMainContent = "attachmentMainContent", attachmentMainContentDto = "attachmentMainContentDto", mainAttachmentInfo = "mainAttachmentInfo", mainAttachmentKpiMode = "mainAttachmentKpiMode", NazevUDA = "NazevUDA", PopisUDA = "PopisUDA", PovoleniAkci = "PovoleniAkci", PrizSpis = "PrizSpis", NahledEleVisible = "NahledEleVisible", PouzitPristup = "PouzitPristup", PrizRezimUtaj = "PrizRezimUtaj", StUtajId = "StUtajId", WflPristupyPri = "WflPristupyPri", LzeVlozitElObraz = "LzeVlozitElObraz", attachmentPreviewContent = "attachmentPreviewContent", attachmentPreviewAsyncTask = "attachmentPreviewAsyncTask", attachmentsCount = "attachmentsCount", ixb_elp = "ixb_elp", emptyMessage = "emptyMessage", UsePlusFormatInCounts = "UsePlusFormatInCounts",}
	const enum GWflPrilohyComponentDtoFragments { attachmentMainContent = "*", attachmentMainContentDto = "*", mainAttachmentInfo = "*", mainAttachmentKpiMode = "*", NazevUDA = "*", PopisUDA = "*", PovoleniAkci = "*", PrizSpis = "*", NahledEleVisible = "*", PouzitPristup = "*", PrizRezimUtaj = "*", StUtajId = "*", WflPristupyPri = "*", LzeVlozitElObraz = "*", attachmentPreviewContent = "*", attachmentPreviewAsyncTask = "*", attachmentsCount = "*", ixb_elp = "*", emptyMessage = "*", UsePlusFormatInCounts = "*",}
	const enum GWflPrilohyComponentDtoTypes { attachmentMainContent = "string", attachmentMainContentDto = "object", mainAttachmentInfo = "Gordic.Wfl.Interface.GAttachmentDto", mainAttachmentKpiMode = "Gordic.Wfl.WebClient.GMainAttachmentKpiModeEnum", NazevUDA = "string", PopisUDA = "string", PovoleniAkci = "Gordic.Wfl.Interface.PrilohyPovoleniAkci", PrizSpis = "number", NahledEleVisible = "boolean", PouzitPristup = "boolean", PrizRezimUtaj = "boolean", StUtajId = "number", WflPristupyPri = "number", LzeVlozitElObraz = "boolean", attachmentPreviewContent = "string", attachmentPreviewAsyncTask = "string", attachmentsCount = "number", ixb_elp = "string", emptyMessage = "string", UsePlusFormatInCounts = "boolean",}
	const enum GWflPrilohyComponentDtoTypeLengths {}
	/**Dto for Linked Docs Component*/
	interface GSslHeaderFilterTypuDokumentu {
		/**Ktg_typ*/
		ktg_typ?: number[]|null;
	}
	const enum GSslHeaderFilterTypuDokumentuNames { ktg_typ = "ktg_typ",}
	const enum GSslHeaderFilterTypuDokumentuFragments { ktg_typ = "*",}
	const enum GSslHeaderFilterTypuDokumentuTypes { ktg_typ = "number[]",}
	const enum GSslHeaderFilterTypuDokumentuTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Dto\PozastSkartacniOperaceDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**ZmenaSpouUdalostiDto*/
	interface PozastSkartacniOperaceDto {
		/**Autogenerated.*/
		DuvodPozSkar?: string|null;
		/**Autogenerated.*/
		ChbxPozastSkOperace?: boolean|null;
		/**Autogenerated.*/
		RokDoPozSkar?: number|null;
	}
	const enum PozastSkartacniOperaceDtoNames { DuvodPozSkar = "DuvodPozSkar", ChbxPozastSkOperace = "ChbxPozastSkOperace", RokDoPozSkar = "RokDoPozSkar",}
	const enum PozastSkartacniOperaceDtoFragments { DuvodPozSkar = "*", ChbxPozastSkOperace = "*", RokDoPozSkar = "*",}
	const enum PozastSkartacniOperaceDtoTypes { DuvodPozSkar = "string", ChbxPozastSkOperace = "boolean", RokDoPozSkar = "number",}
	const enum PozastSkartacniOperaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Dto\StupenUtajeniDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**ZmenaSpouUdalostiDto*/
	interface StupenUtajeniDto {
		/**Autogenerated.*/
		StuUtajId?: number|null;
		/**Autogenerated.*/
		Duvod?: string|null;
		/**Autogenerated.*/
		Platnost?: string|null;
		/**zmenilaSePouzePlatnost.*/
		ZmenilaSePouzePlatnostNeboDuvod?: boolean|null;
		/**zmenilaSePouzePlatnost.*/
		VsechnyStupneUtajeni?: boolean|null;
	}
	const enum StupenUtajeniDtoNames { StuUtajId = "StuUtajId", Duvod = "Duvod", Platnost = "Platnost", ZmenilaSePouzePlatnostNeboDuvod = "ZmenilaSePouzePlatnostNeboDuvod", VsechnyStupneUtajeni = "VsechnyStupneUtajeni",}
	const enum StupenUtajeniDtoFragments { StuUtajId = "*", Duvod = "*", Platnost = "*", ZmenilaSePouzePlatnostNeboDuvod = "*", VsechnyStupneUtajeni = "*",}
	const enum StupenUtajeniDtoTypes { StuUtajId = "number", Duvod = "string", Platnost = "string", ZmenilaSePouzePlatnostNeboDuvod = "boolean", VsechnyStupneUtajeni = "boolean",}
	const enum StupenUtajeniDtoTypeLengths {}
	/**ZmenaSpouUdalostiDto*/
	interface NastaveniPrizZobZastupemDto {
		/**Autogenerated.*/
		PrizZobZast?: number|null;
		/**Autogenerated.*/
		Duvod?: string|null;
	}
	const enum NastaveniPrizZobZastupemDtoNames { PrizZobZast = "PrizZobZast", Duvod = "Duvod",}
	const enum NastaveniPrizZobZastupemDtoFragments { PrizZobZast = "*", Duvod = "*",}
	const enum NastaveniPrizZobZastupemDtoTypes { PrizZobZast = "number", Duvod = "string",}
	const enum NastaveniPrizZobZastupemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Dto\ZmenaSpouUdalostiDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**ZmenaSpouUdalostiDto*/
	interface ZmenaSpouUdalostiDto {
		/**Autogenerated.*/
		RokSpUdal?: number|null;
		/**Autogenerated.*/
		CheckBoxRokNeznamy?: boolean|null;
		/**Autogenerated.*/
		PopisSpousteciUdalosti?: string|null;
		/**Autogenerated.*/
		RokVznikuSpisu?: number|null;
	}
	const enum ZmenaSpouUdalostiDtoNames { RokSpUdal = "RokSpUdal", CheckBoxRokNeznamy = "CheckBoxRokNeznamy", PopisSpousteciUdalosti = "PopisSpousteciUdalosti", RokVznikuSpisu = "RokVznikuSpisu",}
	const enum ZmenaSpouUdalostiDtoFragments { RokSpUdal = "*", CheckBoxRokNeznamy = "*", PopisSpousteciUdalosti = "*", RokVznikuSpisu = "*",}
	const enum ZmenaSpouUdalostiDtoTypes { RokSpUdal = "number", CheckBoxRokNeznamy = "boolean", PopisSpousteciUdalosti = "string", RokVznikuSpisu = "number",}
	const enum ZmenaSpouUdalostiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Forms\Dto\NastavFormulareKDokumentuDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**Wfl dokument Dto GDetWflspid*/
	interface NastavFormulareKDokumentuDto {
        /**ixp s malím kvůli vlastově interfaceu*/
		Ixp?: string|null;
        /**Seznam Formularu k dokumentu.*/
		SeznamFormularuKDokumentu?: Gordic.Wfl.Interface.GSslvfrpDto[]|null;
        /**Seznam Formularu k dokumentu.*/
		SeznamDostupnychFormularuDokumentu?: Gordic.Wfl.Interface.GSslvfrmDto[]|null;
	}
	const enum NastavFormulareKDokumentuDtoNames { Ixp = "Ixp", SeznamFormularuKDokumentu = "SeznamFormularuKDokumentu", SeznamDostupnychFormularuDokumentu = "SeznamDostupnychFormularuDokumentu",}
	const enum NastavFormulareKDokumentuDtoFragments { Ixp = "*", SeznamFormularuKDokumentu = "*", SeznamDostupnychFormularuDokumentu = "*",}
	const enum NastavFormulareKDokumentuDtoTypes { Ixp = "string", SeznamFormularuKDokumentu = "Gordic.Wfl.Interface.GSslvfrpDto[]", SeznamDostupnychFormularuDokumentu = "Gordic.Wfl.Interface.GSslvfrmDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\KontrolaMetadat\KontrolaMetadatDoplnPolozekItemDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Autor neevidovaného dokumentu/spisu*/
	interface KontrolaMetadatDoplnPolozekAutorNeevidDokSpis {
		/**IxsSu*/
		IxsSu?: string|null;
		/**IxsZmp*/
		IxsZmp?: string|null;
	}
	const enum KontrolaMetadatDoplnPolozekAutorNeevidDokSpisNames { IxsSu = "IxsSu", IxsZmp = "IxsZmp",}
	const enum KontrolaMetadatDoplnPolozekAutorNeevidDokSpisFragments { IxsSu = "*", IxsZmp = "*",}
	const enum KontrolaMetadatDoplnPolozekAutorNeevidDokSpisTypes { IxsSu = "string", IxsZmp = "string",}
	/**Kontrola metadat - doplnění položek (ITEM DTO)*/
	interface KontrolaMetadatDoplnPolozekItemDto {
		/**Spisový znak*/
		SpisZnakObj?: Gordic.Wfl.Interface.GSslProfilStruktura|null;
		/**Typ dokumentu*/
		IxsTyp?: string|null;
		/**Věc*/
		Vec?: string|null;
		/**Autor neevidovaného dokumentu/spisu*/
		Autor?: Gordic.Wfl.WebClient.KontrolaMetadatDoplnPolozekAutorNeevidDokSpis|null;
		/**Počet příloh*/
		PocetPriloh?: number|null;
		/**Počet listů*/
		PocetListu?: number|null;
		/**Odesílatel*/
		Odesilatel?: Gordic.Wfl.Interface.GEsuIxsStruktura|null;
		/**Datum vytvoření neevidovaného dokumentu/spisu*/
		DatumVytvoreni?: JsonDate|null;
	}
	const enum KontrolaMetadatDoplnPolozekItemDtoNames { SpisZnakObj = "SpisZnakObj", IxsTyp = "IxsTyp", Vec = "Vec", Autor = "Autor", PocetPriloh = "PocetPriloh", PocetListu = "PocetListu", Odesilatel = "Odesilatel", DatumVytvoreni = "DatumVytvoreni",}
	const enum KontrolaMetadatDoplnPolozekItemDtoFragments { SpisZnakObj = "*", IxsTyp = "*", Vec = "*", Autor = "*", PocetPriloh = "*", PocetListu = "*", Odesilatel = "*", DatumVytvoreni = "*",}
	const enum KontrolaMetadatDoplnPolozekItemDtoTypes { SpisZnakObj = "Gordic.Wfl.Interface.GSslProfilStruktura", IxsTyp = "string", Vec = "string", Autor = "Gordic.Wfl.WebClient.KontrolaMetadatDoplnPolozekAutorNeevidDokSpis", PocetPriloh = "number", PocetListu = "number", Odesilatel = "Gordic.Wfl.Interface.GEsuIxsStruktura", DatumVytvoreni = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\GOdeslaniEnums.d.ts 

declare namespace Gordic.Wfl.WebClient {
	const enum GOdeslaniAsistentCasoveObdobiEnum {
		/**The neomezeno*/
		Neomezeno=0,
		/**The mesic*/
		Mesic=20,
		/**The ctvrtleti*/
		Ctvrtleti=30,
		/**The rok*/
		Rok=50,
	}
	const enum GOdeslaniBulkActionEnum {
		None=0,
		Odeslani=1,
		/**Ověření datové a Gex schránky.*/
		OvereniIsds=2,
		/**Ověření doručovací adresy.*/
		OvereniEsu=3,
		Konverze=4,
		HromadnaZmena=5,
		GenerujIdDorucenek=6,
		/**Ověření eDesk schránky.*/
		OvereniEDesk=7,
		/**Uložení*/
		Ulozeni=8,
		/**Uložení včetně předpisu elektronických zásilek.*/
		UlozeniSPrdpisem=9,
	}
	const enum GOdeslaniBulkBaseResultEnum {
		None=0,
		Ok=1,
		Fail=2,
	}
	const enum GOdeslaniHromadneNastaveniKomuOdeslatEnum {
		/**The prvni dotceny subjekt*/
		PrvniDotcenySubjekt=0,
		/**The vsem dotcenym subjektum*/
		VsemDotcenymSubjektum=1,
		/**The subjekt dle duvodu vazby*/
		SubjektDleDuvoduVazby=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAdresniRadkyExtendedDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Adresa zásilky spolu s adresou z Esu.*/
	interface GOdeslaniAdresniRadkyExtendedDto extends Gordic.Wfl.Interface.GOdeslaniAdresniRadkyDto {
		/**EsuTxt.*/
		EsuTxt?: string|null;
		/**1. řádek adresy zásilky.*/
		ASt0?: string|null;
		/**Autogenerated.*/
		ASt1?: string|null;
		/**Autogenerated.*/
		ASt2?: string|null;
		/**Autogenerated.*/
		ASt3?: string|null;
		/**Autogenerated.*/
		ASt4?: string|null;
		/**Autogenerated.*/
		ASt5?: string|null;
		/**Autogenerated.*/
		ASt6?: string|null;
		/**Autogenerated.*/
		ASt7?: string|null;
	}
	const enum GOdeslaniAdresniRadkyExtendedDtoNames { EsuTxt = "EsuTxt", ASt0 = "ASt0", ASt1 = "ASt1", ASt2 = "ASt2", ASt3 = "ASt3", ASt4 = "ASt4", ASt5 = "ASt5", ASt6 = "ASt6", ASt7 = "ASt7", StErrorMessage = "StErrorMessage", St0 = "St0", St1 = "St1", St2 = "St2", St3 = "St3", St4 = "St4", St5 = "St5", St6 = "St6", St7 = "St7",}
	const enum GOdeslaniAdresniRadkyExtendedDtoFragments { EsuTxt = "*", ASt0 = "*", ASt1 = "*", ASt2 = "*", ASt3 = "*", ASt4 = "*", ASt5 = "*", ASt6 = "*", ASt7 = "*", StErrorMessage = "*", St0 = "*", St1 = "*", St2 = "*", St3 = "*", St4 = "*", St5 = "*", St6 = "*", St7 = "*",}
	const enum GOdeslaniAdresniRadkyExtendedDtoTypes { EsuTxt = "string", ASt0 = "string", ASt1 = "string", ASt2 = "string", ASt3 = "string", ASt4 = "string", ASt5 = "string", ASt6 = "string", ASt7 = "string", StErrorMessage = "string", St0 = "string", St1 = "string", St2 = "string", St3 = "string", St4 = "string", St5 = "string", St6 = "string", St7 = "string",}
	const enum GOdeslaniAdresniRadkyExtendedDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAdresyZasilkyConfigDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Config dto pro adresy zasilky.*/
	interface GOdeslaniAdresyZasilkyConfigDto {
		/**Příznak, zda je možné uložit adresu k externímu subjektu.*/
		CanSaveAddressToEsu?: boolean|null;
		/**Příznak, zda se jedná o zásilkovou adresu.*/
		IsZastupnaOsoba?: boolean|null;
		/**Příznak, zda je možné editovat zásilkovou adresu.*/
		CanEditAddress?: boolean|null;
	}
	const enum GOdeslaniAdresyZasilkyConfigDtoNames { CanSaveAddressToEsu = "CanSaveAddressToEsu", IsZastupnaOsoba = "IsZastupnaOsoba", CanEditAddress = "CanEditAddress",}
	const enum GOdeslaniAdresyZasilkyConfigDtoFragments { CanSaveAddressToEsu = "*", IsZastupnaOsoba = "*", CanEditAddress = "*",}
	const enum GOdeslaniAdresyZasilkyConfigDtoTypes { CanSaveAddressToEsu = "boolean", IsZastupnaOsoba = "boolean", CanEditAddress = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAsistentInfoDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**GOdeslaniAsistentInfoDto.*/
	interface GOdeslaniAsistentInfoDto {
        /**AsistentSettings.*/
		AsistentSettings?: Gordic.Wfl.WebClient.GOdeslaniAsistentSettingsDto|null;
        /**IxsFun.*/
		IxsFun?: string|null;
        /**PrizSpis.*/
		PrizSpis?: number|null;
        /**IxsTyp.*/
		IxsTyp?: string|null;
	}
	const enum GOdeslaniAsistentInfoDtoNames { AsistentSettings = "AsistentSettings", IxsFun = "IxsFun", PrizSpis = "PrizSpis", IxsTyp = "IxsTyp",}
	const enum GOdeslaniAsistentInfoDtoFragments { AsistentSettings = "*", IxsFun = "*", PrizSpis = "*", IxsTyp = "*",}
	const enum GOdeslaniAsistentInfoDtoTypes { AsistentSettings = "Gordic.Wfl.WebClient.GOdeslaniAsistentSettingsDto", IxsFun = "string", PrizSpis = "number", IxsTyp = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniAsistentSettingsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**GOdeslaniAsistentSettingsDto.*/
	interface GOdeslaniAsistentSettingsDto {
        /**Filtrovat na funkční místo.*/
		FunkcniMisto?: boolean|null;
        /**Filtrovat na typ dokladu.*/
		TypDokladu?: boolean|null;
        /**Filtrovat na časové období. GOdeslaniAsistentCasoveObdobiEnum.*/
		CasoveObdobi?: Gordic.Wfl.WebClient.GOdeslaniAsistentCasoveObdobiEnum|null;
        /**Automatické předplnění 1. položkou ze seznamu.*/
		Predplneni?: boolean|null;
	}
	const enum GOdeslaniAsistentSettingsDtoNames { FunkcniMisto = "FunkcniMisto", TypDokladu = "TypDokladu", CasoveObdobi = "CasoveObdobi", Predplneni = "Predplneni",}
	const enum GOdeslaniAsistentSettingsDtoFragments { FunkcniMisto = "*", TypDokladu = "*", CasoveObdobi = "*", Predplneni = "*",}
	const enum GOdeslaniAsistentSettingsDtoTypes { FunkcniMisto = "boolean", TypDokladu = "boolean", CasoveObdobi = "Gordic.Wfl.WebClient.GOdeslaniAsistentCasoveObdobiEnum", Predplneni = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniBaseFormDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniBaseFormDto*/
	interface GOdeslaniBaseFormDto {
		Vec?: string|null;
		Znacka?: string|null;
		SpisovaZnacka?: string|null;
		ElektronickyObraz?: boolean|null;
		ElektronickyObrazSouborNazev?: string|null;
		ElektronickyObrazSouborPripona?: string|null;
		ElektronickyObrazSouborIxb?: string|null;
		ElektronickyObrazSouborIxsUlo?: string|null;
		ElektronickyObrazSouborIxsUloPre?: string|null;
		ElektronickyObrazSouborVelikost?: JsonDecimal|null;
		VnitrniPodpis?: boolean|null;
		VnejsiPodpis?: boolean|null;
		VnitrniCasoveRazitko?: boolean|null;
		VnejsiCasoveRazitko?: boolean|null;
		PripojitVerziPredKonverzi?: boolean|null;
		SouborPredKonverziNazev?: string|null;
		SouborPredKonverziPripona?: string|null;
		SouborPredKonverziVelikost?: JsonDecimal|null;
		SeznamPriloh?: boolean|null;
		JeSGNObr?: boolean|null;
		VelikostSGNObr?: JsonDecimal|null;
		JeTSTObr?: boolean|null;
		VelikostTSTObr?: JsonDecimal|null;
		Opakovat?: boolean|null;
		VelikostOznacenychSouboru?: number|null;
	}
	const enum GOdeslaniBaseFormDtoNames { Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", ElektronickyObrazSouborIxsUlo = "ElektronickyObrazSouborIxsUlo", ElektronickyObrazSouborIxsUloPre = "ElektronickyObrazSouborIxsUloPre", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", JeSGNObr = "JeSGNObr", VelikostSGNObr = "VelikostSGNObr", JeTSTObr = "JeTSTObr", VelikostTSTObr = "VelikostTSTObr", Opakovat = "Opakovat", VelikostOznacenychSouboru = "VelikostOznacenychSouboru",}
	const enum GOdeslaniBaseFormDtoFragments { Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborIxb = "*", ElektronickyObrazSouborIxsUlo = "*", ElektronickyObrazSouborIxsUloPre = "*", ElektronickyObrazSouborVelikost = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", JeSGNObr = "*", VelikostSGNObr = "*", JeTSTObr = "*", VelikostTSTObr = "*", Opakovat = "*", VelikostOznacenychSouboru = "*",}
	const enum GOdeslaniBaseFormDtoTypes { Vec = "string", Znacka = "string", SpisovaZnacka = "string", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "string", ElektronickyObrazSouborPripona = "string", ElektronickyObrazSouborIxb = "string", ElektronickyObrazSouborIxsUlo = "string", ElektronickyObrazSouborIxsUloPre = "string", ElektronickyObrazSouborVelikost = "JsonDecimal", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "string", SouborPredKonverziPripona = "string", SouborPredKonverziVelikost = "JsonDecimal", SeznamPriloh = "boolean", JeSGNObr = "boolean", VelikostSGNObr = "JsonDecimal", JeTSTObr = "boolean", VelikostTSTObr = "JsonDecimal", Opakovat = "boolean", VelikostOznacenychSouboru = "number",}
	const enum GOdeslaniBaseFormDtoTypeLengths {}
	/**GOdeslaniCoreFormEnabledDto*/
	interface GOdeslaniBaseFormEnabledDto {
		Vec?: boolean|null;
		Znacka?: boolean|null;
		SpisovaZnacka?: boolean|null;
		ElektronickyObraz?: boolean|null;
		ElektronickyObrazSouborNazev?: boolean|null;
		ElektronickyObrazSouborPripona?: boolean|null;
		ElektronickyObrazSouborVelikost?: boolean|null;
		ElektronickyObrazSouborIxb?: boolean|null;
		VnitrniPodpis?: boolean|null;
		VnejsiPodpis?: boolean|null;
		VnitrniCasoveRazitko?: boolean|null;
		VnejsiCasoveRazitko?: boolean|null;
		PripojitVerziPredKonverzi?: boolean|null;
		SouborPredKonverziNazev?: boolean|null;
		SouborPredKonverziPripona?: boolean|null;
		SouborPredKonverziVelikost?: boolean|null;
		SeznamPriloh?: boolean|null;
		VybraneElektronickePrilohy?: boolean|null;
		VelikostOznacenychSouboru?: boolean|null;
		Opakovat?: boolean|null;
	}
	const enum GOdeslaniBaseFormEnabledDtoNames { Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", VybraneElektronickePrilohy = "VybraneElektronickePrilohy", VelikostOznacenychSouboru = "VelikostOznacenychSouboru", Opakovat = "Opakovat",}
	const enum GOdeslaniBaseFormEnabledDtoFragments { Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborVelikost = "*", ElektronickyObrazSouborIxb = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", VybraneElektronickePrilohy = "*", VelikostOznacenychSouboru = "*", Opakovat = "*",}
	const enum GOdeslaniBaseFormEnabledDtoTypes { Vec = "boolean", Znacka = "boolean", SpisovaZnacka = "boolean", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "boolean", ElektronickyObrazSouborPripona = "boolean", ElektronickyObrazSouborVelikost = "boolean", ElektronickyObrazSouborIxb = "boolean", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "boolean", SouborPredKonverziPripona = "boolean", SouborPredKonverziVelikost = "boolean", SeznamPriloh = "boolean", VybraneElektronickePrilohy = "boolean", VelikostOznacenychSouboru = "boolean", Opakovat = "boolean",}
	const enum GOdeslaniBaseFormEnabledDtoTypeLengths {}
	interface GOdeslaniLoadDataResultDto<TFormData, TFormPermissions> {
		/**Gets or sets the form.*/
		FormData?: TFormData|null;
		/**Gets or sets the form permissions.*/
		FormPermissions?: TFormPermissions|null;
		/**Gets or sets the prilohy.*/
		Prilohy?: Gordic.Wfl.WebClient.GOdeslaniPrilohaPisemnostiDto[]|null;
		/**Gets or sets the configuration.*/
		Config?: Gordic.Wfl.WebClient.GOdeslaniConfigDto|null;
		/**Gets or sets the ixs ulo pre.*/
		IxsUloPre?: string|null;
	}
	const enum GOdeslaniLoadDataResultDtoNames { FormData = "FormData", FormPermissions = "FormPermissions", Prilohy = "Prilohy", Config = "Config", IxsUloPre = "IxsUloPre",}
	const enum GOdeslaniLoadDataResultDtoFragments { FormData = "*", FormPermissions = "*", Prilohy = "*", Config = "*", IxsUloPre = "*",}
	const enum GOdeslaniLoadDataResultDtoTypes { FormData = "TFormData", FormPermissions = "TFormPermissions", Prilohy = "Gordic.Wfl.WebClient.GOdeslaniPrilohaPisemnostiDto[]", Config = "Gordic.Wfl.WebClient.GOdeslaniConfigDto", IxsUloPre = "string",}
	const enum GOdeslaniLoadDataResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniConfigDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniConfigDto*/
	interface GOdeslaniConfigDto {
		GinSslDatSchr?: number|null;
		GinGexPovolen?: number|null;
		/**Příznak, zda je povoleno odesílat zprávy přes eDesk.*/
		IsSendByEDeskAllowed?: boolean|null;
		GinIszrPovole?: number|null;
		GinIszrRozin?: number|null;
		GinOdesIsdsvy?: number|null;
		/**GIN ODES - Ověřovat ESU v ISDS při odeslání do DS v okně odeslání (DS, 360).*/
		GinOdesOvisds?: number|null;
		/**GIN ODES - Nabídnout k odeslání i poslední verzi před konverzí.*/
		GinOdesVerze?: boolean|null;
		/**Gets or sets the gin odes SGN cr.*/
		GinOdesSgnCr?: number|null;
		/**Gets or sets the spisova znacka title.*/
		SpisovaZnackaTitle?: string|null;
		/**Gets or sets the znacka title.*/
		ZnackaTitle?: string|null;
		/**Gets or sets the size of the gin isds.*/
		GinIsdsSize?: number|null;
		/**GIN ODES - Obecné nastavení obsluha poštovních služeb na zásilkách, poště (nutné nastavit pro DS - ISDS).*/
		GinOdesPosslu?: number|null;
		/**GIN GMS - Definice typu odesílání elektronické pošty*/
		GinGmsTypesnd?: string|null;
		/**Příznak, zda se má u datové zprávy do položky k rukám uložit hodnota z poznámky zásilky.*/
		PrenestPoznamkuDoKRukam?: boolean|null;
		/**GIN GMS - Maximální přípustná velikost zprávy.*/
		GinGmsMsgmaxs?: number|null;
		/**SSL - Používat pole uloženo listů, neevidovaných příloh a odesláno listů a nelistinných příloh.*/
		SslPouulolisd?: number|null;
		/**GIN ODES - ŘP - Povolení funkce připravit/uložit s předpisem v okně odeslání.*/
		gin_odes_upredp?: number|null;
		/**GIN ODES - zobrazení/načítání sloupečku datum vypravení z podřízené zásilky.*/
		gin_odeshkp_dat?: number|null;
	}
	const enum GOdeslaniConfigDtoNames { GinSslDatSchr = "GinSslDatSchr", GinGexPovolen = "GinGexPovolen", IsSendByEDeskAllowed = "IsSendByEDeskAllowed", GinIszrPovole = "GinIszrPovole", GinIszrRozin = "GinIszrRozin", GinOdesIsdsvy = "GinOdesIsdsvy", GinOdesOvisds = "GinOdesOvisds", GinOdesVerze = "GinOdesVerze", GinOdesSgnCr = "GinOdesSgnCr", SpisovaZnackaTitle = "SpisovaZnackaTitle", ZnackaTitle = "ZnackaTitle", GinIsdsSize = "GinIsdsSize", GinOdesPosslu = "GinOdesPosslu", GinGmsTypesnd = "GinGmsTypesnd", PrenestPoznamkuDoKRukam = "PrenestPoznamkuDoKRukam", GinGmsMsgmaxs = "GinGmsMsgmaxs", SslPouulolisd = "SslPouulolisd", gin_odes_upredp = "gin_odes_upredp", gin_odeshkp_dat = "gin_odeshkp_dat",}
	const enum GOdeslaniConfigDtoFragments { GinSslDatSchr = "*", GinGexPovolen = "*", IsSendByEDeskAllowed = "*", GinIszrPovole = "*", GinIszrRozin = "*", GinOdesIsdsvy = "*", GinOdesOvisds = "*", GinOdesVerze = "*", GinOdesSgnCr = "*", SpisovaZnackaTitle = "*", ZnackaTitle = "*", GinIsdsSize = "*", GinOdesPosslu = "*", GinGmsTypesnd = "*", PrenestPoznamkuDoKRukam = "*", GinGmsMsgmaxs = "*", SslPouulolisd = "*", gin_odes_upredp = "*", gin_odeshkp_dat = "*",}
	const enum GOdeslaniConfigDtoTypes { GinSslDatSchr = "number", GinGexPovolen = "number", IsSendByEDeskAllowed = "boolean", GinIszrPovole = "number", GinIszrRozin = "number", GinOdesIsdsvy = "number", GinOdesOvisds = "number", GinOdesVerze = "boolean", GinOdesSgnCr = "number", SpisovaZnackaTitle = "string", ZnackaTitle = "string", GinIsdsSize = "number", GinOdesPosslu = "number", GinGmsTypesnd = "string", PrenestPoznamkuDoKRukam = "boolean", GinGmsMsgmaxs = "number", SslPouulolisd = "number", gin_odes_upredp = "number", gin_odeshkp_dat = "number",}
	const enum GOdeslaniConfigDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniDokumentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**GOdeslaniDokumentDto*/
	interface GOdeslaniDokumentDto {
        /**Gets or sets the ixp.*/
		ixp?: string|null;
        /**Gets or sets the akt znacka.*/
		akt_znacka?: string|null;
        /**Gets or sets the znacka odes.*/
		znacka_odes?: string|null;
        /**Gets or sets the nazev.*/
		nazev?: string|null;
        /**Gets or sets the esu text.*/
		esu_txt?: string|null;
        /**Gets or sets the nazev su.*/
		nazev_su?: string|null;
        /**Gets or sets the dat zmena.*/
		dat_zmena?: JsonDate|null;
        /**Gets or sets the dat pod.*/
		dat_pod?: JsonDate|null;
        /**Gets or sets the stav zpracovani icon.*/
		stav_zpracovani_ico?: number|null;
        /**Gets or sets the technicke vlastnosti icon.*/
		technicke_vlastnosti_ico?: number|null;
        /**Gets or sets the typ entity icon.*/
		typ_entity_ico?: number|null;
        /**Gets or sets the vlastnictvi doruceni icon.*/
		vlastnictvi_doruceni_ico?: number|null;
        /**Gets the ma pisemnost obraz nebo prilohy.*/
		readonly maPisemnostObrazNeboPrilohy?: boolean|null;
	}
	const enum GOdeslaniDokumentDtoNames { ixp = "ixp", akt_znacka = "akt_znacka", znacka_odes = "znacka_odes", nazev = "nazev", esu_txt = "esu_txt", nazev_su = "nazev_su", dat_zmena = "dat_zmena", dat_pod = "dat_pod", stav_zpracovani_ico = "stav_zpracovani_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", typ_entity_ico = "typ_entity_ico", vlastnictvi_doruceni_ico = "vlastnictvi_doruceni_ico", maPisemnostObrazNeboPrilohy = "maPisemnostObrazNeboPrilohy",}
	const enum GOdeslaniDokumentDtoFragments { ixp = "*", akt_znacka = "*", znacka_odes = "*", nazev = "*", esu_txt = "*", nazev_su = "*", dat_zmena = "*", dat_pod = "*", stav_zpracovani_ico = "*", technicke_vlastnosti_ico = "*", typ_entity_ico = "*", vlastnictvi_doruceni_ico = "*", maPisemnostObrazNeboPrilohy = "*",}
	const enum GOdeslaniDokumentDtoTypes { ixp = "string", akt_znacka = "string", znacka_odes = "string", nazev = "string", esu_txt = "string", nazev_su = "string", dat_zmena = "JsonDate", dat_pod = "JsonDate", stav_zpracovani_ico = "number", technicke_vlastnosti_ico = "number", typ_entity_ico = "number", vlastnictvi_doruceni_ico = "number", maPisemnostObrazNeboPrilohy = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniDsFormDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniDsFormDto*/
	interface GOdeslaniDsFormDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormDto {
		Adresat?: string|null;
		Odesilatel?: string|null;
		Original?: boolean|null;
		PuvodniDZ?: boolean|null;
		OVM?: boolean|null;
		KRukam?: string|null;
		IdentifikaceUtvaru?: string|null;
		NazevUtvaru?: string|null;
		ZakonRok?: number|null;
		ZakonCislo?: number|null;
		Paragraf?: string|null;
		Odstavec?: string|null;
		Pismeno?: string|null;
		NazevVec?: string|null;
		NaseCJ?: string|null;
		NaseSpisovaZnacka?: string|null;
		VaseCJ?: string|null;
		VaseSpisovaZnacka?: string|null;
		DoVlastnichRukou?: boolean|null;
		ZakazatFikciDoruceni?: boolean|null;
		/**Ixb souboru pro postoupení původní datové zprávy.*/
		IxbZFOPostoup?: string|null;
		ZFOPostoupNazev?: string|null;
		ZFOPostoupVelikost?: JsonDecimal|null;
		/**GOdeslaniDsFormEnabledDto*/
		Enabled?: Gordic.Wfl.WebClient.GOdeslaniDsFormEnabledDto|null;
		/**Validátory*/
		readonly Validators?: object|null;
	}
	const enum GOdeslaniDsFormDtoNames { Adresat = "Adresat", Odesilatel = "Odesilatel", Original = "Original", PuvodniDZ = "PuvodniDZ", OVM = "OVM", KRukam = "KRukam", IdentifikaceUtvaru = "IdentifikaceUtvaru", NazevUtvaru = "NazevUtvaru", ZakonRok = "ZakonRok", ZakonCislo = "ZakonCislo", Paragraf = "Paragraf", Odstavec = "Odstavec", Pismeno = "Pismeno", NazevVec = "NazevVec", NaseCJ = "NaseCJ", NaseSpisovaZnacka = "NaseSpisovaZnacka", VaseCJ = "VaseCJ", VaseSpisovaZnacka = "VaseSpisovaZnacka", DoVlastnichRukou = "DoVlastnichRukou", ZakazatFikciDoruceni = "ZakazatFikciDoruceni", IxbZFOPostoup = "IxbZFOPostoup", ZFOPostoupNazev = "ZFOPostoupNazev", ZFOPostoupVelikost = "ZFOPostoupVelikost", Enabled = "Enabled", Validators = "Validators", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", ElektronickyObrazSouborIxsUlo = "ElektronickyObrazSouborIxsUlo", ElektronickyObrazSouborIxsUloPre = "ElektronickyObrazSouborIxsUloPre", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", JeSGNObr = "JeSGNObr", VelikostSGNObr = "VelikostSGNObr", JeTSTObr = "JeTSTObr", VelikostTSTObr = "VelikostTSTObr", Opakovat = "Opakovat", VelikostOznacenychSouboru = "VelikostOznacenychSouboru",}
	const enum GOdeslaniDsFormDtoFragments { Adresat = "*", Odesilatel = "*", Original = "*", PuvodniDZ = "*", OVM = "*", KRukam = "*", IdentifikaceUtvaru = "*", NazevUtvaru = "*", ZakonRok = "*", ZakonCislo = "*", Paragraf = "*", Odstavec = "*", Pismeno = "*", NazevVec = "*", NaseCJ = "*", NaseSpisovaZnacka = "*", VaseCJ = "*", VaseSpisovaZnacka = "*", DoVlastnichRukou = "*", ZakazatFikciDoruceni = "*", IxbZFOPostoup = "*", ZFOPostoupNazev = "*", ZFOPostoupVelikost = "*", Enabled = "*", Validators = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborIxb = "*", ElektronickyObrazSouborIxsUlo = "*", ElektronickyObrazSouborIxsUloPre = "*", ElektronickyObrazSouborVelikost = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", JeSGNObr = "*", VelikostSGNObr = "*", JeTSTObr = "*", VelikostTSTObr = "*", Opakovat = "*", VelikostOznacenychSouboru = "*",}
	const enum GOdeslaniDsFormDtoTypes { Adresat = "string", Odesilatel = "string", Original = "boolean", PuvodniDZ = "boolean", OVM = "boolean", KRukam = "string", IdentifikaceUtvaru = "string", NazevUtvaru = "string", ZakonRok = "number", ZakonCislo = "number", Paragraf = "string", Odstavec = "string", Pismeno = "string", NazevVec = "string", NaseCJ = "string", NaseSpisovaZnacka = "string", VaseCJ = "string", VaseSpisovaZnacka = "string", DoVlastnichRukou = "boolean", ZakazatFikciDoruceni = "boolean", IxbZFOPostoup = "string", ZFOPostoupNazev = "string", ZFOPostoupVelikost = "JsonDecimal", Enabled = "Gordic.Wfl.WebClient.GOdeslaniDsFormEnabledDto", Validators = "object", Vec = "string", Znacka = "string", SpisovaZnacka = "string", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "string", ElektronickyObrazSouborPripona = "string", ElektronickyObrazSouborIxb = "string", ElektronickyObrazSouborIxsUlo = "string", ElektronickyObrazSouborIxsUloPre = "string", ElektronickyObrazSouborVelikost = "JsonDecimal", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "string", SouborPredKonverziPripona = "string", SouborPredKonverziVelikost = "JsonDecimal", SeznamPriloh = "boolean", JeSGNObr = "boolean", VelikostSGNObr = "JsonDecimal", JeTSTObr = "boolean", VelikostTSTObr = "number", Opakovat = "boolean", VelikostOznacenychSouboru = "number",}
	const enum GOdeslaniDsFormDtoTypeLengths { KRukam = 30, IdentifikaceUtvaru = 100, NazevUtvaru = 100, Paragraf = 5, Odstavec = 10, NazevVec = 100, NaseCJ = 50, NaseSpisovaZnacka = 50, VaseCJ = 50, VaseSpisovaZnacka = 50,}
	/**GOdeslaniDsFormEnabledDto*/
	interface GOdeslaniDsFormEnabledDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormEnabledDto {
		Adresat?: boolean|null;
		Odesilatel?: boolean|null;
		Original?: boolean|null;
		PuvodniDZ?: boolean|null;
		OVM?: boolean|null;
		KRukam?: boolean|null;
		IdentifikaceUtvaru?: boolean|null;
		NazevUtvaru?: boolean|null;
		ZakonRok?: boolean|null;
		ZakonCislo?: boolean|null;
		Paragraf?: boolean|null;
		Odstavec?: boolean|null;
		Pismeno?: boolean|null;
		NazevVec?: boolean|null;
		NaseCJ?: boolean|null;
		NaseSpisovaZnacka?: boolean|null;
		VaseCJ?: boolean|null;
		VaseSpisovaZnacka?: boolean|null;
		DoVlastnichRukou?: boolean|null;
		ZakazatFikciDoruceni?: boolean|null;
		DalsiZprava?: boolean|null;
		OznacitDoLimitu?: boolean|null;
		ZFOPostoupNazev?: boolean|null;
		ZFOPostoupVelikost?: boolean|null;
	}
	const enum GOdeslaniDsFormEnabledDtoNames { Adresat = "Adresat", Odesilatel = "Odesilatel", Original = "Original", PuvodniDZ = "PuvodniDZ", OVM = "OVM", KRukam = "KRukam", IdentifikaceUtvaru = "IdentifikaceUtvaru", NazevUtvaru = "NazevUtvaru", ZakonRok = "ZakonRok", ZakonCislo = "ZakonCislo", Paragraf = "Paragraf", Odstavec = "Odstavec", Pismeno = "Pismeno", NazevVec = "NazevVec", NaseCJ = "NaseCJ", NaseSpisovaZnacka = "NaseSpisovaZnacka", VaseCJ = "VaseCJ", VaseSpisovaZnacka = "VaseSpisovaZnacka", DoVlastnichRukou = "DoVlastnichRukou", ZakazatFikciDoruceni = "ZakazatFikciDoruceni", DalsiZprava = "DalsiZprava", OznacitDoLimitu = "OznacitDoLimitu", ZFOPostoupNazev = "ZFOPostoupNazev", ZFOPostoupVelikost = "ZFOPostoupVelikost", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", VybraneElektronickePrilohy = "VybraneElektronickePrilohy", VelikostOznacenychSouboru = "VelikostOznacenychSouboru", Opakovat = "Opakovat",}
	const enum GOdeslaniDsFormEnabledDtoFragments { Adresat = "*", Odesilatel = "*", Original = "*", PuvodniDZ = "*", OVM = "*", KRukam = "*", IdentifikaceUtvaru = "*", NazevUtvaru = "*", ZakonRok = "*", ZakonCislo = "*", Paragraf = "*", Odstavec = "*", Pismeno = "*", NazevVec = "*", NaseCJ = "*", NaseSpisovaZnacka = "*", VaseCJ = "*", VaseSpisovaZnacka = "*", DoVlastnichRukou = "*", ZakazatFikciDoruceni = "*", DalsiZprava = "*", OznacitDoLimitu = "*", ZFOPostoupNazev = "*", ZFOPostoupVelikost = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborVelikost = "*", ElektronickyObrazSouborIxb = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", VybraneElektronickePrilohy = "*", VelikostOznacenychSouboru = "*", Opakovat = "*",}
	const enum GOdeslaniDsFormEnabledDtoTypes { Adresat = "boolean", Odesilatel = "boolean", Original = "boolean", PuvodniDZ = "boolean", OVM = "boolean", KRukam = "boolean", IdentifikaceUtvaru = "boolean", NazevUtvaru = "boolean", ZakonRok = "boolean", ZakonCislo = "boolean", Paragraf = "boolean", Odstavec = "boolean", Pismeno = "boolean", NazevVec = "boolean", NaseCJ = "boolean", NaseSpisovaZnacka = "boolean", VaseCJ = "boolean", VaseSpisovaZnacka = "boolean", DoVlastnichRukou = "boolean", ZakazatFikciDoruceni = "boolean", DalsiZprava = "boolean", OznacitDoLimitu = "boolean", ZFOPostoupNazev = "boolean", ZFOPostoupVelikost = "boolean", Vec = "boolean", Znacka = "boolean", SpisovaZnacka = "boolean", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "boolean", ElektronickyObrazSouborPripona = "boolean", ElektronickyObrazSouborVelikost = "boolean", ElektronickyObrazSouborIxb = "boolean", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "boolean", SouborPredKonverziPripona = "boolean", SouborPredKonverziVelikost = "boolean", SeznamPriloh = "boolean", VybraneElektronickePrilohy = "boolean", VelikostOznacenychSouboru = "boolean", Opakovat = "boolean",}
	const enum GOdeslaniDsFormEnabledDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniEDeskDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniEDeskDto*/
	interface GOdeslaniEDeskDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormDto {
		Adresat?: string|null;
		Odesilatel?: string|null;
		PostoupeniPuvodniZpravy?: boolean|null;
		NazevVec?: string|null;
		NaseCJ?: string|null;
		VaseCJ?: string|null;
		/**Id konverzace.*/
		CorrelationId?: string|null;
		/**Id konverzace.*/
		Ixp?: string|null;
		/**Informační id.*/
		BusinessId?: string|null;
		/**Id předchozí zprávy.*/
		ReferenceId?: string|null;
		/**Typ zprávy - souhlasí s typem formuláře.*/
		MessageType?: string|null;
		/**Obsažený formulář.*/
		IxsFsk?: string|null;
		/**Druh zprávy (určuje zda jde o podání / rozhodnutí / notifikaci / ...).*/
		IdCsk?: Gordic.ControlsLogic.Interface.GWflccskEnum|null;
		/**Testovací scénář.*/
		TestovaciScenar?: string|null;
		/**Zda se má použít adresa z GINisu*/
		PouzitAdresuGinis?: boolean|null;
		/**Duvod Postoupeni*/
		DuvodPostoupeni?: string|null;
		/**KodChyby*/
		KodChyby?: string|null;
		/**Ixb souboru pro postoupení původní datové zprávy.*/
		IxbZFOPostoup?: string|null;
		/**GOdeslaniEDeskPermissionsDto*/
		Permissions?: Gordic.Wfl.WebClient.GOdeslaniEDeskPermissionsDto|null;
		/**Validátory*/
		readonly Validators?: object|null;
		/**RezimProvozuUPVS_gin_upsr_poovm*/
		RezimProvozuUPVS_gin_upsr_poovm?: number|null;
	}
	const enum GOdeslaniEDeskDtoNames { Adresat = "Adresat", Odesilatel = "Odesilatel", PostoupeniPuvodniZpravy = "PostoupeniPuvodniZpravy", NazevVec = "NazevVec", NaseCJ = "NaseCJ", VaseCJ = "VaseCJ", CorrelationId = "CorrelationId", Ixp = "Ixp", BusinessId = "BusinessId", ReferenceId = "ReferenceId", MessageType = "MessageType", IxsFsk = "IxsFsk", IdCsk = "IdCsk", TestovaciScenar = "TestovaciScenar", PouzitAdresuGinis = "PouzitAdresuGinis", DuvodPostoupeni = "DuvodPostoupeni", KodChyby = "KodChyby", IxbZFOPostoup = "IxbZFOPostoup", Permissions = "Permissions", Validators = "Validators", RezimProvozuUPVS_gin_upsr_poovm = "RezimProvozuUPVS_gin_upsr_poovm", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", ElektronickyObrazSouborIxsUlo = "ElektronickyObrazSouborIxsUlo", ElektronickyObrazSouborIxsUloPre = "ElektronickyObrazSouborIxsUloPre", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", JeSGNObr = "JeSGNObr", VelikostSGNObr = "VelikostSGNObr", JeTSTObr = "JeTSTObr", VelikostTSTObr = "VelikostTSTObr", Opakovat = "Opakovat", VelikostOznacenychSouboru = "VelikostOznacenychSouboru",}
	const enum GOdeslaniEDeskDtoFragments { Adresat = "*", Odesilatel = "*", PostoupeniPuvodniZpravy = "*", NazevVec = "*", NaseCJ = "*", VaseCJ = "*", CorrelationId = "*", Ixp = "*", BusinessId = "*", ReferenceId = "*", MessageType = "*", IxsFsk = "*", IdCsk = "*", TestovaciScenar = "*", PouzitAdresuGinis = "*", DuvodPostoupeni = "*", KodChyby = "*", IxbZFOPostoup = "*", Permissions = "*", Validators = "*", RezimProvozuUPVS_gin_upsr_poovm = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborIxb = "*", ElektronickyObrazSouborIxsUlo = "*", ElektronickyObrazSouborIxsUloPre = "*", ElektronickyObrazSouborVelikost = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", JeSGNObr = "*", VelikostSGNObr = "*", JeTSTObr = "*", VelikostTSTObr = "*", Opakovat = "*", VelikostOznacenychSouboru = "*",}
	const enum GOdeslaniEDeskDtoTypes { Adresat = "string", Odesilatel = "string", PostoupeniPuvodniZpravy = "boolean", NazevVec = "string", NaseCJ = "string", VaseCJ = "string", CorrelationId = "string", Ixp = "string", BusinessId = "string", ReferenceId = "string", MessageType = "string", IxsFsk = "string", IdCsk = "Gordic.ControlsLogic.Interface.GWflccskEnum", TestovaciScenar = "string", PouzitAdresuGinis = "boolean", DuvodPostoupeni = "string", KodChyby = "string", IxbZFOPostoup = "string", Permissions = "Gordic.Wfl.WebClient.GOdeslaniEDeskPermissionsDto", Validators = "object", RezimProvozuUPVS_gin_upsr_poovm = "number", Vec = "string", Znacka = "string", SpisovaZnacka = "string", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "string", ElektronickyObrazSouborPripona = "string", ElektronickyObrazSouborIxb = "string", ElektronickyObrazSouborIxsUlo = "string", ElektronickyObrazSouborIxsUloPre = "string", ElektronickyObrazSouborVelikost = "JsonDecimal", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "string", SouborPredKonverziPripona = "string", SouborPredKonverziVelikost = "JsonDecimal", SeznamPriloh = "boolean", JeSGNObr = "boolean", VelikostSGNObr = "JsonDecimal", JeTSTObr = "boolean", VelikostTSTObr = "JsonDecimal", Opakovat = "boolean", VelikostOznacenychSouboru = "number",}
	const enum GOdeslaniEDeskDtoTypeLengths { NazevVec = 100, NaseCJ = 50, VaseCJ = 50, CorrelationId = 100, BusinessId = 100, ReferenceId = 100, MessageType = 254,}
	/**GOdeslaniEDeskPermissionsDto*/
	interface GOdeslaniEDeskPermissionsDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormEnabledDto {
		Adresat?: boolean|null;
		Odesilatel: Gordic.General.ApplicationInterface.GPermission;
		PostoupeniPuvodniZpravy: Gordic.General.ApplicationInterface.GPermission;
		NazevVec: Gordic.General.ApplicationInterface.GPermission;
		NaseCJ: Gordic.General.ApplicationInterface.GPermission;
		VaseCJ: Gordic.General.ApplicationInterface.GPermission;
		CorrelationId: Gordic.General.ApplicationInterface.GPermission;
		BusinessId: Gordic.General.ApplicationInterface.GPermission;
		ReferenceId: Gordic.General.ApplicationInterface.GPermission;
		MessageType: Gordic.General.ApplicationInterface.GPermission;
		IxsFsk: Gordic.General.ApplicationInterface.GPermission;
		PouzitAdresuGinis: Gordic.General.ApplicationInterface.GPermission;
		TestovaciScenare: Gordic.General.ApplicationInterface.GPermission;
		KodChyby: Gordic.General.ApplicationInterface.GPermission;
		DalsiZprava: Gordic.General.ApplicationInterface.GPermission;
		OznacitDoLimitu: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GOdeslaniEDeskPermissionsDtoNames { Adresat = "Adresat", Odesilatel = "Odesilatel", PostoupeniPuvodniZpravy = "PostoupeniPuvodniZpravy", NazevVec = "NazevVec", NaseCJ = "NaseCJ", VaseCJ = "VaseCJ", CorrelationId = "CorrelationId", BusinessId = "BusinessId", ReferenceId = "ReferenceId", MessageType = "MessageType", IxsFsk = "IxsFsk", PouzitAdresuGinis = "PouzitAdresuGinis", TestovaciScenare = "TestovaciScenare", KodChyby = "KodChyby", DalsiZprava = "DalsiZprava", OznacitDoLimitu = "OznacitDoLimitu", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", VybraneElektronickePrilohy = "VybraneElektronickePrilohy", VelikostOznacenychSouboru = "VelikostOznacenychSouboru", Opakovat = "Opakovat",}
	const enum GOdeslaniEDeskPermissionsDtoFragments { Adresat = "*", Odesilatel = "*", PostoupeniPuvodniZpravy = "*", NazevVec = "*", NaseCJ = "*", VaseCJ = "*", CorrelationId = "*", BusinessId = "*", ReferenceId = "*", MessageType = "*", IxsFsk = "*", PouzitAdresuGinis = "*", TestovaciScenare = "*", KodChyby = "*", DalsiZprava = "*", OznacitDoLimitu = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborVelikost = "*", ElektronickyObrazSouborIxb = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", VybraneElektronickePrilohy = "*", VelikostOznacenychSouboru = "*", Opakovat = "*",}
	const enum GOdeslaniEDeskPermissionsDtoTypes { Adresat = "boolean", Odesilatel = "Gordic.General.ApplicationInterface.GPermission", PostoupeniPuvodniZpravy = "Gordic.General.ApplicationInterface.GPermission", NazevVec = "Gordic.General.ApplicationInterface.GPermission", NaseCJ = "Gordic.General.ApplicationInterface.GPermission", VaseCJ = "Gordic.General.ApplicationInterface.GPermission", CorrelationId = "Gordic.General.ApplicationInterface.GPermission", BusinessId = "Gordic.General.ApplicationInterface.GPermission", ReferenceId = "Gordic.General.ApplicationInterface.GPermission", MessageType = "Gordic.General.ApplicationInterface.GPermission", IxsFsk = "Gordic.General.ApplicationInterface.GPermission", PouzitAdresuGinis = "Gordic.General.ApplicationInterface.GPermission", TestovaciScenare = "Gordic.General.ApplicationInterface.GPermission", KodChyby = "Gordic.General.ApplicationInterface.GPermission", DalsiZprava = "Gordic.General.ApplicationInterface.GPermission", OznacitDoLimitu = "Gordic.General.ApplicationInterface.GPermission", Vec = "boolean", Znacka = "boolean", SpisovaZnacka = "boolean", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "boolean", ElektronickyObrazSouborPripona = "boolean", ElektronickyObrazSouborVelikost = "boolean", ElektronickyObrazSouborIxb = "boolean", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "boolean", SouborPredKonverziPripona = "boolean", SouborPredKonverziVelikost = "boolean", SeznamPriloh = "boolean", VybraneElektronickePrilohy = "boolean", VelikostOznacenychSouboru = "boolean", Opakovat = "boolean",}
	const enum GOdeslaniEDeskPermissionsDtoTypeLengths {}
	/**GOdeslaniEDeskDto*/
	interface GPovoleneFormulareOdeslaniEdeskDto {
		/**Gets or sets the nalezene.*/
		Nalezene?: Gordic.Wfl.WebClient.GNalezeneFormulareEdeskDto[]|null;
		/**Gets or sets the povolene formulare.*/
		PovoleneFormulare?: Gordic.Wfl.WebClient.GNalezeneFormulareDetailEdeskDto[]|null;
		/**Gets or sets the povolene formulare.*/
		PovoleneIxsPovolenych?: string[]|null;
		/**Gets or sets the prednastaveny formular.*/
		PrednastavenyFormular?: string|null;
		/**Gets or sets the prednastaveny formular.*/
		PocitadloVolaniObalkoveAdresy?: number|null;
	}
	const enum GPovoleneFormulareOdeslaniEdeskDtoNames { Nalezene = "Nalezene", PovoleneFormulare = "PovoleneFormulare", PovoleneIxsPovolenych = "PovoleneIxsPovolenych", PrednastavenyFormular = "PrednastavenyFormular", PocitadloVolaniObalkoveAdresy = "PocitadloVolaniObalkoveAdresy",}
	const enum GPovoleneFormulareOdeslaniEdeskDtoFragments { Nalezene = "*", PovoleneFormulare = "*", PovoleneIxsPovolenych = "*", PrednastavenyFormular = "*", PocitadloVolaniObalkoveAdresy = "*",}
	const enum GPovoleneFormulareOdeslaniEdeskDtoTypes { Nalezene = "Gordic.Wfl.WebClient.GNalezeneFormulareEdeskDto[]", PovoleneFormulare = "Gordic.Wfl.WebClient.GNalezeneFormulareDetailEdeskDto[]", PovoleneIxsPovolenych = "string[]", PrednastavenyFormular = "string", PocitadloVolaniObalkoveAdresy = "number",}
	const enum GPovoleneFormulareOdeslaniEdeskDtoTypeLengths {}
	/**GOdeslaniEDeskDto*/
	interface GNalezeneFormulareEdeskDto {
		/**Gets or sets the ixs forms.*/
		Formulare?: Gordic.Wfl.WebClient.GNalezeneFormulareDetailEdeskDto[]|null;
		/**Gets or sets the ixb.*/
		Ixb?: string|null;
	}
	const enum GNalezeneFormulareEdeskDtoNames { Formulare = "Formulare", Ixb = "Ixb",}
	const enum GNalezeneFormulareEdeskDtoFragments { Formulare = "*", Ixb = "*",}
	const enum GNalezeneFormulareEdeskDtoTypes { Formulare = "Gordic.Wfl.WebClient.GNalezeneFormulareDetailEdeskDto[]", Ixb = "string",}
	const enum GNalezeneFormulareEdeskDtoTypeLengths {}
	/**GOdeslaniEDeskDto*/
	interface GNalezeneFormulareDetailEdeskDto {
		/**Gets or sets the ixs forms.*/
		IxsFsk?: string|null;
		/**Gets or sets the ixb.*/
		Eform_id?: string|null;
		/**Gets or sets the ixb.*/
		Eformversion?: string|null;
	}
	const enum GNalezeneFormulareDetailEdeskDtoNames { IxsFsk = "IxsFsk", Eform_id = "Eform_id", Eformversion = "Eformversion",}
	const enum GNalezeneFormulareDetailEdeskDtoFragments { IxsFsk = "*", Eform_id = "*", Eformversion = "*",}
	const enum GNalezeneFormulareDetailEdeskDtoTypes { IxsFsk = "string", Eform_id = "string", Eformversion = "string",}
	const enum GNalezeneFormulareDetailEdeskDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniEmailFormDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniEmailFormDto*/
	interface GOdeslaniEmailFormDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormDto {
		Adresat?: string|null;
		Historie?: boolean|null;
		UzivatelskePoznamky?: boolean|null;
		Podepsat?: boolean|null;
		Kryptovat?: boolean|null;
		/**Validátory*/
		readonly Validators?: object|null;
		/**GOdeslaniEmailFormEnabledDto*/
		Enabled?: Gordic.Wfl.WebClient.GOdeslaniEmailFormEnabledDto|null;
	}
	const enum GOdeslaniEmailFormDtoNames { Adresat = "Adresat", Historie = "Historie", UzivatelskePoznamky = "UzivatelskePoznamky", Podepsat = "Podepsat", Kryptovat = "Kryptovat", Validators = "Validators", Enabled = "Enabled", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", JeSGNObr = "JeSGNObr", VelikostSGNObr = "VelikostSGNObr", JeTSTObr = "JeTSTObr", VelikostTSTObr = "VelikostTSTObr", Opakovat = "Opakovat", VelikostOznacenychSouboru = "VelikostOznacenychSouboru",}
	const enum GOdeslaniEmailFormDtoFragments { Adresat = "*", Historie = "*", UzivatelskePoznamky = "*", Podepsat = "*", Kryptovat = "*", Validators = "*", Enabled = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborIxb = "*", ElektronickyObrazSouborVelikost = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", JeSGNObr = "*", VelikostSGNObr = "*", JeTSTObr = "*", VelikostTSTObr = "*", Opakovat = "*", VelikostOznacenychSouboru = "*",}
	const enum GOdeslaniEmailFormDtoTypes { Adresat = "string", Historie = "boolean", UzivatelskePoznamky = "boolean", Podepsat = "boolean", Kryptovat = "boolean", Validators = "object", Enabled = "Gordic.Wfl.WebClient.GOdeslaniEmailFormEnabledDto", Vec = "string", Znacka = "string", SpisovaZnacka = "string", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "string", ElektronickyObrazSouborPripona = "string", ElektronickyObrazSouborIxb = "string", ElektronickyObrazSouborVelikost = "number", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "string", SouborPredKonverziPripona = "string", SouborPredKonverziVelikost = "number", SeznamPriloh = "boolean", JeSGNObr = "boolean", VelikostSGNObr = "number", JeTSTObr = "boolean", VelikostTSTObr = "number", Opakovat = "boolean", VelikostOznacenychSouboru = "number",}
	/**GOdeslaniEmailFormEnabledDto*/
	interface GOdeslaniEmailFormEnabledDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormEnabledDto {
		Adresat?: boolean|null;
		Historie?: boolean|null;
		UzivatelskePoznamky?: boolean|null;
		Podepsat?: boolean|null;
		Kryptovat?: boolean|null;
	}
	const enum GOdeslaniEmailFormEnabledDtoNames { Adresat = "Adresat", Historie = "Historie", UzivatelskePoznamky = "UzivatelskePoznamky", Podepsat = "Podepsat", Kryptovat = "Kryptovat", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", VybraneElektronickePrilohy = "VybraneElektronickePrilohy", VelikostOznacenychSouboru = "VelikostOznacenychSouboru", Opakovat = "Opakovat",}
	const enum GOdeslaniEmailFormEnabledDtoFragments { Adresat = "*", Historie = "*", UzivatelskePoznamky = "*", Podepsat = "*", Kryptovat = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborVelikost = "*", ElektronickyObrazSouborIxb = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", VybraneElektronickePrilohy = "*", VelikostOznacenychSouboru = "*", Opakovat = "*",}
	const enum GOdeslaniEmailFormEnabledDtoTypes { Adresat = "boolean", Historie = "boolean", UzivatelskePoznamky = "boolean", Podepsat = "boolean", Kryptovat = "boolean", Vec = "boolean", Znacka = "boolean", SpisovaZnacka = "boolean", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "boolean", ElektronickyObrazSouborPripona = "boolean", ElektronickyObrazSouborVelikost = "boolean", ElektronickyObrazSouborIxb = "boolean", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "boolean", SouborPredKonverziPripona = "boolean", SouborPredKonverziVelikost = "boolean", SeznamPriloh = "boolean", VybraneElektronickePrilohy = "boolean", VelikostOznacenychSouboru = "boolean", Opakovat = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniEnabledActionsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniEnabledActionsDto*/
	interface GOdeslaniEnabledActionsDto {
		Odstranit?: boolean|null;
		Odeslat?: boolean|null;
		PripravitUlozit?: boolean|null;
		ZasilokovaAdresa?: boolean|null;
		Original?: boolean|null;
		GenerujIdDorucenek?: boolean|null;
		DotceneSubjekty: Gordic.General.ApplicationInterface.GPermission;
		AddEsu?: boolean|null;
		Doruceni?: boolean|null;
		AdresyPobocky?: boolean|null;
		DetailZasilky?: boolean|null;
		/**The detail externiho subjektu*/
		DetailExternihoSubjektu: Gordic.General.ApplicationInterface.GPermission;
		/**The opravit externi subjekt*/
		OpravitExterniSubjekt: Gordic.General.ApplicationInterface.GPermission;
		/**The aktualizovat data adresata*/
		AktualizovatDataAdresata: Gordic.General.ApplicationInterface.GPermission;
		/**The historie*/
		Historie: Gordic.General.ApplicationInterface.GPermission;
		/**The konverze do PDF*/
		KonverzeDoPdf: Gordic.General.ApplicationInterface.GPermission;
		/**The overit isds*/
		OveritISDS: Gordic.General.ApplicationInterface.GPermission;
		/**The overit dorucovaci adresu*/
		OveritDorucovaciAdresu: Gordic.General.ApplicationInterface.GPermission;
		/**The overit e desk schranky*/
		OveritEDeskSchranky: Gordic.General.ApplicationInterface.GPermission;
		/**The tisk adresy*/
		TiskAdresy: Gordic.General.ApplicationInterface.GPermission;
		/**The tisk prehled*/
		TiskPrehled: Gordic.General.ApplicationInterface.GPermission;
		/**The tisk protokol*/
		TiskProtokol: Gordic.General.ApplicationInterface.GPermission;
		/**The tisk dorucenky dz*/
		TiskDorucenkyDZ: Gordic.General.ApplicationInterface.GPermission;
		/**The settings*/
		Settings: Gordic.General.ApplicationInterface.GPermission;
		/**The refresh*/
		Refresh: Gordic.General.ApplicationInterface.GPermission;
		/**The wizard*/
		Wizard: Gordic.General.ApplicationInterface.GPermission;
		/**The zkontrolovat zasilku pro epk*/
		ZkontrolovatZasilkuProEPK: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GOdeslaniEnabledActionsDtoNames { Odstranit = "Odstranit", Odeslat = "Odeslat", PripravitUlozit = "PripravitUlozit", ZasilokovaAdresa = "ZasilokovaAdresa", Original = "Original", GenerujIdDorucenek = "GenerujIdDorucenek", DotceneSubjekty = "DotceneSubjekty", AddEsu = "AddEsu", Doruceni = "Doruceni", AdresyPobocky = "AdresyPobocky", DetailZasilky = "DetailZasilky", DetailExternihoSubjektu = "DetailExternihoSubjektu", OpravitExterniSubjekt = "OpravitExterniSubjekt", AktualizovatDataAdresata = "AktualizovatDataAdresata", Historie = "Historie", KonverzeDoPdf = "KonverzeDoPdf", OveritISDS = "OveritISDS", OveritDorucovaciAdresu = "OveritDorucovaciAdresu", OveritEDeskSchranky = "OveritEDeskSchranky", TiskAdresy = "TiskAdresy", TiskPrehled = "TiskPrehled", TiskProtokol = "TiskProtokol", TiskDorucenkyDZ = "TiskDorucenkyDZ", Settings = "Settings", Refresh = "Refresh", Wizard = "Wizard", ZkontrolovatZasilkuProEPK = "ZkontrolovatZasilkuProEPK",}
	const enum GOdeslaniEnabledActionsDtoFragments { Odstranit = "*", Odeslat = "*", PripravitUlozit = "*", ZasilokovaAdresa = "*", Original = "*", GenerujIdDorucenek = "*", DotceneSubjekty = "*", AddEsu = "*", Doruceni = "*", AdresyPobocky = "*", DetailZasilky = "*", DetailExternihoSubjektu = "*", OpravitExterniSubjekt = "*", AktualizovatDataAdresata = "*", Historie = "*", KonverzeDoPdf = "*", OveritISDS = "*", OveritDorucovaciAdresu = "*", OveritEDeskSchranky = "*", TiskAdresy = "*", TiskPrehled = "*", TiskProtokol = "*", TiskDorucenkyDZ = "*", Settings = "*", Refresh = "*", Wizard = "*", ZkontrolovatZasilkuProEPK = "*",}
	const enum GOdeslaniEnabledActionsDtoTypes { Odstranit = "boolean", Odeslat = "boolean", PripravitUlozit = "boolean", ZasilokovaAdresa = "boolean", Original = "boolean", GenerujIdDorucenek = "boolean", DotceneSubjekty = "Gordic.General.ApplicationInterface.GPermission", AddEsu = "boolean", Doruceni = "boolean", AdresyPobocky = "boolean", DetailZasilky = "boolean", DetailExternihoSubjektu = "Gordic.General.ApplicationInterface.GPermission", OpravitExterniSubjekt = "Gordic.General.ApplicationInterface.GPermission", AktualizovatDataAdresata = "Gordic.General.ApplicationInterface.GPermission", Historie = "Gordic.General.ApplicationInterface.GPermission", KonverzeDoPdf = "Gordic.General.ApplicationInterface.GPermission", OveritISDS = "Gordic.General.ApplicationInterface.GPermission", OveritDorucovaciAdresu = "Gordic.General.ApplicationInterface.GPermission", OveritEDeskSchranky = "Gordic.General.ApplicationInterface.GPermission", TiskAdresy = "Gordic.General.ApplicationInterface.GPermission", TiskPrehled = "Gordic.General.ApplicationInterface.GPermission", TiskProtokol = "Gordic.General.ApplicationInterface.GPermission", TiskDorucenkyDZ = "Gordic.General.ApplicationInterface.GPermission", Settings = "Gordic.General.ApplicationInterface.GPermission", Refresh = "Gordic.General.ApplicationInterface.GPermission", Wizard = "Gordic.General.ApplicationInterface.GPermission", ZkontrolovatZasilkuProEPK = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GOdeslaniEnabledActionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHistorieDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**SeznamHistorieOdeslaniDataSet.SeznamHistorieOdeslaniRow*/
	interface GOdeslaniHistorieDto {
        /**Autogenerated.*/
		zmena_txt?: string|null;
        /**Autogenerated.*/
		dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
		nazev_rf?: string|null;
        /**Autogenerated.*/
		nazev_su?: string|null;
	}
	const enum GOdeslaniHistorieDtoNames { zmena_txt = "zmena_txt", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", nazev_su = "nazev_su",}
	const enum GOdeslaniHistorieDtoFragments { zmena_txt = "*", dat_zmena = "*", nazev_rf = "*", nazev_su = "*",}
	const enum GOdeslaniHistorieDtoTypes { zmena_txt = "string", dat_zmena = "JsonDate", nazev_rf = "string", nazev_su = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHkpFormDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniHkpFormDto*/
	interface GOdeslaniHkpFormDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormDto {
		TypArchivace?: Gordic.Ginis.DbModel.GWflctarEnum|null;
		TypTisku?: Gordic.Ginis.DbModel.GWflcttiEnum|null;
		/**Typ konverze obrazu.*/
		TypKonverze?: Gordic.Ginis.DbModel.GWflctkoEnum|null;
	}
	const enum GOdeslaniHkpFormDtoNames { TypArchivace = "TypArchivace", TypTisku = "TypTisku", TypKonverze = "TypKonverze", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", ElektronickyObrazSouborIxsUlo = "ElektronickyObrazSouborIxsUlo", ElektronickyObrazSouborIxsUloPre = "ElektronickyObrazSouborIxsUloPre", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", JeSGNObr = "JeSGNObr", VelikostSGNObr = "VelikostSGNObr", JeTSTObr = "JeTSTObr", VelikostTSTObr = "VelikostTSTObr", Opakovat = "Opakovat", VelikostOznacenychSouboru = "VelikostOznacenychSouboru",}
	const enum GOdeslaniHkpFormDtoFragments { TypArchivace = "*", TypTisku = "*", TypKonverze = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborIxb = "*", ElektronickyObrazSouborIxsUlo = "*", ElektronickyObrazSouborIxsUloPre = "*", ElektronickyObrazSouborVelikost = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", JeSGNObr = "*", VelikostSGNObr = "*", JeTSTObr = "*", VelikostTSTObr = "*", Opakovat = "*", VelikostOznacenychSouboru = "*",}
	const enum GOdeslaniHkpFormDtoTypes { TypArchivace = "Gordic.Ginis.DbModel.GWflctarEnum", TypTisku = "Gordic.Ginis.DbModel.GWflcttiEnum", TypKonverze = "Gordic.Ginis.DbModel.GWflctkoEnum", Vec = "string", Znacka = "string", SpisovaZnacka = "string", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "string", ElektronickyObrazSouborPripona = "string", ElektronickyObrazSouborIxb = "string", ElektronickyObrazSouborIxsUlo = "string", ElektronickyObrazSouborIxsUloPre = "string", ElektronickyObrazSouborVelikost = "JsonDecimal", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "string", SouborPredKonverziPripona = "string", SouborPredKonverziVelikost = "JsonDecimal", SeznamPriloh = "boolean", JeSGNObr = "boolean", VelikostSGNObr = "JsonDecimal", JeTSTObr = "boolean", VelikostTSTObr = "number", Opakovat = "boolean", VelikostOznacenychSouboru = "number",}
	const enum GOdeslaniHkpFormDtoTypeLengths {}
	/**GOdeslaniHkpFormPermissionsDto*/
	interface GOdeslaniHkpFormPermissionsDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormEnabledDto {
		TypArchivace: Gordic.General.ApplicationInterface.GPermission;
		TypTisku: Gordic.General.ApplicationInterface.GPermission;
		TypKonverze: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GOdeslaniHkpFormPermissionsDtoNames { TypArchivace = "TypArchivace", TypTisku = "TypTisku", TypKonverze = "TypKonverze", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", VybraneElektronickePrilohy = "VybraneElektronickePrilohy", VelikostOznacenychSouboru = "VelikostOznacenychSouboru", Opakovat = "Opakovat",}
	const enum GOdeslaniHkpFormPermissionsDtoFragments { TypArchivace = "*", TypTisku = "*", TypKonverze = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborVelikost = "*", ElektronickyObrazSouborIxb = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", VybraneElektronickePrilohy = "*", VelikostOznacenychSouboru = "*", Opakovat = "*",}
	const enum GOdeslaniHkpFormPermissionsDtoTypes { TypArchivace = "Gordic.General.ApplicationInterface.GPermission", TypTisku = "Gordic.General.ApplicationInterface.GPermission", TypKonverze = "Gordic.General.ApplicationInterface.GPermission", Vec = "boolean", Znacka = "boolean", SpisovaZnacka = "boolean", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "boolean", ElektronickyObrazSouborPripona = "boolean", ElektronickyObrazSouborVelikost = "boolean", ElektronickyObrazSouborIxb = "boolean", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "boolean", SouborPredKonverziPripona = "boolean", SouborPredKonverziVelikost = "boolean", SeznamPriloh = "boolean", VybraneElektronickePrilohy = "boolean", VelikostOznacenychSouboru = "boolean", Opakovat = "boolean",}
	const enum GOdeslaniHkpFormPermissionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHpFormDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniHpFormDto*/
	interface GOdeslaniHpFormDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormDto {
		TypTisku?: Gordic.Ginis.DbModel.GWflcttiEnum|null;
		/**Gets or sets the typ vyhodnoceni doruceni.*/
		TypVyhodnoceniDoruceni?: Gordic.Ginis.DbModel.GWflctdoEnum|null;
	}
	const enum GOdeslaniHpFormDtoNames { TypTisku = "TypTisku", TypVyhodnoceniDoruceni = "TypVyhodnoceniDoruceni", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", JeSGNObr = "JeSGNObr", VelikostSGNObr = "VelikostSGNObr", JeTSTObr = "JeTSTObr", VelikostTSTObr = "VelikostTSTObr", Opakovat = "Opakovat", VelikostOznacenychSouboru = "VelikostOznacenychSouboru",}
	const enum GOdeslaniHpFormDtoFragments { TypTisku = "*", TypVyhodnoceniDoruceni = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborIxb = "*", ElektronickyObrazSouborVelikost = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", JeSGNObr = "*", VelikostSGNObr = "*", JeTSTObr = "*", VelikostTSTObr = "*", Opakovat = "*", VelikostOznacenychSouboru = "*",}
	const enum GOdeslaniHpFormDtoTypes { TypTisku = "Gordic.Ginis.DbModel.GWflcttiEnum", TypVyhodnoceniDoruceni = "Gordic.Ginis.DbModel.GWflctdoEnum", Vec = "string", Znacka = "string", SpisovaZnacka = "string", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "string", ElektronickyObrazSouborPripona = "string", ElektronickyObrazSouborIxb = "string", ElektronickyObrazSouborVelikost = "number", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "string", SouborPredKonverziPripona = "string", SouborPredKonverziVelikost = "number", SeznamPriloh = "boolean", JeSGNObr = "boolean", VelikostSGNObr = "number", JeTSTObr = "boolean", VelikostTSTObr = "number", Opakovat = "boolean", VelikostOznacenychSouboru = "number",}
	/**GOdeslaniHpFormEnabledDto*/
	interface GOdeslaniHpFormPermissionsDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormEnabledDto {
		TypTisku: Gordic.General.ApplicationInterface.GPermission;
		TypVyhodnoceniDoruceni: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GOdeslaniHpFormPermissionsDtoNames { TypTisku = "TypTisku", TypVyhodnoceniDoruceni = "TypVyhodnoceniDoruceni", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", VybraneElektronickePrilohy = "VybraneElektronickePrilohy", VelikostOznacenychSouboru = "VelikostOznacenychSouboru", Opakovat = "Opakovat",}
	const enum GOdeslaniHpFormPermissionsDtoFragments { TypTisku = "*", TypVyhodnoceniDoruceni = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborVelikost = "*", ElektronickyObrazSouborIxb = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", VybraneElektronickePrilohy = "*", VelikostOznacenychSouboru = "*", Opakovat = "*",}
	const enum GOdeslaniHpFormPermissionsDtoTypes { TypTisku = "Gordic.General.ApplicationInterface.GPermission", TypVyhodnoceniDoruceni = "Gordic.General.ApplicationInterface.GPermission", Vec = "boolean", Znacka = "boolean", SpisovaZnacka = "boolean", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "boolean", ElektronickyObrazSouborPripona = "boolean", ElektronickyObrazSouborVelikost = "boolean", ElektronickyObrazSouborIxb = "boolean", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "boolean", SouborPredKonverziPripona = "boolean", SouborPredKonverziVelikost = "boolean", SeznamPriloh = "boolean", VybraneElektronickePrilohy = "boolean", VelikostOznacenychSouboru = "boolean", Opakovat = "boolean",}
	interface GOdeslaniHpLoadDataResultDto extends Gordic.Wfl.WebClient.GOdeslaniLoadDataResultDto<Gordic.Wfl.WebClient.GOdeslaniHpFormDto, Gordic.Wfl.WebClient.GOdeslaniHpFormPermissionsDto> {
	}
	const enum GOdeslaniHpLoadDataResultDtoNames { FormData = "FormData", FormPermissions = "FormPermissions", Prilohy = "Prilohy", Config = "Config", IxsUloPre = "IxsUloPre",}
	const enum GOdeslaniHpLoadDataResultDtoFragments { FormData = "*", FormPermissions = "*", Prilohy = "*", Config = "*", IxsUloPre = "*",}
	const enum GOdeslaniHpLoadDataResultDtoTypes { FormData = "Gordic.Wfl.WebClient.GOdeslaniHpFormDto", FormPermissions = "Gordic.Wfl.WebClient.GOdeslaniHpFormPermissionsDto", Prilohy = "Gordic.Wfl.WebClient.GOdeslaniPrilohaPisemnostiDto[]", Config = "Gordic.Wfl.WebClient.GOdeslaniConfigDto", IxsUloPre = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHromadneDotcenymSubjektumNastaveniDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniHromadneDotcenymSubjektumDto*/
	interface GOdeslaniHromadneDotcenymSubjektumNastaveniDto {
		IdDatoveSchranky?: string|null;
		OdeslatElObraz?: boolean|null;
		OdeslatPrilohy?: boolean|null;
		KomuOdeslat?: Gordic.Wfl.WebClient.GOdeslaniHromadneNastaveniKomuOdeslatEnum|null;
		DuvodVazby?: string|null;
		SdruzitZasilkyStejnychAdresatu?: boolean|null;
	}
	const enum GOdeslaniHromadneDotcenymSubjektumNastaveniDtoNames { IdDatoveSchranky = "IdDatoveSchranky", OdeslatElObraz = "OdeslatElObraz", OdeslatPrilohy = "OdeslatPrilohy", KomuOdeslat = "KomuOdeslat", DuvodVazby = "DuvodVazby", SdruzitZasilkyStejnychAdresatu = "SdruzitZasilkyStejnychAdresatu",}
	const enum GOdeslaniHromadneDotcenymSubjektumNastaveniDtoFragments { IdDatoveSchranky = "*", OdeslatElObraz = "*", OdeslatPrilohy = "*", KomuOdeslat = "*", DuvodVazby = "*", SdruzitZasilkyStejnychAdresatu = "*",}
	const enum GOdeslaniHromadneDotcenymSubjektumNastaveniDtoTypes { IdDatoveSchranky = "string", OdeslatElObraz = "boolean", OdeslatPrilohy = "boolean", KomuOdeslat = "Gordic.Wfl.WebClient.GOdeslaniHromadneNastaveniKomuOdeslatEnum", DuvodVazby = "string", SdruzitZasilkyStejnychAdresatu = "boolean",}
	const enum GOdeslaniHromadneDotcenymSubjektumNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniHromadneNastaveniDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniHromadneNastaveniDto*/
	interface GOdeslaniHromadneNastaveniDto {
		ZpusobOdeslani?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		TypObsahuZasilky?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		DruhZasilky?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		DoplnkoveSluzby?: number[]|null;
		IdentifikaceZasilky?: string|null;
		/**IxsEsu*/
		Adresat?: string|null;
		GenerovatIdentifikaciZasilkyAutomaticky?: boolean|null;
		OverovatJenAsistenciSchrankyVISDS?: boolean|null;
		OdeslatJakoOriginal?: boolean|null;
		AutomatickySdruzitZasilky?: boolean|null;
		ZasilkovaAdresaRadek1?: string|null;
		ZasilkovaAdresaRadek2?: string|null;
		ZasilkovaAdresaRadek3?: string|null;
		ZasilkovaAdresaRadek4?: string|null;
		ZasilkovaAdresaRadek5?: string|null;
		ZasilkovaAdresaRadek6?: string|null;
		ZasilkovaAdresaRadek7?: string|null;
		ZasilkovaAdresaRadek8?: string|null;
		Poznamka?: string|null;
		LicZast?: string|null;
		PorZast?: number|null;
		/**Počet odeslaných listů.*/
		OdeslanoListu?: number|null;
	}
	const enum GOdeslaniHromadneNastaveniDtoNames { ZpusobOdeslani = "ZpusobOdeslani", TypObsahuZasilky = "TypObsahuZasilky", DruhZasilky = "DruhZasilky", DoplnkoveSluzby = "DoplnkoveSluzby", IdentifikaceZasilky = "IdentifikaceZasilky", Adresat = "Adresat", GenerovatIdentifikaciZasilkyAutomaticky = "GenerovatIdentifikaciZasilkyAutomaticky", OverovatJenAsistenciSchrankyVISDS = "OverovatJenAsistenciSchrankyVISDS", OdeslatJakoOriginal = "OdeslatJakoOriginal", AutomatickySdruzitZasilky = "AutomatickySdruzitZasilky", ZasilkovaAdresaRadek1 = "ZasilkovaAdresaRadek1", ZasilkovaAdresaRadek2 = "ZasilkovaAdresaRadek2", ZasilkovaAdresaRadek3 = "ZasilkovaAdresaRadek3", ZasilkovaAdresaRadek4 = "ZasilkovaAdresaRadek4", ZasilkovaAdresaRadek5 = "ZasilkovaAdresaRadek5", ZasilkovaAdresaRadek6 = "ZasilkovaAdresaRadek6", ZasilkovaAdresaRadek7 = "ZasilkovaAdresaRadek7", ZasilkovaAdresaRadek8 = "ZasilkovaAdresaRadek8", Poznamka = "Poznamka", LicZast = "LicZast", PorZast = "PorZast", OdeslanoListu = "OdeslanoListu",}
	const enum GOdeslaniHromadneNastaveniDtoFragments { ZpusobOdeslani = "*", TypObsahuZasilky = "*", DruhZasilky = "*", DoplnkoveSluzby = "*", IdentifikaceZasilky = "*", Adresat = "*", GenerovatIdentifikaciZasilkyAutomaticky = "*", OverovatJenAsistenciSchrankyVISDS = "*", OdeslatJakoOriginal = "*", AutomatickySdruzitZasilky = "*", ZasilkovaAdresaRadek1 = "*", ZasilkovaAdresaRadek2 = "*", ZasilkovaAdresaRadek3 = "*", ZasilkovaAdresaRadek4 = "*", ZasilkovaAdresaRadek5 = "*", ZasilkovaAdresaRadek6 = "*", ZasilkovaAdresaRadek7 = "*", ZasilkovaAdresaRadek8 = "*", Poznamka = "*", LicZast = "*", PorZast = "*", OdeslanoListu = "*",}
	const enum GOdeslaniHromadneNastaveniDtoTypes { ZpusobOdeslani = "Gordic.Ginis.DbModel.GWflczpdEnum", TypObsahuZasilky = "Gordic.Ginis.DbModel.GWflctobEnum", DruhZasilky = "Gordic.Ginis.DbModel.GWflcdrzEnum", DoplnkoveSluzby = "number[]", IdentifikaceZasilky = "string", Adresat = "string", GenerovatIdentifikaciZasilkyAutomaticky = "boolean", OverovatJenAsistenciSchrankyVISDS = "boolean", OdeslatJakoOriginal = "boolean", AutomatickySdruzitZasilky = "boolean", ZasilkovaAdresaRadek1 = "string", ZasilkovaAdresaRadek2 = "string", ZasilkovaAdresaRadek3 = "string", ZasilkovaAdresaRadek4 = "string", ZasilkovaAdresaRadek5 = "string", ZasilkovaAdresaRadek6 = "string", ZasilkovaAdresaRadek7 = "string", ZasilkovaAdresaRadek8 = "string", Poznamka = "string", LicZast = "string", PorZast = "number", OdeslanoListu = "number",}
	const enum GOdeslaniHromadneNastaveniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniInterniDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniInterniFormDto*/
	interface GOdeslaniInterniFormDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormDto {
		/**Gets or sets the forma elektronicka.*/
		FormaZasilkyElektronicka?: boolean|null;
		/**Gets or sets the forma fyzicka.*/
		FormaZasilkyFyzicka?: boolean|null;
		/**Validátory*/
		readonly Validators?: object|null;
	}
	const enum GOdeslaniInterniFormDtoNames { FormaZasilkyElektronicka = "FormaZasilkyElektronicka", FormaZasilkyFyzicka = "FormaZasilkyFyzicka", Validators = "Validators", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", ElektronickyObrazSouborIxsUlo = "ElektronickyObrazSouborIxsUlo", ElektronickyObrazSouborIxsUloPre = "ElektronickyObrazSouborIxsUloPre", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", JeSGNObr = "JeSGNObr", VelikostSGNObr = "VelikostSGNObr", JeTSTObr = "JeTSTObr", VelikostTSTObr = "VelikostTSTObr", Opakovat = "Opakovat", VelikostOznacenychSouboru = "VelikostOznacenychSouboru",}
	const enum GOdeslaniInterniFormDtoFragments { FormaZasilkyElektronicka = "*", FormaZasilkyFyzicka = "*", Validators = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborIxb = "*", ElektronickyObrazSouborIxsUlo = "*", ElektronickyObrazSouborIxsUloPre = "*", ElektronickyObrazSouborVelikost = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", JeSGNObr = "*", VelikostSGNObr = "*", JeTSTObr = "*", VelikostTSTObr = "*", Opakovat = "*", VelikostOznacenychSouboru = "*",}
	const enum GOdeslaniInterniFormDtoTypes { FormaZasilkyElektronicka = "boolean", FormaZasilkyFyzicka = "boolean", Validators = "object", Vec = "string", Znacka = "string", SpisovaZnacka = "string", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "string", ElektronickyObrazSouborPripona = "string", ElektronickyObrazSouborIxb = "string", ElektronickyObrazSouborIxsUlo = "string", ElektronickyObrazSouborIxsUloPre = "string", ElektronickyObrazSouborVelikost = "number", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "string", SouborPredKonverziPripona = "string", SouborPredKonverziVelikost = "number", SeznamPriloh = "boolean", JeSGNObr = "boolean", VelikostSGNObr = "number", JeTSTObr = "boolean", VelikostTSTObr = "number", Opakovat = "boolean", VelikostOznacenychSouboru = "number",}
	const enum GOdeslaniInterniFormDtoTypeLengths {}
	/**GOdeslaniInterniFormEnabledDto*/
	interface GOdeslaniInterniFormEnabledDto extends Gordic.Wfl.WebClient.GOdeslaniBaseFormEnabledDto {
		/**Gets or sets the forma elektronicka.*/
		FormaZasilkyElektronicka: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the forma fyzicka.*/
		FormaZasilkyFyzicka: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GOdeslaniInterniFormEnabledDtoNames { FormaZasilkyElektronicka = "FormaZasilkyElektronicka", FormaZasilkyFyzicka = "FormaZasilkyFyzicka", Vec = "Vec", Znacka = "Znacka", SpisovaZnacka = "SpisovaZnacka", ElektronickyObraz = "ElektronickyObraz", ElektronickyObrazSouborNazev = "ElektronickyObrazSouborNazev", ElektronickyObrazSouborPripona = "ElektronickyObrazSouborPripona", ElektronickyObrazSouborVelikost = "ElektronickyObrazSouborVelikost", ElektronickyObrazSouborIxb = "ElektronickyObrazSouborIxb", VnitrniPodpis = "VnitrniPodpis", VnejsiPodpis = "VnejsiPodpis", VnitrniCasoveRazitko = "VnitrniCasoveRazitko", VnejsiCasoveRazitko = "VnejsiCasoveRazitko", PripojitVerziPredKonverzi = "PripojitVerziPredKonverzi", SouborPredKonverziNazev = "SouborPredKonverziNazev", SouborPredKonverziPripona = "SouborPredKonverziPripona", SouborPredKonverziVelikost = "SouborPredKonverziVelikost", SeznamPriloh = "SeznamPriloh", VybraneElektronickePrilohy = "VybraneElektronickePrilohy", VelikostOznacenychSouboru = "VelikostOznacenychSouboru", Opakovat = "Opakovat",}
	const enum GOdeslaniInterniFormEnabledDtoFragments { FormaZasilkyElektronicka = "*", FormaZasilkyFyzicka = "*", Vec = "*", Znacka = "*", SpisovaZnacka = "*", ElektronickyObraz = "*", ElektronickyObrazSouborNazev = "*", ElektronickyObrazSouborPripona = "*", ElektronickyObrazSouborVelikost = "*", ElektronickyObrazSouborIxb = "*", VnitrniPodpis = "*", VnejsiPodpis = "*", VnitrniCasoveRazitko = "*", VnejsiCasoveRazitko = "*", PripojitVerziPredKonverzi = "*", SouborPredKonverziNazev = "*", SouborPredKonverziPripona = "*", SouborPredKonverziVelikost = "*", SeznamPriloh = "*", VybraneElektronickePrilohy = "*", VelikostOznacenychSouboru = "*", Opakovat = "*",}
	const enum GOdeslaniInterniFormEnabledDtoTypes { FormaZasilkyElektronicka = "Gordic.General.ApplicationInterface.GPermission", FormaZasilkyFyzicka = "Gordic.General.ApplicationInterface.GPermission", Vec = "boolean", Znacka = "boolean", SpisovaZnacka = "boolean", ElektronickyObraz = "boolean", ElektronickyObrazSouborNazev = "boolean", ElektronickyObrazSouborPripona = "boolean", ElektronickyObrazSouborVelikost = "boolean", ElektronickyObrazSouborIxb = "boolean", VnitrniPodpis = "boolean", VnejsiPodpis = "boolean", VnitrniCasoveRazitko = "boolean", VnejsiCasoveRazitko = "boolean", PripojitVerziPredKonverzi = "boolean", SouborPredKonverziNazev = "boolean", SouborPredKonverziPripona = "boolean", SouborPredKonverziVelikost = "boolean", SeznamPriloh = "boolean", VybraneElektronickePrilohy = "boolean", VelikostOznacenychSouboru = "boolean", Opakovat = "boolean",}
	const enum GOdeslaniInterniFormEnabledDtoTypeLengths {}
	interface GOdeslaniInterniLoadDataResultDto extends Gordic.Wfl.WebClient.GOdeslaniLoadDataResultDto<Gordic.Wfl.WebClient.GOdeslaniInterniFormDto, Gordic.Wfl.WebClient.GOdeslaniInterniFormEnabledDto> {
	}
	const enum GOdeslaniInterniLoadDataResultDtoNames { FormData = "FormData", FormPermissions = "FormPermissions", Prilohy = "Prilohy", Config = "Config", IxsUloPre = "IxsUloPre",}
	const enum GOdeslaniInterniLoadDataResultDtoFragments { FormData = "*", FormPermissions = "*", Prilohy = "*", Config = "*", IxsUloPre = "*",}
	const enum GOdeslaniInterniLoadDataResultDtoTypes { FormData = "Gordic.Wfl.WebClient.GOdeslaniInterniFormDto", FormPermissions = "Gordic.Wfl.WebClient.GOdeslaniInterniFormEnabledDto", Prilohy = "Gordic.Wfl.WebClient.GOdeslaniPrilohaPisemnostiDto[]", Config = "Gordic.Wfl.WebClient.GOdeslaniConfigDto", IxsUloPre = "string",}
	const enum GOdeslaniInterniLoadDataResultDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniKartotekaOdpovedDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GOdeslaniKartotekaOdpovedDto {
        /**Autogenerated.*/
		ixs_esu?: string|null;
        /**Autogenerated.*/
		lic?: string|null;
        /**Autogenerated.*/
		por_zast?: number|null;
	}
	const enum GOdeslaniKartotekaOdpovedDtoNames { ixs_esu = "ixs_esu", lic = "lic", por_zast = "por_zast",}
	const enum GOdeslaniKartotekaOdpovedDtoFragments { ixs_esu = "*", lic = "*", por_zast = "*",}
	const enum GOdeslaniKartotekaOdpovedDtoTypes { ixs_esu = "string", lic = "string", por_zast = "number",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniParametryOdeslaniDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniParametryOdeslaniDto*/
	interface GOdeslaniParametryOdeslaniDto {
		Action?: string|null;
		NextStep?: string|null;
		ClientAlertNoMail?: string|null;
		ClientMessageActivityEsu?: string|null;
		ClientMessageNoActivEsu?: string|null;
		Count?: number|null;
		/**Gets or sets the email list.*/
		EmailList?: Gordic.Wfl.WebClient.GWflMailStructDto[]|null;
		/**Gets or sets the ds list.*/
		DsList?: Gordic.Wfl.WebClient.GWflMailStructDto[]|null;
		/**Gets or sets the gex list.*/
		GexList?: Gordic.Wfl.WebClient.GWflMailStructDto[]|null;
		/**Gets or sets the hp list.*/
		HpList?: Gordic.Wfl.WebClient.GWflMailStructDto[]|null;
		/**Gets or sets the e desk list.*/
		EDeskList?: Gordic.Wfl.WebClient.GWflMailStructDto[]|null;
		/**Gets or sets the interni list.*/
		InterniList?: Gordic.Wfl.WebClient.GWflMailStructDto[]|null;
		/**Gets or sets the HKP list.*/
		HkpList?: Gordic.Wfl.WebClient.GWflMailStructDto[]|null;
		NormalRowsList?: Gordic.Wfl.WebClient.GOdeslaniSeznamDto[]|null;
		ZpOdesDSToOdes?: boolean|null;
		ZpOdesDSEVypToOdes?: boolean|null;
		SeznamZasilek?: Gordic.Wfl.WebClient.GOdeslaniSeznamDto[]|null;
	}
	const enum GOdeslaniParametryOdeslaniDtoNames { Action = "Action", NextStep = "NextStep", ClientAlertNoMail = "ClientAlertNoMail", ClientMessageActivityEsu = "ClientMessageActivityEsu", ClientMessageNoActivEsu = "ClientMessageNoActivEsu", Count = "Count", EmailList = "EmailList", DsList = "DsList", GexList = "GexList", HpList = "HpList", EDeskList = "EDeskList", InterniList = "InterniList", HkpList = "HkpList", NormalRowsList = "NormalRowsList", ZpOdesDSToOdes = "ZpOdesDSToOdes", ZpOdesDSEVypToOdes = "ZpOdesDSEVypToOdes", SeznamZasilek = "SeznamZasilek",}
	const enum GOdeslaniParametryOdeslaniDtoFragments { Action = "*", NextStep = "*", ClientAlertNoMail = "*", ClientMessageActivityEsu = "*", ClientMessageNoActivEsu = "*", Count = "*", EmailList = "*", DsList = "*", GexList = "*", HpList = "*", EDeskList = "*", InterniList = "*", HkpList = "*", NormalRowsList = "*", ZpOdesDSToOdes = "*", ZpOdesDSEVypToOdes = "*", SeznamZasilek = "*",}
	const enum GOdeslaniParametryOdeslaniDtoTypes { Action = "string", NextStep = "string", ClientAlertNoMail = "string", ClientMessageActivityEsu = "string", ClientMessageNoActivEsu = "string", Count = "number", EmailList = "Gordic.Wfl.WebClient.GWflMailStructDto[]", DsList = "Gordic.Wfl.WebClient.GWflMailStructDto[]", GexList = "Gordic.Wfl.WebClient.GWflMailStructDto[]", HpList = "Gordic.Wfl.WebClient.GWflMailStructDto[]", EDeskList = "Gordic.Wfl.WebClient.GWflMailStructDto[]", InterniList = "Gordic.Wfl.WebClient.GWflMailStructDto[]", HkpList = "Gordic.Wfl.WebClient.GWflMailStructDto[]", NormalRowsList = "Gordic.Wfl.WebClient.GOdeslaniSeznamDto[]", ZpOdesDSToOdes = "boolean", ZpOdesDSEVypToOdes = "boolean", SeznamZasilek = "Gordic.Wfl.WebClient.GOdeslaniSeznamDto[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniPrilohaPisemnostiDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniPrilohaPisemnostiDto*/
	interface GOdeslaniPrilohaPisemnostiDto {
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		obsah_text?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		ixb?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		s_sgn?: number|null;
		/**Autogenerated.*/
		je_podpis?: number|null;
		/**Autogenerated.*/
		ixb_podpis?: string|null;
		/**Autogenerated.*/
		je_cas_r?: number|null;
		/**Autogenerated.*/
		ixb_cas_r?: string|null;
		/**Autogenerated.*/
		ixs_ulo_podpis?: string|null;
		/**Autogenerated.*/
		ixs_ulo_cas_r?: string|null;
		/**Autogenerated.*/
		vyber_ixb?: boolean|null;
		/**Autogenerated.*/
		vyber_podpis?: boolean|null;
		/**Autogenerated.*/
		vyber_cas_r?: boolean|null;
		/**Autogenerated.*/
		konvertovat?: number|null;
		/**Autogenerated.*/
		soubor_pri?: string|null;
		/**Autogenerated.*/
		kov_typ_soub?: string|null;
		/**Autogenerated.*/
		soubor?: string|null;
		/**Autogenerated.*/
		display_only?: number|null;
		/**Autogenerated.*/
		popis?: string|null;
		/**Autogenerated.*/
		je_in_sgn?: number|null;
		/**Autogenerated.*/
		je_in_cr?: number|null;
		/**Autogenerated.*/
		je_ixs_ulo_pre?: number|null;
		/**Autogenerated.*/
		vyber_ixs_ulo_pre?: boolean|null;
		/**Autogenerated.*/
		ixs_ulo_pre?: string|null;
		/**Autogenerated.*/
		soubor_pre?: string|null;
		/**Autogenerated.*/
		soubor_pri_pre?: string|null;
		/**Autogenerated.*/
		ixs_ulo?: string|null;
		/**Autogenerated.*/
		velikost?: JsonDecimal|null;
		/**Autogenerated.*/
		velikost_podpisu?: number|null;
		/**Autogenerated.*/
		velikost_tst?: number|null;
		/**Autogenerated.*/
		velikost_pre?: JsonDecimal|null;
		/**Typ konverze.*/
		typ_konverze?: Gordic.Ginis.DbModel.GWflctkoEnum|null;
		/**Typ tisku.*/
		typ_tisku?: Gordic.Ginis.DbModel.GWflcttiEnum|null;
	}
	const enum GOdeslaniPrilohaPisemnostiDtoNames { ixp = "ixp", por_cislo = "por_cislo", obsah_text = "obsah_text", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", ixb = "ixb", aktivita = "aktivita", s_sgn = "s_sgn", je_podpis = "je_podpis", ixb_podpis = "ixb_podpis", je_cas_r = "je_cas_r", ixb_cas_r = "ixb_cas_r", ixs_ulo_podpis = "ixs_ulo_podpis", ixs_ulo_cas_r = "ixs_ulo_cas_r", vyber_ixb = "vyber_ixb", vyber_podpis = "vyber_podpis", vyber_cas_r = "vyber_cas_r", konvertovat = "konvertovat", soubor_pri = "soubor_pri", kov_typ_soub = "kov_typ_soub", soubor = "soubor", display_only = "display_only", popis = "popis", je_in_sgn = "je_in_sgn", je_in_cr = "je_in_cr", je_ixs_ulo_pre = "je_ixs_ulo_pre", vyber_ixs_ulo_pre = "vyber_ixs_ulo_pre", ixs_ulo_pre = "ixs_ulo_pre", soubor_pre = "soubor_pre", soubor_pri_pre = "soubor_pri_pre", ixs_ulo = "ixs_ulo", velikost = "velikost", velikost_podpisu = "velikost_podpisu", velikost_tst = "velikost_tst", velikost_pre = "velikost_pre", typ_konverze = "typ_konverze", typ_tisku = "typ_tisku",}
	const enum GOdeslaniPrilohaPisemnostiDtoFragments { ixp = "*", por_cislo = "*", obsah_text = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", ixb = "*", aktivita = "*", s_sgn = "*", je_podpis = "*", ixb_podpis = "*", je_cas_r = "*", ixb_cas_r = "*", ixs_ulo_podpis = "*", ixs_ulo_cas_r = "*", vyber_ixb = "*", vyber_podpis = "*", vyber_cas_r = "*", konvertovat = "*", soubor_pri = "*", kov_typ_soub = "*", soubor = "*", display_only = "*", popis = "*", je_in_sgn = "*", je_in_cr = "*", je_ixs_ulo_pre = "*", vyber_ixs_ulo_pre = "*", ixs_ulo_pre = "*", soubor_pre = "*", soubor_pri_pre = "*", ixs_ulo = "*", velikost = "*", velikost_podpisu = "*", velikost_tst = "*", velikost_pre = "*", typ_konverze = "*", typ_tisku = "*",}
	const enum GOdeslaniPrilohaPisemnostiDtoTypes { ixp = "string", por_cislo = "number", obsah_text = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", ixb = "string", aktivita = "number", s_sgn = "number", je_podpis = "number", ixb_podpis = "string", je_cas_r = "number", ixb_cas_r = "string", ixs_ulo_podpis = "string", ixs_ulo_cas_r = "string", vyber_ixb = "boolean", vyber_podpis = "boolean", vyber_cas_r = "boolean", konvertovat = "number", soubor_pri = "string", kov_typ_soub = "string", soubor = "string", display_only = "number", popis = "string", je_in_sgn = "number", je_in_cr = "number", je_ixs_ulo_pre = "number", vyber_ixs_ulo_pre = "boolean", ixs_ulo_pre = "string", soubor_pre = "string", soubor_pri_pre = "string", ixs_ulo = "string", velikost = "JsonDecimal", velikost_podpisu = "number", velikost_tst = "number", velikost_pre = "JsonDecimal", typ_konverze = "Gordic.Ginis.DbModel.GWflctkoEnum", typ_tisku = "Gordic.Ginis.DbModel.GWflcttiEnum",}
	const enum GOdeslaniPrilohaPisemnostiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniSeznamDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GOdeslaniSeznamDto {
		/**Autogenerated.*/
		lastBulkAction?: Gordic.Wfl.WebClient.GOdeslaniBulkActionEnum|null;
		/**Chyby pro různé akce na zásilce.
		*     Klíč je GOdeslaniBulkActionEnum, ale kvůli typeScriptu je nutné použít číslo.
		*/
		ActionErrors?: any|null;
		/**Autogenerated.*/
		vysledekHromadneZmeny?: Gordic.Wfl.WebClient.GOdeslaniBulkBaseResultEnum|null;
		/**Autogenerated.*/
		vysledekGenerovaniIdDorucenek?: Gordic.Wfl.WebClient.GOdeslaniBulkBaseResultEnum|null;
		selected?: boolean|null;
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		lic?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		dat_odes?: JsonDate|null;
		/**Autogenerated.*/
		pod_cislo?: string|null;
		/**Autogenerated.*/
		zpusob_dor?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		/**Autogenerated.*/
		zpusob_dor_txt?: string|null;
		/**Autogenerated.*/
		druh_zas?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		/**Autogenerated.*/
		druh_zas_txt?: string|null;
		/**Autogenerated.*/
		id_dorucenky?: string|null;
		/**Autogenerated.*/
		ixs_esu?: string|null;
		/**Autogenerated.*/
		lic_zast?: string|null;
		/**Autogenerated.*/
		por_zast?: number|null;
		/**Autogenerated.*/
		esu_txt?: string|null;
		/**Autogenerated.*/
		zast_txt?: string|null;
		/**Autogenerated.*/
		s_dor?: Gordic.Ginis.DbModel.GWflcsdoEnum|null;
		/**Autogenerated.*/
		s_orig?: number|null;
		/**Autogenerated.*/
		st0?: string|null;
		/**Autogenerated.*/
		st1?: string|null;
		/**Autogenerated.*/
		st2?: string|null;
		/**Autogenerated.*/
		st3?: string|null;
		/**Autogenerated.*/
		st4?: string|null;
		/**Autogenerated.*/
		st5?: string|null;
		/**Autogenerated.*/
		st6?: string|null;
		/**Autogenerated.*/
		st7?: string|null;
		/**Autogenerated.*/
		typ_obs_ob?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		/**Autogenerated.*/
		typ_obs_ob_txt?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		pri_del?: number|null;
		/**Autogenerated.*/
		pri_new?: number|null;
		/**Autogenerated.*/
		ixs_esu_puv?: string|null;
		/**Gets or sets the doplnkove sluzby.*/
		DoplnkoveSluzby?: number[]|null;
		/**Autogenerated.*/
		priz_doruc?: number|null;
		/**Autogenerated.*/
		soubor_obr_m?: string|null;
		/**Autogenerated.*/
		priz_dor?: number|null;
		/**Autogenerated.*/
		id_vnitr_adr?: string|null;
		/**Autogenerated.*/
		zmocneni_dz?: string|null;
		/**Autogenerated.*/
		obalka?: string|null;
		/**Autogenerated.*/
		s_dor_txt?: string|null;
		/**Autogenerated.*/
		dat_potvrz?: JsonDate|null;
		/**Autogenerated.*/
		sxs_obal?: string|null;
		/**Autogenerated.*/
		priz_obal?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		dat_pod?: JsonDate|null;
		/**Autogenerated.*/
		cj?: string|null;
		/**Autogenerated.*/
		pri_print?: number|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		nazev_akt_start?: string|null;
		/**Autogenerated.*/
		nazev_SU?: string|null;
		/**Autogenerated.*/
		nazev_ref?: string|null;
		/**Autogenerated.*/
		lic_mail?: string|null;
		/**Autogenerated.*/
		por_cislo_mail?: number|null;
		/**Autogenerated.*/
		id_ds?: string|null;
		/**Autogenerated.*/
		id_gex?: string|null;
		/**Autogenerated.*/
		dat_akt_rob?: JsonDate|null;
		/**Autogenerated.*/
		dat_akt_ros?: JsonDate|null;
		/**Autogenerated.*/
		ixb_seznam?: string|null;
		/**Autogenerated.*/
		ixp_new?: string|null;
		/**Autogenerated.*/
		konverze_uspesna?: number|null;
		/**Autogenerated.*/
		konverze_vystup?: string|null;
		/**Autogenerated.*/
		ixs_hpz?: string|null;
		/**Autogenerated.*/
		typ_vyh_dor?: number|null;
		/**Autogenerated.*/
		typ_archivace?: number|null;
		/**Autogenerated.*/
		typ_konverze?: number|null;
		/**Autogenerated.*/
		typ_tisku?: number|null;
		/**Autogenerated.*/
		stupen_ver?: number|null;
		/**Autogenerated.*/
		adresat_jmeno?: string|null;
		/**Autogenerated.*/
		adresat_posta?: string|null;
		/**.*/
		typ_seznam?: string|null;
		/**.*/
		over_esu?: string|null;
		/**.*/
		over_esu_txt?: string|null;
		s_dor_odes?: string|null;
		over_isds?: string|null;
		/**Příznak, zda při ověření ISDS před odesláním došlo k chybě. Pokud ano, pak se nesmí zásilka odesílat.*/
		ObsahujeChybuOvereniISDS?: boolean|null;
		/**Výsledek ověření eDesk schránky.*/
		VysledekOvereniEDeskSchranky?: Gordic.Psr.Interface.GVysledekOvereniEDeskSchrankyEnum|null;
		/**Příznak, zda se jedná o eDesk schránku.*/
		readonly IsEDeskSchranka?: boolean|null;
		/**Přínak interního subjektu.*/
		priz_isu?: number|null;
		/**Přínak fyzické formy dokumenty.*/
		priz_fyz?: number|null;
		/**Přínak elektronické formy dokumenty.*/
		priz_ele?: number|null;
		/**Počet odeslaných listů.*/
		odeslano_listu?: number|null;
		/**Počet odeslaných nelistinných příloh.*/
		odeslano_nl_priloh?: string|null;
		/**Gets or sets the KTG zp dor.*/
		ktg_zp_dor?: number|null;
		/**Datum vypravení zásilky spojené s nadřízenou (např. zásilka HKP a k ní datum vypravení DZ).*/
		dat_odes_nad?: JsonDate|null;
		/**Gets or sets the SXS.*/
		readonly sxs?: string|null;
	}
	const enum GOdeslaniSeznamDtoNames { lastBulkAction = "lastBulkAction", ActionErrors = "ActionErrors", vysledekHromadneZmeny = "vysledekHromadneZmeny", vysledekGenerovaniIdDorucenek = "vysledekGenerovaniIdDorucenek", selected = "selected", ixp = "ixp", lic = "lic", por_cislo = "por_cislo", dat_odes = "dat_odes", pod_cislo = "pod_cislo", zpusob_dor = "zpusob_dor", zpusob_dor_txt = "zpusob_dor_txt", druh_zas = "druh_zas", druh_zas_txt = "druh_zas_txt", id_dorucenky = "id_dorucenky", ixs_esu = "ixs_esu", lic_zast = "lic_zast", por_zast = "por_zast", esu_txt = "esu_txt", zast_txt = "zast_txt", s_dor = "s_dor", s_orig = "s_orig", st0 = "st0", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", typ_obs_ob = "typ_obs_ob", typ_obs_ob_txt = "typ_obs_ob_txt", poznamka = "poznamka", pri_del = "pri_del", pri_new = "pri_new", ixs_esu_puv = "ixs_esu_puv", DoplnkoveSluzby = "DoplnkoveSluzby", priz_doruc = "priz_doruc", soubor_obr_m = "soubor_obr_m", priz_dor = "priz_dor", id_vnitr_adr = "id_vnitr_adr", zmocneni_dz = "zmocneni_dz", obalka = "obalka", s_dor_txt = "s_dor_txt", dat_potvrz = "dat_potvrz", sxs_obal = "sxs_obal", priz_obal = "priz_obal", dat_zmena = "dat_zmena", dat_pod = "dat_pod", cj = "cj", pri_print = "pri_print", m_vyber = "m_vyber", nazev_akt_start = "nazev_akt_start", nazev_SU = "nazev_SU", nazev_ref = "nazev_ref", lic_mail = "lic_mail", por_cislo_mail = "por_cislo_mail", id_ds = "id_ds", id_gex = "id_gex", dat_akt_rob = "dat_akt_rob", dat_akt_ros = "dat_akt_ros", ixb_seznam = "ixb_seznam", ixp_new = "ixp_new", konverze_uspesna = "konverze_uspesna", konverze_vystup = "konverze_vystup", ixs_hpz = "ixs_hpz", typ_vyh_dor = "typ_vyh_dor", typ_archivace = "typ_archivace", typ_konverze = "typ_konverze", typ_tisku = "typ_tisku", stupen_ver = "stupen_ver", adresat_jmeno = "adresat_jmeno", adresat_posta = "adresat_posta", typ_seznam = "typ_seznam", over_esu = "over_esu", over_esu_txt = "over_esu_txt", s_dor_odes = "s_dor_odes", over_isds = "over_isds", ObsahujeChybuOvereniISDS = "ObsahujeChybuOvereniISDS", VysledekOvereniEDeskSchranky = "VysledekOvereniEDeskSchranky", IsEDeskSchranka = "IsEDeskSchranka", priz_isu = "priz_isu", priz_fyz = "priz_fyz", priz_ele = "priz_ele", odeslano_listu = "odeslano_listu", odeslano_nl_priloh = "odeslano_nl_priloh", ktg_zp_dor = "ktg_zp_dor", dat_odes_nad = "dat_odes_nad", sxs = "sxs",}
	const enum GOdeslaniSeznamDtoFragments { lastBulkAction = "*", ActionErrors = "*", vysledekHromadneZmeny = "*", vysledekGenerovaniIdDorucenek = "*", selected = "*", ixp = "*", lic = "*", por_cislo = "*", dat_odes = "*", pod_cislo = "*", zpusob_dor = "*", zpusob_dor_txt = "*", druh_zas = "*", druh_zas_txt = "*", id_dorucenky = "*", ixs_esu = "*", lic_zast = "*", por_zast = "*", esu_txt = "*", zast_txt = "*", s_dor = "*", s_orig = "*", st0 = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", typ_obs_ob = "*", typ_obs_ob_txt = "*", poznamka = "*", pri_del = "*", pri_new = "*", ixs_esu_puv = "*", DoplnkoveSluzby = "*", priz_doruc = "*", soubor_obr_m = "*", priz_dor = "*", id_vnitr_adr = "*", zmocneni_dz = "*", obalka = "*", s_dor_txt = "*", dat_potvrz = "*", sxs_obal = "*", priz_obal = "*", dat_zmena = "*", dat_pod = "*", cj = "*", pri_print = "*", m_vyber = "*", nazev_akt_start = "*", nazev_SU = "*", nazev_ref = "*", lic_mail = "*", por_cislo_mail = "*", id_ds = "*", id_gex = "*", dat_akt_rob = "*", dat_akt_ros = "*", ixb_seznam = "*", ixp_new = "*", konverze_uspesna = "*", konverze_vystup = "*", ixs_hpz = "*", typ_vyh_dor = "*", typ_archivace = "*", typ_konverze = "*", typ_tisku = "*", stupen_ver = "*", adresat_jmeno = "*", adresat_posta = "*", typ_seznam = "*", over_esu = "*", over_esu_txt = "*", s_dor_odes = "*", over_isds = "*", ObsahujeChybuOvereniISDS = "*", VysledekOvereniEDeskSchranky = "*", IsEDeskSchranka = "*", priz_isu = "*", priz_fyz = "*", priz_ele = "*", odeslano_listu = "*", odeslano_nl_priloh = "*", ktg_zp_dor = "*", dat_odes_nad = "*", sxs = "*",}
	const enum GOdeslaniSeznamDtoTypes { lastBulkAction = "Gordic.Wfl.WebClient.GOdeslaniBulkActionEnum", ActionErrors = "any", vysledekHromadneZmeny = "Gordic.Wfl.WebClient.GOdeslaniBulkBaseResultEnum", vysledekGenerovaniIdDorucenek = "Gordic.Wfl.WebClient.GOdeslaniBulkBaseResultEnum", selected = "boolean", ixp = "string", lic = "string", por_cislo = "number", dat_odes = "JsonDate", pod_cislo = "string", zpusob_dor = "Gordic.Ginis.DbModel.GWflczpdEnum", zpusob_dor_txt = "string", druh_zas = "Gordic.Ginis.DbModel.GWflcdrzEnum", druh_zas_txt = "string", id_dorucenky = "string", ixs_esu = "string", lic_zast = "string", por_zast = "number", esu_txt = "string", zast_txt = "string", s_dor = "Gordic.Ginis.DbModel.GWflcsdoEnum", s_orig = "number", st0 = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", typ_obs_ob = "Gordic.Ginis.DbModel.GWflctobEnum", typ_obs_ob_txt = "string", poznamka = "string", pri_del = "number", pri_new = "number", ixs_esu_puv = "string", DoplnkoveSluzby = "number[]", priz_doruc = "number", soubor_obr_m = "string", priz_dor = "number", id_vnitr_adr = "string", zmocneni_dz = "string", obalka = "string", s_dor_txt = "string", dat_potvrz = "JsonDate", sxs_obal = "string", priz_obal = "number", dat_zmena = "JsonDate", dat_pod = "JsonDate", cj = "string", pri_print = "number", m_vyber = "number", nazev_akt_start = "string", nazev_SU = "string", nazev_ref = "string", lic_mail = "string", por_cislo_mail = "number", id_ds = "string", id_gex = "string", dat_akt_rob = "JsonDate", dat_akt_ros = "JsonDate", ixb_seznam = "string", ixp_new = "string", konverze_uspesna = "number", konverze_vystup = "string", ixs_hpz = "string", typ_vyh_dor = "number", typ_archivace = "number", typ_konverze = "number", typ_tisku = "number", stupen_ver = "number", adresat_jmeno = "string", adresat_posta = "string", typ_seznam = "string", over_esu = "string", over_esu_txt = "string", s_dor_odes = "string", over_isds = "string", ObsahujeChybuOvereniISDS = "boolean", VysledekOvereniEDeskSchranky = "Gordic.Psr.Interface.GVysledekOvereniEDeskSchrankyEnum", IsEDeskSchranka = "boolean", priz_isu = "number", priz_fyz = "number", priz_ele = "number", odeslano_listu = "number", odeslano_nl_priloh = "string", ktg_zp_dor = "number", dat_odes_nad = "JsonDate", sxs = "string",}
	const enum GOdeslaniSeznamDtoTypeLengths { st0 = 50, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniSeznamFormDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GOdeslaniSeznamFormDto {
		/**.*/
		Poznamka?: string|null;
		/**.*/
		SablonaZasilky?: Gordic.Wfl.WebClient.GSablonaZasilkyDto|null;
		/**.*/
		ZpusobOdeslani?: Gordic.Wfl.WebClient.GZpusobOdeslaniDto|null;
		/**.*/
		DruhZasilky?: Gordic.Wfl.WebClient.GDruhZasilkyDto|null;
		/**.*/
		TypObsahuZasilky?: Gordic.Wfl.WebClient.GTypObsahuZasilkyDto|null;
		/**.*/
		DoplnkoveSluzby?: Gordic.Wfl.WebClient.GDoplnkoveSluzbyDto[]|null;
	}
	const enum GOdeslaniSeznamFormDtoNames { Poznamka = "Poznamka", SablonaZasilky = "SablonaZasilky", ZpusobOdeslani = "ZpusobOdeslani", DruhZasilky = "DruhZasilky", TypObsahuZasilky = "TypObsahuZasilky", DoplnkoveSluzby = "DoplnkoveSluzby",}
	const enum GOdeslaniSeznamFormDtoFragments { Poznamka = "*", SablonaZasilky = "*", ZpusobOdeslani = "*", DruhZasilky = "*", TypObsahuZasilky = "*", DoplnkoveSluzby = "*",}
	const enum GOdeslaniSeznamFormDtoTypes { Poznamka = "string", SablonaZasilky = "Gordic.Wfl.WebClient.GSablonaZasilkyDto", ZpusobOdeslani = "Gordic.Wfl.WebClient.GZpusobOdeslaniDto", DruhZasilky = "Gordic.Wfl.WebClient.GDruhZasilkyDto", TypObsahuZasilky = "Gordic.Wfl.WebClient.GTypObsahuZasilkyDto", DoplnkoveSluzby = "Gordic.Wfl.WebClient.GDoplnkoveSluzbyDto[]",}
	interface GDoplnkoveSluzbyStringStringDto {
		/**Autogenerated.*/
		value?: string|null;
		/**Autogenerated.*/
		text?: string|null;
	}
	const enum GDoplnkoveSluzbyStringStringDtoNames { value = "value", text = "text",}
	const enum GDoplnkoveSluzbyStringStringDtoFragments { value = "*", text = "*",}
	const enum GDoplnkoveSluzbyStringStringDtoTypes { value = "string", text = "string",}
	interface GDoplnkoveSluzbyDto {
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		filtr_format?: string|null;
		/**Autogenerated.*/
		post_sluzba?: number|null;
		/**Autogenerated.*/
		post_sluzba_poz?: string|null;
		/**Autogenerated.*/
		post_sluzba_txt?: string|null;
		/**Autogenerated.*/
		post_sluzba_zkr?: string|null;
		/**Autogenerated.*/
		priz_doruc?: number|null;
	}
	const enum GDoplnkoveSluzbyDtoNames { aktivita = "aktivita", filtr_format = "filtr_format", post_sluzba = "post_sluzba", post_sluzba_poz = "post_sluzba_poz", post_sluzba_txt = "post_sluzba_txt", post_sluzba_zkr = "post_sluzba_zkr", priz_doruc = "priz_doruc",}
	const enum GDoplnkoveSluzbyDtoFragments { aktivita = "*", filtr_format = "*", post_sluzba = "*", post_sluzba_poz = "*", post_sluzba_txt = "*", post_sluzba_zkr = "*", priz_doruc = "*",}
	const enum GDoplnkoveSluzbyDtoTypes { aktivita = "number", filtr_format = "string", post_sluzba = "number", post_sluzba_poz = "string", post_sluzba_txt = "string", post_sluzba_zkr = "string", priz_doruc = "number",}
	interface GDruhZasilkyDto {
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		druh_zas?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		/**Autogenerated.*/
		druh_zas_txt?: string|null;
		/**Autogenerated.*/
		druh_zas_zkr?: string|null;
		/**Autogenerated.*/
		filtr_format?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		k_xml?: string|null;
		/**Autogenerated.*/
		povol_sl?: string|null;
		/**Autogenerated.*/
		priz_doruc?: number|null;
		/**Autogenerated.*/
		priz_zahr?: number|null;
	}
	const enum GDruhZasilkyDtoNames { aktivita = "aktivita", druh_zas = "druh_zas", druh_zas_txt = "druh_zas_txt", druh_zas_zkr = "druh_zas_zkr", filtr_format = "filtr_format", k_v = "k_v", k_xml = "k_xml", povol_sl = "povol_sl", priz_doruc = "priz_doruc", priz_zahr = "priz_zahr",}
	const enum GDruhZasilkyDtoFragments { aktivita = "*", druh_zas = "*", druh_zas_txt = "*", druh_zas_zkr = "*", filtr_format = "*", k_v = "*", k_xml = "*", povol_sl = "*", priz_doruc = "*", priz_zahr = "*",}
	const enum GDruhZasilkyDtoTypes { aktivita = "number", druh_zas = "Gordic.Ginis.DbModel.GWflcdrzEnum", druh_zas_txt = "string", druh_zas_zkr = "string", filtr_format = "string", k_v = "number", k_xml = "string", povol_sl = "string", priz_doruc = "number", priz_zahr = "number",}
	interface GSablonaZasilkyDto {
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		druh_zas?: number|null;
		/**Autogenerated.*/
		druh_zas_txt?: string|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		sablona_sluzeb?: string|null;
		/**Autogenerated.*/
		soubor_obr_m?: string|null;
		/**Autogenerated.*/
		soubor_obr_v?: string|null;
	}
	const enum GSablonaZasilkyDtoNames { aktivita = "aktivita", druh_zas = "druh_zas", druh_zas_txt = "druh_zas_txt", nazev = "nazev", sablona_sluzeb = "sablona_sluzeb", soubor_obr_m = "soubor_obr_m", soubor_obr_v = "soubor_obr_v",}
	const enum GSablonaZasilkyDtoFragments { aktivita = "*", druh_zas = "*", druh_zas_txt = "*", nazev = "*", sablona_sluzeb = "*", soubor_obr_m = "*", soubor_obr_v = "*",}
	const enum GSablonaZasilkyDtoTypes { aktivita = "number", druh_zas = "number", druh_zas_txt = "string", nazev = "string", sablona_sluzeb = "string", soubor_obr_m = "string", soubor_obr_v = "string",}
	interface GTypObsahuZasilkyDto {
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		typ_obs_ob?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		/**Autogenerated.*/
		typ_obs_ob_txt?: string|null;
	}
	const enum GTypObsahuZasilkyDtoNames { k_v = "k_v", typ_obs_ob = "typ_obs_ob", typ_obs_ob_txt = "typ_obs_ob_txt",}
	const enum GTypObsahuZasilkyDtoFragments { k_v = "*", typ_obs_ob = "*", typ_obs_ob_txt = "*",}
	const enum GTypObsahuZasilkyDtoTypes { k_v = "number", typ_obs_ob = "Gordic.Ginis.DbModel.GWflctobEnum", typ_obs_ob_txt = "string",}
	interface GZpusobOdeslaniDto {
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		k_v?: number|null;
		/**Autogenerated.*/
		povol_sl?: string|null;
		/**Autogenerated.*/
		zpusob_dor?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		/**Autogenerated.*/
		zpusob_dor_txt?: string|null;
	}
	const enum GZpusobOdeslaniDtoNames { aktivita = "aktivita", k_v = "k_v", povol_sl = "povol_sl", zpusob_dor = "zpusob_dor", zpusob_dor_txt = "zpusob_dor_txt",}
	const enum GZpusobOdeslaniDtoFragments { aktivita = "*", k_v = "*", povol_sl = "*", zpusob_dor = "*", zpusob_dor_txt = "*",}
	const enum GZpusobOdeslaniDtoTypes { aktivita = "number", k_v = "number", povol_sl = "string", zpusob_dor = "Gordic.Ginis.DbModel.GWflczpdEnum", zpusob_dor_txt = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniSeznamPrilohEMailuDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**GOdeslaniSeznamPrilohEMailuDto*/
	interface GOdeslaniSeznamPrilohEMailuDto {
        /**Autogenerated.*/
		lic?: string|null;
        /**Autogenerated.*/
		por_cislo?: number|null;
        /**Autogenerated.*/
		pri_cislo?: number|null;
        /**Autogenerated.*/
		nazev?: string|null;
        /**Autogenerated.*/
		ixb?: string|null;
        /**Autogenerated.*/
		s_sign?: number|null;
        /**Autogenerated.*/
		s_crypt?: number|null;
        /**Autogenerated.*/
		ixs_ulo?: string|null;
	}
	const enum GOdeslaniSeznamPrilohEMailuDtoNames { lic = "lic", por_cislo = "por_cislo", pri_cislo = "pri_cislo", nazev = "nazev", ixb = "ixb", s_sign = "s_sign", s_crypt = "s_crypt", ixs_ulo = "ixs_ulo",}
	const enum GOdeslaniSeznamPrilohEMailuDtoFragments { lic = "*", por_cislo = "*", pri_cislo = "*", nazev = "*", ixb = "*", s_sign = "*", s_crypt = "*", ixs_ulo = "*",}
	const enum GOdeslaniSeznamPrilohEMailuDtoTypes { lic = "string", por_cislo = "number", pri_cislo = "number", nazev = "string", ixb = "string", s_sign = "number", s_crypt = "number", ixs_ulo = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniTiskAdresDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GOdeslaniTiskAdresDto*/
	interface GOdeslaniTiskAdresDto {
		/**druh_zas*/
		druh_zas?: number|null;
		/**druh_zas_txt*/
		druh_zas_txt?: string|null;
		/**komb_sluzeb*/
		komb_sluzeb?: string|null;
		/**Gets or sets the doplnkove sluzby.*/
		DoplnkoveSluzby?: number[]|null;
		/**soubor_obr_v*/
		soubor_obr_v?: string|null;
		/**soubor_obr_m*/
		soubor_obr_m?: string|null;
		/**pocet*/
		pocet?: number|null;
	}
	const enum GOdeslaniTiskAdresDtoNames { druh_zas = "druh_zas", druh_zas_txt = "druh_zas_txt", komb_sluzeb = "komb_sluzeb", DoplnkoveSluzby = "DoplnkoveSluzby", soubor_obr_v = "soubor_obr_v", soubor_obr_m = "soubor_obr_m", pocet = "pocet",}
	const enum GOdeslaniTiskAdresDtoFragments { druh_zas = "*", druh_zas_txt = "*", komb_sluzeb = "*", DoplnkoveSluzby = "*", soubor_obr_v = "*", soubor_obr_m = "*", pocet = "*",}
	const enum GOdeslaniTiskAdresDtoTypes { druh_zas = "number", druh_zas_txt = "string", komb_sluzeb = "string", DoplnkoveSluzby = "number[]", soubor_obr_v = "string", soubor_obr_m = "string", pocet = "number",}
	/**GOdeslaniTiskAdresCountsDto*/
	interface GOdeslaniTiskAdresCountsDto {
		Vsechny?: number|null;
		Pripravene?: number|null;
		Vybrane?: number|null;
	}
	const enum GOdeslaniTiskAdresCountsDtoNames { Vsechny = "Vsechny", Pripravene = "Pripravene", Vybrane = "Vybrane",}
	const enum GOdeslaniTiskAdresCountsDtoFragments { Vsechny = "*", Pripravene = "*", Vybrane = "*",}
	const enum GOdeslaniTiskAdresCountsDtoTypes { Vsechny = "number", Pripravene = "number", Vybrane = "number",}
	/**GOdeslaniTiskAdresFormDto.*/
	interface GOdeslaniTiskAdresFormDto {
		/**The pocet*/
		Pocet?: number|null;
		/**The tisknout zasilky*/
		TisknoutZasilky?: Gordic.Wfl.Interface.KriteriumPoctuZasilekEnum|null;
		/**The od stitku*/
		OdStitku?: number|null;
		/**The vsechny formaty*/
		VsechnyFormaty?: boolean|null;
	}
	const enum GOdeslaniTiskAdresFormDtoNames { Pocet = "Pocet", TisknoutZasilky = "TisknoutZasilky", OdStitku = "OdStitku", VsechnyFormaty = "VsechnyFormaty",}
	const enum GOdeslaniTiskAdresFormDtoFragments { Pocet = "*", TisknoutZasilky = "*", OdStitku = "*", VsechnyFormaty = "*",}
	const enum GOdeslaniTiskAdresFormDtoTypes { Pocet = "number", TisknoutZasilky = "Gordic.Wfl.Interface.KriteriumPoctuZasilekEnum", OdStitku = "number", VsechnyFormaty = "boolean",}
	/**GTiskAdresPrintParamsDto.*/
	interface GTiskAdresPrintParamsDto {
		/**The s par gin vla1 obal*/
		SParGinVla1Obal?: string|null;
		/**The s par gin vla2 obal*/
		SParGinVla2Obal?: string|null;
		/**The log por cislo*/
		LogPorCislo?: number|null;
		/**The ixs orj*/
		IxsOrj?: string|null;
		/**The X0009*/
		X0009?: string|null;
	}
	const enum GTiskAdresPrintParamsDtoNames { SParGinVla1Obal = "SParGinVla1Obal", SParGinVla2Obal = "SParGinVla2Obal", LogPorCislo = "LogPorCislo", IxsOrj = "IxsOrj", X0009 = "X0009",}
	const enum GTiskAdresPrintParamsDtoFragments { SParGinVla1Obal = "*", SParGinVla2Obal = "*", LogPorCislo = "*", IxsOrj = "*", X0009 = "*",}
	const enum GTiskAdresPrintParamsDtoTypes { SParGinVla1Obal = "string", SParGinVla2Obal = "string", LogPorCislo = "number", IxsOrj = "string", X0009 = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniTiskObalekRestrictionAlfItemsDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**GOdeslaniTiskObalekRestrictionAlfItemsDto*/
	interface GOdeslaniTiskObalekRestrictionAlfItemsDto {
        /**Ixp*/
		Ixp?: string|null;
        /**DruhZasilky*/
		DruhZasilky?: string|null;
        /**DoplnkoveSluzby*/
		DoplnkoveSluzby?: string|null;
        /**VsechnyFormaty*/
		VsechnyFormaty?: boolean|null;
	}
	const enum GOdeslaniTiskObalekRestrictionAlfItemsDtoNames { Ixp = "Ixp", DruhZasilky = "DruhZasilky", DoplnkoveSluzby = "DoplnkoveSluzby", VsechnyFormaty = "VsechnyFormaty",}
	const enum GOdeslaniTiskObalekRestrictionAlfItemsDtoFragments { Ixp = "*", DruhZasilky = "*", DoplnkoveSluzby = "*", VsechnyFormaty = "*",}
	const enum GOdeslaniTiskObalekRestrictionAlfItemsDtoTypes { Ixp = "string", DruhZasilky = "string", DoplnkoveSluzby = "string", VsechnyFormaty = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GOdeslaniZasilkaDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**GOdeslaniZasilkaDto*/
	interface GOdeslaniZasilkaDto {
		IdDorucenky?: string|null;
		Poznamka?: string|null;
		St0?: string|null;
		St1?: string|null;
		St2?: string|null;
		St3?: string|null;
		St4?: string|null;
		St5?: string|null;
		St6?: string|null;
		St7?: string|null;
		ZpusobOdeslani?: number|null;
		DruhZasilky?: number|null;
		DoplnkoveSluzby?: number[]|null;
		TypObsahu?: number|null;
		LicZast?: string|null;
		IxsEsu?: string|null;
		PorZast?: number|null;
		Ixp?: string|null;
		SpisovaZnacka?: string|null;
		Lic?: string|null;
		SOrig?: number|null;
		DatZmena?: JsonDate|null;
	}
	const enum GOdeslaniZasilkaDtoNames { IdDorucenky = "IdDorucenky", Poznamka = "Poznamka", St0 = "St0", St1 = "St1", St2 = "St2", St3 = "St3", St4 = "St4", St5 = "St5", St6 = "St6", St7 = "St7", ZpusobOdeslani = "ZpusobOdeslani", DruhZasilky = "DruhZasilky", DoplnkoveSluzby = "DoplnkoveSluzby", TypObsahu = "TypObsahu", LicZast = "LicZast", IxsEsu = "IxsEsu", PorZast = "PorZast", Ixp = "Ixp", SpisovaZnacka = "SpisovaZnacka", Lic = "Lic", SOrig = "SOrig", DatZmena = "DatZmena",}
	const enum GOdeslaniZasilkaDtoFragments { IdDorucenky = "*", Poznamka = "*", St0 = "*", St1 = "*", St2 = "*", St3 = "*", St4 = "*", St5 = "*", St6 = "*", St7 = "*", ZpusobOdeslani = "*", DruhZasilky = "*", DoplnkoveSluzby = "*", TypObsahu = "*", LicZast = "*", IxsEsu = "*", PorZast = "*", Ixp = "*", SpisovaZnacka = "*", Lic = "*", SOrig = "*", DatZmena = "*",}
	const enum GOdeslaniZasilkaDtoTypes { IdDorucenky = "string", Poznamka = "string", St0 = "string", St1 = "string", St2 = "string", St3 = "string", St4 = "string", St5 = "string", St6 = "string", St7 = "string", ZpusobOdeslani = "number", DruhZasilky = "number", DoplnkoveSluzby = "number[]", TypObsahu = "number", LicZast = "string", IxsEsu = "string", PorZast = "number", Ixp = "string", SpisovaZnacka = "string", Lic = "string", SOrig = "number", DatZmena = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GPrilohaPisemnostiDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GPrilohaPisemnostiDto*/
	interface GPrilohaPisemnostiDto {
		/**Příznak vybraného řádku.*/
		vyber_ixb?: boolean|null;
		/**Autogenerated.*/
		ixp?: string|null;
		/**Autogenerated.*/
		por_cislo?: number|null;
		/**Autogenerated.*/
		obsah_text?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		s_ele?: number|null;
		/**Autogenerated.*/
		ixb?: string|null;
		/**Autogenerated.*/
		aktivita?: number|null;
		/**Autogenerated.*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		pocet?: number|null;
		/**Autogenerated.*/
		s_sgn?: number|null;
		/**Autogenerated.*/
		typ_elp?: number|null;
		/**Autogenerated.*/
		priz_elp?: number|null;
		/**Autogenerated.*/
		ktg_typ_pri?: number|null;
		/**Autogenerated.*/
		ktg_typ_pri_txt?: string|null;
		/**Autogenerated.*/
		soubor_pri?: string|null;
		/**Autogenerated.*/
		dop_konv_pdf?: number|null;
		/**Autogenerated.*/
		kov_typ_soub?: string|null;
		/**Autogenerated.*/
		soubor?: string|null;
		/**Autogenerated.*/
		velikost?: JsonDecimal|null;
		/**Autogenerated.*/
		aktivita_wflsepx?: number|null;
		/**Autogenerated.*/
		aktivita_wflsixb?: number|null;
		/**Autogenerated.*/
		priz_arch_ver?: number|null;
		/**Autogenerated.*/
		priz_plat_ver?: number|null;
		/**Autogenerated.*/
		priz_check?: number|null;
		/**Autogenerated.*/
		ixs_fun_check?: string|null;
		/**Autogenerated.*/
		je_zver?: number|null;
		/**Autogenerated.*/
		je_zver_pos_ver?: number|null;
		/**Autogenerated.*/
		posl_dat_zver?: JsonDate|null;
		/**Autogenerated.*/
		ixs_ulo?: string|null;
		/**Autogenerated.*/
		ixb_orig?: string|null;
		/**Autogenerated.*/
		pronom_id?: number|null;
		/**Autogenerated.*/
		je_ixs_ulo_pre?: number|null;
		/**Autogenerated.*/
		ixs_ulo_pre?: string|null;
		/**Autogenerated.*/
		soubor_pre?: string|null;
		/**Autogenerated.*/
		soubor_pri_pre?: string|null;
		/**Autogenerated.*/
		velikost_pre?: JsonDecimal|null;
		/**Autogenerated.*/
		priz_ro?: number|null;
		/**Autogenerated.*/
		je_in_sgn?: number|null;
		/**Autogenerated.*/
		je_in_cr?: number|null;
		/**Autogenerated.*/
		epk_cnt?: number|null;
		/**Autogenerated.*/
		m_vyber?: number|null;
		/**Autogenerated.*/
		m_err?: string|null;
		/**Autogenerated.*/
		stav_epx_zve?: number|null;
		/**Autogenerated.*/
		stav_ann?: number|null;
		/**Autogenerated.*/
		dat_mpd?: JsonDate|null;
	}
	const enum GPrilohaPisemnostiDtoNames { vyber_ixb = "vyber_ixb", ixp = "ixp", por_cislo = "por_cislo", obsah_text = "obsah_text", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", ixb = "ixb", aktivita = "aktivita", nazev_rf = "nazev_rf", pocet = "pocet", s_sgn = "s_sgn", typ_elp = "typ_elp", priz_elp = "priz_elp", ktg_typ_pri = "ktg_typ_pri", ktg_typ_pri_txt = "ktg_typ_pri_txt", soubor_pri = "soubor_pri", dop_konv_pdf = "dop_konv_pdf", kov_typ_soub = "kov_typ_soub", soubor = "soubor", velikost = "velikost", aktivita_wflsepx = "aktivita_wflsepx", aktivita_wflsixb = "aktivita_wflsixb", priz_arch_ver = "priz_arch_ver", priz_plat_ver = "priz_plat_ver", priz_check = "priz_check", ixs_fun_check = "ixs_fun_check", je_zver = "je_zver", je_zver_pos_ver = "je_zver_pos_ver", posl_dat_zver = "posl_dat_zver", ixs_ulo = "ixs_ulo", ixb_orig = "ixb_orig", pronom_id = "pronom_id", je_ixs_ulo_pre = "je_ixs_ulo_pre", ixs_ulo_pre = "ixs_ulo_pre", soubor_pre = "soubor_pre", soubor_pri_pre = "soubor_pri_pre", velikost_pre = "velikost_pre", priz_ro = "priz_ro", je_in_sgn = "je_in_sgn", je_in_cr = "je_in_cr", epk_cnt = "epk_cnt", m_vyber = "m_vyber", m_err = "m_err", stav_epx_zve = "stav_epx_zve", stav_ann = "stav_ann", dat_mpd = "dat_mpd",}
	const enum GPrilohaPisemnostiDtoFragments { vyber_ixb = "*", ixp = "*", por_cislo = "*", obsah_text = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", ixb = "*", aktivita = "*", nazev_rf = "*", pocet = "*", s_sgn = "*", typ_elp = "*", priz_elp = "*", ktg_typ_pri = "*", ktg_typ_pri_txt = "*", soubor_pri = "*", dop_konv_pdf = "*", kov_typ_soub = "*", soubor = "*", velikost = "*", aktivita_wflsepx = "*", aktivita_wflsixb = "*", priz_arch_ver = "*", priz_plat_ver = "*", priz_check = "*", ixs_fun_check = "*", je_zver = "*", je_zver_pos_ver = "*", posl_dat_zver = "*", ixs_ulo = "*", ixb_orig = "*", pronom_id = "*", je_ixs_ulo_pre = "*", ixs_ulo_pre = "*", soubor_pre = "*", soubor_pri_pre = "*", velikost_pre = "*", priz_ro = "*", je_in_sgn = "*", je_in_cr = "*", epk_cnt = "*", m_vyber = "*", m_err = "*", stav_epx_zve = "*", stav_ann = "*", dat_mpd = "*",}
	const enum GPrilohaPisemnostiDtoTypes { vyber_ixb = "boolean", ixp = "string", por_cislo = "number", obsah_text = "string", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", ixb = "string", aktivita = "number", nazev_rf = "string", pocet = "number", s_sgn = "number", typ_elp = "number", priz_elp = "number", ktg_typ_pri = "number", ktg_typ_pri_txt = "string", soubor_pri = "string", dop_konv_pdf = "number", kov_typ_soub = "string", soubor = "string", velikost = "JsonDecimal", aktivita_wflsepx = "number", aktivita_wflsixb = "number", priz_arch_ver = "number", priz_plat_ver = "number", priz_check = "number", ixs_fun_check = "string", je_zver = "number", je_zver_pos_ver = "number", posl_dat_zver = "JsonDate", ixs_ulo = "string", ixb_orig = "string", pronom_id = "number", je_ixs_ulo_pre = "number", ixs_ulo_pre = "string", soubor_pre = "string", soubor_pri_pre = "string", velikost_pre = "JsonDecimal", priz_ro = "number", je_in_sgn = "number", je_in_cr = "number", epk_cnt = "number", m_vyber = "number", m_err = "string", stav_epx_zve = "number", stav_ann = "number", dat_mpd = "JsonDate",}
	const enum GPrilohaPisemnostiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GSrvMethodCallInputDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GSrvMethodCallInputDto*/
	interface GSrvMethodCallInputDto {
		Skip?: ObjectLiteral<boolean>|null;
	}
	const enum GSrvMethodCallInputDtoNames { Skip = "Skip",}
	const enum GSrvMethodCallInputDtoFragments { Skip = "*",}
	const enum GSrvMethodCallInputDtoTypes { Skip = "ObjectLiteral<boolean>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GSrvMethodCallResultDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GSrvMethodCallResultDto*/
	interface GSrvMethodCallResultDto {
		State?: string|null;
		Message?: string|null;
		Question?: string|null;
		QuestionName?: string|null;
		MailSettings?: Gordic.Wfl.Interface.GWflMailSettingsDto|null;
		InputParams?: Gordic.Wfl.WebClient.GSrvMethodCallInputDto|null;
	}
	const enum GSrvMethodCallResultDtoNames { State = "State", Message = "Message", Question = "Question", QuestionName = "QuestionName", MailSettings = "MailSettings", InputParams = "InputParams",}
	const enum GSrvMethodCallResultDtoFragments { State = "*", Message = "*", Question = "*", QuestionName = "*", MailSettings = "*", InputParams = "*",}
	const enum GSrvMethodCallResultDtoTypes { State = "string", Message = "string", Question = "string", QuestionName = "string", MailSettings = "Gordic.Wfl.Interface.GWflMailSettingsDto", InputParams = "Gordic.Wfl.WebClient.GSrvMethodCallInputDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GWflMailStructDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GWflMailStructDto*/
	interface GWflMailStructDto {
		Row?: Gordic.Wfl.WebClient.GOdeslaniSeznamDto|null;
		/**email*/
		Email?: string|null;
		/**id ds*/
		IdDs?: string|null;
		/**utvar*/
		Utvar?: string|null;
		/**interní adresace*/
		IntAdresace?: string|null;
		/**ID DS odesilatele*/
		IdDsOdes?: string|null;
		/**Sxs*/
		readonly Sxs?: Gordic.Wfl.Interface.GSxs|null;
		/**Ixp*/
		readonly Ixp?: string|null;
		/**zpusob_dor*/
		readonly ZpDor?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		/**LicMail*/
		readonly LicMail?: string|null;
		/**PorCisloMail*/
		readonly PorCisloMail?: number|null;
	}
	const enum GWflMailStructDtoNames { Row = "Row", Email = "Email", IdDs = "IdDs", Utvar = "Utvar", IntAdresace = "IntAdresace", IdDsOdes = "IdDsOdes", Sxs = "Sxs", Ixp = "Ixp", ZpDor = "ZpDor", LicMail = "LicMail", PorCisloMail = "PorCisloMail",}
	const enum GWflMailStructDtoFragments { Row = "*", Email = "*", IdDs = "*", Utvar = "*", IntAdresace = "*", IdDsOdes = "*", Sxs = "*", Ixp = "*", ZpDor = "*", LicMail = "*", PorCisloMail = "*",}
	const enum GWflMailStructDtoTypes { Row = "Gordic.Wfl.WebClient.GOdeslaniSeznamDto", Email = "string", IdDs = "string", Utvar = "string", IntAdresace = "string", IdDsOdes = "string", Sxs = "Gordic.Wfl.Interface.GSxs", Ixp = "string", ZpDor = "Gordic.Ginis.DbModel.GWflczpdEnum", LicMail = "string", PorCisloMail = "number",}
	const enum GWflMailStructDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GZkontrolovatZasilkuProEPKInputDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Vstupní Dto pro kontrolu zásilek pro EPK.*/
	interface GZkontrolovatZasilkuProEPKInputDto {
		/**Identifikátor dokumentu.*/
		Ixp?: string|null;
		/**Zásilky ke kontrole.*/
		Zasilky?: Gordic.Wfl.WebClient.GOdeslaniSeznamDto[]|null;
	}
	const enum GZkontrolovatZasilkuProEPKInputDtoNames { Ixp = "Ixp", Zasilky = "Zasilky",}
	const enum GZkontrolovatZasilkuProEPKInputDtoFragments { Ixp = "*", Zasilky = "*",}
	const enum GZkontrolovatZasilkuProEPKInputDtoTypes { Ixp = "string", Zasilky = "Gordic.Wfl.WebClient.GOdeslaniSeznamDto[]",}
	const enum GZkontrolovatZasilkuProEPKInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Detail\Odeslani\Dto\GZkontrolovatZasilkuProEPKOutputDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Návratové Dto pro kontrolu zásilek pro EPK.*/
	interface GZkontrolovatZasilkuProEPKOutputDto {
		/**Příznak, zda kontrola proběhla úspěšně [true].*/
		IsSuccess?: boolean|null;
		/**Textový výsledek kontroly.*/
		Message?: string|null;
	}
	const enum GZkontrolovatZasilkuProEPKOutputDtoNames { IsSuccess = "IsSuccess", Message = "Message",}
	const enum GZkontrolovatZasilkuProEPKOutputDtoFragments { IsSuccess = "*", Message = "*",}
	const enum GZkontrolovatZasilkuProEPKOutputDtoTypes { IsSuccess = "boolean", Message = "string",}
	const enum GZkontrolovatZasilkuProEPKOutputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\DocasneUloziste\Dto\GDocasneUlozisteDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Dočasné uložíště*/
	interface GDocasneUlozisteDto {
		Ixp?: string|null;
		Vec?: string|null;
		TxtZodpFun?: string|null;
		FilterUmisteni?: string[]|null;
		PocetListu?: number|null;
		PocetListuZapujcka?: number|null;
		PocetPriloh?: number|null;
		TxtStav?: string|null;
		LzeOperUlo?: boolean|null;
		IsUserZodpFun?: boolean|null;
		StavDokumentu?: number|null;
		TxtPoznamka?: string|null;
		DatZapujcky?: JsonDate|null;
		DatVraceni?: JsonDate|null;
		DatVraceno?: JsonDate|null;
		SelectorFunKomuPujceno?: string|null;
		SelectorFunKomuPujcenoNazevRef?: string|null;
		OrigIxsUmi?: string|null;
		IxsUmi?: string|null;
		IxsUmiTxt?: string|null;
		IsUlozisteDocasne?: boolean|null;
		PovoleniZapujcky?: number|null;
		ProvedenaAkce?: Gordic.Wfl.WebClient.GDocasneUlozisteProvedenaAkceEnum|null;
		UmisteniTxt?: string|null;
		IxsFunAkt?: string|null;
		OrigPocListu?: number|null;
		OrigPocPriloh?: number|null;
		IxsSu?: string|null;
		IxsFunZodp?: string|null;
		PuvodniUloziste?: string|null;
	}
	const enum GDocasneUlozisteDtoNames { Ixp = "Ixp", Vec = "Vec", TxtZodpFun = "TxtZodpFun", FilterUmisteni = "FilterUmisteni", PocetListu = "PocetListu", PocetListuZapujcka = "PocetListuZapujcka", PocetPriloh = "PocetPriloh", TxtStav = "TxtStav", LzeOperUlo = "LzeOperUlo", IsUserZodpFun = "IsUserZodpFun", StavDokumentu = "StavDokumentu", TxtPoznamka = "TxtPoznamka", DatZapujcky = "DatZapujcky", DatVraceni = "DatVraceni", DatVraceno = "DatVraceno", SelectorFunKomuPujceno = "SelectorFunKomuPujceno", SelectorFunKomuPujcenoNazevRef = "SelectorFunKomuPujcenoNazevRef", OrigIxsUmi = "OrigIxsUmi", IxsUmi = "IxsUmi", IxsUmiTxt = "IxsUmiTxt", IsUlozisteDocasne = "IsUlozisteDocasne", PovoleniZapujcky = "PovoleniZapujcky", ProvedenaAkce = "ProvedenaAkce", UmisteniTxt = "UmisteniTxt", IxsFunAkt = "IxsFunAkt", OrigPocListu = "OrigPocListu", OrigPocPriloh = "OrigPocPriloh", IxsSu = "IxsSu", IxsFunZodp = "IxsFunZodp", PuvodniUloziste = "PuvodniUloziste",}
	const enum GDocasneUlozisteDtoFragments { Ixp = "*", Vec = "*", TxtZodpFun = "*", FilterUmisteni = "*", PocetListu = "*", PocetListuZapujcka = "*", PocetPriloh = "*", TxtStav = "*", LzeOperUlo = "*", IsUserZodpFun = "*", StavDokumentu = "*", TxtPoznamka = "*", DatZapujcky = "*", DatVraceni = "*", DatVraceno = "*", SelectorFunKomuPujceno = "*", SelectorFunKomuPujcenoNazevRef = "*", OrigIxsUmi = "*", IxsUmi = "*", IxsUmiTxt = "*", IsUlozisteDocasne = "*", PovoleniZapujcky = "*", ProvedenaAkce = "*", UmisteniTxt = "*", IxsFunAkt = "*", OrigPocListu = "*", OrigPocPriloh = "*", IxsSu = "*", IxsFunZodp = "*", PuvodniUloziste = "*",}
	const enum GDocasneUlozisteDtoTypes { Ixp = "string", Vec = "string", TxtZodpFun = "string", FilterUmisteni = "string[]", PocetListu = "number", PocetListuZapujcka = "number", PocetPriloh = "number", TxtStav = "string", LzeOperUlo = "boolean", IsUserZodpFun = "boolean", StavDokumentu = "number", TxtPoznamka = "string", DatZapujcky = "JsonDate", DatVraceni = "JsonDate", DatVraceno = "JsonDate", SelectorFunKomuPujceno = "string", SelectorFunKomuPujcenoNazevRef = "string", OrigIxsUmi = "string", IxsUmi = "string", IxsUmiTxt = "string", IsUlozisteDocasne = "boolean", PovoleniZapujcky = "number", ProvedenaAkce = "Gordic.Wfl.WebClient.GDocasneUlozisteProvedenaAkceEnum", UmisteniTxt = "string", IxsFunAkt = "string", OrigPocListu = "number", OrigPocPriloh = "number", IxsSu = "string", IxsFunZodp = "string", PuvodniUloziste = "string",}
	const enum GDocasneUlozisteDtoTypeLengths {}
	const enum GDocasneUlozisteProvedenaAkceEnum {
		Neurceno=0,
		Zapujcit=1,
		Vratit=2,
		Vyjmout=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Dto\GWflDBParams.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**WFL parametry do JS*/
	interface GWflDBParams {
		/**ssl_pockop_sk*/
		gin_ftxhlevyr?: number|null;
		/**gin_ele_typsoub*/
		gin_ele_typsoub?: string|null;
		/**gin_ele_typsou2*/
		gin_ele_typsou2?: string|null;
		/**ginEleTypSoubPar*/
		ginEleTypSoubPar?: string|null;
		/**gin_ele_nepozn*/
		gin_ele_nepozn?: string|null;
		/**gin_ele_spisele*/
		gin_ele_spisele?: number|null;
		/**gin_ele_velsmax*/
		gin_ele_velsmax?: string|null;
		/**ginEleVelsmaxFormated*/
		ginEleVelsmaxFormated?: string|null;
		/**gin_n23_vecsk*/
		gin_n23_vecsk?: number|null;
		/**gin_sgn_samoraz*/
		gin_sgn_samoraz?: number|null;
		/**ssl_pockop_sk*/
		wfl_pristupypri?: number|null;
		/**ssl_textplistu*/
		ssl_textplistu?: string|null;
		/**ssl_listupriloh*/
		ssl_listupriloh?: string|null;
		/**ssl_pockop_sk*/
		ssl_pockop_sk?: string|null;
		/**ssl_pockop_sk*/
		ssl_povin_poctu?: number|null;
		/**ssl_filtr_dok - GIN/SSL - Filtr dokumentů (všechny, výběr agend, pouze spisovkové)*/
		ssl_filtr_dok?: number|null;
		/**Gets or sets the spisova znacka text.*/
		SpisovaZnackaShortText?: string|null;
		/**Gets or sets the spisova znacka text.
		*     ssl_text_az
		*/
		SpisovaZnackaText?: string|null;
		/**Gets or sets the cislo jednaci text.*/
		CisloJednaciShortText?: string|null;
		/**Gets or sets the cislo jednaci text.*/
		CisloJednaciText?: string|null;
		/**usu_show_su*/
		usu_predani?: number|null;
		/**usu_show_su*/
		usu_show_su?: number|null;
		/**usu_rad_sfuview*/
		usu_rad_sfuview?: number|null;
		/**Indikace že jde o ukrajinu*/
		IsUkraine?: boolean|null;
		/**Proxy service*/
		ProxyService?: string|null;
		/**CA servers*/
		CaServers?: string|null;
		/**SSL - Zobrazení náhledu el. obrazu na detailu dokumentu*/
		ssl_zodetelo?: number|null;
		/**gin_poc_priloa*/
		gin_poc_priloa?: number|null;
		/**ssl_pridel_prpo*/
		ssl_pridel_prpo?: number|null;
		/**gin_rad_konao*/
		gin_rad_konao?: number|null;
		/**ssl_cj_pridel*/
		ssl_cj_pridel?: number|null;
		/**gin_upsr_povol*/
		gin_upsr_povol?: number|null;
		/**usu_pod_cizi*/
		usu_pod_cizi?: number|null;
		/**Příznak režimu utajení*/
		PrizRezimUtaj?: boolean|null;
		/**SSL - Povinnost vyplnění spisového plánu a znaku na dokumentu*/
		ssl_povin_spzn?: number|null;
		/**GIN ODES - Nabídnout k odeslání i poslední verzi před konverzí.*/
		gin_odes_verze?: number|null;
		/**Při vložení do spisu nabídnout u řízeného přísupu převzetí práv IRP*/
		gin_ssl_vlopirp?: number|null;
		/**gin_n23_pod*/
		gin_n23_pod?: number|null;
		/**gin_esu_n23ao*/
		gin_esu_n23ao?: number|null;
		/**asyncOperaceSTempTabulkami*/
		asyncOperaceSTempTabulkami?: boolean|null;
	}
	const enum GWflDBParamsNames { gin_ftxhlevyr = "gin_ftxhlevyr", gin_ele_typsoub = "gin_ele_typsoub", gin_ele_typsou2 = "gin_ele_typsou2", ginEleTypSoubPar = "ginEleTypSoubPar", gin_ele_nepozn = "gin_ele_nepozn", gin_ele_spisele = "gin_ele_spisele", gin_ele_velsmax = "gin_ele_velsmax", ginEleVelsmaxFormated = "ginEleVelsmaxFormated", gin_n23_vecsk = "gin_n23_vecsk", gin_sgn_samoraz = "gin_sgn_samoraz", wfl_pristupypri = "wfl_pristupypri", ssl_textplistu = "ssl_textplistu", ssl_listupriloh = "ssl_listupriloh", ssl_pockop_sk = "ssl_pockop_sk", ssl_povin_poctu = "ssl_povin_poctu", ssl_filtr_dok = "ssl_filtr_dok", SpisovaZnackaShortText = "SpisovaZnackaShortText", SpisovaZnackaText = "SpisovaZnackaText", CisloJednaciShortText = "CisloJednaciShortText", CisloJednaciText = "CisloJednaciText", usu_predani = "usu_predani", usu_show_su = "usu_show_su", usu_rad_sfuview = "usu_rad_sfuview", IsUkraine = "IsUkraine", ProxyService = "ProxyService", CaServers = "CaServers", ssl_zodetelo = "ssl_zodetelo", gin_poc_priloa = "gin_poc_priloa", ssl_pridel_prpo = "ssl_pridel_prpo", gin_rad_konao = "gin_rad_konao", ssl_cj_pridel = "ssl_cj_pridel", gin_upsr_povol = "gin_upsr_povol", usu_pod_cizi = "usu_pod_cizi", PrizRezimUtaj = "PrizRezimUtaj", ssl_povin_spzn = "ssl_povin_spzn", gin_odes_verze = "gin_odes_verze", gin_ssl_vlopirp = "gin_ssl_vlopirp", gin_n23_pod = "gin_n23_pod", gin_esu_n23ao = "gin_esu_n23ao", asyncOperaceSTempTabulkami = "asyncOperaceSTempTabulkami",}
	const enum GWflDBParamsFragments { gin_ftxhlevyr = "*", gin_ele_typsoub = "*", gin_ele_typsou2 = "*", ginEleTypSoubPar = "*", gin_ele_nepozn = "*", gin_ele_spisele = "*", gin_ele_velsmax = "*", ginEleVelsmaxFormated = "*", gin_n23_vecsk = "*", gin_sgn_samoraz = "*", wfl_pristupypri = "*", ssl_textplistu = "*", ssl_listupriloh = "*", ssl_pockop_sk = "*", ssl_povin_poctu = "*", ssl_filtr_dok = "*", SpisovaZnackaShortText = "*", SpisovaZnackaText = "*", CisloJednaciShortText = "*", CisloJednaciText = "*", usu_predani = "*", usu_show_su = "*", usu_rad_sfuview = "*", IsUkraine = "*", ProxyService = "*", CaServers = "*", ssl_zodetelo = "*", gin_poc_priloa = "*", ssl_pridel_prpo = "*", gin_rad_konao = "*", ssl_cj_pridel = "*", gin_upsr_povol = "*", usu_pod_cizi = "*", PrizRezimUtaj = "*", ssl_povin_spzn = "*", gin_odes_verze = "*", gin_ssl_vlopirp = "*", gin_n23_pod = "*", gin_esu_n23ao = "*", asyncOperaceSTempTabulkami = "*",}
	const enum GWflDBParamsTypes { gin_ftxhlevyr = "number", gin_ele_typsoub = "string", gin_ele_typsou2 = "string", ginEleTypSoubPar = "string", gin_ele_nepozn = "string", gin_ele_spisele = "number", gin_ele_velsmax = "string", ginEleVelsmaxFormated = "string", gin_n23_vecsk = "number", gin_sgn_samoraz = "number", wfl_pristupypri = "number", ssl_textplistu = "string", ssl_listupriloh = "string", ssl_pockop_sk = "string", ssl_povin_poctu = "number", ssl_filtr_dok = "number", SpisovaZnackaShortText = "string", SpisovaZnackaText = "string", CisloJednaciShortText = "string", CisloJednaciText = "string", usu_predani = "number", usu_show_su = "number", usu_rad_sfuview = "number", IsUkraine = "boolean", ProxyService = "string", CaServers = "string", ssl_zodetelo = "number", gin_poc_priloa = "number", ssl_pridel_prpo = "number", gin_rad_konao = "number", ssl_cj_pridel = "number", gin_upsr_povol = "number", usu_pod_cizi = "number", PrizRezimUtaj = "boolean", ssl_povin_spzn = "number", gin_odes_verze = "number", gin_ssl_vlopirp = "number", gin_n23_pod = "number", gin_esu_n23ao = "number", asyncOperaceSTempTabulkami = "boolean",}
	const enum GWflDBParamsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Predani\Dto\PrimePredaniDokumentuDlg.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**tyo primeho prideleni*/
	const enum TypPredaniPrimePredaniDokumentuDlg {
        /**The hromadne*/
		Hromadne//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**The dokument*/
		Dokument//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
        /**The spis*/
		Spis//Error generating initializer: System.NullReferenceException: Object reference not set to an instance of an object.

			//   at Gordic.Develop.GTypeScriptGenerator.HandleFilterEnum(INamedTypeSymbol cls, String enumName, INamedTypeSymbol openSymbol)
,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Prilohy\GAttachmentDtos.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GAttachmentConversionResultDto {
		conversionFile?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
		hasTextLayer?: boolean|null;
	}
	const enum GAttachmentConversionResultDtoNames { conversionFile = "conversionFile", hasTextLayer = "hasTextLayer",}
	const enum GAttachmentConversionResultDtoFragments { conversionFile = "*", hasTextLayer = "*",}
	const enum GAttachmentConversionResultDtoTypes { conversionFile = "Gordic.General.ApplicationInterface.GFileInfoDto", hasTextLayer = "boolean",}
	const enum GAttachmentConversionResultDtoTypeLengths {}
	/**Dto s informacemi o nastavení pole pro přístup v uploadovacím dialogu*/
	interface GAttachmentPristupInfoDto {
		stUtajFilter?: GBaseFilter<number>|null;
		wflPristupyPri?: number|null;
		prizRezimUtaj?: boolean|null;
		defaultStUtajId?: number|null;
	}
	const enum GAttachmentPristupInfoDtoNames { stUtajFilter = "stUtajFilter", wflPristupyPri = "wflPristupyPri", prizRezimUtaj = "prizRezimUtaj", defaultStUtajId = "defaultStUtajId",}
	const enum GAttachmentPristupInfoDtoFragments { stUtajFilter = "*", wflPristupyPri = "*", prizRezimUtaj = "*", defaultStUtajId = "*",}
	const enum GAttachmentPristupInfoDtoTypes { stUtajFilter = "GBaseFilter<number>", wflPristupyPri = "number", prizRezimUtaj = "boolean", defaultStUtajId = "number",}
	const enum GAttachmentPristupInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Prilohy\GAttachmentPermissionsEnum.d.ts 

declare const enum GAttachmentPermissionsEnum {
    /// <summary>
    /// V�echna opr�vn�n� jsou odep�ena.
    /// </summary>
    None = 0x0,
    /// <summary>
    /// Povolen� anonymizovat dokument el. p��lohy.
    /// </summary>
    Anonymize = 0x1,
    /// <summary>
    /// Povolen� smazat dokument nebo jeho el. p��lohu.
    /// </summary>
    Remove = 0x2,
    /// <summary>
    /// Povolen� p�ejmenovat p��lohu.
    /// </summary>
    Rename = 0x4,
    /// <summary>
    /// Povolen� zneaktivnit p��lohu.
    /// </summary>
    Deactivate = 0x8,
    /// <summary>
    /// Povolen� tisknout seznam sestavou GRR
    /// </summary>
    PrintGrr = 0x10, 
    /// <summary>
    /// P��znak lze vlo�it el. dokument nebo p�idat dal�� verzi el. dokumentu.
    /// </summary>
    AddElDokument = 0x20,
    /// <summary>
    /// P��znak lze vlo�it el. dokument s konverz�.
    /// </summary>
    AddElDokumentSKonverzi = 0x40,
    /// <summary>
    /// P��znak lze proch�zet a tisknout.
    /// </summary>
    Open = 0x80,
    /// <summary>
    /// P��znak lze proch�zet el. dokumenty v�. informac� o zve�ejn�n�.
    /// </summary>
    OpenElDokumenty = 0x100,
    /// <summary>
    /// P��znak lze zve�ejnit.
    /// </summary>
    Publish = 0x200,
    /// <summary>
    /// P��znak lze zve�ejnit na ��edn� desku.
    /// </summary>
    PublishOnUredniDeska = 0x400,
    /// <summary>
    /// P��znak lze verifikovat el. dokument.
    /// </summary>
    Verify = 0x800,
    /// <summary>
    /// P��znak lze konvertovat do PDF.
    /// </summary>
    ConvertToPDF = 0x1000,
    /// <summary>
    /// P��znak lze konvertovat do PDF s dolo�kou.
    /// </summary>
    ConvertToPDFSDolozkou = 0x2000,
    /// <summary>
    /// P��znak lze podepsat el. dokument.
    /// </summary>
    Sign = 0x4000,
    /// <summary>
    /// P��znak lze prov�st anal�zu OCR.
    /// </summary>
    OCR = 0x8000,
    /// <summary>
    /// P��znak lze editovat
    /// </summary>
    Edit = 0x100000,
    /// <summary>
    /// P��znak lze otevrit a uzamknout
    /// </summary>
    OpenAndLock = 0x200000,
    /// <summary>
    /// P��znak lze odemknout
    /// </summary>
    Unlock = 0x400000,
    /// <summary>
    /// P��znak lze oznacit prilohu jako el. obraz
    /// </summary>
    MarkAsFavorite = 0x800000,
    /// <summary>
    /// P��znak lze zamenit prilohu za el. obraz 
    /// </summary>
    ExchangeFavorite = 0x1000000,
    /// <summary>
    /// Povolen� smazat el. p��lohu.
    /// </summary>
    RemoveEle = 0x2000000,
    /// <summary>
    /// Povolen� zneaktivnit el. p��lohu.
    /// </summary>
    DeactivateEle = 0x4000000,
    /// <summary>
    /// Povoleni vlo�it neelektronickou prilohu
    /// </summary>
    AddAttachment = 0x8000000,
    /// <summary>
    /// Povoleni oznaceni ke zverejneni
    /// </summary>
    PublishSelect = 0x10000000,
    /// <summary>
    /// Povoleni odznaceni ke zverejneni
    /// </summary>
    PublishUnSelect = 0x20000000,
    /// <summary>
    /// Povoleni odznaceni nezverejnovat
    /// </summary>
    MarkUnPublish = 0x40000000,
    /// <summary>
    /// Povoleni oznaceni k podpisu v EPK
    /// </summary>
    MarkForEpk = 0x80000000,
    /// <summary>
    /// Povoleni stazeni vsech priloh, vcetne obrazu
    /// </summary>
    DownloadAll = 0x100000000
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Prilohy\gwflfilepreview.d.ts 


declare namespace Gordic.Wfl.FilePreview {
    /**
     * Options for WFL FilePreview server loading.
     * 
     * @author Vlastimil Máca
     * @since 482.1.0.332
     */
    interface IGServerFileLoadOptions {
        conversion?: boolean
        cacheConversion?: boolean
        forceNew?:boolean
    }

    /**
     * Function, which prepares object for gfilePreview("displayFromServer") method. Loads elDoc preview
     * 
     * @author Vlastimil Máca
     * @since 482.1.0.332
     * @param {string} ixp
     * @param {number} [verze]
     * @param {IGServerFileLoadOptions} [opts]
     * @returns {IGFilePreviewLoadOptions}
     */
    function displayElDoc(ixp: string, verze?: number, opts?: IGServerFileLoadOptions): IGFilePreviewLoadOptions;

    /**
     * function displayTempFile
     * 
     * @author Vlastimil Máca
     * 
     * @param {string} guid
     * @param {GContent} parentContent
     * @returns {IGFilePreviewLoadOptions}
     */
    function displayTempFile(guid: string, parentContent:GContent): IGFilePreviewLoadOptions;


    /**
     * Function, which prepares object for gfilePreview("displayFromServer") method. Loads attachment preview
     * 
     * @author Vlastimil Máca
     * @since 482.1.0.332
     * 
     * @param {string} ixp
     * @param {number} por_cislo
     * @param {number} [verze]
     * @param {IGServerFileLoadOptions} [opts]
     * @returns {IGFilePreviewLoadOptions}
     */
    function displayAttachment(ixp: string, por_cislo: number, verze?: number, opts?: IGServerFileLoadOptions): IGFilePreviewLoadOptions;

    /**
    * Function, which prepares object for gfilePreview("displayFromServer") method. Loads attachment preview (by ixb key)
     *
     * @author Vlastimil Máca
     * @since 482.1.0.332
     * 
     * @param {string} ixp
     * @param {string} ixb
     * @param {number} [verze]
     * @param {IGServerFileLoadOptions} [opts]
     * @returns {IGFilePreviewLoadOptions}
     */
    function displayAttachmentIxb(ixp: string, ixb: string, verze?: number, opts?: IGServerFileLoadOptions): IGFilePreviewLoadOptions;

    /**
    * Function, which prepares object for gfilePreview("displayFromServer") method. Loads attachment preview (by ixb key)
     *
     * @author Vlastimil Máca
     * @since 482.1.0.332
     * 
     * @param {string} ixp
     * @param {string} ixsUlo
     * @param {IGServerFileLoadOptions} [opts]
     * @returns {IGFilePreviewLoadOptions}
     */
    function displayIxsUlo(ixp: string, ixsUlo: string, opts?: IGServerFileLoadOptions): IGFilePreviewLoadOptions;

    /**
     * Function, which prepares object for gfilePreview("displayFromServer") method. Loads dorucenka preview
     *
     * @param {string} sxs
     * @param {string} ixb
     * @param {IGServerFileLoadOptions} [opts]
     * @returns {IGFilePreviewLoadOptions}
     */
    function displayDorucenka(sxs, ixb, opts?: IGServerFileLoadOptions): IGFilePreviewLoadOptions;
}

interface JQuery {
  /**
   * OBSOLETE!!! Použijte prosím .gfilepreview a volání .gfilepreview("displayFromServer" + prefaby z Gordic.Wfl.FilePreview)
   * @deprecated Použijte prosím .gfilepreview a volání .gfilepreview("displayFromServer" + prefaby z Gordic.Wfl.FilePreview)
   * @param {GFilePreviewOptions} [options]
   * @returns {JQuery}
   */
    gwflfilepreview(options?: GFilePreviewOptions): JQuery;

  /**
   * OBSOLETE!!! Použijte prosím .gfilepreview a .gfilepreview("displayFromServer", Gordic.Wfl.FilePreview.displayAttachmentIxb(ixp,ixb))
   * @deprecated Použijte prosím .gfilepreview a .gfilepreview("displayFromServer", Gordic.Wfl.FilePreview.displayAttachmentIxb(ixp,ixb))
   * @param {"displayAttachmentIxb"} method
   * @param {string} ixp
   * @param {string} ixb
   * @param {number} [verze]
   * @param {boolean} [forceNew]
   * @returns {JQuery}
   */
    gwflfilepreview(method: "displayAttachmentIxb", ixp: string, ixb: string, verze?: number, forceNew?: boolean): JQuery;
  /**
   * OBSOLETE!!! Použijte prosím .gfilepreview a .gfilepreview("displayFromServer", Gordic.Wfl.FilePreview.displayAttachment(ixp,por_cislo))
   * @deprecated Použijte prosím .gfilepreview a .gfilepreview("displayFromServer", Gordic.Wfl.FilePreview.displayAttachment(ixp,por_cislo))    
   * @param {"displayAttachment"} method
   * @param {string} ixp
   * @param {number} por_cislo
   * @param {number} [verze]
   * @param {boolean} [forceNew]
   * @returns {JQuery}
   */
    gwflfilepreview(method: "displayAttachment", ixp: string, por_cislo: number, verze?: number, forceNew?: boolean): JQuery;
    /**
    * OBSOLETE!!! Použijte prosím .gfilepreview a .gfilepreview("displayFromServer", Gordic.Wfl.FilePreview.displayElDoc(ixp,verze))
    * @deprecated Použijte prosím .gfilepreview a .gfilepreview("displayFromServer", Gordic.Wfl.FilePreview.displayElDoc(ixp,verze))
    * @param {"displayAttachment"} method
    * @param {string} ixp
    * @param {number} por_cislo
    * @param {number} [verze]
    * @param {boolean} [forceNew]
    * @returns {JQuery}
    */
    gwflfilepreview(method: "displayElDoc", ixp: string, verze?: number, forceNew?: boolean): JQuery;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Prilohy\Dto\GAttachmentOpeningParamsDto.d.ts 

declare namespace Gordic.Wfl.WebClient.Prilohy {
	/**Dto k otevirani přílohy*/
	interface GAttachmentOpeningParamsDto {
		/**DuvodOtevreniRequired*/
		DuvodOtevreniRequired?: boolean|null;
		/**ZeoDirectDownload*/
		ZeoDirectDownload?: boolean|null;
	}
	const enum GAttachmentOpeningParamsDtoNames { DuvodOtevreniRequired = "DuvodOtevreniRequired", ZeoDirectDownload = "ZeoDirectDownload",}
	const enum GAttachmentOpeningParamsDtoFragments { DuvodOtevreniRequired = "*", ZeoDirectDownload = "*",}
	const enum GAttachmentOpeningParamsDtoTypes { DuvodOtevreniRequired = "boolean", ZeoDirectDownload = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\SignModule\Dto\GElObrazFileNameDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**Výčet stavů pro vrácený výsledek*/
	const enum ResultInfo {
        /**el obraz nenalezen*/
		elObrazNotFound,
        /**Chyba při konverzi*/
		convertError,
        /**úspěch*/
		success,
	}
    /**DTO s informacemi názvu souboru, identifikátoru a výsledku získání názvu souboru*/
	interface GElObrazFileNameDto {
        /**Identifikátor*/
		newIxp?: string|null;
        /**Název souboru*/
		newFileName?: string|null;
        /**Informace o výyledku*/
		resultInfo?: Gordic.Wfl.WebClient.ResultInfo|null;
        /**Příznak, zda podepisovat el.obraz*/
		signElObraz?: boolean|null;
        /**Obsah souboru - identifikator*/
		fileGuid?: string|null;
        /**Koncovka souboru*/
		fileExtension?: string|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\SignModule\Dto\GFileContentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Základní třída pro převod informací při stahování a nahrávání příloh*/
	interface GInfoBaseDto {
		/**Přínak, že se jedná o el.obraz*/
		isFavorite?: boolean|null;
		/**Ixp*/
		ixp?: string|null;
		/**Lic*/
		sxs?: string|null;
		/**Ixp*/
		ixb?: string|null;
	}
	const enum GInfoBaseDtoNames { isFavorite = "isFavorite", ixp = "ixp", sxs = "sxs", ixb = "ixb",}
	const enum GInfoBaseDtoFragments { isFavorite = "*", ixp = "*", sxs = "*", ixb = "*",}
	const enum GInfoBaseDtoTypes { isFavorite = "boolean", ixp = "string", sxs = "string", ixb = "string",}
	const enum GInfoBaseDtoTypeLengths {}
	/**Převod informací při stahování příloh*/
	interface GDownloadInfoDto extends Gordic.Wfl.WebClient.GInfoBaseDto {
		savingEnabled?: boolean|null;
		duvodOEle?: string|null;
		uzamknout?: boolean|null;
		fileName?: string|null;
		verze?: number|null;
		extKonRak?: boolean|null;
	}
	const enum GDownloadInfoDtoNames { savingEnabled = "savingEnabled", duvodOEle = "duvodOEle", uzamknout = "uzamknout", fileName = "fileName", verze = "verze", extKonRak = "extKonRak", isFavorite = "isFavorite", ixp = "ixp", sxs = "sxs", ixb = "ixb",}
	const enum GDownloadInfoDtoFragments { savingEnabled = "*", duvodOEle = "*", uzamknout = "*", fileName = "*", verze = "*", extKonRak = "*", isFavorite = "*", ixp = "*", sxs = "*", ixb = "*",}
	const enum GDownloadInfoDtoTypes { savingEnabled = "boolean", duvodOEle = "string", uzamknout = "boolean", fileName = "string", verze = "number", extKonRak = "boolean", isFavorite = "boolean", ixp = "string", sxs = "string", ixb = "string",}
	const enum GDownloadInfoDtoTypeLengths {}
	/**Převod informací při stahování příloh*/
	interface GUploadInfoDto extends Gordic.Wfl.WebClient.GInfoBaseDto {
		verze?: number|null;
		porCislo?: number|null;
		statusLock?: number|null;
		nazev?: string|null;
		fileName?: string|null;
		ts?: boolean|null;
		pDopodepsani?: boolean|null;
		typeTs?: number|null;
		typeSign?: number|null;
		signature?: string|null;
		timestamp?: string|null;
	}
	const enum GUploadInfoDtoNames { verze = "verze", porCislo = "porCislo", statusLock = "statusLock", nazev = "nazev", fileName = "fileName", ts = "ts", pDopodepsani = "pDopodepsani", typeTs = "typeTs", typeSign = "typeSign", signature = "signature", timestamp = "timestamp", isFavorite = "isFavorite", ixp = "ixp", sxs = "sxs", ixb = "ixb",}
	const enum GUploadInfoDtoFragments { verze = "*", porCislo = "*", statusLock = "*", nazev = "*", fileName = "*", ts = "*", pDopodepsani = "*", typeTs = "*", typeSign = "*", signature = "*", timestamp = "*", isFavorite = "*", ixp = "*", sxs = "*", ixb = "*",}
	const enum GUploadInfoDtoTypes { verze = "number", porCislo = "number", statusLock = "number", nazev = "string", fileName = "string", ts = "boolean", pDopodepsani = "boolean", typeTs = "number", typeSign = "number", signature = "string", timestamp = "string", isFavorite = "boolean", ixp = "string", sxs = "string", ixb = "string",}
	const enum GUploadInfoDtoTypeLengths {}
	/**Dto s informacemi o souboru - použito na upload klientského souboru při podepisování serverovým certifikátem*/
	interface GFileContentDto {
		/**Obsah*/
		content?: string|null;
		/**Cesta*/
		path?: string|null;
	}
	const enum GFileContentDtoNames { content = "content", path = "path",}
	const enum GFileContentDtoFragments { content = "*", path = "*",}
	const enum GFileContentDtoTypes { content = "string", path = "string",}
	const enum GFileContentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\SignModule\Dto\GSignatureResultDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Předek DTO pro přenos výsledku kompletace*/
	interface GSignatureResultDtoBase {
		/**Příznak, jestli volání dopadlo s chybou*/
		hasError: boolean;
		/**Chybová hláška*/
		errorMsg?: string|null;
		/**Chybová hláška - vice info*/
		longErrorMsg?: string|null;
	}
	const enum GSignatureResultDtoBaseNames { hasError = "hasError", errorMsg = "errorMsg", longErrorMsg = "longErrorMsg",}
	const enum GSignatureResultDtoBaseFragments { hasError = "*", errorMsg = "*", longErrorMsg = "*",}
	const enum GSignatureResultDtoBaseTypes { hasError = "boolean", errorMsg = "string", longErrorMsg = "string",}
	const enum GSignatureResultDtoBaseTypeLengths {}
	/**Dto pro přenos výsledku kompletace*/
	interface GSignatureResultDto extends Gordic.Wfl.WebClient.GSignatureResultDtoBase {
		/**Konfigurace podpisu*/
		signatureConfig?: Gordic.Wfl.Interface.GWflSignCreateConfig|null;
	}
	const enum GSignatureResultDtoNames { signatureConfig = "signatureConfig", hasError = "hasError", errorMsg = "errorMsg", longErrorMsg = "longErrorMsg",}
	const enum GSignatureResultDtoFragments { signatureConfig = "*", hasError = "*", errorMsg = "*", longErrorMsg = "*",}
	const enum GSignatureResultDtoTypes { signatureConfig = "Gordic.Wfl.Interface.GWflSignCreateConfig", hasError = "boolean", errorMsg = "string", longErrorMsg = "string",}
	const enum GSignatureResultDtoTypeLengths {}
	/**Dto pro přenos výsledku kompletace EPK podpisu*/
	interface GSignatureResultWithGuidDto extends Gordic.Wfl.WebClient.GSignatureResultDtoBase {
		/**Guid souboru*/
		guid: string;
	}
	const enum GSignatureResultWithGuidDtoNames { guid = "guid", hasError = "hasError", errorMsg = "errorMsg", longErrorMsg = "longErrorMsg",}
	const enum GSignatureResultWithGuidDtoFragments { guid = "*", hasError = "*", errorMsg = "*", longErrorMsg = "*",}
	const enum GSignatureResultWithGuidDtoTypes { guid = "string", hasError = "boolean", errorMsg = "string", longErrorMsg = "string",}
	const enum GSignatureResultWithGuidDtoTypeLengths {}
	/**Dto pro přenos výsledku kompletace EPK podpisu s příznakem, zda došlo k podepsání na serveru*/
	interface GSignWithGuidDto extends Gordic.Wfl.WebClient.GSignatureResultWithGuidDto {
		/**Priznak podepsani*/
		signed: boolean;
	}
	const enum GSignWithGuidDtoNames { signed = "signed", guid = "guid", hasError = "hasError", errorMsg = "errorMsg", longErrorMsg = "longErrorMsg",}
	const enum GSignWithGuidDtoFragments { signed = "*", guid = "*", hasError = "*", errorMsg = "*", longErrorMsg = "*",}
	const enum GSignWithGuidDtoTypes { signed = "boolean", guid = "string", hasError = "boolean", errorMsg = "string", longErrorMsg = "string",}
	const enum GSignWithGuidDtoTypeLengths {}
	/**Dto pro přenos informací o výsledku kompletace EPK podpisu*/
	interface GSignatureResultDtoWithGuids extends Gordic.Wfl.WebClient.GSignatureResultWithGuidDto {
		/**Guid souboru pro externi podpis*/
		externalSignatureGuid?: string|null;
		/**Guid souboru pro externi cas. razitko*/
		externalTimestampGuid?: string|null;
		/**Název souboru*/
		fileName?: string|null;
	}
	const enum GSignatureResultDtoWithGuidsNames { externalSignatureGuid = "externalSignatureGuid", externalTimestampGuid = "externalTimestampGuid", fileName = "fileName", guid = "guid", hasError = "hasError", errorMsg = "errorMsg", longErrorMsg = "longErrorMsg",}
	const enum GSignatureResultDtoWithGuidsFragments { externalSignatureGuid = "*", externalTimestampGuid = "*", fileName = "*", guid = "*", hasError = "*", errorMsg = "*", longErrorMsg = "*",}
	const enum GSignatureResultDtoWithGuidsTypes { externalSignatureGuid = "string", externalTimestampGuid = "string", fileName = "string", guid = "string", hasError = "boolean", errorMsg = "string", longErrorMsg = "string",}
	const enum GSignatureResultDtoWithGuidsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\SouvisejiciDokumenty\Dto\GSeznamSouvisejicichDokumentuDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**Dto eznamu souvysejicich dokumentu*/
    interface GSeznamSouvysejicichDokumentuDto {
        /**Autogenerated.*/
        typ_vpp?: number|null;
        /**Autogenerated.*/
        ixp_1?: string|null;
        /**Autogenerated.*/
        ixp_2?: string|null;
        /**Autogenerated.*/
        aktivita?: number|null;
        /**Autogenerated.*/
        dat_od?: JsonDate|null;
        /**Autogenerated.*/
        poznamka?: string|null;
        /**Autogenerated.*/
        typ_ag?: number|null;
        /**Autogenerated.*/
        typ_ag_txt?: string|null;
        /**Autogenerated.*/
        zkr_ag?: string|null;
        /**Autogenerated.*/
        nazev_rf?: string|null;
        /**Autogenerated.*/
        dat_zmena?: JsonDate|null;
        /**Autogenerated.*/
        nazev?: string|null;
        /**Autogenerated.*/
        s_ele?: number|null;
        /**Autogenerated.*/
        s_sgn?: number|null;
        /**Autogenerated.*/
        s_fyz?: number|null;
        /**Autogenerated.*/
        typ_ag_doc?: number|null;
        /**Autogenerated.*/
        puvod?: number|null;
        /**Autogenerated.*/
        s_prij?: number|null;
        /**Autogenerated.*/
        stav_pis?: number|null;
        /**Autogenerated.*/
        typ_ag_doc_txt?: string|null;
        /**Autogenerated.*/
        zmenu_prov?: string|null;
        /**Autogenerated.*/
        akt_znacka?: string|null;
        /**Autogenerated.*/
        priz_spis?: number|null;
        /**Autogenerated.*/
        ixs_typ?: string|null;
        /**Autogenerated.*/
        nazev_typ?: string|null;
        /**Autogenerated.*/
        smer?: string|null;
        /**Autogenerated.*/
        ixp_vis?: string|null;
        /**Autogenerated.*/
        stav_dist?: string|null;
        /**Autogenerated.*/
        ixs_fun?: string|null;
        /**Autogenerated.*/
        priz_epk?: number|null;
        /**Autogenerated.*/
        el_bitmap?: number|null;
        /**Autogenerated.*/
        typ_entity_ico?: number|null;
        /**Autogenerated.*/
        vlastnictvi_doruceni_ico?: number|null;
        /**Autogenerated.*/
        technicke_vlastnosti_ico?: number|null;
        /**Autogenerated.*/
        stav_zpracovani_ico?: number|null;
        /**Autogenerated.*/
        s_schval?: number|null;
        /**Autogenerated.*/
        stav_pis_bitmap?: number|null;
        /**Autogenerated.*/
        ixp_spis_2?: string|null;
        /**enableActionPrilohy.*/
        enableActionPrilohy?: boolean|null;
        /**canOpen.*/
        kartaCteni?: boolean|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\IGDetailZasilkyHandler.d.ts 

declare namespace Gordic.Wfl.WebClient {
	const enum SaveDetailZasilkyNextStep {
		reload,
		otevriDetailElZpravy,
		/**The dotaz automaticke vypraveni doruceni*/
		dotazAutomatickeVypraveniDoruceni,
	}
	interface SaveDetailZasilkyReturnValue {
		/**Gets or sets the next step.*/
		NextStep?: Gordic.Wfl.WebClient.SaveDetailZasilkyNextStep|null;
		/**Gets or sets the mail structure el zpravy.*/
		MailStructElZpravy?: Gordic.Wfl.WebClient.CreateMailStructOutputDto|null;
		/**Gets or sets the errors.*/
		Errors?: string[]|null;
	}
	const enum SaveDetailZasilkyReturnValueNames { NextStep = "NextStep", MailStructElZpravy = "MailStructElZpravy", Errors = "Errors",}
	const enum SaveDetailZasilkyReturnValueFragments { NextStep = "*", MailStructElZpravy = "*", Errors = "*",}
	const enum SaveDetailZasilkyReturnValueTypes { NextStep = "Gordic.Wfl.WebClient.SaveDetailZasilkyNextStep", MailStructElZpravy = "Gordic.Wfl.WebClient.CreateMailStructOutputDto", Errors = "string[]",}
	const enum SaveDetailZasilkyReturnValueTypeLengths {}
	interface GOpravDataZasilkyDto {
		sxs?: string|null;
		zpusob_dor?: Gordic.Ginis.DbModel.GWflczpdEnum|null;
		druh_zas?: Gordic.Ginis.DbModel.GWflcdrzEnum|null;
		komb_sluzeb?: string|null;
		id_dorucenky?: string|null;
		ixs_esu?: string|null;
		lic_zast?: string|null;
		por_zast?: number|null;
		esu_txt?: string|null;
		zast_txt?: string|null;
		st0?: string|null;
		st1?: string|null;
		st2?: string|null;
		st3?: string|null;
		st4?: string|null;
		st5?: string|null;
		st6?: string|null;
		st7?: string|null;
		typ_obs_ob?: Gordic.Ginis.DbModel.GWflctobEnum|null;
		poznamka?: string|null;
		/**podCislo*/
		pod_cislo?: string|null;
		/**poplatek*/
		poplatek?: JsonDecimal|null;
		/**vaha*/
		vaha?: JsonDecimal|null;
		/**Cena*/
		cena?: JsonDecimal|null;
		/**Prizfyz*/
		priz_fyz?: number|null;
		/**PrizEle*/
		priz_ele?: number|null;
	}
	const enum GOpravDataZasilkyDtoNames { sxs = "sxs", zpusob_dor = "zpusob_dor", druh_zas = "druh_zas", komb_sluzeb = "komb_sluzeb", id_dorucenky = "id_dorucenky", ixs_esu = "ixs_esu", lic_zast = "lic_zast", por_zast = "por_zast", esu_txt = "esu_txt", zast_txt = "zast_txt", st0 = "st0", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", typ_obs_ob = "typ_obs_ob", poznamka = "poznamka", pod_cislo = "pod_cislo", poplatek = "poplatek", vaha = "vaha", cena = "cena", priz_fyz = "priz_fyz", priz_ele = "priz_ele",}
	const enum GOpravDataZasilkyDtoFragments { sxs = "*", zpusob_dor = "*", druh_zas = "*", komb_sluzeb = "*", id_dorucenky = "*", ixs_esu = "*", lic_zast = "*", por_zast = "*", esu_txt = "*", zast_txt = "*", st0 = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", typ_obs_ob = "*", poznamka = "*", pod_cislo = "*", poplatek = "*", vaha = "*", cena = "*", priz_fyz = "*", priz_ele = "*",}
	const enum GOpravDataZasilkyDtoTypes { sxs = "string", zpusob_dor = "Gordic.Ginis.DbModel.GWflczpdEnum", druh_zas = "Gordic.Ginis.DbModel.GWflcdrzEnum", komb_sluzeb = "string", id_dorucenky = "string", ixs_esu = "string", lic_zast = "string", por_zast = "number", esu_txt = "string", zast_txt = "string", st0 = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", typ_obs_ob = "Gordic.Ginis.DbModel.GWflctobEnum", poznamka = "string", pod_cislo = "string", poplatek = "JsonDecimal", vaha = "JsonDecimal", cena = "JsonDecimal", priz_fyz = "number", priz_ele = "number",}
	const enum GOpravDataZasilkyDtoTypeLengths {}
	interface GStornujZasilkuDto {
		sxs?: string|null;
		dat_zmena?: JsonDate|null;
		ixs_esu?: string|null;
	}
	const enum GStornujZasilkuDtoNames { sxs = "sxs", dat_zmena = "dat_zmena", ixs_esu = "ixs_esu",}
	const enum GStornujZasilkuDtoFragments { sxs = "*", dat_zmena = "*", ixs_esu = "*",}
	const enum GStornujZasilkuDtoTypes { sxs = "string", dat_zmena = "JsonDate", ixs_esu = "string",}
	const enum GStornujZasilkuDtoTypeLengths {}
	interface GUlozitAdresuKEsuDto {
		ixs_esu?: string|null;
		lic_zast?: string|null;
		por_zast?: number|null;
		ixp?: string|null;
		st0?: string|null;
		st1?: string|null;
		st2?: string|null;
		st3?: string|null;
		st4?: string|null;
		st5?: string|null;
		st6?: string|null;
		st7?: string|null;
	}
	const enum GUlozitAdresuKEsuDtoNames { ixs_esu = "ixs_esu", lic_zast = "lic_zast", por_zast = "por_zast", ixp = "ixp", st0 = "st0", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7",}
	const enum GUlozitAdresuKEsuDtoFragments { ixs_esu = "*", lic_zast = "*", por_zast = "*", ixp = "*", st0 = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*",}
	const enum GUlozitAdresuKEsuDtoTypes { ixs_esu = "string", lic_zast = "string", por_zast = "number", ixp = "string", st0 = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string",}
	const enum GUlozitAdresuKEsuDtoTypeLengths {}
	interface GAdresuEsuDto {
		St0?: string|null;
		St1?: string|null;
		St2?: string|null;
		St3?: string|null;
		St4?: string|null;
		St5?: string|null;
		St6?: string|null;
		St7?: string|null;
	}
	const enum GAdresuEsuDtoNames { St0 = "St0", St1 = "St1", St2 = "St2", St3 = "St3", St4 = "St4", St5 = "St5", St6 = "St6", St7 = "St7",}
	const enum GAdresuEsuDtoFragments { St0 = "*", St1 = "*", St2 = "*", St3 = "*", St4 = "*", St5 = "*", St6 = "*", St7 = "*",}
	const enum GAdresuEsuDtoTypes { St0 = "string", St1 = "string", St2 = "string", St3 = "string", St4 = "string", St5 = "string", St6 = "string", St7 = "string",}
	const enum GAdresuEsuDtoTypeLengths {}
	interface CreateMailStructInputDto {
		/**Gets or sets the zasilka.*/
		Zasilka?: Gordic.Wfl.WebClient.GOdeslaniSeznamDto|null;
		/**Gets or sets the email.*/
		Email?: string|null;
		/**Gets or sets the identifier ds.*/
		IdDs?: string|null;
		/**Gets or sets the utvar.*/
		Utvar?: string|null;
		/**Gets or sets the int adresace.*/
		IntAdresace?: string|null;
		/**Gets or sets the s ele.*/
		SEle?: number|null;
	}
	const enum CreateMailStructInputDtoNames { Zasilka = "Zasilka", Email = "Email", IdDs = "IdDs", Utvar = "Utvar", IntAdresace = "IntAdresace", SEle = "SEle",}
	const enum CreateMailStructInputDtoFragments { Zasilka = "*", Email = "*", IdDs = "*", Utvar = "*", IntAdresace = "*", SEle = "*",}
	const enum CreateMailStructInputDtoTypes { Zasilka = "Gordic.Wfl.WebClient.GOdeslaniSeznamDto", Email = "string", IdDs = "string", Utvar = "string", IntAdresace = "string", SEle = "number",}
	const enum CreateMailStructInputDtoTypeLengths {}
	interface CreateMailStructOutputDto {
		/**Gets or sets the zasilka.*/
		Zasilka?: Gordic.Wfl.WebClient.GOdeslaniSeznamDto|null;
		/**Gets or sets the okno predpisu zasilky.*/
		OknoPredpisuZasilky?: Gordic.Wfl.WebClient.OknoPredpisuZasilky|null;
		/**Gets or sets the mail structure.*/
		MailStruct?: Gordic.Wfl.WebClient.GWflMailStructDto|null;
	}
	const enum CreateMailStructOutputDtoNames { Zasilka = "Zasilka", OknoPredpisuZasilky = "OknoPredpisuZasilky", MailStruct = "MailStruct",}
	const enum CreateMailStructOutputDtoFragments { Zasilka = "*", OknoPredpisuZasilky = "*", MailStruct = "*",}
	const enum CreateMailStructOutputDtoTypes { Zasilka = "Gordic.Wfl.WebClient.GOdeslaniSeznamDto", OknoPredpisuZasilky = "Gordic.Wfl.WebClient.OknoPredpisuZasilky", MailStruct = "Gordic.Wfl.WebClient.GWflMailStructDto",}
	const enum CreateMailStructOutputDtoTypeLengths {}
	const enum OknoPredpisuZasilky {
		/**The none*/
		None,
		/**The datova zprava*/
		DatovaZprava,
		/**The gex*/
		GEX,
		/**The e desk*/
		EDesk,
		/**The email*/
		Email,
		/**The hybridni posta*/
		HybridniPosta,
		/**The hromadna konverzni posta*/
		HromadnaKonverzniPosta,
		/**The interni*/
		Interni,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Dto komponenty detailu zásilky.*/
	interface GWflDetailZasilkyComponentDto {
		/**Identifikátor funkec aktuálně přihlášeného uživatele.*/
		IxsFunPrihlasenehoUzivatele?: string|null;
		/**Zásilka.*/
		Zasilka?: Gordic.Wfl.WebClient.GDetailZasilkyDto|null;
	}
	const enum GWflDetailZasilkyComponentDtoNames { IxsFunPrihlasenehoUzivatele = "IxsFunPrihlasenehoUzivatele", Zasilka = "Zasilka",}
	const enum GWflDetailZasilkyComponentDtoFragments { IxsFunPrihlasenehoUzivatele = "*", Zasilka = "*",}
	const enum GWflDetailZasilkyComponentDtoTypes { IxsFunPrihlasenehoUzivatele = "string", Zasilka = "Gordic.Wfl.WebClient.GDetailZasilkyDto",}
	const enum GWflDetailZasilkyComponentDtoTypeLengths {}
	interface GWflDetailZasilkyComponentInputDto {
		Sxs?: string|null;
	}
	const enum GWflDetailZasilkyComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyDzComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyDzComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailSpolecneComponentDto {
		ZakonRok?: number|null;
		ZakonCislo?: number|null;
		Paragraf?: string|null;
		Odstavec?: string|null;
		OdstavecPismeno?: string|null;
		KRukam?: string|null;
		IdUtvaru?: string|null;
		NazevUtvaru?: string|null;
		IdDz?: string|null;
		NaseCj?: string|null;
		NaseSpZn?: string|null;
		VaseCj?: string|null;
		VaseSpZn?: string|null;
		PriznakVyzvednuti?: boolean|null;
		PriznakDoVlastnichRukou?: boolean|null;
		ZakazatFikciDoruceni?: boolean|null;
		StavDz?: string|null;
		IxbElDoruc?: string|null;
		IxbDzIsds?: string|null;
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GWflDetailZasilkyDzComponentDtoNames { ZakonRok = "ZakonRok", ZakonCislo = "ZakonCislo", Paragraf = "Paragraf", Odstavec = "Odstavec", OdstavecPismeno = "OdstavecPismeno", KRukam = "KRukam", IdUtvaru = "IdUtvaru", NazevUtvaru = "NazevUtvaru", IdDz = "IdDz", NaseCj = "NaseCj", NaseSpZn = "NaseSpZn", VaseCj = "VaseCj", VaseSpZn = "VaseSpZn", PriznakVyzvednuti = "PriznakVyzvednuti", PriznakDoVlastnichRukou = "PriznakDoVlastnichRukou", ZakazatFikciDoruceni = "ZakazatFikciDoruceni", StavDz = "StavDz", IxbElDoruc = "IxbElDoruc", IxbDzIsds = "IxbDzIsds", Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyDzComponentDtoFragments { ZakonRok = "*", ZakonCislo = "*", Paragraf = "*", Odstavec = "*", OdstavecPismeno = "*", KRukam = "*", IdUtvaru = "*", NazevUtvaru = "*", IdDz = "*", NaseCj = "*", NaseSpZn = "*", VaseCj = "*", VaseSpZn = "*", PriznakVyzvednuti = "*", PriznakDoVlastnichRukou = "*", ZakazatFikciDoruceni = "*", StavDz = "*", IxbElDoruc = "*", IxbDzIsds = "*", Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyDzComponentDtoTypes { ZakonRok = "number", ZakonCislo = "number", Paragraf = "string", Odstavec = "string", OdstavecPismeno = "string", KRukam = "string", IdUtvaru = "string", NazevUtvaru = "string", IdDz = "string", NaseCj = "string", NaseSpZn = "string", VaseCj = "string", VaseSpZn = "string", PriznakVyzvednuti = "boolean", PriznakDoVlastnichRukou = "boolean", ZakazatFikciDoruceni = "boolean", StavDz = "string", IxbElDoruc = "string", IxbDzIsds = "string", Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyDzComponentDtoTypeLengths {}
	interface GWflDetailZasilkyDzComponentInputDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailComponentInputDto {
	}
	const enum GWflDetailZasilkyDzComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyDzComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyDzComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyDzComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyEDeskComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyEDeskComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailSpolecneComponentDto {
		IdZpravy?: string|null;
		NaseCj?: string|null;
		VaseCj?: string|null;
		/**eDesk: Předmět zprávy.*/
		Predmet?: string|null;
		/**eDesk: Id konverzace.*/
		CorrelationId?: string|null;
		/**eDesk: Informační id.*/
		BusinessId?: string|null;
		/**eDesk: Id předchozí zprávy.*/
		ReferenceId?: string|null;
		/**eDesk: Typ zprávy - souhlasí s typem formuláře.*/
		MessageType?: string|null;
		/**eDesk: Obsažený formulář.*/
		IxsFsk?: string|null;
		/**eDesk: Druh zprávy (určuje zda jde o podání / rozhodnutí / notifikaci / ...).*/
		IdCsk?: Gordic.ControlsLogic.Interface.GWflccskEnum|null;
		IxbDzIsds?: string|null;
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GWflDetailZasilkyEDeskComponentDtoNames { IdZpravy = "IdZpravy", NaseCj = "NaseCj", VaseCj = "VaseCj", Predmet = "Predmet", CorrelationId = "CorrelationId", BusinessId = "BusinessId", ReferenceId = "ReferenceId", MessageType = "MessageType", IxsFsk = "IxsFsk", IdCsk = "IdCsk", IxbDzIsds = "IxbDzIsds", Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyEDeskComponentDtoFragments { IdZpravy = "*", NaseCj = "*", VaseCj = "*", Predmet = "*", CorrelationId = "*", BusinessId = "*", ReferenceId = "*", MessageType = "*", IxsFsk = "*", IdCsk = "*", IxbDzIsds = "*", Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyEDeskComponentDtoTypes { IdZpravy = "string", NaseCj = "string", VaseCj = "string", Predmet = "string", CorrelationId = "string", BusinessId = "string", ReferenceId = "string", MessageType = "string", IxsFsk = "string", IdCsk = "Gordic.ControlsLogic.Interface.GWflccskEnum", IxbDzIsds = "string", Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyEDeskComponentDtoTypeLengths { CorrelationId = 100, BusinessId = 100, ReferenceId = 100, MessageType = 254,}
	interface GWflDetailZasilkyEDeskComponentInputDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailComponentInputDto {
	}
	const enum GWflDetailZasilkyEDeskComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyEDeskComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyEDeskComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyEDeskComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyEmailComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyEmailSpolecneComponentDto {
		/**Sxs předpisu elektronické zprávy.*/
		Sxs?: string|null;
		/**Ixp.*/
		Ixp?: string|null;
		/**Licence předpisu elektronické zprávy.*/
		Lic?: string|null;
		/**Pořadové číslo předpisu elektronické zprávy.*/
		PorCislo?: number|null;
		/**Sxs zásilky.*/
		SxsZasilky?: string|null;
		/**tbTyp, typ_zpr_txt*/
		Typ?: string|null;
		/**tbFrom, mail_from*/
		From?: string|null;
		/**tbTo, mail_to*/
		To?: string|null;
		/**tbCc, mail_cc*/
		Cc?: string|null;
		/**tbBcc, mail_bcc*/
		Bcc?: string|null;
		/**tbSubject, predmet*/
		Subject?: string|null;
		/**Ginszmp, IxsZmp
		*     tbSender, zmenu_prov
		*/
		Odesilatel?: string|null;
		/**tbDatOdes, dat_zmena*/
		DatumOdeslani?: JsonDate|null;
		/**tbBody, poznamka*/
		Text?: string|null;
		/**tbCert, ixs_cer*/
		Certifikat?: string|null;
		/**lblPodpisInfo, GWflClientCommon.GetCertifikatInfo(row.ixs_cer)*/
		InformaceOCertifikatu?: string|null;
		/**chObraz, row.pri_el_obraz.BaseValue > 0*/
		PripojitElektronickyObraz?: boolean|null;
		/**chObrazPodpis2, row.pri_el_obraz.BaseValue == 2 || row.pri_el_obraz.BaseValue == 4;*/
		PripojitVnejsiPodpis?: boolean|null;
		/**chObrazRazitko2, row.pri_el_obraz.BaseValue == 3 || row.pri_el_obraz.BaseValue == 4;*/
		PripojitVnejsiRazitko?: boolean|null;
		/**chObrazPodpis1, l_oRow.typ_sgn == 2 || l_oRow.typ_sgn == 4*/
		PripojitVnitrniPodpis?: boolean|null;
		/**chObrazRazitko1, l_oRow.typ_sgn == 4*/
		PripojitVnitrniRazitko?: boolean|null;
		/**chPrilohy, row.pri_el_prilohy.BaseValue > 0*/
		PripojitPrilohy?: boolean|null;
		/**chSeznamPriloh, row.pri_sez_priloh.BaseValue > 0;*/
		PripojitSeznamPriloh?: boolean|null;
		/**chPoznamky, row.pri_uziv_pozn.BaseValue > 0;*/
		PripojitPoznamky?: boolean|null;
		/**chHistorie, row.pri_historie.BaseValue > 0;*/
		PripojitHistorii?: boolean|null;
		Prilohy?: Gordic.Wfl.WebClient.GPrilohaEmailuDto[]|null;
		/**Velikost odeslané zprávy.*/
		Velikost?: number|null;
		/**IxbDorucenky*/
		IxbDorucenka?: string|null;
	}
	const enum GWflDetailZasilkyEmailSpolecneComponentDtoNames { Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyEmailSpolecneComponentDtoFragments { Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyEmailSpolecneComponentDtoTypes { Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyEmailSpolecneComponentDtoTypeLengths {}
	interface GWflDetailZasilkyEmailComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailSpolecneComponentDto {
		/**Nezkrácená verze textu emailu.*/
		TextMailuCely?: string|null;
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GWflDetailZasilkyEmailComponentDtoNames { TextMailuCely = "TextMailuCely", Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyEmailComponentDtoFragments { TextMailuCely = "*", Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyEmailComponentDtoTypes { TextMailuCely = "string", Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyEmailComponentDtoTypeLengths {}
	interface GWflDetailZasilkyEmailComponentInputDto {
		Sxs?: string|null;
	}
	const enum GWflDetailZasilkyEmailComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyEmailComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyEmailComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyEmailComponentInputDtoTypeLengths {}
	interface GPrilohaEmailuDto {
		/**Autogenerated.*/
		Lic?: string|null;
		/**Autogenerated.*/
		PorCislo?: number|null;
		/**Autogenerated.*/
		PriCislo?: number|null;
		/**Autogenerated.*/
		Nazev?: string|null;
		/**Autogenerated.*/
		Ixb?: string|null;
		/**Autogenerated.*/
		SSign?: number|null;
		/**Autogenerated.*/
		SCrypt?: number|null;
		/**Autogenerated.*/
		IxsUlo?: string|null;
	}
	const enum GPrilohaEmailuDtoNames { Lic = "Lic", PorCislo = "PorCislo", PriCislo = "PriCislo", Nazev = "Nazev", Ixb = "Ixb", SSign = "SSign", SCrypt = "SCrypt", IxsUlo = "IxsUlo",}
	const enum GPrilohaEmailuDtoFragments { Lic = "*", PorCislo = "*", PriCislo = "*", Nazev = "*", Ixb = "*", SSign = "*", SCrypt = "*", IxsUlo = "*",}
	const enum GPrilohaEmailuDtoTypes { Lic = "string", PorCislo = "number", PriCislo = "number", Nazev = "string", Ixb = "string", SSign = "number", SCrypt = "number", IxsUlo = "string",}
	const enum GPrilohaEmailuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHistoryComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GDetailBalikuDto	Dto for Linked Docs Component*/
	interface GWflDetailZasilkyHistoryComponentDto {
		/**Ixp.*/
		Ixp?: string|null;
		/**Lic.*/
		Lic?: string|null;
		/**PorCislo.*/
		PorCislo?: number|null;
		/**validatory*/
		readonly Validators?: object|null;
		HistoryTitle?: string|null;
		HistoryTargetClass?: string|null;
		HistoryTargetDto?: object|null;
		IxsFunAkt?: string|null;
	}
	const enum GWflDetailZasilkyHistoryComponentDtoNames { Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", Validators = "Validators", HistoryTitle = "HistoryTitle", HistoryTargetClass = "HistoryTargetClass", HistoryTargetDto = "HistoryTargetDto", IxsFunAkt = "IxsFunAkt",}
	const enum GWflDetailZasilkyHistoryComponentDtoFragments { Ixp = "*", Lic = "*", PorCislo = "*", Validators = "*", HistoryTitle = "*", HistoryTargetClass = "*", HistoryTargetDto = "*", IxsFunAkt = "*",}
	const enum GWflDetailZasilkyHistoryComponentDtoTypes { Ixp = "string", Lic = "string", PorCislo = "number", Validators = "object", HistoryTitle = "string", HistoryTargetClass = "string", HistoryTargetDto = "object", IxsFunAkt = "string",}
	const enum GWflDetailZasilkyHistoryComponentDtoTypeLengths {}
	/**Dto pro SSL hlavičku*/
	interface GWflDetailZasilkyHistoryComponentInputDto {
		/**Sxs*/
		Sxs?: string|null;
		/**Ixp.*/
		Ixp?: string|null;
		/**Lic.*/
		Lic?: string|null;
		/**PorCislo.*/
		PorCislo?: number|null;
	}
	const enum GWflDetailZasilkyHistoryComponentInputDtoNames { Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo",}
	const enum GWflDetailZasilkyHistoryComponentInputDtoFragments { Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*",}
	const enum GWflDetailZasilkyHistoryComponentInputDtoTypes { Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number",}
	const enum GWflDetailZasilkyHistoryComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHkpComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyHkpComponentInputDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailComponentInputDto {
	}
	const enum GWflDetailZasilkyHkpComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyHkpComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyHkpComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyHkpComponentInputDtoTypeLengths {}
	/**GWflDetailZasilkyHkpComponentDto.*/
	interface GWflDetailZasilkyHkpComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyHpSpolecneComponentDto {
		/**Gets or sets the typ archivace.*/
		TypArchivace?: Gordic.Ginis.DbModel.GWflctarEnum|null;
		/**Gets or sets the stav hkp.*/
		StavHkp?: string|null;
		/**Gets or sets the datum vypraveni dz.*/
		DatumVypraveniDz?: JsonDate|null;
		/**Gets or sets the datum doruceni dz.*/
		DatumDoruceniDz?: JsonDate|null;
	}
	const enum GWflDetailZasilkyHkpComponentDtoNames { TypArchivace = "TypArchivace", StavHkp = "StavHkp", DatumVypraveniDz = "DatumVypraveniDz", DatumDoruceniDz = "DatumDoruceniDz", TypTisku = "TypTisku", TypVyhodnoceniDoruceni = "TypVyhodnoceniDoruceni", IdZakHp = "IdZakHp", StavDz = "StavDz", Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyHkpComponentDtoFragments { TypArchivace = "*", StavHkp = "*", DatumVypraveniDz = "*", DatumDoruceniDz = "*", TypTisku = "*", TypVyhodnoceniDoruceni = "*", IdZakHp = "*", StavDz = "*", Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyHkpComponentDtoTypes { TypArchivace = "Gordic.Ginis.DbModel.GWflctarEnum", StavHkp = "string", DatumVypraveniDz = "JsonDate", DatumDoruceniDz = "JsonDate", TypTisku = "Gordic.Ginis.DbModel.GWflcttiEnum", TypVyhodnoceniDoruceni = "Gordic.Ginis.DbModel.GWflctdoEnum", IdZakHp = "string", StavDz = "string", Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyHkpComponentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHpComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyHpComponentInputDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailComponentInputDto {
	}
	const enum GWflDetailZasilkyHpComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyHpComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyHpComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyHpComponentInputDtoTypeLengths {}
	interface GWflDetailZasilkyHpSpolecneComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailSpolecneComponentDto {
		/**Gets or sets the typ tisku.*/
		TypTisku?: Gordic.Ginis.DbModel.GWflcttiEnum|null;
		/**Gets or sets the typ vyhodnoceni doruceni.*/
		TypVyhodnoceniDoruceni?: Gordic.Ginis.DbModel.GWflctdoEnum|null;
		/**Gets or sets the identifier zak hp.*/
		IdZakHp?: string|null;
		/**Gets or sets the stav dz.*/
		StavDz?: string|null;
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GWflDetailZasilkyHpSpolecneComponentDtoNames { TypTisku = "TypTisku", TypVyhodnoceniDoruceni = "TypVyhodnoceniDoruceni", IdZakHp = "IdZakHp", StavDz = "StavDz", Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyHpSpolecneComponentDtoFragments { TypTisku = "*", TypVyhodnoceniDoruceni = "*", IdZakHp = "*", StavDz = "*", Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyHpSpolecneComponentDtoTypes { TypTisku = "Gordic.Ginis.DbModel.GWflcttiEnum", TypVyhodnoceniDoruceni = "Gordic.Ginis.DbModel.GWflctdoEnum", IdZakHp = "string", StavDz = "string", Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyHpSpolecneComponentDtoTypeLengths {}
	interface GWflDetailZasilkyHpComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyHpSpolecneComponentDto {
		/**Gets or sets the pocet listu.*/
		PocetListu?: number|null;
		/**Gets or sets the pocet stran.*/
		PocetStran?: number|null;
	}
	const enum GWflDetailZasilkyHpComponentDtoNames { PocetListu = "PocetListu", PocetStran = "PocetStran", TypTisku = "TypTisku", TypVyhodnoceniDoruceni = "TypVyhodnoceniDoruceni", IdZakHp = "IdZakHp", StavDz = "StavDz", Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyHpComponentDtoFragments { PocetListu = "*", PocetStran = "*", TypTisku = "*", TypVyhodnoceniDoruceni = "*", IdZakHp = "*", StavDz = "*", Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyHpComponentDtoTypes { PocetListu = "number", PocetStran = "number", TypTisku = "Gordic.Ginis.DbModel.GWflcttiEnum", TypVyhodnoceniDoruceni = "Gordic.Ginis.DbModel.GWflctdoEnum", IdZakHp = "string", StavDz = "string", Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyHpComponentDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyHpIczComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyHpIczComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyHpSpolecneComponentDto {
		IdHp?: string|null;
		IdentifikaceZasilkyHp?: string|null;
		TypZasilkyHp?: string|null;
		TypZasilkyHpId?: string|null;
		TypZasilkyHpKod?: string|null;
		TypVyhodnoceniDorucenky?: string|null;
		TypArchivace?: string|null;
		TypKonverze?: string|null;
	}
	const enum GWflDetailZasilkyHpIczComponentDtoNames { IdHp = "IdHp", IdentifikaceZasilkyHp = "IdentifikaceZasilkyHp", TypZasilkyHp = "TypZasilkyHp", TypZasilkyHpId = "TypZasilkyHpId", TypZasilkyHpKod = "TypZasilkyHpKod", TypVyhodnoceniDorucenky = "TypVyhodnoceniDorucenky", TypArchivace = "TypArchivace", TypKonverze = "TypKonverze", TypTisku = "TypTisku", TypVyhodnoceniDoruceni = "TypVyhodnoceniDoruceni", IdZakHp = "IdZakHp", StavDz = "StavDz", Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyHpIczComponentDtoFragments { IdHp = "*", IdentifikaceZasilkyHp = "*", TypZasilkyHp = "*", TypZasilkyHpId = "*", TypZasilkyHpKod = "*", TypVyhodnoceniDorucenky = "*", TypArchivace = "*", TypKonverze = "*", TypTisku = "*", TypVyhodnoceniDoruceni = "*", IdZakHp = "*", StavDz = "*", Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyHpIczComponentDtoTypes { IdHp = "string", IdentifikaceZasilkyHp = "string", TypZasilkyHp = "string", TypZasilkyHpId = "string", TypZasilkyHpKod = "string", TypVyhodnoceniDorucenky = "string", TypArchivace = "string", TypKonverze = "string", TypTisku = "Gordic.Ginis.DbModel.GWflcttiEnum", TypVyhodnoceniDoruceni = "Gordic.Ginis.DbModel.GWflctdoEnum", IdZakHp = "string", StavDz = "string", Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyHpIczComponentDtoTypeLengths {}
	interface GWflDetailZasilkyHpIczComponentInputDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyHpComponentInputDto {
	}
	const enum GWflDetailZasilkyHpIczComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyHpIczComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyHpIczComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyHpIczComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyInterniComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyInterniComponentDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailSpolecneComponentDto {
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GWflDetailZasilkyInterniComponentDtoNames { Validators = "Validators", Sxs = "Sxs", Ixp = "Ixp", Lic = "Lic", PorCislo = "PorCislo", SxsZasilky = "SxsZasilky", Typ = "Typ", From = "From", To = "To", Cc = "Cc", Bcc = "Bcc", Subject = "Subject", Odesilatel = "Odesilatel", DatumOdeslani = "DatumOdeslani", Text = "Text", Certifikat = "Certifikat", InformaceOCertifikatu = "InformaceOCertifikatu", PripojitElektronickyObraz = "PripojitElektronickyObraz", PripojitVnejsiPodpis = "PripojitVnejsiPodpis", PripojitVnejsiRazitko = "PripojitVnejsiRazitko", PripojitVnitrniPodpis = "PripojitVnitrniPodpis", PripojitVnitrniRazitko = "PripojitVnitrniRazitko", PripojitPrilohy = "PripojitPrilohy", PripojitSeznamPriloh = "PripojitSeznamPriloh", PripojitPoznamky = "PripojitPoznamky", PripojitHistorii = "PripojitHistorii", Prilohy = "Prilohy", Velikost = "Velikost", IxbDorucenka = "IxbDorucenka",}
	const enum GWflDetailZasilkyInterniComponentDtoFragments { Validators = "*", Sxs = "*", Ixp = "*", Lic = "*", PorCislo = "*", SxsZasilky = "*", Typ = "*", From = "*", To = "*", Cc = "*", Bcc = "*", Subject = "*", Odesilatel = "*", DatumOdeslani = "*", Text = "*", Certifikat = "*", InformaceOCertifikatu = "*", PripojitElektronickyObraz = "*", PripojitVnejsiPodpis = "*", PripojitVnejsiRazitko = "*", PripojitVnitrniPodpis = "*", PripojitVnitrniRazitko = "*", PripojitPrilohy = "*", PripojitSeznamPriloh = "*", PripojitPoznamky = "*", PripojitHistorii = "*", Prilohy = "*", Velikost = "*", IxbDorucenka = "*",}
	const enum GWflDetailZasilkyInterniComponentDtoTypes { Validators = "object", Sxs = "string", Ixp = "string", Lic = "string", PorCislo = "number", SxsZasilky = "string", Typ = "string", From = "string", To = "string", Cc = "string", Bcc = "string", Subject = "string", Odesilatel = "string", DatumOdeslani = "JsonDate", Text = "string", Certifikat = "string", InformaceOCertifikatu = "string", PripojitElektronickyObraz = "boolean", PripojitVnejsiPodpis = "boolean", PripojitVnejsiRazitko = "boolean", PripojitVnitrniPodpis = "boolean", PripojitVnitrniRazitko = "boolean", PripojitPrilohy = "boolean", PripojitSeznamPriloh = "boolean", PripojitPoznamky = "boolean", PripojitHistorii = "boolean", Prilohy = "Gordic.Wfl.WebClient.GPrilohaEmailuDto[]", Velikost = "number", IxbDorucenka = "string",}
	const enum GWflDetailZasilkyInterniComponentDtoTypeLengths {}
	interface GWflDetailZasilkyInterniComponentInputDto extends Gordic.Wfl.WebClient.GWflDetailZasilkyEmailComponentInputDto {
	}
	const enum GWflDetailZasilkyInterniComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyInterniComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyInterniComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyInterniComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDetailZasilkyVnoreneZasilkyComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDetailZasilkyVnoreneZasilkyComponentDto {
		/**Sxs nadřazené zásilky.*/
		Sxs?: string|null;
		/**Gets or sets the vnorene zasilky.*/
		VnoreneZasilky?: Gordic.Wfl.Interface.GZasilkyListDto[]|null;
		/**validatory*/
		readonly Validators?: object|null;
	}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentDtoNames { Sxs = "Sxs", VnoreneZasilky = "VnoreneZasilky", Validators = "Validators",}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentDtoFragments { Sxs = "*", VnoreneZasilky = "*", Validators = "*",}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentDtoTypes { Sxs = "string", VnoreneZasilky = "Gordic.Wfl.Interface.GZasilkyListDto[]", Validators = "object",}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentDtoTypeLengths {}
	interface GWflDetailZasilkyVnoreneZasilkyComponentInputDto {
		/**Sxs nadřazené zásilky.*/
		Sxs?: string|null;
	}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentInputDtoNames { Sxs = "Sxs",}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentInputDtoFragments { Sxs = "*",}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentInputDtoTypes { Sxs = "string",}
	const enum GWflDetailZasilkyVnoreneZasilkyComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\DetailBuilderComponents\Dto\GWflDoruceniZasilkyComponentDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	interface GWflDoruceniZasilkyComponentDto {
		/**DoruceniZasilky.*/
		DoruceniZasilky?: Gordic.Wfl.Interface.GDoruceniZasilkyDto|null;
		/**Validátory pro doručení zásilky.*/
		DoruceniZasilkyValidators?: object|null;
		EditMode?: boolean|null;
		/**(default: standard) Mód okna doručenízásilky.*/
		Mode?: Gordic.Wfl.WebClient.GDoruceniZasilkyDlgMode|null;
		DbCulture?: number|null;
	}
	const enum GWflDoruceniZasilkyComponentDtoNames { DoruceniZasilky = "DoruceniZasilky", DoruceniZasilkyValidators = "DoruceniZasilkyValidators", EditMode = "EditMode", Mode = "Mode", DbCulture = "DbCulture",}
	const enum GWflDoruceniZasilkyComponentDtoFragments { DoruceniZasilky = "*", DoruceniZasilkyValidators = "*", EditMode = "*", Mode = "*", DbCulture = "*",}
	const enum GWflDoruceniZasilkyComponentDtoTypes { DoruceniZasilky = "Gordic.Wfl.Interface.GDoruceniZasilkyDto", DoruceniZasilkyValidators = "object", EditMode = "boolean", Mode = "Gordic.Wfl.WebClient.GDoruceniZasilkyDlgMode", DbCulture = "number",}
	const enum GWflDoruceniZasilkyComponentDtoTypeLengths {}
	interface GWflDoruceniZasilkyComponentInputDto {
		Sxs?: string|null;
		EditMode?: boolean|null;
		/**(default: standard) Mód okna doručenízásilky.*/
		Mode?: Gordic.Wfl.WebClient.GDoruceniZasilkyDlgMode|null;
	}
	const enum GWflDoruceniZasilkyComponentInputDtoNames { Sxs = "Sxs", EditMode = "EditMode", Mode = "Mode",}
	const enum GWflDoruceniZasilkyComponentInputDtoFragments { Sxs = "*", EditMode = "*", Mode = "*",}
	const enum GWflDoruceniZasilkyComponentInputDtoTypes { Sxs = "string", EditMode = "boolean", Mode = "Gordic.Wfl.WebClient.GDoruceniZasilkyDlgMode",}
	const enum GWflDoruceniZasilkyComponentInputDtoTypeLengths {}
	/**GDoruceniZasilkyDlgMode*/
	const enum GDoruceniZasilkyDlgMode {
		/**Standardní chování (žádné speciálky).*/
		Standard,
		/**TAutomaticky nastaví stav "doruceno" (pokud lze editovat) a focus se hodi na datum doruceni.*/
		NavratDorucenek,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\Dto\GDetailZasilkyDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GDetailZasilkyDto*/
	interface GDetailZasilkyDto {
		Data?: Gordic.Wfl.Interface.GZasilkaDto|null;
		readonly Validators?: object|null;
		Permissions?: Gordic.Wfl.WebClient.GDetailZasilkyPermissionsDto|null;
		IsDatPotvrzOKInfo?: string|null;
	}
	const enum GDetailZasilkyDtoNames { Data = "Data", Validators = "Validators", Permissions = "Permissions", IsDatPotvrzOKInfo = "IsDatPotvrzOKInfo",}
	const enum GDetailZasilkyDtoFragments { Data = "*", Validators = "*", Permissions = "*", IsDatPotvrzOKInfo = "*",}
	const enum GDetailZasilkyDtoTypes { Data = "Gordic.Wfl.Interface.GZasilkaDto", Validators = "object", Permissions = "Gordic.Wfl.WebClient.GDetailZasilkyPermissionsDto", IsDatPotvrzOKInfo = "string",}
	const enum GDetailZasilkyDtoTypeLengths {}
	interface GDetailZasilkyPermissionsDto {
		/**Říká, zda lze povolit editační režim u zásilky*/
		LzePovolitEditacniRezim?: boolean|null;
		/**Říká, zda lze povolit editační režim u zásilky*/
		LzeStornovatZasilku?: boolean|null;
		/**Říká, zda lze otevřít okno doručení*/
		LzeOtevritDoruceni?: boolean|null;
		/**Určuje, zda je možné uložit zásilkovou adresu k esu.*/
		readonly LzeUlozitKEsu?: boolean|null;
	}
	const enum GDetailZasilkyPermissionsDtoNames { LzePovolitEditacniRezim = "LzePovolitEditacniRezim", LzeStornovatZasilku = "LzeStornovatZasilku", LzeOtevritDoruceni = "LzeOtevritDoruceni", LzeUlozitKEsu = "LzeUlozitKEsu",}
	const enum GDetailZasilkyPermissionsDtoFragments { LzePovolitEditacniRezim = "*", LzeStornovatZasilku = "*", LzeOtevritDoruceni = "*", LzeUlozitKEsu = "*",}
	const enum GDetailZasilkyPermissionsDtoTypes { LzePovolitEditacniRezim = "boolean", LzeStornovatZasilku = "boolean", LzeOtevritDoruceni = "boolean", LzeUlozitKEsu = "boolean",}
	const enum GDetailZasilkyPermissionsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\Dto\GLoadDetailZasilkyDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**Detail zasilky DTO*/
	interface GLoadDetailZasilkyDto {
		sxs?: string|null;
		ixp?: string|null;
		id_dorucenky?: string|null;
		nazev?: string|null;
		poznamka?: string|null;
		s_dor?: number|null;
		dor_sluzba?: string|null;
		st0?: string|null;
		st1?: string|null;
		st2?: string|null;
		st3?: string|null;
		st4?: string|null;
		st5?: string|null;
		st6?: string|null;
		st7?: string|null;
		pod_cislo?: string|null;
		poplatek?: JsonDecimal|null;
		vaha?: JsonDecimal|null;
		cena?: JsonDecimal|null;
		dat_prevz?: JsonDate|null;
		priz_obal?: number|null;
		s_orig?: number|null;
		dat_odes?: JsonDate|null;
		dat_pod?: JsonDate|null;
		dat_potvrz?: JsonDate|null;
	}
	const enum GLoadDetailZasilkyDtoNames { sxs = "sxs", ixp = "ixp", id_dorucenky = "id_dorucenky", nazev = "nazev", poznamka = "poznamka", s_dor = "s_dor", dor_sluzba = "dor_sluzba", st0 = "st0", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", pod_cislo = "pod_cislo", poplatek = "poplatek", vaha = "vaha", cena = "cena", dat_prevz = "dat_prevz", priz_obal = "priz_obal", s_orig = "s_orig", dat_odes = "dat_odes", dat_pod = "dat_pod", dat_potvrz = "dat_potvrz",}
	const enum GLoadDetailZasilkyDtoFragments { sxs = "*", ixp = "*", id_dorucenky = "*", nazev = "*", poznamka = "*", s_dor = "*", dor_sluzba = "*", st0 = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", pod_cislo = "*", poplatek = "*", vaha = "*", cena = "*", dat_prevz = "*", priz_obal = "*", s_orig = "*", dat_odes = "*", dat_pod = "*", dat_potvrz = "*",}
	const enum GLoadDetailZasilkyDtoTypes { sxs = "string", ixp = "string", id_dorucenky = "string", nazev = "string", poznamka = "string", s_dor = "number", dor_sluzba = "string", st0 = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", pod_cislo = "string", poplatek = "JsonDecimal", vaha = "JsonDecimal", cena = "JsonDecimal", dat_prevz = "JsonDate", priz_obal = "number", s_orig = "number", dat_odes = "JsonDate", dat_pod = "JsonDate", dat_potvrz = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\Dto\GZasilkaInfoZHkpDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GZasilkaInfoZHkpDto*/
	interface GZasilkaInfoZHkpDto {
		/**The stav*/
		Stavy?: Gordic.Wfl.WebClient.GZasilkaInfoZHkpStavDto[]|null;
		/**The udalosti*/
		Udalosti?: Gordic.Wfl.Interface.GDatovaZpravaUdalost[]|null;
		/**The nacteno z text*/
		NactenoZTxt?: string|null;
		/**The errors*/
		Errors?: string[]|null;
		/**The warnings*/
		Warnings?: string[]|null;
		/**The validators.*/
		readonly Validators?: object|null;
	}
	const enum GZasilkaInfoZHkpDtoNames { Stavy = "Stavy", Udalosti = "Udalosti", NactenoZTxt = "NactenoZTxt", Errors = "Errors", Warnings = "Warnings", Validators = "Validators",}
	const enum GZasilkaInfoZHkpDtoFragments { Stavy = "*", Udalosti = "*", NactenoZTxt = "*", Errors = "*", Warnings = "*", Validators = "*",}
	const enum GZasilkaInfoZHkpDtoTypes { Stavy = "Gordic.Wfl.WebClient.GZasilkaInfoZHkpStavDto[]", Udalosti = "Gordic.Wfl.Interface.GDatovaZpravaUdalost[]", NactenoZTxt = "string", Errors = "string[]", Warnings = "string[]", Validators = "object",}
	interface GZasilkaInfoZHkpStavDto {
		/**The identifier zak HKP*/
		IdZakHkp?: string|null;
		/**The poradi*/
		Poradi?: number|null;
		/**The stav kod*/
		StavHkp?: string|null;
		/**The stav popis*/
		StavHkpTxt?: string|null;
		/**The stav detail*/
		StavDetail?: string|null;
		/**The stav datum*/
		StavDatum?: JsonDate|null;
		/**The stav datum s*/
		StavDatumS?: string|null;
		/**The podaci cislo*/
		PodaciCislo?: string|null;
		/**The postovne*/
		Postovne?: JsonDecimal|null;
		/**The cena HKP*/
		CenaHkp?: JsonDecimal|null;
	}
	const enum GZasilkaInfoZHkpStavDtoNames { IdZakHkp = "IdZakHkp", Poradi = "Poradi", StavHkp = "StavHkp", StavHkpTxt = "StavHkpTxt", StavDetail = "StavDetail", StavDatum = "StavDatum", StavDatumS = "StavDatumS", PodaciCislo = "PodaciCislo", Postovne = "Postovne", CenaHkp = "CenaHkp",}
	const enum GZasilkaInfoZHkpStavDtoFragments { IdZakHkp = "*", Poradi = "*", StavHkp = "*", StavHkpTxt = "*", StavDetail = "*", StavDatum = "*", StavDatumS = "*", PodaciCislo = "*", Postovne = "*", CenaHkp = "*",}
	const enum GZasilkaInfoZHkpStavDtoTypes { IdZakHkp = "string", Poradi = "number", StavHkp = "string", StavHkpTxt = "string", StavDetail = "string", StavDatum = "JsonDate", StavDatumS = "string", PodaciCislo = "string", Postovne = "JsonDecimal", CenaHkp = "JsonDecimal",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zasilky\Dto\GZasilkaInfoZHpDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**GZasilkaInfoZHpDto*/
	interface GZasilkaInfoZHpDto {
		/**The identifier zak hp*/
		IdZakHp?: string|null;
		/**The pod cislo*/
		PodaciCislo?: string|null;
		/**The stav zpracovani*/
		StavZpracovaniTxt?: string|null;
		/**The stav zasilky text*/
		StavZasilkyTxt?: string|null;
		/**The datum podani do hp*/
		DatumPodaniDoHp?: JsonDate|null;
		/**The datum doruceni*/
		DatumDoruceni?: JsonDate|null;
		/**The pocet listu*/
		PocetListu?: number|null;
		/**The pocet stran*/
		PocetStran?: number|null;
		/**The udalosti*/
		Doruceni?: Gordic.Wfl.WebClient.GZasilkaInfoZHpDoruceniDto[]|null;
		/**The udalosti*/
		Udalosti?: Gordic.Wfl.Interface.GDatovaZpravaUdalost[]|null;
		/**The nacteno z text*/
		NactenoZTxt?: string|null;
		/**The errors*/
		Errors?: string[]|null;
		/**The warnings*/
		Warnings?: string[]|null;
		/**The validators.*/
		readonly Validators?: object|null;
	}
	const enum GZasilkaInfoZHpDtoNames { IdZakHp = "IdZakHp", PodaciCislo = "PodaciCislo", StavZpracovaniTxt = "StavZpracovaniTxt", StavZasilkyTxt = "StavZasilkyTxt", DatumPodaniDoHp = "DatumPodaniDoHp", DatumDoruceni = "DatumDoruceni", PocetListu = "PocetListu", PocetStran = "PocetStran", Doruceni = "Doruceni", Udalosti = "Udalosti", NactenoZTxt = "NactenoZTxt", Errors = "Errors", Warnings = "Warnings", Validators = "Validators",}
	const enum GZasilkaInfoZHpDtoFragments { IdZakHp = "*", PodaciCislo = "*", StavZpracovaniTxt = "*", StavZasilkyTxt = "*", DatumPodaniDoHp = "*", DatumDoruceni = "*", PocetListu = "*", PocetStran = "*", Doruceni = "*", Udalosti = "*", NactenoZTxt = "*", Errors = "*", Warnings = "*", Validators = "*",}
	const enum GZasilkaInfoZHpDtoTypes { IdZakHp = "string", PodaciCislo = "string", StavZpracovaniTxt = "string", StavZasilkyTxt = "string", DatumPodaniDoHp = "JsonDate", DatumDoruceni = "JsonDate", PocetListu = "number", PocetStran = "number", Doruceni = "Gordic.Wfl.WebClient.GZasilkaInfoZHpDoruceniDto[]", Udalosti = "Gordic.Wfl.Interface.GDatovaZpravaUdalost[]", NactenoZTxt = "string", Errors = "string[]", Warnings = "string[]", Validators = "object",}
	/**GZasilkaInfoZHpDoruceniDto*/
	interface GZasilkaInfoZHpDoruceniDto {
		/**The poradi*/
		Poradi?: number|null;
		/**The doruceni*/
		Doruceni?: number|null;
		/**The doruceni*/
		DoruceniTxt?: string|null;
		/**The datum*/
		Datum?: JsonDate|null;
	}
	const enum GZasilkaInfoZHpDoruceniDtoNames { Poradi = "Poradi", Doruceni = "Doruceni", DoruceniTxt = "DoruceniTxt", Datum = "Datum",}
	const enum GZasilkaInfoZHpDoruceniDtoFragments { Poradi = "*", Doruceni = "*", DoruceniTxt = "*", Datum = "*",}
	const enum GZasilkaInfoZHpDoruceniDtoTypes { Poradi = "number", Doruceni = "number", DoruceniTxt = "string", Datum = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zverejneni\GZverejneniPodaniDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
    /**DTO jako vysledek zahajeni podani*/
	interface GZverejneniPodaniDto {
        /**Ixp*/
		ixp?: string|null;
        /**IxsZpv*/
		ixsZpv?: string|null;
        /**IxpZve*/
		ixpZve?: string|null;
        /**IxsZve*/
		ixsZve?: string|null;
	}
	const enum GZverejneniPodaniDtoNames { ixp = "ixp", ixsZpv = "ixsZpv", ixpZve = "ixpZve", ixsZve = "ixsZve",}
	const enum GZverejneniPodaniDtoFragments { ixp = "*", ixsZpv = "*", ixpZve = "*", ixsZve = "*",}
	const enum GZverejneniPodaniDtoTypes { ixp = "string", ixsZpv = "string", ixpZve = "string", ixsZve = "string",}
	interface GZverejneniPodaniStornoDto extends Gordic.Wfl.WebClient.GZverejneniPodaniDto {
		duvod?: string|null;
	}
	const enum GZverejneniPodaniStornoDtoNames { duvod = "duvod", ixp = "ixp", ixsZpv = "ixsZpv", ixpZve = "ixpZve", ixsZve = "ixsZve",}
	const enum GZverejneniPodaniStornoDtoFragments { duvod = "*", ixp = "*", ixsZpv = "*", ixpZve = "*", ixsZve = "*",}
	const enum GZverejneniPodaniStornoDtoTypes { duvod = "string", ixp = "string", ixsZpv = "string", ixpZve = "string", ixsZve = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zverejneni\GZverejneniSmluvPlanDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Zverejneni smluv plan - seznamove DTO*/
	interface GZverejneniSmluvPlanDto {
		/**Muze planovat*/
		canPlanovat?: boolean|null;
		/**Muze podat*/
		canPodat?: boolean|null;
		/**Muze opravit*/
		canOpravit?: boolean|null;
		/**Muze pridat prilohu*/
		canPridatPrilohu?: boolean|null;
		/**Muze zrusit*/
		canZrusit?: boolean|null;
		/**Autogenerated.*/
		ixs_zpv?: string|null;
		/**Autogenerated.*/
		ixs_zpv_txt?: string|null;
		/**Autogenerated.*/
		ixp_orig?: string|null;
		/**Autogenerated.*/
		plan_zve?: number|null;
		/**Autogenerated.*/
		plan_zve_txt?: string|null;
		/**Autogenerated.*/
		stav_zpv?: number|null;
		/**Autogenerated.*/
		stav_zpv_txt?: string|null;
		/**Autogenerated.*/
		dat_zve?: JsonDate|null;
		/**Autogenerated.*/
		termin_zve?: JsonDate|null;
		/**Autogenerated.*/
		ixs_zmp_zve?: string|null;
		/**Autogenerated.*/
		ixs_zmp_zve_txt?: string|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		dat_mpd0?: JsonDate|null;
		/**Autogenerated.*/
		id_zve?: string|null;
		/**Autogenerated.*/
		ixp_zve?: string|null;
		/**Autogenerated.*/
		zmena?: number|null;
		/**Autogenerated.*/
		poradi?: number|null;
		/**Autogenerated.*/
		duvod_nezverejneni?: string|null;
		/**Autogenerated.*/
		ktg_zve?: number|null;
		/**Autogenerated.*/
		ixs_fun_akt?: string|null;
	}
	const enum GZverejneniSmluvPlanDtoNames { canPlanovat = "canPlanovat", canPodat = "canPodat", canOpravit = "canOpravit", canPridatPrilohu = "canPridatPrilohu", canZrusit = "canZrusit", ixs_zpv = "ixs_zpv", ixs_zpv_txt = "ixs_zpv_txt", ixp_orig = "ixp_orig", plan_zve = "plan_zve", plan_zve_txt = "plan_zve_txt", stav_zpv = "stav_zpv", stav_zpv_txt = "stav_zpv_txt", dat_zve = "dat_zve", termin_zve = "termin_zve", ixs_zmp_zve = "ixs_zmp_zve", ixs_zmp_zve_txt = "ixs_zmp_zve_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_mpd0 = "dat_mpd0", id_zve = "id_zve", ixp_zve = "ixp_zve", zmena = "zmena", poradi = "poradi", duvod_nezverejneni = "duvod_nezverejneni", ktg_zve = "ktg_zve", ixs_fun_akt = "ixs_fun_akt",}
	const enum GZverejneniSmluvPlanDtoFragments { canPlanovat = "*", canPodat = "*", canOpravit = "*", canPridatPrilohu = "*", canZrusit = "*", ixs_zpv = "*", ixs_zpv_txt = "*", ixp_orig = "*", plan_zve = "*", plan_zve_txt = "*", stav_zpv = "*", stav_zpv_txt = "*", dat_zve = "*", termin_zve = "*", ixs_zmp_zve = "*", ixs_zmp_zve_txt = "*", dat_zmena = "*", zmenu_prov = "*", dat_mpd0 = "*", id_zve = "*", ixp_zve = "*", zmena = "*", poradi = "*", duvod_nezverejneni = "*", ktg_zve = "*", ixs_fun_akt = "*",}
	const enum GZverejneniSmluvPlanDtoTypes { canPlanovat = "boolean", canPodat = "boolean", canOpravit = "boolean", canPridatPrilohu = "boolean", canZrusit = "boolean", ixs_zpv = "string", ixs_zpv_txt = "string", ixp_orig = "string", plan_zve = "number", plan_zve_txt = "string", stav_zpv = "number", stav_zpv_txt = "string", dat_zve = "JsonDate", termin_zve = "JsonDate", ixs_zmp_zve = "string", ixs_zmp_zve_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", dat_mpd0 = "JsonDate", id_zve = "string", ixp_zve = "string", zmena = "number", poradi = "number", duvod_nezverejneni = "string", ktg_zve = "number", ixs_fun_akt = "string",}
	const enum GZverejneniSmluvPlanDtoTypeLengths { ixs_zpv = 12, ixs_zpv_txt = 50, ixp_orig = 12, plan_zve_txt = 50, stav_zpv_txt = 50, ixs_zmp_zve = 12, ixs_zmp_zve_txt = 254, zmenu_prov = 12, id_zve = 100, ixp_zve = 12, duvod_nezverejneni = 254, ixs_fun_akt = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.WebClient\Gin\Wfl\Zverejneni\GZverejneniSmluvSeznamDto.d.ts 

declare namespace Gordic.Wfl.WebClient {
	/**Zverejneni smluv - seznamove dto*/
	interface GZverejneniSmluvSeznamDto {
		/**Lze provest storno*/
		canStorno?: boolean|null;
		/**Lze dokoncit*/
		canDokoncit?: boolean|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Autogenerated.*/
		ixp_orig?: string|null;
		/**Autogenerated.*/
		ixs_zve?: string|null;
		/**Autogenerated.*/
		ixp_zve?: string|null;
		/**Autogenerated.*/
		ixs_fun_od?: string|null;
		/**Autogenerated.*/
		ixs_zpv?: string|null;
		/**Autogenerated.*/
		ixs_zpv_txt?: string|null;
		/**Autogenerated.*/
		ixs_typ_orig?: string|null;
		/**Autogenerated.*/
		ixs_typ_orig_txt?: string|null;
		/**Autogenerated.*/
		akt_znacka?: string|null;
		/**Autogenerated.*/
		ixs_fun_akt?: string|null;
		/**Autogenerated.*/
		ixp_nad?: string|null;
		/**Autogenerated.*/
		ixs_zve_nad?: string|null;
		/**Autogenerated.*/
		s_odes_epk?: number|null;
		/**Autogenerated.*/
		operace?: number|null;
		/**Autogenerated.*/
		operace_txt?: string|null;
		/**Autogenerated.*/
		stav_zadosti?: number|null;
		/**Autogenerated.*/
		stav_zadosti_txt?: string|null;
		/**Autogenerated.*/
		predmet?: string|null;
		/**Autogenerated.*/
		predmet_popis?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		ixs_spd?: string|null;
		/**Autogenerated.*/
		typ_ag?: number|null;
		/**Autogenerated.*/
		typ_ag_orig?: number|null;
		/**Autogenerated.*/
		stav_zve?: number|null;
		/**Autogenerated.*/
		zakazane_el_prilohy?: number|null;
		/**Autogenerated.*/
		stav_zve_txt?: string|null;
		/**Autogenerated.*/
		dat_zve?: JsonDate|null;
		/**Autogenerated.*/
		id_zve?: string|null;
		/**Autogenerated.*/
		ixs_zmp_zve?: string|null;
		/**Autogenerated.*/
		dat_podani?: JsonDate|null;
		/**Autogenerated.*/
		nazev?: string|null;
		/**Autogenerated.*/
		dat_schval?: JsonDate|null;
		/**Autogenerated.*/
		ixs_zmp_schval?: string|null;
		/**Autogenerated.*/
		ktg_dms?: string|null;
		/**Autogenerated.*/
		dat_od?: JsonDate|null;
		/**Autogenerated.*/
		dat_do?: JsonDate|null;
		/**Autogenerated.*/
		ixs_zmp_schval_txt?: string|null;
		/**Autogenerated.*/
		priz_epk?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		zmenu_prov?: string|null;
		/**Autogenerated.*/
		zmenu_prov_txt?: string|null;
		/**Autogenerated.*/
		ktg_zve?: number|null;
		/**Autogenerated.*/
		url_zve?: string|null;
		/**Autogenerated.*/
		ixb_eodpoved?: string|null;
	}
	const enum GZverejneniSmluvSeznamDtoNames { canStorno = "canStorno", canDokoncit = "canDokoncit", ixp = "ixp", ixp_orig = "ixp_orig", ixs_zve = "ixs_zve", ixp_zve = "ixp_zve", ixs_fun_od = "ixs_fun_od", ixs_zpv = "ixs_zpv", ixs_zpv_txt = "ixs_zpv_txt", ixs_typ_orig = "ixs_typ_orig", ixs_typ_orig_txt = "ixs_typ_orig_txt", akt_znacka = "akt_znacka", ixs_fun_akt = "ixs_fun_akt", ixp_nad = "ixp_nad", ixs_zve_nad = "ixs_zve_nad", s_odes_epk = "s_odes_epk", operace = "operace", operace_txt = "operace_txt", stav_zadosti = "stav_zadosti", stav_zadosti_txt = "stav_zadosti_txt", predmet = "predmet", predmet_popis = "predmet_popis", poznamka = "poznamka", ixs_spd = "ixs_spd", typ_ag = "typ_ag", typ_ag_orig = "typ_ag_orig", stav_zve = "stav_zve", zakazane_el_prilohy = "zakazane_el_prilohy", stav_zve_txt = "stav_zve_txt", dat_zve = "dat_zve", id_zve = "id_zve", ixs_zmp_zve = "ixs_zmp_zve", dat_podani = "dat_podani", nazev = "nazev", dat_schval = "dat_schval", ixs_zmp_schval = "ixs_zmp_schval", ktg_dms = "ktg_dms", dat_od = "dat_od", dat_do = "dat_do", ixs_zmp_schval_txt = "ixs_zmp_schval_txt", priz_epk = "priz_epk", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", ktg_zve = "ktg_zve", url_zve = "url_zve", ixb_eodpoved = "ixb_eodpoved",}
	const enum GZverejneniSmluvSeznamDtoFragments { canStorno = "*", canDokoncit = "*", ixp = "*", ixp_orig = "*", ixs_zve = "*", ixp_zve = "*", ixs_fun_od = "*", ixs_zpv = "*", ixs_zpv_txt = "*", ixs_typ_orig = "*", ixs_typ_orig_txt = "*", akt_znacka = "*", ixs_fun_akt = "*", ixp_nad = "*", ixs_zve_nad = "*", s_odes_epk = "*", operace = "*", operace_txt = "*", stav_zadosti = "*", stav_zadosti_txt = "*", predmet = "*", predmet_popis = "*", poznamka = "*", ixs_spd = "*", typ_ag = "*", typ_ag_orig = "*", stav_zve = "*", zakazane_el_prilohy = "*", stav_zve_txt = "*", dat_zve = "*", id_zve = "*", ixs_zmp_zve = "*", dat_podani = "*", nazev = "*", dat_schval = "*", ixs_zmp_schval = "*", ktg_dms = "*", dat_od = "*", dat_do = "*", ixs_zmp_schval_txt = "*", priz_epk = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", ktg_zve = "*", url_zve = "*", ixb_eodpoved = "*",}
	const enum GZverejneniSmluvSeznamDtoTypes { canStorno = "boolean", canDokoncit = "boolean", ixp = "string", ixp_orig = "string", ixs_zve = "string", ixp_zve = "string", ixs_fun_od = "string", ixs_zpv = "string", ixs_zpv_txt = "string", ixs_typ_orig = "string", ixs_typ_orig_txt = "string", akt_znacka = "string", ixs_fun_akt = "string", ixp_nad = "string", ixs_zve_nad = "string", s_odes_epk = "number", operace = "number", operace_txt = "string", stav_zadosti = "number", stav_zadosti_txt = "string", predmet = "string", predmet_popis = "string", poznamka = "string", ixs_spd = "string", typ_ag = "number", typ_ag_orig = "number", stav_zve = "number", zakazane_el_prilohy = "number", stav_zve_txt = "string", dat_zve = "JsonDate", id_zve = "string", ixs_zmp_zve = "string", dat_podani = "JsonDate", nazev = "string", dat_schval = "JsonDate", ixs_zmp_schval = "string", ktg_dms = "string", dat_od = "JsonDate", dat_do = "JsonDate", ixs_zmp_schval_txt = "string", priz_epk = "number", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", ktg_zve = "number", url_zve = "string", ixb_eodpoved = "string",}
	const enum GZverejneniSmluvSeznamDtoTypeLengths { ixp_orig = 12, ixs_zve = 12, ixp_zve = 12, ixs_fun_od = 12, ixs_zpv = 12, ixs_zpv_txt = 50, ixs_typ_orig = 12, ixs_typ_orig_txt = 50, akt_znacka = 50, ixs_fun_akt = 12, ixp_nad = 12, ixs_zve_nad = 12, operace_txt = 50, stav_zadosti_txt = 50, predmet = 254, predmet_popis = 257, poznamka = 254, ixs_spd = 12, stav_zve_txt = 50, id_zve = 100, ixs_zmp_zve = 12, nazev = 103, ixs_zmp_schval = 12, ktg_dms = 50, ixs_zmp_schval_txt = 254, zmenu_prov = 12, zmenu_prov_txt = 254, url_zve = 254,}
}

//#endregion

