declare namespace Gordic.Data.Readers {
    /**
    * Klientská část AL - číselník Typ pohledávky
    * keys: ["typ_phl"]
    * columns: ["typ_phl","nazev","aktivita"]
    * filters: ["typ_phl","aktivita"]
    */
    class AdeDdpstpp extends Base<Gordic.Adm.Interface.GDdpstppDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeDdpstppDto = Gordic.Adm.Interface.GDdpstppDto;
    type AdeDdpstppDtoNames = Gordic.Adm.Interface.GDdpstppDtoNames;
    type AdeDdpstppDtoFragments = Gordic.Adm.Interface.GDdpstppDtoFragments;
    type AdeDdpstppDtoTypes = Gordic.Adm.Interface.GDdpstppDtoTypes;
    type AdeDdpstppDtoTypeLengths = Gordic.Adm.Interface.GDdpstppDtoTypeLengths;

    /**
    * Klientská část AL - číselník Viditelnost seskupení
    * keys: ["priz_osv"]
    * columns: ["priz_osv","priz_osv_txt","k_v","k_s"]
    * filters: ["priz_osv"]
    */
    class AdeEkocpov extends Base<Gordic.Adm.Interface.GEkocpovDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkocpovDto = Gordic.Adm.Interface.GEkocpovDto;
    type AdeEkocpovDtoNames = Gordic.Adm.Interface.GEkocpovDtoNames;
    type AdeEkocpovDtoFragments = Gordic.Adm.Interface.GEkocpovDtoFragments;
    type AdeEkocpovDtoTypes = Gordic.Adm.Interface.GEkocpovDtoTypes;
    type AdeEkocpovDtoTypeLengths = Gordic.Adm.Interface.GEkocpovDtoTypeLengths;

    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["priz_kom"]
    * columns: ["priz_kom","priz_kom_txt","k_v","k_s"]
    * filters: ["priz_kom"]
    */
    class AdeEkocprk extends Base<Gordic.Adm.Interface.GEkocprkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkocprkDto = Gordic.Adm.Interface.GEkocprkDto;
    type AdeEkocprkDtoNames = Gordic.Adm.Interface.GEkocprkDtoNames;
    type AdeEkocprkDtoFragments = Gordic.Adm.Interface.GEkocprkDtoFragments;
    type AdeEkocprkDtoTypes = Gordic.Adm.Interface.GEkocprkDtoTypes;
    type AdeEkocprkDtoTypeLengths = Gordic.Adm.Interface.GEkocprkDtoTypeLengths;

    /**
    * Klientská část AL - číselník Řád pořizování rozpočtu
    * keys: ["priz_rpr"]
    * columns: ["priz_rpr","priz_rpr_txt","k_v","k_s"]
    * filters: ["priz_rpr"]
    */
    class AdeEkocrpr extends Base<Gordic.Adm.Interface.GEkocrprDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkocrprDto = Gordic.Adm.Interface.GEkocrprDto;
    type AdeEkocrprDtoNames = Gordic.Adm.Interface.GEkocrprDtoNames;
    type AdeEkocrprDtoFragments = Gordic.Adm.Interface.GEkocrprDtoFragments;
    type AdeEkocrprDtoTypes = Gordic.Adm.Interface.GEkocrprDtoTypes;
    type AdeEkocrprDtoTypeLengths = Gordic.Adm.Interface.GEkocrprDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typy elementů seskupení
    * keys: ["typ_elem"]
    * columns: ["typ_elem","typ_elem_txt","k_v","k_s"]
    * filters: ["typ_elem"]
    */
    class AdeEkoctel extends Base<Gordic.Adm.Interface.GEkoctelDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkoctelDto = Gordic.Adm.Interface.GEkoctelDto;
    type AdeEkoctelDtoNames = Gordic.Adm.Interface.GEkoctelDtoNames;
    type AdeEkoctelDtoFragments = Gordic.Adm.Interface.GEkoctelDtoFragments;
    type AdeEkoctelDtoTypes = Gordic.Adm.Interface.GEkoctelDtoTypes;
    type AdeEkoctelDtoTypeLengths = Gordic.Adm.Interface.GEkoctelDtoTypeLengths;

    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["typ_ose"]
    * columns: ["typ_ose","typ_ose_txt","k_v","k_s","aktivita"]
    * filters: ["typ_ose","aktivita"]
    */
    class AdeEkoctyg extends Base<Gordic.Adm.Interface.GEkoctygDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkoctygDto = Gordic.Adm.Interface.GEkoctygDto;
    type AdeEkoctygDtoNames = Gordic.Adm.Interface.GEkoctygDtoNames;
    type AdeEkoctygDtoFragments = Gordic.Adm.Interface.GEkoctygDtoFragments;
    type AdeEkoctygDtoTypes = Gordic.Adm.Interface.GEkoctygDtoTypes;
    type AdeEkoctygDtoTypeLengths = Gordic.Adm.Interface.GEkoctygDtoTypeLengths;

    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["typ_ose"]
    * columns: ["typ_ose","typ_ose_txt","k_v","k_s","aktivita"]
    * filters: ["typ_ose","aktivita"]
    */
    class AdeEkoctyo extends Base<Gordic.Adm.Interface.GEkoctyoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkoctyoDto = Gordic.Adm.Interface.GEkoctyoDto;
    type AdeEkoctyoDtoNames = Gordic.Adm.Interface.GEkoctyoDtoNames;
    type AdeEkoctyoDtoFragments = Gordic.Adm.Interface.GEkoctyoDtoFragments;
    type AdeEkoctyoDtoTypes = Gordic.Adm.Interface.GEkoctyoDtoTypes;
    type AdeEkoctyoDtoTypeLengths = Gordic.Adm.Interface.GEkoctyoDtoTypeLengths;

    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["ixp_den"]
    * columns: ["ixp_den","ico","nazev","rok","aktivita","agenda","stav_txt", "ucs"]
    * filters: ["ixp_den","aktivita","ico","rok","ucs","GpcIcoOrSharedIco","IcoOrSharedIco"]
    */
    class AdeEkoKniha extends Base<Gordic.Adx.Interface.GEkoKnihaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkoKnihaDto = Gordic.Adx.Interface.GEkoKnihaDto;
    type AdeEkoKnihaDtoNames = Gordic.Adx.Interface.GEkoKnihaDtoNames;
    type AdeEkoKnihaDtoFragments = Gordic.Adx.Interface.GEkoKnihaDtoFragments;
    type AdeEkoKnihaDtoTypes = Gordic.Adx.Interface.GEkoKnihaDtoTypes;
    type AdeEkoKnihaDtoTypeLengths = Gordic.Adx.Interface.GEkoKnihaDtoTypeLengths;

    /**
    * Klientská část AL - číselník Kategorie seskupení
    * keys: ["ixs_kto"]
    * columns: ["ixs_kto", "nazev", "zkratka", "poznamka", "aktivita", "dat_zmena", "zmenu_prov", "max_typ_ose","max_typ_ose_txt","rokmes_od","rokmes_do"]
    * filters: ["ixs_kto","aktivita"]
    */
    class AdeEkoskto extends Base<Gordic.Adm.Interface.GEkosktoExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkosktoDto = Gordic.Adm.Interface.GEkosktoExtDto;
    type AdeEkosktoDtoNames = Gordic.Adm.Interface.GEkosktoExtDtoNames;
    type AdeEkosktoDtoFragments = Gordic.Adm.Interface.GEkosktoExtDtoFragments;
    type AdeEkosktoDtoTypes = Gordic.Adm.Interface.GEkosktoExtDtoTypes;
    type AdeEkosktoDtoTypeLengths = Gordic.Adm.Interface.GEkosktoExtDtoTypeLengths;

    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["ico","nks"]
    * columns: ["ico","nks","nazev","aktivita"]
    * filters: ["aktivita","funkcniMistoUcs"]
    */
    class AdeEkosnks extends Base<Gordic.Adm.Interface.GEkosnksDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeEkosnksDto = Gordic.Adm.Interface.GEkosnksDto;
    type AdeEkosnksDtoNames = Gordic.Adm.Interface.GEkosnksDtoNames;
    type AdeEkosnksDtoFragments = Gordic.Adm.Interface.GEkosnksDtoFragments;
    type AdeEkosnksDtoTypes = Gordic.Adm.Interface.GEkosnksDtoTypes;
    type AdeEkosnksDtoTypeLengths = Gordic.Adm.Interface.GEkosnksDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typ funkce
    * keys: ["ixs_ose"]
    * columns: ["ixs_ose", "ixs_kto_txt", "nazev", "poznamka", "dat_od", "dat_do"]
    * filters: ["ixs_ose","typ_ose","aktivita"]
    */
    class adeEkosose extends Base<Gordic.Adm.Interface.GEkososeExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type adeEkososeDto = Gordic.Adm.Interface.GEkososeExtDto;
    type adeEkososeDtoNames = Gordic.Adm.Interface.GEkososeExtDtoNames;
    type adeEkososeDtoFragments = Gordic.Adm.Interface.GEkososeExtDtoFragments;
    type adeEkososeDtoTypes = Gordic.Adm.Interface.GEkososeExtDtoTypes;
    type adeEkososeDtoTypeLengths = Gordic.Adm.Interface.GEkososeExtDtoTypeLengths;

    /**
    * Klientská část AL - číselník Aktivita subřady
    * keys: ["rezim_real"]
    * columns: ["rezim_real","rezim_real_txt","k_v","k_s"]
    * filters: ["rezim_real"]
    */
    class AdeSrvcrre extends Base<Gordic.Adm.Interface.GSrvcrreDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvcrreDto = Gordic.Adm.Interface.GSrvcrreDto;
    type AdeSrvcrreDtoNames = Gordic.Adm.Interface.GSrvcrreDtoNames;
    type AdeSrvcrreDtoFragments = Gordic.Adm.Interface.GSrvcrreDtoFragments;
    type AdeSrvcrreDtoTypes = Gordic.Adm.Interface.GSrvcrreDtoTypes;
    type AdeSrvcrreDtoTypeLengths = Gordic.Adm.Interface.GSrvcrreDtoTypeLengths;

    /**
    * Klientská část AL - číselník Způsob schvalování
    * keys: ["typ_spec"]
    * columns: ["typ_spec","typ_spec_txt","k_v","k_s"]
    * filters: ["typ_spec"]
    */
    class AdeSrvctsp extends Base<Gordic.Adm.Interface.GSrvctspDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvctspDto = Gordic.Adm.Interface.GSrvctspDto;
    type AdeSrvctspDtoNames = Gordic.Adm.Interface.GSrvctspDtoNames;
    type AdeSrvctspDtoFragments = Gordic.Adm.Interface.GSrvctspDtoFragments;
    type AdeSrvctspDtoTypes = Gordic.Adm.Interface.GSrvctspDtoTypes;
    type AdeSrvctspDtoTypeLengths = Gordic.Adm.Interface.GSrvctspDtoTypeLengths;

    /**
    * Klientská část AL - číselník Zdroj dokumentů
    * keys: ["zdroj_dok"]
    * columns: ["zdroj_dok","zdroj_dok_txt","k_v","k_s"]
    * filters: ["zdroj_dok"]
    */
    class AdeSrvczdd extends Base<Gordic.Adm.Interface.GSrvczddDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvczddDto = Gordic.Adm.Interface.GSrvczddDto;
    type AdeSrvczddDtoNames = Gordic.Adm.Interface.GSrvczddDtoNames;
    type AdeSrvczddDtoFragments = Gordic.Adm.Interface.GSrvczddDtoFragments;
    type AdeSrvczddDtoTypes = Gordic.Adm.Interface.GSrvczddDtoTypes;
    type AdeSrvczddDtoTypeLengths = Gordic.Adm.Interface.GSrvczddDtoTypeLengths;

    /**
    * Klientská část AL - číselník Způsob schvalování
    * keys: ["zpusob_schv"]
    * columns: ["zpusob_schv","zpusob_schv_txt","k_v","k_s"]
    * filters: ["zpusob_schv"]
    */
    class AdeSrvczps extends Base<Gordic.Adm.Interface.GSrvczpsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvczpsDto = Gordic.Adm.Interface.GSrvczpsDto;
    type AdeSrvczpsDtoNames = Gordic.Adm.Interface.GSrvczpsDtoNames;
    type AdeSrvczpsDtoFragments = Gordic.Adm.Interface.GSrvczpsDtoFragments;
    type AdeSrvczpsDtoTypes = Gordic.Adm.Interface.GSrvczpsDtoTypes;
    type AdeSrvczpsDtoTypeLengths = Gordic.Adm.Interface.GSrvczpsDtoTypeLengths;

    /**
    * Klientská část AL - číselník Oblasti limitů
    * keys: ["ico","rok","id_tzd","id_vyb","id_eds"]
    * columns: ["ico","rok","id_tzd","id_vyb","id_eds","id_tzd_txt","id_vyb_txt","id_eds_txt","aktivita"]
    * filters: ["ico","rok","id_tzd","id_vyb","id_eds","aktivita"]
    */
    class AdeSrvsobl extends Base<Gordic.Adm.Interface.GSrvsoblExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvsoblDto = Gordic.Adm.Interface.GSrvsoblExtDto;
    type AdeSrvsoblDtoNames = Gordic.Adm.Interface.GSrvsoblExtDtoNames;
    type AdeSrvsoblDtoFragments = Gordic.Adm.Interface.GSrvsoblExtDtoFragments;
    type AdeSrvsoblDtoTypes = Gordic.Adm.Interface.GSrvsoblExtDtoTypes;
    type AdeSrvsoblDtoTypeLengths = Gordic.Adm.Interface.GSrvsoblExtDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typ zdroje pro rozpis
    * keys: ["id_tzd"]
    * columns: ["id_tzd","nazev","zkratka","poznamka","aktivita"]
    * filters: ["id_tzd","aktivita"]
    */
    class AdeSrvstzd extends Base<Gordic.Adm.Interface.GSrvstzdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvstzdDto = Gordic.Adm.Interface.GSrvstzdDto;
    type AdeSrvstzdDtoNames = Gordic.Adm.Interface.GSrvstzdDtoNames;
    type AdeSrvstzdDtoFragments = Gordic.Adm.Interface.GSrvstzdDtoFragments;
    type AdeSrvstzdDtoTypes = Gordic.Adm.Interface.GSrvstzdDtoTypes;
    type AdeSrvstzdDtoTypeLengths = Gordic.Adm.Interface.GSrvstzdDtoTypeLengths;

    /**
    * Klientská část AL - číselník Výdajové bloky
    * keys: ["ico","id_vyb"]
    * columns: ["ico","id_vyb","kod","nazev","rok_od","rok_do","aktivita"]
    * filters: ["ico","id_vyb","aktivita","rok"]
    */
    class AdeSrvsvyb extends Base<Gordic.Adm.Interface.GSrvsvybDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvsvybDto = Gordic.Adm.Interface.GSrvsvybDto;
    type AdeSrvsvybDtoNames = Gordic.Adm.Interface.GSrvsvybDtoNames;
    type AdeSrvsvybDtoFragments = Gordic.Adm.Interface.GSrvsvybDtoFragments;
    type AdeSrvsvybDtoTypes = Gordic.Adm.Interface.GSrvsvybDtoTypes;
    type AdeSrvsvybDtoTypeLengths = Gordic.Adm.Interface.GSrvsvybDtoTypeLengths;

    /**
    * Klientská část AL - číselník Strukturální fondy EU - ISPROFIN
    * keys: ["xpf_pf","uroven"]
    * columns: ["xpf_pf","uroven","nazev","rok_od","rok_do","aktivita","priz_eds"]
    * filters: ["xpf_pf","uroven","priz_eds","aktivita","ico","rok"]
    */
    class AdeSrvsxpf extends Base<Gordic.Adm.Interface.GSrvsxpfDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeSrvsxpfDto = Gordic.Adm.Interface.GSrvsxpfDto;
    type AdeSrvsxpfDtoNames = Gordic.Adm.Interface.GSrvsxpfDtoNames;
    type AdeSrvsxpfDtoFragments = Gordic.Adm.Interface.GSrvsxpfDtoFragments;
    type AdeSrvsxpfDtoTypes = Gordic.Adm.Interface.GSrvsxpfDtoTypes;
    type AdeSrvsxpfDtoTypeLengths = Gordic.Adm.Interface.GSrvsxpfDtoTypeLengths;

    /**
    * Klientská část AL - číselník Kategorie seskupení
    * keys: ["te0"]
    * columns: ["te0", "nazev"]
    * filters: ["uroven_kon","te0","notEmptyTe0"]
    */
    class AdeUctdrozOrj extends Base<Gordic.Adm.Interface.GUctdrozOrjDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdeUctdrozOrjDto = Gordic.Adm.Interface.GUctdrozOrjDto;
    type AdeUctdrozOrjDtoNames = Gordic.Adm.Interface.GUctdrozOrjDtoNames;
    type AdeUctdrozOrjDtoFragments = Gordic.Adm.Interface.GUctdrozOrjDtoFragments;
    type AdeUctdrozOrjDtoTypes = Gordic.Adm.Interface.GUctdrozOrjDtoTypes;
    type AdeUctdrozOrjDtoTypeLengths = Gordic.Adm.Interface.GUctdrozOrjDtoTypeLengths;

    /**
    * Klientská část AL - číselník Bankovní účty
    * keys: ["priz_iissp"]
    * columns: ["priz_iissp","priz_iissp_txt","k_v","k_s"]
    * filters: ["priz_iissp"]
    */
    class AdmEkocpii extends Base<Gordic.Adm.Interface.GEkocpiiDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmEkocpiiDto = Gordic.Adm.Interface.GEkocpiiDto;
    type AdmEkocpiiDtoNames = Gordic.Adm.Interface.GEkocpiiDtoNames;
    type AdmEkocpiiDtoFragments = Gordic.Adm.Interface.GEkocpiiDtoFragments;
    type AdmEkocpiiDtoTypes = Gordic.Adm.Interface.GEkocpiiDtoTypes;
    type AdmEkocpiiDtoTypeLengths = Gordic.Adm.Interface.GEkocpiiDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typ komunikace s IISSP
    * keys: ["typ_kom_iissp"]
    * columns: ["typ_kom_iissp","typ_kom_iissp_txt","k_v","k_s"]
    * filters: ["typ_kom_iissp"]
    */
    class AdmEkoctii extends Base<Gordic.Adm.Interface.GEkoctiiDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmEkoctiiDto = Gordic.Adm.Interface.GEkoctiiDto;
    type AdmEkoctiiDtoNames = Gordic.Adm.Interface.GEkoctiiDtoNames;
    type AdmEkoctiiDtoFragments = Gordic.Adm.Interface.GEkoctiiDtoFragments;
    type AdmEkoctiiDtoTypes = Gordic.Adm.Interface.GEkoctiiDtoTypes;
    type AdmEkoctiiDtoTypeLengths = Gordic.Adm.Interface.GEkoctiiDtoTypeLengths;

    /**
    * Klientská část AL - číselník Druh ÚJ
    * keys: ["id_druh"]
    * columns: ["id_druh","kod_druh","nazev","poznamka","aktivita"]
    * filters: ["id_druh","aktivita"]
    */
    class AdmEkosdro extends Base<Gordic.Adm.Interface.GEkosdroDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmEkosdroDto = Gordic.Adm.Interface.GEkosdroDto;
    type AdmEkosdroDtoNames = Gordic.Adm.Interface.GEkosdroDtoNames;
    type AdmEkosdroDtoFragments = Gordic.Adm.Interface.GEkosdroDtoFragments;
    type AdmEkosdroDtoTypes = Gordic.Adm.Interface.GEkosdroDtoTypes;
    type AdmEkosdroDtoTypeLengths = Gordic.Adm.Interface.GEkosdroDtoTypeLengths;

    /**
    * Klientská část AL - číselník Druh ÚJ
    * keys: ["id_druh","id_poddruh"]
    * columns: ["id_druh","id_poddruh","kod_poddruh","nazev","poznamka","aktivita"]
    * filters: ["id_druh","id_poddruh","aktivita"]
    */
    class AdmEkospdo extends Base<Gordic.Adm.Interface.GEkospdoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmEkospdoDto = Gordic.Adm.Interface.GEkospdoDto;
    type AdmEkospdoDtoNames = Gordic.Adm.Interface.GEkospdoDtoNames;
    type AdmEkospdoDtoFragments = Gordic.Adm.Interface.GEkospdoDtoFragments;
    type AdmEkospdoDtoTypes = Gordic.Adm.Interface.GEkospdoDtoTypes;
    type AdmEkospdoDtoTypeLengths = Gordic.Adm.Interface.GEkospdoDtoTypeLengths;

    /**
    * Klientská část AL - číselník Bankovní účty
    * keys: ["rok","bu_vl","sk_vl"]
    * columns: ["bu_txt","rok","bu_vl","sk_vl","ico","ucs"]
    * filters: ["sk_vl","bu_vl","rok","ico","ucs","aktivita"]
    */
    class AdmEkosuvl extends Base<Gordic.Adm.Interface.GEkosuvlDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmEkosuvlDto = Gordic.Adm.Interface.GEkosuvlDto;
    type AdmEkosuvlDtoNames = Gordic.Adm.Interface.GEkosuvlDtoNames;
    type AdmEkosuvlDtoFragments = Gordic.Adm.Interface.GEkosuvlDtoFragments;
    type AdmEkosuvlDtoTypes = Gordic.Adm.Interface.GEkosuvlDtoTypes;
    type AdmEkosuvlDtoTypeLengths = Gordic.Adm.Interface.GEkosuvlDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typ funkce
    * keys: ["rezim_fin"]
    * columns: ["rezim_fin","rezim_fin_txt"]
    * filters: ["rezim_fin"]
    */
    class Ekocref extends Base<Gordic.Adm.Interface.GEkocrefDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EkocrefDto = Gordic.Adm.Interface.GEkocrefDto;
    type EkocrefDtoNames = Gordic.Adm.Interface.GEkocrefDtoNames;
    type EkocrefDtoFragments = Gordic.Adm.Interface.GEkocrefDtoFragments;
    type EkocrefDtoTypes = Gordic.Adm.Interface.GEkocrefDtoTypes;
    type EkocrefDtoTypeLengths = Gordic.Adm.Interface.GEkocrefDtoTypeLengths;

    /**
    * Klientská část AL - číselník Typ funkce
    * keys: ["pri_fun"]
    * columns: ["pri_fun","pri_fun_txt"]
    * filters: ["pri_fun","pri_fun_txt"]
    */
    class Gincprf extends Base<Gordic.Adm.Interface.GReaderGincprfDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincprfDto = Gordic.Adm.Interface.GReaderGincprfDto;
    type GincprfDtoNames = Gordic.Adm.Interface.GReaderGincprfDtoNames;
    type GincprfDtoFragments = Gordic.Adm.Interface.GReaderGincprfDtoFragments;
    type GincprfDtoTypes = Gordic.Adm.Interface.GReaderGincprfDtoTypes;
    type GincprfDtoTypeLengths = Gordic.Adm.Interface.GReaderGincprfDtoTypeLengths;

