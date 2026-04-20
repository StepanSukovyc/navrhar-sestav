/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       security.service.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Security.Service\Gordic.Security.Service.csproj
*    created     2026-02-16 14:33:45
*    files       Gordic.Security.Service.GHTTPProxy.d.ts
*                Gordic.Security.Service.GSBBObject.d.ts
*                Gordic.Security.Service.GSecServiceCommon.d.ts
*                ASiC\SignaturePropertyNamespace.d.ts
*                CertificatesAndStore\GCertificateChain - Copy.d.ts
*                CertificatesAndStore\GCertificateChain.d.ts
*                CertificatesAndStore\GCertificateExtendedKeyUsage.d.ts
*                CertificatesAndStore\GCertificateInfoDTO.d.ts
*                CertificatesAndStore\GCertStoreBasedObject.d.ts
*                CertificatesAndStore\Gordic.Security.Service.GCertificate.d.ts
*                CertificatesAndStore\Gordic.Security.Service.GCertStore.d.ts
*                CertificatesAndStore\GPkcs11StorageConfiguration.d.ts
*                CertValidator\SignatureVerifyPluginType.d.ts
*                Dto\GSignMinimumConfig.d.ts
*                PDF\Gordic.Security.Service.GAIBConnection.d.ts
*                PDF\VisualSign\Gordic.Security.Service.GPdfVisualSignConfig.d.ts
*                PDF\VisualSign\Gordic.Security.Service.GVisualSgnText.d.ts
*                PDF\VisualSign\GPdfVisualSignPosition.d.ts
*                Signature\GSgnWebServiceType.d.ts
*                Signature\GSignatureAttempt.d.ts
*                Signature\GSignaturePolicy.d.ts
*                Signature\SignatureTypeEnum.d.ts
*                SigningServices\CESNET\RemSig\GRemSigConfiguration.d.ts
*                SigningServices\CESYP\GCesypConfiguration.d.ts
*                SigningServices\CSC\GCscApiConfiguration.d.ts
*                SigningServices\Obelisk\GObeliskConfiguration.d.ts
*                SigningServices\S602\GSecuSignConfiguration.d.ts
*                TimeStamp\Gordic.Security.Service.GTimeStampInfo.d.ts
*                XML\GXmlSignature.d.ts
*                XML\GXmlSignProperties.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Security.Service\Gordic.Security.Service.GHTTPProxy.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     Definice proxi pro připojení na server
	*     
	*/
	interface GHTTPProxy {
		/**
		*     PROXY - host
		*     
		*/
		ProxyHost?: string|null;
		/**
		*     PROXY - port
		*     
		*/
		ProxyPort?: number|null;
		/**
		*     PROXY - user
		*     
		*/
		ProxyUsername?: string|null;
		/**
		*     PROXY - ntlm
		*     
		*/
		UseNTLMAuth?: boolean|null;
	}
	const enum GHTTPProxyNames { ProxyHost = "ProxyHost", ProxyPort = "ProxyPort", ProxyUsername = "ProxyUsername", UseNTLMAuth = "UseNTLMAuth",}
	const enum GHTTPProxyFragments { ProxyHost = "*", ProxyPort = "*", ProxyUsername = "*", UseNTLMAuth = "*",}
	const enum GHTTPProxyTypes { ProxyHost = "string", ProxyPort = "number", ProxyUsername = "string", UseNTLMAuth = "boolean",}
	const enum GHTTPProxyTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\Gordic.Security.Service.GSBBObject.d.ts 

