declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - číselník Knihy MZA
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "dat_zmena", "zmenu_prov", "ixs_su", "ixp_den_txt", "ucs", "ico"]
    * filters: ["ixp_den","subrada","ico","aktivita"]
    */
    class AdeMzardac extends Base<Gordic.Adx.Interface.GMzardacExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeMzardacDto = Gordic.Adx.Interface.GMzardacExtDto;
    type AdeMzardacDtoNames = Gordic.Adx.Interface.GMzardacExtDtoNames;
    type AdeMzardacDtoFragments = Gordic.Adx.Interface.GMzardacExtDtoFragments;
    type AdeMzardacDtoTypes = Gordic.Adx.Interface.GMzardacExtDtoTypes;
    type AdeMzardacDtoTypeLengths = Gordic.Adx.Interface.GMzardacExtDtoTypeLengths;

    /**
    * Klientská část AL - číselník Knihy RZA
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "dat_zmena", "zmenu_prov", "ixs_su", "ixp_den_txt", "ucs", "ico"]
    * filters: ["ixp_den","subrada","ico","aktivita"]
    */
    class AdeRzardac extends Base<Gordic.Adx.Interface.GRzardacExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeRzardacDto = Gordic.Adx.Interface.GRzardacExtDto;
    type AdeRzardacDtoNames = Gordic.Adx.Interface.GRzardacExtDtoNames;
    type AdeRzardacDtoFragments = Gordic.Adx.Interface.GRzardacExtDtoFragments;
    type AdeRzardacDtoTypes = Gordic.Adx.Interface.GRzardacExtDtoTypes;
    type AdeRzardacDtoTypeLengths = Gordic.Adx.Interface.GRzardacExtDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typ funkce
    * keys: ["rok"]
    * columns: ["rok","nazev","dat_od","dat_do","zkratka","aktivita","dat_zmena","zmenu_prov","apl_lock","ixs_roz_vlzr"]
    * filters: ["rok","aktivita"]
    */
    class AdxEkosobd extends Base<Gordic.Adx.Interface.GReaderAdxEkosobdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxEkosobdDto = Gordic.Adx.Interface.GReaderAdxEkosobdDto;
    type AdxEkosobdDtoNames = Gordic.Adx.Interface.GReaderAdxEkosobdDtoNames;
    type AdxEkosobdDtoFragments = Gordic.Adx.Interface.GReaderAdxEkosobdDtoFragments;
    type AdxEkosobdDtoTypes = Gordic.Adx.Interface.GReaderAdxEkosobdDtoTypes;
    type AdxEkosobdDtoTypeLengths = Gordic.Adx.Interface.GReaderAdxEkosobdDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["aktivita"]
    * columns: ["aktivita","aktivita_txt"]
    * filters: [""]
    */
    class AdxGincakt extends Base<Gordic.Adx.Interface.GReaderAdxGincaktDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGincaktDto = Gordic.Adx.Interface.GReaderAdxGincaktDto;
    type AdxGincaktDtoNames = Gordic.Adx.Interface.GReaderAdxGincaktDtoNames;
    type AdxGincaktDtoFragments = Gordic.Adx.Interface.GReaderAdxGincaktDtoFragments;
    type AdxGincaktDtoTypes = Gordic.Adx.Interface.GReaderAdxGincaktDtoTypes;
    type AdxGincaktDtoTypeLengths = Gordic.Adx.Interface.GReaderAdxGincaktDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["mistnost_druh"]
    * columns: ["mistnost_druh","mistnost_druh_txt","k_v","k_s"]
    * filters: ["mistnost_druh"]
    */
    class AdxGincmis extends Base<Gordic.Adx.Interface.GGincmisDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGincmisDto = Gordic.Adx.Interface.GGincmisDto;
    type AdxGincmisDtoNames = Gordic.Adx.Interface.GGincmisDtoNames;
    type AdxGincmisDtoFragments = Gordic.Adx.Interface.GGincmisDtoFragments;
    type AdxGincmisDtoTypes = Gordic.Adx.Interface.GGincmisDtoTypes;
    type AdxGincmisDtoTypeLengths = Gordic.Adx.Interface.GGincmisDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_obj"]
    * columns: ["typ_obj","typ_obj_txt"]
    * filters: ["typ_obj"]
    */
    class AdxGincobj extends Base<Gordic.Adx.Interface.GGincobjDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGincobjDto = Gordic.Adx.Interface.GGincobjDto;
    type AdxGincobjDtoNames = Gordic.Adx.Interface.GGincobjDtoNames;
    type AdxGincobjDtoFragments = Gordic.Adx.Interface.GGincobjDtoFragments;
    type AdxGincobjDtoTypes = Gordic.Adx.Interface.GGincobjDtoTypes;
    type AdxGincobjDtoTypeLengths = Gordic.Adx.Interface.GGincobjDtoTypeLengths;

    /**
    * Číselník Gincorj
    * keys: ["uroven_orj"]
    * columns: ["uroven_orj", "uroven_orj_txt", "aktivita"]
    * filters: ["uroven_orj"]
    */
    class AdxGincorj extends Base<Gordic.Adx.Interface.GGincorjDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGincorjDto = Gordic.Adx.Interface.GGincorjDto;
    type AdxGincorjDtoNames = Gordic.Adx.Interface.GGincorjDtoNames;
    type AdxGincorjDtoFragments = Gordic.Adx.Interface.GGincorjDtoFragments;
    type AdxGincorjDtoTypes = Gordic.Adx.Interface.GGincorjDtoTypes;
    type AdxGincorjDtoTypeLengths = Gordic.Adx.Interface.GGincorjDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["segment_druh"]
    * columns: ["segment_druh","segment_druh_txt"]
    * filters: ["segment_druh"]
    */
    class AdxGincsbu extends Base<Gordic.Adx.Interface.GGincsbuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGincsbuDto = Gordic.Adx.Interface.GGincsbuDto;
    type AdxGincsbuDtoNames = Gordic.Adx.Interface.GGincsbuDtoNames;
    type AdxGincsbuDtoFragments = Gordic.Adx.Interface.GGincsbuDtoFragments;
    type AdxGincsbuDtoTypes = Gordic.Adx.Interface.GGincsbuDtoTypes;
    type AdxGincsbuDtoTypeLengths = Gordic.Adx.Interface.GGincsbuDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["acckey"]
    * columns: ["acckey","nazev","aktivita"]
    * filters: ["acckey","aktivita"]
    */
    class AdxGinskey extends Base<Gordic.Adx.Interface.GGinskeyDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGinskeyDto = Gordic.Adx.Interface.GGinskeyDto;
    type AdxGinskeyDtoNames = Gordic.Adx.Interface.GGinskeyDtoNames;
    type AdxGinskeyDtoFragments = Gordic.Adx.Interface.GGinskeyDtoFragments;
    type AdxGinskeyDtoTypes = Gordic.Adx.Interface.GGinskeyDtoTypes;
    type AdxGinskeyDtoTypeLengths = Gordic.Adx.Interface.GGinskeyDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["kod_vyu"]
    * columns: ["kod_vyu","kod_vyu_txt","aktivita"]
    * filters: ["kod_vyu","aktivita"]
    */
    class AdxGinskov extends Base<Gordic.Adx.Interface.GGinskovDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGinskovDto = Gordic.Adx.Interface.GGinskovDto;
    type AdxGinskovDtoNames = Gordic.Adx.Interface.GGinskovDtoNames;
    type AdxGinskovDtoFragments = Gordic.Adx.Interface.GGinskovDtoFragments;
    type AdxGinskovDtoTypes = Gordic.Adx.Interface.GGinskovDtoTypes;
    type AdxGinskovDtoTypeLengths = Gordic.Adx.Interface.GGinskovDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_obj","ixs","ico"]
    * columns: ["typ_obj", "ixs", "ico", "typ_vps", "typ_vsp_txt", "poznamka", "aktivita", "nazev"]
    * filters: ["typ_obj","ixs","ico","typ_vps","aktivita"]
    */
    class AdxGinvovp extends Base<Gordic.Adx.Interface.GGinvovpExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxGinvovpDto = Gordic.Adx.Interface.GGinvovpExtDto;
    type AdxGinvovpDtoNames = Gordic.Adx.Interface.GGinvovpExtDtoNames;
    type AdxGinvovpDtoFragments = Gordic.Adx.Interface.GGinvovpExtDtoFragments;
    type AdxGinvovpDtoTypes = Gordic.Adx.Interface.GGinvovpExtDtoTypes;
    type AdxGinvovpDtoTypeLengths = Gordic.Adx.Interface.GGinvovpExtDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixp_den"]
    * columns: ["ixp_den","nazev","rok","ico","ucs","ucs_txt","agenda","aktivita"]
    * filters: ["ixp_den","aktivita"]
    */
    class AdxKnihaIxp extends Base<Gordic.Adx.Interface.GReaderAdxKnihaIxpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxKnihaIxpDto = Gordic.Adx.Interface.GReaderAdxKnihaIxpDto;
    type AdxKnihaIxpDtoNames = Gordic.Adx.Interface.GReaderAdxKnihaIxpDtoNames;
    type AdxKnihaIxpDtoFragments = Gordic.Adx.Interface.GReaderAdxKnihaIxpDtoFragments;
    type AdxKnihaIxpDtoTypes = Gordic.Adx.Interface.GReaderAdxKnihaIxpDtoTypes;
    type AdxKnihaIxpDtoTypeLengths = Gordic.Adx.Interface.GReaderAdxKnihaIxpDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_subj"]
    * columns: ["typ_subj","typ_subj_txt","tab_name"]
    * filters: ["typ_subj"]
    */
    class AdxWflctsu extends Base<Gordic.Adx.Interface.GWflctsuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxWflctsuDto = Gordic.Adx.Interface.GWflctsuDto;
    type AdxWflctsuDtoNames = Gordic.Adx.Interface.GWflctsuDtoNames;
    type AdxWflctsuDtoFragments = Gordic.Adx.Interface.GWflctsuDtoFragments;
    type AdxWflctsuDtoTypes = Gordic.Adx.Interface.GWflctsuDtoTypes;
    type AdxWflctsuDtoTypeLengths = Gordic.Adx.Interface.GWflctsuDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_blk"]
    * columns: ["ixs_blk","nazev","poznamka","dat_od","dat_do","typ","typ_subj"]
    * filters: ["ixs_blk","typ","typ_subj","aktivita","pouzePlatne"]
    */
    class AdxWflsblk extends Base<Gordic.Adx.Interface.GWflsblkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdxWflsblkDto = Gordic.Adx.Interface.GWflsblkDto;
    type AdxWflsblkDtoNames = Gordic.Adx.Interface.GWflsblkDtoNames;
    type AdxWflsblkDtoFragments = Gordic.Adx.Interface.GWflsblkDtoFragments;
    type AdxWflsblkDtoTypes = Gordic.Adx.Interface.GWflsblkDtoTypes;
    type AdxWflsblkDtoTypeLengths = Gordic.Adx.Interface.GWflsblkDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - číselník Knihy MZA
    * FieldOptions
    * itemTemplate: "<b>{ixp_den_txt}</b> | jres:33000030: {ucs} | jres:33000029: {ico}"
    * helperColumns: ["ixp_den_txt"]
    *
    * DataReader
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "dat_zmena", "zmenu_prov", "ixs_su", "ixp_den_txt", "ucs", "ico"]
    * filters: ["ixp_den","subrada","ico","aktivita"]
    */
    function adeMzardac(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GMzardacExtDto>): GSelectBoxOptions<Gordic.Adx.Interface.GMzardacExtDto>;
    /**
    * Klientská část AL - číselník Knihy RZA
    * FieldOptions
    * itemTemplate: "<b>{ixp_den_txt}</b> | jres:33000030: {ucs} | jres:33000029: {ico}"
    * helperColumns: ["ixp_den_txt"]
    *
    * DataReader
    * keys: ["ixp_den","subrada"]
    * columns: ["ixp_den", "subrada", "zkratka", "nazev", "akt_subrady", "ac_cislo_do", "ac_cislo_od", "ac_cislo_max", "mesic", "dat_zmena", "zmenu_prov", "ixs_su", "ixp_den_txt", "ucs", "ico"]
    * filters: ["ixp_den","subrada","ico","aktivita"]
    */
    function adeRzardac(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GRzardacExtDto>): GSelectBoxOptions<Gordic.Adx.Interface.GRzardacExtDto>;
    /**
    * Klientská část AL - číselník Typ funkce
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["rok"]
    *
    * DataReader
    * keys: ["rok"]
    * columns: ["rok","nazev","dat_od","dat_do","zkratka","aktivita","dat_zmena","zmenu_prov","apl_lock","ixs_roz_vlzr"]
    * filters: ["rok","aktivita"]
    */
    function adxEkosobd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GReaderAdxEkosobdDto>): GSelectBoxOptions<Gordic.Adx.Interface.GReaderAdxEkosobdDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{aktivita_txt}"
    * helperColumns: ["aktivita_txt", "aktivita"]
    *
    * DataReader
    * keys: ["aktivita"]
    * columns: ["aktivita","aktivita_txt"]
    * filters: [""]
    */
    function adxGincakt(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GReaderAdxGincaktDto>): GSelectBoxOptions<Gordic.Adx.Interface.GReaderAdxGincaktDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{mistnost_druh_txt}"
    * helperColumns: ["mistnost_druh_txt"]
    *
    * DataReader
    * keys: ["mistnost_druh"]
    * columns: ["mistnost_druh","mistnost_druh_txt","k_v","k_s"]
    * filters: ["mistnost_druh"]
    */
    function adxGincmis(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GGincmisDto>): GSelectBoxOptions<Gordic.Adx.Interface.GGincmisDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_obj_txt:trim:encode}"
    * helperColumns: ["typ_obj", "typ_obj_txt"]
    *
    * DataReader
    * keys: ["typ_obj"]
    * columns: ["typ_obj","typ_obj_txt"]
    * filters: ["typ_obj"]
    */
    function adxGincobj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GGincobjDto>): GSelectBoxOptions<Gordic.Adx.Interface.GGincobjDto>;
    /**
    * Číselník Gincorj
    * FieldOptions
    * itemTemplate: "{uroven_orj_txt}"
    * helperColumns: ["uroven_orj_txt"]
    *
    * DataReader
    * keys: ["uroven_orj"]
    * columns: ["uroven_orj", "uroven_orj_txt", "aktivita"]
    * filters: ["uroven_orj"]
    */
    function adxGincorj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GGincorjDto>): GSelectBoxOptions<Gordic.Adx.Interface.GGincorjDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{segment_druh_txt}"
    * helperColumns: ["segment_druh_txt"]
    *
    * DataReader
    * keys: ["segment_druh"]
    * columns: ["segment_druh","segment_druh_txt"]
    * filters: ["segment_druh"]
    */
    function adxGincsbu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GGincsbuDto>): GSelectBoxOptions<Gordic.Adx.Interface.GGincsbuDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{acckey}</b> | {nazev}"
    * helperColumns: ["nazev", "acckey"]
    *
    * DataReader
    * keys: ["acckey"]
    * columns: ["acckey","nazev","aktivita"]
    * filters: ["acckey","aktivita"]
    */
    function adxGinskey(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GGinskeyDto>): GSelectBoxOptions<Gordic.Adx.Interface.GGinskeyDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{kod_vyu_txt}"
    * helperColumns: ["kod_vyu_txt"]
    *
    * DataReader
    * keys: ["kod_vyu"]
    * columns: ["kod_vyu","kod_vyu_txt","aktivita"]
    * filters: ["kod_vyu","aktivita"]
    */
    function adxGinskov(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GGinskovDto>): GSelectBoxOptions<Gordic.Adx.Interface.GGinskovDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{typ_vps_txt:trim:encode}</b>:&nbsp;{nazev:trim:encode}"
    * helperColumns: ["typ_vsp_txt", "nazev"]
    *
    * DataReader
    * keys: ["typ_obj","ixs","ico"]
    * columns: ["typ_obj", "ixs", "ico", "typ_vps", "typ_vsp_txt", "poznamka", "aktivita", "nazev"]
    * filters: ["typ_obj","ixs","ico","typ_vps","aktivita"]
    */
    function adxGinvovp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GGinvovpExtDto>): GSelectBoxOptions<Gordic.Adx.Interface.GGinvovpExtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["nazev", "ixp_den", "rok", "agenda"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den","nazev","rok","ico","ucs","ucs_txt","agenda","aktivita"]
    * filters: ["ixp_den","aktivita"]
    */
    function adxKnihaIxp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GReaderAdxKnihaIxpDto>): GSelectBoxOptions<Gordic.Adx.Interface.GReaderAdxKnihaIxpDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_subj_txt:trim:encode}"
    * helperColumns: ["typ_subj_txt"]
    *
    * DataReader
    * keys: ["typ_subj"]
    * columns: ["typ_subj","typ_subj_txt","tab_name"]
    * filters: ["typ_subj"]
    */
    function adxWflctsu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GWflctsuDto>): GSelectBoxOptions<Gordic.Adx.Interface.GWflctsuDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev", "poznamka", "typ_subj"]
    *
    * DataReader
    * keys: ["ixs_blk"]
    * columns: ["ixs_blk","nazev","poznamka","dat_od","dat_do","typ","typ_subj"]
    * filters: ["ixs_blk","typ","typ_subj","aktivita","pouzePlatne"]
    */
    function adxWflsblk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GWflsblkDto>): GSelectBoxOptions<Gordic.Adx.Interface.GWflsblkDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská část AL
    */
    function adxGinvovp(): Selectors.DefaultSelectorOptions<Gordic.Adx.Interface.GGinvovpExtDto>;
    /**
    * Klientská část AL
    */
    function adxKnihaIxp(): Selectors.DefaultSelectorOptions<Gordic.Adx.Interface.GReaderAdxKnihaIxpDto>;
    /**
    * Klientská část AL
    */
    function adxWflctsu(): Selectors.DefaultSelectorOptions<Gordic.Adx.Interface.GWflctsuDto>;
    /**
    * Klientská část AL
    */
    function adxWflsblk(): Selectors.DefaultSelectorOptions<Gordic.Adx.Interface.GWflsblkDto>;}