    /**
    * Klientská část AL - číselník Priorita
    * keys: ["priorita_max"]
    * columns: ["priorita_max","priorita_max_txt"]
    * filters: ["priorita_max","priorita_max_txt"]
    */
    class Gincpri extends Base<Gordic.Adm.Interface.GReaderGincpriDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincpriDto = Gordic.Adm.Interface.GReaderGincpriDto;
    type GincpriDtoNames = Gordic.Adm.Interface.GReaderGincpriDtoNames;
    type GincpriDtoFragments = Gordic.Adm.Interface.GReaderGincpriDtoFragments;
    type GincpriDtoTypes = Gordic.Adm.Interface.GReaderGincpriDtoTypes;
    type GincpriDtoTypeLengths = Gordic.Adm.Interface.GReaderGincpriDtoTypeLengths;

    /**
    * Klientská část AL - číselník Status funkce
    * keys: ["status_fun"]
    * columns: ["status_fun","status_fun_txt"]
    * filters: ["status_fun","status_fun_txt"]
    */
    class Gincstf extends Base<Gordic.Adm.Interface.GReaderGincstfDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincstfDto = Gordic.Adm.Interface.GReaderGincstfDto;
    type GincstfDtoNames = Gordic.Adm.Interface.GReaderGincstfDtoNames;
    type GincstfDtoFragments = Gordic.Adm.Interface.GReaderGincstfDtoFragments;
    type GincstfDtoTypes = Gordic.Adm.Interface.GReaderGincstfDtoTypes;
    type GincstfDtoTypeLengths = Gordic.Adm.Interface.GReaderGincstfDtoTypeLengths;

    /**
    * Klientská část AL - číselník Úrovně funkčních míst
    * keys: ["uroven_fun"]
    * columns: ["uroven_fun","uroven_fun_txt","aktivita"]
    * filters: ["uroven_fun","uroven_fun_txt","aktivita"]
    */
    class Gincufu extends Base<Gordic.Adm.Interface.GReaderGincufuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincufuDto = Gordic.Adm.Interface.GReaderGincufuDto;
    type GincufuDtoNames = Gordic.Adm.Interface.GReaderGincufuDtoNames;
    type GincufuDtoFragments = Gordic.Adm.Interface.GReaderGincufuDtoFragments;
    type GincufuDtoTypes = Gordic.Adm.Interface.GReaderGincufuDtoTypes;
    type GincufuDtoTypeLengths = Gordic.Adm.Interface.GReaderGincufuDtoTypeLengths;

    /**
    * Klientská část AL - číselník Spouštění událost
    * keys: ["ixs_spu"]
    * columns: ["ixs_spu","zkratka","nazev","aktivita"]
    * filters: ["ixs_spu","zkratka","nazev","aktivita"]
    */
    class Ginsspu extends Base<Gordic.Adm.Interface.GReaderGinsspuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinsspuDto = Gordic.Adm.Interface.GReaderGinsspuDto;
    type GinsspuDtoNames = Gordic.Adm.Interface.GReaderGinsspuDtoNames;
    type GinsspuDtoFragments = Gordic.Adm.Interface.GReaderGinsspuDtoFragments;
    type GinsspuDtoTypes = Gordic.Adm.Interface.GReaderGinsspuDtoTypes;
    type GinsspuDtoTypeLengths = Gordic.Adm.Interface.GReaderGinsspuDtoTypeLengths;

    /**
    * Klientská část AL - číselník Zpracování osobních údajů
    * keys: ["ixs_zap"]
    * columns: ["ixs_zap","ktg_zap","nazev","aktivita"]
    * filters: ["ixs_zap","ktg_zap","nazev","aktivita"]
    */
    class Ginszap extends Base<Gordic.Adm.Interface.GReaderGinszapDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinszapDto = Gordic.Adm.Interface.GReaderGinszapDto;
    type GinszapDtoNames = Gordic.Adm.Interface.GReaderGinszapDtoNames;
    type GinszapDtoFragments = Gordic.Adm.Interface.GReaderGinszapDtoFragments;
    type GinszapDtoTypes = Gordic.Adm.Interface.GReaderGinszapDtoTypes;
    type GinszapDtoTypeLengths = Gordic.Adm.Interface.GReaderGinszapDtoTypeLengths;

    /**
    * Klientská část AL GReaderAdmGincaib
    * keys: ["aib_modul"]
    * columns: ["aib_modul","aib_modul_txt","pol","ppol"]
    * filters: ["aib_modul"]
    */
    class AdmGincaib extends Base<Gordic.Ginis.DbModel.GGincaibDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincaibDto = Gordic.Ginis.DbModel.GGincaibDto;
    type AdmGincaibDtoNames = Gordic.Ginis.DbModel.GGincaibDtoNames;
    type AdmGincaibDtoFragments = Gordic.Ginis.DbModel.GGincaibDtoFragments;
    type AdmGincaibDtoTypes = Gordic.Ginis.DbModel.GGincaibDtoTypes;
    type AdmGincaibDtoTypeLengths = Gordic.Ginis.DbModel.GGincaibDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["aiv_poskyt"]
    * columns: ["aiv_poskyt","aiv_poskyt_txt","k_v","k_s"]
    * filters: ["aiv_poskyt"]
    */
    class AdmGincaiv extends Base<Gordic.Adm.Interface.GGincaivDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincaivDto = Gordic.Adm.Interface.GGincaivDto;
    type AdmGincaivDtoNames = Gordic.Adm.Interface.GGincaivDtoNames;
    type AdmGincaivDtoFragments = Gordic.Adm.Interface.GGincaivDtoFragments;
    type AdmGincaivDtoTypes = Gordic.Adm.Interface.GGincaivDtoTypes;
    type AdmGincaivDtoTypeLengths = Gordic.Adm.Interface.GGincaivDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["aktivita"]
    * columns: ["aktivita","aktivita_txt"]
    * filters: [""]
    */
    class AdmGincakt extends Base<Gordic.Adm.Interface.GReaderAdmGincaktDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincaktDto = Gordic.Adm.Interface.GReaderAdmGincaktDto;
    type AdmGincaktDtoNames = Gordic.Adm.Interface.GReaderAdmGincaktDtoNames;
    type AdmGincaktDtoFragments = Gordic.Adm.Interface.GReaderAdmGincaktDtoFragments;
    type AdmGincaktDtoTypes = Gordic.Adm.Interface.GReaderAdmGincaktDtoTypes;
    type AdmGincaktDtoTypeLengths = Gordic.Adm.Interface.GReaderAdmGincaktDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_spis"]
    * columns: ["priz_spis","priz_spis_txt","k_v","k_s"]
    * filters: [""]
    */
    class AdmGincdsd extends Base<Gordic.Adm.Interface.GGincdsdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincdsdDto = Gordic.Adm.Interface.GGincdsdDto;
    type AdmGincdsdDtoNames = Gordic.Adm.Interface.GGincdsdDtoNames;
    type AdmGincdsdDtoFragments = Gordic.Adm.Interface.GGincdsdDtoFragments;
    type AdmGincdsdDtoTypes = Gordic.Adm.Interface.GGincdsdDtoTypes;
    type AdmGincdsdDtoTypeLengths = Gordic.Adm.Interface.GGincdsdDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["faze_typ"]
    * columns: ["faze_typ","faze_typ_txt","k_v","k_s"]
    * filters: ["faze_typ"]
    */
    class AdmGincfat extends Base<Gordic.Adm.Interface.GGincfatDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincfatDto = Gordic.Adm.Interface.GGincfatDto;
    type AdmGincfatDtoNames = Gordic.Adm.Interface.GGincfatDtoNames;
    type AdmGincfatDtoFragments = Gordic.Adm.Interface.GGincfatDtoFragments;
    type AdmGincfatDtoTypes = Gordic.Adm.Interface.GGincfatDtoTypes;
    type AdmGincfatDtoTypeLengths = Gordic.Adm.Interface.GGincfatDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ktg_spu"]
    * columns: ["ktg_spu","ktg_spu_txt","k_v","k_s"]
    * filters: ["ktg_spu"]
    */
    class AdmGinckts extends Base<Gordic.Adm.Interface.GGincktsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincktsDto = Gordic.Adm.Interface.GGincktsDto;
    type AdmGincktsDtoNames = Gordic.Adm.Interface.GGincktsDtoNames;
    type AdmGincktsDtoFragments = Gordic.Adm.Interface.GGincktsDtoFragments;
    type AdmGincktsDtoTypes = Gordic.Adm.Interface.GGincktsDtoTypes;
    type AdmGincktsDtoTypeLengths = Gordic.Adm.Interface.GGincktsDtoTypeLengths;

    /**
    * Client Reader pro typ AI aplikace
    * keys: ["lap_typ"]
    * columns: ["lap_typ","lap_typ_txt"]
    * filters: ["lap_typ","lap_typ_txt"]
    */
    class AdmGinclap extends Base<Gordic.Ginis.DbModel.GGinclapDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinclapDto = Gordic.Ginis.DbModel.GGinclapDto;
    type AdmGinclapDtoNames = Gordic.Ginis.DbModel.GGinclapDtoNames;
    type AdmGinclapDtoFragments = Gordic.Ginis.DbModel.GGinclapDtoFragments;
    type AdmGinclapDtoTypes = Gordic.Ginis.DbModel.GGinclapDtoTypes;
    type AdmGinclapDtoTypeLengths = Gordic.Ginis.DbModel.GGinclapDtoTypeLengths;

    /**
    * Client Reader pro GContent podporující AI aplikace
    * keys: ["lgcontent"]
    * columns: ["lgcontent","lgcontent_txt","lgcontent_uid"]
    * filters: ["lgcontent","lgcontent_txt","lgcontent_uid"]
    */
    class AdmGinclgc extends Base<Gordic.Ginis.DbModel.GGinclgcDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinclgcDto = Gordic.Ginis.DbModel.GGinclgcDto;
    type AdmGinclgcDtoNames = Gordic.Ginis.DbModel.GGinclgcDtoNames;
    type AdmGinclgcDtoFragments = Gordic.Ginis.DbModel.GGinclgcDtoFragments;
    type AdmGinclgcDtoTypes = Gordic.Ginis.DbModel.GGinclgcDtoTypes;
    type AdmGinclgcDtoTypeLengths = Gordic.Ginis.DbModel.GGinclgcDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["lm_api_typ"]
    * columns: ["lm_api_typ","lm_api_typ_txt"]
    * filters: ["lm_api_typ","lm_api_typ_txt"]
    */
    class AdmGinclma extends Base<Gordic.Ginis.DbModel.GGinclmaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinclmaDto = Gordic.Ginis.DbModel.GGinclmaDto;
    type AdmGinclmaDtoNames = Gordic.Ginis.DbModel.GGinclmaDtoNames;
    type AdmGinclmaDtoFragments = Gordic.Ginis.DbModel.GGinclmaDtoFragments;
    type AdmGinclmaDtoTypes = Gordic.Ginis.DbModel.GGinclmaDtoTypes;
    type AdmGinclmaDtoTypeLengths = Gordic.Ginis.DbModel.GGinclmaDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["lmodel_typ"]
    * columns: ["lmodel_typ","lmodel_typ_txt"]
    * filters: ["lmodel_typ","lmodel_typ_txt"]
    */
    class AdmGinclmk extends Base<Gordic.Ginis.DbModel.GGinclmkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinclmkDto = Gordic.Ginis.DbModel.GGinclmkDto;
    type AdmGinclmkDtoNames = Gordic.Ginis.DbModel.GGinclmkDtoNames;
    type AdmGinclmkDtoFragments = Gordic.Ginis.DbModel.GGinclmkDtoFragments;
    type AdmGinclmkDtoTypes = Gordic.Ginis.DbModel.GGinclmkDtoTypes;
    type AdmGinclmkDtoTypeLengths = Gordic.Ginis.DbModel.GGinclmkDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["lpsluzby_typ"]
    * columns: ["lpsluzby_typ","lpsluzby_typ_txt"]
    * filters: ["lpsluzby_typ"]
    */
    class AdmGinclps extends Base<Gordic.Ginis.DbModel.GGinclpsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinclpsDto = Gordic.Ginis.DbModel.GGinclpsDto;
    type AdmGinclpsDtoNames = Gordic.Ginis.DbModel.GGinclpsDtoNames;
    type AdmGinclpsDtoFragments = Gordic.Ginis.DbModel.GGinclpsDtoFragments;
    type AdmGinclpsDtoTypes = Gordic.Ginis.DbModel.GGinclpsDtoTypes;
    type AdmGinclpsDtoTypeLengths = Gordic.Ginis.DbModel.GGinclpsDtoTypeLengths;

    /**
    * Client Reader pro typ výstupu AI aplikace
    * keys: ["lap_vystup_typ"]
    * columns: ["lap_vystup_typ","lap_vystup_typ_txt"]
    * filters: ["lap_vystup_typ","lap_vystup_typ_txt"]
    */
    class AdmGinclvy extends Base<Gordic.Ginis.DbModel.GGinclvyDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinclvyDto = Gordic.Ginis.DbModel.GGinclvyDto;
    type AdmGinclvyDtoNames = Gordic.Ginis.DbModel.GGinclvyDtoNames;
    type AdmGinclvyDtoFragments = Gordic.Ginis.DbModel.GGinclvyDtoFragments;
    type AdmGinclvyDtoTypes = Gordic.Ginis.DbModel.GGinclvyDtoTypes;
    type AdmGinclvyDtoTypeLengths = Gordic.Ginis.DbModel.GGinclvyDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["mistnost_druh"]
    * columns: ["mistnost_druh","mistnost_druh_txt","k_v","k_s"]
    * filters: ["mistnost_druh"]
    */
    class AdmGincmis extends Base<Gordic.Adm.Interface.GGincmisDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincmisDto = Gordic.Adm.Interface.GGincmisDto;
    type AdmGincmisDtoNames = Gordic.Adm.Interface.GGincmisDtoNames;
    type AdmGincmisDtoFragments = Gordic.Adm.Interface.GGincmisDtoFragments;
    type AdmGincmisDtoTypes = Gordic.Adm.Interface.GGincmisDtoTypes;
    type AdmGincmisDtoTypeLengths = Gordic.Adm.Interface.GGincmisDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["prompt"]
    * columns: ["prompt","prompt_txt","k_v","k_s"]
    * filters: ["prompt"]
    */
    class AdmGincoap extends Base<Gordic.Adm.Interface.GGincoapDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincoapDto = Gordic.Adm.Interface.GGincoapDto;
    type AdmGincoapDtoNames = Gordic.Adm.Interface.GGincoapDtoNames;
    type AdmGincoapDtoFragments = Gordic.Adm.Interface.GGincoapDtoFragments;
    type AdmGincoapDtoTypes = Gordic.Adm.Interface.GGincoapDtoTypes;
    type AdmGincoapDtoTypeLengths = Gordic.Adm.Interface.GGincoapDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_automat"]
    * columns: ["priz_automat","priz_automat_txt"]
    * filters: ["priz_automat"]
    */
    class AdmGincpat extends Base<Gordic.Adm.Interface.GGincpatDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincpatDto = Gordic.Adm.Interface.GGincpatDto;
    type AdmGincpatDtoNames = Gordic.Adm.Interface.GGincpatDtoNames;
    type AdmGincpatDtoFragments = Gordic.Adm.Interface.GGincpatDtoFragments;
    type AdmGincpatDtoTypes = Gordic.Adm.Interface.GGincpatDtoTypes;
    type AdmGincpatDtoTypeLengths = Gordic.Adm.Interface.GGincpatDtoTypeLengths;

    /**
    * Klientská část AL GReaderAdmGincpav
    * keys: ["priz_aut_vyriz"]
    * columns: ["priz_aut_vyriz","priz_aut_vyriz_txt","k_v","k_s"]
    * filters: ["priz_aut_vyriz"]
    */
    class AdmGincpav extends Base<Gordic.Adm.Interface.GGincpavDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincpavDto = Gordic.Adm.Interface.GGincpavDto;
    type AdmGincpavDtoNames = Gordic.Adm.Interface.GGincpavDtoNames;
    type AdmGincpavDtoFragments = Gordic.Adm.Interface.GGincpavDtoFragments;
    type AdmGincpavDtoTypes = Gordic.Adm.Interface.GGincpavDtoTypes;
    type AdmGincpavDtoTypeLengths = Gordic.Adm.Interface.GGincpavDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_ba"]
    * columns: ["priz_ba","priz_ba_txt"]
    * filters: ["priz_ba"]
    */
    class AdmGincpba extends Base<Gordic.Adm.Interface.GReaderAdmGincpbaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincpbaDto = Gordic.Adm.Interface.GReaderAdmGincpbaDto;
    type AdmGincpbaDtoNames = Gordic.Adm.Interface.GReaderAdmGincpbaDtoNames;
    type AdmGincpbaDtoFragments = Gordic.Adm.Interface.GReaderAdmGincpbaDtoFragments;
    type AdmGincpbaDtoTypes = Gordic.Adm.Interface.GReaderAdmGincpbaDtoTypes;
    type AdmGincpbaDtoTypeLengths = Gordic.Adm.Interface.GReaderAdmGincpbaDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_ip_adr"]
    * columns: ["priz_ip_adr","priz_ip_adr_txt","k_v","k_s"]
    * filters: ["priz_ip_adr"]
    */
    class AdmGincpip extends Base<Gordic.Adm.Interface.GGincpipDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincpipDto = Gordic.Adm.Interface.GGincpipDto;
    type AdmGincpipDtoNames = Gordic.Adm.Interface.GGincpipDtoNames;
    type AdmGincpipDtoFragments = Gordic.Adm.Interface.GGincpipDtoFragments;
    type AdmGincpipDtoTypes = Gordic.Adm.Interface.GGincpipDtoTypes;
    type AdmGincpipDtoTypeLengths = Gordic.Adm.Interface.GGincpipDtoTypeLengths;

    /**
    * Klientská část AL GReaderAdmGincpkf
    * keys: ["priz_kon_form"]
    * columns: ["priz_kon_form","priz_kon_form_txt","k_v","k_s"]
    * filters: ["priz_kon_form"]
    */
    class AdmGincpkf extends Base<Gordic.Adm.Interface.GGincpkfDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincpkfDto = Gordic.Adm.Interface.GGincpkfDto;
    type AdmGincpkfDtoNames = Gordic.Adm.Interface.GGincpkfDtoNames;
    type AdmGincpkfDtoFragments = Gordic.Adm.Interface.GGincpkfDtoFragments;
    type AdmGincpkfDtoTypes = Gordic.Adm.Interface.GGincpkfDtoTypes;
    type AdmGincpkfDtoTypeLengths = Gordic.Adm.Interface.GGincpkfDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_povol_nda"]
    * columns: ["priz_povol_nda","priz_povol_nda_txt","ktg_povol_nda","aktivita"]
    * filters: ["priz_povol_nda","ktg_povol_nda","aktivita"]
    */
    class AdmGincpna extends Base<Gordic.Adm.Interface.GGincpnaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincpnaDto = Gordic.Adm.Interface.GGincpnaDto;
    type AdmGincpnaDtoNames = Gordic.Adm.Interface.GGincpnaDtoNames;
    type AdmGincpnaDtoFragments = Gordic.Adm.Interface.GGincpnaDtoFragments;
    type AdmGincpnaDtoTypes = Gordic.Adm.Interface.GGincpnaDtoTypes;
    type AdmGincpnaDtoTypeLengths = Gordic.Adm.Interface.GGincpnaDtoTypeLengths;

    /**
    * Klientská část AL GReaderAdmGincprv
    * keys: ["priz_vaz"]
    * columns: ["priz_vaz","priz_vaz_txt","k_v","k_s"]
    * filters: ["priz_vaz"]
    */
    class AdmGincprv extends Base<Gordic.Adm.Interface.GGincprvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincprvDto = Gordic.Adm.Interface.GGincprvDto;
    type AdmGincprvDtoNames = Gordic.Adm.Interface.GGincprvDtoNames;
    type AdmGincprvDtoFragments = Gordic.Adm.Interface.GGincprvDtoFragments;
    type AdmGincprvDtoTypes = Gordic.Adm.Interface.GGincprvDtoTypes;
    type AdmGincprvDtoTypeLengths = Gordic.Adm.Interface.GGincprvDtoTypeLengths;

