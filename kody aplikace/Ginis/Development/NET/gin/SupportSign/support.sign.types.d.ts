/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       support.sign.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Support.Sign\Gordic.Support.Sign.csproj
*    created     2026-02-16 14:33:46
*    files       FileSigner\GFileToSign.d.ts
*                FileSigner\GSignCreateConfig.d.ts
*                FileSigner\GSignedFile.d.ts
*                FileSigner\GXmlSignProperties.d.ts
*                LTV\GLtvAdditionType.d.ts
*                LTV\GLtvCompletitionResult.d.ts
*                LTV\GLtvSignatureInfo.d.ts
*                RemoteSign\GSgnWebserviceType.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Support.Sign\FileSigner\GFileToSign.d.ts 

declare namespace Gordic.Support.Sign {
	/**File to sign*/
	interface GFileToSign extends Gordic.DocConv.Common.GCachedFile {
		/**Description. Used e.g. for DataObjectFormat in XAdES or ASiC (DataObjectFormat element)*/
		Description?: string|null;
		/**Object identifier. Used e.g. for DataObjectFormat in XAdES or ASiC (DataObjectFormat element)*/
		ObjectIdentifier?: string|null;
		/**Mimetype. If not filled the mimetype will be added automatically from Windows registry*/
		Mimetype?: string|null;
	}
	const enum GFileToSignNames { Description = "Description", ObjectIdentifier = "ObjectIdentifier", Mimetype = "Mimetype", FileId = "FileId", FileSizeToCache = "FileSizeToCache", FileName = "FileName", Extension = "Extension", FilePath = "FilePath", FileData = "FileData",}
	const enum GFileToSignFragments { Description = "*", ObjectIdentifier = "*", Mimetype = "*", FileId = "*", FileSizeToCache = "*", FileName = "*", Extension = "*", FilePath = "*", FileData = "*",}
	const enum GFileToSignTypes { Description = "string", ObjectIdentifier = "string", Mimetype = "string", FileId = "string", FileSizeToCache = "number", FileName = "string", Extension = "string", FilePath = "string", FileData = "string",}
	const enum GFileToSignTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Support.Sign\FileSigner\GSignCreateConfig.d.ts 

declare namespace Gordic.Support.Sign {
	/**
	*     Sign creation config
	*     
	*/
	interface GSignCreateConfig {
		/**
		*     Signature properties namespaces to be added to Signature/Object/Signatures element to XAdES.
		*     [prefix - namespace] 
		*     
		*/
		SignaturePropertiesNamespaces?: Gordic.Security.Service.SignaturePropertyNamespace[]|null;
		/**
		*     Xml signature properties
		*     
		*/
		XmlSignProperties?: Gordic.Security.Service.GXmlSignProperties|null;
		/**
		*     Log file path
		*     
		*/
		LogFilePath?: string|null;
		/**
		*     Signature policy definition
		*     
		*/
		SignaturePolicy?: Gordic.Security.Service.GSignaturePolicy|null;
		/**
		*     File to sign
		*     
		*/
		FileToSign?: Gordic.Support.Sign.GFileToSign|null;
		/**
		*     File to sign
		*     
		*/
		UnchangedOriginalFile?: Gordic.Support.Sign.GFileToSign|null;
		/**
		*     Create signature distributed - whole file is not sent to client application, client just signs some prepared data and sends it to server for completition
		*     
		*/
		DistributedSignature?: boolean|null;
		/**
		*     Signing certificate info.
		*     Necessary for SecuSign
		*     
		*/
		SigningCertificateInfo?: Gordic.Security.Service.GCertificateInfoDTO|null;
		/**
		*     Signing certificate thumbprint
		*     If distributed signature is demanded this thumbprint is not used at server side
		*     
		*/
		CertificateThumbprint?: string|null;
		/**
		*     Key exchange material
		*     Value is returned in encrypted format (GinisCoverString)
		*     
		*/
		KeyExchange?: string|null;
		/**
		*     Data of file to be signed. If calling on the same layer (eg. Server), rather use FilePath
		*     
		*/
		FileData?: string|null;
		/**
		*     Other files to be signed. Only for case of ASiC - all files will be added to the same container
		*     
		*/
		OtherFilesToSign?: Gordic.Support.Sign.GFileToSign[]|null;
		/**
		*     File name of file to sign
		*     
		*/
		FileName?: string|null;
		/**
		*     ID of file which is signed remotely. 
		*     File is kept on the server side and this ID helps to find it when signed prepared data arrives from client
		*     
		*/
		FileId?: string|null;
		/**
		*     Data of file to be signed
		*     
		*/
		DataPreparedForDistributedSignature?: string|null;
		/**
		*     Data of file to be signed
		*     
		*/
		DistributivelySignedPreparedData?: string|null;
		/**
		*     Signed hash
		*     
		*/
		DistributivelySignedHash?: string|null;
		/**
		*     Signed file
		*     
		*/
		SignedFile?: Gordic.Support.Sign.GSignedFile|null;
		/**
		*     Data of file to be signed
		*     
		*/
		SignedFileData?: string|null;
		/**
		*     Data of file to be signed
		*     
		*/
		ExternalSignatureData?: string|null;
		/**
		*     Data of file to be signed
		*     
		*/
		ExternalTimestampData?: string|null;
		/**
		*     Signed file extension
		*     
		*/
		SignedFileExtension?: string|null;
		/**
		*     Add timestamp
		*     
		*/
		AddTimestamp?: boolean|null;
		/**
		*     DNS handling via SBB enabled
		*     
		*/
		SbbDnsEnabled?: boolean|null;
		/**
		*     Certificate chain for signing. Should include signing, root and all middle certificates (publishers)
		*     
		*/
		SigningCertChain?: Gordic.Security.Service.GCertificateChain|null;
		/**
		*     Long-term validation signature data addition 
		*     
		*/
		LtvAdditionType?: Gordic.Support.Sign.GLtvAdditionType|null;
		/**
		*     URL of server for completing LTV signatures
		*     
		*/
		LtvServerUrl?: string|null;
		/**
		*     User for authentication to server for completing LTV signatures
		*     
		*/
		LtvServerUser?: string|null;
		/**
		*     Use NTLM for authentication to server for completing LTV signatures
		*     
		*/
		LtvServerUseNtlm?: boolean|null;
		/**
		*     Use single request processing on server for completing LTV signatures
		*     
		*/
		LtvServerSingleRequest?: boolean|null;
		/**
		*     Timeout for server for completing LTV signatures in seconds
		*     
		*/
		LtvServerTimeout?: number|null;
		/**
		*     Verify signatures after LTV completition
		*     
		*/
		LtvServerVerifyAfterCompletition?: boolean|null;
		/**
		*     Long-term validation - allow adding currently available CRL/OCSP response (must have ThisUpdate lower than SigningCertificate.NotAfter and NextUpdate higher then SigningTime).
		*     Default is TRUE
		*     
		*/
		LtvAllowAddCurrentInfo?: boolean|null;
		/**
		*     Throw exception if LTV additional has not been successful
		*     
		*/
		FailIfLtvAdditionNotSuccessful?: boolean|null;
		/**
		*     Gordic proxy for downloading revocation info
		*     
		*/
		RevocationInfoGordicProxyConfiguration?: Gordic.Security.Service.GAIBConnection|null;
		/**
		*     Gordic proxy for creating signature
		*     
		*/
		SignCreateGordicProxyConfiguration?: Gordic.Security.Service.GAIBConnection|null;
		/**
		*     System proxy for downloading revocation info
		*     
		*/
		RevocationInfoSystemProxyConfiguration?: Gordic.Security.Service.GHTTPProxy|null;
		/**
		*     System proxy for creating remote signature (electronic seal)
		*     
		*/
		SgnWebServiceProxy?: Gordic.Security.Service.GHTTPProxy|null;
		/**
		*     URL of webservice for creating remote signature (electronic seal)
		*     
		*/
		SgnWebServiceUrl?: string|null;
		/**
		*     Backup URL of webservice for creating remote signature (electronic seal)
		*     
		*/
		SgnWebServiceUrl2?: string|null;
		/**
		*     User of webservice for creating remote signature (electronic seal)
		*     
		*/
		SgnWebServiceUser?: string|null;
		/**
		*     Allow streaming of request and response data to a web service
		*     
		*/
		SgnWebServiceAllowStreaming?: boolean|null;
		/**
		*     Use NTLM authentication for webservice for creating remote signature (electronic seal)
		*     
		*/
		SgnWebServiceUseNtlm?: boolean|null;
		/**
		*     Timeout for webservice for creating remote signature (electronic seal) in seconds
		*     
		*/
		SgnWebServiceTimeout?: number|null;
		/**
		*     Check template while signing through signing service. 
		*     When cheking tmplate, thumbprint, signature type, timestamps and so on is compared to all existing templates in signing service. If none matching template found the operation is aborted
		*     
		*/
		SgnWebServiceCheckTemplate?: boolean|null;
		/**
		*     Maximum timestamp attempts
		*     
		*/
		MaxTimestampAttempts?: number|null;
		/**
		*     Delay in miliseconds between timestamp attemtps
		*     
		*/
		TimestampAttemptDelayMs?: number|null;
		/**
		*     IxsLpc for Gordic proxy communication
		*     
		*/
		IxsLpc?: string|null;
		/**
		*     Type of webservice for creating remote signature (electronic seal)
		*     
		*/
		SgnWebServiceType?: Gordic.Security.Service.GSgnWebserviceType|null;
		/**
		*     Url adresa pro vzdálené pečetění MONET+
		*     
		*/
		UrlMonetPlus?: string|null;
		/**
		*     Uživatel pro vzdálené pečetění MONET+
		*     
		*/
		MonetPlusUser?: string|null;
		/**
		*     User which is allowed to use the certificate on the signing web service
		*     
		*/
		SgnWebServiceCertificateUser?: string|null;
		/**
		*     User group which is allowed to use the certificate on the signing web service (database license)
		*     
		*/
		SgnWebServiceCertificateUserGroup?: string|null;
		/**
		*     CESYP configuration
		*     
		*/
		CesypConfig?: Gordic.Security.Service.GCesypConfiguration|null;
		/**
		*     CESYP configuration
		*     
		*/
		RemSigConfig?: Gordic.Security.Service.GRemSigConfiguration|null;
		/**
		*     Cloud Signature Consortium API configuration
		*     
		*/
		CscConfig?: Gordic.Security.Service.GCscApiConfiguration|null;
		/**
		*     Obelisk configuration
		*     
		*/
		ObeliskConfig?: Gordic.Security.Service.GObeliskConfiguration|null;
		/**
		*     S602 SecuSign .NET API configuration
		*     
		*/
		SecuSignNetConfiguration?: Gordic.Security.Service.GSecuSignConfiguration|null;
		/**
		*     Timestamp log items
		*     
		*/
		SgnAttemptLogItems?: Gordic.Security.Service.GSignatureAttemptLogItem[]|null;
		/**
		*     Signature type
		*     
		*/
		SignatureType?: Gordic.Security.Service.SignatureType|null;
		/**
		*     Signature hash algorithm
		*     
		*/
		SgnHash?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**
		*     Visual sign config
		*     
		*/
		VisualSignConfig?: Gordic.Security.Service.GPdfVisualSignConfig|null;
		/**
		*     Visual sign text
		*     
		*/
		VisualSignText?: Gordic.Security.Service.GVisualSgnText|null;
		/**
		*     Timestamp config
		*     
		*/
		TimestampConfig?: Gordic.Security.Service.GTimeStampInfo|null;
		/**
		*     Signing reason
		*     
		*/
		SignReason?: string|null;
		/**
		*     Signing time
		*     
		*/
		SigningTime?: JsonDate|null;
		/**
		*     Secusign url
		*     
		*/
		SecuSignUrl?: string|null;
		/**
		*     Secusign user id
		*     
		*/
		SecuSignUserId?: string|null;
		/**
		*     Signing web service's authentication certificate thumbprint
		*     
		*/
		SgnWebServiceAuthCertThumbprint?: string|null;
		/**
		*     Folder for I.CA Remote Seal (for storing certificates, requests etc.)
		*     
		*/
		IcaRemoteSealFolder?: string|null;
		/**
		*     Path to secret for RemoteSeal
		*     
		*/
		IcaRemoteSealPathToSecret?: string|null;
		/**
		*     LTV completition result
		*     
		*/
		LtvCompletitionResult?: Gordic.Support.Sign.GLtvCompletitionResult|null;
		/**
		*     Signature verification report
		*     
		*/
		SignaturesVerificationReport?: string|null;
		/**
		*     Signature verification configuration for LTV server
		*     
		*/
		LtvServerSignatureVerificationParams?: Gordic.DocConv.Common.GCommandParameters|null;
		/**
		*     DKS params - provides additional info when communicating with DKS
		*     
		*/
		DksParams?: Gordic.DocConv.Common.GCommandParameters|null;
		/**
		*     Signing transaction ID for multiple signing
		*     
		*/
		TransactionId?: string|null;
		/**
		*     Signature name
		*     
		*/
		SignatureName?: string|null;
		/**
		*     Is signature fiction
		*     
		*/
		IsFiction?: boolean|null;
		/**
		*     Signature name
		*     
		*/
		AuthorName?: string|null;
		/**
		*     If signing certificate's PIN can be found in secrets
		*     
		*/
		SigningCertificatePinInSecret?: boolean|null;
	}
	const enum GSignCreateConfigNames { SignaturePropertiesNamespaces = "SignaturePropertiesNamespaces", XmlSignProperties = "XmlSignProperties", LogFilePath = "LogFilePath", SignaturePolicy = "SignaturePolicy", FileToSign = "FileToSign", UnchangedOriginalFile = "UnchangedOriginalFile", DistributedSignature = "DistributedSignature", SigningCertificateInfo = "SigningCertificateInfo", CertificateThumbprint = "CertificateThumbprint", KeyExchange = "KeyExchange", FileData = "FileData", OtherFilesToSign = "OtherFilesToSign", FileName = "FileName", FileId = "FileId", DataPreparedForDistributedSignature = "DataPreparedForDistributedSignature", DistributivelySignedPreparedData = "DistributivelySignedPreparedData", DistributivelySignedHash = "DistributivelySignedHash", SignedFile = "SignedFile", SignedFileData = "SignedFileData", ExternalSignatureData = "ExternalSignatureData", ExternalTimestampData = "ExternalTimestampData", SignedFileExtension = "SignedFileExtension", AddTimestamp = "AddTimestamp", SbbDnsEnabled = "SbbDnsEnabled", SigningCertChain = "SigningCertChain", LtvAdditionType = "LtvAdditionType", LtvServerUrl = "LtvServerUrl", LtvServerUser = "LtvServerUser", LtvServerUseNtlm = "LtvServerUseNtlm", LtvServerSingleRequest = "LtvServerSingleRequest", LtvServerTimeout = "LtvServerTimeout", LtvServerVerifyAfterCompletition = "LtvServerVerifyAfterCompletition", LtvAllowAddCurrentInfo = "LtvAllowAddCurrentInfo", FailIfLtvAdditionNotSuccessful = "FailIfLtvAdditionNotSuccessful", RevocationInfoGordicProxyConfiguration = "RevocationInfoGordicProxyConfiguration", SignCreateGordicProxyConfiguration = "SignCreateGordicProxyConfiguration", RevocationInfoSystemProxyConfiguration = "RevocationInfoSystemProxyConfiguration", SgnWebServiceProxy = "SgnWebServiceProxy", SgnWebServiceUrl = "SgnWebServiceUrl", SgnWebServiceUrl2 = "SgnWebServiceUrl2", SgnWebServiceUser = "SgnWebServiceUser", SgnWebServiceAllowStreaming = "SgnWebServiceAllowStreaming", SgnWebServiceUseNtlm = "SgnWebServiceUseNtlm", SgnWebServiceTimeout = "SgnWebServiceTimeout", SgnWebServiceCheckTemplate = "SgnWebServiceCheckTemplate", MaxTimestampAttempts = "MaxTimestampAttempts", TimestampAttemptDelayMs = "TimestampAttemptDelayMs", IxsLpc = "IxsLpc", SgnWebServiceType = "SgnWebServiceType", UrlMonetPlus = "UrlMonetPlus", MonetPlusUser = "MonetPlusUser", SgnWebServiceCertificateUser = "SgnWebServiceCertificateUser", SgnWebServiceCertificateUserGroup = "SgnWebServiceCertificateUserGroup", CesypConfig = "CesypConfig", RemSigConfig = "RemSigConfig", CscConfig = "CscConfig", ObeliskConfig = "ObeliskConfig", SecuSignNetConfiguration = "SecuSignNetConfiguration", SgnAttemptLogItems = "SgnAttemptLogItems", SignatureType = "SignatureType", SgnHash = "SgnHash", VisualSignConfig = "VisualSignConfig", VisualSignText = "VisualSignText", TimestampConfig = "TimestampConfig", SignReason = "SignReason", SigningTime = "SigningTime", SecuSignUrl = "SecuSignUrl", SecuSignUserId = "SecuSignUserId", SgnWebServiceAuthCertThumbprint = "SgnWebServiceAuthCertThumbprint", IcaRemoteSealFolder = "IcaRemoteSealFolder", IcaRemoteSealPathToSecret = "IcaRemoteSealPathToSecret", LtvCompletitionResult = "LtvCompletitionResult", SignaturesVerificationReport = "SignaturesVerificationReport", LtvServerSignatureVerificationParams = "LtvServerSignatureVerificationParams", DksParams = "DksParams", TransactionId = "TransactionId", SignatureName = "SignatureName", IsFiction = "IsFiction", AuthorName = "AuthorName", SigningCertificatePinInSecret = "SigningCertificatePinInSecret",}
	const enum GSignCreateConfigFragments { SignaturePropertiesNamespaces = "*", XmlSignProperties = "*", LogFilePath = "*", SignaturePolicy = "*", FileToSign = "*", UnchangedOriginalFile = "*", DistributedSignature = "*", SigningCertificateInfo = "*", CertificateThumbprint = "*", KeyExchange = "*", FileData = "*", OtherFilesToSign = "*", FileName = "*", FileId = "*", DataPreparedForDistributedSignature = "*", DistributivelySignedPreparedData = "*", DistributivelySignedHash = "*", SignedFile = "*", SignedFileData = "*", ExternalSignatureData = "*", ExternalTimestampData = "*", SignedFileExtension = "*", AddTimestamp = "*", SbbDnsEnabled = "*", SigningCertChain = "*", LtvAdditionType = "*", LtvServerUrl = "*", LtvServerUser = "*", LtvServerUseNtlm = "*", LtvServerSingleRequest = "*", LtvServerTimeout = "*", LtvServerVerifyAfterCompletition = "*", LtvAllowAddCurrentInfo = "*", FailIfLtvAdditionNotSuccessful = "*", RevocationInfoGordicProxyConfiguration = "*", SignCreateGordicProxyConfiguration = "*", RevocationInfoSystemProxyConfiguration = "*", SgnWebServiceProxy = "*", SgnWebServiceUrl = "*", SgnWebServiceUrl2 = "*", SgnWebServiceUser = "*", SgnWebServiceAllowStreaming = "*", SgnWebServiceUseNtlm = "*", SgnWebServiceTimeout = "*", SgnWebServiceCheckTemplate = "*", MaxTimestampAttempts = "*", TimestampAttemptDelayMs = "*", IxsLpc = "*", SgnWebServiceType = "*", UrlMonetPlus = "*", MonetPlusUser = "*", SgnWebServiceCertificateUser = "*", SgnWebServiceCertificateUserGroup = "*", CesypConfig = "*", RemSigConfig = "*", CscConfig = "*", ObeliskConfig = "*", SecuSignNetConfiguration = "*", SgnAttemptLogItems = "*", SignatureType = "*", SgnHash = "*", VisualSignConfig = "*", VisualSignText = "*", TimestampConfig = "*", SignReason = "*", SigningTime = "*", SecuSignUrl = "*", SecuSignUserId = "*", SgnWebServiceAuthCertThumbprint = "*", IcaRemoteSealFolder = "*", IcaRemoteSealPathToSecret = "*", LtvCompletitionResult = "*", SignaturesVerificationReport = "*", LtvServerSignatureVerificationParams = "*", DksParams = "*", TransactionId = "*", SignatureName = "*", IsFiction = "*", AuthorName = "*", SigningCertificatePinInSecret = "*",}
	const enum GSignCreateConfigTypes { SignaturePropertiesNamespaces = "Gordic.Security.Service.SignaturePropertyNamespace[]", XmlSignProperties = "Gordic.Security.Service.GXmlSignProperties", LogFilePath = "string", SignaturePolicy = "Gordic.Security.Service.GSignaturePolicy", FileToSign = "Gordic.Support.Sign.GFileToSign", UnchangedOriginalFile = "Gordic.Support.Sign.GFileToSign", DistributedSignature = "boolean", SigningCertificateInfo = "Gordic.Security.Service.GCertificateInfoDTO", CertificateThumbprint = "string", KeyExchange = "string", FileData = "string", OtherFilesToSign = "Gordic.Support.Sign.GFileToSign[]", FileName = "string", FileId = "string", DataPreparedForDistributedSignature = "string", DistributivelySignedPreparedData = "string", DistributivelySignedHash = "string", SignedFile = "Gordic.Support.Sign.GSignedFile", SignedFileData = "string", ExternalSignatureData = "string", ExternalTimestampData = "string", SignedFileExtension = "string", AddTimestamp = "boolean", SbbDnsEnabled = "boolean", SigningCertChain = "Gordic.Security.Service.GCertificateChain", LtvAdditionType = "Gordic.Support.Sign.GLtvAdditionType", LtvServerUrl = "string", LtvServerUser = "string", LtvServerUseNtlm = "boolean", LtvServerSingleRequest = "boolean", LtvServerTimeout = "number", LtvServerVerifyAfterCompletition = "boolean", LtvAllowAddCurrentInfo = "boolean", FailIfLtvAdditionNotSuccessful = "boolean", RevocationInfoGordicProxyConfiguration = "Gordic.Security.Service.GAIBConnection", SignCreateGordicProxyConfiguration = "Gordic.Security.Service.GAIBConnection", RevocationInfoSystemProxyConfiguration = "Gordic.Security.Service.GHTTPProxy", SgnWebServiceProxy = "Gordic.Security.Service.GHTTPProxy", SgnWebServiceUrl = "string", SgnWebServiceUrl2 = "string", SgnWebServiceUser = "string", SgnWebServiceAllowStreaming = "boolean", SgnWebServiceUseNtlm = "boolean", SgnWebServiceTimeout = "number", SgnWebServiceCheckTemplate = "boolean", MaxTimestampAttempts = "number", TimestampAttemptDelayMs = "number", IxsLpc = "string", SgnWebServiceType = "Gordic.Security.Service.GSgnWebserviceType", UrlMonetPlus = "string", MonetPlusUser = "string", SgnWebServiceCertificateUser = "string", SgnWebServiceCertificateUserGroup = "string", CesypConfig = "Gordic.Security.Service.GCesypConfiguration", RemSigConfig = "Gordic.Security.Service.GRemSigConfiguration", CscConfig = "Gordic.Security.Service.GCscApiConfiguration", ObeliskConfig = "Gordic.Security.Service.GObeliskConfiguration", SecuSignNetConfiguration = "Gordic.Security.Service.GSecuSignConfiguration", SgnAttemptLogItems = "Gordic.Security.Service.GSignatureAttemptLogItem[]", SignatureType = "Gordic.Security.Service.SignatureType", SgnHash = "Gordic.General.ApplicationInterface.GHashAlgEnum", VisualSignConfig = "Gordic.Security.Service.GPdfVisualSignConfig", VisualSignText = "Gordic.Security.Service.GVisualSgnText", TimestampConfig = "Gordic.Security.Service.GTimeStampInfo", SignReason = "string", SigningTime = "JsonDate", SecuSignUrl = "string", SecuSignUserId = "string", SgnWebServiceAuthCertThumbprint = "string", IcaRemoteSealFolder = "string", IcaRemoteSealPathToSecret = "string", LtvCompletitionResult = "Gordic.Support.Sign.GLtvCompletitionResult", SignaturesVerificationReport = "string", LtvServerSignatureVerificationParams = "Gordic.DocConv.Common.GCommandParameters", DksParams = "Gordic.DocConv.Common.GCommandParameters", TransactionId = "string", SignatureName = "string", IsFiction = "boolean", AuthorName = "string", SigningCertificatePinInSecret = "boolean",}
	const enum GSignCreateConfigTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Support.Sign\FileSigner\GSignedFile.d.ts 

declare namespace Gordic.Support.Sign {
	/**Signed file*/
	interface GSignedFile extends Gordic.Support.Sign.GFileToSign {
	}
	const enum GSignedFileNames { Description = "Description", ObjectIdentifier = "ObjectIdentifier", Mimetype = "Mimetype", FileId = "FileId", FileSizeToCache = "FileSizeToCache", FileName = "FileName", Extension = "Extension", FilePath = "FilePath", FileData = "FileData",}
	const enum GSignedFileFragments { Description = "*", ObjectIdentifier = "*", Mimetype = "*", FileId = "*", FileSizeToCache = "*", FileName = "*", Extension = "*", FilePath = "*", FileData = "*",}
	const enum GSignedFileTypes { Description = "string", ObjectIdentifier = "string", Mimetype = "string", FileId = "string", FileSizeToCache = "number", FileName = "string", Extension = "string", FilePath = "string", FileData = "string",}
	const enum GSignedFileTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Support.Sign\FileSigner\GXmlSignProperties.d.ts 

declare namespace Gordic.Support.Sign {
	/**XML signature properties*/
	interface GXmlSignProperties {
		/**Canonicalization method*/
		CanonicalizationMethod?: Gordic.Security.Service.GXmlSignature.CanonMethodEnum|null;
		/**Transform method*/
		TransformMethod?: Gordic.Security.Service.GXmlSignature.SignatureTypeEnum|null;
		/**Node to sign*/
		NodeToSign?: Gordic.Security.Service.GXmlRef|null;
		/**Node to place signature*/
		NodeToPlaceSignature?: Gordic.Security.Service.GXmlRef|null;
		/**Add reference attribute*/
		AddAttributeToReferencedNode?: boolean|null;
		/**Reference attribute name*/
		ReferenceAttributeName?: string|null;
		/**Reference attribute value*/
		ReferenceAttributeValue?: string|null;
		/**Add qualifying properties element to the signature element*/
		AddQualifyingProperties?: boolean|null;
		/**Add SubjectName element to X509Data element*/
		AddSubjectNameToKeyData?: boolean|null;
		/**Signature element namespace prefix*/
		SignElementPrefix?: string|null;
		/**include KeyValue element inside KeyInfo element*/
		IncludeKeyValue?: boolean|null;
		/**Add xsi:schemaLocation attribute into XAdES element*/
		AddXadesSchemaLocation?: boolean|null;
	}
	const enum GXmlSignPropertiesNames { CanonicalizationMethod = "CanonicalizationMethod", TransformMethod = "TransformMethod", NodeToSign = "NodeToSign", NodeToPlaceSignature = "NodeToPlaceSignature", AddAttributeToReferencedNode = "AddAttributeToReferencedNode", ReferenceAttributeName = "ReferenceAttributeName", ReferenceAttributeValue = "ReferenceAttributeValue", AddQualifyingProperties = "AddQualifyingProperties", AddSubjectNameToKeyData = "AddSubjectNameToKeyData", SignElementPrefix = "SignElementPrefix", IncludeKeyValue = "IncludeKeyValue", AddXadesSchemaLocation = "AddXadesSchemaLocation",}
	const enum GXmlSignPropertiesFragments { CanonicalizationMethod = "*", TransformMethod = "*", NodeToSign = "*", NodeToPlaceSignature = "*", AddAttributeToReferencedNode = "*", ReferenceAttributeName = "*", ReferenceAttributeValue = "*", AddQualifyingProperties = "*", AddSubjectNameToKeyData = "*", SignElementPrefix = "*", IncludeKeyValue = "*", AddXadesSchemaLocation = "*",}
	const enum GXmlSignPropertiesTypes { CanonicalizationMethod = "Gordic.Security.Service.GXmlSignature.CanonMethodEnum", TransformMethod = "Gordic.Security.Service.GXmlSignature.SignatureTypeEnum", NodeToSign = "Gordic.Security.Service.GXmlRef", NodeToPlaceSignature = "Gordic.Security.Service.GXmlRef", AddAttributeToReferencedNode = "boolean", ReferenceAttributeName = "string", ReferenceAttributeValue = "string", AddQualifyingProperties = "boolean", AddSubjectNameToKeyData = "boolean", SignElementPrefix = "string", IncludeKeyValue = "boolean", AddXadesSchemaLocation = "boolean",}
	const enum GXmlSignPropertiesTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Support.Sign\LTV\GLtvAdditionType.d.ts 

declare namespace Gordic.Support.Sign {
	/**LTV addition type*/
	const enum GLtvAdditionType {
		/**Při podepsání se nekompletuje*/
		DoNotAddRevocationInfo=0,
		/**Je preferováno použití odpovědi OCSP
		*     Pokud není dostupná, použije se dostupný CRL
		*/
		PreferOCSP=1,
		/**Použije se odpověď OCSP, pokud není dostupná, vyhlásí se chyba*/
		OnlyOCSP=2,
		/**Only CRL*/
		OnlyCrl=3,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Support.Sign\LTV\GLtvCompletitionResult.d.ts 

declare namespace Gordic.Support.Sign {
	/**Trida popisujici vysledek kompletace*/
	interface GLtvCompletitionResult {
		/**vysledek kompletace. True pouze v pripade ze se podari zkompletovat vsechny podpisy.*/
		AdditionResult?: boolean|null;
		/**vysledek kompletace txt popis*/
		Error?: string|null;
		/**Signatures tried to compelete (add revocation infos)*/
		Signatures?: Gordic.Support.Sign.GLtvSignatureInfo[]|null;
		/**Cas kompletace*/
		AdditionTime?: JsonDate|null;
		/**zda je vůbec podepsaný*/
		IsSigned?: boolean|null;
	}
	const enum GLtvCompletitionResultNames { AdditionResult = "AdditionResult", Error = "Error", Signatures = "Signatures", AdditionTime = "AdditionTime", IsSigned = "IsSigned",}
	const enum GLtvCompletitionResultFragments { AdditionResult = "*", Error = "*", Signatures = "*", AdditionTime = "*", IsSigned = "*",}
	const enum GLtvCompletitionResultTypes { AdditionResult = "boolean", Error = "string", Signatures = "Gordic.Support.Sign.GLtvSignatureInfo[]", AdditionTime = "JsonDate", IsSigned = "boolean",}
	const enum GLtvCompletitionResultTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Support.Sign\LTV\GLtvSignatureInfo.d.ts 

declare namespace Gordic.Support.Sign {
	/**Trida popisujici stav kompletovaneho podpisu*/
	interface GLtvSignatureInfo {
		/**vysledek kompletace*/
		Completed?: boolean|null;
		/**poradove cislo podpisu*/
		SignatureNumber?: number|null;
		/**podpisovy certifikat*/
		SgnCertThumbprint?: string|null;
		/**Signing date expressed in UTC time*/
		SigningDate?: JsonDate|null;
		/**vysledek overeni podpisu*/
		Verified?: boolean|null;
		/**duvod neovereni*/
		OverErrMsg?: string|null;
	}
	const enum GLtvSignatureInfoNames { Completed = "Completed", SignatureNumber = "SignatureNumber", SgnCertThumbprint = "SgnCertThumbprint", SigningDate = "SigningDate", Verified = "Verified", OverErrMsg = "OverErrMsg",}
	const enum GLtvSignatureInfoFragments { Completed = "*", SignatureNumber = "*", SgnCertThumbprint = "*", SigningDate = "*", Verified = "*", OverErrMsg = "*",}
	const enum GLtvSignatureInfoTypes { Completed = "boolean", SignatureNumber = "number", SgnCertThumbprint = "string", SigningDate = "JsonDate", Verified = "boolean", OverErrMsg = "string",}
	const enum GLtvSignatureInfoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Support.Sign\RemoteSign\GSgnWebserviceType.d.ts 


//#endregion

