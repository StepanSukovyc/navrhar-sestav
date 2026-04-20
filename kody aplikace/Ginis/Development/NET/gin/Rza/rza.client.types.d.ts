/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       rza.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Rza.Client\Gordic.Rza.Client.csproj
*    created     2026-02-16 14:35:49
*    files       rza.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Rza.Client\rza.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - seznam dokumentů ke spisu
    * keys : ["ixp"]
    * columns: ["ixp","akt_znacka","poznamka","nazev","Vlastnictvi","umisteni","poc_priloh"]
    * filters: ["ixs_typ"]
    */
    class DokumentRZA extends Base<Gordic.Ssl.Interface.GDokumentDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacdri
    * keys : ["dri_pri"]
    * columns: ["dri_pri","dri_pri_txt"]
    * filters: ["dri_pri"]
    */
    class Rzacdri extends Base<Gordic.Rza.Interface.GRzacdriDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacduz
    * keys : ["duz_zak"]
    * columns: ["duz_zak","duz_zak_txt"]
    * filters: ["duz_zak"]
    */
    class Rzacduz extends Base<Gordic.Rza.Interface.GRzacduzDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacdzd
    * keys : ["dis_zad"]
    * columns: ["dis_zad","dis_zad_txt"]
    * filters: ["dis_zad"]
    */
    class Rzacdzd extends Base<Gordic.Rza.Interface.GRzacdzdDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacesh
    * keys : ["s_esh"]
    * columns: ["s_esh","s_esh_txt"]
    * filters: ["s_esh"]
    */
    class Rzacesh extends Base<Gordic.Rza.Interface.GRzaceshDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacesn
    * keys : ["s_esn"]
    * columns: ["s_esn","s_esn_txt"]
    * filters: ["s_esn"]
    */
    class Rzacesn extends Base<Gordic.Rza.Interface.GRzacesnDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacess
    * keys : ["s_ess"]
    * columns: ["s_ess","s_ess_txt"]
    * filters: ["s_ess"]
    */
    class Rzacess extends Base<Gordic.Rza.Interface.GRzacessDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacesv
    * keys : ["s_esv"]
    * columns: ["s_esv","s_esv_txt"]
    * filters: ["s_esv"]
    */
    class Rzacesv extends Base<Gordic.Rza.Interface.GRzacesvDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzackpz
    * keys : ["kat_pza"]
    * columns: ["kat_pza","kat_pza_txt"]
    * filters: ["kat_pza"]
    */
    class Rzackpz extends Base<Gordic.Rza.Interface.GRzackpzDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacleg
    * keys : ["leg_usm"]
    * columns: ["leg_usm","leg_usm_txt"]
    * filters: ["leg_usm"]
    */
    class Rzacleg extends Base<Gordic.Rza.Interface.GRzaclegDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacner
    * keys : ["ner_zak"]
    * columns: ["ner_zak","ner_zak_txt"]
    * filters: ["ner_zak"]
    */
    class Rzacner extends Base<Gordic.Rza.Interface.GRzacnerDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacpri
    * keys : ["pri_zak"]
    * columns: ["pri_zak","pri_zak_txt"]
    * filters: ["pri_zak"]
    */
    class Rzacpri extends Base<Gordic.Rza.Interface.GRzacpriDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacrez
    * keys : ["rez_pri"]
    * columns: ["rez_pri","rez_pri_txt"]
    * filters: ["rez_pri"]
    */
    class Rzacrez extends Base<Gordic.Pap.Interface.GRzacrezDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacsji
    * keys : ["sta_jis"]
    * columns: ["sta_jis","sta_jis_txt"]
    * filters: ["sta_jis"]
    */
    class Rzacsji extends Base<Gordic.Rza.Interface.GRzacsjiDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacsza
    * keys : ["s_zak"]
    * columns: ["s_zak","s_zak_txt"]
    * filters: ["s_zak"]
    */
    class Rzacsza extends Base<Gordic.Rza.Interface.GRzacszaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzactfi
    * keys : ["tfi_pri"]
    * columns: ["tfi_pri","tfi_pri_txt"]
    * filters: ["tfi_pri"]
    */
    class Rzactfi extends Base<Gordic.Rza.Interface.GRzactfiDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzacvri
    * keys : ["vri_pri"]
    * columns: ["vri_pri","vri_pri_txt"]
    * filters: ["vri_pri"]
    */
    class Rzacvri extends Base<Gordic.Pap.Interface.GRzacvriDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzaczpo
    * keys : ["zpu_pod"]
    * columns: ["zpu_pod","zpu_pod_txt"]
    * filters: ["zpu_pod"]
    */
    class Rzaczpo extends Base<Gordic.Rza.Interface.GRzaczpoDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzaczpr
    * keys : ["zpu_rea"]
    * columns: ["zpu_rea","zpu_rea_txt"]
    * filters: ["zpu_rea"]
    */
    class Rzaczpr extends Base<Gordic.Pap.Interface.GRzaczprDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko evzsesu
    * keys : ["ixs_esu"]
    * columns: ["ixs_esu","ixs_esu_txt","por_cis_nab","dat_pre_nab","ixp_nab"]
    * filters: ["ixs_zak","ixs_esu"]
    */
    class Rzasesu extends Base<Gordic.Rza.Interface.GRzasesuDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko rzaskpu
    * keys : ["kpr_urc"]
    * columns: ["kpr_urc","nazev","zkratka"]
    * filters: ["kpr_urc"]
    */
    class Rzaskpu extends Base<Gordic.Pap.Interface.GRzaskpuDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - seznam dokumentů ke spisu
    * FieldOptions
    * itemTemplate: "{ixp}"
    * helperColumns: ["ixp"]
    *
    * DataReader 
    * keys: ["ixp"]
    * columns: ["ixp","akt_znacka","poznamka","nazev","Vlastnictvi","umisteni","poc_priloh"]
    * filters: ["ixs_typ"]
    */
    function dokumentRZA(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ssl.Interface.GDokumentDto>): GSelectBoxOptions<Gordic.Ssl.Interface.GDokumentDto>;
    /**
    * Klient políčko rzacdri
    * FieldOptions
    * itemTemplate: "{dri_pri_txt:trim:encode}"
    * helperColumns: ["dri_pri_txt"]
    *
    * DataReader 
    * keys: ["dri_pri"]
    * columns: ["dri_pri","dri_pri_txt"]
    * filters: ["dri_pri"]
    */
    function rzacdri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacdriDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacdriDto>;
    /**
    * Klient políčko rzacduz
    * FieldOptions
    * itemTemplate: "{duz_zak_txt:trim:encode}"
    * helperColumns: ["duz_zak_txt"]
    *
    * DataReader 
    * keys: ["duz_zak"]
    * columns: ["duz_zak","duz_zak_txt"]
    * filters: ["duz_zak"]
    */
    function rzacduz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacduzDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacduzDto>;
    /**
    * Klient políčko rzacdzd
    * FieldOptions
    * itemTemplate: "{dis_zad_txt:trim:encode}"
    * helperColumns: ["dis_zad_txt"]
    *
    * DataReader 
    * keys: ["dis_zad"]
    * columns: ["dis_zad","dis_zad_txt"]
    * filters: ["dis_zad"]
    */
    function rzacdzd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacdzdDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacdzdDto>;
    /**
    * Klient políčko rzacesh
    * FieldOptions
    * itemTemplate: "{s_esh_txt:trim:encode}"
    * helperColumns: ["s_esh_txt"]
    *
    * DataReader 
    * keys: ["s_esh"]
    * columns: ["s_esh","s_esh_txt"]
    * filters: ["s_esh"]
    */
    function rzacesh(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzaceshDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzaceshDto>;
    /**
    * Klient políčko rzacesn
    * FieldOptions
    * itemTemplate: "{s_esn_txt:trim:encode}"
    * helperColumns: ["s_esn_txt"]
    *
    * DataReader 
    * keys: ["s_esn"]
    * columns: ["s_esn","s_esn_txt"]
    * filters: ["s_esn"]
    */
    function rzacesn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacesnDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacesnDto>;
    /**
    * Klient políčko rzacess
    * FieldOptions
    * itemTemplate: "{s_ess_txt:trim:encode}"
    * helperColumns: ["s_ess_txt"]
    *
    * DataReader 
    * keys: ["s_ess"]
    * columns: ["s_ess","s_ess_txt"]
    * filters: ["s_ess"]
    */
    function rzacess(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacessDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacessDto>;
    /**
    * Klient políčko rzacesv
    * FieldOptions
    * itemTemplate: "{s_esv_txt:trim:encode}"
    * helperColumns: ["s_esv_txt"]
    *
    * DataReader 
    * keys: ["s_esv"]
    * columns: ["s_esv","s_esv_txt"]
    * filters: ["s_esv"]
    */
    function rzacesv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacesvDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacesvDto>;
    /**
    * Klient políčko rzackpz
    * FieldOptions
    * itemTemplate: "{kat_pza_txt:trim:encode}"
    * helperColumns: ["kat_pza_txt"]
    *
    * DataReader 
    * keys: ["kat_pza"]
    * columns: ["kat_pza","kat_pza_txt"]
    * filters: ["kat_pza"]
    */
    function rzackpz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzackpzDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzackpzDto>;
    /**
    * Klient políčko rzacleg
    * FieldOptions
    * itemTemplate: "{leg_usm_txt}"
    * helperColumns: ["leg_usm_txt"]
    *
    * DataReader 
    * keys: ["leg_usm"]
    * columns: ["leg_usm","leg_usm_txt"]
    * filters: ["leg_usm"]
    */
    function rzacleg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzaclegDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzaclegDto>;
    /**
    * Klient políčko rzacner
    * FieldOptions
    * itemTemplate: "{ner_zak_txt:trim:encode}"
    * helperColumns: ["ner_zak_txt"]
    *
    * DataReader 
    * keys: ["ner_zak"]
    * columns: ["ner_zak","ner_zak_txt"]
    * filters: ["ner_zak"]
    */
    function rzacner(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacnerDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacnerDto>;
    /**
    * Klient políčko rzacpri
    * FieldOptions
    * itemTemplate: "{pri_zak_txt}"
    * helperColumns: ["pri_zak_txt"]
    *
    * DataReader 
    * keys: ["pri_zak"]
    * columns: ["pri_zak","pri_zak_txt"]
    * filters: ["pri_zak"]
    */
    function rzacpri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacpriDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacpriDto>;
    /**
    * Klient políčko rzacrez
    * FieldOptions
    * itemTemplate: "{rez_pri_txt:trim:encode}"
    * helperColumns: ["rez_pri_txt"]
    *
    * DataReader 
    * keys: ["rez_pri"]
    * columns: ["rez_pri","rez_pri_txt"]
    * filters: ["rez_pri"]
    */
    function rzacrez(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzacrezDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzacrezDto>;
    /**
    * Klient políčko rzacsji
    * FieldOptions
    * itemTemplate: "{sta_jis_txt:trim:encode}"
    * helperColumns: ["sta_jis_txt"]
    *
    * DataReader 
    * keys: ["sta_jis"]
    * columns: ["sta_jis","sta_jis_txt"]
    * filters: ["sta_jis"]
    */
    function rzacsji(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacsjiDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacsjiDto>;
    /**
    * Klient políčko rzacsza
    * FieldOptions
    * itemTemplate: "{s_zak_txt:trim:encode}"
    * helperColumns: ["s_zak_txt"]
    *
    * DataReader 
    * keys: ["s_zak"]
    * columns: ["s_zak","s_zak_txt"]
    * filters: ["s_zak"]
    */
    function rzacsza(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzacszaDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzacszaDto>;
    /**
    * Klient políčko rzactfi
    * FieldOptions
    * itemTemplate: "{tfi_pri_txt:trim:encode}"
    * helperColumns: ["tfi_pri_txt"]
    *
    * DataReader 
    * keys: ["tfi_pri"]
    * columns: ["tfi_pri","tfi_pri_txt"]
    * filters: ["tfi_pri"]
    */
    function rzactfi(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzactfiDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzactfiDto>;
    /**
    * Klient políčko rzacvri
    * FieldOptions
    * itemTemplate: "{vri_pri_txt:trim:encode}"
    * helperColumns: ["vri_pri_txt"]
    *
    * DataReader 
    * keys: ["vri_pri"]
    * columns: ["vri_pri","vri_pri_txt"]
    * filters: ["vri_pri"]
    */
    function rzacvri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzacvriDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzacvriDto>;
    /**
    * Klient políčko rzaczpo
    * FieldOptions
    * itemTemplate: "{zpu_pod_txt:trim:encode}"
    * helperColumns: ["zpu_pod_txt"]
    *
    * DataReader 
    * keys: ["zpu_pod"]
    * columns: ["zpu_pod","zpu_pod_txt"]
    * filters: ["zpu_pod"]
    */
    function rzaczpo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzaczpoDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzaczpoDto>;
    /**
    * Klient políčko rzaczpr
    * FieldOptions
    * itemTemplate: "{zpu_rea_txt}"
    * helperColumns: ["zpu_rea_txt"]
    *
    * DataReader 
    * keys: ["zpu_rea"]
    * columns: ["zpu_rea","zpu_rea_txt"]
    * filters: ["zpu_rea"]
    */
    function rzaczpr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzaczprDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzaczprDto>;
    /**
    * Klient políčko evzsesu
    * FieldOptions
    * itemTemplate: "{ixs_esu_txt}"
    * helperColumns: ["ixs_esu_txt"]
    *
    * DataReader 
    * keys: ["ixs_esu"]
    * columns: ["ixs_esu","ixs_esu_txt","por_cis_nab","dat_pre_nab","ixp_nab"]
    * filters: ["ixs_zak","ixs_esu"]
    */
    function rzasesu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rza.Interface.GRzasesuDto>): GSelectBoxOptions<Gordic.Rza.Interface.GRzasesuDto>;
    /**
    * Klient políčko rzaskpu
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["kpr_urc"]
    * columns: ["kpr_urc","nazev","zkratka"]
    * filters: ["kpr_urc"]
    */
    function rzaskpu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GRzaskpuDto>): GSelectBoxOptions<Gordic.Pap.Interface.GRzaskpuDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská část AL - seznam dokumentů ke spisu
    */
    function dokumentRZA(): Selectors.DefaultSelectorOptions<Gordic.Ssl.Interface.GDokumentDto>;
    /**
    * Klient políčko evzsesu
    */
    function Rzasesu(): Selectors.DefaultSelectorOptions<Gordic.Rza.Interface.GRzasesuDto>;
    /**
    * Klient políčko rzaskpu
    */
    function rzaskpu(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GRzaskpuDto>;}

//#endregion