    /**
    * Klientská část AL GReaderAdmGincpve
    * keys: ["priz_val_esu"]
    * columns: ["priz_val_esu","priz_val_esu_txt","k_v","k_s"]
    * filters: ["priz_val_esu"]
    */
    class AdmGincpve extends Base<Gordic.Adm.Interface.GGincpveDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincpveDto = Gordic.Adm.Interface.GGincpveDto;
    type AdmGincpveDtoNames = Gordic.Adm.Interface.GGincpveDtoNames;
    type AdmGincpveDtoFragments = Gordic.Adm.Interface.GGincpveDtoFragments;
    type AdmGincpveDtoTypes = Gordic.Adm.Interface.GGincpveDtoTypes;
    type AdmGincpveDtoTypeLengths = Gordic.Adm.Interface.GGincpveDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["rezim_nakl"]
    * columns: ["rezim_nakl","rezim_nakl_txt","k_v","k_s","rezim_nakl_rsx"]
    * filters: ["rezim_nakl"]
    */
    class AdmGincren extends Base<Gordic.Adm.Interface.GReaderAdmGincrenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincrenDto = Gordic.Adm.Interface.GReaderAdmGincrenDto;
    type AdmGincrenDtoNames = Gordic.Adm.Interface.GReaderAdmGincrenDtoNames;
    type AdmGincrenDtoFragments = Gordic.Adm.Interface.GReaderAdmGincrenDtoFragments;
    type AdmGincrenDtoTypes = Gordic.Adm.Interface.GReaderAdmGincrenDtoTypes;
    type AdmGincrenDtoTypeLengths = Gordic.Adm.Interface.GReaderAdmGincrenDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["segment_druh"]
    * columns: ["segment_druh","segment_druh_txt"]
    * filters: ["segment_druh"]
    */
    class AdmGincsbu extends Base<Gordic.Adm.Interface.GGincsbuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincsbuDto = Gordic.Adm.Interface.GGincsbuDto;
    type AdmGincsbuDtoNames = Gordic.Adm.Interface.GGincsbuDtoNames;
    type AdmGincsbuDtoFragments = Gordic.Adm.Interface.GGincsbuDtoFragments;
    type AdmGincsbuDtoTypes = Gordic.Adm.Interface.GGincsbuDtoTypes;
    type AdmGincsbuDtoTypeLengths = Gordic.Adm.Interface.GGincsbuDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_aut_oauth"]
    * columns: ["typ_aut_oauth","typ_aut_oauth_txt"]
    * filters: ["typ_aut_oauth"]
    */
    class AdmGinctao extends Base<Gordic.Adm.Interface.GReaderAdmGinctaoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinctaoDto = Gordic.Adm.Interface.GReaderAdmGinctaoDto;
    type AdmGinctaoDtoNames = Gordic.Adm.Interface.GReaderAdmGinctaoDtoNames;
    type AdmGinctaoDtoFragments = Gordic.Adm.Interface.GReaderAdmGinctaoDtoFragments;
    type AdmGinctaoDtoTypes = Gordic.Adm.Interface.GReaderAdmGinctaoDtoTypes;
    type AdmGinctaoDtoTypeLengths = Gordic.Adm.Interface.GReaderAdmGinctaoDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_cloudu"]
    * columns: ["typ_cloudu","typ_cloudu_txt"]
    * filters: ["typ_cloudu","aktivita"]
    */
    class AdmGinctcl extends Base<Gordic.Adm.Interface.GReaderAdmGinctclDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinctclDto = Gordic.Adm.Interface.GReaderAdmGinctclDto;
    type AdmGinctclDtoNames = Gordic.Adm.Interface.GReaderAdmGinctclDtoNames;
    type AdmGinctclDtoFragments = Gordic.Adm.Interface.GReaderAdmGinctclDtoFragments;
    type AdmGinctclDtoTypes = Gordic.Adm.Interface.GReaderAdmGinctclDtoTypes;
    type AdmGinctclDtoTypeLengths = Gordic.Adm.Interface.GReaderAdmGinctclDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_vps"]
    * columns: ["typ_vps","typ_vps_txt"]
    * filters: ["typ_vps"]
    */
    class AdmGincvps extends Base<Gordic.Adm.Interface.GGincvpsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincvpsDto = Gordic.Adm.Interface.GGincvpsDto;
    type AdmGincvpsDtoNames = Gordic.Adm.Interface.GGincvpsDtoNames;
    type AdmGincvpsDtoFragments = Gordic.Adm.Interface.GGincvpsDtoFragments;
    type AdmGincvpsDtoTypes = Gordic.Adm.Interface.GGincvpsDtoTypes;
    type AdmGincvpsDtoTypeLengths = Gordic.Adm.Interface.GGincvpsDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["obd_vsk"]
    * columns: ["obd_vsk","obd_vsk_txt"]
    * filters: ["obd_vsk"]
    */
    class AdmGincvsk extends Base<Gordic.Adm.Interface.GGincvskExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGincvskDto = Gordic.Adm.Interface.GGincvskExtDto;
    type AdmGincvskDtoNames = Gordic.Adm.Interface.GGincvskExtDtoNames;
    type AdmGincvskDtoFragments = Gordic.Adm.Interface.GGincvskExtDtoFragments;
    type AdmGincvskDtoTypes = Gordic.Adm.Interface.GGincvskExtDtoTypes;
    type AdmGincvskDtoTypeLengths = Gordic.Adm.Interface.GGincvskExtDtoTypeLengths;

    /**
    * Klientská část AL GReaderAdmGinsalv
    * keys: ["ixs_alv"]
    * columns: ["ixs_alv","nazev","id_ses","tema","aktivita"]
    * filters: ["ixs_alv","tema","aktivita"]
    */
    class AdmGinsalv extends Base<Gordic.Adm.Interface.GGinsalvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsalvDto = Gordic.Adm.Interface.GGinsalvDto;
    type AdmGinsalvDtoNames = Gordic.Adm.Interface.GGinsalvDtoNames;
    type AdmGinsalvDtoFragments = Gordic.Adm.Interface.GGinsalvDtoFragments;
    type AdmGinsalvDtoTypes = Gordic.Adm.Interface.GGinsalvDtoTypes;
    type AdmGinsalvDtoTypeLengths = Gordic.Adm.Interface.GGinsalvDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_frm"]
    * columns: ["ixs_frm","nazev","tema","poznamka","rokmes_od","rokmes_do","aktivita"]
    * filters: ["ixs_frm","aktivita"]
    */
    class AdmGinsfrm extends Base<Gordic.Adm.Interface.GGinsfrmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsfrmDto = Gordic.Adm.Interface.GGinsfrmDto;
    type AdmGinsfrmDtoNames = Gordic.Adm.Interface.GGinsfrmDtoNames;
    type AdmGinsfrmDtoFragments = Gordic.Adm.Interface.GGinsfrmDtoFragments;
    type AdmGinsfrmDtoTypes = Gordic.Adm.Interface.GGinsfrmDtoTypes;
    type AdmGinsfrmDtoTypeLengths = Gordic.Adm.Interface.GGinsfrmDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["pronom_id"]
    * columns: ["pronom_id","puid","nazev","verze"]
    * filters: ["pronom_id","aktivita"]
    */
    class AdmGinsfsp extends Base<Gordic.Adm.Interface.GGinsfspDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsfspDto = Gordic.Adm.Interface.GGinsfspDto;
    type AdmGinsfspDtoNames = Gordic.Adm.Interface.GGinsfspDtoNames;
    type AdmGinsfspDtoFragments = Gordic.Adm.Interface.GGinsfspDtoFragments;
    type AdmGinsfspDtoTypes = Gordic.Adm.Interface.GGinsfspDtoTypes;
    type AdmGinsfspDtoTypeLengths = Gordic.Adm.Interface.GGinsfspDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev","nazev_ref","nazev_su","nazev_orj","ico","aktivita","ixs_su","ixs_orj","ixs_ref","ixs_zmp","cs_nazev","nazev_rf", "priz_servis"]
    * filters: ["ixs_fun","ixs_su","aktivita","ico","IxsOrInEsuIco","GpcIcoOrSharedIco","IcoOrSharedIco"]
    */
    class AdmGinsfun extends Base<Gordic.Adm.Interface.GGinsfunDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsfunDto = Gordic.Adm.Interface.GGinsfunDto;
    type AdmGinsfunDtoNames = Gordic.Adm.Interface.GGinsfunDtoNames;
    type AdmGinsfunDtoFragments = Gordic.Adm.Interface.GGinsfunDtoFragments;
    type AdmGinsfunDtoTypes = Gordic.Adm.Interface.GGinsfunDtoTypes;
    type AdmGinsfunDtoTypeLengths = Gordic.Adm.Interface.GGinsfunDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_gdt"]
    * columns: ["ixs_gdt","nazev","popis","aktivita"]
    * filters: ["ixs_gdt","aktivita"]
    */
    class AdmGinsgdt extends Base<Gordic.Adm.Interface.GGinsgdtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsgdtDto = Gordic.Adm.Interface.GGinsgdtDto;
    type AdmGinsgdtDtoNames = Gordic.Adm.Interface.GGinsgdtDtoNames;
    type AdmGinsgdtDtoFragments = Gordic.Adm.Interface.GGinsgdtDtoFragments;
    type AdmGinsgdtDtoTypes = Gordic.Adm.Interface.GGinsgdtDtoTypes;
    type AdmGinsgdtDtoTypeLengths = Gordic.Adm.Interface.GGinsgdtDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["acckey"]
    * columns: ["acckey","nazev","aktivita"]
    * filters: ["acckey","aktivita"]
    */
    class AdmGinskey extends Base<Gordic.Adm.Interface.GGinskeyDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinskeyDto = Gordic.Adm.Interface.GGinskeyDto;
    type AdmGinskeyDtoNames = Gordic.Adm.Interface.GGinskeyDtoNames;
    type AdmGinskeyDtoFragments = Gordic.Adm.Interface.GGinskeyDtoFragments;
    type AdmGinskeyDtoTypes = Gordic.Adm.Interface.GGinskeyDtoTypes;
    type AdmGinskeyDtoTypeLengths = Gordic.Adm.Interface.GGinskeyDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["kod_vyu"]
    * columns: ["kod_vyu","kod_vyu_txt","aktivita"]
    * filters: ["kod_vyu","aktivita"]
    */
    class AdmGinskov extends Base<Gordic.Adm.Interface.GGinskovDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinskovDto = Gordic.Adm.Interface.GGinskovDto;
    type AdmGinskovDtoNames = Gordic.Adm.Interface.GGinskovDtoNames;
    type AdmGinskovDtoFragments = Gordic.Adm.Interface.GGinskovDtoFragments;
    type AdmGinskovDtoTypes = Gordic.Adm.Interface.GGinskovDtoTypes;
    type AdmGinskovDtoTypeLengths = Gordic.Adm.Interface.GGinskovDtoTypeLengths;

    /**
    * Klientská část AL - číselník Schránka
    * keys: ["mailbox"]
    * columns: ["mailbox","ixs_su_txt","nazev", "poznamka"]
    * filters: ["mailbox","typ_mbx"]
    */
    class AdmGinsmbx extends Base<Gordic.Adm.Interface.GGinsmbxExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsmbxDto = Gordic.Adm.Interface.GGinsmbxExtDto;
    type AdmGinsmbxDtoNames = Gordic.Adm.Interface.GGinsmbxExtDtoNames;
    type AdmGinsmbxDtoFragments = Gordic.Adm.Interface.GGinsmbxExtDtoFragments;
    type AdmGinsmbxDtoTypes = Gordic.Adm.Interface.GGinsmbxExtDtoTypes;
    type AdmGinsmbxDtoTypeLengths = Gordic.Adm.Interface.GGinsmbxExtDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_su"]
    * columns: ["ixs_su","nazev","zkratka","ico","lic_adr","ofic_nazev"]
    * filters: ["ixs_su"]
    */
    class AdmGinspod extends Base<Gordic.Adm.Interface.GGinspodDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinspodDto = Gordic.Adm.Interface.GGinspodDto;
    type AdmGinspodDtoNames = Gordic.Adm.Interface.GGinspodDtoNames;
    type AdmGinspodDtoFragments = Gordic.Adm.Interface.GGinspodDtoFragments;
    type AdmGinspodDtoTypes = Gordic.Adm.Interface.GGinspodDtoTypes;
    type AdmGinspodDtoTypeLengths = Gordic.Adm.Interface.GGinspodDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_ref"]
    * columns: ["zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"]
    * filters: ["ixs_ref","aktivita","ixs_su","zkratka","nazev","jmeno","prijmeni","tit_pred","tit_za","oc","rc","login_name","Zastup","NullPid","PridruzenaStrediska","GpcIcoOrSharedIco","IcoOrSharedIco","ico","GinvreuStUtajId"]
    */
    class AdmGinsref extends Base<Gordic.Adm.Interface.GGinsrefExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsrefDto = Gordic.Adm.Interface.GGinsrefExtDto;
    type AdmGinsrefDtoNames = Gordic.Adm.Interface.GGinsrefExtDtoNames;
    type AdmGinsrefDtoFragments = Gordic.Adm.Interface.GGinsrefExtDtoFragments;
    type AdmGinsrefDtoTypes = Gordic.Adm.Interface.GGinsrefExtDtoTypes;
    type AdmGinsrefDtoTypeLengths = Gordic.Adm.Interface.GGinsrefExtDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_skr"]
    * columns: ["ixs_skr", "zkratka", "nazev", "poznamka", "skar_znak", "skar_lhuta", "dat_od", "dat_do", "aktivita", "ixs_spu_txt"]
    * filters: ["ixs_skr","aktivita","proTypyDokumentu"]
    */
    class AdmGinsskr extends Base<Gordic.Adm.Interface.GGinsskrExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsskrDto = Gordic.Adm.Interface.GGinsskrExtDto;
    type AdmGinsskrDtoNames = Gordic.Adm.Interface.GGinsskrExtDtoNames;
    type AdmGinsskrDtoFragments = Gordic.Adm.Interface.GGinsskrExtDtoFragments;
    type AdmGinsskrDtoTypes = Gordic.Adm.Interface.GGinsskrExtDtoTypes;
    type AdmGinsskrDtoTypeLengths = Gordic.Adm.Interface.GGinsskrExtDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_spn"]
    * columns: ["ixs_spn","nazev","poznamka","dat_od","dat_do","aktivita","ixs_spn_prev","ixs_spn_next"]
    * filters: ["ixs_spn","aktivita"]
    */
    class AdmGinsspn extends Base<Gordic.Adm.Interface.GGinsspnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsspnDto = Gordic.Adm.Interface.GGinsspnDto;
    type AdmGinsspnDtoNames = Gordic.Adm.Interface.GGinsspnDtoNames;
    type AdmGinsspnDtoFragments = Gordic.Adm.Interface.GGinsspnDtoFragments;
    type AdmGinsspnDtoTypes = Gordic.Adm.Interface.GGinsspnDtoTypes;
    type AdmGinsspnDtoTypeLengths = Gordic.Adm.Interface.GGinsspnDtoTypeLengths;

    /**
    * Číselník Ginstre
    * keys: ["ixs_tre"]
    * columns: ["ixs_tre","nazev", "ico" ]
    * filters: ["ixs_tre","aktivita","GpcIcoOrSharedIco","IcoOrSharedIco","ico"]
    */
    class AdmGinstre extends Base<Gordic.Adm.Interface.GGinstreDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinstreDto = Gordic.Adm.Interface.GGinstreDto;
    type AdmGinstreDtoNames = Gordic.Adm.Interface.GGinstreDtoNames;
    type AdmGinstreDtoFragments = Gordic.Adm.Interface.GGinstreDtoFragments;
    type AdmGinstreDtoTypes = Gordic.Adm.Interface.GGinstreDtoTypes;
    type AdmGinstreDtoTypeLengths = Gordic.Adm.Interface.GGinstreDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_vsk"]
    * columns: ["ixs_vsk","ico","nazev","dat_od","dat_do","spis_znak","spis_znak_short","ixs_vsk_nad","ixs_skr","urceni_spis_z","zpus_prid_cj","format_cj","priz_trvskar","ixs_spn_od","ixs_spn_do","ixs_vsk_prev","ixs_vsk_next","poznamka","aktivita"]
    * filters: ["ixs_vsk","aktivita","typ","ixs_vsk_nad"]
    */
    class AdmGinsvsk extends Base<Gordic.Adm.Interface.GGinsvskExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGinsvskDto = Gordic.Adm.Interface.GGinsvskExtDto;
    type AdmGinsvskDtoNames = Gordic.Adm.Interface.GGinsvskExtDtoNames;
    type AdmGinsvskDtoFragments = Gordic.Adm.Interface.GGinsvskExtDtoFragments;
    type AdmGinsvskDtoTypes = Gordic.Adm.Interface.GGinsvskExtDtoTypes;
    type AdmGinsvskDtoTypeLengths = Gordic.Adm.Interface.GGinsvskExtDtoTypeLengths;

    /**
    * Klientská část prefabu pro AdmInterniSubjekt
    * keys: ["ixs_esu"]
    * columns: ["ixs_esu","esu_txt","zkratka","poznamka","ico","dic","priz_hlavni_txt","ob_jmeno","ulice","cor","cpop","cast_obce","obec","psc","tel","mail","fax","st1","st2","st3","st4","st5","st6","st7","nazev"]
    * filters: ["ixs_esu","GpcIcoOrSharedIco","IcoOrSharedIco"]
    */
    class AdmInterniSubjekt extends Base<Gordic.Adm.Interface.GGinsesuExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmInterniSubjektDto = Gordic.Adm.Interface.GGinsesuExtDto;
    type AdmInterniSubjektDtoNames = Gordic.Adm.Interface.GGinsesuExtDtoNames;
    type AdmInterniSubjektDtoFragments = Gordic.Adm.Interface.GGinsesuExtDtoFragments;
    type AdmInterniSubjektDtoTypes = Gordic.Adm.Interface.GGinsesuExtDtoTypes;
    type AdmInterniSubjektDtoTypeLengths = Gordic.Adm.Interface.GGinsesuExtDtoTypeLengths;

    /**
    * Klientská část prefabu
    * keys: ["ixs"]
    * columns: ["ixs","nazev"]
    * filters: ["ixs","objectId"]
    */
    class AdmIxsBase extends Base<Gordic.Adm.Interface.GSelectBoxBaseDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmIxsBaseDto = Gordic.Adm.Interface.GSelectBoxBaseDto;
    type AdmIxsBaseDtoNames = Gordic.Adm.Interface.GSelectBoxBaseDtoNames;
    type AdmIxsBaseDtoFragments = Gordic.Adm.Interface.GSelectBoxBaseDtoFragments;
    type AdmIxsBaseDtoTypes = Gordic.Adm.Interface.GSelectBoxBaseDtoTypes;
    type AdmIxsBaseDtoTypeLengths = Gordic.Adm.Interface.GSelectBoxBaseDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_pla"]
    * columns: ["ixs_pla", "nazev", "aktivita", "rok", "ico", "zkratka"]
    * filters: ["aktivita","ico"]
    */
    class AdmSrvspla extends Base<Gordic.Adm.Interface.GSrvPlaExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSrvsplaDto = Gordic.Adm.Interface.GSrvPlaExtDto;
    type AdmSrvsplaDtoNames = Gordic.Adm.Interface.GSrvPlaExtDtoNames;
    type AdmSrvsplaDtoFragments = Gordic.Adm.Interface.GSrvPlaExtDtoFragments;
    type AdmSrvsplaDtoTypes = Gordic.Adm.Interface.GSrvPlaExtDtoTypes;
    type AdmSrvsplaDtoTypeLengths = Gordic.Adm.Interface.GSrvPlaExtDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_prr"]
    * columns: ["ixs_prr","nazev","poznamka","aktivita","zkratka"]
    * filters: ["aktivita","rok","ixs_prr"]
    */
    class AdmSrvsprr extends Base<Gordic.Adm.Interface.GSrvsprrDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSrvsprrDto = Gordic.Adm.Interface.GSrvsprrDto;
    type AdmSrvsprrDtoNames = Gordic.Adm.Interface.GSrvsprrDtoNames;
    type AdmSrvsprrDtoFragments = Gordic.Adm.Interface.GSrvsprrDtoFragments;
    type AdmSrvsprrDtoTypes = Gordic.Adm.Interface.GSrvsprrDtoTypes;
    type AdmSrvsprrDtoTypeLengths = Gordic.Adm.Interface.GSrvsprrDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_tip"]
    * columns: ["ixs_tip", "nazev", "aktivita"]
    * filters: ["aktivita","ixs_pla","ixs_tip","ixs_prr"]
    */
    class AdmSrvstip extends Base<Gordic.Adm.Interface.GSrvstipDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSrvstipDto = Gordic.Adm.Interface.GSrvstipDto;
    type AdmSrvstipDtoNames = Gordic.Adm.Interface.GSrvstipDtoNames;
    type AdmSrvstipDtoFragments = Gordic.Adm.Interface.GSrvstipDtoFragments;
    type AdmSrvstipDtoTypes = Gordic.Adm.Interface.GSrvstipDtoTypes;
    type AdmSrvstipDtoTypeLengths = Gordic.Adm.Interface.GSrvstipDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_tri"]
    * columns: ["ixs_tri","nazev","aktivita","zkratka","poznamka","rok_od","rok_do"]
    * filters: ["aktivita","ixs_tri"]
    */
    class AdmSrvstri extends Base<Gordic.Adm.Interface.GSrvstriDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSrvstriDto = Gordic.Adm.Interface.GSrvstriDto;
    type AdmSrvstriDtoNames = Gordic.Adm.Interface.GSrvstriDtoNames;
    type AdmSrvstriDtoFragments = Gordic.Adm.Interface.GSrvstriDtoFragments;
    type AdmSrvstriDtoTypes = Gordic.Adm.Interface.GSrvstriDtoTypes;
    type AdmSrvstriDtoTypeLengths = Gordic.Adm.Interface.GSrvstriDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["agendova_role"]
    * columns: ["agendova_role","nazev","aktivita"]
    * filters: ["agendova_role","aktivita"]
    */
    class AdmSzrsaro extends Base<Gordic.Adm.Interface.GSzrsaroDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSzrsaroDto = Gordic.Adm.Interface.GSzrsaroDto;
    type AdmSzrsaroDtoNames = Gordic.Adm.Interface.GSzrsaroDtoNames;
    type AdmSzrsaroDtoFragments = Gordic.Adm.Interface.GSzrsaroDtoFragments;
    type AdmSzrsaroDtoTypes = Gordic.Adm.Interface.GSzrsaroDtoTypes;
    type AdmSzrsaroDtoTypeLengths = Gordic.Adm.Interface.GSzrsaroDtoTypeLengths;

    /**
    * Číselník gincpar
    * keys: ["name"]
    * columns: ["name"]
    * filters: ["name"]
    */
    class DbLogins extends Base<Gordic.Adm.Interface.GReaderDbLoginsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type DbLoginsDto = Gordic.Adm.Interface.GReaderDbLoginsDto;
    type DbLoginsDtoNames = Gordic.Adm.Interface.GReaderDbLoginsDtoNames;
    type DbLoginsDtoFragments = Gordic.Adm.Interface.GReaderDbLoginsDtoFragments;
    type DbLoginsDtoTypes = Gordic.Adm.Interface.GReaderDbLoginsDtoTypes;
    type DbLoginsDtoTypeLengths = Gordic.Adm.Interface.GReaderDbLoginsDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["typ_aute"]
    * columns: ["typ_aute","typ_aute_txt"]
    * filters: ["typ_aute"]
    */
    class Gincaut extends Base<Gordic.Adm.Interface.GReaderGincautDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincautDto = Gordic.Adm.Interface.GReaderGincautDto;
    type GincautDtoNames = Gordic.Adm.Interface.GReaderGincautDtoNames;
    type GincautDtoFragments = Gordic.Adm.Interface.GReaderGincautDtoFragments;
    type GincautDtoTypes = Gordic.Adm.Interface.GReaderGincautDtoTypes;
    type GincautDtoTypeLengths = Gordic.Adm.Interface.GReaderGincautDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["uroven_cfg"]
    * columns: ["uroven_cfg","uroven_cfg_txt"]
    * filters: ["uroven_cfg","pouze_platne"]
    */
    class Ginccfg extends Base<Gordic.Adm.Interface.GGinccfgDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinccfgDto = Gordic.Adm.Interface.GGinccfgDto;
    type GinccfgDtoNames = Gordic.Adm.Interface.GGinccfgDtoNames;
    type GinccfgDtoFragments = Gordic.Adm.Interface.GGinccfgDtoFragments;
    type GinccfgDtoTypes = Gordic.Adm.Interface.GGinccfgDtoTypes;
    type GinccfgDtoTypeLengths = Gordic.Adm.Interface.GGinccfgDtoTypeLengths;

