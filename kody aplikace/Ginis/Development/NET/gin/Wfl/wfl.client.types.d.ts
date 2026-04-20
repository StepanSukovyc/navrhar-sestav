/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       wfl.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Wfl.Client\Gordic.Wfl.Client.csproj
*    created     2026-02-16 14:33:46
*    files       wfl.fields.d.ts
*                Base\Gordic.Wfl.Client.GWflClientTsCommon.d.ts
*                Prilohy\GSignPreConfigDto.d.ts
*                Seznamy\GWflListsDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Wfl.Client\wfl.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL
    * keys : ["mailbox"]
    * columns: ["mailbox", "ixs_su", "nazev"]
    * filters: ["mailbox","typ_mbx"]
    */
    class GinsmbxField extends Base<Gordic.Wfl.Interface.GGinsmbxFieldDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["ixs_hpz"]
    * columns: ["ixs_hpz","nazev","popis","kod_stand_zak","kod_dopln_slu","k_s","aktivita","dat_zmena","zmenu_prov"]
    * filters: ["ixs_hpz","nazev","popis","kod_stand_zak","kod_dopln_slu","k_s","aktivita","dat_zmena","zmenu_prov"]
    */
    class Wflshpz extends Base<Gordic.Wfl.Interface.GWflshpzDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["komb_sluzeb"]
    * columns: ["komb_sluzeb","komb_sluzeb_txt","zkratka","nazev","aktivita","dat_zmena","zmenu_prov","filtr_format"]
    * filters: ["komb_sluzeb","komb_sluzeb_txt","zkratka","nazev","aktivita","dat_zmena","zmenu_prov","filtr_format"]
    */
    class Wflsksl extends Base<Gordic.Wfl.Interface.GWflskslDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Klíčová slova
    * keys : ["kl_slovo"]
    * columns: ["kl_slovo","edit","pocet_zmenu_prov"]
    * filters: ["aktivita","typ_ag","ixp","ixs_su","kl_slovo","aktivita_wflitag"]
    */
    class WflKlicSlova extends Base<Gordic.Wfl.Interface.GWflKlicSlovoDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}, {mailbox}"
    * helperColumns: ["nazev", "mailbox"]
    *
    * DataReader 
    * keys: ["mailbox"]
    * columns: ["mailbox", "ixs_su", "nazev"]
    * filters: ["mailbox","typ_mbx"]
    */
    function ginsmbxField(prefabOptions?: Gordic.Data.Selectors.UserSelectorOptions & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Wfl.Interface.GGinsmbxFieldDto>): GSelectBoxOptions<Gordic.Wfl.Interface.GGinsmbxFieldDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixs_hpz"]
    * columns: ["ixs_hpz","nazev","popis","kod_stand_zak","kod_dopln_slu","k_s","aktivita","dat_zmena","zmenu_prov"]
    * filters: ["ixs_hpz","nazev","popis","kod_stand_zak","kod_dopln_slu","k_s","aktivita","dat_zmena","zmenu_prov"]
    */
    function wflshpz(prefabOptions?: Gordic.Data.Selectors.UserSelectorOptions & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Wfl.Interface.GWflshpzDto>): GSelectBoxOptions<Gordic.Wfl.Interface.GWflshpzDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{zkratka} - {nazev}"
    * helperColumns: ["komb_sluzeb_txt", "zkratka", "nazev"]
    *
    * DataReader 
    * keys: ["komb_sluzeb"]
    * columns: ["komb_sluzeb","komb_sluzeb_txt","zkratka","nazev","aktivita","dat_zmena","zmenu_prov","filtr_format"]
    * filters: ["komb_sluzeb","komb_sluzeb_txt","zkratka","nazev","aktivita","dat_zmena","zmenu_prov","filtr_format"]
    */
    function wflsksl(prefabOptions?: Gordic.Data.Selectors.UserSelectorOptions & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Wfl.Interface.GWflskslDto>): GSelectBoxOptions<Gordic.Wfl.Interface.GWflskslDto>;
    /**
    * Klientská část AL - Klíčová slova
    * FieldOptions
    * itemTemplate: "{kl_slovo}"
    * helperColumns: ["kl_slovo"]
    *
    * DataReader 
    * keys: ["kl_slovo"]
    * columns: ["kl_slovo","edit","pocet_zmenu_prov"]
    * filters: ["aktivita","typ_ag","ixp","ixs_su","kl_slovo","aktivita_wflitag"]
    */
    function wflKlicSlova(prefabOptions?: Gordic.Data.Selectors.UserSelectorOptions & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Wfl.Interface.GWflKlicSlovoDto>): GSelectBoxOptions<Gordic.Wfl.Interface.GWflKlicSlovoDto>;}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.Client\Base\Gordic.Wfl.Client.GWflClientTsCommon.d.ts 

