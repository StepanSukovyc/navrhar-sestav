declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["akt_subrady"]
    * columns: ["akt_subrady", "akt_subrady_txt", "k_v", "k_s", "k_xml"]
    * filters: ["akt_subrady"]
    */
    class AdeEkocakr extends Base<Gordic.Ade.Interface.GEkocakrDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkocakrDto = Gordic.Ade.Interface.GEkocakrDto;
    type AdeEkocakrDtoNames = Gordic.Ade.Interface.GEkocakrDtoNames;
    type AdeEkocakrDtoFragments = Gordic.Ade.Interface.GEkocakrDtoFragments;
    type AdeEkocakrDtoTypes = Gordic.Ade.Interface.GEkocakrDtoTypes;
    type AdeEkocakrDtoTypeLengths = Gordic.Ade.Interface.GEkocakrDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * keys: ["ixp_kur"]
    * columns: ["ixp_kur", "rada_kur", "cislo", "rok", "mesic", "den", "dat_mpd", "dat_platnost_od", "prep_zp"]
    * filters: ["ixp_kur","rada_kur","cislo","rok","mesic","den","dat_mpd","dat_platnost_od","prep_zp"]
    */
    class AdeEkoskur extends Base<Gordic.Ade.Interface.GAdeEkoskurDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkoskurDto = Gordic.Ade.Interface.GAdeEkoskurDto;
    type AdeEkoskurDtoNames = Gordic.Ade.Interface.GAdeEkoskurDtoNames;
    type AdeEkoskurDtoFragments = Gordic.Ade.Interface.GAdeEkoskurDtoFragments;
    type AdeEkoskurDtoTypes = Gordic.Ade.Interface.GAdeEkoskurDtoTypes;
    type AdeEkoskurDtoTypeLengths = Gordic.Ade.Interface.GAdeEkoskurDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Bankovní účty vlastní.
    * keys: ["rok","bu_vl","sk_vl"]
    * columns: ["rok","bu_vl","sk_vl","ico","ucs","bu_txt","ktg_bu","aktivita","dat_od","dat_do","uea_lim","ueb_lim","ixs_esu_ban","c_lim","c_kuhr","c_uhr","typ_bu","nazev","zkratka","mena","uea_uc","ueb_uc","subrada_duz","priz_up_bu","ixp_den_buc","sbu","dat_bvy","c_ps","c_rok_db","c_rok_kr","c_zust","druh_bu","cis_bvy","ixp_bvy","c_lim_max","uus","iban","zc_vyp","per_vyp","ur_prist_bu","priz_isprofin","kod_vys","kon_maxlim","par_vyp","c_lim_ban","c_zust_ban","dat_bvy_ban","dat_ttv","priz_sr","id_hdr_ris_kr","radek_hdr_kr","priz_rozp","priz_spol_u","ode_sp","ukl_pri","id_nt_max","fidoo"]
    * filters: ["rok","ico","ucs","bu_vl","sk_vl","bu_txt","ktg_bu","aktivita","dat_od","dat_do","uea_lim","ueb_lim","ixs_esu_ban","c_lim","c_kuhr","c_uhr","typ_bu","nazev","zkratka","mena","uea_uc","ueb_uc","subrada_duz","priz_up_bu","ixp_den_buc","sbu","dat_bvy","c_ps","c_rok_db","c_rok_kr","c_zust","druh_bu","cis_bvy","ixp_bvy","c_lim_max","uus","iban","zc_vyp","per_vyp","ur_prist_bu","priz_isprofin","kod_vys","kon_maxlim","par_vyp","c_lim_ban","c_zust_ban","dat_bvy_ban","dat_ttv","priz_sr","id_hdr_ris_kr","radek_hdr_kr","priz_rozp","priz_spol_u","ode_sp","ukl_pri","id_nt_max","fidoo"]
    */
    class AdeEkosuvl extends Base<Gordic.Ade.Interface.GAdeEkosuvlDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkosuvlDto = Gordic.Ade.Interface.GAdeEkosuvlDto;
    type AdeEkosuvlDtoNames = Gordic.Ade.Interface.GAdeEkosuvlDtoNames;
    type AdeEkosuvlDtoFragments = Gordic.Ade.Interface.GAdeEkosuvlDtoFragments;
    type AdeEkosuvlDtoTypes = Gordic.Ade.Interface.GAdeEkosuvlDtoTypes;
    type AdeEkosuvlDtoTypeLengths = Gordic.Ade.Interface.GAdeEkosuvlDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Finanční účtárna.
    * keys: ["typ_upr"]
    * columns: ["typ_upr", "nazev_upr", "ktg_tup", "typ_zauc", "ktg_typ", "aktivita", "real_upr", "k_v", "k_k", "cs_nazev"]
    * filters: ["typ_upr","nazev_upr","ktg_tup","typ_zauc","ktg_typ","aktivita","real_upr","k_v","k_k","cs_nazev"]
    */
    class AdeFucstup extends Base<Gordic.Ade.Interface.GAdeFucstupDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeFucstupDto = Gordic.Ade.Interface.GAdeFucstupDto;
    type AdeFucstupDtoNames = Gordic.Ade.Interface.GAdeFucstupDtoNames;
    type AdeFucstupDtoFragments = Gordic.Ade.Interface.GAdeFucstupDtoFragments;
    type AdeFucstupDtoTypes = Gordic.Ade.Interface.GAdeFucstupDtoTypes;
    type AdeFucstupDtoTypeLengths = Gordic.Ade.Interface.GAdeFucstupDtoTypeLengths;

    /**
    * Klientská část AL - číselník Spisové uzly povolené pro ekonomické subjekty (ico, ucs, rok)
    * keys: ["ixs_su"]
    * columns: ["ixs_su", "nazev"]
    * filters: ["ixs_su","ico","ucs","rok","aktivita"]
    */
    class AdeGinspod extends Base<Gordic.Ade.Interface.GGinspodEkoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeGinspodDto = Gordic.Ade.Interface.GGinspodEkoDto;
    type AdeGinspodDtoNames = Gordic.Ade.Interface.GGinspodEkoDtoNames;
    type AdeGinspodDtoFragments = Gordic.Ade.Interface.GGinspodEkoDtoFragments;
    type AdeGinspodDtoTypes = Gordic.Ade.Interface.GGinspodEkoDtoTypes;
    type AdeGinspodDtoTypeLengths = Gordic.Ade.Interface.GGinspodEkoDtoTypeLengths;

    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["ktg_den"]
    * columns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    * filters: [""]
    */
    class AdeMzacktd extends Base<Gordic.Ade.Interface.GMzacktdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeMzacktdDto = Gordic.Ade.Interface.GMzacktdDto;
    type AdeMzacktdDtoNames = Gordic.Ade.Interface.GMzacktdDtoNames;
    type AdeMzacktdDtoFragments = Gordic.Ade.Interface.GMzacktdDtoFragments;
    type AdeMzacktdDtoTypes = Gordic.Ade.Interface.GMzacktdDtoTypes;
    type AdeMzacktdDtoTypeLengths = Gordic.Ade.Interface.GMzacktdDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kniha PCN.
    * keys: ["ktg_den"]
    * columns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    * filters: ["ktg_den","ktg_den_txt","k_v","k_s"]
    */
    class AdePsccktd extends Base<Gordic.Ade.Interface.GAdePsccktdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePsccktdDto = Gordic.Ade.Interface.GAdePsccktdDto;
    type AdePsccktdDtoNames = Gordic.Ade.Interface.GAdePsccktdDtoNames;
    type AdePsccktdDtoFragments = Gordic.Ade.Interface.GAdePsccktdDtoFragments;
    type AdePsccktdDtoTypes = Gordic.Ade.Interface.GAdePsccktdDtoTypes;
    type AdePsccktdDtoTypeLengths = Gordic.Ade.Interface.GAdePsccktdDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kategorie náhrad.
    * keys: ["ktg_tna"]
    * columns: ["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]
    * filters: ["ktg_tna","ktg_tna_txt","k_v","k_s"]
    */
    class AdePscctna extends Base<Gordic.Ade.Interface.GAdePscctnaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscctnaDto = Gordic.Ade.Interface.GAdePscctnaDto;
    type AdePscctnaDtoNames = Gordic.Ade.Interface.GAdePscctnaDtoNames;
    type AdePscctnaDtoFragments = Gordic.Ade.Interface.GAdePscctnaDtoFragments;
    type AdePscctnaDtoTypes = Gordic.Ade.Interface.GAdePscctnaDtoTypes;
    type AdePscctnaDtoTypeLengths = Gordic.Ade.Interface.GAdePscctnaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Stravné.
    * keys: ["typ_poz"]
    * columns: ["typ_poz", "typ_poz_txt", "k_v", "k_s"]
    * filters: ["typ_poz","typ_poz_txt","k_v","k_s"]
    */
    class AdePscctyp extends Base<Gordic.Ade.Interface.GAdePscctypDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscctypDto = Gordic.Ade.Interface.GAdePscctypDto;
    type AdePscctypDtoNames = Gordic.Ade.Interface.GAdePscctypDtoNames;
    type AdePscctypDtoFragments = Gordic.Ade.Interface.GAdePscctypDtoFragments;
    type AdePscctypDtoTypes = Gordic.Ade.Interface.GAdePscctypDtoTypes;
    type AdePscctypDtoTypeLengths = Gordic.Ade.Interface.GAdePscctypDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Typ náhrady.
    * keys: ["zp_dopr"]
    * columns: ["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]
    * filters: ["zp_dopr","zp_dopr_txt","k_v","k_s"]
    */
    class AdePscczpd extends Base<Gordic.Ade.Interface.GAdePscczpdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscczpdDto = Gordic.Ade.Interface.GAdePscczpdDto;
    type AdePscczpdDtoNames = Gordic.Ade.Interface.GAdePscczpdDtoNames;
    type AdePscczpdDtoFragments = Gordic.Ade.Interface.GAdePscczpdDtoFragments;
    type AdePscczpdDtoTypes = Gordic.Ade.Interface.GAdePscczpdDtoTypes;
    type AdePscczpdDtoTypeLengths = Gordic.Ade.Interface.GAdePscczpdDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Způsoby výpočtu.
    * keys: ["zp_vyp","typ_poz"]
    * columns: ["zp_vyp", "zp_vyp_txt", "k_v", "k_s", "typ_poz"]
    * filters: ["zp_vyp","zp_vyp_txt","k_v","k_s","typ_poz"]
    */
    class AdePscczpv extends Base<Gordic.Ade.Interface.GAdePscczpvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscczpvDto = Gordic.Ade.Interface.GAdePscczpvDto;
    type AdePscczpvDtoNames = Gordic.Ade.Interface.GAdePscczpvDtoNames;
    type AdePscczpvDtoFragments = Gordic.Ade.Interface.GAdePscczpvDtoFragments;
    type AdePscczpvDtoTypes = Gordic.Ade.Interface.GAdePscczpvDtoTypes;
    type AdePscczpvDtoTypeLengths = Gordic.Ade.Interface.GAdePscczpvDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kniha PCN.
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]
    * filters: ["ixp_den","subrada","zkratka","nazev","akt_subrady","ac_cislo_do","ac_cislo_od","ac_cislo_max","mesic","ixs_su"]
    */
    class AdePscrdac extends Base<Gordic.Ade.Interface.GAdePscrdacDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscrdacDto = Gordic.Ade.Interface.GAdePscrdacDto;
    type AdePscrdacDtoNames = Gordic.Ade.Interface.GAdePscrdacDtoNames;
    type AdePscrdacDtoFragments = Gordic.Ade.Interface.GAdePscrdacDtoFragments;
    type AdePscrdacDtoTypes = Gordic.Ade.Interface.GAdePscrdacDtoTypes;
    type AdePscrdacDtoTypeLengths = Gordic.Ade.Interface.GAdePscrdacDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Definice členění záznamů na deník RCN.
    * keys: ["ixs_cle"]
    * columns: ["ixs_cle", "nazev", "kod_cle", "poznamka", "uea", "ueb", "uec", "ued", "uee", "uef", "ueg", "ueh", "uei", "uej", "te0", "te1", "te2", "te3", "te4", "aktivita", "uek", "uel", "uem", "uen", "te5", "te6", "te7", "te8", "te9"]
    * filters: ["ixs_cle","nazev","kod_cle","poznamka","uea","ueb","uec","ued","uee","uef","ueg","ueh","uei","uej","te0","te1","te2","te3","te4","aktivita","uek","uel","uem","uen","te5","te6","te7","te8","te9"]
    */
    class AdePscscle extends Base<Gordic.Ade.Interface.GAdePscscleDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscscleDto = Gordic.Ade.Interface.GAdePscscleDto;
    type AdePscscleDtoNames = Gordic.Ade.Interface.GAdePscscleDtoNames;
    type AdePscscleDtoFragments = Gordic.Ade.Interface.GAdePscscleDtoFragments;
    type AdePscscleDtoTypes = Gordic.Ade.Interface.GAdePscscleDtoTypes;
    type AdePscscleDtoTypeLengths = Gordic.Ade.Interface.GAdePscscleDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Definice členění záznamů na deník RCN.
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "lic", "arw", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "poznamka", "aktivita", "rok_sberu", "priz_plan"]
    * filters: ["ixp_den","lic","arw","dat_od","dat_do","ico","ucs","nazev","rok","typ_den","ktg_den","por_cislo_max","subrada_max","subrada_duz","len_ac","krok_uza","ixp_den_old","uus","prefix","suffix","poznamka","aktivita","rok_sberu","priz_plan"]
    */
    class AdePscsden extends Base<Gordic.Ade.Interface.GAdePscsdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscsdenDto = Gordic.Ade.Interface.GAdePscsdenDto;
    type AdePscsdenDtoNames = Gordic.Ade.Interface.GAdePscsdenDtoNames;
    type AdePscsdenDtoFragments = Gordic.Ade.Interface.GAdePscsdenDtoFragments;
    type AdePscsdenDtoTypes = Gordic.Ade.Interface.GAdePscsdenDtoTypes;
    type AdePscsdenDtoTypeLengths = Gordic.Ade.Interface.GAdePscsdenDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Název číselníku kategorie hodnocení.
    * keys: ["ico","rok"]
    * columns: ["ico","rok","nazev","aktivita"]
    * filters: ["ico","rok","nazev","aktivita"]
    */
    class AdePscsnkh extends Base<Gordic.Ade.Interface.GAdePscsnkhDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscsnkhDto = Gordic.Ade.Interface.GAdePscsnkhDto;
    type AdePscsnkhDtoNames = Gordic.Ade.Interface.GAdePscsnkhDtoNames;
    type AdePscsnkhDtoFragments = Gordic.Ade.Interface.GAdePscsnkhDtoFragments;
    type AdePscsnkhDtoTypes = Gordic.Ade.Interface.GAdePscsnkhDtoTypes;
    type AdePscsnkhDtoTypeLengths = Gordic.Ade.Interface.GAdePscsnkhDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Typ náhrady.
    * keys: ["ixs_tna"]
    * columns: ["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "kod_tna"]
    * filters: ["ixs_tna","ktg_tna","ixs_zpz","nazev","dat_od","dat_do","aktivita","kod_tna"]
    */
    class AdePscstna extends Base<Gordic.Ade.Interface.GAdePscstnaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscstnaDto = Gordic.Ade.Interface.GAdePscstnaDto;
    type AdePscstnaDtoNames = Gordic.Ade.Interface.GAdePscstnaDtoNames;
    type AdePscstnaDtoFragments = Gordic.Ade.Interface.GAdePscstnaDtoFragments;
    type AdePscstnaDtoTypes = Gordic.Ade.Interface.GAdePscstnaDtoTypes;
    type AdePscstnaDtoTypeLengths = Gordic.Ade.Interface.GAdePscstnaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku typ náhrady.
    * keys: ["kod_vna"]
    * columns: ["kod_vna", "ixs_zpz", "nazev", "ixs_tna", "zp_dopr", "aktivita"]
    * filters: ["kod_vna","ixs_zpz","nazev","ixs_tna","zp_dopr","aktivita"]
    */
    class AdePscsvna extends Base<Gordic.Ade.Interface.GAdePscsvnaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscsvnaDto = Gordic.Ade.Interface.GAdePscsvnaDto;
    type AdePscsvnaDtoNames = Gordic.Ade.Interface.GAdePscsvnaDtoNames;
    type AdePscsvnaDtoFragments = Gordic.Ade.Interface.GAdePscsvnaDtoFragments;
    type AdePscsvnaDtoTypes = Gordic.Ade.Interface.GAdePscsvnaDtoTypes;
    type AdePscsvnaDtoTypeLengths = Gordic.Ade.Interface.GAdePscsvnaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Definice členění záznamů na deník RCN.
    * keys: ["ixs_vpk"]
    * columns: ["ixs_vpk", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "ico", "ucs"]
    * filters: ["ixs_vpk","aktivita","nazev","poznamka","dat_od","dat_do","ico","ucs"]
    */
    class AdePscsvpk extends Base<Gordic.Ade.Interface.GAdePscsvpkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscsvpkDto = Gordic.Ade.Interface.GAdePscsvpkDto;
    type AdePscsvpkDtoNames = Gordic.Ade.Interface.GAdePscsvpkDtoNames;
    type AdePscsvpkDtoFragments = Gordic.Ade.Interface.GAdePscsvpkDtoFragments;
    type AdePscsvpkDtoTypes = Gordic.Ade.Interface.GAdePscsvpkDtoTypes;
    type AdePscsvpkDtoTypeLengths = Gordic.Ade.Interface.GAdePscsvpkDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * keys: ["ixs_zpz"]
    * columns: ["ixs_zpz", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "k_v"]
    * filters: ["ixs_zpz","aktivita","kod","zkratka","nazev","poznamka","dat_od","dat_do","k_v"]
    */
    class AdePscszpz extends Base<Gordic.Ade.Interface.GAdePscszpzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePscszpzDto = Gordic.Ade.Interface.GAdePscszpzDto;
    type AdePscszpzDtoNames = Gordic.Ade.Interface.GAdePscszpzDtoNames;
    type AdePscszpzDtoFragments = Gordic.Ade.Interface.GAdePscszpzDtoFragments;
    type AdePscszpzDtoTypes = Gordic.Ade.Interface.GAdePscszpzDtoTypes;
    type AdePscszpzDtoTypeLengths = Gordic.Ade.Interface.GAdePscszpzDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Pokladna.
    * keys: ["ixs_kon"]
    * columns: ["ixs_kon", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "mj", "dan_typ", "mena", "typ_kon", "k_v", "ixs_zpz", "pov_vs", "typ_phl", "ixs_kon_zal", "cmj", "ixs_zpz_bhp", "pov_dan", "priz_tzh", "tzh_typ", "ixs_typ", "typ_kon_txt", "rok"]
    * filters: ["ixs_kon","aktivita","kod","zkratka","nazev","poznamka","dat_od","dat_do","mj","dan_typ","mena","typ_kon","k_v","ixs_zpz","pov_vs","typ_phl","ixs_kon_zal","cmj","ixs_zpz_bhp","pov_dan","priz_tzh","tzh_typ","ixs_typ","ktg_den"]
    */
    class AdePokskon extends Base<Gordic.Ade.Interface.GAdePokskonDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdePokskonDto = Gordic.Ade.Interface.GAdePokskonDto;
    type AdePokskonDtoNames = Gordic.Ade.Interface.GAdePokskonDtoNames;
    type AdePokskonDtoFragments = Gordic.Ade.Interface.GAdePokskonDtoFragments;
    type AdePokskonDtoTypes = Gordic.Ade.Interface.GAdePokskonDtoTypes;
    type AdePokskonDtoTypeLengths = Gordic.Ade.Interface.GAdePokskonDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * keys: ["dvn"]
    * columns: ["dvn", "dvn_txt", "k_v", "k_s"]
    * filters: ["dvn","dvn_txt","k_v","k_s"]
    */
    class AdeRcncdvn extends Base<Gordic.Ade.Interface.GAdeRcncdvnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcncdvnDto = Gordic.Ade.Interface.GAdeRcncdvnDto;
    type AdeRcncdvnDtoNames = Gordic.Ade.Interface.GAdeRcncdvnDtoNames;
    type AdeRcncdvnDtoFragments = Gordic.Ade.Interface.GAdeRcncdvnDtoFragments;
    type AdeRcncdvnDtoTypes = Gordic.Ade.Interface.GAdeRcncdvnDtoTypes;
    type AdeRcncdvnDtoTypeLengths = Gordic.Ade.Interface.GAdeRcncdvnDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * keys: ["ktg_den"]
    * columns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    * filters: ["ktg_den","ktg_den_txt","k_v","k_s"]
    */
    class AdeRcncktd extends Base<Gordic.Ade.Interface.GAdeRcncktdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcncktdDto = Gordic.Ade.Interface.GAdeRcncktdDto;
    type AdeRcncktdDtoNames = Gordic.Ade.Interface.GAdeRcncktdDtoNames;
    type AdeRcncktdDtoFragments = Gordic.Ade.Interface.GAdeRcncktdDtoFragments;
    type AdeRcncktdDtoTypes = Gordic.Ade.Interface.GAdeRcncktdDtoTypes;
    type AdeRcncktdDtoTypeLengths = Gordic.Ade.Interface.GAdeRcncktdDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Cena paliva.
    * keys: ["phm"]
    * columns: ["phm", "phm_txt", "k_v", "k_s"]
    * filters: ["phm","phm_txt","k_v","k_s"]
    */
    class AdeRcncphm extends Base<Gordic.Ade.Interface.GAdeRcncphmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcncphmDto = Gordic.Ade.Interface.GAdeRcncphmDto;
    type AdeRcncphmDtoNames = Gordic.Ade.Interface.GAdeRcncphmDtoNames;
    type AdeRcncphmDtoFragments = Gordic.Ade.Interface.GAdeRcncphmDtoFragments;
    type AdeRcncphmDtoTypes = Gordic.Ade.Interface.GAdeRcncphmDtoTypes;
    type AdeRcncphmDtoTypeLengths = Gordic.Ade.Interface.GAdeRcncphmDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Stravné.
    * keys: ["usek"]
    * columns: ["usek", "usek_txt", "k_v", "k_s"]
    * filters: ["usek","usek_txt","k_v","k_s"]
    */
    class AdeRcncsas extends Base<Gordic.Ade.Interface.GAdeRcncsasDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcncsasDto = Gordic.Ade.Interface.GAdeRcncsasDto;
    type AdeRcncsasDtoNames = Gordic.Ade.Interface.GAdeRcncsasDtoNames;
    type AdeRcncsasDtoFragments = Gordic.Ade.Interface.GAdeRcncsasDtoFragments;
    type AdeRcncsasDtoTypes = Gordic.Ade.Interface.GAdeRcncsasDtoTypes;
    type AdeRcncsasDtoTypeLengths = Gordic.Ade.Interface.GAdeRcncsasDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * keys: ["ktg_tna"]
    * columns: ["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]
    * filters: ["ktg_tna","ktg_tna_txt","k_v","k_s"]
    */
    class AdeRcnctna extends Base<Gordic.Ade.Interface.GAdeRcnctnaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnctnaDto = Gordic.Ade.Interface.GAdeRcnctnaDto;
    type AdeRcnctnaDtoNames = Gordic.Ade.Interface.GAdeRcnctnaDtoNames;
    type AdeRcnctnaDtoFragments = Gordic.Ade.Interface.GAdeRcnctnaDtoFragments;
    type AdeRcnctnaDtoTypes = Gordic.Ade.Interface.GAdeRcnctnaDtoTypes;
    type AdeRcnctnaDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnctnaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Typ osoby.
    * keys: ["typ_dos"]
    * columns: ["typ_dos", "typ_dos_txt", "k_v", "k_s"]
    * filters: ["typ_dos","typ_dos_txt","k_v","k_s"]
    */
    class AdeRcnctos extends Base<Gordic.Ade.Interface.GAdeRcnctosDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnctosDto = Gordic.Ade.Interface.GAdeRcnctosDto;
    type AdeRcnctosDtoNames = Gordic.Ade.Interface.GAdeRcnctosDtoNames;
    type AdeRcnctosDtoFragments = Gordic.Ade.Interface.GAdeRcnctosDtoFragments;
    type AdeRcnctosDtoTypes = Gordic.Ade.Interface.GAdeRcnctosDtoTypes;
    type AdeRcnctosDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnctosDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku typu požadavku.
    * keys: ["typ_pozt"]
    * columns: ["typ_pozt", "typ_pozt_txt", "k_v", "k_s"]
    * filters: ["typ_pozt","typ_pozt_txt","k_v","k_s"]
    */
    class AdeRcnctpo extends Base<Gordic.Ade.Interface.GAdeRcnctpoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnctpoDto = Gordic.Ade.Interface.GAdeRcnctpoDto;
    type AdeRcnctpoDtoNames = Gordic.Ade.Interface.GAdeRcnctpoDtoNames;
    type AdeRcnctpoDtoFragments = Gordic.Ade.Interface.GAdeRcnctpoDtoFragments;
    type AdeRcnctpoDtoTypes = Gordic.Ade.Interface.GAdeRcnctpoDtoTypes;
    type AdeRcnctpoDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnctpoDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Úroveň návštěvy.
    * keys: ["urn"]
    * columns: ["urn", "urn_txt", "k_v", "k_s"]
    * filters: ["urn","urn_txt","k_v","k_s"]
    */
    class AdeRcncurn extends Base<Gordic.Ade.Interface.GAdeRcncurnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcncurnDto = Gordic.Ade.Interface.GAdeRcncurnDto;
    type AdeRcncurnDtoNames = Gordic.Ade.Interface.GAdeRcncurnDtoNames;
    type AdeRcncurnDtoFragments = Gordic.Ade.Interface.GAdeRcncurnDtoFragments;
    type AdeRcncurnDtoTypes = Gordic.Ade.Interface.GAdeRcncurnDtoTypes;
    type AdeRcncurnDtoTypeLengths = Gordic.Ade.Interface.GAdeRcncurnDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Doprava.
    * keys: ["zp_dopr"]
    * columns: ["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]
    * filters: ["zp_dopr","zp_dopr_txt","k_v","k_s"]
    */
    class AdeRcnczpd extends Base<Gordic.Ade.Interface.GAdeRcnczpdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnczpdDto = Gordic.Ade.Interface.GAdeRcnczpdDto;
    type AdeRcnczpdDtoNames = Gordic.Ade.Interface.GAdeRcnczpdDtoNames;
    type AdeRcnczpdDtoFragments = Gordic.Ade.Interface.GAdeRcnczpdDtoFragments;
    type AdeRcnczpdDtoTypes = Gordic.Ade.Interface.GAdeRcnczpdDtoTypes;
    type AdeRcnczpdDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnczpdDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]
    * filters: ["ixp_den","subrada","zkratka","nazev","akt_subrady","ac_cislo_do","ac_cislo_od","ac_cislo_max","mesic","ixs_su"]
    */
    class AdeRcnrdac extends Base<Gordic.Ade.Interface.GAdeRcnrdacDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnrdacDto = Gordic.Ade.Interface.GAdeRcnrdacDto;
    type AdeRcnrdacDtoNames = Gordic.Ade.Interface.GAdeRcnrdacDtoNames;
    type AdeRcnrdacDtoFragments = Gordic.Ade.Interface.GAdeRcnrdacDtoFragments;
    type AdeRcnrdacDtoTypes = Gordic.Ade.Interface.GAdeRcnrdacDtoTypes;
    type AdeRcnrdacDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnrdacDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Definice členění  a varianty předkontací na knihu.
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "uex", "ixp_kur", "ixp_den_sml", "ixs_typ_sml"]
    * filters: ["ixp_den","lic","aktivita","arw","poznamka","dat_od","dat_do","ico","ucs","nazev","rok","typ_den","ktg_den","por_cislo_max","subrada_max","subrada_duz","len_ac","krok_uza","ixp_den_old","uus","prefix","suffix","uex","ixp_kur","ixp_den_sml","ixs_typ_sml"]
    */
    class AdeRcnsden extends Base<Gordic.Ade.Interface.GAdeRcnsdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnsdenDto = Gordic.Ade.Interface.GAdeRcnsdenDto;
    type AdeRcnsdenDtoNames = Gordic.Ade.Interface.GAdeRcnsdenDtoNames;
    type AdeRcnsdenDtoFragments = Gordic.Ade.Interface.GAdeRcnsdenDtoFragments;
    type AdeRcnsdenDtoTypes = Gordic.Ade.Interface.GAdeRcnsdenDtoTypes;
    type AdeRcnsdenDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnsdenDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Sazby návštěv.
    * keys: ["ixs_msm"]
    * columns: ["ixs_msm", "stat", "nazev", "kod_ustan", "publikace", "aktivita"]
    * filters: ["ixs_msm","stat","nazev","kod_ustan","publikace","aktivita"]
    */
    class AdeRcnsmsm extends Base<Gordic.Ade.Interface.GAdeRcnsmsmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnsmsmDto = Gordic.Ade.Interface.GAdeRcnsmsmDto;
    type AdeRcnsmsmDtoNames = Gordic.Ade.Interface.GAdeRcnsmsmDtoNames;
    type AdeRcnsmsmDtoFragments = Gordic.Ade.Interface.GAdeRcnsmsmDtoFragments;
    type AdeRcnsmsmDtoTypes = Gordic.Ade.Interface.GAdeRcnsmsmDtoTypes;
    type AdeRcnsmsmDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnsmsmDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * keys: ["ixs_sna"]
    * columns: ["ixs_sna", "kod_sna", "nazev_sna", "ixs_zpz", "aktivita"]
    * filters: ["ixs_sna","kod_sna","nazev_sna","ixs_zpz","aktivita"]
    */
    class AdeRcnssna extends Base<Gordic.Ade.Interface.GAdeRcnssnaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnssnaDto = Gordic.Ade.Interface.GAdeRcnssnaDto;
    type AdeRcnssnaDtoNames = Gordic.Ade.Interface.GAdeRcnssnaDtoNames;
    type AdeRcnssnaDtoFragments = Gordic.Ade.Interface.GAdeRcnssnaDtoFragments;
    type AdeRcnssnaDtoTypes = Gordic.Ade.Interface.GAdeRcnssnaDtoTypes;
    type AdeRcnssnaDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnssnaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Sazby návštěv.
    * keys: ["ixs_tna"]
    * columns: ["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "priz_nah", "kod_tna", "ixs_sna"]
    * filters: ["ixs_tna","ktg_tna","ixs_zpz","nazev","dat_od","dat_do","aktivita","priz_nah","kod_tna","ixs_sna"]
    */
    class AdeRcnstna extends Base<Gordic.Ade.Interface.GAdeRcnstnaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnstnaDto = Gordic.Ade.Interface.GAdeRcnstnaDto;
    type AdeRcnstnaDtoNames = Gordic.Ade.Interface.GAdeRcnstnaDtoNames;
    type AdeRcnstnaDtoFragments = Gordic.Ade.Interface.GAdeRcnstnaDtoFragments;
    type AdeRcnstnaDtoTypes = Gordic.Ade.Interface.GAdeRcnstnaDtoTypes;
    type AdeRcnstnaDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnstnaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Rozlišení typu osoby.
    * keys: ["ixs_tos"]
    * columns: ["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]
    * filters: ["ixs_tos","nazev","kod_tos","poznamka","typ_dos","aktivita"]
    */
    class AdeRcnstos extends Base<Gordic.Ade.Interface.GAdeRcnstosDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRcnstosDto = Gordic.Ade.Interface.GAdeRcnstosDto;
    type AdeRcnstosDtoNames = Gordic.Ade.Interface.GAdeRcnstosDtoNames;
    type AdeRcnstosDtoFragments = Gordic.Ade.Interface.GAdeRcnstosDtoFragments;
    type AdeRcnstosDtoTypes = Gordic.Ade.Interface.GAdeRcnstosDtoTypes;
    type AdeRcnstosDtoTypeLengths = Gordic.Ade.Interface.GAdeRcnstosDtoTypeLengths;

    /**
    * Klientská část AL - číselník Kategorie deníku RZA
    * keys: ["ktg_den"]
    * columns: ["ktg_den","ktg_den_txt","k_v","k_s"]
    * filters: [""]
    */
    class AdeRzacktd extends Base<Gordic.Ade.Interface.GRzacktdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRzacktdDto = Gordic.Ade.Interface.GRzacktdDto;
    type AdeRzacktdDtoNames = Gordic.Ade.Interface.GRzacktdDtoNames;
    type AdeRzacktdDtoFragments = Gordic.Ade.Interface.GRzacktdDtoFragments;
    type AdeRzacktdDtoTypes = Gordic.Ade.Interface.GRzacktdDtoTypes;
    type AdeRzacktdDtoTypeLengths = Gordic.Ade.Interface.GRzacktdDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "len_ac", "krok_uza", "ixp_den_old", "prefix", "suffix", "uus"]
    * filters: ["ixp_den","lic","aktivita","arw","poznamka","dat_od","dat_do","ico","ucs","nazev","rok","typ_den","ktg_den","por_cislo_max","subrada_max","len_ac","krok_uza","ixp_den_old","prefix","suffix","uus"]
    */
    class AdeSmlsden extends Base<Gordic.Ade.Interface.GAdeSmlsdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSmlsdenDto = Gordic.Ade.Interface.GAdeSmlsdenDto;
    type AdeSmlsdenDtoNames = Gordic.Ade.Interface.GAdeSmlsdenDtoNames;
    type AdeSmlsdenDtoFragments = Gordic.Ade.Interface.GAdeSmlsdenDtoFragments;
    type AdeSmlsdenDtoTypes = Gordic.Ade.Interface.GAdeSmlsdenDtoTypes;
    type AdeSmlsdenDtoTypeLengths = Gordic.Ade.Interface.GAdeSmlsdenDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * keys: ["ixs_typ"]
    * columns: ["ixs_typ", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "nazev", "ktg_typ", "popis", "st_utaj_id", "lhuta_vyr", "zkratka", "ixs_ulz", "aktivita_ssl", "spis_pl", "spis_znak", "ofic_nazev", "s_gen_cj", "ixs_esu", "ixs_lpc", "z_int", "cs_nazev", "priz_vycet", "ixs_cin", "poc_dnu_vyp_dor", "ixs_typ_opr", "priz_rsp", "ixs_frm_gform", "priz_epk", "predpl_vec", "typ_vazby", "ixp_sablony", "ixs_frm_gform_spi", "priz_dupli", "over_duver", "zakon_duvod_gdpr", "s_dotaz_irp", "plan_zve", "priz_fyz", "ixs_zap", "ixs_fsk", "ico", "id_ext_alt", "ixs_skr"]
    * filters: ["ixs_typ","lic","aktivita","arw","poznamka","dat_od","dat_do","nazev","ktg_typ","popis","st_utaj_id","lhuta_vyr","zkratka","ixs_ulz","aktivita_ssl","spis_pl","spis_znak","ofic_nazev","s_gen_cj","ixs_esu","ixs_lpc","z_int","cs_nazev","priz_vycet","ixs_cin","poc_dnu_vyp_dor","ixs_typ_opr","priz_rsp","ixs_frm_gform","priz_epk","predpl_vec","typ_vazby","ixp_sablony","ixs_frm_gform_spi","priz_dupli","over_duver","zakon_duvod_gdpr","s_dotaz_irp","plan_zve","priz_fyz","ixs_zap","ixs_fsk","ico","id_ext_alt","ixs_skr"]
    */
    class AdeSslstyp extends Base<Gordic.Ade.Interface.GAdeSslstypDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSslstypDto = Gordic.Ade.Interface.GAdeSslstypDto;
    type AdeSslstypDtoNames = Gordic.Ade.Interface.GAdeSslstypDtoNames;
    type AdeSslstypDtoFragments = Gordic.Ade.Interface.GAdeSslstypDtoFragments;
    type AdeSslstypDtoTypes = Gordic.Ade.Interface.GAdeSslstypDtoTypes;
    type AdeSslstypDtoTypeLengths = Gordic.Ade.Interface.GAdeSslstypDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Deklarace subřad.
    * keys: ["rok","ico","subrada"]
    * columns: ["rok", "ico", "subrada", "zkratka", "nazev", "aktivita", "ac_cislo_do", "ac_cislo_od", "mesic_od"]
    * filters: ["rok","ico","subrada","zkratka","nazev","aktivita","ac_cislo_do","ac_cislo_od","mesic_od"]
    */
    class AdeUctddde extends Base<Gordic.Ade.Interface.GAdeUctdddeDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeUctdddeDto = Gordic.Ade.Interface.GAdeUctdddeDto;
    type AdeUctdddeDtoNames = Gordic.Ade.Interface.GAdeUctdddeDtoNames;
    type AdeUctdddeDtoFragments = Gordic.Ade.Interface.GAdeUctdddeDtoFragments;
    type AdeUctdddeDtoTypes = Gordic.Ade.Interface.GAdeUctdddeDtoTypes;
    type AdeUctdddeDtoTypeLengths = Gordic.Ade.Interface.GAdeUctdddeDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "{akt_subrady_txt}"
    * helperColumns: ["akt_subrady_txt"]
    *
    * DataReader
    * keys: ["akt_subrady"]
    * columns: ["akt_subrady", "akt_subrady_txt", "k_v", "k_s", "k_xml"]
    * filters: ["akt_subrady"]
    */
    function adeEkocakr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GEkocakrDto>): GSelectBoxOptions<Gordic.Ade.Interface.GEkocakrDto>;
    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * FieldOptions
    * itemTemplate: "{den}.{mesic}.{rok} - {rada_kur}"
    * helperColumns: ["ixp_kur", "rada_kur", "cislo", "rok", "mesic", "den", "dat_mpd", "dat_platnost_od", "prep_zp"]
    *
    * DataReader
    * keys: ["ixp_kur"]
    * columns: ["ixp_kur", "rada_kur", "cislo", "rok", "mesic", "den", "dat_mpd", "dat_platnost_od", "prep_zp"]
    * filters: ["ixp_kur","rada_kur","cislo","rok","mesic","den","dat_mpd","dat_platnost_od","prep_zp"]
    */
    function adeEkoskur(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeEkoskurDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeEkoskurDto>;
    /**
    * Reader pro čtení dat číselníku Bankovní účty vlastní.
    * FieldOptions
    * itemTemplate: "{bu_txt}"
    * helperColumns: ["rok", "ico", "ucs", "bu_vl", "sk_vl", "bu_txt", "ktg_bu", "aktivita", "dat_od", "dat_do", "uea_lim", "ueb_lim", "ixs_esu_ban", "c_lim", "c_kuhr", "c_uhr", "typ_bu", "nazev", "zkratka", "mena", "uea_uc", "ueb_uc", "subrada_duz", "priz_up_bu", "ixp_den_buc", "sbu", "dat_bvy", "c_ps", "c_rok_db", "c_rok_kr", "c_zust", "druh_bu", "cis_bvy", "ixp_bvy", "c_lim_max", "uus", "iban", "zc_vyp", "per_vyp", "ur_prist_bu", "priz_isprofin", "kod_vys", "kon_maxlim", "par_vyp", "c_lim_ban", "c_zust_ban", "dat_bvy_ban", "dat_ttv", "priz_sr", "id_hdr_ris_kr", "radek_hdr_kr", "priz_rozp", "priz_spol_u", "ode_sp", "ukl_pri", "id_nt_max", "fidoo"]
    *
    * DataReader
    * keys: ["rok","bu_vl","sk_vl"]
    * columns: ["rok","bu_vl","sk_vl","ico","ucs","bu_txt","ktg_bu","aktivita","dat_od","dat_do","uea_lim","ueb_lim","ixs_esu_ban","c_lim","c_kuhr","c_uhr","typ_bu","nazev","zkratka","mena","uea_uc","ueb_uc","subrada_duz","priz_up_bu","ixp_den_buc","sbu","dat_bvy","c_ps","c_rok_db","c_rok_kr","c_zust","druh_bu","cis_bvy","ixp_bvy","c_lim_max","uus","iban","zc_vyp","per_vyp","ur_prist_bu","priz_isprofin","kod_vys","kon_maxlim","par_vyp","c_lim_ban","c_zust_ban","dat_bvy_ban","dat_ttv","priz_sr","id_hdr_ris_kr","radek_hdr_kr","priz_rozp","priz_spol_u","ode_sp","ukl_pri","id_nt_max","fidoo"]
    * filters: ["rok","ico","ucs","bu_vl","sk_vl","bu_txt","ktg_bu","aktivita","dat_od","dat_do","uea_lim","ueb_lim","ixs_esu_ban","c_lim","c_kuhr","c_uhr","typ_bu","nazev","zkratka","mena","uea_uc","ueb_uc","subrada_duz","priz_up_bu","ixp_den_buc","sbu","dat_bvy","c_ps","c_rok_db","c_rok_kr","c_zust","druh_bu","cis_bvy","ixp_bvy","c_lim_max","uus","iban","zc_vyp","per_vyp","ur_prist_bu","priz_isprofin","kod_vys","kon_maxlim","par_vyp","c_lim_ban","c_zust_ban","dat_bvy_ban","dat_ttv","priz_sr","id_hdr_ris_kr","radek_hdr_kr","priz_rozp","priz_spol_u","ode_sp","ukl_pri","id_nt_max","fidoo"]
    */
    function adeEkosuvl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeEkosuvlDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeEkosuvlDto>;
    /**
    * Reader pro čtení dat číselníku Finanční účtárna.
    * FieldOptions
    * itemTemplate: "{nazev_upr}"
    * helperColumns: ["typ_upr", "nazev_upr", "ktg_tup", "typ_zauc", "ktg_typ", "aktivita", "real_upr", "k_v", "k_k", "cs_nazev"]
    *
    * DataReader
    * keys: ["typ_upr"]
    * columns: ["typ_upr", "nazev_upr", "ktg_tup", "typ_zauc", "ktg_typ", "aktivita", "real_upr", "k_v", "k_k", "cs_nazev"]
    * filters: ["typ_upr","nazev_upr","ktg_tup","typ_zauc","ktg_typ","aktivita","real_upr","k_v","k_k","cs_nazev"]
    */
    function adeFucstup(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeFucstupDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeFucstupDto>;
    /**
    * Klientská část AL - číselník Spisové uzly povolené pro ekonomické subjekty (ico, ucs, rok)
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_su"]
    * columns: ["ixs_su", "nazev"]
    * filters: ["ixs_su","ico","ucs","rok","aktivita"]
    */
    function adeGinspod(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GGinspodEkoDto>): GSelectBoxOptions<Gordic.Ade.Interface.GGinspodEkoDto>;
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "{ktg_den_txt}"
    * helperColumns: ["ktg_den_txt"]
    *
    * DataReader
    * keys: ["ktg_den"]
    * columns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    * filters: [""]
    */
    function adeMzacktd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GMzacktdDto>): GSelectBoxOptions<Gordic.Ade.Interface.GMzacktdDto>;
    /**
    * Reader pro čtení dat číselníku Kniha PCN.
    * FieldOptions
    * itemTemplate: "{ktg_den_txt}"
    * helperColumns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["ktg_den"]
    * columns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    * filters: ["ktg_den","ktg_den_txt","k_v","k_s"]
    */
    function adePsccktd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePsccktdDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePsccktdDto>;
    /**
    * Reader pro čtení dat číselníku Kategorie náhrad.
    * FieldOptions
    * itemTemplate: "{ktg_tna_txt}"
    * helperColumns: ["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["ktg_tna"]
    * columns: ["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]
    * filters: ["ktg_tna","ktg_tna_txt","k_v","k_s"]
    */
    function adePscctna(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscctnaDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscctnaDto>;
    /**
    * Reader pro čtení dat číselníku Stravné.
    * FieldOptions
    * itemTemplate: "{typ_poz_txt}"
    * helperColumns: ["typ_poz", "typ_poz_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["typ_poz"]
    * columns: ["typ_poz", "typ_poz_txt", "k_v", "k_s"]
    * filters: ["typ_poz","typ_poz_txt","k_v","k_s"]
    */
    function adePscctyp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscctypDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscctypDto>;
    /**
    * Reader pro čtení dat číselníku Typ náhrady.
    * FieldOptions
    * itemTemplate: "{zp_dopr_txt}"
    * helperColumns: ["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["zp_dopr"]
    * columns: ["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]
    * filters: ["zp_dopr","zp_dopr_txt","k_v","k_s"]
    */
    function adePscczpd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscczpdDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscczpdDto>;
    /**
    * Reader pro čtení dat číselníku Způsoby výpočtu.
    * FieldOptions
    * itemTemplate: "{zp_vyp_txt}"
    * helperColumns: ["zp_vyp", "zp_vyp_txt", "k_v", "k_s", "typ_poz"]
    *
    * DataReader
    * keys: ["zp_vyp","typ_poz"]
    * columns: ["zp_vyp", "zp_vyp_txt", "k_v", "k_s", "typ_poz"]
    * filters: ["zp_vyp","zp_vyp_txt","k_v","k_s","typ_poz"]
    */
    function adePscczpv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscczpvDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscczpvDto>;
    /**
    * Reader pro čtení dat číselníku Kniha PCN.
    * FieldOptions
    * itemTemplate: "{zkratka}"
    * helperColumns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]
    *
    * DataReader
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]
    * filters: ["ixp_den","subrada","zkratka","nazev","akt_subrady","ac_cislo_do","ac_cislo_od","ac_cislo_max","mesic","ixs_su"]
    */
    function adePscrdac(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscrdacDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscrdacDto>;
    /**
    * Reader pro čtení dat číselníku Definice členění záznamů na deník RCN.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_cle", "nazev", "kod_cle", "poznamka", "uea", "ueb", "uec", "ued", "uee", "uef", "ueg", "ueh", "uei", "uej", "te0", "te1", "te2", "te3", "te4", "aktivita", "uek", "uel", "uem", "uen", "te5", "te6", "te7", "te8", "te9"]
    *
    * DataReader
    * keys: ["ixs_cle"]
    * columns: ["ixs_cle", "nazev", "kod_cle", "poznamka", "uea", "ueb", "uec", "ued", "uee", "uef", "ueg", "ueh", "uei", "uej", "te0", "te1", "te2", "te3", "te4", "aktivita", "uek", "uel", "uem", "uen", "te5", "te6", "te7", "te8", "te9"]
    * filters: ["ixs_cle","nazev","kod_cle","poznamka","uea","ueb","uec","ued","uee","uef","ueg","ueh","uei","uej","te0","te1","te2","te3","te4","aktivita","uek","uel","uem","uen","te5","te6","te7","te8","te9"]
    */
    function adePscscle(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscscleDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscscleDto>;
    /**
    * Reader pro čtení dat číselníku Definice členění záznamů na deník RCN.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixp_den", "lic", "arw", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "poznamka", "aktivita", "rok_sberu", "priz_plan"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "lic", "arw", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "poznamka", "aktivita", "rok_sberu", "priz_plan"]
    * filters: ["ixp_den","lic","arw","dat_od","dat_do","ico","ucs","nazev","rok","typ_den","ktg_den","por_cislo_max","subrada_max","subrada_duz","len_ac","krok_uza","ixp_den_old","uus","prefix","suffix","poznamka","aktivita","rok_sberu","priz_plan"]
    */
    function adePscsden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscsdenDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscsdenDto>;
    /**
    * Reader pro čtení dat číselníku Název číselníku kategorie hodnocení.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ico", "rok", "nazev", "aktivita"]
    *
    * DataReader
    * keys: ["ico","rok"]
    * columns: ["ico","rok","nazev","aktivita"]
    * filters: ["ico","rok","nazev","aktivita"]
    */
    function adePscsnkh(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscsnkhDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscsnkhDto>;
    /**
    * Reader pro čtení dat číselníku Typ náhrady.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "kod_tna"]
    *
    * DataReader
    * keys: ["ixs_tna"]
    * columns: ["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "kod_tna"]
    * filters: ["ixs_tna","ktg_tna","ixs_zpz","nazev","dat_od","dat_do","aktivita","kod_tna"]
    */
    function adePscstna(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscstnaDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscstnaDto>;
    /**
    * Reader pro čtení dat číselníku typ náhrady.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["kod_vna", "ixs_zpz", "nazev", "ixs_tna", "zp_dopr", "aktivita"]
    *
    * DataReader
    * keys: ["kod_vna"]
    * columns: ["kod_vna", "ixs_zpz", "nazev", "ixs_tna", "zp_dopr", "aktivita"]
    * filters: ["kod_vna","ixs_zpz","nazev","ixs_tna","zp_dopr","aktivita"]
    */
    function adePscsvna(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscsvnaDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscsvnaDto>;
    /**
    * Reader pro čtení dat číselníku Definice členění záznamů na deník RCN.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_vpk", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "ico", "ucs"]
    *
    * DataReader
    * keys: ["ixs_vpk"]
    * columns: ["ixs_vpk", "aktivita", "nazev", "poznamka", "dat_od", "dat_do", "ico", "ucs"]
    * filters: ["ixs_vpk","aktivita","nazev","poznamka","dat_od","dat_do","ico","ucs"]
    */
    function adePscsvpk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscsvpkDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscsvpkDto>;
    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_zpz", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "k_v"]
    *
    * DataReader
    * keys: ["ixs_zpz"]
    * columns: ["ixs_zpz", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "k_v"]
    * filters: ["ixs_zpz","aktivita","kod","zkratka","nazev","poznamka","dat_od","dat_do","k_v"]
    */
    function adePscszpz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePscszpzDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePscszpzDto>;
    /**
    * Reader pro čtení dat číselníku Pokladna.
    * FieldOptions
    * itemTemplate: "{kod:trim:encode} - {nazev:trim:encode} ({typ_kon:trim:encode} - {typ_kon_txt:trim:encode})"
    * helperColumns: ["ixs_kon", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "mj", "dan_typ", "mena", "typ_kon", "k_v", "ixs_zpz", "pov_vs", "typ_phl", "ixs_kon_zal", "cmj", "ixs_zpz_bhp", "pov_dan", "priz_tzh", "tzh_typ", "ixs_typ"]
    *
    * DataReader
    * keys: ["ixs_kon"]
    * columns: ["ixs_kon", "aktivita", "kod", "zkratka", "nazev", "poznamka", "dat_od", "dat_do", "mj", "dan_typ", "mena", "typ_kon", "k_v", "ixs_zpz", "pov_vs", "typ_phl", "ixs_kon_zal", "cmj", "ixs_zpz_bhp", "pov_dan", "priz_tzh", "tzh_typ", "ixs_typ", "typ_kon_txt", "rok"]
    * filters: ["ixs_kon","aktivita","kod","zkratka","nazev","poznamka","dat_od","dat_do","mj","dan_typ","mena","typ_kon","k_v","ixs_zpz","pov_vs","typ_phl","ixs_kon_zal","cmj","ixs_zpz_bhp","pov_dan","priz_tzh","tzh_typ","ixs_typ","ktg_den"]
    */
    function adePokskon(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdePokskonDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdePokskonDto>;
    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * FieldOptions
    * itemTemplate: "{dvn_txt}"
    * helperColumns: ["dvn", "dvn_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["dvn"]
    * columns: ["dvn", "dvn_txt", "k_v", "k_s"]
    * filters: ["dvn","dvn_txt","k_v","k_s"]
    */
    function adeRcncdvn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcncdvnDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcncdvnDto>;
    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * FieldOptions
    * itemTemplate: "{ktg_den_txt}"
    * helperColumns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["ktg_den"]
    * columns: ["ktg_den", "ktg_den_txt", "k_v", "k_s"]
    * filters: ["ktg_den","ktg_den_txt","k_v","k_s"]
    */
    function adeRcncktd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcncktdDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcncktdDto>;
    /**
    * Reader pro čtení dat číselníku Cena paliva.
    * FieldOptions
    * itemTemplate: "{phm_txt}"
    * helperColumns: ["phm", "phm_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["phm"]
    * columns: ["phm", "phm_txt", "k_v", "k_s"]
    * filters: ["phm","phm_txt","k_v","k_s"]
    */
    function adeRcncphm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcncphmDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcncphmDto>;
    /**
    * Reader pro čtení dat číselníku Stravné.
    * FieldOptions
    * itemTemplate: "{usek_txt}"
    * helperColumns: ["usek", "usek_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["usek"]
    * columns: ["usek", "usek_txt", "k_v", "k_s"]
    * filters: ["usek","usek_txt","k_v","k_s"]
    */
    function adeRcncsas(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcncsasDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcncsasDto>;
    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * FieldOptions
    * itemTemplate: "{ktg_tna_txt}"
    * helperColumns: ["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["ktg_tna"]
    * columns: ["ktg_tna", "ktg_tna_txt", "k_v", "k_s"]
    * filters: ["ktg_tna","ktg_tna_txt","k_v","k_s"]
    */
    function adeRcnctna(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnctnaDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnctnaDto>;
    /**
    * Reader pro čtení dat číselníku Typ osoby.
    * FieldOptions
    * itemTemplate: "{typ_dos_txt}"
    * helperColumns: ["typ_dos", "typ_dos_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["typ_dos"]
    * columns: ["typ_dos", "typ_dos_txt", "k_v", "k_s"]
    * filters: ["typ_dos","typ_dos_txt","k_v","k_s"]
    */
    function adeRcnctos(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnctosDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnctosDto>;
    /**
    * Reader pro čtení dat číselníku typu požadavku.
    * FieldOptions
    * itemTemplate: "{typ_pozt_txt}"
    * helperColumns: ["typ_pozt", "typ_pozt_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["typ_pozt"]
    * columns: ["typ_pozt", "typ_pozt_txt", "k_v", "k_s"]
    * filters: ["typ_pozt","typ_pozt_txt","k_v","k_s"]
    */
    function adeRcnctpo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnctpoDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnctpoDto>;
    /**
    * Reader pro čtení dat číselníku Úroveň návštěvy.
    * FieldOptions
    * itemTemplate: "{urn_txt}"
    * helperColumns: ["urn", "urn_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["urn"]
    * columns: ["urn", "urn_txt", "k_v", "k_s"]
    * filters: ["urn","urn_txt","k_v","k_s"]
    */
    function adeRcncurn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcncurnDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcncurnDto>;
    /**
    * Reader pro čtení dat číselníku Doprava.
    * FieldOptions
    * itemTemplate: "{zp_dopr_txt}"
    * helperColumns: ["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["zp_dopr"]
    * columns: ["zp_dopr", "zp_dopr_txt", "k_v", "k_s"]
    * filters: ["zp_dopr","zp_dopr_txt","k_v","k_s"]
    */
    function adeRcnczpd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnczpdDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnczpdDto>;
    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * FieldOptions
    * itemTemplate: "{zkratka}"
    * helperColumns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]
    *
    * DataReader
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "ixs_su"]
    * filters: ["ixp_den","subrada","zkratka","nazev","akt_subrady","ac_cislo_do","ac_cislo_od","ac_cislo_max","mesic","ixs_su"]
    */
    function adeRcnrdac(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnrdacDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnrdacDto>;
    /**
    * Reader pro čtení dat číselníku Definice členění  a varianty předkontací na knihu.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "uex", "ixp_kur", "ixp_den_sml", "ixs_typ_sml"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "subrada_duz", "len_ac", "krok_uza", "ixp_den_old", "uus", "prefix", "suffix", "uex", "ixp_kur", "ixp_den_sml", "ixs_typ_sml"]
    * filters: ["ixp_den","lic","aktivita","arw","poznamka","dat_od","dat_do","ico","ucs","nazev","rok","typ_den","ktg_den","por_cislo_max","subrada_max","subrada_duz","len_ac","krok_uza","ixp_den_old","uus","prefix","suffix","uex","ixp_kur","ixp_den_sml","ixs_typ_sml"]
    */
    function adeRcnsden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnsdenDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnsdenDto>;
    /**
    * Reader pro čtení dat číselníku Sazby návštěv.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_msm", "stat", "nazev", "kod_ustan", "publikace", "aktivita"]
    *
    * DataReader
    * keys: ["ixs_msm"]
    * columns: ["ixs_msm", "stat", "nazev", "kod_ustan", "publikace", "aktivita"]
    * filters: ["ixs_msm","stat","nazev","kod_ustan","publikace","aktivita"]
    */
    function adeRcnsmsm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnsmsmDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnsmsmDto>;
    /**
    * Reader pro čtení dat číselníku Navýšení náhrad.
    * FieldOptions
    * itemTemplate: "{nazev_sna}"
    * helperColumns: ["ixs_sna", "kod_sna", "nazev_sna", "ixs_zpz", "aktivita"]
    *
    * DataReader
    * keys: ["ixs_sna"]
    * columns: ["ixs_sna", "kod_sna", "nazev_sna", "ixs_zpz", "aktivita"]
    * filters: ["ixs_sna","kod_sna","nazev_sna","ixs_zpz","aktivita"]
    */
    function adeRcnssna(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnssnaDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnssnaDto>;
    /**
    * Reader pro čtení dat číselníku Sazby návštěv.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "priz_nah", "kod_tna", "ixs_sna"]
    *
    * DataReader
    * keys: ["ixs_tna"]
    * columns: ["ixs_tna", "ktg_tna", "ixs_zpz", "nazev", "dat_od", "dat_do", "aktivita", "priz_nah", "kod_tna", "ixs_sna"]
    * filters: ["ixs_tna","ktg_tna","ixs_zpz","nazev","dat_od","dat_do","aktivita","priz_nah","kod_tna","ixs_sna"]
    */
    function adeRcnstna(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnstnaDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnstnaDto>;
    /**
    * Reader pro čtení dat číselníku Rozlišení typu osoby.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]
    *
    * DataReader
    * keys: ["ixs_tos"]
    * columns: ["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]
    * filters: ["ixs_tos","nazev","kod_tos","poznamka","typ_dos","aktivita"]
    */
    function adeRcnstos(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeRcnstosDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeRcnstosDto>;
    /**
    * Klientská část AL - číselník Kategorie deníku RZA
    * FieldOptions
    * itemTemplate: "{ktg_den_txt}"
    * helperColumns: ["ktg_den_txt"]
    *
    * DataReader
    * keys: ["ktg_den"]
    * columns: ["ktg_den","ktg_den_txt","k_v","k_s"]
    * filters: [""]
    */
    function adeRzacktd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GRzacktdDto>): GSelectBoxOptions<Gordic.Ade.Interface.GRzacktdDto>;
    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "len_ac", "krok_uza", "ixp_den_old", "prefix", "suffix", "uus"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "ico", "ucs", "nazev", "rok", "typ_den", "ktg_den", "por_cislo_max", "subrada_max", "len_ac", "krok_uza", "ixp_den_old", "prefix", "suffix", "uus"]
    * filters: ["ixp_den","lic","aktivita","arw","poznamka","dat_od","dat_do","ico","ucs","nazev","rok","typ_den","ktg_den","por_cislo_max","subrada_max","len_ac","krok_uza","ixp_den_old","prefix","suffix","uus"]
    */
    function adeSmlsden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeSmlsdenDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeSmlsdenDto>;
    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_typ", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "nazev", "ktg_typ", "popis", "st_utaj_id", "lhuta_vyr", "zkratka", "ixs_ulz", "aktivita_ssl", "spis_pl", "spis_znak", "ofic_nazev", "s_gen_cj", "ixs_esu", "ixs_lpc", "z_int", "cs_nazev", "priz_vycet", "ixs_cin", "poc_dnu_vyp_dor", "ixs_typ_opr", "priz_rsp", "ixs_frm_gform", "priz_epk", "predpl_vec", "typ_vazby", "ixp_sablony", "ixs_frm_gform_spi", "priz_dupli", "over_duver", "zakon_duvod_gdpr", "s_dotaz_irp", "plan_zve", "priz_fyz", "ixs_zap", "ixs_fsk", "ico", "id_ext_alt", "ixs_skr"]
    *
    * DataReader
    * keys: ["ixs_typ"]
    * columns: ["ixs_typ", "lic", "aktivita", "arw", "poznamka", "dat_od", "dat_do", "nazev", "ktg_typ", "popis", "st_utaj_id", "lhuta_vyr", "zkratka", "ixs_ulz", "aktivita_ssl", "spis_pl", "spis_znak", "ofic_nazev", "s_gen_cj", "ixs_esu", "ixs_lpc", "z_int", "cs_nazev", "priz_vycet", "ixs_cin", "poc_dnu_vyp_dor", "ixs_typ_opr", "priz_rsp", "ixs_frm_gform", "priz_epk", "predpl_vec", "typ_vazby", "ixp_sablony", "ixs_frm_gform_spi", "priz_dupli", "over_duver", "zakon_duvod_gdpr", "s_dotaz_irp", "plan_zve", "priz_fyz", "ixs_zap", "ixs_fsk", "ico", "id_ext_alt", "ixs_skr"]
    * filters: ["ixs_typ","lic","aktivita","arw","poznamka","dat_od","dat_do","nazev","ktg_typ","popis","st_utaj_id","lhuta_vyr","zkratka","ixs_ulz","aktivita_ssl","spis_pl","spis_znak","ofic_nazev","s_gen_cj","ixs_esu","ixs_lpc","z_int","cs_nazev","priz_vycet","ixs_cin","poc_dnu_vyp_dor","ixs_typ_opr","priz_rsp","ixs_frm_gform","priz_epk","predpl_vec","typ_vazby","ixp_sablony","ixs_frm_gform_spi","priz_dupli","over_duver","zakon_duvod_gdpr","s_dotaz_irp","plan_zve","priz_fyz","ixs_zap","ixs_fsk","ico","id_ext_alt","ixs_skr"]
    */
    function adeSslstyp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeSslstypDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeSslstypDto>;
    /**
    * Reader pro čtení dat číselníku Deklarace subřad.
    * FieldOptions
    * itemTemplate: "{subrada}"
    * helperColumns: ["rok", "ico", "subrada", "zkratka", "nazev", "aktivita", "ac_cislo_do", "ac_cislo_od", "mesic_od"]
    *
    * DataReader
    * keys: ["rok","ico","subrada"]
    * columns: ["rok", "ico", "subrada", "zkratka", "nazev", "aktivita", "ac_cislo_do", "ac_cislo_od", "mesic_od"]
    * filters: ["rok","ico","subrada","zkratka","nazev","aktivita","ac_cislo_do","ac_cislo_od","mesic_od"]
    */
    function adeUctddde(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ade.Interface.GAdeUctdddeDto>): GSelectBoxOptions<Gordic.Ade.Interface.GAdeUctdddeDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Reader pro čtení dat číselníku Kniha RCN.
    */
    function adeEkoskur(): Selectors.DefaultSelectorOptions<Gordic.Ade.Interface.GAdeEkoskurDto>;
    /**
    * Reader pro čtení dat číselníku Bankovní účty vlastní.
    */
    function adeEkosuvl(): Selectors.DefaultSelectorOptions<Gordic.Ade.Interface.GAdeEkosuvlDto>;
    /**
    * Klientská část AL - číselník Spisové uzly povolené pro ekonomické subjekty (ico, ucs, rok)
    */
    function adeGinspod(): Selectors.DefaultSelectorOptions<Gordic.Ade.Interface.GGinspodEkoDto>;
    /**
    * Reader pro čtení dat číselníku Pokladna.
    */
    function adePokskon(): Selectors.DefaultSelectorOptions<Gordic.Ade.Interface.GAdePokskonDto>;
    /**
    * Reader pro čtení dat číselníku Deklarace subřad.
    */
    function adeUctddde(): Selectors.DefaultSelectorOptions<Gordic.Ade.Interface.GAdeUctdddeDto>;}