    /**
    * Číselník Sslcpdc
    * keys: ["csas_type"]
    * columns: ["csas_type","csas_type","k_v","k_s"]
    * filters: ["csas_type"]
    */
    class Ginccst extends Base<Gordic.Adm.Interface.GGinccstDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinccstDto = Gordic.Adm.Interface.GGinccstDto;
    type GinccstDtoNames = Gordic.Adm.Interface.GGinccstDtoNames;
    type GinccstDtoFragments = Gordic.Adm.Interface.GGinccstDtoFragments;
    type GinccstDtoTypes = Gordic.Adm.Interface.GGinccstDtoTypes;
    type GinccstDtoTypeLengths = Gordic.Adm.Interface.GGinccstDtoTypeLengths;

    /**
    * Číselník Sslcpdc
    * keys: ["dat_typ"]
    * columns: ["dat_typ","dat_typ_txt"]
    * filters: ["dat_typ"]
    */
    class Gincdat extends Base<Gordic.Adm.Interface.GGincdatDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincdatDto = Gordic.Adm.Interface.GGincdatDto;
    type GincdatDtoNames = Gordic.Adm.Interface.GGincdatDtoNames;
    type GincdatDtoFragments = Gordic.Adm.Interface.GGincdatDtoFragments;
    type GincdatDtoTypes = Gordic.Adm.Interface.GGincdatDtoTypes;
    type GincdatDtoTypeLengths = Gordic.Adm.Interface.GGincdatDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["ktg_evn"]
    * columns: ["ktg_evn","ktg_evn_txt"]
    * filters: ["ktg_evn"]
    */
    class Gincevn extends Base<Gordic.Adm.Interface.GReaderGincevnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincevnDto = Gordic.Adm.Interface.GReaderGincevnDto;
    type GincevnDtoNames = Gordic.Adm.Interface.GReaderGincevnDtoNames;
    type GincevnDtoFragments = Gordic.Adm.Interface.GReaderGincevnDtoFragments;
    type GincevnDtoTypes = Gordic.Adm.Interface.GReaderGincevnDtoTypes;
    type GincevnDtoTypeLengths = Gordic.Adm.Interface.GReaderGincevnDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["typ_mbx"]
    * columns: ["typ_mbx","typ_mbx_txt"]
    * filters: ["typ_mbx"]
    */
    class Gincmbx extends Base<Gordic.Adm.Interface.GGincmbxDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincmbxDto = Gordic.Adm.Interface.GGincmbxDto;
    type GincmbxDtoNames = Gordic.Adm.Interface.GGincmbxDtoNames;
    type GincmbxDtoFragments = Gordic.Adm.Interface.GGincmbxDtoFragments;
    type GincmbxDtoTypes = Gordic.Adm.Interface.GGincmbxDtoTypes;
    type GincmbxDtoTypeLengths = Gordic.Adm.Interface.GGincmbxDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["oa_token_typ"]
    * columns: ["oa_token_typ","oa_token_typ_txt"]
    * filters: ["oa_token_typ"]
    */
    class Gincoat extends Base<Gordic.Adm.Interface.GReaderGincoatDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincoatDto = Gordic.Adm.Interface.GReaderGincoatDto;
    type GincoatDtoNames = Gordic.Adm.Interface.GReaderGincoatDtoNames;
    type GincoatDtoFragments = Gordic.Adm.Interface.GReaderGincoatDtoFragments;
    type GincoatDtoTypes = Gordic.Adm.Interface.GReaderGincoatDtoTypes;
    type GincoatDtoTypeLengths = Gordic.Adm.Interface.GReaderGincoatDtoTypeLengths;

    /**
    * Číselník Gincorj
    * keys: ["uroven_orj"]
    * columns: ["uroven_orj", "uroven_orj_txt", "aktivita"]
    * filters: ["uroven_orj"]
    */
    class Gincorj extends Base<Gordic.Adm.Interface.GGincorjDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincorjDto = Gordic.Adm.Interface.GGincorjDto;
    type GincorjDtoNames = Gordic.Adm.Interface.GGincorjDtoNames;
    type GincorjDtoFragments = Gordic.Adm.Interface.GGincorjDtoFragments;
    type GincorjDtoTypes = Gordic.Adm.Interface.GGincorjDtoTypes;
    type GincorjDtoTypeLengths = Gordic.Adm.Interface.GGincorjDtoTypeLengths;

    /**
    * Číselník gincpar
    * keys: ["param"]
    * columns: ["param", "param_txt", "aktivita", "popis"]
    * filters: ["param","aktivita","uroven_cfg","faze"]
    */
    class Gincpar extends Base<Gordic.Adm.Interface.GReaderGincparDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincparDto = Gordic.Adm.Interface.GReaderGincparDto;
    type GincparDtoNames = Gordic.Adm.Interface.GReaderGincparDtoNames;
    type GincparDtoFragments = Gordic.Adm.Interface.GReaderGincparDtoFragments;
    type GincparDtoTypes = Gordic.Adm.Interface.GReaderGincparDtoTypes;
    type GincparDtoTypeLengths = Gordic.Adm.Interface.GReaderGincparDtoTypeLengths;

    /**
    * Klientská část pro reader světadíl
    * keys: ["svetadil"]
    * columns: ["svetadil","svetadil_txt"]
    * filters: ["svetadil"]
    */
    class Gincsve extends Base<Gordic.Adm.Interface.GGincsveDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincsveDto = Gordic.Adm.Interface.GGincsveDto;
    type GincsveDtoNames = Gordic.Adm.Interface.GGincsveDtoNames;
    type GincsveDtoFragments = Gordic.Adm.Interface.GGincsveDtoFragments;
    type GincsveDtoTypes = Gordic.Adm.Interface.GGincsveDtoTypes;
    type GincsveDtoTypeLengths = Gordic.Adm.Interface.GGincsveDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["typ_aut"]
    * columns: ["typ_aut","typ_aut_txt"]
    * filters: ["typ_aut"]
    */
    class Ginctau extends Base<Gordic.Adm.Interface.GReaderGinctauDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinctauDto = Gordic.Adm.Interface.GReaderGinctauDto;
    type GinctauDtoNames = Gordic.Adm.Interface.GReaderGinctauDtoNames;
    type GinctauDtoFragments = Gordic.Adm.Interface.GReaderGinctauDtoFragments;
    type GinctauDtoTypes = Gordic.Adm.Interface.GReaderGinctauDtoTypes;
    type GinctauDtoTypeLengths = Gordic.Adm.Interface.GReaderGinctauDtoTypeLengths;

    /**
    * Číselník Sslcpdc
    * keys: ["typ_vla"]
    * columns: ["typ_vla","typ_vla_txt"]
    * filters: ["typ_vla"]
    */
    class Ginctvp extends Base<Gordic.Adm.Interface.GGinctvpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinctvpDto = Gordic.Adm.Interface.GGinctvpDto;
    type GinctvpDtoNames = Gordic.Adm.Interface.GGinctvpDtoNames;
    type GinctvpDtoFragments = Gordic.Adm.Interface.GGinctvpDtoFragments;
    type GinctvpDtoTypes = Gordic.Adm.Interface.GGinctvpDtoTypes;
    type GinctvpDtoTypeLengths = Gordic.Adm.Interface.GGinctvpDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["uroven_vla"]
    * columns: ["uroven_vla","uroven_vla_txt"]
    * filters: ["uroven_vla"]
    */
    class Gincuvl extends Base<Gordic.Adm.Interface.GReaderGincuvlDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincuvlDto = Gordic.Adm.Interface.GReaderGincuvlDto;
    type GincuvlDtoNames = Gordic.Adm.Interface.GReaderGincuvlDtoNames;
    type GincuvlDtoFragments = Gordic.Adm.Interface.GReaderGincuvlDtoFragments;
    type GincuvlDtoTypes = Gordic.Adm.Interface.GReaderGincuvlDtoTypes;
    type GincuvlDtoTypeLengths = Gordic.Adm.Interface.GReaderGincuvlDtoTypeLengths;

    /**
    * Číselník Gincvau
    * keys: ["typ_vau"]
    * columns: ["typ_vau","typ_vau_txt"]
    * filters: ["typ_vau"]
    */
    class Gincvau extends Base<Gordic.Adm.Interface.GGincvauDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GincvauDto = Gordic.Adm.Interface.GGincvauDto;
    type GincvauDtoNames = Gordic.Adm.Interface.GGincvauDtoNames;
    type GincvauDtoFragments = Gordic.Adm.Interface.GGincvauDtoFragments;
    type GincvauDtoTypes = Gordic.Adm.Interface.GGincvauDtoTypes;
    type GincvauDtoTypeLengths = Gordic.Adm.Interface.GGincvauDtoTypeLengths;

    /**
    * Číselník ginchop - param, config, config_txt, popis, aktivita
    * keys: ["param","config"]
    * columns: ["param","config","config_txt","popis","aktivita"]
    * filters: ["param","config","aktivita"]
    */
    class Ginchop extends Base<Gordic.Adm.Interface.GGinchopDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinchopDto = Gordic.Adm.Interface.GGinchopDto;
    type GinchopDtoNames = Gordic.Adm.Interface.GGinchopDtoNames;
    type GinchopDtoFragments = Gordic.Adm.Interface.GGinchopDtoFragments;
    type GinchopDtoTypes = Gordic.Adm.Interface.GGinchopDtoTypes;
    type GinchopDtoTypeLengths = Gordic.Adm.Interface.GGinchopDtoTypeLengths;

    /**
    * Číselník ginsins
    * keys: ["ixs_ins"]
    * columns: ["ixs_ins","nazev"]
    * filters: ["ixs_ins"]
    */
    class Ginsins extends Base<Gordic.Adm.Interface.GGinsinsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinsinsDto = Gordic.Adm.Interface.GGinsinsDto;
    type GinsinsDtoNames = Gordic.Adm.Interface.GGinsinsDtoNames;
    type GinsinsDtoFragments = Gordic.Adm.Interface.GGinsinsDtoFragments;
    type GinsinsDtoTypes = Gordic.Adm.Interface.GGinsinsDtoTypes;
    type GinsinsDtoTypeLengths = Gordic.Adm.Interface.GGinsinsDtoTypeLengths;

    /**
    * Klientská část Stanice
    * keys: ["ip_adr"]
    * columns: ["ip_adr","nazev"]
    * filters: ["ip_adr","aktivita"]
    */
    class Ginssta extends Base<Gordic.Adm.Interface.GGinsstaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GinsstaDto = Gordic.Adm.Interface.GGinsstaDto;
    type GinsstaDtoNames = Gordic.Adm.Interface.GGinsstaDtoNames;
    type GinsstaDtoFragments = Gordic.Adm.Interface.GGinsstaDtoFragments;
    type GinsstaDtoTypes = Gordic.Adm.Interface.GGinsstaDtoTypes;
    type GinsstaDtoTypeLengths = Gordic.Adm.Interface.GGinsstaDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_csp"]
    * columns: ["ixs_csp","nazev","zkratka","aktivita"]
    * filters: ["ixs_csp","aktivita"]
    */
    class Srvscsp extends Base<Gordic.Adm.Interface.GSrvscspDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SrvscspDto = Gordic.Adm.Interface.GSrvscspDto;
    type SrvscspDtoNames = Gordic.Adm.Interface.GSrvscspDtoNames;
    type SrvscspDtoFragments = Gordic.Adm.Interface.GSrvscspDtoFragments;
    type SrvscspDtoTypes = Gordic.Adm.Interface.GSrvscspDtoTypes;
    type SrvscspDtoTypeLengths = Gordic.Adm.Interface.GSrvscspDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["priz_cj_only"]
    * columns: ["priz_cj_only","priz_cj_only_txt"]
    * filters: ["priz_cj_only"]
    */
    class Sslcpco extends Base<Gordic.Adm.Interface.GSslcpcoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SslcpcoDto = Gordic.Adm.Interface.GSslcpcoDto;
    type SslcpcoDtoNames = Gordic.Adm.Interface.GSslcpcoDtoNames;
    type SslcpcoDtoFragments = Gordic.Adm.Interface.GSslcpcoDtoFragments;
    type SslcpcoDtoTypes = Gordic.Adm.Interface.GSslcpcoDtoTypes;
    type SslcpcoDtoTypeLengths = Gordic.Adm.Interface.GSslcpcoDtoTypeLengths;

    /**
    * Číselník Sslcpdc
    * keys: ["priz_den_cj"]
    * columns: ["priz_den_cj","priz_den_cj_txt"]
    * filters: ["priz_den_cj"]
    */
    class Sslcpdc extends Base<Gordic.Adm.Interface.GSslcpdcDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SslcpdcDto = Gordic.Adm.Interface.GSslcpdcDto;
    type SslcpdcDtoNames = Gordic.Adm.Interface.GSslcpdcDtoNames;
    type SslcpdcDtoFragments = Gordic.Adm.Interface.GSslcpdcDtoFragments;
    type SslcpdcDtoTypes = Gordic.Adm.Interface.GSslcpdcDtoTypes;
    type SslcpdcDtoTypeLengths = Gordic.Adm.Interface.GSslcpdcDtoTypeLengths;

    /**
    * Číselník Sslcpuz
    * keys: ["priz_uzav"]
    * columns: ["priz_uzav","priz_uzav_txt"]
    * filters: ["priz_uzav"]
    */
    class Sslcpuz extends Base<Gordic.Adm.Interface.GSslcpuzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SslcpuzDto = Gordic.Adm.Interface.GSslcpuzDto;
    type SslcpuzDtoNames = Gordic.Adm.Interface.GSslcpuzDtoNames;
    type SslcpuzDtoFragments = Gordic.Adm.Interface.GSslcpuzDtoFragments;
    type SslcpuzDtoTypes = Gordic.Adm.Interface.GSslcpuzDtoTypes;
    type SslcpuzDtoTypeLengths = Gordic.Adm.Interface.GSslcpuzDtoTypeLengths;

    /**
    * Číselník Sslctyd
    * keys: ["typ_den"]
    * columns: ["typ_den","typ_den_txt"]
    * filters: ["typ_den"]
    */
    class Sslctyd extends Base<Gordic.Adm.Interface.GSslctydDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SslctydDto = Gordic.Adm.Interface.GSslctydDto;
    type SslctydDtoNames = Gordic.Adm.Interface.GSslctydDtoNames;
    type SslctydDtoFragments = Gordic.Adm.Interface.GSslctydDtoFragments;
    type SslctydDtoTypes = Gordic.Adm.Interface.GSslctydDtoTypes;
    type SslctydDtoTypeLengths = Gordic.Adm.Interface.GSslctydDtoTypeLengths;

    /**
    * Číselník ginctau
    * keys: ["umisteni"]
    * columns: ["umisteni","umisteni_txt"]
    * filters: ["umisteni"]
    */
    class Sslsump extends Base<Gordic.Adm.Interface.GSslsumpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SslsumpDto = Gordic.Adm.Interface.GSslsumpDto;
    type SslsumpDtoNames = Gordic.Adm.Interface.GSslsumpDtoNames;
    type SslsumpDtoFragments = Gordic.Adm.Interface.GSslsumpDtoFragments;
    type SslsumpDtoTypes = Gordic.Adm.Interface.GSslsumpDtoTypes;
    type SslsumpDtoTypeLengths = Gordic.Adm.Interface.GSslsumpDtoTypeLengths;

    /**
    * Číselník wflcpak
    * keys: ["priz_akr"]
    * columns: ["priz_akr","priz_akr_txt"]
    * filters: ["priz_akr"]
    */
    class Wflcpak extends Base<Gordic.Adm.Interface.GReaderWflcpakDto>
    {
        constructor(options?: IGReaderBase);
    }
    type WflcpakDto = Gordic.Adm.Interface.GReaderWflcpakDto;
    type WflcpakDtoNames = Gordic.Adm.Interface.GReaderWflcpakDtoNames;
    type WflcpakDtoFragments = Gordic.Adm.Interface.GReaderWflcpakDtoFragments;
    type WflcpakDtoTypes = Gordic.Adm.Interface.GReaderWflcpakDtoTypes;
    type WflcpakDtoTypeLengths = Gordic.Adm.Interface.GReaderWflcpakDtoTypeLengths;

    /**
    * Číselník WindowsLogins
    * keys: ["name"]
    * columns: ["name"]
    * filters: ["name"]
    */
    class WindowsLogins extends Base<Gordic.Adm.Interface.GReaderWindowsLoginsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type WindowsLoginsDto = Gordic.Adm.Interface.GReaderWindowsLoginsDto;
    type WindowsLoginsDtoNames = Gordic.Adm.Interface.GReaderWindowsLoginsDtoNames;
    type WindowsLoginsDtoFragments = Gordic.Adm.Interface.GReaderWindowsLoginsDtoFragments;
    type WindowsLoginsDtoTypes = Gordic.Adm.Interface.GReaderWindowsLoginsDtoTypes;
    type WindowsLoginsDtoTypeLengths = Gordic.Adm.Interface.GReaderWindowsLoginsDtoTypeLengths;

    /**
    * Klientská část AL - číselník Skartace pozastavena
    * keys: ["priz_ess"]
    * columns: ["priz_ess","priz_ess_txt"]
    * filters: [""]
    */
    class Intcpes extends Base<Gordic.Adm.Interface.GIntcpesDto>
    {
        constructor(options?: IGReaderBase);
    }
    type IntcpesDto = Gordic.Adm.Interface.GIntcpesDto;
    type IntcpesDtoNames = Gordic.Adm.Interface.GIntcpesDtoNames;
    type IntcpesDtoFragments = Gordic.Adm.Interface.GIntcpesDtoFragments;
    type IntcpesDtoTypes = Gordic.Adm.Interface.GIntcpesDtoTypes;
    type IntcpesDtoTypeLengths = Gordic.Adm.Interface.GIntcpesDtoTypeLengths;

    /**
    * Klientská část Gdesslo
    * keys: ["tabulka","sloupec"]
    * columns: ["tabulka","sloupec"]
    * filters: ["tabulka","sloupec","aktivita"]
    */
    class AdmGdesslo extends Base<Gordic.Adm.Interface.GAdmGdessloDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGdessloDto = Gordic.Adm.Interface.GAdmGdessloDto;
    type AdmGdessloDtoNames = Gordic.Adm.Interface.GAdmGdessloDtoNames;
    type AdmGdessloDtoFragments = Gordic.Adm.Interface.GAdmGdessloDtoFragments;
    type AdmGdessloDtoTypes = Gordic.Adm.Interface.GAdmGdessloDtoTypes;
    type AdmGdessloDtoTypeLengths = Gordic.Adm.Interface.GAdmGdessloDtoTypeLengths;

    /**
    * Klientská část Gdestab
    * keys: ["tabulka"]
    * columns: ["tabulka"]
    * filters: ["tabulka","aktivita"]
    */
    class AdmGdestab extends Base<Gordic.Adm.Interface.GAdmGdestabDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGdestabDto = Gordic.Adm.Interface.GAdmGdestabDto;
    type AdmGdestabDtoNames = Gordic.Adm.Interface.GAdmGdestabDtoNames;
    type AdmGdestabDtoFragments = Gordic.Adm.Interface.GAdmGdestabDtoFragments;
    type AdmGdestabDtoTypes = Gordic.Adm.Interface.GAdmGdestabDtoTypes;
    type AdmGdestabDtoTypeLengths = Gordic.Adm.Interface.GAdmGdestabDtoTypeLengths;

    /**
    * Klientská část Gdevpra
    * keys: ["pravidlo_id","tabulka","sloupec"]
    * columns: ["pravidlo_id","tabulka","sloupec","aktivita"]
    * filters: ["pravidlo_id","tabulka","sloupec","aktivita"]
    */
    class AdmGdevpra extends Base<Gordic.Adm.Interface.GAdmGdevpraDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmGdevpraDto = Gordic.Adm.Interface.GAdmGdevpraDto;
    type AdmGdevpraDtoNames = Gordic.Adm.Interface.GAdmGdevpraDtoNames;
    type AdmGdevpraDtoFragments = Gordic.Adm.Interface.GAdmGdevpraDtoFragments;
    type AdmGdevpraDtoTypes = Gordic.Adm.Interface.GAdmGdevpraDtoTypes;
    type AdmGdevpraDtoTypeLengths = Gordic.Adm.Interface.GAdmGdevpraDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_dk"]
    * columns: ["typ_dk","typ_dk_txt","k_v","k_s"]
    * filters: ["typ_dk"]
    */
    class AdmRakcden extends Base<Gordic.Adm.Interface.GRakcdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmRakcdenDto = Gordic.Adm.Interface.GRakcdenDto;
    type AdmRakcdenDtoNames = Gordic.Adm.Interface.GRakcdenDtoNames;
    type AdmRakcdenDtoFragments = Gordic.Adm.Interface.GRakcdenDtoFragments;
    type AdmRakcdenDtoTypes = Gordic.Adm.Interface.GRakcdenDtoTypes;
    type AdmRakcdenDtoTypeLengths = Gordic.Adm.Interface.GRakcdenDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixp_den"]
    * columns: ["ixp_den","nazev","zkratka","poznamka"]
    * filters: ["ixp_den"]
    */
    class AdmRaksden extends Base<Gordic.Adm.Interface.GRaksdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmRaksdenDto = Gordic.Adm.Interface.GRaksdenDto;
    type AdmRaksdenDtoNames = Gordic.Adm.Interface.GRaksdenDtoNames;
    type AdmRaksdenDtoFragments = Gordic.Adm.Interface.GRaksdenDtoFragments;
    type AdmRaksdenDtoTypes = Gordic.Adm.Interface.GRaksdenDtoTypes;
    type AdmRaksdenDtoTypeLengths = Gordic.Adm.Interface.GRaksdenDtoTypeLengths;

    /**
    * Klientská část AL - číselník Forma dokumentu
    * keys: ["stav_uzav"]
    * columns: ["stav_uzav","stav_uzav_txt","k_v","k_s","stav_uzav_rsx"]
    * filters: ["stav_uzav"]
    */
    class AdmSslcstu extends Base<Gordic.Adm.Interface.GSslcstuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSslcstuDto = Gordic.Adm.Interface.GSslcstuDto;
    type AdmSslcstuDtoNames = Gordic.Adm.Interface.GSslcstuDtoNames;
    type AdmSslcstuDtoFragments = Gordic.Adm.Interface.GSslcstuDtoFragments;
    type AdmSslcstuDtoTypes = Gordic.Adm.Interface.GSslcstuDtoTypes;
    type AdmSslcstuDtoTypeLengths = Gordic.Adm.Interface.GSslcstuDtoTypeLengths;

