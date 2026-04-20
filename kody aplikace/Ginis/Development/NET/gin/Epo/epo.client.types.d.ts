/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       epo.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Epo.Client\Gordic.Epo.Client.csproj
*    created     2026-02-16 14:34:14
*    files       epo.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Epo.Client\epo.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klient políčko Epocevs
    * keys : ["epo_stav"]
    * columns: ["epo_stav","epo_stav_txt"]
    * filters: ["epo_stav"]
    */
    class Epocevs extends Base<Gordic.Epo.Interface.GEpocevsDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko Epockri
    * keys : ["cis_kri"]
    * columns: ["cis_kri","cis_kri_txt"]
    * filters: ["cis_kri"]
    */
    class Epockri extends Base<Gordic.Epo.Interface.GEpockriDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko Epoclim
    * keys : ["lim_zac"]
    * columns: ["lim_zac","lim_zac_txt"]
    * filters: ["lim_zac"]
    */
    class Epoclim extends Base<Gordic.Epo.Interface.GEpoclimDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko Epocpru
    * keys : ["pred_urc"]
    * columns: ["pred_urc","pred_urc_txt"]
    * filters: ["pred_urc"]
    */
    class Epocpru extends Base<Gordic.Epo.Interface.GEpocpruDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko Epocspo
    * keys : ["s_po"]
    * columns: ["s_po","s_po_txt"]
    * filters: ["s_po"]
    */
    class Epocspo extends Base<Gordic.Epo.Interface.GEpocspoDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko Epocsso
    * keys : ["s_sou"]
    * columns: ["s_sou","s_sou_txt"]
    * filters: ["s_sou"]
    */
    class Epocsso extends Base<Gordic.Epo.Interface.GEpocssoDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko Epoctda
    * keys : ["typ_datum"]
    * columns: ["typ_datum","typ_datum_txt"]
    * filters: ["typ_datum"]
    */
    class Epoctda extends Base<Gordic.Epo.Interface.GEpoctdaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko eposesu
    * keys : ["ixs_esu"]
    * columns: ["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"]
    * filters: ["ixs_pri","cis_por","ixs_esu","ktg_typ"]
    */
    class Eposesu extends Base<Gordic.Pap.Interface.GXxxsesuVDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klient políčko epossop
    * keys : ["soutez_po"]
    * columns: ["soutez_po", "typ_po_txt","soutez_po_txt","pred_urc_txt","lim_zac_txt","typ_po","lim_zac","pred_urc"]
    * filters: ["soutez_po","soutez_po_txt","typ_po","pred_urc","lim_zac"]
    */
    class Epossop extends Base<Gordic.Epo.Interface.GEpossopDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klient políčko Epocevs
    * FieldOptions
    * itemTemplate: "{epo_stav_txt:trim:encode}"
    * helperColumns: ["epo_stav_txt"]
    *
    * DataReader 
    * keys: ["epo_stav"]
    * columns: ["epo_stav","epo_stav_txt"]
    * filters: ["epo_stav"]
    */
    function epocevs(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpocevsDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpocevsDto>;
    /**
    * Klient políčko Epockri
    * FieldOptions
    * itemTemplate: "{cis_kri_txt:trim:encode}"
    * helperColumns: ["cis_kri_txt"]
    *
    * DataReader 
    * keys: ["cis_kri"]
    * columns: ["cis_kri","cis_kri_txt"]
    * filters: ["cis_kri"]
    */
    function epockri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpockriDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpockriDto>;
    /**
    * Klient políčko Epoclim
    * FieldOptions
    * itemTemplate: "{lim_zac_txt:trim:encode}"
    * helperColumns: ["lim_zac_txt"]
    *
    * DataReader 
    * keys: ["lim_zac"]
    * columns: ["lim_zac","lim_zac_txt"]
    * filters: ["lim_zac"]
    */
    function epoclim(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpoclimDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpoclimDto>;
    /**
    * Klient políčko Epocpru
    * FieldOptions
    * itemTemplate: "{pred_urc_txt:trim:encode}"
    * helperColumns: ["pred_urc_txt"]
    *
    * DataReader 
    * keys: ["pred_urc"]
    * columns: ["pred_urc","pred_urc_txt"]
    * filters: ["pred_urc"]
    */
    function epocpru(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpocpruDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpocpruDto>;
    /**
    * Klient políčko Epocspo
    * FieldOptions
    * itemTemplate: "{s_po_txt:trim:encode}"
    * helperColumns: ["s_po_txt"]
    *
    * DataReader 
    * keys: ["s_po"]
    * columns: ["s_po","s_po_txt"]
    * filters: ["s_po"]
    */
    function epocspo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpocspoDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpocspoDto>;
    /**
    * Klient políčko Epocsso
    * FieldOptions
    * itemTemplate: "{s_sou_txt:trim:encode}"
    * helperColumns: ["s_sou_txt"]
    *
    * DataReader 
    * keys: ["s_sou"]
    * columns: ["s_sou","s_sou_txt"]
    * filters: ["s_sou"]
    */
    function epocsso(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpocssoDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpocssoDto>;
    /**
    * Klient políčko Epoctda
    * FieldOptions
    * itemTemplate: "{typ_datum_txt:trim:encode}"
    * helperColumns: ["typ_datum_txt"]
    *
    * DataReader 
    * keys: ["typ_datum"]
    * columns: ["typ_datum","typ_datum_txt"]
    * filters: ["typ_datum"]
    */
    function epoctda(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpoctdaDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpoctdaDto>;
    /**
    * Klient políčko eposesu
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixs_esu"]
    * columns: ["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"]
    * filters: ["ixs_pri","cis_por","ixs_esu","ktg_typ"]
    */
    function eposesu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxsesuVDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxsesuVDto>;
    /**
    * Klient políčko epossop
    * FieldOptions
    * itemTemplate: "{soutez_po_txt:trim:encode}"
    * helperColumns: ["soutez_po_txt"]
    *
    * DataReader 
    * keys: ["soutez_po"]
    * columns: ["soutez_po", "typ_po_txt","soutez_po_txt","pred_urc_txt","lim_zac_txt","typ_po","lim_zac","pred_urc"]
    * filters: ["soutez_po","soutez_po_txt","typ_po","pred_urc","lim_zac"]
    */
    function epossop(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Epo.Interface.GEpossopDto>): GSelectBoxOptions<Gordic.Epo.Interface.GEpossopDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klient políčko eposesu
    */
    function Eposesu(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GXxxsesuVDto>;
    /**
    * Klient políčko epossop
    */
    function epossop(): Selectors.DefaultSelectorOptions<Gordic.Epo.Interface.GEpossopDto>;}

//#endregion

