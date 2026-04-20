/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       mpd.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Mpd.Interface\Gordic.Mpd.Interface.csproj
*    created     2026-02-16 14:34:34
*    files       Dto\Gordic.Mpd.Interface.GMpdAsyncTaskDto.d.ts
*                Dto\Gordic.Mpd.Interface.GMpdFileListDto.d.ts
*                Dto\Gordic.Mpd.Interface.GMpdFilesDto.d.ts
*                Dto\Gordic.Mpd.Interface.GMpdSettings.d.ts
*                Dto\Gordic.Mpd.Interface.GMpdTransferDirectionsDto.d.ts
*                Dto\Gordic.Mpd.Interface.GMpdTransferTypesDto.d.ts
*                Dto\Gordic.Mpd.Interface.GMpdUnrealizedTransfersDto.d.ts
*                FilterDto\Gordic.Mpd.Interface.GMpdFileListFilterDto.d.ts
*                FilterDto\Gordic.Mpd.Interface.GMpdFilesFilterDto.d.ts
*                FilterDto\Gordic.Mpd.Interface.GMpdTransferDirectionsFilterDto.d.ts
*                FilterDto\Gordic.Mpd.Interface.GMpdTransferTypesFilterDto.d.ts
*                FilterDto\Gordic.Mpd.Interface.GMpdUnrealizedTransfersFilterDto.d.ts
*                Isl\Gordic.Mpd.Interface.IGArchivedFiles.d.ts
*                Isl\Gordic.Mpd.Interface.IGExportedFiles.d.ts
*                Isl\Gordic.Mpd.Interface.IGFilesToImport.d.ts
*                Isl\Gordic.Mpd.Interface.IGFilesToSend.d.ts
*                Isl\Gordic.Mpd.Interface.IGImportedFiles.d.ts
*                Isl\Gordic.Mpd.Interface.IGLastProcessedFiles.d.ts
*                Isl\Gordic.Mpd.Interface.IGTransferDirections.d.ts
*                Isl\Gordic.Mpd.Interface.IGTransferTypes.d.ts
*                Isl\Gordic.Mpd.Interface.IGUnrealizedTransfers.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Dto\Gordic.Mpd.Interface.GMpdAsyncTaskDto.d.ts 