declare namespace Gordic.Wfl.Client {
	/**Typ zobrazení detailu obecneho*/
	const enum TypZobrazeniDetailuObecneho {
		/**neurceno*/
		neurceno,
		/**Nový zaznam*/
		New,
		/**Zobrazit detail*/
		View,
		/**Pouze pro zobrazeni*/
		ViewOnly,
		/**Editacni rezim*/
		Edit,
		/**Novy zaznam vznikly kopii*/
		Kopie,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.Client\Prilohy\GSignPreConfigDto.d.ts 

declare namespace Gordic.Wfl.Client {
	/**Dto pro informace o podepisovaném souboru*/
	interface GMinimumSignDto extends Gordic.Security.Service.GSignMinimumConfig {
		/**Podepisovaný soubor*/
		file?: string|null;
		/**Čas podpisu*/
		signTime?: JsonDate|null;
	}
	const enum GMinimumSignDtoNames { file = "file", signTime = "signTime", signatureType = "signatureType", signWithServerCert = "signWithServerCert", signWithTimeStamp = "signWithTimeStamp", filePath = "filePath", thumbprint = "thumbprint", fileName = "fileName", saveOnClient = "saveOnClient", certChain = "certChain", showPswdDlg = "showPswdDlg", otherPswd = "otherPswd", certMoreInfo = "certMoreInfo", isFiction = "isFiction",}
	const enum GMinimumSignDtoFragments { file = "*", signTime = "*", signatureType = "*", signWithServerCert = "*", signWithTimeStamp = "*", filePath = "*", thumbprint = "*", fileName = "*", saveOnClient = "*", certChain = "*", showPswdDlg = "*", otherPswd = "*", certMoreInfo = "*", isFiction = "*",}
	const enum GMinimumSignDtoTypes { file = "string", signTime = "JsonDate", signatureType = "Gordic.Security.Service.SignatureType", signWithServerCert = "boolean", signWithTimeStamp = "boolean", filePath = "string", thumbprint = "string", fileName = "string", saveOnClient = "boolean", certChain = "Gordic.Security.Service.GCertificateChain", showPswdDlg = "boolean", otherPswd = "string", certMoreInfo = "Gordic.Security.Service.GCertificateInfoDTO", isFiction = "boolean",}
	const enum GMinimumSignDtoTypeLengths {}
	interface GSignPreConfigDto extends Gordic.Wfl.Client.GMinimumSignDto {
		/**Příznak aby se nemazal soubor při konfiguraci (razítko, načetlo soubor a po orazítkování ho smazalo. Přidán příznak, protože LoadConfig se volá po konverzi a tam je nutné soubor smazat)*/
		keepFileAfterSign?: boolean;
		/**Důvod podpisu*/
		signingReason?: string;
		/**IxsDpo*/
		idSigningReason?: string;
		/**Typ LTV*/
		typeLTV?: number;
		/**Typ elektronicke prilohy*/
		typeElAttach?: Gordic.Wfl.Interface.TypElpEpxEnum|null;
		/**Příznak, zda se má uložit do uložiště*/
		saveToStorage?: boolean;
		/**Příznak, zda se má použít distribuovaný podpis*/
		distributedSignature?: boolean;
	}
	const enum GSignPreConfigDtoNames { keepFileAfterSign = "keepFileAfterSign", signingReason = "signingReason", idSigningReason = "idSigningReason", typeLTV = "typeLTV", typeElAttach = "typeElAttach", saveToStorage = "saveToStorage", distributedSignature = "distributedSignature", file = "file", signTime = "signTime", signatureType = "signatureType", signWithServerCert = "signWithServerCert", signWithTimeStamp = "signWithTimeStamp", filePath = "filePath", thumbprint = "thumbprint", fileName = "fileName", saveOnClient = "saveOnClient", certChain = "certChain", showPswdDlg = "showPswdDlg", otherPswd = "otherPswd", certMoreInfo = "certMoreInfo", isFiction = "isFiction",}
	const enum GSignPreConfigDtoFragments { keepFileAfterSign = "*", signingReason = "*", idSigningReason = "*", typeLTV = "*", typeElAttach = "*", saveToStorage = "*", distributedSignature = "*", file = "*", signTime = "*", signatureType = "*", signWithServerCert = "*", signWithTimeStamp = "*", filePath = "*", thumbprint = "*", fileName = "*", saveOnClient = "*", certChain = "*", showPswdDlg = "*", otherPswd = "*", certMoreInfo = "*", isFiction = "*",}
	const enum GSignPreConfigDtoTypes { keepFileAfterSign = "boolean", signingReason = "string", idSigningReason = "string", typeLTV = "number", typeElAttach = "Gordic.Wfl.Interface.TypElpEpxEnum", saveToStorage = "boolean", distributedSignature = "boolean", file = "string", signTime = "JsonDate", signatureType = "Gordic.Security.Service.SignatureType", signWithServerCert = "boolean", signWithTimeStamp = "boolean", filePath = "string", thumbprint = "string", fileName = "string", saveOnClient = "boolean", certChain = "Gordic.Security.Service.GCertificateChain", showPswdDlg = "boolean", otherPswd = "string", certMoreInfo = "Gordic.Security.Service.GCertificateInfoDTO", isFiction = "boolean",}
	const enum GSignPreConfigDtoTypeLengths {}
	interface GWflSignPreConfigDto extends Gordic.Wfl.Client.GSignPreConfigDto {
		/**IXP dokumentu*/
		ixp?: string|null;
		/**IXB dokumentu*/
		ixb?: string|null;
		/**Mimetype*/
		mimetype?: string|null;
		/**ObjectIdentifier (například ObjectIdentifier ASice)*/
		objectidentifier?: string|null;
		/**Description (například Descriptionv ASice)*/
		description?: string|null;
		/**Kolekce souboru ktere se predaji k podepsani*/
		otherFilesToSign?: Gordic.Support.Sign.GFileToSign[]|null;
		/**Kolekce Ixb souboru ktere se predaji k podepsani*/
		otherFilesToSignIxbs?: string[]|null;
		/**Seriove cislo zadosti EPK - pridano kvuli umisteni podpisu*/
		serCisloEpk?: number;
		/**Možný obsah souboru*/
		fileContent?: string|null;
	}
	const enum GWflSignPreConfigDtoNames { ixp = "ixp", ixb = "ixb", mimetype = "mimetype", objectidentifier = "objectidentifier", description = "description", otherFilesToSign = "otherFilesToSign", otherFilesToSignIxbs = "otherFilesToSignIxbs", serCisloEpk = "serCisloEpk", fileContent = "fileContent", keepFileAfterSign = "keepFileAfterSign", signingReason = "signingReason", idSigningReason = "idSigningReason", typeLTV = "typeLTV", typeElAttach = "typeElAttach", saveToStorage = "saveToStorage", distributedSignature = "distributedSignature", file = "file", signTime = "signTime", signatureType = "signatureType", signWithServerCert = "signWithServerCert", signWithTimeStamp = "signWithTimeStamp", filePath = "filePath", thumbprint = "thumbprint", fileName = "fileName", saveOnClient = "saveOnClient", certChain = "certChain", showPswdDlg = "showPswdDlg", otherPswd = "otherPswd", certMoreInfo = "certMoreInfo", isFiction = "isFiction",}
	const enum GWflSignPreConfigDtoFragments { ixp = "*", ixb = "*", mimetype = "*", objectidentifier = "*", description = "*", otherFilesToSign = "*", otherFilesToSignIxbs = "*", serCisloEpk = "*", fileContent = "*", keepFileAfterSign = "*", signingReason = "*", idSigningReason = "*", typeLTV = "*", typeElAttach = "*", saveToStorage = "*", distributedSignature = "*", file = "*", signTime = "*", signatureType = "*", signWithServerCert = "*", signWithTimeStamp = "*", filePath = "*", thumbprint = "*", fileName = "*", saveOnClient = "*", certChain = "*", showPswdDlg = "*", otherPswd = "*", certMoreInfo = "*", isFiction = "*",}
	const enum GWflSignPreConfigDtoTypes { ixp = "string", ixb = "string", mimetype = "string", objectidentifier = "string", description = "string", otherFilesToSign = "Gordic.Support.Sign.GFileToSign[]", otherFilesToSignIxbs = "string[]", serCisloEpk = "number", fileContent = "string", keepFileAfterSign = "boolean", signingReason = "string", idSigningReason = "string", typeLTV = "number", typeElAttach = "Gordic.Wfl.Interface.TypElpEpxEnum", saveToStorage = "boolean", distributedSignature = "boolean", file = "string", signTime = "JsonDate", signatureType = "Gordic.Security.Service.SignatureType", signWithServerCert = "boolean", signWithTimeStamp = "boolean", filePath = "string", thumbprint = "string", fileName = "string", saveOnClient = "boolean", certChain = "Gordic.Security.Service.GCertificateChain", showPswdDlg = "boolean", otherPswd = "string", certMoreInfo = "Gordic.Security.Service.GCertificateInfoDTO", isFiction = "boolean",}
	const enum GWflSignPreConfigDtoTypeLengths {}
	interface GSignPreConfigWithTypeOfCertDto extends Gordic.Wfl.Client.GWflSignPreConfigDto {
		/**Typ certifikatu*/
		typeCert?: Gordic.General.ApplicationInterface.TypeOfCertificate;
	}
	const enum GSignPreConfigWithTypeOfCertDtoNames { typeCert = "typeCert", ixp = "ixp", ixb = "ixb", mimetype = "mimetype", objectidentifier = "objectidentifier", description = "description", otherFilesToSign = "otherFilesToSign", otherFilesToSignIxbs = "otherFilesToSignIxbs", serCisloEpk = "serCisloEpk", fileContent = "fileContent", keepFileAfterSign = "keepFileAfterSign", signingReason = "signingReason", idSigningReason = "idSigningReason", typeLTV = "typeLTV", typeElAttach = "typeElAttach", saveToStorage = "saveToStorage", distributedSignature = "distributedSignature", file = "file", signTime = "signTime", signatureType = "signatureType", signWithServerCert = "signWithServerCert", signWithTimeStamp = "signWithTimeStamp", filePath = "filePath", thumbprint = "thumbprint", fileName = "fileName", saveOnClient = "saveOnClient", certChain = "certChain", showPswdDlg = "showPswdDlg", otherPswd = "otherPswd", certMoreInfo = "certMoreInfo", isFiction = "isFiction",}
	const enum GSignPreConfigWithTypeOfCertDtoFragments { typeCert = "*", ixp = "*", ixb = "*", mimetype = "*", objectidentifier = "*", description = "*", otherFilesToSign = "*", otherFilesToSignIxbs = "*", serCisloEpk = "*", fileContent = "*", keepFileAfterSign = "*", signingReason = "*", idSigningReason = "*", typeLTV = "*", typeElAttach = "*", saveToStorage = "*", distributedSignature = "*", file = "*", signTime = "*", signatureType = "*", signWithServerCert = "*", signWithTimeStamp = "*", filePath = "*", thumbprint = "*", fileName = "*", saveOnClient = "*", certChain = "*", showPswdDlg = "*", otherPswd = "*", certMoreInfo = "*", isFiction = "*",}
	const enum GSignPreConfigWithTypeOfCertDtoTypes { typeCert = "Gordic.General.ApplicationInterface.TypeOfCertificate", ixp = "string", ixb = "string", mimetype = "string", objectidentifier = "string", description = "string", otherFilesToSign = "Gordic.Support.Sign.GFileToSign[]", otherFilesToSignIxbs = "string[]", serCisloEpk = "number", fileContent = "string", keepFileAfterSign = "boolean", signingReason = "string", idSigningReason = "string", typeLTV = "number", typeElAttach = "Gordic.Wfl.Interface.TypElpEpxEnum", saveToStorage = "boolean", distributedSignature = "boolean", file = "string", signTime = "JsonDate", signatureType = "Gordic.Security.Service.SignatureType", signWithServerCert = "boolean", signWithTimeStamp = "boolean", filePath = "string", thumbprint = "string", fileName = "string", saveOnClient = "boolean", certChain = "Gordic.Security.Service.GCertificateChain", showPswdDlg = "boolean", otherPswd = "string", certMoreInfo = "Gordic.Security.Service.GCertificateInfoDTO", isFiction = "boolean",}
	const enum GSignPreConfigWithTypeOfCertDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Wfl.Client\Seznamy\GWflListsDto.d.ts 

declare namespace Gordic.Wfl.Client {
	interface GElPodaniBaseFilterDto {
		/**zp dor - dat. schranka*/
		TypPrijmu_DS?: boolean|null;
		/**zp dor - dat. schranka*/
		TypPrijmu_GEX?: boolean|null;
		/**zp dor - e-mail*/
		TypPrijmu_EMail?: boolean|null;
		/**zp dor - el. nosič*/
		TypPrijmu_DatovyNosic?: boolean|null;
		/**zp dor - interni vypraveni*/
		TypPrijmu_InterniVypraveni?: boolean|null;
		/**zp dor - E podatelna RAP*/
		TypPrijmu_EPodatelnaRAP?: boolean|null;
		/**zp dor - web. podatelna*/
		TypPrijmu_WebPodatelna?: boolean|null;
		/**O-portál na GINIS (Ombudsman)*/
		TypPrijmu_EPodatelnaPortal?: boolean|null;
		/**InfoKanal atd.*/
		TypPrijmu_Ostatni?: boolean|null;
		/**Podpis  0 - vse, 1 - podepsano,  2 - nepodepsano*/
		Podepsani?: Gordic.Wfl.Interface.FiltrDlePodpisuEnum|null;
		/**Zpracovani*/
		Zpracovani?: Gordic.Wfl.Interface.FiltrDleZpracovaniEnum|null;
	}
	const enum GElPodaniBaseFilterDtoNames { TypPrijmu_DS = "TypPrijmu_DS", TypPrijmu_GEX = "TypPrijmu_GEX", TypPrijmu_EMail = "TypPrijmu_EMail", TypPrijmu_DatovyNosic = "TypPrijmu_DatovyNosic", TypPrijmu_InterniVypraveni = "TypPrijmu_InterniVypraveni", TypPrijmu_EPodatelnaRAP = "TypPrijmu_EPodatelnaRAP", TypPrijmu_WebPodatelna = "TypPrijmu_WebPodatelna", TypPrijmu_EPodatelnaPortal = "TypPrijmu_EPodatelnaPortal", TypPrijmu_Ostatni = "TypPrijmu_Ostatni", Podepsani = "Podepsani", Zpracovani = "Zpracovani",}
	const enum GElPodaniBaseFilterDtoFragments { TypPrijmu_DS = "*", TypPrijmu_GEX = "*", TypPrijmu_EMail = "*", TypPrijmu_DatovyNosic = "*", TypPrijmu_InterniVypraveni = "*", TypPrijmu_EPodatelnaRAP = "*", TypPrijmu_WebPodatelna = "*", TypPrijmu_EPodatelnaPortal = "*", TypPrijmu_Ostatni = "*", Podepsani = "*", Zpracovani = "*",}
	const enum GElPodaniBaseFilterDtoTypes { TypPrijmu_DS = "boolean", TypPrijmu_GEX = "boolean", TypPrijmu_EMail = "boolean", TypPrijmu_DatovyNosic = "boolean", TypPrijmu_InterniVypraveni = "boolean", TypPrijmu_EPodatelnaRAP = "boolean", TypPrijmu_WebPodatelna = "boolean", TypPrijmu_EPodatelnaPortal = "boolean", TypPrijmu_Ostatni = "boolean", Podepsani = "Gordic.Wfl.Interface.FiltrDlePodpisuEnum", Zpracovani = "Gordic.Wfl.Interface.FiltrDleZpracovaniEnum",}
	const enum GElPodaniBaseFilterDtoTypeLengths {}
	interface GElPodaniNezpracovanaFilterDto extends Gordic.Wfl.Client.GElPodaniBaseFilterDto {
		/**Vlastnictvi  0 - vse, 1 - vlastni,  2 - nerozdelene*/
		Vlastnictvi?: Gordic.Wfl.Interface.FiltrDleVlastnictviEnum|null;
	}
	const enum GElPodaniNezpracovanaFilterDtoNames { Vlastnictvi = "Vlastnictvi", TypPrijmu_DS = "TypPrijmu_DS", TypPrijmu_GEX = "TypPrijmu_GEX", TypPrijmu_EMail = "TypPrijmu_EMail", TypPrijmu_DatovyNosic = "TypPrijmu_DatovyNosic", TypPrijmu_InterniVypraveni = "TypPrijmu_InterniVypraveni", TypPrijmu_EPodatelnaRAP = "TypPrijmu_EPodatelnaRAP", TypPrijmu_WebPodatelna = "TypPrijmu_WebPodatelna", TypPrijmu_EPodatelnaPortal = "TypPrijmu_EPodatelnaPortal", TypPrijmu_Ostatni = "TypPrijmu_Ostatni", Podepsani = "Podepsani", Zpracovani = "Zpracovani",}
	const enum GElPodaniNezpracovanaFilterDtoFragments { Vlastnictvi = "*", TypPrijmu_DS = "*", TypPrijmu_GEX = "*", TypPrijmu_EMail = "*", TypPrijmu_DatovyNosic = "*", TypPrijmu_InterniVypraveni = "*", TypPrijmu_EPodatelnaRAP = "*", TypPrijmu_WebPodatelna = "*", TypPrijmu_EPodatelnaPortal = "*", TypPrijmu_Ostatni = "*", Podepsani = "*", Zpracovani = "*",}
	const enum GElPodaniNezpracovanaFilterDtoTypes { Vlastnictvi = "Gordic.Wfl.Interface.FiltrDleVlastnictviEnum", TypPrijmu_DS = "boolean", TypPrijmu_GEX = "boolean", TypPrijmu_EMail = "boolean", TypPrijmu_DatovyNosic = "boolean", TypPrijmu_InterniVypraveni = "boolean", TypPrijmu_EPodatelnaRAP = "boolean", TypPrijmu_WebPodatelna = "boolean", TypPrijmu_EPodatelnaPortal = "boolean", TypPrijmu_Ostatni = "boolean", Podepsani = "Gordic.Wfl.Interface.FiltrDlePodpisuEnum", Zpracovani = "Gordic.Wfl.Interface.FiltrDleZpracovaniEnum",}
	const enum GElPodaniNezpracovanaFilterDtoTypeLengths {}
	interface GElPodaniPrehledFilterDto extends Gordic.Wfl.Client.GElPodaniBaseFilterDto {
		/**zp dor - web. podatelna*/
		Stav?: Gordic.Wfl.Interface.StavElPodaniEnum|null;
		/**zp dor - web. podatelna*/
		FiltrDleDatumu?: Gordic.Wfl.Interface.TypFiltrDleDatumu|null;
		/**zp dor - web. podatelna*/
		Potvrzeni?: Gordic.Wfl.Interface.TypOdeslaniPotvrzeni|null;
		/**Datum odeslani*/
		Datum?: Gordic.Wfl.Interface.Lists.WflDateIntervalDto|null;
		/**PID el. podání*/
		Ixb?: string|null;
		/**PID vzniklého dok.*/
		Ixp?: string|null;
		/**pouzívá se EPA před ZUD*/
		EpaAutomat?: boolean|null;
		/**pouzívá se EPA před ZUD*/
		TypEd?: number|null;
	}
	const enum GElPodaniPrehledFilterDtoNames { Stav = "Stav", FiltrDleDatumu = "FiltrDleDatumu", Potvrzeni = "Potvrzeni", Datum = "Datum", Ixb = "Ixb", Ixp = "Ixp", EpaAutomat = "EpaAutomat", TypEd = "TypEd", TypPrijmu_DS = "TypPrijmu_DS", TypPrijmu_GEX = "TypPrijmu_GEX", TypPrijmu_EMail = "TypPrijmu_EMail", TypPrijmu_DatovyNosic = "TypPrijmu_DatovyNosic", TypPrijmu_InterniVypraveni = "TypPrijmu_InterniVypraveni", TypPrijmu_EPodatelnaRAP = "TypPrijmu_EPodatelnaRAP", TypPrijmu_WebPodatelna = "TypPrijmu_WebPodatelna", TypPrijmu_EPodatelnaPortal = "TypPrijmu_EPodatelnaPortal", TypPrijmu_Ostatni = "TypPrijmu_Ostatni", Podepsani = "Podepsani", Zpracovani = "Zpracovani",}
	const enum GElPodaniPrehledFilterDtoFragments { Stav = "*", FiltrDleDatumu = "*", Potvrzeni = "*", Datum = "*", Ixb = "*", Ixp = "*", EpaAutomat = "*", TypEd = "*", TypPrijmu_DS = "*", TypPrijmu_GEX = "*", TypPrijmu_EMail = "*", TypPrijmu_DatovyNosic = "*", TypPrijmu_InterniVypraveni = "*", TypPrijmu_EPodatelnaRAP = "*", TypPrijmu_WebPodatelna = "*", TypPrijmu_EPodatelnaPortal = "*", TypPrijmu_Ostatni = "*", Podepsani = "*", Zpracovani = "*",}
	const enum GElPodaniPrehledFilterDtoTypes { Stav = "Gordic.Wfl.Interface.StavElPodaniEnum", FiltrDleDatumu = "Gordic.Wfl.Interface.TypFiltrDleDatumu", Potvrzeni = "Gordic.Wfl.Interface.TypOdeslaniPotvrzeni", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Ixb = "string", Ixp = "string", EpaAutomat = "boolean", TypEd = "number", TypPrijmu_DS = "boolean", TypPrijmu_GEX = "boolean", TypPrijmu_EMail = "boolean", TypPrijmu_DatovyNosic = "boolean", TypPrijmu_InterniVypraveni = "boolean", TypPrijmu_EPodatelnaRAP = "boolean", TypPrijmu_WebPodatelna = "boolean", TypPrijmu_EPodatelnaPortal = "boolean", TypPrijmu_Ostatni = "boolean", Podepsani = "Gordic.Wfl.Interface.FiltrDlePodpisuEnum", Zpracovani = "Gordic.Wfl.Interface.FiltrDleZpracovaniEnum",}
	const enum GElPodaniPrehledFilterDtoTypeLengths {}
	interface GPredaniZasilekDto {
		/**ixs funkce od*/
		IxsFunOd?: string|null;
		/**ixs SU přebirajci*/
		IxsSuDo?: string|null;
		/**ixs funkce přebirajci*/
		IxsFunDo?: string|null;
		/**ixs referenta přebirajici (v případě zástupu)*/
		IxsRefDo?: string|null;
		/**ixs referenta přebirajici (v případě zástupu)*/
		SXSZasilekKPredani?: string[]|null;
		TypOznaceni?: Gordic.Wfl.Interface.TypOznaceniKAkci|null;
	}
	const enum GPredaniZasilekDtoNames { IxsFunOd = "IxsFunOd", IxsSuDo = "IxsSuDo", IxsFunDo = "IxsFunDo", IxsRefDo = "IxsRefDo", SXSZasilekKPredani = "SXSZasilekKPredani", TypOznaceni = "TypOznaceni",}
	const enum GPredaniZasilekDtoFragments { IxsFunOd = "*", IxsSuDo = "*", IxsFunDo = "*", IxsRefDo = "*", SXSZasilekKPredani = "*", TypOznaceni = "*",}
	const enum GPredaniZasilekDtoTypes { IxsFunOd = "string", IxsSuDo = "string", IxsFunDo = "string", IxsRefDo = "string", SXSZasilekKPredani = "string[]", TypOznaceni = "Gordic.Wfl.Interface.TypOznaceniKAkci",}
	const enum GPredaniZasilekDtoTypeLengths {}
}

//#endregion

