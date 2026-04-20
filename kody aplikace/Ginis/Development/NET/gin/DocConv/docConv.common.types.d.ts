/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       docConv.common.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.DocConv.Common\Gordic.DocConv.Common.csproj
*    created     2026-02-16 14:33:45
*    files       Common\GThreadSafeEnumerator.d.ts
*                Common\GThreadSafeList.d.ts
*                Configs\GCommandParametersUnloaded.d.ts
*                Configs\GConfigXmlClassBaseUnloaded.d.ts
*                Configs\GRelatedFile.d.ts
*                File\GCachedFile.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.DocConv.Common\Common\GThreadSafeEnumerator.d.ts 

declare namespace Gordic.DocConv.Common {
	/**Thread-safe enumerator*/
	interface GThreadSafeEnumerator<T> {
		/**Gets the current element in the collection*/
		readonly Current?: T|null;
	}
	const enum GThreadSafeEnumeratorNames { Current = "Current",}
	const enum GThreadSafeEnumeratorFragments { Current = "*",}
	const enum GThreadSafeEnumeratorTypes { Current = "T",}
	const enum GThreadSafeEnumeratorTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.DocConv.Common\Common\GThreadSafeList.d.ts 

declare namespace Gordic.DocConv.Common {
	/**Thread-safe list*/
	interface GThreadSafeList<T> {
		/**Count*/
		readonly Count?: number|null;
		/**Is read only*/
		readonly IsReadOnly?: boolean|null;
	}
	const enum GThreadSafeListNames { Count = "Count", IsReadOnly = "IsReadOnly",}
	const enum GThreadSafeListFragments { Count = "*", IsReadOnly = "*",}
	const enum GThreadSafeListTypes { Count = "number", IsReadOnly = "boolean",}
	const enum GThreadSafeListTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.DocConv.Common\Configs\GCommandParametersUnloaded.d.ts 

declare namespace Gordic.DocConv.Common {
	/**Trida pro predavani parametru*/
	interface GCommandParameters extends Gordic.DocConv.Common.GConfigXmlClassBase {
		/**Zda požadavek bude probíhat přes WS GINIS (stažení souboru atd.)*/
		readonly ThroughGinis?: boolean | null;
		/**Authentication token. May be required for some type of requests (Sign,...)*/
		Prm_Token?: string | null;
		/**předpis - udává, jaká operace se má se souborem provést*/
		Prm_Template?: number | null;
		/**unikatni ID konvertovaneho dokumentu*/
		Prm_FileID?: string | null;
		/**pripona zdrojoveho dokumentu*/
		Prm_SourceFileExtension?: string | null;
		/**pripona ciloveho dokumentu*/
		Prm_DestFileExtension?: string | null;
		/**zdrojovy serverovy dokument*/
		Prm_OriginalFilename?: string | null;
		/**zdrojovy serverovy dokument*/
		Prm_SourceServerFile?: string | null;
		/**cilovy serverovy dokument*/
		Prm_DestServerFile?: string | null;
		/**cilovy serverovy dokument*/
		Prm_DestDataLength?: number | null;
		/**true = je validni*/
		Prm_IsValid?: boolean | null;
		/**Vložit přílohy do zkonvertovaného souboru*/
		Prm_InsertAttachments?: boolean | null;
		/**Konvertovat přílohy vkládané do zkonvertovaného souboru*/
		Prm_ConvertAttachments?: boolean | null;
		/**Certificate verification result*/
		Prm_CertificateVerificationResult?: string | null;
		/**Sign create configuration (and result)*/
		Prm_SignCreateConfig?: string | null;
        /**All signatures verification result
        *     Structure of serialized class
        */
		Prm_SignaturesVerificationResult?: string | null;
		/**File format identification result*/
		Prm_FileFormatIdentifyResult?: string | null;
		/**LTV signature completition result*/
		Prm_LtvCompletitionResult?: string | null;
		/**zda validovat výstupní soubor na normu PDF/A*/
		Prm_Validate?: boolean | null;
		/**Verify signatures after LTV completition*/
		Prm_VerifyAfterCompletition?: boolean | null;
		/**zda provést OCR*/
		Prm_DoOcr?: boolean | null;
		/**true = zkonvertovano bez chyb*/
		Prm_OperationSuccess?: boolean | null;
		/**vysledek konverze - chyba*/
		Prm_Resulttext?: string | null;
		/**url pro notifikaci*/
		Prm_NotificationURL?: string | null;
		/**sada pouzitych konverznich nastroju (textove)*/
		Prm_PluginsString?: string | null;
		/**čas ke kterému ověřit*/
		Prm_VerifyToTime?: JsonDate | null;
		/**zda je povoleno OCSP*/
		Prm_VerifyToSigningTimeEnabled?: boolean | null;
		/**zda je povoleno OCSP*/
		Prm_OcspEnabled?: boolean | null;
		/**zda je povoleno použití aktuálně platného CRL*/
		Prm_UseCurrentCrl?: boolean | null;
		/**Vynucení důvěryhodného ověření (I.CA QVerify apod.)*/
		Prm_DemandTrustedVerification?: boolean | null;
		/**CRL ke kterému ověřit v Base64*/
		Prm_CrlForVerifBase64?: string | null;
		/**sada pouzitych konverzních nastroju*/
		Prm_Plugins?: number[] | null;
		/**sada pouzitych validačních nastroju (textove)*/
		Prm_ValPluginsString?: string | null;
		/**sada pouzitych validačních nastroju*/
		Prm_ValPlugins?: number[] | null;
		/**pole textových výsledků validace - seřazeno podle pluginů (C_PLUGINS)*/
		Prm_ResultsTexts?: string[] | null;
		/**Datum a cas konverze*/
		Prm_OperationEndTime?: JsonDate | null;
		/**Datum a cas začátku zpracování(operace)*/
		Prm_OperationStartTime?: JsonDate | null;
		/**vstupni pronom ID*/
		Prm_InputPUID?: string | null;
		/**vystupni pronom ID*/
		Prm_OutputPUID?: string | null;
		/**timeout pro samotnou operaci (validace, konverze, overeni) - měl by to být TIMEOUT webové služby mínus čas, po který už soubor ležel na serveru*/
		Prm_OperationTimeout?: number | null;
		/**timeout zadaný volajícím klientem v sekundách.*/
		Prm_Timeout?: number | null;
		/**název žadatele (účet, funkce...)*/
		Prm_ApplicantName?: string | null;
		/**název volající aplikace*/
		Prm_ApplicationName?: string | null;
		/**Applicant machine name*/
		Prm_ApplicantMachineName?: string | null;
		/**Config version*/
		Prm_ConfigVersion?: number | null;
		/**Force Dyna convertible*/
		Prm_ForceDynaConvertible?: boolean | null;
		/**LTV - complete only last signature*/
		Prm_LtvCompleteOnlyLast?: boolean | null;
		/**Transport WS version*/
		Prm_WsVersion?: number | null;
		/**Related files (external signature etc.)*/
		Prm_RelatedFiles?: Gordic.DocConv.Common.GCommandParameters.RelatedFilesDefinition | null;
		/**ixp dokumentu*/
		Prm_IXP?: string | null;
		/**ixb*/
		Prm_IXB?: string | null;
		/**ixsulo*/
		Prm_IXS_ULO?: string | null;
		/**ixs_fun*/
		Prm_IXS_FUN?: string | null;
		/**ixs_zmp*/
		Prm_IXS_ZMP?: string | null;
		/**typ elp*/
		Prm_DMSSAVETYPE?: number | null;
		/**URL webové služby pro napojení na GINIS*/
		Prm_GinisWsUrl?: string | null;
		/**Login webové služby pro napojení na GINIS*/
		Prm_GinisWsLogin?: string | null;
		/**Identifikátor exteního systému pro volání WS pro napojení na GINIS*/
		Prm_GinisWsExtId?: string | null;
		/**Heslo webové služby pro napojení na GINIS*/
		Prm_GinisWsPassword?: string | null;
		/**Heslo webové služby pro napojení na GINIS*/
		Prm_DksVersion?: string | null;
		/**Email the request was sent from*/
		Prm_EmailFrom?: string | null;
	}
	const enum GCommandParametersNames { ThroughGinis = "ThroughGinis", Prm_Token = "Prm_Token", Prm_Template = "Prm_Template", Prm_FileID = "Prm_FileID", Prm_SourceFileExtension = "Prm_SourceFileExtension", Prm_DestFileExtension = "Prm_DestFileExtension", Prm_OriginalFilename = "Prm_OriginalFilename", Prm_SourceServerFile = "Prm_SourceServerFile", Prm_DestServerFile = "Prm_DestServerFile", Prm_DestDataLength = "Prm_DestDataLength", Prm_IsValid = "Prm_IsValid", Prm_InsertAttachments = "Prm_InsertAttachments", Prm_ConvertAttachments = "Prm_ConvertAttachments", Prm_CertificateVerificationResult = "Prm_CertificateVerificationResult", Prm_SignCreateConfig = "Prm_SignCreateConfig", Prm_SignaturesVerificationResult = "Prm_SignaturesVerificationResult", Prm_FileFormatIdentifyResult = "Prm_FileFormatIdentifyResult", Prm_LtvCompletitionResult = "Prm_LtvCompletitionResult", Prm_Validate = "Prm_Validate", Prm_VerifyAfterCompletition = "Prm_VerifyAfterCompletition", Prm_DoOcr = "Prm_DoOcr", Prm_OperationSuccess = "Prm_OperationSuccess", Prm_Resulttext = "Prm_Resulttext", Prm_NotificationURL = "Prm_NotificationURL", Prm_PluginsString = "Prm_PluginsString", Prm_VerifyToTime = "Prm_VerifyToTime", Prm_VerifyToSigningTimeEnabled = "Prm_VerifyToSigningTimeEnabled", Prm_OcspEnabled = "Prm_OcspEnabled", Prm_UseCurrentCrl = "Prm_UseCurrentCrl", Prm_DemandTrustedVerification = "Prm_DemandTrustedVerification", Prm_CrlForVerifBase64 = "Prm_CrlForVerifBase64", Prm_Plugins = "Prm_Plugins", Prm_ValPluginsString = "Prm_ValPluginsString", Prm_ValPlugins = "Prm_ValPlugins", Prm_ResultsTexts = "Prm_ResultsTexts", Prm_OperationEndTime = "Prm_OperationEndTime", Prm_OperationStartTime = "Prm_OperationStartTime", Prm_InputPUID = "Prm_InputPUID", Prm_OutputPUID = "Prm_OutputPUID", Prm_OperationTimeout = "Prm_OperationTimeout", Prm_Timeout = "Prm_Timeout", Prm_ApplicantName = "Prm_ApplicantName", Prm_ApplicationName = "Prm_ApplicationName", Prm_ApplicantMachineName = "Prm_ApplicantMachineName", Prm_ConfigVersion = "Prm_ConfigVersion", Prm_ForceDynaConvertible = "Prm_ForceDynaConvertible", Prm_LtvCompleteOnlyLast = "Prm_LtvCompleteOnlyLast", Prm_WsVersion = "Prm_WsVersion", Prm_RelatedFiles = "Prm_RelatedFiles", Prm_IXP = "Prm_IXP", Prm_IXB = "Prm_IXB", Prm_IXS_ULO = "Prm_IXS_ULO", Prm_IXS_FUN = "Prm_IXS_FUN", Prm_IXS_ZMP = "Prm_IXS_ZMP", Prm_DMSSAVETYPE = "Prm_DMSSAVETYPE", Prm_GinisWsUrl = "Prm_GinisWsUrl", Prm_GinisWsLogin = "Prm_GinisWsLogin", Prm_GinisWsExtId = "Prm_GinisWsExtId", Prm_GinisWsPassword = "Prm_GinisWsPassword", Prm_DksVersion = "Prm_DksVersion", Prm_EmailFrom = "Prm_EmailFrom", DateFormat = "DateFormat", DateFormatWithMs = "DateFormatWithMs", DateFormatExt = "DateFormatExt", Assigned = "Assigned", XmlDoc = "XmlDoc"}
	const enum GCommandParametersFragments { ThroughGinis = "*", Prm_Token = "*", Prm_Template = "*", Prm_FileID = "*", Prm_SourceFileExtension = "*", Prm_DestFileExtension = "*", Prm_OriginalFilename = "*", Prm_SourceServerFile = "*", Prm_DestServerFile = "*", Prm_DestDataLength = "*", Prm_IsValid = "*", Prm_InsertAttachments = "*", Prm_ConvertAttachments = "*", Prm_CertificateVerificationResult = "*", Prm_SignCreateConfig = "*", Prm_SignaturesVerificationResult = "*", Prm_FileFormatIdentifyResult = "*", Prm_LtvCompletitionResult = "*", Prm_Validate = "*", Prm_VerifyAfterCompletition = "*", Prm_DoOcr = "*", Prm_OperationSuccess = "*", Prm_Resulttext = "*", Prm_NotificationURL = "*", Prm_PluginsString = "*", Prm_VerifyToTime = "*", Prm_VerifyToSigningTimeEnabled = "*", Prm_OcspEnabled = "*", Prm_UseCurrentCrl = "*", Prm_DemandTrustedVerification = "*", Prm_CrlForVerifBase64 = "*", Prm_Plugins = "*", Prm_ValPluginsString = "*", Prm_ValPlugins = "*", Prm_ResultsTexts = "*", Prm_OperationEndTime = "*", Prm_OperationStartTime = "*", Prm_InputPUID = "*", Prm_OutputPUID = "*", Prm_OperationTimeout = "*", Prm_Timeout = "*", Prm_ApplicantName = "*", Prm_ApplicationName = "*", Prm_ApplicantMachineName = "*", Prm_ConfigVersion = "*", Prm_ForceDynaConvertible = "*", Prm_LtvCompleteOnlyLast = "*", Prm_WsVersion = "*", Prm_RelatedFiles = "*", Prm_IXP = "*", Prm_IXB = "*", Prm_IXS_ULO = "*", Prm_IXS_FUN = "*", Prm_IXS_ZMP = "*", Prm_DMSSAVETYPE = "*", Prm_GinisWsUrl = "*", Prm_GinisWsLogin = "*", Prm_GinisWsExtId = "*", Prm_GinisWsPassword = "*", Prm_DksVersion = "*", Prm_EmailFrom = "*", DateFormat = "*", DateFormatWithMs = "*", DateFormatExt = "*", Assigned = "*", XmlDoc = "*"}
	const enum GCommandParametersTypes { ThroughGinis = "boolean", Prm_Token = "string", Prm_Template = "Gordic.DocConv.Common.GCommandParameters.TemplateType", Prm_FileID = "string", Prm_SourceFileExtension = "string", Prm_DestFileExtension = "string", Prm_OriginalFilename = "string", Prm_SourceServerFile = "string", Prm_DestServerFile = "string", Prm_DestDataLength = "number", Prm_IsValid = "boolean", Prm_InsertAttachments = "boolean", Prm_ConvertAttachments = "boolean", Prm_CertificateVerificationResult = "string", Prm_SignCreateConfig = "string", Prm_SignaturesVerificationResult = "string", Prm_FileFormatIdentifyResult = "string", Prm_LtvCompletitionResult = "string", Prm_Validate = "boolean", Prm_VerifyAfterCompletition = "boolean", Prm_DoOcr = "boolean", Prm_OperationSuccess = "boolean", Prm_Resulttext = "string", Prm_NotificationURL = "string", Prm_PluginsString = "string", Prm_VerifyToTime = "JsonDate", Prm_VerifyToSigningTimeEnabled = "boolean", Prm_OcspEnabled = "boolean", Prm_UseCurrentCrl = "boolean", Prm_DemandTrustedVerification = "boolean", Prm_CrlForVerifBase64 = "string", Prm_Plugins = "number[]", Prm_ValPluginsString = "string", Prm_ValPlugins = "number[]", Prm_ResultsTexts = "string[]", Prm_OperationEndTime = "JsonDate", Prm_OperationStartTime = "JsonDate", Prm_InputPUID = "string", Prm_OutputPUID = "string", Prm_OperationTimeout = "number", Prm_Timeout = "number", Prm_ApplicantName = "string", Prm_ApplicationName = "string", Prm_ApplicantMachineName = "string", Prm_ConfigVersion = "number", Prm_ForceDynaConvertible = "boolean", Prm_LtvCompleteOnlyLast = "boolean", Prm_WsVersion = "number", Prm_RelatedFiles = "Gordic.DocConv.Common.GCommandParameters.RelatedFilesDefinition", Prm_IXP = "string", Prm_IXB = "string", Prm_IXS_ULO = "string", Prm_IXS_FUN = "string", Prm_IXS_ZMP = "string", Prm_DMSSAVETYPE = "number", Prm_GinisWsUrl = "string", Prm_GinisWsLogin = "string", Prm_GinisWsExtId = "string", Prm_GinisWsPassword = "string", Prm_DksVersion = "string", Prm_EmailFrom = "string", DateFormat = "string", DateFormatWithMs = "string", DateFormatExt = "string", Assigned = "boolean", XmlDoc = "any" }
}
declare namespace Gordic.DocConv.Common.GCommandParameters {
	/**Related files definition*/
	interface RelatedFilesDefinition {
		/**Files*/
		Files?: Gordic.DocConv.Common.GCommandParameters.GDbRelatedFile[] | null;
	}
	const enum RelatedFilesDefinitionNames { Files = "Files", }
	const enum RelatedFilesDefinitionFragments { Files = "*", }
	const enum RelatedFilesDefinitionTypes { Files = "Gordic.DocConv.Common.GCommandParameters.GDbRelatedFile[]", }
	/**Related file*/
	interface RelatedFile extends Gordic.DocConv.Common.GRelatedFile {
	}
	const enum RelatedFileNames { FileName = "FileName", Data = "Data", }
	const enum RelatedFileFragments { FileName = "*", Data = "*", }
	const enum RelatedFileTypes { FileName = "string", Data = "byte[]", }
	/**Related file*/
	interface GDbRelatedFile extends Gordic.DocConv.Common.GRelatedFile {
		/**IXS ULO*/
		IxsUlo?: string | null;
	}
	const enum GDbRelatedFileNames { IxsUlo = "IxsUlo", FileName = "FileName", Data = "Data", }
	const enum GDbRelatedFileFragments { IxsUlo = "*", FileName = "*", Data = "*", }
	const enum GDbRelatedFileTypes { IxsUlo = "string", FileName = "string", Data = "byte[]", }
	/**Výčet názvů parametrů, tak jak jsou uvedeny v XML*/
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.DocConv.Common\Configs\GConfigXmlClassBaseUnloaded.d.ts 

declare namespace Gordic.DocConv.Common {
	/**Předek pro všechna konfigurační XML*/
	interface GConfigXmlClassBase {
		/**format data a casu pro ukladani*/
		DateFormat?: string | null;
		/**format data a casu pro ukladani*/
		DateFormatWithMs?: string | null;
		/**Date format extended for offset*/
		DateFormatExt?: string | null;
		/**priznak jestli byl tento obekt nastaven*/
		readonly Assigned?: boolean | null;
		/**XML document*/
		readonly XmlDoc?: any | null;
	}
	
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.DocConv.Common\Configs\GRelatedFile.d.ts 

declare namespace Gordic.DocConv.Common {
	/**Related file*/
	interface GRelatedFile {
		/**Filename*/
		FileName?: string | null;
		/**Data*/
		Data?: string | null;
	}
	const enum GRelatedFileNames { FileName = "FileName", Data = "Data", }
	const enum GRelatedFileFragments { FileName = "*", Data = "*", }
	const enum GRelatedFileTypes { FileName = "string", Data = "string", }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.DocConv.Common\File\GCachedFile.d.ts 

declare namespace Gordic.DocConv.Common {
	/**File with ability to be cached automatically*/
	interface GCachedFile {
		/**ID of file
		*     File is kept on the server side and this ID is used to find it.
		*/
		FileId?: string|null;
		/**File size from which to automatically cache file on disk*/
		FileSizeToCache?: number|null;
		/**File name*/
		FileName?: string|null;
		/**File name*/
		Extension?: string|null;
		/**Data of file to be signed. If calling on the same layer (eg. Server), rather use FilePath
		*     Be aware that this property is lazy loading the file to memory if not already set
		*/
		FileData?: string|null;
	}
	const enum GCachedFileNames { FileId = "FileId", FileSizeToCache = "FileSizeToCache", FileName = "FileName", Extension = "Extension", FileData = "FileData",}
	const enum GCachedFileFragments { FileId = "*", FileSizeToCache = "*", FileName = "*", Extension = "*", FileData = "*",}
	const enum GCachedFileTypes { FileId = "string", FileSizeToCache = "number", FileName = "string", Extension = "string", FileData = "string",}
	const enum GCachedFileTypeLengths {}
}

//#endregion

