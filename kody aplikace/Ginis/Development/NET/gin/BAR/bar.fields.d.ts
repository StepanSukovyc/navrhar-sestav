declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - Balancni verze
    * keys : ["verze_c","verze_k"]
    * columns: ["verze_c", "verze_k"]
    * filters: [""]
    */
    class BarsverBar extends Base<Gordic.Bar.Interface.GBarsverDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Typ ceny
    * keys : ["ico"]
    * columns: ["ico", "nazev", "aktivita", "dor2", "org", "typ_org"]
    * filters: ["nazev","dor2","org","aktivita","typ_org"]
    */
    class EkosrarBAR extends Base<Gordic.Bar.Interface.GEkosrarDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - Balancni verze
    * FieldOptions
    * itemTemplate: "{verze_c}-{verze_k}"
    * helperColumns: ["verze_c", "verze_k"]
    *
    * DataReader 
    * keys: ["verze_c","verze_k"]
    * columns: ["verze_c", "verze_k"]
    * filters: [""]
    */
    function barsverBar(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Bar.Interface.GBarsverDto>): GSelectBoxOptions<Gordic.Bar.Interface.GBarsverDto>;
    /**
    * Typ ceny
    * FieldOptions
    * itemTemplate: "{ico} - {nazev}"
    * helperColumns: ["ico", "nazev"]
    *
    * DataReader 
    * keys: ["ico"]
    * columns: ["ico", "nazev", "aktivita", "dor2", "org", "typ_org"]
    * filters: ["nazev","dor2","org","aktivita","typ_org"]
    */
    function ekosrarBAR(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Bar.Interface.GEkosrarDto>): GSelectBoxOptions<Gordic.Bar.Interface.GEkosrarDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská část AL - Balancni verze
    */
    function barsverBar(): Selectors.DefaultSelectorOptions<Gordic.Bar.Interface.GBarsverDto>;
    /**
    * Typ ceny
    */
    function ekosrarBAR(): Selectors.DefaultSelectorOptions<Gordic.Bar.Interface.GEkosrarDto>;}