    /**
    * Klientská část AL - Způsob přidělení ČJ
    * keys: ["zpus_prid_cj"]
    * columns: ["zpus_prid_cj","zpus_prid_cj_txt","k_v","k_s"]
    * filters: ["zpus_prid_cj"]
    */
    class AdmSslczpc extends Base<Gordic.Adm.Interface.GSslczpcDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSslczpcDto = Gordic.Adm.Interface.GSslczpcDto;
    type AdmSslczpcDtoNames = Gordic.Adm.Interface.GSslczpcDtoNames;
    type AdmSslczpcDtoFragments = Gordic.Adm.Interface.GSslczpcDtoFragments;
    type AdmSslczpcDtoTypes = Gordic.Adm.Interface.GSslczpcDtoTypes;
    type AdmSslczpcDtoTypeLengths = Gordic.Adm.Interface.GSslczpcDtoTypeLengths;

    /**
    * Klientská část AL - číselník Rok deníku ssl
    * keys: ["sslden","rok"]
    * columns: ["sslden","rok","dat_zmena","zmenu_prov"]
    * filters: ["sslden","rok"]
    */
    class AdmSsldden extends Base<Gordic.Adm.Interface.GSslddenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSslddenDto = Gordic.Adm.Interface.GSslddenDto;
    type AdmSslddenDtoNames = Gordic.Adm.Interface.GSslddenDtoNames;
    type AdmSslddenDtoFragments = Gordic.Adm.Interface.GSslddenDtoFragments;
    type AdmSslddenDtoTypes = Gordic.Adm.Interface.GSslddenDtoTypes;
    type AdmSslddenDtoTypeLengths = Gordic.Adm.Interface.GSslddenDtoTypeLengths;

    /**
    * Klientská část AL - číselník Forma dokumentu
    * keys: ["priz_fyz"]
    * columns: ["priz_fyz","priz_fyz_txt","k_v","k_s","priz_fyz_rsx"]
    * filters: ["priz_fyz","priz_fyz_txt","k_v","k_s","priz_fyz_rsx"]
    */
    class Sslcpfy extends Base<Gordic.Adm.Interface.GReaderSslcpfyDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SslcpfyDto = Gordic.Adm.Interface.GReaderSslcpfyDto;
    type SslcpfyDtoNames = Gordic.Adm.Interface.GReaderSslcpfyDtoNames;
    type SslcpfyDtoFragments = Gordic.Adm.Interface.GReaderSslcpfyDtoFragments;
    type SslcpfyDtoTypes = Gordic.Adm.Interface.GReaderSslcpfyDtoTypes;
    type SslcpfyDtoTypeLengths = Gordic.Adm.Interface.GReaderSslcpfyDtoTypeLengths;

    /**
    * Klientská část AL - číselník Určení spis.znaku
    * keys: ["urceni_spis_z"]
    * columns: ["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]
    * filters: ["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]
    */
    class Sslcusz extends Base<Gordic.Adm.Interface.GReaderSslcuszDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SslcuszDto = Gordic.Adm.Interface.GReaderSslcuszDto;
    type SslcuszDtoNames = Gordic.Adm.Interface.GReaderSslcuszDtoNames;
    type SslcuszDtoFragments = Gordic.Adm.Interface.GReaderSslcuszDtoFragments;
    type SslcuszDtoTypes = Gordic.Adm.Interface.GReaderSslcuszDtoTypes;
    type SslcuszDtoTypeLengths = Gordic.Adm.Interface.GReaderSslcuszDtoTypeLengths;

    /**
    * Klientská část AL - číselník Deník SSL
    * keys: ["sslden"]
    * columns: ["sslden","aktivita","nazev"]
    * filters: ["sslden","aktivita","nazev"]
    */
    class AdmSslsden extends Base<Gordic.Adm.Interface.GReaderSslsdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSslsdenDto = Gordic.Adm.Interface.GReaderSslsdenDto;
    type AdmSslsdenDtoNames = Gordic.Adm.Interface.GReaderSslsdenDtoNames;
    type AdmSslsdenDtoFragments = Gordic.Adm.Interface.GReaderSslsdenDtoFragments;
    type AdmSslsdenDtoTypes = Gordic.Adm.Interface.GReaderSslsdenDtoTypes;
    type AdmSslsdenDtoTypeLengths = Gordic.Adm.Interface.GReaderSslsdenDtoTypeLengths;

    /**
    * Klientská část AL - číselník Spisový plán
    * keys: ["spis_pl"]
    * columns: ["spis_pl","aktivita","nazev"]
    * filters: ["spis_pl","aktivita"]
    */
    class AdmSslsspl extends Base<Gordic.Adm.Interface.GReaderSslssplDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSslssplDto = Gordic.Adm.Interface.GReaderSslssplDto;
    type AdmSslssplDtoNames = Gordic.Adm.Interface.GReaderSslssplDtoNames;
    type AdmSslssplDtoFragments = Gordic.Adm.Interface.GReaderSslssplDtoFragments;
    type AdmSslssplDtoTypes = Gordic.Adm.Interface.GReaderSslssplDtoTypes;
    type AdmSslssplDtoTypeLengths = Gordic.Adm.Interface.GReaderSslssplDtoTypeLengths;

    /**
    * Klientská část AL - číselník Spisový znak
    * keys: ["spis_pl","spis_znak"]
    * columns: ["spis_pl", "spis_znak", "aktivita", "nazev", "spis_znak_pod_next", "ixs_skr"]
    * filters: ["spis_pl","spis_znak","aktivita","ComputeNextChildSpisZnak"]
    */
    class AdmSslsspz extends Base<Gordic.Adm.Interface.GReaderAdmSslsspzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmSslsspzDto = Gordic.Adm.Interface.GReaderAdmSslsspzDto;
    type AdmSslsspzDtoNames = Gordic.Adm.Interface.GReaderAdmSslsspzDtoNames;
    type AdmSslsspzDtoFragments = Gordic.Adm.Interface.GReaderAdmSslsspzDtoFragments;
    type AdmSslsspzDtoTypes = Gordic.Adm.Interface.GReaderAdmSslsspzDtoTypes;
    type AdmSslsspzDtoTypeLengths = Gordic.Adm.Interface.GReaderAdmSslsspzDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_gra"]
    * columns: ["typ_gra","typ_gra_txt","k_v","k_s"]
    * filters: ["typ_gra"]
    */
    class AdmWflcgra extends Base<Gordic.Adm.Interface.GWflcgraDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcgraDto = Gordic.Adm.Interface.GWflcgraDto;
    type AdmWflcgraDtoNames = Gordic.Adm.Interface.GWflcgraDtoNames;
    type AdmWflcgraDtoFragments = Gordic.Adm.Interface.GWflcgraDtoFragments;
    type AdmWflcgraDtoTypes = Gordic.Adm.Interface.GWflcgraDtoTypes;
    type AdmWflcgraDtoTypeLengths = Gordic.Adm.Interface.GWflcgraDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ktg_zp_dor"]
    * columns: ["ktg_zp_dor","ktg_zp_dor_txt"]
    * filters: ["ktg_zp_dor"]
    */
    class AdmWflckzd extends Base<Gordic.Adm.Interface.GWflckzdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflckzdDto = Gordic.Adm.Interface.GWflckzdDto;
    type AdmWflckzdDtoNames = Gordic.Adm.Interface.GWflckzdDtoNames;
    type AdmWflckzdDtoFragments = Gordic.Adm.Interface.GWflckzdDtoFragments;
    type AdmWflckzdDtoTypes = Gordic.Adm.Interface.GWflckzdDtoTypes;
    type AdmWflckzdDtoTypeLengths = Gordic.Adm.Interface.GWflckzdDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_ltv"]
    * columns: ["typ_ltv","typ_ltv_txt"]
    * filters: ["typ_ltv"]
    */
    class AdmWflcltv extends Base<Gordic.Adm.Interface.GWflcltvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcltvDto = Gordic.Adm.Interface.GWflcltvDto;
    type AdmWflcltvDtoNames = Gordic.Adm.Interface.GWflcltvDtoNames;
    type AdmWflcltvDtoFragments = Gordic.Adm.Interface.GWflcltvDtoFragments;
    type AdmWflcltvDtoTypes = Gordic.Adm.Interface.GWflcltvDtoTypes;
    type AdmWflcltvDtoTypeLengths = Gordic.Adm.Interface.GWflcltvDtoTypeLengths;

    /**
    * Klientská část AL - číselník Operace zveřejnění
    * keys: ["operace"]
    * columns: ["operace","operace_txt","k_v","k_s"]
    * filters: ["operace"]
    */
    class AdmWflcozv extends Base<Gordic.Adm.Interface.GWflcozvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcozvDto = Gordic.Adm.Interface.GWflcozvDto;
    type AdmWflcozvDtoNames = Gordic.Adm.Interface.GWflcozvDtoNames;
    type AdmWflcozvDtoFragments = Gordic.Adm.Interface.GWflcozvDtoFragments;
    type AdmWflcozvDtoTypes = Gordic.Adm.Interface.GWflcozvDtoTypes;
    type AdmWflcozvDtoTypeLengths = Gordic.Adm.Interface.GWflcozvDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_kvcrt"]
    * columns: ["priz_kvcrt","priz_kvcrt_txt"]
    * filters: ["priz_kvcrt"]
    */
    class AdmWflcpkv extends Base<Gordic.Adm.Interface.GWflcpkvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcpkvDto = Gordic.Adm.Interface.GWflcpkvDto;
    type AdmWflcpkvDtoNames = Gordic.Adm.Interface.GWflcpkvDtoNames;
    type AdmWflcpkvDtoFragments = Gordic.Adm.Interface.GWflcpkvDtoFragments;
    type AdmWflcpkvDtoTypes = Gordic.Adm.Interface.GWflcpkvDtoTypes;
    type AdmWflcpkvDtoTypeLengths = Gordic.Adm.Interface.GWflcpkvDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_spis"]
    * columns: ["priz_spis","priz_spis_txt","k_v","k_s","k_xml","priz_spis_rsx"]
    * filters: ["priz_spis"]
    */
    class AdmWflcpri extends Base<Gordic.Adm.Interface.GWflcpriDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcpriDto = Gordic.Adm.Interface.GWflcpriDto;
    type AdmWflcpriDtoNames = Gordic.Adm.Interface.GWflcpriDtoNames;
    type AdmWflcpriDtoFragments = Gordic.Adm.Interface.GWflcpriDtoFragments;
    type AdmWflcpriDtoTypes = Gordic.Adm.Interface.GWflcpriDtoTypes;
    type AdmWflcpriDtoTypeLengths = Gordic.Adm.Interface.GWflcpriDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_podp"]
    * columns: ["priz_podp","priz_podp_txt"]
    * filters: ["priz_podp"]
    */
    class AdmWflcprp extends Base<Gordic.Adm.Interface.GWflcprpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcprpDto = Gordic.Adm.Interface.GWflcprpDto;
    type AdmWflcprpDtoNames = Gordic.Adm.Interface.GWflcprpDtoNames;
    type AdmWflcprpDtoFragments = Gordic.Adm.Interface.GWflcprpDtoFragments;
    type AdmWflcprpDtoTypes = Gordic.Adm.Interface.GWflcprpDtoTypes;
    type AdmWflcprpDtoTypeLengths = Gordic.Adm.Interface.GWflcprpDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_ts"]
    * columns: ["priz_ts","priz_ts_txt"]
    * filters: ["priz_ts"]
    */
    class AdmWflcpts extends Base<Gordic.Adm.Interface.GWflcptsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcptsDto = Gordic.Adm.Interface.GWflcptsDto;
    type AdmWflcptsDtoNames = Gordic.Adm.Interface.GWflcptsDtoNames;
    type AdmWflcptsDtoFragments = Gordic.Adm.Interface.GWflcptsDtoFragments;
    type AdmWflcptsDtoTypes = Gordic.Adm.Interface.GWflcptsDtoTypes;
    type AdmWflcptsDtoTypeLengths = Gordic.Adm.Interface.GWflcptsDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["poz_viz_podp"]
    * columns: ["poz_viz_podp","poz_viz_podp_txt"]
    * filters: ["poz_viz_podp"]
    */
    class AdmWflcpvp extends Base<Gordic.Adm.Interface.GWflcpvpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcpvpDto = Gordic.Adm.Interface.GWflcpvpDto;
    type AdmWflcpvpDtoNames = Gordic.Adm.Interface.GWflcpvpDtoNames;
    type AdmWflcpvpDtoFragments = Gordic.Adm.Interface.GWflcpvpDtoFragments;
    type AdmWflcpvpDtoTypes = Gordic.Adm.Interface.GWflcpvpDtoTypes;
    type AdmWflcpvpDtoTypeLengths = Gordic.Adm.Interface.GWflcpvpDtoTypeLengths;

    /**
    * Klientská část AL - číselník Režim řízení
    * keys: ["rezim_sch"]
    * columns: ["rezim_sch","rezim_sch_zkr","rezim_sch_txt","k_v","k_s","aktivita"]
    * filters: ["rezim_sch","aktivita"]
    */
    class AdmWflcrsp extends Base<Gordic.Adm.Interface.GWflcrspDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcrspDto = Gordic.Adm.Interface.GWflcrspDto;
    type AdmWflcrspDtoNames = Gordic.Adm.Interface.GWflcrspDtoNames;
    type AdmWflcrspDtoFragments = Gordic.Adm.Interface.GWflcrspDtoFragments;
    type AdmWflcrspDtoTypes = Gordic.Adm.Interface.GWflcrspDtoTypes;
    type AdmWflcrspDtoTypeLengths = Gordic.Adm.Interface.GWflcrspDtoTypeLengths;

    /**
    * Klientská část AL - číselník Stránka podpisu
    * keys: ["str_viz_podp"]
    * columns: ["str_viz_podp","str_viz_podp_txt","k_v","k_s"]
    * filters: ["str_viz_podp"]
    */
    class AdmWflcsvp extends Base<Gordic.Adm.Interface.GWflcsvpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcsvpDto = Gordic.Adm.Interface.GWflcsvpDto;
    type AdmWflcsvpDtoNames = Gordic.Adm.Interface.GWflcsvpDtoNames;
    type AdmWflcsvpDtoFragments = Gordic.Adm.Interface.GWflcsvpDtoFragments;
    type AdmWflcsvpDtoTypes = Gordic.Adm.Interface.GWflcsvpDtoTypes;
    type AdmWflcsvpDtoTypeLengths = Gordic.Adm.Interface.GWflcsvpDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_dok_zaz"]
    * columns: ["typ_dok_zaz","typ_dok_zaz_txt","k_v","k_s"]
    * filters: ["typ_dok_zaz"]
    */
    class AdmWflctdz extends Base<Gordic.Adm.Interface.GWflctdzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflctdzDto = Gordic.Adm.Interface.GWflctdzDto;
    type AdmWflctdzDtoNames = Gordic.Adm.Interface.GWflctdzDtoNames;
    type AdmWflctdzDtoFragments = Gordic.Adm.Interface.GWflctdzDtoFragments;
    type AdmWflctdzDtoTypes = Gordic.Adm.Interface.GWflctdzDtoTypes;
    type AdmWflctdzDtoTypeLengths = Gordic.Adm.Interface.GWflctdzDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_krok"]
    * columns: ["typ_krok","typ_krok_txt","k_v","k_s","typ_krok_rsx"]
    * filters: ["typ_krok"]
    */
    class AdmWflctkr extends Base<Gordic.Adm.Interface.GWflctkrDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflctkrDto = Gordic.Adm.Interface.GWflctkrDto;
    type AdmWflctkrDtoNames = Gordic.Adm.Interface.GWflctkrDtoNames;
    type AdmWflctkrDtoFragments = Gordic.Adm.Interface.GWflctkrDtoFragments;
    type AdmWflctkrDtoTypes = Gordic.Adm.Interface.GWflctkrDtoTypes;
    type AdmWflctkrDtoTypeLengths = Gordic.Adm.Interface.GWflctkrDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_subj"]
    * columns: ["typ_subj", "typ_subj_txt"]
    * filters: ["typ_subj"]
    */
    class AdmWflctsu extends Base<Gordic.Adm.Interface.GWflctsuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflctsuDto = Gordic.Adm.Interface.GWflctsuDto;
    type AdmWflctsuDtoNames = Gordic.Adm.Interface.GWflctsuDtoNames;
    type AdmWflctsuDtoFragments = Gordic.Adm.Interface.GWflctsuDtoFragments;
    type AdmWflctsuDtoTypes = Gordic.Adm.Interface.GWflctsuDtoTypes;
    type AdmWflctsuDtoTypeLengths = Gordic.Adm.Interface.GWflctsuDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ_viz_podpis"]
    * columns: ["typ_viz_podpis","typ_viz_podpis_txt"]
    * filters: ["typ_viz_podpis"]
    */
    class AdmWflctvp extends Base<Gordic.Adm.Interface.GWflctvpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflctvpDto = Gordic.Adm.Interface.GWflctvpDto;
    type AdmWflctvpDtoNames = Gordic.Adm.Interface.GWflctvpDtoNames;
    type AdmWflctvpDtoFragments = Gordic.Adm.Interface.GWflctvpDtoFragments;
    type AdmWflctvpDtoTypes = Gordic.Adm.Interface.GWflctvpDtoTypes;
    type AdmWflctvpDtoTypeLengths = Gordic.Adm.Interface.GWflctvpDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["typ"]
    * columns: ["typ", "typ_txt"]
    * filters: ["typ"]
    */
    class AdmWflctyp extends Base<Gordic.Adm.Interface.GWflctypDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflctypDto = Gordic.Adm.Interface.GWflctypDto;
    type AdmWflctypDtoNames = Gordic.Adm.Interface.GWflctypDtoNames;
    type AdmWflctypDtoFragments = Gordic.Adm.Interface.GWflctypDtoFragments;
    type AdmWflctypDtoTypes = Gordic.Adm.Interface.GWflctypDtoTypes;
    type AdmWflctypDtoTypeLengths = Gordic.Adm.Interface.GWflctypDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["uroven_prist"]
    * columns: ["uroven_prist","uroven_prist_txt"]
    * filters: ["uroven_prist"]
    */
    class AdmWflcupr extends Base<Gordic.Ginis.DbModel.GWflcuprDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcuprDto = Gordic.Ginis.DbModel.GWflcuprDto;
    type AdmWflcuprDtoNames = Gordic.Ginis.DbModel.GWflcuprDtoNames;
    type AdmWflcuprDtoFragments = Gordic.Ginis.DbModel.GWflcuprDtoFragments;
    type AdmWflcuprDtoTypes = Gordic.Ginis.DbModel.GWflcuprDtoTypes;
    type AdmWflcuprDtoTypeLengths = Gordic.Ginis.DbModel.GWflcuprDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["priz_wsl"]
    * columns: ["priz_wsl","priz_wsl_txt"]
    * filters: ["priz_wsl"]
    */
    class AdmWflcwsl extends Base<Gordic.Adm.Interface.GWflcwslDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflcwslDto = Gordic.Adm.Interface.GWflcwslDto;
    type AdmWflcwslDtoNames = Gordic.Adm.Interface.GWflcwslDtoNames;
    type AdmWflcwslDtoFragments = Gordic.Adm.Interface.GWflcwslDtoFragments;
    type AdmWflcwslDtoTypes = Gordic.Adm.Interface.GWflcwslDtoTypes;
    type AdmWflcwslDtoTypeLengths = Gordic.Adm.Interface.GWflcwslDtoTypeLengths;

    /**
    * Klientská část AL - číselník Kategorie zveřejnění
    * keys: ["ktg_zve"]
    * columns: ["ktg_zve","ktg_zve_txt","k_v","k_s","aktivita"]
    * filters: ["ktg_zve","aktivita"]
    */
    class AdmWflczve extends Base<Gordic.Adm.Interface.GWflczveDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflczveDto = Gordic.Adm.Interface.GWflczveDto;
    type AdmWflczveDtoNames = Gordic.Adm.Interface.GWflczveDtoNames;
    type AdmWflczveDtoFragments = Gordic.Adm.Interface.GWflczveDtoFragments;
    type AdmWflczveDtoTypes = Gordic.Adm.Interface.GWflczveDtoTypes;
    type AdmWflczveDtoTypeLengths = Gordic.Adm.Interface.GWflczveDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_blk"]
    * columns: ["ixs_blk","nazev","poznamka","dat_od","dat_do","typ","typ_subj"]
    * filters: ["ixs_blk","typ","typ_subj","aktivita","pouzePlatne"]
    */
    class AdmWflsblk extends Base<Gordic.Adm.Interface.GWflsblkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflsblkDto = Gordic.Adm.Interface.GWflsblkDto;
    type AdmWflsblkDtoNames = Gordic.Adm.Interface.GWflsblkDtoNames;
    type AdmWflsblkDtoFragments = Gordic.Adm.Interface.GWflsblkDtoFragments;
    type AdmWflsblkDtoTypes = Gordic.Adm.Interface.GWflsblkDtoTypes;
    type AdmWflsblkDtoTypeLengths = Gordic.Adm.Interface.GWflsblkDtoTypeLengths;

    /**
    * Klientská část AL - číselník Elektronické certifikáty
    * keys: ["ixs_cer"]
    * columns: ["jmeno_txt"]
    * filters: ["ixs_cer","priz_int","aktivita","pouze_platne"]
    */
    class AdmWflscer extends Base<Gordic.Adm.Interface.GWflscerExtDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflscerDto = Gordic.Adm.Interface.GWflscerExtDto;
    type AdmWflscerDtoNames = Gordic.Adm.Interface.GWflscerExtDtoNames;
    type AdmWflscerDtoFragments = Gordic.Adm.Interface.GWflscerExtDtoFragments;
    type AdmWflscerDtoTypes = Gordic.Adm.Interface.GWflscerExtDtoTypes;
    type AdmWflscerDtoTypeLengths = Gordic.Adm.Interface.GWflscerExtDtoTypeLengths;

    /**
    * Klientská část AL
    * keys: ["ixs_slo"]
    * columns: ["ixs_slo","nazev","mailbox","typ_slo_upvs"]
    * filters: ["ixs_slo","aktivita"]
    */
    class AdmWflsssk extends Base<Gordic.Adm.Interface.GWflssskDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflssskDto = Gordic.Adm.Interface.GWflssskDto;
    type AdmWflssskDtoNames = Gordic.Adm.Interface.GWflssskDtoNames;
    type AdmWflssskDtoFragments = Gordic.Adm.Interface.GWflssskDtoFragments;
    type AdmWflssskDtoTypes = Gordic.Adm.Interface.GWflssskDtoTypes;
    type AdmWflssskDtoTypeLengths = Gordic.Adm.Interface.GWflssskDtoTypeLengths;

