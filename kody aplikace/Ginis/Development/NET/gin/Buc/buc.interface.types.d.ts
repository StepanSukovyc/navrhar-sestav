/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       buc.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Buc.Interface\Gordic.Buc.Interface.csproj
*    created     2026-02-16 14:33:50
*    files       Banka\Gordic.Buc.Interface.IGBanka.d.ts
*                Banka\IGVyberBanky.d.ts
*                Banka\Dto\Gordic.Buc.Interface.GBankaDto.d.ts
*                Banka\Dto\GVyberBankyDto.d.ts
*                BankovniUcet\Gordic.Buc.Interface.IGBanUcet.d.ts
*                BankovniUcet\Dto\Gordic.Buc.Interface.GBanUcet.d.ts
*                BankovniVypis\IGBankovniVypis.d.ts
*                BankovniVypis\IGDefiniceVS.d.ts
*                BankovniVypis\IGNacteniElVypisu.d.ts
*                BankovniVypis\IGOcekavanoZBanky.d.ts
*                BankovniVypis\IGParovano.d.ts
*                BankovniVypis\Dto\GBankovniVypisDto.d.ts
*                BankovniVypis\Dto\GDefiniceVSDto.d.ts
*                BankovniVypis\Dto\GNacteniElVypisuDto.d.ts
*                BankovniVypis\Dto\GOcekavanoZBankyDto.d.ts
*                BankovniVypis\Dto\Gordic.Buc.GBanVypisDto.d.ts
*                BankovniVypis\Dto\GParovanoDetailDto.d.ts
*                BankovniVypis\Dto\GParovanoHistorieDto.d.ts
*                BankovniVypisPolozka\IGBankovniVypisPolozka.d.ts
*                BankovniVypisPolozka\IGBankovniVypisPolozkaVyhledavani.d.ts
*                BankovniVypisPolozka\Dto\GBankovniVypisPolozkaDto.d.ts
*                BankovniVypisPolozka\Dto\GBankovniVypisPolozkaVyhledavaniDto.d.ts
*                Controls\Dto\Gordic.Buc.Interface.GBucspbaDto.d.ts
*                Controls\Dto\GReaderBuccssbDto.d.ts
*                Controls\Dto\GReaderBucctykDto.d.ts
*                Controls\Dto\GReaderBucctyvDto.d.ts
*                Controls\Dto\GReaderBucdpepDto.d.ts
*                Controls\Dto\GReaderZpracFucDto.d.ts
*                DavkaPDB\Gordic.Buc.Interface.IGDavkaPDB.d.ts
*                DavkaPDB\Dto\Gordic.Buc.Interface.GDavkaPDBDto.d.ts
*                DavkaPDBPolozka\Gordic.Buc.Interface.IGDavkaPDBpolozka.d.ts
*                DavkaPDBPolozka\Dto\Gordic.Buc.Interface.GDavkaPDBPolozkaDto.d.ts
*                Init\Gordic.Buc.Interface.GBucGlobalsBase.d.ts
*                Init\Gordic.Buc.Interface.GBucSeznamTpepDto.d.ts
*                Init\Dto\GBucGlobalsDto.d.ts
*                Init\Dto\Gordic.Buc.Interface.GBucSeznamDto.d.ts
*                Nastroje\IGParametrySlozenek.d.ts
*                Nastroje\IGSablonaLikvidaceFuc.d.ts
*                Nastroje\IGSazbaPPB.d.ts
*                Nastroje\Dto\GParametrySlozenekDto.d.ts
*                Nastroje\Dto\GSablonaLikvidaceFucDto.d.ts
*                Nastroje\Dto\GSazbaPPBDto.d.ts
*                Ostatni\Gordic.Buc.Interface.GBucWflDto.d.ts
*                Ostatni\Gordic.Buc.Interface.IGBuctpep.d.ts
*                Ostatni\Gordic.Buc.Interface.IGPomocne.d.ts
*                Ostatni\IGHledani.d.ts
*                ParovaciZapisy\IGParovaciZapisy.d.ts
*                ParovaciZapisy\Dto\GParovaciZapisyDto.d.ts
*                Parovani\IGAutomatickeParovani.d.ts
*                Parovani\IGManualniParovani.d.ts
*                Parovani\IGNedokonceneParovani.d.ts
*                Parovani\IGParovaniNastroje.d.ts
*                Parovani\IGRozpisPredpisu.d.ts
*                Parovani\Dto\GAutomatickeParovaniDto.d.ts
*                Parovani\Dto\GManualniParovaniDto.d.ts
*                Parovani\Dto\GNedokonceneParovaniDto.d.ts
*                Parovani\Dto\GParovaniNastrojeDto.d.ts
*                Parovani\Dto\GRozpisPredpisuDto.d.ts
*                PlatebniKarty\GDavkaAvizoDto.d.ts
*                PlatebniKarty\GDavkaAvizoPolozkaDto.d.ts
*                PlatebniKarty\IGDavkaAvizo.d.ts
*                PlatebniKarty\IGDavkaAvizoPolozka.d.ts
*                PodDavPDB\Gordic.Buc.Interface.IGPodDavPDB.d.ts
*                PodDavPDB\Dto\Gordic.Buc.Interface.GPodDavPDBDto.d.ts
*                Prikaz\Gordic.Buc.Interface.IGPrikaz.d.ts
*                Prikaz\Dto\Gordic.Buc.Interface.GPrikazDto.d.ts
*                Prikaz\Dto\Gordic.Buc.Interface.GRezIISSPDto.d.ts
*                Prikaz\Dto\Gordic.Buc.Interface.GUdajeZPDto.d.ts
*                Rozpis\GNapojeniPoplatniciDDPDto.d.ts
*                Rozpis\GRozpisPolozkyDto.d.ts
*                Rozpis\GVyberUhradyDto.d.ts
*                Rozpis\IGNapojeniPoplatniciDDP.d.ts
*                Rozpis\IGRozpisPolozky.d.ts
*                Rozpis\IGVyberUhrady.d.ts
*                Slozenky\DavkaAV\GDavkaAVDto.d.ts
*                Slozenky\DavkaAV\GDavkaAVObsahDto.d.ts
*                Slozenky\DavkaAV\IGDavkaAV.d.ts
*                Slozenky\DavkaAV\IGDavkaAVObsah.d.ts
*                Slozenky\DavkaB\IGDavkaB.d.ts
*                Slozenky\DavkaB\IGDavkaBGenerovani.d.ts
*                Slozenky\DavkaB\Dto\GDavkaBDto.d.ts
*                Slozenky\DavkaB\Dto\GDavkaBGenerovaniDto.d.ts
*                Slozenky\DavkaSIPO\GDavkaSIPODto.d.ts
*                Slozenky\DavkaSIPO\GDavkaSIPOObsahDto.d.ts
*                Slozenky\DavkaSIPO\IGDavkaSIPO.d.ts
*                Slozenky\DavkaSIPO\IGDavkaSIPOObsah.d.ts
*                UcetVlastni\Dto\Gordic.Buc.Interface.GUcetVlDto.d.ts
*                ZustatekVl\Gordic.Buc.Interface.IGZustatekVl.d.ts
*                ZustatekVl\Dto\Gordic.Buc.Interface.GZustatekVlDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Banka\Gordic.Buc.Interface.IGBanka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Banka - základní parametry
	* @domain Banka
	*/
	interface Banka {
		/**Načte základní parametry banky*/
		read(rq?:Gordic.Buc.Interface.GBankaDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GBankaDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GBankaDto>,GServiceReadResponse<Gordic.Buc.Interface.GBankaDto>>;
		/**Seznam bank organizace používaných v BUC*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GBankaDto>>;
		/**Vrátí oprávnění k bankám (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GBankaServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Banka: ServiceBase & Catalog.Banka;
	}
	const Banka: Client["Banka"];
}
declare namespace Gordic.Buc.Interface {
	/**Oprávnění pro jednu banku*/
	interface GBankaPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze pozastavit*/
		LzePozastavit: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat*/
		LzeGenerovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze podepsat*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat*/
		LzeOdeslat: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat pomocí WS*/
		LzeOdeslatWs: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankaPermissionNames { LzeZobrazit = "LzeZobrazit", LzePozastavit = "LzePozastavit", LzeGenerovat = "LzeGenerovat", LzePodepsat = "LzePodepsat", LzeOdeslat = "LzeOdeslat", LzeTisknout = "LzeTisknout", LzeOdeslatWs = "LzeOdeslatWs",}
	const enum GBankaPermissionFragments { LzeZobrazit = "*", LzePozastavit = "*", LzeGenerovat = "*", LzePodepsat = "*", LzeOdeslat = "*", LzeTisknout = "*", LzeOdeslatWs = "*",}
	const enum GBankaPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePozastavit = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovat = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatWs = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankaPermissionTypeLengths {}
	/**Oprávnění pro práci nad bankami*/
	interface GBankaServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze pozastavit*/
		LzePozastavit: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat*/
		LzeGenerovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze podepsat*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat*/
		LzeOdeslat: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankaServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzePozastavit = "LzePozastavit", LzeGenerovat = "LzeGenerovat", LzePodepsat = "LzePodepsat", LzeOdeslat = "LzeOdeslat", LzeTisknout = "LzeTisknout",}
	const enum GBankaServicePermissionFragments { LzeZobrazit = "*", LzePozastavit = "*", LzeGenerovat = "*", LzePodepsat = "*", LzeOdeslat = "*", LzeTisknout = "*",}
	const enum GBankaServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePozastavit = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovat = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankaServicePermissionTypeLengths {}
	/**Výčet filtračních kritérií pro výběr bank*/
	const enum GBankaFilter {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico,
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs,
		/**Banka*/
		ixs_esu,
		/**Směrový kód*/
		sk_vl,
		/**Skupina*/
		sbu,
		/**Název banky*/
		naz_ban,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Banka\IGVyberBanky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Dávky plateb SIPO - sumační věty
	* @domain Banka
	*/
	interface BucVyberBanky {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GVyberBankyReadReqDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GVyberBankyReadReqDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GVyberBankyReadReqDto>,GServiceReadResponse<Gordic.Buc.Interface.GVyberBankyReadDto>>;
		/**Read a validace včetně přepínačů*/
		readAndValidate(rq?:Gordic.Buc.Interface.GVyberBankyReadValidateReqDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GVyberBankyReadValidateReqDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GVyberBankyReadValidateReqDto>,GServiceReadResponse<Gordic.Buc.Interface.GVyberBankyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucVyberBanky: ServiceBase & Catalog.BucVyberBanky;
	}
	const BucVyberBanky: Client["BucVyberBanky"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu výběru banky*/
	const enum GVyberBankyFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Banka\Dto\Gordic.Buc.Interface.GBankaDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucspba*/
	interface GBankaDto {
		/**xxxxxxx*/
		ixp?: string|null;
		/**DBCOLUMN:bucspba.ico*/
		ico?: string|null;
		/**DBCOLUMN:bucspba.ucs*/
		ucs?: string|null;
		/**ID externího subjektu typu banka*/
		ixs_esu?: string|null;
		/**DBCOLUMN:bucspba.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:bucspba.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:bucspba.zkr_naz*/
		zkr_naz?: string|null;
		/**DBCOLUMN:bucspba.zak_bu*/
		zak_bu?: string|null;
		/**DBCOLUMN:bucspba.cis_pre*/
		cis_pre?: string|null;
		/**Začátek intervalu účetních souborů - smlouva s bankou*/
		sou_zac?: string|null;
		/**Konec intervalu účetních souborů - smlouva s bankou*/
		sou_kon?: string|null;
		/**Používá modul BUC*/
		sou_zacp?: string|null;
		/**DBCOLUMN:bucspba.sou_konp*/
		sou_konp?: string|null;
		/**Označení pobočky banky*/
		pob_ban?: string|null;
		/**6 místný číselný kód*/
		ver_kod?: string|null;
		/**DBCOLUMN:bucspba.naz_ban*/
		naz_ban?: string|null;
		/**Umístění pobočky banky*/
		mis_pob?: string|null;
		/**Umístění organizace v 6.pádě*/
		mis_org?: string|null;
		/**DBCOLUMN:bucspba.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:bucspba.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:bucspba.vys_sou*/
		vys_sou?: string|null;
		/**DBCOLUMN:bucspba.rez_dav*/
		rez_dav?: number|null;
		/**DBCOLUMN:bucspba.vst_sou*/
		vst_sou?: string|null;
		/**Cesta pro umístění výstupního souboru - do banky*/
		vys_pth?: string|null;
		/**Cesta pro umístění vstupního souboru - z banky*/
		vst_pth?: string|null;
		/**DBCOLUMN:bucspba.cis_pob*/
		cis_pob?: string|null;
		/**Cesta pro umístění souborů z banky ( záloha )*/
		gpc_pth?: string|null;
		/**Skupina bankovních účtů*/
		sbu?: number|null;
		/**Název skupiny bankovních účtů*/
		nazev_sbu?: string|null;
		/**Číslo dávky, od kterého se bude dělat první dávka daný den*/
		cis_dav?: number|null;
		/**DBCOLUMN:bucspba.odesilatel_id*/
		odesilatel_id?: string|null;
		/**Pořadové číslo příkazu v rámci dne*/
		sekvence?: number|null;
		/**Kód výstavce*/
		kod_vys?: string|null;
		/**URL adreasa WS, API*/
		url_dab?: string|null;
		/**Rodné číslo uvedené na smlouvě pro služby Databanking ČS*/
		rc_dab?: string|null;
		/**IČO uvedené na smlouvě pro služby Databanking ČS*/
		ico_dab?: string|null;
		/**UUS - účtárna účetního střediska*/
		uus?: string|null;
		/**Povinnost ověřování el.podpisu dávek importovaných do BUC*/
		ove_epo?: number|null;
		/**Ukládání dávek příkazů do elektronického uložiště*/
		ulo_ele?: number|null;
		/**Podepisování dávek - počet podpisů*/
		pod_dav?: number|null;
		/**DBCOLUMN:bucspba.ode_pod*/
		ode_pod?: number|null;
		/**Pořadí certifikátů při odeslání dávky do ČNB*/
		por_cer?: number|null;
		/**Klientský certifikát pro organizaci*/
		ixs_cer_kli?: string|null;
		/**Záznam komunikace mezi BUC a bankou*/
		kom_pth?: string|null;
		/**Označení organizace v systému banky*/
		client_id?: string|null;
		/**Identifikace*/
		user_id?: string|null;
		/**Datum posledního stažení výpisů*/
		dat_vyp?: JsonDate|null;
		/**OAuth profil
		*      Identifikace OAuth profilu pro platební bránu
		*/
		ixs_oap?: string|null;
		/**Registr dávek příkazů - BUCRUSO*/
		registrDavekPrikazu?: Gordic.Buc.Interface.GBucrusoDto|null;
		/**Dopřesňující parametry pro bankovní rozhraní*/
		parametryDopresnujici?: Gordic.Buc.Interface.GBankaParamDto|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GBankaPermission|null;
		/**ikc*/
		ikc?: Gordic.General.GIkc|null;
	}
	const enum GBankaDtoNames { ixp = "ixp", ico = "ico", ucs = "ucs", ixs_esu = "ixs_esu", sk_vl = "sk_vl", aktivita = "aktivita", zkr_naz = "zkr_naz", zak_bu = "zak_bu", cis_pre = "cis_pre", sou_zac = "sou_zac", sou_kon = "sou_kon", sou_zacp = "sou_zacp", sou_konp = "sou_konp", pob_ban = "pob_ban", ver_kod = "ver_kod", naz_ban = "naz_ban", mis_pob = "mis_pob", mis_org = "mis_org", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", vys_sou = "vys_sou", rez_dav = "rez_dav", vst_sou = "vst_sou", vys_pth = "vys_pth", vst_pth = "vst_pth", cis_pob = "cis_pob", gpc_pth = "gpc_pth", sbu = "sbu", nazev_sbu = "nazev_sbu", cis_dav = "cis_dav", odesilatel_id = "odesilatel_id", sekvence = "sekvence", kod_vys = "kod_vys", url_dab = "url_dab", rc_dab = "rc_dab", ico_dab = "ico_dab", uus = "uus", ove_epo = "ove_epo", ulo_ele = "ulo_ele", pod_dav = "pod_dav", ode_pod = "ode_pod", por_cer = "por_cer", ixs_cer_kli = "ixs_cer_kli", kom_pth = "kom_pth", client_id = "client_id", user_id = "user_id", dat_vyp = "dat_vyp", ixs_oap = "ixs_oap", registrDavekPrikazu = "registrDavekPrikazu", parametryDopresnujici = "parametryDopresnujici", Permissions = "Permissions", ikc = "ikc",}
	const enum GBankaDtoFragments { ixp = "*", ico = "*", ucs = "*", ixs_esu = "*", sk_vl = "*", aktivita = "*", zkr_naz = "*", zak_bu = "*", cis_pre = "*", sou_zac = "*", sou_kon = "*", sou_zacp = "*", sou_konp = "*", pob_ban = "*", ver_kod = "*", naz_ban = "*", mis_pob = "*", mis_org = "*", dat_zmena = "*", zmenu_prov = "*", vys_sou = "*", rez_dav = "*", vst_sou = "*", vys_pth = "*", vst_pth = "*", cis_pob = "*", gpc_pth = "*", sbu = "*", nazev_sbu = "*", cis_dav = "*", odesilatel_id = "*", sekvence = "*", kod_vys = "*", url_dab = "*", rc_dab = "*", ico_dab = "*", uus = "*", ove_epo = "*", ulo_ele = "*", pod_dav = "*", ode_pod = "*", por_cer = "*", ixs_cer_kli = "*", kom_pth = "*", client_id = "*", user_id = "*", dat_vyp = "*", ixs_oap = "*", registrDavekPrikazu = "*", parametryDopresnujici = "*", Permissions = "*", ikc = "*",}
	const enum GBankaDtoTypes { ixp = "string", ico = "string", ucs = "string", ixs_esu = "string", sk_vl = "string", aktivita = "number", zkr_naz = "string", zak_bu = "string", cis_pre = "string", sou_zac = "string", sou_kon = "string", sou_zacp = "string", sou_konp = "string", pob_ban = "string", ver_kod = "string", naz_ban = "string", mis_pob = "string", mis_org = "string", dat_zmena = "JsonDate", zmenu_prov = "string", vys_sou = "string", rez_dav = "number", vst_sou = "string", vys_pth = "string", vst_pth = "string", cis_pob = "string", gpc_pth = "string", sbu = "number", nazev_sbu = "string", cis_dav = "number", odesilatel_id = "string", sekvence = "number", kod_vys = "string", url_dab = "string", rc_dab = "string", ico_dab = "string", uus = "string", ove_epo = "number", ulo_ele = "number", pod_dav = "number", ode_pod = "number", por_cer = "number", ixs_cer_kli = "string", kom_pth = "string", client_id = "string", user_id = "string", dat_vyp = "JsonDate", ixs_oap = "string", registrDavekPrikazu = "Gordic.Buc.Interface.GBucrusoDto", parametryDopresnujici = "Gordic.Buc.Interface.GBankaParamDto", Permissions = "Gordic.Buc.Interface.GBankaPermission", ikc = "Gordic.General.GIkc",}
	const enum GBankaDtoTypeLengths { ixp = 12, ico = 10, ucs = 10, ixs_esu = 12, sk_vl = 11, zkr_naz = 20, zak_bu = 10, cis_pre = 10, sou_zac = 3, sou_kon = 3, sou_zacp = 3, sou_konp = 3, pob_ban = 3, ver_kod = 6, naz_ban = 50, mis_pob = 50, mis_org = 50, zmenu_prov = 12, vys_sou = 30, vst_sou = 30, vys_pth = 100, vst_pth = 100, cis_pob = 10, gpc_pth = 100, nazev_sbu = 50, odesilatel_id = 10, kod_vys = 4, url_dab = 254, rc_dab = 10, ico_dab = 10, uus = 10, ixs_cer_kli = 12, kom_pth = 254, client_id = 50, user_id = 50, ixs_oap = 12,}
	/**DBTABLE:bucruso
	*      Registr odesílání dávek příkazů do banky
	*/
	interface GBucrusoDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**Směrový kód
		*      Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet
		*/
		sk_vl?: string|null;
		/**Datum dávky
		*      Datum posledního generování dávky
		*/
		dat_dav?: JsonDate|null;
		/**Číslo účetního souboru
		*      Poslední použité číslo účetního souboru
		*/
		cis_uso?: number|null;
		/**Číslo dávky
		*      Poslední číslo dávky
		*/
		cis_dav?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Sekvenční číslo položky
		*      Poslední sekvenční číslo položky v rámci dne
		*/
		sek_cis_pol?: number|null;
		/**Skupina bankovních účtů
		*      Skupina bankovních účtů - smlouva s bankou
		*/
		sbu?: number|null;
		/**Sekvence
		*      Číslování dávek ( souborů příkazů ) v rámci dne
		*/
		sekvence?: number|null;
		/**název souboru dávky*/
		soubor?: string|null;
		/**číslo dávky - generované v procesu proplacení*/
		cislo_davky?: number|null;
		/**Identifikátor dokumentu dávky*/
		ixp_dav?: string|null;
		/**Identifikátor dávky v ELE*/
		ixb_ele_dav?: string|null;
		/**Identifikátor podpisu č.1 v ELE*/
		ixb_ele_pod1?: string|null;
		/**Identifikátor podpisu č.2 v ELE*/
		ixb_ele_pod2?: string|null;
		/**Název souboru podpisu č.1*/
		soubor_ep1?: string|null;
		/**Název souboru podpisu č.2*/
		soubor_ep2?: string|null;
	}
	const enum GBucrusoDtoNames { ico = "ico", ucs = "ucs", sk_vl = "sk_vl", dat_dav = "dat_dav", cis_uso = "cis_uso", cis_dav = "cis_dav", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", sek_cis_pol = "sek_cis_pol", sbu = "sbu", sekvence = "sekvence", soubor = "soubor", cislo_davky = "cislo_davky", ixp_dav = "ixp_dav", ixb_ele_dav = "ixb_ele_dav", ixb_ele_pod1 = "ixb_ele_pod1", ixb_ele_pod2 = "ixb_ele_pod2", soubor_ep1 = "soubor_ep1", soubor_ep2 = "soubor_ep2",}
	const enum GBucrusoDtoFragments { ico = "*", ucs = "*", sk_vl = "*", dat_dav = "*", cis_uso = "*", cis_dav = "*", dat_zmena = "*", zmenu_prov = "*", sek_cis_pol = "*", sbu = "*", sekvence = "*", soubor = "*", cislo_davky = "*", ixp_dav = "*", ixb_ele_dav = "*", ixb_ele_pod1 = "*", ixb_ele_pod2 = "*", soubor_ep1 = "*", soubor_ep2 = "*",}
	const enum GBucrusoDtoTypes { ico = "string", ucs = "string", sk_vl = "string", dat_dav = "JsonDate", cis_uso = "number", cis_dav = "number", dat_zmena = "JsonDate", zmenu_prov = "string", sek_cis_pol = "number", sbu = "number", sekvence = "number", soubor = "string", cislo_davky = "number", ixp_dav = "string", ixb_ele_dav = "string", ixb_ele_pod1 = "string", ixb_ele_pod2 = "string", soubor_ep1 = "string", soubor_ep2 = "string",}
	const enum GBucrusoDtoTypeLengths { ico = 10, ucs = 10, sk_vl = 11, zmenu_prov = 12, soubor = 254,}
	/**Parametr pro danou banku určující rozhraní a s ním související nastavení*/
	interface GBankaParamDto {
		/**Typ komunikace*/
		typ_kom?: Gordic.Buc.Interface.GBankaTypKom|null;
		/**Formát dávky pro domácí platby*/
		for_dav_dom?: Gordic.Buc.Interface.GBankaForDav|null;
		/**Formát dávky pro zahraniční platby*/
		for_dav_zah?: Gordic.Buc.Interface.GBankaForDav|null;
		/**Formát dávky pro SEPA platby - Europlatby*/
		for_dav_sepa?: Gordic.Buc.Interface.GBankaForDav|null;
		/**Numerické označení banky*/
		kod_ban_num?: number|null;
		/**Přípona souboru pro domácí platby*/
		pri_ext_dom?: string|null;
		/**Přípona souboru pro zahraniční plaby*/
		pri_ext_zah?: string|null;
		/**Přípona souboru pro SEPA plaby*/
		pri_ext_sepa?: string|null;
		/**Formát dávky ban.výpisů*/
		for_vyp?: Gordic.Buc.Interface.GBankaForDav|null;
		/**Přípona souboru pro výpisy*/
		vyp_ext?: string|null;
		/**Umístění externí aplikace pro komunikaci s bankou*/
		ext_apl_pth?: string|null;
		/**Volby typů dávek ve WK- mohl by být typu Radio Button, pokud bude prázdný, tak nebude výběr*/
		vyb_typ_dav?: number[]|null;
		/**Vybraný typ dávky*/
		typ_dav?: Gordic.Buc.Interface.GBankaTypDav|null;
		/**Typ konverze češtiny*/
		kon_ces?: Gordic.Buc.Interface.GBankaKonCes|null;
		/**Maximální počet odmítnutých příkazů k vrácení celé dávky. 0 - nestanoveno*/
		max_odm_pri?: number|null;
		/**Typ externího identifikátoru*/
		typ_ext_id?: Gordic.Buc.Interface.GBankaTypExtId|null;
		/**Volba generování dodatkových příkazů ve WK*/
		vyb_gen_dod_pri?: boolean|null;
		/**Generování dodatkových příkazů*/
		gen_dod_pri?: Gordic.Buc.Interface.GBankaDodPri|null;
		/**Použití AIB při komunikaci prostřednictvím WS. 0-Ne, 1-Ano*/
		pou_aib?: number|null;
		/**Metoda zjištění aktuálního zůstatku*/
		zji_zus?: Gordic.Buc.Interface.GBankaZjiAktZust|null;
		/**Důvod podpisu*/
		duvodPodpisu?: Gordic.Buc.Interface.GDuvPodDto|null;
		/**Lze stáhnout protokol k odeslané dávce příkazů pomocí WS*/
		stah_prot?: boolean|null;
		/**Lze se dotázat na stav příkazů v dávce pomocí WS*/
		stav_prik?: boolean|null;
	}
	const enum GBankaParamDtoNames { typ_kom = "typ_kom", for_dav_dom = "for_dav_dom", for_dav_zah = "for_dav_zah", for_dav_sepa = "for_dav_sepa", kod_ban_num = "kod_ban_num", pri_ext_dom = "pri_ext_dom", pri_ext_zah = "pri_ext_zah", pri_ext_sepa = "pri_ext_sepa", for_vyp = "for_vyp", vyp_ext = "vyp_ext", ext_apl_pth = "ext_apl_pth", vyb_typ_dav = "vyb_typ_dav", typ_dav = "typ_dav", kon_ces = "kon_ces", max_odm_pri = "max_odm_pri", typ_ext_id = "typ_ext_id", vyb_gen_dod_pri = "vyb_gen_dod_pri", gen_dod_pri = "gen_dod_pri", pou_aib = "pou_aib", zji_zus = "zji_zus", duvodPodpisu = "duvodPodpisu", stah_prot = "stah_prot", stav_prik = "stav_prik",}
	const enum GBankaParamDtoFragments { typ_kom = "*", for_dav_dom = "*", for_dav_zah = "*", for_dav_sepa = "*", kod_ban_num = "*", pri_ext_dom = "*", pri_ext_zah = "*", pri_ext_sepa = "*", for_vyp = "*", vyp_ext = "*", ext_apl_pth = "*", vyb_typ_dav = "*", typ_dav = "*", kon_ces = "*", max_odm_pri = "*", typ_ext_id = "*", vyb_gen_dod_pri = "*", gen_dod_pri = "*", pou_aib = "*", zji_zus = "*", duvodPodpisu = "*", stah_prot = "*", stav_prik = "*",}
	const enum GBankaParamDtoTypes { typ_kom = "Gordic.Buc.Interface.GBankaTypKom", for_dav_dom = "Gordic.Buc.Interface.GBankaForDav", for_dav_zah = "Gordic.Buc.Interface.GBankaForDav", for_dav_sepa = "Gordic.Buc.Interface.GBankaForDav", kod_ban_num = "number", pri_ext_dom = "string", pri_ext_zah = "string", pri_ext_sepa = "string", for_vyp = "Gordic.Buc.Interface.GBankaForDav", vyp_ext = "string", ext_apl_pth = "string", vyb_typ_dav = "number[]", typ_dav = "Gordic.Buc.Interface.GBankaTypDav", kon_ces = "Gordic.Buc.Interface.GBankaKonCes", max_odm_pri = "number", typ_ext_id = "Gordic.Buc.Interface.GBankaTypExtId", vyb_gen_dod_pri = "boolean", gen_dod_pri = "Gordic.Buc.Interface.GBankaDodPri", pou_aib = "number", zji_zus = "Gordic.Buc.Interface.GBankaZjiAktZust", duvodPodpisu = "Gordic.Buc.Interface.GDuvPodDto", stah_prot = "boolean", stav_prik = "boolean",}
	const enum GBankaParamDtoTypeLengths {}
	/**Důvod podpisu*/
	interface GDuvPodDto {
		/**Identikátor důvodu podpisu*/
		ixs_dpo?: string|null;
		/**Důvod podpisu*/
		duvod_txt?: string|null;
		/**Příznak podepisování*/
		priz_podpis?: number|null;
		/**Příznak časového razítka*/
		priz_ts?: number|null;
		/**Příznak sys.značky*/
		priz_znacka?: number|null;
	}
	const enum GDuvPodDtoNames { ixs_dpo = "ixs_dpo", duvod_txt = "duvod_txt", priz_podpis = "priz_podpis", priz_ts = "priz_ts", priz_znacka = "priz_znacka",}
	const enum GDuvPodDtoFragments { ixs_dpo = "*", duvod_txt = "*", priz_podpis = "*", priz_ts = "*", priz_znacka = "*",}
	const enum GDuvPodDtoTypes { ixs_dpo = "string", duvod_txt = "string", priz_podpis = "number", priz_ts = "number", priz_znacka = "number",}
	const enum GDuvPodDtoTypeLengths {}
	/**Typ komunikce s bankou*/
	const enum GBankaTypKom {
		/**Předávání tištěných příkazů a ruční pořizování výpisů*/
		Papir=0,
		/**Elektronický soubor*/
		Soubor=10,
		/**Web služba*/
		WS=20,
		/**API*/
		API=30,
		/**Přímý kanál KB - spouštění externí aplikace  s parametry*/
		PKKB=40,
	}
	/**Formát dávky*/
	const enum GBankaForDav {
		/**Není určen - nezpracovává se*/
		Neurceno=0,
		/**Formát ABO - nazývaný KM ( Kompatibilní Média ), historicky nejstarší formát*/
		ABO=10,
		/**Gemini*/
		Gemini=20,
		/**Best KB - formát Komerční banky, někdy po  užívaný dalšími bankami*/
		KBBest=30,
		/**Upravený Best KB - formát Komerční banky, někdy používaný dalšími bankami*/
		EDIBest=40,
		/**Poslední formát ČNB*/
		FS5=50,
		/**MultiCash*/
		MC=60,
		/**MultiCash verze menší než 3.2*/
		MC30=62,
		/**MultiCash verze 3.2*/
		MC32=64,
		/**MultiCash od verze 3.23-002*/
		MC323=66,
		/**MultiCash - HomeCash*/
		MCHomeCash=70,
		/**MultiCash - mezinárodní formát výpisů*/
		MT940=80,
		/**Databanking ČS - komunikace pomocí WS*/
		Databanking=90,
		/**XML formát*/
		XML=100,
		/**Euro platba*/
		SEPA=110,
		/**JSON*/
		JSON=120,
	}
	/**Typy rozhraní plateb*/
	const enum GBankaTypRoz {
		/**Domácí platby*/
		Domaci=10,
		/**Zahraniční platby*/
		Zahranicni=20,
		/**Euro platby - platby v EUR v prostoru států EHP*/
		SEPA=30,
	}
	/**Definice přípon pro dávky příkazů jednotlivých formátů*/
	interface GBankaPriExt {
		/**Není určeno - nepoužívá se*/
		Neurceno?: string|null;
		/**ABO*/
		PriExtAbo?: string|null;
		/**Gemini, txt a kpc se již nebudou podporovat*/
		PriExtGemini?: string|null;
		/**KB Best*/
		PriExtBest?: string|null;
		/**ČNB - FS5*/
		PriExtFS5?: string|null;
		/**MultiCash - domácí*/
		PriExtMcD?: string|null;
		/**MultiCash - zahraniční*/
		PriExtMcZ?: string|null;
		/**XML*/
		PriExtXml?: string|null;
		/**SEPA - Europlatba*/
		PriExtSepa?: string|null;
		/**CSV  - zahraniční ČS*/
		PriExtCsv?: string|null;
	}
	const enum GBankaPriExtNames { Neurceno = "Neurceno", PriExtAbo = "PriExtAbo", PriExtGemini = "PriExtGemini", PriExtBest = "PriExtBest", PriExtFS5 = "PriExtFS5", PriExtMcD = "PriExtMcD", PriExtMcZ = "PriExtMcZ", PriExtXml = "PriExtXml", PriExtSepa = "PriExtSepa", PriExtCsv = "PriExtCsv",}
	const enum GBankaPriExtFragments { Neurceno = "*", PriExtAbo = "*", PriExtGemini = "*", PriExtBest = "*", PriExtFS5 = "*", PriExtMcD = "*", PriExtMcZ = "*", PriExtXml = "*", PriExtSepa = "*", PriExtCsv = "*",}
	const enum GBankaPriExtTypes { Neurceno = "string", PriExtAbo = "string", PriExtGemini = "string", PriExtBest = "string", PriExtFS5 = "string", PriExtMcD = "string", PriExtMcZ = "string", PriExtXml = "string", PriExtSepa = "string", PriExtCsv = "string",}
	const enum GBankaPriExtTypeLengths {}
	/**Definice přípon pro dávky výpisů jednotlivých formátů*/
	interface GBankaVypExt {
		/**ABO*/
		VypExtAbo?: string|null;
		/**Gemini přípony txt a gpc se již nebudou podporovat*/
		VypExtGemini?: string|null;
		/**KB Best*/
		VypExtBest?: string|null;
		/**ČNB - FS5*/
		VypExtFS5?: string|null;
		/**MultiCash - konverzní soubor*/
		VypExtMc?: string|null;
		/**MultiCash*/
		VypExtMT940?: string|null;
		/**XML*/
		VypExtXml?: string|null;
		/**JSON*/
		VypExtJSON?: string|null;
	}
	const enum GBankaVypExtNames { VypExtAbo = "VypExtAbo", VypExtGemini = "VypExtGemini", VypExtBest = "VypExtBest", VypExtFS5 = "VypExtFS5", VypExtMc = "VypExtMc", VypExtMT940 = "VypExtMT940", VypExtXml = "VypExtXml", VypExtJSON = "VypExtJSON",}
	const enum GBankaVypExtFragments { VypExtAbo = "*", VypExtGemini = "*", VypExtBest = "*", VypExtFS5 = "*", VypExtMc = "*", VypExtMT940 = "*", VypExtXml = "*", VypExtJSON = "*",}
	const enum GBankaVypExtTypes { VypExtAbo = "string", VypExtGemini = "string", VypExtBest = "string", VypExtFS5 = "string", VypExtMc = "string", VypExtMT940 = "string", VypExtXml = "string", VypExtJSON = "string",}
	const enum GBankaVypExtTypeLengths {}
	/**Typy generovaných dávek - volba*/
	const enum GBankaTypDav {
		/**Dávka domácích plateb*/
		Domaci=10,
		/**Dávka domácích a zahraničních plateb*/
		DomaciZahranicni=20,
		/**Dávka zahraničních plateb*/
		Zahranicni=30,
		/**Dávka SEPA plateb*/
		SEPA=40,
	}
	/**Kódy konverzí češtiny použité v bankovní komunikaci*/
	const enum GBankaKonCes {
		/**Konverze nebude použita*/
		Nepouzita=10,
		/**Konverze z/do kódové stránky 852 - DOS*/
		DOS=20,
		/**konverze z/do kódové stránky UTF8 - Unicode*/
		UTF8=30,
		/**Konverze z/do kódové stránky 1250 - Windows*/
		WIN=40,
	}
	/**Typ externího identifikátoru platby*/
	const enum GBankaTypExtId {
		/**Generován bankou - nekontroluje se duplicita*/
		Banka=10,
		/**Generován GINIS - kontrola na duplicitu*/
		Ginis=20,
	}
	/**Generování dodatkových příkazů*/
	const enum GBankaDodPri {
		/**Zakázáno*/
		Zakazano=0,
		/**Povoleno do 10.1.*/
		PovolenoDo10=10,
		/**Povoleno bez omezení*/
		PovolenoVzdy=20,
	}
	/**Příznak zjištění akt.zůstatku na BÚ*/
	const enum GBankaZjiAktZust {
		/**Zjištění z posledního načteného výpisu*/
		PoslVyp=0,
		/**Zjištění WS, API*/
		OnLine=10,
	}
	/**Kódy zpracovávaných bank*/
	interface GBankaKod {
		/**Komerční banka, a.s*/
		Kod0100?: string|null;
		/**Československá obchodní banka, a. s.*/
		Kod0300?: string|null;
		/**MONETA Money Bank, a.s.*/
		Kod0600?: string|null;
		/**ČESKÁ NÁRODNÍ BANKA*/
		Kod0710?: string|null;
		/**Česká spořitelna, a.s.*/
		Kod0800?: string|null;
		/**PPF banka a.s.*/
		Kod6000?: string|null;
		/**Raiffeisenbank*/
		Kod5500?: string|null;
		/**UniCredit Bank*/
		Kod2700?: string|null;
		/**Fio banka, a.s.*/
		Kod2010?: string|null;
		/**Banka CREDITAS a.s*/
		Kod2250?: string|null;
		/**J+T BANKA, a.s*/
		Kod5800?: string|null;
		/**TRINITY BANK a.s*/
		Kod2070?: string|null;
		/**Oberbank AG pobočka Česká republika*/
		Kod8040?: string|null;
		/**Národní rozvojová banka, a.s.*/
		Kod4300?: string|null;
		/**Všeobecná úverová banka a.s., pobočka Praha*/
		Kod6700?: string|null;
	}
	const enum GBankaKodNames { Kod0100 = "Kod0100", Kod0300 = "Kod0300", Kod0600 = "Kod0600", Kod0710 = "Kod0710", Kod0800 = "Kod0800", Kod6000 = "Kod6000", Kod5500 = "Kod5500", Kod2700 = "Kod2700", Kod2010 = "Kod2010", Kod2250 = "Kod2250", Kod5800 = "Kod5800", Kod2070 = "Kod2070", Kod8040 = "Kod8040", Kod4300 = "Kod4300", Kod6700 = "Kod6700",}
	const enum GBankaKodFragments { Kod0100 = "*", Kod0300 = "*", Kod0600 = "*", Kod0710 = "*", Kod0800 = "*", Kod6000 = "*", Kod5500 = "*", Kod2700 = "*", Kod2010 = "*", Kod2250 = "*", Kod5800 = "*", Kod2070 = "*", Kod8040 = "*", Kod4300 = "*", Kod6700 = "*",}
	const enum GBankaKodTypes { Kod0100 = "string", Kod0300 = "string", Kod0600 = "string", Kod0710 = "string", Kod0800 = "string", Kod6000 = "string", Kod5500 = "string", Kod2700 = "string", Kod2010 = "string", Kod2250 = "string", Kod5800 = "string", Kod2070 = "string", Kod8040 = "string", Kod4300 = "string", Kod6700 = "string",}
	const enum GBankaKodTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Banka\Dto\GVyberBankyDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto pro výběr banky pro načtení dávky*/
	interface GVyberBankyReadDto {
		/**Dto banky*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
		/**Volba typu dávky ve WK - radiobuttons*/
		vyb_typ_dav?: number[]|null;
		/**Volba typu výpisů ve WK - radiobuttons*/
		vyb_typ_vyp?: number[]|null;
		/**Příznak, zda je možno zadat dodatečné příkazy pro ČNB*/
		vyb_gen_dod_pri?: boolean|null;
	}
	const enum GVyberBankyReadDtoNames { banka = "banka", vyb_typ_dav = "vyb_typ_dav", vyb_typ_vyp = "vyb_typ_vyp", vyb_gen_dod_pri = "vyb_gen_dod_pri",}
	const enum GVyberBankyReadDtoFragments { banka = "*", vyb_typ_dav = "*", vyb_typ_vyp = "*", vyb_gen_dod_pri = "*",}
	const enum GVyberBankyReadDtoTypes { banka = "Gordic.Buc.Interface.GBankaDto", vyb_typ_dav = "number[]", vyb_typ_vyp = "number[]", vyb_gen_dod_pri = "boolean",}
	const enum GVyberBankyReadDtoTypeLengths {}
	/**Dto pro read request výběru banky pro načtení dávky*/
	interface GVyberBankyReadReqDto {
		/**DBCOLUMN:bucspba.ico*/
		ico?: string|null;
		/**DBCOLUMN:bucspba.ucs*/
		ucs?: string|null;
		/**ID externího subjektu typu banka*/
		ixs_esu?: string|null;
		/**Skupina bankovních účtů*/
		sbu?: number|null;
		/**Mód (0-3)*/
		mod?: number|null;
	}
	const enum GVyberBankyReadReqDtoNames { ico = "ico", ucs = "ucs", ixs_esu = "ixs_esu", sbu = "sbu", mod = "mod",}
	const enum GVyberBankyReadReqDtoFragments { ico = "*", ucs = "*", ixs_esu = "*", sbu = "*", mod = "*",}
	const enum GVyberBankyReadReqDtoTypes { ico = "string", ucs = "string", ixs_esu = "string", sbu = "number", mod = "number",}
	const enum GVyberBankyReadReqDtoTypeLengths { ico = 10, ucs = 10, ixs_esu = 12,}
	/**Dto pro s výběrem banky a přepínači pro načtení dávky*/
	interface GVyberBankyDto {
		/**Dto banky*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
		/**Datum kódu dávky*/
		dat_kod?: JsonDate|null;
		/**taj_kod*/
		taj_kod?: string|null;
		/**kod_ban_num*/
		kod_ban_num?: number|null;
		/**Formát dávky*/
		for_dav?: number|null;
		/**Typ výpisu*/
		typ_tra_vyp?: number|null;
		/**Dodatkové příkazy*/
		dod_pri?: number|null;
	}
	const enum GVyberBankyDtoNames { banka = "banka", dat_kod = "dat_kod", taj_kod = "taj_kod", kod_ban_num = "kod_ban_num", for_dav = "for_dav", typ_tra_vyp = "typ_tra_vyp", dod_pri = "dod_pri",}
	const enum GVyberBankyDtoFragments { banka = "*", dat_kod = "*", taj_kod = "*", kod_ban_num = "*", for_dav = "*", typ_tra_vyp = "*", dod_pri = "*",}
	const enum GVyberBankyDtoTypes { banka = "Gordic.Buc.Interface.GBankaDto", dat_kod = "JsonDate", taj_kod = "string", kod_ban_num = "number", for_dav = "number", typ_tra_vyp = "number", dod_pri = "number",}
	const enum GVyberBankyDtoTypeLengths {}
	/**Dto pro read request a validaci výběru banky pro načtení dávky včetně přepínačů*/
	interface GVyberBankyReadValidateReqDto {
		/**DBCOLUMN:bucspba.ico*/
		ico?: string|null;
		/**DBCOLUMN:bucspba.ucs*/
		ucs?: string|null;
		/**ID externího subjektu typu banka*/
		ixs_esu?: string|null;
		/**Skupina bankovních účtů*/
		sbu?: number|null;
		/**Mód (0-3)*/
		mod?: number|null;
		/**Formát dávky*/
		for_dav?: number|null;
		/**Typ výpisu*/
		typ_tra_vyp?: number|null;
		/**Dodatkové příkazy*/
		dod_pri?: number|null;
	}
	const enum GVyberBankyReadValidateReqDtoNames { ico = "ico", ucs = "ucs", ixs_esu = "ixs_esu", sbu = "sbu", mod = "mod", for_dav = "for_dav", typ_tra_vyp = "typ_tra_vyp", dod_pri = "dod_pri",}
	const enum GVyberBankyReadValidateReqDtoFragments { ico = "*", ucs = "*", ixs_esu = "*", sbu = "*", mod = "*", for_dav = "*", typ_tra_vyp = "*", dod_pri = "*",}
	const enum GVyberBankyReadValidateReqDtoTypes { ico = "string", ucs = "string", ixs_esu = "string", sbu = "number", mod = "number", for_dav = "number", typ_tra_vyp = "number", dod_pri = "number",}
	const enum GVyberBankyReadValidateReqDtoTypeLengths { ico = 10, ucs = 10, ixs_esu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniUcet\Gordic.Buc.Interface.IGBanUcet.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Bankovní účet - kontrola a formátování
	* @domain Banka
	* @businessObject BanUcet
	*/
	interface BanUcet {
		/**Kontrola bankovního účtu na modulo 11 a formátování*/
		zkontrolujUcet(rq?:Gordic.Buc.Interface.GBanUcetDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBanUcetDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBanUcetDto>,GServiceActionResponse<Gordic.Buc.Interface.GBanUcetDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BanUcet: ServiceBase & Catalog.BanUcet;
	}
	const BanUcet: Client["BanUcet"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtr pro Zůstatky vlastních BÚ*/
	const enum GBanUcetFilter {
		/**ucet*/
		ucet,
		/**g_ucet*/
		g_ucet,
		/**iban*/
		iban,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniUcet\Dto\Gordic.Buc.Interface.GBanUcet.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro kontrolu a formátování bankovního účtu*/
	interface GBanUcetDto {
		/**ucet pro kontrolu*/
		ucet?: string|null;
		/**směrový kód banky*/
		sk?: string|null;
		/**ucet ve formátu DB Ginis*/
		g_ucet?: string|null;
		/**ucet ve formátu levostranných nul s pomlčkou*/
		g_ucet0p?: string|null;
		/**ucet ve formátu levostranných nul bez pomlčky*/
		g_ucet0?: string|null;
		/**ucet ve formátu IBAN*/
		iban?: string|null;
		/**číslo chyby, 0-bez chyby*/
		chyba?: number|null;
		/**text chyby*/
		chyba_txt?: string|null;
		/**text dotazu*/
		dotaz?: string|null;
	}
	const enum GBanUcetDtoNames { ucet = "ucet", sk = "sk", g_ucet = "g_ucet", g_ucet0p = "g_ucet0p", g_ucet0 = "g_ucet0", iban = "iban", chyba = "chyba", chyba_txt = "chyba_txt", dotaz = "dotaz",}
	const enum GBanUcetDtoFragments { ucet = "main", sk = "main", g_ucet = "main", g_ucet0p = "main", g_ucet0 = "main", iban = "main", chyba = "main", chyba_txt = "main", dotaz = "main",}
	const enum GBanUcetDtoTypes { ucet = "string", sk = "string", g_ucet = "string", g_ucet0p = "string", g_ucet0 = "string", iban = "string", chyba = "number", chyba_txt = "string", dotaz = "string",}
	const enum GBanUcetDtoTypeLengths { ucet = 34, sk = 11, g_ucet = 34, g_ucet0p = 34, g_ucet0 = 34, iban = 34, chyba_txt = 254, dotaz = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\IGBankovniVypis.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Bankovní výpisy - bucspid
	* @domain Banka
	*/
	interface BucBankovniVypis {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GBankovniVypisDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GBankovniVypisDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GBankovniVypisDto>,GServiceReadResponse<Gordic.Buc.Interface.GBankovniVypisDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GBankovniVypisDto>>;
		/**Zjistí počet dokladů SML*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Podání bankovního výpisu*/
		create(rq?:Gordic.Buc.Interface.GBankovniVypisCreateReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisCreateReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisCreateReqDto>,GServiceSaveResponse<Gordic.Buc.Interface.GBankovniVypisDto>>;
		/**Update bankovního výpisu*/
		update(rq?:Gordic.Buc.Interface.GBankovniVypisUpdateReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisUpdateReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisUpdateReqDto>,GServiceSaveResponse<Gordic.Buc.Interface.GBankovniVypisDto>>;
		/**Storno bankovního výpisu*/
		stornovat(rq?:Gordic.Buc.Interface.GBankovniVypisPKDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisPKDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisPKDto>,GServiceSaveResponse<Gordic.Buc.Interface.GBankovniVypisDto>>;
		/**Vrátí oprávnění bankovních výpisů (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GBankovniVypisServicePermissions>;
		/**Kontrola na první doklad v knize*/
		zkontrolujNaPrvniDokladVKnize(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**Zjištění kurzovního lístku pro datum a převedení z měny do CZK*/
		najdiKurzovniListekAPrevedZMenyDoCzk(rq?:CallParams<{datum:JsonDate,c_mena:JsonDecimal,mena:number}>): _Task<{datum:JsonDate,c_mena:JsonDecimal,mena:number},JsonDecimal>;
		/**Náhrání obrázků účtenek k platebním kartám ze systému Fidoo*/
		nahrajUctenkyFidoo(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},number>;
		/**Zjištění údajů posledního výpisu pro předplnění údajů na novém bankovním výpisu*/
		getZustPoslVyp(rq?:CallParams<{sk_vl:string,bu_vl:string}>): _Task<{sk_vl:string,bu_vl:string},Gordic.Buc.Interface.GBankovniVypisPoslVypisDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucBankovniVypis: ServiceBase & Catalog.BucBankovniVypis;
	}
	const BucBankovniVypis: Client["BucBankovniVypis"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu bankovních výpisů*/
	const enum GBankovniVypisFilter {
		/**PK tabulky - Identifikátor*/
		ixp,
		/**Kniha*/
		ixp_den,
		/**Rok knihy*/
		rok_den,
		/**Kategorie knihy*/
		ktg_den,
		/**Agendové číslo*/
		ac_ag,
		/**Evidenční číslo*/
		ac,
		/**Bankovní účet vlastní*/
		bu_vl,
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl,
		/**Datum nového zůstatku*/
		dat_nov_zus,
		/**Datum starého zůstatku*/
		dat_str_zus,
		/**Číslo výpisu*/
		cis_pid,
		/**Stav výpisu*/
		s_bvy,
		/**Pouze výpisy ve stavu Podáno (bez agendového čísla) - hodnoty 0/1*/
		pouze_podane,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\IGDefiniceVS.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Definice VS pro hledání v poli AV při načítání bankovního výpisu
	* @domain Banka
	*/
	interface BucDefiniceVS {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GDefiniceVSPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GDefiniceVSPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GDefiniceVSPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GDefiniceVSDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDefiniceVSDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Buc.Interface.GDefiniceVSUpsertReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDefiniceVSUpsertReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDefiniceVSUpsertReqDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDefiniceVSDto>>;
		/**Stornovat záznam*/
		stornovat(rq?:Gordic.Buc.Interface.GDefiniceVSPKDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDefiniceVSPKDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDefiniceVSPKDto>,void>;
		/**Získání kolekcí začátků VS pro účet seskupený podle příjmu/výdaje*/
		ziskatKolekce(rq?:CallParams<{sk_vl:string,bu_vl:string}>): _Task<{sk_vl:string,bu_vl:string},Gordic.Buc.Interface.GDefiniceVSKolekceDto>;
		/**Opravnění pro celý seznam definic VS*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GDefiniceVSServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDefiniceVS: ServiceBase & Catalog.BucDefiniceVS;
	}
	const BucDefiniceVS: Client["BucDefiniceVS"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu definice VS pro hledání v poli AV při načítání bankovního výpisu*/
	const enum GDefiniceVSFilter {
		/**bu_vl*/
		bu_vl,
		/**sk_vl*/
		sk_vl,
		/**vs_def*/
		vs_def,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\IGNacteniElVypisu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Načtení elektronického výpisu
	* @domain Banka
	*/
	interface BucNacteniElVypisu {
		/**Zjištění povolených souborů pro načtení elektronického výpisu dle kódu banky*/
		povoleneSouboryDleKodBanNum(rq?:CallParams<{kod_ban_num:number}>): _Task<{kod_ban_num:number},Gordic.Buc.Interface.GNacteniElVypisuPovoleneSouboryDto>;
		/**Načtení elektronického výpisu ze souboru/ů*/
		nacteniElVypisu(rq?:Gordic.Buc.Interface.GNacteniElVypisuReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GNacteniElVypisuReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GNacteniElVypisuReqDto>,Gordic.Buc.Interface.GNacteniElVypisuResDto>;
		/**Získání datumu výpisu pro WS ČNB*/
		ziskejDatumVypisuProWSCNB(rq?:CallParams<{sk_vl:string}>): _Task<{sk_vl:string},JsonDate>;
		/**Načtení elektronického výpisu ze webové služby ČNB*/
		nacteniElVypisuWSCNB(rq?:Gordic.Buc.Interface.GNacteniElVypisuWSCNBReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GNacteniElVypisuWSCNBReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GNacteniElVypisuWSCNBReqDto>,Gordic.Buc.Interface.GNacteniElVypisuResDto>;
		/**Načtení elektronického výpisu pomocí API*/
		nacteniElVypisuAPI(rq?:Gordic.Buc.Interface.GNacteniElVypisuKontrolaDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GNacteniElVypisuKontrolaDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GNacteniElVypisuKontrolaDto>,Gordic.Buc.Interface.GNacteniElVypisuResDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucNacteniElVypisu: ServiceBase & Catalog.BucNacteniElVypisu;
	}
	const BucNacteniElVypisu: Client["BucNacteniElVypisu"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu načtení elektronického výpisu*/
	const enum GNacteniElVypisuFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\IGOcekavanoZBanky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Očekáváno z banky
	* @domain Banka
	*/
	interface BucOcekavanoZBanky {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GOcekavanoZBankyPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GOcekavanoZBankyPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GOcekavanoZBankyPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
		/**Opravnění pro celý seznam očekáváno z banky*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GOcekavanoZBankyServicePermissions>;
		/**Kontrola položek před přidáním/zaktivněním*/
		zkontrolujPredPridat(rq?:Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
		/**Hromadné přidání/zaktivnění*/
		hromadnePridat(rq?:Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
		/**Kontrola položek před vyjmutím/zneaktivněním*/
		zkontrolujPredVyjmout(rq?:Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
		/**Hromadné vyjmutím/zneaktivnění*/
		hromadneVyjmout(rq?:Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
		/**Kontrola položek před stornováním - vrácení k opravě do agendy*/
		zkontrolujPredStornovat(rq?:Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
		/**Hromadné storno - vrácení k opravě do agendy*/
		hromadneStornovat(rq?:Gordic.Buc.Interface.GOcekavanoZBankyHromStornoDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromStornoDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GOcekavanoZBankyHromStornoDto>,GServiceGroupResponse<Gordic.Buc.Interface.GOcekavanoZBankyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucOcekavanoZBanky: ServiceBase & Catalog.BucOcekavanoZBanky;
	}
	const BucOcekavanoZBanky: Client["BucOcekavanoZBanky"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu očekáváno z banky*/
	const enum GOcekavanoZBankyFilter {
		/**ixp*/
		ixp,
		/**radek_uhr*/
		radek_uhr,
		/**sk_vl*/
		sk_vl,
		/**bu_vl*/
		bu_vl,
		/**sk_ci*/
		sk_ci,
		/**bu_ci*/
		bu_ci,
		/**c*/
		c,
		/**c_par*/
		c_par,
		/**dat_spl*/
		dat_spl,
		/**vs*/
		vs,
		/**ks*/
		ks,
		/**ss*/
		ss,
		/**mena*/
		mena,
		/**c_mena*/
		c_mena,
		/**nazev*/
		nazev,
		/**Agenda*/
		typ_ag,
		/**EKO aktivita*/
		eko_akt,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\IGParovano.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Párování k detailu platby
	* @domain Banka
	*/
	interface BucParovano {
		/**Read pro detail platby na kterou byla párována položka výpisu*/
		read(rq?:Gordic.Buc.Interface.GParovanoDetailReadReqDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GParovanoDetailReadReqDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GParovanoDetailReadReqDto>,GServiceReadResponse<Gordic.Buc.Interface.GParovanoDetailDto>>;
		/**Seznam historie párování položky bankovního výpisu*/
		historie(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GParovanoHistorieDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucParovano: ServiceBase & Catalog.BucParovano;
	}
	const BucParovano: Client["BucParovano"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro historii párování*/
	const enum GParovanoHistorieFilter {
		/**Identifikátor*/
		ixp,
		/**Řádek položky bankovního výpisu*/
		radek_pol,
		/**Subřádek položky bankovního výpisu*/
		subradek,
		/**Řádek AV - řádek rozpisu položky bankovního výpisu*/
		radek_av,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\Dto\GBankovniVypisDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucspid
	*      Bankovní výpisy
	*/
	interface GBankovniVypisDto extends Gordic.Buc.Interface.GBucSeznamDto {
		/**Identifikátor
		*      Identifikátor bankovního výpisu
		*/
		ixp?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		/**Kniha
		*      Kniha dokladů
		*/
		ixp_den?: string|null;
		/**Evidenční číslo	 
		*      Evidenční číslo
		*/
		ac?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Vlasní bankovní účet
		*      Tvar bankovního účtu se směrovým kódem banky
		*/
		bu_txt_vl?: string|null;
		/**Datum počátečního zůstatku
		*      Datum počátečního ( starého ) zůstatku bankovního účtu
		*/
		dat_str_zus?: JsonDate|null;
		/**Počáteční zůstatek
		*      Počáteční ( starý ) zůstatek bankovního účtu
		*/
		str_zus?: JsonDecimal|null;
		/**Datum nového zůstatku
		*      Datum konečného ( nového ) zůstatku bankovního účtu
		*/
		dat_nov_zus?: JsonDate|null;
		/**Nový zůstatek
		*      Konečný ( nový ) zůstatek bankovního účtu
		*/
		nov_zus?: JsonDecimal|null;
		/**Obraty debet
		*      Suma obratů debet za celý bankovní výpis
		*/
		obr_deb?: JsonDecimal|null;
		/**Obraty kredit
		*      Suma obratů kredit za celý bankovní výpis
		*/
		obr_kre?: JsonDecimal|null;
		/**Rokvýpisu
		*      Rok bankovního výpisu
		*/
		rok_pid?: number|null;
		/**Číslo výpisu
		*      Číslo bankovního výpisu
		*/
		cis_pid?: number|null;
		/**Označení dávky
		*      Označení dávky - název datového souboru
		*/
		ozn_dav?: string|null;
		/**Kategorie
		*      Kategorie typu dokladu
		*/
		ktg_typ?: number|null;
		/**Druh dokumentu
		*      Druh kategorie typu dokumentu
		*/
		ixs_typ?: string|null;
		/**Aktivita
		*      Ekonomická aktivita
		*/
		eko_akt?: number|null;
		/**Datum evidence
		*      Datum evidence
		*/
		dat_evid?: JsonDate|null;
		/**Stav výpisu
		*      Stav banovního výpisu
		*/
		s_bvy?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum a čas vzniku záznamu*/
		dat_mpd?: JsonDate|null;
		/**Aktuální vlastník dokumentu*/
		ixs_fun_akt?: string|null;
		/**Identifikátor externího subjektu
		*      Pro dokumeny typu zápočtové listy
		*/
		ixs_esu?: string|null;
		/**Číslo výpisu
		*      Elektronické číslo ban. výpisu
		*/
		cis_pid_e?: number|null;
		/**Příznak přečtení
		*      Příznak přečtení
		*/
		priz_view?: number|null;
		/**Agendové číslo
		*      Agendové číslo
		*/
		ac_ag?: string|null;
		/**Bilanční zůstatek
		*      Bilanční zůstatek
		*/
		c_bil?: JsonDecimal|null;
		/**Limit debetního zůstatku
		*      Limit debetního zůstatku
		*/
		c_limdz?: JsonDecimal|null;
		/**Rezervace
		*      Částka rezervace
		*/
		c_rez?: JsonDecimal|null;
		/**Typ výpisu
		*      Typ výpisu
		*/
		typ_vypis?: number|null;
		/**Zkratka aktuálního stavu výpisu*/
		s_bvy_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu výpisu*/
		s_bvy_txt?: string|null;
		/**Zkratka aktuálního typu výpisu*/
		typ_vypis_zkr?: string|null;
		/**Textové vyjádření aktuálního typu výpisu*/
		typ_vypis_txt?: string|null;
		/**Textově složený účet*/
		ucet_vl?: string|null;
		/**Textový stav výpisu včetně stavu položek*/
		stav_txt?: string|null;
		/**Valutový zůstatek*/
		c_val_zus?: JsonDecimal|null;
		/**Měna bankovního výpisu podle účtu*/
		mena?: number|null;
		/**navigační vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**přeevidence (0 - v aktuální knize, 1 - předáno z jiné knihy, 2 - předáno do jiné knihy)*/
		preevidence?: number|null;
		/**vlastnictví (0 - vlastní doklad, 1 - jiný zpracovatel)*/
		vlastnictvi?: number|null;
		/**el. obraz - typ souboru*/
		el_obraz_typ?: string|null;
		/**el. obraz - název souboru*/
		el_obraz_soubor?: string|null;
		/**el. přílohy - počet příloh*/
		el_prilohy_pocet?: number|null;
		/**stav zpracování v agendě*/
		stav_sda?: number|null;
		/**přístup k dokumentu*/
		pristup?: Gordic.Wfl.Interface.GWflPristupInfo|null;
		/**navigační vlastnost pro vlastnosti (ixp)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**navigační vlastnost pro vlastnosti (ixp)*/
		polozky?: Gordic.Buc.Interface.GBankovniVypisPolozkaDto[]|null;
		/**Je doklad podaný?*/
		readonly JePodany?: boolean|null;
		/**Je doklad stornovaný?*/
		readonly JeStornovany?: boolean|null;
		/**Je doklad veden v jiné agendě?*/
		readonly JeVJineAgende?: boolean|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GBankovniVypisPermissions|null;
	}
	const enum GBankovniVypisDtoNames { ixp = "ixp", lic = "lic", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", dat_str_zus = "dat_str_zus", str_zus = "str_zus", dat_nov_zus = "dat_nov_zus", nov_zus = "nov_zus", obr_deb = "obr_deb", obr_kre = "obr_kre", rok_pid = "rok_pid", cis_pid = "cis_pid", ozn_dav = "ozn_dav", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", s_bvy = "s_bvy", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_mpd = "dat_mpd", ixs_fun_akt = "ixs_fun_akt", ixs_esu = "ixs_esu", cis_pid_e = "cis_pid_e", priz_view = "priz_view", ac_ag = "ac_ag", c_bil = "c_bil", c_limdz = "c_limdz", c_rez = "c_rez", typ_vypis = "typ_vypis", s_bvy_zkr = "s_bvy_zkr", s_bvy_txt = "s_bvy_txt", typ_vypis_zkr = "typ_vypis_zkr", typ_vypis_txt = "typ_vypis_txt", ucet_vl = "ucet_vl", stav_txt = "stav_txt", c_val_zus = "c_val_zus", mena = "mena", dokument = "dokument", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", stav_sda = "stav_sda", pristup = "pristup", vlastnosti = "vlastnosti", polozky = "polozky", JePodany = "JePodany", JeStornovany = "JeStornovany", JeVJineAgende = "JeVJineAgende", PrimaryKey = "PrimaryKey", Permissions = "Permissions", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GBankovniVypisDtoFragments { ixp = "Base", lic = "Base", ico = "Base", ucs = "Base", nks = "Base", ixp_den = "Base", ac = "Base", sk_vl = "Base", bu_vl = "Base", bu_txt_vl = "Base", dat_str_zus = "Base", str_zus = "Base", dat_nov_zus = "Base", nov_zus = "Base", obr_deb = "Base", obr_kre = "Base", rok_pid = "Base", cis_pid = "Base", ozn_dav = "Base", ktg_typ = "Base", ixs_typ = "Base", eko_akt = "Base", dat_evid = "Base", s_bvy = "Base", dat_zmena = "Base", zmenu_prov = "Base", dat_mpd = "Base", ixs_fun_akt = "Base", ixs_esu = "Base", cis_pid_e = "Base", priz_view = "Base", ac_ag = "Base", c_bil = "Base", c_limdz = "Base", c_rez = "Base", typ_vypis = "Base", s_bvy_zkr = "s_bvy_zkr", s_bvy_txt = "s_bvy_zkr", typ_vypis_zkr = "typ_vypis_zkr", typ_vypis_txt = "typ_vypis_zkr", ucet_vl = "Base", stav_txt = "*", c_val_zus = "*", mena = "*", dokument = "dokument", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz", el_obraz_soubor = "el_obraz", el_prilohy_pocet = "el_prilohy", stav_sda = "stav_sda", pristup = "pristup", vlastnosti = "vlastnosti", polozky = "polozky", JePodany = "*", JeStornovany = "*", JeVJineAgende = "*", PrimaryKey = "*", Permissions = "Permissions", PrimaryKeyInFilters = "*",}
	const enum GBankovniVypisDtoTypes { ixp = "string", lic = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", dat_str_zus = "JsonDate", str_zus = "JsonDecimal", dat_nov_zus = "JsonDate", nov_zus = "JsonDecimal", obr_deb = "JsonDecimal", obr_kre = "JsonDecimal", rok_pid = "number", cis_pid = "number", ozn_dav = "string", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", s_bvy = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_mpd = "JsonDate", ixs_fun_akt = "string", ixs_esu = "string", cis_pid_e = "number", priz_view = "number", ac_ag = "string", c_bil = "JsonDecimal", c_limdz = "JsonDecimal", c_rez = "JsonDecimal", typ_vypis = "number", s_bvy_zkr = "string", s_bvy_txt = "string", typ_vypis_zkr = "string", typ_vypis_txt = "string", ucet_vl = "string", stav_txt = "string", c_val_zus = "JsonDecimal", mena = "number", dokument = "Gordic.Ssl.Interface.GDokumentDto", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", stav_sda = "number", pristup = "Gordic.Wfl.Interface.GWflPristupInfo", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", polozky = "Gordic.Buc.Interface.GBankovniVypisPolozkaDto[]", JePodany = "boolean", JeStornovany = "boolean", JeVJineAgende = "boolean", PrimaryKey = "string", Permissions = "Gordic.Buc.Interface.GBankovniVypisPermissions", PrimaryKeyInFilters = "string",}
	const enum GBankovniVypisDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46, ozn_dav = 254, ixs_typ = 12, zmenu_prov = 12, ixs_fun_akt = 12, ixs_esu = 12, ac_ag = 20,}
	/**Dto s primárním klíčem bankovního výpisu*/
	interface GBankovniVypisPKDto {
		/**Identifikátor bankovního výpisu*/
		ixp?: string|null;
	}
	const enum GBankovniVypisPKDtoNames { ixp = "ixp",}
	const enum GBankovniVypisPKDtoFragments { ixp = "*",}
	const enum GBankovniVypisPKDtoTypes { ixp = "string",}
	const enum GBankovniVypisPKDtoTypeLengths {}
	/**Permissions pro práci s bankovním výpisem*/
	interface GBankovniVypisPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Oprávnění spouštět/vidět akce bankovního výpisu*/
		Actions?: Gordic.Buc.Interface.GBankovniVypisActionsPermissions|null;
		/**Oprávnění editovat/vidět jednotlivá políčka/části formuláře detailu bankovního výpisu*/
		Fields?: Gordic.Buc.Interface.GBankovniVypisFieldsPermissions|null;
	}
	const enum GBankovniVypisPermissionsNames { Actions = "Actions", Fields = "Fields",}
	const enum GBankovniVypisPermissionsFragments { Actions = "Actions", Fields = "Fields",}
	const enum GBankovniVypisPermissionsTypes { Actions = "Gordic.Buc.Interface.GBankovniVypisActionsPermissions", Fields = "Gordic.Buc.Interface.GBankovniVypisFieldsPermissions",}
	const enum GBankovniVypisPermissionsTypeLengths {}
	/**Permissions pro práci s akcemi bankovního výpisu*/
	interface GBankovniVypisActionsPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno podat nový bankovní výpis*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat bankovní výpis*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat položky bankovní výpis*/
		LzeEditovatPolozky: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno evidovat bankovní výpis*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit přeevidenci*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit předání*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit převzetí*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit přidělení*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno vrátit doklad do WFL*/
		LzeVratitDoWfl: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat bankovní výpis*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno tisknout bankovní výpis*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno tisknout protokol bankovního výpisu*/
		LzeTisknoutProtokol: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit valutove obraty bankovního výpisu*/
		LzeValutoveObraty: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno nahrát účtenky z Fidoo*/
		LzeNahrajFidoo: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankovniVypisActionsPermissionsNames { LzePodat = "LzePodat", LzeEditovat = "LzeEditovat", LzeEditovatPolozky = "LzeEditovatPolozky", LzeEvidovat = "LzeEvidovat", LzePreevidovat = "LzePreevidovat", LzePredat = "LzePredat", LzePrevzit = "LzePrevzit", LzePridelit = "LzePridelit", LzeVratitDoWfl = "LzeVratitDoWfl", LzeStornovat = "LzeStornovat", LzeTisknout = "LzeTisknout", LzeTisknoutProtokol = "LzeTisknoutProtokol", LzeValutoveObraty = "LzeValutoveObraty", LzeNahrajFidoo = "LzeNahrajFidoo",}
	const enum GBankovniVypisActionsPermissionsFragments { LzePodat = "*", LzeEditovat = "*", LzeEditovatPolozky = "*", LzeEvidovat = "*", LzePreevidovat = "*", LzePredat = "*", LzePrevzit = "*", LzePridelit = "*", LzeVratitDoWfl = "*", LzeStornovat = "*", LzeTisknout = "*", LzeTisknoutProtokol = "*", LzeValutoveObraty = "*", LzeNahrajFidoo = "*",}
	const enum GBankovniVypisActionsPermissionsTypes { LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPolozky = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWfl = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeTisknoutProtokol = "Gordic.General.ApplicationInterface.GPermission", LzeValutoveObraty = "Gordic.General.ApplicationInterface.GPermission", LzeNahrajFidoo = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankovniVypisActionsPermissionsTypeLengths {}
	/**Permissions pro práci s políčky bankovního výpisu*/
	interface GBankovniVypisFieldsPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat bankovní účet*/
		LzeBankovniUcet: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat limit debetního zůstatku*/
		LzeLimitDebetnihoZustatku: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat typ výpisu*/
		LzeTypVypisu: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat rezervace*/
		LzeRezervace: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat bilanční převod*/
		LzeBilancniPrevod: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankovniVypisFieldsPermissionsNames { LzeBankovniUcet = "LzeBankovniUcet", LzeLimitDebetnihoZustatku = "LzeLimitDebetnihoZustatku", LzeTypVypisu = "LzeTypVypisu", LzeRezervace = "LzeRezervace", LzeBilancniPrevod = "LzeBilancniPrevod",}
	const enum GBankovniVypisFieldsPermissionsFragments { LzeBankovniUcet = "*", LzeLimitDebetnihoZustatku = "*", LzeTypVypisu = "*", LzeRezervace = "*", LzeBilancniPrevod = "*",}
	const enum GBankovniVypisFieldsPermissionsTypes { LzeBankovniUcet = "Gordic.General.ApplicationInterface.GPermission", LzeLimitDebetnihoZustatku = "Gordic.General.ApplicationInterface.GPermission", LzeTypVypisu = "Gordic.General.ApplicationInterface.GPermission", LzeRezervace = "Gordic.General.ApplicationInterface.GPermission", LzeBilancniPrevod = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankovniVypisFieldsPermissionsTypeLengths {}
	/**Service permissions pro práci se seznamem bankovních výpisů*/
	interface GBankovniVypisServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno podat nový bankovní výpis*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat bankovní výpis*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno načíst elektronický bankovní výpis*/
		LzeNacist: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit přeevidenci*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit automatické párování*/
		LzeAutParovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankovniVypisServicePermissionsNames { LzePodat = "LzePodat", LzeEditovat = "LzeEditovat", LzeNacist = "LzeNacist", LzePreevidovat = "LzePreevidovat", LzeAutParovat = "LzeAutParovat",}
	const enum GBankovniVypisServicePermissionsFragments { LzePodat = "*", LzeEditovat = "*", LzeNacist = "*", LzePreevidovat = "*", LzeAutParovat = "*",}
	const enum GBankovniVypisServicePermissionsTypes { LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeNacist = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeAutParovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankovniVypisServicePermissionsTypeLengths {}
	/**Dto request pro vytvoření bankovního výpisu*/
	interface GBankovniVypisCreateReqDto {
		/**Identifikátor bankovního výpisu*/
		ixp?: string|null;
		/**Kniha
		*      Kniha dokladů
		*/
		ixp_den?: string|null;
	}
	const enum GBankovniVypisCreateReqDtoNames { ixp = "ixp", ixp_den = "ixp_den",}
	const enum GBankovniVypisCreateReqDtoFragments { ixp = "*", ixp_den = "*",}
	const enum GBankovniVypisCreateReqDtoTypes { ixp = "string", ixp_den = "string",}
	const enum GBankovniVypisCreateReqDtoTypeLengths { ixp_den = 12,}
	/**Dto request pro aktualizaci bankovního výpisu*/
	interface GBankovniVypisUpdateReqDto {
		/**Identifikátor bankovního výpisu*/
		ixp?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Datum počátečního zůstatku
		*      Datum počátečního ( starého ) zůstatku bankovního účtu
		*/
		dat_str_zus?: JsonDate|null;
		/**Počáteční zůstatek
		*      Počáteční ( starý ) zůstatek bankovního účtu
		*/
		str_zus?: JsonDecimal|null;
		/**Datum nového zůstatku
		*      Datum konečného ( nového ) zůstatku bankovního účtu
		*/
		dat_nov_zus?: JsonDate|null;
		/**Nový zůstatek
		*      Konečný ( nový ) zůstatek bankovního účtu
		*/
		nov_zus?: JsonDecimal|null;
		/**Obraty debet
		*      Suma obratů debet za celý bankovní výpis
		*/
		obr_deb?: JsonDecimal|null;
		/**Obraty kredit
		*      Suma obratů kredit za celý bankovní výpis
		*/
		obr_kre?: JsonDecimal|null;
		/**Číslo výpisu
		*      Číslo bankovního výpisu
		*/
		cis_pid?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Bilanční zůstatek
		*      Bilanční zůstatek
		*/
		c_bil?: JsonDecimal|null;
		/**Limit debetního zůstatku
		*      Limit debetního zůstatku
		*/
		c_limdz?: JsonDecimal|null;
		/**Rezervace
		*      Částka rezervace
		*/
		c_rez?: JsonDecimal|null;
		/**Typ výpisu
		*      Typ výpisu
		*/
		typ_vypis?: number|null;
		/**navigační vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**navigační vlastnost pro vlastnosti (ixp)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
	}
	const enum GBankovniVypisUpdateReqDtoNames { ixp = "ixp", sk_vl = "sk_vl", bu_vl = "bu_vl", dat_str_zus = "dat_str_zus", str_zus = "str_zus", dat_nov_zus = "dat_nov_zus", nov_zus = "nov_zus", obr_deb = "obr_deb", obr_kre = "obr_kre", cis_pid = "cis_pid", dat_zmena = "dat_zmena", c_bil = "c_bil", c_limdz = "c_limdz", c_rez = "c_rez", typ_vypis = "typ_vypis", dokument = "dokument", vlastnosti = "vlastnosti",}
	const enum GBankovniVypisUpdateReqDtoFragments { ixp = "*", sk_vl = "*", bu_vl = "*", dat_str_zus = "*", str_zus = "*", dat_nov_zus = "*", nov_zus = "*", obr_deb = "*", obr_kre = "*", cis_pid = "*", dat_zmena = "*", c_bil = "*", c_limdz = "*", c_rez = "*", typ_vypis = "*", dokument = "*", vlastnosti = "*",}
	const enum GBankovniVypisUpdateReqDtoTypes { ixp = "string", sk_vl = "string", bu_vl = "string", dat_str_zus = "JsonDate", str_zus = "JsonDecimal", dat_nov_zus = "JsonDate", nov_zus = "JsonDecimal", obr_deb = "JsonDecimal", obr_kre = "JsonDecimal", cis_pid = "number", dat_zmena = "JsonDate", c_bil = "JsonDecimal", c_limdz = "JsonDecimal", c_rez = "JsonDecimal", typ_vypis = "number", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto",}
	const enum GBankovniVypisUpdateReqDtoTypeLengths { sk_vl = 11, bu_vl = 34,}
	/**Dto s údaji posledního výpisu pro předplnění formuláře nového výpisu*/
	interface GBankovniVypisPoslVypisDto {
		/**Číslo výpisu*/
		cis_pid?: number|null;
		/**Datum konečného zůstatku*/
		dat_nov_zus?: JsonDate|null;
		/**Nový zůstatek*/
		nov_zus?: JsonDecimal|null;
	}
	const enum GBankovniVypisPoslVypisDtoNames { cis_pid = "cis_pid", dat_nov_zus = "dat_nov_zus", nov_zus = "nov_zus",}
	const enum GBankovniVypisPoslVypisDtoFragments { cis_pid = "*", dat_nov_zus = "*", nov_zus = "*",}
	const enum GBankovniVypisPoslVypisDtoTypes { cis_pid = "number", dat_nov_zus = "JsonDate", nov_zus = "JsonDecimal",}
	const enum GBankovniVypisPoslVypisDtoTypeLengths {}
	/**Dto s valutovými obraty za datumy valuta*/
	interface GValutoveObratyDto {
		/**Datum valuta*/
		dat_val?: JsonDate|null;
		/**Obraty debet*/
		obr_deb?: JsonDecimal|null;
		/**Obraty kredit*/
		obr_kre?: JsonDecimal|null;
	}
	const enum GValutoveObratyDtoNames { dat_val = "dat_val", obr_deb = "obr_deb", obr_kre = "obr_kre",}
	const enum GValutoveObratyDtoFragments { dat_val = "*", obr_deb = "*", obr_kre = "*",}
	const enum GValutoveObratyDtoTypes { dat_val = "JsonDate", obr_deb = "JsonDecimal", obr_kre = "JsonDecimal",}
	const enum GValutoveObratyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\Dto\GDefiniceVSDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucszvs
	*      Maska pro rozpoznání VS z popisu položky výpisu
	*/
	interface GDefiniceVSDto {
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		vs_def?: string|null;
		typ_kum?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**typ_kum - textově*/
		typ_kum_txt?: string|null;
		/**Bankovní účet vlastní spojený*/
		ucet_vl?: string|null;
		/**Aktuální rok knihy pro ekosuvl*/
		rok_knihy?: number|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GDefiniceVSPermissions|null;
	}
	const enum GDefiniceVSDtoNames { sk_vl = "sk_vl", bu_vl = "bu_vl", vs_def = "vs_def", typ_kum = "typ_kum", nazev = "nazev", aktivita = "aktivita", typ_kum_txt = "typ_kum_txt", ucet_vl = "ucet_vl", rok_knihy = "rok_knihy", Permissions = "Permissions",}
	const enum GDefiniceVSDtoFragments { sk_vl = "*", bu_vl = "*", vs_def = "*", typ_kum = "*", nazev = "*", aktivita = "*", typ_kum_txt = "*", ucet_vl = "*", rok_knihy = "*", Permissions = "Permissions",}
	const enum GDefiniceVSDtoTypes { sk_vl = "string", bu_vl = "string", vs_def = "string", typ_kum = "number", nazev = "string", aktivita = "number", typ_kum_txt = "string", ucet_vl = "string", rok_knihy = "number", Permissions = "Gordic.Buc.Interface.GDefiniceVSPermissions",}
	const enum GDefiniceVSDtoTypeLengths { sk_vl = 11, bu_vl = 34, vs_def = 12, nazev = 50,}
	/**Dto s primárními klíči definice VS*/
	interface GDefiniceVSPKDto {
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		vs_def?: string|null;
	}
	const enum GDefiniceVSPKDtoNames { sk_vl = "sk_vl", bu_vl = "bu_vl", vs_def = "vs_def",}
	const enum GDefiniceVSPKDtoFragments { sk_vl = "*", bu_vl = "*", vs_def = "*",}
	const enum GDefiniceVSPKDtoTypes { sk_vl = "string", bu_vl = "string", vs_def = "string",}
	const enum GDefiniceVSPKDtoTypeLengths { sk_vl = 11, bu_vl = 34, vs_def = 12,}
	/**Dto pro upsert definice VS pro hledání v poli AV při načítání bankovního výpisu*/
	interface GDefiniceVSUpsertReqDto {
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		vs_def?: string|null;
		typ_kum?: number|null;
		/**Název*/
		nazev?: string|null;
	}
	const enum GDefiniceVSUpsertReqDtoNames { sk_vl = "sk_vl", bu_vl = "bu_vl", vs_def = "vs_def", typ_kum = "typ_kum", nazev = "nazev",}
	const enum GDefiniceVSUpsertReqDtoFragments { sk_vl = "*", bu_vl = "*", vs_def = "*", typ_kum = "*", nazev = "*",}
	const enum GDefiniceVSUpsertReqDtoTypes { sk_vl = "string", bu_vl = "string", vs_def = "string", typ_kum = "number", nazev = "string",}
	const enum GDefiniceVSUpsertReqDtoTypeLengths { sk_vl = 11, bu_vl = 34, vs_def = 12, nazev = 50,}
	/**Dto s kolekcemi příjmů/výdajů definice VS pro hledání v poli AV při načítání bankovního výpisu pro účet*/
	interface GDefiniceVSKolekceDto {
		/**Kolekce příjmů*/
		prijmy?: string[]|null;
		/**Kolekce výdajů*/
		vydaje?: string[]|null;
	}
	const enum GDefiniceVSKolekceDtoNames { prijmy = "prijmy", vydaje = "vydaje",}
	const enum GDefiniceVSKolekceDtoFragments { prijmy = "*", vydaje = "*",}
	const enum GDefiniceVSKolekceDtoTypes { prijmy = "string[]", vydaje = "string[]",}
	const enum GDefiniceVSKolekceDtoTypeLengths {}
	/**Permissions pro práci s definicemi VS*/
	interface GDefiniceVSPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit definici VS*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat definici VS*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat definici VS*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDefiniceVSPermissionsNames { LzeZobrazit = "LzeZobrazit", LzeEditovat = "LzeEditovat", LzeStornovat = "LzeStornovat",}
	const enum GDefiniceVSPermissionsFragments { LzeZobrazit = "*", LzeEditovat = "*", LzeStornovat = "*",}
	const enum GDefiniceVSPermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDefiniceVSPermissionsTypeLengths {}
	/**Service Permissions pro práci s definicemi VS*/
	interface GDefiniceVSServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit definici VS*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno vytvořit novou definici VS*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDefiniceVSServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeNovy = "LzeNovy",}
	const enum GDefiniceVSServicePermissionsFragments { LzeZobrazit = "*", LzeNovy = "*",}
	const enum GDefiniceVSServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeNovy = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDefiniceVSServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\Dto\GNacteniElVypisuDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto pro načtení elektronického výpisu*/
	interface GNacteniElVypisuDto {
	}
	const enum GNacteniElVypisuDtoNames {}
	const enum GNacteniElVypisuDtoFragments {}
	const enum GNacteniElVypisuDtoTypes {}
	const enum GNacteniElVypisuDtoTypeLengths {}
	/**Dto pro načtení elektronického výpisu ze souboru*/
	interface GNacteniElVypisuReqDto extends Gordic.Buc.Interface.GNacteniElVypisuKontrolaDto {
		/**Guid identifikátory souborů s výpisy*/
		guids?: string[]|null;
	}
	const enum GNacteniElVypisuReqDtoNames { guids = "guids", ico = "ico", ucs = "ucs", ixs_esu = "ixs_esu", sbu = "sbu", mod = "mod", for_dav = "for_dav", typ_tra_vyp = "typ_tra_vyp", dod_pri = "dod_pri", ikc = "ikc",}
	const enum GNacteniElVypisuReqDtoFragments { guids = "*", ico = "*", ucs = "*", ixs_esu = "*", sbu = "*", mod = "*", for_dav = "*", typ_tra_vyp = "*", dod_pri = "*", ikc = "*",}
	const enum GNacteniElVypisuReqDtoTypes { guids = "string[]", ico = "string", ucs = "string", ixs_esu = "string", sbu = "number", mod = "number", for_dav = "number", typ_tra_vyp = "number", dod_pri = "number", ikc = "Gordic.General.GIkc",}
	const enum GNacteniElVypisuReqDtoTypeLengths { ico = 10, ucs = 10, ixs_esu = 12,}
	/**Výsledek načtení elektronického výpisu*/
	interface GNacteniElVypisuResDto {
		/**Seznam výsledků načítání položek*/
		items?: Gordic.Buc.Interface.GNacteniElVypisuResItemDto[]|null;
	}
	const enum GNacteniElVypisuResDtoNames { items = "items",}
	const enum GNacteniElVypisuResDtoFragments { items = "*",}
	const enum GNacteniElVypisuResDtoTypes { items = "Gordic.Buc.Interface.GNacteniElVypisuResItemDto[]",}
	const enum GNacteniElVypisuResDtoTypeLengths {}
	/**Výsledek načtení jednoho bankovního výpisu*/
	interface GNacteniElVypisuResItemDto {
		/**Guid identifikátor souboru s výpisem*/
		guid?: string|null;
		/**Pořadové číslo položek*/
		por_cislo?: number|null;
		/**ID rodiče pro stromovou strukturu*/
		parentId?: number|null;
		/**Název souboru s výpisem*/
		nazev_souboru?: string|null;
		/**IXP výpisu*/
		ixp?: string|null;
		/**Číslo bankovního výpisu*/
		cis_pid?: number|null;
		/**Datum výpisu*/
		dat_nov_zus?: JsonDate|null;
		/**Konečný zůstatek*/
		nov_zus?: JsonDecimal|null;
		/**Počet načtených položek*/
		pocet_polozek?: number|null;
		/**Typ výsledku načítání souboru*/
		kind?: number|null;
		/**Popis chyby při načítání souboru*/
		error_txt?: string|null;
	}
	const enum GNacteniElVypisuResItemDtoNames { guid = "guid", por_cislo = "por_cislo", parentId = "parentId", nazev_souboru = "nazev_souboru", ixp = "ixp", cis_pid = "cis_pid", dat_nov_zus = "dat_nov_zus", nov_zus = "nov_zus", pocet_polozek = "pocet_polozek", kind = "kind", error_txt = "error_txt",}
	const enum GNacteniElVypisuResItemDtoFragments { guid = "*", por_cislo = "*", parentId = "*", nazev_souboru = "*", ixp = "*", cis_pid = "*", dat_nov_zus = "*", nov_zus = "*", pocet_polozek = "*", kind = "*", error_txt = "*",}
	const enum GNacteniElVypisuResItemDtoTypes { guid = "string", por_cislo = "number", parentId = "number", nazev_souboru = "string", ixp = "string", cis_pid = "number", dat_nov_zus = "JsonDate", nov_zus = "JsonDecimal", pocet_polozek = "number", kind = "number", error_txt = "string",}
	const enum GNacteniElVypisuResItemDtoTypeLengths {}
	/**Dto s povolenými soubory pro načtení elektronického výpisu*/
	interface GNacteniElVypisuPovoleneSouboryDto {
		/**Znaky, které musí být v názvu souboru*/
		nazev?: string|null;
		/**Povolená koncovka souboru*/
		koncovka?: string|null;
	}
	const enum GNacteniElVypisuPovoleneSouboryDtoNames { nazev = "nazev", koncovka = "koncovka",}
	const enum GNacteniElVypisuPovoleneSouboryDtoFragments { nazev = "*", koncovka = "*",}
	const enum GNacteniElVypisuPovoleneSouboryDtoTypes { nazev = "string", koncovka = "string",}
	const enum GNacteniElVypisuPovoleneSouboryDtoTypeLengths {}
	/**Dto pro stažení výpisů pomocí WS ČNB a načtení elektronického výpisu*/
	interface GNacteniElVypisuWSCNBReqDto extends Gordic.Buc.Interface.GNacteniElVypisuKontrolaDto {
		/**Datum výpisu*/
		dat_vyp?: JsonDate|null;
		/**Dodatkový výpis*/
		rez_vyp?: number|null;
	}
	const enum GNacteniElVypisuWSCNBReqDtoNames { dat_vyp = "dat_vyp", rez_vyp = "rez_vyp", ico = "ico", ucs = "ucs", ixs_esu = "ixs_esu", sbu = "sbu", mod = "mod", for_dav = "for_dav", typ_tra_vyp = "typ_tra_vyp", dod_pri = "dod_pri", ikc = "ikc",}
	const enum GNacteniElVypisuWSCNBReqDtoFragments { dat_vyp = "*", rez_vyp = "*", ico = "*", ucs = "*", ixs_esu = "*", sbu = "*", mod = "*", for_dav = "*", typ_tra_vyp = "*", dod_pri = "*", ikc = "*",}
	const enum GNacteniElVypisuWSCNBReqDtoTypes { dat_vyp = "JsonDate", rez_vyp = "number", ico = "string", ucs = "string", ixs_esu = "string", sbu = "number", mod = "number", for_dav = "number", typ_tra_vyp = "number", dod_pri = "number", ikc = "Gordic.General.GIkc",}
	const enum GNacteniElVypisuWSCNBReqDtoTypeLengths { ico = 10, ucs = 10, ixs_esu = 12,}
	/**Dto pro kontrolu dat před načtení elektronického výpisu*/
	interface GNacteniElVypisuKontrolaDto {
		/**DBCOLUMN:bucspba.ico*/
		ico?: string|null;
		/**DBCOLUMN:bucspba.ucs*/
		ucs?: string|null;
		/**ID externího subjektu typu banka*/
		ixs_esu?: string|null;
		/**Skupina bankovních účtů*/
		sbu?: number|null;
		/**Mód (0-3)*/
		mod?: number|null;
		/**Formát dávky*/
		for_dav?: number|null;
		/**Typ výpisu*/
		typ_tra_vyp?: number|null;
		/**Dodatkové příkazy*/
		dod_pri?: number|null;
		/**Ikc*/
		ikc?: Gordic.General.GIkc|null;
	}
	const enum GNacteniElVypisuKontrolaDtoNames { ico = "ico", ucs = "ucs", ixs_esu = "ixs_esu", sbu = "sbu", mod = "mod", for_dav = "for_dav", typ_tra_vyp = "typ_tra_vyp", dod_pri = "dod_pri", ikc = "ikc",}
	const enum GNacteniElVypisuKontrolaDtoFragments { ico = "*", ucs = "*", ixs_esu = "*", sbu = "*", mod = "*", for_dav = "*", typ_tra_vyp = "*", dod_pri = "*", ikc = "*",}
	const enum GNacteniElVypisuKontrolaDtoTypes { ico = "string", ucs = "string", ixs_esu = "string", sbu = "number", mod = "number", for_dav = "number", typ_tra_vyp = "number", dod_pri = "number", ikc = "Gordic.General.GIkc",}
	const enum GNacteniElVypisuKontrolaDtoTypeLengths { ico = 10, ucs = 10, ixs_esu = 12,}
	/**Rozebraný výsledek volání API pro načtení výpisu PPF banky pro další zpracování*/
	interface GNacteniElVypisuPpfVysApiDto {
		/**Hash certifikátu uživatele*/
		hash_cer_usr?: string|null;
		/**payment_id*/
		payment_id?: string|null;
		/**status_id*/
		status_id?: string|null;
		/**status*/
		status?: string|null;
		/**error*/
		error?: string|null;
		/**message*/
		message?: string|null;
		/**validationErrors*/
		validationErrors?: string|null;
		/**account_count*/
		account_count?: number|null;
		/**balance_count*/
		balance_count?: number|null;
	}
	const enum GNacteniElVypisuPpfVysApiDtoNames { hash_cer_usr = "hash_cer_usr", payment_id = "payment_id", status_id = "status_id", status = "status", error = "error", message = "message", validationErrors = "validationErrors", account_count = "account_count", balance_count = "balance_count",}
	const enum GNacteniElVypisuPpfVysApiDtoFragments { hash_cer_usr = "*", payment_id = "*", status_id = "*", status = "*", error = "*", message = "*", validationErrors = "*", account_count = "*", balance_count = "*",}
	const enum GNacteniElVypisuPpfVysApiDtoTypes { hash_cer_usr = "string", payment_id = "string", status_id = "string", status = "string", error = "string", message = "string", validationErrors = "string", account_count = "number", balance_count = "number",}
	const enum GNacteniElVypisuPpfVysApiDtoTypeLengths {}
	/**Rozebraný výsledek volání API pro načtení výpisu PPF banky pro další zpracování*/
	interface GNacteniElVypisuPpfApiUcetVlDto {
		/**Dto s vlastním bankovním účtem*/
		ucetVl?: Gordic.Buc.Interface.GUcetVlDto|null;
		/**Datum zůstatku - účetní*/
		dat_zus_u?: JsonDate|null;
		/**ucet_id*/
		ucet_id?: string|null;
	}
	const enum GNacteniElVypisuPpfApiUcetVlDtoNames { ucetVl = "ucetVl", dat_zus_u = "dat_zus_u", ucet_id = "ucet_id",}
	const enum GNacteniElVypisuPpfApiUcetVlDtoFragments { ucetVl = "*", dat_zus_u = "*", ucet_id = "*",}
	const enum GNacteniElVypisuPpfApiUcetVlDtoTypes { ucetVl = "Gordic.Buc.Interface.GUcetVlDto", dat_zus_u = "JsonDate", ucet_id = "string",}
	const enum GNacteniElVypisuPpfApiUcetVlDtoTypeLengths {}
	/**Typ spuštění načítání elektronického výpisu pro asynchronní úlohu*/
	const enum GNacteniElVypisuAsyncType {
		File=0,
		API=1,
		WSCNB=2,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\Dto\GOcekavanoZBankyDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Očekáváno z banky dto*/
	interface GOcekavanoZBankyDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita
		*      Ekonomická aktivita
		*/
		eko_akt?: number|null;
		/**Identifikátor externího subjektu
		*      Subjekt, kterému půjde platba nebo se od něj očekává platba
		*/
		ixs_esu?: string|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Způsob platby
		*      Způsob platby, používá se k rozlišení jak bude uhrazena platba
		*/
		zp?: number|null;
		/**Agendové číslo
		*      Agendové číslo dokladu platby
		*/
		ac?: string|null;
		/**Stav předpisu platby*/
		s_uhrp?: number|null;
		/**Částka
		*      Částka předpisu platby v CZK
		*/
		c?: JsonDecimal|null;
		/**Částka spárované platby
		*      Částka spárované platby v CZK
		*/
		c_par?: JsonDecimal|null;
		/**Splatnost
		*      Datum splatnosti
		*/
		dat_spl?: JsonDate|null;
		/**Agenda
		*      Typ agendy
		*/
		typ_ag?: number|null;
		/**Částka v měně
		*      Částka platby v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Kategorie předpisu
		*      Kategorie účetního pohybu předpisu
		*/
		ktg_upo?: number|null;
		/**Řádek pohybu
		*      Řádek účtního pohybu ve FUC
		*/
		radek_upo?: number|null;
		/**Příznak nepárovat
		*      Předpis se nebude automaticky nepárovat
		*/
		priz_nepar?: number|null;
		/**Účtárna
		*      UUS - účtárna účetního střediska - UUS zpracující organizace
		*/
		uus?: string|null;
		/**Měna
		*      Kód měny platby
		*/
		mena?: number|null;
		/**Určení platby
		*      Určení typu platby
		*/
		upl?: number|null;
		/**Měna textově*/
		mena_txt?: string|null;
		/**Typ agendy zkratka*/
		typ_ag_zkr?: string|null;
		/**Určení platby zkratka*/
		upl_zkr?: string|null;
		/**Určení platby textově*/
		upl_txt?: string|null;
		/**Způsob platby zkratka*/
		zp_zkr?: string|null;
		/**Způsob platby textově*/
		zp_txt?: string|null;
		/**Stav předpisu platby zkratka*/
		s_uhrp_zkr?: string|null;
		/**Stav předpisu platby textově*/
		s_uhrp_txt?: string|null;
		/**IČO externího subjektu*/
		ico_esu?: string|null;
		/**Název subjektu
		*      Obsahuje obchodní jméno nebo součet příjmení a jména
		*/
		nazev?: string|null;
		/**Vlastní bankovní účet složený*/
		ucet_vl?: string|null;
		/**Cizí bankovní účet složený*/
		ucet_ci?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GOcekavanoZBankyPermissions|null;
	}
	const enum GOcekavanoZBankyDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", lic = "lic", eko_akt = "eko_akt", ixs_esu = "ixs_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", zp = "zp", ac = "ac", s_uhrp = "s_uhrp", c = "c", c_par = "c_par", dat_spl = "dat_spl", typ_ag = "typ_ag", c_mena = "c_mena", ktg_upo = "ktg_upo", radek_upo = "radek_upo", priz_nepar = "priz_nepar", uus = "uus", mena = "mena", upl = "upl", mena_txt = "mena_txt", typ_ag_zkr = "typ_ag_zkr", upl_zkr = "upl_zkr", upl_txt = "upl_txt", zp_zkr = "zp_zkr", zp_txt = "zp_txt", s_uhrp_zkr = "s_uhrp_zkr", s_uhrp_txt = "s_uhrp_txt", ico_esu = "ico_esu", nazev = "nazev", ucet_vl = "ucet_vl", ucet_ci = "ucet_ci", Permissions = "Permissions",}
	const enum GOcekavanoZBankyDtoFragments { ixp = "*", radek_uhr = "*", lic = "*", eko_akt = "*", ixs_esu = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", zp = "*", ac = "*", s_uhrp = "*", c = "*", c_par = "*", dat_spl = "*", typ_ag = "*", c_mena = "*", ktg_upo = "*", radek_upo = "*", priz_nepar = "*", uus = "*", mena = "*", upl = "*", mena_txt = "*", typ_ag_zkr = "*", upl_zkr = "*", upl_txt = "*", zp_zkr = "*", zp_txt = "*", s_uhrp_zkr = "*", s_uhrp_txt = "*", ico_esu = "*", nazev = "*", ucet_vl = "*", ucet_ci = "*", Permissions = "Permissions",}
	const enum GOcekavanoZBankyDtoTypes { ixp = "string", radek_uhr = "number", lic = "string", eko_akt = "number", ixs_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", zp = "number", ac = "string", s_uhrp = "number", c = "JsonDecimal", c_par = "JsonDecimal", dat_spl = "JsonDate", typ_ag = "number", c_mena = "JsonDecimal", ktg_upo = "number", radek_upo = "number", priz_nepar = "number", uus = "string", mena = "number", upl = "number", mena_txt = "string", typ_ag_zkr = "string", upl_zkr = "string", upl_txt = "string", zp_zkr = "string", zp_txt = "string", s_uhrp_zkr = "string", s_uhrp_txt = "string", ico_esu = "string", nazev = "string", ucet_vl = "string", ucet_ci = "string", Permissions = "Gordic.Buc.Interface.GOcekavanoZBankyPermissions",}
	const enum GOcekavanoZBankyDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ac = 20, uus = 10, ico_esu = 14, nazev = 100,}
	/**Dto primárních klíčů očekáváno z banky*/
	interface GOcekavanoZBankyPKDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
	}
	const enum GOcekavanoZBankyPKDtoNames { ixp = "ixp", radek_uhr = "radek_uhr",}
	const enum GOcekavanoZBankyPKDtoFragments { ixp = "*", radek_uhr = "*",}
	const enum GOcekavanoZBankyPKDtoTypes { ixp = "string", radek_uhr = "number",}
	const enum GOcekavanoZBankyPKDtoTypeLengths { ixp = 12,}
	/**Permissions pro práci s očekáváno z banky*/
	interface GOcekavanoZBankyPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno přidat/zaktivnit*/
		LzePridat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno vyjmout/zneaktivnit*/
		LzeVyjmout: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat/vrátit do agendy*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GOcekavanoZBankyPermissionsNames { LzePridat = "LzePridat", LzeVyjmout = "LzeVyjmout", LzeStornovat = "LzeStornovat",}
	const enum GOcekavanoZBankyPermissionsFragments { LzePridat = "*", LzeVyjmout = "*", LzeStornovat = "*",}
	const enum GOcekavanoZBankyPermissionsTypes { LzePridat = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmout = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GOcekavanoZBankyPermissionsTypeLengths {}
	/**Service Permissions pro práci s očekáváno z banky*/
	interface GOcekavanoZBankyServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno přidat/zaktivnit*/
		LzePridat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno vyjmout/zneaktivnit*/
		LzeVyjmout: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat/vrátit do agendy*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GOcekavanoZBankyServicePermissionsNames { LzePridat = "LzePridat", LzeVyjmout = "LzeVyjmout", LzeStornovat = "LzeStornovat",}
	const enum GOcekavanoZBankyServicePermissionsFragments { LzePridat = "*", LzeVyjmout = "*", LzeStornovat = "*",}
	const enum GOcekavanoZBankyServicePermissionsTypes { LzePridat = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmout = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GOcekavanoZBankyServicePermissionsTypeLengths {}
	/**Dto pro hromadné operace nad položkami očekáváno z banky*/
	interface GOcekavanoZBankyHromOperaceDto {
		/**Seznam položek*/
		keys?: Gordic.Buc.Interface.GOcekavanoZBankyPKDto[]|null;
	}
	const enum GOcekavanoZBankyHromOperaceDtoNames { keys = "keys",}
	const enum GOcekavanoZBankyHromOperaceDtoFragments { keys = "*",}
	const enum GOcekavanoZBankyHromOperaceDtoTypes { keys = "Gordic.Buc.Interface.GOcekavanoZBankyPKDto[]",}
	const enum GOcekavanoZBankyHromOperaceDtoTypeLengths {}
	/**Dto pro hromadné storno nad položkami očekáváno z banky*/
	interface GOcekavanoZBankyHromStornoDto {
		/**Seznam položek*/
		keys?: Gordic.Buc.Interface.GOcekavanoZBankyPKDto[]|null;
		/**Příznak chování u složenek B (0 (default) - opětovné generování dávky, 1 - vrácení do agendy - stornovat) - bráno v potaz pouze u adekvátních položek*/
		slozenkyB?: number|null;
		/**Příznak chování u hotovosti zadané externím systémem (0 (default) - stav nevyzvednuto, 1 - stav storno) - bráno v potaz pouze u adekvátních položek*/
		hotovostExtSystem?: number|null;
	}
	const enum GOcekavanoZBankyHromStornoDtoNames { keys = "keys", slozenkyB = "slozenkyB", hotovostExtSystem = "hotovostExtSystem",}
	const enum GOcekavanoZBankyHromStornoDtoFragments { keys = "*", slozenkyB = "*", hotovostExtSystem = "*",}
	const enum GOcekavanoZBankyHromStornoDtoTypes { keys = "Gordic.Buc.Interface.GOcekavanoZBankyPKDto[]", slozenkyB = "number", hotovostExtSystem = "number",}
	const enum GOcekavanoZBankyHromStornoDtoTypeLengths {}
	/**Dto s FROM a WHERE pro tisk očekáváno z banky*/
	interface GOcekavanoZBankyTiskFromWhereDto {
		/**FROM část SQL dotazu*/
		from?: string|null;
		/**WHERE část SQL dotazu*/
		where?: string|null;
	}
	const enum GOcekavanoZBankyTiskFromWhereDtoNames { from = "from", where = "where",}
	const enum GOcekavanoZBankyTiskFromWhereDtoFragments { from = "*", where = "*",}
	const enum GOcekavanoZBankyTiskFromWhereDtoTypes { from = "string", where = "string",}
	const enum GOcekavanoZBankyTiskFromWhereDtoTypeLengths {}
	/**Filtr seznamu očekáváno z banky*/
	interface GOcekavanoZBankyFilterDto {
		/**ixp*/
		ixp?: string|null;
		/**radek_uhr*/
		radek_uhr?: number|null;
		/**sk_vl*/
		sk_vl?: GBaseFilter<string>|null;
		/**bu_vl*/
		bu_vl?: GBaseFilter<string>|null;
		/**sk_ci*/
		sk_ci?: GBaseFilter<string>|null;
		/**bu_vl*/
		bu_ci?: GBaseFilter<string>|null;
		/**c*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**c_par*/
		c_par?: GIntervalDto<JsonDecimal>|null;
		/**dat_spl*/
		dat_spl?: GIntervalDto<JsonDate>|null;
		/**vs*/
		vs?: GIntervalDto<string>|null;
		/**ks*/
		ks?: GIntervalDto<string>|null;
		/**ss*/
		ss?: GIntervalDto<string>|null;
		/**mena*/
		mena?: GBaseFilter<number>|null;
		/**c_mena*/
		c_mena?: GIntervalDto<JsonDecimal>|null;
		/**nazev*/
		nazev?: GIntervalDto<string>|null;
		/**typ_ag*/
		typ_ag?: GBaseFilter<number>|null;
		/**eko_akt*/
		eko_akt?: GBaseFilter<number>|null;
	}
	const enum GOcekavanoZBankyFilterDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", c = "c", c_par = "c_par", dat_spl = "dat_spl", vs = "vs", ks = "ks", ss = "ss", mena = "mena", c_mena = "c_mena", nazev = "nazev", typ_ag = "typ_ag", eko_akt = "eko_akt",}
	const enum GOcekavanoZBankyFilterDtoFragments { ixp = "*", radek_uhr = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", c = "*", c_par = "*", dat_spl = "*", vs = "*", ks = "*", ss = "*", mena = "*", c_mena = "*", nazev = "*", typ_ag = "*", eko_akt = "*",}
	const enum GOcekavanoZBankyFilterDtoTypes { ixp = "string", radek_uhr = "number", sk_vl = "GBaseFilter<string>", bu_vl = "GBaseFilter<string>", sk_ci = "GBaseFilter<string>", bu_ci = "GBaseFilter<string>", c = "GIntervalDto<JsonDecimal>", c_par = "GIntervalDto<JsonDecimal>", dat_spl = "GIntervalDto<JsonDate>", vs = "GIntervalDto<string>", ks = "GIntervalDto<string>", ss = "GIntervalDto<string>", mena = "GBaseFilter<number>", c_mena = "GIntervalDto<JsonDecimal>", nazev = "GIntervalDto<string>", typ_ag = "GBaseFilter<number>", eko_akt = "GBaseFilter<number>",}
	const enum GOcekavanoZBankyFilterDtoTypeLengths {}
	/**Dto s parametry pro tisk očekáváno z banky*/
	interface GOcekavanoZBankyTiskParamsDto {
		/**filter*/
		filters?: Gordic.Buc.Interface.GOcekavanoZBankyFilterDto|null;
		/**Maska textově*/
		maskaText?: string|null;
	}
	const enum GOcekavanoZBankyTiskParamsDtoNames { filters = "filters", maskaText = "maskaText",}
	const enum GOcekavanoZBankyTiskParamsDtoFragments { filters = "*", maskaText = "*",}
	const enum GOcekavanoZBankyTiskParamsDtoTypes { filters = "Gordic.Buc.Interface.GOcekavanoZBankyFilterDto", maskaText = "string",}
	const enum GOcekavanoZBankyTiskParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\Dto\Gordic.Buc.GBanVypisDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro BanVypis*/
	interface GBanVypisDto {
		/**ixp*/
		ixp?: string|null;
		/**lic*/
		lic?: string|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**nks*/
		nks?: string|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**ac*/
		ac?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**bu_txt_vl*/
		bu_txt_vl?: string|null;
		/**dat_str_zus*/
		dat_str_zus?: JsonDate|null;
		/**str_zus*/
		str_zus?: JsonDecimal|null;
		/**dat_nov_zus*/
		dat_nov_zus?: JsonDate|null;
		/**nov_zus*/
		nov_zus?: JsonDecimal|null;
		/**obr_deb*/
		obr_deb?: JsonDecimal|null;
		/**obr_kre*/
		obr_kre?: JsonDecimal|null;
		/**rok_pid*/
		rok_pid?: number|null;
		/**cis_pid*/
		cis_pid?: number|null;
		/**ozn_dav*/
		ozn_dav?: string|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**eko_akt*/
		eko_akt?: number|null;
		/**dat_evid*/
		dat_evid?: JsonDate|null;
		/**s_bvy*/
		s_bvy?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**cis_pid_e*/
		cis_pid_e?: number|null;
		/**priz_view*/
		priz_view?: number|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**c_bil*/
		c_bil?: JsonDecimal|null;
		/**c_limdz*/
		c_limdz?: JsonDecimal|null;
		/**c_rez*/
		c_rez?: JsonDecimal|null;
		/**typ_vypis*/
		typ_vypis?: number|null;
		/**ixp_txt*/
		ixp_txt?: string|null;
		/**ixp_den_txt*/
		ixp_den_txt?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**priz_view_txt*/
		priz_view_txt?: string|null;
		/**s_bvy_txt*/
		s_bvy_txt?: string|null;
		/**typ_vypis_txt*/
		typ_vypis_txt?: string|null;
	}
	const enum GBanVypisDtoNames { ixp = "ixp", lic = "lic", ico = "ico", ucs = "ucs", nks = "nks", ixp_den = "ixp_den", ac = "ac", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", dat_str_zus = "dat_str_zus", str_zus = "str_zus", dat_nov_zus = "dat_nov_zus", nov_zus = "nov_zus", obr_deb = "obr_deb", obr_kre = "obr_kre", rok_pid = "rok_pid", cis_pid = "cis_pid", ozn_dav = "ozn_dav", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", s_bvy = "s_bvy", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", dat_mpd = "dat_mpd", ixs_fun_akt = "ixs_fun_akt", ixs_esu = "ixs_esu", cis_pid_e = "cis_pid_e", priz_view = "priz_view", ac_ag = "ac_ag", c_bil = "c_bil", c_limdz = "c_limdz", c_rez = "c_rez", typ_vypis = "typ_vypis", ixp_txt = "ixp_txt", ixp_den_txt = "ixp_den_txt", ixs_typ_txt = "ixs_typ_txt", priz_view_txt = "priz_view_txt", s_bvy_txt = "s_bvy_txt", typ_vypis_txt = "typ_vypis_txt",}
	const enum GBanVypisDtoFragments { ixp = "main", lic = "main", ico = "main", ucs = "main", nks = "main", ixp_den = "main", ac = "main", sk_vl = "main", bu_vl = "main", bu_txt_vl = "main", dat_str_zus = "main", str_zus = "main", dat_nov_zus = "main", nov_zus = "main", obr_deb = "main", obr_kre = "main", rok_pid = "main", cis_pid = "main", ozn_dav = "main", ktg_typ = "main", ixs_typ = "main", eko_akt = "main", dat_evid = "main", s_bvy = "main", dat_zmena = "main", zmenu_prov = "main", dat_mpd = "main", ixs_fun_akt = "main", ixs_esu = "main", cis_pid_e = "main", priz_view = "main", ac_ag = "main", c_bil = "main", c_limdz = "main", c_rez = "main", typ_vypis = "main", ixp_txt = "ixp_txt", ixp_den_txt = "ixp_den_txt", ixs_typ_txt = "ixs_typ_txt", priz_view_txt = "priz_view_txt", s_bvy_txt = "s_bvy_txt", typ_vypis_txt = "typ_vypis_txt",}
	const enum GBanVypisDtoTypes { ixp = "string", lic = "string", ico = "string", ucs = "string", nks = "string", ixp_den = "string", ac = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", dat_str_zus = "JsonDate", str_zus = "JsonDecimal", dat_nov_zus = "JsonDate", nov_zus = "JsonDecimal", obr_deb = "JsonDecimal", obr_kre = "JsonDecimal", rok_pid = "number", cis_pid = "number", ozn_dav = "string", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", s_bvy = "number", dat_zmena = "JsonDate", zmenu_prov = "string", dat_mpd = "JsonDate", ixs_fun_akt = "string", ixs_esu = "string", cis_pid_e = "number", priz_view = "number", ac_ag = "string", c_bil = "JsonDecimal", c_limdz = "JsonDecimal", c_rez = "JsonDecimal", typ_vypis = "number", ixp_txt = "string", ixp_den_txt = "string", ixs_typ_txt = "string", priz_view_txt = "string", s_bvy_txt = "string", typ_vypis_txt = "string",}
	const enum GBanVypisDtoTypeLengths { ixp = 12, lic = 4, ico = 10, ucs = 10, nks = 12, ixp_den = 12, ac = 20, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46, ozn_dav = 254, ixs_typ = 12, zmenu_prov = 12, ixs_fun_akt = 12, ixs_esu = 12, ac_ag = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\Dto\GParovanoDetailDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto s detailem platby na kterou byla párována položka výpisu*/
	interface GParovanoDetailDto {
		/**Identifikátor*/
		ixp_par?: string|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**Agendové číslo*/
		ac_ag?: string|null;
		/**Název*/
		nazev?: string|null;
		/**Způsob platby*/
		zp?: number|null;
		/**Variabilní symbol*/
		vs?: string|null;
		/**Částka*/
		c?: JsonDecimal|null;
		/**Částka párování*/
		c_par?: JsonDecimal|null;
		/**Datum splatnosti*/
		dat_spl?: JsonDate|null;
		/**Datum zaplacení*/
		dat_zap?: JsonDate|null;
		/**Datum párování*/
		dat_par?: JsonDate|null;
		/**IČO*/
		ico?: string|null;
		/**Textová zkratka agendy*/
		zkr_ag?: string|null;
		/**Textová zkratka způsobu úhrady*/
		zkr_zp?: string|null;
		/**Ktg typ dokladu (UCT, FUC)*/
		ktg_typ?: number|null;
		/**Stav zaúčtování (UCT, FUC)*/
		s_zau?: number|null;
		/**Řádek položky bankovního výpisu*/
		radek_pol?: number|null;
		/**Subřádek položky bankovního výpisu*/
		subradek?: number|null;
		/**Řádek AV - řádek rozpisu položky bankovního výpisu*/
		radek_av?: number|null;
		/**Den*/
		den?: number|null;
		/**Měsíc*/
		mesic?: number|null;
		/**Rok*/
		rok?: number|null;
	}
	const enum GParovanoDetailDtoNames { ixp_par = "ixp_par", typ_ag = "typ_ag", ac_ag = "ac_ag", nazev = "nazev", zp = "zp", vs = "vs", c = "c", c_par = "c_par", dat_spl = "dat_spl", dat_zap = "dat_zap", dat_par = "dat_par", ico = "ico", zkr_ag = "zkr_ag", zkr_zp = "zkr_zp", ktg_typ = "ktg_typ", s_zau = "s_zau", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", den = "den", mesic = "mesic", rok = "rok",}
	const enum GParovanoDetailDtoFragments { ixp_par = "*", typ_ag = "*", ac_ag = "*", nazev = "*", zp = "*", vs = "*", c = "*", c_par = "*", dat_spl = "*", dat_zap = "*", dat_par = "*", ico = "*", zkr_ag = "*", zkr_zp = "*", ktg_typ = "*", s_zau = "*", radek_pol = "*", subradek = "*", radek_av = "*", den = "*", mesic = "*", rok = "*",}
	const enum GParovanoDetailDtoTypes { ixp_par = "string", typ_ag = "number", ac_ag = "string", nazev = "string", zp = "number", vs = "string", c = "JsonDecimal", c_par = "JsonDecimal", dat_spl = "JsonDate", dat_zap = "JsonDate", dat_par = "JsonDate", ico = "string", zkr_ag = "string", zkr_zp = "string", ktg_typ = "number", s_zau = "number", radek_pol = "number", subradek = "number", radek_av = "number", den = "number", mesic = "number", rok = "number",}
	const enum GParovanoDetailDtoTypeLengths {}
	/**Vstupní dto pro načtení detailu platby na kterou byla párována položka výpisu*/
	interface GParovanoDetailReadReqDto {
		/**Identifikátor*/
		ixp_par?: string|null;
		/**Stav položky*/
		s_pol?: number|null;
		/**Číslo řádku napárovaného dokladu*/
		cislo_par?: number|null;
	}
	const enum GParovanoDetailReadReqDtoNames { ixp_par = "ixp_par", s_pol = "s_pol", cislo_par = "cislo_par",}
	const enum GParovanoDetailReadReqDtoFragments { ixp_par = "*", s_pol = "*", cislo_par = "*",}
	const enum GParovanoDetailReadReqDtoTypes { ixp_par = "string", s_pol = "number", cislo_par = "number",}
	const enum GParovanoDetailReadReqDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypis\Dto\GParovanoHistorieDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto s historií párování položky výpisu*/
	interface GParovanoHistorieDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		radek_pol?: number|null;
		subradek?: number|null;
		radek_av?: number|null;
		ixp_par?: string|null;
		cislo_par?: number|null;
		s_pol?: number|null;
		/**Název*/
		nazev?: string|null;
		dat_zap?: JsonDate|null;
		dat_par?: JsonDate|null;
		/**VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		vs?: string|null;
		/**KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		ks?: string|null;
		/**SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		ss?: string|null;
		/**Cena*/
		c?: JsonDecimal|null;
		dat_uhr?: JsonDate|null;
		/**Interní ID zásilky*/
		por_cislo?: number|null;
		dat_odp?: JsonDate|null;
		/**Kód měny dle ekocmen*/
		mena?: number|null;
		c_mena?: JsonDecimal|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**Textová reprezentace měny*/
		mena_zkr?: string|null;
		/**Textová reprezetace typu agendy*/
		typ_ag_zkr?: string|null;
		/**Textová reprezentace externího subjektu*/
		esu_txt?: string|null;
		/**ICO externího subjektu*/
		ico_esu?: string|null;
		/**Popis z agendy UCT*/
		uct_popis?: string|null;
		/**Zkratka aktuálního stavu položky výpisu*/
		s_pol_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu položky výpisu*/
		s_pol_txt?: string|null;
	}
	const enum GParovanoHistorieDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", ixp_par = "ixp_par", cislo_par = "cislo_par", s_pol = "s_pol", nazev = "nazev", dat_zap = "dat_zap", dat_par = "dat_par", vs = "vs", ks = "ks", ss = "ss", c = "c", dat_uhr = "dat_uhr", por_cislo = "por_cislo", dat_odp = "dat_odp", mena = "mena", c_mena = "c_mena", typ_ag = "typ_ag", uus = "uus", mena_zkr = "mena_zkr", typ_ag_zkr = "typ_ag_zkr", esu_txt = "esu_txt", ico_esu = "ico_esu", uct_popis = "uct_popis", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_txt",}
	const enum GParovanoHistorieDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", ixp_par = "*", cislo_par = "*", s_pol = "*", nazev = "*", dat_zap = "*", dat_par = "*", vs = "*", ks = "*", ss = "*", c = "*", dat_uhr = "*", por_cislo = "*", dat_odp = "*", mena = "*", c_mena = "*", typ_ag = "*", uus = "*", mena_zkr = "*", typ_ag_zkr = "*", esu_txt = "*", ico_esu = "*", uct_popis = "*", s_pol_zkr = "*", s_pol_txt = "*",}
	const enum GParovanoHistorieDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", ixp_par = "string", cislo_par = "number", s_pol = "number", nazev = "string", dat_zap = "JsonDate", dat_par = "JsonDate", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", dat_uhr = "JsonDate", por_cislo = "number", dat_odp = "JsonDate", mena = "number", c_mena = "JsonDecimal", typ_ag = "number", uus = "string", mena_zkr = "string", typ_ag_zkr = "string", esu_txt = "string", ico_esu = "string", uct_popis = "string", s_pol_zkr = "string", s_pol_txt = "string",}
	const enum GParovanoHistorieDtoTypeLengths { ixp = 12, ixp_par = 12, nazev = 160, vs = 12, ks = 12, ss = 12, uus = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypisPolozka\IGBankovniVypisPolozka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Bankovní výpisy položky - bucdpol
	* @domain Banka
	*/
	interface BucBankovniVypisPolozka {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaUpsertReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaUpsertReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaUpsertReqDto>,GServiceSaveResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Hromadné odstranění položek bankovního výpisu*/
		massDelete(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaMassDeleteReqDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaMassDeleteReqDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaMassDeleteReqDto>,void>;
		/**Seznam valutový obratů položek bankovního výpisu*/
		valutoveObraty(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GValutoveObratyDto>>;
		/**Kontrola položek před zaúčtováním*/
		zkontrolujPredZauctovanim(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Hromadné zaúčtování položek*/
		hromadneZauctovat(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Kontrola položek před Storno / Nespárovaná*/
		zkontrolujPredStornoNesparovana(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Hromadné Storno / Nespárovaná*/
		hromadneStornoNesparovana(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Kontrola položek před odpárováním*/
		zkontrolujPredOdparovanim(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaHromZauctovaniDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromZauctovaniDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromZauctovaniDto>,GServiceGroupResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Hromadné odpárování položek*/
		hromadneOdparovat(rq?:Gordic.Buc.Interface.GBankovniVypisPolozkaHromZauctovaniDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromZauctovaniDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankovniVypisPolozkaHromZauctovaniDto>,GServiceGroupResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaDto>>;
		/**Seznam otevřených období (roků) pro přepárování položky bankovního výpisu z uzavřeného období*/
		otevreneRokyProPreparovani(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GBankovniVypisPolozkaOtevreneRokyDto[]>;
		/**Vrátí oprávnění položek bankovních výpisů (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GBankovniVypisPolozkyServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucBankovniVypisPolozka: ServiceBase & Catalog.BucBankovniVypisPolozka;
	}
	const BucBankovniVypisPolozka: Client["BucBankovniVypisPolozka"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu položek bankovních výpisů*/
	const enum GBankovniVypisPolozkaFilter {
		/**PID výpisu*/
		ixp,
		/**řádek položky výpisu*/
		radek_pol,
		/**subřádek položky výpisu*/
		subradek,
		/**řádek rozpisu položky výpisu*/
		radek_av,
		/**Var.symbol*/
		vs,
		/**Spec.symbol*/
		ss,
		/**Konst.symbol*/
		ks,
		/**Částka*/
		c,
		/**Dat.zaplacení*/
		dat_zap,
		/**Popis*/
		popis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypisPolozka\IGBankovniVypisPolozkaVyhledavani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Vyhledávání položek bankovních výpisů
	* @domain Banka
	*/
	interface BucBankovniVypisPolozkaVyhledavani {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GBankovniVypisPolozkaVyhledavaniDto>>;
		/**Vrátí oprávnění vyhledávání položek bankovních výpisů (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GBankovniVypisPolozkyVyhledavaniServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucBankovniVypisPolozkaVyhledavani: ServiceBase & Catalog.BucBankovniVypisPolozkaVyhledavani;
	}
	const BucBankovniVypisPolozkaVyhledavani: Client["BucBankovniVypisPolozkaVyhledavani"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu vyhledávání položek bankovních výpisů*/
	const enum GBankovniVypisPolozkaVyhledavaniFilter {
		/**PID výpisu*/
		ixp,
		/**řádek položky výpisu*/
		radek_pol,
		/**subřádek položky výpisu*/
		subradek,
		/**řádek rozpisu položky výpisu*/
		radek_av,
		/**Var.symbol*/
		vs,
		/**Spec.symbol*/
		ss,
		/**Konst.symbol*/
		ks,
		/**Kód banky cizí*/
		sk_ci,
		/**Bankovní účet cizí*/
		bu_ci,
		/**Kód banky vlastní*/
		sk_vl,
		/**Bankovní účet vlastní*/
		bu_vl,
		/**Částka*/
		c,
		/**Název*/
		nazev,
		/**Spárované-Nezaúčtované*/
		spNezau,
		/**Stav položky*/
		s_pol,
		/**Rozpis*/
		roz_vyh,
		/**Datum zaplacení*/
		dat_zap,
		/**Datum nového zůstatku*/
		dat_nov_zus,
		/**Vyhledat za všechny roky*/
		vyh_roky,
		/**ikc*/
		ikc,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypisPolozka\Dto\GBankovniVypisPolozkaDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucdpol
	*      Položky bankovních výpisů
	*/
	interface GBankovniVypisPolozkaDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Ekonomická aktivita*/
		eko_akt?: number|null;
		/**Identifikátor napárovaného dokladu
		*      Identifikátor předpisu platby, na který je řádek výpisu napárován
		*/
		ixp_par?: string|null;
		/**Číslo řádku napárovaného dokladu
		*      Číslo řádku předpisu napárovaného dokladu
		*/
		cislo_par?: number|null;
		/**Stav položky
		*      Stav položky ban.výpisu
		*/
		s_pol?: number|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Vlasní bankovní účet
		*      Tvar bankovního účtu se směrovým kódem banky
		*/
		bu_txt_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Bankovní účet cizí
		*      Tvar bankovního účtu se směrovým kódem banky
		*/
		bu_txt_ci?: string|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Datum párování
		*      Datum párování položky výpisu - transakce
		*/
		dat_par?: JsonDate|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Částka párovaná
		*      Částka párované platby-transakce
		*/
		c_par?: JsonDecimal|null;
		/**Číslo bankovního dokladu
		*      Číslo bankovního dokladu
		*/
		cis_bdo?: string|null;
		/**Kód banky
		*      Kód banky-kód účtování
		*/
		kod_ban?: number|null;
		/**Kód dat
		*      Druh dat
		*/
		kod_dat?: number|null;
		/**Kód změny
		*      Kód změny položky
		*/
		kod_zme?: number|null;
		/**Datum valuta
		*      Datum, je-li uvedeno, ke kterému se započítává položka z hlediska výpočtu úroků
		*/
		dat_val?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Způsob úhrady
		*      Způsob úhrady položky-transakce
		*/
		zu?: number|null;
		/**Datum UUP
		*      Datum uskutečnění účetního případu
		*/
		dat_uhr?: JsonDate|null;
		/**Identifikátor POK
		*      Identifikátor POK dokladu / transakce platební brány
		*/
		ixp_pok?: string|null;
		/**identifikátor hotovostní platby*/
		ixp_hpl?: string|null;
		/**Řádek účetního pohybu
		*      Řádek účetního pohybu v agendě FUC
		*/
		radek_upo?: number|null;
		/**VS - protistrany
		*      VS - protistrany
		*/
		vs2?: string|null;
		/**SS - protistrany
		*      SS - protistrany
		*/
		ss2?: string|null;
		/**Datum odpárování
		*      Datum odpárování položky-transakce
		*/
		dat_odp?: JsonDate|null;
		/**Datum odepsání z protiúčtu
		*      Datum odepsání v jiném peněžním ústavu
		*/
		dat_ode?: JsonDate|null;
		/**Určení platby
		*      Určení platby
		*/
		upl?: number|null;
		/**Měna*/
		mena?: number|null;
		/**Částka v měně
		*      Částka v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Kurz
		*      Kurz měny
		*/
		kurz?: JsonDecimal|null;
		/**Částka poplatků
		*      Částka poplatků bankovní transakce
		*/
		c_pop?: JsonDecimal|null;
		/**Měna poplatků
		*      Měna poplatků
		*/
		mena_pop?: number|null;
		/**Částka poplatků v měně
		*      Částka poplatků v měně
		*/
		c_pop_mena?: JsonDecimal|null;
		/**BIC
		*      BIC/SWIFT
		*/
		bic?: string|null;
		/**Částka párovaná v měně
		*      Částka párované platby v měně
		*/
		c_par_mena?: JsonDecimal|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**Datum položky
		*      Datum položky výpisu-transakce
		*/
		dat_pol?: JsonDate|null;
		/**Doplňkový popis
		*      Pokud popis položky přesáhne délku pole Veřejný popis, je zbytek pole zapsán do Doplňkový popis
		*/
		popis1?: string|null;
		/**Identifikátor BPL agendy
		*      Označení dokladu BPL pro úrok z prodlení k pohledávce
		*/
		ixp_bpl?: string|null;
		/**Příznak účtování hotovostních plateb*/
		uhp?: number|null;
		/**Účtárna
		*      UUS - účtárna účetního střediska - UUS zpracující organizace
		*/
		uus?: string|null;
		/**Pokyn
		*      Pokyn k likvidaci nespárované položky do FUC
		*/
		pokyn?: string|null;
		/**Kód zaúčtování
		*      Kód zaúčtování položky-transakce v bance
		*/
		kod_zau?: number|null;
		/**Identifikátor transakce
		*       Identifikátor transakce v bankovním systému
		*/
		tra_id?: string|null;
		/**Příznak nepárovar
		*      Příznak nepárovar
		*/
		priz_nepar?: number|null;
		/**Měna - textově*/
		mena_txt?: string|null;
		/**Počet nespárovaných položek výpisu*/
		poc_nes_roz?: number|null;
		/**Příznak nepárovar*/
		s_zau?: number|null;
		/**ac_uct - ???*/
		ac_uct?: string|null;
		/**Zkratka aktuálního stavu položky výpisu*/
		s_pol_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu položky výpisu*/
		s_pol_txt?: string|null;
		/**Zkratka aktuálního stavu zaúčtování*/
		s_zau_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu zaúčtování*/
		s_zau_txt?: string|null;
		/**Textově způsob úhrady*/
		zu_txt?: string|null;
		/**Stav rozpisu pro grid (0-neni rozpis, 1-rozpis vyrovnán, 2-rozpis nevyrovnán)*/
		sr_column?: number|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GBankovniVypisPolozkyPermissions|null;
	}
	const enum GBankovniVypisPolozkaDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", lic = "lic", eko_akt = "eko_akt", ixp_par = "ixp_par", cislo_par = "cislo_par", s_pol = "s_pol", nazev = "nazev", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_txt_ci = "bu_txt_ci", dat_zap = "dat_zap", dat_par = "dat_par", vs = "vs", ks = "ks", ss = "ss", c = "c", c_par = "c_par", cis_bdo = "cis_bdo", kod_ban = "kod_ban", kod_dat = "kod_dat", kod_zme = "kod_zme", dat_val = "dat_val", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zu = "zu", dat_uhr = "dat_uhr", ixp_pok = "ixp_pok", ixp_hpl = "ixp_hpl", radek_upo = "radek_upo", vs2 = "vs2", ss2 = "ss2", dat_odp = "dat_odp", dat_ode = "dat_ode", upl = "upl", mena = "mena", c_mena = "c_mena", kurz = "kurz", c_pop = "c_pop", mena_pop = "mena_pop", c_pop_mena = "c_pop_mena", bic = "bic", c_par_mena = "c_par_mena", typ_ag = "typ_ag", dat_pol = "dat_pol", popis1 = "popis1", ixp_bpl = "ixp_bpl", uhp = "uhp", uus = "uus", pokyn = "pokyn", kod_zau = "kod_zau", tra_id = "tra_id", priz_nepar = "priz_nepar", mena_txt = "mena_txt", poc_nes_roz = "poc_nes_roz", s_zau = "s_zau", ac_uct = "ac_uct", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_txt", s_zau_zkr = "s_zau_zkr", s_zau_txt = "s_zau_txt", zu_txt = "zu_txt", sr_column = "sr_column", Permissions = "Permissions",}
	const enum GBankovniVypisPolozkaDtoFragments { ixp = "Base", radek_pol = "Base", subradek = "Base", radek_av = "Base", lic = "Base", eko_akt = "Base", ixp_par = "Base", cislo_par = "Base", s_pol = "Base", nazev = "Base", sk_vl = "Base", bu_vl = "Base", bu_txt_vl = "Base", sk_ci = "Base", bu_ci = "Base", bu_txt_ci = "Base", dat_zap = "Base", dat_par = "Base", vs = "Base", ks = "Base", ss = "Base", c = "Base", c_par = "Base", cis_bdo = "Base", kod_ban = "Base", kod_dat = "Base", kod_zme = "Base", dat_val = "Base", dat_zmena = "Base", zmenu_prov = "Base", zu = "Base", dat_uhr = "Base", ixp_pok = "Base", ixp_hpl = "Base", radek_upo = "Base", vs2 = "Base", ss2 = "Base", dat_odp = "Base", dat_ode = "Base", upl = "Base", mena = "Base", c_mena = "Base", kurz = "Base", c_pop = "Base", mena_pop = "Base", c_pop_mena = "Base", bic = "Base", c_par_mena = "Base", typ_ag = "Base", dat_pol = "Base", popis1 = "Base", ixp_bpl = "Base", uhp = "Base", uus = "Base", pokyn = "Base", kod_zau = "Base", tra_id = "Base", priz_nepar = "Base", mena_txt = "Base", poc_nes_roz = "Base", s_zau = "Base", ac_uct = "Base", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_zkr", s_zau_zkr = "typ_vypis_zkr", s_zau_txt = "typ_vypis_zkr", zu_txt = "zu_txt", sr_column = "Base", Permissions = "Permissions",}
	const enum GBankovniVypisPolozkaDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", lic = "string", eko_akt = "number", ixp_par = "string", cislo_par = "number", s_pol = "number", nazev = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", sk_ci = "string", bu_ci = "string", bu_txt_ci = "string", dat_zap = "JsonDate", dat_par = "JsonDate", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", c_par = "JsonDecimal", cis_bdo = "string", kod_ban = "number", kod_dat = "number", kod_zme = "number", dat_val = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zu = "number", dat_uhr = "JsonDate", ixp_pok = "string", ixp_hpl = "string", radek_upo = "number", vs2 = "string", ss2 = "string", dat_odp = "JsonDate", dat_ode = "JsonDate", upl = "number", mena = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", c_pop = "JsonDecimal", mena_pop = "number", c_pop_mena = "JsonDecimal", bic = "string", c_par_mena = "JsonDecimal", typ_ag = "number", dat_pol = "JsonDate", popis1 = "string", ixp_bpl = "string", uhp = "number", uus = "string", pokyn = "string", kod_zau = "number", tra_id = "string", priz_nepar = "number", mena_txt = "string", poc_nes_roz = "number", s_zau = "number", ac_uct = "string", s_pol_zkr = "string", s_pol_txt = "string", s_zau_zkr = "string", s_zau_txt = "string", zu_txt = "string", sr_column = "number", Permissions = "Gordic.Buc.Interface.GBankovniVypisPolozkyPermissions",}
	const enum GBankovniVypisPolozkaDtoTypeLengths { ixp = 12, lic = 4, ixp_par = 12, nazev = 160, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46, sk_ci = 11, bu_ci = 34, bu_txt_ci = 46, vs = 12, ks = 12, ss = 12, cis_bdo = 30, zmenu_prov = 12, ixp_pok = 12, ixp_hpl = 12, vs2 = 12, ss2 = 12, bic = 20, popis1 = 254, ixp_bpl = 12, uus = 10, pokyn = 254, tra_id = 254,}
	/**Permissions pro práci s položkami bankovního výpisu*/
	interface GBankovniVypisPolozkyPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno podat novou položku bankovního výpisu*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat položku bankovního výpisu*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit detailu párované platby položky bankovního výpisu*/
		LzeParovanoDetail: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit účetní zápisy položky bankovního výpisu*/
		LzeUcetniZapisy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit rozpis položek bankovního výpisu*/
		LzeRozpisPolozek: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankovniVypisPolozkyPermissionsNames { LzePodat = "LzePodat", LzeEditovat = "LzeEditovat", LzeParovanoDetail = "LzeParovanoDetail", LzeUcetniZapisy = "LzeUcetniZapisy", LzeRozpisPolozek = "LzeRozpisPolozek",}
	const enum GBankovniVypisPolozkyPermissionsFragments { LzePodat = "*", LzeEditovat = "*", LzeParovanoDetail = "*", LzeUcetniZapisy = "*", LzeRozpisPolozek = "*",}
	const enum GBankovniVypisPolozkyPermissionsTypes { LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeParovanoDetail = "Gordic.General.ApplicationInterface.GPermission", LzeUcetniZapisy = "Gordic.General.ApplicationInterface.GPermission", LzeRozpisPolozek = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankovniVypisPolozkyPermissionsTypeLengths {}
	/**Service Permissions pro práci s položkami bankovního výpisu*/
	interface GBankovniVypisPolozkyServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno podat novou položku bankovního výpisu*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno editovat položku bankovního výpisu*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zaúčtovat položky bankovního výpisu*/
		LzeZauctovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Storno/Nespárovaná položek bankovního výpisu*/
		LzeStornoNesparovana: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno odpárovat položky bankovního výpisu*/
		LzeOdparovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankovniVypisPolozkyServicePermissionsNames { LzePodat = "LzePodat", LzeEditovat = "LzeEditovat", LzeZauctovat = "LzeZauctovat", LzeStornoNesparovana = "LzeStornoNesparovana", LzeOdparovat = "LzeOdparovat",}
	const enum GBankovniVypisPolozkyServicePermissionsFragments { LzePodat = "*", LzeEditovat = "*", LzeZauctovat = "*", LzeStornoNesparovana = "*", LzeOdparovat = "*",}
	const enum GBankovniVypisPolozkyServicePermissionsTypes { LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeZauctovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornoNesparovana = "Gordic.General.ApplicationInterface.GPermission", LzeOdparovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankovniVypisPolozkyServicePermissionsTypeLengths {}
	/**Dto request pro vytvoření/aktualizování položek bankovního výpisu*/
	interface GBankovniVypisPolozkaUpsertReqDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Měna*/
		mena?: number|null;
		/**Částka v měně
		*      Částka v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**Doplňkový popis
		*      Pokud popis položky přesáhne délku pole Veřejný popis, je zbytek pole zapsán do Doplňkový popis
		*/
		popis1?: string|null;
		/**Datum valuta
		*      Datum, je-li uvedeno, ke kterému se započítává položka z hlediska výpočtu úroků
		*/
		dat_val?: JsonDate|null;
		/**VS - protistrany
		*      VS - protistrany
		*/
		vs2?: string|null;
		/**SS - protistrany
		*      SS - protistrany
		*/
		ss2?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Příznak, zda má být položka stornována/odstornována (TRUE na stornované položce provede odstorno)*/
		storno?: boolean|null;
	}
	const enum GBankovniVypisPolozkaUpsertReqDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", vs = "vs", sk_ci = "sk_ci", bu_ci = "bu_ci", c = "c", mena = "mena", c_mena = "c_mena", dat_zap = "dat_zap", ks = "ks", ss = "ss", nazev = "nazev", popis1 = "popis1", dat_val = "dat_val", vs2 = "vs2", ss2 = "ss2", dat_zmena = "dat_zmena", storno = "storno",}
	const enum GBankovniVypisPolozkaUpsertReqDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", vs = "*", sk_ci = "*", bu_ci = "*", c = "*", mena = "*", c_mena = "*", dat_zap = "*", ks = "*", ss = "*", nazev = "*", popis1 = "*", dat_val = "*", vs2 = "*", ss2 = "*", dat_zmena = "*", storno = "*",}
	const enum GBankovniVypisPolozkaUpsertReqDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", vs = "string", sk_ci = "string", bu_ci = "string", c = "JsonDecimal", mena = "number", c_mena = "JsonDecimal", dat_zap = "JsonDate", ks = "string", ss = "string", nazev = "string", popis1 = "string", dat_val = "JsonDate", vs2 = "string", ss2 = "string", dat_zmena = "JsonDate", storno = "boolean",}
	const enum GBankovniVypisPolozkaUpsertReqDtoTypeLengths { ixp = 12, vs = 12, sk_ci = 4, bu_ci = 34, ks = 12, ss = 12, nazev = 160, popis1 = 254, vs2 = 12, ss2 = 12,}
	/**Dto request pro hromadné odstranění položek bankovního výpisu*/
	interface GBankovniVypisPolozkaMassDeleteReqDto {
		/**Identifikátor bankovního výpisu*/
		ixp?: string|null;
		/**Seznam položek pro Upsert*/
		polozky?: Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto[]|null;
	}
	const enum GBankovniVypisPolozkaMassDeleteReqDtoNames { ixp = "ixp", polozky = "polozky",}
	const enum GBankovniVypisPolozkaMassDeleteReqDtoFragments { ixp = "*", polozky = "*",}
	const enum GBankovniVypisPolozkaMassDeleteReqDtoTypes { ixp = "string", polozky = "Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto[]",}
	const enum GBankovniVypisPolozkaMassDeleteReqDtoTypeLengths { ixp = 12,}
	/**Dto primárních klíčů položek bankovního výpisu*/
	interface GBankovniVypisPolozkaPKDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
	}
	const enum GBankovniVypisPolozkaPKDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av",}
	const enum GBankovniVypisPolozkaPKDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*",}
	const enum GBankovniVypisPolozkaPKDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number",}
	const enum GBankovniVypisPolozkaPKDtoTypeLengths { ixp = 12,}
	/**Dto pro hromadné operace nad položkami*/
	interface GBankovniVypisPolozkaHromOperaceDto {
		/**Seznam položek*/
		keys?: Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto[]|null;
	}
	const enum GBankovniVypisPolozkaHromOperaceDtoNames { keys = "keys",}
	const enum GBankovniVypisPolozkaHromOperaceDtoFragments { keys = "*",}
	const enum GBankovniVypisPolozkaHromOperaceDtoTypes { keys = "Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto[]",}
	const enum GBankovniVypisPolozkaHromOperaceDtoTypeLengths {}
	/**Dto pro hromadné odpárování položek bankovního výpisu*/
	interface GBankovniVypisPolozkaHromZauctovaniDto {
		/**Seznam položek*/
		keys?: Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto[]|null;
		/**Den pohybu*/
		uup_Den?: number|null;
		/**Měsíc pohybu*/
		uup_Mesic?: number|null;
		/**Rok pohybu*/
		uup_Rok?: number|null;
		/**Kniha pro vytvoření přepárování*/
		ixp_den?: string|null;
	}
	const enum GBankovniVypisPolozkaHromZauctovaniDtoNames { keys = "keys", uup_Den = "uup_Den", uup_Mesic = "uup_Mesic", uup_Rok = "uup_Rok", ixp_den = "ixp_den",}
	const enum GBankovniVypisPolozkaHromZauctovaniDtoFragments { keys = "*", uup_Den = "*", uup_Mesic = "*", uup_Rok = "*", ixp_den = "*",}
	const enum GBankovniVypisPolozkaHromZauctovaniDtoTypes { keys = "Gordic.Buc.Interface.GBankovniVypisPolozkaPKDto[]", uup_Den = "number", uup_Mesic = "number", uup_Rok = "number", ixp_den = "string",}
	const enum GBankovniVypisPolozkaHromZauctovaniDtoTypeLengths {}
	/**Dto pro seznam otevřených roků*/
	interface GBankovniVypisPolozkaOtevreneRokyDto {
		/**Rok*/
		rok?: number|null;
	}
	const enum GBankovniVypisPolozkaOtevreneRokyDtoNames { rok = "rok",}
	const enum GBankovniVypisPolozkaOtevreneRokyDtoFragments { rok = "*",}
	const enum GBankovniVypisPolozkaOtevreneRokyDtoTypes { rok = "number",}
	const enum GBankovniVypisPolozkaOtevreneRokyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\BankovniVypisPolozka\Dto\GBankovniVypisPolozkaVyhledavaniDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucdpol
	*      Dto pro vyhledávání v položkách bankovních výpisů
	*/
	interface GBankovniVypisPolozkaVyhledavaniDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Stav položky
		*      Stav položky ban.výpisu
		*/
		s_pol?: number|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Účtárna
		*      UUS - účtárna účetního střediska - UUS zpracující organizace
		*/
		uus?: string|null;
		/**Číslo výpisu
		*      Číslo bankovního výpisu
		*/
		cis_pid?: number|null;
		/**Datum nového zůstatku
		*      Datum konečného ( nového ) zůstatku bankovního účtu
		*/
		dat_nov_zus?: JsonDate|null;
		/**Zkratka aktuálního stavu položky výpisu*/
		s_pol_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu položky výpisu*/
		s_pol_txt?: string|null;
		/**Vlastní bankovní účet složený*/
		ucet_vl?: string|null;
		/**Cizí bankovní účet složený*/
		ucet_ci?: string|null;
		/**Příznak, zda se jedná o archivní položku*/
		archiv?: number|null;
	}
	const enum GBankovniVypisPolozkaVyhledavaniDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", s_pol = "s_pol", nazev = "nazev", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", dat_zap = "dat_zap", vs = "vs", ks = "ks", ss = "ss", c = "c", uus = "uus", cis_pid = "cis_pid", dat_nov_zus = "dat_nov_zus", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_txt", ucet_vl = "ucet_vl", ucet_ci = "ucet_ci", archiv = "archiv",}
	const enum GBankovniVypisPolozkaVyhledavaniDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", s_pol = "*", nazev = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", dat_zap = "*", vs = "*", ks = "Base", ss = "Base", c = "*", uus = "*", cis_pid = "*", dat_nov_zus = "*", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_zkr", ucet_vl = "*", ucet_ci = "*", archiv = "*",}
	const enum GBankovniVypisPolozkaVyhledavaniDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", s_pol = "number", nazev = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", dat_zap = "JsonDate", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", uus = "string", cis_pid = "number", dat_nov_zus = "JsonDate", s_pol_zkr = "string", s_pol_txt = "string", ucet_vl = "string", ucet_ci = "string", archiv = "number",}
	const enum GBankovniVypisPolozkaVyhledavaniDtoTypeLengths { ixp = 12, nazev = 160, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, vs = 12, uus = 10,}
	/**Service Permissions pro vyhledávání položek bankovních výpisů*/
	interface GBankovniVypisPolozkyVyhledavaniServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit položky bankovních výpisů pro vyhledávání*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBankovniVypisPolozkyVyhledavaniServicePermissionsNames { LzeZobrazit = "LzeZobrazit",}
	const enum GBankovniVypisPolozkyVyhledavaniServicePermissionsFragments { LzeZobrazit = "*",}
	const enum GBankovniVypisPolozkyVyhledavaniServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBankovniVypisPolozkyVyhledavaniServicePermissionsTypeLengths {}
	/**Filtr seznamu vzhledávání položek výpisu*/
	interface GBankovniVypisPolozkaVyhledavaniFilterDto {
		/**PID bankovního výpisu*/
		ixp?: GBaseFilter<string>|null;
		/**řádek položky výpisu*/
		radek_pol?: GBaseFilter<number>|null;
		/**subřádek položky výpisu*/
		subradek?: GBaseFilter<number>|null;
		/**řádek rozpisu položky výpisu*/
		radek_av?: GBaseFilter<number>|null;
		/**vs*/
		vs?: GBaseFilter<string>|null;
		/**ks*/
		ks?: GBaseFilter<string>|null;
		/**ss*/
		ss?: GBaseFilter<string>|null;
		/**Směrový kód bankovního účtu cizího*/
		sk_ci?: GBaseFilter<string>|null;
		/**Bankovní účet cizí*/
		bu_ci?: GBaseFilter<string>|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: GBaseFilter<string>|null;
		/**Bankovní účet vlastní*/
		bu_vl?: GBaseFilter<string>|null;
		/**částka*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**Název*/
		nazev?: GBaseFilter<string>|null;
		/**Spárované/nezaúčtované - hodnoty 0/1*/
		spNezau?: number|null;
		/**Stav položky*/
		s_pol?: GBaseFilter<number>|null;
		/**Rozpis - hodnoty 0/1*/
		roz_vyh?: number|null;
		/**Datum zaplacení*/
		dat_zap?: GIntervalDto<JsonDate>|null;
		/**Datum počátečního zůstatku*/
		dat_nov_zus?: GIntervalDto<JsonDate>|null;
		/**Vyhledat za všechny roky - hodnoty 0/1*/
		vyh_roky?: number|null;
		/**Ikc*/
		ikc?: Gordic.General.GIkc|null;
	}
	const enum GBankovniVypisPolozkaVyhledavaniFilterDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", vs = "vs", ks = "ks", ss = "ss", sk_ci = "sk_ci", bu_ci = "bu_ci", sk_vl = "sk_vl", bu_vl = "bu_vl", c = "c", nazev = "nazev", spNezau = "spNezau", s_pol = "s_pol", roz_vyh = "roz_vyh", dat_zap = "dat_zap", dat_nov_zus = "dat_nov_zus", vyh_roky = "vyh_roky", ikc = "ikc",}
	const enum GBankovniVypisPolozkaVyhledavaniFilterDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", vs = "*", ks = "*", ss = "*", sk_ci = "*", bu_ci = "*", sk_vl = "*", bu_vl = "*", c = "*", nazev = "*", spNezau = "*", s_pol = "*", roz_vyh = "*", dat_zap = "*", dat_nov_zus = "*", vyh_roky = "*", ikc = "*",}
	const enum GBankovniVypisPolozkaVyhledavaniFilterDtoTypes { ixp = "GBaseFilter<string>", radek_pol = "GBaseFilter<number>", subradek = "GBaseFilter<number>", radek_av = "GBaseFilter<number>", vs = "GBaseFilter<string>", ks = "GBaseFilter<string>", ss = "GBaseFilter<string>", sk_ci = "GBaseFilter<string>", bu_ci = "GBaseFilter<string>", sk_vl = "GBaseFilter<string>", bu_vl = "GBaseFilter<string>", c = "GIntervalDto<JsonDecimal>", nazev = "GBaseFilter<string>", spNezau = "number", s_pol = "GBaseFilter<number>", roz_vyh = "number", dat_zap = "GIntervalDto<JsonDate>", dat_nov_zus = "GIntervalDto<JsonDate>", vyh_roky = "number", ikc = "Gordic.General.GIkc",}
	const enum GBankovniVypisPolozkaVyhledavaniFilterDtoTypeLengths {}
	/**Dto s FROM a WHERE pro tisk vyhledaných položek bankovních výpisů*/
	interface GBankovniVypisPolozkaVyhledavaniTiskFromWhereDto {
		/**FROM část SQL dotazu*/
		from?: string|null;
		/**WHERE část SQL dotazu*/
		where?: string|null;
	}
	const enum GBankovniVypisPolozkaVyhledavaniTiskFromWhereDtoNames { from = "from", where = "where",}
	const enum GBankovniVypisPolozkaVyhledavaniTiskFromWhereDtoFragments { from = "*", where = "*",}
	const enum GBankovniVypisPolozkaVyhledavaniTiskFromWhereDtoTypes { from = "string", where = "string",}
	const enum GBankovniVypisPolozkaVyhledavaniTiskFromWhereDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Controls\Dto\Gordic.Buc.Interface.GBucspbaDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucspba*/
	interface GBucspbaDto {
		/**DBCOLUMN:bucspba.ico*/
		ico?: string|null;
		/**DBCOLUMN:bucspba.ucs*/
		ucs?: string|null;
		/**ID externího subjektu typu banka*/
		ixs_esu?: string|null;
		/**DBCOLUMN:bucspba.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:bucspba.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:bucspba.zkr_naz*/
		zkr_naz?: string|null;
		/**DBCOLUMN:bucspba.zak_bu*/
		zak_bu?: string|null;
		/**DBCOLUMN:bucspba.cis_pre*/
		cis_pre?: string|null;
		/**Začátek intervalu účetních souborů - smlouva s bankou*/
		sou_zac?: string|null;
		/**Konec intervalu účetních souborů - smlouva s bankou*/
		sou_kon?: string|null;
		/**Používá modul BUC*/
		sou_zacp?: string|null;
		/**DBCOLUMN:bucspba.sou_konp*/
		sou_konp?: string|null;
		/**Označení pobočky banky*/
		pob_ban?: string|null;
		/**6 místný číselný kód*/
		ver_kod?: string|null;
		/**DBCOLUMN:bucspba.naz_ban*/
		naz_ban?: string|null;
		/**Umístění pobočky banky*/
		mis_pob?: string|null;
		/**Umístění organizace v 6.pádě*/
		mis_org?: string|null;
		/**DBCOLUMN:bucspba.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:bucspba.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:bucspba.vys_sou*/
		vys_sou?: string|null;
		/**DBCOLUMN:bucspba.rez_dav*/
		rez_dav?: number|null;
		/**DBCOLUMN:bucspba.vst_sou*/
		vst_sou?: string|null;
		/**Cesta pro umístění výstupního souboru - do banky*/
		vys_pth?: string|null;
		/**Cesta pro umístění vstupního souboru - z banky*/
		vst_pth?: string|null;
		/**DBCOLUMN:bucspba.cis_pob*/
		cis_pob?: string|null;
		/**Cesta pro umístění souborů z banky ( záloha )*/
		gpc_pth?: string|null;
		/**Skupina bankovních účtů*/
		sbu?: number|null;
		/**Název skupiny bankovních účtů*/
		nazev_sbu?: string|null;
		/**Číslo dávky, od kterého se bude dělat první dávka daný den*/
		cis_dav?: number|null;
		/**DBCOLUMN:bucspba.odesilatel_id*/
		odesilatel_id?: string|null;
		/**Pořadové číslo příkazu v rámci dne*/
		sekvence?: number|null;
		/**Kód výstavce*/
		kod_vys?: string|null;
		/**URL adreasa WS, API*/
		url_dab?: string|null;
		/**Rodné číslo uvedené na smlouvě pro služby Databanking ČS*/
		rc_dab?: string|null;
		/**IČO uvedené na smlouvě pro služby Databanking ČS*/
		ico_dab?: string|null;
		/**UUS - účtárna účetního střediska*/
		uus?: string|null;
		/**Povinnost ověřování el.podpisu dávek importovaných do BUC*/
		ove_epo?: number|null;
		/**Ukládání dávek příkazů do elektronického uložiště*/
		ulo_ele?: number|null;
		/**Podepisování dávek - počet podpisů*/
		pod_dav?: number|null;
		/**DBCOLUMN:bucspba.ode_pod*/
		ode_pod?: number|null;
		/**Pořadí certifikátů při odeslání dávky do ČNB*/
		por_cer?: number|null;
		/**Klientský certifikát pro organizaci*/
		ixs_cer_kli?: string|null;
		/**Záznam komunikace mezi BUC a bankou*/
		kom_pth?: string|null;
		/**Označení organizace v systému banky*/
		client_id?: string|null;
		/**Datum posledního stažení výpisů*/
		dat_vyp?: JsonDate|null;
	}
	const enum GBucspbaDtoNames { ico = "ico", ucs = "ucs", ixs_esu = "ixs_esu", sk_vl = "sk_vl", aktivita = "aktivita", zkr_naz = "zkr_naz", zak_bu = "zak_bu", cis_pre = "cis_pre", sou_zac = "sou_zac", sou_kon = "sou_kon", sou_zacp = "sou_zacp", sou_konp = "sou_konp", pob_ban = "pob_ban", ver_kod = "ver_kod", naz_ban = "naz_ban", mis_pob = "mis_pob", mis_org = "mis_org", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", vys_sou = "vys_sou", rez_dav = "rez_dav", vst_sou = "vst_sou", vys_pth = "vys_pth", vst_pth = "vst_pth", cis_pob = "cis_pob", gpc_pth = "gpc_pth", sbu = "sbu", nazev_sbu = "nazev_sbu", cis_dav = "cis_dav", odesilatel_id = "odesilatel_id", sekvence = "sekvence", kod_vys = "kod_vys", url_dab = "url_dab", rc_dab = "rc_dab", ico_dab = "ico_dab", uus = "uus", ove_epo = "ove_epo", ulo_ele = "ulo_ele", pod_dav = "pod_dav", ode_pod = "ode_pod", por_cer = "por_cer", ixs_cer_kli = "ixs_cer_kli", kom_pth = "kom_pth", client_id = "client_id", dat_vyp = "dat_vyp",}
	const enum GBucspbaDtoFragments { ico = "*", ucs = "*", ixs_esu = "*", sk_vl = "*", aktivita = "*", zkr_naz = "*", zak_bu = "*", cis_pre = "*", sou_zac = "*", sou_kon = "*", sou_zacp = "*", sou_konp = "*", pob_ban = "*", ver_kod = "*", naz_ban = "*", mis_pob = "*", mis_org = "*", dat_zmena = "*", zmenu_prov = "*", vys_sou = "*", rez_dav = "*", vst_sou = "*", vys_pth = "*", vst_pth = "*", cis_pob = "*", gpc_pth = "*", sbu = "*", nazev_sbu = "*", cis_dav = "*", odesilatel_id = "*", sekvence = "*", kod_vys = "*", url_dab = "*", rc_dab = "*", ico_dab = "*", uus = "*", ove_epo = "*", ulo_ele = "*", pod_dav = "*", ode_pod = "*", por_cer = "*", ixs_cer_kli = "*", kom_pth = "*", client_id = "*", dat_vyp = "*",}
	const enum GBucspbaDtoTypes { ico = "string", ucs = "string", ixs_esu = "string", sk_vl = "string", aktivita = "number", zkr_naz = "string", zak_bu = "string", cis_pre = "string", sou_zac = "string", sou_kon = "string", sou_zacp = "string", sou_konp = "string", pob_ban = "string", ver_kod = "string", naz_ban = "string", mis_pob = "string", mis_org = "string", dat_zmena = "JsonDate", zmenu_prov = "string", vys_sou = "string", rez_dav = "number", vst_sou = "string", vys_pth = "string", vst_pth = "string", cis_pob = "string", gpc_pth = "string", sbu = "number", nazev_sbu = "string", cis_dav = "number", odesilatel_id = "string", sekvence = "number", kod_vys = "string", url_dab = "string", rc_dab = "string", ico_dab = "string", uus = "string", ove_epo = "number", ulo_ele = "number", pod_dav = "number", ode_pod = "number", por_cer = "number", ixs_cer_kli = "string", kom_pth = "string", client_id = "string", dat_vyp = "JsonDate",}
	const enum GBucspbaDtoTypeLengths { ico = 10, ucs = 10, ixs_esu = 12, sk_vl = 11, zkr_naz = 20, zak_bu = 10, cis_pre = 10, sou_zac = 3, sou_kon = 3, sou_zacp = 3, sou_konp = 3, pob_ban = 3, ver_kod = 6, naz_ban = 50, mis_pob = 50, mis_org = 50, zmenu_prov = 12, vys_sou = 30, vst_sou = 30, vys_pth = 100, vst_pth = 100, cis_pob = 10, gpc_pth = 100, nazev_sbu = 50, odesilatel_id = 10, kod_vys = 4, url_dab = 254, rc_dab = 10, ico_dab = 10, uus = 10, ixs_cer_kli = 12, kom_pth = 254, client_id = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Controls\Dto\GReaderBuccssbDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro výběr - Stavy složenek B, mapování pro stavy OK nouze*/
	interface GReaderBuccssbDto {
		/**DBCOLUMN:buccssb.s_slob - Stav složenek B, mapování pro stavy OK nouze*/
		s_slob?: number|null;
		/**DBCOLUMN:buccssb.s_slob_txt -*/
		s_slob_txt?: string|null;
		/**DBCOLUMN:buccssb.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:buccssb.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
		/**DBCOLUMN:buccssb.ide_rea -*/
		ide_rea?: string|null;
		/**DBCOLUMN:buccssb.s_uhrp_okn -*/
		s_uhrp_okn?: number|null;
	}
	const enum GReaderBuccssbDtoNames { s_slob = "s_slob", s_slob_txt = "s_slob_txt", k_v = "k_v", k_s = "k_s", ide_rea = "ide_rea", s_uhrp_okn = "s_uhrp_okn",}
	const enum GReaderBuccssbDtoFragments { s_slob = "*", s_slob_txt = "*", k_v = "*", k_s = "*", ide_rea = "*", s_uhrp_okn = "*",}
	const enum GReaderBuccssbDtoTypes { s_slob = "number", s_slob_txt = "string", k_v = "number", k_s = "string", ide_rea = "string", s_uhrp_okn = "number",}
	const enum GReaderBuccssbDtoTypeLengths { s_slob_txt = 50, k_s = 15, ide_rea = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Controls\Dto\GReaderBucctykDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucctyk*/
	interface GReaderBucctykDto {
		/**DBCOLUMN:bucctyk.typ_kum - Typ kumulace položek ban. výpisu*/
		typ_kum?: number|null;
		/**DBCOLUMN:bucctyk.typ_kum_txt -*/
		typ_kum_txt?: string|null;
	}
	const enum GReaderBucctykDtoNames { typ_kum = "typ_kum", typ_kum_txt = "typ_kum_txt",}
	const enum GReaderBucctykDtoFragments { typ_kum = "*", typ_kum_txt = "*",}
	const enum GReaderBucctykDtoTypes { typ_kum = "number", typ_kum_txt = "string",}
	const enum GReaderBucctykDtoTypeLengths { typ_kum_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Controls\Dto\GReaderBucctyvDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucctyv*/
	interface GReaderBucctyvDto {
		/**DBCOLUMN:bucctyv.typ_vypis - Typ výpisu*/
		typ_vypis?: number|null;
		/**DBCOLUMN:bucctyv.typ_vypis_txt -*/
		typ_vypis_txt?: string|null;
		/**DBCOLUMN:bucctyv.typ_vypis_zkr -*/
		typ_vypis_zkr?: string|null;
		/**DBCOLUMN:bucctyv.k_v - Sloupec s možným využitím pro uložení číselných řadicích údajů*/
		k_v?: number|null;
		/**DBCOLUMN:bucctyv.k_s - Sloupec s možným využitím pro uložení řetězcových řadicích údajů*/
		k_s?: string|null;
	}
	const enum GReaderBucctyvDtoNames { typ_vypis = "typ_vypis", typ_vypis_txt = "typ_vypis_txt", typ_vypis_zkr = "typ_vypis_zkr", k_v = "k_v", k_s = "k_s",}
	const enum GReaderBucctyvDtoFragments { typ_vypis = "*", typ_vypis_txt = "*", typ_vypis_zkr = "*", k_v = "*", k_s = "*",}
	const enum GReaderBucctyvDtoTypes { typ_vypis = "number", typ_vypis_txt = "string", typ_vypis_zkr = "string", k_v = "number", k_s = "string",}
	const enum GReaderBucctyvDtoTypeLengths { typ_vypis_txt = 50, typ_vypis_zkr = 10, k_s = 15,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Controls\Dto\GReaderBucdpepDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucdpep*/
	interface GReaderBucdpepDto {
		/**DBCOLUMN:bucdpep.ixp - Identifikátor*/
		ixp?: string|null;
		/**DBCOLUMN:bucdpep.radek_uhr - Řádek*/
		radek_uhr?: number|null;
		/**DBCOLUMN:bucdpep.subradek - Subřádek*/
		subradek?: number|null;
		/**DBCOLUMN:bucdpep.lic - Licence databáze*/
		lic?: string|null;
		/**DBCOLUMN:bucdpep.eko_akt - Aktivita*/
		eko_akt?: number|null;
		/**DBCOLUMN:bucdpep.arw -*/
		arw?: number|null;
		/**DBCOLUMN:bucdpep.ixs_esu - Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:bucdpep.vs - Variabilní symbol*/
		vs?: string|null;
		/**DBCOLUMN:bucdpep.ks - Konstatní symbol*/
		ks?: string|null;
		/**DBCOLUMN:bucdpep.ss - Specifický symbol*/
		ss?: string|null;
		/**DBCOLUMN:bucdpep.sk_vl - Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**DBCOLUMN:bucdpep.bu_vl - Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**DBCOLUMN:bucdpep.bu_txt_vl - Vlasní bankovní účet*/
		bu_txt_vl?: string|null;
		/**DBCOLUMN:bucdpep.sk_ci - Směrový kód bankovního účtu cizího*/
		sk_ci?: string|null;
		/**DBCOLUMN:bucdpep.bu_ci - Bankovní účet cizí*/
		bu_ci?: string|null;
		/**DBCOLUMN:bucdpep.bu_txt_ci - Bankovní účet cizí*/
		bu_txt_ci?: string|null;
		/**DBCOLUMN:bucdpep.zp - Způsob platby*/
		zp?: number|null;
		/**DBCOLUMN:bucdpep.ac - Agendové číslo*/
		ac?: string|null;
		/**DBCOLUMN:bucdpep.ixp_den - Kniha*/
		ixp_den?: string|null;
		/**DBCOLUMN:bucdpep.s_uhrp -*/
		s_uhrp?: number|null;
		/**DBCOLUMN:bucdpep.c - Cena*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_par - Částka zpárované platby*/
		c_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.dat_spl -*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:bucdpep.dat_zap -*/
		dat_zap?: JsonDate|null;
		/**DBCOLUMN:bucdpep.dat_par -*/
		dat_par?: JsonDate|null;
		/**DBCOLUMN:bucdpep.dat_kuhr -*/
		dat_kuhr?: JsonDate|null;
		/**DBCOLUMN:bucdpep.typ_ag - Typ agendy dle ginctag*/
		typ_ag?: number|null;
		/**DBCOLUMN:bucdpep.ktg_typ - Kategorie typu dokumentu*/
		ktg_typ?: number|null;
		/**DBCOLUMN:bucdpep.cis_bdo -*/
		cis_bdo?: string|null;
		/**DBCOLUMN:bucdpep.dat_zmena - Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:bucdpep.zmenu_prov - Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:bucdpep.mena - Kód měny dle ekocmen*/
		mena?: number|null;
		/**DBCOLUMN:bucdpep.c_mena -*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.zp_z -*/
		zp_z?: number|null;
		/**DBCOLUMN:bucdpep.hra_pop -*/
		hra_pop?: number|null;
		/**DBCOLUMN:bucdpep.pla_tit -*/
		pla_tit?: string|null;
		/**DBCOLUMN:bucdpep.ucel_uhr -*/
		ucel_uhr?: string|null;
		/**DBCOLUMN:bucdpep.dev_pov -*/
		dev_pov?: string|null;
		/**DBCOLUMN:bucdpep.id_platby -*/
		id_platby?: string|null;
		/**DBCOLUMN:bucdpep.ktg_upo -*/
		ktg_upo?: number|null;
		/**DBCOLUMN:bucdpep.dat_vzniku -*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:bucdpep.radek_upo -*/
		radek_upo?: number|null;
		/**DBCOLUMN:bucdpep.por_cislo_int -*/
		por_cislo_int?: number|null;
		/**DBCOLUMN:bucdpep.rok - Rok deníku*/
		rok?: number|null;
		/**DBCOLUMN:bucdpep.ico - IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**DBCOLUMN:bucdpep.ucs - UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**DBCOLUMN:bucdpep.upl - Určení platby*/
		upl?: number|null;
		/**DBCOLUMN:bucdpep.exp_pla -*/
		exp_pla?: number|null;
		/**DBCOLUMN:bucdpep.bu_pop -*/
		bu_pop?: string|null;
		/**DBCOLUMN:bucdpep.mena_pop -*/
		mena_pop?: number|null;
		/**DBCOLUMN:bucdpep.mena_poz -*/
		mena_poz?: number|null;
		/**DBCOLUMN:bucdpep.inf1 -*/
		inf1?: string|null;
		/**DBCOLUMN:bucdpep.inf2 -*/
		inf2?: string|null;
		/**DBCOLUMN:bucdpep.c_par_mena - Částka zpárované platby v měně*/
		c_par_mena?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.ixp_real -*/
		ixp_real?: string|null;
		/**DBCOLUMN:bucdpep.ixs_ext - Externí systém*/
		ixs_ext?: string|null;
		/**DBCOLUMN:bucdpep.priz_nepar -*/
		priz_nepar?: number|null;
		/**DBCOLUMN:bucdpep.popis - Popis*/
		popis?: string|null;
		/**DBCOLUMN:bucdpep.sds -*/
		sds?: string|null;
		/**DBCOLUMN:bucdpep.priz_pred_rcdn -*/
		priz_pred_rcdn?: number|null;
		/**DBCOLUMN:bucdpep.c_z0_par -*/
		c_z0_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d0_par -*/
		c_d0_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_z1_par -*/
		c_z1_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d1_par -*/
		c_d1_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_z2_par -*/
		c_z2_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d2_par -*/
		c_d2_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_zao_par -*/
		c_zao_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.ixs_zmp_prik -*/
		ixs_zmp_prik?: string|null;
		/**DBCOLUMN:bucdpep.pri_uhr -*/
		pri_uhr?: number|null;
		/**DBCOLUMN:bucdpep.dat_sch -*/
		dat_sch?: JsonDate|null;
		/**DBCOLUMN:bucdpep.radek_upo_rez -*/
		radek_upo_rez?: number|null;
		/**DBCOLUMN:bucdpep.priz_rez_pri -*/
		priz_rez_pri?: number|null;
		/**DBCOLUMN:bucdpep.ixp_sml -*/
		ixp_sml?: string|null;
		/**DBCOLUMN:bucdpep.rok_sml -*/
		rok_sml?: number|null;
		/**DBCOLUMN:bucdpep.cislo_sml -*/
		cislo_sml?: number|null;
		/**DBCOLUMN:bucdpep.dsp -*/
		dsp?: string|null;
		/**DBCOLUMN:bucdpep.kurz -*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.alg_par -*/
		alg_par?: number|null;
		/**DBCOLUMN:bucdpep.ixp_vaz -*/
		ixp_vaz?: string|null;
		/**DBCOLUMN:bucdpep.dat_spl_ag -*/
		dat_spl_ag?: JsonDate|null;
		/**DBCOLUMN:bucdpep.c_z3_par -*/
		c_z3_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d3_par -*/
		c_d3_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_z4_par -*/
		c_z4_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.c_d4_par -*/
		c_d4_par?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.uus - UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**DBCOLUMN:bucdpep.u_zp -*/
		u_zp?: number|null;
		/**DBCOLUMN:bucdpep.sk_ci_mf -*/
		sk_ci_mf?: string|null;
		/**DBCOLUMN:bucdpep.bu_ci_mf -*/
		bu_ci_mf?: string|null;
		/**DBCOLUMN:bucdpep.c_mf -*/
		c_mf?: JsonDecimal|null;
		/**DBCOLUMN:bucdpep.ixs_esu_mf -*/
		ixs_esu_mf?: string|null;
		/**DBCOLUMN:bucdpep.vs_mf -*/
		vs_mf?: string|null;
		/**DBCOLUMN:bucdpep.ks_mf -*/
		ks_mf?: string|null;
		/**DBCOLUMN:bucdpep.ss_mf -*/
		ss_mf?: string|null;
		/**DBCOLUMN:bucdpep.id_hdr_ris_pik -*/
		id_hdr_ris_pik?: string|null;
		/**DBCOLUMN:bucdpep.radek_hdr_pik -*/
		radek_hdr_pik?: number|null;
		/**DBCOLUMN:bucdpep.popis2 -*/
		popis2?: string|null;
		/**DBCOLUMN:bucdpep.oka_pla -*/
		oka_pla?: number|null;
		/**Název externího subjektu (ginsesu)*/
		nazev?: string|null;
		/**Název měny textově*/
		mena_txt?: string|null;
		/**Cizí účet spojený*/
		ucet_ci?: string|null;
		/**Zkratka agendy*/
		zkr_ag?: string|null;
		/**Rozdíl*/
		c_roz?: JsonDecimal|null;
		/**Rozdíl v měně*/
		c_roz_mena?: JsonDecimal|null;
	}
	const enum GReaderBucdpepDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", subradek = "subradek", lic = "lic", eko_akt = "eko_akt", arw = "arw", ixs_esu = "ixs_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_txt_ci = "bu_txt_ci", zp = "zp", ac = "ac", ixp_den = "ixp_den", s_uhrp = "s_uhrp", c = "c", c_par = "c_par", dat_spl = "dat_spl", dat_zap = "dat_zap", dat_par = "dat_par", dat_kuhr = "dat_kuhr", typ_ag = "typ_ag", ktg_typ = "ktg_typ", cis_bdo = "cis_bdo", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena = "mena", c_mena = "c_mena", zp_z = "zp_z", hra_pop = "hra_pop", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", id_platby = "id_platby", ktg_upo = "ktg_upo", dat_vzniku = "dat_vzniku", radek_upo = "radek_upo", por_cislo_int = "por_cislo_int", rok = "rok", ico = "ico", ucs = "ucs", upl = "upl", exp_pla = "exp_pla", bu_pop = "bu_pop", mena_pop = "mena_pop", mena_poz = "mena_poz", inf1 = "inf1", inf2 = "inf2", c_par_mena = "c_par_mena", ixp_real = "ixp_real", ixs_ext = "ixs_ext", priz_nepar = "priz_nepar", popis = "popis", sds = "sds", priz_pred_rcdn = "priz_pred_rcdn", c_z0_par = "c_z0_par", c_d0_par = "c_d0_par", c_z1_par = "c_z1_par", c_d1_par = "c_d1_par", c_z2_par = "c_z2_par", c_d2_par = "c_d2_par", c_zao_par = "c_zao_par", ixs_zmp_prik = "ixs_zmp_prik", pri_uhr = "pri_uhr", dat_sch = "dat_sch", radek_upo_rez = "radek_upo_rez", priz_rez_pri = "priz_rez_pri", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", dsp = "dsp", kurz = "kurz", alg_par = "alg_par", ixp_vaz = "ixp_vaz", dat_spl_ag = "dat_spl_ag", c_z3_par = "c_z3_par", c_d3_par = "c_d3_par", c_z4_par = "c_z4_par", c_d4_par = "c_d4_par", uus = "uus", u_zp = "u_zp", sk_ci_mf = "sk_ci_mf", bu_ci_mf = "bu_ci_mf", c_mf = "c_mf", ixs_esu_mf = "ixs_esu_mf", vs_mf = "vs_mf", ks_mf = "ks_mf", ss_mf = "ss_mf", id_hdr_ris_pik = "id_hdr_ris_pik", radek_hdr_pik = "radek_hdr_pik", popis2 = "popis2", oka_pla = "oka_pla", nazev = "nazev", mena_txt = "mena_txt", ucet_ci = "ucet_ci", zkr_ag = "zkr_ag", c_roz = "c_roz", c_roz_mena = "c_roz_mena",}
	const enum GReaderBucdpepDtoFragments { ixp = "*", radek_uhr = "*", subradek = "*", lic = "*", eko_akt = "*", arw = "*", ixs_esu = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", bu_txt_vl = "*", sk_ci = "*", bu_ci = "*", bu_txt_ci = "*", zp = "*", ac = "*", ixp_den = "*", s_uhrp = "*", c = "*", c_par = "*", dat_spl = "*", dat_zap = "*", dat_par = "*", dat_kuhr = "*", typ_ag = "*", ktg_typ = "*", cis_bdo = "*", dat_zmena = "*", zmenu_prov = "*", mena = "*", c_mena = "*", zp_z = "*", hra_pop = "*", pla_tit = "*", ucel_uhr = "*", dev_pov = "*", id_platby = "*", ktg_upo = "*", dat_vzniku = "*", radek_upo = "*", por_cislo_int = "*", rok = "*", ico = "*", ucs = "*", upl = "*", exp_pla = "*", bu_pop = "*", mena_pop = "*", mena_poz = "*", inf1 = "*", inf2 = "*", c_par_mena = "*", ixp_real = "*", ixs_ext = "*", priz_nepar = "*", popis = "*", sds = "*", priz_pred_rcdn = "*", c_z0_par = "*", c_d0_par = "*", c_z1_par = "*", c_d1_par = "*", c_z2_par = "*", c_d2_par = "*", c_zao_par = "*", ixs_zmp_prik = "*", pri_uhr = "*", dat_sch = "*", radek_upo_rez = "*", priz_rez_pri = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", dsp = "*", kurz = "*", alg_par = "*", ixp_vaz = "*", dat_spl_ag = "*", c_z3_par = "*", c_d3_par = "*", c_z4_par = "*", c_d4_par = "*", uus = "*", u_zp = "*", sk_ci_mf = "*", bu_ci_mf = "*", c_mf = "*", ixs_esu_mf = "*", vs_mf = "*", ks_mf = "*", ss_mf = "*", id_hdr_ris_pik = "*", radek_hdr_pik = "*", popis2 = "*", oka_pla = "*", nazev = "*", mena_txt = "*", ucet_ci = "*", zkr_ag = "*", c_roz = "*", c_roz_mena = "*",}
	const enum GReaderBucdpepDtoTypes { ixp = "string", radek_uhr = "number", subradek = "number", lic = "string", eko_akt = "number", arw = "number", ixs_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", sk_ci = "string", bu_ci = "string", bu_txt_ci = "string", zp = "number", ac = "string", ixp_den = "string", s_uhrp = "number", c = "JsonDecimal", c_par = "JsonDecimal", dat_spl = "JsonDate", dat_zap = "JsonDate", dat_par = "JsonDate", dat_kuhr = "JsonDate", typ_ag = "number", ktg_typ = "number", cis_bdo = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mena = "number", c_mena = "JsonDecimal", zp_z = "number", hra_pop = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", id_platby = "string", ktg_upo = "number", dat_vzniku = "JsonDate", radek_upo = "number", por_cislo_int = "number", rok = "number", ico = "string", ucs = "string", upl = "number", exp_pla = "number", bu_pop = "string", mena_pop = "number", mena_poz = "number", inf1 = "string", inf2 = "string", c_par_mena = "JsonDecimal", ixp_real = "string", ixs_ext = "string", priz_nepar = "number", popis = "string", sds = "string", priz_pred_rcdn = "number", c_z0_par = "JsonDecimal", c_d0_par = "JsonDecimal", c_z1_par = "JsonDecimal", c_d1_par = "JsonDecimal", c_z2_par = "JsonDecimal", c_d2_par = "JsonDecimal", c_zao_par = "JsonDecimal", ixs_zmp_prik = "string", pri_uhr = "number", dat_sch = "JsonDate", radek_upo_rez = "number", priz_rez_pri = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", dsp = "string", kurz = "JsonDecimal", alg_par = "number", ixp_vaz = "string", dat_spl_ag = "JsonDate", c_z3_par = "JsonDecimal", c_d3_par = "JsonDecimal", c_z4_par = "JsonDecimal", c_d4_par = "JsonDecimal", uus = "string", u_zp = "number", sk_ci_mf = "string", bu_ci_mf = "string", c_mf = "JsonDecimal", ixs_esu_mf = "string", vs_mf = "string", ks_mf = "string", ss_mf = "string", id_hdr_ris_pik = "string", radek_hdr_pik = "number", popis2 = "string", oka_pla = "number", nazev = "string", mena_txt = "string", ucet_ci = "string", zkr_ag = "string", c_roz = "JsonDecimal", c_roz_mena = "JsonDecimal",}
	const enum GReaderBucdpepDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46, sk_ci = 11, bu_ci = 34, bu_txt_ci = 46, ac = 20, ixp_den = 12, cis_bdo = 30, zmenu_prov = 12, pla_tit = 10, ucel_uhr = 30, dev_pov = 30, id_platby = 50, ico = 10, ucs = 10, bu_pop = 34, inf1 = 34, inf2 = 34, ixp_real = 12, ixs_ext = 12, popis = 254, sds = 10, ixs_zmp_prik = 12, ixp_sml = 12, dsp = 1, ixp_vaz = 12, uus = 10, sk_ci_mf = 11, bu_ci_mf = 34, ixs_esu_mf = 12, vs_mf = 12, ks_mf = 12, ss_mf = 12, id_hdr_ris_pik = 10, popis2 = 140,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Controls\Dto\GReaderZpracFucDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto readeru zpracovatele ve FUC*/
	interface GReaderZpracFucDto {
		/**Identifikátor*/
		ixs_fun?: string|null;
		/**Název referenta*/
		nazev_rf?: string|null;
		/**uus*/
		uus?: string|null;
	}
	const enum GReaderZpracFucDtoNames { ixs_fun = "ixs_fun", nazev_rf = "nazev_rf", uus = "uus",}
	const enum GReaderZpracFucDtoFragments { ixs_fun = "*", nazev_rf = "*", uus = "*",}
	const enum GReaderZpracFucDtoTypes { ixs_fun = "string", nazev_rf = "string", uus = "string",}
	const enum GReaderZpracFucDtoTypeLengths { ixs_fun = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\DavkaPDB\Gordic.Buc.Interface.IGDavkaPDB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Dávka příkazů do banky
	* @domain Banka
	* @businessObject DavkaPDB
	*/
	interface DavkaPDB {
		/**Detail Dávka příkazů do banky*/
		read(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceReadResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Seznam Dávka příkazů do banky*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Zjistí počet dávek příkazů do banky*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Dávka příkazů do banky*/
		create(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Oprava Dávka příkazů do banky*/
		update(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Oprava resp. založení Dávka příkazů do banky*/
		upsert(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Odstranění Dávka příkazů do banky*/
		delete(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Kontrola předaných dávek před stornem / zrušením storna*/
		zkontrolujPredStornem(rq?:Gordic.Buc.Interface.GDavkaPDBStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBStornoOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaPDBPkDto>>;
		/**Storno / zrušení storna dávky*/
		stornuj(rq?:Gordic.Buc.Interface.GDavkaPDBStornoOperationDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBStornoOperationDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBStornoOperationDto>,GServiceActionResponse<Gordic.Buc.Interface.GDavkaPDBPkDto>>;
		/**Hromadné storno / zrušení storna předaných dávek*/
		hromadneStornuj(rq?:Gordic.Buc.Interface.GDavkaPDBStornoOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBStornoOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBStornoOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaPDBPkDto>>;
		/**Kontrola předaných dávek před podpisem / zrušením podpisu*/
		zkontrolujPredPodpisem(rq?:Gordic.Buc.Interface.GDavkaPDBPodpisOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBPodpisOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBPodpisOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaPDBPkDto>>;
		/**Kontrola předaných dávek před odesláním*/
		zkontrolujPredOdeslanim(rq?:Gordic.Buc.Interface.GDavkaPDBOdeslaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBOdeslaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBOdeslaniOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaPDBPkDto>>;
		/**Hromadné odeslání / zrušení odeslání dávek*/
		hromadneOdesli(rq?:Gordic.Buc.Interface.GDavkaPDBOdeslaniOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBOdeslaniOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBOdeslaniOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaPDBPkDto>>;
		/**Nastaví stav dávky a stav transakce dávky po připojení prvního podpisu*/
		nastavPrvniPodpis(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceActionResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Vrátí oprávnění k dávkám příkazů (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{banka:Gordic.Buc.Interface.GBankaDto}>): _Task<{banka:Gordic.Buc.Interface.GBankaDto},Gordic.Buc.Interface.GDavkaPDBServicePermission>;
		/**Příprava platebních příkazů*/
		pripravData(rq?:Gordic.Buc.Interface.GDavkaPDBPripravDataOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBPripravDataOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GDavkaPDBPripravDataOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Vrátí soubor protokolu k dávce příkazů ČNB*/
		vratSouborProtokolu(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceActionResponse<Gordic.General.ApplicationInterface.GFileInfoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkaPDB: ServiceBase & Catalog.DavkaPDB;
	}
	const DavkaPDB: Client["DavkaPDB"];
}
declare namespace Gordic.Buc.Interface {
	/**Oprávnění pro jedenu dávku*/
	interface GDavkaPDBPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podepsat*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat*/
		LzeOdeslat: Gordic.General.ApplicationInterface.GPermission;
		/**lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat hned po generování dávky příkazů*/
		LzeOdeslatPriGenerovani: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaPDBPermissionNames { LzeZobrazit = "LzeZobrazit", LzePodepsat = "LzePodepsat", LzeOdeslat = "LzeOdeslat", LzeStornovat = "LzeStornovat", LzeOdeslatPriGenerovani = "LzeOdeslatPriGenerovani",}
	const enum GDavkaPDBPermissionFragments { LzeZobrazit = "*", LzePodepsat = "*", LzeOdeslat = "*", LzeStornovat = "*", LzeOdeslatPriGenerovani = "*",}
	const enum GDavkaPDBPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatPriGenerovani = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaPDBPermissionTypeLengths {}
	/**Oprávnění pro práci nad dávkami příkazů*/
	interface GDavkaPDBServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze podepsat*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat*/
		LzeOdeslat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat hned po generování dávky příkazů*/
		LzeOdeslatPriGenerovani: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaPDBServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzePodepsat = "LzePodepsat", LzeOdeslat = "LzeOdeslat", LzeStornovat = "LzeStornovat", LzeOdeslatPriGenerovani = "LzeOdeslatPriGenerovani",}
	const enum GDavkaPDBServicePermissionFragments { LzeZobrazit = "*", LzePodepsat = "*", LzeOdeslat = "*", LzeStornovat = "*", LzeOdeslatPriGenerovani = "*",}
	const enum GDavkaPDBServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslatPriGenerovani = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaPDBServicePermissionTypeLengths {}
	/**Filtr pro Dávka příkazů do banky*/
	const enum GDavkaPDBFilter {
		/**ixp_dav*/
		ixp_dav,
		/**cislo_davky*/
		cislo_davky,
		/**soubor*/
		soubor,
		/**dat_vzn*/
		dat_vzn,
		/**dat_ppo*/
		dat_ppo,
		/**dat_ode*/
		dat_ode,
		/**poc_pod*/
		poc_pod,
		/**typ_dav_pri*/
		typ_dav_pri,
		/**s_dpb*/
		s_dpb,
		/**poznamka*/
		poznamka,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**uus*/
		uus,
		/**sk_vl*/
		sk_vl,
		/**sbu*/
		sbu,
		/**s_vvu*/
		s_vvu,
		/**host_client*/
		host_client,
		/**user_id*/
		user_id,
		/**ixs_cer*/
		ixs_cer,
		/**PID knihy dokladů ban.výpisů*/
		ixp_den,
		/**rok knih ban.výpisů (pro všechny knihy roku)*/
		rok_den,
		/**kategorie knih ban.výpisů*/
		ktg_den,
		/**existence v tabulce wfltpre*/
		tpre_ano,
		/**IKC v tabulce wfltpre*/
		tpre_ikc,
		/**příznak vyškrtnutého pohybu v tabulce wfltpre*/
		tpre_uncheck,
	}
	/**Parametry storna / zrušení storna dávek*/
	interface GDavkaPDBStornoOperationDto extends Gordic.Buc.Interface.GBucOperationDto<Gordic.Buc.Interface.GDavkaPDBDto> {
		/**požadovaná operace (true = storno, false = zrušení storna)*/
		stornovat?: boolean|null;
		/**důvod operace*/
		duvod?: string|null;
	}
	const enum GDavkaPDBStornoOperationDtoNames { stornovat = "stornovat", duvod = "duvod", ikc = "ikc", rows = "rows",}
	const enum GDavkaPDBStornoOperationDtoFragments { stornovat = "*", duvod = "*", ikc = "*", rows = "*",}
	const enum GDavkaPDBStornoOperationDtoTypes { stornovat = "boolean", duvod = "string", ikc = "Gordic.General.GIkc", rows = "Gordic.Buc.Interface.GDavkaPDBDto[]",}
	const enum GDavkaPDBStornoOperationDtoTypeLengths {}
	/**Parametry podpisu / zrušení podpisu dávek*/
	interface GDavkaPDBPodpisOperationDto extends Gordic.Buc.Interface.GBucOperationDto<Gordic.Buc.Interface.GDavkaPDBDto> {
		/**požadovaná operace (true = podepsat, false = zrušení podpisu)*/
		podepsat?: boolean|null;
		/**banka - smlouva s bankou*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
	}
	const enum GDavkaPDBPodpisOperationDtoNames { podepsat = "podepsat", banka = "banka", ikc = "ikc", rows = "rows",}
	const enum GDavkaPDBPodpisOperationDtoFragments { podepsat = "*", banka = "*", ikc = "*", rows = "*",}
	const enum GDavkaPDBPodpisOperationDtoTypes { podepsat = "boolean", banka = "Gordic.Buc.Interface.GBankaDto", ikc = "Gordic.General.GIkc", rows = "Gordic.Buc.Interface.GDavkaPDBDto[]",}
	const enum GDavkaPDBPodpisOperationDtoTypeLengths {}
	/**Parametry odeslání / zrušení odeslání dávek*/
	interface GDavkaPDBOdeslaniOperationDto extends Gordic.Buc.Interface.GBucOperationDto<Gordic.Buc.Interface.GDavkaPDBDto> {
		/**požadovaná operace (true = odeslat, false = zrušení odeslání)*/
		odeslat?: boolean|null;
		/**banka - smlouva s bankou*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
	}
	const enum GDavkaPDBOdeslaniOperationDtoNames { odeslat = "odeslat", banka = "banka", ikc = "ikc", rows = "rows",}
	const enum GDavkaPDBOdeslaniOperationDtoFragments { odeslat = "*", banka = "*", ikc = "*", rows = "*",}
	const enum GDavkaPDBOdeslaniOperationDtoTypes { odeslat = "boolean", banka = "Gordic.Buc.Interface.GBankaDto", ikc = "Gordic.General.GIkc", rows = "Gordic.Buc.Interface.GDavkaPDBDto[]",}
	const enum GDavkaPDBOdeslaniOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\DavkaPDB\Dto\Gordic.Buc.Interface.GDavkaPDBDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro DavkaPDB*/
	interface GDavkaPDBDto extends Gordic.Buc.Interface.GBucSeznamDto {
		/**ixp_dav*/
		ixp_dav?: string|null;
		/**cislo_davky*/
		cislo_davky?: number|null;
		/**soubor*/
		soubor?: string|null;
		/**dat_vzn*/
		dat_vzn?: JsonDate|null;
		/**dat_ppo*/
		dat_ppo?: JsonDate|null;
		/**dat_ode*/
		dat_ode?: JsonDate|null;
		/**poc_pod*/
		poc_pod?: number|null;
		/**typ_dav_pri*/
		typ_dav_pri?: number|null;
		/**s_dpb*/
		s_dpb?: number|null;
		/**poznamka*/
		poznamka?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**uus*/
		uus?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**sbu*/
		sbu?: number|null;
		/**s_vvu*/
		s_vvu?: number|null;
		/**host_client*/
		host_client?: string|null;
		/**user_id*/
		user_id?: string|null;
		/**ixs_cer*/
		ixs_cer?: string|null;
		/**Stav transakce odesílané dávky v tabulce BUCRTDB*/
		stav_tra?: string|null;
		/**ixb*/
		ixb?: string|null;
		/**poc_pod_ulo*/
		poc_pod_ulo?: number|null;
		/**poc_pri*/
		poc_pri?: number|null;
		/**castka*/
		castka?: JsonDecimal|null;
		/**vlastnik*/
		vlastnik?: string|null;
		/**pod_dav*/
		pod_dav?: number|null;
		/**struktura hlavičky ban.výpisu - doklad dávky příkazů*/
		vypis?: Gordic.Buc.Interface.GBanVypisDto|null;
		/**Nutné položky pro založení dokladu ve WFL - nutné pro volání současných procedur BUC*/
		wfl?: Gordic.Buc.Interface.GBucWflDto|null;
		/**parametry banky*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
		/**soubor dávky - pole byte*/
		soubor_dav?: number[]|null;
		/**s_dpb_txt*/
		s_dpb_txt?: string|null;
		/**stav_zkr*/
		stav_zkr?: string|null;
		/**s_vvu_zkr*/
		s_vvu_zkr?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GDavkaPDBPermission|null;
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
	}
	const enum GDavkaPDBDtoNames { ixp_dav = "ixp_dav", cislo_davky = "cislo_davky", soubor = "soubor", dat_vzn = "dat_vzn", dat_ppo = "dat_ppo", dat_ode = "dat_ode", poc_pod = "poc_pod", typ_dav_pri = "typ_dav_pri", s_dpb = "s_dpb", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", uus = "uus", sk_vl = "sk_vl", sbu = "sbu", s_vvu = "s_vvu", host_client = "host_client", user_id = "user_id", ixs_cer = "ixs_cer", stav_tra = "stav_tra", ixb = "ixb", poc_pod_ulo = "poc_pod_ulo", poc_pri = "poc_pri", castka = "castka", vlastnik = "vlastnik", pod_dav = "pod_dav", vypis = "vypis", wfl = "wfl", banka = "banka", soubor_dav = "soubor_dav", s_dpb_txt = "s_dpb_txt", stav_zkr = "stav_zkr", s_vvu_zkr = "s_vvu_zkr", Permissions = "Permissions", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GDavkaPDBDtoFragments { ixp_dav = "main", cislo_davky = "main", soubor = "main", dat_vzn = "main", dat_ppo = "main", dat_ode = "main", poc_pod = "main", typ_dav_pri = "main", s_dpb = "main", poznamka = "main", dat_zmena = "main", zmenu_prov = "main", uus = "main", sk_vl = "main", sbu = "main", s_vvu = "main", host_client = "main", user_id = "main", ixs_cer = "main", stav_tra = "main", ixb = "main", poc_pod_ulo = "main", poc_pri = "main", castka = "main", vlastnik = "main", pod_dav = "main", vypis = "*", wfl = "*", banka = "*", soubor_dav = "*", s_dpb_txt = "s_dpb_txt", stav_zkr = "stav_zkr", s_vvu_zkr = "s_vvu_zkr", Permissions = "Permissions", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GDavkaPDBDtoTypes { ixp_dav = "string", cislo_davky = "number", soubor = "string", dat_vzn = "JsonDate", dat_ppo = "JsonDate", dat_ode = "JsonDate", poc_pod = "number", typ_dav_pri = "number", s_dpb = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", uus = "string", sk_vl = "string", sbu = "number", s_vvu = "number", host_client = "string", user_id = "string", ixs_cer = "string", stav_tra = "string", ixb = "string", poc_pod_ulo = "number", poc_pri = "number", castka = "JsonDecimal", vlastnik = "string", pod_dav = "number", vypis = "Gordic.Buc.Interface.GBanVypisDto", wfl = "Gordic.Buc.Interface.GBucWflDto", banka = "Gordic.Buc.Interface.GBankaDto", soubor_dav = "number[]", s_dpb_txt = "string", stav_zkr = "string", s_vvu_zkr = "string", Permissions = "Gordic.Buc.Interface.GDavkaPDBPermission", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GDavkaPDBDtoTypeLengths { ixp_dav = 12, soubor = 254, poznamka = 254, zmenu_prov = 12, uus = 10, sk_vl = 11, host_client = 50, user_id = 50, ixs_cer = 12, stav_tra = 1, ixb = 12, vlastnik = 200,}
	/**Primární klíč dávky*/
	interface GDavkaPDBPkDto {
		/**PID dávky*/
		ixp_dav?: string|null;
	}
	const enum GDavkaPDBPkDtoNames { ixp_dav = "ixp_dav",}
	const enum GDavkaPDBPkDtoFragments { ixp_dav = "*",}
	const enum GDavkaPDBPkDtoTypes { ixp_dav = "string",}
	const enum GDavkaPDBPkDtoTypeLengths { ixp_dav = 12,}
	/**třída pro průvodce nad dávkami*/
	interface GDavkaPDBPripravDataOperationDto extends Gordic.Buc.Interface.GBucOperationDto<Gordic.Buc.Interface.GDavkaPDBDto> {
		/**Informace o vybrané bance - smlouvě*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
	}
	const enum GDavkaPDBPripravDataOperationDtoNames { banka = "banka", ikc = "ikc", rows = "rows",}
	const enum GDavkaPDBPripravDataOperationDtoFragments { banka = "*", ikc = "*", rows = "*",}
	const enum GDavkaPDBPripravDataOperationDtoTypes { banka = "Gordic.Buc.Interface.GBankaDto", ikc = "Gordic.General.GIkc", rows = "Gordic.Buc.Interface.GDavkaPDBDto[]",}
	const enum GDavkaPDBPripravDataOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\DavkaPDBPolozka\Gordic.Buc.Interface.IGDavkaPDBpolozka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Položka dávky příkazů
	* @domain Banka
	* @businessObject DavkaPDBPolozka
	*/
	interface DavkaPDBPolozka {
		/**Detail Položka dávky příkazů*/
		read(rq?:Gordic.Buc.Interface.GDavkaPDBPolozkaDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>,GServiceReadResponse<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>;
		/**Seznam Položka dávky příkazů*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>;
		/**Založení Položka dávky příkazů*/
		create(rq?:Gordic.Buc.Interface.GDavkaPDBPolozkaDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>;
		/**Oprava Položka dávky příkazů*/
		update(rq?:Gordic.Buc.Interface.GDavkaPDBPolozkaDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>;
		/**Oprava resp. založení Položka dávky příkazů*/
		upsert(rq?:Gordic.Buc.Interface.GDavkaPDBPolozkaDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>;
		/**Odstranění Položka dávky příkazů*/
		delete(rq?:Gordic.Buc.Interface.GDavkaPDBPolozkaDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaPDBPolozkaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		DavkaPDBPolozka: ServiceBase & Catalog.DavkaPDBPolozka;
	}
	const DavkaPDBPolozka: Client["DavkaPDBPolozka"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtr pro Položka dávky příkazů*/
	const enum GDavkaPDBPolozkaFilter {
		/**ixp_dav*/
		ixp_dav,
		/**por_cislo*/
		por_cislo,
		/**ixp*/
		ixp,
		/**radek_uhr*/
		radek_uhr,
		/**subradek*/
		subradek,
		/**vs*/
		vs,
		/**ks*/
		ks,
		/**ss*/
		ss,
		/**sk_vl*/
		sk_vl,
		/**bu_vl*/
		bu_vl,
		/**sk_ci*/
		sk_ci,
		/**bu_ci*/
		bu_ci,
		/**zp*/
		zp,
		/**ac*/
		ac,
		/**s_uhrp*/
		s_uhrp,
		/**c*/
		c,
		/**c_mena*/
		c_mena,
		/**dat_spl*/
		dat_spl,
		/**typ_ag*/
		typ_ag,
		/**zp_z*/
		zp_z,
		/**hra_pop*/
		hra_pop,
		/**pla_tit*/
		pla_tit,
		/**ico_esu*/
		ico_esu,
		/**nazev*/
		nazev,
		/**lok_nazev*/
		lok_nazev,
		/**sbu*/
		sbu,
		/**upl*/
		upl,
		/**exp_pla*/
		exp_pla,
		/**bu_pop*/
		bu_pop,
		/**inf1*/
		inf1,
		/**inf2*/
		inf2,
		/**bic*/
		bic,
		/**adrban1*/
		adrban1,
		/**adrban2*/
		adrban2,
		/**adrban3*/
		adrban3,
		/**adrban4*/
		adrban4,
		/**adrbanstat*/
		adrbanstat,
		/**adrbanstat_naz*/
		adrbanstat_naz,
		/**adrpri1*/
		adrpri1,
		/**adrpri2*/
		adrpri2,
		/**adrpri3*/
		adrpri3,
		/**adrpri4*/
		adrpri4,
		/**adrpristat*/
		adrpristat,
		/**adrpristat_naz*/
		adrpristat_naz,
		/**mena_txt*/
		mena_txt,
		/**mena_pop_txt*/
		mena_pop_txt,
		/**mena_poz_txt*/
		mena_poz_txt,
		/**mena_bu_txt*/
		mena_bu_txt,
		/**mena_ci_txt*/
		mena_ci_txt,
		/**ixs_esu*/
		ixs_esu,
		/**cs_nazev*/
		cs_nazev,
		/**typ_ban*/
		typ_ban,
		/**popis*/
		popis,
		/**sds*/
		sds,
		/**priz_iban*/
		priz_iban,
		/**err_kod*/
		err_kod,
		/**vastmp*/
		vastmp,
		/**req_id*/
		req_id,
		/**status*/
		status,
		/**dic*/
		dic,
		/**err_txt*/
		err_txt,
		/**pcp*/
		pcp,
		/**dat_spl_ag*/
		dat_spl_ag,
		/**var_kod*/
		var_kod,
		/**uus*/
		uus,
		/**dat_zmena_pep*/
		dat_zmena_pep,
		/**pop_dok*/
		pop_dok,
		/**priz_sepa*/
		priz_sepa,
		/**u_zp*/
		u_zp,
		/**trans_ref*/
		trans_ref,
		/**hash*/
		hash,
		/**payment_id*/
		payment_id,
		/**s_pri_pla*/
		s_pri_pla,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\DavkaPDBPolozka\Dto\Gordic.Buc.Interface.GDavkaPDBPolozkaDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro DavkaPDBPolozka*/
	interface GDavkaPDBPolozkaDto {
		/**ixp_dav*/
		ixp_dav?: string|null;
		/**por_cislo*/
		por_cislo?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**radek_uhr*/
		radek_uhr?: number|null;
		/**subradek*/
		subradek?: number|null;
		/**vs*/
		vs?: string|null;
		/**ks*/
		ks?: string|null;
		/**ss*/
		ss?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**zp*/
		zp?: number|null;
		/**ac*/
		ac?: string|null;
		/**s_uhrp*/
		s_uhrp?: number|null;
		/**c*/
		c?: JsonDecimal|null;
		/**c_mena*/
		c_mena?: JsonDecimal|null;
		/**dat_spl*/
		dat_spl?: JsonDate|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**zp_z*/
		zp_z?: number|null;
		/**hra_pop*/
		hra_pop?: number|null;
		/**pla_tit*/
		pla_tit?: string|null;
		/**ico_esu*/
		ico_esu?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**lok_nazev*/
		lok_nazev?: string|null;
		/**sbu*/
		sbu?: number|null;
		/**upl*/
		upl?: number|null;
		/**exp_pla*/
		exp_pla?: number|null;
		/**bu_pop*/
		bu_pop?: string|null;
		/**inf1*/
		inf1?: string|null;
		/**inf2*/
		inf2?: string|null;
		/**bic*/
		bic?: string|null;
		/**adrban1*/
		adrban1?: string|null;
		/**adrban2*/
		adrban2?: string|null;
		/**adrban3*/
		adrban3?: string|null;
		/**adrban4*/
		adrban4?: string|null;
		/**adrbanstat*/
		adrbanstat?: string|null;
		/**adrbanstat_naz*/
		adrbanstat_naz?: string|null;
		/**adrpri1*/
		adrpri1?: string|null;
		/**adrpri2*/
		adrpri2?: string|null;
		/**adrpri3*/
		adrpri3?: string|null;
		/**adrpri4*/
		adrpri4?: string|null;
		/**adrpristat*/
		adrpristat?: string|null;
		/**adrpristat_naz*/
		adrpristat_naz?: string|null;
		/**mena_txt*/
		mena_txt?: string|null;
		/**mena_pop_txt*/
		mena_pop_txt?: string|null;
		/**mena_poz_txt*/
		mena_poz_txt?: string|null;
		/**mena_bu_txt*/
		mena_bu_txt?: string|null;
		/**mena_ci_txt*/
		mena_ci_txt?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**cs_nazev*/
		cs_nazev?: string|null;
		/**typ_ban*/
		typ_ban?: string|null;
		/**popis*/
		popis?: string|null;
		/**sds*/
		sds?: string|null;
		/**priz_iban*/
		priz_iban?: number|null;
		/**err_kod*/
		err_kod?: number|null;
		/**vastmp*/
		vastmp?: number|null;
		/**req_id*/
		req_id?: number|null;
		/**status*/
		status?: string|null;
		/**dic*/
		dic?: string|null;
		/**err_txt*/
		err_txt?: string|null;
		/**pcp*/
		pcp?: number|null;
		/**dat_spl_ag*/
		dat_spl_ag?: JsonDate|null;
		/**var_kod*/
		var_kod?: number|null;
		/**uus*/
		uus?: string|null;
		/**dat_zmena_pep*/
		dat_zmena_pep?: JsonDate|null;
		/**pop_dok*/
		pop_dok?: string|null;
		/**priz_sepa*/
		priz_sepa?: number|null;
		/**u_zp*/
		u_zp?: number|null;
		/**trans_ref*/
		trans_ref?: string|null;
		/**hash*/
		hash?: string|null;
		/**payment_id*/
		payment_id?: string|null;
		/**s_pri_pla*/
		s_pri_pla?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**
		*     parametry banky
		*     
		*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
		/**s_pri_pla_txt*/
		s_pri_pla_txt?: string|null;
	}
	const enum GDavkaPDBPolozkaDtoNames { ixp_dav = "ixp_dav", por_cislo = "por_cislo", ixp = "ixp", radek_uhr = "radek_uhr", subradek = "subradek", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", zp = "zp", ac = "ac", s_uhrp = "s_uhrp", c = "c", c_mena = "c_mena", dat_spl = "dat_spl", typ_ag = "typ_ag", zp_z = "zp_z", hra_pop = "hra_pop", pla_tit = "pla_tit", ico_esu = "ico_esu", nazev = "nazev", lok_nazev = "lok_nazev", sbu = "sbu", upl = "upl", exp_pla = "exp_pla", bu_pop = "bu_pop", inf1 = "inf1", inf2 = "inf2", bic = "bic", adrban1 = "adrban1", adrban2 = "adrban2", adrban3 = "adrban3", adrban4 = "adrban4", adrbanstat = "adrbanstat", adrbanstat_naz = "adrbanstat_naz", adrpri1 = "adrpri1", adrpri2 = "adrpri2", adrpri3 = "adrpri3", adrpri4 = "adrpri4", adrpristat = "adrpristat", adrpristat_naz = "adrpristat_naz", mena_txt = "mena_txt", mena_pop_txt = "mena_pop_txt", mena_poz_txt = "mena_poz_txt", mena_bu_txt = "mena_bu_txt", mena_ci_txt = "mena_ci_txt", ixs_esu = "ixs_esu", cs_nazev = "cs_nazev", typ_ban = "typ_ban", popis = "popis", sds = "sds", priz_iban = "priz_iban", err_kod = "err_kod", vastmp = "vastmp", req_id = "req_id", status = "status", dic = "dic", err_txt = "err_txt", pcp = "pcp", dat_spl_ag = "dat_spl_ag", var_kod = "var_kod", uus = "uus", dat_zmena_pep = "dat_zmena_pep", pop_dok = "pop_dok", priz_sepa = "priz_sepa", u_zp = "u_zp", trans_ref = "trans_ref", hash = "hash", payment_id = "payment_id", s_pri_pla = "s_pri_pla", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", banka = "banka", s_pri_pla_txt = "s_pri_pla_txt",}
	const enum GDavkaPDBPolozkaDtoFragments { ixp_dav = "main", por_cislo = "main", ixp = "main", radek_uhr = "main", subradek = "main", vs = "main", ks = "main", ss = "main", sk_vl = "main", bu_vl = "main", sk_ci = "main", bu_ci = "main", zp = "main", ac = "main", s_uhrp = "main", c = "main", c_mena = "main", dat_spl = "main", typ_ag = "main", zp_z = "main", hra_pop = "main", pla_tit = "main", ico_esu = "main", nazev = "main", lok_nazev = "main", sbu = "main", upl = "main", exp_pla = "main", bu_pop = "main", inf1 = "main", inf2 = "main", bic = "main", adrban1 = "main", adrban2 = "main", adrban3 = "main", adrban4 = "main", adrbanstat = "main", adrbanstat_naz = "main", adrpri1 = "main", adrpri2 = "main", adrpri3 = "main", adrpri4 = "main", adrpristat = "main", adrpristat_naz = "main", mena_txt = "main", mena_pop_txt = "main", mena_poz_txt = "main", mena_bu_txt = "main", mena_ci_txt = "main", ixs_esu = "main", cs_nazev = "main", typ_ban = "main", popis = "main", sds = "main", priz_iban = "main", err_kod = "main", vastmp = "main", req_id = "main", status = "main", dic = "main", err_txt = "main", pcp = "main", dat_spl_ag = "main", var_kod = "main", uus = "main", dat_zmena_pep = "main", pop_dok = "main", priz_sepa = "main", u_zp = "main", trans_ref = "main", hash = "main", payment_id = "main", s_pri_pla = "main", dat_zmena = "main", zmenu_prov = "main", banka = "*", s_pri_pla_txt = "s_pri_pla_txt",}
	const enum GDavkaPDBPolozkaDtoTypes { ixp_dav = "string", por_cislo = "number", ixp = "string", radek_uhr = "number", subradek = "number", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", zp = "number", ac = "string", s_uhrp = "number", c = "JsonDecimal", c_mena = "JsonDecimal", dat_spl = "JsonDate", typ_ag = "number", zp_z = "number", hra_pop = "number", pla_tit = "string", ico_esu = "string", nazev = "string", lok_nazev = "string", sbu = "number", upl = "number", exp_pla = "number", bu_pop = "string", inf1 = "string", inf2 = "string", bic = "string", adrban1 = "string", adrban2 = "string", adrban3 = "string", adrban4 = "string", adrbanstat = "string", adrbanstat_naz = "string", adrpri1 = "string", adrpri2 = "string", adrpri3 = "string", adrpri4 = "string", adrpristat = "string", adrpristat_naz = "string", mena_txt = "string", mena_pop_txt = "string", mena_poz_txt = "string", mena_bu_txt = "string", mena_ci_txt = "string", ixs_esu = "string", cs_nazev = "string", typ_ban = "string", popis = "string", sds = "string", priz_iban = "number", err_kod = "number", vastmp = "number", req_id = "number", status = "string", dic = "string", err_txt = "string", pcp = "number", dat_spl_ag = "JsonDate", var_kod = "number", uus = "string", dat_zmena_pep = "JsonDate", pop_dok = "string", priz_sepa = "number", u_zp = "number", trans_ref = "string", hash = "string", payment_id = "string", s_pri_pla = "number", dat_zmena = "JsonDate", zmenu_prov = "string", banka = "Gordic.Buc.Interface.GBankaDto", s_pri_pla_txt = "string",}
	const enum GDavkaPDBPolozkaDtoTypeLengths { ixp_dav = 12, ixp = 12, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ac = 20, pla_tit = 10, ico_esu = 14, nazev = 100, lok_nazev = 50, bu_pop = 34, inf1 = 34, inf2 = 34, bic = 20, adrban1 = 35, adrban2 = 35, adrban3 = 35, adrban4 = 35, adrbanstat = 3, adrbanstat_naz = 35, adrpri1 = 35, adrpri2 = 35, adrpri3 = 35, adrpri4 = 35, adrpristat = 3, adrpristat_naz = 35, mena_txt = 3, mena_pop_txt = 3, mena_poz_txt = 3, mena_bu_txt = 3, mena_ci_txt = 3, ixs_esu = 12, cs_nazev = 50, typ_ban = 10, popis = 254, sds = 10, status = 1, dic = 15, err_txt = 254, uus = 10, pop_dok = 254, trans_ref = 254, hash = 254, payment_id = 254, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Init\Gordic.Buc.Interface.GBucGlobalsBase.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Globální parametry pro BUC. Načtené při startu aplikace*/
	interface GBucGlobalsBase {
		/**Nulák PIDu*/
		NulakIxp?: string|null;
		/**Nulák externí subjektu*/
		NulakEsu?: string|null;
		/**Nulák funkce*/
		NulakFun?: string|null;
		/**typy agend zpracovávané v BUC*/
		TypAgPovoleneBuc?: number[]|null;
		/**Způsoby úhrady použité v BUC při generování příkazů k úhradě - serverFilter*/
		ZpPovoleneBuc?: number[]|null;
		/**Seznam směrových kódů bank, podepisující certifikátem celo dávku*/
		BanPodCelDav?: string[]|null;
	}
	const enum GBucGlobalsBaseNames { NulakIxp = "NulakIxp", NulakEsu = "NulakEsu", NulakFun = "NulakFun", TypAgPovoleneBuc = "TypAgPovoleneBuc", ZpPovoleneBuc = "ZpPovoleneBuc", BanPodCelDav = "BanPodCelDav",}
	const enum GBucGlobalsBaseFragments { NulakIxp = "*", NulakEsu = "*", NulakFun = "*", TypAgPovoleneBuc = "*", ZpPovoleneBuc = "*", BanPodCelDav = "*",}
	const enum GBucGlobalsBaseTypes { NulakIxp = "string", NulakEsu = "string", NulakFun = "string", TypAgPovoleneBuc = "number[]", ZpPovoleneBuc = "number[]", BanPodCelDav = "string[]",}
	const enum GBucGlobalsBaseTypeLengths {}
}
declare namespace Gordic.Buc.Interface.GBucGlobalsBase {
	/**Stavy bankovního výpisu - BUCCBVY*/
	const enum SBvy {
		/**neurčeno*/
		Neurceno=0,
		/**podán*/
		Podan=10,
		/**nevyrovnán*/
		Nevyrovnan=20,
		/**vyrovnán*/
		Vyrovnan=30,
		/**nespárován*/
		Nesparovan=35,
		/**nespárován na expozituře*/
		NesparovanExpozitura=37,
		/**spárován*/
		Sparovan=40,
		/**spárován*/
		SparovanExpozitura=42,
		/**uzavřen*/
		Uzavren=50,
		/**stornován*/
		Stornovan=80,
		/**zrušen*/
		Zrusen=90,
	}
	/**Stavy položky výpisu - BUCCSPO*/
	const enum SPol {
		/**pořízena*/
		Porizena=10,
		/**rozpis nevyrovnán*/
		RozpisNevyrovnan=12,
		/**předpárována pro lokalitu*/
		PredparovanaProLokalitu=14,
		/**spárována automaticky*/
		SparovanaAutomaticky=20,
		/**spárována manuálně*/
		SparovanaManualne=25,
		/**spárována rozpisem položky*/
		SparovanaRozpisem=27,
		/**spárována do účetnictví*/
		SparovanaDoUct=30,
		/**spárována do FUC*/
		SparovanaDoFuc=35,
		/**nespárována*/
		Nesparovana=40,
		/**nespárována - nalez. více protihodnot*/
		NesparovanaViceHodnot=45,
		/**nespárována-zrušena*/
		NesparovanaZrusena=50,
		/**vyřazena*/
		Vyrazena=90,
	}
	/**Stavy předpisu platby v BUCDPEP - BUCCUHR*/
	const enum SUhrp {
		/**storno*/
		Storno=0,
		/**storno - platba nevyzvednuta*/
		StornoNevyzvednuta=4,
		/**storno - platba neprovedena*/
		StornoNeprovedena=5,
		/**neschválený návrh k úhradě*/
		NeschvalenyNavrh=6,
		/**předáno*/
		Predano=7,
		/**návrh k úhradě*/
		Navrh=8,
		/**návrh k úhradě IISSP*/
		NavrhIissp=9,
		/**k úhradě*/
		KUhrade=10,
		/**schválen*/
		Schvalen=11,
		/**zpracování nepotvrzeno*/
		ZpracovaniNepotvrzeno=15,
		/**pozastavena*/
		Pozastavena=20,
		/**pozastavena trvale*/
		PozastavenaTrvale=22,
		/**storno banky - vráceno agendě*/
		StornoBanky=23,
		/**příkaz odeslán do banky*/
		OdeslanDoBanky=25,
		/**částečně spárována*/
		SparovanCastecne=27,
		/**uhrazen*/
		Uhrazen=30,
		/**nespárována*/
		Nesparovan=35,
		/**spárována*/
		Sparovan=40,
		/**k zaúčtování*/
		KZauctovani=50,
		/**zaúčtována*/
		Zauctovana=60,
	}
	/**Kategorie typu dokladu - GINCKAT*/
	const enum KtgTypDok {
		/**dobropis*/
		Dobropis=1310,
		/**příkaz k úhradě hromadný*/
		PrikazKUhradeHromadny=1710,
		/**externí platba*/
		ExterniPlatba=1715,
		/**externí platba - rezervace IISSP*/
		ExterniPlatbaIISSP=1716,
		/**výpis z bankovníh*/
		BankovniVypis=1760,
		/**přepárování plateb z uzavřených období*/
		PreparovaniUzavObdobi=1765,
		/**pokladní výpis*/
		PokladniVypis=1770,
		/**dávka příkazů do banky*/
		DavkaPrikazu=1775,
		/**vžpis složenek typu H*/
		SlozenkaTypuH=1780,
		/**doklad nespárovaných plateb - výdej*/
		NesparovanaVydej=1791,
		/**doklad nespárovaných plateb - příjem*/
		NesparovanaPrijem=1792,
		/**doklad nespárovaných plateb - výdej daňový*/
		NesparovanaVydejDan=1793,
		/**doklad nespárovaných plateb - příjem daňový*/
		NesparovanaPrijemDan=1794,
		/**jednostranný zápočtový list*/
		ZapocetJednostranny=1795,
		/**oboustranný zápočtový list*/
		ZapocetOboustranny=1796,
	}
	/**Kategorie knihy*/
	const enum KtgDen {
		/**kniha bankovních výpisů*/
		BankovniVypisy=1700,
		/**kniha hotovostních párovacích výpisů*/
		HotovostniParovaciVypisy=1710,
		/**kniha zápočtových listů*/
		ZapoctoveListy=1720,
		/**kniha nevypárovaných bankovních dokladů*/
		NevyparovaneBankovniDoklady=1790,
	}
	/**Typy agend - GINCTAG*/
	const enum TypAg {
		/**UCT*/
		UCT=40,
		/**ROZ*/
		ROZ=50,
		/**KDF*/
		KDF=70,
		/**KOF*/
		KOF=80,
		/**POK*/
		POK=90,
		/**BUC*/
		BUC=100,
		/**POU*/
		POU=180,
		/**PRE*/
		PRE=230,
		/**EXP*/
		EXP=270,
		/**INT*/
		INT=300,
		/**FUC*/
		FUC=330,
		/**DDP*/
		DDP=350,
		/**PRR*/
		PRR=410,
		/**PAM*/
		PAM=430,
		/**SOC*/
		SOC=490,
		/**STU*/
		STU=500,
		/**RCN*/
		RCN=700,
	}
	/**Typy objektů*/
	const enum TypObj {
		/**typ dokumentu*/
		TypDokumentu=680,
		/**bankovní výpis*/
		BankovniVypis=435,
	}
	/**Způsoby úhrady položek bankovního výpisu - EKOCZUH*/
	const enum Zu {
		/**převodem*/
		Prevodem=0,
		/**hotově*/
		Hotove=10,
		/**kartou*/
		Kartou=20,
		/**vratka B*/
		VratkaB=30,
		/**úrok z prodlení*/
		UrokZProdleni=40,
		/**jistina*/
		Jistina=50,
		/**kompenzace*/
		Kompenzace=60,
		/**Náklady PPB*/
		Naklady_PPB=70,
		/**Fiktivní pohledávka 3.straně*/
		FikPohlTretiStrane=80,
		/**Platba PP AV*/
		PlatbaPPAV=90,
	}
	/**Aktivita subřady deníku*/
	const enum AktSub {
		/**subřada deníku je otevřena*/
		Otevrena=100,
		/**subřada deníku je připravena k uzavření*/
		PripravenaKUzavreni=300,
		/**subřada deníku je uzavřena a neodlita - znemožnit pořizování nových dokladů do tohoto deníku*/
		UzavrenaNeodlita=400,
		/**subřada deníku je uzavřena a odlita - znemožnit pořizování nových dokladů do tohoto deníku*/
		UzavrenaOdlita=500,
	}
	/**příznak archivní db*/
	const enum ArcDB {
		/**živá DB*/
		DbLife=10,
		/**archivní DB - zákaz modifikace*/
		DbArc=20,
	}
	/**typ bankovního výpisu - BUCCTYV*/
	const enum TypBanVypisu {
		/**Výpis běžného roku*/
		VypisBeznehoRoku=0,
		/**Dodatkový výpis*/
		DodatkovyVypis=10,
	}
	/**Způsob úhrady*/
	const enum Zp {
		/**Hotově*/
		HO=10,
		/**Hromadný příkaz*/
		HP=20,
		/**Jednoduchý příkaz*/
		JP=30,
		/**Zahraniční šek*/
		ZSE=32,
		/**Hromadné inkaso - neexistuje v číselníku*/
		HI=35,
		/**Inkaso*/
		IN=40,
		/**Externí příkaz*/
		EP=41,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Init\Gordic.Buc.Interface.GBucSeznamTpepDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Společný předek seznamového DTO se sloupce z tabulky BUCDPEP/BUCTPEP*/
	interface GBucSeznamTpepDto extends Gordic.Buc.Interface.GBucSeznamDto {
		/**sloupec duct_uncheck (fucduct.uncheck)*/
		tpep_kind?: number|null;
		/**zaškrtnutí příkazů*/
		tpep_check?: boolean|null;
		/**text chyby/varování*/
		tpep_txt_err?: string|null;
		/**Je záznam zašrtnutý?*/
		readonly IsChecked?: boolean|null;
	}
	const enum GBucSeznamTpepDtoNames { tpep_kind = "tpep_kind", tpep_check = "tpep_check", tpep_txt_err = "tpep_txt_err", IsChecked = "IsChecked", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GBucSeznamTpepDtoFragments { tpep_kind = "*", tpep_check = "*", tpep_txt_err = "*", IsChecked = "*", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GBucSeznamTpepDtoTypes { tpep_kind = "number", tpep_check = "boolean", tpep_txt_err = "string", IsChecked = "boolean", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GBucSeznamTpepDtoTypeLengths {}
	/**DTO s výsledkem hromadné operace pouštěné nad tabulkou BUCTPEP*/
	interface GBucVyslHromTpepDto {
		/**celkový počet záznamů*/
		pocet_celk?: number|null;
		/**počet záznamů bez chyb*/
		pocet_ok?: number|null;
	}
	const enum GBucVyslHromTpepDtoNames { pocet_celk = "pocet_celk", pocet_ok = "pocet_ok",}
	const enum GBucVyslHromTpepDtoFragments { pocet_celk = "*", pocet_ok = "*",}
	const enum GBucVyslHromTpepDtoTypes { pocet_celk = "number", pocet_ok = "number",}
	const enum GBucVyslHromTpepDtoTypeLengths {}
	/**DTO s výsledkem kontroly hromadné operace pouštěné nad tabulkou BUCTPEP*/
	interface GBucVyslHromKontrTpepDto {
		/**výsledek kontroly (true = v pořádku, false = chyba)*/
		vysl?: boolean|null;
		/**text chyby*/
		errTxt?: string|null;
		/**text potvrzovací otázky (pokud nebyla zjištěna chyba)*/
		textOtazky?: string|null;
	}
	const enum GBucVyslHromKontrTpepDtoNames { vysl = "vysl", errTxt = "errTxt", textOtazky = "textOtazky",}
	const enum GBucVyslHromKontrTpepDtoFragments { vysl = "*", errTxt = "*", textOtazky = "*",}
	const enum GBucVyslHromKontrTpepDtoTypes { vysl = "boolean", errTxt = "string", textOtazky = "string",}
	const enum GBucVyslHromKontrTpepDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Init\Dto\GBucGlobalsDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Globální proměnné BUC*/
	interface GBucGlobalsDto {
		/**UUS pro genervání příkazů*/
		UusGen: string;
		/**UUS pro výběr příkazů - naformátovány pro podmínku in: UUS1,UUS2*/
		UusMas: string;
		/**počet dostupných UUS*/
		UusPoc: number;
		/**UUS pro práci s platbami*/
		UusArr: string[];
		/**Příznak pro řízení předpisů plateb dle UUS - podle vyhodnocení parametru UUS ( prázdný = 0, naplněn = 1*/
		RppUus: number;
		/**Nastavení příznaku pro řízení aktivních operací v režimu jeden BÚ pro více účtáren - permission*/
		bAktOper1BU: boolean;
		/**množina typů pohledávek DDP, pro které se bude kontrolovat rezervace IISSP při párování příjmu*/
		KRTPDDPArr: string[];
	}
	const enum GBucGlobalsDtoNames { UusGen = "UusGen", UusMas = "UusMas", UusPoc = "UusPoc", UusArr = "UusArr", RppUus = "RppUus", bAktOper1BU = "bAktOper1BU", KRTPDDPArr = "KRTPDDPArr",}
	const enum GBucGlobalsDtoFragments { UusGen = "*", UusMas = "*", UusPoc = "*", UusArr = "*", RppUus = "*", bAktOper1BU = "*", KRTPDDPArr = "*",}
	const enum GBucGlobalsDtoTypes { UusGen = "string", UusMas = "string", UusPoc = "number", UusArr = "string[]", RppUus = "number", bAktOper1BU = "boolean", KRTPDDPArr = "string[]",}
	const enum GBucGlobalsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Init\Dto\Gordic.Buc.Interface.GBucSeznamDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Společný předek seznamového DTO*/
	interface GBucSeznamDto {
		/**Primární klíč tabulky (sloupce oddělené čárkami)*/
		readonly PrimaryKey?: string|null;
		/**Primární klíč tabulky v položkách filtrů (sloupce oddělené čárkami)*/
		readonly PrimaryKeyInFilters?: string|null;
	}
	const enum GBucSeznamDtoNames { PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GBucSeznamDtoFragments { PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GBucSeznamDtoTypes { PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GBucSeznamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Nastroje\IGParametrySlozenek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Parametry složenek
	* @domain Banka
	*/
	interface BucParametrySlozenek {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GParametrySlozenekDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GParametrySlozenekDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GParametrySlozenekDto>,GServiceReadResponse<Gordic.Buc.Interface.GParametrySlozenekDto>>;
		/**Upsert*/
		upsert(rq?:Gordic.Buc.Interface.GParametrySlozenekSaveReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GParametrySlozenekSaveReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GParametrySlozenekSaveReqDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucParametrySlozenek: ServiceBase & Catalog.BucParametrySlozenek;
	}
	const BucParametrySlozenek: Client["BucParametrySlozenek"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu Parametry složenek*/
	const enum GParametrySlozenekFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Nastroje\IGSablonaLikvidaceFuc.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Definiční tabulka-šablona pro automatickou likvidaci nespárovaných plateb do FUC
	* @domain Banka
	*/
	interface BucSablonaLikvidaceFuc {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GSablonaLikvidaceFucPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GSablonaLikvidaceFucPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GSablonaLikvidaceFucPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GSablonaLikvidaceFucDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GSablonaLikvidaceFucDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucSablonaLikvidaceFuc: ServiceBase & Catalog.BucSablonaLikvidaceFuc;
	}
	const BucSablonaLikvidaceFuc: Client["BucSablonaLikvidaceFuc"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu definiční tabulka-šablona pro automatickou likvidaci nespárovaných plateb do FUC*/
	const enum GSablonaLikvidaceFucFilter {
		/**id_sablona*/
		id_sablona,
		/**vs_od*/
		vs_od,
		/**vs_do*/
		vs_do,
		/**ss_od*/
		ss_od,
		/**ss_do*/
		ss_do,
		/**sk_vl*/
		sk_vl,
		/**bu_vl*/
		bu_vl,
		/**typ_pla*/
		typ_pla,
		/**priz_char*/
		priz_char,
		/**aktivita*/
		aktivita,
		/**ktg_typ*/
		ktg_typ,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Nastroje\IGSazbaPPB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Poštovní sazby pro poštovní poukázky B
	* @domain Banka
	*/
	interface BucSazbaPPB {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GSazbaPPBDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucSazbaPPB: ServiceBase & Catalog.BucSazbaPPB;
	}
	const BucSazbaPPB: Client["BucSazbaPPB"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu pro poštovní sazby pro poštovní poukázky B*/
	const enum GSazbaPPBFilter {
		/**Nazev*/
		nazev,
		/**Datum počátku platnosti záznamu*/
		dat_od,
		/**Datum konce platnosti záznamu*/
		dat_do,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Nastroje\Dto\GParametrySlozenekDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucspas
	*      Parametry složenek
	*/
	interface GParametrySlozenekDto {
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**sm. kód účtu pošty*/
		sk_po?: string|null;
		/**účet pošty*/
		bu_po?: string|null;
		/**ks pošty*/
		ks_po?: string|null;
		/**ss pošty*/
		ss_po?: string|null;
		/**číslo podavatele*/
		cis_pod?: string|null;
		/**pořadové číslo vds*/
		vds?: string|null;
		/**způsob placení*/
		zpu_pla?: string|null;
		/**sk účtu sazeb*/
		sk_sa?: string|null;
		/**účet pro sazby*/
		bu_sa?: string|null;
		/**ks sazeb*/
		ks_sa?: string|null;
		/**vs sazeb*/
		vs_sa?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		ixs_esu_po?: string|null;
		/**aktuální číslo VDS v rámci dne*/
		vds_akt?: string|null;
		/**aktuální datum pro VDS*/
		dat_akt?: JsonDate|null;
	}
	const enum GParametrySlozenekDtoNames { ico = "ico", ucs = "ucs", uus = "uus", sk_po = "sk_po", bu_po = "bu_po", ks_po = "ks_po", ss_po = "ss_po", cis_pod = "cis_pod", vds = "vds", zpu_pla = "zpu_pla", sk_sa = "sk_sa", bu_sa = "bu_sa", ks_sa = "ks_sa", vs_sa = "vs_sa", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_esu_po = "ixs_esu_po", vds_akt = "vds_akt", dat_akt = "dat_akt",}
	const enum GParametrySlozenekDtoFragments { ico = "*", ucs = "*", uus = "*", sk_po = "*", bu_po = "*", ks_po = "*", ss_po = "*", cis_pod = "*", vds = "*", zpu_pla = "*", sk_sa = "*", bu_sa = "*", ks_sa = "*", vs_sa = "*", dat_zmena = "*", zmenu_prov = "*", ixs_esu_po = "*", vds_akt = "*", dat_akt = "*",}
	const enum GParametrySlozenekDtoTypes { ico = "string", ucs = "string", uus = "string", sk_po = "string", bu_po = "string", ks_po = "string", ss_po = "string", cis_pod = "string", vds = "string", zpu_pla = "string", sk_sa = "string", bu_sa = "string", ks_sa = "string", vs_sa = "string", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_esu_po = "string", vds_akt = "string", dat_akt = "JsonDate",}
	const enum GParametrySlozenekDtoTypeLengths { ico = 10, ucs = 10, uus = 10, sk_po = 11, bu_po = 34, ks_po = 12, ss_po = 12, cis_pod = 6, vds = 2, zpu_pla = 1, sk_sa = 11, bu_sa = 34, ks_sa = 12, vs_sa = 12, zmenu_prov = 12, ixs_esu_po = 12, vds_akt = 2,}
	/**Dto pro upsert parametrů složenek*/
	interface GParametrySlozenekSaveReqDto {
		/**Identifikátor pošty*/
		ixs_esu_po?: string|null;
		/**účet pošty*/
		bu_po?: string|null;
		/**sm. kód účtu pošty*/
		sk_po?: string|null;
		/**ss pošty*/
		ss_po?: string|null;
		/**ks pošty*/
		ks_po?: string|null;
		/**číslo podavatele*/
		cis_pod?: string|null;
		/**pořadové číslo vds*/
		vds?: string|null;
		/**způsob placení*/
		zpu_pla?: string|null;
		/**účet pro sazby*/
		bu_sa?: string|null;
		/**sk účtu sazeb*/
		sk_sa?: string|null;
		/**ks sazeb*/
		ks_sa?: string|null;
	}
	const enum GParametrySlozenekSaveReqDtoNames { ixs_esu_po = "ixs_esu_po", bu_po = "bu_po", sk_po = "sk_po", ss_po = "ss_po", ks_po = "ks_po", cis_pod = "cis_pod", vds = "vds", zpu_pla = "zpu_pla", bu_sa = "bu_sa", sk_sa = "sk_sa", ks_sa = "ks_sa",}
	const enum GParametrySlozenekSaveReqDtoFragments { ixs_esu_po = "*", bu_po = "*", sk_po = "*", ss_po = "*", ks_po = "*", cis_pod = "*", vds = "*", zpu_pla = "*", bu_sa = "*", sk_sa = "*", ks_sa = "*",}
	const enum GParametrySlozenekSaveReqDtoTypes { ixs_esu_po = "string", bu_po = "string", sk_po = "string", ss_po = "string", ks_po = "string", cis_pod = "string", vds = "string", zpu_pla = "string", bu_sa = "string", sk_sa = "string", ks_sa = "string",}
	const enum GParametrySlozenekSaveReqDtoTypeLengths { ixs_esu_po = 12, bu_po = 34, sk_po = 11, ss_po = 12, ks_po = 12, cis_pod = 6, vds = 2, zpu_pla = 1, bu_sa = 34, sk_sa = 11, ks_sa = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Nastroje\Dto\GSablonaLikvidaceFucDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Definiční tabulka-šablona pro automatickou likvidaci nespárovaných plateb do FUC*/
	interface GSablonaLikvidaceFucDto {
		id_sablona?: number|null;
		vs_od?: JsonDecimal|null;
		vs_do?: JsonDecimal|null;
		ss_od?: JsonDecimal|null;
		ss_do?: JsonDecimal|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		/**IČO - Identifikační číslo vlastní - IČO zpracující organizace*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní - UCS zpracující organizace*/
		ucs?: string|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		/**Aktivita záznamu dle gincakt*/
		aktivita?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Kategorie typu dokumentu*/
		ktg_typ?: number|null;
		typ_upr_hla?: string|null;
		typ_upr_poh?: string|null;
		ktg_upo_pre?: number|null;
		/**Funkční místo*/
		ixs_fun?: string|null;
		priz_char?: number|null;
		typ_pla?: number|null;
		/**SU - Syntetický účet*/
		uea?: string|null;
		/**AU - Analytický účet*/
		ueb?: string|null;
		/**ZDR - Zdroj*/
		uec?: string|null;
		/**ODPA - Paragraf*/
		ued?: string|null;
		/**POL - Položka*/
		uee?: string|null;
		/**ZJ - Záznamová jednotka*/
		uef?: string|null;
		/**UZ - Účelový znak*/
		ueg?: string|null;
		/**POPA - Podpararagraf*/
		ueh?: string|null;
		/**FIN - Financování*/
		uei?: string|null;
		/**PRJ - Projekt*/
		uej?: string|null;
		/**ORJ - ORJ*/
		te0?: string|null;
		/**ORG - ORG*/
		te1?: string|null;
		/**COR - Cílově orientované rozpočtování*/
		te2?: string|null;
		/**KZ - Konsolidační záznam*/
		te3?: string|null;
		/**UKO - Úkol*/
		te4?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**NKS - Nákladové středisko vlastní - NKS zpracující organizace*/
		nks?: string|null;
		uea_upo?: string|null;
		ueb_upo?: string|null;
		uec_upo?: string|null;
		ued_upo?: string|null;
		uee_upo?: string|null;
		uef_upo?: string|null;
		ueg_upo?: string|null;
		ueh_upo?: string|null;
		uei_upo?: string|null;
		uej_upo?: string|null;
		te0_upo?: string|null;
		te1_upo?: string|null;
		te2_upo?: string|null;
		te3_upo?: string|null;
		te4_upo?: string|null;
		uek?: string|null;
		uel?: string|null;
		uem?: string|null;
		uen?: string|null;
		te5?: string|null;
		te6?: string|null;
		te7?: string|null;
		te8?: string|null;
		te9?: string|null;
		uek_upo?: string|null;
		uel_upo?: string|null;
		uem_upo?: string|null;
		uen_upo?: string|null;
		te5_upo?: string|null;
		te6_upo?: string|null;
		te7_upo?: string|null;
		te8_upo?: string|null;
		te9_upo?: string|null;
		/**Vlastní bankovní účet složený*/
		ucet_vl?: string|null;
		/**typ_upr_hla - textově*/
		typ_upr_hla_txt?: string|null;
		/**typ_upr_poh - textově*/
		typ_upr_poh_txt?: string|null;
		/**ktg_upo_pre - textově*/
		ktg_upo_pre_txt?: string|null;
		/**Funkční místo - textově*/
		ixs_fun_txt?: string|null;
		/**Kategorie typu dokumentu - textově*/
		ktg_typ_txt?: string|null;
		/**typ_pla_txt - textově*/
		typ_pla_txt?: string|null;
		/**priz_char_txt - textově*/
		priz_char_txt?: string|null;
	}
	const enum GSablonaLikvidaceFucDtoNames { id_sablona = "id_sablona", vs_od = "vs_od", vs_do = "vs_do", ss_od = "ss_od", ss_do = "ss_do", sk_vl = "sk_vl", bu_vl = "bu_vl", lic = "lic", ico = "ico", ucs = "ucs", uus = "uus", aktivita = "aktivita", nazev = "nazev", ktg_typ = "ktg_typ", typ_upr_hla = "typ_upr_hla", typ_upr_poh = "typ_upr_poh", ktg_upo_pre = "ktg_upo_pre", ixs_fun = "ixs_fun", priz_char = "priz_char", typ_pla = "typ_pla", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nks = "nks", uea_upo = "uea_upo", ueb_upo = "ueb_upo", uec_upo = "uec_upo", ued_upo = "ued_upo", uee_upo = "uee_upo", uef_upo = "uef_upo", ueg_upo = "ueg_upo", ueh_upo = "ueh_upo", uei_upo = "uei_upo", uej_upo = "uej_upo", te0_upo = "te0_upo", te1_upo = "te1_upo", te2_upo = "te2_upo", te3_upo = "te3_upo", te4_upo = "te4_upo", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", uek_upo = "uek_upo", uel_upo = "uel_upo", uem_upo = "uem_upo", uen_upo = "uen_upo", te5_upo = "te5_upo", te6_upo = "te6_upo", te7_upo = "te7_upo", te8_upo = "te8_upo", te9_upo = "te9_upo", ucet_vl = "ucet_vl", typ_upr_hla_txt = "typ_upr_hla_txt", typ_upr_poh_txt = "typ_upr_poh_txt", ktg_upo_pre_txt = "ktg_upo_pre_txt", ixs_fun_txt = "ixs_fun_txt", ktg_typ_txt = "ktg_typ_txt", typ_pla_txt = "typ_pla_txt", priz_char_txt = "priz_char_txt",}
	const enum GSablonaLikvidaceFucDtoFragments { id_sablona = "*", vs_od = "*", vs_do = "*", ss_od = "*", ss_do = "*", sk_vl = "*", bu_vl = "*", lic = "*", ico = "*", ucs = "*", uus = "*", aktivita = "*", nazev = "*", ktg_typ = "*", typ_upr_hla = "*", typ_upr_poh = "*", ktg_upo_pre = "*", ixs_fun = "*", priz_char = "*", typ_pla = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", dat_zmena = "*", zmenu_prov = "*", nks = "*", uea_upo = "*", ueb_upo = "*", uec_upo = "*", ued_upo = "*", uee_upo = "*", uef_upo = "*", ueg_upo = "*", ueh_upo = "*", uei_upo = "*", uej_upo = "*", te0_upo = "*", te1_upo = "*", te2_upo = "*", te3_upo = "*", te4_upo = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", uek_upo = "*", uel_upo = "*", uem_upo = "*", uen_upo = "*", te5_upo = "*", te6_upo = "*", te7_upo = "*", te8_upo = "*", te9_upo = "*", ucet_vl = "*", typ_upr_hla_txt = "*", typ_upr_poh_txt = "*", ktg_upo_pre_txt = "*", ixs_fun_txt = "*", ktg_typ_txt = "*", typ_pla_txt = "*", priz_char_txt = "*",}
	const enum GSablonaLikvidaceFucDtoTypes { id_sablona = "number", vs_od = "JsonDecimal", vs_do = "JsonDecimal", ss_od = "JsonDecimal", ss_do = "JsonDecimal", sk_vl = "string", bu_vl = "string", lic = "string", ico = "string", ucs = "string", uus = "string", aktivita = "number", nazev = "string", ktg_typ = "number", typ_upr_hla = "string", typ_upr_poh = "string", ktg_upo_pre = "number", ixs_fun = "string", priz_char = "number", typ_pla = "number", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", dat_zmena = "JsonDate", zmenu_prov = "string", nks = "string", uea_upo = "string", ueb_upo = "string", uec_upo = "string", ued_upo = "string", uee_upo = "string", uef_upo = "string", ueg_upo = "string", ueh_upo = "string", uei_upo = "string", uej_upo = "string", te0_upo = "string", te1_upo = "string", te2_upo = "string", te3_upo = "string", te4_upo = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", uek_upo = "string", uel_upo = "string", uem_upo = "string", uen_upo = "string", te5_upo = "string", te6_upo = "string", te7_upo = "string", te8_upo = "string", te9_upo = "string", ucet_vl = "string", typ_upr_hla_txt = "string", typ_upr_poh_txt = "string", ktg_upo_pre_txt = "string", ixs_fun_txt = "string", ktg_typ_txt = "string", typ_pla_txt = "string", priz_char_txt = "string",}
	const enum GSablonaLikvidaceFucDtoTypeLengths { sk_vl = 11, bu_vl = 34, lic = 4, ico = 10, ucs = 10, uus = 10, nazev = 50, typ_upr_hla = 15, typ_upr_poh = 15, ixs_fun = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 16, te0 = 20, te1 = 16, te2 = 20, te3 = 6, te4 = 12, zmenu_prov = 12, nks = 12, uea_upo = 3, ueb_upo = 4, uec_upo = 12, ued_upo = 12, uee_upo = 12, uef_upo = 3, ueg_upo = 16, ueh_upo = 4, uei_upo = 4, uej_upo = 16, te0_upo = 20, te1_upo = 16, te2_upo = 20, te3_upo = 6, te4_upo = 12, uek = 6, uel = 10, uem = 10, uen = 6, te5 = 30, te6 = 12, te7 = 20, te8 = 12, te9 = 20, uek_upo = 6, uel_upo = 10, uem_upo = 10, uen_upo = 6, te5_upo = 30, te6_upo = 12, te7_upo = 20, te8_upo = 12, te9_upo = 20,}
	/**Dto primárních klíčů položky definiční tabulka-šablona pro automatickou likvidaci nespárovaných plateb do FUC*/
	interface GSablonaLikvidaceFucPKDto {
		id_sablona?: number|null;
	}
	const enum GSablonaLikvidaceFucPKDtoNames { id_sablona = "id_sablona",}
	const enum GSablonaLikvidaceFucPKDtoFragments { id_sablona = "*",}
	const enum GSablonaLikvidaceFucPKDtoTypes { id_sablona = "number",}
	const enum GSablonaLikvidaceFucPKDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Nastroje\Dto\GSazbaPPBDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucssaz
	*      Poštovní sazby pro poštovní poukázky B
	*/
	interface GSazbaPPBDto {
		/**Název sazby*/
		nazev?: string|null;
		c_saz?: JsonDecimal|null;
		c_do?: JsonDecimal|null;
		/**Typ sazby*/
		typ_saz?: string|null;
		/**Datum počátku platnosti záznamu*/
		dat_od?: JsonDate|null;
		/**Datum konce platnosti záznamu*/
		dat_do?: JsonDate|null;
	}
	const enum GSazbaPPBDtoNames { nazev = "nazev", c_saz = "c_saz", c_do = "c_do", typ_saz = "typ_saz", dat_od = "dat_od", dat_do = "dat_do",}
	const enum GSazbaPPBDtoFragments { nazev = "*", c_saz = "*", c_do = "*", typ_saz = "*", dat_od = "*", dat_do = "*",}
	const enum GSazbaPPBDtoTypes { nazev = "string", c_saz = "JsonDecimal", c_do = "JsonDecimal", typ_saz = "string", dat_od = "JsonDate", dat_do = "JsonDate",}
	const enum GSazbaPPBDtoTypeLengths { nazev = 50, typ_saz = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Ostatni\Gordic.Buc.Interface.GBucWflDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro GBucWfl*/
	interface GBucWflDto {
		/**lic*/
		lic?: string|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**s_ele*/
		s_ele?: number|null;
		/**s_fyz*/
		s_fyz?: number|null;
		/**s_sgn*/
		s_sgn?: number|null;
		/**uzo*/
		uzo?: string|null;
		/**spis_pl*/
		spis_pl?: string|null;
		/**spis_znak*/
		spis_znak?: string|null;
		/**ixs_fun_wfl*/
		ixs_fun_wfl?: string|null;
		/**ixs_su_wfl*/
		ixs_su_wfl?: string|null;
		/**ixs_lpc*/
		ixs_lpc?: string|null;
		/**puvod*/
		puvod?: number|null;
		/**umisteni*/
		umisteni?: string|null;
		/**st_utaj_id*/
		st_utaj_id?: number|null;
		/**poc_listu*/
		poc_listu?: string|null;
		/**poc_stran*/
		poc_stran?: number|null;
		/**poc_kop*/
		poc_kop?: number|null;
		/**poc_priloh*/
		poc_priloh?: number|null;
		/**poc_l_priloh*/
		poc_l_priloh?: string|null;
		/**ico*/
		ico?: string|null;
		/**status_pis*/
		status_pis?: number|null;
		/**Mód zjištění PID 1- generování PID*/
		gen_mode?: number|null;
		/**Commit po tvorbě IXP v SPL 1 -Ano*/
		com_mode_pid?: number|null;
	}
	const enum GBucWflDtoNames { lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", s_sgn = "s_sgn", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", ixs_su_wfl = "ixs_su_wfl", ixs_lpc = "ixs_lpc", puvod = "puvod", umisteni = "umisteni", st_utaj_id = "st_utaj_id", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", ico = "ico", status_pis = "status_pis", gen_mode = "gen_mode", com_mode_pid = "com_mode_pid",}
	const enum GBucWflDtoFragments { lic = "main", ixs_fun_akt = "main", ixs_su_akt = "main", nazev = "main", typ_ag = "main", ktg_typ = "main", ixs_typ = "main", zmenu_prov = "main", s_ele = "main", s_fyz = "main", s_sgn = "main", uzo = "main", spis_pl = "main", spis_znak = "main", ixs_fun_wfl = "main", ixs_su_wfl = "main", ixs_lpc = "main", puvod = "main", umisteni = "main", st_utaj_id = "main", poc_listu = "main", poc_stran = "main", poc_kop = "main", poc_priloh = "main", poc_l_priloh = "main", ico = "main", status_pis = "main", gen_mode = "*", com_mode_pid = "*",}
	const enum GBucWflDtoTypes { lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", zmenu_prov = "string", s_ele = "number", s_fyz = "number", s_sgn = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", ixs_su_wfl = "string", ixs_lpc = "string", puvod = "number", umisteni = "string", st_utaj_id = "number", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", ico = "string", status_pis = "number", gen_mode = "number", com_mode_pid = "number",}
	const enum GBucWflDtoTypeLengths { lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, nazev = 100, ixs_typ = 12, zmenu_prov = 12, uzo = 1, spis_pl = 5, spis_znak = 50, ixs_fun_wfl = 12, ixs_su_wfl = 12, ixs_lpc = 12, umisteni = 20, poc_listu = 4, poc_l_priloh = 5, ico = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Ostatni\Gordic.Buc.Interface.IGBuctpep.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Ostatni\Gordic.Buc.Interface.IGPomocne.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Společné parametry (hromadné) BUCové operace*/
	interface GBucOperationDto<TDto> {
		/**aktuální IKC*/
		ikc?: Gordic.General.GIkc|null;
		/**záznamy pro (hromadnou) operaci*/
		rows?: TDto[]|null;
	}
	const enum GBucOperationDtoNames { ikc = "ikc", rows = "rows",}
	const enum GBucOperationDtoFragments { ikc = "*", rows = "*",}
	const enum GBucOperationDtoTypes { ikc = "Gordic.General.GIkc", rows = "TDto[]",}
	const enum GBucOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Ostatni\IGHledani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Hledání záznamů
	* @domain Banka
	*/
	interface BucHledani {
		/**Vrátí informace o nalezeném "pidu". Použité pro obecné hledací políčko (GPidSearchResolver).*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucHledani: ServiceBase & Catalog.BucHledani;
	}
	const BucHledani: Client["BucHledani"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\ParovaciZapisy\IGParovaciZapisy.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Párovací zápisy
	* @domain Banka
	*/
	interface BucParovaciZapisy {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GParovaciZapisyReadReqDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GParovaciZapisyReadReqDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GParovaciZapisyReadReqDto>,GServiceReadResponse<Gordic.Buc.Interface.GParovaciZapisyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GParovaciZapisyDto>>;
		/**Kontrola párovacích zápisů před storno (případně odstorno)*/
		zkontrolujPredStorno(rq?:Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GParovaciZapisyDto>>;
		/**Hromadné storno (případně odstorno) párovacích zápisů*/
		hromadneStornovat(rq?:Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GParovaciZapisyDto>>;
		/**Kontrola párovacích zápisů před odstraněním*/
		zkontrolujPredOdstranit(rq?:Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GParovaciZapisyDto>>;
		/**Hromadné odstranění párovacích zápisů*/
		hromadneOdstranit(rq?:Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GParovaciZapisyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GParovaciZapisyDto>>;
		/**Vrátí oprávnění párovacích zápisů*/
		getServicePermissions(rq?:CallParams<{rezim:Gordic.Buc.Interface.GParovaciZapisyRezim}>): _Task<{rezim:Gordic.Buc.Interface.GParovaciZapisyRezim},Gordic.Buc.Interface.GParovaciZapisyServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucParovaciZapisy: ServiceBase & Catalog.BucParovaciZapisy;
	}
	const BucParovaciZapisy: Client["BucParovaciZapisy"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu párovacích zápisů*/
	const enum GParovaciZapisyFilter {
		/**PID výpisu*/
		ixp,
		/**řádek položky výpisu*/
		radek_pol,
		/**subřádek položky výpisu*/
		subradek,
		/**řádek rozpisu položky výpisu*/
		radek_av,
		/**Režim párovacích zápisů (0/1/2 - enum GParovaciZapisyRezim)*/
		rezim,
		/**Stav položky*/
		s_pol,
		/**Var.symbol*/
		vs,
		/**Spec.symbol*/
		ss,
		/**Konst.symbol*/
		ks,
		/**Identifikátor dokladu POK*/
		ixp_pok,
		/**Částka*/
		c,
		/**Datum zaplacení*/
		dat_zap,
		/**Datum UUP*/
		dat_nov_zus,
		/**Název*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\ParovaciZapisy\Dto\GParovaciZapisyDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto párovacího zápisu*/
	interface GParovaciZapisyDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Identifikátor napárovaného dokladu
		*      Identifikátor předpisu platby, na který je řádek výpisu napárován
		*/
		ixp_par?: string|null;
		/**Číslo řádku napárovaného dokladu
		*      Číslo řádku předpisu napárovaného dokladu
		*/
		cislo_par?: number|null;
		/**Stav položky
		*      Stav položky ban.výpisu
		*/
		s_pol?: number|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Částka párovaná
		*      Částka párované platby-transakce
		*/
		c_par?: JsonDecimal|null;
		/**Kód banky
		*      Kód banky-kód účtování
		*/
		kod_ban?: number|null;
		/**Identifikátor POK
		*      Identifikátor POK dokladu / transakce platební brány
		*/
		ixp_pok?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Licence databáze*/
		lic?: string|null;
		/**identifikátor hotovostní platby*/
		ixp_hpl?: string|null;
		/**Řádek účetního pohybu
		*      Řádek účetního pohybu v agendě FUC
		*/
		radek_upo?: number|null;
		/**Datum položky
		*      Datum položky výpisu-transakce
		*/
		dat_pol?: JsonDate|null;
		/**Účtárna
		*      UUS - účtárna účetního střediska - UUS zpracující organizace
		*/
		uus?: string|null;
		/**Způsob úhrady
		*      Způsob úhrady položky-transakce
		*/
		zu?: number|null;
		/**Datum nového zůstatku
		*      Datum konečného ( nového ) zůstatku bankovního účtu
		*/
		dat_nov_zus?: JsonDate|null;
		/**Identifikátor externího subjektu
		*      Pro dokumeny typu zápočtové listy
		*/
		ixs_esu?: string|null;
		/**Kategorie
		*      Kategorie typu dokladu
		*/
		ktg_typ?: number|null;
		/**Číslo výpisu
		*      Číslo bankovního výpisu
		*/
		cis_pid?: number|null;
		/**Textově způsob úhrady*/
		zu_txt?: string|null;
		/**Zkratka aktuálního stavu položky výpisu*/
		s_pol_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu položky výpisu*/
		s_pol_txt?: string|null;
		/**Kategorie typu dokumentu - textově*/
		ktg_typ_txt?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GParovaciZapisyPermissions|null;
	}
	const enum GParovaciZapisyDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", ixp_par = "ixp_par", cislo_par = "cislo_par", s_pol = "s_pol", dat_zap = "dat_zap", vs = "vs", ks = "ks", ss = "ss", nazev = "nazev", c = "c", c_par = "c_par", kod_ban = "kod_ban", ixp_pok = "ixp_pok", dat_zmena = "dat_zmena", lic = "lic", ixp_hpl = "ixp_hpl", radek_upo = "radek_upo", dat_pol = "dat_pol", uus = "uus", zu = "zu", dat_nov_zus = "dat_nov_zus", ixs_esu = "ixs_esu", ktg_typ = "ktg_typ", cis_pid = "cis_pid", zu_txt = "zu_txt", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_txt", ktg_typ_txt = "ktg_typ_txt", Permissions = "Permissions",}
	const enum GParovaciZapisyDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", ixp_par = "*", cislo_par = "*", s_pol = "*", dat_zap = "*", vs = "*", ks = "*", ss = "*", nazev = "*", c = "*", c_par = "*", kod_ban = "*", ixp_pok = "*", dat_zmena = "*", lic = "*", ixp_hpl = "*", radek_upo = "*", dat_pol = "*", uus = "*", zu = "*", dat_nov_zus = "*", ixs_esu = "*", ktg_typ = "*", cis_pid = "*", zu_txt = "*", s_pol_zkr = "*", s_pol_txt = "*", ktg_typ_txt = "*", Permissions = "Permissions",}
	const enum GParovaciZapisyDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", ixp_par = "string", cislo_par = "number", s_pol = "number", dat_zap = "JsonDate", vs = "string", ks = "string", ss = "string", nazev = "string", c = "JsonDecimal", c_par = "JsonDecimal", kod_ban = "number", ixp_pok = "string", dat_zmena = "JsonDate", lic = "string", ixp_hpl = "string", radek_upo = "number", dat_pol = "JsonDate", uus = "string", zu = "number", dat_nov_zus = "JsonDate", ixs_esu = "string", ktg_typ = "number", cis_pid = "number", zu_txt = "string", s_pol_zkr = "string", s_pol_txt = "string", ktg_typ_txt = "string", Permissions = "Gordic.Buc.Interface.GParovaciZapisyPermissions",}
	const enum GParovaciZapisyDtoTypeLengths { ixp = 12, ixp_par = 12, vs = 12, ks = 12, ss = 12, nazev = 160, ixp_pok = 12, lic = 4, ixp_hpl = 12, uus = 10, ixs_esu = 12,}
	/**Permissions pro práci s párovacím zápisem*/
	interface GParovaciZapisyPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno spustit rozpis položky*/
		LzeRozpis: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit detail párování položky*/
		LzeParovano: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GParovaciZapisyPermissionsNames { LzeRozpis = "LzeRozpis", LzeParovano = "LzeParovano",}
	const enum GParovaciZapisyPermissionsFragments { LzeRozpis = "*", LzeParovano = "*",}
	const enum GParovaciZapisyPermissionsTypes { LzeRozpis = "Gordic.General.ApplicationInterface.GPermission", LzeParovano = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GParovaciZapisyPermissionsTypeLengths {}
	/**Service Permissions pro práci s párovacími zápisy*/
	interface GParovaciZapisyServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno odpárovat položku*/
		LzeOdparovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat / odstornovat položku*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit rozpis položky*/
		LzeRozpis: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno odstranit položky*/
		LzeOdstranit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GParovaciZapisyServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeOdparovat = "LzeOdparovat", LzeStornovat = "LzeStornovat", LzeRozpis = "LzeRozpis", LzeOdstranit = "LzeOdstranit",}
	const enum GParovaciZapisyServicePermissionsFragments { LzeZobrazit = "*", LzeOdparovat = "*", LzeStornovat = "*", LzeRozpis = "*", LzeOdstranit = "*",}
	const enum GParovaciZapisyServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeOdparovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeRozpis = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GParovaciZapisyServicePermissionsTypeLengths {}
	/**Dto primárních klíčů párovacího zápisu*/
	interface GParovaciZapisyPKDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
	}
	const enum GParovaciZapisyPKDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av",}
	const enum GParovaciZapisyPKDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*",}
	const enum GParovaciZapisyPKDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number",}
	const enum GParovaciZapisyPKDtoTypeLengths { ixp = 12,}
	interface GParovaciZapisyReadReqDto extends Gordic.Buc.Interface.GParovaciZapisyPKDto {
		/**Režim*/
		rezim?: Gordic.Buc.Interface.GParovaciZapisyRezim|null;
	}
	const enum GParovaciZapisyReadReqDtoNames { rezim = "rezim", ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av",}
	const enum GParovaciZapisyReadReqDtoFragments { rezim = "*", ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*",}
	const enum GParovaciZapisyReadReqDtoTypes { rezim = "Gordic.Buc.Interface.GParovaciZapisyRezim", ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number",}
	const enum GParovaciZapisyReadReqDtoTypeLengths { ixp = 12,}
	/**Enum s typem dohledání u manuálního párování*/
	const enum GParovaciZapisyRezim {
		/**Párovací zápisy hotovostních operací a platební brány*/
		Pok,
		/**Párovací zápisy zápočtových listů*/
		Kompenzace,
		/**Položky vzniklé přepárováním z uzavřených období*/
		PrepUzavObd,
	}
	/**Dto pro hromadné operace nad položkami párovacích zápisů*/
	interface GParovaciZapisyHromOperaceDto {
		/**Režim*/
		rezim?: Gordic.Buc.Interface.GParovaciZapisyRezim|null;
		/**Seznam rozpisu položek*/
		keys?: Gordic.Buc.Interface.GParovaciZapisyPKDto[]|null;
	}
	const enum GParovaciZapisyHromOperaceDtoNames { rezim = "rezim", keys = "keys",}
	const enum GParovaciZapisyHromOperaceDtoFragments { rezim = "*", keys = "*",}
	const enum GParovaciZapisyHromOperaceDtoTypes { rezim = "Gordic.Buc.Interface.GParovaciZapisyRezim", keys = "Gordic.Buc.Interface.GParovaciZapisyPKDto[]",}
	const enum GParovaciZapisyHromOperaceDtoTypeLengths {}
	/**Filtr seznamu párovacích zápisů*/
	interface GParovaciZapisyFilterDto {
		/**ixp*/
		ixp?: GIntervalDto<string>|null;
		/**radek_pol*/
		radek_pol?: number|null;
		/**subradek*/
		subradek?: number|null;
		/**radek_av*/
		radek_av?: number|null;
		/**rezim*/
		rezim?: number|null;
		/**stav položky*/
		s_pol?: GBaseFilter<number>|null;
		/**vs*/
		vs?: GIntervalDto<string>|null;
		/**ks*/
		ks?: GIntervalDto<string>|null;
		/**ss*/
		ss?: GIntervalDto<string>|null;
		/**ixp POK*/
		ixp_pok?: GIntervalDto<string>|null;
		/**c*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**dat_zap*/
		dat_zap?: GIntervalDto<JsonDate>|null;
		/**datum uup*/
		dat_nov_zus?: GIntervalDto<JsonDate>|null;
		/**nazev*/
		nazev?: GIntervalDto<string>|null;
	}
	const enum GParovaciZapisyFilterDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", rezim = "rezim", s_pol = "s_pol", vs = "vs", ks = "ks", ss = "ss", ixp_pok = "ixp_pok", c = "c", dat_zap = "dat_zap", dat_nov_zus = "dat_nov_zus", nazev = "nazev",}
	const enum GParovaciZapisyFilterDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", rezim = "*", s_pol = "*", vs = "*", ks = "*", ss = "*", ixp_pok = "*", c = "*", dat_zap = "*", dat_nov_zus = "*", nazev = "*",}
	const enum GParovaciZapisyFilterDtoTypes { ixp = "GIntervalDto<string>", radek_pol = "number", subradek = "number", radek_av = "number", rezim = "number", s_pol = "GBaseFilter<number>", vs = "GIntervalDto<string>", ks = "GIntervalDto<string>", ss = "GIntervalDto<string>", ixp_pok = "GIntervalDto<string>", c = "GIntervalDto<JsonDecimal>", dat_zap = "GIntervalDto<JsonDate>", dat_nov_zus = "GIntervalDto<JsonDate>", nazev = "GIntervalDto<string>",}
	const enum GParovaciZapisyFilterDtoTypeLengths {}
	/**Dto s parametry pro tisk párovacích zápisů*/
	interface GParovaciZapisyTiskParamsDto {
		/**filter*/
		filters?: Gordic.Buc.Interface.GParovaciZapisyFilterDto|null;
		/**Maska textově*/
		maskaText?: string|null;
		/**Režim - GParovaciZapisyRezim*/
		rezim?: number|null;
	}
	const enum GParovaciZapisyTiskParamsDtoNames { filters = "filters", maskaText = "maskaText", rezim = "rezim",}
	const enum GParovaciZapisyTiskParamsDtoFragments { filters = "*", maskaText = "*", rezim = "*",}
	const enum GParovaciZapisyTiskParamsDtoTypes { filters = "Gordic.Buc.Interface.GParovaciZapisyFilterDto", maskaText = "string", rezim = "number",}
	const enum GParovaciZapisyTiskParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\IGAutomatickeParovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Automatické párování
	* @domain Banka
	*/
	interface BucAutomatickeParovani {
		/**Provést automatické párování*/
		automatickyParovat(rq?:Gordic.Buc.Interface.GAutomatickeParovaniDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GAutomatickeParovaniDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GAutomatickeParovaniDto>,number>;
		/**Opravnění pro automatické párování*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GAutomatickeParovaniServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucAutomatickeParovani: ServiceBase & Catalog.BucAutomatickeParovani;
	}
	const BucAutomatickeParovani: Client["BucAutomatickeParovani"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro automatické párování*/
	const enum GAutomatickeParovaniFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\IGManualniParovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Manuální párování
	* @domain Banka
	*/
	interface BucManualniParovani {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GManualniParovaniPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GManualniParovaniPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GManualniParovaniPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GManualniParovaniDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GManualniParovaniDto>>;
		/**Vrátí oprávnění manuální párování*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GManualniParovaniServicePermissions>;
		/**Automatické dohledání předpisu k nespárované platbě*/
		automatickyDohledat(rq?:Gordic.Buc.Interface.GManualniParovaniPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GManualniParovaniPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GManualniParovaniPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GManualniParovaniAutomatickeDohledaniResDto>>;
		/**Párování předpisu k nespárované platbě*/
		parovat(rq?:Gordic.Buc.Interface.GManualniParovaniParovatReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GManualniParovaniParovatReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GManualniParovaniParovatReqDto>,boolean>;
		/**Kontrola nespárovaných plateb před likvidací do UCT*/
		zkontrolujPredLikvidaciDoUctPredFormularem(rq?:Gordic.Buc.Interface.GManualniParovaniHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GManualniParovaniDto>>;
		/**Kontrola nespárovaných plateb před likvidací do UCT*/
		zkontrolujPredLikvidaciDoUct(rq?:Gordic.Buc.Interface.GManualniParovaniHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GManualniParovaniDto>>;
		/**Hromadná likvidace nespárovaných plateb do UCT*/
		hromadneLikvidovatDoUct(rq?:Gordic.Buc.Interface.GManualniParovaniHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GManualniParovaniDto>>;
		/**Kontrola nespárovaných plateb před likvidací do FUC*/
		zkontrolujPredLikvidaciDoFuc(rq?:Gordic.Buc.Interface.GManualniParovaniHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GManualniParovaniDto>>;
		/**Hromadná likvidace nespárovaných plateb do FUC*/
		hromadneLikvidovatDoFuc(rq?:Gordic.Buc.Interface.GManualniParovaniHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GManualniParovaniHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GManualniParovaniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucManualniParovani: ServiceBase & Catalog.BucManualniParovani;
	}
	const BucManualniParovani: Client["BucManualniParovani"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu manuálního párování*/
	const enum GManualniParovaniFilter {
		/**PID výpisu*/
		ixp,
		/**řádek položky výpisu*/
		radek_pol,
		/**subřádek položky výpisu*/
		subradek,
		/**řádek rozpisu položky výpisu*/
		radek_av,
		/**sk_vl*/
		sk_vl,
		/**bu_vl*/
		bu_vl,
		/**Číslo výpisu*/
		cis_pid,
		/**sk_ci*/
		sk_ci,
		/**bu_ci*/
		bu_ci,
		/**Částka*/
		c,
		/**Dat.zaplacení*/
		dat_zap,
		/**Var.symbol*/
		vs,
		/**Spec.symbol*/
		ss,
		/**Konst.symbol*/
		ks,
		/**mena*/
		mena,
		/**c_mena*/
		c_mena,
		/**Název*/
		nazev,
		/**Datum valuta*/
		dat_val,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\IGNedokonceneParovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Nedokončené párování
	* @domain Banka
	*/
	interface BucNedokonceneParovani {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GNedokonceneParovaniDto>>;
		/**Uvolnit nedokončené párování*/
		uvolnit(rq?:Gordic.Buc.Interface.GNedokonceneParovaniPKDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GNedokonceneParovaniPKDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GNedokonceneParovaniPKDto>,void>;
		/**Opravnění pro celý seznam nedokončeného párování*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GNedokonceneParovaniServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucNedokonceneParovani: ServiceBase & Catalog.BucNedokonceneParovani;
	}
	const BucNedokonceneParovani: Client["BucNedokonceneParovani"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu nedokončených párování*/
	const enum GNedokonceneParovaniFilter {
		/**Identifikátor dokumentu*/
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\IGParovaniNastroje.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Nástroje párování
	* @domain Banka
	*/
	interface BucParovaniNastroje {
		/**Získání seznamu protokolů párování*/
		listProtokoly(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GParovaniProtokolDto>>;
		/**Vrátí oprávnění seznamu protokolů párování*/
		protokolyGetServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GParovaniProtokolServicePermissions>;
		/**Získání posledního párování*/
		readPosledniParovani(rq?:Gordic.Buc.Interface.GParovaniNastrojeDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GParovaniNastrojeDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GParovaniNastrojeDto>,GServiceReadResponse<Gordic.Buc.Interface.GPosledniParovaniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucParovaniNastroje: ServiceBase & Catalog.BucParovaniNastroje;
	}
	const BucParovaniNastroje: Client["BucParovaniNastroje"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro nástroje párování*/
	const enum GParovaniNastrojeFilter {
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\IGRozpisPredpisu.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Rozpis předpisu
	* @domain Banka
	*/
	interface BucRozpisPredpisu {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GRozpisPredpisuPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GRozpisPredpisuPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GRozpisPredpisuPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GRozpisPredpisuDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GRozpisPredpisuDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucRozpisPredpisu: ServiceBase & Catalog.BucRozpisPredpisu;
	}
	const BucRozpisPredpisu: Client["BucRozpisPredpisu"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu rozpisu předpisu*/
	const enum GRozpisPredpisuFilter {
		/**PID výpisu*/
		ixp,
		/**řádek položky*/
		radek_uhr,
		/**Částka pro předplnění*/
		c_roz,
		/**Částka v měně pro předplnění*/
		c_roz_mena,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\Dto\GAutomatickeParovaniDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto pro automatické párování*/
	interface GAutomatickeParovaniDto {
	}
	const enum GAutomatickeParovaniDtoNames {}
	const enum GAutomatickeParovaniDtoFragments {}
	const enum GAutomatickeParovaniDtoTypes {}
	const enum GAutomatickeParovaniDtoTypeLengths {}
	/**Service Permissions pro práci s automatickým párováním*/
	interface GAutomatickeParovaniServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GAutomatickeParovaniServicePermissionsNames { LzeZobrazit = "LzeZobrazit",}
	const enum GAutomatickeParovaniServicePermissionsFragments { LzeZobrazit = "*",}
	const enum GAutomatickeParovaniServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GAutomatickeParovaniServicePermissionsTypeLengths {}
	/**Dto s parametry pro tisk automatické párování*/
	interface GAutomatickeParovaniTiskParamsDto {
		/**davka_cislo*/
		davka_cislo?: number|null;
	}
	const enum GAutomatickeParovaniTiskParamsDtoNames { davka_cislo = "davka_cislo",}
	const enum GAutomatickeParovaniTiskParamsDtoFragments { davka_cislo = "*",}
	const enum GAutomatickeParovaniTiskParamsDtoTypes { davka_cislo = "number",}
	const enum GAutomatickeParovaniTiskParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\Dto\GManualniParovaniDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto manuálního párování*/
	interface GManualniParovaniDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Stav položky
		*      Stav položky ban.výpisu
		*/
		s_pol?: number|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Kód banky
		*      Kód banky-kód účtování
		*/
		kod_ban?: number|null;
		/**Datum valuta
		*      Datum, je-li uvedeno, ke kterému se započítává položka z hlediska výpočtu úroků
		*/
		dat_val?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Způsob úhrady
		*      Způsob úhrady položky-transakce
		*/
		zu?: number|null;
		/**Identifikátor POK
		*      Identifikátor POK dokladu / transakce platební brány
		*/
		ixp_pok?: string|null;
		/**VS - protistrany
		*      VS - protistrany
		*/
		vs2?: string|null;
		/**SS - protistrany
		*      SS - protistrany
		*/
		ss2?: string|null;
		/**Měna*/
		mena?: number|null;
		/**Částka v měně
		*      Částka v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Datum položky
		*      Datum položky výpisu-transakce
		*/
		dat_pol?: JsonDate|null;
		/**Identifikátor BPL agendy
		*      Označení dokladu BPL pro úrok z prodlení k pohledávce
		*/
		ixp_bpl?: string|null;
		/**Datum UUP
		*      Datum uskutečnění účetního případu
		*/
		dat_uhr?: JsonDate|null;
		/**Pokyn
		*      Pokyn k likvidaci nespárované položky do FUC
		*/
		pokyn?: string|null;
		/**Příznak nepárovar
		*      Příznak nepárovar
		*/
		priz_nepar?: number|null;
		/**Datum odpárování
		*      Datum odpárování položky-transakce
		*/
		dat_odp?: JsonDate|null;
		/**Číslo výpisu
		*      Číslo bankovního výpisu
		*/
		cis_pid?: number|null;
		/**Kategorie
		*      Kategorie typu dokladu
		*/
		ktg_typ?: number|null;
		/**Datum nového zůstatku
		*      Datum konečného ( nového ) zůstatku bankovního účtu
		*/
		dat_nov_zus?: JsonDate|null;
		/**s_par - ???*/
		s_par?: number|null;
		/**Měna - textově*/
		mena_txt?: string|null;
		/**Vlastní bankovní účet složený*/
		ucet_vl?: string|null;
		/**Cizí bankovní účet složený*/
		ucet_ci?: string|null;
		/**Způsob úhrady - textově*/
		zu_txt?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GManualniParovaniPermissions|null;
	}
	const enum GManualniParovaniDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", lic = "lic", s_pol = "s_pol", nazev = "nazev", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", dat_zap = "dat_zap", vs = "vs", ks = "ks", ss = "ss", c = "c", kod_ban = "kod_ban", dat_val = "dat_val", dat_zmena = "dat_zmena", zu = "zu", ixp_pok = "ixp_pok", vs2 = "vs2", ss2 = "ss2", mena = "mena", c_mena = "c_mena", dat_pol = "dat_pol", ixp_bpl = "ixp_bpl", dat_uhr = "dat_uhr", pokyn = "pokyn", priz_nepar = "priz_nepar", dat_odp = "dat_odp", cis_pid = "cis_pid", ktg_typ = "ktg_typ", dat_nov_zus = "dat_nov_zus", s_par = "s_par", mena_txt = "mena_txt", ucet_vl = "ucet_vl", ucet_ci = "ucet_ci", zu_txt = "zu_txt", Permissions = "Permissions",}
	const enum GManualniParovaniDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", lic = "*", s_pol = "*", nazev = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", dat_zap = "*", vs = "*", ks = "*", ss = "*", c = "*", kod_ban = "*", dat_val = "*", dat_zmena = "*", zu = "*", ixp_pok = "*", vs2 = "*", ss2 = "*", mena = "*", c_mena = "*", dat_pol = "*", ixp_bpl = "*", dat_uhr = "*", pokyn = "*", priz_nepar = "*", dat_odp = "*", cis_pid = "*", ktg_typ = "*", dat_nov_zus = "*", s_par = "*", mena_txt = "*", ucet_vl = "*", ucet_ci = "*", zu_txt = "*", Permissions = "Permissions",}
	const enum GManualniParovaniDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", lic = "string", s_pol = "number", nazev = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", dat_zap = "JsonDate", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", kod_ban = "number", dat_val = "JsonDate", dat_zmena = "JsonDate", zu = "number", ixp_pok = "string", vs2 = "string", ss2 = "string", mena = "number", c_mena = "JsonDecimal", dat_pol = "JsonDate", ixp_bpl = "string", dat_uhr = "JsonDate", pokyn = "string", priz_nepar = "number", dat_odp = "JsonDate", cis_pid = "number", ktg_typ = "number", dat_nov_zus = "JsonDate", s_par = "number", mena_txt = "string", ucet_vl = "string", ucet_ci = "string", zu_txt = "string", Permissions = "Gordic.Buc.Interface.GManualniParovaniPermissions",}
	const enum GManualniParovaniDtoTypeLengths { ixp = 12, lic = 4, nazev = 160, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, vs = 12, ks = 12, ss = 12, ixp_pok = 12, vs2 = 12, ss2 = 12, ixp_bpl = 12, pokyn = 254,}
	/**Permissions pro práci s položkou manuálního párování*/
	interface GManualniParovaniPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno spustit automatické dohledání předpisu k položce*/
		LzeDohledaniAutomaticke: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit manualni dohledání předpisu k položce*/
		LzeDohledaniManualni: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit vratku*/
		LzeVratka: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit rozpis položky*/
		LzeRozpis: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GManualniParovaniPermissionsNames { LzeDohledaniAutomaticke = "LzeDohledaniAutomaticke", LzeDohledaniManualni = "LzeDohledaniManualni", LzeVratka = "LzeVratka", LzeRozpis = "LzeRozpis",}
	const enum GManualniParovaniPermissionsFragments { LzeDohledaniAutomaticke = "*", LzeDohledaniManualni = "*", LzeVratka = "*", LzeRozpis = "*",}
	const enum GManualniParovaniPermissionsTypes { LzeDohledaniAutomaticke = "Gordic.General.ApplicationInterface.GPermission", LzeDohledaniManualni = "Gordic.General.ApplicationInterface.GPermission", LzeVratka = "Gordic.General.ApplicationInterface.GPermission", LzeRozpis = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GManualniParovaniPermissionsTypeLengths {}
	/**Service Permissions pro práci s manuálním párováním*/
	interface GManualniParovaniServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit automatické dohledání předpisu k položce*/
		LzeDohledaniAutomaticke: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit manuální dohledání předpisu k položce*/
		LzeDohledaniManualni: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit vratku*/
		LzeVratka: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit rozpis položky*/
		LzeRozpis: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit hromadnou likvidaci nespárovaných položek do UCT*/
		LzeLikvidovatUct: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit hromadnou likvidaci nespárovaných položek do FUC*/
		LzeLikvidovatFuc: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit párování*/
		LzeParovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GManualniParovaniServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeDohledaniAutomaticke = "LzeDohledaniAutomaticke", LzeDohledaniManualni = "LzeDohledaniManualni", LzeVratka = "LzeVratka", LzeRozpis = "LzeRozpis", LzeLikvidovatUct = "LzeLikvidovatUct", LzeLikvidovatFuc = "LzeLikvidovatFuc", LzeParovat = "LzeParovat",}
	const enum GManualniParovaniServicePermissionsFragments { LzeZobrazit = "*", LzeDohledaniAutomaticke = "*", LzeDohledaniManualni = "*", LzeVratka = "*", LzeRozpis = "*", LzeLikvidovatUct = "*", LzeLikvidovatFuc = "*", LzeParovat = "*",}
	const enum GManualniParovaniServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeDohledaniAutomaticke = "Gordic.General.ApplicationInterface.GPermission", LzeDohledaniManualni = "Gordic.General.ApplicationInterface.GPermission", LzeVratka = "Gordic.General.ApplicationInterface.GPermission", LzeRozpis = "Gordic.General.ApplicationInterface.GPermission", LzeLikvidovatUct = "Gordic.General.ApplicationInterface.GPermission", LzeLikvidovatFuc = "Gordic.General.ApplicationInterface.GPermission", LzeParovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GManualniParovaniServicePermissionsTypeLengths {}
	/**Dto primárních klíčů položky manuálního párování*/
	interface GManualniParovaniPKDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
	}
	const enum GManualniParovaniPKDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av",}
	const enum GManualniParovaniPKDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*",}
	const enum GManualniParovaniPKDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number",}
	const enum GManualniParovaniPKDtoTypeLengths { ixp = 12,}
	/**Výsledné dto pro automatické dohledání předpisu k nespárované platbě*/
	interface GManualniParovaniAutomatickeDohledaniResDto {
		/**Typ dohledání*/
		typ_doh?: number|null;
		/**Počet dohledaných plateb*/
		poc_doh?: number|null;
		/**ixp_rs*/
		ixp_rs?: string|null;
		/**Předpis úhrady, pokud je nalezen jen jeden*/
		predpis?: Gordic.Buc.Interface.GVyberUhradyDto|null;
	}
	const enum GManualniParovaniAutomatickeDohledaniResDtoNames { typ_doh = "typ_doh", poc_doh = "poc_doh", ixp_rs = "ixp_rs", predpis = "predpis",}
	const enum GManualniParovaniAutomatickeDohledaniResDtoFragments { typ_doh = "*", poc_doh = "*", ixp_rs = "*", predpis = "*",}
	const enum GManualniParovaniAutomatickeDohledaniResDtoTypes { typ_doh = "number", poc_doh = "number", ixp_rs = "string", predpis = "Gordic.Buc.Interface.GVyberUhradyDto",}
	const enum GManualniParovaniAutomatickeDohledaniResDtoTypeLengths {}
	/**Request dto pro párování manuální párování nespárovné platby*/
	interface GManualniParovaniParovatReqDto {
		/**Primární klíče nespárované platby*/
		platbaKeys?: Gordic.Buc.Interface.GManualniParovaniPKDto|null;
		/**Typ dohledání u nespárované platby*/
		typDohledani?: Gordic.Buc.Interface.GManualniParovaniTypDohledani|null;
		/**Klíče předpisu úhrady k napárování*/
		predpisKeys?: Gordic.Buc.Interface.GManualniParovaniUhradaReadReqDto|null;
		/**Klíče + ceny rozpisu pro uložení - pouze pro DDP*/
		rozpisKeys?: Gordic.Buc.Interface.GRozpisPredpisuSaveDto[]|null;
		/**Seznam primárních klíčů nespárovaných plateb pro případ hromadného párování DDP a POU*/
		hromPlatbaKeys?: Gordic.Buc.Interface.GManualniParovaniPKDto[]|null;
		/**Případná částka platby v měně předpisu z dialogu*/
		c_mena_predpis?: JsonDecimal|null;
		/**Případné ID šablony z dialogu seznamu šablony likvidace FUC*/
		id_sablona?: number|null;
		/**Informace pro server, že uživatel byl informavám s dotazem na neshodu vlastního účtu*/
		serverMessageNeshodaBuVl?: boolean|null;
		/**Informace pro server, že uživatel byl informavám s dotazem na potvrzení párování v případě problémů*/
		serverMessageIsPar?: boolean|null;
		/**Informace pro server, že uživatel byl informavám s dotazem na potvrzení párování v případě jiné měny*/
		serverMessageIsParJinaMena?: boolean|null;
		/**Informace pro server, že uživatel byl informavám s dotazem na potvrzení párování v případě RCN*/
		serverMessageIsParRCN?: boolean|null;
		/**Informace pro server, že uživatel byl informavám s dotazem na potvrzení párování v případě nepovolené účtárny*/
		serverMessageIsUus?: boolean|null;
		/**Informace pro server, že uživatel vybral šablonu likvidace FUC*/
		serverMessageSablonaVS?: boolean|null;
	}
	const enum GManualniParovaniParovatReqDtoNames { platbaKeys = "platbaKeys", typDohledani = "typDohledani", predpisKeys = "predpisKeys", rozpisKeys = "rozpisKeys", hromPlatbaKeys = "hromPlatbaKeys", c_mena_predpis = "c_mena_predpis", id_sablona = "id_sablona", serverMessageNeshodaBuVl = "serverMessageNeshodaBuVl", serverMessageIsPar = "serverMessageIsPar", serverMessageIsParJinaMena = "serverMessageIsParJinaMena", serverMessageIsParRCN = "serverMessageIsParRCN", serverMessageIsUus = "serverMessageIsUus", serverMessageSablonaVS = "serverMessageSablonaVS",}
	const enum GManualniParovaniParovatReqDtoFragments { platbaKeys = "*", typDohledani = "*", predpisKeys = "*", rozpisKeys = "*", hromPlatbaKeys = "*", c_mena_predpis = "*", id_sablona = "*", serverMessageNeshodaBuVl = "*", serverMessageIsPar = "*", serverMessageIsParJinaMena = "*", serverMessageIsParRCN = "*", serverMessageIsUus = "*", serverMessageSablonaVS = "*",}
	const enum GManualniParovaniParovatReqDtoTypes { platbaKeys = "Gordic.Buc.Interface.GManualniParovaniPKDto", typDohledani = "Gordic.Buc.Interface.GManualniParovaniTypDohledani", predpisKeys = "Gordic.Buc.Interface.GManualniParovaniUhradaReadReqDto", rozpisKeys = "Gordic.Buc.Interface.GRozpisPredpisuSaveDto[]", hromPlatbaKeys = "Gordic.Buc.Interface.GManualniParovaniPKDto[]", c_mena_predpis = "JsonDecimal", id_sablona = "number", serverMessageNeshodaBuVl = "boolean", serverMessageIsPar = "boolean", serverMessageIsParJinaMena = "boolean", serverMessageIsParRCN = "boolean", serverMessageIsUus = "boolean", serverMessageSablonaVS = "boolean",}
	const enum GManualniParovaniParovatReqDtoTypeLengths {}
	/**Enum s typem dohledání u manuálního párování*/
	const enum GManualniParovaniTypDohledani {
		/**Automatické dohledání*/
		Automaticke,
		/**Manuální dohledaní*/
		Manualni,
		/**Vratka*/
		Vratka,
	}
	interface GManualniParovaniUhradaReadReqDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
		davka?: number|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Řádek XML*/
		radek?: number|null;
	}
	const enum GManualniParovaniUhradaReadReqDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", davka = "davka", sk_vl = "sk_vl", bu_vl = "bu_vl", radek = "radek",}
	const enum GManualniParovaniUhradaReadReqDtoFragments { ixp = "*", radek_uhr = "*", davka = "*", sk_vl = "*", bu_vl = "*", radek = "*",}
	const enum GManualniParovaniUhradaReadReqDtoTypes { ixp = "string", radek_uhr = "number", davka = "number", sk_vl = "string", bu_vl = "string", radek = "number",}
	const enum GManualniParovaniUhradaReadReqDtoTypeLengths { ixp = 12, sk_vl = 11, bu_vl = 34,}
	/**Dto pro hromadné operace nad nespárovanými platbami manuálního párování*/
	interface GManualniParovaniHromOperaceDto {
		/**Seznam položek*/
		keys?: Gordic.Buc.Interface.GManualniParovaniPKDto[]|null;
		/**Parametry pro likvidaci do UCT*/
		paramsLikDoUct?: Gordic.Buc.Interface.GManualniParovaniHromLikDoUctDto|null;
		/**Parametry pro likvidaci do FUC*/
		paramsLikDoFuc?: Gordic.Buc.Interface.GManualniParovaniHromLikDoFucDto|null;
	}
	const enum GManualniParovaniHromOperaceDtoNames { keys = "keys", paramsLikDoUct = "paramsLikDoUct", paramsLikDoFuc = "paramsLikDoFuc",}
	const enum GManualniParovaniHromOperaceDtoFragments { keys = "*", paramsLikDoUct = "*", paramsLikDoFuc = "*",}
	const enum GManualniParovaniHromOperaceDtoTypes { keys = "Gordic.Buc.Interface.GManualniParovaniPKDto[]", paramsLikDoUct = "Gordic.Buc.Interface.GManualniParovaniHromLikDoUctDto", paramsLikDoFuc = "Gordic.Buc.Interface.GManualniParovaniHromLikDoFucDto",}
	const enum GManualniParovaniHromOperaceDtoTypeLengths {}
	/**Dto s parametry pro hromadnou likvidaci nespárovaných plateb do UCT*/
	interface GManualniParovaniHromLikDoUctDto {
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Typ dokladu*/
		priz_dd?: number|null;
		/**Zpracovatel likvidace*/
		ixs_fun?: string|null;
		/**Typ vytváření dokladu likvidace*/
		typ_lik?: number|null;
	}
	const enum GManualniParovaniHromLikDoUctDtoNames { ixp_den = "ixp_den", priz_dd = "priz_dd", ixs_fun = "ixs_fun", typ_lik = "typ_lik",}
	const enum GManualniParovaniHromLikDoUctDtoFragments { ixp_den = "*", priz_dd = "*", ixs_fun = "*", typ_lik = "*",}
	const enum GManualniParovaniHromLikDoUctDtoTypes { ixp_den = "string", priz_dd = "number", ixs_fun = "string", typ_lik = "number",}
	const enum GManualniParovaniHromLikDoUctDtoTypeLengths {}
	/**Dto s parametry pro hromadnou likvidaci nespárovaných plateb do FUC*/
	interface GManualniParovaniHromLikDoFucDto {
		/**Kategorie typu dokladu*/
		ktg_typ?: number|null;
		/**Kategorie účetního pohybu*/
		ktg_upo?: number|null;
		/**Typ účetního případu pohybu*/
		typ_upr?: string|null;
		/**Účtárna NS*/
		uus?: string|null;
		/**Nákladové středisko*/
		nks?: string|null;
		/**Zpracovatel likvidace*/
		ixs_fun?: string|null;
		/**Pokyn*/
		pokyn?: string|null;
		/**Případné ID šablony likvidace FUC u karta-výdaj*/
		id_sablona?: number|null;
	}
	const enum GManualniParovaniHromLikDoFucDtoNames { ktg_typ = "ktg_typ", ktg_upo = "ktg_upo", typ_upr = "typ_upr", uus = "uus", nks = "nks", ixs_fun = "ixs_fun", pokyn = "pokyn", id_sablona = "id_sablona",}
	const enum GManualniParovaniHromLikDoFucDtoFragments { ktg_typ = "*", ktg_upo = "*", typ_upr = "*", uus = "*", nks = "*", ixs_fun = "*", pokyn = "*", id_sablona = "*",}
	const enum GManualniParovaniHromLikDoFucDtoTypes { ktg_typ = "number", ktg_upo = "number", typ_upr = "string", uus = "string", nks = "string", ixs_fun = "string", pokyn = "string", id_sablona = "number",}
	const enum GManualniParovaniHromLikDoFucDtoTypeLengths {}
	/**Dto s FROM a WHERE pro tisk nespárovaných plateb v manuálním párování*/
	interface GManualniParovaniTiskWhereDto {
		/**WHERE část SQL dotazu*/
		where?: string|null;
		/**UNION WHERE část SQL dotazu*/
		whereUni?: string|null;
	}
	const enum GManualniParovaniTiskWhereDtoNames { where = "where", whereUni = "whereUni",}
	const enum GManualniParovaniTiskWhereDtoFragments { where = "*", whereUni = "*",}
	const enum GManualniParovaniTiskWhereDtoTypes { where = "string", whereUni = "string",}
	const enum GManualniParovaniTiskWhereDtoTypeLengths {}
	/**Filtr seznamu nespárovaných plateb v manuálním párování*/
	interface GManualniParovaniFilterDto {
		/**ixp*/
		ixp?: string|null;
		/**radek_pol*/
		radek_pol?: number|null;
		/**subradek*/
		subradek?: number|null;
		/**radek_av*/
		radek_av?: number|null;
		/**sk_vl*/
		sk_vl?: GBaseFilter<string>|null;
		/**bu_vl*/
		bu_vl?: GBaseFilter<string>|null;
		/**sk_ci*/
		sk_ci?: GBaseFilter<string>|null;
		/**bu_vl*/
		bu_ci?: GBaseFilter<string>|null;
		/**cis_pid*/
		cis_pid?: GIntervalDto<number>|null;
		/**c*/
		c?: GIntervalDto<JsonDecimal>|null;
		/**dat_zap*/
		dat_zap?: GIntervalDto<JsonDate>|null;
		/**vs*/
		vs?: GIntervalDto<string>|null;
		/**ks*/
		ks?: GIntervalDto<string>|null;
		/**ss*/
		ss?: GIntervalDto<string>|null;
		/**mena*/
		mena?: GBaseFilter<number>|null;
		/**c_mena*/
		c_mena?: GIntervalDto<JsonDecimal>|null;
		/**nazev*/
		nazev?: GIntervalDto<string>|null;
		/**dat_val*/
		dat_val?: GIntervalDto<JsonDate>|null;
	}
	const enum GManualniParovaniFilterDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", cis_pid = "cis_pid", c = "c", dat_zap = "dat_zap", vs = "vs", ks = "ks", ss = "ss", mena = "mena", c_mena = "c_mena", nazev = "nazev", dat_val = "dat_val",}
	const enum GManualniParovaniFilterDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", cis_pid = "*", c = "*", dat_zap = "*", vs = "*", ks = "*", ss = "*", mena = "*", c_mena = "*", nazev = "*", dat_val = "*",}
	const enum GManualniParovaniFilterDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", sk_vl = "GBaseFilter<string>", bu_vl = "GBaseFilter<string>", sk_ci = "GBaseFilter<string>", bu_ci = "GBaseFilter<string>", cis_pid = "GIntervalDto<number>", c = "GIntervalDto<JsonDecimal>", dat_zap = "GIntervalDto<JsonDate>", vs = "GIntervalDto<string>", ks = "GIntervalDto<string>", ss = "GIntervalDto<string>", mena = "GBaseFilter<number>", c_mena = "GIntervalDto<JsonDecimal>", nazev = "GIntervalDto<string>", dat_val = "GIntervalDto<JsonDate>",}
	const enum GManualniParovaniFilterDtoTypeLengths {}
	/**Dto s parametry pro tisk nespárovaných plateb v manuálním párování*/
	interface GManualniParovaniTiskParamsDto {
		/**filter*/
		filters?: Gordic.Buc.Interface.GManualniParovaniFilterDto|null;
		/**Maska textově*/
		maskaText?: string|null;
	}
	const enum GManualniParovaniTiskParamsDtoNames { filters = "filters", maskaText = "maskaText",}
	const enum GManualniParovaniTiskParamsDtoFragments { filters = "*", maskaText = "*",}
	const enum GManualniParovaniTiskParamsDtoTypes { filters = "Gordic.Buc.Interface.GManualniParovaniFilterDto", maskaText = "string",}
	const enum GManualniParovaniTiskParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\Dto\GNedokonceneParovaniDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto pro seznam výpisů nedokončeného párování*/
	interface GNedokonceneParovaniDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		cis_pid?: number|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**Osoba, funkce*/
		nazev_rf?: string|null;
		dat_z_par?: JsonDate|null;
		/**Vlastní bankovní účet složený*/
		ucet_vl?: string|null;
	}
	const enum GNedokonceneParovaniDtoNames { ixp = "ixp", cis_pid = "cis_pid", sk_vl = "sk_vl", bu_vl = "bu_vl", nazev_rf = "nazev_rf", dat_z_par = "dat_z_par", ucet_vl = "ucet_vl",}
	const enum GNedokonceneParovaniDtoFragments { ixp = "*", cis_pid = "*", sk_vl = "*", bu_vl = "*", nazev_rf = "*", dat_z_par = "*", ucet_vl = "*",}
	const enum GNedokonceneParovaniDtoTypes { ixp = "string", cis_pid = "number", sk_vl = "string", bu_vl = "string", nazev_rf = "string", dat_z_par = "JsonDate", ucet_vl = "string",}
	const enum GNedokonceneParovaniDtoTypeLengths { ixp = 12, sk_vl = 11, bu_vl = 34, nazev_rf = 200,}
	/**Dto primárních klíčů nedokončeného párování*/
	interface GNedokonceneParovaniPKDto {
		/**Identifikátor dokumentu*/
		ixp?: string|null;
	}
	const enum GNedokonceneParovaniPKDtoNames { ixp = "ixp",}
	const enum GNedokonceneParovaniPKDtoFragments { ixp = "*",}
	const enum GNedokonceneParovaniPKDtoTypes { ixp = "string",}
	const enum GNedokonceneParovaniPKDtoTypeLengths { ixp = 12,}
	/**Service Permissions pro práci s nedokončeným párováním*/
	interface GNedokonceneParovaniServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno uvolnit nedokončené párování*/
		LzeUvolnit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GNedokonceneParovaniServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeUvolnit = "LzeUvolnit",}
	const enum GNedokonceneParovaniServicePermissionsFragments { LzeZobrazit = "*", LzeUvolnit = "*",}
	const enum GNedokonceneParovaniServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeUvolnit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GNedokonceneParovaniServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\Dto\GParovaniNastrojeDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto s nástroji pro párování*/
	interface GParovaniNastrojeDto {
	}
	const enum GParovaniNastrojeDtoNames {}
	const enum GParovaniNastrojeDtoFragments {}
	const enum GParovaniNastrojeDtoTypes {}
	const enum GParovaniNastrojeDtoTypeLengths {}
	/**Dto s informacemi o protokolu párování*/
	interface GParovaniProtokolDto {
		/**Dávka*/
		davka?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Pároval*/
		nazev_rf?: string|null;
	}
	const enum GParovaniProtokolDtoNames { davka = "davka", dat_zmena = "dat_zmena", nazev_rf = "nazev_rf",}
	const enum GParovaniProtokolDtoFragments { davka = "*", dat_zmena = "*", nazev_rf = "*",}
	const enum GParovaniProtokolDtoTypes { davka = "number", dat_zmena = "JsonDate", nazev_rf = "string",}
	const enum GParovaniProtokolDtoTypeLengths {}
	/**Dto s parametry pro tisk spárovaných/nespárovaných plateb v protokoly párování*/
	interface GParovaniProtokolTiskParamsDto {
		/**Dávka*/
		davka?: number|null;
	}
	const enum GParovaniProtokolTiskParamsDtoNames { davka = "davka",}
	const enum GParovaniProtokolTiskParamsDtoFragments { davka = "*",}
	const enum GParovaniProtokolTiskParamsDtoTypes { davka = "number",}
	const enum GParovaniProtokolTiskParamsDtoTypeLengths {}
	/**Dto s informacemi o posledním párování*/
	interface GPosledniParovaniDto {
		/**Datum párování*/
		dat_par?: JsonDate|null;
		/**Osoba*/
		nazev_rf?: string|null;
	}
	const enum GPosledniParovaniDtoNames { dat_par = "dat_par", nazev_rf = "nazev_rf",}
	const enum GPosledniParovaniDtoFragments { dat_par = "*", nazev_rf = "*",}
	const enum GPosledniParovaniDtoTypes { dat_par = "JsonDate", nazev_rf = "string",}
	const enum GPosledniParovaniDtoTypeLengths {}
	/**Service Permissions pro práci se seznamem protokolů párování*/
	interface GParovaniProtokolServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit automatické párování*/
		LzeAutParovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit údaje o posledním párování*/
		LzePosledniParovani: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GParovaniProtokolServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeAutParovat = "LzeAutParovat", LzePosledniParovani = "LzePosledniParovani",}
	const enum GParovaniProtokolServicePermissionsFragments { LzeZobrazit = "*", LzeAutParovat = "*", LzePosledniParovani = "*",}
	const enum GParovaniProtokolServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeAutParovat = "Gordic.General.ApplicationInterface.GPermission", LzePosledniParovani = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GParovaniProtokolServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Parovani\Dto\GRozpisPredpisuDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto rozpis předpisu platby*/
	interface GRozpisPredpisuDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
		/**Subřádek
		*      Nyní se nepoužívá, přednastavená hodnota 1
		*/
		subradek?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita
		*      Ekonomická aktivita
		*/
		eko_akt?: number|null;
		/**Příznak archiv/čtení/zápis*/
		arw?: number|null;
		/**Identifikátor externího subjektu
		*      Subjekt, kterému půjde platba nebo se od něj očekává platba
		*/
		ixs_esu?: string|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Vlasní bankovní účet
		*      Tvar bankovního účtu se směrovým kódem banky
		*/
		bu_txt_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Bankovní účet cizí
		*      Tvar bankovního účtu se směrovým kódem banky
		*/
		bu_txt_ci?: string|null;
		/**Způsob platby
		*      Způsob platby, používá se k rozlišení jak bude uhrazena platba
		*/
		zp?: number|null;
		/**Agendové číslo
		*      Agendové číslo dokladu platby
		*/
		ac?: string|null;
		/**Kniha
		*      Kniha dokladů
		*/
		ixp_den?: string|null;
		/**Stav předpisu platby*/
		s_uhrp?: number|null;
		/**Částka
		*      Částka předpisu platby v CZK
		*/
		c?: JsonDecimal|null;
		/**Částka spárované platby
		*      Částka spárované platby v CZK
		*/
		c_par?: JsonDecimal|null;
		/**Splatnost
		*      Datum splatnosti
		*/
		dat_spl?: JsonDate|null;
		/**Zaplacena
		*      Datum zaplacení
		*/
		dat_zap?: JsonDate|null;
		/**Párována
		*      Datum párování platby
		*/
		dat_par?: JsonDate|null;
		/**Posláno k úhradě
		*      Datum dání k úhradě
		*/
		dat_kuhr?: JsonDate|null;
		/**Agenda
		*      Typ agendy
		*/
		typ_ag?: number|null;
		/**Kategorie pohybu
		*      Kategorie předpisu pro účtování ve FUC
		*/
		ktg_typ?: number|null;
		/**Číslo bankovního dokladu
		*      Číslo bankovního dokladu
		*/
		cis_bdo?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Měna
		*      Kód měny platby
		*/
		mena?: number|null;
		/**Částka v měně
		*      Částka platby v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Uhradit
		*      Způsob hrazení zahraniční platby
		*/
		zp_z?: number|null;
		/**Poplatky hradí
		*      Kdo hradí poplatky za zahraniční platbu
		*/
		hra_pop?: number|null;
		/**Platební titul
		*      Platební titul
		*/
		pla_tit?: string|null;
		/**Účel úhrady
		*      Účel úhrady
		*/
		ucel_uhr?: string|null;
		/**Devizové povolení
		*      Číslo devizového povolení
		*/
		dev_pov?: string|null;
		/**Identifikace platby
		*      Identifikace platby v systému banky
		*/
		id_platby?: string|null;
		/**Kategorie předpisu
		*      Kategorie účetního pohybu předpisu
		*/
		ktg_upo?: number|null;
		/**Datum vzniku
		*      Datum vzniku předpisu
		*/
		dat_vzniku?: JsonDate|null;
		/**Řádek pohybu
		*      Řádek účtního pohybu ve FUC
		*/
		radek_upo?: number|null;
		/**Poř.číslo INT
		*      Poř.číslo z dávky INT
		*/
		por_cislo_int?: number|null;
		/**Rok
		*      Účetní období
		*/
		rok?: number|null;
		/**IČO - Identifikační číslo vlastní
		*      IČO zpracující organizace
		*/
		ico?: string|null;
		/**UCS - Účetní středisko vlastní
		*      UCS zpracující organizace
		*/
		ucs?: string|null;
		/**Určení platby
		*      Určení typu platby
		*/
		upl?: number|null;
		/**Expresní platba
		*      Příznak expresní platby
		*/
		exp_pla?: number|null;
		/**Účet pro poplatby
		*      Účet pro poplatby zahraniční platby
		*/
		bu_pop?: string|null;
		/**Měna poplatků
		*      Měna poplatků zahr.platby
		*/
		mena_pop?: number|null;
		/**Měna požadovaná
		*      Měna požadovaná u zahr.platby
		*/
		mena_poz?: number|null;
		/**Informace k platbě 1
		*      Informace k platbě 1
		*/
		inf1?: string|null;
		/**Informace k platbě 2
		*      Informace k platbě 2
		*/
		inf2?: string|null;
		/**Částka párovaná v měně
		*      Částka zpárované platby v měně
		*/
		c_par_mena?: JsonDecimal|null;
		/**Realizátor
		*      Identifikace realizátora
		*/
		ixp_real?: string|null;
		/**Externí identifikace
		*      Externí identifikace systému
		*/
		ixs_ext?: string|null;
		/**Příznak nepárovat
		*      Předpis se nebude automaticky nepárovat
		*/
		priz_nepar?: number|null;
		/**Popis
		*      Popis platby - zpráva pro příjemce, AV pole
		*/
		popis?: string|null;
		/**Dev.statistika
		*      Symbol devizové statistiky
		*/
		sds?: string|null;
		/**Příznak předání RČ nebo dat.nar.
		*      Pro úhrady PPB - poštovní poukázky B - Specifikace adresáta
		*/
		priz_pred_rcdn?: number|null;
		/**Bez DPH
		*      Částka bez DPH
		*/
		c_z0_par?: JsonDecimal|null;
		/**Osvobozeno
		*      Částka osvobozená od DPH
		*/
		c_d0_par?: JsonDecimal|null;
		/**Základ snížené DPH 
		*      Částka základu snížené DPH
		*/
		c_z1_par?: JsonDecimal|null;
		/**Snížená DPH
		*      Částka snížené DPH
		*/
		c_d1_par?: JsonDecimal|null;
		/**Základ základní DPH
		*      Částka základu základní DPH
		*/
		c_z2_par?: JsonDecimal|null;
		/**Základní DPH
		*      Částka základní DPH
		*/
		c_d2_par?: JsonDecimal|null;
		/**Zokrouhlení rekapitulace DPH
		*      Částka zokrouhlení rekapitulace DPH
		*/
		c_zao_par?: JsonDecimal|null;
		/**Identifikace příkazce
		*      Identifikátor osoby odesílající příkaz do banky
		*/
		ixs_zmp_prik?: string|null;
		/**Priorita
		*      Priorita platby
		*/
		pri_uhr?: number|null;
		/**Schváleno
		*      Datum schválení platby
		*/
		dat_sch?: JsonDate|null;
		/**Řádek rezervace
		*      Řádek rezervačního pohybu ve FUCDUPO
		*/
		radek_upo_rez?: number|null;
		/**Příznak rezervace
		*      Příznak rezervačního pohybu ve FUC
		*/
		priz_rez_pri?: number|null;
		/**Identifikace smlouvy
		*      Identifikace smlouvy v modulu SML
		*/
		ixp_sml?: string|null;
		/**Rok smlouvy
		*      Rok smlouvy v modulu SML
		*/
		rok_sml?: number|null;
		/**Číslo smlouvy
		*      Číslo smlouvy v modulu SML
		*/
		cislo_sml?: number|null;
		/**Doplňková služba
		*      Označení doplňkové služby pro úhradu PPB
		*/
		dsp?: string|null;
		/**Kurz
		*      Kurz měny
		*/
		kurz?: JsonDecimal|null;
		/**Algoritmus
		*      Algoritmus párování - řízení aut.párování
		*/
		alg_par?: number|null;
		/**Vazba na doklad
		*      Identifikace navázaného dokladu
		*/
		ixp_vaz?: string|null;
		/**Splatnost v agendě
		*      Datum splatnosti předaný agendou
		*/
		dat_spl_ag?: JsonDate|null;
		/**Základ DPH3
		*      Částka základu DPH3
		*/
		c_z3_par?: JsonDecimal|null;
		/**DPH3
		*      Částka DPH3
		*/
		c_d3_par?: JsonDecimal|null;
		/**Základ DPH4
		*      Částka základu DPH4
		*/
		c_z4_par?: JsonDecimal|null;
		/**DPH4
		*      Částka DPH4
		*/
		c_d4_par?: JsonDecimal|null;
		/**Účtárna
		*      UUS - účtárna účetního střediska - UUS zpracující organizace
		*/
		uus?: string|null;
		/**Upřesnění platby
		*      Upřesnění způsobu platby
		*/
		u_zp?: number|null;
		/**Směrový kód bankovního účtu MF
		*      Směrový kód bankovního účtu ministerstva financí
		*/
		sk_ci_mf?: string|null;
		/**Bankovní účet ministerstva financí
		*      Číslo BÚ pro úhrad na účet ministerstva financí
		*/
		bu_ci_mf?: string|null;
		/**Hrazeno na účet ministerstva financí
		*      Částka hrazená na účet ministerstva financí
		*/
		c_mf?: JsonDecimal|null;
		/**Ministerstvo financí
		*      Identifikace ESU ministerstva financí
		*/
		ixs_esu_mf?: string|null;
		/**VS platby na účet ministerstva financí
		*      VS platby na účet ministerstva financí
		*/
		vs_mf?: string|null;
		/**KS platby na účet ministerstva financí
		*      KS platby na účet ministerstva financí
		*/
		ks_mf?: string|null;
		/**SS platby na účet ministerstva financí
		*      SS platby na účet ministerstva financí
		*/
		ss_mf?: string|null;
		/**Identifikace koruny
		*      Identifikace koruny v IISSP
		*/
		id_hdr_ris_pik?: string|null;
		/**Identifikace koruny
		*      Identifikace koruny v IISSP
		*/
		radek_hdr_pik?: number|null;
		/**Popis pro mě
		*      Popis se objeví pouze na výpisu příkazce
		*/
		popis2?: string|null;
		/**Okamžitá platba
		*      Příznak okamžité platby
		*/
		oka_pla?: number|null;
		/**Název externího subjektu*/
		nazev_dod?: string|null;
		/**IČO externího subjektu*/
		ico_esu?: string|null;
		/**Měna - textově*/
		mena_txt?: string|null;
		/**Kategorie předpisu - textově*/
		ktg_upo_txt?: string|null;
		/**Určení platby zkratka*/
		upl_zkr?: string|null;
		/**Určení platby textově*/
		upl_txt?: string|null;
		/**Stav předpisu platby zkratka*/
		s_uhrp_zkr?: string|null;
		/**Stav předpisu platby textově*/
		s_uhrp_txt?: string|null;
		/**Způsob platby zkratka*/
		zp_zkr?: string|null;
		/**Způsob platby textově*/
		zp_txt?: string|null;
		/**Typ agendy zkratka*/
		typ_ag_zkr?: string|null;
		/**Nová částka*/
		c_new?: JsonDecimal|null;
		/**Nová částka v měně*/
		c_new_mena?: JsonDecimal|null;
		/**Vlastní bankovní účet složený*/
		ucet_vl?: string|null;
		/**Cizí bankovní účet složený*/
		ucet_ci?: string|null;
		/**c_z0*/
		c_z0?: JsonDecimal|null;
		/**c_roz - výstup (nCRoz)*/
		c_roz?: JsonDecimal|null;
		/**c_roz_mena - výstup (nCRozMena)*/
		c_roz_mena?: JsonDecimal|null;
	}
	const enum GRozpisPredpisuDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", subradek = "subradek", lic = "lic", eko_akt = "eko_akt", arw = "arw", ixs_esu = "ixs_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_txt_ci = "bu_txt_ci", zp = "zp", ac = "ac", ixp_den = "ixp_den", s_uhrp = "s_uhrp", c = "c", c_par = "c_par", dat_spl = "dat_spl", dat_zap = "dat_zap", dat_par = "dat_par", dat_kuhr = "dat_kuhr", typ_ag = "typ_ag", ktg_typ = "ktg_typ", cis_bdo = "cis_bdo", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena = "mena", c_mena = "c_mena", zp_z = "zp_z", hra_pop = "hra_pop", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", id_platby = "id_platby", ktg_upo = "ktg_upo", dat_vzniku = "dat_vzniku", radek_upo = "radek_upo", por_cislo_int = "por_cislo_int", rok = "rok", ico = "ico", ucs = "ucs", upl = "upl", exp_pla = "exp_pla", bu_pop = "bu_pop", mena_pop = "mena_pop", mena_poz = "mena_poz", inf1 = "inf1", inf2 = "inf2", c_par_mena = "c_par_mena", ixp_real = "ixp_real", ixs_ext = "ixs_ext", priz_nepar = "priz_nepar", popis = "popis", sds = "sds", priz_pred_rcdn = "priz_pred_rcdn", c_z0_par = "c_z0_par", c_d0_par = "c_d0_par", c_z1_par = "c_z1_par", c_d1_par = "c_d1_par", c_z2_par = "c_z2_par", c_d2_par = "c_d2_par", c_zao_par = "c_zao_par", ixs_zmp_prik = "ixs_zmp_prik", pri_uhr = "pri_uhr", dat_sch = "dat_sch", radek_upo_rez = "radek_upo_rez", priz_rez_pri = "priz_rez_pri", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", dsp = "dsp", kurz = "kurz", alg_par = "alg_par", ixp_vaz = "ixp_vaz", dat_spl_ag = "dat_spl_ag", c_z3_par = "c_z3_par", c_d3_par = "c_d3_par", c_z4_par = "c_z4_par", c_d4_par = "c_d4_par", uus = "uus", u_zp = "u_zp", sk_ci_mf = "sk_ci_mf", bu_ci_mf = "bu_ci_mf", c_mf = "c_mf", ixs_esu_mf = "ixs_esu_mf", vs_mf = "vs_mf", ks_mf = "ks_mf", ss_mf = "ss_mf", id_hdr_ris_pik = "id_hdr_ris_pik", radek_hdr_pik = "radek_hdr_pik", popis2 = "popis2", oka_pla = "oka_pla", nazev_dod = "nazev_dod", ico_esu = "ico_esu", mena_txt = "mena_txt", ktg_upo_txt = "ktg_upo_txt", upl_zkr = "upl_zkr", upl_txt = "upl_txt", s_uhrp_zkr = "s_uhrp_zkr", s_uhrp_txt = "s_uhrp_txt", zp_zkr = "zp_zkr", zp_txt = "zp_txt", typ_ag_zkr = "typ_ag_zkr", c_new = "c_new", c_new_mena = "c_new_mena", ucet_vl = "ucet_vl", ucet_ci = "ucet_ci", c_z0 = "c_z0", c_roz = "c_roz", c_roz_mena = "c_roz_mena",}
	const enum GRozpisPredpisuDtoFragments { ixp = "*", radek_uhr = "*", subradek = "*", lic = "*", eko_akt = "*", arw = "*", ixs_esu = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", bu_txt_vl = "*", sk_ci = "*", bu_ci = "*", bu_txt_ci = "*", zp = "*", ac = "*", ixp_den = "*", s_uhrp = "*", c = "*", c_par = "*", dat_spl = "*", dat_zap = "*", dat_par = "*", dat_kuhr = "*", typ_ag = "*", ktg_typ = "*", cis_bdo = "*", dat_zmena = "*", zmenu_prov = "*", mena = "*", c_mena = "*", zp_z = "*", hra_pop = "*", pla_tit = "*", ucel_uhr = "*", dev_pov = "*", id_platby = "*", ktg_upo = "*", dat_vzniku = "*", radek_upo = "*", por_cislo_int = "*", rok = "*", ico = "*", ucs = "*", upl = "*", exp_pla = "*", bu_pop = "*", mena_pop = "*", mena_poz = "*", inf1 = "*", inf2 = "*", c_par_mena = "*", ixp_real = "*", ixs_ext = "*", priz_nepar = "*", popis = "*", sds = "*", priz_pred_rcdn = "*", c_z0_par = "*", c_d0_par = "*", c_z1_par = "*", c_d1_par = "*", c_z2_par = "*", c_d2_par = "*", c_zao_par = "*", ixs_zmp_prik = "*", pri_uhr = "*", dat_sch = "*", radek_upo_rez = "*", priz_rez_pri = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", dsp = "*", kurz = "*", alg_par = "*", ixp_vaz = "*", dat_spl_ag = "*", c_z3_par = "*", c_d3_par = "*", c_z4_par = "*", c_d4_par = "*", uus = "*", u_zp = "*", sk_ci_mf = "*", bu_ci_mf = "*", c_mf = "*", ixs_esu_mf = "*", vs_mf = "*", ks_mf = "*", ss_mf = "*", id_hdr_ris_pik = "*", radek_hdr_pik = "*", popis2 = "*", oka_pla = "*", nazev_dod = "*", ico_esu = "*", mena_txt = "*", ktg_upo_txt = "*", upl_zkr = "*", upl_txt = "*", s_uhrp_zkr = "*", s_uhrp_txt = "*", zp_zkr = "*", zp_txt = "*", typ_ag_zkr = "*", c_new = "*", c_new_mena = "*", ucet_vl = "*", ucet_ci = "*", c_z0 = "*", c_roz = "*", c_roz_mena = "*",}
	const enum GRozpisPredpisuDtoTypes { ixp = "string", radek_uhr = "number", subradek = "number", lic = "string", eko_akt = "number", arw = "number", ixs_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", sk_ci = "string", bu_ci = "string", bu_txt_ci = "string", zp = "number", ac = "string", ixp_den = "string", s_uhrp = "number", c = "JsonDecimal", c_par = "JsonDecimal", dat_spl = "JsonDate", dat_zap = "JsonDate", dat_par = "JsonDate", dat_kuhr = "JsonDate", typ_ag = "number", ktg_typ = "number", cis_bdo = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mena = "number", c_mena = "JsonDecimal", zp_z = "number", hra_pop = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", id_platby = "string", ktg_upo = "number", dat_vzniku = "JsonDate", radek_upo = "number", por_cislo_int = "number", rok = "number", ico = "string", ucs = "string", upl = "number", exp_pla = "number", bu_pop = "string", mena_pop = "number", mena_poz = "number", inf1 = "string", inf2 = "string", c_par_mena = "JsonDecimal", ixp_real = "string", ixs_ext = "string", priz_nepar = "number", popis = "string", sds = "string", priz_pred_rcdn = "number", c_z0_par = "JsonDecimal", c_d0_par = "JsonDecimal", c_z1_par = "JsonDecimal", c_d1_par = "JsonDecimal", c_z2_par = "JsonDecimal", c_d2_par = "JsonDecimal", c_zao_par = "JsonDecimal", ixs_zmp_prik = "string", pri_uhr = "number", dat_sch = "JsonDate", radek_upo_rez = "number", priz_rez_pri = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", dsp = "string", kurz = "JsonDecimal", alg_par = "number", ixp_vaz = "string", dat_spl_ag = "JsonDate", c_z3_par = "JsonDecimal", c_d3_par = "JsonDecimal", c_z4_par = "JsonDecimal", c_d4_par = "JsonDecimal", uus = "string", u_zp = "number", sk_ci_mf = "string", bu_ci_mf = "string", c_mf = "JsonDecimal", ixs_esu_mf = "string", vs_mf = "string", ks_mf = "string", ss_mf = "string", id_hdr_ris_pik = "string", radek_hdr_pik = "number", popis2 = "string", oka_pla = "number", nazev_dod = "string", ico_esu = "string", mena_txt = "string", ktg_upo_txt = "string", upl_zkr = "string", upl_txt = "string", s_uhrp_zkr = "string", s_uhrp_txt = "string", zp_zkr = "string", zp_txt = "string", typ_ag_zkr = "string", c_new = "JsonDecimal", c_new_mena = "JsonDecimal", ucet_vl = "string", ucet_ci = "string", c_z0 = "JsonDecimal", c_roz = "JsonDecimal", c_roz_mena = "JsonDecimal",}
	const enum GRozpisPredpisuDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, bu_txt_vl = 46, sk_ci = 11, bu_ci = 34, bu_txt_ci = 46, ac = 20, ixp_den = 12, cis_bdo = 30, zmenu_prov = 12, pla_tit = 10, ucel_uhr = 30, dev_pov = 30, id_platby = 50, ico = 10, ucs = 10, bu_pop = 34, inf1 = 34, inf2 = 34, ixp_real = 12, ixs_ext = 12, popis = 254, sds = 10, ixs_zmp_prik = 12, ixp_sml = 12, dsp = 1, ixp_vaz = 12, uus = 10, sk_ci_mf = 11, bu_ci_mf = 34, ixs_esu_mf = 12, vs_mf = 12, ks_mf = 12, ss_mf = 12, id_hdr_ris_pik = 10, popis2 = 140,}
	/**Dto primárních klíčů položky rozpisu předpisu*/
	interface GRozpisPredpisuPKDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
		/**c_roz*/
		c_roz?: JsonDecimal|null;
		/**c_roz_mena*/
		c_roz_mena?: JsonDecimal|null;
	}
	const enum GRozpisPredpisuPKDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", c_roz = "c_roz", c_roz_mena = "c_roz_mena",}
	const enum GRozpisPredpisuPKDtoFragments { ixp = "*", radek_uhr = "*", c_roz = "*", c_roz_mena = "*",}
	const enum GRozpisPredpisuPKDtoTypes { ixp = "string", radek_uhr = "number", c_roz = "JsonDecimal", c_roz_mena = "JsonDecimal",}
	const enum GRozpisPredpisuPKDtoTypeLengths { ixp = 12,}
	/**Dto primárních klíčů položky rozpisu předpisu + ceny pro uložení*/
	interface GRozpisPredpisuSaveDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
		/**Částka*/
		c?: JsonDecimal|null;
		/**Částka v měně*/
		c_mena?: JsonDecimal|null;
	}
	const enum GRozpisPredpisuSaveDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", c = "c", c_mena = "c_mena",}
	const enum GRozpisPredpisuSaveDtoFragments { ixp = "*", radek_uhr = "*", c = "*", c_mena = "*",}
	const enum GRozpisPredpisuSaveDtoTypes { ixp = "string", radek_uhr = "number", c = "JsonDecimal", c_mena = "JsonDecimal",}
	const enum GRozpisPredpisuSaveDtoTypeLengths { ixp = 12,}
	/**Dto primárních klíčů položky rozpisu předpisu + ceny pro načtení a validaci*/
	interface GRozpisPredpisuLoadAndValidateReqDto {
		/**Klíče + ceny rozpisu pro načtení a validaci - pouze pro DDP*/
		rozpisKeys?: Gordic.Buc.Interface.GRozpisPredpisuSaveDto[]|null;
		/**DTO s vybraným předpisem úhrady*/
		predpisDto?: Gordic.Buc.Interface.GVyberUhradyDto|null;
		/**Částka nespárované platby v měně*/
		c_mena_platba?: JsonDecimal|null;
	}
	const enum GRozpisPredpisuLoadAndValidateReqDtoNames { rozpisKeys = "rozpisKeys", predpisDto = "predpisDto", c_mena_platba = "c_mena_platba",}
	const enum GRozpisPredpisuLoadAndValidateReqDtoFragments { rozpisKeys = "*", predpisDto = "*", c_mena_platba = "*",}
	const enum GRozpisPredpisuLoadAndValidateReqDtoTypes { rozpisKeys = "Gordic.Buc.Interface.GRozpisPredpisuSaveDto[]", predpisDto = "Gordic.Buc.Interface.GVyberUhradyDto", c_mena_platba = "JsonDecimal",}
	const enum GRozpisPredpisuLoadAndValidateReqDtoTypeLengths {}
	/**Výsledek načtení a validace rozpisu předpisu*/
	interface GRozpisPredpisuLoadAndValidateResDto {
		/**Klíče + ceny rozpisu pro načtení a validaci - pouze pro DDP*/
		rozpisPredpisuList?: Gordic.Buc.Interface.GRozpisPredpisuDto[]|null;
		/**Suma částek rozpisu v měně*/
		c_mena_sum?: JsonDecimal|null;
	}
	const enum GRozpisPredpisuLoadAndValidateResDtoNames { rozpisPredpisuList = "rozpisPredpisuList", c_mena_sum = "c_mena_sum",}
	const enum GRozpisPredpisuLoadAndValidateResDtoFragments { rozpisPredpisuList = "*", c_mena_sum = "*",}
	const enum GRozpisPredpisuLoadAndValidateResDtoTypes { rozpisPredpisuList = "Gordic.Buc.Interface.GRozpisPredpisuDto[]", c_mena_sum = "JsonDecimal",}
	const enum GRozpisPredpisuLoadAndValidateResDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\PlatebniKarty\GDavkaAvizoDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucsakp
	*      Avízo karetních plateb
	*/
	interface GDavkaAvizoDto {
		/**Licence databáze*/
		lic?: string|null;
		davka?: number|null;
		/**Kartové centrum*/
		kac?: number|null;
		cis_obch?: JsonDecimal|null;
		cis_avi?: number|null;
		dat_avi?: JsonDate|null;
		dat_zau?: JsonDate|null;
		/**VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		vs?: string|null;
		/**SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		ss?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		c_sum_tra?: JsonDecimal|null;
		c_sum_pop?: JsonDecimal|null;
		c_sum_zau?: JsonDecimal|null;
		ozn_dav?: string|null;
		s_rozp?: number|null;
		dat_zmena_nac?: JsonDate|null;
		/**Bankovní účet vlastní - spojené*/
		ucet_vl?: string|null;
		/**Stav rozpisu avíza zkratkou*/
		s_rozp_zkr?: string|null;
		/**Stav rozpisu avíza textem*/
		s_rozp_txt?: string|null;
	}
	const enum GDavkaAvizoDtoNames { lic = "lic", davka = "davka", kac = "kac", cis_obch = "cis_obch", cis_avi = "cis_avi", dat_avi = "dat_avi", dat_zau = "dat_zau", vs = "vs", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", c_sum_tra = "c_sum_tra", c_sum_pop = "c_sum_pop", c_sum_zau = "c_sum_zau", ozn_dav = "ozn_dav", s_rozp = "s_rozp", dat_zmena_nac = "dat_zmena_nac", ucet_vl = "ucet_vl", s_rozp_zkr = "s_rozp_zkr", s_rozp_txt = "s_rozp_txt",}
	const enum GDavkaAvizoDtoFragments { lic = "*", davka = "*", kac = "*", cis_obch = "*", cis_avi = "*", dat_avi = "*", dat_zau = "*", vs = "*", ss = "*", sk_vl = "*", bu_vl = "*", c_sum_tra = "*", c_sum_pop = "*", c_sum_zau = "*", ozn_dav = "*", s_rozp = "*", dat_zmena_nac = "*", ucet_vl = "*", s_rozp_zkr = "*", s_rozp_txt = "*",}
	const enum GDavkaAvizoDtoTypes { lic = "string", davka = "number", kac = "number", cis_obch = "JsonDecimal", cis_avi = "number", dat_avi = "JsonDate", dat_zau = "JsonDate", vs = "string", ss = "string", sk_vl = "string", bu_vl = "string", c_sum_tra = "JsonDecimal", c_sum_pop = "JsonDecimal", c_sum_zau = "JsonDecimal", ozn_dav = "string", s_rozp = "number", dat_zmena_nac = "JsonDate", ucet_vl = "string", s_rozp_zkr = "string", s_rozp_txt = "string",}
	const enum GDavkaAvizoDtoTypeLengths { lic = 4, vs = 12, ss = 12, sk_vl = 11, bu_vl = 34, ozn_dav = 254,}
	/**Service Permissions pro práci se avízy platebních karet*/
	interface GDavkaAvizoServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno načíst*/
		LzeNacist: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaAvizoServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeNacist = "LzeNacist",}
	const enum GDavkaAvizoServicePermissionsFragments { LzeZobrazit = "*", LzeNacist = "*",}
	const enum GDavkaAvizoServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeNacist = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaAvizoServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\PlatebniKarty\GDavkaAvizoPolozkaDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucdakp
	*      Avízo karetních plateb - položky
	*/
	interface GDavkaAvizoPolozkaDto {
		/**Licence databáze*/
		lic?: string|null;
		davka?: number|null;
		/**Řádek v XML*/
		radek?: number|null;
		subradek?: number|null;
		cis_sum?: number|null;
		/**ID platebního terminálu*/
		pos_id?: string|null;
		dat_tra?: JsonDate|null;
		karta_id?: string|null;
		aut_kod?: string|null;
		/**Všeobecná textová poznámka*/
		poznamka?: string|null;
		c_tra?: JsonDecimal|null;
		c_pop?: JsonDecimal|null;
		c_zau?: JsonDecimal|null;
		s_ide?: number|null;
		/**VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		vs?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		ixp_pok?: string|null;
		por_cislo_pok?: number|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		ss?: string|null;
		ref_cislo?: string|null;
		priz_rap?: number|null;
		/**Účtování plateb FUC*/
		uhp?: number|null;
		/**Bankovní účet vlastní - spojené*/
		ucet_vl?: string|null;
		/**Zkratka s_ide*/
		s_ide_zkr?: string|null;
		/**Textový popis s_ide*/
		s_ide_txt?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GDavkaAvizoPolozkaPermissions|null;
	}
	const enum GDavkaAvizoPolozkaDtoNames { lic = "lic", davka = "davka", radek = "radek", subradek = "subradek", cis_sum = "cis_sum", pos_id = "pos_id", dat_tra = "dat_tra", karta_id = "karta_id", aut_kod = "aut_kod", poznamka = "poznamka", c_tra = "c_tra", c_pop = "c_pop", c_zau = "c_zau", s_ide = "s_ide", vs = "vs", sk_vl = "sk_vl", bu_vl = "bu_vl", ixp_pok = "ixp_pok", por_cislo_pok = "por_cislo_pok", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ss = "ss", ref_cislo = "ref_cislo", priz_rap = "priz_rap", uhp = "uhp", ucet_vl = "ucet_vl", s_ide_zkr = "s_ide_zkr", s_ide_txt = "s_ide_txt", Permissions = "Permissions",}
	const enum GDavkaAvizoPolozkaDtoFragments { lic = "*", davka = "*", radek = "*", subradek = "*", cis_sum = "*", pos_id = "*", dat_tra = "*", karta_id = "*", aut_kod = "*", poznamka = "*", c_tra = "*", c_pop = "*", c_zau = "*", s_ide = "*", vs = "*", sk_vl = "*", bu_vl = "*", ixp_pok = "*", por_cislo_pok = "*", zmenu_prov = "*", dat_zmena = "*", ss = "*", ref_cislo = "*", priz_rap = "*", uhp = "*", ucet_vl = "*", s_ide_zkr = "*", s_ide_txt = "*", Permissions = "Permissions",}
	const enum GDavkaAvizoPolozkaDtoTypes { lic = "string", davka = "number", radek = "number", subradek = "number", cis_sum = "number", pos_id = "string", dat_tra = "JsonDate", karta_id = "string", aut_kod = "string", poznamka = "string", c_tra = "JsonDecimal", c_pop = "JsonDecimal", c_zau = "JsonDecimal", s_ide = "number", vs = "string", sk_vl = "string", bu_vl = "string", ixp_pok = "string", por_cislo_pok = "number", zmenu_prov = "string", dat_zmena = "JsonDate", ss = "string", ref_cislo = "string", priz_rap = "number", uhp = "number", ucet_vl = "string", s_ide_zkr = "string", s_ide_txt = "string", Permissions = "Gordic.Buc.Interface.GDavkaAvizoPolozkaPermissions",}
	const enum GDavkaAvizoPolozkaDtoTypeLengths { lic = 4, pos_id = 10, karta_id = 25, aut_kod = 10, poznamka = 254, vs = 12, sk_vl = 11, bu_vl = 34, ixp_pok = 12, zmenu_prov = 12, ss = 12, ref_cislo = 20,}
	/**Permissions pro práci s položkou dávky avíza platební karty*/
	interface GDavkaAvizoPolozkaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno otevřít rozpis/rozpad položky*/
		LzeRozpis: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno dohledat*/
		LzeDohledat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno změnit stav na neznámá*/
		LzeOznacNeznama: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno změnit stav na neidentifikovaná*/
		LzeOznacNeidentifikovana: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaAvizoPolozkaPermissionsNames { LzeRozpis = "LzeRozpis", LzeDohledat = "LzeDohledat", LzeOznacNeznama = "LzeOznacNeznama", LzeOznacNeidentifikovana = "LzeOznacNeidentifikovana",}
	const enum GDavkaAvizoPolozkaPermissionsFragments { LzeRozpis = "*", LzeDohledat = "*", LzeOznacNeznama = "*", LzeOznacNeidentifikovana = "*",}
	const enum GDavkaAvizoPolozkaPermissionsTypes { LzeRozpis = "Gordic.General.ApplicationInterface.GPermission", LzeDohledat = "Gordic.General.ApplicationInterface.GPermission", LzeOznacNeznama = "Gordic.General.ApplicationInterface.GPermission", LzeOznacNeidentifikovana = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaAvizoPolozkaPermissionsTypeLengths {}
	/**DTO pro změnu stavu položky dávky avíza platební karty*/
	interface GDavkaAvizoPolozkaZmenaStavuReqDto {
		davka?: number|null;
		/**Řádek v XML*/
		radek?: number|null;
		subradek?: number|null;
		/**Stav pro nastavení (10 - neidentifikovaná, 30 - neznámá)*/
		stav?: number|null;
	}
	const enum GDavkaAvizoPolozkaZmenaStavuReqDtoNames { davka = "davka", radek = "radek", subradek = "subradek", stav = "stav",}
	const enum GDavkaAvizoPolozkaZmenaStavuReqDtoFragments { davka = "*", radek = "*", subradek = "*", stav = "*",}
	const enum GDavkaAvizoPolozkaZmenaStavuReqDtoTypes { davka = "number", radek = "number", subradek = "number", stav = "number",}
	const enum GDavkaAvizoPolozkaZmenaStavuReqDtoTypeLengths {}
	/**DTO pro získání typu a počtu dohledaných plateb k identifikaci položky avíza*/
	interface GDavkaAvizoPolozkaDohledanePlatbyDto {
		/**Typ dohledání*/
		typ_doh?: number|null;
		/**Počet dohledaných plateb*/
		poc_doh?: number|null;
	}
	const enum GDavkaAvizoPolozkaDohledanePlatbyDtoNames { typ_doh = "typ_doh", poc_doh = "poc_doh",}
	const enum GDavkaAvizoPolozkaDohledanePlatbyDtoFragments { typ_doh = "*", poc_doh = "*",}
	const enum GDavkaAvizoPolozkaDohledanePlatbyDtoTypes { typ_doh = "number", poc_doh = "number",}
	const enum GDavkaAvizoPolozkaDohledanePlatbyDtoTypeLengths {}
	/**Dto pro výběr úhrady POK provedenou platební kartou při procesu identifikaci položky avíza*/
	interface GDavkaAvizoPolozkaUhradaPOKDto {
		/**PK dokladu přínáležejícího k platbě*/
		ixp?: string|null;
		/**Pořadové číslo záznaku pro daný doklad*/
		por_cislo?: number|null;
		/**Identifikátor terminálu*/
		pos_id?: string|null;
		/**Číslo karty*/
		card_no?: string|null;
		/**Autorizační kód transakce z terminálu*/
		auth_code?: string|null;
		/**Datum provedení transakce*/
		trans_date?: JsonDate|null;
		/**Částka*/
		c?: JsonDecimal|null;
		/**Název externího subjektu*/
		nazev?: string|null;
	}
	const enum GDavkaAvizoPolozkaUhradaPOKDtoNames { ixp = "ixp", por_cislo = "por_cislo", pos_id = "pos_id", card_no = "card_no", auth_code = "auth_code", trans_date = "trans_date", c = "c", nazev = "nazev",}
	const enum GDavkaAvizoPolozkaUhradaPOKDtoFragments { ixp = "*", por_cislo = "*", pos_id = "*", card_no = "*", auth_code = "*", trans_date = "*", c = "*", nazev = "*",}
	const enum GDavkaAvizoPolozkaUhradaPOKDtoTypes { ixp = "string", por_cislo = "number", pos_id = "string", card_no = "string", auth_code = "string", trans_date = "JsonDate", c = "JsonDecimal", nazev = "string",}
	const enum GDavkaAvizoPolozkaUhradaPOKDtoTypeLengths { ixp = 12, pos_id = 32, card_no = 25, auth_code = 10,}
	/**DTO pro manuální identifikaci položky avíza*/
	interface GDavkaAvizoPolozkaIdentifikaceReqDto {
		/**Číslo dávky*/
		davka?: number|null;
		/**Řádek v XML*/
		radek?: number|null;
		/**PK dokladu přínáležejícího k platbě*/
		ixp_pok?: string|null;
		/**Pořadové číslo záznaku pro daný doklad*/
		por_cislo?: number|null;
	}
	const enum GDavkaAvizoPolozkaIdentifikaceReqDtoNames { davka = "davka", radek = "radek", ixp_pok = "ixp_pok", por_cislo = "por_cislo",}
	const enum GDavkaAvizoPolozkaIdentifikaceReqDtoFragments { davka = "*", radek = "*", ixp_pok = "*", por_cislo = "*",}
	const enum GDavkaAvizoPolozkaIdentifikaceReqDtoTypes { davka = "number", radek = "number", ixp_pok = "string", por_cislo = "number",}
	const enum GDavkaAvizoPolozkaIdentifikaceReqDtoTypeLengths { ixp_pok = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\PlatebniKarty\IGDavkaAvizo.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Avízo karetních plateb
	* @domain Banka
	*/
	interface BucDavkaAvizo {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaAvizoDto>>;
		/**Automatická identifikace položek avíz*/
		automatickyIdentifikovat(rq?:CallParams<{}>): _Task<{},void>;
		/**Vrátí oprávnění avíz platebních karet*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GDavkaAvizoServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaAvizo: ServiceBase & Catalog.BucDavkaAvizo;
	}
	const BucDavkaAvizo: Client["BucDavkaAvizo"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu dávek avíz karetních plateb*/
	const enum GDavkaAvizoFilter {
		/**PK tabulky - dávka*/
		davka,
		/**PK tabulky - lic*/
		lic,
		/**PK tabulky - Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl,
		/**PK tabulky - Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl,
		/**Částka*/
		c,
		/**variabilní symbol*/
		vs,
		/**specifický symbol*/
		ss,
		/**Režim/mód nabídky (0-1)*/
		mod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\PlatebniKarty\IGDavkaAvizoPolozka.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Avízo karetních plateb - položky
	* @domain Banka
	*/
	interface BucDavkaAvizoPolozka {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaAvizoPolozkaDto>>;
		/**List*/
		listRozpisPolozky(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaAvizoPolozkaDto>>;
		/**Změna stavu na Neznámá platba nebo Neidentifikovaná platba*/
		zmenaStavu(rq?:Gordic.Buc.Interface.GDavkaAvizoPolozkaZmenaStavuReqDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaAvizoPolozkaZmenaStavuReqDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaAvizoPolozkaZmenaStavuReqDto>,void>;
		/**Získání typ a počtu dohledaných plateb pro identifikaci položky avíza*/
		dohledatPlatbyTypPocet(rq?:CallParams<{davka:number,radek:number,subradek:number}>): _Task<{davka:number,radek:number,subradek:number},GServiceReadResponse<Gordic.Buc.Interface.GDavkaAvizoPolozkaDohledanePlatbyDto>>;
		/**List úhrad POK pro identifikaci položky avíza*/
		listUhradyPOK(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaAvizoPolozkaUhradaPOKDto>>;
		/**Identifikace manuálně dohledané položky*/
		identifikovatPolozku(rq?:Gordic.Buc.Interface.GDavkaAvizoPolozkaIdentifikaceReqDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaAvizoPolozkaIdentifikaceReqDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaAvizoPolozkaIdentifikaceReqDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaAvizoPolozka: ServiceBase & Catalog.BucDavkaAvizoPolozka;
	}
	const BucDavkaAvizoPolozka: Client["BucDavkaAvizoPolozka"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu dávek avíz karetních plateb - položky*/
	const enum GDavkaAvizoPolozkaFilter {
		/**PK tabulky - dávka*/
		davka,
		/**PK tabulky - radek*/
		radek,
		/**PK tabulky - subradek*/
		subradek,
		/**Režim/mód nabídky (0-1)*/
		mod,
	}
	/**Filtry pro požadavky na budování LISTu úhrad POK pro identifikaci položky avíza*/
	const enum GDavkaAvizoPolozkaUhradaPOKFilter {
		/**ID karty*/
		karta_id,
		/**Typ dohledané platby*/
		typ_doh,
		/**Identifikátor terminálu*/
		pos_id,
		/**Částka transakce*/
		c_tra,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\PodDavPDB\Gordic.Buc.Interface.IGPodDavPDB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Podpis dávky příkazů do banky.
	* @domain Banka
	* @businessObject PodDavDPB
	*/
	interface PodDavDPB {
		/**Detail Podpis dávky příkazů do banky.*/
		read(rq?:Gordic.Buc.Interface.GPodDavDPBDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GPodDavDPBDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GPodDavDPBDto>,GServiceReadResponse<Gordic.Buc.Interface.GPodDavDPBDto>>;
		/**Seznam Podpis dávky příkazů do banky.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GPodDavDPBDto>>;
		/**Počet Podpis dávky příkazů do banky.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Storno - Odstranění podpisu dávky příkazů do banky*/
		stornujPodpis(rq?:Gordic.Buc.Interface.GPodDavPDBPripravDataOperationDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GPodDavPDBPripravDataOperationDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GPodDavPDBPripravDataOperationDto>,GServiceActionResponse<Gordic.Buc.Interface.GPodDavPDBPripravDataOperationDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PodDavDPB: ServiceBase & Catalog.PodDavDPB;
	}
	const PodDavDPB: Client["PodDavDPB"];
}
declare namespace Gordic.Buc.Interface {
	/**Oprávnění pro jeden podpis*/
	interface GPodDavPDBPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze odstranit*/
		LzeOdstranit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPodDavPDBPermissionNames { LzeOdstranit = "LzeOdstranit",}
	const enum GPodDavPDBPermissionFragments { LzeOdstranit = "*",}
	const enum GPodDavPDBPermissionTypes { LzeOdstranit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPodDavPDBPermissionTypeLengths {}
	/**Oprávnění pro práci nad seznamem podpisů*/
	interface GPodDavPDBServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze odstranit*/
		LzeOdstranit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPodDavPDBServicePermissionNames { LzeOdstranit = "LzeOdstranit",}
	const enum GPodDavPDBServicePermissionFragments { LzeOdstranit = "*",}
	const enum GPodDavPDBServicePermissionTypes { LzeOdstranit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPodDavPDBServicePermissionTypeLengths {}
	/**Filtr pro Podpis dávky příkazů do banky.*/
	const enum GPodDavDPBFilter {
		/**Identifikátor.*/
		ixp,
		/**Ixb.*/
		ixb,
		/**Typ elp.*/
		typ_elp,
		/**Priz ro.*/
		priz_ro,
		/**Datumum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Aktivita.*/
		aktivita,
		/**Popis.*/
		popis,
		/**S sgn.*/
		s_sgn,
		/**Kov Typ soub.*/
		kov_typ_soub,
		/**Stav epx zve.*/
		stav_epx_zve,
		/**Stav ann.*/
		stav_ann,
		/**Ixb nad ann.*/
		ixb_nad_ann,
		/**Identifikátor ulo nad ann.*/
		ixs_ulo_nad_ann,
		/**Priz epk.*/
		priz_epk,
		/**Identifikátor dpo.*/
		ixs_dpo,
		/**Priz zver bch.*/
		priz_zver_bch,
		/**S schval.*/
		s_schval,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\PodDavPDB\Dto\Gordic.Buc.Interface.GPodDavPDBDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Datový objekt popisující Podpis dávky příkazů do banky.*/
	interface GPodDavDPBDto extends Gordic.Buc.Interface.GBucSeznamDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Ixb.*/
		ixb?: string|null;
		/**Typ elp.*/
		typ_elp?: number|null;
		/**Priz ro.*/
		priz_ro?: number|null;
		/**Datumum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Popis.*/
		popis?: string|null;
		/**S sgn.*/
		s_sgn?: number|null;
		/**Kov Typ soub.*/
		kov_typ_soub?: string|null;
		/**Stav epx zve.*/
		stav_epx_zve?: number|null;
		/**Stav ann.*/
		stav_ann?: number|null;
		/**Ixb nad ann.*/
		ixb_nad_ann?: string|null;
		/**Identifikátor ulo nad ann.*/
		ixs_ulo_nad_ann?: string|null;
		/**Priz epk.*/
		priz_epk?: number|null;
		/**Identifikátor dpo.*/
		ixs_dpo?: string|null;
		/**Priz zver bch.*/
		priz_zver_bch?: number|null;
		/**S schval.*/
		s_schval?: number|null;
		/**Název referenta  - kdo podepsal*/
		nazev_ref?: string|null;
		/**ixs_cer*/
		ixs_cer?: string|null;
		/**Název certifikátu*/
		jmeno?: string|null;
		/**Organizace*/
		firma?: string|null;
		/**Platnost cert.od*/
		dat_od?: JsonDate|null;
		/**Platnost cert.do*/
		dat_do?: JsonDate|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GPodDavPDBPermission|null;
	}
	const enum GPodDavDPBDtoNames { ixp = "ixp", ixb = "ixb", typ_elp = "typ_elp", priz_ro = "priz_ro", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", popis = "popis", s_sgn = "s_sgn", kov_typ_soub = "kov_typ_soub", stav_epx_zve = "stav_epx_zve", stav_ann = "stav_ann", ixb_nad_ann = "ixb_nad_ann", ixs_ulo_nad_ann = "ixs_ulo_nad_ann", priz_epk = "priz_epk", ixs_dpo = "ixs_dpo", priz_zver_bch = "priz_zver_bch", s_schval = "s_schval", nazev_ref = "nazev_ref", ixs_cer = "ixs_cer", jmeno = "jmeno", firma = "firma", dat_od = "dat_od", dat_do = "dat_do", pocet = "pocet", Permissions = "Permissions", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GPodDavDPBDtoFragments { ixp = "main", ixb = "main", typ_elp = "main", priz_ro = "main", dat_zmena = "main", zmenu_prov = "main", aktivita = "main", popis = "main", s_sgn = "main", kov_typ_soub = "main", stav_epx_zve = "main", stav_ann = "main", ixb_nad_ann = "main", ixs_ulo_nad_ann = "main", priz_epk = "main", ixs_dpo = "main", priz_zver_bch = "main", s_schval = "main", nazev_ref = "nazev_ref", ixs_cer = "ixs_cer", jmeno = "jmeno", firma = "firma", dat_od = "dat_od", dat_do = "dat_do", pocet = "main", Permissions = "Permissions", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GPodDavDPBDtoTypes { ixp = "string", ixb = "string", typ_elp = "number", priz_ro = "number", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", popis = "string", s_sgn = "number", kov_typ_soub = "string", stav_epx_zve = "number", stav_ann = "number", ixb_nad_ann = "string", ixs_ulo_nad_ann = "string", priz_epk = "number", ixs_dpo = "string", priz_zver_bch = "number", s_schval = "number", nazev_ref = "string", ixs_cer = "string", jmeno = "string", firma = "string", dat_od = "JsonDate", dat_do = "JsonDate", pocet = "number", Permissions = "Gordic.Buc.Interface.GPodDavPDBPermission", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GPodDavDPBDtoTypeLengths { ixp = 12, ixb = 12, zmenu_prov = 12, popis = 254, kov_typ_soub = 25, ixb_nad_ann = 12, ixs_ulo_nad_ann = 12, ixs_dpo = 12,}
	/**třída pro operace nad podpisem*/
	interface GPodDavPDBPripravDataOperationDto extends Gordic.Buc.Interface.GBucOperationDto<Gordic.Buc.Interface.GPodDavDPBDto> {
		/**Počet podpisů definovaný - dle smlouvy s bankou*/
		poc_pod?: number|null;
	}
	const enum GPodDavPDBPripravDataOperationDtoNames { poc_pod = "poc_pod", ikc = "ikc", rows = "rows",}
	const enum GPodDavPDBPripravDataOperationDtoFragments { poc_pod = "*", ikc = "*", rows = "*",}
	const enum GPodDavPDBPripravDataOperationDtoTypes { poc_pod = "number", ikc = "Gordic.General.GIkc", rows = "Gordic.Buc.Interface.GPodDavDPBDto[]",}
	const enum GPodDavPDBPripravDataOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Prikaz\Gordic.Buc.Interface.IGPrikaz.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Příkaz k úhradě
	* @domain Prikaz
	*/
	interface Prikaz {
		/**Detail Příkazy k úhradě*/
		read(rq?:Gordic.Buc.Interface.GPrikazDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GPrikazDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GPrikazDto>,GServiceReadResponse<Gordic.Buc.Interface.GPrikazDto>>;
		/**Seznam Příkazy k úhradě*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GPrikazDto>>;
		/**Zjistí počet příkazů podle zadání vstupního filtru - pevná hodnota s_uhrp ve Filtrs posílaná z WK*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Příprava platebních příkazů*/
		pripravData(rq?:Gordic.Buc.Interface.GPrikazPripravDataOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GPrikazDto>>;
		/**Dokončení přípravy platebních příkazů a provedení všech kontrol*/
		zkontrolujData(rq?:Gordic.Buc.Interface.GPrikazPripravDataOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GPrikazDto>>;
		/**Kontrola disponibilních prostředků*/
		zkontrolujDisp(rq?:Gordic.Buc.Interface.GPrikazPripravDataOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GUcetVlDto>>;
		/**Generování dávky příkazů - ISL*/
		generujDavku(rq?:Gordic.Buc.Interface.GBankaDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankaDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankaDto>,GServiceActionResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Proplacení platebních příkazů - změna stavu*/
		proplatPrikazy(rq?:Gordic.Buc.Interface.GBankaDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankaDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankaDto>,GServiceActionResponse<Gordic.Buc.Interface.GBankaDto>>;
		/**Uloží informace o podpisu č.1 do dávky příkazů*/
		ulozPodpis1Davky(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceActionResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Odeslání platebních příkazů ( dávky ) do banky*/
		odesliPrikazy(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceActionResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Neodeslání platebních příkazů ( dávky ) do banky - dávka nebude nakopírována do adresáře, nebude odesílána WS*/
		neodesilejPrikazy(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceActionResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Vrácení dávky platebních příkazů - dávka bude stornována, příkazy vráceny do stavu *připraven příkaz**/
		vratDavkuPrikazu(rq?:Gordic.Buc.Interface.GDavkaPDBDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaPDBDto>,GServiceActionResponse<Gordic.Buc.Interface.GDavkaPDBDto>>;
		/**Pazastavení vybraných příkazů k úhradě - změna stavu na "Trvale pozastaven"*/
		pozastav(rq?:Gordic.Buc.Interface.GPrikazPripravDataOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GPrikazDto>>;
		/**Vymaže TMP tabulky pro přípravu příkazů*/
		vymazTMP(rq?:Gordic.Buc.Interface.GPrikazPripravDataOperationDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GPrikazPripravDataOperationDto>,GServiceGroupResponse<Gordic.Buc.Interface.GPrikazDto>>;
		/**Vrátí oprávnění k příkazům (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GPrikazServicePermission>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Prikaz: ServiceBase & Catalog.Prikaz;
	}
	const Prikaz: Client["Prikaz"];
}
declare namespace Gordic.Buc.Interface {
	/**Oprávnění pro jeden příkaz*/
	interface GPrikazPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze pozastavit*/
		LzePozastavit: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat*/
		LzeGenerovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze podepsat*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat*/
		LzeOdeslat: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPrikazPermissionNames { LzeZobrazit = "LzeZobrazit", LzePozastavit = "LzePozastavit", LzeGenerovat = "LzeGenerovat", LzePodepsat = "LzePodepsat", LzeOdeslat = "LzeOdeslat", LzeTisknout = "LzeTisknout",}
	const enum GPrikazPermissionFragments { LzeZobrazit = "*", LzePozastavit = "*", LzeGenerovat = "*", LzePodepsat = "*", LzeOdeslat = "*", LzeTisknout = "*",}
	const enum GPrikazPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePozastavit = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovat = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPrikazPermissionTypeLengths {}
	/**Oprávnění pro práci nad příkazy*/
	interface GPrikazServicePermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**lze pozastavit*/
		LzePozastavit: Gordic.General.ApplicationInterface.GPermission;
		/**lze generovat*/
		LzeGenerovat: Gordic.General.ApplicationInterface.GPermission;
		/**lze podepsat*/
		LzePodepsat: Gordic.General.ApplicationInterface.GPermission;
		/**lze odeslat*/
		LzeOdeslat: Gordic.General.ApplicationInterface.GPermission;
		/**lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPrikazServicePermissionNames { LzeZobrazit = "LzeZobrazit", LzePozastavit = "LzePozastavit", LzeGenerovat = "LzeGenerovat", LzePodepsat = "LzePodepsat", LzeOdeslat = "LzeOdeslat", LzeTisknout = "LzeTisknout",}
	const enum GPrikazServicePermissionFragments { LzeZobrazit = "*", LzePozastavit = "*", LzeGenerovat = "*", LzePodepsat = "*", LzeOdeslat = "*", LzeTisknout = "*",}
	const enum GPrikazServicePermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePozastavit = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovat = "Gordic.General.ApplicationInterface.GPermission", LzePodepsat = "Gordic.General.ApplicationInterface.GPermission", LzeOdeslat = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPrikazServicePermissionTypeLengths {}
	/**Filtr pro Příkazy k úhradě*/
	const enum GPrikazFilter {
		/**log_por_cislo*/
		log_por_cislo,
		/**ixp*/
		ixp,
		/**radek_uhr*/
		radek_uhr,
		/**subradek*/
		subradek,
		/**lic*/
		lic,
		/**vs*/
		vs,
		/**ks*/
		ks,
		/**ss*/
		ss,
		/**sk_vl*/
		sk_vl,
		/**bu_vl*/
		bu_vl,
		/**sk_ci*/
		sk_ci,
		/**bu_ci*/
		bu_ci,
		/**zp*/
		zp,
		/**ac*/
		ac,
		/**s_uhrp*/
		s_uhrp,
		/**c*/
		c,
		/**dat_spl*/
		dat_spl,
		/**typ_ag*/
		typ_ag,
		/**ktg_typ*/
		ktg_typ,
		/**mena*/
		mena,
		/**c_mena*/
		c_mena,
		/**zp_z*/
		zp_z,
		/**hra_pop*/
		hra_pop,
		/**pla_tit*/
		pla_tit,
		/**ucel_uhr*/
		ucel_uhr,
		/**dev_pov*/
		dev_pov,
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**ico_esu*/
		ico_esu,
		/**nazev*/
		nazev,
		/**lok_nazev*/
		lok_nazev,
		/**sbu*/
		sbu,
		/**upl*/
		upl,
		/**exp_pla*/
		exp_pla,
		/**bu_pop*/
		bu_pop,
		/**mena_pop*/
		mena_pop,
		/**mena_poz*/
		mena_poz,
		/**inf1*/
		inf1,
		/**inf2*/
		inf2,
		/**bic*/
		bic,
		/**adrban1*/
		adrban1,
		/**adrban2*/
		adrban2,
		/**adrban3*/
		adrban3,
		/**adrban4*/
		adrban4,
		/**adrbanstat*/
		adrbanstat,
		/**adrpri1*/
		adrpri1,
		/**adrpri2*/
		adrpri2,
		/**adrpri3*/
		adrpri3,
		/**adrpri4*/
		adrpri4,
		/**adrpristat*/
		adrpristat,
		/**mena_txt*/
		mena_txt,
		/**mena_pop_txt*/
		mena_pop_txt,
		/**mena_poz_txt*/
		mena_poz_txt,
		/**mena_bu_txt*/
		mena_bu_txt,
		/**ixs_esu*/
		ixs_esu,
		/**cs_nazev*/
		cs_nazev,
		/**typ_ban_xml*/
		typ_ban_xml,
		/**popis*/
		popis,
		/**sds*/
		sds,
		/**adrbanstat_aa*/
		adrbanstat_aa,
		/**priz_iban*/
		priz_iban,
		/**err_kod*/
		err_kod,
		/**vastmp*/
		vastmp,
		/**dat_zmena*/
		dat_zmena,
		/**req_id*/
		req_id,
		/**status*/
		status,
		/**priz_sr*/
		priz_sr,
		/**priz_dph*/
		priz_dph,
		/**dic*/
		dic,
		/**priz_nesp_pla*/
		priz_nesp_pla,
		/**dat_zver_nesp*/
		dat_zver_nesp,
		/**bu_txt*/
		bu_txt,
		/**bu_reg*/
		bu_reg,
		/**kon_dph*/
		kon_dph,
		/**dat_zdan*/
		dat_zdan,
		/**err_txt*/
		err_txt,
		/**pcp*/
		pcp,
		/**dat_spl_ag*/
		dat_spl_ag,
		/**var_kod*/
		var_kod,
		/**mena_ci*/
		mena_ci,
		/**mena_ci_txt*/
		mena_ci_txt,
		/**uus*/
		uus,
		/**dat_zmena_pep*/
		dat_zmena_pep,
		/**pop_dok*/
		pop_dok,
		/**priz_sepa*/
		priz_sepa,
		/**u_zp*/
		u_zp,
		/**sk_ci_mf*/
		sk_ci_mf,
		/**bu_ci_mf*/
		bu_ci_mf,
		/**c_mf*/
		c_mf,
		/**ixs_esu_mf*/
		ixs_esu_mf,
		/**vs_mf*/
		vs_mf,
		/**ks_mf*/
		ks_mf,
		/**ss_mf*/
		ss_mf,
		/**id_hdr_ris_pik*/
		id_hdr_ris_pik,
		/**radek_hdr_pik*/
		radek_hdr_pik,
		/**ikc*/
		ikc,
		/**existence v tabulce buctpep*/
		tpep_ano,
		/**příznak vyškrtnutého pohybu v tabulce buctpep*/
		tpep_uncheck,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Prikaz\Dto\Gordic.Buc.Interface.GPrikazDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro GPrikaz*/
	interface GPrikazDto extends Gordic.Buc.Interface.GBucSeznamTpepDto {
		/**log_por_cislo*/
		log_por_cislo?: number|null;
		/**ixp*/
		ixp?: string|null;
		/**radek_uhr*/
		radek_uhr?: number|null;
		/**subradek*/
		subradek?: number|null;
		/**lic*/
		lic?: string|null;
		/**vs*/
		vs?: string|null;
		/**ks*/
		ks?: string|null;
		/**ss*/
		ss?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**zp*/
		zp?: number|null;
		/**ac*/
		ac?: string|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**s_uhrp*/
		s_uhrp?: number|null;
		/**c*/
		c?: JsonDecimal|null;
		/**dat_spl*/
		dat_spl?: JsonDate|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**mena*/
		mena?: number|null;
		/**c_mena*/
		c_mena?: JsonDecimal|null;
		/**zp_z*/
		zp_z?: number|null;
		/**hra_pop*/
		hra_pop?: number|null;
		/**pla_tit*/
		pla_tit?: string|null;
		/**ucel_uhr*/
		ucel_uhr?: string|null;
		/**dev_pov*/
		dev_pov?: string|null;
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**ico_esu*/
		ico_esu?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**lok_nazev*/
		lok_nazev?: string|null;
		/**sbu*/
		sbu?: number|null;
		/**upl*/
		upl?: number|null;
		/**exp_pla*/
		exp_pla?: number|null;
		/**bu_pop*/
		bu_pop?: string|null;
		/**mena_pop*/
		mena_pop?: number|null;
		/**mena_poz*/
		mena_poz?: number|null;
		/**inf1*/
		inf1?: string|null;
		/**inf2*/
		inf2?: string|null;
		/**bic*/
		bic?: string|null;
		/**adrban1*/
		adrban1?: string|null;
		/**adrban2*/
		adrban2?: string|null;
		/**adrban3*/
		adrban3?: string|null;
		/**adrban4*/
		adrban4?: string|null;
		/**adrbanstat*/
		adrbanstat?: string|null;
		/**adrpri1*/
		adrpri1?: string|null;
		/**adrpri2*/
		adrpri2?: string|null;
		/**adrpri3*/
		adrpri3?: string|null;
		/**adrpri4*/
		adrpri4?: string|null;
		/**adrpristat*/
		adrpristat?: string|null;
		/**mena_txt*/
		mena_txt?: string|null;
		/**mena_pop_txt*/
		mena_pop_txt?: string|null;
		/**mena_poz_txt*/
		mena_poz_txt?: string|null;
		/**mena_bu_txt*/
		mena_bu_txt?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**cs_nazev*/
		cs_nazev?: string|null;
		/**typ_ban_xml*/
		typ_ban_xml?: string|null;
		/**popis*/
		popis?: string|null;
		/**sds*/
		sds?: string|null;
		/**ixs_zmp_prik*/
		ixs_zmp_prik?: string|null;
		/**dat_sch*/
		dat_sch?: JsonDate|null;
		/**adrbanstat_aa*/
		adrbanstat_aa?: string|null;
		/**priz_iban*/
		priz_iban?: number|null;
		/**err_kod*/
		err_kod?: number|null;
		/**vastmp*/
		vastmp?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**req_id*/
		req_id?: number|null;
		/**status*/
		status?: string|null;
		/**priz_sr*/
		priz_sr?: number|null;
		/**priz_dph*/
		priz_dph?: number|null;
		/**dic*/
		dic?: string|null;
		/**priz_nesp_pla*/
		priz_nesp_pla?: number|null;
		/**dat_zver_nesp*/
		dat_zver_nesp?: JsonDate|null;
		/**bu_txt*/
		bu_txt?: string|null;
		/**bu_reg*/
		bu_reg?: number|null;
		/**kon_dph*/
		kon_dph?: number|null;
		/**dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**err_txt*/
		err_txt?: string|null;
		/**pcp*/
		pcp?: number|null;
		/**dat_spl_ag*/
		dat_spl_ag?: JsonDate|null;
		/**var_kod*/
		var_kod?: number|null;
		/**mena_ci*/
		mena_ci?: number|null;
		/**mena_ci_txt*/
		mena_ci_txt?: string|null;
		/**uus*/
		uus?: string|null;
		/**dat_zmena_pep*/
		dat_zmena_pep?: JsonDate|null;
		/**pop_dok*/
		pop_dok?: string|null;
		/**priz_sepa*/
		priz_sepa?: number|null;
		/**u_zp*/
		u_zp?: number|null;
		/**sk_ci_mf*/
		sk_ci_mf?: string|null;
		/**bu_ci_mf*/
		bu_ci_mf?: string|null;
		/**c_mf*/
		c_mf?: JsonDecimal|null;
		/**ixs_esu_mf*/
		ixs_esu_mf?: string|null;
		/**vs_mf*/
		vs_mf?: string|null;
		/**ks_mf*/
		ks_mf?: string|null;
		/**ss_mf*/
		ss_mf?: string|null;
		/**id_hdr_ris_pik*/
		id_hdr_ris_pik?: string|null;
		/**radek_hdr_pik*/
		radek_hdr_pik?: number|null;
		/**ikc*/
		ikc?: Gordic.General.GIkc|null;
		/**zkr_ag*/
		zkr_ag?: string|null;
		/**typ_ag_txt*/
		typ_ag_txt?: string|null;
		/**upl_zkr*/
		upl_zkr?: string|null;
		/**upl_txt*/
		upl_txt?: string|null;
		/**s_uhrp_zkr*/
		s_uhrp_zkr?: string|null;
		/**s_uhrp_txt*/
		s_uhrp_txt?: string|null;
		/**zp_zkr*/
		zp_zkr?: string|null;
		/**zp_txt*/
		zp_txt?: string|null;
		/**Doplňující údaje k zahr.platbě*/
		udajeZP?: Gordic.Buc.Interface.GUdajeZPDto|null;
		/**počet položek rsp*/
		pocet_rsp?: number|null;
		/**Záznamy rezervací IISSP - Státní pokladna*/
		rsp?: Gordic.Buc.Interface.GRezIISSPDto[]|null;
		/**Příznak, zda bude výběr z pouze BUCDPEP - 0, nebo BUCTPEP - 1*/
		tpep_ano?: number|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GPrikazPermission|null;
	}
	const enum GPrikazDtoNames { log_por_cislo = "log_por_cislo", ixp = "ixp", radek_uhr = "radek_uhr", subradek = "subradek", lic = "lic", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", zp = "zp", ac = "ac", ixp_den = "ixp_den", s_uhrp = "s_uhrp", c = "c", dat_spl = "dat_spl", typ_ag = "typ_ag", ktg_typ = "ktg_typ", mena = "mena", c_mena = "c_mena", zp_z = "zp_z", hra_pop = "hra_pop", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", rok = "rok", ico = "ico", ucs = "ucs", ico_esu = "ico_esu", nazev = "nazev", lok_nazev = "lok_nazev", sbu = "sbu", upl = "upl", exp_pla = "exp_pla", bu_pop = "bu_pop", mena_pop = "mena_pop", mena_poz = "mena_poz", inf1 = "inf1", inf2 = "inf2", bic = "bic", adrban1 = "adrban1", adrban2 = "adrban2", adrban3 = "adrban3", adrban4 = "adrban4", adrbanstat = "adrbanstat", adrpri1 = "adrpri1", adrpri2 = "adrpri2", adrpri3 = "adrpri3", adrpri4 = "adrpri4", adrpristat = "adrpristat", mena_txt = "mena_txt", mena_pop_txt = "mena_pop_txt", mena_poz_txt = "mena_poz_txt", mena_bu_txt = "mena_bu_txt", ixs_esu = "ixs_esu", cs_nazev = "cs_nazev", typ_ban_xml = "typ_ban_xml", popis = "popis", sds = "sds", ixs_zmp_prik = "ixs_zmp_prik", dat_sch = "dat_sch", adrbanstat_aa = "adrbanstat_aa", priz_iban = "priz_iban", err_kod = "err_kod", vastmp = "vastmp", dat_zmena = "dat_zmena", req_id = "req_id", status = "status", priz_sr = "priz_sr", priz_dph = "priz_dph", dic = "dic", priz_nesp_pla = "priz_nesp_pla", dat_zver_nesp = "dat_zver_nesp", bu_txt = "bu_txt", bu_reg = "bu_reg", kon_dph = "kon_dph", dat_zdan = "dat_zdan", err_txt = "err_txt", pcp = "pcp", dat_spl_ag = "dat_spl_ag", var_kod = "var_kod", mena_ci = "mena_ci", mena_ci_txt = "mena_ci_txt", uus = "uus", dat_zmena_pep = "dat_zmena_pep", pop_dok = "pop_dok", priz_sepa = "priz_sepa", u_zp = "u_zp", sk_ci_mf = "sk_ci_mf", bu_ci_mf = "bu_ci_mf", c_mf = "c_mf", ixs_esu_mf = "ixs_esu_mf", vs_mf = "vs_mf", ks_mf = "ks_mf", ss_mf = "ss_mf", id_hdr_ris_pik = "id_hdr_ris_pik", radek_hdr_pik = "radek_hdr_pik", ikc = "ikc", zkr_ag = "zkr_ag", typ_ag_txt = "typ_ag_txt", upl_zkr = "upl_zkr", upl_txt = "upl_txt", s_uhrp_zkr = "s_uhrp_zkr", s_uhrp_txt = "s_uhrp_txt", zp_zkr = "zp_zkr", zp_txt = "zp_txt", udajeZP = "udajeZP", pocet_rsp = "pocet_rsp", rsp = "rsp", tpep_ano = "tpep_ano", Permissions = "Permissions", tpep_kind = "tpep_kind", tpep_check = "tpep_check", tpep_txt_err = "tpep_txt_err", IsChecked = "IsChecked", PrimaryKey = "PrimaryKey", PrimaryKeyInFilters = "PrimaryKeyInFilters",}
	const enum GPrikazDtoFragments { log_por_cislo = "main", ixp = "main", radek_uhr = "main", subradek = "main", lic = "main", vs = "main", ks = "main", ss = "main", sk_vl = "main", bu_vl = "main", sk_ci = "main", bu_ci = "main", zp = "main", ac = "main", ixp_den = "main", s_uhrp = "main", c = "main", dat_spl = "main", typ_ag = "main", ktg_typ = "main", mena = "main", c_mena = "main", zp_z = "main", hra_pop = "main", pla_tit = "main", ucel_uhr = "main", dev_pov = "main", rok = "main", ico = "main", ucs = "main", ico_esu = "ico_esu", nazev = "nazev", lok_nazev = "main", sbu = "main", upl = "main", exp_pla = "main", bu_pop = "main", mena_pop = "main", mena_poz = "main", inf1 = "main", inf2 = "main", bic = "main", adrban1 = "main", adrban2 = "main", adrban3 = "main", adrban4 = "main", adrbanstat = "main", adrpri1 = "main", adrpri2 = "main", adrpri3 = "main", adrpri4 = "main", adrpristat = "main", mena_txt = "mena_txt", mena_pop_txt = "main", mena_poz_txt = "mena_poz_txt", mena_bu_txt = "main", ixs_esu = "main", cs_nazev = "main", typ_ban_xml = "main", popis = "main", sds = "main", ixs_zmp_prik = "main", dat_sch = "main", adrbanstat_aa = "main", priz_iban = "main", err_kod = "main", vastmp = "main", dat_zmena = "main", req_id = "main", status = "main", priz_sr = "main", priz_dph = "main", dic = "dic", priz_nesp_pla = "main", dat_zver_nesp = "main", bu_txt = "main", bu_reg = "main", kon_dph = "main", dat_zdan = "main", err_txt = "main", pcp = "main", dat_spl_ag = "main", var_kod = "main", mena_ci = "main", mena_ci_txt = "main", uus = "main", dat_zmena_pep = "main", pop_dok = "main", priz_sepa = "main", u_zp = "main", sk_ci_mf = "main", bu_ci_mf = "main", c_mf = "main", ixs_esu_mf = "main", vs_mf = "main", ks_mf = "main", ss_mf = "main", id_hdr_ris_pik = "main", radek_hdr_pik = "main", ikc = "main", zkr_ag = "zkr_ag", typ_ag_txt = "typ_ag_txt", upl_zkr = "upl_zkr", upl_txt = "upl_txt", s_uhrp_zkr = "s_uhrp_zkr", s_uhrp_txt = "s_uhrp_txt", zp_zkr = "zp_zkr", zp_txt = "zp_txt", udajeZP = "*", pocet_rsp = "pocet_rsp", rsp = "rsp", tpep_ano = "*", Permissions = "*", tpep_kind = "*", tpep_check = "*", tpep_txt_err = "*", IsChecked = "*", PrimaryKey = "*", PrimaryKeyInFilters = "*",}
	const enum GPrikazDtoTypes { log_por_cislo = "number", ixp = "string", radek_uhr = "number", subradek = "number", lic = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", zp = "number", ac = "string", ixp_den = "string", s_uhrp = "number", c = "JsonDecimal", dat_spl = "JsonDate", typ_ag = "number", ktg_typ = "number", mena = "number", c_mena = "JsonDecimal", zp_z = "number", hra_pop = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", rok = "number", ico = "string", ucs = "string", ico_esu = "string", nazev = "string", lok_nazev = "string", sbu = "number", upl = "number", exp_pla = "number", bu_pop = "string", mena_pop = "number", mena_poz = "number", inf1 = "string", inf2 = "string", bic = "string", adrban1 = "string", adrban2 = "string", adrban3 = "string", adrban4 = "string", adrbanstat = "string", adrpri1 = "string", adrpri2 = "string", adrpri3 = "string", adrpri4 = "string", adrpristat = "string", mena_txt = "string", mena_pop_txt = "string", mena_poz_txt = "string", mena_bu_txt = "string", ixs_esu = "string", cs_nazev = "string", typ_ban_xml = "string", popis = "string", sds = "string", ixs_zmp_prik = "string", dat_sch = "JsonDate", adrbanstat_aa = "string", priz_iban = "number", err_kod = "number", vastmp = "number", dat_zmena = "JsonDate", req_id = "number", status = "string", priz_sr = "number", priz_dph = "number", dic = "string", priz_nesp_pla = "number", dat_zver_nesp = "JsonDate", bu_txt = "string", bu_reg = "number", kon_dph = "number", dat_zdan = "JsonDate", err_txt = "string", pcp = "number", dat_spl_ag = "JsonDate", var_kod = "number", mena_ci = "number", mena_ci_txt = "string", uus = "string", dat_zmena_pep = "JsonDate", pop_dok = "string", priz_sepa = "number", u_zp = "number", sk_ci_mf = "string", bu_ci_mf = "string", c_mf = "JsonDecimal", ixs_esu_mf = "string", vs_mf = "string", ks_mf = "string", ss_mf = "string", id_hdr_ris_pik = "string", radek_hdr_pik = "number", ikc = "Gordic.General.GIkc", zkr_ag = "string", typ_ag_txt = "string", upl_zkr = "string", upl_txt = "string", s_uhrp_zkr = "string", s_uhrp_txt = "string", zp_zkr = "string", zp_txt = "string", udajeZP = "Gordic.Buc.Interface.GUdajeZPDto", pocet_rsp = "number", rsp = "Gordic.Buc.Interface.GRezIISSPDto[]", tpep_ano = "number", Permissions = "Gordic.Buc.Interface.GPrikazPermission", tpep_kind = "number", tpep_check = "boolean", tpep_txt_err = "string", IsChecked = "boolean", PrimaryKey = "string", PrimaryKeyInFilters = "string",}
	const enum GPrikazDtoTypeLengths { ixp = 12, lic = 4, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ac = 20, ixp_den = 12, pla_tit = 10, ucel_uhr = 30, dev_pov = 30, ico = 10, ucs = 10, ico_esu = 10, nazev = 100, lok_nazev = 50, bu_pop = 34, inf1 = 34, inf2 = 34, bic = 20, adrban1 = 35, adrban2 = 35, adrban3 = 35, adrban4 = 35, adrbanstat = 3, adrpri1 = 35, adrpri2 = 35, adrpri3 = 35, adrpri4 = 35, adrpristat = 3, mena_txt = 3, mena_pop_txt = 3, mena_poz_txt = 3, mena_bu_txt = 3, ixs_esu = 12, cs_nazev = 50, typ_ban_xml = 254, popis = 254, sds = 10, ixs_zmp_prik = 12, adrbanstat_aa = 2, status = 1, dic = 15, bu_txt = 46, err_txt = 254, mena_ci_txt = 3, uus = 10, pop_dok = 254, sk_ci_mf = 11, bu_ci_mf = 34, ixs_esu_mf = 12, vs_mf = 12, ks_mf = 12, ss_mf = 12, id_hdr_ris_pik = 10, zkr_ag = 3, typ_ag_txt = 100, upl_zkr = 5, upl_txt = 50, s_uhrp_zkr = 5, s_uhrp_txt = 50, zp_zkr = 5, zp_txt = 50,}
	/**DTO pro odeslání dat platebních příkazů ( 1. sestavení filtru, 2. filtr )*/
	interface GPrikazPripravDataOperationDto extends Gordic.Buc.Interface.GBucOperationDto<Gordic.Buc.Interface.GPrikazDto> {
		/**Informace o vybrané bance - smlouvě*/
		banka?: Gordic.Buc.Interface.GBankaDto|null;
		/**Příznak pro dávku domácích plateb*/
		dom?: boolean|null;
		/**Příznak pro dávku zahraničních plateb*/
		zah?: boolean|null;
		/**Příznak pro dávku domácích+zahraničních plateb*/
		dom_zah?: boolean|null;
		/**Příznak pro dávku SEPA plateb*/
		sep?: boolean|null;
		/**Zadaný datum splatnosti - pokud zadán, nahradí dat.spl. z agendy*/
		dat_spl_zad?: JsonDate|null;
		/**Příznak, zda kontrolovat na registr DPH Ano/Ne*/
		kon_dph?: boolean|null;
		/**Generování dodatkových příkazů*/
		gen_dod_pri?: boolean|null;
	}
	const enum GPrikazPripravDataOperationDtoNames { banka = "banka", dom = "dom", zah = "zah", dom_zah = "dom_zah", sep = "sep", dat_spl_zad = "dat_spl_zad", kon_dph = "kon_dph", gen_dod_pri = "gen_dod_pri", ikc = "ikc", rows = "rows",}
	const enum GPrikazPripravDataOperationDtoFragments { banka = "*", dom = "*", zah = "*", dom_zah = "*", sep = "*", dat_spl_zad = "*", kon_dph = "*", gen_dod_pri = "*", ikc = "*", rows = "*",}
	const enum GPrikazPripravDataOperationDtoTypes { banka = "Gordic.Buc.Interface.GBankaDto", dom = "boolean", zah = "boolean", dom_zah = "boolean", sep = "boolean", dat_spl_zad = "JsonDate", kon_dph = "boolean", gen_dod_pri = "boolean", ikc = "Gordic.General.GIkc", rows = "Gordic.Buc.Interface.GPrikazDto[]",}
	const enum GPrikazPripravDataOperationDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Prikaz\Dto\Gordic.Buc.Interface.GRezIISSPDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Datový objekt popisující Záznam rezervace IISSP pro platební příkaz.*/
	interface GRezIISSPDto {
		/**Identifikátor rezervačního dokladu*/
		id_hdr_ris?: string|null;
		/**Položka rezervačního dokladu*/
		radek_hdr?: number|null;
		/**Částka rezervace*/
		c_rez?: JsonDecimal|null;
		/**Číslo chyby*/
		err?: number|null;
		/**Popis*/
		popis?: string|null;
		/**Číslo dávky do banky*/
		cis_dav?: number|null;
	}
	const enum GRezIISSPDtoNames { id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", c_rez = "c_rez", err = "err", popis = "popis", cis_dav = "cis_dav",}
	const enum GRezIISSPDtoFragments { id_hdr_ris = "main", radek_hdr = "main", c_rez = "main", err = "main", popis = "main", cis_dav = "main",}
	const enum GRezIISSPDtoTypes { id_hdr_ris = "string", radek_hdr = "number", c_rez = "JsonDecimal", err = "number", popis = "string", cis_dav = "number",}
	const enum GRezIISSPDtoTypeLengths { id_hdr_ris = 10, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Prikaz\Dto\Gordic.Buc.Interface.GUdajeZPDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro UdajeZP*/
	interface GUdajeZPDto {
		/**Adresa příjemce platby*/
		adrSubZP?: Gordic.Buc.Interface.GAdrSubZPDto|null;
		/**Adresa banky příjemce*/
		adrBanZP?: Gordic.Buc.Interface.GAdrBanZPDto|null;
		/**nazev_bu_ci*/
		nazev_bu_ci?: string|null;
		/**INN*/
		inn?: string|null;
		/**ehp_priz*/
		ehp_priz?: boolean|null;
		/**iban_priz*/
		iban_priz?: boolean|null;
		/**eur_poz_priz*/
		eur_poz_priz?: boolean|null;
		/**swif_priz*/
		swif_priz?: boolean|null;
		/**sha_priz*/
		sha_priz?: boolean|null;
		/**sepa_priz*/
		sepa_priz?: boolean|null;
		/**info*/
		info?: string|null;
		/**info_color 0-black,1-red*/
		info_color?: number|null;
	}
	const enum GUdajeZPDtoNames { adrSubZP = "adrSubZP", adrBanZP = "adrBanZP", nazev_bu_ci = "nazev_bu_ci", inn = "inn", ehp_priz = "ehp_priz", iban_priz = "iban_priz", eur_poz_priz = "eur_poz_priz", swif_priz = "swif_priz", sha_priz = "sha_priz", sepa_priz = "sepa_priz", info = "info", info_color = "info_color",}
	const enum GUdajeZPDtoFragments { adrSubZP = "*", adrBanZP = "*", nazev_bu_ci = "main", inn = "main", ehp_priz = "main", iban_priz = "main", eur_poz_priz = "main", swif_priz = "main", sha_priz = "main", sepa_priz = "main", info = "main", info_color = "main",}
	const enum GUdajeZPDtoTypes { adrSubZP = "Gordic.Buc.Interface.GAdrSubZPDto", adrBanZP = "Gordic.Buc.Interface.GAdrBanZPDto", nazev_bu_ci = "string", inn = "string", ehp_priz = "boolean", iban_priz = "boolean", eur_poz_priz = "boolean", swif_priz = "boolean", sha_priz = "boolean", sepa_priz = "boolean", info = "string", info_color = "number",}
	const enum GUdajeZPDtoTypeLengths { nazev_bu_ci = 50, inn = 50, info = 150,}
	/**DTO Adresa příjemce ZP*/
	interface GAdrSubZPDto {
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**ob_jmeno*/
		ob_jmeno?: string|null;
		/**stat*/
		stat?: number|null;
		/**psc*/
		psc?: string|null;
		/**obec*/
		obec?: string|null;
		/**cast_obce*/
		cast_obce?: string|null;
		/**ulice*/
		ulice?: string|null;
		/**cor*/
		cor?: string|null;
		/**cpop*/
		cpop?: string|null;
		/**pobox*/
		pobox?: string|null;
		/**ixs_prev*/
		ixs_prev?: string|null;
		/**dic*/
		dic?: string|null;
		/**tel*/
		tel?: string|null;
		/**stat_txt*/
		stat_txt?: string|null;
		/**posta*/
		posta?: string|null;
		/**stat_sis_aa*/
		stat_sis_aa?: string|null;
	}
	const enum GAdrSubZPDtoNames { ixs_esu = "ixs_esu", nazev = "nazev", ob_jmeno = "ob_jmeno", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", pobox = "pobox", ixs_prev = "ixs_prev", dic = "dic", tel = "tel", stat_txt = "stat_txt", posta = "posta", stat_sis_aa = "stat_sis_aa",}
	const enum GAdrSubZPDtoFragments { ixs_esu = "main", nazev = "main", ob_jmeno = "main", stat = "main", psc = "main", obec = "main", cast_obce = "main", ulice = "main", cor = "main", cpop = "main", pobox = "main", ixs_prev = "main", dic = "main", tel = "main", stat_txt = "stat_txt", posta = "posta", stat_sis_aa = "stat_sis_aa",}
	const enum GAdrSubZPDtoTypes { ixs_esu = "string", nazev = "string", ob_jmeno = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", pobox = "string", ixs_prev = "string", dic = "string", tel = "string", stat_txt = "string", posta = "string", stat_sis_aa = "string",}
	const enum GAdrSubZPDtoTypeLengths { ixs_esu = 12, nazev = 100, ob_jmeno = 254, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, pobox = 8, ixs_prev = 12, dic = 15, tel = 33, posta = 50, stat_sis_aa = 2,}
	/**DTO Adresa banky příjemce ZP*/
	interface GAdrBanZPDto {
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**ob_jmeno*/
		ob_jmeno?: string|null;
		/**stat*/
		stat?: number|null;
		/**psc*/
		psc?: string|null;
		/**obec*/
		obec?: string|null;
		/**cast_obce*/
		cast_obce?: string|null;
		/**ulice*/
		ulice?: string|null;
		/**cor*/
		cor?: string|null;
		/**cpop*/
		cpop?: string|null;
		/**pobox*/
		pobox?: string|null;
		/**ixs_prev*/
		ixs_prev?: string|null;
		/**dic*/
		dic?: string|null;
		/**tel*/
		tel?: string|null;
		/**stat_txt*/
		stat_txt?: string|null;
		/**posta*/
		posta?: string|null;
		/**stat_sis_aa*/
		stat_sis_aa?: string|null;
	}
	const enum GAdrBanZPDtoNames { ixs_esu = "ixs_esu", nazev = "nazev", ob_jmeno = "ob_jmeno", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", pobox = "pobox", ixs_prev = "ixs_prev", dic = "dic", tel = "tel", stat_txt = "stat_txt", posta = "posta", stat_sis_aa = "stat_sis_aa",}
	const enum GAdrBanZPDtoFragments { ixs_esu = "main", nazev = "main", ob_jmeno = "main", stat = "main", psc = "main", obec = "main", cast_obce = "main", ulice = "main", cor = "main", cpop = "main", pobox = "main", ixs_prev = "main", dic = "main", tel = "main", stat_txt = "stat_txt", posta = "posta", stat_sis_aa = "stat_sis_aa",}
	const enum GAdrBanZPDtoTypes { ixs_esu = "string", nazev = "string", ob_jmeno = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", pobox = "string", ixs_prev = "string", dic = "string", tel = "string", stat_txt = "string", posta = "string", stat_sis_aa = "string",}
	const enum GAdrBanZPDtoTypeLengths { ixs_esu = 12, nazev = 100, ob_jmeno = 254, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, pobox = 8, ixs_prev = 12, dic = 15, tel = 33, posta = 50, stat_sis_aa = 2,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Rozpis\GNapojeniPoplatniciDDPDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto pro výběr předpisů napojených poplatníků DDP*/
	interface GNapojeniPoplatniciDDPDto {
		/**Externí subjekt textově*/
		esu_txt?: string|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		/**Cena*/
		c?: JsonDecimal|null;
		/**Cena - zaplaceno*/
		c_uhr?: JsonDecimal|null;
		/**Cena - rozdíl*/
		c_roz?: JsonDecimal|null;
		/**Datum splatnosti*/
		dat_spl?: JsonDate|null;
		/**Datum úhrady*/
		dat_uhr?: JsonDate|null;
		/**Variabilní symbol*/
		vs?: string|null;
		/**Konstatní symbol*/
		ks?: string|null;
		/**Specifický symbol*/
		ss?: string|null;
		/**Agendové číslo*/
		ac?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu cizího*/
		sk_ci?: string|null;
		/**Bankovní účet cizí*/
		bu_ci?: string|null;
		/**Priorita platby*/
		pri_uhr?: number|null;
		/**Textová reprezentace kategorie předpisu*/
		ktg_upo_txt?: string|null;
		/**Bankovní účet vlastní - spojené*/
		ucet_vl?: string|null;
		/**Bankovní účet cizí - spojené*/
		ucet_ci?: string|null;
	}
	const enum GNapojeniPoplatniciDDPDtoNames { esu_txt = "esu_txt", ixp = "ixp", c = "c", c_uhr = "c_uhr", c_roz = "c_roz", dat_spl = "dat_spl", dat_uhr = "dat_uhr", vs = "vs", ks = "ks", ss = "ss", ac = "ac", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", pri_uhr = "pri_uhr", ktg_upo_txt = "ktg_upo_txt", ucet_vl = "ucet_vl", ucet_ci = "ucet_ci",}
	const enum GNapojeniPoplatniciDDPDtoFragments { esu_txt = "*", ixp = "*", c = "*", c_uhr = "*", c_roz = "*", dat_spl = "*", dat_uhr = "*", vs = "*", ks = "*", ss = "*", ac = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", pri_uhr = "*", ktg_upo_txt = "*", ucet_vl = "*", ucet_ci = "*",}
	const enum GNapojeniPoplatniciDDPDtoTypes { esu_txt = "string", ixp = "string", c = "JsonDecimal", c_uhr = "JsonDecimal", c_roz = "JsonDecimal", dat_spl = "JsonDate", dat_uhr = "JsonDate", vs = "string", ks = "string", ss = "string", ac = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", pri_uhr = "number", ktg_upo_txt = "string", ucet_vl = "string", ucet_ci = "string",}
	const enum GNapojeniPoplatniciDDPDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Rozpis\GRozpisPolozkyDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucdpol
	*      Dto pro rozpis položky bankovního výpisu
	*/
	interface GRozpisPolozkyDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Ekonomická aktivita*/
		eko_akt?: number|null;
		/**Identifikátor napárovaného dokladu
		*      Identifikátor předpisu platby, na který je řádek výpisu napárován
		*/
		ixp_par?: string|null;
		/**Číslo řádku napárovaného dokladu
		*      Číslo řádku předpisu napárovaného dokladu
		*/
		cislo_par?: number|null;
		/**Stav položky
		*      Stav položky ban.výpisu
		*/
		s_pol?: number|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Datum párování
		*      Datum párování položky výpisu - transakce
		*/
		dat_par?: JsonDate|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Částka párovaná
		*      Částka párované platby-transakce
		*/
		c_par?: JsonDecimal|null;
		/**Číslo bankovního dokladu
		*      Číslo bankovního dokladu
		*/
		cis_bdo?: string|null;
		/**Kód banky
		*      Kód banky-kód účtování
		*/
		kod_ban?: number|null;
		/**Kód dat
		*      Druh dat
		*/
		kod_dat?: number|null;
		/**Kód změny
		*      Kód změny položky
		*/
		kod_zme?: number|null;
		/**Datum valuta
		*      Datum, je-li uvedeno, ke kterému se započítává položka z hlediska výpočtu úroků
		*/
		dat_val?: JsonDate|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Autor poslední změny záznamu dle ginszmp*/
		zmenu_prov?: string|null;
		/**Způsob úhrady
		*      Způsob úhrady položky-transakce
		*/
		zu?: number|null;
		/**Datum UUP
		*      Datum uskutečnění účetního případu
		*/
		dat_uhr?: JsonDate|null;
		/**Identifikátor POK
		*      Identifikátor POK dokladu / transakce platební brány
		*/
		ixp_pok?: string|null;
		/**identifikátor hotovostní platby*/
		ixp_hpl?: string|null;
		/**Řádek účetního pohybu
		*      Řádek účetního pohybu v agendě FUC
		*/
		radek_upo?: number|null;
		/**VS - protistrany
		*      VS - protistrany
		*/
		vs2?: string|null;
		/**SS - protistrany
		*      SS - protistrany
		*/
		ss2?: string|null;
		/**Datum odpárování
		*      Datum odpárování položky-transakce
		*/
		dat_odp?: JsonDate|null;
		/**Datum odepsání z protiúčtu
		*      Datum odepsání v jiném peněžním ústavu
		*/
		dat_ode?: JsonDate|null;
		/**Určení platby
		*      Určení platby
		*/
		upl?: number|null;
		/**Měna*/
		mena?: number|null;
		/**Částka v měně
		*      Částka v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Kurz
		*      Kurz měny
		*/
		kurz?: JsonDecimal|null;
		/**Částka poplatků
		*      Částka poplatků bankovní transakce
		*/
		c_pop?: JsonDecimal|null;
		/**Měna poplatků
		*      Měna poplatků
		*/
		mena_pop?: number|null;
		/**Částka poplatků v měně
		*      Částka poplatků v měně
		*/
		c_pop_mena?: JsonDecimal|null;
		/**BIC
		*      BIC/SWIFT
		*/
		bic?: string|null;
		/**Částka párovaná v měně
		*      Částka párované platby v měně
		*/
		c_par_mena?: JsonDecimal|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**Datum položky
		*      Datum položky výpisu-transakce
		*/
		dat_pol?: JsonDate|null;
		/**Doplňkový popis
		*      Pokud popis položky přesáhne délku pole Veřejný popis, je zbytek pole zapsán do Doplňkový popis
		*/
		popis1?: string|null;
		/**Identifikátor BPL agendy
		*      Označení dokladu BPL pro úrok z prodlení k pohledávce
		*/
		ixp_bpl?: string|null;
		/**Příznak účtování hotovostních plateb*/
		uhp?: number|null;
		/**Účtárna
		*      UUS - účtárna účetního střediska - UUS zpracující organizace
		*/
		uus?: string|null;
		/**Pokyn
		*      Pokyn k likvidaci nespárované položky do FUC
		*/
		pokyn?: string|null;
		/**Kód zaúčtování
		*      Kód zaúčtování položky-transakce v bance
		*/
		kod_zau?: number|null;
		/**Identifikátor transakce
		*       Identifikátor transakce v bankovním systému
		*/
		tra_id?: string|null;
		/**Příznak nepárovar
		*      Příznak nepárovar
		*/
		priz_nepar?: number|null;
		/**Měna - textově*/
		mena_txt?: string|null;
		/**Bankovní účet cizí spojený*/
		ucet_ci?: string|null;
		/**Příznak nepárovar*/
		s_zau?: number|null;
		/**ac_uct - ???*/
		ac_uct?: string|null;
		/**Zkratka aktuálního stavu položky výpisu*/
		s_pol_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu položky výpisu*/
		s_pol_txt?: string|null;
		/**Zkratka aktuálního stavu zaúčtování*/
		s_zau_zkr?: string|null;
		/**Textové vyjádření aktuálního stavu zaúčtování*/
		s_zau_txt?: string|null;
		/**Textově způsob úhrady*/
		zu_txt?: string|null;
		/**Důvod vrácení - nutné pouze u Vratky B*/
		duv_vra?: string|null;
		/**ID aktuálního řádku dávky A-V při vzniku*/
		davka_av?: number|null;
		/**ID aktuálního řádku dávky SIPO při vzniku*/
		davka_sipo?: string|null;
		/**Sada oprávnění*/
		Permissions?: Gordic.Buc.Interface.GRozpisPolozkyPermissions|null;
	}
	const enum GRozpisPolozkyDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", lic = "lic", eko_akt = "eko_akt", ixp_par = "ixp_par", cislo_par = "cislo_par", s_pol = "s_pol", nazev = "nazev", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", dat_zap = "dat_zap", dat_par = "dat_par", vs = "vs", ks = "ks", ss = "ss", c = "c", c_par = "c_par", cis_bdo = "cis_bdo", kod_ban = "kod_ban", kod_dat = "kod_dat", kod_zme = "kod_zme", dat_val = "dat_val", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zu = "zu", dat_uhr = "dat_uhr", ixp_pok = "ixp_pok", ixp_hpl = "ixp_hpl", radek_upo = "radek_upo", vs2 = "vs2", ss2 = "ss2", dat_odp = "dat_odp", dat_ode = "dat_ode", upl = "upl", mena = "mena", c_mena = "c_mena", kurz = "kurz", c_pop = "c_pop", mena_pop = "mena_pop", c_pop_mena = "c_pop_mena", bic = "bic", c_par_mena = "c_par_mena", typ_ag = "typ_ag", dat_pol = "dat_pol", popis1 = "popis1", ixp_bpl = "ixp_bpl", uhp = "uhp", uus = "uus", pokyn = "pokyn", kod_zau = "kod_zau", tra_id = "tra_id", priz_nepar = "priz_nepar", mena_txt = "mena_txt", ucet_ci = "ucet_ci", s_zau = "s_zau", ac_uct = "ac_uct", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_txt", s_zau_zkr = "s_zau_zkr", s_zau_txt = "s_zau_txt", zu_txt = "zu_txt", duv_vra = "duv_vra", davka_av = "davka_av", davka_sipo = "davka_sipo", Permissions = "Permissions",}
	const enum GRozpisPolozkyDtoFragments { ixp = "Base", radek_pol = "Base", subradek = "Base", radek_av = "Base", lic = "Base", eko_akt = "Base", ixp_par = "Base", cislo_par = "Base", s_pol = "Base", nazev = "Base", sk_vl = "Base", bu_vl = "Base", sk_ci = "Base", bu_ci = "Base", dat_zap = "Base", dat_par = "Base", vs = "Base", ks = "Base", ss = "Base", c = "Base", c_par = "Base", cis_bdo = "Base", kod_ban = "Base", kod_dat = "Base", kod_zme = "Base", dat_val = "Base", dat_zmena = "Base", zmenu_prov = "Base", zu = "Base", dat_uhr = "Base", ixp_pok = "Base", ixp_hpl = "Base", radek_upo = "Base", vs2 = "Base", ss2 = "Base", dat_odp = "Base", dat_ode = "Base", upl = "Base", mena = "Base", c_mena = "Base", kurz = "Base", c_pop = "Base", mena_pop = "Base", c_pop_mena = "Base", bic = "Base", c_par_mena = "Base", typ_ag = "Base", dat_pol = "Base", popis1 = "Base", ixp_bpl = "Base", uhp = "Base", uus = "Base", pokyn = "Base", kod_zau = "Base", tra_id = "Base", priz_nepar = "Base", mena_txt = "Base", ucet_ci = "Base", s_zau = "Base", ac_uct = "Base", s_pol_zkr = "s_pol_zkr", s_pol_txt = "s_pol_zkr", s_zau_zkr = "typ_vypis_zkr", s_zau_txt = "typ_vypis_zkr", zu_txt = "zu_txt", duv_vra = "*", davka_av = "*", davka_sipo = "*", Permissions = "Permissions",}
	const enum GRozpisPolozkyDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", lic = "string", eko_akt = "number", ixp_par = "string", cislo_par = "number", s_pol = "number", nazev = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", dat_zap = "JsonDate", dat_par = "JsonDate", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", c_par = "JsonDecimal", cis_bdo = "string", kod_ban = "number", kod_dat = "number", kod_zme = "number", dat_val = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", zu = "number", dat_uhr = "JsonDate", ixp_pok = "string", ixp_hpl = "string", radek_upo = "number", vs2 = "string", ss2 = "string", dat_odp = "JsonDate", dat_ode = "JsonDate", upl = "number", mena = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", c_pop = "JsonDecimal", mena_pop = "number", c_pop_mena = "JsonDecimal", bic = "string", c_par_mena = "JsonDecimal", typ_ag = "number", dat_pol = "JsonDate", popis1 = "string", ixp_bpl = "string", uhp = "number", uus = "string", pokyn = "string", kod_zau = "number", tra_id = "string", priz_nepar = "number", mena_txt = "string", ucet_ci = "string", s_zau = "number", ac_uct = "string", s_pol_zkr = "string", s_pol_txt = "string", s_zau_zkr = "string", s_zau_txt = "string", zu_txt = "string", duv_vra = "string", davka_av = "number", davka_sipo = "string", Permissions = "Gordic.Buc.Interface.GRozpisPolozkyPermissions",}
	const enum GRozpisPolozkyDtoTypeLengths { ixp = 12, lic = 4, ixp_par = 12, nazev = 160, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, vs = 12, ks = 12, ss = 12, cis_bdo = 30, zmenu_prov = 12, ixp_pok = 12, ixp_hpl = 12, vs2 = 12, ss2 = 12, bic = 20, popis1 = 254, ixp_bpl = 12, uus = 10, pokyn = 254, tra_id = 254,}
	/**Permissions pro práci s položkou rozpisu položky bankovního výpisu*/
	interface GRozpisPolozkyPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat položku rozpisu*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit detailu párované platby položky rozpisu*/
		LzeParovano: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit účetní zápisy položky rozpisu*/
		LzeUcetniZapisy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zobrazit rozpis položek bankovního výpisu*/
		LzeRozpisPolozek: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozpisPolozkyPermissionsNames { LzeEditovat = "LzeEditovat", LzeParovano = "LzeParovano", LzeUcetniZapisy = "LzeUcetniZapisy", LzeRozpisPolozek = "LzeRozpisPolozek",}
	const enum GRozpisPolozkyPermissionsFragments { LzeEditovat = "*", LzeParovano = "*", LzeUcetniZapisy = "*", LzeRozpisPolozek = "*",}
	const enum GRozpisPolozkyPermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeParovano = "Gordic.General.ApplicationInterface.GPermission", LzeUcetniZapisy = "Gordic.General.ApplicationInterface.GPermission", LzeRozpisPolozek = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozpisPolozkyPermissionsTypeLengths {}
	/**Service Permissions pro práci rozpisem položky bankovního výpisu*/
	interface GRozpisPolozkyServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno editovat rozpis položky*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci předpisy*/
		LzePredpisy: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Dávky A-V*/
		LzeDavkyAV: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Dávky SIPO*/
		LzeDavkySIPO: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Avíza*/
		LzeAviza: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Vratka B*/
		LzeVratkaB: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Soubor*/
		LzeSoubor: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Kopírovat*/
		LzeKopirovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Dopočítat*/
		LzeDopocitat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Storno*/
		LzeStorno: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit akci Odstranit*/
		LzeOdstranit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno zaúčtovat položky rozpisu*/
		LzeZauctovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno odpárovat položky rozpisu*/
		LzeOdparovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GRozpisPolozkyServicePermissionsNames { LzeEditovat = "LzeEditovat", LzePredpisy = "LzePredpisy", LzeDavkyAV = "LzeDavkyAV", LzeDavkySIPO = "LzeDavkySIPO", LzeAviza = "LzeAviza", LzeVratkaB = "LzeVratkaB", LzeSoubor = "LzeSoubor", LzeKopirovat = "LzeKopirovat", LzeDopocitat = "LzeDopocitat", LzeStorno = "LzeStorno", LzeOdstranit = "LzeOdstranit", LzeZauctovat = "LzeZauctovat", LzeOdparovat = "LzeOdparovat",}
	const enum GRozpisPolozkyServicePermissionsFragments { LzeEditovat = "*", LzePredpisy = "*", LzeDavkyAV = "*", LzeDavkySIPO = "*", LzeAviza = "*", LzeVratkaB = "*", LzeSoubor = "*", LzeKopirovat = "*", LzeDopocitat = "*", LzeStorno = "*", LzeOdstranit = "*", LzeZauctovat = "*", LzeOdparovat = "*",}
	const enum GRozpisPolozkyServicePermissionsTypes { LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzePredpisy = "Gordic.General.ApplicationInterface.GPermission", LzeDavkyAV = "Gordic.General.ApplicationInterface.GPermission", LzeDavkySIPO = "Gordic.General.ApplicationInterface.GPermission", LzeAviza = "Gordic.General.ApplicationInterface.GPermission", LzeVratkaB = "Gordic.General.ApplicationInterface.GPermission", LzeSoubor = "Gordic.General.ApplicationInterface.GPermission", LzeKopirovat = "Gordic.General.ApplicationInterface.GPermission", LzeDopocitat = "Gordic.General.ApplicationInterface.GPermission", LzeStorno = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranit = "Gordic.General.ApplicationInterface.GPermission", LzeZauctovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdparovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GRozpisPolozkyServicePermissionsTypeLengths {}
	/**Dto request pro hromadnou aktualizaci/vytvoření rozpisu položky*/
	interface GRozpisPolozkyMassUpsertReqDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek*/
		radek_pol?: number|null;
		/**Datum a čas poslední změny rozepisované položky*/
		dat_zmena?: JsonDate|null;
		/**Příznak způsobu vytvoření položky (-1 - Soubor, 0 - Předpisy, 1 - Dávky A-V, 2 - SIPO, 3 - Avíza, 4 - Vratky B, 5 - Napojení poplatnící DDP, 6 - Dopočítat/kopírovat)*/
		rezim_vytvoreni?: number|null;
		/**Číslo dávky při režimu vytvoření větším jak 0*/
		davka?: number|null;
		/**Seznam položek rozpisu položky pro vytvoření/aktualizaci*/
		polozky?: Gordic.Buc.Interface.GRozpisPolozkyUpsertReqDto[]|null;
	}
	const enum GRozpisPolozkyMassUpsertReqDtoNames { ixp = "ixp", radek_pol = "radek_pol", dat_zmena = "dat_zmena", rezim_vytvoreni = "rezim_vytvoreni", davka = "davka", polozky = "polozky",}
	const enum GRozpisPolozkyMassUpsertReqDtoFragments { ixp = "*", radek_pol = "*", dat_zmena = "*", rezim_vytvoreni = "*", davka = "*", polozky = "*",}
	const enum GRozpisPolozkyMassUpsertReqDtoTypes { ixp = "string", radek_pol = "number", dat_zmena = "JsonDate", rezim_vytvoreni = "number", davka = "number", polozky = "Gordic.Buc.Interface.GRozpisPolozkyUpsertReqDto[]",}
	const enum GRozpisPolozkyMassUpsertReqDtoTypeLengths { ixp = 12,}
	/**Dto request pro vytvoření/aktualizování položek rozpisu*/
	interface GRozpisPolozkyUpsertReqDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Měna*/
		mena?: number|null;
		/**Částka v měně
		*      Částka v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Datum odpárování
		*      Datum odpárování položky-transakce
		*/
		dat_odp?: JsonDate|null;
		/**Konstatní symbol - pro režim vytvoření 1 (napojení poplatníci ddp)
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**VS - protistrany
		*      VS - protistrany
		*/
		vs2?: string|null;
		/**SS - protistrany
		*      SS - protistrany
		*/
		ss2?: string|null;
		/**Způsob úhrady*/
		zu?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Typ_doh*/
		typ_doh?: number|null;
		/**Důvod vrácení - nutné pouze u Vratky B*/
		duv_vra?: string|null;
		/**Ixp pro předpis (PK - bucdpep)*/
		ixp_predpis?: string|null;
		/**dat_vyp_vra pro předpis*/
		dat_vyp_vra_predpis?: JsonDate|null;
		/**radek_uhr pro předpis (PK - bucdpep)*/
		radek_uhr_predpis?: number|null;
		/**davka pro předpis (PK - bucdpam)*/
		davka_predpis?: number|null;
		/**sk_vl pro předpis (PK - bucdpam)*/
		sk_vl_predpis?: string|null;
		/**bu_vl pro předpis (PK - bucdpam)*/
		bu_vl_predpis?: string|null;
		/**radek pro předpis (PK - bucdpam)*/
		radek_predpis?: string|null;
		/**Řádek dávky (PK - pro dávky)*/
		radek_davka?: number|null;
		/**Řádek dávky (PK - pro dávku SIPO)*/
		radek_davka_sipo?: string|null;
		/**Příznak, zda má být položka stornována/odstornována (TRUE na stornované položce provede odstorno)*/
		storno?: boolean|null;
		/**Příznak způsobu vytvoření položky (-1 - Soubor, 0 - Předpisy, 1 - Dávky A-V, 2 - SIPO, 3 - Avíza, 4 - Vratky B, 5 - Napojení poplatníci DDP, 6 - Dopočítat/Kopírovat)*/
		rezim_vytvoreni?: number|null;
	}
	const enum GRozpisPolozkyUpsertReqDtoNames { ixp = "ixp", radek_pol = "radek_pol", radek_av = "radek_av", vs = "vs", c = "c", mena = "mena", c_mena = "c_mena", dat_zap = "dat_zap", dat_odp = "dat_odp", ks = "ks", ss = "ss", nazev = "nazev", vs2 = "vs2", ss2 = "ss2", zu = "zu", dat_zmena = "dat_zmena", typ_doh = "typ_doh", duv_vra = "duv_vra", ixp_predpis = "ixp_predpis", dat_vyp_vra_predpis = "dat_vyp_vra_predpis", radek_uhr_predpis = "radek_uhr_predpis", davka_predpis = "davka_predpis", sk_vl_predpis = "sk_vl_predpis", bu_vl_predpis = "bu_vl_predpis", radek_predpis = "radek_predpis", radek_davka = "radek_davka", radek_davka_sipo = "radek_davka_sipo", storno = "storno", rezim_vytvoreni = "rezim_vytvoreni",}
	const enum GRozpisPolozkyUpsertReqDtoFragments { ixp = "*", radek_pol = "*", radek_av = "*", vs = "*", c = "*", mena = "*", c_mena = "*", dat_zap = "*", dat_odp = "*", ks = "*", ss = "*", nazev = "*", vs2 = "*", ss2 = "*", zu = "*", dat_zmena = "*", typ_doh = "*", duv_vra = "*", ixp_predpis = "*", dat_vyp_vra_predpis = "*", radek_uhr_predpis = "*", davka_predpis = "*", sk_vl_predpis = "*", bu_vl_predpis = "*", radek_predpis = "*", radek_davka = "*", radek_davka_sipo = "*", storno = "*", rezim_vytvoreni = "*",}
	const enum GRozpisPolozkyUpsertReqDtoTypes { ixp = "string", radek_pol = "number", radek_av = "number", vs = "string", c = "JsonDecimal", mena = "number", c_mena = "JsonDecimal", dat_zap = "JsonDate", dat_odp = "JsonDate", ks = "string", ss = "string", nazev = "string", vs2 = "string", ss2 = "string", zu = "number", dat_zmena = "JsonDate", typ_doh = "number", duv_vra = "string", ixp_predpis = "string", dat_vyp_vra_predpis = "JsonDate", radek_uhr_predpis = "number", davka_predpis = "number", sk_vl_predpis = "string", bu_vl_predpis = "string", radek_predpis = "string", radek_davka = "number", radek_davka_sipo = "string", storno = "boolean", rezim_vytvoreni = "number",}
	const enum GRozpisPolozkyUpsertReqDtoTypeLengths { ixp = 12, vs = 12, ks = 12, ss = 12, nazev = 160, vs2 = 12, ss2 = 12,}
	/**Dto primárních klíčů rozpisu položky bankovního výpisu*/
	interface GRozpisPolozkyPKDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
	}
	const enum GRozpisPolozkyPKDtoNames { ixp = "ixp", radek_pol = "radek_pol", radek_av = "radek_av",}
	const enum GRozpisPolozkyPKDtoFragments { ixp = "*", radek_pol = "*", radek_av = "*",}
	const enum GRozpisPolozkyPKDtoTypes { ixp = "string", radek_pol = "number", radek_av = "number",}
	const enum GRozpisPolozkyPKDtoTypeLengths { ixp = 12,}
	/**Dto pro hromadné operace nad položkami rozpisu položky bankovního výpisu*/
	interface GRozpisPolozkyHromOperaceDto {
		/**Identifikátor položky*/
		ixp?: string|null;
		/**Řádek položky*/
		radek_pol?: number|null;
		/**Datum změny rozepisované položky*/
		dat_zmena?: JsonDate|null;
		/**Seznam rozpisu položek*/
		keys?: Gordic.Buc.Interface.GRozpisPolozkyPKDto[]|null;
	}
	const enum GRozpisPolozkyHromOperaceDtoNames { ixp = "ixp", radek_pol = "radek_pol", dat_zmena = "dat_zmena", keys = "keys",}
	const enum GRozpisPolozkyHromOperaceDtoFragments { ixp = "*", radek_pol = "*", dat_zmena = "*", keys = "*",}
	const enum GRozpisPolozkyHromOperaceDtoTypes { ixp = "string", radek_pol = "number", dat_zmena = "JsonDate", keys = "Gordic.Buc.Interface.GRozpisPolozkyPKDto[]",}
	const enum GRozpisPolozkyHromOperaceDtoTypeLengths { ixp = 12,}
	interface GRozpisPolozkyUpsertDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek položky bankovního výpisu
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu
		*/
		radek_av?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Identifikátor napárovaného dokladu
		*      Identifikátor předpisu platby, na který je řádek výpisu napárován
		*/
		ixp_par?: string|null;
		/**Číslo řádku napárovaného dokladu
		*      Číslo řádku předpisu napárovaného dokladu
		*/
		cislo_par?: number|null;
		/**Stav položky
		*      Stav položky ban.výpisu
		*/
		s_pol?: number|null;
		/**Veřejný popis
		*      Název protiúčtu, popis položky výpisu
		*/
		nazev?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Datum zaplacení
		*      Datum skutečného zaplacení položky výpisu - transakce
		*/
		dat_zap?: JsonDate|null;
		/**Datum párování
		*      Datum párování položky výpisu - transakce
		*/
		dat_par?: JsonDate|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Částka
		*      Částka položky-transakce
		*/
		c?: JsonDecimal|null;
		/**Částka párovaná
		*      Částka párované platby-transakce
		*/
		c_par?: JsonDecimal|null;
		/**Kód banky
		*      Kód banky-kód účtování
		*/
		kod_ban?: number|null;
		/**Kód dat
		*      Druh dat
		*/
		kod_dat?: number|null;
		/**Kód změny
		*      Kód změny položky
		*/
		kod_zme?: number|null;
		/**Datum valuta
		*      Datum, je-li uvedeno, ke kterému se započítává položka z hlediska výpočtu úroků
		*/
		dat_val?: JsonDate|null;
		/**Způsob úhrady
		*      Způsob úhrady položky-transakce
		*/
		zu?: number|null;
		/**Datum UUP
		*      Datum uskutečnění účetního případu
		*/
		dat_uhr?: JsonDate|null;
		/**Identifikátor POK
		*      Identifikátor POK dokladu / transakce platební brány
		*/
		ixp_pok?: string|null;
		/**VS - protistrany*/
		vs2?: string|null;
		/**SS - protistrany*/
		ss2?: string|null;
		/**Datum odpárování
		*      Datum odpárování položky-transakce
		*/
		dat_odp?: JsonDate|null;
		/**Datum odepsání z protiúčtu
		*      Datum odepsání v jiném peněžním ústavu
		*/
		dat_ode?: JsonDate|null;
		/**Měna*/
		mena?: number|null;
		/**Částka v měně
		*      Částka v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Částka párovaná v měně
		*      Částka párované platby v měně
		*/
		c_par_mena?: JsonDecimal|null;
		/**Datum položky
		*      Datum položky výpisu-transakce
		*/
		dat_pol?: JsonDate|null;
		/**Doplňkový popis
		*      Pokud popis položky přesáhne délku pole Veřejný popis, je zbytek pole zapsán do Doplňkový popis
		*/
		popis1?: string|null;
		/**Identifikátor BPL agendy
		*      Označení dokladu BPL pro úrok z prodlení k pohledávce
		*/
		ixp_bpl?: string|null;
		/**Důvod vrácení - nutné pouze u Vratky B*/
		duv_vra?: string|null;
		davka?: number|null;
		radek?: number|null;
		/**účtování hot.plateb ve FUC*/
		uhp?: number|null;
	}
	const enum GRozpisPolozkyUpsertDtoNames { ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", lic = "lic", ixp_par = "ixp_par", cislo_par = "cislo_par", s_pol = "s_pol", nazev = "nazev", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", dat_zap = "dat_zap", dat_par = "dat_par", vs = "vs", ks = "ks", ss = "ss", c = "c", c_par = "c_par", kod_ban = "kod_ban", kod_dat = "kod_dat", kod_zme = "kod_zme", dat_val = "dat_val", zu = "zu", dat_uhr = "dat_uhr", ixp_pok = "ixp_pok", vs2 = "vs2", ss2 = "ss2", dat_odp = "dat_odp", dat_ode = "dat_ode", mena = "mena", c_mena = "c_mena", c_par_mena = "c_par_mena", dat_pol = "dat_pol", popis1 = "popis1", ixp_bpl = "ixp_bpl", duv_vra = "duv_vra", davka = "davka", radek = "radek", uhp = "uhp",}
	const enum GRozpisPolozkyUpsertDtoFragments { ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", lic = "Base", ixp_par = "*", cislo_par = "*", s_pol = "*", nazev = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", dat_zap = "*", dat_par = "*", vs = "Base", ks = "Base", ss = "Base", c = "*", c_par = "*", kod_ban = "*", kod_dat = "*", kod_zme = "*", dat_val = "*", zu = "*", dat_uhr = "*", ixp_pok = "*", vs2 = "Base", ss2 = "Base", dat_odp = "*", dat_ode = "*", mena = "*", c_mena = "*", c_par_mena = "*", dat_pol = "*", popis1 = "*", ixp_bpl = "*", duv_vra = "*", davka = "*", radek = "*", uhp = "*",}
	const enum GRozpisPolozkyUpsertDtoTypes { ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", lic = "string", ixp_par = "string", cislo_par = "number", s_pol = "number", nazev = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", dat_zap = "JsonDate", dat_par = "JsonDate", vs = "string", ks = "string", ss = "string", c = "JsonDecimal", c_par = "JsonDecimal", kod_ban = "number", kod_dat = "number", kod_zme = "number", dat_val = "JsonDate", zu = "number", dat_uhr = "JsonDate", ixp_pok = "string", vs2 = "string", ss2 = "string", dat_odp = "JsonDate", dat_ode = "JsonDate", mena = "number", c_mena = "JsonDecimal", c_par_mena = "JsonDecimal", dat_pol = "JsonDate", popis1 = "string", ixp_bpl = "string", duv_vra = "string", davka = "number", radek = "number", uhp = "number",}
	const enum GRozpisPolozkyUpsertDtoTypeLengths { ixp = 12, lic = 4, ixp_par = 12, nazev = 160, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, vs = 12, ks = 12, ss = 12, ixp_pok = 12, vs2 = 12, ss2 = 12, popis1 = 254, ixp_bpl = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Rozpis\GVyberUhradyDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto pro výběr úhrady při párování*/
	interface GVyberUhradyDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
		/**Licence databáze*/
		lic?: string|null;
		/**Aktivita
		*      Ekonomická aktivita
		*/
		eko_akt?: number|null;
		/**Identifikátor externího subjektu
		*      Subjekt, kterému půjde platba nebo se od něj očekává platba
		*/
		ixs_esu?: string|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Směrový kód bankovního účtu cizího
		*      Směrový kód bankovního účtu cizího - rozlišení banky u které je veden bankovní účet externího subjektu
		*/
		sk_ci?: string|null;
		/**Bankovní účet cizí
		*      Bankovní účet cizí - číslo účtu externího subjektu
		*/
		bu_ci?: string|null;
		/**Způsob platby
		*      Způsob platby, používá se k rozlišení jak bude uhrazena platba
		*/
		zp?: number|null;
		/**Agendové číslo
		*      Agendové číslo dokladu platby
		*/
		ac?: string|null;
		/**Částka
		*      Částka předpisu platby v CZK
		*/
		c?: JsonDecimal|null;
		/**Částka spárované platby
		*      Částka spárované platby v CZK
		*/
		c_par?: JsonDecimal|null;
		/**Splatnost
		*      Datum splatnosti
		*/
		dat_spl?: JsonDate|null;
		/**Agenda
		*      Typ agendy
		*/
		typ_ag?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Měna
		*      Kód měny platby
		*/
		mena?: number|null;
		/**Částka v měně
		*      Částka platby v měně
		*/
		c_mena?: JsonDecimal|null;
		/**Částka párovaná v měně
		*      Částka zpárované platby v měně
		*/
		c_par_mena?: JsonDecimal|null;
		/**Příznak nepárovat
		*      Předpis se nebude automaticky nepárovat
		*/
		priz_nepar?: number|null;
		/**Popis
		*      Popis platby - zpráva pro příjemce, AV pole
		*/
		popis?: string|null;
		/**Priorita
		*      Priorita platby
		*/
		pri_uhr?: number|null;
		/**Účtárna
		*      UUS - účtárna účetního střediska - UUS zpracující organizace
		*/
		uus?: string|null;
		/**Textový název externího subjektu (ginsesu.esu_txt)*/
		nazev?: string|null;
		/**Zkratka měny*/
		mena_txt?: string|null;
		/**Textová reprezentace kategorie předpisu*/
		ktg_upo_txt?: string|null;
		/**Variabilní symbol - bucvpsy*/
		vs_n?: string|null;
		/**Ixp výpisu*/
		ixp_pol?: string|null;
		/**Číslo výpisu*/
		cis_pid?: number|null;
		/**Datum nového zůstatku*/
		dat_nov_zus?: JsonDate|null;
		/**Řádek položky bankovního výpisu*/
		radek_pol?: number|null;
		/**Subřádek položky bankovního výpisu*/
		subradek?: number|null;
		/**Řádek AV - řádek rozpisu položky bankovního výpisu*/
		radek_av?: number|null;
		por_cis_vds?: number|null;
		spe_adr?: string|null;
		pod_cis?: string|null;
		davka?: number|null;
		/**Bankovní účet vlastní - spojené*/
		ucet_vl?: string|null;
		/**Bankovní účet cizí - spojené*/
		ucet_ci?: string|null;
		/**Textová zkratka typu agendy*/
		typ_ag_zkr?: string|null;
		/**c_zby*/
		c_zby?: JsonDecimal|null;
	}
	const enum GVyberUhradyDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", lic = "lic", eko_akt = "eko_akt", ixs_esu = "ixs_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", zp = "zp", ac = "ac", c = "c", c_par = "c_par", dat_spl = "dat_spl", typ_ag = "typ_ag", dat_zmena = "dat_zmena", mena = "mena", c_mena = "c_mena", c_par_mena = "c_par_mena", priz_nepar = "priz_nepar", popis = "popis", pri_uhr = "pri_uhr", uus = "uus", nazev = "nazev", mena_txt = "mena_txt", ktg_upo_txt = "ktg_upo_txt", vs_n = "vs_n", ixp_pol = "ixp_pol", cis_pid = "cis_pid", dat_nov_zus = "dat_nov_zus", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", por_cis_vds = "por_cis_vds", spe_adr = "spe_adr", pod_cis = "pod_cis", davka = "davka", ucet_vl = "ucet_vl", ucet_ci = "ucet_ci", typ_ag_zkr = "typ_ag_zkr", c_zby = "c_zby",}
	const enum GVyberUhradyDtoFragments { ixp = "*", radek_uhr = "*", lic = "*", eko_akt = "*", ixs_esu = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", zp = "*", ac = "*", c = "*", c_par = "*", dat_spl = "*", typ_ag = "*", dat_zmena = "*", mena = "*", c_mena = "*", c_par_mena = "*", priz_nepar = "*", popis = "*", pri_uhr = "*", uus = "*", nazev = "*", mena_txt = "*", ktg_upo_txt = "*", vs_n = "*", ixp_pol = "*", cis_pid = "*", dat_nov_zus = "*", radek_pol = "*", subradek = "*", radek_av = "*", por_cis_vds = "*", spe_adr = "*", pod_cis = "*", davka = "*", ucet_vl = "*", ucet_ci = "*", typ_ag_zkr = "*", c_zby = "*",}
	const enum GVyberUhradyDtoTypes { ixp = "string", radek_uhr = "number", lic = "string", eko_akt = "number", ixs_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", zp = "number", ac = "string", c = "JsonDecimal", c_par = "JsonDecimal", dat_spl = "JsonDate", typ_ag = "number", dat_zmena = "JsonDate", mena = "number", c_mena = "JsonDecimal", c_par_mena = "JsonDecimal", priz_nepar = "number", popis = "string", pri_uhr = "number", uus = "string", nazev = "string", mena_txt = "string", ktg_upo_txt = "string", vs_n = "string", ixp_pol = "string", cis_pid = "number", dat_nov_zus = "JsonDate", radek_pol = "number", subradek = "number", radek_av = "number", por_cis_vds = "number", spe_adr = "string", pod_cis = "string", davka = "number", ucet_vl = "string", ucet_ci = "string", typ_ag_zkr = "string", c_zby = "JsonDecimal",}
	const enum GVyberUhradyDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ac = 20, popis = 254, uus = 10, ixp_pol = 12, spe_adr = 15, pod_cis = 5,}
	/**Dto pro read výběru úhrady*/
	interface GVyberUhradyReadReqDto {
		/**Identifikátor
		*      identifikátor předpisu-nejčastěji se shoduje s ID dokladem agendy
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek předpisu, pořadové číslo
		*/
		radek_uhr?: number|null;
		davka?: number|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Řádek XML*/
		radek?: number|null;
		/**Typ dohledání*/
		typ_doh?: number|null;
		/**Filtry pro výběr úhrad*/
		filters?: any|null;
	}
	const enum GVyberUhradyReadReqDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", davka = "davka", sk_vl = "sk_vl", bu_vl = "bu_vl", radek = "radek", typ_doh = "typ_doh", filters = "filters",}
	const enum GVyberUhradyReadReqDtoFragments { ixp = "*", radek_uhr = "*", davka = "*", sk_vl = "*", bu_vl = "*", radek = "*", typ_doh = "*", filters = "*",}
	const enum GVyberUhradyReadReqDtoTypes { ixp = "string", radek_uhr = "number", davka = "number", sk_vl = "string", bu_vl = "string", radek = "number", typ_doh = "number", filters = "any",}
	const enum GVyberUhradyReadReqDtoTypeLengths { ixp = 12, sk_vl = 11, bu_vl = 34,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Rozpis\IGNapojeniPoplatniciDDP.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Výběr předpisů napojených poplatníků DDP
	* @domain Banka
	*/
	interface BucNapojeniPoplatniciDDP {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GNapojeniPoplatniciDDPDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucNapojeniPoplatniciDDP: ServiceBase & Catalog.BucNapojeniPoplatniciDDP;
	}
	const BucNapojeniPoplatniciDDP: Client["BucNapojeniPoplatniciDDP"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu výběru předpisů napojených poplatníků DDP*/
	const enum GNapojeniPoplatniciDDPFilter {
		/**Identifikátor plátce*/
		ixp_pl,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Rozpis\IGRozpisPolozky.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Rozpis položky bankovního výpisu - bucdpol
	* @domain Banka
	*/
	interface BucRozpisPolozky {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GRozpisPolozkyPKDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GRozpisPolozkyPKDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GRozpisPolozkyPKDto>,GServiceReadResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**Hromadné vytvoření/aktualizace položek bankovního výpisu*/
		massUpsert(rq?:Gordic.Buc.Interface.GRozpisPolozkyMassUpsertReqDto|CallParams<GServiceGroupRequest<Gordic.Buc.Interface.GRozpisPolozkyMassUpsertReqDto>>): _Task<GServiceGroupRequest<Gordic.Buc.Interface.GRozpisPolozkyMassUpsertReqDto>,void>;
		/**Kontrola položek rozpisu před storno/odstorno*/
		zkontrolujPredStorno(rq?:Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**Hromadné storno/odstorno položek rozpisu*/
		hromadneStornovat(rq?:Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**Kontrola položek rozpisu před odstraněním*/
		zkontrolujPredOdstranit(rq?:Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**Hromadné odstranění položek rozpisu*/
		hromadneOdstranit(rq?:Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**Kontrola položek před zaúčtováním*/
		zkontrolujPredZauctovanim(rq?:Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**Hromadné zaúčtování položek*/
		hromadneZauctovat(rq?:Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GRozpisPolozkyHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**List dávek A-V*/
		listDavkyAV(rq?:CallParams<{davka:number,ixp:string,radek_pol:number}>): _Task<{davka:number,ixp:string,radek_pol:number},GServiceListResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**List dávek SIPO*/
		listDavkySIPO(rq?:CallParams<{davka:number,ixp:string,radek_pol:number}>): _Task<{davka:number,ixp:string,radek_pol:number},GServiceListResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**List dávek avíz platebních karet*/
		listDavkyAvizo(rq?:CallParams<{davka:number,ixp:string,radek_pol:number}>): _Task<{davka:number,ixp:string,radek_pol:number},GServiceListResponse<Gordic.Buc.Interface.GRozpisPolozkyDto>>;
		/**Načtení vybraného souboru, parsování a vrácení položek rozpisu pro uložení*/
		importSouboru(rq?:CallParams<{guid:string}>): _Task<{guid:string},Gordic.Buc.Interface.GRozpisPolozkyDto[]>;
		/**Vrátí oprávnění položek rozpisu položky bankovního výpisu (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GRozpisPolozkyServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucRozpisPolozky: ServiceBase & Catalog.BucRozpisPolozky;
	}
	const BucRozpisPolozky: Client["BucRozpisPolozky"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu položek rozpisu položky bankovního výpisu*/
	const enum GRozpisPolozkyFilter {
		/**PID výpisu*/
		ixp,
		/**řádek položky výpisu*/
		radek_pol,
		/**subřádek položky výpisu*/
		subradek,
		/**řádek rozpisu položky výpisu*/
		radek_av,
		/**Var.symbol*/
		vs,
		/**Spec.symbol*/
		ss,
		/**Konst.symbol*/
		ks,
		/**Částka*/
		c,
		/**Dat.zaplacení*/
		dat_zap,
		/**Popis*/
		popis,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Rozpis\IGVyberUhrady.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Výběr úhrady při párování
	* @domain Banka
	*/
	interface BucVyberUhrady {
		/**Read*/
		read(rq?:Gordic.Buc.Interface.GVyberUhradyReadReqDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GVyberUhradyReadReqDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GVyberUhradyReadReqDto>,GServiceReadResponse<Gordic.Buc.Interface.GVyberUhradyDto>>;
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GVyberUhradyDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucVyberUhrady: ServiceBase & Catalog.BucVyberUhrady;
	}
	const BucVyberUhrady: Client["BucVyberUhrady"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu výběru úhrady*/
	const enum GVyberUhradyFilter {
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl,
		/**Bankovní účet vlastní*/
		bu_vl,
		/**Směrový kód bankovního účtu cizího*/
		sk_ci,
		/**Bankovní účet cizí*/
		bu_ci,
		/**Var.symbol*/
		vs,
		/**Spec.symbol*/
		ss,
		/**Konst.symbol*/
		ks,
		/**Částka*/
		c,
		/**Částka v měně*/
		c_mena,
		/**Číslo výpisu*/
		cis_pid,
		/**Dat.zaplacení*/
		dat_zap,
		/**Dat.splacení*/
		dat_spl,
		/**Měna*/
		mena,
		/**Typ agendy*/
		typ_ag,
		/**Název*/
		nazev,
		/**typ_doh - parametr*/
		typ_doh_p,
		/**Směrový kód bankovního účtu vlastního - parametr*/
		sk_vl_p,
		/**Bankovní účet vlastní - parametr*/
		bu_vl_p,
		/**Směrový kód bankovního účtu cizího - parametr*/
		sk_ci_p,
		/**Bankovní účet cizí - parametr*/
		bu_ci_p,
		/**Var.symbol - parametr*/
		vs_p,
		/**Spec.symbol - parametr*/
		ss_p,
		/**Částka - parametr*/
		c_p,
		/**ixp - parametr*/
		ixp_p,
		/**ixp_rs - parametr*/
		ixp_rs_p,
		/**dat_vyp_vra - parametr*/
		dat_vyp_vra_p,
		/**lice - parametr*/
		lic_p,
		/**c_mena - parametr*/
		c_mena_p,
		/**radek_in - nutno předat jako seznam čísel - parametr*/
		radek_in_p,
		/**ixp*/
		ixp,
		/**radek_uhr*/
		radek_uhr,
		/**davka*/
		davka,
		/**radek*/
		radek,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaAV\GDavkaAVDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucssav
	*      A-V složenky - sumační věty
	*/
	interface GDavkaAVDto {
		/**Dávka
		*      Číslo dávky
		*/
		davka?: number|null;
		/**Směrový kód bankovního účtu vlastního*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Označení dávky
		*      Název souboru načítané dávky
		*/
		ozn_dav?: string|null;
		/**Datum převodu
		*      Datum převodu částky za dávku
		*/
		dat_pre?: JsonDate|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Počet plateb
		*      Počet plateb v dávce
		*/
		poc_pla?: number|null;
		/**Částka
		*      Úhrnná částka převodu
		*/
		c?: JsonDecimal|null;
		/**Částka za převod
		*      Úhrn cen za převod
		*/
		c_saz?: JsonDecimal|null;
		/**Způsob inkasa
		*      Způsob inkasování ceny
		*/
		zi_saz?: number|null;
		/**Stav
		*      Stav dávky
		*/
		s_dav?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Bankovní účet vlastní - spojené*/
		ucet_vl?: string|null;
	}
	const enum GDavkaAVDtoNames { davka = "davka", sk_vl = "sk_vl", bu_vl = "bu_vl", ozn_dav = "ozn_dav", dat_pre = "dat_pre", ks = "ks", vs = "vs", poc_pla = "poc_pla", c = "c", c_saz = "c_saz", zi_saz = "zi_saz", s_dav = "s_dav", dat_zmena = "dat_zmena", ucet_vl = "ucet_vl",}
	const enum GDavkaAVDtoFragments { davka = "*", sk_vl = "*", bu_vl = "*", ozn_dav = "*", dat_pre = "*", ks = "*", vs = "*", poc_pla = "*", c = "*", c_saz = "*", zi_saz = "*", s_dav = "*", dat_zmena = "*", ucet_vl = "*",}
	const enum GDavkaAVDtoTypes { davka = "number", sk_vl = "string", bu_vl = "string", ozn_dav = "string", dat_pre = "JsonDate", ks = "string", vs = "string", poc_pla = "number", c = "JsonDecimal", c_saz = "JsonDecimal", zi_saz = "number", s_dav = "number", dat_zmena = "JsonDate", ucet_vl = "string",}
	const enum GDavkaAVDtoTypeLengths { sk_vl = 11, bu_vl = 34, ozn_dav = 254, ks = 12, vs = 12,}
	/**Service Permissions pro práci se složenkami A-V*/
	interface GDavkaAVServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno načíst dávku*/
		LzeNacist: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaAVServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeNacist = "LzeNacist",}
	const enum GDavkaAVServicePermissionsFragments { LzeZobrazit = "*", LzeNacist = "*",}
	const enum GDavkaAVServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeNacist = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaAVServicePermissionsTypeLengths {}
	/**Request DTO pro načtení dávky složenky A-V ze souboru*/
	interface GDavkaAVNactiReqDto {
		/**Guid identifikátor souboru se dávkou*/
		guid?: string|null;
		/**Informace pro server, že uživatel byl informavám s dotazem na již existující dávku a zda ji chce nahrát znovu*/
		serverMessageDavkaExists?: boolean|null;
	}
	const enum GDavkaAVNactiReqDtoNames { guid = "guid", serverMessageDavkaExists = "serverMessageDavkaExists",}
	const enum GDavkaAVNactiReqDtoFragments { guid = "*", serverMessageDavkaExists = "*",}
	const enum GDavkaAVNactiReqDtoTypes { guid = "string", serverMessageDavkaExists = "boolean",}
	const enum GDavkaAVNactiReqDtoTypeLengths {}
	/**Response DTO pro načtení dávky složenky A-V ze souboru*/
	interface GDavkaAVNactiResDto {
		/**Počet položek*/
		poc_pol?: number|null;
		/**Suma položek*/
		c_sum?: JsonDecimal|null;
	}
	const enum GDavkaAVNactiResDtoNames { poc_pol = "poc_pol", c_sum = "c_sum",}
	const enum GDavkaAVNactiResDtoFragments { poc_pol = "*", c_sum = "*",}
	const enum GDavkaAVNactiResDtoTypes { poc_pol = "number", c_sum = "JsonDecimal",}
	const enum GDavkaAVNactiResDtoTypeLengths {}
	/**A-V složenky - sumační věty - DTO pro existenci dávky načtené ze souboru*/
	interface GDavkaAVNactiExistsDto {
		/**c_sum*/
		c?: JsonDecimal|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**Název autoru poslední změny záznamu dle ginszmp*/
		nazev_ref?: string|null;
	}
	const enum GDavkaAVNactiExistsDtoNames { c = "c", dat_zmena = "dat_zmena", nazev_ref = "nazev_ref",}
	const enum GDavkaAVNactiExistsDtoFragments { c = "*", dat_zmena = "*", nazev_ref = "*",}
	const enum GDavkaAVNactiExistsDtoTypes { c = "JsonDecimal", dat_zmena = "JsonDate", nazev_ref = "string",}
	const enum GDavkaAVNactiExistsDtoTypeLengths { nazev_ref = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaAV\GDavkaAVObsahDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucdsav
	*      A-V složenky - platební věty - obsah dávky A-V
	*/
	interface GDavkaAVObsahDto {
		/**Dávka
		*      Číslo dávky
		*/
		davka?: number|null;
		/**Směrový kód bankovního účtu vlastního
		*      Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet
		*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní*/
		bu_vl?: string|null;
		/**Řádek
		*      Řádek platby
		*/
		radek?: number|null;
		/**Identifikátor
		*      Identifikátor ban.výpisu, na který je platba AV navázána
		*/
		ixp?: string|null;
		/**Řádek
		*      Řádek položky bankovního výpisu na který je platba AV navázána
		*/
		radek_pol?: number|null;
		/**Subřádek
		*      Subřádek pol.ban.výpisu na který je platba AV navázána
		*/
		subradek?: number|null;
		/**Řádek AV
		*      Řádek AV - řádek rozpisu položky bankovního výpisu na který je platba AV navázána
		*/
		radek_av?: number|null;
		/**Podací pošta
		*      Okresní razítko podací pošty, kde byla Poštovní poukázka AV podána
		*/
		pod_pos?: string|null;
		/**Datum podání
		*      Datum podání Poštovní poukázky AV na podací poště
		*/
		dat_pod?: JsonDate|null;
		/**Podací číslo
		*      Číslo, pod kterým je Poštovní poukázka AV podána na podací poště
		*/
		pod_cis?: string|null;
		/**Variabilní symbol
		*      VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		vs?: string|null;
		/**Konstatní symbol
		*      KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ks?: string|null;
		/**Specifický symbol
		*      SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
		*/
		ss?: string|null;
		/**Stav
		*      Stav položky
		*/
		s_pol?: number|null;
		/**Částka
		*      Částka platby
		*/
		c?: JsonDecimal|null;
		/**Částka párovaná
		*      Částka párovaná
		*/
		c_par?: JsonDecimal|null;
		/**Označení odesílatele 1
		*      První řádek z adresy odesílatele
		*/
		ocr1?: string|null;
		/**Označení odesílatele 2
		*      Druhý řádek z adresy odesílatele
		*/
		ocr2?: string|null;
		/**Označení odesílatele 3
		*      Třetí řádek z adresy odesílatele
		*/
		ocr3?: string|null;
	}
	const enum GDavkaAVObsahDtoNames { davka = "davka", sk_vl = "sk_vl", bu_vl = "bu_vl", radek = "radek", ixp = "ixp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", pod_pos = "pod_pos", dat_pod = "dat_pod", pod_cis = "pod_cis", vs = "vs", ks = "ks", ss = "ss", s_pol = "s_pol", c = "c", c_par = "c_par", ocr1 = "ocr1", ocr2 = "ocr2", ocr3 = "ocr3",}
	const enum GDavkaAVObsahDtoFragments { davka = "*", sk_vl = "*", bu_vl = "*", radek = "*", ixp = "*", radek_pol = "*", subradek = "*", radek_av = "*", pod_pos = "*", dat_pod = "*", pod_cis = "*", vs = "*", ks = "*", ss = "*", s_pol = "*", c = "*", c_par = "*", ocr1 = "*", ocr2 = "*", ocr3 = "*",}
	const enum GDavkaAVObsahDtoTypes { davka = "number", sk_vl = "string", bu_vl = "string", radek = "number", ixp = "string", radek_pol = "number", subradek = "number", radek_av = "number", pod_pos = "string", dat_pod = "JsonDate", pod_cis = "string", vs = "string", ks = "string", ss = "string", s_pol = "number", c = "JsonDecimal", c_par = "JsonDecimal", ocr1 = "string", ocr2 = "string", ocr3 = "string",}
	const enum GDavkaAVObsahDtoTypeLengths { sk_vl = 11, bu_vl = 34, ixp = 12, pod_pos = 6, pod_cis = 5, vs = 12, ks = 12, ss = 12, ocr1 = 35, ocr2 = 35, ocr3 = 35,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaAV\IGDavkaAV.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - A-V složenky - sumační věty - bucssav
	* @domain Banka
	*/
	interface BucDavkaAV {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaAVDto>>;
		/**Načtení dávky složenky A-V ze souboru*/
		nacti(rq?:Gordic.Buc.Interface.GDavkaAVNactiReqDto|CallParams<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaAVNactiReqDto>>): _Task<GServiceSaveRequest<Gordic.Buc.Interface.GDavkaAVNactiReqDto>,GServiceSaveResponse<Gordic.Buc.Interface.GDavkaAVNactiResDto>>;
		/**Vrátí oprávnění složenek A-V*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GDavkaAVServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaAV: ServiceBase & Catalog.BucDavkaAV;
	}
	const BucDavkaAV: Client["BucDavkaAV"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu složenek A-V*/
	const enum GDavkaAVFilter {
		/**PK tabulky - dávka*/
		davka,
		/**PK tabulky - Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl,
		/**PK tabulky - Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl,
		/**VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		vs,
		/**Částka*/
		c,
		/**Použít převodní tabulku*/
		s_dav,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaAV\IGDavkaAVObsah.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - A-V složenky - platební věty - obsah dávky A-V
	* @domain Banka
	*/
	interface BucDavkaAVObsah {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaAVObsahDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaAVObsah: ServiceBase & Catalog.BucDavkaAVObsah;
	}
	const BucDavkaAVObsah: Client["BucDavkaAVObsah"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu obsahu složenek A-V*/
	const enum GDavkaAVObsahFilter {
		/**PK tabulky - dávka*/
		davka,
		/**PK tabulky - Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl,
		/**PK tabulky - Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl,
		/**Řádek v XML*/
		radek,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaB\IGDavkaB.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Dávky plateb B
	* @domain Banka
	*/
	interface BucDavkaB {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaBDto>>;
		/**Vrátí oprávnění složenek B*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GDavkaBServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaB: ServiceBase & Catalog.BucDavkaB;
	}
	const BucDavkaB: Client["BucDavkaB"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu složenek dávek B*/
	const enum GDavkaBFilter {
		/**PK tabulky - ixp_slo*/
		ixp_slo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaB\IGDavkaBGenerovani.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Generování dávek složenek B
	* @domain Banka
	*/
	interface BucDavkaBGenerovani {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaBGenerovaniDto>>;
		/**Vrátí oprávnění generování dávek složenek B*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GDavkaBGenerovaniServicePermissions>;
		/**Vygenerování dávek složenek B*/
		generovat(rq?:Gordic.Buc.Interface.GDavkaBGenerovaniGenerovatReqDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniGenerovatReqDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniGenerovatReqDto>,Gordic.General.ApplicationInterface.GFileInfoDto[]>;
		/**Uhradit vygenerovanou dávku složenek B*/
		uhradit(rq?:Gordic.Buc.Interface.GDavkaBGenerovaniGenerovatReqDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniGenerovatReqDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniGenerovatReqDto>,void>;
		/**Kontrola položek generování dávek složenek B před storno (případně odstorno)*/
		zkontrolujPredStorno(rq?:Gordic.Buc.Interface.GDavkaBGenerovaniHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaBGenerovaniDto>>;
		/**Hromadné storno (případně odstorno) položek generování dávek složenek B*/
		hromadneStornovat(rq?:Gordic.Buc.Interface.GDavkaBGenerovaniHromOperaceDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniHromOperaceDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GDavkaBGenerovaniHromOperaceDto>,GServiceGroupResponse<Gordic.Buc.Interface.GDavkaBGenerovaniDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaBGenerovani: ServiceBase & Catalog.BucDavkaBGenerovani;
	}
	const BucDavkaBGenerovani: Client["BucDavkaBGenerovani"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu pro generování dávky složenek B*/
	const enum GDavkaBGenerovaniFilter {
		/**Identifikátor databázového připojení*/
		log_por_cislo,
		/**radek_uhr*/
		radek_uhr,
		/**Identifikátor*/
		ixp,
		/**ikc*/
		ikc,
		/**Datum splatnosti*/
		dat_spl,
		/**Agenda*/
		typ_ag,
		/**sk_vl*/
		sk_vl,
		/**bu_vl*/
		bu_vl,
		/**ucet_vl_rok*/
		ucet_vl_rok,
		/**banka_ico*/
		banka_ico,
		/**banka_ucs*/
		banka_ucs,
		/**banka_ixs_esu*/
		banka_ixs_esu,
		/**banka_sbu*/
		banka_sbu,
		/**uus*/
		uus,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaB\Dto\GDavkaBDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dávky plateb B - Soubor vyúčtování poukázek B + Jednotlivá vyúčtování dávky složenek B*/
	interface GDavkaBDto {
		ixp_slo?: string|null;
		s_vsb?: number|null;
		dat_vds?: JsonDate|null;
		vds?: string|null;
		vs_vds?: string|null;
		c_dok?: JsonDecimal|null;
		c_saz_dok?: JsonDecimal|null;
		poc_dok?: number|null;
		c_nev?: JsonDecimal|null;
		poc_nev?: number|null;
		dat_nac?: JsonDate|null;
		dat_nac_sez?: JsonDate|null;
		/**Textová zkratka vyúčtování složenek B*/
		s_vsb_zkr?: string|null;
		/**Textový stav vyúčtování složenek B*/
		s_vsb_txt?: string|null;
	}
	const enum GDavkaBDtoNames { ixp_slo = "ixp_slo", s_vsb = "s_vsb", dat_vds = "dat_vds", vds = "vds", vs_vds = "vs_vds", c_dok = "c_dok", c_saz_dok = "c_saz_dok", poc_dok = "poc_dok", c_nev = "c_nev", poc_nev = "poc_nev", dat_nac = "dat_nac", dat_nac_sez = "dat_nac_sez", s_vsb_zkr = "s_vsb_zkr", s_vsb_txt = "s_vsb_txt",}
	const enum GDavkaBDtoFragments { ixp_slo = "*", s_vsb = "*", dat_vds = "*", vds = "*", vs_vds = "*", c_dok = "*", c_saz_dok = "*", poc_dok = "*", c_nev = "*", poc_nev = "*", dat_nac = "*", dat_nac_sez = "*", s_vsb_zkr = "*", s_vsb_txt = "*",}
	const enum GDavkaBDtoTypes { ixp_slo = "string", s_vsb = "number", dat_vds = "JsonDate", vds = "string", vs_vds = "string", c_dok = "JsonDecimal", c_saz_dok = "JsonDecimal", poc_dok = "number", c_nev = "JsonDecimal", poc_nev = "number", dat_nac = "JsonDate", dat_nac_sez = "JsonDate", s_vsb_zkr = "string", s_vsb_txt = "string",}
	const enum GDavkaBDtoTypeLengths { ixp_slo = 12, vds = 2, vs_vds = 12,}
	/**Service Permissions pro práci se seznamem poukazů B*/
	interface GDavkaBServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno spustit generování*/
		LzeGenerovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaBServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeGenerovat = "LzeGenerovat",}
	const enum GDavkaBServicePermissionsFragments { LzeZobrazit = "*", LzeGenerovat = "*",}
	const enum GDavkaBServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaBServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaB\Dto\GDavkaBGenerovaniDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**Dto pro generování dávky složenek B*/
	interface GDavkaBGenerovaniDto {
		/**Identifikátor databázového připojení*/
		log_por_cislo?: number|null;
		radek_uhr?: number|null;
		s_uhrp?: number|null;
		/**Cena*/
		c?: JsonDecimal|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		dat_spl?: JsonDate|null;
		/**Typ agendy dle ginctag*/
		typ_ag?: number|null;
		ac?: string|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**Způsob platby, používá se k rozlišení jak bude uhrazena očekávaná platba*/
		zp?: number|null;
		/**Název*/
		nazev?: string|null;
		/**Ulice*/
		ulice?: string|null;
		/**Číslo popisné*/
		cpop?: string|null;
		/**Číslo orientační*/
		cor?: string|null;
		/**Část obce*/
		cast_obce?: string|null;
		/**Obec*/
		obec?: string|null;
		/**PSČ*/
		psc?: string|null;
		/**Licence databáze*/
		lic?: string|null;
		lok_nazev?: string|null;
		spe_adr?: string|null;
		zpr_adr?: string|null;
		dat_vyp?: JsonDate|null;
		/**CS název*/
		cs_nazev?: string|null;
		/**Titul před*/
		tit_pred?: string|null;
		/**Titul za*/
		tit_za?: string|null;
		priz_pred_rcdn?: number|null;
		dat_nar?: JsonDate|null;
		pobox?: string|null;
		dsp?: string|null;
		c_saz?: JsonDecimal|null;
		vds?: string|null;
		por_cis_vds?: number|null;
		zpu_pla?: string|null;
		err_kod?: number|null;
		/**Popis*/
		popis?: string|null;
		cis_dav?: number|null;
		/**UUS - účtárna účetního střediska - UUS zpracující organizace*/
		uus?: string|null;
		ikc?: JsonDecimal|null;
		vyb_zaz?: number|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Typ externího subjektu*/
		typ_esu?: number|null;
		/**Vlastní bankovní účet složený*/
		ucet_vl?: string|null;
		/**Doplňková služba pošty textově*/
		dsp_txt?: string|null;
		/**Typ agendy zkratka*/
		typ_ag_zkr?: string|null;
	}
	const enum GDavkaBGenerovaniDtoNames { log_por_cislo = "log_por_cislo", radek_uhr = "radek_uhr", s_uhrp = "s_uhrp", c = "c", ixp = "ixp", dat_spl = "dat_spl", typ_ag = "typ_ag", ac = "ac", sk_vl = "sk_vl", bu_vl = "bu_vl", zp = "zp", nazev = "nazev", ulice = "ulice", cpop = "cpop", cor = "cor", cast_obce = "cast_obce", obec = "obec", psc = "psc", lic = "lic", lok_nazev = "lok_nazev", spe_adr = "spe_adr", zpr_adr = "zpr_adr", dat_vyp = "dat_vyp", cs_nazev = "cs_nazev", tit_pred = "tit_pred", tit_za = "tit_za", priz_pred_rcdn = "priz_pred_rcdn", dat_nar = "dat_nar", pobox = "pobox", dsp = "dsp", c_saz = "c_saz", vds = "vds", por_cis_vds = "por_cis_vds", zpu_pla = "zpu_pla", err_kod = "err_kod", popis = "popis", cis_dav = "cis_dav", uus = "uus", ikc = "ikc", vyb_zaz = "vyb_zaz", ixs_esu = "ixs_esu", typ_esu = "typ_esu", ucet_vl = "ucet_vl", dsp_txt = "dsp_txt", typ_ag_zkr = "typ_ag_zkr",}
	const enum GDavkaBGenerovaniDtoFragments { log_por_cislo = "*", radek_uhr = "*", s_uhrp = "*", c = "*", ixp = "*", dat_spl = "*", typ_ag = "*", ac = "*", sk_vl = "*", bu_vl = "*", zp = "*", nazev = "*", ulice = "*", cpop = "*", cor = "*", cast_obce = "*", obec = "*", psc = "*", lic = "*", lok_nazev = "*", spe_adr = "*", zpr_adr = "*", dat_vyp = "*", cs_nazev = "*", tit_pred = "*", tit_za = "*", priz_pred_rcdn = "*", dat_nar = "*", pobox = "*", dsp = "*", c_saz = "*", vds = "*", por_cis_vds = "*", zpu_pla = "*", err_kod = "*", popis = "*", cis_dav = "*", uus = "*", ikc = "*", vyb_zaz = "*", ixs_esu = "*", typ_esu = "*", ucet_vl = "*", dsp_txt = "*", typ_ag_zkr = "*",}
	const enum GDavkaBGenerovaniDtoTypes { log_por_cislo = "number", radek_uhr = "number", s_uhrp = "number", c = "JsonDecimal", ixp = "string", dat_spl = "JsonDate", typ_ag = "number", ac = "string", sk_vl = "string", bu_vl = "string", zp = "number", nazev = "string", ulice = "string", cpop = "string", cor = "string", cast_obce = "string", obec = "string", psc = "string", lic = "string", lok_nazev = "string", spe_adr = "string", zpr_adr = "string", dat_vyp = "JsonDate", cs_nazev = "string", tit_pred = "string", tit_za = "string", priz_pred_rcdn = "number", dat_nar = "JsonDate", pobox = "string", dsp = "string", c_saz = "JsonDecimal", vds = "string", por_cis_vds = "number", zpu_pla = "string", err_kod = "number", popis = "string", cis_dav = "number", uus = "string", ikc = "JsonDecimal", vyb_zaz = "number", ixs_esu = "string", typ_esu = "number", ucet_vl = "string", dsp_txt = "string", typ_ag_zkr = "string",}
	const enum GDavkaBGenerovaniDtoTypeLengths { ixp = 12, ac = 20, sk_vl = 11, bu_vl = 34, nazev = 100, ulice = 48, cpop = 8, cor = 6, cast_obce = 48, obec = 48, psc = 12, lic = 4, lok_nazev = 50, spe_adr = 15, zpr_adr = 60, cs_nazev = 100, tit_pred = 35, tit_za = 35, pobox = 8, dsp = 1, vds = 2, zpu_pla = 1, popis = 254, uus = 10,}
	/**Dto s primárními klíči záznamu pro generování dávky složenek B*/
	interface GDavkaBGenerovaniPKDto {
		/**Identifikátor databázového připojení*/
		log_por_cislo?: number|null;
		radek_uhr?: number|null;
		/**Identifikátor dokumentu*/
		ixp?: string|null;
		ikc?: JsonDecimal|null;
	}
	const enum GDavkaBGenerovaniPKDtoNames { log_por_cislo = "log_por_cislo", radek_uhr = "radek_uhr", ixp = "ixp", ikc = "ikc",}
	const enum GDavkaBGenerovaniPKDtoFragments { log_por_cislo = "*", radek_uhr = "*", ixp = "*", ikc = "*",}
	const enum GDavkaBGenerovaniPKDtoTypes { log_por_cislo = "number", radek_uhr = "number", ixp = "string", ikc = "JsonDecimal",}
	const enum GDavkaBGenerovaniPKDtoTypeLengths { ixp = 12,}
	/**Service Permissions pro práci s generováním dávky složenek B*/
	interface GDavkaBGenerovaniServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno stornovat úhrady - vrátit k opravě do agendy*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno generovat vstupní datový soubor složenek B pro poštu*/
		LzeGenerovat: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno tisknout opis složenek B*/
		LzeTisk: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaBGenerovaniServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeStornovat = "LzeStornovat", LzeGenerovat = "LzeGenerovat", LzeTisk = "LzeTisk",}
	const enum GDavkaBGenerovaniServicePermissionsFragments { LzeZobrazit = "*", LzeStornovat = "*", LzeGenerovat = "*", LzeTisk = "*",}
	const enum GDavkaBGenerovaniServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovat = "Gordic.General.ApplicationInterface.GPermission", LzeTisk = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaBGenerovaniServicePermissionsTypeLengths {}
	/**Dto pro hromadné operace nad položkami generování dávek složenek B*/
	interface GDavkaBGenerovaniHromOperaceDto {
		/**Seznam primárních klíčů položek*/
		keys?: Gordic.Buc.Interface.GDavkaBGenerovaniPKDto[]|null;
	}
	const enum GDavkaBGenerovaniHromOperaceDtoNames { keys = "keys",}
	const enum GDavkaBGenerovaniHromOperaceDtoFragments { keys = "*",}
	const enum GDavkaBGenerovaniHromOperaceDtoTypes { keys = "Gordic.Buc.Interface.GDavkaBGenerovaniPKDto[]",}
	const enum GDavkaBGenerovaniHromOperaceDtoTypeLengths {}
	/**Dto pro generování dávek složenek B*/
	interface GDavkaBGenerovaniGenerovatReqDto {
		/**IKC*/
		ikc?: Gordic.General.GIkc|null;
		/**Seznam primárních klíčů položek*/
		keys?: Gordic.Buc.Interface.GDavkaBGenerovaniPKDto[]|null;
		/**Datum splatnosti*/
		dat_spl?: JsonDate|null;
		/**Datum platnosti*/
		dat_pla?: JsonDate|null;
	}
	const enum GDavkaBGenerovaniGenerovatReqDtoNames { ikc = "ikc", keys = "keys", dat_spl = "dat_spl", dat_pla = "dat_pla",}
	const enum GDavkaBGenerovaniGenerovatReqDtoFragments { ikc = "*", keys = "*", dat_spl = "*", dat_pla = "*",}
	const enum GDavkaBGenerovaniGenerovatReqDtoTypes { ikc = "Gordic.General.GIkc", keys = "Gordic.Buc.Interface.GDavkaBGenerovaniPKDto[]", dat_spl = "JsonDate", dat_pla = "JsonDate",}
	const enum GDavkaBGenerovaniGenerovatReqDtoTypeLengths {}
	/**Dto s parametry pro tisk poukazů B pro generování*/
	interface GDavkaBGenerovaniTiskParamsDto {
		/**Ikc*/
		ikc?: Gordic.General.GIkc|null;
	}
	const enum GDavkaBGenerovaniTiskParamsDtoNames { ikc = "ikc",}
	const enum GDavkaBGenerovaniTiskParamsDtoFragments { ikc = "*",}
	const enum GDavkaBGenerovaniTiskParamsDtoTypes { ikc = "Gordic.General.GIkc",}
	const enum GDavkaBGenerovaniTiskParamsDtoTypeLengths {}
	/**Dto s parametry pro tisk poukazů B pro generování před úhradou*/
	interface GDavkaBGenerovaniSouboryTiskParamsDto {
		/**Ikc*/
		ikc?: Gordic.General.GIkc|null;
		/**UusGen*/
		UusGen?: string|null;
	}
	const enum GDavkaBGenerovaniSouboryTiskParamsDtoNames { ikc = "ikc", UusGen = "UusGen",}
	const enum GDavkaBGenerovaniSouboryTiskParamsDtoFragments { ikc = "*", UusGen = "*",}
	const enum GDavkaBGenerovaniSouboryTiskParamsDtoTypes { ikc = "Gordic.General.GIkc", UusGen = "string",}
	const enum GDavkaBGenerovaniSouboryTiskParamsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaSIPO\GDavkaSIPODto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucsdps
	*      Dávky plateb SIPO - sumační věty
	*/
	interface GDavkaSIPODto {
		/**Číslo dávky*/
		davka?: number|null;
		/**číslo organizace*/
		cis_org?: string|null;
		/**rok období*/
		rok_obd?: number|null;
		/**měsíc období*/
		mes_obd?: number|null;
		/**Kód poplatku SIPO*/
		kod_popl_sipo?: number|null;
		/**celková částka zaplacených plateb*/
		c?: JsonDecimal|null;
		/**celkový počet zaplacených plateb*/
		poc_pla?: number|null;
		/**označení dávky*/
		ozn_dav?: string|null;
		/**datum načtení dávky*/
		dat_nac?: JsonDate|null;
		/**Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl?: string|null;
		/**Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl?: string|null;
		/**stav zpracování dávky SIPO*/
		s_dav?: number|null;
		/**Datum a čas poslední změny tohoto záznamu*/
		dat_zmena?: JsonDate|null;
		/**celková částka dávky*/
		c_dav?: JsonDecimal|null;
		/**celkový počet plateb dávky*/
		poc_pla_dav?: number|null;
		/**Bankovní účet vlastní - spojené*/
		ucet_vl?: string|null;
	}
	const enum GDavkaSIPODtoNames { davka = "davka", cis_org = "cis_org", rok_obd = "rok_obd", mes_obd = "mes_obd", kod_popl_sipo = "kod_popl_sipo", c = "c", poc_pla = "poc_pla", ozn_dav = "ozn_dav", dat_nac = "dat_nac", sk_vl = "sk_vl", bu_vl = "bu_vl", s_dav = "s_dav", dat_zmena = "dat_zmena", c_dav = "c_dav", poc_pla_dav = "poc_pla_dav", ucet_vl = "ucet_vl",}
	const enum GDavkaSIPODtoFragments { davka = "*", cis_org = "*", rok_obd = "*", mes_obd = "*", kod_popl_sipo = "*", c = "*", poc_pla = "*", ozn_dav = "*", dat_nac = "*", sk_vl = "*", bu_vl = "*", s_dav = "*", dat_zmena = "*", c_dav = "*", poc_pla_dav = "*", ucet_vl = "*",}
	const enum GDavkaSIPODtoTypes { davka = "number", cis_org = "string", rok_obd = "number", mes_obd = "number", kod_popl_sipo = "number", c = "JsonDecimal", poc_pla = "number", ozn_dav = "string", dat_nac = "JsonDate", sk_vl = "string", bu_vl = "string", s_dav = "number", dat_zmena = "JsonDate", c_dav = "JsonDecimal", poc_pla_dav = "number", ucet_vl = "string",}
	const enum GDavkaSIPODtoTypeLengths { cis_org = 6, ozn_dav = 254, sk_vl = 11, bu_vl = 34,}
	/**Service Permissions pro práci se složenkami SIPO*/
	interface GDavkaSIPOServicePermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Permission, zda je možno zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Permission, zda je možno načíst dávku*/
		LzeNacist: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GDavkaSIPOServicePermissionsNames { LzeZobrazit = "LzeZobrazit", LzeNacist = "LzeNacist",}
	const enum GDavkaSIPOServicePermissionsFragments { LzeZobrazit = "*", LzeNacist = "*",}
	const enum GDavkaSIPOServicePermissionsTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzeNacist = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GDavkaSIPOServicePermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaSIPO\GDavkaSIPOObsahDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DBTABLE:bucddps
	*      Dávky plateb SIPO - platební věty
	*/
	interface GDavkaSIPOObsahDto {
		/**Číslo dávky*/
		davka?: number|null;
		/**číslo organizace*/
		cis_org?: string|null;
		/**rok období*/
		rok_obd?: number|null;
		/**měsíc období*/
		mes_obd?: number|null;
		/**Kód poplatku SIPO*/
		kod_popl_sipo?: number|null;
		/**spojovací číslo plátce*/
		spoj_cislo?: string|null;
		/**zaplacená částka*/
		c?: JsonDecimal|null;
		/**datum zaplacení*/
		dat_zap?: JsonDate|null;
		/**VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby*/
		vs?: string|null;
		/**stav položky*/
		s_pol?: number|null;
	}
	const enum GDavkaSIPOObsahDtoNames { davka = "davka", cis_org = "cis_org", rok_obd = "rok_obd", mes_obd = "mes_obd", kod_popl_sipo = "kod_popl_sipo", spoj_cislo = "spoj_cislo", c = "c", dat_zap = "dat_zap", vs = "vs", s_pol = "s_pol",}
	const enum GDavkaSIPOObsahDtoFragments { davka = "*", cis_org = "*", rok_obd = "*", mes_obd = "*", kod_popl_sipo = "*", spoj_cislo = "*", c = "*", dat_zap = "*", vs = "*", s_pol = "*",}
	const enum GDavkaSIPOObsahDtoTypes { davka = "number", cis_org = "string", rok_obd = "number", mes_obd = "number", kod_popl_sipo = "number", spoj_cislo = "string", c = "JsonDecimal", dat_zap = "JsonDate", vs = "string", s_pol = "number",}
	const enum GDavkaSIPOObsahDtoTypeLengths { cis_org = 6, spoj_cislo = 10, vs = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaSIPO\IGDavkaSIPO.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Dávky plateb SIPO - sumační věty
	* @domain Banka
	*/
	interface BucDavkaSIPO {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaSIPODto>>;
		/**Vrátí oprávnění složenek SIPO*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Buc.Interface.GDavkaSIPOServicePermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaSIPO: ServiceBase & Catalog.BucDavkaSIPO;
	}
	const BucDavkaSIPO: Client["BucDavkaSIPO"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu složenek SIPO*/
	const enum GDavkaSIPOFilter {
		/**PK tabulky - dávka*/
		davka,
		/**PK tabulky - cis_org*/
		cis_org,
		/**PK tabulky - rok_obd*/
		rok_obd,
		/**PK tabulky - mes_obd*/
		mes_obd,
		/**PK tabulky - kod_popl_sipo*/
		kod_popl_sipo,
		/**PK tabulky - Směrový kód bankovního účtu vlastního - rozlišení banky u které je veden bankovní účet*/
		sk_vl,
		/**PK tabulky - Bankovní účet vlastní - číslo účtu zpracující organizace*/
		bu_vl,
		/**Částka*/
		c,
		/**Režim/mód nabídky (0-1)*/
		mod,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\Slozenky\DavkaSIPO\IGDavkaSIPOObsah.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL interface - Dávky plateb SIPO - platební věty - bucddps
	* @domain Banka
	*/
	interface BucDavkaSIPOObsah {
		/**List*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GDavkaSIPOObsahDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BucDavkaSIPOObsah: ServiceBase & Catalog.BucDavkaSIPOObsah;
	}
	const BucDavkaSIPOObsah: Client["BucDavkaSIPOObsah"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtry pro požadavky na budování LISTu obsahu složenek SIPO*/
	const enum GDavkaSIPOObsahFilter {
		/**PK tabulky - číslo dávky*/
		davka,
		/**PK tabulky - číslo organizace*/
		cis_org,
		/**PK tabulky - rok období*/
		rok_obd,
		/**PK tabulky - měsíc období*/
		mes_obd,
		/**PK tabulky - Kód poplatku SIPO*/
		kod_popl_sipo,
		/**PK tabulky - spojovací číslo plátce*/
		spoj_cislo,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\UcetVlastni\Dto\Gordic.Buc.Interface.GUcetVlDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro UcetVl*/
	interface GUcetVlDto {
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**bu_txt*/
		bu_txt?: string|null;
		/**ktg_bu*/
		ktg_bu?: number|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_od*/
		dat_od?: JsonDate|null;
		/**dat_do*/
		dat_do?: JsonDate|null;
		/**uea_lim*/
		uea_lim?: string|null;
		/**ueb_lim*/
		ueb_lim?: string|null;
		/**ixs_esu_ban*/
		ixs_esu_ban?: string|null;
		/**c_lim*/
		c_lim?: JsonDecimal|null;
		/**c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**c_uhr*/
		c_uhr?: JsonDecimal|null;
		/**typ_bu*/
		typ_bu?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**mena*/
		mena?: number|null;
		/**uea_uc*/
		uea_uc?: string|null;
		/**ueb_uc*/
		ueb_uc?: string|null;
		/**subrada_duz*/
		subrada_duz?: number|null;
		/**priz_up_bu*/
		priz_up_bu?: number|null;
		/**ixp_den_buc*/
		ixp_den_buc?: string|null;
		/**sbu*/
		sbu?: number|null;
		/**dat_bvy*/
		dat_bvy?: JsonDate|null;
		/**c_ps*/
		c_ps?: JsonDecimal|null;
		/**c_rok_db*/
		c_rok_db?: JsonDecimal|null;
		/**c_rok_kr*/
		c_rok_kr?: JsonDecimal|null;
		/**c_zust*/
		c_zust?: JsonDecimal|null;
		/**druh_bu*/
		druh_bu?: number|null;
		/**cis_bvy*/
		cis_bvy?: number|null;
		/**ixp_bvy*/
		ixp_bvy?: string|null;
		/**c_lim_max*/
		c_lim_max?: JsonDecimal|null;
		/**uus*/
		uus?: string|null;
		/**iban*/
		iban?: string|null;
		/**zc_vyp*/
		zc_vyp?: number|null;
		/**per_vyp*/
		per_vyp?: number|null;
		/**ur_prist_bu*/
		ur_prist_bu?: number|null;
		/**priz_isprofin*/
		priz_isprofin?: number|null;
		/**kod_vys*/
		kod_vys?: string|null;
		/**kon_maxlim*/
		kon_maxlim?: number|null;
		/**par_vyp*/
		par_vyp?: number|null;
		/**c_lim_ban*/
		c_lim_ban?: JsonDecimal|null;
		/**c_zust_ban*/
		c_zust_ban?: JsonDecimal|null;
		/**dat_bvy_ban*/
		dat_bvy_ban?: JsonDate|null;
		/**dat_ttv*/
		dat_ttv?: JsonDate|null;
		/**priz_sr*/
		priz_sr?: number|null;
		/**id_hdr_ris_kr*/
		id_hdr_ris_kr?: string|null;
		/**radek_hdr_kr*/
		radek_hdr_kr?: number|null;
		/**priz_rozp*/
		priz_rozp?: number|null;
		/**priz_spol_u*/
		priz_spol_u?: number|null;
		/**ode_sp*/
		ode_sp?: number|null;
		/**ukl_pri*/
		ukl_pri?: number|null;
		/**id_nt_max*/
		id_nt_max?: string|null;
		/**příznak pro zjištení zůstatku pomocí WS*/
		dab?: number|null;
		/**Napočtená žástka příkazů pro kontrolu disponibility*/
		c_nap?: JsonDecimal|null;
		/**Datum nápočtu*/
		dat_nap?: JsonDate|null;
		/**Aktuální částka zůstatku c_zust - c_ode_db ( částka odeslaná od posledního výpisu ) / akt.zůstatek zjištěný WS*/
		c_zust_akt?: JsonDecimal|null;
		/**BIC kód*/
		bic?: string|null;
		/**datum zůstatku - disponibilní*/
		dat_zus?: JsonDate|null;
		/**datum zůstatku - účetní*/
		dat_zus_u?: JsonDate|null;
		/**Aktuální prostředky c_lim + c_zust_akt*/
		c_disp?: JsonDecimal|null;
		/**Překročená čáska c_nap - c_disp*/
		c_prek?: JsonDecimal|null;
		/**mena_txt*/
		mena_txt?: string|null;
	}
	const enum GUcetVlDtoNames { rok = "rok", ico = "ico", ucs = "ucs", bu_vl = "bu_vl", sk_vl = "sk_vl", bu_txt = "bu_txt", ktg_bu = "ktg_bu", aktivita = "aktivita", dat_od = "dat_od", dat_do = "dat_do", uea_lim = "uea_lim", ueb_lim = "ueb_lim", ixs_esu_ban = "ixs_esu_ban", c_lim = "c_lim", c_kuhr = "c_kuhr", c_uhr = "c_uhr", typ_bu = "typ_bu", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev = "nazev", zkratka = "zkratka", mena = "mena", uea_uc = "uea_uc", ueb_uc = "ueb_uc", subrada_duz = "subrada_duz", priz_up_bu = "priz_up_bu", ixp_den_buc = "ixp_den_buc", sbu = "sbu", dat_bvy = "dat_bvy", c_ps = "c_ps", c_rok_db = "c_rok_db", c_rok_kr = "c_rok_kr", c_zust = "c_zust", druh_bu = "druh_bu", cis_bvy = "cis_bvy", ixp_bvy = "ixp_bvy", c_lim_max = "c_lim_max", uus = "uus", iban = "iban", zc_vyp = "zc_vyp", per_vyp = "per_vyp", ur_prist_bu = "ur_prist_bu", priz_isprofin = "priz_isprofin", kod_vys = "kod_vys", kon_maxlim = "kon_maxlim", par_vyp = "par_vyp", c_lim_ban = "c_lim_ban", c_zust_ban = "c_zust_ban", dat_bvy_ban = "dat_bvy_ban", dat_ttv = "dat_ttv", priz_sr = "priz_sr", id_hdr_ris_kr = "id_hdr_ris_kr", radek_hdr_kr = "radek_hdr_kr", priz_rozp = "priz_rozp", priz_spol_u = "priz_spol_u", ode_sp = "ode_sp", ukl_pri = "ukl_pri", id_nt_max = "id_nt_max", dab = "dab", c_nap = "c_nap", dat_nap = "dat_nap", c_zust_akt = "c_zust_akt", bic = "bic", dat_zus = "dat_zus", dat_zus_u = "dat_zus_u", c_disp = "c_disp", c_prek = "c_prek", mena_txt = "mena_txt",}
	const enum GUcetVlDtoFragments { rok = "main", ico = "main", ucs = "main", bu_vl = "main", sk_vl = "main", bu_txt = "main", ktg_bu = "main", aktivita = "main", dat_od = "main", dat_do = "main", uea_lim = "main", ueb_lim = "main", ixs_esu_ban = "main", c_lim = "main", c_kuhr = "main", c_uhr = "main", typ_bu = "main", dat_zmena = "main", zmenu_prov = "main", nazev = "main", zkratka = "main", mena = "main", uea_uc = "main", ueb_uc = "main", subrada_duz = "main", priz_up_bu = "main", ixp_den_buc = "main", sbu = "main", dat_bvy = "main", c_ps = "main", c_rok_db = "main", c_rok_kr = "main", c_zust = "main", druh_bu = "main", cis_bvy = "main", ixp_bvy = "main", c_lim_max = "main", uus = "main", iban = "main", zc_vyp = "main", per_vyp = "main", ur_prist_bu = "main", priz_isprofin = "main", kod_vys = "main", kon_maxlim = "main", par_vyp = "main", c_lim_ban = "main", c_zust_ban = "main", dat_bvy_ban = "main", dat_ttv = "main", priz_sr = "main", id_hdr_ris_kr = "main", radek_hdr_kr = "main", priz_rozp = "main", priz_spol_u = "main", ode_sp = "main", ukl_pri = "main", id_nt_max = "main", dab = "*", c_nap = "*", dat_nap = "*", c_zust_akt = "*", bic = "*", dat_zus = "*", dat_zus_u = "*", c_disp = "*", c_prek = "*", mena_txt = "mena_txt",}
	const enum GUcetVlDtoTypes { rok = "number", ico = "string", ucs = "string", bu_vl = "string", sk_vl = "string", bu_txt = "string", ktg_bu = "number", aktivita = "number", dat_od = "JsonDate", dat_do = "JsonDate", uea_lim = "string", ueb_lim = "string", ixs_esu_ban = "string", c_lim = "JsonDecimal", c_kuhr = "JsonDecimal", c_uhr = "JsonDecimal", typ_bu = "number", dat_zmena = "JsonDate", zmenu_prov = "string", nazev = "string", zkratka = "string", mena = "number", uea_uc = "string", ueb_uc = "string", subrada_duz = "number", priz_up_bu = "number", ixp_den_buc = "string", sbu = "number", dat_bvy = "JsonDate", c_ps = "JsonDecimal", c_rok_db = "JsonDecimal", c_rok_kr = "JsonDecimal", c_zust = "JsonDecimal", druh_bu = "number", cis_bvy = "number", ixp_bvy = "string", c_lim_max = "JsonDecimal", uus = "string", iban = "string", zc_vyp = "number", per_vyp = "number", ur_prist_bu = "number", priz_isprofin = "number", kod_vys = "string", kon_maxlim = "number", par_vyp = "number", c_lim_ban = "JsonDecimal", c_zust_ban = "JsonDecimal", dat_bvy_ban = "JsonDate", dat_ttv = "JsonDate", priz_sr = "number", id_hdr_ris_kr = "string", radek_hdr_kr = "number", priz_rozp = "number", priz_spol_u = "number", ode_sp = "number", ukl_pri = "number", id_nt_max = "string", dab = "number", c_nap = "JsonDecimal", dat_nap = "JsonDate", c_zust_akt = "JsonDecimal", bic = "string", dat_zus = "JsonDate", dat_zus_u = "JsonDate", c_disp = "JsonDecimal", c_prek = "JsonDecimal", mena_txt = "string",}
	const enum GUcetVlDtoTypeLengths { ico = 10, ucs = 10, bu_vl = 34, sk_vl = 11, bu_txt = 46, uea_lim = 3, ueb_lim = 4, ixs_esu_ban = 12, zmenu_prov = 12, nazev = 50, zkratka = 16, uea_uc = 3, ueb_uc = 4, ixp_den_buc = 12, ixp_bvy = 12, uus = 10, iban = 34, kod_vys = 4, id_hdr_ris_kr = 10, id_nt_max = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\ZustatekVl\Gordic.Buc.Interface.IGZustatekVl.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Zůstatky vlastních BÚ
	* @domain Banka
	* @businessObject ZustatekVl
	*/
	interface ZustatekVl {
		/**Detail Zůstatky vlastních BÚ*/
		read(rq?:Gordic.Buc.Interface.GZustatekVlDto|CallParams<GServiceReadRequest<Gordic.Buc.Interface.GZustatekVlDto>>): _Task<GServiceReadRequest<Gordic.Buc.Interface.GZustatekVlDto>,GServiceReadResponse<Gordic.Buc.Interface.GZustatekVlDto>>;
		/**Seznam Zůstatky vlastních BÚ*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Buc.Interface.GZustatekVlDto>>;
		/**Připrava-načtení aktuálních zůstatku do BUCTUVL pomocí spl*/
		napoctiZusDoTmpPoslVyp(rq?:Gordic.Buc.Interface.GZustatekVlDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GZustatekVlDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GZustatekVlDto>,GServiceActionResponse<Gordic.Buc.Interface.GZustatekVlDto>>;
		/**Připrava-načtení aktuálních zůstatku do BUCTUVL - konkrétní banka - sk_vl*/
		pripravData(rq?:Gordic.Buc.Interface.GBankaDto|CallParams<GServiceActionRequest<Gordic.Buc.Interface.GBankaDto>>): _Task<GServiceActionRequest<Gordic.Buc.Interface.GBankaDto>,GServiceActionResponse<Gordic.Buc.Interface.GZustatekVlDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ZustatekVl: ServiceBase & Catalog.ZustatekVl;
	}
	const ZustatekVl: Client["ZustatekVl"];
}
declare namespace Gordic.Buc.Interface {
	/**Filtr pro Zůstatky vlastních BÚ*/
	const enum GZustatekVlFilter {
		/**log_por_cislo*/
		log_por_cislo,
		/**bu_vl*/
		bu_vl,
		/**sk_vl*/
		sk_vl,
		/**nov_zus*/
		nov_zus,
		/**typ_zus*/
		typ_zus,
		/**dat_zus*/
		dat_zus,
		/**ucet_id*/
		ucet_id,
		/**ikc*/
		ikc,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Buc.Interface\ZustatekVl\Dto\Gordic.Buc.Interface.GZustatekVlDto.d.ts 

declare namespace Gordic.Buc.Interface {
	/**DTO pro ZustatekVl*/
	interface GZustatekVlDto {
		/**log_por_cislo*/
		log_por_cislo?: number|null;
		/**bu_vl*/
		bu_vl?: string|null;
		/**sk_vl*/
		sk_vl?: string|null;
		/**nov_zus*/
		nov_zus?: JsonDecimal|null;
		/**ikc*/
		ikc?: JsonDecimal|null;
		/**typ_zus*/
		typ_zus?: number|null;
		/**dat_zus*/
		dat_zus?: JsonDate|null;
		/**ucet_id*/
		ucet_id?: string|null;
		/**nazev účtu*/
		nazev?: string|null;
	}
	const enum GZustatekVlDtoNames { log_por_cislo = "log_por_cislo", bu_vl = "bu_vl", sk_vl = "sk_vl", nov_zus = "nov_zus", ikc = "ikc", typ_zus = "typ_zus", dat_zus = "dat_zus", ucet_id = "ucet_id", nazev = "nazev",}
	const enum GZustatekVlDtoFragments { log_por_cislo = "main", bu_vl = "main", sk_vl = "main", nov_zus = "main", ikc = "main", typ_zus = "main", dat_zus = "main", ucet_id = "main", nazev = "nazev",}
	const enum GZustatekVlDtoTypes { log_por_cislo = "number", bu_vl = "string", sk_vl = "string", nov_zus = "JsonDecimal", ikc = "JsonDecimal", typ_zus = "number", dat_zus = "JsonDate", ucet_id = "string", nazev = "string",}
	const enum GZustatekVlDtoTypeLengths { bu_vl = 34, sk_vl = 11, ucet_id = 10, nazev = 50,}
}

//#endregion

