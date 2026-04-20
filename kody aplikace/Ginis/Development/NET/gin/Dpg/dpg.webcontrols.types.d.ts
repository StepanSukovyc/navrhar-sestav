/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       dpg.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Dpg.WebControls\Gordic.Dpg.WebControls.csproj
*    created     2026-02-16 14:34:08
*    files       dpg.webcontrols.fields.d.ts
*                Gin\Dpg\Detail\DetailBalicku.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Dpg.WebControls\dpg.webcontrols.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * 
    *     Klientská část AL - Dostupne úlohy programové fáze pro Autenticator
    *     
    * keys: ["faze"]
    * columns: ["faze", "level_exp", "popis"]
    * filters: ["faze","level_exp"]
    */
    class GDpgReaderAutenticator extends Base<Gordic.Dpg.Interface.GDpgReaderAutenticatorDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GDpgReaderAutenticatorDto = Gordic.Dpg.Interface.GDpgReaderAutenticatorDto;
    type GDpgReaderAutenticatorDtoNames = Gordic.Dpg.Interface.GDpgReaderAutenticatorDtoNames;
    type GDpgReaderAutenticatorDtoFragments = Gordic.Dpg.Interface.GDpgReaderAutenticatorDtoFragments;
    type GDpgReaderAutenticatorDtoTypes = Gordic.Dpg.Interface.GDpgReaderAutenticatorDtoTypes;
    type GDpgReaderAutenticatorDtoTypeLengths = Gordic.Dpg.Interface.GDpgReaderAutenticatorDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Dostupne programove faze
    *     
    * keys: "faze"
    * columns: ["faze", "faze_txt"]
    * filters: ["faze","faze_txt"]
    */
    class GDpgReaderFaze extends Base<Gordic.Dpg.Interface.GDpgReaderFazeDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GDpgReaderFazeDto = Gordic.Dpg.Interface.GDpgReaderFazeDto;
    type GDpgReaderFazeDtoNames = Gordic.Dpg.Interface.GDpgReaderFazeDtoNames;
    type GDpgReaderFazeDtoFragments = Gordic.Dpg.Interface.GDpgReaderFazeDtoFragments;
    type GDpgReaderFazeDtoTypes = Gordic.Dpg.Interface.GDpgReaderFazeDtoTypes;
    type GDpgReaderFazeDtoTypeLengths = Gordic.Dpg.Interface.GDpgReaderFazeDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Dostupne licence
    *     
    * keys: ["lic_fyz"]
    * columns: ["lic_fyz", "nazev", "verze_db", "sub_verze_db", "revize_adz"]
    * filters: ["lic_fyz","nazev","verze_db","sub_verze_db","revize_adz"]
    */
    class DostupneLicence extends Base<Gordic.Dpg.Interface.GReaderDostupneLicenceDto>
    {
        constructor(options?: IGReaderBase);
    }
    type DostupneLicenceDto = Gordic.Dpg.Interface.GReaderDostupneLicenceDto;
    type DostupneLicenceDtoNames = Gordic.Dpg.Interface.GReaderDostupneLicenceDtoNames;
    type DostupneLicenceDtoFragments = Gordic.Dpg.Interface.GReaderDostupneLicenceDtoFragments;
    type DostupneLicenceDtoTypes = Gordic.Dpg.Interface.GReaderDostupneLicenceDtoTypes;
    type DostupneLicenceDtoTypeLengths = Gordic.Dpg.Interface.GReaderDostupneLicenceDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Dostupne licence
    *     
    * keys: ["lic_fyz"]
    * columns: ["lic_fyz","nazev","verze_db","sub_verze_db","revize_adz"]
    * filters: ["lic_fyz","nazev","verze_db","sub_verze_db","revize_adz"]
    */
    class DostupneLicenceIxsFun extends Base<Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDto>
    {
        constructor(options?: IGReaderBase);
    }
    type DostupneLicenceIxsFunDto = Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDto;
    type DostupneLicenceIxsFunDtoNames = Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDtoNames;
    type DostupneLicenceIxsFunDtoFragments = Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDtoFragments;
    type DostupneLicenceIxsFunDtoTypes = Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDtoTypes;
    type DostupneLicenceIxsFunDtoTypeLengths = Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Dostupne verze
    *     
    * keys: ["verze_db"]
    * columns: ["verze_db","sub_verze_db","revize_adz"]
    * filters: ["verze_db","sub_verze_db","revize_adz"]
    */
    class DostupneVerze extends Base<Gordic.Dpg.Interface.GReaderDostupneVerzeDto>
    {
        constructor(options?: IGReaderBase);
    }
    type DostupneVerzeDto = Gordic.Dpg.Interface.GReaderDostupneVerzeDto;
    type DostupneVerzeDtoNames = Gordic.Dpg.Interface.GReaderDostupneVerzeDtoNames;
    type DostupneVerzeDtoFragments = Gordic.Dpg.Interface.GReaderDostupneVerzeDtoFragments;
    type DostupneVerzeDtoTypes = Gordic.Dpg.Interface.GReaderDostupneVerzeDtoTypes;
    type DostupneVerzeDtoTypeLengths = Gordic.Dpg.Interface.GReaderDostupneVerzeDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Dostupne verze pro revize z tabulky gdesrev
    *     
    * keys: ["verze_db"]
    * columns: ["verze_db"]
    * filters: ["verze_db"]
    */
    class DostupneVerzeGdesrev extends Base<Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDto>
    {
        constructor(options?: IGReaderBase);
    }
    type DostupneVerzeGdesrevDto = Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDto;
    type DostupneVerzeGdesrevDtoNames = Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDtoNames;
    type DostupneVerzeGdesrevDtoFragments = Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDtoFragments;
    type DostupneVerzeGdesrevDtoTypes = Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDtoTypes;
    type DostupneVerzeGdesrevDtoTypeLengths = Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Dostupne verze pro revize
    *     
    * keys: ["verze_db"]
    * columns: ["verze_db","sub_verze_db"]
    * filters: ["verze_db","sub_verze_db"]
    */
    class DostupneVerzeRevize extends Base<Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDto>
    {
        constructor(options?: IGReaderBase);
    }
    type DostupneVerzeRevizeDto = Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDto;
    type DostupneVerzeRevizeDtoNames = Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDtoNames;
    type DostupneVerzeRevizeDtoFragments = Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDtoFragments;
    type DostupneVerzeRevizeDtoTypes = Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDtoTypes;
    type DostupneVerzeRevizeDtoTypeLengths = Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * 
    *     Klientská část AL - Dostupne úlohy programové fáze pro Autenticator
    *     
    * FieldOptions
    * itemTemplate: "{faze} | {popis}"
    * helperColumns: ["faze", "level_exp", "popis"]
    *
    * DataReader
    * keys: ["faze"]
    * columns: ["faze", "level_exp", "popis"]
    * filters: ["faze","level_exp"]
    */
    function gDpgReaderAutenticator(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Dpg.Interface.GDpgReaderAutenticatorDto>): GSelectBoxOptions<Gordic.Dpg.Interface.GDpgReaderAutenticatorDto>;
    /**
    * 
    *     Klientská část AL - Dostupne programove faze
    *     
    * FieldOptions
    * itemTemplate: "{faze} | {faze_txt}"
    * helperColumns: ["faze", "faze_txt"]
    *
    * DataReader
    * keys: "faze"
    * columns: ["faze", "faze_txt"]
    * filters: ["faze","faze_txt"]
    */
    function gDpgReaderFaze(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Dpg.Interface.GDpgReaderFazeDto>): GSelectBoxOptions<Gordic.Dpg.Interface.GDpgReaderFazeDto>;
    /**
    * 
    *     Klientská část AL - Dostupne licence
    *     
    * FieldOptions
    * itemTemplate: "{lic_fyz} | {nazev}"
    * helperColumns: ["lic_fyz", "nazev"]
    *
    * DataReader
    * keys: ["lic_fyz"]
    * columns: ["lic_fyz", "nazev", "verze_db", "sub_verze_db", "revize_adz"]
    * filters: ["lic_fyz","nazev","verze_db","sub_verze_db","revize_adz"]
    */
    function dostupneLicence(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Dpg.Interface.GReaderDostupneLicenceDto>): GSelectBoxOptions<Gordic.Dpg.Interface.GReaderDostupneLicenceDto>;
    /**
    * 
    *     Klientská část AL - Dostupne licence
    *     
    * FieldOptions
    * itemTemplate: "{lic_fyz} | {nazev}"
    * helperColumns: ["lic_fyz", "nazev"]
    *
    * DataReader
    * keys: ["lic_fyz"]
    * columns: ["lic_fyz","nazev","verze_db","sub_verze_db","revize_adz"]
    * filters: ["lic_fyz","nazev","verze_db","sub_verze_db","revize_adz"]
    */
    function dostupneLicenceIxsFun(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDto>): GSelectBoxOptions<Gordic.Dpg.Interface.GReaderDostupneLicenceIxsFunDto>;
    /**
    * 
    *     Klientská část AL - Dostupne verze
    *     
    * FieldOptions
    * itemTemplate: "{verze_db}.{sub_verze_db}.{revize_adz}"
    * helperColumns: ["verze_db", "sub_verze_db", "revize_adz"]
    *
    * DataReader
    * keys: ["verze_db"]
    * columns: ["verze_db","sub_verze_db","revize_adz"]
    * filters: ["verze_db","sub_verze_db","revize_adz"]
    */
    function dostupneVerze(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Dpg.Interface.GReaderDostupneVerzeDto>): GSelectBoxOptions<Gordic.Dpg.Interface.GReaderDostupneVerzeDto>;
    /**
    * 
    *     Klientská část AL - Dostupne verze pro revize z tabulky gdesrev
    *     
    * FieldOptions
    * itemTemplate: "{verze_db}"
    * helperColumns: ["verze_db"]
    *
    * DataReader
    * keys: ["verze_db"]
    * columns: ["verze_db"]
    * filters: ["verze_db"]
    */
    function dostupneVerzeGdesrev(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDto>): GSelectBoxOptions<Gordic.Dpg.Interface.GReaderDostupneVerzeGdesrevDto>;
    /**
    * 
    *     Klientská část AL - Dostupne verze pro revize
    *     
    * FieldOptions
    * itemTemplate: "{verze_db}.{sub_verze_db}"
    * helperColumns: ["verze_db", "sub_verze_db", "verze_db_txt"]
    *
    * DataReader
    * keys: ["verze_db"]
    * columns: ["verze_db","sub_verze_db"]
    * filters: ["verze_db","sub_verze_db"]
    */
    function dostupneVerzeRevize(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDto>): GSelectBoxOptions<Gordic.Dpg.Interface.GReaderDostupneVerzeRevizeDto>;}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Dpg.WebControls\Gin\Dpg\Detail\DetailBalicku.d.ts 

declare namespace Gordic.Adt.WebControls {
    /**
     * Dialog detailu balíčku
     */
    class DetailBalicku extends GContentBase {
        /**
         * onContentReady
         */
        onContentReady(): void;
        /**
         * init content
         */
        private init();
        /**
         * nastavit titulek dialogu
         */
        private setTitle();
        /**
         * vytvořit menu
         */
        private createMenuBar();
    }
}

//#endregion