    /**
    * Klientská část AL - číselník Příznak doručenky
    * keys: ["priz_doruc"]
    * columns: ["priz_doruc","priz_doruc_txt","k_v","k_s","k_xml","priz_doruc_rsx"]
    * filters: ["priz_doruc"]
    */
    class Wflcpdo extends Base<Gordic.Adm.Interface.GReaderWflcpdoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type WflcpdoDto = Gordic.Adm.Interface.GReaderWflcpdoDto;
    type WflcpdoDtoNames = Gordic.Adm.Interface.GReaderWflcpdoDtoNames;
    type WflcpdoDtoFragments = Gordic.Adm.Interface.GReaderWflcpdoDtoFragments;
    type WflcpdoDtoTypes = Gordic.Adm.Interface.GReaderWflcpdoDtoTypes;
    type WflcpdoDtoTypeLengths = Gordic.Adm.Interface.GReaderWflcpdoDtoTypeLengths;

    /**
    * Klientská část AL - číselník Skartace pozastavena
    * keys: ["priz_poz_skar"]
    * columns: ["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]
    * filters: ["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]
    */
    class Wflcpso extends Base<Gordic.Adm.Interface.GReaderWflcpsoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type WflcpsoDto = Gordic.Adm.Interface.GReaderWflcpsoDto;
    type WflcpsoDtoNames = Gordic.Adm.Interface.GReaderWflcpsoDtoNames;
    type WflcpsoDtoFragments = Gordic.Adm.Interface.GReaderWflcpsoDtoFragments;
    type WflcpsoDtoTypes = Gordic.Adm.Interface.GReaderWflcpsoDtoTypes;
    type WflcpsoDtoTypeLengths = Gordic.Adm.Interface.GReaderWflcpsoDtoTypeLengths;

    /**
    * Klientská část AL - číselník Certifikační autorita
    * keys: ["ixs_cau"]
    * columns: ["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"]
    * filters: ["ixs_cau","jmeno","id_cert","otisk","aktivita"]
    */
    class Wflscau extends Base<Gordic.Adm.Interface.GReaderWflscauDto>
    {
        constructor(options?: IGReaderBase);
    }
    type WflscauDto = Gordic.Adm.Interface.GReaderWflscauDto;
    type WflscauDtoNames = Gordic.Adm.Interface.GReaderWflscauDtoNames;
    type WflscauDtoFragments = Gordic.Adm.Interface.GReaderWflscauDtoFragments;
    type WflscauDtoTypes = Gordic.Adm.Interface.GReaderWflscauDtoTypes;
    type WflscauDtoTypeLengths = Gordic.Adm.Interface.GReaderWflscauDtoTypeLengths;

