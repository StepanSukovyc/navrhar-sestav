/**
*   @copyright  © GORDIC spol. s r. o. 1993-2026
*   @version    498243
*
*   @file       evz.client.types.d.ts
*    project     q:\ginis\Development\NET\Gordic.Evz.Client\Gordic.Evz.Client.csproj
*    created     2026-02-16 14:34:20
*    files       evz.fields.d.ts
*/

//#region q:\ginis\Development\NET\Gordic.Evz.Client\evz.fields.d.ts 

declare namespace Gordic.Data.Readers {
    /**
    * Klient políčko vyb xxxvprc
    * keys: ["cislo"]
    * columns: ["cislo","nazev","ixs_pla","ico","ucs","typ","typ_txt","adresa1","cis_real","ktg_akce","ktg_akce_txt","priz_az","stav_inp","ixs_cia","sip_val1","sip_val2","sip_val3","sip_val4","priz_sta1","priz_sta2"]
    * filters: ["cislo","rok","ixs_pla","kompetent","pripojRozaaat"]
    */
    class EvzXxxvprc extends Base<Gordic.Pap.Interface.GSrvdrozDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzXxxvprcDto = Gordic.Pap.Interface.GSrvdrozDto;
    type EvzXxxvprcDtoNames = Gordic.Pap.Interface.GSrvdrozDtoNames;
    type EvzXxxvprcDtoFragments = Gordic.Pap.Interface.GSrvdrozDtoFragments;
    type EvzXxxvprcDtoTypes = Gordic.Pap.Interface.GSrvdrozDtoTypes;
    type EvzXxxvprcDtoTypeLengths = Gordic.Pap.Interface.GSrvdrozDtoTypeLengths;

    /**
    * Klient políčko Evzcdzd
    * keys: ["dis_zad"]
    * columns: ["dis_zad","dis_zad_txt"]
    * filters: ["dis_zad"]
    */
    class Evzcdzd extends Base<Gordic.Evz.Interface.GEvzcdzdDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcdzdDto = Gordic.Evz.Interface.GEvzcdzdDto;
    type EvzcdzdDtoNames = Gordic.Evz.Interface.GEvzcdzdDtoNames;
    type EvzcdzdDtoFragments = Gordic.Evz.Interface.GEvzcdzdDtoFragments;
    type EvzcdzdDtoTypes = Gordic.Evz.Interface.GEvzcdzdDtoTypes;
    type EvzcdzdDtoTypeLengths = Gordic.Evz.Interface.GEvzcdzdDtoTypeLengths;

    /**
    * Klient políčko Evzcevs
    * keys: ["evz_stav"]
    * columns: ["evz_stav","evz_stav_txt"]
    * filters: ["evz_stav"]
    */
    class Evzcevs extends Base<Gordic.Evz.Interface.GEvzcevsDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcevsDto = Gordic.Evz.Interface.GEvzcevsDto;
    type EvzcevsDtoNames = Gordic.Evz.Interface.GEvzcevsDtoNames;
    type EvzcevsDtoFragments = Gordic.Evz.Interface.GEvzcevsDtoFragments;
    type EvzcevsDtoTypes = Gordic.Evz.Interface.GEvzcevsDtoTypes;
    type EvzcevsDtoTypeLengths = Gordic.Evz.Interface.GEvzcevsDtoTypeLengths;

    /**
    * Klient políčko Evzcjis
    * keys: ["s_jis"]
    * columns: ["s_jis","s_jis_txt"]
    * filters: ["s_jis"]
    */
    class Evzcjis extends Base<Gordic.Evz.Interface.GEvzcjisDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcjisDto = Gordic.Evz.Interface.GEvzcjisDto;
    type EvzcjisDtoNames = Gordic.Evz.Interface.GEvzcjisDtoNames;
    type EvzcjisDtoFragments = Gordic.Evz.Interface.GEvzcjisDtoFragments;
    type EvzcjisDtoTypes = Gordic.Evz.Interface.GEvzcjisDtoTypes;
    type EvzcjisDtoTypeLengths = Gordic.Evz.Interface.GEvzcjisDtoTypeLengths;

