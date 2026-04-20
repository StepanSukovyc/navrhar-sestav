/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       general.webapplication.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.General.WebApplication\Gordic.General.WebApplication.csproj
*    created     2026-02-16 14:33:48
*    files       BsTestDecl1.d.ts
*                BsTestDecl2.d.ts
*                WebSequence\Dto\GInitialSequenceDto.d.ts
*                WebSequence\Dto\GInitialSequenceSelectedValueDto.d.ts
*                WebSequence\Dto\GLoginAdditionalInformationDto.d.ts
*                WebSequence\Dto\GLoginApplicationInfoDto.d.ts
*                WebSequence\Dto\GLoginConfigurationDto.d.ts
*                WebSequence\Dto\GLoginConfigurationTempDto.d.ts
*                WebSequence\Dto\GLoginImageDto.d.ts
*                WebSequence\Dto\GLoginLinkDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\BsTestDecl1.d.ts 

declare namespace Gordic.General.WebApplication {
    export const Foo = "abcdefgdadsfasfasd";
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\BsTestDecl2.d.ts 

declare namespace Gordic.General.WebApplication {
    export const Boo = "abc";
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GInitialSequenceDto.d.ts 

declare namespace Gordic.General.WebApplication {
	/**Obálka pro .*/
	interface GInitialSequenceDto {
		/**Zjednodušené informace o aplikaci.*/
		ApplicationInfo?: Gordic.General.WebApplication.GLoginApplicationInfoDto|null;
		/**Kód výsledku inicializace.*/
		Code?: Gordic.General.ApplicationClient.InitialSequenceResult|null;
		/**ExceptionInfo, pokud vznikla výjimka.*/
		ExceptionInfo?: Gordic.General.ApplicationInterface.GExceptionInfo|null;
		/**Data pro ovládací prvky.*/
		GInitControl?: Gordic.General.ApplicationClient.GInitialSequenceOutputData|null;
		/**Budovaná kontextuální data.*/
		ServerContext?: any|null;
		/**příznak změny kontextu*/
		ContextChanged?: boolean|null;
		/**Identifikace kroku který posílá požadavek.*/
		Step?: string|null;
		/**Informace o nastavení aplikace, zobrazované uživateli.*/
		UserMenu?: any|null;
		/**Hodnoty vybrané uživatelem během přihlášení.*/
		SelectedValues?: Gordic.General.WebApplication.GInitialSequenceSelectedValueDto[]|null;
		/**Slovník parametrizovatelných textů pro layout.
		*     Neparametrizovatelné texty jsou načtené přímo do JS.
		*/
		ResourceTexts?: any|null;
		/**Slovník parametrizovatelných odkazů, které se zobrazí
		*     u patičky.
		*/
		FooterLinks?: Gordic.General.WebApplication.GLoginLinkDto[]|null;
		/**Konfigurace přihlašovací obrazovky.*/
		LoginConfiguration?: Gordic.General.WebApplication.GLoginConfigurationDto|null;
		/**Aktuální jazyková kultura (např.: "cs-CZ") dle https://docs.microsoft.com/en-us/previous-versions/commerce-server/ee825488(v=cs.20).*/
		CultureNameCurrent?: string|null;
		/**Příznak, zda se mají zobrazovat hodnoty vybrané v předešlých krocích přihlášení.*/
		ShowSelectedValues?: boolean|null;
		/**Název webového serveru.*/
		WebServerName?: string|null;
		/**příznak dokončení inicializační sekvence u aktuálního nebo některého z předchozích požadavků*/
		AnySequenceFinished?: boolean|null;
		/**Příznak, zda se je zapnuta funkčnost přeskování kroku pro zadání uživatele.*/
		IsSkipUserSelectionStepAvailable?: boolean|null;
	}
	const enum GInitialSequenceDtoNames { ApplicationInfo = "ApplicationInfo", Code = "Code", ExceptionInfo = "ExceptionInfo", GInitControl = "GInitControl", ServerContext = "ServerContext", ContextChanged = "ContextChanged", Step = "Step", UserMenu = "UserMenu", SelectedValues = "SelectedValues", ResourceTexts = "ResourceTexts", FooterLinks = "FooterLinks", LoginConfiguration = "LoginConfiguration", CultureNameCurrent = "CultureNameCurrent", ShowSelectedValues = "ShowSelectedValues", WebServerName = "WebServerName", AnySequenceFinished = "AnySequenceFinished", IsSkipUserSelectionStepAvailable = "IsSkipUserSelectionStepAvailable",}
	const enum GInitialSequenceDtoFragments { ApplicationInfo = "*", Code = "*", ExceptionInfo = "*", GInitControl = "*", ServerContext = "*", ContextChanged = "*", Step = "*", UserMenu = "*", SelectedValues = "*", ResourceTexts = "*", FooterLinks = "*", LoginConfiguration = "*", CultureNameCurrent = "*", ShowSelectedValues = "*", WebServerName = "*", AnySequenceFinished = "*", IsSkipUserSelectionStepAvailable = "*",}
	const enum GInitialSequenceDtoTypes { ApplicationInfo = "Gordic.General.WebApplication.GLoginApplicationInfoDto", Code = "Gordic.General.ApplicationClient.InitialSequenceResult", ExceptionInfo = "Gordic.General.ApplicationInterface.GExceptionInfo", GInitControl = "Gordic.General.ApplicationClient.GInitialSequenceOutputData", ServerContext = "any", ContextChanged = "boolean", Step = "string", UserMenu = "any", SelectedValues = "Gordic.General.WebApplication.GInitialSequenceSelectedValueDto[]", ResourceTexts = "any", FooterLinks = "Gordic.General.WebApplication.GLoginLinkDto[]", LoginConfiguration = "Gordic.General.WebApplication.GLoginConfigurationDto", CultureNameCurrent = "string", ShowSelectedValues = "boolean", WebServerName = "string", AnySequenceFinished = "boolean", IsSkipUserSelectionStepAvailable = "boolean",}
	const enum GInitialSequenceDtoTypeLengths {}
	/**Nastavení zobrazení hodnot vybraných uživatelem během přihlášení.*/
	const enum GLoginInfoSelectedValuesVisibleSetting {
		/**Všechny hodnoty budou zobrazeny.*/
		All,
		/**Žádné hodnoty nebudou zobrazeny.*/
		Nothing,
		/**Budou zobrazeny hodnoty s vyjímkou databázového profilu.*/
		WithoutDatabaseProfile,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GInitialSequenceSelectedValueDto.d.ts 

declare namespace Gordic.General.WebApplication {
	/**Vybraná hodnota na přihlašovací obrazovce.*/
	interface GInitialSequenceSelectedValueDto {
		/**Název hodnoty.*/
		Name?: string|null;
		/**Hodnota.*/
		Value?: string|null;
	}
	const enum GInitialSequenceSelectedValueDtoNames { Name = "Name", Value = "Value",}
	const enum GInitialSequenceSelectedValueDtoFragments { Name = "*", Value = "*",}
	const enum GInitialSequenceSelectedValueDtoTypes { Name = "string", Value = "string",}
	const enum GInitialSequenceSelectedValueDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GLoginAdditionalInformationDto.d.ts 

declare namespace Gordic.General.WebApplication {
    /**Dto doplňkových informací zobrazovaní v jednotlivích krocích přihlašovací obrazovky.*/
	interface GLoginAdditionalInformationDto {
        /**Nadpis.*/
		Header?: string|null;
        /**Text.*/
		Text?: string|null;
        /**Druh informace.*/
		Kind?: Gordic.General.WebApplication.GLoginAdditionalInformationKindEnum|null;
        /**Čas, OD kdy se možné doplňkovou informaci zobrazit.*/
		ShowSince?: JsonDate|null;
        /**Čas, DO kdy se možné doplňkovou informaci zobrazit.*/
		ShowUntil?: JsonDate|null;
	}
    /**Druh doplňkové informace.*/
	const enum GLoginAdditionalInformationKindEnum {
        /**Informace.*/
		Info=0,
        /**Varování.*/
		Warning=1,
        /**Chyba - důležité varování.*/
		Error=2,
        /**Důležité.*/
		Important=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GLoginApplicationInfoDto.d.ts 

declare namespace Gordic.General.WebApplication {
    /**Informace o aplikaci pro p�ihla3ovac� obrazovku.*/
	interface GLoginApplicationInfoDto {
        /**Dlouh� n�zev modulu. Nap�.: "Univerz�ln� spisov� uzel".*/
		Name?: string|null;
        /**V�vojov� verze modulu. Nap�. "478".*/
		Verze?: number|null;
        /**Dlouh� n�zev revize. Nap�.: "41USU0548201X09".*/
		Revize?: string|null;
        /**Titulek str�nky (document.title).*/
		AppTitle?: string|null;
        /**F�ze modulu.*/
		Faze?: string|null;
	}
	const enum GLoginApplicationInfoDtoNames { Name = "Name", Verze = "Verze", Revize = "Revize", AppTitle = "AppTitle", Faze = "Faze",}
	const enum GLoginApplicationInfoDtoFragments { Name = "*", Verze = "*", Revize = "*", AppTitle = "*", Faze = "*",}
	const enum GLoginApplicationInfoDtoTypes { Name = "string", Verze = "number", Revize = "string", AppTitle = "string", Faze = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GLoginConfigurationDto.d.ts 

declare namespace Gordic.General.WebApplication {
	/**Konfigurace přihlašovací obrazovky.*/
	interface GLoginConfigurationDto {
		/**Dto polí doplňkových informací pro jednotlivé jazyky a kroky.
		*     První klíč je název kroku (např.: GInitialSequenceResult) a druhý jazyk (např.: "cs-CZ").
		*/
		AdditionalInformation?: ObjectLiteral<ObjectLiteral<Gordic.General.WebApplication.GLoginAdditionalInformationDto[]>>|null;
		/**Obrázek zobrazený nad přihlašovacím dialogem.*/
		ImageAboveContent?: Gordic.General.WebApplication.GLoginImageDto|null;
		/**Obrázek zobrazený pod přihlašovacím dialogem.*/
		ImageUnderContent?: Gordic.General.WebApplication.GLoginImageDto|null;
		/**Odkazy zobrazené v patičce přihlašovacího dialogu.
		*     Klíč je jazyk (např.: "cs-CZ") dle https://docs.microsoft.com/en-us/previous-versions/commerce-server/ee825488(v=cs.20).
		*/
		FooterLinks?: ObjectLiteral<Gordic.General.WebApplication.GLoginLinkDto[]>|null;
		/**Maximální čas, po který může být konfigurace uložena v session (v minutách).*/
		TimeInSessionMaximum?: number|null;
		/**(default: [true]) Příznak, zda se má na přihlašovací obrazovce zobrazit číslo verze [true], nebo má být skryté [false].*/
		ShowApplicationVersion?: boolean|null;
		/**(default: 10) Minimální počet řádků, pro který se ve výběru zobrazí filtra4ní / hledací políčka.*/
		ShowFilterRowsCountMin?: number|null;
	}
	const enum GLoginConfigurationDtoNames { AdditionalInformation = "AdditionalInformation", ImageAboveContent = "ImageAboveContent", ImageUnderContent = "ImageUnderContent", FooterLinks = "FooterLinks", TimeInSessionMaximum = "TimeInSessionMaximum", ShowApplicationVersion = "ShowApplicationVersion", ShowFilterRowsCountMin = "ShowFilterRowsCountMin",}
	const enum GLoginConfigurationDtoFragments { AdditionalInformation = "*", ImageAboveContent = "*", ImageUnderContent = "*", FooterLinks = "*", TimeInSessionMaximum = "*", ShowApplicationVersion = "*", ShowFilterRowsCountMin = "*",}
	const enum GLoginConfigurationDtoTypes { AdditionalInformation = "ObjectLiteral<ObjectLiteral<Gordic.General.WebApplication.GLoginAdditionalInformationDto[]>>", ImageAboveContent = "Gordic.General.WebApplication.GLoginImageDto", ImageUnderContent = "Gordic.General.WebApplication.GLoginImageDto", FooterLinks = "ObjectLiteral<Gordic.General.WebApplication.GLoginLinkDto[]>", TimeInSessionMaximum = "number", ShowApplicationVersion = "boolean", ShowFilterRowsCountMin = "number",}
	const enum GLoginConfigurationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GLoginConfigurationTempDto.d.ts 

declare namespace Gordic.General.WebApplication {
	/**Konfigurace přihlašovací obrazovky uloženáv session.*/
	interface GLoginConfigurationTempDto {
		/**Uložená konfigurace.*/
		LoginConfiguration?: Gordic.General.WebApplication.GLoginConfigurationDto|null;
		/**Čas uložení (UTC).*/
		CreatedAt?: JsonDate|null;
		/**Čas expirace nastavení v session (UTC). 
		*     Po dosažení / překonání toho času je nutné načíst novou konfiguraci.
		*/
		ExpireAt?: JsonDate|null;
	}
	const enum GLoginConfigurationTempDtoNames { LoginConfiguration = "LoginConfiguration", CreatedAt = "CreatedAt", ExpireAt = "ExpireAt",}
	const enum GLoginConfigurationTempDtoFragments { LoginConfiguration = "*", CreatedAt = "*", ExpireAt = "*",}
	const enum GLoginConfigurationTempDtoTypes { LoginConfiguration = "Gordic.General.WebApplication.GLoginConfigurationDto", CreatedAt = "JsonDate", ExpireAt = "JsonDate",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GLoginImageDto.d.ts 

declare namespace Gordic.General.WebApplication {
    /**Obrázek na přihlašovací obrazovce.*/
	interface GLoginImageDto {
        /**Název souboru.*/
		File?: string|null;
        /**Popis obrázku.
        *     Klíč je jazyk (např.: "cs-CZ") dle https://docs.microsoft.com/en-us/previous-versions/commerce-server/ee825488(v=cs.20).
        */
		Description?: ObjectLiteral<string | undefined | null>|null;
        /**Pozice (zarovnání) obrázku viz. https://www.w3schools.com/cssref/pr_text_text-align.asp*/
		Align?: string|null;
	}
	const enum GLoginImageDtoNames { File = "File", Description = "Description", Align = "Align",}
	const enum GLoginImageDtoFragments { File = "*", Description = "*", Align = "*",}
	const enum GLoginImageDtoTypes { File = "string", Description = "ObjectLiteral<string | undefined | null>", Align = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.WebApplication\WebSequence\Dto\GLoginLinkDto.d.ts 

declare namespace Gordic.General.WebApplication {
	/**Odkaz na přihlašovací obrazovce.*/
	interface GLoginLinkDto {
		/**Titulek (text) odkazu.*/
		Title?: string|null;
		/**Url odkazu.*/
		Url?: string|null;
		/**Text pro garticle. Pokud je použit, pak se nepoužije odkaz dle Url, ale zobrazí text v modálním okně.
		*     Text může obsahovat html a markdown, který garticle podporuje. Více na https://xwiki.gordic.cz/NET/widgets/GArticle
		*/
		ArticleText?: string|null;
	}
	const enum GLoginLinkDtoNames { Title = "Title", Url = "Url", ArticleText = "ArticleText",}
	const enum GLoginLinkDtoFragments { Title = "*", Url = "*", ArticleText = "*",}
	const enum GLoginLinkDtoTypes { Title = "string", Url = "string", ArticleText = "string",}
	const enum GLoginLinkDtoTypeLengths {}
}

//#endregion

