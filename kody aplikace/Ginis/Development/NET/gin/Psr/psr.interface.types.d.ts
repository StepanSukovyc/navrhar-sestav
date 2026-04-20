/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       psr.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Psr.Interface\Gordic.Psr.Interface.csproj
*    created     2026-02-16 14:33:45
*    files       Base\GPsrWsTypEnum.d.ts
*                Base\GwflcfskEnum.d.ts
*                Dto\GMailboxGinsmbxDto.d.ts
*                Dto\Datasety\GSKDatasetyUpvsESluzbyDto.d.ts
*                Dto\Ruzne\GPsrRuzneMaleDto.d.ts
*                EForm\IGPsrEFormTransform.d.ts
*                Utils\GPsrEnums.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Psr.Interface\Base\GPsrWsTypEnum.d.ts 

declare namespace Gordic.Psr.Interface {
    /**Enum UPVS web službeb*/
	const enum GPsrWsTypEnum {
        /**edesk schránky*/
		Neurceno=0,
        /**sts service pro získání tokenu*/
		STSService=1,
        /**edesk schránky*/
		EKSService=2,
        /**eformy*/
		EFormService=3,
        /**idnentity service*/
		IdentityService=4,
        /**Asynchroní servisa*/
		G2GService=5,
        /**Podatelna*/
		CepService=6,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psr.Interface\Base\GwflcfskEnum.d.ts 

declare namespace Gordic.Psr.Interface {
    /**Enum UPVS pro přiřazení vlastnosti formuláře*/
	const enum GwflcfskEnum {
        /**nebude se ukazovat v nabídce ke tvorbě formuláře*/
		Cizi=0,
        /**ukáže se ve výběru ke tvorbě formuláře*/
		Vlastni=10,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psr.Interface\Dto\GMailboxGinsmbxDto.d.ts 

declare namespace Gordic.Psr.Interface {
	/**DBTABLE:ginsmbx*/
	interface GMailboxGinsmbxDto {
		/**DBCOLUMN:ginsmbx.mailbox*/
		mailbox?: string|null;
		/**DBCOLUMN:ginsmbx.ixs_cer*/
		ixs_cer?: string|null;
		/**DBCOLUMN:ginsmbx.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:wflscer.otisk*/
		otisk?: string|null;
		/**The priz main*/
		priz_main?: number|null;
	}
	const enum GMailboxGinsmbxDtoNames { mailbox = "mailbox", ixs_cer = "ixs_cer", ixs_su = "ixs_su", otisk = "otisk", priz_main = "priz_main",}
	const enum GMailboxGinsmbxDtoFragments { mailbox = "*", ixs_cer = "*", ixs_su = "*", otisk = "*", priz_main = "*",}
	const enum GMailboxGinsmbxDtoTypes { mailbox = "string", ixs_cer = "string", ixs_su = "string", otisk = "string", priz_main = "number",}
	const enum GMailboxGinsmbxDtoTypeLengths { mailbox = 100, ixs_cer = 12, ixs_su = 12,}
	/**DBTABLE:ginsmbx*/
	interface GPsrGinspodDto {
		/**generated*/
		ixs_su?: string|null;
		/**generated*/
		ixs_nad?: string|null;
	}
	const enum GPsrGinspodDtoNames { ixs_su = "ixs_su", ixs_nad = "ixs_nad",}
	const enum GPsrGinspodDtoFragments { ixs_su = "*", ixs_nad = "*",}
	const enum GPsrGinspodDtoTypes { ixs_su = "string", ixs_nad = "string",}
	const enum GPsrGinspodDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psr.Interface\Dto\Datasety\GSKDatasetyUpvsESluzbyDto.d.ts 

declare namespace Gordic.Psr.Interface {
	/**Dto pro volání GSKDatasetyUpvsESluzbyDtoy*/
	interface GSKDatasetyUpvsESluzbyZoznamFormularovDto {
		_id?: number|null;
		IdServiceInstance?: number|null;
		ExternalCode?: string|null;
		MetaISCode?: string|null;
		ServiceName?: string|null;
		ExtId?: string|null;
		InstitutionName?: string|null;
		ValidFrom?: JsonDate|null;
		ValidTo?: JsonDate|null;
		ServiceUrl?: string|null;
		ServiceInfoURL?: string|null;
		FormURL?: string|null;
	}
	const enum GSKDatasetyUpvsESluzbyZoznamFormularovDtoNames { _id = "_id", IdServiceInstance = "IdServiceInstance", ExternalCode = "ExternalCode", MetaISCode = "MetaISCode", ServiceName = "ServiceName", ExtId = "ExtId", InstitutionName = "InstitutionName", ValidFrom = "ValidFrom", ValidTo = "ValidTo", ServiceUrl = "ServiceUrl", ServiceInfoURL = "ServiceInfoURL", FormURL = "FormURL",}
	const enum GSKDatasetyUpvsESluzbyZoznamFormularovDtoFragments { _id = "*", IdServiceInstance = "*", ExternalCode = "*", MetaISCode = "*", ServiceName = "*", ExtId = "*", InstitutionName = "*", ValidFrom = "*", ValidTo = "*", ServiceUrl = "*", ServiceInfoURL = "*", FormURL = "*",}
	const enum GSKDatasetyUpvsESluzbyZoznamFormularovDtoTypes { _id = "number", IdServiceInstance = "number", ExternalCode = "string", MetaISCode = "string", ServiceName = "string", ExtId = "string", InstitutionName = "string", ValidFrom = "JsonDate", ValidTo = "JsonDate", ServiceUrl = "string", ServiceInfoURL = "string", FormURL = "string",}
	const enum GSKDatasetyUpvsESluzbyZoznamFormularovDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psr.Interface\Dto\Ruzne\GPsrRuzneMaleDto.d.ts 

declare namespace Gordic.Psr.Interface {
	/**Dto pro request volání funkce GetFormRow*/
	interface GetFormRowRequestDto {
		/**Nutné zadat bud tento parametr který se následně rozparsuje do do pospID a pospVersion nebo přímo pospID nebo PospVersion*/
		Xmlns?: string|null;
		/**Id formuláře nutné zadat vždy s pospVersion*/
		PospID?: string|null;
		/**verze formuláře nutné zadat vždy s pospID*/
		PospVersion?: string|null;
		/**Klíč pokud je zadán klíč funkce vyhledá přímo v db ale nic nezakládá když nenajde*/
		ixs_fsk?: string|null;
		/**Zdsa se má stahovat a zalozit pokud není*/
		StahovatPokudNeni?: boolean|null;
		/**Kontrola zda jsou dotazene vsechny pomocne soubory pro generování formuláře*/
		KontrolaZdaJsouStazeneVsechnySoubory?: boolean|null;
	}
	const enum GetFormRowRequestDtoNames { Xmlns = "Xmlns", PospID = "PospID", PospVersion = "PospVersion", ixs_fsk = "ixs_fsk", StahovatPokudNeni = "StahovatPokudNeni", KontrolaZdaJsouStazeneVsechnySoubory = "KontrolaZdaJsouStazeneVsechnySoubory",}
	const enum GetFormRowRequestDtoFragments { Xmlns = "*", PospID = "*", PospVersion = "*", ixs_fsk = "*", StahovatPokudNeni = "*", KontrolaZdaJsouStazeneVsechnySoubory = "*",}
	const enum GetFormRowRequestDtoTypes { Xmlns = "string", PospID = "string", PospVersion = "string", ixs_fsk = "string", StahovatPokudNeni = "boolean", KontrolaZdaJsouStazeneVsechnySoubory = "boolean",}
	const enum GetFormRowRequestDtoTypeLengths {}
	/**Dto pro request volání funkce PsrEFoemTransform*/
	interface PsrEFoemTransformRequest {
		/**Id formuláře nutné zadat vždy s pospVersion*/
		PospID?: string|null;
		/**verze formuláře nutné zadat vždy s pospID*/
		PospVersion?: string|null;
		/**pid formuláře*/
		Ixs_fsk?: string|null;
		/**Gets or sets the XML data base64.*/
		XmlDataBase64?: string|null;
		/**Enum, typu formuláře který chceme vytvořit*/
		TypeOfEform?: Gordic.Psr.Interface.CreateEfromEnumType|null;
	}
	const enum PsrEFoemTransformRequestNames { PospID = "PospID", PospVersion = "PospVersion", Ixs_fsk = "Ixs_fsk", XmlDataBase64 = "XmlDataBase64", TypeOfEform = "TypeOfEform",}
	const enum PsrEFoemTransformRequestFragments { PospID = "*", PospVersion = "*", Ixs_fsk = "*", XmlDataBase64 = "*", TypeOfEform = "*",}
	const enum PsrEFoemTransformRequestTypes { PospID = "string", PospVersion = "string", Ixs_fsk = "string", XmlDataBase64 = "string", TypeOfEform = "Gordic.Psr.Interface.CreateEfromEnumType",}
	const enum PsrEFoemTransformRequestTypeLengths {}
	/**Enum pro SK zprávy*/
	const enum CreateEfromEnumType {
		/**Pouhy html přehled hodnot*/
		SimpleHtml=0,
		/**Editovatelný formulář*/
		Editable=10,
		/**Needitovatelný formulář*/
		NonEditable=20,
		/**Vytvořit PDf*/
		PdfForm=30,
	}
	/**Dto pro request volání funkce PsrEFoemTransform*/
	interface PsrEFoemTransformResponse {
		/**Gets or sets HTML string*/
		HtmlString?: string|null;
		/**Gets or sets the XML data base64.*/
		Base64Data?: string|null;
		/**Gets or sets the XML data byte[].*/
		Data?: any[]|null;
	}
	const enum PsrEFoemTransformResponseNames { HtmlString = "HtmlString", Base64Data = "Base64Data", Data = "Data",}
	const enum PsrEFoemTransformResponseFragments { HtmlString = "*", Base64Data = "*", Data = "*",}
	const enum PsrEFoemTransformResponseTypes { HtmlString = "string", Base64Data = "string", Data = "any[]",}
	const enum PsrEFoemTransformResponseTypeLengths {}
	/**Dto pro volání rozparsování zprávy*/
	interface SKParseMessageReq {
		/**Cesta K souboru*/
		Filename?: string|null;
		/**Obsah souboru*/
		Documentcontent?: any[]|null;
		/**Obsah souboru*/
		ReturnDocumentcontent?: boolean|null;
	}
	const enum SKParseMessageReqNames { Filename = "Filename", Documentcontent = "Documentcontent", ReturnDocumentcontent = "ReturnDocumentcontent",}
	const enum SKParseMessageReqFragments { Filename = "*", Documentcontent = "*", ReturnDocumentcontent = "*",}
	const enum SKParseMessageReqTypes { Filename = "string", Documentcontent = "any[]", ReturnDocumentcontent = "boolean",}
	const enum SKParseMessageReqTypeLengths {}
	/**Dto pro response rozparsování zprávy*/
	interface SKParseMessageRes {
		/**Gets or sets the XML data base64.*/
		Message?: any|null;
		/**Obsah souboru*/
		Documentcontent?: any[]|null;
		/**ErrorText*/
		ErrorText?: string|null;
		/**SKTalkMessage*/
		SKTalkMessage?: any|null;
	}
	const enum SKParseMessageResNames { Message = "Message", Documentcontent = "Documentcontent", ErrorText = "ErrorText", SKTalkMessage = "SKTalkMessage",}
	const enum SKParseMessageResFragments { Message = "*", Documentcontent = "*", ErrorText = "*", SKTalkMessage = "*",}
	const enum SKParseMessageResTypes { Message = "any", Documentcontent = "any[]", ErrorText = "string", SKTalkMessage = "any",}
	const enum SKParseMessageResTypeLengths {}
	/**Enum pro SK zprávy*/
	const enum SKMessageClassEnum {
		/**Podanie*/
		EGOV_APPLICATION=100,
		/**Rozhodnutie*/
		EGOV_DOCUMENT=110,
		/**Doručenka*/
		ED_DELIVERY_REPORT=120,
		/**Notifikácia*/
		EGOV_NOTIFICATION=130,
		/**Chyba*/
		ERROR=140,
		/**Informace*/
		INFORMATION=150,
	}
	/**Parsování sender info z SKTALK*/
	interface ParseSenderInfoDto {
		/**ActorID*/
		ActorID?: string|null;
		/**Actor_FormattedName*/
		Actor_FormattedName?: string|null;
		/**ActorIDSector*/
		ActorIDSector?: string|null;
		/**Actor_IdentityType*/
		Actor_IdentityType?: string|null;
		/**SubjectID*/
		SubjectID?: string|null;
		/**SubjectIDSector*/
		SubjectIDSector?: string|null;
		/**Subject_FormattedName*/
		Subject_FormattedName?: string|null;
		/**Subject_IdentityType*/
		Subject_IdentityType?: string|null;
	}
	const enum ParseSenderInfoDtoNames { ActorID = "ActorID", Actor_FormattedName = "Actor_FormattedName", ActorIDSector = "ActorIDSector", Actor_IdentityType = "Actor_IdentityType", SubjectID = "SubjectID", SubjectIDSector = "SubjectIDSector", Subject_FormattedName = "Subject_FormattedName", Subject_IdentityType = "Subject_IdentityType",}
	const enum ParseSenderInfoDtoFragments { ActorID = "*", Actor_FormattedName = "*", ActorIDSector = "*", Actor_IdentityType = "*", SubjectID = "*", SubjectIDSector = "*", Subject_FormattedName = "*", Subject_IdentityType = "*",}
	const enum ParseSenderInfoDtoTypes { ActorID = "string", Actor_FormattedName = "string", ActorIDSector = "string", Actor_IdentityType = "string", SubjectID = "string", SubjectIDSector = "string", Subject_FormattedName = "string", Subject_IdentityType = "string",}
	const enum ParseSenderInfoDtoTypeLengths {}
	/**Parsování sender info z SKTALK*/
	interface SkEFormMetadaConf {
		/**Zda vubec mel metadata configurační soubor*/
		HasMetadataConf?: boolean|null;
		/**Mapping*/
		Mapping?: Gordic.Psr.Interface.SkEFormMetadaConf_Mapping|null;
	}
	const enum SkEFormMetadaConfNames { HasMetadataConf = "HasMetadataConf", Mapping = "Mapping",}
	const enum SkEFormMetadaConfFragments { HasMetadataConf = "*", Mapping = "*",}
	const enum SkEFormMetadaConfTypes { HasMetadataConf = "boolean", Mapping = "Gordic.Psr.Interface.SkEFormMetadaConf_Mapping",}
	const enum SkEFormMetadaConfTypeLengths {}
	/**Enum pro SK zprávy*/
	const enum SkEFormMetadaConf_Mapping {
		/**Basic*/
		Basic=0,
		/**Dictionary*/
		Dictionary=10,
	}
	/**Parsování sender info z SKTALK*/
	interface GSKDatasetyUpvsESluzbyResponse {
		/**List s Vysledky*/
		ListSvysledky?: Gordic.Psr.Interface.GSKDatasetyUpvsESluzbyZoznamFormularovDto[]|null;
		/**List s Vysledky*/
		ResultKontrolyZdaPodpurujeDanyTypFormulare?: boolean|null;
	}
	const enum GSKDatasetyUpvsESluzbyResponseNames { ListSvysledky = "ListSvysledky", ResultKontrolyZdaPodpurujeDanyTypFormulare = "ResultKontrolyZdaPodpurujeDanyTypFormulare",}
	const enum GSKDatasetyUpvsESluzbyResponseFragments { ListSvysledky = "*", ResultKontrolyZdaPodpurujeDanyTypFormulare = "*",}
	const enum GSKDatasetyUpvsESluzbyResponseTypes { ListSvysledky = "Gordic.Psr.Interface.GSKDatasetyUpvsESluzbyZoznamFormularovDto[]", ResultKontrolyZdaPodpurujeDanyTypFormulare = "boolean",}
	const enum GSKDatasetyUpvsESluzbyResponseTypeLengths {}
	/**Parsování sender info z SKTALK*/
	interface ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDto {
		/**data*/
		data?: any|null;
		/**nazev souboru*/
		fileName?: string|null;
		/**Lze Editovat*/
		lzeEditovat?: boolean|null;
		/**Zda v obrazu je ASICE*/
		isAsicForm?: boolean|null;
		/**ChybovaHlaska*/
		chybovaHlaska?: string|null;
		/**Jednotlive Soubory*/
		nalezeneFormulare?: Gordic.Psr.Interface.ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDataDto[]|null;
	}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDtoNames { data = "data", fileName = "fileName", lzeEditovat = "lzeEditovat", isAsicForm = "isAsicForm", chybovaHlaska = "chybovaHlaska", nalezeneFormulare = "nalezeneFormulare",}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDtoFragments { data = "*", fileName = "*", lzeEditovat = "*", isAsicForm = "*", chybovaHlaska = "*", nalezeneFormulare = "*",}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDtoTypes { data = "any", fileName = "string", lzeEditovat = "boolean", isAsicForm = "boolean", chybovaHlaska = "string", nalezeneFormulare = "Gordic.Psr.Interface.ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDataDto[]",}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDtoTypeLengths {}
	/**Parsování sender info z SKTALK*/
	interface ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDataDto {
		/**fileDataBase64*/
		fileDataBase64?: string|null;
		/**ChybovaHlaska*/
		fileName?: string|null;
		/**ChybovaHlaska*/
		id?: string|null;
		/**UPVSFormInfo*/
		UPVSFormInfo?: any|null;
	}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDataDtoNames { fileDataBase64 = "fileDataBase64", fileName = "fileName", id = "id", UPVSFormInfo = "UPVSFormInfo",}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDataDtoFragments { fileDataBase64 = "*", fileName = "*", id = "*", UPVSFormInfo = "*",}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDataDtoTypes { fileDataBase64 = "string", fileName = "string", id = "string", UPVSFormInfo = "any",}
	const enum ZjistiZPoleBytuZdaJeVNichFormularNeboAsicSFormularemDataDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psr.Interface\EForm\IGPsrEFormTransform.d.ts 

declare namespace Gordic.Isl {
    /**konverze eFormuláře Sk*/
	abstract class PsrEFormTransform extends ServiceBase {
        /**Vytvoří editovatelný Eform*/
		public static createEForm(rq?:Gordic.Psr.Interface.PsrEFoemTransformRequest|CallParams<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>>): _Task<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>,GServiceReadResponse<Gordic.Psr.Interface.PsrEFoemTransformResponse>>;
        /**Vytvoří editovatelný Eform*/
		public static createEditableEform(rq?:Gordic.Psr.Interface.PsrEFoemTransformRequest|CallParams<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>>): _Task<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>,GServiceReadResponse<Gordic.Psr.Interface.PsrEFoemTransformResponse>>;
        /**Vytvoří NeEditovatelný Eform*/
		public static createNoNEditableEform(rq?:Gordic.Psr.Interface.PsrEFoemTransformRequest|CallParams<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>>): _Task<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>,GServiceReadResponse<Gordic.Psr.Interface.PsrEFoemTransformResponse>>;
        /**Vytvoří jednoduchý html formulář jako v edesk Eform*/
		public static createSimpleHtmlEform(rq?:Gordic.Psr.Interface.PsrEFoemTransformRequest|CallParams<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>>): _Task<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>,GServiceReadResponse<Gordic.Psr.Interface.PsrEFoemTransformResponse>>;
        /**vytvoří pdf*/
		public static createPdfEform(rq?:Gordic.Psr.Interface.PsrEFoemTransformRequest|CallParams<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>>): _Task<GServiceReadRequest<Gordic.Psr.Interface.PsrEFoemTransformRequest>,GServiceReadResponse<Gordic.Psr.Interface.PsrEFoemTransformResponse>>;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Psr.Interface\Utils\GPsrEnums.d.ts 

declare namespace Gordic.Psr.Interface {
	/**Výsledek ověření eDesk schránky.*/
	const enum GVysledekOvereniEDeskSchrankyEnum {
		/**Ověření schránky neprovedeno.*/
		None=0,
		/**Id schránky není validní.*/
		Invalid,
		/**nenalezena*/
		Nenalezena,
		/**více záznamů*/
		ViceZaznamu,
		/**Elektronická schránka je vytvorená*/
		CREATED,
		/**Elektronická schránka je aktívna*/
		ACTIVE,
		/**Elektronická schránka je aktivovaná na doručovanie*/
		DELIVERABLE,
		/**Elektronická schránka neexistuje.*/
		NONEXISTENT,
		/**Elektronická schránka nie je aktivovaná na doručovanie*/
		DISABLED,
		/**Elektronická schránka je zrušená (vymazaná)*/
		DELETED,
	}
}

//#endregion

