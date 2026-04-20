/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       pam.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Pam.Client\Gordic.Pam.Client.csproj
*    created     2026-02-16 14:34:22
*    files       pam.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Pam.Client\pam.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - vyběr projektů vázaných na účetní slovo
    * keys : ["kod_uct"]
    * columns: ["kod_uct","popis"]
    * filters: ["kod_uct"]
    */
    class Pamvpus05 extends Base<Gordic.Pam.Interface.GPamvpusDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * Klientská část AL - Pracovní poměry zaměstnanců
    * keys : ["ixs_ppv","dat_plat_od"]
    * columns: ["ixs_ppv","dat_plat_od","ixs_esu","oc","nazev","rc","dat_od","dat_do","druh_ppv","ixs_tpr","druh_ppv_txt","nazev_sablony","zkrprdl","zkrprdz","sez_zac","sez_kon","ixs_kal","ixs_pra","ixs_vyp","dat_plat_dor","presun_ixs_pra","presun_pracoviste","kod_ppv"]
    * filters: ["ixs_fun","ixs_pra","ObdobiOd","ObdobiDo","dat_od","dat_do","cj","ixs_ppv","dat_plat_od","druh_ppv","oc","nazev","rc","ixs_tpr","pracoviste","ixs_esu","ixs_vyp","druh_ppv_txt","nazev_sablony","UkoncenyPpv","BezOhleduNaFunkci","SVazbouVyplMistaNaPracoviste","SPresunutymiPomery"]
    */
    class PracPomery05 extends Base<Gordic.Pam.Interface.GPamdppvDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * SZR RUIAN OBEC
    * keys : ["obec_kod"]
    * columns: ["okres_kod", "okres_nazev", "obec_kod", "obec_nazev"]
    * filters: ["okres_kod","obec_kod","aktivita"]
    */
    class szradr_obec extends Base<Gordic.Pam.Interface.GPppSzrAdresaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * SZR RUIAN OBEC CAST
    * keys : ["cast_obce_kod"]
    * columns: ["obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev"]
    * filters: ["obec_kod","cast_obce_kod","aktivita"]
    */
    class szradr_obeccast extends Base<Gordic.Pam.Interface.GPppSzrAdresaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * SZR RUIAN ULICE
    * keys : ["ulice_kod"]
    * columns: ["obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev", "ulice_kod", "ulice_nazev"]
    * filters: ["obec_kod","cast_obce_kod","ulice_kod","adresni_misto_kod","aktivita"]
    */
    class szradr_ulice extends Base<Gordic.Pam.Interface.GPppSzrAdresaDto>
    {
        constructor(options?: IGReaderBase);
    }

    /**
    * SZR RUIAN ULICE CISLO
    * keys : ["adresni_misto_kod"]
    * columns: ["adresni_misto_kod", "obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev", "ulice_kod", "ulice_nazev", "cpop", "cpop_nazev", "cor", "ulicecislo_nazev"]
    * filters: ["obec_kod","cast_obce_kod","ulice_kod","adresni_misto_kod","aktivita"]
    */
    class szradr_ulicecislo extends Base<Gordic.Pam.Interface.GPppSzrAdresaDto>
    {
        constructor(options?: IGReaderBase);
    }
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - vyběr projektů vázaných na účetní slovo
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["kod_uct", "popis"]
    *
    * DataReader 
    * keys: ["kod_uct"]
    * columns: ["kod_uct","popis"]
    * filters: ["kod_uct"]
    */
    function pamvpus05(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pam.Interface.GPamvpusDto>): GSelectBoxOptions<Gordic.Pam.Interface.GPamvpusDto>;
    /**
    * Klientská část AL - Pracovní poměry zaměstnanců
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["oc", "nazev"]
    *
    * DataReader 
    * keys: ["ixs_ppv","dat_plat_od"]
    * columns: ["ixs_ppv","dat_plat_od","ixs_esu","oc","nazev","rc","dat_od","dat_do","druh_ppv","ixs_tpr","druh_ppv_txt","nazev_sablony","zkrprdl","zkrprdz","sez_zac","sez_kon","ixs_kal","ixs_pra","ixs_vyp","dat_plat_dor","presun_ixs_pra","presun_pracoviste","kod_ppv"]
    * filters: ["ixs_fun","ixs_pra","ObdobiOd","ObdobiDo","dat_od","dat_do","cj","ixs_ppv","dat_plat_od","druh_ppv","oc","nazev","rc","ixs_tpr","pracoviste","ixs_esu","ixs_vyp","druh_ppv_txt","nazev_sablony","UkoncenyPpv","BezOhleduNaFunkci","SVazbouVyplMistaNaPracoviste","SPresunutymiPomery"]
    */
    function pracPomery05(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pam.Interface.GPamdppvDto>): GSelectBoxOptions<Gordic.Pam.Interface.GPamdppvDto>;
    /**
    * SZR RUIAN OBEC
    * FieldOptions
    * itemTemplate: "{obec_nazev:trim:encode}"
    * helperColumns: ["obec_nazev", "okres_nazev"]
    *
    * DataReader 
    * keys: ["obec_kod"]
    * columns: ["okres_kod", "okres_nazev", "obec_kod", "obec_nazev"]
    * filters: ["okres_kod","obec_kod","aktivita"]
    */
    function szradr_obec(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pam.Interface.GPppSzrAdresaDto>): GSelectBoxOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;
    /**
    * SZR RUIAN OBEC CAST
    * FieldOptions
    * itemTemplate: "{cast_obce_nazev:trim:encode}"
    * helperColumns: ["cast_obce_nazev", "obec_nazev"]
    *
    * DataReader 
    * keys: ["cast_obce_kod"]
    * columns: ["obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev"]
    * filters: ["obec_kod","cast_obce_kod","aktivita"]
    */
    function szradr_obeccast(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pam.Interface.GPppSzrAdresaDto>): GSelectBoxOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;
    /**
    * SZR RUIAN ULICE
    * FieldOptions
    * itemTemplate: "{ulice_nazev:trim:encode}"
    * helperColumns: ["ulice_nazev", "obec_nazev", "cast_obce_nazev"]
    *
    * DataReader 
    * keys: ["ulice_kod"]
    * columns: ["obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev", "ulice_kod", "ulice_nazev"]
    * filters: ["obec_kod","cast_obce_kod","ulice_kod","adresni_misto_kod","aktivita"]
    */
    function szradr_ulice(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pam.Interface.GPppSzrAdresaDto>): GSelectBoxOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;
    /**
    * SZR RUIAN ULICE CISLO
    * FieldOptions
    * itemTemplate: "{ulicecislo_nazev:trim:encode}"
    * helperColumns: ["ulicecislo_nazev"]
    *
    * DataReader 
    * keys: ["adresni_misto_kod"]
    * columns: ["adresni_misto_kod", "obec_kod", "obec_nazev", "cast_obce_kod", "cast_obce_nazev", "ulice_kod", "ulice_nazev", "cpop", "cpop_nazev", "cor", "ulicecislo_nazev"]
    * filters: ["obec_kod","cast_obce_kod","ulice_kod","adresni_misto_kod","aktivita"]
    */
    function szradr_ulicecislo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pam.Interface.GPppSzrAdresaDto>): GSelectBoxOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská část AL - vyběr projektů vázaných na účetní slovo
    */
    function pamvpus05(): Selectors.DefaultSelectorOptions<Gordic.Pam.Interface.GPamvpusDto>;
    /**
    * Klientská část AL - Pracovní poměry zaměstnanců
    */
    function pracPomery05(): Selectors.DefaultSelectorOptions<Gordic.Pam.Interface.GPamdppvDto>;
    /**
    * SZR RUIAN OBEC
    */
    function szradr_obec(): Selectors.DefaultSelectorOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;
    /**
    * SZR RUIAN OBEC CAST
    */
    function szradr_obeccast(): Selectors.DefaultSelectorOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;
    /**
    * SZR RUIAN ULICE
    */
    function szradr_ulice(): Selectors.DefaultSelectorOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;
    /**
    * SZR RUIAN ULICE CISLO
    */
    function szradr_ulicecislo(): Selectors.DefaultSelectorOptions<Gordic.Pam.Interface.GPppSzrAdresaDto>;}

//#endregion

