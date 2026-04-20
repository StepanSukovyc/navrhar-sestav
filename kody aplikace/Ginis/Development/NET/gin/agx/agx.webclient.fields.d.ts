declare namespace Gordic.Data.Readers {
    /**
    * Klientská část pro číselník typů datových schránek
    * keys : ["dbstate"]
    * columns: ["dbstate","dbstate_txt","k_v","k_s"]
    * filters: ["dbstate"]
    */
    class Gexcdbs extends Base<Gordic.Gex.Interface.GGexcdbsDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část pro číselník typů datových schránek
    * keys : ["dbtype"]
    * columns: ["dbtype","dbtype_txt"]
    * filters: ["dbtype"]
    */
    class Gexcdbt extends Base<Gordic.Gex.Interface.GGexcdbtDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část pro číselník typů datových schránek
    * FieldOptions
    * itemTemplate: "{dbstate_txt}"
    * helperColumns: ["dbstate_txt"]
    *
    * DataReader 
    * keys: ["dbstate"]
    * columns: ["dbstate","dbstate_txt","k_v","k_s"]
    * filters: ["dbstate"]
    */
    function gexcdbs(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Gex.Interface.GGexcdbsDto>): GSelectBoxOptions<Gordic.Gex.Interface.GGexcdbsDto>;
    /**
    * Klientská část pro číselník typů datových schránek
    * FieldOptions
    * itemTemplate: "{dbtype_txt}"
    * helperColumns: ["dbtype_txt"]
    *
    * DataReader 
    * keys: ["dbtype"]
    * columns: ["dbtype","dbtype_txt"]
    * filters: ["dbtype"]
    */
    function gexcdbt(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Gex.Interface.GGexcdbtDto>): GSelectBoxOptions<Gordic.Gex.Interface.GGexcdbtDto>;}
