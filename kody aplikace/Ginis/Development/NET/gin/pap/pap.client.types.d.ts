/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pap.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pap.Client\Gordic.Pap.Client.csproj
*    created     2026-02-16 14:34:16
*    files       pap.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pap.Client\pap.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klient políčko mzacdru
    * keys: ["druh_zak"]
    * columns: ["druh_zak","druh_zak_txt","popis","k_xml"]
    * filters: ["druh_zak","k_xml"]
    */
    class GPapReaderMzacdru extends Base<Gordic.Pap.Interface.GMzacdruDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacdruDto = Gordic.Pap.Interface.GMzacdruDto;
    type GPapReaderMzacdruDtoNames = Gordic.Pap.Interface.GMzacdruDtoNames;
    type GPapReaderMzacdruDtoFragments = Gordic.Pap.Interface.GMzacdruDtoFragments;
    type GPapReaderMzacdruDtoTypes = Gordic.Pap.Interface.GMzacdruDtoTypes;
    type GPapReaderMzacdruDtoTypeLengths = Gordic.Pap.Interface.GMzacdruDtoTypeLengths;

    /**
    * Klient políčko mzacros
    * keys: ["role_ez"]
    * columns: ["role_ez","role_ez_txt","popis","k_xml"]
    * filters: ["role_ez"]
    */
    class GPapReaderMzacros extends Base<Gordic.Pap.Interface.GMzacrosDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacrosDto = Gordic.Pap.Interface.GMzacrosDto;
    type GPapReaderMzacrosDtoNames = Gordic.Pap.Interface.GMzacrosDtoNames;
    type GPapReaderMzacrosDtoFragments = Gordic.Pap.Interface.GMzacrosDtoFragments;
    type GPapReaderMzacrosDtoTypes = Gordic.Pap.Interface.GMzacrosDtoTypes;
    type GPapReaderMzacrosDtoTypeLengths = Gordic.Pap.Interface.GMzacrosDtoTypeLengths;

    /**
    * Klient políčko mzacsou
    * keys: ["druh_zad_riz"]
    * columns: ["druh_zad_riz","druh_zad_riz_txt","popis","k_xml"]
    * filters: ["druh_zad_riz","k_xml"]
    */
    class GPapReaderMzacsou extends Base<Gordic.Pap.Interface.GMzacsouDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacsouDto = Gordic.Pap.Interface.GMzacsouDto;
    type GPapReaderMzacsouDtoNames = Gordic.Pap.Interface.GMzacsouDtoNames;
    type GPapReaderMzacsouDtoFragments = Gordic.Pap.Interface.GMzacsouDtoFragments;
    type GPapReaderMzacsouDtoTypes = Gordic.Pap.Interface.GMzacsouDtoTypes;
    type GPapReaderMzacsouDtoTypeLengths = Gordic.Pap.Interface.GMzacsouDtoTypeLengths;

    /**
    * Klient políčko mzacstc
    * keys: ["stav_caza"]
    * columns: ["stav_caza","stav_caza_txt","popis"]
    * filters: ["stav_caza"]
    */
    class GPapReaderMzacstc extends Base<Gordic.Pap.Interface.GMzacstcDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacstcDto = Gordic.Pap.Interface.GMzacstcDto;
    type GPapReaderMzacstcDtoNames = Gordic.Pap.Interface.GMzacstcDtoNames;
    type GPapReaderMzacstcDtoFragments = Gordic.Pap.Interface.GMzacstcDtoFragments;
    type GPapReaderMzacstcDtoTypes = Gordic.Pap.Interface.GMzacstcDtoTypes;
    type GPapReaderMzacstcDtoTypeLengths = Gordic.Pap.Interface.GMzacstcDtoTypeLengths;

    /**
    * Klient políčko mzacstz
    * keys: ["stav_zak"]
    * columns: ["stav_zak","stav_zak_txt","popis","k_xml"]
    * filters: ["stav_zak","k_xml"]
    */
    class GPapReaderMzacstz extends Base<Gordic.Pap.Interface.GMzacstzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacstzDto = Gordic.Pap.Interface.GMzacstzDto;
    type GPapReaderMzacstzDtoNames = Gordic.Pap.Interface.GMzacstzDtoNames;
    type GPapReaderMzacstzDtoFragments = Gordic.Pap.Interface.GMzacstzDtoFragments;
    type GPapReaderMzacstzDtoTypes = Gordic.Pap.Interface.GMzacstzDtoTypes;
    type GPapReaderMzacstzDtoTypeLengths = Gordic.Pap.Interface.GMzacstzDtoTypeLengths;

    /**
    * Klient políčko mzacros
    * keys: ["syst_ez"]
    * columns: ["syst_ez","syst_ez_txt","k_xml"]
    * filters: ["syst_ez"]
    */
    class GPapReaderMzacsys extends Base<Gordic.Pap.Interface.GMzacsysDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacsysDto = Gordic.Pap.Interface.GMzacsysDto;
    type GPapReaderMzacsysDtoNames = Gordic.Pap.Interface.GMzacsysDtoNames;
    type GPapReaderMzacsysDtoFragments = Gordic.Pap.Interface.GMzacsysDtoFragments;
    type GPapReaderMzacsysDtoTypes = Gordic.Pap.Interface.GMzacsysDtoTypes;
    type GPapReaderMzacsysDtoTypeLengths = Gordic.Pap.Interface.GMzacsysDtoTypeLengths;

    /**
    * Klient políčko typu požadavku
    * keys: ["typ_poza"]
    * columns: ["typ_poza","typ_poza_txt","k_xml"]
    * filters: ["typ_poza","k_xml"]
    */
    class GPapReaderMzactpo extends Base<Gordic.Pap.Interface.GMzactpoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzactpoDto = Gordic.Pap.Interface.GMzactpoDto;
    type GPapReaderMzactpoDtoNames = Gordic.Pap.Interface.GMzactpoDtoNames;
    type GPapReaderMzactpoDtoFragments = Gordic.Pap.Interface.GMzactpoDtoFragments;
    type GPapReaderMzactpoDtoTypes = Gordic.Pap.Interface.GMzactpoDtoTypes;
    type GPapReaderMzactpoDtoTypeLengths = Gordic.Pap.Interface.GMzactpoDtoTypeLengths;

    /**
    * Klient políčko mzacros
    * keys: ["typ_ram_sml"]
    * columns: ["typ_ram_sml","typ_ram_sml_txt","popis","k_xml"]
    * filters: ["typ_ram_sml","k_xml"]
    */
    class GPapReaderMzactra extends Base<Gordic.Pap.Interface.GMzactraDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzactraDto = Gordic.Pap.Interface.GMzactraDto;
    type GPapReaderMzactraDtoNames = Gordic.Pap.Interface.GMzactraDtoNames;
    type GPapReaderMzactraDtoFragments = Gordic.Pap.Interface.GMzactraDtoFragments;
    type GPapReaderMzactraDtoTypes = Gordic.Pap.Interface.GMzactraDtoTypes;
    type GPapReaderMzactraDtoTypeLengths = Gordic.Pap.Interface.GMzactraDtoTypeLengths;

    /**
    * Klient políčko typ dokumentu
    * keys: ["typ_doza"]
    * columns: ["typ_doza","typ_doza_txt","popis","k_xml"]
    * filters: ["typ_doza","k_xml"]
    */
    class GPapReaderMzactyd extends Base<Gordic.Pap.Interface.GMzactydDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzactydDto = Gordic.Pap.Interface.GMzactydDto;
    type GPapReaderMzactydDtoNames = Gordic.Pap.Interface.GMzactydDtoNames;
    type GPapReaderMzactydDtoFragments = Gordic.Pap.Interface.GMzactydDtoFragments;
    type GPapReaderMzactydDtoTypes = Gordic.Pap.Interface.GMzactydDtoTypes;
    type GPapReaderMzactydDtoTypeLengths = Gordic.Pap.Interface.GMzactydDtoTypeLengths;

    /**
    * Klient políčko mzactys
    * keys: ["typ_sml"]
    * columns: ["typ_sml","typ_sml_txt","popis","k_xml"]
    * filters: ["typ_sml","k_xml"]
    */
    class GPapReaderMzactys extends Base<Gordic.Pap.Interface.GMzactysDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzactysDto = Gordic.Pap.Interface.GMzactysDto;
    type GPapReaderMzactysDtoNames = Gordic.Pap.Interface.GMzactysDtoNames;
    type GPapReaderMzactysDtoFragments = Gordic.Pap.Interface.GMzactysDtoFragments;
    type GPapReaderMzactysDtoTypes = Gordic.Pap.Interface.GMzactysDtoTypes;
    type GPapReaderMzactysDtoTypeLengths = Gordic.Pap.Interface.GMzactysDtoTypeLengths;

    /**
    * Klient políčko mzacdru
    * keys: ["typ_zpra"]
    * columns: ["typ_zpra","typ_zpra_txt, k_xml"]
    * filters: ["typ_zpra","k_xml"]
    */
    class GPapReaderMzactzp extends Base<Gordic.Pap.Interface.GMzactzpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzactzpDto = Gordic.Pap.Interface.GMzactzpDto;
    type GPapReaderMzactzpDtoNames = Gordic.Pap.Interface.GMzactzpDtoNames;
    type GPapReaderMzactzpDtoFragments = Gordic.Pap.Interface.GMzactzpDtoFragments;
    type GPapReaderMzactzpDtoTypes = Gordic.Pap.Interface.GMzactzpDtoTypes;
    type GPapReaderMzactzpDtoTypeLengths = Gordic.Pap.Interface.GMzactzpDtoTypeLengths;

    /**
    * Klient políčko příznak uveřejnění
    * keys: ["priz_uve"]
    * columns: ["priz_uve","priz_uve_txt","k_xml"]
    * filters: ["priz_uve"]
    */
    class GPapReaderMzacuve extends Base<Gordic.Pap.Interface.GMzacuveDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacuveDto = Gordic.Pap.Interface.GMzacuveDto;
    type GPapReaderMzacuveDtoNames = Gordic.Pap.Interface.GMzacuveDtoNames;
    type GPapReaderMzacuveDtoFragments = Gordic.Pap.Interface.GMzacuveDtoFragments;
    type GPapReaderMzacuveDtoTypes = Gordic.Pap.Interface.GMzacuveDtoTypes;
    type GPapReaderMzacuveDtoTypeLengths = Gordic.Pap.Interface.GMzacuveDtoTypeLengths;

    /**
    * Klient políčko mzaczdv
    * keys: ["duv_vyra"]
    * columns: ["duv_vyra","duv_vyra_txt","k_xml"]
    * filters: ["duv_vyra"]
    */
    class GPapReaderMzaczdv extends Base<Gordic.Pap.Interface.GMzaczdvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzaczdvDto = Gordic.Pap.Interface.GMzaczdvDto;
    type GPapReaderMzaczdvDtoNames = Gordic.Pap.Interface.GMzaczdvDtoNames;
    type GPapReaderMzaczdvDtoFragments = Gordic.Pap.Interface.GMzaczdvDtoFragments;
    type GPapReaderMzaczdvDtoTypes = Gordic.Pap.Interface.GMzaczdvDtoTypes;
    type GPapReaderMzaczdvDtoTypeLengths = Gordic.Pap.Interface.GMzaczdvDtoTypeLengths;

    /**
    * Klient políčko mzacztz
    * keys: ["typ_ez"]
    * columns: ["typ_ez","typ_ez_txt","k_xml"]
    * filters: ["typ_ez","k_xml"]
    */
    class GPapReaderMzacztz extends Base<Gordic.Pap.Interface.GMzacztzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzacztzDto = Gordic.Pap.Interface.GMzacztzDto;
    type GPapReaderMzacztzDtoNames = Gordic.Pap.Interface.GMzacztzDtoNames;
    type GPapReaderMzacztzDtoFragments = Gordic.Pap.Interface.GMzacztzDtoFragments;
    type GPapReaderMzacztzDtoTypes = Gordic.Pap.Interface.GMzacztzDtoTypes;
    type GPapReaderMzacztzDtoTypeLengths = Gordic.Pap.Interface.GMzacztzDtoTypeLengths;

    /**
    * Klient políčko mzaczzz
    * keys: ["zpus_zah"]
    * columns: ["zpus_zah","zpus_zah_txt","popis","k_xml"]
    * filters: ["zpus_zah","k_xml"]
    */
    class GPapReaderMzaczzz extends Base<Gordic.Pap.Interface.GMzaczzzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderMzaczzzDto = Gordic.Pap.Interface.GMzaczzzDto;
    type GPapReaderMzaczzzDtoNames = Gordic.Pap.Interface.GMzaczzzDtoNames;
    type GPapReaderMzaczzzDtoFragments = Gordic.Pap.Interface.GMzaczzzDtoFragments;
    type GPapReaderMzaczzzDtoTypes = Gordic.Pap.Interface.GMzaczzzDtoTypes;
    type GPapReaderMzaczzzDtoTypeLengths = Gordic.Pap.Interface.GMzaczzzDtoTypeLengths;

    /**
    * Klient políčko rzacfzc
    * keys: ["def_fzc"]
    * columns: ["def_fzc","def_fzc_txt"]
    * filters: ["def_fzc"]
    */
    class GPapReaderRzacfzc extends Base<Gordic.Pap.Interface.GRzacfzcDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderRzacfzcDto = Gordic.Pap.Interface.GRzacfzcDto;
    type GPapReaderRzacfzcDtoNames = Gordic.Pap.Interface.GRzacfzcDtoNames;
    type GPapReaderRzacfzcDtoFragments = Gordic.Pap.Interface.GRzacfzcDtoFragments;
    type GPapReaderRzacfzcDtoTypes = Gordic.Pap.Interface.GRzacfzcDtoTypes;
    type GPapReaderRzacfzcDtoTypeLengths = Gordic.Pap.Interface.GRzacfzcDtoTypeLengths;

    /**
    * Klient  - pro seznam rzaclim
    * keys: ["lim_zak"]
    * columns: ["lim_zak","lim_zak_txt"]
    * filters: ["lim_zak","pre_urc","rez_pri","c_predp_bez"]
    */
    class GPapReaderRzaclim extends Base<Gordic.Pap.Interface.GRzaclimDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderRzaclimDto = Gordic.Pap.Interface.GRzaclimDto;
    type GPapReaderRzaclimDtoNames = Gordic.Pap.Interface.GRzaclimDtoNames;
    type GPapReaderRzaclimDtoFragments = Gordic.Pap.Interface.GRzaclimDtoFragments;
    type GPapReaderRzaclimDtoTypes = Gordic.Pap.Interface.GRzaclimDtoTypes;
    type GPapReaderRzaclimDtoTypeLengths = Gordic.Pap.Interface.GRzaclimDtoTypeLengths;

    /**
    * Klient  - pro seznam rzacpru
    * keys: ["pre_urc"]
    * columns: ["pre_urc","pre_urc_txt"]
    * filters: ["pre_urc"]
    */
    class GPapReaderRzacpru extends Base<Gordic.Pap.Interface.GRzacpruDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderRzacpruDto = Gordic.Pap.Interface.GRzacpruDto;
    type GPapReaderRzacpruDtoNames = Gordic.Pap.Interface.GRzacpruDtoNames;
    type GPapReaderRzacpruDtoFragments = Gordic.Pap.Interface.GRzacpruDtoFragments;
    type GPapReaderRzacpruDtoTypes = Gordic.Pap.Interface.GRzacpruDtoTypes;
    type GPapReaderRzacpruDtoTypeLengths = Gordic.Pap.Interface.GRzacpruDtoTypeLengths;

    /**
    * Klient  - pro seznam rzactza
    * keys: ["pap_tza"]
    * columns: ["pap_tza","pap_tza_txt"]
    * filters: ["pap_tza"]
    */
    class GPapReaderRzactza extends Base<Gordic.Pap.Interface.GRzactzaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderRzactzaDto = Gordic.Pap.Interface.GRzactzaDto;
    type GPapReaderRzactzaDtoNames = Gordic.Pap.Interface.GRzactzaDtoNames;
    type GPapReaderRzactzaDtoFragments = Gordic.Pap.Interface.GRzactzaDtoFragments;
    type GPapReaderRzactzaDtoTypes = Gordic.Pap.Interface.GRzactzaDtoTypes;
    type GPapReaderRzactzaDtoTypeLengths = Gordic.Pap.Interface.GRzactzaDtoTypeLengths;

    /**
    * Klient políčko rzasleg
    * keys: ["leg_usm_par"]
    * columns: ["leg_usm_par", "nazev", "zkratka", "pap_tza", "pre_urc", "lim_zak", "dat_od", "dat_do"]
    * filters: ["leg_usm_par","lim_zak","pre_urc","rez_pri","c_predp_bez"]
    */
    class GPapReaderRzasleg extends Base<Gordic.Pap.Interface.GRzaslegDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderRzaslegDto = Gordic.Pap.Interface.GRzaslegDto;
    type GPapReaderRzaslegDtoNames = Gordic.Pap.Interface.GRzaslegDtoNames;
    type GPapReaderRzaslegDtoFragments = Gordic.Pap.Interface.GRzaslegDtoFragments;
    type GPapReaderRzaslegDtoTypes = Gordic.Pap.Interface.GRzaslegDtoTypes;
    type GPapReaderRzaslegDtoTypeLengths = Gordic.Pap.Interface.GRzaslegDtoTypeLengths;

    /**
    * Klient políčko ddpstpp
    * keys: ["typ_phl"]
    * columns: ["typ_phl","nazev","aktivita"]
    * filters: ["typ_phl","nazev","aktivita"]
    */
    class GPapReaderDdpstpp extends Base<Gordic.Pap.Interface.GDdpstppDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderDdpstppDto = Gordic.Pap.Interface.GDdpstppDto;
    type GPapReaderDdpstppDtoNames = Gordic.Pap.Interface.GDdpstppDtoNames;
    type GPapReaderDdpstppDtoFragments = Gordic.Pap.Interface.GDdpstppDtoFragments;
    type GPapReaderDdpstppDtoTypes = Gordic.Pap.Interface.GDdpstppDtoTypes;
    type GPapReaderDdpstppDtoTypeLengths = Gordic.Pap.Interface.GDdpstppDtoTypeLengths;

    /**
    * Klient  - pro seznam ekosrea
    * keys: ["cis_real","ico"]
    * columns: ["cis_real","ico","nazev","aktivita"]
    * filters: ["cis_real","nazev","ico","aktivita"]
    */
    class PapEkosrea extends Base<Gordic.Pap.Interface.GEkosreaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PapEkosreaDto = Gordic.Pap.Interface.GEkosreaDto;
    type PapEkosreaDtoNames = Gordic.Pap.Interface.GEkosreaDtoNames;
    type PapEkosreaDtoFragments = Gordic.Pap.Interface.GEkosreaDtoFragments;
    type PapEkosreaDtoTypes = Gordic.Pap.Interface.GEkosreaDtoTypes;
    type PapEkosreaDtoTypeLengths = Gordic.Pap.Interface.GEkosreaDtoTypeLengths;

    /**
    * Klient  - pro pro výběr knihy
    * keys: ["ixp_den"]
    * columns: ["ixp_den","nazev","rok","ktg_den","subrada"]
    * filters: ["ixp_den"]
    */
    class GPapReaderIxpDen extends Base<Gordic.Pap.Interface.GPapKnihaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderIxpDenDto = Gordic.Pap.Interface.GPapKnihaDto;
    type GPapReaderIxpDenDtoNames = Gordic.Pap.Interface.GPapKnihaDtoNames;
    type GPapReaderIxpDenDtoFragments = Gordic.Pap.Interface.GPapKnihaDtoFragments;
    type GPapReaderIxpDenDtoTypes = Gordic.Pap.Interface.GPapKnihaDtoTypes;
    type GPapReaderIxpDenDtoTypeLengths = Gordic.Pap.Interface.GPapKnihaDtoTypeLengths;

    /**
    * Klient  - pro pro výběr případu
    * keys: ["ixs_pri"]
    * columns: ["ixs_pri","nazev","ac","ac_ag","rok"]
    * filters: ["ixs_pri"]
    */
    class GPapReaderIxsPri extends Base<Gordic.Pap.Interface.GVyberPripadDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderIxsPriDto = Gordic.Pap.Interface.GVyberPripadDto;
    type GPapReaderIxsPriDtoNames = Gordic.Pap.Interface.GVyberPripadDtoNames;
    type GPapReaderIxsPriDtoFragments = Gordic.Pap.Interface.GVyberPripadDtoFragments;
    type GPapReaderIxsPriDtoTypes = Gordic.Pap.Interface.GVyberPripadDtoTypes;
    type GPapReaderIxsPriDtoTypeLengths = Gordic.Pap.Interface.GVyberPripadDtoTypeLengths;

    /**
    * Klient  - pro seznam Ixssbl
    * keys: ["ixs_sbl"]
    * columns: ["ixs_sbl","nazev","zkratka","poznamka","dat_uzavreni","dat_platnost","nazev_den"]
    * filters: ["ixs_sbl","nazev","zkratka","poznamka","ixp_den","ixs_fun_akt","dat_uzavreni","dat_platnost","dat_ucinnost","ktg_sml","ixs_typ","popis","ixs_fun_ref","ixs_fun_vyriz","ixs_orj","typ_ceny","nazev_den"]
    */
    class GPapReaderIxssbl extends Base<Gordic.Pap.Interface.GSmlxsblDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderIxssblDto = Gordic.Pap.Interface.GSmlxsblDto;
    type GPapReaderIxssblDtoNames = Gordic.Pap.Interface.GSmlxsblDtoNames;
    type GPapReaderIxssblDtoFragments = Gordic.Pap.Interface.GSmlxsblDtoFragments;
    type GPapReaderIxssblDtoTypes = Gordic.Pap.Interface.GSmlxsblDtoTypes;
    type GPapReaderIxssblDtoTypeLengths = Gordic.Pap.Interface.GSmlxsblDtoTypeLengths;

    /**
    * Klient  - pro seznam smlckts
    * keys: ["ktg_sml"]
    * columns: ["ktg_sml","ktg_sml_txt"]
    * filters: ["ktg_sml"]
    */
    class GPapReaderSmlckts extends Base<Gordic.Pap.Interface.GSmlcktsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderSmlcktsDto = Gordic.Pap.Interface.GSmlcktsDto;
    type GPapReaderSmlcktsDtoNames = Gordic.Pap.Interface.GSmlcktsDtoNames;
    type GPapReaderSmlcktsDtoFragments = Gordic.Pap.Interface.GSmlcktsDtoFragments;
    type GPapReaderSmlcktsDtoTypes = Gordic.Pap.Interface.GSmlcktsDtoTypes;
    type GPapReaderSmlcktsDtoTypeLengths = Gordic.Pap.Interface.GSmlcktsDtoTypeLengths;

    /**
    * Typ ceny
    * keys: ["typ_ceny"]
    * columns: ["typ_ceny","typ_ceny_txt","k_v"]
    * filters: ["typ_ceny","typ_ceny_txt"]
    */
    class GPapReaderSmlctyc extends Base<Gordic.Pap.Interface.GSmlctycDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderSmlctycDto = Gordic.Pap.Interface.GSmlctycDto;
    type GPapReaderSmlctycDtoNames = Gordic.Pap.Interface.GSmlctycDtoNames;
    type GPapReaderSmlctycDtoFragments = Gordic.Pap.Interface.GSmlctycDtoFragments;
    type GPapReaderSmlctycDtoTypes = Gordic.Pap.Interface.GSmlctycDtoTypes;
    type GPapReaderSmlctycDtoTypeLengths = Gordic.Pap.Interface.GSmlctycDtoTypeLengths;

    /**
    * Klient  - pro výběr smlsden
    * keys: ["ixp_den"]
    * columns: ["ixp_den","text1","text2","nazev","rok","subrada"]
    * filters: ["ixp_den","nazev","rok"]
    */
    class GPapReaderSmlsden extends Base<Gordic.Pap.Interface.GSmlsdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderSmlsdenDto = Gordic.Pap.Interface.GSmlsdenDto;
    type GPapReaderSmlsdenDtoNames = Gordic.Pap.Interface.GSmlsdenDtoNames;
    type GPapReaderSmlsdenDtoFragments = Gordic.Pap.Interface.GSmlsdenDtoFragments;
    type GPapReaderSmlsdenDtoTypes = Gordic.Pap.Interface.GSmlsdenDtoTypes;
    type GPapReaderSmlsdenDtoTypeLengths = Gordic.Pap.Interface.GSmlsdenDtoTypeLengths;

    /**
    * Klient  - pro výběr smlssou
    * keys: ["soutez"]
    * columns: ["soutez","soutez_txt"]
    * filters: ["soutez","soutez_txt","ktg_typ"]
    */
    class GPapReaderSmlssou extends Base<Gordic.Pap.Interface.GSmlssouDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderSmlssouDto = Gordic.Pap.Interface.GSmlssouDto;
    type GPapReaderSmlssouDtoNames = Gordic.Pap.Interface.GSmlssouDtoNames;
    type GPapReaderSmlssouDtoFragments = Gordic.Pap.Interface.GSmlssouDtoFragments;
    type GPapReaderSmlssouDtoTypes = Gordic.Pap.Interface.GSmlssouDtoTypes;
    type GPapReaderSmlssouDtoTypeLengths = Gordic.Pap.Interface.GSmlssouDtoTypeLengths;

    /**
    * Klient  - pro výběr smlvfun
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev_rf","nazev_ref","nazev"]
    * filters: ["ixs_fun","nazev_rf","nazev_ref","nazev","cis_real"]
    */
    class GPapReaderSmlvfun extends Base<Gordic.Pap.Interface.GGinsfunDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderSmlvfunDto = Gordic.Pap.Interface.GGinsfunDto;
    type GPapReaderSmlvfunDtoNames = Gordic.Pap.Interface.GGinsfunDtoNames;
    type GPapReaderSmlvfunDtoFragments = Gordic.Pap.Interface.GGinsfunDtoFragments;
    type GPapReaderSmlvfunDtoTypes = Gordic.Pap.Interface.GGinsfunDtoTypes;
    type GPapReaderSmlvfunDtoTypeLengths = Gordic.Pap.Interface.GGinsfunDtoTypeLengths;

    /**
    * Klient políčko vybsslstyp
    * keys: ["ixs_typ"]
    * columns: ["ixs_typ","nazev"]
    * filters: ["ixs_typ","nazev","ktg_typ","ktg_typ_od","ktg_typ_do","soutez"]
    */
    class GPapReaderSslstyp extends Base<Gordic.Pap.Interface.GSslstypDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderSslstypDto = Gordic.Pap.Interface.GSslstypDto;
    type GPapReaderSslstypDtoNames = Gordic.Pap.Interface.GSslstypDtoNames;
    type GPapReaderSslstypDtoFragments = Gordic.Pap.Interface.GSslstypDtoFragments;
    type GPapReaderSslstypDtoTypes = Gordic.Pap.Interface.GSslstypDtoTypes;
    type GPapReaderSslstypDtoTypeLengths = Gordic.Pap.Interface.GSslstypDtoTypeLengths;

    /**
    * Klient políčko vybsslstypSml
    * keys: ["ixs_typ"]
    * columns: ["ixs_typ","nazev"]
    * filters: ["ixs_typ"]
    */
    class GPapReaderSslstypSml extends Base<Gordic.Pap.Interface.GSslstypDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderSslstypSmlDto = Gordic.Pap.Interface.GSslstypDto;
    type GPapReaderSslstypSmlDtoNames = Gordic.Pap.Interface.GSslstypDtoNames;
    type GPapReaderSslstypSmlDtoFragments = Gordic.Pap.Interface.GSslstypDtoFragments;
    type GPapReaderSslstypSmlDtoTypes = Gordic.Pap.Interface.GSslstypDtoTypes;
    type GPapReaderSslstypSmlDtoTypeLengths = Gordic.Pap.Interface.GSslstypDtoTypeLengths;

    /**
    * Klient  - pro pro výběr vlastnik
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev_rf","cs_nazev"]
    * filters: ["ixs_fun","nazev_rf","cs_nazev","ixs_orj","ixp_den"]
    */
    class GPapReaderVlastnik extends Base<Gordic.Pap.Interface.GGinsfunDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderVlastnikDto = Gordic.Pap.Interface.GGinsfunDto;
    type GPapReaderVlastnikDtoNames = Gordic.Pap.Interface.GGinsfunDtoNames;
    type GPapReaderVlastnikDtoFragments = Gordic.Pap.Interface.GGinsfunDtoFragments;
    type GPapReaderVlastnikDtoTypes = Gordic.Pap.Interface.GGinsfunDtoTypes;
    type GPapReaderVlastnikDtoTypeLengths = Gordic.Pap.Interface.GGinsfunDtoTypeLengths;

    /**
    * Klient políčko pro výběr historie WS
    * keys: ["dat_zmena"]
    * columns: ["dat_zmena","nazev_rf","ixs_zmp"]
    * filters: ["service"]
    */
    class GPapReaderWsHist extends Base<Gordic.Pap.Interface.GPapWsHistDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderWsHistDto = Gordic.Pap.Interface.GPapWsHistDto;
    type GPapReaderWsHistDtoNames = Gordic.Pap.Interface.GPapWsHistDtoNames;
    type GPapReaderWsHistDtoFragments = Gordic.Pap.Interface.GPapWsHistDtoFragments;
    type GPapReaderWsHistDtoTypes = Gordic.Pap.Interface.GPapWsHistDtoTypes;
    type GPapReaderWsHistDtoTypeLengths = Gordic.Pap.Interface.GPapWsHistDtoTypeLengths;

    /**
    * Klient políčko xxxcdri
    * keys: ["dru_riz"]
    * columns: ["dru_riz","dru_riz_txt"]
    * filters: ["dru_riz","zakon"]
    */
    class GPapReaderXxxcdri extends Base<Gordic.Pap.Interface.GXxxcdriDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxcdriDto = Gordic.Pap.Interface.GXxxcdriDto;
    type GPapReaderXxxcdriDtoNames = Gordic.Pap.Interface.GXxxcdriDtoNames;
    type GPapReaderXxxcdriDtoFragments = Gordic.Pap.Interface.GXxxcdriDtoFragments;
    type GPapReaderXxxcdriDtoTypes = Gordic.Pap.Interface.GXxxcdriDtoTypes;
    type GPapReaderXxxcdriDtoTypeLengths = Gordic.Pap.Interface.GXxxcdriDtoTypeLengths;

    /**
    * Klient políčko Xxxcduz
    * keys: ["cis_duz"]
    * columns: ["cis_duz","cis_duz_txt"]
    * filters: ["cis_duz","nadTyp3","zakon"]
    */
    class GPapReaderXxxcduz extends Base<Gordic.Pap.Interface.GXxxcduzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxcduzDto = Gordic.Pap.Interface.GXxxcduzDto;
    type GPapReaderXxxcduzDtoNames = Gordic.Pap.Interface.GXxxcduzDtoNames;
    type GPapReaderXxxcduzDtoFragments = Gordic.Pap.Interface.GXxxcduzDtoFragments;
    type GPapReaderXxxcduzDtoTypes = Gordic.Pap.Interface.GXxxcduzDtoTypes;
    type GPapReaderXxxcduzDtoTypeLengths = Gordic.Pap.Interface.GXxxcduzDtoTypeLengths;

    /**
    * Stav žádosti
    * keys: ["s_ess"]
    * columns: ["s_ess","s_ess_txt"]
    * filters: ["s_ess_txt","predvyhodnoceni","s_ess","nabedo","nadTyp03","soutez"]
    */
    class GPapReaderXxxcess extends Base<Gordic.Pap.Interface.GXxxcessDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxcessDto = Gordic.Pap.Interface.GXxxcessDto;
    type GPapReaderXxxcessDtoNames = Gordic.Pap.Interface.GXxxcessDtoNames;
    type GPapReaderXxxcessDtoFragments = Gordic.Pap.Interface.GXxxcessDtoFragments;
    type GPapReaderXxxcessDtoTypes = Gordic.Pap.Interface.GXxxcessDtoTypes;
    type GPapReaderXxxcessDtoTypeLengths = Gordic.Pap.Interface.GXxxcessDtoTypeLengths;

    /**
    * Klient políčko xxxcner
    * keys: ["cis_ner"]
    * columns: ["cis_ner","cis_ner_txt"]
    * filters: ["cis_ner"]
    */
    class GPapReaderXxxcner extends Base<Gordic.Pap.Interface.GXxxcnerDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxcnerDto = Gordic.Pap.Interface.GXxxcnerDto;
    type GPapReaderXxxcnerDtoNames = Gordic.Pap.Interface.GXxxcnerDtoNames;
    type GPapReaderXxxcnerDtoFragments = Gordic.Pap.Interface.GXxxcnerDtoFragments;
    type GPapReaderXxxcnerDtoTypes = Gordic.Pap.Interface.GXxxcnerDtoTypes;
    type GPapReaderXxxcnerDtoTypeLengths = Gordic.Pap.Interface.GXxxcnerDtoTypeLengths;

    /**
    * Klient políčko xxxcpri
    * keys: ["pri_pri"]
    * columns: ["pri_pri","pri_pri_txt"]
    * filters: ["pri_pri"]
    */
    class GPapReaderXxxcpri extends Base<Gordic.Pap.Interface.GXxxcpriDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxcpriDto = Gordic.Pap.Interface.GXxxcpriDto;
    type GPapReaderXxxcpriDtoNames = Gordic.Pap.Interface.GXxxcpriDtoNames;
    type GPapReaderXxxcpriDtoFragments = Gordic.Pap.Interface.GXxxcpriDtoFragments;
    type GPapReaderXxxcpriDtoTypes = Gordic.Pap.Interface.GXxxcpriDtoTypes;
    type GPapReaderXxxcpriDtoTypeLengths = Gordic.Pap.Interface.GXxxcpriDtoTypeLengths;

    /**
    * Klient políčko xxxcrez - režim
    * keys: ["rezim_pri"]
    * columns: ["rezim_pri","rezim_pri_txt"]
    * filters: ["rezim_pri"]
    */
    class GPapReaderXxxcrez extends Base<Gordic.Pap.Interface.GXxxcrezDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxcrezDto = Gordic.Pap.Interface.GXxxcrezDto;
    type GPapReaderXxxcrezDtoNames = Gordic.Pap.Interface.GXxxcrezDtoNames;
    type GPapReaderXxxcrezDtoFragments = Gordic.Pap.Interface.GXxxcrezDtoFragments;
    type GPapReaderXxxcrezDtoTypes = Gordic.Pap.Interface.GXxxcrezDtoTypes;
    type GPapReaderXxxcrezDtoTypeLengths = Gordic.Pap.Interface.GXxxcrezDtoTypeLengths;

    /**
    * Klient políčko xxxctfi
    * keys: ["typ_fin"]
    * columns: ["typ_fin","typ_fin_txt"]
    * filters: ["typ_fin"]
    */
    class GPapReaderXxxctfi extends Base<Gordic.Pap.Interface.GXxxctfiDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxctfiDto = Gordic.Pap.Interface.GXxxctfiDto;
    type GPapReaderXxxctfiDtoNames = Gordic.Pap.Interface.GXxxctfiDtoNames;
    type GPapReaderXxxctfiDtoFragments = Gordic.Pap.Interface.GXxxctfiDtoFragments;
    type GPapReaderXxxctfiDtoTypes = Gordic.Pap.Interface.GXxxctfiDtoTypes;
    type GPapReaderXxxctfiDtoTypeLengths = Gordic.Pap.Interface.GXxxctfiDtoTypeLengths;

    /**
    * Klient políčko xxxctyk
    * keys: ["typ_kurz"]
    * columns: ["typ_kurz","typ_kurz_txt"]
    * filters: ["typ_kurz"]
    */
    class GPapReaderXxxctyk extends Base<Gordic.Pap.Interface.GXxxctykDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GPapReaderXxxctykDto = Gordic.Pap.Interface.GXxxctykDto;
    type GPapReaderXxxctykDtoNames = Gordic.Pap.Interface.GXxxctykDtoNames;
    type GPapReaderXxxctykDtoFragments = Gordic.Pap.Interface.GXxxctykDtoFragments;
    type GPapReaderXxxctykDtoTypes = Gordic.Pap.Interface.GXxxctykDtoTypes;
    type GPapReaderXxxctykDtoTypeLengths = Gordic.Pap.Interface.GXxxctykDtoTypeLengths;

    /**
    * Klient  - pro seznam XxxSOho
    * keys: ["xxx_dt"]
    * columns: ["xxx_dt","nazev","zkratka","poznamka"]
    * filters: ["xxx_dt","nazev","zkratka","poznamka","tabulka"]
    */
    class PapXxxSOho extends Base<Gordic.Pap.Interface.GVfpspouohoorpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PapXxxSOhoDto = Gordic.Pap.Interface.GVfpspouohoorpDto;
    type PapXxxSOhoDtoNames = Gordic.Pap.Interface.GVfpspouohoorpDtoNames;
    type PapXxxSOhoDtoFragments = Gordic.Pap.Interface.GVfpspouohoorpDtoFragments;
    type PapXxxSOhoDtoTypes = Gordic.Pap.Interface.GVfpspouohoorpDtoTypes;
    type PapXxxSOhoDtoTypeLengths = Gordic.Pap.Interface.GVfpspouohoorpDtoTypeLengths;

    /**
    * Klient  - pro seznam XxxSPouOrp
    * keys: ["xxx_dt"]
    * columns: ["xxx_dt","nazev","zkratka","poznamka"]
    * filters: ["xxx_dt","nazev","zkratka","poznamka","tabulka"]
    */
    class PapXxxSPouOrp extends Base<Gordic.Pap.Interface.GVfpspouohoorpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PapXxxSPouOrpDto = Gordic.Pap.Interface.GVfpspouohoorpDto;
    type PapXxxSPouOrpDtoNames = Gordic.Pap.Interface.GVfpspouohoorpDtoNames;
    type PapXxxSPouOrpDtoFragments = Gordic.Pap.Interface.GVfpspouohoorpDtoFragments;
    type PapXxxSPouOrpDtoTypes = Gordic.Pap.Interface.GVfpspouohoorpDtoTypes;
    type PapXxxSPouOrpDtoTypeLengths = Gordic.Pap.Interface.GVfpspouohoorpDtoTypeLengths;

    /**
    * Klient políčko vyb xxxvprc
    * keys: ["cislo"]
    * columns: ["cislo","nazev","ixs_pla","ixs_cia","ico","ucs","typ","typ_txt","adresa1","cis_real","ktg_akce","ktg_akce_txt","sip_val1","sip_val2","sip_val3","sip_val4","priz_sta1","priz_sta2","priz_az","stav_inp"]
    * filters: ["cislo","rok","ixs_pla","kompetent","pripojRozaaat"]
    */
    class PapXxxvprc extends Base<Gordic.Pap.Interface.GSrvdrozDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PapXxxvprcDto = Gordic.Pap.Interface.GSrvdrozDto;
    type PapXxxvprcDtoNames = Gordic.Pap.Interface.GSrvdrozDtoNames;
    type PapXxxvprcDtoFragments = Gordic.Pap.Interface.GSrvdrozDtoFragments;
    type PapXxxvprcDtoTypes = Gordic.Pap.Interface.GSrvdrozDtoTypes;
    type PapXxxvprcDtoTypeLengths = Gordic.Pap.Interface.GSrvdrozDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klient políčko mzacdru
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["druh_zak"]
    * columns: ["druh_zak","druh_zak_txt","popis","k_xml"]
    * filters: ["druh_zak","k_xml"]
    */
    function gPapReaderMzacdru(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacdruDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacdruDto>;
    /**
    * Klient políčko mzacros
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["role_ez"]
    * columns: ["role_ez","role_ez_txt","popis","k_xml"]
    * filters: ["role_ez"]
    */
    function gPapReaderMzacros(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacrosDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacrosDto>;
    /**
    * Klient políčko mzacsou
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["druh_zad_riz"]
    * columns: ["druh_zad_riz","druh_zad_riz_txt","popis","k_xml"]
    * filters: ["druh_zad_riz","k_xml"]
    */
    function gPapReaderMzacsou(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacsouDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacsouDto>;
    /**
    * Klient políčko mzacstc
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["stav_caza"]
    * columns: ["stav_caza","stav_caza_txt","popis"]
    * filters: ["stav_caza"]
    */
    function gPapReaderMzacstc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacstcDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacstcDto>;
    /**
    * Klient políčko mzacstz
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["stav_zak"]
    * columns: ["stav_zak","stav_zak_txt","popis","k_xml"]
    * filters: ["stav_zak","k_xml"]
    */
    function gPapReaderMzacstz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacstzDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacstzDto>;
    /**
    * Klient políčko mzacros
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["syst_ez"]
    * columns: ["syst_ez","syst_ez_txt","k_xml"]
    * filters: ["syst_ez"]
    */
    function gPapReaderMzacsys(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacsysDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacsysDto>;
    /**
    * Klient políčko typu požadavku
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["typ_poza"]
    * columns: ["typ_poza","typ_poza_txt","k_xml"]
    * filters: ["typ_poza","k_xml"]
    */
    function gPapReaderMzactpo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzactpoDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzactpoDto>;
    /**
    * Klient políčko mzacros
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["typ_ram_sml"]
    * columns: ["typ_ram_sml","typ_ram_sml_txt","popis","k_xml"]
    * filters: ["typ_ram_sml","k_xml"]
    */
    function gPapReaderMzactra(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzactraDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzactraDto>;
    /**
    * Klient políčko typ dokumentu
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["typ_doza"]
    * columns: ["typ_doza","typ_doza_txt","popis","k_xml"]
    * filters: ["typ_doza","k_xml"]
    */
    function gPapReaderMzactyd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzactydDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzactydDto>;
    /**
    * Klient políčko mzactys
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["typ_sml"]
    * columns: ["typ_sml","typ_sml_txt","popis","k_xml"]
    * filters: ["typ_sml","k_xml"]
    */
    function gPapReaderMzactys(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzactysDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzactysDto>;
    /**
    * Klient políčko mzacdru
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["typ_zpra"]
    * columns: ["typ_zpra","typ_zpra_txt, k_xml"]
    * filters: ["typ_zpra","k_xml"]
    */
    function gPapReaderMzactzp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzactzpDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzactzpDto>;
    /**
    * Klient políčko příznak uveřejnění
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["priz_uve"]
    * columns: ["priz_uve","priz_uve_txt","k_xml"]
    * filters: ["priz_uve"]
    */
    function gPapReaderMzacuve(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacuveDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacuveDto>;
    /**
    * Klient políčko mzaczdv
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["duv_vyra"]
    * columns: ["duv_vyra","duv_vyra_txt","k_xml"]
    * filters: ["duv_vyra"]
    */
    function gPapReaderMzaczdv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzaczdvDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzaczdvDto>;
    /**
    * Klient políčko mzacztz
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["typ_ez"]
    * columns: ["typ_ez","typ_ez_txt","k_xml"]
    * filters: ["typ_ez","k_xml"]
    */
    function gPapReaderMzacztz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzacztzDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzacztzDto>;
    /**
    * Klient políčko mzaczzz
    * FieldOptions
    * itemTemplate: "{k_xml:trim:encode}"
    * helperColumns: ["k_xml"]
    *
    * DataReader
    * keys: ["zpus_zah"]
    * columns: ["zpus_zah","zpus_zah_txt","popis","k_xml"]
    * filters: ["zpus_zah","k_xml"]
    */
    function gPapReaderMzaczzz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GMzaczzzDto>): GSelectBoxOptions<Gordic.Pap.Interface.GMzaczzzDto>;
    /**
    * Klient políčko rzacfzc
    * FieldOptions
    * itemTemplate: "{def_fzc_txt:trim:encode}"
    * helperColumns: ["def_fzc_txt"]
    *
    * DataReader
    * keys: ["def_fzc"]
    * columns: ["def_fzc","def_fzc_txt"]
    * filters: ["def_fzc"]
    */
    function gPapReaderRzacfzc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzacfzcDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzacfzcDto>;
    /**
    * Klient  - pro seznam rzaclim
    * FieldOptions
    * itemTemplate: "{lim_zak_txt:trim:encode}"
    * helperColumns: ["lim_zak_txt"]
    *
    * DataReader
    * keys: ["lim_zak"]
    * columns: ["lim_zak","lim_zak_txt"]
    * filters: ["lim_zak","pre_urc","rez_pri","c_predp_bez"]
    */
    function gPapReaderRzaclim(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzaclimDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzaclimDto>;
    /**
    * Klient  - pro seznam rzacpru
    * FieldOptions
    * itemTemplate: "{pre_urc_txt:trim:encode}"
    * helperColumns: ["pre_urc_txt"]
    *
    * DataReader
    * keys: ["pre_urc"]
    * columns: ["pre_urc","pre_urc_txt"]
    * filters: ["pre_urc"]
    */
    function gPapReaderRzacpru(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzacpruDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzacpruDto>;
    /**
    * Klient  - pro seznam rzactza
    * FieldOptions
    * itemTemplate: "{pap_tza_txt:trim:encode}"
    * helperColumns: ["pap_tza_txt"]
    *
    * DataReader
    * keys: ["pap_tza"]
    * columns: ["pap_tza","pap_tza_txt"]
    * filters: ["pap_tza"]
    */
    function gPapReaderRzactza(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzactzaDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzactzaDto>;
    /**
    * Klient políčko rzasleg
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["leg_usm_par"]
    * columns: ["leg_usm_par", "nazev", "zkratka", "pap_tza", "pre_urc", "lim_zak", "dat_od", "dat_do"]
    * filters: ["leg_usm_par","lim_zak","pre_urc","rez_pri","c_predp_bez"]
    */
    function gPapReaderRzasleg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzaslegDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzaslegDto>;
    /**
    * Klient políčko ddpstpp
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["typ_phl"]
    * columns: ["typ_phl","nazev","aktivita"]
    * filters: ["typ_phl","nazev","aktivita"]
    */
    function gPapReaderDdpstpp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GDdpstppDto>): GSelectBoxOptions<Gordic.Pap.Interface.GDdpstppDto>;
    /**
    * Klient  - pro seznam ekosrea
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["cis_real","ico"]
    * columns: ["cis_real","ico","nazev","aktivita"]
    * filters: ["cis_real","nazev","ico","aktivita"]
    */
    function papEkosrea(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GEkosreaDto>): GSelectBoxOptions<Gordic.Pap.Interface.GEkosreaDto>;
    /**
    * Klient  - pro pro výběr knihy
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den","nazev","rok","ktg_den","subrada"]
    * filters: ["ixp_den"]
    */
    function gPapReaderIxpDen(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GPapKnihaDto>): GSelectBoxOptions<Gordic.Pap.Interface.GPapKnihaDto>;
    /**
    * Klient  - pro pro výběr případu
    * FieldOptions
    * itemTemplate: "{ixs_pri:trim:encode}"
    * helperColumns: ["ixs_pri", "nazev", "ac", "ac_ag", "rok"]
    *
    * DataReader
    * keys: ["ixs_pri"]
    * columns: ["ixs_pri","nazev","ac","ac_ag","rok"]
    * filters: ["ixs_pri"]
    */
    function gPapReaderIxsPri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GVyberPripadDto>): GSelectBoxOptions<Gordic.Pap.Interface.GVyberPripadDto>;
    /**
    * Klient  - pro seznam Ixssbl
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_sbl"]
    * columns: ["ixs_sbl","nazev","zkratka","poznamka","dat_uzavreni","dat_platnost","nazev_den"]
    * filters: ["ixs_sbl","nazev","zkratka","poznamka","ixp_den","ixs_fun_akt","dat_uzavreni","dat_platnost","dat_ucinnost","ktg_sml","ixs_typ","popis","ixs_fun_ref","ixs_fun_vyriz","ixs_orj","typ_ceny","nazev_den"]
    */
    function gPapReaderIxssbl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSmlxsblDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSmlxsblDto>;
    /**
    * Klient  - pro seznam smlckts
    * FieldOptions
    * itemTemplate: "{ktg_sml_txt:trim:encode}"
    * helperColumns: ["ktg_sml_txt"]
    *
    * DataReader
    * keys: ["ktg_sml"]
    * columns: ["ktg_sml","ktg_sml_txt"]
    * filters: ["ktg_sml"]
    */
    function gPapReaderSmlckts(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSmlcktsDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSmlcktsDto>;
    /**
    * Typ ceny
    * FieldOptions
    * itemTemplate: "{typ_ceny_txt:trim:encode}"
    * helperColumns: ["typ_ceny_txt"]
    *
    * DataReader
    * keys: ["typ_ceny"]
    * columns: ["typ_ceny","typ_ceny_txt","k_v"]
    * filters: ["typ_ceny","typ_ceny_txt"]
    */
    function gPapReaderSmlctyc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSmlctycDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSmlctycDto>;
    /**
    * Klient  - pro výběr smlsden
    * FieldOptions
    * itemTemplate: "{text2:trim:encode}"
    * helperColumns: ["text2"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den","text1","text2","nazev","rok","subrada"]
    * filters: ["ixp_den","nazev","rok"]
    */
    function gPapReaderSmlsden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSmlsdenDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSmlsdenDto>;
    /**
    * Klient  - pro výběr smlssou
    * FieldOptions
    * itemTemplate: "{soutez_txt:trim:encode}"
    * helperColumns: ["soutez_txt"]
    *
    * DataReader
    * keys: ["soutez"]
    * columns: ["soutez","soutez_txt"]
    * filters: ["soutez","soutez_txt","ktg_typ"]
    */
    function gPapReaderSmlssou(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSmlssouDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSmlssouDto>;
    /**
    * Klient  - pro výběr smlvfun
    * FieldOptions
    * itemTemplate: "{nazev_rf:trim:encode}"
    * helperColumns: ["nazev_rf"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev_rf","nazev_ref","nazev"]
    * filters: ["ixs_fun","nazev_rf","nazev_ref","nazev","cis_real"]
    */
    function gPapReaderSmlvfun(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GGinsfunDto>): GSelectBoxOptions<Gordic.Pap.Interface.GGinsfunDto>;
    /**
    * Klient políčko vybsslstyp
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_typ"]
    * columns: ["ixs_typ","nazev"]
    * filters: ["ixs_typ","nazev","ktg_typ","ktg_typ_od","ktg_typ_do","soutez"]
    */
    function gPapReaderSslstyp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSslstypDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSslstypDto>;
    /**
    * Klient políčko vybsslstypSml
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_typ"]
    * columns: ["ixs_typ","nazev"]
    * filters: ["ixs_typ"]
    */
    function gPapReaderSslstypSml(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSslstypDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSslstypDto>;
    /**
    * Klient  - pro pro výběr vlastnik
    * FieldOptions
    * itemTemplate: "{nazev_rf:trim:encode}"
    * helperColumns: ["nazev_rf"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev_rf","cs_nazev"]
    * filters: ["ixs_fun","nazev_rf","cs_nazev","ixs_orj","ixp_den"]
    */
    function gPapReaderVlastnik(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GGinsfunDto>): GSelectBoxOptions<Gordic.Pap.Interface.GGinsfunDto>;
    /**
    * Klient políčko pro výběr historie WS
    * FieldOptions
    * itemTemplate: "{dat_zmena:datetime}"
    * helperColumns: ["dat_zmena"]
    *
    * DataReader
    * keys: ["dat_zmena"]
    * columns: ["dat_zmena","nazev_rf","ixs_zmp"]
    * filters: ["service"]
    */
    function gPapReaderWsHist(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GPapWsHistDto>): GSelectBoxOptions<Gordic.Pap.Interface.GPapWsHistDto>;
    /**
    * Klient políčko xxxcdri
    * FieldOptions
    * itemTemplate: "{dru_riz_txt:trim:encode}"
    * helperColumns: ["dru_riz_txt"]
    *
    * DataReader
    * keys: ["dru_riz"]
    * columns: ["dru_riz","dru_riz_txt"]
    * filters: ["dru_riz","zakon"]
    */
    function gPapReaderXxxcdri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxcdriDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxcdriDto>;
    /**
    * Klient políčko Xxxcduz
    * FieldOptions
    * itemTemplate: "{cis_duz_txt:trim:encode}"
    * helperColumns: ["cis_duz_txt"]
    *
    * DataReader
    * keys: ["cis_duz"]
    * columns: ["cis_duz","cis_duz_txt"]
    * filters: ["cis_duz","nadTyp3","zakon"]
    */
    function gPapReaderXxxcduz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxcduzDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxcduzDto>;
    /**
    * Stav žádosti
    * FieldOptions
    * itemTemplate: "{s_ess_txt:trim:encode}"
    * helperColumns: ["s_ess_txt"]
    *
    * DataReader
    * keys: ["s_ess"]
    * columns: ["s_ess","s_ess_txt"]
    * filters: ["s_ess_txt","predvyhodnoceni","s_ess","nabedo","nadTyp03","soutez"]
    */
    function gPapReaderXxxcess(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxcessDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxcessDto>;
    /**
    * Klient políčko xxxcner
    * FieldOptions
    * itemTemplate: "{cis_ner_txt:trim:encode}"
    * helperColumns: ["cis_ner_txt"]
    *
    * DataReader
    * keys: ["cis_ner"]
    * columns: ["cis_ner","cis_ner_txt"]
    * filters: ["cis_ner"]
    */
    function gPapReaderXxxcner(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxcnerDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxcnerDto>;
    /**
    * Klient políčko xxxcpri
    * FieldOptions
    * itemTemplate: "{pri_pri_txt:trim:encode}"
    * helperColumns: ["pri_pri_txt"]
    *
    * DataReader
    * keys: ["pri_pri"]
    * columns: ["pri_pri","pri_pri_txt"]
    * filters: ["pri_pri"]
    */
    function gPapReaderXxxcpri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxcpriDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxcpriDto>;
    /**
    * Klient políčko xxxcrez - režim
    * FieldOptions
    * itemTemplate: "{rezim_pri_txt:trim:encode}"
    * helperColumns: ["rezim_pri_txt"]
    *
    * DataReader
    * keys: ["rezim_pri"]
    * columns: ["rezim_pri","rezim_pri_txt"]
    * filters: ["rezim_pri"]
    */
    function gPapReaderXxxcrez(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxcrezDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxcrezDto>;
    /**
    * Klient políčko xxxctfi
    * FieldOptions
    * itemTemplate: "{typ_fin_txt:trim:encode}"
    * helperColumns: ["typ_fin_txt"]
    *
    * DataReader
    * keys: ["typ_fin"]
    * columns: ["typ_fin","typ_fin_txt"]
    * filters: ["typ_fin"]
    */
    function gPapReaderXxxctfi(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxctfiDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxctfiDto>;
    /**
    * Klient políčko xxxctyk
    * FieldOptions
    * itemTemplate: "{typ_kurz_txt:trim:encode}"
    * helperColumns: ["typ_kurz_txt"]
    *
    * DataReader
    * keys: ["typ_kurz"]
    * columns: ["typ_kurz","typ_kurz_txt"]
    * filters: ["typ_kurz"]
    */
    function gPapReaderXxxctyk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxctykDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxctykDto>;
    /**
    * Klient  - pro seznam XxxSOho
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["xxx_dt"]
    * columns: ["xxx_dt","nazev","zkratka","poznamka"]
    * filters: ["xxx_dt","nazev","zkratka","poznamka","tabulka"]
    */
    function papXxxSOho(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GVfpspouohoorpDto>): GSelectBoxOptions<Gordic.Pap.Interface.GVfpspouohoorpDto>;
    /**
    * Klient  - pro seznam XxxSPouOrp
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["xxx_dt"]
    * columns: ["xxx_dt","nazev","zkratka","poznamka"]
    * filters: ["xxx_dt","nazev","zkratka","poznamka","tabulka"]
    */
    function papXxxSPouOrp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GVfpspouohoorpDto>): GSelectBoxOptions<Gordic.Pap.Interface.GVfpspouohoorpDto>;
    /**
    * Klient políčko vyb xxxvprc
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["cislo"]
    * columns: ["cislo","nazev","ixs_pla","ixs_cia","ico","ucs","typ","typ_txt","adresa1","cis_real","ktg_akce","ktg_akce_txt","sip_val1","sip_val2","sip_val3","sip_val4","priz_sta1","priz_sta2","priz_az","stav_inp"]
    * filters: ["cislo","rok","ixs_pla","kompetent","pripojRozaaat"]
    */
    function papXxxvprc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSrvdrozDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSrvdrozDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klient políčko rzacfzc
    */
    function gPapReaderRzacfzc(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GRzacfzcDto>;
    /**
    * Klient políčko rzasleg
    */
    function gPapReaderRzasleg(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GRzaslegDto>;
    /**
    * Klient  - pro pro výběr knihy
    */
    function gPapReaderIxpDen(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GPapKnihaDto>;
    /**
    * Klient  - pro pro výběr případu
    */
    function gPapReaderIxsPri(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GVyberPripadDto>;
    /**
    * Klient  - pro seznam Ixssbl
    */
    function gPapReaderIxssbl(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GSmlxsblDto>;
    /**
    * Klient  - pro výběr smlssou
    */
    function gPapReaderSmlssou(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GSmlssouDto>;
    /**
    * Klient políčko vybsslstyp
    */
    function gPapReaderSslstyp(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GSslstypDto>;
    /**
    * Klient políčko pro výběr historie WS
    */
    function gPapReaderWsHist(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GPapWsHistDto>;
    /**
    * Klient  - pro seznam XxxSOho
    */
    function papXxxSOho(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GVfpspouohoorpDto>;
    /**
    * Klient  - pro seznam XxxSPouOrp
    */
    function papXxxSPouOrp(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GVfpspouohoorpDto>;
    /**
    * Klient políčko vyb xxxvprc
    */
    function papXxxvprc(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GSrvdrozDto>;}

//#endregion

