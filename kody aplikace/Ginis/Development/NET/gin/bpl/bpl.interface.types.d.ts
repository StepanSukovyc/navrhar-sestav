/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       bpl.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Bpl.Interface\Gordic.Bpl.Interface.csproj
*    created     2026-02-16 14:33:54
*    files       Controls\DataSet\GBplskon.Dto.d.ts
*                Doklad\GBplKtgTyp.d.ts
*                Doklad\DTO\DokumentSSLDto.d.ts
*                Doklad\DTO\DuplikovaniDokladuVyberDto.d.ts
*                Doklad\DTO\GlobalsDto.d.ts
*                Doklad\DTO\PristupnostAkciKontaceDto.d.ts
*                Doklad\DTO\PristupnostAkciPredpisUctovaniDto.d.ts
*                Doklad\DTO\PristupnostAkciSeznamDto.d.ts
*                Doklad\TypoveDatasety\Gordic.Bpl.Interface.DetailDokladuKdfDto.d.ts
*                Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamDokladuKdfDto.d.ts
*                Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamESUzeSML.Dto.d.ts
*                Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamIVZzEVZ.Dto.d.ts
*                Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamKryLikDto.d.ts
*                Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamPlatebDto.d.ts
*                Init\GBplGlobalsBase.d.ts
*                ISL\IGBplFakturaDosla.d.ts
*                ISL\IGBplFakturaDoslaPlatby.d.ts
*                ISL\IGBplFakturaDoslaUctovaniKrytiLikvidace.d.ts
*                ISL\IGBplFakturaDoslaVazby.d.ts
*                ISL\IGBplFakturaDoslaVecnyProfil.d.ts
*                ISL\IGBplPredikcePredkontace.d.ts
*                ISL\IGBplSupport.d.ts
*                ISL\Dto\GBplFakturaDoslaDto.d.ts
*                ISL\Dto\GBplFakturaDoslaEvidenceDto.d.ts
*                ISL\Dto\GBplFakturaDoslaExterniUhradaDto.d.ts
*                ISL\Dto\GBplFakturaDoslaFilterDto.d.ts
*                ISL\Dto\GBplFakturaDoslaPlatbyDto.d.ts
*                ISL\Dto\GBplFakturaDoslaUctovaniKrytiLikvidaceDto.d.ts
*                ISL\Dto\GBplFakturaDoslaUhradaDto.d.ts
*                ISL\Dto\GBplFakturaDoslaVazbyDto.d.ts
*                ISL\Dto\GBplFakturaDoslaVazbyPripravaRequestDto.d.ts
*                ISL\Dto\GBplFakturaDoslaVecnyProfilDto.d.ts
*                ISL\Dto\GBplfakturaDoslaVyberVazebDto.d.ts
*                ISL\Dto\GBplKontrolaDokladuDto.d.ts
*                ISL\Dto\GBplPredikcePredkontaceDto.d.ts
*                ISL\Dto\GBplSupportDto.d.ts
*                ISL\Dto\GBplUzaverkaRequestDto.d.ts
*                Kontace\IGKdfPredkontace.d.ts
*                Kontace\Dto\GBplcprzDto.d.ts
*                Kontace\Dto\GBplPredkontaceDto.d.ts
*                Kontace\Dto\GEkovabuDto.d.ts
*                Kontace\TypoveDatasety\GKdfdkry.Dto.d.ts
*                Kontace\TypoveDatasety\GKdfDkryDuhrSkon.Dto.d.ts
*                Kontace\TypoveDatasety\Gordic.Bpl.Interface.GEkotkonDto.d.ts
*                Kontace\TypoveDatasety\Gordic.Bpl.Interface.SeznamPredpisBuc.Dto.d.ts
*                Uzaverky\IGAgenda.d.ts
*                Uzaverky\IGKniha.d.ts
*                Vazby\TypoveDatasety\Gordic.Bpl.Interface.SeznamVazDokladu.Dto.d.ts
*                Vazby\TypoveDatasety\Gordic.Bpl.Interface.SeznamVazebKdfDto.d.ts
*                Vazby\TypoveDatasety\Gordic.Bpl.Interface.SeznamVazSmluv.Dto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Controls\DataSet\GBplskon.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:Seznam*/
	interface GBplskonDto {
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.kod*/
		kod?: string|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.dat_od*/
		dat_od?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.typ_kon*/
		typ_kon?: number|null;
		/**DBCOLUMN:Seznam.ixs_zpz*/
		ixs_zpz?: string|null;
		/**DBCOLUMN:Seznam.ktg_bu*/
		ktg_bu?: number|null;
		/**DBCOLUMN:Seznam.ktg_lik*/
		ktg_lik?: number|null;
		/**DBCOLUMN:Seznam.ktg_kry*/
		ktg_kry?: number|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.priz_mat*/
		priz_mat?: number|null;
		/**DBCOLUMN:Seznam.ppk*/
		ppk?: number|null;
		/**DBCOLUMN:Seznam.priz_tzh*/
		priz_tzh?: number|null;
		/**DBCOLUMN:Seznam.tzh_typ*/
		tzh_typ?: number|null;
	}
	const enum GBplskonDtoNames { ixs_kon = "ixs_kon", aktivita = "aktivita", kod = "kod", zkratka = "zkratka", nazev = "nazev", poznamka = "poznamka", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_kon = "typ_kon", ixs_zpz = "ixs_zpz", ktg_bu = "ktg_bu", ktg_lik = "ktg_lik", ktg_kry = "ktg_kry", k_v = "k_v", priz_mat = "priz_mat", ppk = "ppk", priz_tzh = "priz_tzh", tzh_typ = "tzh_typ",}
	const enum GBplskonDtoFragments { ixs_kon = "*", aktivita = "*", kod = "*", zkratka = "*", nazev = "*", poznamka = "*", dat_od = "*", dat_do = "*", dat_zmena = "*", zmenu_prov = "*", typ_kon = "*", ixs_zpz = "*", ktg_bu = "*", ktg_lik = "*", ktg_kry = "*", k_v = "*", priz_mat = "*", ppk = "*", priz_tzh = "*", tzh_typ = "*",}
	const enum GBplskonDtoTypes { ixs_kon = "string", aktivita = "number", kod = "string", zkratka = "string", nazev = "string", poznamka = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", typ_kon = "number", ixs_zpz = "string", ktg_bu = "number", ktg_lik = "number", ktg_kry = "number", k_v = "number", priz_mat = "number", ppk = "number", priz_tzh = "number", tzh_typ = "number",}
	const enum GBplskonDtoTypeLengths { ixs_kon = 12, kod = 30, zkratka = 16, nazev = 254, poznamka = 50, zmenu_prov = 12, ixs_zpz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\GBplKtgTyp.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Konstanty pro ktg_typ dokladů v BPL*/
	interface GBplKtgTyp {
		/**Faktura dodavatelská*/
		KDF_FA?: number|null;
		/**Zál. faktura - daňový doklad KDF*/
		KDF_ZAL_DPH?: number|null;
		/**Opravný daňový doklad KDF*/
		KDF_OPR_DPH?: number|null;
		/**?*/
		KDF_EU_DPH?: number|null;
		/**Dobropis dodavatelský*/
		KDF_DO?: number|null;
		/**Faktura k inkasu dodavatelská*/
		KDF_IN?: number|null;
		/**Proforma faktura dodavatelská*/
		KDF_PRO?: number|null;
		/**Vyúčt. bez záv. - k proforma faktuře*/
		KDF_PROK?: number|null;
		/**Vyúčt. s dopl. - k proforma faktuře*/
		KDF_PROK_D?: number|null;
		/**Vyúčt. s přepl. - k proforma faktuře*/
		KDF_PROK_P?: number|null;
		/**Zálohová faktura dodavatelská*/
		KDF_ZAL?: number|null;
		/**Vyúčt. bez záv. - k zálohové faktuře*/
		KDF_ZALK?: number|null;
		/**Vyúčt. s dopl. - k zálohové faktuře*/
		KDF_ZALK_D?: number|null;
		/**Vyúčt. s přepl. - k zálohové faktuře*/
		KDF_ZALK_P?: number|null;
		/**Likvidační záznam centrálních výdajů*/
		KDF_LIK?: number|null;
		/**Penalizační faktura dodavatelská*/
		KDF_PEN?: number|null;
		/**Faktura dodavatelská hromadná*/
		KDF_FA_HR?: number|null;
		/**Platební kalendář*/
		KDF_PLA_KAL?: number|null;
		/**Splátkový kalendář*/
		KDF_SPL_KAL?: number|null;
		/**Faktura odběratelská*/
		KOF_FA?: number|null;
		/**Zál. faktura - daňový doklad KOF*/
		KOF_ZAL_DPH?: number|null;
		/**Opravný daňový doklad KOF*/
		KOF_OPR_DPH?: number|null;
		/**Dobropis odběratelský*/
		KOF_DO?: number|null;
		/**Faktura k inkasu odběratelská*/
		KOF_IN?: number|null;
		/**Proforma faktura odběratelská*/
		KOF_PRO?: number|null;
		/**Vyúčt. bez záv. - k proforma faktuře*/
		KOF_PROK?: number|null;
		/**Vyúčt. s dopl. - k proforma faktuře*/
		KOF_PROK_D?: number|null;
		/**Vyúčt. s přepl. - k proforma faktuře*/
		KOF_PROK_P?: number|null;
		/**Zálohová faktura odběratelská*/
		KOF_ZAL?: number|null;
		/**Vyúčt. bez záv. - k zálohové faktuře*/
		KOF_ZALK?: number|null;
		/**Vyúčt. s dopl. - k zálohové faktuře*/
		KOF_ZALK_D?: number|null;
		/**Vyúčt. s přepl. - k zálohové faktuře*/
		KOF_ZALK_P?: number|null;
		/**Faktura odběratelská hromadná*/
		KOF_FA_HR?: number|null;
		/**Kopie likvidačního záznamu faktury centr. výdajů*/
		KOF_LIK?: number|null;
		/**Upomínka*/
		KOF_UPO?: number|null;
		/**Penalizační faktura odběratelská*/
		KOF_PEN?: number|null;
		/**Smluvní pokuta*/
		KOF_SPO?: number|null;
		/**Platební kalendář*/
		KOF_PLA_KAL?: number|null;
		/**Splátkový kalendář*/
		KOF_SPL_KAL?: number|null;
		/**Poukaz výdajový*/
		POU_DEB?: number|null;
		/**Poukaz příjmový*/
		POU_KRE?: number|null;
		/**Převodní poukaz výdajový*/
		POU_PDEB?: number|null;
		/**Převodní poukaz příjmový*/
		POU_PKRE?: number|null;
		/**Poukaz výdajový hromadný*/
		POU_DEB_HR?: number|null;
		/**Otevření limitu bankovního účtu*/
		POU_LIM?: number|null;
		/**povolené kategorie KDF*/
		KDF_PovoleneKategorie?: number[]|null;
		/**povolené kategorie POU*/
		POU_PovoleneKategorie?: number[]|null;
		/**povolené kategorie PRE*/
		PRE_PovoleneKategorie?: number[]|null;
		/**povolené kategorie pro masky PRE*/
		KOF_PovoleneKategorie?: number[]|null;
		/**Doklady bez záv. nebo pohl*/
		KDF_BezZavPohl?: number[]|null;
		/**Doklady bez záv. nebo pohl*/
		KOF_BezZavPohl?: number[]|null;
		/**Doklady týkající se DPH*/
		DPH?: number[]|null;
		/**Doklady výdajové s*/
		IS_vydaj?: number[]|null;
		/**Doklady týkající se kalendářů*/
		JeKalendar?: number[]|null;
	}
	const enum GBplKtgTypNames { KDF_FA = "KDF_FA", KDF_ZAL_DPH = "KDF_ZAL_DPH", KDF_OPR_DPH = "KDF_OPR_DPH", KDF_EU_DPH = "KDF_EU_DPH", KDF_DO = "KDF_DO", KDF_IN = "KDF_IN", KDF_PRO = "KDF_PRO", KDF_PROK = "KDF_PROK", KDF_PROK_D = "KDF_PROK_D", KDF_PROK_P = "KDF_PROK_P", KDF_ZAL = "KDF_ZAL", KDF_ZALK = "KDF_ZALK", KDF_ZALK_D = "KDF_ZALK_D", KDF_ZALK_P = "KDF_ZALK_P", KDF_LIK = "KDF_LIK", KDF_PEN = "KDF_PEN", KDF_FA_HR = "KDF_FA_HR", KDF_PLA_KAL = "KDF_PLA_KAL", KDF_SPL_KAL = "KDF_SPL_KAL", KOF_FA = "KOF_FA", KOF_ZAL_DPH = "KOF_ZAL_DPH", KOF_OPR_DPH = "KOF_OPR_DPH", KOF_DO = "KOF_DO", KOF_IN = "KOF_IN", KOF_PRO = "KOF_PRO", KOF_PROK = "KOF_PROK", KOF_PROK_D = "KOF_PROK_D", KOF_PROK_P = "KOF_PROK_P", KOF_ZAL = "KOF_ZAL", KOF_ZALK = "KOF_ZALK", KOF_ZALK_D = "KOF_ZALK_D", KOF_ZALK_P = "KOF_ZALK_P", KOF_FA_HR = "KOF_FA_HR", KOF_LIK = "KOF_LIK", KOF_UPO = "KOF_UPO", KOF_PEN = "KOF_PEN", KOF_SPO = "KOF_SPO", KOF_PLA_KAL = "KOF_PLA_KAL", KOF_SPL_KAL = "KOF_SPL_KAL", POU_DEB = "POU_DEB", POU_KRE = "POU_KRE", POU_PDEB = "POU_PDEB", POU_PKRE = "POU_PKRE", POU_DEB_HR = "POU_DEB_HR", POU_LIM = "POU_LIM", KDF_PovoleneKategorie = "KDF_PovoleneKategorie", POU_PovoleneKategorie = "POU_PovoleneKategorie", PRE_PovoleneKategorie = "PRE_PovoleneKategorie", KOF_PovoleneKategorie = "KOF_PovoleneKategorie", KDF_BezZavPohl = "KDF_BezZavPohl", KOF_BezZavPohl = "KOF_BezZavPohl", DPH = "DPH", IS_vydaj = "IS_vydaj", JeKalendar = "JeKalendar",}
	const enum GBplKtgTypFragments { KDF_FA = "*", KDF_ZAL_DPH = "*", KDF_OPR_DPH = "*", KDF_EU_DPH = "*", KDF_DO = "*", KDF_IN = "*", KDF_PRO = "*", KDF_PROK = "*", KDF_PROK_D = "*", KDF_PROK_P = "*", KDF_ZAL = "*", KDF_ZALK = "*", KDF_ZALK_D = "*", KDF_ZALK_P = "*", KDF_LIK = "*", KDF_PEN = "*", KDF_FA_HR = "*", KDF_PLA_KAL = "*", KDF_SPL_KAL = "*", KOF_FA = "*", KOF_ZAL_DPH = "*", KOF_OPR_DPH = "*", KOF_DO = "*", KOF_IN = "*", KOF_PRO = "*", KOF_PROK = "*", KOF_PROK_D = "*", KOF_PROK_P = "*", KOF_ZAL = "*", KOF_ZALK = "*", KOF_ZALK_D = "*", KOF_ZALK_P = "*", KOF_FA_HR = "*", KOF_LIK = "*", KOF_UPO = "*", KOF_PEN = "*", KOF_SPO = "*", KOF_PLA_KAL = "*", KOF_SPL_KAL = "*", POU_DEB = "*", POU_KRE = "*", POU_PDEB = "*", POU_PKRE = "*", POU_DEB_HR = "*", POU_LIM = "*", KDF_PovoleneKategorie = "*", POU_PovoleneKategorie = "*", PRE_PovoleneKategorie = "*", KOF_PovoleneKategorie = "*", KDF_BezZavPohl = "*", KOF_BezZavPohl = "*", DPH = "*", IS_vydaj = "*", JeKalendar = "*",}
	const enum GBplKtgTypTypes { KDF_FA = "number", KDF_ZAL_DPH = "number", KDF_OPR_DPH = "number", KDF_EU_DPH = "number", KDF_DO = "number", KDF_IN = "number", KDF_PRO = "number", KDF_PROK = "number", KDF_PROK_D = "number", KDF_PROK_P = "number", KDF_ZAL = "number", KDF_ZALK = "number", KDF_ZALK_D = "number", KDF_ZALK_P = "number", KDF_LIK = "number", KDF_PEN = "number", KDF_FA_HR = "number", KDF_PLA_KAL = "number", KDF_SPL_KAL = "number", KOF_FA = "number", KOF_ZAL_DPH = "number", KOF_OPR_DPH = "number", KOF_DO = "number", KOF_IN = "number", KOF_PRO = "number", KOF_PROK = "number", KOF_PROK_D = "number", KOF_PROK_P = "number", KOF_ZAL = "number", KOF_ZALK = "number", KOF_ZALK_D = "number", KOF_ZALK_P = "number", KOF_FA_HR = "number", KOF_LIK = "number", KOF_UPO = "number", KOF_PEN = "number", KOF_SPO = "number", KOF_PLA_KAL = "number", KOF_SPL_KAL = "number", POU_DEB = "number", POU_KRE = "number", POU_PDEB = "number", POU_PKRE = "number", POU_DEB_HR = "number", POU_LIM = "number", KDF_PovoleneKategorie = "number[]", POU_PovoleneKategorie = "number[]", PRE_PovoleneKategorie = "number[]", KOF_PovoleneKategorie = "number[]", KDF_BezZavPohl = "number[]", KOF_BezZavPohl = "number[]", DPH = "number[]", IS_vydaj = "number[]", JeKalendar = "number[]",}
	const enum GBplKtgTypTypeLengths {}
	const enum EBplKtgTyp {
		KDF_FA=1300,
		/**Zál. faktura - daňový doklad KDF*/
		KDF_ZAL_DPH=1305,
		/**Opravný daňový doklad KDF*/
		KDF_OPR_DPH=1306,
		/**?*/
		KDF_EU_DPH=1307,
		/**Dobropis dodavatelský*/
		KDF_DO=1310,
		/**Faktura k inkasu dodavatelská*/
		KDF_IN=1320,
		/**Proforma faktura dodavatelská*/
		KDF_PRO=1330,
		/**Vyúčt. bez záv. - k proforma faktuře*/
		KDF_PROK=1340,
		/**Vyúčt. s dopl. - k proforma faktuře*/
		KDF_PROK_D=1341,
		/**Vyúčt. s přepl. - k proforma faktuře*/
		KDF_PROK_P=1342,
		/**Zálohová faktura dodavatelská*/
		KDF_ZAL=1350,
		/**Vyúčt. bez záv. - k zálohové faktuře*/
		KDF_ZALK=1360,
		/**Vyúčt. s dopl. - k zálohové faktuře*/
		KDF_ZALK_D=1361,
		/**Vyúčt. s přepl. - k zálohové faktuře*/
		KDF_ZALK_P=1362,
		/**Likvidační záznam centrálních výdajů*/
		KDF_LIK=1370,
		/**Penalizační faktura dodavatelská*/
		KDF_PEN=1371,
		/**Faktura dodavatelská hromadná*/
		KDF_FA_HR=1374,
		/**Platební kalendář*/
		KDF_PLA_KAL=1385,
		/**Splátkový kalendář*/
		KDF_SPL_KAL=1386,
		/**Faktura odběratelská*/
		KOF_FA=1400,
		/**Zál. faktura - daňový doklad KOF*/
		KOF_ZAL_DPH=1405,
		/**Opravný daňový doklad KOF*/
		KOF_OPR_DPH=1406,
		/**Dobropis odběratelský*/
		KOF_DO=1410,
		/**Faktura k inkasu odběratelská*/
		KOF_IN=1420,
		/**Proforma faktura odběratelská*/
		KOF_PRO=1430,
		/**Vyúčt. bez záv. - k proforma faktuře*/
		KOF_PROK=1490,
		/**Vyúčt. s dopl. - k proforma faktuře*/
		KOF_PROK_D=1491,
		/**Vyúčt. s přepl. - k proforma faktuře*/
		KOF_PROK_P=1492,
		/**Zálohová faktura odběratelská*/
		KOF_ZAL=1440,
		/**Vyúčt. bez záv. - k zálohové faktuře*/
		KOF_ZALK=1480,
		/**Vyúčt. s dopl. - k zálohové faktuře*/
		KOF_ZALK_D=1481,
		/**Vyúčt. s přepl. - k zálohové faktuře*/
		KOF_ZALK_P=1482,
		/**Faktura odběratelská hromadná*/
		KOF_FA_HR=1484,
		/**Kopie likvidačního záznamu faktury centr. výdajů*/
		KOF_LIK=1450,
		/**Upomínka*/
		KOF_UPO=1460,
		/**Penalizační faktura odběratelská*/
		KOF_PEN=1470,
		/**Smluvní pokuta*/
		KOF_SPO=1471,
		/**Platební kalendář*/
		KOF_PLA_KAL=1485,
		/**Splátkový kalendář*/
		KOF_SPL_KAL=1486,
		/**Poukaz výdajový*/
		POU_DEB=1380,
		/**Poukaz příjmový*/
		POU_KRE=1381,
		/**Převodní poukaz výdajový*/
		POU_PDEB=1382,
		/**Převodní poukaz příjmový*/
		POU_PKRE=1383,
		/**Poukaz výdajový hromadný*/
		POU_DEB_HR=1384,
		/**Otevření limitu bankovního účtu*/
		POU_LIM=1390,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\DTO\DokumentSSLDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro přenos dat záložky dokument*/
	interface DokumentSSLDto {
		/**Aktuální značka*/
		akt_znacka?: string|null;
		/**název*/
		nazev?: string|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**ktg_typ*/
		ktg_typ?: string|null;
	}
	const enum DokumentSSLDtoNames { akt_znacka = "akt_znacka", nazev = "nazev", ixs_typ = "ixs_typ", ktg_typ = "ktg_typ",}
	const enum DokumentSSLDtoFragments { akt_znacka = "*", nazev = "*", ixs_typ = "*", ktg_typ = "*",}
	const enum DokumentSSLDtoTypes { akt_znacka = "string", nazev = "string", ixs_typ = "string", ktg_typ = "string",}
	const enum DokumentSSLDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\DTO\DuplikovaniDokladuVyberDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Výběr částí, které chce uživatel duplikovat*/
	interface DuplikovaniDokladuVyberDto {
		/**Idenfifikátor původního dokladu*/
		ixp?: string|null;
		/**Agendové číslo dokladu*/
		agendoveCislo?: string|null;
		/**Hlavička dokladu*/
		hlavickaDokladu?: boolean|null;
		/**Popis dokladu*/
		popisDokladu?: boolean|null;
		/**Variabilní symbol*/
		variabilniSymbol?: boolean|null;
		/**Rozšířený profil*/
		rozsireniProfil?: boolean|null;
		/**Rozšířený profil - počet*/
		rozsireniProfilPocet?: number|null;
		/**Klíčová slova*/
		klicovaSlova?: boolean|null;
		/**Klíčová slova - počet*/
		klicovaSlovaPocet?: number|null;
		/**Položky VP*/
		polozkyVP?: boolean|null;
		/**Položky VP - počet*/
		polozkyVPPocet?: number|null;
		/**Rozpis plateb*/
		rozpisPlateb?: boolean|null;
		/**Rozpis plateb - počet*/
		rozpisPlatebPocet?: number|null;
		/**Krytí dokladu*/
		krytiDokladu?: boolean|null;
		/**Krytí dokladu - počet*/
		krytiDokladuPocet?: number|null;
		/**Likvidace dokladu*/
		likvidaceDokladu?: boolean|null;
		/**Likvidace dokladu - počet*/
		likvidaceDokladuPocet?: number|null;
		/**Poznámky dokladu*/
		poznamkyDokladu?: boolean|null;
		/**Poznámky dokladu - počet*/
		poznamkyDokladuPocet?: number|null;
		/**Elektronické přílohy dokladu*/
		ePrilohyDokladu?: boolean|null;
		/**Elektronické přílohy dokladu - počet*/
		ePrilohyDokladuPocet?: number|null;
	}
	const enum DuplikovaniDokladuVyberDtoNames { ixp = "ixp", agendoveCislo = "agendoveCislo", hlavickaDokladu = "hlavickaDokladu", popisDokladu = "popisDokladu", variabilniSymbol = "variabilniSymbol", rozsireniProfil = "rozsireniProfil", rozsireniProfilPocet = "rozsireniProfilPocet", klicovaSlova = "klicovaSlova", klicovaSlovaPocet = "klicovaSlovaPocet", polozkyVP = "polozkyVP", polozkyVPPocet = "polozkyVPPocet", rozpisPlateb = "rozpisPlateb", rozpisPlatebPocet = "rozpisPlatebPocet", krytiDokladu = "krytiDokladu", krytiDokladuPocet = "krytiDokladuPocet", likvidaceDokladu = "likvidaceDokladu", likvidaceDokladuPocet = "likvidaceDokladuPocet", poznamkyDokladu = "poznamkyDokladu", poznamkyDokladuPocet = "poznamkyDokladuPocet", ePrilohyDokladu = "ePrilohyDokladu", ePrilohyDokladuPocet = "ePrilohyDokladuPocet",}
	const enum DuplikovaniDokladuVyberDtoFragments { ixp = "*", agendoveCislo = "*", hlavickaDokladu = "*", popisDokladu = "*", variabilniSymbol = "*", rozsireniProfil = "*", rozsireniProfilPocet = "*", klicovaSlova = "*", klicovaSlovaPocet = "*", polozkyVP = "*", polozkyVPPocet = "*", rozpisPlateb = "*", rozpisPlatebPocet = "*", krytiDokladu = "*", krytiDokladuPocet = "*", likvidaceDokladu = "*", likvidaceDokladuPocet = "*", poznamkyDokladu = "*", poznamkyDokladuPocet = "*", ePrilohyDokladu = "*", ePrilohyDokladuPocet = "*",}
	const enum DuplikovaniDokladuVyberDtoTypes { ixp = "string", agendoveCislo = "string", hlavickaDokladu = "boolean", popisDokladu = "boolean", variabilniSymbol = "boolean", rozsireniProfil = "boolean", rozsireniProfilPocet = "number", klicovaSlova = "boolean", klicovaSlovaPocet = "number", polozkyVP = "boolean", polozkyVPPocet = "number", rozpisPlateb = "boolean", rozpisPlatebPocet = "number", krytiDokladu = "boolean", krytiDokladuPocet = "number", likvidaceDokladu = "boolean", likvidaceDokladuPocet = "number", poznamkyDokladu = "boolean", poznamkyDokladuPocet = "number", ePrilohyDokladu = "boolean", ePrilohyDokladuPocet = "number",}
	const enum DuplikovaniDokladuVyberDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\DTO\GlobalsDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO parametrů a proměnných přes celou aplikaci*/
	interface GlobalsDto {
		/**EkoParams.Rok*/
		ekoParamsRok?: number|null;
		/**EkoParams.Rok knihy*/
		ekoParamsRokDen?: number|null;
		/**EkoParams.Ico - IČ*/
		ekoParamsIco?: string|null;
		/**EkoParams.Uus - účtárna*/
		ekoParamsUus?: string|null;
		/**EkoParams.Ucs - účetní středisko*/
		ekoParamsUcs?: string|null;
		/**EkoParams.PrizIissp - Příznak státní pokladny*/
		prizIissp?: number|null;
		/**EkoParams.DphPlatce - Typ plátce DPH*/
		DphPlatce?: number|null;
		/**ŘP Předání do modulu BUC k úhradě*/
		rad_buc?: number|null;
		/**ŘP Evidence dokladu*/
		rad_evi?: boolean|null;
		/**Typ pohledu na seznamu*/
		typPohledu?: number|null;
		/**Viditelnost rodného čísla*/
		gin_esu_rczobr?: boolean|null;
		/**Režim provozu*/
		bpl_rez_provoz?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimProvozu|null;
		/**Počet dní splatnosti - předplňování*/
		splatnost?: number|null;
		/**Registrace specifických symbolů*/
		bpl_reg_ss?: boolean|null;
		/**Povolení překročit disponibilní prostředky na účtě*/
		ucet_prek?: number|null;
		/**Režim účtování*/
		rez_uct?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimUctovani|null;
		/**Způsob definice agendového čísla*/
		def_acag?: Gordic.Bpl.Interface.GBplGlobalsBase.ZpusobDefiniceAc|null;
		/**Účtování plateb hotově*/
		hot_uct?: Gordic.Bpl.Interface.GBplGlobalsBase.UctovaniHotove|null;
		/**EKO Přednastavení změny kompetenta v okamžiku předání a přeevidence dokladu*/
		eko_rad_zmekom?: string|null;
		/**ŘP Režim dokladové finanční kontroly*/
		eko_rad_dfken?: number|null;
		/**GIN EPK - Podpora schvalovacího procesu*/
		gin_epk_schval?: number|null;
		/**BPL - Provádění dokladové finanční kontroly u vyúčtování bez závazku*/
		bpl_fik_vyuc?: number|null;
		/**Nabídka NS dle vazby na funkci*/
		gin_rad_fcens?: boolean|null;
		/**BPL - Provádět kontrolu krytí a likvidace na nks*/
		bpl_kont_nks?: boolean|null;
		/**Přednastavení datumu splatnosti pro úhrady*/
		bpl_dat_spl?: Gordic.Bpl.Interface.GBplGlobalsBase.DatumSplatnostiProUhrady|null;
		/**Vazba na SML*/
		vaz_sml?: Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSml|null;
		/**Režim vazby likvidace na položku SML*/
		vaz_sml_lik?: Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSmlLik|null;
		/**Režim ISPROFIN*/
		bpl_rezim_isp?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimIsp|null;
		/**BPL - Zahájení dokladové finanční kontroly*/
		bpl_rez_fik?: number|null;
		/**BPL - ŘP blokování změny údajů pro platbu při finanční kontrole*/
		bpl_rad_fik?: number|null;
		/**Režim práce nad knihami*/
		bpl_rezim_pnk?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimPraceNadKnihami|null;
		/**Režim akviziční vazby*/
		bpl_sml_rezim?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimSmlVazby|null;
		/**BPL - Způsob přednastavení popisu dokladu BPL z dokladu modulu SML*/
		bpl_sml_popis?: Gordic.Bpl.Interface.GBplGlobalsBase.PopisDokladuSml|null;
		/**BPL - Přednastavení datumu odúčtování likvidace*/
		bpl_dat_oduct?: Gordic.Bpl.Interface.GBplGlobalsBase.DatumOductovaniLikvidace|null;
		/**XXX - ŘP Schválení krytí*/
		rad_sch_kry?: boolean|null;
		/**KDF - ŘP pořízení konstantního symbolu*/
		rad_por_ks?: boolean|null;
		/**XXX - ŘP Pořízení krytí*/
		rad_por_kry?: boolean|null;
		/**Režim Kontroly likvidace*/
		bpl_rezim_lik?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimKontrolyLikvidace|null;
		/**XXX - ŘP Schválení likvidace*/
		rad_sch_lik?: boolean|null;
		/**XXX - ŘP Pořízení likvidace*/
		rad_por_lik?: boolean|null;
		/**XXX - ŘP Storno schválení krytí*/
		rad_sch_stk?: boolean|null;
		/**XXX - ŘP Storno schválení likvidace*/
		rad_sch_stl?: boolean|null;
		/**XXX - ŘP Povolení změny datumu splatnosti*/
		rad_zme_spl?: boolean|null;
		/**XXX - ŘP Povolení navázání a odvázání od položky SML*/
		rad_smlpol?: boolean|null;
		/**GIN ESU - zobrazovat stav insolvence (seznam a detail ESU)*/
		gin_esu_inzobr?: string|null;
		/**GIN – ŘP Insolvence – upozornění(dle vybraných stavů insolvence)*/
		gin_rad_isirvar?: string|null;
		/**XXX - Generování variabilního symbolu z agendového čísla*/
		gener_vs?: Gordic.Bpl.Interface.GBplGlobalsBase.GenerovaniVs|null;
		/**XXX - cizí měna*/
		cizi_mena?: boolean|null;
		/**GIN - Automatické generování identifikátoru*/
		gin_gen_ixp?: string|null;
		/**Příznak dvojího účtování*/
		DvojiUctovani?: boolean|null;
		/**BPL - Povolení rezervace příjmů před párováním platby*/
		bpl_rad_rezpri?: number|null;
		/**BPL - Předplňování Zprávy pro příjemce*/
		bpl_predpl_zpr?: number|null;
		/**KDF - Předvyplnění předkontace pomocí AI - 29.7.2025*/
		kdf_ai_predkon?: number|null;
		/**BPL - Provádět kontrolu na duplicitu VS*/
		bpl_kont_vs?: boolean|null;
		/**GIN - Zobrazení informací kontrolního dohledového systému (detail - historie, úvodní okno modulu) - DSG*/
		gin_kodosyzo?: number|null;
		/**Použití agendového nebo evidenčního čísla smlouvy na dokladu BPL*/
		bpl_zsml_ac?: Gordic.Bpl.Interface.GBplGlobalsBase.PouzitiAgendovehoEvidencnihoCislaSml|null;
		/**Příznak, zda existuje licenční certifikát pro Controling - RON Rozúčtování nákladů - 1572*/
		licenceControlling?: boolean|null;
		/**Příznak, zda existuje licenční certifikát pro DSG - 1100,330*/
		licenceDSG?: boolean|null;
		/**Licence*/
		licence?: string|null;
		/**Běžící agenda*/
		agenda?: string|null;
		/**Typ agendy*/
		typ_ag?: number|null;
		/**SessionInfo.IxsFun - přihlášená funkce*/
		ixs_fun?: string|null;
		/**SessionInfo.IxsSu - spisový uzel*/
		ixs_su?: string|null;
		/**EkoParams.IxpDen - aktuální kniha*/
		ixp_den?: string|null;
		/**Příznak 3. sazby DPH*/
		treti_sazba_DPH?: boolean|null;
		/**Příznak, zda jde o rozšířenou větu 2024*/
		RozsirenaVeta?: boolean|null;
		/**Příznak, zda je povolený DSG*/
		Je_DSG?: boolean|null;
		/**Příznak, zda je možné opravovat kontrolní hlášení*/
		KontrolniHlaseniOprava?: boolean|null;
	}
	const enum GlobalsDtoNames { ekoParamsRok = "ekoParamsRok", ekoParamsRokDen = "ekoParamsRokDen", ekoParamsIco = "ekoParamsIco", ekoParamsUus = "ekoParamsUus", ekoParamsUcs = "ekoParamsUcs", prizIissp = "prizIissp", DphPlatce = "DphPlatce", rad_buc = "rad_buc", rad_evi = "rad_evi", typPohledu = "typPohledu", gin_esu_rczobr = "gin_esu_rczobr", bpl_rez_provoz = "bpl_rez_provoz", splatnost = "splatnost", bpl_reg_ss = "bpl_reg_ss", ucet_prek = "ucet_prek", rez_uct = "rez_uct", def_acag = "def_acag", hot_uct = "hot_uct", eko_rad_zmekom = "eko_rad_zmekom", eko_rad_dfken = "eko_rad_dfken", gin_epk_schval = "gin_epk_schval", bpl_fik_vyuc = "bpl_fik_vyuc", gin_rad_fcens = "gin_rad_fcens", bpl_kont_nks = "bpl_kont_nks", bpl_dat_spl = "bpl_dat_spl", vaz_sml = "vaz_sml", vaz_sml_lik = "vaz_sml_lik", bpl_rezim_isp = "bpl_rezim_isp", bpl_rez_fik = "bpl_rez_fik", bpl_rad_fik = "bpl_rad_fik", bpl_rezim_pnk = "bpl_rezim_pnk", bpl_sml_rezim = "bpl_sml_rezim", bpl_sml_popis = "bpl_sml_popis", bpl_dat_oduct = "bpl_dat_oduct", rad_sch_kry = "rad_sch_kry", rad_por_ks = "rad_por_ks", rad_por_kry = "rad_por_kry", bpl_rezim_lik = "bpl_rezim_lik", rad_sch_lik = "rad_sch_lik", rad_por_lik = "rad_por_lik", rad_sch_stk = "rad_sch_stk", rad_sch_stl = "rad_sch_stl", rad_zme_spl = "rad_zme_spl", rad_smlpol = "rad_smlpol", gin_esu_inzobr = "gin_esu_inzobr", gin_rad_isirvar = "gin_rad_isirvar", gener_vs = "gener_vs", cizi_mena = "cizi_mena", gin_gen_ixp = "gin_gen_ixp", DvojiUctovani = "DvojiUctovani", bpl_rad_rezpri = "bpl_rad_rezpri", bpl_predpl_zpr = "bpl_predpl_zpr", kdf_ai_predkon = "kdf_ai_predkon", bpl_kont_vs = "bpl_kont_vs", gin_kodosyzo = "gin_kodosyzo", bpl_zsml_ac = "bpl_zsml_ac", licenceControlling = "licenceControlling", licenceDSG = "licenceDSG", licence = "licence", agenda = "agenda", typ_ag = "typ_ag", ixs_fun = "ixs_fun", ixs_su = "ixs_su", ixp_den = "ixp_den", treti_sazba_DPH = "treti_sazba_DPH", RozsirenaVeta = "RozsirenaVeta", Je_DSG = "Je_DSG", KontrolniHlaseniOprava = "KontrolniHlaseniOprava",}
	const enum GlobalsDtoFragments { ekoParamsRok = "*", ekoParamsRokDen = "*", ekoParamsIco = "*", ekoParamsUus = "*", ekoParamsUcs = "*", prizIissp = "*", DphPlatce = "*", rad_buc = "*", rad_evi = "*", typPohledu = "*", gin_esu_rczobr = "*", bpl_rez_provoz = "*", splatnost = "*", bpl_reg_ss = "*", ucet_prek = "*", rez_uct = "*", def_acag = "*", hot_uct = "*", eko_rad_zmekom = "*", eko_rad_dfken = "*", gin_epk_schval = "*", bpl_fik_vyuc = "*", gin_rad_fcens = "*", bpl_kont_nks = "*", bpl_dat_spl = "*", vaz_sml = "*", vaz_sml_lik = "*", bpl_rezim_isp = "*", bpl_rez_fik = "*", bpl_rad_fik = "*", bpl_rezim_pnk = "*", bpl_sml_rezim = "*", bpl_sml_popis = "*", bpl_dat_oduct = "*", rad_sch_kry = "*", rad_por_ks = "*", rad_por_kry = "*", bpl_rezim_lik = "*", rad_sch_lik = "*", rad_por_lik = "*", rad_sch_stk = "*", rad_sch_stl = "*", rad_zme_spl = "*", rad_smlpol = "*", gin_esu_inzobr = "*", gin_rad_isirvar = "*", gener_vs = "*", cizi_mena = "*", gin_gen_ixp = "*", DvojiUctovani = "*", bpl_rad_rezpri = "*", bpl_predpl_zpr = "*", kdf_ai_predkon = "*", bpl_kont_vs = "*", gin_kodosyzo = "*", bpl_zsml_ac = "*", licenceControlling = "*", licenceDSG = "*", licence = "*", agenda = "*", typ_ag = "*", ixs_fun = "*", ixs_su = "*", ixp_den = "*", treti_sazba_DPH = "*", RozsirenaVeta = "*", Je_DSG = "*", KontrolniHlaseniOprava = "*",}
	const enum GlobalsDtoTypes { ekoParamsRok = "number", ekoParamsRokDen = "number", ekoParamsIco = "string", ekoParamsUus = "string", ekoParamsUcs = "string", prizIissp = "number", DphPlatce = "number", rad_buc = "number", rad_evi = "boolean", typPohledu = "number", gin_esu_rczobr = "boolean", bpl_rez_provoz = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimProvozu", splatnost = "number", bpl_reg_ss = "boolean", ucet_prek = "number", rez_uct = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimUctovani", def_acag = "Gordic.Bpl.Interface.GBplGlobalsBase.ZpusobDefiniceAc", hot_uct = "Gordic.Bpl.Interface.GBplGlobalsBase.UctovaniHotove", eko_rad_zmekom = "string", eko_rad_dfken = "number", gin_epk_schval = "number", bpl_fik_vyuc = "number", gin_rad_fcens = "boolean", bpl_kont_nks = "boolean", bpl_dat_spl = "Gordic.Bpl.Interface.GBplGlobalsBase.DatumSplatnostiProUhrady", vaz_sml = "Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSml", vaz_sml_lik = "Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSmlLik", bpl_rezim_isp = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimIsp", bpl_rez_fik = "number", bpl_rad_fik = "number", bpl_rezim_pnk = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimPraceNadKnihami", bpl_sml_rezim = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimSmlVazby", bpl_sml_popis = "Gordic.Bpl.Interface.GBplGlobalsBase.PopisDokladuSml", bpl_dat_oduct = "Gordic.Bpl.Interface.GBplGlobalsBase.DatumOductovaniLikvidace", rad_sch_kry = "boolean", rad_por_ks = "boolean", rad_por_kry = "boolean", bpl_rezim_lik = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimKontrolyLikvidace", rad_sch_lik = "boolean", rad_por_lik = "boolean", rad_sch_stk = "boolean", rad_sch_stl = "boolean", rad_zme_spl = "boolean", rad_smlpol = "boolean", gin_esu_inzobr = "string", gin_rad_isirvar = "string", gener_vs = "Gordic.Bpl.Interface.GBplGlobalsBase.GenerovaniVs", cizi_mena = "boolean", gin_gen_ixp = "string", DvojiUctovani = "boolean", bpl_rad_rezpri = "number", bpl_predpl_zpr = "number", kdf_ai_predkon = "number", bpl_kont_vs = "boolean", gin_kodosyzo = "number", bpl_zsml_ac = "Gordic.Bpl.Interface.GBplGlobalsBase.PouzitiAgendovehoEvidencnihoCislaSml", licenceControlling = "boolean", licenceDSG = "boolean", licence = "string", agenda = "string", typ_ag = "number", ixs_fun = "string", ixs_su = "string", ixp_den = "string", treti_sazba_DPH = "boolean", RozsirenaVeta = "boolean", Je_DSG = "boolean", KontrolniHlaseniOprava = "boolean",}
	const enum GlobalsDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\DTO\PristupnostAkciKontaceDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Přístupnost akcí na rozpisu plateb, krytí a likvidaci*/
	interface PristupnostAkciKontaceDto {
		/**Nový (pořizovač) - Visible*/
		novyVisible?: boolean|null;
		/**Podání - Enabled*/
		novyEnabled?: boolean|null;
		/**Odstranit (pořizovač) - Visible*/
		odstranitVisible?: boolean|null;
		/**Odstranit - Enabled*/
		odstranitEnabled?: boolean|null;
		/**Úhrada - Visible*/
		uhradaVisible?: boolean|null;
		/**Úhrada - Enabled*/
		uhradaEnabled?: boolean|null;
		/**Suma rozpisů*/
		sumaRozpisu?: JsonDecimal|null;
	}
	const enum PristupnostAkciKontaceDtoNames { novyVisible = "novyVisible", novyEnabled = "novyEnabled", odstranitVisible = "odstranitVisible", odstranitEnabled = "odstranitEnabled", uhradaVisible = "uhradaVisible", uhradaEnabled = "uhradaEnabled", sumaRozpisu = "sumaRozpisu",}
	const enum PristupnostAkciKontaceDtoFragments { novyVisible = "*", novyEnabled = "*", odstranitVisible = "*", odstranitEnabled = "*", uhradaVisible = "*", uhradaEnabled = "*", sumaRozpisu = "*",}
	const enum PristupnostAkciKontaceDtoTypes { novyVisible = "boolean", novyEnabled = "boolean", odstranitVisible = "boolean", odstranitEnabled = "boolean", uhradaVisible = "boolean", uhradaEnabled = "boolean", sumaRozpisu = "JsonDecimal",}
	const enum PristupnostAkciKontaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\DTO\PristupnostAkciPredpisUctovaniDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Přístupnost akcí na detailu kontace*/
	interface PristupnostAkciPredpisUctovaniDto {
		/**Detail kontace - Visible*/
		detailKontaceVisible?: boolean|null;
		/**Detail kontace - Enabled*/
		detailKontaceEnabled?: boolean|null;
		/**Zaúčtovat - Visible*/
		zauctovatVisible?: boolean|null;
		/**Zaúčtovat - Enabled*/
		zauctovatEnabled?: boolean|null;
		/**Odúčtovat likvidaci - Visible*/
		oductovatVisible?: boolean|null;
		/**Odúčtovat likvidaci - Enabled*/
		oductovatEnabled?: boolean|null;
		/**Kontrolní hlášení - Visible*/
		kontrolniHlaseniVisible?: boolean|null;
		/**Kontrolní hlášení - Enabled*/
		kontrolniHlaseniEnabled?: boolean|null;
		/**Změna subřady - Visible*/
		subradyVisible?: boolean|null;
		/**Změna subřady - Enabled*/
		subradyEnabled?: boolean|null;
	}
	const enum PristupnostAkciPredpisUctovaniDtoNames { detailKontaceVisible = "detailKontaceVisible", detailKontaceEnabled = "detailKontaceEnabled", zauctovatVisible = "zauctovatVisible", zauctovatEnabled = "zauctovatEnabled", oductovatVisible = "oductovatVisible", oductovatEnabled = "oductovatEnabled", kontrolniHlaseniVisible = "kontrolniHlaseniVisible", kontrolniHlaseniEnabled = "kontrolniHlaseniEnabled", subradyVisible = "subradyVisible", subradyEnabled = "subradyEnabled",}
	const enum PristupnostAkciPredpisUctovaniDtoFragments { detailKontaceVisible = "*", detailKontaceEnabled = "*", zauctovatVisible = "*", zauctovatEnabled = "*", oductovatVisible = "*", oductovatEnabled = "*", kontrolniHlaseniVisible = "*", kontrolniHlaseniEnabled = "*", subradyVisible = "*", subradyEnabled = "*",}
	const enum PristupnostAkciPredpisUctovaniDtoTypes { detailKontaceVisible = "boolean", detailKontaceEnabled = "boolean", zauctovatVisible = "boolean", zauctovatEnabled = "boolean", oductovatVisible = "boolean", oductovatEnabled = "boolean", kontrolniHlaseniVisible = "boolean", kontrolniHlaseniEnabled = "boolean", subradyVisible = "boolean", subradyEnabled = "boolean",}
	const enum PristupnostAkciPredpisUctovaniDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\DTO\PristupnostAkciSeznamDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Přístupnost akcí na seznamu BPL dokladů*/
	interface PristupnostAkciSeznamDto {
		/**Podání - Visible*/
		podaniVisible?: boolean|null;
		/**Podání - Enabled*/
		podaniEnabled?: boolean|null;
		/**Podání dle vzoru - Visible*/
		duplikovaniVisible?: boolean|null;
		/**Podání dle vzoru - Enabled*/
		duplikovaniEnabled?: boolean|null;
		/**Detail - Visible*/
		detailVisible?: boolean|null;
		/**Detail - Enabled*/
		detailEnabled?: boolean|null;
		/**Předání - Visible*/
		predaniVisible?: boolean|null;
		/**Předání - Enabled*/
		predaniEnabled?: boolean|null;
		/**Přidělení - Visible*/
		prideleniVisible?: boolean|null;
		/**Přidělení - Enabled*/
		prideleniEnabled?: boolean|null;
		/**Přeevidence - Visible*/
		preevidenceVisible?: boolean|null;
		/**Přeevidence - Enabled*/
		preevidenceEnabled?: boolean|null;
		/**Převzetí - Visible*/
		prevzetiVisible?: boolean|null;
		/**Převzetí - Enabled*/
		prevzetiEnabled?: boolean|null;
		/**Storno - Visible*/
		stornoVisible?: boolean|null;
		/**Storno - Enabled*/
		stornoEnabled?: boolean|null;
		/**Zaúčtování dokladu - Visible*/
		zauctovatVisible?: boolean|null;
		/**Zaúčtování dokladu - Enabled*/
		zauctovatEnabled?: boolean|null;
		/**Uzavření dokladu - Visible*/
		uzavreniDokladuVisible?: boolean|null;
		/**Uzavření dokladu - Enabled*/
		uzavreniDokladuEnabled?: boolean|null;
		/**Změna stavu zaúčtování - Visible*/
		zmenaStavuZauctovaniVisible?: boolean|null;
		/**Změna stavu zaúčtování - Enabled*/
		zmenaStavuZauctovaniEnabled?: boolean|null;
		/**Úhrada - Visible*/
		uhradaVisible?: boolean|null;
		/**Úhrada - Enabled*/
		uhradaEnabled?: boolean|null;
	}
	const enum PristupnostAkciSeznamDtoNames { podaniVisible = "podaniVisible", podaniEnabled = "podaniEnabled", duplikovaniVisible = "duplikovaniVisible", duplikovaniEnabled = "duplikovaniEnabled", detailVisible = "detailVisible", detailEnabled = "detailEnabled", predaniVisible = "predaniVisible", predaniEnabled = "predaniEnabled", prideleniVisible = "prideleniVisible", prideleniEnabled = "prideleniEnabled", preevidenceVisible = "preevidenceVisible", preevidenceEnabled = "preevidenceEnabled", prevzetiVisible = "prevzetiVisible", prevzetiEnabled = "prevzetiEnabled", stornoVisible = "stornoVisible", stornoEnabled = "stornoEnabled", zauctovatVisible = "zauctovatVisible", zauctovatEnabled = "zauctovatEnabled", uzavreniDokladuVisible = "uzavreniDokladuVisible", uzavreniDokladuEnabled = "uzavreniDokladuEnabled", zmenaStavuZauctovaniVisible = "zmenaStavuZauctovaniVisible", zmenaStavuZauctovaniEnabled = "zmenaStavuZauctovaniEnabled", uhradaVisible = "uhradaVisible", uhradaEnabled = "uhradaEnabled",}
	const enum PristupnostAkciSeznamDtoFragments { podaniVisible = "*", podaniEnabled = "*", duplikovaniVisible = "*", duplikovaniEnabled = "*", detailVisible = "*", detailEnabled = "*", predaniVisible = "*", predaniEnabled = "*", prideleniVisible = "*", prideleniEnabled = "*", preevidenceVisible = "*", preevidenceEnabled = "*", prevzetiVisible = "*", prevzetiEnabled = "*", stornoVisible = "*", stornoEnabled = "*", zauctovatVisible = "*", zauctovatEnabled = "*", uzavreniDokladuVisible = "*", uzavreniDokladuEnabled = "*", zmenaStavuZauctovaniVisible = "*", zmenaStavuZauctovaniEnabled = "*", uhradaVisible = "*", uhradaEnabled = "*",}
	const enum PristupnostAkciSeznamDtoTypes { podaniVisible = "boolean", podaniEnabled = "boolean", duplikovaniVisible = "boolean", duplikovaniEnabled = "boolean", detailVisible = "boolean", detailEnabled = "boolean", predaniVisible = "boolean", predaniEnabled = "boolean", prideleniVisible = "boolean", prideleniEnabled = "boolean", preevidenceVisible = "boolean", preevidenceEnabled = "boolean", prevzetiVisible = "boolean", prevzetiEnabled = "boolean", stornoVisible = "boolean", stornoEnabled = "boolean", zauctovatVisible = "boolean", zauctovatEnabled = "boolean", uzavreniDokladuVisible = "boolean", uzavreniDokladuEnabled = "boolean", zmenaStavuZauctovaniVisible = "boolean", zmenaStavuZauctovaniEnabled = "boolean", uhradaVisible = "boolean", uhradaEnabled = "boolean",}
	const enum PristupnostAkciSeznamDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\TypoveDatasety\Gordic.Bpl.Interface.DetailDokladuKdfDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:DetailDokladuKdf*/
	interface DetailDokladuKdfDto {
		/**DBCOLUMN:DetailDokladuKdf.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.lic*/
		lic?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ixs_esu_pla*/
		ixs_esu_pla?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ixs_esu_pla_old*/
		ixs_esu_pla_old?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ico*/
		ico?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.nks*/
		nks?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.popis*/
		popis?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.vs*/
		vs?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ks*/
		ks?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ss*/
		ss?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.zp*/
		zp?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ac*/
		ac?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ps_sml_stav*/
		ps_sml_stav?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ps_sml_ac*/
		ps_sml_ac?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ps_sml*/
		ps_sml?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_zau*/
		dat_zau?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_uhr*/
		dat_uhr?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_kry*/
		dat_kry?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_lik*/
		dat_lik?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.mena*/
		mena?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_pol*/
		c_pol?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_pol_dan*/
		c_pol_dan?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_kuhr_mena*/
		c_kuhr_mena?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_kryti*/
		c_kryti?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_zust_mena*/
		c_zust_mena?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_zust*/
		c_zust?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_kzauc*/
		c_kzauc?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_z0*/
		c_z0?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_d0*/
		c_d0?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_z1*/
		c_z1?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_d1*/
		c_d1?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_z2*/
		c_z2?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_d2*/
		c_d2?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_z3*/
		c_z3?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_d3*/
		c_d3?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_upr*/
		c_upr?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.s_por*/
		s_por?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_uhr*/
		s_uhr?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_kry*/
		s_kry?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_lik*/
		s_lik?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_tis*/
		s_tis?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.znam*/
		znam?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.c_vaz*/
		c_vaz?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_pdp*/
		priz_pdp?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_ozp*/
		priz_ozp?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_pomer*/
		priz_pomer?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_dor*/
		c_dor?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.kurz_akt*/
		kurz_akt?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.typ_pen*/
		typ_pen?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.stav_vym*/
		stav_vym?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_za_z*/
		c_za_z?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_za_d*/
		c_za_d?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.typ_dor*/
		typ_dor?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_vaz_mena*/
		c_vaz_mena?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_vyuc*/
		c_vyuc?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_zx*/
		c_zx?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_por*/
		priz_por?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_opp*/
		priz_opp?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.typ_upr*/
		typ_upr?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.suma_kry*/
		suma_kry?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.suma_kry_sch_akt_rok*/
		suma_kry_sch_akt_rok?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.suma_kry_sch*/
		suma_kry_sch?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.suma_lik*/
		suma_lik?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.suma_lik_sch*/
		suma_lik_sch?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.suma_lik_zal_sch*/
		suma_lik_zal_sch?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.suma_lik_zal*/
		suma_lik_zal?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.s_lik_zal*/
		s_lik_zal?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ixp_vaz*/
		ixp_vaz?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.typ_vaz*/
		typ_vaz?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_zaokr*/
		c_zaokr?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_dok*/
		c_dok?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.umisteni*/
		umisteni?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.st_utaj_id*/
		st_utaj_id?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ixs_esu_old*/
		ixs_esu_old?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.c_z1d*/
		c_z1d?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_z2d*/
		c_z2d?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_z3d*/
		c_z3d?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_d1d*/
		c_d1d?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_d2d*/
		c_d2d?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_d3d*/
		c_d3d?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.fik*/
		fik?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.fikVRoce*/
		fikVRoce?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.uk*/
		uk?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ukVRoce*/
		ukVRoce?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_celk_mena*/
		c_celk_mena?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.pocet_buvl*/
		pocet_buvl?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_celk_s_dodanenim*/
		c_celk_s_dodanenim?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.dic*/
		dic?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.zak_upr*/
		zak_upr?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.typ_spo*/
		typ_spo?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.proc_spo*/
		proc_spo?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_spo*/
		priz_spo?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_spo*/
		c_spo?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_uroc*/
		priz_uroc?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.stav_opp*/
		stav_opp?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.prepoctene*/
		prepoctene?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.c_zap*/
		c_zap?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_zap_mena*/
		c_zap_mena?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.c_kr*/
		c_kr?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.s_schval*/
		s_schval?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_dor*/
		s_dor?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.rok_dokladu*/
		rok_dokladu?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.dat_dor*/
		dat_dor?: JsonDate|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_splatky*/
		priz_splatky?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.fikAktivita*/
		fikAktivita?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ktg_typ_zkr*/
		ktg_typ_zkr?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_vazba*/
		priz_vazba?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.ukAktivita*/
		ukAktivita?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.dvoji_uctovani*/
		dvoji_uctovani?: boolean|null;
		/**DBCOLUMN:DetailDokladuKdf.stav_pis*/
		stav_pis?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.s_prij*/
		s_prij?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.uzo*/
		uzo?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.ixp_den_txt*/
		ixp_den_txt?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.popis_dlouhy*/
		popis_dlouhy?: string|null;
		/**DBCOLUMN:DetailDokladuKdf.poznamka*/
		poznamka?: string|null;
	}
	const enum DetailDokladuKdfDtoNames { ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ixs_esu_pla = "ixs_esu_pla", ixs_esu_pla_old = "ixs_esu_pla_old", esu_txt = "esu_txt", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", zp = "zp", ixp_den = "ixp_den", ac = "ac", ps_sml_stav = "ps_sml_stav", ps_sml_ac = "ps_sml_ac", ps_sml = "ps_sml", dat_vyst = "dat_vyst", dat_spl = "dat_spl", dat_zdan = "dat_zdan", dat_zau = "dat_zau", dat_uhr = "dat_uhr", dat_kry = "dat_kry", dat_lik = "dat_lik", mena = "mena", mena_zkr = "mena_zkr", c = "c", c_mena = "c_mena", c_pol = "c_pol", c_pol_dan = "c_pol_dan", c_celk = "c_celk", c_kuhr = "c_kuhr", c_kuhr_mena = "c_kuhr_mena", c_kryti = "c_kryti", c_zust_mena = "c_zust_mena", c_zust = "c_zust", c_kzauc = "c_kzauc", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_z3 = "c_z3", c_d3 = "c_d3", c_upr = "c_upr", s_por = "s_por", s_uhr = "s_uhr", s_kry = "s_kry", s_lik = "s_lik", s_zau = "s_zau", s_sto = "s_sto", s_tis = "s_tis", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", znam = "znam", ixs_fun_akt = "ixs_fun_akt", c_vaz = "c_vaz", rok_dph = "rok_dph", mesic_dph = "mesic_dph", priz_dph = "priz_dph", priz_pdp = "priz_pdp", priz_ozp = "priz_ozp", priz_pomer = "priz_pomer", c_dor = "c_dor", kurz = "kurz", kurz_akt = "kurz_akt", dat_uup = "dat_uup", priz_view = "priz_view", ac_ag = "ac_ag", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", stav_vym = "stav_vym", c_za_z = "c_za_z", c_za_d = "c_za_d", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", typ_dor = "typ_dor", c_vaz_mena = "c_vaz_mena", c_vyuc = "c_vyuc", c_zx = "c_zx", priz_por = "priz_por", priz_opp = "priz_opp", typ_upr = "typ_upr", suma_kry = "suma_kry", suma_kry_sch_akt_rok = "suma_kry_sch_akt_rok", suma_kry_sch = "suma_kry_sch", suma_lik = "suma_lik", suma_lik_sch = "suma_lik_sch", suma_lik_zal_sch = "suma_lik_zal_sch", suma_lik_zal = "suma_lik_zal", s_lik_zal = "s_lik_zal", ixp_vaz = "ixp_vaz", typ_vaz = "typ_vaz", c_zaokr = "c_zaokr", c_dok = "c_dok", umisteni = "umisteni", st_utaj_id = "st_utaj_id", ixs_esu_old = "ixs_esu_old", c_z1d = "c_z1d", c_z2d = "c_z2d", c_z3d = "c_z3d", c_d1d = "c_d1d", c_d2d = "c_d2d", c_d3d = "c_d3d", fik = "fik", fikVRoce = "fikVRoce", uk = "uk", ukVRoce = "ukVRoce", c_celk_mena = "c_celk_mena", pocet_buvl = "pocet_buvl", c_celk_s_dodanenim = "c_celk_s_dodanenim", dic = "dic", zak_upr = "zak_upr", typ_spo = "typ_spo", proc_spo = "proc_spo", priz_spo = "priz_spo", c_spo = "c_spo", priz_uroc = "priz_uroc", stav_opp = "stav_opp", prepoctene = "prepoctene", c_zap = "c_zap", c_zap_mena = "c_zap_mena", c_kr = "c_kr", s_schval = "s_schval", s_dor = "s_dor", rok_dokladu = "rok_dokladu", dat_dor = "dat_dor", priz_splatky = "priz_splatky", fikAktivita = "fikAktivita", ktg_typ_zkr = "ktg_typ_zkr", priz_vazba = "priz_vazba", ukAktivita = "ukAktivita", ktg_typ_txt = "ktg_typ_txt", dvoji_uctovani = "dvoji_uctovani", stav_pis = "stav_pis", typ_ag = "typ_ag", s_prij = "s_prij", uzo = "uzo", ixp_den_txt = "ixp_den_txt", popis_dlouhy = "popis_dlouhy", poznamka = "poznamka",}
	const enum DetailDokladuKdfDtoFragments { ixp = "*", lic = "*", ixs_esu = "*", ixs_esu_pla = "*", ixs_esu_pla_old = "*", esu_txt = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", zp = "*", ixp_den = "*", ac = "*", ps_sml_stav = "*", ps_sml_ac = "*", ps_sml = "*", dat_vyst = "*", dat_spl = "*", dat_zdan = "*", dat_zau = "*", dat_uhr = "*", dat_kry = "*", dat_lik = "*", mena = "*", mena_zkr = "*", c = "*", c_mena = "*", c_pol = "*", c_pol_dan = "*", c_celk = "*", c_kuhr = "*", c_kuhr_mena = "*", c_kryti = "*", c_zust_mena = "*", c_zust = "*", c_kzauc = "*", c_z0 = "*", c_d0 = "*", c_z1 = "*", c_d1 = "*", c_z2 = "*", c_d2 = "*", c_z3 = "*", c_d3 = "*", c_upr = "*", s_por = "*", s_uhr = "*", s_kry = "*", s_lik = "*", s_zau = "*", s_sto = "*", s_tis = "*", ktg_typ = "*", ixs_typ = "*", eko_akt = "*", dat_evid = "*", dat_zmena = "*", zmenu_prov = "*", znam = "*", ixs_fun_akt = "*", c_vaz = "*", rok_dph = "*", mesic_dph = "*", priz_dph = "*", priz_pdp = "*", priz_ozp = "*", priz_pomer = "*", c_dor = "*", kurz = "*", kurz_akt = "*", dat_uup = "*", priz_view = "*", ac_ag = "*", c_sazba_pen = "*", proc_sazba_pen = "*", typ_pen = "*", stav_vym = "*", c_za_z = "*", c_za_d = "*", cis_real = "*", ixs_fun_vyriz = "*", typ_dor = "*", c_vaz_mena = "*", c_vyuc = "*", c_zx = "*", priz_por = "*", priz_opp = "*", typ_upr = "*", suma_kry = "*", suma_kry_sch_akt_rok = "*", suma_kry_sch = "*", suma_lik = "*", suma_lik_sch = "*", suma_lik_zal_sch = "*", suma_lik_zal = "*", s_lik_zal = "*", ixp_vaz = "*", typ_vaz = "*", c_zaokr = "*", c_dok = "*", umisteni = "*", st_utaj_id = "*", ixs_esu_old = "*", c_z1d = "*", c_z2d = "*", c_z3d = "*", c_d1d = "*", c_d2d = "*", c_d3d = "*", fik = "*", fikVRoce = "*", uk = "*", ukVRoce = "*", c_celk_mena = "*", pocet_buvl = "*", c_celk_s_dodanenim = "*", dic = "*", zak_upr = "*", typ_spo = "*", proc_spo = "*", priz_spo = "*", c_spo = "*", priz_uroc = "*", stav_opp = "*", prepoctene = "*", c_zap = "*", c_zap_mena = "*", c_kr = "*", s_schval = "*", s_dor = "*", rok_dokladu = "*", dat_dor = "*", priz_splatky = "*", fikAktivita = "*", ktg_typ_zkr = "*", priz_vazba = "*", ukAktivita = "*", ktg_typ_txt = "*", dvoji_uctovani = "*", stav_pis = "*", typ_ag = "*", s_prij = "*", uzo = "*", ixp_den_txt = "*", popis_dlouhy = "*", poznamka = "*",}
	const enum DetailDokladuKdfDtoTypes { ixp = "string", lic = "string", ixs_esu = "string", ixs_esu_pla = "string", ixs_esu_pla_old = "string", esu_txt = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", zp = "number", ixp_den = "string", ac = "string", ps_sml_stav = "number", ps_sml_ac = "string", ps_sml = "string", dat_vyst = "JsonDate", dat_spl = "JsonDate", dat_zdan = "JsonDate", dat_zau = "JsonDate", dat_uhr = "JsonDate", dat_kry = "JsonDate", dat_lik = "JsonDate", mena = "number", mena_zkr = "string", c = "JsonDecimal", c_mena = "JsonDecimal", c_pol = "JsonDecimal", c_pol_dan = "JsonDecimal", c_celk = "JsonDecimal", c_kuhr = "JsonDecimal", c_kuhr_mena = "JsonDecimal", c_kryti = "JsonDecimal", c_zust_mena = "JsonDecimal", c_zust = "JsonDecimal", c_kzauc = "JsonDecimal", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_upr = "JsonDecimal", s_por = "number", s_uhr = "number", s_kry = "number", s_lik = "number", s_zau = "number", s_sto = "number", s_tis = "number", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", znam = "number", ixs_fun_akt = "string", c_vaz = "JsonDecimal", rok_dph = "number", mesic_dph = "number", priz_dph = "number", priz_pdp = "number", priz_ozp = "number", priz_pomer = "number", c_dor = "JsonDecimal", kurz = "JsonDecimal", kurz_akt = "JsonDecimal", dat_uup = "JsonDate", priz_view = "number", ac_ag = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", stav_vym = "number", c_za_z = "JsonDecimal", c_za_d = "JsonDecimal", cis_real = "string", ixs_fun_vyriz = "string", typ_dor = "number", c_vaz_mena = "JsonDecimal", c_vyuc = "JsonDecimal", c_zx = "JsonDecimal", priz_por = "number", priz_opp = "number", typ_upr = "string", suma_kry = "JsonDecimal", suma_kry_sch_akt_rok = "JsonDecimal", suma_kry_sch = "JsonDecimal", suma_lik = "JsonDecimal", suma_lik_sch = "JsonDecimal", suma_lik_zal_sch = "JsonDecimal", suma_lik_zal = "JsonDecimal", s_lik_zal = "number", ixp_vaz = "string", typ_vaz = "number", c_zaokr = "JsonDecimal", c_dok = "JsonDecimal", umisteni = "string", st_utaj_id = "number", ixs_esu_old = "string", c_z1d = "JsonDecimal", c_z2d = "JsonDecimal", c_z3d = "JsonDecimal", c_d1d = "JsonDecimal", c_d2d = "JsonDecimal", c_d3d = "JsonDecimal", fik = "number", fikVRoce = "number", uk = "number", ukVRoce = "number", c_celk_mena = "JsonDecimal", pocet_buvl = "number", c_celk_s_dodanenim = "JsonDecimal", dic = "string", zak_upr = "number", typ_spo = "number", proc_spo = "JsonDecimal", priz_spo = "number", c_spo = "JsonDecimal", priz_uroc = "number", stav_opp = "JsonDecimal", prepoctene = "number", c_zap = "JsonDecimal", c_zap_mena = "JsonDecimal", c_kr = "JsonDecimal", s_schval = "number", s_dor = "number", rok_dokladu = "number", dat_dor = "JsonDate", priz_splatky = "number", fikAktivita = "string", ktg_typ_zkr = "string", priz_vazba = "number", ukAktivita = "string", ktg_typ_txt = "string", dvoji_uctovani = "boolean", stav_pis = "number", typ_ag = "number", s_prij = "number", uzo = "string", ixp_den_txt = "string", popis_dlouhy = "string", poznamka = "string",}
	const enum DetailDokladuKdfDtoTypeLengths { ixp = 12, lic = 4, ixs_esu = 12, ixs_esu_pla = 12, ixs_esu_pla_old = 12, esu_txt = 254, ico_esu = 14, ico = 14, ucs = 10, nks = 12, ac_esu = 60, popis = 254, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, ixp_den = 12, ac = 20, ps_sml_ac = 30, ps_sml = 12, mena_zkr = 16, ixs_typ = 12, zmenu_prov = 12, ixs_fun_akt = 12, ac_ag = 20, cis_real = 6, ixs_fun_vyriz = 12, typ_upr = 15, ixp_vaz = 12, umisteni = 20, ixs_esu_old = 12, dic = 15, ktg_typ_zkr = 3, uzo = 1, ixp_den_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamDokladuKdfDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamDokladuKdf*/
	interface SeznamDokladuKdfDto {
		/**DBCOLUMN:SeznamDokladuKdf.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.vs*/
		vs?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ks*/
		ks?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ss*/
		ss?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.BUCI*/
		BUCI?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.BUVL*/
		BUVL?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.zp*/
		zp?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ac*/
		ac?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.pacac*/
		pacac?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ps_sml*/
		ps_sml?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_zau*/
		dat_zau?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_uhr*/
		dat_uhr?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.mena*/
		mena?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_celk_mena*/
		c_celk_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_czk*/
		c_czk?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_vaz*/
		c_vaz?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_vaz_mena*/
		c_vaz_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_kuhr_mena*/
		c_kuhr_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_zust*/
		c_zust?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_zust_mena*/
		c_zust_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_kzauc*/
		c_kzauc?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_hradit*/
		c_hradit?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_dor*/
		c_dor?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_dph*/
		c_dph?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_dodaneni*/
		c_dodaneni?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_zaklad*/
		c_zaklad?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_pol_dan*/
		c_pol_dan?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.c_sankce*/
		c_sankce?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.priz_pdp*/
		priz_pdp?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.priz_ozp*/
		priz_ozp?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_por*/
		s_por?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_uhr*/
		s_uhr?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_kry*/
		s_kry?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_lik*/
		s_lik?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_zau*/
		s_zau?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_tis*/
		s_tis?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ktg_typ_zkr*/
		ktg_typ_zkr?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixs_typ*/
		ixs_typ?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_evid*/
		dat_evid?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.nazev_zmenu_prov*/
		nazev_zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.znam*/
		znam?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.priz_view*/
		priz_view?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixp_den_txt*/
		ixp_den_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.rc*/
		rc?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_sgn*/
		s_sgn?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.priz_spis*/
		priz_spis?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.stav_dist*/
		stav_dist?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.preevid*/
		preevid?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.poznamky*/
		poznamky?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.fik*/
		fik?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.fikVRoce*/
		fikVRoce?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.uk*/
		uk?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ukVRoce*/
		ukVRoce?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_schval*/
		s_schval?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.epri*/
		epri?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.dic*/
		dic?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.dat_uup*/
		dat_uup?: JsonDate|null;
		/**DBCOLUMN:SeznamDokladuKdf.suma_kry*/
		suma_kry?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.suma_kry_sch*/
		suma_kry_sch?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.suma_kry_sch_akt_rok*/
		suma_kry_sch_akt_rok?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.suma_lik*/
		suma_lik?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.suma_lik_sch*/
		suma_lik_sch?: JsonDecimal|null;
		/**DBCOLUMN:SeznamDokladuKdf.rok_dokladu*/
		rok_dokladu?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.priz_splatky*/
		priz_splatky?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.cis_real*/
		cis_real?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ac_ze_sml*/
		ac_ze_sml?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.cnt*/
		cnt?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.typ_esu*/
		typ_esu?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.stav*/
		stav?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.stav_txt*/
		stav_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.kl_slova*/
		kl_slova?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_prij*/
		s_prij?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.stav_pis*/
		stav_pis?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.puvod*/
		puvod?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.poc_priloh*/
		poc_priloh?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.poc_priloh_ele*/
		poc_priloh_ele?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixs_fun_txt*/
		ixs_fun_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixs_fun_vyriz_txt*/
		ixs_fun_vyriz_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.cis_real_txt*/
		cis_real_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_schval_obecny*/
		s_schval_obecny?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_schval_obecny_zkr*/
		s_schval_obecny_zkr?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.s_schval_obecny_txt*/
		s_schval_obecny_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.sml_kry*/
		sml_kry?: number|null;
		/**DBCOLUMN:SeznamDokladuKdf.uzo*/
		uzo?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.ixp_spis_prir*/
		ixp_spis_prir?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.zp_txt*/
		zp_txt?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:SeznamDokladuKdf.spis_znak*/
		spis_znak?: string|null;
	}
	const enum SeznamDokladuKdfDtoNames { ixp = "ixp", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", BUCI = "BUCI", BUVL = "BUVL", zp = "zp", ixp_den = "ixp_den", ac = "ac", pacac = "pacac", ps_sml = "ps_sml", dat_spl = "dat_spl", dat_zdan = "dat_zdan", dat_zau = "dat_zau", dat_uhr = "dat_uhr", mena = "mena", mena_zkr = "mena_zkr", c_mena = "c_mena", c_celk = "c_celk", c_celk_mena = "c_celk_mena", c_czk = "c_czk", c_vaz = "c_vaz", c_vaz_mena = "c_vaz_mena", c_kuhr = "c_kuhr", c_kuhr_mena = "c_kuhr_mena", c_zust = "c_zust", c_zust_mena = "c_zust_mena", c_kzauc = "c_kzauc", c_hradit = "c_hradit", c_dor = "c_dor", c_dph = "c_dph", c_dodaneni = "c_dodaneni", c_zaklad = "c_zaklad", c_pol_dan = "c_pol_dan", c_sankce = "c_sankce", priz_pdp = "priz_pdp", priz_dph = "priz_dph", priz_ozp = "priz_ozp", s_por = "s_por", s_uhr = "s_uhr", s_kry = "s_kry", s_lik = "s_lik", s_zau = "s_zau", s_sto = "s_sto", s_tis = "s_tis", ktg_typ = "ktg_typ", ktg_typ_zkr = "ktg_typ_zkr", ktg_typ_txt = "ktg_typ_txt", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", nazev_zmenu_prov = "nazev_zmenu_prov", znam = "znam", ixs_fun = "ixs_fun", priz_view = "priz_view", ac_ag = "ac_ag", ixp_den_txt = "ixp_den_txt", rc = "rc", esu_txt = "esu_txt", nazev = "nazev", cs_nazev = "cs_nazev", s_ele = "s_ele", s_sgn = "s_sgn", s_fyz = "s_fyz", priz_spis = "priz_spis", stav_dist = "stav_dist", ixb = "ixb", preevid = "preevid", poznamky = "poznamky", fik = "fik", fikVRoce = "fikVRoce", uk = "uk", ukVRoce = "ukVRoce", s_schval = "s_schval", typ_ag = "typ_ag", epri = "epri", dat_vyst = "dat_vyst", dic = "dic", dat_uup = "dat_uup", suma_kry = "suma_kry", suma_kry_sch = "suma_kry_sch", suma_kry_sch_akt_rok = "suma_kry_sch_akt_rok", suma_lik = "suma_lik", suma_lik_sch = "suma_lik_sch", rok_dokladu = "rok_dokladu", priz_splatky = "priz_splatky", ixs_fun_vyriz = "ixs_fun_vyriz", cis_real = "cis_real", ac_ze_sml = "ac_ze_sml", cnt = "cnt", typ_esu = "typ_esu", stav = "stav", stav_txt = "stav_txt", kl_slova = "kl_slova", s_prij = "s_prij", stav_pis = "stav_pis", puvod = "puvod", poc_priloh = "poc_priloh", poc_priloh_ele = "poc_priloh_ele", mesic_dph = "mesic_dph", rok_dph = "rok_dph", ixs_fun_txt = "ixs_fun_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", cis_real_txt = "cis_real_txt", s_schval_obecny = "s_schval_obecny", s_schval_obecny_zkr = "s_schval_obecny_zkr", s_schval_obecny_txt = "s_schval_obecny_txt", sml_kry = "sml_kry", uzo = "uzo", ixp_spis_prir = "ixp_spis_prir", zp_txt = "zp_txt", spis_pl = "spis_pl", spis_znak = "spis_znak",}
	const enum SeznamDokladuKdfDtoFragments { ixp = "*", ixs_esu = "*", ico_esu = "*", ico = "*", ucs = "*", nks = "*", ac_esu = "*", popis = "*", vs = "*", ks = "*", ss = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", BUCI = "*", BUVL = "*", zp = "*", ixp_den = "*", ac = "*", pacac = "*", ps_sml = "*", dat_spl = "*", dat_zdan = "*", dat_zau = "*", dat_uhr = "*", mena = "*", mena_zkr = "*", c_mena = "*", c_celk = "*", c_celk_mena = "*", c_czk = "*", c_vaz = "*", c_vaz_mena = "*", c_kuhr = "*", c_kuhr_mena = "*", c_zust = "*", c_zust_mena = "*", c_kzauc = "*", c_hradit = "*", c_dor = "*", c_dph = "*", c_dodaneni = "*", c_zaklad = "*", c_pol_dan = "*", c_sankce = "*", priz_pdp = "*", priz_dph = "*", priz_ozp = "*", s_por = "*", s_uhr = "*", s_kry = "*", s_lik = "*", s_zau = "*", s_sto = "*", s_tis = "*", ktg_typ = "*", ktg_typ_zkr = "*", ktg_typ_txt = "*", ixs_typ = "*", eko_akt = "*", dat_evid = "*", dat_zmena = "*", zmenu_prov = "*", nazev_zmenu_prov = "*", znam = "*", ixs_fun = "*", priz_view = "*", ac_ag = "*", ixp_den_txt = "*", rc = "*", esu_txt = "*", nazev = "*", cs_nazev = "*", s_ele = "*", s_sgn = "*", s_fyz = "*", priz_spis = "*", stav_dist = "*", ixb = "*", preevid = "*", poznamky = "*", fik = "*", fikVRoce = "*", uk = "*", ukVRoce = "*", s_schval = "*", typ_ag = "*", epri = "*", dat_vyst = "*", dic = "*", dat_uup = "*", suma_kry = "*", suma_kry_sch = "*", suma_kry_sch_akt_rok = "*", suma_lik = "*", suma_lik_sch = "*", rok_dokladu = "*", priz_splatky = "*", ixs_fun_vyriz = "*", cis_real = "*", ac_ze_sml = "*", cnt = "*", typ_esu = "*", stav = "*", stav_txt = "*", kl_slova = "*", s_prij = "*", stav_pis = "*", puvod = "*", poc_priloh = "*", poc_priloh_ele = "*", mesic_dph = "*", rok_dph = "*", ixs_fun_txt = "*", ixs_fun_vyriz_txt = "*", cis_real_txt = "*", s_schval_obecny = "*", s_schval_obecny_zkr = "*", s_schval_obecny_txt = "*", sml_kry = "*", uzo = "*", ixp_spis_prir = "*", zp_txt = "*", spis_pl = "*", spis_znak = "*",}
	const enum SeznamDokladuKdfDtoTypes { ixp = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", BUCI = "string", BUVL = "string", zp = "number", ixp_den = "string", ac = "string", pacac = "string", ps_sml = "string", dat_spl = "JsonDate", dat_zdan = "JsonDate", dat_zau = "JsonDate", dat_uhr = "JsonDate", mena = "number", mena_zkr = "string", c_mena = "JsonDecimal", c_celk = "JsonDecimal", c_celk_mena = "JsonDecimal", c_czk = "JsonDecimal", c_vaz = "JsonDecimal", c_vaz_mena = "JsonDecimal", c_kuhr = "JsonDecimal", c_kuhr_mena = "JsonDecimal", c_zust = "JsonDecimal", c_zust_mena = "JsonDecimal", c_kzauc = "JsonDecimal", c_hradit = "JsonDecimal", c_dor = "JsonDecimal", c_dph = "JsonDecimal", c_dodaneni = "JsonDecimal", c_zaklad = "JsonDecimal", c_pol_dan = "JsonDecimal", c_sankce = "JsonDecimal", priz_pdp = "number", priz_dph = "number", priz_ozp = "number", s_por = "number", s_uhr = "number", s_kry = "number", s_lik = "number", s_zau = "number", s_sto = "number", s_tis = "number", ktg_typ = "number", ktg_typ_zkr = "string", ktg_typ_txt = "string", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", nazev_zmenu_prov = "string", znam = "number", ixs_fun = "string", priz_view = "number", ac_ag = "string", ixp_den_txt = "string", rc = "string", esu_txt = "string", nazev = "string", cs_nazev = "string", s_ele = "number", s_sgn = "number", s_fyz = "number", priz_spis = "number", stav_dist = "number", ixb = "string", preevid = "number", poznamky = "number", fik = "number", fikVRoce = "number", uk = "number", ukVRoce = "number", s_schval = "number", typ_ag = "number", epri = "number", dat_vyst = "JsonDate", dic = "string", dat_uup = "JsonDate", suma_kry = "JsonDecimal", suma_kry_sch = "JsonDecimal", suma_kry_sch_akt_rok = "JsonDecimal", suma_lik = "JsonDecimal", suma_lik_sch = "JsonDecimal", rok_dokladu = "number", priz_splatky = "number", ixs_fun_vyriz = "string", cis_real = "string", ac_ze_sml = "string", cnt = "number", typ_esu = "number", stav = "number", stav_txt = "string", kl_slova = "string", s_prij = "number", stav_pis = "number", puvod = "number", poc_priloh = "number", poc_priloh_ele = "number", mesic_dph = "number", rok_dph = "number", ixs_fun_txt = "string", ixs_fun_vyriz_txt = "string", cis_real_txt = "string", s_schval_obecny = "number", s_schval_obecny_zkr = "string", s_schval_obecny_txt = "string", sml_kry = "number", uzo = "string", ixp_spis_prir = "string", zp_txt = "string", spis_pl = "string", spis_znak = "string",}
	const enum SeznamDokladuKdfDtoTypeLengths { ixp = 12, ixs_esu = 12, ico_esu = 14, ico = 14, ucs = 10, nks = 12, ac_esu = 60, popis = 254, vs = 12, ks = 12, ss = 12, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, BUCI = 46, BUVL = 46, ixp_den = 12, ac = 20, pacac = 20, ps_sml = 12, mena_zkr = 16, ktg_typ_zkr = 4, ktg_typ_txt = 50, ixs_typ = 12, zmenu_prov = 12, ixs_fun = 12, ac_ag = 20, ixp_den_txt = 50, rc = 10, esu_txt = 254, nazev = 100, cs_nazev = 100, ixb = 12, dic = 15, ixs_fun_vyriz = 12, cis_real = 6, ac_ze_sml = 30, uzo = 1, ixp_spis_prir = 12, zp_txt = 50, spis_pl = 5, spis_znak = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamESUzeSML.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamESUzeSML*/
	interface SeznamESUzeSMLDto {
		/**DBCOLUMN:SeznamESUzeSML.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.ixp_sml_pri*/
		ixp_sml_pri?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.ixs_prev*/
		ixs_prev?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.ixs_eko*/
		ixs_eko?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.typ_vazby*/
		typ_vazby?: number|null;
		/**DBCOLUMN:SeznamESUzeSML.typ_vazby_txt*/
		typ_vazby_txt?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.dic*/
		dic?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamESUzeSML.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.BU*/
		BU?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:SeznamESUzeSML.ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.cislo_dod*/
		cislo_dod?: number|null;
		/**DBCOLUMN:SeznamESUzeSML.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamESUzeSML.sml_stav_txt*/
		sml_stav_txt?: string|null;
	}
	const enum SeznamESUzeSMLDtoNames { ixp = "ixp", ixp_sml_pri = "ixp_sml_pri", ixs_prev = "ixs_prev", ixs_esu = "ixs_esu", ixs_eko = "ixs_eko", typ_vazby = "typ_vazby", typ_vazby_txt = "typ_vazby_txt", ico = "ico", dic = "dic", aktivita = "aktivita", esu_txt = "esu_txt", BU = "BU", bu_ci = "bu_ci", sk_ci = "sk_ci", ktg_typ = "ktg_typ", ktg_typ_txt = "ktg_typ_txt", cislo_dod = "cislo_dod", popis = "popis", sml_stav_txt = "sml_stav_txt",}
	const enum SeznamESUzeSMLDtoFragments { ixp = "*", ixp_sml_pri = "*", ixs_prev = "*", ixs_esu = "*", ixs_eko = "*", typ_vazby = "*", typ_vazby_txt = "*", ico = "*", dic = "*", aktivita = "*", esu_txt = "*", BU = "*", bu_ci = "*", sk_ci = "*", ktg_typ = "*", ktg_typ_txt = "*", cislo_dod = "*", popis = "*", sml_stav_txt = "*",}
	const enum SeznamESUzeSMLDtoTypes { ixp = "string", ixp_sml_pri = "string", ixs_prev = "string", ixs_esu = "string", ixs_eko = "string", typ_vazby = "number", typ_vazby_txt = "string", ico = "string", dic = "string", aktivita = "number", esu_txt = "string", BU = "string", bu_ci = "string", sk_ci = "string", ktg_typ = "number", ktg_typ_txt = "string", cislo_dod = "number", popis = "string", sml_stav_txt = "string",}
	const enum SeznamESUzeSMLDtoTypeLengths { ixp = 12, ixp_sml_pri = 12, ixs_prev = 12, ixs_esu = 12, ixs_eko = 12, typ_vazby_txt = 50, ico = 14, dic = 15, esu_txt = 254, BU = 46, bu_ci = 34, sk_ci = 11, ktg_typ_txt = 50, popis = 254, sml_stav_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamIVZzEVZ.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamIVZzEVZ*/
	interface SeznamIVZzEVZDto {
		/**DBCOLUMN:SeznamIVZzEVZ.vz_cislo_vevz*/
		vz_cislo_vevz?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.vz_cislo_prof*/
		vz_cislo_prof?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.vz_cislo_etrz*/
		vz_cislo_etrz?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.vz_cislo_agen*/
		vz_cislo_agen?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.ac*/
		ac?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.id_pripadu*/
		id_pripadu?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.agenda*/
		agenda?: string|null;
		/**DBCOLUMN:SeznamIVZzEVZ.vz_cislo_inen*/
		vz_cislo_inen?: string|null;
	}
	const enum SeznamIVZzEVZDtoNames { vz_cislo_vevz = "vz_cislo_vevz", vz_cislo_prof = "vz_cislo_prof", vz_cislo_etrz = "vz_cislo_etrz", vz_cislo_agen = "vz_cislo_agen", ac = "ac", ac_ag = "ac_ag", id_pripadu = "id_pripadu", agenda = "agenda", vz_cislo_inen = "vz_cislo_inen",}
	const enum SeznamIVZzEVZDtoFragments { vz_cislo_vevz = "*", vz_cislo_prof = "*", vz_cislo_etrz = "*", vz_cislo_agen = "*", ac = "*", ac_ag = "*", id_pripadu = "*", agenda = "*", vz_cislo_inen = "*",}
	const enum SeznamIVZzEVZDtoTypes { vz_cislo_vevz = "string", vz_cislo_prof = "string", vz_cislo_etrz = "string", vz_cislo_agen = "string", ac = "string", ac_ag = "string", id_pripadu = "string", agenda = "string", vz_cislo_inen = "string",}
	const enum SeznamIVZzEVZDtoTypeLengths { vz_cislo_vevz = 30, vz_cislo_prof = 30, vz_cislo_etrz = 30, ac = 30, ac_ag = 30, id_pripadu = 12, agenda = 3, vz_cislo_inen = 30,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamKryLikDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamKryLik*/
	interface SeznamKryLikDto {
		/**DBCOLUMN:SeznamKryLik.poradi*/
		poradi?: number|null;
		/**DBCOLUMN:SeznamKryLik.f*/
		f?: string|null;
		/**DBCOLUMN:SeznamKryLik.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamKryLik.radek*/
		radek?: number|null;
		/**DBCOLUMN:SeznamKryLik.lic*/
		lic?: string|null;
		/**DBCOLUMN:SeznamKryLik.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamKryLik.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:SeznamKryLik.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamKryLik.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:SeznamKryLik.kod*/
		kod?: string|null;
		/**DBCOLUMN:SeznamKryLik.typ_kon*/
		typ_kon?: number|null;
		/**DBCOLUMN:SeznamKryLik.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamKryLik.c_kr*/
		c_kr?: JsonDecimal|null;
		/**DBCOLUMN:SeznamKryLik.typ_kr_txt*/
		typ_kr_txt?: string|null;
		/**DBCOLUMN:SeznamKryLik.dat_zauc*/
		dat_zauc?: JsonDate|null;
		/**DBCOLUMN:SeznamKryLik.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamKryLik.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:SeznamKryLik.typ_oper*/
		typ_oper?: number|null;
		/**DBCOLUMN:SeznamKryLik.subrada_duz*/
		subrada_duz?: number|null;
		/**DBCOLUMN:SeznamKryLik.uus*/
		uus?: string|null;
		/**DBCOLUMN:SeznamKryLik.pkp*/
		pkp?: number|null;
		/**DBCOLUMN:SeznamKryLik.ico*/
		ico?: string|null;
		/**DBCOLUMN:SeznamKryLik.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:SeznamKryLik.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamKryLik.te0*/
		te0?: string|null;
		/**DBCOLUMN:SeznamKryLik.te1*/
		te1?: string|null;
		/**DBCOLUMN:SeznamKryLik.te2*/
		te2?: string|null;
		/**DBCOLUMN:SeznamKryLik.te3*/
		te3?: string|null;
		/**DBCOLUMN:SeznamKryLik.te4*/
		te4?: string|null;
		/**DBCOLUMN:SeznamKryLik.uea*/
		uea?: string|null;
		/**DBCOLUMN:SeznamKryLik.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:SeznamKryLik.uec*/
		uec?: string|null;
		/**DBCOLUMN:SeznamKryLik.ued*/
		ued?: string|null;
		/**DBCOLUMN:SeznamKryLik.uee*/
		uee?: string|null;
		/**DBCOLUMN:SeznamKryLik.uef*/
		uef?: string|null;
		/**DBCOLUMN:SeznamKryLik.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:SeznamKryLik.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:SeznamKryLik.uei*/
		uei?: string|null;
		/**DBCOLUMN:SeznamKryLik.uej*/
		uej?: string|null;
		/**DBCOLUMN:SeznamKryLik.mesic_dph*/
		mesic_dph?: number|null;
		/**DBCOLUMN:SeznamKryLik.rok_dph*/
		rok_dph?: number|null;
		/**DBCOLUMN:SeznamKryLik.up_stav_txt*/
		up_stav_txt?: string|null;
	}
	const enum SeznamKryLikDtoNames { poradi = "poradi", f = "f", ixp = "ixp", radek = "radek", lic = "lic", aktivita = "aktivita", up_stav = "up_stav", nazev = "nazev", ixs_kon = "ixs_kon", kod = "kod", typ_kon = "typ_kon", c = "c", c_kr = "c_kr", typ_kr_txt = "typ_kr_txt", dat_zauc = "dat_zauc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_oper = "typ_oper", subrada_duz = "subrada_duz", uus = "uus", pkp = "pkp", ico = "ico", ucs = "ucs", nks = "nks", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", mesic_dph = "mesic_dph", rok_dph = "rok_dph", up_stav_txt = "up_stav_txt",}
	const enum SeznamKryLikDtoFragments { poradi = "*", f = "*", ixp = "*", radek = "*", lic = "*", aktivita = "*", up_stav = "*", nazev = "*", ixs_kon = "*", kod = "*", typ_kon = "*", c = "*", c_kr = "*", typ_kr_txt = "*", dat_zauc = "*", dat_zmena = "*", zmenu_prov = "*", typ_oper = "*", subrada_duz = "*", uus = "*", pkp = "*", ico = "*", ucs = "*", nks = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", mesic_dph = "*", rok_dph = "*", up_stav_txt = "*",}
	const enum SeznamKryLikDtoTypes { poradi = "number", f = "string", ixp = "string", radek = "number", lic = "string", aktivita = "number", up_stav = "number", nazev = "string", ixs_kon = "string", kod = "string", typ_kon = "number", c = "JsonDecimal", c_kr = "JsonDecimal", typ_kr_txt = "string", dat_zauc = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", typ_oper = "number", subrada_duz = "number", uus = "string", pkp = "number", ico = "string", ucs = "string", nks = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", mesic_dph = "number", rok_dph = "number", up_stav_txt = "string",}
	const enum SeznamKryLikDtoTypeLengths { f = 1, ixp = 12, lic = 4, nazev = 50, ixs_kon = 12, kod = 30, typ_kr_txt = 50, zmenu_prov = 12, uus = 50, ico = 14, ucs = 10, nks = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, up_stav_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Doklad\TypoveDatasety\Gordic.Bpl.Interface.SeznamPlatebDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamPlateb*/
	interface SeznamPlatebDto {
		/**DBCOLUMN:SeznamPlateb.s_pol*/
		s_pol?: number|null;
		/**DBCOLUMN:SeznamPlateb.rok_pid*/
		rok_pid?: number|null;
		/**DBCOLUMN:SeznamPlateb.cis_pid*/
		cis_pid?: number|null;
		/**DBCOLUMN:SeznamPlateb.radek_uhr*/
		radek_uhr?: number|null;
		/**DBCOLUMN:SeznamPlateb.eko_akt*/
		eko_akt?: number|null;
		/**DBCOLUMN:SeznamPlateb.s_uhrp*/
		s_uhrp?: number|null;
		/**DBCOLUMN:SeznamPlateb.c_par*/
		c_par?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPlateb.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPlateb.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPlateb.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamPlateb.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:SeznamPlateb.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:SeznamPlateb.dat_spl*/
		dat_spl?: JsonDate|null;
		/**DBCOLUMN:SeznamPlateb.dat_zap*/
		dat_zap?: JsonDate|null;
		/**DBCOLUMN:SeznamPlateb.dat_par*/
		dat_par?: JsonDate|null;
		/**DBCOLUMN:SeznamPlateb.dat_kuhr*/
		dat_kuhr?: JsonDate|null;
		/**DBCOLUMN:SeznamPlateb.dat_nov_zus*/
		dat_nov_zus?: JsonDate|null;
		/**DBCOLUMN:SeznamPlateb.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:SeznamPlateb.nazev_ref*/
		nazev_ref?: string|null;
		/**DBCOLUMN:SeznamPlateb.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:SeznamPlateb.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:SeznamPlateb.sk_ci*/
		sk_ci?: string|null;
		/**DBCOLUMN:SeznamPlateb.bu_ci*/
		bu_ci?: string|null;
		/**DBCOLUMN:SeznamPlateb.vs*/
		vs?: string|null;
		/**DBCOLUMN:SeznamPlateb.ks*/
		ks?: string|null;
		/**DBCOLUMN:SeznamPlateb.ss*/
		ss?: string|null;
		/**DBCOLUMN:SeznamPlateb.ac*/
		ac?: string|null;
		/**DBCOLUMN:SeznamPlateb.mena_poz_zkr*/
		mena_poz_zkr?: string|null;
		/**DBCOLUMN:SeznamPlateb.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamPlateb.zp_zkr*/
		zp_zkr?: string|null;
		/**DBCOLUMN:SeznamPlateb.upl*/
		upl?: number|null;
		/**DBCOLUMN:SeznamPlateb.upl_txt*/
		upl_txt?: string|null;
		/**DBCOLUMN:SeznamPlateb.zp*/
		zp?: number|null;
		/**DBCOLUMN:SeznamPlateb.dev_pov*/
		dev_pov?: string|null;
		/**DBCOLUMN:SeznamPlateb.pla_tit*/
		pla_tit?: string|null;
		/**DBCOLUMN:SeznamPlateb.hra_pop*/
		hra_pop?: number|null;
		/**DBCOLUMN:SeznamPlateb.uus*/
		uus?: string|null;
		/**DBCOLUMN:SeznamPlateb.mena_poz*/
		mena_poz?: number|null;
		/**DBCOLUMN:SeznamPlateb.u_zp*/
		u_zp?: number|null;
	}
	const enum SeznamPlatebDtoNames { s_pol = "s_pol", rok_pid = "rok_pid", cis_pid = "cis_pid", radek_uhr = "radek_uhr", eko_akt = "eko_akt", s_uhrp = "s_uhrp", c_par = "c_par", c_mena = "c_mena", c = "c", nazev = "nazev", mena_zkr = "mena_zkr", ktg_typ = "ktg_typ", dat_spl = "dat_spl", dat_zap = "dat_zap", dat_par = "dat_par", dat_kuhr = "dat_kuhr", dat_nov_zus = "dat_nov_zus", dat_zmena = "dat_zmena", nazev_ref = "nazev_ref", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", vs = "vs", ks = "ks", ss = "ss", ac = "ac", mena_poz_zkr = "mena_poz_zkr", popis = "popis", zp_zkr = "zp_zkr", upl = "upl", upl_txt = "upl_txt", zp = "zp", dev_pov = "dev_pov", pla_tit = "pla_tit", hra_pop = "hra_pop", uus = "uus", mena_poz = "mena_poz", u_zp = "u_zp",}
	const enum SeznamPlatebDtoFragments { s_pol = "*", rok_pid = "*", cis_pid = "*", radek_uhr = "*", eko_akt = "*", s_uhrp = "*", c_par = "*", c_mena = "*", c = "*", nazev = "*", mena_zkr = "*", ktg_typ = "*", dat_spl = "*", dat_zap = "*", dat_par = "*", dat_kuhr = "*", dat_nov_zus = "*", dat_zmena = "*", nazev_ref = "*", sk_vl = "*", bu_vl = "*", sk_ci = "*", bu_ci = "*", vs = "*", ks = "*", ss = "*", ac = "*", mena_poz_zkr = "*", popis = "*", zp_zkr = "*", upl = "*", upl_txt = "*", zp = "*", dev_pov = "*", pla_tit = "*", hra_pop = "*", uus = "*", mena_poz = "*", u_zp = "*",}
	const enum SeznamPlatebDtoTypes { s_pol = "number", rok_pid = "number", cis_pid = "number", radek_uhr = "number", eko_akt = "number", s_uhrp = "number", c_par = "JsonDecimal", c_mena = "JsonDecimal", c = "JsonDecimal", nazev = "string", mena_zkr = "string", ktg_typ = "number", dat_spl = "JsonDate", dat_zap = "JsonDate", dat_par = "JsonDate", dat_kuhr = "JsonDate", dat_nov_zus = "JsonDate", dat_zmena = "JsonDate", nazev_ref = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", vs = "string", ks = "string", ss = "string", ac = "string", mena_poz_zkr = "string", popis = "string", zp_zkr = "string", upl = "number", upl_txt = "string", zp = "number", dev_pov = "string", pla_tit = "string", hra_pop = "number", uus = "string", mena_poz = "number", u_zp = "number",}
	const enum SeznamPlatebDtoTypeLengths { nazev = 160, mena_zkr = 16, nazev_ref = 200, sk_vl = 11, bu_vl = 34, sk_ci = 11, bu_ci = 34, vs = 12, ks = 12, ss = 12, ac = 20, mena_poz_zkr = 16, popis = 254, zp_zkr = 3, dev_pov = 30, pla_tit = 10, uus = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Init\GBplGlobalsBase.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Globální parametry pro BPL. Načtené při startu aplikace*/
	interface GBplGlobalsBase {
		/**hodnoty ""/xx*/
		Idt?: string|null;
		/**Spuštěný modul*/
		App?: Gordic.Bpl.Interface.GBplTypAg|null;
		/**Spuštěný modul jako string (malýma)*/
		readonly AppStr?: string|null;
		/**možnost zobrazeni RČ*/
		gin_esu_rczobr?: boolean|null;
		/**možnost vyhledávání RČ*/
		gin_esu_rcvyhl?: boolean|null;
		/**Nabídka NS dle vazby na funkci*/
		gin_rad_fcens?: boolean|null;
		/**Povinnost evidence dodacího listu před navázáním na doklad*/
		bpl_evi_dodl?: boolean|null;
		/**Povolení oznámení existence šablon*/
		bpl_hro_dok_ozn?: boolean|null;
		/**BPL - Provádět kontrolu krytí a likvidace na nks*/
		bpl_kont_nks?: boolean|null;
		/**BPL - Provádět kontrolu na duplicitu VS*/
		bpl_kont_vs?: boolean|null;
		bpl_lim_avi?: JsonDecimal|null;
		/**Nastavení maximální výše schvalované úhrady pro funkci*/
		bpl_max_uhr?: JsonDecimal|null;
		/**Povolení hromadného uvolnění prostředků*/
		bpl_rad_odrhr?: boolean|null;
		/**ŘP Povolení přeevidence*/
		bpl_rad_preevid?: boolean|null;
		/**Povolení pořizování směrových kódů*/
		bpl_rad_skedit?: boolean|null;
		/**Povolení uživateli servisní funkce - dříve DEBUG režim*/
		bpl_rad_servis?: boolean|null;
		/**Příznak, zda existuje licenční certifikát pro DSG - 1100,330*/
		licenceDSG?: boolean|null;
		/**GIN - Zobrazení informací kontrolního dohledového systému (detail - historie, úvodní okno modulu) - DSG*/
		gin_kodosyzo?: number|null;
		/**Je_DSG*/
		Je_DSG?: boolean|null;
		/**Režim provozu*/
		bpl_rez_provoz?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimProvozu|null;
		/**Režim zobrazení*/
		bpl_rez_zobraz?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimProvozu|null;
		/**Režim provozu*/
		bpl_rezim_isp?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimIsp|null;
		/**Režim kontroly částky likvidace*/
		bpl_rezim_lik?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimKontrolyLikvidace|null;
		/**Kontrola platnosti cizích účtů na šablonách*/
		bpl_sab_bucit?: Gordic.Bpl.Interface.GBplGlobalsBase.KontrolaCizichUctuSablon|null;
		/**Povolení aktivních operací na cizích šablonách*/
		bpl_sab_cizia?: Gordic.Bpl.Interface.GBplGlobalsBase.AktivniOperaceCizichSablon|null;
		/**Povolení editace šablon*/
		rad_sab_edi?: boolean|null;
		/**Generování dokladů ze šablon*/
		rad_sab_gen?: boolean|null;
		/**Povolení editace krytí a likvidace šablon*/
		rad_sab_kli?: boolean|null;
		/**Povolení editace skupin šablon*/
		rad_sab_sku?: boolean|null;
		/**Režim práce nad knihami*/
		bpl_rezim_pnk?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimPraceNadKnihami|null;
		/**Způsob přednastavení popisu dokladu BPL z dokladu modulu SML*/
		bpl_sml_popis?: Gordic.Bpl.Interface.GBplGlobalsBase.PopisDokladuSml|null;
		/**Režim akviziční vazby*/
		bpl_sml_rezim?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimSmlVazby|null;
		/**Text zápisu společnosti do obchod. rejstříku*/
		bpl_txt_or?: string|null;
		/**Povolení změny období DPH*/
		bpl_zme_obd_dph?: boolean|null;
		/**Povolení úhrad přes Ministerstvo financí*/
		bpl_rad_uhrmf?: boolean|null;
		/**Úhrad přes Ministerstvo financí - kontrolní limit*/
		bpl_limit_mf?: JsonDecimal|null;
		/**Použití agendového nebo evidenčního čísla smlouvy na dokladu BPL*/
		bpl_zsml_ac?: Gordic.Bpl.Interface.GBplGlobalsBase.PouzitiAgendovehoEvidencnihoCislaSml|null;
		/**Řízení přístupu k uzavíraným knihám*/
		eko_rad_bkacccl?: Gordic.Bpl.Interface.GBplGlobalsBase.PristupUzavKniham|null;
		/**EKO Přednastavení změny kompetenta v okamžiku předání a přeevidence dokladu*/
		eko_rad_zmekom?: string|null;
		/**Řady evidenčních čísel dodacích listů*/
		eko_rada_acdod?: string|null;
		/**Cizí měna*/
		cizi_mena?: boolean|null;
		/**Přednastavení datumu splatnosti*/
		dat_spl?: boolean|null;
		/**Přednastavení datumu při odúčtování likvidace*/
		bpl_dat_oduct?: Gordic.Bpl.Interface.GBplGlobalsBase.DatumOductovaniLikvidace|null;
		/**Přednastavení datumu splatnosti pro úhrady do BUC*/
		bpl_dat_spl?: Gordic.Bpl.Interface.GBplGlobalsBase.DatumSplatnostiProUhrady|null;
		/**Způsob definice agendového čísla*/
		def_acag?: Gordic.Bpl.Interface.GBplGlobalsBase.ZpusobDefiniceAc|null;
		/**Evidence dodacích listů*/
		evid_dodl?: Gordic.Bpl.Interface.GBplGlobalsBase.ZpusobEvidenceDodacichListu|null;
		/**Účtování plateb hotově*/
		hot_uct?: Gordic.Bpl.Interface.GBplGlobalsBase.UctovaniHotove|null;
		/**Povolení generování variabilního symbolu*/
		gener_vs?: Gordic.Bpl.Interface.GBplGlobalsBase.GenerovaniVs|null;
		/**ŘP Hromadné účtování*/
		hrom_uct?: boolean|null;
		/**Povolení hromadných úhrad*/
		hrom_uhr?: boolean|null;
		/**ŘP Provádět kontrolu na rekapitulaci*/
		kont_rek?: Gordic.Bpl.Interface.GBplGlobalsBase.AnoNeWarn|null;
		/**Kontrola na rozpočet*/
		kont_rozp?: Gordic.Bpl.Interface.GBplGlobalsBase.KontrolaRozpocet|null;
		/**Kontrola data UUP*/
		kont_uup?: boolean|null;
		/**Režim kumulace účetních zápisů (ano,ne)*/
		kumul?: boolean|null;
		/**Přístup k vlastním bankovním účtům*/
		pbuvl?: Gordic.Bpl.Interface.GBplGlobalsBase.PristupBu|null;
		/**Nastavení stavu platby zákládané v modulu BUC*/
		prikaz_uhr?: Gordic.Bpl.Interface.GBplGlobalsBase.StavPlatbyBuc|null;
		/**KDF - ŘP Předání do modulu BUC k úhradě*/
		rad_buc?: number|null;
		/**KDF - ŘP Editace veřejných masek*/
		rad_edit_ms?: boolean|null;
		/**KDF - ŘP Evidence dokladu*/
		rad_evi?: boolean|null;
		/**KDF - ŘP Odúčtování likvidace*/
		rad_odulik?: boolean|null;
		/**KDF - ŘP Podání dokladu*/
		rad_pod?: boolean|null;
		/**KDF - ŘP Podání s el. dok.*/
		rad_pod_ele?: boolean|null;
		/**KDF - ŘP Pořízení externího subjektu*/
		rad_por_esu?: boolean|null;
		/**KDF - ŘP Pořízení krytí*/
		rad_por_kry?: boolean|null;
		/**KDF - ŘP Pořízení konstantních symbolů*/
		rad_por_ks?: boolean|null;
		/**KDF - ŘP Pořízení likvidace*/
		rad_por_lik?: boolean|null;
		/**KDF - ŘP Předání dokladu*/
		rad_pre_dok?: boolean|null;
		/**KDF - ŘP Přidělení dokladu*/
		rad_pri_dok?: boolean|null;
		/**KDF - ŘP Povolení převzetí dokladu*/
		rad_prevze?: boolean|null;
		/**KDF - ŘP Zpřístupnění rozšířeného profilu*/
		rad_rpp?: boolean|null;
		/**KDF - ŘP Používání šablon*/
		rad_sablony?: boolean|null;
		/**KDF - ŘP Schválení a storno schválení evidovaného dokladu*/
		rad_sch_dok?: boolean|null;
		/**KDF - ŘP Schválení krytí*/
		rad_sch_kry?: boolean|null;
		/**KDF - ŘP Schválení likvidace*/
		rad_sch_lik?: boolean|null;
		/**KDF - ŘP Storno schválení krytí*/
		rad_sch_stk?: boolean|null;
		/**KDF - ŘP Storno schválení likvidace*/
		rad_sch_stl?: boolean|null;
		/**KDF - ŘP Zrušení schválení dokladu*/
		rad_sch_sto?: boolean|null;
		/**KDF - ŘP Povolení navázání a odvázání od položky SML*/
		rad_smlpol?: boolean|null;
		/**KDF - ŘP Storno dokladu*/
		rad_sto_dok?: boolean|null;
		/**KDF - ŘP Možnost zrušit storno dokladu*/
		rad_ssto_dk?: boolean|null;
		/**KDF - ŘP Podpora technického zhodnocení (Ano/Ne)*/
		rad_tzh?: boolean|null;
		/**KDF - ŘP Proúčtování dokladu*/
		rad_uct?: boolean|null;
		/**KDF - ŘP Povolení účtování cizích dokladů*/
		rad_uctcid?: boolean|null;
		/**KDF - ŘP Úhrada externí pokladnou*/
		rad_uhe?: boolean|null;
		/**KDF - ŘP Uzavření agendy*/
		rad_uza_age?: boolean|null;
		/**KDF - ŘP Uzavření dokladů*/
		rad_uza_dok?: boolean|null;
		/**KDF - ŘP Uzavření knihy*/
		rad_uza_kni?: boolean|null;
		/**BPL - ŘP Příprava knihy k uzávěrce*/
		rad_pri_uza?: boolean|null;
		/**KDF - ŘP Povolení změny splatnosti*/
		rad_zme_spl?: boolean|null;
		/**KOF - min pen*/
		kof_rad_min_pen?: number|null;
		/**KOF - min dnu*/
		kof_rad_min_dnu?: number|null;
		/**GIN - Automatické generování identifikátoru*/
		gin_gen_ixp?: string|null;
		/**GIN - ŘP Možnost vrácení dokladu do WFL*/
		rad_retdwfl?: boolean|null;
		/**BPL - Zahájení dokladové finanční kontroly*/
		bpl_rez_fik?: number|null;
		/**BPL - Zahájení dokladové účetní kontroly*/
		bpl_rez_uck?: number|null;
		/**GIN EPK - Podpora schvalovacího procesu*/
		gin_epk_schval?: number|null;
		/**EKO – ŘP Režim dokladové finanční kontroly*/
		eko_rad_dfken?: number|null;
		/**EKO – ŘP Režim dokladové účetní kontroly*/
		eko_rad_duken?: number|null;
		/**Blokace políček finanční kontrolou*/
		bpl_rad_fik?: number|null;
		/**Rezervace příjmů*/
		bpl_rad_rezpri?: number|null;
		/**Poločky VP - podle IČ?*/
		bpl_cispol_ico?: number|null;
		/**GIN ESU - povinnost vyplnění DIČ u plátce DPH*/
		gin_esu_pdicdph?: boolean|null;
		/**Informační hláška pro uživatele, pokud zatrhne na detailu dokladu "Zdanění příjemcem dokladu".*/
		kdf_pdp_info?: string|null;
		/**BPL - Provádění dokladové finanční kontroly u vyúčtování bez závazku*/
		bpl_fik_vyuc?: number|null;
		/**GIN ESU - zobrazovat stav insolvence (seznam a detail ESU)*/
		gin_esu_inzobr?: string|null;
		/**GIN – ŘP Insolvence – upozornění (dle vybraných stavů insolvence)*/
		gin_rad_isirvar?: string|null;
		/**EKO - max. výše haléřového dorovnání pohledávek*/
		eko_hal_dor_poh?: JsonDecimal|null;
		/**EKO - max. výše haléřového dorovnání závazků*/
		eko_hal_dor_zav?: JsonDecimal|null;
		/**BPL - Nabídka majetku pro TZH bez ohledu na NS*/
		bpl_tzh_nks?: boolean|null;
		/**KOF - ŘP Vymáhání pohledávek z DDP*/
		kof_rad_vymddp?: boolean|null;
		/**KOF - Nastavení příznaku tvorby opravných položek k pohledávkám - 6.5.2020*/
		kof_priz_opp?: number|null;
		/**KDF - Předvyplnění předkontace pomocí AI - 29.7.2025*/
		kdf_ai_predkon?: number|null;
		/**GIN ESU - ISZR registry - varování při evidenci - 24.10.2015*/
		gin_esu_iszrvar?: string|null;
		/**GIN ESU - ISZR registry - blokování při evidenci - 24.10.2015*/
		gin_esu_iszrblo?: string|null;
		/**BPL - Předplňování Zprávy pro příjemce*/
		bpl_predpl_zpr?: number|null;
		/**Registrace SS*/
		reg_ss?: boolean|null;
		/**Režim kurzu*/
		rez_kur?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimKurzu|null;
		/**Režim účtování*/
		rez_uct?: Gordic.Bpl.Interface.GBplGlobalsBase.RezimUctovani|null;
		/**Povinnost exist. rozpočtu pro schv. krytí*/
		roz_sch?: boolean|null;
		/**rezim planu nakladu: povolit schvaleni jen kdyz je plan anebo vzdy*/
		pla_sch?: boolean|null;
		/**Splatnost (dnů)*/
		splatnost?: number|null;
		/**Povolení překročit disponibilní prostředky na účtě*/
		ucet_prek?: number|null;
		/**ŘP Povolení uhrady před schválením likvidace*/
		uhrpredlik?: boolean|null;
		/**vl. ucet lze po schvaleni kryti menit*/
		bu_vl_change?: boolean|null;
		/**nastaveni zda lze delat castecne uhrady pouze z jednoho uctu(1) nebo z vice(0)*/
		bu_vl1?: boolean|null;
		/**Vazba na SML*/
		vaz_sml?: Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSml|null;
		/**Režim vazby likvidace na položku SML*/
		vaz_sml_lik?: Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSmlLik|null;
		/**Navázání zálohy na daňový doklad a vyúčtování*/
		vaz_faz?: Gordic.Bpl.Interface.GBplGlobalsBase.VazbaFaz|null;
		/**Import/Export elektronického dokladu*/
		rad_efak?: Gordic.Bpl.Interface.GBplGlobalsBase.RpEfaktura|null;
		/**Výčet SU pro spojovací účty*/
		vycet_su?: string|null;
		/**KOF - Evidenční režim*/
		rez_evi?: boolean|null;
		/**Povolení předplnění data vystavení*/
		prdatvyst?: boolean|null;
		/**Povolení odeslání do výpravny*/
		rad_odes?: boolean|null;
		/**Povolení zakládat účetní pohyby FUC pro tvorbu opravných položek k pohledávkám*/
		rad_oprpol?: boolean|null;
		/**vlastni organizacni jednotka pro prihlasenou funkci*/
		IxsIsu?: string|null;
		/**kompetent*/
		IxsFunKom?: string|null;
		/**Realizator*/
		CisReal?: string|null;
		/**kdfsid.znam , -1 nebo 1*/
		Znam?: number|null;
		/**typ dokumentu SSL - vybere se dle knihy*/
		Ixs_Typ?: string|null;
		/**Kategorie SSL*/
		Ktg_Typ?: number|null;
		/**povolené typy pis. na knihu nastaveno funkci kniha_ixs_typ*/
		sWhereIxsTyp?: string|null;
		/**...*/
		sWhereKtgTyp?: string|null;
		/**zda jen prohlizeni*/
		prohlizeni?: boolean|null;
		/**Nulova kontace*/
		NullKontace?: string|null;
		/**Příznak, zda jde o rozšířenou větu 2024*/
		RozsirenaVeta?: boolean|null;
		/**Kontrola závazků pred schvalenim platby*/
		kontr_poh?: Gordic.Bpl.Interface.GBplGlobalsBase.KontrolaPlatby|null;
	}
	const enum GBplGlobalsBaseNames { Idt = "Idt", App = "App", AppStr = "AppStr", gin_esu_rczobr = "gin_esu_rczobr", gin_esu_rcvyhl = "gin_esu_rcvyhl", gin_rad_fcens = "gin_rad_fcens", bpl_evi_dodl = "bpl_evi_dodl", bpl_hro_dok_ozn = "bpl_hro_dok_ozn", bpl_kont_nks = "bpl_kont_nks", bpl_kont_vs = "bpl_kont_vs", bpl_lim_avi = "bpl_lim_avi", bpl_max_uhr = "bpl_max_uhr", bpl_rad_odrhr = "bpl_rad_odrhr", bpl_rad_preevid = "bpl_rad_preevid", bpl_rad_skedit = "bpl_rad_skedit", bpl_rad_servis = "bpl_rad_servis", licenceDSG = "licenceDSG", gin_kodosyzo = "gin_kodosyzo", Je_DSG = "Je_DSG", bpl_rez_provoz = "bpl_rez_provoz", bpl_rez_zobraz = "bpl_rez_zobraz", bpl_rezim_isp = "bpl_rezim_isp", bpl_rezim_lik = "bpl_rezim_lik", bpl_sab_bucit = "bpl_sab_bucit", bpl_sab_cizia = "bpl_sab_cizia", rad_sab_edi = "rad_sab_edi", rad_sab_gen = "rad_sab_gen", rad_sab_kli = "rad_sab_kli", rad_sab_sku = "rad_sab_sku", bpl_rezim_pnk = "bpl_rezim_pnk", bpl_sml_popis = "bpl_sml_popis", bpl_sml_rezim = "bpl_sml_rezim", bpl_txt_or = "bpl_txt_or", bpl_zme_obd_dph = "bpl_zme_obd_dph", bpl_rad_uhrmf = "bpl_rad_uhrmf", bpl_limit_mf = "bpl_limit_mf", bpl_zsml_ac = "bpl_zsml_ac", eko_rad_bkacccl = "eko_rad_bkacccl", eko_rad_zmekom = "eko_rad_zmekom", eko_rada_acdod = "eko_rada_acdod", cizi_mena = "cizi_mena", dat_spl = "dat_spl", bpl_dat_oduct = "bpl_dat_oduct", bpl_dat_spl = "bpl_dat_spl", def_acag = "def_acag", evid_dodl = "evid_dodl", hot_uct = "hot_uct", gener_vs = "gener_vs", hrom_uct = "hrom_uct", hrom_uhr = "hrom_uhr", kont_rek = "kont_rek", kont_rozp = "kont_rozp", kont_uup = "kont_uup", kumul = "kumul", pbuvl = "pbuvl", prikaz_uhr = "prikaz_uhr", rad_buc = "rad_buc", rad_edit_ms = "rad_edit_ms", rad_evi = "rad_evi", rad_odulik = "rad_odulik", rad_pod = "rad_pod", rad_pod_ele = "rad_pod_ele", rad_por_esu = "rad_por_esu", rad_por_kry = "rad_por_kry", rad_por_ks = "rad_por_ks", rad_por_lik = "rad_por_lik", rad_pre_dok = "rad_pre_dok", rad_pri_dok = "rad_pri_dok", rad_prevze = "rad_prevze", rad_rpp = "rad_rpp", rad_sablony = "rad_sablony", rad_sch_dok = "rad_sch_dok", rad_sch_kry = "rad_sch_kry", rad_sch_lik = "rad_sch_lik", rad_sch_stk = "rad_sch_stk", rad_sch_stl = "rad_sch_stl", rad_sch_sto = "rad_sch_sto", rad_smlpol = "rad_smlpol", rad_sto_dok = "rad_sto_dok", rad_ssto_dk = "rad_ssto_dk", rad_tzh = "rad_tzh", rad_uct = "rad_uct", rad_uctcid = "rad_uctcid", rad_uhe = "rad_uhe", rad_uza_age = "rad_uza_age", rad_uza_dok = "rad_uza_dok", rad_uza_kni = "rad_uza_kni", rad_pri_uza = "rad_pri_uza", rad_zme_spl = "rad_zme_spl", kof_rad_min_pen = "kof_rad_min_pen", kof_rad_min_dnu = "kof_rad_min_dnu", gin_gen_ixp = "gin_gen_ixp", rad_retdwfl = "rad_retdwfl", bpl_rez_fik = "bpl_rez_fik", bpl_rez_uck = "bpl_rez_uck", gin_epk_schval = "gin_epk_schval", eko_rad_dfken = "eko_rad_dfken", eko_rad_duken = "eko_rad_duken", bpl_rad_fik = "bpl_rad_fik", bpl_rad_rezpri = "bpl_rad_rezpri", bpl_cispol_ico = "bpl_cispol_ico", gin_esu_pdicdph = "gin_esu_pdicdph", kdf_pdp_info = "kdf_pdp_info", bpl_fik_vyuc = "bpl_fik_vyuc", gin_esu_inzobr = "gin_esu_inzobr", gin_rad_isirvar = "gin_rad_isirvar", eko_hal_dor_poh = "eko_hal_dor_poh", eko_hal_dor_zav = "eko_hal_dor_zav", bpl_tzh_nks = "bpl_tzh_nks", kof_rad_vymddp = "kof_rad_vymddp", kof_priz_opp = "kof_priz_opp", kdf_ai_predkon = "kdf_ai_predkon", gin_esu_iszrvar = "gin_esu_iszrvar", gin_esu_iszrblo = "gin_esu_iszrblo", bpl_predpl_zpr = "bpl_predpl_zpr", reg_ss = "reg_ss", rez_kur = "rez_kur", rez_uct = "rez_uct", roz_sch = "roz_sch", pla_sch = "pla_sch", splatnost = "splatnost", ucet_prek = "ucet_prek", uhrpredlik = "uhrpredlik", bu_vl_change = "bu_vl_change", bu_vl1 = "bu_vl1", vaz_sml = "vaz_sml", vaz_sml_lik = "vaz_sml_lik", vaz_faz = "vaz_faz", rad_efak = "rad_efak", vycet_su = "vycet_su", rez_evi = "rez_evi", prdatvyst = "prdatvyst", rad_odes = "rad_odes", rad_oprpol = "rad_oprpol", IxsIsu = "IxsIsu", IxsFunKom = "IxsFunKom", CisReal = "CisReal", Znam = "Znam", Ixs_Typ = "Ixs_Typ", Ktg_Typ = "Ktg_Typ", sWhereIxsTyp = "sWhereIxsTyp", sWhereKtgTyp = "sWhereKtgTyp", prohlizeni = "prohlizeni", NullKontace = "NullKontace", RozsirenaVeta = "RozsirenaVeta", kontr_poh = "kontr_poh",}
	const enum GBplGlobalsBaseFragments { Idt = "*", App = "*", AppStr = "*", gin_esu_rczobr = "*", gin_esu_rcvyhl = "*", gin_rad_fcens = "*", bpl_evi_dodl = "*", bpl_hro_dok_ozn = "*", bpl_kont_nks = "*", bpl_kont_vs = "*", bpl_lim_avi = "*", bpl_max_uhr = "*", bpl_rad_odrhr = "*", bpl_rad_preevid = "*", bpl_rad_skedit = "*", bpl_rad_servis = "*", licenceDSG = "*", gin_kodosyzo = "*", Je_DSG = "*", bpl_rez_provoz = "*", bpl_rez_zobraz = "*", bpl_rezim_isp = "*", bpl_rezim_lik = "*", bpl_sab_bucit = "*", bpl_sab_cizia = "*", rad_sab_edi = "*", rad_sab_gen = "*", rad_sab_kli = "*", rad_sab_sku = "*", bpl_rezim_pnk = "*", bpl_sml_popis = "*", bpl_sml_rezim = "*", bpl_txt_or = "*", bpl_zme_obd_dph = "*", bpl_rad_uhrmf = "*", bpl_limit_mf = "*", bpl_zsml_ac = "*", eko_rad_bkacccl = "*", eko_rad_zmekom = "*", eko_rada_acdod = "*", cizi_mena = "*", dat_spl = "*", bpl_dat_oduct = "*", bpl_dat_spl = "*", def_acag = "*", evid_dodl = "*", hot_uct = "*", gener_vs = "*", hrom_uct = "*", hrom_uhr = "*", kont_rek = "*", kont_rozp = "*", kont_uup = "*", kumul = "*", pbuvl = "*", prikaz_uhr = "*", rad_buc = "*", rad_edit_ms = "*", rad_evi = "*", rad_odulik = "*", rad_pod = "*", rad_pod_ele = "*", rad_por_esu = "*", rad_por_kry = "*", rad_por_ks = "*", rad_por_lik = "*", rad_pre_dok = "*", rad_pri_dok = "*", rad_prevze = "*", rad_rpp = "*", rad_sablony = "*", rad_sch_dok = "*", rad_sch_kry = "*", rad_sch_lik = "*", rad_sch_stk = "*", rad_sch_stl = "*", rad_sch_sto = "*", rad_smlpol = "*", rad_sto_dok = "*", rad_ssto_dk = "*", rad_tzh = "*", rad_uct = "*", rad_uctcid = "*", rad_uhe = "*", rad_uza_age = "*", rad_uza_dok = "*", rad_uza_kni = "*", rad_pri_uza = "*", rad_zme_spl = "*", kof_rad_min_pen = "*", kof_rad_min_dnu = "*", gin_gen_ixp = "*", rad_retdwfl = "*", bpl_rez_fik = "*", bpl_rez_uck = "*", gin_epk_schval = "*", eko_rad_dfken = "*", eko_rad_duken = "*", bpl_rad_fik = "*", bpl_rad_rezpri = "*", bpl_cispol_ico = "*", gin_esu_pdicdph = "*", kdf_pdp_info = "*", bpl_fik_vyuc = "*", gin_esu_inzobr = "*", gin_rad_isirvar = "*", eko_hal_dor_poh = "*", eko_hal_dor_zav = "*", bpl_tzh_nks = "*", kof_rad_vymddp = "*", kof_priz_opp = "*", kdf_ai_predkon = "*", gin_esu_iszrvar = "*", gin_esu_iszrblo = "*", bpl_predpl_zpr = "*", reg_ss = "*", rez_kur = "*", rez_uct = "*", roz_sch = "*", pla_sch = "*", splatnost = "*", ucet_prek = "*", uhrpredlik = "*", bu_vl_change = "*", bu_vl1 = "*", vaz_sml = "*", vaz_sml_lik = "*", vaz_faz = "*", rad_efak = "*", vycet_su = "*", rez_evi = "*", prdatvyst = "*", rad_odes = "*", rad_oprpol = "*", IxsIsu = "*", IxsFunKom = "*", CisReal = "*", Znam = "*", Ixs_Typ = "*", Ktg_Typ = "*", sWhereIxsTyp = "*", sWhereKtgTyp = "*", prohlizeni = "*", NullKontace = "*", RozsirenaVeta = "*", kontr_poh = "*",}
	const enum GBplGlobalsBaseTypes { Idt = "string", App = "Gordic.Bpl.Interface.GBplTypAg", AppStr = "string", gin_esu_rczobr = "boolean", gin_esu_rcvyhl = "boolean", gin_rad_fcens = "boolean", bpl_evi_dodl = "boolean", bpl_hro_dok_ozn = "boolean", bpl_kont_nks = "boolean", bpl_kont_vs = "boolean", bpl_lim_avi = "JsonDecimal", bpl_max_uhr = "JsonDecimal", bpl_rad_odrhr = "boolean", bpl_rad_preevid = "boolean", bpl_rad_skedit = "boolean", bpl_rad_servis = "boolean", licenceDSG = "boolean", gin_kodosyzo = "number", Je_DSG = "boolean", bpl_rez_provoz = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimProvozu", bpl_rez_zobraz = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimProvozu", bpl_rezim_isp = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimIsp", bpl_rezim_lik = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimKontrolyLikvidace", bpl_sab_bucit = "Gordic.Bpl.Interface.GBplGlobalsBase.KontrolaCizichUctuSablon", bpl_sab_cizia = "Gordic.Bpl.Interface.GBplGlobalsBase.AktivniOperaceCizichSablon", rad_sab_edi = "boolean", rad_sab_gen = "boolean", rad_sab_kli = "boolean", rad_sab_sku = "boolean", bpl_rezim_pnk = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimPraceNadKnihami", bpl_sml_popis = "Gordic.Bpl.Interface.GBplGlobalsBase.PopisDokladuSml", bpl_sml_rezim = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimSmlVazby", bpl_txt_or = "string", bpl_zme_obd_dph = "boolean", bpl_rad_uhrmf = "boolean", bpl_limit_mf = "JsonDecimal", bpl_zsml_ac = "Gordic.Bpl.Interface.GBplGlobalsBase.PouzitiAgendovehoEvidencnihoCislaSml", eko_rad_bkacccl = "Gordic.Bpl.Interface.GBplGlobalsBase.PristupUzavKniham", eko_rad_zmekom = "string", eko_rada_acdod = "string", cizi_mena = "boolean", dat_spl = "boolean", bpl_dat_oduct = "Gordic.Bpl.Interface.GBplGlobalsBase.DatumOductovaniLikvidace", bpl_dat_spl = "Gordic.Bpl.Interface.GBplGlobalsBase.DatumSplatnostiProUhrady", def_acag = "Gordic.Bpl.Interface.GBplGlobalsBase.ZpusobDefiniceAc", evid_dodl = "Gordic.Bpl.Interface.GBplGlobalsBase.ZpusobEvidenceDodacichListu", hot_uct = "Gordic.Bpl.Interface.GBplGlobalsBase.UctovaniHotove", gener_vs = "Gordic.Bpl.Interface.GBplGlobalsBase.GenerovaniVs", hrom_uct = "boolean", hrom_uhr = "boolean", kont_rek = "Gordic.Bpl.Interface.GBplGlobalsBase.AnoNeWarn", kont_rozp = "Gordic.Bpl.Interface.GBplGlobalsBase.KontrolaRozpocet", kont_uup = "boolean", kumul = "boolean", pbuvl = "Gordic.Bpl.Interface.GBplGlobalsBase.PristupBu", prikaz_uhr = "Gordic.Bpl.Interface.GBplGlobalsBase.StavPlatbyBuc", rad_buc = "number", rad_edit_ms = "boolean", rad_evi = "boolean", rad_odulik = "boolean", rad_pod = "boolean", rad_pod_ele = "boolean", rad_por_esu = "boolean", rad_por_kry = "boolean", rad_por_ks = "boolean", rad_por_lik = "boolean", rad_pre_dok = "boolean", rad_pri_dok = "boolean", rad_prevze = "boolean", rad_rpp = "boolean", rad_sablony = "boolean", rad_sch_dok = "boolean", rad_sch_kry = "boolean", rad_sch_lik = "boolean", rad_sch_stk = "boolean", rad_sch_stl = "boolean", rad_sch_sto = "boolean", rad_smlpol = "boolean", rad_sto_dok = "boolean", rad_ssto_dk = "boolean", rad_tzh = "boolean", rad_uct = "boolean", rad_uctcid = "boolean", rad_uhe = "boolean", rad_uza_age = "boolean", rad_uza_dok = "boolean", rad_uza_kni = "boolean", rad_pri_uza = "boolean", rad_zme_spl = "boolean", kof_rad_min_pen = "number", kof_rad_min_dnu = "number", gin_gen_ixp = "string", rad_retdwfl = "boolean", bpl_rez_fik = "number", bpl_rez_uck = "number", gin_epk_schval = "number", eko_rad_dfken = "number", eko_rad_duken = "number", bpl_rad_fik = "number", bpl_rad_rezpri = "number", bpl_cispol_ico = "number", gin_esu_pdicdph = "boolean", kdf_pdp_info = "string", bpl_fik_vyuc = "number", gin_esu_inzobr = "string", gin_rad_isirvar = "string", eko_hal_dor_poh = "JsonDecimal", eko_hal_dor_zav = "JsonDecimal", bpl_tzh_nks = "boolean", kof_rad_vymddp = "boolean", kof_priz_opp = "number", kdf_ai_predkon = "number", gin_esu_iszrvar = "string", gin_esu_iszrblo = "string", bpl_predpl_zpr = "number", reg_ss = "boolean", rez_kur = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimKurzu", rez_uct = "Gordic.Bpl.Interface.GBplGlobalsBase.RezimUctovani", roz_sch = "boolean", pla_sch = "boolean", splatnost = "number", ucet_prek = "number", uhrpredlik = "boolean", bu_vl_change = "boolean", bu_vl1 = "boolean", vaz_sml = "Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSml", vaz_sml_lik = "Gordic.Bpl.Interface.GBplGlobalsBase.VazbaSmlLik", vaz_faz = "Gordic.Bpl.Interface.GBplGlobalsBase.VazbaFaz", rad_efak = "Gordic.Bpl.Interface.GBplGlobalsBase.RpEfaktura", vycet_su = "string", rez_evi = "boolean", prdatvyst = "boolean", rad_odes = "boolean", rad_oprpol = "boolean", IxsIsu = "string", IxsFunKom = "string", CisReal = "string", Znam = "number", Ixs_Typ = "string", Ktg_Typ = "number", sWhereIxsTyp = "string", sWhereKtgTyp = "string", prohlizeni = "boolean", NullKontace = "string", RozsirenaVeta = "boolean", kontr_poh = "Gordic.Bpl.Interface.GBplGlobalsBase.KontrolaPlatby",}
	const enum GBplGlobalsBaseTypeLengths {}
}
declare namespace Gordic.Bpl.Interface.GBplGlobalsBase {
	/**Typ šablony*/
	const enum TypSablony {
		/**typ skupiny tem. jednoduché poukazy*/
		TST_JED=0,
		/**typ skupiny tem. hromadne poukazy*/
		TST_HRP=10,
		/**typ skupiny tem. primotopy*/
		TST_PTS=20,
		/**typ skupiny tem. ubyt. sys.*/
		TST_USS=30,
		/**typ skupiny tem. pou pres int*/
		TST_INT=40,
		/**typ skupiny tem. pou ze smluv*/
		TST_SML=50,
		/**typ skupiny tem. pou z ddp*/
		TST_DDP=60,
		/**typ skupiny tem. pou z pam*/
		TST_PAM=70,
	}
	/**stavy s_uhrp	stavy položek úhrad*/
	const enum StavUhrPol {
		/**storno*/
		suhrpST=0,
		/**k úhradě*/
		suhrpKU=10,
		/**pozastavena*/
		suhrpPO=20,
		/**pozastavena trvale*/
		suhrpPT=22,
		/**storno vratkou*/
		suhrpSV=5,
		/**storno banky*/
		suhrpSB=23,
		/**odeslan prikaz k uhr.*/
		suhrpOP=25,
		/**uhrazeno castecne*/
		suhrpUC=27,
		/**uhrazena*/
		suhrpUH=30,
		/**nespárována*/
		suhrpNE=35,
		/**spárována*/
		suhrpSP=40,
		/**k zaúčtování*/
		suhrpKZ=50,
		/**zaúčtována*/
		suhrpZA=60,
	}
	/**Režim provozu*/
	const enum RezimProvozu {
		/**Uživatel*/
		Uzivatel=0,
		/**Základní*/
		Zakladni=1,
		/**Účtárna*/
		Uctarna=2,
		/**Realizátor*/
		Realizator=3,
		/**Kompetent*/
		Kompetent=4,
	}
	/**Typy vazeb faktur*/
	const enum TypVazbyFaktur {
		VAZ_PROFORMA=10,
		VAZ_ZALOHA=20,
		VAZ_PENALE=30,
		VAZ_POKUTA=31,
		VAZ_DOBROPIS=40,
		VAZ_ZAL_DPH=50,
		VAZ_OPR_DPH=60,
	}
	/**Způsob platby*/
	const enum ZpusobPlatby {
		/**Neurčeno*/
		PL_NEU=0,
		/**Hotově*/
		PL_HOT=10,
		/**Hromadný příkaz*/
		PL_HRP=20,
		/**Jednoduchý příkaz*/
		PL_JEP=30,
		/**Zahraniční šek*/
		PL_ZSEK=32,
		/**Inkaso*/
		PL_IN=40,
		/**Externí příkaz*/
		PL_EXP=41,
		/**Kompenzace*/
		PL_KO=42,
		/**Složenka typu B, služba 0*/
		PL_SL=50,
		/**Složenka typu B, služba 1*/
		PL_SL1=51,
		/**Složenka typu B, služba 2*/
		PL_SL2=52,
		/**Složenka typu B, služba 3*/
		PL_SL3=53,
		/**Složenka typu B, služba Q*/
		PL_SLQ=54,
		/**Poštovní poukázka A*/
		PL_SLAV=60,
		/**Dobírka složenka A*/
		PL_SLA=61,
		/**Inkaso SIPO*/
		PL_SIPO=70,
		/**E-faktura*/
		PL_EF=72,
		/**Platební brána, karta*/
		PL_PB=73,
		/**Avizace*/
		PL_AV=74,
		/**Disketa do ČS*/
		PL_DS=80,
		/**Disketa do ČS2*/
		PL_DS_2=81,
	}
	const enum StavPorizeni {
		/**Doklad je otevřen*/
		Otevreno=0,
		/**Doklad je připraven k uzávěrce*/
		PripravenoKUzaverce=10,
		/**Doklad je uzavřen*/
		Uzavreno=20,
		/**Servisní mód*/
		Oprava=30,
	}
	const enum StavUhrady {
		/**Neuhrazeno*/
		NeuhradiSe=-1,
		/**Neuhrazeno*/
		Neuhrazeno=0,
		/**Uhrazeno částečně*/
		UhrazenoCastecne=10,
		/**Uhrazeno*/
		Uhrazeno=20,
	}
	const enum StavOdeslanoKUhrade {
		/**Neodesláno*/
		Neodeslano=0,
		/**Odeslano částečně*/
		OdeslanoCastecne=10,
		/**Odeslano*/
		Odeslano=20,
	}
	const enum StavZauctovani {
		/**Nezaúčtováno*/
		Nezauctovano=0,
		/**Zaúčtováno částečně*/
		ZauctovanoCastecne=10,
		/**Zaúčtováno*/
		Zauctovano=20,
	}
	const enum StavFinancniUcetniKontroly {
		/**FK - nezahájena*/
		Nezahajeno=-1,
		/**FK - návrh*/
		Navrh=0,
		/**FK - probíhá*/
		Probiha=5,
		/**FK - povolena*/
		Povoleno=10,
		/**FK - zamítnuta*/
		Zamitnuto=20,
	}
	const enum StavKryti {
		S_KRYNEU=0,
		S_KRYNAV=10,
		S_KRYSCH=20,
	}
	const enum StavLikvidace {
		S_LIKNEU=0,
		S_LIKNAV=10,
		S_LIKSCH=20,
	}
	const enum StavTisku {
		S_TISKN=0,
		S_TISK=5,
		S_TISKP=10,
	}
	const enum StavStorna {
		S_NESTO=0,
		S_STO=10,
	}
	/**stav parovani s dod. listy*/
	const enum StavParovani {
		/**nespárováno*/
		S_SPANE=0,
		/**částečně spárováno*/
		S_SPACA=10,
		/**spárováno*/
		S_SPAOK=20,
	}
	/**typy vazeb faktur*/
	const enum TypVazebFaktur {
		VAZ_PROFORMA=10,
		VAZ_ZALOHA=20,
		VAZ_PENALE=30,
		VAZ_POKUTA=31,
		VAZ_DOBROPIS=40,
		VAZ_ZAL_DPH=50,
		VAZ_OPR_DPH=60,
		VAZ_PRE=70,
	}
	/**Režim Isprofin*/
	const enum RezimIsp {
		/**Sledování limitů na bú*/
		LimitBu=0,
		/**Sledování limitů na bú a isprofin*/
		LimitBuIsprofin=1,
	}
	/**Režim kontroly částky likvidace*/
	const enum RezimKontrolyLikvidace {
		/**Zapnuta*/
		Zapnuta=0,
		/**Vypnuta*/
		Vypnuta=1,
	}
	/**Kontrola platnosti cizích účtů na šablonách*/
	const enum KontrolaCizichUctuSablon {
		/**Bez kontroly na číselník cizích účtů*/
		BezKontroly=0,
		/**S kontrolou na číselník cizích účtů*/
		SKontrolou=1,
	}
	/**Povolení aktivních operací na cizích šablonách*/
	const enum AktivniOperaceCizichSablon {
		/**Nepovoleny aktivní operace na cizích šablonách*/
		Nepovoleny=0,
		/**Povoleny aktivní operace na cizích šablonách*/
		Povoleny=1,
	}
	/**Režim práce nad knihami*/
	const enum RezimPraceNadKnihami {
		/**Nepovoleny aktivní operace*/
		NepovolenyAktivniOperace=0,
		/**Povoleny aktivní operace*/
		PovolenyAktivniOperace=1,
	}
	/**Režim práce nad dokladem*/
	const enum RezimPraceNadDoklademEnum {
		/**Prohlížení*/
		Prohlizeni=0,
		/**Editace*/
		Editace=10,
	}
	/**Způsob přednastavení popisu dokladu BPL z dokladu modulu SML*/
	const enum PopisDokladuSml {
		/**Přednastavení popisu dokladu BPL popisem dokladu SML*/
		Popis=0,
		/**Přednastavení popisu dokladu BPL popisem a úplným názvem dokladu SML*/
		PopisNazev=1,
	}
	/**Režim výběru knih*/
	const enum RezimVyberuKnih {
		/**jedna kniha*/
		Kniha=0,
		/**všechny knihy*/
		VsechnyKnihy=1,
		/**všechny knihy v akt.roce*/
		VsechnyKnihyAktRok=2,
	}
	/**Přednastavení data splatnosti v dialogu Uhradit'*/
	const enum DatumSplatnostiProUhrady {
		/**Datum splatnosti se nepřednastavuje*/
		Neprednastavuj=0,
		/**Přednastavení na datum splatnosti dokladu*/
		DatumSplatnostiZDokladu=1,
		/**Přednastavení na aktuální datum*/
		AktualniDatum=2,
	}
	/**Přednastavení datumu odúčtování likvidace*/
	const enum DatumOductovaniLikvidace {
		/**Datum odúčtování se nepřednastavuje*/
		Neprednastavuj=0,
		/**Přednastavení na aktuální datum*/
		AktualniDatum=1,
	}
	/**Režim akviziční vazby*/
	const enum RezimSmlVazby {
		/**přístup na kompetenta*/
		komp,
		/**přístup na realizátora*/
		real,
		/**přístup na referenta (v DB je jako 'ref')*/
		refer,
		/**přístup na smlouvy účetního střediska*/
		ucs,
		/**na účtárnu*/
		uus,
		/**přístup na vlastní smlouvy (objednávky)*/
		uzi,
		/**volný*/
		vol,
	}
	/**Použití agendového nebo evidenčního čísla smlouvy na dokladu BPL*/
	const enum PouzitiAgendovehoEvidencnihoCislaSml {
		/**Použití agendového čísla smlouvy na dokladu BPL*/
		Agendove=0,
		/**Použití evidenčního čísla smlouvy na dokladu BPL*/
		Evidencni=1,
	}
	/**příznak aktivity subřady deníku*/
	const enum AktivitaSubradyKnihy {
		/**subřada deníku je otevřena*/
		aktsubOpen=100,
		/**subřada deníku je připravena k uzavření*/
		aktsubPrepClose=300,
		/**subřada deníku je uzavřena a neodlita - znemožnit pořizování nových dokladů do tohoto deníku*/
		aktsubCloseNoCast=400,
		/**subřada deníku je uzavřena a odlita - znemožnit pořizování nových dokladů do tohoto deníku*/
		aktsubClose=500,
	}
	/**Řízení přístupu k uzavíraným knihám*/
	const enum PristupUzavKniham {
		/**žádné*/
		bkaccclNo=0,
		/**přístupné uživateli*/
		bkaccclUser=1,
		/**aktuální ucs*/
		bkaccclUcs=2,
		/**aktuální realizátor*/
		bkaccclReal=3,
	}
	/**Režim kontroly při účtování*/
	const enum RezimKontrolyPriUctovani {
		/**Při schvalování krytí (pokladních položek, účetních či rozpočtových zápisů) se provádí kontrola přípustnosti zadané kombinace rozpočtové skladby vždy oproti účtovému rozvrhu.*/
		zapisovy,
		/**Při schvalování krytí (pokladních položek, účetních či rozpočtových zápisů) se nejprve provádí kontrola, zda již byla zadaná kombinace rozpočtové skladby dříve schválena a kontrola oproti účtovému rozvrhu se provádí pouze v případě, že zadaná kombinace*/
		polozkovy,
	}
	/**Způsob definice agendového čísla*/
	const enum ZpusobDefiniceAc {
		/**Agendové číslo je totožné s evidenčním číslem*/
		ac,
		/**Agendové číslo je definováno manuálně*/
		man,
		/**Agendové číslo je definováno automatizovaně na základě řady agendových čísel*/
		rada,
	}
	/**Evidence dodacích listů*/
	const enum ZpusobEvidenceDodacichListu {
		/**nepovinná*/
		nepovinna,
		/**povinná*/
		povinna,
		/**vypnuta*/
		vypnuta,
	}
	/**Účtování plateb hotově*/
	const enum UctovaniHotove {
		/**platby hotově neúčtovat*/
		ne,
		/**platby hotově účtovat*/
		ano,
		/**Účtovat pouze likvidaci*/
		lik,
	}
	/**Povolení generování variabilního symbolu*/
	const enum GenerovaniVs {
		/**ne*/
		ne,
		/**ano*/
		ano,
		/**ano a editace*/
		anoe,
	}
	/**Enum ano/ne/varování*/
	const enum AnoNeWarn {
		/**ne*/
		ne=0,
		/**ano*/
		ano=1,
		/**varování*/
		warn=2,
	}
	/**Kontrola na rozpočet*/
	const enum KontrolaRozpocet {
		/**provést*/
		ano=1,
		/**neprovádět*/
		ne=0,
		/**skupina účtů*/
		sku=2,
	}
	/**Přístup k vlastním bankovním účtům*/
	const enum PristupBu {
		/**Přístup dle UCS*/
		ucs=0,
		/**Přístup dle knihy*/
		kniha=1,
		/**kniha nebo ucs*/
		kniha_nebo_ucs=2,
		/**Přístup dle UUS nebo ucs*/
		uus_nebo_ucs=3,
	}
	/**Nastavení stavu platby zákládané v modulu BUC*/
	const enum StavPlatbyBuc {
		/**Příkaz bude vždy odeslán modulem BUC*/
		ano,
		/**Příkaz nebude odeslán modulem BUC*/
		ne,
		/**Příkaz nebude odeslán modulem BUC u dokl. v cizí měně*/
		ne_cm,
	}
	/**Režim kurzu*/
	const enum RezimKurzu {
		/**Kursy cizích měn jsou přepočítávány každý den podle stejného kursovního lístku (naposledy zadaného v modulu ADE)*/
		pevny,
		/**Kursy cizích měn jsou přepočítávány podle aktuálního kursovního lístku pro daný den. V tomto případě je nutno zadávat každý den aktuální kursovní lístek pomocí modulu ADE*/
		plovouci,
	}
	/**Režim účtování*/
	const enum RezimUctovani {
		/**Zaúčtováním uhrazené faktury se založí doklad modulu UCT, do něhož se vygenerují účetní zápisy dané krytím, likvidací (pokud byla ve faktuře zadána) a úhradou faktury, které může "vlastník" dokladu UCT dle potřeby upravit a teprve poté je proúčtuje do de*/
		neprime,
		/**Zaúčtováním uhrazené faktury se vygenerují účetní zápisy dané krytím, likvidací (v tomto případě musí být ve faktuře povinně zadána) a úhradou faktury, a tyto zápisy se ihned proúčtují do deníku účetních zápisů*/
		prime,
	}
	/**Vazba na SML*/
	const enum VazbaSml {
		/**bez vazby na smlovy*/
		ne=20,
		/**pevná nebo bez položky*/
		pevbez=0,
		/**pevná*/
		pevna=10,
		/**vazba na smlouvu bez položek*/
		smlbezpol=30,
	}
	/**Typ bankovního účtu*/
	const enum TypBu {
		/**Neurčeno*/
		Neurceno=0,
		/**Výdajový účet*/
		Vydajovy=10,
		/**Příjmový účet*/
		Prijmovy=20,
	}
	/**Režim vazby likvidace na položku SML*/
	const enum VazbaSmlLik {
		/**bez vazby*/
		ne=0,
		/**volná vazba*/
		volna=1,
		/**pevná vazba*/
		pevna=2,
	}
	/**Navázání zálohy na daňový doklad a vyúčtování*/
	const enum VazbaFaz {
		/**Nepovinná*/
		ne=0,
		/**Povinná*/
		ano=1,
	}
	/**Stav položky (up_stav)*/
	const enum StavPolozky {
		/**stornovaná*/
		stornovana=0,
		/**ve stavu návrhu*/
		navrhu=10,
		/**schválená*/
		schvalena=20,
		/**polozka prevedena z agespep do uct. knihy*/
		prevedena,
		/**zaúčtovaná*/
		zauctovana=0,
	}
	/**Import/Export elektronického dokladu*/
	const enum RpEfaktura {
		/**ne*/
		ne,
		/**ano*/
		ano,
	}
	/**Cash stav řádků krytí*/
	const enum CashStavKryti {
		/**částka neni celá vykryta*/
		NevykrytoNeschvaleno=0,
		/**částka je vykryta a neschvalena*/
		VykrytoNeschvaleno=10,
		/**částka je vykryta a schvalena*/
		VykrytoSchvaleno=20,
		/**částka neni celá vykryta a je schválena - chybový stav*/
		NevykrytoSchvaleno=30,
	}
	/**Kontrola závazků pred schvalenim platby*/
	const enum KontrolaPlatby {
		/**bez kontroly*/
		bez_kontroly=0,
		/**s kontrolou*/
		s_kontrolou=1,
	}
	/**Kategorie knihy*/
	const enum KtgDen {
		/**kniha došlých faktur - decentrální*/
		KdfDecentralni=1300,
		/**kniha došlých faktur - centrální*/
		KdfCentralni=1310,
		/**kniha poukazů*/
		Pou=1380,
		/**kniha převodu poukazů*/
		Pre=1390,
		/**kniha odeslaných faktur - decentrální*/
		KofDecentralni=1400,
		/**kniha odeslaných faktur - centrální*/
		KofCentralni=1410,
	}
	/**Typy agend*/
	const enum TypAg {
		/**FUC*/
		FUC=330,
		/**DDP*/
		DDP=350,
		/**INT*/
		INT=300,
		/**KDF*/
		KDF=70,
		/**KOF*/
		KOF=80,
		/**PAM*/
		PAM=430,
		/**POK*/
		POK=90,
		/**POZ*/
		POZ=860,
		/**POU*/
		POU=180,
		/**PRE*/
		PRE=230,
		/**RCN*/
		RCN=700,
		/**SML*/
		SML=110,
		/**SOC*/
		SOC=490,
		/**UCT*/
		UCT=40,
		/**ROZ*/
		ROZ=50,
		/**BUC*/
		BUC=100,
	}
}
declare namespace Gordic.Bpl.Interface {
	/**Typy polí pro obecný výběr*/
	const enum TypPoleObecnehoVyberu {
		/**GDecimal*/
		dec=0,
		/**GString*/
		retez=1,
		/**GDate*/
		datum=2,
		/**Gint16*/
		cele=3,
		/**GDateTime*/
		datumCas=4,
	}
	/**Konstanty pro historii dokladu*/
	const enum KtgHistorieDokladu {
		/**podání*/
		PODANI=1010,
		/**evidence*/
		EVIDENCE=1020,
		/**návrh krytí*/
		NAVRH_KRY=1021,
		/**návrh likvidace*/
		NAVRH_LIK=1022,
		/**schválení*/
		SCHVALENI=1030,
		/**krytí*/
		KRY=703,
		/**likvidace*/
		LIK=704,
		/**likvidace zálohy*/
		LIKZ=705,
		/**schválení storno*/
		SCHVALENI_STORNO=1032,
		/**uhrazeno*/
		UHRAZENO=1040,
		/**proúčtováno*/
		PROUCTOVANO=1050,
		/**uzavřeno*/
		UZAVRENO=1060,
		/**storno*/
		STORNO=1070,
		/**přiděleno*/
		PRIDELENO=1080,
		/**vazba*/
		VAZBA=1100,
		/**vazba storno*/
		VAZBA_STORNO=1110,
	}
	/**Typ kontace (kdfskon.typ_kon)*/
	const enum TypKontace {
		/**Neurčeno*/
		Neurceno=0,
		/**Rozpočtové krytí*/
		RozpKryti=10,
		/**Likvidace*/
		Likvidace=20,
		/**Likvidace záloh*/
		LikvidaceZalohy=25,
	}
	/**Typ agendy*/
	const enum GBplTypAg {
		/**KDF - Knida došlých faktur*/
		KDF=70,
		/**KOF - Kniha odeslaných faktur*/
		KOF=80,
		/**POU - Poukazy*/
		POU=180,
		/**PRE - doplnit*/
		PRE=230,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\IGBplFakturaDosla.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Doklad
	* @domain FakturyDosle
	* @businessObject BplFakturaDosla
	*/
	interface BplFakturaDosla {
		/**Detail Doklad*/
		read(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaDto|CallParams<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>): _Task<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>,GServiceReadResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Seznam Doklad*/
		list(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Založení Doklad*/
		create(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Oprava Doklad*/
		update(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Evidence dokladu*/
		evidence(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaEvidenceDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaEvidenceDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaEvidenceDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Odstranění Doklad*/
		delete(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Zjistí počet dokladů na seznamu*/
		listCount(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaFilterDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Read*/
		readKniha(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaDto|CallParams<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>): _Task<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>,GServiceReadResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Vrátí oprávnění nad doklady (společné pro celý seznam)*/
		getSeznamPermissions(rq?:CallParams<{}>): _Task<{},Gordic.Bpl.Interface.GBplFakturaDoslaSeznamPermission>;
		/**Metoda na duplikování dat ze vzorového dokladu*/
		duplikujDoklad(rq?:CallParams<{zdrojoveIxp:string,noveIxp:string,duplikovaniVyber:Gordic.Bpl.Interface.DuplikovaniDokladuVyberDto}>): _Task<{zdrojoveIxp:string,noveIxp:string,duplikovaniVyber:Gordic.Bpl.Interface.DuplikovaniDokladuVyberDto},Gordic.Bpl.Interface.GBplFakturaDoslaDto>;
		/**Vrátí informace o nalezeném PIDu. Použité pro obecné hledací políčko (GPidSearchResolver)*/
		hledejIdentifikator(rq?:Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GHledejIdentifikatorRequestDto>,GServiceActionResponse<Gordic.Wfl.Interface.GHledejIdentifikatorResponseDto>>;
		/**Kontrola na první doklad v knize*/
		zkontrolujNaPrvniDokladVKnize(rq?:CallParams<{ixpDen:string}>): _Task<{ixpDen:string},string>;
		/**Metoda na kontrolu duplicit VS*/
		zkontrolujDuplicityVS(rq?:CallParams<{cisloFaktury:string,VS:string,pid:string,ixsEsu:string,ktgTyp:string}>): _Task<{cisloFaktury:string,VS:string,pid:string,ixsEsu:string,ktgTyp:string},string>;
		/**Provede ověření DIČ a hlavně účtu v Registru plátců DPH*/
		zapisDoHistorie(rq?:CallParams<{ixp:string,zmena:number,zmenaKtg:number,zmenaTxt:string,poznamka:string}>): _Task<{ixp:string,zmena:number,zmenaKtg:number,zmenaTxt:string,poznamka:string},string>;
		/**Kontrola, zda lze provést úhradu externí pokladnou*/
		moznostExterniUhrady(rq?:CallParams<{ixp:string}>): _Task<{ixp:string},string>;
		/**Zjištění stavu přiznání DPH*/
		zjistiPriznaniDPH(rq?:CallParams<{ico:string,mesic:number,rok:number}>): _Task<{ico:string,mesic:number,rok:number},number>;
		/**Provede ověření DIČ a účtu v Registru plátců DPH - vrací textové vyjádření*/
		zkontrolujRegistrPlatcuDPH(rq?:CallParams<{dic:string,znam:number}>): _Task<{dic:string,znam:number},string>;
		/**Provede ověření DIČ a účtu v Registru plátců DPH - vrací číselné vyjádření*/
		zkontrolujSpolehlivostPlatceDPH(rq?:CallParams<{dic:string,znam:number,ktg_typ:number}>): _Task<{dic:string,znam:number,ktg_typ:number},number>;
		/**Provede ověření DIČ a hlavně účtu v Registru plátců DPH*/
		zkontrolujUcetPlatcuDPH(rq?:CallParams<{dic:string,znam:number,bu_ci:string,sk_ci:string}>): _Task<{dic:string,znam:number,bu_ci:string,sk_ci:string},string>;
		/**Provede ověření DIČ a účtu v Registru plátců DPH*/
		zkontrolujUcetPlatcuDPH(rq?:CallParams<{dic:string,BUCI:string}>): _Task<{dic:string,BUCI:string},string>;
		/**Vrátí uzavřenost účetního období*/
		kontrolaOtevreniUcetnihoObdobi(rq?:CallParams<{datum:JsonDate}>): _Task<{datum:JsonDate},number>;
		/**Úhrada externí pokladnou*/
		uhradaExterniPokladnou(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaExterniUhradaDto|CallParams<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaExterniUhradaDto>>): _Task<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaExterniUhradaDto>,GServiceActionResponse<Gordic.Bpl.Interface.GBplFakturaDoslaExterniUhradaDto>>;
		/**Vytěží QR kódu z řetězce*/
		qRkodVytezeni(rq?:Gordic.Bpl.Interface.GBplSupportDto|CallParams<GServiceActionRequest<Gordic.Bpl.Interface.GBplSupportDto>>): _Task<GServiceActionRequest<Gordic.Bpl.Interface.GBplSupportDto>,GServiceActionResponse<Gordic.Eko.Interface.GAiRecognizerRecognizeExtendedResponseDto>>;
		/**Vytěží data ze souboru ISDOC*/
		importISDOC(rq?:Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>,GServiceActionResponse<Gordic.Gin.Interface.GAiRecognizerRecognizeResponseDto>>;
		/**Vytěží data ze souboru pomocí AI*/
		aiVytezeniSouboru(rq?:Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>,GServiceActionResponse<Gordic.Eko.Interface.GAiRecognizerRecognizeExtendedResponseDto>>;
		/**Zjištění aktuálního ixs_ulo pro daný doklad*/
		zjistiIxsUlo(rq?:Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>,string>;
		/**Zjištění aktuálního typu souboru pro daný doklad*/
		zjistiTypSouboru(rq?:Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>,string>;
		/**Zjištění aktuálních informací o souboru pro daný doklad*/
		zjistiInformaceSouboru(rq?:Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto|CallParams<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>>): _Task<GServiceActionRequest<Gordic.Wfl.Interface.GPrilohaElektronickaAiRecognizeRequestDto>,Gordic.Ele.Interface.GFileIXBDto>;
		/**UPDATNE rekapitulaci faktury a udělá zápis do historie*/
		vratRekapitulaciPolozek(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaDto|CallParams<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>): _Task<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaDto>,GServiceReadResponse<Gordic.Bpl.Interface.GBplFakturaDoslaDto>>;
		/**Kontrola před odesláním úhrady do banky*/
		kontrolaPredOdeslanimDoBanky(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaUhradaDto|CallParams<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUhradaDto>>): _Task<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUhradaDto>,GServiceActionResponse<Gordic.Bpl.Interface.GBplFakturaDoslaUhradaDto>>;
		/**Kontrola dokladů pro hormadnou FIK*/
		validaceDokladuNaFinancniKontrolu(rq?:CallParams<{List_ixp:string[]}>): _Task<{List_ixp:string[]},Gordic.Bpl.Interface.GBplKontrolaDokladuDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BplFakturaDosla: ServiceBase & Catalog.BplFakturaDosla;
	}
	const BplFakturaDosla: Client["BplFakturaDosla"];
}
declare namespace Gordic.Bpl.Interface {
	/**Oprávnění pro práci nad seznamem dokladů BPL*/
	interface GBplFakturaDoslaSeznamPermission extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Lze zobrazit*/
		LzeZobrazit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze podat*/
		LzePodat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze evidovat*/
		LzeEvidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze editovat*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze stornovat*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zrušit storno*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**Lze tisknout*/
		LzeTisknout: Gordic.General.ApplicationInterface.GPermission;
		/**Lze účtovat*/
		LzeUctovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze předat*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze přidělit*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze převzít*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze přeevidovat*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uzavřít*/
		LzeUzavrit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zrušit uzavření*/
		LzeZrusitUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uhradit*/
		LzeUhradit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze použít Hromadnou FK*/
		LzeFk: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBplFakturaDoslaSeznamPermissionNames { LzeZobrazit = "LzeZobrazit", LzePodat = "LzePodat", LzeEvidovat = "LzeEvidovat", LzeEditovat = "LzeEditovat", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeTisknout = "LzeTisknout", LzeUctovat = "LzeUctovat", LzePredat = "LzePredat", LzePridelit = "LzePridelit", LzePrevzit = "LzePrevzit", LzePreevidovat = "LzePreevidovat", LzeUzavrit = "LzeUzavrit", LzeZrusitUzavreni = "LzeZrusitUzavreni", LzeUhradit = "LzeUhradit", LzeFk = "LzeFk",}
	const enum GBplFakturaDoslaSeznamPermissionFragments { LzeZobrazit = "*", LzePodat = "*", LzeEvidovat = "*", LzeEditovat = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeTisknout = "*", LzeUctovat = "*", LzePredat = "*", LzePridelit = "*", LzePrevzit = "*", LzePreevidovat = "*", LzeUzavrit = "*", LzeZrusitUzavreni = "*", LzeUhradit = "*", LzeFk = "*",}
	const enum GBplFakturaDoslaSeznamPermissionTypes { LzeZobrazit = "Gordic.General.ApplicationInterface.GPermission", LzePodat = "Gordic.General.ApplicationInterface.GPermission", LzeEvidovat = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeTisknout = "Gordic.General.ApplicationInterface.GPermission", LzeUctovat = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzeUzavrit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreni = "Gordic.General.ApplicationInterface.GPermission", LzeUhradit = "Gordic.General.ApplicationInterface.GPermission", LzeFk = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBplFakturaDoslaSeznamPermissionTypeLengths {}
	/**Filtr pro Doklad*/
	const enum GBplFakturaDoslaFilter {
		/**ixp*/
		ixp,
		/**lic*/
		lic,
		/**ixs_esu*/
		ixs_esu,
		/**ico_esu*/
		ico_esu,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**uus*/
		uus,
		/**nks*/
		nks,
		/**ac_esu*/
		ac_esu,
		/**popis*/
		popis,
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
		/**ixp_den*/
		ixp_den,
		/**rok_den*/
		rok_den,
		/**ac*/
		ac,
		/**ps_sml_stav*/
		ps_sml_stav,
		/**ps_sml*/
		ps_sml,
		/**dat_vyst*/
		dat_vyst,
		/**dat_spl*/
		dat_spl,
		/**dat_zdan*/
		dat_zdan,
		/**dat_zau*/
		dat_zau,
		/**dat_uhr*/
		dat_uhr,
		/**dat_kry*/
		dat_kry,
		/**dat_lik*/
		dat_lik,
		/**dat_pol*/
		dat_pol,
		/**mena*/
		mena,
		/**c_mena*/
		c_mena,
		/**c_celk*/
		c_celk,
		/**c_kuhr*/
		c_kuhr,
		/**c_zust*/
		c_zust,
		/**c_kzauc*/
		c_kzauc,
		/**c_z0*/
		c_z0,
		/**c_d0*/
		c_d0,
		/**c_z1*/
		c_z1,
		/**c_d1*/
		c_d1,
		/**c_z2*/
		c_z2,
		/**c_d2*/
		c_d2,
		/**c_upr*/
		c_upr,
		/**s_por*/
		s_por,
		/**s_uhr*/
		s_uhr,
		/**s_kuhr*/
		s_kuhr,
		/**s_kry*/
		s_kry,
		/**s_lik*/
		s_lik,
		/**s_zau*/
		s_zau,
		/**s_sto*/
		s_sto,
		/**s_tis*/
		s_tis,
		/**ktg_typ*/
		ktg_typ,
		/**ixs_typ*/
		ixs_typ,
		/**eko_akt*/
		eko_akt,
		/**dat_evid*/
		dat_evid,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**znam*/
		znam,
		/**ixs_fun_akt*/
		ixs_fun_akt,
		/**c_vaz*/
		c_vaz,
		/**rok_dph*/
		rok_dph,
		/**mesic_dph*/
		mesic_dph,
		/**priz_dph*/
		priz_dph,
		/**c_dor*/
		c_dor,
		/**kurz*/
		kurz,
		/**dat_uup*/
		dat_uup,
		/**priz_view*/
		priz_view,
		/**ac_ag*/
		ac_ag,
		/**c_sazba_pen*/
		c_sazba_pen,
		/**proc_sazba_pen*/
		proc_sazba_pen,
		/**typ_pen*/
		typ_pen,
		/**stav_vym*/
		stav_vym,
		/**c_za_z*/
		c_za_z,
		/**c_za_d*/
		c_za_d,
		/**cis_real*/
		cis_real,
		/**ixs_fun_vyriz*/
		ixs_fun_vyriz,
		/**nepřipraveno k uzavření*/
		neprip_uza,
		/**typ_dor*/
		typ_dor,
		/**c_vaz_mena*/
		c_vaz_mena,
		/**c_vyuc*/
		c_vyuc,
		/**c_zx*/
		c_zx,
		/**priz_por*/
		priz_por,
		/**priz_opp*/
		priz_opp,
		/**typ_upr*/
		typ_upr,
		/**s_cro*/
		s_cro,
		/**priz_pdp*/
		priz_pdp,
		/**kurz_akt*/
		kurz_akt,
		/**c_celk_mena*/
		c_celk_mena,
		/**c_zust_mena*/
		c_zust_mena,
		/**c_kuhr_mena*/
		c_kuhr_mena,
		/**c_z1d*/
		c_z1d,
		/**uhrazeno*/
		c_uhrazeno,
		/**c_d1d*/
		c_d1d,
		/**c_z2d*/
		c_z2d,
		/**c_d2d*/
		c_d2d,
		/**c_vyuc_mena*/
		c_vyuc_mena,
		/**dat_dor*/
		dat_dor,
		/**c_z3*/
		c_z3,
		/**c_d3*/
		c_d3,
		/**c_z3d*/
		c_z3d,
		/**c_d3d*/
		c_d3d,
		/**c_z4*/
		c_z4,
		/**c_d4*/
		c_d4,
		/**c_z4d*/
		c_z4d,
		/**c_d4d*/
		c_d4d,
		/**priz_fuc*/
		priz_fuc,
		/**Účetní zápisy*/
		cfuDto,
		/**Příjmy a výdaje*/
		zav_poh,
		/**Stavy dorovnání*/
		s_dor,
		/**Neuhrazeno k datu*/
		dat_neuhr,
		/**Počet dnů po splatnosti*/
		dnu_po_spl,
		/**Prohledat i historii*/
		historie,
		/**Historické doklady v historii*/
		historie_uzivatel,
		/**Vlastní doklady*/
		vlastni,
		/**Typ pohledu*/
		typ_pohledu,
		/**Rodné číslo*/
		rc,
		/**Ekonomický identifikátor*/
		ixs_eko,
		/**Typ organizace*/
		typ_org,
		/**Stav insolvence*/
		stav_insolv,
		/**Stav evidence*/
		s_evi,
		/**Stav FIK*/
		priz_FIK,
		/**Stav ÚK*/
		priz_UK,
		/**Stav obecného schvalovacího procesu*/
		priz_SP,
		/**Stav schvalovacího procesu EKO*/
		priz_EKO,
		/**Ekonomický subjekt*/
		eko_subjekt,
		/**Externí subjekt*/
		esu_ixs_esu,
		/**Klíčová slova*/
		wfl_kl_slovo,
		/**Rozšířující vlastnosti*/
		vlastnosti_r,
		/**Popisné vlastnosti*/
		vlastnosti_s,
		/**ixs_mask*/
		ixs_mask,
		/**seznam dokladů*/
		List_ixp,
		/**voláno externí agendou*/
		typ_ag_ext,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\IGBplFakturaDoslaPlatby.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Platby
	* @domain FakturyDosle
	* @businessObject BplFakturaDoslaPlatby
	*/
	interface BplFakturaDoslaPlatby {
		/**Detail Platby*/
		read(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto|CallParams<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>>): _Task<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>,GServiceReadResponse<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>>;
		/**Seznam Platby*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>>;
		/**Oprava Platby*/
		update(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>>;
		/**Seznam Platby*/
		list_PodPlatby(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bpl.Interface.GBplFakturaDoslaPlatbyDto>>;
		/**Stav úhrady*/
		stavUhradyBUC(rq?:CallParams<{ixp:string,zp:number,znam:number,stav:number}>): _Task<{ixp:string,zp:number,znam:number,stav:number},boolean>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BplFakturaDoslaPlatby: ServiceBase & Catalog.BplFakturaDoslaPlatby;
	}
	const BplFakturaDoslaPlatby: Client["BplFakturaDoslaPlatby"];
}
declare namespace Gordic.Bpl.Interface {
	/**Filtr pro Platby*/
	const enum GBplFakturaDoslaPlatbyFilter {
		/**ixp*/
		ixp,
		/**radek_uhr*/
		radek_uhr,
		/**subradek*/
		subradek,
		/**lic*/
		lic,
		/**eko_akt*/
		eko_akt,
		/**arw*/
		arw,
		/**ixs_esu*/
		ixs_esu,
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
		/**bu_txt_vl*/
		bu_txt_vl,
		/**sk_ci*/
		sk_ci,
		/**bu_ci*/
		bu_ci,
		/**bu_txt_ci*/
		bu_txt_ci,
		/**zp*/
		zp,
		/**ac*/
		ac,
		/**ixp_den*/
		ixp_den,
		/**s_uhrp*/
		s_uhrp,
		/**c*/
		c,
		/**c_par*/
		c_par,
		/**dat_spl*/
		dat_spl,
		/**dat_zap*/
		dat_zap,
		/**dat_par*/
		dat_par,
		/**dat_kuhr*/
		dat_kuhr,
		/**typ_ag*/
		typ_ag,
		/**ktg_typ*/
		ktg_typ,
		/**cis_bdo*/
		cis_bdo,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
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
		/**id_platby*/
		id_platby,
		/**ktg_upo*/
		ktg_upo,
		/**dat_vzniku*/
		dat_vzniku,
		/**radek_upo*/
		radek_upo,
		/**por_cislo_int*/
		por_cislo_int,
		/**rok*/
		rok,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
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
		/**c_par_mena*/
		c_par_mena,
		/**ixp_real*/
		ixp_real,
		/**ixs_ext*/
		ixs_ext,
		/**priz_nepar*/
		priz_nepar,
		/**popis*/
		popis,
		/**sds*/
		sds,
		/**priz_pred_rcdn*/
		priz_pred_rcdn,
		/**c_z0_par*/
		c_z0_par,
		/**c_d0_par*/
		c_d0_par,
		/**c_z1_par*/
		c_z1_par,
		/**c_d1_par*/
		c_d1_par,
		/**c_z2_par*/
		c_z2_par,
		/**c_d2_par*/
		c_d2_par,
		/**c_zao_par*/
		c_zao_par,
		/**ixs_zmp_prik*/
		ixs_zmp_prik,
		/**pri_uhr*/
		pri_uhr,
		/**dat_sch*/
		dat_sch,
		/**radek_upo_rez*/
		radek_upo_rez,
		/**priz_rez_pri*/
		priz_rez_pri,
		/**ixp_sml*/
		ixp_sml,
		/**rok_sml*/
		rok_sml,
		/**cislo_sml*/
		cislo_sml,
		/**dsp*/
		dsp,
		/**kurz*/
		kurz,
		/**alg_par*/
		alg_par,
		/**ixp_vaz*/
		ixp_vaz,
		/**dat_spl_ag*/
		dat_spl_ag,
		/**c_z3_par*/
		c_z3_par,
		/**c_d3_par*/
		c_d3_par,
		/**c_z4_par*/
		c_z4_par,
		/**c_d4_par*/
		c_d4_par,
		/**uus*/
		uus,
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
		/**ixp_par*/
		ixp_par,
		/**cislo_par*/
		cislo_par,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\IGBplFakturaDoslaUctovaniKrytiLikvidace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Účtování krytí a likvidace
	* @domain FakturyDosle
	* @businessObject BplFakturaDoslaUctovaniKrytiLikvidace
	*/
	interface BplFakturaDoslaUctovaniKrytiLikvidace {
		/**Detail Platby*/
		read(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto|CallParams<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>): _Task<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>,GServiceReadResponse<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>;
		/**Seznam Platby*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>;
		/**Založení Platby*/
		create(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>;
		/**Oprava Platby*/
		update(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>;
		/**Oprava resp. založení Platby*/
		upsert(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>;
		/**Odstranění Platby*/
		delete(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaUctovaniKrytiLikvidaceDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BplFakturaDoslaUctovaniKrytiLikvidace: ServiceBase & Catalog.BplFakturaDoslaUctovaniKrytiLikvidace;
	}
	const BplFakturaDoslaUctovaniKrytiLikvidace: Client["BplFakturaDoslaUctovaniKrytiLikvidace"];
}
declare namespace Gordic.Bpl.Interface {
	/**Filtr pro Platby*/
	const enum GBplFakturaDoslaUctovaniKrytiLikvidaceFilter {
		/**ixp*/
		ixp,
		/**radek*/
		radek,
		/**lic*/
		lic,
		/**aktivita*/
		aktivita,
		/**up_stav*/
		up_stav,
		/**nazev*/
		nazev,
		/**ixs_kon*/
		ixs_kon,
		/**c*/
		c,
		/**znam*/
		znam,
		/**dat_zauc*/
		dat_zauc,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**ico*/
		ico,
		/**ucs*/
		ucs,
		/**nks*/
		nks,
		/**te0*/
		te0,
		/**te1*/
		te1,
		/**te2*/
		te2,
		/**te3*/
		te3,
		/**te4*/
		te4,
		/**uea*/
		uea,
		/**ueb*/
		ueb,
		/**uec*/
		uec,
		/**ued*/
		ued,
		/**uee*/
		uee,
		/**uef*/
		uef,
		/**ueg*/
		ueg,
		/**ueh*/
		ueh,
		/**uei*/
		uei,
		/**uej*/
		uej,
		/**rok_dph*/
		rok_dph,
		/**mesic_dph*/
		mesic_dph,
		/**c_kr*/
		c_kr,
		/**typ_kr*/
		typ_kr,
		/**typ_oper*/
		typ_oper,
		/**subrada_duz*/
		subrada_duz,
		/**uus*/
		uus,
		/**radek_pre*/
		radek_pre,
		/**c_krp*/
		c_krp,
		/**typ_krp*/
		typ_krp,
		/**radek_hdr*/
		radek_hdr,
		/**id_hdr_ris*/
		id_hdr_ris,
		/**ixp_bvp*/
		ixp_bvp,
		/**radek_pol*/
		radek_pol,
		/**subradek*/
		subradek,
		/**radek_av*/
		radek_av,
		/**ixp_ud*/
		ixp_ud,
		/**typ_kon*/
		typ_kon,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\IGBplFakturaDoslaVazby.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Vazby
	* @domain FakturyDosle
	* @businessObject BplFakturaDoslaVazby
	*/
	interface BplFakturaDoslaVazby {
		/**Seznam Vazeb*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto>>;
		/**Seznam pro výběr vazeb*/
		listVyber(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVyberVazebDto>>;
		/**Oprava Vazby*/
		vytvorVazbu(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVazbyPripravaRequestDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyPripravaRequestDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyPripravaRequestDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto>>;
		/**Oprava Vazby*/
		opravVazbu(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto>>;
		/**Oprava Vazby*/
		zrusVazbu(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto|CallParams<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto>>): _Task<GServiceActionRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVazbyDto>,void>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BplFakturaDoslaVazby: ServiceBase & Catalog.BplFakturaDoslaVazby;
	}
	const BplFakturaDoslaVazby: Client["BplFakturaDoslaVazby"];
}
declare namespace Gordic.Bpl.Interface {
	/**Filtr pro Vazby.*/
	const enum GBplFakturaDoslaVazbyFilter {
		/**Identifikátor fak.*/
		ixp_fak,
		/**Identifikátor.*/
		ixp,
		/**Vaz fak.*/
		vaz_fak,
		/**Aktivita.*/
		aktivita,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Částka.*/
		c,
		/**C z0.*/
		c_z0,
		/**C zx.*/
		c_zx,
		/**C z1.*/
		c_z1,
		/**C d1.*/
		c_d1,
		/**C z2.*/
		c_z2,
		/**C d2.*/
		c_d2,
		/**C zaok.*/
		c_zaok,
		/**C z1d.*/
		c_z1d,
		/**C d1d.*/
		c_d1d,
		/**C z2d.*/
		c_z2d,
		/**C d2d.*/
		c_d2d,
		/**C z3.*/
		c_z3,
		/**C d3.*/
		c_d3,
		/**C z3d.*/
		c_z3d,
		/**C d3d.*/
		c_d3d,
		/**C z4.*/
		c_z4,
		/**C d4.*/
		c_d4,
		/**C z4d.*/
		c_z4d,
		/**C d4d.*/
		c_d4d,
		/**C měna.*/
		c_mena,
		ico_esu,
		nazev_esu,
		ac_esu,
		ucs,
		pouzeZalohy,
		rok,
		typVazby,
		ktg,
		mena,
		ktg_typ_detail,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\IGBplFakturaDoslaVecnyProfil.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Věcný profil
	* @domain FakturyDosle
	* @businessObject BplFakturaDoslaVecnyProfil
	*/
	interface BplFakturaDoslaVecnyProfil {
		/**Detail Věcný profil.*/
		read(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto|CallParams<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>): _Task<GServiceReadRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>,GServiceReadResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>;
		/**Seznam Věcný profil.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>;
		/**Počet Věcný profil.*/
		listCount(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,number>;
		/**Založení Věcný profil.*/
		create(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>;
		/**Oprava Věcný profil.*/
		update(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>;
		/**Oprava resp. založení Věcný profil.*/
		upsert(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>;
		/**Odstranění Věcný profil.*/
		delete(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>;
		/**Kopie položky věcného profilu*/
		copy(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilDto>>;
		/**Uloží popisy nad a pod položkami VP*/
		ulozPopisy(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto>>;
		/**Načti popisy nad a pod položkami VP*/
		nactiPopisy(rq?:Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto|CallParams<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto>>): _Task<GServiceSaveRequest<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto>,GServiceSaveResponse<Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPopisDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BplFakturaDoslaVecnyProfil: ServiceBase & Catalog.BplFakturaDoslaVecnyProfil;
	}
	const BplFakturaDoslaVecnyProfil: Client["BplFakturaDoslaVecnyProfil"];
}
declare namespace Gordic.Bpl.Interface {
	/**Filtr pro Věcný profil*/
	const enum GBplFakturaDoslaVecnyProfilFilter {
		/**Identifikátor.*/
		ixp,
		/**Radek pol.*/
		radek_pol,
		/**Lic.*/
		lic,
		/**Aktivita.*/
		aktivita,
		/**Arw.*/
		arw,
		/**Mp Stav.*/
		mp_stav,
		/**Název.*/
		nazev,
		/**Částka.*/
		c,
		/**C upr.*/
		c_upr,
		/**Dan Typ.*/
		dan_typ,
		/**C dan.*/
		c_dan,
		/**Mj.*/
		mj,
		/**M.*/
		m,
		/**C měna.*/
		c_mena,
		/**Mjm.*/
		mjm,
		/**Datum změny.*/
		dat_zmena,
		/**Identifikátor změnu provedl.*/
		zmenu_prov,
		/**Kód pol.*/
		kod_pol,
		/**Cmj.*/
		cmj,
		/**Dan proc.*/
		dan_proc,
		/**Typ pol.*/
		typ_pol,
		/**Priz pdp.*/
		priz_pdp,
		/**Identifikátor maj.*/
		ixs_maj,
		/**Identifikátor maj.*/
		ixp_maj,
		/**Maj popis.*/
		maj_popis,
		/**Maj ser číslo.*/
		maj_ser_cislo,
		/**C upr czk.*/
		c_upr_czk,
		/**C dan czk.*/
		c_dan_czk,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\IGBplPredikcePredkontace.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**ISL rozhraní pro predikci předkontace*/
	interface BplPredikcePredkontace {
		/**Vrátí první nejpravděpodobnější predkontaci*/
		posledniPredkontace(rq?:CallParams<{ixsEsu:string}>): _Task<{ixsEsu:string},Gordic.Bpl.Interface.GBplPredikcePredkontaceDto>;
		/**Vrátí použité předkontace vč pravděpdoobností výskytu. Řazeno dle poslední změny (poslední použití) sestupně (poslední použitá = první v kolekci)*/
		predikujPredkontaciList(rq?:CallParams<{ixsEsu:string,lastMonths:number}>): _Task<{ixsEsu:string,lastMonths:number},Gordic.Bpl.Interface.GBplPredikcePredkontaceDto[]>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BplPredikcePredkontace: ServiceBase & Catalog.BplPredikcePredkontace;
	}
	const BplPredikcePredkontace: Client["BplPredikcePredkontace"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\IGBplSupport.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - Poznámky pro cesty a příkazy
	* @domain FakturyDosle
	* @businessObject BplFakturaDosla
	*/
	interface BplSupport {
	}
}
declare namespace Gordic.Isl {
	interface Client {
		BplSupport: ServiceBase & Catalog.BplSupport;
	}
	const BplSupport: Client["BplSupport"];
}
declare namespace Gordic.Bpl.Interface {
	/**Filtr pro podpůrné metody BPL*/
	const enum GBplSupportFilter {
		/**Identifikátor (ixp)*/
		ixp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro BplFakturaDosla*/
	interface GBplFakturaDoslaDto {
		/**ixp*/
		ixp?: string|null;
		/**lic*/
		lic?: string|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
		/**ico_esu*/
		ico_esu?: string|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
		/**nks*/
		nks?: string|null;
		/**ac_esu*/
		ac_esu?: string|null;
		/**popis*/
		popis?: string|null;
		/**Popis dlouhý*/
		popis_dlouhy?: string|null;
		/**Poznámka pro příjemce*/
		poznamka?: string|null;
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
		/**bu_ci/sk_ci*/
		BUCI?: string|null;
		/**bu_vl/sk_vl*/
		BUVL?: string|null;
		/**zp*/
		zp?: number|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**ac*/
		ac?: string|null;
		/**ps_sml_stav*/
		ps_sml_stav?: number|null;
		/**ps_sml*/
		ps_sml?: string|null;
		/**dat_vyst*/
		dat_vyst?: JsonDate|null;
		/**dat_spl*/
		dat_spl?: JsonDate|null;
		/**dat_zdan*/
		dat_zdan?: JsonDate|null;
		/**dat_zau*/
		dat_zau?: JsonDate|null;
		/**dat_uhr*/
		dat_uhr?: JsonDate|null;
		/**dat_kry*/
		dat_kry?: JsonDate|null;
		/**dat_lik*/
		dat_lik?: JsonDate|null;
		/**mena*/
		mena?: number|null;
		/**c_mena*/
		c_mena?: JsonDecimal|null;
		/**c_celk*/
		c_celk?: JsonDecimal|null;
		/**c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**c_zust*/
		c_zust?: JsonDecimal|null;
		/**c_kzauc*/
		c_kzauc?: JsonDecimal|null;
		/**c_z0*/
		c_z0?: JsonDecimal|null;
		/**c_d0*/
		c_d0?: JsonDecimal|null;
		/**c_z1*/
		c_z1?: JsonDecimal|null;
		/**c_d1*/
		c_d1?: JsonDecimal|null;
		/**c_z2*/
		c_z2?: JsonDecimal|null;
		/**c_d2*/
		c_d2?: JsonDecimal|null;
		/**c_upr*/
		c_upr?: JsonDecimal|null;
		/**s_por*/
		s_por?: number|null;
		/**s_uhr*/
		s_uhr?: number|null;
		/**s_kry*/
		s_kry?: number|null;
		/**s_lik*/
		s_lik?: number|null;
		/**s_zau*/
		s_zau?: number|null;
		/**s_sto*/
		s_sto?: number|null;
		/**s_tis*/
		s_tis?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**eko_akt*/
		eko_akt?: number|null;
		/**dat_evid*/
		dat_evid?: JsonDate|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**znam*/
		znam?: number|null;
		/**c_vaz*/
		c_vaz?: JsonDecimal|null;
		/**rok_dph*/
		rok_dph?: number|null;
		/**mesic_dph*/
		mesic_dph?: number|null;
		/**priz_dph*/
		priz_dph?: number|null;
		/**c_dor*/
		c_dor?: JsonDecimal|null;
		/**kurz*/
		kurz?: JsonDecimal|null;
		/**dat_uup*/
		dat_uup?: JsonDate|null;
		/**priz_view*/
		priz_view?: number|null;
		/**ac_ag*/
		ac_ag?: string|null;
		/**c_sazba_pen*/
		c_sazba_pen?: JsonDecimal|null;
		/**proc_sazba_pen*/
		proc_sazba_pen?: JsonDecimal|null;
		/**typ_pen*/
		typ_pen?: number|null;
		/**stav_vym*/
		stav_vym?: number|null;
		/**c_za_z*/
		c_za_z?: JsonDecimal|null;
		/**c_za_d*/
		c_za_d?: JsonDecimal|null;
		/**cis_real*/
		cis_real?: string|null;
		/**ixs_fun_vyriz*/
		ixs_fun_vyriz?: string|null;
		/**typ_dor*/
		typ_dor?: number|null;
		/**c_vaz_mena*/
		c_vaz_mena?: JsonDecimal|null;
		/**c_vyuc*/
		c_vyuc?: JsonDecimal|null;
		/**c_zx*/
		c_zx?: JsonDecimal|null;
		/**priz_por*/
		priz_por?: number|null;
		/**priz_opp*/
		priz_opp?: number|null;
		/**typ_upr*/
		typ_upr?: string|null;
		/**s_cro*/
		s_cro?: number|null;
		/**priz_pdp*/
		priz_pdp?: number|null;
		/**kurz_akt*/
		kurz_akt?: JsonDecimal|null;
		/**c_celk_mena*/
		c_celk_mena?: JsonDecimal|null;
		/**c_zust_mena*/
		c_zust_mena?: JsonDecimal|null;
		/**c_kuhr_mena*/
		c_kuhr_mena?: JsonDecimal|null;
		/**c_z1d*/
		c_z1d?: JsonDecimal|null;
		/**c_d1d*/
		c_d1d?: JsonDecimal|null;
		/**c_z2d*/
		c_z2d?: JsonDecimal|null;
		/**c_d2d*/
		c_d2d?: JsonDecimal|null;
		/**c_vyuc_mena*/
		c_vyuc_mena?: JsonDecimal|null;
		/**dat_dor*/
		dat_dor?: JsonDate|null;
		/**c_z3*/
		c_z3?: JsonDecimal|null;
		/**c_d3*/
		c_d3?: JsonDecimal|null;
		/**c_z3d*/
		c_z3d?: JsonDecimal|null;
		/**c_d3d*/
		c_d3d?: JsonDecimal|null;
		/**c_z4*/
		c_z4?: JsonDecimal|null;
		/**c_d4*/
		c_d4?: JsonDecimal|null;
		/**c_z4d*/
		c_z4d?: JsonDecimal|null;
		/**c_d4d*/
		c_d4d?: JsonDecimal|null;
		/**priz_fuc*/
		priz_fuc?: number|null;
		/**je doklad odlitý? (0 = ne, >0 = ano)*/
		priz_xx?: number|null;
		/**ico*/
		dic?: string|null;
		/**rc*/
		rc?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**ps_sml_ac - hodnota podle parametru bpl_zsml_ac => 0 = agendové číslo, 1 = evidenční číslo*/
		ps_sml_ac?: string|null;
		/**barevný puntík*/
		uzo?: string|null;
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
		/**typ agendy*/
		typ_ag?: number|null;
		/**stav písemnosti*/
		stav_pis?: number|null;
		/**stav schválení*/
		s_schval?: number|null;
		/**zpracovatel*/
		ixs_fun_akt?: string|null;
		/**stav finanční kontroly*/
		fik?: number|null;
		/**stav účetní kontroly*/
		uk?: number|null;
		/**stav finanční kontroly*/
		stav_fk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav účetní kontroly*/
		stav_uk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav průběžné kontroly*/
		stav_pk?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**stav EKO schvalovacího procesu*/
		stav_eko_schval?: Gordic.Wfl.Interface.GWflvdfkDto|null;
		/**Název knihy*/
		ixp_den_txt?: string|null;
		/**Rok knihy (dokladu)*/
		rok_dokladu?: number|null;
		/**mena_txt*/
		mena_zkr?: string|null;
		/**zp_txt*/
		zp_txt?: string|null;
		/**priz_view_txt*/
		priz_view_zkr?: string|null;
		/**ktg_typ_zkr*/
		ktg_typ_zkr?: string|null;
		/**priz_dd*/
		priz_dd?: number|null;
		/**ktg_typ_txt*/
		ktg_typ_txt?: string|null;
		/**ixs_typ_txt*/
		ixs_typ_txt?: string|null;
		/**priz_ozp*/
		priz_ozp?: number|null;
		/**Zpracovatel*/
		ixs_fun_txt?: string|null;
		/**Kompetent*/
		ixs_fun_vyriz_txt?: string|null;
		/**Realizátor*/
		cis_real_txt?: string|null;
		/**Počet provedený přepočtů kurzů*/
		prepoctene?: number|null;
		/**Suma základů za položky VP (aktivní) v CZK*/
		c_pol?: JsonDecimal|null;
		/**Suma daní za položky VP (aktivní) v CZK*/
		c_pol_dan?: JsonDecimal|null;
		/**ixs_esu_pla*/
		ixs_esu_pla?: string|null;
		/**ixs_esu_pla_old*/
		ixs_esu_pla_old?: string|null;
		/**Permissions*/
		Permissions?: Gordic.Bpl.Interface.GBplFakturaDoslaPermissions|null;
		/**Počet řádků krytí*/
		pocet_radku_kryti?: number|null;
		/**Počet řádků likvidace*/
		pocet_radku_likvidace?: number|null;
		/**Počet řádků likvidace záloh*/
		pocet_radku_likvidace_zaloh?: number|null;
		/**Počet řádků účtování*/
		pocet_radku_k_zauctovani?: number|null;
		/**Počet řádků controlling*/
		cnt?: number|null;
		/**Částka zaokrouhlení*/
		c_zaokr?: JsonDecimal|null;
		/**Částka krytí*/
		suma_kry?: JsonDecimal|null;
		/**Částka krytí - schváleno v aktuálním roce*/
		suma_kry_sch_akt_rok?: JsonDecimal|null;
		/**Částka krytí - schváleno celkem*/
		suma_kry_sch?: JsonDecimal|null;
		/**Částka likvidace*/
		suma_lik?: JsonDecimal|null;
		/**Částka likvidace - schváleno*/
		suma_lik_sch?: JsonDecimal|null;
		/**Částka likvidace záloh - schváleno*/
		suma_lik_zal_sch?: JsonDecimal|null;
		/**Částka likvidace záloh*/
		suma_lik_zal?: JsonDecimal|null;
		/**Stav likvidace záloh*/
		s_lik_zal?: number|null;
		/**Suma z přepočtu kurzů (bpldpzp.c_zap)*/
		c_zap?: JsonDecimal|null;
		/**Suma z přepočtu kurzů (bpldpzp.c_zap_mena)*/
		c_zap_mena?: JsonDecimal|null;
		/**Suma k zaúčtování (xxxspep.c)*/
		suma_k_zauctovani?: JsonDecimal|null;
		/**Suma k zaúčtování (xxxspep.c)*/
		suma_zauctovano?: JsonDecimal|null;
		/**DBCOLUMN:DetailDokladuKdf.dvoji_uctovani*/
		dvoji_uctovani?: boolean|null;
		/**???*/
		ixp_vaz?: string|null;
		/**Počet vlastních bankovních účtů v rozpisu plateb*/
		pocet_buvl?: number|null;
		/**Příznak splátky kalendáře*/
		priz_splatky?: number|null;
		/**DBCOLUMN:DetailDokladuKdf.priz_pomer*/
		priz_pomer?: number|null;
		/**Stav evidence*/
		s_evi?: number|null;
		/**Stav FK*/
		priz_FIK?: number|null;
		/**Stav ÚK*/
		priz_UK?: number|null;
		/**Stav Obesného schvalovacího procesu*/
		priz_SP?: number|null;
		/**Stav schvalovacího procesu EKO*/
		priz_EKO?: number|null;
		/**Stav písemnosti FK k dokladu*/
		fk_stav_pis?: number|null;
		/**FK Aktivní*/
		FkAktivni?: boolean|null;
		/**FK aktivní dokument k dokladu*/
		FkAktivniDokument?: boolean|null;
		/**c_czk*/
		c_czk?: JsonDecimal|null;
		/**ekospdeAktivita*/
		ekospdeAktivita?: number|null;
		/**FK Probíhá*/
		FkProbiha?: boolean|null;
		/**Navigační vlastnost pro dokument (ixp)*/
		dokument?: Gordic.Ssl.Interface.GDokumentDto|null;
		/**Navigační vlastnost pro vlastnosti (ixp)*/
		vlastnosti?: Gordic.Gin.Interface.GGinVlastnostiDataDto|null;
		/**Je doklad evidovaný?*/
		readonly JeEvidovan?: boolean|null;
		/**Je doklad v editačním režimu? (dříve nazváno RezimPraceNadDokladem)*/
		readonly JeEditacniRezim?: boolean|null;
		/**Příznak, zda existuje aktivní dokument FK k dokladu*/
		readonly ExistujeFkAktivniDokument?: boolean|null;
		/**Je doklad bez závazků? (1340, 1360, 1480, 1490) Bez daňových dokladů!*/
		readonly JeDokladBezZavazku?: boolean|null;
		/**Je doklad daňový (1305, 1306, 1405, 1406) Doklady podle typu daňové - is_ktg_typ_dph()*/
		readonly JeDokladDanovy?: boolean|null;
		/**Je doklad vyúčtováním (1340, 1360, 1480, 1490, 1341, 1361, 1481, 1491, 1342, 1362, 1482, 1492) - is_VYZ()*/
		readonly JeDokladVyuctovani?: boolean|null;
		/**Je hlavičkový doklad platebního nebo splátkového kalendáře (1385, 1386, 1485, 1486)*/
		readonly JeHlavickovyDokladKalendare?: boolean|null;
		/**Je doklad stornovaný?*/
		readonly JeStornovan?: boolean|null;
		/**Je doklad uzavřen?*/
		readonly JeUzavren?: boolean|null;
		/**Je doklad vlastní?*/
		readonly JeVlastniDoklad?: boolean|null;
		/**Je doklad stornovanýve WFL?*/
		readonly JeStornovanVeWFL?: boolean|null;
		/**Je možné podat dokument FK?*/
		readonly LzePodatFK?: boolean|null;
		/**Je možné stornovat dokument FK?*/
		readonly LzeStornovatFK?: boolean|null;
		/**Stav dokladu Otevřeno/PřipravenoKUzávěrce/Uzavřeno*/
		readonly StavDokladu?: Gordic.Bpl.Interface.GBplGlobalsBase.StavPorizeni|null;
		/**Stav úhrady Neuhrazeno/Částečně/Uhrazeno*/
		readonly StavUhrady?: Gordic.Bpl.Interface.GBplGlobalsBase.StavUhrady|null;
		/**Stav účtování Nezaúčtováno/Částečně/Zaúčtováno*/
		readonly StavUctovani?: Gordic.Bpl.Interface.GBplGlobalsBase.StavZauctovani|null;
		/**Stav účtování Neodesláno/Částečně/Odesláno*/
		readonly StavOdeslanoKUhrade?: Gordic.Bpl.Interface.GBplGlobalsBase.StavOdeslanoKUhrade|null;
	}
	const enum GBplFakturaDoslaDtoNames { ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", popis_dlouhy = "popis_dlouhy", poznamka = "poznamka", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", BUCI = "BUCI", BUVL = "BUVL", zp = "zp", ixp_den = "ixp_den", ac = "ac", ps_sml_stav = "ps_sml_stav", ps_sml = "ps_sml", dat_vyst = "dat_vyst", dat_spl = "dat_spl", dat_zdan = "dat_zdan", dat_zau = "dat_zau", dat_uhr = "dat_uhr", dat_kry = "dat_kry", dat_lik = "dat_lik", mena = "mena", c_mena = "c_mena", c_celk = "c_celk", c_kuhr = "c_kuhr", c_zust = "c_zust", c_kzauc = "c_kzauc", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_upr = "c_upr", s_por = "s_por", s_uhr = "s_uhr", s_kry = "s_kry", s_lik = "s_lik", s_zau = "s_zau", s_sto = "s_sto", s_tis = "s_tis", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", znam = "znam", c_vaz = "c_vaz", rok_dph = "rok_dph", mesic_dph = "mesic_dph", priz_dph = "priz_dph", c_dor = "c_dor", kurz = "kurz", dat_uup = "dat_uup", priz_view = "priz_view", ac_ag = "ac_ag", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", stav_vym = "stav_vym", c_za_z = "c_za_z", c_za_d = "c_za_d", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", typ_dor = "typ_dor", c_vaz_mena = "c_vaz_mena", c_vyuc = "c_vyuc", c_zx = "c_zx", priz_por = "priz_por", priz_opp = "priz_opp", typ_upr = "typ_upr", s_cro = "s_cro", priz_pdp = "priz_pdp", kurz_akt = "kurz_akt", c_celk_mena = "c_celk_mena", c_zust_mena = "c_zust_mena", c_kuhr_mena = "c_kuhr_mena", c_z1d = "c_z1d", c_d1d = "c_d1d", c_z2d = "c_z2d", c_d2d = "c_d2d", c_vyuc_mena = "c_vyuc_mena", dat_dor = "dat_dor", c_z3 = "c_z3", c_d3 = "c_d3", c_z3d = "c_z3d", c_d3d = "c_d3d", c_z4 = "c_z4", c_d4 = "c_d4", c_z4d = "c_z4d", c_d4d = "c_d4d", priz_fuc = "priz_fuc", priz_xx = "priz_xx", dic = "dic", rc = "rc", nazev = "nazev", esu_txt = "esu_txt", ps_sml_ac = "ps_sml_ac", uzo = "uzo", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", typ_ag = "typ_ag", stav_pis = "stav_pis", s_schval = "s_schval", ixs_fun_akt = "ixs_fun_akt", fik = "fik", uk = "uk", stav_fk = "stav_fk", stav_uk = "stav_uk", stav_pk = "stav_pk", stav_eko_schval = "stav_eko_schval", ixp_den_txt = "ixp_den_txt", rok_dokladu = "rok_dokladu", mena_zkr = "mena_zkr", zp_txt = "zp_txt", priz_view_zkr = "priz_view_zkr", ktg_typ_zkr = "ktg_typ_zkr", priz_dd = "priz_dd", ktg_typ_txt = "ktg_typ_txt", ixs_typ_txt = "ixs_typ_txt", priz_ozp = "priz_ozp", ixs_fun_txt = "ixs_fun_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", cis_real_txt = "cis_real_txt", prepoctene = "prepoctene", c_pol = "c_pol", c_pol_dan = "c_pol_dan", ixs_esu_pla = "ixs_esu_pla", ixs_esu_pla_old = "ixs_esu_pla_old", Permissions = "Permissions", pocet_radku_kryti = "pocet_radku_kryti", pocet_radku_likvidace = "pocet_radku_likvidace", pocet_radku_likvidace_zaloh = "pocet_radku_likvidace_zaloh", pocet_radku_k_zauctovani = "pocet_radku_k_zauctovani", cnt = "cnt", c_zaokr = "c_zaokr", suma_kry = "suma_kry", suma_kry_sch_akt_rok = "suma_kry_sch_akt_rok", suma_kry_sch = "suma_kry_sch", suma_lik = "suma_lik", suma_lik_sch = "suma_lik_sch", suma_lik_zal_sch = "suma_lik_zal_sch", suma_lik_zal = "suma_lik_zal", s_lik_zal = "s_lik_zal", c_zap = "c_zap", c_zap_mena = "c_zap_mena", suma_k_zauctovani = "suma_k_zauctovani", suma_zauctovano = "suma_zauctovano", dvoji_uctovani = "dvoji_uctovani", ixp_vaz = "ixp_vaz", pocet_buvl = "pocet_buvl", priz_splatky = "priz_splatky", priz_pomer = "priz_pomer", s_evi = "s_evi", priz_FIK = "priz_FIK", priz_UK = "priz_UK", priz_SP = "priz_SP", priz_EKO = "priz_EKO", fk_stav_pis = "fk_stav_pis", FkAktivni = "FkAktivni", FkAktivniDokument = "FkAktivniDokument", c_czk = "c_czk", ekospdeAktivita = "ekospdeAktivita", FkProbiha = "FkProbiha", dokument = "dokument", vlastnosti = "vlastnosti", JeEvidovan = "JeEvidovan", JeEditacniRezim = "JeEditacniRezim", ExistujeFkAktivniDokument = "ExistujeFkAktivniDokument", JeDokladBezZavazku = "JeDokladBezZavazku", JeDokladDanovy = "JeDokladDanovy", JeDokladVyuctovani = "JeDokladVyuctovani", JeHlavickovyDokladKalendare = "JeHlavickovyDokladKalendare", JeStornovan = "JeStornovan", JeUzavren = "JeUzavren", JeVlastniDoklad = "JeVlastniDoklad", JeStornovanVeWFL = "JeStornovanVeWFL", LzePodatFK = "LzePodatFK", LzeStornovatFK = "LzeStornovatFK", StavDokladu = "StavDokladu", StavUhrady = "StavUhrady", StavUctovani = "StavUctovani", StavOdeslanoKUhrade = "StavOdeslanoKUhrade",}
	const enum GBplFakturaDoslaDtoFragments { ixp = "main", lic = "main", ixs_esu = "main", ico_esu = "main", ico = "main", ucs = "main", nks = "main", ac_esu = "main", popis = "main", popis_dlouhy = "main", poznamka = "main", vs = "main", ks = "main", ss = "main", sk_vl = "main", bu_vl = "main", sk_ci = "main", bu_ci = "main", BUCI = "main", BUVL = "main", zp = "main", ixp_den = "main", ac = "main", ps_sml_stav = "main", ps_sml = "main", dat_vyst = "main", dat_spl = "main", dat_zdan = "main", dat_zau = "main", dat_uhr = "main", dat_kry = "main", dat_lik = "main", mena = "main", c_mena = "main", c_celk = "main", c_kuhr = "main", c_zust = "main", c_kzauc = "main", c_z0 = "main", c_d0 = "main", c_z1 = "main", c_d1 = "main", c_z2 = "main", c_d2 = "main", c_upr = "main", s_por = "main", s_uhr = "main", s_kry = "main", s_lik = "main", s_zau = "main", s_sto = "main", s_tis = "main", ktg_typ = "main", ixs_typ = "main", eko_akt = "main", dat_evid = "main", dat_zmena = "main", zmenu_prov = "main", znam = "main", c_vaz = "main", rok_dph = "main", mesic_dph = "main", priz_dph = "main", c_dor = "main", kurz = "main", dat_uup = "main", priz_view = "main", ac_ag = "main", c_sazba_pen = "main", proc_sazba_pen = "main", typ_pen = "main", stav_vym = "main", c_za_z = "main", c_za_d = "main", cis_real = "main", ixs_fun_vyriz = "main", typ_dor = "main", c_vaz_mena = "main", c_vyuc = "main", c_zx = "main", priz_por = "main", priz_opp = "main", typ_upr = "main", s_cro = "main", priz_pdp = "main", kurz_akt = "main", c_celk_mena = "main", c_zust_mena = "main", c_kuhr_mena = "main", c_z1d = "main", c_d1d = "main", c_z2d = "main", c_d2d = "main", c_vyuc_mena = "main", dat_dor = "main", c_z3 = "main", c_d3 = "main", c_z3d = "main", c_d3d = "main", c_z4 = "main", c_d4 = "main", c_z4d = "main", c_d4d = "main", priz_fuc = "main", priz_xx = "main", dic = "ESU", rc = "ESU", nazev = "ESU", esu_txt = "ESU", ps_sml_ac = "main", uzo = "WFL", preevidence = "WFL", vlastnictvi = "WFL", el_obraz_typ = "WFL", el_obraz_soubor = "WFL", el_prilohy_pocet = "WFL", typ_ag = "WFL", stav_pis = "WFL", s_schval = "WFL", ixs_fun_akt = "WFL", fik = "WFL", uk = "WFL", stav_fk = "WFL_FK", stav_uk = "WFL_UK", stav_pk = "WFL_PK", stav_eko_schval = "EKO_SCHVAL", ixp_den_txt = "kniha", rok_dokladu = "kniha", mena_zkr = "ekocmen", zp_txt = "ekocizp", priz_view_zkr = "gincvie", ktg_typ_zkr = "ginckat", priz_dd = "ginckat", ktg_typ_txt = "ginckat", ixs_typ_txt = "sslstyp", priz_ozp = "priz_ozp", ixs_fun_txt = "main", ixs_fun_vyriz_txt = "main", cis_real_txt = "main", prepoctene = "kontace", c_pol = "main", c_pol_dan = "main", ixs_esu_pla = "main", ixs_esu_pla_old = "main", Permissions = "Permissions", pocet_radku_kryti = "main", pocet_radku_likvidace = "main", pocet_radku_likvidace_zaloh = "main", pocet_radku_k_zauctovani = "main", cnt = "main", c_zaokr = "main", suma_kry = "kontace", suma_kry_sch_akt_rok = "kontace", suma_kry_sch = "kontace", suma_lik = "kontace", suma_lik_sch = "kontace", suma_lik_zal_sch = "kontace", suma_lik_zal = "kontace", s_lik_zal = "kontace", c_zap = "kontace", c_zap_mena = "kontace", suma_k_zauctovani = "zauctovani", suma_zauctovano = "zauctovani", dvoji_uctovani = "kontace", ixp_vaz = "*", pocet_buvl = "*", priz_splatky = "*", priz_pomer = "*", s_evi = "main", priz_FIK = "main", priz_UK = "main", priz_SP = "main", priz_EKO = "main", fk_stav_pis = "main", FkAktivni = "*", FkAktivniDokument = "main", c_czk = "main", ekospdeAktivita = "main", FkProbiha = "*", dokument = "dokument", vlastnosti = "vlastnosti", JeEvidovan = "*", JeEditacniRezim = "*", ExistujeFkAktivniDokument = "*", JeDokladBezZavazku = "*", JeDokladDanovy = "*", JeDokladVyuctovani = "*", JeHlavickovyDokladKalendare = "*", JeStornovan = "*", JeUzavren = "*", JeVlastniDoklad = "*", JeStornovanVeWFL = "*", LzePodatFK = "*", LzeStornovatFK = "*", StavDokladu = "*", StavUhrady = "*", StavUctovani = "*", StavOdeslanoKUhrade = "*",}
	const enum GBplFakturaDoslaDtoTypes { ixp = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", popis_dlouhy = "string", poznamka = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", BUCI = "string", BUVL = "string", zp = "number", ixp_den = "string", ac = "string", ps_sml_stav = "number", ps_sml = "string", dat_vyst = "JsonDate", dat_spl = "JsonDate", dat_zdan = "JsonDate", dat_zau = "JsonDate", dat_uhr = "JsonDate", dat_kry = "JsonDate", dat_lik = "JsonDate", mena = "number", c_mena = "JsonDecimal", c_celk = "JsonDecimal", c_kuhr = "JsonDecimal", c_zust = "JsonDecimal", c_kzauc = "JsonDecimal", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_upr = "JsonDecimal", s_por = "number", s_uhr = "number", s_kry = "number", s_lik = "number", s_zau = "number", s_sto = "number", s_tis = "number", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", znam = "number", c_vaz = "JsonDecimal", rok_dph = "number", mesic_dph = "number", priz_dph = "number", c_dor = "JsonDecimal", kurz = "JsonDecimal", dat_uup = "JsonDate", priz_view = "number", ac_ag = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", stav_vym = "number", c_za_z = "JsonDecimal", c_za_d = "JsonDecimal", cis_real = "string", ixs_fun_vyriz = "string", typ_dor = "number", c_vaz_mena = "JsonDecimal", c_vyuc = "JsonDecimal", c_zx = "JsonDecimal", priz_por = "number", priz_opp = "number", typ_upr = "string", s_cro = "number", priz_pdp = "number", kurz_akt = "JsonDecimal", c_celk_mena = "JsonDecimal", c_zust_mena = "JsonDecimal", c_kuhr_mena = "JsonDecimal", c_z1d = "JsonDecimal", c_d1d = "JsonDecimal", c_z2d = "JsonDecimal", c_d2d = "JsonDecimal", c_vyuc_mena = "JsonDecimal", dat_dor = "JsonDate", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z3d = "JsonDecimal", c_d3d = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", c_z4d = "JsonDecimal", c_d4d = "JsonDecimal", priz_fuc = "number", priz_xx = "number", dic = "string", rc = "string", nazev = "string", esu_txt = "string", ps_sml_ac = "string", uzo = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", typ_ag = "number", stav_pis = "number", s_schval = "number", ixs_fun_akt = "string", fik = "number", uk = "number", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_pk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_eko_schval = "Gordic.Wfl.Interface.GWflvdfkDto", ixp_den_txt = "string", rok_dokladu = "number", mena_zkr = "string", zp_txt = "string", priz_view_zkr = "string", ktg_typ_zkr = "string", priz_dd = "number", ktg_typ_txt = "string", ixs_typ_txt = "string", priz_ozp = "number", ixs_fun_txt = "string", ixs_fun_vyriz_txt = "string", cis_real_txt = "string", prepoctene = "number", c_pol = "JsonDecimal", c_pol_dan = "JsonDecimal", ixs_esu_pla = "string", ixs_esu_pla_old = "string", Permissions = "Gordic.Bpl.Interface.GBplFakturaDoslaPermissions", pocet_radku_kryti = "number", pocet_radku_likvidace = "number", pocet_radku_likvidace_zaloh = "number", pocet_radku_k_zauctovani = "number", cnt = "number", c_zaokr = "JsonDecimal", suma_kry = "JsonDecimal", suma_kry_sch_akt_rok = "JsonDecimal", suma_kry_sch = "JsonDecimal", suma_lik = "JsonDecimal", suma_lik_sch = "JsonDecimal", suma_lik_zal_sch = "JsonDecimal", suma_lik_zal = "JsonDecimal", s_lik_zal = "number", c_zap = "JsonDecimal", c_zap_mena = "JsonDecimal", suma_k_zauctovani = "JsonDecimal", suma_zauctovano = "JsonDecimal", dvoji_uctovani = "boolean", ixp_vaz = "string", pocet_buvl = "number", priz_splatky = "number", priz_pomer = "number", s_evi = "number", priz_FIK = "number", priz_UK = "number", priz_SP = "number", priz_EKO = "number", fk_stav_pis = "number", FkAktivni = "boolean", FkAktivniDokument = "boolean", c_czk = "JsonDecimal", ekospdeAktivita = "number", FkProbiha = "boolean", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", JeEvidovan = "boolean", JeEditacniRezim = "boolean", ExistujeFkAktivniDokument = "boolean", JeDokladBezZavazku = "boolean", JeDokladDanovy = "boolean", JeDokladVyuctovani = "boolean", JeHlavickovyDokladKalendare = "boolean", JeStornovan = "boolean", JeUzavren = "boolean", JeVlastniDoklad = "boolean", JeStornovanVeWFL = "boolean", LzePodatFK = "boolean", LzeStornovatFK = "boolean", StavDokladu = "Gordic.Bpl.Interface.GBplGlobalsBase.StavPorizeni", StavUhrady = "Gordic.Bpl.Interface.GBplGlobalsBase.StavUhrady", StavUctovani = "Gordic.Bpl.Interface.GBplGlobalsBase.StavZauctovani", StavOdeslanoKUhrade = "Gordic.Bpl.Interface.GBplGlobalsBase.StavOdeslanoKUhrade",}
	const enum GBplFakturaDoslaDtoTypeLengths { ixp = 12, ac_esu = 60, vs = 10, ss = 10, ixp_vaz = 12,}
	/**Permissions pro detail dokladu*/
	interface GBplFakturaDoslaPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**Lze měnit datum splatnosti*/
		LzeMenitDatumSplatnosti: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zavřít doklad*/
		LzeZavritDoklad: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zrušit uzavření dokladu*/
		LzeZrusitUzavreniDokladu: Gordic.General.ApplicationInterface.GPermission;
		/**Lze u FK dokladu generovat el. obraz*/
		LzeFKGenerovatElObraz: Gordic.General.ApplicationInterface.GPermission;
		/**Lze stornovat doklad*/
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze zrušit storno dokladu*/
		LzeZrusitStorno: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vrátit doklad do WFL*/
		LzeVratitDoWFL: Gordic.General.ApplicationInterface.GPermission;
		/**Lze uhradit externí pokladnou*/
		LzeUhraditExterniPokladnou: Gordic.General.ApplicationInterface.GPermission;
		/**Lze předat doklad*/
		LzePredat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze přidělit doklad*/
		LzePridelit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze přeevidovat doklad*/
		LzePreevidovat: Gordic.General.ApplicationInterface.GPermission;
		/**Lze převzít doklad*/
		LzePrevzit: Gordic.General.ApplicationInterface.GPermission;
		/**Lze změnit stav zaúčtování na dokladu*/
		LzeZmenitStavZauctovani: Gordic.General.ApplicationInterface.GPermission;
		/**Lze spustit kontrolní hlášení*/
		LzeKontrolniHlaseni: Gordic.General.ApplicationInterface.GPermission;
		/**Lze rezervovat příjem*/
		LzeRezervovatPrijem: Gordic.General.ApplicationInterface.GPermission;
		/**Lze vidět akci Vytěžování AI*/
		LzeAIVytezovat: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBplFakturaDoslaPermissionsNames { LzeMenitDatumSplatnosti = "LzeMenitDatumSplatnosti", LzeZavritDoklad = "LzeZavritDoklad", LzeZrusitUzavreniDokladu = "LzeZrusitUzavreniDokladu", LzeFKGenerovatElObraz = "LzeFKGenerovatElObraz", LzeStornovat = "LzeStornovat", LzeZrusitStorno = "LzeZrusitStorno", LzeVratitDoWFL = "LzeVratitDoWFL", LzeUhraditExterniPokladnou = "LzeUhraditExterniPokladnou", LzePredat = "LzePredat", LzePridelit = "LzePridelit", LzePreevidovat = "LzePreevidovat", LzePrevzit = "LzePrevzit", LzeZmenitStavZauctovani = "LzeZmenitStavZauctovani", LzeKontrolniHlaseni = "LzeKontrolniHlaseni", LzeRezervovatPrijem = "LzeRezervovatPrijem", LzeAIVytezovat = "LzeAIVytezovat",}
	const enum GBplFakturaDoslaPermissionsFragments { LzeMenitDatumSplatnosti = "*", LzeZavritDoklad = "*", LzeZrusitUzavreniDokladu = "*", LzeFKGenerovatElObraz = "*", LzeStornovat = "*", LzeZrusitStorno = "*", LzeVratitDoWFL = "*", LzeUhraditExterniPokladnou = "*", LzePredat = "*", LzePridelit = "*", LzePreevidovat = "*", LzePrevzit = "*", LzeZmenitStavZauctovani = "*", LzeKontrolniHlaseni = "*", LzeRezervovatPrijem = "*", LzeAIVytezovat = "*",}
	const enum GBplFakturaDoslaPermissionsTypes { LzeMenitDatumSplatnosti = "Gordic.General.ApplicationInterface.GPermission", LzeZavritDoklad = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitUzavreniDokladu = "Gordic.General.ApplicationInterface.GPermission", LzeFKGenerovatElObraz = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitStorno = "Gordic.General.ApplicationInterface.GPermission", LzeVratitDoWFL = "Gordic.General.ApplicationInterface.GPermission", LzeUhraditExterniPokladnou = "Gordic.General.ApplicationInterface.GPermission", LzePredat = "Gordic.General.ApplicationInterface.GPermission", LzePridelit = "Gordic.General.ApplicationInterface.GPermission", LzePreevidovat = "Gordic.General.ApplicationInterface.GPermission", LzePrevzit = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitStavZauctovani = "Gordic.General.ApplicationInterface.GPermission", LzeKontrolniHlaseni = "Gordic.General.ApplicationInterface.GPermission", LzeRezervovatPrijem = "Gordic.General.ApplicationInterface.GPermission", LzeAIVytezovat = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBplFakturaDoslaPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaEvidenceDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro BplFakturaDosla s duplikovacím DTO*/
	interface GBplFakturaDoslaEvidenceDto extends Gordic.Bpl.Interface.GBplFakturaDoslaDto {
		/**Duplikace dokladu*/
		duplikovani?: Gordic.Bpl.Interface.DuplikovaniDokladuVyberDto|null;
	}
	const enum GBplFakturaDoslaEvidenceDtoNames { duplikovani = "duplikovani", ixp = "ixp", lic = "lic", ixs_esu = "ixs_esu", ico_esu = "ico_esu", ico = "ico", ucs = "ucs", nks = "nks", ac_esu = "ac_esu", popis = "popis", popis_dlouhy = "popis_dlouhy", poznamka = "poznamka", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", BUCI = "BUCI", BUVL = "BUVL", zp = "zp", ixp_den = "ixp_den", ac = "ac", ps_sml_stav = "ps_sml_stav", ps_sml = "ps_sml", dat_vyst = "dat_vyst", dat_spl = "dat_spl", dat_zdan = "dat_zdan", dat_zau = "dat_zau", dat_uhr = "dat_uhr", dat_kry = "dat_kry", dat_lik = "dat_lik", mena = "mena", c_mena = "c_mena", c_celk = "c_celk", c_kuhr = "c_kuhr", c_zust = "c_zust", c_kzauc = "c_kzauc", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_upr = "c_upr", s_por = "s_por", s_uhr = "s_uhr", s_kry = "s_kry", s_lik = "s_lik", s_zau = "s_zau", s_sto = "s_sto", s_tis = "s_tis", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", eko_akt = "eko_akt", dat_evid = "dat_evid", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", znam = "znam", c_vaz = "c_vaz", rok_dph = "rok_dph", mesic_dph = "mesic_dph", priz_dph = "priz_dph", c_dor = "c_dor", kurz = "kurz", dat_uup = "dat_uup", priz_view = "priz_view", ac_ag = "ac_ag", c_sazba_pen = "c_sazba_pen", proc_sazba_pen = "proc_sazba_pen", typ_pen = "typ_pen", stav_vym = "stav_vym", c_za_z = "c_za_z", c_za_d = "c_za_d", cis_real = "cis_real", ixs_fun_vyriz = "ixs_fun_vyriz", typ_dor = "typ_dor", c_vaz_mena = "c_vaz_mena", c_vyuc = "c_vyuc", c_zx = "c_zx", priz_por = "priz_por", priz_opp = "priz_opp", typ_upr = "typ_upr", s_cro = "s_cro", priz_pdp = "priz_pdp", kurz_akt = "kurz_akt", c_celk_mena = "c_celk_mena", c_zust_mena = "c_zust_mena", c_kuhr_mena = "c_kuhr_mena", c_z1d = "c_z1d", c_d1d = "c_d1d", c_z2d = "c_z2d", c_d2d = "c_d2d", c_vyuc_mena = "c_vyuc_mena", dat_dor = "dat_dor", c_z3 = "c_z3", c_d3 = "c_d3", c_z3d = "c_z3d", c_d3d = "c_d3d", c_z4 = "c_z4", c_d4 = "c_d4", c_z4d = "c_z4d", c_d4d = "c_d4d", priz_fuc = "priz_fuc", priz_xx = "priz_xx", dic = "dic", rc = "rc", nazev = "nazev", esu_txt = "esu_txt", ps_sml_ac = "ps_sml_ac", uzo = "uzo", preevidence = "preevidence", vlastnictvi = "vlastnictvi", el_obraz_typ = "el_obraz_typ", el_obraz_soubor = "el_obraz_soubor", el_prilohy_pocet = "el_prilohy_pocet", typ_ag = "typ_ag", stav_pis = "stav_pis", s_schval = "s_schval", ixs_fun_akt = "ixs_fun_akt", fik = "fik", uk = "uk", stav_fk = "stav_fk", stav_uk = "stav_uk", stav_pk = "stav_pk", stav_eko_schval = "stav_eko_schval", ixp_den_txt = "ixp_den_txt", rok_dokladu = "rok_dokladu", mena_zkr = "mena_zkr", zp_txt = "zp_txt", priz_view_zkr = "priz_view_zkr", ktg_typ_zkr = "ktg_typ_zkr", priz_dd = "priz_dd", ktg_typ_txt = "ktg_typ_txt", ixs_typ_txt = "ixs_typ_txt", priz_ozp = "priz_ozp", ixs_fun_txt = "ixs_fun_txt", ixs_fun_vyriz_txt = "ixs_fun_vyriz_txt", cis_real_txt = "cis_real_txt", prepoctene = "prepoctene", c_pol = "c_pol", c_pol_dan = "c_pol_dan", ixs_esu_pla = "ixs_esu_pla", ixs_esu_pla_old = "ixs_esu_pla_old", Permissions = "Permissions", pocet_radku_kryti = "pocet_radku_kryti", pocet_radku_likvidace = "pocet_radku_likvidace", pocet_radku_likvidace_zaloh = "pocet_radku_likvidace_zaloh", pocet_radku_k_zauctovani = "pocet_radku_k_zauctovani", cnt = "cnt", c_zaokr = "c_zaokr", suma_kry = "suma_kry", suma_kry_sch_akt_rok = "suma_kry_sch_akt_rok", suma_kry_sch = "suma_kry_sch", suma_lik = "suma_lik", suma_lik_sch = "suma_lik_sch", suma_lik_zal_sch = "suma_lik_zal_sch", suma_lik_zal = "suma_lik_zal", s_lik_zal = "s_lik_zal", c_zap = "c_zap", c_zap_mena = "c_zap_mena", suma_k_zauctovani = "suma_k_zauctovani", suma_zauctovano = "suma_zauctovano", dvoji_uctovani = "dvoji_uctovani", ixp_vaz = "ixp_vaz", pocet_buvl = "pocet_buvl", priz_splatky = "priz_splatky", priz_pomer = "priz_pomer", s_evi = "s_evi", priz_FIK = "priz_FIK", priz_UK = "priz_UK", priz_SP = "priz_SP", priz_EKO = "priz_EKO", fk_stav_pis = "fk_stav_pis", FkAktivni = "FkAktivni", FkAktivniDokument = "FkAktivniDokument", FkProbiha = "FkProbiha", dokument = "dokument", vlastnosti = "vlastnosti", JeEvidovan = "JeEvidovan", JeEditacniRezim = "JeEditacniRezim", ExistujeFkAktivniDokument = "ExistujeFkAktivniDokument", JeDokladBezZavazku = "JeDokladBezZavazku", JeDokladDanovy = "JeDokladDanovy", JeDokladVyuctovani = "JeDokladVyuctovani", JeHlavickovyDokladKalendare = "JeHlavickovyDokladKalendare", JeStornovan = "JeStornovan", JeUzavren = "JeUzavren", JeVlastniDoklad = "JeVlastniDoklad", JeStornovanVeWFL = "JeStornovanVeWFL", LzePodatFK = "LzePodatFK", LzeStornovatFK = "LzeStornovatFK", StavDokladu = "StavDokladu", StavUhrady = "StavUhrady", StavUctovani = "StavUctovani", StavOdeslanoKUhrade = "StavOdeslanoKUhrade",}
	const enum GBplFakturaDoslaEvidenceDtoFragments { duplikovani = "*", ixp = "main", lic = "main", ixs_esu = "main", ico_esu = "main", ico = "main", ucs = "main", nks = "main", ac_esu = "main", popis = "main", popis_dlouhy = "main", poznamka = "main", vs = "main", ks = "main", ss = "main", sk_vl = "main", bu_vl = "main", sk_ci = "main", bu_ci = "main", BUCI = "main", BUVL = "main", zp = "main", ixp_den = "main", ac = "main", ps_sml_stav = "main", ps_sml = "main", dat_vyst = "main", dat_spl = "main", dat_zdan = "main", dat_zau = "main", dat_uhr = "main", dat_kry = "main", dat_lik = "main", mena = "main", c_mena = "main", c_celk = "main", c_kuhr = "main", c_zust = "main", c_kzauc = "main", c_z0 = "main", c_d0 = "main", c_z1 = "main", c_d1 = "main", c_z2 = "main", c_d2 = "main", c_upr = "main", s_por = "main", s_uhr = "main", s_kry = "main", s_lik = "main", s_zau = "main", s_sto = "main", s_tis = "main", ktg_typ = "main", ixs_typ = "main", eko_akt = "main", dat_evid = "main", dat_zmena = "main", zmenu_prov = "main", znam = "main", c_vaz = "main", rok_dph = "main", mesic_dph = "main", priz_dph = "main", c_dor = "main", kurz = "main", dat_uup = "main", priz_view = "main", ac_ag = "main", c_sazba_pen = "main", proc_sazba_pen = "main", typ_pen = "main", stav_vym = "main", c_za_z = "main", c_za_d = "main", cis_real = "main", ixs_fun_vyriz = "main", typ_dor = "main", c_vaz_mena = "main", c_vyuc = "main", c_zx = "main", priz_por = "main", priz_opp = "main", typ_upr = "main", s_cro = "main", priz_pdp = "main", kurz_akt = "main", c_celk_mena = "main", c_zust_mena = "main", c_kuhr_mena = "main", c_z1d = "main", c_d1d = "main", c_z2d = "main", c_d2d = "main", c_vyuc_mena = "main", dat_dor = "main", c_z3 = "main", c_d3 = "main", c_z3d = "main", c_d3d = "main", c_z4 = "main", c_d4 = "main", c_z4d = "main", c_d4d = "main", priz_fuc = "main", priz_xx = "main", dic = "ESU", rc = "ESU", nazev = "ESU", esu_txt = "ESU", ps_sml_ac = "SML", uzo = "WFL", preevidence = "WFL", vlastnictvi = "WFL", el_obraz_typ = "WFL", el_obraz_soubor = "WFL", el_prilohy_pocet = "WFL", typ_ag = "WFL", stav_pis = "WFL", s_schval = "WFL", ixs_fun_akt = "WFL", fik = "WFL", uk = "WFL", stav_fk = "WFL_FK", stav_uk = "WFL_UK", stav_pk = "WFL_PK", stav_eko_schval = "EKO_SCHVAL", ixp_den_txt = "kniha", rok_dokladu = "kniha", mena_zkr = "ekocmen", zp_txt = "ekocizp", priz_view_zkr = "gincvie", ktg_typ_zkr = "ginckat", priz_dd = "ginckat", ktg_typ_txt = "ginckat", ixs_typ_txt = "sslstyp", priz_ozp = "priz_ozp", ixs_fun_txt = "main", ixs_fun_vyriz_txt = "main", cis_real_txt = "main", prepoctene = "kontace", c_pol = "main", c_pol_dan = "main", ixs_esu_pla = "main", ixs_esu_pla_old = "main", Permissions = "Permissions", pocet_radku_kryti = "main", pocet_radku_likvidace = "main", pocet_radku_likvidace_zaloh = "main", pocet_radku_k_zauctovani = "main", cnt = "main", c_zaokr = "main", suma_kry = "kontace", suma_kry_sch_akt_rok = "kontace", suma_kry_sch = "kontace", suma_lik = "kontace", suma_lik_sch = "kontace", suma_lik_zal_sch = "kontace", suma_lik_zal = "kontace", s_lik_zal = "kontace", c_zap = "kontace", c_zap_mena = "kontace", suma_k_zauctovani = "zauctovani", suma_zauctovano = "zauctovani", dvoji_uctovani = "kontace", ixp_vaz = "*", pocet_buvl = "*", priz_splatky = "*", priz_pomer = "*", s_evi = "main", priz_FIK = "main", priz_UK = "main", priz_SP = "main", priz_EKO = "main", fk_stav_pis = "main", FkAktivni = "*", FkAktivniDokument = "main", FkProbiha = "*", dokument = "dokument", vlastnosti = "vlastnosti", JeEvidovan = "*", JeEditacniRezim = "*", ExistujeFkAktivniDokument = "*", JeDokladBezZavazku = "*", JeDokladDanovy = "*", JeDokladVyuctovani = "*", JeHlavickovyDokladKalendare = "*", JeStornovan = "*", JeUzavren = "*", JeVlastniDoklad = "*", JeStornovanVeWFL = "*", LzePodatFK = "*", LzeStornovatFK = "*", StavDokladu = "*", StavUhrady = "*", StavUctovani = "*", StavOdeslanoKUhrade = "*",}
	const enum GBplFakturaDoslaEvidenceDtoTypes { duplikovani = "Gordic.Bpl.Interface.DuplikovaniDokladuVyberDto", ixp = "string", lic = "string", ixs_esu = "string", ico_esu = "string", ico = "string", ucs = "string", nks = "string", ac_esu = "string", popis = "string", popis_dlouhy = "string", poznamka = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", sk_ci = "string", bu_ci = "string", BUCI = "string", BUVL = "string", zp = "number", ixp_den = "string", ac = "string", ps_sml_stav = "number", ps_sml = "string", dat_vyst = "JsonDate", dat_spl = "JsonDate", dat_zdan = "JsonDate", dat_zau = "JsonDate", dat_uhr = "JsonDate", dat_kry = "JsonDate", dat_lik = "JsonDate", mena = "number", c_mena = "JsonDecimal", c_celk = "JsonDecimal", c_kuhr = "JsonDecimal", c_zust = "JsonDecimal", c_kzauc = "JsonDecimal", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_upr = "JsonDecimal", s_por = "number", s_uhr = "number", s_kry = "number", s_lik = "number", s_zau = "number", s_sto = "number", s_tis = "number", ktg_typ = "number", ixs_typ = "string", eko_akt = "number", dat_evid = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", znam = "number", c_vaz = "JsonDecimal", rok_dph = "number", mesic_dph = "number", priz_dph = "number", c_dor = "JsonDecimal", kurz = "JsonDecimal", dat_uup = "JsonDate", priz_view = "number", ac_ag = "string", c_sazba_pen = "JsonDecimal", proc_sazba_pen = "JsonDecimal", typ_pen = "number", stav_vym = "number", c_za_z = "JsonDecimal", c_za_d = "JsonDecimal", cis_real = "string", ixs_fun_vyriz = "string", typ_dor = "number", c_vaz_mena = "JsonDecimal", c_vyuc = "JsonDecimal", c_zx = "JsonDecimal", priz_por = "number", priz_opp = "number", typ_upr = "string", s_cro = "number", priz_pdp = "number", kurz_akt = "JsonDecimal", c_celk_mena = "JsonDecimal", c_zust_mena = "JsonDecimal", c_kuhr_mena = "JsonDecimal", c_z1d = "JsonDecimal", c_d1d = "JsonDecimal", c_z2d = "JsonDecimal", c_d2d = "JsonDecimal", c_vyuc_mena = "JsonDecimal", dat_dor = "JsonDate", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z3d = "JsonDecimal", c_d3d = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", c_z4d = "JsonDecimal", c_d4d = "JsonDecimal", priz_fuc = "number", priz_xx = "number", dic = "string", rc = "string", nazev = "string", esu_txt = "string", ps_sml_ac = "string", uzo = "string", preevidence = "number", vlastnictvi = "number", el_obraz_typ = "string", el_obraz_soubor = "string", el_prilohy_pocet = "number", typ_ag = "number", stav_pis = "number", s_schval = "number", ixs_fun_akt = "string", fik = "number", uk = "number", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_uk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_pk = "Gordic.Wfl.Interface.GWflvdfkDto", stav_eko_schval = "Gordic.Wfl.Interface.GWflvdfkDto", ixp_den_txt = "string", rok_dokladu = "number", mena_zkr = "string", zp_txt = "string", priz_view_zkr = "string", ktg_typ_zkr = "string", priz_dd = "number", ktg_typ_txt = "string", ixs_typ_txt = "string", priz_ozp = "number", ixs_fun_txt = "string", ixs_fun_vyriz_txt = "string", cis_real_txt = "string", prepoctene = "number", c_pol = "JsonDecimal", c_pol_dan = "JsonDecimal", ixs_esu_pla = "string", ixs_esu_pla_old = "string", Permissions = "Gordic.Bpl.Interface.GBplFakturaDoslaPermissions", pocet_radku_kryti = "number", pocet_radku_likvidace = "number", pocet_radku_likvidace_zaloh = "number", pocet_radku_k_zauctovani = "number", cnt = "number", c_zaokr = "JsonDecimal", suma_kry = "JsonDecimal", suma_kry_sch_akt_rok = "JsonDecimal", suma_kry_sch = "JsonDecimal", suma_lik = "JsonDecimal", suma_lik_sch = "JsonDecimal", suma_lik_zal_sch = "JsonDecimal", suma_lik_zal = "JsonDecimal", s_lik_zal = "number", c_zap = "JsonDecimal", c_zap_mena = "JsonDecimal", suma_k_zauctovani = "JsonDecimal", suma_zauctovano = "JsonDecimal", dvoji_uctovani = "boolean", ixp_vaz = "string", pocet_buvl = "number", priz_splatky = "number", priz_pomer = "number", s_evi = "number", priz_FIK = "number", priz_UK = "number", priz_SP = "number", priz_EKO = "number", fk_stav_pis = "number", FkAktivni = "boolean", FkAktivniDokument = "boolean", FkProbiha = "boolean", dokument = "Gordic.Ssl.Interface.GDokumentDto", vlastnosti = "Gordic.Gin.Interface.GGinVlastnostiDataDto", JeEvidovan = "boolean", JeEditacniRezim = "boolean", ExistujeFkAktivniDokument = "boolean", JeDokladBezZavazku = "boolean", JeDokladDanovy = "boolean", JeDokladVyuctovani = "boolean", JeHlavickovyDokladKalendare = "boolean", JeStornovan = "boolean", JeUzavren = "boolean", JeVlastniDoklad = "boolean", JeStornovanVeWFL = "boolean", LzePodatFK = "boolean", LzeStornovatFK = "boolean", StavDokladu = "Gordic.Bpl.Interface.GBplGlobalsBase.StavPorizeni", StavUhrady = "Gordic.Bpl.Interface.GBplGlobalsBase.StavUhrady", StavUctovani = "Gordic.Bpl.Interface.GBplGlobalsBase.StavZauctovani", StavOdeslanoKUhrade = "Gordic.Bpl.Interface.GBplGlobalsBase.StavOdeslanoKUhrade",}
	const enum GBplFakturaDoslaEvidenceDtoTypeLengths { ixp = 12, ac_esu = 60, vs = 10, ss = 10, ixp_vaz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaExterniUhradaDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro Úhradu externí pokladnou*/
	interface GBplFakturaDoslaExterniUhradaDto {
		/**ixp*/
		ixp?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**ixp_den*/
		ixp_den?: string|null;
		/**castka*/
		castka?: JsonDecimal|null;
		/**dat_uhr*/
		dat_uhr?: JsonDate|null;
		/**lic*/
		popis?: string|null;
	}
	const enum GBplFakturaDoslaExterniUhradaDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", ixp_den = "ixp_den", castka = "castka", dat_uhr = "dat_uhr", popis = "popis",}
	const enum GBplFakturaDoslaExterniUhradaDtoFragments { ixp = "main", dat_zmena = "main", ixp_den = "main", castka = "main", dat_uhr = "main", popis = "main",}
	const enum GBplFakturaDoslaExterniUhradaDtoTypes { ixp = "string", dat_zmena = "JsonDate", ixp_den = "string", castka = "JsonDecimal", dat_uhr = "JsonDate", popis = "string",}
	const enum GBplFakturaDoslaExterniUhradaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaFilterDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Filtr seznamu BPL dokladů*/
	interface GBplFakturaDoslaFilterDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Kniha dokladů BPL*/
		ixp_den?: string|null;
		/**Rok knihy dokladů BPL*/
		rok_den?: number|null;
		/**Znaménko*/
		zav_poh?: number|null;
		/**Způsob úhrady*/
		zp?: JsonDecimal|null;
		/**Variabilní symbol*/
		vs?: GBaseFilter<string>|null;
		/**Konstantní symbol*/
		ks?: string|null;
		/**Specifický symbol*/
		ss?: string|null;
		/**Smlouva/objednávka*/
		ps_sml?: GBaseFilter<string>|null;
		/**Popis*/
		popis?: GBaseFilter<string>|null;
		/**Agendové číslo*/
		ac_ag?: GBaseFilter<string>|null;
		/**Evidenční číslo*/
		ac?: GBaseFilter<string>|null;
		/**Kategorie typu dokladu*/
		ktg_typ?: GBaseFilter<string>|null;
		/**Typ dokladu*/
		ixs_typ?: GBaseFilter<string>|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: GBaseFilter<string>|null;
		/**Datum vystavení - doručení*/
		dat_vyst?: GBaseFilter<JsonDate>|null;
		/**Datum UÚP*/
		dat_uup?: GBaseFilter<JsonDate>|null;
		/**Datum evidence*/
		dat_evid?: GBaseFilter<JsonDate>|null;
		/**Datum splatnosti*/
		dat_spl?: GBaseFilter<JsonDate>|null;
		/**Datum zdanitelného plnění*/
		dat_zdan?: GBaseFilter<JsonDate>|null;
		/**Datum účtování*/
		dat_zau?: GBaseFilter<JsonDate>|null;
		/**Datum úhrady*/
		dat_uhr?: GBaseFilter<JsonDate>|null;
		/**Datum předpisu*/
		dat_lik?: GBaseFilter<JsonDate>|null;
		/**Datum krytí*/
		dat_kry?: GBaseFilter<JsonDate>|null;
		/**Datum bankovního výpisu*/
		dat_pol?: GBaseFilter<JsonDate>|null;
		/**Neuhrazeno k datu*/
		dat_neuhr?: GBaseFilter<JsonDate>|null;
		/**Počet dnů po splatnosti*/
		dnu_po_spl?: GBaseFilter<number>|null;
		/**Účetní zápisy*/
		cfuDto?: Gordic.Eko.Interface.GCfuFilterDto[]|null;
		/**Částka v měně*/
		c_mena?: GIntervalDto<JsonDecimal>|null;
		/**Částka uhrazená v měně*/
		c_uhrazeno?: GIntervalDto<JsonDecimal>|null;
		/**Částka k úhradě v měně*/
		c_zust?: GIntervalDto<JsonDecimal>|null;
		/**aktuální funkce*/
		ixs_fun_akt?: string|null;
		/**Pole IXP faktur pro tisky*/
		List_ixp?: string[]|null;
		/**ixs masky filteru - přidáno kvůli sestavám*/
		ixs_mask?: string|null;
		/**Měna*/
		mena?: number|null;
		/**Stav storna*/
		s_sto?: GBaseFilter<number>|null;
		/**Stav krytí*/
		s_kry?: GBaseFilter<number>|null;
		/**Stav likvidace*/
		s_lik?: GBaseFilter<number>|null;
		/**Stav úhrady*/
		s_uhr?: GBaseFilter<number>|null;
		/**Stav odeslání k úhradě*/
		s_kuhr?: GBaseFilter<number>|null;
		/**Stav zaúčtování*/
		s_zau?: GBaseFilter<number>|null;
		/**Stav evidence*/
		s_evi?: GBaseFilter<number>|null;
		/**Stav uzavření*/
		s_por?: GBaseFilter<number>|null;
		/**Stav dorovnání*/
		typ_dor?: GBaseFilter<number>|null;
		/**Stav přečteno*/
		priz_view?: GBaseFilter<number>|null;
		/**Stav FK*/
		priz_FIK?: GBaseFilter<number>|null;
		/**Stav ÚK*/
		priz_UK?: GBaseFilter<number>|null;
		/**Stav Obesného schvalovacího procesu*/
		priz_SP?: GBaseFilter<number>|null;
		/**Stav schvalovacího procesu EKO*/
		priz_EKO?: GBaseFilter<number>|null;
		/**Prohledat i historii*/
		historie?: GBaseFilter<boolean>|null;
		/**Nepřipraveno k uzavření*/
		neprip_uza?: GBaseFilter<boolean>|null;
		/**Historické doklady v historii*/
		historie_uzivatel?: GBaseFilter<string>|null;
		/**Vlastní doklady*/
		vlastni?: GBaseFilter<boolean>|null;
		/**Kompetent*/
		ixs_fun_vyriz?: GBaseFilter<string>|null;
		/**Typ pohledu*/
		typ_pohledu?: number|null;
		/**Ekonomický identifikátor*/
		eko_subjekt?: GBaseFilter<boolean>|null;
		/**Typ organizace*/
		typ_org?: number|null;
		/**Stav insolvence*/
		stav_insolv?: number|null;
		/**Číslo dokladu dod.*/
		ac_esu?: GBaseFilter<string>|null;
		/**IČO*/
		ico?: string|null;
		/**Číslo účtu*/
		bu_ci?: string|null;
		/**kód banky*/
		sk_ci?: string|null;
		/**Číslo účtu*/
		bu_vl?: string|null;
		/**kód banky*/
		sk_vl?: string|null;
		/**Externí subjekt*/
		esu_ixs_esu?: string|null;
		/**Klíčová slova*/
		wfl_kl_slovo?: GBaseFilter<string>|null;
		/**Rozšiřující vlastnosti*/
		vlastnosti_r?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
		/**Popisné vlastnosti*/
		vlastnosti_s?: Gordic.Gin.Interface.GGinVlastnostiFilterDto[]|null;
	}
	const enum GBplFakturaDoslaFilterDtoNames { ixp = "ixp", ixp_den = "ixp_den", rok_den = "rok_den", zav_poh = "zav_poh", zp = "zp", vs = "vs", ks = "ks", ss = "ss", ps_sml = "ps_sml", popis = "popis", ac_ag = "ac_ag", ac = "ac", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_esu = "ixs_esu", dat_vyst = "dat_vyst", dat_uup = "dat_uup", dat_evid = "dat_evid", dat_spl = "dat_spl", dat_zdan = "dat_zdan", dat_zau = "dat_zau", dat_uhr = "dat_uhr", dat_lik = "dat_lik", dat_kry = "dat_kry", dat_pol = "dat_pol", dat_neuhr = "dat_neuhr", dnu_po_spl = "dnu_po_spl", cfuDto = "cfuDto", c_mena = "c_mena", c_uhrazeno = "c_uhrazeno", c_zust = "c_zust", ixs_fun_akt = "ixs_fun_akt", List_ixp = "List_ixp", ixs_mask = "ixs_mask", mena = "mena", s_sto = "s_sto", s_kry = "s_kry", s_lik = "s_lik", s_uhr = "s_uhr", s_kuhr = "s_kuhr", s_zau = "s_zau", s_evi = "s_evi", s_por = "s_por", typ_dor = "typ_dor", priz_view = "priz_view", priz_FIK = "priz_FIK", priz_UK = "priz_UK", priz_SP = "priz_SP", priz_EKO = "priz_EKO", historie = "historie", neprip_uza = "neprip_uza", historie_uzivatel = "historie_uzivatel", vlastni = "vlastni", ixs_fun_vyriz = "ixs_fun_vyriz", typ_pohledu = "typ_pohledu", eko_subjekt = "eko_subjekt", typ_org = "typ_org", stav_insolv = "stav_insolv", ac_esu = "ac_esu", ico = "ico", bu_ci = "bu_ci", sk_ci = "sk_ci", bu_vl = "bu_vl", sk_vl = "sk_vl", esu_ixs_esu = "esu_ixs_esu", wfl_kl_slovo = "wfl_kl_slovo", vlastnosti_r = "vlastnosti_r", vlastnosti_s = "vlastnosti_s",}
	const enum GBplFakturaDoslaFilterDtoFragments { ixp = "*", ixp_den = "*", rok_den = "*", zav_poh = "*", zp = "*", vs = "*", ks = "*", ss = "*", ps_sml = "*", popis = "*", ac_ag = "*", ac = "*", ktg_typ = "*", ixs_typ = "*", ixs_esu = "*", dat_vyst = "*", dat_uup = "*", dat_evid = "*", dat_spl = "*", dat_zdan = "*", dat_zau = "*", dat_uhr = "*", dat_lik = "*", dat_kry = "*", dat_pol = "*", dat_neuhr = "*", dnu_po_spl = "*", cfuDto = "*", c_mena = "*", c_uhrazeno = "*", c_zust = "*", ixs_fun_akt = "*", List_ixp = "*", ixs_mask = "*", mena = "*", s_sto = "*", s_kry = "*", s_lik = "*", s_uhr = "*", s_kuhr = "*", s_zau = "*", s_evi = "*", s_por = "*", typ_dor = "*", priz_view = "*", priz_FIK = "*", priz_UK = "*", priz_SP = "*", priz_EKO = "*", historie = "*", neprip_uza = "*", historie_uzivatel = "*", vlastni = "*", ixs_fun_vyriz = "*", typ_pohledu = "*", eko_subjekt = "*", typ_org = "*", stav_insolv = "*", ac_esu = "*", ico = "*", bu_ci = "*", sk_ci = "*", bu_vl = "*", sk_vl = "*", esu_ixs_esu = "*", wfl_kl_slovo = "*", vlastnosti_r = "*", vlastnosti_s = "*",}
	const enum GBplFakturaDoslaFilterDtoTypes { ixp = "string", ixp_den = "string", rok_den = "number", zav_poh = "number", zp = "JsonDecimal", vs = "GBaseFilter<string>", ks = "string", ss = "string", ps_sml = "GBaseFilter<string>", popis = "GBaseFilter<string>", ac_ag = "GBaseFilter<string>", ac = "GBaseFilter<string>", ktg_typ = "GBaseFilter<string>", ixs_typ = "GBaseFilter<string>", ixs_esu = "GBaseFilter<string>", dat_vyst = "GBaseFilter<JsonDate>", dat_uup = "GBaseFilter<JsonDate>", dat_evid = "GBaseFilter<JsonDate>", dat_spl = "GBaseFilter<JsonDate>", dat_zdan = "GBaseFilter<JsonDate>", dat_zau = "GBaseFilter<JsonDate>", dat_uhr = "GBaseFilter<JsonDate>", dat_lik = "GBaseFilter<JsonDate>", dat_kry = "GBaseFilter<JsonDate>", dat_pol = "GBaseFilter<JsonDate>", dat_neuhr = "GBaseFilter<JsonDate>", dnu_po_spl = "GBaseFilter<number>", cfuDto = "Gordic.Eko.Interface.GCfuFilterDto[]", c_mena = "GIntervalDto<JsonDecimal>", c_uhrazeno = "GIntervalDto<JsonDecimal>", c_zust = "GIntervalDto<JsonDecimal>", ixs_fun_akt = "string", List_ixp = "string[]", ixs_mask = "string", mena = "number", s_sto = "GBaseFilter<number>", s_kry = "GBaseFilter<number>", s_lik = "GBaseFilter<number>", s_uhr = "GBaseFilter<number>", s_kuhr = "GBaseFilter<number>", s_zau = "GBaseFilter<number>", s_evi = "GBaseFilter<number>", s_por = "GBaseFilter<number>", typ_dor = "GBaseFilter<number>", priz_view = "GBaseFilter<number>", priz_FIK = "GBaseFilter<number>", priz_UK = "GBaseFilter<number>", priz_SP = "GBaseFilter<number>", priz_EKO = "GBaseFilter<number>", historie = "GBaseFilter<boolean>", neprip_uza = "GBaseFilter<boolean>", historie_uzivatel = "GBaseFilter<string>", vlastni = "GBaseFilter<boolean>", ixs_fun_vyriz = "GBaseFilter<string>", typ_pohledu = "number", eko_subjekt = "GBaseFilter<boolean>", typ_org = "number", stav_insolv = "number", ac_esu = "GBaseFilter<string>", ico = "string", bu_ci = "string", sk_ci = "string", bu_vl = "string", sk_vl = "string", esu_ixs_esu = "string", wfl_kl_slovo = "GBaseFilter<string>", vlastnosti_r = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]", vlastnosti_s = "Gordic.Gin.Interface.GGinVlastnostiFilterDto[]",}
	const enum GBplFakturaDoslaFilterDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaPlatbyDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro BplFakturaDoslaPlatby*/
	interface GBplFakturaDoslaPlatbyDto {
		/**ixp*/
		ixp?: string|null;
		/**radek_uhr*/
		radek_uhr?: number|null;
		/**subradek*/
		subradek?: number|null;
		/**lic*/
		lic?: string|null;
		/**eko_akt*/
		eko_akt?: number|null;
		/**arw*/
		arw?: number|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
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
		/**bu_txt_vl*/
		bu_txt_vl?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**bu_txt_ci*/
		bu_txt_ci?: string|null;
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
		/**c_par*/
		c_par?: JsonDecimal|null;
		/**dat_spl*/
		dat_spl?: JsonDate|null;
		/**dat_zap*/
		dat_zap?: JsonDate|null;
		/**dat_par*/
		dat_par?: JsonDate|null;
		/**dat_kuhr*/
		dat_kuhr?: JsonDate|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**cis_bdo*/
		cis_bdo?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
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
		/**id_platby*/
		id_platby?: string|null;
		/**ktg_upo*/
		ktg_upo?: number|null;
		/**dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**radek_upo*/
		radek_upo?: number|null;
		/**por_cislo_int*/
		por_cislo_int?: number|null;
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
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
		/**c_par_mena*/
		c_par_mena?: JsonDecimal|null;
		/**ixp_real*/
		ixp_real?: string|null;
		/**ixs_ext*/
		ixs_ext?: string|null;
		/**priz_nepar*/
		priz_nepar?: number|null;
		/**popis*/
		popis?: string|null;
		/**sds*/
		sds?: string|null;
		/**priz_pred_rcdn*/
		priz_pred_rcdn?: number|null;
		/**c_z0_par*/
		c_z0_par?: JsonDecimal|null;
		/**c_d0_par*/
		c_d0_par?: JsonDecimal|null;
		/**c_z1_par*/
		c_z1_par?: JsonDecimal|null;
		/**c_d1_par*/
		c_d1_par?: JsonDecimal|null;
		/**c_z2_par*/
		c_z2_par?: JsonDecimal|null;
		/**c_d2_par*/
		c_d2_par?: JsonDecimal|null;
		/**c_zao_par*/
		c_zao_par?: JsonDecimal|null;
		/**ixs_zmp_prik*/
		ixs_zmp_prik?: string|null;
		/**pri_uhr*/
		pri_uhr?: number|null;
		/**dat_sch*/
		dat_sch?: JsonDate|null;
		/**radek_upo_rez*/
		radek_upo_rez?: number|null;
		/**priz_rez_pri*/
		priz_rez_pri?: number|null;
		/**ixp_sml*/
		ixp_sml?: string|null;
		/**rok_sml*/
		rok_sml?: number|null;
		/**cislo_sml*/
		cislo_sml?: number|null;
		/**dsp*/
		dsp?: string|null;
		/**kurz*/
		kurz?: JsonDecimal|null;
		/**alg_par*/
		alg_par?: number|null;
		/**ixp_vaz*/
		ixp_vaz?: string|null;
		/**dat_spl_ag*/
		dat_spl_ag?: JsonDate|null;
		/**c_z3_par*/
		c_z3_par?: JsonDecimal|null;
		/**c_d3_par*/
		c_d3_par?: JsonDecimal|null;
		/**c_z4_par*/
		c_z4_par?: JsonDecimal|null;
		/**c_d4_par*/
		c_d4_par?: JsonDecimal|null;
		/**uus*/
		uus?: string|null;
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
		/**Název funkce*/
		nazev_ref?: string|null;
		upl_txt?: string|null;
		/**Měna - zkratka*/
		mena_zkr?: string|null;
		/**Měna - zkratka*/
		mena_poz_zkr?: string|null;
		/**Způsob platby - zkratka*/
		zp_zkr?: string|null;
		/**Způsob platby - text*/
		zp_txt?: string|null;
		/**cislo_par*/
		cislo_par?: number|null;
		/**rok_pid*/
		rok_pid?: number|null;
		/**cis_pid*/
		cis_pid?: number|null;
		/**nazev*/
		nazev?: string|null;
		/**dat_nov_zus*/
		dat_nov_zus?: JsonDate|null;
	}
	const enum GBplFakturaDoslaPlatbyDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", subradek = "subradek", lic = "lic", eko_akt = "eko_akt", arw = "arw", ixs_esu = "ixs_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_txt_ci = "bu_txt_ci", zp = "zp", ac = "ac", ixp_den = "ixp_den", s_uhrp = "s_uhrp", c = "c", c_par = "c_par", dat_spl = "dat_spl", dat_zap = "dat_zap", dat_par = "dat_par", dat_kuhr = "dat_kuhr", typ_ag = "typ_ag", ktg_typ = "ktg_typ", cis_bdo = "cis_bdo", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena = "mena", c_mena = "c_mena", zp_z = "zp_z", hra_pop = "hra_pop", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", id_platby = "id_platby", ktg_upo = "ktg_upo", dat_vzniku = "dat_vzniku", radek_upo = "radek_upo", por_cislo_int = "por_cislo_int", rok = "rok", ico = "ico", ucs = "ucs", upl = "upl", exp_pla = "exp_pla", bu_pop = "bu_pop", mena_pop = "mena_pop", mena_poz = "mena_poz", inf1 = "inf1", inf2 = "inf2", c_par_mena = "c_par_mena", ixp_real = "ixp_real", ixs_ext = "ixs_ext", priz_nepar = "priz_nepar", popis = "popis", sds = "sds", priz_pred_rcdn = "priz_pred_rcdn", c_z0_par = "c_z0_par", c_d0_par = "c_d0_par", c_z1_par = "c_z1_par", c_d1_par = "c_d1_par", c_z2_par = "c_z2_par", c_d2_par = "c_d2_par", c_zao_par = "c_zao_par", ixs_zmp_prik = "ixs_zmp_prik", pri_uhr = "pri_uhr", dat_sch = "dat_sch", radek_upo_rez = "radek_upo_rez", priz_rez_pri = "priz_rez_pri", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", dsp = "dsp", kurz = "kurz", alg_par = "alg_par", ixp_vaz = "ixp_vaz", dat_spl_ag = "dat_spl_ag", c_z3_par = "c_z3_par", c_d3_par = "c_d3_par", c_z4_par = "c_z4_par", c_d4_par = "c_d4_par", uus = "uus", u_zp = "u_zp", sk_ci_mf = "sk_ci_mf", bu_ci_mf = "bu_ci_mf", c_mf = "c_mf", ixs_esu_mf = "ixs_esu_mf", vs_mf = "vs_mf", ks_mf = "ks_mf", ss_mf = "ss_mf", id_hdr_ris_pik = "id_hdr_ris_pik", radek_hdr_pik = "radek_hdr_pik", nazev_ref = "nazev_ref", upl_txt = "upl_txt", mena_zkr = "mena_zkr", mena_poz_zkr = "mena_poz_zkr", zp_zkr = "zp_zkr", zp_txt = "zp_txt", cislo_par = "cislo_par", rok_pid = "rok_pid", cis_pid = "cis_pid", nazev = "nazev", dat_nov_zus = "dat_nov_zus",}
	const enum GBplFakturaDoslaPlatbyDtoFragments { ixp = "main", radek_uhr = "main", subradek = "main", lic = "main", eko_akt = "main", arw = "main", ixs_esu = "main", vs = "main", ks = "main", ss = "main", sk_vl = "main", bu_vl = "main", bu_txt_vl = "main", sk_ci = "main", bu_ci = "main", bu_txt_ci = "main", zp = "main", ac = "main", ixp_den = "main", s_uhrp = "main", c = "main", c_par = "main", dat_spl = "main", dat_zap = "main", dat_par = "main", dat_kuhr = "main", typ_ag = "main", ktg_typ = "main", cis_bdo = "main", dat_zmena = "main", zmenu_prov = "main", mena = "main", c_mena = "main", zp_z = "main", hra_pop = "main", pla_tit = "main", ucel_uhr = "main", dev_pov = "main", id_platby = "main", ktg_upo = "main", dat_vzniku = "main", radek_upo = "main", por_cislo_int = "main", rok = "main", ico = "main", ucs = "main", upl = "main", exp_pla = "main", bu_pop = "main", mena_pop = "main", mena_poz = "main", inf1 = "main", inf2 = "main", c_par_mena = "main", ixp_real = "main", ixs_ext = "main", priz_nepar = "main", popis = "main", sds = "main", priz_pred_rcdn = "main", c_z0_par = "main", c_d0_par = "main", c_z1_par = "main", c_d1_par = "main", c_z2_par = "main", c_d2_par = "main", c_zao_par = "main", ixs_zmp_prik = "main", pri_uhr = "main", dat_sch = "main", radek_upo_rez = "main", priz_rez_pri = "main", ixp_sml = "main", rok_sml = "main", cislo_sml = "main", dsp = "main", kurz = "main", alg_par = "main", ixp_vaz = "main", dat_spl_ag = "main", c_z3_par = "main", c_d3_par = "main", c_z4_par = "main", c_d4_par = "main", uus = "main", u_zp = "main", sk_ci_mf = "main", bu_ci_mf = "main", c_mf = "main", ixs_esu_mf = "main", vs_mf = "main", ks_mf = "main", ss_mf = "main", id_hdr_ris_pik = "main", radek_hdr_pik = "main", nazev_ref = "main", upl_txt = "main", mena_zkr = "main", mena_poz_zkr = "main", zp_zkr = "main", zp_txt = "main", cislo_par = "main", rok_pid = "main", cis_pid = "main", nazev = "main", dat_nov_zus = "main",}
	const enum GBplFakturaDoslaPlatbyDtoTypes { ixp = "string", radek_uhr = "number", subradek = "number", lic = "string", eko_akt = "number", arw = "number", ixs_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", sk_ci = "string", bu_ci = "string", bu_txt_ci = "string", zp = "number", ac = "string", ixp_den = "string", s_uhrp = "number", c = "JsonDecimal", c_par = "JsonDecimal", dat_spl = "JsonDate", dat_zap = "JsonDate", dat_par = "JsonDate", dat_kuhr = "JsonDate", typ_ag = "number", ktg_typ = "number", cis_bdo = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mena = "number", c_mena = "JsonDecimal", zp_z = "number", hra_pop = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", id_platby = "string", ktg_upo = "number", dat_vzniku = "JsonDate", radek_upo = "number", por_cislo_int = "number", rok = "number", ico = "string", ucs = "string", upl = "number", exp_pla = "number", bu_pop = "string", mena_pop = "number", mena_poz = "number", inf1 = "string", inf2 = "string", c_par_mena = "JsonDecimal", ixp_real = "string", ixs_ext = "string", priz_nepar = "number", popis = "string", sds = "string", priz_pred_rcdn = "number", c_z0_par = "JsonDecimal", c_d0_par = "JsonDecimal", c_z1_par = "JsonDecimal", c_d1_par = "JsonDecimal", c_z2_par = "JsonDecimal", c_d2_par = "JsonDecimal", c_zao_par = "JsonDecimal", ixs_zmp_prik = "string", pri_uhr = "number", dat_sch = "JsonDate", radek_upo_rez = "number", priz_rez_pri = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", dsp = "string", kurz = "JsonDecimal", alg_par = "number", ixp_vaz = "string", dat_spl_ag = "JsonDate", c_z3_par = "JsonDecimal", c_d3_par = "JsonDecimal", c_z4_par = "JsonDecimal", c_d4_par = "JsonDecimal", uus = "string", u_zp = "number", sk_ci_mf = "string", bu_ci_mf = "string", c_mf = "JsonDecimal", ixs_esu_mf = "string", vs_mf = "string", ks_mf = "string", ss_mf = "string", id_hdr_ris_pik = "string", radek_hdr_pik = "number", nazev_ref = "string", upl_txt = "string", mena_zkr = "string", mena_poz_zkr = "string", zp_zkr = "string", zp_txt = "string", cislo_par = "number", rok_pid = "number", cis_pid = "number", nazev = "string", dat_nov_zus = "JsonDate",}
	const enum GBplFakturaDoslaPlatbyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaUctovaniKrytiLikvidaceDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro BplFakturaDoslaUctovaniKrytiLikvidace*/
	interface GBplFakturaDoslaUctovaniKrytiLikvidaceDto {
		/**ixp*/
		ixp?: string|null;
		/**radek*/
		radek?: number|null;
		/**lic*/
		lic?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**up Stav*/
		up_stav?: number|null;
		/**název*/
		nazev?: string|null;
		/**ixs kon*/
		ixs_kon?: string|null;
		/**částka*/
		c?: JsonDecimal|null;
		/**znam*/
		znam?: number|null;
		/**datum zauc*/
		dat_zauc?: JsonDate|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**ičo*/
		ico?: string|null;
		/**účetní středisko*/
		ucs?: string|null;
		/**nákladové středisko*/
		nks?: string|null;
		/**te0*/
		te0?: string|null;
		/**te1*/
		te1?: string|null;
		/**te2*/
		te2?: string|null;
		/**te3*/
		te3?: string|null;
		/**te4*/
		te4?: string|null;
		/**uea*/
		uea?: string|null;
		/**ueb*/
		ueb?: string|null;
		/**uec*/
		uec?: string|null;
		/**ued*/
		ued?: string|null;
		/**uee*/
		uee?: string|null;
		/**uef*/
		uef?: string|null;
		/**ueg*/
		ueg?: string|null;
		/**ueh*/
		ueh?: string|null;
		/**uei*/
		uei?: string|null;
		/**uej*/
		uej?: string|null;
		/**rok dph*/
		rok_dph?: number|null;
		/**mesic dph*/
		mesic_dph?: number|null;
		/**c kr*/
		c_kr?: JsonDecimal|null;
		/**Typ kr*/
		typ_kr?: number|null;
		/**Typ oper*/
		typ_oper?: number|null;
		/**subrada duz*/
		subrada_duz?: number|null;
		/**účtárna*/
		uus?: string|null;
		/**radek pre*/
		radek_pre?: number|null;
		/**c krp*/
		c_krp?: JsonDecimal|null;
		/**Typ krp*/
		typ_krp?: number|null;
		/**radek hdr*/
		radek_hdr?: number|null;
		/**id hdr ris*/
		id_hdr_ris?: string|null;
		/**ixp bvp*/
		ixp_bvp?: string|null;
		/**radek pol*/
		radek_pol?: number|null;
		/**subradek*/
		subradek?: number|null;
		/**radek av*/
		radek_av?: number|null;
		/**ixp ud*/
		ixp_ud?: string|null;
		/**f*/
		f?: string|null;
		/**poradi*/
		poradi?: number|null;
		/**ixs_kon_txt*/
		kod?: string|null;
		/**ixs_kon_txt*/
		ixs_kon_txt?: string|null;
		/**typ_kr_txt*/
		typ_kr_txt?: string|null;
		/**typ_oper_txt*/
		typ_oper_txt?: string|null;
		/**up_stav_txt*/
		up_stav_txt?: string|null;
	}
	const enum GBplFakturaDoslaUctovaniKrytiLikvidaceDtoNames { ixp = "ixp", radek = "radek", lic = "lic", aktivita = "aktivita", up_stav = "up_stav", nazev = "nazev", ixs_kon = "ixs_kon", c = "c", znam = "znam", dat_zauc = "dat_zauc", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", ucs = "ucs", nks = "nks", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", rok_dph = "rok_dph", mesic_dph = "mesic_dph", c_kr = "c_kr", typ_kr = "typ_kr", typ_oper = "typ_oper", subrada_duz = "subrada_duz", uus = "uus", radek_pre = "radek_pre", c_krp = "c_krp", typ_krp = "typ_krp", radek_hdr = "radek_hdr", id_hdr_ris = "id_hdr_ris", ixp_bvp = "ixp_bvp", radek_pol = "radek_pol", subradek = "subradek", radek_av = "radek_av", ixp_ud = "ixp_ud", f = "f", poradi = "poradi", kod = "kod", ixs_kon_txt = "ixs_kon_txt", typ_kr_txt = "typ_kr_txt", typ_oper_txt = "typ_oper_txt", up_stav_txt = "up_stav_txt",}
	const enum GBplFakturaDoslaUctovaniKrytiLikvidaceDtoFragments { ixp = "main", radek = "main", lic = "main", aktivita = "main", up_stav = "main", nazev = "main", ixs_kon = "main", c = "main", znam = "main", dat_zauc = "main", dat_zmena = "main", zmenu_prov = "main", ico = "main", ucs = "main", nks = "main", te0 = "main", te1 = "main", te2 = "main", te3 = "main", te4 = "main", uea = "main", ueb = "main", uec = "main", ued = "main", uee = "main", uef = "main", ueg = "main", ueh = "main", uei = "main", uej = "main", rok_dph = "main", mesic_dph = "main", c_kr = "main", typ_kr = "main", typ_oper = "main", subrada_duz = "main", uus = "main", radek_pre = "main", c_krp = "main", typ_krp = "main", radek_hdr = "main", id_hdr_ris = "main", ixp_bvp = "main", radek_pol = "main", subradek = "main", radek_av = "main", ixp_ud = "main", f = "main", poradi = "main", kod = "skon", ixs_kon_txt = "skon", typ_kr_txt = "typ_kr_txt", typ_oper_txt = "typ_oper_txt", up_stav_txt = "up_stav_txt",}
	const enum GBplFakturaDoslaUctovaniKrytiLikvidaceDtoTypes { ixp = "string", radek = "number", lic = "string", aktivita = "number", up_stav = "number", nazev = "string", ixs_kon = "string", c = "JsonDecimal", znam = "number", dat_zauc = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", ucs = "string", nks = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", rok_dph = "number", mesic_dph = "number", c_kr = "JsonDecimal", typ_kr = "number", typ_oper = "number", subrada_duz = "number", uus = "string", radek_pre = "number", c_krp = "JsonDecimal", typ_krp = "number", radek_hdr = "number", id_hdr_ris = "string", ixp_bvp = "string", radek_pol = "number", subradek = "number", radek_av = "number", ixp_ud = "string", f = "string", poradi = "number", kod = "string", ixs_kon_txt = "string", typ_kr_txt = "string", typ_oper_txt = "string", up_stav_txt = "string",}
	const enum GBplFakturaDoslaUctovaniKrytiLikvidaceDtoTypeLengths { ixp = 12, lic = 4, nazev = 254, ixs_kon = 12, zmenu_prov = 12, ico = 10, ucs = 10, nks = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, uus = 10, id_hdr_ris = 10, ixp_bvp = 12, ixp_ud = 12, f = 1,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaUhradaDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro BplFakturaDoslaPlatby*/
	interface GBplFakturaDoslaUhradaDto {
		/**ixp*/
		ixp?: string|null;
		/**radek_uhr*/
		radek_uhr?: number|null;
		/**subradek*/
		subradek?: number|null;
		/**lic*/
		lic?: string|null;
		/**eko_akt*/
		eko_akt?: number|null;
		/**arw*/
		arw?: number|null;
		/**ixs_esu*/
		ixs_esu?: string|null;
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
		/**bu_txt_vl*/
		bu_txt_vl?: string|null;
		/**sk_ci*/
		sk_ci?: string|null;
		/**bu_ci*/
		bu_ci?: string|null;
		/**bu_txt_ci*/
		bu_txt_ci?: string|null;
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
		/**c_par*/
		c_par?: JsonDecimal|null;
		/**CUhradit*/
		CUhradit?: JsonDecimal|null;
		/**CUhraditMena*/
		CUhraditMena?: JsonDecimal|null;
		/**dat_spl*/
		dat_spl?: JsonDate|null;
		/**Datum plánované úhrady*/
		dat_uhrady?: JsonDate|null;
		/**dat_par*/
		dat_par?: JsonDate|null;
		/**dat_kuhr*/
		dat_kuhr?: JsonDate|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**cis_bdo*/
		cis_bdo?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
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
		/**id_platby*/
		id_platby?: string|null;
		/**ktg_upo*/
		ktg_upo?: number|null;
		/**dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**radek_upo*/
		radek_upo?: number|null;
		/**por_cislo_int*/
		por_cislo_int?: number|null;
		/**rok*/
		rok?: number|null;
		/**ico*/
		ico?: string|null;
		/**ucs*/
		ucs?: string|null;
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
		/**c_par_mena*/
		c_par_mena?: JsonDecimal|null;
		/**ixp_real*/
		ixp_real?: string|null;
		/**ixs_ext*/
		ixs_ext?: string|null;
		/**priz_nepar*/
		priz_nepar?: number|null;
		/**popis*/
		popis?: string|null;
		/**sds*/
		sds?: string|null;
		/**priz_pred_rcdn*/
		priz_pred_rcdn?: number|null;
		/**c_z0_par*/
		c_z0_par?: JsonDecimal|null;
		/**c_d0_par*/
		c_d0_par?: JsonDecimal|null;
		/**c_z1_par*/
		c_z1_par?: JsonDecimal|null;
		/**c_d1_par*/
		c_d1_par?: JsonDecimal|null;
		/**c_z2_par*/
		c_z2_par?: JsonDecimal|null;
		/**c_d2_par*/
		c_d2_par?: JsonDecimal|null;
		/**c_zao_par*/
		c_zao_par?: JsonDecimal|null;
		/**ixs_zmp_prik*/
		ixs_zmp_prik?: string|null;
		/**pri_uhr*/
		pri_uhr?: number|null;
		/**dat_sch*/
		dat_sch?: JsonDate|null;
		/**radek_upo_rez*/
		radek_upo_rez?: number|null;
		/**priz_rez_pri*/
		priz_rez_pri?: number|null;
		/**ixp_sml*/
		ixp_sml?: string|null;
		/**rok_sml*/
		rok_sml?: number|null;
		/**cislo_sml*/
		cislo_sml?: number|null;
		/**dsp*/
		dsp?: string|null;
		/**kurz*/
		kurz?: JsonDecimal|null;
		/**alg_par*/
		alg_par?: number|null;
		/**ixp_vaz*/
		ixp_vaz?: string|null;
		/**dat_spl_ag*/
		dat_spl_ag?: JsonDate|null;
		/**c_z3_par*/
		c_z3_par?: JsonDecimal|null;
		/**c_d3_par*/
		c_d3_par?: JsonDecimal|null;
		/**c_z4_par*/
		c_z4_par?: JsonDecimal|null;
		/**c_d4_par*/
		c_d4_par?: JsonDecimal|null;
		/**uus*/
		uus?: string|null;
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
		/**Název funkce*/
		nazev_ref?: string|null;
		upl_txt?: string|null;
		/**Měna - zkratka*/
		mena_zkr?: string|null;
		/**Měna - zkratka*/
		mena_poz_zkr?: string|null;
		/**Způsob platby - zkratka*/
		zp_zkr?: string|null;
		/**cislo_par*/
		cislo_par?: number|null;
		/**rok_pid*/
		rok_pid?: number|null;
		/**cis_pid*/
		cis_pid?: number|null;
		/**nazev*/
		nazev?: string|null;
		/**dat_nov_zus*/
		dat_nov_zus?: JsonDate|null;
		/**c_kuhr*/
		c_kuhr?: JsonDecimal|null;
		/**c_kuhr_mena*/
		c_kuhr_mena?: JsonDecimal|null;
		/**c_zust*/
		c_zust?: JsonDecimal|null;
		/**c_zust_mena*/
		c_zust_mena?: JsonDecimal|null;
	}
	const enum GBplFakturaDoslaUhradaDtoNames { ixp = "ixp", radek_uhr = "radek_uhr", subradek = "subradek", lic = "lic", eko_akt = "eko_akt", arw = "arw", ixs_esu = "ixs_esu", vs = "vs", ks = "ks", ss = "ss", sk_vl = "sk_vl", bu_vl = "bu_vl", bu_txt_vl = "bu_txt_vl", sk_ci = "sk_ci", bu_ci = "bu_ci", bu_txt_ci = "bu_txt_ci", zp = "zp", ac = "ac", ixp_den = "ixp_den", s_uhrp = "s_uhrp", c = "c", c_par = "c_par", CUhradit = "CUhradit", CUhraditMena = "CUhraditMena", dat_spl = "dat_spl", dat_uhrady = "dat_uhrady", dat_par = "dat_par", dat_kuhr = "dat_kuhr", typ_ag = "typ_ag", ktg_typ = "ktg_typ", cis_bdo = "cis_bdo", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", mena = "mena", c_mena = "c_mena", zp_z = "zp_z", hra_pop = "hra_pop", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", id_platby = "id_platby", ktg_upo = "ktg_upo", dat_vzniku = "dat_vzniku", radek_upo = "radek_upo", por_cislo_int = "por_cislo_int", rok = "rok", ico = "ico", ucs = "ucs", upl = "upl", exp_pla = "exp_pla", bu_pop = "bu_pop", mena_pop = "mena_pop", mena_poz = "mena_poz", inf1 = "inf1", inf2 = "inf2", c_par_mena = "c_par_mena", ixp_real = "ixp_real", ixs_ext = "ixs_ext", priz_nepar = "priz_nepar", popis = "popis", sds = "sds", priz_pred_rcdn = "priz_pred_rcdn", c_z0_par = "c_z0_par", c_d0_par = "c_d0_par", c_z1_par = "c_z1_par", c_d1_par = "c_d1_par", c_z2_par = "c_z2_par", c_d2_par = "c_d2_par", c_zao_par = "c_zao_par", ixs_zmp_prik = "ixs_zmp_prik", pri_uhr = "pri_uhr", dat_sch = "dat_sch", radek_upo_rez = "radek_upo_rez", priz_rez_pri = "priz_rez_pri", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", dsp = "dsp", kurz = "kurz", alg_par = "alg_par", ixp_vaz = "ixp_vaz", dat_spl_ag = "dat_spl_ag", c_z3_par = "c_z3_par", c_d3_par = "c_d3_par", c_z4_par = "c_z4_par", c_d4_par = "c_d4_par", uus = "uus", u_zp = "u_zp", sk_ci_mf = "sk_ci_mf", bu_ci_mf = "bu_ci_mf", c_mf = "c_mf", ixs_esu_mf = "ixs_esu_mf", vs_mf = "vs_mf", ks_mf = "ks_mf", ss_mf = "ss_mf", id_hdr_ris_pik = "id_hdr_ris_pik", radek_hdr_pik = "radek_hdr_pik", nazev_ref = "nazev_ref", upl_txt = "upl_txt", mena_zkr = "mena_zkr", mena_poz_zkr = "mena_poz_zkr", zp_zkr = "zp_zkr", cislo_par = "cislo_par", rok_pid = "rok_pid", cis_pid = "cis_pid", nazev = "nazev", dat_nov_zus = "dat_nov_zus", c_kuhr = "c_kuhr", c_kuhr_mena = "c_kuhr_mena", c_zust = "c_zust", c_zust_mena = "c_zust_mena",}
	const enum GBplFakturaDoslaUhradaDtoFragments { ixp = "main", radek_uhr = "main", subradek = "main", lic = "main", eko_akt = "main", arw = "main", ixs_esu = "main", vs = "main", ks = "main", ss = "main", sk_vl = "main", bu_vl = "main", bu_txt_vl = "main", sk_ci = "main", bu_ci = "main", bu_txt_ci = "main", zp = "main", ac = "main", ixp_den = "main", s_uhrp = "main", c = "main", c_par = "main", CUhradit = "main", CUhraditMena = "main", dat_spl = "main", dat_uhrady = "main", dat_par = "main", dat_kuhr = "main", typ_ag = "main", ktg_typ = "main", cis_bdo = "main", dat_zmena = "main", zmenu_prov = "main", mena = "main", c_mena = "main", zp_z = "main", hra_pop = "main", pla_tit = "main", ucel_uhr = "main", dev_pov = "main", id_platby = "main", ktg_upo = "main", dat_vzniku = "main", radek_upo = "main", por_cislo_int = "main", rok = "main", ico = "main", ucs = "main", upl = "main", exp_pla = "main", bu_pop = "main", mena_pop = "main", mena_poz = "main", inf1 = "main", inf2 = "main", c_par_mena = "main", ixp_real = "main", ixs_ext = "main", priz_nepar = "main", popis = "main", sds = "main", priz_pred_rcdn = "main", c_z0_par = "main", c_d0_par = "main", c_z1_par = "main", c_d1_par = "main", c_z2_par = "main", c_d2_par = "main", c_zao_par = "main", ixs_zmp_prik = "main", pri_uhr = "main", dat_sch = "main", radek_upo_rez = "main", priz_rez_pri = "main", ixp_sml = "main", rok_sml = "main", cislo_sml = "main", dsp = "main", kurz = "main", alg_par = "main", ixp_vaz = "main", dat_spl_ag = "main", c_z3_par = "main", c_d3_par = "main", c_z4_par = "main", c_d4_par = "main", uus = "main", u_zp = "main", sk_ci_mf = "main", bu_ci_mf = "main", c_mf = "main", ixs_esu_mf = "main", vs_mf = "main", ks_mf = "main", ss_mf = "main", id_hdr_ris_pik = "main", radek_hdr_pik = "main", nazev_ref = "main", upl_txt = "main", mena_zkr = "main", mena_poz_zkr = "main", zp_zkr = "main", cislo_par = "main", rok_pid = "main", cis_pid = "main", nazev = "main", dat_nov_zus = "main", c_kuhr = "main", c_kuhr_mena = "main", c_zust = "main", c_zust_mena = "main",}
	const enum GBplFakturaDoslaUhradaDtoTypes { ixp = "string", radek_uhr = "number", subradek = "number", lic = "string", eko_akt = "number", arw = "number", ixs_esu = "string", vs = "string", ks = "string", ss = "string", sk_vl = "string", bu_vl = "string", bu_txt_vl = "string", sk_ci = "string", bu_ci = "string", bu_txt_ci = "string", zp = "number", ac = "string", ixp_den = "string", s_uhrp = "number", c = "JsonDecimal", c_par = "JsonDecimal", CUhradit = "JsonDecimal", CUhraditMena = "JsonDecimal", dat_spl = "JsonDate", dat_uhrady = "JsonDate", dat_par = "JsonDate", dat_kuhr = "JsonDate", typ_ag = "number", ktg_typ = "number", cis_bdo = "string", dat_zmena = "JsonDate", zmenu_prov = "string", mena = "number", c_mena = "JsonDecimal", zp_z = "number", hra_pop = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", id_platby = "string", ktg_upo = "number", dat_vzniku = "JsonDate", radek_upo = "number", por_cislo_int = "number", rok = "number", ico = "string", ucs = "string", upl = "number", exp_pla = "number", bu_pop = "string", mena_pop = "number", mena_poz = "number", inf1 = "string", inf2 = "string", c_par_mena = "JsonDecimal", ixp_real = "string", ixs_ext = "string", priz_nepar = "number", popis = "string", sds = "string", priz_pred_rcdn = "number", c_z0_par = "JsonDecimal", c_d0_par = "JsonDecimal", c_z1_par = "JsonDecimal", c_d1_par = "JsonDecimal", c_z2_par = "JsonDecimal", c_d2_par = "JsonDecimal", c_zao_par = "JsonDecimal", ixs_zmp_prik = "string", pri_uhr = "number", dat_sch = "JsonDate", radek_upo_rez = "number", priz_rez_pri = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", dsp = "string", kurz = "JsonDecimal", alg_par = "number", ixp_vaz = "string", dat_spl_ag = "JsonDate", c_z3_par = "JsonDecimal", c_d3_par = "JsonDecimal", c_z4_par = "JsonDecimal", c_d4_par = "JsonDecimal", uus = "string", u_zp = "number", sk_ci_mf = "string", bu_ci_mf = "string", c_mf = "JsonDecimal", ixs_esu_mf = "string", vs_mf = "string", ks_mf = "string", ss_mf = "string", id_hdr_ris_pik = "string", radek_hdr_pik = "number", nazev_ref = "string", upl_txt = "string", mena_zkr = "string", mena_poz_zkr = "string", zp_zkr = "string", cislo_par = "number", rok_pid = "number", cis_pid = "number", nazev = "string", dat_nov_zus = "JsonDate", c_kuhr = "JsonDecimal", c_kuhr_mena = "JsonDecimal", c_zust = "JsonDecimal", c_zust_mena = "JsonDecimal",}
	const enum GBplFakturaDoslaUhradaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaVazbyDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO vazby*/
	interface GBplFakturaDoslaVazbyDto {
		/**Identifikátor fak*/
		ixp_fak?: string|null;
		/**Identifikátor*/
		ixp?: string|null;
		/**Vaz fak*/
		vaz_fak?: number|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Částka*/
		c?: JsonDecimal|null;
		/**C z0*/
		c_z0?: JsonDecimal|null;
		/**C zx*/
		c_zx?: JsonDecimal|null;
		/**C z1*/
		c_z1?: JsonDecimal|null;
		/**C d1*/
		c_d1?: JsonDecimal|null;
		/**C z2*/
		c_z2?: JsonDecimal|null;
		/**C d2*/
		c_d2?: JsonDecimal|null;
		/**C zaok*/
		c_zaok?: JsonDecimal|null;
		/**C z1d*/
		c_z1d?: JsonDecimal|null;
		/**C d1d*/
		c_d1d?: JsonDecimal|null;
		/**C z2d*/
		c_z2d?: JsonDecimal|null;
		/**C d2d*/
		c_d2d?: JsonDecimal|null;
		/**C z3*/
		c_z3?: JsonDecimal|null;
		/**C d3*/
		c_d3?: JsonDecimal|null;
		/**C z3d*/
		c_z3d?: JsonDecimal|null;
		/**C d3d*/
		c_d3d?: JsonDecimal|null;
		/**C z4*/
		c_z4?: JsonDecimal|null;
		/**C d4*/
		c_d4?: JsonDecimal|null;
		/**C z4d*/
		c_z4d?: JsonDecimal|null;
		/**C d4d*/
		c_d4d?: JsonDecimal|null;
		/**C měna*/
		c_mena?: JsonDecimal|null;
		/**Počet položek*/
		pocet?: number|null;
		/**Kurz - kurz_akt*/
		kurz?: JsonDecimal|null;
		/**Částka záloh celkem*/
		c_zalohy_celkem?: JsonDecimal|null;
		/**Měna zkratka*/
		mena_zkr?: string|null;
		/**ESU nazev*/
		nazev?: string|null;
		/**ESU IČO*/
		ico_esu?: string|null;
		/**Číslo dokladu dodavatele*/
		ac_esu?: string|null;
		/**Agendové číslo*/
		ac_ag?: string|null;
		/**Evidenční číslo*/
		ac?: string|null;
		/**Identifikátor knihy*/
		ixp_den?: string|null;
		/**Název knihy*/
		nazev_den?: string|null;
		/**Popis*/
		popis?: string|null;
		/**VS*/
		vs?: string|null;
		/**Vyuctovano v mene*/
		c_vyuc_mena?: JsonDecimal|null;
		/**Rok knihy*/
		rok?: number|null;
	}
	const enum GBplFakturaDoslaVazbyDtoNames { ixp_fak = "ixp_fak", ixp = "ixp", vaz_fak = "vaz_fak", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c = "c", c_z0 = "c_z0", c_zx = "c_zx", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_zaok = "c_zaok", c_z1d = "c_z1d", c_d1d = "c_d1d", c_z2d = "c_z2d", c_d2d = "c_d2d", c_z3 = "c_z3", c_d3 = "c_d3", c_z3d = "c_z3d", c_d3d = "c_d3d", c_z4 = "c_z4", c_d4 = "c_d4", c_z4d = "c_z4d", c_d4d = "c_d4d", c_mena = "c_mena", pocet = "pocet", kurz = "kurz", c_zalohy_celkem = "c_zalohy_celkem", mena_zkr = "mena_zkr", nazev = "nazev", ico_esu = "ico_esu", ac_esu = "ac_esu", ac_ag = "ac_ag", ac = "ac", ixp_den = "ixp_den", nazev_den = "nazev_den", popis = "popis", vs = "vs", c_vyuc_mena = "c_vyuc_mena", rok = "rok",}
	const enum GBplFakturaDoslaVazbyDtoFragments { ixp_fak = "main", ixp = "main", vaz_fak = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", c = "main", c_z0 = "main", c_zx = "main", c_z1 = "main", c_d1 = "main", c_z2 = "main", c_d2 = "main", c_zaok = "main", c_z1d = "main", c_d1d = "main", c_z2d = "main", c_d2d = "main", c_z3 = "main", c_d3 = "main", c_z3d = "main", c_d3d = "main", c_z4 = "main", c_d4 = "main", c_z4d = "main", c_d4d = "main", c_mena = "main", pocet = "main", kurz = "main", c_zalohy_celkem = "main", mena_zkr = "main", nazev = "main", ico_esu = "main", ac_esu = "main", ac_ag = "main", ac = "main", ixp_den = "main", nazev_den = "main", popis = "main", vs = "main", c_vyuc_mena = "main", rok = "main",}
	const enum GBplFakturaDoslaVazbyDtoTypes { ixp_fak = "string", ixp = "string", vaz_fak = "number", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c = "JsonDecimal", c_z0 = "JsonDecimal", c_zx = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_zaok = "JsonDecimal", c_z1d = "JsonDecimal", c_d1d = "JsonDecimal", c_z2d = "JsonDecimal", c_d2d = "JsonDecimal", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z3d = "JsonDecimal", c_d3d = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", c_z4d = "JsonDecimal", c_d4d = "JsonDecimal", c_mena = "JsonDecimal", pocet = "number", kurz = "JsonDecimal", c_zalohy_celkem = "JsonDecimal", mena_zkr = "string", nazev = "string", ico_esu = "string", ac_esu = "string", ac_ag = "string", ac = "string", ixp_den = "string", nazev_den = "string", popis = "string", vs = "string", c_vyuc_mena = "JsonDecimal", rok = "number",}
	const enum GBplFakturaDoslaVazbyDtoTypeLengths { ixp_fak = 12, ixp = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaVazbyPripravaRequestDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO vazby - přenos ISL*/
	interface GBplFakturaDoslaVazbyPripravaRequestDto {
		/**Identifikátor dokladu, na který se navazuje*/
		ixp?: string|null;
		/**Typ vazby - 20 =*/
		typVazby?: number|null;
		/**FALSE = nová vazba, TRUE = stará vazba*/
		storno?: boolean|null;
		/**List vazeb, které se mají navázat*/
		vazbyDoklady?: Gordic.Bpl.Interface.GBplFakturaDoslaVyberVazebDto[]|null;
	}
	const enum GBplFakturaDoslaVazbyPripravaRequestDtoNames { ixp = "ixp", typVazby = "typVazby", storno = "storno", vazbyDoklady = "vazbyDoklady",}
	const enum GBplFakturaDoslaVazbyPripravaRequestDtoFragments { ixp = "*", typVazby = "*", storno = "*", vazbyDoklady = "*",}
	const enum GBplFakturaDoslaVazbyPripravaRequestDtoTypes { ixp = "string", typVazby = "number", storno = "boolean", vazbyDoklady = "Gordic.Bpl.Interface.GBplFakturaDoslaVyberVazebDto[]",}
	const enum GBplFakturaDoslaVazbyPripravaRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplFakturaDoslaVecnyProfilDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO popisující Věcný profil*/
	interface GBplFakturaDoslaVecnyProfilDto {
		/**Identifikátor.*/
		ixp?: string|null;
		/**Radek pol.*/
		radek_pol?: number|null;
		/**Lic.*/
		lic?: string|null;
		/**Aktivita.*/
		aktivita?: number|null;
		/**Arw.*/
		arw?: number|null;
		/**Mp Stav.*/
		mp_stav?: number|null;
		/**Název.*/
		nazev?: string|null;
		/**Částka.*/
		c?: JsonDecimal|null;
		/**C upr.*/
		c_upr?: JsonDecimal|null;
		/**Dan Typ.*/
		dan_typ?: number|null;
		/**C dan.*/
		c_dan?: JsonDecimal|null;
		/**Mj.*/
		mj?: string|null;
		/**M.*/
		m?: JsonDecimal|null;
		/**C měna.*/
		c_mena?: JsonDecimal|null;
		/**Mjm.*/
		mjm?: JsonDecimal|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**Kód pol.*/
		kod_pol?: string|null;
		/**Cmj.*/
		cmj?: JsonDecimal|null;
		/**Dan proc.*/
		dan_proc?: JsonDecimal|null;
		/**Typ pol.*/
		typ_pol?: number|null;
		/**Priz pdp.*/
		priz_pdp?: number|null;
		/**Identifikátor maj.*/
		ixs_maj?: string|null;
		/**Identifikátor maj.*/
		ixp_maj?: string|null;
		/**Maj popis.*/
		maj_popis?: string|null;
		/**Maj ser číslo.*/
		maj_ser_cislo?: number|null;
		/**C upr czk.*/
		c_upr_czk?: JsonDecimal|null;
		/**C dan czk.*/
		c_dan_czk?: JsonDecimal|null;
		/**MJ_zkr - gincmej*/
		mj_zkr?: string|null;
		/**Měna_zkratka - ekocmen*/
		mena_zkr?: string|null;
		/**Dan_typ_txt - ekocdat*/
		dan_typ_txt?: string|null;
		/**Provedl - ginszmp*/
		provedl?: string|null;
		/**Skutečné pořadí.*/
		poradi?: number|null;
		/**Počet položek.*/
		pocet?: number|null;
		/**Částka v měně po započtení slevy nebo přirážky (c_mena + c_upr)*/
		c_upravena?: JsonDecimal|null;
		/**Částka v CZK po započtení slevy nebo přirážky (c_mena * kurz + c_upr_czk)*/
		c_upravena_czk?: JsonDecimal|null;
		/**Částka za měrnou jednotku v CZK (cmj)*/
		cmj_czk?: JsonDecimal|null;
		/**Částka v CZK (c_mena * kurz)*/
		c_mena_czk?: JsonDecimal|null;
		/**Částka dodanění v měně (c_dan - pokud je priz_pdp > 0)*/
		c_dodan?: JsonDecimal|null;
		/**Částka dodanění v CZK (c_dan_czk - pokud je priz_pdp > 0)*/
		c_dodan_czk?: JsonDecimal|null;
		/**Kurz z dokladu*/
		kurz?: JsonDecimal|null;
		/**Částka v měně za celou položku včetně daně a všech přirážem a slev (c_upravena + c_dan)*/
		c_celk?: JsonDecimal|null;
		/**Částka v CZK za celou položku včetně daně a všech přirážem a slev (c_upravena_czk + c_dan_czk)*/
		c_celk_czk?: JsonDecimal|null;
		/**Procentuální vyjádření slevy nebo přirážky*/
		p_sleva?: JsonDecimal|null;
		/**Permissions*/
		Permissions?: Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPermissions|null;
	}
	const enum GBplFakturaDoslaVecnyProfilDtoNames { ixp = "ixp", radek_pol = "radek_pol", lic = "lic", aktivita = "aktivita", arw = "arw", mp_stav = "mp_stav", nazev = "nazev", c = "c", c_upr = "c_upr", dan_typ = "dan_typ", c_dan = "c_dan", mj = "mj", m = "m", c_mena = "c_mena", mjm = "mjm", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", kod_pol = "kod_pol", cmj = "cmj", dan_proc = "dan_proc", typ_pol = "typ_pol", priz_pdp = "priz_pdp", ixs_maj = "ixs_maj", ixp_maj = "ixp_maj", maj_popis = "maj_popis", maj_ser_cislo = "maj_ser_cislo", c_upr_czk = "c_upr_czk", c_dan_czk = "c_dan_czk", mj_zkr = "mj_zkr", mena_zkr = "mena_zkr", dan_typ_txt = "dan_typ_txt", provedl = "provedl", poradi = "poradi", pocet = "pocet", c_upravena = "c_upravena", c_upravena_czk = "c_upravena_czk", cmj_czk = "cmj_czk", c_mena_czk = "c_mena_czk", c_dodan = "c_dodan", c_dodan_czk = "c_dodan_czk", kurz = "kurz", c_celk = "c_celk", c_celk_czk = "c_celk_czk", p_sleva = "p_sleva", Permissions = "Permissions",}
	const enum GBplFakturaDoslaVecnyProfilDtoFragments { ixp = "main", radek_pol = "main", lic = "main", aktivita = "main", arw = "main", mp_stav = "main", nazev = "main", c = "main", c_upr = "main", dan_typ = "main", c_dan = "main", mj = "main", m = "main", c_mena = "main", mjm = "main", dat_zmena = "main", zmenu_prov = "main", kod_pol = "main", cmj = "main", dan_proc = "main", typ_pol = "main", priz_pdp = "main", ixs_maj = "main", ixp_maj = "main", maj_popis = "main", maj_ser_cislo = "main", c_upr_czk = "main", c_dan_czk = "main", mj_zkr = "main", mena_zkr = "main", dan_typ_txt = "main", provedl = "main", poradi = "main", pocet = "main", c_upravena = "main", c_upravena_czk = "main", cmj_czk = "main", c_mena_czk = "main", c_dodan = "main", c_dodan_czk = "main", kurz = "main", c_celk = "main", c_celk_czk = "main", p_sleva = "main", Permissions = "Permissions",}
	const enum GBplFakturaDoslaVecnyProfilDtoTypes { ixp = "string", radek_pol = "number", lic = "string", aktivita = "number", arw = "number", mp_stav = "number", nazev = "string", c = "JsonDecimal", c_upr = "JsonDecimal", dan_typ = "number", c_dan = "JsonDecimal", mj = "string", m = "JsonDecimal", c_mena = "JsonDecimal", mjm = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", kod_pol = "string", cmj = "JsonDecimal", dan_proc = "JsonDecimal", typ_pol = "number", priz_pdp = "number", ixs_maj = "string", ixp_maj = "string", maj_popis = "string", maj_ser_cislo = "number", c_upr_czk = "JsonDecimal", c_dan_czk = "JsonDecimal", mj_zkr = "string", mena_zkr = "string", dan_typ_txt = "string", provedl = "string", poradi = "number", pocet = "number", c_upravena = "JsonDecimal", c_upravena_czk = "JsonDecimal", cmj_czk = "JsonDecimal", c_mena_czk = "JsonDecimal", c_dodan = "JsonDecimal", c_dodan_czk = "JsonDecimal", kurz = "JsonDecimal", c_celk = "JsonDecimal", c_celk_czk = "JsonDecimal", p_sleva = "JsonDecimal", Permissions = "Gordic.Bpl.Interface.GBplFakturaDoslaVecnyProfilPermissions",}
	const enum GBplFakturaDoslaVecnyProfilDtoTypeLengths { ixp = 12, lic = 4, nazev = 254, mj = 5, zmenu_prov = 12, kod_pol = 20, ixs_maj = 12, ixp_maj = 12, maj_popis = 20,}
	/**DTO popisující Popisy věcného profilu*/
	interface GBplFakturaDoslaVecnyProfilPopisDto {
		/**Identifikátor*/
		ixp?: string|null;
		/**Popis nad položkami VP*/
		popisNad?: string|null;
		/**Popisy pod položkami VP*/
		popisPod?: string|null;
	}
	const enum GBplFakturaDoslaVecnyProfilPopisDtoNames { ixp = "ixp", popisNad = "popisNad", popisPod = "popisPod",}
	const enum GBplFakturaDoslaVecnyProfilPopisDtoFragments { ixp = "main", popisNad = "main", popisPod = "main",}
	const enum GBplFakturaDoslaVecnyProfilPopisDtoTypes { ixp = "string", popisNad = "string", popisPod = "string",}
	const enum GBplFakturaDoslaVecnyProfilPopisDtoTypeLengths { ixp = 12,}
	/**Permissions pro položky VP*/
	interface GBplFakturaDoslaVecnyProfilPermissions extends Gordic.General.ApplicationInterface.GPermissionSet {
		/**CanRead*/
		LzeCist: Gordic.General.ApplicationInterface.GPermission;
		/**LzeInsert*/
		LzeNovy: Gordic.General.ApplicationInterface.GPermission;
		/**CanEdit*/
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		/**CanDelete*/
		LzeOdstranit: Gordic.General.ApplicationInterface.GPermission;
		/**CanEditText*/
		LzeEditovatPopisy: Gordic.General.ApplicationInterface.GPermission;
		/**CanEditValue*/
		LzeEditovatCastkuDokladu: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBplFakturaDoslaVecnyProfilPermissionsNames { LzeCist = "LzeCist", LzeNovy = "LzeNovy", LzeEditovat = "LzeEditovat", LzeOdstranit = "LzeOdstranit", LzeEditovatPopisy = "LzeEditovatPopisy", LzeEditovatCastkuDokladu = "LzeEditovatCastkuDokladu",}
	const enum GBplFakturaDoslaVecnyProfilPermissionsFragments { LzeCist = "*", LzeNovy = "*", LzeEditovat = "*", LzeOdstranit = "*", LzeEditovatPopisy = "*", LzeEditovatCastkuDokladu = "*",}
	const enum GBplFakturaDoslaVecnyProfilPermissionsTypes { LzeCist = "Gordic.General.ApplicationInterface.GPermission", LzeNovy = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeOdstranit = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPopisy = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatCastkuDokladu = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBplFakturaDoslaVecnyProfilPermissionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplfakturaDoslaVyberVazebDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO Seznam výběr vazeb*/
	interface GBplFakturaDoslaVyberVazebDto {
		/**SeznamVyberVazeb.ixp*/
		ixp?: string|null;
		/**SeznamVyberVazeb.ac_ag*/
		ac_ag?: string|null;
		/**SeznamVyberVazeb.ac_esu*/
		ac_esu?: string|null;
		/**SeznamVyberVazeb.ico_esu*/
		ico_esu?: string|null;
		/**SeznamVyberVazeb.nazev_den*/
		nazev_den?: string|null;
		/**SeznamVyberVazeb.nazev_esu*/
		nazev_esu?: string|null;
		/**SeznamVyberVazeb.ixp_den*/
		ixp_den?: string|null;
		/**SeznamVyberVazeb.rok*/
		rok?: number|null;
		/**SeznamVyberVazeb.exist_dd*/
		exist_dd?: number|null;
		/**SeznamVyberVazeb.kurz*/
		kurz?: JsonDecimal|null;
		/**SeznamVyberVazeb.c*/
		c?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_mena*/
		c_mena?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_mena_puv*/
		c_mena_puv?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_celk*/
		c_celk?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_celk_fak*/
		c_celk_fak?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_celk_puv*/
		c_celk_puv?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_sum1*/
		c_sum1?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_sum2*/
		c_sum2?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_z0*/
		c_z0?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_zx*/
		c_zx?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_z1*/
		c_z1?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_d1*/
		c_d1?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_z2*/
		c_z2?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_d2*/
		c_d2?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_z3*/
		c_z3?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_d3*/
		c_d3?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_z4*/
		c_z4?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_d4*/
		c_d4?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_zaok*/
		c_zaok?: JsonDecimal|null;
		/**SeznamVyberVazeb.mena_zkr*/
		mena_zkr?: string|null;
		/**SeznamVyberVazeb.dat_uhr*/
		dat_uhr?: JsonDate|null;
		/**SeznamVyberVazeb.s_uhr*/
		s_uhr?: number|null;
		/**SeznamVyberVazeb.ktg_typ*/
		ktg_typ?: number|null;
		/**SeznamVyberVazeb.c_vyuc*/
		c_vyuc?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_vyuc_mena*/
		c_vyuc_mena?: JsonDecimal|null;
		/**SeznamVyberVazeb.kurz_akt*/
		kurz_akt?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_k_navazani_mena*/
		c_k_navazani_mena?: JsonDecimal|null;
		/**SeznamVyberVazeb.c_k_navazani*/
		c_k_navazani?: JsonDecimal|null;
		/**SeznamVyberVazeb.vs*/
		vs?: string|null;
		/**SeznamVyberVazeb.f*/
		f?: string|null;
		/**SeznamVyberVazeb.popis*/
		popis?: string|null;
		/**SeznamVyberVazeb.vaz_fak*/
		vaz_fak?: number|null;
	}
	const enum GBplFakturaDoslaVyberVazebDtoNames { ixp = "ixp", ac_ag = "ac_ag", ac_esu = "ac_esu", ico_esu = "ico_esu", nazev_den = "nazev_den", nazev_esu = "nazev_esu", ixp_den = "ixp_den", rok = "rok", exist_dd = "exist_dd", kurz = "kurz", c = "c", c_mena = "c_mena", c_mena_puv = "c_mena_puv", c_celk = "c_celk", c_celk_fak = "c_celk_fak", c_celk_puv = "c_celk_puv", c_sum1 = "c_sum1", c_sum2 = "c_sum2", c_z0 = "c_z0", c_zx = "c_zx", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_z3 = "c_z3", c_d3 = "c_d3", c_z4 = "c_z4", c_d4 = "c_d4", c_zaok = "c_zaok", mena_zkr = "mena_zkr", dat_uhr = "dat_uhr", s_uhr = "s_uhr", ktg_typ = "ktg_typ", c_vyuc = "c_vyuc", c_vyuc_mena = "c_vyuc_mena", kurz_akt = "kurz_akt", c_k_navazani_mena = "c_k_navazani_mena", c_k_navazani = "c_k_navazani", vs = "vs", f = "f", popis = "popis", vaz_fak = "vaz_fak",}
	const enum GBplFakturaDoslaVyberVazebDtoFragments { ixp = "*", ac_ag = "*", ac_esu = "*", ico_esu = "*", nazev_den = "*", nazev_esu = "*", ixp_den = "*", rok = "*", exist_dd = "*", kurz = "*", c = "*", c_mena = "*", c_mena_puv = "*", c_celk = "*", c_celk_fak = "*", c_celk_puv = "*", c_sum1 = "*", c_sum2 = "*", c_z0 = "*", c_zx = "*", c_z1 = "*", c_d1 = "*", c_z2 = "*", c_d2 = "*", c_z3 = "*", c_d3 = "*", c_z4 = "*", c_d4 = "*", c_zaok = "*", mena_zkr = "*", dat_uhr = "*", s_uhr = "*", ktg_typ = "*", c_vyuc = "*", c_vyuc_mena = "*", kurz_akt = "*", c_k_navazani_mena = "*", c_k_navazani = "*", vs = "*", f = "*", popis = "*", vaz_fak = "*",}
	const enum GBplFakturaDoslaVyberVazebDtoTypes { ixp = "string", ac_ag = "string", ac_esu = "string", ico_esu = "string", nazev_den = "string", nazev_esu = "string", ixp_den = "string", rok = "number", exist_dd = "number", kurz = "JsonDecimal", c = "JsonDecimal", c_mena = "JsonDecimal", c_mena_puv = "JsonDecimal", c_celk = "JsonDecimal", c_celk_fak = "JsonDecimal", c_celk_puv = "JsonDecimal", c_sum1 = "JsonDecimal", c_sum2 = "JsonDecimal", c_z0 = "JsonDecimal", c_zx = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", c_zaok = "JsonDecimal", mena_zkr = "string", dat_uhr = "JsonDate", s_uhr = "number", ktg_typ = "number", c_vyuc = "JsonDecimal", c_vyuc_mena = "JsonDecimal", kurz_akt = "JsonDecimal", c_k_navazani_mena = "JsonDecimal", c_k_navazani = "JsonDecimal", vs = "string", f = "string", popis = "string", vaz_fak = "number",}
	const enum GBplFakturaDoslaVyberVazebDtoTypeLengths { ixp = 12, ac_ag = 20, ac_esu = 60, ico_esu = 14, nazev_den = 50, nazev_esu = 25, ixp_den = 12, mena_zkr = 16, vs = 12, f = 3, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplKontrolaDokladuDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro hromadné operace a jejich výsledky*/
	interface GBplKontrolaDokladuDto {
		/**Vybraný řádek*/
		Ixp?: string|null;
		/**Výsledek operace*/
		Vysledek?: Gordic.Isl.GOperationResultKind|null;
		/**Textový výsledek operace*/
		Duvod?: string|null;
	}
	const enum GBplKontrolaDokladuDtoNames { Ixp = "Ixp", Vysledek = "Vysledek", Duvod = "Duvod",}
	const enum GBplKontrolaDokladuDtoFragments { Ixp = "*", Vysledek = "*", Duvod = "*",}
	const enum GBplKontrolaDokladuDtoTypes { Ixp = "string", Vysledek = "Gordic.Isl.GOperationResultKind", Duvod = "string",}
	const enum GBplKontrolaDokladuDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplPredikcePredkontaceDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO predikce předkontace*/
	interface GBplPredikcePredkontaceDto {
		IxsKon?: string|null;
		BuVl?: string|null;
		SkVl?: string|null;
		/**Kod předkontace*/
		Kod?: string|null;
		/**Název předkontace*/
		Nazev?: string|null;
		PosledniZmena?: JsonDate|null;
		/**Pravděpodobnost konkrétní předkontace (např. 0.5 pokud byly používány dvě různé předkotance)*/
		Pravdepodobnost?: number|null;
	}
	const enum GBplPredikcePredkontaceDtoNames { IxsKon = "IxsKon", BuVl = "BuVl", SkVl = "SkVl", Kod = "Kod", Nazev = "Nazev", PosledniZmena = "PosledniZmena", Pravdepodobnost = "Pravdepodobnost",}
	const enum GBplPredikcePredkontaceDtoFragments { IxsKon = "*", BuVl = "*", SkVl = "*", Kod = "*", Nazev = "*", PosledniZmena = "*", Pravdepodobnost = "*",}
	const enum GBplPredikcePredkontaceDtoTypes { IxsKon = "string", BuVl = "string", SkVl = "string", Kod = "string", Nazev = "string", PosledniZmena = "JsonDate", Pravdepodobnost = "number",}
	const enum GBplPredikcePredkontaceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplSupportDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO pro BplSupport*/
	interface GBplSupportDto {
		/**Identifikátor (ixp)*/
		ixp?: string|null;
		/**Načtený text z QR kódu*/
		QRtext?: string|null;
	}
	const enum GBplSupportDtoNames { ixp = "ixp", QRtext = "QRtext",}
	const enum GBplSupportDtoFragments { ixp = "*", QRtext = "*",}
	const enum GBplSupportDtoTypes { ixp = "string", QRtext = "string",}
	const enum GBplSupportDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\ISL\Dto\GBplUzaverkaRequestDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**Vstupni parametry pro kontrolu dat pro akce pro uzavekach knih*/
	interface GBplUzaverkaKontrolaRequestDto {
		/**Typ uzaverky (otevereni, uzaveren)*/
		TypUzaverky?: Gordic.Bpl.Interface.GEBPLTypyUzaverekKnih|null;
		/**Seznam vybranych knih*/
		seznamKnih?: Gordic.Eko.Interface.GEkoVybraneKnihyDto[]|null;
	}
	const enum GBplUzaverkaKontrolaRequestDtoNames { TypUzaverky = "TypUzaverky", seznamKnih = "seznamKnih",}
	const enum GBplUzaverkaKontrolaRequestDtoFragments { TypUzaverky = "*", seznamKnih = "*",}
	const enum GBplUzaverkaKontrolaRequestDtoTypes { TypUzaverky = "Gordic.Bpl.Interface.GEBPLTypyUzaverekKnih", seznamKnih = "Gordic.Eko.Interface.GEkoVybraneKnihyDto[]",}
	const enum GBplUzaverkaKontrolaRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\IGKdfPredkontace.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\Dto\GBplcprzDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:bplcprz*/
	interface GBplcprzDto {
		/**DBCOLUMN:bplcprz.prd_znak*/
		prd_znak?: string|null;
		/**DBCOLUMN:bplcprz.prd_znak_txt*/
		prd_znak_txt?: string|null;
		/**DBCOLUMN:bplcprz.maska*/
		maska?: string|null;
		/**DBCOLUMN:bplcprz.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:bplcprz.k_s*/
		k_s?: string|null;
		/**DBCOLUMN:bplcprz.priz_psy*/
		priz_psy?: number|null;
	}
	const enum GBplcprzDtoNames { prd_znak = "prd_znak", prd_znak_txt = "prd_znak_txt", maska = "maska", k_v = "k_v", k_s = "k_s", priz_psy = "priz_psy",}
	const enum GBplcprzDtoFragments { prd_znak = "*", prd_znak_txt = "*", maska = "*", k_v = "*", k_s = "*", priz_psy = "*",}
	const enum GBplcprzDtoTypes { prd_znak = "string", prd_znak_txt = "string", maska = "string", k_v = "number", k_s = "string", priz_psy = "number",}
	const enum GBplcprzDtoTypeLengths { prd_znak = 5, prd_znak_txt = 50, maska = 20, k_s = 15,}
	/**ENUM:bplcprz*/
	const enum GBplcprzEnum {
		/**Analytický účet (spoj. účet)*/
		A30="#A30",
		/**Zakázka (spoj. účet)*/
		B30="#B30",
		/**Částka kompenzace kladně*/
		C03="#C03",
		/**Účtování při platbě hotově kladně*/
		C04="#C04",
		/**Částka kurzového zisku kladně*/
		C06="#C06",
		/**Částka kurzové ztráty kladně*/
		C07="#C07",
		/**Částka při úhradě platební bránou/kartou kladně*/
		C34="#C34",
		/**UEJ  (spoj. účet)*/
		D30="#D30",
		/**Evidenční číslo*/
		G05="#G05",
		/**IČO nebo RČ*/
		I00="#I00",
		/**IČO*/
		I01="#I01",
		/**RČ*/
		I02="#I02",
		/**Partner TR (externí subjekt)*/
		I10="#I10",
		/**Partner AP/VBÚ (subjekt banky)*/
		I11="#I11",
		/**Partner AP (popis položky)*/
		I12="#I12",
		/**Konsolid. partner TR (externí subjekt)*/
		IK0="#IK0",
		/**Konsolid. partner AP/VBÚ (subjekt banky)*/
		IK1="#IK1",
		/**Konsolid. partner AP (popis položky)*/
		IK2="#IK2",
		/**Identifikace elektronického tržiště*/
		ITR="#ITR",
		/**Identifikátor VZ na Věstníku*/
		IVZ="#IVZ",
		/**Orj-funkční členění (spoj. účet)*/
		J30="#J30",
		/**Kapitola (spoj. účet)*/
		K30="#K30",
		/**Účel (spoj. účet)*/
		L30="#L30",
		/**Org-organizační členění (spoj. účet)*/
		O30="#O30",
		/**Položka (spoj. účet)*/
		P30="#P30",
		/**účetní analytika měny 1*/
		Q01="#Q01",
		/**účetní analytika měny 2*/
		Q02="#Q02",
		/**Oddíl - Paragraf (spoj. účet)*/
		R30="#R30",
		/**Syntetický účet (spoj. účet)*/
		S30="#S30",
		/**Text z popisu dokladu*/
		T01="#T01",
		/**Rok uskutečnění účetního případu*/
		U02="#U02",
		/**Měsíc uskutečnění účetního případu*/
		U03="#U03",
		/**Účelový zdroj (spoj. účet)*/
		U30="#U30",
		/**Účetní kód případu SML z hlavičky dokladu*/
		UKS="#UKS",
		/**SPC (spoj. účet)*/
		X30="#X30",
		/**Záznamová jednotka (spoj. účet)*/
		Z30="#Z30",
		/**Částka kompenzace záporně*/
		c03="#C03",
		/**Účtování při platbě hotově záporně*/
		c04="#C04",
		/**Částka kurzového zisku záporně*/
		c06="#C06",
		/**Částka kurzové ztráty záporně*/
		c07="#C07",
		/**Částka při úhradě platební bránou/kartou záporně*/
		c34="#C34",
		/**Variabilní symbol*/
		g00="#g00",
		/**Konstantní symbol*/
		g01="#g01",
		/**Specifický symbol*/
		g02="#g02",
		/**Vlastní NS účtárny*/
		n01="#n01",
		/**Vlastní NS realizátora z dokladu*/
		n02="#n02",
		/**Podpoložka (spoj. účet)*/
		p30="#P30",
		/**PodParagraf (spoj. účet)*/
		r30="#R30",
		/**Analytický účet*/
		A="A",
		/**Zakázka*/
		B="B",
		/**Částka kladně*/
		C="C",
		/**UEJ*/
		D="D",
		/**Vlastní účetní středisko*/
		E="E",
		/**Agendové číslo*/
		G="G",
		/**Vlastní IČ*/
		I="I",
		/**Orj-funkční členění*/
		J="J",
		/**Kapitola*/
		K="K",
		/**Účel*/
		L="L",
		/**Zadané NS účtujícího UCS*/
		N="N",
		/**Org-organizační členění*/
		O="O",
		/**Položka*/
		P="P",
		/**Oddíl - Paragraf*/
		R="R",
		/**Syntetický účet*/
		S="S",
		/**Text položky*/
		T="T",
		/**Účelový zdroj*/
		U="U",
		/**SPC*/
		X="X",
		/**Záznamová jednotka*/
		Z="Z",
		/**První znak AU*/
		a="A",
		/**Částka záporně*/
		c="C",
		/**Variabilní symbol*/
		g="G",
		/**Vlastní NS účtujícího UCS*/
		n="N",
		/**Podpoložka*/
		p="P",
		/**PodParagraf*/
		r="R",
		/**Poslední znak SU*/
		s="S",
	}
	function GBplcprzEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GBplcprzEnum, Gordic.Bpl.Interface.GBplcprzDto>[]>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\Dto\GBplPredkontaceDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DTO selectu předkontace*/
	interface GBplPredkontaceDto {
		/**kdfduhr.dat_zmena*/
		dat_zmena?: JsonDate|null;
		dat_od?: JsonDate|null;
		/**kdfspid.ixs_esu*/
		ixs_esu?: string|null;
		/**kdfduhr.ixs_kon*/
		ixs_kon?: string|null;
		/**kdfduhr.bu_vl = bankovní účet vlastní*/
		bu_vl?: string|null;
		/**kdfduhr.sk_vl = bank .účet affix*/
		sk_vl?: string|null;
		/**kdfskon.kod = kód pod kterým je kontace evidována*/
		kod?: string|null;
		/**kdfskon.nazev = caption kontace*/
		nazev?: string|null;
	}
	const enum GBplPredkontaceDtoNames { dat_zmena = "dat_zmena", dat_od = "dat_od", ixs_esu = "ixs_esu", ixs_kon = "ixs_kon", bu_vl = "bu_vl", sk_vl = "sk_vl", kod = "kod", nazev = "nazev",}
	const enum GBplPredkontaceDtoFragments { dat_zmena = "*", dat_od = "*", ixs_esu = "*", ixs_kon = "*", bu_vl = "*", sk_vl = "*", kod = "*", nazev = "*",}
	const enum GBplPredkontaceDtoTypes { dat_zmena = "JsonDate", dat_od = "JsonDate", ixs_esu = "string", ixs_kon = "string", bu_vl = "string", sk_vl = "string", kod = "string", nazev = "string",}
	const enum GBplPredkontaceDtoTypeLengths {}
	interface GBplPredkontaceDtoExtensions {
	}
	const enum GBplPredkontaceDtoExtensionsNames {}
	const enum GBplPredkontaceDtoExtensionsFragments {}
	const enum GBplPredkontaceDtoExtensionsTypes {}
	const enum GBplPredkontaceDtoExtensionsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\Dto\GEkovabuDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:ekovabu*/
	interface GEkovabuDto {
		/**DBCOLUMN:ekovabu.rok*/
		rok?: number|null;
		/**DBCOLUMN:ekovabu.ico*/
		ico?: string|null;
		/**DBCOLUMN:ekovabu.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:ekovabu.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:ekovabu.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:ekovabu.uea*/
		uea?: string|null;
		/**DBCOLUMN:ekovabu.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:ekovabu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ekovabu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ekovabu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:ekovabu.typ_sa*/
		typ_sa?: number|null;
		/**DBCOLUMN:ekovabu.popis*/
		popis?: string|null;
	}
	const enum GEkovabuDtoNames { rok = "rok", ico = "ico", ucs = "ucs", uea_uc = "uea_uc", ueb_uc = "ueb_uc", uea = "uea", ueb = "ueb", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_sa = "typ_sa", popis = "popis",}
	const enum GEkovabuDtoFragments { rok = "*", ico = "*", ucs = "*", uea_uc = "*", ueb_uc = "*", uea = "*", ueb = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", typ_sa = "*", popis = "*",}
	const enum GEkovabuDtoTypes { rok = "number", ico = "string", ucs = "string", uea_uc = "string", ueb_uc = "string", uea = "string", ueb = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_sa = "number", popis = "string",}
	const enum GEkovabuDtoTypeLengths { ico = 10, ucs = 10, uea_uc = 3, ueb_uc = 4, uea = 3, ueb = 4, zmenu_prov = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\TypoveDatasety\GKdfdkry.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:Seznam*/
	interface GKdfdkryDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.radek_krylik*/
		radek_krylik?: number|null;
		/**DBCOLUMN:Seznam.lic*/
		lic?: string|null;
		/**DBCOLUMN:Seznam.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.kod_kon*/
		kod_kon?: string|null;
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.znam*/
		znam?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.ucs*/
		ucs?: string|null;
		/**DBCOLUMN:Seznam.nks*/
		nks?: string|null;
		/**DBCOLUMN:Seznam.te0*/
		te0?: string|null;
		/**DBCOLUMN:Seznam.te1*/
		te1?: string|null;
		/**DBCOLUMN:Seznam.te2*/
		te2?: string|null;
		/**DBCOLUMN:Seznam.te3*/
		te3?: string|null;
		/**DBCOLUMN:Seznam.te4*/
		te4?: string|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uec*/
		uec?: string|null;
		/**DBCOLUMN:Seznam.ued*/
		ued?: string|null;
		/**DBCOLUMN:Seznam.uee*/
		uee?: string|null;
		/**DBCOLUMN:Seznam.uef*/
		uef?: string|null;
		/**DBCOLUMN:Seznam.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:Seznam.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:Seznam.uei*/
		uei?: string|null;
		/**DBCOLUMN:Seznam.uej*/
		uej?: string|null;
		/**DBCOLUMN:Seznam.uek*/
		uek?: string|null;
		/**DBCOLUMN:Seznam.uel*/
		uel?: string|null;
		/**DBCOLUMN:Seznam.uem*/
		uem?: string|null;
		/**DBCOLUMN:Seznam.uen*/
		uen?: string|null;
		/**DBCOLUMN:Seznam.te5*/
		te5?: string|null;
		/**DBCOLUMN:Seznam.te6*/
		te6?: string|null;
		/**DBCOLUMN:Seznam.te7*/
		te7?: string|null;
		/**DBCOLUMN:Seznam.te8*/
		te8?: string|null;
		/**DBCOLUMN:Seznam.te9*/
		te9?: string|null;
		/**DBCOLUMN:Seznam.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:Seznam.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:Seznam.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.radek_uhr*/
		radek_uhr?: number|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.xpf_pf*/
		xpf_pf?: string|null;
		/**DBCOLUMN:Seznam.dan_typ*/
		dan_typ?: number|null;
		/**DBCOLUMN:Seznam.c_dan*/
		c_dan?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_upr*/
		c_upr?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.inv_cis*/
		inv_cis?: string|null;
		/**DBCOLUMN:Seznam.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:Seznam.ac*/
		ac?: string|null;
		/**DBCOLUMN:Seznam.znam_smlspol*/
		znam_smlspol?: number|null;
		/**DBCOLUMN:Seznam.novy_radek*/
		novy_radek?: number|null;
		/**DBCOLUMN:Seznam.nazev_kdfskon*/
		nazev_kdfskon?: string|null;
		/**DBCOLUMN:Seznam.priz_tzh*/
		priz_tzh?: number|null;
		/**DBCOLUMN:Seznam.ktg_kry*/
		ktg_kry?: number|null;
		/**DBCOLUMN:Seznam.ktg_lik*/
		ktg_lik?: number|null;
		/**DBCOLUMN:Seznam.ppk*/
		ppk?: number|null;
		/**DBCOLUMN:Seznam.ixs_zpz*/
		ixs_zpz?: string|null;
		/**DBCOLUMN:Seznam.gor_err*/
		gor_err?: number|null;
		/**DBCOLUMN:Seznam.gor_err_text*/
		gor_err_text?: string|null;
		/**DBCOLUMN:Seznam.typ_sml*/
		typ_sml?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:Seznam.ixs_ste*/
		ixs_ste?: string|null;
		/**DBCOLUMN:Seznam.id_tem*/
		id_tem?: string|null;
		/**DBCOLUMN:Seznam.vratka*/
		vratka?: string|null;
		/**DBCOLUMN:Seznam.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:Seznam.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:Seznam.zastupky30*/
		zastupky30?: string|null;
		/**DBCOLUMN:Seznam.hodnoty30*/
		hodnoty30?: string|null;
	}
	const enum GKdfdkryDtoNames { ixp = "ixp", radek_krylik = "radek_krylik", lic = "lic", up_stav = "up_stav", nazev = "nazev", kod_kon = "kod_kon", ixs_kon = "ixs_kon", c = "c", znam = "znam", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ico = "ico", ucs = "ucs", nks = "nks", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", uek = "uek", uel = "uel", uem = "uem", uen = "uen", te5 = "te5", te6 = "te6", te7 = "te7", te8 = "te8", te9 = "te9", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", rok = "rok", radek_uhr = "radek_uhr", poznamka = "poznamka", xpf_pf = "xpf_pf", dan_typ = "dan_typ", c_dan = "c_dan", c_upr = "c_upr", inv_cis = "inv_cis", ac_sml = "ac_sml", ac = "ac", znam_smlspol = "znam_smlspol", novy_radek = "novy_radek", nazev_kdfskon = "nazev_kdfskon", priz_tzh = "priz_tzh", ktg_kry = "ktg_kry", ktg_lik = "ktg_lik", ppk = "ppk", ixs_zpz = "ixs_zpz", gor_err = "gor_err", gor_err_text = "gor_err_text", typ_sml = "typ_sml", zmenu_prov_txt = "zmenu_prov_txt", ixs_ste = "ixs_ste", id_tem = "id_tem", vratka = "vratka", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", zastupky30 = "zastupky30", hodnoty30 = "hodnoty30",}
	const enum GKdfdkryDtoFragments { ixp = "*", radek_krylik = "*", lic = "*", up_stav = "*", nazev = "*", kod_kon = "*", ixs_kon = "*", c = "*", znam = "*", dat_zmena = "*", zmenu_prov = "*", ico = "*", ucs = "*", nks = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", uek = "*", uel = "*", uem = "*", uen = "*", te5 = "*", te6 = "*", te7 = "*", te8 = "*", te9 = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", rok = "*", radek_uhr = "*", poznamka = "*", xpf_pf = "*", dan_typ = "*", c_dan = "*", c_upr = "*", inv_cis = "*", ac_sml = "*", ac = "*", znam_smlspol = "*", novy_radek = "*", nazev_kdfskon = "*", priz_tzh = "*", ktg_kry = "*", ktg_lik = "*", ppk = "*", ixs_zpz = "*", gor_err = "*", gor_err_text = "*", typ_sml = "*", zmenu_prov_txt = "*", ixs_ste = "*", id_tem = "*", vratka = "*", id_hdr_ris = "*", radek_hdr = "*", zastupky30 = "*", hodnoty30 = "*",}
	const enum GKdfdkryDtoTypes { ixp = "string", radek_krylik = "number", lic = "string", up_stav = "number", nazev = "string", kod_kon = "string", ixs_kon = "string", c = "JsonDecimal", znam = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ico = "string", ucs = "string", nks = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", uek = "string", uel = "string", uem = "string", uen = "string", te5 = "string", te6 = "string", te7 = "string", te8 = "string", te9 = "string", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", rok = "number", radek_uhr = "number", poznamka = "string", xpf_pf = "string", dan_typ = "number", c_dan = "JsonDecimal", c_upr = "JsonDecimal", inv_cis = "string", ac_sml = "string", ac = "string", znam_smlspol = "number", novy_radek = "number", nazev_kdfskon = "string", priz_tzh = "number", ktg_kry = "number", ktg_lik = "number", ppk = "number", ixs_zpz = "string", gor_err = "number", gor_err_text = "string", typ_sml = "string", zmenu_prov_txt = "string", ixs_ste = "string", id_tem = "string", vratka = "string", id_hdr_ris = "string", radek_hdr = "number", zastupky30 = "string", hodnoty30 = "string",}
	const enum GKdfdkryDtoTypeLengths { ixp = 12, lic = 4, nazev = 254, kod_kon = 30, ixs_kon = 12, zmenu_prov = 12, ico = 14, ixp_sml = 12, poznamka = 50, xpf_pf = 63, inv_cis = 12, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\TypoveDatasety\GKdfDkryDuhrSkon.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:Seznam*/
	interface GKdfDkryDuhrSkonDto {
		/**DBCOLUMN:Seznam.radek*/
		radek?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:Seznam.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:Seznam.kod*/
		kod?: string|null;
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_puh*/
		dat_puh?: JsonDate|null;
		/**DBCOLUMN:Seznam.c_kryti*/
		c_kryti?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.uea*/
		uea?: string|null;
		/**DBCOLUMN:Seznam.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:Seznam.uea_uc*/
		uea_uc?: string|null;
		/**DBCOLUMN:Seznam.ueb_uc*/
		ueb_uc?: string|null;
		/**DBCOLUMN:Seznam.ktg_bu*/
		ktg_bu?: number|null;
		/**DBCOLUMN:Seznam.ixs_zpz*/
		ixs_zpz?: string|null;
		/**DBCOLUMN:Seznam.typ_kon*/
		typ_kon?: number|null;
		/**DBCOLUMN:Seznam.ktg_lik*/
		ktg_lik?: number|null;
		/**DBCOLUMN:Seznam.stav*/
		stav?: number|null;
		/**DBCOLUMN:Seznam.kurz*/
		kurz?: JsonDecimal|null;
	}
	const enum GKdfDkryDuhrSkonDtoNames { radek = "radek", aktivita = "aktivita", rok = "rok", bu_vl = "bu_vl", sk_vl = "sk_vl", kod = "kod", ixs_kon = "ixs_kon", nazev = "nazev", c = "c", c_mena = "c_mena", dat_zmena = "dat_zmena", dat_puh = "dat_puh", c_kryti = "c_kryti", uea = "uea", ueb = "ueb", uea_uc = "uea_uc", ueb_uc = "ueb_uc", ktg_bu = "ktg_bu", ixs_zpz = "ixs_zpz", typ_kon = "typ_kon", ktg_lik = "ktg_lik", stav = "stav", kurz = "kurz",}
	const enum GKdfDkryDuhrSkonDtoFragments { radek = "*", aktivita = "*", rok = "*", bu_vl = "*", sk_vl = "*", kod = "*", ixs_kon = "*", nazev = "*", c = "*", c_mena = "*", dat_zmena = "*", dat_puh = "*", c_kryti = "*", uea = "*", ueb = "*", uea_uc = "*", ueb_uc = "*", ktg_bu = "*", ixs_zpz = "*", typ_kon = "*", ktg_lik = "*", stav = "*", kurz = "*",}
	const enum GKdfDkryDuhrSkonDtoTypes { radek = "number", aktivita = "number", rok = "number", bu_vl = "string", sk_vl = "string", kod = "string", ixs_kon = "string", nazev = "string", c = "JsonDecimal", c_mena = "JsonDecimal", dat_zmena = "JsonDate", dat_puh = "JsonDate", c_kryti = "JsonDecimal", uea = "string", ueb = "string", uea_uc = "string", ueb_uc = "string", ktg_bu = "number", ixs_zpz = "string", typ_kon = "number", ktg_lik = "number", stav = "number", kurz = "JsonDecimal",}
	const enum GKdfDkryDuhrSkonDtoTypeLengths { bu_vl = 34, sk_vl = 11,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\TypoveDatasety\Gordic.Bpl.Interface.GEkotkonDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:Seznam*/
	interface GEkotkonDto {
		/**DBCOLUMN:Seznam.radek_vst*/
		radek_vst?: number|null;
		/**DBCOLUMN:Seznam.radek_kon*/
		radek_kon?: number|null;
		/**DBCOLUMN:Seznam.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:Seznam.nks_vst*/
		nks_vst?: string|null;
		/**DBCOLUMN:Seznam.uea_vst*/
		uea_vst?: string|null;
		/**DBCOLUMN:Seznam.ueb_vst*/
		ueb_vst?: string|null;
		/**DBCOLUMN:Seznam.uec_vst*/
		uec_vst?: string|null;
		/**DBCOLUMN:Seznam.ued_vst*/
		ued_vst?: string|null;
		/**DBCOLUMN:Seznam.uee_vst*/
		uee_vst?: string|null;
		/**DBCOLUMN:Seznam.uef_vst*/
		uef_vst?: string|null;
		/**DBCOLUMN:Seznam.ueg_vst*/
		ueg_vst?: string|null;
		/**DBCOLUMN:Seznam.ueh_vst*/
		ueh_vst?: string|null;
		/**DBCOLUMN:Seznam.uei_vst*/
		uei_vst?: string|null;
		/**DBCOLUMN:Seznam.uej_vst*/
		uej_vst?: string|null;
		/**DBCOLUMN:Seznam.uek_vst*/
		uek_vst?: string|null;
		/**DBCOLUMN:Seznam.uel_vst*/
		uel_vst?: string|null;
		/**DBCOLUMN:Seznam.uem_vst*/
		uem_vst?: string|null;
		/**DBCOLUMN:Seznam.uen_vst*/
		uen_vst?: string|null;
		/**DBCOLUMN:Seznam.te0_vst*/
		te0_vst?: string|null;
		/**DBCOLUMN:Seznam.te1_vst*/
		te1_vst?: string|null;
		/**DBCOLUMN:Seznam.te2_vst*/
		te2_vst?: string|null;
		/**DBCOLUMN:Seznam.te3_vst*/
		te3_vst?: string|null;
		/**DBCOLUMN:Seznam.te4_vst*/
		te4_vst?: string|null;
		/**DBCOLUMN:Seznam.te5_vst*/
		te5_vst?: string|null;
		/**DBCOLUMN:Seznam.te6_vst*/
		te6_vst?: string|null;
		/**DBCOLUMN:Seznam.te7_vst*/
		te7_vst?: string|null;
		/**DBCOLUMN:Seznam.te8_vst*/
		te8_vst?: string|null;
		/**DBCOLUMN:Seznam.te9_vst*/
		te9_vst?: string|null;
		/**DBCOLUMN:Seznam.popis_vst*/
		popis_vst?: string|null;
		/**DBCOLUMN:Seznam.c_vst*/
		c_vst?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_kr_vst*/
		typ_kr_vst?: number|null;
		/**DBCOLUMN:Seznam.c_kr_vst*/
		c_kr_vst?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.typ_oper_vst*/
		typ_oper_vst?: number|null;
		/**DBCOLUMN:Seznam.nks_kon*/
		nks_kon?: string|null;
		/**DBCOLUMN:Seznam.uea_kon*/
		uea_kon?: string|null;
		/**DBCOLUMN:Seznam.ueb_kon*/
		ueb_kon?: string|null;
		/**DBCOLUMN:Seznam.uec_kon*/
		uec_kon?: string|null;
		/**DBCOLUMN:Seznam.ued_kon*/
		ued_kon?: string|null;
		/**DBCOLUMN:Seznam.uee_kon*/
		uee_kon?: string|null;
		/**DBCOLUMN:Seznam.uef_kon*/
		uef_kon?: string|null;
		/**DBCOLUMN:Seznam.ueg_kon*/
		ueg_kon?: string|null;
		/**DBCOLUMN:Seznam.ueh_kon*/
		ueh_kon?: string|null;
		/**DBCOLUMN:Seznam.uei_kon*/
		uei_kon?: string|null;
		/**DBCOLUMN:Seznam.uej_kon*/
		uej_kon?: string|null;
		/**DBCOLUMN:Seznam.te0_kon*/
		te0_kon?: string|null;
		/**DBCOLUMN:Seznam.te1_kon*/
		te1_kon?: string|null;
		/**DBCOLUMN:Seznam.te2_kon*/
		te2_kon?: string|null;
		/**DBCOLUMN:Seznam.te3_kon*/
		te3_kon?: string|null;
		/**DBCOLUMN:Seznam.te4_kon*/
		te4_kon?: string|null;
		/**DBCOLUMN:Seznam.uek_kon*/
		uek_kon?: string|null;
		/**DBCOLUMN:Seznam.uel_kon*/
		uel_kon?: string|null;
		/**DBCOLUMN:Seznam.uem_kon*/
		uem_kon?: string|null;
		/**DBCOLUMN:Seznam.uen_kon*/
		uen_kon?: string|null;
		/**DBCOLUMN:Seznam.te5_kon*/
		te5_kon?: string|null;
		/**DBCOLUMN:Seznam.te6_kon*/
		te6_kon?: string|null;
		/**DBCOLUMN:Seznam.te7_kon*/
		te7_kon?: string|null;
		/**DBCOLUMN:Seznam.te8_kon*/
		te8_kon?: string|null;
		/**DBCOLUMN:Seznam.te9_kon*/
		te9_kon?: string|null;
		/**DBCOLUMN:Seznam.popis_kon*/
		popis_kon?: string|null;
		/**DBCOLUMN:Seznam.c0_kon*/
		c0_kon?: string|null;
		/**DBCOLUMN:Seznam.c1_kon*/
		c1_kon?: string|null;
		/**DBCOLUMN:Seznam.nks_vys*/
		nks_vys?: string|null;
		/**DBCOLUMN:Seznam.uea_vys*/
		uea_vys?: string|null;
		/**DBCOLUMN:Seznam.ueb_vys*/
		ueb_vys?: string|null;
		/**DBCOLUMN:Seznam.uec_vys*/
		uec_vys?: string|null;
		/**DBCOLUMN:Seznam.ued_vys*/
		ued_vys?: string|null;
		/**DBCOLUMN:Seznam.uee_vys*/
		uee_vys?: string|null;
		/**DBCOLUMN:Seznam.uef_vys*/
		uef_vys?: string|null;
		/**DBCOLUMN:Seznam.ueg_vys*/
		ueg_vys?: string|null;
		/**DBCOLUMN:Seznam.ueh_vys*/
		ueh_vys?: string|null;
		/**DBCOLUMN:Seznam.uei_vys*/
		uei_vys?: string|null;
		/**DBCOLUMN:Seznam.uej_vys*/
		uej_vys?: string|null;
		/**DBCOLUMN:Seznam.te0_vys*/
		te0_vys?: string|null;
		/**DBCOLUMN:Seznam.te1_vys*/
		te1_vys?: string|null;
		/**DBCOLUMN:Seznam.te2_vys*/
		te2_vys?: string|null;
		/**DBCOLUMN:Seznam.te3_vys*/
		te3_vys?: string|null;
		/**DBCOLUMN:Seznam.te4_vys*/
		te4_vys?: string|null;
		/**DBCOLUMN:Seznam.uek_vys*/
		uek_vys?: string|null;
		/**DBCOLUMN:Seznam.uel_vys*/
		uel_vys?: string|null;
		/**DBCOLUMN:Seznam.uem_vys*/
		uem_vys?: string|null;
		/**DBCOLUMN:Seznam.uen_vys*/
		uen_vys?: string|null;
		/**DBCOLUMN:Seznam.te5_vys*/
		te5_vys?: string|null;
		/**DBCOLUMN:Seznam.te6_vys*/
		te6_vys?: string|null;
		/**DBCOLUMN:Seznam.te7_vys*/
		te7_vys?: string|null;
		/**DBCOLUMN:Seznam.te8_vys*/
		te8_vys?: string|null;
		/**DBCOLUMN:Seznam.te9_vys*/
		te9_vys?: string|null;
		/**DBCOLUMN:Seznam.popis_vys*/
		popis_vys?: string|null;
		/**DBCOLUMN:Seznam.c0_vys*/
		c0_vys?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.c1_vys*/
		c1_vys?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.mesic*/
		mesic?: number|null;
		/**DBCOLUMN:Seznam.den*/
		den?: number|null;
		/**DBCOLUMN:Seznam.typ_kon*/
		typ_kon?: number|null;
		/**DBCOLUMN:Seznam.kod*/
		kod?: string|null;
	}
	const enum GEkotkonDtoNames { radek_vst = "radek_vst", radek_kon = "radek_kon", log_por_cislo = "log_por_cislo", nks_vst = "nks_vst", uea_vst = "uea_vst", ueb_vst = "ueb_vst", uec_vst = "uec_vst", ued_vst = "ued_vst", uee_vst = "uee_vst", uef_vst = "uef_vst", ueg_vst = "ueg_vst", ueh_vst = "ueh_vst", uei_vst = "uei_vst", uej_vst = "uej_vst", uek_vst = "uek_vst", uel_vst = "uel_vst", uem_vst = "uem_vst", uen_vst = "uen_vst", te0_vst = "te0_vst", te1_vst = "te1_vst", te2_vst = "te2_vst", te3_vst = "te3_vst", te4_vst = "te4_vst", te5_vst = "te5_vst", te6_vst = "te6_vst", te7_vst = "te7_vst", te8_vst = "te8_vst", te9_vst = "te9_vst", popis_vst = "popis_vst", c_vst = "c_vst", typ_kr_vst = "typ_kr_vst", c_kr_vst = "c_kr_vst", typ_oper_vst = "typ_oper_vst", nks_kon = "nks_kon", uea_kon = "uea_kon", ueb_kon = "ueb_kon", uec_kon = "uec_kon", ued_kon = "ued_kon", uee_kon = "uee_kon", uef_kon = "uef_kon", ueg_kon = "ueg_kon", ueh_kon = "ueh_kon", uei_kon = "uei_kon", uej_kon = "uej_kon", te0_kon = "te0_kon", te1_kon = "te1_kon", te2_kon = "te2_kon", te3_kon = "te3_kon", te4_kon = "te4_kon", uek_kon = "uek_kon", uel_kon = "uel_kon", uem_kon = "uem_kon", uen_kon = "uen_kon", te5_kon = "te5_kon", te6_kon = "te6_kon", te7_kon = "te7_kon", te8_kon = "te8_kon", te9_kon = "te9_kon", popis_kon = "popis_kon", c0_kon = "c0_kon", c1_kon = "c1_kon", nks_vys = "nks_vys", uea_vys = "uea_vys", ueb_vys = "ueb_vys", uec_vys = "uec_vys", ued_vys = "ued_vys", uee_vys = "uee_vys", uef_vys = "uef_vys", ueg_vys = "ueg_vys", ueh_vys = "ueh_vys", uei_vys = "uei_vys", uej_vys = "uej_vys", te0_vys = "te0_vys", te1_vys = "te1_vys", te2_vys = "te2_vys", te3_vys = "te3_vys", te4_vys = "te4_vys", uek_vys = "uek_vys", uel_vys = "uel_vys", uem_vys = "uem_vys", uen_vys = "uen_vys", te5_vys = "te5_vys", te6_vys = "te6_vys", te7_vys = "te7_vys", te8_vys = "te8_vys", te9_vys = "te9_vys", popis_vys = "popis_vys", c0_vys = "c0_vys", c1_vys = "c1_vys", ixp = "ixp", ixs_kon = "ixs_kon", rok = "rok", mesic = "mesic", den = "den", typ_kon = "typ_kon", kod = "kod",}
	const enum GEkotkonDtoFragments { radek_vst = "*", radek_kon = "*", log_por_cislo = "*", nks_vst = "*", uea_vst = "*", ueb_vst = "*", uec_vst = "*", ued_vst = "*", uee_vst = "*", uef_vst = "*", ueg_vst = "*", ueh_vst = "*", uei_vst = "*", uej_vst = "*", uek_vst = "*", uel_vst = "*", uem_vst = "*", uen_vst = "*", te0_vst = "*", te1_vst = "*", te2_vst = "*", te3_vst = "*", te4_vst = "*", te5_vst = "*", te6_vst = "*", te7_vst = "*", te8_vst = "*", te9_vst = "*", popis_vst = "*", c_vst = "*", typ_kr_vst = "*", c_kr_vst = "*", typ_oper_vst = "*", nks_kon = "*", uea_kon = "*", ueb_kon = "*", uec_kon = "*", ued_kon = "*", uee_kon = "*", uef_kon = "*", ueg_kon = "*", ueh_kon = "*", uei_kon = "*", uej_kon = "*", te0_kon = "*", te1_kon = "*", te2_kon = "*", te3_kon = "*", te4_kon = "*", uek_kon = "*", uel_kon = "*", uem_kon = "*", uen_kon = "*", te5_kon = "*", te6_kon = "*", te7_kon = "*", te8_kon = "*", te9_kon = "*", popis_kon = "*", c0_kon = "*", c1_kon = "*", nks_vys = "*", uea_vys = "*", ueb_vys = "*", uec_vys = "*", ued_vys = "*", uee_vys = "*", uef_vys = "*", ueg_vys = "*", ueh_vys = "*", uei_vys = "*", uej_vys = "*", te0_vys = "*", te1_vys = "*", te2_vys = "*", te3_vys = "*", te4_vys = "*", uek_vys = "*", uel_vys = "*", uem_vys = "*", uen_vys = "*", te5_vys = "*", te6_vys = "*", te7_vys = "*", te8_vys = "*", te9_vys = "*", popis_vys = "*", c0_vys = "*", c1_vys = "*", ixp = "*", ixs_kon = "*", rok = "*", mesic = "*", den = "*", typ_kon = "*", kod = "*",}
	const enum GEkotkonDtoTypes { radek_vst = "number", radek_kon = "number", log_por_cislo = "number", nks_vst = "string", uea_vst = "string", ueb_vst = "string", uec_vst = "string", ued_vst = "string", uee_vst = "string", uef_vst = "string", ueg_vst = "string", ueh_vst = "string", uei_vst = "string", uej_vst = "string", uek_vst = "string", uel_vst = "string", uem_vst = "string", uen_vst = "string", te0_vst = "string", te1_vst = "string", te2_vst = "string", te3_vst = "string", te4_vst = "string", te5_vst = "string", te6_vst = "string", te7_vst = "string", te8_vst = "string", te9_vst = "string", popis_vst = "string", c_vst = "JsonDecimal", typ_kr_vst = "number", c_kr_vst = "JsonDecimal", typ_oper_vst = "number", nks_kon = "string", uea_kon = "string", ueb_kon = "string", uec_kon = "string", ued_kon = "string", uee_kon = "string", uef_kon = "string", ueg_kon = "string", ueh_kon = "string", uei_kon = "string", uej_kon = "string", te0_kon = "string", te1_kon = "string", te2_kon = "string", te3_kon = "string", te4_kon = "string", uek_kon = "string", uel_kon = "string", uem_kon = "string", uen_kon = "string", te5_kon = "string", te6_kon = "string", te7_kon = "string", te8_kon = "string", te9_kon = "string", popis_kon = "string", c0_kon = "string", c1_kon = "string", nks_vys = "string", uea_vys = "string", ueb_vys = "string", uec_vys = "string", ued_vys = "string", uee_vys = "string", uef_vys = "string", ueg_vys = "string", ueh_vys = "string", uei_vys = "string", uej_vys = "string", te0_vys = "string", te1_vys = "string", te2_vys = "string", te3_vys = "string", te4_vys = "string", uek_vys = "string", uel_vys = "string", uem_vys = "string", uen_vys = "string", te5_vys = "string", te6_vys = "string", te7_vys = "string", te8_vys = "string", te9_vys = "string", popis_vys = "string", c0_vys = "JsonDecimal", c1_vys = "JsonDecimal", ixp = "string", ixs_kon = "string", rok = "number", mesic = "number", den = "number", typ_kon = "number", kod = "string",}
	const enum GEkotkonDtoTypeLengths { nks_vst = 12, popis_vst = 254, nks_kon = 20, popis_kon = 254, c0_kon = 20, c1_kon = 20, nks_vys = 12, popis_vys = 254, ixp = 12, ixs_kon = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Kontace\TypoveDatasety\Gordic.Bpl.Interface.SeznamPredpisBuc.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamPredpisBuc*/
	interface SeznamPredpisBucDto {
		/**DBCOLUMN:SeznamPredpisBuc.radek*/
		radek?: number|null;
		/**DBCOLUMN:SeznamPredpisBuc.radek_kry*/
		radek_kry?: number|null;
		/**DBCOLUMN:SeznamPredpisBuc.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:SeznamPredpisBuc.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:SeznamPredpisBuc.cislo_sml*/
		cislo_sml?: number|null;
		/**DBCOLUMN:SeznamPredpisBuc.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:SeznamPredpisBuc.xpf_pf*/
		xpf_pf?: string|null;
		/**DBCOLUMN:SeznamPredpisBuc.kod*/
		kod?: string|null;
		/**DBCOLUMN:SeznamPredpisBuc.sk_vl*/
		sk_vl?: string|null;
		/**DBCOLUMN:SeznamPredpisBuc.bu_vl*/
		bu_vl?: string|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_sch*/
		sum_sch?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_kuhr*/
		sum_kuhr?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_par*/
		sum_par?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_sch_radek*/
		sum_sch_radek?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_sch_mena*/
		sum_sch_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_kuhr_mena*/
		sum_kuhr_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_par_mena*/
		sum_par_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.sum_sch_radek_mena*/
		sum_sch_radek_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamPredpisBuc.id_hdr_ris*/
		id_hdr_ris?: string|null;
		/**DBCOLUMN:SeznamPredpisBuc.radek_hdr*/
		radek_hdr?: number|null;
		/**DBCOLUMN:SeznamPredpisBuc.kurz*/
		kurz?: JsonDecimal|null;
	}
	const enum SeznamPredpisBucDtoNames { radek = "radek", radek_kry = "radek_kry", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixs_kon = "ixs_kon", xpf_pf = "xpf_pf", kod = "kod", sk_vl = "sk_vl", bu_vl = "bu_vl", sum_sch = "sum_sch", sum_kuhr = "sum_kuhr", sum_par = "sum_par", sum_sch_radek = "sum_sch_radek", c = "c", sum_sch_mena = "sum_sch_mena", sum_kuhr_mena = "sum_kuhr_mena", sum_par_mena = "sum_par_mena", sum_sch_radek_mena = "sum_sch_radek_mena", c_mena = "c_mena", id_hdr_ris = "id_hdr_ris", radek_hdr = "radek_hdr", kurz = "kurz",}
	const enum SeznamPredpisBucDtoFragments { radek = "*", radek_kry = "*", ixp_sml = "*", rok_sml = "*", cislo_sml = "*", ixs_kon = "*", xpf_pf = "*", kod = "*", sk_vl = "*", bu_vl = "*", sum_sch = "*", sum_kuhr = "*", sum_par = "*", sum_sch_radek = "*", c = "*", sum_sch_mena = "*", sum_kuhr_mena = "*", sum_par_mena = "*", sum_sch_radek_mena = "*", c_mena = "*", id_hdr_ris = "*", radek_hdr = "*", kurz = "*",}
	const enum SeznamPredpisBucDtoTypes { radek = "number", radek_kry = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", ixs_kon = "string", xpf_pf = "string", kod = "string", sk_vl = "string", bu_vl = "string", sum_sch = "JsonDecimal", sum_kuhr = "JsonDecimal", sum_par = "JsonDecimal", sum_sch_radek = "JsonDecimal", c = "JsonDecimal", sum_sch_mena = "JsonDecimal", sum_kuhr_mena = "JsonDecimal", sum_par_mena = "JsonDecimal", sum_sch_radek_mena = "JsonDecimal", c_mena = "JsonDecimal", id_hdr_ris = "string", radek_hdr = "number", kurz = "JsonDecimal",}
	const enum SeznamPredpisBucDtoTypeLengths { ixp_sml = 12, ixs_kon = 12, xpf_pf = 63, kod = 30, sk_vl = 11, bu_vl = 34, id_hdr_ris = 10,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Uzaverky\IGAgenda.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha*/
	interface AgendaBpl {
		/**Nacteni inforaci o agende*/
		read(rq?:CallParams<{}>): _Task<{},GServiceReadRequest<Gordic.Eko.Interface.GEkoAgendaDto>>;
		/**Uzavreni agendy*/
		uzavritAgendu(rq?:CallParams<{}>): _Task<{},void>;
		/**Zjisteni povoleni uzavrit agendu*/
		povoleniUzavreniAgendy(rq?:CallParams<{}>): _Task<{},Gordic.General.ApplicationInterface.GPermission>;
		/**Zjisteni povoleni akci na agende*/
		povoleniAkciAgendy(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoAgendaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		AgendaBpl: ServiceBase & Catalog.AgendaBpl;
	}
	const AgendaBpl: Client["AgendaBpl"];
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Uzaverky\IGKniha.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Kniha*/
	interface KnihaBpl {
		/**Načte seznam knih*/
		list(rq?:Gordic.Eko.Interface.GEkoKnihaFiltrDto|CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Eko.Interface.GEkoKnihaDto>>;
		/**Uzavření vybraných knih*/
		uzavritKnihy(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[]},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Příprava a zrušení přípravy knihy k uzavření*/
		pripravaKnihKUzavreni(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[],priprava:boolean}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[],priprava:boolean},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Kontrola knih před uzavřením*/
		kontrolaKnihUzaverky(rq?:CallParams<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[],operace:Gordic.Bpl.Interface.GEBPLTypyUzaverekKnih}>): _Task<{knihy:Gordic.Eko.Interface.GEkoVybraneKnihyDto[],operace:Gordic.Bpl.Interface.GEBPLTypyUzaverekKnih},GServiceListResponse<Gordic.Eko.Interface.GEkoVybraneKnihyDto>>;
		/**Vrátí oprávnění uzávěrky knih (společné pro celý seznam)*/
		getServicePermissions(rq?:CallParams<{}>): _Task<{},Gordic.Eko.Interface.GEkoKnihaPermissions>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		KnihaBpl: ServiceBase & Catalog.KnihaBpl;
	}
	const KnihaBpl: Client["KnihaBpl"];
}
declare namespace Gordic.Bpl.Interface {
	/**Typ uzávěrek knih*/
	const enum GEBPLTypyUzaverekKnih {
		/**Uzavření vybraných knih*/
		UZAVRENI_KNIHY,
		/**Příprava knihy k uzavření*/
		PRIPRAVA_KNIHY_K_UZAVRENI,
		/**Zrušení přípravy knihy k uzavření*/
		ZRUSENI_PRIPRAVY_KNIHY_K_UZAVRENI,
	}
	/**Seznam akcí*/
	const enum GBplSeznamAkci {
		/**Uzávěrka knih*/
		UZAVERKA_KNIH,
		/**Uzávěrka aktualní knihy*/
		UZAVERKA_KNIHY,
		/**Uzávěrka agendy*/
		UZAVERKA_AGENDY,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Vazby\TypoveDatasety\Gordic.Bpl.Interface.SeznamVazDokladu.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamVazDokladu*/
	interface SeznamVazDokladuDto {
		/**DBCOLUMN:SeznamVazDokladu.ixp_fak*/
		ixp_fak?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.ktg_typ*/
		ktg_typ?: number|null;
		/**DBCOLUMN:SeznamVazDokladu.vaz_fak*/
		vaz_fak?: number|null;
		/**DBCOLUMN:SeznamVazDokladu.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.mena*/
		mena?: number|null;
		/**DBCOLUMN:SeznamVazDokladu.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.nazev_den*/
		nazev_den?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamVazDokladu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:SeznamVazDokladu.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:SeznamVazDokladu.c_celk*/
		c_celk?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazDokladu.s_sto*/
		s_sto?: number|null;
		/**DBCOLUMN:SeznamVazDokladu.c_vaz*/
		c_vaz?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazDokladu.c_vaz_mena*/
		c_vaz_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazDokladu.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazDokladu.s_por*/
		s_por?: number|null;
	}
	const enum SeznamVazDokladuDtoNames { ixp_fak = "ixp_fak", ixp = "ixp", ac_esu = "ac_esu", ktg_typ = "ktg_typ", vaz_fak = "vaz_fak", ac_ag = "ac_ag", nazev = "nazev", mena = "mena", mena_zkr = "mena_zkr", nazev_den = "nazev_den", rok = "rok", aktivita = "aktivita", esu_txt = "esu_txt", c_celk = "c_celk", s_sto = "s_sto", c_vaz = "c_vaz", c_vaz_mena = "c_vaz_mena", c = "c", s_por = "s_por",}
	const enum SeznamVazDokladuDtoFragments { ixp_fak = "*", ixp = "*", ac_esu = "*", ktg_typ = "*", vaz_fak = "*", ac_ag = "*", nazev = "*", mena = "*", mena_zkr = "*", nazev_den = "*", rok = "*", aktivita = "*", esu_txt = "*", c_celk = "*", s_sto = "*", c_vaz = "*", c_vaz_mena = "*", c = "*", s_por = "*",}
	const enum SeznamVazDokladuDtoTypes { ixp_fak = "string", ixp = "string", ac_esu = "string", ktg_typ = "number", vaz_fak = "number", ac_ag = "string", nazev = "string", mena = "number", mena_zkr = "string", nazev_den = "string", rok = "number", aktivita = "number", esu_txt = "string", c_celk = "JsonDecimal", s_sto = "number", c_vaz = "JsonDecimal", c_vaz_mena = "JsonDecimal", c = "JsonDecimal", s_por = "number",}
	const enum SeznamVazDokladuDtoTypeLengths { ixp_fak = 12, ixp = 12, ac_esu = 60, ac_ag = 20, nazev = 50, mena_zkr = 16, nazev_den = 50, esu_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Vazby\TypoveDatasety\Gordic.Bpl.Interface.SeznamVazebKdfDto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamVazebKdf*/
	interface SeznamVazebKdfDto {
		/**DBCOLUMN:SeznamVazebKdf.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.ac_esu*/
		ac_esu?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.ac_ag*/
		ac_ag?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.nazev_den*/
		nazev_den?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.ixp_den*/
		ixp_den?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.rok*/
		rok?: number|null;
		/**DBCOLUMN:SeznamVazebKdf.kurz*/
		kurz?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazebKdf.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazebKdf.c_zalohy_celkem*/
		c_zalohy_celkem?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazebKdf.c_mena*/
		c_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazebKdf.ico_esu*/
		ico_esu?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.mena_zkr*/
		mena_zkr?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.c_vyuc_mena*/
		c_vyuc_mena?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazebKdf.vs*/
		vs?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.popis*/
		popis?: string|null;
		/**DBCOLUMN:SeznamVazebKdf.vaz_fak*/
		vaz_fak?: number|null;
		/**DBCOLUMN:SeznamVazebKdf.s_por*/
		s_por?: number|null;
	}
	const enum SeznamVazebKdfDtoNames { ixp = "ixp", ac_esu = "ac_esu", ac_ag = "ac_ag", nazev = "nazev", nazev_den = "nazev_den", ixp_den = "ixp_den", rok = "rok", kurz = "kurz", c = "c", c_zalohy_celkem = "c_zalohy_celkem", c_mena = "c_mena", ico_esu = "ico_esu", mena_zkr = "mena_zkr", c_vyuc_mena = "c_vyuc_mena", vs = "vs", popis = "popis", vaz_fak = "vaz_fak", s_por = "s_por",}
	const enum SeznamVazebKdfDtoFragments { ixp = "*", ac_esu = "*", ac_ag = "*", nazev = "*", nazev_den = "*", ixp_den = "*", rok = "*", kurz = "*", c = "*", c_zalohy_celkem = "*", c_mena = "*", ico_esu = "*", mena_zkr = "*", c_vyuc_mena = "*", vs = "*", popis = "*", vaz_fak = "*", s_por = "*",}
	const enum SeznamVazebKdfDtoTypes { ixp = "string", ac_esu = "string", ac_ag = "string", nazev = "string", nazev_den = "string", ixp_den = "string", rok = "number", kurz = "JsonDecimal", c = "JsonDecimal", c_zalohy_celkem = "JsonDecimal", c_mena = "JsonDecimal", ico_esu = "string", mena_zkr = "string", c_vyuc_mena = "JsonDecimal", vs = "string", popis = "string", vaz_fak = "number", s_por = "number",}
	const enum SeznamVazebKdfDtoTypeLengths { ixp = 12, ac_esu = 60, ac_ag = 20, nazev = 25, nazev_den = 50, ixp_den = 12, ico_esu = 14, mena_zkr = 16, vs = 12, popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Bpl.Interface\Vazby\TypoveDatasety\Gordic.Bpl.Interface.SeznamVazSmluv.Dto.d.ts 

declare namespace Gordic.Bpl.Interface {
	/**DBTABLE:SeznamVazSmluv*/
	interface SeznamVazSmluvDto {
		/**DBCOLUMN:SeznamVazSmluv.radek_kry*/
		radek_kry?: number|null;
		/**DBCOLUMN:SeznamVazSmluv.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.kod_kon*/
		kod_kon?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.ixs_kon*/
		ixs_kon?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.c*/
		c?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazSmluv.znam*/
		znam?: number|null;
		/**DBCOLUMN:SeznamVazSmluv.up_stav*/
		up_stav?: number|null;
		/**DBCOLUMN:SeznamVazSmluv.nks*/
		nks?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.te0*/
		te0?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.te1*/
		te1?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.te2*/
		te2?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.te3*/
		te3?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.te4*/
		te4?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.uea*/
		uea?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.ueb*/
		ueb?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.uec*/
		uec?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.ued*/
		ued?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.uee*/
		uee?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.uef*/
		uef?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.ueg*/
		ueg?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.ueh*/
		ueh?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.uei*/
		uei?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.uej*/
		uej?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.nazev_sml*/
		nazev_sml?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.ac_sml*/
		ac_sml?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.ixp_sml*/
		ixp_sml?: string|null;
		/**DBCOLUMN:SeznamVazSmluv.c_sml*/
		c_sml?: JsonDecimal|null;
		/**DBCOLUMN:SeznamVazSmluv.znam_sml*/
		znam_sml?: number|null;
		/**DBCOLUMN:SeznamVazSmluv.rok_sml*/
		rok_sml?: number|null;
		/**DBCOLUMN:SeznamVazSmluv.cislo_sml*/
		cislo_sml?: number|null;
	}
	const enum SeznamVazSmluvDtoNames { radek_kry = "radek_kry", nazev = "nazev", kod_kon = "kod_kon", ixs_kon = "ixs_kon", c = "c", znam = "znam", up_stav = "up_stav", nks = "nks", te0 = "te0", te1 = "te1", te2 = "te2", te3 = "te3", te4 = "te4", uea = "uea", ueb = "ueb", uec = "uec", ued = "ued", uee = "uee", uef = "uef", ueg = "ueg", ueh = "ueh", uei = "uei", uej = "uej", nazev_sml = "nazev_sml", ac_sml = "ac_sml", ixp_sml = "ixp_sml", c_sml = "c_sml", znam_sml = "znam_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml",}
	const enum SeznamVazSmluvDtoFragments { radek_kry = "*", nazev = "*", kod_kon = "*", ixs_kon = "*", c = "*", znam = "*", up_stav = "*", nks = "*", te0 = "*", te1 = "*", te2 = "*", te3 = "*", te4 = "*", uea = "*", ueb = "*", uec = "*", ued = "*", uee = "*", uef = "*", ueg = "*", ueh = "*", uei = "*", uej = "*", nazev_sml = "*", ac_sml = "*", ixp_sml = "*", c_sml = "*", znam_sml = "*", rok_sml = "*", cislo_sml = "*",}
	const enum SeznamVazSmluvDtoTypes { radek_kry = "number", nazev = "string", kod_kon = "string", ixs_kon = "string", c = "JsonDecimal", znam = "number", up_stav = "number", nks = "string", te0 = "string", te1 = "string", te2 = "string", te3 = "string", te4 = "string", uea = "string", ueb = "string", uec = "string", ued = "string", uee = "string", uef = "string", ueg = "string", ueh = "string", uei = "string", uej = "string", nazev_sml = "string", ac_sml = "string", ixp_sml = "string", c_sml = "JsonDecimal", znam_sml = "number", rok_sml = "number", cislo_sml = "number",}
	const enum SeznamVazSmluvDtoTypeLengths { nazev = 50, kod_kon = 30, ixs_kon = 12, nks = 12, te0 = 16, te1 = 16, te2 = 16, te3 = 6, te4 = 12, uea = 3, ueb = 4, uec = 12, ued = 12, uee = 12, uef = 3, ueg = 16, ueh = 4, uei = 4, uej = 12, nazev_sml = 254, ac_sml = 20, ixp_sml = 12,}
}

//#endregion

