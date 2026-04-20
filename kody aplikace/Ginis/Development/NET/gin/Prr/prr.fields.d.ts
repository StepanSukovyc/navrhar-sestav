declare namespace Gordic.Data.Readers {
    /**
    * GReaderPrrBarvy
    * keys: ["ixs_brv"]
    * columns: ["ixs_brv","popis","poznamka","aktivita","aktivita_txt","zkratka"]
    * filters: [""]
    */
    class PrrBarvy extends Base<Gordic.Prr.Interface.GReaderPrrBarvaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrBarvyDto = Gordic.Prr.Interface.GReaderPrrBarvaDto;
    type PrrBarvyDtoNames = Gordic.Prr.Interface.GReaderPrrBarvaDtoNames;
    type PrrBarvyDtoFragments = Gordic.Prr.Interface.GReaderPrrBarvaDtoFragments;
    type PrrBarvyDtoTypes = Gordic.Prr.Interface.GReaderPrrBarvaDtoTypes;
    type PrrBarvyDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrBarvaDtoTypeLengths;

    /**
    * GReaderPrrCastkyUdalostiDeniku
    * keys: ["ixs_rad","typ_uda","typ_pla"]
    * columns: ["ixs_rad","typ_uda","typ_pla","castka","poznamka","aktivita","dat_zmena","zmenu_prov","typ_uda_txt","typ_pla_txt"]
    * filters: [""]
    */
    class PrrCastkyUdalostiDeniku extends Base<Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrCastkyUdalostiDenikuDto = Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDto;
    type PrrCastkyUdalostiDenikuDtoNames = Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDtoNames;
    type PrrCastkyUdalostiDenikuDtoFragments = Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDtoFragments;
    type PrrCastkyUdalostiDenikuDtoTypes = Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDtoTypes;
    type PrrCastkyUdalostiDenikuDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDtoTypeLengths;

    /**
    * GReaderPrrFormulare
    * keys: ["sablona"]
    * columns: ["sablona","ixs_typ","nazev","poznamka","aktivita","umisteni","ktg_typ","s_frm","typ_uda"]
    * filters: [""]
    */
    class PrrFormulare extends Base<Gordic.Prr.Interface.GReaderPrrFormularDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrFormulareDto = Gordic.Prr.Interface.GReaderPrrFormularDto;
    type PrrFormulareDtoNames = Gordic.Prr.Interface.GReaderPrrFormularDtoNames;
    type PrrFormulareDtoFragments = Gordic.Prr.Interface.GReaderPrrFormularDtoFragments;
    type PrrFormulareDtoTypes = Gordic.Prr.Interface.GReaderPrrFormularDtoTypes;
    type PrrFormulareDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrFormularDtoTypeLengths;

    /**
    * GReaderPrrGinsfrm
    * keys: ["ixs_frm"]
    * columns: ["ixs_frm","nazev","filtr_frm","aktivita"]
    * filters: ["filtr_frm","ixs_frm","aktivita"]
    */
    class PrrGinsfrm extends Base<Gordic.Prr.Interface.GReaderPrrGinsfrmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrGinsfrmDto = Gordic.Prr.Interface.GReaderPrrGinsfrmDto;
    type PrrGinsfrmDtoNames = Gordic.Prr.Interface.GReaderPrrGinsfrmDtoNames;
    type PrrGinsfrmDtoFragments = Gordic.Prr.Interface.GReaderPrrGinsfrmDtoFragments;
    type PrrGinsfrmDtoTypes = Gordic.Prr.Interface.GReaderPrrGinsfrmDtoTypes;
    type PrrGinsfrmDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrGinsfrmDtoTypeLengths;

    /**
    * GReaderPrrParagrafy
    * keys: ["ixs_mpr"]
    * columns: ["ixs_mpr","nazev","zakonik","rok","paragraf","odstavec","pismeno","bod","par_txt","poznamka","aktivita"]
    * filters: [""]
    */
    class PrrParagrafy extends Base<Gordic.Prr.Interface.GReaderPrrParagrafyDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrParagrafyDto = Gordic.Prr.Interface.GReaderPrrParagrafyDto;
    type PrrParagrafyDtoNames = Gordic.Prr.Interface.GReaderPrrParagrafyDtoNames;
    type PrrParagrafyDtoFragments = Gordic.Prr.Interface.GReaderPrrParagrafyDtoFragments;
    type PrrParagrafyDtoTypes = Gordic.Prr.Interface.GReaderPrrParagrafyDtoTypes;
    type PrrParagrafyDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrParagrafyDtoTypeLengths;

    /**
    * GReaderPrrPlemenaPsu
    * keys: ["plemeno"]
    * columns: ["plemeno","plemeno_txt","k_v","k_s","nazev_orig","zkratka"]
    * filters: ["cis_stand"]
    */
    class PrrPlemenaPsu extends Base<Gordic.Prr.Interface.GReaderPrrPlemenoPsaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrPlemenaPsuDto = Gordic.Prr.Interface.GReaderPrrPlemenoPsaDto;
    type PrrPlemenaPsuDtoNames = Gordic.Prr.Interface.GReaderPrrPlemenoPsaDtoNames;
    type PrrPlemenaPsuDtoFragments = Gordic.Prr.Interface.GReaderPrrPlemenoPsaDtoFragments;
    type PrrPlemenaPsuDtoTypes = Gordic.Prr.Interface.GReaderPrrPlemenoPsaDtoTypes;
    type PrrPlemenaPsuDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrPlemenoPsaDtoTypeLengths;

    /**
    * GReaderPrrsfrm
    * keys: ["sablona"]
    * columns: ["sablona","nazev","aktivita","s_mp"]
    * filters: ["sablona","nazev","aktivita","ixs_rad","s_mp"]
    */
    class Prrsfrm extends Base<Gordic.Prr.Interface.GReaderPrrsfrmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrsfrmDto = Gordic.Prr.Interface.GReaderPrrsfrmDto;
    type PrrsfrmDtoNames = Gordic.Prr.Interface.GReaderPrrsfrmDtoNames;
    type PrrsfrmDtoFragments = Gordic.Prr.Interface.GReaderPrrsfrmDtoFragments;
    type PrrsfrmDtoTypes = Gordic.Prr.Interface.GReaderPrrsfrmDtoTypes;
    type PrrsfrmDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrsfrmDtoTypeLengths;

    /**
    * GReaderPrrsrad
    * keys: ["ixs_rad"]
    * columns: ["ixs_rad","typ_den_txt","typ_den","nazev","rok","aktivita"]
    * filters: ["ixs_rad","typ_den","aktivita"]
    */
    class Prrsrad extends Base<Gordic.Prr.Interface.GReaderPrrsradDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrsradDto = Gordic.Prr.Interface.GReaderPrrsradDto;
    type PrrsradDtoNames = Gordic.Prr.Interface.GReaderPrrsradDtoNames;
    type PrrsradDtoFragments = Gordic.Prr.Interface.GReaderPrrsradDtoFragments;
    type PrrsradDtoTypes = Gordic.Prr.Interface.GReaderPrrsradDtoTypes;
    type PrrsradDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrsradDtoTypeLengths;

    /**
    * GReaderPrrStraznici
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","ginsfun_nazev_ref","ginsfun_nazev_rf","ginsfun_nazev"]
    * filters: [""]
    */
    class PrrStraznici extends Base<Gordic.Prr.Interface.GReaderPrrStraznikDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrStrazniciDto = Gordic.Prr.Interface.GReaderPrrStraznikDto;
    type PrrStrazniciDtoNames = Gordic.Prr.Interface.GReaderPrrStraznikDtoNames;
    type PrrStrazniciDtoFragments = Gordic.Prr.Interface.GReaderPrrStraznikDtoFragments;
    type PrrStrazniciDtoTypes = Gordic.Prr.Interface.GReaderPrrStraznikDtoTypes;
    type PrrStrazniciDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrStraznikDtoTypeLengths;

    /**
    * GReaderPrrTovarniZnacky
    * keys: ["ixs_tzv"]
    * columns: ["ixs_tzv","typ_tvo","popis","poznamka","aktivita","dat_zmena","zmenu_prov","aktivita_txt"]
    * filters: [""]
    */
    class PrrTovarniZnacky extends Base<Gordic.Prr.Interface.GReaderPrrTovarniZnackaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrTovarniZnackyDto = Gordic.Prr.Interface.GReaderPrrTovarniZnackaDto;
    type PrrTovarniZnackyDtoNames = Gordic.Prr.Interface.GReaderPrrTovarniZnackaDtoNames;
    type PrrTovarniZnackyDtoFragments = Gordic.Prr.Interface.GReaderPrrTovarniZnackaDtoFragments;
    type PrrTovarniZnackyDtoTypes = Gordic.Prr.Interface.GReaderPrrTovarniZnackaDtoTypes;
    type PrrTovarniZnackyDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrTovarniZnackaDtoTypeLengths;

    /**
    * GReaderPrrTypyReseni
    * keys: ["typ_uda"]
    * columns: ["typ_uda","typ_uda_txt","k_v","k_s","stav_rize","s_prr","s_prm","k_xml"]
    * filters: [""]
    */
    class PrrTypyReseni extends Base<Gordic.Prr.Interface.GReaderPrrTypReseniDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrTypyReseniDto = Gordic.Prr.Interface.GReaderPrrTypReseniDto;
    type PrrTypyReseniDtoNames = Gordic.Prr.Interface.GReaderPrrTypReseniDtoNames;
    type PrrTypyReseniDtoFragments = Gordic.Prr.Interface.GReaderPrrTypReseniDtoFragments;
    type PrrTypyReseniDtoTypes = Gordic.Prr.Interface.GReaderPrrTypReseniDtoTypes;
    type PrrTypyReseniDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrTypReseniDtoTypeLengths;

    /**
    * GReaderPrrTypySkutku
    * keys: ["ixs_uts"]
    * columns: ["ixs_uts","nazev","poznamka","aktivita","s_mp"]
    * filters: [""]
    */
    class PrrTypySkutku extends Base<Gordic.Prr.Interface.GReaderPrrTypSkutkuDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrTypySkutkuDto = Gordic.Prr.Interface.GReaderPrrTypSkutkuDto;
    type PrrTypySkutkuDtoNames = Gordic.Prr.Interface.GReaderPrrTypSkutkuDtoNames;
    type PrrTypySkutkuDtoFragments = Gordic.Prr.Interface.GReaderPrrTypSkutkuDtoFragments;
    type PrrTypySkutkuDtoTypes = Gordic.Prr.Interface.GReaderPrrTypSkutkuDtoTypes;
    type PrrTypySkutkuDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrTypSkutkuDtoTypeLengths;

    /**
    * GReaderPrrTypyUcastnika
    * keys: ["typ_uca"]
    * columns: ["typ_uca","typ_uca_txt","k_v","k_s","k_xml"]
    * filters: [""]
    */
    class PrrTypyUcastnika extends Base<Gordic.Prr.Interface.GReaderPrrTypUcastinkaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrTypyUcastnikaDto = Gordic.Prr.Interface.GReaderPrrTypUcastinkaDto;
    type PrrTypyUcastnikaDtoNames = Gordic.Prr.Interface.GReaderPrrTypUcastinkaDtoNames;
    type PrrTypyUcastnikaDtoFragments = Gordic.Prr.Interface.GReaderPrrTypUcastinkaDtoFragments;
    type PrrTypyUcastnikaDtoTypes = Gordic.Prr.Interface.GReaderPrrTypUcastinkaDtoTypes;
    type PrrTypyUcastnikaDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrTypUcastinkaDtoTypeLengths;

    /**
    * Typ částky
    * keys: ["typ_pla"]
    * columns: ["typ_pla","typ_pla_txt"]
    * filters: [""]
    */
    class Prrctpl extends Base<Gordic.Prr.Interface.GReaderPrrctplDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrctplDto = Gordic.Prr.Interface.GReaderPrrctplDto;
    type PrrctplDtoNames = Gordic.Prr.Interface.GReaderPrrctplDtoNames;
    type PrrctplDtoFragments = Gordic.Prr.Interface.GReaderPrrctplDtoFragments;
    type PrrctplDtoTypes = Gordic.Prr.Interface.GReaderPrrctplDtoTypes;
    type PrrctplDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrctplDtoTypeLengths;

    /**
    * Klientská část AL - číselník prrcuda
    * keys: ["typ_uda"]
    * columns: ["typ_uda", "typ_uda_txt", "k_v", "k_s", "stav_rize", "k_xml", "s_prr", "s_prm"]
    * filters: ["typ_uda","typ_uda_txt","k_v","k_s","stav_rize","k_xml","s_prr","s_prm"]
    */
    class Prrcuda extends Base<Gordic.Prr.Interface.GReaderPrrcudaDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrcudaDto = Gordic.Prr.Interface.GReaderPrrcudaDto;
    type PrrcudaDtoNames = Gordic.Prr.Interface.GReaderPrrcudaDtoNames;
    type PrrcudaDtoFragments = Gordic.Prr.Interface.GReaderPrrcudaDtoFragments;
    type PrrcudaDtoTypes = Gordic.Prr.Interface.GReaderPrrcudaDtoTypes;
    type PrrcudaDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrcudaDtoTypeLengths;

    /**
    * Klientská část AL - číselník prrsudm
    * keys: ["ixs_udm"]
    * columns: ["ixs_udm","nazev","ixs_vud","prrscud_nazev","aktivita"]
    * filters: ["ixs_udm","ixs_pri","ixs_skt","nazev","aktivita"]
    */
    class Prrsudm extends Base<Gordic.Prr.Interface.GReaderPrrsudmDto>
    {
        constructor(options?: IGReaderBase);
    }
    type PrrsudmDto = Gordic.Prr.Interface.GReaderPrrsudmDto;
    type PrrsudmDtoNames = Gordic.Prr.Interface.GReaderPrrsudmDtoNames;
    type PrrsudmDtoFragments = Gordic.Prr.Interface.GReaderPrrsudmDtoFragments;
    type PrrsudmDtoTypes = Gordic.Prr.Interface.GReaderPrrsudmDtoTypes;
    type PrrsudmDtoTypeLengths = Gordic.Prr.Interface.GReaderPrrsudmDtoTypeLengths;

    /**
    * GReaderSprcspr
    * keys: ["spr"]
    * columns: ["spr","spr_txt"]
    * filters: [""]
    */
    class Sprcspr extends Base<Gordic.Prr.Interface.GReaderSprcsprDto>
    {
        constructor(options?: IGReaderBase);
    }
    type SprcsprDto = Gordic.Prr.Interface.GReaderSprcsprDto;
    type SprcsprDtoNames = Gordic.Prr.Interface.GReaderSprcsprDtoNames;
    type SprcsprDtoFragments = Gordic.Prr.Interface.GReaderSprcsprDtoFragments;
    type SprcsprDtoTypes = Gordic.Prr.Interface.GReaderSprcsprDtoTypes;
    type SprcsprDtoTypeLengths = Gordic.Prr.Interface.GReaderSprcsprDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * GReaderPrrBarvy
    * FieldOptions
    * itemTemplate: "{popis}"
    * helperColumns: ["popis"]
    *
    * DataReader
    * keys: ["ixs_brv"]
    * columns: ["ixs_brv","popis","poznamka","aktivita","aktivita_txt","zkratka"]
    * filters: [""]
    */
    function prrBarvy(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrBarvaDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrBarvaDto>;
    /**
    * GReaderPrrCastkyUdalostiDeniku
    * FieldOptions
    * itemTemplate: "{castka}"
    * helperColumns: ["castka"]
    *
    * DataReader
    * keys: ["ixs_rad","typ_uda","typ_pla"]
    * columns: ["ixs_rad","typ_uda","typ_pla","castka","poznamka","aktivita","dat_zmena","zmenu_prov","typ_uda_txt","typ_pla_txt"]
    * filters: [""]
    */
    function prrCastkyUdalostiDeniku(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrCastkaUdalostiDenikuDto>;
    /**
    * GReaderPrrFormulare
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["sablona"]
    * columns: ["sablona","ixs_typ","nazev","poznamka","aktivita","umisteni","ktg_typ","s_frm","typ_uda"]
    * filters: [""]
    */
    function prrFormulare(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrFormularDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrFormularDto>;
    /**
    * GReaderPrrGinsfrm
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_frm", "nazev"]
    *
    * DataReader
    * keys: ["ixs_frm"]
    * columns: ["ixs_frm","nazev","filtr_frm","aktivita"]
    * filters: ["filtr_frm","ixs_frm","aktivita"]
    */
    function prrGinsfrm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrGinsfrmDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrGinsfrmDto>;
    /**
    * GReaderPrrParagrafy
    * FieldOptions
    * itemTemplate: "{par_txt}"
    * helperColumns: ["zakonik", "rok", "paragraf", "odstavec", "pismeno", "bod"]
    *
    * DataReader
    * keys: ["ixs_mpr"]
    * columns: ["ixs_mpr","nazev","zakonik","rok","paragraf","odstavec","pismeno","bod","par_txt","poznamka","aktivita"]
    * filters: [""]
    */
    function prrParagrafy(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrParagrafyDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrParagrafyDto>;
    /**
    * GReaderPrrPlemenaPsu
    * FieldOptions
    * itemTemplate: "{plemeno_txt}"
    * helperColumns: ["plemeno","plemeno_txt"]
    *
    * DataReader
    * keys: ["plemeno"]
    * columns: ["plemeno","plemeno_txt","k_v","k_s","nazev_orig","zkratka"]
    * filters: ["cis_stand"]
    */
    function prrPlemenaPsu(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrPlemenoPsaDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrPlemenoPsaDto>;
    /**
    * GReaderPrrsfrm
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["sablona", "nazev"]
    *
    * DataReader
    * keys: ["sablona"]
    * columns: ["sablona","nazev","aktivita","s_mp"]
    * filters: ["sablona","nazev","aktivita","ixs_rad","s_mp"]
    */
    function prrsfrm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrsfrmDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrsfrmDto>;
    /**
    * GReaderPrrsrad
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["ixs_rad", "rok"]
    *
    * DataReader
    * keys: ["ixs_rad"]
    * columns: ["ixs_rad","typ_den_txt","typ_den","nazev","rok","aktivita"]
    * filters: ["ixs_rad","typ_den","aktivita"]
    */
    function prrsrad(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrsradDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrsradDto>;
    /**
    * GReaderPrrStraznici
    * FieldOptions
    * itemTemplate: "{ginsfun_nazev_rf}"
    * helperColumns: ["ginsfun_nazev_rf"]
    *
    * DataReader
    * keys: ["ixs_fun"]
    * columns: ["ixs_fun","ginsfun_nazev_ref","ginsfun_nazev_rf","ginsfun_nazev"]
    * filters: [""]
    */
    function prrStraznici(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrStraznikDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrStraznikDto>;
    /**
    * GReaderPrrTovarniZnacky
    * FieldOptions
    * itemTemplate: "{popis}"
    * helperColumns: ["popis"]
    *
    * DataReader
    * keys: ["ixs_tzv"]
    * columns: ["ixs_tzv","typ_tvo","popis","poznamka","aktivita","dat_zmena","zmenu_prov","aktivita_txt"]
    * filters: [""]
    */
    function prrTovarniZnacky(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrTovarniZnackaDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrTovarniZnackaDto>;
    /**
    * GReaderPrrTypyReseni
    * FieldOptions
    * itemTemplate: "{typ_uda_txt}"
    * helperColumns: ["typ_uda_txt", "typ_uda"]
    *
    * DataReader
    * keys: ["typ_uda"]
    * columns: ["typ_uda","typ_uda_txt","k_v","k_s","stav_rize","s_prr","s_prm","k_xml"]
    * filters: [""]
    */
    function prrTypyReseni(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrTypReseniDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrTypReseniDto>;
    /**
    * GReaderPrrTypySkutku
    * FieldOptions
    * itemTemplate: "{nazev}"
    * helperColumns: ["nazev"]
    *
    * DataReader
    * keys: ["ixs_uts"]
    * columns: ["ixs_uts","nazev","poznamka","aktivita","s_mp"]
    * filters: [""]
    */
    function prrTypySkutku(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrTypSkutkuDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrTypSkutkuDto>;
    /**
    * GReaderPrrTypyUcastnika
    * FieldOptions
    * itemTemplate: "{typ_uca_txt}"
    * helperColumns: ["typ_uca_txt"]
    *
    * DataReader
    * keys: ["typ_uca"]
    * columns: ["typ_uca","typ_uca_txt","k_v","k_s","k_xml"]
    * filters: [""]
    */
    function prrTypyUcastnika(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrTypUcastinkaDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrTypUcastinkaDto>;
    /**
    * Typ částky
    * FieldOptions
    * itemTemplate: "{typ_pla_txt}"
    * helperColumns: ["typ_pla", "typ_pla_txt"]
    *
    * DataReader
    * keys: ["typ_pla"]
    * columns: ["typ_pla","typ_pla_txt"]
    * filters: [""]
    */
    function prrctpl(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrctplDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrctplDto>;
    /**
    * Klientská část AL - číselník prrcuda
    * FieldOptions
    * itemTemplate: "{typ_uda_txt:trim:encode}"
    * helperColumns: ["typ_uda", "typ_uda_txt", "k_v", "k_s", "stav_rize", "k_xml", "s_prr", "s_prm"]
    *
    * DataReader
    * keys: ["typ_uda"]
    * columns: ["typ_uda", "typ_uda_txt", "k_v", "k_s", "stav_rize", "k_xml", "s_prr", "s_prm"]
    * filters: ["typ_uda","typ_uda_txt","k_v","k_s","stav_rize","k_xml","s_prr","s_prm"]
    */
    function prrcuda(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrcudaDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrcudaDto>;
    /**
    * Klientská část AL - číselník prrsudm
    * FieldOptions
    * itemTemplate: "{?}"
    * helperColumns: ["?"]
    *
    * DataReader
    * keys: ["ixs_udm"]
    * columns: ["ixs_udm","nazev","ixs_vud","prrscud_nazev","aktivita"]
    * filters: ["ixs_udm","ixs_pri","ixs_skt","nazev","aktivita"]
    */
    function prrsudm(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderPrrsudmDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderPrrsudmDto>;
    /**
    * GReaderSprcspr
    * FieldOptions
    * itemTemplate: "{spr_txt}"
    * helperColumns: ["spr", "spr_txt"]
    *
    * DataReader
    * keys: ["spr"]
    * columns: ["spr","spr_txt"]
    * filters: [""]
    */
    function sprcspr(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Prr.Interface.GReaderSprcsprDto>): GSelectBoxOptions<Gordic.Prr.Interface.GReaderSprcsprDto>;}
declare namespace Gordic.Data.Selectors {
    /**
    * GReaderPrrFormulare
    */
    function prrFormulare(): Selectors.DefaultSelectorOptions<Gordic.Prr.Interface.GReaderPrrFormularDto>;
    /**
    * GReaderPrrGinsfrm
    */
    function prrGinsfrm(): Selectors.DefaultSelectorOptions<Gordic.Prr.Interface.GReaderPrrGinsfrmDto>;
    /**
    * GReaderPrrsfrm
    */
    function prrsfrm(): Selectors.DefaultSelectorOptions<Gordic.Prr.Interface.GReaderPrrsfrmDto>;
    /**
    * GReaderPrrsrad
    */
    function prrsrad(): Selectors.DefaultSelectorOptions<Gordic.Prr.Interface.GReaderPrrsradDto>;
    /**
    * GReaderPrrStraznici
    */
    function prrStraznici(): Selectors.DefaultSelectorOptions<Gordic.Prr.Interface.GReaderPrrStraznikDto>;
    /**
    * Klientská část AL - číselník prrcuda
    */
    function prrcuda(): Selectors.DefaultSelectorOptions<Gordic.Prr.Interface.GReaderPrrcudaDto>;}
