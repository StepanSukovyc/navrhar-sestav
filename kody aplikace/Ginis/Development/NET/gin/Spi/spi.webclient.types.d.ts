/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       spi.webclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Spi.WebClient\Gordic.Spi.WebClient.csproj
*    created     2026-02-16 14:33:47
*    files       Gin\Spi\AppSettings\GSpiSettingsDto.d.ts
*                Gin\Spi\Details\Balik\Dto\GDetailBalikuDto.d.ts
*                Gin\Spi\Details\Balik\Dto\GGenerujSIPBalikyObsahuBalikuInputDataDto.d.ts
*                Gin\Spi\Details\Balik\Dto\GNacteniInformaciZNdaDto.d.ts
*                Gin\Spi\Details\Balik\Dto\GTiskStitkuDto.d.ts
*                Gin\Spi\Details\Balik\Dto\GVlozitDokumentSpisDoBalikuDto.d.ts
*                Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailBalikuComponentDto.d.ts
*                Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailBalikuHistoryComponentDto.d.ts
*                Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailBalikuObsahComponentDto.d.ts
*                Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailNeevidovanehoDokumentuSpisuComponentDto.d.ts
*                Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailUloznehoMistaComponentDto.d.ts
*                Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailVypujcnihoListkuComponentDto.d.ts
*                Gin\Spi\Details\NeevidovanyDokumnetSpis\Dto\GDetailNeevidovanehoDokumentuSpisuDto.d.ts
*                Gin\Spi\Details\UlozneMisto\Dto\GDetailUloznehoMistaDto.d.ts
*                Gin\Spi\Details\VypujcniListek\Dto\GDetailVypujcnihoListkuDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\AppSettings\GSpiSettingsDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	/**Dto uživatelského nastavení SPI v UserSettings (GStore)*/
	interface GSpiSettingsDto extends Gordic.Wfl.WebClient.GWflBaseSettingsDto {
		/**generovat SIP asynchronně (na pozadí)*/
		GenerovatSIPAsync?: boolean|null;
		/**mazat asynchronně (na pozadí)*/
		MazatMetadataAsync?: boolean|null;
		/**prevzit asynchronně (na pozadí)*/
		PrevzetiDoSpisovnyAsync?: boolean|null;
		/**Prednastavit přeávající funkci*/
		PrednastavitPredFun?: boolean|null;
		/**ixs vychozi spisovny*/
		VychoziSpisovna?: object|null;
	}
	const enum GSpiSettingsDtoNames { GenerovatSIPAsync = "GenerovatSIPAsync", MazatMetadataAsync = "MazatMetadataAsync", PrevzetiDoSpisovnyAsync = "PrevzetiDoSpisovnyAsync", PrednastavitPredFun = "PrednastavitPredFun", VychoziSpisovna = "VychoziSpisovna", spustitPosledniTask = "spustitPosledniTask",}
	const enum GSpiSettingsDtoFragments { GenerovatSIPAsync = "*", MazatMetadataAsync = "*", PrevzetiDoSpisovnyAsync = "*", PrednastavitPredFun = "*", VychoziSpisovna = "*", spustitPosledniTask = "*",}
	const enum GSpiSettingsDtoTypes { GenerovatSIPAsync = "boolean", MazatMetadataAsync = "boolean", PrevzetiDoSpisovnyAsync = "boolean", PrednastavitPredFun = "boolean", VychoziSpisovna = "object", spustitPosledniTask = "boolean",}
	const enum GSpiSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\Balik\Dto\GDetailBalikuDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	interface GPrepocetBalikuDleObsahuRetValDto {
		/**Gets or sets the rok skartace.*/
		RokSkartace?: number|null;
		/**Gets or sets the rok predani spra.*/
		RokPredaniSpra?: number|null;
		/**RokOd - RokDo*/
		CasovyRozsahDokumentu?: GIntervalDto<number>|null;
	}
	const enum GPrepocetBalikuDleObsahuRetValDtoNames { RokSkartace = "RokSkartace", RokPredaniSpra = "RokPredaniSpra", CasovyRozsahDokumentu = "CasovyRozsahDokumentu",}
	const enum GPrepocetBalikuDleObsahuRetValDtoFragments { RokSkartace = "*", RokPredaniSpra = "*", CasovyRozsahDokumentu = "*",}
	const enum GPrepocetBalikuDleObsahuRetValDtoTypes { RokSkartace = "number", RokPredaniSpra = "number", CasovyRozsahDokumentu = "GIntervalDto<number>",}
	const enum GPrepocetBalikuDleObsahuRetValDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\Balik\Dto\GGenerujSIPBalikyObsahuBalikuInputDataDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	/**GGenerujSIPBalikyObsahuBalikuInputDto*/
	interface GGenerujSIPBalikyObsahuBalikuInputDto {
		/**Gets or sets the ixps.*/
		Ixps?: string[]|null;
		/**Gets or sets the typ generovaneho balicku dle prijemce.*/
		TypGenerovanehoBalickuDlePrijemce?: Gordic.Wfl.Interface.TypGenerovanehoBalickuDlePrijemce|null;
	}
	const enum GGenerujSIPBalikyObsahuBalikuInputDtoNames { Ixps = "Ixps", TypGenerovanehoBalickuDlePrijemce = "TypGenerovanehoBalickuDlePrijemce",}
	const enum GGenerujSIPBalikyObsahuBalikuInputDtoFragments { Ixps = "*", TypGenerovanehoBalickuDlePrijemce = "*",}
	const enum GGenerujSIPBalikyObsahuBalikuInputDtoTypes { Ixps = "string[]", TypGenerovanehoBalickuDlePrijemce = "Gordic.Wfl.Interface.TypGenerovanehoBalickuDlePrijemce",}
	const enum GGenerujSIPBalikyObsahuBalikuInputDtoTypeLengths {}
	/**GGenerujSIPBalikyObsahuBalikuOutputIxpDto*/
	interface GGenerujSIPBalikyObsahuBalikuOutputIxpDto {
		/**Gets or sets the ixp.*/
		Ixp?: string|null;
		/**Gets or sets the success.*/
		Success?: boolean|null;
		/**Gets or sets the report.*/
		Report?: string|null;
	}
	const enum GGenerujSIPBalikyObsahuBalikuOutputIxpDtoNames { Ixp = "Ixp", Success = "Success", Report = "Report",}
	const enum GGenerujSIPBalikyObsahuBalikuOutputIxpDtoFragments { Ixp = "*", Success = "*", Report = "*",}
	const enum GGenerujSIPBalikyObsahuBalikuOutputIxpDtoTypes { Ixp = "string", Success = "boolean", Report = "string",}
	const enum GGenerujSIPBalikyObsahuBalikuOutputIxpDtoTypeLengths {}
	/**GGenerujSIPBalikyObsahuBalikuOutputDto*/
	interface GGenerujSIPBalikyObsahuBalikuOutputDto {
		/**Gets or sets the report.*/
		Report?: string|null;
		/**Gets or sets the ixps information.*/
		IxpsInfo?: Gordic.Spi.WebClient.GGenerujSIPBalikyObsahuBalikuOutputIxpDto[]|null;
		/**Gets or sets the file unique identifier.*/
		FileGuid?: string|null;
	}
	const enum GGenerujSIPBalikyObsahuBalikuOutputDtoNames { Report = "Report", IxpsInfo = "IxpsInfo", FileGuid = "FileGuid",}
	const enum GGenerujSIPBalikyObsahuBalikuOutputDtoFragments { Report = "*", IxpsInfo = "*", FileGuid = "*",}
	const enum GGenerujSIPBalikyObsahuBalikuOutputDtoTypes { Report = "string", IxpsInfo = "Gordic.Spi.WebClient.GGenerujSIPBalikyObsahuBalikuOutputIxpDto[]", FileGuid = "string",}
	const enum GGenerujSIPBalikyObsahuBalikuOutputDtoTypeLengths {}
	/**GGenerujSIPBalikyInputDto*/
	interface GGenerujSIPBalikyInputDto {
		/**Identifikátor balíku.*/
		IxsZup?: string|null;
		/**Gets or sets the typ generovaneho balicku dle prijemce.*/
		TypGenerovanehoBalickuDlePrijemce?: Gordic.Wfl.Interface.TypGenerovanehoBalickuDlePrijemce|null;
	}
	const enum GGenerujSIPBalikyInputDtoNames { IxsZup = "IxsZup", TypGenerovanehoBalickuDlePrijemce = "TypGenerovanehoBalickuDlePrijemce",}
	const enum GGenerujSIPBalikyInputDtoFragments { IxsZup = "*", TypGenerovanehoBalickuDlePrijemce = "*",}
	const enum GGenerujSIPBalikyInputDtoTypes { IxsZup = "string", TypGenerovanehoBalickuDlePrijemce = "Gordic.Wfl.Interface.TypGenerovanehoBalickuDlePrijemce",}
	const enum GGenerujSIPBalikyInputDtoTypeLengths {}
	/**GGenerujSIPBalikyOutputDto*/
	interface GGenerujSIPBalikyOutputDto {
		/**Guid souboru ke stažení.*/
		FileGuid?: string|null;
		/**Guid souboru ke stažení.*/
		Info?: string|null;
	}
	const enum GGenerujSIPBalikyOutputDtoNames { FileGuid = "FileGuid", Info = "Info",}
	const enum GGenerujSIPBalikyOutputDtoFragments { FileGuid = "*", Info = "*",}
	const enum GGenerujSIPBalikyOutputDtoTypes { FileGuid = "string", Info = "string",}
	const enum GGenerujSIPBalikyOutputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\Balik\Dto\GNacteniInformaciZNdaDto.d.ts 