    /**
    * Klient políčko Evzckri
    * keys: ["cis_kri"]
    * columns: ["cis_kri","cis_kri_txt"]
    * filters: ["cis_kri","zakon","soutez"]
    */
    class Evzckri extends Base<Gordic.Evz.Interface.GEvzckriDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzckriDto = Gordic.Evz.Interface.GEvzckriDto;
    type EvzckriDtoNames = Gordic.Evz.Interface.GEvzckriDtoNames;
    type EvzckriDtoFragments = Gordic.Evz.Interface.GEvzckriDtoFragments;
    type EvzckriDtoTypes = Gordic.Evz.Interface.GEvzckriDtoTypes;
    type EvzckriDtoTypeLengths = Gordic.Evz.Interface.GEvzckriDtoTypeLengths;

    /**
    * Klient políčko Evzclim
    * keys: ["lim_zac"]
    * columns: ["lim_zac","lim_zac_txt"]
    * filters: ["lim_zac","cis_zakon"]
    */
    class Evzclim extends Base<Gordic.Evz.Interface.GEvzclimDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzclimDto = Gordic.Evz.Interface.GEvzclimDto;
    type EvzclimDtoNames = Gordic.Evz.Interface.GEvzclimDtoNames;
    type EvzclimDtoFragments = Gordic.Evz.Interface.GEvzclimDtoFragments;
    type EvzclimDtoTypes = Gordic.Evz.Interface.GEvzclimDtoTypes;
    type EvzclimDtoTypeLengths = Gordic.Evz.Interface.GEvzclimDtoTypeLengths;

    /**
    * Klient políčko Evzcpru
    * keys: ["pred_urc"]
    * columns: ["pred_urc","pred_urc_txt"]
    * filters: ["pred_urc","cis_zakon"]
    */
    class Evzcpru extends Base<Gordic.Evz.Interface.GEvzcpruDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcpruDto = Gordic.Evz.Interface.GEvzcpruDto;
    type EvzcpruDtoNames = Gordic.Evz.Interface.GEvzcpruDtoNames;
    type EvzcpruDtoFragments = Gordic.Evz.Interface.GEvzcpruDtoFragments;
    type EvzcpruDtoTypes = Gordic.Evz.Interface.GEvzcpruDtoTypes;
    type EvzcpruDtoTypeLengths = Gordic.Evz.Interface.GEvzcpruDtoTypeLengths;

    /**
    * Klient políčko Evzcreg
    * keys: ["regi_list"]
    * columns: ["regi_list","regi_list_txt"]
    * filters: ["regi_list"]
    */
    class Evzcreg extends Base<Gordic.Evz.Interface.GEvzcregDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcregDto = Gordic.Evz.Interface.GEvzcregDto;
    type EvzcregDtoNames = Gordic.Evz.Interface.GEvzcregDtoNames;
    type EvzcregDtoFragments = Gordic.Evz.Interface.GEvzcregDtoFragments;
    type EvzcregDtoTypes = Gordic.Evz.Interface.GEvzcregDtoTypes;
    type EvzcregDtoTypeLengths = Gordic.Evz.Interface.GEvzcregDtoTypeLengths;

    /**
    * Klient políčko Evzcspe
    * keys: ["schv_spec"]
    * columns: ["schv_spec","schv_spec_txt"]
    * filters: ["schv_spec"]
    */
    class Evzcspe extends Base<Gordic.Evz.Interface.GEvzcspeDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcspeDto = Gordic.Evz.Interface.GEvzcspeDto;
    type EvzcspeDtoNames = Gordic.Evz.Interface.GEvzcspeDtoNames;
    type EvzcspeDtoFragments = Gordic.Evz.Interface.GEvzcspeDtoFragments;
    type EvzcspeDtoTypes = Gordic.Evz.Interface.GEvzcspeDtoTypes;
    type EvzcspeDtoTypeLengths = Gordic.Evz.Interface.GEvzcspeDtoTypeLengths;

    /**
    * Klient políčko Evzcsso
    * keys: ["s_sou"]
    * columns: ["s_sou","s_sou_txt"]
    * filters: ["s_sou"]
    */
    class Evzcsso extends Base<Gordic.Evz.Interface.GEvzcssoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcssoDto = Gordic.Evz.Interface.GEvzcssoDto;
    type EvzcssoDtoNames = Gordic.Evz.Interface.GEvzcssoDtoNames;
    type EvzcssoDtoFragments = Gordic.Evz.Interface.GEvzcssoDtoFragments;
    type EvzcssoDtoTypes = Gordic.Evz.Interface.GEvzcssoDtoTypes;
    type EvzcssoDtoTypeLengths = Gordic.Evz.Interface.GEvzcssoDtoTypeLengths;

