/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       sah.interface.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Sah.Interface\Gordic.Sah.Interface.csproj
*    created     2026-02-16 14:34:15
*    files       Dto\GExterniSubjektyDto.d.ts
*                Dto\GKlientDto.d.ts
*                Dto\GKlientSoftwareDto.d.ts
*                Dto\GKlientUpdateDto.d.ts
*                Dto\GObchodniPrilezitostDto.d.ts
*                Dto\GPolozkyCenikDto.d.ts
*                Dto\GProvozniDenikDto.d.ts
*                Isl\Gordic.Sah.Interface.IGProvozniDenik.d.ts
*                Old\Cis\Dto\GRekcpdvDto.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Dto\GExterniSubjektyDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**Externí subjekty*/
	interface GExterniSubjektyDto {
		/**DBCOLUMN:ginsesu.ixs_esu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:ginsesu.lic*/
		lic?: string|null;
		/**DBCOLUMN:ginsesu.aktivita*/
		aktivita?: number|null;
		/**DBCOLUMN:ginsesu.arw*/
		arw?: number|null;
		/**DBCOLUMN:ginsesu.poznamka*/
		poznamka?: string|null;
		/**DBCOLUMN:ginsesu.dat_zmena*/
		dat_zmena?: JsonDate|null;
		/**DBCOLUMN:ginsesu.zmenu_prov*/
		zmenu_prov?: string|null;
		/**Zkratka externího subjektu používaná při vyhledávání*/
		zkratka?: string|null;
		/**DBCOLUMN:ginsesu.nazev*/
		nazev?: string|null;
		/**DBCOLUMN:ginsesu.ob_jmeno*/
		ob_jmeno?: string|null;
		/**DBCOLUMN:ginsesu.typ_esu*/
		typ_esu?: number|null;
		/**DBCOLUMN:ginsesu.stupen_ver*/
		stupen_ver?: number|null;
		/**DBCOLUMN:ginsesu.ixs_nad*/
		ixs_nad?: string|null;
		/**Stát*/
		stat?: number|null;
		/**DBCOLUMN:ginsesu.psc*/
		psc?: string|null;
		/**DBCOLUMN:ginsesu.obec*/
		obec?: string|null;
		/**DBCOLUMN:ginsesu.cast_obce*/
		cast_obce?: string|null;
		/**DBCOLUMN:ginsesu.ulice*/
		ulice?: string|null;
		/**DBCOLUMN:ginsesu.cor*/
		cor?: string|null;
		/**DBCOLUMN:ginsesu.cpop*/
		cpop?: string|null;
		/**DBCOLUMN:ginsesu.ico*/
		ico?: string|null;
		/**DBCOLUMN:ginsesu.dic*/
		dic?: string|null;
		/**DBCOLUMN:ginsesu.tel*/
		tel?: string|null;
		/**DBCOLUMN:ginsesu.mail*/
		mail?: string|null;
		/**DBCOLUMN:ginsesu.fax*/
		fax?: string|null;
		/**DBCOLUMN:ginsesu.ixs_su*/
		ixs_su?: string|null;
		/**DBCOLUMN:ginsesu.priz_eko*/
		priz_eko?: number|null;
		/**DBCOLUMN:ginsesu.priz_int*/
		priz_int?: number|null;
		/**DBCOLUMN:ginsesu.num_pod*/
		num_pod?: number|null;
		/**DBCOLUMN:ginsesu.num_zast*/
		num_zast?: number|null;
		/**DBCOLUMN:ginsesu.cs_nazev*/
		cs_nazev?: string|null;
		/**DBCOLUMN:ginsesu.cs_zkratka*/
		cs_zkratka?: string|null;
		/**DBCOLUMN:ginsesu.typ_org*/
		typ_org?: number|null;
		/**DBCOLUMN:ginsesu.dat_mpd*/
		dat_mpd?: JsonDate|null;
		/**DBCOLUMN:ginsesu.cs_ulice*/
		cs_ulice?: string|null;
		/**DBCOLUMN:ginsesu.cs_obec*/
		cs_obec?: string|null;
		/**DBCOLUMN:ginsesu.esu_txt*/
		esu_txt?: string|null;
		/**DBCOLUMN:ginsesu.rc*/
		rc?: string|null;
		/**Pokud je záznam aktivní obsahuje ixs_esu, pokud je napojen na jiný externí subjekt, obsahuje jeho ixs_esu a jeho aktivita
		*     je 500 (používá se při napojování nepoužívaných nebo duplicitně pořízených záznamů). Použití v aplikacích.
		*           Tento sloupec v tabulce slouží k napojování záznamů v tabulce externích subjektů, u nichž je zřejmé, že jde o jeden externí
		*           subjekt (adresát se přestěhoval, adresa není validně naplněna a podobně).    
		*           Dále je tento sloupec použit, když je při opravě externího subjektu zásadně změněna adresa.
		*/
		ixs_prev?: string|null;
		/**DBCOLUMN:ginsesu.jmeno*/
		jmeno?: string|null;
		/**DBCOLUMN:ginsesu.prijmeni*/
		prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.tit_pred*/
		tit_pred?: string|null;
		/**DBCOLUMN:ginsesu.tit_za*/
		tit_za?: string|null;
		/**DBCOLUMN:ginsesu.pobox*/
		pobox?: string|null;
		/**DBCOLUMN:ginsesu.st1*/
		st1?: string|null;
		/**DBCOLUMN:ginsesu.st2*/
		st2?: string|null;
		/**DBCOLUMN:ginsesu.st3*/
		st3?: string|null;
		/**DBCOLUMN:ginsesu.st4*/
		st4?: string|null;
		/**DBCOLUMN:ginsesu.st5*/
		st5?: string|null;
		/**DBCOLUMN:ginsesu.st6*/
		st6?: string|null;
		/**DBCOLUMN:ginsesu.st7*/
		st7?: string|null;
		/**Slouží k vysledování provedených změn na externím subjektu (pokud byl opravován). Má hodnotu ixs_esu subjektu, z něhož vznikl.*/
		ixs_puv?: string|null;
		/**DBCOLUMN:ginsesu.ixs_obj*/
		ixs_obj?: string|null;
		/**DBCOLUMN:ginsesu.ixs_adr*/
		ixs_adr?: string|null;
		/**DBCOLUMN:ginsesu.ixs_org*/
		ixs_org?: string|null;
		/**DBCOLUMN:ginsesu.ixs_oso*/
		ixs_oso?: string|null;
		/**Externí subjekty, které považujeme za jeden ekonomický budou mít ixs_eko stejný, naplněný identifikátorem
		*     "nejnosnějšího nebo nejhlavnějšího". 
		*     Při ekonomickém „napojování“ externích subjektů se updatují jejich ixs_eko na hodnotu ixs_eko subjektu na nějž
		*     jsou napojovány.
		*     Při vytváření subjektu se zkontroluje, zda neexistuje IČO (nebo RČ) v databázi – pokud ano, bude ixs_eko naplněn
		*     hodnotou jakou mají ostatní subjekty se stejným IČO (nebo RČ), pokud není naplněno IČO má vytvářený subjekt
		*     ixs_eko = ixs_esu.
		*     Při klasickém napojování (napojení pomocí ixs_prev modulem ADK, opravě subjektu, ... ) je provedeno vždy i ekonomické
		*     napojení.
		*     Kontrolní chod (ADT script) může provede spojení externích subjektů, které mají stejné IČO (nebo RČ) pomocí ixs_eko.
		*/
		ixs_eko?: string|null;
		/**Slouží k oddělení množin ESU. Tím je myšleno nastavení viditelnosti a editovatelnosti ESU pro jednotlivé agendy. Použití může být
		*     následující:
		*           Personalisté chtějí vidět ESU s ur_pri = 1 nebo ur_pri = 0 a opravovat (a vytvářet) subjekty s ur_pri = 1 a ur_pri = 0.    
		*           Spisovkáři smějí vidět ESU s ur_pri = 1 a smějí opravovat ESU s ur_pri = 1 - tzn. nevidí ESU pořízené PER (a nemohou je opravovat).   
		*           Administrátor smí vidět ESU s ur_pri = 1 a ur_pri = 0 a opravovat smí jen s ur_pri = 1.   
		*           Při klasickém napojování (napojení pomocí ixs_prev modulem ADK, opravě subjektu, ... ) je provedeno vždy i ekonomické
		*           napojení.   
		*           Kontrolní chod (ADT script) může provede spojení externích subjektů, které mají stejné IČO (nebo RČ) pomocí ixs_eko.    
		*     Tato funkčnost je řízena parametry:
		*     gin_rad_esusaGIN ESU - Úroveň přístupu k externím subjektům (editace)gin_rad_esusapGIN ESU - Úroveň přístupu k externím subjektům (výběr, prohlížení)
		*     Šlo jenom o jednoduchý způsob použití, nastavení parametrů je možno kombinovat tím zabezpečit obsluhu na míru jednotlivým organizacím.
		*     Kromě těchto parametrů, je možné nastavit i parametr pro Externí systém (v modulu INT) pro dávky ESU - nově vytvořené ESU budou mít
		*     potom úroveň přístupu uvedenou v tomto parametru.
		*/
		ur_pri?: number|null;
		/**DBCOLUMN:ginsesu.adresa_kod*/
		adresa_kod?: string|null;
		/**DBCOLUMN:ginsesu.priz_dph*/
		priz_dph?: number|null;
		/**DBCOLUMN:ginsesu.st0*/
		st0?: string|null;
		/**DBCOLUMN:ginsesu.pco*/
		pco?: number|null;
		/**DBCOLUMN:ginsesu.z_int*/
		z_int?: number|null;
		/**DBCOLUMN:ginsesu.typ_ag*/
		typ_ag?: number|null;
		/**DBCOLUMN:ginsesu.neakt_oba_int*/
		neakt_oba_int?: number|null;
		/**Sloupec je vypočítávaný z hodnoty sloupce rc.*/
		dat_nar?: JsonDate|null;
		/**Používá prozatím modul POD v souvislosti s elektronickým podáním.*/
		bio?: JsonDecimal|null;
		/**DBCOLUMN:ginsesu.url*/
		url?: string|null;
		/**DBCOLUMN:ginsesu.typ_upadku*/
		typ_upadku?: number|null;
		/**DBCOLUMN:ginsesu.dat_akt_rob*/
		dat_akt_rob?: JsonDate|null;
		/**DBCOLUMN:ginsesu.kod_o*/
		kod_o?: number|null;
		/**DBCOLUMN:ginsesu.stat_sp*/
		stat_sp?: number|null;
		/**DBCOLUMN:ginsesu.gps_sirka*/
		gps_sirka?: string|null;
		/**DBCOLUMN:ginsesu.gps_delka*/
		gps_delka?: string|null;
		/**DBCOLUMN:ginsesu.priz_umrti*/
		priz_umrti?: number|null;
		/**DBCOLUMN:ginsesu.dat_umrti*/
		dat_umrti?: JsonDate|null;
		/**DBCOLUMN:ginsesu.ixs_lpc*/
		ixs_lpc?: string|null;
		/**DBCOLUMN:ginsesu.oc*/
		oc?: string|null;
		/**DBCOLUMN:ginsesu.pohlavi*/
		pohlavi?: number|null;
		/**DBCOLUMN:ginsesu.rod_stav*/
		rod_stav?: number|null;
		/**DBCOLUMN:ginsesu.typ_adr*/
		typ_adr?: number|null;
		/**DBCOLUMN:ginsesu.s_pruk*/
		s_pruk?: number|null;
		/**DBCOLUMN:ginsesu.rod_prijmeni*/
		rod_prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.misto_nar*/
		misto_nar?: string|null;
		/**DBCOLUMN:ginsesu.prezdivka*/
		prezdivka?: string|null;
		/**DBCOLUMN:ginsesu.ixs_esu_zam*/
		ixs_esu_zam?: string|null;
		/**DBCOLUMN:ginsesu.id_ds*/
		id_ds?: string|null;
		/**DBCOLUMN:ginsesu.id_gex*/
		id_gex?: string|null;
		/**DBCOLUMN:ginsesu.partner_uct*/
		partner_uct?: string|null;
		/**DBCOLUMN:ginsesu.mi_jmeno*/
		mi_jmeno?: string|null;
		/**DBCOLUMN:ginsesu.mi_prijmeni*/
		mi_prijmeni?: string|null;
		/**DBCOLUMN:ginsesu.up_nazev*/
		up_nazev?: string|null;
		/**DBCOLUMN:ginsesu.up_prijmeni*/
		up_prijmeni?: string|null;
	}
	const enum GExterniSubjektyDtoNames { ixs_esu = "ixs_esu", lic = "lic", aktivita = "aktivita", arw = "arw", poznamka = "poznamka", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", zkratka = "zkratka", nazev = "nazev", ob_jmeno = "ob_jmeno", typ_esu = "typ_esu", stupen_ver = "stupen_ver", ixs_nad = "ixs_nad", stat = "stat", psc = "psc", obec = "obec", cast_obce = "cast_obce", ulice = "ulice", cor = "cor", cpop = "cpop", ico = "ico", dic = "dic", tel = "tel", mail = "mail", fax = "fax", ixs_su = "ixs_su", priz_eko = "priz_eko", priz_int = "priz_int", num_pod = "num_pod", num_zast = "num_zast", cs_nazev = "cs_nazev", cs_zkratka = "cs_zkratka", typ_org = "typ_org", dat_mpd = "dat_mpd", cs_ulice = "cs_ulice", cs_obec = "cs_obec", esu_txt = "esu_txt", rc = "rc", ixs_prev = "ixs_prev", jmeno = "jmeno", prijmeni = "prijmeni", tit_pred = "tit_pred", tit_za = "tit_za", pobox = "pobox", st1 = "st1", st2 = "st2", st3 = "st3", st4 = "st4", st5 = "st5", st6 = "st6", st7 = "st7", ixs_puv = "ixs_puv", ixs_obj = "ixs_obj", ixs_adr = "ixs_adr", ixs_org = "ixs_org", ixs_oso = "ixs_oso", ixs_eko = "ixs_eko", ur_pri = "ur_pri", adresa_kod = "adresa_kod", priz_dph = "priz_dph", st0 = "st0", pco = "pco", z_int = "z_int", typ_ag = "typ_ag", neakt_oba_int = "neakt_oba_int", dat_nar = "dat_nar", bio = "bio", url = "url", typ_upadku = "typ_upadku", dat_akt_rob = "dat_akt_rob", kod_o = "kod_o", stat_sp = "stat_sp", gps_sirka = "gps_sirka", gps_delka = "gps_delka", priz_umrti = "priz_umrti", dat_umrti = "dat_umrti", ixs_lpc = "ixs_lpc", oc = "oc", pohlavi = "pohlavi", rod_stav = "rod_stav", typ_adr = "typ_adr", s_pruk = "s_pruk", rod_prijmeni = "rod_prijmeni", misto_nar = "misto_nar", prezdivka = "prezdivka", ixs_esu_zam = "ixs_esu_zam", id_ds = "id_ds", id_gex = "id_gex", partner_uct = "partner_uct", mi_jmeno = "mi_jmeno", mi_prijmeni = "mi_prijmeni", up_nazev = "up_nazev", up_prijmeni = "up_prijmeni",}
	const enum GExterniSubjektyDtoFragments { ixs_esu = "*", lic = "*", aktivita = "*", arw = "*", poznamka = "*", dat_zmena = "*", zmenu_prov = "*", zkratka = "*", nazev = "*", ob_jmeno = "*", typ_esu = "*", stupen_ver = "*", ixs_nad = "*", stat = "*", psc = "*", obec = "*", cast_obce = "*", ulice = "*", cor = "*", cpop = "*", ico = "*", dic = "*", tel = "*", mail = "*", fax = "*", ixs_su = "*", priz_eko = "*", priz_int = "*", num_pod = "*", num_zast = "*", cs_nazev = "*", cs_zkratka = "*", typ_org = "*", dat_mpd = "*", cs_ulice = "*", cs_obec = "*", esu_txt = "*", rc = "*", ixs_prev = "*", jmeno = "*", prijmeni = "*", tit_pred = "*", tit_za = "*", pobox = "*", st1 = "*", st2 = "*", st3 = "*", st4 = "*", st5 = "*", st6 = "*", st7 = "*", ixs_puv = "*", ixs_obj = "*", ixs_adr = "*", ixs_org = "*", ixs_oso = "*", ixs_eko = "*", ur_pri = "*", adresa_kod = "*", priz_dph = "*", st0 = "*", pco = "*", z_int = "*", typ_ag = "*", neakt_oba_int = "*", dat_nar = "*", bio = "*", url = "*", typ_upadku = "*", dat_akt_rob = "*", kod_o = "*", stat_sp = "*", gps_sirka = "*", gps_delka = "*", priz_umrti = "*", dat_umrti = "*", ixs_lpc = "*", oc = "*", pohlavi = "*", rod_stav = "*", typ_adr = "*", s_pruk = "*", rod_prijmeni = "*", misto_nar = "*", prezdivka = "*", ixs_esu_zam = "*", id_ds = "*", id_gex = "*", partner_uct = "*", mi_jmeno = "*", mi_prijmeni = "*", up_nazev = "*", up_prijmeni = "*",}
	const enum GExterniSubjektyDtoTypes { ixs_esu = "string", lic = "string", aktivita = "number", arw = "number", poznamka = "string", dat_zmena = "JsonDate", zmenu_prov = "string", zkratka = "string", nazev = "string", ob_jmeno = "string", typ_esu = "number", stupen_ver = "number", ixs_nad = "string", stat = "number", psc = "string", obec = "string", cast_obce = "string", ulice = "string", cor = "string", cpop = "string", ico = "string", dic = "string", tel = "string", mail = "string", fax = "string", ixs_su = "string", priz_eko = "number", priz_int = "number", num_pod = "number", num_zast = "number", cs_nazev = "string", cs_zkratka = "string", typ_org = "number", dat_mpd = "JsonDate", cs_ulice = "string", cs_obec = "string", esu_txt = "string", rc = "string", ixs_prev = "string", jmeno = "string", prijmeni = "string", tit_pred = "string", tit_za = "string", pobox = "string", st1 = "string", st2 = "string", st3 = "string", st4 = "string", st5 = "string", st6 = "string", st7 = "string", ixs_puv = "string", ixs_obj = "string", ixs_adr = "string", ixs_org = "string", ixs_oso = "string", ixs_eko = "string", ur_pri = "number", adresa_kod = "string", priz_dph = "number", st0 = "string", pco = "number", z_int = "number", typ_ag = "number", neakt_oba_int = "number", dat_nar = "JsonDate", bio = "JsonDecimal", url = "string", typ_upadku = "number", dat_akt_rob = "JsonDate", kod_o = "number", stat_sp = "number", gps_sirka = "string", gps_delka = "string", priz_umrti = "number", dat_umrti = "JsonDate", ixs_lpc = "string", oc = "string", pohlavi = "number", rod_stav = "number", typ_adr = "number", s_pruk = "number", rod_prijmeni = "string", misto_nar = "string", prezdivka = "string", ixs_esu_zam = "string", id_ds = "string", id_gex = "string", partner_uct = "string", mi_jmeno = "string", mi_prijmeni = "string", up_nazev = "string", up_prijmeni = "string",}
	const enum GExterniSubjektyDtoTypeLengths { ixs_esu = 12, lic = 4, poznamka = 254, zmenu_prov = 12, zkratka = 16, nazev = 100, ob_jmeno = 254, ixs_nad = 12, psc = 12, obec = 48, cast_obce = 48, ulice = 48, cor = 6, cpop = 8, ico = 14, dic = 15, tel = 33, mail = 254, fax = 33, ixs_su = 12, cs_nazev = 100, cs_zkratka = 16, cs_ulice = 48, cs_obec = 48, esu_txt = 254, rc = 10, ixs_prev = 12, jmeno = 100, prijmeni = 100, tit_pred = 35, tit_za = 35, pobox = 8, st1 = 50, st2 = 50, st3 = 50, st4 = 50, st5 = 50, st6 = 50, st7 = 50, ixs_puv = 12, ixs_obj = 12, ixs_adr = 12, ixs_org = 12, ixs_oso = 12, ixs_eko = 12, adresa_kod = 10, st0 = 50, url = 254, gps_sirka = 12, gps_delka = 12, ixs_lpc = 12, oc = 30, rod_prijmeni = 100, misto_nar = 48, prezdivka = 254, ixs_esu_zam = 12, id_ds = 100, id_gex = 100, partner_uct = 10, mi_jmeno = 100, mi_prijmeni = 100, up_nazev = 100, up_prijmeni = 100,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Dto\GKlientDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**Klient*/
	interface GKlientDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor klienta*/
		ixs_kli?: string|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**Typ klienta*/
		klient_typ?: number|null;
		/**Druh klienta*/
		klient_druh?: number|null;
		/**Stav klienta*/
		klient_stav?: number|null;
		/**Kraj*/
		kraj?: number|null;
		/**Licence*/
		licence?: string|null;
		/**DBCOLUMN:rekskli.orj_dis*/
		orj_dis?: string|null;
		/**DBCOLUMN:rekskli.orj_var*/
		orj_var?: string|null;
		/**Datum smlouvy*/
		datum_sml?: JsonDate|null;
		/**Identifikátor smlouvy*/
		ixp_sml?: string|null;
		/**Datum zařazení*/
		datum_zarad?: JsonDate|null;
		/**Datum vyřazení*/
		datum_vyrad?: JsonDate|null;
		/**Id Klienta*/
		id_klient?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rekskli.orj_var_g0*/
		orj_var_g0?: string|null;
		/**DBCOLUMN:rekskli.orj_var_g3*/
		orj_var_g3?: string|null;
		/**DBCOLUMN:rekskli.id_pvp_impl*/
		id_pvp_impl?: number|null;
		/**Identifikátor zřizovatele*/
		ixs_esu_zri?: string|null;
		/**Identifikátor zpracovatele*/
		ixs_esu_zprac?: string|null;
		/**Popis vyřazení*/
		popis_vyrad?: string|null;
		/**Importované ičo*/
		ico_import?: string|null;
		/**DBCOLUMN:rekskli.ixs_kls*/
		ixs_kls?: string|null;
		/**Zdroj*/
		zdroj?: number|null;
		/**Id okresu*/
		id_okres?: string|null;
		/**DBCOLUMN:rekskli.orj_vp*/
		orj_vp?: string|null;
		/**DBCOLUMN:rekskli.orj_zvp*/
		orj_zvp?: string|null;
		/**DBCOLUMN:rekskli.orj_him*/
		orj_him?: string|null;
		/**DBCOLUMN:rekskli.s_itx*/
		s_itx?: number|null;
		/**Velikost*/
		velikost?: number|null;
		/**Oznámení*/
		oznameni?: number|null;
		/**DBCOLUMN:rekskli.s_pap*/
		s_pap?: number|null;
		/**Id kraje*/
		id_kraj?: string|null;
		/**Klient*/
		klient?: number|null;
		/**DBCOLUMN:rekskli.s_dph*/
		s_dph?: number|null;
		/**Identifikátor spisu*/
		ixp_spis?: string|null;
		/**DBCOLUMN:rekskli.ixs_esu_dpo*/
		ixs_esu_dpo?: string|null;
		/**DBCOLUMN:rekskli.orj_dpo*/
		orj_dpo?: string|null;
		/**DBCOLUMN:rekskli.mail_fakturace*/
		mail_fakturace?: string|null;
		/**DBCOLUMN:rekskli.s_fakturace*/
		s_fakturace?: number|null;
		/**DBCOLUMN:rekskli.s_novinky*/
		s_novinky?: number|null;
		/**DBCOLUMN:rekskli.s_nabidky*/
		s_nabidky?: number|null;
		/**DBCOLUMN:rekskli.ixs_arc*/
		ixs_arc?: string|null;
		/**DBCOLUMN:rekskli.s_hotovo*/
		s_hotovo?: number|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Externí subjekty*/
		ExterniSubjekty?: Gordic.Sah.Interface.GExterniSubjektyDto|null;
	}
	const enum GKlientDtoNames { ixs_kli = "ixs_kli", ixs_esu = "ixs_esu", klient_typ = "klient_typ", klient_druh = "klient_druh", klient_stav = "klient_stav", kraj = "kraj", licence = "licence", orj_dis = "orj_dis", orj_var = "orj_var", datum_sml = "datum_sml", ixp_sml = "ixp_sml", datum_zarad = "datum_zarad", datum_vyrad = "datum_vyrad", id_klient = "id_klient", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", orj_var_g0 = "orj_var_g0", orj_var_g3 = "orj_var_g3", id_pvp_impl = "id_pvp_impl", ixs_esu_zri = "ixs_esu_zri", ixs_esu_zprac = "ixs_esu_zprac", popis_vyrad = "popis_vyrad", ico_import = "ico_import", ixs_kls = "ixs_kls", zdroj = "zdroj", id_okres = "id_okres", orj_vp = "orj_vp", orj_zvp = "orj_zvp", orj_him = "orj_him", s_itx = "s_itx", velikost = "velikost", oznameni = "oznameni", s_pap = "s_pap", id_kraj = "id_kraj", klient = "klient", s_dph = "s_dph", ixp_spis = "ixp_spis", ixs_esu_dpo = "ixs_esu_dpo", orj_dpo = "orj_dpo", mail_fakturace = "mail_fakturace", s_fakturace = "s_fakturace", s_novinky = "s_novinky", s_nabidky = "s_nabidky", ixs_arc = "ixs_arc", s_hotovo = "s_hotovo", Zmena = "Zmena", ExterniSubjekty = "ExterniSubjekty", Permissions = "Permissions",}
	const enum GKlientDtoFragments { ixs_kli = "Base", ixs_esu = "Base", klient_typ = "Base", klient_druh = "Base", klient_stav = "Base", kraj = "Base", licence = "Base", orj_dis = "Base", orj_var = "Base", datum_sml = "Base", ixp_sml = "Base", datum_zarad = "Base", datum_vyrad = "Base", id_klient = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", orj_var_g0 = "Base", orj_var_g3 = "Base", id_pvp_impl = "Base", ixs_esu_zri = "Base", ixs_esu_zprac = "Base", popis_vyrad = "Base", ico_import = "Base", ixs_kls = "Base", zdroj = "Base", id_okres = "Base", orj_vp = "Base", orj_zvp = "Base", orj_him = "Base", s_itx = "Base", velikost = "Base", oznameni = "Base", s_pap = "Base", id_kraj = "Base", klient = "Base", s_dph = "Base", ixp_spis = "Base", ixs_esu_dpo = "Base", orj_dpo = "Base", mail_fakturace = "Base", s_fakturace = "Base", s_novinky = "Base", s_nabidky = "Base", ixs_arc = "Base", s_hotovo = "Base", Zmena = "ZMENA", ExterniSubjekty = "EXTERNISUBJEKTY", Permissions = "*",}
	const enum GKlientDtoTypes { ixs_kli = "string", ixs_esu = "string", klient_typ = "number", klient_druh = "number", klient_stav = "number", kraj = "number", licence = "string", orj_dis = "string", orj_var = "string", datum_sml = "JsonDate", ixp_sml = "string", datum_zarad = "JsonDate", datum_vyrad = "JsonDate", id_klient = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", orj_var_g0 = "string", orj_var_g3 = "string", id_pvp_impl = "number", ixs_esu_zri = "string", ixs_esu_zprac = "string", popis_vyrad = "string", ico_import = "string", ixs_kls = "string", zdroj = "number", id_okres = "string", orj_vp = "string", orj_zvp = "string", orj_him = "string", s_itx = "number", velikost = "number", oznameni = "number", s_pap = "number", id_kraj = "string", klient = "number", s_dph = "number", ixp_spis = "string", ixs_esu_dpo = "string", orj_dpo = "string", mail_fakturace = "string", s_fakturace = "number", s_novinky = "number", s_nabidky = "number", ixs_arc = "string", s_hotovo = "number", Zmena = "Gordic.Gin.Interface.GGinszmpDto", ExterniSubjekty = "Gordic.Sah.Interface.GExterniSubjektyDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GKlientDtoTypeLengths { ixs_kli = 12, ixs_esu = 12, licence = 4, orj_dis = 4, orj_var = 4, ixp_sml = 12, poznamka = 254, zmenu_prov = 12, orj_var_g0 = 4, orj_var_g3 = 4, ixs_esu_zri = 12, ixs_esu_zprac = 12, popis_vyrad = 254, ico_import = 10, ixs_kls = 12, id_okres = 6, orj_vp = 4, orj_zvp = 4, orj_him = 4, id_kraj = 5, ixp_spis = 12, ixs_esu_dpo = 12, orj_dpo = 4, mail_fakturace = 100, ixs_arc = 12,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Dto\GKlientSoftwareDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**Software klienta*/
	interface GKlientSoftwareDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor klienta*/
		ixs_kli?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Položka*/
		polozka?: string|null;
		/**Podpoložka*/
		podpolozka?: string|null;
		/**Cena*/
		cena?: JsonDecimal|null;
		/**Instalace*/
		instalace?: number|null;
		/**Počet*/
		pocet?: number|null;
		/**Datum smlouvy*/
		datum_sml?: JsonDate|null;
		/**Identifikátor smlouvy*/
		ixp_sml?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**DBCOLUMN:rekssof.ixs_esu_org_lic*/
		ixs_esu_org_lic?: string|null;
		/**DBCOLUMN:rekssof.ixs_esu_org_met*/
		ixs_esu_org_met?: string|null;
		/**Počet PC*/
		pocet_pc?: number|null;
		/**Počet ičo*/
		pocet_ico?: number|null;
		/**DBCOLUMN:rekssof.typ_ops*/
		typ_ops?: number|null;
		/**DBCOLUMN:rekssof.typ_upd*/
		typ_upd?: number|null;
		/**DBCOLUMN:rekssof.koef*/
		koef?: JsonDecimal|null;
		/**Příplatek*/
		priplatek?: number|null;
		/**DBCOLUMN:rekssof.datum_prvni*/
		datum_prvni?: JsonDate|null;
		/**DBCOLUMN:rekssof.dl_prvni*/
		dl_prvni?: string|null;
		/**Datum vyřazení*/
		datum_vyrad?: JsonDate|null;
		/**Popis vyřazení*/
		popis_vyrad?: string|null;
		/**DBCOLUMN:rekssof.klient_stav*/
		klient_stav?: number|null;
		/**DBCOLUMN:rekssof.orj*/
		orj?: string|null;
		/**DBCOLUMN:rekssof.orj_var*/
		orj_var?: string|null;
		/**DBCOLUMN:rekssof.ixs_esu_spr*/
		ixs_esu_spr?: string|null;
		/**DBCOLUMN:rekssof.lic_zast_spr*/
		lic_zast_spr?: string|null;
		/**DBCOLUMN:rekssof.por_zast_spr*/
		por_zast_spr?: number|null;
		/**Licence*/
		licence?: string|null;
		/**Zdroj SW*/
		zdroj_sw?: number|null;
		/**DBCOLUMN:rekssof.s_prepocet*/
		s_prepocet?: number|null;
		/**DBCOLUMN:rekssof.ixs_esu_data*/
		ixs_esu_data?: string|null;
		/**Rozvrh*/
		rozvrh?: number|null;
		/**DBCOLUMN:rekssof.cfs*/
		cfs?: number|null;
		/**DBCOLUMN:rekssof.ozn_distrib*/
		ozn_distrib?: string|null;
		/**DBCOLUMN:rekssof.s_pol*/
		s_pol?: number|null;
		/**DBCOLUMN:rekssof.s_pol_primo*/
		s_pol_primo?: number|null;
		/**Popis položky*/
		pol_popis?: string|null;
		/**DBCOLUMN:rekssof.s_edit*/
		s_edit?: number|null;
		/**DBCOLUMN:rekssof.ixs_kli_nad*/
		ixs_kli_nad?: string|null;
		/**DBCOLUMN:rekssof.por_cislo_nad*/
		por_cislo_nad?: number|null;
		/**Druh licence*/
		druh_lic?: number|null;
		/**DBCOLUMN:rekssof.s_nekontr*/
		s_nekontr?: number|null;
		/**DBCOLUMN:rekssof.koef_duvod*/
		koef_duvod?: string|null;
		/**Licence*/
		lic?: string|null;
		/**DBCOLUMN:rekssof.ixs_arc*/
		ixs_arc?: string|null;
		/**Klient*/
		klient?: number|null;
		/**DBCOLUMN:rekssof.ixp_konec*/
		ixp_konec?: string|null;
		/**DBCOLUMN:rekssof.ixs_cld*/
		ixs_cld?: string|null;
		/**Balíček*/
		balicek?: number|null;
		/**Základní cena*/
		cena_zakladni?: JsonDecimal|null;
		/**Cena rozšíření*/
		cena_rozsireni?: JsonDecimal|null;
		/**Datum smlouvy do*/
		datum_sml_do?: JsonDate|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**Externí subjekty*/
		ExterniSubjekty?: Gordic.Sah.Interface.GExterniSubjektyDto|null;
		/**Externí subjekty*/
		ExterniSubjekty_prev?: Gordic.Sah.Interface.GExterniSubjektyDto|null;
		/**GPolozkyCenikDto*/
		PolozkyCenik?: Gordic.Sah.Interface.GPolozkyCenikDto|null;
		/**GKlientDto*/
		KlientSah?: Gordic.Sah.Interface.GKlientDto|null;
		/**GKlientFakturaceDto*/
		Fakturace?: Gordic.Sah.Interface.GKlientUpdateDto|null;
		/**reksorj_nazev_orj*/
		reksorj_nazev_orj?: string|null;
		/**reksorj_nazev_orj_var*/
		reksorj_nazev_orj_var?: string|null;
		/**rekvpol_popis*/
		rekvpol_popis?: string|null;
		/**rekvpol_castka*/
		rekvpol_castka?: string|null;
		/**rekcrad_rada_txt*/
		rekcrad_rada_txt?: string|null;
		/**rekcins_instalace_txt*/
		rekcins_instalace_txt?: string|null;
		/**rekcupd_typ_upd_txt*/
		rekcupd_typ_upd_txt?: string|null;
		/**typ_instalace*/
		typ_instalace?: number|null;
		/**pocet_verzi*/
		pocet_verzi?: number|null;
		/**rekccfs_cfs_zkratka_txt*/
		rekccfs_cfs_zkratka_txt?: string|null;
		/**rekcuro_rozvrh_txt*/
		rekcuro_rozvrh_txt?: string|null;
	}
	const enum GKlientSoftwareDtoNames { ixs_kli = "ixs_kli", por_cislo = "por_cislo", polozka = "polozka", podpolozka = "podpolozka", cena = "cena", instalace = "instalace", pocet = "pocet", datum_sml = "datum_sml", ixp_sml = "ixp_sml", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_esu_org_lic = "ixs_esu_org_lic", ixs_esu_org_met = "ixs_esu_org_met", pocet_pc = "pocet_pc", pocet_ico = "pocet_ico", typ_ops = "typ_ops", typ_upd = "typ_upd", koef = "koef", priplatek = "priplatek", datum_prvni = "datum_prvni", dl_prvni = "dl_prvni", datum_vyrad = "datum_vyrad", popis_vyrad = "popis_vyrad", klient_stav = "klient_stav", orj = "orj", orj_var = "orj_var", ixs_esu_spr = "ixs_esu_spr", lic_zast_spr = "lic_zast_spr", por_zast_spr = "por_zast_spr", licence = "licence", zdroj_sw = "zdroj_sw", s_prepocet = "s_prepocet", ixs_esu_data = "ixs_esu_data", rozvrh = "rozvrh", cfs = "cfs", ozn_distrib = "ozn_distrib", s_pol = "s_pol", s_pol_primo = "s_pol_primo", pol_popis = "pol_popis", s_edit = "s_edit", ixs_kli_nad = "ixs_kli_nad", por_cislo_nad = "por_cislo_nad", druh_lic = "druh_lic", s_nekontr = "s_nekontr", koef_duvod = "koef_duvod", lic = "lic", ixs_arc = "ixs_arc", klient = "klient", ixp_konec = "ixp_konec", ixs_cld = "ixs_cld", balicek = "balicek", cena_zakladni = "cena_zakladni", cena_rozsireni = "cena_rozsireni", datum_sml_do = "datum_sml_do", Zmena = "Zmena", ExterniSubjekty = "ExterniSubjekty", ExterniSubjekty_prev = "ExterniSubjekty_prev", PolozkyCenik = "PolozkyCenik", KlientSah = "KlientSah", Fakturace = "Fakturace", reksorj_nazev_orj = "reksorj_nazev_orj", reksorj_nazev_orj_var = "reksorj_nazev_orj_var", rekvpol_popis = "rekvpol_popis", rekvpol_castka = "rekvpol_castka", rekcrad_rada_txt = "rekcrad_rada_txt", rekcins_instalace_txt = "rekcins_instalace_txt", rekcupd_typ_upd_txt = "rekcupd_typ_upd_txt", typ_instalace = "typ_instalace", pocet_verzi = "pocet_verzi", rekccfs_cfs_zkratka_txt = "rekccfs_cfs_zkratka_txt", rekcuro_rozvrh_txt = "rekcuro_rozvrh_txt", Permissions = "Permissions",}
	const enum GKlientSoftwareDtoFragments { ixs_kli = "Base", por_cislo = "Base", polozka = "Base", podpolozka = "Base", cena = "Base", instalace = "Base", pocet = "Base", datum_sml = "Base", ixp_sml = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_esu_org_lic = "Base", ixs_esu_org_met = "Base", pocet_pc = "Base", pocet_ico = "Base", typ_ops = "Base", typ_upd = "Base", koef = "Base", priplatek = "Base", datum_prvni = "Base", dl_prvni = "Base", datum_vyrad = "Base", popis_vyrad = "Base", klient_stav = "Base", orj = "Base", orj_var = "Base", ixs_esu_spr = "Base", lic_zast_spr = "Base", por_zast_spr = "Base", licence = "Base", zdroj_sw = "Base", s_prepocet = "Base", ixs_esu_data = "Base", rozvrh = "Base", cfs = "Base", ozn_distrib = "Base", s_pol = "Base", s_pol_primo = "Base", pol_popis = "Base", s_edit = "Base", ixs_kli_nad = "Base", por_cislo_nad = "Base", druh_lic = "Base", s_nekontr = "Base", koef_duvod = "Base", lic = "Base", ixs_arc = "Base", klient = "Base", ixp_konec = "Base", ixs_cld = "Base", balicek = "Base", cena_zakladni = "Base", cena_rozsireni = "Base", datum_sml_do = "Base", Zmena = "ZMENA", ExterniSubjekty = "EXTERNISUBJEKTY", ExterniSubjekty_prev = "EXTERNISUBJEKTY", PolozkyCenik = "POLOZKYCENIK", KlientSah = "KLIENT", Fakturace = "FAKTURACE", reksorj_nazev_orj = "Extended", reksorj_nazev_orj_var = "Extended", rekvpol_popis = "Extended", rekvpol_castka = "Extended", rekcrad_rada_txt = "Extended", rekcins_instalace_txt = "Extended", rekcupd_typ_upd_txt = "Extended", typ_instalace = "Extended", pocet_verzi = "Extended", rekccfs_cfs_zkratka_txt = "Extended", rekcuro_rozvrh_txt = "Extended", Permissions = "*",}
	const enum GKlientSoftwareDtoTypes { ixs_kli = "string", por_cislo = "number", polozka = "string", podpolozka = "string", cena = "JsonDecimal", instalace = "number", pocet = "number", datum_sml = "JsonDate", ixp_sml = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_esu_org_lic = "string", ixs_esu_org_met = "string", pocet_pc = "number", pocet_ico = "number", typ_ops = "number", typ_upd = "number", koef = "JsonDecimal", priplatek = "number", datum_prvni = "JsonDate", dl_prvni = "string", datum_vyrad = "JsonDate", popis_vyrad = "string", klient_stav = "number", orj = "string", orj_var = "string", ixs_esu_spr = "string", lic_zast_spr = "string", por_zast_spr = "number", licence = "string", zdroj_sw = "number", s_prepocet = "number", ixs_esu_data = "string", rozvrh = "number", cfs = "number", ozn_distrib = "string", s_pol = "number", s_pol_primo = "number", pol_popis = "string", s_edit = "number", ixs_kli_nad = "string", por_cislo_nad = "number", druh_lic = "number", s_nekontr = "number", koef_duvod = "string", lic = "string", ixs_arc = "string", klient = "number", ixp_konec = "string", ixs_cld = "string", balicek = "number", cena_zakladni = "JsonDecimal", cena_rozsireni = "JsonDecimal", datum_sml_do = "JsonDate", Zmena = "Gordic.Gin.Interface.GGinszmpDto", ExterniSubjekty = "Gordic.Sah.Interface.GExterniSubjektyDto", ExterniSubjekty_prev = "Gordic.Sah.Interface.GExterniSubjektyDto", PolozkyCenik = "Gordic.Sah.Interface.GPolozkyCenikDto", KlientSah = "Gordic.Sah.Interface.GKlientDto", Fakturace = "Gordic.Sah.Interface.GKlientUpdateDto", reksorj_nazev_orj = "string", reksorj_nazev_orj_var = "string", rekvpol_popis = "string", rekvpol_castka = "string", rekcrad_rada_txt = "string", rekcins_instalace_txt = "string", rekcupd_typ_upd_txt = "string", typ_instalace = "number", pocet_verzi = "number", rekccfs_cfs_zkratka_txt = "string", rekcuro_rozvrh_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GKlientSoftwareDtoTypeLengths { ixs_kli = 12, polozka = 4, podpolozka = 3, ixp_sml = 12, poznamka = 254, zmenu_prov = 12, ixs_esu_org_lic = 12, ixs_esu_org_met = 12, dl_prvni = 254, popis_vyrad = 254, orj = 4, orj_var = 4, ixs_esu_spr = 12, lic_zast_spr = 4, licence = 12, ixs_esu_data = 12, ozn_distrib = 50, pol_popis = 50, ixs_kli_nad = 12, koef_duvod = 100, lic = 4, ixs_arc = 12, ixp_konec = 12, ixs_cld = 12, reksorj_nazev_orj = 254, reksorj_nazev_orj_var = 254, rekvpol_popis = 254, rekvpol_castka = 254, rekcrad_rada_txt = 254, rekcins_instalace_txt = 254, rekcupd_typ_upd_txt = 254, rekccfs_cfs_zkratka_txt = 254, rekcuro_rozvrh_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Dto\GKlientUpdateDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**Update*/
	interface GKlientUpdateDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor klienta*/
		ixs_kli?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**DBCOLUMN:reksupd.radek_upd*/
		radek_upd?: number|null;
		/**Částka*/
		castka?: JsonDecimal|null;
		/**Datum*/
		datum?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Typ fakturace*/
		typ_upd?: number|null;
		/**Koeficient*/
		koef?: JsonDecimal|null;
		/**Příplatek*/
		priplatek?: number|null;
		/**DBCOLUMN:reksupd.s_export*/
		s_export?: number|null;
		/**Číslo faktury*/
		cis_fak?: string|null;
		/**Datum fakturace*/
		datum_fak?: JsonDate|null;
		/**Datum zaplacení*/
		datum_zaplac?: JsonDate|null;
		/**DBCOLUMN:reksupd.s_prepocet*/
		s_prepocet?: number|null;
		/**Základní cena*/
		cena_zakladni?: JsonDecimal|null;
		/**Cena za rozšíření*/
		cena_rozsireni?: JsonDecimal|null;
		/**Celková cena*/
		cena?: JsonDecimal|null;
		/**DBCOLUMN:reksupd.popis_vypocet*/
		popis_vypocet?: string|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
	}
	const enum GKlientUpdateDtoNames { ixs_kli = "ixs_kli", por_cislo = "por_cislo", radek_upd = "radek_upd", castka = "castka", datum = "datum", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", typ_upd = "typ_upd", koef = "koef", priplatek = "priplatek", s_export = "s_export", cis_fak = "cis_fak", datum_fak = "datum_fak", datum_zaplac = "datum_zaplac", s_prepocet = "s_prepocet", cena_zakladni = "cena_zakladni", cena_rozsireni = "cena_rozsireni", cena = "cena", popis_vypocet = "popis_vypocet", Zmena = "Zmena", Permissions = "Permissions",}
	const enum GKlientUpdateDtoFragments { ixs_kli = "Base", por_cislo = "Base", radek_upd = "Base", castka = "Base", datum = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", typ_upd = "Base", koef = "Base", priplatek = "Base", s_export = "Base", cis_fak = "Base", datum_fak = "Base", datum_zaplac = "Base", s_prepocet = "Base", cena_zakladni = "Base", cena_rozsireni = "Base", cena = "Base", popis_vypocet = "Base", Zmena = "ZMENA", Permissions = "*",}
	const enum GKlientUpdateDtoTypes { ixs_kli = "string", por_cislo = "number", radek_upd = "number", castka = "JsonDecimal", datum = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", typ_upd = "number", koef = "JsonDecimal", priplatek = "number", s_export = "number", cis_fak = "string", datum_fak = "JsonDate", datum_zaplac = "JsonDate", s_prepocet = "number", cena_zakladni = "JsonDecimal", cena_rozsireni = "JsonDecimal", cena = "JsonDecimal", popis_vypocet = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GKlientUpdateDtoTypeLengths { ixs_kli = 12, poznamka = 254, zmenu_prov = 12, cis_fak = 15, popis_vypocet = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Dto\GObchodniPrilezitostDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**Obchodní příležitost*/
	interface GObchodniPrilezitostDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor provozního deníku*/
		ixs_pde?: string|null;
		/**Identifikátor klienta*/
		ixs_kli?: string|null;
		/**Typ provozního deníku*/
		typ_pde?: number|null;
		/**DBCOLUMN:rekspde.typ_pdv*/
		typ_pdv?: number|null;
		/**Stručný název*/
		nazev_strucne?: string|null;
		/**Datum*/
		datum?: JsonDate|null;
		/**DBCOLUMN:rekspde.orj_zapsal*/
		orj_zapsal?: string|null;
		/**DBCOLUMN:rekspde.orj_pro*/
		orj_pro?: string|null;
		/**DBCOLUMN:rekspde.ixp_uko*/
		ixp_uko?: string|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Priorita*/
		prio?: number|null;
		/**Druh*/
		druh?: number|null;
		/**DBCOLUMN:rekspde.datum_termin*/
		datum_termin?: JsonDate|null;
		/**Datum vyřízení*/
		datum_vyriz?: JsonDate|null;
		/**Položka*/
		polozka?: string|null;
		/**Podpoložka*/
		podpolozka?: string|null;
		/**Číslo faktury*/
		cis_fak?: string|null;
		/**Datum fakturace*/
		datum_fak?: JsonDate|null;
		/**Číslo dodacího listu*/
		cislo_dl?: string|null;
		/**Požadavek*/
		pozadavek?: string|null;
		/**Objednávka ze dne*/
		obj_ze_dne?: JsonDate|null;
		/**Identifikátor externího subjektu*/
		ixs_esu?: string|null;
		/**DBCOLUMN:rekspde.lic_zast*/
		lic_zast?: string|null;
		/**DBCOLUMN:rekspde.por_zast*/
		por_zast?: number|null;
		/**DBCOLUMN:rekspde.ixp_pde_dl*/
		ixp_pde_dl?: string|null;
		/**DBCOLUMN:rekspde.castka_obch*/
		castka_obch?: JsonDecimal|null;
		/**DBCOLUMN:rekspde.castka_naklad*/
		castka_naklad?: JsonDecimal|null;
		/**DBCOLUMN:rekspde.faze_obch*/
		faze_obch?: number|null;
		/**DBCOLUMN:rekspde.ner_obch*/
		ner_obch?: number|null;
		/**Úspěšnost*/
		uspesnost?: number|null;
		/**DBCOLUMN:rekspde.ner_obch_txt*/
		ner_obch_txt?: string|null;
		/**DBCOLUMN:rekspde.ixs_ref_akt*/
		ixs_ref_akt?: string|null;
		/**DBCOLUMN:rekspde.ixs_fun_akt*/
		ixs_fun_akt?: string|null;
		/**DBCOLUMN:rekspde.por_cislo_oso*/
		por_cislo_oso?: number|null;
		/**Datum zaplacení*/
		dat_zaplac?: JsonDate|null;
		/**DBCOLUMN:rekspde.oakce*/
		oakce?: number|null;
		/**DBCOLUMN:rekspde.ixs_kli_sdp*/
		ixs_kli_sdp?: string|null;
		/**DBCOLUMN:rekspde.por_cislo_sdp*/
		por_cislo_sdp?: number|null;
		/**DBCOLUMN:rekspde.ixs_pde_op*/
		ixs_pde_op?: string|null;
		/**DBCOLUMN:rekspde.stav_schval_op*/
		stav_schval_op?: number|null;
		/**Datum blokace*/
		dat_blokace?: JsonDate|null;
		/**DBCOLUMN:rekspde.dat_f*/
		dat_f?: JsonDate|null;
		/**DBCOLUMN:rekspde.ixs_ref_f*/
		ixs_ref_f?: string|null;
		/**DBCOLUMN:rekspde.ixs_fun_f*/
		ixs_fun_f?: string|null;
		/**Typ nabídky*/
		typ_nab?: number|null;
		/**Platost nabídky do*/
		dat_plat_do?: JsonDate|null;
		/**Datum nabídky*/
		dat_nab?: JsonDate|null;
		/**Datum kontaktu*/
		dat_kontakt?: JsonDate|null;
		/**Datum ověření*/
		dat_overit?: JsonDate|null;
		/**DBCOLUMN:rekspde.orj_nab_tvor*/
		orj_nab_tvor?: string|null;
		/**DBCOLUMN:rekspde.orj_nab_pred*/
		orj_nab_pred?: string|null;
		/**DBCOLUMN:rekspde.c_sleva_max*/
		c_sleva_max?: JsonDecimal|null;
		/**DBCOLUMN:rekspde.c_sleva_poskyt*/
		c_sleva_poskyt?: JsonDecimal|null;
		/**Identifikátor smlouvy*/
		ixp_smlouvy?: string|null;
		/**DBCOLUMN:rekspde.cena_rozpocet*/
		cena_rozpocet?: JsonDecimal|null;
		/**DBCOLUMN:rekspde.stav_export*/
		stav_export?: number|null;
		/**DBCOLUMN:rekspde.orj_pred*/
		orj_pred?: string|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**rekcfob_faze_obch_txt*/
		rekcfob_faze_obch_txt?: string|null;
		/**rekcpdv_typ_pdv_txt*/
		rekcpdv_typ_pdv_txt?: string|null;
		/**ginsesu_nazev*/
		ginsesu_nazev?: string|null;
		/**ginsesu_k_nazev*/
		ginsesu_k_nazev?: string|null;
		/**reksopk_subjekt_txt*/
		reksopk_subjekt_txt?: string|null;
		/**reksopk_typ_jos*/
		reksopk_typ_jos?: number|null;
		/**rekvopd_dok*/
		rekvopd_dok?: string|null;
		/**rekvopd_dok_e*/
		rekvopd_dok_e?: string|null;
		/**ginsesu_klient_nazev*/
		ginsesu_klient_nazev?: string|null;
		/**ginsesu_klient_ico*/
		ginsesu_klient_ico?: string|null;
		/**ginsesu_klient_obec*/
		ginsesu_klient_obec?: string|null;
		/**prvni_klient_txt*/
		prvni_klient_txt?: string|null;
		/**reksopk_ixs_kli*/
		reksopk_ixs_kli?: string|null;
		/**reksopk_por_cislo*/
		reksopk_por_cislo?: number|null;
		/**ginsfun_nazev_rf*/
		ginsfun_nazev_rf?: string|null;
		/**ixs_esu_kli*/
		ixs_esu_kli?: string|null;
		/**obsah_txt*/
		obsah_txt?: string|null;
	}
	const enum GObchodniPrilezitostDtoNames { ixs_pde = "ixs_pde", ixs_kli = "ixs_kli", typ_pde = "typ_pde", typ_pdv = "typ_pdv", nazev_strucne = "nazev_strucne", datum = "datum", orj_zapsal = "orj_zapsal", orj_pro = "orj_pro", ixp_uko = "ixp_uko", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", prio = "prio", druh = "druh", datum_termin = "datum_termin", datum_vyriz = "datum_vyriz", polozka = "polozka", podpolozka = "podpolozka", cis_fak = "cis_fak", datum_fak = "datum_fak", cislo_dl = "cislo_dl", pozadavek = "pozadavek", obj_ze_dne = "obj_ze_dne", ixs_esu = "ixs_esu", lic_zast = "lic_zast", por_zast = "por_zast", ixp_pde_dl = "ixp_pde_dl", castka_obch = "castka_obch", castka_naklad = "castka_naklad", faze_obch = "faze_obch", ner_obch = "ner_obch", uspesnost = "uspesnost", ner_obch_txt = "ner_obch_txt", ixs_ref_akt = "ixs_ref_akt", ixs_fun_akt = "ixs_fun_akt", por_cislo_oso = "por_cislo_oso", dat_zaplac = "dat_zaplac", oakce = "oakce", ixs_kli_sdp = "ixs_kli_sdp", por_cislo_sdp = "por_cislo_sdp", ixs_pde_op = "ixs_pde_op", stav_schval_op = "stav_schval_op", dat_blokace = "dat_blokace", dat_f = "dat_f", ixs_ref_f = "ixs_ref_f", ixs_fun_f = "ixs_fun_f", typ_nab = "typ_nab", dat_plat_do = "dat_plat_do", dat_nab = "dat_nab", dat_kontakt = "dat_kontakt", dat_overit = "dat_overit", orj_nab_tvor = "orj_nab_tvor", orj_nab_pred = "orj_nab_pred", c_sleva_max = "c_sleva_max", c_sleva_poskyt = "c_sleva_poskyt", ixp_smlouvy = "ixp_smlouvy", cena_rozpocet = "cena_rozpocet", stav_export = "stav_export", orj_pred = "orj_pred", Zmena = "Zmena", rekcfob_faze_obch_txt = "rekcfob_faze_obch_txt", rekcpdv_typ_pdv_txt = "rekcpdv_typ_pdv_txt", ginsesu_nazev = "ginsesu_nazev", ginsesu_k_nazev = "ginsesu_k_nazev", reksopk_subjekt_txt = "reksopk_subjekt_txt", reksopk_typ_jos = "reksopk_typ_jos", rekvopd_dok = "rekvopd_dok", rekvopd_dok_e = "rekvopd_dok_e", ginsesu_klient_nazev = "ginsesu_klient_nazev", ginsesu_klient_ico = "ginsesu_klient_ico", ginsesu_klient_obec = "ginsesu_klient_obec", prvni_klient_txt = "prvni_klient_txt", reksopk_ixs_kli = "reksopk_ixs_kli", reksopk_por_cislo = "reksopk_por_cislo", ginsfun_nazev_rf = "ginsfun_nazev_rf", ixs_esu_kli = "ixs_esu_kli", obsah_txt = "obsah_txt", Permissions = "Permissions",}
	const enum GObchodniPrilezitostDtoFragments { ixs_pde = "*", ixs_kli = "*", typ_pde = "*", typ_pdv = "*", nazev_strucne = "*", datum = "*", orj_zapsal = "*", orj_pro = "*", ixp_uko = "*", poznamka = "*", aktivita = "*", dat_zmena = "*", zmenu_prov = "*", prio = "*", druh = "*", datum_termin = "*", datum_vyriz = "*", polozka = "*", podpolozka = "*", cis_fak = "*", datum_fak = "*", cislo_dl = "*", pozadavek = "*", obj_ze_dne = "*", ixs_esu = "*", lic_zast = "*", por_zast = "*", ixp_pde_dl = "*", castka_obch = "*", castka_naklad = "*", faze_obch = "*", ner_obch = "*", uspesnost = "*", ner_obch_txt = "*", ixs_ref_akt = "*", ixs_fun_akt = "*", por_cislo_oso = "*", dat_zaplac = "*", oakce = "*", ixs_kli_sdp = "*", por_cislo_sdp = "*", ixs_pde_op = "*", stav_schval_op = "*", dat_blokace = "*", dat_f = "*", ixs_ref_f = "*", ixs_fun_f = "*", typ_nab = "*", dat_plat_do = "*", dat_nab = "*", dat_kontakt = "*", dat_overit = "*", orj_nab_tvor = "*", orj_nab_pred = "*", c_sleva_max = "*", c_sleva_poskyt = "*", ixp_smlouvy = "*", cena_rozpocet = "*", stav_export = "*", orj_pred = "*", Zmena = "ZMENA", rekcfob_faze_obch_txt = "*", rekcpdv_typ_pdv_txt = "*", ginsesu_nazev = "*", ginsesu_k_nazev = "*", reksopk_subjekt_txt = "*", reksopk_typ_jos = "*", rekvopd_dok = "*", rekvopd_dok_e = "*", ginsesu_klient_nazev = "*", ginsesu_klient_ico = "*", ginsesu_klient_obec = "*", prvni_klient_txt = "*", reksopk_ixs_kli = "*", reksopk_por_cislo = "*", ginsfun_nazev_rf = "*", ixs_esu_kli = "*", obsah_txt = "*", Permissions = "*",}
	const enum GObchodniPrilezitostDtoTypes { ixs_pde = "string", ixs_kli = "string", typ_pde = "number", typ_pdv = "number", nazev_strucne = "string", datum = "JsonDate", orj_zapsal = "string", orj_pro = "string", ixp_uko = "string", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", prio = "number", druh = "number", datum_termin = "JsonDate", datum_vyriz = "JsonDate", polozka = "string", podpolozka = "string", cis_fak = "string", datum_fak = "JsonDate", cislo_dl = "string", pozadavek = "string", obj_ze_dne = "JsonDate", ixs_esu = "string", lic_zast = "string", por_zast = "number", ixp_pde_dl = "string", castka_obch = "JsonDecimal", castka_naklad = "JsonDecimal", faze_obch = "number", ner_obch = "number", uspesnost = "number", ner_obch_txt = "string", ixs_ref_akt = "string", ixs_fun_akt = "string", por_cislo_oso = "number", dat_zaplac = "JsonDate", oakce = "number", ixs_kli_sdp = "string", por_cislo_sdp = "number", ixs_pde_op = "string", stav_schval_op = "number", dat_blokace = "JsonDate", dat_f = "JsonDate", ixs_ref_f = "string", ixs_fun_f = "string", typ_nab = "number", dat_plat_do = "JsonDate", dat_nab = "JsonDate", dat_kontakt = "JsonDate", dat_overit = "JsonDate", orj_nab_tvor = "string", orj_nab_pred = "string", c_sleva_max = "JsonDecimal", c_sleva_poskyt = "JsonDecimal", ixp_smlouvy = "string", cena_rozpocet = "JsonDecimal", stav_export = "number", orj_pred = "string", Zmena = "Gordic.Gin.Interface.GGinszmpDto", rekcfob_faze_obch_txt = "string", rekcpdv_typ_pdv_txt = "string", ginsesu_nazev = "string", ginsesu_k_nazev = "string", reksopk_subjekt_txt = "string", reksopk_typ_jos = "number", rekvopd_dok = "string", rekvopd_dok_e = "string", ginsesu_klient_nazev = "string", ginsesu_klient_ico = "string", ginsesu_klient_obec = "string", prvni_klient_txt = "string", reksopk_ixs_kli = "string", reksopk_por_cislo = "number", ginsfun_nazev_rf = "string", ixs_esu_kli = "string", obsah_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GObchodniPrilezitostDtoTypeLengths { ixs_pde = 12, ixs_kli = 12, nazev_strucne = 254, orj_zapsal = 4, orj_pro = 4, ixp_uko = 12, poznamka = 254, zmenu_prov = 12, polozka = 4, podpolozka = 3, cis_fak = 15, cislo_dl = 30, pozadavek = 254, ixs_esu = 12, lic_zast = 4, ixp_pde_dl = 12, ner_obch_txt = 254, ixs_ref_akt = 12, ixs_fun_akt = 12, ixs_kli_sdp = 12, ixs_pde_op = 12, ixs_ref_f = 12, ixs_fun_f = 12, orj_nab_tvor = 4, orj_nab_pred = 4, ixp_smlouvy = 12, orj_pred = 4, rekcfob_faze_obch_txt = 254, rekcpdv_typ_pdv_txt = 254, ginsesu_nazev = 254, ginsesu_k_nazev = 254, reksopk_subjekt_txt = 254, rekvopd_dok = 254, rekvopd_dok_e = 254, ginsesu_klient_nazev = 254, ginsesu_klient_ico = 254, ginsesu_klient_obec = 254, prvni_klient_txt = 254, reksopk_ixs_kli = 254, ginsfun_nazev_rf = 254, ixs_esu_kli = 254, obsah_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Dto\GPolozkyCenikDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**Ceník položek*/
	interface GPolozkyCenikDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor položky*/
		polozka?: string|null;
		/**Řada*/
		rada?: number|null;
		/**Zkratka*/
		zkratka?: string|null;
		/**Popis*/
		popis?: string|null;
		/**DBCOLUMN:rekscen.procupdlok*/
		procupdlok?: number|null;
		/**DBCOLUMN:rekscen.procupdnet*/
		procupdnet?: number|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Položka + popis*/
		pol_txt?: string|null;
		/**Externí ID*/
		id_externi?: string|null;
		/**DBCOLUMN:rekscen.s_update*/
		s_update?: number|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**rekcrad_rada_txt*/
		rekcrad_rada_txt?: string|null;
		/**s_podpolozka*/
		s_podpolozka?: number|null;
		/**procupdlok_txt*/
		procupdlok_txt?: string|null;
		/**procupdnet_txt*/
		procupdnet_txt?: string|null;
	}
	const enum GPolozkyCenikDtoNames { polozka = "polozka", rada = "rada", zkratka = "zkratka", popis = "popis", procupdlok = "procupdlok", procupdnet = "procupdnet", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", pol_txt = "pol_txt", id_externi = "id_externi", s_update = "s_update", Zmena = "Zmena", rekcrad_rada_txt = "rekcrad_rada_txt", s_podpolozka = "s_podpolozka", procupdlok_txt = "procupdlok_txt", procupdnet_txt = "procupdnet_txt", Permissions = "Permissions",}
	const enum GPolozkyCenikDtoFragments { polozka = "Base", rada = "Base", zkratka = "Base", popis = "Base", procupdlok = "Base", procupdnet = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", pol_txt = "Base", id_externi = "Base", s_update = "Base", Zmena = "ZMENA", rekcrad_rada_txt = "Extended", s_podpolozka = "Extended", procupdlok_txt = "Extended", procupdnet_txt = "Extended", Permissions = "*",}
	const enum GPolozkyCenikDtoTypes { polozka = "string", rada = "number", zkratka = "string", popis = "string", procupdlok = "number", procupdnet = "number", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", pol_txt = "string", id_externi = "string", s_update = "number", Zmena = "Gordic.Gin.Interface.GGinszmpDto", rekcrad_rada_txt = "string", s_podpolozka = "number", procupdlok_txt = "string", procupdnet_txt = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GPolozkyCenikDtoTypeLengths { polozka = 4, zkratka = 20, popis = 50, poznamka = 254, zmenu_prov = 12, pol_txt = 100, id_externi = 20, rekcrad_rada_txt = 50, procupdlok_txt = 254, procupdnet_txt = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Dto\GProvozniDenikDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**Provozní deník*/
	interface GProvozniDenikDto extends Gordic.Gin.Interface.RegSpa.GBaseDetailDto {
		/**Identifikátor provozního deníku*/
		ixs_pde?: string|null;
		/**Pořadové číslo*/
		por_cislo?: number|null;
		/**Položka*/
		polozka?: string|null;
		/**Podpoložka*/
		podpolozka?: string|null;
		/**Množství*/
		mnozstvi?: JsonDecimal|null;
		/**Množství info*/
		mnozstvi_info?: string|null;
		/**Jednotka*/
		jednotka?: string|null;
		/**Cena*/
		cena?: JsonDecimal|null;
		/**Sleva*/ 
		cena_sleva?: JsonDecimal|null;
		/**Celková cena*/
		cena_celkem?: JsonDecimal|null;
		/**Organizační jednotka*/
		orj?: string|null;
		/**Datum*/
		datum?: JsonDate|null;
		/**Poznámka*/
		poznamka?: string|null;
		/**Aktivita*/
		aktivita?: number|null;
		/**Datum změny*/
		dat_zmena?: JsonDate|null;
		/**Identifikátor změnu provedl*/
		zmenu_prov?: string|null;
		/**Identifikátor obchodní příležitosti*/
		ixs_pde_dl?: string|null;
		/**Id externí*/
		id_externi?: string|null;
		/**DBCOLUMN:rekdpde.dat_pde_od*/
		dat_pde_od?: JsonDate|null;
		/**DBCOLUMN:rekdpde.dat_pde_do*/
		dat_pde_do?: JsonDate|null;
		/**GGinszmpDto*/
		Zmena?: Gordic.Gin.Interface.GGinszmpDto|null;
		/**GObchodniPrilezitostDto*/
		ObchodniPrilezitost?: Gordic.Sah.Interface.GObchodniPrilezitostDto|null;
		/**rekscen_zkratka*/
		rekscen_zkratka?: string|null;
		/**rekvpol_popis*/
		rekvpol_popis?: string|null;
	}
	const enum GProvozniDenikDtoNames { ixs_pde = "ixs_pde", por_cislo = "por_cislo", polozka = "polozka", podpolozka = "podpolozka", mnozstvi = "mnozstvi", mnozstvi_info = "mnozstvi_info", jednotka = "jednotka", cena = "cena", cena_sleva = "cena_sleva", cena_celkem = "cena_celkem", orj = "orj", datum = "datum", poznamka = "poznamka", aktivita = "aktivita", dat_zmena = "dat_zmena", zmenu_prov = "zmenu_prov", ixs_pde_dl = "ixs_pde_dl", id_externi = "id_externi", dat_pde_od = "dat_pde_od", dat_pde_do = "dat_pde_do", Zmena = "Zmena", ObchodniPrilezitost = "ObchodniPrilezitost", rekscen_zkratka = "rekscen_zkratka", rekvpol_popis = "rekvpol_popis", Permissions = "Permissions",}
	const enum GProvozniDenikDtoFragments { ixs_pde = "Base", por_cislo = "Base", polozka = "Base", podpolozka = "Base", mnozstvi = "Base", mnozstvi_info = "Base", jednotka = "Base", cena = "Base", cena_sleva = "Base", cena_celkem = "Base", orj = "Base", datum = "Base", poznamka = "Base", aktivita = "Base", dat_zmena = "Base", zmenu_prov = "Base", ixs_pde_dl = "Base", id_externi = "Base", dat_pde_od = "Base", dat_pde_do = "Base", Zmena = "ZMENA", ObchodniPrilezitost = "OBCHODNIPRILEZITOST", rekscen_zkratka = "*", rekvpol_popis = "*", Permissions = "*",}
	const enum GProvozniDenikDtoTypes { ixs_pde = "string", por_cislo = "number", polozka = "string", podpolozka = "string", mnozstvi = "JsonDecimal", mnozstvi_info = "string", jednotka = "string", cena = "JsonDecimal", cena_sleva = "JsonDecimal", cena_celkem = "JsonDecimal", orj = "string", datum = "JsonDate", poznamka = "string", aktivita = "number", dat_zmena = "JsonDate", zmenu_prov = "string", ixs_pde_dl = "string", id_externi = "string", dat_pde_od = "JsonDate", dat_pde_do = "JsonDate", Zmena = "Gordic.Gin.Interface.GGinszmpDto", ObchodniPrilezitost = "Gordic.Sah.Interface.GObchodniPrilezitostDto", rekscen_zkratka = "string", rekvpol_popis = "string", Permissions = "Gordic.Gin.Interface.RegSpa.GBaseDetailPermissions",}
	const enum GProvozniDenikDtoTypeLengths { ixs_pde = 12, polozka = 4, podpolozka = 3, mnozstvi_info = 10, jednotka = 10, orj = 4, poznamka = 254, zmenu_prov = 12, ixs_pde_dl = 12, id_externi = 20, rekscen_zkratka = 254, rekvpol_popis = 254,}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Isl\Gordic.Sah.Interface.IGProvozniDenik.d.ts 

declare namespace Gordic.Isl.Catalog {
	/**Interface část pro provozní deník
	* @domain ProvozniDenik
	* @businessObject ProvozniDenik
	*/
	interface ProvozniDenik {
		/**List - Načtení seznamu povozních deníků*/
		list(rq?:CallParams<GServiceListRequest>): _Task<GServiceListRequest,GServiceListResponse<Gordic.Sah.Interface.GProvozniDenikDto>>;
		/**Read - Načtení detailu provozního deníku*/
		read(rq?:Gordic.Sah.Interface.GProvozniDenikDto|CallParams<GServiceReadRequest<Gordic.Sah.Interface.GProvozniDenikDto>>): _Task<GServiceReadRequest<Gordic.Sah.Interface.GProvozniDenikDto>,GServiceReadResponse<Gordic.Sah.Interface.GProvozniDenikDto>>;
		/**Create - Založení detailu provozního deníku*/
		create(rq?:Gordic.Sah.Interface.GProvozniDenikDto|CallParams<GServiceSaveRequest<Gordic.Sah.Interface.GProvozniDenikDto>>): _Task<GServiceSaveRequest<Gordic.Sah.Interface.GProvozniDenikDto>,GServiceSaveResponse<Gordic.Sah.Interface.GProvozniDenikDto>>;
		/**Update - Oprava detailu provozního deníku*/
		update(rq?:Gordic.Sah.Interface.GProvozniDenikDto|CallParams<GServiceSaveRequest<Gordic.Sah.Interface.GProvozniDenikDto>>): _Task<GServiceSaveRequest<Gordic.Sah.Interface.GProvozniDenikDto>,GServiceSaveResponse<Gordic.Sah.Interface.GProvozniDenikDto>>;
		/**Nastavení aktivity provozního deníku*/
		nastavitAktivitu(rq?:Gordic.Sah.Interface.GProvozniDenikDto|CallParams<GServiceActionRequest<Gordic.Sah.Interface.GProvozniDenikDto>>): _Task<GServiceActionRequest<Gordic.Sah.Interface.GProvozniDenikDto>,GServiceActionResponse<Gordic.Sah.Interface.GProvozniDenikDto>>;
		/**Součet sloupce cena_celkem podle ixs_pde*/
		sectiCelkemZaIxsPde(rq?:CallParams<{ixsPde:string}>): _Task<{ixsPde:string},JsonDecimal>;
		/**Součet sloupce cena_celkem podle ixs_pde_dl*/
		sectiCelkemZaIxsPdeDl(rq?:CallParams<{ixsPdeDl:string}>): _Task<{ixsPdeDl:string},JsonDecimal>;
	}
}
declare namespace Gordic.Isl {
	interface Client {
		ProvozniDenik: ServiceBase & Catalog.ProvozniDenik;
	}
	const ProvozniDenik: Client["ProvozniDenik"];
}
declare namespace Gordic.Sah.Interface {
	/**Výčet filtračních kritérií pro filtr*/
	const enum GProvozniDenikFilter {
		/**Identifikátor provozního deníku*/
		ixs_pde,
		/**Pořadové číslo*/
		por_cislo,
		/**Organizační jednotka*/
		orj,
		/**Datum*/
		datum,
		/**Aktivita*/
		aktivita,
	}
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sah.Interface\Old\Cis\Dto\GRekcpdvDto.d.ts 

declare namespace Gordic.Sah.Interface {
	/**DBTABLE:rekcpdv*/
	interface GRekcpdvDto {
		/**DBCOLUMN:rekcpdv.typ_pdv*/
		typ_pdv?: number|null;
		/**DBCOLUMN:rekcpdv.typ_pdv_txt*/
		typ_pdv_txt?: string|null;
		/**DBCOLUMN:rekcpdv.k_v*/
		k_v?: number|null;
		/**DBCOLUMN:rekcpdv.k_s*/
		k_s?: string|null;
	}
	const enum GRekcpdvDtoNames { typ_pdv = "typ_pdv", typ_pdv_txt = "typ_pdv_txt", k_v = "k_v", k_s = "k_s",}
	const enum GRekcpdvDtoFragments { typ_pdv = "*", typ_pdv_txt = "*", k_v = "*", k_s = "*",}
	const enum GRekcpdvDtoTypes { typ_pdv = "number", typ_pdv_txt = "string", k_v = "number", k_s = "string",}
	const enum GRekcpdvDtoTypeLengths { typ_pdv_txt = 50, k_s = 15,}
	/**ENUM:rekcpdv*/
	const enum GRekcpdvEnum {
		/**Neurčeno*/
		_0=0,
		/**Přijato*/
		_10=10,
		/**Vyřízeno*/
		_20=20,
		/**Stornováno*/
		_30=30,
		/**Aktivní*/
		_210=210,
		/**Dokončeno - předáno k realizaci*/
		_220=220,
		/**Dokončeno - realizováno*/
		_230=230,
		/**Dokončeno - nerealizováno*/
		_240=240,
		/**Storno*/
		_250=250,
		/**Uzavřeno - neprodloužen datum blokace*/
		_260=260,
	}
	function GRekcpdvEnumValues(): JQueryPromise<Gordic.Ginis.DbModel.GEnumMetaDto<GRekcpdvEnum, Gordic.Sah.Interface.GRekcpdvDto>[]>;
}

//#endregion