declare namespace Gordic.Mpd.Interface {
    /**stavové informace z asynchronní úlohy*/
    interface GMpdAsyncTaskDto extends Gordic.General.ApplicationInterface.GAsyncProgressDto {
        /**příznak probíhajícího zpracování*/
        isProcessing?: boolean|null;
        /**informace o průběhu zpracování*/
        info?: string|null;
        /**časové informace o průběhu zpracování*/
        time?: string|null;
        /**informace o aktuálním kroku zpracování*/
        steps?: string|null;
        /**aktuální procento zpracování*/
        progress?: number|null;
        /**informace o pořadí aktuálně prováděného příkazu*/
        order?: string|null;
        /**informace o aktuálně prováděném příkazu*/
        command?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Dto\Gordic.Mpd.Interface.GMpdFileListDto.d.ts 

declare namespace Gordic.Mpd.Interface {
    /**položka seznamu souborů*/
    interface GMpdFileListDto {
        /**název souboru*/
        file?: string|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Dto\Gordic.Mpd.Interface.GMpdFilesDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**položka seznamu datových dávek*/
	interface GMpdFilesDto {
		/**licence adresáta*/
		lic_adr?: string|null;
		/**licence odesílatele*/
		lic?: string|null;
		/**typ přenosu*/
		typ_pren?: string|null;
		/**popis typu přenosu*/
		typ_pren_txt?: string|null;
		/**pořadí*/
		por_zpr?: number|null;
		/**datum vytvoření*/
		dat_vytv?: JsonDate|null;
		/**datum zpracování*/
		dat_zpr?: JsonDate|null;
		/**kód výsledku zpracování*/
		kod_zpr?: string|null;
		/**popis výsledku zpracování*/
		kod_zpr_txt?: string|null;
		/**stav archivace*/
		priz_arch?: number|null;
		/**popis stavu archivace*/
		priz_arch_txt?: string|null;
		/**název datové dávky*/
		file?: string|null;
		/**poznámka*/
		poznamka?: string|null;
	}
	const enum GMpdFilesDtoNames { lic_adr = "lic_adr", lic = "lic", typ_pren = "typ_pren", typ_pren_txt = "typ_pren_txt", por_zpr = "por_zpr", dat_vytv = "dat_vytv", dat_zpr = "dat_zpr", kod_zpr = "kod_zpr", kod_zpr_txt = "kod_zpr_txt", priz_arch = "priz_arch", priz_arch_txt = "priz_arch_txt", file = "file", poznamka = "poznamka",}
	const enum GMpdFilesDtoFragments { lic_adr = "*", lic = "*", typ_pren = "*", typ_pren_txt = "*", por_zpr = "*", dat_vytv = "*", dat_zpr = "*", kod_zpr = "*", kod_zpr_txt = "*", priz_arch = "*", priz_arch_txt = "*", file = "*", poznamka = "*",}
	const enum GMpdFilesDtoTypes { lic_adr = "string", lic = "string", typ_pren = "string", typ_pren_txt = "string", por_zpr = "number", dat_vytv = "JsonDate", dat_zpr = "JsonDate", kod_zpr = "string", kod_zpr_txt = "string", priz_arch = "number", priz_arch_txt = "string", file = "string", poznamka = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Dto\Gordic.Mpd.Interface.GMpdSettings.d.ts 

declare namespace Gordic.Mpd.Interface {
    /**nastavení přenosů dat*/
	interface GMpdSettings {
        /**cesta k adresáři pro datové dávky*/
		DataPath?: string|null;
        /**cesta k adresáři pro archivaci datových dávek*/
		ArchPath?: string|null;
        /**cesta k adresáři pro dočasné soubory*/
		TmpPath?: string|null;
        /**doba archivace dávek po jejich zpracování ve dnech*/
		CleanInterval?: number|null;
        /**příznak povolení automatického zpracování*/
		AutoRun?: boolean|null;
        /**příznak automatického opakování importu*/
		AutoReload?: boolean|null;
        /**příznak povolení automatického odmazávání archivu*/
		AutoClean?: boolean|null;
        /**příznak provozu v režimu centrálního uzlu*/
		CentralMode?: boolean|null;
        /**příznak provádění kontroly uzamčení databáze před začátkem zpracování*/
		CheckDbLock?: boolean|null;
        /**příznak stahování dávek pomocí FTP před načítáním*/
		FtpDownload?: boolean|null;
        /**příznak ukládání dávek pomocí FTP po generování*/
		FtpUpload?: boolean|null;
        /**příznak stahování dávek pomocí webových služeb před načítáním*/
		WsDownload?: boolean|null;
        /**příznak ukládání dávek pomocí webových služeb po generování*/
		WsUpload?: boolean|null;
        /**příznak monitorování provozu aplikace*/
		UseMonitoring?: boolean|null;
        /**příznak používání FTP uložiště*/
		UseFtp?: boolean|null;
        /**příznak načítání sdílených dávek z FTP uložiště*/
		FtpDownloadUniversal?: boolean|null;
        /**příznak zápisu sdílených dávek do FTP uložiště*/
		FtpUploadUniversal?: boolean|null;
        /**adresa FTP serveru*/
		FtpServer?: string|null;
        /**adresář pro čtení dávek z FTP uložiště*/
		FtpDownloadDir?: string|null;
        /**adresář pro zápis dávek do FTP uložiště*/
		FtpUploadDir?: string|null;
        /**uživatelské jméno pro přihlášení k FTP serveru*/
		FtpLogin?: string|null;
        /**heslo pro přihlášení k FTP serveru*/
		FtpPassword?: string|null;
        /**časový limit pro komunikaci s FTP serverem v sekundách*/
		FtpTimeout?: number|null;
        /**příznak pasivní komunikace s FTP serverem*/
		FtpPassive?: boolean|null;
        /**příznak používání webových služeb*/
		UseWs?: boolean|null;
        /**příznak načítání sdílených dávek pomocí webových služeb*/
		WsDownloadUniversal?: boolean|null;
        /**příznak zápisu sdílených dávek pomocí webových služeb*/
		WsUploadUniversal?: boolean|null;
        /**URL adresa webových služeb*/
		WsUrl?: string|null;
        /**adresář pro čtení dávek pomocí webových služeb*/
		WsDownloadDir?: string|null;
        /**adresář pro zápis dávek pomocí webových služeb*/
		WsUploadDir?: string|null;
        /**uživatelské jméno pro přístup k webovým službám*/
		WsLogin?: string|null;
        /**heslo pro přístup k webovým službám*/
		WsPassword?: string|null;
        /**příznak přístupu k webovým službám pomocí hesla v otevřeném tvaru*/
		WsPlainText?: boolean|null;
        /**příznak přístupu k webovým službám pomocí HTTP basic autentizace*/
		WsHttpBasic?: boolean|null;
        /**příznak přístupu k webovým službám pomocí HTTP digest autentizace*/
		WsHttpDigest?: boolean|null;
        /**časový limit pro komunikaci s webovými službami v sekundách*/
		WsTimeout?: number|null;
        /**protokol pro zabezpečení komunikace s webovými službami*/
		WsSecurityProtocol?: string|null;
        /**příznak hodnoty jen ke čtení pro cestu k adresáři pro datové dávky*/
		readonly DataPathReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro cestu k adresáři pro archivaci datových dávek*/
		readonly ArchPathReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro cestu k adresáři pro dočasné soubory*/
		readonly TmpPathReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro dobu archivace dávek*/
		readonly CleanIntervalReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro povolení automatického zpracování*/
		readonly AutoRunReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro automatické opakování importu*/
		readonly AutoReloadReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro povolení automatického odmazávání archivu*/
		readonly AutoCleanReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak provozu v režimu centrálního uzlu*/
		readonly CentralModeReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak provádění kontroly uzamčení databáze před začátkem zpracování*/
		readonly CheckDbLockReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak stahování dávek pomocí FTP před načítáním*/
		readonly FtpDownloadReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak ukládání dávek pomocí FTP po generování*/
		readonly FtpUploadReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak stahování dávek pomocí webových služeb před načítáním*/
		readonly WsDownloadReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak ukládání dávek pomocí webových služeb po generování*/
		readonly WsUploadReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak monitorování provozu aplikace*/
		readonly UseMonitoringReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak používání FTP uložiště*/
		readonly UseFtpReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak načítání sdílených dávek z FTP uložiště*/
		readonly FtpDownloadUniversalReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak zápisu sdílených dávek do FTP uložiště*/
		readonly FtpUploadUniversalReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro adresu FTP serveru*/
		readonly FtpServerReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro adresář pro čtení dávek z FTP uložiště*/
		readonly FtpDownloadDirReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro adresář pro zápis dávek do FTP uložiště*/
		readonly FtpUploadDirReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro uživatelské jméno pro přihlášení k FTP serveru*/
		readonly FtpLoginReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro heslo pro přihlášení k FTP serveru*/
		readonly FtpPasswordReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro časový limit pro komunikaci s FTP serverem v sekundách*/
		readonly FtpTimeoutReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak pasivní komunikace s FTP serverem*/
		readonly FtpPassiveReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak používání webových služeb*/
		readonly UseWsReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak načítání sdílených dávek pomocí webových služeb*/
		readonly WsDownloadUniversalReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak zápisu sdílených dávek pomocí webových služeb*/
		readonly WsUploadUniversalReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro URL adresu webových služeb*/
		readonly WsUrlReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro adresář pro čtení dávek pomocí webových služeb*/
		readonly WsDownloadDirReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro adresář pro zápis dávek pomocí webových služeb*/
		readonly WsUploadDirReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro uživatelské jméno pro přístup k webovým službám*/
		readonly WsLoginReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro heslo pro přístup k webovým službám*/
		readonly WsPasswordReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak přístupu k webovým službám pomocí hesla v otevřeném tvaru*/
		readonly WsPlainTextReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak přístupu k webovým službám pomocí HTTP basic autentizace*/
		readonly WsHttpBasicReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro příznak přístupu k webovým službám pomocí HTTP digest autentizace*/
		readonly WsHttpDigestReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro časový limit pro komunikaci s webovými službami v sekundách*/
		readonly WsTimeoutReadonly?: boolean|null;
        /**příznak hodnoty jen ke čtení pro protokol pro zabezpečení komunikace s webovými službami*/
		readonly WsSecurityProtocolReadonly?: boolean|null;
	}
	const enum GMpdSettingsNames { DataPath = "DataPath", ArchPath = "ArchPath", TmpPath = "TmpPath", CleanInterval = "CleanInterval", AutoRun = "AutoRun", AutoReload = "AutoReload", AutoClean = "AutoClean", CentralMode = "CentralMode", CheckDbLock = "CheckDbLock", FtpDownload = "FtpDownload", FtpUpload = "FtpUpload", WsDownload = "WsDownload", WsUpload = "WsUpload", UseMonitoring = "UseMonitoring", UseFtp = "UseFtp", FtpDownloadUniversal = "FtpDownloadUniversal", FtpUploadUniversal = "FtpUploadUniversal", FtpServer = "FtpServer", FtpDownloadDir = "FtpDownloadDir", FtpUploadDir = "FtpUploadDir", FtpLogin = "FtpLogin", FtpPassword = "FtpPassword", FtpTimeout = "FtpTimeout", FtpPassive = "FtpPassive", UseWs = "UseWs", WsDownloadUniversal = "WsDownloadUniversal", WsUploadUniversal = "WsUploadUniversal", WsUrl = "WsUrl", WsDownloadDir = "WsDownloadDir", WsUploadDir = "WsUploadDir", WsLogin = "WsLogin", WsPassword = "WsPassword", WsPlainText = "WsPlainText", WsHttpBasic = "WsHttpBasic", WsHttpDigest = "WsHttpDigest", WsTimeout = "WsTimeout", WsSecurityProtocol = "WsSecurityProtocol", DataPathReadonly = "DataPathReadonly", ArchPathReadonly = "ArchPathReadonly", TmpPathReadonly = "TmpPathReadonly", CleanIntervalReadonly = "CleanIntervalReadonly", AutoRunReadonly = "AutoRunReadonly", AutoReloadReadonly = "AutoReloadReadonly", AutoCleanReadonly = "AutoCleanReadonly", CentralModeReadonly = "CentralModeReadonly", CheckDbLockReadonly = "CheckDbLockReadonly", FtpDownloadReadonly = "FtpDownloadReadonly", FtpUploadReadonly = "FtpUploadReadonly", WsDownloadReadonly = "WsDownloadReadonly", WsUploadReadonly = "WsUploadReadonly", UseMonitoringReadonly = "UseMonitoringReadonly", UseFtpReadonly = "UseFtpReadonly", FtpDownloadUniversalReadonly = "FtpDownloadUniversalReadonly", FtpUploadUniversalReadonly = "FtpUploadUniversalReadonly", FtpServerReadonly = "FtpServerReadonly", FtpDownloadDirReadonly = "FtpDownloadDirReadonly", FtpUploadDirReadonly = "FtpUploadDirReadonly", FtpLoginReadonly = "FtpLoginReadonly", FtpPasswordReadonly = "FtpPasswordReadonly", FtpTimeoutReadonly = "FtpTimeoutReadonly", FtpPassiveReadonly = "FtpPassiveReadonly", UseWsReadonly = "UseWsReadonly", WsDownloadUniversalReadonly = "WsDownloadUniversalReadonly", WsUploadUniversalReadonly = "WsUploadUniversalReadonly", WsUrlReadonly = "WsUrlReadonly", WsDownloadDirReadonly = "WsDownloadDirReadonly", WsUploadDirReadonly = "WsUploadDirReadonly", WsLoginReadonly = "WsLoginReadonly", WsPasswordReadonly = "WsPasswordReadonly", WsPlainTextReadonly = "WsPlainTextReadonly", WsHttpBasicReadonly = "WsHttpBasicReadonly", WsHttpDigestReadonly = "WsHttpDigestReadonly", WsTimeoutReadonly = "WsTimeoutReadonly", WsSecurityProtocolReadonly = "WsSecurityProtocolReadonly",}
	const enum GMpdSettingsFragments { DataPath = "*", ArchPath = "*", TmpPath = "*", CleanInterval = "*", AutoRun = "*", AutoReload = "*", AutoClean = "*", CentralMode = "*", CheckDbLock = "*", FtpDownload = "*", FtpUpload = "*", WsDownload = "*", WsUpload = "*", UseMonitoring = "*", UseFtp = "*", FtpDownloadUniversal = "*", FtpUploadUniversal = "*", FtpServer = "*", FtpDownloadDir = "*", FtpUploadDir = "*", FtpLogin = "*", FtpPassword = "*", FtpTimeout = "*", FtpPassive = "*", UseWs = "*", WsDownloadUniversal = "*", WsUploadUniversal = "*", WsUrl = "*", WsDownloadDir = "*", WsUploadDir = "*", WsLogin = "*", WsPassword = "*", WsPlainText = "*", WsHttpBasic = "*", WsHttpDigest = "*", WsTimeout = "*", WsSecurityProtocol = "*", DataPathReadonly = "*", ArchPathReadonly = "*", TmpPathReadonly = "*", CleanIntervalReadonly = "*", AutoRunReadonly = "*", AutoReloadReadonly = "*", AutoCleanReadonly = "*", CentralModeReadonly = "*", CheckDbLockReadonly = "*", FtpDownloadReadonly = "*", FtpUploadReadonly = "*", WsDownloadReadonly = "*", WsUploadReadonly = "*", UseMonitoringReadonly = "*", UseFtpReadonly = "*", FtpDownloadUniversalReadonly = "*", FtpUploadUniversalReadonly = "*", FtpServerReadonly = "*", FtpDownloadDirReadonly = "*", FtpUploadDirReadonly = "*", FtpLoginReadonly = "*", FtpPasswordReadonly = "*", FtpTimeoutReadonly = "*", FtpPassiveReadonly = "*", UseWsReadonly = "*", WsDownloadUniversalReadonly = "*", WsUploadUniversalReadonly = "*", WsUrlReadonly = "*", WsDownloadDirReadonly = "*", WsUploadDirReadonly = "*", WsLoginReadonly = "*", WsPasswordReadonly = "*", WsPlainTextReadonly = "*", WsHttpBasicReadonly = "*", WsHttpDigestReadonly = "*", WsTimeoutReadonly = "*", WsSecurityProtocolReadonly = "*",}
	const enum GMpdSettingsTypes { DataPath = "string", ArchPath = "string", TmpPath = "string", CleanInterval = "number", AutoRun = "boolean", AutoReload = "boolean", AutoClean = "boolean", CentralMode = "boolean", CheckDbLock = "boolean", FtpDownload = "boolean", FtpUpload = "boolean", WsDownload = "boolean", WsUpload = "boolean", UseMonitoring = "boolean", UseFtp = "boolean", FtpDownloadUniversal = "boolean", FtpUploadUniversal = "boolean", FtpServer = "string", FtpDownloadDir = "string", FtpUploadDir = "string", FtpLogin = "string", FtpPassword = "string", FtpTimeout = "number", FtpPassive = "boolean", UseWs = "boolean", WsDownloadUniversal = "boolean", WsUploadUniversal = "boolean", WsUrl = "string", WsDownloadDir = "string", WsUploadDir = "string", WsLogin = "string", WsPassword = "string", WsPlainText = "boolean", WsHttpBasic = "boolean", WsHttpDigest = "boolean", WsTimeout = "number", WsSecurityProtocol = "string", DataPathReadonly = "boolean", ArchPathReadonly = "boolean", TmpPathReadonly = "boolean", CleanIntervalReadonly = "boolean", AutoRunReadonly = "boolean", AutoReloadReadonly = "boolean", AutoCleanReadonly = "boolean", CentralModeReadonly = "boolean", CheckDbLockReadonly = "boolean", FtpDownloadReadonly = "boolean", FtpUploadReadonly = "boolean", WsDownloadReadonly = "boolean", WsUploadReadonly = "boolean", UseMonitoringReadonly = "boolean", UseFtpReadonly = "boolean", FtpDownloadUniversalReadonly = "boolean", FtpUploadUniversalReadonly = "boolean", FtpServerReadonly = "boolean", FtpDownloadDirReadonly = "boolean", FtpUploadDirReadonly = "boolean", FtpLoginReadonly = "boolean", FtpPasswordReadonly = "boolean", FtpTimeoutReadonly = "boolean", FtpPassiveReadonly = "boolean", UseWsReadonly = "boolean", WsDownloadUniversalReadonly = "boolean", WsUploadUniversalReadonly = "boolean", WsUrlReadonly = "boolean", WsDownloadDirReadonly = "boolean", WsUploadDirReadonly = "boolean", WsLoginReadonly = "boolean", WsPasswordReadonly = "boolean", WsPlainTextReadonly = "boolean", WsHttpBasicReadonly = "boolean", WsHttpDigestReadonly = "boolean", WsTimeoutReadonly = "boolean", WsSecurityProtocolReadonly = "boolean",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Dto\Gordic.Mpd.Interface.GMpdTransferDirectionsDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**položka seznamu směrů přenosů*/
	interface GMpdTransferDirectionsDto {
		/**typ přenosu*/
		typ_pren?: string|null;
		/**popis typu přenosu*/
		typ_pren_txt?: string|null;
		/**licence adresáta*/
		lic_adr?: string|null;
		/**popis licence adresáta*/
		lic_adr_txt?: string|null;
		/**poznámka*/
		poznamka?: string|null;
	}
	const enum GMpdTransferDirectionsDtoNames { typ_pren = "typ_pren", typ_pren_txt = "typ_pren_txt", lic_adr = "lic_adr", lic_adr_txt = "lic_adr_txt", poznamka = "poznamka",}
	const enum GMpdTransferDirectionsDtoFragments { typ_pren = "*", typ_pren_txt = "*", lic_adr = "*", lic_adr_txt = "*", poznamka = "*",}
	const enum GMpdTransferDirectionsDtoTypes { typ_pren = "string", typ_pren_txt = "string", lic_adr = "string", lic_adr_txt = "string", poznamka = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Dto\Gordic.Mpd.Interface.GMpdTransferTypesDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**položka seznamu typů přenosů*/
	interface GMpdTransferTypesDto {
		/**typ přenosu*/
		typ_pren?: string|null;
		/**popis typu přenosu*/
		typ_pren_txt?: string|null;
		/**interval generování*/
		povol?: string|null;
		/**popis intervalu generování*/
		povol_txt?: string|null;
		/**kód stylu*/
		styl?: string|null;
		/**příznak povolení exportu*/
		aktivita_gen?: number|null;
		/**popis příznaku povolení exportu*/
		aktivita_gen_txt?: string|null;
		/**příznak povolení importu*/
		aktivita_load?: number|null;
		/**popis příznaku povolení importu*/
		aktivita_load_txt?: string|null;
		/**příznak povolení výmazu z archivu*/
		aktivita_clean?: number|null;
		/**popis příznaku povolení výmazu z archivu*/
		aktivita_clean_txt?: string|null;
		/**poznámka*/
		poznamka?: string|null;
	}
	const enum GMpdTransferTypesDtoNames { typ_pren = "typ_pren", typ_pren_txt = "typ_pren_txt", povol = "povol", povol_txt = "povol_txt", styl = "styl", aktivita_gen = "aktivita_gen", aktivita_gen_txt = "aktivita_gen_txt", aktivita_load = "aktivita_load", aktivita_load_txt = "aktivita_load_txt", aktivita_clean = "aktivita_clean", aktivita_clean_txt = "aktivita_clean_txt", poznamka = "poznamka",}
	const enum GMpdTransferTypesDtoFragments { typ_pren = "*", typ_pren_txt = "*", povol = "*", povol_txt = "*", styl = "*", aktivita_gen = "*", aktivita_gen_txt = "*", aktivita_load = "*", aktivita_load_txt = "*", aktivita_clean = "*", aktivita_clean_txt = "*", poznamka = "*",}
	const enum GMpdTransferTypesDtoTypes { typ_pren = "string", typ_pren_txt = "string", povol = "string", povol_txt = "string", styl = "string", aktivita_gen = "number", aktivita_gen_txt = "string", aktivita_load = "number", aktivita_load_txt = "string", aktivita_clean = "number", aktivita_clean_txt = "string", poznamka = "string",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Dto\Gordic.Mpd.Interface.GMpdUnrealizedTransfersDto.d.ts 

declare namespace Gordic.Mpd.Interface {
    /**položka seznamu nerealizovaných přenosů*/
    interface GMpdUnrealizedTransfersDto {
        /**licence odesílatele*/
        lic?: string|null;
        /**popis licence odesílatele*/
        lic_txt?: string|null;
        /**typ přenosu*/
        typ_pren?: string|null;
        /**popis typu přenosu*/
        typ_pren_txt?: string|null;
        /**datum zpracování*/
        dat_zpr?: JsonDate|null;
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\FilterDto\Gordic.Mpd.Interface.GMpdFileListFilterDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**filtr pro omezení výběru seznamu souborů*/
	interface GMpdFileListFilterDto {
		/**cílová licence*/
		lic_adr?: GBaseFilter<string>|null;
		/**zdrojová licence*/
		lic?: GBaseFilter<string>|null;
		/**typ přenosu*/
		typ_pren?: GBaseFilter<string>|null;
	}
	const enum GMpdFileListFilterDtoNames { lic_adr = "lic_adr", lic = "lic", typ_pren = "typ_pren",}
	const enum GMpdFileListFilterDtoFragments { lic_adr = "*", lic = "*", typ_pren = "*",}
	const enum GMpdFileListFilterDtoTypes { lic_adr = "GBaseFilter<string>", lic = "GBaseFilter<string>", typ_pren = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\FilterDto\Gordic.Mpd.Interface.GMpdFilesFilterDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**filtr pro omezení výběru seznamu datových dávek*/
	interface GMpdFilesFilterDto {
		/**pořadí dávky*/
		por_zpr?: GBaseFilter<number>|null;
		/**cílová licence*/
		lic_adr?: GBaseFilter<string>|null;
		/**zdrojová licence*/
		lic?: GBaseFilter<string>|null;
		/**typ přenosu*/
		typ_pren?: GBaseFilter<string>|null;
		/**datum vytvoření*/
		dat_vytv?: GBaseFilter<JsonDate>|null;
		/**datum zpracování*/
		dat_zpr?: GBaseFilter<JsonDate>|null;
		/**kód zpracování*/
		kod_zpr?: GBaseFilter<string>|null;
		/**maximální počet záznamů*/
		max_count?: GBaseFilter<number>|null;
	}
	const enum GMpdFilesFilterDtoNames { por_zpr = "por_zpr", lic_adr = "lic_adr", lic = "lic", typ_pren = "typ_pren", dat_vytv = "dat_vytv", dat_zpr = "dat_zpr", kod_zpr = "kod_zpr", max_count = "max_count",}
	const enum GMpdFilesFilterDtoFragments { por_zpr = "*", lic_adr = "*", lic = "*", typ_pren = "*", dat_vytv = "*", dat_zpr = "*", kod_zpr = "*", max_count = "*",}
	const enum GMpdFilesFilterDtoTypes { por_zpr = "GBaseFilter<number>", lic_adr = "GBaseFilter<string>", lic = "GBaseFilter<string>", typ_pren = "GBaseFilter<string>", dat_vytv = "GBaseFilter<JsonDate>", dat_zpr = "GBaseFilter<JsonDate>", kod_zpr = "GBaseFilter<string>", max_count = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\FilterDto\Gordic.Mpd.Interface.GMpdTransferDirectionsFilterDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**filtr pro omezení výběru směrů přenosů*/
	interface GMpdTransferDirectionsFilterDto {
		/**typ přenosu*/
		typ_pren?: GBaseFilter<string>|null;
		/**cílová licence*/
		lic_adr?: GBaseFilter<string>|null;
	}
	const enum GMpdTransferDirectionsFilterDtoNames { typ_pren = "typ_pren", lic_adr = "lic_adr",}
	const enum GMpdTransferDirectionsFilterDtoFragments { typ_pren = "*", lic_adr = "*",}
	const enum GMpdTransferDirectionsFilterDtoTypes { typ_pren = "GBaseFilter<string>", lic_adr = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\FilterDto\Gordic.Mpd.Interface.GMpdTransferTypesFilterDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**filtr pro omezení výběru typů přenosů*/
	interface GMpdTransferTypesFilterDto {
		/**typ přenosu*/
		typ_pren?: GBaseFilter<string>|null;
	}
	const enum GMpdTransferTypesFilterDtoNames { typ_pren = "typ_pren",}
	const enum GMpdTransferTypesFilterDtoFragments { typ_pren = "*",}
	const enum GMpdTransferTypesFilterDtoTypes { typ_pren = "GBaseFilter<string>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\FilterDto\Gordic.Mpd.Interface.GMpdUnrealizedTransfersFilterDto.d.ts 

declare namespace Gordic.Mpd.Interface {
	/**filtr pro omezení výběru nerealizovaných přenosů*/
	interface GMpdUnrealizedTransfersFilterDto {
		/**cílová licence*/
		lic_adr?: GBaseFilter<string>|null;
		/**zdrojová licence*/
		lic?: GBaseFilter<string>|null;
		/**typ přenosu*/
		typ_pren?: GBaseFilter<string>|null;
		/**počet dnů bez aktivity*/
		inactive_days?: GBaseFilter<number>|null;
	}
	const enum GMpdUnrealizedTransfersFilterDtoNames { lic_adr = "lic_adr", lic = "lic", typ_pren = "typ_pren", inactive_days = "inactive_days",}
	const enum GMpdUnrealizedTransfersFilterDtoFragments { lic_adr = "*", lic = "*", typ_pren = "*", inactive_days = "*",}
	const enum GMpdUnrealizedTransfersFilterDtoTypes { lic_adr = "GBaseFilter<string>", lic = "GBaseFilter<string>", typ_pren = "GBaseFilter<string>", inactive_days = "GBaseFilter<number>",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGArchivedFiles.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro dávky v archivu
	* @domain Mpd
	*/
	interface ArchivovanaDavka {
		/**získání seznamu dávek v archivu*/
		list(rq?:Gordic.Mpd.Interface.GMpdFileListFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdFileListDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ArchivovanaDavka: ServiceBase & Catalog.ArchivovanaDavka;
	}
	const ArchivovanaDavka: Client["ArchivovanaDavka"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGExportedFiles.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro exportované dávky
	* @domain Mpd
	*/
	interface ExportovanaDavka {
		/**získání seznamu exportovaných dávek*/
		list(rq?:Gordic.Mpd.Interface.GMpdFilesFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdFilesDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ExportovanaDavka: ServiceBase & Catalog.ExportovanaDavka;
	}
	const ExportovanaDavka: Client["ExportovanaDavka"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGFilesToImport.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro dávky k načtení
	* @domain Mpd
	*/
	interface DavkaKNacteni {
		/**získání seznamu dávek k načtení*/
		list(rq?:Gordic.Mpd.Interface.GMpdFileListFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdFileListDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkaKNacteni: ServiceBase & Catalog.DavkaKNacteni;
	}
	const DavkaKNacteni: Client["DavkaKNacteni"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGFilesToSend.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro dávky k přenosu
	* @domain Mpd
	*/
	interface DavkaKPrenosu {
		/**získání seznamu dávek k přenosu*/
		list(rq?:Gordic.Mpd.Interface.GMpdFileListFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdFileListDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkaKPrenosu: ServiceBase & Catalog.DavkaKPrenosu;
	}
	const DavkaKPrenosu: Client["DavkaKPrenosu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGImportedFiles.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro importované dávky
	* @domain Mpd
	*/
	interface ImportovanaDavka {
		/**získání seznamu importovaných dávek*/
		list(rq?:Gordic.Mpd.Interface.GMpdFilesFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdFilesDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ImportovanaDavka: ServiceBase & Catalog.ImportovanaDavka;
	}
	const ImportovanaDavka: Client["ImportovanaDavka"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGLastProcessedFiles.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro naposledy zpracovávané dávky
	* @domain Mpd
	*/
	interface NaposledyZpracovavanaDavka {
		/**získání seznamu naposledy zpracovávaných dávek*/
		list(rq?:Gordic.Mpd.Interface.GMpdFilesFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdFilesDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NaposledyZpracovavanaDavka: ServiceBase & Catalog.NaposledyZpracovavanaDavka;
	}
	const NaposledyZpracovavanaDavka: Client["NaposledyZpracovavanaDavka"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGTransferDirections.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro směry přenosu
	* @domain Mpd
	*/
	interface SmerPrenosu {
		/**získání seznamu směrů přenosů*/
		list(rq?:Gordic.Mpd.Interface.GMpdTransferDirectionsFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdTransferDirectionsDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		SmerPrenosu: ServiceBase & Catalog.SmerPrenosu;
	}
	const SmerPrenosu: Client["SmerPrenosu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGTransferTypes.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro typy přenosu
	* @domain Mpd
	*/
	interface TypPrenosu {
		/**získání seznamu typů přenosů*/
		list(rq?:Gordic.Mpd.Interface.GMpdTransferTypesFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdTransferTypesDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		TypPrenosu: ServiceBase & Catalog.TypPrenosu;
	}
	const TypPrenosu: Client["TypPrenosu"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Mpd.Interface\Isl\Gordic.Mpd.Interface.IGUnrealizedTransfers.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**rozhraní aplikační služby pro nerealizované přenosy
	* @domain Mpd
	*/
	interface NerealizovanyPrenos {
		/**získání seznamu nerealizovaných přenosů*/
		list(rq?:Gordic.Mpd.Interface.GMpdUnrealizedTransfersFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Mpd.Interface.GMpdUnrealizedTransfersDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		NerealizovanyPrenos: ServiceBase & Catalog.NerealizovanyPrenos;
	}
	const NerealizovanyPrenos: Client["NerealizovanyPrenos"];
}

//#endregion