    /**
    * Klient políčko Evzcsta
    * keys: ["stan_jak"]
    * columns: ["stan_jak","stan_jak_txt"]
    * filters: ["stan_jak"]
    */
    class Evzcsta extends Base<Gordic.Evz.Interface.GEvzcstaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcstaDto = Gordic.Evz.Interface.GEvzcstaDto;
    type EvzcstaDtoNames = Gordic.Evz.Interface.GEvzcstaDtoNames;
    type EvzcstaDtoFragments = Gordic.Evz.Interface.GEvzcstaDtoFragments;
    type EvzcstaDtoTypes = Gordic.Evz.Interface.GEvzcstaDtoTypes;
    type EvzcstaDtoTypeLengths = Gordic.Evz.Interface.GEvzcstaDtoTypeLengths;

    /**
    * Klient políčko Evzcsvr
    * keys: ["stan_svr"]
    * columns: ["stan_svr","stan_svr_txt"]
    * filters: ["stan_svr"]
    */
    class Evzcsvr extends Base<Gordic.Evz.Interface.GEvzcsvrDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcsvrDto = Gordic.Evz.Interface.GEvzcsvrDto;
    type EvzcsvrDtoNames = Gordic.Evz.Interface.GEvzcsvrDtoNames;
    type EvzcsvrDtoFragments = Gordic.Evz.Interface.GEvzcsvrDtoFragments;
    type EvzcsvrDtoTypes = Gordic.Evz.Interface.GEvzcsvrDtoTypes;
    type EvzcsvrDtoTypeLengths = Gordic.Evz.Interface.GEvzcsvrDtoTypeLengths;

    /**
    * Klient políčko Evzcsvz
    * keys: ["s_vz"]
    * columns: ["s_vz","s_vz_txt"]
    * filters: ["s_vz"]
    */
    class Evzcsvz extends Base<Gordic.Evz.Interface.GEvzcsvzDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcsvzDto = Gordic.Evz.Interface.GEvzcsvzDto;
    type EvzcsvzDtoNames = Gordic.Evz.Interface.GEvzcsvzDtoNames;
    type EvzcsvzDtoFragments = Gordic.Evz.Interface.GEvzcsvzDtoFragments;
    type EvzcsvzDtoTypes = Gordic.Evz.Interface.GEvzcsvzDtoTypes;
    type EvzcsvzDtoTypeLengths = Gordic.Evz.Interface.GEvzcsvzDtoTypeLengths;

    /**
    * Klient políčko Evzctks
    * keys: ["id_tks"]
    * columns: ["id_tks","id_tks_txt"]
    * filters: ["id_tks"]
    */
    class Evzctks extends Base<Gordic.Evz.Interface.GEvzctksDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzctksDto = Gordic.Evz.Interface.GEvzctksDto;
    type EvzctksDtoNames = Gordic.Evz.Interface.GEvzctksDtoNames;
    type EvzctksDtoFragments = Gordic.Evz.Interface.GEvzctksDtoFragments;
    type EvzctksDtoTypes = Gordic.Evz.Interface.GEvzctksDtoTypes;
    type EvzctksDtoTypeLengths = Gordic.Evz.Interface.GEvzctksDtoTypeLengths;

    /**
    * Klient políčko Evzcuks
    * keys: ["id_uks"]
    * columns: ["id_uks","id_uks_txt"]
    * filters: ["id_uks"]
    */
    class Evzcuks extends Base<Gordic.Evz.Interface.GEvzcuksDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcuksDto = Gordic.Evz.Interface.GEvzcuksDto;
    type EvzcuksDtoNames = Gordic.Evz.Interface.GEvzcuksDtoNames;
    type EvzcuksDtoFragments = Gordic.Evz.Interface.GEvzcuksDtoFragments;
    type EvzcuksDtoTypes = Gordic.Evz.Interface.GEvzcuksDtoTypes;
    type EvzcuksDtoTypeLengths = Gordic.Evz.Interface.GEvzcuksDtoTypeLengths;

