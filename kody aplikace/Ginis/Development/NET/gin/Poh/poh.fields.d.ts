declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL
    * keys : ["id"]
    * columns: ["id","klic","text"]
    * filters: [""]
    */
    class GPohReaderSaldotDuvodZamitnuti extends Base<Gordic.Poh.Interface.GSaldotDuvodZamitnutiDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["zkratka"]
    * columns: ["id","zkratka","text"]
    * filters: [""]
    */
    class GPohReaderSaldotKontrola extends Base<Gordic.Poh.Interface.GSaldotKontrolaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["zkratka"]
    * columns: ["id","zkratka","text"]
    * filters: [""]
    */
    class GPohReaderSaldotKontrola2 extends Base<Gordic.Poh.Interface.GSaldotKontrolaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["id"]
    * columns: ["id","text"]
    * filters: [""]
    */
    class GPohReaderSaldotSzr extends Base<Gordic.Poh.Interface.GSaldotSzrDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["ixs_typ"]
    * columns: ["ixs_typ","nazev"]
    * filters: [""]
    */
    class GPohReaderTypyDokumentu extends Base<Gordic.Poh.Interface.GPohTypyDokumentuDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["ixp"]
    * columns: ["ixp","typ"]
    * filters: [""]
    */
    class GPohReaderTypZasilky extends Base<Gordic.Poh.Interface.GPohZasilkaDTO>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["ixp_fmr"]
    * columns: ["ixp_fmr","nazev"]
    * filters: [""]
    */
    class GPohReaderVyberFormulare extends Base<Gordic.Poh.Interface.GPohVyberFormulareDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["ixs_fun"]
    * columns: ["ixs_fun","jmeno"]
    * filters: [""]
    */
    class GPohReaderVyberNovaFunkce extends Base<Gordic.Poh.Interface.GSaldotVyberNovaFunkceDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["ixs_fun"]
    * columns: ["ixs_fun","jmeno"]
    * filters: [""]
    */
    class GPohReaderVyberOsoby extends Base<Gordic.Poh.Interface.GPohVyberOsobyDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["id"]
    * columns: ["id","text"]
    * filters: [""]
    */
    class GPohReaderVyberPodminka extends Base<Gordic.Poh.Interface.GPohVyberPodminkaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["kod_stav"]
    * columns: ["kod_stav","nazev"]
    * filters: [""]
    */
    class GPohReaderVyberStavFormulare extends Base<Gordic.Poh.Interface.GPohVyberStavFormulareDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["zp_vyuz_bud"]
    * columns: ["zp_vyuz_bud","nazev","zkratka"]
    * filters: [""]
    */
    class GPohReaderZpusobVyuzitiNem extends Base<Gordic.Poh.Interface.GPohZpVyuzNemDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL
    * keys : ["DAN_SKUP"]
    * columns: ["DAN_SKUP","DAN_SKUP_TXT","K_V","K_S","K_XML"]
    * filters: [""]
    */
    class PostTest extends Base<Gordic.Poh.Interface.GPostTestDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{text}"
    * helperColumns: ["text"]
    *
    * DataReader 
    * keys: ["id"]
    * columns: ["id","klic","text"]
    * filters: [""]
    */
    function gPohReaderSaldotDuvodZamitnuti(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GSaldotDuvodZamitnutiDto>): GSelectBoxOptions<Gordic.Poh.Interface.GSaldotDuvodZamitnutiDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{text}"
    * helperColumns: ["text"]
    *
    * DataReader 
    * keys: ["zkratka"]
    * columns: ["id","zkratka","text"]
    * filters: [""]
    */
    function gPohReaderSaldotKontrola(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GSaldotKontrolaDto>): GSelectBoxOptions<Gordic.Poh.Interface.GSaldotKontrolaDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{text}"
    * helperColumns: ["text"]
    *
    * DataReader 
    * keys: ["zkratka"]
    * columns: ["id","zkratka","text"]
    * filters: [""]
    */
    function gPohReaderSaldotKontrola2(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GSaldotKontrolaDto>): GSelectBoxOptions<Gordic.Poh.Interface.GSaldotKontrolaDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{text}"
    * helperColumns: ["text"]
    *
    * DataReader 
    * keys: ["id"]
    * columns: ["id","text"]
    * filters: [""]
    */
    function gPohReaderSaldotSzr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GSaldotSzrDto>): GSelectBoxOptions<Gordic.Poh.Interface.GSaldotSzrDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixs_typ"]
    * columns: ["ixs_typ","nazev"]
    * filters: [""]
    */
    function gPohReaderTypyDokumentu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPohTypyDokumentuDto>): GSelectBoxOptions<Gordic.Poh.Interface.GPohTypyDokumentuDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ}"
    * helperColumns: ["typ"]
    *
    * DataReader 
    * keys: ["ixp"]
    * columns: ["ixp","typ"]
    * filters: [""]
    */
    function gPohReaderTypZasilky(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPohZasilkaDTO>): GSelectBoxOptions<Gordic.Poh.Interface.GPohZasilkaDTO>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixp_fmr"]
    * columns: ["ixp_fmr","nazev"]
    * filters: [""]
    */
    function gPohReaderVyberFormulare(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPohVyberFormulareDto>): GSelectBoxOptions<Gordic.Poh.Interface.GPohVyberFormulareDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{jmeno}"
    * helperColumns: ["jmeno"]
    *
    * DataReader 
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","jmeno"]
    * filters: [""]
    */
    function gPohReaderVyberNovaFunkce(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GSaldotVyberNovaFunkceDto>): GSelectBoxOptions<Gordic.Poh.Interface.GSaldotVyberNovaFunkceDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{jmeno}"
    * helperColumns: ["jmeno"]
    *
    * DataReader 
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","jmeno"]
    * filters: [""]
    */
    function gPohReaderVyberOsoby(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPohVyberOsobyDto>): GSelectBoxOptions<Gordic.Poh.Interface.GPohVyberOsobyDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{text}"
    * helperColumns: ["text"]
    *
    * DataReader 
    * keys: ["id"]
    * columns: ["id","text"]
    * filters: [""]
    */
    function gPohReaderVyberPodminka(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPohVyberPodminkaDto>): GSelectBoxOptions<Gordic.Poh.Interface.GPohVyberPodminkaDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["kod_stav"]
    * columns: ["kod_stav","nazev"]
    * filters: [""]
    */
    function gPohReaderVyberStavFormulare(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPohVyberStavFormulareDto>): GSelectBoxOptions<Gordic.Poh.Interface.GPohVyberStavFormulareDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["zp_vyuz_bud"]
    * columns: ["zp_vyuz_bud","nazev","zkratka"]
    * filters: [""]
    */
    function gPohReaderZpusobVyuzitiNem(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPohZpVyuzNemDto>): GSelectBoxOptions<Gordic.Poh.Interface.GPohZpVyuzNemDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{?}"
    * helperColumns: ["?"]
    *
    * DataReader 
    * keys: ["DAN_SKUP"]
    * columns: ["DAN_SKUP","DAN_SKUP_TXT","K_V","K_S","K_XML"]
    * filters: [""]
    */
    function postTest(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Poh.Interface.GPostTestDto>): GSelectBoxOptions<Gordic.Poh.Interface.GPostTestDto>;}