    /**
    * Klientská část AL - číselník Oblíbená kombinace poštovních služeb
    * keys: ["komb_sluzeb"]
    * columns: ["komb_sluzeb", "komb_sluzeb_txt", "aktivita", "dat_zmena", "zmenu_prov", "filtr_format"]
    * filters: ["komb_sluzeb"]
    */
    class AdmWflsksl extends Base<Gordic.Adm.Interface.GWflskslDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdmWflskslDto = Gordic.Adm.Interface.GWflskslDto;
    type AdmWflskslDtoNames = Gordic.Adm.Interface.GWflskslDtoNames;
    type AdmWflskslDtoFragments = Gordic.Adm.Interface.GWflskslDtoFragments;
    type AdmWflskslDtoTypes = Gordic.Adm.Interface.GWflskslDtoTypes;
    type AdmWflskslDtoTypeLengths = Gordic.Adm.Interface.GWflskslDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klientská část AL - číselník Typ pohledávky
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["typ_phl"]
    * columns: ["typ_phl","nazev","aktivita"]
    * filters: ["typ_phl","aktivita"]
    */
    function adeDdpstpp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GDdpstppDto>): GSelectBoxOptions<Gordic.Adm.Interface.GDdpstppDto>;
    /**
    * Klientská část AL - číselník Viditelnost seskupení
    * FieldOptions
    * itemTemplate: "{priz_osv_txt}"
    * helperColumns: ["priz_osv_txt"]
    *
    * DataReader
    * keys: ["priz_osv"]
    * columns: ["priz_osv","priz_osv_txt","k_v","k_s"]
    * filters: ["priz_osv"]
    */
    function adeEkocpov(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkocpovDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkocpovDto>;
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "{priz_kom_txt}"
    * helperColumns: ["priz_kom_txt"]
    *
    * DataReader
    * keys: ["priz_kom"]
    * columns: ["priz_kom","priz_kom_txt","k_v","k_s"]
    * filters: ["priz_kom"]
    */
    function adeEkocprk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkocprkDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkocprkDto>;
    /**
    * Klientská část AL - číselník Řád pořizování rozpočtu
    * FieldOptions
    * itemTemplate: "{priz_rpr_txt}"
    * helperColumns: ["priz_rpr_txt"]
    *
    * DataReader
    * keys: ["priz_rpr"]
    * columns: ["priz_rpr","priz_rpr_txt","k_v","k_s"]
    * filters: ["priz_rpr"]
    */
    function adeEkocrpr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkocrprDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkocrprDto>;
    /**
    * Klientská část AL - číselník Typy elementů seskupení
    * FieldOptions
    * itemTemplate: "{typ_elem_txt}"
    * helperColumns: ["typ_elem_txt"]
    *
    * DataReader
    * keys: ["typ_elem"]
    * columns: ["typ_elem","typ_elem_txt","k_v","k_s"]
    * filters: ["typ_elem"]
    */
    function adeEkoctel(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkoctelDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkoctelDto>;
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "{typ_ose_txt:trim:encode}"
    * helperColumns: ["typ_ose_txt"]
    *
    * DataReader
    * keys: ["typ_ose"]
    * columns: ["typ_ose","typ_ose_txt","k_v","k_s","aktivita"]
    * filters: ["typ_ose","aktivita"]
    */
    function adeEkoctyg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkoctygDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkoctygDto>;
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "{typ_ose_txt}"
    * helperColumns: ["typ_ose_txt"]
    *
    * DataReader
    * keys: ["typ_ose"]
    * columns: ["typ_ose","typ_ose_txt","k_v","k_s","aktivita"]
    * filters: ["typ_ose","aktivita"]
    */
    function adeEkoctyo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkoctyoDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkoctyoDto>;
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "<b>{nazev} ({agenda})</b><br><i>jres:23920034: {rok} | jres:33000014: {stav_txt} | jres:23920027: {ico}</i>"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den","ico","nazev","rok","aktivita","agenda","stav_txt", "ucs"]
    * filters: ["ixp_den","aktivita","ico","rok","ucs","GpcIcoOrSharedIco","IcoOrSharedIco"]
    */
    function adeEkoKniha(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adx.Interface.GEkoKnihaDto>): GSelectBoxOptions<Gordic.Adx.Interface.GEkoKnihaDto>;
    /**
    * Klientská část AL - číselník Kategorie seskupení
    * FieldOptions
    * itemTemplate: "<b>{nazev:trim:encode}</b> | {max_typ_ose_txt:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_kto"]
    * columns: ["ixs_kto", "nazev", "zkratka", "poznamka", "aktivita", "dat_zmena", "zmenu_prov", "max_typ_ose","max_typ_ose_txt","rokmes_od","rokmes_do"]
    * filters: ["ixs_kto","aktivita"]
    */
    function adeEkoskto(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkosktoExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkosktoExtDto>;
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "{nks} - {nazev}"
    * helperColumns: ["nks", "nazev"]
    *
    * DataReader
    * keys: ["ico","nks"]
    * columns: ["ico","nks","nazev","aktivita"]
    * filters: ["aktivita","funkcniMistoUcs"]
    */
    function adeEkosnks(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkosnksDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkosnksDto>;
    /**
    * Klientská část AL - číselník Typ funkce
    * FieldOptions
    * itemTemplate: (row) => {
		let result = "";
		result += "<b>{0}</b> | jres:29925969: {1}".format(row.nazev, (row.ixs_kto_txt ? row.ixs_kto_txt : "<i>jres:33000008</i>"));
		return result;
	}
    * helperColumns: ["nazev", "ixs_kto_txt", "poznamka", "ixs_ose"]
    *
    * DataReader
    * keys: ["ixs_ose"]
    * columns: ["ixs_ose", "ixs_kto_txt", "nazev", "poznamka", "dat_od", "dat_do"]
    * filters: ["ixs_ose","typ_ose","aktivita"]
    */
    function adeEkosose(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkososeExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkososeExtDto>;
    /**
    * Klientská část AL - číselník Aktivita subřady
    * FieldOptions
    * itemTemplate: "{rezim_real_txt}"
    * helperColumns: ["rezim_real_txt"]
    *
    * DataReader
    * keys: ["rezim_real"]
    * columns: ["rezim_real","rezim_real_txt","k_v","k_s"]
    * filters: ["rezim_real"]
    */
    function adeSrvcrre(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvcrreDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvcrreDto>;
    /**
    * Klientská část AL - číselník Způsob schvalování
    * FieldOptions
    * itemTemplate: "{typ_spec_txt}"
    * helperColumns: ["typ_spec_txt"]
    *
    * DataReader
    * keys: ["typ_spec"]
    * columns: ["typ_spec","typ_spec_txt","k_v","k_s"]
    * filters: ["typ_spec"]
    */
    function adeSrvctsp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvctspDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvctspDto>;
    /**
    * Klientská část AL - číselník Zdroj dokumentů
    * FieldOptions
    * itemTemplate: "{zdroj_dok_txt}"
    * helperColumns: ["zdroj_dok_txt"]
    *
    * DataReader
    * keys: ["zdroj_dok"]
    * columns: ["zdroj_dok","zdroj_dok_txt","k_v","k_s"]
    * filters: ["zdroj_dok"]
    */
    function adeSrvczdd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvczddDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvczddDto>;
    /**
    * Klientská část AL - číselník Způsob schvalování
    * FieldOptions
    * itemTemplate: "{zpusob_schv_txt}"
    * helperColumns: ["zpusob_schv_txt"]
    *
    * DataReader
    * keys: ["zpusob_schv"]
    * columns: ["zpusob_schv","zpusob_schv_txt","k_v","k_s"]
    * filters: ["zpusob_schv"]
    */
    function adeSrvczps(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvczpsDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvczpsDto>;
    /**
    * Klientská část AL - číselník Oblasti limitů
    * FieldOptions
    * itemTemplate: "jres:33000031: <b>{id_tzd_txt}</b> | jres:33000032: <b>{id_vyb_txt}</b> | jres:33000033: <b>{id_eds_txt}</b> <br /> jres:23920039: <b>{ico}</b> | jres:23920034: <b>{rok}</b>"
    * helperColumns: ["id_tzd_txt", "id_vyb_txt", "id_eds_txt", "rok", "ico"]
    *
    * DataReader
    * keys: ["ico","rok","id_tzd","id_vyb","id_eds"]
    * columns: ["ico","rok","id_tzd","id_vyb","id_eds","id_tzd_txt","id_vyb_txt","id_eds_txt","aktivita"]
    * filters: ["ico","rok","id_tzd","id_vyb","id_eds","aktivita"]
    */
    function adeSrvsobl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvsoblExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvsoblExtDto>;
    /**
    * Klientská část AL - číselník Typ zdroje pro rozpis
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["id_tzd"]
    * columns: ["id_tzd","nazev","zkratka","poznamka","aktivita"]
    * filters: ["id_tzd","aktivita"]
    */
    function adeSrvstzd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvstzdDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvstzdDto>;
    /**
    * Klientská část AL - číselník Výdajové bloky
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b> ({kod})<br /><i>jres:23920027: {ico}</i>|<i>jres:23920021: {id_vyb}</i>|<i>jres:33000030: {rok_od} - {rok_do}</i>"
    * helperColumns: ["nazev", "kod", "id_vyb", "kod"]
    *
    * DataReader
    * keys: ["ico","id_vyb"]
    * columns: ["ico","id_vyb","kod","nazev","rok_od","rok_do","aktivita"]
    * filters: ["ico","id_vyb","aktivita","rok"]
    */
    function adeSrvsvyb(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvsvybDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvsvybDto>;
    /**
    * Klientská část AL - číselník Strukturální fondy EU - ISPROFIN
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b> ({xpf_pf})<br /><i>jres:23920027: {ico}</i>|<i>jres:33000030: {rok_od} - {rok_do}</i>"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["xpf_pf","uroven"]
    * columns: ["xpf_pf","uroven","nazev","rok_od","rok_do","aktivita","priz_eds"]
    * filters: ["xpf_pf","uroven","priz_eds","aktivita","ico","rok"]
    */
    function adeSrvsxpf(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvsxpfDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvsxpfDto>;
    /**
    * Klientská část AL - číselník Kategorie seskupení
    * FieldOptions
    * itemTemplate: "{te0} {nazev}"
    * helperColumns: ["te0", "nazev"]
    *
    * DataReader
    * keys: ["te0"]
    * columns: ["te0", "nazev"]
    * filters: ["uroven_kon","te0","notEmptyTe0"]
    */
    function adeUctdrozOrj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GUctdrozOrjDto>): GSelectBoxOptions<Gordic.Adm.Interface.GUctdrozOrjDto>;
    /**
    * Klientská část AL - číselník Bankovní účty
    * FieldOptions
    * itemTemplate: "{priz_iissp_txt}"
    * helperColumns: ["priz_iissp_txt", "priz_iissp"]
    *
    * DataReader
    * keys: ["priz_iissp"]
    * columns: ["priz_iissp","priz_iissp_txt","k_v","k_s"]
    * filters: ["priz_iissp"]
    */
    function admEkocpii(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkocpiiDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkocpiiDto>;
    /**
    * Klientská část AL - číselník Typ komunikace s IISSP
    * FieldOptions
    * itemTemplate: "{typ_kom_iissp_txt}"
    * helperColumns: ["typ_kom_iissp", "typ_kom_iissp_txt"]
    *
    * DataReader
    * keys: ["typ_kom_iissp"]
    * columns: ["typ_kom_iissp","typ_kom_iissp_txt","k_v","k_s"]
    * filters: ["typ_kom_iissp"]
    */
    function admEkoctii(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkoctiiDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkoctiiDto>;
    /**
    * Klientská část AL - číselník Druh ÚJ
    * FieldOptions
    * itemTemplate: "<b>{kod_druh}</b> - {nazev}"
    * helperColumns: ["id_druh", "kod_druh", "nazev", "poznamka"]
    *
    * DataReader
    * keys: ["id_druh"]
    * columns: ["id_druh","kod_druh","nazev","poznamka","aktivita"]
    * filters: ["id_druh","aktivita"]
    */
    function admEkosdro(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkosdroDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkosdroDto>;
    /**
    * Klientská část AL - číselník Druh ÚJ
    * FieldOptions
    * itemTemplate: "<b>{kod_poddruh}</b> - {nazev}"
    * helperColumns: ["id_druh", "id_poddruh", "kod_poddruh", "nazev", "poznamka"]
    *
    * DataReader
    * keys: ["id_druh","id_poddruh"]
    * columns: ["id_druh","id_poddruh","kod_poddruh","nazev","poznamka","aktivita"]
    * filters: ["id_druh","id_poddruh","aktivita"]
    */
    function admEkospdo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkospdoDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkospdoDto>;
    /**
    * Klientská část AL - číselník Bankovní účty
    * FieldOptions
    * itemTemplate: "<b>{bu_txt}</b><br /><i>jres:23920043: {rok} | jres:30011134: {ico}</i>"
    * helperColumns: ["bu_txt"]
    *
    * DataReader
    * keys: ["rok","bu_vl","sk_vl"]
    * columns: ["bu_txt","rok","bu_vl","sk_vl","ico","ucs"]
    * filters: ["sk_vl","bu_vl","rok","ico","ucs","aktivita"]
    */
    function admEkosuvl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkosuvlDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkosuvlDto>;
    /**
    * Klientská část AL - číselník Typ funkce
    * FieldOptions
    * itemTemplate: "{rezim_fin_txt}"
    * helperColumns: ["rezim_fin_txt"]
    *
    * DataReader
    * keys: ["rezim_fin"]
    * columns: ["rezim_fin","rezim_fin_txt"]
    * filters: ["rezim_fin"]
    */
    function ekocref(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GEkocrefDto>): GSelectBoxOptions<Gordic.Adm.Interface.GEkocrefDto>;
    /**
    * Klientská část AL - číselník Typ funkce
    * FieldOptions
    * itemTemplate: "{pri_fun_txt:trim:encode}"
    * helperColumns: ["pri_fun","pri_fun_txt"]
    *
    * DataReader
    * keys: ["pri_fun"]
    * columns: ["pri_fun","pri_fun_txt"]
    * filters: ["pri_fun","pri_fun_txt"]
    */
    function gincprf(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincprfDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincprfDto>;
    /**
    * Klientská část AL - číselník Priorita
    * FieldOptions
    * itemTemplate: "{priorita_max_txt:trim:encode}"
    * helperColumns: ["priorita_max","priorita_max_txt"]
    *
    * DataReader
    * keys: ["priorita_max"]
    * columns: ["priorita_max","priorita_max_txt"]
    * filters: ["priorita_max","priorita_max_txt"]
    */
    function gincpri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincpriDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincpriDto>;
    /**
    * Klientská část AL - číselník Status funkce
    * FieldOptions
    * itemTemplate: "{status_fun_txt:trim:encode}"
    * helperColumns: ["status_fun","status_fun_txt"]
    *
    * DataReader
    * keys: ["status_fun"]
    * columns: ["status_fun","status_fun_txt"]
    * filters: ["status_fun","status_fun_txt"]
    */
    function gincstf(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincstfDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincstfDto>;
    /**
    * Klientská část AL - číselník Úrovně funkčních míst
    * FieldOptions
    * itemTemplate: "{uroven_fun_txt:trim:encode}"
    * helperColumns: ["uroven_fun","uroven_fun_txt","aktivita"]
    *
    * DataReader
    * keys: ["uroven_fun"]
    * columns: ["uroven_fun","uroven_fun_txt","aktivita"]
    * filters: ["uroven_fun","uroven_fun_txt","aktivita"]
    */
    function gincufu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincufuDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincufuDto>;
    /**
    * Klientská část AL - číselník Spouštění událost
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_spu"]
    * columns: ["ixs_spu","zkratka","nazev","aktivita"]
    * filters: ["ixs_spu","zkratka","nazev","aktivita"]
    */
    function ginsspu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGinsspuDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGinsspuDto>;
    /**
    * Klientská část AL - číselník Zpracování osobních údajů
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_zap"]
    * columns: ["ixs_zap","ktg_zap","nazev","aktivita"]
    * filters: ["ixs_zap","ktg_zap","nazev","aktivita"]
    */
    function ginszap(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGinszapDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGinszapDto>;
    /**
    * Klientská část AL GReaderAdmGincaib
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["aib_modul_txt", "pol", "ppol"]
    *
    * DataReader
    * keys: ["aib_modul"]
    * columns: ["aib_modul","aib_modul_txt","pol","ppol"]
    * filters: ["aib_modul"]
    */
    function admGincaib(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GGincaibDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GGincaibDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{aiv_poskyt_txt}"
    * helperColumns: ["aiv_poskyt_txt"]
    *
    * DataReader
    * keys: ["aiv_poskyt"]
    * columns: ["aiv_poskyt","aiv_poskyt_txt","k_v","k_s"]
    * filters: ["aiv_poskyt"]
    */
    function admGincaiv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincaivDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincaivDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{aktivita_txt}"
    * helperColumns: ["aktivita_txt", "aktivita"]
    *
    * DataReader
    * keys: ["aktivita"]
    * columns: ["aktivita","aktivita_txt"]
    * filters: [""]
    */
    function admGincakt(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderAdmGincaktDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderAdmGincaktDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_spis_txt}"
    * helperColumns: ["priz_spis_txt"]
    *
    * DataReader
    * keys: ["priz_spis"]
    * columns: ["priz_spis","priz_spis_txt","k_v","k_s"]
    * filters: [""]
    */
    function admGincdsd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincdsdDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincdsdDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{faze_typ_txt}"
    * helperColumns: ["faze_typ_txt"]
    *
    * DataReader
    * keys: ["faze_typ"]
    * columns: ["faze_typ","faze_typ_txt","k_v","k_s"]
    * filters: ["faze_typ"]
    */
    function admGincfat(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincfatDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincfatDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{ktg_spu_txt}"
    * helperColumns: ["ktg_spu_txt"]
    *
    * DataReader
    * keys: ["ktg_spu"]
    * columns: ["ktg_spu","ktg_spu_txt","k_v","k_s"]
    * filters: ["ktg_spu"]
    */
    function admGinckts(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincktsDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincktsDto>;
    /**
    * Client Reader pro typ AI aplikace
    * FieldOptions
    * itemTemplate: "{lap_typ_txt}"
    * helperColumns: ["lap_typ_txt"]
    *
    * DataReader
    * keys: ["lap_typ"]
    * columns: ["lap_typ","lap_typ_txt"]
    * filters: ["lap_typ","lap_typ_txt"]
    */
    function admGinclap(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GGinclapDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GGinclapDto>;
    /**
    * Client Reader pro GContent podporující AI aplikace
    * FieldOptions
    * itemTemplate: "{lgcontent_txt}"
    * helperColumns: ["lgcontent_uid"]
    *
    * DataReader
    * keys: ["lgcontent"]
    * columns: ["lgcontent","lgcontent_txt","lgcontent_uid"]
    * filters: ["lgcontent","lgcontent_txt","lgcontent_uid"]
    */
    function admGinclgc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GGinclgcDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GGinclgcDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{lm_api_typ_txt}"
    * helperColumns: ["lm_api_typ_txt"]
    *
    * DataReader
    * keys: ["lm_api_typ"]
    * columns: ["lm_api_typ","lm_api_typ_txt"]
    * filters: ["lm_api_typ","lm_api_typ_txt"]
    */
    function admGinclma(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GGinclmaDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GGinclmaDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{lmodel_typ_txt}"
    * helperColumns: ["lmodel_typ_txt"]
    *
    * DataReader
    * keys: ["lmodel_typ"]
    * columns: ["lmodel_typ","lmodel_typ_txt"]
    * filters: ["lmodel_typ","lmodel_typ_txt"]
    */
    function admGinclmk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GGinclmkDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GGinclmkDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{lpsluzby_typ_txt}"
    * helperColumns: ["lpsluzby_typ_txt"]
    *
    * DataReader
    * keys: ["lpsluzby_typ"]
    * columns: ["lpsluzby_typ","lpsluzby_typ_txt"]
    * filters: ["lpsluzby_typ"]
    */
    function admGinclps(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GGinclpsDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GGinclpsDto>;
    /**
    * Client Reader pro typ výstupu AI aplikace
    * FieldOptions
    * itemTemplate: "{lap_vystup_typ_txt}"
    * helperColumns: ["lap_vystup_typ_txt"]
    *
    * DataReader
    * keys: ["lap_vystup_typ"]
    * columns: ["lap_vystup_typ","lap_vystup_typ_txt"]
    * filters: ["lap_vystup_typ","lap_vystup_typ_txt"]
    */
    function admGinclvy(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GGinclvyDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GGinclvyDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{mistnost_druh_txt}"
    * helperColumns: ["mistnost_druh_txt"]
    *
    * DataReader
    * keys: ["mistnost_druh"]
    * columns: ["mistnost_druh","mistnost_druh_txt","k_v","k_s"]
    * filters: ["mistnost_druh"]
    */
    function admGincmis(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincmisDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincmisDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{prompt_txt}"
    * helperColumns: ["prompt_txt"]
    *
    * DataReader
    * keys: ["prompt"]
    * columns: ["prompt","prompt_txt","k_v","k_s"]
    * filters: ["prompt"]
    */
    function admGincoap(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincoapDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincoapDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_automat_txt:trim:encode}"
    * helperColumns: ["priz_automat_txt"]
    *
    * DataReader
    * keys: ["priz_automat"]
    * columns: ["priz_automat","priz_automat_txt"]
    * filters: ["priz_automat"]
    */
    function admGincpat(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincpatDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincpatDto>;
    /**
    * Klientská část AL GReaderAdmGincpav
    * FieldOptions
    * itemTemplate: "{priz_aut_vyriz_txt}"
    * helperColumns: ["priz_aut_vyriz_txt"]
    *
    * DataReader
    * keys: ["priz_aut_vyriz"]
    * columns: ["priz_aut_vyriz","priz_aut_vyriz_txt","k_v","k_s"]
    * filters: ["priz_aut_vyriz"]
    */
    function admGincpav(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincpavDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincpavDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_ba_txt:trim:encode}"
    * helperColumns: ["priz_ba_txt"]
    *
    * DataReader
    * keys: ["priz_ba"]
    * columns: ["priz_ba","priz_ba_txt"]
    * filters: ["priz_ba"]
    */
    function admGincpba(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderAdmGincpbaDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderAdmGincpbaDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_ip_adr_txt}"
    * helperColumns: ["priz_ip_adr_txt"]
    *
    * DataReader
    * keys: ["priz_ip_adr"]
    * columns: ["priz_ip_adr","priz_ip_adr_txt","k_v","k_s"]
    * filters: ["priz_ip_adr"]
    */
    function admGincpip(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincpipDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincpipDto>;
    /**
    * Klientská část AL GReaderAdmGincpkf
    * FieldOptions
    * itemTemplate: "{priz_kon_form_txt}"
    * helperColumns: ["priz_kon_form_txt"]
    *
    * DataReader
    * keys: ["priz_kon_form"]
    * columns: ["priz_kon_form","priz_kon_form_txt","k_v","k_s"]
    * filters: ["priz_kon_form"]
    */
    function admGincpkf(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincpkfDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincpkfDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_povol_nda_txt}"
    * helperColumns: ["priz_povol_nda_txt"]
    *
    * DataReader
    * keys: ["priz_povol_nda"]
    * columns: ["priz_povol_nda","priz_povol_nda_txt","ktg_povol_nda","aktivita"]
    * filters: ["priz_povol_nda","ktg_povol_nda","aktivita"]
    */
    function admGincpna(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincpnaDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincpnaDto>;
    /**
    * Klientská část AL GReaderAdmGincprv
    * FieldOptions
    * itemTemplate: "{priz_vaz_txt}"
    * helperColumns: ["priz_vaz_txt"]
    *
    * DataReader
    * keys: ["priz_vaz"]
    * columns: ["priz_vaz","priz_vaz_txt","k_v","k_s"]
    * filters: ["priz_vaz"]
    */
    function admGincprv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincprvDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincprvDto>;
    /**
    * Klientská část AL GReaderAdmGincpve
    * FieldOptions
    * itemTemplate: "{priz_val_esu_txt}"
    * helperColumns: ["priz_val_esu_txt"]
    *
    * DataReader
    * keys: ["priz_val_esu"]
    * columns: ["priz_val_esu","priz_val_esu_txt","k_v","k_s"]
    * filters: ["priz_val_esu"]
    */
    function admGincpve(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincpveDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincpveDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{rezim_nakl_txt}"
    * helperColumns: ["rezim_nakl_txt"]
    *
    * DataReader
    * keys: ["rezim_nakl"]
    * columns: ["rezim_nakl","rezim_nakl_txt","k_v","k_s","rezim_nakl_rsx"]
    * filters: ["rezim_nakl"]
    */
    function admGincren(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderAdmGincrenDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderAdmGincrenDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{segment_druh_txt}"
    * helperColumns: ["segment_druh_txt"]
    *
    * DataReader
    * keys: ["segment_druh"]
    * columns: ["segment_druh","segment_druh_txt"]
    * filters: ["segment_druh"]
    */
    function admGincsbu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincsbuDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincsbuDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_aut_oauth_txt:trim:encode}"
    * helperColumns: ["typ_aut_oauth_txt"]
    *
    * DataReader
    * keys: ["typ_aut_oauth"]
    * columns: ["typ_aut_oauth","typ_aut_oauth_txt"]
    * filters: ["typ_aut_oauth"]
    */
    function admGinctao(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderAdmGinctaoDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderAdmGinctaoDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_cloudu_txt:trim:encode}"
    * helperColumns: ["typ_cloudu_txt"]
    *
    * DataReader
    * keys: ["typ_cloudu"]
    * columns: ["typ_cloudu","typ_cloudu_txt"]
    * filters: ["typ_cloudu","aktivita"]
    */
    function admGinctcl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderAdmGinctclDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderAdmGinctclDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_vps_txt:trim:encode}"
    * helperColumns: ["typ_vps_txt"]
    *
    * DataReader
    * keys: ["typ_vps"]
    * columns: ["typ_vps","typ_vps_txt"]
    * filters: ["typ_vps"]
    */
    function admGincvps(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincvpsDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincvpsDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["obd_vsk_txt"]
    *
    * DataReader
    * keys: ["obd_vsk"]
    * columns: ["obd_vsk","obd_vsk_txt"]
    * filters: ["obd_vsk"]
    */
    function admGincvsk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincvskExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincvskExtDto>;
    /**
    * Klientská část AL GReaderAdmGinsalv
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_alv"]
    * columns: ["ixs_alv","nazev","id_ses","tema","aktivita"]
    * filters: ["ixs_alv","tema","aktivita"]
    */
    function admGinsalv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsalvDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsalvDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_frm"]
    * columns: ["ixs_frm","nazev","tema","poznamka","rokmes_od","rokmes_do","aktivita"]
    * filters: ["ixs_frm","aktivita"]
    */
    function admGinsfrm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsfrmDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsfrmDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b> ({pronom_id}) | {koncovky}"
    * helperColumns: ["nazev", "pronom_id", "koncovky"]
    *
    * DataReader
    * keys: ["pronom_id"]
    * columns: ["pronom_id","puid","nazev","verze"]
    * filters: ["pronom_id","aktivita"]
    */
    function admGinsfsp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsfspDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsfspDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["nazev_rf", "nazev", "nazev_su"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev","nazev_ref","nazev_su","nazev_orj","ico","aktivita","ixs_su","ixs_orj","ixs_ref","ixs_zmp","cs_nazev","nazev_rf", "priz_servis"]
    * filters: ["ixs_fun","ixs_su","aktivita","ico","IxsOrInEsuIco","GpcIcoOrSharedIco","IcoOrSharedIco"]
    */
    function admGinsfun(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsfunDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsfunDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["nazev_rf", "nazev", "nazev_su"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","nazev","nazev_ref","nazev_su","nazev_orj","ico","aktivita","ixs_su","ixs_orj","ixs_ref","ixs_zmp","cs_nazev","nazev_rf", "priz_servis"]
    * filters: ["ixs_fun","ixs_su","aktivita","ico","IxsOrInEsuIco","GpcIcoOrSharedIco","IcoOrSharedIco"]
    */
    function admGinsfunMini(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsfunDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsfunDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b><br /><i>jres:23920021: {ixs_gdt}</i> | <i>jres:30011356: {popis}</i>"
    * helperColumns: ["nazev", "ixs_gdt", "popis"]
    *
    * DataReader
    * keys: ["ixs_gdt"]
    * columns: ["ixs_gdt","nazev","popis","aktivita"]
    * filters: ["ixs_gdt","aktivita"]
    */
    function admGinsgdt(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsgdtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsgdtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["acckey"]
    * columns: ["acckey","nazev","aktivita"]
    * filters: ["acckey","aktivita"]
    */
    function admGinskey(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinskeyDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinskeyDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{kod_vyu_txt}"
    * helperColumns: ["kod_vyu_txt"]
    *
    * DataReader
    * keys: ["kod_vyu"]
    * columns: ["kod_vyu","kod_vyu_txt","aktivita"]
    * filters: ["kod_vyu","aktivita"]
    */
    function admGinskov(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinskovDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinskovDto>;
    /**
    * Klientská část AL - číselník Schránka
    * FieldOptions
    * itemTemplate: "{mailbox:trim:encode}"
    * helperColumns: ["mailbox", "ixs_su_txt", "nazev", "poznamka"]
    *
    * DataReader
    * keys: ["mailbox"]
    * columns: ["mailbox","ixs_su_txt","nazev", "poznamka"]
    * filters: ["mailbox","typ_mbx"]
    */
    function admGinsmbx(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsmbxExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsmbxExtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["zkratka"]
    *
    * DataReader
    * keys: ["ixs_su"]
    * columns: ["ixs_su","nazev","zkratka","ico","lic_adr","ofic_nazev"]
    * filters: ["ixs_su"]
    */
    function admGinspod(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinspodDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinspodDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"]
    *
    * DataReader
    * keys: ["ixs_ref"]
    * columns: ["zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"]
    * filters: ["ixs_ref","aktivita","ixs_su","zkratka","nazev","jmeno","prijmeni","tit_pred","tit_za","oc","rc","login_name","Zastup","NullPid","PridruzenaStrediska","GpcIcoOrSharedIco","IcoOrSharedIco","ico","GinvreuStUtajId"]
    */
    function admGinsref(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsrefExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsrefExtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["nazev_ref", "nazev", "nazev_su"]
    *
    * DataReader
    * keys: ["ixs_ref"]
    * columns: ["zkratka", "nazev", "jmeno", "prijmeni", "tit_pred", "tit_za", "login_name"]
    * filters: ["ixs_ref","aktivita","ixs_su","zkratka","nazev","jmeno","prijmeni","tit_pred","tit_za","oc","rc","login_name","Zastup","NullPid","PridruzenaStrediska","GpcIcoOrSharedIco","IcoOrSharedIco","ico","GinvreuStUtajId"]
    */
    function admGinsrefFoto(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsrefExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsrefExtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b><br /><i>jres:33000026: {ixs_spu_txt}</i>|<i>jres:30011413: {skar_znak}</i>|<i>jres:30011411: {skar_lhuta}</i>"
    * helperColumns: ["zkratka", "nazev"]
    *
    * DataReader
    * keys: ["ixs_skr"]
    * columns: ["ixs_skr", "zkratka", "nazev", "poznamka", "skar_znak", "skar_lhuta", "dat_od", "dat_do", "aktivita", "ixs_spu_txt"]
    * filters: ["ixs_skr","aktivita","proTypyDokumentu"]
    */
    function admGinsskr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsskrExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsskrExtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: (row) => {
		return `<b>${row?.nazev}</b><br /><i>jres:33000004: ${Gordic.Templates.Formatters.datetime(row?.dat_od, "datetime")}</i> | <i>jres:33000005: ${Gordic.Templates.Formatters.datetime(row?.dat_do, "datetime")} </i> | <i>jres:23920021: ${row?.ixs_spn}</i>`
	}
    * helperColumns: ["ixs_spn", "nazev"]
    *
    * DataReader
    * keys: ["ixs_spn"]
    * columns: ["ixs_spn","nazev","poznamka","dat_od","dat_do","aktivita","ixs_spn_prev","ixs_spn_next"]
    * filters: ["ixs_spn","aktivita"]
    */
    function admGinsspn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsspnDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsspnDto>;
    /**
    * Číselník Ginstre
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["ico","nazev"]
    *
    * DataReader
    * keys: ["ixs_tre"]
    * columns: ["ixs_tre","nazev", "ico" ]
    * filters: ["ixs_tre","aktivita","GpcIcoOrSharedIco","IcoOrSharedIco","ico"]
    */
    function admGinstre(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinstreDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinstreDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b><br /><span><i>jres:23920021: {ixs_vsk}</i> | <i>jres:30011145: {spis_znak}</i></span>"
    * helperColumns: ["nazev", "spis_znak", "ixs_vsk"]
    *
    * DataReader
    * keys: ["ixs_vsk"]
    * columns: ["ixs_vsk","ico","nazev","dat_od","dat_do","spis_znak","spis_znak_short","ixs_vsk_nad","ixs_skr","urceni_spis_z","zpus_prid_cj","format_cj","priz_trvskar","ixs_spn_od","ixs_spn_do","ixs_vsk_prev","ixs_vsk_next","poznamka","aktivita"]
    * filters: ["ixs_vsk","aktivita","typ","ixs_vsk_nad"]
    */
    function admGinsvsk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsvskExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsvskExtDto>;
    /**
    * Klientská část prefabu pro AdmInterniSubjekt
    * FieldOptions
    * itemTemplate: "{esu_txt}"
    * helperColumns: ["esu_txt"]
    *
    * DataReader
    * keys: ["ixs_esu"]
    * columns: ["ixs_esu","esu_txt","zkratka","poznamka","ico","dic","priz_hlavni_txt","ob_jmeno","ulice","cor","cpop","cast_obce","obec","psc","tel","mail","fax","st1","st2","st3","st4","st5","st6","st7","nazev"]
    * filters: ["ixs_esu","GpcIcoOrSharedIco","IcoOrSharedIco"]
    */
    function admInterniSubjekt(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsesuExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsesuExtDto>;
    /**
    * Klientská část prefabu
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs"]
    * columns: ["ixs","nazev"]
    * filters: ["ixs","objectId"]
    */
    function admIxsBase(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSelectBoxBaseDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSelectBoxBaseDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{nazev:trim:encode}</b><br /><i>jres:33000001: {rok} | jres:33000002: {ico:trim:encode}</i>"
    * helperColumns: ["rok", "nazev", "zkratka"]
    *
    * DataReader
    * keys: ["ixs_pla"]
    * columns: ["ixs_pla", "nazev", "aktivita", "rok", "ico", "zkratka"]
    * filters: ["aktivita","ico"]
    */
    function admSrvspla(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvPlaExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvPlaExtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_prr"]
    * columns: ["ixs_prr","nazev","poznamka","aktivita","zkratka"]
    * filters: ["aktivita","rok","ixs_prr"]
    */
    function admSrvsprr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvsprrDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvsprrDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_tip"]
    * columns: ["ixs_tip", "nazev", "aktivita"]
    * filters: ["aktivita","ixs_pla","ixs_tip","ixs_prr"]
    */
    function admSrvstip(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvstipDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvstipDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_tri"]
    * columns: ["ixs_tri","nazev","aktivita","zkratka","poznamka","rok_od","rok_do"]
    * filters: ["aktivita","ixs_tri"]
    */
    function admSrvstri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvstriDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvstriDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["agendova_role"]
    * columns: ["agendova_role","nazev","aktivita"]
    * filters: ["agendova_role","aktivita"]
    */
    function admSzrsaro(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSzrsaroDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSzrsaroDto>;
    /**
    * Číselník gincpar
    * FieldOptions
    * itemTemplate: "{name}"
    * helperColumns: ["name"]
    *
    * DataReader
    * keys: ["name"]
    * columns: ["name"]
    * filters: ["name"]
    */
    function dbLogins(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderDbLoginsDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderDbLoginsDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{typ_aute_txt}"
    * helperColumns: ["typ_aute_txt"]
    *
    * DataReader
    * keys: ["typ_aute"]
    * columns: ["typ_aute","typ_aute_txt"]
    * filters: ["typ_aute"]
    */
    function gincaut(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincautDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincautDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{uroven_cfg_txt}"
    * helperColumns: ["uroven_cfg_txt"]
    *
    * DataReader
    * keys: ["uroven_cfg"]
    * columns: ["uroven_cfg","uroven_cfg_txt"]
    * filters: ["uroven_cfg","pouze_platne"]
    */
    function ginccfg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinccfgDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinccfgDto>;
    /**
    * Číselník Sslcpdc
    * FieldOptions
    * itemTemplate: "{csas_type_txt}"
    * helperColumns: ["csas_type_txt"]
    *
    * DataReader
    * keys: ["csas_type"]
    * columns: ["csas_type","csas_type","k_v","k_s"]
    * filters: ["csas_type"]
    */
    function ginccst(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinccstDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinccstDto>;
    /**
    * Číselník Sslcpdc
    * FieldOptions
    * itemTemplate: "{dat_typ_txt}"
    * helperColumns: ["dat_typ_txt"]
    *
    * DataReader
    * keys: ["dat_typ"]
    * columns: ["dat_typ","dat_typ_txt"]
    * filters: ["dat_typ"]
    */
    function gincdat(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincdatDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincdatDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{ktg_evn_txt}"
    * helperColumns: ["ktg_evn_txt"]
    *
    * DataReader
    * keys: ["ktg_evn"]
    * columns: ["ktg_evn","ktg_evn_txt"]
    * filters: ["ktg_evn"]
    */
    function gincevn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincevnDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincevnDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{typ_mbx_txt}"
    * helperColumns: ["typ_mbx_txt"]
    *
    * DataReader
    * keys: ["typ_mbx"]
    * columns: ["typ_mbx","typ_mbx_txt"]
    * filters: ["typ_mbx"]
    */
    function gincmbx(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincmbxDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincmbxDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{oa_token_typ_txt}"
    * helperColumns: ["oa_token_typ_txt"]
    *
    * DataReader
    * keys: ["oa_token_typ"]
    * columns: ["oa_token_typ","oa_token_typ_txt"]
    * filters: ["oa_token_typ"]
    */
    function gincoat(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincoatDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincoatDto>;
    /**
    * Číselník Gincorj
    * FieldOptions
    * itemTemplate: "{uroven_orj_txt}"
    * helperColumns: ["uroven_orj_txt"]
    *
    * DataReader
    * keys: ["uroven_orj"]
    * columns: ["uroven_orj", "uroven_orj_txt", "aktivita"]
    * filters: ["uroven_orj"]
    */
    function gincorj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincorjDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincorjDto>;
    /**
    * Číselník gincpar
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["param_txt", "param"]
    *
    * DataReader
    * keys: ["param"]
    * columns: ["param", "param_txt", "aktivita", "popis"]
    * filters: ["param","aktivita","uroven_cfg","faze"]
    */
    function gincpar(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincparDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincparDto>;
    /**
    * Klientská část pro reader světadíl
    * FieldOptions
    * itemTemplate: "{svetadil_txt}"
    * helperColumns: ["svetadil_txt"]
    *
    * DataReader
    * keys: ["svetadil"]
    * columns: ["svetadil","svetadil_txt"]
    * filters: ["svetadil"]
    */
    function gincsve(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincsveDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincsveDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{typ_aut_txt}"
    * helperColumns: ["typ_aut_txt"]
    *
    * DataReader
    * keys: ["typ_aut"]
    * columns: ["typ_aut","typ_aut_txt"]
    * filters: ["typ_aut"]
    */
    function ginctau(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGinctauDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGinctauDto>;
    /**
    * Číselník Sslcpdc
    * FieldOptions
    * itemTemplate: "{typ_vla_txt}"
    * helperColumns: ["typ_vla_txt"]
    *
    * DataReader
    * keys: ["typ_vla"]
    * columns: ["typ_vla","typ_vla_txt"]
    * filters: ["typ_vla"]
    */
    function ginctvp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinctvpDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinctvpDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{uroven_vla_txt}"
    * helperColumns: ["uroven_vla_txt"]
    *
    * DataReader
    * keys: ["uroven_vla"]
    * columns: ["uroven_vla","uroven_vla_txt"]
    * filters: ["uroven_vla"]
    */
    function gincuvl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderGincuvlDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderGincuvlDto>;
    /**
    * Číselník Gincvau
    * FieldOptions
    * itemTemplate: "{typ_vau_txt}"
    * helperColumns: ["typ_vau_txt"]
    *
    * DataReader
    * keys: ["typ_vau"]
    * columns: ["typ_vau","typ_vau_txt"]
    * filters: ["typ_vau"]
    */
    function gincvau(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGincvauDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGincvauDto>;
    /**
    * Číselník ginchop - param, config, config_txt, popis, aktivita
    * FieldOptions
    * itemTemplate: "{config_txt}"
    * helperColumns: ["config_txt"]
    *
    * DataReader
    * keys: ["param","config"]
    * columns: ["param","config","config_txt","popis","aktivita"]
    * filters: ["param","config","aktivita"]
    */
    function ginchop(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinchopDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinchopDto>;
    /**
    * Číselník ginsins
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_ins"]
    * columns: ["ixs_ins","nazev"]
    * filters: ["ixs_ins"]
    */
    function ginsins(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsinsDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsinsDto>;
    /**
    * Klientská část Stanice
    * FieldOptions
    * itemTemplate: "{ip_adr:trim:encode}"
    * helperColumns: ["ip_adr", "nazev"]
    *
    * DataReader
    * keys: ["ip_adr"]
    * columns: ["ip_adr","nazev"]
    * filters: ["ip_adr","aktivita"]
    */
    function ginssta(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GGinsstaDto>): GSelectBoxOptions<Gordic.Adm.Interface.GGinsstaDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: (obj) => {
		var result = "";
		result += "{0}".format(obj.nazev)
		if (obj.zkratka != null && obj.zkratka != undefined) {
			if (obj.zkratka.trim() != "")
				result += " ({0})".format(obj.zkratka)
		}
		return result
	}
    * helperColumns: ["nazev", "zkratka"]
    *
    * DataReader
    * keys: ["ixs_csp"]
    * columns: ["ixs_csp","nazev","zkratka","aktivita"]
    * filters: ["ixs_csp","aktivita"]
    */
    function srvscsp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSrvscspDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSrvscspDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{priz_cj_only_txt}"
    * helperColumns: ["priz_cj_only_txt"]
    *
    * DataReader
    * keys: ["priz_cj_only"]
    * columns: ["priz_cj_only","priz_cj_only_txt"]
    * filters: ["priz_cj_only"]
    */
    function sslcpco(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslcpcoDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslcpcoDto>;
    /**
    * Číselník Sslcpdc
    * FieldOptions
    * itemTemplate: "{priz_den_cj_txt}"
    * helperColumns: ["priz_den_cj_txt"]
    *
    * DataReader
    * keys: ["priz_den_cj"]
    * columns: ["priz_den_cj","priz_den_cj_txt"]
    * filters: ["priz_den_cj"]
    */
    function sslcpdc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslcpdcDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslcpdcDto>;
    /**
    * Číselník Sslcpuz
    * FieldOptions
    * itemTemplate: "{priz_uzav_txt}"
    * helperColumns: ["priz_uzav_txt"]
    *
    * DataReader
    * keys: ["priz_uzav"]
    * columns: ["priz_uzav","priz_uzav_txt"]
    * filters: ["priz_uzav"]
    */
    function sslcpuz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslcpuzDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslcpuzDto>;
    /**
    * Číselník Sslctyd
    * FieldOptions
    * itemTemplate: "{typ_den_txt}"
    * helperColumns: ["typ_den_txt"]
    *
    * DataReader
    * keys: ["typ_den"]
    * columns: ["typ_den","typ_den_txt"]
    * filters: ["typ_den"]
    */
    function sslctyd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslctydDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslctydDto>;
    /**
    * Číselník ginctau
    * FieldOptions
    * itemTemplate: "{umisteni_txt}"
    * helperColumns: ["umisteni_txt"]
    *
    * DataReader
    * keys: ["umisteni"]
    * columns: ["umisteni","umisteni_txt"]
    * filters: ["umisteni"]
    */
    function sslsump(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslsumpDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslsumpDto>;
    /**
    * Číselník wflcpak
    * FieldOptions
    * itemTemplate: "{priz_akr_txt}"
    * helperColumns: ["priz_akr_txt"]
    *
    * DataReader
    * keys: ["priz_akr"]
    * columns: ["priz_akr","priz_akr_txt"]
    * filters: ["priz_akr"]
    */
    function wflcpak(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderWflcpakDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderWflcpakDto>;
    /**
    * Číselník WindowsLogins
    * FieldOptions
    * itemTemplate: "{name}"
    * helperColumns: ["name"]
    *
    * DataReader
    * keys: ["name"]
    * columns: ["name"]
    * filters: ["name"]
    */
    function windowsLogins(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderWindowsLoginsDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderWindowsLoginsDto>;
    /**
    * Klientská část AL - číselník Skartace pozastavena
    * FieldOptions
    * itemTemplate: "{priz_ess_txt}"
    * helperColumns: ["priz_ess_txt"]
    *
    * DataReader
    * keys: ["priz_ess"]
    * columns: ["priz_ess","priz_ess_txt"]
    * filters: [""]
    */
    function intcpes(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GIntcpesDto>): GSelectBoxOptions<Gordic.Adm.Interface.GIntcpesDto>;
    /**
    * Klientská část Gdesslo
    * FieldOptions
    * itemTemplate: "{sloupec}"
    * helperColumns: ["sloupec"]
    *
    * DataReader
    * keys: ["tabulka","sloupec"]
    * columns: ["tabulka","sloupec"]
    * filters: ["tabulka","sloupec","aktivita"]
    */
    function admGdesslo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GAdmGdessloDto>): GSelectBoxOptions<Gordic.Adm.Interface.GAdmGdessloDto>;
    /**
    * Klientská část Gdestab
    * FieldOptions
    * itemTemplate: "{tabulka}"
    * helperColumns: ["tabulka"]
    *
    * DataReader
    * keys: ["tabulka"]
    * columns: ["tabulka"]
    * filters: ["tabulka","aktivita"]
    */
    function admGdestab(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GAdmGdestabDto>): GSelectBoxOptions<Gordic.Adm.Interface.GAdmGdestabDto>;
    /**
    * Klientská část Gdevpra
    * FieldOptions
    * itemTemplate: "{tabulka} - {sloupec}"
    * helperColumns: ["tabuka", "sloupec", "pravidlo_id"]
    *
    * DataReader
    * keys: ["pravidlo_id","tabulka","sloupec"]
    * columns: ["pravidlo_id","tabulka","sloupec","aktivita"]
    * filters: ["pravidlo_id","tabulka","sloupec","aktivita"]
    */
    function admGdevpra(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GAdmGdevpraDto>): GSelectBoxOptions<Gordic.Adm.Interface.GAdmGdevpraDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_dk_txt}"
    * helperColumns: ["typ_dk_txt"]
    *
    * DataReader
    * keys: ["typ_dk"]
    * columns: ["typ_dk","typ_dk_txt","k_v","k_s"]
    * filters: ["typ_dk"]
    */
    function admRakcden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GRakcdenDto>): GSelectBoxOptions<Gordic.Adm.Interface.GRakcdenDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "<b>{nazev}</b><br /><i>{poznamka}</i>"
    * helperColumns: ["nazev", "zkratka", "poznamka"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den","nazev","zkratka","poznamka"]
    * filters: ["ixp_den"]
    */
    function admRaksden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GRaksdenDto>): GSelectBoxOptions<Gordic.Adm.Interface.GRaksdenDto>;
    /**
    * Klientská část AL - číselník Forma dokumentu
    * FieldOptions
    * itemTemplate: "{stav_uzav_txt}"
    * helperColumns: ["stav_uzav_txt"]
    *
    * DataReader
    * keys: ["stav_uzav"]
    * columns: ["stav_uzav","stav_uzav_txt","k_v","k_s","stav_uzav_rsx"]
    * filters: ["stav_uzav"]
    */
    function admSslcstu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslcstuDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslcstuDto>;
    /**
    * Klientská část AL - Způsob přidělení ČJ
    * FieldOptions
    * itemTemplate: "{zpus_prid_cj_txt}"
    * helperColumns: ["zpus_prid_cj_txt"]
    *
    * DataReader
    * keys: ["zpus_prid_cj"]
    * columns: ["zpus_prid_cj","zpus_prid_cj_txt","k_v","k_s"]
    * filters: ["zpus_prid_cj"]
    */
    function admSslczpc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslczpcDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslczpcDto>;
    /**
    * Klientská část AL - číselník Rok deníku ssl
    * FieldOptions
    * itemTemplate: "{rok}"
    * helperColumns: ["rok"]
    *
    * DataReader
    * keys: ["sslden","rok"]
    * columns: ["sslden","rok","dat_zmena","zmenu_prov"]
    * filters: ["sslden","rok"]
    */
    function admSsldden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GSslddenDto>): GSelectBoxOptions<Gordic.Adm.Interface.GSslddenDto>;
    /**
    * Klientská část AL - číselník Forma dokumentu
    * FieldOptions
    * itemTemplate: "{priz_fyz_txt:trim:encode}"
    * helperColumns: ["priz_fyz_txt"]
    *
    * DataReader
    * keys: ["priz_fyz"]
    * columns: ["priz_fyz","priz_fyz_txt","k_v","k_s","priz_fyz_rsx"]
    * filters: ["priz_fyz","priz_fyz_txt","k_v","k_s","priz_fyz_rsx"]
    */
    function sslcpfy(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderSslcpfyDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderSslcpfyDto>;
    /**
    * Klientská část AL - číselník Určení spis.znaku
    * FieldOptions
    * itemTemplate: "{urceni_spis_z_txt:trim:encode}"
    * helperColumns: ["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]
    *
    * DataReader
    * keys: ["urceni_spis_z"]
    * columns: ["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]
    * filters: ["urceni_spis_z","urceni_spis_z_txt","k_v","k_s","urceni_spis_z_rsx"]
    */
    function sslcusz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderSslcuszDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderSslcuszDto>;
    /**
    * Klientská část AL - číselník Deník SSL
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["sslden","aktivita","nazev"]
    *
    * DataReader
    * keys: ["sslden"]
    * columns: ["sslden","aktivita","nazev"]
    * filters: ["sslden","aktivita","nazev"]
    */
    function admsslsden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderSslsdenDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderSslsdenDto>;
    /**
    * Klientská část AL - číselník Spisový plán
    * FieldOptions
    * itemTemplate: "<b>{nazev:trim:encode}</b> ({spis_pl})"
    * helperColumns: ["spis_pl", "aktivita", "nazev"]
    *
    * DataReader
    * keys: ["spis_pl"]
    * columns: ["spis_pl","aktivita","nazev"]
    * filters: ["spis_pl","aktivita"]
    */
    function admsslsspl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderSslssplDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderSslssplDto>;
    /**
    * Klientská část AL - číselník Spisový znak
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["spis_pl", "spis_znak", "aktivita", "nazev", "spis_znak_pod_next", "ixs_skr"]
    *
    * DataReader
    * keys: ["spis_pl","spis_znak"]
    * columns: ["spis_pl", "spis_znak", "aktivita", "nazev", "spis_znak_pod_next", "ixs_skr"]
    * filters: ["spis_pl","spis_znak","aktivita","ComputeNextChildSpisZnak"]
    */
    function admsslsspz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderAdmSslsspzDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderAdmSslsspzDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_gra_txt}"
    * helperColumns: ["typ_gra_txt"]
    *
    * DataReader
    * keys: ["typ_gra"]
    * columns: ["typ_gra","typ_gra_txt","k_v","k_s"]
    * filters: ["typ_gra"]
    */
    function admWflcgra(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcgraDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcgraDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{ktg_zp_dor_txt}"
    * helperColumns: ["ktg_zp_dor_txt"]
    *
    * DataReader
    * keys: ["ktg_zp_dor"]
    * columns: ["ktg_zp_dor","ktg_zp_dor_txt"]
    * filters: ["ktg_zp_dor"]
    */
    function admWflckzd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflckzdDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflckzdDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_ltv_txt}"
    * helperColumns: ["typ_ltv_txt"]
    *
    * DataReader
    * keys: ["typ_ltv"]
    * columns: ["typ_ltv","typ_ltv_txt"]
    * filters: ["typ_ltv"]
    */
    function admWflcltv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcltvDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcltvDto>;
    /**
    * Klientská část AL - číselník Operace zveřejnění
    * FieldOptions
    * itemTemplate: "{operace_txt}"
    * helperColumns: ["operace_txt"]
    *
    * DataReader
    * keys: ["operace"]
    * columns: ["operace","operace_txt","k_v","k_s"]
    * filters: ["operace"]
    */
    function admWflcozv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcozvDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcozvDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_kvcrt_txt}"
    * helperColumns: ["priz_kvcrt_txt"]
    *
    * DataReader
    * keys: ["priz_kvcrt"]
    * columns: ["priz_kvcrt","priz_kvcrt_txt"]
    * filters: ["priz_kvcrt"]
    */
    function admWflcpkv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcpkvDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcpkvDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_spis_txt}"
    * helperColumns: ["priz_spis"]
    *
    * DataReader
    * keys: ["priz_spis"]
    * columns: ["priz_spis","priz_spis_txt","k_v","k_s","k_xml","priz_spis_rsx"]
    * filters: ["priz_spis"]
    */
    function admWflcpri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcpriDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcpriDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_podp_txt}"
    * helperColumns: ["priz_podp_txt"]
    *
    * DataReader
    * keys: ["priz_podp"]
    * columns: ["priz_podp","priz_podp_txt"]
    * filters: ["priz_podp"]
    */
    function admWflcprp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcprpDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcprpDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_ts_txt}"
    * helperColumns: ["priz_ts_txt"]
    *
    * DataReader
    * keys: ["priz_ts"]
    * columns: ["priz_ts","priz_ts_txt"]
    * filters: ["priz_ts"]
    */
    function admWflcpts(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcptsDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcptsDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{poz_viz_podp_txt}"
    * helperColumns: ["poz_viz_podp_txt"]
    *
    * DataReader
    * keys: ["poz_viz_podp"]
    * columns: ["poz_viz_podp","poz_viz_podp_txt"]
    * filters: ["poz_viz_podp"]
    */
    function admWflcpvp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcpvpDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcpvpDto>;
    /**
    * Klientská část AL - číselník Režim řízení
    * FieldOptions
    * itemTemplate: "{rezim_sch_txt}"
    * helperColumns: ["rezim_sch_txt"]
    *
    * DataReader
    * keys: ["rezim_sch"]
    * columns: ["rezim_sch","rezim_sch_zkr","rezim_sch_txt","k_v","k_s","aktivita"]
    * filters: ["rezim_sch","aktivita"]
    */
    function admWflcrsp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcrspDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcrspDto>;
    /**
    * Klientská část AL - číselník Stránka podpisu
    * FieldOptions
    * itemTemplate: "{str_viz_podp_txt}"
    * helperColumns: ["str_viz_podp_txt"]
    *
    * DataReader
    * keys: ["str_viz_podp"]
    * columns: ["str_viz_podp","str_viz_podp_txt","k_v","k_s"]
    * filters: ["str_viz_podp"]
    */
    function admWflcsvp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcsvpDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcsvpDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_dok_zaz_txt}"
    * helperColumns: ["typ_dok_zaz_txt", "typ_dok_zaz"]
    *
    * DataReader
    * keys: ["typ_dok_zaz"]
    * columns: ["typ_dok_zaz","typ_dok_zaz_txt","k_v","k_s"]
    * filters: ["typ_dok_zaz"]
    */
    function admWflctdz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflctdzDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflctdzDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_krok_txt}"
    * helperColumns: ["typ_krok_txt"]
    *
    * DataReader
    * keys: ["typ_krok"]
    * columns: ["typ_krok","typ_krok_txt","k_v","k_s","typ_krok_rsx"]
    * filters: ["typ_krok"]
    */
    function admWflctkr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflctkrDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflctkrDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_subj_txt:trim:encode}"
    * helperColumns: ["typ_subj_txt"]
    *
    * DataReader
    * keys: ["typ_subj"]
    * columns: ["typ_subj", "typ_subj_txt"]
    * filters: ["typ_subj"]
    */
    function admWflctsu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflctsuDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflctsuDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_viz_podpis_txt}"
    * helperColumns: ["typ_viz_podpis_txt"]
    *
    * DataReader
    * keys: ["typ_viz_podpis"]
    * columns: ["typ_viz_podpis","typ_viz_podpis_txt"]
    * filters: ["typ_viz_podpis"]
    */
    function admWflctvp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflctvpDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflctvpDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{typ_txt:trim:encode}"
    * helperColumns: ["typ_txt"]
    *
    * DataReader
    * keys: ["typ"]
    * columns: ["typ", "typ_txt"]
    * filters: ["typ"]
    */
    function admWflctyp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflctypDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflctypDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{uroven_prist_txt}"
    * helperColumns: ["uroven_prist_txt"]
    *
    * DataReader
    * keys: ["uroven_prist"]
    * columns: ["uroven_prist","uroven_prist_txt"]
    * filters: ["uroven_prist"]
    */
    function admWflcupr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ginis.DbModel.GWflcuprDto>): GSelectBoxOptions<Gordic.Ginis.DbModel.GWflcuprDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{priz_wsl_txt}"
    * helperColumns: ["priz_wsl_txt"]
    *
    * DataReader
    * keys: ["priz_wsl"]
    * columns: ["priz_wsl","priz_wsl_txt"]
    * filters: ["priz_wsl"]
    */
    function admWflcwsl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflcwslDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflcwslDto>;
    /**
    * Klientská část AL - číselník Kategorie zveřejnění
    * FieldOptions
    * itemTemplate: "{ktg_zve_txt}"
    * helperColumns: ["ktg_zve_txt"]
    *
    * DataReader
    * keys: ["ktg_zve"]
    * columns: ["ktg_zve","ktg_zve_txt","k_v","k_s","aktivita"]
    * filters: ["ktg_zve","aktivita"]
    */
    function admWflczve(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflczveDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflczveDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev", "poznamka", "typ_subj"]
    *
    * DataReader
    * keys: ["ixs_blk"]
    * columns: ["ixs_blk","nazev","poznamka","dat_od","dat_do","typ","typ_subj"]
    * filters: ["ixs_blk","typ","typ_subj","aktivita","pouzePlatne"]
    */
    function admWflsblk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflsblkDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflsblkDto>;
    /**
    * Klientská část AL - číselník Elektronické certifikáty
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["jmeno_txt"]
    *
    * DataReader
    * keys: ["ixs_cer"]
    * columns: ["jmeno_txt"]
    * filters: ["ixs_cer","priz_int","aktivita","pouze_platne"]
    */
    function admWflscer(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflscerExtDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflscerExtDto>;
    /**
    * Klientská část AL
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_slo"]
    * columns: ["ixs_slo","nazev","mailbox","typ_slo_upvs"]
    * filters: ["ixs_slo","aktivita"]
    */
    function admWflsssk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflssskDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflssskDto>;
    /**
    * Klientská část AL - číselník Příznak doručenky
    * FieldOptions
    * itemTemplate: "{priz_doruc_txt:trim:encode}"
    * helperColumns: ["priz_doruc_txt"]
    *
    * DataReader
    * keys: ["priz_doruc"]
    * columns: ["priz_doruc","priz_doruc_txt","k_v","k_s","k_xml","priz_doruc_rsx"]
    * filters: ["priz_doruc"]
    */
    function wflcpdo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderWflcpdoDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderWflcpdoDto>;
    /**
    * Klientská část AL - číselník Skartace pozastavena
    * FieldOptions
    * itemTemplate: "{priz_poz_skar_txt:trim:encode}"
    * helperColumns: ["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]
    *
    * DataReader
    * keys: ["priz_poz_skar"]
    * columns: ["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]
    * filters: ["priz_poz_skar","priz_poz_skar_txt","k_v","k_s","priz_poz_skar_rsx"]
    */
    function wflcpso(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderWflcpsoDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderWflcpsoDto>;
    /**
    * Klientská část AL - číselník Certifikační autorita
    * FieldOptions
    * itemTemplate: "{jmeno:trim:encode}"
    * helperColumns: ["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"]
    *
    * DataReader
    * keys: ["ixs_cau"]
    * columns: ["ixs_cau","jmeno","id_cert","otisk","dat_od","dat_do","aktivita"]
    * filters: ["ixs_cau","jmeno","id_cert","otisk","aktivita"]
    */
    function wflscau(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GReaderWflscauDto>): GSelectBoxOptions<Gordic.Adm.Interface.GReaderWflscauDto>;
    /**
    * Klientská část AL - číselník Oblíbená kombinace poštovních služeb
    * FieldOptions
    * itemTemplate: "<b>{komb_sluzeb_txt:trim:encode}</b> - {nazev:trim:encode}"
    * helperColumns: ["komb_sluzeb", "komb_sluzeb_txt"]
    *
    * DataReader
    * keys: ["komb_sluzeb"]
    * columns: ["komb_sluzeb", "komb_sluzeb_txt", "aktivita", "dat_zmena", "zmenu_prov", "filtr_format"]
    * filters: ["komb_sluzeb"]
    */
    function admWflsksl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Adm.Interface.GWflskslDto>): GSelectBoxOptions<Gordic.Adm.Interface.GWflskslDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klientská část AL - číselník Aktivita subřady
    */
    function adeEkoKniha(): Selectors.DefaultSelectorOptions<Gordic.Adx.Interface.GEkoKnihaDto>;
    /**
    * Klientská část AL - číselník Typ funkce
    */
    function adeEkosose(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GEkososeExtDto>;
    /**
    * Klientská část AL - číselník Typ zdroje pro rozpis
    */
    function adeSrvstzd(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GSrvstzdDto>;
    /**
    * Klientská část AL - číselník Výdajové bloky
    */
    function adeSrsvyb(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GSrvsvybDto>;
    /**
    * Klientská část AL - číselník Strukturální fondy EU - ISPROFIN
    */
    function adeSrvsxpf(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GSrvsxpfDto>;
    /**
    * Klientská část AL - číselník Kategorie seskupení
    */
    function adeUctdrozOrj(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GUctdrozOrjDto>;
    /**
    * Klientská část AL - číselník Bankovní účty
    */
    function admEkosuvl(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GEkosuvlDto>;
    /**
    * Klientská část AL - číselník Typ funkce
    */
    function gincprf(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderGincprfDto>;
    /**
    * Klientská část AL - číselník Priorita
    */
    function gincpri(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderGincpriDto>;
    /**
    * Klientská část AL - číselník Status funkce
    */
    function gincstf(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderGincstfDto>;
    /**
    * Klientská část AL - číselník Úrovně funkčních míst
    */
    function gincufu(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderGincufuDto>;
    /**
    * Klientská část AL - číselník Zpracování osobních údajů
    */
    function ginszap(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderGinszapDto>;
    /**
    * Klientská část AL GReaderAdmGinsalv
    */
    function admGinsalv(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsalvDto>;
    /**
    * Klientská část AL
    */
    function admGinsfrm(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsfrmDto>;
    /**
    * Klientská část AL
    */
    function admGinsfsp(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsfspDto>;
    /**
    * Klientská část AL
    */
    function admGinsfun(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsfunDto>;
    /**
    * Klientská část AL - číselník Schránka
    */
    function admGinsmbx(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsmbxExtDto>;
    /**
    * Klientská část AL
    */
    function admGinspod(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinspodDto>;
    /**
    * Klientská část AL
    */
    function admGinsref(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsrefExtDto>;
    /**
    * Klientská část AL
    */
    function admGinsrefFoto(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsrefExtDto>;
    /**
    * Klientská část AL
    */
    function admGinsskr(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsskrExtDto>;
    /**
    * Číselník Ginstre
    */
    function admGinstre(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinstreDto>;
    /**
    * Klientská část AL
    */
    function admGinsvsk(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsvskExtDto>;
    /**
    * Klientská část prefabu pro AdmInterniSubjekt
    */
    function admInterniSubjekt(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsesuExtDto>;
    /**
    * Klientská část AL
    */
    function admSrvspla(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GSrvPlaExtDto>;
    /**
    * Číselník gincpar
    */
    function gincpar(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderGincparDto>;
    /**
    * Číselník ginsins
    */
    function ginsins(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsinsDto>;
    /**
    * Klientská část Stanice
    */
    function ginssta(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GGinsstaDto>;
    /**
    * Klientská část AL - číselník Forma dokumentu
    */
    function sslcpfy(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderSslcpfyDto>;
    /**
    * Klientská část AL - číselník Určení spis.znaku
    */
    function sslcusz(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderSslcuszDto>;
    /**
    * Klientská část AL - číselník Deník SSL
    */
    function admsslsden(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderSslsdenDto>;
    /**
    * Klientská část AL - číselník Spisový plán
    */
    function admsslsspl(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderSslssplDto>;
    /**
    * Klientská část AL - číselník Spisový znak
    */
    function admsslsspz(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderAdmSslsspzDto>;
    /**
    * Klientská část AL
    */
    function admWflsblk(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GWflsblkDto>;
    /**
    * Klientská část AL - číselník Skartace pozastavena
    */
    function wflcpso(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderWflcpsoDto>;
    /**
    * Klientská část AL - číselník Certifikační autorita
    */
    function wflscau(): Selectors.DefaultSelectorOptions<Gordic.Adm.Interface.GReaderWflscauDto>;}
