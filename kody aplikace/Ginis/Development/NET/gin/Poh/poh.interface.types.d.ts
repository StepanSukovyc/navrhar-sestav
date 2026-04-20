/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       poh.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Poh.Interface\Gordic.Poh.Interface.csproj
*    created     2026-02-16 14:35:17
*    files       Dto\GPlatbyDdpDto.d.ts
*                Dto\GPohBudovaJednotkaDto.d.ts
*                Dto\GPohDetailPoInfoDto.d.ts
*                Dto\GPohObyvatelDto.d.ts
*                Dto\GPohStavDoruceniDto.d.ts
*                Dto\GPohWflProfilDto.d.ts
*                Dto\GPohZakladDto.d.ts
*                DtoBmiMMB\GBmiCizAdoDto.d.ts
*                DtoBmiMMB\GBmiNahlizeniOduDto.d.ts
*                DtoBmiMMB\GBmiNemovitostTpAddoNemDto.d.ts
*                DtoPoh\GPohDashboardDto.d.ts
*                DtoPoh\GPohFormularRowDto.d.ts
*                DtoPoh\GPohHistorieVypoctuDto.d.ts
*                DtoPoh\GPohOsobaJednotkaDto.d.ts
*                DtoPoh\GPohPlatbaDto.d.ts
*                DtoPoh\GPohPredpisDto.d.ts
*                DtoPoh\GPohPredpisDtoExtended.d.ts
*                DtoPoh\GPohRenRapDto.d.ts
*                DtoPoh\GPohSeznamIcoDto.d.ts
*                DtoPoh\GPohSpolecnostPrehled.d.ts
*                DtoPoh\GPohVlastnictviBudovaDto.d.ts
*                DtoPoh\GPohVratkaDto.d.ts
*                DtoPoh\GPohVyzvaDto.d.ts
*                DtoPoh\GPohZasilkaDto.d.ts
*                DtoPoh\GVlastnictviDatumy.d.ts
*                DtoPohFo\GPohFoDetailRozhodneObdobiDto.d.ts
*                DtoPohFo\GPohFoMainPanel.d.ts
*                DtoPohFo\GPohFoRozhodneObdobiDto.d.ts
*                DtoPohFo\GPohZakladPoDto.d.ts
*                DtoSaldot\GPohSaldotDokladyPOUDto.d.ts
*                DtoSaldot\GSaldotDashboardDto.d.ts
*                DtoSaldot\GSaldotSmlouvaDto.d.ts
*                DtoSaldot\GSaldotStatistika.d.ts
*                DtoSmlouvyOdpady\GPohOdpadySmlouva.d.ts
*                Isl\IGPohBMI.d.ts
*                Isl\IGPohDashboard.d.ts
*                Isl\IGPohFormulare.d.ts
*                Isl\IGPohHledaniRen.d.ts
*                Isl\IGPohRobObyvatel.d.ts
*                Isl\IGPohSpravaVlastnictvi.d.ts
*                Isl\IGPohSzrsadrDto.d.ts
*                Isl\IGPohTisk.d.ts
*                Isl\IGPohWflProfil.d.ts
*                Isl\IGPohZaklad.d.ts
*                IslFo\IGPohFoZaklad.d.ts
*                IslFo\IGPohFyzSpravaNem.d.ts
*                IslFo\IGPohFyzSpravaTP.d.ts
*                IslSaldot\GOprTools.d.ts
*                IslSaldot\IGOdpadySmlouvy.d.ts
*                IslSaldot\IGOprSmlDbOps.d.ts
*                IslSaldot\IGSaldotSmlouvy.d.ts
*                Poh\GPohFoRozObd.d.ts
*                Poh\GPohVlastnictvi.d.ts
*                Poh\IGNSeznamPlatebPoh.d.ts
*                Prefabs\GPohVyberFormulareDto.d.ts
*                Prefabs\GPohVyberOsobyDto.d.ts
*                Prefabs\GPohVyberStavFormulareDto.d.ts
*                Prefabs\GPohZasilkaDTO.d.ts
*                Prefabs\GPohZpVyuzNemDto.d.ts
*                Prefabs\GPostTestDto.d.ts
*                Prefabs\GSaldotDuvodZamitnutiDto.d.ts
*                Prefabs\GSaldotKontrolaDto.d.ts
*                Prefabs\GSaldotSzrDto.d.ts
*                Prefabs\GSaldotVyberNovaFunkceDto.d.ts
*                Prefabs\IGPohVyberFormulare.d.ts
*                Prefabs\IGPohVyberOsoby.d.ts
*                Prefabs\IGPohVyberStavFormulare.d.ts
*                Prefabs\IGPohZasilka.d.ts
*                Prefabs\IGPohZpVyuzNem.d.ts
*                Prefabs\IGPostTest.d.ts
*                Prefabs\IGSaldotDuvodZamitnuti.d.ts
*                Prefabs\IGSaldotKontrola.d.ts
*                Prefabs\IGSaldotKontrola2.d.ts
*                Prefabs\IGSaldotSzr.d.ts
*                Prefabs\IGVyberNovaFunkce.d.ts
*                Saldot\GOprTools.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Dto\GPlatbyDdpDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro PlatbyDdp*/
	interface GPlatbyDdpDto {
		/**IXP*/
		IXP?: string|null;
		/**RADEK_POL*/
		RADEK_POL?: JsonDecimal|null;
		/**SUBRADEK*/
		SUBRADEK?: JsonDecimal|null;
		/**RADEK_AV*/
		RADEK_AV?: JsonDecimal|null;
		/**LIC*/
		LIC?: string|null;
		/**EKO_AKT*/
		EKO_AKT?: JsonDecimal|null;
		/**IXP_PAR*/
		IXP_PAR?: string|null;
		/**CISLO_PAR*/
		CISLO_PAR?: JsonDecimal|null;
		/**S_POL*/
		S_POL?: JsonDecimal|null;
		/**NAZEV*/
		NAZEV?: string|null;
		/**SK_VL*/
		SK_VL?: string|null;
		/**BU_VL*/
		BU_VL?: string|null;
		/**BU_TXT_VL*/
		BU_TXT_VL?: string|null;
		/**SK_CI*/
		SK_CI?: string|null;
		/**BU_CI*/
		BU_CI?: string|null;
		/**BU_TXT_CI*/
		BU_TXT_CI?: string|null;
		/**DAT_ZAP*/
		DAT_ZAP?: JsonDate|null;
		/**DAT_PAR*/
		DAT_PAR?: JsonDate|null;
		/**VS*/
		VS?: string|null;
		/**KS*/
		KS?: string|null;
		/**SS*/
		SS?: string|null;
		/**C*/
		C?: number|null;
		/**C_PAR*/
		C_PAR?: number|null;
		/**CIS_BDO*/
		CIS_BDO?: string|null;
		/**KOD_BAN*/
		KOD_BAN?: JsonDecimal|null;
		/**KOD_DAT*/
		KOD_DAT?: JsonDecimal|null;
		/**KOD_ZME*/
		KOD_ZME?: JsonDecimal|null;
		/**DAT_VAL*/
		DAT_VAL?: JsonDate|null;
		/**DAT_ZMENA*/
		DAT_ZMENA?: JsonDate|null;
		/**ZMENU_PROV*/
		ZMENU_PROV?: string|null;
		/**ZU*/
		ZU?: JsonDecimal|null;
		/**DAT_UHR*/
		DAT_UHR?: JsonDate|null;
		/**IXP_POK*/
		IXP_POK?: string|null;
		/**IXP_HPL*/
		IXP_HPL?: string|null;
		/**RADEK_UPO*/
		RADEK_UPO?: JsonDecimal|null;
		/**POR_CISLO*/
		POR_CISLO?: JsonDecimal|null;
		/**VS2*/
		VS2?: string|null;
		/**SS2*/
		SS2?: string|null;
		/**DAT_ODP*/
		DAT_ODP?: JsonDate|null;
		/**DAT_ODE*/
		DAT_ODE?: JsonDate|null;
		/**UPL*/
		UPL?: JsonDecimal|null;
		/**MENA*/
		MENA?: JsonDecimal|null;
		/**C_MENA*/
		C_MENA?: number|null;
		/**KURZ*/
		KURZ?: number|null;
		/**C_POP*/
		C_POP?: number|null;
		/**MENA_POP*/
		MENA_POP?: JsonDecimal|null;
		/**C_POP_MENA*/
		C_POP_MENA?: number|null;
		/**BIC*/
		BIC?: string|null;
		/**C_PAR_MENA*/
		C_PAR_MENA?: number|null;
		/**TYP_AG*/
		TYP_AG?: JsonDecimal|null;
		/**DAT_POL*/
		DAT_POL?: JsonDate|null;
		/**POPIS1*/
		POPIS1?: string|null;
		/**IXP_BPL*/
		IXP_BPL?: string|null;
		/**UHP*/
		UHP?: JsonDecimal|null;
		/**UUS*/
		UUS?: string|null;
		/**POKYN*/
		POKYN?: string|null;
		/**TRA_ID*/
		TRA_ID?: string|null;
		/**UHP_txt*/
		UHP_txt?: string|null;
	}
	const enum GPlatbyDdpDtoNames { IXP = "IXP", RADEK_POL = "RADEK_POL", SUBRADEK = "SUBRADEK", RADEK_AV = "RADEK_AV", LIC = "LIC", EKO_AKT = "EKO_AKT", IXP_PAR = "IXP_PAR", CISLO_PAR = "CISLO_PAR", S_POL = "S_POL", NAZEV = "NAZEV", SK_VL = "SK_VL", BU_VL = "BU_VL", BU_TXT_VL = "BU_TXT_VL", SK_CI = "SK_CI", BU_CI = "BU_CI", BU_TXT_CI = "BU_TXT_CI", DAT_ZAP = "DAT_ZAP", DAT_PAR = "DAT_PAR", VS = "VS", KS = "KS", SS = "SS", C = "C", C_PAR = "C_PAR", CIS_BDO = "CIS_BDO", KOD_BAN = "KOD_BAN", KOD_DAT = "KOD_DAT", KOD_ZME = "KOD_ZME", DAT_VAL = "DAT_VAL", DAT_ZMENA = "DAT_ZMENA", ZMENU_PROV = "ZMENU_PROV", ZU = "ZU", DAT_UHR = "DAT_UHR", IXP_POK = "IXP_POK", IXP_HPL = "IXP_HPL", RADEK_UPO = "RADEK_UPO", POR_CISLO = "POR_CISLO", VS2 = "VS2", SS2 = "SS2", DAT_ODP = "DAT_ODP", DAT_ODE = "DAT_ODE", UPL = "UPL", MENA = "MENA", C_MENA = "C_MENA", KURZ = "KURZ", C_POP = "C_POP", MENA_POP = "MENA_POP", C_POP_MENA = "C_POP_MENA", BIC = "BIC", C_PAR_MENA = "C_PAR_MENA", TYP_AG = "TYP_AG", DAT_POL = "DAT_POL", POPIS1 = "POPIS1", IXP_BPL = "IXP_BPL", UHP = "UHP", UUS = "UUS", POKYN = "POKYN", TRA_ID = "TRA_ID", UHP_txt = "UHP_txt",}
	const enum GPlatbyDdpDtoFragments { IXP = "main", RADEK_POL = "main", SUBRADEK = "main", RADEK_AV = "main", LIC = "main", EKO_AKT = "main", IXP_PAR = "main", CISLO_PAR = "main", S_POL = "main", NAZEV = "main", SK_VL = "main", BU_VL = "main", BU_TXT_VL = "main", SK_CI = "main", BU_CI = "main", BU_TXT_CI = "main", DAT_ZAP = "main", DAT_PAR = "main", VS = "main", KS = "main", SS = "main", C = "main", C_PAR = "main", CIS_BDO = "main", KOD_BAN = "main", KOD_DAT = "main", KOD_ZME = "main", DAT_VAL = "main", DAT_ZMENA = "main", ZMENU_PROV = "main", ZU = "main", DAT_UHR = "main", IXP_POK = "main", IXP_HPL = "main", RADEK_UPO = "main", POR_CISLO = "main", VS2 = "main", SS2 = "main", DAT_ODP = "main", DAT_ODE = "main", UPL = "main", MENA = "main", C_MENA = "main", KURZ = "main", C_POP = "main", MENA_POP = "main", C_POP_MENA = "main", BIC = "main", C_PAR_MENA = "main", TYP_AG = "main", DAT_POL = "main", POPIS1 = "main", IXP_BPL = "main", UHP = "main", UUS = "main", POKYN = "main", TRA_ID = "main", UHP_txt = "UHP_txt",}
	const enum GPlatbyDdpDtoTypes { IXP = "string", RADEK_POL = "JsonDecimal", SUBRADEK = "JsonDecimal", RADEK_AV = "JsonDecimal", LIC = "string", EKO_AKT = "JsonDecimal", IXP_PAR = "string", CISLO_PAR = "JsonDecimal", S_POL = "JsonDecimal", NAZEV = "string", SK_VL = "string", BU_VL = "string", BU_TXT_VL = "string", SK_CI = "string", BU_CI = "string", BU_TXT_CI = "string", DAT_ZAP = "JsonDate", DAT_PAR = "JsonDate", VS = "string", KS = "string", SS = "string", C = "number", C_PAR = "number", CIS_BDO = "string", KOD_BAN = "JsonDecimal", KOD_DAT = "JsonDecimal", KOD_ZME = "JsonDecimal", DAT_VAL = "JsonDate", DAT_ZMENA = "JsonDate", ZMENU_PROV = "string", ZU = "JsonDecimal", DAT_UHR = "JsonDate", IXP_POK = "string", IXP_HPL = "string", RADEK_UPO = "JsonDecimal", POR_CISLO = "JsonDecimal", VS2 = "string", SS2 = "string", DAT_ODP = "JsonDate", DAT_ODE = "JsonDate", UPL = "JsonDecimal", MENA = "JsonDecimal", C_MENA = "number", KURZ = "number", C_POP = "number", MENA_POP = "JsonDecimal", C_POP_MENA = "number", BIC = "string", C_PAR_MENA = "number", TYP_AG = "JsonDecimal", DAT_POL = "JsonDate", POPIS1 = "string", IXP_BPL = "string", UHP = "JsonDecimal", UUS = "string", POKYN = "string", TRA_ID = "string", UHP_txt = "string",}
	const enum GPlatbyDdpDtoTypeLengths { IXP = 12, LIC = 4, IXP_PAR = 12, NAZEV = 160, SK_VL = 11, BU_VL = 34, BU_TXT_VL = 46, SK_CI = 11, BU_CI = 34, BU_TXT_CI = 46, VS = 12, KS = 12, SS = 12, CIS_BDO = 30, ZMENU_PROV = 12, IXP_POK = 12, IXP_HPL = 12, VS2 = 12, SS2 = 12, BIC = 20, POPIS1 = 254, IXP_BPL = 12, UUS = 10, POKYN = 254, TRA_ID = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Dto\GPohBudovaJednotkaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro GPohBudovaJednotkaDto*/
	interface GGPohBudovaJednotkaDtoDto {
		/**ID_BUDOVY*/
		ID_BUDOVY?: string|null;
		/**STAV_DAT*/
		STAV_DAT?: JsonDecimal|null;
		/**DAT_VZNIKU*/
		DAT_VZNIKU?: JsonDate|null;
		/**DAT_ZANIKU*/
		DAT_ZANIKU?: JsonDate|null;
		/**ID_PR_KONTX*/
		ID_PR_KONTX?: JsonDecimal|null;
		/**ID_RIZENI_VZN*/
		ID_RIZENI_VZN?: string|null;
		/**ID_RIZENI_ZAN*/
		ID_RIZENI_ZAN?: string|null;
		/**TYP_BUDOVY*/
		TYP_BUDOVY?: JsonDecimal|null;
		/**KOD_CASTI_OBCE*/
		KOD_CASTI_OBCE?: JsonDecimal|null;
		/**CISLO_DOMOVNI*/
		CISLO_DOMOVNI?: JsonDecimal|null;
		/**C_CENA_NEM*/
		C_CENA_NEM?: number|null;
		/**ZP_VYUZ_BUD*/
		ZP_VYUZ_BUD?: JsonDecimal|null;
		/**ID_TELESA*/
		ID_TELESA?: string|null;
		/**C_CENA_OC*/
		C_CENA_OC?: number|null;
		/**DAT_OC*/
		DAT_OC?: JsonDate|null;
		/**POPIS_OC*/
		POPIS_OC?: string|null;
		/**IXS_DAV*/
		IXS_DAV?: string|null;
		/**POZNAMKA*/
		POZNAMKA?: string|null;
		/**AKTIVITA*/
		AKTIVITA?: JsonDecimal|null;
		/**DAT_ZMENA*/
		DAT_ZMENA?: JsonDate|null;
		/**ZMENU_PROV*/
		ZMENU_PROV?: string|null;
		/**ZP_OC*/
		ZP_OC?: JsonDecimal|null;
		/**TYP_DAT*/
		TYP_DAT?: JsonDecimal|null;
		/**ID_BUDOVY_ORIG*/
		ID_BUDOVY_ORIG?: string|null;
		/**BUDOVA_NAZEV*/
		BUDOVA_NAZEV?: string|null;
		/**KOD_KAT_UZEMI*/
		KOD_KAT_UZEMI?: JsonDecimal|null;
		/**DAT_ZAHAJENI*/
		DAT_ZAHAJENI?: JsonDate|null;
		/**DAT_VKLADU*/
		DAT_VKLADU?: JsonDate|null;
		/**DOC_STA*/
		DOC_STA?: JsonDecimal|null;
		/**ST_SOUCASTI*/
		ST_SOUCASTI?: JsonDecimal|null;
		/**ID_PR_STA*/
		ID_PR_STA?: string|null;
		/**PAR_POD_BUD_TXT*/
		PAR_POD_BUD_TXT?: string|null;
		/**ID_JEDNOTKY*/
		ID_JEDNOTKY?: string|null;
		/**TYP_JEDNOTKY*/
		TYP_JEDNOTKY?: JsonDecimal|null;
		/**CISLO_JEDNOTKY*/
		CISLO_JEDNOTKY?: number|null;
		/**ZP_VYUZ_JED*/
		ZP_VYUZ_JED?: JsonDecimal|null;
		/**PODIL_CITATEL*/
		PODIL_CITATEL?: JsonDecimal|null;
		/**PODIL_JMENOV*/
		PODIL_JMENOV?: JsonDecimal|null;
		/**POPIS*/
		POPIS?: string|null;
		/**ID_JEDNOTKY_ORIG*/
		ID_JEDNOTKY_ORIG?: string|null;
		/**JEDNOTKA_NAZEV*/
		JEDNOTKA_NAZEV?: string|null;
		/**ID_PR_KONTX_txt*/
		ID_PR_KONTX_txt?: string|null;
		/**IXS_DAV_txt*/
		IXS_DAV_txt?: string|null;
		/**ID_BUDOVY_txt*/
		ID_BUDOVY_txt?: string|null;
		/**ID_TELESA_txt*/
		ID_TELESA_txt?: string|null;
		/**ZP_VYUZ_JED_txt*/
		ZP_VYUZ_JED_txt?: string|null;
		/**STAV_DAT_txt*/
		STAV_DAT_txt?: string|null;
		/**TYP_DAT_txt*/
		TYP_DAT_txt?: string|null;
		/**TYP_JEDNOTKY_txt*/
		TYP_JEDNOTKY_txt?: string|null;
		/**ZP_OC_txt*/
		ZP_OC_txt?: string|null;
	}
	const enum GGPohBudovaJednotkaDtoDtoNames { ID_BUDOVY = "ID_BUDOVY", STAV_DAT = "STAV_DAT", DAT_VZNIKU = "DAT_VZNIKU", DAT_ZANIKU = "DAT_ZANIKU", ID_PR_KONTX = "ID_PR_KONTX", ID_RIZENI_VZN = "ID_RIZENI_VZN", ID_RIZENI_ZAN = "ID_RIZENI_ZAN", TYP_BUDOVY = "TYP_BUDOVY", KOD_CASTI_OBCE = "KOD_CASTI_OBCE", CISLO_DOMOVNI = "CISLO_DOMOVNI", C_CENA_NEM = "C_CENA_NEM", ZP_VYUZ_BUD = "ZP_VYUZ_BUD", ID_TELESA = "ID_TELESA", C_CENA_OC = "C_CENA_OC", DAT_OC = "DAT_OC", POPIS_OC = "POPIS_OC", IXS_DAV = "IXS_DAV", POZNAMKA = "POZNAMKA", AKTIVITA = "AKTIVITA", DAT_ZMENA = "DAT_ZMENA", ZMENU_PROV = "ZMENU_PROV", ZP_OC = "ZP_OC", TYP_DAT = "TYP_DAT", ID_BUDOVY_ORIG = "ID_BUDOVY_ORIG", BUDOVA_NAZEV = "BUDOVA_NAZEV", KOD_KAT_UZEMI = "KOD_KAT_UZEMI", DAT_ZAHAJENI = "DAT_ZAHAJENI", DAT_VKLADU = "DAT_VKLADU", DOC_STA = "DOC_STA", ST_SOUCASTI = "ST_SOUCASTI", ID_PR_STA = "ID_PR_STA", PAR_POD_BUD_TXT = "PAR_POD_BUD_TXT", ID_JEDNOTKY = "ID_JEDNOTKY", TYP_JEDNOTKY = "TYP_JEDNOTKY", CISLO_JEDNOTKY = "CISLO_JEDNOTKY", ZP_VYUZ_JED = "ZP_VYUZ_JED", PODIL_CITATEL = "PODIL_CITATEL", PODIL_JMENOV = "PODIL_JMENOV", POPIS = "POPIS", ID_JEDNOTKY_ORIG = "ID_JEDNOTKY_ORIG", JEDNOTKA_NAZEV = "JEDNOTKA_NAZEV", ID_PR_KONTX_txt = "ID_PR_KONTX_txt", IXS_DAV_txt = "IXS_DAV_txt", ID_BUDOVY_txt = "ID_BUDOVY_txt", ID_TELESA_txt = "ID_TELESA_txt", ZP_VYUZ_JED_txt = "ZP_VYUZ_JED_txt", STAV_DAT_txt = "STAV_DAT_txt", TYP_DAT_txt = "TYP_DAT_txt", TYP_JEDNOTKY_txt = "TYP_JEDNOTKY_txt", ZP_OC_txt = "ZP_OC_txt",}
	const enum GGPohBudovaJednotkaDtoDtoFragments { ID_BUDOVY = "main", STAV_DAT = "main", DAT_VZNIKU = "main", DAT_ZANIKU = "main", ID_PR_KONTX = "main", ID_RIZENI_VZN = "main", ID_RIZENI_ZAN = "main", TYP_BUDOVY = "main", KOD_CASTI_OBCE = "main", CISLO_DOMOVNI = "main", C_CENA_NEM = "main", ZP_VYUZ_BUD = "main", ID_TELESA = "main", C_CENA_OC = "main", DAT_OC = "main", POPIS_OC = "main", IXS_DAV = "main", POZNAMKA = "main", AKTIVITA = "main", DAT_ZMENA = "main", ZMENU_PROV = "main", ZP_OC = "main", TYP_DAT = "main", ID_BUDOVY_ORIG = "main", BUDOVA_NAZEV = "main", KOD_KAT_UZEMI = "main", DAT_ZAHAJENI = "main", DAT_VKLADU = "main", DOC_STA = "main", ST_SOUCASTI = "main", ID_PR_STA = "main", PAR_POD_BUD_TXT = "main", ID_JEDNOTKY = "main", TYP_JEDNOTKY = "main", CISLO_JEDNOTKY = "main", ZP_VYUZ_JED = "main", PODIL_CITATEL = "main", PODIL_JMENOV = "main", POPIS = "main", ID_JEDNOTKY_ORIG = "main", JEDNOTKA_NAZEV = "main", ID_PR_KONTX_txt = "ID_PR_KONTX_txt", IXS_DAV_txt = "IXS_DAV_txt", ID_BUDOVY_txt = "ID_BUDOVY_txt", ID_TELESA_txt = "ID_TELESA_txt", ZP_VYUZ_JED_txt = "ZP_VYUZ_JED_txt", STAV_DAT_txt = "STAV_DAT_txt", TYP_DAT_txt = "TYP_DAT_txt", TYP_JEDNOTKY_txt = "TYP_JEDNOTKY_txt", ZP_OC_txt = "ZP_OC_txt",}
	const enum GGPohBudovaJednotkaDtoDtoTypes { ID_BUDOVY = "string", STAV_DAT = "JsonDecimal", DAT_VZNIKU = "JsonDate", DAT_ZANIKU = "JsonDate", ID_PR_KONTX = "JsonDecimal", ID_RIZENI_VZN = "string", ID_RIZENI_ZAN = "string", TYP_BUDOVY = "JsonDecimal", KOD_CASTI_OBCE = "JsonDecimal", CISLO_DOMOVNI = "JsonDecimal", C_CENA_NEM = "number", ZP_VYUZ_BUD = "JsonDecimal", ID_TELESA = "string", C_CENA_OC = "number", DAT_OC = "JsonDate", POPIS_OC = "string", IXS_DAV = "string", POZNAMKA = "string", AKTIVITA = "JsonDecimal", DAT_ZMENA = "JsonDate", ZMENU_PROV = "string", ZP_OC = "JsonDecimal", TYP_DAT = "JsonDecimal", ID_BUDOVY_ORIG = "string", BUDOVA_NAZEV = "string", KOD_KAT_UZEMI = "JsonDecimal", DAT_ZAHAJENI = "JsonDate", DAT_VKLADU = "JsonDate", DOC_STA = "JsonDecimal", ST_SOUCASTI = "JsonDecimal", ID_PR_STA = "string", PAR_POD_BUD_TXT = "string", ID_JEDNOTKY = "string", TYP_JEDNOTKY = "JsonDecimal", CISLO_JEDNOTKY = "number", ZP_VYUZ_JED = "JsonDecimal", PODIL_CITATEL = "JsonDecimal", PODIL_JMENOV = "JsonDecimal", POPIS = "string", ID_JEDNOTKY_ORIG = "string", JEDNOTKA_NAZEV = "string", ID_PR_KONTX_txt = "string", IXS_DAV_txt = "string", ID_BUDOVY_txt = "string", ID_TELESA_txt = "string", ZP_VYUZ_JED_txt = "string", STAV_DAT_txt = "string", TYP_DAT_txt = "string", TYP_JEDNOTKY_txt = "string", ZP_OC_txt = "string",}
	const enum GGPohBudovaJednotkaDtoDtoTypeLengths { ID_BUDOVY = 30, ID_RIZENI_VZN = 30, ID_RIZENI_ZAN = 30, ID_TELESA = 30, POPIS_OC = 254, IXS_DAV = 12, POZNAMKA = 50, ZMENU_PROV = 12, ID_BUDOVY_ORIG = 30, BUDOVA_NAZEV = 100, ID_PR_STA = 30, PAR_POD_BUD_TXT = 254, ID_JEDNOTKY = 30, POPIS = 254, ID_JEDNOTKY_ORIG = 30, JEDNOTKA_NAZEV = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Dto\GPohDetailPoInfoDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro GPohDetailPoInfoDto*/
	interface GPohDetailPoInfoDto {
		IxpDdp?: string|null;
		predpisyCelkem?: JsonDecimal|null;
		predpisyLetos?: JsonDecimal|null;
		platbyCelkem?: number|null;
		platbyLetos?: number|null;
		rozdilCastek?: JsonDecimal|null;
	}
	const enum GPohDetailPoInfoDtoNames { IxpDdp = "IxpDdp", predpisyCelkem = "predpisyCelkem", predpisyLetos = "predpisyLetos", platbyCelkem = "platbyCelkem", platbyLetos = "platbyLetos", rozdilCastek = "rozdilCastek",}
	const enum GPohDetailPoInfoDtoFragments { IxpDdp = "*", predpisyCelkem = "*", predpisyLetos = "*", platbyCelkem = "*", platbyLetos = "*", rozdilCastek = "*",}
	const enum GPohDetailPoInfoDtoTypes { IxpDdp = "string", predpisyCelkem = "JsonDecimal", predpisyLetos = "JsonDecimal", platbyCelkem = "number", platbyLetos = "number", rozdilCastek = "JsonDecimal",}
	const enum GPohDetailPoInfoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Dto\GPohObyvatelDto.d.ts 

declare namespace Gordic.Poh.Interface {
	interface GPohObyvatelDto {
		/**ixs_oso*/
		ixs_oso?: string|null;
		/**Jmeno*/
		jmeno?: string|null;
		/**Prijmeni*/
		prijmeni?: string|null;
		/**Datum narozeni*/
		dat_nar?: JsonDate|null;
		/**Adresa*/
		adresa?: string|null;
		/**trvale bydliste od*/
		dat_tp_od?: JsonDate|null;
		dat_tp_do?: JsonDate|null;
		stav_bydl?: number|null;
		stav_bydl_txt?: string|null;
		/**typ bydliste trvale / prechodne*/
		typ_bydl?: number|null;
		typ_bydl_txt?: string|null;
		id_jednotky_vosj?: string|null;
		adr_txt?: string|null;
		/**kod adresniho mista ze szrsadr*/
		adresni_misto_kod?: string|null;
		/**nemsjed.cislo_jednotky*/
		cislo_jednotky?: number|null;
		/**stav osoby, ziva evidence=10, mrtva evidence=20 atd..*/
		stav_oso?: number|null;
		/**popis stavu osoby*/
		stav_oso_txt?: string|null;
	}
	const enum GPohObyvatelDtoNames { ixs_oso = "ixs_oso", jmeno = "jmeno", prijmeni = "prijmeni", dat_nar = "dat_nar", adresa = "adresa", dat_tp_od = "dat_tp_od", dat_tp_do = "dat_tp_do", stav_bydl = "stav_bydl", stav_bydl_txt = "stav_bydl_txt", typ_bydl = "typ_bydl", typ_bydl_txt = "typ_bydl_txt", id_jednotky_vosj = "id_jednotky_vosj", adr_txt = "adr_txt", adresni_misto_kod = "adresni_misto_kod", cislo_jednotky = "cislo_jednotky", stav_oso = "stav_oso", stav_oso_txt = "stav_oso_txt",}
	const enum GPohObyvatelDtoFragments { ixs_oso = "*", jmeno = "*", prijmeni = "*", dat_nar = "*", adresa = "*", dat_tp_od = "*", dat_tp_do = "*", stav_bydl = "*", stav_bydl_txt = "*", typ_bydl = "*", typ_bydl_txt = "*", id_jednotky_vosj = "*", adr_txt = "*", adresni_misto_kod = "*", cislo_jednotky = "*", stav_oso = "*", stav_oso_txt = "*",}
	const enum GPohObyvatelDtoTypes { ixs_oso = "string", jmeno = "string", prijmeni = "string", dat_nar = "JsonDate", adresa = "string", dat_tp_od = "JsonDate", dat_tp_do = "JsonDate", stav_bydl = "number", stav_bydl_txt = "string", typ_bydl = "number", typ_bydl_txt = "string", id_jednotky_vosj = "string", adr_txt = "string", adresni_misto_kod = "string", cislo_jednotky = "number", stav_oso = "number", stav_oso_txt = "string",}
	const enum GPohObyvatelDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Dto\GPohStavDoruceniDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro PlatbyDdp*/
	interface GPohStavDoruceniDto {
		/**identifikator stavu*/
		s_dor?: number|null;
		/**s_dor_txt*/
		s_dor_txt?: string|null;
	}
	const enum GPohStavDoruceniDtoNames { s_dor = "s_dor", s_dor_txt = "s_dor_txt",}
	const enum GPohStavDoruceniDtoFragments { s_dor = "main", s_dor_txt = "main",}
	const enum GPohStavDoruceniDtoTypes { s_dor = "number", s_dor_txt = "string",}
	const enum GPohStavDoruceniDtoTypeLengths { s_dor_txt = 50,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Dto\GPohWflProfilDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro WflProfil*/
	interface GPohWflProfilDto {
		/**ixp*/
		ixp?: string|null;
		/**lic*/
		lic?: string|null;
		/**ixp_spis*/
		ixp_spis?: string|null;
		/**priz_spis*/
		priz_spis?: number|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**nazev*/
		nazev?: string|null;
		/**akt_znacka*/
		akt_znacka?: string|null;
		/**stav_dist*/
		stav_dist?: number|null;
		/**stav_pis*/
		stav_pis?: number|null;
		/**typ_ag*/
		typ_ag?: number|null;
		/**ktg_typ*/
		ktg_typ?: number|null;
		/**ixs_typ*/
		ixs_typ?: string|null;
		/**s_prij*/
		s_prij?: number|null;
		/**s_ssl*/
		s_ssl?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**s_ele*/
		s_ele?: number|null;
		/**s_fyz*/
		s_fyz?: number|null;
		/**misto_vzniku*/
		misto_vzniku?: string|null;
		/**s_sgn*/
		s_sgn?: number|null;
		/**dat_pod*/
		dat_pod?: JsonDate|null;
		/**cs_akt_znacka*/
		cs_akt_znacka?: string|null;
		/**priz_view_ssl*/
		priz_view_ssl?: number|null;
		/**uzo*/
		uzo?: string|null;
		/**spis_pl*/
		spis_pl?: string|null;
		/**spis_znak*/
		spis_znak?: string|null;
		/**ixs_fun_wfl*/
		ixs_fun_wfl?: string|null;
		/**s_uloz*/
		s_uloz?: number|null;
		/**dat_uloz*/
		dat_uloz?: JsonDate|null;
		/**ixs_su_wfl*/
		ixs_su_wfl?: string|null;
		/**s_odes*/
		s_odes?: number|null;
		/**dat_mpd0*/
		dat_mpd0?: JsonDate|null;
		/**priz_cj*/
		priz_cj?: number|null;
		/**dat_vyriz*/
		dat_vyriz?: JsonDate|null;
		/**ixs_cj*/
		ixs_cj?: string|null;
		/**ixs_lpc*/
		ixs_lpc?: string|null;
		/**puvod*/
		puvod?: number|null;
		/**s_schval*/
		s_schval?: number|null;
		/**umisteni*/
		umisteni?: string|null;
		/**st_utaj_id*/
		st_utaj_id?: number|null;
		/**wfl_pristup*/
		wfl_pristup?: number|null;
		/**skar_znak*/
		skar_znak?: string|null;
		/**skar_lhuta*/
		skar_lhuta?: number|null;
		/**rok_spo_uda*/
		rok_spo_uda?: number|null;
		/**ixp_top*/
		ixp_top?: string|null;
		/**typ_spis*/
		typ_spis?: number|null;
		/**barcode*/
		barcode?: string|null;
		/**skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**ixs_ext*/
		ixs_ext?: string|null;
		/**rok_skartace*/
		rok_skartace?: number|null;
		/**ixs_spu*/
		ixs_spu?: string|null;
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
		/**cj*/
		cj?: string|null;
		/**ico*/
		ico?: string|null;
		esu_nazev?: string|null;
		/**odkaz primo na soubor s elobrazem*/
		ixb_elobraz?: string|null;
		/**stav doruceni*/
		stav_doruceni?: JsonDecimal|null;
		/**datum doruceni*/
		datum_doruceni?: JsonDate|null;
		gor_err?: number|null;
		txt_err?: string|null;
		stav_doruceni_txt?: string|null;
	}
	const enum GPohWflProfilDtoNames { ixp = "ixp", lic = "lic", ixp_spis = "ixp_spis", priz_spis = "priz_spis", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", nazev = "nazev", akt_znacka = "akt_znacka", stav_dist = "stav_dist", stav_pis = "stav_pis", typ_ag = "typ_ag", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", s_prij = "s_prij", s_ssl = "s_ssl", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", s_ele = "s_ele", s_fyz = "s_fyz", misto_vzniku = "misto_vzniku", s_sgn = "s_sgn", dat_pod = "dat_pod", cs_akt_znacka = "cs_akt_znacka", priz_view_ssl = "priz_view_ssl", uzo = "uzo", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", dat_uloz = "dat_uloz", ixs_su_wfl = "ixs_su_wfl", s_odes = "s_odes", dat_mpd0 = "dat_mpd0", priz_cj = "priz_cj", dat_vyriz = "dat_vyriz", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", puvod = "puvod", s_schval = "s_schval", umisteni = "umisteni", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", rok_spo_uda = "rok_spo_uda", ixp_top = "ixp_top", typ_spis = "typ_spis", barcode = "barcode", skar_lhuta_spra = "skar_lhuta_spra", ixs_ext = "ixs_ext", rok_skartace = "rok_skartace", ixs_spu = "ixs_spu", poc_listu = "poc_listu", poc_stran = "poc_stran", poc_kop = "poc_kop", poc_priloh = "poc_priloh", poc_l_priloh = "poc_l_priloh", cj = "cj", ico = "ico", esu_nazev = "esu_nazev", ixb_elobraz = "ixb_elobraz", stav_doruceni = "stav_doruceni", datum_doruceni = "datum_doruceni", gor_err = "gor_err", txt_err = "txt_err", stav_doruceni_txt = "stav_doruceni_txt",}
	const enum GPohWflProfilDtoFragments { ixp = "*", lic = "*", ixp_spis = "*", priz_spis = "*", ixs_fun_akt = "*", ixs_su_akt = "*", nazev = "*", akt_znacka = "*", stav_dist = "*", stav_pis = "*", typ_ag = "*", ktg_typ = "*", ixs_typ = "*", s_prij = "*", s_ssl = "*", dat_zmena = "*", zmenu_prov = "*", s_ele = "*", s_fyz = "*", misto_vzniku = "*", s_sgn = "*", dat_pod = "*", cs_akt_znacka = "*", priz_view_ssl = "*", uzo = "*", spis_pl = "*", spis_znak = "*", ixs_fun_wfl = "*", s_uloz = "*", dat_uloz = "*", ixs_su_wfl = "*", s_odes = "*", dat_mpd0 = "*", priz_cj = "*", dat_vyriz = "*", ixs_cj = "*", ixs_lpc = "*", puvod = "*", s_schval = "*", umisteni = "*", st_utaj_id = "*", wfl_pristup = "*", skar_znak = "*", skar_lhuta = "*", rok_spo_uda = "*", ixp_top = "*", typ_spis = "*", barcode = "*", skar_lhuta_spra = "*", ixs_ext = "*", rok_skartace = "*", ixs_spu = "*", poc_listu = "*", poc_stran = "*", poc_kop = "*", poc_priloh = "*", poc_l_priloh = "*", cj = "*", ico = "*", esu_nazev = "*", ixb_elobraz = "*", stav_doruceni = "*", datum_doruceni = "*", gor_err = "*", txt_err = "*", stav_doruceni_txt = "*",}
	const enum GPohWflProfilDtoTypes { ixp = "string", lic = "string", ixp_spis = "string", priz_spis = "number", ixs_fun_akt = "string", ixs_su_akt = "string", nazev = "string", akt_znacka = "string", stav_dist = "number", stav_pis = "number", typ_ag = "number", ktg_typ = "number", ixs_typ = "string", s_prij = "number", s_ssl = "number", dat_zmena = "JsonDate", zmenu_prov = "string", s_ele = "number", s_fyz = "number", misto_vzniku = "string", s_sgn = "number", dat_pod = "JsonDate", cs_akt_znacka = "string", priz_view_ssl = "number", uzo = "string", spis_pl = "string", spis_znak = "string", ixs_fun_wfl = "string", s_uloz = "number", dat_uloz = "JsonDate", ixs_su_wfl = "string", s_odes = "number", dat_mpd0 = "JsonDate", priz_cj = "number", dat_vyriz = "JsonDate", ixs_cj = "string", ixs_lpc = "string", puvod = "number", s_schval = "number", umisteni = "string", st_utaj_id = "number", wfl_pristup = "number", skar_znak = "string", skar_lhuta = "number", rok_spo_uda = "number", ixp_top = "string", typ_spis = "number", barcode = "string", skar_lhuta_spra = "number", ixs_ext = "string", rok_skartace = "number", ixs_spu = "string", poc_listu = "string", poc_stran = "number", poc_kop = "number", poc_priloh = "number", poc_l_priloh = "string", cj = "string", ico = "string", esu_nazev = "string", ixb_elobraz = "string", stav_doruceni = "JsonDecimal", datum_doruceni = "JsonDate", gor_err = "number", txt_err = "string", stav_doruceni_txt = "string",}
	const enum GPohWflProfilDtoTypeLengths { ixp = 12, lic = 4, ixp_spis = 12, ixs_fun_akt = 12, ixs_su_akt = 12, nazev = 100, akt_znacka = 50, ixs_typ = 12, zmenu_prov = 12, misto_vzniku = 100, cs_akt_znacka = 50, uzo = 1, spis_pl = 5, spis_znak = 50, ixs_fun_wfl = 12, ixs_su_wfl = 12, ixs_cj = 12, ixs_lpc = 12, umisteni = 20, skar_znak = 2, ixp_top = 12, barcode = 50, ixs_ext = 12, ixs_spu = 12, poc_listu = 4, poc_l_priloh = 5, cj = 50, ico = 10, esu_nazev = 100, ixb_elobraz = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Dto\GPohZakladDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro vyhledavani spisu v pripadu DDP*/
	interface GPohZakladDto {
		/**ixp_ddp_pripad*/
		ixp_ddp_pripad?: string|null;
		/**ixp_spis*/
		ixp_spis?: string|null;
	}
	const enum GPohZakladDtoNames { ixp_ddp_pripad = "ixp_ddp_pripad", ixp_spis = "ixp_spis",}
	const enum GPohZakladDtoFragments { ixp_ddp_pripad = "*", ixp_spis = "*",}
	const enum GPohZakladDtoTypes { ixp_ddp_pripad = "string", ixp_spis = "string",}
	const enum GPohZakladDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoBmiMMB\GBmiCizAdoDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro nahlizeni Cizinci AD*/
	interface GBmiCizAdoDto {
		/**Kod adresniho mista Ruian*/
		ruianID?: string|null;
		/**ad - Identifikátor*/
		ad?: string|null;
		/**Rodne cislo*/
		rodneCislo?: string|null;
		/**Prijmeni*/
		prijmeni?: string|null;
		/**Jmeno*/
		jmeno?: string|null;
		/**Kod adresniho mista Ruian - odpoved*/
		kodAdm?: string|null;
		/**Status -  HTTP status*/
		status?: number|null;
		/**Kod chyby*/
		kod?: string|null;
		/**Popis chyby*/
		popis?: string|null;
	}
	const enum GBmiCizAdoDtoNames { ruianID = "ruianID", ad = "ad", rodneCislo = "rodneCislo", prijmeni = "prijmeni", jmeno = "jmeno", kodAdm = "kodAdm", status = "status", kod = "kod", popis = "popis",}
	const enum GBmiCizAdoDtoFragments { ruianID = "main", ad = "main", rodneCislo = "main", prijmeni = "main", jmeno = "main", kodAdm = "main", status = "main", kod = "main", popis = "main",}
	const enum GBmiCizAdoDtoTypes { ruianID = "string", ad = "string", rodneCislo = "string", prijmeni = "string", jmeno = "string", kodAdm = "string", status = "number", kod = "string", popis = "string",}
	const enum GBmiCizAdoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoBmiMMB\GBmiNahlizeniOduDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro nahlizeni ODU z BMI*/
	interface GBmiNahlizeniOduDto {
		/**Jmeno*/
		jmeno?: string|null;
		/**Prijmeni*/
		prijmeni?: string|null;
		/**Datum narozeni - YYYY-MM-DD*/
		datumNarozeni?: JsonDate|null;
		/**Adresa*/
		adresa?: string|null;
		/**Datum posledni uhrady*/
		datumPosledniUhrady?: JsonDate|null;
		/**Status odpovedi: 
		*      0: chyba zpracování
		*      1: nalezen jeden poplatník
		*      2: nalezeno více poplatníků
		*      3: nenalezen žádný poplatník
		*/
		status?: number|null;
		/**Textovy status*/
		textovyStatus?: string|null;
	}
	const enum GBmiNahlizeniOduDtoNames { jmeno = "jmeno", prijmeni = "prijmeni", datumNarozeni = "datumNarozeni", adresa = "adresa", datumPosledniUhrady = "datumPosledniUhrady", status = "status", textovyStatus = "textovyStatus",}
	const enum GBmiNahlizeniOduDtoFragments { jmeno = "main", prijmeni = "main", datumNarozeni = "main", adresa = "main", datumPosledniUhrady = "main", status = "main", textovyStatus = "main",}
	const enum GBmiNahlizeniOduDtoTypes { jmeno = "string", prijmeni = "string", datumNarozeni = "JsonDate", adresa = "string", datumPosledniUhrady = "JsonDate", status = "number", textovyStatus = "string",}
	const enum GBmiNahlizeniOduDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoBmiMMB\GBmiNemovitostTpAddoNemDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro Obyvatele s TP v budove*/
	interface GBmiNemovitostTpAddoNemDto {
		/**ID budovy*/
		budovaID?: string|null;
		/**Typ nemovitosti*/
		nemovitost?: string|null;
		/**Katastralni obdobi*/
		katastr?: string|null;
		/**Cislo jednotky*/
		cisloJednotky?: string|null;
		/**Id jednotky*/
		jednotkaId?: string|null;
		/**ID poplatnika*/
		poplAd?: string|null;
		/**Rodne cislo polatnika*/
		poplRodneCislo?: string|null;
		/**Jmeno*/
		jmeno?: string|null;
		/**Prijmeni*/
		prijmeni?: string|null;
		/**Ruian ID*/
		kodAdm?: string|null;
		/**Datum TP*/
		dutp?: JsonDate|null;
		/**ID nemovitosti*/
		adNem?: string|null;
		/**Cislo bytu*/
		cisloBytu?: string|null;
		/**ad - Identifikátor*/
		ad?: string|null;
		/**Rodne cislo*/
		rodneCislo?: string|null;
		/**Status -  HTTP status*/
		status?: number|null;
		/**Kod chyby*/
		kod?: string|null;
		/**Popis chyby*/
		popis?: string|null;
		/**Status -  HTTP status*/
		zdrojDat?: string|null;
	}
	const enum GBmiNemovitostTpAddoNemDtoNames { budovaID = "budovaID", nemovitost = "nemovitost", katastr = "katastr", cisloJednotky = "cisloJednotky", jednotkaId = "jednotkaId", poplAd = "poplAd", poplRodneCislo = "poplRodneCislo", jmeno = "jmeno", prijmeni = "prijmeni", kodAdm = "kodAdm", dutp = "dutp", adNem = "adNem", cisloBytu = "cisloBytu", ad = "ad", rodneCislo = "rodneCislo", status = "status", kod = "kod", popis = "popis", zdrojDat = "zdrojDat",}
	const enum GBmiNemovitostTpAddoNemDtoFragments { budovaID = "main", nemovitost = "main", katastr = "main", cisloJednotky = "main", jednotkaId = "main", poplAd = "main", poplRodneCislo = "main", jmeno = "main", prijmeni = "main", kodAdm = "main", dutp = "main", adNem = "main", cisloBytu = "main", ad = "main", rodneCislo = "main", status = "main", kod = "main", popis = "main", zdrojDat = "main",}
	const enum GBmiNemovitostTpAddoNemDtoTypes { budovaID = "string", nemovitost = "string", katastr = "string", cisloJednotky = "string", jednotkaId = "string", poplAd = "string", poplRodneCislo = "string", jmeno = "string", prijmeni = "string", kodAdm = "string", dutp = "JsonDate", adNem = "string", cisloBytu = "string", ad = "string", rodneCislo = "string", status = "number", kod = "string", popis = "string", zdrojDat = "string",}
	const enum GBmiNemovitostTpAddoNemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohDashboardDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro dashboard*/
	interface GPohDashboardDto {
		/**po_s_predpisem*/
		po_s_predpisem?: number|null;
		/**po_bez_predpisu*/
		po_bez_predpisu?: number|null;
		/**celkem_predpisu*/
		zaplaceno_procenta?: JsonDecimal|null;
		/**celkem_predpisu*/
		celkem_predpisu?: JsonDecimal|null;
		/**zaplaceno_predpisu*/
		zaplaceno_predpisu?: JsonDecimal|null;
		/**zbyva_predpisu*/
		zbyva_predpisu?: JsonDecimal|null;
		/**celkem_predpisu*/
		zaplaceno_procenta_letos?: JsonDecimal|null;
		/**celkem_predpisu*/
		celkem_predpisu_letos?: JsonDecimal|null;
		/**zaplaceno_predpisu*/
		zaplaceno_predpisu_letos?: JsonDecimal|null;
		/**zbyva_predpisu*/
		zbyva_predpisu_letos?: JsonDecimal|null;
		/**zaplaceno_predpisu*/
		po_v_evidenci?: JsonDecimal|null;
		/**zbyva_predpisu*/
		po_mimo_evidenci?: JsonDecimal|null;
		/**zbyva_predpisu*/
		obdobi_vyreseno?: JsonDecimal|null;
		/**zbyva_predpisu*/
		obdobi_castecne?: JsonDecimal|null;
		/**zbyva_predpisu*/
		obdobi_nereseno?: JsonDecimal|null;
		/**po_bez_rozObdobi*/
		po_bez_rozObdobi?: JsonDecimal|null;
		/**po_bez_rozObdobi*/
		obdobi_vyreseno_bezPredpisu?: JsonDecimal|null;
	}
	const enum GPohDashboardDtoNames { po_s_predpisem = "po_s_predpisem", po_bez_predpisu = "po_bez_predpisu", zaplaceno_procenta = "zaplaceno_procenta", celkem_predpisu = "celkem_predpisu", zaplaceno_predpisu = "zaplaceno_predpisu", zbyva_predpisu = "zbyva_predpisu", zaplaceno_procenta_letos = "zaplaceno_procenta_letos", celkem_predpisu_letos = "celkem_predpisu_letos", zaplaceno_predpisu_letos = "zaplaceno_predpisu_letos", zbyva_predpisu_letos = "zbyva_predpisu_letos", po_v_evidenci = "po_v_evidenci", po_mimo_evidenci = "po_mimo_evidenci", obdobi_vyreseno = "obdobi_vyreseno", obdobi_castecne = "obdobi_castecne", obdobi_nereseno = "obdobi_nereseno", po_bez_rozObdobi = "po_bez_rozObdobi", obdobi_vyreseno_bezPredpisu = "obdobi_vyreseno_bezPredpisu",}
	const enum GPohDashboardDtoFragments { po_s_predpisem = "main", po_bez_predpisu = "main", zaplaceno_procenta = "main", celkem_predpisu = "main", zaplaceno_predpisu = "main", zbyva_predpisu = "main", zaplaceno_procenta_letos = "main", celkem_predpisu_letos = "main", zaplaceno_predpisu_letos = "main", zbyva_predpisu_letos = "main", po_v_evidenci = "main", po_mimo_evidenci = "main", obdobi_vyreseno = "main", obdobi_castecne = "main", obdobi_nereseno = "main", po_bez_rozObdobi = "main", obdobi_vyreseno_bezPredpisu = "main",}
	const enum GPohDashboardDtoTypes { po_s_predpisem = "number", po_bez_predpisu = "number", zaplaceno_procenta = "JsonDecimal", celkem_predpisu = "JsonDecimal", zaplaceno_predpisu = "JsonDecimal", zbyva_predpisu = "JsonDecimal", zaplaceno_procenta_letos = "JsonDecimal", celkem_predpisu_letos = "JsonDecimal", zaplaceno_predpisu_letos = "JsonDecimal", zbyva_predpisu_letos = "JsonDecimal", po_v_evidenci = "JsonDecimal", po_mimo_evidenci = "JsonDecimal", obdobi_vyreseno = "JsonDecimal", obdobi_castecne = "JsonDecimal", obdobi_nereseno = "JsonDecimal", po_bez_rozObdobi = "JsonDecimal", obdobi_vyreseno_bezPredpisu = "JsonDecimal",}
	const enum GPohDashboardDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohFormularRowDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro pohform*/
	interface GPohFormularRowDto {
		/**PORADI.*/
		poradi?: JsonDecimal|null;
		/**Identifikátor Typ.*/
		ixs_typ?: string|null;
		/**Identifikátor FORM.*/
		ixp_frm?: string|null;
		/**Identifikátor DDP.*/
		ixp_ddp?: string|null;
		/**Identifikátor spisu.*/
		ixp_spis?: string|null;
		/**Identifikátor ESU.*/
		ixs_esu?: string|null;
		/**Název ESU.*/
		nazev_esu?: string|null;
		/**Název PO, pouziva se u zadosti u zastup.*/
		nazev_po?: string|null;
		/**Identifikátor esu po.*/
		ixs_esu_po?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**Název formuláře.*/
		nazev_form?: string|null;
		/**GUID.*/
		guid?: string|null;
		/**Stav ZPRACOVANI.*/
		stav_zprac?: JsonDecimal|null;
		/**Datum VYPLNENI.*/
		dat_vypl?: JsonDate|null;
		/**Datum ZPRACOVANI.*/
		dat_zprac?: JsonDate|null;
		/**Datum pocatku PP.*/
		dat_pocpp?: JsonDate|null;
		/**ID BUDOVY.*/
		id_budovy?: string|null;
		/**ID JEDNOTKY.*/
		id_jednotky?: string|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		platnost_kodu?: number|null;
		ico?: string|null;
		gor_err?: number|null;
		txt_err?: string|null;
		/**ixp dokumentu.*/
		ixp_zasilka?: string|null;
	}
	const enum GPohFormularRowDtoNames { poradi = "poradi", ixs_typ = "ixs_typ", ixp_frm = "ixp_frm", ixp_ddp = "ixp_ddp", ixp_spis = "ixp_spis", ixs_esu = "ixs_esu", nazev_esu = "nazev_esu", nazev_po = "nazev_po", ixs_esu_po = "ixs_esu_po", poznamka = "poznamka", nazev_form = "nazev_form", guid = "guid", stav_zprac = "stav_zprac", dat_vypl = "dat_vypl", dat_zprac = "dat_zprac", dat_pocpp = "dat_pocpp", id_budovy = "id_budovy", id_jednotky = "id_jednotky", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", platnost_kodu = "platnost_kodu", ico = "ico", gor_err = "gor_err", txt_err = "txt_err", ixp_zasilka = "ixp_zasilka",}
	const enum GPohFormularRowDtoFragments { poradi = "main", ixs_typ = "main", ixp_frm = "main", ixp_ddp = "main", ixp_spis = "main", ixs_esu = "main", nazev_esu = "main", nazev_po = "main", ixs_esu_po = "main", poznamka = "main", nazev_form = "main", guid = "main", stav_zprac = "main", dat_vypl = "main", dat_zprac = "main", dat_pocpp = "main", id_budovy = "main", id_jednotky = "main", dat_zmena = "main", zmenu_prov = "main", platnost_kodu = "*", ico = "*", gor_err = "*", txt_err = "*", ixp_zasilka = "*",}
	const enum GPohFormularRowDtoTypes { poradi = "JsonDecimal", ixs_typ = "string", ixp_frm = "string", ixp_ddp = "string", ixp_spis = "string", ixs_esu = "string", nazev_esu = "string", nazev_po = "string", ixs_esu_po = "string", poznamka = "string", nazev_form = "string", guid = "string", stav_zprac = "JsonDecimal", dat_vypl = "JsonDate", dat_zprac = "JsonDate", dat_pocpp = "JsonDate", id_budovy = "string", id_jednotky = "string", dat_zmena = "JsonDate", zmenu_prov = "string", platnost_kodu = "number", ico = "string", gor_err = "number", txt_err = "string", ixp_zasilka = "string",}
	const enum GPohFormularRowDtoTypeLengths { ixs_typ = 12, ixp_frm = 12, ixp_ddp = 12, ixp_spis = 12, ixs_esu = 12, nazev_esu = 255, nazev_po = 255, ixs_esu_po = 12, poznamka = 255, nazev_form = 255, guid = 36, id_budovy = 12, id_jednotky = 12, zmenu_prov = 12, ixp_zasilka = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohHistorieVypoctuDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro PohOsobaJednotka*/
	interface GPohHistorieVypoctuDto {
		/**klic*/
		klic?: string|null;
		/**IXP*/
		ixp?: string|null;
		/**RADEK UHR*/
		radek_uhr?: number|null;
		/**RADEK PUV*/
		radek_puv?: number|null;
		/**PORADI*/
		poradi?: number|null;
		/**C VYP*/
		c_vyp?: JsonDecimal|null;
		/**měna*/
		mena?: number|null;
		/**C VYP měna*/
		c_vyp_mena?: JsonDecimal|null;
		/**poznámka*/
		poznamka?: string|null;
		/**AKTIVITA*/
		aktivita?: JsonDecimal|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**identifikátor změnu provedl txt*/
		zmenu_prov_txt?: string|null;
	}
	const enum GPohHistorieVypoctuDtoNames { klic = "klic", ixp = "ixp", radek_uhr = "radek_uhr", radek_puv = "radek_puv", poradi = "poradi", c_vyp = "c_vyp", mena = "mena", c_vyp_mena = "c_vyp_mena", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt",}
	const enum GPohHistorieVypoctuDtoFragments { klic = "main", ixp = "main", radek_uhr = "main", radek_puv = "main", poradi = "main", c_vyp = "main", mena = "main", c_vyp_mena = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", zmenu_prov_txt = "*",}
	const enum GPohHistorieVypoctuDtoTypes { klic = "string", ixp = "string", radek_uhr = "number", radek_puv = "number", poradi = "number", c_vyp = "JsonDecimal", mena = "number", c_vyp_mena = "JsonDecimal", poznamka = "string", aktivita = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string",}
	const enum GPohHistorieVypoctuDtoTypeLengths { klic = 120, ixp = 12, poznamka = 50, zmenu_prov = 12, zmenu_prov_txt = 120,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohOsobaJednotkaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro PohOsobaJednotka*/
	interface GPohOsobaJednotkaDto {
		/**ID JEDNOTKY*/
		id_jednotky?: string|null;
		/**IXS OSO*/
		ixs_oso?: string|null;
		/**datum OD*/
		dat_od?: JsonDate|null;
		/**datum DO*/
		dat_do?: JsonDate|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		jmeno?: string|null;
		prijmeni?: string|null;
		datumNarozeni?: JsonDate|null;
		adresa_txt?: string|null;
		vlastnik_txt?: string|null;
	}
	const enum GPohOsobaJednotkaDtoNames { id_jednotky = "id_jednotky", ixs_oso = "ixs_oso", dat_od = "dat_od", dat_do = "dat_do", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", aktivita = "aktivita", jmeno = "jmeno", prijmeni = "prijmeni", datumNarozeni = "datumNarozeni", adresa_txt = "adresa_txt", vlastnik_txt = "vlastnik_txt",}
	const enum GPohOsobaJednotkaDtoFragments { id_jednotky = "main", ixs_oso = "main", dat_od = "main", dat_do = "main", dat_zmena = "main", zmenu_prov = "main", aktivita = "*", jmeno = "*", prijmeni = "*", datumNarozeni = "*", adresa_txt = "*", vlastnik_txt = "*",}
	const enum GPohOsobaJednotkaDtoTypes { id_jednotky = "string", ixs_oso = "string", dat_od = "JsonDate", dat_do = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", aktivita = "number", jmeno = "string", prijmeni = "string", datumNarozeni = "JsonDate", adresa_txt = "string", vlastnik_txt = "string",}
	const enum GPohOsobaJednotkaDtoTypeLengths { id_jednotky = 30, ixs_oso = 12, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohPlatbaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	interface GPohPlatbaDto {
		c?: JsonDecimal|null;
		ktg_upo?: number|null;
		s_pol_txt?: string|null;
		pokl_doklad?: string|null;
		pokl_kniha?: string|null;
		kategorie?: string|null;
		sk_ci?: string|null;
		bu_ci?: string|null;
		sk_vl?: string|null;
		bu_vl?: string|null;
		ixp_pok?: string|null;
		ixp?: string|null;
		s_pol?: number|null;
		cislo_par?: number|null;
		radek_pol?: number|null;
		nazev?: string|null;
		vs?: string|null;
		ss?: string|null;
		dat_zap?: JsonDate|null;
		dat_uhr?: JsonDate|null;
		cis_pid?: number|null;
		hist?: number|null;
		ixs_esu?: string|null;
		poradi?: number|null;
	}
	const enum GPohPlatbaDtoNames { c = "c", ktg_upo = "ktg_upo", s_pol_txt = "s_pol_txt", pokl_doklad = "pokl_doklad", pokl_kniha = "pokl_kniha", kategorie = "kategorie", sk_ci = "sk_ci", bu_ci = "bu_ci", sk_vl = "sk_vl", bu_vl = "bu_vl", ixp_pok = "ixp_pok", ixp = "ixp", s_pol = "s_pol", cislo_par = "cislo_par", radek_pol = "radek_pol", nazev = "nazev", vs = "vs", ss = "ss", dat_zap = "dat_zap", dat_uhr = "dat_uhr", cis_pid = "cis_pid", hist = "hist", ixs_esu = "ixs_esu", poradi = "poradi",}
	const enum GPohPlatbaDtoFragments { c = "*", ktg_upo = "*", s_pol_txt = "*", pokl_doklad = "*", pokl_kniha = "*", kategorie = "*", sk_ci = "*", bu_ci = "*", sk_vl = "*", bu_vl = "*", ixp_pok = "*", ixp = "*", s_pol = "*", cislo_par = "*", radek_pol = "*", nazev = "*", vs = "*", ss = "*", dat_zap = "*", dat_uhr = "*", cis_pid = "*", hist = "*", ixs_esu = "*", poradi = "*",}
	const enum GPohPlatbaDtoTypes { c = "JsonDecimal", ktg_upo = "number", s_pol_txt = "string", pokl_doklad = "string", pokl_kniha = "string", kategorie = "string", sk_ci = "string", bu_ci = "string", sk_vl = "string", bu_vl = "string", ixp_pok = "string", ixp = "string", s_pol = "number", cislo_par = "number", radek_pol = "number", nazev = "string", vs = "string", ss = "string", dat_zap = "JsonDate", dat_uhr = "JsonDate", cis_pid = "number", hist = "number", ixs_esu = "string", poradi = "number",}
	const enum GPohPlatbaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohPredpisDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro predpisy z DDP*/
	interface GPohPredpisDto extends Gordic.Ddp.Interface.LK.Isl.GPredpisDto {
		/**STAV: 1 - bude zalozen, 2 - bude zvysena castka, 3 bude snizena castka*/
		stav?: number|null;
		c_puvodni?: JsonDecimal|null;
		stav_txt?: string|null;
	}
	const enum GPohPredpisDtoNames { stav = "stav", c_puvodni = "c_puvodni", stav_txt = "stav_txt", ixp = "ixp", radek_uhr = "radek_uhr", c = "c", dat_vzniku = "dat_vzniku", dat_spl = "dat_spl", s_uhrp = "s_uhrp", ac = "ac", ktg_upo = "ktg_upo", ss = "ss", c_par = "c_par", poznamka = "poznamka", popis = "popis", bu_vl = "bu_vl", sk_vl = "sk_vl", id_epz = "id_epz", dat_zdan = "dat_zdan", rok_dph = "rok_dph", mesic_dph = "mesic_dph", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_z3 = "c_z3", c_d3 = "c_d3", c_z4 = "c_z4", c_d4 = "c_d4", c_zao = "c_zao", dat_vyst_dd = "dat_vyst_dd", stav_pr = "stav_pr", vs = "vs", stav_uz_pr = "stav_uz_pr", subradek = "subradek", radek_upo = "radek_upo", priz_pen_aut = "priz_pen_aut", radek_puv = "radek_puv", priz_vym = "priz_vym", priz_tisk_dd = "priz_tisk_dd", hist = "hist", zp = "zp", pri_uhr = "pri_uhr", rozhodnuti = "rozhodnuti", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixs_ste = "ixs_ste", priz_pzp = "priz_pzp", mena = "mena", c_mena = "c_mena", kurz = "kurz", dat_zmena = "dat_zmena", priz_nepar = "priz_nepar", cislo_dd = "cislo_dd", priz_opr = "priz_opr", priz_ozp = "priz_ozp", ac_ixe = "ac_ixe", exist_roz_pred = "exist_roz_pred", ucetni_pohyb = "ucetni_pohyb", stav_fin_kon = "stav_fin_kon", stav_lhuty = "stav_lhuty", ks = "ks", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", hra_pop = "hra_pop", zp_z = "zp_z", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", sds = "sds", ixp_prev = "ixp_prev", lic = "lic", eko_akt = "eko_akt", ktg_typ = "ktg_typ", typ_ag = "typ_ag", rok = "rok", c_par_mena = "c_par_mena", mena_pop = "mena_pop", mena_poz = "mena_poz", upl = "upl", exp_pla = "exp_pla", priz_rez_pri = "priz_rez_pri", priz_pred_rcdn = "priz_pred_rcdn", por_cislo_int = "por_cislo_int", ixs_zmp_prik = "ixs_zmp_prik", alg_par = "alg_par", uus = "uus", u_zp = "u_zp", c_mf = "c_mf", oka_pla = "oka_pla", ico = "ico", ucs = "ucs", arw = "arw", penKalk = "penKalk", pn_dat_od = "pn_dat_od", pn_dat_do = "pn_dat_do", pn_pocetDni = "pn_pocetDni", pn_castkaZaDen = "pn_castkaZaDen", pn_castka = "pn_castka", pn_proc = "pn_proc", pn_prom = "pn_prom", pn_c_pred = "pn_c_pred", pn_predpis = "pn_predpis", ipole = "ipole", ktg_upo_pre = "ktg_upo_pre", ixp_vra = "ixp_vra", por_cislo_phl = "por_cislo_phl", s_uhrp_txt = "s_uhrp_txt", stav_por = "stav_por", typ_esu = "typ_esu", ixs_fun_akt = "ixs_fun_akt", stav_fk = "stav_fk", ixs_typ = "ixs_typ", editace = "editace", Security = "Security",}
	const enum GPohPredpisDtoFragments { stav = "*", c_puvodni = "*", stav_txt = "*", ixp = "*", radek_uhr = "*", c = "Default", dat_vzniku = "Default", dat_spl = "Default", s_uhrp = "Extended", ac = "Extended", ktg_upo = "Extended", ss = "Extended", c_par = "Extended", poznamka = "Extended", popis = "Extended", bu_vl = "Extended", sk_vl = "Extended", id_epz = "Extended", dat_zdan = "Extended", rok_dph = "Extended", mesic_dph = "Extended", c_z0 = "Extended", c_d0 = "Extended", c_z1 = "Extended", c_d1 = "Extended", c_z2 = "Default", c_d2 = "Default", c_z3 = "Extended", c_d3 = "Extended", c_z4 = "Extended", c_d4 = "Extended", c_zao = "Default", dat_vyst_dd = "Extended", stav_pr = "Extended", vs = "Extended", stav_uz_pr = "Extended", subradek = "Default", radek_upo = "Extended", priz_pen_aut = "Extended", radek_puv = "Extended", priz_vym = "Extended", priz_tisk_dd = "Extended", hist = "Default", zp = "Extended", pri_uhr = "Extended", rozhodnuti = "Extended", ixp_sml = "Extended", rok_sml = "Extended", cislo_sml = "Extended", ixs_ste = "Extended", priz_pzp = "Extended", mena = "Default", c_mena = "Default", kurz = "Extended", dat_zmena = "Extended", priz_nepar = "Extended", cislo_dd = "Extended", priz_opr = "Default", priz_ozp = "Default", ac_ixe = "Default", exist_roz_pred = "Default", ucetni_pohyb = "Default", stav_fin_kon = "Default", stav_lhuty = "Default", ks = "*", bu_ci = "*", sk_ci = "*", ixs_esu = "*", hra_pop = "*", zp_z = "*", pla_tit = "*", ucel_uhr = "*", dev_pov = "*", sds = "*", ixp_prev = "*", lic = "*", eko_akt = "*", ktg_typ = "*", typ_ag = "*", rok = "*", c_par_mena = "*", mena_pop = "*", mena_poz = "*", upl = "*", exp_pla = "*", priz_rez_pri = "*", priz_pred_rcdn = "*", por_cislo_int = "*", ixs_zmp_prik = "*", alg_par = "*", uus = "*", u_zp = "*", c_mf = "*", oka_pla = "*", ico = "*", ucs = "*", arw = "*", penKalk = "PenKal", pn_dat_od = "PenKal", pn_dat_do = "PenKal", pn_pocetDni = "PenKal", pn_castkaZaDen = "PenKal", pn_castka = "PenKal", pn_proc = "PenKal", pn_prom = "PenKal", pn_c_pred = "PenKal", pn_predpis = "PenKal", ipole = "Edit", ktg_upo_pre = "Vratka", ixp_vra = "Vratka", por_cislo_phl = "Vratka", s_uhrp_txt = "Vratka", stav_por = "Vratka", typ_esu = "Vratka", ixs_fun_akt = "Vratka", stav_fk = "WFL_FK", ixs_typ = "Vratka", editace = "editace", Security = "*",}
	const enum GPohPredpisDtoTypes { stav = "number", c_puvodni = "JsonDecimal", stav_txt = "string", ixp = "string", radek_uhr = "number", c = "JsonDecimal", dat_vzniku = "JsonDate", dat_spl = "JsonDate", s_uhrp = "number", ac = "string", ktg_upo = "number", ss = "string", c_par = "JsonDecimal", poznamka = "string", popis = "string", bu_vl = "string", sk_vl = "string", id_epz = "string", dat_zdan = "JsonDate", rok_dph = "number", mesic_dph = "number", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", c_zao = "JsonDecimal", dat_vyst_dd = "JsonDate", stav_pr = "number", vs = "string", stav_uz_pr = "number", subradek = "number", radek_upo = "number", priz_pen_aut = "number", radek_puv = "number", priz_vym = "number", priz_tisk_dd = "number", hist = "number", zp = "number", pri_uhr = "number", rozhodnuti = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", ixs_ste = "string", priz_pzp = "number", mena = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", dat_zmena = "JsonDate", priz_nepar = "number", cislo_dd = "string", priz_opr = "number", priz_ozp = "number", ac_ixe = "string", exist_roz_pred = "number", ucetni_pohyb = "number", stav_fin_kon = "number", stav_lhuty = "number", ks = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", hra_pop = "number", zp_z = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", sds = "string", ixp_prev = "string", lic = "string", eko_akt = "number", ktg_typ = "number", typ_ag = "number", rok = "number", c_par_mena = "JsonDecimal", mena_pop = "JsonDecimal", mena_poz = "JsonDecimal", upl = "number", exp_pla = "number", priz_rez_pri = "number", priz_pred_rcdn = "number", por_cislo_int = "number", ixs_zmp_prik = "string", alg_par = "number", uus = "string", u_zp = "number", c_mf = "JsonDecimal", oka_pla = "number", ico = "string", ucs = "string", arw = "number", penKalk = "boolean", pn_dat_od = "JsonDate", pn_dat_do = "JsonDate", pn_pocetDni = "number", pn_castkaZaDen = "JsonDecimal", pn_castka = "JsonDecimal", pn_proc = "JsonDecimal", pn_prom = "JsonDecimal", pn_c_pred = "JsonDecimal", pn_predpis = "number", ipole = "string", ktg_upo_pre = "number", ixp_vra = "string", por_cislo_phl = "number", s_uhrp_txt = "string", stav_por = "number", typ_esu = "number", ixs_fun_akt = "string", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", ixs_typ = "string", editace = "boolean", Security = "Gordic.Ddp.Interface.LK.Isl.Common.GDdpSecurity",}
	const enum GPohPredpisDtoTypeLengths { ixp = 12, ac = 20, ss = 12, poznamka = 254, popis = 254, bu_vl = 34, sk_vl = 11, id_epz = 20, vs = 12, ixp_sml = 12, ixs_ste = 12, cislo_dd = 60, ac_ixe = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohPredpisDtoExtended.d.ts 

declare namespace Gordic.Poh.Interface {
	interface GPohPredpisDtoExtended extends Gordic.Ddp.Interface.LK.Isl.GPredpisDto {
		zp_vyuz_txt?: string|null;
		adresa_txt?: string|null;
		cdom?: number|null;
		cislo_jednotky?: JsonDecimal|null;
		c_predp?: JsonDecimal|null;
		typ_nem_txt?: string|null;
		klic?: string|null;
	}
	const enum GPohPredpisDtoExtendedNames { zp_vyuz_txt = "zp_vyuz_txt", adresa_txt = "adresa_txt", cdom = "cdom", cislo_jednotky = "cislo_jednotky", c_predp = "c_predp", typ_nem_txt = "typ_nem_txt", klic = "klic", ixp = "ixp", radek_uhr = "radek_uhr", c = "c", dat_vzniku = "dat_vzniku", dat_spl = "dat_spl", s_uhrp = "s_uhrp", ac = "ac", ktg_upo = "ktg_upo", ss = "ss", c_par = "c_par", poznamka = "poznamka", popis = "popis", bu_vl = "bu_vl", sk_vl = "sk_vl", id_epz = "id_epz", dat_zdan = "dat_zdan", rok_dph = "rok_dph", mesic_dph = "mesic_dph", c_z0 = "c_z0", c_d0 = "c_d0", c_z1 = "c_z1", c_d1 = "c_d1", c_z2 = "c_z2", c_d2 = "c_d2", c_z3 = "c_z3", c_d3 = "c_d3", c_z4 = "c_z4", c_d4 = "c_d4", c_zao = "c_zao", dat_vyst_dd = "dat_vyst_dd", stav_pr = "stav_pr", vs = "vs", stav_uz_pr = "stav_uz_pr", subradek = "subradek", radek_upo = "radek_upo", priz_pen_aut = "priz_pen_aut", radek_puv = "radek_puv", priz_vym = "priz_vym", priz_tisk_dd = "priz_tisk_dd", hist = "hist", zp = "zp", pri_uhr = "pri_uhr", rozhodnuti = "rozhodnuti", ixp_sml = "ixp_sml", rok_sml = "rok_sml", cislo_sml = "cislo_sml", ixs_ste = "ixs_ste", priz_pzp = "priz_pzp", mena = "mena", c_mena = "c_mena", kurz = "kurz", dat_zmena = "dat_zmena", priz_nepar = "priz_nepar", cislo_dd = "cislo_dd", priz_opr = "priz_opr", priz_ozp = "priz_ozp", ac_ixe = "ac_ixe", exist_roz_pred = "exist_roz_pred", ucetni_pohyb = "ucetni_pohyb", stav_fin_kon = "stav_fin_kon", stav_lhuty = "stav_lhuty", ks = "ks", bu_ci = "bu_ci", sk_ci = "sk_ci", ixs_esu = "ixs_esu", hra_pop = "hra_pop", zp_z = "zp_z", pla_tit = "pla_tit", ucel_uhr = "ucel_uhr", dev_pov = "dev_pov", sds = "sds", ixp_prev = "ixp_prev", lic = "lic", eko_akt = "eko_akt", ktg_typ = "ktg_typ", typ_ag = "typ_ag", rok = "rok", c_par_mena = "c_par_mena", mena_pop = "mena_pop", mena_poz = "mena_poz", upl = "upl", exp_pla = "exp_pla", priz_rez_pri = "priz_rez_pri", priz_pred_rcdn = "priz_pred_rcdn", por_cislo_int = "por_cislo_int", ixs_zmp_prik = "ixs_zmp_prik", alg_par = "alg_par", uus = "uus", u_zp = "u_zp", c_mf = "c_mf", oka_pla = "oka_pla", ico = "ico", ucs = "ucs", arw = "arw", penKalk = "penKalk", pn_dat_od = "pn_dat_od", pn_dat_do = "pn_dat_do", pn_pocetDni = "pn_pocetDni", pn_castkaZaDen = "pn_castkaZaDen", pn_castka = "pn_castka", pn_proc = "pn_proc", pn_prom = "pn_prom", pn_c_pred = "pn_c_pred", pn_predpis = "pn_predpis", ipole = "ipole", ktg_upo_pre = "ktg_upo_pre", ixp_vra = "ixp_vra", por_cislo_phl = "por_cislo_phl", s_uhrp_txt = "s_uhrp_txt", stav_por = "stav_por", typ_esu = "typ_esu", ixs_fun_akt = "ixs_fun_akt", stav_fk = "stav_fk", ixs_typ = "ixs_typ", editace = "editace", Security = "Security",}
	const enum GPohPredpisDtoExtendedFragments { zp_vyuz_txt = "*", adresa_txt = "*", cdom = "*", cislo_jednotky = "*", c_predp = "*", typ_nem_txt = "*", klic = "*", ixp = "*", radek_uhr = "*", c = "Default", dat_vzniku = "Default", dat_spl = "Default", s_uhrp = "Extended", ac = "Extended", ktg_upo = "Extended", ss = "Extended", c_par = "Extended", poznamka = "Extended", popis = "Extended", bu_vl = "Extended", sk_vl = "Extended", id_epz = "Extended", dat_zdan = "Extended", rok_dph = "Extended", mesic_dph = "Extended", c_z0 = "Extended", c_d0 = "Extended", c_z1 = "Extended", c_d1 = "Extended", c_z2 = "Default", c_d2 = "Default", c_z3 = "Extended", c_d3 = "Extended", c_z4 = "Extended", c_d4 = "Extended", c_zao = "Default", dat_vyst_dd = "Extended", stav_pr = "Extended", vs = "Extended", stav_uz_pr = "Extended", subradek = "Default", radek_upo = "Extended", priz_pen_aut = "Extended", radek_puv = "Extended", priz_vym = "Extended", priz_tisk_dd = "Extended", hist = "Default", zp = "Extended", pri_uhr = "Extended", rozhodnuti = "Extended", ixp_sml = "Extended", rok_sml = "Extended", cislo_sml = "Extended", ixs_ste = "Extended", priz_pzp = "Extended", mena = "Default", c_mena = "Default", kurz = "Extended", dat_zmena = "Extended", priz_nepar = "Extended", cislo_dd = "Extended", priz_opr = "Default", priz_ozp = "Default", ac_ixe = "Default", exist_roz_pred = "Default", ucetni_pohyb = "Default", stav_fin_kon = "Default", stav_lhuty = "Default", ks = "*", bu_ci = "*", sk_ci = "*", ixs_esu = "*", hra_pop = "*", zp_z = "*", pla_tit = "*", ucel_uhr = "*", dev_pov = "*", sds = "*", ixp_prev = "*", lic = "*", eko_akt = "*", ktg_typ = "*", typ_ag = "*", rok = "*", c_par_mena = "*", mena_pop = "*", mena_poz = "*", upl = "*", exp_pla = "*", priz_rez_pri = "*", priz_pred_rcdn = "*", por_cislo_int = "*", ixs_zmp_prik = "*", alg_par = "*", uus = "*", u_zp = "*", c_mf = "*", oka_pla = "*", ico = "*", ucs = "*", arw = "*", penKalk = "PenKal", pn_dat_od = "PenKal", pn_dat_do = "PenKal", pn_pocetDni = "PenKal", pn_castkaZaDen = "PenKal", pn_castka = "PenKal", pn_proc = "PenKal", pn_prom = "PenKal", pn_c_pred = "PenKal", pn_predpis = "PenKal", ipole = "Edit", ktg_upo_pre = "Vratka", ixp_vra = "Vratka", por_cislo_phl = "Vratka", s_uhrp_txt = "Vratka", stav_por = "Vratka", typ_esu = "Vratka", ixs_fun_akt = "Vratka", stav_fk = "WFL_FK", ixs_typ = "Vratka", editace = "editace", Security = "*",}
	const enum GPohPredpisDtoExtendedTypes { zp_vyuz_txt = "string", adresa_txt = "string", cdom = "number", cislo_jednotky = "JsonDecimal", c_predp = "JsonDecimal", typ_nem_txt = "string", klic = "string", ixp = "string", radek_uhr = "number", c = "JsonDecimal", dat_vzniku = "JsonDate", dat_spl = "JsonDate", s_uhrp = "number", ac = "string", ktg_upo = "number", ss = "string", c_par = "JsonDecimal", poznamka = "string", popis = "string", bu_vl = "string", sk_vl = "string", id_epz = "string", dat_zdan = "JsonDate", rok_dph = "number", mesic_dph = "number", c_z0 = "JsonDecimal", c_d0 = "JsonDecimal", c_z1 = "JsonDecimal", c_d1 = "JsonDecimal", c_z2 = "JsonDecimal", c_d2 = "JsonDecimal", c_z3 = "JsonDecimal", c_d3 = "JsonDecimal", c_z4 = "JsonDecimal", c_d4 = "JsonDecimal", c_zao = "JsonDecimal", dat_vyst_dd = "JsonDate", stav_pr = "number", vs = "string", stav_uz_pr = "number", subradek = "number", radek_upo = "number", priz_pen_aut = "number", radek_puv = "number", priz_vym = "number", priz_tisk_dd = "number", hist = "number", zp = "number", pri_uhr = "number", rozhodnuti = "number", ixp_sml = "string", rok_sml = "number", cislo_sml = "number", ixs_ste = "string", priz_pzp = "number", mena = "number", c_mena = "JsonDecimal", kurz = "JsonDecimal", dat_zmena = "JsonDate", priz_nepar = "number", cislo_dd = "string", priz_opr = "number", priz_ozp = "number", ac_ixe = "string", exist_roz_pred = "number", ucetni_pohyb = "number", stav_fin_kon = "number", stav_lhuty = "number", ks = "string", bu_ci = "string", sk_ci = "string", ixs_esu = "string", hra_pop = "number", zp_z = "number", pla_tit = "string", ucel_uhr = "string", dev_pov = "string", sds = "string", ixp_prev = "string", lic = "string", eko_akt = "number", ktg_typ = "number", typ_ag = "number", rok = "number", c_par_mena = "JsonDecimal", mena_pop = "JsonDecimal", mena_poz = "JsonDecimal", upl = "number", exp_pla = "number", priz_rez_pri = "number", priz_pred_rcdn = "number", por_cislo_int = "number", ixs_zmp_prik = "string", alg_par = "number", uus = "string", u_zp = "number", c_mf = "JsonDecimal", oka_pla = "number", ico = "string", ucs = "string", arw = "number", penKalk = "boolean", pn_dat_od = "JsonDate", pn_dat_do = "JsonDate", pn_pocetDni = "number", pn_castkaZaDen = "JsonDecimal", pn_castka = "JsonDecimal", pn_proc = "JsonDecimal", pn_prom = "JsonDecimal", pn_c_pred = "JsonDecimal", pn_predpis = "number", ipole = "string", ktg_upo_pre = "number", ixp_vra = "string", por_cislo_phl = "number", s_uhrp_txt = "string", stav_por = "number", typ_esu = "number", ixs_fun_akt = "string", stav_fk = "Gordic.Wfl.Interface.GWflvdfkDto", ixs_typ = "string", editace = "boolean", Security = "Gordic.Ddp.Interface.LK.Isl.Common.GDdpSecurity",}
	const enum GPohPredpisDtoExtendedTypeLengths { ixp = 12, ac = 20, ss = 12, poznamka = 254, popis = 254, bu_vl = 34, sk_vl = 11, id_epz = 20, vs = 12, ixp_sml = 12, ixs_ste = 12, cislo_dd = 60, ac_ixe = 20,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohRenRapDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro data z REN v RAP*/
	interface GPohRenRapDto {
		/**budjed 0=budova 1=byt*/
		budjed?: number|null;
		/**ico_num*/
		ico_num?: number|null;
		/**nazev_osu*/
		nazev_osu?: string|null;
		/**id_jednotky*/
		id_jednotky?: string|null;
		/**typ_nem_txt nemszvb / nemszvj*/
		typ_nem_txt?: string|null;
		/**id_budovy*/
		id_budovy?: string|null;
		/**id_vlastnictvi*/
		id_vlastnictvi?: string|null;
		/**id_opr_subj*/
		id_opr_subj?: string|null;
		/**cislo_jednotky*/
		cislo_jednotky?: number|null;
		/**cislo domovni*/
		cdom?: number|null;
		/**cast_obce_txt*/
		cast_obce_txt?: string|null;
		/**popis*/
		popis?: string|null;
		/**adr_budovy_txt*/
		adr_budovy_txt?: string|null;
		/**podil_citatel*/
		podil_citatel?: JsonDecimal|null;
		/**podil_jmenov*/
		podil_jmenov?: JsonDecimal|null;
		/**nemsvla.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**nemsvla.dat_zaniku*/
		dat_zaniku?: JsonDate|null;
		/**dat nabyti pravni moci*/
		dat_npm?: JsonDate|null;
		/**dat nabyti pravni moci nalezne na ukonceni vlast.*/
		dat_npm_zanik?: JsonDate|null;
		/**ixs_esu subjektu ddpspid.ixs_esu*/
		ixs_esu?: string|null;
		/**subjekt ddpspid.ixp*/
		ixp_ddp?: string|null;
		/**id davky REN ktera posledni resila dane vlastnictvi*/
		ixs_dav?: string|null;
		/**platnost davky ktera posledni resila dane vlastnictvi*/
		dav_dat_do?: JsonDate|null;
		/**doporučené datum ukončení do*/
		dat_do_suggest?: JsonDate|null;
		klic?: string|null;
		rok?: number|null;
		/**odkaz do bucdpep.radek_uhr = predpis ve kterem vlastnictvi lezi, pokud je NULL neni jeste napocitano*/
		radek_uhr?: number|null;
		gor_err?: number|null;
		txt_err?: string|null;
	}
	const enum GPohRenRapDtoNames { budjed = "budjed", ico_num = "ico_num", nazev_osu = "nazev_osu", id_jednotky = "id_jednotky", typ_nem_txt = "typ_nem_txt", id_budovy = "id_budovy", id_vlastnictvi = "id_vlastnictvi", id_opr_subj = "id_opr_subj", cislo_jednotky = "cislo_jednotky", cdom = "cdom", cast_obce_txt = "cast_obce_txt", popis = "popis", adr_budovy_txt = "adr_budovy_txt", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", dat_npm = "dat_npm", dat_npm_zanik = "dat_npm_zanik", ixs_esu = "ixs_esu", ixp_ddp = "ixp_ddp", ixs_dav = "ixs_dav", dav_dat_do = "dav_dat_do", dat_do_suggest = "dat_do_suggest", klic = "klic", rok = "rok", radek_uhr = "radek_uhr", gor_err = "gor_err", txt_err = "txt_err",}
	const enum GPohRenRapDtoFragments { budjed = "main", ico_num = "main", nazev_osu = "main", id_jednotky = "main", typ_nem_txt = "main", id_budovy = "main", id_vlastnictvi = "main", id_opr_subj = "main", cislo_jednotky = "main", cdom = "main", cast_obce_txt = "main", popis = "main", adr_budovy_txt = "main", podil_citatel = "main", podil_jmenov = "main", dat_vzniku = "main", dat_zaniku = "main", dat_npm = "main", dat_npm_zanik = "main", ixs_esu = "main", ixp_ddp = "main", ixs_dav = "main", dav_dat_do = "main", dat_do_suggest = "main", klic = "main", rok = "main", radek_uhr = "main", gor_err = "*", txt_err = "*",}
	const enum GPohRenRapDtoTypes { budjed = "number", ico_num = "number", nazev_osu = "string", id_jednotky = "string", typ_nem_txt = "string", id_budovy = "string", id_vlastnictvi = "string", id_opr_subj = "string", cislo_jednotky = "number", cdom = "number", cast_obce_txt = "string", popis = "string", adr_budovy_txt = "string", podil_citatel = "JsonDecimal", podil_jmenov = "JsonDecimal", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", dat_npm = "JsonDate", dat_npm_zanik = "JsonDate", ixs_esu = "string", ixp_ddp = "string", ixs_dav = "string", dav_dat_do = "JsonDate", dat_do_suggest = "JsonDate", klic = "string", rok = "number", radek_uhr = "number", gor_err = "number", txt_err = "string",}
	const enum GPohRenRapDtoTypeLengths { nazev_osu = 254, id_jednotky = 30, typ_nem_txt = 60, id_budovy = 30, id_vlastnictvi = 30, id_opr_subj = 30, cast_obce_txt = 254, popis = 254, ixs_esu = 12, ixp_ddp = 12, ixs_dav = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohSeznamIcoDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro seznam ICO ktere vlastni nejakou nemovitost a jeste neni v ur_pri XY*/
	interface GPohSeznamIcoDto {
		/**v ginsesu.ico varchar(14), ale v nemsosu ico_num integer*/
		ico?: number|null;
		nazev_osu?: string|null;
		typ_nem?: string|null;
		id_opr_subj?: string|null;
		adr_buvody?: string|null;
		ixs_esu?: string|null;
		ixp_ddp?: string|null;
		gor_err?: number|null;
		txt_err?: string|null;
	}
	const enum GPohSeznamIcoDtoNames { ico = "ico", nazev_osu = "nazev_osu", typ_nem = "typ_nem", id_opr_subj = "id_opr_subj", adr_buvody = "adr_buvody", ixs_esu = "ixs_esu", ixp_ddp = "ixp_ddp", gor_err = "gor_err", txt_err = "txt_err",}
	const enum GPohSeznamIcoDtoFragments { ico = "*", nazev_osu = "*", typ_nem = "*", id_opr_subj = "*", adr_buvody = "*", ixs_esu = "*", ixp_ddp = "*", gor_err = "*", txt_err = "*",}
	const enum GPohSeznamIcoDtoTypes { ico = "number", nazev_osu = "string", typ_nem = "string", id_opr_subj = "string", adr_buvody = "string", ixs_esu = "string", ixp_ddp = "string", gor_err = "number", txt_err = "string",}
	const enum GPohSeznamIcoDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohSpolecnostPrehled.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro data POH budovy*/
	interface GPohSpolecnostPrehled {
		/**ddpspid.ixs_esu*/
		ixs_esu?: string|null;
		/**ico_num*/
		ico_num?: number|null;
		/**esu_txt*/
		esu_txt?: string|null;
		ixp?: string|null;
		/**suma predpisu pro danou spolecnost*/
		predpisy?: JsonDecimal|null;
		/**celkova castka plateb spolecnosti*/
		platby?: JsonDecimal|null;
		/**rozdil castek*/
		rozdil?: JsonDecimal|null;
	}
	const enum GPohSpolecnostPrehledNames { ixs_esu = "ixs_esu", ico_num = "ico_num", esu_txt = "esu_txt", ixp = "ixp", predpisy = "predpisy", platby = "platby", rozdil = "rozdil",}
	const enum GPohSpolecnostPrehledFragments { ixs_esu = "main", ico_num = "main", esu_txt = "main", ixp = "main", predpisy = "*", platby = "*", rozdil = "*",}
	const enum GPohSpolecnostPrehledTypes { ixs_esu = "string", ico_num = "number", esu_txt = "string", ixp = "string", predpisy = "JsonDecimal", platby = "JsonDecimal", rozdil = "JsonDecimal",}
	const enum GPohSpolecnostPrehledTypeLengths { ixs_esu = 12, esu_txt = 254, ixp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohVlastnictviBudovaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro data POH budovy*/
	interface GPohVlastnictviBudovaDto {
		/**klic*/
		klic?: string|null;
		/**ixp*/
		ixp?: string|null;
		/**rok*/
		rok?: number|null;
		/**id_budovy*/
		id_budovy?: string|null;
		/**id_jednotky*/
		id_jednotky?: string|null;
		/**id_vlastnictvi*/
		id_vlastnictvi?: string|null;
		/**id_telesa*/
		id_telesa?: string|null;
		/**ico_num*/
		ico_num?: number|null;
		/**id_telesa*/
		ddp_vs?: string|null;
		/**typ_nem 0-budova 1-jednotka*/
		typ_nem?: number|null;
		/**poc_mes_vla*/
		poc_mes_vla?: number|null;
		/**poc_mes_pla*/
		poc_mes_pla?: number|null;
		/**pp_mes_od*/
		pp_mes_od?: number|null;
		/**pp_mes_do*/
		pp_mes_do?: number|null;
		/**c_predp*/
		c_predp?: JsonDecimal|null;
		/**m_osv*/
		m_osv?: number|null;
		/**ddpspid.ixs_esu*/
		ixs_esu?: string|null;
		/**id_telesa*/
		adresa_txt?: string|null;
		/**cislo_jednotky*/
		cislo_jednotky?: JsonDecimal|null;
		/**cislo domovni*/
		cdom?: number|null;
		/**cast_obce_txt*/
		cast_obce_txt?: string|null;
		/**podil_citatel*/
		podil_citatel?: JsonDecimal|null;
		/**podil_jmenov*/
		podil_jmenov?: JsonDecimal|null;
		/**nemsvla.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**pohvbud.dat_zaniku*/
		dat_zaniku?: JsonDate|null;
		/**pohvbud.dat_zaniku_zapis*/
		dat_zaniku_zapis?: JsonDate|null;
		/**dat nabyti pravni moci*/
		dat_npm?: JsonDate|null;
		/**poznamka*/
		poznamka?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**esu_txt*/
		esu_txt?: string|null;
		/**typ budovy nebo bytu*/
		typ_nem_txt?: string|null;
		/**typ budovy nebo bytu*/
		zp_vyuz_txt?: string|null;
		/**stav_info*/
		stav_info?: number|null;
		/**odkaz do bucdpep.radek_uhr = predpis ve kterem vlastnictvi lezi, pokud je NULL neni jeste napocitano*/
		radek_uhr?: number|null;
		/**datum splatnosti vlastnictvi -> podle tohoto se ridi vytvareni predpisu - co dat.spl to predpis.. tzn. vsechny vlastnictvi v roce XY ktere jsou vlastneny do 30.4.vc. maji dat.spl 31.5., ostatni do konce nasl.mesice*/
		dat_spl?: JsonDate|null;
		/**castka jaka je v predpisu vazanem na toto roz. obdobi*/
		c_zapoctena_predpis?: JsonDecimal|null;
		/**m1o - leden osvobozeno*/
		m1o?: boolean|null;
		/**m2o - unor osvobozeno*/
		m2o?: boolean|null;
		/**m3o - brezen osvobozeno*/
		m3o?: boolean|null;
		/**m4o - duben osvobozeno*/
		m4o?: boolean|null;
		/**m5o - kveten osvobozeno*/
		m5o?: boolean|null;
		/**m6o - cerven osvobozeno*/
		m6o?: boolean|null;
		/**m7o - cervenec osvobozeno*/
		m7o?: boolean|null;
		/**m8o - srpen osvobozeno*/
		m8o?: boolean|null;
		/**m9o - zari osvobozeno*/
		m9o?: boolean|null;
		/**m10o - rijen osvobozeno*/
		m10o?: boolean|null;
		/**m11o - listopad osvobozeno*/
		m11o?: boolean|null;
		/**m12o - prosinec osvobozeno*/
		m12o?: boolean|null;
		/**opt_neznamo - flag neznamo*/
		opt_neznamo?: boolean|null;
		/**opt_rozpracovano - flag opt_rozpracovano*/
		opt_rozpracovano?: boolean|null;
		/**opt_vyreseno - flag opt_vyreseno*/
		opt_vyreseno?: boolean|null;
		/**opt_vyreseno - flag options*/
		options?: number|null;
		stav?: number|null;
		stav2?: number|null;
		/**priznak ze u bytu exituje manualni vazba na TP osoby v pohvosj*/
		tp_exists?: number|null;
		/**max datum do u  manualni vazby na TP osoby v pohvosj*/
		max_dat_tp?: JsonDate|null;
		/**dat_vzniku_pp_uzivatel*/
		dat_vzniku_pp_uzivatel?: JsonDate|null;
		/**dat_zaniku_pp_uzivatel*/
		dat_zaniku_pp_uzivatel?: JsonDate|null;
	}
	const enum GPohVlastnictviBudovaDtoNames { klic = "klic", ixp = "ixp", rok = "rok", id_budovy = "id_budovy", id_jednotky = "id_jednotky", id_vlastnictvi = "id_vlastnictvi", id_telesa = "id_telesa", ico_num = "ico_num", ddp_vs = "ddp_vs", typ_nem = "typ_nem", poc_mes_vla = "poc_mes_vla", poc_mes_pla = "poc_mes_pla", pp_mes_od = "pp_mes_od", pp_mes_do = "pp_mes_do", c_predp = "c_predp", m_osv = "m_osv", ixs_esu = "ixs_esu", adresa_txt = "adresa_txt", cislo_jednotky = "cislo_jednotky", cdom = "cdom", cast_obce_txt = "cast_obce_txt", podil_citatel = "podil_citatel", podil_jmenov = "podil_jmenov", dat_vzniku = "dat_vzniku", dat_zaniku = "dat_zaniku", dat_zaniku_zapis = "dat_zaniku_zapis", dat_npm = "dat_npm", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", esu_txt = "esu_txt", typ_nem_txt = "typ_nem_txt", zp_vyuz_txt = "zp_vyuz_txt", stav_info = "stav_info", radek_uhr = "radek_uhr", dat_spl = "dat_spl", c_zapoctena_predpis = "c_zapoctena_predpis", m1o = "m1o", m2o = "m2o", m3o = "m3o", m4o = "m4o", m5o = "m5o", m6o = "m6o", m7o = "m7o", m8o = "m8o", m9o = "m9o", m10o = "m10o", m11o = "m11o", m12o = "m12o", opt_neznamo = "opt_neznamo", opt_rozpracovano = "opt_rozpracovano", opt_vyreseno = "opt_vyreseno", options = "options", stav = "stav", stav2 = "stav2", tp_exists = "tp_exists", max_dat_tp = "max_dat_tp", dat_vzniku_pp_uzivatel = "dat_vzniku_pp_uzivatel", dat_zaniku_pp_uzivatel = "dat_zaniku_pp_uzivatel",}
	const enum GPohVlastnictviBudovaDtoFragments { klic = "main", ixp = "main", rok = "main", id_budovy = "main", id_jednotky = "main", id_vlastnictvi = "main", id_telesa = "main", ico_num = "main", ddp_vs = "main", typ_nem = "main", poc_mes_vla = "main", poc_mes_pla = "main", pp_mes_od = "main", pp_mes_do = "main", c_predp = "main", m_osv = "main", ixs_esu = "main", adresa_txt = "main", cislo_jednotky = "main", cdom = "main", cast_obce_txt = "main", podil_citatel = "main", podil_jmenov = "main", dat_vzniku = "main", dat_zaniku = "main", dat_zaniku_zapis = "main", dat_npm = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", esu_txt = "main", typ_nem_txt = "main", zp_vyuz_txt = "main", stav_info = "main", radek_uhr = "main", dat_spl = "main", c_zapoctena_predpis = "*", m1o = "*", m2o = "*", m3o = "*", m4o = "*", m5o = "*", m6o = "*", m7o = "*", m8o = "*", m9o = "*", m10o = "*", m11o = "*", m12o = "*", opt_neznamo = "*", opt_rozpracovano = "*", opt_vyreseno = "*", options = "*", stav = "*", stav2 = "*", tp_exists = "*", max_dat_tp = "*", dat_vzniku_pp_uzivatel = "main", dat_zaniku_pp_uzivatel = "main",}
	const enum GPohVlastnictviBudovaDtoTypes { klic = "string", ixp = "string", rok = "number", id_budovy = "string", id_jednotky = "string", id_vlastnictvi = "string", id_telesa = "string", ico_num = "number", ddp_vs = "string", typ_nem = "number", poc_mes_vla = "number", poc_mes_pla = "number", pp_mes_od = "number", pp_mes_do = "number", c_predp = "JsonDecimal", m_osv = "number", ixs_esu = "string", adresa_txt = "string", cislo_jednotky = "JsonDecimal", cdom = "number", cast_obce_txt = "string", podil_citatel = "JsonDecimal", podil_jmenov = "JsonDecimal", dat_vzniku = "JsonDate", dat_zaniku = "JsonDate", dat_zaniku_zapis = "JsonDate", dat_npm = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", esu_txt = "string", typ_nem_txt = "string", zp_vyuz_txt = "string", stav_info = "number", radek_uhr = "number", dat_spl = "JsonDate", c_zapoctena_predpis = "JsonDecimal", m1o = "boolean", m2o = "boolean", m3o = "boolean", m4o = "boolean", m5o = "boolean", m6o = "boolean", m7o = "boolean", m8o = "boolean", m9o = "boolean", m10o = "boolean", m11o = "boolean", m12o = "boolean", opt_neznamo = "boolean", opt_rozpracovano = "boolean", opt_vyreseno = "boolean", options = "number", stav = "number", stav2 = "number", tp_exists = "number", max_dat_tp = "JsonDate", dat_vzniku_pp_uzivatel = "JsonDate", dat_zaniku_pp_uzivatel = "JsonDate",}
	const enum GPohVlastnictviBudovaDtoTypeLengths { klic = 120, ixp = 12, id_budovy = 30, id_jednotky = 30, id_vlastnictvi = 30, id_telesa = 30, ddp_vs = 12, ixs_esu = 12, adresa_txt = 254, cast_obce_txt = 254, poznamka = 255, zmenu_prov = 12, esu_txt = 254, typ_nem_txt = 254, zp_vyuz_txt = 60,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohVratkaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	interface GPohVratkaDto {
		vlozitDoSpisu?: boolean|null;
		cislo_predpisu?: number|null;
		ac?: number|null;
		/**IXP pripadu DDP*/
		IxpDdp?: string|null;
		/**idKnihy*/
		ixp_den_ddp?: string|null;
		ixs_esu?: string|null;
		datumVzniku?: JsonDate|null;
		datumSplatnosti?: JsonDate|null;
		vyseVratky?: JsonDecimal|null;
		vs?: string|null;
		ixpSpis?: string|null;
		popis?: string|null;
		poznamka?: string|null;
		zpusobUhrady?: number|null;
		buVl?: string|null;
		skVl?: string|null;
		buCi?: string|null;
		skCi?: string|null;
		kategorieUpo?: number|null;
		saldo?: JsonDecimal|null;
	}
	const enum GPohVratkaDtoNames { vlozitDoSpisu = "vlozitDoSpisu", cislo_predpisu = "cislo_predpisu", ac = "ac", IxpDdp = "IxpDdp", ixp_den_ddp = "ixp_den_ddp", ixs_esu = "ixs_esu", datumVzniku = "datumVzniku", datumSplatnosti = "datumSplatnosti", vyseVratky = "vyseVratky", vs = "vs", ixpSpis = "ixpSpis", popis = "popis", poznamka = "poznamka", zpusobUhrady = "zpusobUhrady", buVl = "buVl", skVl = "skVl", buCi = "buCi", skCi = "skCi", kategorieUpo = "kategorieUpo", saldo = "saldo",}
	const enum GPohVratkaDtoFragments { vlozitDoSpisu = "*", cislo_predpisu = "*", ac = "*", IxpDdp = "*", ixp_den_ddp = "*", ixs_esu = "*", datumVzniku = "*", datumSplatnosti = "*", vyseVratky = "*", vs = "*", ixpSpis = "*", popis = "*", poznamka = "*", zpusobUhrady = "*", buVl = "*", skVl = "*", buCi = "*", skCi = "*", kategorieUpo = "*", saldo = "*",}
	const enum GPohVratkaDtoTypes { vlozitDoSpisu = "boolean", cislo_predpisu = "number", ac = "number", IxpDdp = "string", ixp_den_ddp = "string", ixs_esu = "string", datumVzniku = "JsonDate", datumSplatnosti = "JsonDate", vyseVratky = "JsonDecimal", vs = "string", ixpSpis = "string", popis = "string", poznamka = "string", zpusobUhrady = "number", buVl = "string", skVl = "string", buCi = "string", skCi = "string", kategorieUpo = "number", saldo = "JsonDecimal",}
	const enum GPohVratkaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohVyzvaDto.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GPohZasilkaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro zasilky POH*/
	interface GPohZasilkaDto {
		/**ixp pripadu DDP*/
		ixp?: string|null;
		esu_txt?: string|null;
		err_txt?: string|null;
		err_code?: number|null;
	}
	const enum GPohZasilkaDtoNames { ixp = "ixp", esu_txt = "esu_txt", err_txt = "err_txt", err_code = "err_code",}
	const enum GPohZasilkaDtoFragments { ixp = "main", esu_txt = "main", err_txt = "*", err_code = "*",}
	const enum GPohZasilkaDtoTypes { ixp = "string", esu_txt = "string", err_txt = "string", err_code = "number",}
	const enum GPohZasilkaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPoh\GVlastnictviDatumy.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro datumy v rozhodnem obdobi*/
	interface GVlastnictviDatumy {
		/**KLIC*/
		klic?: string|null;
		/**datum OD*/
		dat_od?: JsonDate|null;
		/**datum DO*/
		dat_do?: JsonDate|null;
		/**poznámka*/
		poznamka?: string|null;
		/**AKTIVITA*/
		aktivita?: JsonDecimal|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**identifikátor změnu provedl*/
		zmenu_prov?: string|null;
	}
	const enum GVlastnictviDatumyNames { klic = "klic", dat_od = "dat_od", dat_do = "dat_do", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GVlastnictviDatumyFragments { klic = "main", dat_od = "main", dat_do = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GVlastnictviDatumyTypes { klic = "string", dat_od = "JsonDate", dat_do = "JsonDate", poznamka = "string", aktivita = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GVlastnictviDatumyTypeLengths { klic = 120, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPohFo\GPohFoDetailRozhodneObdobiDto.d.ts 

declare namespace Gordic.Poh.Interface.DtoPohFo {
	/**Zatim rezervni*/
	interface GPohFoDetailRozhodneObdobiDto {
		/**PID.*/
		pid?: string|null;
		/**PORADI.*/
		poradi?: JsonDecimal|null;
		/**Datum OD.*/
		dat_od?: JsonDate|null;
		/**Datum DO.*/
		dat_do?: JsonDate|null;
		/**Datum TP OD.*/
		dat_tp_od?: JsonDate|null;
		/**Datum TP DO.*/
		dat_tp_do?: JsonDate|null;
		/**ID BUDOVY.*/
		id_budovy?: string|null;
		/**ID JEDNOTKY.*/
		id_jednotky?: string|null;
		/**Počet MES PLA.*/
		poc_mes_pla?: JsonDecimal|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**AKTIVITA.*/
		aktivita?: JsonDecimal|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
	}
	const enum GPohFoDetailRozhodneObdobiDtoNames { pid = "pid", poradi = "poradi", dat_od = "dat_od", dat_do = "dat_do", dat_tp_od = "dat_tp_od", dat_tp_do = "dat_tp_do", id_budovy = "id_budovy", id_jednotky = "id_jednotky", poc_mes_pla = "poc_mes_pla", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov",}
	const enum GPohFoDetailRozhodneObdobiDtoFragments { pid = "main", poradi = "main", dat_od = "main", dat_do = "main", dat_tp_od = "main", dat_tp_do = "main", id_budovy = "main", id_jednotky = "main", poc_mes_pla = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main",}
	const enum GPohFoDetailRozhodneObdobiDtoTypes { pid = "string", poradi = "JsonDecimal", dat_od = "JsonDate", dat_do = "JsonDate", dat_tp_od = "JsonDate", dat_tp_do = "JsonDate", id_budovy = "string", id_jednotky = "string", poc_mes_pla = "JsonDecimal", poznamka = "string", aktivita = "JsonDecimal", dat_zmena = "JsonDate", zmenu_prov = "string",}
	const enum GPohFoDetailRozhodneObdobiDtoTypeLengths { pid = 12, id_budovy = 30, id_jednotky = 30, poznamka = 50, zmenu_prov = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPohFo\GPohFoMainPanel.d.ts 

declare namespace Gordic.Poh.Interface {
	interface GPohFoMainPanel extends Gordic.Esu.Interface.DetailEsuDto {
		vek?: number|null;
	}
	const enum GPohFoMainPanelNames { vek = "vek", ixs_esu = "ixs_esu", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", typ_esu = "typ_esu", stupen_ver = "stupen_ver", ixs_nad = "ixs_nad", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", tel = "tel", mail = "mail", fax = "fax", ixs_su = "ixs_su", priz_eko = "priz_eko", priz_int = "priz_int", num_pod = "num_pod", num_zast = "num_zast", cs_nazev = "cs_nazev", cs_zkratka = "cs_zkratka", typ_org = "typ_org", dat_mpd = "dat_mpd", cs_ulice = "cs_ulice", cs_obec = "cs_obec", esu_txt = "esu_txt", rc = "rc", ixs_prev = "ixs_prev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", pobox = "pobox", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", ixs_puv = "ixs_puv", ixs_obj = "ixs_obj", ixs_adr = "ixs_adr", ixs_org = "ixs_org", ixs_oso = "ixs_oso", ixs_eko = "ixs_eko", ur_pri = "ur_pri", adresa_kod = "adresa_kod", priz_dph = "priz_dph", st0 = "st0", pco = "pco", z_int = "z_int", typ_ag = "typ_ag", neakt_oba_int = "neakt_oba_int", dat_nar = "dat_nar", bio = "bio", url = "url", typ_upadku = "typ_upadku", dat_akt_rob = "dat_akt_rob", kod_o = "kod_o", stat_sp = "stat_sp", gps_sirka = "gps_sirka", gps_delka = "gps_delka", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", oc = "oc", id_ds = "id_ds", sk_edesk_id = "sk_edesk_id", pohlavi = "pohlavi", rod_stav = "rod_stav", typ_adr = "typ_adr", rod_prijmeni = "rod_prijmeni", misto_nar = "misto_nar", prezdivka = "prezdivka", ixs_esu_zam = "ixs_esu_zam", id_gex = "id_gex", EuId = "EuId", Lei = "Lei", Eori = "Eori", SeedId = "SeedId",}
	const enum GPohFoMainPanelFragments { vek = "*", ixs_esu = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ob_jmeno = "*", typ_esu = "*", stupen_ver = "*", ixs_nad = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", tel = "*", mail = "*", fax = "*", ixs_su = "*", priz_eko = "*", priz_int = "*", num_pod = "*", num_zast = "*", cs_nazev = "*", cs_zkratka = "*", typ_org = "*", dat_mpd = "*", cs_ulice = "*", cs_obec = "*", esu_txt = "*", rc = "*", ixs_prev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", pobox = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", ixs_puv = "*", ixs_obj = "*", ixs_adr = "*", ixs_org = "*", ixs_oso = "*", ixs_eko = "*", ur_pri = "*", adresa_kod = "*", priz_dph = "*", st0 = "*", pco = "*", z_int = "*", typ_ag = "*", neakt_oba_int = "*", dat_nar = "*", bio = "*", url = "*", typ_upadku = "*", dat_akt_rob = "*", kod_o = "*", stat_sp = "*", gps_sirka = "*", gps_delka = "*", priz_umrti = "*", dat_umrti = "*", oc = "*", id_ds = "*", sk_edesk_id = "*", pohlavi = "*", rod_stav = "*", typ_adr = "*", rod_prijmeni = "*", misto_nar = "*", prezdivka = "*", ixs_esu_zam = "*", id_gex = "*", EuId = "*", Lei = "*", Eori = "*", SeedId = "*",}
	const enum GPohFoMainPanelTypes { vek = "number", ixs_esu = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ob_jmeno = "string", typ_esu = "number", stupen_ver = "number", ixs_nad = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", tel = "string", mail = "string", fax = "string", ixs_su = "string", priz_eko = "number", priz_int = "number", num_pod = "number", num_zast = "number", cs_nazev = "string", cs_zkratka = "string", typ_org = "number", dat_mpd = "JsonDate", cs_ulice = "string", cs_obec = "string", esu_txt = "string", rc = "string", ixs_prev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", pobox = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", ixs_puv = "string", ixs_obj = "string", ixs_adr = "string", ixs_org = "string", ixs_oso = "string", ixs_eko = "string", ur_pri = "number", adresa_kod = "string", priz_dph = "number", st0 = "string", pco = "number", z_int = "number", typ_ag = "number", neakt_oba_int = "number", dat_nar = "JsonDate", bio = "JsonDecimal", url = "string", typ_upadku = "number", dat_akt_rob = "JsonDate", kod_o = "number", stat_sp = "number", gps_sirka = "string", gps_delka = "string", priz_umrti = "number", dat_umrti = "JsonDate", oc = "string", id_ds = "string", sk_edesk_id = "string", pohlavi = "number", rod_stav = "number", typ_adr = "number", rod_prijmeni = "string", misto_nar = "string", prezdivka = "string", ixs_esu_zam = "string", id_gex = "string", EuId = "string", Lei = "string", Eori = "string", SeedId = "string",}
	const enum GPohFoMainPanelTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPohFo\GPohFoRozhodneObdobiDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro data POH FO pobyt/predpis*/
	interface GPohFoRozhodneObdobiDto {
		/**PID.*/
		pid?: string|null;
		/**Identifikátor DDP.*/
		ixp_ddp?: string|null;
		/**Identifikátor ESU.*/
		ixs_esu?: string|null;
		/**ROK.*/
		rok?: number|null;
		/**Počet MES PLA SUM ROK.*/
		poc_mes_pla_sum_rok?: number|null;
		/**C VYP.*/
		c_vyp?: number|null;
		/**RADEK UHR.*/
		radek_uhr?: number|null;
		/**Kód OBCE.*/
		kod_obce?: number|null;
		/**Stav.*/
		stav?: number|null;
		/**Datum SPL.*/
		dat_spl?: JsonDate|null;
		/**Poznámka.*/
		poznamka?: string|null;
		/**AKTIVITA.*/
		aktivita?: number|null;
		/**Datum změny.*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov?: string|null;
		/**castka predpisu nactena z predpisu*/
		c_zapoctena_predpis?: JsonDecimal|null;
		/**txt jmeno pruvodce zmeny*/
		zmenu_prov_txt?: string|null;
		poradi?: number|null;
		/**Datum OD.*/
		dat_od?: JsonDate|null;
		/**Datum DO.*/
		dat_do?: JsonDate|null;
		/**Datum TP OD.*/
		dat_tp_od?: JsonDate|null;
		/**Datum TP DO.*/
		dat_tp_do?: JsonDate|null;
		/**ID BUDOVY.*/
		id_budovy?: string|null;
		/**ID JEDNOTKY.*/
		id_jednotky?: string|null;
		/**Počet MES PLA.*/
		poc_mes_pla?: JsonDecimal|null;
		/**Poznámka.*/
		poznamka_detail?: string|null;
		/**AKTIVITA.*/
		aktivita_detail?: JsonDecimal|null;
		/**Datum změny.*/
		dat_zmena_detail?: JsonDate|null;
		/**Identifikátor změnu provedl.*/
		zmenu_prov_detail?: string|null;
		zmenu_prov_detail_txt?: string|null;
		adresa_txt?: string|null;
	}
	const enum GPohFoRozhodneObdobiDtoNames { pid = "pid", ixp_ddp = "ixp_ddp", ixs_esu = "ixs_esu", rok = "rok", poc_mes_pla_sum_rok = "poc_mes_pla_sum_rok", c_vyp = "c_vyp", radek_uhr = "radek_uhr", kod_obce = "kod_obce", stav = "stav", dat_spl = "dat_spl", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", c_zapoctena_predpis = "c_zapoctena_predpis", zmenu_prov_txt = "zmenu_prov_txt", poradi = "poradi", dat_od = "dat_od", dat_do = "dat_do", dat_tp_od = "dat_tp_od", dat_tp_do = "dat_tp_do", id_budovy = "id_budovy", id_jednotky = "id_jednotky", poc_mes_pla = "poc_mes_pla", poznamka_detail = "poznamka_detail", aktivita_detail = "aktivita_detail", dat_zmena_detail = "dat_zmena_detail", zmenu_prov_detail = "zmenu_prov_detail", zmenu_prov_detail_txt = "zmenu_prov_detail_txt", adresa_txt = "adresa_txt",}
	const enum GPohFoRozhodneObdobiDtoFragments { pid = "main", ixp_ddp = "main", ixs_esu = "main", rok = "main", poc_mes_pla_sum_rok = "main", c_vyp = "main", radek_uhr = "main", kod_obce = "main", stav = "main", dat_spl = "main", poznamka = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", c_zapoctena_predpis = "*", zmenu_prov_txt = "*", poradi = "main", dat_od = "main", dat_do = "main", dat_tp_od = "main", dat_tp_do = "main", id_budovy = "main", id_jednotky = "main", poc_mes_pla = "main", poznamka_detail = "main", aktivita_detail = "main", dat_zmena_detail = "main", zmenu_prov_detail = "main", zmenu_prov_detail_txt = "main", adresa_txt = "main",}
	const enum GPohFoRozhodneObdobiDtoTypes { pid = "string", ixp_ddp = "string", ixs_esu = "string", rok = "number", poc_mes_pla_sum_rok = "number", c_vyp = "number", radek_uhr = "number", kod_obce = "number", stav = "number", dat_spl = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", c_zapoctena_predpis = "JsonDecimal", zmenu_prov_txt = "string", poradi = "number", dat_od = "JsonDate", dat_do = "JsonDate", dat_tp_od = "JsonDate", dat_tp_do = "JsonDate", id_budovy = "string", id_jednotky = "string", poc_mes_pla = "JsonDecimal", poznamka_detail = "string", aktivita_detail = "JsonDecimal", dat_zmena_detail = "JsonDate", zmenu_prov_detail = "string", zmenu_prov_detail_txt = "string", adresa_txt = "string",}
	const enum GPohFoRozhodneObdobiDtoTypeLengths { pid = 12, ixp_ddp = 12, ixs_esu = 12, poznamka = 50, zmenu_prov = 12, id_budovy = 30, id_jednotky = 30, poznamka_detail = 50, zmenu_prov_detail = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoPohFo\GPohZakladPoDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro data POH FO zalozeni*/
	interface GPohZakladPoDto {
		id_budovy?: string|null;
		rok?: number|null;
		ixs_esu?: string|null;
		kod_obce?: number|null;
		ixs_oso?: string|null;
		ixs_adr?: string|null;
		jmeno?: string|null;
		prijmeni?: string|null;
		dat_nar?: JsonDate|null;
		stav_bydl_txt?: string|null;
		dat_tp_od?: JsonDate|null;
		dat_tp_do?: JsonDate|null;
		typ_bydl_txt?: string|null;
		adresa?: string|null;
		mistonar?: string|null;
		urpri?: number|null;
		dat_akt_iszr?: JsonDate|null;
		ixp_ddp?: string|null;
		err_code?: number|null;
		err_txt?: string|null;
		rc?: string|null;
		predpisy?: number|null;
		platby?: number|null;
		rozdil?: number|null;
		dat_spl?: JsonDate|null;
		poc_mes_pla?: number|null;
		c_vyp?: number|null;
	}
	const enum GPohZakladPoDtoNames { id_budovy = "id_budovy", rok = "rok", ixs_esu = "ixs_esu", kod_obce = "kod_obce", ixs_oso = "ixs_oso", ixs_adr = "ixs_adr", jmeno = "jmeno", prijmeni = "prijmeni", dat_nar = "dat_nar", stav_bydl_txt = "stav_bydl_txt", dat_tp_od = "dat_tp_od", dat_tp_do = "dat_tp_do", typ_bydl_txt = "typ_bydl_txt", adresa = "adresa", mistonar = "mistonar", urpri = "urpri", dat_akt_iszr = "dat_akt_iszr", ixp_ddp = "ixp_ddp", err_code = "err_code", err_txt = "err_txt", rc = "rc", predpisy = "predpisy", platby = "platby", rozdil = "rozdil", dat_spl = "dat_spl", poc_mes_pla = "poc_mes_pla", c_vyp = "c_vyp",}
	const enum GPohZakladPoDtoFragments { id_budovy = "*", rok = "*", ixs_esu = "*", kod_obce = "*", ixs_oso = "*", ixs_adr = "*", jmeno = "*", prijmeni = "*", dat_nar = "*", stav_bydl_txt = "*", dat_tp_od = "*", dat_tp_do = "*", typ_bydl_txt = "*", adresa = "*", mistonar = "*", urpri = "*", dat_akt_iszr = "*", ixp_ddp = "*", err_code = "*", err_txt = "*", rc = "*", predpisy = "*", platby = "*", rozdil = "*", dat_spl = "*", poc_mes_pla = "*", c_vyp = "*",}
	const enum GPohZakladPoDtoTypes { id_budovy = "string", rok = "number", ixs_esu = "string", kod_obce = "number", ixs_oso = "string", ixs_adr = "string", jmeno = "string", prijmeni = "string", dat_nar = "JsonDate", stav_bydl_txt = "string", dat_tp_od = "JsonDate", dat_tp_do = "JsonDate", typ_bydl_txt = "string", adresa = "string", mistonar = "string", urpri = "number", dat_akt_iszr = "JsonDate", ixp_ddp = "string", err_code = "number", err_txt = "string", rc = "string", predpisy = "number", platby = "number", rozdil = "number", dat_spl = "JsonDate", poc_mes_pla = "number", c_vyp = "number",}
	const enum GPohZakladPoDtoTypeLengths { ixp_ddp = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoSaldot\GPohSaldotDokladyPOUDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro Smlouvy Saldot*/
	interface GPohSaldotDokladyPOUDto {
		dat_evid?: JsonDate|null;
		ac_ag?: string|null;
		c_celk?: JsonDecimal|null;
		s_uhr_txt?: string|null;
		dat_uhr?: JsonDate|null;
	}
	const enum GPohSaldotDokladyPOUDtoNames { dat_evid = "dat_evid", ac_ag = "ac_ag", c_celk = "c_celk", s_uhr_txt = "s_uhr_txt", dat_uhr = "dat_uhr",}
	const enum GPohSaldotDokladyPOUDtoFragments { dat_evid = "*", ac_ag = "*", c_celk = "*", s_uhr_txt = "*", dat_uhr = "*",}
	const enum GPohSaldotDokladyPOUDtoTypes { dat_evid = "JsonDate", ac_ag = "string", c_celk = "JsonDecimal", s_uhr_txt = "string", dat_uhr = "JsonDate",}
	const enum GPohSaldotDokladyPOUDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoSaldot\GSaldotDashboardDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro dashboard*/
	interface GSaldotDashboardDto {
		/**po_s_predpisem*/
		po_s_predpisem?: number|null;
	}
	const enum GSaldotDashboardDtoNames { po_s_predpisem = "po_s_predpisem",}
	const enum GSaldotDashboardDtoFragments { po_s_predpisem = "main",}
	const enum GSaldotDashboardDtoTypes { po_s_predpisem = "number",}
	const enum GSaldotDashboardDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoSaldot\GSaldotSmlouvaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro Smlouvy Saldot*/
	interface GSaldotSmlouvaDto {
		ixs_esu?: string|null;
		ixs_esu_aktualni?: string|null;
		ixs_esu_dpmb?: string|null;
		ixp?: string|null;
		sml_nazev?: string|null;
		sml_popis?: string|null;
		esu_nazev?: string|null;
		esu_ico?: string|null;
		esu_adresa?: string|null;
		sml_stav?: number|null;
		sml_stav_txt?: string|null;
		dat_zmena?: JsonDate|null;
		sml_sgn_txt?: string|null;
		dat_uzavreni?: JsonDate|null;
		dat_platnost?: JsonDate|null;
		dat_prij_pod?: JsonDate|null;
		vs?: string|null;
		ac?: string|null;
		ss?: string|null;
		ks?: string|null;
		ac_sml?: string|null;
		dat_ucinnost?: JsonDate|null;
		ixs_typ?: string|null;
		rok?: number|null;
		fin_od?: number|null;
		radek_upo?: number|null;
		radek_uhr?: number|null;
		ixp_pripadu?: string|null;
		ixs_fun_ref?: string|null;
		fun_ref_txt?: string|null;
		celk_ok?: number|null;
		esu_stupen_ver?: number|null;
		iszr_ok?: number|null;
		dat_iszr?: JsonDate|null;
		celk_ok_manual?: number|null;
		duvod?: string|null;
		kotest1?: number|null;
		kotest2?: number|null;
		stav_ver_txt?: string|null;
		subrada?: number|null;
		zmenu_prov?: string|null;
		bu_ci?: string|null;
		sk_ci?: string|null;
		buci_txt?: string|null;
		fun_akt_txt?: string|null;
		ixs_fun_wfl?: string|null;
		s_schval?: string|null;
		je_v_epk?: boolean|null;
		zpus_vyriz?: number|null;
		vyrizeni_txt?: string|null;
		c_kuponu?: string|null;
		dat_kup_nakup?: JsonDate|null;
		dat_kup_platod?: JsonDate|null;
		dat_kup_platdo?: JsonDate|null;
		ko2_dat?: JsonDate|null;
		celk_ok_err?: string|null;
		termin_vyrizeni?: JsonDate|null;
		ixs_esu_iszr?: string|null;
		count?: number|null;
		fun_wfl_txt?: string|null;
		dat_vrac_kuponu?: JsonDate|null;
		ko2_zmenu_prov?: string|null;
		c_mena?: JsonDecimal|null;
		ABCDfil?: string|null;
		ko1fil?: string|null;
		ko2fil?: string|null;
		dat_vko?: JsonDate|null;
		kotest1txt?: string|null;
		pozn?: string|null;
		mail?: string|null;
		zamitnuti_dat?: JsonDate|null;
		zamitnuti_prov?: string|null;
		zamitnuti_prov_txt?: string|null;
		zamitnuti_duvod?: number|null;
		zamitnuti_duvod_txt?: string|null;
		ozp_stavsml_txt?: string|null;
		dat_lhuta_vrac_dot?: JsonDate|null;
		pozn2?: string|null;
		dat_import_csv?: JsonDate|null;
		fun_vyriz_epk?: string|null;
		blok_nem?: number|null;
		kotest1nem?: number|null;
		kotest1poz?: string|null;
		dat_lhuta_pod?: JsonDate|null;
		duvod_zmeny?: string|null;
		EsuISZR?: string|null;
		esu_dat_nar?: JsonDate|null;
		esu_dat_umr?: JsonDate|null;
		poznamka_dohromady?: string|null;
		tel?: string|null;
		dorucovaci_adresa_iszr?: string|null;
		zadatel_dpmb?: string|null;
		dorucovaci_dpmb?: string|null;
		banka?: string|null;
		ko1_text?: string|null;
		ko2_text?: string|null;
		ko2_overil?: string|null;
		ko1test?: number|null;
		ko1testNemovitost?: number|null;
		ko1testPoznamkaPredpis?: number|null;
		ko2test?: number|null;
		iszrtest?: number|null;
		ko11?: boolean|null;
		ko12?: boolean|null;
		ko13?: boolean|null;
		ko14?: boolean|null;
		ko15?: boolean|null;
		ko21?: boolean|null;
		ko22?: boolean|null;
		ko23?: boolean|null;
		ko24?: boolean|null;
		ko25?: boolean|null;
	}
	const enum GSaldotSmlouvaDtoNames { ixs_esu = "ixs_esu", ixs_esu_aktualni = "ixs_esu_aktualni", ixs_esu_dpmb = "ixs_esu_dpmb", ixp = "ixp", sml_nazev = "sml_nazev", sml_popis = "sml_popis", esu_nazev = "esu_nazev", esu_ico = "esu_ico", esu_adresa = "esu_adresa", sml_stav = "sml_stav", sml_stav_txt = "sml_stav_txt", dat_zmena = "dat_zmena", sml_sgn_txt = "sml_sgn_txt", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dat_prij_pod = "dat_prij_pod", vs = "vs", ac = "ac", ss = "ss", ks = "ks", ac_sml = "ac_sml", dat_ucinnost = "dat_ucinnost", ixs_typ = "ixs_typ", rok = "rok", fin_od = "fin_od", radek_upo = "radek_upo", radek_uhr = "radek_uhr", ixp_pripadu = "ixp_pripadu", ixs_fun_ref = "ixs_fun_ref", fun_ref_txt = "fun_ref_txt", celk_ok = "celk_ok", esu_stupen_ver = "esu_stupen_ver", iszr_ok = "iszr_ok", dat_iszr = "dat_iszr", celk_ok_manual = "celk_ok_manual", duvod = "duvod", kotest1 = "kotest1", kotest2 = "kotest2", stav_ver_txt = "stav_ver_txt", subrada = "subrada", zmenu_prov = "zmenu_prov", bu_ci = "bu_ci", sk_ci = "sk_ci", buci_txt = "buci_txt", fun_akt_txt = "fun_akt_txt", ixs_fun_wfl = "ixs_fun_wfl", s_schval = "s_schval", je_v_epk = "je_v_epk", zpus_vyriz = "zpus_vyriz", vyrizeni_txt = "vyrizeni_txt", c_kuponu = "c_kuponu", dat_kup_nakup = "dat_kup_nakup", dat_kup_platod = "dat_kup_platod", dat_kup_platdo = "dat_kup_platdo", ko2_dat = "ko2_dat", celk_ok_err = "celk_ok_err", termin_vyrizeni = "termin_vyrizeni", ixs_esu_iszr = "ixs_esu_iszr", count = "count", fun_wfl_txt = "fun_wfl_txt", dat_vrac_kuponu = "dat_vrac_kuponu", ko2_zmenu_prov = "ko2_zmenu_prov", c_mena = "c_mena", ABCDfil = "ABCDfil", ko1fil = "ko1fil", ko2fil = "ko2fil", dat_vko = "dat_vko", kotest1txt = "kotest1txt", pozn = "pozn", mail = "mail", zamitnuti_dat = "zamitnuti_dat", zamitnuti_prov = "zamitnuti_prov", zamitnuti_prov_txt = "zamitnuti_prov_txt", zamitnuti_duvod = "zamitnuti_duvod", zamitnuti_duvod_txt = "zamitnuti_duvod_txt", ozp_stavsml_txt = "ozp_stavsml_txt", dat_lhuta_vrac_dot = "dat_lhuta_vrac_dot", pozn2 = "pozn2", dat_import_csv = "dat_import_csv", fun_vyriz_epk = "fun_vyriz_epk", blok_nem = "blok_nem", kotest1nem = "kotest1nem", kotest1poz = "kotest1poz", dat_lhuta_pod = "dat_lhuta_pod", duvod_zmeny = "duvod_zmeny", EsuISZR = "EsuISZR", esu_dat_nar = "esu_dat_nar", esu_dat_umr = "esu_dat_umr", poznamka_dohromady = "poznamka_dohromady", tel = "tel", dorucovaci_adresa_iszr = "dorucovaci_adresa_iszr", zadatel_dpmb = "zadatel_dpmb", dorucovaci_dpmb = "dorucovaci_dpmb", banka = "banka", ko1_text = "ko1_text", ko2_text = "ko2_text", ko2_overil = "ko2_overil", ko1test = "ko1test", ko1testNemovitost = "ko1testNemovitost", ko1testPoznamkaPredpis = "ko1testPoznamkaPredpis", ko2test = "ko2test", iszrtest = "iszrtest", ko11 = "ko11", ko12 = "ko12", ko13 = "ko13", ko14 = "ko14", ko15 = "ko15", ko21 = "ko21", ko22 = "ko22", ko23 = "ko23", ko24 = "ko24", ko25 = "ko25",}
	const enum GSaldotSmlouvaDtoFragments { ixs_esu = "*", ixs_esu_aktualni = "*", ixs_esu_dpmb = "*", ixp = "*", sml_nazev = "*", sml_popis = "*", esu_nazev = "*", esu_ico = "*", esu_adresa = "*", sml_stav = "*", sml_stav_txt = "*", dat_zmena = "*", sml_sgn_txt = "*", dat_uzavreni = "*", dat_platnost = "*", dat_prij_pod = "*", vs = "*", ac = "*", ss = "*", ks = "*", ac_sml = "*", dat_ucinnost = "*", ixs_typ = "*", rok = "*", fin_od = "*", radek_upo = "*", radek_uhr = "*", ixp_pripadu = "*", ixs_fun_ref = "*", fun_ref_txt = "*", celk_ok = "*", esu_stupen_ver = "*", iszr_ok = "*", dat_iszr = "*", celk_ok_manual = "*", duvod = "*", kotest1 = "*", kotest2 = "*", stav_ver_txt = "*", subrada = "*", zmenu_prov = "*", bu_ci = "*", sk_ci = "*", buci_txt = "*", fun_akt_txt = "*", ixs_fun_wfl = "*", s_schval = "*", je_v_epk = "*", zpus_vyriz = "*", vyrizeni_txt = "*", c_kuponu = "*", dat_kup_nakup = "*", dat_kup_platod = "*", dat_kup_platdo = "*", ko2_dat = "*", celk_ok_err = "*", termin_vyrizeni = "*", ixs_esu_iszr = "*", count = "*", fun_wfl_txt = "*", dat_vrac_kuponu = "*", ko2_zmenu_prov = "*", c_mena = "*", ABCDfil = "*", ko1fil = "*", ko2fil = "*", dat_vko = "*", kotest1txt = "*", pozn = "*", mail = "*", zamitnuti_dat = "*", zamitnuti_prov = "*", zamitnuti_prov_txt = "*", zamitnuti_duvod = "*", zamitnuti_duvod_txt = "*", ozp_stavsml_txt = "*", dat_lhuta_vrac_dot = "*", pozn2 = "*", dat_import_csv = "*", fun_vyriz_epk = "*", blok_nem = "*", kotest1nem = "*", kotest1poz = "*", dat_lhuta_pod = "*", duvod_zmeny = "*", EsuISZR = "*", esu_dat_nar = "*", esu_dat_umr = "*", poznamka_dohromady = "*", tel = "*", dorucovaci_adresa_iszr = "*", zadatel_dpmb = "*", dorucovaci_dpmb = "*", banka = "*", ko1_text = "*", ko2_text = "*", ko2_overil = "*", ko1test = "*", ko1testNemovitost = "*", ko1testPoznamkaPredpis = "*", ko2test = "*", iszrtest = "*", ko11 = "*", ko12 = "*", ko13 = "*", ko14 = "*", ko15 = "*", ko21 = "*", ko22 = "*", ko23 = "*", ko24 = "*", ko25 = "*",}
	const enum GSaldotSmlouvaDtoTypes { ixs_esu = "string", ixs_esu_aktualni = "string", ixs_esu_dpmb = "string", ixp = "string", sml_nazev = "string", sml_popis = "string", esu_nazev = "string", esu_ico = "string", esu_adresa = "string", sml_stav = "number", sml_stav_txt = "string", dat_zmena = "JsonDate", sml_sgn_txt = "string", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dat_prij_pod = "JsonDate", vs = "string", ac = "string", ss = "string", ks = "string", ac_sml = "string", dat_ucinnost = "JsonDate", ixs_typ = "string", rok = "number", fin_od = "number", radek_upo = "number", radek_uhr = "number", ixp_pripadu = "string", ixs_fun_ref = "string", fun_ref_txt = "string", celk_ok = "number", esu_stupen_ver = "number", iszr_ok = "number", dat_iszr = "JsonDate", celk_ok_manual = "number", duvod = "string", kotest1 = "number", kotest2 = "number", stav_ver_txt = "string", subrada = "number", zmenu_prov = "string", bu_ci = "string", sk_ci = "string", buci_txt = "string", fun_akt_txt = "string", ixs_fun_wfl = "string", s_schval = "string", je_v_epk = "boolean", zpus_vyriz = "number", vyrizeni_txt = "string", c_kuponu = "string", dat_kup_nakup = "JsonDate", dat_kup_platod = "JsonDate", dat_kup_platdo = "JsonDate", ko2_dat = "JsonDate", celk_ok_err = "string", termin_vyrizeni = "JsonDate", ixs_esu_iszr = "string", count = "number", fun_wfl_txt = "string", dat_vrac_kuponu = "JsonDate", ko2_zmenu_prov = "string", c_mena = "JsonDecimal", ABCDfil = "string", ko1fil = "string", ko2fil = "string", dat_vko = "JsonDate", kotest1txt = "string", pozn = "string", mail = "string", zamitnuti_dat = "JsonDate", zamitnuti_prov = "string", zamitnuti_prov_txt = "string", zamitnuti_duvod = "number", zamitnuti_duvod_txt = "string", ozp_stavsml_txt = "string", dat_lhuta_vrac_dot = "JsonDate", pozn2 = "string", dat_import_csv = "JsonDate", fun_vyriz_epk = "string", blok_nem = "number", kotest1nem = "number", kotest1poz = "string", dat_lhuta_pod = "JsonDate", duvod_zmeny = "string", EsuISZR = "string", esu_dat_nar = "JsonDate", esu_dat_umr = "JsonDate", poznamka_dohromady = "string", tel = "string", dorucovaci_adresa_iszr = "string", zadatel_dpmb = "string", dorucovaci_dpmb = "string", banka = "string", ko1_text = "string", ko2_text = "string", ko2_overil = "string", ko1test = "number", ko1testNemovitost = "number", ko1testPoznamkaPredpis = "number", ko2test = "number", iszrtest = "number", ko11 = "boolean", ko12 = "boolean", ko13 = "boolean", ko14 = "boolean", ko15 = "boolean", ko21 = "boolean", ko22 = "boolean", ko23 = "boolean", ko24 = "boolean", ko25 = "boolean",}
	const enum GSaldotSmlouvaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoSaldot\GSaldotStatistika.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro Smlouvy Saldot*/
	interface GSaldotStatistika {
		id?: number|null;
		obdobi?: string|null;
		poc_prij_zadosti?: number|null;
		schvaleno_leden?: number|null;
		schvaleno_unor?: number|null;
		schvaleno_brezen?: number|null;
		schvaleno_duben?: number|null;
		schvaleno_kveten?: number|null;
		schvaleno_cerven?: number|null;
		schvaleno_cervenec?: number|null;
		schvaleno_srpen?: number|null;
		schvaleno_zari?: number|null;
		schvaleno_rijen?: number|null;
		schvaleno_listopad?: number|null;
		schvaleno_prosinec?: number|null;
		schvaleno_celkem?: number|null;
		pocet_zadosti_v_rizeni?: number|null;
		pocet_zadosti_k_zamitnuti?: number|null;
		pocet_zamitnutych_zadosti?: number|null;
		pocet_zpet_vzatych_zadosti?: number|null;
		pocet_odlozenych_zadosti?: number|null;
		pocet_vracenych_dotaci?: number|null;
		pocet_ctrl?: number|null;
	}
	const enum GSaldotStatistikaNames { id = "id", obdobi = "obdobi", poc_prij_zadosti = "poc_prij_zadosti", schvaleno_leden = "schvaleno_leden", schvaleno_unor = "schvaleno_unor", schvaleno_brezen = "schvaleno_brezen", schvaleno_duben = "schvaleno_duben", schvaleno_kveten = "schvaleno_kveten", schvaleno_cerven = "schvaleno_cerven", schvaleno_cervenec = "schvaleno_cervenec", schvaleno_srpen = "schvaleno_srpen", schvaleno_zari = "schvaleno_zari", schvaleno_rijen = "schvaleno_rijen", schvaleno_listopad = "schvaleno_listopad", schvaleno_prosinec = "schvaleno_prosinec", schvaleno_celkem = "schvaleno_celkem", pocet_zadosti_v_rizeni = "pocet_zadosti_v_rizeni", pocet_zadosti_k_zamitnuti = "pocet_zadosti_k_zamitnuti", pocet_zamitnutych_zadosti = "pocet_zamitnutych_zadosti", pocet_zpet_vzatych_zadosti = "pocet_zpet_vzatych_zadosti", pocet_odlozenych_zadosti = "pocet_odlozenych_zadosti", pocet_vracenych_dotaci = "pocet_vracenych_dotaci", pocet_ctrl = "pocet_ctrl",}
	const enum GSaldotStatistikaFragments { id = "*", obdobi = "*", poc_prij_zadosti = "*", schvaleno_leden = "*", schvaleno_unor = "*", schvaleno_brezen = "*", schvaleno_duben = "*", schvaleno_kveten = "*", schvaleno_cerven = "*", schvaleno_cervenec = "*", schvaleno_srpen = "*", schvaleno_zari = "*", schvaleno_rijen = "*", schvaleno_listopad = "*", schvaleno_prosinec = "*", schvaleno_celkem = "*", pocet_zadosti_v_rizeni = "*", pocet_zadosti_k_zamitnuti = "*", pocet_zamitnutych_zadosti = "*", pocet_zpet_vzatych_zadosti = "*", pocet_odlozenych_zadosti = "*", pocet_vracenych_dotaci = "*", pocet_ctrl = "*",}
	const enum GSaldotStatistikaTypes { id = "number", obdobi = "string", poc_prij_zadosti = "number", schvaleno_leden = "number", schvaleno_unor = "number", schvaleno_brezen = "number", schvaleno_duben = "number", schvaleno_kveten = "number", schvaleno_cerven = "number", schvaleno_cervenec = "number", schvaleno_srpen = "number", schvaleno_zari = "number", schvaleno_rijen = "number", schvaleno_listopad = "number", schvaleno_prosinec = "number", schvaleno_celkem = "number", pocet_zadosti_v_rizeni = "number", pocet_zadosti_k_zamitnuti = "number", pocet_zamitnutych_zadosti = "number", pocet_zpet_vzatych_zadosti = "number", pocet_odlozenych_zadosti = "number", pocet_vracenych_dotaci = "number", pocet_ctrl = "number",}
	const enum GSaldotStatistikaTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\DtoSmlouvyOdpady\GPohOdpadySmlouva.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro Smlouvy Saldot*/
	interface GPohOdpadySmlouva {
		ixp?: string|null;
		ixs_esu?: string|null;
		esu_ico?: string|null;
		ac_sml_nad?: string|null;
		esu_nazev?: string|null;
		fin_od?: string|null;
		dat_ucinnost?: JsonDate|null;
		dat_prij_pod?: JsonDate|null;
		dat_uzavreni?: JsonDate|null;
		dat_platnost?: JsonDate|null;
		dodatek_c?: JsonDecimal|null;
		kg1?: number|null;
		kg2?: number|null;
		kg3?: number|null;
		kgCelk?: number|null;
		fun_ref_txt?: string|null;
		ac_sml?: string|null;
		ixp_sml_nad?: string|null;
		dat_zmena?: JsonDate|null;
		sml_nazev?: string|null;
		sml_popis?: string|null;
		predpis?: number|null;
		platba?: number|null;
		platba_c?: JsonDecimal|null;
		predpis_txt?: string|null;
		ixp_pripadu?: string|null;
		radek_uhr?: number|null;
		ixb_elobraz?: string|null;
	}
	const enum GPohOdpadySmlouvaNames { ixp = "ixp", ixs_esu = "ixs_esu", esu_ico = "esu_ico", ac_sml_nad = "ac_sml_nad", esu_nazev = "esu_nazev", fin_od = "fin_od", dat_ucinnost = "dat_ucinnost", dat_prij_pod = "dat_prij_pod", dat_uzavreni = "dat_uzavreni", dat_platnost = "dat_platnost", dodatek_c = "dodatek_c", kg1 = "kg1", kg2 = "kg2", kg3 = "kg3", kgCelk = "kgCelk", fun_ref_txt = "fun_ref_txt", ac_sml = "ac_sml", ixp_sml_nad = "ixp_sml_nad", dat_zmena = "dat_zmena", sml_nazev = "sml_nazev", sml_popis = "sml_popis", predpis = "predpis", platba = "platba", platba_c = "platba_c", predpis_txt = "predpis_txt", ixp_pripadu = "ixp_pripadu", radek_uhr = "radek_uhr", ixb_elobraz = "ixb_elobraz",}
	const enum GPohOdpadySmlouvaFragments { ixp = "*", ixs_esu = "*", esu_ico = "*", ac_sml_nad = "*", esu_nazev = "*", fin_od = "*", dat_ucinnost = "*", dat_prij_pod = "*", dat_uzavreni = "*", dat_platnost = "*", dodatek_c = "*", kg1 = "*", kg2 = "*", kg3 = "*", kgCelk = "*", fun_ref_txt = "*", ac_sml = "*", ixp_sml_nad = "*", dat_zmena = "*", sml_nazev = "*", sml_popis = "*", predpis = "*", platba = "*", platba_c = "*", predpis_txt = "*", ixp_pripadu = "*", radek_uhr = "*", ixb_elobraz = "*",}
	const enum GPohOdpadySmlouvaTypes { ixp = "string", ixs_esu = "string", esu_ico = "string", ac_sml_nad = "string", esu_nazev = "string", fin_od = "string", dat_ucinnost = "JsonDate", dat_prij_pod = "JsonDate", dat_uzavreni = "JsonDate", dat_platnost = "JsonDate", dodatek_c = "JsonDecimal", kg1 = "number", kg2 = "number", kg3 = "number", kgCelk = "number", fun_ref_txt = "string", ac_sml = "string", ixp_sml_nad = "string", dat_zmena = "JsonDate", sml_nazev = "string", sml_popis = "string", predpis = "number", platba = "number", platba_c = "JsonDecimal", predpis_txt = "string", ixp_pripadu = "string", radek_uhr = "number", ixb_elobraz = "string",}
	const enum GPohOdpadySmlouvaTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohBMI.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohDashboard.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohFormulare.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohHledaniRen.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohRobObyvatel.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Filtr pro*/
	const enum GPohRobObyvatelFilter {
		/**ixs_oso*/
		ixs_oso,
		/**Jmeno*/
		jmeno,
		/**Prijmeni*/
		prijmeni,
		/**Datum narozeni*/
		dat_nar,
		/**Adresa*/
		adresa,
		/**trvale bydliste od*/
		dat_tp_od,
		dat_tp_do,
		stav_bydl,
		stav_bydl_txt,
		/**typ bydliste trvale / prechodne*/
		typ_bydl,
		typ_bydl_txt,
		rc,
		ulice,
		cislo_popisne,
		cislo_orientacni,
		psc,
		case_sensitive,
		cizinec,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohSpravaVlastnictvi.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní -
	* @domain PohNemovitosti
	* @businessObject PohSpravaVlastnictvi
	*/
	interface PohSpravaVlastnictvi {
		/**Nacte seznam datumu v rozhodnem obdobi*/
		nactiDatumy(rq?:CallParams<{vlastnictvi:Gordic.Poh.Interface.GPohVlastnictviBudovaDto,newTransaction:boolean}>): _Task<{vlastnictvi:Gordic.Poh.Interface.GPohVlastnictviBudovaDto,newTransaction:boolean},Gordic.Poh.Interface.GVlastnictviDatumy[]>;
		/**Smaze vybrane datum v rozhodnem obdobi*/
		smazDatum(rq?:CallParams<{datumy:Gordic.Poh.Interface.GVlastnictviDatumy,newTransaction:boolean}>): _Task<{datumy:Gordic.Poh.Interface.GVlastnictviDatumy,newTransaction:boolean},void>;
		/**Ulozi datumy v rozhodnem obdobi*/
		ulozDatum(rq?:CallParams<{datumy:Gordic.Poh.Interface.GVlastnictviDatumy,newTransaction:boolean}>): _Task<{datumy:Gordic.Poh.Interface.GVlastnictviDatumy,newTransaction:boolean},void>;
		/**Smaze aktualni datumy v rozhodnem obdobi a ulozi nova*/
		smazVsechnaAktualniAUlozNova(rq?:CallParams<{datumy:Gordic.Poh.Interface.GVlastnictviDatumy[],vlastnictvi:Gordic.Poh.Interface.GPohVlastnictviBudovaDto,newTransaction:boolean}>): _Task<{datumy:Gordic.Poh.Interface.GVlastnictviDatumy[],vlastnictvi:Gordic.Poh.Interface.GPohVlastnictviBudovaDto,newTransaction:boolean},void>;
		/**Zalozi zaznam v pohvbud a vypocita potrebne sloupce*/
		zalozitVlastnictviDoPoh(rq?:CallParams<{inDto:Gordic.Poh.Interface.GPohRenRapDto,newTransaction:boolean}>): _Task<{inDto:Gordic.Poh.Interface.GPohRenRapDto,newTransaction:boolean},void>;
		/**zapise do tabulky vlastnictvi pro tento rok ukonceni vlastnictvi a prepocita pocet mesicu ktere byly vlastneny*/
		ukoncitVlastnictvi(rq?:CallParams<{inDto:Gordic.Poh.Interface.GPohRenRapDto,newTransaction:boolean}>): _Task<{inDto:Gordic.Poh.Interface.GPohRenRapDto,newTransaction:boolean},void>;
		/**Detail*/
		read(rq?:Gordic.Poh.Interface.GPohVlastnictviBudovaDto|CallParams<GServiceReadRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>): _Task<GServiceReadRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>,GServiceReadResponse<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>;
		/**Seznam*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>;
		/**Založení*/
		create(rq?:Gordic.Poh.Interface.GPohVlastnictviBudovaDto|CallParams<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>): _Task<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>,GServiceSaveResponse<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>;
		/**Oprava*/
		update(rq?:Gordic.Poh.Interface.GPohVlastnictviBudovaDto|CallParams<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>): _Task<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>,GServiceSaveResponse<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>;
		/**Oprava resp. založení*/
		upsert(rq?:Gordic.Poh.Interface.GPohVlastnictviBudovaDto|CallParams<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>): _Task<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>,GServiceSaveResponse<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>;
		/**Odstranění*/
		delete(rq?:Gordic.Poh.Interface.GPohVlastnictviBudovaDto|CallParams<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>): _Task<GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>,GServiceSaveResponse<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>;
		/**update nebo insert adresy do pohvadr*/
		upsertAdresaTxt(rq?:CallParams<{updateExisting:boolean,rq:GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>}>): _Task<{updateExisting:boolean,rq:GServiceSaveRequest<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>},GServiceSaveResponse<Gordic.Poh.Interface.GPohVlastnictviBudovaDto>>;
		/**Vrátí seznam nemovitostí z REN ktere nejsou vedeny v POH -> z nich se udela zaznam v pohvbud (pohvjed)*/
		seznamNovychNemDleDdp(rq?:CallParams<{newTransaction:boolean}>): _Task<{newTransaction:boolean},GServiceListResponse<Gordic.Poh.Interface.GPohRenRapDto>>;
		/**Vrátí seznam nemovitostí, které mají ukončené vlastnění a jsou v evidenci POSOH pro tento rok -> Temto se musi aktualizovat pohvbud.pp_mes_do*/
		seznamUkoncenychVlastnictvi(rq?:CallParams<{newTransaction:boolean}>): _Task<{newTransaction:boolean},GServiceListResponse<Gordic.Poh.Interface.GPohRenRapDto>>;
		/**Seznam vlastniku*/
		dejSeznamVlastnikuVevidenci(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Poh.Interface.GPohSpolecnostPrehled>>;
		stavUctuPoplatnika(rq?:CallParams<{ixpDDP:string,newTransaction:boolean}>): _Task<{ixpDDP:string,newTransaction:boolean},Gordic.Poh.Interface.GPohDetailPoInfoDto>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PohSpravaVlastnictvi: ServiceBase & Catalog.PohSpravaVlastnictvi;
	}
	const PohSpravaVlastnictvi: Client["PohSpravaVlastnictvi"];
}
declare namespace Gordic.Poh.Interface {
	/**Filtr pro*/
	const enum GPohSpravaVlastnictviFilter {
		/**ixp*/
		ixp,
		/**ico_num*/
		ico_num,
		/**rok*/
		rok,
		/**id_budovy*/
		id_budovy,
		/**id_jednotky*/
		id_jednotky,
		/**typ_nem*/
		typ_nem,
		/**podle nazvu vlastnika nemovistosti*/
		esu_txt,
		/**id_vlastnictvi*/
		id_vlastnictvi,
		/**id_telesa*/
		id_telesa,
		/**ixs_esu*/
		ixs_esu,
		/**poc_mes_vla*/
		poc_mes_vla,
		/**poc_mes_pla*/
		poc_mes_pla,
		/**pp_mes_od*/
		pp_mes_od,
		/**pp_mes_do*/
		pp_mes_do,
		/**c_predp*/
		c_predp,
		/**m_osv*/
		m_osv,
		/**adresa_txt*/
		adresa_txt,
		/**poznamka*/
		poznamka,
		/**aktivita*/
		aktivita,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**stav_info*/
		stav_info,
		/**radek_uhr*/
		radek_uhr,
		/**klic*/
		klic,
		/**pouze_s_preplatkem*/
		pouze_s_preplatkem,
		/**radek_uhr*/
		pouze_s_nedoplatkem,
		/**klic*/
		pouze_vyrovnano,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohSzrsadrDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro Szrsadr*/
	interface GSzrsadrDto {
		/**adresni_misto_kod*/
		adresni_misto_kod?: number|null;
		/**okres_kod*/
		okres_kod?: number|null;
		/**obec_kod*/
		obec_kod?: number|null;
		/**cast_obce_kod*/
		cast_obce_kod?: number|null;
		/**ulice_kod*/
		ulice_kod?: number|null;
		/**posta_kod*/
		posta_kod?: number|null;
		/**staveb_objekt_kod*/
		staveb_objekt_kod?: number|null;
		/**typ_cis_dom_kod*/
		typ_cis_dom_kod?: number|null;
		/**cislo_domovni*/
		cislo_domovni?: number|null;
		/**cislo_orientacni*/
		cislo_orientacni?: number|null;
		/**cislo_or_pismeno*/
		cislo_or_pismeno?: string|null;
		/**cas_odpovedi*/
		cas_odpovedi?: JsonDate|null;
		/**aktivita*/
		aktivita?: number|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**zmenu_prov*/
		zmenu_prov?: string|null;
		/**cpop*/
		cpop?: string|null;
		/**cor*/
		cor?: string|null;
		/**dat_od*/
		dat_od?: JsonDate|null;
		/**dat_do*/
		dat_do?: JsonDate|null;
		/**cast_obce_kod_txt*/
		cast_obce_kod_txt?: string|null;
		/**obec_kod_txt*/
		obec_kod_txt?: string|null;
		/**okres_kod_txt*/
		okres_kod_txt?: string|null;
		/**posta_kod_txt*/
		posta_kod_txt?: string|null;
		/**typ_cis_dom_kod_txt*/
		typ_cis_dom_kod_txt?: string|null;
		/**ulice_kod_txt*/
		ulice_kod_txt?: string|null;
	}
	const enum GSzrsadrDtoNames { adresni_misto_kod = "adresni_misto_kod", okres_kod = "okres_kod", obec_kod = "obec_kod", cast_obce_kod = "cast_obce_kod", ulice_kod = "ulice_kod", posta_kod = "posta_kod", staveb_objekt_kod = "staveb_objekt_kod", typ_cis_dom_kod = "typ_cis_dom_kod", cislo_domovni = "cislo_domovni", cislo_orientacni = "cislo_orientacni", cislo_or_pismeno = "cislo_or_pismeno", cas_odpovedi = "cas_odpovedi", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", cpop = "cpop", cor = "cor", dat_od = "dat_od", dat_do = "dat_do", cast_obce_kod_txt = "cast_obce_kod_txt", obec_kod_txt = "obec_kod_txt", okres_kod_txt = "okres_kod_txt", posta_kod_txt = "posta_kod_txt", typ_cis_dom_kod_txt = "typ_cis_dom_kod_txt", ulice_kod_txt = "ulice_kod_txt",}
	const enum GSzrsadrDtoFragments { adresni_misto_kod = "main", okres_kod = "main", obec_kod = "main", cast_obce_kod = "main", ulice_kod = "main", posta_kod = "main", staveb_objekt_kod = "main", typ_cis_dom_kod = "main", cislo_domovni = "main", cislo_orientacni = "main", cislo_or_pismeno = "main", cas_odpovedi = "main", aktivita = "main", dat_zmena = "main", zmenu_prov = "main", cpop = "main", cor = "main", dat_od = "main", dat_do = "main", cast_obce_kod_txt = "cast_obce_kod_txt", obec_kod_txt = "obec_kod_txt", okres_kod_txt = "okres_kod_txt", posta_kod_txt = "posta_kod_txt", typ_cis_dom_kod_txt = "typ_cis_dom_kod_txt", ulice_kod_txt = "ulice_kod_txt",}
	const enum GSzrsadrDtoTypes { adresni_misto_kod = "number", okres_kod = "number", obec_kod = "number", cast_obce_kod = "number", ulice_kod = "number", posta_kod = "number", staveb_objekt_kod = "number", typ_cis_dom_kod = "number", cislo_domovni = "number", cislo_orientacni = "number", cislo_or_pismeno = "string", cas_odpovedi = "JsonDate", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", cpop = "string", cor = "string", dat_od = "JsonDate", dat_do = "JsonDate", cast_obce_kod_txt = "string", obec_kod_txt = "string", okres_kod_txt = "string", posta_kod_txt = "string", typ_cis_dom_kod_txt = "string", ulice_kod_txt = "string",}
	const enum GSzrsadrDtoTypeLengths { cislo_or_pismeno = 1, zmenu_prov = 12, cpop = 8, cor = 6,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohTisk.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohWflProfil.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Rozhraní - WFL Profil
	* @domain SluzCestyPlan
	* @businessObject PohWflProfil
	*/
	interface PohWflProfil {
		/**Detail WFL Profil*/
		read(rq?:Gordic.Poh.Interface.GPohWflProfilDto|CallParams<GServiceReadRequest<Gordic.Poh.Interface.GPohWflProfilDto>>): _Task<GServiceReadRequest<Gordic.Poh.Interface.GPohWflProfilDto>,GServiceReadResponse<Gordic.Poh.Interface.GPohWflProfilDto>>;
		/**Seznam WFL Profil*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Poh.Interface.GPohWflProfilDto>>;
		/**Oprava WFL Profil*/
		update(rq?:Gordic.Poh.Interface.GPohWflProfilDto|CallParams<GServiceSaveRequest<Gordic.Poh.Interface.GPohWflProfilDto>>): _Task<GServiceSaveRequest<Gordic.Poh.Interface.GPohWflProfilDto>,GServiceSaveResponse<Gordic.Poh.Interface.GPohWflProfilDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PohWflProfil: ServiceBase & Catalog.PohWflProfil;
	}
	const PohWflProfil: Client["PohWflProfil"];
}
declare namespace Gordic.Poh.Interface {
	/**Filtr pro WFL Profil*/
	const enum GPohWflProfilFilter {
		/**ixp*/
		ixp,
		/**lic*/
		lic,
		/**ixp_spis*/
		ixp_spis,
		/**priz_spis*/
		priz_spis,
		/**ixs_fun_akt*/
		ixs_fun_akt,
		/**ixs_su_akt*/
		ixs_su_akt,
		/**nazev*/
		nazev,
		/**akt_znacka*/
		akt_znacka,
		/**stav_dist*/
		stav_dist,
		/**stav_pis*/
		stav_pis,
		/**typ_ag*/
		typ_ag,
		/**ktg_typ*/
		ktg_typ,
		/**ixs_typ*/
		ixs_typ,
		/**s_prij*/
		s_prij,
		/**s_ssl*/
		s_ssl,
		/**dat_zmena*/
		dat_zmena,
		/**zmenu_prov*/
		zmenu_prov,
		/**s_ele*/
		s_ele,
		/**s_fyz*/
		s_fyz,
		/**misto_vzniku*/
		misto_vzniku,
		/**s_sgn*/
		s_sgn,
		/**dat_pod*/
		dat_pod,
		/**cs_akt_znacka*/
		cs_akt_znacka,
		/**priz_view_ssl*/
		priz_view_ssl,
		/**uzo*/
		uzo,
		/**spis_pl*/
		spis_pl,
		/**spis_znak*/
		spis_znak,
		/**ixs_fun_wfl*/
		ixs_fun_wfl,
		/**s_uloz*/
		s_uloz,
		/**dat_uloz*/
		dat_uloz,
		/**ixs_su_wfl*/
		ixs_su_wfl,
		/**s_odes*/
		s_odes,
		/**dat_mpd0*/
		dat_mpd0,
		/**priz_cj*/
		priz_cj,
		/**dat_vyriz*/
		dat_vyriz,
		/**ixs_cj*/
		ixs_cj,
		/**ixs_lpc*/
		ixs_lpc,
		/**puvod*/
		puvod,
		/**s_schval*/
		s_schval,
		/**umisteni*/
		umisteni,
		/**st_utaj_id*/
		st_utaj_id,
		/**wfl_pristup*/
		wfl_pristup,
		/**skar_znak*/
		skar_znak,
		/**skar_lhuta*/
		skar_lhuta,
		/**rok_spo_uda*/
		rok_spo_uda,
		/**ixp_top*/
		ixp_top,
		/**typ_spis*/
		typ_spis,
		/**barcode*/
		barcode,
		/**skar_lhuta_spra*/
		skar_lhuta_spra,
		/**ixs_ext*/
		ixs_ext,
		/**rok_skartace*/
		rok_skartace,
		/**ixs_spu*/
		ixs_spu,
		/**poc_listu*/
		poc_listu,
		/**poc_stran*/
		poc_stran,
		/**poc_kop*/
		poc_kop,
		/**poc_priloh*/
		poc_priloh,
		/**poc_l_priloh*/
		poc_l_priloh,
		/**cj*/
		cj,
		/**ico*/
		ico,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Isl\IGPohZaklad.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\IslFo\IGPohFoZaklad.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\IslFo\IGPohFyzSpravaNem.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\IslFo\IGPohFyzSpravaTP.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Filtr pro rozhodna obdobi fyzickych osob*/
	const enum GPohFilterFyzOsRozObd {
		/**pid.*/
		pid,
		/**identifikátor ddp.*/
		ixp_ddp,
		/**identifikátor esu.*/
		ixs_esu,
		/**rok.*/
		rok,
		/**počet mes pla sum rok.*/
		poc_mes_pla_sum_rok,
		/**c vyp.*/
		c_vyp,
		/**radek uhr.*/
		radek_uhr,
		/**stav.*/
		stav,
		/**datum spl.*/
		dat_spl,
		/**poznámka.*/
		poznamka,
		/**aktivita.*/
		aktivita,
		/**datum změny.*/
		dat_zmena,
		/**kod obce.*/
		kod_obce,
		/**identifikátor změnu provedl.*/
		zmenu_prov,
	}
	/**Filtr pro detail rozhodnych obdobi fyzickych osob*/
	const enum GPohFilterDetailFyzOsRozObd {
		/**pid.*/
		pid,
		/**datum od.*/
		dat_od,
		/**datum do.*/
		dat_do,
		/**datum tp od.*/
		dat_tp_od,
		/**datum tp do.*/
		dat_tp_do,
		/**id budovy.*/
		id_budovy,
		/**id jednotky.*/
		id_jednotky,
		/**počet mes pla.*/
		poc_mes_pla,
		/**poznámka.*/
		poznamka,
		/**aktivita.*/
		aktivita,
		/**datum změny.*/
		dat_zmena,
		/**identifikátor změnu provedl.*/
		zmenu_prov,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\IslSaldot\GOprTools.d.ts 

declare namespace Gordic.Poh.Interface.IslSaldot {
	interface GOprTools {
	}
	const enum GOprToolsNames {}
	const enum GOprToolsFragments {}
	const enum GOprToolsTypes {}
	const enum GOprToolsTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\IslSaldot\IGOdpadySmlouvy.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterSmlouvy {
		/**Autogenerated.*/
		ixs_esu,
		/**Autogenerated.*/
		ixp,
		/**Autogenerated.*/
		sml_nazev,
		/**Autogenerated.*/
		sml_popis,
		/**Autogenerated.*/
		esu_nazev,
		/**Autogenerated.*/
		esu_ico,
		/**Autogenerated.*/
		esu_adresa,
		/**Autogenerated.*/
		sml_stav,
		/**Autogenerated.*/
		sml_stav_txt,
		/**zda filtrovat osoby dostupne pro moje ixs_fun dle pamvprf a pamsppm*/
		dat_zmena,
		sml_sgn_txt,
		dat_uzavreni,
		dat_prij_pod,
		dat_platnost,
		dat_ucinnost,
		vs,
		ss,
		ks,
		ac_ag,
		ixs_typ,
		ac_sml_nad,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\IslSaldot\IGOprSmlDbOps.d.ts 

declare namespace Gordic.Poh.Interface {
	const enum ETypViewOzp {
		Vse=1,
		Kprevzeti=5,
		Prijate=10,
		KeSchvaleni=20,
		Schvalene=30,
		KOdeslani=34,
		KProplaceni=40,
		Proplacene=50,
		Zpetvzeti=90,
		Kzamitnuti=95,
		Zamitnute=100,
		Odlozene=110,
		Vracene=120,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\IslSaldot\IGSaldotSmlouvy.d.ts 

declare namespace Gordic.Poh.Interface {
	const enum VysledekKontrolyBUEnum {
		/**OK*/
		OK,
		/**Varování*/
		Varovani,
		/**Chyba*/
		Chyba,
		/**Kontrola nebyla provedena, protože chybí vstupní údaje*/
		Nezkontrolovano,
	}
	/**Filtr pro smlouvy saldot*/
	const enum GPohSaldotSmlouva {
		/**Autogenerated.*/
		ixs_esu,
		/**Autogenerated.*/
		ixp,
		/**Autogenerated.*/
		sml_nazev,
		/**Autogenerated.*/
		sml_popis,
		/**Autogenerated.*/
		esu_nazev,
		/**Autogenerated.*/
		esu_ico,
		/**Autogenerated.*/
		esu_adresa,
		/**Autogenerated.*/
		sml_stav,
		/**Autogenerated.*/
		sml_stav_txt,
		/**zda filtrovat osoby dostupne pro moje ixs_fun dle pamvprf a pamsppm*/
		dat_zmena,
		sml_sgn_txt,
		dat_uzavreni,
		dat_prij_pod,
		dat_platnost,
		dat_ucinnost,
		vs,
		ss,
		ks,
		ac_ag,
		ixs_typ,
		dat_iszr,
		celk_ok,
		/**vyrizujici ref*/
		ixs_fun_ref,
		/**vlastnik dokladu*/
		ixs_fun_wfl,
		/**oprsozp.aktivita*/
		aktivita,
		/**jestli ze je zadan filtr, je udelan LEFT JOIN na wflsspd*/
		je_v_epk,
		/**wflszps.zpus_vyriz, 0-nevyrizeno,2-zamitnuto, 1-povoleno(ale to tam nebude, pze pri schvaleni se radek z wflszps smaze),*/
		zpus_vyriz,
		/**wflspid.s_schval, vzdy je 0, jedine pokud doslo ke schvaleni*/
		s_schval,
		/**rok prijeti zadosti*/
		rok,
		/**pokud je tento filtr udela se jen count(*) a ulozi se do sloupce*/
		count,
		/**zaznamy kde ESU zacina ...*/
		ABCDfil,
		ko1fil,
		ko2fil,
		iszr_ok,
		termin,
		celk_ok_manual,
		nem_blok,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Poh\GPohFoRozObd.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Pomocna trida pro POSOH FO*/
	interface GPohFoRozObd {
	}
	const enum GPohFoRozObdNames {}
	const enum GPohFoRozObdFragments {}
	const enum GPohFoRozObdTypes {}
	const enum GPohFoRozObdTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Poh\GPohVlastnictvi.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Trida pro pomocne fce nad daty POH Vlastnictvi*/
	interface GPohVlastnictvi {
	}
	const enum GPohVlastnictviNames {}
	const enum GPohVlastnictviFragments {}
	const enum GPohVlastnictviTypes {}
	const enum GPohVlastnictviTypeLengths {}
}
declare namespace Gordic.Poh.Interface.GPohVlastnictvi {
	const enum Mesice {
		Zadny=0,
		Leden=1,
		Unor=2,
		Brezen=4,
		Duben=8,
		Kveten=16,
		Cerven=32,
		Cervenec=64,
		Srpen=128,
		Zari=256,
		Rijen=512,
		Listopad=1024,
		Prosinec=2048,
		MaskaNevyuziteBity=4095,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Poh\IGNSeznamPlatebPoh.d.ts 


//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GPohVyberFormulareDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro POSOH - vyber formulare*/
	interface GPohVyberFormulareDto {
		/**ixp formulare*/
		ixp_fmr?: string|null;
		/**nazev formulare*/
		nazev?: string|null;
	}
	const enum GPohVyberFormulareDtoNames { ixp_fmr = "ixp_fmr", nazev = "nazev",}
	const enum GPohVyberFormulareDtoFragments { ixp_fmr = "*", nazev = "*",}
	const enum GPohVyberFormulareDtoTypes { ixp_fmr = "string", nazev = "string",}
	const enum GPohVyberFormulareDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GPohVyberOsobyDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro POSOH - saldot overeni szr*/
	interface GPohVyberOsobyDto {
		/**id*/
		ixs_fun?: string|null;
		/**typ*/
		jmeno?: string|null;
	}
	const enum GPohVyberOsobyDtoNames { ixs_fun = "ixs_fun", jmeno = "jmeno",}
	const enum GPohVyberOsobyDtoFragments { ixs_fun = "*", jmeno = "*",}
	const enum GPohVyberOsobyDtoTypes { ixs_fun = "string", jmeno = "string",}
	const enum GPohVyberOsobyDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GPohVyberStavFormulareDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro POSOH - vyber stavu formulare*/
	interface GPohVyberStavFormulareDto {
		/**ixp formulare*/
		kod_stav?: number|null;
		/**nazev formulare*/
		nazev?: string|null;
	}
	const enum GPohVyberStavFormulareDtoNames { kod_stav = "kod_stav", nazev = "nazev",}
	const enum GPohVyberStavFormulareDtoFragments { kod_stav = "*", nazev = "*",}
	const enum GPohVyberStavFormulareDtoTypes { kod_stav = "number", nazev = "string",}
	const enum GPohVyberStavFormulareDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GPohZasilkaDTO.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro RcnPodpora*/
	interface GPohZasilkaDTO {
		/**ixp*/
		ixp?: string|null;
		/**typ*/
		typ?: string|null;
		/**typ*/
		enumTyp?: number|null;
	}
	const enum GPohZasilkaDTONames { ixp = "ixp", typ = "typ", enumTyp = "enumTyp",}
	const enum GPohZasilkaDTOFragments { ixp = "*", typ = "*", enumTyp = "*",}
	const enum GPohZasilkaDTOTypes { ixp = "string", typ = "string", enumTyp = "number",}
	const enum GPohZasilkaDTOTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GPohZpVyuzNemDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro RcnPodpora*/
	interface GPohZpVyuzNemDto {
		/**zp_vyuz_bud*/
		zp_vyuz_bud?: JsonDecimal|null;
		/**nazev*/
		nazev?: string|null;
		/**zkratka*/
		zkratka?: string|null;
		/**budjed*/
		budjed?: JsonDecimal|null;
	}
	const enum GPohZpVyuzNemDtoNames { zp_vyuz_bud = "zp_vyuz_bud", nazev = "nazev", zkratka = "zkratka", budjed = "budjed",}
	const enum GPohZpVyuzNemDtoFragments { zp_vyuz_bud = "*", nazev = "*", zkratka = "*", budjed = "*",}
	const enum GPohZpVyuzNemDtoTypes { zp_vyuz_bud = "JsonDecimal", nazev = "string", zkratka = "string", budjed = "JsonDecimal",}
	const enum GPohZpVyuzNemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GPostTestDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro Seznam*/
	interface GPostTestDto {
		/**DAN SKUP*/
		DAN_SKUP?: JsonDecimal|null;
		/**DAN SKUP TXT*/
		DAN_SKUP_TXT?: string|null;
		/**K V*/
		K_V?: JsonDecimal|null;
		/**K S*/
		K_S?: string|null;
		/**K XML*/
		K_XML?: string|null;
	}
	const enum GPostTestDtoNames { DAN_SKUP = "DAN_SKUP", DAN_SKUP_TXT = "DAN_SKUP_TXT", K_V = "K_V", K_S = "K_S", K_XML = "K_XML",}
	const enum GPostTestDtoFragments { DAN_SKUP = "main", DAN_SKUP_TXT = "main", K_V = "main", K_S = "main", K_XML = "main",}
	const enum GPostTestDtoTypes { DAN_SKUP = "JsonDecimal", DAN_SKUP_TXT = "string", K_V = "JsonDecimal", K_S = "string", K_XML = "string",}
	const enum GPostTestDtoTypeLengths { DAN_SKUP_TXT = 50, K_S = 15, K_XML = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GSaldotDuvodZamitnutiDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro POSOH - saldot overeni szr*/
	interface GSaldotDuvodZamitnutiDto {
		/**id*/
		id?: number|null;
		/**id*/
		klic?: string|null;
		/**typ*/
		text?: string|null;
	}
	const enum GSaldotDuvodZamitnutiDtoNames { id = "id", klic = "klic", text = "text",}
	const enum GSaldotDuvodZamitnutiDtoFragments { id = "*", klic = "*", text = "*",}
	const enum GSaldotDuvodZamitnutiDtoTypes { id = "number", klic = "string", text = "string",}
	const enum GSaldotDuvodZamitnutiDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GSaldotKontrolaDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro POSOH - saldot kontroly*/
	interface GSaldotKontrolaDto {
		/**id*/
		id?: number|null;
		/**zkratka*/
		zkratka?: string|null;
		/**text*/
		text?: string|null;
	}
	const enum GSaldotKontrolaDtoNames { id = "id", zkratka = "zkratka", text = "text",}
	const enum GSaldotKontrolaDtoFragments { id = "*", zkratka = "*", text = "*",}
	const enum GSaldotKontrolaDtoTypes { id = "number", zkratka = "string", text = "string",}
	const enum GSaldotKontrolaDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GSaldotSzrDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro POSOH - saldot overeni szr*/
	interface GSaldotSzrDto {
		/**ixp*/
		id?: string|null;
		/**typ*/
		text?: string|null;
	}
	const enum GSaldotSzrDtoNames { id = "id", text = "text",}
	const enum GSaldotSzrDtoFragments { id = "*", text = "*",}
	const enum GSaldotSzrDtoTypes { id = "string", text = "string",}
	const enum GSaldotSzrDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\GSaldotVyberNovaFunkceDto.d.ts 

declare namespace Gordic.Poh.Interface {
	/**DTO pro POSOH - saldot overeni szr*/
	interface GSaldotVyberNovaFunkceDto {
		/**id*/
		ixs_fun?: string|null;
		/**typ*/
		jmeno?: string|null;
	}
	const enum GSaldotVyberNovaFunkceDtoNames { ixs_fun = "ixs_fun", jmeno = "jmeno",}
	const enum GSaldotVyberNovaFunkceDtoFragments { ixs_fun = "*", jmeno = "*",}
	const enum GSaldotVyberNovaFunkceDtoTypes { ixs_fun = "string", jmeno = "string",}
	const enum GSaldotVyberNovaFunkceDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGPohVyberFormulare.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterGPohVyberFormulare {
		/**ixp formulare*/
		ixp_fmr,
		/**nazev*/
		nazev,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGPohVyberOsoby.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterGPohVyberOsoby {
		/**id*/
		ixs_fun,
		/**jmeno*/
		jmeno,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGPohVyberStavFormulare.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterGPohVyberStavFormulare {
		/**skod tav vytezeni*/
		kod_stav,
		/**stav vytezeni txt*/
		stav,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGPohZasilka.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterTypZasilky {
		/**ixs*/
		ixp,
		/**typ*/
		typ,
	}
	/**typy dokumentu ktere budeme pouzivat*/
	const enum GPohTypyDokumentu {
		ObycDokument=0,
		Vyzva=1,
		Prikaz=2,
		RapFormOhlaseniPrihlaska=3,
		RapFormOhlaseniOdhlaska=4,
		RapFormOhlaseniVratka=5,
		RapFormZadostZastup=6,
		RapFormZadostZastupKod=7,
		Vse=99,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGPohZpVyuzNem.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterZpusobVyuziti {
		/**zp_vyuz_bud*/
		zp_vyuz_bud,
		/**nazev*/
		nazev,
		/**zkratka*/
		zkratka,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGPostTest.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Filtr pro POKCDAS*/
	const enum GSeznamFilter {
		/**DAN_SKUP*/
		DAN_SKUP,
		/**DAN_SKUP_TXT*/
		DAN_SKUP_TXT,
		/**K_V*/
		K_V,
		/**K_S*/
		K_S,
		/**K_XML*/
		K_XML,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGSaldotDuvodZamitnuti.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterSaldotDuvodZamitnuti {
		/**id*/
		id,
		/**zkratka*/
		zkratka,
		/**text*/
		text,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGSaldotKontrola.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterSaldotSmlouvaKontrola {
		/**id*/
		id,
		/**zkratka*/
		zkratka,
		/**text*/
		text,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGSaldotKontrola2.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterSaldotSmlouvaKontrola2 {
		/**id*/
		id,
		/**zkratka*/
		zkratka,
		/**text*/
		text,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGSaldotSzr.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterOvereniSzrSaldot {
		/**id*/
		id,
		/**text*/
		text,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Prefabs\IGVyberNovaFunkce.d.ts 

declare namespace Gordic.Poh.Interface {
	/**Autogenerated.*/
	const enum FilterSaldotVyberNovaFunkce {
		/**id*/
		ixs_fun,
		/**zkratka*/
		jmeno,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Poh.Interface\Saldot\GOprTools.d.ts 

declare namespace Gordic.Poh.Interface {
	interface GOprTools {
	}
	const enum GOprToolsNames {}
	const enum GOprToolsFragments {}
	const enum GOprToolsTypes {}
	const enum GOprToolsTypeLengths {}
}

//#endregion

