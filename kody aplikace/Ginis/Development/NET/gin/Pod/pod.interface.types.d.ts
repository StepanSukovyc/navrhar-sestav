/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pod.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pod.Interface\Gordic.Pod.Interface.csproj
*    created     2026-02-16 14:33:49
*    files       Gordic.Pod.Interface.IGPodTsCommon .d.ts
*                GPodInterfaceDto.d.ts
*                DTO\GElPodaniInfoDto.d.ts
*                DTO\GPodDefaultSettingsDto.d.ts
*                DTO\GPodElPodaniSettingsDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pod.Interface\Gordic.Pod.Interface.IGPodTsCommon .d.ts 

declare namespace Gordic.Pod.Interface {
	/**
	*     Typ elektronického dokumentu
	*     
	*/
	const enum TypZaskrtnutiProPridaniCasRazitka {
		/**nic*/
		nic=0,
		/**pouze originál*/
		pouzeOriginal=1,
		/**všechno*/
		vsechno=2,
		/**pouze originál kromě DZ*/
		pouzeOriginalKromeDZ=3,
		/**všechno kromě DZ*/
		vsechnoKromeDZ=4,
		/**pouze přílohy*/
		pouzePrilohy=5,
	}
	/**
	*     Typ elektronického dokumentu
	*     
	*/
	const enum TypUpravyNazvyPrilohy {
		/**systemem*/
		systemem=1,
		/**uzivatelem pri podání*/
		uzivatelem=2,
		/**systemem - nastevnim v moznostech aplikace*/
		systememDleNastaveniAplikace=3,
	}
	/**
	*     Typ elektronického dokumentu
	*     
	*/
	const enum TypAkceSPrilohou {
		/**oznacit, jako priloha*/
		oznacitJakoPriloha,
		/**oznacit, ze vnoreny se má uložit jako standardní priloha*/
		oznacitZpracovaniVnorenehoJakoStandardni,
		/**oznacit, ze vsechny vnorene se maji oznacit jako standardní priloha*/
		oznacitZpracovaniVsechVnorenychJakoStandardni,
		/**oznacit, ze nema priloha ukladat*/
		oznacitVyrazeniPrilohyZPodani,
		/**opravit priponu souboru prilohy*/
		opravitPriponuSouboruPrilohy,
	}
	/**
	*     Typ elektronického dokumentu
	*     
	*/
	const enum TypVnitrnihoPodpisuNeboCasRazitka {
		/**nic*/
		nic=0,
		/**el. podpis*/
		elPodpis=1,
		/**čas. razitko*/
		casRazitko=2,
		/**el. podpis i čas. razitko*/
		elPodpisICasRazitko=3,
	}
	/**Typ Zobrazeni Souboru (příloh) el.podani v tabulce*/
	const enum TypZobrazeniSouboruElPodaniVTabulce {
		/**editační - pro rozbor*/
		editacni,
		/**přehled bez možnosti editace*/
		prehledovy,
		/**přehled bez možnosti editace s info o podpisech a oveření*/
		prehledovySInformacemiOPodpisechARazitcich,
		/**přehled bez možnosti editace s info o podpisech a oveření s možností přidání časového razítka*/
		prehledovySInformacemiOPodpisechARazitcichSMoznostiPridaniCasRazitka,
		/**přehled bez možnosti editace GOpravaMetadatElPodani*/
		prehledovyProOpravuMetadat,
	}
	/**
	*     Vysledek kontroly
	*     
	*/
	const enum VysledekKontroly {
		/**dopadlo dobře*/
		Pozitivni,
		/**dopadlo špatně*/
		Negativni,
		/**neurčeno*/
		Neurceno,
	}
	/**Typ akce s el. podáním*/
	const enum TypAkceElPodani {
		/**neurceno*/
		neurceno,
		/**stornovat*/
		stornovat,
		/**odstrornovat*/
		odstornovat,
		/**vratitKeZpracovani*/
		vratitKeZpracovani,
		/**odemknout*/
		odemknout,
		/**nastavit zpracovani automat*/
		nastavitZpracovaniAutomat,
		/**nastavit zpracovani manual*/
		nastavitZpracovaniManual,
		/**sloucit zpet rozlozena*/
		sloucitZpetRozlozena,
	}
	/**
	*     Typ zarazeni eletronického dokumentu
	*     
	*/
	const enum TypZarazeniElSouboru {
		/**neurceno*/
		neurceno,
		/**dokument*/
		dokument,
		/**originál*/
		original,
		/**příloha*/
		priloha,
		/**vnorena priloha*/
		vnorenaPriloha,
		/**el.podpis*/
		elPodpis,
		/**časové razítko*/
		casoveRazitko,
		/**generovana priloha*/
		generovanaPriloha,
		/**systomove časové razítko*/
		systemoveCasoveRazitko,
	}
	interface GPrejmenovaneSouboryDto extends Gordic.Pod.Interface.ElPodaniPrilohyPreBaseDto {
		zmeneno?: Gordic.Pod.Interface.TypUpravyNazvyPrilohy|null;
		zapisDoHistorie?: boolean|null;
	}
	const enum GPrejmenovaneSouboryDtoNames { zmeneno = "zmeneno", zapisDoHistorie = "zapisDoHistorie", jmenoSouboru = "jmenoSouboru", jmenoSouboruOriginal = "jmenoSouboruOriginal", ixb = "ixb", IDGenerated = "IDGenerated", TypChybyFormatu = "TypChybyFormatu", doporucenaPripona = "doporucenaPripona",}
	const enum GPrejmenovaneSouboryDtoFragments { zmeneno = "*", zapisDoHistorie = "*", jmenoSouboru = "*", jmenoSouboruOriginal = "*", ixb = "*", IDGenerated = "*", TypChybyFormatu = "*", doporucenaPripona = "*",}
	const enum GPrejmenovaneSouboryDtoTypes { zmeneno = "Gordic.Pod.Interface.TypUpravyNazvyPrilohy", zapisDoHistorie = "boolean", jmenoSouboru = "string", jmenoSouboruOriginal = "string", ixb = "string", IDGenerated = "string", TypChybyFormatu = "Gordic.Wfl.Interface.TypChybyFormatuSoubory", doporucenaPripona = "string",}
	const enum GPrejmenovaneSouboryDtoTypeLengths {}
	interface GOpravaMetadatOvereniZpravyDto {
		/**Ixp dok.*/
		Ixp?: string|null;
		/**Věc.*/
		Vec?: string|null;
		/**Značka*/
		Znacka?: string|null;
		/**VecPodrobne*/
		VecPodrobne?: string|null;
		/**Zpusob doruceni*/
		ZpusobDoruceni?: Gordic.Wfl.Interface.WflczpdEnum|null;
		/**Zpusob doruceni*/
		ZpusobDoruceniIcon?: Gordic.Wfl.Interface.GIconDefinitionDto|null;
		/**je zprava originalem*/
		IsMsgOriginal?: boolean|null;
		/**je duvod k aktualizaci overeni*/
		IsDuvodKOprave?: boolean|null;
		/**je rozpor v overeni zprávy*/
		IsRozporOvereniMsg?: boolean|null;
		/**Vznikle z rozlozeneho podani*/
		VznikleZRozlozenehoPodani?: boolean|null;
		/**je zprava podepsana*/
		TypPodepsaniMsg_OLD?: Gordic.Wfl.Interface.TypPodepsaniEnum|null;
		/**je zprava podepsana*/
		TypPodepsaniMsg_NEW?: Gordic.Wfl.Interface.TypPodepsaniEnum|null;
		/**je zprava podepsana*/
		TypOvereniMsg_OLD?: Gordic.Wfl.Interface.VysledekOvereniEnum|null;
		/**je zprava podepsana*/
		TypOvereniMsg_NEW?: Gordic.Wfl.Interface.VysledekOvereniEnum|null;
		/**podpis zpravy info*/
		PodepsaniMsgInfo_OLD?: string|null;
		/**cas raz zpravy info*/
		OvereniMsgInfo_OLD?: string|null;
		/**podpis zpravy info*/
		PodepsaniMsgInfo_NEW?: string|null;
		/**cas raz zpravy info*/
		OvereniMsgInfo_NEW?: string|null;
		/**overeni priloh*/
		Prilohy?: Gordic.Pod.Interface.GOpravaMetadatOvereniSouboruDto[]|null;
	}
	const enum GOpravaMetadatOvereniZpravyDtoNames { Ixp = "Ixp", Vec = "Vec", Znacka = "Znacka", VecPodrobne = "VecPodrobne", ZpusobDoruceni = "ZpusobDoruceni", ZpusobDoruceniIcon = "ZpusobDoruceniIcon", IsMsgOriginal = "IsMsgOriginal", IsDuvodKOprave = "IsDuvodKOprave", IsRozporOvereniMsg = "IsRozporOvereniMsg", VznikleZRozlozenehoPodani = "VznikleZRozlozenehoPodani", TypPodepsaniMsg_OLD = "TypPodepsaniMsg_OLD", TypPodepsaniMsg_NEW = "TypPodepsaniMsg_NEW", TypOvereniMsg_OLD = "TypOvereniMsg_OLD", TypOvereniMsg_NEW = "TypOvereniMsg_NEW", PodepsaniMsgInfo_OLD = "PodepsaniMsgInfo_OLD", OvereniMsgInfo_OLD = "OvereniMsgInfo_OLD", PodepsaniMsgInfo_NEW = "PodepsaniMsgInfo_NEW", OvereniMsgInfo_NEW = "OvereniMsgInfo_NEW", Prilohy = "Prilohy",}
	const enum GOpravaMetadatOvereniZpravyDtoFragments { Ixp = "*", Vec = "*", Znacka = "*", VecPodrobne = "*", ZpusobDoruceni = "*", ZpusobDoruceniIcon = "*", IsMsgOriginal = "*", IsDuvodKOprave = "*", IsRozporOvereniMsg = "*", VznikleZRozlozenehoPodani = "*", TypPodepsaniMsg_OLD = "*", TypPodepsaniMsg_NEW = "*", TypOvereniMsg_OLD = "*", TypOvereniMsg_NEW = "*", PodepsaniMsgInfo_OLD = "*", OvereniMsgInfo_OLD = "*", PodepsaniMsgInfo_NEW = "*", OvereniMsgInfo_NEW = "*", Prilohy = "*",}
	const enum GOpravaMetadatOvereniZpravyDtoTypes { Ixp = "string", Vec = "string", Znacka = "string", VecPodrobne = "string", ZpusobDoruceni = "Gordic.Wfl.Interface.WflczpdEnum", ZpusobDoruceniIcon = "Gordic.Wfl.Interface.GIconDefinitionDto", IsMsgOriginal = "boolean", IsDuvodKOprave = "boolean", IsRozporOvereniMsg = "boolean", VznikleZRozlozenehoPodani = "boolean", TypPodepsaniMsg_OLD = "Gordic.Wfl.Interface.TypPodepsaniEnum", TypPodepsaniMsg_NEW = "Gordic.Wfl.Interface.TypPodepsaniEnum", TypOvereniMsg_OLD = "Gordic.Wfl.Interface.VysledekOvereniEnum", TypOvereniMsg_NEW = "Gordic.Wfl.Interface.VysledekOvereniEnum", PodepsaniMsgInfo_OLD = "string", OvereniMsgInfo_OLD = "string", PodepsaniMsgInfo_NEW = "string", OvereniMsgInfo_NEW = "string", Prilohy = "Gordic.Pod.Interface.GOpravaMetadatOvereniSouboruDto[]",}
	const enum GOpravaMetadatOvereniZpravyDtoTypeLengths {}
	interface GPrilohyDto {
		/**Ixp dok.*/
		poradi?: string|null;
		/**Věc.*/
		obsah?: string|null;
		/**Značka*/
		poznamka?: string|null;
		/**Značka*/
		pocet?: number|null;
		/**Věc.*/
		dat_zmena?: JsonDate|null;
		/**Značka*/
		nazev_rf?: string|null;
	}
	const enum GPrilohyDtoNames { poradi = "poradi", obsah = "obsah", poznamka = "poznamka", pocet = "pocet", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf",}
	const enum GPrilohyDtoFragments { poradi = "*", obsah = "*", poznamka = "*", pocet = "*", dat_zmena = "*", nazev_rf = "*",}
	const enum GPrilohyDtoTypes { poradi = "string", obsah = "string", poznamka = "string", pocet = "number", dat_zmena = "JsonDate", nazev_rf = "string",}
	const enum GPrilohyDtoTypeLengths {}
	/**Souhrn - pocty Dto*/
	interface GPodSouhrnInfoDto extends Gordic.Wfl.Interface.GWflSouhrnInfoBaseDto {
		/**El.podani nezpracovana*/
		ElPodaniNezpracovana?: number|null;
		/**El.podani nezpracovana*/
		WflSouhrnInfo?: Gordic.Wfl.Interface.GWflSouhrnInfoDto|null;
	}
	const enum GPodSouhrnInfoDtoNames { ElPodaniNezpracovana = "ElPodaniNezpracovana", WflSouhrnInfo = "WflSouhrnInfo", LoginInfoDto = "LoginInfoDto",}
	const enum GPodSouhrnInfoDtoFragments { ElPodaniNezpracovana = "*", WflSouhrnInfo = "*", LoginInfoDto = "*",}
	const enum GPodSouhrnInfoDtoTypes { ElPodaniNezpracovana = "number", WflSouhrnInfo = "Gordic.Wfl.Interface.GWflSouhrnInfoDto", LoginInfoDto = "Gordic.Wfl.Interface.GLoginInfoDto",}
	const enum GPodSouhrnInfoDtoTypeLengths {}
	interface GOpravaMetadatOvereniSouboruDto extends Gordic.Pod.Interface.ElPodaniPrilohyBaseDto {
		/**stavOvereni_OLD*/
		typPodepsani?: Gordic.Wfl.Interface.TypPodepsaniEnum|null;
		/**stavOvereni_OLD*/
		StavOvereni_OLD?: Gordic.Wfl.Interface.TypVysledkuVerifikaceElPodpisu|null;
		/**stavOvereni_OLD*/
		StavOvereni_NEW?: Gordic.Wfl.Interface.TypVysledkuVerifikaceElPodpisu|null;
		/**je rzopor v overeni*/
		IsRozpor?: boolean|null;
	}
	const enum GOpravaMetadatOvereniSouboruDtoNames { typPodepsani = "typPodepsani", StavOvereni_OLD = "StavOvereni_OLD", StavOvereni_NEW = "StavOvereni_NEW", IsRozpor = "IsRozpor", filePath = "filePath", ixsUloElPod = "ixsUloElPod", typSouboru = "typSouboru", pronom_id = "pronom_id", priznakPodpisu = "priznakPodpisu", isConteiner = "isConteiner", pocetUrovniVnoreni = "pocetUrovniVnoreni", urovenVnoreni = "urovenVnoreni", zarazenJako = "zarazenJako", jmenoNadrizenehoSouboru = "jmenoNadrizenehoSouboru", IDGeneratedNadrizeneho = "IDGeneratedNadrizeneho", IDGeneratedMainFile = "IDGeneratedMainFile", OverenoKeDni = "OverenoKeDni", verifiedToTimeTypeOverKDatu = "verifiedToTimeTypeOverKDatu", DatOvereni = "DatOvereni", sifrovano = "sifrovano", prizVloz = "prizVloz", zpracovatJakoPrilohu = "zpracovatJakoPrilohu", hromadneZpracovanoJakoPriloha = "hromadneZpracovanoJakoPriloha", vyrazenoZPodani = "vyrazenoZPodani", vyrazenoZPodaniAutomaticky = "vyrazenoZPodaniAutomaticky", duvodVyrazeniZPodani = "duvodVyrazeniZPodani", TypDuvoduVyrazaniZPodani = "TypDuvoduVyrazaniZPodani", overeni = "overeni", status = "status", problem = "problem", nameVirus = "nameVirus", problemInfo = "problemInfo", problemKontrolyFormatuInfo = "problemKontrolyFormatuInfo", prizVnitrniPodpisNeboCasRazitka = "prizVnitrniPodpisNeboCasRazitka", prizProPridaniCasRazitka = "prizProPridaniCasRazitka", prizAntivir = "prizAntivir", kontrolaFormatu = "kontrolaFormatu", iconDefinitionOfRegistredFile = "iconDefinitionOfRegistredFile", jmenoSouboru = "jmenoSouboru", jmenoSouboruOriginal = "jmenoSouboruOriginal", ixb = "ixb", IDGenerated = "IDGenerated", TypChybyFormatu = "TypChybyFormatu", doporucenaPripona = "doporucenaPripona",}
	const enum GOpravaMetadatOvereniSouboruDtoFragments { typPodepsani = "*", StavOvereni_OLD = "*", StavOvereni_NEW = "*", IsRozpor = "*", filePath = "*", ixsUloElPod = "*", typSouboru = "*", pronom_id = "*", priznakPodpisu = "*", isConteiner = "*", pocetUrovniVnoreni = "*", urovenVnoreni = "*", zarazenJako = "*", jmenoNadrizenehoSouboru = "*", IDGeneratedNadrizeneho = "*", IDGeneratedMainFile = "*", OverenoKeDni = "*", verifiedToTimeTypeOverKDatu = "*", DatOvereni = "*", sifrovano = "*", prizVloz = "*", zpracovatJakoPrilohu = "*", hromadneZpracovanoJakoPriloha = "*", vyrazenoZPodani = "*", vyrazenoZPodaniAutomaticky = "*", duvodVyrazeniZPodani = "*", TypDuvoduVyrazaniZPodani = "*", overeni = "*", status = "*", problem = "*", nameVirus = "*", problemInfo = "*", problemKontrolyFormatuInfo = "*", prizVnitrniPodpisNeboCasRazitka = "*", prizProPridaniCasRazitka = "*", prizAntivir = "*", kontrolaFormatu = "*", iconDefinitionOfRegistredFile = "*", jmenoSouboru = "*", jmenoSouboruOriginal = "*", ixb = "*", IDGenerated = "*", TypChybyFormatu = "*", doporucenaPripona = "*",}
	const enum GOpravaMetadatOvereniSouboruDtoTypes { typPodepsani = "Gordic.Wfl.Interface.TypPodepsaniEnum", StavOvereni_OLD = "Gordic.Wfl.Interface.TypVysledkuVerifikaceElPodpisu", StavOvereni_NEW = "Gordic.Wfl.Interface.TypVysledkuVerifikaceElPodpisu", IsRozpor = "boolean", filePath = "string", ixsUloElPod = "string", typSouboru = "string", pronom_id = "number", priznakPodpisu = "number", isConteiner = "boolean", pocetUrovniVnoreni = "number", urovenVnoreni = "number", zarazenJako = "Gordic.Pod.Interface.TypZarazeniElSouboru", jmenoNadrizenehoSouboru = "string", IDGeneratedNadrizeneho = "string", IDGeneratedMainFile = "string", OverenoKeDni = "JsonDate", verifiedToTimeTypeOverKDatu = "number", DatOvereni = "JsonDate", sifrovano = "boolean", prizVloz = "boolean", zpracovatJakoPrilohu = "boolean", hromadneZpracovanoJakoPriloha = "boolean", vyrazenoZPodani = "boolean", vyrazenoZPodaniAutomaticky = "boolean", duvodVyrazeniZPodani = "string", TypDuvoduVyrazaniZPodani = "Gordic.Wfl.Interface.WflctdeEnum", overeni = "Gordic.Wfl.Interface.GFileVerifInfoDto", status = "string", problem = "boolean", nameVirus = "string", problemInfo = "string", problemKontrolyFormatuInfo = "string", prizVnitrniPodpisNeboCasRazitka = "Gordic.Pod.Interface.TypVnitrnihoPodpisuNeboCasRazitka", prizProPridaniCasRazitka = "number", prizAntivir = "Gordic.Wfl.Interface.WflcavkEnum", kontrolaFormatu = "boolean", iconDefinitionOfRegistredFile = "Gordic.Wfl.Interface.GIconDefinitionDto", jmenoSouboru = "string", jmenoSouboruOriginal = "string", ixb = "string", IDGenerated = "string", TypChybyFormatu = "Gordic.Wfl.Interface.TypChybyFormatuSoubory", doporucenaPripona = "string",}
	const enum GOpravaMetadatOvereniSouboruDtoTypeLengths { duvodVyrazeniZPodani = 254,}
	interface GHromadnaOpravaMetadatOvereniDto {
		/**je zprava podepsana*/
		KDatu?: JsonDate|null;
		/**Oveřit k datu časového razítka (pokud existuje)*/
		OveritKDatuTst?: boolean|null;
		/**stavOvereni_OLD*/
		Zpusob?: Gordic.Pod.Interface.ZpusobOvereniHromadneAktualizaceMetadat|null;
	}
	const enum GHromadnaOpravaMetadatOvereniDtoNames { KDatu = "KDatu", OveritKDatuTst = "OveritKDatuTst", Zpusob = "Zpusob",}
	const enum GHromadnaOpravaMetadatOvereniDtoFragments { KDatu = "*", OveritKDatuTst = "*", Zpusob = "*",}
	const enum GHromadnaOpravaMetadatOvereniDtoTypes { KDatu = "JsonDate", OveritKDatuTst = "boolean", Zpusob = "Gordic.Pod.Interface.ZpusobOvereniHromadneAktualizaceMetadat",}
	const enum GHromadnaOpravaMetadatOvereniDtoTypeLengths {}
	/**
	*     Dto pro informace o Antiviru
	*     
	*/
	interface AntivirInfoDto {
		/**Produkt*/
		Produkt?: string|null;
		/**Provider*/
		Provider?: string|null;
		/**ProductVerze*/
		ProductVerze?: string|null;
		/**DatabaseVerze*/
		DatabaseVerze?: string|null;
		/**ProductDate*/
		ProductDate?: string|null;
		/**DatabaseDate*/
		DatabaseDate?: string|null;
	}
	const enum AntivirInfoDtoNames { Produkt = "Produkt", Provider = "Provider", ProductVerze = "ProductVerze", DatabaseVerze = "DatabaseVerze", ProductDate = "ProductDate", DatabaseDate = "DatabaseDate",}
	const enum AntivirInfoDtoFragments { Produkt = "*", Provider = "*", ProductVerze = "*", DatabaseVerze = "*", ProductDate = "*", DatabaseDate = "*",}
	const enum AntivirInfoDtoTypes { Produkt = "string", Provider = "string", ProductVerze = "string", DatabaseVerze = "string", ProductDate = "string", DatabaseDate = "string",}
	const enum AntivirInfoDtoTypeLengths {}
	/**DBTABLE:Seznam*/
	interface GPotvrzeniElPodaniDto {
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.mail_to*/
		mail_to?: string|null;
		/**DBCOLUMN:Seznam.mail_from*/
		mail_from?: string|null;
		/**DBCOLUMN:Seznam.mail_cc*/
		mail_cc?: string|null;
		/**DBCOLUMN:Seznam.mail_bcc*/
		mail_bcc?: string|null;
		/**DBCOLUMN:Seznam.predmet*/
		predmet?: string|null;
		/**DBCOLUMN:Seznam.prilohy*/
		prilohy?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ip_adr*/
		ip_adr?: string|null;
		/**DBCOLUMN:Seznam.faze*/
		faze?: string|null;
		/**DBCOLUMN:Seznam.typ_zpr*/
		typ_zpr?: number|null;
		/**DBCOLUMN:Seznam.stav_om*/
		stav_om?: number|null;
		/**DBCOLUMN:Seznam.s_sign*/
		s_sign?: number|null;
		/**DBCOLUMN:Seznam.s_crypt*/
		s_crypt?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:Seznam.ixs_cer*/
		ixs_cer?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:Seznam.typ_zpr_txt*/
		typ_zpr_txt?: string|null;
		/**DBCOLUMN:Seznam.cert_jmeno*/
		cert_jmeno?: string|null;
		/**DBCOLUMN:Seznam.cert_ulice*/
		cert_ulice?: string|null;
		/**DBCOLUMN:Seznam.cert_obec*/
		cert_obec?: string|null;
		/**DBCOLUMN:Seznam.cert_firma*/
		cert_firma?: string|null;
		/**DBCOLUMN:Seznam.cert_email*/
		cert_email?: string|null;
		/**DBCOLUMN:Seznam.cert_poznamka*/
		cert_poznamka?: string|null;
		/**DBCOLUMN:Seznam.cert_dat_od*/
		cert_dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.cert_dat_do*/
		cert_dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.cert_adresa*/
		cert_adresa?: string|null;
		/**DBCOLUMN:Seznam.cert_tel*/
		cert_tel?: string|null;
		/**cert info*/
		cert_info?: string|null;
		/**poradi*/
		poradi?: string|null;
	}
	const enum GPotvrzeniElPodaniDtoNames { lic = "lic", por_cislo = "por_cislo", mail_to = "mail_to", mail_from = "mail_from", mail_cc = "mail_cc", mail_bcc = "mail_bcc", predmet = "predmet", prilohy = "prilohy", poznamka = "poznamka", ixp = "ixp", ip_adr = "ip_adr", faze = "faze", typ_zpr = "typ_zpr", stav_om = "stav_om", s_sign = "s_sign", s_crypt = "s_crypt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixb = "ixb", ixs_cer = "ixs_cer", nazev_ref = "nazev_ref", typ_zpr_txt = "typ_zpr_txt", cert_jmeno = "cert_jmeno", cert_ulice = "cert_ulice", cert_obec = "cert_obec", cert_firma = "cert_firma", cert_email = "cert_email", cert_poznamka = "cert_poznamka", cert_dat_od = "cert_dat_od", cert_dat_do = "cert_dat_do", cert_adresa = "cert_adresa", cert_tel = "cert_tel", cert_info = "cert_info", poradi = "poradi",}
	const enum GPotvrzeniElPodaniDtoFragments { lic = "*", por_cislo = "*", mail_to = "*", mail_from = "*", mail_cc = "*", mail_bcc = "*", predmet = "*", prilohy = "*", poznamka = "*", ixp = "*", ip_adr = "*", faze = "*", typ_zpr = "*", stav_om = "*", s_sign = "*", s_crypt = "*", dat_zmena = "*", zmenu_prov = "*", ixb = "*", ixs_cer = "*", nazev_ref = "*", typ_zpr_txt = "*", cert_jmeno = "*", cert_ulice = "*", cert_obec = "*", cert_firma = "*", cert_email = "*", cert_poznamka = "*", cert_dat_od = "*", cert_dat_do = "*", cert_adresa = "*", cert_tel = "*", cert_info = "*", poradi = "*",}
	const enum GPotvrzeniElPodaniDtoTypes { lic = "string", por_cislo = "number", mail_to = "string", mail_from = "string", mail_cc = "string", mail_bcc = "string", predmet = "string", prilohy = "string", poznamka = "string", ixp = "string", ip_adr = "string", faze = "string", typ_zpr = "number", stav_om = "number", s_sign = "number", s_crypt = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixb = "string", ixs_cer = "string", nazev_ref = "string", typ_zpr_txt = "string", cert_jmeno = "string", cert_ulice = "string", cert_obec = "string", cert_firma = "string", cert_email = "string", cert_poznamka = "string", cert_dat_od = "JsonDate", cert_dat_do = "JsonDate", cert_adresa = "string", cert_tel = "string", cert_info = "string", poradi = "string",}
	const enum GPotvrzeniElPodaniDtoTypeLengths { lic = 4, mail_to = 254, mail_from = 254, mail_cc = 254, mail_bcc = 254, predmet = 254, prilohy = 254, poznamka = 254, ixp = 12, ip_adr = 50, faze = 8, zmenu_prov = 12, ixb = 12, ixs_cer = 12,}
	/**DBTABLE:Seznam*/
	interface GOdeslaniPotvrzeniElPodaniDto {
		/**ixb el. podani*/
		ixb?: string|null;
		/**predmeto*/
		subject?: string|null;
		/**text potvrzení*/
		text?: string|null;
		/**guid podepisovaneho souboru*/
		fileGuid?: string|null;
		/**jmeno podepisovaneho souboru*/
		fileName?: string|null;
		/**nazev souboru potvrzeni*/
		nazevPrilohy?: string|null;
		/**adr. ode.*/
		adrFrom?: string|null;
		/**adr. prijemce*/
		adrTo?: string|null;
		/**IP host - asi není důlužitý*/
		IP?: string|null;
		/**podepsat*/
		podepsat?: boolean|null;
		/**podepsat soubor potvrzeni*/
		podepsatPrilohu?: boolean|null;
		/**podepsat mozno menit*/
		podepsatEnabled?: boolean|null;
		/**mail odeslan*/
		odeslano?: boolean|null;
		/**ixs cert. podpisu*/
		ixsCertPodpisu?: string|null;
		/**kategorie duvodu podpisu*/
		ixsDpo?: string|null;
		/**podepsat*/
		automat?: boolean|null;
		/**typ souboru potvrzeni*/
		typPrilohy?: string|null;
		/**cesta k priloze potrvrzeni*/
		prilohaPath?: string|null;
		/**cesta k podpisu prilohy potvrzeni*/
		podpisPrilohyPath?: string|null;
		/**text cele zpravy*/
		textZpravy?: string|null;
		/**podpis*/
		podpisZpravy?: string|null;
	}
	const enum GOdeslaniPotvrzeniElPodaniDtoNames { ixb = "ixb", subject = "subject", text = "text", fileGuid = "fileGuid", fileName = "fileName", nazevPrilohy = "nazevPrilohy", adrFrom = "adrFrom", adrTo = "adrTo", IP = "IP", podepsat = "podepsat", podepsatPrilohu = "podepsatPrilohu", podepsatEnabled = "podepsatEnabled", odeslano = "odeslano", ixsCertPodpisu = "ixsCertPodpisu", ixsDpo = "ixsDpo", automat = "automat", typPrilohy = "typPrilohy", prilohaPath = "prilohaPath", podpisPrilohyPath = "podpisPrilohyPath", textZpravy = "textZpravy", podpisZpravy = "podpisZpravy",}
	const enum GOdeslaniPotvrzeniElPodaniDtoFragments { ixb = "*", subject = "*", text = "*", fileGuid = "*", fileName = "*", nazevPrilohy = "*", adrFrom = "*", adrTo = "*", IP = "*", podepsat = "*", podepsatPrilohu = "*", podepsatEnabled = "*", odeslano = "*", ixsCertPodpisu = "*", ixsDpo = "*", automat = "*", typPrilohy = "*", prilohaPath = "*", podpisPrilohyPath = "*", textZpravy = "*", podpisZpravy = "*",}
	const enum GOdeslaniPotvrzeniElPodaniDtoTypes { ixb = "string", subject = "string", text = "string", fileGuid = "string", fileName = "string", nazevPrilohy = "string", adrFrom = "string", adrTo = "string", IP = "string", podepsat = "boolean", podepsatPrilohu = "boolean", podepsatEnabled = "boolean", odeslano = "boolean", ixsCertPodpisu = "string", ixsDpo = "string", automat = "boolean", typPrilohy = "string", prilohaPath = "string", podpisPrilohyPath = "string", textZpravy = "string", podpisZpravy = "string",}
	const enum GOdeslaniPotvrzeniElPodaniDtoTypeLengths { ixb = 12, subject = 254, adrFrom = 254, adrTo = 254, ixsCertPodpisu = 12, ixsDpo = 12,}
	/**DBTABLE:PrilohyEmlTable*/
	interface ElPodaniPrilohyPreBaseDto {
		/**jmenoSouboru*/
		jmenoSouboru?: string|null;
		/**jmenoSouboru*/
		jmenoSouboruOriginal?: string|null;
		/**DBCOLUMN:PrilohyEmlTable.ixb*/
		ixb?: string|null;
		/**IDGenerated*/
		IDGenerated?: string|null;
		/**typ chyby formatu*/
		TypChybyFormatu?: Gordic.Wfl.Interface.TypChybyFormatuSoubory|null;
		/**doporucena pripona (format) souboru prilohy*/
		doporucenaPripona?: string|null;
	}
	const enum ElPodaniPrilohyPreBaseDtoNames { jmenoSouboru = "jmenoSouboru", jmenoSouboruOriginal = "jmenoSouboruOriginal", ixb = "ixb", IDGenerated = "IDGenerated", TypChybyFormatu = "TypChybyFormatu", doporucenaPripona = "doporucenaPripona",}
	const enum ElPodaniPrilohyPreBaseDtoFragments { jmenoSouboru = "*", jmenoSouboruOriginal = "*", ixb = "*", IDGenerated = "*", TypChybyFormatu = "*", doporucenaPripona = "*",}
	const enum ElPodaniPrilohyPreBaseDtoTypes { jmenoSouboru = "string", jmenoSouboruOriginal = "string", ixb = "string", IDGenerated = "string", TypChybyFormatu = "Gordic.Wfl.Interface.TypChybyFormatuSoubory", doporucenaPripona = "string",}
	const enum ElPodaniPrilohyPreBaseDtoTypeLengths {}
	/**DBTABLE:PrilohyEmlTable*/
	interface ElPodaniPrilohyBaseDto extends Gordic.Pod.Interface.ElPodaniPrilohyPreBaseDto {
		/**cesta k souboru*/
		filePath?: string|null;
		/**ixsUloElPod*/
		ixsUloElPod?: string|null;
		/**typ souboru*/
		typSouboru?: string|null;
		/**pronom ID*/
		pronom_id?: number|null;
		/**prizna podpisu*/
		priznakPodpisu?: number|null;
		/**jedná se o konteiner*/
		isConteiner?: boolean|null;
		/**pocet urovni vnoreni*/
		pocetUrovniVnoreni?: number|null;
		/**uroven vnoreni*/
		urovenVnoreni?: number|null;
		/**zarazen jako*/
		zarazenJako?: Gordic.Pod.Interface.TypZarazeniElSouboru|null;
		/**jmeno nadrizeneho souboru*/
		jmenoNadrizenehoSouboru?: string|null;
		/**ID generated nadrizeneho*/
		IDGeneratedNadrizeneho?: string|null;
		/**ID generated mainFile*/
		IDGeneratedMainFile?: string|null;
		/**overeno ke dni*/
		OverenoKeDni?: JsonDate|null;
		/**verified to TypeOverKDatu*/
		verifiedToTimeTypeOverKDatu?: number|null;
		/**datum overeni*/
		DatOvereni?: JsonDate|null;
		/**sifrovano*/
		sifrovano?: boolean|null;
		/**priz vloz*/
		prizVloz?: boolean|null;
		/**zpracovat jako prilohu*/
		zpracovatJakoPrilohu?: boolean|null;
		/**bylo hromadne oznaceno ke zpracovani jako samostatna priloha*/
		hromadneZpracovanoJakoPriloha?: boolean|null;
		/**příloha označena, že se nemá ukládat*/
		vyrazenoZPodani?: boolean|null;
		/**příloha je automaticky označena, že se nemá ukládat*/
		vyrazenoZPodaniAutomaticky?: boolean|null;
		/**informace o podpisech*/
		duvodVyrazeniZPodani?: string|null;
		/**informace o podpisech*/
		TypDuvoduVyrazaniZPodani?: Gordic.Wfl.Interface.WflctdeEnum|null;
		/**overeni*/
		overeni?: Gordic.Wfl.Interface.GFileVerifInfoDto|null;
		/**informace o podpisech*/
		status?: string|null;
		/**problem*/
		problem?: boolean|null;
		/**nameVirus*/
		nameVirus?: string|null;
		/**problemInfo*/
		problemInfo?: string|null;
		/**problemInfo*/
		problemKontrolyFormatuInfo?: string|null;
		/**prizVnitrniPodpisNeboCasRazitka*/
		prizVnitrniPodpisNeboCasRazitka?: Gordic.Pod.Interface.TypVnitrnihoPodpisuNeboCasRazitka|null;
		/**prizProPridaniCasRazitka*/
		prizProPridaniCasRazitka?: number|null;
		/**prizAntivir*/
		prizAntivir?: Gordic.Wfl.Interface.WflcavkEnum|null;
		/**byla provedno kontrola formatu*/
		kontrolaFormatu?: boolean|null;
		/**ikona registred file*/
		iconDefinitionOfRegistredFile?: Gordic.Wfl.Interface.GIconDefinitionDto|null;
	}
	const enum ElPodaniPrilohyBaseDtoNames { filePath = "filePath", ixsUloElPod = "ixsUloElPod", typSouboru = "typSouboru", pronom_id = "pronom_id", priznakPodpisu = "priznakPodpisu", isConteiner = "isConteiner", pocetUrovniVnoreni = "pocetUrovniVnoreni", urovenVnoreni = "urovenVnoreni", zarazenJako = "zarazenJako", jmenoNadrizenehoSouboru = "jmenoNadrizenehoSouboru", IDGeneratedNadrizeneho = "IDGeneratedNadrizeneho", IDGeneratedMainFile = "IDGeneratedMainFile", OverenoKeDni = "OverenoKeDni", verifiedToTimeTypeOverKDatu = "verifiedToTimeTypeOverKDatu", DatOvereni = "DatOvereni", sifrovano = "sifrovano", prizVloz = "prizVloz", zpracovatJakoPrilohu = "zpracovatJakoPrilohu", hromadneZpracovanoJakoPriloha = "hromadneZpracovanoJakoPriloha", vyrazenoZPodani = "vyrazenoZPodani", vyrazenoZPodaniAutomaticky = "vyrazenoZPodaniAutomaticky", duvodVyrazeniZPodani = "duvodVyrazeniZPodani", TypDuvoduVyrazaniZPodani = "TypDuvoduVyrazaniZPodani", overeni = "overeni", status = "status", problem = "problem", nameVirus = "nameVirus", problemInfo = "problemInfo", problemKontrolyFormatuInfo = "problemKontrolyFormatuInfo", prizVnitrniPodpisNeboCasRazitka = "prizVnitrniPodpisNeboCasRazitka", prizProPridaniCasRazitka = "prizProPridaniCasRazitka", prizAntivir = "prizAntivir", kontrolaFormatu = "kontrolaFormatu", iconDefinitionOfRegistredFile = "iconDefinitionOfRegistredFile", jmenoSouboru = "jmenoSouboru", jmenoSouboruOriginal = "jmenoSouboruOriginal", ixb = "ixb", IDGenerated = "IDGenerated", TypChybyFormatu = "TypChybyFormatu", doporucenaPripona = "doporucenaPripona",}
	const enum ElPodaniPrilohyBaseDtoFragments { filePath = "*", ixsUloElPod = "*", typSouboru = "*", pronom_id = "*", priznakPodpisu = "*", isConteiner = "*", pocetUrovniVnoreni = "*", urovenVnoreni = "*", zarazenJako = "*", jmenoNadrizenehoSouboru = "*", IDGeneratedNadrizeneho = "*", IDGeneratedMainFile = "*", OverenoKeDni = "*", verifiedToTimeTypeOverKDatu = "*", DatOvereni = "*", sifrovano = "*", prizVloz = "*", zpracovatJakoPrilohu = "*", hromadneZpracovanoJakoPriloha = "*", vyrazenoZPodani = "*", vyrazenoZPodaniAutomaticky = "*", duvodVyrazeniZPodani = "*", TypDuvoduVyrazaniZPodani = "*", overeni = "*", status = "*", problem = "*", nameVirus = "*", problemInfo = "*", problemKontrolyFormatuInfo = "*", prizVnitrniPodpisNeboCasRazitka = "*", prizProPridaniCasRazitka = "*", prizAntivir = "*", kontrolaFormatu = "*", iconDefinitionOfRegistredFile = "*", jmenoSouboru = "*", jmenoSouboruOriginal = "*", ixb = "*", IDGenerated = "*", TypChybyFormatu = "*", doporucenaPripona = "*",}
	const enum ElPodaniPrilohyBaseDtoTypes { filePath = "string", ixsUloElPod = "string", typSouboru = "string", pronom_id = "number", priznakPodpisu = "number", isConteiner = "boolean", pocetUrovniVnoreni = "number", urovenVnoreni = "number", zarazenJako = "Gordic.Pod.Interface.TypZarazeniElSouboru", jmenoNadrizenehoSouboru = "string", IDGeneratedNadrizeneho = "string", IDGeneratedMainFile = "string", OverenoKeDni = "JsonDate", verifiedToTimeTypeOverKDatu = "number", DatOvereni = "JsonDate", sifrovano = "boolean", prizVloz = "boolean", zpracovatJakoPrilohu = "boolean", hromadneZpracovanoJakoPriloha = "boolean", vyrazenoZPodani = "boolean", vyrazenoZPodaniAutomaticky = "boolean", duvodVyrazeniZPodani = "string", TypDuvoduVyrazaniZPodani = "Gordic.Wfl.Interface.WflctdeEnum", overeni = "Gordic.Wfl.Interface.GFileVerifInfoDto", status = "string", problem = "boolean", nameVirus = "string", problemInfo = "string", problemKontrolyFormatuInfo = "string", prizVnitrniPodpisNeboCasRazitka = "Gordic.Pod.Interface.TypVnitrnihoPodpisuNeboCasRazitka", prizProPridaniCasRazitka = "number", prizAntivir = "Gordic.Wfl.Interface.WflcavkEnum", kontrolaFormatu = "boolean", iconDefinitionOfRegistredFile = "Gordic.Wfl.Interface.GIconDefinitionDto", jmenoSouboru = "string", jmenoSouboruOriginal = "string", ixb = "string", IDGenerated = "string", TypChybyFormatu = "Gordic.Wfl.Interface.TypChybyFormatuSoubory", doporucenaPripona = "string",}
	const enum ElPodaniPrilohyBaseDtoTypeLengths { duvodVyrazeniZPodani = 254,}
	interface GElPodaniPrilohyStrukturovaneDto extends Gordic.Pod.Interface.ElPodaniPrilohyBaseDto {
		/**pocet podpisu*/
		index?: string|null;
		/**pocet podpisu*/
		pocet_podpisu?: number|null;
		/**pocet nevalid. podpisu*/
		pocet_nevalid_podpisu?: number|null;
		pocet_neoverenych_podpisu?: number|null;
		pocet_casRaz?: number|null;
		pocet_nevalid_casRaz?: number|null;
		pocet_neoverenych_casRaz?: number|null;
		duvod_nevalid_podpisu_txt?: string|null;
		duvod_nevalid_casRaz_txt?: string|null;
		/**Oveřit k datu časového razítka (pokud existuje)*/
		OveritKDatuTst?: boolean|null;
		/**zarazen jako text*/
		zarazenJakoText?: string|null;
		/**zarazen jako text*/
		jeTrebaPridatCasRaz?: boolean|null;
		/**vnitrni podpisy*/
		typPodepsaniIcon?: Gordic.Wfl.Interface.GIconDefinitionDto|null;
		/**razitka*/
		podepsaniInfoIcon?: Gordic.Wfl.Interface.GIconDefinitionDto|null;
		IsChecked?: boolean|null;
		IsDisabled?: boolean|null;
		/**stavOvereni_OLD*/
		Zpusob?: Gordic.Pod.Interface.ZpusobOvereniHromadneAktualizaceMetadat|null;
	}
	const enum GElPodaniPrilohyStrukturovaneDtoNames { index = "index", pocet_podpisu = "pocet_podpisu", pocet_nevalid_podpisu = "pocet_nevalid_podpisu", pocet_neoverenych_podpisu = "pocet_neoverenych_podpisu", pocet_casRaz = "pocet_casRaz", pocet_nevalid_casRaz = "pocet_nevalid_casRaz", pocet_neoverenych_casRaz = "pocet_neoverenych_casRaz", duvod_nevalid_podpisu_txt = "duvod_nevalid_podpisu_txt", duvod_nevalid_casRaz_txt = "duvod_nevalid_casRaz_txt", OveritKDatuTst = "OveritKDatuTst", zarazenJakoText = "zarazenJakoText", jeTrebaPridatCasRaz = "jeTrebaPridatCasRaz", typPodepsaniIcon = "typPodepsaniIcon", podepsaniInfoIcon = "podepsaniInfoIcon", IsChecked = "IsChecked", IsDisabled = "IsDisabled", Zpusob = "Zpusob", filePath = "filePath", ixsUloElPod = "ixsUloElPod", typSouboru = "typSouboru", pronom_id = "pronom_id", priznakPodpisu = "priznakPodpisu", isConteiner = "isConteiner", pocetUrovniVnoreni = "pocetUrovniVnoreni", urovenVnoreni = "urovenVnoreni", zarazenJako = "zarazenJako", jmenoNadrizenehoSouboru = "jmenoNadrizenehoSouboru", IDGeneratedNadrizeneho = "IDGeneratedNadrizeneho", IDGeneratedMainFile = "IDGeneratedMainFile", OverenoKeDni = "OverenoKeDni", verifiedToTimeTypeOverKDatu = "verifiedToTimeTypeOverKDatu", DatOvereni = "DatOvereni", sifrovano = "sifrovano", prizVloz = "prizVloz", zpracovatJakoPrilohu = "zpracovatJakoPrilohu", hromadneZpracovanoJakoPriloha = "hromadneZpracovanoJakoPriloha", vyrazenoZPodani = "vyrazenoZPodani", vyrazenoZPodaniAutomaticky = "vyrazenoZPodaniAutomaticky", duvodVyrazeniZPodani = "duvodVyrazeniZPodani", TypDuvoduVyrazaniZPodani = "TypDuvoduVyrazaniZPodani", overeni = "overeni", status = "status", problem = "problem", nameVirus = "nameVirus", problemInfo = "problemInfo", problemKontrolyFormatuInfo = "problemKontrolyFormatuInfo", prizVnitrniPodpisNeboCasRazitka = "prizVnitrniPodpisNeboCasRazitka", prizProPridaniCasRazitka = "prizProPridaniCasRazitka", prizAntivir = "prizAntivir", kontrolaFormatu = "kontrolaFormatu", iconDefinitionOfRegistredFile = "iconDefinitionOfRegistredFile", jmenoSouboru = "jmenoSouboru", jmenoSouboruOriginal = "jmenoSouboruOriginal", ixb = "ixb", IDGenerated = "IDGenerated", TypChybyFormatu = "TypChybyFormatu", doporucenaPripona = "doporucenaPripona",}
	const enum GElPodaniPrilohyStrukturovaneDtoFragments { index = "*", pocet_podpisu = "*", pocet_nevalid_podpisu = "*", pocet_neoverenych_podpisu = "*", pocet_casRaz = "*", pocet_nevalid_casRaz = "*", pocet_neoverenych_casRaz = "*", duvod_nevalid_podpisu_txt = "*", duvod_nevalid_casRaz_txt = "*", OveritKDatuTst = "*", zarazenJakoText = "*", jeTrebaPridatCasRaz = "*", typPodepsaniIcon = "*", podepsaniInfoIcon = "*", IsChecked = "*", IsDisabled = "*", Zpusob = "*", filePath = "*", ixsUloElPod = "*", typSouboru = "*", pronom_id = "*", priznakPodpisu = "*", isConteiner = "*", pocetUrovniVnoreni = "*", urovenVnoreni = "*", zarazenJako = "*", jmenoNadrizenehoSouboru = "*", IDGeneratedNadrizeneho = "*", IDGeneratedMainFile = "*", OverenoKeDni = "*", verifiedToTimeTypeOverKDatu = "*", DatOvereni = "*", sifrovano = "*", prizVloz = "*", zpracovatJakoPrilohu = "*", hromadneZpracovanoJakoPriloha = "*", vyrazenoZPodani = "*", vyrazenoZPodaniAutomaticky = "*", duvodVyrazeniZPodani = "*", TypDuvoduVyrazaniZPodani = "*", overeni = "*", status = "*", problem = "*", nameVirus = "*", problemInfo = "*", problemKontrolyFormatuInfo = "*", prizVnitrniPodpisNeboCasRazitka = "*", prizProPridaniCasRazitka = "*", prizAntivir = "*", kontrolaFormatu = "*", iconDefinitionOfRegistredFile = "*", jmenoSouboru = "*", jmenoSouboruOriginal = "*", ixb = "*", IDGenerated = "*", TypChybyFormatu = "*", doporucenaPripona = "*",}
	const enum GElPodaniPrilohyStrukturovaneDtoTypes { index = "string", pocet_podpisu = "number", pocet_nevalid_podpisu = "number", pocet_neoverenych_podpisu = "number", pocet_casRaz = "number", pocet_nevalid_casRaz = "number", pocet_neoverenych_casRaz = "number", duvod_nevalid_podpisu_txt = "string", duvod_nevalid_casRaz_txt = "string", OveritKDatuTst = "boolean", zarazenJakoText = "string", jeTrebaPridatCasRaz = "boolean", typPodepsaniIcon = "Gordic.Wfl.Interface.GIconDefinitionDto", podepsaniInfoIcon = "Gordic.Wfl.Interface.GIconDefinitionDto", IsChecked = "boolean", IsDisabled = "boolean", Zpusob = "Gordic.Pod.Interface.ZpusobOvereniHromadneAktualizaceMetadat", filePath = "string", ixsUloElPod = "string", typSouboru = "string", pronom_id = "number", priznakPodpisu = "number", isConteiner = "boolean", pocetUrovniVnoreni = "number", urovenVnoreni = "number", zarazenJako = "Gordic.Pod.Interface.TypZarazeniElSouboru", jmenoNadrizenehoSouboru = "string", IDGeneratedNadrizeneho = "string", IDGeneratedMainFile = "string", OverenoKeDni = "JsonDate", verifiedToTimeTypeOverKDatu = "number", DatOvereni = "JsonDate", sifrovano = "boolean", prizVloz = "boolean", zpracovatJakoPrilohu = "boolean", hromadneZpracovanoJakoPriloha = "boolean", vyrazenoZPodani = "boolean", vyrazenoZPodaniAutomaticky = "boolean", duvodVyrazeniZPodani = "string", TypDuvoduVyrazaniZPodani = "Gordic.Wfl.Interface.WflctdeEnum", overeni = "Gordic.Wfl.Interface.GFileVerifInfoDto", status = "string", problem = "boolean", nameVirus = "string", problemInfo = "string", problemKontrolyFormatuInfo = "string", prizVnitrniPodpisNeboCasRazitka = "Gordic.Pod.Interface.TypVnitrnihoPodpisuNeboCasRazitka", prizProPridaniCasRazitka = "number", prizAntivir = "Gordic.Wfl.Interface.WflcavkEnum", kontrolaFormatu = "boolean", iconDefinitionOfRegistredFile = "Gordic.Wfl.Interface.GIconDefinitionDto", jmenoSouboru = "string", jmenoSouboruOriginal = "string", ixb = "string", IDGenerated = "string", TypChybyFormatu = "Gordic.Wfl.Interface.TypChybyFormatuSoubory", doporucenaPripona = "string",}
	const enum GElPodaniPrilohyStrukturovaneDtoTypeLengths { duvodVyrazeniZPodani = 254,}
	/**
	*     Způsob načtení informací o datové zprávě.
	*     
	*/
	const enum ZpusobOvereniHromadneAktualizaceMetadat {
		kDatuDodani,
		kDatuStazeni,
		keKonkretnimuDatu,
	}
	/**
	*     Způsob zpracovaní (rozboru) el podání dle typu dorucení
	*     
	*/
	const enum TypZpusobuZpracovaniElPodani {
		/**rozebere datovou zprávu*/
		decodeDZ,
		/**rozebere e-mail*/
		decodeEML,
		/**rozebere datovou zpravu SK*/
		decodeSDKZ,
		/**rozbalí soubor ZIP*/
		UnzipZIP,
		/**zpracuje jako interní vypravení*/
		resolveInterniVypraveni,
	}
	/**typ zpracovani konteinerovych souboru (pod_rozbor_kont)*/
	const enum TypZpracovaniVnorenychSouboru {
		/**nezpracovavat vnorene soubory*/
		neurceno=99,
		/**nezpracovavat vnorene soubory*/
		nezpracovavat=0,
		/**zpracovat a zobrazit info*/
		zpracovatBezUlozeni=1,
		/**zpracovat a uložit data*/
		zpracovatSUlozenimDat=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.Interface\GPodInterfaceDto.d.ts 

declare namespace Gordic.Pod.Interface {
	/**mod formuláre podání*/
	const enum ModFormuPodaniEnum {
		/**NovePodani*/
		NovePodani,
		/**NovePodaniAutomat*/
		NovePodaniAutomat,
		/**editace po el podani*/
		EditacePoElPodani,
		/**OpravaPodani*/
		OpravaPodani,
		/**Oprava po podani interniho vypraveni*/
		OpravaPoPodaniInternihoVypraveni,
		/**OpravaElPodani*/
		OpravaElPodani,
	}
	/**Způsob odeslání potvrzení*/
	const enum ZpusobOdeslaniPotvrzeni {
		/**neodesílat potvrzení*/
		neodesilat,
		/**písemně*/
		pisemne,
		/**E-mailem*/
		Email,
		/**datová zpráva*/
		DZ,
		/**systémem GEX*/
		GEX,
		/**neurceno*/
		neurceno,
	}
	/**typ storna podani pisemnosti*/
	const enum TypStornaPodani {
		/**neurceno*/
		neurceno,
		/**El. podání bylo odmítnuto a tudíž byl vzniklý dokument stornován*/
		ElPodaniByloOdmitnuto,
		/**nic - nedopadlo podání písemnosti*/
		OperaceNeprobehlaUspesne,
		/**Není vybrán originál*/
		neniVybranOriginal,
		/**Nepodařilo se uložit originál podání*/
		nepodariloSeUlozitOriginalPodani,
		/**Nepodařilo se nastavit příznak el. dokumentu*/
		nepodariloSeNastavitPriznakElDok,
		/**Nepodařilo se uložit podpis k originálu*/
		nepodariloSeUlozitPodpisOriginalu,
		/**Nepodařilo se uložit jednu z příloh*/
		nepodariloSeUlozitJednuZPriloh,
		/**Nepodařilo se uložit jeden z podpisu k jedné z příloh*/
		nepodariloSeUlozitPodpisPrilohy,
		/**Nepodařilo se nastavit příznaky el. podání*/
		nepodariloSeNastavitPriznakElPodani,
		/**Nepovolené přípony (typy souborů) pro úložiště*/
		nepovolenePriponyProUloziste,
		/**Nepodarilo se pridat systémové casové razítko*/
		nepodariloSePridatSystemoveCasoveRazitko,
	}
	/**Duvod odmitnuti ElPodani*/
	const enum DuvodOdmitnutiElPodani {
		/**neurčeno, respektive není důvod*/
		neurceno=0,
		/**nečitelnost*/
		necitelne=40,
		/**Zavirování*/
		neprosloVirovouKontrolou=50,
		/**Neodpovídá vyhl. stand. el. podaní*/
		chybiElPodpis=60,
		/**Chybí el. podpis*/
		chybiCasoveRazitko=65,
		/**Nelze ověřit el. podpis*/
		nelzeOveritElPodpis=70,
		/**nelze ověřit čas. razítko*/
		nelzeOveritCasoveRazitko=75,
		/**Chybí čas. razítko*/
		nesplnujeStandard=80,
		/**jiný (neznámý důvod)*/
		jiny=99,
	}
	/**Duvod odmitnuti ElPodani*/
	const enum StavEPODPrijato {
		/**neprijato*/
		neurceno=0,
		/**StavEPODPrijato*/
		StavEPODPrijato=10,
		/**chbStavEPODPrijatoBezPodpisu*/
		StavEPODPrijatoBezPodpisu=20,
		/**chbStavEPODPrijatoBezPodpisu*/
		StavEPODPrijatoNevalidniPodpis=30,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.Interface\DTO\GElPodaniInfoDto.d.ts 

declare namespace Gordic.Pod.Interface {
	/**DBTABLE:Seznam*/
	interface GElPodaniInfoDto {
		/**identifikace el.podání*/
		message_id?: string|null;
		/**ID-el-podani*/
		ixb_el_pod?: string|null;
		/**Id-esui*/
		ixs_esu?: string|null;
		/**Id-eu*/
		ixs_exu?: string|null;
		/**ID-dokumentu*/
		ixp?: string|null;
		/**Dat-podan*/
		dat_pod?: JsonDate|null;
		/**Stav-podani*/
		stav_zpracovani?: string|null;
		/**Stav-podani*/
		duvod_odmitnuti?: string|null;
		/**Stav-podani-interni-kod*/
		stav_inb?: number|null;
		/**Stav-podani-interni-text*/
		stav_inb_txt?: string|null;
		/**Stav-podani*/
		stav_epod_txt?: string|null;
		/**Stav-odeslani-odpovedi-kod*/
		epod_s_odp?: number|null;
		/**Stav-odeslani-odpovedi-text*/
		epod_s_odp_txt?: string|null;
		/**cislo jednaci*/
		cj?: string|null;
		/**Spisová značka*/
		cj_spis?: string|null;
		/**předmět/ věc(subject) el.podání – krátký popis – dle obsahu lze třídit na podání zpracovatelná automatem EPA*/
		poznamka?: string|null;
		/**předmět/ věc(subject) el.podání – krátký popis – dle obsahu lze třídit na podání zpracovatelná automatem EPA*/
		IDsNavazane?: string[]|null;
	}
	const enum GElPodaniInfoDtoNames { message_id = "message_id", ixb_el_pod = "ixb_el_pod", ixs_esu = "ixs_esu", ixs_exu = "ixs_exu", ixp = "ixp", dat_pod = "dat_pod", stav_zpracovani = "stav_zpracovani", duvod_odmitnuti = "duvod_odmitnuti", stav_inb = "stav_inb", stav_inb_txt = "stav_inb_txt", stav_epod_txt = "stav_epod_txt", epod_s_odp = "epod_s_odp", epod_s_odp_txt = "epod_s_odp_txt", cj = "cj", cj_spis = "cj_spis", poznamka = "poznamka", IDsNavazane = "IDsNavazane",}
	const enum GElPodaniInfoDtoFragments { message_id = "*", ixb_el_pod = "*", ixs_esu = "*", ixs_exu = "*", ixp = "*", dat_pod = "*", stav_zpracovani = "*", duvod_odmitnuti = "*", stav_inb = "*", stav_inb_txt = "*", stav_epod_txt = "*", epod_s_odp = "*", epod_s_odp_txt = "*", cj = "*", cj_spis = "*", poznamka = "*", IDsNavazane = "*",}
	const enum GElPodaniInfoDtoTypes { message_id = "string", ixb_el_pod = "string", ixs_esu = "string", ixs_exu = "string", ixp = "string", dat_pod = "JsonDate", stav_zpracovani = "string", duvod_odmitnuti = "string", stav_inb = "number", stav_inb_txt = "string", stav_epod_txt = "string", epod_s_odp = "number", epod_s_odp_txt = "string", cj = "string", cj_spis = "string", poznamka = "string", IDsNavazane = "string[]",}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.Interface\DTO\GPodDefaultSettingsDto.d.ts 

declare namespace Gordic.Pod.Interface {
	/**Dto uživatelského nastavení POD defaultní v UserSettings (GStore)*/
	interface GPodDefaultSettingsDto {
		/**SUFunkce Reference Predani*/
		SUFuncRefPredani_IxsSu?: string|null;
		/**SUFunkce Reference Predani*/
		SUFuncRefPredani_IxsFun?: string|null;
		/**SUFunkce Reference Predani*/
		Redistribuce?: string|null;
		/**věc je povinná*/
		Evidovat?: boolean|null;
		/**SUFunkce Reference Predani*/
		ZpusobDoruceni?: number|null;
		/**SUFunkce Reference Predani*/
		DruhZachazeniDoruceni?: number|null;
		/**SUFunkce Reference Predani*/
		DruhZasilkyDoruceni?: number|null;
		/**SUFunkce Reference Predani*/
		StupUtaj?: number|null;
		/**věc je povinná*/
		PristupPlnitDleTypuDok?: boolean|null;
		/**věc je povinná*/
		RozsirenyProfilPrednastavit?: boolean|null;
		/**věc je povinná*/
		RozsirenyProfilZakazat?: boolean|null;
		/**věc je povinná*/
		VytvoritSpisPrednastavit?: boolean|null;
		/**věc je povinná*/
		VytvoritSpisZakazat?: boolean|null;
		/**věc je povinná*/
		DotazPredEvidenci?: boolean|null;
		/**věc je povinná*/
		PreskocitZVecPo50DoVecPodrobne?: boolean|null;
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
		TypPis?: string|null;
		/**věc je povinná*/
		TypDokAktivitaSSL?: boolean|null;
		/**Autogenerated.*/
		SpisZnak_spis_pl?: string|null;
		/**Autogenerated.*/
		SpisZnak_spis_znak?: string|null;
		/**věc je povinná*/
		SpZnakPlnitDleTypuDok?: boolean|null;
		/**Autogenerated.*/
		Stat?: number|null;
		/**Autogenerated.*/
		Psc?: string|null;
	}
	const enum GPodDefaultSettingsDtoNames { SUFuncRefPredani_IxsSu = "SUFuncRefPredani_IxsSu", SUFuncRefPredani_IxsFun = "SUFuncRefPredani_IxsFun", Redistribuce = "Redistribuce", Evidovat = "Evidovat", ZpusobDoruceni = "ZpusobDoruceni", DruhZachazeniDoruceni = "DruhZachazeniDoruceni", DruhZasilkyDoruceni = "DruhZasilkyDoruceni", StupUtaj = "StupUtaj", PristupPlnitDleTypuDok = "PristupPlnitDleTypuDok", RozsirenyProfilPrednastavit = "RozsirenyProfilPrednastavit", RozsirenyProfilZakazat = "RozsirenyProfilZakazat", VytvoritSpisPrednastavit = "VytvoritSpisPrednastavit", VytvoritSpisZakazat = "VytvoritSpisZakazat", DotazPredEvidenci = "DotazPredEvidenci", PreskocitZVecPo50DoVecPodrobne = "PreskocitZVecPo50DoVecPodrobne", PocListu = "PocListu", PocStran = "PocStran", PocPriloh = "PocPriloh", PocKopii = "PocKopii", PocListuPriloh = "PocListuPriloh", TypPis = "TypPis", TypDokAktivitaSSL = "TypDokAktivitaSSL", SpisZnak_spis_pl = "SpisZnak_spis_pl", SpisZnak_spis_znak = "SpisZnak_spis_znak", SpZnakPlnitDleTypuDok = "SpZnakPlnitDleTypuDok", Stat = "Stat", Psc = "Psc",}
	const enum GPodDefaultSettingsDtoFragments { SUFuncRefPredani_IxsSu = "*", SUFuncRefPredani_IxsFun = "*", Redistribuce = "*", Evidovat = "*", ZpusobDoruceni = "*", DruhZachazeniDoruceni = "*", DruhZasilkyDoruceni = "*", StupUtaj = "*", PristupPlnitDleTypuDok = "*", RozsirenyProfilPrednastavit = "*", RozsirenyProfilZakazat = "*", VytvoritSpisPrednastavit = "*", VytvoritSpisZakazat = "*", DotazPredEvidenci = "*", PreskocitZVecPo50DoVecPodrobne = "*", PocListu = "*", PocStran = "*", PocPriloh = "*", PocKopii = "*", PocListuPriloh = "*", TypPis = "*", TypDokAktivitaSSL = "*", SpisZnak_spis_pl = "*", SpisZnak_spis_znak = "*", SpZnakPlnitDleTypuDok = "*", Stat = "*", Psc = "*",}
	const enum GPodDefaultSettingsDtoTypes { SUFuncRefPredani_IxsSu = "string", SUFuncRefPredani_IxsFun = "string", Redistribuce = "string", Evidovat = "boolean", ZpusobDoruceni = "number", DruhZachazeniDoruceni = "number", DruhZasilkyDoruceni = "number", StupUtaj = "number", PristupPlnitDleTypuDok = "boolean", RozsirenyProfilPrednastavit = "boolean", RozsirenyProfilZakazat = "boolean", VytvoritSpisPrednastavit = "boolean", VytvoritSpisZakazat = "boolean", DotazPredEvidenci = "boolean", PreskocitZVecPo50DoVecPodrobne = "boolean", PocListu = "string", PocStran = "number", PocPriloh = "number", PocKopii = "number", PocListuPriloh = "string", TypPis = "string", TypDokAktivitaSSL = "boolean", SpisZnak_spis_pl = "string", SpisZnak_spis_znak = "string", SpZnakPlnitDleTypuDok = "boolean", Stat = "number", Psc = "string",}
	const enum GPodDefaultSettingsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Pod.Interface\DTO\GPodElPodaniSettingsDto.d.ts 

declare namespace Gordic.Pod.Interface {
	/**Dto uživatelského nastavení SPI v UserSettings (GStore)*/
	interface GPodElPodaniSettingsDto {
		/**věc je povinná*/
		VecPovinne?: boolean|null;
		/**PSC je povinná*/
		PscPovinne?: boolean|null;
		/**Odesilatel je povinná*/
		OdesilatelPovinne?: boolean|null;
		/**PDF nevalidovat*/
		NevalidovatPDF?: boolean|null;
		/**Podani emaiem je obsah zpravy*/
		PodaniMailJeObsahZpravy?: boolean|null;
		/**Podani datovou zpravou je obsah zpravy*/
		PodaniDZJeObsahZpravy?: boolean|null;
		/**Neplnit tělo mailu potvrzení přijmu na el. podání standardním textem*/
		NeplnitMailPotvrzeniStandardTextem?: boolean|null;
		/**Po dokončení zobrazit detail dokumentu*/
		PoElPodaniZobrazitDetailDokumentu?: boolean|null;
		/**Přenést do položky věc předmět zprávy*/
		PrenestDoVeciPredmetZpravy?: boolean|null;
		/**Přenést do položky věc-podrobně předmět zprávy*/
		PrenestDoVeciPodrobnePredmetZpravy?: boolean|null;
		/**Počet dní do kdy má být zpracováno*/
		PocetDniKeZpracovani?: number|null;
		/**Počet dní, do kdy má být zpracováno*/
		PocetHodinPredZpracovanim?: number|null;
		/**Typ dokumentu*/
		IxsTypDok?: string|null;
		/**Vypnout kontrolu konzistence dat*/
		ZapnoutKontroluKonzsitence?: boolean|null;
		/**Prohodit plnění položky věc a poznámka k doručení*/
		ProhoditPlneniVecAPoznamka?: boolean|null;
		/**Nastavení předplnění položky věc*/
		PreplneniVec?: string|null;
		/**Nastavení předplnění položky věc*/
		EvidovatElPodani?: boolean|null;
		/**Používat historii v položce Věc*/
		PouzivatHistoriiVPolicuVec?: boolean|null;
		/**Ověřovat podpisy ručně na tlačítko Ověřit vše (ne automaticky)*/
		OverPodpisyRucne?: boolean|null;
		/**Zobrazovat informační okno o dokumentech se stejnou značkou odesílatele*/
		DialogZnackaOdes?: boolean|null;
		/**Zobrazovat okno el. podání nad oknem aplikace*/
		ElPodNad?: boolean|null;
		/**Kopírovat přílohu se jménem PODANI.TXT do složky*/
		KopirovatSpecPrilohuDoSlozky?: boolean|null;
		/**Slozka Ukladani Special Prilohy*/
		SlozkaUkladaniSpecialPrilohy?: string|null;
		/**Zastavit zpracování el. podání před rozborem*/
		ZastavitElPodaniPriRozboru?: boolean|null;
		/**Plnit Věc dle typu dokumentu*/
		VecDleTypDok?: boolean|null;
		/**Plnit Věc dle typu dokumentu*/
		AsynchronOvereni?: boolean|null;
		/**Počty listů strn*/
		PocetListuStran?: Gordic.Wfl.Interface.GPocetListuStranDto|null;
		/**zrychleni seznamu nanacitani ikon*/
		NanacitatIkony?: boolean|null;
	}
	const enum GPodElPodaniSettingsDtoNames { VecPovinne = "VecPovinne", PscPovinne = "PscPovinne", OdesilatelPovinne = "OdesilatelPovinne", NevalidovatPDF = "NevalidovatPDF", PodaniMailJeObsahZpravy = "PodaniMailJeObsahZpravy", PodaniDZJeObsahZpravy = "PodaniDZJeObsahZpravy", NeplnitMailPotvrzeniStandardTextem = "NeplnitMailPotvrzeniStandardTextem", PoElPodaniZobrazitDetailDokumentu = "PoElPodaniZobrazitDetailDokumentu", PrenestDoVeciPredmetZpravy = "PrenestDoVeciPredmetZpravy", PrenestDoVeciPodrobnePredmetZpravy = "PrenestDoVeciPodrobnePredmetZpravy", PocetDniKeZpracovani = "PocetDniKeZpracovani", PocetHodinPredZpracovanim = "PocetHodinPredZpracovanim", IxsTypDok = "IxsTypDok", ZapnoutKontroluKonzsitence = "ZapnoutKontroluKonzsitence", ProhoditPlneniVecAPoznamka = "ProhoditPlneniVecAPoznamka", PreplneniVec = "PreplneniVec", EvidovatElPodani = "EvidovatElPodani", PouzivatHistoriiVPolicuVec = "PouzivatHistoriiVPolicuVec", OverPodpisyRucne = "OverPodpisyRucne", DialogZnackaOdes = "DialogZnackaOdes", ElPodNad = "ElPodNad", KopirovatSpecPrilohuDoSlozky = "KopirovatSpecPrilohuDoSlozky", SlozkaUkladaniSpecialPrilohy = "SlozkaUkladaniSpecialPrilohy", ZastavitElPodaniPriRozboru = "ZastavitElPodaniPriRozboru", VecDleTypDok = "VecDleTypDok", AsynchronOvereni = "AsynchronOvereni", PocetListuStran = "PocetListuStran", NanacitatIkony = "NanacitatIkony",}
	const enum GPodElPodaniSettingsDtoFragments { VecPovinne = "*", PscPovinne = "*", OdesilatelPovinne = "*", NevalidovatPDF = "*", PodaniMailJeObsahZpravy = "*", PodaniDZJeObsahZpravy = "*", NeplnitMailPotvrzeniStandardTextem = "*", PoElPodaniZobrazitDetailDokumentu = "*", PrenestDoVeciPredmetZpravy = "*", PrenestDoVeciPodrobnePredmetZpravy = "*", PocetDniKeZpracovani = "*", PocetHodinPredZpracovanim = "*", IxsTypDok = "*", ZapnoutKontroluKonzsitence = "*", ProhoditPlneniVecAPoznamka = "*", PreplneniVec = "*", EvidovatElPodani = "*", PouzivatHistoriiVPolicuVec = "*", OverPodpisyRucne = "*", DialogZnackaOdes = "*", ElPodNad = "*", KopirovatSpecPrilohuDoSlozky = "*", SlozkaUkladaniSpecialPrilohy = "*", ZastavitElPodaniPriRozboru = "*", VecDleTypDok = "*", AsynchronOvereni = "*", PocetListuStran = "*", NanacitatIkony = "*",}
	const enum GPodElPodaniSettingsDtoTypes { VecPovinne = "boolean", PscPovinne = "boolean", OdesilatelPovinne = "boolean", NevalidovatPDF = "boolean", PodaniMailJeObsahZpravy = "boolean", PodaniDZJeObsahZpravy = "boolean", NeplnitMailPotvrzeniStandardTextem = "boolean", PoElPodaniZobrazitDetailDokumentu = "boolean", PrenestDoVeciPredmetZpravy = "boolean", PrenestDoVeciPodrobnePredmetZpravy = "boolean", PocetDniKeZpracovani = "number", PocetHodinPredZpracovanim = "number", IxsTypDok = "string", ZapnoutKontroluKonzsitence = "boolean", ProhoditPlneniVecAPoznamka = "boolean", PreplneniVec = "string", EvidovatElPodani = "boolean", PouzivatHistoriiVPolicuVec = "boolean", OverPodpisyRucne = "boolean", DialogZnackaOdes = "boolean", ElPodNad = "boolean", KopirovatSpecPrilohuDoSlozky = "boolean", SlozkaUkladaniSpecialPrilohy = "string", ZastavitElPodaniPriRozboru = "boolean", VecDleTypDok = "boolean", AsynchronOvereni = "boolean", PocetListuStran = "Gordic.Wfl.Interface.GPocetListuStranDto", NanacitatIkony = "boolean",}
	const enum GPodElPodaniSettingsDtoTypeLengths {}
	/**Dto uživatelského nastavení POD v UserSettings*/
	interface GPodElPodaniPredplneniDto {
		/**věc*/
		Vec?: string|null;
		/**Počty listů strn*/
		PocetListuStran?: Gordic.Wfl.Interface.GPocetListuStranDto|null;
		/**Typ dokumentu*/
		IxsTypDok?: string|null;
		/**spisovy plan*/
		SpPlan?: string|null;
		/**spisovy znak*/
		SpZnak?: string|null;
		/**stupen utajeni*/
		StUtaj?: number|null;
		/**stupen utajeni*/
		PlnitVecDleTypPis?: boolean|null;
	}
	const enum GPodElPodaniPredplneniDtoNames { Vec = "Vec", PocetListuStran = "PocetListuStran", IxsTypDok = "IxsTypDok", SpPlan = "SpPlan", SpZnak = "SpZnak", StUtaj = "StUtaj", PlnitVecDleTypPis = "PlnitVecDleTypPis",}
	const enum GPodElPodaniPredplneniDtoFragments { Vec = "*", PocetListuStran = "*", IxsTypDok = "*", SpPlan = "*", SpZnak = "*", StUtaj = "*", PlnitVecDleTypPis = "*",}
	const enum GPodElPodaniPredplneniDtoTypes { Vec = "string", PocetListuStran = "Gordic.Wfl.Interface.GPocetListuStranDto", IxsTypDok = "string", SpPlan = "string", SpZnak = "string", StUtaj = "number", PlnitVecDleTypPis = "boolean",}
	const enum GPodElPodaniPredplneniDtoTypeLengths {}
}

//#endregion

