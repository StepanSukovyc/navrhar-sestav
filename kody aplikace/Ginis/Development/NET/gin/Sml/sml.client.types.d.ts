/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       sml.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Sml.Client\Gordic.Sml.Client.csproj
*    created     2026-02-16 14:34:12
*    files       sml.fields.d.ts
*                Sml\GReaderSmlAcVerZak\smlAcVerZak.fields.d.ts
*                Sml\GReaderSmlRozaaat\smlRozaaat.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Sml.Client\sml.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klientská AL - číselník Smlapid (případy)
    * keys: ["ixp_sml_pri"]
    * columns: ["ixp_sml_pri", "ac_sml", "popis"]
    * filters: ["ixp_sml_pri","ac_sml","popis"]
    */
    class SmlapidSml extends Base<Gordic.Sml.Interface.GPripadSmlDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlapidSmlDto = Gordic.Sml.Interface.GPripadSmlDto;
    type SmlapidSmlDtoNames = Gordic.Sml.Interface.GPripadSmlDtoNames;
    type SmlapidSmlDtoFragments = Gordic.Sml.Interface.GPripadSmlDtoFragments;
    type SmlapidSmlDtoTypes = Gordic.Sml.Interface.GPripadSmlDtoTypes;
    type SmlapidSmlDtoTypeLengths = Gordic.Sml.Interface.GPripadSmlDtoTypeLengths;

    /**
    * Klientská AL - číselník Smlcpop (příznaky opce)
    * keys: ["priz_opce"]
    * columns: ["priz_opce","priz_opce_txt","priz_opce_zkr"]
    * filters: ["priz_opce","priz_opce_txt","priz_opce_zkr"]
    */
    class Smlcpop extends Base<Gordic.Sml.Interface.GSmlcpopDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlcpopDto = Gordic.Sml.Interface.GSmlcpopDto;
    type SmlcpopDtoNames = Gordic.Sml.Interface.GSmlcpopDtoNames;
    type SmlcpopDtoFragments = Gordic.Sml.Interface.GSmlcpopDtoFragments;
    type SmlcpopDtoTypes = Gordic.Sml.Interface.GSmlcpopDtoTypes;
    type SmlcpopDtoTypeLengths = Gordic.Sml.Interface.GSmlcpopDtoTypeLengths;

    /**
    * Klientská AL - číselník Smlcprz (typy operace)
    * keys: ["priz_zaz"]
    * columns: ["priz_zaz","priz_zaz_txt"]
    * filters: ["priz_zaz","priz_zaz_txt"]
    */
    class Smlcprz extends Base<Gordic.Sml.Interface.GSmlcprzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlcprzDto = Gordic.Sml.Interface.GSmlcprzDto;
    type SmlcprzDtoNames = Gordic.Sml.Interface.GSmlcprzDtoNames;
    type SmlcprzDtoFragments = Gordic.Sml.Interface.GSmlcprzDtoFragments;
    type SmlcprzDtoTypes = Gordic.Sml.Interface.GSmlcprzDtoTypes;
    type SmlcprzDtoTypeLengths = Gordic.Sml.Interface.GSmlcprzDtoTypeLengths;

    /**
    * Klientská AL - číselník Smlcsta (stavy dokladu)
    * keys: ["sml_stav"]
    * columns: ["sml_stav","sml_stav_txt","sml_stav_zkr"]
    * filters: ["sml_stav","sml_stav_txt","sml_stav_zkr"]
    */
    class Smlcsta extends Base<Gordic.Sml.Interface.GSmlcstaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlcstaDto = Gordic.Sml.Interface.GSmlcstaDto;
    type SmlcstaDtoNames = Gordic.Sml.Interface.GSmlcstaDtoNames;
    type SmlcstaDtoFragments = Gordic.Sml.Interface.GSmlcstaDtoFragments;
    type SmlcstaDtoTypes = Gordic.Sml.Interface.GSmlcstaDtoTypes;
    type SmlcstaDtoTypeLengths = Gordic.Sml.Interface.GSmlcstaDtoTypeLengths;

    /**
    * Klientská část - Výběr subjektů k veřejné zakázce
    * keys: ["ixs_esu","ixp_nab","por_cis_nab"]
    * columns: ["ico","nazev","obec","zkratka","dic","bu_txt"]
    * filters: ["ixp","ixs_pri","typ_ag_blok"]
    */
    class SmlEsuVerZak extends Base<Gordic.Sml.Interface.GSmlEsuVerZakDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlEsuVerZakDto = Gordic.Sml.Interface.GSmlEsuVerZakDto;
    type SmlEsuVerZakDtoNames = Gordic.Sml.Interface.GSmlEsuVerZakDtoNames;
    type SmlEsuVerZakDtoFragments = Gordic.Sml.Interface.GSmlEsuVerZakDtoFragments;
    type SmlEsuVerZakDtoTypes = Gordic.Sml.Interface.GSmlEsuVerZakDtoTypes;
    type SmlEsuVerZakDtoTypeLengths = Gordic.Sml.Interface.GSmlEsuVerZakDtoTypeLengths;

    /**
    * výběr soutěže
    * keys: ["soutez"]
    * columns: ["soutez","soutez_txt"]
    * filters: ["soutez","soutez_txt"]
    */
    class SmlSoutez extends Base<Gordic.Sml.Interface.GSmlSoutezDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlSoutezDto = Gordic.Sml.Interface.GSmlSoutezDto;
    type SmlSoutezDtoNames = Gordic.Sml.Interface.GSmlSoutezDtoNames;
    type SmlSoutezDtoFragments = Gordic.Sml.Interface.GSmlSoutezDtoFragments;
    type SmlSoutezDtoTypes = Gordic.Sml.Interface.GSmlSoutezDtoTypes;
    type SmlSoutezDtoTypeLengths = Gordic.Sml.Interface.GSmlSoutezDtoTypeLengths;

    /**
    * Klientská AL - číselník Smlspid (doklady)
    * keys: ["ixp"]
    * columns: ["ixp","ac","ac_sml","popis"]
    * filters: ["ixp","ac","ac_sml","popis"]
    */
    class Smlspid extends Base<Gordic.Sml.Interface.GDokladSmlDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlspidDto = Gordic.Sml.Interface.GDokladSmlDto;
    type SmlspidDtoNames = Gordic.Sml.Interface.GDokladSmlDtoNames;
    type SmlspidDtoFragments = Gordic.Sml.Interface.GDokladSmlDtoFragments;
    type SmlspidDtoTypes = Gordic.Sml.Interface.GDokladSmlDtoTypes;
    type SmlspidDtoTypeLengths = Gordic.Sml.Interface.GDokladSmlDtoTypeLengths;

    /**
    * Stav podpisu smlouvy
    * keys: ["sgn_stav"]
    * columns: ["sgn_stav","sgn_stav_txt","k_v"]
    * filters: ["sgn_stav","sgn_stav_txt"]
    */
    class Smlcsts extends Base<Gordic.Sml.Interface.GSmlcstsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlcstsDto = Gordic.Sml.Interface.GSmlcstsDto;
    type SmlcstsDtoNames = Gordic.Sml.Interface.GSmlcstsDtoNames;
    type SmlcstsDtoFragments = Gordic.Sml.Interface.GSmlcstsDtoFragments;
    type SmlcstsDtoTypes = Gordic.Sml.Interface.GSmlcstsDtoTypes;
    type SmlcstsDtoTypeLengths = Gordic.Sml.Interface.GSmlcstsDtoTypeLengths;

    /**
    * Typ platnosti
    * keys: ["typ_platnost"]
    * columns: ["typ_platnost","typ_platnost_txt","k_v"]
    * filters: ["typ_platnost","typ_platnost_txt"]
    */
    class Smlctpl extends Base<Gordic.Sml.Interface.GSmlctplDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlctplDto = Gordic.Sml.Interface.GSmlctplDto;
    type SmlctplDtoNames = Gordic.Sml.Interface.GSmlctplDtoNames;
    type SmlctplDtoFragments = Gordic.Sml.Interface.GSmlctplDtoFragments;
    type SmlctplDtoTypes = Gordic.Sml.Interface.GSmlctplDtoTypes;
    type SmlctplDtoTypeLengths = Gordic.Sml.Interface.GSmlctplDtoTypeLengths;

    /**
    * Typ ceny
    * keys: ["typ_ceny"]
    * columns: ["typ_ceny","typ_ceny_txt","k_v"]
    * filters: ["typ_ceny","typ_ceny_txt"]
    */
    class Smlctyc extends Base<Gordic.Sml.Interface.GSmlctycDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlctycDto = Gordic.Sml.Interface.GSmlctycDto;
    type SmlctycDtoNames = Gordic.Sml.Interface.GSmlctycDtoNames;
    type SmlctycDtoFragments = Gordic.Sml.Interface.GSmlctycDtoFragments;
    type SmlctycDtoTypes = Gordic.Sml.Interface.GSmlctycDtoTypes;
    type SmlctycDtoTypeLengths = Gordic.Sml.Interface.GSmlctycDtoTypeLengths;

    /**
    * Typ kurzu
    * keys: ["typ_kurz"]
    * columns: ["typ_kurz","typ_kurz_txt","k_v"]
    * filters: ["typ_kurz","typ_kurz_txt"]
    */
    class Smlctyk extends Base<Gordic.Sml.Interface.GSmlctykDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlctykDto = Gordic.Sml.Interface.GSmlctykDto;
    type SmlctykDtoNames = Gordic.Sml.Interface.GSmlctykDtoNames;
    type SmlctykDtoFragments = Gordic.Sml.Interface.GSmlctykDtoFragments;
    type SmlctykDtoTypes = Gordic.Sml.Interface.GSmlctykDtoTypes;
    type SmlctykDtoTypeLengths = Gordic.Sml.Interface.GSmlctykDtoTypeLengths;

    /**
    * Zpusob ukonceni
    * keys: ["ktg_zuk"]
    * columns: ["ktg_zuk","ktg_zuk_txt","k_v"]
    * filters: ["ktg_zuk","ktg_zuk_txt"]
    */
    class Smlczuk extends Base<Gordic.Sml.Interface.GSmlczukDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlczukDto = Gordic.Sml.Interface.GSmlczukDto;
    type SmlczukDtoNames = Gordic.Sml.Interface.GSmlczukDtoNames;
    type SmlczukDtoFragments = Gordic.Sml.Interface.GSmlczukDtoFragments;
    type SmlczukDtoTypes = Gordic.Sml.Interface.GSmlczukDtoTypes;
    type SmlczukDtoTypeLengths = Gordic.Sml.Interface.GSmlczukDtoTypeLengths;

    /**
    * reader pro vyřizující funkci
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun", "nazev_ref", "nazev_rf", "nazev", "cs_nazev", "ixs_orj"]
    * filters: ["ixs_fun","ixs_orj"]
    */
    class SmlFunVyriz extends Base<Gordic.Sml.Interface.GSmlFunVyrizDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlFunVyrizDto = Gordic.Sml.Interface.GSmlFunVyrizDto;
    type SmlFunVyrizDtoNames = Gordic.Sml.Interface.GSmlFunVyrizDtoNames;
    type SmlFunVyrizDtoFragments = Gordic.Sml.Interface.GSmlFunVyrizDtoFragments;
    type SmlFunVyrizDtoTypes = Gordic.Sml.Interface.GSmlFunVyrizDtoTypes;
    type SmlFunVyrizDtoTypeLengths = Gordic.Sml.Interface.GSmlFunVyrizDtoTypeLengths;

    /**
    * reader pro výběr knihy
    * keys: ["ixp_den","subrada"]
    * columns: ["nazev","ixp_den","subrada","id","rok","ktg_den"]
    * filters: ["ktg_den","value_pred"]
    */
    class SmlKniha extends Base<Gordic.Sml.Interface.GSmlKnihaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlKnihaDto = Gordic.Sml.Interface.GSmlKnihaDto;
    type SmlKnihaDtoNames = Gordic.Sml.Interface.GSmlKnihaDtoNames;
    type SmlKnihaDtoFragments = Gordic.Sml.Interface.GSmlKnihaDtoFragments;
    type SmlKnihaDtoTypes = Gordic.Sml.Interface.GSmlKnihaDtoTypes;
    type SmlKnihaDtoTypeLengths = Gordic.Sml.Interface.GSmlKnihaDtoTypeLengths;

    /**
    * reader pro kompetenta
    * keys: ["ixs_fun"]
    * columns: ["nazev_rf", "nazev", "ixs_orj"]
    * filters: ["cis_real","ixs_fun_komp"]
    */
    class SmlKomp extends Base<Gordic.Sml.Interface.GSmlKompDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlKompDto = Gordic.Sml.Interface.GSmlKompDto;
    type SmlKompDtoNames = Gordic.Sml.Interface.GSmlKompDtoNames;
    type SmlKompDtoFragments = Gordic.Sml.Interface.GSmlKompDtoFragments;
    type SmlKompDtoTypes = Gordic.Sml.Interface.GSmlKompDtoTypes;
    type SmlKompDtoTypeLengths = Gordic.Sml.Interface.GSmlKompDtoTypeLengths;

    /**
    * reader pro Orj
    * keys: ["ixs_orj"]
    * columns: ["ixs_orj","nazev"]
    * filters: ["ixs_orj"]
    */
    class SmlOrj extends Base<Gordic.Sml.Interface.GGinsorjDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlOrjDto = Gordic.Sml.Interface.GGinsorjDto;
    type SmlOrjDtoNames = Gordic.Sml.Interface.GGinsorjDtoNames;
    type SmlOrjDtoFragments = Gordic.Sml.Interface.GGinsorjDtoFragments;
    type SmlOrjDtoTypes = Gordic.Sml.Interface.GGinsorjDtoTypes;
    type SmlOrjDtoTypeLengths = Gordic.Sml.Interface.GGinsorjDtoTypeLengths;

    /**
    * reader pro ginsref all
    * keys: ["ixs_ref"]
    * columns: ["ixs_ref","nazev"]
    * filters: [""]
    */
    class SmlRefAll extends Base<Gordic.Sml.Interface.GSmlRefAllDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlRefAllDto = Gordic.Sml.Interface.GSmlRefAllDto;
    type SmlRefAllDtoNames = Gordic.Sml.Interface.GSmlRefAllDtoNames;
    type SmlRefAllDtoFragments = Gordic.Sml.Interface.GSmlRefAllDtoFragments;
    type SmlRefAllDtoTypes = Gordic.Sml.Interface.GSmlRefAllDtoTypes;
    type SmlRefAllDtoTypeLengths = Gordic.Sml.Interface.GSmlRefAllDtoTypeLengths;

    /**
    * reader typ položky VP
    * keys: ["ixs_dup"]
    * columns: ["ktg_poz_txt","nazev"]
    * filters: ["ixs_dup","ktg_poz_txt","nazev","ktg_poz"]
    */
    class SmlVepsdup extends Base<Gordic.Sml.Interface.GVepsdupDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlVepsdupDto = Gordic.Sml.Interface.GVepsdupDto;
    type SmlVepsdupDtoNames = Gordic.Sml.Interface.GVepsdupDtoNames;
    type SmlVepsdupDtoFragments = Gordic.Sml.Interface.GVepsdupDtoFragments;
    type SmlVepsdupDtoTypes = Gordic.Sml.Interface.GVepsdupDtoTypes;
    type SmlVepsdupDtoTypeLengths = Gordic.Sml.Interface.GVepsdupDtoTypeLengths;

    /**
    * Klientská část - Výběr veřejné zakázky
    * keys: ["ixs_pri","typ_ag_blok"]
    * columns: ["ixs_pri","typ_ag_blok","ac_ver_zak","ac_ag","nazev","soutez","fin_od","fin_do","typ_po","typ_fin"]
    * filters: ["ixs_pri","typ_ag_blok","ktg_sml","ixs_fun_vyriz","cis_real","ixs_typ","ixp_sml_pri","ac_ag","rok","nazev"]
    */
    class SmlAcVerZak extends Base<Gordic.Sml.Interface.GSmlAcVerZakDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlAcVerZakDto = Gordic.Sml.Interface.GSmlAcVerZakDto;
    type SmlAcVerZakDtoNames = Gordic.Sml.Interface.GSmlAcVerZakDtoNames;
    type SmlAcVerZakDtoFragments = Gordic.Sml.Interface.GSmlAcVerZakDtoFragments;
    type SmlAcVerZakDtoTypes = Gordic.Sml.Interface.GSmlAcVerZakDtoTypes;
    type SmlAcVerZakDtoTypeLengths = Gordic.Sml.Interface.GSmlAcVerZakDtoTypeLengths;

    /**
    * Klientská část - Číslo akce
    * keys: ["ixp","rok","nks","cislo","xuete"]
    * columns: ["ixp", "cislo", "rok"]
    * filters: [""]
    */
    class SmlRozaaat extends Base<Gordic.Sml.Interface.GRozaaatDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlRozaaatDto = Gordic.Sml.Interface.GRozaaatDto;
    type SmlRozaaatDtoNames = Gordic.Sml.Interface.GRozaaatDtoNames;
    type SmlRozaaatDtoFragments = Gordic.Sml.Interface.GRozaaatDtoFragments;
    type SmlRozaaatDtoTypes = Gordic.Sml.Interface.GRozaaatDtoTypes;
    type SmlRozaaatDtoTypeLengths = Gordic.Sml.Interface.GRozaaatDtoTypeLengths;

    /**
    * Klientská část AL - Reader pro limity realizátorů pro výběr realizátorů
    * keys: ["ixs_sml_pri","cis_real"]
    * columns: ["ixs_sml_pri","ico","cis_real","nazev","aktivita"]
    * filters: ["ixs_sml_pri","cis_real","ico","aktivita"]
    */
    class CisReal extends Base<Gordic.Sml.Interface.GReaderCisRealDto>
    {
        constructor(options?: IGReaderBase);
    }
    type CisRealDto = Gordic.Sml.Interface.GReaderCisRealDto;
    type CisRealDtoNames = Gordic.Sml.Interface.GReaderCisRealDtoNames;
    type CisRealDtoFragments = Gordic.Sml.Interface.GReaderCisRealDtoFragments;
    type CisRealDtoTypes = Gordic.Sml.Interface.GReaderCisRealDtoTypes;
    type CisRealDtoTypeLengths = Gordic.Sml.Interface.GReaderCisRealDtoTypeLengths;

    /**
    * Klientská část - Vlastní reader pro typ pohledávky (společný asi už existuje, ale u mě nefungoval)
    * keys: ["typ_phl"]
    * columns: ["typ_phl","nazev"]
    * filters: [""]
    */
    class Ddpstpp_vl extends Base<Gordic.Sml.Interface.GDdpstppDto>
    {
        constructor(options?: IGReaderBase);
    }
    type Ddpstpp_vlDto = Gordic.Sml.Interface.GDdpstppDto;
    type Ddpstpp_vlDtoNames = Gordic.Sml.Interface.GDdpstppDtoNames;
    type Ddpstpp_vlDtoFragments = Gordic.Sml.Interface.GDdpstppDtoFragments;
    type Ddpstpp_vlDtoTypes = Gordic.Sml.Interface.GDdpstppDtoTypes;
    type Ddpstpp_vlDtoTypeLengths = Gordic.Sml.Interface.GDdpstppDtoTypeLengths;

    /**
    * Klientská část AL - Vlastní bankovní účty (s možností vazby na veřejné zakázky)
    * keys: ["rok", "bu_vl", "sk_vl"]
    * columns: ["typ_bu_zkr", "bu_vl", "sk_vl", "bu_txt", "nazev", "uea_uc", "ueb_uc"]
    * filters: "filters"
    */
    class EkosuvlSml extends Base<Gordic.Data.Readers.EkosuvlDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - číselník Rozpočtový reprezentant účetních analytik
    * keys: ["rok","ico","ucs","uea_uc","ueb_uc"]
    * columns: ["uea", "ueb", "uea_uc", "ueb_uc", "popis", "typ_sa_txt"]
    * filters: ["rok","ico","ucs","uea_uc","ueb_uc"]
    */
    class Ekovabu extends Base<Gordic.Sml.Interface.GReaderEkovabuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EkovabuDto = Gordic.Sml.Interface.GReaderEkovabuDto;
    type EkovabuDtoNames = Gordic.Sml.Interface.GReaderEkovabuDtoNames;
    type EkovabuDtoFragments = Gordic.Sml.Interface.GReaderEkovabuDtoFragments;
    type EkovabuDtoTypes = Gordic.Sml.Interface.GReaderEkovabuDtoTypes;
    type EkovabuDtoTypeLengths = Gordic.Sml.Interface.GReaderEkovabuDtoTypeLengths;

    /**
    * reader pro výběr ixs esu po výběru veřejné zakázky, typ blokační agendy
    * keys: ["ixp_p"]
    * columns: ["typ_ag_blok_p","ixp_p","ixs_pri_p"]
    * filters: ["typ_ag_blok_p","ixp_p","ixs_pri_p"]
    */
    class EsuVerejneZakazce extends Base<Gordic.Sml.Interface.GEsuVerejneZakazceDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EsuVerejneZakazceDto = Gordic.Sml.Interface.GEsuVerejneZakazceDto;
    type EsuVerejneZakazceDtoNames = Gordic.Sml.Interface.GEsuVerejneZakazceDtoNames;
    type EsuVerejneZakazceDtoFragments = Gordic.Sml.Interface.GEsuVerejneZakazceDtoFragments;
    type EsuVerejneZakazceDtoTypes = Gordic.Sml.Interface.GEsuVerejneZakazceDtoTypes;
    type EsuVerejneZakazceDtoTypeLengths = Gordic.Sml.Interface.GEsuVerejneZakazceDtoTypeLengths;

    /**
    * Klientská část AL - číselník Evidenční karta majetku
    * keys: ["ixs_maj"]
    * columns: ["ixs_maj", "nazev", "inv_cis", "ser_cis", "evi_cis", "vyr_cis", "skp", "nazev_skp", "drh_id", "skupina_id", "mj", "mat_cis", "sarze"]
    * filters: ["ixs_maj","inv_cis","skp","nazev_skp","drh_id","skupina_id","mj","mat_cis","sarze","mat_akt","tka","tev","zev"]
    */
    class MajsmajSml extends Base<Gordic.Sml.Interface.GReaderMajsmajSmlDto>
    {
        constructor(options?: IGReaderBase);
    }
    type MajsmajSmlDto = Gordic.Sml.Interface.GReaderMajsmajSmlDto;
    type MajsmajSmlDtoNames = Gordic.Sml.Interface.GReaderMajsmajSmlDtoNames;
    type MajsmajSmlDtoFragments = Gordic.Sml.Interface.GReaderMajsmajSmlDtoFragments;
    type MajsmajSmlDtoTypes = Gordic.Sml.Interface.GReaderMajsmajSmlDtoTypes;
    type MajsmajSmlDtoTypeLengths = Gordic.Sml.Interface.GReaderMajsmajSmlDtoTypeLengths;

    /**
    * Klientská část AL - číselník Nové rozhraní na katalog ISL
    * keys: ["idk"]
    * columns: ["idk", "ids", "kod_druh", "mat_usk", "mj", "zkratka", "status_nsn", "nsc", "ziv_cyklus"]
    * filters: ["idk","aktivita","zkratka"]
    */
    class Matskcm extends Base<Gordic.Sml.Interface.GReaderMatskcmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type MatskcmDto = Gordic.Sml.Interface.GReaderMatskcmDto;
    type MatskcmDtoNames = Gordic.Sml.Interface.GReaderMatskcmDtoNames;
    type MatskcmDtoFragments = Gordic.Sml.Interface.GReaderMatskcmDtoFragments;
    type MatskcmDtoTypes = Gordic.Sml.Interface.GReaderMatskcmDtoTypes;
    type MatskcmDtoTypeLengths = Gordic.Sml.Interface.GReaderMatskcmDtoTypeLengths;

    /**
    * Klientská část AL - číselník Stavový soubor majetku - karty
    * keys: ["ixs_maj"]
    * columns: ["ixs_maj", "nazev", "inv_cis", "vyr_cis", "idk", "idk_kat", "ueab_evi", "cmj", "pmj", "c", "ico", "ucs", "nks", "drh_id", "skupina_id", "tev", "tka", "mat_akt", "mj", "dev"]
    * filters: ["ixs_maj","nazev","inv_cis","vyr_cis","idk","idk_kat","ueab_evi","cmj","pmj","c","ico","ucs","uus","nks","drh_id","skupina_id","tev","tka","mat_akt","mj","dev"]
    */
    class Matsmaj extends Base<Gordic.Sml.Interface.GReaderMatsmajDto>
    {
        constructor(options?: IGReaderBase);
    }
    type MatsmajDto = Gordic.Sml.Interface.GReaderMatsmajDto;
    type MatsmajDtoNames = Gordic.Sml.Interface.GReaderMatsmajDtoNames;
    type MatsmajDtoFragments = Gordic.Sml.Interface.GReaderMatsmajDtoFragments;
    type MatsmajDtoTypes = Gordic.Sml.Interface.GReaderMatsmajDtoTypes;
    type MatsmajDtoTypeLengths = Gordic.Sml.Interface.GReaderMatsmajDtoTypeLengths;

    /**
    * Klientská část - výběr ixs esu u platebního kalendáře
    * keys: ["ixs_esu","ixp_sml_pri"]
    * columns: ["ico","ixs_esu","ixp_sml_pri","ixp","bu_ci","sk_ci","esu_txt"]
    * filters: ["ixp_sml_pri","ixs_esu"]
    */
    class SmlKalIxsEsuSml extends Base<Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlKalIxsEsuSmlDto = Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDto;
    type SmlKalIxsEsuSmlDtoNames = Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDtoNames;
    type SmlKalIxsEsuSmlDtoFragments = Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDtoFragments;
    type SmlKalIxsEsuSmlDtoTypes = Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDtoTypes;
    type SmlKalIxsEsuSmlDtoTypeLengths = Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDtoTypeLengths;

    /**
    * Klientská část - výběr ixs esu ze smlsesu
    * keys: ["ixp_sml_pri"]
    * columns: ["ico_esu","ixs_esu_txt","typ_esu","ixs_esu","sk_ci","bu_ci","ixp","ixp_sml_pri"]
    * filters: ["ixp_sml_pri"]
    */
    class Smlsesu extends Base<Gordic.Sml.Interface.GReaderSmlsesuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlsesuDto = Gordic.Sml.Interface.GReaderSmlsesuDto;
    type SmlsesuDtoNames = Gordic.Sml.Interface.GReaderSmlsesuDtoNames;
    type SmlsesuDtoFragments = Gordic.Sml.Interface.GReaderSmlsesuDtoFragments;
    type SmlsesuDtoTypes = Gordic.Sml.Interface.GReaderSmlsesuDtoTypes;
    type SmlsesuDtoTypeLengths = Gordic.Sml.Interface.GReaderSmlsesuDtoTypeLengths;

    /**
    * Klientská část AL - číselník Šablona pro generování pohledávek
    * keys: ["ixs_ste"]
    * columns: ["ixs_ste", "nazev"]
    * filters: ["ixs_ste","typ_phl"]
    */
    class Smlsste extends Base<Gordic.Sml.Interface.GSmlssteDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlssteDto = Gordic.Sml.Interface.GSmlssteDto;
    type SmlssteDtoNames = Gordic.Sml.Interface.GSmlssteDtoNames;
    type SmlssteDtoFragments = Gordic.Sml.Interface.GSmlssteDtoFragments;
    type SmlssteDtoTypes = Gordic.Sml.Interface.GSmlssteDtoTypes;
    type SmlssteDtoTypeLengths = Gordic.Sml.Interface.GSmlssteDtoTypeLengths;

    /**
    * Klientská část - Smlszuk
    * keys: ["ixs_zuk"]
    * columns: ["ixs_zuk","nazev"]
    * filters: ["ixs_zuk"]
    */
    class Smlszuk extends Base<Gordic.Sml.Interface.GSmlszukDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlszukDto = Gordic.Sml.Interface.GSmlszukDto;
    type SmlszukDtoNames = Gordic.Sml.Interface.GSmlszukDtoNames;
    type SmlszukDtoFragments = Gordic.Sml.Interface.GSmlszukDtoFragments;
    type SmlszukDtoTypes = Gordic.Sml.Interface.GSmlszukDtoTypes;
    type SmlszukDtoTypeLengths = Gordic.Sml.Interface.GSmlszukDtoTypeLengths;

    /**
    * reader pro výběr typu dokladu
    * keys: ["ixs_typ","ktg_den"]
    * columns: ["nazev","ixs_typ","ktg_typ","st_utaj_id","spis_pl","spis_znak", "zkratka"]
    * filters: ["ixp_den","ktg_den","ixs_typ"]
    */
    class SmlTypDokladu extends Base<Gordic.Sml.Interface.GSslstypDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlTypDokladuDto = Gordic.Sml.Interface.GSslstypDto;
    type SmlTypDokladuDtoNames = Gordic.Sml.Interface.GSslstypDtoNames;
    type SmlTypDokladuDtoFragments = Gordic.Sml.Interface.GSslstypDtoFragments;
    type SmlTypDokladuDtoTypes = Gordic.Sml.Interface.GSslstypDtoTypes;
    type SmlTypDokladuDtoTypeLengths = Gordic.Sml.Interface.GSslstypDtoTypeLengths;

    /**
    * Klientská část Al - čiselník pro Sml Vlastník
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev_rf","cs_nazev"]
    * filters: ["rezimKniha","rezimHist","subrada","ixp_den"]
    */
    class SmlVlastnik extends Base<Gordic.Sml.Interface.GReaderSmlVlastnikDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlVlastnikDto = Gordic.Sml.Interface.GReaderSmlVlastnikDto;
    type SmlVlastnikDtoNames = Gordic.Sml.Interface.GReaderSmlVlastnikDtoNames;
    type SmlVlastnikDtoFragments = Gordic.Sml.Interface.GReaderSmlVlastnikDtoFragments;
    type SmlVlastnikDtoTypes = Gordic.Sml.Interface.GReaderSmlVlastnikDtoTypes;
    type SmlVlastnikDtoTypeLengths = Gordic.Sml.Interface.GReaderSmlVlastnikDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typ vazby
    * keys: ["typ_vazby"]
    * columns: ["typ_vazby_txt"]
    * filters: ["typ_vazby","typ_vazby_txt","k_v"]
    */
    class SmlWflctyv extends Base<Gordic.Data.Readers.SmlWflctyvDto>
    {
        constructor(options?: IGReaderBase);
    }
	/**Dto*/
	interface SmlWflctyvDto {
		/**Autogenerated.*/
		typ_vazby?: number|null;
		/**Autogenerated.*/
		typ_vazby_txt?: string|null;
		/**Autogenerated.*/
		k_v?: number|null;
	}
	const enum SmlWflctyvDtoNames { typ_vazby = "typ_vazby", typ_vazby_txt = "typ_vazby_txt", k_v = "k_v",}
	const enum SmlWflctyvDtoFragments { typ_vazby = "*", typ_vazby_txt = "*", k_v = "*",}
	const enum SmlWflctyvDtoTypes { typ_vazby = "number", typ_vazby_txt = "string", k_v = "number",}
	const enum SmlWflctyvDtoTypeLengths {}

    /**
    * reader pro zastupující funkci
    * keys: ["ixs_esu","lic","por_zast"]
    * columns: ["ixs_esu", "lic, IsKey = true", "tit_pred", "jmeno", "prijmeni", "tit_za", "funkce"]
    * filters: ["ixs_esu","lic","por_zast"]
    */
    class SmlZastoupenaOsoba extends Base<Gordic.Sml.Interface.GGindesuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SmlZastoupenaOsobaDto = Gordic.Sml.Interface.GGindesuDto;
    type SmlZastoupenaOsobaDtoNames = Gordic.Sml.Interface.GGindesuDtoNames;
    type SmlZastoupenaOsobaDtoFragments = Gordic.Sml.Interface.GGindesuDtoFragments;
    type SmlZastoupenaOsobaDtoTypes = Gordic.Sml.Interface.GGindesuDtoTypes;
    type SmlZastoupenaOsobaDtoTypeLengths = Gordic.Sml.Interface.GGindesuDtoTypeLengths;

    /**
    * Klientská část AL - číselník Smlouvy, objednávky
    * keys: ["ixp_smo","cis_smo","ixp_sml_pri"]
    * columns: ["ixp_smo", "cis_smo", "m_sml", "m_obj_sml", "m_maj", "c_sml", "c_obj_sml", "c_maj", "nazev", "ixp_sml_pri", "c_sml_mena_z", "cis_smo_sml"]
    * filters: ["cis_smo","ixp_smo","ixp_sml_pri","cis_smo_sml","vp_stav"]
    */
    class Vepssmo extends Base<Gordic.Sml.Interface.GReaderVepssmoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type VepssmoDto = Gordic.Sml.Interface.GReaderVepssmoDto;
    type VepssmoDtoNames = Gordic.Sml.Interface.GReaderVepssmoDtoNames;
    type VepssmoDtoFragments = Gordic.Sml.Interface.GReaderVepssmoDtoFragments;
    type VepssmoDtoTypes = Gordic.Sml.Interface.GReaderVepssmoDtoTypes;
    type VepssmoDtoTypeLengths = Gordic.Sml.Interface.GReaderVepssmoDtoTypeLengths;

    /**
    * Klientská část AL - číselník výběr dokladu a položky FP
    * keys: ["ixp","rok","cislo"]
    * columns: ["ixp","rok","ac","ac_sml","popis","cislo","c","c_rok"]
    * filters: ["ixp","cis_real","ixs_fun_vyriz","rok","cislo","cis_pol_pla","ico","ucs","nks","uea","ueb","uec","ued","uee","uef","ueg","ueh","uei","uej","te0","te1","te2","te3","te4","uek","uel","uem","uen","te5","te6","te7","te8","te9","drd","ixp_sml","rok_sml","cislo_sml","uea_rr","ueb_rr","ixs_pri","por_cis","priz_zaz"]
    */
    class VyberPolozky extends Base<Gordic.Sml.Interface.GReaderVyberPolozkyDto>
    {
        constructor(options?: IGReaderBase);
    }
    type VyberPolozkyDto = Gordic.Sml.Interface.GReaderVyberPolozkyDto;
    type VyberPolozkyDtoNames = Gordic.Sml.Interface.GReaderVyberPolozkyDtoNames;
    type VyberPolozkyDtoFragments = Gordic.Sml.Interface.GReaderVyberPolozkyDtoFragments;
    type VyberPolozkyDtoTypes = Gordic.Sml.Interface.GReaderVyberPolozkyDtoTypes;
    type VyberPolozkyDtoTypeLengths = Gordic.Sml.Interface.GReaderVyberPolozkyDtoTypeLengths;

    /**
    * Klientská část AL - číselník výběr ukazatele (číslo akce)
    * keys: ["ixs_uka","ixs_fun"]
    * columns: ["ixs_uka","ixs_fun","nazev"]
    * filters: ["ixs_uka","ixs_fun"]
    */
    class VyberUkazatele extends Base<Gordic.Sml.Interface.GReaderVyberUkazateleDto>
    {
        constructor(options?: IGReaderBase);
    }
    type VyberUkazateleDto = Gordic.Sml.Interface.GReaderVyberUkazateleDto;
    type VyberUkazateleDtoNames = Gordic.Sml.Interface.GReaderVyberUkazateleDtoNames;
    type VyberUkazateleDtoFragments = Gordic.Sml.Interface.GReaderVyberUkazateleDtoFragments;
    type VyberUkazateleDtoTypes = Gordic.Sml.Interface.GReaderVyberUkazateleDtoTypes;
    type VyberUkazateleDtoTypeLengths = Gordic.Sml.Interface.GReaderVyberUkazateleDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská AL - číselník Smlapid (případy)
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["ixp", "ac_sml", "popis"]
    *
    * DataReader
    * keys: ["ixp_sml_pri"]
    * columns: ["ixp_sml_pri", "ac_sml", "popis"]
    * filters: ["ixp_sml_pri","ac_sml","popis"]
    */
    function smlapidSml(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GPripadSmlDto>): GSelectBoxOptions<Gordic.Sml.Interface.GPripadSmlDto>;
    /**
    * Klientská AL - číselník Smlcpop (příznaky opce)
    * FieldOptions
    * itemTemplate: "{priz_opce_txt}"
    * helperColumns: ["priz_opce_txt", "priz_opce_zkr"]
    *
    * DataReader
    * keys: ["priz_opce"]
    * columns: ["priz_opce","priz_opce_txt","priz_opce_zkr"]
    * filters: ["priz_opce","priz_opce_txt","priz_opce_zkr"]
    */
    function smlcpop(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlcpopDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlcpopDto>;
    /**
    * Klientská AL - číselník Smlcprz (typy operace)
    * FieldOptions
    * itemTemplate: "{priz_zaz_txt}"
    * helperColumns: ["priz_zaz_txt"]
    *
    * DataReader
    * keys: ["priz_zaz"]
    * columns: ["priz_zaz","priz_zaz_txt"]
    * filters: ["priz_zaz","priz_zaz_txt"]
    */
    function smlcprz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlcprzDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlcprzDto>;
    /**
    * Klientská AL - číselník Smlcsta (stavy dokladu)
    * FieldOptions
    * itemTemplate: "{sml_stav_txt}"
    * helperColumns: ["sml_stav_txt","sml_stav_zkr"]
    *
    * DataReader
    * keys: ["sml_stav"]
    * columns: ["sml_stav","sml_stav_txt","sml_stav_zkr"]
    * filters: ["sml_stav","sml_stav_txt","sml_stav_zkr"]
    */
    function smlcsta(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlcstaDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlcstaDto>;
    /**
    * Klientská část - Výběr subjektů k veřejné zakázce
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ico","nazev","obec","zkratka","dic","bu_txt"]
    *
    * DataReader
    * keys: ["ixs_esu","ixp_nab","por_cis_nab"]
    * columns: ["ico","nazev","obec","zkratka","dic","bu_txt"]
    * filters: ["ixp","ixs_pri","typ_ag_blok"]
    */
    function smlEsuVerZak(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlEsuVerZakDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlEsuVerZakDto>;
    /**
    * výběr soutěže
    * FieldOptions
    * itemTemplate: "{soutez_txt}"
    * helperColumns: ["soutez","soutez_txt"]
    *
    * DataReader
    * keys: ["soutez"]
    * columns: ["soutez","soutez_txt"]
    * filters: ["soutez","soutez_txt"]
    */
    function smlSoutez(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlSoutezDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlSoutezDto>;
    /**
    * Klientská AL - číselník Smlspid (doklady)
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["ixp", "ac", "ac_sml", "popis"]
    *
    * DataReader
    * keys: ["ixp"]
    * columns: ["ixp","ac","ac_sml","popis"]
    * filters: ["ixp","ac","ac_sml","popis"]
    */
    function smlspid(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GDokladSmlDto>): GSelectBoxOptions<Gordic.Sml.Interface.GDokladSmlDto>;
    /**
    * Stav podpisu smlouvy
    * FieldOptions
    * itemTemplate: "{sgn_stav_txt}"
    * helperColumns: ["sgn_stav_txt"]
    *
    * DataReader
    * keys: ["sgn_stav"]
    * columns: ["sgn_stav","sgn_stav_txt","k_v"]
    * filters: ["sgn_stav","sgn_stav_txt"]
    */
    function smlcsts(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlcstsDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlcstsDto>;
    /**
    * Typ platnosti
    * FieldOptions
    * itemTemplate: "{typ_platnost_txt}"
    * helperColumns: ["typ_platnost_txt"]
    *
    * DataReader
    * keys: ["typ_platnost"]
    * columns: ["typ_platnost","typ_platnost_txt","k_v"]
    * filters: ["typ_platnost","typ_platnost_txt"]
    */
    function smlctpl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlctplDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlctplDto>;
    /**
    * Typ ceny
    * FieldOptions
    * itemTemplate: "{typ_ceny_txt}"
    * helperColumns: ["typ_ceny_txt"]
    *
    * DataReader
    * keys: ["typ_ceny"]
    * columns: ["typ_ceny","typ_ceny_txt","k_v"]
    * filters: ["typ_ceny","typ_ceny_txt"]
    */
    function smlctyc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlctycDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlctycDto>;
    /**
    * Typ kurzu
    * FieldOptions
    * itemTemplate: "{typ_kurz_txt}"
    * helperColumns: ["typ_kurz_txt"]
    *
    * DataReader
    * keys: ["typ_kurz"]
    * columns: ["typ_kurz","typ_kurz_txt","k_v"]
    * filters: ["typ_kurz","typ_kurz_txt"]
    */
    function smlctyk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlctykDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlctykDto>;
    /**
    * Zpusob ukonceni
    * FieldOptions
    * itemTemplate: "{ktg_zuk_txt}"
    * helperColumns: ["ktg_zuk_txt"]
    *
    * DataReader
    * keys: ["ktg_zuk"]
    * columns: ["ktg_zuk","ktg_zuk_txt","k_v"]
    * filters: ["ktg_zuk","ktg_zuk_txt"]
    */
    function smlczuk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlczukDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlczukDto>;
    /**
    * reader pro vyřizující funkci
    * FieldOptions
    * itemTemplate: "{nazev_ref:trim:encode}, {nazev:trim:encode}"
    * helperColumns: ["nazev_ref", "nazev"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun", "nazev_ref", "nazev_rf", "nazev", "cs_nazev", "ixs_orj"]
    * filters: ["ixs_fun","ixs_orj"]
    */
    function smlFunVyriz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlFunVyrizDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlFunVyrizDto>;
    /**
    * reader pro výběr knihy
    * FieldOptions
    * itemTemplate: "{?}"
    * helperColumns: ["?"]
    *
    * DataReader
    * keys: ["ixp_den","subrada"]
    * columns: ["nazev","ixp_den","subrada","id","rok","ktg_den"]
    * filters: ["ktg_den","value_pred"]
    */
    function smlKniha(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlKnihaDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlKnihaDto>;
    /**
    * reader pro kompetenta
    * FieldOptions
    * itemTemplate: "{nazev_rf:trim:encode}"
    * helperColumns: ["nazev_rf", "nazev"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["nazev_rf", "nazev", "ixs_orj"]
    * filters: ["cis_real","ixs_fun_komp"]
    */
    function smlKomp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlKompDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlKompDto>;
    /**
    * reader pro Orj
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_orj"]
    * columns: ["ixs_orj","nazev"]
    * filters: ["ixs_orj"]
    */
    function smlOrj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GGinsorjDto>): GSelectBoxOptions<Gordic.Sml.Interface.GGinsorjDto>;
    /**
    * reader pro ginsref all
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_ref"]
    * columns: ["ixs_ref","nazev"]
    * filters: [""]
    */
    function smlRefAll(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlRefAllDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlRefAllDto>;
    /**
    * reader typ položky VP
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_dup"]
    * columns: ["ktg_poz_txt","nazev"]
    * filters: ["ixs_dup","ktg_poz_txt","nazev","ktg_poz"]
    */
    function smlVepsdup(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GVepsdupDto>): GSelectBoxOptions<Gordic.Sml.Interface.GVepsdupDto>;
    /**
    * Klientská část AL - Reader pro limity realizátorů pro výběr realizátorů
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_sml_pri","cis_real"]
    * columns: ["ixs_sml_pri","ico","cis_real","nazev","aktivita"]
    * filters: ["ixs_sml_pri","cis_real","ico","aktivita"]
    */
    function cisReal(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderCisRealDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderCisRealDto>;
    /**
    * Klientská část - Vlastní reader pro typ pohledávky (společný asi už existuje, ale u mě nefungoval)
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["typ_phl"]
    * columns: ["typ_phl","nazev"]
    * filters: [""]
    */
    function ddpstpp_vl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GDdpstppDto>): GSelectBoxOptions<Gordic.Sml.Interface.GDdpstppDto>;
    /**
    * Klientská část AL - Vlastní bankovní účty (s možností vazby na veřejné zakázky)
    * FieldOptions
    * itemTemplate: "{bu_vl:trim:encode} / {sk_vl:trim:encode}"
    * helperColumns: ["bu_vl", "sk_vl", "nazev", "uea_uc", "ueb_uc"]
    *
    * DataReader
    * keys: ["rok", "bu_vl", "sk_vl"]
    * columns: ["typ_bu_zkr", "bu_vl", "sk_vl", "bu_txt", "nazev", "uea_uc", "ueb_uc"]
    * filters: "filters"
    */
    function ekosuvlSml(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Data.Readers.EkosuvlDto>): GSelectBoxOptions<Gordic.Data.Readers.EkosuvlDto>;
    /**
    * Klientská část AL - číselník Rozpočtový reprezentant účetních analytik
    * FieldOptions
    * itemTemplate: "{uea:trim:encode}"
    * helperColumns: ["uea"]
    *
    * DataReader
    * keys: ["rok","ico","ucs","uea_uc","ueb_uc"]
    * columns: ["uea", "ueb", "uea_uc", "ueb_uc", "popis", "typ_sa_txt"]
    * filters: ["rok","ico","ucs","uea_uc","ueb_uc"]
    */
    function ekovabu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderEkovabuDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderEkovabuDto>;
    /**
    * reader pro výběr ixs esu po výběru veřejné zakázky, typ blokační agendy
    * FieldOptions
    * itemTemplate: "{ixs_pri_p}"
    * helperColumns: ["ixs_pri_p"]
    *
    * DataReader
    * keys: ["ixp_p"]
    * columns: ["typ_ag_blok_p","ixp_p","ixs_pri_p"]
    * filters: ["typ_ag_blok_p","ixp_p","ixs_pri_p"]
    */
    function esuVerejneZakazce(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GEsuVerejneZakazceDto>): GSelectBoxOptions<Gordic.Sml.Interface.GEsuVerejneZakazceDto>;
    /**
    * Klientská část AL - číselník Evidenční karta majetku
    * FieldOptions
    * itemTemplate: "{ixs_maj:trim:encode}"
    * helperColumns: ["ixs_maj"]
    *
    * DataReader
    * keys: ["ixs_maj"]
    * columns: ["ixs_maj", "nazev", "inv_cis", "ser_cis", "evi_cis", "vyr_cis", "skp", "nazev_skp", "drh_id", "skupina_id", "mj", "mat_cis", "sarze"]
    * filters: ["ixs_maj","inv_cis","skp","nazev_skp","drh_id","skupina_id","mj","mat_cis","sarze","mat_akt","tka","tev","zev"]
    */
    function majsmajSml(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderMajsmajSmlDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderMajsmajSmlDto>;
    /**
    * Klientská část AL - číselník Nové rozhraní na katalog ISL
    * FieldOptions
    * itemTemplate: "{idk:trim:encode}"
    * helperColumns: ["idk"]
    *
    * DataReader
    * keys: ["idk"]
    * columns: ["idk", "ids", "kod_druh", "mat_usk", "mj", "zkratka", "status_nsn", "nsc", "ziv_cyklus"]
    * filters: ["idk","aktivita","zkratka"]
    */
    function matskcm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderMatskcmDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderMatskcmDto>;
    /**
    * Klientská část AL - číselník Stavový soubor majetku - karty
    * FieldOptions
    * itemTemplate: "{inv_cis:trim:encode}"
    * helperColumns: ["inv_cis"]
    *
    * DataReader
    * keys: ["ixs_maj"]
    * columns: ["ixs_maj", "nazev", "inv_cis", "vyr_cis", "idk", "idk_kat", "ueab_evi", "cmj", "pmj", "c", "ico", "ucs", "nks", "drh_id", "skupina_id", "tev", "tka", "mat_akt", "mj", "dev"]
    * filters: ["ixs_maj","nazev","inv_cis","vyr_cis","idk","idk_kat","ueab_evi","cmj","pmj","c","ico","ucs","uus","nks","drh_id","skupina_id","tev","tka","mat_akt","mj","dev"]
    */
    function matsmaj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderMatsmajDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderMatsmajDto>;
    /**
    * Klientská část - výběr ixs esu u platebního kalendáře
    * FieldOptions
    * itemTemplate: "{esu_txt:trim:encode}"
    * helperColumns: ["esu_txt"]
    *
    * DataReader
    * keys: ["ixs_esu","ixp_sml_pri"]
    * columns: ["ico","ixs_esu","ixp_sml_pri","ixp","bu_ci","sk_ci","esu_txt"]
    * filters: ["ixp_sml_pri","ixs_esu"]
    */
    function smlKalIxsEsuSml(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDto>;
    /**
    * Klientská část - výběr ixs esu ze smlsesu
    * FieldOptions
    * itemTemplate: "{ixs_esu_txt:trim:encode}"
    * helperColumns: ["ixs_esu_txt"]
    *
    * DataReader
    * keys: ["ixp_sml_pri"]
    * columns: ["ico_esu","ixs_esu_txt","typ_esu","ixs_esu","sk_ci","bu_ci","ixp","ixp_sml_pri"]
    * filters: ["ixp_sml_pri"]
    */
    function smlsesu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderSmlsesuDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderSmlsesuDto>;
    /**
    * Klientská část AL - číselník Šablona pro generování pohledávek
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_ste"]
    * columns: ["ixs_ste", "nazev"]
    * filters: ["ixs_ste","typ_phl"]
    */
    function smlsste(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlssteDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlssteDto>;
    /**
    * Klientská část - Smlszuk
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_zuk"]
    * columns: ["ixs_zuk","nazev"]
    * filters: ["ixs_zuk"]
    */
    function smlszuk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSmlszukDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSmlszukDto>;
    /**
    * reader pro výběr typu dokladu
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev", "zkratka"]
    *
    * DataReader
    * keys: ["ixs_typ","ktg_den"]
    * columns: ["nazev","ixs_typ","ktg_typ","st_utaj_id","spis_pl","spis_znak", "zkratka"]
    * filters: ["ixp_den","ktg_den","ixs_typ"]
    */
    function smlTypDokladu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GSslstypDto>): GSelectBoxOptions<Gordic.Sml.Interface.GSslstypDto>;
    /**
    * Klientská část Al - čiselník pro Sml Vlastník
    * FieldOptions
    * itemTemplate: "{nazev_rf:trim:encode}"
    * helperColumns: ["nazev_rf"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev_rf","cs_nazev"]
    * filters: ["rezimKniha","rezimHist","subrada","ixp_den"]
    */
    function smlVlastnik(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderSmlVlastnikDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderSmlVlastnikDto>;
    /**
    * Klientská část AL - číselník Typ vazby
    * FieldOptions
    * itemTemplate: "{typ_vazby_txt:trim:encode}"
    * helperColumns: ["typ_vazby_txt"]
    *
    * DataReader
    * keys: ["typ_vazby"]
    * columns: ["typ_vazby_txt"]
    * filters: ["typ_vazby","typ_vazby_txt","k_v"]
    */
    function SmlWflctyv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Data.Readers.SmlWflctyvDto>): GSelectBoxOptions<Gordic.Data.Readers.SmlWflctyvDto>;
    /**
    * reader pro zastupující funkci
    * FieldOptions
    * itemTemplate: "{prijmeni:trim:encode} {jmeno:trim:encode} {tit_pred:trim:encode}"
    * helperColumns: ["tit_pred", "jmeno", "prijmeni", "tit_za", "funkce"]
    *
    * DataReader
    * keys: ["ixs_esu","lic","por_zast"]
    * columns: ["ixs_esu", "lic, IsKey = true", "tit_pred", "jmeno", "prijmeni", "tit_za", "funkce"]
    * filters: ["ixs_esu","lic","por_zast"]
    */
    function SmlZastoupenaOsoba(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GGindesuDto>): GSelectBoxOptions<Gordic.Sml.Interface.GGindesuDto>;
    /**
    * Klientská část AL - číselník Smlouvy, objednávky
    * FieldOptions
    * itemTemplate: "{cis_smo}"
    * helperColumns: ["cis_smo"]
    *
    * DataReader
    * keys: ["ixp_smo","cis_smo","ixp_sml_pri"]
    * columns: ["ixp_smo", "cis_smo", "m_sml", "m_obj_sml", "m_maj", "c_sml", "c_obj_sml", "c_maj", "nazev", "ixp_sml_pri", "c_sml_mena_z", "cis_smo_sml"]
    * filters: ["cis_smo","ixp_smo","ixp_sml_pri","cis_smo_sml","vp_stav"]
    */
    function vepssmo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderVepssmoDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderVepssmoDto>;
    /**
    * Klientská část AL - číselník výběr dokladu a položky FP
    * FieldOptions
    * itemTemplate: "{ixp:trim:encode}"
    * helperColumns: ["ixp"]
    *
    * DataReader
    * keys: ["ixp","rok","cislo"]
    * columns: ["ixp","rok","ac","ac_sml","popis","cislo","c","c_rok"]
    * filters: ["ixp","cis_real","ixs_fun_vyriz","rok","cislo","cis_pol_pla","ico","ucs","nks","uea","ueb","uec","ued","uee","uef","ueg","ueh","uei","uej","te0","te1","te2","te3","te4","uek","uel","uem","uen","te5","te6","te7","te8","te9","drd","ixp_sml","rok_sml","cislo_sml","uea_rr","ueb_rr","ixs_pri","por_cis","priz_zaz"]
    */
    function vyberPolozky(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderVyberPolozkyDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderVyberPolozkyDto>;
    /**
    * Klientská část AL - číselník výběr ukazatele (číslo akce)
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_uka","ixs_fun"]
    * columns: ["ixs_uka","ixs_fun","nazev"]
    * filters: ["ixs_uka","ixs_fun"]
    */
    function vyberUkazatele(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Sml.Interface.GReaderVyberUkazateleDto>): GSelectBoxOptions<Gordic.Sml.Interface.GReaderVyberUkazateleDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská AL - číselník Smlapid (případy)
    */
    function smlapidSml(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GPripadSmlDto>;
    /**
    * Klientská část - Výběr subjektů k veřejné zakázce
    */
    function smlEsuVerZak(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GSmlEsuVerZakDto>;
    /**
    * Klientská AL - číselník Smlspid (doklady)
    */
    function smlspid(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GDokladSmlDto>;
    /**
    * reader typ položky VP
    */
    function smlVepsdup(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GVepsdupDto>;
    /**
    * Klientská část AL - Vlastní bankovní účty (s možností vazby na veřejné zakázky)
    */
    function ekosuvlSml(): Selectors.DefaultSelectorOptions<Gordic.Data.Readers.EkosuvlDto>;
    /**
    * Klientská část AL - číselník Rozpočtový reprezentant účetních analytik
    */
    function ekovabu(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderEkovabuDto>;
    /**
    * reader pro výběr ixs esu po výběru veřejné zakázky, typ blokační agendy
    */
    function esuVerejneZakazce(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GEsuVerejneZakazceDto>;
    /**
    * Klientská část AL - číselník Evidenční karta majetku
    */
    function majsmajSml(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderMajsmajSmlDto>;
    /**
    * Klientská část AL - číselník Nové rozhraní na katalog ISL
    */
    function matskcm(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderMatskcmDto>;
    /**
    * Klientská část AL - číselník Stavový soubor majetku - karty
    */
    function matsmaj(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderMatsmajDto>;
    /**
    * Klientská část - výběr ixs esu u platebního kalendáře
    */
    function smlKalIxsEsuSml(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderSmlKalIxsEsuSmlDto>;
    /**
    * Klientská část - výběr ixs esu ze smlsesu
    */
    function smlsesu(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderSmlsesuDto>;
    /**
    * Klientská část AL - číselník Šablona pro generování pohledávek
    */
    function smlsste(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GSmlssteDto>;
    /**
    * Klientská část AL - číselník Typ vazby
    */
    function SmlWflctyv(): Selectors.DefaultSelectorOptions<Gordic.Data.Readers.SmlWflctyvDto>;
    /**
    * reader pro zastupující funkci
    */
    function SmlZastoupenaOsoba(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GGindesuDto>;
    /**
    * Klientská část AL - číselník Smlouvy, objednávky
    */
    function vepssmo(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderVepssmoDto>;
    /**
    * Klientská část AL - číselník výběr dokladu a položky FP
    */
    function vyberPolozky(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderVyberPolozkyDto>;
    /**
    * Klientská část AL - číselník výběr ukazatele (číslo akce)
    */
    function vyberUkazatele(): Selectors.DefaultSelectorOptions<Gordic.Sml.Interface.GReaderVyberUkazateleDto>;}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Client\Sml\GReaderSmlAcVerZak\smlAcVerZak.fields.d.ts 

declare namespace Gordic.Prefabs.Select {
    /**
     * Prefab políčka pro výběr veřejné zakázky
     * @param options
     */
    function smlAcVerZak(options: any): GSelectBoxOptions<any>
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Sml.Client\Sml\GReaderSmlRozaaat\smlRozaaat.fields.d.ts 

declare namespace Gordic.Prefabs.Select {
    /**
     * Prefab pol��ka pro v�b�r ��sla akce
     * @param options
     */
    function smlRozaaat(options: any): GSelectBoxOptions<any>
}

//#endregion