declare namespace Gordic.Spi.WebClient {
    /**GNacteniInformaciZNdaDto.*/
	interface GNacteniInformaciZNdaInputDto {
		Davka?: Gordic.Spi.Interface.GSkartRizeniDleNDAStru[]|null;
		TypDavky?: Gordic.Spi.Interface.TypDavkyZNDA|null;
		TypSeznamuSpi?: Gordic.Spi.Interface.TypZobrazeniSeznamuSpi|null;
        /**Pridá hlásku.*/
		ShowInfoONutnemReloadu?: boolean|null;
        /**Neni uveden seznam, nad kterým se operace provadi.*/
		Anonymne?: boolean|null;
        /**Gets or sets the file.*/
		File?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
	}
	const enum GNacteniInformaciZNdaInputDtoNames { Davka = "Davka", TypDavky = "TypDavky", TypSeznamuSpi = "TypSeznamuSpi", ShowInfoONutnemReloadu = "ShowInfoONutnemReloadu", Anonymne = "Anonymne", File = "File",}
	const enum GNacteniInformaciZNdaInputDtoFragments { Davka = "*", TypDavky = "*", TypSeznamuSpi = "*", ShowInfoONutnemReloadu = "*", Anonymne = "*", File = "*",}
	const enum GNacteniInformaciZNdaInputDtoTypes { Davka = "Gordic.Spi.Interface.GSkartRizeniDleNDAStru[]", TypDavky = "Gordic.Spi.Interface.TypDavkyZNDA", TypSeznamuSpi = "Gordic.Spi.Interface.TypZobrazeniSeznamuSpi", ShowInfoONutnemReloadu = "boolean", Anonymne = "boolean", File = "Gordic.General.ApplicationInterface.GFileInfoDto",}
    /**GNacteniInformaciZNdaPreActionInputDto*/
	interface GNacteniInformaciZNdaPreActionInputDto {
		Davka?: Gordic.Spi.Interface.GSkartRizeniDleNDAStru[]|null;
	}
	const enum GNacteniInformaciZNdaPreActionInputDtoNames { Davka = "Davka",}
	const enum GNacteniInformaciZNdaPreActionInputDtoFragments { Davka = "*",}
	const enum GNacteniInformaciZNdaPreActionInputDtoTypes { Davka = "Gordic.Spi.Interface.GSkartRizeniDleNDAStru[]",}
    /**GNacteniInformaciZNdaOutputDto.*/
	interface GNacteniInformaciZNdaOutputDto {
        /**Gets or sets the result.*/
		Result?: any|null;
        /**Gets or sets the type of the result.*/
		ResultType?: Gordic.Gin.Interface.TypVysledkuOperace|null;
        /**Gets or sets the ixs skar.*/
		IxsSkar?: string|null;
        /**Gets or sets the zmena.*/
		Zmena?: boolean|null;
        /**Gets or sets the information.*/
		Info?: string|null;
	}
	const enum GNacteniInformaciZNdaOutputDtoNames { Result = "Result", ResultType = "ResultType", IxsSkar = "IxsSkar", Zmena = "Zmena", Info = "Info",}
	const enum GNacteniInformaciZNdaOutputDtoFragments { Result = "*", ResultType = "*", IxsSkar = "*", Zmena = "*", Info = "*",}
	const enum GNacteniInformaciZNdaOutputDtoTypes { Result = "any", ResultType = "Gordic.Gin.Interface.TypVysledkuOperace", IxsSkar = "string", Zmena = "boolean", Info = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\Balik\Dto\GTiskStitkuDto.d.ts 

declare namespace Gordic.Spi.WebClient {
    /**GTiskStitkuDto*/
	interface GTiskStitkuDto {
        /**OdStitku*/
		OdStitku?: number|null;
        /**ProVsechnyKrabice*/
		ProVsechnyKrabice?: boolean|null;
	}
	const enum GTiskStitkuDtoNames { OdStitku = "OdStitku", ProVsechnyKrabice = "ProVsechnyKrabice",}
	const enum GTiskStitkuDtoFragments { OdStitku = "*", ProVsechnyKrabice = "*",}
	const enum GTiskStitkuDtoTypes { OdStitku = "number", ProVsechnyKrabice = "boolean",}
	const enum TypTiskuStitkuEnum {
        /**neurceno*/
        neurceno,
        /**baliku*/
        baliku,
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\Balik\Dto\GVlozitDokumentSpisDoBalikuDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	/**GVlozitDokumentSpisDoBalikuInputDto*/
	interface GVlozitDokumentSpisDoBalikuInputDto {
		/**Příznak, zda se má vložení balíku provést, i pokud kontrola objeví problém.*/
		SouhlasSDotazemKontrolyMoznostiVlozeni?: boolean|null;
		/**Příznak, zda se má do balíku vložit i párový dokument.*/
		VlozitParovyDokument?: boolean|null;
		/**Ixs balíku, do kterého vkládáme písemnost.*/
		IxsZup?: string|null;
		/**Ixp (pid) vkládané písemnosti.*/
		Ixp?: string|null;
		/**(Default: true) Příznak, zda se mají validační chyby vyhazovat jako vyjímky [true], nebo pouze jako result error [false].*/
		ThrowNonFatalExceptions?: boolean|null;
	}
	const enum GVlozitDokumentSpisDoBalikuInputDtoNames { SouhlasSDotazemKontrolyMoznostiVlozeni = "SouhlasSDotazemKontrolyMoznostiVlozeni", VlozitParovyDokument = "VlozitParovyDokument", IxsZup = "IxsZup", Ixp = "Ixp", ThrowNonFatalExceptions = "ThrowNonFatalExceptions",}
	const enum GVlozitDokumentSpisDoBalikuInputDtoFragments { SouhlasSDotazemKontrolyMoznostiVlozeni = "*", VlozitParovyDokument = "*", IxsZup = "*", Ixp = "*", ThrowNonFatalExceptions = "*",}
	const enum GVlozitDokumentSpisDoBalikuInputDtoTypes { SouhlasSDotazemKontrolyMoznostiVlozeni = "boolean", VlozitParovyDokument = "boolean", IxsZup = "string", Ixp = "string", ThrowNonFatalExceptions = "boolean",}
	const enum GVlozitDokumentSpisDoBalikuInputDtoTypeLengths {}
	/**GVlozitDokumentSpisDoBalikuPreActionInputDto*/
	interface GVlozitDokumentSpisDoBalikuPreActionInputDto {
		/**Ixs balíku, do kterého vkládáme písemnost.*/
		IxsZup?: string|null;
		/**Pole Ixp (pid) vkládaných písemnosti.*/
		Ixps?: string[]|null;
		/**(Default: LoopUntilCancel) Příznak, zda se má po chybě při vkládání dokument do balíku akce ukončit vyjímkou [false], nebo pokračovat pokusem o vloženídalšího [true].*/
		ContinueWhenInsertFails?: boolean|null;
		/**(Default: false) Příznak, zda se má vkládání dokumentu pokračovat vkládáním dalších dokumentů dokud není akce přerušena uživatelem [true].
		*     Zároveň nastaví ContinueWhenInsertFails na [true] a zakáže zobrazení flashmessage, které je nutno zobrazit manuálně dle výsledku.
		*/
		LoopUntilCancel?: boolean|null;
		/**Pole s udajy pro zjištění vložení do balíku*/
		SelectedGDataAkceSslProfil?: Gordic.Wfl.Interface.GSslProfilStruktura[]|null;
		/**Příznak, zda se má balík vytvářet v režimu spisovny.
		*     Tento příznak je použit pro seznam balíků pro případ, že uživatel balík nevybere, ale ze seznamu zakládá nový.
		*/
		IsRezimSpisovna?: boolean|null;
	}
	const enum GVlozitDokumentSpisDoBalikuPreActionInputDtoNames { IxsZup = "IxsZup", Ixps = "Ixps", ContinueWhenInsertFails = "ContinueWhenInsertFails", LoopUntilCancel = "LoopUntilCancel", SelectedGDataAkceSslProfil = "SelectedGDataAkceSslProfil", IsRezimSpisovna = "IsRezimSpisovna",}
	const enum GVlozitDokumentSpisDoBalikuPreActionInputDtoFragments { IxsZup = "*", Ixps = "*", ContinueWhenInsertFails = "*", LoopUntilCancel = "*", SelectedGDataAkceSslProfil = "*", IsRezimSpisovna = "*",}
	const enum GVlozitDokumentSpisDoBalikuPreActionInputDtoTypes { IxsZup = "string", Ixps = "string[]", ContinueWhenInsertFails = "boolean", LoopUntilCancel = "boolean", SelectedGDataAkceSslProfil = "Gordic.Wfl.Interface.GSslProfilStruktura[]", IsRezimSpisovna = "boolean",}
	const enum GVlozitDokumentSpisDoBalikuPreActionInputDtoTypeLengths {}
	/**GVlozitDokumentSpisDoBalikuOutputDto*/
	interface GVlozitDokumentSpisDoBalikuOutputDto {
		/**Příznak, zda je nutno rozhodnout o kontrole vkládané písemnosti do balíku.*/
		KontrolaMoznostiVlozeni?: boolean|null;
		/**Text zobrazený uživateli k rozhodnutí (yes/no) ohledně kontroly možnosti vložení písemnosti do balíku.*/
		KontrolaMoznostiVlozeniDotaz?: string|null;
		/**Příznak, zda je nutno rozhodnout o vložení párového dokumentu.*/
		ParovyDokumentKVlozeni?: boolean|null;
		/**Text zobrazený uživateli k rozhodnutí (yes/no) zda se má do balíku vložit i párová písemnost.*/
		ParovyDokumentKVlozeniDotaz?: string|null;
	}
	const enum GVlozitDokumentSpisDoBalikuOutputDtoNames { KontrolaMoznostiVlozeni = "KontrolaMoznostiVlozeni", KontrolaMoznostiVlozeniDotaz = "KontrolaMoznostiVlozeniDotaz", ParovyDokumentKVlozeni = "ParovyDokumentKVlozeni", ParovyDokumentKVlozeniDotaz = "ParovyDokumentKVlozeniDotaz",}
	const enum GVlozitDokumentSpisDoBalikuOutputDtoFragments { KontrolaMoznostiVlozeni = "*", KontrolaMoznostiVlozeniDotaz = "*", ParovyDokumentKVlozeni = "*", ParovyDokumentKVlozeniDotaz = "*",}
	const enum GVlozitDokumentSpisDoBalikuOutputDtoTypes { KontrolaMoznostiVlozeni = "boolean", KontrolaMoznostiVlozeniDotaz = "string", ParovyDokumentKVlozeni = "boolean", ParovyDokumentKVlozeniDotaz = "string",}
	const enum GVlozitDokumentSpisDoBalikuOutputDtoTypeLengths {}
	/**GVlozitDokumentSpisDoBalikuOutputWithUserChoicesDto*/
	interface GVlozitDokumentSpisDoBalikuOutputUserChoicesDto {
		/**Příznak, zda je nutno rozhodnout o kontrole vkládané písemnosti do balíku.*/
		KontrolaMoznostiVlozeniUserChoice?: boolean|null;
		/**Příznak, zda je nutno rozhodnout o vložení párového dokumentu.*/
		ParovyDokumentKVlozeniUserChoice?: boolean|null;
	}
	const enum GVlozitDokumentSpisDoBalikuOutputUserChoicesDtoNames { KontrolaMoznostiVlozeniUserChoice = "KontrolaMoznostiVlozeniUserChoice", ParovyDokumentKVlozeniUserChoice = "ParovyDokumentKVlozeniUserChoice",}
	const enum GVlozitDokumentSpisDoBalikuOutputUserChoicesDtoFragments { KontrolaMoznostiVlozeniUserChoice = "*", ParovyDokumentKVlozeniUserChoice = "*",}
	const enum GVlozitDokumentSpisDoBalikuOutputUserChoicesDtoTypes { KontrolaMoznostiVlozeniUserChoice = "boolean", ParovyDokumentKVlozeniUserChoice = "boolean",}
	const enum GVlozitDokumentSpisDoBalikuOutputUserChoicesDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailBalikuComponentDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	interface GSpiDetailBalikuComponentDto {
		/**Gets or sets the balik.*/
		Balik?: Gordic.Spi.Interface.GBalikDto|null;
		/**Validátory.*/
		readonly BalikValidators?: object|null;
		/**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
		/**Gets or sets the aktualni spisovna.*/
		AktualniSpisovna?: string|null;
		/**Kontrola volného místa v úložném místě????*/
		KontrolaVolnehoMistaVUlozisti?: number|null;
		/**Pokud je true, pak je dialog po úspěšném uložení automaticky zavřen.*/
		CloseAfterSave?: boolean|null;
		/**GIN - ŘP povolení používání dvojitých skartačních lhůt pro správní archiv.
		*     
		*     Parametr pro povolení používání dvojitých skartačních lhůt (např A5/10) pro převední dokumentů ze spisovny 
		*     do správního archivu po uplynutí první lhůty a jejich následné skartování dle druhé lhůty => po 5-ti letech je 
		*     balík převeden do správního archivua následně po 5-ti letech je provedeno skartační řízení. 
		*     
		*     0 - Ne - zakázání používání dvojitých skartačních lhůt pro správní archiv.
		*     1 - Ano - povolení používání dvojitých skartačních lhůt pro správní archiv.
		*/
		gin_rad_skarldv?: number|null;
		/**skart.rizeni po entitach*/
		IfSkartRizeniPoEntitach?: boolean|null;
		/**Příznak, zda je fáze (modul) typu spisovna.*/
		readonly IsFazeTypuSpisovna?: boolean|null;
		/**Gets the is poznamkovy blok baliku.*/
		readonly IsPoznamkovyBlokBaliku?: boolean|null;
		/**Identifikátor poznámkového bloku balíků.*/
		IxsBlpBaliku?: string|null;
		/**Identifikátor funkec aktuálně přihlášeného uživatele.*/
		IxsFunPrihlasenehoUzivatele?: string|null;
		/**Příznak, zda se má balík vytvářet v režimu spisovny.*/
		IsRezimSpisovna?: boolean|null;
		RokSkartaceMinimumValue?: Gordic.Spi.Interface.GBalikGetRokSkartaceMinimumValueResponseDto|null;
		/**Příznak použití věcnéí skupiny.*/
		IfVecneSkupiny?: boolean|null;
	}
	const enum GSpiDetailBalikuComponentDtoNames { Balik = "Balik", BalikValidators = "BalikValidators", TypZobrazeniDetailu = "TypZobrazeniDetailu", AktualniSpisovna = "AktualniSpisovna", KontrolaVolnehoMistaVUlozisti = "KontrolaVolnehoMistaVUlozisti", CloseAfterSave = "CloseAfterSave", gin_rad_skarldv = "gin_rad_skarldv", IfSkartRizeniPoEntitach = "IfSkartRizeniPoEntitach", IsFazeTypuSpisovna = "IsFazeTypuSpisovna", IsPoznamkovyBlokBaliku = "IsPoznamkovyBlokBaliku", IxsBlpBaliku = "IxsBlpBaliku", IxsFunPrihlasenehoUzivatele = "IxsFunPrihlasenehoUzivatele", IsRezimSpisovna = "IsRezimSpisovna", RokSkartaceMinimumValue = "RokSkartaceMinimumValue", IfVecneSkupiny = "IfVecneSkupiny",}
	const enum GSpiDetailBalikuComponentDtoFragments { Balik = "*", BalikValidators = "*", TypZobrazeniDetailu = "*", AktualniSpisovna = "*", KontrolaVolnehoMistaVUlozisti = "*", CloseAfterSave = "*", gin_rad_skarldv = "*", IfSkartRizeniPoEntitach = "*", IsFazeTypuSpisovna = "*", IsPoznamkovyBlokBaliku = "*", IxsBlpBaliku = "*", IxsFunPrihlasenehoUzivatele = "*", IsRezimSpisovna = "*", RokSkartaceMinimumValue = "*", IfVecneSkupiny = "*",}
	const enum GSpiDetailBalikuComponentDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto", BalikValidators = "object", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", AktualniSpisovna = "string", KontrolaVolnehoMistaVUlozisti = "number", CloseAfterSave = "boolean", gin_rad_skarldv = "number", IfSkartRizeniPoEntitach = "boolean", IsFazeTypuSpisovna = "boolean", IsPoznamkovyBlokBaliku = "boolean", IxsBlpBaliku = "string", IxsFunPrihlasenehoUzivatele = "string", IsRezimSpisovna = "boolean", RokSkartaceMinimumValue = "Gordic.Spi.Interface.GBalikGetRokSkartaceMinimumValueResponseDto", IfVecneSkupiny = "boolean",}
	const enum GSpiDetailBalikuComponentDtoTypeLengths {}
	/**Dto pro SSL hlavičku*/
	interface GSpiDetailBalikuComponentInputDto {
		IxsZup?: string|null;
		/**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
		/**Pokud je true, pak je dialog po úspěšném uložení automaticky zavřen.*/
		CloseAfterSave?: boolean|null;
		/**Příznak, zda se má balík vytvářet v režimu spisovny.*/
		IsRezimSpisovna?: boolean|null;
	}
	const enum GSpiDetailBalikuComponentInputDtoNames { IxsZup = "IxsZup", TypZobrazeniDetailu = "TypZobrazeniDetailu", CloseAfterSave = "CloseAfterSave", IsRezimSpisovna = "IsRezimSpisovna",}
	const enum GSpiDetailBalikuComponentInputDtoFragments { IxsZup = "*", TypZobrazeniDetailu = "*", CloseAfterSave = "*", IsRezimSpisovna = "*",}
	const enum GSpiDetailBalikuComponentInputDtoTypes { IxsZup = "string", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", CloseAfterSave = "boolean", IsRezimSpisovna = "boolean",}
	const enum GSpiDetailBalikuComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailBalikuHistoryComponentDto.d.ts 

declare namespace Gordic.Spi.WebClient {
    /**GDetailBalikuDto	Dto for Linked Docs Component*/
	interface GSpiDetailBalikuHistoryComponentDto {
        /**Ixs balíku.*/
		IxsZup?: string|null;
        /**validatory*/
		readonly Validators?: object|null;
		HistoryTitle?: string|null;
		HistoryTargetClass?: string|null;
		HistoryTargetDto?: object|null;
		IxsFunAkt?: string|null;
	}
	const enum GSpiDetailBalikuHistoryComponentDtoNames { IxsZup = "IxsZup", Validators = "Validators", HistoryTitle = "HistoryTitle", HistoryTargetClass = "HistoryTargetClass", HistoryTargetDto = "HistoryTargetDto", IxsFunAkt = "IxsFunAkt",}
	const enum GSpiDetailBalikuHistoryComponentDtoFragments { IxsZup = "*", Validators = "*", HistoryTitle = "*", HistoryTargetClass = "*", HistoryTargetDto = "*", IxsFunAkt = "*",}
	const enum GSpiDetailBalikuHistoryComponentDtoTypes { IxsZup = "string", Validators = "object", HistoryTitle = "string", HistoryTargetClass = "string", HistoryTargetDto = "object", IxsFunAkt = "string",}
    /**Dto pro SPI historii balíku.*/
	interface GSpiDetailBalikuHistoryComponentInputDto {
        /**Ixs balíku.*/
		IxsZup?: string|null;
	}
	const enum GSpiDetailBalikuHistoryComponentInputDtoNames { IxsZup = "IxsZup",}
	const enum GSpiDetailBalikuHistoryComponentInputDtoFragments { IxsZup = "*",}
	const enum GSpiDetailBalikuHistoryComponentInputDtoTypes { IxsZup = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailBalikuObsahComponentDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	/**Dto pro SPI Obsah balíku.*/
	interface GSpiDetailBalikuObsahComponentDto {
		/**Gets or sets the balik.*/
		Balik?: Gordic.Spi.Interface.GBalikDto|null;
		readonly Config?: Gordic.Spi.WebClient.GSpiDetailBalikuObsahConfigDto|null;
		/**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
	}
	const enum GSpiDetailBalikuObsahComponentDtoNames { Balik = "Balik", Config = "Config", TypZobrazeniDetailu = "TypZobrazeniDetailu",}
	const enum GSpiDetailBalikuObsahComponentDtoFragments { Balik = "*", Config = "*", TypZobrazeniDetailu = "*",}
	const enum GSpiDetailBalikuObsahComponentDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto", Config = "Gordic.Spi.WebClient.GSpiDetailBalikuObsahConfigDto", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity",}
	const enum GSpiDetailBalikuObsahComponentDtoTypeLengths {}
	/**Vstupní dto pro SPI Obsah balíku.*/
	interface GSpiDetailBalikuObsahComponentInputDto {
		/**Ixs balíku.*/
		IxsZup?: string|null;
		/**Gets or sets the typ zobrazeni.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
		/**Příznak, zda chceme získat standardní písemnosti (default) a nebo rozšířené.*/
		RozbalenePisemnosti?: boolean|null;
	}
	const enum GSpiDetailBalikuObsahComponentInputDtoNames { IxsZup = "IxsZup", TypZobrazeniDetailu = "TypZobrazeniDetailu", RozbalenePisemnosti = "RozbalenePisemnosti",}
	const enum GSpiDetailBalikuObsahComponentInputDtoFragments { IxsZup = "*", TypZobrazeniDetailu = "*", RozbalenePisemnosti = "*",}
	const enum GSpiDetailBalikuObsahComponentInputDtoTypes { IxsZup = "string", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", RozbalenePisemnosti = "boolean",}
	const enum GSpiDetailBalikuObsahComponentInputDtoTypeLengths {}
	/**GObsahBalikuConfigDto*/
	interface GSpiDetailBalikuObsahConfigDto {
		readonly IsEspisovna?: boolean|null;
		readonly ZobrazPosouzeniNDA?: boolean|null;
		readonly ZobrazitBarevneOznaceni?: boolean|null;
		/**Aktualni spisovna (ixs).*/
		readonly AktualniSpisovna?: string|null;
		/**Příznak, zda je fáze (modul) typu spisovna.*/
		readonly IsFazeTypuSpisovna?: boolean|null;
		/**Gets the generovat sip enabled.*/
		readonly GenerovatSIPEnabled?: boolean|null;
		/**Příznak použití věcných skupin.*/
		readonly IfVecneSkupiny?: boolean|null;
	}
	const enum GSpiDetailBalikuObsahConfigDtoNames { IsEspisovna = "IsEspisovna", ZobrazPosouzeniNDA = "ZobrazPosouzeniNDA", ZobrazitBarevneOznaceni = "ZobrazitBarevneOznaceni", AktualniSpisovna = "AktualniSpisovna", IsFazeTypuSpisovna = "IsFazeTypuSpisovna", GenerovatSIPEnabled = "GenerovatSIPEnabled", IfVecneSkupiny = "IfVecneSkupiny",}
	const enum GSpiDetailBalikuObsahConfigDtoFragments { IsEspisovna = "*", ZobrazPosouzeniNDA = "*", ZobrazitBarevneOznaceni = "*", AktualniSpisovna = "*", IsFazeTypuSpisovna = "*", GenerovatSIPEnabled = "*", IfVecneSkupiny = "*",}
	const enum GSpiDetailBalikuObsahConfigDtoTypes { IsEspisovna = "boolean", ZobrazPosouzeniNDA = "boolean", ZobrazitBarevneOznaceni = "boolean", AktualniSpisovna = "string", IsFazeTypuSpisovna = "boolean", GenerovatSIPEnabled = "boolean", IfVecneSkupiny = "boolean",}
	const enum GSpiDetailBalikuObsahConfigDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailNeevidovanehoDokumentuSpisuComponentDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	/**GSpiDetailNeevidovanehoDokumentuSpisuComponentDto*/
	interface GSpiDetailNeevidovanehoDokumentuSpisuComponentDto {
		/**Neevidovaný dokument / spis.*/
		DokumentSpis?: Gordic.Spi.Interface.GPisemnostNeevidovanaDto|null;
		/**Typ zobrazení detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
		/**Gets or sets the pouze fyzicka forma.*/
		PouzeFyzickaForma?: boolean|null;
		/**(Default: false) Příznak zda je detail otevírán v režimu opravy nealidních položek (po kontrole metadat).*/
		OpravaNevalidnihoPoKontroleMetadat?: boolean|null;
		/**Výsledek kontroly metadat.*/
		VysledekKontrolyMetadat?: Gordic.Wfl.Interface.GSpitkonDto[]|null;
		/**Příznak použití věcnéí skupiny.*/
		IfVecneSkupiny?: boolean|null;
	}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentDtoNames { DokumentSpis = "DokumentSpis", TypZobrazeniDetailu = "TypZobrazeniDetailu", PouzeFyzickaForma = "PouzeFyzickaForma", OpravaNevalidnihoPoKontroleMetadat = "OpravaNevalidnihoPoKontroleMetadat", VysledekKontrolyMetadat = "VysledekKontrolyMetadat", IfVecneSkupiny = "IfVecneSkupiny",}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentDtoFragments { DokumentSpis = "*", TypZobrazeniDetailu = "*", PouzeFyzickaForma = "*", OpravaNevalidnihoPoKontroleMetadat = "*", VysledekKontrolyMetadat = "*", IfVecneSkupiny = "*",}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentDtoTypes { DokumentSpis = "Gordic.Spi.Interface.GPisemnostNeevidovanaDto", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", PouzeFyzickaForma = "boolean", OpravaNevalidnihoPoKontroleMetadat = "boolean", VysledekKontrolyMetadat = "Gordic.Wfl.Interface.GSpitkonDto[]", IfVecneSkupiny = "boolean",}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentDtoTypeLengths {}
	/**GSpiDetailNeevidovanehoDokumentuSpisuComponentInputDto*/
	interface GSpiDetailNeevidovanehoDokumentuSpisuComponentInputDto {
		/**Identifikátor balíku.*/
		IxsZup?: string|null;
		/**Identifikátor dokumentu / spisu.*/
		Ixp?: string|null;
		/**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
		/**Gets or sets the pouze fyzicka forma.*/
		PouzeFyzickaForma?: boolean|null;
		/**(Default: false) Příznak zda je detail otevírán v režimu opravy nealidních položek (po kontrole metadat).*/
		OpravaNevalidnihoPoKontroleMetadat?: boolean|null;
		/**Výsledek kontroly metadat.*/
		VysledekKontrolyMetadat?: Gordic.Wfl.Interface.GSpitkonDto[]|null;
	}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentInputDtoNames { IxsZup = "IxsZup", Ixp = "Ixp", TypZobrazeniDetailu = "TypZobrazeniDetailu", PouzeFyzickaForma = "PouzeFyzickaForma", OpravaNevalidnihoPoKontroleMetadat = "OpravaNevalidnihoPoKontroleMetadat", VysledekKontrolyMetadat = "VysledekKontrolyMetadat",}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentInputDtoFragments { IxsZup = "*", Ixp = "*", TypZobrazeniDetailu = "*", PouzeFyzickaForma = "*", OpravaNevalidnihoPoKontroleMetadat = "*", VysledekKontrolyMetadat = "*",}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentInputDtoTypes { IxsZup = "string", Ixp = "string", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", PouzeFyzickaForma = "boolean", OpravaNevalidnihoPoKontroleMetadat = "boolean", VysledekKontrolyMetadat = "Gordic.Wfl.Interface.GSpitkonDto[]",}
	const enum GSpiDetailNeevidovanehoDokumentuSpisuComponentInputDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailUloznehoMistaComponentDto.d.ts 

declare namespace Gordic.Spi.WebClient {
    /**Dto pro SSL hlavičku*/
	interface GSpiDetailUloznehoMistaComponentDto {
        /**Gets or sets the dokument spis.*/
		UlozneMisto?: Gordic.Spi.Interface.GUlozneMistoDto|null;
        /**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
        /**Gets or sets the typ zobrazeni detailu.*/
		AktualniSpisovna?: string|null;
		InputData?: Gordic.Spi.Interface.GUlozneMistoDto|null;
	}
	const enum GSpiDetailUloznehoMistaComponentDtoNames { UlozneMisto = "UlozneMisto", TypZobrazeniDetailu = "TypZobrazeniDetailu", AktualniSpisovna = "AktualniSpisovna", InputData = "InputData",}
	const enum GSpiDetailUloznehoMistaComponentDtoFragments { UlozneMisto = "*", TypZobrazeniDetailu = "*", AktualniSpisovna = "*", InputData = "*",}
	const enum GSpiDetailUloznehoMistaComponentDtoTypes { UlozneMisto = "Gordic.Spi.Interface.GUlozneMistoDto", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", AktualniSpisovna = "string", InputData = "Gordic.Spi.Interface.GUlozneMistoDto",}
    /**Dto pro SSL hlavičku*/
	interface GDetailUloznehoMistaComponentInputDto {
		ixs_ulm?: string|null;
		ixs_ulm_nad?: string|null;
        /**Vypujcni listek*/
		InputData?: Gordic.Spi.Interface.GUlozneMistoDto|null;
        /**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
	}
	const enum GDetailUloznehoMistaComponentInputDtoNames { ixs_ulm = "ixs_ulm", ixs_ulm_nad = "ixs_ulm_nad", InputData = "InputData", TypZobrazeniDetailu = "TypZobrazeniDetailu",}
	const enum GDetailUloznehoMistaComponentInputDtoFragments { ixs_ulm = "*", ixs_ulm_nad = "*", InputData = "*", TypZobrazeniDetailu = "*",}
	const enum GDetailUloznehoMistaComponentInputDtoTypes { ixs_ulm = "string", ixs_ulm_nad = "string", InputData = "Gordic.Spi.Interface.GUlozneMistoDto", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\DetailBuilderComponents\Dto\GSpiDetailVypujcnihoListkuComponentDto.d.ts 

declare namespace Gordic.Spi.WebClient {
    /**Dto pro SSL hlavičku*/
	interface GSpiDetailVypujcnihoListkuComponentDto {
        /**Gets or sets the dokument spis.*/
		VypujcniListek?: Gordic.Spi.Interface.GVypujcniListekDto|null;
        /**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
	}
	const enum GSpiDetailVypujcnihoListkuComponentDtoNames { VypujcniListek = "VypujcniListek", TypZobrazeniDetailu = "TypZobrazeniDetailu",}
	const enum GSpiDetailVypujcnihoListkuComponentDtoFragments { VypujcniListek = "*", TypZobrazeniDetailu = "*",}
	const enum GSpiDetailVypujcnihoListkuComponentDtoTypes { VypujcniListek = "Gordic.Spi.Interface.GVypujcniListekDto", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity",}
}
declare namespace Gordic.Isl {
    /**Dto for Linked Docs Component*/
	abstract class SpiDetailVypujcnihoListkuComponentDto {
		public static get_VypujcniListek(rq?:CallParams<{}>): _Task<{},Gordic.Spi.Interface.GVypujcniListekDto>;
		public static set_VypujcniListek(rq?:CallParams<{value:Gordic.Spi.Interface.GVypujcniListekDto}>): _Task<{value:Gordic.Spi.Interface.GVypujcniListekDto},void>;
		public static get_TypZobrazeniDetailu(rq?:CallParams<{}>): _Task<{},Gordic.Gin.Interface.TypZobrazeniEntity>;
		public static set_TypZobrazeniDetailu(rq?:CallParams<{value:Gordic.Gin.Interface.TypZobrazeniEntity}>): _Task<{value:Gordic.Gin.Interface.TypZobrazeniEntity},void>;
	}
    /**interface dto ssl Hlavičky*/
	abstract class SpiDetailVypujcnihoListkuComponentInputDto {
		public static get_ixs_vyl(rq?:CallParams<{}>): _Task<{},string>;
		public static set_ixs_vyl(rq?:CallParams<{value:string}>): _Task<{value:string},void>;
		public static get_TypZobrazeniDetailu(rq?:CallParams<{}>): _Task<{},Gordic.Gin.Interface.TypZobrazeniEntity>;
		public static set_TypZobrazeniDetailu(rq?:CallParams<{value:Gordic.Gin.Interface.TypZobrazeniEntity}>): _Task<{value:Gordic.Gin.Interface.TypZobrazeniEntity},void>;
	}
}
declare namespace Gordic.Spi.WebClient {
    /**Dto pro SSL hlavičku*/
	interface GSpiDetailVypujcnihoListkuComponentInputDto {
		ixs_vyl?: string|null;
        /**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
	}
	const enum GSpiDetailVypujcnihoListkuComponentInputDtoNames { ixs_vyl = "ixs_vyl", TypZobrazeniDetailu = "TypZobrazeniDetailu",}
	const enum GSpiDetailVypujcnihoListkuComponentInputDtoFragments { ixs_vyl = "*", TypZobrazeniDetailu = "*",}
	const enum GSpiDetailVypujcnihoListkuComponentInputDtoTypes { ixs_vyl = "string", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\NeevidovanyDokumnetSpis\Dto\GDetailNeevidovanehoDokumentuSpisuDto.d.ts 

declare namespace Gordic.Spi.WebClient {
    /**Vstupní parametry dialogu detailu neevidovaného dokumentu / spisu.*/
	interface GDetailNeevidovanehoDokumentuSpisuDlgInputDto extends Gordic.Spi.WebClient.GOpravaNevalidnichNeevidovanyDokumentSpisDlgInputDto {
        /**Identifikátor balíku.*/
		IxsZup?: string|null;
        /**Typ zobrazení detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
        /**JQuery s elementem na kterém je grid s*/
		Grid?: JQuery<HTMLElement>|null;
        /**(Default: false) Příznak zda je detail otevírán v režimu opravy nealidních položek (po kontrole metadat).*/
		OpravaNevalidnihoPoKontroleMetadat?: boolean|null;
	}
	const enum GDetailNeevidovanehoDokumentuSpisuDlgInputDtoNames { IxsZup = "IxsZup", TypZobrazeniDetailu = "TypZobrazeniDetailu", Grid = "Grid", OpravaNevalidnihoPoKontroleMetadat = "OpravaNevalidnihoPoKontroleMetadat", Ixp = "Ixp", VysledekKontrolyMetadat = "VysledekKontrolyMetadat",}
	const enum GDetailNeevidovanehoDokumentuSpisuDlgInputDtoFragments { IxsZup = "*", TypZobrazeniDetailu = "*", Grid = "*", OpravaNevalidnihoPoKontroleMetadat = "*", Ixp = "*", VysledekKontrolyMetadat = "*",}
	const enum GDetailNeevidovanehoDokumentuSpisuDlgInputDtoTypes { IxsZup = "string", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", Grid = "JQuery<HTMLElement>", OpravaNevalidnihoPoKontroleMetadat = "boolean", Ixp = "string", VysledekKontrolyMetadat = "Gordic.Wfl.Interface.GSpitkonDto[]",}
    /**Vstupní parametry dialogu opravy dat nevalidního neevidovaného dokumentu / spisu (z kontroly metadat).*/
	interface GOpravaNevalidnichNeevidovanyDokumentSpisDlgInputDto {
        /**Identifikátor dokumentu / spisu.*/
		Ixp?: string|null;
        /**Výsledek kontroly metadat.*/
		VysledekKontrolyMetadat?: Gordic.Wfl.Interface.GSpitkonDto[]|null;
	}
	const enum GOpravaNevalidnichNeevidovanyDokumentSpisDlgInputDtoNames { Ixp = "Ixp", VysledekKontrolyMetadat = "VysledekKontrolyMetadat",}
	const enum GOpravaNevalidnichNeevidovanyDokumentSpisDlgInputDtoFragments { Ixp = "*", VysledekKontrolyMetadat = "*",}
	const enum GOpravaNevalidnichNeevidovanyDokumentSpisDlgInputDtoTypes { Ixp = "string", VysledekKontrolyMetadat = "Gordic.Wfl.Interface.GSpitkonDto[]",}
    /**Návratová hodnota (po zavření) dialogu detailu neevidovaného dokumentu / spisu.*/
	interface GDetailNeevidovanehoDokumentuSpisuDlgRetValDto {
        /**Příznak, zda došlo k uložení neevidovaného dokumentu / spisu.*/
		WasSaved?: boolean|null;
        /**Data neevidovaného dokumentu / spisu.*/
		DokumentSpis?: Gordic.Spi.Interface.GPisemnostNeevidovanaDto|null;
	}
	const enum GDetailNeevidovanehoDokumentuSpisuDlgRetValDtoNames { WasSaved = "WasSaved", DokumentSpis = "DokumentSpis",}
	const enum GDetailNeevidovanehoDokumentuSpisuDlgRetValDtoFragments { WasSaved = "*", DokumentSpis = "*",}
	const enum GDetailNeevidovanehoDokumentuSpisuDlgRetValDtoTypes { WasSaved = "boolean", DokumentSpis = "Gordic.Spi.Interface.GPisemnostNeevidovanaDto",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\UlozneMisto\Dto\GDetailUloznehoMistaDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	interface GDetailUloznehoMistaDlgInputDto {
        /**Ixp dokumentu / spisu.*/
		ixs_ulm?: string|null;
        /**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
        /**Gets or sets the input data.*/
		InputData?: Gordic.Spi.Interface.GUlozneMistoDto|null;
        /**Gets or sets the input data.*/
		Grid?: JQuery<HTMLElement>|null;
	}
	const enum GDetailUloznehoMistaDlgInputDtoNames { ixs_ulm = "ixs_ulm", TypZobrazeniDetailu = "TypZobrazeniDetailu", InputData = "InputData", Grid = "Grid",}
	const enum GDetailUloznehoMistaDlgInputDtoFragments { ixs_ulm = "*", TypZobrazeniDetailu = "*", InputData = "*", Grid = "*",}
	const enum GDetailUloznehoMistaDlgInputDtoTypes { ixs_ulm = "string", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", InputData = "Gordic.Spi.Interface.GUlozneMistoDto", Grid = "JQuery<HTMLElement>",}
	interface GDetailUloznehoMistaDlgRetValDto {
        /**Gets or sets the was saved.*/
		WasSaved?: boolean|null;
	}
	const enum GDetailUloznehoMistaDlgRetValDtoNames { WasSaved = "WasSaved",}
	const enum GDetailUloznehoMistaDlgRetValDtoFragments { WasSaved = "*",}
	const enum GDetailUloznehoMistaDlgRetValDtoTypes { WasSaved = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.WebClient\Gin\Spi\Details\VypujcniListek\Dto\GDetailVypujcnihoListkuDto.d.ts 

declare namespace Gordic.Spi.WebClient {
	interface GDetailVypujcnihoListkuDlgInputDto {
        /**Ixp dokumentu / spisu.*/
		ixs_vyl?: string|null;
        /**Gets or sets the typ zobrazeni detailu.*/
		TypZobrazeniDetailu?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
        /**Gets or sets the input data.*/
		InputData?: Gordic.Spi.Interface.GVypujcniListekDto|null;
        /**Gets or sets the input data.*/
		Grid?: JQuery<HTMLElement>|null;
	}
	const enum GDetailVypujcnihoListkuDlgInputDtoNames { ixs_vyl = "ixs_vyl", TypZobrazeniDetailu = "TypZobrazeniDetailu", InputData = "InputData", Grid = "Grid",}
	const enum GDetailVypujcnihoListkuDlgInputDtoFragments { ixs_vyl = "*", TypZobrazeniDetailu = "*", InputData = "*", Grid = "*",}
	const enum GDetailVypujcnihoListkuDlgInputDtoTypes { ixs_vyl = "string", TypZobrazeniDetailu = "Gordic.Gin.Interface.TypZobrazeniEntity", InputData = "Gordic.Spi.Interface.GVypujcniListekDto", Grid = "JQuery<HTMLElement>",}
	interface GDetailVypujcnihoListkuDlgRetValDto {
        /**Gets or sets the was saved.*/
		WasSaved?: boolean|null;
	}
	const enum GDetailVypujcnihoListkuDlgRetValDtoNames { WasSaved = "WasSaved",}
	const enum GDetailVypujcnihoListkuDlgRetValDtoFragments { WasSaved = "*",}
	const enum GDetailVypujcnihoListkuDlgRetValDtoTypes { WasSaved = "boolean",}
}

//#endregion

