/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       general.applicationclient.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.General.ApplicationClient\Gordic.General.ApplicationClient.csproj
*    created     2026-02-16 14:33:45
*    files       InitialSequence\Gordic.General.ApplicationClient.GInitialSequenceOutputData.d.ts
*                InitialSequence\Gordic.General.ApplicationClient.GInitialSequenceResult.d.ts
*                InitialSequence\Gordic.General.ApplicationClient.GProfileInfo.d.ts
*                InitialSequence\Gordic.General.ApplicationClient.GUserMenu.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.General.ApplicationClient\InitialSequence\Gordic.General.ApplicationClient.GInitialSequenceOutputData.d.ts 

declare namespace Gordic.General.ApplicationClient {
	/**Vyskakovací upozornění pro uživatele.*/
	interface GNotifyUser {
		/**Sdělení pro uživatele.*/
		readonly Message?: string|null;
		/**Povaha sdělení, ovlivní podbarvení notifikace.*/
		readonly State?: number|null;
	}
	const enum GNotifyUserNames { Message = "Message", State = "State",}
	const enum GNotifyUserFragments { Message = "*", State = "*",}
	const enum GNotifyUserTypes { Message = "string", State = "number",}
	const enum GNotifyUserTypeLengths {}
	/**Data k řízení ovládacích prvků při požadavku na informace od
	*     uživatel v rámci inicializace .
	*/
	interface GInitialSequenceOutputData {
		/**Řetězec určující typ komponenty v UI.*/
		readonly Type?: string|null;
		/**Nadpis pro ovládací prvek.*/
		Title?: string|null;
		/**Podtitul ovládacího prvku.*/
		Subtitle?: string|null;
		/**Notifikační zpráva pro uživatele.*/
		Notify?: Gordic.General.ApplicationClient.GNotifyUser|null;
		/**Pole dto podporovaných kultur.*/
		readonly SupportedCultures?: Gordic.General.ApplicationInterface.GCultureDto[]|null;
		/**The current culture*/
		CurrentCulture?: string|null;
	}
	const enum GInitialSequenceOutputDataNames { Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataFragments { Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataTypes { Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataTypeLengths {}
	/**Základní login dialog vyžadující jen zadání jména a hesla.*/
	interface GInitialSequenceOutputDataLoginBase extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
	}
	const enum GInitialSequenceOutputDataLoginBaseNames { Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataLoginBaseFragments { Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataLoginBaseTypes { Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataLoginBaseTypeLengths {}
	/**Data k zobrazení login formuláře*/
	interface GInitialSequenceOutputDataLoginForm extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		/**Dostupné databázové profily*/
		Profiles?: Gordic.General.ApplicationClient.GProfileInfo[]|null;
		/**Příznak povolení přímého přihlášení pomocí DBA.*/
		LoginAsDbaEnabled?: boolean|null;
		/**Výchozí databázový profil.*/
		DefaultProfile?: string|null;
	}
	const enum GInitialSequenceOutputDataLoginFormNames { Profiles = "Profiles", LoginAsDbaEnabled = "LoginAsDbaEnabled", DefaultProfile = "DefaultProfile", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataLoginFormFragments { Profiles = "*", LoginAsDbaEnabled = "*", DefaultProfile = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataLoginFormTypes { Profiles = "Gordic.General.ApplicationClient.GProfileInfo[]", LoginAsDbaEnabled = "boolean", DefaultProfile = "string", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataLoginFormTypeLengths {}
	/**Data k zobrazení login formuláře pro veřejnost*/
	interface GInitialSequenceOutputDataPublicLoginForm extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		/**URL na datové schránky, pokud není, je přihlášení přes DS vypnuto.
		*     URL musí být úplné tak, jak jí API DatSch očekává vč. queryString.
		*/
		AuthDatoveSchranky?: string|null;
		/**URL na Národní identitní autoritu, pokud není, je přihlášení přes NIA vypnuto.*/
		AuthNia?: string|null;
		/**URL na MojeId, pokud není, je přihlášení přes MojeId vypnuto.
		*     URL musí být úplné tak, jak jí API MojeId očekává vč. queryString.
		*/
		AuthMojeId?: string|null;
		/**URL přihlašovací stránky pro autentizační bránu VysocinaID, pokud není, je přihlášení přes VysocinaID vypnuto.*/
		AuthVysocinaId?: string|null;
		/**Příznak, zda při přihlášení vyžadovat captcha ověření. Má smysl při
		*     opakovaném zadávání neplatného jména/hesla.
		*/
		IsCaptchaRequired?: boolean|null;
		/**Příznak, zda je povolená registrace nových uživatelů.*/
		IsRegistrationAllowed?: boolean|null;
		/**HTML s textem nápovědy.*/
		HelpTemplate?: string|null;
		/**Příznak, zda se má zobrazit formulář pro přihlášení interního (ginis) uživatele.*/
		IsInternalLoginAllowed?: boolean|null;
	}
	const enum GInitialSequenceOutputDataPublicLoginFormNames { AuthDatoveSchranky = "AuthDatoveSchranky", AuthNia = "AuthNia", AuthMojeId = "AuthMojeId", AuthVysocinaId = "AuthVysocinaId", IsCaptchaRequired = "IsCaptchaRequired", IsRegistrationAllowed = "IsRegistrationAllowed", HelpTemplate = "HelpTemplate", IsInternalLoginAllowed = "IsInternalLoginAllowed", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataPublicLoginFormFragments { AuthDatoveSchranky = "*", AuthNia = "*", AuthMojeId = "*", AuthVysocinaId = "*", IsCaptchaRequired = "*", IsRegistrationAllowed = "*", HelpTemplate = "*", IsInternalLoginAllowed = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataPublicLoginFormTypes { AuthDatoveSchranky = "string", AuthNia = "string", AuthMojeId = "string", AuthVysocinaId = "string", IsCaptchaRequired = "boolean", IsRegistrationAllowed = "boolean", HelpTemplate = "string", IsInternalLoginAllowed = "boolean", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataPublicLoginFormTypeLengths {}
	interface GInitialSequenceOutputDataPasswordChange extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		/**Minimální síla hesla jako validační atributy pro Password validator.*/
		readonly ValidationArgs?: any|null;
		/**Příznak, zda je vyžadováno i staré heslo. Plati true pro všechny
		*     případy krom zapomenutého hesla.
		*/
		IsOldPasswordRequired?: boolean|null;
	}
	const enum GInitialSequenceOutputDataPasswordChangeNames { ValidationArgs = "ValidationArgs", IsOldPasswordRequired = "IsOldPasswordRequired", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataPasswordChangeFragments { ValidationArgs = "*", IsOldPasswordRequired = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataPasswordChangeTypes { ValidationArgs = "any", IsOldPasswordRequired = "boolean", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataPasswordChangeTypeLengths {}
	/**Data k zobrazení dialogu pro odemknutí uzamčené klientské aplikace.*/
	interface GInitialSequenceOutputDataUnlock extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
	}
	const enum GInitialSequenceOutputDataUnlockNames { Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataUnlockFragments { Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataUnlockTypes { Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataUnlockTypeLengths {}
	/**Data k výsledku posloupnosti kroků prováděných při inicializaci
	*     aplikace - výběr 1 z N
	*/
	interface GInitialSequenceOutputData1OfN extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		/**Řádky pro výběr*/
		Table?: ObjectLiteral<string>[]|null;
		/**Popis zobrazení tabulky*/
		Format?: any|null;
		/**Název sloupce, který se má použít jako návratová hodnota.*/
		ReturnColumns?: string[]|null;
		/**Názvy klíčů v GPC. Jejich pořadí musí odpovídat pořadí v ReturnColumns.
		*     Pokud není vyplněno, tak se pro dohledání použije název z ReturnColumns.
		*/
		GpcKeys?: string[]|null;
		/**Příznak, zda je možné automaticky vybrat (bez interakce s uživatelem) poslední klientsky uloženou hodnotu.
		*     
		*     Null / GNull - vypínají možnost automatického výběru kompletně.
		*     True / False - umožňuje zobrazit uživateli volbu, zda chce poslední hodnotu "zapamatovat" i pro příště.
		*     True - V tomto případě je možné automaticky vybrat poslední hodnotu.
		*     False - Nucené zakázání použití poslední hodnoty. Uživatel si ji opět může "zapamatovat" pro další použití. Slouží především ke změně.
		*/
		AutoSelectLastValue?: boolean|null;
		/**Názvy sloupců, které musí být viditelné i v případ, že jsou pro všechny řádky stejné, nebo prázdné.*/
		AlwaysVisibleColumns?: string[]|null;
	}
	const enum GInitialSequenceOutputData1OfNNames { Table = "Table", Format = "Format", ReturnColumns = "ReturnColumns", GpcKeys = "GpcKeys", AutoSelectLastValue = "AutoSelectLastValue", AlwaysVisibleColumns = "AlwaysVisibleColumns", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputData1OfNFragments { Table = "*", Format = "*", ReturnColumns = "*", GpcKeys = "*", AutoSelectLastValue = "*", AlwaysVisibleColumns = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputData1OfNTypes { Table = "ObjectLiteral<string>[]", Format = "any", ReturnColumns = "string[]", GpcKeys = "string[]", AutoSelectLastValue = "boolean", AlwaysVisibleColumns = "string[]", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputData1OfNTypeLengths {}
	/**data k zobrazení oznámení uživateli*/
	interface GInitialSequenceOutputDataNotice extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		/**Zpráva pro uživatele. Může obsahovat HTML značky.*/
		Notice?: string|null;
		/**Příznak zda povolit postup vpřed (zda zobrazit tlačítko "Další").*/
		AllowNext?: boolean|null;
		/**Klíč, pod kterým se uloží výsledek uživatelovy volby do
		*     , pokud přejde
		*     uživatel na další (next), nastaví se tento klíč na true, jinak 
		*     se vůbec nenastaví. Díky tomu je možné použít Notice pro Ano/Ne
		*     volbu kdy přechodem na "další" uživatel akci potvrdí, vrácením
		*     "zpět" akci zamítne.
		*/
		UserChooseNextKey?: string|null;
	}
	const enum GInitialSequenceOutputDataNoticeNames { Notice = "Notice", AllowNext = "AllowNext", UserChooseNextKey = "UserChooseNextKey", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataNoticeFragments { Notice = "*", AllowNext = "*", UserChooseNextKey = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataNoticeTypes { Notice = "string", AllowNext = "boolean", UserChooseNextKey = "string", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataNoticeTypeLengths {}
	/**Data k zobrazení dialogu pro zadání ověřovacího TOTP kódu pro přihlášení uživatele.*/
	interface GInitialSequenceOutputDataTOTPCode extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		Message?: string|null;
		/**"info"  | "success" | "warning"  | "error"  | "important"*/
		MessageState?: Gordic.General.ApplicationClient.GInfoStateEnum|null;
	}
	const enum GInitialSequenceOutputDataTOTPCodeNames { Message = "Message", MessageState = "MessageState", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataTOTPCodeFragments { Message = "*", MessageState = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataTOTPCodeTypes { Message = "string", MessageState = "Gordic.General.ApplicationClient.GInfoStateEnum", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataTOTPCodeTypeLengths {}
	/**Třída pro kontrolovanou serializaci GGridFormat. Některé property
	*     totiž serializovat nelze a nebo se serializují nevhodně (např.
	*     barvy).
	*/
	interface GGridFormatConverter {
		/**Příznak že tento Converter nepodporuje deserializaci*/
		readonly CanRead?: boolean|null;
	}
	const enum GGridFormatConverterNames { CanRead = "CanRead", CanWrite = "CanWrite",}
	const enum GGridFormatConverterFragments { CanRead = "*", CanWrite = "*",}
	const enum GGridFormatConverterTypes { CanRead = "boolean", CanWrite = "boolean",}
	const enum GGridFormatConverterTypeLengths {}
	interface GInitialSequenceOutputDataXrgPublicLoginForm extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		/**Příznak, zda při přihlášení vyžadovat captcha ověření. Má smysl při
		*     opakovaném zadávání neplatného jména/hesla.
		*/
		IsCaptchaRequired?: boolean|null;
		/**HTML s textem nápovědy.*/
		HelpTemplate?: string|null;
	}
	const enum GInitialSequenceOutputDataXrgPublicLoginFormNames { IsCaptchaRequired = "IsCaptchaRequired", HelpTemplate = "HelpTemplate", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataXrgPublicLoginFormFragments { IsCaptchaRequired = "*", HelpTemplate = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataXrgPublicLoginFormTypes { IsCaptchaRequired = "boolean", HelpTemplate = "string", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataXrgPublicLoginFormTypeLengths {}
	/**Data k zobrazení chybové zprávy uživateli.*/
	interface GInitialSequenceOutputDataErrorNotice extends Gordic.General.ApplicationClient.GInitialSequenceOutputData {
		/**Identifikátor chyby.*/
		ErrorId?: string|null;
	}
	const enum GInitialSequenceOutputDataErrorNoticeNames { ErrorId = "ErrorId", Type = "Type", Title = "Title", Subtitle = "Subtitle", Notify = "Notify", SupportedCultures = "SupportedCultures", CurrentCulture = "CurrentCulture",}
	const enum GInitialSequenceOutputDataErrorNoticeFragments { ErrorId = "*", Type = "*", Title = "*", Subtitle = "*", Notify = "*", SupportedCultures = "*", CurrentCulture = "*",}
	const enum GInitialSequenceOutputDataErrorNoticeTypes { ErrorId = "string", Type = "string", Title = "string", Subtitle = "string", Notify = "Gordic.General.ApplicationClient.GNotifyUser", SupportedCultures = "Gordic.General.ApplicationInterface.GCultureDto[]", CurrentCulture = "string",}
	const enum GInitialSequenceOutputDataErrorNoticeTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationClient\InitialSequence\Gordic.General.ApplicationClient.GInitialSequenceResult.d.ts 

declare namespace Gordic.General.ApplicationClient {
	/**stav zpracování posloupnosti kroků prováděných při inicializaci aplikace*/
	const enum InitialSequenceResult {
		/**zpracování bylo úspěšně dokončeno*/
		Success=0,
		/**zpracování skončilo s výjimkou*/
		Error=1,
		/**k dokončení zpracování je zapotřebí dodatečných informací*/
		NeedMoreInfo=2,
		/**chceme uživateli zobrazit hlášku a případně zamezit postup vpřed*/
		Notice=3,
	}
	/**výsledek posloupnosti kroků prováděných při inicializaci aplikace*/
	interface GInitialSequenceResult {
		/**kód výsledku*/
		readonly Code?: Gordic.General.ApplicationClient.InitialSequenceResult|null;
		/**původce výsledku*/
		readonly Sender?: string|null;
		/**výstupní parametry*/
		readonly OutputParameters?: any|null;
		/**výstupní data*/
		OutputData?: Gordic.General.ApplicationClient.GInitialSequenceOutputData|null;
		/**informace o výjimce*/
		readonly ExceptionInfo?: Gordic.General.ApplicationInterface.GExceptionInfo|null;
		/**příznak změny kontextu*/
		ContextChanged?: boolean|null;
		/**příznak dokončení inicializační sekvence u aktuálního nebo některého z předchozích požadavků*/
		AnySequenceFinished?: boolean|null;
		/**původce výsledku při dokončení inicializační sekvence*/
		readonly SequenceFinishedSender?: string|null;
	}
	const enum GInitialSequenceResultNames { Code = "Code", Sender = "Sender", OutputParameters = "OutputParameters", OutputData = "OutputData", ExceptionInfo = "ExceptionInfo", ContextChanged = "ContextChanged", AnySequenceFinished = "AnySequenceFinished", SequenceFinishedSender = "SequenceFinishedSender",}
	const enum GInitialSequenceResultFragments { Code = "*", Sender = "*", OutputParameters = "*", OutputData = "*", ExceptionInfo = "*", ContextChanged = "*", AnySequenceFinished = "*", SequenceFinishedSender = "*",}
	const enum GInitialSequenceResultTypes { Code = "Gordic.General.ApplicationClient.InitialSequenceResult", Sender = "string", OutputParameters = "any", OutputData = "Gordic.General.ApplicationClient.GInitialSequenceOutputData", ExceptionInfo = "Gordic.General.ApplicationInterface.GExceptionInfo", ContextChanged = "boolean", AnySequenceFinished = "boolean", SequenceFinishedSender = "string",}
	const enum GInitialSequenceResultTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationClient\InitialSequence\Gordic.General.ApplicationClient.GProfileInfo.d.ts 

declare namespace Gordic.General.ApplicationClient {
	/**požadované chování logovacího dialogu*/
	const enum LoginDialogBehavior {
		/**je možno zadat jméno a heslo*/
		UserAndPassword=1,
		/**prosté zobrazení výchozího jména, bez možnosti jeho změny a bez možnosti nastavit heslo*/
		DefaultUserOnly=2,
		/**zobrazení výchozího jména s možností zadat heslo*/
		PasswordOnly=3,
		/**dle výběru uživatele*/
		Selectable=0,
	}
	/**informace o databázovém profilu pro logovací dialog*/
	interface GProfileInfo {
		/**název databázového profilu*/
		Profile?: string|null;
		/**požadované chování logovacího dialogu*/
		Behavior?: Gordic.General.ApplicationClient.LoginDialogBehavior|null;
		/**výchozí uživatelské jméno*/
		DefaultUser?: string|null;
		/**příznak možnosti přihlášení pomocí uživatele přihlášeného do Windows*/
		WindowsLogin?: boolean|null;
		/**příznak možnosti přihlášení pomocí uživatele Azure Active Directory*/
		AzureLogin?: boolean|null;
		/**identifikátor klienta Azure Active Directory*/
		AzureClientId?: string|null;
		/**identifikátor nebo doména zákazníka Azure Active Directory*/
		AzureTenant?: string|null;
		/**výchozí způsob přihlášení do systému*/
		DefaultLoginMethod?: 'ginis' | 'windows' | 'azure' | '' |null;
		/**Poznámka databázového profilu.*/
		Description?: string|null;
		/**Typ databáze*/
		DatabaseType?: Gordic.General.GCommon.DatabaseType|null;
	}
	const enum GProfileInfoNames { Profile = "Profile", Behavior = "Behavior", DefaultUser = "DefaultUser", WindowsLogin = "WindowsLogin", AzureLogin = "AzureLogin", AzureClientId = "AzureClientId", AzureTenant = "AzureTenant", DefaultLoginMethod = "DefaultLoginMethod", Description = "Description", DatabaseType = "DatabaseType",}
	const enum GProfileInfoFragments { Profile = "*", Behavior = "*", DefaultUser = "*", WindowsLogin = "*", AzureLogin = "*", AzureClientId = "*", AzureTenant = "*", DefaultLoginMethod = "*", Description = "*", DatabaseType = "*",}
	const enum GProfileInfoTypes { Profile = "string", Behavior = "Gordic.General.ApplicationClient.LoginDialogBehavior", DefaultUser = "string", WindowsLogin = "boolean", AzureLogin = "boolean", AzureClientId = "string", AzureTenant = "string", DefaultLoginMethod = "'ginis' | 'windows' | 'azure' | '' ", Description = "string", DatabaseType = "Gordic.General.GCommon.DatabaseType",}
	const enum GProfileInfoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.General.ApplicationClient\InitialSequence\Gordic.General.ApplicationClient.GUserMenu.d.ts 

declare namespace Gordic.General.ApplicationClient {
	const enum GUserMenuNames { Infos = "Infos", Actions = "Actions",}
	const enum GUserMenuFragments { Infos = "*", Actions = "*",}
	const enum GUserMenuTypes { Infos = "Gordic.General.ApplicationClient.GUserMenuInfos", Actions = "Gordic.General.ApplicationClient.GUserMenuActions",}
	/**Seznam stavů, obvykle vizualizovaný barvou*/
	const enum GInfoStateEnum {
		/**neurčeno*/
		none=0,
		/**něco důležitého (růžová)*/
		important=1,
		/**chyba (červená)*/
		error,
		/**upozornění (žlutá)*/
		warning,
		/**úspěch (zelená)*/
		success,
		/**informace (modrá)*/
		info,
	}
	interface GUserMenuInfo {
		Id?: string|null;
		Title?: string|null;
		Value?: string|null;
		/**Tooltip*/
		Description?: string|null;
		/**Priorita viditelnosti*/
		VisiblePriority?: number|null;
		/**Zarovnat na opacnou stranu*/
		Opposite?: boolean|null;
		/**Dalsi children*/
		Children?: Gordic.General.ApplicationClient.GUserMenuInfo[]|null;
		Parameters?: any|null;
		/**Rozlišení barvy*/
		State?: Gordic.General.ApplicationClient.GInfoStateEnum|null;
	}
	const enum GUserMenuInfoNames { Id = "Id", Title = "Title", Value = "Value", Description = "Description", VisiblePriority = "VisiblePriority", Opposite = "Opposite", Children = "Children", Parameters = "Parameters", State = "State",}
	const enum GUserMenuInfoFragments { Id = "*", Title = "*", Value = "*", Description = "*", VisiblePriority = "*", Opposite = "*", Children = "*", Parameters = "*", State = "*",}
	const enum GUserMenuInfoTypes { Id = "string", Title = "string", Value = "string", Description = "string", VisiblePriority = "number", Opposite = "boolean", Children = "Gordic.General.ApplicationClient.GUserMenuInfo[]", Parameters = "any", State = "Gordic.General.ApplicationClient.GInfoStateEnum",}
}

//#endregion

