/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       vfp.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Vfp.Client\Gordic.Vfp.Client.csproj
*    created     2026-02-16 14:36:37
*    files       vfp.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Vfp.Client\vfp.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Stav DT
    * keys : ["s_dgr"]
    * columns: ["s_dgr","s_dgr_txt"]
    * filters: ["s_dgr"]
    */
    class Vfpcdgr extends Base<Gordic.Vfp.Interface.GVfpcdgrDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Stav dokumentu
    * keys : ["vfp_stav"]
    * columns: ["vfp_stav","vfp_stav_txt"]
    * filters: ["vfp_stav_txt","vfp_stav"]
    */
    class Vfpcevs extends Base<Gordic.Vfp.Interface.GVfpcevsDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Procesní určení
    * keys : ["pro_urc"]
    * columns: ["pro_urc","pro_urc_txt"]
    * filters: ["pro_urc"]
    */
    class Vfpcpur extends Base<Gordic.Vfp.Interface.GVfpcpurDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Stav přijetí žádosti
    * keys : ["s_sdg"]
    * columns: ["s_sdg","s_sdg_txt"]
    * filters: ["s_sdg"]
    */
    class Vfpcsdg extends Base<Gordic.Vfp.Interface.GVfpcsdgDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Typ DT
    * keys : ["typ_dgr"]
    * columns: ["typ_dgr","typ_dgr_txt","k_v","k_s"]
    * filters: ["typ_dgr"]
    */
    class Vfpctdg extends Base<Gordic.Pap.Interface.GVfpctdgDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Stav přijetí žádosti
    * keys : ["zps_fin"]
    * columns: ["zps_fin","zps_fin_txt"]
    * filters: ["zps_fin"]
    */
    class Vfpczfi extends Base<Gordic.Vfp.Interface.GVfpczfiDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Způsob poskytnutí dotace
    * keys : ["zpus_pd"]
    * columns: ["zpus_pd","zpus_pd_txt"]
    * filters: ["zpus_pd"]
    */
    class Vfpczpd extends Base<Gordic.Vfp.Interface.GVfpczpdDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko vfpsesu
    * keys : ["ixs_esu"]
    * columns: ["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_vz","cj_dgr","naz_prj","misto_pod","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"]
    * filters: ["ixs_pri","cis_por","ixs_esu","ktg_typ"]
    */
    class Vfpsesu extends Base<Gordic.Pap.Interface.GXxxsesuVDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Oblast DT
    * keys : ["oblast_dt"]
    * columns: ["oblast_dt","nazev"]
    * filters: ["oblast_dt","aktivita"]
    */
    class Vfpsobl extends Base<Gordic.Pap.Interface.GVfpsoblDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Stav DT
    * FieldOptions
    * itemTemplate: "{s_dgr_txt:trim:encode}"
    * helperColumns: ["s_dgr_txt"]
    *
    * DataReader 
    * keys: ["s_dgr"]
    * columns: ["s_dgr","s_dgr_txt"]
    * filters: ["s_dgr"]
    */
    function vfpcdgr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Vfp.Interface.GVfpcdgrDto>): GSelectBoxOptions<Gordic.Vfp.Interface.GVfpcdgrDto>;
    /**
    * Stav dokumentu
    * FieldOptions
    * itemTemplate: "{vfp_stav_txt:trim:encode}"
    * helperColumns: ["vfp_stav_txt"]
    *
    * DataReader 
    * keys: ["vfp_stav"]
    * columns: ["vfp_stav","vfp_stav_txt"]
    * filters: ["vfp_stav_txt","vfp_stav"]
    */
    function vfpcevs(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Vfp.Interface.GVfpcevsDto>): GSelectBoxOptions<Gordic.Vfp.Interface.GVfpcevsDto>;
    /**
    * Procesní určení
    * FieldOptions
    * itemTemplate: "{pro_urc_txt:trim:encode}"
    * helperColumns: ["pro_urc_txt"]
    *
    * DataReader 
    * keys: ["pro_urc"]
    * columns: ["pro_urc","pro_urc_txt"]
    * filters: ["pro_urc"]
    */
    function vfpcpur(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Vfp.Interface.GVfpcpurDto>): GSelectBoxOptions<Gordic.Vfp.Interface.GVfpcpurDto>;
    /**
    * Stav přijetí žádosti
    * FieldOptions
    * itemTemplate: "{s_sdg_txt:trim:encode}"
    * helperColumns: ["s_sdg_txt"]
    *
    * DataReader 
    * keys: ["s_sdg"]
    * columns: ["s_sdg","s_sdg_txt"]
    * filters: ["s_sdg"]
    */
    function vfpcsdg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Vfp.Interface.GVfpcsdgDto>): GSelectBoxOptions<Gordic.Vfp.Interface.GVfpcsdgDto>;
    /**
    * Typ DT
    * FieldOptions
    * itemTemplate: "{typ_dgr_txt:trim:encode}"
    * helperColumns: ["typ_dgr_txt"]
    *
    * DataReader 
    * keys: ["typ_dgr"]
    * columns: ["typ_dgr","typ_dgr_txt","k_v","k_s"]
    * filters: ["typ_dgr"]
    */
    function vfpctdg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GVfpctdgDto>): GSelectBoxOptions<Gordic.Pap.Interface.GVfpctdgDto>;
    /**
    * Stav přijetí žádosti
    * FieldOptions
    * itemTemplate: "{zps_fin_txt:trim:encode}"
    * helperColumns: ["zps_fin_txt"]
    *
    * DataReader 
    * keys: ["zps_fin"]
    * columns: ["zps_fin","zps_fin_txt"]
    * filters: ["zps_fin"]
    */
    function vfpczfi(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Vfp.Interface.GVfpczfiDto>): GSelectBoxOptions<Gordic.Vfp.Interface.GVfpczfiDto>;
    /**
    * Způsob poskytnutí dotace
    * FieldOptions
    * itemTemplate: "{zpus_pd_txt:trim:encode}"
    * helperColumns: ["zpus_pd_txt"]
    *
    * DataReader 
    * keys: ["zpus_pd"]
    * columns: ["zpus_pd","zpus_pd_txt"]
    * filters: ["zpus_pd"]
    */
    function vfpczpd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Vfp.Interface.GVfpczpdDto>): GSelectBoxOptions<Gordic.Vfp.Interface.GVfpczpdDto>;
    /**
    * Klient políčko vfpsesu
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixs_esu"]
    * columns: ["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_vz","cj_dgr","naz_prj","misto_pod","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"]
    * filters: ["ixs_pri","cis_por","ixs_esu","ktg_typ"]
    */
    function vfpsesu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxsesuVDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxsesuVDto>;
    /**
    * Oblast DT
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["oblast_dt"]
    * columns: ["oblast_dt","nazev"]
    * filters: ["oblast_dt","aktivita"]
    */
    function vfpsobl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GVfpsoblDto>): GSelectBoxOptions<Gordic.Pap.Interface.GVfpsoblDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klient políčko vfpsesu
    */
    function Vfpsesu(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GXxxsesuVDto>;}

//#endregion

