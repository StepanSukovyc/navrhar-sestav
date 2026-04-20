/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pod.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pod.WebControls\Gordic.Pod.WebControls.csproj
*    created     2026-02-16 14:35:10
*    files       Gin\Pod\AppSettings\GPodPodaniPovinAPreplnSettingsDto.d.ts
*                Gin\Pod\ElPodani\Dto\GEvidenceElPodaniInitDto - Copy.d.ts
*                Gin\Pod\ElPodani\Dto\GEvidenceElPodaniInitDto.d.ts
*                Gin\Pod\ElPodani\Dto\GEvidenceElPodaniRuznaDto.d.ts
*                Gin\Pod\ElPodani\Dto\GPodaniOpravaPisemnostiDto.d.ts
*                Gin\Pod\ElPodani\Dto\GRuzneDto.d.ts
*                Gin\Pod\Lists\Dto\DokumentyASpisyFilterDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pod.WebControls\Gin\Pod\AppSettings\GPodPodaniPovinAPreplnSettingsDto.d.ts 

declare namespace Gordic.Pod.WebControls {
	/**Dto uživatelského nastavení POD  povinnosti a předplnění v UserSettings (GStore)*/
	interface GPodPodaniPovinAPreplnSettingsDto {
		/**pocinná vec*/
		PovinVec?: boolean|null;
		/**pocinná psc*/
		PovinPSC?: boolean|null;
		/**pocinná stat*/
		PovinStat?: boolean|null;
		/**pocinná aaa*/
		PovinDatOdes?: boolean|null;
		/**pocinná aaa*/
		PovinDatZeDne?: boolean|null;
		/**pocinná aaa*/
		PovinZnackaOdes?: boolean|null;
		/**pocinná aaa*/
		PovinOdesilatel?: boolean|null;
		/**pocinná aaa*/
		PovinPodCislo?: boolean|null;
		/**pocinná aaa*/
		PovinPozn?: boolean|null;
		/**pocinná aaa*/
		PovinPocListu?: boolean|null;
		/**pocinná aaa*/
		PovinPocStran?: boolean|null;
		/**pocinná aaa*/
		PovinPocPriloh?: boolean|null;
		/**pocinná aaa*/
		PovinPocListuPriloh?: boolean|null;
		/**pocinná aaa*/
		PovinPocKopii?: boolean|null;
		/**pocinná aaa*/
		PovinCilPrideleni?: boolean|null;
		/**pocinná aaa*/
		PovinVecPodrobne?: boolean|null;
		/**pocinná aaa*/
		PredVec?: boolean|null;
		/**pocinná aaa*/
		PredPSC?: boolean|null;
		/**pocinná aaa*/
		PredStat?: boolean|null;
		/**pocinná aaa*/
		PredSPZ?: boolean|null;
		/**pocinná aaa*/
		PredPredat?: boolean|null;
		/**pocinná aaa*/
		PredDatOdes?: boolean|null;
		/**pocinná aaa*/
		PredDatZeDne?: boolean|null;
		/**pocinná aaa*/
		PredZnackaOdes?: boolean|null;
		/**pocinná aaa*/
		PredVecPodrobne?: boolean|null;
		/**pocinná aaa*/
		PredPridelitPrimo?: boolean|null;
		/**pocinná aaa*/
		PredSpZnOdes?: boolean|null;
		/**pocinná aaa*/
		PredOdesilatel?: boolean|null;
		/**pocinná aaa*/
		PredPodCislo?: boolean|null;
		/**pocinná aaa*/
		PredPoznamka?: boolean|null;
		/**pocinná aaa*/
		PredCilPrideleni?: boolean|null;
		/**pocinná aaa*/
		PredPocList?: boolean|null;
		/**pocinná aaa*/
		PredPocStran?: boolean|null;
		/**pocinná aaa*/
		PredPocPriloh?: boolean|null;
		/**pocinná aaa*/
		PredPocKopii?: boolean|null;
		/**pocinná aaa*/
		PredPocListuPriloh?: boolean|null;
		/**pocinná aaa*/
		PredZpusobDor?: boolean|null;
		/**pocinná aaa*/
		PredDruhZach?: boolean|null;
		/**pocinná aaa*/
		PredDruhZas?: boolean|null;
		/**pocinná aaa*/
		PredTypDok?: boolean|null;
		/**pocinná aaa*/
		PredDatPod?: boolean|null;
		/**pocinná aaa*/
		AktDatumDatOdes?: boolean|null;
		/**pocinná aaa*/
		AktDatumDatZeDne?: boolean|null;
	}
	const enum GPodPodaniPovinAPreplnSettingsDtoNames { PovinVec = "PovinVec", PovinPSC = "PovinPSC", PovinStat = "PovinStat", PovinDatOdes = "PovinDatOdes", PovinDatZeDne = "PovinDatZeDne", PovinZnackaOdes = "PovinZnackaOdes", PovinOdesilatel = "PovinOdesilatel", PovinPodCislo = "PovinPodCislo", PovinPozn = "PovinPozn", PovinPocListu = "PovinPocListu", PovinPocStran = "PovinPocStran", PovinPocPriloh = "PovinPocPriloh", PovinPocListuPriloh = "PovinPocListuPriloh", PovinPocKopii = "PovinPocKopii", PovinCilPrideleni = "PovinCilPrideleni", PovinVecPodrobne = "PovinVecPodrobne", PredVec = "PredVec", PredPSC = "PredPSC", PredStat = "PredStat", PredSPZ = "PredSPZ", PredPredat = "PredPredat", PredDatOdes = "PredDatOdes", PredDatZeDne = "PredDatZeDne", PredZnackaOdes = "PredZnackaOdes", PredVecPodrobne = "PredVecPodrobne", PredPridelitPrimo = "PredPridelitPrimo", PredSpZnOdes = "PredSpZnOdes", PredOdesilatel = "PredOdesilatel", PredPodCislo = "PredPodCislo", PredPoznamka = "PredPoznamka", PredCilPrideleni = "PredCilPrideleni", PredPocList = "PredPocList", PredPocStran = "PredPocStran", PredPocPriloh = "PredPocPriloh", PredPocKopii = "PredPocKopii", PredPocListuPriloh = "PredPocListuPriloh", PredZpusobDor = "PredZpusobDor", PredDruhZach = "PredDruhZach", PredDruhZas = "PredDruhZas", PredTypDok = "PredTypDok", PredDatPod = "PredDatPod", AktDatumDatOdes = "AktDatumDatOdes", AktDatumDatZeDne = "AktDatumDatZeDne",}
	const enum GPodPodaniPovinAPreplnSettingsDtoFragments { PovinVec = "*", PovinPSC = "*", PovinStat = "*", PovinDatOdes = "*", PovinDatZeDne = "*", PovinZnackaOdes = "*", PovinOdesilatel = "*", PovinPodCislo = "*", PovinPozn = "*", PovinPocListu = "*", PovinPocStran = "*", PovinPocPriloh = "*", PovinPocListuPriloh = "*", PovinPocKopii = "*", PovinCilPrideleni = "*", PovinVecPodrobne = "*", PredVec = "*", PredPSC = "*", PredStat = "*", PredSPZ = "*", PredPredat = "*", PredDatOdes = "*", PredDatZeDne = "*", PredZnackaOdes = "*", PredVecPodrobne = "*", PredPridelitPrimo = "*", PredSpZnOdes = "*", PredOdesilatel = "*", PredPodCislo = "*", PredPoznamka = "*", PredCilPrideleni = "*", PredPocList = "*", PredPocStran = "*", PredPocPriloh = "*", PredPocKopii = "*", PredPocListuPriloh = "*", PredZpusobDor = "*", PredDruhZach = "*", PredDruhZas = "*", PredTypDok = "*", PredDatPod = "*", AktDatumDatOdes = "*", AktDatumDatZeDne = "*",}
	const enum GPodPodaniPovinAPreplnSettingsDtoTypes { PovinVec = "boolean", PovinPSC = "boolean", PovinStat = "boolean", PovinDatOdes = "boolean", PovinDatZeDne = "boolean", PovinZnackaOdes = "boolean", PovinOdesilatel = "boolean", PovinPodCislo = "boolean", PovinPozn = "boolean", PovinPocListu = "boolean", PovinPocStran = "boolean", PovinPocPriloh = "boolean", PovinPocListuPriloh = "boolean", PovinPocKopii = "boolean", PovinCilPrideleni = "boolean", PovinVecPodrobne = "boolean", PredVec = "boolean", PredPSC = "boolean", PredStat = "boolean", PredSPZ = "boolean", PredPredat = "boolean", PredDatOdes = "boolean", PredDatZeDne = "boolean", PredZnackaOdes = "boolean", PredVecPodrobne = "boolean", PredPridelitPrimo = "boolean", PredSpZnOdes = "boolean", PredOdesilatel = "boolean", PredPodCislo = "boolean", PredPoznamka = "boolean", PredCilPrideleni = "boolean", PredPocList = "boolean", PredPocStran = "boolean", PredPocPriloh = "boolean", PredPocKopii = "boolean", PredPocListuPriloh = "boolean", PredZpusobDor = "boolean", PredDruhZach = "boolean", PredDruhZas = "boolean", PredTypDok = "boolean", PredDatPod = "boolean", AktDatumDatOdes = "boolean", AktDatumDatZeDne = "boolean",}
	const enum GPodPodaniPovinAPreplnSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.WebControls\Gin\Pod\ElPodani\Dto\GEvidenceElPodaniInitDto - Copy.d.ts 

declare namespace Gordic.Pod.WebControls {
    /**Dto pro opravu podání*/
	interface GPodaniOpravaPisemnostiDto {
        /**Autogenerated.*/
		Pid?: string|null;
        /**Autogenerated.*/
		ZpusobDoruceni?: number|null;
        /**Autogenerated.*/
		DruhZachazeniDoruceni?: number|null;
        /**Autogenerated.*/
		DruhZasilkyDoruceni?: number|null;
        /**Autogenerated.*/
		PodaciCislo?: string|null;
        /**Autogenerated.*/
		DatOdeslDoruceni?: JsonDate|null;
        /**Autogenerated.*/
		Psc?: string|null;
        /**Autogenerated.*/
		Posta?: string|null;
        /**Autogenerated.*/
		Stat?: number|null;
        /**Autogenerated.*/
		SUFuncRef?: string|null;
        /**Autogenerated.*/
		Odesilatel_ixs_esu?: string|null;
        /**Autogenerated.*/
		Odesilatel_lic?: string|null;
        /**Autogenerated.*/
		Odesilatel_por_zast?: number|null;
        /**Autogenerated.*/
		TypPis?: string|null;
        /**Autogenerated.*/
		SpisZnak_spis_pl?: string|null;
        /**Autogenerated.*/
		SpisZnak_spis_znak?: string|null;
        /**Autogenerated.*/
		Umisteni?: string|null;
        /**Autogenerated.*/
		PoznamkaDoruceni?: string|null;
        /**Autogenerated.*/
		StupUtaj?: number|null;
        /**Autogenerated.*/
		DatZeDneDoruceni?: JsonDate|null;
        /**Autogenerated.*/
		ZnackaOdesilatele?: string|null;
        /**Autogenerated.*/
		SpZnackaOdesilatele?: string|null;
        /**Autogenerated.*/
		VymazatCilPrideleni?: string|null;
        /**Autogenerated.*/
		IxsSU?: string|null;
        /**Autogenerated.*/
		Evidovat?: boolean|null;
        /**Autogenerated.*/
		Redistribuce?: string|null;
        /**Autogenerated.*/
		Znacka?: string|null;
        /**Autogenerated.*/
		VecPodrobne?: string|null;
        /**Autogenerated.*/
		Poznamka?: string|null;
        /**Autogenerated.*/
		EvidovatDoSsl?: boolean|null;
        /**Autogenerated.*/
		SpisObsluha?: string|null;
        /**Autogenerated.*/
		Vec?: string|null;
        /**Autogenerated.*/
		DatPod?: JsonDate|null;
        /**Autogenerated.*/
		DatDoruceni?: JsonDate|null;
        /**Autogenerated.*/
		PocListu?: string|null;
        /**Autogenerated.*/
		PocStran?: number|null;
        /**Autogenerated.*/
		PocPriloh?: number|null;
        /**Autogenerated.*/
		PocKopii?: number|null;
        /**Autogenerated.*/
		PocListuPriloh?: string|null;
	}
    /**Dto pro opravu podání*/
	interface GPodaniOpravaPisemnostiEnableDto {
        /**Autogenerated.*/
		ActionVymazatVseEnable?: boolean|null;
        /**EvidovatEnabled.*/
		EvidovatEnabled?: boolean|null;
        /**EvidovatEnabled.*/
		EvidovatOtazka?: boolean|null;
        /**EvidovatEnabled.*/
		VecPodrobneMaxLength?: number|null;
        /**EvidovatEnabled.*/
		DatDoruceniVisible?: boolean|null;
        /**EvidovatEnabled.*/
		PoznamkaDoruceniMaxLength?: number|null;
        /**EvidovatEnabled.*/
		ZnackaLabelText?: string|null;
        /**EvidovatEnabled.*/
		ZnackaOdesilateleLabelText?: string|null;
        /**EvidovatEnabled.*/
		PristupDleTypuDok?: boolean|null;
        /**EvidovatEnabled.*/
		SpZnakDleTypuDok?: boolean|null;
        /**EvidovatEnabled.*/
		SpisObsluhaEnable?: boolean|null;
        /**EvidovatEnabled.*/
		EvidovatDoSSLEnabled?: boolean|null;
        /**EvidovatEnabled.*/
		VytvoritSpisEnabled?: boolean|null;
        /**EvidovatEnabled.*/
		DatPodEnabled?: boolean|null;
        /**EvidovatEnabled.*/
		PridelitPrimoEnabled?: boolean|null;
        /**EvidovatEnabled.*/
		ZpusobDoruceniFilterAktivita?: number[]|null;
        /**EvidovatEnabled.*/
		ZpusobDoruceniEnabled?: boolean|null;
        /**EvidovatEnabled.*/
		ZnackaEnabled?: boolean|null;
        /**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes?: boolean|null;
        /**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes_IxsEsu?: string|null;
        /**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes_Ixp?: string|null;
        /**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes_ZnackaOdes?: string|null;
        /**NepovolitZavritBezUlozeni.*/
		NepovolitZavritBezUlozeni?: boolean|null;
        /**EvidovatEnabled.*/
		EvidovatVisible?: boolean|null;
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.WebControls\Gin\Pod\ElPodani\Dto\GEvidenceElPodaniInitDto.d.ts 

declare namespace Gordic.Pod.WebControls {
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniInitDto {
		/**Autogenerated.*/
		emailSignCbxEnable?: boolean|null;
		/**Autogenerated.*/
		emailSignCbxChecked?: boolean|null;
		/**Gets or sets the cesta k souborum.*/
		cestaKSouborum?: string|null;
		/**gin_ssl_datschr*/
		gin_ssl_datschr?: number|null;
		/**Autogenerated.*/
		zpracovatVnoreneSouboryVisible?: boolean|null;
		/**Autogenerated.*/
		zpracovatVnoreneSouboryValue?: boolean|null;
	}
	const enum GEvidenceElPodaniInitDtoNames { emailSignCbxEnable = "emailSignCbxEnable", emailSignCbxChecked = "emailSignCbxChecked", cestaKSouborum = "cestaKSouborum", gin_ssl_datschr = "gin_ssl_datschr", zpracovatVnoreneSouboryVisible = "zpracovatVnoreneSouboryVisible", zpracovatVnoreneSouboryValue = "zpracovatVnoreneSouboryValue",}
	const enum GEvidenceElPodaniInitDtoFragments { emailSignCbxEnable = "*", emailSignCbxChecked = "*", cestaKSouborum = "*", gin_ssl_datschr = "*", zpracovatVnoreneSouboryVisible = "*", zpracovatVnoreneSouboryValue = "*",}
	const enum GEvidenceElPodaniInitDtoTypes { emailSignCbxEnable = "boolean", emailSignCbxChecked = "boolean", cestaKSouborum = "string", gin_ssl_datschr = "number", zpracovatVnoreneSouboryVisible = "boolean", zpracovatVnoreneSouboryValue = "boolean",}
	const enum GEvidenceElPodaniInitDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GElPodaniGenerovatZipDto {
		/**AdresarZakladni*/
		AdresarZakladni?: string|null;
		/**CestaKTempu*/
		CestaKTempu?: string|null;
		/**CestaKZipu*/
		CestaKZipu?: string|null;
		/**CestaKZipu*/
		ZipName?: string|null;
		/**FileInfoDto*/
		FileInfoDto?: Gordic.General.ApplicationInterface.GFileInfoDto|null;
	}
	const enum GElPodaniGenerovatZipDtoNames { AdresarZakladni = "AdresarZakladni", CestaKTempu = "CestaKTempu", CestaKZipu = "CestaKZipu", ZipName = "ZipName", FileInfoDto = "FileInfoDto",}
	const enum GElPodaniGenerovatZipDtoFragments { AdresarZakladni = "*", CestaKTempu = "*", CestaKZipu = "*", ZipName = "*", FileInfoDto = "*",}
	const enum GElPodaniGenerovatZipDtoTypes { AdresarZakladni = "string", CestaKTempu = "string", CestaKZipu = "string", ZipName = "string", FileInfoDto = "Gordic.General.ApplicationInterface.GFileInfoDto",}
	const enum GElPodaniGenerovatZipDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.WebControls\Gin\Pod\ElPodani\Dto\GEvidenceElPodaniRuznaDto.d.ts 

declare namespace Gordic.Pod.WebControls {
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniNactiDataDto {
		InitHlaska1?: string|null;
		InitHlaska2?: string|null;
		CloseForm?: boolean|null;
		UkazDotaz?: boolean|null;
		DotazPotvrzen?: boolean|null;
		Odemknuto?: boolean|null;
		JednaSeOOdpoved?: boolean|null;
		DotazTxt?: string|null;
		SpustitPodani?: boolean|null;
	}
	const enum GEvidenceElPodaniNactiDataDtoNames { InitHlaska1 = "InitHlaska1", InitHlaska2 = "InitHlaska2", CloseForm = "CloseForm", UkazDotaz = "UkazDotaz", DotazPotvrzen = "DotazPotvrzen", Odemknuto = "Odemknuto", JednaSeOOdpoved = "JednaSeOOdpoved", DotazTxt = "DotazTxt", SpustitPodani = "SpustitPodani",}
	const enum GEvidenceElPodaniNactiDataDtoFragments { InitHlaska1 = "*", InitHlaska2 = "*", CloseForm = "*", UkazDotaz = "*", DotazPotvrzen = "*", Odemknuto = "*", JednaSeOOdpoved = "*", DotazTxt = "*", SpustitPodani = "*",}
	const enum GEvidenceElPodaniNactiDataDtoTypes { InitHlaska1 = "string", InitHlaska2 = "string", CloseForm = "boolean", UkazDotaz = "boolean", DotazPotvrzen = "boolean", Odemknuto = "boolean", JednaSeOOdpoved = "boolean", DotazTxt = "string", SpustitPodani = "boolean",}
	const enum GEvidenceElPodaniNactiDataDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniSpustPodaniDto {
		ActionZobrazInfoOAntiviruEnabled?: boolean|null;
		JeAntivir?: string|null;
		NoAntivir?: string|null;
		ParamAV?: string|null;
		AntivirKomentorText?: string|null;
		AntivirKomentorColour?: string|null;
		krok2_labelPanel?: boolean|null;
		HlaskaNepodariloSeZavestKontrolu?: string|null;
		ZpusDor?: number|null;
		OverPodpiPsaram?: number|null;
		ZpusobOdeslaniPotvrzeni?: number|null;
		ActionRychlaOdpovedMailemVisible?: boolean|null;
		StavInb?: number|null;
		ChyboveDto?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		TbZpusobDoruceniTxt?: string|null;
		TbZpusobDoruceniIco?: string|null;
		Dat_prij?: JsonDate|null;
		Poznamka?: string|null;
		ObsahBase64?: string|null;
		EmailPuvodni?: string|null;
		EmailProp?: string|null;
		ObsahZpravy?: string|null;
		CjOdes?: string|null;
		IDUtvar?: string|null;
		Utvar?: string|null;
		IDUOdes?: string|null;
		UOdes?: string|null;
		SpZnOdes?: string|null;
		IsZpDorTypuDatavaZprava?: boolean|null;
		IsZpDorTypuEDesk?: boolean|null;
	}
	const enum GEvidenceElPodaniSpustPodaniDtoNames { ActionZobrazInfoOAntiviruEnabled = "ActionZobrazInfoOAntiviruEnabled", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", ParamAV = "ParamAV", AntivirKomentorText = "AntivirKomentorText", AntivirKomentorColour = "AntivirKomentorColour", krok2_labelPanel = "krok2_labelPanel", HlaskaNepodariloSeZavestKontrolu = "HlaskaNepodariloSeZavestKontrolu", ZpusDor = "ZpusDor", OverPodpiPsaram = "OverPodpiPsaram", ZpusobOdeslaniPotvrzeni = "ZpusobOdeslaniPotvrzeni", ActionRychlaOdpovedMailemVisible = "ActionRychlaOdpovedMailemVisible", StavInb = "StavInb", ChyboveDto = "ChyboveDto", TbZpusobDoruceniTxt = "TbZpusobDoruceniTxt", TbZpusobDoruceniIco = "TbZpusobDoruceniIco", Dat_prij = "Dat_prij", Poznamka = "Poznamka", ObsahBase64 = "ObsahBase64", EmailPuvodni = "EmailPuvodni", EmailProp = "EmailProp", ObsahZpravy = "ObsahZpravy", CjOdes = "CjOdes", IDUtvar = "IDUtvar", Utvar = "Utvar", IDUOdes = "IDUOdes", UOdes = "UOdes", SpZnOdes = "SpZnOdes", IsZpDorTypuDatavaZprava = "IsZpDorTypuDatavaZprava", IsZpDorTypuEDesk = "IsZpDorTypuEDesk",}
	const enum GEvidenceElPodaniSpustPodaniDtoFragments { ActionZobrazInfoOAntiviruEnabled = "*", JeAntivir = "*", NoAntivir = "*", ParamAV = "*", AntivirKomentorText = "*", AntivirKomentorColour = "*", krok2_labelPanel = "*", HlaskaNepodariloSeZavestKontrolu = "*", ZpusDor = "*", OverPodpiPsaram = "*", ZpusobOdeslaniPotvrzeni = "*", ActionRychlaOdpovedMailemVisible = "*", StavInb = "*", ChyboveDto = "*", TbZpusobDoruceniTxt = "*", TbZpusobDoruceniIco = "*", Dat_prij = "*", Poznamka = "*", ObsahBase64 = "*", EmailPuvodni = "*", EmailProp = "*", ObsahZpravy = "*", CjOdes = "*", IDUtvar = "*", Utvar = "*", IDUOdes = "*", UOdes = "*", SpZnOdes = "*", IsZpDorTypuDatavaZprava = "*", IsZpDorTypuEDesk = "*",}
	const enum GEvidenceElPodaniSpustPodaniDtoTypes { ActionZobrazInfoOAntiviruEnabled = "boolean", JeAntivir = "string", NoAntivir = "string", ParamAV = "string", AntivirKomentorText = "string", AntivirKomentorColour = "string", krok2_labelPanel = "boolean", HlaskaNepodariloSeZavestKontrolu = "string", ZpusDor = "number", OverPodpiPsaram = "number", ZpusobOdeslaniPotvrzeni = "number", ActionRychlaOdpovedMailemVisible = "boolean", StavInb = "number", ChyboveDto = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", TbZpusobDoruceniTxt = "string", TbZpusobDoruceniIco = "string", Dat_prij = "JsonDate", Poznamka = "string", ObsahBase64 = "string", EmailPuvodni = "string", EmailProp = "string", ObsahZpravy = "string", CjOdes = "string", IDUtvar = "string", Utvar = "string", IDUOdes = "string", UOdes = "string", SpZnOdes = "string", IsZpDorTypuDatavaZprava = "boolean", IsZpDorTypuEDesk = "boolean",}
	const enum GEvidenceElPodaniSpustPodaniDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniChybovaHlaskaDto {
		IfCloseForm?: boolean|null;
		Hlaska?: string|null;
		Hlaska2?: string|null;
		Hlaska3?: string|null;
		HlaskaVytezitMetadataZObrazu?: string|null;
		ProblemFile?: string|null;
		Pid?: string[]|null;
		Odemknout?: boolean|null;
	}
	const enum GEvidenceElPodaniChybovaHlaskaDtoNames { IfCloseForm = "IfCloseForm", Hlaska = "Hlaska", Hlaska2 = "Hlaska2", Hlaska3 = "Hlaska3", HlaskaVytezitMetadataZObrazu = "HlaskaVytezitMetadataZObrazu", ProblemFile = "ProblemFile", Pid = "Pid", Odemknout = "Odemknout",}
	const enum GEvidenceElPodaniChybovaHlaskaDtoFragments { IfCloseForm = "*", Hlaska = "*", Hlaska2 = "*", Hlaska3 = "*", HlaskaVytezitMetadataZObrazu = "*", ProblemFile = "*", Pid = "*", Odemknout = "*",}
	const enum GEvidenceElPodaniChybovaHlaskaDtoTypes { IfCloseForm = "boolean", Hlaska = "string", Hlaska2 = "string", Hlaska3 = "string", HlaskaVytezitMetadataZObrazu = "string", ProblemFile = "string", Pid = "string[]", Odemknout = "boolean",}
	const enum GEvidenceElPodaniChybovaHlaskaDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrokPredekInputElEvidenceDto {
		ZpusDor?: number|null;
		JeAntivir?: string|null;
		NoAntivir?: string|null;
		MuzeBytZpravaOriginalem?: boolean|null;
	}
	const enum GKrokPredekInputElEvidenceDtoNames { ZpusDor = "ZpusDor", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GKrokPredekInputElEvidenceDtoFragments { ZpusDor = "*", JeAntivir = "*", NoAntivir = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GKrokPredekInputElEvidenceDtoTypes { ZpusDor = "number", JeAntivir = "string", NoAntivir = "string", MuzeBytZpravaOriginalem = "boolean",}
	const enum GKrokPredekInputElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok1InputElEvidenceDto extends Gordic.Pod.WebControls.GKrokPredekInputElEvidenceDto {
		OrigEml?: boolean|null;
		StavInb?: number|null;
		EmailProp?: string|null;
		ParamAV?: string|null;
	}
	const enum GKrok1InputElEvidenceDtoNames { OrigEml = "OrigEml", StavInb = "StavInb", EmailProp = "EmailProp", ParamAV = "ParamAV", ZpusDor = "ZpusDor", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GKrok1InputElEvidenceDtoFragments { OrigEml = "*", StavInb = "*", EmailProp = "*", ParamAV = "*", ZpusDor = "*", JeAntivir = "*", NoAntivir = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GKrok1InputElEvidenceDtoTypes { OrigEml = "boolean", StavInb = "number", EmailProp = "string", ParamAV = "string", ZpusDor = "number", JeAntivir = "string", NoAntivir = "string", MuzeBytZpravaOriginalem = "boolean",}
	const enum GKrok1InputElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok1QuestionDto {
		OdmitnoutPodani?: boolean|null;
		OdmitnoutPodaniTxt?: string|null;
		Postoupeni?: boolean|null;
		PostoupeniTxt?: string|null;
	}
	const enum GKrok1QuestionDtoNames { OdmitnoutPodani = "OdmitnoutPodani", OdmitnoutPodaniTxt = "OdmitnoutPodaniTxt", Postoupeni = "Postoupeni", PostoupeniTxt = "PostoupeniTxt",}
	const enum GKrok1QuestionDtoFragments { OdmitnoutPodani = "*", OdmitnoutPodaniTxt = "*", Postoupeni = "*", PostoupeniTxt = "*",}
	const enum GKrok1QuestionDtoTypes { OdmitnoutPodani = "boolean", OdmitnoutPodaniTxt = "string", Postoupeni = "boolean", PostoupeniTxt = "string",}
	const enum GKrok1QuestionDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok1ElEvidenceDto {
		ChyboveDto?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		CestaKSouborum?: string|null;
		StavElPodani?: Gordic.Wfl.Interface.StavElPodaniEnum|null;
		OrigEmlEnabled?: boolean|null;
		OrigEmlHide?: boolean|null;
		OrigEml?: boolean|null;
		CestaKPuvodnimuRozlozeneZprave?: string|null;
		CestaKEml?: string|null;
		DZPole?: Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto|null;
		QuestionDto?: Gordic.Pod.WebControls.GKrok1QuestionDto|null;
		IsMailVMailu?: boolean|null;
		FileNameZpravaVeZprave?: string|null;
		ActionRozeberMailVMailuVisible?: boolean|null;
		SlozkaSouboruPodani?: string|null;
		ShowSlozkaPripona?: string|null;
		ZobrazovatKopie?: boolean|null;
		AntivirKomentorText?: string|null;
		AntivirKomentorColour?: string|null;
		IsMsgSigned?: string|null;
		ImgPodpisuZpravy?: string|null;
		ImgPodpisuZpravyTxt?: string|null;
		ImgOvereniPodpisu?: string|null;
		ImgOvereniPodpisuTxt?: string|null;
		BtPrevEnabled?: boolean|null;
		ZneviditelniPrvky?: boolean|null;
		PIDDokumentu?: string|null;
		Steps?: Gordic.Pod.WebControls.GEvidenceElPodaniStepsDto|null;
		/**	*/
		BtZobrazZpravuEnabled?: boolean|null;
		StavEPODPrijato?: Gordic.Pod.Interface.StavEPODPrijato|null;
		ReDSImg?: boolean|null;
		ReEmailImg?: boolean|null;
		RePisImg?: boolean|null;
		PaInfoVisible?: boolean|null;
		VygenerovanaOdpoved?: Gordic.Pod.WebControls.GEvidenceElPodaniGenerovatOdpovedDto|null;
		ProvedTestZpracovani?: boolean|null;
		IsPostoupeni?: boolean|null;
		EmailProp?: string|null;
		ZpracovatJakoMsgInMsg?: boolean|null;
		/**IsZverejneni*/
		IsZverejneni?: boolean|null;
		ParamAV?: string|null;
	}
	const enum GKrok1ElEvidenceDtoNames { ChyboveDto = "ChyboveDto", CestaKSouborum = "CestaKSouborum", StavElPodani = "StavElPodani", OrigEmlEnabled = "OrigEmlEnabled", OrigEmlHide = "OrigEmlHide", OrigEml = "OrigEml", CestaKPuvodnimuRozlozeneZprave = "CestaKPuvodnimuRozlozeneZprave", CestaKEml = "CestaKEml", DZPole = "DZPole", QuestionDto = "QuestionDto", IsMailVMailu = "IsMailVMailu", FileNameZpravaVeZprave = "FileNameZpravaVeZprave", ActionRozeberMailVMailuVisible = "ActionRozeberMailVMailuVisible", SlozkaSouboruPodani = "SlozkaSouboruPodani", ShowSlozkaPripona = "ShowSlozkaPripona", ZobrazovatKopie = "ZobrazovatKopie", AntivirKomentorText = "AntivirKomentorText", AntivirKomentorColour = "AntivirKomentorColour", IsMsgSigned = "IsMsgSigned", ImgPodpisuZpravy = "ImgPodpisuZpravy", ImgPodpisuZpravyTxt = "ImgPodpisuZpravyTxt", ImgOvereniPodpisu = "ImgOvereniPodpisu", ImgOvereniPodpisuTxt = "ImgOvereniPodpisuTxt", BtPrevEnabled = "BtPrevEnabled", ZneviditelniPrvky = "ZneviditelniPrvky", PIDDokumentu = "PIDDokumentu", Steps = "Steps", BtZobrazZpravuEnabled = "BtZobrazZpravuEnabled", StavEPODPrijato = "StavEPODPrijato", ReDSImg = "ReDSImg", ReEmailImg = "ReEmailImg", RePisImg = "RePisImg", PaInfoVisible = "PaInfoVisible", VygenerovanaOdpoved = "VygenerovanaOdpoved", ProvedTestZpracovani = "ProvedTestZpracovani", IsPostoupeni = "IsPostoupeni", EmailProp = "EmailProp", ZpracovatJakoMsgInMsg = "ZpracovatJakoMsgInMsg", IsZverejneni = "IsZverejneni", ParamAV = "ParamAV",}
	const enum GKrok1ElEvidenceDtoFragments { ChyboveDto = "*", CestaKSouborum = "*", StavElPodani = "*", OrigEmlEnabled = "*", OrigEmlHide = "*", OrigEml = "*", CestaKPuvodnimuRozlozeneZprave = "*", CestaKEml = "*", DZPole = "*", QuestionDto = "*", IsMailVMailu = "*", FileNameZpravaVeZprave = "*", ActionRozeberMailVMailuVisible = "*", SlozkaSouboruPodani = "*", ShowSlozkaPripona = "*", ZobrazovatKopie = "*", AntivirKomentorText = "*", AntivirKomentorColour = "*", IsMsgSigned = "*", ImgPodpisuZpravy = "*", ImgPodpisuZpravyTxt = "*", ImgOvereniPodpisu = "*", ImgOvereniPodpisuTxt = "*", BtPrevEnabled = "*", ZneviditelniPrvky = "*", PIDDokumentu = "*", Steps = "*", BtZobrazZpravuEnabled = "*", StavEPODPrijato = "*", ReDSImg = "*", ReEmailImg = "*", RePisImg = "*", PaInfoVisible = "*", VygenerovanaOdpoved = "*", ProvedTestZpracovani = "*", IsPostoupeni = "*", EmailProp = "*", ZpracovatJakoMsgInMsg = "*", IsZverejneni = "*", ParamAV = "*",}
	const enum GKrok1ElEvidenceDtoTypes { ChyboveDto = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", CestaKSouborum = "string", StavElPodani = "Gordic.Wfl.Interface.StavElPodaniEnum", OrigEmlEnabled = "boolean", OrigEmlHide = "boolean", OrigEml = "boolean", CestaKPuvodnimuRozlozeneZprave = "string", CestaKEml = "string", DZPole = "Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto", QuestionDto = "Gordic.Pod.WebControls.GKrok1QuestionDto", IsMailVMailu = "boolean", FileNameZpravaVeZprave = "string", ActionRozeberMailVMailuVisible = "boolean", SlozkaSouboruPodani = "string", ShowSlozkaPripona = "string", ZobrazovatKopie = "boolean", AntivirKomentorText = "string", AntivirKomentorColour = "string", IsMsgSigned = "string", ImgPodpisuZpravy = "string", ImgPodpisuZpravyTxt = "string", ImgOvereniPodpisu = "string", ImgOvereniPodpisuTxt = "string", BtPrevEnabled = "boolean", ZneviditelniPrvky = "boolean", PIDDokumentu = "string", Steps = "Gordic.Pod.WebControls.GEvidenceElPodaniStepsDto", BtZobrazZpravuEnabled = "boolean", StavEPODPrijato = "Gordic.Pod.Interface.StavEPODPrijato", ReDSImg = "boolean", ReEmailImg = "boolean", RePisImg = "boolean", PaInfoVisible = "boolean", VygenerovanaOdpoved = "Gordic.Pod.WebControls.GEvidenceElPodaniGenerovatOdpovedDto", ProvedTestZpracovani = "boolean", IsPostoupeni = "boolean", EmailProp = "string", ZpracovatJakoMsgInMsg = "boolean", IsZverejneni = "boolean", ParamAV = "string",}
	const enum GKrok1ElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniDZpoleDto {
		CjOdes?: string|null;
		SpZnOdes?: string|null;
		CjRec?: string|null;
		SpZnRec?: string|null;
		ObsahBase64?: string|null;
		EmailPuvodni?: string|null;
		IDUtvar?: string|null;
		Utvar?: string|null;
		IDUOdes?: string|null;
		UOdes?: string|null;
		KRukam?: string|null;
		ZakonRok?: string|null;
		ZakonCislo?: string|null;
		Paragraf?: string|null;
		Odstavec?: string|null;
		Pismeno?: string|null;
		DoVlRukou?: boolean|null;
		IsZpDorTypuDatavaZprava?: boolean|null;
	}
	const enum GEvidenceElPodaniDZpoleDtoNames { CjOdes = "CjOdes", SpZnOdes = "SpZnOdes", CjRec = "CjRec", SpZnRec = "SpZnRec", ObsahBase64 = "ObsahBase64", EmailPuvodni = "EmailPuvodni", IDUtvar = "IDUtvar", Utvar = "Utvar", IDUOdes = "IDUOdes", UOdes = "UOdes", KRukam = "KRukam", ZakonRok = "ZakonRok", ZakonCislo = "ZakonCislo", Paragraf = "Paragraf", Odstavec = "Odstavec", Pismeno = "Pismeno", DoVlRukou = "DoVlRukou", IsZpDorTypuDatavaZprava = "IsZpDorTypuDatavaZprava",}
	const enum GEvidenceElPodaniDZpoleDtoFragments { CjOdes = "*", SpZnOdes = "*", CjRec = "*", SpZnRec = "*", ObsahBase64 = "*", EmailPuvodni = "*", IDUtvar = "*", Utvar = "*", IDUOdes = "*", UOdes = "*", KRukam = "*", ZakonRok = "*", ZakonCislo = "*", Paragraf = "*", Odstavec = "*", Pismeno = "*", DoVlRukou = "*", IsZpDorTypuDatavaZprava = "*",}
	const enum GEvidenceElPodaniDZpoleDtoTypes { CjOdes = "string", SpZnOdes = "string", CjRec = "string", SpZnRec = "string", ObsahBase64 = "string", EmailPuvodni = "string", IDUtvar = "string", Utvar = "string", IDUOdes = "string", UOdes = "string", KRukam = "string", ZakonRok = "string", ZakonCislo = "string", Paragraf = "string", Odstavec = "string", Pismeno = "string", DoVlRukou = "boolean", IsZpDorTypuDatavaZprava = "boolean",}
	const enum GEvidenceElPodaniDZpoleDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniStepsDto {
		Krok1_IsOK?: boolean|null;
		Krok2_IsOK?: boolean|null;
		Krok3_IsOK?: boolean|null;
		Krok4_IsOK?: boolean|null;
		Krok5_IsOK?: boolean|null;
		Krok6_IsOK?: boolean|null;
	}
	const enum GEvidenceElPodaniStepsDtoNames { Krok1_IsOK = "Krok1_IsOK", Krok2_IsOK = "Krok2_IsOK", Krok3_IsOK = "Krok3_IsOK", Krok4_IsOK = "Krok4_IsOK", Krok5_IsOK = "Krok5_IsOK", Krok6_IsOK = "Krok6_IsOK",}
	const enum GEvidenceElPodaniStepsDtoFragments { Krok1_IsOK = "*", Krok2_IsOK = "*", Krok3_IsOK = "*", Krok4_IsOK = "*", Krok5_IsOK = "*", Krok6_IsOK = "*",}
	const enum GEvidenceElPodaniStepsDtoTypes { Krok1_IsOK = "boolean", Krok2_IsOK = "boolean", Krok3_IsOK = "boolean", Krok4_IsOK = "boolean", Krok5_IsOK = "boolean", Krok6_IsOK = "boolean",}
	const enum GEvidenceElPodaniStepsDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniGenerovatOdpovedDto {
		ChyboveDto?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		GenerovaniOdpovedi?: boolean|null;
		IsZverejneni?: boolean|null;
		DSOdDropDown?: Gordic.Pod.WebControls.GEvidenceElPodaniDSOdDropDownDto|null;
		NoCbx?: boolean|null;
		NoCbxDisabled?: boolean|null;
		DSCbx?: boolean|null;
		PisCbx?: boolean|null;
		EmailCbx?: boolean|null;
		BtNextEnabled?: boolean|null;
		BtPrevEnabled?: boolean|null;
		EmailProp?: string|null;
		IDUOdes?: string|null;
		UOdes?: string|null;
		OdesZastLic?: string|null;
		OdesZastPor?: number|null;
		OdesIxs?: string|null;
		IdentOdes?: string|null;
		OdpEmail?: string|null;
		OdesIDDS?: string|null;
		MaxSizeEmail?: number|null;
		MaxSizeIdDz?: number|null;
		ActionTiskPruvodky?: boolean|null;
		X0000?: string|null;
		X0001?: string|null;
		X0002?: string|null;
		PodaniByloZaregistrovano?: boolean|null;
		ZpusDor?: number|null;
		TextPotvrz?: string|null;
		PodaniByloOdmitnuto?: string|null;
	}
	const enum GEvidenceElPodaniGenerovatOdpovedDtoNames { ChyboveDto = "ChyboveDto", GenerovaniOdpovedi = "GenerovaniOdpovedi", IsZverejneni = "IsZverejneni", DSOdDropDown = "DSOdDropDown", NoCbx = "NoCbx", NoCbxDisabled = "NoCbxDisabled", DSCbx = "DSCbx", PisCbx = "PisCbx", EmailCbx = "EmailCbx", BtNextEnabled = "BtNextEnabled", BtPrevEnabled = "BtPrevEnabled", EmailProp = "EmailProp", IDUOdes = "IDUOdes", UOdes = "UOdes", OdesZastLic = "OdesZastLic", OdesZastPor = "OdesZastPor", OdesIxs = "OdesIxs", IdentOdes = "IdentOdes", OdpEmail = "OdpEmail", OdesIDDS = "OdesIDDS", MaxSizeEmail = "MaxSizeEmail", MaxSizeIdDz = "MaxSizeIdDz", ActionTiskPruvodky = "ActionTiskPruvodky", X0000 = "X0000", X0001 = "X0001", X0002 = "X0002", PodaniByloZaregistrovano = "PodaniByloZaregistrovano", ZpusDor = "ZpusDor", TextPotvrz = "TextPotvrz", PodaniByloOdmitnuto = "PodaniByloOdmitnuto",}
	const enum GEvidenceElPodaniGenerovatOdpovedDtoFragments { ChyboveDto = "*", GenerovaniOdpovedi = "*", IsZverejneni = "*", DSOdDropDown = "*", NoCbx = "*", NoCbxDisabled = "*", DSCbx = "*", PisCbx = "*", EmailCbx = "*", BtNextEnabled = "*", BtPrevEnabled = "*", EmailProp = "*", IDUOdes = "*", UOdes = "*", OdesZastLic = "*", OdesZastPor = "*", OdesIxs = "*", IdentOdes = "*", OdpEmail = "*", OdesIDDS = "*", MaxSizeEmail = "*", MaxSizeIdDz = "*", ActionTiskPruvodky = "*", X0000 = "*", X0001 = "*", X0002 = "*", PodaniByloZaregistrovano = "*", ZpusDor = "*", TextPotvrz = "*", PodaniByloOdmitnuto = "*",}
	const enum GEvidenceElPodaniGenerovatOdpovedDtoTypes { ChyboveDto = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", GenerovaniOdpovedi = "boolean", IsZverejneni = "boolean", DSOdDropDown = "Gordic.Pod.WebControls.GEvidenceElPodaniDSOdDropDownDto", NoCbx = "boolean", NoCbxDisabled = "boolean", DSCbx = "boolean", PisCbx = "boolean", EmailCbx = "boolean", BtNextEnabled = "boolean", BtPrevEnabled = "boolean", EmailProp = "string", IDUOdes = "string", UOdes = "string", OdesZastLic = "string", OdesZastPor = "number", OdesIxs = "string", IdentOdes = "string", OdpEmail = "string", OdesIDDS = "string", MaxSizeEmail = "number", MaxSizeIdDz = "number", ActionTiskPruvodky = "boolean", X0000 = "string", X0001 = "string", X0002 = "string", PodaniByloZaregistrovano = "boolean", ZpusDor = "number", TextPotvrz = "string", PodaniByloOdmitnuto = "string",}
	const enum GEvidenceElPodaniGenerovatOdpovedDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniGenerovatOdpovedInputDto {
		IsZverejneni?: boolean|null;
		ZpusDor?: number|null;
		EmailProp?: string|null;
	}
	const enum GEvidenceElPodaniGenerovatOdpovedInputDtoNames { IsZverejneni = "IsZverejneni", ZpusDor = "ZpusDor", EmailProp = "EmailProp",}
	const enum GEvidenceElPodaniGenerovatOdpovedInputDtoFragments { IsZverejneni = "*", ZpusDor = "*", EmailProp = "*",}
	const enum GEvidenceElPodaniGenerovatOdpovedInputDtoTypes { IsZverejneni = "boolean", ZpusDor = "number", EmailProp = "string",}
	const enum GEvidenceElPodaniGenerovatOdpovedInputDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniDSOdDropDownDto {
		Data?: any|null;
		SelectedValue?: string|null;
		Tooltip?: string|null;
	}
	const enum GEvidenceElPodaniDSOdDropDownDtoNames { Data = "Data", SelectedValue = "SelectedValue", Tooltip = "Tooltip",}
	const enum GEvidenceElPodaniDSOdDropDownDtoFragments { Data = "*", SelectedValue = "*", Tooltip = "*",}
	const enum GEvidenceElPodaniDSOdDropDownDtoTypes { Data = "any", SelectedValue = "string", Tooltip = "string",}
	const enum GEvidenceElPodaniDSOdDropDownDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniTypZpracovaniDto {
		ZpusDor?: number|null;
		CestaKEml?: string|null;
		IsOdpoved?: boolean|null;
		ShowQuestion?: boolean|null;
		Question?: string|null;
		OdpovedUzivatele?: boolean|null;
		HlaskaInfo?: string|null;
		IfCloseForm?: boolean|null;
		RefreshStavu?: boolean|null;
		HlaskaWarning?: string|null;
		CloseAndOdemknout?: boolean|null;
		Pokracuj?: boolean|null;
		ZpracovatJakoMsgInMsg?: boolean|null;
	}
	const enum GEvidenceElPodaniTypZpracovaniDtoNames { ZpusDor = "ZpusDor", CestaKEml = "CestaKEml", IsOdpoved = "IsOdpoved", ShowQuestion = "ShowQuestion", Question = "Question", OdpovedUzivatele = "OdpovedUzivatele", HlaskaInfo = "HlaskaInfo", IfCloseForm = "IfCloseForm", RefreshStavu = "RefreshStavu", HlaskaWarning = "HlaskaWarning", CloseAndOdemknout = "CloseAndOdemknout", Pokracuj = "Pokracuj", ZpracovatJakoMsgInMsg = "ZpracovatJakoMsgInMsg",}
	const enum GEvidenceElPodaniTypZpracovaniDtoFragments { ZpusDor = "*", CestaKEml = "*", IsOdpoved = "*", ShowQuestion = "*", Question = "*", OdpovedUzivatele = "*", HlaskaInfo = "*", IfCloseForm = "*", RefreshStavu = "*", HlaskaWarning = "*", CloseAndOdemknout = "*", Pokracuj = "*", ZpracovatJakoMsgInMsg = "*",}
	const enum GEvidenceElPodaniTypZpracovaniDtoTypes { ZpusDor = "number", CestaKEml = "string", IsOdpoved = "boolean", ShowQuestion = "boolean", Question = "string", OdpovedUzivatele = "boolean", HlaskaInfo = "string", IfCloseForm = "boolean", RefreshStavu = "boolean", HlaskaWarning = "string", CloseAndOdemknout = "boolean", Pokracuj = "boolean", ZpracovatJakoMsgInMsg = "boolean",}
	const enum GEvidenceElPodaniTypZpracovaniDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok2InputElEvidenceDto extends Gordic.Pod.WebControls.GKrokPredekInputElEvidenceDto {
		ParamAV?: string|null;
		OrigEml?: boolean|null;
	}
	const enum GKrok2InputElEvidenceDtoNames { ParamAV = "ParamAV", OrigEml = "OrigEml", ZpusDor = "ZpusDor", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GKrok2InputElEvidenceDtoFragments { ParamAV = "*", OrigEml = "*", ZpusDor = "*", JeAntivir = "*", NoAntivir = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GKrok2InputElEvidenceDtoTypes { ParamAV = "string", OrigEml = "boolean", ZpusDor = "number", JeAntivir = "string", NoAntivir = "string", MuzeBytZpravaOriginalem = "boolean",}
	const enum GKrok2InputElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok2ElEvidenceDto {
		Pokracuj?: boolean|null;
		GridDto?: Gordic.Pod.WebControls.GElEvidenceGridDto|null;
		AntivirKomentorVisible?: boolean|null;
		NejsouViryVisible?: boolean|null;
		ZavirovanoKrok2?: boolean|null;
	}
	const enum GKrok2ElEvidenceDtoNames { Pokracuj = "Pokracuj", GridDto = "GridDto", AntivirKomentorVisible = "AntivirKomentorVisible", NejsouViryVisible = "NejsouViryVisible", ZavirovanoKrok2 = "ZavirovanoKrok2",}
	const enum GKrok2ElEvidenceDtoFragments { Pokracuj = "*", GridDto = "*", AntivirKomentorVisible = "*", NejsouViryVisible = "*", ZavirovanoKrok2 = "*",}
	const enum GKrok2ElEvidenceDtoTypes { Pokracuj = "boolean", GridDto = "Gordic.Pod.WebControls.GElEvidenceGridDto", AntivirKomentorVisible = "boolean", NejsouViryVisible = "boolean", ZavirovanoKrok2 = "boolean",}
	const enum GKrok2ElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok3InputElEvidenceDto extends Gordic.Pod.WebControls.GKrokPredekInputElEvidenceDto {
		OrigEml?: boolean|null;
		IsMsgSigned?: string|null;
	}
	const enum GKrok3InputElEvidenceDtoNames { OrigEml = "OrigEml", IsMsgSigned = "IsMsgSigned", ZpusDor = "ZpusDor", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GKrok3InputElEvidenceDtoFragments { OrigEml = "*", IsMsgSigned = "*", ZpusDor = "*", JeAntivir = "*", NoAntivir = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GKrok3InputElEvidenceDtoTypes { OrigEml = "boolean", IsMsgSigned = "string", ZpusDor = "number", JeAntivir = "string", NoAntivir = "string", MuzeBytZpravaOriginalem = "boolean",}
	const enum GKrok3InputElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok3ElEvidenceDto {
		Hlasky?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		Pokracuj?: boolean|null;
		GridDto?: Gordic.Pod.WebControls.GElEvidenceGridDto|null;
		OrigEmlEnabled?: boolean|null;
		OrigEml?: boolean|null;
		MuzeBytZpravaOriginalem?: boolean|null;
		OrigEmlAddTST?: Gordic.Pod.WebControls.GElEvidenceOrigEmlAddTSTDto|null;
		ChybaVprilohach?: boolean|null;
		UpozorneniVprilohach?: boolean|null;
		KontrolaFormatuIsOK?: boolean|null;
		/**VynutitOriginal*/
		VynutitOriginal?: boolean|null;
	}
	const enum GKrok3ElEvidenceDtoNames { Hlasky = "Hlasky", Pokracuj = "Pokracuj", GridDto = "GridDto", OrigEmlEnabled = "OrigEmlEnabled", OrigEml = "OrigEml", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem", OrigEmlAddTST = "OrigEmlAddTST", ChybaVprilohach = "ChybaVprilohach", UpozorneniVprilohach = "UpozorneniVprilohach", KontrolaFormatuIsOK = "KontrolaFormatuIsOK", VynutitOriginal = "VynutitOriginal",}
	const enum GKrok3ElEvidenceDtoFragments { Hlasky = "*", Pokracuj = "*", GridDto = "*", OrigEmlEnabled = "*", OrigEml = "*", MuzeBytZpravaOriginalem = "*", OrigEmlAddTST = "*", ChybaVprilohach = "*", UpozorneniVprilohach = "*", KontrolaFormatuIsOK = "*", VynutitOriginal = "*",}
	const enum GKrok3ElEvidenceDtoTypes { Hlasky = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", Pokracuj = "boolean", GridDto = "Gordic.Pod.WebControls.GElEvidenceGridDto", OrigEmlEnabled = "boolean", OrigEml = "boolean", MuzeBytZpravaOriginalem = "boolean", OrigEmlAddTST = "Gordic.Pod.WebControls.GElEvidenceOrigEmlAddTSTDto", ChybaVprilohach = "boolean", UpozorneniVprilohach = "boolean", KontrolaFormatuIsOK = "boolean", VynutitOriginal = "boolean",}
	const enum GKrok3ElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok4InputElEvidenceDto extends Gordic.Pod.WebControls.GKrokPredekInputElEvidenceDto {
		OrigEml?: boolean|null;
		KontrolovanoHash?: boolean|null;
		StavElPodani?: Gordic.Wfl.Interface.StavElPodaniEnum|null;
	}
	const enum GKrok4InputElEvidenceDtoNames { OrigEml = "OrigEml", KontrolovanoHash = "KontrolovanoHash", StavElPodani = "StavElPodani", ZpusDor = "ZpusDor", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GKrok4InputElEvidenceDtoFragments { OrigEml = "*", KontrolovanoHash = "*", StavElPodani = "*", ZpusDor = "*", JeAntivir = "*", NoAntivir = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GKrok4InputElEvidenceDtoTypes { OrigEml = "boolean", KontrolovanoHash = "boolean", StavElPodani = "Gordic.Wfl.Interface.StavElPodaniEnum", ZpusDor = "number", JeAntivir = "string", NoAntivir = "string", MuzeBytZpravaOriginalem = "boolean",}
	const enum GKrok4InputElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok4ElEvidenceDto {
		Pokracuj?: boolean|null;
		ButtonNextEnable?: boolean|null;
		GridDto?: Gordic.Pod.WebControls.GElEvidenceGridDto|null;
		TypOvereniPodpisu?: string|null;
		NonFatalException?: string|null;
		PocetOriginaluJeVetsi?: boolean|null;
		KontrolovanoHash?: boolean|null;
		/**Gets or sets the kontrolovano hash dok spis list dto.*/
		KontrolovanoHashDokSpisListDto?: Gordic.Wfl.Interface.DokSpisListDto[]|null;
	}
	const enum GKrok4ElEvidenceDtoNames { Pokracuj = "Pokracuj", ButtonNextEnable = "ButtonNextEnable", GridDto = "GridDto", TypOvereniPodpisu = "TypOvereniPodpisu", NonFatalException = "NonFatalException", PocetOriginaluJeVetsi = "PocetOriginaluJeVetsi", KontrolovanoHash = "KontrolovanoHash", KontrolovanoHashDokSpisListDto = "KontrolovanoHashDokSpisListDto",}
	const enum GKrok4ElEvidenceDtoFragments { Pokracuj = "*", ButtonNextEnable = "*", GridDto = "*", TypOvereniPodpisu = "*", NonFatalException = "*", PocetOriginaluJeVetsi = "*", KontrolovanoHash = "*", KontrolovanoHashDokSpisListDto = "*",}
	const enum GKrok4ElEvidenceDtoTypes { Pokracuj = "boolean", ButtonNextEnable = "boolean", GridDto = "Gordic.Pod.WebControls.GElEvidenceGridDto", TypOvereniPodpisu = "string", NonFatalException = "string", PocetOriginaluJeVetsi = "boolean", KontrolovanoHash = "boolean", KontrolovanoHashDokSpisListDto = "Gordic.Wfl.Interface.DokSpisListDto[]",}
	const enum GKrok4ElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok5InputElEvidenceDto extends Gordic.Pod.WebControls.GKrokPredekInputElEvidenceDto {
		OrigEml?: boolean|null;
		EmailProp?: string|null;
		RucniOvereni?: Gordic.Pod.WebControls.GRucniOvereniPodpisuElEvidenceDto|null;
		IDUOdes?: string|null;
		UOdes?: string|null;
		HodZFormChecked?: boolean|null;
		HodZFormPdf?: boolean|null;
		UpozorneniNaNeexistujiciESU?: boolean|null;
		IsMsgSigned?: string|null;
		DZPole?: Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto|null;
	}
	const enum GKrok5InputElEvidenceDtoNames { OrigEml = "OrigEml", EmailProp = "EmailProp", RucniOvereni = "RucniOvereni", IDUOdes = "IDUOdes", UOdes = "UOdes", HodZFormChecked = "HodZFormChecked", HodZFormPdf = "HodZFormPdf", UpozorneniNaNeexistujiciESU = "UpozorneniNaNeexistujiciESU", IsMsgSigned = "IsMsgSigned", DZPole = "DZPole", ZpusDor = "ZpusDor", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GKrok5InputElEvidenceDtoFragments { OrigEml = "*", EmailProp = "*", RucniOvereni = "*", IDUOdes = "*", UOdes = "*", HodZFormChecked = "*", HodZFormPdf = "*", UpozorneniNaNeexistujiciESU = "*", IsMsgSigned = "*", DZPole = "*", ZpusDor = "*", JeAntivir = "*", NoAntivir = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GKrok5InputElEvidenceDtoTypes { OrigEml = "boolean", EmailProp = "string", RucniOvereni = "Gordic.Pod.WebControls.GRucniOvereniPodpisuElEvidenceDto", IDUOdes = "string", UOdes = "string", HodZFormChecked = "boolean", HodZFormPdf = "boolean", UpozorneniNaNeexistujiciESU = "boolean", IsMsgSigned = "string", DZPole = "Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto", ZpusDor = "number", JeAntivir = "string", NoAntivir = "string", MuzeBytZpravaOriginalem = "boolean",}
	const enum GKrok5InputElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok5ElEvidenceDto {
		Hlasky?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		Pokracuj?: boolean|null;
		GridDto?: Gordic.Pod.WebControls.GElEvidenceGridDto|null;
		HodnotyZFormuVisible?: boolean|null;
		BtNextEnabled?: boolean|null;
		/**Gets or sets the stav podano.*/
		StavEPODPrijato?: Gordic.Pod.Interface.StavEPODPrijato|null;
		ImgPodpisuZpravy?: string|null;
		ImgPodpisuZpravyTxt?: string|null;
		ImgOvereniPodpisu?: string|null;
		ImgOvereniPodpisuTxt?: string|null;
		Odesilatel?: Gordic.Pod.WebControls.GOdesilatelElEvidenceDto|null;
		/**Gets or sets the vlastnosti.*/
		Vlastnosti?: Gordic.Pod.WebControls.GElEvidenceVlastnostiDto[]|null;
		EmailLabelText?: string|null;
		Email?: string|null;
		OdesIDDS?: string|null;
		OdpEmail?: string|null;
		EmailMaxLength?: number|null;
		OdesIDDSMaxLength?: number|null;
		OdpEmailMaxLength?: number|null;
		HodZFormChecked?: boolean|null;
		HodZFormPdf?: boolean|null;
		ImageFormVytezenePdfToolTip?: string|null;
		/**vytezene vlastnosti z PDF*/
		FormularVlastnosti?: Gordic.Pod.WebControls.GElEvidenceVlastnostiDto[]|null;
		/**VlastnostiDataSet zde pouze pro přenos v interní funkci, jinak  na konci vymazat před selrializací*/
		VlastnostiDataSet?: any|null;
		IxsTypForm?: string|null;
		OrigEmlAddTST?: Gordic.Pod.WebControls.GElEvidenceOrigEmlAddTSTDto|null;
		VygenerovanaOdpoved?: Gordic.Pod.WebControls.GEvidenceElPodaniGenerovatOdpovedDto|null;
	}
	const enum GKrok5ElEvidenceDtoNames { Hlasky = "Hlasky", Pokracuj = "Pokracuj", GridDto = "GridDto", HodnotyZFormuVisible = "HodnotyZFormuVisible", BtNextEnabled = "BtNextEnabled", StavEPODPrijato = "StavEPODPrijato", ImgPodpisuZpravy = "ImgPodpisuZpravy", ImgPodpisuZpravyTxt = "ImgPodpisuZpravyTxt", ImgOvereniPodpisu = "ImgOvereniPodpisu", ImgOvereniPodpisuTxt = "ImgOvereniPodpisuTxt", Odesilatel = "Odesilatel", Vlastnosti = "Vlastnosti", EmailLabelText = "EmailLabelText", Email = "Email", OdesIDDS = "OdesIDDS", OdpEmail = "OdpEmail", EmailMaxLength = "EmailMaxLength", OdesIDDSMaxLength = "OdesIDDSMaxLength", OdpEmailMaxLength = "OdpEmailMaxLength", HodZFormChecked = "HodZFormChecked", HodZFormPdf = "HodZFormPdf", ImageFormVytezenePdfToolTip = "ImageFormVytezenePdfToolTip", FormularVlastnosti = "FormularVlastnosti", VlastnostiDataSet = "VlastnostiDataSet", IxsTypForm = "IxsTypForm", OrigEmlAddTST = "OrigEmlAddTST", VygenerovanaOdpoved = "VygenerovanaOdpoved",}
	const enum GKrok5ElEvidenceDtoFragments { Hlasky = "*", Pokracuj = "*", GridDto = "*", HodnotyZFormuVisible = "*", BtNextEnabled = "*", StavEPODPrijato = "*", ImgPodpisuZpravy = "*", ImgPodpisuZpravyTxt = "*", ImgOvereniPodpisu = "*", ImgOvereniPodpisuTxt = "*", Odesilatel = "*", Vlastnosti = "*", EmailLabelText = "*", Email = "*", OdesIDDS = "*", OdpEmail = "*", EmailMaxLength = "*", OdesIDDSMaxLength = "*", OdpEmailMaxLength = "*", HodZFormChecked = "*", HodZFormPdf = "*", ImageFormVytezenePdfToolTip = "*", FormularVlastnosti = "*", VlastnostiDataSet = "*", IxsTypForm = "*", OrigEmlAddTST = "*", VygenerovanaOdpoved = "*",}
	const enum GKrok5ElEvidenceDtoTypes { Hlasky = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", Pokracuj = "boolean", GridDto = "Gordic.Pod.WebControls.GElEvidenceGridDto", HodnotyZFormuVisible = "boolean", BtNextEnabled = "boolean", StavEPODPrijato = "Gordic.Pod.Interface.StavEPODPrijato", ImgPodpisuZpravy = "string", ImgPodpisuZpravyTxt = "string", ImgOvereniPodpisu = "string", ImgOvereniPodpisuTxt = "string", Odesilatel = "Gordic.Pod.WebControls.GOdesilatelElEvidenceDto", Vlastnosti = "Gordic.Pod.WebControls.GElEvidenceVlastnostiDto[]", EmailLabelText = "string", Email = "string", OdesIDDS = "string", OdpEmail = "string", EmailMaxLength = "number", OdesIDDSMaxLength = "number", OdpEmailMaxLength = "number", HodZFormChecked = "boolean", HodZFormPdf = "boolean", ImageFormVytezenePdfToolTip = "string", FormularVlastnosti = "Gordic.Pod.WebControls.GElEvidenceVlastnostiDto[]", VlastnostiDataSet = "any", IxsTypForm = "string", OrigEmlAddTST = "Gordic.Pod.WebControls.GElEvidenceOrigEmlAddTSTDto", VygenerovanaOdpoved = "Gordic.Pod.WebControls.GEvidenceElPodaniGenerovatOdpovedDto",}
	const enum GKrok5ElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GRucniOvereniPodpisuElEvidenceDto {
		JeSignRuc?: boolean|null;
		JeCasRazRuc?: boolean|null;
		JeOkSignRuc?: boolean|null;
		JeOkCasRazRuc?: boolean|null;
		PrizVerif?: Gordic.Wfl.Interface.PrizVerif|null;
		PrizVerifCasRaz?: Gordic.Wfl.Interface.PrizVerif|null;
		PrizVerifText?: string|null;
		PrizVerifCasRazText?: string|null;
		StavVerif?: Gordic.Wfl.Interface.StavVerif|null;
		StavVerifCasRaz?: Gordic.Wfl.Interface.StavVerif|null;
		StavVerifText?: string|null;
		StavVerifCasRazText?: string|null;
	}
	const enum GRucniOvereniPodpisuElEvidenceDtoNames { JeSignRuc = "JeSignRuc", JeCasRazRuc = "JeCasRazRuc", JeOkSignRuc = "JeOkSignRuc", JeOkCasRazRuc = "JeOkCasRazRuc", PrizVerif = "PrizVerif", PrizVerifCasRaz = "PrizVerifCasRaz", PrizVerifText = "PrizVerifText", PrizVerifCasRazText = "PrizVerifCasRazText", StavVerif = "StavVerif", StavVerifCasRaz = "StavVerifCasRaz", StavVerifText = "StavVerifText", StavVerifCasRazText = "StavVerifCasRazText",}
	const enum GRucniOvereniPodpisuElEvidenceDtoFragments { JeSignRuc = "*", JeCasRazRuc = "*", JeOkSignRuc = "*", JeOkCasRazRuc = "*", PrizVerif = "*", PrizVerifCasRaz = "*", PrizVerifText = "*", PrizVerifCasRazText = "*", StavVerif = "*", StavVerifCasRaz = "*", StavVerifText = "*", StavVerifCasRazText = "*",}
	const enum GRucniOvereniPodpisuElEvidenceDtoTypes { JeSignRuc = "boolean", JeCasRazRuc = "boolean", JeOkSignRuc = "boolean", JeOkCasRazRuc = "boolean", PrizVerif = "Gordic.Wfl.Interface.PrizVerif", PrizVerifCasRaz = "Gordic.Wfl.Interface.PrizVerif", PrizVerifText = "string", PrizVerifCasRazText = "string", StavVerif = "Gordic.Wfl.Interface.StavVerif", StavVerifCasRaz = "Gordic.Wfl.Interface.StavVerif", StavVerifText = "string", StavVerifCasRazText = "string",}
	const enum GRucniOvereniPodpisuElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GOdesilatelElEvidenceDto {
		Ixp?: string|null;
		IxsEsu?: string|null;
		Hlasky?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		IdentOdes?: string|null;
		OdesZastPor?: number|null;
		OdesZastLic?: string|null;
		DetailMailDefault?: string|null;
		DetailDefaultRow?: any|null;
		DotcSubjInfoKanal?: string|null;
		OtevriInfoKanal?: boolean|null;
		InfoKanalVisible?: boolean|null;
		Telefon?: string|null;
		EmailPuvodni?: string|null;
		EmailProp?: string|null;
		OdesIDDS?: string|null;
		Email?: string|null;
		OdpEmail?: string|null;
		DosloKeZmenenVEmailPropOdesIDDSEmail?: boolean|null;
		DosloKeZmenenVEmailPropOdpEmailEmail?: boolean|null;
	}
	const enum GOdesilatelElEvidenceDtoNames { Ixp = "Ixp", IxsEsu = "IxsEsu", Hlasky = "Hlasky", IdentOdes = "IdentOdes", OdesZastPor = "OdesZastPor", OdesZastLic = "OdesZastLic", DetailMailDefault = "DetailMailDefault", DetailDefaultRow = "DetailDefaultRow", DotcSubjInfoKanal = "DotcSubjInfoKanal", OtevriInfoKanal = "OtevriInfoKanal", InfoKanalVisible = "InfoKanalVisible", Telefon = "Telefon", EmailPuvodni = "EmailPuvodni", EmailProp = "EmailProp", OdesIDDS = "OdesIDDS", Email = "Email", OdpEmail = "OdpEmail", DosloKeZmenenVEmailPropOdesIDDSEmail = "DosloKeZmenenVEmailPropOdesIDDSEmail", DosloKeZmenenVEmailPropOdpEmailEmail = "DosloKeZmenenVEmailPropOdpEmailEmail",}
	const enum GOdesilatelElEvidenceDtoFragments { Ixp = "*", IxsEsu = "*", Hlasky = "*", IdentOdes = "*", OdesZastPor = "*", OdesZastLic = "*", DetailMailDefault = "*", DetailDefaultRow = "*", DotcSubjInfoKanal = "*", OtevriInfoKanal = "*", InfoKanalVisible = "*", Telefon = "*", EmailPuvodni = "*", EmailProp = "*", OdesIDDS = "*", Email = "*", OdpEmail = "*", DosloKeZmenenVEmailPropOdesIDDSEmail = "*", DosloKeZmenenVEmailPropOdpEmailEmail = "*",}
	const enum GOdesilatelElEvidenceDtoTypes { Ixp = "string", IxsEsu = "string", Hlasky = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", IdentOdes = "string", OdesZastPor = "number", OdesZastLic = "string", DetailMailDefault = "string", DetailDefaultRow = "any", DotcSubjInfoKanal = "string", OtevriInfoKanal = "boolean", InfoKanalVisible = "boolean", Telefon = "string", EmailPuvodni = "string", EmailProp = "string", OdesIDDS = "string", Email = "string", OdpEmail = "string", DosloKeZmenenVEmailPropOdesIDDSEmail = "boolean", DosloKeZmenenVEmailPropOdpEmailEmail = "boolean",}
	const enum GOdesilatelElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok6InputElEvidenceDto extends Gordic.Pod.WebControls.GKrokPredekInputElEvidenceDto {
		OrigEml?: boolean|null;
		/**TypPis*/
		TypPis?: string|null;
		/**Gets or sets the stav podano.*/
		StavEPODPrijato?: Gordic.Pod.Interface.StavEPODPrijato|null;
		HodZFormChecked?: boolean|null;
		HodZFormPdf?: boolean|null;
		EmailProp?: string|null;
		IDUOdes?: string|null;
		UOdes?: string|null;
		UpozorneniNaNeexistujiciESU?: boolean|null;
		IxsTypForm?: string|null;
		ZastTxt?: string|null;
		DotcSubjInfoKanal?: string|null;
		VybraneSoubory?: Gordic.Pod.Interface.GElPodaniPrilohyStrukturovaneDto[]|null;
		ChechedOrigEmlAddTST?: boolean|null;
		DZPole?: Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto|null;
		Odesilatel?: Gordic.Pod.WebControls.GOdesilatelElEvidenceDto|null;
		/**vytezene vlastnosti z PDF*/
		FormularVlastnosti?: Gordic.Pod.WebControls.GElEvidenceVlastnostiDto[]|null;
	}
	const enum GKrok6InputElEvidenceDtoNames { OrigEml = "OrigEml", TypPis = "TypPis", StavEPODPrijato = "StavEPODPrijato", HodZFormChecked = "HodZFormChecked", HodZFormPdf = "HodZFormPdf", EmailProp = "EmailProp", IDUOdes = "IDUOdes", UOdes = "UOdes", UpozorneniNaNeexistujiciESU = "UpozorneniNaNeexistujiciESU", IxsTypForm = "IxsTypForm", ZastTxt = "ZastTxt", DotcSubjInfoKanal = "DotcSubjInfoKanal", VybraneSoubory = "VybraneSoubory", ChechedOrigEmlAddTST = "ChechedOrigEmlAddTST", DZPole = "DZPole", Odesilatel = "Odesilatel", FormularVlastnosti = "FormularVlastnosti", ZpusDor = "ZpusDor", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GKrok6InputElEvidenceDtoFragments { OrigEml = "*", TypPis = "*", StavEPODPrijato = "*", HodZFormChecked = "*", HodZFormPdf = "*", EmailProp = "*", IDUOdes = "*", UOdes = "*", UpozorneniNaNeexistujiciESU = "*", IxsTypForm = "*", ZastTxt = "*", DotcSubjInfoKanal = "*", VybraneSoubory = "*", ChechedOrigEmlAddTST = "*", DZPole = "*", Odesilatel = "*", FormularVlastnosti = "*", ZpusDor = "*", JeAntivir = "*", NoAntivir = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GKrok6InputElEvidenceDtoTypes { OrigEml = "boolean", TypPis = "string", StavEPODPrijato = "Gordic.Pod.Interface.StavEPODPrijato", HodZFormChecked = "boolean", HodZFormPdf = "boolean", EmailProp = "string", IDUOdes = "string", UOdes = "string", UpozorneniNaNeexistujiciESU = "boolean", IxsTypForm = "string", ZastTxt = "string", DotcSubjInfoKanal = "string", VybraneSoubory = "Gordic.Pod.Interface.GElPodaniPrilohyStrukturovaneDto[]", ChechedOrigEmlAddTST = "boolean", DZPole = "Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto", Odesilatel = "Gordic.Pod.WebControls.GOdesilatelElEvidenceDto", FormularVlastnosti = "Gordic.Pod.WebControls.GElEvidenceVlastnostiDto[]", ZpusDor = "number", JeAntivir = "string", NoAntivir = "string", MuzeBytZpravaOriginalem = "boolean",}
	const enum GKrok6InputElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GKrok6ElEvidenceDto {
		Hlasky?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		NeniOznacenOriginal?: boolean|null;
		Stoped?: boolean|null;
		/**ChyboveDto*/
		ChyboveDto?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		Odesilatel?: Gordic.Pod.WebControls.GOdesilatelElEvidenceDto|null;
		OdesilatelNedopadl?: boolean|null;
		RefreshStavu?: boolean|null;
		PIDDokumentu?: string|null;
		StornoPodani?: boolean|null;
		SpustitOpravuPodani?: boolean|null;
		NabidkaKonverze?: number|null;
		VygenerovanaOdpoved?: Gordic.Pod.WebControls.GEvidenceElPodaniGenerovatOdpovedDto|null;
		MLKlasifikacniDto?: Gordic.Wfl.Interface.GMLRozborPodaniKlasifikaceOutoputDto|null;
		ModFormuPodaniEnum?: Gordic.Pod.Interface.ModFormuPodaniEnum|null;
		SuFunRefDto?: Gordic.Wfl.Interface.GSuFunRefDto|null;
	}
	const enum GKrok6ElEvidenceDtoNames { Hlasky = "Hlasky", NeniOznacenOriginal = "NeniOznacenOriginal", Stoped = "Stoped", ChyboveDto = "ChyboveDto", Odesilatel = "Odesilatel", OdesilatelNedopadl = "OdesilatelNedopadl", RefreshStavu = "RefreshStavu", PIDDokumentu = "PIDDokumentu", StornoPodani = "StornoPodani", SpustitOpravuPodani = "SpustitOpravuPodani", NabidkaKonverze = "NabidkaKonverze", VygenerovanaOdpoved = "VygenerovanaOdpoved", MLKlasifikacniDto = "MLKlasifikacniDto", ModFormuPodaniEnum = "ModFormuPodaniEnum", SuFunRefDto = "SuFunRefDto",}
	const enum GKrok6ElEvidenceDtoFragments { Hlasky = "*", NeniOznacenOriginal = "*", Stoped = "*", ChyboveDto = "*", Odesilatel = "*", OdesilatelNedopadl = "*", RefreshStavu = "*", PIDDokumentu = "*", StornoPodani = "*", SpustitOpravuPodani = "*", NabidkaKonverze = "*", VygenerovanaOdpoved = "*", MLKlasifikacniDto = "*", ModFormuPodaniEnum = "*", SuFunRefDto = "*",}
	const enum GKrok6ElEvidenceDtoTypes { Hlasky = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", NeniOznacenOriginal = "boolean", Stoped = "boolean", ChyboveDto = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", Odesilatel = "Gordic.Pod.WebControls.GOdesilatelElEvidenceDto", OdesilatelNedopadl = "boolean", RefreshStavu = "boolean", PIDDokumentu = "string", StornoPodani = "boolean", SpustitOpravuPodani = "boolean", NabidkaKonverze = "number", VygenerovanaOdpoved = "Gordic.Pod.WebControls.GEvidenceElPodaniGenerovatOdpovedDto", MLKlasifikacniDto = "Gordic.Wfl.Interface.GMLRozborPodaniKlasifikaceOutoputDto", ModFormuPodaniEnum = "Gordic.Pod.Interface.ModFormuPodaniEnum", SuFunRefDto = "Gordic.Wfl.Interface.GSuFunRefDto",}
	const enum GKrok6ElEvidenceDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GElEvidenceGridDto {
		OrigEmlEnabled?: boolean|null;
		OrigEml?: boolean|null;
		PaSouboryVisible?: boolean|null;
		MultiSelectAddCasRaz?: boolean|null;
		Data?: Gordic.Pod.Interface.GElPodaniPrilohyStrukturovaneDto[]|null;
		Label?: string|null;
		TypZobrazeni?: Gordic.Pod.Interface.TypZobrazeniSouboruElPodaniVTabulce|null;
		Hlaska?: string|null;
	}
	const enum GElEvidenceGridDtoNames { OrigEmlEnabled = "OrigEmlEnabled", OrigEml = "OrigEml", PaSouboryVisible = "PaSouboryVisible", MultiSelectAddCasRaz = "MultiSelectAddCasRaz", Data = "Data", Label = "Label", TypZobrazeni = "TypZobrazeni", Hlaska = "Hlaska",}
	const enum GElEvidenceGridDtoFragments { OrigEmlEnabled = "*", OrigEml = "*", PaSouboryVisible = "*", MultiSelectAddCasRaz = "*", Data = "*", Label = "*", TypZobrazeni = "*", Hlaska = "*",}
	const enum GElEvidenceGridDtoTypes { OrigEmlEnabled = "boolean", OrigEml = "boolean", PaSouboryVisible = "boolean", MultiSelectAddCasRaz = "boolean", Data = "Gordic.Pod.Interface.GElPodaniPrilohyStrukturovaneDto[]", Label = "string", TypZobrazeni = "Gordic.Pod.Interface.TypZobrazeniSouboruElPodaniVTabulce", Hlaska = "string",}
	const enum GElEvidenceGridDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GElEvidenceSetFileJakoOriginalRetDto {
		/**GridData*/
		GridData?: Gordic.Pod.WebControls.GElEvidenceGridDto|null;
		VynutitOriginal?: boolean|null;
	}
	const enum GElEvidenceSetFileJakoOriginalRetDtoNames { GridData = "GridData", VynutitOriginal = "VynutitOriginal",}
	const enum GElEvidenceSetFileJakoOriginalRetDtoFragments { GridData = "*", VynutitOriginal = "*",}
	const enum GElEvidenceSetFileJakoOriginalRetDtoTypes { GridData = "Gordic.Pod.WebControls.GElEvidenceGridDto", VynutitOriginal = "boolean",}
	const enum GElEvidenceSetFileJakoOriginalRetDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GElEvidenceOrigEmlAddTSTDto {
		VisibleOrigEmlAddTST?: boolean|null;
		EnableOrigEmlAddTST?: boolean|null;
		ChechedOrigEmlAddTST?: boolean|null;
	}
	const enum GElEvidenceOrigEmlAddTSTDtoNames { VisibleOrigEmlAddTST = "VisibleOrigEmlAddTST", EnableOrigEmlAddTST = "EnableOrigEmlAddTST", ChechedOrigEmlAddTST = "ChechedOrigEmlAddTST",}
	const enum GElEvidenceOrigEmlAddTSTDtoFragments { VisibleOrigEmlAddTST = "*", EnableOrigEmlAddTST = "*", ChechedOrigEmlAddTST = "*",}
	const enum GElEvidenceOrigEmlAddTSTDtoTypes { VisibleOrigEmlAddTST = "boolean", EnableOrigEmlAddTST = "boolean", ChechedOrigEmlAddTST = "boolean",}
	const enum GElEvidenceOrigEmlAddTSTDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GElEvidenceKontrolaPriponyZpravyDto {
		VynutitRozbor?: boolean|null;
		NepovolenyFormatZpravy?: boolean|null;
		Hlaska?: string|null;
		OrigEmlEnabled?: boolean|null;
		OrigEml?: boolean|null;
		KontrolaPriponyNedopadla?: boolean|null;
		MuzeBytZpravaOriginalem?: boolean|null;
	}
	const enum GElEvidenceKontrolaPriponyZpravyDtoNames { VynutitRozbor = "VynutitRozbor", NepovolenyFormatZpravy = "NepovolenyFormatZpravy", Hlaska = "Hlaska", OrigEmlEnabled = "OrigEmlEnabled", OrigEml = "OrigEml", KontrolaPriponyNedopadla = "KontrolaPriponyNedopadla", MuzeBytZpravaOriginalem = "MuzeBytZpravaOriginalem",}
	const enum GElEvidenceKontrolaPriponyZpravyDtoFragments { VynutitRozbor = "*", NepovolenyFormatZpravy = "*", Hlaska = "*", OrigEmlEnabled = "*", OrigEml = "*", KontrolaPriponyNedopadla = "*", MuzeBytZpravaOriginalem = "*",}
	const enum GElEvidenceKontrolaPriponyZpravyDtoTypes { VynutitRozbor = "boolean", NepovolenyFormatZpravy = "boolean", Hlaska = "string", OrigEmlEnabled = "boolean", OrigEml = "boolean", KontrolaPriponyNedopadla = "boolean", MuzeBytZpravaOriginalem = "boolean",}
	const enum GElEvidenceKontrolaPriponyZpravyDtoTypeLengths {}
	/**Dto pro elektronickou evudenci - pruvocdce*/
	interface GElEvidenceVlastnostiDto {
		/**Autogenerated.*/
		jmenoVlastnosti?: string|null;
		/**Autogenerated.*/
		hodnota?: string|null;
		/**Autogenerated.*/
		jmenoFormPolozky?: string|null;
		/**Autogenerated.*/
		ixsVla?: string|null;
		/**Autogenerated.*/
		ixsStv?: string|null;
		/**Autogenerated.*/
		ixsPro?: string|null;
	}
	const enum GElEvidenceVlastnostiDtoNames { jmenoVlastnosti = "jmenoVlastnosti", hodnota = "hodnota", jmenoFormPolozky = "jmenoFormPolozky", ixsVla = "ixsVla", ixsStv = "ixsStv", ixsPro = "ixsPro",}
	const enum GElEvidenceVlastnostiDtoFragments { jmenoVlastnosti = "*", hodnota = "*", jmenoFormPolozky = "*", ixsVla = "*", ixsStv = "*", ixsPro = "*",}
	const enum GElEvidenceVlastnostiDtoTypes { jmenoVlastnosti = "string", hodnota = "string", jmenoFormPolozky = "string", ixsVla = "string", ixsStv = "string", ixsPro = "string",}
	const enum GElEvidenceVlastnostiDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce // OBSOLATE Lze vymazat časem*/
	interface GElEvidenceSouboryRowDto {
		/**Autogenerated.*/
		jmenoSouboru?: string|null;
		/**Autogenerated.*/
		zarazenJako?: string|null;
		/**Autogenerated.*/
		zarazenJakoText?: string|null;
		/**Autogenerated.*/
		prizAntivir?: Gordic.Wfl.Interface.WflcavkEnum|null;
		/**Autogenerated.*/
		registredFile?: string|null;
		/**Autogenerated.*/
		typSouboru?: string|null;
		/**Autogenerated.*/
		priznakPodpisu?: number|null;
		/**Autogenerated.*/
		IDGenerated?: string|null;
		/**Autogenerated.*/
		jmenoNadrizenehoSouboru?: string|null;
		/**Autogenerated.*/
		OverenoKeDni?: JsonDate|null;
		/**Autogenerated.*/
		DatOvereni?: JsonDate|null;
		/**Autogenerated.*/
		DatPodpisu?: JsonDate|null;
		/**Autogenerated.*/
		IdCrl?: JsonDecimal|null;
		/**Autogenerated.*/
		DatCrl?: JsonDate|null;
		/**Autogenerated.*/
		IdCrlIn?: JsonDecimal|null;
		/**Autogenerated.*/
		DatCrlIn?: JsonDate|null;
		/**Autogenerated.*/
		certValid?: boolean|null;
		/**Autogenerated.*/
		sifrovano?: number|null;
		/**Autogenerated.*/
		sigValid?: boolean|null;
		/**Autogenerated.*/
		status?: string|null;
		/**Autogenerated.*/
		infoCertifikat?: string|null;
		/**Autogenerated.*/
		stavVerifElPodpisu?: number|null;
		/**Autogenerated.*/
		stavVerifElPodpisuPopis?: string|null;
		/**Autogenerated.*/
		prizVerifElPodpisu?: number|null;
		/**Autogenerated.*/
		prizVerifElPodpisuPopis?: string|null;
		/**Autogenerated.*/
		stavVerifCasRazitka?: number|null;
		/**Autogenerated.*/
		stavVerifCasRazitkaPopis?: string|null;
		/**Autogenerated.*/
		prizVerifCasRazitka?: number|null;
		/**Autogenerated.*/
		prizVerifCasRazitkaPopis?: string|null;
		/**Autogenerated.*/
		prizVnitrniPodpisNeboCasRazitka?: number|null;
		/**Autogenerated.*/
		prizProPridaniCasRazitka?: number|null;
		/**Autogenerated.*/
		ixsCer?: string|null;
		/**Autogenerated.*/
		ixsCerCasRazitka?: string|null;
		/**Autogenerated.*/
		prizMoznyOriginal?: boolean|null;
		/**Autogenerated.*/
		prizVnitrniVnejsiho?: number|null;
		/**Autogenerated.*/
		nameVirus?: string|null;
		/**Autogenerated.*/
		isZpracovan?: boolean|null;
		/**Autogenerated.*/
		problem?: boolean|null;
		/**Autogenerated.*/
		ixb?: string|null;
		/**Autogenerated.*/
		AVProvider?: string|null;
		/**Autogenerated.*/
		AVProdukt?: string|null;
		/**Autogenerated.*/
		AVVersion?: string|null;
		/**Autogenerated.*/
		AVVersionDate?: string|null;
		/**Autogenerated.*/
		AVVersionVirDB?: string|null;
		/**Autogenerated.*/
		AVVersionVirDBDate?: string|null;
		/**Autogenerated.*/
		ixsUloElPod?: string|null;
		/**Autogenerated.*/
		index?: string|null;
		/**Autogenerated.*/
		zpracovatJakoPrilohu?: boolean|null;
	}
	const enum GElEvidenceSouboryRowDtoNames { jmenoSouboru = "jmenoSouboru", zarazenJako = "zarazenJako", zarazenJakoText = "zarazenJakoText", prizAntivir = "prizAntivir", registredFile = "registredFile", typSouboru = "typSouboru", priznakPodpisu = "priznakPodpisu", IDGenerated = "IDGenerated", jmenoNadrizenehoSouboru = "jmenoNadrizenehoSouboru", OverenoKeDni = "OverenoKeDni", DatOvereni = "DatOvereni", DatPodpisu = "DatPodpisu", IdCrl = "IdCrl", DatCrl = "DatCrl", IdCrlIn = "IdCrlIn", DatCrlIn = "DatCrlIn", certValid = "certValid", sifrovano = "sifrovano", sigValid = "sigValid", status = "status", infoCertifikat = "infoCertifikat", stavVerifElPodpisu = "stavVerifElPodpisu", stavVerifElPodpisuPopis = "stavVerifElPodpisuPopis", prizVerifElPodpisu = "prizVerifElPodpisu", prizVerifElPodpisuPopis = "prizVerifElPodpisuPopis", stavVerifCasRazitka = "stavVerifCasRazitka", stavVerifCasRazitkaPopis = "stavVerifCasRazitkaPopis", prizVerifCasRazitka = "prizVerifCasRazitka", prizVerifCasRazitkaPopis = "prizVerifCasRazitkaPopis", prizVnitrniPodpisNeboCasRazitka = "prizVnitrniPodpisNeboCasRazitka", prizProPridaniCasRazitka = "prizProPridaniCasRazitka", ixsCer = "ixsCer", ixsCerCasRazitka = "ixsCerCasRazitka", prizMoznyOriginal = "prizMoznyOriginal", prizVnitrniVnejsiho = "prizVnitrniVnejsiho", nameVirus = "nameVirus", isZpracovan = "isZpracovan", problem = "problem", ixb = "ixb", AVProvider = "AVProvider", AVProdukt = "AVProdukt", AVVersion = "AVVersion", AVVersionDate = "AVVersionDate", AVVersionVirDB = "AVVersionVirDB", AVVersionVirDBDate = "AVVersionVirDBDate", ixsUloElPod = "ixsUloElPod", index = "index", zpracovatJakoPrilohu = "zpracovatJakoPrilohu",}
	const enum GElEvidenceSouboryRowDtoFragments { jmenoSouboru = "*", zarazenJako = "*", zarazenJakoText = "*", prizAntivir = "*", registredFile = "*", typSouboru = "*", priznakPodpisu = "*", IDGenerated = "*", jmenoNadrizenehoSouboru = "*", OverenoKeDni = "*", DatOvereni = "*", DatPodpisu = "*", IdCrl = "*", DatCrl = "*", IdCrlIn = "*", DatCrlIn = "*", certValid = "*", sifrovano = "*", sigValid = "*", status = "*", infoCertifikat = "*", stavVerifElPodpisu = "*", stavVerifElPodpisuPopis = "*", prizVerifElPodpisu = "*", prizVerifElPodpisuPopis = "*", stavVerifCasRazitka = "*", stavVerifCasRazitkaPopis = "*", prizVerifCasRazitka = "*", prizVerifCasRazitkaPopis = "*", prizVnitrniPodpisNeboCasRazitka = "*", prizProPridaniCasRazitka = "*", ixsCer = "*", ixsCerCasRazitka = "*", prizMoznyOriginal = "*", prizVnitrniVnejsiho = "*", nameVirus = "*", isZpracovan = "*", problem = "*", ixb = "*", AVProvider = "*", AVProdukt = "*", AVVersion = "*", AVVersionDate = "*", AVVersionVirDB = "*", AVVersionVirDBDate = "*", ixsUloElPod = "*", index = "*", zpracovatJakoPrilohu = "*",}
	const enum GElEvidenceSouboryRowDtoTypes { jmenoSouboru = "string", zarazenJako = "string", zarazenJakoText = "string", prizAntivir = "Gordic.Wfl.Interface.WflcavkEnum", registredFile = "string", typSouboru = "string", priznakPodpisu = "number", IDGenerated = "string", jmenoNadrizenehoSouboru = "string", OverenoKeDni = "JsonDate", DatOvereni = "JsonDate", DatPodpisu = "JsonDate", IdCrl = "JsonDecimal", DatCrl = "JsonDate", IdCrlIn = "JsonDecimal", DatCrlIn = "JsonDate", certValid = "boolean", sifrovano = "number", sigValid = "boolean", status = "string", infoCertifikat = "string", stavVerifElPodpisu = "number", stavVerifElPodpisuPopis = "string", prizVerifElPodpisu = "number", prizVerifElPodpisuPopis = "string", stavVerifCasRazitka = "number", stavVerifCasRazitkaPopis = "string", prizVerifCasRazitka = "number", prizVerifCasRazitkaPopis = "string", prizVnitrniPodpisNeboCasRazitka = "number", prizProPridaniCasRazitka = "number", ixsCer = "string", ixsCerCasRazitka = "string", prizMoznyOriginal = "boolean", prizVnitrniVnejsiho = "number", nameVirus = "string", isZpracovan = "boolean", problem = "boolean", ixb = "string", AVProvider = "string", AVProdukt = "string", AVVersion = "string", AVVersionDate = "string", AVVersionVirDB = "string", AVVersionVirDBDate = "string", ixsUloElPod = "string", index = "string", zpracovatJakoPrilohu = "boolean",}
	const enum GElEvidenceSouboryRowDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniOdeslatPotvrzeniInputDto {
		NoCbx?: boolean|null;
		DSCbx?: boolean|null;
		EmailCbx?: boolean|null;
		PisCbx?: boolean|null;
		OdpEmail?: string|null;
		OdesIDDS?: string|null;
		DSOdDropDown?: string|null;
		IxsEsu?: string|null;
		PorZast?: number|null;
		LicZast?: string|null;
		TextPotvrz?: string|null;
		EmailSignCbx?: boolean|null;
		ZpusDor?: number|null;
		PodpisMailu?: Gordic.Wfl.WebClient.GSignatureResultDtoWithGuids|null;
		IsPotvrzSignedFinal?: boolean|null;
	}
	const enum GEvidenceElPodaniOdeslatPotvrzeniInputDtoNames { NoCbx = "NoCbx", DSCbx = "DSCbx", EmailCbx = "EmailCbx", PisCbx = "PisCbx", OdpEmail = "OdpEmail", OdesIDDS = "OdesIDDS", DSOdDropDown = "DSOdDropDown", IxsEsu = "IxsEsu", PorZast = "PorZast", LicZast = "LicZast", TextPotvrz = "TextPotvrz", EmailSignCbx = "EmailSignCbx", ZpusDor = "ZpusDor", PodpisMailu = "PodpisMailu", IsPotvrzSignedFinal = "IsPotvrzSignedFinal",}
	const enum GEvidenceElPodaniOdeslatPotvrzeniInputDtoFragments { NoCbx = "*", DSCbx = "*", EmailCbx = "*", PisCbx = "*", OdpEmail = "*", OdesIDDS = "*", DSOdDropDown = "*", IxsEsu = "*", PorZast = "*", LicZast = "*", TextPotvrz = "*", EmailSignCbx = "*", ZpusDor = "*", PodpisMailu = "*", IsPotvrzSignedFinal = "*",}
	const enum GEvidenceElPodaniOdeslatPotvrzeniInputDtoTypes { NoCbx = "boolean", DSCbx = "boolean", EmailCbx = "boolean", PisCbx = "boolean", OdpEmail = "string", OdesIDDS = "string", DSOdDropDown = "string", IxsEsu = "string", PorZast = "number", LicZast = "string", TextPotvrz = "string", EmailSignCbx = "boolean", ZpusDor = "number", PodpisMailu = "Gordic.Wfl.WebClient.GSignatureResultDtoWithGuids", IsPotvrzSignedFinal = "boolean",}
	const enum GEvidenceElPodaniOdeslatPotvrzeniInputDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniOdeslatPotvrzeniDto {
		BtNextEnabled?: boolean|null;
		Hlasky?: Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto|null;
		DSCbx?: boolean|null;
		EmailCbx?: boolean|null;
		OtevriDetailZasilky?: boolean|null;
		Sxs?: string|null;
		PotvrzeniOdeslano?: boolean|null;
	}
	const enum GEvidenceElPodaniOdeslatPotvrzeniDtoNames { BtNextEnabled = "BtNextEnabled", Hlasky = "Hlasky", DSCbx = "DSCbx", EmailCbx = "EmailCbx", OtevriDetailZasilky = "OtevriDetailZasilky", Sxs = "Sxs", PotvrzeniOdeslano = "PotvrzeniOdeslano",}
	const enum GEvidenceElPodaniOdeslatPotvrzeniDtoFragments { BtNextEnabled = "*", Hlasky = "*", DSCbx = "*", EmailCbx = "*", OtevriDetailZasilky = "*", Sxs = "*", PotvrzeniOdeslano = "*",}
	const enum GEvidenceElPodaniOdeslatPotvrzeniDtoTypes { BtNextEnabled = "boolean", Hlasky = "Gordic.Pod.WebControls.GEvidenceElPodaniChybovaHlaskaDto", DSCbx = "boolean", EmailCbx = "boolean", OtevriDetailZasilky = "boolean", Sxs = "string", PotvrzeniOdeslano = "boolean",}
	const enum GEvidenceElPodaniOdeslatPotvrzeniDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniVytvoritSouborPodaniDto {
		TextPotvrz?: string|null;
		TextZpravy?: string|null;
		IsPotvrzSigned?: string|null;
		IsPotvrzSignedFinal?: boolean|null;
		EmailCbx?: boolean|null;
		EmailSignCbx?: boolean|null;
		LzeVolatOeslatPozvrzeni?: boolean|null;
		TypSouboruPotvrzeni?: string|null;
		PodpisMailu?: Gordic.Wfl.WebClient.GSignatureResultDtoWithGuids|null;
		ZpravaPotvrzeniGUID?: string|null;
		NazevSouboru?: string|null;
		IxsDpo?: string|null;
		ObsahSouboruGUID?: string|null;
		SignWithTimeStamp?: boolean|null;
	}
	const enum GEvidenceElPodaniVytvoritSouborPodaniDtoNames { TextPotvrz = "TextPotvrz", TextZpravy = "TextZpravy", IsPotvrzSigned = "IsPotvrzSigned", IsPotvrzSignedFinal = "IsPotvrzSignedFinal", EmailCbx = "EmailCbx", EmailSignCbx = "EmailSignCbx", LzeVolatOeslatPozvrzeni = "LzeVolatOeslatPozvrzeni", TypSouboruPotvrzeni = "TypSouboruPotvrzeni", PodpisMailu = "PodpisMailu", ZpravaPotvrzeniGUID = "ZpravaPotvrzeniGUID", NazevSouboru = "NazevSouboru", IxsDpo = "IxsDpo", ObsahSouboruGUID = "ObsahSouboruGUID", SignWithTimeStamp = "SignWithTimeStamp",}
	const enum GEvidenceElPodaniVytvoritSouborPodaniDtoFragments { TextPotvrz = "*", TextZpravy = "*", IsPotvrzSigned = "*", IsPotvrzSignedFinal = "*", EmailCbx = "*", EmailSignCbx = "*", LzeVolatOeslatPozvrzeni = "*", TypSouboruPotvrzeni = "*", PodpisMailu = "*", ZpravaPotvrzeniGUID = "*", NazevSouboru = "*", IxsDpo = "*", ObsahSouboruGUID = "*", SignWithTimeStamp = "*",}
	const enum GEvidenceElPodaniVytvoritSouborPodaniDtoTypes { TextPotvrz = "string", TextZpravy = "string", IsPotvrzSigned = "string", IsPotvrzSignedFinal = "boolean", EmailCbx = "boolean", EmailSignCbx = "boolean", LzeVolatOeslatPozvrzeni = "boolean", TypSouboruPotvrzeni = "string", PodpisMailu = "Gordic.Wfl.WebClient.GSignatureResultDtoWithGuids", ZpravaPotvrzeniGUID = "string", NazevSouboru = "string", IxsDpo = "string", ObsahSouboruGUID = "string", SignWithTimeStamp = "boolean",}
	const enum GEvidenceElPodaniVytvoritSouborPodaniDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniVytvorSouborPotvrzeni {
		SouborPovrzeniPath?: string|null;
		SouborPovrzeniPathExtension?: string|null;
		NazevSouboru?: string|null;
		ObsahSouboru?: string|null;
		ObsahSouboruGUID?: string|null;
	}
	const enum GEvidenceElPodaniVytvorSouborPotvrzeniNames { SouborPovrzeniPath = "SouborPovrzeniPath", SouborPovrzeniPathExtension = "SouborPovrzeniPathExtension", NazevSouboru = "NazevSouboru", ObsahSouboru = "ObsahSouboru", ObsahSouboruGUID = "ObsahSouboruGUID",}
	const enum GEvidenceElPodaniVytvorSouborPotvrzeniFragments { SouborPovrzeniPath = "*", SouborPovrzeniPathExtension = "*", NazevSouboru = "*", ObsahSouboru = "*", ObsahSouboruGUID = "*",}
	const enum GEvidenceElPodaniVytvorSouborPotvrzeniTypes { SouborPovrzeniPath = "string", SouborPovrzeniPathExtension = "string", NazevSouboru = "string", ObsahSouboru = "string", ObsahSouboruGUID = "string",}
	const enum GEvidenceElPodaniVytvorSouborPotvrzeniTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GEvidenceElPodaniVytvorZpravuPotvrzeni {
		ZpravaPotvrzeni?: string|null;
		ZpravaPotvrzeniGUID?: string|null;
		NazevSouboru?: string|null;
	}
	const enum GEvidenceElPodaniVytvorZpravuPotvrzeniNames { ZpravaPotvrzeni = "ZpravaPotvrzeni", ZpravaPotvrzeniGUID = "ZpravaPotvrzeniGUID", NazevSouboru = "NazevSouboru",}
	const enum GEvidenceElPodaniVytvorZpravuPotvrzeniFragments { ZpravaPotvrzeni = "*", ZpravaPotvrzeniGUID = "*", NazevSouboru = "*",}
	const enum GEvidenceElPodaniVytvorZpravuPotvrzeniTypes { ZpravaPotvrzeni = "string", ZpravaPotvrzeniGUID = "string", NazevSouboru = "string",}
	const enum GEvidenceElPodaniVytvorZpravuPotvrzeniTypeLengths {}
	/**init Dto pro rozbor mail v mailu*/
	interface GEvidenceElPodaniRozeberMailVMailuInputDto {
		ZpusDor?: number|null;
		FileNameZpravaVeZprave?: string|null;
		JeAntivir?: string|null;
		NoAntivir?: string|null;
		OrigEml?: boolean|null;
		StavInb?: number|null;
	}
	const enum GEvidenceElPodaniRozeberMailVMailuInputDtoNames { ZpusDor = "ZpusDor", FileNameZpravaVeZprave = "FileNameZpravaVeZprave", JeAntivir = "JeAntivir", NoAntivir = "NoAntivir", OrigEml = "OrigEml", StavInb = "StavInb",}
	const enum GEvidenceElPodaniRozeberMailVMailuInputDtoFragments { ZpusDor = "*", FileNameZpravaVeZprave = "*", JeAntivir = "*", NoAntivir = "*", OrigEml = "*", StavInb = "*",}
	const enum GEvidenceElPodaniRozeberMailVMailuInputDtoTypes { ZpusDor = "number", FileNameZpravaVeZprave = "string", JeAntivir = "string", NoAntivir = "string", OrigEml = "boolean", StavInb = "number",}
	const enum GEvidenceElPodaniRozeberMailVMailuInputDtoTypeLengths {}
	/**init Dto pro rozbor mail v mailu*/
	interface GEvidenceElPodaniRozeberMailVMailuDto {
		VysledekAntiviru?: Gordic.Wfl.Interface.WflcavkEnum|null;
		Hlaska?: string|null;
		CisKrok?: number|null;
		ProvedenoKroku?: number|null;
		Krok1Dto?: Gordic.Pod.WebControls.GKrok1ElEvidenceDto|null;
		TextOdmitnoutPodani?: string|null;
		GexNedopadl?: boolean|null;
		GexNedopadlMsgPrazdne?: boolean|null;
		DZpoleDto?: Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto|null;
		ZpracovatJakoMsgInMsg?: boolean|null;
	}
	const enum GEvidenceElPodaniRozeberMailVMailuDtoNames { VysledekAntiviru = "VysledekAntiviru", Hlaska = "Hlaska", CisKrok = "CisKrok", ProvedenoKroku = "ProvedenoKroku", Krok1Dto = "Krok1Dto", TextOdmitnoutPodani = "TextOdmitnoutPodani", GexNedopadl = "GexNedopadl", GexNedopadlMsgPrazdne = "GexNedopadlMsgPrazdne", DZpoleDto = "DZpoleDto", ZpracovatJakoMsgInMsg = "ZpracovatJakoMsgInMsg",}
	const enum GEvidenceElPodaniRozeberMailVMailuDtoFragments { VysledekAntiviru = "*", Hlaska = "*", CisKrok = "*", ProvedenoKroku = "*", Krok1Dto = "*", TextOdmitnoutPodani = "*", GexNedopadl = "*", GexNedopadlMsgPrazdne = "*", DZpoleDto = "*", ZpracovatJakoMsgInMsg = "*",}
	const enum GEvidenceElPodaniRozeberMailVMailuDtoTypes { VysledekAntiviru = "Gordic.Wfl.Interface.WflcavkEnum", Hlaska = "string", CisKrok = "number", ProvedenoKroku = "number", Krok1Dto = "Gordic.Pod.WebControls.GKrok1ElEvidenceDto", TextOdmitnoutPodani = "string", GexNedopadl = "boolean", GexNedopadlMsgPrazdne = "boolean", DZpoleDto = "Gordic.Pod.WebControls.GEvidenceElPodaniDZpoleDto", ZpracovatJakoMsgInMsg = "boolean",}
	const enum GEvidenceElPodaniRozeberMailVMailuDtoTypeLengths {}
	/**init Dto pro rozbor mail v mailu*/
	interface GElPodaniKontrolaNearchivnihoFormatuDto {
		KontrolaOK?: boolean|null;
		KontrolaTxt?: string|null;
	}
	const enum GElPodaniKontrolaNearchivnihoFormatuDtoNames { KontrolaOK = "KontrolaOK", KontrolaTxt = "KontrolaTxt",}
	const enum GElPodaniKontrolaNearchivnihoFormatuDtoFragments { KontrolaOK = "*", KontrolaTxt = "*",}
	const enum GElPodaniKontrolaNearchivnihoFormatuDtoTypes { KontrolaOK = "boolean", KontrolaTxt = "string",}
	const enum GElPodaniKontrolaNearchivnihoFormatuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.WebControls\Gin\Pod\ElPodani\Dto\GPodaniOpravaPisemnostiDto.d.ts 

declare namespace Gordic.Pod.WebControls {
	/**Dto pro opravu podání*/
	interface GPodaniOpravaPisemnostiDto {
		/**Autogenerated.*/
		Pid?: string|null;
		/**Autogenerated.*/
		ZpusobDoruceni?: number|null;
		/**Autogenerated.*/
		DruhZachazeniDoruceni?: number|null;
		/**Autogenerated.*/
		DruhZasilkyDoruceni?: number|null;
		/**Autogenerated.*/
		PodaciCislo?: string|null;
		/**Autogenerated.*/
		DatOdeslDoruceni?: JsonDate|null;
		/**Autogenerated.*/
		Psc?: string|null;
		/**Autogenerated.*/
		Posta?: string|null;
		/**Autogenerated.*/
		Stat?: number|null;
		/**Autogenerated.*/
		SUFuncRef?: string|null;
		/**Autogenerated.*/
		Odesilatel_ixs_esu?: string|null;
		/**Autogenerated.*/
		Odesilatel_lic?: string|null;
		/**Autogenerated.*/
		Odesilatel_por_zast?: number|null;
		/**Autogenerated.*/
		TypPis?: string|null;
		/**Autogenerated.*/
		SpisZnak_spis_pl?: string|null;
		/**Autogenerated.*/
		SpisZnak_spis_znak?: string|null;
		/**Autogenerated.*/
		Umisteni?: string|null;
		/**Autogenerated.*/
		PoznamkaDoruceni?: string|null;
		/**Autogenerated.*/
		StupUtaj?: number|null;
		/**Autogenerated.*/
		DatZeDneDoruceni?: JsonDate|null;
		/**Autogenerated.*/
		ZnackaOdesilatele?: string|null;
		/**Autogenerated.*/
		SpZnackaOdesilatele?: string|null;
		/**Autogenerated.*/
		VymazatCilPrideleni?: string|null;
		/**Autogenerated.*/
		SUFuncRef_IxsSU?: string|null;
		/**Autogenerated.*/
		Evidovat?: boolean|null;
		/**Autogenerated.*/
		Redistribuce?: string|null;
		/**Autogenerated.*/
		Znacka?: string|null;
		/**Autogenerated.*/
		VecPodrobne?: string|null;
		/**Autogenerated.*/
		Poznamka?: string|null;
		/**Autogenerated.*/
		EvidovatDoSsl?: boolean|null;
		/**Autogenerated.*/
		SpisObsluha?: string|null;
		/**Autogenerated.*/
		Vec?: string|null;
		/**Autogenerated.*/
		DatPod?: JsonDate|null;
		/**Autogenerated.*/
		DatDoruceni?: JsonDate|null;
		/**Autogenerated.*/
		PocListu?: string|null;
		/**Autogenerated.*/
		PocStran?: number|null;
		/**Autogenerated.*/
		PocPriloh?: number|null;
		/**Autogenerated.*/
		PocKopii?: number|null;
		/**Autogenerated.*/
		PocListuPriloh?: string|null;
		/**Autogenerated.*/
		TypDenikuSpz?: string|null;
		/**Autogenerated.*/
		TypDenikuCj?: string|null;
		/**Autogenerated.*/
		IxpSpis?: string|null;
		/**Autogenerated.*/
		DenikSpis?: string|null;
		/**Autogenerated.*/
		RokSpis?: string|null;
		/**Autogenerated.*/
		PorCisloSpis?: string|null;
		/**Autogenerated.*/
		Denik?: string|null;
		/**Autogenerated.*/
		Poradi?: string|null;
		/**Autogenerated.*/
		Rok?: string|null;
		/**EvidovatEnabled.*/
		VlozenoDoSpisu?: boolean|null;
		/**EvidovatEnabled.*/
		Podano?: boolean|null;
		/**EvidovatEnabled.*/
		AkcePoEvidenci?: boolean|null;
		/**vybraný pod přes hledání doc/spis*/
		IxpVlozitDoSpisu?: string|null;
		/**pro pětipolíčko počtu.*/
		SFyz?: number|null;
		/**TextInformacniDialogu*/
		TextInformacniDialogu?: string|null;
		/**EvidovatEnabled.*/
		TiskPodacihoRazitka?: boolean|null;
		/**SeznamPriloh*/
		SeznamPriloh?: Gordic.Pod.WebControls.GPrilohyPodavanehoDokumentuSeznamDto[]|null;
		/**InfoZpravaOZmeneRedistribuce*/
		InfoZpravaOZmeneRedistribuce?: string|null;
		/**ShowInfoODohledaniDleZnackaOdes.*/
		ShowInfoODohledaniDleZnackaOdes?: boolean|null;
		/**InfoODohledaniDleZnackaOdes.*/
		InfoODohledaniDleZnackaOdesData?: Gordic.Wfl.Interface.GDokSpisListDto[]|null;
	}
	const enum GPodaniOpravaPisemnostiDtoNames { Pid = "Pid", ZpusobDoruceni = "ZpusobDoruceni", DruhZachazeniDoruceni = "DruhZachazeniDoruceni", DruhZasilkyDoruceni = "DruhZasilkyDoruceni", PodaciCislo = "PodaciCislo", DatOdeslDoruceni = "DatOdeslDoruceni", Psc = "Psc", Posta = "Posta", Stat = "Stat", SUFuncRef = "SUFuncRef", Odesilatel_ixs_esu = "Odesilatel_ixs_esu", Odesilatel_lic = "Odesilatel_lic", Odesilatel_por_zast = "Odesilatel_por_zast", TypPis = "TypPis", SpisZnak_spis_pl = "SpisZnak_spis_pl", SpisZnak_spis_znak = "SpisZnak_spis_znak", Umisteni = "Umisteni", PoznamkaDoruceni = "PoznamkaDoruceni", StupUtaj = "StupUtaj", DatZeDneDoruceni = "DatZeDneDoruceni", ZnackaOdesilatele = "ZnackaOdesilatele", SpZnackaOdesilatele = "SpZnackaOdesilatele", VymazatCilPrideleni = "VymazatCilPrideleni", SUFuncRef_IxsSU = "SUFuncRef_IxsSU", Evidovat = "Evidovat", Redistribuce = "Redistribuce", Znacka = "Znacka", VecPodrobne = "VecPodrobne", Poznamka = "Poznamka", EvidovatDoSsl = "EvidovatDoSsl", SpisObsluha = "SpisObsluha", Vec = "Vec", DatPod = "DatPod", DatDoruceni = "DatDoruceni", PocListu = "PocListu", PocStran = "PocStran", PocPriloh = "PocPriloh", PocKopii = "PocKopii", PocListuPriloh = "PocListuPriloh", TypDenikuSpz = "TypDenikuSpz", TypDenikuCj = "TypDenikuCj", IxpSpis = "IxpSpis", DenikSpis = "DenikSpis", RokSpis = "RokSpis", PorCisloSpis = "PorCisloSpis", Denik = "Denik", Poradi = "Poradi", Rok = "Rok", VlozenoDoSpisu = "VlozenoDoSpisu", Podano = "Podano", AkcePoEvidenci = "AkcePoEvidenci", IxpVlozitDoSpisu = "IxpVlozitDoSpisu", SFyz = "SFyz", TextInformacniDialogu = "TextInformacniDialogu", TiskPodacihoRazitka = "TiskPodacihoRazitka", SeznamPriloh = "SeznamPriloh", InfoZpravaOZmeneRedistribuce = "InfoZpravaOZmeneRedistribuce", ShowInfoODohledaniDleZnackaOdes = "ShowInfoODohledaniDleZnackaOdes", InfoODohledaniDleZnackaOdesData = "InfoODohledaniDleZnackaOdesData",}
	const enum GPodaniOpravaPisemnostiDtoFragments { Pid = "*", ZpusobDoruceni = "*", DruhZachazeniDoruceni = "*", DruhZasilkyDoruceni = "*", PodaciCislo = "*", DatOdeslDoruceni = "*", Psc = "*", Posta = "*", Stat = "*", SUFuncRef = "*", Odesilatel_ixs_esu = "*", Odesilatel_lic = "*", Odesilatel_por_zast = "*", TypPis = "*", SpisZnak_spis_pl = "*", SpisZnak_spis_znak = "*", Umisteni = "*", PoznamkaDoruceni = "*", StupUtaj = "*", DatZeDneDoruceni = "*", ZnackaOdesilatele = "*", SpZnackaOdesilatele = "*", VymazatCilPrideleni = "*", SUFuncRef_IxsSU = "*", Evidovat = "*", Redistribuce = "*", Znacka = "*", VecPodrobne = "*", Poznamka = "*", EvidovatDoSsl = "*", SpisObsluha = "*", Vec = "*", DatPod = "*", DatDoruceni = "*", PocListu = "*", PocStran = "*", PocPriloh = "*", PocKopii = "*", PocListuPriloh = "*", TypDenikuSpz = "*", TypDenikuCj = "*", IxpSpis = "*", DenikSpis = "*", RokSpis = "*", PorCisloSpis = "*", Denik = "*", Poradi = "*", Rok = "*", VlozenoDoSpisu = "*", Podano = "*", AkcePoEvidenci = "*", IxpVlozitDoSpisu = "*", SFyz = "*", TextInformacniDialogu = "*", TiskPodacihoRazitka = "*", SeznamPriloh = "*", InfoZpravaOZmeneRedistribuce = "*", ShowInfoODohledaniDleZnackaOdes = "*", InfoODohledaniDleZnackaOdesData = "*",}
	const enum GPodaniOpravaPisemnostiDtoTypes { Pid = "string", ZpusobDoruceni = "number", DruhZachazeniDoruceni = "number", DruhZasilkyDoruceni = "number", PodaciCislo = "string", DatOdeslDoruceni = "JsonDate", Psc = "string", Posta = "string", Stat = "number", SUFuncRef = "string", Odesilatel_ixs_esu = "string", Odesilatel_lic = "string", Odesilatel_por_zast = "number", TypPis = "string", SpisZnak_spis_pl = "string", SpisZnak_spis_znak = "string", Umisteni = "string", PoznamkaDoruceni = "string", StupUtaj = "number", DatZeDneDoruceni = "JsonDate", ZnackaOdesilatele = "string", SpZnackaOdesilatele = "string", VymazatCilPrideleni = "string", SUFuncRef_IxsSU = "string", Evidovat = "boolean", Redistribuce = "string", Znacka = "string", VecPodrobne = "string", Poznamka = "string", EvidovatDoSsl = "boolean", SpisObsluha = "string", Vec = "string", DatPod = "JsonDate", DatDoruceni = "JsonDate", PocListu = "string", PocStran = "number", PocPriloh = "number", PocKopii = "number", PocListuPriloh = "string", TypDenikuSpz = "string", TypDenikuCj = "string", IxpSpis = "string", DenikSpis = "string", RokSpis = "string", PorCisloSpis = "string", Denik = "string", Poradi = "string", Rok = "string", VlozenoDoSpisu = "boolean", Podano = "boolean", AkcePoEvidenci = "boolean", IxpVlozitDoSpisu = "string", SFyz = "number", TextInformacniDialogu = "string", TiskPodacihoRazitka = "boolean", SeznamPriloh = "Gordic.Pod.WebControls.GPrilohyPodavanehoDokumentuSeznamDto[]", InfoZpravaOZmeneRedistribuce = "string", ShowInfoODohledaniDleZnackaOdes = "boolean", InfoODohledaniDleZnackaOdesData = "Gordic.Wfl.Interface.GDokSpisListDto[]",}
	const enum GPodaniOpravaPisemnostiDtoTypeLengths { Vec = 100,}
	/**Dto pro opravu podání*/
	interface GPodaniOpravaPisemnostiEnableDto {
		/**Autogenerated.*/
		ActionVymazatVseEnable?: boolean|null;
		/**EvidovatEnabled.*/
		EvidovatEnabled?: boolean|null;
		/**EvidovatEnabled.*/
		EvidovatOtazka?: boolean|null;
		/**EvidovatEnabled.*/
		VecPodrobneMaxLength?: number|null;
		/**EvidovatEnabled.*/
		DatDoruceniVisible?: boolean|null;
		/**EvidovatEnabled.*/
		PoznamkaDoruceniMaxLength?: number|null;
		/**EvidovatEnabled.*/
		ZnackaLabelText?: string|null;
		/**EvidovatEnabled.*/
		ZnackaOdesilateleLabelText?: string|null;
		/**EvidovatEnabled.*/
		PristupDleTypuDok?: boolean|null;
		/**EvidovatEnabled.*/
		SpZnakDleTypuDok?: boolean|null;
		/**EvidovatEnabled.*/
		SpisObsluhaEnable?: boolean|null;
		/**EvidovatEnabled.*/
		EvidovatDoSSLEnabled?: boolean|null;
		/**EvidovatEnabled.*/
		VytvoritSpisEnabled?: boolean|null;
		/**EvidovatEnabled.*/
		DatPodEnabled?: boolean|null;
		/**EvidovatEnabled.*/
		PridelitEnabled?: boolean|null;
		/**EvidovatEnabled.*/
		ZpusobDoruceniFilterAktivita?: number[]|null;
		/**EvidovatEnabled.*/
		ZpusobDoruceniEnabled?: boolean|null;
		/**EvidovatEnabled.*/
		ZnackaEnabled?: boolean|null;
		/**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes?: boolean|null;
		/**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes_IxsEsu?: string|null;
		/**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes_Ixp?: string|null;
		/**ZobrDialogShowInfoODohledaniDleZnackaOdes.*/
		ZobrDialogShowInfoODohledaniDleZnackaOdes_ZnackaOdes?: string|null;
		/**NepovolitZavritBezUlozeni.*/
		NepovolitZavritBezUlozeni?: boolean|null;
		/**EvidovatEnabled.*/
		EvidovatVisible?: boolean|null;
		/**EvidovatEnabled.*/
		ViceDenSpz?: boolean|null;
		/**EvidovatEnabled.*/
		ViceDenCj?: boolean|null;
		/**EvidovatEnabled.*/
		CancelClose?: boolean|null;
		/**EvidovatEnabled.*/
		Ssl_aut_preBOOL?: boolean|null;
		/**EvidovatEnabled.*/
		IsDialogSTiskemDokladu?: boolean|null;
		/**IsFaze_SSD.*/
		IsFaze_SSD?: boolean|null;
		/**IsRedistribuce.*/
		IsRedistribuce?: boolean|null;
		/**ssl_pod_zpdorp.*/
		ssl_pod_zpdorp?: number|null;
		/**usu_predani.*/
		usu_predani?: number|null;
	}
	const enum GPodaniOpravaPisemnostiEnableDtoNames { ActionVymazatVseEnable = "ActionVymazatVseEnable", EvidovatEnabled = "EvidovatEnabled", EvidovatOtazka = "EvidovatOtazka", VecPodrobneMaxLength = "VecPodrobneMaxLength", DatDoruceniVisible = "DatDoruceniVisible", PoznamkaDoruceniMaxLength = "PoznamkaDoruceniMaxLength", ZnackaLabelText = "ZnackaLabelText", ZnackaOdesilateleLabelText = "ZnackaOdesilateleLabelText", PristupDleTypuDok = "PristupDleTypuDok", SpZnakDleTypuDok = "SpZnakDleTypuDok", SpisObsluhaEnable = "SpisObsluhaEnable", EvidovatDoSSLEnabled = "EvidovatDoSSLEnabled", VytvoritSpisEnabled = "VytvoritSpisEnabled", DatPodEnabled = "DatPodEnabled", PridelitEnabled = "PridelitEnabled", ZpusobDoruceniFilterAktivita = "ZpusobDoruceniFilterAktivita", ZpusobDoruceniEnabled = "ZpusobDoruceniEnabled", ZnackaEnabled = "ZnackaEnabled", ZobrDialogShowInfoODohledaniDleZnackaOdes = "ZobrDialogShowInfoODohledaniDleZnackaOdes", ZobrDialogShowInfoODohledaniDleZnackaOdes_IxsEsu = "ZobrDialogShowInfoODohledaniDleZnackaOdes_IxsEsu", ZobrDialogShowInfoODohledaniDleZnackaOdes_Ixp = "ZobrDialogShowInfoODohledaniDleZnackaOdes_Ixp", ZobrDialogShowInfoODohledaniDleZnackaOdes_ZnackaOdes = "ZobrDialogShowInfoODohledaniDleZnackaOdes_ZnackaOdes", NepovolitZavritBezUlozeni = "NepovolitZavritBezUlozeni", EvidovatVisible = "EvidovatVisible", ViceDenSpz = "ViceDenSpz", ViceDenCj = "ViceDenCj", CancelClose = "CancelClose", Ssl_aut_preBOOL = "Ssl_aut_preBOOL", IsDialogSTiskemDokladu = "IsDialogSTiskemDokladu", IsFaze_SSD = "IsFaze_SSD", IsRedistribuce = "IsRedistribuce", ssl_pod_zpdorp = "ssl_pod_zpdorp", usu_predani = "usu_predani",}
	const enum GPodaniOpravaPisemnostiEnableDtoFragments { ActionVymazatVseEnable = "*", EvidovatEnabled = "*", EvidovatOtazka = "*", VecPodrobneMaxLength = "*", DatDoruceniVisible = "*", PoznamkaDoruceniMaxLength = "*", ZnackaLabelText = "*", ZnackaOdesilateleLabelText = "*", PristupDleTypuDok = "*", SpZnakDleTypuDok = "*", SpisObsluhaEnable = "*", EvidovatDoSSLEnabled = "*", VytvoritSpisEnabled = "*", DatPodEnabled = "*", PridelitEnabled = "*", ZpusobDoruceniFilterAktivita = "*", ZpusobDoruceniEnabled = "*", ZnackaEnabled = "*", ZobrDialogShowInfoODohledaniDleZnackaOdes = "*", ZobrDialogShowInfoODohledaniDleZnackaOdes_IxsEsu = "*", ZobrDialogShowInfoODohledaniDleZnackaOdes_Ixp = "*", ZobrDialogShowInfoODohledaniDleZnackaOdes_ZnackaOdes = "*", NepovolitZavritBezUlozeni = "*", EvidovatVisible = "*", ViceDenSpz = "*", ViceDenCj = "*", CancelClose = "*", Ssl_aut_preBOOL = "*", IsDialogSTiskemDokladu = "*", IsFaze_SSD = "*", IsRedistribuce = "*", ssl_pod_zpdorp = "*", usu_predani = "*",}
	const enum GPodaniOpravaPisemnostiEnableDtoTypes { ActionVymazatVseEnable = "boolean", EvidovatEnabled = "boolean", EvidovatOtazka = "boolean", VecPodrobneMaxLength = "number", DatDoruceniVisible = "boolean", PoznamkaDoruceniMaxLength = "number", ZnackaLabelText = "string", ZnackaOdesilateleLabelText = "string", PristupDleTypuDok = "boolean", SpZnakDleTypuDok = "boolean", SpisObsluhaEnable = "boolean", EvidovatDoSSLEnabled = "boolean", VytvoritSpisEnabled = "boolean", DatPodEnabled = "boolean", PridelitEnabled = "boolean", ZpusobDoruceniFilterAktivita = "number[]", ZpusobDoruceniEnabled = "boolean", ZnackaEnabled = "boolean", ZobrDialogShowInfoODohledaniDleZnackaOdes = "boolean", ZobrDialogShowInfoODohledaniDleZnackaOdes_IxsEsu = "string", ZobrDialogShowInfoODohledaniDleZnackaOdes_Ixp = "string", ZobrDialogShowInfoODohledaniDleZnackaOdes_ZnackaOdes = "string", NepovolitZavritBezUlozeni = "boolean", EvidovatVisible = "boolean", ViceDenSpz = "boolean", ViceDenCj = "boolean", CancelClose = "boolean", Ssl_aut_preBOOL = "boolean", IsDialogSTiskemDokladu = "boolean", IsFaze_SSD = "boolean", IsRedistribuce = "boolean", ssl_pod_zpdorp = "number", usu_predani = "number",}
	const enum GPodaniOpravaPisemnostiEnableDtoTypeLengths {}
	/**Návratová hodntoa s dvě Dto*/
	interface GPodaniOpravaPisemnostiRetDto {
		/**enableDto*/
		Model?: Gordic.Pod.WebControls.GPodaniOpravaPisemnostiDto|null;
		/**enableDto*/
		EnableDto?: Gordic.Pod.WebControls.GPodaniOpravaPisemnostiEnableDto|null;
	}
	const enum GPodaniOpravaPisemnostiRetDtoNames { Model = "Model", EnableDto = "EnableDto",}
	const enum GPodaniOpravaPisemnostiRetDtoFragments { Model = "*", EnableDto = "*",}
	const enum GPodaniOpravaPisemnostiRetDtoTypes { Model = "Gordic.Pod.WebControls.GPodaniOpravaPisemnostiDto", EnableDto = "Gordic.Pod.WebControls.GPodaniOpravaPisemnostiEnableDto",}
	const enum GPodaniOpravaPisemnostiRetDtoTypeLengths {}
	/**Návratová hodntoa s dvě Dto*/
	interface GPodaniOpravaPisemnostiAktualizujZnackuDto {
		/**Znacka*/
		AktZnacka?: string|null;
		/**enableDto*/
		PrizCj?: number|null;
	}
	const enum GPodaniOpravaPisemnostiAktualizujZnackuDtoNames { AktZnacka = "AktZnacka", PrizCj = "PrizCj",}
	const enum GPodaniOpravaPisemnostiAktualizujZnackuDtoFragments { AktZnacka = "*", PrizCj = "*",}
	const enum GPodaniOpravaPisemnostiAktualizujZnackuDtoTypes { AktZnacka = "string", PrizCj = "number",}
	const enum GPodaniOpravaPisemnostiAktualizujZnackuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.WebControls\Gin\Pod\ElPodani\Dto\GRuzneDto.d.ts 

declare namespace Gordic.Pod.WebControls {
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface RetZpracujInterniVypraveni {
		/**NewPid*/
		IxpNew?: string|null;
		/**NewPid*/
		Prideleni?: Gordic.Wfl.Interface.GSuFunRefDto|null;
	}
	const enum RetZpracujInterniVypraveniNames { IxpNew = "IxpNew", Prideleni = "Prideleni",}
	const enum RetZpracujInterniVypraveniFragments { IxpNew = "*", Prideleni = "*",}
	const enum RetZpracujInterniVypraveniTypes { IxpNew = "string", Prideleni = "Gordic.Wfl.Interface.GSuFunRefDto",}
	const enum RetZpracujInterniVypraveniTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GNoveCiziPodaniRetDto {
		/**Autogenerated.*/
		Ixp?: string|null;
	}
	const enum GNoveCiziPodaniRetDtoNames { Ixp = "Ixp",}
	const enum GNoveCiziPodaniRetDtoFragments { Ixp = "*",}
	const enum GNoveCiziPodaniRetDtoTypes { Ixp = "string",}
	const enum GNoveCiziPodaniRetDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface PodaniNovehoCizihoUtilsDto {
		/**Autogenerated.*/
		Ixp?: string|null;
		/**Autogenerated.*/
		Podani?: boolean|null;
		/**Autogenerated.*/
		DokumentSidentifikatoremJizPodanHlaska?: string|null;
		/**NovePodaniAPrideleniTohotoDokumentu.*/
		NovePodaniAPrideleniTohotoDokumentuOtazka?: string|null;
		/**NovePodaniAPrideleniTohotoDokumentu.*/
		NovePodaniAPrideleniKontroloaStavuHlaska1?: string|null;
		/**OtazkaInterniVypraveni.*/
		OtazkaInterniVypraveni?: string|null;
		/**OtazkaInterniVypraveni.*/
		ZasilkaDto?: Gordic.Wfl.Interface.GZasilkaDto[]|null;
	}
	const enum PodaniNovehoCizihoUtilsDtoNames { Ixp = "Ixp", Podani = "Podani", DokumentSidentifikatoremJizPodanHlaska = "DokumentSidentifikatoremJizPodanHlaska", NovePodaniAPrideleniTohotoDokumentuOtazka = "NovePodaniAPrideleniTohotoDokumentuOtazka", NovePodaniAPrideleniKontroloaStavuHlaska1 = "NovePodaniAPrideleniKontroloaStavuHlaska1", OtazkaInterniVypraveni = "OtazkaInterniVypraveni", ZasilkaDto = "ZasilkaDto",}
	const enum PodaniNovehoCizihoUtilsDtoFragments { Ixp = "*", Podani = "*", DokumentSidentifikatoremJizPodanHlaska = "*", NovePodaniAPrideleniTohotoDokumentuOtazka = "*", NovePodaniAPrideleniKontroloaStavuHlaska1 = "*", OtazkaInterniVypraveni = "*", ZasilkaDto = "*",}
	const enum PodaniNovehoCizihoUtilsDtoTypes { Ixp = "string", Podani = "boolean", DokumentSidentifikatoremJizPodanHlaska = "string", NovePodaniAPrideleniTohotoDokumentuOtazka = "string", NovePodaniAPrideleniKontroloaStavuHlaska1 = "string", OtazkaInterniVypraveni = "string", ZasilkaDto = "Gordic.Wfl.Interface.GZasilkaDto[]",}
	const enum PodaniNovehoCizihoUtilsDtoTypeLengths {}
	/**init Dto pro elektronickou evudenci - pruvocdce*/
	interface GPrilohyPodavanehoDokumentuSeznamDto {
		/**Autogenerated.*/
		poradi?: number|null;
		/**Autogenerated.*/
		obsah?: string|null;
		/**Autogenerated.*/
		poznamka?: string|null;
		/**Autogenerated.*/
		pocet?: number|null;
		/**Autogenerated.*/
		dat_zmena?: JsonDate|null;
		/**Autogenerated.*/
		nazev_rf?: string|null;
		/**Autogenerated.*/
		ktgTypPri?: number|null;
		/**Autogenerated.*/
		typPrilohy?: number|null;
		/**Autogenerated.*/
		formaPrilohy?: number|null;
		/**Autogenerated.*/
		stUtajId?: number|null;
		/**Autogenerated.*/
		ktgTypPri_txt?: string|null;
		/**Autogenerated.*/
		typPrilohy_txt?: string|null;
		/**Autogenerated.*/
		formaPrilohy_txt?: string|null;
		/**Autogenerated.*/
		stUtajId_txt?: string|null;
	}
	const enum GPrilohyPodavanehoDokumentuSeznamDtoNames { poradi = "poradi", obsah = "obsah", poznamka = "poznamka", pocet = "pocet", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf", ktgTypPri = "ktgTypPri", typPrilohy = "typPrilohy", formaPrilohy = "formaPrilohy", stUtajId = "stUtajId", ktgTypPri_txt = "ktgTypPri_txt", typPrilohy_txt = "typPrilohy_txt", formaPrilohy_txt = "formaPrilohy_txt", stUtajId_txt = "stUtajId_txt",}
	const enum GPrilohyPodavanehoDokumentuSeznamDtoFragments { poradi = "*", obsah = "*", poznamka = "*", pocet = "*", dat_zmena = "*", nazev_rf = "*", ktgTypPri = "*", typPrilohy = "*", formaPrilohy = "*", stUtajId = "*", ktgTypPri_txt = "*", typPrilohy_txt = "*", formaPrilohy_txt = "*", stUtajId_txt = "*",}
	const enum GPrilohyPodavanehoDokumentuSeznamDtoTypes { poradi = "number", obsah = "string", poznamka = "string", pocet = "number", dat_zmena = "JsonDate", nazev_rf = "string", ktgTypPri = "number", typPrilohy = "number", formaPrilohy = "number", stUtajId = "number", ktgTypPri_txt = "string", typPrilohy_txt = "string", formaPrilohy_txt = "string", stUtajId_txt = "string",}
	const enum GPrilohyPodavanehoDokumentuSeznamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.WebControls\Gin\Pod\Lists\Dto\DokumentyASpisyFilterDto.d.ts 

declare namespace Gordic.Pod.WebControls.Lists {
	/**DocsListDto dto*/
	interface DokumentyASpisyFilterDto {
		/**Autogenerated.*/
		DateInterval?: Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto|null;
		/**Gets or sets the typ.*/
		TypEntity?: Gordic.Pod.WebControls.Lists.DokumentyASpisyTypEntity|null;
		/**vec*/
		Vec?: string|null;
		/**vec*/
		Odesilatel?: string|null;
		/**vec*/
		Vlastni?: boolean|null;
		/**Autogenerated.*/
		DatumAplikovatNa?: string|null;
		/**Doruceni*/
		Doruceni?: number|null;
		/**Autogenerated.*/
		SubTask?: Gordic.Pod.WebControls.Lists.DokumentyASpisySSDSubTask|null;
		/**StUtajId*/
		StUtajId?: number|null;
	}
	const enum DokumentyASpisyFilterDtoNames { DateInterval = "DateInterval", TypEntity = "TypEntity", Vec = "Vec", Odesilatel = "Odesilatel", Vlastni = "Vlastni", DatumAplikovatNa = "DatumAplikovatNa", Doruceni = "Doruceni", SubTask = "SubTask", StUtajId = "StUtajId",}
	const enum DokumentyASpisyFilterDtoFragments { DateInterval = "*", TypEntity = "*", Vec = "*", Odesilatel = "*", Vlastni = "*", DatumAplikovatNa = "*", Doruceni = "*", SubTask = "*", StUtajId = "*",}
	const enum DokumentyASpisyFilterDtoTypes { DateInterval = "Gordic.Wfl.Interface.Lists.WflComboDateIntervalDto", TypEntity = "Gordic.Pod.WebControls.Lists.DokumentyASpisyTypEntity", Vec = "string", Odesilatel = "string", Vlastni = "boolean", DatumAplikovatNa = "string", Doruceni = "number", SubTask = "Gordic.Pod.WebControls.Lists.DokumentyASpisySSDSubTask", StUtajId = "number",}
	const enum DokumentyASpisyFilterDtoTypeLengths {}
	/**DokumentyASpisySSDSubTask*/
	const enum DokumentyASpisySSDSubTask {
		Neurceno=0,
		Nevyrizene=1,
		Vyrizene=2,
		Neaktivni=3,
		Vsechny=4,
	}
	/**DokumentyASpisySSDSubTask*/
	const enum DokumentyASpisyTypEntity {
		Neurceno=0,
		Vsechny=1,
		Dokumenty=2,
		Spisy=3,
		MimoSpis=4,
		VeSpisu=5,
	}
}

//#endregion

