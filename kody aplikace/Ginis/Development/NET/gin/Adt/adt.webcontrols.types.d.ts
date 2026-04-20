/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       adt.webcontrols.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Adt.WebControls\Gordic.Adt.WebControls.csproj
*    created     2026-02-16 14:33:43
*    files       adt.webcontrols.fields.d.ts
*                Gin\Adt\GAdtDialogs.d.ts
*                Gin\Adt\Grid\SeznamBalicku.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Adt.WebControls\adt.webcontrols.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - Agenda
    * keys : ["typ_ag"]
    * columns: ["typ_ag","typ_ag_txt"]
    * filters: ["typ_ag","typ_ag_txt"]
    */
    class GAdtReaderAgenda extends Base<Gordic.Adt.Interface.GAdtReaderAgendaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Agendový tým
    * keys : ["agt"]
    * columns: ["agt","agt_txt"]
    * filters: ["agt","agt_txt"]
    */
    class GAdtReaderAgt extends Base<Gordic.Adt.Interface.GAdtReaderAgtDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne úlohy programové fáze pro Autenticator
    * keys : ["faze"]
    * columns: ["faze","level_exp","popis"]
    * filters: ["faze","level_exp"]
    */
    class GAdtReaderAutenticator extends Base<Gordic.Adt.Interface.GAdtReaderAutenticatorDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Baliky licenci
    * keys : ["ixs_lip"]
    * columns: ["nazev"]
    * filters: ["ixs_lip","nazev"]
    */
    class GAdtReaderBalikyLicenci extends Base<Gordic.Adt.Interface.GGdeslipDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne polozky noveho ceniku
    * keys : ["ixp_ccm","nazev"]
    * columns: ["ixp_ccm","nazev"]
    * filters: ["nazev"]
    */
    class GAdtReaderCenik extends Base<Gordic.Adt.Interface.GAdtReaderCenikDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne verze pro doporučene revize
    * keys : ["pol", "ppol"]
    * columns: ["pol", "ppol"]
    * filters: ["pol","ppol"]
    */
    class GAdtReaderCenikovePolozky extends Base<Gordic.Adt.Interface.GAdtReaderCenikovePolozkyDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Cloud
    * keys : ["provoz_cloud"]
    * columns: ["provoz_cloud_txt"]
    * filters: ["provoz_cloud","provoz_cloud_txt"]
    */
    class GAdtReaderCloud extends Base<Gordic.Adt.Interface.GAdtReaderCloudDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dalsi Soubory
    * keys : ["ixs_dif"]
    * columns: ["ixs_dif"/"nazev"]
    * filters: ["ixs_dif","nazev"]
    */
    class GAdtReaderDalsiSoubory extends Base<Gordic.Adt.Interface.GGdesdifDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Distributor
    * keys : ["distributor"]
    * columns: ["nazev_distributor"]
    * filters: ["distributor","nazev"]
    */
    class GAdtReaderDistributor extends Base<Gordic.Adt.Interface.GAdtReaderDistributorDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne verze pro doporučene revize
    * keys : ["verze_db"]
    * columns: ["verze_db", "sub_verze_db"]
    * filters: ["verze_db","sub_verze_db"]
    */
    class GAdtReaderDostupneVerzeRevize extends Base<Gordic.Adt.Interface.GAdtReaderDostupneVerzeRevizeDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne faze pro statistiku fazi
    * keys : "faze"
    * columns: ["faze","faze_txt","submodel"]
    * filters: ["faze","faze_txt"]
    */
    class GAdtReaderFaze extends Base<Gordic.Adt.Interface.GAdtReaderFazeDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne GDZ baliky
    * keys : "ixs_gdt"
    * columns: ["ixs_gdt", "popis"]
    * filters: ["ixs_gdt","nazev","popis"]
    */
    class GAdtReaderGDZBaliky extends Base<Gordic.Adt.Interface.GAdtReaderGDZBalikyDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupna ICA pro administraci
    * keys : ["ico_adm"]
    * columns: ["ico_adm", "nazev"]
    * filters: ["ico_adm","nazev"]
    */
    class GAdtReaderIcoAdministrace extends Base<Gordic.Adt.Interface.GAdtReaderIcoAdministraceDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupna ICA pro fakturaci
    * keys : ["ico_fakt"]
    * columns: ["ico_fakt", "nazev"]
    * filters: ["ico_fakt","nazev"]
    */
    class GAdtReaderIcoFakturace extends Base<Gordic.Adt.Interface.GAdtReaderIcoFakturaceDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Vlastni licence databazi
    * keys : ["lic_fyz"]
    * columns: ["lic_fyz","nazev"]
    * filters: ["lic_fyz","nazev"]
    */
    class GAdtReaderLicenceDatabazi extends Base<Gordic.Adt.Interface.GAdtReaderLicenceDatabaziDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - gdesobc
    * keys : ["obchodnik","distributor"]
    * columns: ["nazev"]
    * filters: ["obchodnik","distributor","nazev"]
    */
    class GAdtReaderObc extends Base<Gordic.Adt.Interface.GAdtReaderObcDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne ORJ
    * keys : "orj"
    * columns: ["orj", "nazev"]
    * filters: ["orj","nazev"]
    */
    class GAdtReaderORJ extends Base<Gordic.Adt.Interface.GAdtReaderORJDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne cenikove polozky
    * keys : "pol"
    * columns: ["pol","popis_pol"]
    * filters: ["pol","popis_pol"]
    */
    class GAdtReaderPol extends Base<Gordic.Adt.Interface.GAdtReaderPolDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne polozky bez licencnich polatku pro danou licenci
    * keys : "pol"
    * columns: ["pol", "popis_pol"]
    * filters: ["pol","popis_pol"]
    */
    class GAdtReaderPolBezLicPopl extends Base<Gordic.Adt.Interface.GAdtReaderPolBezLicPoplDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne cenikove podpolozky
    * keys : "ppol"
    * columns: ["ppol","popis"]
    * filters: ["ppol","popis"]
    */
    class GAdtReaderPpol extends Base<Gordic.Adt.Interface.GAdtReaderPpolDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne Produktove listy
    * keys : ["id_listu"]
    * columns: ["id_listu","nazev"]
    * filters: ["id_listu","nazev"]
    */
    class GAdtReaderProdListy extends Base<Gordic.Adt.Interface.GGdesprlDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne nezakazane Revize
    * keys : ["revize"]
    * columns: ["revize"]
    * filters: ["revize","faze","verze"]
    */
    class GAdtReaderRevize extends Base<Gordic.Adt.Interface.GAdtReaderRevizeDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne Role registru licenci
    * keys : ["role_fun_lip"]
    * columns: ["role_fun_lip_txt"]
    * filters: ["role_fun_lip","role_fun_lip_txt"]
    */
    class GAdtReaderRoleRegLic extends Base<Gordic.Adt.Interface.GAdtReaderRoleRegLicDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Vlastni skupiny databazi
    * keys : ["ixs_sdb"]
    * columns: ["ixs_sdb", "nazev"]
    * filters: ["ixs_sdb","nazev"]
    */
    class GAdtReaderSkupinyDatabazi extends Base<Gordic.Adt.Interface.GAdtReaderSkupinyDatabaziDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Stav revize
    * keys : ["stav_revize"]
    * columns: ["stav_revize_txt"]
    * filters: ["stav_revize","stav_revize_txt"]
    */
    class GAdtReaderStavRevize extends Base<Gordic.Adt.Interface.GAdtReaderStavRevizeDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Subsystém
    * keys : ["subsyst"]
    * columns: ["subsyst","subsyst_txt"]
    * filters: ["subsyst","subsyst_txt"]
    */
    class GAdtReaderSubsystem extends Base<Gordic.Adt.Interface.GAdtReaderSubsystemDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Typ Fáze
    * keys : ["faze_typ"]
    * columns: ["faze_typ","faze_typ_txt"]
    * filters: ["faze_typ","faze_typ_txt"]
    */
    class GAdtReaderTypFaze extends Base<Gordic.Adt.Interface.GAdtReaderTypFazeDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Typ implementace
    * keys : ["tyi"]
    * columns: ["tyi","tyi_txt"]
    * filters: ["tyi","tyi_txt"]
    */
    class GAdtReaderTypImpl extends Base<Gordic.Adt.Interface.GAdtReaderTiyDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne verze databaze
    * keys : ["verze_db"]
    * columns: ["verze_db"]
    * filters: ["verze_db"]
    */
    class GAdtReaderVerzeDB extends Base<Gordic.Adt.Interface.GAdtReaderVerzeDBDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Dostupne verze GDZ baliku
    * keys : ["verze_db"]
    * columns: ["verze_db", "sub_verze_db", "revize_adz"]
    * filters: ["verze_db","sub_verze_db","revize_adz"]
    */
    class GAdtReaderVerzeGDZBaliku extends Base<Gordic.Adt.Interface.GReaderVerzeGDZBalikuDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Vlastni licence DB
    * keys : "lic"
    * columns: ["lic", "nazev"]
    * filters: ["lic","nazev"]
    */
    class GAdtReaderVlastniLicDB extends Base<Gordic.Adt.Interface.GAdtReaderVlastniLicDBDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Vlastni licence rad PID
    * keys : "lic"
    * columns: ["lic", "nazev"]
    * filters: ["lic","nazev"]
    */
    class GAdtReaderVlastniLicRad extends Base<Gordic.Adt.Interface.GAdtReaderVlastniLicRadDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - pole ZAK
    * keys : ["zak"]
    * columns: ["zak","zak_txt"]
    * filters: ["zak","zak_txt"]
    */
    class GAdtReaderZAK extends Base<Gordic.Adt.Interface.GAdtReaderZAKDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - Agenda
    * FieldOptions
    * itemTemplate: "{typ_ag} | {typ_ag_txt}"
    * helperColumns: ["typ_ag", "typ_ag_txt"]
    *
    * DataReader 
    * keys: ["typ_ag"]
    * columns: ["typ_ag","typ_ag_txt"]
    * filters: ["typ_ag","typ_ag_txt"]
    */
    function gAdtReaderAgenda(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderAgendaDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderAgendaDto>;
    /**
    * Klientská část AL - Agendový tým
    * FieldOptions
    * itemTemplate: "{agt} | {agt_txt}"
    * helperColumns: ["agt", "agt_txt"]
    *
    * DataReader 
    * keys: ["agt"]
    * columns: ["agt","agt_txt"]
    * filters: ["agt","agt_txt"]
    */
    function gAdtReaderAgt(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderAgtDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderAgtDto>;
    /**
    * Klientská část AL - Dostupne úlohy programové fáze pro Autenticator
    * FieldOptions
    * itemTemplate: "{faze} | {popis}"
    * helperColumns: ["faze", "level_exp", "popis"]
    *
    * DataReader 
    * keys: ["faze"]
    * columns: ["faze","level_exp","popis"]
    * filters: ["faze","level_exp"]
    */
    function gAdtReaderAutenticator(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderAutenticatorDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderAutenticatorDto>;
    /**
    * Klientská část AL - Baliky licenci
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixs_lip"]
    * columns: ["nazev"]
    * filters: ["ixs_lip","nazev"]
    */
    function gAdtReaderBalikyLicenci(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GGdeslipDto>): GSelectBoxOptions<Gordic.Adt.Interface.GGdeslipDto>;
    /**
    * Klientská část AL - Dostupne polozky noveho ceniku
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixp_ccm","nazev"]
    * columns: ["ixp_ccm","nazev"]
    * filters: ["nazev"]
    */
    function gAdtReaderCenik(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderCenikDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderCenikDto>;
    /**
    * Klientská část AL - Dostupne verze pro doporučene revize
    * FieldOptions
    * itemTemplate: "{pol} | {ppol}"
    * helperColumns: ["pol", "ppol"]
    *
    * DataReader 
    * keys: ["pol", "ppol"]
    * columns: ["pol", "ppol"]
    * filters: ["pol","ppol"]
    */
    function gAdtReaderCenikovePolozky(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderCenikovePolozkyDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderCenikovePolozkyDto>;
    /**
    * Klientská část AL - Cloud
    * FieldOptions
    * itemTemplate: "{provoz_cloud_txt}"
    * helperColumns: ["provoz_cloud_txt"]
    *
    * DataReader 
    * keys: ["provoz_cloud"]
    * columns: ["provoz_cloud_txt"]
    * filters: ["provoz_cloud","provoz_cloud_txt"]
    */
    function gAdtReaderCloud(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderCloudDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderCloudDto>;
    /**
    * Klientská část AL - Dalsi Soubory
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader 
    * keys: ["ixs_dif"]
    * columns: ["ixs_dif"/"nazev"]
    * filters: ["ixs_dif","nazev"]
    */
    function gAdtReaderDalsiSoubory(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GGdesdifDto>): GSelectBoxOptions<Gordic.Adt.Interface.GGdesdifDto>;
    /**
    * Klientská část AL - Distributor
    * FieldOptions
    * itemTemplate: "{nazev_distributor}"
    * helperColumns: ["nazev_distributor"]
    *
    * DataReader 
    * keys: ["distributor"]
    * columns: ["nazev_distributor"]
    * filters: ["distributor","nazev"]
    */
    function gAdtReaderDistributor(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderDistributorDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderDistributorDto>;
    /**
    * Klientská část AL - Dostupne verze pro doporučene revize
    * FieldOptions
    * itemTemplate: "{verze_db}.{sub_verze_db}"
    * helperColumns: ["verze_db", "sub_verze_db"]
    *
    * DataReader 
    * keys: ["verze_db"]
    * columns: ["verze_db", "sub_verze_db"]
    * filters: ["verze_db","sub_verze_db"]
    */
    function gAdtReaderDostupneVerzeRevize(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderDostupneVerzeRevizeDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderDostupneVerzeRevizeDto>;
    /**
    * Klientská část AL - Dostupne faze pro statistiku fazi
    * FieldOptions
    * itemTemplate: "{faze} | {faze_txt}"
    * helperColumns: ["faze", "faze_txt","submodel"]
    *
    * DataReader 
    * keys: "faze"
    * columns: ["faze","faze_txt","submodel"]
    * filters: ["faze","faze_txt"]
    */
    function gAdtReaderFaze(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderFazeDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderFazeDto>;
    /**
    * Klientská část AL - Dostupne GDZ baliky
    * FieldOptions
    * itemTemplate: "{ixs_gdt} | {popis}"
    * helperColumns: ["ixs_gdt", "popis"]
    *
    * DataReader 
    * keys: "ixs_gdt"
    * columns: ["ixs_gdt", "popis"]
    * filters: ["ixs_gdt","nazev","popis"]
    */
    function gAdtReaderGDZBaliky(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderGDZBalikyDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderGDZBalikyDto>;
    /**
    * Klientská část AL - Dostupna ICA pro administraci
    * FieldOptions
    * itemTemplate: "{ico_adm} | {nazev}"
    * helperColumns: ["ico_adm", "nazev"]
    *
    * DataReader 
    * keys: ["ico_adm"]
    * columns: ["ico_adm", "nazev"]
    * filters: ["ico_adm","nazev"]
    */
    function gAdtReaderIcoAdministrace(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderIcoAdministraceDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderIcoAdministraceDto>;
    /**
    * Klientská část AL - Dostupna ICA pro fakturaci
    * FieldOptions
    * itemTemplate: "{ico_fakt} | {nazev}"
    * helperColumns: ["ico_fakt", "nazev"]
    *
    * DataReader 
    * keys: ["ico_fakt"]
    * columns: ["ico_fakt", "nazev"]
    * filters: ["ico_fakt","nazev"]
    */
    function gAdtReaderIcoFakturace(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderIcoFakturaceDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderIcoFakturaceDto>;
    /**
    * Klientská část AL - Vlastni licence databazi
    * FieldOptions
    * itemTemplate: "{lic_fyz} | {nazev}"
    * helperColumns: ["lic_fyz", "nazev"]
    *
    * DataReader 
    * keys: ["lic_fyz"]
    * columns: ["lic_fyz","nazev"]
    * filters: ["lic_fyz","nazev"]
    */
    function gAdtReaderLicenceDatabazi(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderLicenceDatabaziDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderLicenceDatabaziDto>;
    /**
    * Klientská část AL - gdesobc
    * FieldOptions
    * itemTemplate: "{nazev_obc}"
    * helperColumns: ["nazev_obc"]
    *
    * DataReader 
    * keys: ["obchodnik","distributor"]
    * columns: ["nazev"]
    * filters: ["obchodnik","distributor","nazev"]
    */
    function gAdtReaderObc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderObcDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderObcDto>;
    /**
    * Klientská část AL - Dostupne ORJ
    * FieldOptions
    * itemTemplate: "{orj} | {nazev}"
    * helperColumns: ["orj", "nazev"]
    *
    * DataReader 
    * keys: "orj"
    * columns: ["orj", "nazev"]
    * filters: ["orj","nazev"]
    */
    function gAdtReaderORJ(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderORJDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderORJDto>;
    /**
    * Klientská část AL - Dostupne cenikove polozky
    * FieldOptions
    * itemTemplate: "{pol} | {popis_pol}"
    * helperColumns: ["pol", "popis_pol"]
    *
    * DataReader 
    * keys: "pol"
    * columns: ["pol","popis_pol"]
    * filters: ["pol","popis_pol"]
    */
    function gAdtReaderPol(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderPolDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderPolDto>;
    /**
    * Klientská část AL - Dostupne polozky bez licencnich polatku pro danou licenci
    * FieldOptions
    * itemTemplate: "{pol} | {popis_pol}"
    * helperColumns: ["pol", "popis_pol"]
    *
    * DataReader 
    * keys: "pol"
    * columns: ["pol", "popis_pol"]
    * filters: ["pol","popis_pol"]
    */
    function gAdtReaderPolBezLicPopl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderPolBezLicPoplDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderPolBezLicPoplDto>;
    /**
    * Klientská část AL - Dostupne cenikove podpolozky
    * FieldOptions
    * itemTemplate: "{ppol} | {popis}"
    * helperColumns: ["ppol", "popis"]
    *
    * DataReader 
    * keys: "ppol"
    * columns: ["ppol","popis"]
    * filters: ["ppol","popis"]
    */
    function gAdtReaderPpol(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderPpolDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderPpolDto>;
    /**
    * Klientská část AL - Dostupne Produktove listy
    * FieldOptions
    * itemTemplate: "{id_listu} | {nazev}"
    * helperColumns: ["id_listu", "nazev"]
    *
    * DataReader 
    * keys: ["id_listu"]
    * columns: ["id_listu","nazev"]
    * filters: ["id_listu","nazev"]
    */
    function gAdtReaderProdListy(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GGdesprlDto>): GSelectBoxOptions<Gordic.Adt.Interface.GGdesprlDto>;
    /**
    * Klientská část AL - Dostupne nezakazane Revize
    * FieldOptions
    * itemTemplate: "{revize}"
    * helperColumns: ["revize"]
    *
    * DataReader 
    * keys: ["revize"]
    * columns: ["revize"]
    * filters: ["revize","faze","verze"]
    */
    function gAdtReaderRevize(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderRevizeDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderRevizeDto>;
    /**
    * Klientská část AL - Dostupne Role registru licenci
    * FieldOptions
    * itemTemplate: "{role_fun_lip_txt}"
    * helperColumns: ["role_fun_lip_txt"]
    *
    * DataReader 
    * keys: ["role_fun_lip"]
    * columns: ["role_fun_lip_txt"]
    * filters: ["role_fun_lip","role_fun_lip_txt"]
    */
    function gAdtReaderRoleRegLic(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderRoleRegLicDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderRoleRegLicDto>;
    /**
    * Klientská část AL - Vlastni skupiny databazi
    * FieldOptions
    * itemTemplate: "{ixs_sdb} | {nazev}"
    * helperColumns: ["ixs_sdb", "nazev"]
    *
    * DataReader 
    * keys: ["ixs_sdb"]
    * columns: ["ixs_sdb", "nazev"]
    * filters: ["ixs_sdb","nazev"]
    */
    function gAdtReaderSkupinyDatabazi(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderSkupinyDatabaziDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderSkupinyDatabaziDto>;
    /**
    * Klientská část AL - Stav revize
    * FieldOptions
    * itemTemplate: (obj) => {
		if (obj.stav_revize == 0) {
						return "<div class='fa fa-check-circle g-state-text g-state-success'></div>  " +"<b>" + obj.stav_revize_txt + "</b>"; 
		}
		else if (obj.stav_revize == 20) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-warning'></div>  " + "<b>" + obj.stav_revize_txt + "</b>";
		}
		else if (obj.stav_revize == 50) {
			return "<div class='fa fa-exclamation-circle g-state-text g-state-important'></div>  " + "<b>" + obj.stav_revize_txt + "</b>";
		}
	}
    * helperColumns: ["stav_revize_txt"]
    *
    * DataReader 
    * keys: ["stav_revize"]
    * columns: ["stav_revize_txt"]
    * filters: ["stav_revize","stav_revize_txt"]
    */
    function gAdtReaderStavRevize(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderStavRevizeDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderStavRevizeDto>;
    /**
    * Klientská část AL - Subsystém
    * FieldOptions
    * itemTemplate: "{subsyst} | {subsyst_txt}"
    * helperColumns: ["subsyst", "subsyst_txt"]
    *
    * DataReader 
    * keys: ["subsyst"]
    * columns: ["subsyst","subsyst_txt"]
    * filters: ["subsyst","subsyst_txt"]
    */
    function gAdtReaderSubsystem(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderSubsystemDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderSubsystemDto>;
    /**
    * Klientská část AL - Typ Fáze
    * FieldOptions
    * itemTemplate: "{faze_typ_txt}"
    * helperColumns: ["faze_typ_txt"]
    *
    * DataReader 
    * keys: ["faze_typ"]
    * columns: ["faze_typ","faze_typ_txt"]
    * filters: ["faze_typ","faze_typ_txt"]
    */
    function gAdtReaderTypFaze(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderTypFazeDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderTypFazeDto>;
    /**
    * Klientská část AL - Typ implementace
    * FieldOptions
    * itemTemplate: "{tyi} | {tyi_txt}"
    * helperColumns: ["tyi","tyi_txt"]
    *
    * DataReader 
    * keys: ["tyi"]
    * columns: ["tyi","tyi_txt"]
    * filters: ["tyi","tyi_txt"]
    */
    function gAdtReaderTypImpl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderTiyDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderTiyDto>;
    /**
    * Klientská část AL - Dostupne verze databaze
    * FieldOptions
    * itemTemplate: "{verze_db}"
    * helperColumns: ["verze_db"]
    *
    * DataReader 
    * keys: ["verze_db"]
    * columns: ["verze_db"]
    * filters: ["verze_db"]
    */
    function gAdtReaderVerzeDB(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderVerzeDBDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderVerzeDBDto>;
    /**
    * Klientská část AL - Dostupne verze GDZ baliku
    * FieldOptions
    * itemTemplate: "{verze_db}.{sub_verze_db}.{revize_adz}"
    * helperColumns: ["verze_db", "sub_verze_db", "revize_adz"]
    *
    * DataReader 
    * keys: ["verze_db"]
    * columns: ["verze_db", "sub_verze_db", "revize_adz"]
    * filters: ["verze_db","sub_verze_db","revize_adz"]
    */
    function gAdtReaderVerzeGDZBaliku(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GReaderVerzeGDZBalikuDto>): GSelectBoxOptions<Gordic.Adt.Interface.GReaderVerzeGDZBalikuDto>;
    /**
    * Klientská část AL - Vlastni licence DB
    * FieldOptions
    * itemTemplate: "{lic} | {nazev}"
    * helperColumns: ["lic", "nazev"]
    *
    * DataReader 
    * keys: "lic"
    * columns: ["lic", "nazev"]
    * filters: ["lic","nazev"]
    */
    function gAdtReaderVlastniLicDB(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderVlastniLicDBDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderVlastniLicDBDto>;
    /**
    * Klientská část AL - Vlastni licence rad PID
    * FieldOptions
    * itemTemplate: "{lic} | {nazev}"
    * helperColumns: ["lic", "nazev"]
    *
    * DataReader 
    * keys: "lic"
    * columns: ["lic", "nazev"]
    * filters: ["lic","nazev"]
    */
    function gAdtReaderVlastniLicRad(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderVlastniLicRadDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderVlastniLicRadDto>;
    /**
    * Klientská část AL - pole ZAK
    * FieldOptions
    * itemTemplate: "{zak} | {zak_txt}"
    * helperColumns: ["zak", "zak_txt"]
    *
    * DataReader 
    * keys: ["zak"]
    * columns: ["zak","zak_txt"]
    * filters: ["zak","zak_txt"]
    */
    function gAdtReaderZAK(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adt.Interface.GAdtReaderZAKDto>): GSelectBoxOptions<Gordic.Adt.Interface.GAdtReaderZAKDto>;}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.WebControls\Gin\Adt\GAdtDialogs.d.ts 

declare namespace Gordic.Adt.Dialogs {
    /**
    * Dialog detailu balíčku
    *
    * @author  Tomáš Hažmuka
    * @date    07.11.2018
    *
    * @param   parentContent                  The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function DetailBalickuDlg(parentContent: GContent, opt: {
        /** identifikátor balíčku */
        Ixs_gdt: string;
    }, ModOtevreni?: Gordic.Gin.Globals.Enums.ModOtevreni): JQueryPromise<undefined>;
}

//#endregion

//#region q:\ginis\Development\NET\Gordic.Adt.WebControls\Gin\Adt\Grid\SeznamBalicku.d.ts 

declare namespace Gordic.Adt.WebControls {
	/**Seznam balíčků*/
	interface SeznamBalicku extends Gordic.Gui.WebControls.GAjaxContent {
	}
	const enum SeznamBalickuNames { UserProcess = "UserProcess", DefaultResourceAssembly = "DefaultResourceAssembly", Params = "Params", ContentValues = "ContentValues", GlobalSettings = "GlobalSettings", ID = "ID", Ops = "Ops", ContentResult = "ContentResult", Title = "Title", Icon = "Icon", FormData = "FormData", CurrentContent = "CurrentContent", ForceClientRender = "ForceClientRender",}
	const enum SeznamBalickuFragments { UserProcess = "*", DefaultResourceAssembly = "*", Params = "*", ContentValues = "*", GlobalSettings = "*", ID = "*", Ops = "*", ContentResult = "*", Title = "*", Icon = "*", FormData = "*", CurrentContent = "*", ForceClientRender = "*",}
	const enum SeznamBalickuTypes { UserProcess = "Gordic.General.ApplicationClient.GUserProcess", DefaultResourceAssembly = "any", Params = "any", ContentValues = "Gordic.Gui.WebControls.GWebControlAdvancedValues", GlobalSettings = "Gordic.Gui.WebControls.GAppSettings", ID = "string", Ops = "Gordic.Gui.WebControls.GAjaxContentOps", ContentResult = "Gordic.Gui.WebControls.GJQResult", Title = "string", Icon = "string", FormData = "string", CurrentContent = "Gordic.Gui.WebControls.IGAjaxContent", ForceClientRender = "boolean",}
	const enum SeznamBalickuTypeLengths {}
}

//#endregion

