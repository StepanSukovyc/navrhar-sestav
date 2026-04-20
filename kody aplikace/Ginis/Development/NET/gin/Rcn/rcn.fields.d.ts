declare namespace Gordic.Data.Readers {
    /**
    * Reader pro čtení dat číselníku Pokladní kniha.
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "ico", "ucs", "uus", "rok", "mena", "mena_txt", "nazev", "aktivita", "ktg_den"]
    * filters: ["ixp_den","ico","ucs","uus","rok","mena","aktivita","nazev","ktg_den"]
    */
    class Poksden extends Base<Gordic.Rcn.Interface.GPoksdenDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PoksdenDto = Gordic.Rcn.Interface.GPoksdenDto;
    type PoksdenDtoNames = Gordic.Rcn.Interface.GPoksdenDtoNames;
    type PoksdenDtoFragments = Gordic.Rcn.Interface.GPoksdenDtoFragments;
    type PoksdenDtoTypes = Gordic.Rcn.Interface.GPoksdenDtoTypes;
    type PoksdenDtoTypeLengths = Gordic.Rcn.Interface.GPoksdenDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Pokladník.
    * keys: ["ixs_fun","ixp_den"]
    * columns: ["ixs_fun", "rok", "aktivita", "ixp_den", "nazev"]
    * filters: ["ixs_fun","rok","aktivita","ixp_den","nazev","faze"]
    */
    class Poksoso extends Base<Gordic.Rcn.Interface.GPoksosoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PoksosoDto = Gordic.Rcn.Interface.GPoksosoDto;
    type PoksosoDtoNames = Gordic.Rcn.Interface.GPoksosoDtoNames;
    type PoksosoDtoFragments = Gordic.Rcn.Interface.GPoksosoDtoFragments;
    type PoksosoDtoTypes = Gordic.Rcn.Interface.GPoksosoDtoTypes;
    type PoksosoDtoTypeLengths = Gordic.Rcn.Interface.GPoksosoDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Druh vozidla
    *     
    * keys: ["drh_aus"]
    * columns: ["drh_aus","drh_aus_txt","k_v","k_s"]
    * filters: ["drh_aus","drh_aus_txt","k_v","k_s"]
    */
    class Rcncadr extends Base<Gordic.Rcn.Interface.GRcncadrDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncadrDto = Gordic.Rcn.Interface.GRcncadrDto;
    type RcncadrDtoNames = Gordic.Rcn.Interface.GRcncadrDtoNames;
    type RcncadrDtoFragments = Gordic.Rcn.Interface.GRcncadrDtoFragments;
    type RcncadrDtoTypes = Gordic.Rcn.Interface.GRcncadrDtoTypes;
    type RcncadrDtoTypeLengths = Gordic.Rcn.Interface.GRcncadrDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Vztah osoby k cestě.
    * keys: ["stav_dos"]
    * columns: ["stav_dos", "stav_dos_txt", "k_v", "k_s"]
    * filters: ["stav_dos","stav_dos_txt","k_v","k_s"]
    */
    class Rcncdos extends Base<Gordic.Rcn.Interface.GRcncdosDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncdosDto = Gordic.Rcn.Interface.GRcncdosDto;
    type RcncdosDtoNames = Gordic.Rcn.Interface.GRcncdosDtoNames;
    type RcncdosDtoFragments = Gordic.Rcn.Interface.GRcncdosDtoFragments;
    type RcncdosDtoTypes = Gordic.Rcn.Interface.GRcncdosDtoTypes;
    type RcncdosDtoTypeLengths = Gordic.Rcn.Interface.GRcncdosDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Druh pasu.
    * keys: ["druh_pas"]
    * columns: ["druh_pas", "druh_pas_txt", "k_v", "k_s"]
    * filters: ["druh_pas","druh_pas_txt","k_v","k_s"]
    */
    class Rcncdpa extends Base<Gordic.Rcn.Interface.GRcncdpaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncdpaDto = Gordic.Rcn.Interface.GRcncdpaDto;
    type RcncdpaDtoNames = Gordic.Rcn.Interface.GRcncdpaDtoNames;
    type RcncdpaDtoFragments = Gordic.Rcn.Interface.GRcncdpaDtoFragments;
    type RcncdpaDtoTypes = Gordic.Rcn.Interface.GRcncdpaDtoTypes;
    type RcncdpaDtoTypeLengths = Gordic.Rcn.Interface.GRcncdpaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Druh cestovního příkazu.
    * keys: ["druh_rcn"]
    * columns: ["druh_rcn", "druh_rcn_txt", "k_v", "k_s"]
    * filters: ["druh_rcn","druh_rcn_txt","k_v","k_s"]
    */
    class Rcncdrh extends Base<Gordic.Rcn.Interface.GRcncdrhDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncdrhDto = Gordic.Rcn.Interface.GRcncdrhDto;
    type RcncdrhDtoNames = Gordic.Rcn.Interface.GRcncdrhDtoNames;
    type RcncdrhDtoFragments = Gordic.Rcn.Interface.GRcncdrhDtoFragments;
    type RcncdrhDtoTypes = Gordic.Rcn.Interface.GRcncdrhDtoTypes;
    type RcncdrhDtoTypeLengths = Gordic.Rcn.Interface.GRcncdrhDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Druh víza.
    * keys: ["druh_viza"]
    * columns: ["druh_viza", "druh_viza_txt", "k_v", "k_s"]
    * filters: ["druh_viza","druh_viza_txt","k_v","k_s"]
    */
    class Rcncdvi extends Base<Gordic.Rcn.Interface.GRcncdviDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncdviDto = Gordic.Rcn.Interface.GRcncdviDto;
    type RcncdviDtoNames = Gordic.Rcn.Interface.GRcncdviDtoNames;
    type RcncdviDtoFragments = Gordic.Rcn.Interface.GRcncdviDtoFragments;
    type RcncdviDtoTypes = Gordic.Rcn.Interface.GRcncdviDtoTypes;
    type RcncdviDtoTypeLengths = Gordic.Rcn.Interface.GRcncdviDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Kategorie vozidla
    *     
    * keys: ["kat_aus"]
    * columns: ["kat_aus","kat_aus_txt","k_v","k_s"]
    * filters: ["kat_aus","kat_aus_txt","k_v","k_s"]
    */
    class Rcnckav extends Base<Gordic.Rcn.Interface.GRcnckavDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnckavDto = Gordic.Rcn.Interface.GRcnckavDto;
    type RcnckavDtoNames = Gordic.Rcn.Interface.GRcnckavDtoNames;
    type RcnckavDtoFragments = Gordic.Rcn.Interface.GRcnckavDtoFragments;
    type RcnckavDtoTypes = Gordic.Rcn.Interface.GRcnckavDtoTypes;
    type RcnckavDtoTypeLengths = Gordic.Rcn.Interface.GRcnckavDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Kategorie akce.
    * keys: ["ktg_rcn"]
    * columns: ["ktg_rcn", "ktg_rcn_txt", "k_v", "k_s"]
    * filters: ["ktg_rcn","ktg_rcn_txt","k_v","k_s"]
    */
    class Rcncktg extends Base<Gordic.Rcn.Interface.GRcncktgDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncktgDto = Gordic.Rcn.Interface.GRcncktgDto;
    type RcncktgDtoNames = Gordic.Rcn.Interface.GRcncktgDtoNames;
    type RcncktgDtoFragments = Gordic.Rcn.Interface.GRcncktgDtoFragments;
    type RcncktgDtoTypes = Gordic.Rcn.Interface.GRcncktgDtoTypes;
    type RcncktgDtoTypeLengths = Gordic.Rcn.Interface.GRcncktgDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Typy PHM.
    * keys: ["phm"]
    * columns: ["phm", "phm_txt", "k_v", "k_s"]
    * filters: ["phm","phm_txt","k_v","k_s"]
    */
    class Rcncphm extends Base<Gordic.Rcn.Interface.GRcncphmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncphmDto = Gordic.Rcn.Interface.GRcncphmDto;
    type RcncphmDtoNames = Gordic.Rcn.Interface.GRcncphmDtoNames;
    type RcncphmDtoFragments = Gordic.Rcn.Interface.GRcncphmDtoFragments;
    type RcncphmDtoTypes = Gordic.Rcn.Interface.GRcncphmDtoTypes;
    type RcncphmDtoTypeLengths = Gordic.Rcn.Interface.GRcncphmDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Stav cestovního příkazu.
    * keys: ["stav_prik"]
    * columns: ["stav_prik", "stav_prik_txt", "k_v", "k_s"]
    * filters: ["stav_prik","stav_prik_txt","k_v","k_s"]
    */
    class Rcncpid extends Base<Gordic.Rcn.Interface.GRcncpidDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncpidDto = Gordic.Rcn.Interface.GRcncpidDto;
    type RcncpidDtoNames = Gordic.Rcn.Interface.GRcncpidDtoNames;
    type RcncpidDtoFragments = Gordic.Rcn.Interface.GRcncpidDtoFragments;
    type RcncpidDtoTypes = Gordic.Rcn.Interface.GRcncpidDtoTypes;
    type RcncpidDtoTypeLengths = Gordic.Rcn.Interface.GRcncpidDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Stav platební karty.
    * keys: ["stav_plk"]
    * columns: ["stav_plk", "stav_plk_txt", "k_v", "k_s"]
    * filters: ["stav_plk","stav_plk_txt","k_v","k_s"]
    */
    class Rcncplk extends Base<Gordic.Rcn.Interface.GRcncplkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncplkDto = Gordic.Rcn.Interface.GRcncplkDto;
    type RcncplkDtoNames = Gordic.Rcn.Interface.GRcncplkDtoNames;
    type RcncplkDtoFragments = Gordic.Rcn.Interface.GRcncplkDtoFragments;
    type RcncplkDtoTypes = Gordic.Rcn.Interface.GRcncplkDtoTypes;
    type RcncplkDtoTypeLengths = Gordic.Rcn.Interface.GRcncplkDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Stav cesty.
    * keys: ["stav_rcn"]
    * columns: ["stav_rcn", "stav_rcn_txt", "k_v", "k_s"]
    * filters: ["stav_rcn","stav_rcn_txt","k_v","k_s"]
    */
    class Rcncrcn extends Base<Gordic.Rcn.Interface.GRcncrcnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncrcnDto = Gordic.Rcn.Interface.GRcncrcnDto;
    type RcncrcnDtoNames = Gordic.Rcn.Interface.GRcncrcnDtoNames;
    type RcncrcnDtoFragments = Gordic.Rcn.Interface.GRcncrcnDtoFragments;
    type RcncrcnDtoTypes = Gordic.Rcn.Interface.GRcncrcnDtoTypes;
    type RcncrcnDtoTypeLengths = Gordic.Rcn.Interface.GRcncrcnDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Typ rezervace vozidla
    *     
    * keys: ["typ_rsv"]
    * columns: ["typ_rsv","typ_rsv_txt","k_v","k_s"]
    * filters: ["typ_rsv","typ_rsv_txt","k_v","k_s"]
    */
    class Rcncret extends Base<Gordic.Rcn.Interface.GRcncretDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncretDto = Gordic.Rcn.Interface.GRcncretDto;
    type RcncretDtoNames = Gordic.Rcn.Interface.GRcncretDtoNames;
    type RcncretDtoFragments = Gordic.Rcn.Interface.GRcncretDtoFragments;
    type RcncretDtoTypes = Gordic.Rcn.Interface.GRcncretDtoTypes;
    type RcncretDtoTypeLengths = Gordic.Rcn.Interface.GRcncretDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Stav rezervace vozidla
    *     
    * keys: ["stav_rsv"]
    * columns: ["stav_rsv","stav_rsv_txt","k_v","k_s"]
    * filters: ["stav_rsv","stav_rsv_txt","k_v","k_s"]
    */
    class Rcncrsv extends Base<Gordic.Rcn.Interface.GRcncrsvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncrsvDto = Gordic.Rcn.Interface.GRcncrsvDto;
    type RcncrsvDtoNames = Gordic.Rcn.Interface.GRcncrsvDtoNames;
    type RcncrsvDtoFragments = Gordic.Rcn.Interface.GRcncrsvDtoFragments;
    type RcncrsvDtoTypes = Gordic.Rcn.Interface.GRcncrsvDtoTypes;
    type RcncrsvDtoTypeLengths = Gordic.Rcn.Interface.GRcncrsvDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Stav pasu.
    * keys: ["stav_pas"]
    * columns: ["stav_pas", "stav_pas_txt", "k_v", "k_s"]
    * filters: ["stav_pas","stav_pas_txt","k_v","k_s"]
    */
    class Rcncspa extends Base<Gordic.Rcn.Interface.GRcncspaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcncspaDto = Gordic.Rcn.Interface.GRcncspaDto;
    type RcncspaDtoNames = Gordic.Rcn.Interface.GRcncspaDtoNames;
    type RcncspaDtoFragments = Gordic.Rcn.Interface.GRcncspaDtoFragments;
    type RcncspaDtoTypes = Gordic.Rcn.Interface.GRcncspaDtoTypes;
    type RcncspaDtoTypeLengths = Gordic.Rcn.Interface.GRcncspaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Typ pasu.
    * keys: ["typ_pas"]
    * columns: ["typ_pas", "typ_pas_txt", "k_v", "k_s"]
    * filters: ["typ_pas","typ_pas_txt","k_v","k_s"]
    */
    class Rcnctpa extends Base<Gordic.Rcn.Interface.GRcnctpaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnctpaDto = Gordic.Rcn.Interface.GRcnctpaDto;
    type RcnctpaDtoNames = Gordic.Rcn.Interface.GRcnctpaDtoNames;
    type RcnctpaDtoFragments = Gordic.Rcn.Interface.GRcnctpaDtoFragments;
    type RcnctpaDtoTypes = Gordic.Rcn.Interface.GRcnctpaDtoTypes;
    type RcnctpaDtoTypeLengths = Gordic.Rcn.Interface.GRcnctpaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Způsob vyřízení žádosti o PLK.
    * keys: ["zp_vyriz"]
    * columns: ["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]
    * filters: ["zp_vyriz","zp_vyriz_txt","k_v","k_s"]
    */
    class Rcnczpk extends Base<Gordic.Rcn.Interface.GRcnczpkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnczpkDto = Gordic.Rcn.Interface.GRcnczpkDto;
    type RcnczpkDtoNames = Gordic.Rcn.Interface.GRcnczpkDtoNames;
    type RcnczpkDtoFragments = Gordic.Rcn.Interface.GRcnczpkDtoFragments;
    type RcnczpkDtoTypes = Gordic.Rcn.Interface.GRcnczpkDtoTypes;
    type RcnczpkDtoTypeLengths = Gordic.Rcn.Interface.GRcnczpkDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Způsoby úhrady výdajů.
    * keys: ["zp_uhr"]
    * columns: ["zp_uhr", "zp_uhr_txt", "k_v", "k_s"]
    * filters: ["zp_uhr","zp_uhr_txt","k_v","k_s"]
    */
    class Rcnczuh extends Base<Gordic.Rcn.Interface.GRcnczuhDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnczuhDto = Gordic.Rcn.Interface.GRcnczuhDto;
    type RcnczuhDtoNames = Gordic.Rcn.Interface.GRcnczuhDtoNames;
    type RcnczuhDtoFragments = Gordic.Rcn.Interface.GRcnczuhDtoFragments;
    type RcnczuhDtoTypes = Gordic.Rcn.Interface.GRcnczuhDtoTypes;
    type RcnczuhDtoTypeLengths = Gordic.Rcn.Interface.GRcnczuhDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Způsob vyřízení víza.
    * keys: ["zp_vyriz"]
    * columns: ["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]
    * filters: ["zp_vyriz","zp_vyriz_txt","k_v","k_s"]
    */
    class Rcnczvv extends Base<Gordic.Rcn.Interface.GRcnczvvDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnczvvDto = Gordic.Rcn.Interface.GRcnczvvDto;
    type RcnczvvDtoNames = Gordic.Rcn.Interface.GRcnczvvDtoNames;
    type RcnczvvDtoFragments = Gordic.Rcn.Interface.GRcnczvvDtoFragments;
    type RcnczvvDtoTypes = Gordic.Rcn.Interface.GRcnczvvDtoTypes;
    type RcnczvvDtoTypeLengths = Gordic.Rcn.Interface.GRcnczvvDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Způsob znehodnocení pasu.
    * keys: ["zp_zneh"]
    * columns: ["zp_zneh", "zp_zneh_txt", "k_v", "k_s"]
    * filters: ["zp_zneh","zp_zneh_txt","k_v","k_s"]
    */
    class Rcnczzp extends Base<Gordic.Rcn.Interface.GRcnczzpDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnczzpDto = Gordic.Rcn.Interface.GRcnczzpDto;
    type RcnczzpDtoNames = Gordic.Rcn.Interface.GRcnczzpDtoNames;
    type RcnczzpDtoFragments = Gordic.Rcn.Interface.GRcnczzpDtoFragments;
    type RcnczzpDtoTypes = Gordic.Rcn.Interface.GRcnczzpDtoTypes;
    type RcnczzpDtoTypeLengths = Gordic.Rcn.Interface.GRcnczzpDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Služební vozidla
    *     
    * keys: ["ixp_aus"]
    * columns: ["ixp_aus", "ac", "evi_cis", "druh_aus", "typ_aus", "vin", "spz", "aktivita", "ixp_den", "poznamka"]
    * filters: ["ixp_aus","ac","evi_cis","druh_aus","drh_aus","kat_aus","typ_aus","spz","aktivita","ixp_den","ixs_rsv","dat_n","dat_u"]
    */
    class Rcnsaus extends Base<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsausDto = Gordic.Rcn.Interface.GRcnSluzebniVozidloDto;
    type RcnsausDtoNames = Gordic.Rcn.Interface.GRcnSluzebniVozidloDtoNames;
    type RcnsausDtoFragments = Gordic.Rcn.Interface.GRcnSluzebniVozidloDtoFragments;
    type RcnsausDtoTypes = Gordic.Rcn.Interface.GRcnSluzebniVozidloDtoTypes;
    type RcnsausDtoTypeLengths = Gordic.Rcn.Interface.GRcnSluzebniVozidloDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Kniha RCN
    *     
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "nazev", "rok", "aktivita"]
    * filters: ["ixp_den","nazev","aktivita"]
    */
    class Rcnsden extends Base<Gordic.Rcn.Interface.GRcnKnihaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsdenDto = Gordic.Rcn.Interface.GRcnKnihaDto;
    type RcnsdenDtoNames = Gordic.Rcn.Interface.GRcnKnihaDtoNames;
    type RcnsdenDtoFragments = Gordic.Rcn.Interface.GRcnKnihaDtoFragments;
    type RcnsdenDtoTypes = Gordic.Rcn.Interface.GRcnKnihaDtoTypes;
    type RcnsdenDtoTypeLengths = Gordic.Rcn.Interface.GRcnKnihaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Definice navýšení v roce.
    * keys: ["dvn","rok"]
    * columns: ["dvn", "rok", "kod_dvn", "nazev", "poznamka", "aktivita"]
    * filters: ["dvn","rok","kod_dvn","nazev","poznamka","aktivita"]
    */
    class Rcnsdvn extends Base<Gordic.Rcn.Interface.GRcnsdvnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsdvnDto = Gordic.Rcn.Interface.GRcnsdvnDto;
    type RcnsdvnDtoNames = Gordic.Rcn.Interface.GRcnsdvnDtoNames;
    type RcnsdvnDtoFragments = Gordic.Rcn.Interface.GRcnsdvnDtoFragments;
    type RcnsdvnDtoTypes = Gordic.Rcn.Interface.GRcnsdvnDtoTypes;
    type RcnsdvnDtoTypeLengths = Gordic.Rcn.Interface.GRcnsdvnDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Osoby pro RCN.
    * keys: ["ixs_osr"]
    * columns: ["ixs_osr", "typ_osr", "jmeno", "prijmeni", "tit_pred", "tit_za", "hodnost", "os_cislo", "ixs_esu", "ixs_ref", "dat_od", "dat_do", "poznamka", "aktivita", "nazev", "ico", "ucs", "uus", "ixs_orj", "adresa", "nks", "vkn", "typ_dos", "ixs_tos", "stav_dos"]
    * filters: ["ixs_osr","typ_osr","jmeno","prijmeni","tit_pred","tit_za","hodnost","os_cislo","ixs_esu","ixs_ref","dat_od","dat_do","poznamka","aktivita","nazev","ico","ucs","uus","ixs_orj","adresa","nks","vkn","typ_dos","ixs_tos","stav_dos"]
    */
    class Rcnsosr extends Base<Gordic.Rcn.Interface.GRcnsosrDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsosrDto = Gordic.Rcn.Interface.GRcnsosrDto;
    type RcnsosrDtoNames = Gordic.Rcn.Interface.GRcnsosrDtoNames;
    type RcnsosrDtoFragments = Gordic.Rcn.Interface.GRcnsosrDtoFragments;
    type RcnsosrDtoTypes = Gordic.Rcn.Interface.GRcnsosrDtoTypes;
    type RcnsosrDtoTypeLengths = Gordic.Rcn.Interface.GRcnsosrDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Pasy.
    * keys: ["ixp_pas"]
    * columns: ["ixp_pas", "ixp_den", "rok", "ac", "evi_cis", "cislo_pas", "druh_pas", "typ_pas", "stav_pas", "zp_zneh", "dat_platnost", "dat_evi_od", "dat_evi_do", "dat_vyd_oso", "kontakt_oso", "dat_nav_oso", "dat_vra", "poznamka", "aktivita", "dat_vyd_do", "ixs_osr"]
    * filters: ["ixp_pas","ixp_den","rok","ac","evi_cis","cislo_pas","druh_pas","typ_pas","stav_pas","zp_zneh","dat_platnost","dat_evi_od","dat_evi_do","dat_vyd_oso","kontakt_oso","dat_nav_oso","dat_vra","poznamka","aktivita","dat_vyd_do","ixs_osr"]
    */
    class Rcnspas extends Base<Gordic.Rcn.Interface.GRcnspasDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnspasDto = Gordic.Rcn.Interface.GRcnspasDto;
    type RcnspasDtoNames = Gordic.Rcn.Interface.GRcnspasDtoNames;
    type RcnspasDtoFragments = Gordic.Rcn.Interface.GRcnspasDtoFragments;
    type RcnspasDtoTypes = Gordic.Rcn.Interface.GRcnspasDtoTypes;
    type RcnspasDtoTypeLengths = Gordic.Rcn.Interface.GRcnspasDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Platební karty.
    * keys: ["ixp_plk"]
    * columns: ["ixp_plk", "ixp_den", "rok", "ac", "evi_cis", "cislo_plk", "typ_plk", "stav_plk", "ucet", "banka", "dat_platnost", "c_limit_atm", "c_limit_cas", "c_limit_agr", "dat_od", "dat_do", "popis", "aktivita", "ixs_osr", "ico", "ucs", "uus", "ixp_aus"]
    * filters: ["ixp_plk","ixp_den","rok","ac","evi_cis","cislo_plk","typ_plk","stav_plk","ucet","banka","dat_platnost","c_limit_atm","c_limit_cas","c_limit_agr","dat_od","dat_do","popis","aktivita","ixs_osr","ico","ucs","uus","ixp_aus"]
    */
    class Rcnsplk extends Base<Gordic.Rcn.Interface.GRcnsplkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsplkDto = Gordic.Rcn.Interface.GRcnsplkDto;
    type RcnsplkDtoNames = Gordic.Rcn.Interface.GRcnsplkDtoNames;
    type RcnsplkDtoFragments = Gordic.Rcn.Interface.GRcnsplkDtoFragments;
    type RcnsplkDtoTypes = Gordic.Rcn.Interface.GRcnsplkDtoTypes;
    type RcnsplkDtoTypeLengths = Gordic.Rcn.Interface.GRcnsplkDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Cesty.
    * keys: ["ixs_rcn"]
    * columns: ["ixs_rcn", "ixp_den", "ixp_pcn", "rok", "uex_akt", "ac", "evi_cis", "stav_rcn", "nazev", "rozkaz", "stat", "misto", "ucel", "zkr_dopr", "misto_n", "dat_n", "misto_u", "dat_u", "misto_hra1", "dat_hra1", "misto_hra2", "dat_hra2", "podm_uskut", "podm_vypoc", "ico_fin", "nks_fin", "ico_sdr", "nks_sdr", "ico_real", "nks_real", "ixs_fun_real", "ixs_fun_zad", "ixs_fun_akt", "ico", "ucs", "uus", "nks", "aktivita", "ixp_kur", "ixs_fun_komp", "ixp_sml", "ktg_rcn", "urn", "ixs_zmp_zad", "te1_p", "rok_cia", "ico_cia", "cislo_cia", "ixs_cia", "typ_zmr", "ixp_zmr", "ixs_cle", "typ_poz", "hodnota_te1", "osob_zahranici", "osob_doprovod", "priz_view"]
    * filters: ["ixs_rcn","ixp_den","ixp_pcn","rok","uex_akt","ac","evi_cis","stav_rcn","nazev","rozkaz","stat","misto","ucel","zkr_dopr","misto_n","dat_n","misto_u","dat_u","misto_hra1","dat_hra1","misto_hra2","dat_hra2","podm_uskut","podm_vypoc","ico_fin","nks_fin","ico_sdr","nks_sdr","ico_real","nks_real","ixs_fun_real","ixs_fun_zad","ixs_fun_akt","ico","ucs","uus","nks","aktivita","ixp_kur","ixs_fun_komp","ixp_sml","ktg_rcn","urn","ixs_zmp_zad","te1_p","rok_cia","ico_cia","cislo_cia","ixs_cia","typ_zmr","ixp_zmr","ixs_cle","typ_poz","hodnota_te1","osob_zahranici","osob_doprovod","priz_view"]
    */
    class Rcnsrcn extends Base<Gordic.Rcn.Interface.GRcnsrcnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsrcnDto = Gordic.Rcn.Interface.GRcnsrcnDto;
    type RcnsrcnDtoNames = Gordic.Rcn.Interface.GRcnsrcnDtoNames;
    type RcnsrcnDtoFragments = Gordic.Rcn.Interface.GRcnsrcnDtoFragments;
    type RcnsrcnDtoTypes = Gordic.Rcn.Interface.GRcnsrcnDtoTypes;
    type RcnsrcnDtoTypeLengths = Gordic.Rcn.Interface.GRcnsrcnDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - Rezervace vozidel
    *     
    * keys: ["ixs_rsv"]
    * columns: ["ixs_rsv","ac","nazev","misto_n","dat_n"]
    * filters: ["ixs_rsv","ac","nazev","stav_rsv","aktivita"]
    */
    class Rcnsrsv extends Base<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsrsvDto = Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto;
    type RcnsrsvDtoNames = Gordic.Rcn.Interface.GRcnRezervaceVozidlaDtoNames;
    type RcnsrsvDtoFragments = Gordic.Rcn.Interface.GRcnRezervaceVozidlaDtoFragments;
    type RcnsrsvDtoTypes = Gordic.Rcn.Interface.GRcnRezervaceVozidlaDtoTypes;
    type RcnsrsvDtoTypeLengths = Gordic.Rcn.Interface.GRcnRezervaceVozidlaDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku pro rozlišení typu osoby.
    * keys: ["ixs_tor"]
    * columns: ["ixs_tor", "nazev", "ixs_tos", "aktivita"]
    * filters: ["ixs_tor","nazev","ixs_tos","aktivita"]
    */
    class Rcnstor extends Base<Gordic.Rcn.Interface.GRcnstorDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnstorDto = Gordic.Rcn.Interface.GRcnstorDto;
    type RcnstorDtoNames = Gordic.Rcn.Interface.GRcnstorDtoNames;
    type RcnstorDtoFragments = Gordic.Rcn.Interface.GRcnstorDtoFragments;
    type RcnstorDtoTypes = Gordic.Rcn.Interface.GRcnstorDtoTypes;
    type RcnstorDtoTypeLengths = Gordic.Rcn.Interface.GRcnstorDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Uživatelsky definovaný typ osoby.
    * keys: ["ixs_tos"]
    * columns: ["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]
    * filters: ["ixs_tos","nazev","kod_tos","poznamka","typ_dos","aktivita"]
    */
    class Rcnstos extends Base<Gordic.Rcn.Interface.GRcnstosDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnstosDto = Gordic.Rcn.Interface.GRcnstosDto;
    type RcnstosDtoNames = Gordic.Rcn.Interface.GRcnstosDtoNames;
    type RcnstosDtoFragments = Gordic.Rcn.Interface.GRcnstosDtoFragments;
    type RcnstosDtoTypes = Gordic.Rcn.Interface.GRcnstosDtoTypes;
    type RcnstosDtoTypeLengths = Gordic.Rcn.Interface.GRcnstosDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Typy platebních karet.
    * keys: ["typ_plk"]
    * columns: ["typ_plk", "typ_plk_txt", "popis", "aktivita"]
    * filters: ["typ_plk","typ_plk_txt","popis","aktivita"]
    */
    class Rcnstpk extends Base<Gordic.Rcn.Interface.GRcnstpkDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnstpkDto = Gordic.Rcn.Interface.GRcnstpkDto;
    type RcnstpkDtoNames = Gordic.Rcn.Interface.GRcnstpkDtoNames;
    type RcnstpkDtoFragments = Gordic.Rcn.Interface.GRcnstpkDtoFragments;
    type RcnstpkDtoTypes = Gordic.Rcn.Interface.GRcnstpkDtoTypes;
    type RcnstpkDtoTypeLengths = Gordic.Rcn.Interface.GRcnstpkDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Definice úrovně návštěvy.
    * keys: ["urn"]
    * columns: ["urn", "kod_urn", "nazev", "aktivita"]
    * filters: ["urn","kod_urn","nazev","aktivita"]
    */
    class Rcnsurn extends Base<Gordic.Rcn.Interface.GRcnsurnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsurnDto = Gordic.Rcn.Interface.GRcnsurnDto;
    type RcnsurnDtoNames = Gordic.Rcn.Interface.GRcnsurnDtoNames;
    type RcnsurnDtoFragments = Gordic.Rcn.Interface.GRcnsurnDtoFragments;
    type RcnsurnDtoTypes = Gordic.Rcn.Interface.GRcnsurnDtoTypes;
    type RcnsurnDtoTypeLengths = Gordic.Rcn.Interface.GRcnsurnDtoTypeLengths;

    /**
    * Reader pro čtení dat číselníku Výkon.
    * keys: ["code","nks"]
    * columns: ["code", "name", "nks"]
    * filters: ["code","name","ico","nks","ixs_roz"]
    */
    class Rcnsvkn extends Base<Gordic.Rcn.Interface.GRcnsvknDto>
    {
        constructor(options?: IGReaderBase);
    }
    type RcnsvknDto = Gordic.Rcn.Interface.GRcnsvknDto;
    type RcnsvknDtoNames = Gordic.Rcn.Interface.GRcnsvknDtoNames;
    type RcnsvknDtoFragments = Gordic.Rcn.Interface.GRcnsvknDtoFragments;
    type RcnsvknDtoTypes = Gordic.Rcn.Interface.GRcnsvknDtoTypes;
    type RcnsvknDtoTypeLengths = Gordic.Rcn.Interface.GRcnsvknDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Reader pro čtení dat číselníku Pokladní kniha.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixp_den", "nazev", "rok"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "ico", "ucs", "uus", "rok", "mena", "mena_txt", "nazev", "aktivita", "ktg_den"]
    * filters: ["ixp_den","ico","ucs","uus","rok","mena","aktivita","nazev","ktg_den"]
    */
    function poksden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GPoksdenDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GPoksdenDto>;
    /**
    * Reader pro čtení dat číselníku Pokladník.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_fun", "ixp_den", "nazev", "rok"]
    *
    * DataReader
    * keys: ["ixs_fun","ixp_den"]
    * columns: ["ixs_fun", "rok", "aktivita", "ixp_den", "nazev"]
    * filters: ["ixs_fun","rok","aktivita","ixp_den","nazev","faze"]
    */
    function poksoso(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GPoksosoDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GPoksosoDto>;
    /**
    * 
    *     Klientská část AL - Druh vozidla
    *     
    * FieldOptions
    * itemTemplate: "{drh_aus_txt}"
    * helperColumns: ["drh_aus","drh_aus_txt"]
    *
    * DataReader
    * keys: ["drh_aus"]
    * columns: ["drh_aus","drh_aus_txt","k_v","k_s"]
    * filters: ["drh_aus","drh_aus_txt","k_v","k_s"]
    */
    function rcncadr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncadrDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncadrDto>;
    /**
    * Reader pro čtení dat číselníku Vztah osoby k cestě.
    * FieldOptions
    * itemTemplate: "{stav_dos_txt}"
    * helperColumns: ["stav_dos", "stav_dos_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["stav_dos"]
    * columns: ["stav_dos", "stav_dos_txt", "k_v", "k_s"]
    * filters: ["stav_dos","stav_dos_txt","k_v","k_s"]
    */
    function rcncdos(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncdosDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncdosDto>;
    /**
    * Reader pro čtení dat číselníku Druh pasu.
    * FieldOptions
    * itemTemplate: "{druh_pas_txt}"
    * helperColumns: ["druh_pas", "druh_pas_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["druh_pas"]
    * columns: ["druh_pas", "druh_pas_txt", "k_v", "k_s"]
    * filters: ["druh_pas","druh_pas_txt","k_v","k_s"]
    */
    function rcncdpa(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncdpaDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncdpaDto>;
    /**
    * Reader pro čtení dat číselníku Druh cestovního příkazu.
    * FieldOptions
    * itemTemplate: "{druh_rcn_txt}"
    * helperColumns: ["druh_rcn", "druh_rcn_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["druh_rcn"]
    * columns: ["druh_rcn", "druh_rcn_txt", "k_v", "k_s"]
    * filters: ["druh_rcn","druh_rcn_txt","k_v","k_s"]
    */
    function rcncdrh(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncdrhDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncdrhDto>;
    /**
    * Reader pro čtení dat číselníku Druh víza.
    * FieldOptions
    * itemTemplate: "{druh_viza_txt}"
    * helperColumns: ["druh_viza", "druh_viza_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["druh_viza"]
    * columns: ["druh_viza", "druh_viza_txt", "k_v", "k_s"]
    * filters: ["druh_viza","druh_viza_txt","k_v","k_s"]
    */
    function rcncdvi(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncdviDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncdviDto>;
    /**
    * 
    *     Klientská část AL - Kategorie vozidla
    *     
    * FieldOptions
    * itemTemplate: "{kat_aus_txt}"
    * helperColumns: ["kat_aus", "kat_aus_txt"]
    *
    * DataReader
    * keys: ["kat_aus"]
    * columns: ["kat_aus","kat_aus_txt","k_v","k_s"]
    * filters: ["kat_aus","kat_aus_txt","k_v","k_s"]
    */
    function rcnckav(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnckavDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnckavDto>;
    /**
    * Reader pro čtení dat číselníku Kategorie akce.
    * FieldOptions
    * itemTemplate: "{ktg_rcn_txt}"
    * helperColumns: ["ktg_rcn", "ktg_rcn_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["ktg_rcn"]
    * columns: ["ktg_rcn", "ktg_rcn_txt", "k_v", "k_s"]
    * filters: ["ktg_rcn","ktg_rcn_txt","k_v","k_s"]
    */
    function rcncktg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncktgDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncktgDto>;
    /**
    * Reader pro čtení dat číselníku Typy PHM.
    * FieldOptions
    * itemTemplate: "{phm_txt}"
    * helperColumns: ["phm", "phm_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["phm"]
    * columns: ["phm", "phm_txt", "k_v", "k_s"]
    * filters: ["phm","phm_txt","k_v","k_s"]
    */
    function rcncphm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncphmDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncphmDto>;
    /**
    * Reader pro čtení dat číselníku Stav cestovního příkazu.
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["stav_prik", "stav_prik_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["stav_prik"]
    * columns: ["stav_prik", "stav_prik_txt", "k_v", "k_s"]
    * filters: ["stav_prik","stav_prik_txt","k_v","k_s"]
    */
    function rcncpid(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncpidDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncpidDto>;
    /**
    * Reader pro čtení dat číselníku Stav platební karty.
    * FieldOptions
    * itemTemplate: "{stav_plk_txt}"
    * helperColumns: ["stav_plk", "stav_plk_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["stav_plk"]
    * columns: ["stav_plk", "stav_plk_txt", "k_v", "k_s"]
    * filters: ["stav_plk","stav_plk_txt","k_v","k_s"]
    */
    function rcncplk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncplkDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncplkDto>;
    /**
    * Reader pro čtení dat číselníku Stav cesty.
    * FieldOptions
    * itemTemplate: "{stav_rcn_txt}"
    * helperColumns: ["stav_rcn", "stav_rcn_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["stav_rcn"]
    * columns: ["stav_rcn", "stav_rcn_txt", "k_v", "k_s"]
    * filters: ["stav_rcn","stav_rcn_txt","k_v","k_s"]
    */
    function rcncrcn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncrcnDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncrcnDto>;
    /**
    * 
    *     Klientská část AL - Typ rezervace vozidla
    *     
    * FieldOptions
    * itemTemplate: "{typ_rsv_txt}"
    * helperColumns: ["typ_rsv", "typ_rsv_txt"]
    *
    * DataReader
    * keys: ["typ_rsv"]
    * columns: ["typ_rsv","typ_rsv_txt","k_v","k_s"]
    * filters: ["typ_rsv","typ_rsv_txt","k_v","k_s"]
    */
    function rcncret(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncretDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncretDto>;
    /**
    * 
    *     Klientská část AL - Stav rezervace vozidla
    *     
    * FieldOptions
    * itemTemplate: "{stav_rsv_txt}"
    * helperColumns: ["stav_rsv", "stav_rsv_txt"]
    *
    * DataReader
    * keys: ["stav_rsv"]
    * columns: ["stav_rsv","stav_rsv_txt","k_v","k_s"]
    * filters: ["stav_rsv","stav_rsv_txt","k_v","k_s"]
    */
    function rcncrsv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncrsvDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncrsvDto>;
    /**
    * Reader pro čtení dat číselníku Stav pasu.
    * FieldOptions
    * itemTemplate: "{stav_pas_txt}"
    * helperColumns: ["stav_pas", "stav_pas_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["stav_pas"]
    * columns: ["stav_pas", "stav_pas_txt", "k_v", "k_s"]
    * filters: ["stav_pas","stav_pas_txt","k_v","k_s"]
    */
    function rcncspa(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcncspaDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcncspaDto>;
    /**
    * Reader pro čtení dat číselníku Typ pasu.
    * FieldOptions
    * itemTemplate: "{typ_pas_txt}"
    * helperColumns: ["typ_pas", "typ_pas_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["typ_pas"]
    * columns: ["typ_pas", "typ_pas_txt", "k_v", "k_s"]
    * filters: ["typ_pas","typ_pas_txt","k_v","k_s"]
    */
    function rcnctpa(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnctpaDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnctpaDto>;
    /**
    * Reader pro čtení dat číselníku Způsob vyřízení žádosti o PLK.
    * FieldOptions
    * itemTemplate: "{zp_vyriz_txt}"
    * helperColumns: ["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["zp_vyriz"]
    * columns: ["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]
    * filters: ["zp_vyriz","zp_vyriz_txt","k_v","k_s"]
    */
    function rcnczpk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnczpkDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnczpkDto>;
    /**
    * Reader pro čtení dat číselníku Způsoby úhrady výdajů.
    * FieldOptions
    * itemTemplate: "{zp_uhr_txt}"
    * helperColumns: ["zp_uhr", "zp_uhr_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["zp_uhr"]
    * columns: ["zp_uhr", "zp_uhr_txt", "k_v", "k_s"]
    * filters: ["zp_uhr","zp_uhr_txt","k_v","k_s"]
    */
    function rcnczuh(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnczuhDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnczuhDto>;
    /**
    * Reader pro čtení dat číselníku Způsob vyřízení víza.
    * FieldOptions
    * itemTemplate: "{zp_vyriz_txt}"
    * helperColumns: ["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["zp_vyriz"]
    * columns: ["zp_vyriz", "zp_vyriz_txt", "k_v", "k_s"]
    * filters: ["zp_vyriz","zp_vyriz_txt","k_v","k_s"]
    */
    function rcnczvv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnczvvDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnczvvDto>;
    /**
    * Reader pro čtení dat číselníku Způsob znehodnocení pasu.
    * FieldOptions
    * itemTemplate: "{zp_zneh_txt}"
    * helperColumns: ["zp_zneh", "zp_zneh_txt", "k_v", "k_s"]
    *
    * DataReader
    * keys: ["zp_zneh"]
    * columns: ["zp_zneh", "zp_zneh_txt", "k_v", "k_s"]
    * filters: ["zp_zneh","zp_zneh_txt","k_v","k_s"]
    */
    function rcnczzp(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnczzpDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnczzpDto>;
    /**
    * 
    *     Klientská část AL - Služební vozidla
    *     
    * FieldOptions
    * itemTemplate: "{spz}, {typ_aus}"
    * helperColumns: ["ixp_aus", "typ_aus", "spz"]
    *
    * DataReader
    * keys: ["ixp_aus"]
    * columns: ["ixp_aus", "ac", "evi_cis", "druh_aus", "typ_aus", "vin", "spz", "aktivita", "ixp_den", "poznamka"]
    * filters: ["ixp_aus","ac","evi_cis","druh_aus","drh_aus","kat_aus","typ_aus","spz","aktivita","ixp_den","ixs_rsv","dat_n","dat_u"]
    */
    function rcnsaus(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>;
    /**
    * 
    *     Klientská část AL - Kniha RCN
    *     
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["nazev", "rok", "ixp_den"]
    *
    * DataReader
    * keys: ["ixp_den"]
    * columns: ["ixp_den", "nazev", "rok", "aktivita"]
    * filters: ["ixp_den","nazev","aktivita"]
    */
    function rcnsden(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnKnihaDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnKnihaDto>;
    /**
    * Reader pro čtení dat číselníku Definice navýšení v roce.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["dvn", "rok", "kod_dvn", "nazev", "poznamka", "aktivita"]
    *
    * DataReader
    * keys: ["dvn","rok"]
    * columns: ["dvn", "rok", "kod_dvn", "nazev", "poznamka", "aktivita"]
    * filters: ["dvn","rok","kod_dvn","nazev","poznamka","aktivita"]
    */
    function rcnsdvn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnsdvnDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnsdvnDto>;
    /**
    * Reader pro čtení dat číselníku Osoby pro RCN.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_osr", "typ_osr", "jmeno", "prijmeni", "tit_pred", "tit_za", "hodnost", "os_cislo", "ixs_esu", "ixs_ref", "dat_od", "dat_do", "poznamka", "aktivita", "nazev", "ico", "ucs", "uus", "ixs_orj", "adresa", "nks", "vkn", "typ_dos", "ixs_tos", "stav_dos"]
    *
    * DataReader
    * keys: ["ixs_osr"]
    * columns: ["ixs_osr", "typ_osr", "jmeno", "prijmeni", "tit_pred", "tit_za", "hodnost", "os_cislo", "ixs_esu", "ixs_ref", "dat_od", "dat_do", "poznamka", "aktivita", "nazev", "ico", "ucs", "uus", "ixs_orj", "adresa", "nks", "vkn", "typ_dos", "ixs_tos", "stav_dos"]
    * filters: ["ixs_osr","typ_osr","jmeno","prijmeni","tit_pred","tit_za","hodnost","os_cislo","ixs_esu","ixs_ref","dat_od","dat_do","poznamka","aktivita","nazev","ico","ucs","uus","ixs_orj","adresa","nks","vkn","typ_dos","ixs_tos","stav_dos"]
    */
    function rcnsosr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnsosrDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnsosrDto>;
    /**
    * Reader pro čtení dat číselníku Pasy.
    * FieldOptions
    * itemTemplate: "{cislo_pas}"
    * helperColumns: ["ixp_pas", "ixp_den", "rok", "ac", "evi_cis", "cislo_pas", "druh_pas", "typ_pas", "stav_pas", "zp_zneh", "dat_platnost", "dat_evi_od", "dat_evi_do", "dat_vyd_oso", "kontakt_oso", "dat_nav_oso", "dat_vra", "poznamka", "aktivita", "dat_vyd_do", "ixs_osr"]
    *
    * DataReader
    * keys: ["ixp_pas"]
    * columns: ["ixp_pas", "ixp_den", "rok", "ac", "evi_cis", "cislo_pas", "druh_pas", "typ_pas", "stav_pas", "zp_zneh", "dat_platnost", "dat_evi_od", "dat_evi_do", "dat_vyd_oso", "kontakt_oso", "dat_nav_oso", "dat_vra", "poznamka", "aktivita", "dat_vyd_do", "ixs_osr"]
    * filters: ["ixp_pas","ixp_den","rok","ac","evi_cis","cislo_pas","druh_pas","typ_pas","stav_pas","zp_zneh","dat_platnost","dat_evi_od","dat_evi_do","dat_vyd_oso","kontakt_oso","dat_nav_oso","dat_vra","poznamka","aktivita","dat_vyd_do","ixs_osr"]
    */
    function rcnspas(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnspasDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnspasDto>;
    /**
    * Reader pro čtení dat číselníku Platební karty.
    * FieldOptions
    * itemTemplate: "{cislo_plk}"
    * helperColumns: ["ixp_plk", "ixp_den", "rok", "ac", "evi_cis", "cislo_plk", "typ_plk", "stav_plk", "ucet", "banka", "dat_platnost", "c_limit_atm", "c_limit_cas", "c_limit_agr", "dat_od", "dat_do", "popis", "aktivita", "ixs_osr", "ico", "ucs", "uus", "ixp_aus"]
    *
    * DataReader
    * keys: ["ixp_plk"]
    * columns: ["ixp_plk", "ixp_den", "rok", "ac", "evi_cis", "cislo_plk", "typ_plk", "stav_plk", "ucet", "banka", "dat_platnost", "c_limit_atm", "c_limit_cas", "c_limit_agr", "dat_od", "dat_do", "popis", "aktivita", "ixs_osr", "ico", "ucs", "uus", "ixp_aus"]
    * filters: ["ixp_plk","ixp_den","rok","ac","evi_cis","cislo_plk","typ_plk","stav_plk","ucet","banka","dat_platnost","c_limit_atm","c_limit_cas","c_limit_agr","dat_od","dat_do","popis","aktivita","ixs_osr","ico","ucs","uus","ixp_aus"]
    */
    function rcnsplk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnsplkDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnsplkDto>;
    /**
    * Reader pro čtení dat číselníku Cesty.
    * FieldOptions
    * itemTemplate: "{ixs_rcn}, {ac}, {nazev}"
    * helperColumns: ["ixs_rcn", "ixp_den", "ixp_pcn", "rok", "uex_akt", "ac", "evi_cis", "stav_rcn", "nazev", "rozkaz", "stat", "misto", "ucel", "zkr_dopr", "misto_n", "dat_n", "misto_u", "dat_u", "misto_hra1", "dat_hra1", "misto_hra2", "dat_hra2", "podm_uskut", "podm_vypoc", "ico_fin", "nks_fin", "ico_sdr", "nks_sdr", "ico_real", "nks_real", "ixs_fun_real", "ixs_fun_zad", "ixs_fun_akt", "ico", "ucs", "uus", "nks", "aktivita", "ixp_kur", "ixs_fun_komp", "ixp_sml", "ktg_rcn", "urn", "ixs_zmp_zad", "te1_p", "rok_cia", "ico_cia", "cislo_cia", "ixs_cia", "typ_zmr", "ixp_zmr", "ixs_cle", "typ_poz", "hodnota_te1", "osob_zahranici", "osob_doprovod", "priz_view"]
    *
    * DataReader
    * keys: ["ixs_rcn"]
    * columns: ["ixs_rcn", "ixp_den", "ixp_pcn", "rok", "uex_akt", "ac", "evi_cis", "stav_rcn", "nazev", "rozkaz", "stat", "misto", "ucel", "zkr_dopr", "misto_n", "dat_n", "misto_u", "dat_u", "misto_hra1", "dat_hra1", "misto_hra2", "dat_hra2", "podm_uskut", "podm_vypoc", "ico_fin", "nks_fin", "ico_sdr", "nks_sdr", "ico_real", "nks_real", "ixs_fun_real", "ixs_fun_zad", "ixs_fun_akt", "ico", "ucs", "uus", "nks", "aktivita", "ixp_kur", "ixs_fun_komp", "ixp_sml", "ktg_rcn", "urn", "ixs_zmp_zad", "te1_p", "rok_cia", "ico_cia", "cislo_cia", "ixs_cia", "typ_zmr", "ixp_zmr", "ixs_cle", "typ_poz", "hodnota_te1", "osob_zahranici", "osob_doprovod", "priz_view"]
    * filters: ["ixs_rcn","ixp_den","ixp_pcn","rok","uex_akt","ac","evi_cis","stav_rcn","nazev","rozkaz","stat","misto","ucel","zkr_dopr","misto_n","dat_n","misto_u","dat_u","misto_hra1","dat_hra1","misto_hra2","dat_hra2","podm_uskut","podm_vypoc","ico_fin","nks_fin","ico_sdr","nks_sdr","ico_real","nks_real","ixs_fun_real","ixs_fun_zad","ixs_fun_akt","ico","ucs","uus","nks","aktivita","ixp_kur","ixs_fun_komp","ixp_sml","ktg_rcn","urn","ixs_zmp_zad","te1_p","rok_cia","ico_cia","cislo_cia","ixs_cia","typ_zmr","ixp_zmr","ixs_cle","typ_poz","hodnota_te1","osob_zahranici","osob_doprovod","priz_view"]
    */
    function rcnsrcn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnsrcnDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnsrcnDto>;
    /**
    * 
    *     Klientská část AL - Rezervace vozidel
    *     
    * FieldOptions
    * itemTemplate: "{ixs_rsv}, {nazev}, {stav_rsv_txt}, {ac}"
    * helperColumns: ["nazev", "ixs_rsv","ac"]
    *
    * DataReader
    * keys: ["ixs_rsv"]
    * columns: ["ixs_rsv","ac","nazev","misto_n","dat_n"]
    * filters: ["ixs_rsv","ac","nazev","stav_rsv","aktivita"]
    */
    function rcnsrsv(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>;
    /**
    * Reader pro čtení dat číselníku pro rozlišení typu osoby.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_tor", "nazev", "ixs_tos", "aktivita"]
    *
    * DataReader
    * keys: ["ixs_tor"]
    * columns: ["ixs_tor", "nazev", "ixs_tos", "aktivita"]
    * filters: ["ixs_tor","nazev","ixs_tos","aktivita"]
    */
    function rcnstor(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnstorDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnstorDto>;
    /**
    * Reader pro čtení dat číselníku Uživatelsky definovaný typ osoby.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]
    *
    * DataReader
    * keys: ["ixs_tos"]
    * columns: ["ixs_tos", "nazev", "kod_tos", "poznamka", "typ_dos", "aktivita"]
    * filters: ["ixs_tos","nazev","kod_tos","poznamka","typ_dos","aktivita"]
    */
    function rcnstos(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnstosDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnstosDto>;
    /**
    * Reader pro čtení dat číselníku Typy platebních karet.
    * FieldOptions
    * itemTemplate: "{typ_plk_txt}"
    * helperColumns: ["typ_plk", "typ_plk_txt", "popis", "aktivita"]
    *
    * DataReader
    * keys: ["typ_plk"]
    * columns: ["typ_plk", "typ_plk_txt", "popis", "aktivita"]
    * filters: ["typ_plk","typ_plk_txt","popis","aktivita"]
    */
    function rcnstpk(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnstpkDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnstpkDto>;
    /**
    * Reader pro čtení dat číselníku Definice úrovně návštěvy.
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["urn", "kod_urn", "nazev", "aktivita"]
    *
    * DataReader
    * keys: ["urn"]
    * columns: ["urn", "kod_urn", "nazev", "aktivita"]
    * filters: ["urn","kod_urn","nazev","aktivita"]
    */
    function rcnsurn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnsurnDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnsurnDto>;
    /**
    * Reader pro čtení dat číselníku Výkon.
    * FieldOptions
    * itemTemplate: function
    * helperColumns: ["code", "name"]
    *
    * DataReader
    * keys: ["code","nks"]
    * columns: ["code", "name", "nks"]
    * filters: ["code","name","ico","nks","ixs_roz"]
    */
    function rcnsvkn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Rcn.Interface.GRcnsvknDto>): GSelectBoxOptions<Gordic.Rcn.Interface.GRcnsvknDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * 
    *     Klientská část AL - Služební vozidla
    *     
    */
    function rcnsaus(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnSluzebniVozidloDto>;
    /**
    * 
    *     Klientská část AL - Kniha RCN
    *     
    */
    function rcnsden(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnKnihaDto>;
    /**
    * Reader pro čtení dat číselníku Osoby pro RCN.
    */
    function rcnsosr(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnsosrDto>;
    /**
    * Reader pro čtení dat číselníku Pasy.
    */
    function rcnspas(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnspasDto>;
    /**
    * Reader pro čtení dat číselníku Platební karty.
    */
    function rcnsplk(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnsplkDto>;
    /**
    * Reader pro čtení dat číselníku Cesty.
    */
    function rcnsrcn(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnsrcnDto>;
    /**
    * 
    *     Klientská část AL - Rezervace vozidel
    *     
    */
    function rcnsrsv(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnRezervaceVozidlaDto>;
    /**
    * Reader pro čtení dat číselníku Výkon.
    */
    function rcnsvkn(): Selectors.DefaultSelectorOptions<Gordic.Rcn.Interface.GRcnsvknDto>;}
