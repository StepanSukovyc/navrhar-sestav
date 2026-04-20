declare namespace Gordic.Esu.Dialogs {
    /**
     * Dialog vyberu externi agendy.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The content.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {GInt16}                                opt.typ_vazby                       typ_vazby
     * @param  {string}                                opt.ixs_dva                         ixs_dva
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function ZmenaTypuVazbyDlg(parentContent: GContent, opt?: {
        /**
         * typ_vazby.
         */
        typ_vazby?: number;
        /**
         * ixs_dva.
         */
        ixs_dva?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog detail externího subjektu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.IxsEsu                          IxsEsu
     * @param  {TypZobrazeni}                          opt.Ucel                            Ucel
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {bool}                                  opt.LzePrepnoutZDetailuNaEditaci    LzePrepnoutZDetailuNaEditaci
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function DetailEsuDlg(parentContent: GContent, opt: GDetailEsuDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    interface GDetailEsuDlgInputParams {
        /**
         * IxsEsu.
         */
        IxsEsu: string | null;
        /**
         * Ucel.
         */
        Ucel: Gordic.Esu.Globals.Enums.TypZobrazeni;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
         * LzePrepnoutZDetailuNaEditaci. Default false.
         */
        LzePrepnoutZDetailuNaEditaci?: boolean;
        /**
         * TypNovehoEsu
         */
        TypNovehoEsu?: number;
        /**
         * NazevNovehoEsu
         */
        NazevNovehoEsu?: string;
        /**
         * ModJmennyRejstrik
         */
        ModJmennyRejstrik?: Gordic.Esu.WebClient.ModJmennyRejstrikEnum;
        /**
         * EditaceNeboZalozeniZastupneOsobyDto
         */
        EditaceNeboZalozeniZastupneOsobyDto?: Gordic.Esu.WebClient.GSeznamZastupnychDto;
        /**
         * EditaceNeboZalozeniZastupneOsobyDto
         */
        DataNovehoESU?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * EditaceNeboZalozeniZastupneOsobyDto
         */
        DoplnkovaAkcePoSpusteniDetailuESU?: Gordic.Esu.WebClient.DoplnkovaAkcePoSpusteniDetailuESUEnum;
        /**
         * IxsEsu.
         */
        ZalozniIxsEsuProNovouPobocku?: string | null;
    }
    interface GDetailEsuDlgReturnValue {
    }
    /**
     * Dialog detail externího subjektu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<GDetailEsuDlgInputParams>} input
     */
    function GDetailEsuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<GDetailEsuDlgInputParams>): JQuery.Promise<GDetailEsuDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Detail bankovních účtů.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.IxsEsu                          IxsEsu
     * @param  {TypZobrazeniBankovniUcty}              opt.Ucel                            Ucel = typ zobrazení(0- detail 1 - editace 2 -prevzit )
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function BankovniUctyDlg(parentContent: GContent, opt: {
        /**
         * IxsEsu.
         */
        IxsEsu: string;
        /**
         * Ucel = typ zobrazení(0- detail 1 - editace 2 -prevzit ).
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniBankovniUcty;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Detail bankovního účtů.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {string}                                opt.IxsEsu                          IxsEsu
     * @param  {GBankovniUctyDto}                      opt.UcetDto                         Ucel = typ zobrazení(0- detail 1 - editace 2 -prevzit )
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function BankovniUcetDlg(parentContent: GContent, opt: {
        /**
         * IxsEsu.
         */
        IxsEsu: string;
        /**
         * Ucet dto.
         */
        UcetDto?: Gordic.Esu.WebClient.GBankovniUctyDto;
        UcetPredplneniDto?: Gordic.Esu.WebClient.GBankovniUctyDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog detail externího subjektu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {TypZobrazeniKaroteka}                  opt.Ucel                            Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function KartotekaEsuDlg(parentContent: GContent, opt: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
        * FieldsToFilterpanel.
        */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        StrictStopAutoLoad?: boolean;
        /**
         * Pokud se vyhledá pouze jeden subjekt, tak se rovnou vybere => použití pokud se filtruje na ičo například
         */
        PokudNalezenJedenSubjektRovnouPrevzit?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    function KartotekaEsuDlgFromMain(parentContent: GContent, opt?: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
      * FieldsToFilterpanel.
      */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
        */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
          * Data podle kterych se vyhledá v karotece hned po otevření
          */
        StrictStopAutoLoad?: boolean;
        /**
         * Pokud se vyhledá pouze jeden subjekt, tak se rovnou vybere => použití pokud se filtruje na ičo například
         */
        PokudNalezenJedenSubjektRovnouPrevzit?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<JQuery | undefined>;
    /**
     * Hromadne Overeni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {TypZobrazeniKaroteka}                  opt.Ucel                            Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function HromadneOvereniDlg(parentContent: GContent, opt: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
        * FieldsToFilterpanel.
        */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        StrictStopAutoLoad?: boolean;
        /**
         * Jde o SZR ROB
         */
        SzrRob?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    function HromadneOvereniDlgFromMain(parentContent: GContent, opt?: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
      * FieldsToFilterpanel.
      */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
        */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
          * Data podle kterych se vyhledá v karotece hned po otevření
          */
        StrictStopAutoLoad?: boolean;
        /**
         * Pokud se vyhledá pouze jeden subjekt, tak se rovnou vybere => použití pokud se filtruje na ičo například
         */
        SzrRob?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<JQuery | undefined>;
    /**
     * Dialog detail externího subjektu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {TypZobrazeniKaroteka}                  opt.Ucel                            Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function JmennyRejstrikDlg(parentContent: GContent, opt: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
        * FieldsToFilterpanel.
        */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        StrictStopAutoLoad?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    function JmennyRejstrikDlgFromMain(parentContent: GContent, opt?: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
      * FieldsToFilterpanel.
      */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
        */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
          * Data podle kterych se vyhledá v karotece hned po otevření
          */
        StrictStopAutoLoad?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<JQuery | undefined>;
    /**
     * Zobrazí seznam insolvencí.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {GSeznamInsolvenceFilterDto}            opt.filter                          filter
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GSeznamInsolvenceDlg(parentContent: GContent, opt?: WebClient.GSeznamInsolvenceDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GSeznamInsolvenceDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Detail insolvenčního řízení.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {GSeznamInsolvenceDataDto}              opt.detailIR                        detailIR
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GDetailInsolvenceDlg(parentContent: GContent, opt: WebClient.GDetailInsolvenceDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebClient.GDetailInsolvenceDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Ověření a převzetí z rob.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {bool}                                  opt.EditMode                        EditMode
     * @param  {GDetailEsuItemsDto}                    opt.esuDto                          esuDto
     * @param  {VyberZRobItemsDto}                     opt.VyberZRobItemsDto               VyberZRobItemsDto
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function VyberZRobDlg(parentContent: GContent, opt?: {
        /**
         * EditMode true = editace false = nahled.
         */
        EditMode?: boolean;
        /**
         * Data z ESU.
         */
        esuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * Data pro Rob.
         */
        VyberZRobItemsDto?: Gordic.Esu.WebClient.GVyberZRobItemsDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Ověření a převzetí z ros.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {bool}                                  opt.EditMode                        EditMode
     * @param  {GDetailEsuItemsDto}                    opt.esuDto                          esuDto
     * @param  {VyberZRosItemsDto}                     opt.VyberZRosItemsDto               VyberZRosItemsDto
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function VyberZRosDlg(parentContent: GContent, opt?: {
        /**
         * EditMode true = editace false = nahled.
         */
        EditMode?: boolean;
        /**
         * Data z ESU.
         */
        esuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * Data pro Ros.
         */
        VyberZRosItemsDto?: Gordic.Esu.WebClient.GVyberZRosItemsDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Ověření a převzetí z ros.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {bool}                                  opt.EditMode                        EditMode
     * @param  {GString}                               opt.idPobocky                          idPobocky
     * @param  {GIszrDtoNavratZHledani}                opt.ROSdata                         ROSdata
     * @param  {GString}                               opt.IdDs                            IdDs
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GVyberZRosDataTabDlg(parentContent: GContent, opt?: {
        /**
         * EditMode true = editace false = nahled.
         */
        EditMode?: boolean;
        /**
         * Vybrana pobocka.
         */
        idPobocky?: string;
        /**
         * Iszrtabulky z ros.
         */
        ROSdata?: Gordic.Esu.WebClient.GIszrDtoNavratZHledani;
        /**
         * IdDs.
         */
        IdDs?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Převzetí zástupu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {}                                      opt.EditMode                        EditMode
     * @param  {}                                      opt.PoleZastupu                     PoleZastupu
     * @param  {}                                      opt.por_zastVybraneho               por_zastVybraneho
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function ZastupyGridDlg(parentContent: GContent, opt?: {
        /**
         * EditMode true = editace false = nahled.
         */
        EditMode?: boolean;
        /**
         * Pole s daty.
         */
        PoleZastupu?: any[];
        /**
         * Iszrtabulky z ros.
         */
        por_zastVybraneho?: any;
        /**
         * pid esu
         */
        Ixs_esu?: string;
        /**
         * Iszrtabulky z ros.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
         * Doplnkove promenné
         */
        others?: any;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Výběr agendy.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {GString}                               opt.IxsTyp                          IxsTyp
     * @param  {GString}                               opt.IxpDen                          IxpDen
     * @param  {GString}                               opt.TypPhl                          TypPhl
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GSzrVyberAgendyDlg(parentContent: GContent, opt: {
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
         * IxsTyp.
         */
        IxsTyp?: string;
        /**
         * IxpDen.
         */
        IxpDen?: string;
        /**
         * TypPhl.
         */
        TypPhl?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * GSzrRobSeznamZmenDlg.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GSzrRobSeznamZmenDlg(parentContent: GContent, opt: {
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Seznam změn ROB.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {GLogovani}                             opt.Logovani                        Logovani
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GSzrRobVypisUdajuDlg(parentContent: GContent, opt: {
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Registr plátců DPH.
     *
     * @author  Dsebesta
     * @date    25.07.2017
     *
     * @param   {gcontent}                                      parentContent         Kontent ze kterého je okno otvíráno (this).
     * @param   {object}                                        opt
     * @param   {string}                                        opt.dic             Dič plátce.
     * @param   {string}                                        opt.nazev           Název plátce.                         Parametry dialogu.
     * @param   {Gordic.Global.Enums.ModOtevreni}          ModOtevreni     Způsob otevření dialogu(Gordic.Global.Enums.ModOtevreni.xxxxxx)
     *
     * @return  {jQuery}
     */
    function InfoNespPlatceDphDlg(parentContent: GContent, opt?: WebClient.InfoNespPlatceDphDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Vybrání typu subjektu v isids.
     *
     * @author  Dsebesta
     * @date    26.07.2017
     *
     * @param   {gcontent}                                      parentContent            Kontent ze kterého je okno otvíráno (this).
     * @param   {object}                                        opt
     * @param   {string}                                        opt.nazev               nazev
     * @param   {string}                                        opt.TypIsds             typ isds.
     * @param   {Gordic.Global.Enums.ModOtevreni}          ModOtevreni             Způsob otevření dialogu(Gordic.Global.Enums.ModOtevreni.xxxxxx)
     * @return  .
     */
    function VyberTypuSubjektuISDSDlg(parentContent: GContent, opt?: {
        /**
         * Název.
         */
        nazev?: string;
        /**
         * TypIsds.
         */
        TypIsds?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Externí registr rozdíly.
     *
     * @author  Dsebesta
     * @date    02.08.2017
     *
     * @param   {gcontent}              content                         parent content.
     * @param   {object}                userOptions                     Parametry dialogu.
     * @param   {GExtRegRozdilyDto[]}   userOptions.PolozekKPorovnani   polozky k porovnani     List<ExtRegistrRozdilyDlg>
     * @param   {string}                userOptions.UrlEsuVReg          odkaz na registr
     * @param   {string}                userOptions.ExtReg              číslo registru   1   2 3...
     * @param   {string}                userOptions.WinMode             The window mode.
     * @param   {string}                userOptions.IdEsu               The identifier esu. //  ixs_esu
     * @param   {bool}                 userOptions.PrevzitVOkne        prevzit v okne ( zda se mají data rovnou uložit nebo vrátit z dialogu)
     * @param   ModOtevreni                     Mód otevření dialogu.
     * @return  .
     */
    function ExtRegistrRozdilyDlg(parentContent: GContent, opt?: {
        /**
         * Polozky k porovnani.
         */
        PolozekKPorovnani?: Gordic.Esu.Interface.GExtRegRozdilyDto[];
        /**
         * Odkaz na registr.
         */
        UrlEsuVReg?: string;
        /**
         * Číslo registru   1   2 3....
         */
        ExtReg?: string;
        /**
         * WinMode.
         */
        WinMode?: string;
        /**
         * IdEsu.
         */
        IdEsu?: string;
        /**
         * Prevzit v okne ( zda se mají data rovnou uložit nebo vrátit z dialogu). Default false.
         */
        PrevzitVOkne?: boolean;
        /**
         * OmezenePrevzeti. Default false.
         */
        OmezenePrevzeti?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na výběr subjektu nalezených v externím registru.
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   {gcontent}                              parentContent                 parent content.
     * @param   {object}                                opt                     Parametry dialogu.
     * @param   {GISDSSubjektDto[]}                     opt.NalezeneSubjekty    pole nalezených subjektu GISDSSubjektDto.
     * @param   {GDetailEsuItemsDto}                    opt.EsuDto              Esu
     * @param   {string}                                opt.Novy                Novy
     * @param   {Gordic.Global.Enums.ModOtevreni}  ModOtevreni             Mód otevření dialogu.
     * @return  .
     */
    function ExtRegistrSubjektyDlg(parentContent: GContent, opt?: {
        /**
         * Pole nalezených subjektu GISDSSubjektDto.
         */
        NalezeneSubjekty?: Gordic.Esu.Interface.GISDSSubjektDto[];
        /**
         * Esu.
         */
        EsuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * Novy
         */
        Novy?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Extent registr subjekty vera dialog.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                              parentContent   The content.
     * @param   {object}                                opt             Parametry dialogu.
     * @param   {string}                                opt.TypEsu      The typ esu.
     * @param   {GVERAOrganizacetDto[]}                 opt.Organizace  The organizace.
     * @param   {GVERAObyvateltDto[]}                   opt.Obyvatele   The obyvatele.
     * @param   {GDetailEsuItemsDto}                    opt.EsuDto      The esu dto.
     * @param   {GString}                               opt.Novy        The novy.
     * @param   {Gordic.Global.Enums.ModOtevreni}  ModOtevreni     Mód otevření dialogu.
  
     *
     * @return  .
     */
    function ExtRegistrSubjektyVeraDlg(parentContent: GContent, opt?: {
        /**
         * Pole nalezených subjektu GISDSSubjektDto.
         */
        TypEsu?: string;
        /**
         * Esu.
         */
        Organizace?: Gordic.Esu.Interface.GVERAOrganizacetDto[];
        /**
         * Obyvatele.
         */
        Obyvatele?: Gordic.Esu.Interface.GVERAObyvateltDto[];
        /**
         * EsuDto.
         */
        EsuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * Novy.
         */
        Novy?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Registr Ruian.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                              parentContent     The content.
     * @param   {object}                                opt                     Parametry dialogu.
     * @param   {bool}                                  opt.EditMode                     Parametry dialogu.
     * @param   {GDetailEsuItemsDto}                    opt.esuDto      GDetailEsuItemsDto dtočko s hodnotami esu .
     * @param   {GString}                               opt.adresaKod  adresa Kod.
     * @param   {bool}                                  opt.enableOk   nepovinne zda zakázat Ok tlačítko.
     * @param   {Gordic.Global.Enums.ModOtevreni}  ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function VyberZRuianDlg(parentContent: GContent, opt?: {
        /**
         * Pole nalezených subjektu GISDSSubjektDto.
         */
        EditMode?: boolean;
        /**
         * GDetailEsuItemsDto dtočko s hodnotami esu.
         */
        esuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * Adresa Kod.
         */
        adresaKod?: string;
        /**
         * Nepovinne zda zakázat Ok tlačítko. Default false.
         */
        enableOk?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Registr Ruian.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                              parentContent               The content.
     * @param   {object}                                userOptions                 vstupní data .
     * @param   {TypZobrazeniPobocky}                   userOptions.Ucel            0-Běžný režim - (dvojklik otevírá detail a neprovádí výběr)
     *                                                                              1-SelectEsu (Režim výběru jednoho externího subjektu)
     *                                                                              2-Detail (Režim kdy jde otevřít pouze detail)
     * @param   {GSeznamIxsDto}                         userOptions.IxsDto
     * @param   {string}                                userOptions.IxsDto.IxsEsu   IxsEsu   je povinné
     * @param   {string}                                userOptions.IxsDto.IxsNad
     * @param   {GLogovani}                             userOptions.Logovani        klasický logovací objekt
     * @param   {Gordic.Global.Enums.ModOtevreni}  ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function SeznamPobocekDlg(parentContent: GContent, opt?: {
        /**
         * Ucel.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniPobocky;
        /**
         * IxsDto.
         */
        IxsDto?: Gordic.Esu.WebClient.GSeznamIxsDto;
        /**
         * Klasický logovací objekt.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * SeznamAdresDlg.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                              parentContent               The content.
     * @param   {object}                                userOptions                 vstupní data .
     * @param   {GLogovani}                             userOptions.Logovani        klasický logovací objekt
     * @param   {string}                                userOptions.VyhledaniAdresDto.ixsEsu                    // udaje pro vyhledávání
     * @param   {string}                                userOptions.VyhledaniAdresDto.nazev                     // udaje pro vyhledávání
     * @param   {string}                                userOptions.VyhledaniAdresDto.ico                       // udaje pro vyhledávání
     * @param   {string}                                userOptions.VyhledaniAdresDto.idDs                      // udaje pro vyhledávání
     * @param   {string[]}                              userOptions.VyhledaniAdresDto.m_asEsuListForRemove    // Pole IxsEsu, které se nemají nabízet
     * @param   {Gordic.Global.Enums.ModOtevreni}  ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function SeznamAdresDlg(parentContent: GContent, opt?: {
        /**
         * VyhledaniAdresDto.
         */
        VyhledaniAdresDto?: Gordic.Esu.WebClient.GVyhledaniAdresDto;
        /**
         * Klasický logovací objekt.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * SeznamPodobnychDlg.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                                 parentContent               The content.
     * @param   {object}                                   userOptions                 vstupní data .
     * @param   {GLogovani}                                userOptions.Logovani        klasický logovací objekt
     * @param   {GDetailEsuItemsDto}                       userOptions.DetailUkladaneho   ukládaný subjekt
     * @param   {GKartotekaDto[]}                          userOptions.SeznamPodobnych    podobné subjekty ukládanému
     * @param   {Gordic.Global.Enums.ModOtevreni}     ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function SeznamPodobnychDlg(parentContent: GContent, opt?: {
        /**
         * DetailUkladaneho.
         */
        DetailUkladaneho?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * SeznamPodobnych.
         */
        SeznamPodobnych?: Gordic.Esu.WebClient.GKartotekaDto[];
        /**
         * Klasický logovací objekt.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * EsuAuditDlg.
     *
     *
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                                 parentContent               The content.
     * @param   {Gordic.Global.Enums.ModOtevreni}     ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function EsuAuditDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * HistorieEsuDlg.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                                 parentContent                       The content.
     * @param   {object}                                   opt                                 vstupní data .
     * @param   {GLogovani}                                opt.Logovani                        klasický logovací objekt
     * @param   {HistorieEsuInputDto}                      opt.InputDto                        C# HistorieEsuInputDto.
     * @param   {string}                                   opt.InputDto.ixsEsu                 ixsesu
     * @param   {Gordic.Global.Enums.ModOtevreni}     ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function HistorieEsuDlg(parentContent: GContent, opt?: {
        /**
         * HistorieEsuInputDto.
         */
        InputDto?: Gordic.Esu.WebClient.HistorieEsuInputDto;
        /**
         * Klasický logovací objekt.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * HistoriePodrobnaDlg.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                                 parentContent                       The content.
     * @param   {object}                                   opt                                 vstupní data .
     * @param   {HistorieEsuInputDto}                      opt.InputDto                        C# HistorieEsuInputDto.
     * @param   {string}                                   opt.InputDto.ixsEsu                 ixsesu
     * @param   {Gordic.Global.Enums.ModOtevreni}     ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function HistoriePodrobnaDlg(parentContent: GContent, opt?: {
        /**
         * HistorieEsuInputDto.
         */
        InputDto?: Gordic.Esu.WebClient.HistorieEsuInputDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * RozdelovnikEsuDlg.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                                 parentContent                       The content.
     * @param   {object}                                   opt                                 vstupní data .
     * @param   {GLogovani}                                opt.Logovani                        klasický logovací objekt
     * @param   {EsuSkupinyWorkingMode}                    opt.SkupinyWorkingMode              C# EsuSkupinyWorkingMode.
     * @param   {Gordic.Global.Enums.ModOtevreni}     ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function RozdelovnikEsuDlg(parentContent: GContent, opt?: {
        /**
         * EsuSkupinyWorkingMode.
         */
        SkupinyWorkingMode?: Gordic.Esu.Globals.Enums.EsuSkupinyWorkingMode;
        /**
         * Klasický logovací objekt.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * RozdelovnikEsuDlgFromMain.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                                 parentContent                       The content.
     * @param   {object}                                   opt                                 vstupní data .
     * @param   {GLogovani}                                opt.Logovani                        klasický logovací objekt
     * @param   {EsuSkupinyWorkingMode}                    opt.SkupinyWorkingMode              C# EsuSkupinyWorkingMode.
     * @param   {Gordic.Global.Enums.ModOtevreni}     ModOtevreni Mód otevření dialogu.
     * @return  .
     */
    function RozdelovnikEsuDlgFromMain(parentContent: GContent, opt?: {
        /**
         * EsuSkupinyWorkingMode.
         */
        SkupinyWorkingMode?: Gordic.Esu.Globals.Enums.EsuSkupinyWorkingMode;
        /**
         * Klasický logovací objekt.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<JQuery | undefined> | undefined;
    /**
     * DetailRozdelovnikuESUDlg.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   {gcontent}                                 parentContent                   The content.
     * @param   {object}                                   opt                             vstupní data .
     * @param   {GString}                                  opt.IxsRzd                      Ixsrzd skupiny pokud bude null pujde o založení nové skupiny a opt.TypSkupiny bude povinný
     * @param   {GInt16}                                   opt.TypSkupiny                  TypSkupiny pouze pro zakládání nového.
     * @param   {bool}                                     opt.Editace                     povolení editovat
     * @return  .
     */
    function DetailRozdelovnikuESUDlg(parentContent: GContent, opt?: {
        /**
         * Ixsrzd skupiny pokud bude null pujde o založení nové skupiny a opt.TypSkupiny bude povinný.
         */
        IxsRzd?: string;
        /**
         * TypSkupiny pouze pro zakládání nového.
         */
        TypSkupiny?: number;
        /**
         * Povolení editovat. Default false.
         */
        Editace?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * GSzrVypisFrontyRobDlg.
     *
     * @author  Dsebesta
     * @date    16.08.2017
     *
     * @param   content                        The content.
     * @param   ModOtevreni                    Mód otevření dialogu.
     * @return  .
     */
    function GSzrVypisFrontyRobDlg(parentContent: GContent, opt?: {
        /**
         * Klasický logovací objekt.
         */
        Logovani?: Gordic.Gin.Globals.Dialogs.IGLogovani;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Ověření a převzetí z psr.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param  {gcontent}                              parentContent                       The parentContent.
     * @param  {object}                                opt                                 Parametry dialogu.
     * @param  {bool}                                  opt.EditMode                        EditMode
     * @param  {GDetailEsuItemsDto}                    opt.esuDto                          esuDto
     * @param  {VyberZPsrItemsDto}                     opt.VyberZPsrItemsDto               VyberZPsrItemsDto
     * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
     * @return  .
     */
    function GVyberZPsrDlg(parentContent: GContent, opt?: {
        /**
         * EditMode true = editace false = nahled.
         */
        EditMode?: boolean;
        /**
         * Data z ESU.
         */
        esuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * Data pro Psr.
         */
        VyberZPsrItemsDto?: Gordic.Esu.WebClient.GVyberZPsrItemsDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
    * Dialog napojování externího subjektu.
    *
    * @author  Dsebesta
    * @date    6.11.2017
    *
    * @param  {gcontent}                              parentContent                       The parentContent.
    * @param  {object}                                opt                                 Parametry dialogu.
    * @param  {TypZobrazeniKaroteka}                  opt.Ucel                            Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo
    * @param  {GLogovani}                             opt.Logovani                        Logovani
    * @param  {Gordic.Global.Enums.ModOtevreni}  ModOtevreni                         Mód otevření dialogu.
    * @return  .
    */
    function NapojovaniEsuDlg(parentContent: GContent, opt: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
        * FieldsToFilterpanel.
        */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
         */
        StrictStopAutoLoad?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    function NapojovaniEsuDlgFromMain(parentContent: GContent, opt?: {
        /**
         * Ucel 0 = Normal, 1 = SelectEsu,  2 = SelectEsuOrZo, 3 = SelectMultiEsuAndZo.
         */
        Ucel?: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka;
        /**
         * Logovani.
         */
        Logovani: Gordic.Gin.Globals.Dialogs.IGLogovani;
        /**
      * FieldsToFilterpanel.
      */
        FieldsToFilterpanel?: Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter[];
        /**
       * klic pro simpleMod
       */
        IdSimpleMode?: string;
        /**
         * Data podle kterych se vyhledá v karotece hned po otevření
        */
        DataToFilterPanel?: Gordic.Esu.WebClient.GKartotekaFilterDto;
        /**
          * Data podle kterych se vyhledá v karotece hned po otevření
          */
        StrictStopAutoLoad?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<JQuery | undefined>;
    /**
    * Otevre dialog seznam esu s vyplněným ID DS
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
    */
    function GEsuSeznamOvereniIsdsDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Kontroly GDPR
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
    */
    function GEsuKontrolyGdprDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * GSzrAktSledovaniZmenIszr
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
    */
    function GSzrAktSledovaniZmenIszrDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * GEsuSeznamPolozekOsUdajuDlg
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
   */
    function GEsuSeznamPolozekOsUdajuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * Otevre seznam nepouzitych
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
   */
    function GEsuSeznamNepouzitychDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        NavazaneNaSkartovane: boolean;
    }>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Připravenost gdpr
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    */
    function PripravenostGdprDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * SeznamOdstranenych
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   */
    function SeznamOdstranenychDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
   * GDsInfoHistorieDlgs
   *
   * @author  dSebesta
   *
   * @param {gcontent} parentContent The content.
   * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
   * @param {!object} opt Parametry dialogu.
   */
    function GDsInfoHistorieDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
  * NacteniRuianDlg
  *
  * @author  dSebesta
  *
  * @param {gcontent} parentContent The content.
  * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
  * @param {!object} opt Parametry dialogu.
  */
    function NacteniRuianDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * EsuNastaveniDlg
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    */
    function EsuNastaveniDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * DavkoveZalozeniEsuDlg
    *
    * @author  dSebesta
    *
    * @param {gcontent} parentContent The content.
    * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
    * @param {!object} opt Parametry dialogu.
    */
    function DavkoveZalozeniEsuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* dialog VyslNacteniSubjektuDlg
*
* @author  dSebesta
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
*/
    function VyslNacteniSubjektuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        IxsRzd: string;
    }>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* dialog GSzrSeznamDokladuDlg
*
* @author  dSebesta
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
*/
    function SzrSeznamDokladuDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        Aifo: string;
    }>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* dialog SzrAiseoDlg
*
* @author  dSebesta
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
*/
    function SzrAiseoDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<SzrAiseoDlgInputParams>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface SzrAiseoDlgInputParams {
        /**
        * EditMode
        */
        EditMode?: boolean;
        /**
         * Data z ESU.
         */
        esuDto?: Gordic.Esu.WebClient.GDetailEsuItemsDto;
        /**
         * Data pro Ros.
         */
        VyberZRosItemsDto?: Gordic.Esu.WebClient.GVyberZRosItemsDto;
    }
    /**
* dialog DetAdresyAiseoDlg
*
* @author  dSebesta
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
*/
    function DetAdresyAiseoDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        inputDto: Esu.WebClient.DetAdresyAiseoDlgInputDto;
    }>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* dialog DetOsobyAiseoDlg
*
* @author  dSebesta
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
*/
    function DetOsobyAiseoDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{
        inputDto: Esu.WebClient.DetOsobyAiseoDlgInputDto;
    }>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
* dialog DetOsobyAiseoDlg
*
* @author  dSebesta
*
* @param {gcontent} parentContent The content.
* @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
* @param {!object} opt Parametry dialogu.
* @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
*/
    function GPrevodAisvDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<{}>): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
}
declare namespace Gordic.Esu.Function {
    function ColumnTypAdresy(): {
        name: string;
        caption: string;
        customClass: string;
        width: number;
        sortOrder: (aObj: any, bObj: any) => number;
        iconTemplate: (data: any) => {
            icon: string;
            tooltip: string;
        } | null | undefined;
    };
    function GridAdresyVratIkonkuTypuAdresy(typAdr: any, typEsu: any, pocDoruc: any, dat_umrti: any): {
        sortValue: number;
        img: string;
        tooltip: string;
    };
    function DatumOvereniVSZRColumn(): {
        name: string;
        caption: string;
        customClass: string;
        width: number;
        iconTemplate: (data: any) => {
            icon: any;
            tooltip: any;
        } | null | undefined;
    };
    function GetSzrImageNove(l_oSeznamRow: any): string | {
        img: string;
        tooltip: string;
    };
    function ColumnDatovaSchrankaZIco_ds(): {
        name: string;
        caption: string;
        customClass: string;
        width: number;
        iconTemplate: (data: any) => {
            icon: string | string[] | undefined;
            tooltip: string;
        } | null | undefined;
    };
    function GetIcoProDs(IsSkEdesk: any): string;
    function VyzkouesetZdaAdresaDatovkyJeSlovenska(adresa: any): boolean;
    function GetDsImageNove(icoDs: any, IsSkEdesk: any): {
        img: string;
        tooltip: string;
    } | {
        img: string[];
        tooltip: string;
    };
    function GetAktivitaImageNove(aktivita_esu: any): {
        img: string;
        tooltip: string;
    } | null | undefined;
    function sloupecBarvaTypuAdresdy(l_oSeznamRow: any): {
        font: boolean;
        fontcolor: string;
    };
    function ColumnIszrIkonka(gin_esu_inzobr: any, gin_iszr_zostv: any): {
        name: string;
        caption: string;
        customClass: string;
        width: number;
        iconTemplate: (data: any) => {
            icon: string;
            tooltip: string;
        } | null | undefined;
    };
    function szrSloupecOvereniNove(l_oSeznamRow: any, gin_esu_inzobr: any, gin_iszr_zostv: any): {
        ico: string;
        text: string;
    } | undefined;
    function upravRequiredNaFieldu(field: any, required: any): void;
    function trimObj(obj: any): void;
    function getIxp(): any;
    function setIxp(Ixp: any): void;
    function getDuvodHledani(): any;
    function setDuvodHledani(DuvodHledani: any): void;
    function getAktZnacka(): any;
    function setAktZnacka(AktZnacka: any): void;
    function getDuvodHledaniTxt(): any;
    function setDuvodHledaniTxt(DuvodHledaniTxt: any): void;
    function getLogovani(): {
        Ixp: any;
        DuvodHledani: any;
        AktZnacka: any;
        DuvodHledaniTxt: any;
    };
    function setLogovani(Ixp: any, DuvodHledani: any, AktZnacka: any, DuvodHledaniTxt: any): void;
    function vymazLogovani(): void;
    /**
     * vrátí lidský název db sloupce
     *
     * @author  Dsebesta
     * @date    26.07.2017
     *
     * @param   dbSloupec   nazev sloupce
     *
     * @return  .
     */
    function DejNazevDBSloupceTxt(dbSloupec: any): string;
    /**
     * Porovná a přidá ikonky
     *
     * @author  Dsebesta
     * @date    18.08.2017
     *
     * @param   field       field kam se umístí ikonka
     * @param   hodnota1    jeho hodnota
     * @param   hodnota2    hodnota se kterou se to porovnává
     *
     * @return  .
     */
    function PorovnejApridejIco(field: any, hodnota1: any, hodnota2: any): void;
    /**
     * vrátí stavovou ikonku
     *
     * @author  Dsebesta
     * @date    18.08.2017
     *
     * @param   stav    The stav.
     *
     * @return  The imgporovnani.
     */
    function GetImgporovnani(stav: any): {
        id: string;
        icon: string;
        customClass: string;
        tooltip: string;
    } | null;
    function cellTemplateZastupneOsoby(content: any, akcniTlacitko: any): (data: any) => JQuery<HTMLElement> | null;
    function getColorDleTypRegistr(typReg: number | undefined | null): any;
    function getKartotekaFilterForm(content: any | undefined | null, hromadneOvereni?: boolean): Forms.Form;
    function getJmennyRejstrikFilterForm(content: any): Forms.Form;
    function getKartotekaFilterForm2(content: any): Forms.Form;
    function jePovolenoZobrazeniKartotekyBezVazbyNaDokument(Ixp: any, dialogs: any): boolean;
    function jePovolenaZobrazeniKartotekyZMasek(Ixp: any, dialogs: any): boolean;
    function zalogujGdprExportDat(listZaznamu: any, duvodUcel: any, content: any): void;
    function zalogujGdpr(listZaznamu: any, zmena: any, duvodUcel: any, content?: any): void;
    function aktivitaNumberToText(aktivita: number | null | undefined): "" | "jres:31900717" | "jres:31900718" | "jres:31900719" | "jres:31900720" | "jres:31900721";
    function kartotekaGridFormat(gridKolonky: any, content: any, zastupneOsobyAkceniTlacitko: any): string;
    function condFormatsForKartotekaGridGetApplyColumns(columnList: any): any;
    function condFormatsForKartotekaGrid(columnsForApply: any): ({
        description: string;
        formula: string;
        bg: Components.Grid.CondFormats.CondFormatBg;
        applyTo: string;
    } | {
        description: string;
        formula: string;
        text: Components.Grid.CondFormats.CondFormatText;
        applyTo: any;
    })[];
    function jmennyRejstrikGridFormat(gridKolonky: any, content: any, zastupneOsobyAkceniTlacitko: any): void;
    function pridejNaDetailESUNeboDoKartotekyObsahZElPodani(content: any): void;
    function addFormObcanAISEO(Form: any): void;
    function getFormDalsiInformaceZAISEO(): Forms.Form;
    function getColumnsDotceneOsobyZAISEO(): Data.GridFormat<any>;
    function getColumnsAdresyZAISEO(): Data.GridFormat<any>;
}
declare namespace Gordic.Esu.Globals.Enums {
    /**
     * Typ zobrazeni detailu externího subjektu.
     */
    enum TypZobrazeni {
        /**
         * Požadavek na založení nového externího subjektu.
         */
        Novy = 0,
        /**
         * Požadavek na zobrazení externího subjektu.
         */
        Detail = 1,
        /**
         * Požadavek na editaci externího subjektu.
         */
        Editace = 2,
        /**
         * Požadavek na založení nové pobočky externího subjektu.
         */
        NovaPobocka = 3,
        /**
         * Požadavek na založení nového externího subjektu s kopií dat z původního.
         */
        NovaKopie = 4
    }
    /**
     * Typ zobrazeni detailu bankovního účtu.
     */
    enum TypZobrazeniBankovniUcty {
        /**
         * Požadavek na zobrazení bankovních účtů.
         */
        Detail = 0,
        /**
         * Požadavek na editaci bankovních účtů.
         */
        Editace = 1,
        /**
         * Převzetí a editace bankovních účtů.
         */
        Prevzit = 2
    }
    /**
     * Typ zobrazení detailu externího subjektu.
     */
    enum TypZobrazeniKaroteka {
        /**
         * Běžný režim - dvojklik otevírá detail a neprovádí výběr.
         */
        Normal = 0,
        /**
         * Režim výběru jednoho externího subjektu.
         */
        SelectEsu = 1,
        /**
         * Režim výběru jednoho externího subjektu nebo jedné zástupné osoby.
         */
        SelectEsuOrZo = 2,
        /**
         * Režim výběru více externích subjektů a více zástupných osob.
         */
        SelectMultiEsuAndZo = 3
    }
    /**
     * Typ zobrazení detailu externího subjektu.
     */
    enum VyberEsuTypItemTemplate {
        /**
         * dvojřádek
         */
        Normal = 0,
        /**
         * jednořádek
         */
        OneRow = 1
    }
    /**
     * Typ zobrazení pobočky.
     */
    enum TypZobrazeniPobocky {
        /**
         * Běžný režim - dvojklik otevírá detail a neprovádí výběr.
         */
        Normal = 0,
        /**
         * Režim výběru jednoho externího subjektu.
         */
        SelectEsu = 1,
        /**
         * Režim kdy jde otevřít pouze detail.
         */
        Detail = 2
    }
    /**
     * Pracovní režim pro okno skupiny subjektů.
     */
    enum EsuSkupinyWorkingMode {
        /**
         * Běžný režim - neprobíhá automatické označení subjektů.
         */
        Normal = 0,
        /**
         * Režim výběru subjektů - při výběru skupiny probíhá automatické označení všech subjektů ze skupiny.
         */
        Select = 1
    }
    /**
     * Pracovní režim pro okno skupiny subjektů.
     */
    enum ESUKartotekaFieldToFilter {
        ID = "ixs_esu",
        BuSK = "bu_ci",
        OsobniCislo = "oc",
        Dic = "dic",
        Ico = "ico",
        RodneCislo = "rc",
        ObchodniJmeno = "ob_jmeno",
        Nazev = "nazev",
        Zkratka = "zkratka",
        TypOrganizace = "typ_org",
        TypEsu = "typ_esuNmae",
        Oblibene = "oblibene",
        Aktivita = "aktivita",
        IDDS = "id_ds",
        Ulice = "ulice",
        Obec = "obec",
        PSC = "psc",
        Mail = "mail",
        StatniPris = "stat",
        DatumNarozeni = "dat_nar",
        ZOPrijmeni = "zast_prijmeni",
        ZOJmeno = "zast_jmeno",
        MatricniPeijmeni = "mi_prijmeni_lower",
        MatricníJmeno = "mi_jmeno_lower",
        UrPristupu = "ur_pri",
        StupVerifikace = "stupen_ver",
        TypAdresy = "TypAdr"
    }
}
declare namespace Gordic.Esu.PreActions {
    /**
     * Názvy preakcí Esu.
     *
     * @author TFeik
     * @since 482.1.0.25
     */
    enum Names {
        OveritEDeskSchranku = "actOveritEDeskSchranku",
        OveritEDeskSchranky = "actOveritEDeskSchranky",
        OtevriDetailInsolvencnihoRizeni = "actOtevriDetailInsolvencnihoRizeni",
        OtevriInsolvencni = "actOtevriInsolvencni",
        OtevriDetailExternihoSubjektu = "actOtevriDetailExternihoSubjektu",
        OtevriInfoNespPlatceDph = "actOtevriInfoNespPlatceDph"
    }
    /**
     * Ověří eDesk schránku.
     *
     * @author  TFeik
     * @date    11.04.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Utils.OverEDeskSchrankuInput} input
     * @returns {GActionParams}
     */
    function OveritEDeskSchranku(input: Gordic.Prefabs.Actions.BasePreActionsInput<Utils.OverEDeskSchrankuInput, Utils.OverEDeskSchrankuResult>): GActionParams;
    /**
     * Ověří eDesk schránky.
     *
     * @author  TFeik
     * @date    11.04.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Utils.OverEDeskSchrankuInput[]} input
     * @returns {GActionParams}
     */
    function OveritEDeskSchranky(input: Gordic.Prefabs.Actions.BasePreActionsInput<Utils.OverEDeskSchrankuInput[], Utils.OverEDeskSchrankuResult[]>): GActionParams;
    /**
     * Otevře detail insolvenčního řízení.
     *
     * @author  TFeik
     * @date    13.06.2019
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailInsolvenceDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriDetailInsolvencnihoRizeni(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDetailInsolvenceDlgInputParams>, WebClient.GDetailInsolvenceDlgReturnValue>): GActionParams;
    function OtevriInsolvencni(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GSeznamInsolvenceDlgInputParams>, WebClient.GSeznamInsolvenceDlgReturnValue>): GActionParams;
    /**
     * Otevře detail externího subjektu.
     *
     * @author  TFeik
     * @date    31.01.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailEsuDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriDetailExternihoSubjektu(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailEsuDlgInputParams>, Dialogs.GDetailEsuDlgReturnValue>): GActionParams;
    /**
     * Otevře seznam plátců DPH.
     *
     * @author  TFeik
     * @date    11.07.2025
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput< Gordic.Gui.Dialogs.OpenDialogParams<WebClient.InfoNespPlatceDphDlgInputParams>} input
     * @returns {GActionParams}
     */
    function OtevriInfoNespPlatceDph(input: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.InfoNespPlatceDphDlgInputParams>, WebClient.InfoNespPlatceDphDlgReturnValue>): GActionParams;
}
declare namespace Gordic.Esu.WebClient {
    class KartotekaEsuDlg extends GContentBase {
        private GEsuParamsDto;
        private jizProbehloHledani;
        private comparisonBadge;
        private comparisonCnt$;
        private previewDiv;
        private rowToPreview;
        private TabulkaSubjektu;
        private ViewTabulkaSubjektu;
        private filterPanel;
        private posledniHledaneKriteria;
        private FieldsToFilterpanel;
        private IdSimpleMode;
        private DataToFilterPanel;
        private StrictStopAutoLoad;
        private gin_odes_esj_po;
        private gin_esu_dnzobr;
        private gridKartoteka;
        private TypZobrazeni;
        private jizByloVyhledano;
        private Logovani;
        private Ucel;
        private isComparisonInited;
        private _closed;
        private IszrPreviousIxsTyp;
        private IszrPreviousIxpDen;
        private IszrPreviousTypPhl;
        private viewSchranka;
        private gridSchranka;
        private gin_esu_nabvla;
        private prizEko;
        private PokudNalezenJedenSubjektRovnouPrevzit;
        private onContentReady;
        private NactiData;
        private novyEx;
        private detailEx;
        private upravitEx;
        private zpracujZmenuVDetailuEsu;
        private obnovPodlePuvodnihoFiltru;
        private odstranitEx;
        private zadaniDuvoduOdstraneni;
        private pokusOdstraneniExSubjektu;
        private pridatNeboOdebratOblibene;
        private HledatVInsolvencnimRejstriku;
        private nactiZastupneOsoby;
        private upravZOhodnoty;
        private vazby;
        private showComparison;
        private addToComparison;
        private porovnavaciGridFormat;
        private otevriPobocky;
        private adresyPobocky;
        private _isDebounced;
        private createPreviewPanel;
        private refreshPreview;
        private loadPreview;
        private enablePreview;
        private showPreview;
        private audit;
        private closing;
        private SZRAgenda;
        private vytvoritSchrankovyGrid;
        private prevzit;
        private prevezmiNeboPridejDoSchranky;
        private pridatDoSchranky;
        private odebratZeSchranky;
        private nactiObsahZOknaElPodani;
        private upravitPodeRadkuVGridu;
        private otevriInfoNespPlatceDph;
        private otevritBankovniUcty;
        private enableActions;
    }
}
declare namespace Gordic.Esu.WebClient {
    class VyslNacteniSubjektuDlg extends GContentBase {
        private model;
        private dataChanged;
        private onContentReady;
        private registrAction;
        private getMenudBar;
        private getComandBar;
        private createForm;
        private setData;
        private setVysledek;
        private nacistADohledat;
        private nacistADohledat2;
        private nacistADohledat2_Run;
        private overit;
        private overitUlozit;
        private nacistAres;
        private nacistAres_Run;
        private getSoubor;
        private closing;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GEsuKontrolyGdprDlg extends GContentBase {
        private filterPanel;
        private posledniHledaneKriteria;
        private gridSeznam;
        private ViewTabulkaSubjektu;
        private GdprPlus;
        private onContentReady;
        private registrAction;
        private getMenu;
        private createMenu;
        private createFilterpanel;
        private createGrid;
        private nactiData;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GEsuSeznamNepouzitychDlg extends GContentBase {
        private filterPanel;
        private posledniHledaneKriteria;
        private gridSeznam;
        private ViewTabulkaSubjektu;
        private NavazaneNaSkartovane;
        private onContentReady;
        private getDuvod;
        private isDuvod;
        private getLogovani;
        private registrAction;
        private getMenu;
        private createMenu;
        private createFilterpanel;
        private createDuvod;
        private createGrid;
        private nactiData;
        private historie;
        private podrobnosti;
        private testOdstraneni;
        private odstranitStart;
        private odstranit;
        private vazby;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GEsuSeznamOdstranenychDlg extends GContentBase {
        private filterPanel;
        private posledniHledaneKriteria;
        private gridSeznam;
        private ViewTabulkaSubjektu;
        private isSeznamUdaju;
        private onContentReady;
        private getLogovani;
        private registrAction;
        private getMenu;
        private createMenu;
        private createFilterpanel;
        private createGrid;
        private nactiData;
        private podrobnosti;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GEsuSeznamOvereniIsdsDlg extends GContentBase {
        private filterPanel;
        private posledniHledaneKriteria;
        private gridSeznamVyplneni;
        private ViewTabulkaSubjektu;
        private onContentReady;
        private getDuvod;
        private isDuvod;
        private getLogovani;
        private registrAction;
        private getMenu;
        private createMenu;
        private createFilterpanel;
        private createDuvod;
        private createGrid;
        private nactiData;
        private historie;
        private podrobnosti;
        private overitStart;
        private overit;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GEsuSeznamPolozekOsUdajuDlg extends GContentBase {
        private filterPanel;
        private posledniHledaneKriteria;
        private gridSeznam;
        private ViewTabulkaSubjektu;
        private DebugMode;
        private onContentReady;
        private createFilterpanel;
        private createGrid;
        private nactiData;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GPrevodAisvDlg extends GContentBase {
        private Formik;
        private ViewTabulkaSubjektu;
        private GdprPlus;
        private onContentReady;
        private registrAction;
        private createCommandbar;
        private getMenu;
        private createMenu;
        private createForm;
        private setData;
        private obcerstviPocty;
        private migrujRos;
        private migrujRob;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GSzrAktSledovaniZmenIszrDlg extends GContentBase {
        private filterPanel;
        private posledniHledaneKriteria;
        private gridSeznam;
        private ViewTabulkaSubjektu;
        private GdprPlus;
        private onContentReady;
        private registrAction;
        private getMenu;
        private createMenu;
        private createFilterpanel;
        private createGrid;
        private nactiData;
        private obcerstvit;
        private povolit;
        private zakazat;
        private posunout;
        private posunout2;
    }
}
declare namespace Gordic.Esu.WebClient {
    class HromadneOvereniDlg extends GContentBase {
        private GEsuParamsDto;
        private jizProbehloHledani;
        private comparisonBadge;
        private comparisonCnt$;
        private previewDiv;
        private rowToPreview;
        private TabulkaSubjektu;
        private ViewTabulkaSubjektu;
        private filterPanel;
        private posledniHledaneKriteria;
        private FieldsToFilterpanel;
        private IdSimpleMode;
        private DataToFilterPanel;
        private StrictStopAutoLoad;
        private gin_odes_esj_po;
        private gin_esu_dnzobr;
        private gridKartoteka;
        private TypZobrazeni;
        private jizByloVyhledano;
        private Logovani;
        private Ucel;
        private isComparisonInited;
        private _closed;
        private IszrPreviousIxsTyp;
        private IszrPreviousIxpDen;
        private IszrPreviousTypPhl;
        private viewSchranka;
        private gridSchranka;
        private onContentReady;
        private NactiData;
        private novyEx;
        private detailEx;
        private upravitEx;
        private zpracujZmenuVDetailuEsu;
        private obnovPodlePuvodnihoFiltru;
        private odstranitEx;
        private zadaniDuvoduOdstraneni;
        private pokusOdstraneniExSubjektu;
        private pridatNeboOdebratOblibene;
        private HledatVInsolvencnimRejstriku;
        private nactiZastupneOsoby;
        private upravZOhodnoty;
        private vazby;
        private showComparison;
        private addToComparison;
        private porovnavaciGridFormat;
        private otevriPobocky;
        private adresyPobocky;
        private _isDebounced;
        private createPreviewPanel;
        private refreshPreview;
        private loadPreview;
        private enablePreview;
        private showPreview;
        private audit;
        private closing;
        private SZRAgenda;
        private vytvoritSchrankovyGrid;
        private prevzit;
        private prevezmiNeboPridejDoSchranky;
        private pridatDoSchranky;
        private odebratZeSchranky;
        private upravitPodeRadkuVGridu;
    }
}
declare namespace Gordic.Esu.WebClient {
    class NapojovaniEsuDlg extends GContentBase {
        private GEsuParamsDto;
        private jizProbehloHledani;
        private comparisonBadge;
        private comparisonCnt$;
        private previewDiv;
        private rowToPreview;
        private TabulkaSubjektu;
        private ViewTabulkaSubjektu;
        private filterPanel;
        private simpleSubtaskFilterPanel;
        private posledniHledaneKriteria;
        private FieldsToFilterpanel;
        private IdSimpleMode;
        private DataToFilterPanel;
        private StrictStopAutoLoad;
        private gin_odes_esj_po;
        private gin_esu_dnzobr;
        private gridKartoteka;
        private TypZobrazeni;
        private jizByloVyhledano;
        private Logovani;
        private Ucel;
        private isComparisonInited;
        private _closed;
        private IszrPreviousIxsTyp;
        private IszrPreviousIxpDen;
        private IszrPreviousTypPhl;
        private viewSchranka;
        private gridSchranka;
        private subtaskNapojovani;
        private ListGinsesuColumns;
        private menitTypAdresy;
        private gin_n23_jmr;
        private onContentReady;
        private showFilterpanel;
        private hideFilterpanel;
        private NactiData;
        private novyEx;
        private detailEx;
        private upravitEx;
        private zpracujZmenuVDetailuEsu;
        private obnovPodlePuvodnihoFiltru;
        private odstranitEx;
        private zadaniDuvoduOdstraneni;
        private pokusOdstraneniExSubjektu;
        private pridatNeboOdebratOblibene;
        private HledatVInsolvencnimRejstriku;
        private nactiZastupneOsoby;
        private upravZOhodnoty;
        private vazby;
        private showComparison;
        private addToComparison;
        private porovnavaciGridFormat;
        private otevriPobocky;
        private adresyPobocky;
        private _isDebounced;
        private createPreviewPanel;
        private refreshPreview;
        private loadPreview;
        private enablePreview;
        private showPreview;
        private audit;
        private closing;
        private SZRAgenda;
        private vytvoritSchrankovyGrid;
        private prevzit;
        private prevezmiNeboPridejDoSchranky;
        private pridatDoSchranky;
        private odebratZeSchranky;
        private createSubtasks;
        private registrNapojitDlgAction;
        private manageTasks;
        private enableTasks;
        private createSubtaskFilterpanel;
        private destroySubtaskFilterpanel;
        private clearGrid;
        private napojitStart;
        private napojit;
        private zmenitTypAdresyNaPobocku;
        private zpracujVysledekNapojeniRadku;
        private finalNapojit;
        private dotazyNapojit;
        private dotazyNapojitZastup;
        private getTextRozdilu;
        private rozdilnaVyplnenaPolozka;
        private kontrolaNapojeni;
        private odpojit;
        private pridatODebratDoPracovnihoSeznamu;
        private otevriHistorii;
        private updateDataVManGrid;
        private zkusObnoviVybranyRadek;
        private updateActions;
        private pridejShodne;
        private upravitPodeRadkuVGridu;
    }
}
declare namespace Gordic.Esu.WebClient {
    class PripravenostGdprDlg extends GContentBase {
        private filterPanel;
        private posledniHledaneKriteria;
        private gridSeznam;
        private ViewTabulkaSubjektu;
        private NavazaneNaSkartovane;
        private model;
        private onContentReady;
        private registrAction;
        private getMenu;
        private createForm;
        private setData;
    }
}
declare namespace Gordic.Esu.WebClient {
    class ESUSezHromadneOvereniDlg extends GContentBase {
        private GEsuParamsDto;
        private jizProbehloHledani;
        private comparisonBadge;
        private comparisonCnt$;
        private previewDiv;
        private rowToPreview;
        private TabulkaSubjektu;
        private ViewTabulkaSubjektu;
        private filterPanel;
        private posledniHledaneKriteria;
        private FieldsToFilterpanel;
        private IdSimpleMode;
        private DataToFilterPanel;
        private StrictStopAutoLoad;
        private gin_odes_esj_po;
        private gin_esu_dnzobr;
        private gridKartoteka;
        private TypZobrazeni;
        private jizByloVyhledano;
        private Logovani;
        private Ucel;
        private isComparisonInited;
        private _closed;
        private IszrPreviousIxsTyp;
        private IszrPreviousIxpDen;
        private IszrPreviousTypPhl;
        private gin_esu_nabvla;
        private prizEko;
        private PokudNalezenJedenSubjektRovnouPrevzit;
        private onContentReady;
        private NactiData;
        private novyEx;
        private detailEx;
        private upravitEx;
        private zpracujZmenuVDetailuEsu;
        private obnovPodlePuvodnihoFiltru;
        private odstranitEx;
        private zadaniDuvoduOdstraneni;
        private pokusOdstraneniExSubjektu;
        private pridatNeboOdebratOblibene;
        private HledatVInsolvencnimRejstriku;
        private nactiZastupneOsoby;
        private upravZOhodnoty;
        private vazby;
        private showComparison;
        private addToComparison;
        private porovnavaciGridFormat;
        private otevriPobocky;
        private adresyPobocky;
        private _isDebounced;
        private createPreviewPanel;
        private refreshPreview;
        private loadPreview;
        private enablePreview;
        private showPreview;
        private audit;
        private closing;
        private SZRAgenda;
        private prevzit;
        private prevezmiNeboPridejDoSchranky;
        private nactiObsahZOknaElPodani;
        private upravitPodeRadkuVGridu;
        private enableActions;
        private HoOverit;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GSzrHromOvereniDlg extends GContentBase {
        private promiseArray;
        private IxsFun;
        private ListAgend;
        private Agenda;
        private gin_iszr_funrol;
        private GgridISZRdotazy;
        private ViewTabulkaSZRDotazu;
        private esu_iszr_ruian;
        private gin_iszr_povole;
        private Logovani;
        private onContentReady;
        private loadData;
        private setujDataDoGridu;
        private obcerstvit;
        private updateActions;
        private odhlasit;
        private detailEsu;
        private cancel;
        private saveAndCloseDet;
        private closeDet;
    }
}
declare namespace Gordic.Esu.WebClient {
    interface InfoNespPlatceDphDlgInputParams {
        /**
         * Dič.
         */
        dic?: string;
        /**
         * Název.
         */
        nazev?: string;
        ixs_esu?: string | null;
    }
    interface InfoNespPlatceDphDlgReturnValue {
    }
    /**
     * Dialog nespolehlivého plátce
     *
     * @author TFeik
     * @since 52530.8
     */
    class InfoNespPlatceDphDlg extends GContentBase {
        private listDto;
        private dtoInfo;
        private ixs_esu?;
        private gridPlatceDPH;
        private viewGridPlatcu;
        private onContentReady;
        /**
         * Nnastaví data do formu a do gridu
         *
         * @author  Dsebesta
         * @date    25.07.2017
         *
         * @return  .
         */
        private nastavData;
        /**
         * edituje text ve status panelu
         *
         * @author  Dsebesta
         * @date    25.07.2017
         *
         * @return  .
         */
        private _pridejIkonku;
        /**
         * aktualizace dat za mfčr
         *
         * @author  Dsebesta
         * @date    25.07.2017
         *
         */
        private aktualizaceZMFCR;
        /**
         * otevře www stránky registru
         *
         * @author  Dsebesta
         * @date    25.07.2017
         *
         * @return  .
         */
        private jitnaWWW;
        private novyBankovniUcet;
        /**
         * zavře okno
         *
         * @author  Dsebesta
         * @date    25.07.2017
         *
         * @return  .
         */
        private closeDet;
    }
}
declare namespace Gordic.Esu.Utils {
    /**
     * Vrací instanci serverového contentu GEsuUtils. V případě, že není inicializován pak jej vytvoří.
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @return  Instance serverového kontentu GEsuUtils.
     */
    function GetServer(cnt: GContent): GContent;
    /**
     * vychytávka do gfield, jde zadat púřímo hodnotu kterou chcememe z gfieldu gevalue vratit .gfiled("getValuiIn","obec_kod")
     *
     * @author  Dsebesta
     * @date    18.08.2017
     *
     *
     * @return  The value in.
     */
    function pridaniVychatavekDoWidgetu(): void;
    /**
     * oveření datové schránky z Detailu Esu
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   obj.flagGex             zda jde o gex nebo ISDS
     * @param   obj.content             content dialogu (this)
     * @param   obj.Ucel                {Detail:true}  zpusobí jen nahled
     * @param   obj.PrevzitVOkne        false vrátí data, true data rovnou uloží do esu
     * @param   obj.esuDto              data ESU    GDetailEsuItemsDto
     *
     * @return  .
     */
    function OverISDSzDetailuEsu(obj: any): JQuery.Promise<any>;
    /**
     * oveření datové schránky z Detailu Esu
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   obj.flagGex             zda jde o gex nebo ISDS
     * @param   obj.content             content dialogu (this)
     * @param   obj.Ucel                {Detail:true}  zpusobí jen nahled
     * @param   obj.PrevzitVOkne        false vrátí data, true data rovnou uloží do esu
     * @param   obj.esuDto              data ESU    GDetailEsuItemsDto
     * @param   obj.mainDef             promise pro návrat dat
     * @param   obj.TypIsds             typ isds dle typu ORg
     * @return  promise
     */
    function ZadaniTypuSubjektuISDS(obj: any): JQuery.Promise<any>;
    /**
     * Esu vyzadovat zadani typu subjektu isds
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   TypIsds typ isds
     * @param   IdDs    isds
     *
     * @return  bool.
     */
    function Esu_VyzadovatZadaniTypuSubjektuIsds(TypIsds: any, IdDs?: string | null): boolean;
    /**
     * odevre dialog pro zadani typu esu
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   TypIsds The typ isds.
     * @param   nazev   The nazev subjektu esu.
     * @param   content The content.
     *
     * @return  .
     */
    function Esu_OtevriVyberTypuSubjektuISDS(TypIsds: any, nazev: any, content: any): JQuery<HTMLElement> | undefined;
    /**
     * vyhledání rozdílu v isds
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   TypIsdsSelected typ isds
     * @param   obj.flagGex             zda jde o gex nebo ISDS
     * @param   obj.content             content dialogu (this)
     * @param   obj.Ucel                {Detail:true}  zpusobí jen nahled
     * @param   obj.PrevzitVOkne        false vrátí data, true data rovnou uloží do esu
     * @param   obj.esuDto              data ESU    GDetailEsuItemsDto
     * @param   obj.mainDef             promise pro návrat dat
     * @param   obj.TypIsds             typ isds dle typu ORg
     *
     * @return  .
     */
    function HledatIsds(TypIsdsSelected: any, obj: any): JQuery.Promise<any>;
    /**
     * funkce po overeni v ISDS
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   overeniIsds             dto s navracenýmna datama
     * @param   obj.flagGex             zda jde o gex nebo ISDS
     * @param   obj.content             content dialogu (this)
     * @param   obj.Ucel                {Detail:true}  zpusobí jen nahled
     * @param   obj.PrevzitVOkne        false vrátí data, true data rovnou uloží do esu
     * @param   obj.esuDto              data ESU    GDetailEsuItemsDto
     * @param   obj.mainDef             promise pro návrat dat
     * @param   obj.TypIsds             typ isds dle typu ORg
     * @return  .
     */
    function OvereniIsdsOnSucceeded(overeniIsds: any, obj: any): void;
    /**
     * Extent registr rozdily
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   overeni data z overeni
     * @param   obj.flagGex             zda jde o gex nebo ISDS
     * @param   obj.content             content dialogu (this)
     * @param   obj.Ucel                {Detail:true}  zpusobí jen nahled
     * @param   obj.PrevzitVOkne        false vrátí data, true data rovnou uloží do esu
     * @param   obj.esuDto              data ESU    GDetailEsuItemsDto
     * @param   obj.mainDef             promise pro návrat dat
     * @param   obj.TypIsds             typ isds dle typu ORg
     *
     * @return  .
     */
    function ExtRegistrRozdily(overeni: any, obj: any): JQuery<HTMLElement> | undefined;
    function ExtRegistrSubjekty(overeni: any, obj: any): JQuery<HTMLElement> | undefined;
    /**
     * IGVysledekOvereniIsds
     *
     * @author TFeik
     * @since 482.1.0.28
     */
    interface IGVysledekOvereniIsds {
        stav?: "nalezeno" | "nenalezeno" | "prevzato" | "neprevzato";
        IxsEsuNove?: string;
        IdDs?: string;
        IdGex?: string;
    }
    /**
     * oveření datové schránky z Detailu Esu
     *
     * @author  Dsebesta
     * @date    03.08.2017
     *
     * @param   obj.flagGex             zda jde o gex nebo ISDS
     * @param   obj.content             content dialogu (this)
     * @param   obj.Ucel                {Detail:true}  zpusobí jen nahled
     * @param   obj.PrevzitVOkne        false vrátí data, true data rovnou uloží do esu
     * @param   obj.IxsEsu              IxsEsu
     * @param   obj.overovatJenExistenciSchranky "1" = jenom existenci
     * @return  .
     */
    function OverISDSzWFL(obj: {
        /** zda jde o gex nebo ISDS. 0 - DS, 1 - GEX */
        flagGex: "0" | "1";
        /** content dialogu (this) */
        content: GContent;
        /** {Detail:true}  zpusobí jen nahled */
        Ucel?: boolean;
        /** false vrátí data, true data rovnou uloží do esu */
        PrevzitVOkne: boolean;
        /** IxsEsu */
        IxsEsu: string;
        /** "1" = jenom existenci */
        overovatJenExistenciSchranky: "0" | "1";
    }): JQuery.Promise<IGVysledekOvereniIsds | undefined>;
    function OverARES(obj: any): JQuery.Promise<any>;
    function OverVERA(obj: any): JQuery.Promise<any>;
    function ExtRegistrSubjektyVera(overeni: any, obj: any): JQuery<HTMLElement> | undefined;
    function OtevriDialogSeZastupnymaOsobama(content: any, Ucel: any, ixs_esu: any, Logovani: any, por_zast: any, others: any): JQuery.Promise<any>;
    function NactiZastupneOsoby(ixs_esu: string, Logovani: any, jenAktivni: boolean, content: GContent): JQuery.Promise<any>;
    /**
     * OverEDeskSchrankuInput
     *
     * @author TFeik
     * @date 10.04.2019
     * @since 482.1.0.25
     */
    interface OverEDeskSchrankuInput {
        eDeskId: string;
        customIdentificator?: string | number;
    }
    /**
     * OverEDeskSchrankuResult
     *
     * @author TFeik
     * @since 482.1.0.25
     */
    interface OverEDeskSchrankuResult extends OverEDeskSchrankuInput {
        checkResult?: Psr.Interface.GVysledekOvereniEDeskSchrankyEnum;
    }
    /**
     * Ověří stav eDesk schráneky.
     *
     * @author TFeik
     * @date 11.04.2019
     *
     * @param {OverEDeskSchrankuInput} input Vstupní objekt obsahující identifikátor schránky.
     * @returns {JQuery.Promise<OverEDeskSchrankuResult | undefined>} Promise vstupního objektu rozšířeného o výsledek ověření schránky.
     */
    function OverEDeskSchranku(input: OverEDeskSchrankuInput, content: GContent): JQuery.Promise<OverEDeskSchrankuResult | undefined>;
    /**
     * Ověří stav eDesk schránek.
     *
     * @author TFeik
     * @date 11.04.2019
     *
     * @param {OverEDeskSchrankuInput[]} inputs Pole vstupních objektů obsahující identifikátory schránek.
     * @returns {JQuery.Promise<OverEDeskSchrankuResult[]>} Promise pole vstupních objekty rozšířených o výsledky ověření schránek.
     */
    function OverEDeskSchranky(inputs: OverEDeskSchrankuInput[], content: GContent): JQuery.Promise<OverEDeskSchrankuResult[]>;
    /**
     * Vytvoří itemTemplate dle enumu výsledku ověření eDesk schránky.
     *
     * @author TFeik
     * @date 11.04.2019
     * @since 482.1.0.27
     */
    function VysledekOvereniEDeskSchrankyEnumToIconTemplate(enumValue?: Psr.Interface.GVysledekOvereniEDeskSchrankyEnum): IconTemplate;
    function LoadModuleInfoToStatistiky(input: {
        AppendToDiv: any;
        NazevRef: string;
        NazevFun: string;
        ZastupTxt: string;
        DatLoginTxt: string;
        Image: string;
        PrimaryText: string;
    }): void;
}
declare namespace Gordic.Esu.WebClient {
    class GDsInfoHistorieDlg extends GContentBase {
        private IdDs;
        private mainGrid;
        private filterPanel;
        private viewTabulka;
        private onContentReady;
        private createfiterpanel;
        private createGrid;
        private loadData;
        private nacti;
    }
}
declare namespace Gordic.Esu.WebClient.Dashboard {
    class Actions {
        static openDetailEsu(): Gordic.Dashboard.IGDashboardAction;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * GPodaniOpravaPisemnostiDlg
     *
     * @returns
     */
    class DavkoveZalozeniEsuDlg extends GContentBase {
        private ulozeno;
        private zakladniFormular;
        private model;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private vytvorFormular;
        private createActions;
        private nactiSouborsDavkou;
        private zpracujVysledek;
        private closing;
    }
}
declare namespace Gordic.Esu.WebClient {
    class GSzrSeznamDokladuDlg extends GContentBase {
        private Aifo;
        private mainGrid;
        private filterPanel;
        private viewTabulka;
        private data;
        private onContentReady;
        private createfiterpanel;
        private createGrid;
        private loadData;
    }
}
declare namespace Gordic.Esu.WebClient {
    class JmennyRejstrikDlg extends GContentBase {
        private GEsuParamsDto;
        private jizProbehloHledani;
        private comparisonBadge;
        private comparisonCnt$;
        private previewDiv;
        private rowToPreview;
        private TabulkaSubjektu;
        private ViewTabulkaSubjektu;
        private filterPanel;
        private posledniHledaneKriteria;
        private FieldsToFilterpanel;
        private IdSimpleMode;
        private DataToFilterPanel;
        private StrictStopAutoLoad;
        private gin_odes_esj_po;
        private gin_esu_dnzobr;
        private gridKartoteka;
        private TypZobrazeni;
        private jizByloVyhledano;
        private Logovani;
        private Ucel;
        private isComparisonInited;
        private _closed;
        private IszrPreviousIxsTyp;
        private IszrPreviousIxpDen;
        private IszrPreviousTypPhl;
        private viewSchranka;
        private gridSchranka;
        private onContentReady;
        private NactiData;
        private novyEx;
        private detailEx;
        private upravitEx;
        private zpracujZmenuVDetailuEsu;
        private obnovPodlePuvodnihoFiltru;
        private odstranitEx;
        private zadaniDuvoduOdstraneni;
        private pokusOdstraneniExSubjektu;
        private pridatNeboOdebratOblibene;
        private nactiZastupneOsoby;
        private upravZOhodnoty;
        private showComparison;
        private addToComparison;
        private porovnavaciGridFormat;
        private otevriPobocky;
        private adresyPobocky;
        private _isDebounced;
        private createPreviewPanel;
        private refreshPreview;
        private loadPreview;
        private enablePreview;
        private showPreview;
        private closing;
        private upravitPodeRadkuVGridu;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * detail adresy AISEO
     *
     * @author dsebesta
     * @since 480.1.0.286
     */
    class DetAdresyAiseoDlg extends GContentBase {
        formular: JQuery<HTMLElement>;
        inputDto: DetAdresyAiseoDlgInputDto;
        Szrsade: any;
        /**
         * onContentReady
         *
         * @author  dsebesta
         * @date    17.07.2018
         */
        onContentReady(): void;
        vytvorFormulare(): void;
        nastavHodnotyDoOrigFormu(): void;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * detail adresy AISEO
     *
     * @author dsebesta
     * @since 480.1.0.286
     */
    class DetOsobyAiseoDlg extends GContentBase {
        formular: JQuery<HTMLElement>;
        divDalsiInformace: JQuery<HTMLElement>;
        inputDto: DetOsobyAiseoDlgInputDto;
        baseDto: any;
        posledniNactenaSzrAiseo: any;
        ViewDotceneosobyZAISEO: any;
        gridDotceneosobyZAISEO: any;
        ViewAdresyZAISEO: any;
        gridAdresyZAISEO: any;
        tabManager: any;
        /**
         * onContentReady
         *
         * @author  dsebesta
         * @date    17.07.2018
         */
        onContentReady(): void;
        vytvorFormulare(): void;
        inicializuj(): void;
        private setDalsiInformaceZAISEO;
        setFromularIszrData(data: any): void;
        private createDalsiInformaceZAISEO;
        private createDotceneosobyZAISEO;
        private setDotceneosobyZAISEO;
        private createGridAdresy;
        private setGridAdresy;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * Vstupná parametry detailu insolvence.
     *
     * @author  TFeik
     * @since   488.1.0.83
     */
    interface GDetailInsolvenceDlgInputParams {
        /**
         * Spisová značka insolvenčního řízení.
         */
        SpisovaZnacka: string;
    }
    /**
     * Výstupní parametry detailu insolvence.
     *
     * @author  TFeik
     * @since   488.1.0.83
     */
    interface GDetailInsolvenceDlgReturnValue {
    }
    /**
     * Detail Insolvence.
     *
     * @author  TFeik
     * @since   488.1.0.81
     */
    class GDetailInsolvenceDlg extends GContentBase {
        readonly DetailIR: GSeznamInsolvenceDataDto;
        readonly DetailIROddilA: GDetailInsolvencnihoRizeniDto[];
        readonly DetailIROddilB: GDetailInsolvencnihoRizeniDto[];
        readonly DetailIROddilC: GDetailInsolvencnihoRizeniDto[];
        readonly DetailIROddilD: GDetailInsolvencnihoRizeniDto[];
        readonly DetailIROddilP: GDetailInsolvencnihoRizeniDto[];
        readonly SouvisejiciRizeni?: string;
        readonly JusticeCzSearchURL?: string;
        /**
         * Dočasná rozparsovaná data souvisejícího řízení.
         * @type {ActionTextsSouvisejiciIR | null}
         */
        private _SouvisejiciRizeniTemp?;
        /**
         * onContentReady.
         *
         * @author  TFeik
         * @date    20.03.2017
         */
        onContentReady(): void;
        /**
         * Vrátí rozparsovaná data souvisejícího řízení.
         *
         * @author  TFeik
         * @date    03.04.2023
         * @since   488.1.0.83
         */
        private GetSouvisejiciRizeni;
        /**
         * Převede typ vazby souvisejícího řízení na uživatelský text.
         *
         * @author  TFeik
         * @date    03.04.2023
         *
         * @param {SouvisejiciLinkType | undefined | null} input
         * @returns {string}
         */
        private static SouvisejiciLinkTypeToText;
        /**
         * Vytvoří formulář.
         *
         * @author  TFeik
         * @date    28.03.2023
         */
        private createForm;
        /**
         * Vytvoří gridy zobrazujici jednotlive dokumenty IR.
         *
         * @author  TFeik
         * @date    28.03.2023
         */
        private createGrid;
        /**
         * Vytvoří akce (pro menu).
         *
         * @author  TFeik
         * @date    15.09.2017
         */
        private createActions;
        /**
         * Vytvoří menu.
         *
         * @author  TFeik
         * @date    15.09.2017
         */
        private createMenu;
        /**
         * closing
         *
         * @author  TFeik
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GDetailInsolvenceDlgReturnValue>}
         */
        closing(): JQueryPromise<GDetailInsolvenceDlgReturnValue>;
    }
}
declare namespace Gordic.Esu.WebClient {
    interface GSeznamInsolvenceDlgInputParams {
        /**
         * Výchozí filtr na seznamu.
         */
        filter?: Gordic.Esu.WebClient.GSeznamInsolvenceFilterDto;
    }
    interface GSeznamInsolvenceDlgReturnValue {
    }
    class GSeznamInsolvenceDlg extends GContentBase {
        private Filter;
        private LastCaledFilter?;
        private Grid?;
        private GridView?;
        private FirstDataLoad;
        onContentReady(): void;
        private _reloadGridData;
        private _isFilterEmpty;
        /**
         * Zkontroluje zda se oproti předchozímu hledání změnila hodnota filtru, která vyžaduje načtení nových dat ze serveru.
         *
         * @param {GSeznamInsolvenceFilterDto} actualFilter Filtr použitý pro aktuální hledání.
         * @param {GSeznamInsolvenceFilterDto} previousFilter Filtr použitý pro předchozí hledání.
         * @returns TRUE - Je nutné načíst data ze serveru. FALSE - Není potřeba načíst data ze serveru.
         */
        private _isServerFilterChanged;
        /**
         * Vrátí textový řetězec filtru pro grid dle parametrů, které nejsou filtrovány na serveru.
         *
         * @param {GSeznamInsolvenceFilterDto} filter Filtr použitý pro hledání.
         * @returns Např. "aktivita == 100"
         */
        private _createClientFilterExpression;
        /**
         * Před pole pro první část spisové značky přidá "INS" a před druhou část "/".
         */
        private _adjustFileNumber;
        /**
         * Vytvoří menu.
         *
         * @author  tfeik
         * @date    15.09.2017
         */
        private createMenu;
        /**
         * closing
         *
         * @author  TFeik
         * @date    13.06.2019
         *
         * @returns {JQueryPromise<GSeznamInsolvenceDlgReturnValue>}
         */
        closing(): JQueryPromise<GSeznamInsolvenceDlgReturnValue>;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * GDetailZasilkyDlg
     *
     * @author dsebesta
     * @since 480.1.0.286
     */
    class GVyberZPsrDlg extends GContentBase {
        readonly EditMode?: boolean;
        vysledekHledani: JQuery<HTMLElement>;
        formular: JQuery<HTMLElement>;
        esuDto: GDetailEsuItemsDto;
        viewTabulkaNalezenych: Gordic.Data.View<any>;
        vybranaOsoba: boolean;
        TypEsu: number | null | undefined;
        TypOrganizace: number | null | undefined;
        /**
         * onContentReady
         *
         * @author  dsebesta
         * @date    17.07.2018
         */
        onContentReady(): void;
        vytvorFormulare(): void;
        vytvorGrid(): void;
        overit(): void;
        vyhledejNaUpvsPodleKriterii(): void;
        aktualizujDataEsuZpolicek(): JQueryPromise<boolean>;
        nastavHodnotyDoOrigFormu(): void;
        naplnGrid(data: any): void;
        setPrvniPoNahraniNovychDat(): void;
        nastavHodnotyDoPolicka(hodnota: any, nazev: any, stav: any): void;
        pridejStavyDoEsuRadku(hodnota: any, nazev: any, stav: any): void;
        setISZRHodnoty(row: Gordic.Esu.Interface.GDohledaneSkSubjektyDto): void;
        getImgStavSpravny(stav: any): any;
        vybranyNovyRadek(): void;
        odstranISZRIkonky(): void;
        odstranPorovnavaciIkonky(): void;
        saveAndCloseDet(): void;
        closeDet(): void;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * Seznam možných adres
     */
    class RozdelovnikEsuDlg extends GContentBase {
        private previewDiv;
        private rowToPreview;
        private comparisonBadge;
        private comparisonCnt$;
        private grid;
        private gin_ssl_datschr;
        private gin_esu_roznaci;
        private provestZaskrtnuti;
        private leftSbCnt$;
        private ListDto;
        private ViewTabulkaEsu;
        private SkupinyWorkingMode;
        private leftSb$;
        private gridSkupiny;
        private viewTabulkaSkupiny;
        private pravoSkupinyEsuEditovatVlastnikaANacitatVsechnySkupiny;
        private ixsRzd;
        private isComparisonInited;
        private readonly Logovani;
        private returnValueFromDet;
        private onContentReady;
        private naplnGrid;
        private vytvoritStromoGrid;
        private naplnSkupinyGrid;
        private setFocusOnReferent;
        private updateActions;
        private UpdateActionNovaSkupina;
        private UpdateActionOdstranitSkupinu;
        private UpdateActionDetailSkupiny;
        private UpdateActionNactiVse;
        private UpdateActionNovy;
        private UpdateActionOdstranit;
        private UpdateActZmenitTyp;
        private UpdateActionDetail;
        private UpdateActionactPrevzit;
        private UpdateActionPridatZeSouboru;
        private showComparison;
        private addToComparison;
        private _isDebounced;
        private createPreviewPanel;
        private loadPreview;
        private enablePreview;
        private showPreview;
        private nacistEsuVeSkupine;
        private detailSkupiny;
        private novaSkupina;
        private odstranitSkupinu;
        private interniOdstranit;
        private obcerstivt;
        private zmenitTyp;
        private zkontrolujIxsRzdSkupiny;
        private zmenaTypuSrtv;
        private noveESU;
        private noveESUSrv;
        private detailESU;
        private odstranitESU;
        private odstranitESUSrv;
        private nactiVse;
        private prevzit;
        private pridatZeSouboru;
        private closing;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * GPodaniOpravaPisemnostiDlg
     *
     * @returns
     */
    class EsuNastaveniDlg extends GContentBase {
        private zakladniFormular;
        private model;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private vytvorFormular;
        private createActions;
    }
}
declare namespace Gordic.Esu.WebClient {
    /**
     * GPodaniOpravaPisemnostiDlg
     *
     * @returns
     */
    class NacteniRuianDlg extends GContentBase {
        private ulozeno;
        private zakladniFormular;
        private model;
        private LicAdr;
        private DebugMode;
        private TypFormatuARR;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         * @date    01.09.2017
         */
        onContentReady(): void;
        private vytvorFormular;
        private enableVisible;
        private createActions;
        private nactiXML;
        private updatePocet;
        private nacistSouborZmenRUIAN;
        private nactiUrl;
        private nactiXML2;
        private closing;
    }
}
declare namespace Gordic.Esu.AppSettings {
    function ESUObecneSettingsForm(): Forms.Form;
}
