declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL
    * keys : ["ixs_vsk"]
    * columns: ["ixs_vsk","ico","nazev","dat_od","dat_do","spis_znak","spis_znak_short","ixs_vsk_nad","ixs_skr","urceni_spis_z","zpus_prid_cj","format_cj","priz_trvskar","ixs_spn_od","ixs_spn_do","ixs_vsk_prev","ixs_vsk_next","poznamka","aktivita"]
    * filters: ["ixs_vsk","aktivita","typ","ixs_vsk_nad"]
    */
    class SslGinsvsk extends Base<Gordic.Ssl.Interface.GGinsvskExtDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b><br /><span><i>jres:32195014: {ixs_vsk}</i> | <i>jres:32195015: {spis_znak}</i></span>"
    * helperColumns: ["nazev", "spis_znak", "ixs_vsk"]
    *
    * DataReader 
    * keys: ["ixs_vsk"]
    * columns: ["ixs_vsk","ico","nazev","dat_od","dat_do","spis_znak","spis_znak_short","ixs_vsk_nad","ixs_skr","urceni_spis_z","zpus_prid_cj","format_cj","priz_trvskar","ixs_spn_od","ixs_spn_do","ixs_vsk_prev","ixs_vsk_next","poznamka","aktivita"]
    * filters: ["ixs_vsk","aktivita","typ","ixs_vsk_nad"]
    */
    function sslGinsvsk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ssl.Interface.GGinsvskExtDto>): GSelectBoxOptions<Gordic.Ssl.Interface.GGinsvskExtDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská část AL
    */
    function sslGinsvsk(): Selectors.DefaultSelectorOptions<Gordic.Ssl.Interface.GGinsvskExtDto>;}