    /**
    * Klient políčko Evzcvri
    * keys: ["vys_riz"]
    * columns: ["vys_riz","vys_riz_txt"]
    * filters: ["vys_riz","cis_zakon"]
    */
    class Evzcvri extends Base<Gordic.Evz.Interface.GEvzcvriDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzcvriDto = Gordic.Evz.Interface.GEvzcvriDto;
    type EvzcvriDtoNames = Gordic.Evz.Interface.GEvzcvriDtoNames;
    type EvzcvriDtoFragments = Gordic.Evz.Interface.GEvzcvriDtoFragments;
    type EvzcvriDtoTypes = Gordic.Evz.Interface.GEvzcvriDtoTypes;
    type EvzcvriDtoTypeLengths = Gordic.Evz.Interface.GEvzcvriDtoTypeLengths;

    /**
    * Klient políčko Evzczoz
    * keys: ["odu_zz"]
    * columns: ["odu_zz","odu_zz_txt"]
    * filters: ["odu_zz","cis_zakon","soutez"]
    */
    class Evzczoz extends Base<Gordic.Evz.Interface.GEvzczozDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzczozDto = Gordic.Evz.Interface.GEvzczozDto;
    type EvzczozDtoNames = Gordic.Evz.Interface.GEvzczozDtoNames;
    type EvzczozDtoFragments = Gordic.Evz.Interface.GEvzczozDtoFragments;
    type EvzczozDtoTypes = Gordic.Evz.Interface.GEvzczozDtoTypes;
    type EvzczozDtoTypeLengths = Gordic.Evz.Interface.GEvzczozDtoTypeLengths;

    /**
    * Klient políčko Evzczpo
    * keys: ["zpu_pod"]
    * columns: ["zpu_pod","zpu_pod_txt"]
    * filters: ["zpu_pod"]
    */
    class Evzczpo extends Base<Gordic.Evz.Interface.GEvzczpoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzczpoDto = Gordic.Evz.Interface.GEvzczpoDto;
    type EvzczpoDtoNames = Gordic.Evz.Interface.GEvzczpoDtoNames;
    type EvzczpoDtoFragments = Gordic.Evz.Interface.GEvzczpoDtoFragments;
    type EvzczpoDtoTypes = Gordic.Evz.Interface.GEvzczpoDtoTypes;
    type EvzczpoDtoTypeLengths = Gordic.Evz.Interface.GEvzczpoDtoTypeLengths;

    /**
    * Klient políčko vyb evzsaza
    * keys: ["ixs_aza"]
    * columns: ["ixs_aza","nazev","zkratka","profil","url_zadava","poznamka","dat_zmena"]
    * filters: ["ixs_aza","nazev","zkratka","profil","url_zadava","poznamka","dat_zmena"]
    */
    class Evzsaza extends Base<Gordic.Pap.Interface.GEvzsazaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzsazaDto = Gordic.Pap.Interface.GEvzsazaDto;
    type EvzsazaDtoNames = Gordic.Pap.Interface.GEvzsazaDtoNames;
    type EvzsazaDtoFragments = Gordic.Pap.Interface.GEvzsazaDtoFragments;
    type EvzsazaDtoTypes = Gordic.Pap.Interface.GEvzsazaDtoTypes;
    type EvzsazaDtoTypeLengths = Gordic.Pap.Interface.GEvzsazaDtoTypeLengths;

    /**
    * Klient políčko evzsesu
    * keys: ["ixs_esu"]
    * columns: ["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_vz","cj_dgr","misto_pod","naz_prj","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"]
    * filters: ["ixs_pri","cis_por","ixs_esu","ktg_typ"]
    */
    class Evzsesu extends Base<Gordic.Pap.Interface.GXxxsesuVDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzsesuDto = Gordic.Pap.Interface.GXxxsesuVDto;
    type EvzsesuDtoNames = Gordic.Pap.Interface.GXxxsesuVDtoNames;
    type EvzsesuDtoFragments = Gordic.Pap.Interface.GXxxsesuVDtoFragments;
    type EvzsesuDtoTypes = Gordic.Pap.Interface.GXxxsesuVDtoTypes;
    type EvzsesuDtoTypeLengths = Gordic.Pap.Interface.GXxxsesuVDtoTypeLengths;

