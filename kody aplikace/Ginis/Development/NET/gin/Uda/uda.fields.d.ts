declare namespace Gordic.Data.Readers {
    /**
    * GReaderGUdesszud
    * keys : ["ixs_zud"]
    * columns: ["ixs_zud","nazev"]
    * filters: ["aktivita","dat_zmena","zmenu_prov"]
    */
    class Udeszud extends Base<Gordic.Uda.Interface.GUdeszudDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Reader pro stav zveřejnění CUET
    * keys : ["s_zverej"]
    * columns: ["s_zverej", "s_zverej_txt", "k_v", "k_s"]
    * filters: ["s_zverej"]
    */
    class Udecszv extends Base<Gordic.Uda.Interface.GUdecszvDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * GReaderGUdesszud
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixs_zud"]
    * columns: ["ixs_zud","nazev"]
    * filters: ["aktivita","dat_zmena","zmenu_prov"]
    */
    function udeszud(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Uda.Interface.GUdeszudDto>): GSelectBoxOptions<Gordic.Uda.Interface.GUdeszudDto>;
    /**
    * Reader pro stav zveřejnění CUET
    * FieldOptions
    * itemTemplate: "{s_zverej_txt}"
    * helperColumns: ["s_zverej_txt"]
    *
    * DataReader 
    * keys: ["s_zverej"]
    * columns: ["s_zverej", "s_zverej_txt", "k_v", "k_s"]
    * filters: ["s_zverej"]
    */
    function udecszv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Uda.Interface.GUdecszvDto>): GSelectBoxOptions<Gordic.Uda.Interface.GUdecszvDto>;}
