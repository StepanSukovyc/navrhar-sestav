declare namespace Gordic.Data.Readers {
    /**
    * 
    *     Klientská část AL - 
    *     
    * keys: ["nuts"]
    * columns: ["nuts","nuts_txt"]
    * filters: ["nuts","aktivita"]
    */
    class GNutsReader extends Base<Gordic.Ado.Interface.GNutsReaderDto>
    {
        constructor(options?: IGReaderBase);
    }
    type GNutsReaderDto = Gordic.Ado.Interface.GNutsReaderDto;
    type GNutsReaderDtoNames = Gordic.Ado.Interface.GNutsReaderDtoNames;
    type GNutsReaderDtoFragments = Gordic.Ado.Interface.GNutsReaderDtoFragments;
    type GNutsReaderDtoTypes = Gordic.Ado.Interface.GNutsReaderDtoTypes;
    type GNutsReaderDtoTypeLengths = Gordic.Ado.Interface.GNutsReaderDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - 
    *     
    * keys: ["typ_org"]
    * columns: ["typ_org","typ_org_txt"]
    * filters: ["typ_org"]
    */
    class AdoEkocado extends Base<Gordic.Ado.Interface.GEkocadoDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdoEkocadoDto = Gordic.Ado.Interface.GEkocadoDto;
    type AdoEkocadoDtoNames = Gordic.Ado.Interface.GEkocadoDtoNames;
    type AdoEkocadoDtoFragments = Gordic.Ado.Interface.GEkocadoDtoFragments;
    type AdoEkocadoDtoTypes = Gordic.Ado.Interface.GEkocadoDtoTypes;
    type AdoEkocadoDtoTypeLengths = Gordic.Ado.Interface.GEkocadoDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - 
    *     
    * keys: ["tuj"]
    * columns: ["tuj","tuj_txt"]
    * filters: ["tuj"]
    */
    class AdoEkoctuj extends Base<Gordic.Ado.Interface.GEkoctujDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdoEkoctujDto = Gordic.Ado.Interface.GEkoctujDto;
    type AdoEkoctujDtoNames = Gordic.Ado.Interface.GEkoctujDtoNames;
    type AdoEkoctujDtoFragments = Gordic.Ado.Interface.GEkoctujDtoFragments;
    type AdoEkoctujDtoTypes = Gordic.Ado.Interface.GEkoctujDtoTypes;
    type AdoEkoctujDtoTypeLengths = Gordic.Ado.Interface.GEkoctujDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - číselník Odvětvová klasifikace ekonomických činností 
    *     
    * keys: ["okec"]
    * columns: ["okec","nazev"]
    * filters: ["okec"]
    */
    class AdoEkosoke extends Base<Gordic.Ado.Interface.GEkosokeDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdoEkosokeDto = Gordic.Ado.Interface.GEkosokeDto;
    type AdoEkosokeDtoNames = Gordic.Ado.Interface.GEkosokeDtoNames;
    type AdoEkosokeDtoFragments = Gordic.Ado.Interface.GEkosokeDtoFragments;
    type AdoEkosokeDtoTypes = Gordic.Ado.Interface.GEkosokeDtoTypes;
    type AdoEkosokeDtoTypeLengths = Gordic.Ado.Interface.GEkosokeDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - 
    *     
    * keys: ["ixs_rar"]
    * columns: ["ixs_rar","orgnum","nazev"]
    * filters: ["ixs_rar"]
    */
    class AdoEkosrar extends Base<Gordic.Ado.Interface.GEkosrarDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdoEkosrarDto = Gordic.Ado.Interface.GEkosrarDto;
    type AdoEkosrarDtoNames = Gordic.Ado.Interface.GEkosrarDtoNames;
    type AdoEkosrarDtoFragments = Gordic.Ado.Interface.GEkosrarDtoFragments;
    type AdoEkosrarDtoTypes = Gordic.Ado.Interface.GEkosrarDtoTypes;
    type AdoEkosrarDtoTypeLengths = Gordic.Ado.Interface.GEkosrarDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - 
    *     
    * keys: ["zuje"]
    * columns: ["zuje","nazev"]
    * filters: ["zuje"]
    */
    class AdoEkoszuj extends Base<Gordic.Ado.Interface.GEkoszujDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdoEkoszujDto = Gordic.Ado.Interface.GEkoszujDto;
    type AdoEkoszujDtoNames = Gordic.Ado.Interface.GEkoszujDtoNames;
    type AdoEkoszujDtoFragments = Gordic.Ado.Interface.GEkoszujDtoFragments;
    type AdoEkoszujDtoTypes = Gordic.Ado.Interface.GEkoszujDtoTypes;
    type AdoEkoszujDtoTypeLengths = Gordic.Ado.Interface.GEkoszujDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - číselník Knihy RZA
    *     
    * keys: ["dur"]
    * columns: ["dur","dur_txt"]
    * filters: ["dur"]
    */
    class AdoGincdur extends Base<Gordic.Ado.Interface.GGincdurDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdoGincdurDto = Gordic.Ado.Interface.GGincdurDto;
    type AdoGincdurDtoNames = Gordic.Ado.Interface.GGincdurDtoNames;
    type AdoGincdurDtoFragments = Gordic.Ado.Interface.GGincdurDtoFragments;
    type AdoGincdurDtoTypes = Gordic.Ado.Interface.GGincdurDtoTypes;
    type AdoGincdurDtoTypeLengths = Gordic.Ado.Interface.GGincdurDtoTypeLengths;

    /**
    * 
    *     Klientská část AL - číselník Knihy RZA
    *     
    * keys: ["okec"]
    * columns: ["okec","okec_txt"]
    * filters: ["okec"]
    */
    class AdoVykcoke extends Base<Gordic.Ado.Interface.GVykcokeDto>
    {
        constructor(options?: IGReaderBase);
    }
    type AdoVykcokeDto = Gordic.Ado.Interface.GVykcokeDto;
    type AdoVykcokeDtoNames = Gordic.Ado.Interface.GVykcokeDtoNames;
    type AdoVykcokeDtoFragments = Gordic.Ado.Interface.GVykcokeDtoFragments;
    type AdoVykcokeDtoTypes = Gordic.Ado.Interface.GVykcokeDtoTypes;
    type AdoVykcokeDtoTypeLengths = Gordic.Ado.Interface.GVykcokeDtoTypeLengths;
}
declare namespace Gordic.Prefabs.Select {
    /**
    * 
    *     Klientská část AL - 
    *     
    * FieldOptions
    * itemTemplate: "<b>{nuts}</b> - {nuts_txt}"
    * helperColumns: ["nuts", "nuts_txt"]
    *
    * DataReader
    * keys: ["nuts"]
    * columns: ["nuts","nuts_txt"]
    * filters: ["nuts","aktivita"]
    */
    function gNutsReader(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GNutsReaderDto>): GSelectBoxOptions<Gordic.Ado.Interface.GNutsReaderDto>;
    /**
    * 
    *     Klientská část AL - 
    *     
    * FieldOptions
    * itemTemplate: "{typ_org_txt}"
    * helperColumns: ["typ_org_txt"]
    *
    * DataReader
    * keys: ["typ_org"]
    * columns: ["typ_org","typ_org_txt"]
    * filters: ["typ_org"]
    */
    function adoEkocado(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GEkocadoDto>): GSelectBoxOptions<Gordic.Ado.Interface.GEkocadoDto>;
    /**
    * 
    *     Klientská část AL - 
    *     
    * FieldOptions
    * itemTemplate: "<b>{tuj}</b> - {tuj_txt}"
    * helperColumns: ["tuj", "tuj_txt"]
    *
    * DataReader
    * keys: ["tuj"]
    * columns: ["tuj","tuj_txt"]
    * filters: ["tuj"]
    */
    function adoEkoctuj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GEkoctujDto>): GSelectBoxOptions<Gordic.Ado.Interface.GEkoctujDto>;
    /**
    * 
    *     Klientská část AL - číselník Odvětvová klasifikace ekonomických činností 
    *     
    * FieldOptions
    * itemTemplate: "<b>{okec}</b> - {nazev}"
    * helperColumns: ["okec", "nazev"]
    *
    * DataReader
    * keys: ["okec"]
    * columns: ["okec","nazev"]
    * filters: ["okec"]
    */
    function adoEkosoke(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GEkosokeDto>): GSelectBoxOptions<Gordic.Ado.Interface.GEkosokeDto>;
    /**
    * 
    *     Klientská část AL - 
    *     
    * FieldOptions
    * itemTemplate: "<b>{ixs_rar} - {nazev}</b>"
    * helperColumns: ["ixs_rar", "nazev"]
    *
    * DataReader
    * keys: ["ixs_rar"]
    * columns: ["ixs_rar","orgnum","nazev"]
    * filters: ["ixs_rar"]
    */
    function adoEkosrar(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GEkosrarDto>): GSelectBoxOptions<Gordic.Ado.Interface.GEkosrarDto>;
    /**
    * 
    *     Klientská část AL - 
    *     
    * FieldOptions
    * itemTemplate: "<b>{zuje}</b> - {nazev}"
    * helperColumns: ["zuje", "nazev"]
    *
    * DataReader
    * keys: ["zuje"]
    * columns: ["zuje","nazev"]
    * filters: ["zuje"]
    */
    function adoEkoszuj(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GEkoszujDto>): GSelectBoxOptions<Gordic.Ado.Interface.GEkoszujDto>;
    /**
    * 
    *     Klientská část AL - číselník Knihy RZA
    *     
    * FieldOptions
    * itemTemplate: "<b>{dur}</b> - {dur_txt}"
    * helperColumns: ["dur", "dur_txt"]
    *
    * DataReader
    * keys: ["dur"]
    * columns: ["dur","dur_txt"]
    * filters: ["dur"]
    */
    function adoGincdur(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GGincdurDto>): GSelectBoxOptions<Gordic.Ado.Interface.GGincdurDto>;
    /**
    * 
    *     Klientská část AL - číselník Knihy RZA
    *     
    * FieldOptions
    * itemTemplate: "<b>{okec}</b> - {okec_txt}"
    * helperColumns: ["okec", "okec_txt"]
    *
    * DataReader
    * keys: ["okec"]
    * columns: ["okec","okec_txt"]
    * filters: ["okec"]
    */
    function adoVykcoke(prefabOptions?: Partial<Gordic.Data.Selectors.UserSelectorOptions> & Gordic.Data.Selectors.DefaultSelectorOptionsType<Gordic.Ado.Interface.GVykcokeDto>): GSelectBoxOptions<Gordic.Ado.Interface.GVykcokeDto>;}