    /**
    * Klient políčko Evzskdn
    * keys: ["ixs_kdn"]
    * columns: ["ixs_kdn","nazev","zkratka","poznamka","dat_od","dat_do"]
    * filters: ["ixs_kdn","dat_pri","ixs_pri","ixp"]
    */
    class Evzskdn extends Base<Gordic.Pap.Interface.GEvzskdnDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzskdnDto = Gordic.Pap.Interface.GEvzskdnDto;
    type EvzskdnDtoNames = Gordic.Pap.Interface.GEvzskdnDtoNames;
    type EvzskdnDtoFragments = Gordic.Pap.Interface.GEvzskdnDtoFragments;
    type EvzskdnDtoTypes = Gordic.Pap.Interface.GEvzskdnDtoTypes;
    type EvzskdnDtoTypeLengths = Gordic.Pap.Interface.GEvzskdnDtoTypeLengths;

    /**
    * Klient políčko Evzskpu
    * keys: ["kat_pru"]
    * columns: ["kat_pru","nazev","zkratka"]
    * filters: ["kat_pru"]
    */
    class Evzskpu extends Base<Gordic.Pap.Interface.GEvzskpuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzskpuDto = Gordic.Pap.Interface.GEvzskpuDto;
    type EvzskpuDtoNames = Gordic.Pap.Interface.GEvzskpuDtoNames;
    type EvzskpuDtoFragments = Gordic.Pap.Interface.GEvzskpuDtoFragments;
    type EvzskpuDtoTypes = Gordic.Pap.Interface.GEvzskpuDtoTypes;
    type EvzskpuDtoTypeLengths = Gordic.Pap.Interface.GEvzskpuDtoTypeLengths;

