declare namespace Gordic.Data.Readers {
    /**
    * Stav smlouvy
    * keys : ['sml_stav']
    * columns: ["sml_stav", "sml_stav_txt", "k_v"]
    * filters: ['sml_stav','sml_stav_txt']
    */
    class Smlcstauka extends Base<Gordic.Uka.Interface.GSmlcstaDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Stav smlouvy
    * FieldOptions
    * itemTemplate: "{sml_stav_txt}"
    * helperColumns: ["sml_stav_txt"]
    *
    * DataReader 
    * keys: ['sml_stav']
    * columns: ["sml_stav", "sml_stav_txt", "k_v"]
    * filters: ['sml_stav','sml_stav_txt']
    */
    function smlcstauka(): GSelectBoxOptions<Gordic.Uka.Interface.GSmlcstaDto>;}