declare namespace Gordic.Security.Service {
	/**Předek objektů které volají SBB*/
	interface GSBBObject {
	}
	const enum GSBBObjectNames {}
	const enum GSBBObjectFragments {}
	const enum GSBBObjectTypes {}
	const enum GSBBObjectTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\Gordic.Security.Service.GSecServiceCommon.d.ts 

declare namespace Gordic.Security.Service {
	/**obecna podpora*/
	interface GSecServiceCommon {
		/**Zjistí, zda je systém 64 bit*/
		readonly Is64bitOS?: boolean|null;
	}
	const enum GSecServiceCommonNames { Is64bitOS = "Is64bitOS",}
	const enum GSecServiceCommonFragments { Is64bitOS = "*",}
	const enum GSecServiceCommonTypes { Is64bitOS = "boolean",}
	const enum GSecServiceCommonTypeLengths {}
}
declare namespace Gordic.Security.Service.GSecServiceCommon {
	/**Hash algorithm. 
	*     Corresponds to TElCMSHash.HashAlgorithm
	*/
	interface HashAlgEnum {
		/**Unknown*/
		Unknown?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**SHA1*/
		SHA1?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**MD5*/
		MD5?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**MD2*/
		MD2?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**SHA256*/
		SHA256?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**SHA384*/
		SHA384?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**SHA512*/
		SHA512?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**RIPEMD160*/
		RIPEMD160?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**SHA224*/
		SHA224?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**MD4*/
		MD4?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**CRC32*/
		CRC32?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**SSL3*/
		SSL3?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**GOST_R3411_1994*/
		GOST_R3411_1994?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**WHIRLPOOL*/
		WHIRLPOOL?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		POLY1305?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHA3_224?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHA3_256?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHA3_384?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHA3_512?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2S_128?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2S_160?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2S_224?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2S_256?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2B_160?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2B_256?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2B_384?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		BLAKE2B_512?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHAKE_128?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHAKE_256?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHAKE_128_LEN?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		SHAKE_256_LEN?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		readonly Value?: number|null;
	}
	const enum HashAlgEnumNames { Unknown = "Unknown", SHA1 = "SHA1", MD5 = "MD5", MD2 = "MD2", SHA256 = "SHA256", SHA384 = "SHA384", SHA512 = "SHA512", RIPEMD160 = "RIPEMD160", SHA224 = "SHA224", MD4 = "MD4", CRC32 = "CRC32", SSL3 = "SSL3", GOST_R3411_1994 = "GOST_R3411_1994", WHIRLPOOL = "WHIRLPOOL", POLY1305 = "POLY1305", SHA3_224 = "SHA3_224", SHA3_256 = "SHA3_256", SHA3_384 = "SHA3_384", SHA3_512 = "SHA3_512", BLAKE2S_128 = "BLAKE2S_128", BLAKE2S_160 = "BLAKE2S_160", BLAKE2S_224 = "BLAKE2S_224", BLAKE2S_256 = "BLAKE2S_256", BLAKE2B_160 = "BLAKE2B_160", BLAKE2B_256 = "BLAKE2B_256", BLAKE2B_384 = "BLAKE2B_384", BLAKE2B_512 = "BLAKE2B_512", SHAKE_128 = "SHAKE_128", SHAKE_256 = "SHAKE_256", SHAKE_128_LEN = "SHAKE_128_LEN", SHAKE_256_LEN = "SHAKE_256_LEN", Value = "Value",}
	const enum HashAlgEnumFragments { Unknown = "*", SHA1 = "*", MD5 = "*", MD2 = "*", SHA256 = "*", SHA384 = "*", SHA512 = "*", RIPEMD160 = "*", SHA224 = "*", MD4 = "*", CRC32 = "*", SSL3 = "*", GOST_R3411_1994 = "*", WHIRLPOOL = "*", POLY1305 = "*", SHA3_224 = "*", SHA3_256 = "*", SHA3_384 = "*", SHA3_512 = "*", BLAKE2S_128 = "*", BLAKE2S_160 = "*", BLAKE2S_224 = "*", BLAKE2S_256 = "*", BLAKE2B_160 = "*", BLAKE2B_256 = "*", BLAKE2B_384 = "*", BLAKE2B_512 = "*", SHAKE_128 = "*", SHAKE_256 = "*", SHAKE_128_LEN = "*", SHAKE_256_LEN = "*", Value = "*",}
	const enum HashAlgEnumTypes { Unknown = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA1 = "Gordic.General.ApplicationInterface.GHashAlgEnum", MD5 = "Gordic.General.ApplicationInterface.GHashAlgEnum", MD2 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA256 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA384 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA512 = "Gordic.General.ApplicationInterface.GHashAlgEnum", RIPEMD160 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA224 = "Gordic.General.ApplicationInterface.GHashAlgEnum", MD4 = "Gordic.General.ApplicationInterface.GHashAlgEnum", CRC32 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SSL3 = "Gordic.General.ApplicationInterface.GHashAlgEnum", GOST_R3411_1994 = "Gordic.General.ApplicationInterface.GHashAlgEnum", WHIRLPOOL = "Gordic.General.ApplicationInterface.GHashAlgEnum", POLY1305 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA3_224 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA3_256 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA3_384 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHA3_512 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2S_128 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2S_160 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2S_224 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2S_256 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2B_160 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2B_256 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2B_384 = "Gordic.General.ApplicationInterface.GHashAlgEnum", BLAKE2B_512 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHAKE_128 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHAKE_256 = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHAKE_128_LEN = "Gordic.General.ApplicationInterface.GHashAlgEnum", SHAKE_256_LEN = "Gordic.General.ApplicationInterface.GHashAlgEnum", Value = "number",}
	const enum HashAlgEnumTypeLengths {}
	/**metoda podpisu*/
	const enum XmlSignMethodEnum {
		/**Unknown*/
		Unknown=-1,
		/**DSS*/
		DSS=0,
		/**RSA_SHA1*/
		RSA_SHA1=1,
		/**RSA_MD5*/
		RSA_MD5=2,
		/**RSA_SHA256*/
		RSA_SHA256=3,
		/**RSA_SHA384*/
		RSA_SHA384=4,
		/**RSA_SHA512*/
		RSA_SHA512=5,
		/**RSA_SHA512*/
		RSA_RIPEMD160=6,
	}
	/**subalgoritmy rsa*/
	const enum RSAdSubalgorithmEnum {
		/**PKCS#1 v1.5 private key*/
		PKCS1=0,
		/**RSA OAEP private key*/
		OAEP=1,
		/**RSA PSS private key*/
		PSS=2,
		/**SSL3*/
		SSL3,
	}
	/**XAdES form*/
	const enum XAdESForm {
		/**XML Advanced Electronic Signatures (XAdES)*/
		XAdES=1,
		/**Basic electronic signature(XAdES-BES)*/
		XAdES_BES=2,
		/**Explicit policy electronic signatures(XAdES-EPES)*/
		XAdES_EPES=3,
		/**Electronic signature with time(XAdES-T)*/
		XAdES_T=4,
		/**Electronic signature with complete validation data references(XAdES-C)*/
		XAdES_C=5,
		/**Extended signatures with time forms(XAdES-X)*/
		XAdES_X=6,
		/**Extended long electronic signatures with time(XAdES-X-L)*/
		XAdES_X_L=7,
		/**Archival electronic signatures(XAdES-A)*/
		XAdES_A=8,
	}
	/**signature option*/
	const enum SigningOptionEnum {
		/**specifies whether to insert digest value into the signature*/
		INSERTMESSAGEDIGESTS=1,
		/**specifies whether to ignore a time-stamp failure*/
		IGNORETIMESTAMPFAILURE=2,
		/**forces ElMessageSigner to suppress outerContentInfo record when writing signature object*/
		NOOUTERCONTENTINFO=4,
		/**If this option is enabled than ElMessageSigner treats transmitted buffer as the message hash value. If it is disabled, ElMessageSigner expects to receive electronic message in PKCS#7 format.*/
		RAWCOUNTERSIGN=8,
		/**specifies whether to include the SigningTime attribute into the signature*/
		INSERTSIGNINGTIME=16,
		/**makes ElMessageSigner force ASN.1 GeneralizedTime type for date/time values. If this flag is disabled, UTCTime type is used instead.*/
		USEGENERALIZEDTIMEFORMAT=32,
	}
	/**Secure BlackBox license key type*/
	const enum SbbLicenseKeyType {
		/**As very ld versions of SBB*/
		LONG,
		/**New versions of SBB*/
		SHORT,
		/**UNKNOWN*/
		UNKNOWN,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\ASiC\SignaturePropertyNamespace.d.ts 

declare namespace Gordic.Security.Service {
	/**Signature property namespace*/
	interface SignaturePropertyNamespace {
		/**Namespace*/
		Namespace?: string|null;
		/**Prefix*/
		Prefix?: string|null;
	}
	const enum SignaturePropertyNamespaceNames { Namespace = "Namespace", Prefix = "Prefix",}
	const enum SignaturePropertyNamespaceFragments { Namespace = "*", Prefix = "*",}
	const enum SignaturePropertyNamespaceTypes { Namespace = "string", Prefix = "string",}
	const enum SignaturePropertyNamespaceTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\GCertificateChain - Copy.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\GCertificateChain.d.ts 

declare namespace Gordic.Security.Service {
	/**Certificate chain used for signing*/
	interface GCertificateChain extends Gordic.Security.Service.GCertStoreBasedObject {
		/**Root*/
		Root?: Gordic.Security.Service.GCertificate|null;
		/**Publishers. Doe not contain root certificate*/
		Publishers?: Gordic.DocConv.Common.GThreadSafeList<Gordic.Security.Service.GCertificate>|null;
		/**Signing certificate*/
		SigningCert?: Gordic.Security.Service.GCertificate|null;
		/**Top certificate. Doesn't have to be signing*/
		readonly TopCertificate?: Gordic.Security.Service.GCertificate|null;
	}
	const enum GCertificateChainNames { Root = "Root", Publishers = "Publishers", SigningCert = "SigningCert", TopCertificate = "TopCertificate", Logger = "Logger",}
	const enum GCertificateChainFragments { Root = "*", Publishers = "*", SigningCert = "*", TopCertificate = "*", Logger = "*",}
	const enum GCertificateChainTypes { Root = "Gordic.Security.Service.GCertificate", Publishers = "Gordic.DocConv.Common.GThreadSafeList<Gordic.Security.Service.GCertificate>", SigningCert = "Gordic.Security.Service.GCertificate", TopCertificate = "Gordic.Security.Service.GCertificate", Logger = "any",}
	const enum GCertificateChainTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\GCertificateExtendedKeyUsage.d.ts 

declare namespace Gordic.Security.Service {
	/**Exended key usage*/
	const enum GCertificateExtendedKeyUsage {
		/**None*/
		None=0,
		/**Client authentication*/
		ClientAuthentication=1,
		/**Code signing*/
		CodeSigning=2,
		/**Custom*/
		Custom=4,
		/**Email protection*/
		EmailProtection=8,
		/**Server authentication*/
		ServerAuthentication=16,
		/**Time stamping*/
		TimeStamping=32,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\GCertificateInfoDTO.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     Certificate info DTO
	*     
	*/
	interface GCertificateInfoDTO extends Gordic.Security.Service.GSBBObject {
		/**
		*     Extended key usage
		*     
		*/
		ExtendedKeyUsage?: Gordic.Security.Service.GCertificateExtendedKeyUsage|null;
		/**
		*     Certificate policies
		*     
		*/
		CertificatePolices?: string[]|null;
		/**
		*     Version of the certificate
		*     
		*/
		Version?: number|null;
		/**
		*     Signature algorithm used to sign the certificate
		*     
		*/
		SignatureAlgorithm?: string|null;
		/**
		*     Country code
		*     
		*/
		CountryCode?: string|null;
		/**
		*     Organization
		*     
		*/
		Organization?: string|null;
		/**
		*     Organization unit
		*     
		*/
		OrganizationUnit?: string|null;
		/**
		*     Locality
		*     
		*/
		Locality?: string|null;
		/**
		*     OCSP responders addresses
		*     
		*/
		OCSPAddresses?: string[]|null;
		/**
		*     CRL addresses
		*     
		*/
		CRLAddresses?: string[]|null;
		/**
		*     Subject Key Identifier from extension definde in X.509.3 
		*     
		*/
		SubjectKeyIdentifier?: string|null;
		/**
		*     DNS name
		*     
		*/
		DnsName?: string|null;
		/**
		*     Issuer ID
		*     
		*/
		IssuerSerialNumber?: string|null;
		/**
		*     Issuer DNS name
		*     
		*/
		IssuerDnsName?: string|null;
		/**
		*     Thumbprint
		*     
		*/
		Thumbprint?: string|null;
		/**
		*     Serial number
		*     
		*/
		SerialNumber?: string|null;
		/**
		*     Authority Key ID
		*     
		*/
		AuthorityKeyID?: string|null;
		/**
		*     Raw data
		*     
		*/
		RawData?: any[]|null;
		/**
		*     Subject
		*     
		*/
		Subject?: string|null;
		/**
		*     Subject simple name (mostly displayed)
		*     
		*/
		SubjectSimpleName?: string|null;
		/**
		*     Email
		*     
		*/
		Email?: string|null;
		/**
		*     Valid from
		*     
		*/
		ValidFrom?: Date|null;
		/**
		*     Valid to
		*     
		*/
		ValidTo?: Date|null;
		/**
		*     Revoked from
		*     
		*/
		RevokedFrom?: Date|null;
		/**
		*     Revocation reason
		*     
		*/
		RevocationReason?: string|null;
		/**
		*     This certificates is/was used for signing the document
		*     
		*/
		Signing?: boolean|null;
		/**
		*     This certificates can be used for signing
		*     
		*/
		CanSign?: boolean|null;
		/**
		*     Is ETSI certificate for Electronic Seal existing on QCSD
		*     
		*/
		EtsiQctEseal?: boolean|null;
		/**
		*     Has private key
		*     
		*/
		HasPrivateKey?: boolean|null;
		/**
		*     Issuer
		*     
		*/
		Issuer?: string|null;
		/**
		*     Issuer locality
		*     
		*/
		IssuerLocality?: string|null;
		/**
		*     Issuer certificate URL
		*     
		*/
		IssuerCertificateUrl?: string|null;
		/**
		*     Issuer organization
		*     
		*/
		IssuerOrganization?: string|null;
		/**
		*     Issuer email
		*     
		*/
		IssuerEmail?: string|null;
		/**
		*     Issuer country code
		*     
		*/
		IssuerCountryCode?: string|null;
		/**
		*     Issuer organization unit
		*     
		*/
		IssuerOrganizationUnit?: string|null;
		/**
		*     Has qualified certificate flag in ASN1
		*     
		*/
		HasQualifiedCertificateFlag?: boolean|null;
		/**
		*     Has qualified device flag in ASN1
		*     
		*/
		HasQualifiedDeviceFlag?: boolean|null;
		/**
		*     Private key is password protected
		*     
		*/
		NeedsToEnterPassword?: boolean|null;
		/**
		*     Using certificate's private key is protected by another authentication factor and thus it's needed to wait for it's confirmation
		*     
		*/
		NeedsToWaitForConfirmation?: boolean|null;
		/**
		*     Self-signed certificate (signals root authority)
		*     
		*/
		SelfSigned?: boolean|null;
		/**
		*     Is ICA RemoteSeal
		*     
		*/
		IcaRemoteSeal?: boolean|null;
		/**
		*     Is ICA RestEsel (for SZR)
		*     
		*/
		IcaRestEsel?: boolean|null;
		/**
		*     Is CESYP seal
		*     
		*/
		IsCesypSeal?: boolean|null;
		/**
		*     Is RemSig seal
		*     
		*/
		IsRemsigSeal?: boolean|null;
		/**
		*     Is RemSig personal certificate
		*     
		*/
		IsRemsigPersonal?: boolean|null;
		/**
		*     Is SecuSign seal
		*     
		*/
		IsSecuSignSeal?: boolean|null;
		/**
		*     Is SecuSign personal certificate
		*     
		*/
		IsSecuSignPersonal?: boolean|null;
		/**
		*     Is certificate available via Cloud signature consortium API
		*     
		*/
		IsCsc?: boolean|null;
		/**
		*     Is in EU TSL
		*     
		*/
		IsInTsl?: boolean|null;
		/**
		*     Web service type - through which service the certificate is used
		*     
		*/
		SgnWebServiceType?: Gordic.Security.Service.GSgnWebserviceType|null;
		/**
		*     Distributed signature is allowed
		*     
		*/
		DistributedSignatureAllowed?: boolean|null;
		/**
		*     Trusted from by TSL
		*     
		*/
		TslTrustedFrom?: JsonDate|null;
		/**
		*     Trusted to by TSL
		*     
		*/
		TslTrustedTo?: JsonDate|null;
		/**
		*     Current status by TSL
		*     
		*/
		TslCurrentStatus?: string|null;
		/**
		*     Service type by TSL
		*     
		*/
		TslServiceType?: string|null;
		/**
		*     602 ID (for SecuSign)
		*     
		*/
		Id602?: string|null;
		/**
		*     Credential ID in CSC (Cloud Signature Consortium) API
		*     
		*/
		CscCredentialId?: string|null;
		/**
		*     RemSig person unique ID (for RemSig)
		*     
		*/
		RemSigPersonId?: string|null;
		/**
		*     Index of a certificate in RemSig
		*     
		*/
		RemSigCertificateIndex?: number|null;
		/**
		*     Represents the base URL used for Remsig service requests.
		*     
		*/
		RemsigOrganization?: string|null;
	}
	const enum GCertificateInfoDTONames { ExtendedKeyUsage = "ExtendedKeyUsage", CertificatePolices = "CertificatePolices", Version = "Version", SignatureAlgorithm = "SignatureAlgorithm", CountryCode = "CountryCode", Organization = "Organization", OrganizationUnit = "OrganizationUnit", Locality = "Locality", OCSPAddresses = "OCSPAddresses", CRLAddresses = "CRLAddresses", SubjectKeyIdentifier = "SubjectKeyIdentifier", DnsName = "DnsName", IssuerSerialNumber = "IssuerSerialNumber", IssuerDnsName = "IssuerDnsName", Thumbprint = "Thumbprint", SerialNumber = "SerialNumber", AuthorityKeyID = "AuthorityKeyID", RawData = "RawData", Subject = "Subject", SubjectSimpleName = "SubjectSimpleName", Email = "Email", ValidFrom = "ValidFrom", ValidTo = "ValidTo", RevokedFrom = "RevokedFrom", RevocationReason = "RevocationReason", Signing = "Signing", CanSign = "CanSign", EtsiQctEseal = "EtsiQctEseal", HasPrivateKey = "HasPrivateKey", Issuer = "Issuer", IssuerLocality = "IssuerLocality", IssuerCertificateUrl = "IssuerCertificateUrl", IssuerOrganization = "IssuerOrganization", IssuerEmail = "IssuerEmail", IssuerCountryCode = "IssuerCountryCode", IssuerOrganizationUnit = "IssuerOrganizationUnit", HasQualifiedCertificateFlag = "HasQualifiedCertificateFlag", HasQualifiedDeviceFlag = "HasQualifiedDeviceFlag", NeedsToEnterPassword = "NeedsToEnterPassword", NeedsToWaitForConfirmation = "NeedsToWaitForConfirmation", SelfSigned = "SelfSigned", IcaRemoteSeal = "IcaRemoteSeal", IcaRestEsel = "IcaRestEsel", IsCesypSeal = "IsCesypSeal", IsRemsigSeal = "IsRemsigSeal", IsRemsigPersonal = "IsRemsigPersonal", IsSecuSignSeal = "IsSecuSignSeal", IsSecuSignPersonal = "IsSecuSignPersonal", IsCsc = "IsCsc", IsInTsl = "IsInTsl", SgnWebServiceType = "SgnWebServiceType", DistributedSignatureAllowed = "DistributedSignatureAllowed", TslTrustedFrom = "TslTrustedFrom", TslTrustedTo = "TslTrustedTo", TslCurrentStatus = "TslCurrentStatus", TslServiceType = "TslServiceType", Id602 = "Id602", CscCredentialId = "CscCredentialId", RemSigPersonId = "RemSigPersonId", RemSigCertificateIndex = "RemSigCertificateIndex", RemsigOrganization = "RemsigOrganization", Logger = "Logger",}
	const enum GCertificateInfoDTOFragments { ExtendedKeyUsage = "*", CertificatePolices = "*", Version = "*", SignatureAlgorithm = "*", CountryCode = "*", Organization = "*", OrganizationUnit = "*", Locality = "*", OCSPAddresses = "*", CRLAddresses = "*", SubjectKeyIdentifier = "*", DnsName = "*", IssuerSerialNumber = "*", IssuerDnsName = "*", Thumbprint = "*", SerialNumber = "*", AuthorityKeyID = "*", RawData = "*", Subject = "*", SubjectSimpleName = "*", Email = "*", ValidFrom = "*", ValidTo = "*", RevokedFrom = "*", RevocationReason = "*", Signing = "*", CanSign = "*", EtsiQctEseal = "*", HasPrivateKey = "*", Issuer = "*", IssuerLocality = "*", IssuerCertificateUrl = "*", IssuerOrganization = "*", IssuerEmail = "*", IssuerCountryCode = "*", IssuerOrganizationUnit = "*", HasQualifiedCertificateFlag = "*", HasQualifiedDeviceFlag = "*", NeedsToEnterPassword = "*", NeedsToWaitForConfirmation = "*", SelfSigned = "*", IcaRemoteSeal = "*", IcaRestEsel = "*", IsCesypSeal = "*", IsRemsigSeal = "*", IsRemsigPersonal = "*", IsSecuSignSeal = "*", IsSecuSignPersonal = "*", IsCsc = "*", IsInTsl = "*", SgnWebServiceType = "*", DistributedSignatureAllowed = "*", TslTrustedFrom = "*", TslTrustedTo = "*", TslCurrentStatus = "*", TslServiceType = "*", Id602 = "*", CscCredentialId = "*", RemSigPersonId = "*", RemSigCertificateIndex = "*", RemsigOrganization = "*", Logger = "*",}
	const enum GCertificateInfoDTOTypes { ExtendedKeyUsage = "Gordic.Security.Service.GCertificateExtendedKeyUsage", CertificatePolices = "string[]", Version = "number", SignatureAlgorithm = "string", CountryCode = "string", Organization = "string", OrganizationUnit = "string", Locality = "string", OCSPAddresses = "string[]", CRLAddresses = "string[]", SubjectKeyIdentifier = "string", DnsName = "string", IssuerSerialNumber = "string", IssuerDnsName = "string", Thumbprint = "string", SerialNumber = "string", AuthorityKeyID = "string", RawData = "any[]", Subject = "string", SubjectSimpleName = "string", Email = "string", ValidFrom = "Date", ValidTo = "Date", RevokedFrom = "Date", RevocationReason = "string", Signing = "boolean", CanSign = "boolean", EtsiQctEseal = "boolean", HasPrivateKey = "boolean", Issuer = "string", IssuerLocality = "string", IssuerCertificateUrl = "string", IssuerOrganization = "string", IssuerEmail = "string", IssuerCountryCode = "string", IssuerOrganizationUnit = "string", HasQualifiedCertificateFlag = "boolean", HasQualifiedDeviceFlag = "boolean", NeedsToEnterPassword = "boolean", NeedsToWaitForConfirmation = "boolean", SelfSigned = "boolean", IcaRemoteSeal = "boolean", IcaRestEsel = "boolean", IsCesypSeal = "boolean", IsRemsigSeal = "boolean", IsRemsigPersonal = "boolean", IsSecuSignSeal = "boolean", IsSecuSignPersonal = "boolean", IsCsc = "boolean", IsInTsl = "boolean", SgnWebServiceType = "Gordic.Security.Service.GSgnWebserviceType", DistributedSignatureAllowed = "boolean", TslTrustedFrom = "JsonDate", TslTrustedTo = "JsonDate", TslCurrentStatus = "string", TslServiceType = "string", Id602 = "string", CscCredentialId = "string", RemSigPersonId = "string", RemSigCertificateIndex = "number", RemsigOrganization = "string", Logger = "any",}
	const enum GCertificateInfoDTOTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\GCertStoreBasedObject.d.ts 

declare namespace Gordic.Security.Service {
	/**Object working with certificate store*/
	interface GCertStoreBasedObject extends Gordic.Security.Service.GSBBObject {
	}
	const enum GCertStoreBasedObjectNames { Logger = "Logger",}
	const enum GCertStoreBasedObjectFragments { Logger = "*",}
	const enum GCertStoreBasedObjectTypes { Logger = "any",}
	const enum GCertStoreBasedObjectTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\Gordic.Security.Service.GCertificate.d.ts 

declare namespace Gordic.Security.Service {
	/**Objekt pro práci s certifikáty X509*/
	interface GCertificate extends Gordic.Security.Service.GSBBObject {
		/**Extended key usage*/
		ExtendedKeyUsage?: Gordic.Security.Service.GCertificateExtendedKeyUsage|null;
		/**Obsah privátního klíče*/
		readonly PrivateKey?: string|null;
		/**Obsah veřejného klíče*/
		readonly PublicKey?: string|null;
		/**raw data of a certificate*/
		RawData?: string|null;
		/**Vrací certifikát jako objekt 
		*        [ System.Security.Cryptography.X509Certificates.X509Certificate2 ]
		*/
		readonly X509Cert?: any|null;
		/**vraci true pokud je objekt inicializovan*/
		readonly IsAssigned?: boolean|null;
		/**Is I.CA RemoteSeal. This certificate's private key is stored on HSM inside I.CA structures*/
		IcaRemoteSeal?: boolean|null;
		/**Is Monet+ remote sign. This certificate's private key is stored on server on ProId card with Monet+ seal web service installed*/
		MonetPlusRemoteSign?: boolean|null;
		/**Is DKS remote sign. This certificate's private key is stored on DKS server (Windows store or card/token)*/
		DksRemoteSign?: boolean|null;
		/**Organizace*/
		readonly SubjectOrganisation?: string|null;
		/**Organizace vydavatele certifikátu*/
		readonly IssuerOrganisation?: string|null;
		/**Organizační jednotka*/
		readonly SubjectOrganisationUnit?: string|null;
		/**Organizační jednotka vydavatele certifikátu*/
		readonly IssuerOrganisationUnit?: string|null;
		/**Lokalita (město)*/
		readonly SubjectLocality?: string|null;
		/**Lokalita (město) vydavatele certifikátu*/
		readonly IssuerLocality?: string|null;
		/**Kód státu*/
		readonly SubjectCountryCode?: string|null;
		/**Kód státu vydavatele certifikátu*/
		readonly IssuerCountryCode?: string|null;
		/**E-mailová adresa*/
		readonly SubjectEMail?: string|null;
		/**E-mailová adresa*/
		readonly IssuerEMail?: string|null;
		/**DnsName*/
		readonly SubjectDnsName?: string|null;
		/**Issuer DnsName*/
		readonly IssuerDnsName?: string|null;
		/**SimpleName*/
		readonly SubjectSimpleName?: string|null;
		/**Issuer SimpleName*/
		readonly IssuerSimpleName?: string|null;
		/**value indicating that an X.509 certificate is archived.*/
		readonly Archived?: boolean|null;
		/**associated alias for a certificate*/
		readonly FriendlyName?: string|null;
		/**object contains a private key*/
		HasPrivateKey?: boolean|null;
		/**name of the certificate authority that issued the certificate*/
		Issuer?: string|null;
		/**Subject Key Identifier*/
		SubjectKeyIdentifier?: string|null;
		/**The serial number of issuer's certificate*/
		IssuerSerialNumber?: string|null;
		/**ID klíče autority*/
		AuthorityKeyID?: string|null;
		/**Autority certificate url*/
		IssuerCertificateUrl?: string|null;
		/**From when the certificate is revoked*/
		RevokedFrom?: JsonDate|null;
		/**Revocation reason*/
		RevocationReason?: string|null;
		/**date in UTC time after which a certificate is no longer valid*/
		readonly NotAfter?: JsonDate|null;
		/**Valid from*/
		ValidFrom?: Date|null;
		/**Valid to*/
		ValidTo?: Date|null;
		/**date in local time on which a certificate becomes valid*/
		readonly NotBefore?: JsonDate|null;
		/**serial number of a certificate*/
		SerialNumber?: string|null;
		/**algorithm used to create the signature of a certificate*/
		readonly SignatureAlgorithm?: string|null;
		/**subject distinguished name from the certificate*/
		Subject?: string|null;
		/**Cely alternativni predmet*/
		readonly SubjAlternName?: string|null;
		/**EMail z alternativniho predmetu*/
		readonly SubjAlternNameRFC822?: string|null;
		/**thumbprint of a certificate*/
		Thumbprint?: string|null;
		/**Jméno crypto providera*/
		readonly CriptoServiceProviderName?: string|null;
		/**version of a certificate*/
		readonly Version?: number|null;
		/**Is certificate self-signed (probably the root certificate)*/
		readonly SelfSigned?: boolean|null;
		/**Pomocná proměnná pro detekování podpisového certifikátu
		*     Pokud je true byl použit
		*/
		SigningCert?: boolean|null;
		/**Pomocná proměnná pro detekování podpisového certifikátu
		*     Pokud je true byl použit
		*/
		Signing?: boolean|null;
		/**Certificate can be used for signing*/
		readonly CanSign?: boolean|null;
		/**Zdroj odkud byl certifikat nahran - AccessType*/
		AccessType?: Gordic.General.ApplicationInterface.GCertStoreStorageAccessType|null;
		/**Zdroj odkud byl certifikat nahran - StoreId*/
		StoreId?: Gordic.General.ApplicationInterface.GCertStoreIdEnum|null;
		/**Praporek urcujici jestli byl certifikat nahran ze souboru*/
		LoadedFromFile?: boolean|null;
		/**Soubor ze ktereho byl certifikat nahran*/
		Sourcefile?: string|null;
		/**Heslo k soubor ze ktereho byl certifikat nahran*/
		SourceFilePassword?: string|null;
		/**PKCS#11 driver path*/
		Pkcs11DriverPath?: string|null;
		/**HSM slot*/
		HsmSlot?: string|null;
		/**HSM slot*/
		UseNssMode?: boolean|null;
		/**Použití klíče CRLSign*/
		readonly KeyUssage_CRLSign?: boolean|null;
		/**Použití klíče DataEncipherment*/
		readonly KeyUssage_DataEncipherment?: boolean|null;
		/**Použití klíče DecipherOnly*/
		readonly KeyUssage_DecipherOnly?: boolean|null;
		/**Použití klíče DigitalSignature*/
		readonly KeyUssage_DigitalSignature?: boolean|null;
		/**Použití klíče EncipherOnly*/
		readonly KeyUssage_EncipherOnly?: boolean|null;
		/**Použití klíče KeyAgreement*/
		readonly KeyUssage_KeyAgreement?: boolean|null;
		/**Použití klíče KeyCertSign*/
		readonly KeyUssage_KeyCertSign?: boolean|null;
		/**Použití klíče KeyEncipherment*/
		readonly KeyUssage_KeyEncipherment?: boolean|null;
		/**Použití klíče NonRepudiation*/
		readonly KeyUssage_NonRepudiation?: boolean|null;
		readonly CRLAddress?: string[]|null;
		readonly OCSPAddress?: string[]|null;
		/**Zásady certifikátu*/
		readonly CertificatePolices?: string[]|null;
		/**Kvalifikovaný cert. EU*/
		readonly QualifiedCertificate?: boolean|null;
		/**Kvalifikované zařízení pro uložení privátního klíče*/
		readonly QualifiedPrivKeyDevice?: boolean|null;
		/**Certifikát byl vydán jako certifikát pro elektronickou pečeť dle [eIDAS].*/
		readonly EtsiQctEseal?: boolean|null;
	}
	const enum GCertificateNames { ExtendedKeyUsage = "ExtendedKeyUsage", PrivateKey = "PrivateKey", PublicKey = "PublicKey", RawData = "RawData", X509Cert = "X509Cert", IsAssigned = "IsAssigned", IcaRemoteSeal = "IcaRemoteSeal", MonetPlusRemoteSign = "MonetPlusRemoteSign", DksRemoteSign = "DksRemoteSign", SubjectOrganisation = "SubjectOrganisation", IssuerOrganisation = "IssuerOrganisation", SubjectOrganisationUnit = "SubjectOrganisationUnit", IssuerOrganisationUnit = "IssuerOrganisationUnit", SubjectLocality = "SubjectLocality", IssuerLocality = "IssuerLocality", SubjectCountryCode = "SubjectCountryCode", IssuerCountryCode = "IssuerCountryCode", SubjectEMail = "SubjectEMail", IssuerEMail = "IssuerEMail", SubjectDnsName = "SubjectDnsName", IssuerDnsName = "IssuerDnsName", SubjectSimpleName = "SubjectSimpleName", IssuerSimpleName = "IssuerSimpleName", Archived = "Archived", FriendlyName = "FriendlyName", HasPrivateKey = "HasPrivateKey", Issuer = "Issuer", SubjectKeyIdentifier = "SubjectKeyIdentifier", IssuerSerialNumber = "IssuerSerialNumber", AuthorityKeyID = "AuthorityKeyID", IssuerCertificateUrl = "IssuerCertificateUrl", RevokedFrom = "RevokedFrom", RevocationReason = "RevocationReason", NotAfter = "NotAfter", ValidFrom = "ValidFrom", ValidTo = "ValidTo", NotBefore = "NotBefore", SerialNumber = "SerialNumber", SignatureAlgorithm = "SignatureAlgorithm", Subject = "Subject", SubjAlternName = "SubjAlternName", SubjAlternNameRFC822 = "SubjAlternNameRFC822", Thumbprint = "Thumbprint", CriptoServiceProviderName = "CriptoServiceProviderName", Version = "Version", SelfSigned = "SelfSigned", SigningCert = "SigningCert", Signing = "Signing", CanSign = "CanSign", AccessType = "AccessType", StoreId = "StoreId", LoadedFromFile = "LoadedFromFile", Sourcefile = "Sourcefile", SourceFilePassword = "SourceFilePassword", Pkcs11DriverPath = "Pkcs11DriverPath", HsmSlot = "HsmSlot", UseNssMode = "UseNssMode", KeyUssage_CRLSign = "KeyUssage_CRLSign", KeyUssage_DataEncipherment = "KeyUssage_DataEncipherment", KeyUssage_DecipherOnly = "KeyUssage_DecipherOnly", KeyUssage_DigitalSignature = "KeyUssage_DigitalSignature", KeyUssage_EncipherOnly = "KeyUssage_EncipherOnly", KeyUssage_KeyAgreement = "KeyUssage_KeyAgreement", KeyUssage_KeyCertSign = "KeyUssage_KeyCertSign", KeyUssage_KeyEncipherment = "KeyUssage_KeyEncipherment", KeyUssage_NonRepudiation = "KeyUssage_NonRepudiation", CRLAddress = "CRLAddress", OCSPAddress = "OCSPAddress", CertificatePolices = "CertificatePolices", QualifiedCertificate = "QualifiedCertificate", QualifiedPrivKeyDevice = "QualifiedPrivKeyDevice", EtsiQctEseal = "EtsiQctEseal", Logger = "Logger",}
	const enum GCertificateFragments { ExtendedKeyUsage = "*", PrivateKey = "*", PublicKey = "*", RawData = "*", X509Cert = "*", IsAssigned = "*", IcaRemoteSeal = "*", MonetPlusRemoteSign = "*", DksRemoteSign = "*", SubjectOrganisation = "*", IssuerOrganisation = "*", SubjectOrganisationUnit = "*", IssuerOrganisationUnit = "*", SubjectLocality = "*", IssuerLocality = "*", SubjectCountryCode = "*", IssuerCountryCode = "*", SubjectEMail = "*", IssuerEMail = "*", SubjectDnsName = "*", IssuerDnsName = "*", SubjectSimpleName = "*", IssuerSimpleName = "*", Archived = "*", FriendlyName = "*", HasPrivateKey = "*", Issuer = "*", SubjectKeyIdentifier = "*", IssuerSerialNumber = "*", AuthorityKeyID = "*", IssuerCertificateUrl = "*", RevokedFrom = "*", RevocationReason = "*", NotAfter = "*", ValidFrom = "*", ValidTo = "*", NotBefore = "*", SerialNumber = "*", SignatureAlgorithm = "*", Subject = "*", SubjAlternName = "*", SubjAlternNameRFC822 = "*", Thumbprint = "*", CriptoServiceProviderName = "*", Version = "*", SelfSigned = "*", SigningCert = "*", Signing = "*", CanSign = "*", AccessType = "*", StoreId = "*", LoadedFromFile = "*", Sourcefile = "*", SourceFilePassword = "*", Pkcs11DriverPath = "*", HsmSlot = "*", UseNssMode = "*", KeyUssage_CRLSign = "*", KeyUssage_DataEncipherment = "*", KeyUssage_DecipherOnly = "*", KeyUssage_DigitalSignature = "*", KeyUssage_EncipherOnly = "*", KeyUssage_KeyAgreement = "*", KeyUssage_KeyCertSign = "*", KeyUssage_KeyEncipherment = "*", KeyUssage_NonRepudiation = "*", CRLAddress = "*", OCSPAddress = "*", CertificatePolices = "*", QualifiedCertificate = "*", QualifiedPrivKeyDevice = "*", EtsiQctEseal = "*", Logger = "*",}
	const enum GCertificateTypes { ExtendedKeyUsage = "Gordic.Security.Service.GCertificateExtendedKeyUsage", PrivateKey = "string", PublicKey = "string", RawData = "string", X509Cert = "any", IsAssigned = "boolean", IcaRemoteSeal = "boolean", MonetPlusRemoteSign = "boolean", DksRemoteSign = "boolean", SubjectOrganisation = "string", IssuerOrganisation = "string", SubjectOrganisationUnit = "string", IssuerOrganisationUnit = "string", SubjectLocality = "string", IssuerLocality = "string", SubjectCountryCode = "string", IssuerCountryCode = "string", SubjectEMail = "string", IssuerEMail = "string", SubjectDnsName = "string", IssuerDnsName = "string", SubjectSimpleName = "string", IssuerSimpleName = "string", Archived = "boolean", FriendlyName = "string", HasPrivateKey = "boolean", Issuer = "string", SubjectKeyIdentifier = "string", IssuerSerialNumber = "string", AuthorityKeyID = "string", IssuerCertificateUrl = "string", RevokedFrom = "JsonDate", RevocationReason = "string", NotAfter = "JsonDate", ValidFrom = "Date", ValidTo = "Date", NotBefore = "JsonDate", SerialNumber = "string", SignatureAlgorithm = "string", Subject = "string", SubjAlternName = "string", SubjAlternNameRFC822 = "string", Thumbprint = "string", CriptoServiceProviderName = "string", Version = "number", SelfSigned = "boolean", SigningCert = "boolean", Signing = "boolean", CanSign = "boolean", AccessType = "Gordic.General.ApplicationInterface.GCertStoreStorageAccessType", StoreId = "Gordic.General.ApplicationInterface.GCertStoreIdEnum", LoadedFromFile = "boolean", Sourcefile = "string", SourceFilePassword = "string", Pkcs11DriverPath = "string", HsmSlot = "string", UseNssMode = "boolean", KeyUssage_CRLSign = "boolean", KeyUssage_DataEncipherment = "boolean", KeyUssage_DecipherOnly = "boolean", KeyUssage_DigitalSignature = "boolean", KeyUssage_EncipherOnly = "boolean", KeyUssage_KeyAgreement = "boolean", KeyUssage_KeyCertSign = "boolean", KeyUssage_KeyEncipherment = "boolean", KeyUssage_NonRepudiation = "boolean", CRLAddress = "string[]", OCSPAddress = "string[]", CertificatePolices = "string[]", QualifiedCertificate = "boolean", QualifiedPrivKeyDevice = "boolean", EtsiQctEseal = "boolean", Logger = "any",}
	const enum GCertificateTypeLengths {}
}
declare namespace Gordic.Security.Service.GCertificate {
	/**Certificate custom extension class*/
	interface CustomExtension {
		/**oid*/
		oid?: string|null;
		/**value*/
		value?: string|null;
	}
	const enum CustomExtensionNames { oid = "oid", value = "value",}
	const enum CustomExtensionFragments { oid = "*", value = "*",}
	const enum CustomExtensionTypes { oid = "string", value = "string",}
	const enum CustomExtensionTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\Gordic.Security.Service.GCertStore.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     uloziste certifikatu a dalsi podpora - jako nacitani ze souboru atd.
	*     
	*/
	interface GCertStore extends Gordic.Security.Service.GSBBObject {
		/**
		*     Allow download issuer certificate
		*     
		*/
		AllowDownloadIssuerCert?: boolean|null;
		/**
		*     Proxy
		*     
		*/
		Proxy?: any|null;
		/**
		*     Cache certificates of Windows certificate storage
		*     
		*/
		UseCachedCertificates?: boolean|null;
		/**
		*     PKCS#11 storage configuration
		*     
		*/
		Pkcs11StorageConfig?: Gordic.Security.Service.GPkcs11StorageConfiguration|null;
	}
	const enum GCertStoreNames { AllowDownloadIssuerCert = "AllowDownloadIssuerCert", Proxy = "Proxy", UseCachedCertificates = "UseCachedCertificates", Pkcs11StorageConfig = "Pkcs11StorageConfig", Logger = "Logger",}
	const enum GCertStoreFragments { AllowDownloadIssuerCert = "*", Proxy = "*", UseCachedCertificates = "*", Pkcs11StorageConfig = "*", Logger = "*",}
	const enum GCertStoreTypes { AllowDownloadIssuerCert = "boolean", Proxy = "any", UseCachedCertificates = "boolean", Pkcs11StorageConfig = "Gordic.Security.Service.GPkcs11StorageConfiguration", Logger = "any",}
	const enum GCertStoreTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertificatesAndStore\GPkcs11StorageConfiguration.d.ts 

declare namespace Gordic.Security.Service {
	/**PKCS#11 cert storage configuration*/
	interface GPkcs11StorageConfiguration {
		/**Driver DLL path*/
		DriverDllPath?: string|null;
		/**Slot index*/
		SlotIndex?: number|null;
		/**PIN*/
		PIN?: string|null;
		/**Use NSS mode. NSS PKCS#11 driver is slightly incompatible with the original PKCS#11 specification*/
		UseNSSMode?: boolean|null;
	}
	const enum GPkcs11StorageConfigurationNames { DriverDllPath = "DriverDllPath", SlotIndex = "SlotIndex", PIN = "PIN", UseNSSMode = "UseNSSMode",}
	const enum GPkcs11StorageConfigurationFragments { DriverDllPath = "*", SlotIndex = "*", PIN = "*", UseNSSMode = "*",}
	const enum GPkcs11StorageConfigurationTypes { DriverDllPath = "string", SlotIndex = "number", PIN = "string", UseNSSMode = "boolean",}
	const enum GPkcs11StorageConfigurationTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\CertValidator\SignatureVerifyPluginType.d.ts 

declare namespace Gordic.Security.Service {
	/**Signature verify plugin (wflcopl)*/
	const enum SignatureVerifyPluginType {
		/**Gordic - GINIS (ELDOS - Secure BlackBox)*/
		Gordic_Ginis_SBB=1,
		/**I.CA - QVerify*/
		ICA_QVerify=2,
		/**Gordic - GINIS (eIdentity - WS)*/
		Gordic_Ginis_eIdentityWS=3,
		/**Gordic - GINIS (Software 602 - WS)*/
		Gordic_Ginis_S602WS=4,
		/**Software 602 - SecuSign*/
		S602_SecuSign=5,
		/**Gordic - GINIS (DKS - WS)*/
		Gordic_Ginis_DKS=6,
		/**Digital Signature Service*/
		DSS=7,
		/**NCA QVerify*/
		NCA_QVerify=8,
		/**Sefira Obelisk*/
		SefiraObelisk=9,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\Dto\GSignMinimumConfig.d.ts 

declare namespace Gordic.Security.Service {
	/**Minimální konfigurace pro podepsaní*/
	interface GSignMinimumConfig {
		/**Typ podpisu*/
		signatureType?: Gordic.Security.Service.SignatureType|null;
		/**Příznak, že se jedná o podpis na serveru pomocí pečetě nebo el.značky*/
		signWithServerCert?: boolean|null;
		/**Příznak, zda se jedná o podpis s časovým razítkem*/
		signWithTimeStamp?: boolean;
		/**Cesta k podepisovanému souboru*/
		filePath?: string|null;
		/**Otisk certifikátu*/
		thumbprint?: string;
		/**Název souboru*/
		fileName?: string|null;
		/**Příznak, zda se má provést uložení při podepsání*/
		saveOnClient?: boolean;
		/**Certifikační rětěz*/
		certChain?: Gordic.Security.Service.GCertificateChain|null;
		/**Příznak, zda zobrazit dialog pro zadani pinu*/
		showPswdDlg?: boolean|null;
		/**Promenna z dialogu pro dodatecne zabezpeceni*/
		otherPswd?: string|null;
		/**Informace o certifikatu*/
		certMoreInfo?: Gordic.Security.Service.GCertificateInfoDTO|null;
		/**Bude fikce podpisu?*/
		isFiction?: boolean|null;
	}
	const enum GSignMinimumConfigNames { signatureType = "signatureType", signWithServerCert = "signWithServerCert", signWithTimeStamp = "signWithTimeStamp", filePath = "filePath", thumbprint = "thumbprint", fileName = "fileName", saveOnClient = "saveOnClient", certChain = "certChain", showPswdDlg = "showPswdDlg", otherPswd = "otherPswd", certMoreInfo = "certMoreInfo", isFiction = "isFiction",}
	const enum GSignMinimumConfigFragments { signatureType = "*", signWithServerCert = "*", signWithTimeStamp = "*", filePath = "*", thumbprint = "*", fileName = "*", saveOnClient = "*", certChain = "*", showPswdDlg = "*", otherPswd = "*", certMoreInfo = "*", isFiction = "*",}
	const enum GSignMinimumConfigTypes { signatureType = "Gordic.Security.Service.SignatureType", signWithServerCert = "boolean", signWithTimeStamp = "boolean", filePath = "string", thumbprint = "string", fileName = "string", saveOnClient = "boolean", certChain = "Gordic.Security.Service.GCertificateChain", showPswdDlg = "boolean", otherPswd = "string", certMoreInfo = "Gordic.Security.Service.GCertificateInfoDTO", isFiction = "boolean",}
	const enum GSignMinimumConfigTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\PDF\Gordic.Security.Service.GAIBConnection.d.ts 

declare namespace Gordic.Security.Service {
	/**AIBConnection*/
	interface GAIBConnection {
		/**url*/
		AIBUrl?: string|null;
		/**user*/
		AIBUser?: string|null;
		/**proxy*/
		Proxy?: Gordic.Security.Service.GHTTPProxy|null;
	}
	const enum GAIBConnectionNames { AIBUrl = "AIBUrl", AIBUser = "AIBUser", Proxy = "Proxy",}
	const enum GAIBConnectionFragments { AIBUrl = "*", AIBUser = "*", Proxy = "*",}
	const enum GAIBConnectionTypes { AIBUrl = "string", AIBUser = "string", Proxy = "Gordic.Security.Service.GHTTPProxy",}
	const enum GAIBConnectionTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\PDF\VisualSign\Gordic.Security.Service.GPdfVisualSignConfig.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     konfigurace visualniho podpisu
	*     
	*/
	interface GPdfVisualSignConfig {
		SIGNATURE_RGB_DATA?: string|null;
		SIGNATURE_RGB_DATA_OLD?: string|null;
		/**
		*     Default horizontal offset
		*     
		*/
		readonly DefaultHorizontalOffset?: number|null;
		/**
		*     Default vertical offset
		*     
		*/
		readonly DefaultVerticalOffset?: number|null;
		/**
		*     Signature positions
		*     If defined, none of the other position properties are used
		*     
		*/
		SignaturePositions?: Gordic.Security.Service.GPdfVisualSignPositionDto[]|null;
		/**
		*     umisteni v rohu stranky
		*     
		*/
		PositionOnPageCorner?: Gordic.Security.Service.GPdfVisualSignConfig.PageCornerEnum|null;
		/**
		*     Dalši podpis po prvnim se posouva smerem
		*     
		*/
		ShiftNextSgnTo?: Gordic.Security.Service.GPdfVisualSignConfig.ShiftNextSgnToEnum|null;
		/**
		*     viditelnost na vsech strankach
		*     
		*/
		VisibleOnAllPages?: boolean|null;
		/**
		*     horizontalni posun
		*     
		*/
		HorizontalOffset?: number|null;
		/**
		*     vertikalni posun
		*     
		*/
		VerticalOffset?: number|null;
		/**
		*     horizontalni posun nasledujiciho podpisu
		*     
		*/
		NextSgnHorizontalShift?: number|null;
		/**
		*     vertikalni posun nasledujiciho podpisu
		*     
		*/
		NextSgnVerticalShift?: number|null;
		/**
		*     Vraci true pokud je pouzit implicitni obrazek
		*     
		*/
		readonly DefaultPic?: boolean|null;
		/**
		*     obsah obrazku ve formátu RGB - jedna buňka je R nebo G nebo B - sousledně za sebou
		*     
		*/
		PictureContent?: string|null;
		/**
		*     Pocet obrazku na radek, pokud se naplni, pouzije dalsi radek
		*     
		*/
		PicturesPerLine?: number|null;
		/**
		*     Vlozit podpis na posledni stranku
		*     
		*/
		PutSignToLastPage?: boolean|null;
		/**
		*     Adresar s fontem pro visualni podpisy, Pokud je null nebo empty, vraci GIN
		*     
		*/
		FontFolder?: string|null;
		/**
		*     Prazdne pozadi bez obrazku
		*     
		*/
		EmptyBackground?: boolean|null;
		/**
		*     Loaded image's width
		*     
		*/
		LoadedImageWidth?: number|null;
		/**
		*     Loaded image's height
		*     
		*/
		LoadedImageHeight?: number|null;
		/**
		*     Image width
		*     
		*/
		ImageWidth?: number|null;
		/**
		*     Image width
		*     
		*/
		ImageHeight?: number|null;
		/**
		*     jmeno souboru s obrazkem
		*     
		*/
		readonly PictureFileName?: string|null;
		/**
		*     Barva textu RGB od "0.0.0" do "255.255.255"
		*     
		*/
		TextColor?: string|null;
		/**
		*     Barva textu ve formatu pro pdf
		*     
		*/
		readonly GetPFGTextColor?: string|null;
	}
	const enum GPdfVisualSignConfigNames { SIGNATURE_RGB_DATA = "SIGNATURE_RGB_DATA", SIGNATURE_RGB_DATA_OLD = "SIGNATURE_RGB_DATA_OLD", DefaultHorizontalOffset = "DefaultHorizontalOffset", DefaultVerticalOffset = "DefaultVerticalOffset", SignaturePositions = "SignaturePositions", PositionOnPageCorner = "PositionOnPageCorner", ShiftNextSgnTo = "ShiftNextSgnTo", VisibleOnAllPages = "VisibleOnAllPages", HorizontalOffset = "HorizontalOffset", VerticalOffset = "VerticalOffset", NextSgnHorizontalShift = "NextSgnHorizontalShift", NextSgnVerticalShift = "NextSgnVerticalShift", DefaultPic = "DefaultPic", PictureContent = "PictureContent", PicturesPerLine = "PicturesPerLine", PutSignToLastPage = "PutSignToLastPage", FontFolder = "FontFolder", EmptyBackground = "EmptyBackground", LoadedImageWidth = "LoadedImageWidth", LoadedImageHeight = "LoadedImageHeight", ImageWidth = "ImageWidth", ImageHeight = "ImageHeight", PictureFileName = "PictureFileName", TextColor = "TextColor", GetPFGTextColor = "GetPFGTextColor",}
	const enum GPdfVisualSignConfigFragments { SIGNATURE_RGB_DATA = "*", SIGNATURE_RGB_DATA_OLD = "*", DefaultHorizontalOffset = "*", DefaultVerticalOffset = "*", SignaturePositions = "*", PositionOnPageCorner = "*", ShiftNextSgnTo = "*", VisibleOnAllPages = "*", HorizontalOffset = "*", VerticalOffset = "*", NextSgnHorizontalShift = "*", NextSgnVerticalShift = "*", DefaultPic = "*", PictureContent = "*", PicturesPerLine = "*", PutSignToLastPage = "*", FontFolder = "*", EmptyBackground = "*", LoadedImageWidth = "*", LoadedImageHeight = "*", ImageWidth = "*", ImageHeight = "*", PictureFileName = "*", TextColor = "*", GetPFGTextColor = "*",}
	const enum GPdfVisualSignConfigTypes { SIGNATURE_RGB_DATA = "string", SIGNATURE_RGB_DATA_OLD = "string", DefaultHorizontalOffset = "number", DefaultVerticalOffset = "number", SignaturePositions = "Gordic.Security.Service.GPdfVisualSignPositionDto[]", PositionOnPageCorner = "Gordic.Security.Service.GPdfVisualSignConfig.PageCornerEnum", ShiftNextSgnTo = "Gordic.Security.Service.GPdfVisualSignConfig.ShiftNextSgnToEnum", VisibleOnAllPages = "boolean", HorizontalOffset = "number", VerticalOffset = "number", NextSgnHorizontalShift = "number", NextSgnVerticalShift = "number", DefaultPic = "boolean", PictureContent = "string", PicturesPerLine = "number", PutSignToLastPage = "boolean", FontFolder = "string", EmptyBackground = "boolean", LoadedImageWidth = "number", LoadedImageHeight = "number", ImageWidth = "number", ImageHeight = "number", PictureFileName = "string", TextColor = "string", GetPFGTextColor = "string",}
	const enum GPdfVisualSignConfigTypeLengths {}
}
declare namespace Gordic.Security.Service.GPdfVisualSignConfig {
	/**
	*     roh stranky
	*     
	*/
	const enum PageCornerEnum {
		/**
		*     Left top corner
		*     
		*/
		LeftTop,
		/**
		*     Right top corner
		*     
		*/
		RightTop,
		/**
		*     Left bottom corner
		*     
		*/
		LeftBottom,
		/**
		*     Right bottom corner
		*     
		*/
		RightBottom,
	}
	/**
	*     Dalši podpis po prvnim se posouva smerem :
	*     
	*/
	const enum ShiftNextSgnToEnum {
		/**
		*     Prepsat puvodni
		*     
		*/
		CoverOriginal,
		/**
		*     Shift Horizontal
		*     
		*/
		Horizontal,
		/**
		*     Shift Vertical
		*     
		*/
		Vertical,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\PDF\VisualSign\Gordic.Security.Service.GVisualSgnText.d.ts 

declare namespace Gordic.Security.Service {
	interface GVisualSgnTextLine {
		sText?: string|null;
		X?: number|null;
		Y?: number|null;
		FontSize?: number|null;
	}
	const enum GVisualSgnTextLineNames { sText = "sText", X = "X", Y = "Y", FontSize = "FontSize",}
	const enum GVisualSgnTextLineFragments { sText = "*", X = "*", Y = "*", FontSize = "*",}
	const enum GVisualSgnTextLineTypes { sText = "string", X = "number", Y = "number", FontSize = "number",}
	const enum GVisualSgnTextLineTypeLengths {}
	interface GVisualSgnText {
		/**Custom text lines*/
		CustomTextLines?: Gordic.Security.Service.GVisualSgnTextLine[]|null;
		ElSignatureCaption?: string|null;
		ElSignatureValue?: string|null;
		SignerTitle?: string|null;
		SubjectCaption?: string|null;
		SubjectValue?: string|null;
		IssuerCaption?: string|null;
		IssuerValue?: string|null;
		NotAfter?: string|null;
		NotAfterStr?: string|null;
		CustomLine01?: string|null;
		CustomLine02?: string|null;
		CustomLine03?: string|null;
		CustomLine04?: string|null;
		CustomLine05?: string|null;
		IsCustom?: boolean|null;
		readonly CustomLinesCount?: number|null;
	}
	const enum GVisualSgnTextNames { CustomTextLines = "CustomTextLines", ElSignatureCaption = "ElSignatureCaption", ElSignatureValue = "ElSignatureValue", SignerTitle = "SignerTitle", SubjectCaption = "SubjectCaption", SubjectValue = "SubjectValue", IssuerCaption = "IssuerCaption", IssuerValue = "IssuerValue", NotAfter = "NotAfter", NotAfterStr = "NotAfterStr", CustomLine01 = "CustomLine01", CustomLine02 = "CustomLine02", CustomLine03 = "CustomLine03", CustomLine04 = "CustomLine04", CustomLine05 = "CustomLine05", IsCustom = "IsCustom", CustomLinesCount = "CustomLinesCount",}
	const enum GVisualSgnTextFragments { CustomTextLines = "*", ElSignatureCaption = "*", ElSignatureValue = "*", SignerTitle = "*", SubjectCaption = "*", SubjectValue = "*", IssuerCaption = "*", IssuerValue = "*", NotAfter = "*", NotAfterStr = "*", CustomLine01 = "*", CustomLine02 = "*", CustomLine03 = "*", CustomLine04 = "*", CustomLine05 = "*", IsCustom = "*", CustomLinesCount = "*",}
	const enum GVisualSgnTextTypes { CustomTextLines = "Gordic.Security.Service.GVisualSgnTextLine[]", ElSignatureCaption = "string", ElSignatureValue = "string", SignerTitle = "string", SubjectCaption = "string", SubjectValue = "string", IssuerCaption = "string", IssuerValue = "string", NotAfter = "string", NotAfterStr = "string", CustomLine01 = "string", CustomLine02 = "string", CustomLine03 = "string", CustomLine04 = "string", CustomLine05 = "string", IsCustom = "boolean", CustomLinesCount = "number",}
	const enum GVisualSgnTextTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\PDF\VisualSign\GPdfVisualSignPosition.d.ts 

declare namespace Gordic.Security.Service {
	/**PDF visual sign position*/
	interface GPdfVisualSignPositionDto {
		/**Position from left page border*/
		X?: number|null;
		/**Position from bottom page border*/
		Y?: number|null;
		/**Width*/
		Width?: number|null;
		/**Height*/
		Height?: number|null;
		/**Page number where the signature is displayed*/
		PageIndex?: number|null;
		/**Page height*/
		PageHeight?: number|null;
		/**Page width*/
		PageWidth?: number|null;
		/**Rotate in degrees*/
		Rotate?: number|null;
		/**ID - used to store ID of saved position (e.g. in DB...)*/
		ID?: string|null;
	}
	const enum GPdfVisualSignPositionDtoNames { X = "X", Y = "Y", Width = "Width", Height = "Height", PageIndex = "PageIndex", PageHeight = "PageHeight", PageWidth = "PageWidth", Rotate = "Rotate", ID = "ID",}
	const enum GPdfVisualSignPositionDtoFragments { X = "*", Y = "*", Width = "*", Height = "*", PageIndex = "*", PageHeight = "*", PageWidth = "*", Rotate = "*", ID = "*",}
	const enum GPdfVisualSignPositionDtoTypes { X = "number", Y = "number", Width = "number", Height = "number", PageIndex = "number", PageHeight = "number", PageWidth = "number", Rotate = "number", ID = "string",}
	const enum GPdfVisualSignPositionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\Signature\GSgnWebServiceType.d.ts 

declare namespace Gordic.Security.Service {
	/**Remote sign webservice type*/
	const enum GSgnWebserviceType {
		/**GTS01*/
		Gts01=0,
		/**ICA RemoteSeal*/
		Ica_RemoteSeal=1,
		/**Monet+*/
		Monet_RemoteSeal=2,
		/**GSignerWcfService*/
		GSignerWcfService=3,
		/**DKS*/
		DKS=4,
		/**S602 SecuSign*/
		S602_SecuSign=5,
		/**CESYP*/
		Cesyp=6,
		/**ICA RemoteSeal*/
		Ica_RemoteSeal_v2=7,
		/**UPVS - Ústredný portál verejnej správy*/
		UPVS=8,
		/**RemSig od CESNET*/
		RemSig=9,
		/**S602 SecuSign .NET API*/
		S602_SecuSign_NET=10,
		/**Sefira Obelisk*/
		Obelisk=11,
		/**Cloud Signature Consortium API*/
		CSC=12,
	}
	/**Certificate's origin*/
	const enum GCertificateOrigin {
		/**Monet+*/
		Monet_RemoteSeal,
		/**S602 SecuSign*/
		S602_SecuSign,
		/**CESYP*/
		Cesyp,
		/**ICA RemoteSeal*/
		Ica_RemoteSeal_v2,
		/**ICA Rest eSeal*/
		Ica_Rest_ESeal,
		/**RemSig od CESNET*/
		RemSig_Seal,
		/**RemSig od CESNET*/
		RemSig_Personal,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\Signature\GSignatureAttempt.d.ts 

declare namespace Gordic.Security.Service {
	/**Signature attempt log item*/
	interface GSignatureAttemptLogItem {
		/**Note*/
		Note?: string|null;
		/**Signature attempt status*/
		Status?: Gordic.Security.Service.GSignatureAttemptStatus|null;
		/**Type*/
		Type?: Gordic.Security.Service.GSignatureAttemptType|null;
	}
	const enum GSignatureAttemptLogItemNames { Note = "Note", Status = "Status", Type = "Type",}
	const enum GSignatureAttemptLogItemFragments { Note = "*", Status = "*", Type = "*",}
	const enum GSignatureAttemptLogItemTypes { Note = "string", Status = "Gordic.Security.Service.GSignatureAttemptStatus", Type = "Gordic.Security.Service.GSignatureAttemptType",}
	const enum GSignatureAttemptLogItemTypeLengths {}
	/**Signature attempt status*/
	const enum GSignatureAttemptStatus {
		/**OK*/
		OK=1,
		/**Failed*/
		Failed=0,
	}
	/**Signature attempt status*/
	const enum GSignatureAttemptType {
		/**Timestamp*/
		Timestamp=0,
		/**I.CA RemoteSeal*/
		IcaRemoteSeal=1,
		/**CESYP*/
		CesypSeal=2,
		/**CESNET RemSig*/
		RemSigSeal=3,
		/**CESNET RemSig*/
		ObeliskSeal=4,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\Signature\GSignaturePolicy.d.ts 

declare namespace Gordic.Security.Service {
	/**Signature policy definition*/
	interface GSignaturePolicy {
		/**OID (Object identifier). If filled, it's used as main policy identifier (e.g. in XAdES).
		*     If not filled, Url will be used as identifier
		*/
		OID?: string|null;
		/**Url where the policy can be downloaded*/
		Url?: string|null;
		/**Data*/
		Data?: Uint8Array|null;
		/**Policy description*/
		Description?: string|null;
		/**Identifier*/
		readonly Identifier?: string|null;
		/**Documentation references*/
		DocumentationReferences?: string[]|null;
	}
	const enum GSignaturePolicyNames { OID = "OID", Url = "Url", Data = "Data", Description = "Description", Identifier = "Identifier", DocumentationReferences = "DocumentationReferences",}
	const enum GSignaturePolicyFragments { OID = "*", Url = "*", Data = "*", Description = "*", Identifier = "*", DocumentationReferences = "*",}
	const enum GSignaturePolicyTypes { OID = "string", Url = "string", Data = "Uint8Array", Description = "string", Identifier = "string", DocumentationReferences = "string[]",}
	const enum GSignaturePolicyTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\Signature\SignatureTypeEnum.d.ts 

declare namespace Gordic.Security.Service {
	/**Signature type*/
	const enum SignatureType {
		/**Simple PDF signature*/
		PDF_Simple,
		/**PDF signature as currently specified in ISO 32000-1. The corresponding PAdES Basic profile is specified in TS 102 778-2.*/
		PAdES_Basic,
		/**PDF advanced signature based upon CAdES-BES as specified in TS 101733 with the option of a signature time-stamp (CAdES-T)*/
		PAdES_Enhanced,
		/**PAdES Document timestamp*/
		PAdES_Timestamp,
		/**CAdES*/
		CAdES,
		/**CAdES Document timestamp*/
		CAdES_Timestamp,
		/**XAdES XML signature*/
		XAdES,
		/**XAdES Document timestamp*/
		XAdES_Timestamp,
		/**ASiC (Associated signature container) with CAdES*/
		ASiC_CAdES,
		/**ASiC (Associated signature container) with XAdES*/
		ASiC_XAdES,
		/**ASiC Document timestamp*/
		ASiC_Timestamp,
		/**XML simple signature*/
		XML_Simple,
		/**External signature (P7S)*/
		P7S,
		/**External timestamp*/
		TST,
		/**EML signature*/
		EML,
		/**Timestamp associated to signature*/
		AssociatedTimestamp,
		/**Unknown signature type*/
		Unknown,
		/**Unspecified document timestamp. If set, timestamp will be specific for different types of files (PDF, P7M, TST...)*/
		DocumentTimestamp,
		/**Authenticode signing for DLL, EXE, MSI*/
		Authenticode,
		/**Strongname signing for DLL, EXE*/
		Strongname,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\SigningServices\CESNET\RemSig\GRemSigConfiguration.d.ts 

declare namespace Gordic.Security.Service {
	/**RemSig configuration*/
	interface GRemSigConfiguration {
		/**Send whole file to RemSig*/
		SendWholeFile?: boolean|null;
		/**Url*/
		Url?: string|null;
		/**Login*/
		Login?: string|null;
		/**Working directory where returned file will be saved*/
		WorkingDirectory?: string|null;
		/**Base url for redirection of PIN enter result*/
		RedirectBaseUrl?: string|null;
		/**Seal user*/
		SealUser?: string|null;
		/**Timeout in miliseconds*/
		TimeoutMs?: number|null;
		/**Cached seal certificate refresh rate in miliseconds*/
		CachedSealCertificateRefreshRateMs?: number|null;
	}
	const enum GRemSigConfigurationNames { SendWholeFile = "SendWholeFile", Url = "Url", Login = "Login", WorkingDirectory = "WorkingDirectory", RedirectBaseUrl = "RedirectBaseUrl", SealUser = "SealUser", TimeoutMs = "TimeoutMs", CachedSealCertificateRefreshRateMs = "CachedSealCertificateRefreshRateMs",}
	const enum GRemSigConfigurationFragments { SendWholeFile = "*", Url = "*", Login = "*", WorkingDirectory = "*", RedirectBaseUrl = "*", SealUser = "*", TimeoutMs = "*", CachedSealCertificateRefreshRateMs = "*",}
	const enum GRemSigConfigurationTypes { SendWholeFile = "boolean", Url = "string", Login = "string", WorkingDirectory = "string", RedirectBaseUrl = "string", SealUser = "string", TimeoutMs = "number", CachedSealCertificateRefreshRateMs = "number",}
	const enum GRemSigConfigurationTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\SigningServices\CESYP\GCesypConfiguration.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     CESYP configuration
	*     
	*/
	interface GCesypConfiguration {
		/**
		*     Synchronous
		*     
		*/
		Synchronous?: boolean|null;
		/**
		*     Send whole file to CESYP
		*     
		*/
		SendWholeFile?: boolean|null;
		/**
		*     Url
		*     
		*/
		Url?: string|null;
		/**
		*     identifikace integrovaného systému. Konstanta, kterou integrovaný systém obdrží od technické podpory integrační vrstvy v okamžiku nastavení směrování pro zpětná volání.
		*     
		*/
		SystemId?: string|null;
		/**
		*     API klíč, který slouží k ověření integrovaného systému vůči API Management vrstvě. Získává se evidencí integrovaného systému v Developer Portálu MHMP.
		*     
		*/
		XIbmClientId?: string|null;
		/**
		*     uživatelské jméno uživatele, který je zaveden v systému CESYP
		*     
		*/
		UserLogin?: string|null;
		/**
		*     heslo uživatele podepsané jeho privátním klíčem. Jedná se o heslo uživatele zavedeného v systému CESYP
		*     
		*/
		HashedPassword?: string|null;
		/**
		*     Working directory where returned file will be saved
		*     
		*/
		WorkingDirectory?: string|null;
		/**
		*     Gets or sets the maximum time, in milliseconds, to wait for PDF validation to complete.
		*     
		*/
		PdfValidationTimeoutMs?: number|null;
		/**
		*     Operation ID
		*     
		*/
		OperationId?: string|null;
	}
	const enum GCesypConfigurationNames { Synchronous = "Synchronous", SendWholeFile = "SendWholeFile", Url = "Url", SystemId = "SystemId", XIbmClientId = "XIbmClientId", UserLogin = "UserLogin", HashedPassword = "HashedPassword", WorkingDirectory = "WorkingDirectory", PdfValidationTimeoutMs = "PdfValidationTimeoutMs", OperationId = "OperationId",}
	const enum GCesypConfigurationFragments { Synchronous = "*", SendWholeFile = "*", Url = "*", SystemId = "*", XIbmClientId = "*", UserLogin = "*", HashedPassword = "*", WorkingDirectory = "*", PdfValidationTimeoutMs = "*", OperationId = "*",}
	const enum GCesypConfigurationTypes { Synchronous = "boolean", SendWholeFile = "boolean", Url = "string", SystemId = "string", XIbmClientId = "string", UserLogin = "string", HashedPassword = "string", WorkingDirectory = "string", PdfValidationTimeoutMs = "number", OperationId = "string",}
	const enum GCesypConfigurationTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\SigningServices\CSC\GCscApiConfiguration.d.ts 

declare namespace Gordic.Security.Service {
	/**Represents the configuration settings for interacting with the Cloud Signature Consortium API.*/
	interface GCscApiConfiguration {
		/**Api Url*/
		BaseUrl?: string|null;
		/**Working directory*/
		WorkingDirectory?: string|null;
		/**System ID (Client ID)*/
		SystemId?: string|null;
		/**Timeout in milliseconds*/
		TimeoutMs?: number|null;
		/**Gets or sets the URI to be used as a callback for the operation.*/
		CallbackUrl?: string|null;
		/**Gets or sets the URI used to get the authorization code obtained from OAuth server*/
		AuthorizationCodeServiceUrl?: string|null;
		/**Gets or sets the user identifier associated with the seal operation.*/
		SealUser?: string|null;
	}
	const enum GCscApiConfigurationNames { BaseUrl = "BaseUrl", WorkingDirectory = "WorkingDirectory", SystemId = "SystemId", TimeoutMs = "TimeoutMs", CallbackUrl = "CallbackUrl", AuthorizationCodeServiceUrl = "AuthorizationCodeServiceUrl", SealUser = "SealUser",}
	const enum GCscApiConfigurationFragments { BaseUrl = "*", WorkingDirectory = "*", SystemId = "*", TimeoutMs = "*", CallbackUrl = "*", AuthorizationCodeServiceUrl = "*", SealUser = "*",}
	const enum GCscApiConfigurationTypes { BaseUrl = "string", WorkingDirectory = "string", SystemId = "string", TimeoutMs = "number", CallbackUrl = "string", AuthorizationCodeServiceUrl = "string", SealUser = "string",}
	const enum GCscApiConfigurationTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\SigningServices\Obelisk\GObeliskConfiguration.d.ts 

declare namespace Gordic.Security.Service {
	/**Obelisk configuration*/
	interface GObeliskConfiguration {
		/**Send whole file to RemSig*/
		SendWholeFile?: boolean|null;
		/**Url*/
		Url?: string|null;
		/**Login*/
		Login?: string|null;
		/**Thumbprint of a certifice used for authentication*/
		AuthCertThumbprint?: string|null;
		/**Timeout in miliseconds*/
		TimeoutMs?: number|null;
		/**Verification policy*/
		Policy?: string|null;
	}
	const enum GObeliskConfigurationNames { SendWholeFile = "SendWholeFile", Url = "Url", Login = "Login", AuthCertThumbprint = "AuthCertThumbprint", TimeoutMs = "TimeoutMs", Policy = "Policy",}
	const enum GObeliskConfigurationFragments { SendWholeFile = "*", Url = "*", Login = "*", AuthCertThumbprint = "*", TimeoutMs = "*", Policy = "*",}
	const enum GObeliskConfigurationTypes { SendWholeFile = "boolean", Url = "string", Login = "string", AuthCertThumbprint = "string", TimeoutMs = "number", Policy = "string",}
	const enum GObeliskConfigurationTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\SigningServices\S602\GSecuSignConfiguration.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     SecuSign configuration
	*     
	*/
	interface GSecuSignConfiguration {
		/**
		*     License (database)
		*     
		*/
		License?: string|null;
		/**
		*     ID (ICO)
		*     
		*/
		Id?: string|null;
		/**
		*     License file path
		*     
		*/
		LicenseFilePath?: string|null;
		/**
		*     License file name
		*     
		*/
		LicenseFileName?: string|null;
		/**
		*     License file data
		*     
		*/
		LicenseFile?: any[]|null;
		/**
		*     License file secret's key
		*     
		*/
		LicenseFileSecretKey?: string|null;
		/**
		*     Installation directoy
		*     
		*/
		InstallDirectory?: string|null;
		/**
		*     Is test environment
		*     
		*/
		IsTestEnvironment?: boolean|null;
		/**
		*     Trust user id
		*     
		*/
		TrustUserId?: boolean|null;
		/**
		*     Seal enabled
		*     
		*/
		SealEnabled?: boolean|null;
		/**
		*     Allow seal without client user id
		*     
		*/
		AllowSealWithoutClientUserId?: boolean|null;
		/**
		*     List seal separately
		*     
		*/
		ListSealSeparately?: boolean|null;
		/**
		*     Seal user
		*     
		*/
		SealUser?: string|null;
		/**
		*     User for signature verifying
		*     
		*/
		SignVerifyUser?: string|null;
		/**
		*     Log path
		*     
		*/
		LogPath?: string|null;
		/**
		*     License file password - if stored in a serializable class can be serialized
		*     
		*/
		LicenseFilePassword?: Gordic.General.GSecureString|null;
	}
	const enum GSecuSignConfigurationNames { License = "License", Id = "Id", LicenseFilePath = "LicenseFilePath", LicenseFileName = "LicenseFileName", LicenseFile = "LicenseFile", LicenseFileSecretKey = "LicenseFileSecretKey", InstallDirectory = "InstallDirectory", IsTestEnvironment = "IsTestEnvironment", TrustUserId = "TrustUserId", SealEnabled = "SealEnabled", AllowSealWithoutClientUserId = "AllowSealWithoutClientUserId", ListSealSeparately = "ListSealSeparately", SealUser = "SealUser", SignVerifyUser = "SignVerifyUser", LogPath = "LogPath", LicenseFilePassword = "LicenseFilePassword",}
	const enum GSecuSignConfigurationFragments { License = "*", Id = "*", LicenseFilePath = "*", LicenseFileName = "*", LicenseFile = "*", LicenseFileSecretKey = "*", InstallDirectory = "*", IsTestEnvironment = "*", TrustUserId = "*", SealEnabled = "*", AllowSealWithoutClientUserId = "*", ListSealSeparately = "*", SealUser = "*", SignVerifyUser = "*", LogPath = "*", LicenseFilePassword = "*",}
	const enum GSecuSignConfigurationTypes { License = "string", Id = "string", LicenseFilePath = "string", LicenseFileName = "string", LicenseFile = "any[]", LicenseFileSecretKey = "string", InstallDirectory = "string", IsTestEnvironment = "boolean", TrustUserId = "boolean", SealEnabled = "boolean", AllowSealWithoutClientUserId = "boolean", ListSealSeparately = "boolean", SealUser = "string", SignVerifyUser = "string", LogPath = "string", LicenseFilePassword = "Gordic.General.GSecureString",}
	const enum GSecuSignConfigurationTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\TimeStamp\Gordic.Security.Service.GTimeStampInfo.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     Informace o časovém razítku (slouží pro konfiguraci vytváření a ke čtení informací o TS)
	*     
	*/
	interface GTimeStampInfo extends Gordic.Security.Service.GSBBObject {
		/**
		*     Timeout in ms 
		*     
		*/
		TimeoutMs?: number|null;
		/**
		*     Filename
		*     
		*/
		Filename?: string|null;
		/**
		*     Adresa TS serveru
		*     
		*/
		URL?: string|null;
		/**
		*     HTTP protocol version for communication with the server 
		*     
		*     hvHTTP10 = 0,
		*     hvHTTP11 = 1
		*     
		*     
		*/
		HttpVersion?: number|null;
		/**
		*     Alternative TS server URL
		*     
		*/
		AlternativeURL?: string|null;
		/**
		*     Jméno pro autorizaci
		*     
		*/
		AuthorizeUserName?: string|null;
		/**
		*     Certifikát pro autorizaci
		*     
		*/
		AuthorizeCertificate?: Gordic.Security.Service.GCertificate|null;
		/**
		*     Authorize Certificate Thumbprint
		*     
		*/
		AuthorizeCertificateThumbprint?: string|null;
		/**
		*     store acess - certifikatu pro napojeni
		*     
		*/
		AuthorizeCerStorageAccess?: Gordic.General.ApplicationInterface.GCertStoreStorageAccessType|null;
		/**
		*     id certifikatu pro napojeni
		*     
		*/
		AuthorizeCerStoreId?: Gordic.General.ApplicationInterface.GCertStoreIdEnum|null;
		/**
		*     Proxi pro napojení na TS server
		*     
		*/
		HTTPProxy?: Gordic.Security.Service.GHTTPProxy|null;
		/**
		*     Use AIB
		*     
		*/
		UseAIB?: boolean|null;
		/**
		*     Use SSL/TLS
		*     
		*/
		UseTls?: boolean|null;
		/**
		*     AIB_URL
		*     
		*/
		AIB_URL?: string|null;
		/**
		*     AIB_UserName
		*     
		*/
		AIB_UserName?: string|null;
		/**
		*     Metoda autorizace (nebo výroby) TS
		*     
		*/
		CTsMethos?: Gordic.Security.Service.GTimeStampInfo.CreateTsMethos|null;
		/**
		*     Typ kontrolního součtu
		*     
		*/
		HashAlg?: Gordic.General.ApplicationInterface.GHashAlgEnum|null;
		/**
		*     Metoda výroby je nastavena proti TS serveru, nikoli ze zdrojových dat
		*     
		*/
		readonly PreparedForOnlineTS?: boolean|null;
		/**
		*     Čas z razítka v UTC
		*     
		*/
		readonly TimeUTC?: JsonDate|null;
		/**
		*     DNS jméno ts serveru
		*     
		*/
		readonly TSA_DNSName?: string|null;
		/**
		*     IP adresa TS serveru
		*     
		*/
		readonly TSA_IPAddress?: string|null;
		/**
		*     ID TS serveru
		*     
		*/
		readonly TSA_RegisteredID?: string|null;
		/**
		*     EMail 
		*     
		*/
		readonly TSA_EMail?: string|null;
		/**
		*     URI 
		*     
		*/
		readonly TSA_URI?: string|null;
		/**
		*     Delegat na vyrobu TS externi metodou
		*     
		*/
		readonly GetTS?: any|null;
		/**
		*     Stav ověření
		*     
		*/
		readonly VerifStatus?: Gordic.Security.Service.GTimeStampInfo.VerifyTSStatusEnum|null;
		/**
		*     Číslo chyby 
		*     
		*/
		readonly VerifyStatusNum?: number|null;
		/**
		*     Text chyby
		*     
		*/
		readonly VerifyStatusText?: string|null;
		/**
		*     Sada certifikátů z razítka
		*     
		*/
		readonly Certificates?: Gordic.Security.Service.GCertificate[]|null;
		/**
		*     Otisk který byl podepsán
		*     
		*/
		readonly MessageImprint?: string|null;
		/**
		*     Vyřazení chyby BadNonce
		*     
		*/
		IgnoreBadNonce?: boolean|null;
	}
	const enum GTimeStampInfoNames { TimeoutMs = "TimeoutMs", Filename = "Filename", URL = "URL", HttpVersion = "HttpVersion", AlternativeURL = "AlternativeURL", AuthorizeUserName = "AuthorizeUserName", AuthorizeCertificate = "AuthorizeCertificate", AuthorizeCertificateThumbprint = "AuthorizeCertificateThumbprint", AuthorizeCerStorageAccess = "AuthorizeCerStorageAccess", AuthorizeCerStoreId = "AuthorizeCerStoreId", HTTPProxy = "HTTPProxy", UseAIB = "UseAIB", UseTls = "UseTls", AIB_URL = "AIB_URL", AIB_UserName = "AIB_UserName", CTsMethos = "CTsMethos", HashAlg = "HashAlg", PreparedForOnlineTS = "PreparedForOnlineTS", TimeUTC = "TimeUTC", TSA_DNSName = "TSA_DNSName", TSA_IPAddress = "TSA_IPAddress", TSA_RegisteredID = "TSA_RegisteredID", TSA_EMail = "TSA_EMail", TSA_URI = "TSA_URI", GetTS = "GetTS", VerifStatus = "VerifStatus", VerifyStatusNum = "VerifyStatusNum", VerifyStatusText = "VerifyStatusText", Certificates = "Certificates", MessageImprint = "MessageImprint", IgnoreBadNonce = "IgnoreBadNonce", Logger = "Logger",}
	const enum GTimeStampInfoFragments { TimeoutMs = "*", Filename = "*", URL = "*", HttpVersion = "*", AlternativeURL = "*", AuthorizeUserName = "*", AuthorizeCertificate = "*", AuthorizeCertificateThumbprint = "*", AuthorizeCerStorageAccess = "*", AuthorizeCerStoreId = "*", HTTPProxy = "*", UseAIB = "*", UseTls = "*", AIB_URL = "*", AIB_UserName = "*", CTsMethos = "*", HashAlg = "*", PreparedForOnlineTS = "*", TimeUTC = "*", TSA_DNSName = "*", TSA_IPAddress = "*", TSA_RegisteredID = "*", TSA_EMail = "*", TSA_URI = "*", GetTS = "*", VerifStatus = "*", VerifyStatusNum = "*", VerifyStatusText = "*", Certificates = "*", MessageImprint = "*", IgnoreBadNonce = "*", Logger = "*",}
	const enum GTimeStampInfoTypes { TimeoutMs = "number", Filename = "string", URL = "string", HttpVersion = "number", AlternativeURL = "string", AuthorizeUserName = "string", AuthorizeCertificate = "Gordic.Security.Service.GCertificate", AuthorizeCertificateThumbprint = "string", AuthorizeCerStorageAccess = "Gordic.General.ApplicationInterface.GCertStoreStorageAccessType", AuthorizeCerStoreId = "Gordic.General.ApplicationInterface.GCertStoreIdEnum", HTTPProxy = "Gordic.Security.Service.GHTTPProxy", UseAIB = "boolean", UseTls = "boolean", AIB_URL = "string", AIB_UserName = "string", CTsMethos = "Gordic.Security.Service.GTimeStampInfo.CreateTsMethos", HashAlg = "Gordic.General.ApplicationInterface.GHashAlgEnum", PreparedForOnlineTS = "boolean", TimeUTC = "JsonDate", TSA_DNSName = "string", TSA_IPAddress = "string", TSA_RegisteredID = "string", TSA_EMail = "string", TSA_URI = "string", GetTS = "any", VerifStatus = "Gordic.Security.Service.GTimeStampInfo.VerifyTSStatusEnum", VerifyStatusNum = "number", VerifyStatusText = "string", Certificates = "Gordic.Security.Service.GCertificate[]", MessageImprint = "string", IgnoreBadNonce = "boolean", Logger = "any",}
	const enum GTimeStampInfoTypeLengths {}
}
declare namespace Gordic.Security.Service.GTimeStampInfo {
	/**
	*     Metoda vytváření TS
	*     
	*/
	const enum CreateTsMethos {
		/**
		*     Nenastaveno
		*     
		*/
		NotSet,
		/**
		*     Připojit k TS serveru bez autorizace
		*     
		*/
		TAUnautorised,
		/**
		*     Připojit k TS serveru jménem a heslem
		*     
		*/
		TAUseName,
		/**
		*     Připojit k TS serveru certifikátem
		*     
		*/
		TAUseCertificate,
		/**
		*     Připojit k TS serveru certifikátem který je v jiném úložišti
		*     
		*/
		TAUseCertificateFromLocation,
		/**
		*     Vytvožit TS pomoci externi obsluhy
		*     
		*/
		CreateTSExternal,
	}
	/**
	*     Stav ověření TS
	*     
	*/
	const enum VerifyTSStatusEnum {
		/**
		*     Nenastaveno
		*     
		*/
		NotSet,
		/**
		*     Ověřeno
		*     
		*/
		Verified,
		/**
		*     Chyba při parsování CMS zprávy
		*     
		*/
		Parse_CMS_SError,
		/**
		*     Chybný podpis
		*     
		*/
		Invalid_Imprint,
		/**
		*     Vyjímka
		*     
		*/
		Exception_Raised,
		/**
		*     Invalid signature
		*     
		*/
		InvalidSignature,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\XML\GXmlSignature.d.ts 

declare namespace Gordic.Security.Service {
	/**
	*     support class for namespaces info.
	*     
	*/
	interface GNSDef {
		/**
		*     prefix NS
		*     
		*/
		readonly Prefix?: string|null;
		/**
		*     URI - NS
		*     
		*/
		readonly URI?: string|null;
	}
	const enum GNSDefNames { Prefix = "Prefix", URI = "URI",}
	const enum GNSDefFragments { Prefix = "*", URI = "*",}
	const enum GNSDefTypes { Prefix = "string", URI = "string",}
	const enum GNSDefTypeLengths {}
	/**
	*     support class for finding xml node (class contain xpath and namespaces ) 
	*     
	*/
	interface GXmlRef {
		/**
		*     definice namespace
		*     
		*/
		readonly NSDef?: Gordic.Security.Service.GNSDef[]|null;
		/**
		*     xpath
		*     
		*/
		XPath?: string|null;
	}
	const enum GXmlRefNames { NSDef = "NSDef", XPath = "XPath",}
	const enum GXmlRefFragments { NSDef = "*", XPath = "*",}
	const enum GXmlRefTypes { NSDef = "Gordic.Security.Service.GNSDef[]", XPath = "string",}
	const enum GXmlRefTypeLengths {}
	/**
	*     Podpis xml
	*     
	*/
	interface GXmlSignature extends Gordic.Security.Service.GSBBObject {
	}
	const enum GXmlSignatureNames { Logger = "Logger",}
	const enum GXmlSignatureFragments { Logger = "*",}
	const enum GXmlSignatureTypes { Logger = "any",}
	const enum GXmlSignatureTypeLengths {}
}
declare namespace Gordic.Security.Service.GXmlSignature {
	/**
	*     Kanonizacni metoda
	*     
	*/
	const enum CanonMethodEnum {
		/**
		*     No canonicalization
		*     
		*/
		None=0,
		/**
		*     Canonicalization without comments 
		*     
		*/
		Canon=1,
		/**
		*     Canonicalization with comments 
		*     
		*/
		CanonComment=2,
		/**
		*     Exclusive canonicalization 
		*     
		*/
		ExclCanon=3,
		/**
		*     Exclusive canonicalization 
		*     
		*/
		ExclCanonComment=4,
		/**
		*     Minimal canonicalization 
		*     
		*/
		MinCanon=5,
		/**
		*     602 workaround for signing a SIP
		*     
		*/
		Sip_602_Workaround=602,
	}
	/**
	*     Metoda el. podpisu
	*     
	*/
	const enum SignatureMethodEnum {
		/**
		*     DSS
		*     
		*/
		DSS=0,
		/**
		*     RSA_MD5
		*     
		*/
		RSA_MD5=1,
		/**
		*     RSA_SHA1
		*     
		*/
		RSA_SHA1=2,
		/**
		*     RSA_SHA256
		*     
		*/
		RSA_SHA256=3,
		/**
		*     RSA_SHA384
		*     
		*/
		RSA_SHA384=4,
		/**
		*     RSA_SHA512
		*     
		*/
		RSA_SHA512=5,
		/**
		*     RSA_RIPEMD160
		*     
		*/
		RSA_RIPEMD160=6,
	}
	/**
	*     Typ podpisu
	*     
	*/
	const enum SignatureTypeEnum {
		/**
		*     The signature is detached (XML node with signature is not attached to original data) 
		*      
		*/
		Detached=1,
		/**
		*     Enveloping signature is used. The signature is over content found within an Object element of the signature itself. The Object (or its content) is identified via a Reference (via a URI fragment identifier or transform).
		*     
		*/
		Enveloping=2,
		/**
		*     Enveloped signature is used. The signature is over the XML content that contains the signature as an element. The content provides the root XML document element.
		*      
		*/
		Enveloped=4,
	}
	/**
	*     Digest Method
	*     
	*/
	const enum DigestMethodEnum {
		/**
		*     MD5
		*     
		*/
		MD5=0,
		/**
		*     SHA1
		*     
		*/
		SHA1=1,
		/**
		*     SHA224
		*     
		*/
		SHA224=2,
		/**
		*     SHA256
		*     
		*/
		SHA256=3,
		/**
		*     SHA384
		*     
		*/
		SHA384=4,
		/**
		*     SHA512
		*     
		*/
		SHA512=5,
		/**
		*     RIPEMD
		*     
		*/
		RIPEMD=6,
	}
	interface XmlVerifyResult {
		IsValid?: boolean|null;
		Certificates?: Gordic.Security.Service.GCertificate[]|null;
		SignatureMethod?: Gordic.Security.Service.GSecServiceCommon.XmlSignMethodEnum|null;
	}
	const enum XmlVerifyResultNames { IsValid = "IsValid", Certificates = "Certificates", SignatureMethod = "SignatureMethod",}
	const enum XmlVerifyResultFragments { IsValid = "*", Certificates = "*", SignatureMethod = "*",}
	const enum XmlVerifyResultTypes { IsValid = "boolean", Certificates = "Gordic.Security.Service.GCertificate[]", SignatureMethod = "Gordic.Security.Service.GSecServiceCommon.XmlSignMethodEnum",}
	const enum XmlVerifyResultTypeLengths {}
	/**
	*     ref T34218
	*     
	*/
	interface GRzpSupport {
	}
	const enum GRzpSupportNames {}
	const enum GRzpSupportFragments {}
	const enum GRzpSupportTypes {}
	const enum GRzpSupportTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Security.Service\XML\GXmlSignProperties.d.ts 

declare namespace Gordic.Security.Service {
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