    /**
    * Klient políčko Evzsoko
    * keys: ["ixs_oko"]
    * columns: ["ixs_oko", "nazev", "jmeno", "prijmeni", "zkratka", "poznamka", "dat_od", "dat_do"]
    * filters: ["ixs_oko"]
    */
    class Evzsoko extends Base<Gordic.Pap.Interface.GEvzsokoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type EvzsokoDto = Gordic.Pap.Interface.GEvzsokoDto;
    type EvzsokoDtoNames = Gordic.Pap.Interface.GEvzsokoDtoNames;
    type EvzsokoDtoFragments = Gordic.Pap.Interface.GEvzsokoDtoFragments;
    type EvzsokoDtoTypes = Gordic.Pap.Interface.GEvzsokoDtoTypes;
    type EvzsokoDtoTypeLengths = Gordic.Pap.Interface.GEvzsokoDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * Klient políčko vyb xxxvprc
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["cislo"]
    * columns: ["cislo","nazev","ixs_pla","ico","ucs","typ","typ_txt","adresa1","cis_real","ktg_akce","ktg_akce_txt","priz_az","stav_inp","ixs_cia","sip_val1","sip_val2","sip_val3","sip_val4","priz_sta1","priz_sta2"]
    * filters: ["cislo","rok","ixs_pla","kompetent","pripojRozaaat"]
    */
    function evzXxxvprc(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GSrvdrozDto>): GSelectBoxOptions<Gordic.Pap.Interface.GSrvdrozDto>;
    /**
    * Klient políčko Evzcdzd
    * FieldOptions
    * itemTemplate: "{dis_zad_txt:trim:encode}"
    * helperColumns: ["dis_zad_txt"]
    *
    * DataReader
    * keys: ["dis_zad"]
    * columns: ["dis_zad","dis_zad_txt"]
    * filters: ["dis_zad"]
    */
    function evzcdzd(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcdzdDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcdzdDto>;
    /**
    * Klient políčko Evzcevs
    * FieldOptions
    * itemTemplate: "{evz_stav_txt:trim:encode}"
    * helperColumns: ["evz_stav_txt"]
    *
    * DataReader
    * keys: ["evz_stav"]
    * columns: ["evz_stav","evz_stav_txt"]
    * filters: ["evz_stav"]
    */
    function evzcevs(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcevsDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcevsDto>;
    /**
    * Klient políčko Evzcjis
    * FieldOptions
    * itemTemplate: "{s_jis_txt:trim:encode}"
    * helperColumns: ["s_jis_txt"]
    *
    * DataReader
    * keys: ["s_jis"]
    * columns: ["s_jis","s_jis_txt"]
    * filters: ["s_jis"]
    */
    function evzcjis(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcjisDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcjisDto>;
    /**
    * Klient políčko Evzckri
    * FieldOptions
    * itemTemplate: "{cis_kri_txt:trim:encode}"
    * helperColumns: ["cis_kri_txt"]
    *
    * DataReader
    * keys: ["cis_kri"]
    * columns: ["cis_kri","cis_kri_txt"]
    * filters: ["cis_kri","zakon","soutez"]
    */
    function evzckri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzckriDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzckriDto>;
    /**
    * Klient políčko Evzclim
    * FieldOptions
    * itemTemplate: "{lim_zac_txt:trim:encode}"
    * helperColumns: ["lim_zac_txt"]
    *
    * DataReader
    * keys: ["lim_zac"]
    * columns: ["lim_zac","lim_zac_txt"]
    * filters: ["lim_zac","cis_zakon"]
    */
    function evzclim(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzclimDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzclimDto>;
    /**
    * Klient políčko Evzcpru
    * FieldOptions
    * itemTemplate: "{pred_urc_txt:trim:encode}"
    * helperColumns: ["pred_urc_txt"]
    *
    * DataReader
    * keys: ["pred_urc"]
    * columns: ["pred_urc","pred_urc_txt"]
    * filters: ["pred_urc","cis_zakon"]
    */
    function evzcpru(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcpruDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcpruDto>;
    /**
    * Klient políčko Evzcreg
    * FieldOptions
    * itemTemplate: "{regi_list_txt:trim:encode}"
    * helperColumns: ["regi_list_txt"]
    *
    * DataReader
    * keys: ["regi_list"]
    * columns: ["regi_list","regi_list_txt"]
    * filters: ["regi_list"]
    */
    function evzcreg(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcregDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcregDto>;
    /**
    * Klient políčko Evzcspe
    * FieldOptions
    * itemTemplate: "{schv_spec_txt:trim:encode}"
    * helperColumns: ["schv_spec_txt"]
    *
    * DataReader
    * keys: ["schv_spec"]
    * columns: ["schv_spec","schv_spec_txt"]
    * filters: ["schv_spec"]
    */
    function evzcspe(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcspeDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcspeDto>;
    /**
    * Klient políčko Evzcsso
    * FieldOptions
    * itemTemplate: "{s_sou_txt:trim:encode}"
    * helperColumns: ["s_sou_txt"]
    *
    * DataReader
    * keys: ["s_sou"]
    * columns: ["s_sou","s_sou_txt"]
    * filters: ["s_sou"]
    */
    function evzcsso(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcssoDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcssoDto>;
    /**
    * Klient políčko Evzcsta
    * FieldOptions
    * itemTemplate: "{stan_jak_txt:trim:encode}"
    * helperColumns: ["stan_jak_txt"]
    *
    * DataReader
    * keys: ["stan_jak"]
    * columns: ["stan_jak","stan_jak_txt"]
    * filters: ["stan_jak"]
    */
    function evzcsta(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcstaDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcstaDto>;
    /**
    * Klient políčko Evzcsvr
    * FieldOptions
    * itemTemplate: "{stan_svr_txt:trim:encode}"
    * helperColumns: ["stan_svr_txt"]
    *
    * DataReader
    * keys: ["stan_svr"]
    * columns: ["stan_svr","stan_svr_txt"]
    * filters: ["stan_svr"]
    */
    function evzcsvr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcsvrDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcsvrDto>;
    /**
    * Klient políčko Evzcsvz
    * FieldOptions
    * itemTemplate: "{s_vz_txt:trim:encode}"
    * helperColumns: ["s_vz_txt"]
    *
    * DataReader
    * keys: ["s_vz"]
    * columns: ["s_vz","s_vz_txt"]
    * filters: ["s_vz"]
    */
    function evzcsvz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcsvzDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcsvzDto>;
    /**
    * Klient políčko Evzctks
    * FieldOptions
    * itemTemplate: "{id_tks_txt:trim:encode}"
    * helperColumns: ["id_tks_txt"]
    *
    * DataReader
    * keys: ["id_tks"]
    * columns: ["id_tks","id_tks_txt"]
    * filters: ["id_tks"]
    */
    function evzctks(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzctksDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzctksDto>;
    /**
    * Klient políčko Evzcuks
    * FieldOptions
    * itemTemplate: "{id_uks_txt:trim:encode}"
    * helperColumns: ["id_uks_txt"]
    *
    * DataReader
    * keys: ["id_uks"]
    * columns: ["id_uks","id_uks_txt"]
    * filters: ["id_uks"]
    */
    function evzcuks(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcuksDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcuksDto>;
    /**
    * Klient políčko Evzcvri
    * FieldOptions
    * itemTemplate: "{vys_riz_txt:trim:encode}"
    * helperColumns: ["vys_riz_txt"]
    *
    * DataReader
    * keys: ["vys_riz"]
    * columns: ["vys_riz","vys_riz_txt"]
    * filters: ["vys_riz","cis_zakon"]
    */
    function evzcvri(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzcvriDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzcvriDto>;
    /**
    * Klient políčko Evzczoz
    * FieldOptions
    * itemTemplate: "{odu_zz_txt:trim:encode}"
    * helperColumns: ["odu_zz_txt"]
    *
    * DataReader
    * keys: ["odu_zz"]
    * columns: ["odu_zz","odu_zz_txt"]
    * filters: ["odu_zz","cis_zakon","soutez"]
    */
    function evzczoz(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzczozDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzczozDto>;
    /**
    * Klient políčko Evzczpo
    * FieldOptions
    * itemTemplate: "{zpu_pod_txt:trim:encode}"
    * helperColumns: ["zpu_pod_txt"]
    *
    * DataReader
    * keys: ["zpu_pod"]
    * columns: ["zpu_pod","zpu_pod_txt"]
    * filters: ["zpu_pod"]
    */
    function evzczpo(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Evz.Interface.GEvzczpoDto>): GSelectBoxOptions<Gordic.Evz.Interface.GEvzczpoDto>;
    /**
    * Klient políčko vyb evzsaza
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_aza"]
    * columns: ["ixs_aza","nazev","zkratka","profil","url_zadava","poznamka","dat_zmena"]
    * filters: ["ixs_aza","nazev","zkratka","profil","url_zadava","poznamka","dat_zmena"]
    */
    function evzsaza(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GEvzsazaDto>): GSelectBoxOptions<Gordic.Pap.Interface.GEvzsazaDto>;
    /**
    * Klient políčko evzsesu
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_esu"]
    * columns: ["ixs_esu","cis_por","nazev","ico","dat_jis","dat_pis","s_jis_txt","prijal","cj_vz","cj_dgr","misto_pod","naz_prj","cj_po","popis","s_spis","ixs_pri","por_cis_nab","ktg_typ"]
    * filters: ["ixs_pri","cis_por","ixs_esu","ktg_typ"]
    */
    function evzsesu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GXxxsesuVDto>): GSelectBoxOptions<Gordic.Pap.Interface.GXxxsesuVDto>;
    /**
    * Klient políčko Evzskdn
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_kdn"]
    * columns: ["ixs_kdn","nazev","zkratka","poznamka","dat_od","dat_do"]
    * filters: ["ixs_kdn","dat_pri","ixs_pri","ixp"]
    */
    function evzskdn(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GEvzskdnDto>): GSelectBoxOptions<Gordic.Pap.Interface.GEvzskdnDto>;
    /**
    * Klient políčko Evzskpu
    * FieldOptions
    * itemTemplate: "{nazev:trim:encode}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["kat_pru"]
    * columns: ["kat_pru","nazev","zkratka"]
    * filters: ["kat_pru"]
    */
    function evzskpu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GEvzskpuDto>): GSelectBoxOptions<Gordic.Pap.Interface.GEvzskpuDto>;
    /**
    * Klient políčko Evzsoko
    * FieldOptions
    * itemTemplate: "{ixs_oko:trim:encode}"
    * helperColumns: ["jmeno", "prijmeni"]
    *
    * DataReader
    * keys: ["ixs_oko"]
    * columns: ["ixs_oko", "nazev", "jmeno", "prijmeni", "zkratka", "poznamka", "dat_od", "dat_do"]
    * filters: ["ixs_oko"]
    */
    function evzsoko(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Pap.Interface.GEvzsokoDto>): GSelectBoxOptions<Gordic.Pap.Interface.GEvzsokoDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * Klient políčko vyb xxxvprc
    */
    function evzXxxvprc(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GSrvdrozDto>;
    /**
    * Klient políčko vyb evzsaza
    */
    function Evzsaza(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GEvzsazaDto>;
    /**
    * Klient políčko evzsesu
    */
    function Evzsesu(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GXxxsesuVDto>;
    /**
    * Klient políčko Evzsoko
    */
    function evzsoko(): Selectors.DefaultSelectorOptions<Gordic.Pap.Interface.GEvzsokoDto>;}

//#endregion

