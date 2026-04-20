/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       spi.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Spi.Interface\Gordic.Spi.Interface.csproj
*    created     2026-02-16 14:33:45
*    files       Base\Gordic.Spi.Interface.IGSpiTsCommon.d.ts
*                Dto\GBalikDto.d.ts
*                Dto\GBalikListDto.d.ts
*                Dto\GBalikPisemnostDto.d.ts
*                Dto\GEnums.d.ts
*                Dto\GNeaktivDokSpisDto.d.ts
*                Dto\GNeevidDokSpisDto.d.ts
*                Dto\GObsahBalikuDto.d.ts
*                Dto\GPisemnostNeevidovanaDto.d.ts
*                Dto\GSpiszupDto.d.ts
*                Dto\GSpiUniversalListDto.d.ts
*                Dto\GSpivzupDto.d.ts
*                Dto\GUlozneMistoDto.d.ts
*                Dto\GVypujckyDto.d.ts
*                Dto\GVypujcniListekDto.d.ts
*                Dto\SpiListDto.d.ts
*                Dto\Base\GDokSpisSpiListBaseDto.d.ts
*                Gin\IGBalik.d.ts
*                Gin\IGPisemnostNeevidovana.d.ts
*                Gin\IGSpisovna.d.ts
*                Gin\IGUlozneMisto.d.ts
*                Gin\IGVypujcniListek.d.ts
*                Seznamy\Dto\GHledaniBalikuDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Base\Gordic.Spi.Interface.IGSpiTsCommon.d.ts 

declare namespace Gordic.Spi.Interface {
	/**v7ber spisovny*/
	interface GSkartRizeniFiltrBaseDto {
		/**Typ zobrazeni seznamu*/
		TypZobrazeniSeznamu?: Gordic.Spi.Interface.TypZobrazeniSeznamuSpi|null;
		/**Ixs skart. navrhu*/
		IxsSka?: string|null;
		/**Typ skart dokladu skartace*/
		TypSkartDokladu?: Gordic.Spi.Interface.TypSkartacnihoDokladu|null;
		/**vatit nactena data*/
		NacistData?: boolean|null;
		/**zapisovat do temptable spitska*/
		ZapisovatDoTemptable?: boolean|null;
		/**Skart rizeni po entitach*/
		SkartRizeniPoEntitach?: boolean|null;
	}
	const enum GSkartRizeniFiltrBaseDtoNames { TypZobrazeniSeznamu = "TypZobrazeniSeznamu", IxsSka = "IxsSka", TypSkartDokladu = "TypSkartDokladu", NacistData = "NacistData", ZapisovatDoTemptable = "ZapisovatDoTemptable", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GSkartRizeniFiltrBaseDtoFragments { TypZobrazeniSeznamu = "*", IxsSka = "*", TypSkartDokladu = "*", NacistData = "*", ZapisovatDoTemptable = "*", SkartRizeniPoEntitach = "*",}
	const enum GSkartRizeniFiltrBaseDtoTypes { TypZobrazeniSeznamu = "Gordic.Spi.Interface.TypZobrazeniSeznamuSpi", IxsSka = "string", TypSkartDokladu = "Gordic.Spi.Interface.TypSkartacnihoDokladu", NacistData = "boolean", ZapisovatDoTemptable = "boolean", SkartRizeniPoEntitach = "boolean",}
	const enum GSkartRizeniFiltrBaseDtoTypeLengths {}
	/**v7ber spisovny*/
	interface SkartRizeniContext {
		/**Skart rizeni po entitach*/
		SkartRizeniPoEntitach?: boolean|null;
		/**je verze DB pro nové filtru dle ULM a SU*/
		IfNewFiltrSkartRizeni?: boolean|null;
		/**Typ skart rizeni*/
		TypSkartRizeni?: Gordic.Spi.Interface.TypSkartacnihoRizeni|null;
		/**Typ skart dokladu*/
		TypSkartDokladu?: Gordic.Spi.Interface.TypSkartacnihoDokladu|null;
		/**Typ zobrazeni seznamu*/
		TypZobrazeniSeznamu?: Gordic.Spi.Interface.TypZobrazeniSeznamuSpi|null;
		/**zda NDA*/
		IfNDA?: boolean|null;
	}
	const enum SkartRizeniContextNames { SkartRizeniPoEntitach = "SkartRizeniPoEntitach", IfNewFiltrSkartRizeni = "IfNewFiltrSkartRizeni", TypSkartRizeni = "TypSkartRizeni", TypSkartDokladu = "TypSkartDokladu", TypZobrazeniSeznamu = "TypZobrazeniSeznamu", IfNDA = "IfNDA",}
	const enum SkartRizeniContextFragments { SkartRizeniPoEntitach = "*", IfNewFiltrSkartRizeni = "*", TypSkartRizeni = "*", TypSkartDokladu = "*", TypZobrazeniSeznamu = "*", IfNDA = "*",}
	const enum SkartRizeniContextTypes { SkartRizeniPoEntitach = "boolean", IfNewFiltrSkartRizeni = "boolean", TypSkartRizeni = "Gordic.Spi.Interface.TypSkartacnihoRizeni", TypSkartDokladu = "Gordic.Spi.Interface.TypSkartacnihoDokladu", TypZobrazeniSeznamu = "Gordic.Spi.Interface.TypZobrazeniSeznamuSpi", IfNDA = "boolean",}
	const enum SkartRizeniContextTypeLengths {}
	/**v7ber spisovny*/
	interface ResultDataDto {
		/**result info*/
		resultInfo?: Gordic.Gin.Interface.GResultInfo[]|null;
		/**data*/
		data?: object|null;
	}
	const enum ResultDataDtoNames { resultInfo = "resultInfo", data = "data",}
	const enum ResultDataDtoFragments { resultInfo = "*", data = "*",}
	const enum ResultDataDtoTypes { resultInfo = "Gordic.Gin.Interface.GResultInfo[]", data = "object",}
	const enum ResultDataDtoTypeLengths {}
	/**akce skart.rizeni vstup*/
	interface SkartRizeniAkceInputDto {
		/**rok skartace*/
		rokSkartace?: number|null;
	}
	const enum SkartRizeniAkceInputDtoNames { rokSkartace = "rokSkartace",}
	const enum SkartRizeniAkceInputDtoFragments { rokSkartace = "*",}
	const enum SkartRizeniAkceInputDtoTypes { rokSkartace = "number",}
	const enum SkartRizeniAkceInputDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GenerovaniSipListDto extends Gordic.Wfl.Interface.GDokSpisListDto {
		priz_pos_na?: number|null;
	}
	const enum GenerovaniSipListDtoNames { priz_pos_na = "priz_pos_na", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_fun_zprac = "nazev_fun_zprac", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GenerovaniSipListDtoFragments { priz_pos_na = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_fun_zprac = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GenerovaniSipListDtoTypes { priz_pos_na = "number", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_fun_zprac = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GenerovaniSipListDtoTypeLengths { lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
	/**v7ber spisovny*/
	interface PosunRokuSpoUdaInputDto extends Gordic.Spi.Interface.OpravaSkartRizeniBaseDto {
		/**ixs spisovny*/
		ixsSpi?: string|null;
		/**rezim*/
		rezim?: number|null;
	}
	const enum PosunRokuSpoUdaInputDtoNames { ixsSpi = "ixsSpi", rezim = "rezim", dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum PosunRokuSpoUdaInputDtoFragments { ixsSpi = "*", rezim = "*", dat_zmena = "*", IxsEntity = "*",}
	const enum PosunRokuSpoUdaInputDtoTypes { ixsSpi = "string", rezim = "number", dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum PosunRokuSpoUdaInputDtoTypeLengths {}
	/**DTO pro funkce skartace*/
	interface GZmenaRokuSkartaceInputDto {
		/**identifikátory entit*/
		IDs?: string[]|null;
		/**rok skartace*/
		rokSkatace?: number|null;
	}
	const enum GZmenaRokuSkartaceInputDtoNames { IDs = "IDs", rokSkatace = "rokSkatace",}
	const enum GZmenaRokuSkartaceInputDtoFragments { IDs = "*", rokSkatace = "*",}
	const enum GZmenaRokuSkartaceInputDtoTypes { IDs = "string[]", rokSkatace = "number",}
	const enum GZmenaRokuSkartaceInputDtoTypeLengths {}
	/**DTO pro funkce skartace*/
	interface GZtraceniInputDto {
		/**identifikátory entity*/
		IDEntity?: string|null;
		/**rezim*/
		rezim?: number|null;
		/**datum zmeny*/
		datZmena?: JsonDate|null;
		/**duvod*/
		duvod?: string|null;
	}
	const enum GZtraceniInputDtoNames { IDEntity = "IDEntity", rezim = "rezim", datZmena = "datZmena", duvod = "duvod",}
	const enum GZtraceniInputDtoFragments { IDEntity = "*", rezim = "*", datZmena = "*", duvod = "*",}
	const enum GZtraceniInputDtoTypes { IDEntity = "string", rezim = "number", datZmena = "JsonDate", duvod = "string",}
	const enum GZtraceniInputDtoTypeLengths {}
	/**v7ber spisovny*/
	interface PosunRokuSpoUdaOutputDto extends Gordic.Spi.Interface.OpravaSkartRizeniBaseDto {
		/**ixs spisovny*/
		rok_kon_spu?: number|null;
		/**ixs spisovny*/
		vysledek?: Gordic.Gin.Interface.GResultInfo|null;
	}
	const enum PosunRokuSpoUdaOutputDtoNames { rok_kon_spu = "rok_kon_spu", vysledek = "vysledek", dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum PosunRokuSpoUdaOutputDtoFragments { rok_kon_spu = "*", vysledek = "*", dat_zmena = "*", IxsEntity = "*",}
	const enum PosunRokuSpoUdaOutputDtoTypes { rok_kon_spu = "number", vysledek = "Gordic.Gin.Interface.GResultInfo", dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum PosunRokuSpoUdaOutputDtoTypeLengths {}
	/**v7ber spisovny*/
	interface ZmenaSpisZnakuInputDto {
		/**ID balíku*/
		ixsZup?: string|null;
		/**ID spisovny*/
		ixsSpi?: string|null;
		/**priznak*/
		prizSkZnPrep?: number|null;
		/**priznak editace vnorenych*/
		prizEditVnor?: boolean|null;
		/**ssl profil - sp.znak, vecna skupina, skart. znak*/
		SslProfil?: Gordic.Wfl.Interface.GSslProfilStruktura|null;
		/**Typ skart rizeni*/
		datZmena?: JsonDate|null;
	}
	const enum ZmenaSpisZnakuInputDtoNames { ixsZup = "ixsZup", ixsSpi = "ixsSpi", prizSkZnPrep = "prizSkZnPrep", prizEditVnor = "prizEditVnor", SslProfil = "SslProfil", datZmena = "datZmena",}
	const enum ZmenaSpisZnakuInputDtoFragments { ixsZup = "*", ixsSpi = "*", prizSkZnPrep = "*", prizEditVnor = "*", SslProfil = "*", datZmena = "*",}
	const enum ZmenaSpisZnakuInputDtoTypes { ixsZup = "string", ixsSpi = "string", prizSkZnPrep = "number", prizEditVnor = "boolean", SslProfil = "Gordic.Wfl.Interface.GSslProfilStruktura", datZmena = "JsonDate",}
	const enum ZmenaSpisZnakuInputDtoTypeLengths {}
	/**Oprava skart rizeni predek*/
	interface OpravaSkartRizeniBaseDto extends Gordic.Gin.Interface.GEntityDto {
		/**datum zmeny*/
		dat_zmena?: JsonDate|null;
	}
	const enum OpravaSkartRizeniBaseDtoNames { dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum OpravaSkartRizeniBaseDtoFragments { dat_zmena = "*", IxsEntity = "*",}
	const enum OpravaSkartRizeniBaseDtoTypes { dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum OpravaSkartRizeniBaseDtoTypeLengths {}
	/**Oprava skart rizeni predek*/
	interface OpravaSkartRizeniImputBaseDto extends Gordic.Spi.Interface.OpravaSkartRizeniBaseDto {
		/**ixs skartacniho rizeni*/
		ixsSka?: string|null;
		/**ID skart.rizeni NDA*/
		idSkartRizeniNDA?: string|null;
		/**ID dokumentu obsahujici posouzeni NDA*/
		ixpDokPosouzeniNDA?: string|null;
		/**ixb Nda*/
		ixbNda?: string|null;
		/**ixb Nda*/
		ZobrazeniPoEntitach?: boolean|null;
	}
	const enum OpravaSkartRizeniImputBaseDtoNames { ixsSka = "ixsSka", idSkartRizeniNDA = "idSkartRizeniNDA", ixpDokPosouzeniNDA = "ixpDokPosouzeniNDA", ixbNda = "ixbNda", ZobrazeniPoEntitach = "ZobrazeniPoEntitach", dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum OpravaSkartRizeniImputBaseDtoFragments { ixsSka = "*", idSkartRizeniNDA = "*", ixpDokPosouzeniNDA = "*", ixbNda = "*", ZobrazeniPoEntitach = "*", dat_zmena = "*", IxsEntity = "*",}
	const enum OpravaSkartRizeniImputBaseDtoTypes { ixsSka = "string", idSkartRizeniNDA = "string", ixpDokPosouzeniNDA = "string", ixbNda = "string", ZobrazeniPoEntitach = "boolean", dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum OpravaSkartRizeniImputBaseDtoTypeLengths {}
	/**Oprava skart rizeni predek*/
	interface GNacteniDatNDAImputDto {
		/**typ davky*/
		typDavky?: Gordic.Spi.Interface.TypDavkyZNDA|null;
		/**data*/
		data?: Gordic.Spi.Interface.GSkartRizeniDleNDAStru[]|null;
		/**ID dokumentu obsahujici posouzeni NDA*/
		ixpDokPosouzeniNDA?: string|null;
		/**Ixs skart. navrhu*/
		ixsSka?: string|null;
		/**typ seznamu spi*/
		typSeznamu?: Gordic.Spi.Interface.TypZobrazeniSeznamuSpi|null;
		/**show info o nutnem reloadu*/
		showInfoONutnemReloadu?: boolean|null;
		/**anonymne*/
		anonymne?: boolean|null;
		/**anonymne*/
		filePath?: string|null;
		/**davka Xml*/
		davkaXml?: any|null;
	}
	const enum GNacteniDatNDAImputDtoNames { typDavky = "typDavky", data = "data", ixpDokPosouzeniNDA = "ixpDokPosouzeniNDA", ixsSka = "ixsSka", typSeznamu = "typSeznamu", showInfoONutnemReloadu = "showInfoONutnemReloadu", anonymne = "anonymne", filePath = "filePath", davkaXml = "davkaXml",}
	const enum GNacteniDatNDAImputDtoFragments { typDavky = "*", data = "*", ixpDokPosouzeniNDA = "*", ixsSka = "*", typSeznamu = "*", showInfoONutnemReloadu = "*", anonymne = "*", filePath = "*", davkaXml = "*",}
	const enum GNacteniDatNDAImputDtoTypes { typDavky = "Gordic.Spi.Interface.TypDavkyZNDA", data = "Gordic.Spi.Interface.GSkartRizeniDleNDAStru[]", ixpDokPosouzeniNDA = "string", ixsSka = "string", typSeznamu = "Gordic.Spi.Interface.TypZobrazeniSeznamuSpi", showInfoONutnemReloadu = "boolean", anonymne = "boolean", filePath = "string", davkaXml = "any",}
	const enum GNacteniDatNDAImputDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GOpravaSkartRizeniImputDto extends Gordic.Spi.Interface.OpravaSkartRizeniImputBaseDto {
		TypOperace?: Gordic.Spi.Interface.SpicposEnum|null;
		/**zda NDA*/
		isBalik?: boolean|null;
	}
	const enum GOpravaSkartRizeniImputDtoNames { TypOperace = "TypOperace", isBalik = "isBalik", ixsSka = "ixsSka", idSkartRizeniNDA = "idSkartRizeniNDA", ixpDokPosouzeniNDA = "ixpDokPosouzeniNDA", ixbNda = "ixbNda", ZobrazeniPoEntitach = "ZobrazeniPoEntitach", dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum GOpravaSkartRizeniImputDtoFragments { TypOperace = "*", isBalik = "*", ixsSka = "*", idSkartRizeniNDA = "*", ixpDokPosouzeniNDA = "*", ixbNda = "*", ZobrazeniPoEntitach = "*", dat_zmena = "*", IxsEntity = "*",}
	const enum GOpravaSkartRizeniImputDtoTypes { TypOperace = "Gordic.Spi.Interface.SpicposEnum", isBalik = "boolean", ixsSka = "string", idSkartRizeniNDA = "string", ixpDokPosouzeniNDA = "string", ixbNda = "string", ZobrazeniPoEntitach = "boolean", dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum GOpravaSkartRizeniImputDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GOpravaSkartRizeniOutputDto extends Gordic.Spi.Interface.OpravaSkartRizeniBaseDto {
		info?: string|null;
	}
	const enum GOpravaSkartRizeniOutputDtoNames { info = "info", dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum GOpravaSkartRizeniOutputDtoFragments { info = "*", dat_zmena = "*", IxsEntity = "*",}
	const enum GOpravaSkartRizeniOutputDtoTypes { info = "string", dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum GOpravaSkartRizeniOutputDtoTypeLengths {}
	/**Desa users*/
	interface GDesaUsersDto {
		/**Roles*/
		Seznam?: Gordic.Spi.Interface.GDesaUsersSeznamDto[]|null;
		/**Roles*/
		Roles?: Gordic.Spi.Interface.GDesaUsersRoleDto[]|null;
		/**Roles*/
		Locations?: Gordic.Spi.Interface.GDesaUsersLocationDto[]|null;
	}
	const enum GDesaUsersDtoNames { Seznam = "Seznam", Roles = "Roles", Locations = "Locations",}
	const enum GDesaUsersDtoFragments { Seznam = "*", Roles = "*", Locations = "*",}
	const enum GDesaUsersDtoTypes { Seznam = "Gordic.Spi.Interface.GDesaUsersSeznamDto[]", Roles = "Gordic.Spi.Interface.GDesaUsersRoleDto[]", Locations = "Gordic.Spi.Interface.GDesaUsersLocationDto[]",}
	const enum GDesaUsersDtoTypeLengths {}
	/**Desa users - přehled:~*/
	interface GDesaUsersSeznamDto {
		/**DBCOLUMN:Seznam.id_user*/
		id_user?: string|null;
		/**DBCOLUMN:Seznam.name*/
		name?: string|null;
		/**DBCOLUMN:Seznam.surname*/
		surname?: string|null;
		/**DBCOLUMN:Seznam.email*/
		email?: string|null;
		/**DBCOLUMN:Seznam.login*/
		login?: string|null;
		/**DBCOLUMN:Seznam.password*/
		password?: string|null;
		/**DBCOLUMN:Seznam.passwordhash*/
		passwordhash?: string|null;
		/**DBCOLUMN:Seznam.isSuperAdmin*/
		isSuperAdmin?: boolean|null;
		/**DBCOLUMN:Seznam.isSuperAdminSpecified*/
		isSuperAdminSpecified?: boolean|null;
		/**Roles*/
		Role?: Gordic.Spi.Interface.GDesaUsersRoleDto[]|null;
		/**Roles*/
		Location?: Gordic.Spi.Interface.GDesaUsersLocationDto[]|null;
	}
	const enum GDesaUsersSeznamDtoNames { id_user = "id_user", name = "name", surname = "surname", email = "email", login = "login", password = "password", passwordhash = "passwordhash", isSuperAdmin = "isSuperAdmin", isSuperAdminSpecified = "isSuperAdminSpecified", Role = "Role", Location = "Location",}
	const enum GDesaUsersSeznamDtoFragments { id_user = "*", name = "*", surname = "*", email = "*", login = "*", password = "*", passwordhash = "*", isSuperAdmin = "*", isSuperAdminSpecified = "*", Role = "*", Location = "*",}
	const enum GDesaUsersSeznamDtoTypes { id_user = "string", name = "string", surname = "string", email = "string", login = "string", password = "string", passwordhash = "string", isSuperAdmin = "boolean", isSuperAdminSpecified = "boolean", Role = "Gordic.Spi.Interface.GDesaUsersRoleDto[]", Location = "Gordic.Spi.Interface.GDesaUsersLocationDto[]",}
	const enum GDesaUsersSeznamDtoTypeLengths { id_user = 100, name = 100, surname = 100, email = 100, login = 30, password = 30, passwordhash = 100,}
	/**role:~*/
	interface GDesaUsersRoleDto {
		/**login*/
		login?: string|null;
		/**RoleAcr*/
		RoleAcr?: string|null;
	}
	const enum GDesaUsersRoleDtoNames { login = "login", RoleAcr = "RoleAcr",}
	const enum GDesaUsersRoleDtoFragments { login = "*", RoleAcr = "*",}
	const enum GDesaUsersRoleDtoTypes { login = "string", RoleAcr = "string",}
	const enum GDesaUsersRoleDtoTypeLengths {}
	/**Locations:~*/
	interface GDesaUsersLocationDto {
		/**login*/
		login?: string|null;
		/**Locations Acr*/
		LocationAcr?: string|null;
	}
	const enum GDesaUsersLocationDtoNames { login = "login", LocationAcr = "LocationAcr",}
	const enum GDesaUsersLocationDtoFragments { login = "*", LocationAcr = "*",}
	const enum GDesaUsersLocationDtoTypes { login = "string", LocationAcr = "string",}
	const enum GDesaUsersLocationDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSkartRizeniFiltrDto extends Gordic.Spi.Interface.GSkartRizeniFiltrBaseDto {
		/**skar. znak*/
		SkarZnak?: string|null;
		/**fyzicky*/
		Fyzicky?: boolean|null;
		/**hybridni fyzicky*/
		HybridniFyzicky?: boolean|null;
		/**hybridni elektronicky*/
		HybridniElektronicky?: boolean|null;
		/**elektronicky*/
		Elektronicky?: boolean|null;
	}
	const enum GSkartRizeniFiltrDtoNames { SkarZnak = "SkarZnak", Fyzicky = "Fyzicky", HybridniFyzicky = "HybridniFyzicky", HybridniElektronicky = "HybridniElektronicky", Elektronicky = "Elektronicky", TypZobrazeniSeznamu = "TypZobrazeniSeznamu", IxsSka = "IxsSka", TypSkartDokladu = "TypSkartDokladu", NacistData = "NacistData", ZapisovatDoTemptable = "ZapisovatDoTemptable", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GSkartRizeniFiltrDtoFragments { SkarZnak = "*", Fyzicky = "*", HybridniFyzicky = "*", HybridniElektronicky = "*", Elektronicky = "*", TypZobrazeniSeznamu = "*", IxsSka = "*", TypSkartDokladu = "*", NacistData = "*", ZapisovatDoTemptable = "*", SkartRizeniPoEntitach = "*",}
	const enum GSkartRizeniFiltrDtoTypes { SkarZnak = "string", Fyzicky = "boolean", HybridniFyzicky = "boolean", HybridniElektronicky = "boolean", Elektronicky = "boolean", TypZobrazeniSeznamu = "Gordic.Spi.Interface.TypZobrazeniSeznamuSpi", IxsSka = "string", TypSkartDokladu = "Gordic.Spi.Interface.TypSkartacnihoDokladu", NacistData = "boolean", ZapisovatDoTemptable = "boolean", SkartRizeniPoEntitach = "boolean",}
	const enum GSkartRizeniFiltrDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GPripraveSkartRizeniFiltrDto {
		/**ixs uloznych mist*/
		IxsUlozMist?: string[]|null;
		/**ixs spisovych uzlu*/
		IxsSu?: string[]|null;
		/**rokSkartace*/
		rokSkartace?: number|null;
		/**rezim*/
		vlastni?: boolean|null;
		/**typ filtru*/
		typFiltru?: Gordic.Spi.Interface.TypFiltruSkartacnihoRizeni|null;
		/**mod*/
		mod?: Gordic.Spi.Interface.TypSkartacnihoRizeni|null;
	}
	const enum GPripraveSkartRizeniFiltrDtoNames { IxsUlozMist = "IxsUlozMist", IxsSu = "IxsSu", rokSkartace = "rokSkartace", vlastni = "vlastni", typFiltru = "typFiltru", mod = "mod",}
	const enum GPripraveSkartRizeniFiltrDtoFragments { IxsUlozMist = "*", IxsSu = "*", rokSkartace = "*", vlastni = "*", typFiltru = "*", mod = "*",}
	const enum GPripraveSkartRizeniFiltrDtoTypes { IxsUlozMist = "string[]", IxsSu = "string[]", rokSkartace = "number", vlastni = "boolean", typFiltru = "Gordic.Spi.Interface.TypFiltruSkartacnihoRizeni", mod = "Gordic.Spi.Interface.TypSkartacnihoRizeni",}
	const enum GPripraveSkartRizeniFiltrDtoTypeLengths {}
	/**souhrn info dto*/
	interface GSudSouhrnInfoDto extends Gordic.Spi.Interface.GSpiSouhrnInfoBaseDto {
	}
	const enum GSudSouhrnInfoDtoNames { LoginInfoDto = "LoginInfoDto",}
	const enum GSudSouhrnInfoDtoFragments { LoginInfoDto = "*",}
	const enum GSudSouhrnInfoDtoTypes { LoginInfoDto = "Gordic.Wfl.Interface.GLoginInfoDto",}
	const enum GSudSouhrnInfoDtoTypeLengths {}
	/**souhrn info dto*/
	interface GSpiSouhrnInfoBaseDto extends Gordic.Wfl.Interface.GWflSouhrnInfoBaseDto {
	}
	const enum GSpiSouhrnInfoBaseDtoNames { LoginInfoDto = "LoginInfoDto",}
	const enum GSpiSouhrnInfoBaseDtoFragments { LoginInfoDto = "*",}
	const enum GSpiSouhrnInfoBaseDtoTypes { LoginInfoDto = "Gordic.Wfl.Interface.GLoginInfoDto",}
	const enum GSpiSouhrnInfoBaseDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSkartRizeniKontrolaInputDto extends Gordic.Spi.Interface.GPripravaSkartRizeniInputBaserDto {
		/**vymazat temp table*/
		VymazatTempTable?: boolean|null;
	}
	const enum GSkartRizeniKontrolaInputDtoNames { VymazatTempTable = "VymazatTempTable", RokSkartace = "RokSkartace", TypSkartRizeni = "TypSkartRizeni", IDs = "IDs", IxsSka = "IxsSka", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GSkartRizeniKontrolaInputDtoFragments { VymazatTempTable = "*", RokSkartace = "*", TypSkartRizeni = "*", IDs = "*", IxsSka = "*", SkartRizeniPoEntitach = "*",}
	const enum GSkartRizeniKontrolaInputDtoTypes { VymazatTempTable = "boolean", RokSkartace = "number", TypSkartRizeni = "Gordic.Spi.Interface.TypSkartacnihoRizeni", IDs = "string[]", IxsSka = "string", SkartRizeniPoEntitach = "boolean",}
	const enum GSkartRizeniKontrolaInputDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSkartRizeniAkceInputDto extends Gordic.Spi.Interface.GPripravaSkartRizeniInputBaserDto {
		/**typ akce*/
		TypAkce?: Gordic.Spi.Interface.TypAkceSkartacnihoRizeni|null;
		/**typ formy dokumentu*/
		TypFormy?: Gordic.Wfl.Interface.TypFormyDokumentu|null;
	}
	const enum GSkartRizeniAkceInputDtoNames { TypAkce = "TypAkce", TypFormy = "TypFormy", RokSkartace = "RokSkartace", TypSkartRizeni = "TypSkartRizeni", IDs = "IDs", IxsSka = "IxsSka", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GSkartRizeniAkceInputDtoFragments { TypAkce = "*", TypFormy = "*", RokSkartace = "*", TypSkartRizeni = "*", IDs = "*", IxsSka = "*", SkartRizeniPoEntitach = "*",}
	const enum GSkartRizeniAkceInputDtoTypes { TypAkce = "Gordic.Spi.Interface.TypAkceSkartacnihoRizeni", TypFormy = "Gordic.Wfl.Interface.TypFormyDokumentu", RokSkartace = "number", TypSkartRizeni = "Gordic.Spi.Interface.TypSkartacnihoRizeni", IDs = "string[]", IxsSka = "string", SkartRizeniPoEntitach = "boolean",}
	const enum GSkartRizeniAkceInputDtoTypeLengths {}
	/**DTO pro funkce skartace*/
	interface GSkartRizeniInputBaseDto {
		/**identifikátory entit*/
		IDs?: string[]|null;
		/**ID skartaceniho rizeni*/
		IxsSka?: string|null;
		/**skart rizeni po entitach*/
		SkartRizeniPoEntitach?: boolean|null;
	}
	const enum GSkartRizeniInputBaseDtoNames { IDs = "IDs", IxsSka = "IxsSka", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GSkartRizeniInputBaseDtoFragments { IDs = "*", IxsSka = "*", SkartRizeniPoEntitach = "*",}
	const enum GSkartRizeniInputBaseDtoTypes { IDs = "string[]", IxsSka = "string", SkartRizeniPoEntitach = "boolean",}
	const enum GSkartRizeniInputBaseDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GPripravaSkartRizeniInputBaserDto extends Gordic.Spi.Interface.GSkartRizeniInputBaseDto {
		/**skar. znak*/
		RokSkartace?: number|null;
		/**skar. znak*/
		TypSkartRizeni?: Gordic.Spi.Interface.TypSkartacnihoRizeni|null;
	}
	const enum GPripravaSkartRizeniInputBaserDtoNames { RokSkartace = "RokSkartace", TypSkartRizeni = "TypSkartRizeni", IDs = "IDs", IxsSka = "IxsSka", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GPripravaSkartRizeniInputBaserDtoFragments { RokSkartace = "*", TypSkartRizeni = "*", IDs = "*", IxsSka = "*", SkartRizeniPoEntitach = "*",}
	const enum GPripravaSkartRizeniInputBaserDtoTypes { RokSkartace = "number", TypSkartRizeni = "Gordic.Spi.Interface.TypSkartacnihoRizeni", IDs = "string[]", IxsSka = "string", SkartRizeniPoEntitach = "boolean",}
	const enum GPripravaSkartRizeniInputBaserDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GProvedeniSkartRizeniInputBaseDto extends Gordic.Spi.Interface.GSkartRizeniInputBaseDto {
		/**skar. znak*/
		Rezim?: number|null;
	}
	const enum GProvedeniSkartRizeniInputBaseDtoNames { Rezim = "Rezim", IDs = "IDs", IxsSka = "IxsSka", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GProvedeniSkartRizeniInputBaseDtoFragments { Rezim = "*", IDs = "*", IxsSka = "*", SkartRizeniPoEntitach = "*",}
	const enum GProvedeniSkartRizeniInputBaseDtoTypes { Rezim = "number", IDs = "string[]", IxsSka = "string", SkartRizeniPoEntitach = "boolean",}
	const enum GProvedeniSkartRizeniInputBaseDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GVyrazeniZeSkartRizeniInputDto extends Gordic.Spi.Interface.GSkartRizeniInputBaseDto {
		/**Prepocet*/
		Prepocet?: boolean|null;
	}
	const enum GVyrazeniZeSkartRizeniInputDtoNames { Prepocet = "Prepocet", IDs = "IDs", IxsSka = "IxsSka", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GVyrazeniZeSkartRizeniInputDtoFragments { Prepocet = "*", IDs = "*", IxsSka = "*", SkartRizeniPoEntitach = "*",}
	const enum GVyrazeniZeSkartRizeniInputDtoTypes { Prepocet = "boolean", IDs = "string[]", IxsSka = "string", SkartRizeniPoEntitach = "boolean",}
	const enum GVyrazeniZeSkartRizeniInputDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSeznamNeaktivniFilterDto extends Gordic.Wfl.Interface.GSeznamFilterBaseDto {
		/**Typ zobrazeni seznamu*/
		TypSeznamu?: Gordic.Spi.Interface.TypSeznamuNeaktivni|null;
		/**zda pouze vyvlastnene*/
		Vlastnictvi?: Gordic.Wfl.Interface.TypVlastnicti|null;
		/**Typ zobrazeni seznamu*/
		DatumPodani?: Gordic.Wfl.Interface.Lists.WflDateIntervalDto|null;
		/**Vlastnik*/
		Vlastnik?: Gordic.Wfl.Interface.GSuFunRefDto|null;
		VlastnikVisible?: boolean|null;
		FiltrovatDleDatumu?: boolean|null;
		/**Typ externí agendy*/
		TypExtAgendy?: number|null;
		/**Typ dokumentu*/
		IxsTyp?: string|null;
		/**stav*/
		Stav?: Gordic.Wfl.Interface.WflcstpEnum|null;
	}
	const enum GSeznamNeaktivniFilterDtoNames { TypSeznamu = "TypSeznamu", Vlastnictvi = "Vlastnictvi", DatumPodani = "DatumPodani", Vlastnik = "Vlastnik", VlastnikVisible = "VlastnikVisible", FiltrovatDleDatumu = "FiltrovatDleDatumu", TypExtAgendy = "TypExtAgendy", IxsTyp = "IxsTyp", Stav = "Stav", Datum = "Datum", Vlastni = "Vlastni", PlnitTempTabulku = "PlnitTempTabulku", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSeznamNeaktivniFilterDtoFragments { TypSeznamu = "*", Vlastnictvi = "*", DatumPodani = "*", Vlastnik = "*", VlastnikVisible = "*", FiltrovatDleDatumu = "*", TypExtAgendy = "*", IxsTyp = "*", Stav = "*", Datum = "*", Vlastni = "*", PlnitTempTabulku = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSeznamNeaktivniFilterDtoTypes { TypSeznamu = "Gordic.Spi.Interface.TypSeznamuNeaktivni", Vlastnictvi = "Gordic.Wfl.Interface.TypVlastnicti", DatumPodani = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastnik = "Gordic.Wfl.Interface.GSuFunRefDto", VlastnikVisible = "boolean", FiltrovatDleDatumu = "boolean", TypExtAgendy = "number", IxsTyp = "string", Stav = "Gordic.Wfl.Interface.WflcstpEnum", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", PlnitTempTabulku = "boolean", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSeznamNeaktivniFilterDtoTypeLengths {}
	/**frankovani datamatrix*/
	interface GNovyBalikOptionsDto {
		/**Ixs vznikleho baliku*/
		IxsZup?: string|null;
		/**ve spisovne*/
		VeSpisovne?: boolean|null;
		/**ID enetitity pro prednastaveni*/
		IxpProPrednastaveniBaliku?: string|null;
		/**IDs entitit pro vložení*/
		IxpsProVlozeni?: string[]|null;
		/**Spisovy znak disabled*/
		SpisovyZnakDisabled?: boolean|null;
		/**zavrit po ulozeni*/
		CloseAfterSave?: boolean|null;
	}
	const enum GNovyBalikOptionsDtoNames { IxsZup = "IxsZup", VeSpisovne = "VeSpisovne", IxpProPrednastaveniBaliku = "IxpProPrednastaveniBaliku", IxpsProVlozeni = "IxpsProVlozeni", SpisovyZnakDisabled = "SpisovyZnakDisabled", CloseAfterSave = "CloseAfterSave",}
	const enum GNovyBalikOptionsDtoFragments { IxsZup = "*", VeSpisovne = "*", IxpProPrednastaveniBaliku = "*", IxpsProVlozeni = "*", SpisovyZnakDisabled = "*", CloseAfterSave = "*",}
	const enum GNovyBalikOptionsDtoTypes { IxsZup = "string", VeSpisovne = "boolean", IxpProPrednastaveniBaliku = "string", IxpsProVlozeni = "string[]", SpisovyZnakDisabled = "boolean", CloseAfterSave = "boolean",}
	const enum GNovyBalikOptionsDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSkartRizeniActionListDto extends Gordic.Wfl.Interface.GDokSpisListDto {
		/**stav*/
		priz_pos_na?: number|null;
	}
	const enum GSkartRizeniActionListDtoNames { priz_pos_na = "priz_pos_na", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_fun_zprac = "nazev_fun_zprac", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSkartRizeniActionListDtoFragments { priz_pos_na = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_fun_zprac = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSkartRizeniActionListDtoTypes { priz_pos_na = "number", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_fun_zprac = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSkartRizeniActionListDtoTypeLengths { lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
	/**Vlastni progress*/
	interface GSpiSimpleProgressDto extends Gordic.General.ApplicationInterface.GAsyncProgressDto {
		/**Data posilana pri progressu*/
		Data?: string[]|null;
	}
	const enum GSpiSimpleProgressDtoNames { Data = "Data", current = "current", total = "total", text = "text", isCancellable = "isCancellable",}
	const enum GSpiSimpleProgressDtoFragments { Data = "*", current = "*", total = "*", text = "*", isCancellable = "*",}
	const enum GSpiSimpleProgressDtoTypes { Data = "string[]", current = "number", total = "number", text = "string", isCancellable = "boolean",}
	const enum GSpiSimpleProgressDtoTypeLengths {}
	/**forma entity - (anologovy / digitalni)*/
	interface GFormaEntityFilterDto {
		/**anolag*/
		analog?: boolean|null;
		/**hybrid analog*/
		hybridAnalog?: boolean|null;
		/**hybrid digital*/
		hybridDigital?: boolean|null;
		/**digital*/
		digital?: boolean|null;
	}
	const enum GFormaEntityFilterDtoNames { analog = "analog", hybridAnalog = "hybridAnalog", hybridDigital = "hybridDigital", digital = "digital",}
	const enum GFormaEntityFilterDtoFragments { analog = "*", hybridAnalog = "*", hybridDigital = "*", digital = "*",}
	const enum GFormaEntityFilterDtoTypes { analog = "boolean", hybridAnalog = "boolean", hybridDigital = "boolean", digital = "boolean",}
	const enum GFormaEntityFilterDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GPracovniBlokSpiDto extends Gordic.Wfl.Interface.GModelDto {
		/**IXs bloku*/
		IxsBlp?: string|null;
		/**nazev bloku*/
		NazevBlp?: string|null;
		/**typ prezimu práce*/
		TypRezimuPrace?: Gordic.Wfl.Interface.TypRezimuPraceSeznamu|null;
		/**db param. zda mozno editovat uzavrene*/
		ssl_ediuzamet?: number|null;
		/**db param. zda dopocitat pocet priloh*/
		gin_poc_priloa?: boolean|null;
		/**zda pocet listu textove*/
		ssl_textplistu?: boolean|null;
		/**SK db param nastavuje viditelnost polozek*/
		ssl_pockop_sk?: boolean|null;
	}
	const enum GPracovniBlokSpiDtoNames { IxsBlp = "IxsBlp", NazevBlp = "NazevBlp", TypRezimuPrace = "TypRezimuPrace", ssl_ediuzamet = "ssl_ediuzamet", gin_poc_priloa = "gin_poc_priloa", ssl_textplistu = "ssl_textplistu", ssl_pockop_sk = "ssl_pockop_sk", Info = "Info",}
	const enum GPracovniBlokSpiDtoFragments { IxsBlp = "*", NazevBlp = "*", TypRezimuPrace = "*", ssl_ediuzamet = "*", gin_poc_priloa = "*", ssl_textplistu = "*", ssl_pockop_sk = "*", Info = "*",}
	const enum GPracovniBlokSpiDtoTypes { IxsBlp = "string", NazevBlp = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", ssl_ediuzamet = "number", gin_poc_priloa = "boolean", ssl_textplistu = "boolean", ssl_pockop_sk = "boolean", Info = "string",}
	const enum GPracovniBlokSpiDtoTypeLengths {}
	/**Historie zmen baliku Dto spisovny*/
	interface GHistorieZmenBalikuDto {
		/**ixs baliku*/
		ixs_zup?: string|null;
		/**ixs baliku blokuu*/
		kod_tya?: number|null;
		/**text*/
		hist_text?: string|null;
		/**zmenu provedl*/
		nazev_zmenu_prov?: string|null;
		/**datum zmeny*/
		dat_zmena?: JsonDate|null;
		/**poradove cislo zmeny*/
		poradoveCislo?: string|null;
	}
	const enum GHistorieZmenBalikuDtoNames { ixs_zup = "ixs_zup", kod_tya = "kod_tya", hist_text = "hist_text", nazev_zmenu_prov = "nazev_zmenu_prov", dat_zmena = "dat_zmena", poradoveCislo = "poradoveCislo",}
	const enum GHistorieZmenBalikuDtoFragments { ixs_zup = "*", kod_tya = "*", hist_text = "*", nazev_zmenu_prov = "*", dat_zmena = "*", poradoveCislo = "*",}
	const enum GHistorieZmenBalikuDtoTypes { ixs_zup = "string", kod_tya = "number", hist_text = "string", nazev_zmenu_prov = "string", dat_zmena = "JsonDate", poradoveCislo = "string",}
	const enum GHistorieZmenBalikuDtoTypeLengths {}
	/**Historie pohybu baliku Dto spisovny*/
	interface GHistoriePohybuBalikuDto {
		/**Spisovna od*/
		nazev_spi_od?: string|null;
		/**Spisový uzel od*/
		nazev_su_od?: string|null;
		/**Referent od*/
		nazev_fun_od?: string|null;
		/**Změnu provedl*/
		nazev_zmenu_prov?: string|null;
		/**Změnu provedl*/
		nazev_su_od_tooltip?: string|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**poradove cislo zmeny*/
		poradoveCislo?: string|null;
	}
	const enum GHistoriePohybuBalikuDtoNames { nazev_spi_od = "nazev_spi_od", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_zmenu_prov = "nazev_zmenu_prov", nazev_su_od_tooltip = "nazev_su_od_tooltip", dat_zmena = "dat_zmena", poradoveCislo = "poradoveCislo",}
	const enum GHistoriePohybuBalikuDtoFragments { nazev_spi_od = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_zmenu_prov = "*", nazev_su_od_tooltip = "*", dat_zmena = "*", poradoveCislo = "*",}
	const enum GHistoriePohybuBalikuDtoTypes { nazev_spi_od = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_zmenu_prov = "string", nazev_su_od_tooltip = "string", dat_zmena = "JsonDate", poradoveCislo = "string",}
	const enum GHistoriePohybuBalikuDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSpiListContextDto extends Gordic.Spi.Interface.GSpiListServerContextDto {
		/**Ixs spisovny aktualni*/
		IxsSpiAktualni?: string|null;
		/**Ixs spi jedne - pro SSD*/
		IxsSpiJedne?: string|null;
		/**jsou entity ve spisovne?*/
		JeVeSpisovne?: boolean|null;
		/**Povoleno zadosti o vypujcky*/
		PovolenoZadostiOVypujcky?: boolean|null;
	}
	const enum GSpiListContextDtoNames { IxsSpiAktualni = "IxsSpiAktualni", IxsSpiJedne = "IxsSpiJedne", JeVeSpisovne = "JeVeSpisovne", PovolenoZadostiOVypujcky = "PovolenoZadostiOVypujcky", TypSeznamu = "TypSeznamu", IfSkartRizeniPoEntitach = "IfSkartRizeniPoEntitach",}
	const enum GSpiListContextDtoFragments { IxsSpiAktualni = "*", IxsSpiJedne = "*", JeVeSpisovne = "*", PovolenoZadostiOVypujcky = "*", TypSeznamu = "*", IfSkartRizeniPoEntitach = "*",}
	const enum GSpiListContextDtoTypes { IxsSpiAktualni = "string", IxsSpiJedne = "string", JeVeSpisovne = "boolean", PovolenoZadostiOVypujcky = "boolean", TypSeznamu = "Gordic.Spi.Interface.TypSeznamuSpisovny", IfSkartRizeniPoEntitach = "boolean",}
	const enum GSpiListContextDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSpiListServerContextDto {
		/**Typ seznamu spisovny*/
		TypSeznamu?: Gordic.Spi.Interface.TypSeznamuSpisovny|null;
		/**SkartRizeni po entitach*/
		IfSkartRizeniPoEntitach?: boolean|null;
	}
	const enum GSpiListServerContextDtoNames { TypSeznamu = "TypSeznamu", IfSkartRizeniPoEntitach = "IfSkartRizeniPoEntitach",}
	const enum GSpiListServerContextDtoFragments { TypSeznamu = "*", IfSkartRizeniPoEntitach = "*",}
	const enum GSpiListServerContextDtoTypes { TypSeznamu = "Gordic.Spi.Interface.TypSeznamuSpisovny", IfSkartRizeniPoEntitach = "boolean",}
	const enum GSpiListServerContextDtoTypeLengths {}
	/**struktura k automatickemu ukladani*/
	interface GIxsZupDto {
		/**ixsZup*/
		ixs_zup?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:Seznam.m_err*/
		m_err?: string|null;
	}
	const enum GIxsZupDtoNames { ixs_zup = "ixs_zup", dat_zmena = "dat_zmena", m_vyber = "m_vyber", m_err = "m_err",}
	const enum GIxsZupDtoFragments { ixs_zup = "*", dat_zmena = "*", m_vyber = "*", m_err = "*",}
	const enum GIxsZupDtoTypes { ixs_zup = "string", dat_zmena = "JsonDate", m_vyber = "number", m_err = "string",}
	const enum GIxsZupDtoTypeLengths {}
	/**struktura k automatickemu ukladani*/
	interface RoleUserDto {
		/**role*/
		role?: string|null;
		/**Roles  Acr*/
		roleAcr?: string|null;
		/**název*/
		roleNazev?: string|null;
	}
	const enum RoleUserDtoNames { role = "role", roleAcr = "roleAcr", roleNazev = "roleNazev",}
	const enum RoleUserDtoFragments { role = "*", roleAcr = "*", roleNazev = "*",}
	const enum RoleUserDtoTypes { role = "string", roleAcr = "string", roleNazev = "string",}
	const enum RoleUserDtoTypeLengths {}
	/**struktura k automatickemu ukladani*/
	interface GUkladaniDto {
		/**vybrane*/
		UlozeniZeSeznamu?: boolean|null;
		/**zadane ixs baliku nebo ULM*/
		Id?: string|null;
		/**ixs ULM*/
		IxsUlm?: string|null;
		/**popis*/
		PopisUlm?: string|null;
		/**all iDs*/
		KUlozeni?: string[]|null;
		/**ulozene*/
		Ulozene?: string[]|null;
		/**vybrane ke zmene*/
		Selected?: Gordic.Spi.Interface.GSpiszupDto[]|null;
		/**bylo neco zmeneno*/
		Zmena?: boolean|null;
		/**vymazet vybrane pred dalsim nactenim ID*/
		VymazatSelected?: boolean|null;
	}
	const enum GUkladaniDtoNames { UlozeniZeSeznamu = "UlozeniZeSeznamu", Id = "Id", IxsUlm = "IxsUlm", PopisUlm = "PopisUlm", KUlozeni = "KUlozeni", Ulozene = "Ulozene", Selected = "Selected", Zmena = "Zmena", VymazatSelected = "VymazatSelected",}
	const enum GUkladaniDtoFragments { UlozeniZeSeznamu = "*", Id = "*", IxsUlm = "*", PopisUlm = "*", KUlozeni = "*", Ulozene = "*", Selected = "*", Zmena = "*", VymazatSelected = "*",}
	const enum GUkladaniDtoTypes { UlozeniZeSeznamu = "boolean", Id = "string", IxsUlm = "string", PopisUlm = "string", KUlozeni = "string[]", Ulozene = "string[]", Selected = "Gordic.Spi.Interface.GSpiszupDto[]", Zmena = "boolean", VymazatSelected = "boolean",}
	const enum GUkladaniDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GPripravaSkartNavrhuFiltrDto extends Gordic.Spi.Interface.GSkartRizeniFiltrDto {
		/**typ skart. rizeni*/
		TypSkartRizeni?: Gordic.Spi.Interface.TypSkartacnihoRizeni|null;
		/**Rok skartace*/
		RokSkartace?: number|null;
		/**vlastní*/
		Vlastni?: boolean|null;
		/**ixs Su*/
		ixs_su?: string|null;
		/**FiltrDleULM*/
		FiltrDleULM?: boolean|null;
		/**ixs Ulm*/
		ixs_ulm?: string[]|null;
		/**komentar*/
		Komentar?: string|null;
		/**forma entity*/
		Forma?: Gordic.Spi.Interface.GFormaEntityFilterDto|null;
	}
	const enum GPripravaSkartNavrhuFiltrDtoNames { TypSkartRizeni = "TypSkartRizeni", RokSkartace = "RokSkartace", Vlastni = "Vlastni", ixs_su = "ixs_su", FiltrDleULM = "FiltrDleULM", ixs_ulm = "ixs_ulm", Komentar = "Komentar", Forma = "Forma", SkarZnak = "SkarZnak", Fyzicky = "Fyzicky", HybridniFyzicky = "HybridniFyzicky", HybridniElektronicky = "HybridniElektronicky", Elektronicky = "Elektronicky", TypZobrazeniSeznamu = "TypZobrazeniSeznamu", IxsSka = "IxsSka", TypSkartDokladu = "TypSkartDokladu", NacistData = "NacistData", ZapisovatDoTemptable = "ZapisovatDoTemptable", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GPripravaSkartNavrhuFiltrDtoFragments { TypSkartRizeni = "*", RokSkartace = "*", Vlastni = "*", ixs_su = "*", FiltrDleULM = "*", ixs_ulm = "*", Komentar = "*", Forma = "*", SkarZnak = "*", Fyzicky = "*", HybridniFyzicky = "*", HybridniElektronicky = "*", Elektronicky = "*", TypZobrazeniSeznamu = "*", IxsSka = "*", TypSkartDokladu = "*", NacistData = "*", ZapisovatDoTemptable = "*", SkartRizeniPoEntitach = "*",}
	const enum GPripravaSkartNavrhuFiltrDtoTypes { TypSkartRizeni = "Gordic.Spi.Interface.TypSkartacnihoRizeni", RokSkartace = "number", Vlastni = "boolean", ixs_su = "string", FiltrDleULM = "boolean", ixs_ulm = "string[]", Komentar = "string", Forma = "Gordic.Spi.Interface.GFormaEntityFilterDto", SkarZnak = "string", Fyzicky = "boolean", HybridniFyzicky = "boolean", HybridniElektronicky = "boolean", Elektronicky = "boolean", TypZobrazeniSeznamu = "Gordic.Spi.Interface.TypZobrazeniSeznamuSpi", IxsSka = "string", TypSkartDokladu = "Gordic.Spi.Interface.TypSkartacnihoDokladu", NacistData = "boolean", ZapisovatDoTemptable = "boolean", SkartRizeniPoEntitach = "boolean",}
	const enum GPripravaSkartNavrhuFiltrDtoTypeLengths {}
	/**v7ber spisovny*/
	interface GSkartNavrhFiltrDto extends Gordic.Spi.Interface.GSkartRizeniFiltrDto {
		/**nazev.*/
		Nazev?: string|null;
		/**nazev dogenerovany.*/
		Nazev_add?: string|null;
		/**pracovat pozue nad dok./spisy ve skart. navrhu*/
		OperaceSDokSpisy?: boolean|null;
		/**pracovat pozue nad dok./spisy ve skart. navrhu*/
		Precislovat?: boolean|null;
		/**Ukladat Ixp dokumentus informaciNDA.*/
		IfUkladatIxpDokSInformaciNDA?: boolean|null;
		/**priz. skar.*/
		PrizSkar?: Gordic.Spi.Interface.SpicskaEnum|null;
		/**nazev dogenerovany.*/
		RokSkartace?: number|null;
		/**priz mimoradna skartace*/
		priz_mimskr?: number|null;
		/**priz skartace dle entit*/
		priz_ske?: number|null;
		/**nazev dogenerovany.*/
		ixpDokPosouzeniNDA?: string|null;
	}
	const enum GSkartNavrhFiltrDtoNames { Nazev = "Nazev", Nazev_add = "Nazev_add", OperaceSDokSpisy = "OperaceSDokSpisy", Precislovat = "Precislovat", IfUkladatIxpDokSInformaciNDA = "IfUkladatIxpDokSInformaciNDA", PrizSkar = "PrizSkar", RokSkartace = "RokSkartace", priz_mimskr = "priz_mimskr", priz_ske = "priz_ske", ixpDokPosouzeniNDA = "ixpDokPosouzeniNDA", SkarZnak = "SkarZnak", Fyzicky = "Fyzicky", HybridniFyzicky = "HybridniFyzicky", HybridniElektronicky = "HybridniElektronicky", Elektronicky = "Elektronicky", TypZobrazeniSeznamu = "TypZobrazeniSeznamu", IxsSka = "IxsSka", TypSkartDokladu = "TypSkartDokladu", NacistData = "NacistData", ZapisovatDoTemptable = "ZapisovatDoTemptable", SkartRizeniPoEntitach = "SkartRizeniPoEntitach",}
	const enum GSkartNavrhFiltrDtoFragments { Nazev = "*", Nazev_add = "*", OperaceSDokSpisy = "*", Precislovat = "*", IfUkladatIxpDokSInformaciNDA = "*", PrizSkar = "*", RokSkartace = "*", priz_mimskr = "*", priz_ske = "*", ixpDokPosouzeniNDA = "*", SkarZnak = "*", Fyzicky = "*", HybridniFyzicky = "*", HybridniElektronicky = "*", Elektronicky = "*", TypZobrazeniSeznamu = "*", IxsSka = "*", TypSkartDokladu = "*", NacistData = "*", ZapisovatDoTemptable = "*", SkartRizeniPoEntitach = "*",}
	const enum GSkartNavrhFiltrDtoTypes { Nazev = "string", Nazev_add = "string", OperaceSDokSpisy = "boolean", Precislovat = "boolean", IfUkladatIxpDokSInformaciNDA = "boolean", PrizSkar = "Gordic.Spi.Interface.SpicskaEnum", RokSkartace = "number", priz_mimskr = "number", priz_ske = "number", ixpDokPosouzeniNDA = "string", SkarZnak = "string", Fyzicky = "boolean", HybridniFyzicky = "boolean", HybridniElektronicky = "boolean", Elektronicky = "boolean", TypZobrazeniSeznamu = "Gordic.Spi.Interface.TypZobrazeniSeznamuSpi", IxsSka = "string", TypSkartDokladu = "Gordic.Spi.Interface.TypSkartacnihoDokladu", NacistData = "boolean", ZapisovatDoTemptable = "boolean", SkartRizeniPoEntitach = "boolean",}
	const enum GSkartNavrhFiltrDtoTypeLengths { Nazev = 50,}
	interface GSpiDataAkce {
		ixs_zup?: string|null;
		ixp?: string|null;
		stav_sul?: number|null;
		dat_zmena?: JsonDate|null;
	}
	const enum GSpiDataAkceNames { ixs_zup = "ixs_zup", ixp = "ixp", stav_sul = "stav_sul", dat_zmena = "dat_zmena",}
	const enum GSpiDataAkceFragments { ixs_zup = "*", ixp = "*", stav_sul = "*", dat_zmena = "*",}
	const enum GSpiDataAkceTypes { ixs_zup = "string", ixp = "string", stav_sul = "number", dat_zmena = "JsonDate",}
	const enum GSpiDataAkceTypeLengths {}
	interface GVyjmutiZeSpisovnyDto extends Gordic.Wfl.Interface.GSuFunRefDto {
		predat?: boolean|null;
	}
	const enum GVyjmutiZeSpisovnyDtoNames { predat = "predat", ixs_su = "ixs_su", ixs_fun = "ixs_fun", ixs_ref = "ixs_ref", ixs_tre = "ixs_tre",}
	const enum GVyjmutiZeSpisovnyDtoFragments { predat = "*", ixs_su = "*", ixs_fun = "*", ixs_ref = "*", ixs_tre = "*",}
	const enum GVyjmutiZeSpisovnyDtoTypes { predat = "boolean", ixs_su = "string", ixs_fun = "string", ixs_ref = "string", ixs_tre = "string",}
	const enum GVyjmutiZeSpisovnyDtoTypeLengths { ixs_su = 12, ixs_fun = 12, ixs_ref = 12, ixs_tre = 12,}
	/**pro mazani - spitdel*/
	interface GDeleteFileDto {
		/**DBCOLUMN:Seznam.ixs_ulo*/
		ixs_ulo?: string|null;
		typ_duv_del?: number|null;
		typ_ag_del?: number|null;
		priz_del_ulo?: number|null;
		txt_err?: string|null;
	}
	const enum GDeleteFileDtoNames { ixs_ulo = "ixs_ulo", typ_duv_del = "typ_duv_del", typ_ag_del = "typ_ag_del", priz_del_ulo = "priz_del_ulo", txt_err = "txt_err",}
	const enum GDeleteFileDtoFragments { ixs_ulo = "*", typ_duv_del = "*", typ_ag_del = "*", priz_del_ulo = "*", txt_err = "*",}
	const enum GDeleteFileDtoTypes { ixs_ulo = "string", typ_duv_del = "number", typ_ag_del = "number", priz_del_ulo = "number", txt_err = "string",}
	const enum GDeleteFileDtoTypeLengths { ixs_ulo = 12,}
	interface GVypujceniDataAkce {
		/**ixs vypujceni*/
		ixs_vyl?: string|null;
		/**priznak vypujceni*/
		priz_vyp?: number|null;
		dat_zmena?: JsonDate|null;
	}
	const enum GVypujceniDataAkceNames { ixs_vyl = "ixs_vyl", priz_vyp = "priz_vyp", dat_zmena = "dat_zmena",}
	const enum GVypujceniDataAkceFragments { ixs_vyl = "*", priz_vyp = "*", dat_zmena = "*",}
	const enum GVypujceniDataAkceTypes { ixs_vyl = "string", priz_vyp = "number", dat_zmena = "JsonDate",}
	const enum GVypujceniDataAkceTypeLengths {}
	/**Souhrn - pocty Dto*/
	interface GSpiSouhrnInfoDto extends Gordic.Spi.Interface.GSpiSouhrnInfoBaseDto {
		/**Autogenerated.*/
		VypujckyKeVraceniPoTerminu?: number|null;
		/**Autogenerated.*/
		VypujckyKeVraceniDnes?: number|null;
		/**Autogenerated.*/
		VypujckyKeVraceniDoTriDnu?: number|null;
		/**Autogenerated.*/
		ZadostiOVypujceniKeSchvaleni?: number|null;
		/**Autogenerated.*/
		ZadostiOVypujceniSchvaleneKVypujceni?: number|null;
		/**Autogenerated.*/
		KUlozeniDokSpis?: number|null;
		/**Autogenerated.*/
		BalikyVeVlastnictvi?: number|null;
		/**Autogenerated.*/
		KUlozeniBaliku?: number|null;
		/**Autogenerated.*/
		SkartNavrhu?: number|null;
		/**Autogenerated.*/
		KPrevzetiBaliku?: number|null;
		/**Autogenerated.*/
		KPrevzetiBalikuZJineSpisovny?: number|null;
		/**Autogenerated.*/
		KeSkartRizeniBaliku?: number|null;
		/**Autogenerated.*/
		KeSkartRizeniBalikuINeuzavrene?: number|null;
		/**Autogenerated.*/
		KeSkartRizeniSamostDokSpis?: number|null;
		/**Autogenerated.*/
		BezSpoustecichUdalostiBaliku?: number|null;
		/**Autogenerated.*/
		BezSpoustecichUdalostiDokSpisVBaliku?: number|null;
		/**Autogenerated.*/
		BezSpoustecichUdalostiSamostDokSpis?: number|null;
	}
	const enum GSpiSouhrnInfoDtoNames { VypujckyKeVraceniPoTerminu = "VypujckyKeVraceniPoTerminu", VypujckyKeVraceniDnes = "VypujckyKeVraceniDnes", VypujckyKeVraceniDoTriDnu = "VypujckyKeVraceniDoTriDnu", ZadostiOVypujceniKeSchvaleni = "ZadostiOVypujceniKeSchvaleni", ZadostiOVypujceniSchvaleneKVypujceni = "ZadostiOVypujceniSchvaleneKVypujceni", KUlozeniDokSpis = "KUlozeniDokSpis", BalikyVeVlastnictvi = "BalikyVeVlastnictvi", KUlozeniBaliku = "KUlozeniBaliku", SkartNavrhu = "SkartNavrhu", KPrevzetiBaliku = "KPrevzetiBaliku", KPrevzetiBalikuZJineSpisovny = "KPrevzetiBalikuZJineSpisovny", KeSkartRizeniBaliku = "KeSkartRizeniBaliku", KeSkartRizeniBalikuINeuzavrene = "KeSkartRizeniBalikuINeuzavrene", KeSkartRizeniSamostDokSpis = "KeSkartRizeniSamostDokSpis", BezSpoustecichUdalostiBaliku = "BezSpoustecichUdalostiBaliku", BezSpoustecichUdalostiDokSpisVBaliku = "BezSpoustecichUdalostiDokSpisVBaliku", BezSpoustecichUdalostiSamostDokSpis = "BezSpoustecichUdalostiSamostDokSpis", LoginInfoDto = "LoginInfoDto",}
	const enum GSpiSouhrnInfoDtoFragments { VypujckyKeVraceniPoTerminu = "*", VypujckyKeVraceniDnes = "*", VypujckyKeVraceniDoTriDnu = "*", ZadostiOVypujceniKeSchvaleni = "*", ZadostiOVypujceniSchvaleneKVypujceni = "*", KUlozeniDokSpis = "*", BalikyVeVlastnictvi = "*", KUlozeniBaliku = "*", SkartNavrhu = "*", KPrevzetiBaliku = "*", KPrevzetiBalikuZJineSpisovny = "*", KeSkartRizeniBaliku = "*", KeSkartRizeniBalikuINeuzavrene = "*", KeSkartRizeniSamostDokSpis = "*", BezSpoustecichUdalostiBaliku = "*", BezSpoustecichUdalostiDokSpisVBaliku = "*", BezSpoustecichUdalostiSamostDokSpis = "*", LoginInfoDto = "*",}
	const enum GSpiSouhrnInfoDtoTypes { VypujckyKeVraceniPoTerminu = "number", VypujckyKeVraceniDnes = "number", VypujckyKeVraceniDoTriDnu = "number", ZadostiOVypujceniKeSchvaleni = "number", ZadostiOVypujceniSchvaleneKVypujceni = "number", KUlozeniDokSpis = "number", BalikyVeVlastnictvi = "number", KUlozeniBaliku = "number", SkartNavrhu = "number", KPrevzetiBaliku = "number", KPrevzetiBalikuZJineSpisovny = "number", KeSkartRizeniBaliku = "number", KeSkartRizeniBalikuINeuzavrene = "number", KeSkartRizeniSamostDokSpis = "number", BezSpoustecichUdalostiBaliku = "number", BezSpoustecichUdalostiDokSpisVBaliku = "number", BezSpoustecichUdalostiSamostDokSpis = "number", LoginInfoDto = "Gordic.Wfl.Interface.GLoginInfoDto",}
	const enum GSpiSouhrnInfoDtoTypeLengths {}
	/**TypPrevzetiDoSpisovny*/
	const enum TypPrevzetiDoSpisovny {
		/**jako balik.*/
		jakoBalik,
		/**do baliku.*/
		doBaliku,
		/**jednotlive*/
		jednotlive,
	}
	/**Typ mazani*/
	const enum TypMazani {
		/**mazání metadat dok.spisů*/
		metadataDokSpis,
		/**mazání fyzických soubory z uloziste*/
		soubory,
	}
	/**Typ seznamu pro spisovny*/
	const enum TypSeznamuSpisovny {
		/**neurceno*/
		neurceno,
		/**k ulozeni*/
		kUlozeni,
		/**k prevzeti*/
		kPrevzeti,
		/**k predani*/
		kPredani,
		/**nepredane spisovne*/
		nepredaneSpisovne,
		/**predane do spisovny*/
		predaneDoSpisovne,
		/**bez spousteci udalosti*/
		bezSpousteciUdalosti,
		/**bez spousteci udalosti - dok.spisy samostatne*/
		bezSpousteciUdalostiSamostatne,
		/**entity ktere maji problem se spoustec udalosti*/
		kontrolaSpousteciUdalostiEntit,
		/**entity ktere maji problem se starteem spousteci udalosti*/
		kontrolaStartuSpousteciUdalostiEntit,
		/**ulozene ve spisovne*/
		ulozene,
		/**prevzate*/
		prevzate,
		/**archivni kniha*/
		archivniKniha,
		/**multiTask*/
		multiTask,
		/**prepocet roku skartace*/
		prepocetRokuSkartace,
		/**ztracene*/
		ztracene,
		/**pro digitalni spisovnu*/
		proDigitalniSpisovnu,
		/**dle vecnych skupin*/
		dleVecnychSkupin,
		/**pripravene ke smazani*/
		pripraveneKeSmazani,
		/**smazane*/
		smazane,
		/**pracovni blok*/
		pracovniBlok,
		/**hledani Baliku*/
		hledaniBaliku,
		/**s ruznym SPZ*/
		sRuznymSPZ,
		/**s ruznym SPZ dle obsahu*/
		sRuznymSPZDleObsahu,
		/**prehled pro automatickou zmenu ulozeni*/
		automatickaZmenaUlozeni,
		/**Varianta na seznam bezSpousteciUdalosti ovšem ještě filtrovaný na rok kontrolu spouštěcí události.*/
		kontrolaSpousteciUdalosti,
		/**k predaní - pripravene pro spravni arch*/
		pripraveneProSpravniArch,
		/**vypujcene*/
		vypujcky,
	}
	/**Typ Seznamu Mazani*/
	const enum TypSeznamuMazani {
		/**neurceno*/
		neurceno,
		/**pripravene ke dmazani*/
		pripraveneKeSmazani,
		/**soubory ke smazani*/
		souboryKeSmazani,
		/**po skartacnim rizeni*/
		poSkartacnimRizeni,
	}
	/**FilSpisska*/
	const enum TypOperaceMazaniMetadat {
		/**priprava - oznacit ke smazani*/
		oznaceniKeSmazani,
		/**kontrola*/
		kontrola,
		/**kontrola archivace*/
		kontrolaArchivace,
		/**samotne mazani*/
		mazani,
		/**zruseni oznaceni ke smazani*/
		zruseniOznaceniKeSmazani,
		/**znovu smazat dle novehp nastaveno DB parametru*/
		znovuSmazat,
	}
	/**stav vypujcení*/
	const enum StavVypujceniEnum {
		neurceno,
		vracene,
		vypujcene,
		ztracene,
		poTerminu,
		dnesKVraceni,
		podanaZadost,
		schvalenaZadost,
		zamitnutaZadost,
	}
	/**stav vypujcení*/
	const enum TypSeznamuVypujcekEnum {
		/**prehled pro spisovnu*/
		prehledProSpisovnu,
		/**prehled pro spisovy uzel ats.*/
		vypujckyZeSpisovny,
		/**kniha vypujcek*/
		knihaVypujcek,
		/**zadosti o vypujcku*/
		zadostiOVypujcku,
	}
	/**stav vypujcení*/
	const enum TypVypujceniEnum {
		neurceno,
		internimuSubjektu,
		externimuSubjektu,
	}
	/**Typ ElPodani ke smazani*/
	const enum TypElPodaniKeSmazani {
		/**StornovanePredZpracovanim*/
		StornovanePredZpracovanim,
		/**vsechna*/
		Vsechna,
		/**neurceno*/
		neurceno,
	}
	/**Typ seznamu digitalni spisovny*/
	const enum TypSeznamuDigitSpi {
		/**prehled transakcnich logu baliku*/
		prehledTransakcnichLoguBaliku=200,
		/**prehled baliku casovych razitek*/
		prehledBalikuCasovychRazitek=210,
	}
	/**Typ seznamu dok. spis k převzetí*/
	const enum TypDokSpisKPrevzeti {
		/**neurceno*/
		neurceno,
		/**dle umisteni*/
		dleUmisteni,
		/**dle spis. znaku*/
		dleSpisZnaku,
		/**dle dle data uzavreni*/
		dleDataUzavreni,
		/**dle PID*/
		dlePID,
		/**z externiAgendy*/
		zExterniAgendy,
		/**ze spisovny*/
		zeSpisovny,
	}
	/**Typ seznamu neaktivnich*/
	const enum TypSeznamuNeaktivni {
		/**Neurceno*/
		Neurceno=0,
		/**stornovane*/
		Stornovane=60,
		/**ztracene*/
		Ztracene=70,
		/**přeevidované*/
		Preevidovane=80,
		/**odeslane jako original*/
		OdeslaneJakoOriginal=1,
		/**priorovane*/
		Priorovane=90,
		/**vsechna el. podani*/
		VsechnaElPodani=110,
		/**storno nezprac el. podani*/
		StornoNezpracElPodani=111,
		/**prazdne typove spisy*/
		PrazdneTypoveSpisy=200,
		/**Prenesene entity*/
		Prenesene=210,
		/**prazdne typove spisy*/
		PrazdneSoucastiTypovychSpisu=220,
		/**predane do externi agendy*/
		PredaneDoExterniAgendy=250,
		/**pripravene ke smazani*/
		PripraveneKeSmazani=500,
		/**po skartacnim rizeni*/
		PoSkartacnimRizeni=600,
		/**smazane*/
		UzavreneUkoly=700,
		/**smazane*/
		Smazane=900,
	}
	/**FilSpiulo*/
	const enum FilNeaktivni {
		/**ixs_su_akt*/
		ixs_su_akt,
		/**ixs_fun_akt*/
		ixs_fun_akt,
		/**stav_pis*/
		stav_pis,
		/**dat_pod*/
		dat_pod,
		/**dat_zmena*/
		dat_zmena,
		/**s_odes (= 1 - odeslané jako orig.*/
		s_odes,
	}
	/**Aktivita*/
	const enum TypAktivity {
		/**aktivni*/
		aktivni,
		/**neaktivni*/
		neaktivni,
		/**vsechny*/
		vsechny,
	}
	/**Typ skartacního rízení (nemenit cislo enumu!)*/
	const enum TypSkartacnihoRizeni {
		/**neurceno*/
		neurceno=0,
		/**pro archivaci*/
		archiv=1,
		/**skartace (stoupa)*/
		skartace=2,
		/**výběr*/
		volitelna=3,
		/**docasne vyrazene*/
		docasneVyrazene=4,
		/**výběr pro archivaci*/
		volitelneProArchivaci=5,
		/**výběr pro skartaci*/
		volitelneProSkartaci=6,
		/**delimitace*/
		delimitace=7,
		/**mimoradná archivace*/
		mimoradnaArchivace=8,
		/**mimoradná skartace*/
		mimoradnaSkartace=9,
		/**mimoradná skartace / archivace*/
		mimoradnaArchivaceSkartace=10,
		/**pro Národní digitální archiv*/
		proNDA=11,
		/**pozastavane - nemenit cislo*/
		pozastavene=21,
		/**trvaly skart souhlas*/
		trvalySkartSouhlas=31,
	}
	/**Typ filtru skartacního rízení (nemenit cislo enumu!)*/
	const enum TypFiltruSkartacnihoRizeni {
		/**neurceno*/
		neurceno=0,
		/**filtr dle spivzup.ixs_su_od (uloženo ve spitzup pod log_por_cislo, ixs_zup, ikc = 111)*/
		filtrDleSpivzup=1,
		/**filtr dle spiszup.ixs_ulm (uloženo ve spitzup pod log_por_cislo, ixs_zup, ikc = 222)*/
		filtrDleSpiszup=2,
		/**filtr 1+2 (oboje)*/
		filtrVse=3,
	}
	/**Typ zobrazení detailu dokumentu*/
	const enum TypSkartacnihoDokladu {
		/**priprava skartacniho navrhu*/
		pripravaNavrhu=2,
		/**skartacni navrh*/
		navrh=0,
		/**skartacni protokol*/
		protokol=1,
		/**skaprotokol*/
		neurceno=99,
	}
	/**Typ skart. znaku*/
	const enum TypSkartacnihoZnaku {
		/**archivace*/
		A,
		/**skartace*/
		S,
		/**volitelne*/
		V,
		/**volitelne A*/
		VA,
		/**volitelne S*/
		VS,
		/**delimitace*/
		D,
	}
	/**Typ zobrazení detailu dokumentu*/
	const enum TypHledaniBaliku {
		/**neurceno*/
		neurceno,
		/**pro vkladani pokud jeste neni ve spisovne*/
		proVkladaniPokudNeniVeSpisovne,
		/**pro vkladani ve spisovne*/
		proVkladaniVeSpisovne,
		/**pro prevzetí do spisovny s nasledným vlozením do baliku*/
		proPrevzetiDoSpisovnySVlozenim,
		/**Použití pro hledání balíku dle identifikátoru*/
		hledaniDleIdentifikatoru,
		/**pro vlozeni do skart. navrhu*/
		proPridaniDoSkartNavrhu,
	}
	/**stav baliku (stav_sul)*/
	const enum SpicsulEnum {
		/**Neurčeno*/
		Neurceno=999,
		/**Neulozeno*/
		Neulozeno=0,
		/**Ulozeno*/
		Ulozeno=10,
		/**Prevadeno*/
		Prevadeno=20,
		/**Ztraceno*/
		Ztraceno=30,
		/**Archivováno*/
		Archivovano=40,
		/**připraveno pro mimořádnou skartaci*/
		PripravenoProMimSkart=45,
		/**skartováno*/
		Skartovano=50,
		/**mimořádně archivováno*/
		MimoradArchivovano=54,
		/**mimořádně skartováno*/
		MimoradSkartovano=55,
		/**vloženo do balíku*/
		VlozenoDoBaliku=60,
		/**vloženo do balíku (neevidovaný dokument)*/
		VlozenoDoBalikuNeevidovany=65,
		/**připraveno*/
		Pripraveno=70,
		/**přiděleno do spisovny*/
		PridelenoDoSpisovny=75,
		/**delimitováno*/
		Delimitovano=80,
		/**Stornováno*/
		Stornovano=90,
		/**Zrušeno*/
		Zruseno=900,
	}
	/**priznak smazani SpicdeuEnum (priz_del_ulo)*/
	const enum SpicdeuEnum {
		/**Ke smazani*/
		KeSmazani=0,
		/**prodes mazání probíhá*/
		Mazano=1,
		/**je jiz smazáno*/
		Smazano=2,
	}
	/**priznak smazani SpicdeuEnum (priz_del_ulo)*/
	const enum SpicvypEnum {
		/**nevypujceno*/
		nevypujceno=0,
		/**vypujceno*/
		vypujceno=1,
		/**jvypujceno-se-spisem*/
		vypujcenoSeSpisem=2,
		/**vypujceno-s-balikem*/
		vypujcenoSBalikem=3,
		/**nevraceno-ztraceno*/
		nevracenoZtraceno=4,
		/**zadost-o-vypujceni*/
		zadostOVypujceni=10,
		/**vypujceni-schvaleno*/
		vypujceniSchvaleno=15,
		/**vypujceni-zamitnuto*/
		vypujceniZamitnuto=20,
		/**vypujceni-storno*/
		vypujceniStornovano=30,
	}
	/**priznak smazani SpicdeuEnum (priz_del_ulo)*/
	const enum SpictspEnum {
		/**neurceno*/
		neurceno=0,
		/**centrální*/
		centralni=10,
		/**odborová*/
		odborova=20,
		/**přípravna*/
		pripravna=30,
	}
	/**priznak smazani SpicdeuEnum (priz_del_ulo)*/
	const enum SpictyaEnum {
		/**neurceno*/
		neurceno=0,
		/**přijmutí*/
		prijmuti=10,
		/**zapůjčení*/
		zapujceni=20,
		/**vrácení*/
		vraceni=30,
		/**ztracení*/
		ztraceni=40,
		/**převedení*/
		prevedeni=50,
		/**přemístění*/
		premisteni=60,
		/**vytvoření balíku*/
		vytvoreniBaliku=70,
		/**vložení do balíku*/
		vlozeniDoBaliku=80,
		/**vyjmutí z balíku*/
		vyjmutiZBaliku=90,
		/**uložení*/
		ulozeni=100,
	}
	/**Typ zobrazení (dokument nebo spis / balík)*/
	const enum TypZobrazeniUlozeniDoSpisovny {
		/**neurceno*/
		neurceno,
		/**dokument nebo spis*/
		dokumentCiSpis,
		/**balík*/
		balik,
	}
	/**Typ akce ve spisovne*/
	const enum TypAkceVeSpisovne {
		/**predani*/
		predani,
		/**prevzeti*/
		prevzeti,
		/**vypujceni*/
		vypujceni,
		/**vraceni z vypujcky*/
		vraceniZVypujcky,
		/**ztraceni*/
		ztraceniZVypujcky,
		/**shvaleni vypujcky*/
		shvaleniVypujcky,
		/**zamitnuti vypujcky*/
		zamitnutiVypujcky,
		/**ztraceni*/
		ztraceniZeSpisovny,
		/**vraceni ztraceneho ze spisovny*/
		vraceniZtracenehoZeSpisovny,
		/**vyjmuti*/
		vyjmuti,
		/**vlozeni*/
		vlozeni,
		/**premisteni*/
		premisteni,
		/**ulozeni do ulozného mista*/
		ulození,
	}
	/**ciselnik Spicska*/
	const enum SpicskaEnum {
		/**Skart.návrh*/
		SkartNavrh=0,
		/**Skart.návrh*/
		SkartProtokol=1,
		/**Skart.návrh odeslaný*/
		SkartNavrhOdeslany=2,
		/**Skart.návrh vrácený*/
		SkartNavrhVraceny=3,
		/**Neurčeno*/
		Neurceno=999,
	}
	/**ciselnik Spicskn (priz_skn)*/
	const enum SpicsknEnum {
		/**neurceno*/
		neurceno=0,
		/**pripraveno pro archivaci*/
		pripravenoProArchivaci=1,
		/**pripraveno pro skartaci*/
		pripravenoProSkartaci=2,
		/**docasne vyrazeno ze skartacního navrhu*/
		docasneVyrazeno=3,
		/**pripraveno pro výběr*/
		pripravenoProVolitelne=4,
		/**pripraveno pro delimitaci*/
		pripravenoProDelimitaci=5,
	}
	/**ciselnik Spicinb (stav_sip_inb)*/
	const enum SpicinbEnum {
		/**doručeno*/
		doruceno=0,
		/**zpracováno*/
		zpracovano=10,
		/**odmítnuto*/
		odmitnuto=20,
		/**uloženo do AIP*/
		ulozenoDoAIP=30,
		/**archivováno*/
		archivovano=40,
		/**skartováno*/
		skartovano=50,
		/**staženo před zpracováním*/
		stazenoPredZpracovanim=60,
		/**stornováno před zpracováním*/
		stornovanoPredZpracováním=90,
	}
	/**ciselnik Spictyz (kod_tyz) - typ baliku*/
	const enum SpictyzEnum {
		/**neurceno*/
		neurceno=0,
		/**písemnost*/
		pisemnost=10,
		/**spis*/
		spis=20,
		/**balik*/
		balik=30,
		/**karton*/
		karton=40,
		/**svazek*/
		svazek=50,
		/**slozka*/
		slozka=60,
		/**krabice*/
		krabice=70,
		/**úřední kniha*/
		uredniKniha=80,
		/**mapy*/
		mapy=90,
		/**digitální dokumenty*/
		digitalniDokumenty=100,
		/**šanon*/
		sanon=110,
		/**pytel*/
		pytel=120,
	}
	/**Typ seznamu spisovny*/
	const enum TypDokSpis {
		/**dok.spisy v baliky*/
		vBaliku,
		/**samostatne dokumenty a spisy*/
		samostatneDokSpis,
	}
	/**Typ seznamu spisovny*/
	const enum TypSeznamuSpi {
		/**neurceno*/
		neurceno,
		/**dok.spisy obecné*/
		dokSpis,
		/**baliky obecné*/
		baliky,
		/**samostatne dokumenty a spisy*/
		samostatneDokSpis,
		/**dok.spisy neaktivni*/
		dokSpisNeaktivni,
		/**dok.spisy pro digitalni spisovnui*/
		dokSpisProDigitSpi,
		/**baliky v digitalni spisovne*/
		balikyVDigitSpi,
	}
	/**Typ posouzeni skart rizeni z NDA (Narodni digitalni archiv)*/
	const enum SpicposEnum {
		/**neurceno*/
		neurceno=0,
		/**"vybrat za archiválii" - pokud je A tak se nic nemění pokud je něco jiného provedeme změnu SKZ na A*/
		archivovat=10,
		/**"zničit" - pokud je S tak se nic nemění pokud je něco jiného provedeme změnu SKZ na S*/
		skartovat=20,
		/**"předložit k výběru" - provedeme vygenerování kompletního SIP balíčku někam na disk*/
		predlozitKVyberu=30,
		/**"vyřadit z výběru" - provedeme vyřazení příslušné entity ze skartačního návrhu (je tam již dnes funkce vyřadit z návrhu)*/
		vyraditZVyberu=40,
		/**úspešně uloženo a je vráceno ID v archivu*/
		uspesneUlozenoAVracenoIdArchivu=50,
	}
	/**Typ baliku*/
	const enum TypBalikyEnum {
		/**neurceno*/
		neurceno=0,
		/**"balik typu dokument*/
		dokument=10,
		/**"balik typu spis*/
		spis=20,
		/**"balik*/
		balik=30,
		/**"balik prideleny do spisovny*/
		balikPridelenyDoSpisovny=31,
	}
	/**Typ skart. rizeni*/
	const enum TypAkceSkartacnihoRizeni {
		/**neurcenoí*/
		neurceno=99,
		/**priprava skartacniho navrhu vše - universální*/
		pripravaSkartNavrhuVse=0,
		/**priprava skartacniho navrhu pro archivaci*/
		pripravaSkartNavrhuArchiv=1,
		/**priprava skartacniho navrhu pro skartaci*/
		pripravaSkartNavrhuSkartace=2,
		/**zmena skartacního znaku na A - archivaci*/
		zmenaSkartZnakuNaArchivaci=3,
		/**zmena skartacního znaku na S - skartaci*/
		zmenaSkartZnakuNaSkartaci=4,
		/**docasne vyradit ze skartacniho rizeni*/
		docasneVyradit=5,
		/**zaradit zpet do skaracního rízeni*/
		zaraditZpet=6,
		/**mimoradna archivace*/
		mimoradnaArchivace=7,
		/**mimoradna skartace*/
		mimoradnaSkartace=8,
		/**priprava skartacniho navrhu V -volitelné*/
		pripravaSkartNavrhuVolitelne=9,
		/**priprava skartacniho navrhu VA*/
		pripravaSkartNavrhuVolitelneProArchivaci=10,
		/**priprava skartacniho navrhu VS*/
		pripravaSkartNavrhuVolitelneProSkartaci=11,
		/**zmena skartacního znaku na VA*/
		zmenaSkartZnakuNaVolitelneProArchivaci=12,
		/**zmena skartacního znaku na VS*/
		zmenaSkartZnakuNaVolitelneProSkartaci=13,
		/**zrusit pozastaveni*/
		zrusitPozastaveni=14,
		/**trvaly skartacni souhlas*/
		trvalySkartSouhlas=31,
		/**pridat do skart. rizeni (mimoradne)*/
		pridat=40,
		/**vyjmout ze skart rizeni  (mimoradne)*/
		vyjmout=50,
		/**zmena roku skartace*/
		zmenaRokuSkartace=60,
	}
	/**Typ dávky z NDA (Narodni digitalni archiv)*/
	const enum TypDavkyZNDA {
		/**davka s posouzenim*/
		posouzeni,
		/**info o prevzeti*/
		prejimka,
		/**neurceno*/
		neurceno,
	}
	/**Typ akce s umistenim*/
	const enum TypAkceSUmistenim {
		/**ponechat - vyčistit*/
		vycistit,
		/**smazat umístění*/
		smazat,
		/**nic*/
		nic,
	}
	/**akce kolem ulozeni v digitalni spisovene*/
	const enum TypOperaceProDigitSpi {
		/**generovat SIP*/
		generovatSIP,
		/**priprav SIP pro prenesení*/
		pripravSIPProPreneseniDoDS,
		/**prenes do do DS*/
		prenestDoDS,
		/**pregenerovatSIP a ulozit v DS*/
		pregenerovatSIPAPrenestDoDS,
		/**aktualizovat stav v DS*/
		aktualizovatStavVDS,
		/**aktualizovat stav archivace v DS*/
		aktualizovatStavArchivace,
		/**vratit z DS*/
		vratitZDS,
		/**zapujcit DIP*/
		zapujcitDIP,
	}
	/**FilSpiulo*/
	const enum TypSeznamuProDigitalniSpisovnu {
		/**Bez SIP balicku*/
		BezSIPBalicku=0,
		/**K ulozeni*/
		KUlozeni=1,
		/**V karantene*/
		VKarantene=2,
		/**Ulozene*/
		Ulozene=3,
		/**Prosle skart.rizenim*/
		ProsleSkartRizenim=4,
		/**Prosle skart.rizenim - archivovano*/
		ProsleSkartRizenimArchivovano=5,
		/**Prosle skart.rizenim - skartovano*/
		ProsleSkartRizenimSkartovano=6,
		/**Odmitnute*/
		Odmitnute=7,
	}
	/**zpusob napojeni na digitalni spisovnu DB param spi_napoj_gdu*/
	const enum TypNapojeniNaDigitSpi {
		/**neurceno*/
		neurceno=99,
		/**Přenos na definované umístění*/
		nenapojeno=0,
		/**priprav SIP pro prenesení*/
		prenosNaDefinovaneUloziste=1,
		/**Po vygenerování SIP balíčků v aplikaci dojde k jejich přenosu do systému pro dlouhodbé uložení (KDS, GDU - Gordic či DESA - ICZ či jiného) pomocí definovaných WS včetně obsahu SIP balíčků.*/
		WS_mini=2,
		/**Po vygenerování SIP balíčků v aplikaci dojde k jejich uložení do umístění dle nastavení spi_ele_ parametrů a přenosu informace o těchto balíčcích v komunikačním umístění do systému pro dlouhodbé uložení (KDS, GDU - Gordic či DESA - ICZ či jiného) pomocídefinovaných WS*/
		WS_komplet=3,
	}
	/**zpusob napojeni na digitalni spisovnu DB param spi_napoj_gdu*/
	const enum TypZobrazeniSeznamuSpi {
		/**neurceno*/
		neurceno,
		/**baliky*/
		baliky,
		/**baliky s obsahem (s dokumenty a spisy)*/
		balikySObsahem,
		/**pouze obsah - dokumenty a spisy*/
		obsahBaliku,
		/**dokumenty a spisy*/
		dokumentyASpisy,
		/**samostatne dokumenty a spisy*/
		samostatneDokumentyASpisy,
	}
	/**stav dávky por zailaní SIP do digit. spisovny Spicdav.stav_dav*/
	const enum SpicdavEnum {
		/**nezpracovano*/
		nezpracovano=0,
		/**Přijato vše*/
		prijatoVse=10,
		/**Zpracováno s chybou*/
		zpracovanoSChybou=20,
		/**Odmítnuto obsah nenalezen*/
		odmitnutoObsahNenalezen=30,
		/**Odmítnuto*/
		odmitnuto=40,
		/**Zpracovává se*/
		zpracovavaSe=50,
	}
	/**stav dle Spicfsk*/
	const enum SpicfskEnum {
		/**neurceno*/
		neurceno=0,
		/**rozhodnutí NDA*/
		rozhodnuti=10,
		/**uložení NDA'*/
		ulozeni=20,
	}
	/**stav dle Spicfsk*/
	const enum SpicmimEnum {
		/**neurceno*/
		neurceno=0,
		/**mimoradna skartace*/
		mimoradnaSkartace=1,
		/**trvaly skart. souhlas*/
		trvalySkartSouhlas=2,
	}
	/**Typ akce s vypujcnim listkemv*/
	const enum TypAkceSVypujckami {
		/**ztraceni*/
		ztraceni=0,
		/**vraceni*/
		vraceni=1,
		/**2 ... schválení žádosti o výpùjcku*/
		schvaleniZadosti=2,
		/**3 ... zamítnutí žádosti o výpùjcku*/
		zamitnutiZadosti=3,
		/**storno žádosti o výpùjcku*/
		stornoZadosti=4,
		/**vlastní vypùjcení na základe žádosti o vypùjceni*/
		vypujceniNaZakladeZadosti=5,
	}
	/**Typ akce s vypujcnim listkemv*/
	const enum TypObsahuBaliku {
		/**rozbaleny - vcetne dok ve spisu*/
		rozbaleny,
		/**nerozbaleny - bez vlozeneych entit ve spisu*/
		nerozbaleny,
	}
	/**stav dávky por zailaní SIP do digit. spisovny Spicdav.stav_dav*/
	const enum TypAkceZaznamuDoGinlser {
		/**Ulozeni datumu posledni aktualizace Sip V digit. spis. DESA*/
		UlozeniDatumuPosledniAktualizaceSipVDESA,
		/**Ulozeni datumu posledni aktualizace archivace Sip V digit. spis. DESA*/
		UlozeniDatumuPosledniAktualizaceStavuArchivaceSipVDESA,
		/**Ulozeni Informace o importu ciselniku typu dok. do DESA*/
		UlozeniInformaceOImportuCiselnikuTypuDokDoDESA,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GBalikDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**
	*     Balík (dto).
	*     
	*/
	interface GBalikDto {
		/**
		*     Konstanty názvů skupin pro validaci.
		*     
		*/
		VALIDATION_GROUP_CORECT_FORMAT?: string|null;
		/**
		*     Konstanty názvů skupin pro validaci.
		*     
		*/
		VALIDATION_GROUP_UPDATE?: string|null;
		/**
		*     Konstanty názvů skupin pro validaci.
		*     
		*/
		VALIDATION_GROUP_CREATE?: string|null;
		/**
		*     Konstanty fragmentů.
		*     
		*/
		FRAGMENT_BALIK?: string|null;
		/**
		*     Konstanty fragmentů.
		*     
		*/
		FRAGMENT_PISEMNOSTI?: string|null;
		/**
		*     Konstanty fragmentů.
		*     
		*/
		FRAGMENT_ULOZNE_MISTO?: string|null;
		/**
		*     Konstanty fragmentů.
		*     
		*/
		FRAGMENT_PERMISSIONS?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**
		*     Gets or sets the ulozne misto.
		*     
		*/
		UlozneMisto?: Gordic.Spi.Interface.GUlozneMistoDto|null;
		/**DBCOLUMN:Seznam.ixs_zup_nad*/
		IxsZupNad?: string|null;
		/**DBCOLUMN:Seznam.priz_nad*/
		PrizNad?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis*/
		PocetPis?: number|null;
		/**DBCOLUMN:Seznam.pocet_j*/
		PocetJ?: number|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		StavSul?: Gordic.Ginis.DbModel.GSpicsulEnum|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		PrizSkn?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		PrizVyp?: number|null;
		/**DBCOLUMN:Seznam.kod_tyz*/
		KodTyz?: number|null;
		/**DBCOLUMN:Seznam.typ_bal_add*/
		TypBalAdd?: number|null;
		/**DBCOLUMN:Seznam.spis_znak_nazev*/
		SpisZnakNazev?: string|null;
		/**DBCOLUMN:Seznam.kod_tyz_txt*/
		KodTyzTxt?: string|null;
		/**DBCOLUMN:Seznam.ixs_vsk*/
		IxsVsk?: string|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		SpisovyPlan?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		SpisovyZnak?: string|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		SkartacniZnak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		SkartacniLhuta?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		Nazev?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		Popis?: string|null;
		/**DBCOLUMN:Seznam.znacka_zup*/
		ZnackaZup?: string|null;
		/**DBCOLUMN:Seznam.prevzato_od_txt*/
		PrevzatoOdTxt?: string|null;
		/**DBCOLUMN:Seznam.prevzal_txt*/
		PrevzalTxt?: string|null;
		/**DBCOLUMN:Seznam.m_err*/
		MErr?: string|null;
		/**DBCOLUMN:Seznam.rok_skartace*/
		RokSkartace?: number|null;
		/**DBCOLUMN:Seznam.bm*/
		Bm?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_pos*/
		BmPos?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.umisteni*/
		Umisteni?: string|null;
		/**DBCOLUMN:Seznam.kubatura*/
		Kubatura?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		IxsSuOd?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_do*/
		IxsSpiDo?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do*/
		IxsFunDo?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_akt*/
		IxsSpiAkt?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		IxsFunAkt?: string|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		DatSkartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vzniku*/
		DatVzniku?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uloz_spi*/
		DatUlozSpi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		DatPrijSpi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		DatZmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		ZmenuProv?: string|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		PozSkar?: string|null;
		/**DBCOLUMN:Seznam.vaha*/
		Vaha?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.police*/
		Police?: string|null;
		/**DBCOLUMN:Seznam.paprsek*/
		Paprsek?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		Poznamka?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		IxsZmpOd?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		SkarLhutaSpra?: number|null;
		/**DBCOLUMN:Seznam.rok_predani_spra*/
		RokPredaniSpra?: number|null;
		/**
		*     RokOd - RokDo.
		*     
		*/
		CasovyRozsahDokumentu?: GIntervalDto<number>|null;
		/**
		*     PrizRokPrep - Příznak, zda bude časový rozsah dokumentů přepočítáván automaticky.
		*     
		*/
		PrepocitavatCasovyRozsahDokumentu?: boolean|null;
		/**
		*     PrizRokSkPre - Příznak, zda bude přepočítávat skartační automaticky.
		*     
		*/
		PrepocitavatSkartacniRezim?: boolean|null;
		/**DBCOLUMN:Seznam.poc_krabic*/
		PocetKrabic?: number|null;
		/**DBCOLUMN:Seznam.pocet_listu*/
		PocetListu?: number|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		IxsLpc?: string|null;
		/**DBCOLUMN:Seznam.m_vyber*/
		MVyber?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis_jed_txt_add*/
		PocetPisJedTxtAdd?: string|null;
		/**DBCOLUMN:Seznam.rozsah_add*/
		RozsahAdd?: string|null;
		/**DBCOLUMN:Seznam.rozsah_new_add*/
		RozsahNewAdd?: string|null;
		/**DBCOLUMN:Seznam.ixs_ska*/
		IxsSka?: string|null;
		/**DBCOLUMN:Seznam.nazev_ska*/
		NazevSka?: string|null;
		/**DBCOLUMN:Seznam.s_ele*/
		SEle?: number|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		SFyz?: number|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		PorCislo?: number|null;
		/**DBCOLUMN:Seznam.zkratka*/
		Zkratka?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		Rok?: number|null;
		/**DBCOLUMN:Seznam.ukladaci_znacka*/
		UkladaciZnacka?: string|null;
		/**DBCOLUMN:Seznam.nazev_su_od*/
		NazevSuOd?: string|null;
		/**DBCOLUMN:Seznam.nazev_fun_od*/
		NazevFunOd?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref_od*/
		NazevRefOd?: string|null;
		/**DBCOLUMN:Seznam.pocet_j_fyz*/
		PocetJFyz?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis_fyz*/
		PocetPisFyz?: number|null;
		/**
		*     PrizPocPrep - Příznak, zda budou počty dokumentů, jednotek a listů (analogové i digitální) přepočítávány automaticky.
		*     
		*/
		PrepocitavatPocty?: boolean|null;
		/**DBCOLUMN:Seznam.priz_skzn_prep*/
		PrizSkznPrep?: number|null;
		/**DBCOLUMN:Seznam.info_ikon_add*/
		InfoIkonAdd?: number|null;
		/**DBCOLUMN:Seznam.skar_znak_spz*/
		SkarZnakSpz?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spz*/
		SkarLhutaSpz?: number|null;
		/**DBCOLUMN:Seznam.priz_skar*/
		PrizSkar?: number|null;
		/**DBCOLUMN:Seznam.ixb_aip*/
		IxbAip?: string|null;
		/**DBCOLUMN:Spiszup.priz_trans_log*/
		PrizTransLog?: number|null;
		/**DBCOLUMN:Prerazitkovani.soubor*/
		Soubor?: string|null;
		/**DBCOLUMN:Prerazitkovani.ixs_cer_c*/
		IxsCerC?: string|null;
		/**DBCOLUMN:Prerazitkovani.dat_do*/
		DatDo?: JsonDate|null;
		/**DBCOLUMN:Prerazitkovani.hash2*/
		Hash2?: string|null;
		/**DBCOLUMN:Prerazitkovani.alg_h2*/
		AlgH2?: string|null;
		/**
		*     Gets or sets the pisemnosti.
		*     
		*/
		Pisemnosti?: Gordic.Spi.Interface.GBalikPisemnostDto[]|null;
		/**
		*     Oprávnění.
		*     
		*/
		Permissions?: Gordic.Spi.Interface.GBalikPermissionDto|null;
		/**
		*     Gets or sets the stav.
		*     
		*/
		Stav?: string|null;
		/**
		*     Rozsireny popis (stav, forma, prideleni, ...) baliku.
		*     
		*/
		RozsirenyPopisBaliku?: string|null;
		/**
		*     Gets or sets the bez spousteci udalosti.
		*     
		*/
		BezSpousteciUdalosti?: boolean|null;
		/**
		*     ZmenitINaVnorenych
		*     
		*/
		ZmenitINaVnorenych?: boolean|null;
	}
	const enum GBalikDtoNames { VALIDATION_GROUP_CORECT_FORMAT = "VALIDATION_GROUP_CORECT_FORMAT", VALIDATION_GROUP_UPDATE = "VALIDATION_GROUP_UPDATE", VALIDATION_GROUP_CREATE = "VALIDATION_GROUP_CREATE", FRAGMENT_BALIK = "FRAGMENT_BALIK", FRAGMENT_PISEMNOSTI = "FRAGMENT_PISEMNOSTI", FRAGMENT_ULOZNE_MISTO = "FRAGMENT_ULOZNE_MISTO", FRAGMENT_PERMISSIONS = "FRAGMENT_PERMISSIONS", ixs_zup = "ixs_zup", UlozneMisto = "UlozneMisto", IxsZupNad = "IxsZupNad", PrizNad = "PrizNad", PocetPis = "PocetPis", PocetJ = "PocetJ", StavSul = "StavSul", PrizSkn = "PrizSkn", PrizVyp = "PrizVyp", KodTyz = "KodTyz", TypBalAdd = "TypBalAdd", SpisZnakNazev = "SpisZnakNazev", KodTyzTxt = "KodTyzTxt", IxsVsk = "IxsVsk", SpisovyPlan = "SpisovyPlan", SpisovyZnak = "SpisovyZnak", SkartacniZnak = "SkartacniZnak", SkartacniLhuta = "SkartacniLhuta", Nazev = "Nazev", Popis = "Popis", ZnackaZup = "ZnackaZup", PrevzatoOdTxt = "PrevzatoOdTxt", PrevzalTxt = "PrevzalTxt", MErr = "MErr", RokSkartace = "RokSkartace", Bm = "Bm", BmPos = "BmPos", Umisteni = "Umisteni", Kubatura = "Kubatura", IxsSuOd = "IxsSuOd", IxsSpiDo = "IxsSpiDo", IxsFunDo = "IxsFunDo", IxsSpiAkt = "IxsSpiAkt", IxsFunAkt = "IxsFunAkt", DatSkartace = "DatSkartace", DatVzniku = "DatVzniku", DatUlozSpi = "DatUlozSpi", DatPrijSpi = "DatPrijSpi", DatZmena = "DatZmena", ZmenuProv = "ZmenuProv", PozSkar = "PozSkar", Vaha = "Vaha", Police = "Police", Paprsek = "Paprsek", Poznamka = "Poznamka", IxsZmpOd = "IxsZmpOd", SkarLhutaSpra = "SkarLhutaSpra", RokPredaniSpra = "RokPredaniSpra", CasovyRozsahDokumentu = "CasovyRozsahDokumentu", PrepocitavatCasovyRozsahDokumentu = "PrepocitavatCasovyRozsahDokumentu", PrepocitavatSkartacniRezim = "PrepocitavatSkartacniRezim", PocetKrabic = "PocetKrabic", PocetListu = "PocetListu", IxsLpc = "IxsLpc", MVyber = "MVyber", PocetPisJedTxtAdd = "PocetPisJedTxtAdd", RozsahAdd = "RozsahAdd", RozsahNewAdd = "RozsahNewAdd", IxsSka = "IxsSka", NazevSka = "NazevSka", SEle = "SEle", SFyz = "SFyz", PorCislo = "PorCislo", Zkratka = "Zkratka", Rok = "Rok", UkladaciZnacka = "UkladaciZnacka", NazevSuOd = "NazevSuOd", NazevFunOd = "NazevFunOd", NazevRefOd = "NazevRefOd", PocetJFyz = "PocetJFyz", PocetPisFyz = "PocetPisFyz", PrepocitavatPocty = "PrepocitavatPocty", PrizSkznPrep = "PrizSkznPrep", InfoIkonAdd = "InfoIkonAdd", SkarZnakSpz = "SkarZnakSpz", SkarLhutaSpz = "SkarLhutaSpz", PrizSkar = "PrizSkar", IxbAip = "IxbAip", PrizTransLog = "PrizTransLog", Soubor = "Soubor", IxsCerC = "IxsCerC", DatDo = "DatDo", Hash2 = "Hash2", AlgH2 = "AlgH2", Pisemnosti = "Pisemnosti", Permissions = "Permissions", Stav = "Stav", RozsirenyPopisBaliku = "RozsirenyPopisBaliku", BezSpousteciUdalosti = "BezSpousteciUdalosti", ZmenitINaVnorenych = "ZmenitINaVnorenych",}
	const enum GBalikDtoFragments { VALIDATION_GROUP_CORECT_FORMAT = "*", VALIDATION_GROUP_UPDATE = "*", VALIDATION_GROUP_CREATE = "*", FRAGMENT_BALIK = "*", FRAGMENT_PISEMNOSTI = "*", FRAGMENT_ULOZNE_MISTO = "*", FRAGMENT_PERMISSIONS = "*", ixs_zup = "*", UlozneMisto = "FRAGMENT_BALIK_ULOZNE_MISTO", IxsZupNad = "FRAGMENT_BALIK", PrizNad = "FRAGMENT_BALIK", PocetPis = "FRAGMENT_BALIK", PocetJ = "FRAGMENT_BALIK", StavSul = "FRAGMENT_BALIK", PrizSkn = "FRAGMENT_BALIK", PrizVyp = "FRAGMENT_BALIK", KodTyz = "FRAGMENT_BALIK", TypBalAdd = "FRAGMENT_BALIK", SpisZnakNazev = "FRAGMENT_BALIK", KodTyzTxt = "FRAGMENT_BALIK", IxsVsk = "FRAGMENT_BALIK", SpisovyPlan = "FRAGMENT_BALIK", SpisovyZnak = "FRAGMENT_BALIK", SkartacniZnak = "FRAGMENT_BALIK", SkartacniLhuta = "FRAGMENT_BALIK", Nazev = "FRAGMENT_BALIK", Popis = "FRAGMENT_BALIK", ZnackaZup = "FRAGMENT_BALIK", PrevzatoOdTxt = "FRAGMENT_BALIK", PrevzalTxt = "FRAGMENT_BALIK", MErr = "FRAGMENT_BALIK", RokSkartace = "FRAGMENT_BALIK", Bm = "FRAGMENT_BALIK", BmPos = "FRAGMENT_BALIK", Umisteni = "FRAGMENT_BALIK", Kubatura = "FRAGMENT_BALIK", IxsSuOd = "FRAGMENT_BALIK", IxsSpiDo = "FRAGMENT_BALIK", IxsFunDo = "FRAGMENT_BALIK", IxsSpiAkt = "FRAGMENT_BALIK", IxsFunAkt = "FRAGMENT_BALIK", DatSkartace = "FRAGMENT_BALIK", DatVzniku = "FRAGMENT_BALIK", DatUlozSpi = "FRAGMENT_BALIK", DatPrijSpi = "FRAGMENT_BALIK", DatZmena = "FRAGMENT_BALIK", ZmenuProv = "FRAGMENT_BALIK", PozSkar = "FRAGMENT_BALIK", Vaha = "FRAGMENT_BALIK", Police = "FRAGMENT_BALIK", Paprsek = "FRAGMENT_BALIK", Poznamka = "FRAGMENT_BALIK", IxsZmpOd = "FRAGMENT_BALIK", SkarLhutaSpra = "FRAGMENT_BALIK", RokPredaniSpra = "FRAGMENT_BALIK", CasovyRozsahDokumentu = "FRAGMENT_BALIK", PrepocitavatCasovyRozsahDokumentu = "FRAGMENT_BALIK", PrepocitavatSkartacniRezim = "FRAGMENT_BALIK", PocetKrabic = "FRAGMENT_BALIK", PocetListu = "FRAGMENT_BALIK", IxsLpc = "FRAGMENT_BALIK", MVyber = "FRAGMENT_BALIK", PocetPisJedTxtAdd = "FRAGMENT_BALIK", RozsahAdd = "FRAGMENT_BALIK", RozsahNewAdd = "FRAGMENT_BALIK", IxsSka = "FRAGMENT_BALIK", NazevSka = "FRAGMENT_BALIK", SEle = "FRAGMENT_BALIK", SFyz = "FRAGMENT_BALIK", PorCislo = "FRAGMENT_BALIK", Zkratka = "FRAGMENT_BALIK", Rok = "FRAGMENT_BALIK", UkladaciZnacka = "FRAGMENT_BALIK", NazevSuOd = "FRAGMENT_BALIK", NazevFunOd = "FRAGMENT_BALIK", NazevRefOd = "FRAGMENT_BALIK", PocetJFyz = "FRAGMENT_BALIK", PocetPisFyz = "FRAGMENT_BALIK", PrepocitavatPocty = "FRAGMENT_BALIK", PrizSkznPrep = "FRAGMENT_BALIK", InfoIkonAdd = "FRAGMENT_BALIK", SkarZnakSpz = "FRAGMENT_BALIK", SkarLhutaSpz = "FRAGMENT_BALIK", PrizSkar = "FRAGMENT_BALIK", IxbAip = "FRAGMENT_BALIK", PrizTransLog = "FRAGMENT_BALIK", Soubor = "FRAGMENT_BALIK", IxsCerC = "FRAGMENT_BALIK", DatDo = "FRAGMENT_BALIK", Hash2 = "FRAGMENT_BALIK", AlgH2 = "FRAGMENT_BALIK", Pisemnosti = "FRAGMENT_BALIK_PISEMNOSTI", Permissions = "FRAGMENT_BALIK_PERMISSIONS", Stav = "FRAGMENT_BALIK", RozsirenyPopisBaliku = "FRAGMENT_BALIK", BezSpousteciUdalosti = "*", ZmenitINaVnorenych = "*",}
	const enum GBalikDtoTypes { VALIDATION_GROUP_CORECT_FORMAT = "string", VALIDATION_GROUP_UPDATE = "string", VALIDATION_GROUP_CREATE = "string", FRAGMENT_BALIK = "string", FRAGMENT_PISEMNOSTI = "string", FRAGMENT_ULOZNE_MISTO = "string", FRAGMENT_PERMISSIONS = "string", ixs_zup = "string", UlozneMisto = "Gordic.Spi.Interface.GUlozneMistoDto", IxsZupNad = "string", PrizNad = "number", PocetPis = "number", PocetJ = "number", StavSul = "Gordic.Ginis.DbModel.GSpicsulEnum", PrizSkn = "number", PrizVyp = "number", KodTyz = "number", TypBalAdd = "number", SpisZnakNazev = "string", KodTyzTxt = "string", IxsVsk = "string", SpisovyPlan = "string", SpisovyZnak = "string", SkartacniZnak = "string", SkartacniLhuta = "number", Nazev = "string", Popis = "string", ZnackaZup = "string", PrevzatoOdTxt = "string", PrevzalTxt = "string", MErr = "string", RokSkartace = "number", Bm = "JsonDecimal", BmPos = "JsonDecimal", Umisteni = "string", Kubatura = "JsonDecimal", IxsSuOd = "string", IxsSpiDo = "string", IxsFunDo = "string", IxsSpiAkt = "string", IxsFunAkt = "string", DatSkartace = "JsonDate", DatVzniku = "JsonDate", DatUlozSpi = "JsonDate", DatPrijSpi = "JsonDate", DatZmena = "JsonDate", ZmenuProv = "string", PozSkar = "string", Vaha = "JsonDecimal", Police = "string", Paprsek = "string", Poznamka = "string", IxsZmpOd = "string", SkarLhutaSpra = "number", RokPredaniSpra = "number", CasovyRozsahDokumentu = "GIntervalDto<number>", PrepocitavatCasovyRozsahDokumentu = "boolean", PrepocitavatSkartacniRezim = "boolean", PocetKrabic = "number", PocetListu = "number", IxsLpc = "string", MVyber = "number", PocetPisJedTxtAdd = "string", RozsahAdd = "string", RozsahNewAdd = "string", IxsSka = "string", NazevSka = "string", SEle = "number", SFyz = "number", PorCislo = "number", Zkratka = "string", Rok = "number", UkladaciZnacka = "string", NazevSuOd = "string", NazevFunOd = "string", NazevRefOd = "string", PocetJFyz = "number", PocetPisFyz = "number", PrepocitavatPocty = "boolean", PrizSkznPrep = "number", InfoIkonAdd = "number", SkarZnakSpz = "string", SkarLhutaSpz = "number", PrizSkar = "number", IxbAip = "string", PrizTransLog = "number", Soubor = "string", IxsCerC = "string", DatDo = "JsonDate", Hash2 = "string", AlgH2 = "string", Pisemnosti = "Gordic.Spi.Interface.GBalikPisemnostDto[]", Permissions = "Gordic.Spi.Interface.GBalikPermissionDto", Stav = "string", RozsirenyPopisBaliku = "string", BezSpousteciUdalosti = "boolean", ZmenitINaVnorenych = "boolean",}
	const enum GBalikDtoTypeLengths { SpisZnakNazev = 240, KodTyzTxt = 50, SpisovyPlan = 5, SpisovyZnak = 50, SkartacniZnak = 2, Nazev = 100, Popis = 100, ZnackaZup = 30, Umisteni = 100, PozSkar = 50, Police = 20, Paprsek = 20, Poznamka = 50, PocetPisJedTxtAdd = 20, RozsahAdd = 20, RozsahNewAdd = 20, NazevSka = 50, Zkratka = 5, UkladaciZnacka = 50, NazevSuOd = 25, NazevFunOd = 25, NazevRefOd = 256, SkarZnakSpz = 2,}
	/**
	*     Oprávnění vázané k balíku.
	*     
	*/
	interface GBalikPermissionDto {
		/**
		*     Oprávnění spouštět akce vztažené k balíku.
		*     
		*/
		Actions?: Gordic.Spi.Interface.GBalikActionsPermissionDto|null;
		/**
		*     Oprávnění editovat jednotlivá políčka s daty balíku.
		*     
		*/
		Fields?: Gordic.Spi.Interface.GBalikFieldsPermissionDto|null;
	}
	const enum GBalikPermissionDtoNames { Actions = "Actions", Fields = "Fields",}
	const enum GBalikPermissionDtoFragments { Actions = "*", Fields = "*",}
	const enum GBalikPermissionDtoTypes { Actions = "Gordic.Spi.Interface.GBalikActionsPermissionDto", Fields = "Gordic.Spi.Interface.GBalikFieldsPermissionDto",}
	const enum GBalikPermissionDtoTypeLengths {}
	/**
	*     Oprávnění spouštět akce vztažené k balíku.
	*     
	*/
	interface GBalikActionsPermissionDto {
		LzeVratitVypujcku: Gordic.General.ApplicationInterface.GPermission;
		LzeZtratitVypujcku: Gordic.General.ApplicationInterface.GPermission;
		LzeZtratitZeSpisovny: Gordic.General.ApplicationInterface.GPermission;
		LzeTiskoutObsah: Gordic.General.ApplicationInterface.GPermission;
		LzeRefresh: Gordic.General.ApplicationInterface.GPermission;
		LzeVytvoritNovy: Gordic.General.ApplicationInterface.GPermission;
		LzeZobraziDetail: Gordic.General.ApplicationInterface.GPermission;
		LzeVratitZtracenyZeSpisovny: Gordic.General.ApplicationInterface.GPermission;
		LzeZtratitZVypujcky: Gordic.General.ApplicationInterface.GPermission;
		LzeStornovat: Gordic.General.ApplicationInterface.GPermission;
		LzeVypujcit: Gordic.General.ApplicationInterface.GPermission;
		LzeZrusitPredani: Gordic.General.ApplicationInterface.GPermission;
		LzePripravitKPredani: Gordic.General.ApplicationInterface.GPermission;
		LzeEditovat: Gordic.General.ApplicationInterface.GPermission;
		LzeUlozit: Gordic.General.ApplicationInterface.GPermission;
		LzeVlozitNeevidovany: Gordic.General.ApplicationInterface.GPermission;
		LzeVlozitDokSpis: Gordic.General.ApplicationInterface.GPermission;
		LzeZmenitFormu: Gordic.General.ApplicationInterface.GPermission;
		LzeZrusitZmeny: Gordic.General.ApplicationInterface.GPermission;
		LzeTiskStitku: Gordic.General.ApplicationInterface.GPermission;
		LzeMazatSkartovanychDokSpis: Gordic.General.ApplicationInterface.GPermission;
		LzeGenerovatSIP: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze generovat sip pro posouzeni.
		*     
		*/
		LzeGenerovatSIPProPosouzeni: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze generovat sip pro archivaci.
		*     
		*/
		LzeGenerovatSIPProArchivaci: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze kontrola metadat.
		*     
		*/
		LzeKontrolaMetadat: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze rozbal vse.
		*     
		*/
		LzeRozbalVse: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze zabal vse.
		*     
		*/
		LzeZabalVse: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze vyjmout pisemnost.
		*     
		*/
		LzeVyjmoutPisemnost: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze premistit.
		*     
		*/
		LzePremistit: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze nacist davku z nda.
		*     
		*/
		LzeNacistDavkuZNda: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze pridat do poznamkoveho bloku.
		*     
		*/
		LzePridatDoPoznamkovehoBloku: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Příznak, zda lze vytvářet žádosti o výpůjčky.
		*     
		*/
		LzeVytvaretZadostiOVypujcky: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBalikActionsPermissionDtoNames { LzeVratitVypujcku = "LzeVratitVypujcku", LzeZtratitVypujcku = "LzeZtratitVypujcku", LzeZtratitZeSpisovny = "LzeZtratitZeSpisovny", LzeTiskoutObsah = "LzeTiskoutObsah", LzeRefresh = "LzeRefresh", LzeVytvoritNovy = "LzeVytvoritNovy", LzeZobraziDetail = "LzeZobraziDetail", LzeVratitZtracenyZeSpisovny = "LzeVratitZtracenyZeSpisovny", LzeZtratitZVypujcky = "LzeZtratitZVypujcky", LzeStornovat = "LzeStornovat", LzeVypujcit = "LzeVypujcit", LzeZrusitPredani = "LzeZrusitPredani", LzePripravitKPredani = "LzePripravitKPredani", LzeEditovat = "LzeEditovat", LzeUlozit = "LzeUlozit", LzeVlozitNeevidovany = "LzeVlozitNeevidovany", LzeVlozitDokSpis = "LzeVlozitDokSpis", LzeZmenitFormu = "LzeZmenitFormu", LzeZrusitZmeny = "LzeZrusitZmeny", LzeTiskStitku = "LzeTiskStitku", LzeMazatSkartovanychDokSpis = "LzeMazatSkartovanychDokSpis", LzeGenerovatSIP = "LzeGenerovatSIP", LzeGenerovatSIPProPosouzeni = "LzeGenerovatSIPProPosouzeni", LzeGenerovatSIPProArchivaci = "LzeGenerovatSIPProArchivaci", LzeKontrolaMetadat = "LzeKontrolaMetadat", LzeRozbalVse = "LzeRozbalVse", LzeZabalVse = "LzeZabalVse", LzeVyjmoutPisemnost = "LzeVyjmoutPisemnost", LzePremistit = "LzePremistit", LzeNacistDavkuZNda = "LzeNacistDavkuZNda", LzePridatDoPoznamkovehoBloku = "LzePridatDoPoznamkovehoBloku", LzeVytvaretZadostiOVypujcky = "LzeVytvaretZadostiOVypujcky",}
	const enum GBalikActionsPermissionDtoFragments { LzeVratitVypujcku = "*", LzeZtratitVypujcku = "*", LzeZtratitZeSpisovny = "*", LzeTiskoutObsah = "*", LzeRefresh = "*", LzeVytvoritNovy = "*", LzeZobraziDetail = "*", LzeVratitZtracenyZeSpisovny = "*", LzeZtratitZVypujcky = "*", LzeStornovat = "*", LzeVypujcit = "*", LzeZrusitPredani = "*", LzePripravitKPredani = "*", LzeEditovat = "*", LzeUlozit = "*", LzeVlozitNeevidovany = "*", LzeVlozitDokSpis = "*", LzeZmenitFormu = "*", LzeZrusitZmeny = "*", LzeTiskStitku = "*", LzeMazatSkartovanychDokSpis = "*", LzeGenerovatSIP = "*", LzeGenerovatSIPProPosouzeni = "*", LzeGenerovatSIPProArchivaci = "*", LzeKontrolaMetadat = "*", LzeRozbalVse = "*", LzeZabalVse = "*", LzeVyjmoutPisemnost = "*", LzePremistit = "*", LzeNacistDavkuZNda = "*", LzePridatDoPoznamkovehoBloku = "*", LzeVytvaretZadostiOVypujcky = "*",}
	const enum GBalikActionsPermissionDtoTypes { LzeVratitVypujcku = "Gordic.General.ApplicationInterface.GPermission", LzeZtratitVypujcku = "Gordic.General.ApplicationInterface.GPermission", LzeZtratitZeSpisovny = "Gordic.General.ApplicationInterface.GPermission", LzeTiskoutObsah = "Gordic.General.ApplicationInterface.GPermission", LzeRefresh = "Gordic.General.ApplicationInterface.GPermission", LzeVytvoritNovy = "Gordic.General.ApplicationInterface.GPermission", LzeZobraziDetail = "Gordic.General.ApplicationInterface.GPermission", LzeVratitZtracenyZeSpisovny = "Gordic.General.ApplicationInterface.GPermission", LzeZtratitZVypujcky = "Gordic.General.ApplicationInterface.GPermission", LzeStornovat = "Gordic.General.ApplicationInterface.GPermission", LzeVypujcit = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitPredani = "Gordic.General.ApplicationInterface.GPermission", LzePripravitKPredani = "Gordic.General.ApplicationInterface.GPermission", LzeEditovat = "Gordic.General.ApplicationInterface.GPermission", LzeUlozit = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitNeevidovany = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitDokSpis = "Gordic.General.ApplicationInterface.GPermission", LzeZmenitFormu = "Gordic.General.ApplicationInterface.GPermission", LzeZrusitZmeny = "Gordic.General.ApplicationInterface.GPermission", LzeTiskStitku = "Gordic.General.ApplicationInterface.GPermission", LzeMazatSkartovanychDokSpis = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatSIP = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatSIPProPosouzeni = "Gordic.General.ApplicationInterface.GPermission", LzeGenerovatSIPProArchivaci = "Gordic.General.ApplicationInterface.GPermission", LzeKontrolaMetadat = "Gordic.General.ApplicationInterface.GPermission", LzeRozbalVse = "Gordic.General.ApplicationInterface.GPermission", LzeZabalVse = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutPisemnost = "Gordic.General.ApplicationInterface.GPermission", LzePremistit = "Gordic.General.ApplicationInterface.GPermission", LzeNacistDavkuZNda = "Gordic.General.ApplicationInterface.GPermission", LzePridatDoPoznamkovehoBloku = "Gordic.General.ApplicationInterface.GPermission", LzeVytvaretZadostiOVypujcky = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBalikActionsPermissionDtoTypeLengths {}
	/**
	*     Oprávnění editovat jednotlivá políčka s daty balíku.
	*     
	*/
	interface GBalikFieldsPermissionDto {
		/**
		*     Gets or sets the lze editovat ixs zup.
		*     
		*/
		LzeEditovatIxsZup: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat znacka zup.
		*     
		*/
		LzeEditovatZnackaZup: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat datum vzniku.
		*     
		*/
		LzeEditovatDatumVzniku: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat nazev.
		*     
		*/
		LzeEditovatNazev: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat pocet dokumentu.
		*     
		*/
		LzeEditovatPocetDokumentu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat pocet jednotek.
		*     
		*/
		LzeEditovatPocetJednotek: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat pocet listu.
		*     
		*/
		LzeEditovatPocetListu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat pocet analogovych dokumentu.
		*     
		*/
		LzeEditovatPocetAnalogovychDokumentu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat pocet analogovych jednotek.
		*     
		*/
		LzeEditovatPocetAnalogovychJednotek: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat spisovy plan.
		*     
		*/
		LzeEditovatSpisovyPlan: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat spisovy znak.
		*     
		*/
		LzeEditovatSpisovyZnak: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat rok skartace.
		*     
		*/
		LzeEditovatRokSkartace: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat prepocitavat pocet.
		*     
		*/
		LzeEditovatPrepocitavatPocet: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat prepocitavat skartacni rezim.
		*     
		*/
		LzeEditovatPrepocitavatSkartacniRezim: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat bez spousteci udalosti.
		*     
		*/
		LzeEditovatBezSpousteciUdalosti: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat skartacni lhuta.
		*     
		*/
		LzeEditovatSkartacniLhuta: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat skartacni lhuta spra.
		*     
		*/
		LzeEditovatSkartacniLhutaSpra: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat skartacni znak.
		*     
		*/
		LzeEditovatSkartacniZnak: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the rok predani do spravniho archivu.
		*     
		*/
		LzeEditovatRokPredaniDoSpravnihoArchivu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat zmenit spisovy znak i na vnorenych.
		*     
		*/
		LzeEditovatZmenitSpisovyZnakINaVnorenych: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat ulozne misto.
		*     
		*/
		LzeEditovatUlozneMisto: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat typ ulozneho mista.
		*     
		*/
		LzeEditovatTypUloznehoMista: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat nadrizena ulozna mista.
		*     
		*/
		LzeEditovatNadrizenaUloznaMista: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat budova.
		*     
		*/
		LzeEditovatBudova: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat segment.
		*     
		*/
		LzeEditovatSegment: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat mistnost.
		*     
		*/
		LzeEditovatMistnost: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat paprsek.
		*     
		*/
		LzeEditovatPaprsek: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat police.
		*     
		*/
		LzeEditovatPolice: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat aktivita.
		*     
		*/
		LzeEditovatAktivita: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat datum ulozeni.
		*     
		*/
		LzeEditovatDatumUlozeni: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat umisteni.
		*     
		*/
		LzeEditovatUmisteni: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat bezny metr pozice.
		*     
		*/
		LzeEditovatBeznyMetrPozice: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat bezny metr velikost.
		*     
		*/
		LzeEditovatBeznyMetrVelikost: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat kubatura.
		*     
		*/
		LzeEditovatKubatura: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat vaha.
		*     
		*/
		LzeEditovatVaha: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat vlastnik.
		*     
		*/
		LzeEditovatVlastnik: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat datum skartace.
		*     
		*/
		LzeEditovatDatumSkartace: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat popis.
		*     
		*/
		LzeEditovatPopis: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat stav.
		*     
		*/
		LzeEditovatStav: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat casovy rozsah dokumentu.
		*     
		*/
		LzeEditovatCasovyRozsahDokumentu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat pocet krabic.
		*     
		*/
		LzeEditovatPocetKrabic: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat prevzato od.
		*     
		*/
		LzeEditovatPrevzatoOd: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat prevzato od spisovy uzel.
		*     
		*/
		LzeEditovatPrevzatoOdSpisovyUzel: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat typ baliku.
		*     
		*/
		LzeEditovatTypBaliku: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat prepocitavat casovy rozsah dokumentu.
		*     
		*/
		LzeEditovatPrepocitavatCasovyRozsahDokumentu: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the lze editovat poznamka.
		*     
		*/
		LzeEditovatPoznamka: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     Gets or sets the permission indicating whether the perpetual group can be edited.
		*     
		*/
		LzeEditovatVecnaSkupina: Gordic.General.ApplicationInterface.GPermission;
		/**
		*     dle DB parametru
		*     
		*/
		IfSkartRizeniPoEntitach: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBalikFieldsPermissionDtoNames { LzeEditovatIxsZup = "LzeEditovatIxsZup", LzeEditovatZnackaZup = "LzeEditovatZnackaZup", LzeEditovatDatumVzniku = "LzeEditovatDatumVzniku", LzeEditovatNazev = "LzeEditovatNazev", LzeEditovatPocetDokumentu = "LzeEditovatPocetDokumentu", LzeEditovatPocetJednotek = "LzeEditovatPocetJednotek", LzeEditovatPocetListu = "LzeEditovatPocetListu", LzeEditovatPocetAnalogovychDokumentu = "LzeEditovatPocetAnalogovychDokumentu", LzeEditovatPocetAnalogovychJednotek = "LzeEditovatPocetAnalogovychJednotek", LzeEditovatSpisovyPlan = "LzeEditovatSpisovyPlan", LzeEditovatSpisovyZnak = "LzeEditovatSpisovyZnak", LzeEditovatRokSkartace = "LzeEditovatRokSkartace", LzeEditovatPrepocitavatPocet = "LzeEditovatPrepocitavatPocet", LzeEditovatPrepocitavatSkartacniRezim = "LzeEditovatPrepocitavatSkartacniRezim", LzeEditovatBezSpousteciUdalosti = "LzeEditovatBezSpousteciUdalosti", LzeEditovatSkartacniLhuta = "LzeEditovatSkartacniLhuta", LzeEditovatSkartacniLhutaSpra = "LzeEditovatSkartacniLhutaSpra", LzeEditovatSkartacniZnak = "LzeEditovatSkartacniZnak", LzeEditovatRokPredaniDoSpravnihoArchivu = "LzeEditovatRokPredaniDoSpravnihoArchivu", LzeEditovatZmenitSpisovyZnakINaVnorenych = "LzeEditovatZmenitSpisovyZnakINaVnorenych", LzeEditovatUlozneMisto = "LzeEditovatUlozneMisto", LzeEditovatTypUloznehoMista = "LzeEditovatTypUloznehoMista", LzeEditovatNadrizenaUloznaMista = "LzeEditovatNadrizenaUloznaMista", LzeEditovatBudova = "LzeEditovatBudova", LzeEditovatSegment = "LzeEditovatSegment", LzeEditovatMistnost = "LzeEditovatMistnost", LzeEditovatPaprsek = "LzeEditovatPaprsek", LzeEditovatPolice = "LzeEditovatPolice", LzeEditovatAktivita = "LzeEditovatAktivita", LzeEditovatDatumUlozeni = "LzeEditovatDatumUlozeni", LzeEditovatUmisteni = "LzeEditovatUmisteni", LzeEditovatBeznyMetrPozice = "LzeEditovatBeznyMetrPozice", LzeEditovatBeznyMetrVelikost = "LzeEditovatBeznyMetrVelikost", LzeEditovatKubatura = "LzeEditovatKubatura", LzeEditovatVaha = "LzeEditovatVaha", LzeEditovatVlastnik = "LzeEditovatVlastnik", LzeEditovatDatumSkartace = "LzeEditovatDatumSkartace", LzeEditovatPopis = "LzeEditovatPopis", LzeEditovatStav = "LzeEditovatStav", LzeEditovatCasovyRozsahDokumentu = "LzeEditovatCasovyRozsahDokumentu", LzeEditovatPocetKrabic = "LzeEditovatPocetKrabic", LzeEditovatPrevzatoOd = "LzeEditovatPrevzatoOd", LzeEditovatPrevzatoOdSpisovyUzel = "LzeEditovatPrevzatoOdSpisovyUzel", LzeEditovatTypBaliku = "LzeEditovatTypBaliku", LzeEditovatPrepocitavatCasovyRozsahDokumentu = "LzeEditovatPrepocitavatCasovyRozsahDokumentu", LzeEditovatPoznamka = "LzeEditovatPoznamka", LzeEditovatVecnaSkupina = "LzeEditovatVecnaSkupina", IfSkartRizeniPoEntitach = "IfSkartRizeniPoEntitach",}
	const enum GBalikFieldsPermissionDtoFragments { LzeEditovatIxsZup = "*", LzeEditovatZnackaZup = "*", LzeEditovatDatumVzniku = "*", LzeEditovatNazev = "*", LzeEditovatPocetDokumentu = "*", LzeEditovatPocetJednotek = "*", LzeEditovatPocetListu = "*", LzeEditovatPocetAnalogovychDokumentu = "*", LzeEditovatPocetAnalogovychJednotek = "*", LzeEditovatSpisovyPlan = "*", LzeEditovatSpisovyZnak = "*", LzeEditovatRokSkartace = "*", LzeEditovatPrepocitavatPocet = "*", LzeEditovatPrepocitavatSkartacniRezim = "*", LzeEditovatBezSpousteciUdalosti = "*", LzeEditovatSkartacniLhuta = "*", LzeEditovatSkartacniLhutaSpra = "*", LzeEditovatSkartacniZnak = "*", LzeEditovatRokPredaniDoSpravnihoArchivu = "*", LzeEditovatZmenitSpisovyZnakINaVnorenych = "*", LzeEditovatUlozneMisto = "*", LzeEditovatTypUloznehoMista = "*", LzeEditovatNadrizenaUloznaMista = "*", LzeEditovatBudova = "*", LzeEditovatSegment = "*", LzeEditovatMistnost = "*", LzeEditovatPaprsek = "*", LzeEditovatPolice = "*", LzeEditovatAktivita = "*", LzeEditovatDatumUlozeni = "*", LzeEditovatUmisteni = "*", LzeEditovatBeznyMetrPozice = "*", LzeEditovatBeznyMetrVelikost = "*", LzeEditovatKubatura = "*", LzeEditovatVaha = "*", LzeEditovatVlastnik = "*", LzeEditovatDatumSkartace = "*", LzeEditovatPopis = "*", LzeEditovatStav = "*", LzeEditovatCasovyRozsahDokumentu = "*", LzeEditovatPocetKrabic = "*", LzeEditovatPrevzatoOd = "*", LzeEditovatPrevzatoOdSpisovyUzel = "*", LzeEditovatTypBaliku = "*", LzeEditovatPrepocitavatCasovyRozsahDokumentu = "*", LzeEditovatPoznamka = "*", LzeEditovatVecnaSkupina = "*", IfSkartRizeniPoEntitach = "*",}
	const enum GBalikFieldsPermissionDtoTypes { LzeEditovatIxsZup = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatZnackaZup = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDatumVzniku = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatNazev = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocetDokumentu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocetJednotek = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocetListu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocetAnalogovychDokumentu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocetAnalogovychJednotek = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpisovyPlan = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSpisovyZnak = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatRokSkartace = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPrepocitavatPocet = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPrepocitavatSkartacniRezim = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatBezSpousteciUdalosti = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSkartacniLhuta = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSkartacniLhutaSpra = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSkartacniZnak = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatRokPredaniDoSpravnihoArchivu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatZmenitSpisovyZnakINaVnorenych = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatUlozneMisto = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatTypUloznehoMista = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatNadrizenaUloznaMista = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatBudova = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatSegment = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatMistnost = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPaprsek = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPolice = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatAktivita = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDatumUlozeni = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatUmisteni = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatBeznyMetrPozice = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatBeznyMetrVelikost = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatKubatura = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVaha = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVlastnik = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatDatumSkartace = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPopis = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatStav = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatCasovyRozsahDokumentu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPocetKrabic = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPrevzatoOd = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPrevzatoOdSpisovyUzel = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatTypBaliku = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPrepocitavatCasovyRozsahDokumentu = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatPoznamka = "Gordic.General.ApplicationInterface.GPermission", LzeEditovatVecnaSkupina = "Gordic.General.ApplicationInterface.GPermission", IfSkartRizeniPoEntitach = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBalikFieldsPermissionDtoTypeLengths {}
	/**
	*     GBalikFilter.
	*     
	*/
	const enum GBalikFilter {
		/**ixs zup*/
		ixs_zup,
	}
	interface Konverze {
	}
	const enum KonverzeNames {}
	const enum KonverzeFragments {}
	const enum KonverzeTypes {}
	const enum KonverzeTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GBalikListDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**DBTABLE:~*/
	interface GBalikListDto extends Gordic.Spi.Interface.GDokSpisSpiListBaseDto {
		/**DBCOLUMN:Seznam.ixs_ulm*/
		ixs_ulm?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup_nad*/
		ixs_zup_nad?: string|null;
		/**DBCOLUMN:Seznam.priz_nad*/
		priz_nad?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis*/
		pocet_pis?: number|null;
		/**DBCOLUMN:Seznam.pocet_j*/
		pocet_j?: number|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.priz_skn_txt*/
		priz_skn_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp_txt*/
		priz_vyp_txt?: string|null;
		/**DBCOLUMN:Seznam.kod_tyz*/
		kod_tyz?: number|null;
		/**DBCOLUMN:Seznam.typ_bal_add*/
		typ_bal_add?: number|null;
		/**DBCOLUMN:Seznam.spis_znak_nazev*/
		spis_znak_nazev?: string|null;
		/**DBCOLUMN:Seznam.kod_tyz_txt*/
		kod_tyz_txt?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.znacka_zup*/
		znacka_zup?: string|null;
		/**DBCOLUMN:Seznam.prevzato_od_txt*/
		prevzato_od_txt?: string|null;
		/**DBCOLUMN:Seznam.prevzal_txt*/
		prevzal_txt?: string|null;
		/**DBCOLUMN:Seznam.rok_skartace_new*/
		rok_skartace_new?: number|null;
		/**DBCOLUMN:Seznam.kubatura*/
		kubatura?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_do*/
		ixs_spi_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do*/
		ixs_fun_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_akt*/
		ixs_spi_akt?: string|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uloz_spi*/
		dat_uloz_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		poz_skar?: string|null;
		/**DBCOLUMN:Seznam.vaha*/
		vaha?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.police*/
		police?: string|null;
		/**DBCOLUMN:Seznam.paprsek*/
		paprsek?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:Seznam.rok_predani_spra*/
		rok_predani_spra?: number|null;
		/**DBCOLUMN:Seznam.rok_predani_spra_new*/
		rok_predani_spra_new?: number|null;
		/**DBCOLUMN:Seznam.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:Seznam.rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:Seznam.priz_rok_prep*/
		priz_rok_prep?: number|null;
		/**DBCOLUMN:Seznam.priz_rok_sk_pre*/
		priz_rok_sk_pre?: number|null;
		/**DBCOLUMN:Seznam.poc_krabic*/
		poc_krabic?: number|null;
		/**DBCOLUMN:Seznam.pocet_listu*/
		pocet_listu?: number|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:Seznam.pocet_pis_jed_txt_add*/
		pocet_pis_jed_txt_add?: string|null;
		/**DBCOLUMN:Seznam.rozsah_add*/
		rozsah_add?: string|null;
		/**DBCOLUMN:Seznam.rozsah_new_add*/
		rozsah_new_add?: string|null;
		/**DBCOLUMN:Seznam.ixs_ska*/
		ixs_ska?: string|null;
		/**DBCOLUMN:Seznam.nazev_ska*/
		nazev_ska?: string|null;
		/**DBCOLUMN:Seznam.ukladaci_znacka*/
		ukladaci_znacka?: string|null;
		/**DBCOLUMN:Seznam.nazev_su_od*/
		nazev_su_od?: string|null;
		/**DBCOLUMN:Seznam.nazev_fun_od*/
		nazev_fun_od?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref_od*/
		nazev_ref_od?: string|null;
		/**DBCOLUMN:Seznam.pocet_j_fyz*/
		pocet_j_fyz?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis_fyz*/
		pocet_pis_fyz?: number|null;
		/**DBCOLUMN:Seznam.priz_poc_prep*/
		priz_poc_prep?: number|null;
		/**DBCOLUMN:Seznam.priz_skzn_prep*/
		priz_skzn_prep?: number|null;
		/**DBCOLUMN:Seznam.skar_znak_spz*/
		skar_znak_spz?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spz*/
		skar_lhuta_spz?: number|null;
		/**DBCOLUMN:Seznam.priz_skar*/
		priz_skar?: number|null;
		/**DBCOLUMN:Seznam.ixb_aip*/
		ixb_aip?: string|null;
		/**pid baliku podrizeneho*/
		ixs_zup_pod?: string|null;
		/**DBCOLUMN:Spiszup.priz_trans_log*/
		priz_trans_log?: number|null;
		/**DBCOLUMN:Prerazitkovani.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:Prerazitkovani.ixs_cer_c*/
		ixs_cer_c?: string|null;
		/**DBCOLUMN:Prerazitkovani.rok_od_do_add*/
		rok_od_do_add?: string|null;
		/**DBCOLUMN:Prerazitkovani.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Prerazitkovani.hash2*/
		hash2?: string|null;
		/**DBCOLUMN:Prerazitkovani.alg_h2*/
		alg_h2?: string|null;
		/**nazev_ref_akt*/
		nazev_ref_akt?: string|null;
		/**nazev aktualni spisovny*/
		nazev_spi_akt?: string|null;
		/**zkraceny nazev aktualni spisovny*/
		zkratka_nazev_spi_akt?: string|null;
		/**nazev_ref_akt*/
		jeVeSpisovne?: boolean|null;
		/**ixb_trans_logu*/
		ixb_trans_logu?: string|null;
		/**info u uloznem miste*/
		ulmDto?: Gordic.Spi.Interface.GSpisulmDto|null;
	}
	const enum GBalikListDtoNames { ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", pocet_j = "pocet_j", priz_skn = "priz_skn", priz_skn_txt = "priz_skn_txt", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_znak_nazev = "spis_znak_nazev", kod_tyz_txt = "kod_tyz_txt", popis = "popis", znacka_zup = "znacka_zup", prevzato_od_txt = "prevzato_od_txt", prevzal_txt = "prevzal_txt", rok_skartace_new = "rok_skartace_new", kubatura = "kubatura", ixs_su_od = "ixs_su_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", poz_skar = "poz_skar", vaha = "vaha", police = "police", paprsek = "paprsek", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_predani_spra_new = "rok_predani_spra_new", rok_od = "rok_od", rok_do = "rok_do", priz_rok_prep = "priz_rok_prep", priz_rok_sk_pre = "priz_rok_sk_pre", poc_krabic = "poc_krabic", pocet_listu = "pocet_listu", ixs_lpc = "ixs_lpc", pocet_pis_jed_txt_add = "pocet_pis_jed_txt_add", rozsah_add = "rozsah_add", rozsah_new_add = "rozsah_new_add", ixs_ska = "ixs_ska", nazev_ska = "nazev_ska", ukladaci_znacka = "ukladaci_znacka", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_ref_od = "nazev_ref_od", pocet_j_fyz = "pocet_j_fyz", pocet_pis_fyz = "pocet_pis_fyz", priz_poc_prep = "priz_poc_prep", priz_skzn_prep = "priz_skzn_prep", skar_znak_spz = "skar_znak_spz", skar_lhuta_spz = "skar_lhuta_spz", priz_skar = "priz_skar", ixb_aip = "ixb_aip", ixs_zup_pod = "ixs_zup_pod", priz_trans_log = "priz_trans_log", soubor = "soubor", ixs_cer_c = "ixs_cer_c", rok_od_do_add = "rok_od_do_add", dat_do = "dat_do", hash2 = "hash2", alg_h2 = "alg_h2", nazev_ref_akt = "nazev_ref_akt", nazev_spi_akt = "nazev_spi_akt", zkratka_nazev_spi_akt = "zkratka_nazev_spi_akt", jeVeSpisovne = "jeVeSpisovne", ixb_trans_logu = "ixb_trans_logu", ulmDto = "ulmDto", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", ixs_zup = "ixs_zup", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", odesilatel = "odesilatel", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", skar_lhuta = "skar_lhuta", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", rok_skartace = "rok_skartace", zkratka = "zkratka", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", m_err = "m_err", m_vyber = "m_vyber", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log",}
	const enum GBalikListDtoFragments { ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", pocet_j = "*", priz_skn = "*", priz_skn_txt = "*", priz_vyp = "*", priz_vyp_txt = "*", kod_tyz = "*", typ_bal_add = "*", spis_znak_nazev = "*", kod_tyz_txt = "*", popis = "*", znacka_zup = "*", prevzato_od_txt = "*", prevzal_txt = "*", rok_skartace_new = "*", kubatura = "*", ixs_su_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", poz_skar = "*", vaha = "*", police = "*", paprsek = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_predani_spra_new = "*", rok_od = "*", rok_do = "*", priz_rok_prep = "*", priz_rok_sk_pre = "*", poc_krabic = "*", pocet_listu = "*", ixs_lpc = "*", pocet_pis_jed_txt_add = "*", rozsah_add = "*", rozsah_new_add = "*", ixs_ska = "*", nazev_ska = "*", ukladaci_znacka = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_ref_od = "*", pocet_j_fyz = "*", pocet_pis_fyz = "*", priz_poc_prep = "*", priz_skzn_prep = "*", skar_znak_spz = "*", skar_lhuta_spz = "*", priz_skar = "*", ixb_aip = "*", ixs_zup_pod = "*", priz_trans_log = "*", soubor = "*", ixs_cer_c = "*", rok_od_do_add = "*", dat_do = "*", hash2 = "*", alg_h2 = "*", nazev_ref_akt = "*", nazev_spi_akt = "*", zkratka_nazev_spi_akt = "*", jeVeSpisovne = "*", ixb_trans_logu = "*", ulmDto = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", ixs_zup = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", odesilatel = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", nazev_su_do = "*", nazev_rf_cil = "*", skar_lhuta = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", rok_skartace = "*", zkratka = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", m_err = "*", m_vyber = "*", info_ikon_add = "*", _gdpr_stav_log = "*",}
	const enum GBalikListDtoTypes { ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", pocet_j = "number", priz_skn = "number", priz_skn_txt = "string", priz_vyp = "number", priz_vyp_txt = "string", kod_tyz = "number", typ_bal_add = "number", spis_znak_nazev = "string", kod_tyz_txt = "string", popis = "string", znacka_zup = "string", prevzato_od_txt = "string", prevzal_txt = "string", rok_skartace_new = "number", kubatura = "JsonDecimal", ixs_su_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", poz_skar = "string", vaha = "JsonDecimal", police = "string", paprsek = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_predani_spra_new = "number", rok_od = "number", rok_do = "number", priz_rok_prep = "number", priz_rok_sk_pre = "number", poc_krabic = "number", pocet_listu = "number", ixs_lpc = "string", pocet_pis_jed_txt_add = "string", rozsah_add = "string", rozsah_new_add = "string", ixs_ska = "string", nazev_ska = "string", ukladaci_znacka = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_ref_od = "string", pocet_j_fyz = "number", pocet_pis_fyz = "number", priz_poc_prep = "number", priz_skzn_prep = "number", skar_znak_spz = "string", skar_lhuta_spz = "number", priz_skar = "number", ixb_aip = "string", ixs_zup_pod = "string", priz_trans_log = "number", soubor = "string", ixs_cer_c = "string", rok_od_do_add = "string", dat_do = "JsonDate", hash2 = "string", alg_h2 = "string", nazev_ref_akt = "string", nazev_spi_akt = "string", zkratka_nazev_spi_akt = "string", jeVeSpisovne = "boolean", ixb_trans_logu = "string", ulmDto = "Gordic.Spi.Interface.GSpisulmDto", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", ixs_zup = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", odesilatel = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", nazev_su_do = "string", nazev_rf_cil = "string", skar_lhuta = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", rok_skartace = "number", zkratka = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", m_err = "string", m_vyber = "number", info_ikon_add = "number", _gdpr_stav_log = "number",}
	const enum GBalikListDtoTypeLengths { ixs_ulm = 12, ixs_zup_nad = 12, spis_znak_nazev = 240, kod_tyz_txt = 50, popis = 100, znacka_zup = 30, ixs_su_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, poz_skar = 50, police = 20, paprsek = 20, ixs_zmp_od = 12, ixs_lpc = 12, pocet_pis_jed_txt_add = 20, rozsah_add = 20, rozsah_new_add = 20, ixs_ska = 12, nazev_ska = 50, ukladaci_znacka = 50, nazev_su_od = 256, nazev_fun_od = 256, nazev_ref_od = 256, skar_znak_spz = 2, ixb_aip = 12, ixs_zup_pod = 12, ixs_cer_c = 12, ixb_trans_logu = 12, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, misto_vzniku = 100, spis_pl = 5, spis_znak = 50, skar_znak = 2, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GBalikPisemnostDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**GBalikPisemnostDto*/
	interface GBalikPisemnostDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.priz_zup*/
		priz_zup?: number|null;
		/**DBCOLUMN:Seznam.priz_spis*/
		priz_spis?: number|null;
		/**DBCOLUMN:Seznam.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		stav_sul?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_vyriz*/
		dat_vyriz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		dat_prij_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		poz_skar?: string|null;
		/**DBCOLUMN:Seznam.dat_uzav*/
		dat_uzav?: JsonDate|null;
		/**DBCOLUMN:Seznam.status_pis*/
		status_pis?: number|null;
		/**DBCOLUMN:Seznam.obsah_text*/
		obsah_text?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:Seznam.s_uzav*/
		s_uzav?: number|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:Seznam.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:Seznam.priz_neevid*/
		priz_neevid?: number|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.stav_k_f*/
		stav_k_f?: number|null;
		/**DBCOLUMN:Seznam.ixb_sip*/
		ixb_sip?: string|null;
		/**DBCOLUMN:Seznam.stav_ext_spi*/
		stav_ext_spi?: number|null;
		/**DBCOLUMN:Seznam.id_ext_spi*/
		id_ext_spi?: string|null;
		/**DBCOLUMN:Seznam.stav_ext_arch*/
		stav_ext_arch?: number|null;
		/**DBCOLUMN:Seznam.id_ext_arch*/
		id_ext_arch?: string|null;
		/**DBCOLUMN:Seznam.typ_duv_del*/
		typ_duv_del?: number|null;
		/**DBCOLUMN:Seznam.ixb_neevid*/
		ixb_neevid?: string|null;
		/**DBCOLUMN:Seznam.rok_skartace*/
		rok_skartace?: number|null;
		/**DBCOLUMN:Seznam.ixb_nda_4*/
		ixb_nda_4?: string|null;
		/**DBCOLUMN:Seznam.ixb_nda_4_a*/
		ixb_nda_4_a?: string|null;
		/**DBCOLUMN:Seznam.typ_spis*/
		typ_spis?: number|null;
		/**DBCOLUMN:Seznam.priz_pos_na*/
		priz_pos_na?: number|null;
		/**DBCOLUMN:Seznam.poznamka_pos*/
		poznamka_pos?: string|null;
		/**DBCOLUMN:Seznam.nazev_zmenu_prov*/
		nazev_zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena_wflspid*/
		dat_zmena_wflspid?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena_wflspidxx*/
		dat_zmena_wflspidxx?: JsonDate|null;
		/**DBCOLUMN:Seznam.uzo*/
		uzo?: string|null;
		/**DBCOLUMN:Seznam.stav_ext_arch_txt*/
		stav_ext_arch_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_pos_na_txt*/
		priz_pos_na_txt?: string|null;
		/**DBCOLUMN:Seznam.doctype_bitmap*/
		doctype_bitmap?: Gordic.Wfl.Interface.PisemnostBitmap|null;
		/**DBCOLUMN:Seznam.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:Seznam.m_err*/
		m_err?: string|null;
		/**DBCOLUMN:Seznam.wflspid_priz_spis*/
		wflspid_priz_spis?: number|null;
		/**The stav sul text*/
		stav_sul_txt?: string|null;
		/**The priz vyp text*/
		priz_vyp_txt?: string|null;
		/**Vysledna Ikona po zavolani funkce IkonaTypEntity*/
		typ_entity_ico?: Gordic.Wfl.Interface.TypEntityIco|null;
		/**Gets or sets the ixs vyp.*/
		ixs_vyl?: string|null;
		/**Název věcné skupiny.*/
		vsk_nazev?: string|null;
		/**Oprávnění.*/
		Permissions?: Gordic.Spi.Interface.GBalikPisemnostPermissionDto|null;
	}
	const enum GBalikPisemnostDtoNames { ixp = "ixp", ixs_zup = "ixs_zup", priz_zup = "priz_zup", priz_spis = "priz_spis", ixp_spis = "ixp_spis", stav_sul = "stav_sul", priz_vyp = "priz_vyp", priz_skn = "priz_skn", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev = "nazev", akt_znacka = "akt_znacka", poznamka = "poznamka", ixs_su_od = "ixs_su_od", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", dat_vyriz = "dat_vyriz", dat_pod = "dat_pod", dat_skartace = "dat_skartace", dat_prij_spi = "dat_prij_spi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poz_skar = "poz_skar", dat_uzav = "dat_uzav", status_pis = "status_pis", obsah_text = "obsah_text", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", s_uzav = "s_uzav", ixs_lpc = "ixs_lpc", s_ele = "s_ele", s_fyz = "s_fyz", priz_neevid = "priz_neevid", k_v = "k_v", stav_k_f = "stav_k_f", ixb_sip = "ixb_sip", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", stav_ext_arch = "stav_ext_arch", id_ext_arch = "id_ext_arch", typ_duv_del = "typ_duv_del", ixb_neevid = "ixb_neevid", rok_skartace = "rok_skartace", ixb_nda_4 = "ixb_nda_4", ixb_nda_4_a = "ixb_nda_4_a", typ_spis = "typ_spis", priz_pos_na = "priz_pos_na", poznamka_pos = "poznamka_pos", nazev_zmenu_prov = "nazev_zmenu_prov", typ_ag = "typ_ag", dat_zmena_wflspid = "dat_zmena_wflspid", dat_zmena_wflspidxx = "dat_zmena_wflspidxx", uzo = "uzo", stav_ext_arch_txt = "stav_ext_arch_txt", priz_pos_na_txt = "priz_pos_na_txt", doctype_bitmap = "doctype_bitmap", m_vyber = "m_vyber", m_err = "m_err", wflspid_priz_spis = "wflspid_priz_spis", stav_sul_txt = "stav_sul_txt", priz_vyp_txt = "priz_vyp_txt", typ_entity_ico = "typ_entity_ico", ixs_vyl = "ixs_vyl", vsk_nazev = "vsk_nazev", Permissions = "Permissions",}
	const enum GBalikPisemnostDtoFragments { ixp = "*", ixs_zup = "*", priz_zup = "*", priz_spis = "*", ixp_spis = "*", stav_sul = "*", priz_vyp = "*", priz_skn = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", nazev = "*", akt_znacka = "*", poznamka = "*", ixs_su_od = "*", ixs_spi = "*", ixs_fun = "*", dat_vyriz = "*", dat_pod = "*", dat_skartace = "*", dat_prij_spi = "*", dat_zmena = "*", zmenu_prov = "*", poz_skar = "*", dat_uzav = "*", status_pis = "*", obsah_text = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", s_uzav = "*", ixs_lpc = "*", s_ele = "*", s_fyz = "*", priz_neevid = "*", k_v = "*", stav_k_f = "*", ixb_sip = "*", stav_ext_spi = "*", id_ext_spi = "*", stav_ext_arch = "*", id_ext_arch = "*", typ_duv_del = "*", ixb_neevid = "*", rok_skartace = "*", ixb_nda_4 = "*", ixb_nda_4_a = "*", typ_spis = "*", priz_pos_na = "*", poznamka_pos = "*", nazev_zmenu_prov = "*", typ_ag = "*", dat_zmena_wflspid = "*", dat_zmena_wflspidxx = "*", uzo = "*", stav_ext_arch_txt = "*", priz_pos_na_txt = "*", doctype_bitmap = "*", m_vyber = "*", m_err = "*", wflspid_priz_spis = "*", stav_sul_txt = "*", priz_vyp_txt = "*", typ_entity_ico = "*", ixs_vyl = "*", vsk_nazev = "*", Permissions = "*",}
	const enum GBalikPisemnostDtoTypes { ixp = "string", ixs_zup = "string", priz_zup = "number", priz_spis = "number", ixp_spis = "string", stav_sul = "number", priz_vyp = "number", priz_skn = "number", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", nazev = "string", akt_znacka = "string", poznamka = "string", ixs_su_od = "string", ixs_spi = "string", ixs_fun = "string", dat_vyriz = "JsonDate", dat_pod = "JsonDate", dat_skartace = "JsonDate", dat_prij_spi = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", poz_skar = "string", dat_uzav = "JsonDate", status_pis = "number", obsah_text = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", s_uzav = "number", ixs_lpc = "string", s_ele = "number", s_fyz = "number", priz_neevid = "number", k_v = "number", stav_k_f = "number", ixb_sip = "string", stav_ext_spi = "number", id_ext_spi = "string", stav_ext_arch = "number", id_ext_arch = "string", typ_duv_del = "number", ixb_neevid = "string", rok_skartace = "number", ixb_nda_4 = "string", ixb_nda_4_a = "string", typ_spis = "number", priz_pos_na = "number", poznamka_pos = "string", nazev_zmenu_prov = "string", typ_ag = "number", dat_zmena_wflspid = "JsonDate", dat_zmena_wflspidxx = "JsonDate", uzo = "string", stav_ext_arch_txt = "string", priz_pos_na_txt = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", m_vyber = "number", m_err = "string", wflspid_priz_spis = "number", stav_sul_txt = "string", priz_vyp_txt = "string", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", ixs_vyl = "string", vsk_nazev = "string", Permissions = "Gordic.Spi.Interface.GBalikPisemnostPermissionDto",}
	const enum GBalikPisemnostDtoTypeLengths {}
	/**Oprávnění vázané k obsahu balíku.*/
	interface GBalikPisemnostPermissionDto {
		/**Oprávnění spouštět akce vztažené k obsahu balíku.*/
		Actions?: Gordic.Spi.Interface.GBalikPisemnostActionsPermissionDto|null;
	}
	const enum GBalikPisemnostPermissionDtoNames { Actions = "Actions",}
	const enum GBalikPisemnostPermissionDtoFragments { Actions = "*",}
	const enum GBalikPisemnostPermissionDtoTypes { Actions = "Gordic.Spi.Interface.GBalikPisemnostActionsPermissionDto",}
	const enum GBalikPisemnostPermissionDtoTypeLengths {}
	/**Oprávnění spouštět akce vztažené k obsahu balíku.*/
	interface GBalikPisemnostActionsPermissionDto {
		/**Gets or sets the lze otevrit detail.*/
		LzeOtevritDetail: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze vypujcit ze spisovny.*/
		LzeVypujcitZeSpisovny: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze vratit vypujcku.*/
		LzeVratitVypujcku: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze ztratit vypujcku.*/
		LzeZtratitVypujcku: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze ztratit ze spisovny.*/
		LzeZtratitZeSpisovny: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze vratit ztraceny ze spisovny.*/
		LzeVratitZtracenyZeSpisovny: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze vlozit neevidovany dokument spis do baliku.*/
		LzeVlozitNeevidovanyDokumentSpisDoBaliku: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze vyjmout pisemnost z baliku.*/
		LzeVyjmoutPisemnostZBaliku: Gordic.General.ApplicationInterface.GPermission;
		/**Gets or sets the lze premistit dokument spis do jineho baliku.*/
		LzePremistitDokumentSpisDoJinehoBaliku: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak, zda lze přidat dokument do poznámkového bloku.*/
		LzePridatObsahDoPoznamkovehoBloku: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GBalikPisemnostActionsPermissionDtoNames { LzeOtevritDetail = "LzeOtevritDetail", LzeVypujcitZeSpisovny = "LzeVypujcitZeSpisovny", LzeVratitVypujcku = "LzeVratitVypujcku", LzeZtratitVypujcku = "LzeZtratitVypujcku", LzeZtratitZeSpisovny = "LzeZtratitZeSpisovny", LzeVratitZtracenyZeSpisovny = "LzeVratitZtracenyZeSpisovny", LzeVlozitNeevidovanyDokumentSpisDoBaliku = "LzeVlozitNeevidovanyDokumentSpisDoBaliku", LzeVyjmoutPisemnostZBaliku = "LzeVyjmoutPisemnostZBaliku", LzePremistitDokumentSpisDoJinehoBaliku = "LzePremistitDokumentSpisDoJinehoBaliku", LzePridatObsahDoPoznamkovehoBloku = "LzePridatObsahDoPoznamkovehoBloku",}
	const enum GBalikPisemnostActionsPermissionDtoFragments { LzeOtevritDetail = "*", LzeVypujcitZeSpisovny = "*", LzeVratitVypujcku = "*", LzeZtratitVypujcku = "*", LzeZtratitZeSpisovny = "*", LzeVratitZtracenyZeSpisovny = "*", LzeVlozitNeevidovanyDokumentSpisDoBaliku = "*", LzeVyjmoutPisemnostZBaliku = "*", LzePremistitDokumentSpisDoJinehoBaliku = "*", LzePridatObsahDoPoznamkovehoBloku = "*",}
	const enum GBalikPisemnostActionsPermissionDtoTypes { LzeOtevritDetail = "Gordic.General.ApplicationInterface.GPermission", LzeVypujcitZeSpisovny = "Gordic.General.ApplicationInterface.GPermission", LzeVratitVypujcku = "Gordic.General.ApplicationInterface.GPermission", LzeZtratitVypujcku = "Gordic.General.ApplicationInterface.GPermission", LzeZtratitZeSpisovny = "Gordic.General.ApplicationInterface.GPermission", LzeVratitZtracenyZeSpisovny = "Gordic.General.ApplicationInterface.GPermission", LzeVlozitNeevidovanyDokumentSpisDoBaliku = "Gordic.General.ApplicationInterface.GPermission", LzeVyjmoutPisemnostZBaliku = "Gordic.General.ApplicationInterface.GPermission", LzePremistitDokumentSpisDoJinehoBaliku = "Gordic.General.ApplicationInterface.GPermission", LzePridatObsahDoPoznamkovehoBloku = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GBalikPisemnostActionsPermissionDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GEnums.d.ts 

declare namespace Gordic.Spi.Interface.GBalikDto {
    /**
     * Konstanty n�zv� skupin pro validaci.
     * 
     * @author TFeik
     * @since 482.1.0.36
     */
    const enum VALIDATION_GROUP {
        CORECT_FORMAT = "VALIDATION_GROUP_BALIK_CORECT_FORMAT",
        UPDATE = "VALIDATION_GROUP_BALIK_UPDATE",
        CREATE = "VALIDATION_GROUP_BALIK_CREATE"
    }

    /**
     * Konstanty fragment�.
     * 
     * @author TFeik
     * @since 482.1.0.36
     */
    const enum FRAGMENT {
        BALIK = "FRAGMENT_BALIK",
        PISEMNOSTI = "FRAGMENT_BALIK_PISEMNOSTI",
        ULOZNE_MISTO = "FRAGMENT_BALIK_ULOZNE_MISTO",
        PERMISSIONS = "FRAGMENT_BALIK_PERMISSIONS"
        //VALIDATORS = "FRAGMENT_BALIK_VALIDATORS"
    }
}

declare namespace Gordic.Spi.Interface.GPisemnostNeevidovanaDto {
    /**
     * Konstanty n�zv� skupin pro validaci.
     * 
     * @author  TFeik
     * @since   482.1.0.231
     */
    const enum VALIDATION_GROUP {
        UPDATE = "VALIDATION_GROUP_PISEMNOST_NEEVIDOVANA_UPDATE",
        CREATE = "VALIDATION_GROUP_PISEMNOST_NEEVIDOVANA_CREATE",
        CORECT_FORMAT = "VALIDATION_GROUP_PISEMNOST_NEEVIDOVANA_CORECT_FORMAT",
        OPRAVIT_PO_KONTROLE_METADAT = "VALIDATION_GROUP_PISEMNOST_NEEVIDOVANA_OPRAVIT_PO_KONTROLE_METADAT"
    }

    /**
     * Konstanty fragment�.s
     * 
     * @author  TFeik
     * @since   482.1.0.231
     */
    const enum FRAGMENT {
        PISEMNOST_NEEVIDOVANA = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA",
        PERMISSIONS = "FRAGMENT_PISEMNOST_NEEVIDOVANA_PERMISSIONS",
        VALIDATORS = "FRAGMENT_PISEMNOST_NEEVIDOVANA_VALIDATORS"
    }
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GNeaktivDokSpisDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Neaktivni dokSpis*/
	interface GNeaktivDokSpisDto extends Gordic.Spi.Interface.GDokSpisSpiListBaseDto {
		/**Konstanty fragmentů.*/
		FRAGMENT_POUZE_IXP?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena_wflspid*/
		dat_zmena_wflspid?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena_wflspidxx*/
		dat_zmena_wflspidxx?: JsonDate|null;
		/**DBCOLUMN:Seznam.cs_akt_znacka*/
		cs_akt_znacka?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_wfl*/
		ixs_fun_wfl?: string|null;
		/**DBCOLUMN:Seznam.s_uloz*/
		s_uloz?: number|null;
		/**DBCOLUMN:Seznam.ixs_su_wfl*/
		ixs_su_wfl?: string|null;
		/**DBCOLUMN:Seznam.ixs_cj*/
		ixs_cj?: string|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:Seznam.st_utaj_id*/
		st_utaj_id?: number|null;
		/**DBCOLUMN:Seznam.wfl_pristup*/
		wfl_pristup?: number|null;
		/**DBCOLUMN:Seznam.rok_spo_uda*/
		rok_spo_uda?: number|null;
		/**DBCOLUMN:Seznam.typ_ag_xx*/
		typ_ag_xx?: number|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:Seznam.ixs_prior*/
		ixp_prior?: string|null;
		/**DBCOLUMN:Seznam.akt_znacka_prior*/
		akt_znacka_prior?: string|null;
		/**DBCOLUMN:Seznam.stav_pis_prior*/
		stav_pis_prior?: number|null;
		/**DBCOLUMN:Seznam.dat_zmena_wflspidxx*/
		dat_del?: JsonDate|null;
	}
	const enum GNeaktivDokSpisDtoNames { FRAGMENT_POUZE_IXP = "FRAGMENT_POUZE_IXP", dat_zmena_wflspid = "dat_zmena_wflspid", dat_zmena_wflspidxx = "dat_zmena_wflspidxx", cs_akt_znacka = "cs_akt_znacka", ixs_fun_wfl = "ixs_fun_wfl", s_uloz = "s_uloz", ixs_su_wfl = "ixs_su_wfl", ixs_cj = "ixs_cj", ixs_lpc = "ixs_lpc", st_utaj_id = "st_utaj_id", wfl_pristup = "wfl_pristup", rok_spo_uda = "rok_spo_uda", typ_ag_xx = "typ_ag_xx", skar_lhuta_spra = "skar_lhuta_spra", ixp_prior = "ixp_prior", akt_znacka_prior = "akt_znacka_prior", stav_pis_prior = "stav_pis_prior", dat_del = "dat_del", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", odesilatel = "odesilatel", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", skar_lhuta = "skar_lhuta", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", rok_skartace = "rok_skartace", zkratka = "zkratka", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GNeaktivDokSpisDtoFragments { FRAGMENT_POUZE_IXP = "*", dat_zmena_wflspid = "*", dat_zmena_wflspidxx = "*", cs_akt_znacka = "*", ixs_fun_wfl = "*", s_uloz = "*", ixs_su_wfl = "*", ixs_cj = "*", ixs_lpc = "*", st_utaj_id = "*", wfl_pristup = "*", rok_spo_uda = "*", typ_ag_xx = "*", skar_lhuta_spra = "*", ixp_prior = "*", akt_znacka_prior = "*", stav_pis_prior = "*", dat_del = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", odesilatel = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", nazev_su_do = "*", nazev_rf_cil = "*", skar_lhuta = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", rok_skartace = "*", zkratka = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", m_err = "*", m_vyber = "*",}
	const enum GNeaktivDokSpisDtoTypes { FRAGMENT_POUZE_IXP = "string", dat_zmena_wflspid = "JsonDate", dat_zmena_wflspidxx = "JsonDate", cs_akt_znacka = "string", ixs_fun_wfl = "string", s_uloz = "number", ixs_su_wfl = "string", ixs_cj = "string", ixs_lpc = "string", st_utaj_id = "number", wfl_pristup = "number", rok_spo_uda = "number", typ_ag_xx = "number", skar_lhuta_spra = "number", ixp_prior = "string", akt_znacka_prior = "string", stav_pis_prior = "number", dat_del = "JsonDate", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", odesilatel = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", nazev_su_do = "string", nazev_rf_cil = "string", skar_lhuta = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", rok_skartace = "number", zkratka = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", m_err = "string", m_vyber = "number",}
	const enum GNeaktivDokSpisDtoTypeLengths { cs_akt_znacka = 50, ixs_fun_wfl = 12, ixs_su_wfl = 12, ixs_cj = 12, ixs_lpc = 12, ixp_prior = 12, akt_znacka_prior = 50, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, misto_vzniku = 100, spis_pl = 5, spis_znak = 50, skar_znak = 2, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GNeevidDokSpisDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**DBTABLE:Seznam*/
	interface GNeevidDokSpisDto {
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.priz_zup*/
		priz_zup?: number|null;
		/**DBCOLUMN:Seznam.priz_spis*/
		priz_spis?: number|null;
		/**DBCOLUMN:Seznam.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		stav_sul?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.ixs_vsk*/
		ixs_vsk?: string|null;
		/**DBCOLUMN:Seznam.dat_vyriz*/
		dat_vyriz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		dat_prij_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		poz_skar?: string|null;
		/**DBCOLUMN:Seznam.dat_uzav*/
		dat_uzav?: JsonDate|null;
		/**DBCOLUMN:Seznam.status_pis*/
		status_pis?: number|null;
		/**DBCOLUMN:Seznam.obsah_text*/
		obsah_text?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.pocet_pis*/
		pocet_pis?: number|null;
		/**DBCOLUMN:Seznam.pocet_j*/
		pocet_j?: number|null;
		/**DBCOLUMN:Seznam.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:Seznam.priz_neevid*/
		priz_neevid?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis_c*/
		pocet_pis_c?: number|null;
		/**DBCOLUMN:Seznam.pocet_j_c*/
		pocet_j_c?: number|null;
		/**DBCOLUMN:Seznam.ixb_neevid*/
		ixb_neevid?: string|null;
		/**DBCOLUMN:Seznam.ixs_skr*/
		ixs_skr?: string|null;
		/**DBCOLUMN:Seznam.rok_spo_uda*/
		rok_spo_uda?: number|null;
		/**rok_skartace*/
		rok_skartace?: number|null;
	}
	const enum GNeevidDokSpisDtoNames { ixp = "ixp", ixs_zup = "ixs_zup", priz_zup = "priz_zup", priz_spis = "priz_spis", ixp_spis = "ixp_spis", stav_sul = "stav_sul", priz_vyp = "priz_vyp", priz_skn = "priz_skn", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev = "nazev", akt_znacka = "akt_znacka", ixs_su_od = "ixs_su_od", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", ixs_vsk = "ixs_vsk", dat_vyriz = "dat_vyriz", dat_pod = "dat_pod", dat_skartace = "dat_skartace", dat_prij_spi = "dat_prij_spi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poz_skar = "poz_skar", dat_uzav = "dat_uzav", status_pis = "status_pis", obsah_text = "obsah_text", ixs_zmp_od = "ixs_zmp_od", pocet_pis = "pocet_pis", pocet_j = "pocet_j", s_ele = "s_ele", s_fyz = "s_fyz", priz_neevid = "priz_neevid", pocet_pis_c = "pocet_pis_c", pocet_j_c = "pocet_j_c", ixb_neevid = "ixb_neevid", ixs_skr = "ixs_skr", rok_spo_uda = "rok_spo_uda", rok_skartace = "rok_skartace",}
	const enum GNeevidDokSpisDtoFragments { ixp = "*", ixs_zup = "*", priz_zup = "*", priz_spis = "*", ixp_spis = "*", stav_sul = "*", priz_vyp = "*", priz_skn = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", nazev = "*", akt_znacka = "*", ixs_su_od = "*", ixs_spi = "*", ixs_fun = "*", ixs_vsk = "*", dat_vyriz = "*", dat_pod = "*", dat_skartace = "*", dat_prij_spi = "*", dat_zmena = "*", zmenu_prov = "*", poz_skar = "*", dat_uzav = "*", status_pis = "*", obsah_text = "*", ixs_zmp_od = "*", pocet_pis = "*", pocet_j = "*", s_ele = "*", s_fyz = "*", priz_neevid = "*", pocet_pis_c = "*", pocet_j_c = "*", ixb_neevid = "*", ixs_skr = "*", rok_spo_uda = "*", rok_skartace = "*",}
	const enum GNeevidDokSpisDtoTypes { ixp = "string", ixs_zup = "string", priz_zup = "number", priz_spis = "number", ixp_spis = "string", stav_sul = "number", priz_vyp = "number", priz_skn = "number", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", nazev = "string", akt_znacka = "string", ixs_su_od = "string", ixs_spi = "string", ixs_fun = "string", ixs_vsk = "string", dat_vyriz = "JsonDate", dat_pod = "JsonDate", dat_skartace = "JsonDate", dat_prij_spi = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", poz_skar = "string", dat_uzav = "JsonDate", status_pis = "number", obsah_text = "string", ixs_zmp_od = "string", pocet_pis = "number", pocet_j = "number", s_ele = "number", s_fyz = "number", priz_neevid = "number", pocet_pis_c = "number", pocet_j_c = "number", ixb_neevid = "string", ixs_skr = "string", rok_spo_uda = "number", rok_skartace = "number",}
	const enum GNeevidDokSpisDtoTypeLengths { ixp = 12, ixs_zup = 12, ixp_spis = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, nazev = 100, akt_znacka = 50, ixs_su_od = 12, ixs_spi = 12, ixs_fun = 12, ixs_vsk = 12, zmenu_prov = 12, poz_skar = 50, obsah_text = 254, ixs_zmp_od = 12, ixb_neevid = 12, ixs_skr = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GObsahBalikuDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Balík (dto).*/
	interface GObsahBalikuDto extends Gordic.Spi.Interface.GDokSpisSpiListBaseDto {
		/**Konstanty fragmentů.*/
		FRAGMENT_OBSAH_BALIK?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_OBSAH_ROZBALENY?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_POUZE_EVIDOVANE?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_POUZE_IXP?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_ICONS?: string|null;
		/**DBCOLUMN:Seznam.priz_zup*/
		priz_zup?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		poz_skar?: string|null;
		/**DBCOLUMN:Seznam.dat_uzav*/
		dat_uzav?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:Seznam.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:Seznam.stav_k_f*/
		stav_k_f?: number|null;
		/**DBCOLUMN:Seznam.stav_ext_spi*/
		stav_ext_spi?: number|null;
		/**DBCOLUMN:Seznam.id_ext_spi*/
		id_ext_spi?: string|null;
		/**DBCOLUMN:Seznam.stav_ext_arch*/
		stav_ext_arch?: number|null;
		/**DBCOLUMN:Seznam.id_ext_arch*/
		id_ext_arch?: string|null;
		/**DBCOLUMN:Seznam.ixb_neevid*/
		ixb_neevid?: string|null;
		/**DBCOLUMN:Seznam.ixb_nda_4*/
		ixb_nda_4?: string|null;
		/**DBCOLUMN:Seznam.ixb_nda_4_a*/
		ixb_nda_4_a?: string|null;
		/**DBCOLUMN:Seznam.priz_pos_na*/
		priz_pos_na?: number|null;
		/**DBCOLUMN:Seznam.poznamka_pos*/
		poznamka_pos?: string|null;
		/**DBCOLUMN:Seznam.nazev_zmenu_prov*/
		nazev_zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena_wflspid*/
		dat_zmena_wflspid?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena_wflspidxx*/
		dat_zmena_wflspidxx?: JsonDate|null;
		/**DBCOLUMN:Seznam.stav_ext_arch_txt*/
		stav_ext_arch_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_pos_na_txt*/
		priz_pos_na_txt?: string|null;
		priz_vyp_rsx_txt?: string|null;
		priz_vyp_txt?: string|null;
		priz_vyp_rsx?: string|null;
		priz_pos_na_rsx?: string|null;
		stav_ext_arch_rsx?: string|null;
		stav_ext_rsx?: string|null;
		wflspid_priz_spis?: string|null;
		wflspid_typ_spis?: string|null;
		wflspid_typ_ag?: string|null;
		wflspid_s_fyz?: string|null;
		wflspid_s_ele?: string|null;
		wflspid_s_prij?: string|null;
		wflspid_stav_pis?: string|null;
		wflspid_priz_cj?: string|null;
		wflspid_puvod?: string|null;
		trideni?: string|null;
	}
	const enum GObsahBalikuDtoNames { FRAGMENT_OBSAH_BALIK = "FRAGMENT_OBSAH_BALIK", FRAGMENT_OBSAH_ROZBALENY = "FRAGMENT_OBSAH_ROZBALENY", FRAGMENT_POUZE_EVIDOVANE = "FRAGMENT_POUZE_EVIDOVANE", FRAGMENT_POUZE_IXP = "FRAGMENT_POUZE_IXP", FRAGMENT_ICONS = "FRAGMENT_ICONS", priz_zup = "priz_zup", priz_vyp = "priz_vyp", priz_skn = "priz_skn", ixs_su_od = "ixs_su_od", ixs_fun = "ixs_fun", dat_skartace = "dat_skartace", poz_skar = "poz_skar", dat_uzav = "dat_uzav", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", ixs_lpc = "ixs_lpc", k_v = "k_v", stav_k_f = "stav_k_f", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", stav_ext_arch = "stav_ext_arch", id_ext_arch = "id_ext_arch", ixb_neevid = "ixb_neevid", ixb_nda_4 = "ixb_nda_4", ixb_nda_4_a = "ixb_nda_4_a", priz_pos_na = "priz_pos_na", poznamka_pos = "poznamka_pos", nazev_zmenu_prov = "nazev_zmenu_prov", dat_zmena_wflspid = "dat_zmena_wflspid", dat_zmena_wflspidxx = "dat_zmena_wflspidxx", stav_ext_arch_txt = "stav_ext_arch_txt", priz_pos_na_txt = "priz_pos_na_txt", priz_vyp_rsx_txt = "priz_vyp_rsx_txt", priz_vyp_txt = "priz_vyp_txt", priz_vyp_rsx = "priz_vyp_rsx", priz_pos_na_rsx = "priz_pos_na_rsx", stav_ext_arch_rsx = "stav_ext_arch_rsx", stav_ext_rsx = "stav_ext_rsx", wflspid_priz_spis = "wflspid_priz_spis", wflspid_typ_spis = "wflspid_typ_spis", wflspid_typ_ag = "wflspid_typ_ag", wflspid_s_fyz = "wflspid_s_fyz", wflspid_s_ele = "wflspid_s_ele", wflspid_s_prij = "wflspid_s_prij", wflspid_stav_pis = "wflspid_stav_pis", wflspid_priz_cj = "wflspid_priz_cj", wflspid_puvod = "wflspid_puvod", trideni = "trideni", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", ixs_zup = "ixs_zup", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", odesilatel = "odesilatel", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", skar_lhuta = "skar_lhuta", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", rok_skartace = "rok_skartace", zkratka = "zkratka", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", m_err = "m_err", m_vyber = "m_vyber", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log",}
	const enum GObsahBalikuDtoFragments { FRAGMENT_OBSAH_BALIK = "*", FRAGMENT_OBSAH_ROZBALENY = "*", FRAGMENT_POUZE_EVIDOVANE = "*", FRAGMENT_POUZE_IXP = "*", FRAGMENT_ICONS = "*", priz_zup = "*", priz_vyp = "*", priz_skn = "*", ixs_su_od = "*", ixs_fun = "*", dat_skartace = "*", poz_skar = "*", dat_uzav = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", ixs_lpc = "*", k_v = "*", stav_k_f = "*", stav_ext_spi = "*", id_ext_spi = "*", stav_ext_arch = "*", id_ext_arch = "*", ixb_neevid = "*", ixb_nda_4 = "*", ixb_nda_4_a = "*", priz_pos_na = "*", poznamka_pos = "*", nazev_zmenu_prov = "*", dat_zmena_wflspid = "*", dat_zmena_wflspidxx = "*", stav_ext_arch_txt = "*", priz_pos_na_txt = "*", priz_vyp_rsx_txt = "*", priz_vyp_txt = "*", priz_vyp_rsx = "*", priz_pos_na_rsx = "*", stav_ext_arch_rsx = "*", stav_ext_rsx = "*", wflspid_priz_spis = "*", wflspid_typ_spis = "*", wflspid_typ_ag = "*", wflspid_s_fyz = "*", wflspid_s_ele = "*", wflspid_s_prij = "*", wflspid_stav_pis = "*", wflspid_priz_cj = "*", wflspid_puvod = "*", trideni = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", ixs_zup = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", odesilatel = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", nazev_su_do = "*", nazev_rf_cil = "*", skar_lhuta = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", rok_skartace = "*", zkratka = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", m_err = "*", m_vyber = "*", info_ikon_add = "*", _gdpr_stav_log = "*",}
	const enum GObsahBalikuDtoTypes { FRAGMENT_OBSAH_BALIK = "string", FRAGMENT_OBSAH_ROZBALENY = "string", FRAGMENT_POUZE_EVIDOVANE = "string", FRAGMENT_POUZE_IXP = "string", FRAGMENT_ICONS = "string", priz_zup = "number", priz_vyp = "number", priz_skn = "number", ixs_su_od = "string", ixs_fun = "string", dat_skartace = "JsonDate", poz_skar = "string", dat_uzav = "JsonDate", ixs_zmp_od = "string", skar_lhuta_spra = "number", ixs_lpc = "string", k_v = "number", stav_k_f = "number", stav_ext_spi = "number", id_ext_spi = "string", stav_ext_arch = "number", id_ext_arch = "string", ixb_neevid = "string", ixb_nda_4 = "string", ixb_nda_4_a = "string", priz_pos_na = "number", poznamka_pos = "string", nazev_zmenu_prov = "string", dat_zmena_wflspid = "JsonDate", dat_zmena_wflspidxx = "JsonDate", stav_ext_arch_txt = "string", priz_pos_na_txt = "string", priz_vyp_rsx_txt = "string", priz_vyp_txt = "string", priz_vyp_rsx = "string", priz_pos_na_rsx = "string", stav_ext_arch_rsx = "string", stav_ext_rsx = "string", wflspid_priz_spis = "string", wflspid_typ_spis = "string", wflspid_typ_ag = "string", wflspid_s_fyz = "string", wflspid_s_ele = "string", wflspid_s_prij = "string", wflspid_stav_pis = "string", wflspid_priz_cj = "string", wflspid_puvod = "string", trideni = "string", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", ixs_zup = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", odesilatel = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", nazev_su_do = "string", nazev_rf_cil = "string", skar_lhuta = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", rok_skartace = "number", zkratka = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", m_err = "string", m_vyber = "number", info_ikon_add = "number", _gdpr_stav_log = "number",}
	const enum GObsahBalikuDtoTypeLengths { ixs_su_od = 12, ixs_fun = 12, poz_skar = 50, ixs_zmp_od = 12, ixs_lpc = 12, id_ext_spi = 50, id_ext_arch = 50, ixb_neevid = 12, ixb_nda_4 = 12, ixb_nda_4_a = 12, poznamka_pos = 254, nazev_zmenu_prov = 300, stav_ext_arch_txt = 254, priz_pos_na_txt = 254, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, misto_vzniku = 100, spis_pl = 5, spis_znak = 50, skar_znak = 2, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GPisemnostNeevidovanaDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Písemnost (dokument / spis) neevidovaná (dto).
	*     Vychází ze třídy Gordic.Spi.Interface.GNeevidDokSpisDto.
	*/
	interface GPisemnostNeevidovanaDto {
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_UPDATE?: string|null;
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_CREATE?: string|null;
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_CORECT_FORMAT?: string|null;
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_OPRAVIT_PO_KONTROLE_METADAT?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_PISEMNOST_NEEVIDOVANA?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_PERMISSIONS?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_VALIDATORS?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.priz_zup*/
		priz_zup?: number|null;
		/**DBCOLUMN:Seznam.priz_spis*/
		priz_spis?: number|null;
		/**DBCOLUMN:Seznam.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		stav_sul?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_vyriz*/
		dat_vyriz?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		dat_prij_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		poz_skar?: string|null;
		/**DBCOLUMN:Seznam.dat_uzav*/
		dat_uzav?: JsonDate|null;
		/**DBCOLUMN:Seznam.status_pis*/
		status_pis?: number|null;
		/**DBCOLUMN:Seznam.obsah_text*/
		obsah_text?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.pocet_pis pocet_pis_fyz*/
		pocet_pis?: number|null;
		/**DBCOLUMN:Seznam.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:Seznam.priz_neevid*/
		priz_neevid?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis_c*/
		pocet_pis_c?: number|null;
		/**DBCOLUMN:Seznam.ixb_neevid*/
		ixb_neevid?: string|null;
		/**Identifikátor věcné skupiny.*/
		ixs_vsk?: string|null;
		/**Identifikátor skr.*/
		ixs_skr?: string|null;
		/**Oprávnění.*/
		Permissions?: Gordic.Spi.Interface.GPisemnostNeevidovanaPermissionsDto|null;
		/**Validátory.*/
		Validators?: object|null;
	}
	const enum GPisemnostNeevidovanaDtoNames { VALIDATION_GROUP_UPDATE = "VALIDATION_GROUP_UPDATE", VALIDATION_GROUP_CREATE = "VALIDATION_GROUP_CREATE", VALIDATION_GROUP_CORECT_FORMAT = "VALIDATION_GROUP_CORECT_FORMAT", VALIDATION_GROUP_OPRAVIT_PO_KONTROLE_METADAT = "VALIDATION_GROUP_OPRAVIT_PO_KONTROLE_METADAT", FRAGMENT_PISEMNOST_NEEVIDOVANA = "FRAGMENT_PISEMNOST_NEEVIDOVANA", FRAGMENT_PERMISSIONS = "FRAGMENT_PERMISSIONS", FRAGMENT_VALIDATORS = "FRAGMENT_VALIDATORS", ixp = "ixp", ixs_zup = "ixs_zup", priz_zup = "priz_zup", priz_spis = "priz_spis", ixp_spis = "ixp_spis", stav_sul = "stav_sul", priz_vyp = "priz_vyp", priz_skn = "priz_skn", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev = "nazev", akt_znacka = "akt_znacka", ixs_su_od = "ixs_su_od", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", dat_vyriz = "dat_vyriz", dat_pod = "dat_pod", dat_skartace = "dat_skartace", dat_prij_spi = "dat_prij_spi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poz_skar = "poz_skar", dat_uzav = "dat_uzav", status_pis = "status_pis", obsah_text = "obsah_text", ixs_zmp_od = "ixs_zmp_od", pocet_pis = "pocet_pis", s_ele = "s_ele", s_fyz = "s_fyz", priz_neevid = "priz_neevid", pocet_pis_c = "pocet_pis_c", ixb_neevid = "ixb_neevid", ixs_vsk = "ixs_vsk", ixs_skr = "ixs_skr", Permissions = "Permissions", Validators = "Validators",}
	const enum GPisemnostNeevidovanaDtoFragments { VALIDATION_GROUP_UPDATE = "*", VALIDATION_GROUP_CREATE = "*", VALIDATION_GROUP_CORECT_FORMAT = "*", VALIDATION_GROUP_OPRAVIT_PO_KONTROLE_METADAT = "*", FRAGMENT_PISEMNOST_NEEVIDOVANA = "*", FRAGMENT_PERMISSIONS = "*", FRAGMENT_VALIDATORS = "*", ixp = "*", ixs_zup = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", priz_zup = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", priz_spis = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixp_spis = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", stav_sul = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", priz_vyp = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", priz_skn = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", spis_pl = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", spis_znak = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", skar_znak = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", skar_lhuta = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", nazev = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", akt_znacka = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixs_su_od = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixs_spi = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixs_fun = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", dat_vyriz = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", dat_pod = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", dat_skartace = "*", dat_prij_spi = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", dat_zmena = "*", zmenu_prov = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", poz_skar = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", dat_uzav = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", status_pis = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", obsah_text = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixs_zmp_od = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", pocet_pis = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", s_ele = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", s_fyz = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", priz_neevid = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", pocet_pis_c = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixb_neevid = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixs_vsk = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", ixs_skr = "FRAGMENT_PISEMNOST_NEEVIDOVANA_DATA", Permissions = "FRAGMENT_PISEMNOST_NEEVIDOVANA_PERMISSIONS", Validators = "FRAGMENT_PISEMNOST_NEEVIDOVANA_VALIDATORS",}
	const enum GPisemnostNeevidovanaDtoTypes { VALIDATION_GROUP_UPDATE = "string", VALIDATION_GROUP_CREATE = "string", VALIDATION_GROUP_CORECT_FORMAT = "string", VALIDATION_GROUP_OPRAVIT_PO_KONTROLE_METADAT = "string", FRAGMENT_PISEMNOST_NEEVIDOVANA = "string", FRAGMENT_PERMISSIONS = "string", FRAGMENT_VALIDATORS = "string", ixp = "string", ixs_zup = "string", priz_zup = "number", priz_spis = "number", ixp_spis = "string", stav_sul = "number", priz_vyp = "number", priz_skn = "number", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", nazev = "string", akt_znacka = "string", ixs_su_od = "string", ixs_spi = "string", ixs_fun = "string", dat_vyriz = "JsonDate", dat_pod = "JsonDate", dat_skartace = "JsonDate", dat_prij_spi = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", poz_skar = "string", dat_uzav = "JsonDate", status_pis = "number", obsah_text = "string", ixs_zmp_od = "string", pocet_pis = "number", s_ele = "number", s_fyz = "number", priz_neevid = "number", pocet_pis_c = "number", ixb_neevid = "string", ixs_vsk = "string", ixs_skr = "string", Permissions = "Gordic.Spi.Interface.GPisemnostNeevidovanaPermissionsDto", Validators = "object",}
	const enum GPisemnostNeevidovanaDtoTypeLengths { spis_pl = 5, spis_znak = 50, skar_znak = 2, nazev = 100, akt_znacka = 50, poz_skar = 50, obsah_text = 254,}
	/**GPisemnostNeevidovanaPermissionsDto*/
	interface GPisemnostNeevidovanaPermissionsDto {
		/**Oprávnění spouštět akce.*/
		Actions?: Gordic.Spi.Interface.GPisemnostNeevidovanaActionsPermissionDto|null;
		/**Oprávnění editovat políčka formuláře.*/
		Fields?: Gordic.Spi.Interface.GPisemnostNeevidovanaFieldsPermissionDto|null;
	}
	const enum GPisemnostNeevidovanaPermissionsDtoNames { Actions = "Actions", Fields = "Fields",}
	const enum GPisemnostNeevidovanaPermissionsDtoFragments { Actions = "*", Fields = "*",}
	const enum GPisemnostNeevidovanaPermissionsDtoTypes { Actions = "Gordic.Spi.Interface.GPisemnostNeevidovanaActionsPermissionDto", Fields = "Gordic.Spi.Interface.GPisemnostNeevidovanaFieldsPermissionDto",}
	const enum GPisemnostNeevidovanaPermissionsDtoTypeLengths {}
	interface GPisemnostNeevidovanaActionsPermissionDto {
		/**Oprávnění vytvořit záznam.*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Oprávnění uložit záznam.*/
		CanUpdate: Gordic.General.ApplicationInterface.GPermission;
		/**Oprávnění editovat záznam.*/
		CanEdit: Gordic.General.ApplicationInterface.GPermission;
		/**Oprávnění zrušit změny.*/
		CanDiscardChanges: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPisemnostNeevidovanaActionsPermissionDtoNames { CanCreate = "CanCreate", CanUpdate = "CanUpdate", CanEdit = "CanEdit", CanDiscardChanges = "CanDiscardChanges",}
	const enum GPisemnostNeevidovanaActionsPermissionDtoFragments { CanCreate = "*", CanUpdate = "*", CanEdit = "*", CanDiscardChanges = "*",}
	const enum GPisemnostNeevidovanaActionsPermissionDtoTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanUpdate = "Gordic.General.ApplicationInterface.GPermission", CanEdit = "Gordic.General.ApplicationInterface.GPermission", CanDiscardChanges = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPisemnostNeevidovanaActionsPermissionDtoTypeLengths {}
	/**GPisemnostNeevidovanaFieldsPermissionDto*/
	interface GPisemnostNeevidovanaFieldsPermissionDto {
		/**Oprávnění vytvořit záznam.*/
		CanEditPrevzatoOd: Gordic.General.ApplicationInterface.GPermission;
		/**Oprávnění editovat záznam.*/
		CanEditPouzeAktivni: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit ixs baliku*/
		CanEditIxsBaliku: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit identifikator dokumnetu spisu*/
		CanEditIdentifikatorDokumnetuSpisu: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit priznak dokument nebo spis*/
		CanEditPriznakDokumentNeboSpis: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit pocet dokumentu analogovych*/
		CanEditPocetDokumentuAnalogovych: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit pocet dokumentu celkem*/
		CanEditPocetDokumentuCelkem: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit vec*/
		CanEditVec: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit znacka*/
		CanEditZnacka: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit vec podrobne*/
		CanEditVecPodrobne: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit datum podani*/
		CanEditDatumPodani: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit datum vyrizeni*/
		CanEditDatumVyrizeni: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit datum uzavreni*/
		CanEditDatumUzavreni: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit datum prijeti*/
		CanEditDatumPrijeti: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit spisovy znak*/
		CanEditSpisovyZnak: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit skartacni lhuta*/
		CanEditSkartacniLhuta: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit skartacni lhuta spra*/
		CanEditSkartacniLhutaSpra: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit forma dokumentu original analog*/
		CanEditFormaDokumentuOriginalAnalog: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit forma dokumentu original digital*/
		CanEditFormaDokumentuOriginalDigital: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit forma dokumentu konverze analog*/
		CanEditFormaDokumentuKonverzeAnalog: Gordic.General.ApplicationInterface.GPermission;
		/**The can edit forma dokumentu konverze digital*/
		CanEditFormaDokumentuKonverzeDigital: Gordic.General.ApplicationInterface.GPermission;
		/**Příznak povoleníeditace identifikátoru věcné skupiny.*/
		CanEditVecnaSkupina: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GPisemnostNeevidovanaFieldsPermissionDtoNames { CanEditPrevzatoOd = "CanEditPrevzatoOd", CanEditPouzeAktivni = "CanEditPouzeAktivni", CanEditIxsBaliku = "CanEditIxsBaliku", CanEditIdentifikatorDokumnetuSpisu = "CanEditIdentifikatorDokumnetuSpisu", CanEditPriznakDokumentNeboSpis = "CanEditPriznakDokumentNeboSpis", CanEditPocetDokumentuAnalogovych = "CanEditPocetDokumentuAnalogovych", CanEditPocetDokumentuCelkem = "CanEditPocetDokumentuCelkem", CanEditVec = "CanEditVec", CanEditZnacka = "CanEditZnacka", CanEditVecPodrobne = "CanEditVecPodrobne", CanEditDatumPodani = "CanEditDatumPodani", CanEditDatumVyrizeni = "CanEditDatumVyrizeni", CanEditDatumUzavreni = "CanEditDatumUzavreni", CanEditDatumPrijeti = "CanEditDatumPrijeti", CanEditSpisovyZnak = "CanEditSpisovyZnak", CanEditSkartacniLhuta = "CanEditSkartacniLhuta", CanEditSkartacniLhutaSpra = "CanEditSkartacniLhutaSpra", CanEditFormaDokumentuOriginalAnalog = "CanEditFormaDokumentuOriginalAnalog", CanEditFormaDokumentuOriginalDigital = "CanEditFormaDokumentuOriginalDigital", CanEditFormaDokumentuKonverzeAnalog = "CanEditFormaDokumentuKonverzeAnalog", CanEditFormaDokumentuKonverzeDigital = "CanEditFormaDokumentuKonverzeDigital", CanEditVecnaSkupina = "CanEditVecnaSkupina",}
	const enum GPisemnostNeevidovanaFieldsPermissionDtoFragments { CanEditPrevzatoOd = "*", CanEditPouzeAktivni = "*", CanEditIxsBaliku = "*", CanEditIdentifikatorDokumnetuSpisu = "*", CanEditPriznakDokumentNeboSpis = "*", CanEditPocetDokumentuAnalogovych = "*", CanEditPocetDokumentuCelkem = "*", CanEditVec = "*", CanEditZnacka = "*", CanEditVecPodrobne = "*", CanEditDatumPodani = "*", CanEditDatumVyrizeni = "*", CanEditDatumUzavreni = "*", CanEditDatumPrijeti = "*", CanEditSpisovyZnak = "*", CanEditSkartacniLhuta = "*", CanEditSkartacniLhutaSpra = "*", CanEditFormaDokumentuOriginalAnalog = "*", CanEditFormaDokumentuOriginalDigital = "*", CanEditFormaDokumentuKonverzeAnalog = "*", CanEditFormaDokumentuKonverzeDigital = "*", CanEditVecnaSkupina = "*",}
	const enum GPisemnostNeevidovanaFieldsPermissionDtoTypes { CanEditPrevzatoOd = "Gordic.General.ApplicationInterface.GPermission", CanEditPouzeAktivni = "Gordic.General.ApplicationInterface.GPermission", CanEditIxsBaliku = "Gordic.General.ApplicationInterface.GPermission", CanEditIdentifikatorDokumnetuSpisu = "Gordic.General.ApplicationInterface.GPermission", CanEditPriznakDokumentNeboSpis = "Gordic.General.ApplicationInterface.GPermission", CanEditPocetDokumentuAnalogovych = "Gordic.General.ApplicationInterface.GPermission", CanEditPocetDokumentuCelkem = "Gordic.General.ApplicationInterface.GPermission", CanEditVec = "Gordic.General.ApplicationInterface.GPermission", CanEditZnacka = "Gordic.General.ApplicationInterface.GPermission", CanEditVecPodrobne = "Gordic.General.ApplicationInterface.GPermission", CanEditDatumPodani = "Gordic.General.ApplicationInterface.GPermission", CanEditDatumVyrizeni = "Gordic.General.ApplicationInterface.GPermission", CanEditDatumUzavreni = "Gordic.General.ApplicationInterface.GPermission", CanEditDatumPrijeti = "Gordic.General.ApplicationInterface.GPermission", CanEditSpisovyZnak = "Gordic.General.ApplicationInterface.GPermission", CanEditSkartacniLhuta = "Gordic.General.ApplicationInterface.GPermission", CanEditSkartacniLhutaSpra = "Gordic.General.ApplicationInterface.GPermission", CanEditFormaDokumentuOriginalAnalog = "Gordic.General.ApplicationInterface.GPermission", CanEditFormaDokumentuOriginalDigital = "Gordic.General.ApplicationInterface.GPermission", CanEditFormaDokumentuKonverzeAnalog = "Gordic.General.ApplicationInterface.GPermission", CanEditFormaDokumentuKonverzeDigital = "Gordic.General.ApplicationInterface.GPermission", CanEditVecnaSkupina = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GPisemnostNeevidovanaFieldsPermissionDtoTypeLengths {}
	/**GPisemnostNeevidovanaFilter*/
	const enum GPisemnostNeevidovanaFilter {
		/**The fulltext*/
		fulltext,
		/**The ixp*/
		ixp,
		/**The ixs zup*/
		ixs_zup,
		/**The priz spis*/
		priz_spis,
		/**Pouze pro použití v interním where. Je natvrdo nastaven tak, aby vracel pouze neeidované písemnosti.*/
		priz_neevid,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GSpiszupDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**DBTABLE:~*/
	interface GSpiszupDto extends Gordic.Wfl.Interface.GListBaseDto {
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.ixs_ulm*/
		ixs_ulm?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup_nad*/
		ixs_zup_nad?: string|null;
		/**DBCOLUMN:Seznam.priz_nad*/
		priz_nad?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis*/
		pocet_pis?: number|null;
		/**DBCOLUMN:Seznam.pocet_j*/
		pocet_j?: number|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		stav_sul?: number|null;
		/**DBCOLUMN:Seznam.stav_sul_txt*/
		stav_sul_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.priz_skn_txt*/
		priz_skn_txt?: string|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp_txt*/
		priz_vyp_txt?: string|null;
		/**DBCOLUMN:Seznam.kod_tyz*/
		kod_tyz?: number|null;
		/**DBCOLUMN:Seznam.typ_bal_add*/
		typ_bal_add?: number|null;
		/**DBCOLUMN:Seznam.spis_znak_nazev*/
		spis_znak_nazev?: string|null;
		/**DBCOLUMN:Seznam.kod_tyz_txt*/
		kod_tyz_txt?: string|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.znacka_zup*/
		znacka_zup?: string|null;
		/**DBCOLUMN:Seznam.prevzato_od_txt*/
		prevzato_od_txt?: string|null;
		/**DBCOLUMN:Seznam.prevzal_txt*/
		prevzal_txt?: string|null;
		/**DBCOLUMN:Seznam.rok_skartace*/
		rok_skartace?: number|null;
		/**DBCOLUMN:Seznam.rok_skartace_new*/
		rok_skartace_new?: number|null;
		/**DBCOLUMN:Seznam.bm*/
		bm?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_pos*/
		bm_pos?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.umisteni*/
		umisteni?: string|null;
		/**DBCOLUMN:Seznam.kubatura*/
		kubatura?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_do*/
		ixs_spi_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do*/
		ixs_fun_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_akt*/
		ixs_spi_akt?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.ixs_vsk*/
		ixs_vsk?: string|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uloz_spi*/
		dat_uloz_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		dat_prij_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		poz_skar?: string|null;
		/**DBCOLUMN:Seznam.vaha*/
		vaha?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.police*/
		police?: string|null;
		/**DBCOLUMN:Seznam.paprsek*/
		paprsek?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:Seznam.rok_predani_spra*/
		rok_predani_spra?: number|null;
		/**DBCOLUMN:Seznam.rok_predani_spra_new*/
		rok_predani_spra_new?: number|null;
		/**DBCOLUMN:Seznam.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:Seznam.rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:Seznam.priz_rok_prep*/
		priz_rok_prep?: number|null;
		/**DBCOLUMN:Seznam.priz_rok_sk_pre*/
		priz_rok_sk_pre?: number|null;
		/**DBCOLUMN:Seznam.poc_krabic*/
		poc_krabic?: number|null;
		/**DBCOLUMN:Seznam.pocet_listu*/
		pocet_listu?: number|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:Seznam.pocet_pis_jed_txt_add*/
		pocet_pis_jed_txt_add?: string|null;
		/**DBCOLUMN:Seznam.rozsah_add*/
		rozsah_add?: string|null;
		/**DBCOLUMN:Seznam.rozsah_new_add*/
		rozsah_new_add?: string|null;
		/**DBCOLUMN:Seznam.ixs_ska*/
		ixs_ska?: string|null;
		/**DBCOLUMN:Seznam.nazev_ska*/
		nazev_ska?: string|null;
		/**DBCOLUMN:Seznam.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.zkratka*/
		zkratka?: string|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ukladaci_znacka*/
		ukladaci_znacka?: string|null;
		/**DBCOLUMN:Seznam.nazev_su_od*/
		nazev_su_od?: string|null;
		/**DBCOLUMN:Seznam.nazev_fun_od*/
		nazev_fun_od?: string|null;
		/**DBCOLUMN:Seznam.nazev_ref_od*/
		nazev_ref_od?: string|null;
		/**DBCOLUMN:Seznam.pocet_j_fyz*/
		pocet_j_fyz?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis_fyz*/
		pocet_pis_fyz?: number|null;
		/**DBCOLUMN:Seznam.priz_poc_prep*/
		priz_poc_prep?: number|null;
		/**DBCOLUMN:Seznam.priz_skzn_prep*/
		priz_skzn_prep?: number|null;
		/**DBCOLUMN:Seznam.skar_znak_spz*/
		skar_znak_spz?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spz*/
		skar_lhuta_spz?: number|null;
		/**DBCOLUMN:Seznam.priz_skar*/
		priz_skar?: number|null;
		/**DBCOLUMN:Seznam.ixb_aip*/
		ixb_aip?: string|null;
		/**pid baliku podrizeneho*/
		ixs_zup_pod?: string|null;
		/**DBCOLUMN:Spiszup.priz_trans_log*/
		priz_trans_log?: number|null;
		/**DBCOLUMN:Prerazitkovani.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:Prerazitkovani.ixs_cer_c*/
		ixs_cer_c?: string|null;
		/**DBCOLUMN:Prerazitkovani.rok_od_do_add*/
		rok_od_do_add?: string|null;
		/**DBCOLUMN:Prerazitkovani.dat_do*/
		dat_do?: JsonDate|null;
		/**DBCOLUMN:Prerazitkovani.hash2*/
		hash2?: string|null;
		/**DBCOLUMN:Prerazitkovani.alg_h2*/
		alg_h2?: string|null;
		/**nazev_fun_akt*/
		nazev_fun_akt?: string|null;
		/**nazev_fun_akt*/
		nazev_su_akt?: string|null;
		/**nazev_ref_akt*/
		nazev_ref_akt?: string|null;
		/**nazev aktualni spisovny*/
		nazev_spi_akt?: string|null;
		/**zkraceny nazev aktualni spisovny*/
		zkratka_nazev_spi_akt?: string|null;
		/**nazev_ref_akt*/
		jeVeSpisovne?: boolean|null;
		/**ixb_trans_logu*/
		ixb_trans_logu?: string|null;
		/**info u uloznem miste*/
		ulmDto?: Gordic.Spi.Interface.GSpisulmDto|null;
	}
	const enum GSpiszupDtoNames { ixs_zup = "ixs_zup", ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", pocet_j = "pocet_j", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", priz_skn = "priz_skn", priz_skn_txt = "priz_skn_txt", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_znak_nazev = "spis_znak_nazev", kod_tyz_txt = "kod_tyz_txt", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev = "nazev", popis = "popis", znacka_zup = "znacka_zup", prevzato_od_txt = "prevzato_od_txt", prevzal_txt = "prevzal_txt", rok_skartace = "rok_skartace", rok_skartace_new = "rok_skartace_new", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", kubatura = "kubatura", ixs_su_od = "ixs_su_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", ixs_fun_akt = "ixs_fun_akt", ixs_vsk = "ixs_vsk", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", dat_prij_spi = "dat_prij_spi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", poz_skar = "poz_skar", vaha = "vaha", police = "police", paprsek = "paprsek", poznamka = "poznamka", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_predani_spra_new = "rok_predani_spra_new", rok_od = "rok_od", rok_do = "rok_do", priz_rok_prep = "priz_rok_prep", priz_rok_sk_pre = "priz_rok_sk_pre", poc_krabic = "poc_krabic", pocet_listu = "pocet_listu", ixs_lpc = "ixs_lpc", pocet_pis_jed_txt_add = "pocet_pis_jed_txt_add", rozsah_add = "rozsah_add", rozsah_new_add = "rozsah_new_add", ixs_ska = "ixs_ska", nazev_ska = "nazev_ska", s_ele = "s_ele", s_fyz = "s_fyz", por_cislo = "por_cislo", zkratka = "zkratka", rok = "rok", ukladaci_znacka = "ukladaci_znacka", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_ref_od = "nazev_ref_od", pocet_j_fyz = "pocet_j_fyz", pocet_pis_fyz = "pocet_pis_fyz", priz_poc_prep = "priz_poc_prep", priz_skzn_prep = "priz_skzn_prep", skar_znak_spz = "skar_znak_spz", skar_lhuta_spz = "skar_lhuta_spz", priz_skar = "priz_skar", ixb_aip = "ixb_aip", ixs_zup_pod = "ixs_zup_pod", priz_trans_log = "priz_trans_log", soubor = "soubor", ixs_cer_c = "ixs_cer_c", rok_od_do_add = "rok_od_do_add", dat_do = "dat_do", hash2 = "hash2", alg_h2 = "alg_h2", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", nazev_ref_akt = "nazev_ref_akt", nazev_spi_akt = "nazev_spi_akt", zkratka_nazev_spi_akt = "zkratka_nazev_spi_akt", jeVeSpisovne = "jeVeSpisovne", ixb_trans_logu = "ixb_trans_logu", ulmDto = "ulmDto", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSpiszupDtoFragments { ixs_zup = "*", ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", pocet_j = "*", stav_sul = "*", stav_sul_txt = "*", priz_skn = "*", priz_skn_txt = "*", priz_vyp = "*", priz_vyp_txt = "*", kod_tyz = "*", typ_bal_add = "*", spis_znak_nazev = "*", kod_tyz_txt = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", nazev = "*", popis = "*", znacka_zup = "*", prevzato_od_txt = "*", prevzal_txt = "*", rok_skartace = "*", rok_skartace_new = "*", bm = "*", bm_pos = "*", umisteni = "*", kubatura = "*", ixs_su_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", ixs_fun_akt = "*", ixs_vsk = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", dat_prij_spi = "*", dat_zmena = "*", zmenu_prov = "*", poz_skar = "*", vaha = "*", police = "*", paprsek = "*", poznamka = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_predani_spra_new = "*", rok_od = "*", rok_do = "*", priz_rok_prep = "*", priz_rok_sk_pre = "*", poc_krabic = "*", pocet_listu = "*", ixs_lpc = "*", pocet_pis_jed_txt_add = "*", rozsah_add = "*", rozsah_new_add = "*", ixs_ska = "*", nazev_ska = "*", s_ele = "*", s_fyz = "*", por_cislo = "*", zkratka = "*", rok = "*", ukladaci_znacka = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_ref_od = "*", pocet_j_fyz = "*", pocet_pis_fyz = "*", priz_poc_prep = "*", priz_skzn_prep = "*", skar_znak_spz = "*", skar_lhuta_spz = "*", priz_skar = "*", ixb_aip = "*", ixs_zup_pod = "*", priz_trans_log = "*", soubor = "*", ixs_cer_c = "*", rok_od_do_add = "*", dat_do = "*", hash2 = "*", alg_h2 = "*", nazev_fun_akt = "*", nazev_su_akt = "*", nazev_ref_akt = "*", nazev_spi_akt = "*", zkratka_nazev_spi_akt = "*", jeVeSpisovne = "*", ixb_trans_logu = "*", ulmDto = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSpiszupDtoTypes { ixs_zup = "string", ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", pocet_j = "number", stav_sul = "number", stav_sul_txt = "string", priz_skn = "number", priz_skn_txt = "string", priz_vyp = "number", priz_vyp_txt = "string", kod_tyz = "number", typ_bal_add = "number", spis_znak_nazev = "string", kod_tyz_txt = "string", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", nazev = "string", popis = "string", znacka_zup = "string", prevzato_od_txt = "string", prevzal_txt = "string", rok_skartace = "number", rok_skartace_new = "number", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", kubatura = "JsonDecimal", ixs_su_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", ixs_fun_akt = "string", ixs_vsk = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", dat_prij_spi = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", poz_skar = "string", vaha = "JsonDecimal", police = "string", paprsek = "string", poznamka = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_predani_spra_new = "number", rok_od = "number", rok_do = "number", priz_rok_prep = "number", priz_rok_sk_pre = "number", poc_krabic = "number", pocet_listu = "number", ixs_lpc = "string", pocet_pis_jed_txt_add = "string", rozsah_add = "string", rozsah_new_add = "string", ixs_ska = "string", nazev_ska = "string", s_ele = "number", s_fyz = "number", por_cislo = "number", zkratka = "string", rok = "number", ukladaci_znacka = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_ref_od = "string", pocet_j_fyz = "number", pocet_pis_fyz = "number", priz_poc_prep = "number", priz_skzn_prep = "number", skar_znak_spz = "string", skar_lhuta_spz = "number", priz_skar = "number", ixb_aip = "string", ixs_zup_pod = "string", priz_trans_log = "number", soubor = "string", ixs_cer_c = "string", rok_od_do_add = "string", dat_do = "JsonDate", hash2 = "string", alg_h2 = "string", nazev_fun_akt = "string", nazev_su_akt = "string", nazev_ref_akt = "string", nazev_spi_akt = "string", zkratka_nazev_spi_akt = "string", jeVeSpisovne = "boolean", ixb_trans_logu = "string", ulmDto = "Gordic.Spi.Interface.GSpisulmDto", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSpiszupDtoTypeLengths { ixs_zup = 12, ixs_ulm = 12, ixs_zup_nad = 12, spis_znak_nazev = 240, kod_tyz_txt = 50, spis_pl = 5, spis_znak = 50, skar_znak = 2, nazev = 100, popis = 100, znacka_zup = 30, umisteni = 100, ixs_su_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, ixs_fun_akt = 12, ixs_vsk = 12, zmenu_prov = 12, poz_skar = 50, police = 20, paprsek = 20, poznamka = 50, ixs_zmp_od = 12, ixs_lpc = 12, pocet_pis_jed_txt_add = 20, rozsah_add = 20, rozsah_new_add = 20, ixs_ska = 12, nazev_ska = 50, zkratka = 5, ukladaci_znacka = 50, nazev_su_od = 256, nazev_fun_od = 256, nazev_ref_od = 256, skar_znak_spz = 2, ixb_aip = 12, ixs_zup_pod = 12, ixs_cer_c = 12, ixb_trans_logu = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GSpiUniversalListDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Přehled SPI universal*/
	interface GSpiUniversalListDto extends Gordic.Spi.Interface.GBalikListDto {
		/**DBCOLUMN:Seznam.ixs_spis*/
		ixs_spis?: string|null;
		/**ixs_skr*/
		ixs_skr?: string|null;
		/**DBCOLUMN:Seznam.priz_zup*/
		priz_zup?: number|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_uzav*/
		dat_uzav?: JsonDate|null;
		/**DBCOLUMN:Seznam.stav_ext_spi*/
		stav_ext_spi?: number|null;
		/**DBCOLUMN:Seznam.id_ext_spi*/
		id_ext_spi?: string|null;
		/**DBCOLUMN:Seznam.stav_spi*/
		stav_spi?: number|null;
		/**DBCOLUMN:Seznam.stav_spi_txt*/
		stav_spi_txt?: string|null;
		/**DBCOLUMN:Seznam.por_cislo_add*/
		por_cislo_add?: string|null;
		/**DBCOLUMN:Seznam.info_text*/
		info_text?: string|null;
		/**
		*     Rok kontroly spouštěcí události.
		*     
		*/
		rok_kon_spu?: number|null;
		/**ginsskr_nazevt*/
		ginsskr_nazev?: string|null;
		/**ginsskr_kontrolni_lhuta*/
		ginsskr_kontrolni_lhuta?: number|null;
	}
	const enum GSpiUniversalListDtoNames { ixs_spis = "ixs_spis", ixs_skr = "ixs_skr", priz_zup = "priz_zup", ixs_fun = "ixs_fun", dat_uzav = "dat_uzav", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", stav_spi = "stav_spi", stav_spi_txt = "stav_spi_txt", por_cislo_add = "por_cislo_add", info_text = "info_text", rok_kon_spu = "rok_kon_spu", ginsskr_nazev = "ginsskr_nazev", ginsskr_kontrolni_lhuta = "ginsskr_kontrolni_lhuta", ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", pocet_j = "pocet_j", priz_skn = "priz_skn", priz_skn_txt = "priz_skn_txt", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_znak_nazev = "spis_znak_nazev", kod_tyz_txt = "kod_tyz_txt", popis = "popis", znacka_zup = "znacka_zup", prevzato_od_txt = "prevzato_od_txt", prevzal_txt = "prevzal_txt", rok_skartace_new = "rok_skartace_new", kubatura = "kubatura", ixs_su_od = "ixs_su_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", poz_skar = "poz_skar", vaha = "vaha", police = "police", paprsek = "paprsek", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_predani_spra_new = "rok_predani_spra_new", rok_od = "rok_od", rok_do = "rok_do", priz_rok_prep = "priz_rok_prep", priz_rok_sk_pre = "priz_rok_sk_pre", poc_krabic = "poc_krabic", pocet_listu = "pocet_listu", ixs_lpc = "ixs_lpc", pocet_pis_jed_txt_add = "pocet_pis_jed_txt_add", rozsah_add = "rozsah_add", rozsah_new_add = "rozsah_new_add", ixs_ska = "ixs_ska", nazev_ska = "nazev_ska", ukladaci_znacka = "ukladaci_znacka", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_ref_od = "nazev_ref_od", pocet_j_fyz = "pocet_j_fyz", pocet_pis_fyz = "pocet_pis_fyz", priz_poc_prep = "priz_poc_prep", priz_skzn_prep = "priz_skzn_prep", skar_znak_spz = "skar_znak_spz", skar_lhuta_spz = "skar_lhuta_spz", priz_skar = "priz_skar", ixb_aip = "ixb_aip", ixs_zup_pod = "ixs_zup_pod", priz_trans_log = "priz_trans_log", soubor = "soubor", ixs_cer_c = "ixs_cer_c", rok_od_do_add = "rok_od_do_add", dat_do = "dat_do", hash2 = "hash2", alg_h2 = "alg_h2", nazev_ref_akt = "nazev_ref_akt", nazev_spi_akt = "nazev_spi_akt", zkratka_nazev_spi_akt = "zkratka_nazev_spi_akt", jeVeSpisovne = "jeVeSpisovne", ixb_trans_logu = "ixb_trans_logu", ulmDto = "ulmDto", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", ixs_zup = "ixs_zup", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", souvisejici = "souvisejici", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_fun_zprac = "nazev_fun_zprac", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log",}
	const enum GSpiUniversalListDtoFragments { ixs_spis = "*", ixs_skr = "*", priz_zup = "*", ixs_fun = "*", dat_uzav = "*", stav_ext_spi = "*", id_ext_spi = "*", stav_spi = "*", stav_spi_txt = "*", por_cislo_add = "*", info_text = "*", rok_kon_spu = "*", ginsskr_nazev = "*", ginsskr_kontrolni_lhuta = "*", ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", pocet_j = "*", priz_skn = "*", priz_skn_txt = "*", priz_vyp = "*", priz_vyp_txt = "*", kod_tyz = "*", typ_bal_add = "*", spis_znak_nazev = "*", kod_tyz_txt = "*", popis = "*", znacka_zup = "*", prevzato_od_txt = "*", prevzal_txt = "*", rok_skartace_new = "*", kubatura = "*", ixs_su_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", poz_skar = "*", vaha = "*", police = "*", paprsek = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_predani_spra_new = "*", rok_od = "*", rok_do = "*", priz_rok_prep = "*", priz_rok_sk_pre = "*", poc_krabic = "*", pocet_listu = "*", ixs_lpc = "*", pocet_pis_jed_txt_add = "*", rozsah_add = "*", rozsah_new_add = "*", ixs_ska = "*", nazev_ska = "*", ukladaci_znacka = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_ref_od = "*", pocet_j_fyz = "*", pocet_pis_fyz = "*", priz_poc_prep = "*", priz_skzn_prep = "*", skar_znak_spz = "*", skar_lhuta_spz = "*", priz_skar = "*", ixb_aip = "*", ixs_zup_pod = "*", priz_trans_log = "*", soubor = "*", ixs_cer_c = "*", rok_od_do_add = "*", dat_do = "*", hash2 = "*", alg_h2 = "*", nazev_ref_akt = "*", nazev_spi_akt = "*", zkratka_nazev_spi_akt = "*", jeVeSpisovne = "*", ixb_trans_logu = "*", ulmDto = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", ixs_zup = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", souvisejici = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_fun_zprac = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*", info_ikon_add = "*", _gdpr_stav_log = "*",}
	const enum GSpiUniversalListDtoTypes { ixs_spis = "string", ixs_skr = "string", priz_zup = "number", ixs_fun = "string", dat_uzav = "JsonDate", stav_ext_spi = "number", id_ext_spi = "string", stav_spi = "number", stav_spi_txt = "string", por_cislo_add = "string", info_text = "string", rok_kon_spu = "number", ginsskr_nazev = "string", ginsskr_kontrolni_lhuta = "number", ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", pocet_j = "number", priz_skn = "number", priz_skn_txt = "string", priz_vyp = "number", priz_vyp_txt = "string", kod_tyz = "number", typ_bal_add = "number", spis_znak_nazev = "string", kod_tyz_txt = "string", popis = "string", znacka_zup = "string", prevzato_od_txt = "string", prevzal_txt = "string", rok_skartace_new = "number", kubatura = "JsonDecimal", ixs_su_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", poz_skar = "string", vaha = "JsonDecimal", police = "string", paprsek = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_predani_spra_new = "number", rok_od = "number", rok_do = "number", priz_rok_prep = "number", priz_rok_sk_pre = "number", poc_krabic = "number", pocet_listu = "number", ixs_lpc = "string", pocet_pis_jed_txt_add = "string", rozsah_add = "string", rozsah_new_add = "string", ixs_ska = "string", nazev_ska = "string", ukladaci_znacka = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_ref_od = "string", pocet_j_fyz = "number", pocet_pis_fyz = "number", priz_poc_prep = "number", priz_skzn_prep = "number", skar_znak_spz = "string", skar_lhuta_spz = "number", priz_skar = "number", ixb_aip = "string", ixs_zup_pod = "string", priz_trans_log = "number", soubor = "string", ixs_cer_c = "string", rok_od_do_add = "string", dat_do = "JsonDate", hash2 = "string", alg_h2 = "string", nazev_ref_akt = "string", nazev_spi_akt = "string", zkratka_nazev_spi_akt = "string", jeVeSpisovne = "boolean", ixb_trans_logu = "string", ulmDto = "Gordic.Spi.Interface.GSpisulmDto", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", ixs_zup = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", souvisejici = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_fun_zprac = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number", info_ikon_add = "number", _gdpr_stav_log = "number",}
	const enum GSpiUniversalListDtoTypeLengths { ixs_spis = 12, ixs_skr = 12, ixs_fun = 12, id_ext_spi = 50, stav_spi_txt = 50, por_cislo_add = 50, info_text = 150, ixs_ulm = 12, ixs_zup_nad = 12, spis_znak_nazev = 240, kod_tyz_txt = 50, popis = 100, znacka_zup = 30, ixs_su_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, poz_skar = 50, police = 20, paprsek = 20, ixs_zmp_od = 12, ixs_lpc = 12, pocet_pis_jed_txt_add = 20, rozsah_add = 20, rozsah_new_add = 20, ixs_ska = 12, nazev_ska = 50, ukladaci_znacka = 50, nazev_su_od = 256, nazev_fun_od = 256, nazev_ref_od = 256, skar_znak_spz = 2, ixb_aip = 12, ixs_zup_pod = 12, ixs_cer_c = 12, ixb_trans_logu = 12, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GSpivzupDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**DBTABLE:Seznam*/
	interface GSpivzupDto extends Gordic.Wfl.Interface.GDokSpisListBaseDto {
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.ixs_typ z wflspid*/
		ixs_typ?: string|null;
		/**DBCOLUMN:Seznam.ixp_dok*/
		ixp_dok?: string|null;
		/**DBCOLUMN:Seznam.priz_zup*/
		priz_zup?: number|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		stav_sul?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.dat_pod*/
		dat_pod?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		dat_prij_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.poz_skar*/
		poz_skar?: string|null;
		/**DBCOLUMN:Seznam.dat_uzav*/
		dat_uzav?: JsonDate|null;
		/**DBCOLUMN:Seznam.status_pis*/
		status_pis?: number|null;
		/**DBCOLUMN:Seznam.obsah_text*/
		obsah_text?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:Seznam.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:Seznam.stav_k_f*/
		stav_k_f?: number|null;
		/**DBCOLUMN:Seznam.ixb_sip*/
		ixb_sip?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup_skryte*/
		ixs_zup_skryte?: boolean|null;
		/**DBCOLUMN:Seznam.ixs_spis_skryte*/
		ixs_spis_skryte?: boolean|null;
		/**DBCOLUMN:Seznam.stav_ext_spi*/
		stav_ext_spi?: number|null;
		/**DBCOLUMN:Seznam.id_ext_spi*/
		id_ext_spi?: string|null;
		/**DBCOLUMN:Seznam.priz_neevid*/
		priz_neevid?: number|null;
		/**DBCOLUMN:Seznam.stav_ext_arch*/
		stav_ext_arch?: number|null;
		/**DBCOLUMN:Seznam.id_ext_arch*/
		id_ext_arch?: string|null;
		/**DBCOLUMN:Seznam.typ_duv_del*/
		typ_duv_del?: number|null;
	}
	const enum GSpivzupDtoNames { ixs_zup = "ixs_zup", ixs_typ = "ixs_typ", ixp_dok = "ixp_dok", priz_zup = "priz_zup", stav_sul = "stav_sul", priz_vyp = "priz_vyp", priz_skn = "priz_skn", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", ixs_su_od = "ixs_su_od", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", dat_pod = "dat_pod", dat_skartace = "dat_skartace", dat_prij_spi = "dat_prij_spi", poz_skar = "poz_skar", dat_uzav = "dat_uzav", status_pis = "status_pis", obsah_text = "obsah_text", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", ixs_lpc = "ixs_lpc", stav_k_f = "stav_k_f", ixb_sip = "ixb_sip", ixs_zup_skryte = "ixs_zup_skryte", ixs_spis_skryte = "ixs_spis_skryte", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", priz_neevid = "priz_neevid", stav_ext_arch = "stav_ext_arch", id_ext_arch = "id_ext_arch", typ_duv_del = "typ_duv_del", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", TypRezimuPrace = "TypRezimuPrace", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", m_err = "m_err", m_vyber = "m_vyber", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log",}
	const enum GSpivzupDtoFragments { ixs_zup = "*", ixs_typ = "*", ixp_dok = "*", priz_zup = "*", stav_sul = "*", priz_vyp = "*", priz_skn = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", ixs_su_od = "*", ixs_spi = "*", ixs_fun = "*", dat_pod = "*", dat_skartace = "*", dat_prij_spi = "*", poz_skar = "*", dat_uzav = "*", status_pis = "*", obsah_text = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", ixs_lpc = "*", stav_k_f = "*", ixb_sip = "*", ixs_zup_skryte = "*", ixs_spis_skryte = "*", stav_ext_spi = "*", id_ext_spi = "*", priz_neevid = "*", stav_ext_arch = "*", id_ext_arch = "*", typ_duv_del = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", TypRezimuPrace = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", m_err = "*", m_vyber = "*", info_ikon_add = "*", _gdpr_stav_log = "*",}
	const enum GSpivzupDtoTypes { ixs_zup = "string", ixs_typ = "string", ixp_dok = "string", priz_zup = "number", stav_sul = "number", priz_vyp = "number", priz_skn = "number", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", ixs_su_od = "string", ixs_spi = "string", ixs_fun = "string", dat_pod = "JsonDate", dat_skartace = "JsonDate", dat_prij_spi = "JsonDate", poz_skar = "string", dat_uzav = "JsonDate", status_pis = "number", obsah_text = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", ixs_lpc = "string", stav_k_f = "number", ixb_sip = "string", ixs_zup_skryte = "boolean", ixs_spis_skryte = "boolean", stav_ext_spi = "number", id_ext_spi = "string", priz_neevid = "number", stav_ext_arch = "number", id_ext_arch = "string", typ_duv_del = "number", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", m_err = "string", m_vyber = "number", info_ikon_add = "number", _gdpr_stav_log = "number",}
	const enum GSpivzupDtoTypeLengths { ixs_zup = 12, ixs_typ = 12, ixp_dok = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_od = 12, ixs_spi = 12, ixs_fun = 12, poz_skar = 50, obsah_text = 254, ixs_zmp_od = 12, ixs_lpc = 12, ixb_sip = 12, id_ext_spi = 50, id_ext_arch = 50, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GUlozneMistoDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Úložné místo (dto).*/
	interface GUlozneMistoDto extends Gordic.Gin.Interface.GEntityDto {
		/**ID ulozneho mista*/
		ixs_ulm?: string|null;
		/**aktivita*/
		aktivita?: number|null;
		/**ID mistnnosti*/
		mistnost_kod?: string|null;
		/**název místnosti*/
		mistnost_naz?: string|null;
		/**id segmentu*/
		segment_kod?: string|null;
		/**nazev segmentu*/
		segment_naz?: string|null;
		/**ID budovy*/
		budova_kod?: string|null;
		/**>název budovy*/
		budova_naz?: string|null;
		/**typ ULM*/
		kod_tyu?: number|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad?: string|null;
		/**typ nadrizeneho ULM*/
		kod_tyu_nad?: number|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_2?: string|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_3?: string|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_4?: string|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_5?: string|null;
		/**uroven nadrizeni*/
		uroven?: number|null;
		/**uroven poddrizeni*/
		uroven_pod?: number|null;
		/**priznak nadrizeni*/
		priz_nad?: number|null;
		/**paprsek*/
		paprsek?: string|null;
		/**police*/
		police?: string|null;
		/**bezny metr*/
		bm?: JsonDecimal|null;
		/**kubatura*/
		kubatura?: JsonDecimal|null;
		/**nosnost*/
		nosnost?: JsonDecimal|null;
		/**vlhkost*/
		vlhkost?: JsonDecimal|null;
		/**bm_plne*/
		bm_plne?: JsonDecimal|null;
		/**kubatura_plne*/
		kubatura_plne?: JsonDecimal|null;
		/**ID spisovny*/
		ixs_spi?: string|null;
		/**ID funkce*/
		ixs_fun?: string|null;
		/**popis*/
		popis?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**nosnost_plne*/
		nosnost_plne?: JsonDecimal|null;
		/**bm_c*/
		bm_c?: JsonDecimal|null;
		/**kubatura_c*/
		kubatura_c?: JsonDecimal|null;
		/**nosnost_c*/
		nosnost_c?: JsonDecimal|null;
		/**bm_plne_c*/
		bm_plne_c?: JsonDecimal|null;
		/**kubatura_plne_c*/
		kubatura_plne_c?: JsonDecimal|null;
		/**nosnost_plne_c*/
		nosnost_plne_c?: JsonDecimal|null;
		/**bm_p*/
		bm_p?: JsonDecimal|null;
		/**kubatura_p*/
		kubatura_p?: JsonDecimal|null;
		/**nosnost_p*/
		nosnost_p?: JsonDecimal|null;
		/**bm_plne_p*/
		bm_plne_p?: JsonDecimal|null;
		/**kubatura_plne_p*/
		kubatura_plne_p?: JsonDecimal|null;
		/**nosnost_plne_p*/
		nosnost_plne_p?: JsonDecimal|null;
		/**kapacita_krabic*/
		kapacita_krabic?: number|null;
		/**ico interního subjektu*/
		ico?: string|null;
		/**aktivita ULM*/
		aktivita_ulm_txt?: string|null;
		/**aktivita ULM nadrizene*/
		aktivita_ulm_nad_txt?: string|null;
		/**nazev subjektu provadejicim zmenu*/
		nazev_zmenu_prov_add?: string|null;
		/**název*/
		budova_segment_mistnost_add?: string|null;
		/**název*/
		rozsireny_mod?: boolean|null;
		/**Oprávnění.*/
		Permissions?: Gordic.Spi.Interface.GUlozneMistoDtoPermissionsDto|null;
		/**Validátory.*/
		readonly Validators?: object|null;
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_UPDATE?: string|null;
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_CREATE?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_ULOZNE_MISTO?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_PERMISSIONS?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_VALIDATORS?: string|null;
	}
	const enum GUlozneMistoDtoNames { ixs_ulm = "ixs_ulm", aktivita = "aktivita", mistnost_kod = "mistnost_kod", mistnost_naz = "mistnost_naz", segment_kod = "segment_kod", segment_naz = "segment_naz", budova_kod = "budova_kod", budova_naz = "budova_naz", kod_tyu = "kod_tyu", ixs_ulm_nad = "ixs_ulm_nad", kod_tyu_nad = "kod_tyu_nad", ixs_ulm_nad_2 = "ixs_ulm_nad_2", ixs_ulm_nad_3 = "ixs_ulm_nad_3", ixs_ulm_nad_4 = "ixs_ulm_nad_4", ixs_ulm_nad_5 = "ixs_ulm_nad_5", uroven = "uroven", uroven_pod = "uroven_pod", priz_nad = "priz_nad", paprsek = "paprsek", police = "police", bm = "bm", kubatura = "kubatura", nosnost = "nosnost", vlhkost = "vlhkost", bm_plne = "bm_plne", kubatura_plne = "kubatura_plne", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", popis = "popis", dat_zmena = "dat_zmena", nosnost_plne = "nosnost_plne", bm_c = "bm_c", kubatura_c = "kubatura_c", nosnost_c = "nosnost_c", bm_plne_c = "bm_plne_c", kubatura_plne_c = "kubatura_plne_c", nosnost_plne_c = "nosnost_plne_c", bm_p = "bm_p", kubatura_p = "kubatura_p", nosnost_p = "nosnost_p", bm_plne_p = "bm_plne_p", kubatura_plne_p = "kubatura_plne_p", nosnost_plne_p = "nosnost_plne_p", kapacita_krabic = "kapacita_krabic", ico = "ico", aktivita_ulm_txt = "aktivita_ulm_txt", aktivita_ulm_nad_txt = "aktivita_ulm_nad_txt", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", budova_segment_mistnost_add = "budova_segment_mistnost_add", rozsireny_mod = "rozsireny_mod", Permissions = "Permissions", Validators = "Validators", VALIDATION_GROUP_UPDATE = "VALIDATION_GROUP_UPDATE", VALIDATION_GROUP_CREATE = "VALIDATION_GROUP_CREATE", FRAGMENT_ULOZNE_MISTO = "FRAGMENT_ULOZNE_MISTO", FRAGMENT_PERMISSIONS = "FRAGMENT_PERMISSIONS", FRAGMENT_VALIDATORS = "FRAGMENT_VALIDATORS", IxsEntity = "IxsEntity",}
	const enum GUlozneMistoDtoFragments { ixs_ulm = "ULOZNE_MISTO", aktivita = "ULOZNE_MISTO", mistnost_kod = "ULOZNE_MISTO", mistnost_naz = "ULOZNE_MISTO", segment_kod = "ULOZNE_MISTO", segment_naz = "ULOZNE_MISTO", budova_kod = "ULOZNE_MISTO", budova_naz = "ULOZNE_MISTO", kod_tyu = "ULOZNE_MISTO", ixs_ulm_nad = "ULOZNE_MISTO", kod_tyu_nad = "ULOZNE_MISTO", ixs_ulm_nad_2 = "ULOZNE_MISTO", ixs_ulm_nad_3 = "ULOZNE_MISTO", ixs_ulm_nad_4 = "ULOZNE_MISTO", ixs_ulm_nad_5 = "ULOZNE_MISTO", uroven = "ULOZNE_MISTO", uroven_pod = "ULOZNE_MISTO", priz_nad = "ULOZNE_MISTO", paprsek = "ULOZNE_MISTO", police = "ULOZNE_MISTO", bm = "ULOZNE_MISTO", kubatura = "ULOZNE_MISTO", nosnost = "ULOZNE_MISTO", vlhkost = "ULOZNE_MISTO", bm_plne = "ULOZNE_MISTO", kubatura_plne = "ULOZNE_MISTO", ixs_spi = "ULOZNE_MISTO", ixs_fun = "ULOZNE_MISTO", popis = "ULOZNE_MISTO", dat_zmena = "ULOZNE_MISTO", nosnost_plne = "ULOZNE_MISTO", bm_c = "ULOZNE_MISTO", kubatura_c = "ULOZNE_MISTO", nosnost_c = "ULOZNE_MISTO", bm_plne_c = "ULOZNE_MISTO", kubatura_plne_c = "ULOZNE_MISTO", nosnost_plne_c = "ULOZNE_MISTO", bm_p = "ULOZNE_MISTO", kubatura_p = "ULOZNE_MISTO", nosnost_p = "ULOZNE_MISTO", bm_plne_p = "ULOZNE_MISTO", kubatura_plne_p = "ULOZNE_MISTO", nosnost_plne_p = "ULOZNE_MISTO", kapacita_krabic = "ULOZNE_MISTO", ico = "ULOZNE_MISTO", aktivita_ulm_txt = "ULOZNE_MISTO", aktivita_ulm_nad_txt = "ULOZNE_MISTO", nazev_zmenu_prov_add = "ULOZNE_MISTO", budova_segment_mistnost_add = "ULOZNE_MISTO", rozsireny_mod = "ULOZNE_MISTO", Permissions = "FRAGMENT_PERMISSIONS", Validators = "FRAGMENT_VALIDATORS", VALIDATION_GROUP_UPDATE = "*", VALIDATION_GROUP_CREATE = "*", FRAGMENT_ULOZNE_MISTO = "*", FRAGMENT_PERMISSIONS = "*", FRAGMENT_VALIDATORS = "*", IxsEntity = "*",}
	const enum GUlozneMistoDtoTypes { ixs_ulm = "string", aktivita = "number", mistnost_kod = "string", mistnost_naz = "string", segment_kod = "string", segment_naz = "string", budova_kod = "string", budova_naz = "string", kod_tyu = "number", ixs_ulm_nad = "string", kod_tyu_nad = "number", ixs_ulm_nad_2 = "string", ixs_ulm_nad_3 = "string", ixs_ulm_nad_4 = "string", ixs_ulm_nad_5 = "string", uroven = "number", uroven_pod = "number", priz_nad = "number", paprsek = "string", police = "string", bm = "JsonDecimal", kubatura = "JsonDecimal", nosnost = "JsonDecimal", vlhkost = "JsonDecimal", bm_plne = "JsonDecimal", kubatura_plne = "JsonDecimal", ixs_spi = "string", ixs_fun = "string", popis = "string", dat_zmena = "JsonDate", nosnost_plne = "JsonDecimal", bm_c = "JsonDecimal", kubatura_c = "JsonDecimal", nosnost_c = "JsonDecimal", bm_plne_c = "JsonDecimal", kubatura_plne_c = "JsonDecimal", nosnost_plne_c = "JsonDecimal", bm_p = "JsonDecimal", kubatura_p = "JsonDecimal", nosnost_p = "JsonDecimal", bm_plne_p = "JsonDecimal", kubatura_plne_p = "JsonDecimal", nosnost_plne_p = "JsonDecimal", kapacita_krabic = "number", ico = "string", aktivita_ulm_txt = "string", aktivita_ulm_nad_txt = "string", nazev_zmenu_prov_add = "string", budova_segment_mistnost_add = "string", rozsireny_mod = "boolean", Permissions = "Gordic.Spi.Interface.GUlozneMistoDtoPermissionsDto", Validators = "object", VALIDATION_GROUP_UPDATE = "string", VALIDATION_GROUP_CREATE = "string", FRAGMENT_ULOZNE_MISTO = "string", FRAGMENT_PERMISSIONS = "string", FRAGMENT_VALIDATORS = "string", IxsEntity = "string",}
	const enum GUlozneMistoDtoTypeLengths { aktivita = 8, mistnost_kod = 8, mistnost_naz = 50, segment_kod = 8, segment_naz = 50, budova_kod = 8, budova_naz = 50, paprsek = 20, police = 20, popis = 50, ico = 10, nazev_zmenu_prov_add = 100, budova_segment_mistnost_add = 100,}
	/**Stromové uzly budovy*/
	interface GTreeNodeBaseDto {
		/**ID*/
		ID?: string|null;
		/**ID*/
		IDParent?: string|null;
		/**Text*/
		Text?: string|null;
		/**icona*/
		ImageIndex?: number|null;
		/**icona*/
		aktivita?: number|null;
	}
	const enum GTreeNodeBaseDtoNames { ID = "ID", IDParent = "IDParent", Text = "Text", ImageIndex = "ImageIndex", aktivita = "aktivita",}
	const enum GTreeNodeBaseDtoFragments { ID = "*", IDParent = "*", Text = "*", ImageIndex = "*", aktivita = "*",}
	const enum GTreeNodeBaseDtoTypes { ID = "string", IDParent = "string", Text = "string", ImageIndex = "number", aktivita = "number",}
	const enum GTreeNodeBaseDtoTypeLengths {}
	/**Stromové uzly budovy*/
	interface GTreeNodeULMDto extends Gordic.Spi.Interface.GTreeNodeBaseDto {
		/**ID*/
		ulozneMisto_kod?: Gordic.Spi.Interface.GUlozneMistoKodDto|null;
		/**ID ulozneho mista*/
		ixs_ulm?: string|null;
	}
	const enum GTreeNodeULMDtoNames { ulozneMisto_kod = "ulozneMisto_kod", ixs_ulm = "ixs_ulm", ID = "ID", IDParent = "IDParent", Text = "Text", ImageIndex = "ImageIndex", aktivita = "aktivita",}
	const enum GTreeNodeULMDtoFragments { ulozneMisto_kod = "*", ixs_ulm = "*", ID = "*", IDParent = "*", Text = "*", ImageIndex = "*", aktivita = "*",}
	const enum GTreeNodeULMDtoTypes { ulozneMisto_kod = "Gordic.Spi.Interface.GUlozneMistoKodDto", ixs_ulm = "string", ID = "string", IDParent = "string", Text = "string", ImageIndex = "number", aktivita = "number",}
	const enum GTreeNodeULMDtoTypeLengths {}
	/**budova ID*/
	interface GBudovaKodDto {
		/**budova kod*/
		budova_kod?: string|null;
	}
	const enum GBudovaKodDtoNames { budova_kod = "budova_kod",}
	const enum GBudovaKodDtoFragments { budova_kod = "*",}
	const enum GBudovaKodDtoTypes { budova_kod = "string",}
	const enum GBudovaKodDtoTypeLengths {}
	/**segment ID*/
	interface GSegmentKodDto extends Gordic.Spi.Interface.GBudovaKodDto {
		/**sement kod*/
		segment_kod?: string|null;
	}
	const enum GSegmentKodDtoNames { segment_kod = "segment_kod", budova_kod = "budova_kod",}
	const enum GSegmentKodDtoFragments { segment_kod = "*", budova_kod = "*",}
	const enum GSegmentKodDtoTypes { segment_kod = "string", budova_kod = "string",}
	const enum GSegmentKodDtoTypeLengths {}
	/**mistnost ID*/
	interface GMistnostKodDto extends Gordic.Spi.Interface.GSegmentKodDto {
		/**mistnost kod*/
		mistnost_kod?: string|null;
	}
	const enum GMistnostKodDtoNames { mistnost_kod = "mistnost_kod", segment_kod = "segment_kod", budova_kod = "budova_kod",}
	const enum GMistnostKodDtoFragments { mistnost_kod = "*", segment_kod = "*", budova_kod = "*",}
	const enum GMistnostKodDtoTypes { mistnost_kod = "string", segment_kod = "string", budova_kod = "string",}
	const enum GMistnostKodDtoTypeLengths {}
	/**Stromové uzly budovy*/
	interface GUlozneMistoKodDto extends Gordic.Spi.Interface.GMistnostKodDto {
		/**ID ulozneho mista*/
		ixs_ulm?: string|null;
	}
	const enum GUlozneMistoKodDtoNames { ixs_ulm = "ixs_ulm", mistnost_kod = "mistnost_kod", segment_kod = "segment_kod", budova_kod = "budova_kod",}
	const enum GUlozneMistoKodDtoFragments { ixs_ulm = "*", mistnost_kod = "*", segment_kod = "*", budova_kod = "*",}
	const enum GUlozneMistoKodDtoTypes { ixs_ulm = "string", mistnost_kod = "string", segment_kod = "string", budova_kod = "string",}
	const enum GUlozneMistoKodDtoTypeLengths {}
	/**Stromové uzly budovy*/
	interface GBudovaTreeNodeDto extends Gordic.Spi.Interface.GTreeNodeBaseDto {
		/**budova*/
		BudovaDto?: Gordic.Spi.Interface.GBudovaDto|null;
		/**poduzly*/
		Nodes?: Gordic.Spi.Interface.GSegmentTreeNodeDto[]|null;
	}
	const enum GBudovaTreeNodeDtoNames { BudovaDto = "BudovaDto", Nodes = "Nodes", ID = "ID", IDParent = "IDParent", Text = "Text", ImageIndex = "ImageIndex", aktivita = "aktivita",}
	const enum GBudovaTreeNodeDtoFragments { BudovaDto = "*", Nodes = "*", ID = "*", IDParent = "*", Text = "*", ImageIndex = "*", aktivita = "*",}
	const enum GBudovaTreeNodeDtoTypes { BudovaDto = "Gordic.Spi.Interface.GBudovaDto", Nodes = "Gordic.Spi.Interface.GSegmentTreeNodeDto[]", ID = "string", IDParent = "string", Text = "string", ImageIndex = "number", aktivita = "number",}
	const enum GBudovaTreeNodeDtoTypeLengths {}
	/**Stromové uzly segmentu*/
	interface GSegmentTreeNodeDto extends Gordic.Spi.Interface.GTreeNodeBaseDto {
		/**Segment Dto*/
		SegmentDto?: Gordic.Spi.Interface.GSegmentDto|null;
		/**poduzly*/
		Nodes?: Gordic.Spi.Interface.GMistnostTreeNodeDto[]|null;
	}
	const enum GSegmentTreeNodeDtoNames { SegmentDto = "SegmentDto", Nodes = "Nodes", ID = "ID", IDParent = "IDParent", Text = "Text", ImageIndex = "ImageIndex", aktivita = "aktivita",}
	const enum GSegmentTreeNodeDtoFragments { SegmentDto = "*", Nodes = "*", ID = "*", IDParent = "*", Text = "*", ImageIndex = "*", aktivita = "*",}
	const enum GSegmentTreeNodeDtoTypes { SegmentDto = "Gordic.Spi.Interface.GSegmentDto", Nodes = "Gordic.Spi.Interface.GMistnostTreeNodeDto[]", ID = "string", IDParent = "string", Text = "string", ImageIndex = "number", aktivita = "number",}
	const enum GSegmentTreeNodeDtoTypeLengths {}
	/**Stromové uzly*/
	interface GMistnostTreeNodeDto extends Gordic.Spi.Interface.GTreeNodeBaseDto {
		/**Mistnost Dto DataRow*/
		MistnostDto?: Gordic.Spi.Interface.GMistnostDto|null;
		/**poduzly*/
		Nodes?: Gordic.Spi.Interface.GUlozneMistoTreeNodeDto[]|null;
	}
	const enum GMistnostTreeNodeDtoNames { MistnostDto = "MistnostDto", Nodes = "Nodes", ID = "ID", IDParent = "IDParent", Text = "Text", ImageIndex = "ImageIndex", aktivita = "aktivita",}
	const enum GMistnostTreeNodeDtoFragments { MistnostDto = "*", Nodes = "*", ID = "*", IDParent = "*", Text = "*", ImageIndex = "*", aktivita = "*",}
	const enum GMistnostTreeNodeDtoTypes { MistnostDto = "Gordic.Spi.Interface.GMistnostDto", Nodes = "Gordic.Spi.Interface.GUlozneMistoTreeNodeDto[]", ID = "string", IDParent = "string", Text = "string", ImageIndex = "number", aktivita = "number",}
	const enum GMistnostTreeNodeDtoTypeLengths {}
	/**Stromové uzly*/
	interface GUlozneMistoTreeNodeDto extends Gordic.Spi.Interface.GTreeNodeBaseDto {
		/**UlozneMisto Dto DataRow*/
		UlozneMistoDto?: Gordic.Spi.Interface.GSpisulmDto|null;
	}
	const enum GUlozneMistoTreeNodeDtoNames { UlozneMistoDto = "UlozneMistoDto", ID = "ID", IDParent = "IDParent", Text = "Text", ImageIndex = "ImageIndex", aktivita = "aktivita",}
	const enum GUlozneMistoTreeNodeDtoFragments { UlozneMistoDto = "*", ID = "*", IDParent = "*", Text = "*", ImageIndex = "*", aktivita = "*",}
	const enum GUlozneMistoTreeNodeDtoTypes { UlozneMistoDto = "Gordic.Spi.Interface.GSpisulmDto", ID = "string", IDParent = "string", Text = "string", ImageIndex = "number", aktivita = "number",}
	const enum GUlozneMistoTreeNodeDtoTypeLengths {}
	interface GUlozneMistoDtoPermissionsDto {
		/**Oprávnění vytvořit záznam.*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Oprávnění editovat záznam.*/
		CanEdit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GUlozneMistoDtoPermissionsDtoNames { CanCreate = "CanCreate", CanEdit = "CanEdit",}
	const enum GUlozneMistoDtoPermissionsDtoFragments { CanCreate = "*", CanEdit = "*",}
	const enum GUlozneMistoDtoPermissionsDtoTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanEdit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GUlozneMistoDtoPermissionsDtoTypeLengths {}
	/**GPisemnostNeevidovanaFilter*/
	const enum GUlozneMistoFilter {
		/**The ixp*/
		ixs_ulm,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GVypujckyDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Neaktivni dokSpis*/
	interface GVypujckyDto extends Gordic.Spi.Interface.GDokSpisSpiListBaseDto {
		/**DBCOLUMN:Seznam.ixs_vyl*/
		ixs_vyl?: string|null;
		/**DBCOLUMN:Seznam.ixs*/
		ixs?: string|null;
		/**DBCOLUMN:Seznam.priz_obj*/
		priz_obj?: number|null;
		/**DBCOLUMN:Seznam.ixs_spi_od*/
		ixs_spi_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_od*/
		ixs_fun_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do*/
		ixs_fun_do?: string|null;
		/**DBCOLUMN:Seznam.dat_vyp*/
		dat_vyp?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vrac*/
		dat_vrac?: JsonDate|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp_txt*/
		priz_vyp_txt?: string|null;
		/**DBCOLUMN:Seznam.znacka_vyl*/
		znacka_vyl?: string|null;
		/**DBCOLUMN:Seznam.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:Seznam.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:Seznam.priz_sub_vyp*/
		priz_sub_vyp?: number|null;
		/**DBCOLUMN:Seznam.sub_vyp_txt*/
		sub_vyp_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev_zmenu_prov*/
		nazev_zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.prevzal_txt*/
		prevzal_txt?: string|null;
		/**DBCOLUMN:Seznam.vypujcil_txt*/
		vypujcil_txt?: string|null;
	}
	const enum GVypujckyDtoNames { ixs_vyl = "ixs_vyl", ixs = "ixs", priz_obj = "priz_obj", ixs_spi_od = "ixs_spi_od", ixs_fun_od = "ixs_fun_od", ixs_fun_do = "ixs_fun_do", dat_vyp = "dat_vyp", dat_vrac = "dat_vrac", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", znacka_vyl = "znacka_vyl", lic_zast = "lic_zast", por_zast = "por_zast", priz_sub_vyp = "priz_sub_vyp", sub_vyp_txt = "sub_vyp_txt", nazev_zmenu_prov = "nazev_zmenu_prov", prevzal_txt = "prevzal_txt", vypujcil_txt = "vypujcil_txt", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", ixs_zup = "ixs_zup", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", odesilatel = "odesilatel", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", m_err = "m_err", m_vyber = "m_vyber", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log",}
	const enum GVypujckyDtoFragments { ixs_vyl = "*", ixs = "*", priz_obj = "*", ixs_spi_od = "*", ixs_fun_od = "*", ixs_fun_do = "*", dat_vyp = "*", dat_vrac = "*", priz_vyp = "*", priz_vyp_txt = "*", znacka_vyl = "*", lic_zast = "*", por_zast = "*", priz_sub_vyp = "*", sub_vyp_txt = "*", nazev_zmenu_prov = "*", prevzal_txt = "*", vypujcil_txt = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", ixs_zup = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", odesilatel = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", m_err = "*", m_vyber = "*", info_ikon_add = "*", _gdpr_stav_log = "*",}
	const enum GVypujckyDtoTypes { ixs_vyl = "string", ixs = "string", priz_obj = "number", ixs_spi_od = "string", ixs_fun_od = "string", ixs_fun_do = "string", dat_vyp = "JsonDate", dat_vrac = "JsonDate", priz_vyp = "number", priz_vyp_txt = "string", znacka_vyl = "string", lic_zast = "string", por_zast = "number", priz_sub_vyp = "number", sub_vyp_txt = "string", nazev_zmenu_prov = "string", prevzal_txt = "string", vypujcil_txt = "string", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", ixs_zup = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", odesilatel = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", m_err = "string", m_vyber = "number", info_ikon_add = "number", _gdpr_stav_log = "number",}
	const enum GVypujckyDtoTypeLengths { ixs_vyl = 12, ixs = 12, ixs_spi_od = 12, ixs_fun_od = 12, ixs_fun_do = 12, priz_vyp_txt = 50, znacka_vyl = 30, lic_zast = 4, sub_vyp_txt = 254, nazev_zmenu_prov = 300, prevzal_txt = 300, vypujcil_txt = 300, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, misto_vzniku = 100, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\GVypujcniListekDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Detail vypujcniho listku DTO*/
	interface GVypujcniListekDto extends Gordic.Gin.Interface.GEntityDto {
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_UPDATE?: string|null;
		/**Konstanty názvů skupin pro validaci.*/
		VALIDATION_GROUP_CREATE?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_VYPUJCNI_LISTEK?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_PERMISSIONS?: string|null;
		/**Konstanty fragmentů.*/
		FRAGMENT_VALIDATORS?: string|null;
		/**DBCOLUMN:Seznam.ixs_vyl*/
		ixs_vyl?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.ixs*/
		ixs?: string|null;
		/**DBCOLUMN:Seznam.priz_obj*/
		priz_obj?: number|null;
		/**DBCOLUMN:Seznam.ixs_spi_od*/
		ixs_spi_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_od*/
		ixs_fun_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_do*/
		ixs_su_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do*/
		ixs_fun_do?: string|null;
		/**DBCOLUMN:Seznam.dat_vyp*/
		dat_vyp?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vrac*/
		dat_vrac?: JsonDate|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp_txt*/
		priz_vyp_txt?: string|null;
		/**DBCOLUMN:Seznam.znacka_vyl*/
		znacka_vyl?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:Seznam.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:Seznam.priz_sub_vyp*/
		priz_sub_vyp?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.typ_esu*/
		typ_esu?: Gordic.Ginis.DbModel.GGincesuEnum|null;
		/**DBCOLUMN:Seznam.sub_vyp_txt*/
		sub_vyp_txt?: string|null;
		/**DBCOLUMN:Seznam.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.nazev_zup*/
		nazev_zup?: string|null;
		/**DBCOLUMN:Seznam.znacka_zup*/
		znacka_zup?: string|null;
		/**DBCOLUMN:Seznam.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:Seznam.nazev_spis*/
		nazev_spis?: string|null;
		/**DBCOLUMN:Seznam.znacka_spis*/
		znacka_spis?: string|null;
		/**DBCOLUMN:Seznam.ixs_ulm*/
		ixs_ulm?: string|null;
		/**DBCOLUMN:Seznam.umisteni*/
		umisteni?: string|null;
		/**DBCOLUMN:Seznam.police*/
		police?: string|null;
		/**DBCOLUMN:Seznam.paprsek*/
		paprsek?: string|null;
		/**DBCOLUMN:Seznam.nazev_zmenu_prov*/
		nazev_zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.prevzal_txt*/
		prevzal_txt?: string|null;
		/**DBCOLUMN:Seznam.vypujcil_txt*/
		vypujcil_txt?: string|null;
		/**DBCOLUMN:Seznam.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		s_fyz?: number|null;
		/**bm_pos*/
		bm_pos?: JsonDecimal|null;
		budova_kod?: string|null;
		budova_nazev?: string|null;
		segment_kod?: string|null;
		segment_nazev?: string|null;
		mistnost_kod?: string|null;
		mistnost_nazev?: string|null;
		popis_ulm?: string|null;
		/**typ ulozneho mista*/
		kod_tyu?: number|null;
		/**typ ulozneho mista nazev*/
		kod_tyu_txt?: string|null;
		/**jsou povoleny zadosti o vypucjky*/
		zadostiEnabled?: boolean|null;
		/**faze ginisu*/
		fazeGinisu?: Gordic.Gin.Interface.FazeGinisuEnum|null;
		/**dyvod vypyujceni*/
		duvod?: string|null;
		/**Oprávnění.*/
		Permissions?: Gordic.Spi.Interface.GVypujcniListekDtoPermissionsDto|null;
		/**Validátory.*/
		readonly Validators?: object|null;
	}
	const enum GVypujcniListekDtoNames { VALIDATION_GROUP_UPDATE = "VALIDATION_GROUP_UPDATE", VALIDATION_GROUP_CREATE = "VALIDATION_GROUP_CREATE", FRAGMENT_VYPUJCNI_LISTEK = "FRAGMENT_VYPUJCNI_LISTEK", FRAGMENT_PERMISSIONS = "FRAGMENT_PERMISSIONS", FRAGMENT_VALIDATORS = "FRAGMENT_VALIDATORS", ixs_vyl = "ixs_vyl", por_cislo = "por_cislo", rok = "rok", ixs = "ixs", priz_obj = "priz_obj", ixs_spi_od = "ixs_spi_od", ixs_fun_od = "ixs_fun_od", ixs_su_do = "ixs_su_do", ixs_fun_do = "ixs_fun_do", dat_vyp = "dat_vyp", dat_vrac = "dat_vrac", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", znacka_vyl = "znacka_vyl", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", nazev = "nazev", lic_zast = "lic_zast", por_zast = "por_zast", priz_sub_vyp = "priz_sub_vyp", ixs_esu = "ixs_esu", typ_esu = "typ_esu", sub_vyp_txt = "sub_vyp_txt", akt_znacka = "akt_znacka", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_zup = "ixs_zup", nazev_zup = "nazev_zup", znacka_zup = "znacka_zup", ixp_spis = "ixp_spis", nazev_spis = "nazev_spis", znacka_spis = "znacka_spis", ixs_ulm = "ixs_ulm", umisteni = "umisteni", police = "police", paprsek = "paprsek", nazev_zmenu_prov = "nazev_zmenu_prov", prevzal_txt = "prevzal_txt", vypujcil_txt = "vypujcil_txt", s_ele = "s_ele", s_fyz = "s_fyz", bm_pos = "bm_pos", budova_kod = "budova_kod", budova_nazev = "budova_nazev", segment_kod = "segment_kod", segment_nazev = "segment_nazev", mistnost_kod = "mistnost_kod", mistnost_nazev = "mistnost_nazev", popis_ulm = "popis_ulm", kod_tyu = "kod_tyu", kod_tyu_txt = "kod_tyu_txt", zadostiEnabled = "zadostiEnabled", fazeGinisu = "fazeGinisu", duvod = "duvod", Permissions = "Permissions", Validators = "Validators", IxsEntity = "IxsEntity",}
	const enum GVypujcniListekDtoFragments { VALIDATION_GROUP_UPDATE = "*", VALIDATION_GROUP_CREATE = "*", FRAGMENT_VYPUJCNI_LISTEK = "*", FRAGMENT_PERMISSIONS = "*", FRAGMENT_VALIDATORS = "*", ixs_vyl = "*", por_cislo = "VYPUJCNI_LISTEK", rok = "VYPUJCNI_LISTEK", ixs = "VYPUJCNI_LISTEK", priz_obj = "VYPUJCNI_LISTEK", ixs_spi_od = "VYPUJCNI_LISTEK", ixs_fun_od = "VYPUJCNI_LISTEK", ixs_su_do = "VYPUJCNI_LISTEK", ixs_fun_do = "VYPUJCNI_LISTEK", dat_vyp = "VYPUJCNI_LISTEK", dat_vrac = "VYPUJCNI_LISTEK", priz_vyp = "VYPUJCNI_LISTEK", priz_vyp_txt = "VYPUJCNI_LISTEK", znacka_vyl = "VYPUJCNI_LISTEK", zmenu_prov = "VYPUJCNI_LISTEK", dat_zmena = "VYPUJCNI_LISTEK", nazev = "VYPUJCNI_LISTEK", lic_zast = "VYPUJCNI_LISTEK", por_zast = "VYPUJCNI_LISTEK", priz_sub_vyp = "VYPUJCNI_LISTEK", ixs_esu = "VYPUJCNI_LISTEK", typ_esu = "*", sub_vyp_txt = "VYPUJCNI_LISTEK", akt_znacka = "VYPUJCNI_LISTEK", spis_pl = "VYPUJCNI_LISTEK", spis_znak = "VYPUJCNI_LISTEK", ixs_zup = "VYPUJCNI_LISTEK", nazev_zup = "VYPUJCNI_LISTEK", znacka_zup = "VYPUJCNI_LISTEK", ixp_spis = "VYPUJCNI_LISTEK", nazev_spis = "VYPUJCNI_LISTEK", znacka_spis = "VYPUJCNI_LISTEK", ixs_ulm = "VYPUJCNI_LISTEK", umisteni = "*", police = "VYPUJCNI_LISTEK", paprsek = "VYPUJCNI_LISTEK", nazev_zmenu_prov = "VYPUJCNI_LISTEK", prevzal_txt = "VYPUJCNI_LISTEK", vypujcil_txt = "VYPUJCNI_LISTEK", s_ele = "VYPUJCNI_LISTEK", s_fyz = "VYPUJCNI_LISTEK", bm_pos = "VYPUJCNI_LISTEK", budova_kod = "VYPUJCNI_LISTEK", budova_nazev = "VYPUJCNI_LISTEK", segment_kod = "VYPUJCNI_LISTEK", segment_nazev = "VYPUJCNI_LISTEK", mistnost_kod = "VYPUJCNI_LISTEK", mistnost_nazev = "VYPUJCNI_LISTEK", popis_ulm = "VYPUJCNI_LISTEK", kod_tyu = "VYPUJCNI_LISTEK", kod_tyu_txt = "VYPUJCNI_LISTEK", zadostiEnabled = "VYPUJCNI_LISTEK", fazeGinisu = "VYPUJCNI_LISTEK", duvod = "VYPUJCNI_LISTEK", Permissions = "FRAGMENT_PERMISSIONS", Validators = "FRAGMENT_VALIDATORS", IxsEntity = "*",}
	const enum GVypujcniListekDtoTypes { VALIDATION_GROUP_UPDATE = "string", VALIDATION_GROUP_CREATE = "string", FRAGMENT_VYPUJCNI_LISTEK = "string", FRAGMENT_PERMISSIONS = "string", FRAGMENT_VALIDATORS = "string", ixs_vyl = "string", por_cislo = "number", rok = "number", ixs = "string", priz_obj = "number", ixs_spi_od = "string", ixs_fun_od = "string", ixs_su_do = "string", ixs_fun_do = "string", dat_vyp = "JsonDate", dat_vrac = "JsonDate", priz_vyp = "number", priz_vyp_txt = "string", znacka_vyl = "string", zmenu_prov = "string", dat_zmena = "JsonDate", nazev = "string", lic_zast = "string", por_zast = "number", priz_sub_vyp = "number", ixs_esu = "string", typ_esu = "Gordic.Ginis.DbModel.GGincesuEnum", sub_vyp_txt = "string", akt_znacka = "string", spis_pl = "string", spis_znak = "string", ixs_zup = "string", nazev_zup = "string", znacka_zup = "string", ixp_spis = "string", nazev_spis = "string", znacka_spis = "string", ixs_ulm = "string", umisteni = "string", police = "string", paprsek = "string", nazev_zmenu_prov = "string", prevzal_txt = "string", vypujcil_txt = "string", s_ele = "number", s_fyz = "number", bm_pos = "JsonDecimal", budova_kod = "string", budova_nazev = "string", segment_kod = "string", segment_nazev = "string", mistnost_kod = "string", mistnost_nazev = "string", popis_ulm = "string", kod_tyu = "number", kod_tyu_txt = "string", zadostiEnabled = "boolean", fazeGinisu = "Gordic.Gin.Interface.FazeGinisuEnum", duvod = "string", Permissions = "Gordic.Spi.Interface.GVypujcniListekDtoPermissionsDto", Validators = "object", IxsEntity = "string",}
	const enum GVypujcniListekDtoTypeLengths { ixs = 12, ixs_spi_od = 12, ixs_fun_od = 12, ixs_su_do = 12, ixs_fun_do = 12, priz_vyp_txt = 50, znacka_vyl = 30, zmenu_prov = 12, nazev = 100, lic_zast = 4, ixs_esu = 12, sub_vyp_txt = 254, akt_znacka = 50, spis_pl = 5, spis_znak = 50, ixs_zup = 12, nazev_zup = 100, znacka_zup = 50, ixp_spis = 12, nazev_spis = 100, znacka_spis = 50, ixs_ulm = 12, umisteni = 100, police = 20, paprsek = 20, nazev_zmenu_prov = 300, prevzal_txt = 300, vypujcil_txt = 300, budova_kod = 8, segment_kod = 8, mistnost_kod = 8, popis_ulm = 50,}
	interface GVypujcniListekDtoPermissionsDto {
		/**Oprávnění vytvořit záznam.*/
		CanCreate: Gordic.General.ApplicationInterface.GPermission;
		/**Oprávnění editovat záznam.*/
		CanEdit: Gordic.General.ApplicationInterface.GPermission;
	}
	const enum GVypujcniListekDtoPermissionsDtoNames { CanCreate = "CanCreate", CanEdit = "CanEdit",}
	const enum GVypujcniListekDtoPermissionsDtoFragments { CanCreate = "*", CanEdit = "*",}
	const enum GVypujcniListekDtoPermissionsDtoTypes { CanCreate = "Gordic.General.ApplicationInterface.GPermission", CanEdit = "Gordic.General.ApplicationInterface.GPermission",}
	const enum GVypujcniListekDtoPermissionsDtoTypeLengths {}
	/**GPisemnostNeevidovanaFilter*/
	const enum GVypujcniListekFilter {
		/**The ixp*/
		IxsVyp,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\SpiListDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**struktura pro operace nad seznammy pripravy skart rizeni*/
	interface GSkartRizeniListOperationDto extends Gordic.Spi.Interface.GDokSpisVBalikuDto {
		/**priznak*/
		priznak?: number|null;
		/**priznak*/
		IdPrimaryKey?: string|null;
	}
	const enum GSkartRizeniListOperationDtoNames { priznak = "priznak", IdPrimaryKey = "IdPrimaryKey", ixp = "ixp", ixs_zup = "ixs_zup", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum GSkartRizeniListOperationDtoFragments { priznak = "*", IdPrimaryKey = "*", ixp = "*", ixs_zup = "*", IDPrimaryKeyGriduGenerated = "*", dat_zmena = "*", IxsEntity = "*",}
	const enum GSkartRizeniListOperationDtoTypes { priznak = "number", IdPrimaryKey = "string", ixp = "string", ixs_zup = "string", IDPrimaryKeyGriduGenerated = "string", dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum GSkartRizeniListOperationDtoTypeLengths { ixp = 12, ixs_zup = 12,}
	/**DBTABLE:Seznam*/
	interface GVypujcniListekDetDto {
		/**DBCOLUMN:Seznam.ixs_vyl*/
		ixs_vyl?: string|null;
		/**DBCOLUMN:Seznam.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:Seznam.ixs*/
		ixs?: string|null;
		/**DBCOLUMN:Seznam.priz_obj*/
		priz_obj?: number|null;
		/**DBCOLUMN:Seznam.ixs_spi_od*/
		ixs_spi_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_od*/
		ixs_fun_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_do*/
		ixs_su_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do*/
		ixs_fun_do?: string|null;
		/**DBCOLUMN:Seznam.dat_vyp*/
		dat_vyp?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vrac*/
		dat_vrac?: JsonDate|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:Seznam.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:Seznam.znacka_vyl*/
		znacka_vyl?: string|null;
		/**DBCOLUMN:Seznam.priz_sub_vyp*/
		priz_sub_vyp?: number|null;
		/**DBCOLUMN:Seznam.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:Seznam.sub_vyp_txt*/
		sub_vyp_txt?: string|null;
		/**DBCOLUMN:Seznam.prevzal_txt*/
		prevzal_txt?: string|null;
		/**DBCOLUMN:Seznam.nazev_zmenu_prov*/
		nazev_zmenu_prov?: string|null;
		/**vypujcil_txt*/
		vypujcil_txt?: string|null;
		/**typ_esu*/
		typ_esu?: Gordic.Ginis.DbModel.GGincesuEnum|null;
		/**DBCOLUMN:Seznam.akt_znacka*/
		akt_znacka?: string|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.nazev_zup*/
		nazev_zup?: string|null;
		/**DBCOLUMN:Seznam.znacka_zup*/
		znacka_zup?: string|null;
		/**DBCOLUMN:Seznam.ixp_spis*/
		ixp_spis?: string|null;
		/**DBCOLUMN:Seznam.nazev_spis*/
		nazev_spis?: string|null;
		/**DBCOLUMN:Seznam.znacka_spis*/
		znacka_spis?: string|null;
		/**DBCOLUMN:Seznam.ixs_ulm*/
		ixs_ulm?: string|null;
		/**DBCOLUMN:Seznam.umisteni*/
		umisteni?: string|null;
		/**DBCOLUMN:Seznam.police*/
		police?: string|null;
		/**DBCOLUMN:Seznam.paprsek*/
		paprsek?: string|null;
		/**DBCOLUMN:Seznam.s_ele*/
		s_ele?: number|null;
		/**DBCOLUMN:Seznam.s_fyz*/
		s_fyz?: number|null;
		/**DBCOLUMN:Seznam.rok*/
		rok?: number|null;
		/**DBCOLUMN:Seznam.bm_pos*/
		bm_pos?: JsonDecimal|null;
	}
	const enum GVypujcniListekDetDtoNames { ixs_vyl = "ixs_vyl", por_cislo = "por_cislo", ixs = "ixs", priz_obj = "priz_obj", ixs_spi_od = "ixs_spi_od", ixs_fun_od = "ixs_fun_od", ixs_su_do = "ixs_su_do", ixs_fun_do = "ixs_fun_do", dat_vyp = "dat_vyp", dat_vrac = "dat_vrac", priz_vyp = "priz_vyp", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", nazev = "nazev", lic_zast = "lic_zast", por_zast = "por_zast", znacka_vyl = "znacka_vyl", priz_sub_vyp = "priz_sub_vyp", ixs_esu = "ixs_esu", sub_vyp_txt = "sub_vyp_txt", prevzal_txt = "prevzal_txt", nazev_zmenu_prov = "nazev_zmenu_prov", vypujcil_txt = "vypujcil_txt", typ_esu = "typ_esu", akt_znacka = "akt_znacka", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_zup = "ixs_zup", nazev_zup = "nazev_zup", znacka_zup = "znacka_zup", ixp_spis = "ixp_spis", nazev_spis = "nazev_spis", znacka_spis = "znacka_spis", ixs_ulm = "ixs_ulm", umisteni = "umisteni", police = "police", paprsek = "paprsek", s_ele = "s_ele", s_fyz = "s_fyz", rok = "rok", bm_pos = "bm_pos",}
	const enum GVypujcniListekDetDtoFragments { ixs_vyl = "*", por_cislo = "*", ixs = "*", priz_obj = "*", ixs_spi_od = "*", ixs_fun_od = "*", ixs_su_do = "*", ixs_fun_do = "*", dat_vyp = "*", dat_vrac = "*", priz_vyp = "*", zmenu_prov = "*", dat_zmena = "*", nazev = "*", lic_zast = "*", por_zast = "*", znacka_vyl = "*", priz_sub_vyp = "*", ixs_esu = "*", sub_vyp_txt = "*", prevzal_txt = "*", nazev_zmenu_prov = "*", vypujcil_txt = "*", typ_esu = "*", akt_znacka = "*", spis_pl = "*", spis_znak = "*", ixs_zup = "*", nazev_zup = "*", znacka_zup = "*", ixp_spis = "*", nazev_spis = "*", znacka_spis = "*", ixs_ulm = "*", umisteni = "*", police = "*", paprsek = "*", s_ele = "*", s_fyz = "*", rok = "*", bm_pos = "*",}
	const enum GVypujcniListekDetDtoTypes { ixs_vyl = "string", por_cislo = "number", ixs = "string", priz_obj = "number", ixs_spi_od = "string", ixs_fun_od = "string", ixs_su_do = "string", ixs_fun_do = "string", dat_vyp = "JsonDate", dat_vrac = "JsonDate", priz_vyp = "number", zmenu_prov = "string", dat_zmena = "JsonDate", nazev = "string", lic_zast = "string", por_zast = "number", znacka_vyl = "string", priz_sub_vyp = "number", ixs_esu = "string", sub_vyp_txt = "string", prevzal_txt = "string", nazev_zmenu_prov = "string", vypujcil_txt = "string", typ_esu = "Gordic.Ginis.DbModel.GGincesuEnum", akt_znacka = "string", spis_pl = "string", spis_znak = "string", ixs_zup = "string", nazev_zup = "string", znacka_zup = "string", ixp_spis = "string", nazev_spis = "string", znacka_spis = "string", ixs_ulm = "string", umisteni = "string", police = "string", paprsek = "string", s_ele = "number", s_fyz = "number", rok = "number", bm_pos = "JsonDecimal",}
	const enum GVypujcniListekDetDtoTypeLengths { ixs_vyl = 12, ixs = 12, ixs_spi_od = 12, ixs_fun_od = 12, ixs_su_do = 12, ixs_fun_do = 12, zmenu_prov = 12, nazev = 100, lic_zast = 4, znacka_vyl = 30, ixs_esu = 12, sub_vyp_txt = 254, akt_znacka = 50, spis_pl = 5, spis_znak = 50, ixs_zup = 12, nazev_zup = 100, znacka_zup = 50, ixp_spis = 12, nazev_spis = 100, znacka_spis = 50, ixs_ulm = 12, umisteni = 100, police = 20, paprsek = 20,}
	/**DBTABLE:Seznam*/
	interface GVypujckyListDto extends Gordic.Spi.Interface.GDokSpisSpiListBaseDto {
		/**DBCOLUMN:Seznam.zmena_txt*/
		zmena_txt?: string|null;
	}
	const enum GVypujckyListDtoNames { zmena_txt = "zmena_txt", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GVypujckyListDtoFragments { zmena_txt = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GVypujckyListDtoTypes { zmena_txt = "string", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GVypujckyListDtoTypeLengths { zmena_txt = 160, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
	/**seznam baliku  pozn bloku*/
	interface GBalikyVBlokuDto extends Gordic.Spi.Interface.GSpiUniversalListDto {
		/**DBCOLUMN:Seznam.zmena_txt*/
		zmena_txt?: string|null;
	}
	const enum GBalikyVBlokuDtoNames { zmena_txt = "zmena_txt", ixs_spis = "ixs_spis", priz_zup = "priz_zup", ixs_fun = "ixs_fun", dat_uzav = "dat_uzav", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", stav_spi = "stav_spi", stav_spi_txt = "stav_spi_txt", por_cislo_add = "por_cislo_add", info_text = "info_text", rok_kon_spu = "rok_kon_spu", ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", pocet_j = "pocet_j", priz_skn = "priz_skn", priz_skn_txt = "priz_skn_txt", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_znak_nazev = "spis_znak_nazev", kod_tyz_txt = "kod_tyz_txt", popis = "popis", znacka_zup = "znacka_zup", prevzato_od_txt = "prevzato_od_txt", prevzal_txt = "prevzal_txt", rok_skartace_new = "rok_skartace_new", kubatura = "kubatura", ixs_su_od = "ixs_su_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", poz_skar = "poz_skar", vaha = "vaha", police = "police", paprsek = "paprsek", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_predani_spra_new = "rok_predani_spra_new", rok_od = "rok_od", rok_do = "rok_do", priz_rok_prep = "priz_rok_prep", priz_rok_sk_pre = "priz_rok_sk_pre", poc_krabic = "poc_krabic", pocet_listu = "pocet_listu", ixs_lpc = "ixs_lpc", pocet_pis_jed_txt_add = "pocet_pis_jed_txt_add", rozsah_add = "rozsah_add", rozsah_new_add = "rozsah_new_add", ixs_ska = "ixs_ska", nazev_ska = "nazev_ska", ukladaci_znacka = "ukladaci_znacka", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_ref_od = "nazev_ref_od", pocet_j_fyz = "pocet_j_fyz", pocet_pis_fyz = "pocet_pis_fyz", priz_poc_prep = "priz_poc_prep", priz_skzn_prep = "priz_skzn_prep", skar_znak_spz = "skar_znak_spz", skar_lhuta_spz = "skar_lhuta_spz", priz_skar = "priz_skar", ixb_aip = "ixb_aip", ixs_zup_pod = "ixs_zup_pod", priz_trans_log = "priz_trans_log", soubor = "soubor", ixs_cer_c = "ixs_cer_c", rok_od_do_add = "rok_od_do_add", dat_do = "dat_do", hash2 = "hash2", alg_h2 = "alg_h2", nazev_ref_akt = "nazev_ref_akt", nazev_spi_akt = "nazev_spi_akt", zkratka_nazev_spi_akt = "zkratka_nazev_spi_akt", jeVeSpisovne = "jeVeSpisovne", ixb_trans_logu = "ixb_trans_logu", ulmDto = "ulmDto", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GBalikyVBlokuDtoFragments { zmena_txt = "*", ixs_spis = "*", priz_zup = "*", ixs_fun = "*", dat_uzav = "*", stav_ext_spi = "*", id_ext_spi = "*", stav_spi = "*", stav_spi_txt = "*", por_cislo_add = "*", info_text = "*", rok_kon_spu = "*", ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", pocet_j = "*", priz_skn = "*", priz_skn_txt = "*", priz_vyp = "*", priz_vyp_txt = "*", kod_tyz = "*", typ_bal_add = "*", spis_znak_nazev = "*", kod_tyz_txt = "*", popis = "*", znacka_zup = "*", prevzato_od_txt = "*", prevzal_txt = "*", rok_skartace_new = "*", kubatura = "*", ixs_su_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", poz_skar = "*", vaha = "*", police = "*", paprsek = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_predani_spra_new = "*", rok_od = "*", rok_do = "*", priz_rok_prep = "*", priz_rok_sk_pre = "*", poc_krabic = "*", pocet_listu = "*", ixs_lpc = "*", pocet_pis_jed_txt_add = "*", rozsah_add = "*", rozsah_new_add = "*", ixs_ska = "*", nazev_ska = "*", ukladaci_znacka = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_ref_od = "*", pocet_j_fyz = "*", pocet_pis_fyz = "*", priz_poc_prep = "*", priz_skzn_prep = "*", skar_znak_spz = "*", skar_lhuta_spz = "*", priz_skar = "*", ixb_aip = "*", ixs_zup_pod = "*", priz_trans_log = "*", soubor = "*", ixs_cer_c = "*", rok_od_do_add = "*", dat_do = "*", hash2 = "*", alg_h2 = "*", nazev_ref_akt = "*", nazev_spi_akt = "*", zkratka_nazev_spi_akt = "*", jeVeSpisovne = "*", ixb_trans_logu = "*", ulmDto = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GBalikyVBlokuDtoTypes { zmena_txt = "string", ixs_spis = "string", priz_zup = "number", ixs_fun = "string", dat_uzav = "JsonDate", stav_ext_spi = "number", id_ext_spi = "string", stav_spi = "number", stav_spi_txt = "string", por_cislo_add = "string", info_text = "string", rok_kon_spu = "number", ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", pocet_j = "number", priz_skn = "number", priz_skn_txt = "string", priz_vyp = "number", priz_vyp_txt = "string", kod_tyz = "number", typ_bal_add = "number", spis_znak_nazev = "string", kod_tyz_txt = "string", popis = "string", znacka_zup = "string", prevzato_od_txt = "string", prevzal_txt = "string", rok_skartace_new = "number", kubatura = "JsonDecimal", ixs_su_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", poz_skar = "string", vaha = "JsonDecimal", police = "string", paprsek = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_predani_spra_new = "number", rok_od = "number", rok_do = "number", priz_rok_prep = "number", priz_rok_sk_pre = "number", poc_krabic = "number", pocet_listu = "number", ixs_lpc = "string", pocet_pis_jed_txt_add = "string", rozsah_add = "string", rozsah_new_add = "string", ixs_ska = "string", nazev_ska = "string", ukladaci_znacka = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_ref_od = "string", pocet_j_fyz = "number", pocet_pis_fyz = "number", priz_poc_prep = "number", priz_skzn_prep = "number", skar_znak_spz = "string", skar_lhuta_spz = "number", priz_skar = "number", ixb_aip = "string", ixs_zup_pod = "string", priz_trans_log = "number", soubor = "string", ixs_cer_c = "string", rok_od_do_add = "string", dat_do = "JsonDate", hash2 = "string", alg_h2 = "string", nazev_ref_akt = "string", nazev_spi_akt = "string", zkratka_nazev_spi_akt = "string", jeVeSpisovne = "boolean", ixb_trans_logu = "string", ulmDto = "Gordic.Spi.Interface.GSpisulmDto", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GBalikyVBlokuDtoTypeLengths { zmena_txt = 160, ixs_spis = 12, ixs_fun = 12, id_ext_spi = 50, stav_spi_txt = 50, por_cislo_add = 50, info_text = 150, ixs_ulm = 12, ixs_zup_nad = 12, spis_znak_nazev = 240, kod_tyz_txt = 50, popis = 100, znacka_zup = 30, ixs_su_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, poz_skar = 50, police = 20, paprsek = 20, ixs_zmp_od = 12, ixs_lpc = 12, pocet_pis_jed_txt_add = 20, rozsah_add = 20, rozsah_new_add = 20, ixs_ska = 12, nazev_ska = 50, ukladaci_znacka = 50, nazev_su_od = 256, nazev_fun_od = 256, nazev_ref_od = 256, skar_znak_spz = 2, ixb_aip = 12, ixs_zup_pod = 12, ixs_cer_c = 12, ixb_trans_logu = 12, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
	/**DBTABLE:Seznam*/
	interface GSpisskaDto extends Gordic.Spi.Interface.GSpisskaBaseDto {
		/**DBCOLUMN:Seznam.priz_pos_na*/
		priz_pos_na?: number|null;
		/**DBCOLUMN:Seznam.nazev_z*/
		nazev_z?: string|null;
		/**DBCOLUMN:Seznam.ixs_ulm_z*/
		ixs_ulm_z?: string|null;
		/**DBCOLUMN:Seznam.popis_z*/
		popis_z?: string|null;
		/**DBCOLUMN:Seznam.dat_vzniku_z*/
		dat_vzniku_z?: JsonDate|null;
		/**DBCOLUMN:Seznam.poznamka_z*/
		poznamka_z?: string|null;
		/**DBCOLUMN:Seznam.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:Seznam.rok_od_z*/
		rok_od_z?: number|null;
		/**DBCOLUMN:Seznam.rok_do_z*/
		rok_do_z?: number|null;
		/**DBCOLUMN:Seznam.nazev_add*/
		nazev_add?: string|null;
		/**DBCOLUMN:Seznam.priz_ske*/
		priz_ske?: number|null;
		/**DBCOLUMN:Seznam.priz_mimskr*/
		priz_mimskr?: number|null;
		/**DBCOLUMN:Seznam.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:Seznam.nazev_rf*/
		nazev_rf?: string|null;
	}
	const enum GSpisskaDtoNames { priz_pos_na = "priz_pos_na", nazev_z = "nazev_z", ixs_ulm_z = "ixs_ulm_z", popis_z = "popis_z", dat_vzniku_z = "dat_vzniku_z", poznamka_z = "poznamka_z", log_por_cislo = "log_por_cislo", rok_od_z = "rok_od_z", rok_do_z = "rok_do_z", nazev_add = "nazev_add", priz_ske = "priz_ske", priz_mimskr = "priz_mimskr", aktivita = "aktivita", nazev_rf = "nazev_rf", rok_spo_uda = "rok_spo_uda", spz_nazev = "spz_nazev", puv_skz = "puv_skz", pos_na_txt = "pos_na_txt", stav_sul_bal = "stav_sul_bal", stav_sul_bal_txt = "stav_sul_bal_txt", stav_ext_arch = "stav_ext_arch", stav_ext_arch_txt = "stav_ext_arch_txt", id_ext_arch = "id_ext_arch", priz_pos_na_txt = "priz_pos_na_txt", prevzato_od_su_txt = "prevzato_od_su_txt", prevzato_od_su_txt_tooltip = "prevzato_od_su_txt_tooltip", ixs_fun_od = "ixs_fun_od", stav_sip = "stav_sip", dat_gen_sip = "dat_gen_sip", m_tisk = "m_tisk", m_zup = "m_zup", puv_skar_znak = "puv_skar_znak", s_ele_dok = "s_ele_dok", s_fyz_dok = "s_fyz_dok", id_skartriz_nda = "id_skartriz_nda", poradi_add = "poradi_add", rok_uzav_add = "rok_uzav_add", popis_ulm_add = "popis_ulm_add", ixs_spis = "ixs_spis", priz_zup = "priz_zup", ixs_fun = "ixs_fun", dat_uzav = "dat_uzav", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", stav_spi = "stav_spi", stav_spi_txt = "stav_spi_txt", por_cislo_add = "por_cislo_add", info_text = "info_text", rok_kon_spu = "rok_kon_spu", ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", pocet_j = "pocet_j", priz_skn = "priz_skn", priz_skn_txt = "priz_skn_txt", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_znak_nazev = "spis_znak_nazev", kod_tyz_txt = "kod_tyz_txt", popis = "popis", znacka_zup = "znacka_zup", prevzato_od_txt = "prevzato_od_txt", prevzal_txt = "prevzal_txt", rok_skartace_new = "rok_skartace_new", kubatura = "kubatura", ixs_su_od = "ixs_su_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", poz_skar = "poz_skar", vaha = "vaha", police = "police", paprsek = "paprsek", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_predani_spra_new = "rok_predani_spra_new", rok_od = "rok_od", rok_do = "rok_do", priz_rok_prep = "priz_rok_prep", priz_rok_sk_pre = "priz_rok_sk_pre", poc_krabic = "poc_krabic", pocet_listu = "pocet_listu", ixs_lpc = "ixs_lpc", pocet_pis_jed_txt_add = "pocet_pis_jed_txt_add", rozsah_add = "rozsah_add", rozsah_new_add = "rozsah_new_add", ixs_ska = "ixs_ska", nazev_ska = "nazev_ska", ukladaci_znacka = "ukladaci_znacka", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_ref_od = "nazev_ref_od", pocet_j_fyz = "pocet_j_fyz", pocet_pis_fyz = "pocet_pis_fyz", priz_poc_prep = "priz_poc_prep", priz_skzn_prep = "priz_skzn_prep", skar_znak_spz = "skar_znak_spz", skar_lhuta_spz = "skar_lhuta_spz", priz_skar = "priz_skar", ixb_aip = "ixb_aip", ixs_zup_pod = "ixs_zup_pod", priz_trans_log = "priz_trans_log", soubor = "soubor", ixs_cer_c = "ixs_cer_c", rok_od_do_add = "rok_od_do_add", dat_do = "dat_do", hash2 = "hash2", alg_h2 = "alg_h2", nazev_ref_akt = "nazev_ref_akt", nazev_spi_akt = "nazev_spi_akt", zkratka_nazev_spi_akt = "zkratka_nazev_spi_akt", jeVeSpisovne = "jeVeSpisovne", ixb_trans_logu = "ixb_trans_logu", ulmDto = "ulmDto", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSpisskaDtoFragments { priz_pos_na = "*", nazev_z = "*", ixs_ulm_z = "*", popis_z = "*", dat_vzniku_z = "*", poznamka_z = "*", log_por_cislo = "*", rok_od_z = "*", rok_do_z = "*", nazev_add = "*", priz_ske = "*", priz_mimskr = "*", aktivita = "*", nazev_rf = "*", rok_spo_uda = "*", spz_nazev = "*", puv_skz = "*", pos_na_txt = "*", stav_sul_bal = "*", stav_sul_bal_txt = "*", stav_ext_arch = "*", stav_ext_arch_txt = "*", id_ext_arch = "*", priz_pos_na_txt = "*", prevzato_od_su_txt = "*", prevzato_od_su_txt_tooltip = "*", ixs_fun_od = "*", stav_sip = "*", dat_gen_sip = "*", m_tisk = "*", m_zup = "*", puv_skar_znak = "*", s_ele_dok = "*", s_fyz_dok = "*", id_skartriz_nda = "*", poradi_add = "*", rok_uzav_add = "*", popis_ulm_add = "*", ixs_spis = "*", priz_zup = "*", ixs_fun = "*", dat_uzav = "*", stav_ext_spi = "*", id_ext_spi = "*", stav_spi = "*", stav_spi_txt = "*", por_cislo_add = "*", info_text = "*", rok_kon_spu = "*", ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", pocet_j = "*", priz_skn = "*", priz_skn_txt = "*", priz_vyp = "*", priz_vyp_txt = "*", kod_tyz = "*", typ_bal_add = "*", spis_znak_nazev = "*", kod_tyz_txt = "*", popis = "*", znacka_zup = "*", prevzato_od_txt = "*", prevzal_txt = "*", rok_skartace_new = "*", kubatura = "*", ixs_su_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", poz_skar = "*", vaha = "*", police = "*", paprsek = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_predani_spra_new = "*", rok_od = "*", rok_do = "*", priz_rok_prep = "*", priz_rok_sk_pre = "*", poc_krabic = "*", pocet_listu = "*", ixs_lpc = "*", pocet_pis_jed_txt_add = "*", rozsah_add = "*", rozsah_new_add = "*", ixs_ska = "*", nazev_ska = "*", ukladaci_znacka = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_ref_od = "*", pocet_j_fyz = "*", pocet_pis_fyz = "*", priz_poc_prep = "*", priz_skzn_prep = "*", skar_znak_spz = "*", skar_lhuta_spz = "*", priz_skar = "*", ixb_aip = "*", ixs_zup_pod = "*", priz_trans_log = "*", soubor = "*", ixs_cer_c = "*", rok_od_do_add = "*", dat_do = "*", hash2 = "*", alg_h2 = "*", nazev_ref_akt = "*", nazev_spi_akt = "*", zkratka_nazev_spi_akt = "*", jeVeSpisovne = "*", ixb_trans_logu = "*", ulmDto = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSpisskaDtoTypes { priz_pos_na = "number", nazev_z = "string", ixs_ulm_z = "string", popis_z = "string", dat_vzniku_z = "JsonDate", poznamka_z = "string", log_por_cislo = "number", rok_od_z = "number", rok_do_z = "number", nazev_add = "string", priz_ske = "number", priz_mimskr = "number", aktivita = "number", nazev_rf = "string", rok_spo_uda = "number", spz_nazev = "string", puv_skz = "string", pos_na_txt = "string", stav_sul_bal = "number", stav_sul_bal_txt = "string", stav_ext_arch = "number", stav_ext_arch_txt = "string", id_ext_arch = "string", priz_pos_na_txt = "string", prevzato_od_su_txt = "string", prevzato_od_su_txt_tooltip = "string", ixs_fun_od = "string", stav_sip = "string", dat_gen_sip = "JsonDate", m_tisk = "number", m_zup = "number", puv_skar_znak = "string", s_ele_dok = "number", s_fyz_dok = "number", id_skartriz_nda = "string", poradi_add = "string", rok_uzav_add = "number", popis_ulm_add = "string", ixs_spis = "string", priz_zup = "number", ixs_fun = "string", dat_uzav = "JsonDate", stav_ext_spi = "number", id_ext_spi = "string", stav_spi = "number", stav_spi_txt = "string", por_cislo_add = "string", info_text = "string", rok_kon_spu = "number", ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", pocet_j = "number", priz_skn = "number", priz_skn_txt = "string", priz_vyp = "number", priz_vyp_txt = "string", kod_tyz = "number", typ_bal_add = "number", spis_znak_nazev = "string", kod_tyz_txt = "string", popis = "string", znacka_zup = "string", prevzato_od_txt = "string", prevzal_txt = "string", rok_skartace_new = "number", kubatura = "JsonDecimal", ixs_su_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", poz_skar = "string", vaha = "JsonDecimal", police = "string", paprsek = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_predani_spra_new = "number", rok_od = "number", rok_do = "number", priz_rok_prep = "number", priz_rok_sk_pre = "number", poc_krabic = "number", pocet_listu = "number", ixs_lpc = "string", pocet_pis_jed_txt_add = "string", rozsah_add = "string", rozsah_new_add = "string", ixs_ska = "string", nazev_ska = "string", ukladaci_znacka = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_ref_od = "string", pocet_j_fyz = "number", pocet_pis_fyz = "number", priz_poc_prep = "number", priz_skzn_prep = "number", skar_znak_spz = "string", skar_lhuta_spz = "number", priz_skar = "number", ixb_aip = "string", ixs_zup_pod = "string", priz_trans_log = "number", soubor = "string", ixs_cer_c = "string", rok_od_do_add = "string", dat_do = "JsonDate", hash2 = "string", alg_h2 = "string", nazev_ref_akt = "string", nazev_spi_akt = "string", zkratka_nazev_spi_akt = "string", jeVeSpisovne = "boolean", ixb_trans_logu = "string", ulmDto = "Gordic.Spi.Interface.GSpisulmDto", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSpisskaDtoTypeLengths { nazev_add = 254, nazev_rf = 254, spz_nazev = 100, puv_skz = 2, pos_na_txt = 50, stav_sul_bal_txt = 50, stav_ext_arch_txt = 100, id_ext_arch = 50, priz_pos_na_txt = 100, ixs_fun_od = 12, puv_skar_znak = 2, id_skartriz_nda = 254, ixs_spis = 12, ixs_fun = 12, id_ext_spi = 50, stav_spi_txt = 50, por_cislo_add = 50, info_text = 150, ixs_ulm = 12, ixs_zup_nad = 12, spis_znak_nazev = 240, kod_tyz_txt = 50, popis = 100, znacka_zup = 30, ixs_su_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, poz_skar = 50, police = 20, paprsek = 20, ixs_zmp_od = 12, ixs_lpc = 12, pocet_pis_jed_txt_add = 20, rozsah_add = 20, rozsah_new_add = 20, ixs_ska = 12, nazev_ska = 50, ukladaci_znacka = 50, nazev_su_od = 256, nazev_fun_od = 256, nazev_ref_od = 256, skar_znak_spz = 2, ixb_aip = 12, ixs_zup_pod = 12, ixs_cer_c = 12, ixb_trans_logu = 12, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
	/**DBTABLE:Seznam*/
	interface GSpisulmBaseDto extends Gordic.Spi.Interface.GUmisteniDto {
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_2?: string|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_3?: string|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_4?: string|null;
		/**ID nadrizeneho ULM*/
		ixs_ulm_nad_5?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.uroven*/
		uroven?: number|null;
		/**DBCOLUMN:Seznam.uroven_pod*/
		uroven_pod?: number|null;
	}
	const enum GSpisulmBaseDtoNames { ixs_ulm_nad_2 = "ixs_ulm_nad_2", ixs_ulm_nad_3 = "ixs_ulm_nad_3", ixs_ulm_nad_4 = "ixs_ulm_nad_4", ixs_ulm_nad_5 = "ixs_ulm_nad_5", popis = "popis", uroven = "uroven", uroven_pod = "uroven_pod", ixs_ulm = "ixs_ulm", dat_zmena = "dat_zmena", mistnost_naz = "mistnost_naz", mistnost_kod = "mistnost_kod", segment_naz = "segment_naz", segment_kod = "segment_kod", aktivita = "aktivita", budova_naz = "budova_naz", budova_kod = "budova_kod",}
	const enum GSpisulmBaseDtoFragments { ixs_ulm_nad_2 = "*", ixs_ulm_nad_3 = "*", ixs_ulm_nad_4 = "*", ixs_ulm_nad_5 = "*", popis = "*", uroven = "*", uroven_pod = "*", ixs_ulm = "*", dat_zmena = "*", mistnost_naz = "*", mistnost_kod = "*", segment_naz = "*", segment_kod = "*", aktivita = "*", budova_naz = "*", budova_kod = "*",}
	const enum GSpisulmBaseDtoTypes { ixs_ulm_nad_2 = "string", ixs_ulm_nad_3 = "string", ixs_ulm_nad_4 = "string", ixs_ulm_nad_5 = "string", popis = "string", uroven = "number", uroven_pod = "number", ixs_ulm = "string", dat_zmena = "JsonDate", mistnost_naz = "string", mistnost_kod = "string", segment_naz = "string", segment_kod = "string", aktivita = "number", budova_naz = "string", budova_kod = "string",}
	const enum GSpisulmBaseDtoTypeLengths { popis = 50, ixs_ulm = 12, mistnost_naz = 50, mistnost_kod = 8, segment_naz = 50, segment_kod = 8, aktivita = 8, budova_naz = 50, budova_kod = 8,}
	/**DBTABLE:Seznam*/
	interface GSpisulmDto extends Gordic.Spi.Interface.GSpisulmBaseDto {
		/**DBCOLUMN:Seznam.kod_tyu*/
		kod_tyu?: number|null;
		/**DBCOLUMN:Seznam.priz_nad*/
		priz_nad?: number|null;
		/**DBCOLUMN:Seznam.paprsek*/
		paprsek?: string|null;
		/**DBCOLUMN:Seznam.police*/
		police?: string|null;
		/**DBCOLUMN:Seznam.bm*/
		bm?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kubatura*/
		kubatura?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nosnost*/
		nosnost?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.vlhkost*/
		vlhkost?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_plne*/
		bm_plne?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kubatura_plne*/
		kubatura_plne?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.ixs_spi*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun*/
		ixs_fun?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.nosnost_plne*/
		nosnost_plne?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_c*/
		bm_c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kubatura_c*/
		kubatura_c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nosnost_c*/
		nosnost_c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_plne_c*/
		bm_plne_c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kubatura_plne_c*/
		kubatura_plne_c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nosnost_plne_c*/
		nosnost_plne_c?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_p*/
		bm_p?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kubatura_p*/
		kubatura_p?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nosnost_p*/
		nosnost_p?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_plne_p*/
		bm_plne_p?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kubatura_plne_p*/
		kubatura_plne_p?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.nosnost_plne_p*/
		nosnost_plne_p?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kapacita_krabic*/
		kapacita_krabic?: number|null;
		/**DBCOLUMN:Seznam.ico*/
		ico?: string|null;
		/**DBCOLUMN:Seznam.nazev_zmenu_prov_add*/
		nazev_zmenu_prov_add?: string|null;
		/**DBCOLUMN:Seznam.budova_segment_mistnost_add*/
		budova_segment_mistnost_add?: string|null;
		/**DBCOLUMN:Seznam.ixs_ulm_nad*/
		ixs_ulm_nad?: string|null;
		/**DBCOLUMN:Seznam.popis_nad*/
		popis_nad?: string|null;
	}
	const enum GSpisulmDtoNames { kod_tyu = "kod_tyu", priz_nad = "priz_nad", paprsek = "paprsek", police = "police", bm = "bm", kubatura = "kubatura", nosnost = "nosnost", vlhkost = "vlhkost", bm_plne = "bm_plne", kubatura_plne = "kubatura_plne", ixs_spi = "ixs_spi", ixs_fun = "ixs_fun", zmenu_prov = "zmenu_prov", nosnost_plne = "nosnost_plne", bm_c = "bm_c", kubatura_c = "kubatura_c", nosnost_c = "nosnost_c", bm_plne_c = "bm_plne_c", kubatura_plne_c = "kubatura_plne_c", nosnost_plne_c = "nosnost_plne_c", bm_p = "bm_p", kubatura_p = "kubatura_p", nosnost_p = "nosnost_p", bm_plne_p = "bm_plne_p", kubatura_plne_p = "kubatura_plne_p", nosnost_plne_p = "nosnost_plne_p", kapacita_krabic = "kapacita_krabic", ico = "ico", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", budova_segment_mistnost_add = "budova_segment_mistnost_add", ixs_ulm_nad = "ixs_ulm_nad", popis_nad = "popis_nad", ixs_ulm_nad_2 = "ixs_ulm_nad_2", ixs_ulm_nad_3 = "ixs_ulm_nad_3", ixs_ulm_nad_4 = "ixs_ulm_nad_4", ixs_ulm_nad_5 = "ixs_ulm_nad_5", popis = "popis", uroven = "uroven", uroven_pod = "uroven_pod", ixs_ulm = "ixs_ulm", dat_zmena = "dat_zmena", mistnost_naz = "mistnost_naz", mistnost_kod = "mistnost_kod", segment_naz = "segment_naz", segment_kod = "segment_kod", aktivita = "aktivita", budova_naz = "budova_naz", budova_kod = "budova_kod",}
	const enum GSpisulmDtoFragments { kod_tyu = "*", priz_nad = "*", paprsek = "*", police = "*", bm = "*", kubatura = "*", nosnost = "*", vlhkost = "*", bm_plne = "*", kubatura_plne = "*", ixs_spi = "*", ixs_fun = "*", zmenu_prov = "*", nosnost_plne = "*", bm_c = "*", kubatura_c = "*", nosnost_c = "*", bm_plne_c = "*", kubatura_plne_c = "*", nosnost_plne_c = "*", bm_p = "*", kubatura_p = "*", nosnost_p = "*", bm_plne_p = "*", kubatura_plne_p = "*", nosnost_plne_p = "*", kapacita_krabic = "*", ico = "*", nazev_zmenu_prov_add = "*", budova_segment_mistnost_add = "*", ixs_ulm_nad = "*", popis_nad = "*", ixs_ulm_nad_2 = "*", ixs_ulm_nad_3 = "*", ixs_ulm_nad_4 = "*", ixs_ulm_nad_5 = "*", popis = "*", uroven = "*", uroven_pod = "*", ixs_ulm = "*", dat_zmena = "*", mistnost_naz = "*", mistnost_kod = "*", segment_naz = "*", segment_kod = "*", aktivita = "*", budova_naz = "*", budova_kod = "*",}
	const enum GSpisulmDtoTypes { kod_tyu = "number", priz_nad = "number", paprsek = "string", police = "string", bm = "JsonDecimal", kubatura = "JsonDecimal", nosnost = "JsonDecimal", vlhkost = "JsonDecimal", bm_plne = "JsonDecimal", kubatura_plne = "JsonDecimal", ixs_spi = "string", ixs_fun = "string", zmenu_prov = "string", nosnost_plne = "JsonDecimal", bm_c = "JsonDecimal", kubatura_c = "JsonDecimal", nosnost_c = "JsonDecimal", bm_plne_c = "JsonDecimal", kubatura_plne_c = "JsonDecimal", nosnost_plne_c = "JsonDecimal", bm_p = "JsonDecimal", kubatura_p = "JsonDecimal", nosnost_p = "JsonDecimal", bm_plne_p = "JsonDecimal", kubatura_plne_p = "JsonDecimal", nosnost_plne_p = "JsonDecimal", kapacita_krabic = "number", ico = "string", nazev_zmenu_prov_add = "string", budova_segment_mistnost_add = "string", ixs_ulm_nad = "string", popis_nad = "string", ixs_ulm_nad_2 = "string", ixs_ulm_nad_3 = "string", ixs_ulm_nad_4 = "string", ixs_ulm_nad_5 = "string", popis = "string", uroven = "number", uroven_pod = "number", ixs_ulm = "string", dat_zmena = "JsonDate", mistnost_naz = "string", mistnost_kod = "string", segment_naz = "string", segment_kod = "string", aktivita = "number", budova_naz = "string", budova_kod = "string",}
	const enum GSpisulmDtoTypeLengths { paprsek = 20, police = 20, ixs_spi = 12, ixs_fun = 12, zmenu_prov = 12, ico = 10, nazev_zmenu_prov_add = 256, budova_segment_mistnost_add = 256, ixs_ulm_nad = 12, popis = 50, ixs_ulm = 12, mistnost_naz = 50, mistnost_kod = 8, segment_naz = 50, segment_kod = 8, aktivita = 8, budova_naz = 50, budova_kod = 8,}
	/**filtr k predani do spisovny*/
	interface GSpisovnaFilterDto {
		/**ixs spisovny*/
		IxsSpi?: string|null;
		/**ixs Su spisovny*/
		IxsSu?: string|null;
		/**ixs funkce spisovny*/
		IxsFunSpi?: string|null;
	}
	const enum GSpisovnaFilterDtoNames { IxsSpi = "IxsSpi", IxsSu = "IxsSu", IxsFunSpi = "IxsFunSpi",}
	const enum GSpisovnaFilterDtoFragments { IxsSpi = "*", IxsSu = "*", IxsFunSpi = "*",}
	const enum GSpisovnaFilterDtoTypes { IxsSpi = "string", IxsSu = "string", IxsFunSpi = "string",}
	const enum GSpisovnaFilterDtoTypeLengths {}
	/**filtr k predani do spisovny*/
	interface GSmazaneFilterDto extends Gordic.Wfl.Interface.GSeznamFilterBaseDto {
		/**typ entity*/
		TypEntity?: Gordic.Wfl.Interface.TypEntityDokSpis|null;
	}
	const enum GSmazaneFilterDtoNames { TypEntity = "TypEntity", Datum = "Datum", Vlastni = "Vlastni", PlnitTempTabulku = "PlnitTempTabulku", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSmazaneFilterDtoFragments { TypEntity = "*", Datum = "*", Vlastni = "*", PlnitTempTabulku = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSmazaneFilterDtoTypes { TypEntity = "Gordic.Wfl.Interface.TypEntityDokSpis", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", PlnitTempTabulku = "boolean", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSmazaneFilterDtoTypeLengths {}
	/**filtr k predani do spisovny*/
	interface GKontrolaPredPrevzetimFilterDto {
		pids?: string[]|null;
		/**ixs Su spisovny*/
		IxsZup?: string|null;
		/**uzavrit*/
		uzavrit?: boolean|null;
	}
	const enum GKontrolaPredPrevzetimFilterDtoNames { pids = "pids", IxsZup = "IxsZup", uzavrit = "uzavrit",}
	const enum GKontrolaPredPrevzetimFilterDtoFragments { pids = "*", IxsZup = "*", uzavrit = "*",}
	const enum GKontrolaPredPrevzetimFilterDtoTypes { pids = "string[]", IxsZup = "string", uzavrit = "boolean",}
	const enum GKontrolaPredPrevzetimFilterDtoTypeLengths {}
	/**filtr k predani do spisovny*/
	interface GkontrolaFormatuSouboruFilterDto {
		/**ixs spisovny*/
		IxsSpi?: string|null;
		/**ixs funkce spisovny*/
		IxsFunSpi?: string|null;
	}
	const enum GkontrolaFormatuSouboruFilterDtoNames { IxsSpi = "IxsSpi", IxsFunSpi = "IxsFunSpi",}
	const enum GkontrolaFormatuSouboruFilterDtoFragments { IxsSpi = "*", IxsFunSpi = "*",}
	const enum GkontrolaFormatuSouboruFilterDtoTypes { IxsSpi = "string", IxsFunSpi = "string",}
	const enum GkontrolaFormatuSouboruFilterDtoTypeLengths {}
	/**filtr k predani do spravniho archivu*/
	interface GProSpravniArchivFilterDto {
		/**Rok skartace*/
		RokPredani?: number|null;
		/**Vlastní*/
		Vlastni?: boolean|null;
		/**Filtr dle ULM*/
		FiltrDleULM?: boolean|null;
		/**ixs funkce spisovny*/
		UloznaMista?: string[]|null;
	}
	const enum GProSpravniArchivFilterDtoNames { RokPredani = "RokPredani", Vlastni = "Vlastni", FiltrDleULM = "FiltrDleULM", UloznaMista = "UloznaMista",}
	const enum GProSpravniArchivFilterDtoFragments { RokPredani = "*", Vlastni = "*", FiltrDleULM = "*", UloznaMista = "*",}
	const enum GProSpravniArchivFilterDtoTypes { RokPredani = "number", Vlastni = "boolean", FiltrDleULM = "boolean", UloznaMista = "string[]",}
	const enum GProSpravniArchivFilterDtoTypeLengths {}
	/**filtr k predani do spravniho archivu*/
	interface GGenerovaniSIPReguestDto {
		/**vybrané zázanamy*/
		Selected?: string[]|null;
		/**Typ rezimu prace*/
		TypRezimuPrace?: Gordic.Wfl.Interface.TypRezimuPraceSeznamu|null;
		/**Rok skartace*/
		TypIPBalicku?: Gordic.Wfl.Interface.TypGenerovanehoBalicku|null;
		/**Vlastní*/
		TypGenerovaniDlePrijemce?: Gordic.Wfl.Interface.TypGenerovanehoBalickuDlePrijemce|null;
		/**LogPorCislo*/
		LogPorCislo?: number|null;
		/**Je ve spisovne*/
		JeVeSpisovne?: boolean|null;
		/**Je ve spisovne*/
		UkladatSipDoSlozky?: boolean|null;
		/**cesta pro generovani*/
		Path?: string|null;
	}
	const enum GGenerovaniSIPReguestDtoNames { Selected = "Selected", TypRezimuPrace = "TypRezimuPrace", TypIPBalicku = "TypIPBalicku", TypGenerovaniDlePrijemce = "TypGenerovaniDlePrijemce", LogPorCislo = "LogPorCislo", JeVeSpisovne = "JeVeSpisovne", UkladatSipDoSlozky = "UkladatSipDoSlozky", Path = "Path",}
	const enum GGenerovaniSIPReguestDtoFragments { Selected = "*", TypRezimuPrace = "*", TypIPBalicku = "*", TypGenerovaniDlePrijemce = "*", LogPorCislo = "*", JeVeSpisovne = "*", UkladatSipDoSlozky = "*", Path = "*",}
	const enum GGenerovaniSIPReguestDtoTypes { Selected = "string[]", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", TypIPBalicku = "Gordic.Wfl.Interface.TypGenerovanehoBalicku", TypGenerovaniDlePrijemce = "Gordic.Wfl.Interface.TypGenerovanehoBalickuDlePrijemce", LogPorCislo = "number", JeVeSpisovne = "boolean", UkladatSipDoSlozky = "boolean", Path = "string",}
	const enum GGenerovaniSIPReguestDtoTypeLengths {}
	/**filtr k predani do spravniho archivu*/
	interface GGenerovaniSIPResponseDto extends Gordic.Wfl.Interface.GResponseBaseDto {
		/**cesta pro generovani*/
		Path?: string|null;
		/**název souboru a jeho cesty ke stažení*/
		FilePathZIP?: string|null;
		/**guid souboru prodowload*/
		FileGuid?: string|null;
		/**Celkem*/
		Celkem?: number|null;
		/**Provedeno*/
		Provedeno?: number|null;
		/**Neprovedeno*/
		Neprovedeno?: number|null;
	}
	const enum GGenerovaniSIPResponseDtoNames { Path = "Path", FilePathZIP = "FilePathZIP", FileGuid = "FileGuid", Celkem = "Celkem", Provedeno = "Provedeno", Neprovedeno = "Neprovedeno", ResultInfoList = "ResultInfoList", ResultInfo = "ResultInfo", OperationLabel = "OperationLabel",}
	const enum GGenerovaniSIPResponseDtoFragments { Path = "*", FilePathZIP = "*", FileGuid = "*", Celkem = "*", Provedeno = "*", Neprovedeno = "*", ResultInfoList = "*", ResultInfo = "*", OperationLabel = "*",}
	const enum GGenerovaniSIPResponseDtoTypes { Path = "string", FilePathZIP = "string", FileGuid = "string", Celkem = "number", Provedeno = "number", Neprovedeno = "number", ResultInfoList = "Gordic.Gin.Interface.GResultInfo[]", ResultInfo = "Gordic.Gin.Interface.GResultInfo", OperationLabel = "string",}
	const enum GGenerovaniSIPResponseDtoTypeLengths {}
	/**filtr k predani do spravniho archivu*/
	interface GMazaniMetadatReguestDto {
		/**vybrané zázanamy*/
		Selected?: string[]|null;
		/**Typ rezimu prace*/
		TypOperace?: Gordic.Spi.Interface.TypOperaceMazaniMetadat|null;
	}
	const enum GMazaniMetadatReguestDtoNames { Selected = "Selected", TypOperace = "TypOperace",}
	const enum GMazaniMetadatReguestDtoFragments { Selected = "*", TypOperace = "*",}
	const enum GMazaniMetadatReguestDtoTypes { Selected = "string[]", TypOperace = "Gordic.Spi.Interface.TypOperaceMazaniMetadat",}
	const enum GMazaniMetadatReguestDtoTypeLengths {}
	/**Vstupni dto pro serverovou async. ulohu*/
	interface GSpiAsyncTaskDto {
		ThrowException?: boolean|null;
		Count?: number|null;
	}
	const enum GSpiAsyncTaskDtoNames { ThrowException = "ThrowException", Count = "Count",}
	const enum GSpiAsyncTaskDtoFragments { ThrowException = "*", Count = "*",}
	const enum GSpiAsyncTaskDtoTypes { ThrowException = "boolean", Count = "number",}
	const enum GSpiAsyncTaskDtoTypeLengths {}
	/**filtr baliku*/
	interface GPrevzetiDoSpisovnyBaseDto extends Gordic.Wfl.Interface.GAsyncUniversalReguestDto {
		/**Ixs Su Predavajici*/
		IxsSuPredavajici?: string|null;
		/**Ixs Fun Predavajici*/
		IxsFunPredavajici?: string|null;
		/**IxsSpisovny ze ktere se přebírá*/
		IxsSpisovnyOd?: string|null;
		/**typ prevzeti*/
		TypPrevzeti?: Gordic.Spi.Interface.TypPrevzetiDoSpisovny|null;
		/**Id baliku do ketrého se prebira*/
		IxsBaliku?: string|null;
		/**Id baliku do ketrého se prebira*/
		IxsUmisteni?: string|null;
		/**prevzit pro mimoradnou skartaci*/
		PrevzitProMimSkartaci?: boolean|null;
		/**nacte pro cely spisovy uzel bez ohledu na funkci*/
		CelySU?: boolean|null;
	}
	const enum GPrevzetiDoSpisovnyBaseDtoNames { IxsSuPredavajici = "IxsSuPredavajici", IxsFunPredavajici = "IxsFunPredavajici", IxsSpisovnyOd = "IxsSpisovnyOd", TypPrevzeti = "TypPrevzeti", IxsBaliku = "IxsBaliku", IxsUmisteni = "IxsUmisteni", PrevzitProMimSkartaci = "PrevzitProMimSkartaci", CelySU = "CelySU", Selected = "Selected", logPorCislo = "logPorCislo", ikc = "ikc",}
	const enum GPrevzetiDoSpisovnyBaseDtoFragments { IxsSuPredavajici = "*", IxsFunPredavajici = "*", IxsSpisovnyOd = "*", TypPrevzeti = "*", IxsBaliku = "*", IxsUmisteni = "*", PrevzitProMimSkartaci = "*", CelySU = "*", Selected = "*", logPorCislo = "*", ikc = "*",}
	const enum GPrevzetiDoSpisovnyBaseDtoTypes { IxsSuPredavajici = "string", IxsFunPredavajici = "string", IxsSpisovnyOd = "string", TypPrevzeti = "Gordic.Spi.Interface.TypPrevzetiDoSpisovny", IxsBaliku = "string", IxsUmisteni = "string", PrevzitProMimSkartaci = "boolean", CelySU = "boolean", Selected = "string[]", logPorCislo = "number", ikc = "JsonDecimal",}
	const enum GPrevzetiDoSpisovnyBaseDtoTypeLengths {}
	/**filtr baliku*/
	interface GPrevzetiDoSpisovnyDto extends Gordic.Spi.Interface.GPrevzetiDoSpisovnyBaseDto {
		/**Ixs Su Predavajici*/
		Uzavrit?: boolean|null;
		/**Data posilana pri progressu*/
		Result?: Gordic.Gin.Interface.GResultInfo|null;
	}
	const enum GPrevzetiDoSpisovnyDtoNames { Uzavrit = "Uzavrit", Result = "Result", IxsSuPredavajici = "IxsSuPredavajici", IxsFunPredavajici = "IxsFunPredavajici", IxsSpisovnyOd = "IxsSpisovnyOd", TypPrevzeti = "TypPrevzeti", IxsBaliku = "IxsBaliku", IxsUmisteni = "IxsUmisteni", PrevzitProMimSkartaci = "PrevzitProMimSkartaci", CelySU = "CelySU", Selected = "Selected", logPorCislo = "logPorCislo", ikc = "ikc",}
	const enum GPrevzetiDoSpisovnyDtoFragments { Uzavrit = "*", Result = "*", IxsSuPredavajici = "*", IxsFunPredavajici = "*", IxsSpisovnyOd = "*", TypPrevzeti = "*", IxsBaliku = "*", IxsUmisteni = "*", PrevzitProMimSkartaci = "*", CelySU = "*", Selected = "*", logPorCislo = "*", ikc = "*",}
	const enum GPrevzetiDoSpisovnyDtoTypes { Uzavrit = "boolean", Result = "Gordic.Gin.Interface.GResultInfo", IxsSuPredavajici = "string", IxsFunPredavajici = "string", IxsSpisovnyOd = "string", TypPrevzeti = "Gordic.Spi.Interface.TypPrevzetiDoSpisovny", IxsBaliku = "string", IxsUmisteni = "string", PrevzitProMimSkartaci = "boolean", CelySU = "boolean", Selected = "string[]", logPorCislo = "number", ikc = "JsonDecimal",}
	const enum GPrevzetiDoSpisovnyDtoTypeLengths {}
	/**filtr baliku*/
	interface GPrevzetiDoSpisovnyResultDto extends Gordic.Spi.Interface.GPrevzetiDoSpisovnyBaseDto {
		/**Ixs Su Predavajici*/
		Uzavrit?: boolean|null;
	}
	const enum GPrevzetiDoSpisovnyResultDtoNames { Uzavrit = "Uzavrit", IxsSuPredavajici = "IxsSuPredavajici", IxsFunPredavajici = "IxsFunPredavajici", IxsSpisovnyOd = "IxsSpisovnyOd", TypPrevzeti = "TypPrevzeti", IxsBaliku = "IxsBaliku", IxsUmisteni = "IxsUmisteni", PrevzitProMimSkartaci = "PrevzitProMimSkartaci", CelySU = "CelySU", Selected = "Selected", logPorCislo = "logPorCislo", ikc = "ikc",}
	const enum GPrevzetiDoSpisovnyResultDtoFragments { Uzavrit = "*", IxsSuPredavajici = "*", IxsFunPredavajici = "*", IxsSpisovnyOd = "*", TypPrevzeti = "*", IxsBaliku = "*", IxsUmisteni = "*", PrevzitProMimSkartaci = "*", CelySU = "*", Selected = "*", logPorCislo = "*", ikc = "*",}
	const enum GPrevzetiDoSpisovnyResultDtoTypes { Uzavrit = "boolean", IxsSuPredavajici = "string", IxsFunPredavajici = "string", IxsSpisovnyOd = "string", TypPrevzeti = "Gordic.Spi.Interface.TypPrevzetiDoSpisovny", IxsBaliku = "string", IxsUmisteni = "string", PrevzitProMimSkartaci = "boolean", CelySU = "boolean", Selected = "string[]", logPorCislo = "number", ikc = "JsonDecimal",}
	const enum GPrevzetiDoSpisovnyResultDtoTypeLengths {}
	/**DBTABLE:Seznam*/
	interface GSpitdelDto extends Gordic.Spi.Interface.GDeleteFileDto {
		/**DBCOLUMN:Seznam.log_por_cislo*/
		log_por_cislo?: number|null;
		/**DBCOLUMN:Seznam.verze*/
		verze?: number|null;
		/**DBCOLUMN:Seznam.typ_duv_del_txt*/
		typ_duv_del_txt?: string|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.zmenu_prov_txt*/
		zmenu_prov_txt?: string|null;
		/**DBCOLUMN:Seznam.soubor*/
		soubor?: string|null;
		/**DBCOLUMN:Seznam.soubor_pri*/
		soubor_pri?: string|null;
		/**DBCOLUMN:Seznam.server_name*/
		server_name?: string|null;
		/**DBCOLUMN:Seznam.path_name*/
		path_name?: string|null;
		/**DBCOLUMN:Seznam.disk_name*/
		disk_name?: string|null;
		/**DBCOLUMN:Seznam.info*/
		info?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.ixp*/
		ixp?: string|null;
		/**DBCOLUMN:Seznam.ixb*/
		ixb?: string|null;
		/**DBCOLUMN:Seznam.m_vyber*/
		m_vyber?: number|null;
		/**DBCOLUMN:Seznam.m_err*/
		m_err?: string|null;
	}
	const enum GSpitdelDtoNames { log_por_cislo = "log_por_cislo", verze = "verze", typ_duv_del_txt = "typ_duv_del_txt", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zmenu_prov_txt = "zmenu_prov_txt", soubor = "soubor", soubor_pri = "soubor_pri", server_name = "server_name", path_name = "path_name", disk_name = "disk_name", info = "info", popis = "popis", ixp = "ixp", ixb = "ixb", m_vyber = "m_vyber", m_err = "m_err", ixs_ulo = "ixs_ulo", typ_duv_del = "typ_duv_del", typ_ag_del = "typ_ag_del", priz_del_ulo = "priz_del_ulo", txt_err = "txt_err",}
	const enum GSpitdelDtoFragments { log_por_cislo = "*", verze = "*", typ_duv_del_txt = "*", dat_zmena = "*", zmenu_prov = "*", zmenu_prov_txt = "*", soubor = "*", soubor_pri = "*", server_name = "*", path_name = "*", disk_name = "*", info = "*", popis = "*", ixp = "*", ixb = "*", m_vyber = "*", m_err = "*", ixs_ulo = "*", typ_duv_del = "*", typ_ag_del = "*", priz_del_ulo = "*", txt_err = "*",}
	const enum GSpitdelDtoTypes { log_por_cislo = "number", verze = "number", typ_duv_del_txt = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zmenu_prov_txt = "string", soubor = "string", soubor_pri = "string", server_name = "string", path_name = "string", disk_name = "string", info = "string", popis = "string", ixp = "string", ixb = "string", m_vyber = "number", m_err = "string", ixs_ulo = "string", typ_duv_del = "number", typ_ag_del = "number", priz_del_ulo = "number", txt_err = "string",}
	const enum GSpitdelDtoTypeLengths { zmenu_prov = 12, ixp = 12, ixb = 12, ixs_ulo = 12,}
	/**filtr prehledu souboru ke smazani*/
	interface GSouboryKeSmazaniFilterDto extends Gordic.Wfl.Interface.GSeznamFilterBaseDto {
		/**smazane*/
		Smazane?: boolean|null;
	}
	const enum GSouboryKeSmazaniFilterDtoNames { Smazane = "Smazane", Datum = "Datum", Vlastni = "Vlastni", PlnitTempTabulku = "PlnitTempTabulku", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSouboryKeSmazaniFilterDtoFragments { Smazane = "*", Datum = "*", Vlastni = "*", PlnitTempTabulku = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSouboryKeSmazaniFilterDtoTypes { Smazane = "boolean", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", PlnitTempTabulku = "boolean", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSouboryKeSmazaniFilterDtoTypeLengths {}
	/**filtr prehledu ve SPI baliku*/
	interface GSpiPrehledFilterDto extends Gordic.Wfl.Interface.GSeznamFilterBaseDto {
		/**Stav sul*/
		StavSul?: Gordic.Spi.Interface.SpicsulEnum|null;
		/**ixs spisovny*/
		IxsSpi?: string|null;
		/**ixs fun*/
		IxsFun?: string|null;
		/**Rok skartace*/
		RokSkartace?: number|null;
		/**Rok skartace*/
		JeVeSpisovne?: boolean|null;
		/**typ seznamu spi*/
		TypSeznamu?: Gordic.Spi.Interface.TypSeznamuSpisovny|null;
		/**typ prezimu práce*/
		TypDokSpisFiltr?: Gordic.Spi.Interface.TypDokSpis|null;
		/**predano ze spisovny*/
		ZeSpisovny?: boolean|null;
		/**Predavajici*/
		Referent?: Gordic.Wfl.Interface.GSuFunRefDto|null;
		/**Predavajici spisovna*/
		IxsSpiPredavajici?: string|null;
		/**ixs ulozného mista*/
		IxsUlm?: string|null;
		/**pouzit filtr dle datumua*/
		FiltrDleData?: boolean|null;
		/**Datum vzniku*/
		DatVzniku?: GIntervalDto<JsonDate>|null;
		/**vcetne vnorenych uloznych mist*/
		VcetneVnorenychULM?: boolean|null;
		/**sp.plan*/
		SpisPl?: string|null;
		/**sp.znak*/
		SpisZnak?: string|null;
		/**aktivita*/
		Aktivita?: Gordic.Spi.Interface.TypAktivity|null;
		/**je predavajicim spisovy uzel*/
		IsPredavajiciSU?: boolean|null;
		/**
		*     Rok kontroly spouštěcí události.
		*     
		*/
		RokKontrolySpousteciUdalosti?: number|null;
	}
	const enum GSpiPrehledFilterDtoNames { StavSul = "StavSul", IxsSpi = "IxsSpi", IxsFun = "IxsFun", RokSkartace = "RokSkartace", JeVeSpisovne = "JeVeSpisovne", TypSeznamu = "TypSeznamu", TypDokSpisFiltr = "TypDokSpisFiltr", ZeSpisovny = "ZeSpisovny", Referent = "Referent", IxsSpiPredavajici = "IxsSpiPredavajici", IxsUlm = "IxsUlm", FiltrDleData = "FiltrDleData", DatVzniku = "DatVzniku", VcetneVnorenychULM = "VcetneVnorenychULM", SpisPl = "SpisPl", SpisZnak = "SpisZnak", Aktivita = "Aktivita", IsPredavajiciSU = "IsPredavajiciSU", RokKontrolySpousteciUdalosti = "RokKontrolySpousteciUdalosti", Datum = "Datum", Vlastni = "Vlastni", PlnitTempTabulku = "PlnitTempTabulku", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSpiPrehledFilterDtoFragments { StavSul = "*", IxsSpi = "*", IxsFun = "*", RokSkartace = "*", JeVeSpisovne = "*", TypSeznamu = "*", TypDokSpisFiltr = "*", ZeSpisovny = "*", Referent = "*", IxsSpiPredavajici = "*", IxsUlm = "*", FiltrDleData = "*", DatVzniku = "*", VcetneVnorenychULM = "*", SpisPl = "*", SpisZnak = "*", Aktivita = "*", IsPredavajiciSU = "*", RokKontrolySpousteciUdalosti = "*", Datum = "*", Vlastni = "*", PlnitTempTabulku = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSpiPrehledFilterDtoTypes { StavSul = "Gordic.Spi.Interface.SpicsulEnum", IxsSpi = "string", IxsFun = "string", RokSkartace = "number", JeVeSpisovne = "boolean", TypSeznamu = "Gordic.Spi.Interface.TypSeznamuSpisovny", TypDokSpisFiltr = "Gordic.Spi.Interface.TypDokSpis", ZeSpisovny = "boolean", Referent = "Gordic.Wfl.Interface.GSuFunRefDto", IxsSpiPredavajici = "string", IxsUlm = "string", FiltrDleData = "boolean", DatVzniku = "GIntervalDto<JsonDate>", VcetneVnorenychULM = "boolean", SpisPl = "string", SpisZnak = "string", Aktivita = "Gordic.Spi.Interface.TypAktivity", IsPredavajiciSU = "boolean", RokKontrolySpousteciUdalosti = "number", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", PlnitTempTabulku = "boolean", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSpiPrehledFilterDtoTypeLengths { IxsFun = 12, IxsUlm = 12,}
	/**filtr prehledu ve SPI baliku*/
	interface GPrehledBalikyVDigitSpiFilterDto extends Gordic.Wfl.Interface.GSeznamFilterBaseDto {
		/**ixs spisovny*/
		IxsZupNad?: string|null;
	}
	const enum GPrehledBalikyVDigitSpiFilterDtoNames { IxsZupNad = "IxsZupNad", Datum = "Datum", Vlastni = "Vlastni", PlnitTempTabulku = "PlnitTempTabulku", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GPrehledBalikyVDigitSpiFilterDtoFragments { IxsZupNad = "*", Datum = "*", Vlastni = "*", PlnitTempTabulku = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GPrehledBalikyVDigitSpiFilterDtoTypes { IxsZupNad = "string", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", PlnitTempTabulku = "boolean", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GPrehledBalikyVDigitSpiFilterDtoTypeLengths {}
	/**rok DTO*/
	interface GRokDto {
		/**Rok*/
		Rok?: number|null;
	}
	const enum GRokDtoNames { Rok = "Rok",}
	const enum GRokDtoFragments { Rok = "*",}
	const enum GRokDtoTypes { Rok = "number",}
	const enum GRokDtoTypeLengths {}
	/**Ulozeni do Spisovny DTO*/
	interface GUlozeniDto {
		/**DBCOLUMN:Seznam.ixs_ulm*/
		ixs_ulm?: string|null;
		/**ixs aktualni spisovny*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.umisteni*/
		umisteni?: string|null;
		/**DBCOLUMN:Seznam.bm*/
		bm?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_pos*/
		bm_pos?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.kubatura*/
		kubatura?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.vaha*/
		vaha?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.police*/
		police?: string|null;
		/**DBCOLUMN:Seznam.paprsek*/
		paprsek?: string|null;
		/**DBCOLUMN:Seznam.rezim*/
		rezim?: number|null;
	}
	const enum GUlozeniDtoNames { ixs_ulm = "ixs_ulm", ixs_spi = "ixs_spi", umisteni = "umisteni", bm = "bm", bm_pos = "bm_pos", kubatura = "kubatura", vaha = "vaha", police = "police", paprsek = "paprsek", rezim = "rezim",}
	const enum GUlozeniDtoFragments { ixs_ulm = "*", ixs_spi = "*", umisteni = "*", bm = "*", bm_pos = "*", kubatura = "*", vaha = "*", police = "*", paprsek = "*", rezim = "*",}
	const enum GUlozeniDtoTypes { ixs_ulm = "string", ixs_spi = "string", umisteni = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", kubatura = "JsonDecimal", vaha = "JsonDecimal", police = "string", paprsek = "string", rezim = "number",}
	const enum GUlozeniDtoTypeLengths { ixs_ulm = 12, ixs_spi = 12, umisteni = 100, police = 20, paprsek = 20,}
	/**umisteni (budova atd.)*/
	interface GUmisteniDto extends Gordic.Spi.Interface.GUmisteniBaseDto {
		/**DBCOLUMN:Seznam.ixs_ulm*/
		ixs_ulm?: string|null;
		/**dat_zmena*/
		dat_zmena?: JsonDate|null;
	}
	const enum GUmisteniDtoNames { ixs_ulm = "ixs_ulm", dat_zmena = "dat_zmena", mistnost_naz = "mistnost_naz", mistnost_kod = "mistnost_kod", segment_naz = "segment_naz", segment_kod = "segment_kod", aktivita = "aktivita", budova_naz = "budova_naz", budova_kod = "budova_kod",}
	const enum GUmisteniDtoFragments { ixs_ulm = "*", dat_zmena = "*", mistnost_naz = "*", mistnost_kod = "*", segment_naz = "*", segment_kod = "*", aktivita = "*", budova_naz = "*", budova_kod = "*",}
	const enum GUmisteniDtoTypes { ixs_ulm = "string", dat_zmena = "JsonDate", mistnost_naz = "string", mistnost_kod = "string", segment_naz = "string", segment_kod = "string", aktivita = "number", budova_naz = "string", budova_kod = "string",}
	const enum GUmisteniDtoTypeLengths { ixs_ulm = 12, mistnost_naz = 50, mistnost_kod = 8, segment_naz = 50, segment_kod = 8, aktivita = 8, budova_naz = 50, budova_kod = 8,}
	/**filtr baliku*/
	interface GPropocetRokuSkartaceFilterDto extends Gordic.Wfl.Interface.GSeznamFilterBaseDto {
		/**zobrazit i baliky ve skart navrzich*/
		IBalikyVeSkartNavrzich?: boolean|null;
	}
	const enum GPropocetRokuSkartaceFilterDtoNames { IBalikyVeSkartNavrzich = "IBalikyVeSkartNavrzich", Datum = "Datum", Vlastni = "Vlastni", PlnitTempTabulku = "PlnitTempTabulku", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GPropocetRokuSkartaceFilterDtoFragments { IBalikyVeSkartNavrzich = "*", Datum = "*", Vlastni = "*", PlnitTempTabulku = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GPropocetRokuSkartaceFilterDtoTypes { IBalikyVeSkartNavrzich = "boolean", Datum = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", PlnitTempTabulku = "boolean", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GPropocetRokuSkartaceFilterDtoTypeLengths {}
	/**struktura pro operace nad seznammy*/
	interface GDokSpisVBalikuDto extends Gordic.Wfl.Interface.GListOperationDto {
		ixp?: string|null;
		ixs_zup?: string|null;
	}
	const enum GDokSpisVBalikuDtoNames { ixp = "ixp", ixs_zup = "ixs_zup", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", dat_zmena = "dat_zmena", IxsEntity = "IxsEntity",}
	const enum GDokSpisVBalikuDtoFragments { ixp = "*", ixs_zup = "*", IDPrimaryKeyGriduGenerated = "*", dat_zmena = "*", IxsEntity = "*",}
	const enum GDokSpisVBalikuDtoTypes { ixp = "string", ixs_zup = "string", IDPrimaryKeyGriduGenerated = "string", dat_zmena = "JsonDate", IxsEntity = "string",}
	const enum GDokSpisVBalikuDtoTypeLengths { ixp = 12, ixs_zup = 12,}
	/**struktura pro operace nad seznammy*/
	interface GDokSpisProDigitSpiDto {
		/**typ seznamu*/
		typ?: Gordic.Spi.Interface.TypSeznamuProDigitalniSpisovnu|null;
		ixs_zup?: string|null;
		/**dat_prij_spi*/
		dat_prij_spi?: GIntervalDto<JsonDate>|null;
		/**dat_prij_spi*/
		dat_vyriz?: GIntervalDto<JsonDate>|null;
		/**spisovy plan*/
		spis_pl?: string|null;
		/**spisovy znak*/
		spis_znak?: string|null;
		/**ixs_su_od*/
		ixs_su_od?: string|null;
		/**ixs_zmp_od*/
		ixs_zmp_od?: string|null;
	}
	const enum GDokSpisProDigitSpiDtoNames { typ = "typ", ixs_zup = "ixs_zup", dat_prij_spi = "dat_prij_spi", dat_vyriz = "dat_vyriz", spis_pl = "spis_pl", spis_znak = "spis_znak", ixs_su_od = "ixs_su_od", ixs_zmp_od = "ixs_zmp_od",}
	const enum GDokSpisProDigitSpiDtoFragments { typ = "*", ixs_zup = "*", dat_prij_spi = "*", dat_vyriz = "*", spis_pl = "*", spis_znak = "*", ixs_su_od = "*", ixs_zmp_od = "*",}
	const enum GDokSpisProDigitSpiDtoTypes { typ = "Gordic.Spi.Interface.TypSeznamuProDigitalniSpisovnu", ixs_zup = "string", dat_prij_spi = "GIntervalDto<JsonDate>", dat_vyriz = "GIntervalDto<JsonDate>", spis_pl = "string", spis_znak = "string", ixs_su_od = "string", ixs_zmp_od = "string",}
	const enum GDokSpisProDigitSpiDtoTypeLengths { ixs_zup = 12, ixs_su_od = 12, ixs_zmp_od = 12,}
	/**struktura pro operace nad seznammy*/
	interface GEntitaKVypujceniDto {
		ixp?: string|null;
		ixs_zup?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**s_fyz*/
		s_fyz?: number|null;
		/**s_ele*/
		s_ele?: number|null;
		/**priz_spis*/
		priz_spis?: number|null;
		/**typ entity*/
		priz_obj?: number|null;
	}
	const enum GEntitaKVypujceniDtoNames { ixp = "ixp", ixs_zup = "ixs_zup", dat_zmena = "dat_zmena", s_fyz = "s_fyz", s_ele = "s_ele", priz_spis = "priz_spis", priz_obj = "priz_obj",}
	const enum GEntitaKVypujceniDtoFragments { ixp = "*", ixs_zup = "*", dat_zmena = "*", s_fyz = "*", s_ele = "*", priz_spis = "*", priz_obj = "*",}
	const enum GEntitaKVypujceniDtoTypes { ixp = "string", ixs_zup = "string", dat_zmena = "JsonDate", s_fyz = "number", s_ele = "number", priz_spis = "number", priz_obj = "number",}
	const enum GEntitaKVypujceniDtoTypeLengths { ixp = 12, ixs_zup = 12,}
	/**struktura pro operace nad seznammy*/
	interface GVypujceniWorkDto {
		ixs_vyl?: string|null;
		/**priz_vyp*/
		priz_vyp?: number|null;
	}
	const enum GVypujceniWorkDtoNames { ixs_vyl = "ixs_vyl", priz_vyp = "priz_vyp",}
	const enum GVypujceniWorkDtoFragments { ixs_vyl = "*", priz_vyp = "*",}
	const enum GVypujceniWorkDtoTypes { ixs_vyl = "string", priz_vyp = "number",}
	const enum GVypujceniWorkDtoTypeLengths {}
	/**struktura pro operace nad seznammy ke smazani*/
	interface GDokSpisKeSmazaniDto {
		ixp?: string|null;
		/**datum změny*/
		dat_zmena?: JsonDate|null;
		/**typ duvodu mazani*/
		typ_duv_del?: number|null;
		/**stav sul*/
		stav_sul?: number|null;
		/**stav*/
		status_pis?: number|null;
		priz_neevid?: number|null;
		priz_spis?: number|null;
		/**ixp spisovny*/
		ixs_spi?: string|null;
	}
	const enum GDokSpisKeSmazaniDtoNames { ixp = "ixp", dat_zmena = "dat_zmena", typ_duv_del = "typ_duv_del", stav_sul = "stav_sul", status_pis = "status_pis", priz_neevid = "priz_neevid", priz_spis = "priz_spis", ixs_spi = "ixs_spi",}
	const enum GDokSpisKeSmazaniDtoFragments { ixp = "*", dat_zmena = "*", typ_duv_del = "*", stav_sul = "*", status_pis = "*", priz_neevid = "*", priz_spis = "*", ixs_spi = "*",}
	const enum GDokSpisKeSmazaniDtoTypes { ixp = "string", dat_zmena = "JsonDate", typ_duv_del = "number", stav_sul = "number", status_pis = "number", priz_neevid = "number", priz_spis = "number", ixs_spi = "string",}
	const enum GDokSpisKeSmazaniDtoTypeLengths {}
	/**GSpisskr Dto*/
	interface GSpisskrDto {
		/**DBCOLUMN:Seznam.ixb_nda_4*/
		ixb_nda_4?: string|null;
		/**DBCOLUMN:Seznam.id_seznamu*/
		id_seznamu?: string|null;
		/**DBCOLUMN:Seznam.id_archivu*/
		id_archivu?: string|null;
		/**DBCOLUMN:Seznam.id_puvodce*/
		id_puvodce?: string|null;
		/**DBCOLUMN:Seznam.id_skart_riz NDA*/
		id_skart_riz?: string|null;
		/**DBCOLUMN:Seznam.id_prejimky*/
		id_prejimky?: string|null;
		/**DBCOLUMN:Seznam.dat_vytvoreni*/
		dat_vytvoreni?: JsonDate|null;
	}
	const enum GSpisskrDtoNames { ixb_nda_4 = "ixb_nda_4", id_seznamu = "id_seznamu", id_archivu = "id_archivu", id_puvodce = "id_puvodce", id_skart_riz = "id_skart_riz", id_prejimky = "id_prejimky", dat_vytvoreni = "dat_vytvoreni",}
	const enum GSpisskrDtoFragments { ixb_nda_4 = "*", id_seznamu = "*", id_archivu = "*", id_puvodce = "*", id_skart_riz = "*", id_prejimky = "*", dat_vytvoreni = "*",}
	const enum GSpisskrDtoTypes { ixb_nda_4 = "string", id_seznamu = "string", id_archivu = "string", id_puvodce = "string", id_skart_riz = "string", id_prejimky = "string", dat_vytvoreni = "JsonDate",}
	const enum GSpisskrDtoTypeLengths { ixb_nda_4 = 12, id_seznamu = 254, id_archivu = 254, id_puvodce = 254, id_skart_riz = 254, id_prejimky = 254,}
	/**DBTABLE:GSpiddav*/
	interface GSpiddavDto {
		/**DBCOLUMN:GSpiddav.ixs_ext*/
		ixs_ext?: string|null;
		/**DBCOLUMN:GSpiddav.por_cislo_d*/
		por_cislo_d?: number|null;
		/**DBCOLUMN:GSpiddav.por_cislo*/
		por_cislo?: number|null;
		/**DBCOLUMN:GSpiddav.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:GSpiddav.id_dms*/
		id_dms?: string|null;
		/**DBCOLUMN:GSpiddav.id_sip_ext*/
		id_sip_ext?: string|null;
		/**DBCOLUMN:GSpiddav.ixb_sip*/
		ixb_sip?: string|null;
		/**DBCOLUMN:GSpiddav.stav_sip*/
		stav_sip?: number|null;
		/**DBCOLUMN:GSpiddav.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:GSpiddav.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:GSpiddav.velikost*/
		velikost?: JsonDecimal|null;
		/**DBCOLUMN:GSpiddav.soubor_h*/
		soubor_h?: string|null;
		/**DBCOLUMN:GSpiddav.alg_h*/
		alg_h?: string|null;
		/**DBCOLUMN:GSpiddav.alg_h*/
		ixs_tre?: string|null;
	}
	const enum GSpiddavDtoNames { ixs_ext = "ixs_ext", por_cislo_d = "por_cislo_d", por_cislo = "por_cislo", nazev = "nazev", id_dms = "id_dms", id_sip_ext = "id_sip_ext", ixb_sip = "ixb_sip", stav_sip = "stav_sip", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", velikost = "velikost", soubor_h = "soubor_h", alg_h = "alg_h", ixs_tre = "ixs_tre",}
	const enum GSpiddavDtoFragments { ixs_ext = "*", por_cislo_d = "*", por_cislo = "*", nazev = "*", id_dms = "*", id_sip_ext = "*", ixb_sip = "*", stav_sip = "*", dat_zmena = "*", zmenu_prov = "*", velikost = "*", soubor_h = "*", alg_h = "*", ixs_tre = "*",}
	const enum GSpiddavDtoTypes { ixs_ext = "string", por_cislo_d = "number", por_cislo = "number", nazev = "string", id_dms = "string", id_sip_ext = "string", ixb_sip = "string", stav_sip = "number", dat_zmena = "JsonDate", zmenu_prov = "string", velikost = "JsonDecimal", soubor_h = "string", alg_h = "string", ixs_tre = "string",}
	const enum GSpiddavDtoTypeLengths { ixs_ext = 12, nazev = 254, id_dms = 254, id_sip_ext = 50, ixb_sip = 12, zmenu_prov = 12, soubor_h = 254, alg_h = 100, ixs_tre = 12,}
	/**DBTABLE:GSpiskab*/
	interface GSpiskabDto {
		/**DBCOLUMN:GSpiskab.ixb_aip*/
		ixb_aip?: string|null;
		/**DBCOLUMN:GSpiskab.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:GSpiskab.typ_konf*/
		typ_konf?: number|null;
		/**DBCOLUMN:GSpiskab.typ_kont*/
		typ_kont?: number|null;
		/**DBCOLUMN:GSpiskab.konflikt1*/
		konflikt?: string|null;
		/**DBCOLUMN:GSpiskab.konflikt1*/
		konflikt1?: string|null;
		/**DBCOLUMN:GSpiskab.konflikt2*/
		konflikt2?: string|null;
		/**DBCOLUMN:GSpiskab.konflikt3*/
		konflikt3?: string|null;
		/**DBCOLUMN:GSpiskab.konflikt4*/
		konflikt4?: string|null;
		/**DBCOLUMN:GSpiskab.pozice_chyby*/
		pozice_chyby?: string|null;
		/**DBCOLUMN:GSpiskab.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:GSpiskab.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:GSpiskab.typ_konf_txt*/
		typ_konf_txt?: string|null;
		/**DBCOLUMN:GSpiskab.typ_kont_txt*/
		typ_kont_txt?: string|null;
		ixb_aip_dat_zmena?: string|null;
	}
	const enum GSpiskabDtoNames { ixb_aip = "ixb_aip", ixs_zup = "ixs_zup", typ_konf = "typ_konf", typ_kont = "typ_kont", konflikt = "konflikt", konflikt1 = "konflikt1", konflikt2 = "konflikt2", konflikt3 = "konflikt3", konflikt4 = "konflikt4", pozice_chyby = "pozice_chyby", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_konf_txt = "typ_konf_txt", typ_kont_txt = "typ_kont_txt", ixb_aip_dat_zmena = "ixb_aip_dat_zmena",}
	const enum GSpiskabDtoFragments { ixb_aip = "*", ixs_zup = "*", typ_konf = "*", typ_kont = "*", konflikt = "*", konflikt1 = "*", konflikt2 = "*", konflikt3 = "*", konflikt4 = "*", pozice_chyby = "*", dat_zmena = "*", zmenu_prov = "*", typ_konf_txt = "*", typ_kont_txt = "*", ixb_aip_dat_zmena = "*",}
	const enum GSpiskabDtoTypes { ixb_aip = "string", ixs_zup = "string", typ_konf = "number", typ_kont = "number", konflikt = "string", konflikt1 = "string", konflikt2 = "string", konflikt3 = "string", konflikt4 = "string", pozice_chyby = "string", dat_zmena = "JsonDate", zmenu_prov = "string", typ_konf_txt = "string", typ_kont_txt = "string", ixb_aip_dat_zmena = "string",}
	const enum GSpiskabDtoTypeLengths { ixb_aip = 12, ixs_zup = 12, konflikt = 254, konflikt1 = 254, konflikt2 = 254, konflikt3 = 254, konflikt4 = 254, pozice_chyby = 254, zmenu_prov = 12,}
	/**DBTABLE:Seznam*/
	interface GHledaniBalikuPoleDto {
		/**DBCOLUMN:Seznam.ixs_zup*/
		ixs_zup?: string|null;
		/**DBCOLUMN:Seznam.ixs_ulm*/
		ixs_ulm?: string|null;
		/**DBCOLUMN:Seznam.ixs_zup_nad*/
		ixs_zup_nad?: string|null;
		/**DBCOLUMN:Seznam.priz_nad*/
		priz_nad?: number|null;
		/**DBCOLUMN:Seznam.pocet_pis*/
		pocet_pis?: number|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		stav_sul?: number|null;
		/**DBCOLUMN:Seznam.priz_skn*/
		priz_skn?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp*/
		priz_vyp?: number|null;
		/**DBCOLUMN:Seznam.kod_tyz*/
		kod_tyz?: number|null;
		/**DBCOLUMN:Seznam.typ_bal_add*/
		typ_bal_add?: number|null;
		/**DBCOLUMN:Seznam.spis_pl*/
		spis_pl?: string|null;
		/**DBCOLUMN:Seznam.spis_znak*/
		spis_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_znak*/
		skar_znak?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta*/
		skar_lhuta?: number|null;
		/**DBCOLUMN:Seznam.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:Seznam.popis*/
		popis?: string|null;
		/**DBCOLUMN:Seznam.vecVlozeneho*/
		vecVlozeneho?: string|null;
		/**DBCOLUMN:Seznam.vecPodrobneVlozenoho*/
		vecPodrobneVlozenoho?: string|null;
		/**DBCOLUMN:Seznam.rok_skartace*/
		rok_skartace?: number|null;
		/**DBCOLUMN:Seznam.kubatura*/
		kubatura?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.umisteni*/
		umisteni?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_od*/
		ixs_su_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_od*/
		ixs_fun_od?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_do*/
		ixs_spi_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do*/
		ixs_fun_do?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_akt*/
		ixs_spi_akt?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_akt*/
		ixs_su_akt?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:Seznam.dat_skartace*/
		dat_skartace?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_vzniku*/
		dat_vzniku?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uloz_spi*/
		dat_uloz_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		dat_prij_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:Seznam.zmenu_prov*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:Seznam.police*/
		police?: string|null;
		/**DBCOLUMN:Seznam.paprsek*/
		paprsek?: string|null;
		/**DBCOLUMN:Seznam.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**DBCOLUMN:Seznam.rok_predani_spra*/
		rok_predani_spra?: number|null;
		/**DBCOLUMN:Seznam.rok_od*/
		rok_od?: number|null;
		/**DBCOLUMN:Seznam.rok_do*/
		rok_do?: number|null;
		/**DBCOLUMN:Seznam.id_ext_spi*/
		id_ext_spi?: string|null;
		/**DBCOLUMN:Seznam.budova_kod*/
		budova_kod?: string|null;
		/**DBCOLUMN:Seznam.segment_kod*/
		segment_kod?: string|null;
		/**DBCOLUMN:Seznam.mistnost_kod*/
		mistnost_kod?: string|null;
		/**DBCOLUMN:Seznam.case_sensitive*/
		case_sensitive?: boolean|null;
	}
	const enum GHledaniBalikuPoleDtoNames { ixs_zup = "ixs_zup", ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", stav_sul = "stav_sul", priz_skn = "priz_skn", priz_vyp = "priz_vyp", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", nazev = "nazev", popis = "popis", vecVlozeneho = "vecVlozeneho", vecPodrobneVlozenoho = "vecPodrobneVlozenoho", rok_skartace = "rok_skartace", kubatura = "kubatura", umisteni = "umisteni", ixs_su_od = "ixs_su_od", ixs_fun_od = "ixs_fun_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", ixs_su_akt = "ixs_su_akt", ixs_fun_akt = "ixs_fun_akt", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", dat_prij_spi = "dat_prij_spi", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", police = "police", paprsek = "paprsek", poznamka = "poznamka", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_od = "rok_od", rok_do = "rok_do", id_ext_spi = "id_ext_spi", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", case_sensitive = "case_sensitive",}
	const enum GHledaniBalikuPoleDtoFragments { ixs_zup = "*", ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", stav_sul = "*", priz_skn = "*", priz_vyp = "*", kod_tyz = "*", typ_bal_add = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", nazev = "*", popis = "*", vecVlozeneho = "*", vecPodrobneVlozenoho = "*", rok_skartace = "*", kubatura = "*", umisteni = "*", ixs_su_od = "*", ixs_fun_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", ixs_su_akt = "*", ixs_fun_akt = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", dat_prij_spi = "*", dat_zmena = "*", zmenu_prov = "*", police = "*", paprsek = "*", poznamka = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_od = "*", rok_do = "*", id_ext_spi = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", case_sensitive = "*",}
	const enum GHledaniBalikuPoleDtoTypes { ixs_zup = "string", ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", stav_sul = "number", priz_skn = "number", priz_vyp = "number", kod_tyz = "number", typ_bal_add = "number", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", nazev = "string", popis = "string", vecVlozeneho = "string", vecPodrobneVlozenoho = "string", rok_skartace = "number", kubatura = "JsonDecimal", umisteni = "string", ixs_su_od = "string", ixs_fun_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", ixs_su_akt = "string", ixs_fun_akt = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", dat_prij_spi = "JsonDate", dat_zmena = "JsonDate", zmenu_prov = "string", police = "string", paprsek = "string", poznamka = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_od = "number", rok_do = "number", id_ext_spi = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", case_sensitive = "boolean",}
	const enum GHledaniBalikuPoleDtoTypeLengths { ixs_zup = 12, ixs_ulm = 12, ixs_zup_nad = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, nazev = 100, popis = 100, vecVlozeneho = 100, vecPodrobneVlozenoho = 100, umisteni = 100, ixs_su_od = 12, ixs_fun_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, ixs_su_akt = 12, ixs_fun_akt = 12, zmenu_prov = 12, police = 20, paprsek = 20, poznamka = 50, ixs_zmp_od = 12, id_ext_spi = 50, budova_kod = 8, segment_kod = 8, mistnost_kod = 8,}
	/**DBTABLE:Seznam*/
	interface GSpitskeDto extends Gordic.Spi.Interface.GSpisskaDto {
		/**DBCOLUMN:Seznam.ikc*/
		ikc?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.od_txt*/
		od_txt?: string|null;
		/**DBCOLUMN:Seznam.su_od_txt*/
		su_od_txt?: string|null;
		/**DBCOLUMN:Seznam.su_od_txt_t*/
		su_od_txt_t?: string|null;
		/**DBCOLUMN:Seznam.fun_akt*/
		fun_akt?: string|null;
		/**DBCOLUMN:Seznam.spi_zkratka*/
		spi_zkratka?: string|null;
		/**DBCOLUMN:Seznam.stav_ext_txt*/
		stav_ext_txt?: string|null;
		/**DBCOLUMN:Seznam.pocet_pis_z*/
		pocet_pis_z?: number|null;
		/**DBCOLUMN:Seznam.pocet_j_z*/
		pocet_j_z?: number|null;
		/**DBCOLUMN:Seznam.rok_spo_uda_z*/
		rok_spo_uda_z?: number|null;
		/**DBCOLUMN:Seznam.rok_skartace_z*/
		rok_skartace_z?: number|null;
		/**DBCOLUMN:Seznam.stav_sul_z*/
		stav_sul_z?: number|null;
		/**DBCOLUMN:Seznam.priz_vyp_z*/
		priz_vyp_z?: number|null;
		/**DBCOLUMN:Seznam.priz_skn_z*/
		priz_skn_z?: number|null;
		/**identifikace zda je ve skartačním řízení celý balík.*/
		priz_cely_zup?: number|null;
		/**DBCOLUMN:Seznam.kod_tyz_z*/
		kod_tyz_z?: number|null;
		/**DBCOLUMN:Seznam.spis_pl_z*/
		spis_pl_z?: string|null;
		/**DBCOLUMN:Seznam.spis_znak_z*/
		spis_znak_z?: string|null;
		/**DBCOLUMN:Seznam.skar_znak_z*/
		skar_znak_z?: string|null;
		/**DBCOLUMN:Seznam.skar_lhuta_z*/
		skar_lhuta_z?: number|null;
		/**DBCOLUMN:Seznam.spz_nazev_z*/
		spz_nazev_z?: string|null;
		/**DBCOLUMN:Seznam.bm_z*/
		bm_z?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.bm_pos_z*/
		bm_pos_z?: JsonDecimal|null;
		/**DBCOLUMN:Seznam.umisteni_z*/
		umisteni_z?: string|null;
		/**DBCOLUMN:Seznam.ixs_su_od_z*/
		ixs_su_od_z?: string|null;
		/**DBCOLUMN:Seznam.ixs_zmp_od_z*/
		ixs_zmp_od_z?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_do_z*/
		ixs_spi_do_z?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_do_z*/
		ixs_fun_do_z?: string|null;
		/**DBCOLUMN:Seznam.ixs_spi_akt_z*/
		ixs_spi_akt_z?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_akt_z*/
		ixs_fun_akt_z?: string|null;
		/**DBCOLUMN:Seznam.poz_skar_z*/
		poz_skar_z?: string|null;
		/**DBCOLUMN:Seznam.dat_skar_z*/
		dat_skar_z?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uloz_spi_z*/
		dat_uloz_spi_z?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_zmena_z*/
		dat_zmena_z?: JsonDate|null;
		/**DBCOLUMN:Seznam.s_fyz_z*/
		s_fyz_z?: number|null;
		/**DBCOLUMN:Seznam.s_ele_z*/
		s_ele_z?: number|null;
		/**DBCOLUMN:Seznam.puv_skz_z*/
		puv_skz_z?: string|null;
		/**DBCOLUMN:Seznam.priz_pos_na_z*/
		priz_pos_na_z?: number|null;
		/**DBCOLUMN:Seznam.pos_na_txt_z*/
		pos_na_txt_z?: string|null;
		/**DBCOLUMN:Seznam.od_txt_z*/
		od_txt_z?: string|null;
		/**DBCOLUMN:Seznam.su_od_txt_z*/
		su_od_txt_z?: string|null;
		/**DBCOLUMN:Seznam.su_od_txt_t_z*/
		su_od_txt_t_z?: string|null;
		/**DBCOLUMN:Seznam.fun_akt_z*/
		fun_akt_z?: string|null;
		/**DBCOLUMN:Seznam.spi_zkratka_z*/
		spi_zkratka_z?: string|null;
		/**DBCOLUMN:Seznam.poc_krabic_z*/
		poc_krabic_z?: number|null;
		/**DBCOLUMN:Seznam.ixs_vsk_z*/
		ixs_vsk_z?: string|null;
	}
	const enum GSpitskeDtoNames { ikc = "ikc", od_txt = "od_txt", su_od_txt = "su_od_txt", su_od_txt_t = "su_od_txt_t", fun_akt = "fun_akt", spi_zkratka = "spi_zkratka", stav_ext_txt = "stav_ext_txt", pocet_pis_z = "pocet_pis_z", pocet_j_z = "pocet_j_z", rok_spo_uda_z = "rok_spo_uda_z", rok_skartace_z = "rok_skartace_z", stav_sul_z = "stav_sul_z", priz_vyp_z = "priz_vyp_z", priz_skn_z = "priz_skn_z", priz_cely_zup = "priz_cely_zup", kod_tyz_z = "kod_tyz_z", spis_pl_z = "spis_pl_z", spis_znak_z = "spis_znak_z", skar_znak_z = "skar_znak_z", skar_lhuta_z = "skar_lhuta_z", spz_nazev_z = "spz_nazev_z", bm_z = "bm_z", bm_pos_z = "bm_pos_z", umisteni_z = "umisteni_z", ixs_su_od_z = "ixs_su_od_z", ixs_zmp_od_z = "ixs_zmp_od_z", ixs_spi_do_z = "ixs_spi_do_z", ixs_fun_do_z = "ixs_fun_do_z", ixs_spi_akt_z = "ixs_spi_akt_z", ixs_fun_akt_z = "ixs_fun_akt_z", poz_skar_z = "poz_skar_z", dat_skar_z = "dat_skar_z", dat_uloz_spi_z = "dat_uloz_spi_z", dat_zmena_z = "dat_zmena_z", s_fyz_z = "s_fyz_z", s_ele_z = "s_ele_z", puv_skz_z = "puv_skz_z", priz_pos_na_z = "priz_pos_na_z", pos_na_txt_z = "pos_na_txt_z", od_txt_z = "od_txt_z", su_od_txt_z = "su_od_txt_z", su_od_txt_t_z = "su_od_txt_t_z", fun_akt_z = "fun_akt_z", spi_zkratka_z = "spi_zkratka_z", poc_krabic_z = "poc_krabic_z", ixs_vsk_z = "ixs_vsk_z", priz_pos_na = "priz_pos_na", nazev_z = "nazev_z", ixs_ulm_z = "ixs_ulm_z", popis_z = "popis_z", dat_vzniku_z = "dat_vzniku_z", poznamka_z = "poznamka_z", log_por_cislo = "log_por_cislo", rok_od_z = "rok_od_z", rok_do_z = "rok_do_z", nazev_add = "nazev_add", priz_ske = "priz_ske", priz_mimskr = "priz_mimskr", aktivita = "aktivita", nazev_rf = "nazev_rf", rok_spo_uda = "rok_spo_uda", spz_nazev = "spz_nazev", puv_skz = "puv_skz", pos_na_txt = "pos_na_txt", stav_sul_bal = "stav_sul_bal", stav_sul_bal_txt = "stav_sul_bal_txt", stav_ext_arch = "stav_ext_arch", stav_ext_arch_txt = "stav_ext_arch_txt", id_ext_arch = "id_ext_arch", priz_pos_na_txt = "priz_pos_na_txt", prevzato_od_su_txt = "prevzato_od_su_txt", prevzato_od_su_txt_tooltip = "prevzato_od_su_txt_tooltip", ixs_fun_od = "ixs_fun_od", stav_sip = "stav_sip", dat_gen_sip = "dat_gen_sip", m_tisk = "m_tisk", m_zup = "m_zup", puv_skar_znak = "puv_skar_znak", s_ele_dok = "s_ele_dok", s_fyz_dok = "s_fyz_dok", id_skartriz_nda = "id_skartriz_nda", poradi_add = "poradi_add", rok_uzav_add = "rok_uzav_add", popis_ulm_add = "popis_ulm_add", ixs_spis = "ixs_spis", priz_zup = "priz_zup", ixs_fun = "ixs_fun", dat_uzav = "dat_uzav", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", stav_spi = "stav_spi", stav_spi_txt = "stav_spi_txt", por_cislo_add = "por_cislo_add", info_text = "info_text", rok_kon_spu = "rok_kon_spu", ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", pocet_j = "pocet_j", priz_skn = "priz_skn", priz_skn_txt = "priz_skn_txt", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_znak_nazev = "spis_znak_nazev", kod_tyz_txt = "kod_tyz_txt", popis = "popis", znacka_zup = "znacka_zup", prevzato_od_txt = "prevzato_od_txt", prevzal_txt = "prevzal_txt", rok_skartace_new = "rok_skartace_new", kubatura = "kubatura", ixs_su_od = "ixs_su_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", poz_skar = "poz_skar", vaha = "vaha", police = "police", paprsek = "paprsek", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_predani_spra_new = "rok_predani_spra_new", rok_od = "rok_od", rok_do = "rok_do", priz_rok_prep = "priz_rok_prep", priz_rok_sk_pre = "priz_rok_sk_pre", poc_krabic = "poc_krabic", pocet_listu = "pocet_listu", ixs_lpc = "ixs_lpc", pocet_pis_jed_txt_add = "pocet_pis_jed_txt_add", rozsah_add = "rozsah_add", rozsah_new_add = "rozsah_new_add", ixs_ska = "ixs_ska", nazev_ska = "nazev_ska", ukladaci_znacka = "ukladaci_znacka", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_ref_od = "nazev_ref_od", pocet_j_fyz = "pocet_j_fyz", pocet_pis_fyz = "pocet_pis_fyz", priz_poc_prep = "priz_poc_prep", priz_skzn_prep = "priz_skzn_prep", skar_znak_spz = "skar_znak_spz", skar_lhuta_spz = "skar_lhuta_spz", priz_skar = "priz_skar", ixb_aip = "ixb_aip", ixs_zup_pod = "ixs_zup_pod", priz_trans_log = "priz_trans_log", soubor = "soubor", ixs_cer_c = "ixs_cer_c", rok_od_do_add = "rok_od_do_add", dat_do = "dat_do", hash2 = "hash2", alg_h2 = "alg_h2", nazev_ref_akt = "nazev_ref_akt", nazev_spi_akt = "nazev_spi_akt", zkratka_nazev_spi_akt = "zkratka_nazev_spi_akt", jeVeSpisovne = "jeVeSpisovne", ixb_trans_logu = "ixb_trans_logu", ulmDto = "ulmDto", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSpitskeDtoFragments { ikc = "*", od_txt = "*", su_od_txt = "*", su_od_txt_t = "*", fun_akt = "*", spi_zkratka = "*", stav_ext_txt = "*", pocet_pis_z = "*", pocet_j_z = "*", rok_spo_uda_z = "*", rok_skartace_z = "*", stav_sul_z = "*", priz_vyp_z = "*", priz_skn_z = "*", priz_cely_zup = "*", kod_tyz_z = "*", spis_pl_z = "*", spis_znak_z = "*", skar_znak_z = "*", skar_lhuta_z = "*", spz_nazev_z = "*", bm_z = "*", bm_pos_z = "*", umisteni_z = "*", ixs_su_od_z = "*", ixs_zmp_od_z = "*", ixs_spi_do_z = "*", ixs_fun_do_z = "*", ixs_spi_akt_z = "*", ixs_fun_akt_z = "*", poz_skar_z = "*", dat_skar_z = "*", dat_uloz_spi_z = "*", dat_zmena_z = "*", s_fyz_z = "*", s_ele_z = "*", puv_skz_z = "*", priz_pos_na_z = "*", pos_na_txt_z = "*", od_txt_z = "*", su_od_txt_z = "*", su_od_txt_t_z = "*", fun_akt_z = "*", spi_zkratka_z = "*", poc_krabic_z = "*", ixs_vsk_z = "*", priz_pos_na = "*", nazev_z = "*", ixs_ulm_z = "*", popis_z = "*", dat_vzniku_z = "*", poznamka_z = "*", log_por_cislo = "*", rok_od_z = "*", rok_do_z = "*", nazev_add = "*", priz_ske = "*", priz_mimskr = "*", aktivita = "*", nazev_rf = "*", rok_spo_uda = "*", spz_nazev = "*", puv_skz = "*", pos_na_txt = "*", stav_sul_bal = "*", stav_sul_bal_txt = "*", stav_ext_arch = "*", stav_ext_arch_txt = "*", id_ext_arch = "*", priz_pos_na_txt = "*", prevzato_od_su_txt = "*", prevzato_od_su_txt_tooltip = "*", ixs_fun_od = "*", stav_sip = "*", dat_gen_sip = "*", m_tisk = "*", m_zup = "*", puv_skar_znak = "*", s_ele_dok = "*", s_fyz_dok = "*", id_skartriz_nda = "*", poradi_add = "*", rok_uzav_add = "*", popis_ulm_add = "*", ixs_spis = "*", priz_zup = "*", ixs_fun = "*", dat_uzav = "*", stav_ext_spi = "*", id_ext_spi = "*", stav_spi = "*", stav_spi_txt = "*", por_cislo_add = "*", info_text = "*", rok_kon_spu = "*", ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", pocet_j = "*", priz_skn = "*", priz_skn_txt = "*", priz_vyp = "*", priz_vyp_txt = "*", kod_tyz = "*", typ_bal_add = "*", spis_znak_nazev = "*", kod_tyz_txt = "*", popis = "*", znacka_zup = "*", prevzato_od_txt = "*", prevzal_txt = "*", rok_skartace_new = "*", kubatura = "*", ixs_su_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", poz_skar = "*", vaha = "*", police = "*", paprsek = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_predani_spra_new = "*", rok_od = "*", rok_do = "*", priz_rok_prep = "*", priz_rok_sk_pre = "*", poc_krabic = "*", pocet_listu = "*", ixs_lpc = "*", pocet_pis_jed_txt_add = "*", rozsah_add = "*", rozsah_new_add = "*", ixs_ska = "*", nazev_ska = "*", ukladaci_znacka = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_ref_od = "*", pocet_j_fyz = "*", pocet_pis_fyz = "*", priz_poc_prep = "*", priz_skzn_prep = "*", skar_znak_spz = "*", skar_lhuta_spz = "*", priz_skar = "*", ixb_aip = "*", ixs_zup_pod = "*", priz_trans_log = "*", soubor = "*", ixs_cer_c = "*", rok_od_do_add = "*", dat_do = "*", hash2 = "*", alg_h2 = "*", nazev_ref_akt = "*", nazev_spi_akt = "*", zkratka_nazev_spi_akt = "*", jeVeSpisovne = "*", ixb_trans_logu = "*", ulmDto = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSpitskeDtoTypes { ikc = "JsonDecimal", od_txt = "string", su_od_txt = "string", su_od_txt_t = "string", fun_akt = "string", spi_zkratka = "string", stav_ext_txt = "string", pocet_pis_z = "number", pocet_j_z = "number", rok_spo_uda_z = "number", rok_skartace_z = "number", stav_sul_z = "number", priz_vyp_z = "number", priz_skn_z = "number", priz_cely_zup = "number", kod_tyz_z = "number", spis_pl_z = "string", spis_znak_z = "string", skar_znak_z = "string", skar_lhuta_z = "number", spz_nazev_z = "string", bm_z = "JsonDecimal", bm_pos_z = "JsonDecimal", umisteni_z = "string", ixs_su_od_z = "string", ixs_zmp_od_z = "string", ixs_spi_do_z = "string", ixs_fun_do_z = "string", ixs_spi_akt_z = "string", ixs_fun_akt_z = "string", poz_skar_z = "string", dat_skar_z = "JsonDate", dat_uloz_spi_z = "JsonDate", dat_zmena_z = "JsonDate", s_fyz_z = "number", s_ele_z = "number", puv_skz_z = "string", priz_pos_na_z = "number", pos_na_txt_z = "string", od_txt_z = "string", su_od_txt_z = "string", su_od_txt_t_z = "string", fun_akt_z = "string", spi_zkratka_z = "string", poc_krabic_z = "number", ixs_vsk_z = "string", priz_pos_na = "number", nazev_z = "string", ixs_ulm_z = "string", popis_z = "string", dat_vzniku_z = "JsonDate", poznamka_z = "string", log_por_cislo = "number", rok_od_z = "number", rok_do_z = "number", nazev_add = "string", priz_ske = "number", priz_mimskr = "number", aktivita = "number", nazev_rf = "string", rok_spo_uda = "number", spz_nazev = "string", puv_skz = "string", pos_na_txt = "string", stav_sul_bal = "number", stav_sul_bal_txt = "string", stav_ext_arch = "number", stav_ext_arch_txt = "string", id_ext_arch = "string", priz_pos_na_txt = "string", prevzato_od_su_txt = "string", prevzato_od_su_txt_tooltip = "string", ixs_fun_od = "string", stav_sip = "string", dat_gen_sip = "JsonDate", m_tisk = "number", m_zup = "number", puv_skar_znak = "string", s_ele_dok = "number", s_fyz_dok = "number", id_skartriz_nda = "string", poradi_add = "string", rok_uzav_add = "number", popis_ulm_add = "string", ixs_spis = "string", priz_zup = "number", ixs_fun = "string", dat_uzav = "JsonDate", stav_ext_spi = "number", id_ext_spi = "string", stav_spi = "number", stav_spi_txt = "string", por_cislo_add = "string", info_text = "string", rok_kon_spu = "number", ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", pocet_j = "number", priz_skn = "number", priz_skn_txt = "string", priz_vyp = "number", priz_vyp_txt = "string", kod_tyz = "number", typ_bal_add = "number", spis_znak_nazev = "string", kod_tyz_txt = "string", popis = "string", znacka_zup = "string", prevzato_od_txt = "string", prevzal_txt = "string", rok_skartace_new = "number", kubatura = "JsonDecimal", ixs_su_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", poz_skar = "string", vaha = "JsonDecimal", police = "string", paprsek = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_predani_spra_new = "number", rok_od = "number", rok_do = "number", priz_rok_prep = "number", priz_rok_sk_pre = "number", poc_krabic = "number", pocet_listu = "number", ixs_lpc = "string", pocet_pis_jed_txt_add = "string", rozsah_add = "string", rozsah_new_add = "string", ixs_ska = "string", nazev_ska = "string", ukladaci_znacka = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_ref_od = "string", pocet_j_fyz = "number", pocet_pis_fyz = "number", priz_poc_prep = "number", priz_skzn_prep = "number", skar_znak_spz = "string", skar_lhuta_spz = "number", priz_skar = "number", ixb_aip = "string", ixs_zup_pod = "string", priz_trans_log = "number", soubor = "string", ixs_cer_c = "string", rok_od_do_add = "string", dat_do = "JsonDate", hash2 = "string", alg_h2 = "string", nazev_ref_akt = "string", nazev_spi_akt = "string", zkratka_nazev_spi_akt = "string", jeVeSpisovne = "boolean", ixb_trans_logu = "string", ulmDto = "Gordic.Spi.Interface.GSpisulmDto", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSpitskeDtoTypeLengths { od_txt = 254, su_od_txt = 25, su_od_txt_t = 100, fun_akt = 254, spi_zkratka = 5, stav_ext_txt = 50, spis_pl_z = 5, spis_znak_z = 50, skar_znak_z = 2, spz_nazev_z = 100, umisteni_z = 100, ixs_su_od_z = 12, ixs_zmp_od_z = 12, ixs_spi_do_z = 12, ixs_fun_do_z = 12, ixs_spi_akt_z = 12, ixs_fun_akt_z = 12, poz_skar_z = 50, puv_skz_z = 2, pos_na_txt_z = 50, od_txt_z = 254, su_od_txt_z = 25, su_od_txt_t_z = 100, fun_akt_z = 254, spi_zkratka_z = 5, ixs_vsk_z = 12, nazev_add = 254, nazev_rf = 254, spz_nazev = 100, puv_skz = 2, pos_na_txt = 50, stav_sul_bal_txt = 50, stav_ext_arch_txt = 100, id_ext_arch = 50, priz_pos_na_txt = 100, ixs_fun_od = 12, puv_skar_znak = 2, id_skartriz_nda = 254, ixs_spis = 12, ixs_fun = 12, id_ext_spi = 50, stav_spi_txt = 50, por_cislo_add = 50, info_text = 150, ixs_ulm = 12, ixs_zup_nad = 12, spis_znak_nazev = 240, kod_tyz_txt = 50, popis = 100, znacka_zup = 30, ixs_su_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, poz_skar = 50, police = 20, paprsek = 20, ixs_zmp_od = 12, ixs_lpc = 12, pocet_pis_jed_txt_add = 20, rozsah_add = 20, rozsah_new_add = 20, ixs_ska = 12, nazev_ska = 50, ukladaci_znacka = 50, nazev_su_od = 256, nazev_fun_od = 256, nazev_ref_od = 256, skar_znak_spz = 2, ixb_aip = 12, ixs_zup_pod = 12, ixs_cer_c = 12, ixb_trans_logu = 12, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
	interface GSpisskaBaseDto extends Gordic.Spi.Interface.GSpiUniversalListDto {
		/**DBCOLUMN:Seznam.rok_spo_uda*/
		rok_spo_uda?: number|null;
		/**DBCOLUMN:Seznam.spz_nazev*/
		spz_nazev?: string|null;
		/**DBCOLUMN:Seznam.puv_skz*/
		puv_skz?: string|null;
		/**DBCOLUMN:Seznam.pos_na_txt*/
		pos_na_txt?: string|null;
		/**DBCOLUMN:Seznam.stav_sul_bal*/
		stav_sul_bal?: number|null;
		/**DBCOLUMN:Seznam.stav_sul_bal_txt*/
		stav_sul_bal_txt?: string|null;
		/**DBCOLUMN:Seznam.stav_ext_arch*/
		stav_ext_arch?: number|null;
		/**DBCOLUMN:Seznam.stav_ext_arch_txt*/
		stav_ext_arch_txt?: string|null;
		/**DBCOLUMN:Seznam.id_ext_arch*/
		id_ext_arch?: string|null;
		/**DBCOLUMN:Seznam.priz_pos_na_txt*/
		priz_pos_na_txt?: string|null;
		/**DBCOLUMN:Seznam.prevzato_od_su_txt*/
		prevzato_od_su_txt?: string|null;
		/**DBCOLUMN:Seznam.prevzato_od_su_txt_tooltip*/
		prevzato_od_su_txt_tooltip?: string|null;
		/**DBCOLUMN:Seznam.ixs_fun_od*/
		ixs_fun_od?: string|null;
		/**DBCOLUMN:Seznam.stav_sip*/
		stav_sip?: string|null;
		/**DBCOLUMN:Seznam.dat_gen_sip*/
		dat_gen_sip?: JsonDate|null;
		/**DBCOLUMN:Seznam.m_tisk*/
		m_tisk?: number|null;
		/**DBCOLUMN:Seznam.m_zup*/
		m_zup?: number|null;
		/**DBCOLUMN:Seznam.puv_skar_znak*/
		puv_skar_znak?: string|null;
		/**DBCOLUMN:Seznam.s_ele_dok*/
		s_ele_dok?: number|null;
		/**DBCOLUMN:Seznam.s_fyz_dok*/
		s_fyz_dok?: number|null;
		/**DBCOLUMN:Seznam.id_skartriz_nda*/
		id_skartriz_nda?: string|null;
		/**DBCOLUMN:Seznam.poradi_add*/
		poradi_add?: string|null;
		/**DBCOLUMN:Seznam.rok_uzav_add*/
		rok_uzav_add?: number|null;
		/**DBCOLUMN:Seznam.IDPrimaryKeyGriduGenerated	DBCOLUMN:Seznam.popis_ulm_add*/
		popis_ulm_add?: string|null;
	}
	const enum GSpisskaBaseDtoNames { rok_spo_uda = "rok_spo_uda", spz_nazev = "spz_nazev", puv_skz = "puv_skz", pos_na_txt = "pos_na_txt", stav_sul_bal = "stav_sul_bal", stav_sul_bal_txt = "stav_sul_bal_txt", stav_ext_arch = "stav_ext_arch", stav_ext_arch_txt = "stav_ext_arch_txt", id_ext_arch = "id_ext_arch", priz_pos_na_txt = "priz_pos_na_txt", prevzato_od_su_txt = "prevzato_od_su_txt", prevzato_od_su_txt_tooltip = "prevzato_od_su_txt_tooltip", ixs_fun_od = "ixs_fun_od", stav_sip = "stav_sip", dat_gen_sip = "dat_gen_sip", m_tisk = "m_tisk", m_zup = "m_zup", puv_skar_znak = "puv_skar_znak", s_ele_dok = "s_ele_dok", s_fyz_dok = "s_fyz_dok", id_skartriz_nda = "id_skartriz_nda", poradi_add = "poradi_add", rok_uzav_add = "rok_uzav_add", popis_ulm_add = "popis_ulm_add", ixs_spis = "ixs_spis", priz_zup = "priz_zup", ixs_fun = "ixs_fun", dat_uzav = "dat_uzav", stav_ext_spi = "stav_ext_spi", id_ext_spi = "id_ext_spi", stav_spi = "stav_spi", stav_spi_txt = "stav_spi_txt", por_cislo_add = "por_cislo_add", info_text = "info_text", rok_kon_spu = "rok_kon_spu", ixs_ulm = "ixs_ulm", ixs_zup_nad = "ixs_zup_nad", priz_nad = "priz_nad", pocet_pis = "pocet_pis", pocet_j = "pocet_j", priz_skn = "priz_skn", priz_skn_txt = "priz_skn_txt", priz_vyp = "priz_vyp", priz_vyp_txt = "priz_vyp_txt", kod_tyz = "kod_tyz", typ_bal_add = "typ_bal_add", spis_znak_nazev = "spis_znak_nazev", kod_tyz_txt = "kod_tyz_txt", popis = "popis", znacka_zup = "znacka_zup", prevzato_od_txt = "prevzato_od_txt", prevzal_txt = "prevzal_txt", rok_skartace_new = "rok_skartace_new", kubatura = "kubatura", ixs_su_od = "ixs_su_od", ixs_spi_do = "ixs_spi_do", ixs_fun_do = "ixs_fun_do", ixs_spi_akt = "ixs_spi_akt", dat_skartace = "dat_skartace", dat_vzniku = "dat_vzniku", dat_uloz_spi = "dat_uloz_spi", poz_skar = "poz_skar", vaha = "vaha", police = "police", paprsek = "paprsek", ixs_zmp_od = "ixs_zmp_od", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", rok_predani_spra_new = "rok_predani_spra_new", rok_od = "rok_od", rok_do = "rok_do", priz_rok_prep = "priz_rok_prep", priz_rok_sk_pre = "priz_rok_sk_pre", poc_krabic = "poc_krabic", pocet_listu = "pocet_listu", ixs_lpc = "ixs_lpc", pocet_pis_jed_txt_add = "pocet_pis_jed_txt_add", rozsah_add = "rozsah_add", rozsah_new_add = "rozsah_new_add", ixs_ska = "ixs_ska", nazev_ska = "nazev_ska", ukladaci_znacka = "ukladaci_znacka", nazev_su_od = "nazev_su_od", nazev_fun_od = "nazev_fun_od", nazev_ref_od = "nazev_ref_od", pocet_j_fyz = "pocet_j_fyz", pocet_pis_fyz = "pocet_pis_fyz", priz_poc_prep = "priz_poc_prep", priz_skzn_prep = "priz_skzn_prep", skar_znak_spz = "skar_znak_spz", skar_lhuta_spz = "skar_lhuta_spz", priz_skar = "priz_skar", ixb_aip = "ixb_aip", ixs_zup_pod = "ixs_zup_pod", priz_trans_log = "priz_trans_log", soubor = "soubor", ixs_cer_c = "ixs_cer_c", rok_od_do_add = "rok_od_do_add", dat_do = "dat_do", hash2 = "hash2", alg_h2 = "alg_h2", nazev_ref_akt = "nazev_ref_akt", nazev_spi_akt = "nazev_spi_akt", zkratka_nazev_spi_akt = "zkratka_nazev_spi_akt", jeVeSpisovne = "jeVeSpisovne", ixb_trans_logu = "ixb_trans_logu", ulmDto = "ulmDto", priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", ixs_su_do = "ixs_su_do", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", nazev_rf_akt = "nazev_rf_akt", skar_lhuta = "skar_lhuta", druh_zas_zach = "druh_zas_zach", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", pod_cis = "pod_cis", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", dat_predani = "dat_predani", rok_skartace = "rok_skartace", zpusob_dor = "zpusob_dor", zkratka = "zkratka", zpusob_dor_txt = "zpusob_dor_txt", druh_zas_zach_txt = "druh_zas_zach_txt", s_pio_txt = "s_pio_txt", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", duvod_storna = "duvod_storna", ixs_zup = "ixs_zup", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", m_err = "m_err", m_vyber = "m_vyber",}
	const enum GSpisskaBaseDtoFragments { rok_spo_uda = "*", spz_nazev = "*", puv_skz = "*", pos_na_txt = "*", stav_sul_bal = "*", stav_sul_bal_txt = "*", stav_ext_arch = "*", stav_ext_arch_txt = "*", id_ext_arch = "*", priz_pos_na_txt = "*", prevzato_od_su_txt = "*", prevzato_od_su_txt_tooltip = "*", ixs_fun_od = "*", stav_sip = "*", dat_gen_sip = "*", m_tisk = "*", m_zup = "*", puv_skar_znak = "*", s_ele_dok = "*", s_fyz_dok = "*", id_skartriz_nda = "*", poradi_add = "*", rok_uzav_add = "*", popis_ulm_add = "*", ixs_spis = "*", priz_zup = "*", ixs_fun = "*", dat_uzav = "*", stav_ext_spi = "*", id_ext_spi = "*", stav_spi = "*", stav_spi_txt = "*", por_cislo_add = "*", info_text = "*", rok_kon_spu = "*", ixs_ulm = "*", ixs_zup_nad = "*", priz_nad = "*", pocet_pis = "*", pocet_j = "*", priz_skn = "*", priz_skn_txt = "*", priz_vyp = "*", priz_vyp_txt = "*", kod_tyz = "*", typ_bal_add = "*", spis_znak_nazev = "*", kod_tyz_txt = "*", popis = "*", znacka_zup = "*", prevzato_od_txt = "*", prevzal_txt = "*", rok_skartace_new = "*", kubatura = "*", ixs_su_od = "*", ixs_spi_do = "*", ixs_fun_do = "*", ixs_spi_akt = "*", dat_skartace = "*", dat_vzniku = "*", dat_uloz_spi = "*", poz_skar = "*", vaha = "*", police = "*", paprsek = "*", ixs_zmp_od = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", rok_predani_spra_new = "*", rok_od = "*", rok_do = "*", priz_rok_prep = "*", priz_rok_sk_pre = "*", poc_krabic = "*", pocet_listu = "*", ixs_lpc = "*", pocet_pis_jed_txt_add = "*", rozsah_add = "*", rozsah_new_add = "*", ixs_ska = "*", nazev_ska = "*", ukladaci_znacka = "*", nazev_su_od = "*", nazev_fun_od = "*", nazev_ref_od = "*", pocet_j_fyz = "*", pocet_pis_fyz = "*", priz_poc_prep = "*", priz_skzn_prep = "*", skar_znak_spz = "*", skar_lhuta_spz = "*", priz_skar = "*", ixb_aip = "*", ixs_zup_pod = "*", priz_trans_log = "*", soubor = "*", ixs_cer_c = "*", rok_od_do_add = "*", dat_do = "*", hash2 = "*", alg_h2 = "*", nazev_ref_akt = "*", nazev_spi_akt = "*", zkratka_nazev_spi_akt = "*", jeVeSpisovne = "*", ixb_trans_logu = "*", ulmDto = "*", priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", ixs_su_do = "*", nazev_su_do = "*", nazev_rf_cil = "*", nazev_rf_akt = "*", skar_lhuta = "*", druh_zas_zach = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", pod_cis = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", dat_predani = "*", rok_skartace = "*", zpusob_dor = "*", zkratka = "*", zpusob_dor_txt = "*", druh_zas_zach_txt = "*", s_pio_txt = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", duvod_storna = "*", ixs_zup = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", info_ikon_add = "*", _gdpr_stav_log = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", m_err = "*", m_vyber = "*",}
	const enum GSpisskaBaseDtoTypes { rok_spo_uda = "number", spz_nazev = "string", puv_skz = "string", pos_na_txt = "string", stav_sul_bal = "number", stav_sul_bal_txt = "string", stav_ext_arch = "number", stav_ext_arch_txt = "string", id_ext_arch = "string", priz_pos_na_txt = "string", prevzato_od_su_txt = "string", prevzato_od_su_txt_tooltip = "string", ixs_fun_od = "string", stav_sip = "string", dat_gen_sip = "JsonDate", m_tisk = "number", m_zup = "number", puv_skar_znak = "string", s_ele_dok = "number", s_fyz_dok = "number", id_skartriz_nda = "string", poradi_add = "string", rok_uzav_add = "number", popis_ulm_add = "string", ixs_spis = "string", priz_zup = "number", ixs_fun = "string", dat_uzav = "JsonDate", stav_ext_spi = "number", id_ext_spi = "string", stav_spi = "number", stav_spi_txt = "string", por_cislo_add = "string", info_text = "string", rok_kon_spu = "number", ixs_ulm = "string", ixs_zup_nad = "string", priz_nad = "number", pocet_pis = "number", pocet_j = "number", priz_skn = "number", priz_skn_txt = "string", priz_vyp = "number", priz_vyp_txt = "string", kod_tyz = "number", typ_bal_add = "number", spis_znak_nazev = "string", kod_tyz_txt = "string", popis = "string", znacka_zup = "string", prevzato_od_txt = "string", prevzal_txt = "string", rok_skartace_new = "number", kubatura = "JsonDecimal", ixs_su_od = "string", ixs_spi_do = "string", ixs_fun_do = "string", ixs_spi_akt = "string", dat_skartace = "JsonDate", dat_vzniku = "JsonDate", dat_uloz_spi = "JsonDate", poz_skar = "string", vaha = "JsonDecimal", police = "string", paprsek = "string", ixs_zmp_od = "string", skar_lhuta_spra = "number", rok_predani_spra = "number", rok_predani_spra_new = "number", rok_od = "number", rok_do = "number", priz_rok_prep = "number", priz_rok_sk_pre = "number", poc_krabic = "number", pocet_listu = "number", ixs_lpc = "string", pocet_pis_jed_txt_add = "string", rozsah_add = "string", rozsah_new_add = "string", ixs_ska = "string", nazev_ska = "string", ukladaci_znacka = "string", nazev_su_od = "string", nazev_fun_od = "string", nazev_ref_od = "string", pocet_j_fyz = "number", pocet_pis_fyz = "number", priz_poc_prep = "number", priz_skzn_prep = "number", skar_znak_spz = "string", skar_lhuta_spz = "number", priz_skar = "number", ixb_aip = "string", ixs_zup_pod = "string", priz_trans_log = "number", soubor = "string", ixs_cer_c = "string", rok_od_do_add = "string", dat_do = "JsonDate", hash2 = "string", alg_h2 = "string", nazev_ref_akt = "string", nazev_spi_akt = "string", zkratka_nazev_spi_akt = "string", jeVeSpisovne = "boolean", ixb_trans_logu = "string", ulmDto = "Gordic.Spi.Interface.GSpisulmDto", priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", ixs_su_do = "string", nazev_su_do = "string", nazev_rf_cil = "string", nazev_rf_akt = "string", skar_lhuta = "number", druh_zas_zach = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", pod_cis = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", dat_predani = "JsonDate", rok_skartace = "number", zpusob_dor = "number", zkratka = "string", zpusob_dor_txt = "string", druh_zas_zach_txt = "string", s_pio_txt = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", duvod_storna = "string", ixs_zup = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", info_ikon_add = "number", _gdpr_stav_log = "number", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", m_err = "string", m_vyber = "number",}
	const enum GSpisskaBaseDtoTypeLengths { spz_nazev = 100, puv_skz = 2, pos_na_txt = 50, stav_sul_bal_txt = 50, stav_ext_arch_txt = 100, id_ext_arch = 50, priz_pos_na_txt = 100, ixs_fun_od = 12, puv_skar_znak = 2, id_skartriz_nda = 254, ixs_spis = 12, ixs_fun = 12, id_ext_spi = 50, stav_spi_txt = 50, por_cislo_add = 50, info_text = 150, ixs_ulm = 12, ixs_zup_nad = 12, spis_znak_nazev = 240, kod_tyz_txt = 50, popis = 100, znacka_zup = 30, ixs_su_od = 12, ixs_spi_do = 12, ixs_fun_do = 12, ixs_spi_akt = 12, poz_skar = 50, police = 20, paprsek = 20, ixs_zmp_od = 12, ixs_lpc = 12, pocet_pis_jed_txt_add = 20, rozsah_add = 20, rozsah_new_add = 20, ixs_ska = 12, nazev_ska = 50, ukladaci_znacka = 50, nazev_su_od = 256, nazev_fun_od = 256, nazev_ref_od = 256, skar_znak_spz = 2, ixb_aip = 12, ixs_zup_pod = 12, ixs_cer_c = 12, ixb_trans_logu = 12, stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, spis_pl = 5, spis_znak = 50, skar_znak = 2, ixs_su_do = 12, pod_cis = 30, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
	/**DBTABLE:Seznam*/
	interface GBudovaDto {
		/**aktivita*/
		aktivita?: number|null;
		/**název budovy*/
		budova_naz?: string|null;
		/**ID budovy*/
		budova_kod?: string|null;
	}
	const enum GBudovaDtoNames { aktivita = "aktivita", budova_naz = "budova_naz", budova_kod = "budova_kod",}
	const enum GBudovaDtoFragments { aktivita = "*", budova_naz = "*", budova_kod = "*",}
	const enum GBudovaDtoTypes { aktivita = "number", budova_naz = "string", budova_kod = "string",}
	const enum GBudovaDtoTypeLengths { aktivita = 8, budova_naz = 50, budova_kod = 8,}
	/**DBTABLE:Seznam*/
	interface GSegmentDto extends Gordic.Spi.Interface.GBudovaDto {
		/**název segmentu*/
		segment_naz?: string|null;
		/**ID segmentu*/
		segment_kod?: string|null;
	}
	const enum GSegmentDtoNames { segment_naz = "segment_naz", segment_kod = "segment_kod", aktivita = "aktivita", budova_naz = "budova_naz", budova_kod = "budova_kod",}
	const enum GSegmentDtoFragments { segment_naz = "*", segment_kod = "*", aktivita = "*", budova_naz = "*", budova_kod = "*",}
	const enum GSegmentDtoTypes { segment_naz = "string", segment_kod = "string", aktivita = "number", budova_naz = "string", budova_kod = "string",}
	const enum GSegmentDtoTypeLengths { segment_naz = 50, segment_kod = 8, aktivita = 8, budova_naz = 50, budova_kod = 8,}
	/**DBTABLE:Seznam*/
	interface GUmisteniBaseDto extends Gordic.Spi.Interface.GMistnostDto {
	}
	const enum GUmisteniBaseDtoNames { mistnost_naz = "mistnost_naz", mistnost_kod = "mistnost_kod", segment_naz = "segment_naz", segment_kod = "segment_kod", aktivita = "aktivita", budova_naz = "budova_naz", budova_kod = "budova_kod",}
	const enum GUmisteniBaseDtoFragments { mistnost_naz = "*", mistnost_kod = "*", segment_naz = "*", segment_kod = "*", aktivita = "*", budova_naz = "*", budova_kod = "*",}
	const enum GUmisteniBaseDtoTypes { mistnost_naz = "string", mistnost_kod = "string", segment_naz = "string", segment_kod = "string", aktivita = "number", budova_naz = "string", budova_kod = "string",}
	const enum GUmisteniBaseDtoTypeLengths { mistnost_naz = 50, mistnost_kod = 8, segment_naz = 50, segment_kod = 8, aktivita = 8, budova_naz = 50, budova_kod = 8,}
	/**DBTABLE:Seznam*/
	interface GMistnostDto extends Gordic.Spi.Interface.GSegmentDto {
		/**název místnosti*/
		mistnost_naz?: string|null;
		/**ID mistnosti*/
		mistnost_kod?: string|null;
	}
	const enum GMistnostDtoNames { mistnost_naz = "mistnost_naz", mistnost_kod = "mistnost_kod", segment_naz = "segment_naz", segment_kod = "segment_kod", aktivita = "aktivita", budova_naz = "budova_naz", budova_kod = "budova_kod",}
	const enum GMistnostDtoFragments { mistnost_naz = "*", mistnost_kod = "*", segment_naz = "*", segment_kod = "*", aktivita = "*", budova_naz = "*", budova_kod = "*",}
	const enum GMistnostDtoTypes { mistnost_naz = "string", mistnost_kod = "string", segment_naz = "string", segment_kod = "string", aktivita = "number", budova_naz = "string", budova_kod = "string",}
	const enum GMistnostDtoTypeLengths { mistnost_naz = 50, mistnost_kod = 8, segment_naz = 50, segment_kod = 8, aktivita = 8, budova_naz = 50, budova_kod = 8,}
	/**filtr ulozenych do spisovny*/
	interface GUloznaMistaFilterDto {
		/**pouze aktivni*/
		pouzeAktivni?: boolean|null;
		/**pouze aktivni*/
		rozbalitStrom?: boolean|null;
		/**ixs ULM*/
		ixs_ulm?: string|null;
		/**budova*/
		budova_kod?: string|null;
		/**segment*/
		segment_kod?: string|null;
		/**mistnost*/
		mistnost_kod?: string|null;
		/**mistnost*/
		ico?: string|null;
		/**mistnost*/
		ixs_spi?: string|null;
	}
	const enum GUloznaMistaFilterDtoNames { pouzeAktivni = "pouzeAktivni", rozbalitStrom = "rozbalitStrom", ixs_ulm = "ixs_ulm", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", ico = "ico", ixs_spi = "ixs_spi",}
	const enum GUloznaMistaFilterDtoFragments { pouzeAktivni = "*", rozbalitStrom = "*", ixs_ulm = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", ico = "*", ixs_spi = "*",}
	const enum GUloznaMistaFilterDtoTypes { pouzeAktivni = "boolean", rozbalitStrom = "boolean", ixs_ulm = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", ico = "string", ixs_spi = "string",}
	const enum GUloznaMistaFilterDtoTypeLengths {}
	/**struktura posouzeni/prevzeti z navartyove davky do NDA*/
	interface GSkartRizeniDleNDAStru {
		/**Zmena spisoveho planu a znaku*/
		IxsBaliku?: string|null;
		/**datum externi archivace*/
		DatExtArch?: JsonDate|null;
		/**
		*     SpZnak 
		*/
		Ixp?: string|null;
		/**
		*     Skart. znak 
		*/
		TypOperace?: Gordic.Spi.Interface.SpicposEnum|null;
		/**
		*     SpZnak 
		*/
		IdentifikatorDA?: string|null;
		/**
		*     Skart. znak 
		*/
		Zpracovano?: boolean|null;
		/**
		*     Skart. znak 
		*/
		DatZmenaDokSpis?: JsonDate|null;
		/**
		*     Skart. znak 
		*/
		DatZmenaBaliku?: JsonDate|null;
		isObsah?: boolean|null;
	}
	const enum GSkartRizeniDleNDAStruNames { IxsBaliku = "IxsBaliku", DatExtArch = "DatExtArch", Ixp = "Ixp", TypOperace = "TypOperace", IdentifikatorDA = "IdentifikatorDA", Zpracovano = "Zpracovano", DatZmenaDokSpis = "DatZmenaDokSpis", DatZmenaBaliku = "DatZmenaBaliku", isObsah = "isObsah",}
	const enum GSkartRizeniDleNDAStruFragments { IxsBaliku = "*", DatExtArch = "*", Ixp = "*", TypOperace = "*", IdentifikatorDA = "*", Zpracovano = "*", DatZmenaDokSpis = "*", DatZmenaBaliku = "*", isObsah = "*",}
	const enum GSkartRizeniDleNDAStruTypes { IxsBaliku = "string", DatExtArch = "JsonDate", Ixp = "string", TypOperace = "Gordic.Spi.Interface.SpicposEnum", IdentifikatorDA = "string", Zpracovano = "boolean", DatZmenaDokSpis = "JsonDate", DatZmenaBaliku = "JsonDate", isObsah = "boolean",}
	const enum GSkartRizeniDleNDAStruTypeLengths {}
	/**FilSpitska*/
	const enum FilSpitska {
		/**rok_skartace*/
		rok_skartace,
		/**mod*/
		mod,
		/**rezim*/
		rezim,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Dto\Base\GDokSpisSpiListBaseDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Neaktivni dokSpis*/
	interface GDokSpisSpiListBaseDto extends Gordic.Wfl.Interface.GDokSpisListDto {
		/**DBCOLUMN:Seznam.priz_neevid*/
		priz_neevid?: number|null;
		/**DBCOLUMN:Seznam.status_pis*/
		status_pis?: number|null;
		/**DBCOLUMN:Seznam.stav_sul*/
		stav_sul?: number|null;
		/**DBCOLUMN:Seznam.stav_sul_txt*/
		stav_sul_txt?: string|null;
		/**DBCOLUMN:Seznam.stav_sul_rsx*/
		stav_sul_rsx?: string|null;
		/**DBCOLUMN:Seznam.typ_duv_del*/
		typ_duv_del?: number|null;
		/**DBCOLUMN:Seznam.ixs_spi*/
		ixs_spi?: string|null;
		/**DBCOLUMN:Seznam.dat_prij_spi*/
		dat_prij_spi?: JsonDate|null;
		/**DBCOLUMN:Seznam.dat_uloz*/
		dat_uloz?: JsonDate|null;
		/**DBCOLUMN:Seznam.ixb_sip*/
		ixb_sip?: string|null;
		/**DBCOLUMN:Seznam.nazev_zmenu_prov_add*/
		nazev_zmenu_prov_add?: string|null;
	}
	const enum GDokSpisSpiListBaseDtoNames { priz_neevid = "priz_neevid", status_pis = "status_pis", stav_sul = "stav_sul", stav_sul_txt = "stav_sul_txt", stav_sul_rsx = "stav_sul_rsx", typ_duv_del = "typ_duv_del", ixs_spi = "ixs_spi", dat_prij_spi = "dat_prij_spi", dat_uloz = "dat_uloz", ixb_sip = "ixb_sip", nazev_zmenu_prov_add = "nazev_zmenu_prov_add", ixs_zup = "ixs_zup", lic = "lic", ixs_fun_akt = "ixs_fun_akt", ixs_su_akt = "ixs_su_akt", vlastnik = "vlastnik", odesilatel = "odesilatel", file_name = "file_name", stav_dist = "stav_dist", ktg_typ = "ktg_typ", ixs_typ = "ixs_typ", ixs_typ_txt = "ixs_typ_txt", stav_pis_txt = "stav_pis_txt", s_ssl = "s_ssl", dat_vyriz_do_dok = "dat_vyriz_do_dok", misto_vzniku = "misto_vzniku", dat_pod = "dat_pod", spis_pl = "spis_pl", spis_znak = "spis_znak", poznamka = "poznamka", skar_znak = "skar_znak", nazev_su_cil = "nazev_su_cil", nazev_su_do = "nazev_su_do", nazev_rf_cil = "nazev_rf_cil", skar_lhuta = "skar_lhuta", por_cislo = "por_cislo", el_bitmap = "el_bitmap", img_vyr = "img_vyr", nova_redi_bitmap = "nova_redi_bitmap", vlastnictvi_redistribuce_ico = "vlastnictvi_redistribuce_ico", cj_spis = "cj_spis", ixs_esu = "ixs_esu", esu_txt = "esu_txt", obsah_text = "obsah_text", uzo = "uzo", priz_view_ssl = "priz_view_ssl", priz_v_baliku = "priz_v_baliku", typ_esu = "typ_esu", dat_vyriz_do_spis = "dat_vyriz_do_spis", dat_prij_pod = "dat_prij_pod", rok_skartace = "rok_skartace", zkratka = "zkratka", zkr_ag = "zkr_ag", rok = "rok", s_pio = "s_pio", priz_kop = "priz_kop", priz_kopie = "priz_kopie", bm = "bm", bm_pos = "bm_pos", umisteni = "umisteni", nazev_fun_akt = "nazev_fun_akt", nazev_su_akt = "nazev_su_akt", znacka_odes = "znacka_odes", sp_zn_odes = "sp_zn_odes", typ_ag_txt = "typ_ag_txt", ixp = "ixp", ixp_dil = "ixp_dil", priz_spis = "priz_spis", typ_spis = "typ_spis", ixp_spis_prir = "ixp_spis_prir", typ_ag = "typ_ag", nazev = "nazev", akt_znacka = "akt_znacka", cj = "cj", s_vyriz = "s_vyriz", s_uzav = "s_uzav", s_prij = "s_prij", s_sgn = "s_sgn", s_orig = "s_orig", s_odes = "s_odes", s_schval = "s_schval", puvod = "puvod", priz_cj = "priz_cj", stav_pis = "stav_pis", ucel_dist = "ucel_dist", s_fyz = "s_fyz", s_ele = "s_ele", dat_vyriz = "dat_vyriz", dat_vyriz_do = "dat_vyriz_do", zmenu_prov = "zmenu_prov", dat_zmena = "dat_zmena", ixp_spis = "ixp_spis", ixs_vsk = "ixs_vsk", ixp_top = "ixp_top", ixp_soucast = "ixp_soucast", ixp_tss = "ixp_tss", stornoval_txt = "stornoval_txt", vsk_nazev = "vsk_nazev", dil_nazev = "dil_nazev", spis_nazev = "spis_nazev", IDPrimaryKeyGriduGenerated = "IDPrimaryKeyGriduGenerated", TypRezimuPrace = "TypRezimuPrace", doctype_bitmap = "doctype_bitmap", typ_entity_ico = "typ_entity_ico", technicke_vlastnosti_ico = "technicke_vlastnosti_ico", pozice_spis_ico = "pozice_spis_ico", stav_zpracovani_ico = "stav_zpracovani_ico", stav_pis_bitmap = "stav_pis_bitmap", termin_ico = "termin_ico", doplnujici_informace_ico = "doplnujici_informace_ico", m_err = "m_err", m_vyber = "m_vyber", info_ikon_add = "info_ikon_add", _gdpr_stav_log = "_gdpr_stav_log",}
	const enum GDokSpisSpiListBaseDtoFragments { priz_neevid = "*", status_pis = "*", stav_sul = "*", stav_sul_txt = "*", stav_sul_rsx = "*", typ_duv_del = "*", ixs_spi = "*", dat_prij_spi = "*", dat_uloz = "*", ixb_sip = "*", nazev_zmenu_prov_add = "*", ixs_zup = "*", lic = "*", ixs_fun_akt = "*", ixs_su_akt = "*", vlastnik = "*", odesilatel = "*", file_name = "*", stav_dist = "*", ktg_typ = "*", ixs_typ = "*", ixs_typ_txt = "*", stav_pis_txt = "*", s_ssl = "*", dat_vyriz_do_dok = "*", misto_vzniku = "*", dat_pod = "*", spis_pl = "*", spis_znak = "*", poznamka = "*", skar_znak = "*", nazev_su_cil = "*", nazev_su_do = "*", nazev_rf_cil = "*", skar_lhuta = "*", por_cislo = "*", el_bitmap = "*", img_vyr = "*", nova_redi_bitmap = "*", vlastnictvi_redistribuce_ico = "*", cj_spis = "*", ixs_esu = "*", esu_txt = "*", obsah_text = "*", uzo = "*", priz_view_ssl = "*", priz_v_baliku = "*", typ_esu = "*", dat_vyriz_do_spis = "*", dat_prij_pod = "*", rok_skartace = "*", zkratka = "*", zkr_ag = "*", rok = "*", s_pio = "*", priz_kop = "*", priz_kopie = "*", bm = "*", bm_pos = "*", umisteni = "*", nazev_fun_akt = "*", nazev_su_akt = "*", znacka_odes = "*", sp_zn_odes = "*", typ_ag_txt = "*", ixp = "*", ixp_dil = "*", priz_spis = "*", typ_spis = "*", ixp_spis_prir = "*", typ_ag = "*", nazev = "*", akt_znacka = "*", cj = "*", s_vyriz = "*", s_uzav = "*", s_prij = "*", s_sgn = "*", s_orig = "*", s_odes = "*", s_schval = "*", puvod = "*", priz_cj = "*", stav_pis = "*", ucel_dist = "*", s_fyz = "*", s_ele = "*", dat_vyriz = "*", dat_vyriz_do = "*", zmenu_prov = "*", dat_zmena = "*", ixp_spis = "*", ixs_vsk = "*", ixp_top = "*", ixp_soucast = "*", ixp_tss = "*", stornoval_txt = "*", vsk_nazev = "*", dil_nazev = "*", spis_nazev = "*", IDPrimaryKeyGriduGenerated = "*", TypRezimuPrace = "*", doctype_bitmap = "*", typ_entity_ico = "*", technicke_vlastnosti_ico = "*", pozice_spis_ico = "*", stav_zpracovani_ico = "*", stav_pis_bitmap = "*", termin_ico = "*", doplnujici_informace_ico = "*", m_err = "*", m_vyber = "*", info_ikon_add = "*", _gdpr_stav_log = "*",}
	const enum GDokSpisSpiListBaseDtoTypes { priz_neevid = "number", status_pis = "number", stav_sul = "number", stav_sul_txt = "string", stav_sul_rsx = "string", typ_duv_del = "number", ixs_spi = "string", dat_prij_spi = "JsonDate", dat_uloz = "JsonDate", ixb_sip = "string", nazev_zmenu_prov_add = "string", ixs_zup = "string", lic = "string", ixs_fun_akt = "string", ixs_su_akt = "string", vlastnik = "string", odesilatel = "string", file_name = "string", stav_dist = "number", ktg_typ = "number", ixs_typ = "string", ixs_typ_txt = "string", stav_pis_txt = "string", s_ssl = "number", dat_vyriz_do_dok = "JsonDate", misto_vzniku = "string", dat_pod = "JsonDate", spis_pl = "string", spis_znak = "string", poznamka = "string", skar_znak = "string", nazev_su_cil = "string", nazev_su_do = "string", nazev_rf_cil = "string", skar_lhuta = "number", por_cislo = "number", el_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", img_vyr = "Gordic.Wfl.Interface.TerminBitmap", nova_redi_bitmap = "Gordic.Wfl.Interface.NovaPostaRedistribuceBitmap", vlastnictvi_redistribuce_ico = "Gordic.Wfl.Interface.VlastnictviRedistribuceIco", cj_spis = "string", ixs_esu = "string", esu_txt = "string", obsah_text = "string", uzo = "string", priz_view_ssl = "number", priz_v_baliku = "number", typ_esu = "number", dat_vyriz_do_spis = "JsonDate", dat_prij_pod = "JsonDate", rok_skartace = "number", zkratka = "string", zkr_ag = "string", rok = "number", s_pio = "number", priz_kop = "number", priz_kopie = "string", bm = "JsonDecimal", bm_pos = "JsonDecimal", umisteni = "string", nazev_fun_akt = "string", nazev_su_akt = "string", znacka_odes = "string", sp_zn_odes = "string", typ_ag_txt = "string", ixp = "string", ixp_dil = "string", priz_spis = "number", typ_spis = "number", ixp_spis_prir = "string", typ_ag = "number", nazev = "string", akt_znacka = "string", cj = "string", s_vyriz = "number", s_uzav = "number", s_prij = "number", s_sgn = "number", s_orig = "number", s_odes = "number", s_schval = "number", puvod = "number", priz_cj = "number", stav_pis = "number", ucel_dist = "number", s_fyz = "number", s_ele = "number", dat_vyriz = "JsonDate", dat_vyriz_do = "JsonDate", zmenu_prov = "string", dat_zmena = "JsonDate", ixp_spis = "string", ixs_vsk = "string", ixp_top = "string", ixp_soucast = "string", ixp_tss = "string", stornoval_txt = "string", vsk_nazev = "string", dil_nazev = "string", spis_nazev = "string", IDPrimaryKeyGriduGenerated = "string", TypRezimuPrace = "Gordic.Wfl.Interface.TypRezimuPraceSeznamu", doctype_bitmap = "Gordic.Wfl.Interface.PisemnostBitmap", typ_entity_ico = "Gordic.Wfl.Interface.TypEntityIco", technicke_vlastnosti_ico = "Gordic.Wfl.Interface.TechnickeVlastnostiIco", pozice_spis_ico = "Gordic.Wfl.Interface.PoziceSpisIco", stav_zpracovani_ico = "Gordic.Wfl.Interface.StavZpracovaniIco", stav_pis_bitmap = "Gordic.Wfl.Interface.StavPisBitmap", termin_ico = "Gordic.Wfl.Interface.TerminIco", doplnujici_informace_ico = "Gordic.Wfl.Interface.DoplnujiciInformaceIco[]", m_err = "string", m_vyber = "number", info_ikon_add = "number", _gdpr_stav_log = "number",}
	const enum GDokSpisSpiListBaseDtoTypeLengths { stav_sul_txt = 50, stav_sul_rsx = 50, ixs_spi = 12, ixb_sip = 12, nazev_zmenu_prov_add = 300, lic = 4, ixs_fun_akt = 12, ixs_su_akt = 12, ixs_typ = 12, misto_vzniku = 100, spis_pl = 5, spis_znak = 50, skar_znak = 2, zkratka = 5, zkr_ag = 5, ixp = 12, ixp_dil = 12, nazev = 100, akt_znacka = 50, cj = 50, zmenu_prov = 12, ixp_tss = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Gin\IGBalik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGBalik*/
	interface Balik {
		/**Vrátí data balíku. 
		*     V případě, že není zadán identifikátor (IxsZup) pak připraví objekt předplnění nového balíku.
		*/
		read(rq?:Gordic.Spi.Interface.GBalikReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GBalikReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GBalikReadRequestDto>,GServiceReadResponse<Gordic.Spi.Interface.GBalikDto>>;
		/**Vytvoří nový balík.*/
		create(rq?:Gordic.Spi.Interface.GCreateBalikRequestDto|CallParams<GServiceSaveRequest<Gordic.Spi.Interface.GCreateBalikRequestDto>>): _Task<GServiceSaveRequest<Gordic.Spi.Interface.GCreateBalikRequestDto>,GServiceSaveResponse<Gordic.Spi.Interface.GCreateBalikResponseDto>>;
		/**Aktualizuje balík.*/
		update(rq?:Gordic.Spi.Interface.GUpdateBalikRequestDto|CallParams<GServiceSaveRequest<Gordic.Spi.Interface.GUpdateBalikRequestDto>>): _Task<GServiceSaveRequest<Gordic.Spi.Interface.GUpdateBalikRequestDto>,GServiceSaveResponse<Gordic.Spi.Interface.GUpdateBalikResponseDto>>;
		/**Vyjme písemnosti z balíků.*/
		vyjmoutPisemnost(rq?:Gordic.Spi.Interface.GVyjmoutPisemnostGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVyjmoutPisemnostGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVyjmoutPisemnostGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVyjmoutPisemnostGroupResponseDto>>;
		/**Vygeneruje IxsZup pro balík. Pokud je v requestu poslána instance balíku, pak do něj IxsZup doplní.*/
		generateIxsZup(rq?:Gordic.Spi.Interface.GBalikDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GBalikDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GBalikDto>,GServiceActionResponse<Gordic.Spi.Interface.GBalikDto>>;
		/**Stornuje balík.*/
		stornovat(rq?:Gordic.Spi.Interface.GStornovatRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GStornovatRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GStornovatRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GStornovatResponseDto>>;
		/**Přidělí balík(y) spisovně.*/
		pridelitSpisovne(rq?:Gordic.Spi.Interface.GPridelitSpisovneActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GPridelitSpisovneActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GPridelitSpisovneActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GPridelitSpisovneActionResponseDto>>;
		/**Stornuje přidělení balíku spisovně.*/
		stornoPrideleniSpisovne(rq?:Gordic.Spi.Interface.GStornoPrideleniSpisovneActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GStornoPrideleniSpisovneActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GStornoPrideleniSpisovneActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GStornoPrideleniSpisovneActionResponseDto>>;
		/**Vytvoří spouštěcí událost.*/
		vytvoritSpousteciUdalost(rq?:Gordic.Spi.Interface.GVytvoritSpousteciUdalostActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GVytvoritSpousteciUdalostActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GVytvoritSpousteciUdalostActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GVytvoritSpousteciUdalostActionResponseDto>>;
		/**Přidá balík do poznámkového bloku.*/
		pridejDoPoznamkovehoBloku(rq?:Gordic.Spi.Interface.GPridejBalikDoPoznamkovehoBlokuActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GPridejBalikDoPoznamkovehoBlokuActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GPridejBalikDoPoznamkovehoBlokuActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GPridejBalikDoPoznamkovehoBlokuActionResponseDto>>;
		/**Kontrola možnosti vložení dokumentu do balíku*/
		kontrolaMoznostiVlozeniDoBaliku(rq?:Gordic.Spi.Interface.GKontrolaMoznostiVlozeniDoBalikuActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GKontrolaMoznostiVlozeniDoBalikuActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GKontrolaMoznostiVlozeniDoBalikuActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GKontrolaMoznostiVlozeniDoBalikuActionResponseDto>>;
		/**Spočítá rok skartace a rok převodu do správního archivu.*/
		getRokSkartaceASpraBaliku(rq?:Gordic.Spi.Interface.GGetRokSkartaceASpraBalikuActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GGetRokSkartaceASpraBalikuActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GGetRokSkartaceASpraBalikuActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GGetRokSkartaceASpraBalikuActionResponseDto>>;
		/**Zjistí, zda jde vložit vybrané dokumenty do balíku*/
		jeMozneVlozitDoJednohoBaliku(rq?:Gordic.Spi.Interface.GJeMozneVlozitDoJednohoBalikuRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GJeMozneVlozitDoJednohoBalikuRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GJeMozneVlozitDoJednohoBalikuRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GJeMozneVlozitDoJednohoBalikuResponseDto>>;
		/**Vrátí historii baliku*/
		listHistorieZmenBaliku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Spi.Interface.GHistorieZmenBalikuDto>>;
		/**Vrátí historii pohybu baliku*/
		listHistoriePohybuBaliku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Spi.Interface.GHistoriePohybuBalikuDto>>;
		/**Vrátí historii pohybu baliku*/
		listObsahBaliku(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Spi.Interface.GObsahBalikuDto>>;
		/**Obsah typoveho spisu*/
		obsahTypovehoSpisu(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Spi.Interface.GObsahBalikuDto>>;
		/**Vrátí minimální hodnoty datumů pro skartaci.*/
		getRokSkartaceMinimumValue(rq?:Gordic.Spi.Interface.GBalikGetRokSkartaceMinimumValueRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GBalikGetRokSkartaceMinimumValueRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GBalikGetRokSkartaceMinimumValueRequestDto>,GServiceReadResponse<Gordic.Spi.Interface.GBalikGetRokSkartaceMinimumValueResponseDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Balik: ServiceBase & Catalog.Balik;
	}
	const Balik: Client["Balik"];
}
declare namespace Gordic.Spi.Interface {
	interface GVytvoritSpousteciUdalostActionRequestDto extends Gordic.Spi.Interface.GBalikWithActionReadRequestDto {
		/**Ixs balíku.*/
		IxsZup?: string|null;
		/**Rok spouštěcí události.*/
		RokSpousteciUdalosti?: number|null;
	}
	const enum GVytvoritSpousteciUdalostActionRequestDtoNames { IxsZup = "IxsZup", RokSpousteciUdalosti = "RokSpousteciUdalosti", ReadRequest = "ReadRequest",}
	const enum GVytvoritSpousteciUdalostActionRequestDtoFragments { IxsZup = "*", RokSpousteciUdalosti = "*", ReadRequest = "*",}
	const enum GVytvoritSpousteciUdalostActionRequestDtoTypes { IxsZup = "string", RokSpousteciUdalosti = "number", ReadRequest = "Gordic.Spi.Interface.GBalikActionReadRequestDto",}
	const enum GVytvoritSpousteciUdalostActionRequestDtoTypeLengths {}
	interface GVytvoritSpousteciUdalostActionResponseDto extends Gordic.Spi.Interface.GBalikWithActionReadResponseDto {
	}
	const enum GVytvoritSpousteciUdalostActionResponseDtoNames { Balik = "Balik",}
	const enum GVytvoritSpousteciUdalostActionResponseDtoFragments { Balik = "*",}
	const enum GVytvoritSpousteciUdalostActionResponseDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto",}
	const enum GVytvoritSpousteciUdalostActionResponseDtoTypeLengths {}
	interface GStornoPrideleniSpisovneActionRequestDto extends Gordic.Spi.Interface.GBalikWithActionReadRequestDto {
		/**Ixs balíku.*/
		IxsZup?: string|null;
	}
	const enum GStornoPrideleniSpisovneActionRequestDtoNames { IxsZup = "IxsZup", ReadRequest = "ReadRequest",}
	const enum GStornoPrideleniSpisovneActionRequestDtoFragments { IxsZup = "*", ReadRequest = "*",}
	const enum GStornoPrideleniSpisovneActionRequestDtoTypes { IxsZup = "string", ReadRequest = "Gordic.Spi.Interface.GBalikActionReadRequestDto",}
	const enum GStornoPrideleniSpisovneActionRequestDtoTypeLengths {}
	interface GStornoPrideleniSpisovneActionResponseDto extends Gordic.Spi.Interface.GBalikWithActionReadResponseDto {
	}
	const enum GStornoPrideleniSpisovneActionResponseDtoNames { Balik = "Balik",}
	const enum GStornoPrideleniSpisovneActionResponseDtoFragments { Balik = "*",}
	const enum GStornoPrideleniSpisovneActionResponseDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto",}
	const enum GStornoPrideleniSpisovneActionResponseDtoTypeLengths {}
	interface GPridelitSpisovneActionRequestDto extends Gordic.Spi.Interface.GBalikWithActionReadRequestDto {
		/**Gets or sets the ixs zup.*/
		IxsZup?: string|null;
		/**Spisovna které balík přidělujeme.*/
		IxsSpi?: string|null;
	}
	const enum GPridelitSpisovneActionRequestDtoNames { IxsZup = "IxsZup", IxsSpi = "IxsSpi", ReadRequest = "ReadRequest",}
	const enum GPridelitSpisovneActionRequestDtoFragments { IxsZup = "*", IxsSpi = "*", ReadRequest = "*",}
	const enum GPridelitSpisovneActionRequestDtoTypes { IxsZup = "string", IxsSpi = "string", ReadRequest = "Gordic.Spi.Interface.GBalikActionReadRequestDto",}
	const enum GPridelitSpisovneActionRequestDtoTypeLengths {}
	interface GPridelitSpisovneActionResponseDto extends Gordic.Spi.Interface.GBalikWithActionReadResponseDto {
	}
	const enum GPridelitSpisovneActionResponseDtoNames { Balik = "Balik",}
	const enum GPridelitSpisovneActionResponseDtoFragments { Balik = "*",}
	const enum GPridelitSpisovneActionResponseDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto",}
	const enum GPridelitSpisovneActionResponseDtoTypeLengths {}
	/**GVyjmoutPisemnostDto*/
	interface GVyjmoutPisemnostGroupRequestDto {
		/**Gets or sets the ixs zup.*/
		IxsZup?: string|null;
		/**Aktuální (spuštěná) spisovna.*/
		IxsSpi?: string|null;
		/**Ixp písemností.*/
		Pisemnosti?: string[]|null;
	}
	const enum GVyjmoutPisemnostGroupRequestDtoNames { IxsZup = "IxsZup", IxsSpi = "IxsSpi", Pisemnosti = "Pisemnosti",}
	const enum GVyjmoutPisemnostGroupRequestDtoFragments { IxsZup = "*", IxsSpi = "*", Pisemnosti = "*",}
	const enum GVyjmoutPisemnostGroupRequestDtoTypes { IxsZup = "string", IxsSpi = "string", Pisemnosti = "string[]",}
	const enum GVyjmoutPisemnostGroupRequestDtoTypeLengths {}
	/**GVyjmoutPisemnostGroupResponseDto*/
	interface GVyjmoutPisemnostGroupResponseDto {
		/**Ixp písemnosti.*/
		Ixp?: string|null;
	}
	const enum GVyjmoutPisemnostGroupResponseDtoNames { Ixp = "Ixp",}
	const enum GVyjmoutPisemnostGroupResponseDtoFragments { Ixp = "*",}
	const enum GVyjmoutPisemnostGroupResponseDtoTypes { Ixp = "string",}
	const enum GVyjmoutPisemnostGroupResponseDtoTypeLengths {}
	/**GVyjmoutPisemnostDto*/
	interface GStornovatRequestDto extends Gordic.Spi.Interface.GBalikWithActionReadRequestDto {
		/**Gets or sets the ixs zup.*/
		IxsZup?: string|null;
		/**Gets or sets the ixs spi.*/
		IxsSpi?: string|null;
		/**Gets or sets the datum zmeny.*/
		DatumZmeny?: JsonDate|null;
		/**Kontrola volného místa v úložném místě????*/
		KontrolaVolnehoMistaVUlozisti?: number|null;
	}
	const enum GStornovatRequestDtoNames { IxsZup = "IxsZup", IxsSpi = "IxsSpi", DatumZmeny = "DatumZmeny", KontrolaVolnehoMistaVUlozisti = "KontrolaVolnehoMistaVUlozisti", ReadRequest = "ReadRequest",}
	const enum GStornovatRequestDtoFragments { IxsZup = "*", IxsSpi = "*", DatumZmeny = "*", KontrolaVolnehoMistaVUlozisti = "*", ReadRequest = "*",}
	const enum GStornovatRequestDtoTypes { IxsZup = "string", IxsSpi = "string", DatumZmeny = "JsonDate", KontrolaVolnehoMistaVUlozisti = "number", ReadRequest = "Gordic.Spi.Interface.GBalikActionReadRequestDto",}
	const enum GStornovatRequestDtoTypeLengths {}
	/**GStornovatResponseDto*/
	interface GStornovatResponseDto extends Gordic.Spi.Interface.GBalikWithActionReadResponseDto {
	}
	const enum GStornovatResponseDtoNames { Balik = "Balik",}
	const enum GStornovatResponseDtoFragments { Balik = "*",}
	const enum GStornovatResponseDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto",}
	const enum GStornovatResponseDtoTypeLengths {}
	interface GGenerateIxsZupDto {
	}
	const enum GGenerateIxsZupDtoNames {}
	const enum GGenerateIxsZupDtoFragments {}
	const enum GGenerateIxsZupDtoTypes {}
	const enum GGenerateIxsZupDtoTypeLengths {}
	/**GBalikReadRequestDto*/
	interface GBalikActionReadRequestDto {
		/**Příznak, zda chceme získat standardní písemnosti (default) a nebo rozšířené.*/
		RozbalenePisemnosti?: boolean|null;
		/**Příznak, zda chceme získat standardní písemnosti (default) a nebo rozšířené.*/
		SpisovyZnakDisabled?: boolean|null;
		/**Typ zobrazení balíku.*/
		TypZobrazeniEntity?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
		/**Příznak, zda se má balík vytvářet v režimu spisovny.*/
		IsRezimSpisovna?: boolean|null;
	}
	const enum GBalikActionReadRequestDtoNames { RozbalenePisemnosti = "RozbalenePisemnosti", SpisovyZnakDisabled = "SpisovyZnakDisabled", TypZobrazeniEntity = "TypZobrazeniEntity", IsRezimSpisovna = "IsRezimSpisovna",}
	const enum GBalikActionReadRequestDtoFragments { RozbalenePisemnosti = "*", SpisovyZnakDisabled = "*", TypZobrazeniEntity = "*", IsRezimSpisovna = "*",}
	const enum GBalikActionReadRequestDtoTypes { RozbalenePisemnosti = "boolean", SpisovyZnakDisabled = "boolean", TypZobrazeniEntity = "Gordic.Gin.Interface.TypZobrazeniEntity", IsRezimSpisovna = "boolean",}
	const enum GBalikActionReadRequestDtoTypeLengths {}
	interface GBalikWithActionReadRequestDto {
		/**Nastavení pro případný read po akci. Pokud bude null, pak se read po akci provádět nebude.*/
		ReadRequest?: Gordic.Spi.Interface.GBalikActionReadRequestDto|null;
	}
	const enum GBalikWithActionReadRequestDtoNames { ReadRequest = "ReadRequest",}
	const enum GBalikWithActionReadRequestDtoFragments { ReadRequest = "*",}
	const enum GBalikWithActionReadRequestDtoTypes { ReadRequest = "Gordic.Spi.Interface.GBalikActionReadRequestDto",}
	const enum GBalikWithActionReadRequestDtoTypeLengths {}
	interface GBalikWithActionReadResponseDto {
		/**Data balíku.*/
		Balik?: Gordic.Spi.Interface.GBalikDto|null;
	}
	const enum GBalikWithActionReadResponseDtoNames { Balik = "Balik",}
	const enum GBalikWithActionReadResponseDtoFragments { Balik = "*",}
	const enum GBalikWithActionReadResponseDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto",}
	const enum GBalikWithActionReadResponseDtoTypeLengths {}
	/**GBalikReadRequestDto*/
	interface GBalikReadRequestDto extends Gordic.Spi.Interface.GBalikActionReadRequestDto {
		/**Identifikátor balíku.*/
		IxsZup?: string|null;
	}
	const enum GBalikReadRequestDtoNames { IxsZup = "IxsZup", RozbalenePisemnosti = "RozbalenePisemnosti", SpisovyZnakDisabled = "SpisovyZnakDisabled", TypZobrazeniEntity = "TypZobrazeniEntity", IsRezimSpisovna = "IsRezimSpisovna",}
	const enum GBalikReadRequestDtoFragments { IxsZup = "*", RozbalenePisemnosti = "*", SpisovyZnakDisabled = "*", TypZobrazeniEntity = "*", IsRezimSpisovna = "*",}
	const enum GBalikReadRequestDtoTypes { IxsZup = "string", RozbalenePisemnosti = "boolean", SpisovyZnakDisabled = "boolean", TypZobrazeniEntity = "Gordic.Gin.Interface.TypZobrazeniEntity", IsRezimSpisovna = "boolean",}
	const enum GBalikReadRequestDtoTypeLengths {}
	/**Vstupní parametry metody pro přidání balíku do poznámkového bloku (IGBalik.PridejDoPoznamkovehoBloku).*/
	interface GPridejBalikDoPoznamkovehoBlokuActionRequestDto {
		/**Identifikátor balíku přidávaného do poznámkového bloku.*/
		IxsZup?: string|null;
		/**Identifikátor poznámkového bloku, do kterého přidáváme balík.*/
		IxsBpl?: string|null;
	}
	const enum GPridejBalikDoPoznamkovehoBlokuActionRequestDtoNames { IxsZup = "IxsZup", IxsBpl = "IxsBpl",}
	const enum GPridejBalikDoPoznamkovehoBlokuActionRequestDtoFragments { IxsZup = "*", IxsBpl = "*",}
	const enum GPridejBalikDoPoznamkovehoBlokuActionRequestDtoTypes { IxsZup = "string", IxsBpl = "string",}
	const enum GPridejBalikDoPoznamkovehoBlokuActionRequestDtoTypeLengths {}
	/**Návratové hodnoty metody pro přidání balíku do poznámkového bloku (IGBalik.PridejDoPoznamkovehoBloku).*/
	interface GPridejBalikDoPoznamkovehoBlokuActionResponseDto {
	}
	const enum GPridejBalikDoPoznamkovehoBlokuActionResponseDtoNames {}
	const enum GPridejBalikDoPoznamkovehoBlokuActionResponseDtoFragments {}
	const enum GPridejBalikDoPoznamkovehoBlokuActionResponseDtoTypes {}
	const enum GPridejBalikDoPoznamkovehoBlokuActionResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro kontrolu možnosti vložení dokumentu do balíku (IGBalik.KontrolaMoznostiVlozeniDoBaliku).*/
	interface GKontrolaMoznostiVlozeniDoBalikuActionRequestDto {
		/**Identifikátor balíku do kterého se vkládá dokument.*/
		IxsZup?: string|null;
		/**Identifikátor dokumentu, který je vkládán do balíku.*/
		Ixp?: string|null;
	}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionRequestDtoNames { IxsZup = "IxsZup", Ixp = "Ixp",}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionRequestDtoFragments { IxsZup = "*", Ixp = "*",}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionRequestDtoTypes { IxsZup = "string", Ixp = "string",}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionRequestDtoTypeLengths {}
	/**Návratové hodnoty metody pro kontrolu možnosti vložení dokumentu do balíku (IGBalik.KontrolaMoznostiVlozeniDoBaliku).*/
	interface GKontrolaMoznostiVlozeniDoBalikuActionResponseDto {
		/**Výsledek kontroly, zda ze vložit dokument do balíku.*/
		LzeVlozit?: boolean|null;
		/**Gets or sets the dotaz.*/
		Dotaz?: string|null;
		/**Gets or sets the prevzit.*/
		Prevzit?: boolean|null;
	}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionResponseDtoNames { LzeVlozit = "LzeVlozit", Dotaz = "Dotaz", Prevzit = "Prevzit",}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionResponseDtoFragments { LzeVlozit = "*", Dotaz = "*", Prevzit = "*",}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionResponseDtoTypes { LzeVlozit = "boolean", Dotaz = "string", Prevzit = "boolean",}
	const enum GKontrolaMoznostiVlozeniDoBalikuActionResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro vytvoření balíku (IGBalik.Create).*/
	interface GCreateBalikRequestDto extends Gordic.Spi.Interface.GBalikWithActionReadRequestDto {
		/**Data balíku.*/
		Balik?: Gordic.Spi.Interface.GBalikDto|null;
		/**Příznak, zda se má balík vytvářet v režimu spisovny.*/
		IsRezimSpisovna?: boolean|null;
	}
	const enum GCreateBalikRequestDtoNames { Balik = "Balik", IsRezimSpisovna = "IsRezimSpisovna", ReadRequest = "ReadRequest",}
	const enum GCreateBalikRequestDtoFragments { Balik = "*", IsRezimSpisovna = "*", ReadRequest = "*",}
	const enum GCreateBalikRequestDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto", IsRezimSpisovna = "boolean", ReadRequest = "Gordic.Spi.Interface.GBalikActionReadRequestDto",}
	const enum GCreateBalikRequestDtoTypeLengths {}
	/**Návratové hodnoty metody pro vytvoření balíku (IGBalik.Create).*/
	interface GCreateBalikResponseDto extends Gordic.Spi.Interface.GBalikWithActionReadResponseDto {
	}
	const enum GCreateBalikResponseDtoNames { Balik = "Balik",}
	const enum GCreateBalikResponseDtoFragments { Balik = "*",}
	const enum GCreateBalikResponseDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto",}
	const enum GCreateBalikResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro update balíku (IGBalik.Update).*/
	interface GUpdateBalikRequestDto extends Gordic.Spi.Interface.GBalikWithActionReadRequestDto {
		/**Data balíku.*/
		Balik?: Gordic.Spi.Interface.GBalikDto|null;
	}
	const enum GUpdateBalikRequestDtoNames { Balik = "Balik", ReadRequest = "ReadRequest",}
	const enum GUpdateBalikRequestDtoFragments { Balik = "*", ReadRequest = "*",}
	const enum GUpdateBalikRequestDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto", ReadRequest = "Gordic.Spi.Interface.GBalikActionReadRequestDto",}
	const enum GUpdateBalikRequestDtoTypeLengths {}
	/**Návratové hodnoty metody pro update balíku (IGBalik.Update).*/
	interface GUpdateBalikResponseDto extends Gordic.Spi.Interface.GBalikWithActionReadResponseDto {
	}
	const enum GUpdateBalikResponseDtoNames { Balik = "Balik",}
	const enum GUpdateBalikResponseDtoFragments { Balik = "*",}
	const enum GUpdateBalikResponseDtoTypes { Balik = "Gordic.Spi.Interface.GBalikDto",}
	const enum GUpdateBalikResponseDtoTypeLengths {}
	/**Vstupní parametry metody pro spočítání roku skartace a roku převodu do správního archivu. (IGBalik.GetRokSkartaceASpraBaliku).*/
	interface GGetRokSkartaceASpraBalikuActionRequestDto {
		/**Identifikátor balíku pro který zjištujeme skartační lhůty.*/
		IxsZup?: string|null;
		/**Datum vzniku balíku.*/
		DatumVzniku?: JsonDate|null;
		/**Skartační lhůta balíku.*/
		SkartacniLhuta?: number|null;
		/**Skartační lhůta převodu do správního archivu.*/
		SkartacniLhutaSpra?: number|null;
	}
	const enum GGetRokSkartaceASpraBalikuActionRequestDtoNames { IxsZup = "IxsZup", DatumVzniku = "DatumVzniku", SkartacniLhuta = "SkartacniLhuta", SkartacniLhutaSpra = "SkartacniLhutaSpra",}
	const enum GGetRokSkartaceASpraBalikuActionRequestDtoFragments { IxsZup = "*", DatumVzniku = "*", SkartacniLhuta = "*", SkartacniLhutaSpra = "*",}
	const enum GGetRokSkartaceASpraBalikuActionRequestDtoTypes { IxsZup = "string", DatumVzniku = "JsonDate", SkartacniLhuta = "number", SkartacniLhutaSpra = "number",}
	const enum GGetRokSkartaceASpraBalikuActionRequestDtoTypeLengths {}
	/**Návratové hodnoty metody pro spočítání roku skartace a roku převodu do správního archivu. (IGBalik.GetRokSkartaceASpraBaliku).*/
	interface GGetRokSkartaceASpraBalikuActionResponseDto {
		/**Rok skartace balíku.*/
		RokSkartace?: number|null;
		/**Rok převodu do správního archivu.
		*     Pokud není povolena používání dvojitých skartačních lhůt pro správní archiv pak je null.
		*/
		RokPrevoduDoSpra?: number|null;
	}
	const enum GGetRokSkartaceASpraBalikuActionResponseDtoNames { RokSkartace = "RokSkartace", RokPrevoduDoSpra = "RokPrevoduDoSpra",}
	const enum GGetRokSkartaceASpraBalikuActionResponseDtoFragments { RokSkartace = "*", RokPrevoduDoSpra = "*",}
	const enum GGetRokSkartaceASpraBalikuActionResponseDtoTypes { RokSkartace = "number", RokPrevoduDoSpra = "number",}
	const enum GGetRokSkartaceASpraBalikuActionResponseDtoTypeLengths {}
	/**Vstupní data pro zjištění JeMozneVlozitDoJednohoBaliku  zda je možné vložit do jednoho balíku*/
	interface GJeMozneVlozitDoJednohoBalikuRequestDto {
		/**data dokumentů*/
		SelectedData?: Gordic.Wfl.Interface.GSslProfilStruktura[]|null;
	}
	const enum GJeMozneVlozitDoJednohoBalikuRequestDtoNames { SelectedData = "SelectedData",}
	const enum GJeMozneVlozitDoJednohoBalikuRequestDtoFragments { SelectedData = "*",}
	const enum GJeMozneVlozitDoJednohoBalikuRequestDtoTypes { SelectedData = "Gordic.Wfl.Interface.GSslProfilStruktura[]",}
	const enum GJeMozneVlozitDoJednohoBalikuRequestDtoTypeLengths {}
	/**Výstupní data pro zjištění JeMozneVlozitDoJednohoBaliku  zda je možné vložit do jednoho balíku*/
	interface GJeMozneVlozitDoJednohoBalikuResponseDto {
		/**data*/
		SelectedData?: Gordic.Wfl.Interface.GSslProfilStruktura|null;
		/**data*/
		JeMozneVlozit?: boolean|null;
	}
	const enum GJeMozneVlozitDoJednohoBalikuResponseDtoNames { SelectedData = "SelectedData", JeMozneVlozit = "JeMozneVlozit",}
	const enum GJeMozneVlozitDoJednohoBalikuResponseDtoFragments { SelectedData = "*", JeMozneVlozit = "*",}
	const enum GJeMozneVlozitDoJednohoBalikuResponseDtoTypes { SelectedData = "Gordic.Wfl.Interface.GSslProfilStruktura", JeMozneVlozit = "boolean",}
	const enum GJeMozneVlozitDoJednohoBalikuResponseDtoTypeLengths {}
	/**GBalikGetRokSkartaceMinimumValueRequestDto*/
	interface GBalikGetRokSkartaceMinimumValueRequestDto {
		/**Ixs balíku.*/
		IxsZup?: string|null;
	}
	const enum GBalikGetRokSkartaceMinimumValueRequestDtoNames { IxsZup = "IxsZup",}
	const enum GBalikGetRokSkartaceMinimumValueRequestDtoFragments { IxsZup = "*",}
	const enum GBalikGetRokSkartaceMinimumValueRequestDtoTypes { IxsZup = "string",}
	const enum GBalikGetRokSkartaceMinimumValueRequestDtoTypeLengths {}
	/**GGetRokSkartaceMinimumValueOutputDto*/
	interface GBalikGetRokSkartaceMinimumValueResponseDto {
		RokSkartaceMinimumValue?: number|null;
		RokPredaniDoSprArchivuMinimumValue?: number|null;
	}
	const enum GBalikGetRokSkartaceMinimumValueResponseDtoNames { RokSkartaceMinimumValue = "RokSkartaceMinimumValue", RokPredaniDoSprArchivuMinimumValue = "RokPredaniDoSprArchivuMinimumValue",}
	const enum GBalikGetRokSkartaceMinimumValueResponseDtoFragments { RokSkartaceMinimumValue = "*", RokPredaniDoSprArchivuMinimumValue = "*",}
	const enum GBalikGetRokSkartaceMinimumValueResponseDtoTypes { RokSkartaceMinimumValue = "number", RokPredaniDoSprArchivuMinimumValue = "number",}
	const enum GBalikGetRokSkartaceMinimumValueResponseDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Gin\IGPisemnostNeevidovana.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Písemnost (dokument / spis) neevidovaná.*/
	interface PisemnostNeevidovana {
		/**Vrátí data neevidovaném dokumentu / spisu. 
		*     V případě, že není zadán identifikátor (Ixp) pak připraví objekt předplnění nového neeivodvaného dokumentu / spisu.
		*/
		read(rq?:Gordic.Spi.Interface.GPisemnostNeevidovanaReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaReadRequestDto>,GServiceReadResponse<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>;
		/**Vrátí seznam neevidovanch dokumentů / spisů dle zadaných kritérií.*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>;
		/**Vytvoří nový neevidovaný dokument / spis.*/
		create(rq?:Gordic.Spi.Interface.GPisemnostNeevidovanaDto|CallParams<GServiceSaveRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>): _Task<GServiceSaveRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>,GServiceSaveResponse<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>;
		/**Aktualizuje data neevidovaného dokumentu / spisu.*/
		update(rq?:Gordic.Spi.Interface.GPisemnostNeevidovanaDto|CallParams<GServiceSaveRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>): _Task<GServiceSaveRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>,GServiceSaveResponse<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>;
		/**Opraví data neevidovaného dokumentu / spisu po kontrole metadat.*/
		opravitPoKontroleMetadat(rq?:Gordic.Spi.Interface.GPisemnostNeevidovanaDto|CallParams<GServiceSaveRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>): _Task<GServiceSaveRequest<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>,GServiceSaveResponse<Gordic.Spi.Interface.GPisemnostNeevidovanaDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		PisemnostNeevidovana: ServiceBase & Catalog.PisemnostNeevidovana;
	}
	const PisemnostNeevidovana: Client["PisemnostNeevidovana"];
}
declare namespace Gordic.Spi.Interface {
	interface GPisemnostNeevidovanaReadRequestDto {
		/**Typ zobrazení písemnosti.*/
		TypZobrazeniEntity?: Gordic.Gin.Interface.TypZobrazeniEntity|null;
		/**Identifikátor balíku.*/
		IxsZup?: string|null;
		/**Identifikátor dokumentu / spisu.*/
		Ixp?: string|null;
		/**Příznak zda je detail otevírán v režimu opravy nealidních položek (po kontrole metadat).*/
		OpravaNevalidnihoPoKontroleMetadat?: boolean|null;
		/**Výsledek kontroly metadat.*/
		VysledekKontrolyMetadat?: Gordic.Wfl.Interface.GSpitkonDto[]|null;
		/**Gets or sets the pouze fyzicka forma.*/
		PouzeFyzickaForma?: boolean|null;
	}
	const enum GPisemnostNeevidovanaReadRequestDtoNames { TypZobrazeniEntity = "TypZobrazeniEntity", IxsZup = "IxsZup", Ixp = "Ixp", OpravaNevalidnihoPoKontroleMetadat = "OpravaNevalidnihoPoKontroleMetadat", VysledekKontrolyMetadat = "VysledekKontrolyMetadat", PouzeFyzickaForma = "PouzeFyzickaForma",}
	const enum GPisemnostNeevidovanaReadRequestDtoFragments { TypZobrazeniEntity = "*", IxsZup = "*", Ixp = "*", OpravaNevalidnihoPoKontroleMetadat = "*", VysledekKontrolyMetadat = "*", PouzeFyzickaForma = "*",}
	const enum GPisemnostNeevidovanaReadRequestDtoTypes { TypZobrazeniEntity = "Gordic.Gin.Interface.TypZobrazeniEntity", IxsZup = "string", Ixp = "string", OpravaNevalidnihoPoKontroleMetadat = "boolean", VysledekKontrolyMetadat = "Gordic.Wfl.Interface.GSpitkonDto[]", PouzeFyzickaForma = "boolean",}
	const enum GPisemnostNeevidovanaReadRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Gin\IGSpisovna.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**IGSpisovna - Obecné metody spisovny.*/
	interface Spisovna {
		/**Vrátí aktuálně dostupné spisovny.*/
		getAktualniSpisovny(rq?:Gordic.Spi.Interface.GGetAktualniSpisovnyActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GGetAktualniSpisovnyActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GGetAktualniSpisovnyActionRequestDto>,GServiceListResponse<Gordic.ControlsLogic.Interface.GSpisspiDto>>;
		/**Vrátí dto spisovny, na kterou je uživatel aktuálně přihlášen.*/
		getAktualneZvolenaSpisovna(rq?:Gordic.Spi.Interface.GGetAktualneZvolenaSpisovnaReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GGetAktualneZvolenaSpisovnaReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GGetAktualneZvolenaSpisovnaReadRequestDto>,GServiceReadResponse<Gordic.ControlsLogic.Interface.GSpisspiDto>>;
		/**Ztratí ze spisovny spis nebo balík.*/
		ztratitZeSpisovny(rq?:Gordic.Spi.Interface.GZtraceniInputDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GZtraceniInputDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GZtraceniInputDto>,GServiceActionResponse<Gordic.Spi.Interface.GZtratitZeSpisovnyActionResponseDto>>;
		/**Ztratí ze l_spisovny spis nebo balík.*/
		ztratitZeSpisovnyHromadne(rq?:Gordic.Spi.Interface.GZtratitZeSpisovnyHromadneRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GZtratitZeSpisovnyHromadneRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GZtratitZeSpisovnyHromadneRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GZtratitZeSpisovnyHromadneResponseDto>>;
		/**Vrátí ztracený dokument, spis nebo balík ze spisovny.*/
		vratitZtracenyZeSpisovny(rq?:Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyActionResponseDto>>;
		/**Vrátí ztracený dokument, spis nebo balík ze l_spisovny.*/
		vratitZtracenyZeSpisovnyHromadne(rq?:Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyHromadneRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyHromadneRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyHromadneRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVratitZtracenyZeSpisovnyHromadneResponseDto>>;
		/**Vypůjčí ze spisovny spis nebo balík.*/
		vypujcitZeSpisovny(rq?:Gordic.Spi.Interface.GVypujcitZeSpisovnyRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GVypujcitZeSpisovnyRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GVypujcitZeSpisovnyRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GVypujcitZeSpisovnyResponseDto>>;
		/**Vypůjčí ze spisovny spis nebo balík.*/
		vypujcitZeSpisovnyHromadne(rq?:Gordic.Spi.Interface.GVypujcitZeSpisovnyHromadneRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujcitZeSpisovnyHromadneRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujcitZeSpisovnyHromadneRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcitZeSpisovnyHromadneResponseDto>>;
		/**Vrátí výpůjčky písemností hromadně.*/
		vratitVypujckuZeSpisovnyHromadne(rq?:Gordic.Spi.Interface.GVratitVypujckuZeSpisovnyHromadneRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVratitVypujckuZeSpisovnyHromadneRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVratitVypujckuZeSpisovnyHromadneRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVratitVypujckuZeSpisovnyHromadneResponseDto>>;
		/**Ztratí výpůjčky písemností hromadně.*/
		ztratitVypujckuZeSpisovnyHromadne(rq?:Gordic.Spi.Interface.GZtratitVypujckuZeSpisovnyHromadneRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GZtratitVypujckuZeSpisovnyHromadneRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GZtratitVypujckuZeSpisovnyHromadneRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GZtratitVypujckuZeSpisovnyHromadneResponseDto>>;
		/**Přemístí dokument / spis (vloží) do jiného balíku.*/
		premistitDokumentSpis(rq?:Gordic.Spi.Interface.GPremistitDokumentSpisActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GPremistitDokumentSpisActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GPremistitDokumentSpisActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GPremistitDokumentSpisActionResponseDto>>;
		/**schválení žádosti o vypujcku*/
		schvalitZadostOVypujcku(rq?:Gordic.Spi.Interface.GSchvalitZadostOVypujckuActionRequestDto|CallParams<GServiceActionRequest<Gordic.Spi.Interface.GSchvalitZadostOVypujckuActionRequestDto>>): _Task<GServiceActionRequest<Gordic.Spi.Interface.GSchvalitZadostOVypujckuActionRequestDto>,GServiceActionResponse<Gordic.Spi.Interface.GSchvalitZadostOVypujckuActionResponseDto>>;
		/**Načte data identintifikátory výpůjčních lístků.*/
		getIdentifikatoryVypujcnihoListku(rq?:Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDto>,GServiceReadResponse<Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuResponseItemDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		Spisovna: ServiceBase & Catalog.Spisovna;
	}
	const Spisovna: Client["Spisovna"];
}
declare namespace Gordic.Spi.Interface {
	/**GSpisovnaFilter*/
	const enum GSpisovnaFilter {
	}
	/**Dto požadavku na vrácení aktuálně dostupných spisoven.*/
	interface GGetAktualniSpisovnyActionRequestDto {
		/**(Default: true) Vybrat pouze spisovny pro aktuální funkci.*/
		PouzePristupneFunkci?: boolean|null;
	}
	const enum GGetAktualniSpisovnyActionRequestDtoNames { PouzePristupneFunkci = "PouzePristupneFunkci",}
	const enum GGetAktualniSpisovnyActionRequestDtoFragments { PouzePristupneFunkci = "*",}
	const enum GGetAktualniSpisovnyActionRequestDtoTypes { PouzePristupneFunkci = "boolean",}
	const enum GGetAktualniSpisovnyActionRequestDtoTypeLengths {}
	/**Dto požadavku na vrácení aktuálně zvolené spisovny.*/
	interface GGetAktualneZvolenaSpisovnaReadRequestDto {
	}
	const enum GGetAktualneZvolenaSpisovnaReadRequestDtoNames {}
	const enum GGetAktualneZvolenaSpisovnaReadRequestDtoFragments {}
	const enum GGetAktualneZvolenaSpisovnaReadRequestDtoTypes {}
	const enum GGetAktualneZvolenaSpisovnaReadRequestDtoTypeLengths {}
	/**Dto odpovědi na ztracení ze spisovny.*/
	interface GZtratitZeSpisovnyActionResponseDto {
	}
	const enum GZtratitZeSpisovnyActionResponseDtoNames {}
	const enum GZtratitZeSpisovnyActionResponseDtoFragments {}
	const enum GZtratitZeSpisovnyActionResponseDtoTypes {}
	const enum GZtratitZeSpisovnyActionResponseDtoTypeLengths {}
	/**Dto požadavku na ztracení ze spisovny.*/
	interface GZtratitZeSpisovnyHromadneRequestDto {
		/**PID.*/
		Items?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**0 - dokument 1 - balík.*/
		Rezim?: number|null;
		/**duvod*/
		Duvod?: string|null;
	}
	const enum GZtratitZeSpisovnyHromadneRequestDtoNames { Items = "Items", Rezim = "Rezim", Duvod = "Duvod",}
	const enum GZtratitZeSpisovnyHromadneRequestDtoFragments { Items = "*", Rezim = "*", Duvod = "*",}
	const enum GZtratitZeSpisovnyHromadneRequestDtoTypes { Items = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Rezim = "number", Duvod = "string",}
	const enum GZtratitZeSpisovnyHromadneRequestDtoTypeLengths {}
	/**Dto odpovědi na ztracení ze spisovny.*/
	interface GZtratitZeSpisovnyHromadneResponseDto {
		/**PID.*/
		Ixp?: string|null;
	}
	const enum GZtratitZeSpisovnyHromadneResponseDtoNames { Ixp = "Ixp",}
	const enum GZtratitZeSpisovnyHromadneResponseDtoFragments { Ixp = "*",}
	const enum GZtratitZeSpisovnyHromadneResponseDtoTypes { Ixp = "string",}
	const enum GZtratitZeSpisovnyHromadneResponseDtoTypeLengths {}
	/**Dto požadavku na vrácení ztraceného ze spisovny.*/
	interface GVratitZtracenyZeSpisovnyActionRequestDto {
		/**PID.*/
		Ixs?: string|null;
		/**0 - dokument 1 - balík.*/
		Rezim?: number|null;
		/**DatumZmeny.*/
		DatumZmeny?: JsonDate|null;
	}
	const enum GVratitZtracenyZeSpisovnyActionRequestDtoNames { Ixs = "Ixs", Rezim = "Rezim", DatumZmeny = "DatumZmeny",}
	const enum GVratitZtracenyZeSpisovnyActionRequestDtoFragments { Ixs = "*", Rezim = "*", DatumZmeny = "*",}
	const enum GVratitZtracenyZeSpisovnyActionRequestDtoTypes { Ixs = "string", Rezim = "number", DatumZmeny = "JsonDate",}
	const enum GVratitZtracenyZeSpisovnyActionRequestDtoTypeLengths {}
	/**Dto odpovědi na vrácení ztraceného ze spisovny.*/
	interface GVratitZtracenyZeSpisovnyActionResponseDto {
	}
	const enum GVratitZtracenyZeSpisovnyActionResponseDtoNames {}
	const enum GVratitZtracenyZeSpisovnyActionResponseDtoFragments {}
	const enum GVratitZtracenyZeSpisovnyActionResponseDtoTypes {}
	const enum GVratitZtracenyZeSpisovnyActionResponseDtoTypeLengths {}
	/**Dto požadavku na vrácení ztraceného ze spisovny.*/
	interface GVratitZtracenyZeSpisovnyHromadneRequestDto {
		/**PID.*/
		Items?: Gordic.General.ApplicationInterface.GIxpDatZmena[]|null;
		/**0 - dokument 1 - balík.*/
		Rezim?: number|null;
	}
	const enum GVratitZtracenyZeSpisovnyHromadneRequestDtoNames { Items = "Items", Rezim = "Rezim",}
	const enum GVratitZtracenyZeSpisovnyHromadneRequestDtoFragments { Items = "*", Rezim = "*",}
	const enum GVratitZtracenyZeSpisovnyHromadneRequestDtoTypes { Items = "Gordic.General.ApplicationInterface.GIxpDatZmena[]", Rezim = "number",}
	const enum GVratitZtracenyZeSpisovnyHromadneRequestDtoTypeLengths {}
	/**Dto odpovědi na vrácení ztraceného ze spisovny.*/
	interface GVratitZtracenyZeSpisovnyHromadneResponseDto {
		/**PID.*/
		Ixp?: string|null;
	}
	const enum GVratitZtracenyZeSpisovnyHromadneResponseDtoNames { Ixp = "Ixp",}
	const enum GVratitZtracenyZeSpisovnyHromadneResponseDtoFragments { Ixp = "*",}
	const enum GVratitZtracenyZeSpisovnyHromadneResponseDtoTypes { Ixp = "string",}
	const enum GVratitZtracenyZeSpisovnyHromadneResponseDtoTypeLengths {}
	/**Dto požadavku na vypůjčení ze spisovny.*/
	interface GVypujcitZeSpisovnyRequestDto {
		/**PID. (IxsObj)*/
		Ixs?: string|null;
		/**Gets or sets the priz sub vyp.*/
		PrizSubVyp?: number|null;
		/**1 - dokument / spis, 2 - balík.*/
		Rezim?: number|null;
		/**Aktuálně zvolená spisovna.*/
		IxsSpi?: string|null;
		/**Gets or sets the ixs su.*/
		IxsSu?: string|null;
		/**Gets or sets the ixs fun.*/
		IxsFun?: string|null;
		/**Gets or sets the ixs esu.*/
		IxsEsu?: string|null;
		/**Gets or sets the lic zast.*/
		LicZast?: string|null;
		/**Gets or sets the por zast.*/
		PorZast?: number|null;
		/**Gets or sets the dat vraceni.*/
		DatVraceni?: JsonDate|null;
		/**Gets or sets the duvod.*/
		Duvod?: string|null;
	}
	const enum GVypujcitZeSpisovnyRequestDtoNames { Ixs = "Ixs", PrizSubVyp = "PrizSubVyp", Rezim = "Rezim", IxsSpi = "IxsSpi", IxsSu = "IxsSu", IxsFun = "IxsFun", IxsEsu = "IxsEsu", LicZast = "LicZast", PorZast = "PorZast", DatVraceni = "DatVraceni", Duvod = "Duvod",}
	const enum GVypujcitZeSpisovnyRequestDtoFragments { Ixs = "*", PrizSubVyp = "*", Rezim = "*", IxsSpi = "*", IxsSu = "*", IxsFun = "*", IxsEsu = "*", LicZast = "*", PorZast = "*", DatVraceni = "*", Duvod = "*",}
	const enum GVypujcitZeSpisovnyRequestDtoTypes { Ixs = "string", PrizSubVyp = "number", Rezim = "number", IxsSpi = "string", IxsSu = "string", IxsFun = "string", IxsEsu = "string", LicZast = "string", PorZast = "number", DatVraceni = "JsonDate", Duvod = "string",}
	const enum GVypujcitZeSpisovnyRequestDtoTypeLengths {}
	/**Dto odpovědi na vypůjčení ze spisovny.*/
	interface GVypujcitZeSpisovnyResponseDto {
		/**Identifikátor (nově vzniklé) výpůjčky.*/
		IxsVyl?: string|null;
	}
	const enum GVypujcitZeSpisovnyResponseDtoNames { IxsVyl = "IxsVyl",}
	const enum GVypujcitZeSpisovnyResponseDtoFragments { IxsVyl = "*",}
	const enum GVypujcitZeSpisovnyResponseDtoTypes { IxsVyl = "string",}
	const enum GVypujcitZeSpisovnyResponseDtoTypeLengths {}
	/**Dto požadavku na vypůjčení ze spisovny.*/
	interface GVypujcitZeSpisovnyHromadneRequestDto {
		/**PID. (IxsObj)*/
		Ixss?: string[]|null;
		/**Gets or sets the priz sub vyp.*/
		PrizSubVyp?: number|null;
		/**1 - dokument / spis, 2 - balík.*/
		Rezim?: number|null;
		/**Aktuálně zvolená spisovna.*/
		IxsSpi?: string|null;
		/**Gets or sets the ixs su.*/
		IxsSu?: string|null;
		/**Gets or sets the ixs fun.*/
		IxsFun?: string|null;
		/**Gets or sets the ixs esu.*/
		IxsEsu?: string|null;
		/**Gets or sets the lic zast.*/
		LicZast?: string|null;
		/**Gets or sets the por zast.*/
		PorZast?: number|null;
		/**Gets or sets the dat vraceni.*/
		DatVraceni?: JsonDate|null;
		/**Gets or sets the duvod.*/
		Duvod?: string|null;
	}
	const enum GVypujcitZeSpisovnyHromadneRequestDtoNames { Ixss = "Ixss", PrizSubVyp = "PrizSubVyp", Rezim = "Rezim", IxsSpi = "IxsSpi", IxsSu = "IxsSu", IxsFun = "IxsFun", IxsEsu = "IxsEsu", LicZast = "LicZast", PorZast = "PorZast", DatVraceni = "DatVraceni", Duvod = "Duvod",}
	const enum GVypujcitZeSpisovnyHromadneRequestDtoFragments { Ixss = "*", PrizSubVyp = "*", Rezim = "*", IxsSpi = "*", IxsSu = "*", IxsFun = "*", IxsEsu = "*", LicZast = "*", PorZast = "*", DatVraceni = "*", Duvod = "*",}
	const enum GVypujcitZeSpisovnyHromadneRequestDtoTypes { Ixss = "string[]", PrizSubVyp = "number", Rezim = "number", IxsSpi = "string", IxsSu = "string", IxsFun = "string", IxsEsu = "string", LicZast = "string", PorZast = "number", DatVraceni = "JsonDate", Duvod = "string",}
	const enum GVypujcitZeSpisovnyHromadneRequestDtoTypeLengths {}
	/**Dto odpovědi na vypůjčení ze spisovny.*/
	interface GVypujcitZeSpisovnyHromadneResponseDto {
		/**PID. (IxsObj)*/
		Ixs?: string|null;
		/**Identifikátor (nově vzniklé) výpůjčky.*/
		IxsVyl?: string|null;
	}
	const enum GVypujcitZeSpisovnyHromadneResponseDtoNames { Ixs = "Ixs", IxsVyl = "IxsVyl",}
	const enum GVypujcitZeSpisovnyHromadneResponseDtoFragments { Ixs = "*", IxsVyl = "*",}
	const enum GVypujcitZeSpisovnyHromadneResponseDtoTypes { Ixs = "string", IxsVyl = "string",}
	const enum GVypujcitZeSpisovnyHromadneResponseDtoTypeLengths {}
	/**Dto požadavku na vypůjčení ze spisovny.*/
	interface GVratitVypujckuZeSpisovnyHromadneRequestDto {
		/**PID. (IxsObj)*/
		Ixps?: string[]|null;
	}
	const enum GVratitVypujckuZeSpisovnyHromadneRequestDtoNames { Ixps = "Ixps",}
	const enum GVratitVypujckuZeSpisovnyHromadneRequestDtoFragments { Ixps = "*",}
	const enum GVratitVypujckuZeSpisovnyHromadneRequestDtoTypes { Ixps = "string[]",}
	const enum GVratitVypujckuZeSpisovnyHromadneRequestDtoTypeLengths {}
	/**Dto odpovědi na vypůjčení ze spisovny.*/
	interface GVratitVypujckuZeSpisovnyHromadneResponseDto {
		/**PID. (IxsObj)*/
		Ixp?: string|null;
	}
	const enum GVratitVypujckuZeSpisovnyHromadneResponseDtoNames { Ixp = "Ixp",}
	const enum GVratitVypujckuZeSpisovnyHromadneResponseDtoFragments { Ixp = "*",}
	const enum GVratitVypujckuZeSpisovnyHromadneResponseDtoTypes { Ixp = "string",}
	const enum GVratitVypujckuZeSpisovnyHromadneResponseDtoTypeLengths {}
	/**Dto požadavku na vypůjčení ze spisovny.*/
	interface GZtratitVypujckuZeSpisovnyHromadneRequestDto {
		/**PID. (IxsObj)*/
		Ixps?: string[]|null;
	}
	const enum GZtratitVypujckuZeSpisovnyHromadneRequestDtoNames { Ixps = "Ixps",}
	const enum GZtratitVypujckuZeSpisovnyHromadneRequestDtoFragments { Ixps = "*",}
	const enum GZtratitVypujckuZeSpisovnyHromadneRequestDtoTypes { Ixps = "string[]",}
	const enum GZtratitVypujckuZeSpisovnyHromadneRequestDtoTypeLengths {}
	/**Dto odpovědi na vypůjčení ze spisovny.*/
	interface GZtratitVypujckuZeSpisovnyHromadneResponseDto {
		/**PID. (IxsObj)*/
		Ixp?: string|null;
	}
	const enum GZtratitVypujckuZeSpisovnyHromadneResponseDtoNames { Ixp = "Ixp",}
	const enum GZtratitVypujckuZeSpisovnyHromadneResponseDtoFragments { Ixp = "*",}
	const enum GZtratitVypujckuZeSpisovnyHromadneResponseDtoTypes { Ixp = "string",}
	const enum GZtratitVypujckuZeSpisovnyHromadneResponseDtoTypeLengths {}
	/**Dto požadavku na přemístění dokumentu / spisu do jiného balíku.*/
	interface GPremistitDokumentSpisActionRequestDto {
		/**Identifikátory dokumentů / spisů, který budou přemístěny.*/
		Ixps?: string[]|null;
		/**Identifikátor balíku, ve kterém je dokument / spis nyní umístěn a bude z něj přesunut pryč.*/
		IxsZupCurrent?: string|null;
		/**Identifikátor balíku, do kterého je dokument / spis přesouván.*/
		IxsZupNew?: string|null;
	}
	const enum GPremistitDokumentSpisActionRequestDtoNames { Ixps = "Ixps", IxsZupCurrent = "IxsZupCurrent", IxsZupNew = "IxsZupNew",}
	const enum GPremistitDokumentSpisActionRequestDtoFragments { Ixps = "*", IxsZupCurrent = "*", IxsZupNew = "*",}
	const enum GPremistitDokumentSpisActionRequestDtoTypes { Ixps = "string[]", IxsZupCurrent = "string", IxsZupNew = "string",}
	const enum GPremistitDokumentSpisActionRequestDtoTypeLengths {}
	/**Dto požadavku na přemístění dokumentu / spisu do jiného balíku.*/
	interface GSchvalitZadostOVypujckuActionRequestDto {
		/**Identifikátor vypujcky*/
		IxsVyl?: string|null;
	}
	const enum GSchvalitZadostOVypujckuActionRequestDtoNames { IxsVyl = "IxsVyl",}
	const enum GSchvalitZadostOVypujckuActionRequestDtoFragments { IxsVyl = "*",}
	const enum GSchvalitZadostOVypujckuActionRequestDtoTypes { IxsVyl = "string",}
	const enum GSchvalitZadostOVypujckuActionRequestDtoTypeLengths {}
	/**Dto požadavku na přemístění dokumentu / spisu do jiného balíku.*/
	interface GAkceSVypujckouEntityActionRequestDto {
		/**Identifikátor entity (dokumentu / spisu) - pokud je vyplněno ixsVyl, není nutno vyplňovat*/
		Ixp?: string|null;
		/**Identifikátor výpůjčního lístku*/
		IxsVyl?: string|null;
		/**Identifikátor entity (dokumentu / spisu)*/
		typAkce?: Gordic.Spi.Interface.TypAkceSVypujckami|null;
		/**Identifikátor entity (dokumentu / spisu)*/
		duvod?: string|null;
	}
	const enum GAkceSVypujckouEntityActionRequestDtoNames { Ixp = "Ixp", IxsVyl = "IxsVyl", typAkce = "typAkce", duvod = "duvod",}
	const enum GAkceSVypujckouEntityActionRequestDtoFragments { Ixp = "*", IxsVyl = "*", typAkce = "*", duvod = "*",}
	const enum GAkceSVypujckouEntityActionRequestDtoTypes { Ixp = "string", IxsVyl = "string", typAkce = "Gordic.Spi.Interface.TypAkceSVypujckami", duvod = "string",}
	const enum GAkceSVypujckouEntityActionRequestDtoTypeLengths {}
	/**Vraceni vypujcky*/
	interface GAkceSVypujckouEntityActionResponseDto {
		/**Identifikátor výpůjčního lístku*/
		IxsVyl?: string|null;
	}
	const enum GAkceSVypujckouEntityActionResponseDtoNames { IxsVyl = "IxsVyl",}
	const enum GAkceSVypujckouEntityActionResponseDtoFragments { IxsVyl = "*",}
	const enum GAkceSVypujckouEntityActionResponseDtoTypes { IxsVyl = "string",}
	const enum GAkceSVypujckouEntityActionResponseDtoTypeLengths {}
	/**Dto odpovědi na přemístění dokumentu / spisu do jiného balíku.*/
	interface GPremistitDokumentSpisActionResponseDto {
	}
	const enum GPremistitDokumentSpisActionResponseDtoNames {}
	const enum GPremistitDokumentSpisActionResponseDtoFragments {}
	const enum GPremistitDokumentSpisActionResponseDtoTypes {}
	const enum GPremistitDokumentSpisActionResponseDtoTypeLengths {}
	/**Dto schvaleni zadosti o vypujckuu.*/
	interface GSchvalitZadostOVypujckuActionResponseDto {
	}
	const enum GSchvalitZadostOVypujckuActionResponseDtoNames {}
	const enum GSchvalitZadostOVypujckuActionResponseDtoFragments {}
	const enum GSchvalitZadostOVypujckuActionResponseDtoTypes {}
	const enum GSchvalitZadostOVypujckuActionResponseDtoTypeLengths {}
	/**Vstupní dto pro načtení identifikátoru výpůjčního lístku.*/
	interface GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDto {
		Items?: Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDto[]|null;
	}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDtoNames { Items = "Items",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDtoFragments { Items = "*",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDtoTypes { Items = "Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDto[]",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuRequestDtoTypeLengths {}
	/**Výstupní dto pro načtení identifikátoru výpůjčního lístku.*/
	interface GSpisovnaGetIdentifikatoryVypujcnihoListkuResponseItemDto {
		Items?: Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDto[]|null;
	}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuResponseItemDtoNames { Items = "Items",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuResponseItemDtoFragments { Items = "*",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuResponseItemDtoTypes { Items = "Gordic.Spi.Interface.GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDto[]",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuResponseItemDtoTypeLengths {}
	interface GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDto extends Gordic.Spi.Interface.GVypujceniWorkDto {
		ixp?: string|null;
	}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDtoNames { ixp = "ixp", ixs_vyl = "ixs_vyl", priz_vyp = "priz_vyp",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDtoFragments { ixp = "*", ixs_vyl = "*", priz_vyp = "*",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDtoTypes { ixp = "string", ixs_vyl = "string", priz_vyp = "number",}
	const enum GSpisovnaGetIdentifikatoryVypujcnihoListkuItemDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Gin\IGUlozneMisto.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Ulozne Misto*/
	interface UlozneMisto {
		/**Vrátí data úložného místa*/
		read(rq?:Gordic.Spi.Interface.GUlozneMistoReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GUlozneMistoReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GUlozneMistoReadRequestDto>,GServiceReadResponse<Gordic.Spi.Interface.GUlozneMistoDto>>;
		/**Vytvoří nové úložného místo*/
		create(rq?:Gordic.Spi.Interface.GUlozneMistoDto|CallParams<GServiceSaveRequest<Gordic.Spi.Interface.GUlozneMistoDto>>): _Task<GServiceSaveRequest<Gordic.Spi.Interface.GUlozneMistoDto>,GServiceSaveResponse<Gordic.Spi.Interface.GUlozneMistoDto>>;
		/**Aktualizuje úložného místo*/
		update(rq?:Gordic.Spi.Interface.GUlozneMistoDto|CallParams<GServiceSaveRequest<Gordic.Spi.Interface.GUlozneMistoDto>>): _Task<GServiceSaveRequest<Gordic.Spi.Interface.GUlozneMistoDto>,GServiceSaveResponse<Gordic.Spi.Interface.GUlozneMistoDto>>;
		/**Zneaktivnit úložného místa*/
		zneaktivnit(rq?:Gordic.Spi.Interface.GUlozneMistoReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GUlozneMistoReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GUlozneMistoReadRequestDto>,GServiceSaveResponse<Gordic.Spi.Interface.GUlozneMistoDto>>;
		/**Zaktivnit úložného místa*/
		zaktivnit(rq?:Gordic.Spi.Interface.GUlozneMistoReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GUlozneMistoReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GUlozneMistoReadRequestDto>,GServiceSaveResponse<Gordic.Spi.Interface.GUlozneMistoDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		UlozneMisto: ServiceBase & Catalog.UlozneMisto;
	}
	const UlozneMisto: Client["UlozneMisto"];
}
declare namespace Gordic.Spi.Interface {
	/**GVratitVypujckuDto*/
	interface GUlozneMistoGroupRequestDto {
		/**Ixp písemností.*/
		Selected?: Gordic.Spi.Interface.GUlozneMistoDto[]|null;
	}
	const enum GUlozneMistoGroupRequestDtoNames { Selected = "Selected",}
	const enum GUlozneMistoGroupRequestDtoFragments { Selected = "*",}
	const enum GUlozneMistoGroupRequestDtoTypes { Selected = "Gordic.Spi.Interface.GUlozneMistoDto[]",}
	const enum GUlozneMistoGroupRequestDtoTypeLengths {}
	/**Dto požadavku na Read vpujcniho listku*/
	interface GUlozneMistoReadRequestDto {
		/**Identifikátor vypujcniho listku*/
		ixs_ulm?: string|null;
		/**Identifikátor vypujcniho listku*/
		priz_nad?: number|null;
		/**Identifikátor vypujcniho listku*/
		ixs_ulm_nad?: string|null;
		/**Identifikátor vypujcniho listku/*/
		dat_zmena?: JsonDate|null;
	}
	const enum GUlozneMistoReadRequestDtoNames { ixs_ulm = "ixs_ulm", priz_nad = "priz_nad", ixs_ulm_nad = "ixs_ulm_nad", dat_zmena = "dat_zmena",}
	const enum GUlozneMistoReadRequestDtoFragments { ixs_ulm = "*", priz_nad = "*", ixs_ulm_nad = "*", dat_zmena = "*",}
	const enum GUlozneMistoReadRequestDtoTypes { ixs_ulm = "string", priz_nad = "number", ixs_ulm_nad = "string", dat_zmena = "JsonDate",}
	const enum GUlozneMistoReadRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Gin\IGVypujcniListek.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Vypujcni listek*/
	interface VypujcniListek {
		/**Vrátí data vypujcniho listku. 
		*     V případě, že není zadán identifikátor (Ixp) pak připraví objekt předplnění nového neeivodvaného dokumentu / spisu.
		*/
		read(rq?:Gordic.Spi.Interface.GVypujcniListekReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GVypujcniListekReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GVypujcniListekReadRequestDto>,GServiceReadResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**Vratit  výpujčku*/
		vratitVypujcku(rq?:Gordic.Spi.Interface.GVypujckaGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**Ztratit  výpujčku*/
		ztratitVypujcku(rq?:Gordic.Spi.Interface.GVypujckaGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**Zmenit termin vraceni výpujčky*/
		zmenitTerminVraceniVypujcky(rq?:Gordic.Spi.Interface.GVypujckaGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**Schvalit žádost o  výpujčku*/
		schvalitZadostOVypujcku(rq?:Gordic.Spi.Interface.GVypujckaGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**zamitnout žádost o  výpujčku*/
		zamitnoutZadostOVypujcku(rq?:Gordic.Spi.Interface.GVypujckaGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**Stornovat žádost o výpujčku*/
		stornovatZadostOVypujcku(rq?:Gordic.Spi.Interface.GVypujckaGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**Stornovat žádost o výpujčku*/
		vypujcitSchvalene(rq?:Gordic.Spi.Interface.GVypujckaGroupRequestDto|CallParams<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>>): _Task<GServiceGroupRequest<Gordic.Spi.Interface.GVypujckaGroupRequestDto>,GServiceGroupResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
		/**Vrátí výpůjční lístek balíku.*/
		getVypujcniListekBaliku(rq?:Gordic.Spi.Interface.GGetVypujcniListekBalikuReadRequestDto|CallParams<GServiceReadRequest<Gordic.Spi.Interface.GGetVypujcniListekBalikuReadRequestDto>>): _Task<GServiceReadRequest<Gordic.Spi.Interface.GGetVypujcniListekBalikuReadRequestDto>,GServiceReadResponse<Gordic.Spi.Interface.GVypujcniListekDto>>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		VypujcniListek: ServiceBase & Catalog.VypujcniListek;
	}
	const VypujcniListek: Client["VypujcniListek"];
}
declare namespace Gordic.Spi.Interface {
	/**GVratitVypujckuDto*/
	interface GVypujckaGroupRequestDto {
		/**datum  vraceni*/
		dat_vraceni?: JsonDate|null;
		/**Ixp písemností*/
		Selected?: Gordic.Spi.Interface.GVypujceniWorkDto[]|null;
		/**duvod*/
		Duvod?: string|null;
	}
	const enum GVypujckaGroupRequestDtoNames { dat_vraceni = "dat_vraceni", Selected = "Selected", Duvod = "Duvod",}
	const enum GVypujckaGroupRequestDtoFragments { dat_vraceni = "*", Selected = "*", Duvod = "*",}
	const enum GVypujckaGroupRequestDtoTypes { dat_vraceni = "JsonDate", Selected = "Gordic.Spi.Interface.GVypujceniWorkDto[]", Duvod = "string",}
	const enum GVypujckaGroupRequestDtoTypeLengths {}
	/**Dto požadavku na Read vpujcniho listku*/
	interface GVypujcniListekReadRequestDto {
		/**Identifikátor vypujcniho listku*/
		ixs_vyl?: string|null;
	}
	const enum GVypujcniListekReadRequestDtoNames { ixs_vyl = "ixs_vyl",}
	const enum GVypujcniListekReadRequestDtoFragments { ixs_vyl = "*",}
	const enum GVypujcniListekReadRequestDtoTypes { ixs_vyl = "string",}
	const enum GVypujcniListekReadRequestDtoTypeLengths {}
	/**Dto požadavku na vrácení výpůjčního lístku balíku.*/
	interface GGetVypujcniListekBalikuReadRequestDto {
		/**Identifikátor balíku pro který hledáme výpůjční lístek.*/
		IxsZup?: string|null;
	}
	const enum GGetVypujcniListekBalikuReadRequestDtoNames { IxsZup = "IxsZup",}
	const enum GGetVypujcniListekBalikuReadRequestDtoFragments { IxsZup = "*",}
	const enum GGetVypujcniListekBalikuReadRequestDtoTypes { IxsZup = "string",}
	const enum GGetVypujcniListekBalikuReadRequestDtoTypeLengths {}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Spi.Interface\Seznamy\Dto\GHledaniBalikuDto.d.ts 

declare namespace Gordic.Spi.Interface {
	/**Hledani baliku Dto*/
	interface GHledaniBalikuDto {
		/**ixs_zup*/
		ixs_zup?: string|null;
		/**Case Sensitive*/
		CaseSensitive?: boolean|null;
		/**hledat i ve vnorenych ULM*/
		HledatIVeVnorenychULM?: boolean|null;
		/**Oblast hledani*/
		oblastHledani?: Gordic.Wfl.Interface.TypOblastHledani|null;
		/**ixs_ulm*/
		ixs_ulm?: string|null;
		/**ixs_spi_akt*/
		ixs_spi_akt?: string|null;
		/**ixs_su_od*/
		ixs_su_od?: string|null;
		/**ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**ixs_fun_od*/
		ixs_fun_od?: string|null;
		/**dat_prij_spi*/
		dat_prij_spi?: Gordic.Wfl.Interface.Lists.WflDateIntervalDto|null;
		/**ixs_zmp_od*/
		ixs_zmp_od?: string|null;
		/**dat_zmena*/
		dat_zmena?: Gordic.Wfl.Interface.Lists.WflDateIntervalDto|null;
		/**... pouze zadasného referenta*/
		Vlastni?: boolean|null;
		/**zrusene - aktivita 900*/
		Zrusene?: boolean|null;
		/**skar_lhuta_spra*/
		skar_lhuta_spra?: number|null;
		/**rok_predani_spra*/
		rok_predani_spra?: number|null;
		/**stav_sul*/
		stav_sul?: number|null;
		/**ixs vsk*/
		ixs_vsk?: string|null;
		/**spis_pl*/
		spis_pl?: string|null;
		/**spis_znak*/
		spis_znak?: string|null;
		/**skar_znak*/
		skar_znak?: string|null;
		/**skar_lhuta*/
		skar_lhuta?: number|null;
		/**priz_skn*/
		priz_skn?: number|null;
		/**priz_vyp*/
		priz_vyp?: number|null;
		/**kod_tyz*/
		kod_tyz?: number|null;
		/**nazev*/
		nazev?: string|null;
		/**popis*/
		popis?: string|null;
		/**poznamka*/
		poznamka?: string|null;
		/**police*/
		police?: string|null;
		/**paprsek*/
		paprsek?: string|null;
		/**vec vlozeneho dokumentu*/
		vecVlozenehoDokumentu?: string|null;
		/**vec podrobne vlozeneho dokumentu*/
		vecPodrobneVlozenehoDokumentu?: string|null;
		/**ixb_aip*/
		ixb_aip?: string|null;
		/**id_ext_spi*/
		id_ext_spi?: string|null;
		/**umisteni*/
		umisteni?: string|null;
		/**budova_kod*/
		budova_kod?: string|null;
		/**segment_kod*/
		segment_kod?: string|null;
		/**mistnost_kod*/
		mistnost_kod?: string|null;
		/**rok_skartace*/
		rok_skartace?: number|null;
	}
	const enum GHledaniBalikuDtoNames { ixs_zup = "ixs_zup", CaseSensitive = "CaseSensitive", HledatIVeVnorenychULM = "HledatIVeVnorenychULM", oblastHledani = "oblastHledani", ixs_ulm = "ixs_ulm", ixs_spi_akt = "ixs_spi_akt", ixs_su_od = "ixs_su_od", ixs_fun_akt = "ixs_fun_akt", ixs_fun_od = "ixs_fun_od", dat_prij_spi = "dat_prij_spi", ixs_zmp_od = "ixs_zmp_od", dat_zmena = "dat_zmena", Vlastni = "Vlastni", Zrusene = "Zrusene", skar_lhuta_spra = "skar_lhuta_spra", rok_predani_spra = "rok_predani_spra", stav_sul = "stav_sul", ixs_vsk = "ixs_vsk", spis_pl = "spis_pl", spis_znak = "spis_znak", skar_znak = "skar_znak", skar_lhuta = "skar_lhuta", priz_skn = "priz_skn", priz_vyp = "priz_vyp", kod_tyz = "kod_tyz", nazev = "nazev", popis = "popis", poznamka = "poznamka", police = "police", paprsek = "paprsek", vecVlozenehoDokumentu = "vecVlozenehoDokumentu", vecPodrobneVlozenehoDokumentu = "vecPodrobneVlozenehoDokumentu", ixb_aip = "ixb_aip", id_ext_spi = "id_ext_spi", umisteni = "umisteni", budova_kod = "budova_kod", segment_kod = "segment_kod", mistnost_kod = "mistnost_kod", rok_skartace = "rok_skartace",}
	const enum GHledaniBalikuDtoFragments { ixs_zup = "*", CaseSensitive = "*", HledatIVeVnorenychULM = "*", oblastHledani = "*", ixs_ulm = "*", ixs_spi_akt = "*", ixs_su_od = "*", ixs_fun_akt = "*", ixs_fun_od = "*", dat_prij_spi = "*", ixs_zmp_od = "*", dat_zmena = "*", Vlastni = "*", Zrusene = "*", skar_lhuta_spra = "*", rok_predani_spra = "*", stav_sul = "*", ixs_vsk = "*", spis_pl = "*", spis_znak = "*", skar_znak = "*", skar_lhuta = "*", priz_skn = "*", priz_vyp = "*", kod_tyz = "*", nazev = "*", popis = "*", poznamka = "*", police = "*", paprsek = "*", vecVlozenehoDokumentu = "*", vecPodrobneVlozenehoDokumentu = "*", ixb_aip = "*", id_ext_spi = "*", umisteni = "*", budova_kod = "*", segment_kod = "*", mistnost_kod = "*", rok_skartace = "*",}
	const enum GHledaniBalikuDtoTypes { ixs_zup = "string", CaseSensitive = "boolean", HledatIVeVnorenychULM = "boolean", oblastHledani = "Gordic.Wfl.Interface.TypOblastHledani", ixs_ulm = "string", ixs_spi_akt = "string", ixs_su_od = "string", ixs_fun_akt = "string", ixs_fun_od = "string", dat_prij_spi = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", ixs_zmp_od = "string", dat_zmena = "Gordic.Wfl.Interface.Lists.WflDateIntervalDto", Vlastni = "boolean", Zrusene = "boolean", skar_lhuta_spra = "number", rok_predani_spra = "number", stav_sul = "number", ixs_vsk = "string", spis_pl = "string", spis_znak = "string", skar_znak = "string", skar_lhuta = "number", priz_skn = "number", priz_vyp = "number", kod_tyz = "number", nazev = "string", popis = "string", poznamka = "string", police = "string", paprsek = "string", vecVlozenehoDokumentu = "string", vecPodrobneVlozenehoDokumentu = "string", ixb_aip = "string", id_ext_spi = "string", umisteni = "string", budova_kod = "string", segment_kod = "string", mistnost_kod = "string", rok_skartace = "number",}
	const enum GHledaniBalikuDtoTypeLengths { police = 20, paprsek = 20,}
}

//#endregion

