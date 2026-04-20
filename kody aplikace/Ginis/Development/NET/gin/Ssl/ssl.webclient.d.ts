declare namespace Gordic.Ssl {
    class CustomListUtils {
        /**
        * OtevriDokumentyASpisyZDashboardu
        *
        * @author  Dsebesta
        * @date    26.10.2022
        *
        * @param {Gui.Dialogs.OpenDialogParams<{ contentId: string, contentTitle: string} input
        * @returns {input.parentContent}
        */
        static OtevriDokumentyASpisyZDashboarduSSD(input: OtevriDokumentySpisyZDashboarduInput<Interface.GSslspidFilterDto>): JQuery.Promise<CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        /**
        * CreateDocumentsCustomSettingsSSD
        *
        * @author  Dsebesta
        * @date    20.10.2021
        *
        * @param {{ contentId: string, contentTitle: string} input
        * @returns {Gordic.CustomView.SettingsContent<Interface.GDokumentDto}
        */
        private static CreateDocumentsCustomSettingsSSD;
        static getAvailableBaseFiltersDocument(): Ssl.WebClient.GSslspidFieldNames[];
        static geAvailableFilters(): Ssl.WebClient.GSslspidFieldNames[];
        static getAvailableBaseFiltersSpis(): Ssl.WebClient.GSpisFieldNames[];
        static getAvailableFiltersSpis(): Ssl.WebClient.GSpisFieldNames[];
        static getFavoriteFilters(): Ssl.WebClient.GSslspidFieldNames[];
        static getFavoriteFiltersSpisy(): Ssl.WebClient.GSpisFieldNames[];
        static getAvailableColumnsDokumenty(): Ssl.WebClient.GSslspidColumnNames[];
        static getAvailableColumnsSpisy(): Ssl.WebClient.GSslspidColumnNames[];
        static getAvailableColumnsDokumentyASpisy(): Ssl.WebClient.GSslspidColumnNames[];
        static getAvailableColumnsDokumentyASpisyKPrevzetiKPredani(): Ssl.WebClient.GSslspidColumnNames[];
        static ginsfunPermitidasColumnas(ginsfunScope: any): Ssl.WebClient.GSslspidColumnNames[];
        static redistribucniGridColumns(): Ssl.WebClient.GDokumentColumnNames[];
        static getMenuParamsForSSD(): MenuParams[];
        static getColumnListArrayForSSD(): WebClient.GDokumentColumnNames[];
        static getAvailableFiltersRedistribuce(): Ssl.WebClient.GSslspidFieldNames[];
        static getFavoriteFiltersRedistribucePrehledKPrevzeti(): Ssl.WebClient.GSslspidFieldNames[];
        static getFavoriteFiltersRedistribucePrehledKPredani(): Ssl.WebClient.GSslspidFieldNames[];
        static getFavoriteFiltersRedistribuceKPrevzeti(): Ssl.WebClient.GSslspidFieldNames[];
        static getFavoriteFiltersRedistribuceKPredani(): Ssl.WebClient.GSslspidFieldNames[];
        static gridMultiMenu(): MenuParams[];
        static GetZvyrazneniNeprectenychUS(): boolean;
        static GetPrecteneRowClass(dataRow: any, zvyrazneniNeprectenychUS: boolean): string;
        static listResponseRedistribuceKPrevzeti(response: Isl.GServiceListResponse<Ssl.Interface.GSslspidDto>): Isl.GServiceListResponse<Ssl.Interface.GSslspidDto>;
    }
}
declare namespace Gordic.Ssl.Dialogs {
    interface GDetailDokumentuSpisuParams extends Wfl.Dialogs.GDetailDokumentuSpisuParams {
    }
    /**
     * Detail.
     *
     * @param {GContent} parentContent
     * @param {{
            DetailDto?} opt?
     * @param {boolean} EditMode?
     * @param {any} RezimPodani?
     * @param {any} InicDok?
     * @param {any
        }} grid?
     * @param {Gordic.Global.Enums.ModOtevreni} ModOtevreni?
     */
    function Detail(parentContent: GContent, opt: GDetailDokumentuSpisuParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<JQuery<HTMLElement> | undefined | null> | undefined;
    /**
     * Dialog vyberu typu dokumentu.
     *
     * @author  RTomes
     * @date    28.5.2019
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function ZmenaTypuDokumentuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
    * Dialog vyberu typu dokumentu.
    *
    * @author  RTomes
    * @date    28.5.2019
    *
    * @param {gcontent}                               parentContent                        The content.
    * @param {object}                                 opt                            parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
    
    */
    function GZmenaTypuDokumentuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu umisteni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function ZmenaVeciDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog vyberu umisteni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GZmenaVeciDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog zmeny poznamky.
     *
     * @author  RTomes
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                  The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function ZmenaPoznamkyDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog zmeny poznamky.
     *
     * @author  RTomes
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                  The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GZmenaPoznamkyDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog zmeny uzivatelske poznamky.
     *
     * @author  RTomes
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                  The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GZmenaUzivatelskePoznamkyDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog zmeny doplnku znacky.
     *
     * @author  RTomes
     * @date    27.05.2019
     *
     * @param {gcontent}                               parentContent                  The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function ZmenaDoplnkuZnackyDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
    * Dialog zmeny doplnku znacky.
    *
    * @author  RTomes
    * @date    27.05.2019
    *
    * @param {gcontent}                               parentContent                  The content.
    * @param {object}                                 opt                            parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GZmenaDoplnkuZnackyDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog ZmenaTerminuDokumentuDlg
     *
     * @author  RTomes
     * @date    29.06.2018
     *
     * @param {gcontent}                               parentContent                  The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function ZmenaTerminuDokumentuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
    * Dialog ZmenaTerminuDokumentuDlg
    *
    * @author  RTomes
    * @date    29.06.2018
    *
    * @param {gcontent}                               parentContent                  The content.
    * @param {object}                                 opt                            parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GZmenaTerminuDokumentuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
 * Dialog zmeny poctu.
 *
 * @author  RTomes
 * @date    6.11.2017
 *
 * @param {gcontent}                               parentContent                  The content.
 * @param {object}                                 opt                            parametry
 * @param {string}                                 opt.typZmenyPoctu              parametr typZmenyPoctu - 0 listu/1 priloh
 * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
 * @return  .
 */
    function ZmenaPoctuListuDlg(parentContent: GContent, opt?: {
        typZmenyPoctu: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
    * Dialog zmeny poctu.
    *
    * @author  RTomes
    * @date    6.11.2017
    *
    * @param {gcontent}                               parentContent                  The content.
    * @param {object}                                 opt                            parametry
    * @param {string}                                 opt.typZmenyPoctu              parametr typZmenyPoctu - 0 listu/1 priloh
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function GZmenaPoctuListuDlg(parentContent: GContent, opt?: {
        typZmenyPoctu: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu pristupu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GZmenaPristupuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu umisteni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function ZmenaUmisteniDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog vyberu umisteni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GZmenaUmisteniDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu umisteni.
     *
     * @author  RTomes
     * @date    27.09.2023
     *
     * @param {gcontent}                             parentContent                  The content.
     * @param {object}                               opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}		 ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GZmenaZpusobuDoruceniDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu umisteni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function ZmenaSpisovehoZnakuDlg(parentContent: GContent, opt?: {
        IxsVskProPredplneni?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog vyberu umisteni.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                        The content.
     * @param {object}                                 opt                            parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GZmenaSpisovehoZnakuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog zmeny terminu ci jine datumove polozky.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.winTitle                    parametry
     * @param {string}                                 opt.dateLabel                   parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function ZmenaTerminuDlg(parentContent: GContent, opt?: {
        LabelText?: string;
        winTitle?: string;
        Using?: Gordic.Ssl.Dialogs.ZmenaTerminuDlgUsing;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    enum ZmenaTerminuDlgUsing {
        OSTATNI = 0,
        VYRIZENI_AD_ACTA = 1
    }
    /**
     * Dialog zmeny terminu ci jine datumove polozky.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.winTitle                    parametry
     * @param {string}                                 opt.dateLabel                   parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function GZmenaTerminuDlg(parentContent: GContent, opt?: {
        LabelText?: string;
        winTitle?: string;
        Using?: Gordic.Ssl.Dialogs.ZmenaTerminuDlgUsing;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu zpracovatele.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function ZmenaZpracovateleDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog vyberu zpracovatele.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function GZmenaZpracovateleDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog vyberu schvalovatele.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                          parentContent                   The content.
     * @param {object}                            opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function GZmenaSchvalovateleDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog zmeny terminu spisu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function ZmenaTerminuSpisuDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog zadani dilciho terminu dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function AddDilciTerminDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog zmeny terminu ci jine datumove polozky.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.winTitle                    parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function AddDuvodDlg(parentContent: GContent, opt?: {
        winTitle?: string;
        fieldLabel?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog pravni moci.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {string}                                 opt.Dokument                    Dokument
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function NabytPravniMocDlg(parentContent: GContent, opt: {
        Ixp: string;
        Dokument?: string;
        IxpsArry?: string[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog preruseni vyrizovani dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {string}                                 opt.Dokument                    Dokument
     * @param {bool}                                   opt.FlagHromadne                FlagHromadne
     * @param {string}                                 opt.winTitle                    winTitle
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function PrerusitDokumentDlg(parentContent: GContent, opt: {
        Ixp: string;
        Dokument?: string;
        FlagHromadne?: boolean;
        winTitle?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog preruseni vyrizovani dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {string}                                 opt.Dokument                    Dokument
     * @param {bool}                                   opt.FlagHromadne                FlagHromadne
     * @param {string}                                 opt.winTitle                    winTitle
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function GPrerusitDokumentDlg(parentContent: GContent, opt: {
        Ixp: string;
        Dokument?: string;
        FlagHromadne?: boolean;
        winTitle?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog na schvaleni dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function SchvaleniDlg(parentContent: GContent, opt: {
        Ixp?: string;
        Ixps?: Gordic.Wfl.Interface.GWflIxpDatZmena[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog zmeny ulozeni spisu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {string}                                 opt.winTitle                    titulek okna
     *
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function DetailUlozitSpisDlg(parentContent: GContent, opt: {
        Ixp: string;
        winTitle?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na vyrizeni dok ve spisu ve stare metodice (MVCR).
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function VyrizeniDokVeSpisuDlg(parentContent: GContent, opt: {
        Ixp: string;
        IXPs: Gordic.Wfl.Interface.SelectedRowInfoDto[];
        ViceIxp: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * dialog podrobnosti spisu
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function PodrobnostiDockumentuDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog podrobností dokumentu
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function PodrobnostiSpisuDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
 * Dialog podrobností dokumentu
 *
 * @author  Dsebesta
 * @date    6.11.2017
 *
 * @param {gcontent}                            parentContent                   The content.
 * @param {object}                              opt                             parametry
 * @param {string}                              opt.IxpSpis                     IxpSpis
 * @param {Gordic.Global.Enums.ModOtevreni}		ModOtevreni                     mod otevreni dialogu.
 * @return  .
 */
    function PrilohyObsahSpisuDlg(parentContent: GContent, opt: {
        IxpSpis: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Dialog seznamu zmen dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function ZmenyDulezitychPolozekDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    function EditKatastrDlg(parentContent: GContent, opt: {
        Ixp: string;
        Row: Interface.GSeznamKatastruDto;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog seznamu posledne navstivenych dokumentu.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function HistorieNavstivenychDokumentuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na trasy.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {bool}                                   opt.SelectRowEnabled            Zda je umoznen vyber radku trasy ze seznamu, napr. pro naplneni kroku k predani
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function TrasyDokumentuDlg(parentContent: GContent, opt: {
        Ixp: string;
        SelectRowEnabled?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na upresneni podoby nove trasy.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function NovaTrasaDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na upresneni podoby noveho kroku trasy.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         Ixp
     * @param {int}                                    opt.PorCislo                    PorCislo
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function NovyKrokDlg(parentContent: GContent, opt: {
        Ixp: string;
        PorCislo?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na upresneni podoby nove kopie.
     *
     * @author  RTomes
     * @date    2.2.2018
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         ixp dokumentu
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function KopieDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na upresneni podoby nove kopie.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.IxpMaterske                 ixp materskeho dokumentu
     * @param {string}                                 opt.IxpNove                     ixp noveho dokumentu, nove kopie<
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function NovaKopieRequesterDlg(parentContent: GContent, opt?: {
        IxpMaterske?: string;
        IxpNove?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * KopieHromadneDlg.
     *
     * @author  RTomes
     * @date    4.2.2018
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         ixp dokumentu
     * @param {string}                                 opt.GenerovatIxp                zda generovat ixp
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function KopieHromadneDlg(parentContent: GContent, opt?: {
        Ixp?: string;
        /**
         * Default false.
         */
        GenerovatIxp?: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na tvobu duplikatu.
     *
     * @author  RTomes
     * @date    8.2.2018
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Ixp                         ixp dokumentu
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function DuplikatNovyDlg(parentContent: GContent, opt: {
        Ixp: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na zadani deniku.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function VyberDenikuDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na zadani deniku pro spis.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function VyberDenikuSpzDlg(parentContent: GContent, opt?: {
        RezimNakl?: number;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na zadani ixp a deniku.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function ZadaniIxpSpZnDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * Dialog na zadani ixp a deniku.
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {string}                                 opt.Sslden                      Sslden
     * @param {string}                                 opt.BezInicPis                   BezInicPis
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function VytvSpisBezInicPisDlg(parentContent: GContent, opt: {
        Sslden?: string;
        BezInicPis?: boolean;
        DoSoucasti?: boolean;
        NezakladatMistoTohoVratitHodnoty?: boolean;
        Ixp?: string;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<any>;
    /**
     * Dialog na preevidenci CJ do samostane evidence.
     *
     * @author  RTomes
     * @date    18.09.2024
     *
     * @param {gcontent}                          parentContent                   The content.
     * @param {object}                            opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function PreevidenceDoSamostatneEvidenceDlg(parentContent: GContent, opt: {
        Ixp: string;
        OznaceniPreevidovaneho: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
     * VyrizeniDlg.
     *
     * @author  Thazmuka
     * @date    09.11.2017
     *
     * @param   parentContent                        The content.
     * @param   ModOtevreni                    mod otevreni dialogu.
     * @return  .
     */
    function GVyrizeniDlg(parentContent: GContent, opt: {
        IXPs: Gordic.Wfl.Interface.SelectedRowInfoDto[];
        Ixp: string;
        ViceIxp: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<Gordic.Wfl.Interface.GVyrizeniDokSpisRetvalDto>;
    /**
    * Dialog opravy formy dokumentu, spisu.
    *
    * @author  Thazmuka
    * @date    27.04.2018
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OpravaFormyDokSpisDlg(parentContent: GContent, opt: {
        Ixp: string | string[];
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<undefined>;
    /**
    * Dialog opravy metadat nevalidních položek dokumentu spisu detailu
    *
    * @author  Thazmuka
    * @date    18.03.2020
    *
    * @param   parentContent                        The content.
    * @param   ModOtevreni                    mod otevreni dialogu.
    * @return  .
    */
    function OpravaMetadatNevalidPolozekDokSpisDetailDlg(parentContent: GContent, opt: {
        DetailDto: Ssl.Interface.OpravaMetadatNevalidPolozekDokSpisDetailDto;
        IxpSpis: string;
        PrizSpis: number;
        NevalidniPolicka: Gordic.Ssl.Interface.ControlNevalidityFields;
        PouzeZapisDoHistorie: boolean;
    }, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQueryPromise<boolean>;
    /**
     * Dialog na zadani profilu nového dok.
     *
     * @author  Dsebesta
     * @date    6.11.2017
     *
     * @param {gcontent}                               parentContent                   The content.
     * @param {object}                                 opt                             parametry
     * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
     * @return  .
     */
    function ZadaniProfiluNovehoDokDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery | undefined;
    /**
    * Dialog na zadani profilu nového dok.
    *
    * @author  Dsebesta
    * @date    6.11.2017
    *
    * @param {gcontent}                               parentContent                   The content.
    * @param {object}                                 opt                             parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
    * @return  .
    */
    function GZadaniProfiluNovehoDokDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface GDokumentyDlgInput extends Omit<WebClient.CreateSourceDokumentInput, 'customContentReadyArgs'> {
        customSettings: Gordic.CustomView.SettingsContent<Interface.GDokumentDto, Interface.GDokumentFilterDto>;
    }
    /**
     * Otevře dialog (seznamu) dokumentů.
     *
     * @author  TFeik
     * @date    07.08.2020
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<GDokumentyDlgInput>} input
     */
    function GDokumentyDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<GDokumentyDlgInput>): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    function GDokumentyCustomSeznamDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<undefined>): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    function GDokumentyASpisyCustomSSDDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<undefined>): JQuery.Promise<CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    function GDokumentyCustomSeznamPracovniStulDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<undefined>): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    function GDokumentyCustomSeznamPoznamkovyBlokDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<undefined>): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface GSpisyDlgInput extends Omit<WebClient.CreateSourceSpisInput, 'customContentReadyArgs'> {
        customSettings: Gordic.CustomView.SettingsContent<Interface.GSpisDto, Interface.GSpisFilterDto>;
    }
    /**
     * Otevře dialog (seznamu) spisů.
     *
     * @author  TFeik
     * @date    20.10.2021
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<GSpisyDlgInput>} input
     * @returns {JQuery.Promise<undefined>}
     */
    function GSpisyDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<GSpisyDlgInput>): JQuery.Promise<CustomView.GContentRetVal<Interface.GSpisDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface GDokumentyASpisyDlgInput extends Omit<WebClient.CreateSourceSslspidInput, 'customContentReadyArgs'> {
        customSettings: Gordic.CustomView.SettingsContent<Interface.GSslspidDto, Interface.GSslspidFilterDto>;
    }
    /**
     * Otevře dialog (seznamu) dokumentů a spisů.
     *
     * @author  TFeik
     * @date    26.11.2021
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<GDokumentyASpisyDlgInput>} input
     * @returns {JQuery.Promise<undefined>}
     */
    function GDokumentyASpisyDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<GDokumentyASpisyDlgInput>): JQuery.Promise<CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * Poznamkový blok
    *
    * @author  Dsebesta
    * @date    6.11.2017
    *
    * @param {gcontent}                               parentContent                   The content.
    * @param {object}                                 opt                             parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
    * @return  .
    */
    function PoznamkovyBlok(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * GSslHromadnyImportDlg
    *
    * @author  Dsebesta
    * @date    6.11.2017
    *
    * @param {gcontent}                               parentContent                   The content.
    * @param {object}                                 opt                             parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
    * @return  .
    */
    function GSslHromadnyImportDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
    * GVyberEsuSkupinyDlg
    *
    * @author  Dsebesta
    * @date    6.11.2017
    *
    * @param {gcontent}                               parentContent                   The content.
    * @param {object}                                 opt                             parametry
    * @param {Gordic.Global.Enums.ModOtevreni}   ModOtevreni                     mod otevreni dialogu.
    * @return  .
    */
    function GVyberEsuSkupinyDlg(parentContent: GContent, opt?: null, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<any, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Nabídka Correlation ID
     *
     * @author  dSebesta
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
     */
    function GSslEklepPripominkaDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GSslEklepPripominkaDlgInputDto>): JQuery.Promise<WebClient.GSslEklepPripominkaDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog (seznamu) připomínkových řízení v eKLEP.
     *
     * @author  TFeik
     * @date    01.10.2024
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GEklepPripominkovaRizeniSeznamDlgInputDto>} input
     */
    function GEklepPripominkovaRizeniSeznamDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GEklepPripominkovaRizeniSeznamDlgInputDto>): JQuery.Promise<WebClient.GEklepPripominkovaRizeniSeznamDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog (seznamu) připomínek připomínkových řízení v eKLEP.
     *
     * @author  TFeik
     * @date    04.10.2024
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GEklepPripominkyPripominkovehoRizeniSeznamDlgInputDto>} input
     */
    function GEklepPripominkyPripominkovehoRizeniSeznamDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GEklepPripominkyPripominkovehoRizeniSeznamDlgInputDto>): JQuery.Promise<WebClient.GEklepPripominkyPripominkovehoRizeniSeznamDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    interface GSslEklepOdeslanaPripominkaDlgInput {
        InputDto: WebClient.GSslEklepOdeslanaPripominkaInputDlg;
    }
    /**
     * Otevře dialog (detailu) připomínky připomínkového řízení v eKLEP.
     *
     * @author  TFeik
     * @date    08.10.2024
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<GSslEklepOdeslanaPripominkaDlgInput>} input
     */
    function GSslEklepOdeslanaPripominkaDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<GSslEklepOdeslanaPripominkaDlgInput>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog přetřídění věcné skupiny.
     *
     * @author  TFeik
     * @date    18.03.2025
     *
     * @param {Gui.Dialogs.OpenDialogParams<WebClient.GPretriditSpisyVecneSkupinyInput>} input
     */
    function GPretriditSpisyVecneSkupinyDlg(input: Gui.Dialogs.OpenDialogParams<WebClient.GPretriditSpisyVecneSkupinyInput>): JQuery.Promise<WebClient.GPretriditSpisyVecneSkupinyOutput | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog pozastavenískartace věcné skupiny.
     *
     * @author  TFeik
     * @date    28.03.2025
     *
     * @param {Gui.Dialogs.OpenDialogParams<WebClient.GPozastaveniSkartaceVecneSkupinyDlgInput>} input
     */
    function GPozastaveniSkartaceVecneSkupinyDlg(input: Gui.Dialogs.OpenDialogParams<WebClient.GPozastaveniSkartaceVecneSkupinyDlgInput>): JQuery.Promise<WebClient.GPozastaveniSkartaceVecneSkupinyDlgOutput | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * xxxx
     *
     * @author  dSebesta
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
     */
    function GSslEklepNovePripominkoveRizeniDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GSslEklepNovePripominkoveRizeniDlgInputDto>): JQuery.Promise<WebClient.GSslEklepNovePripominkoveRizeniDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * xxxx
     *
     * @author  dSebesta
     *
     * @param {gcontent} parentContent The content.
     * @param {?Gordic.Global.Enums.ModOtevreni=Gordic.Gin.Globals.Enums.Navigate} modOtevreni Mód otevření dialogu.
     * @param {!object} opt Parametry dialogu.
     * @param {!string} opt.ProvestVytvoreniVDialogu ProvestVytvoreniVDialogu.
     */
    function GSslEklepPripominkoveRizeniDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GSslEklepPripominkoveRizeniInputDlgDialogsDto>): JQuery.Promise<{} | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Otevře dialog (seznamu) čekajících operací v NEN.
     *
     * @author  TFeik
     * @date    05.08.2025
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenCekajiciOperaceDlgInputDto>} input
     */
    function GNenCekajiciOperaceDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenCekajiciOperaceDlgInputDto>): JQuery.Promise<WebClient.GNenCekajiciOperaceDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Odesle soubor do NEN.
     *
     * @author  TFeik
     * @date    05.08.2025
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenOdesliDokumentDoNenDlgInputDto>} input
     */
    function GNenOdesliDokumentDoNenDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenOdesliDokumentDoNenDlgInputDto>): JQuery.Promise<WebClient.GNenOdesliDokumentDoNenDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Odesle soubor do NEN.
     *
     * @author  TFeik
     * @date    05.08.2025
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenDetailCekajiciOperaceDlgInputDto>} input
     */
    function GNenDetailCekajiciOperaceDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenDetailCekajiciOperaceDlgInputDto>): JQuery.Promise<WebClient.GNenDetailCekajiciOperaceDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    /**
     * Odesle soubor do NEN.
     *
     * @author  TFeik
     * @date    05.08.2025
     *
     * @param {Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenPrijmyDokumentZNenDlgInputDto>} input
     */
    function GNenPrijmyDokumentZNenDlg(input: Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GNenPrijmyDokumentZNenDlgInputDto>): JQuery.Promise<WebClient.GNenPrijmyDokumentZNenDlgReturnDto | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
}
declare namespace Gordic.Ssl.Globals.Enums {
    enum SeznamNeaktivnich {
        STORNOVANE = 1,
        ZTRACENE = 2,
        PRERUSENE = 3,
        ODESLANE = 4,
        PRIOROVANE = 5,
        ULOZENE = 6,
        ARCHIVOVANE = 7,
        SKARTOVANE = 8,
        PREEVIDOVANE = 9
    }
    enum StavProPracovniStul {
        V_REDISTRIBUCI = 1,
        VE_SPISU = 2
    }
    enum StavProVlastnostiDleUrovne {
        VYRIZENE_UZAVRENE = 1,
        STORNOVANE = 2,
        JEN_SPISY = 3
    }
    enum TypRedistribucniSubjekt {
        UZEL = 1,
        FUNKCE = 2
    }
    enum TypRedistribucniPrevzeti {
        FYZICKY = 1,
        CILENE = 2
    }
    enum TypRedistribuceVariant {
        NA_CESTE = 1
    }
    enum TypFiltruSpisuDeniku {
        PODANE_UZLEM = 0,
        DENIK_SU = 1,
        VSECHNY = 2
    }
    enum TypEvidenceDokumentu {
        NONE = 0,
        VLASTNI = 1,
        CIZI = 2
    }
    enum PuvodDokumentu {
        VLASTNI = 0,
        DORUCENY = 1,
        AGENDOVY = 2
    }
    enum TypTvorbyIxp {
        GENEROVAT = 0,
        ZADAVAT_DIALOGEM = 1
    }
    enum TypSubjektuFilter {
        VSE = 0,
        JEN_FUN = 1,
        JEN_SU = 2,
        AKTFUN_AKTSU = 3,
        JEN_FUN_AKTSU = 4
    }
    enum SubjectStructOrg {
        AKTUALNI_FUNKCE = 0,
        AKTUALNI_SPIS_UZEL = 1,
        PODRIZENE_UZLY = 2,
        OSOBY_UZLU = 3,
        SKUPINY_FUNKCI = 4
    }
    enum TypoveSpisySoucastiDily {
        TYPOVY_SPIS = 1,
        SOUCAST = 2,
        DIL = 3
    }
    /**
     * Typ rezimu prace nad seznamem
     */
    enum TypRezimuPraceSeznamu {
        /** Neurceno */
        Neurceno = 0,
        /** dokumenty/spisu */
        DokumentyASpisy = 1,
        /** pouze dokumenty/spisu */
        Dokumenty = 2,
        /** pouze spisy< */
        Spisy = 3,
        /** Baliky */
        Baliky = 4,
        /** Zásilky */
        Zasilky = 5
    }
}
declare namespace Gordic.Ssl.Globals.ListSupport {
    enum TypWflspidZaznamu {
        /**
         * Dokument.
         */
        Dokument = 0,
        /**
         * Spis.
         */
        Spis = 1,
        /**
         * DokumentSpis.
         */
        DokumentSpis = 2
    }
    /**
     * TiskHromadnyPomocna
     *
     * @author  RTomes
     * @date    19.09.2022
     *
     * @param {any} input
     * @returns
     */
    function TiskHromadnyPomocna(actionTiskNonVisual: GAction, firstRun: boolean, input: any, tiskProTyp: TypWflspidZaznamu, event: JQueryEventObject): void;
    /**
     * TiskHromadnyDetailDokumentuPomocna
     *
     * @author  RTomes
     * @date    19.09.2022
     *
     * @param {any} input
     * @returns
     */
    function TiskHromadnyDetailDokumentuPomocna(actionTiskNonVisual: GAction, firstRun: boolean, input: any, tiskProTyp: TypWflspidZaznamu, event: JQueryEventObject): JQueryPromise<boolean>;
}
declare namespace Gordic.Ssl.Globals.PosledniNavstiveny {
    interface DataProPosledniNavstivenyDoc {
        Ixp: string;
    }
    interface PosledniNavstivenyDoc {
        ixp: string;
    }
    function pridejPosledniNavstivenyDoc(globalSettings: Gordic.Data.Storage, detailSSL: DataProPosledniNavstivenyDoc): void;
}
declare namespace Gordic.Ssl.PreActions {
    enum Names {
        VytvoritSpisSPRHromadne = "actVytvoritSpisSPRHromadne",
        VytvoritBalikAVlozitSeznam = "actVytvoritBalikAVlozitSeznam",
        OpravitMetadataPoKontroleSeznam = "actOpravitMetadataPoKontroleSeznam",
        SouboryNearchivniFormat = "actSouboryNearchivniFormat",
        OtevriDokumenty = "actOtevriDokumenty",
        NacteniNovychMaterialuEKlep = "actNacteniNovychMaterialuEKlep",
        NacteniStornaVMaterialechEKlep = "actNacteniStornaVMaterialechEKlep",
        ZkontrolujZmenyUMaterialuEKlep = "actZkontrolujZmenyUMaterialuEKlep",
        ZkontrolujEklep = "actZkontrolujEklep",
        OtevriEklepPripominkyPripominkovehoRizeni = "actOtevriEklepPripominkyPripominkovehoRizeni",
        OtevriEklepPripominkovaRizeni = "actOtevriEklepPripominkovaRizeni",
        OtevriDetailEklepOdeslanaPripominka = "actOtevriDetailEklepOdeslanaPripominka",
        OtevriDetailEklepPripominkoveRizeni = "actOtevriDetailEklepPripominkoveRizeni",
        OtevriPretriditSpisyVecneSkupiny = "actOtevriPretriditSpisyVecneSkupiny",
        PozastaveniSkartacniOperaceVecneSkupiny = "actPozastaveniSkartacniOperaceVecneSkupiny"
    }
    interface VytvoritSpisSprSeznamInputDto {
        ListSelectedRowsInfo: Wfl.Interface.SelectedRowInfoDto[];
    }
    interface VytvoritSpisSprSeznamReturnValueDto {
        GroupResult?: any[];
    }
    /**
     * export function VytvoritSpisSPRHromadne
     *
     * @param {Gin.PreActions.BasePreActionsInput<VytvoritSpisSprSeznamInputDto} [input]
     * @returns {GActionParams}
     */
    function VytvoritSpisSPRHromadne(input?: Gordic.Prefabs.Actions.BasePreActionsInput<VytvoritSpisSprSeznamInputDto, VytvoritSpisSprSeznamReturnValueDto>): GActionParams;
    /**
     * export function OtevriDetailDokumentuSpisu
     *
     * @param {Gin.PreActions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailDokumentuSpisuParams>} [input]
     * @returns {GActionParams}
     */
    function OtevriDetailDokumentuSpisu(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GDetailDokumentuSpisuParams>, JQuery<HTMLElement> | undefined | null>): GActionParams;
    interface VytvoritBalikAVlozitSeznamInputDto {
        ListSelectedRowsInfo: Wfl.Interface.SelectedRowInfoDto[];
        /**
         * Příznak, zda se bude dokument vytvářet v režimu spisovny.
         * @type {boolean}
         */
        isRezimSpisovna?: boolean;
        spisovyZnakDisabled?: boolean;
    }
    interface VytvoritBalikAVlozitSeznamReturnValueDto {
        GroupResult?: any[];
    }
    /**
     * akce pro vkládání seznamu do nově vytvořeného balíku
     *
     * @param {Gin.PreActions.BasePreActionsInput<VytvoritBalikAVlozitSeznamInputDto} [input]
     * @returns {GActionParams}
     */
    function VytvoritBalikAVlozitSeznam(input?: Gordic.Prefabs.Actions.BasePreActionsInput<VytvoritBalikAVlozitSeznamInputDto, VytvoritBalikAVlozitSeznamReturnValueDto>): GActionParams;
    /**
     * akcep pro kontrolu metadat ze seznamu
     *
     * @param {Gin.PreActions.BasePreActionsInput<{ IxpArray: string[], VyrizFlag?: any }, { groupResult?: any, message?: string} [input]
     * @returns {GActionParams}
     */
    /**
      * Provede se oprava metadat po jejich kontrole (metoda OpravaMetadatSeznamNew)
      *
      * @author  thazmuka
      * @date    22.6.2021
      *
      * @param input netřeba vyplňovat, data se načtou až při spuštění dialogu jinou cestou
      */
    function OpravitMetadataPoKontroleSeznam(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        IxpArray: string[];
        VyrizFlag?: any;
    }, {
        groupResult?: any;
        message?: string;
        stav?: any;
    }>): GActionParams;
    function SouboryNearchivniFormat(input?: Gordic.Prefabs.Actions.BasePreActionsInput<{
        ListSelectedRowsInfo: Wfl.Interface.SelectedRowInfoDto[];
    }, {
        groupResult?: any;
    }>): GActionParams;
    /**
     * Akce pro otevření detailu připomínky připomínkového řízení v eKLEP.
     *
     * @author  TFeik
     * @date    08.10.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GSslEklepOdeslanaPripominkaDlgInput>} [input]
     * @returns {GActionParams}
     */
    function OtevriDetailEklepOdeslanaPripominka(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GSslEklepOdeslanaPripominkaDlgInput>, {}>): GActionParams;
    /**
    * Akce pro otevření detailu připomínky připomínkového řízení v eKLEP.
    *
    * @author  TFeik
    * @date    08.10.2020
    *
    * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Dialogs.GSslEklepPripominkoveRizeniInputDlgDialogsDto>} [input]
    * @returns {GActionParams}
    */
    function OtevriDetailEklepPripominkoveRizeni(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<Ssl.WebClient.GSslEklepPripominkoveRizeniInputDlgDialogsDto>, {}>): GActionParams;
    /**
     * NacteniNovychMaterialuEKlepInput
     *
     * @author  TFeik
     * @since   52510.6
     * @date    03.10.2024
     */
    interface NacteniNovychMaterialuEKlepInput {
        parentContent: GContent;
        requestDto?: Ssl.Interface.GNactiNoveMaterialyRequestDto;
    }
    /**
     * Akce pro načtení nových materiálů pro eKLEP.
     *
     * @author  TFeik
     * @date    03.10.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<NacteniNovychMaterialuEKlepInput} [input]
     * @returns {GActionParams}
     */
    function NacteniNovychMaterialuEKlep(input?: Gordic.Prefabs.Actions.BasePreActionsInput<NacteniNovychMaterialuEKlepInput, Isl.GOperationResult<Ssl.Interface.GNactiNoveMaterialyResponseDto>>): GActionParams;
    /**
     * NacteniStornaVMaterialechEKlepInput
     *
     * @author  TFeik
     * @since   52510.6
     * @date    03.10.2024
     */
    interface NacteniStornaVMaterialechEKlepInput {
        parentContent: GContent;
        requestDto?: Ssl.Interface.GZkontrolujStonovaneMaterialyRequestDto;
    }
    /**
     * Načtení storna materiálů pro eKLEP.
     *
     * @author  TFeik
     * @date    03.10.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<NacteniStornaVMaterialechEKlepInput} [input]
     * @returns {GActionParams}
     */
    function NacteniStornaVMaterialechEKlep(input?: Gordic.Prefabs.Actions.BasePreActionsInput<NacteniStornaVMaterialechEKlepInput, Isl.GOperationResult<Ssl.Interface.GZkontrolujStonovaneMaterialyResponseDto>>): GActionParams;
    /**
    * ZkontrolujZmenyUMaterialuEKlepInput
    *
    * @author  TFeik
    * @since   52510.6
    * @date    03.10.2024
    */
    interface ZkontrolujZmenyUMaterialuEKlepInput {
        parentContent: GContent;
        requestDto?: Ssl.Interface.GZkontrolujZmenyUMaterialuRequestDto;
    }
    /**
     * Načtení storna materiálů pro eKLEP.
     *
     * @author  TFeik
     * @date    03.10.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<ZkontrolujZmenyUMaterialuEKlepInput} [input]
     * @returns {GActionParams}
     */
    function ZkontrolujZmenyUMaterialuEKlep(input?: Gordic.Prefabs.Actions.BasePreActionsInput<ZkontrolujZmenyUMaterialuEKlepInput, Isl.GOperationResult<Ssl.Interface.GZkontrolujZmenyUMaterialuResponseDto>>): GActionParams;
    /**
    * GZkontrolujEklepInput
    *
    * @author  TFeik
    * @since   52510.6
    * @date    03.10.2024
    */
    interface GZkontrolujEklepInput {
        parentContent: GContent;
        requestDto?: Ssl.Interface.GZkontrolujEklepRequestDto;
    }
    /**
     * Načtení storna materiálů pro eKLEP.
     *
     * @author  TFeik
     * @date    03.10.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<GZkontrolujEklepInput} [input]
     * @returns {GActionParams}
     */
    function ZkontrolujEklep(input?: Gordic.Prefabs.Actions.BasePreActionsInput<GZkontrolujEklepInput, Isl.GOperationResult<Ssl.Interface.GZkontrolujEklepResponseDto>>): GActionParams;
    /**
    * GZkontrolujEklepInput
    *
    * @author  TFeik
    * @since   52510.6
    * @date    03.10.2024
    */
    interface GOtevriEklepPripominkyPripominkovehoRizeniInput {
        parentContent: GContent;
        requestDto?: Ssl.WebClient.GEklepPripominkyPripominkovehoRizeniSeznamDlgInputDto;
    }
    /**
     * Načtení storna materiálů pro eKLEP.
     *
     * @author  TFeik
     * @date    03.10.2024
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<GOtevriEklepPripominkyPripominkovehoRizeniInput} [input]
     * @returns {GActionParams}
     */
    function OtevriEklepPripominkyPripominkovehoRizeni(input?: Gordic.Prefabs.Actions.BasePreActionsInput<GOtevriEklepPripominkyPripominkovehoRizeniInput, Isl.GOperationResult<Ssl.WebClient.GEklepPripominkyPripominkovehoRizeniSeznamDlgReturnDto>>): GActionParams;
    /**
     * Otevře seznam připomínkových řízení v eKLEP.
     *
     * @author  TFeik
     * @date    09.07.2025
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GEklepPripominkovaRizeniSeznamDlgInputDto>} [input]
     * @returns {GActionParams}
     */
    function OtevriEklepPripominkovaRizeni(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GEklepPripominkovaRizeniSeznamDlgInputDto>, WebClient.GEklepPripominkovaRizeniSeznamDlgReturnDto>): GActionParams;
    /**
     * Akce pro otevření dokumentů (seznam přes Isl s podporou customizace).
     *
     * @author  TFeik
     * @date    04.09.2020
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<WebClient.GDokumentyDlgInputParams>} [input]
     * @returns {GActionParams}
     */
    function OtevriDokumenty(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gordic.Gui.Dialogs.OpenDialogParams<{
        isl: Isl.Client;
        customSettings: Gordic.CustomView.SettingsContent<Interface.GDokumentDto, Interface.GDokumentFilterDto>;
        hardServerFilter?: Interface.GDokumentFilterDto;
    }>, undefined>): GActionParams;
    /**
     * Akce pro otevření přetřídění obsahu věcné skupiny.
     *
     * @author  TFeik
     * @date    18.03.2025
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gui.Dialogs.OpenDialogParams<WebClient.GPretriditSpisyVecneSkupinyInput>} [input]
     * @returns {GActionParams}
     */
    function OtevriPretriditSpisyVecneSkupiny(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gui.Dialogs.OpenDialogParams<WebClient.GPretriditSpisyVecneSkupinyInput>, WebClient.GPretriditSpisyVecneSkupinyOutput>): GActionParams;
    /**
     * Akce pro otevření pozastavení skartace věcné skupiny.
     *
     * @author  TFeik
     * @date    27.03.2025
     *
     * @param {Gordic.Prefabs.Actions.BasePreActionsInput<Gui.Dialogs.OpenDialogParams<WebClient.GPozastaveniSkartaceVecneSkupinyDlgInput>} [input]
     * @returns {GActionParams}
     */
    function PozastaveniSkartacniOperaceVecneSkupiny(input?: Gordic.Prefabs.Actions.BasePreActionsInput<Gui.Dialogs.OpenDialogParams<WebClient.GPozastaveniSkartaceVecneSkupinyDlgInput>, WebClient.GPozastaveniSkartaceVecneSkupinyDlgOutput>): GActionParams;
}
declare namespace Gordic.Ssl {
    class Utils {
        private static readonly ClassName;
        private static srv;
        static MinimalDate: string;
        static VyriditPredVlozenimDoSpisuRequest: string;
        static IdNeodpovidaSpisuErrText: string;
        /**
           * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
           *
           * @param {JQuery<HTMLElement>} form předaný element formuláře
           * @returns {JQueryPromise<boolean>} výsledek stavu
           */
        static waitForValues(form: JQuery<HTMLElement>): JQueryPromise<boolean>;
        static GetSrv(content: GContent): GContent;
        /**
         * Vytvoří serverový content a navázaný na parent content.
         *
         * @author  TFeik
         * @date    08.12.2020
         *
         * @param {CreateServerInput} input
         * @returns {GContent}
         */
        private static CreateServer;
        static GetInfoProZalozeniCjSKontrolouTvorbyCjProDokument(IxsTyp: any, FlagCizi: any, content: GContent): JQuery.Promise<any>;
        static GetInfoProZalozeniCj(content: GContent): JQuery.Promise<any>;
        static NovaKopie(dto: any, content: GContent): JQuery.Promise<any>;
        /**
        *
        * @param options.IxpDok
        * @param options.PIDSpisZnovuVlozit
        * @param options.content
        * @param options.SVyriz
        */
        static vlozitDoSpisuUtils(FlagVlozit: any, options: any): JQuery.Promise<any>;
        static OnVyhledaniComplete(ixpSpis: any, options: any): void;
        static stavSpisuOnSucceeded(result: any, options: any): void;
        static stavSpisuOnSucceededConfirmed(VlozitDoSpisu: any, l_sVyriditDokHiddenValue: any, options: any): void;
        /**
            *
            * @param options.IxpSpis
            * @param options.IxpDok
            * @param options.IDSpisVlozitDoSpisu
            *
            * @param options.content
            */
        static dotazIRPNaVlozeniDokumentuDoSpisu(options: any): JQuery.Promise<any>;
        static dotazIRPNaVlozeniDokumentuDoSpisuOnSucceeded(result: any, options: any): void;
        static vlozitDoSpisuSubmit(pNastaveniRP: any, options: any, prebratZeSpisu: any): void;
        /**
            * @param options.def   promise
            * @param options.IDSpisVlozitDoSpisu
            *
            * @param options.content
            */
        static vlozitVyjmoutZeSpisu(FlagVlozit: any, ixpDok: any, options: any): void;
        /**
        * kontrola, zda se vkládá do spisu se stejným ixsFunAkt jako je dokument
        */
        static vlozeniDoSpisuKontrolaVlastnictvi(ixpDok: any, options: any): JQuery.Promise<any, any, any>;
        static vyjmutiZeSpisuZadaniDuvodu(ixpDok: any, options: any): JQuery.Promise<any, any, any>;
        static vlozitVyjmoutZeSpisuOnSucceeded(retVal: any, FlagVlozit: any, options: any): void;
        static vlozitVyjmoutParovyDokumentDoSpisu(ixpDok: any, ixpSpis: any, flagVlozit: any, options: any): void;
        static nactiPosledniNavstivene(): any;
        static novySpisBezIniciacnihoDokumentu(content: any): void;
        static novyTypovySpis(content: any): void;
        static novyFormularCiDuplikat(content: any, isDuplikat: any): void;
        static GetInfoProZalozeniCjDlg(content: any): JQuery.Promise<any>;
        /**
         * vytvoritBalikAVlozitSeznamIxp
         *
         * @param {any} content
         * @param {Wfl.Interface.SelectedRowInfoDto[]} listSelectedRowInfoDto
         * @param {boolean} [isRezimSpisovna] Příznak, zda se bude dokument vytvářet v režimu spisovny.
         */
        static vytvoritBalikAVlozitSeznamIxp(content: any, listSelectedRowInfoDto: Wfl.Interface.SelectedRowInfoDto[], isRezimSpisovna?: boolean, spisovyZnakDisabled?: boolean): JQuery.Promise<any, any, any>;
        /**
         * zadostOvytvoritBalik
         *
         * @param {any} content
         * @param {any} promise
         * @param {any} listSelectedRowInfoDto
         * @param {boolean} [isRezimSpisovna] Příznak, zda se bude dokument vytvářet v režimu spisovny.
         */
        static zadostOvytvoritBalik(content: any, promise: any, listSelectedRowInfoDto: any, isRezimSpisovna?: boolean, spisovyZnakDisabled?: boolean): void;
        static vytvorBalik(content: GContent, skartace: Pick<Spi.Interface.GBalikDto, 'SpisovyPlan' | 'SpisovyZnak' | 'SkartacniZnak' | 'SkartacniLhuta' | 'RokSkartace'> | undefined | null, zavritBalikPoUlozeni?: boolean, 
        /**
         * Příznak, zda se bude dokument vytvářet v režimu spisovny.
         * @type {boolean}
         */
        isRezimSpisovna?: boolean, spisovyZnakDisabled?: boolean, 
        /**
         * Identifikátor dokumentu pro přednastavení hodnot při nově vytvářeném balíku.
         * @type {string | null}
         */
        inputDataIxp?: string | null): JQuery.Promise<Spi.WebClient.GDetailBalikuDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        static vlozitDoBaliku(content: GContent, promise: JQuery.Deferred<any>, listSelectedRowInfoDto: {
            Ixp?: string | null;
        }[], IxsZup: string, noveVytvorenyBalik: boolean): void;
        static SouboryVNearchFormatu(content: GContent, ListSelectedRowsInfo: Wfl.Interface.SelectedRowInfoDto[]): JQuery.Promise<any>;
        /**
         * Zaregistruje vybraná hledání (searchResolvery) do obecného hledacího políčka.
         *
         * @author  TFeik
         * @date    26.08.2019
         */
        static registerSearchResolvers(input?: registerSearchResolversInput): void;
        static LoadModuleInfoToStatistiky(input: {
            AppendToDiv: any;
            NazevRef: string;
            NazevFun: string;
            ZastupTxt: string;
            ZkratkaSu: string;
            DatLoginTxt: string;
            Image: string;
            PrimaryText: string;
        }): void;
        static GetDataLastUsed(input: {
            LastUsed: any;
        }): any[];
        static LoadScorecardItems(input: {
            AppendToDiv: any;
            ScorecardItems: any;
            Content: GContent;
        }): JQuery<HTMLElement>;
        static LoadLastUsed(input: {
            AppendToDiv: any;
            LastUsed: any;
            Content: GContent;
        }): void;
        static LoadLastUsedNew(input: {
            AppendToDiv: any;
            LastUsed: any;
            Content: GContent | null;
        }): void;
        static LoadGridLastUsed(input: {
            AppendToDiv: any;
            LastUsed: any;
            ScorecardItems: any;
            Content: GContent;
        }): void;
        static ShowArticleStatisticDialog(input: {
            AppendToDiv: any;
        }): void;
        static CreateVychoziSubjektPoleVlastnictvi(input: CreateVychoziSubjektPoleVlastnictviParamsInput): JQuery.Promise<WebClient.Lists.SubjektSelectedInfo>;
        static SortSpzn(aObj: any, bObj: any): number;
        static OtevriPoznamkoviBlokSNeuzavrenymi(content: GContent, zaFunkci: boolean, poctyBezOhleduNaAgendu: boolean): void;
        static OtevriPoznamkoviBlokSNeuzavrenymiRAK(content: GContent, zaFunkci: boolean, poctyBezOhleduNaAgendu: boolean): void;
        static OtevriPoznamkvejSDulezitosti(content: GContent, zaFunkci: boolean, poctyBezOhleduNaAgendu: boolean, barva: string): void;
        static VysledekOperaceIcoColumn(content: any, extendObj?: {
            columnListObj?: Gordic.Wfl.WebClient.columnListObjInterface;
        }): GGridColumn<any>;
        /**
         * CreateDocumentsCustomSettings
         *
         * @author  TFeik
         * @date    20.10.2021
         *
         * @param {{ contentId: string, contentTitle: string} input
         * @returns {Gordic.CustomView.SettingsContent<Interface.GDokumentDto}
         */
        private static CreateDocumentsCustomSettings;
        /**
         * OtevriDokumentyASpisyZDashboardu
         *
         * @author  TFeik
         * @date    26.10.2022
         *
         * @param {Gui.Dialogs.OpenDialogParams<{ contentId: string, contentTitle: string} input
         * @returns {input.parentContent}
         */
        static OtevriDokumentyASpisyZDashboardu(input: OtevriDokumentySpisyZDashboarduInput<Interface.GSslspidFilterDto>): JQuery.Promise<CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        /**
         * OtevriDokumentyZDashboardu
         *
         * @author  TFeik
         * @date    20.10.2021
         *
         * @param {Gui.Dialogs.OpenDialogParams<{ contentId: string, contentTitle: string} input
         * @returns {input.parentContent}
         */
        static OtevriDokumentyZDashboardu(input: OtevriDokumentySpisyZDashboarduInput<Interface.GDokumentFilterDto>): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        /**
         * CreateDocumentsToSignCustomSettings
         *
         * @author  RTOMES
         * @date    28.02.2022
         *
         * @param {{ contentId: string, contentTitle: string} input
         * @returns {Gordic.CustomView.SettingsContent<Interface.GDokumentDto}
         */
        private static CreateDocumentsToSignCustomSettings;
        /**
         * OpenTaskToSign - určeno k volání z tasklistu i dashboardu (odkudkoli)
         *
         * @author  RTOMES
         * @date    28.02.2022
         *
         * @param {Gui.Dialogs.OpenDialogParams<{ contentId: string, contentTitle: string} input
         * @returns {input.parentContent}
         */
        static OpenTaskToSign(input: Gui.Dialogs.OpenDialogParams<undefined>): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        /**
         * CreateSpisCustomSettings
         *
         * @author  TFeik
         * @date    20.10.2021
         *
         * @param {{ contentId: string, contentTitle: string} input
         * @returns {Gordic.CustomView.SettingsContent<Interface.GSpisDto}
         */
        private static CreateSpisCustomSettings;
        /**
         * OtevriSpisyZDashboardu
         *
         * @author  TFeik
         * @date    20.10.2021
         *
         * @param {Gui.Dialogs.OpenDialogParams<{ contentId: string, contentTitle: string} input
         * @returns {input.parentContent}
         */
        static OtevriSpisyZDashboardu(input: OtevriDokumentySpisyZDashboarduInput<Interface.GSpisFilterDto>): JQuery.Promise<CustomView.GContentRetVal<Interface.GSpisDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        /**
         * CreateRedistribuceCustomSettings
         *
         * @author  RTOMES
         * @date    28.02.2022
         *
         * @param {{ IxsFunAkt: string, IxsSuAkt: string} input
         * @returns {Gordic.CustomView.SettingsContent<Interface.GDokumentFilterDto}
         */
        private static CreateRedistribuceCustomSettings;
        /**
         * OpenTaskRedistribuce - určeno k volání z tasklistu i dashboardu (odkudkoli)
         *
         * @author  RTOMES
         * @date    28.02.2022
         *
         * @param {Gui.Dialogs.OpenDialogParams<{ contentId: string, contentTitle: string} input
         * @returns {input.parentContent}
         */
        static OpenTaskRedistribuce(input: Gui.Dialogs.OpenDialogParams<undefined>): JQuery.PromiseBase<CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any, CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any, CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any, CustomView.GContentRetVal<Interface.GSslspidDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        static RegistrovatSablonuPoslednichPouzitych(content: GContent): void;
        /**
         * Přednačte potřebné části pro custom seznamy tak, aby jejich následné spuštění nepotřebovalo call na server.
         * To má za následek rychlejší první custom seznamů.
         *
         * @author  TFeik
         * @date    15.03.2022
         */
        static PreloadCustomViews(isl: Isl.Client, 
        /**
         * (default: 'all') Typ písemností, pro které se má přednačíst nastavení pro custom seznamy.
         *
         * @type {Wfl.WebClient.GTypPisemnosti[] | 'all'}
         */
        pisemnosti?: Wfl.WebClient.GTypPisemnosti[] | 'all'): JQuery.Promise<void>;
        /**
         * Otevře customizovatelný seznam dokumetů dle kontextu akce.
         *
         * @author  TFeik
         * @date    09.11.2023
         *
         * @param {JQueryEventObject} event
         * @param {any} actionContext
         * @returns {JQuery.Promise<void>}
         */
        static OpenUniverzalDokumenty(event: JQueryEventObject, actionContext: any): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined>;
        /**
         * Otevře customizovatelný seznam dokumetů a spisů dle kontextu akce.
         *
         * @author  TFeik
         * @date    09.11.2023
         *
         * @param {JQueryEventObject} event
         * @param {any} actionContext
         * @returns {JQuery.Promise<void>}
         */
        static OpenUniverzalDokumentyASpisy(event: JQueryEventObject, actionContext: any): JQuery.Promise<CustomView.GContentRetVal<Interface.GSslspidDto> | undefined>;
        /**
         * Otevře customizovatelný seznam dokumetů a spisů dle kontextu akce.
         *
         * @author  TFeik
         * @date    09.11.2023
         *
         * @param {JQueryEventObject} event
         * @param {any} actionContext
         * @returns {JQuery.Promise<void>}
         */
        static OpenUniverzalSpisy(event: JQueryEventObject, actionContext: any): JQuery.Promise<CustomView.GContentRetVal<Interface.GSpisDto> | undefined>;
        /**
         * DashboardProvidersRegister
         *
         * @param {GContent} content
         */
        static DashboardProvidersRegister(content: GContent): void;
        /**
         * GenerateRandomCislo
         *
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        static GenerateRandomCislo(min: number, max: number): number;
        /**
         * JeOpravneniNaVecnouSkupinu
         *
         * @param {Gordic.Gin.Interface.GVecnaSkupinaDto | undefined | null} item
         * @returns {boolean}
         */
        static JeOpravneniNaVecnouSkupinu(item: Gordic.Gin.Interface.GVecnaSkupinaDto | undefined | null): boolean;
        /**
        * OpenTaskToSign - určeno k volání z tasklistu i dashboardu (odkudkoli)
        *
        * @author  RTOMES
        * @date    28.02.2022
        *
        * @param {Gui.Dialogs.OpenDialogParams<{ contentId: string, contentTitle: string} input
        * @returns {input.parentContent}
        */
        static OpenTaskEklepNavrhyMaterialu(input: Gui.Dialogs.OpenDialogParams<undefined>): JQuery.Promise<CustomView.GContentRetVal<Interface.GDokumentDto> | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
        /**
         * CreateEklepNavrhyMaterialuCustomSettings
         *
         * @author  RTOMES
         * @date    28.02.2022
         *
         * @param {{ contentId: string, contentTitle: string} input
         * @returns {Gordic.CustomView.SettingsContent<Interface.GDokumentDto}
         */
        private static CreateEklepNavrhyMaterialuCustomSettings;
    }
    interface registerSearchResolversInput extends Wfl.Utils.registerSearchResolversInput {
    }
    interface CreateVychoziSubjektPoleVlastnictviParamsInput extends Wfl.CreateServerInput {
        ixsType: Gin.Interface.IxsType;
    }
    interface OtevriDokumentySpisyZDashboarduInput<TFilterDto extends Interface.GSslspidFilterDto | Interface.GDokumentFilterDto | Interface.GSpisFilterDto> extends Gui.Dialogs.OpenDialogParams<{
        contentId: string;
        contentTitle: string;
        startingFilter: TFilterDto;
    }> {
    }
}
declare namespace Gordic.Ssl.AppSettings {
    function DetailSettingsForm(): Forms.Form;
}
declare namespace Gordic.Ssl.AppSettings {
    function StatistikyUsuSettingsForm(): Forms.Form;
}
declare namespace Gordic.Ssl.AppSettings {
    function VyrizeniSettingsForm(): Forms.Form;
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * NabytPravniMocDlg
     */
    class NabytPravniMocDlg extends GContentBase {
        private readonly Ixp?;
        private readonly IxpsArry?;
        private readonly Dokument?;
        private readonly skfunkcnost;
        private readonly model;
        private readonly validators;
        private $defaultForm?;
        private retValue?;
        private onContentReady;
        private OKClick;
        private closing;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * Oprava metadat nevalidních položek dokumentu/spisu na detailu
     * - nová: přepsána do typescriptu
     *
     * @author thazmuka
     * @since 484.1.0.70
     */
    class OpravaMetadatNevalidPolozekDokSpisDetail extends GContentBase {
        private PouzeZapisDoHistorie;
        private DetailDto;
        /** příznak, jestli je počet listů zadán jako číslo nebo jako string */
        private pocetListuStrFlag?;
        /** tlacitko predvyplneni spis_znaku
         * thazmuka - zkontrolovat, jestli se nemá předplňovat v c#
         */
        private predplnitSpZnDleSpisu;
        /** jquery element celého formuláře - hlavička a tělo */
        private form?;
        /** dto nevalidní políčka */
        private NevalidniPolicka?;
        /** refresh po zavření dialogu? */
        private refresh;
        onContentReady(): void;
        closing(): JQuery.Promise<any, any, any>;
        private init;
        private initValues;
        /** naplnění políček příslušnými hodnotami */
        private modelApply;
        private spisPlanEnabled;
        /** povolení nevalidních políček k opravě */
        private setEnableToNevalidFields;
        /**
         * specialni pripad nasetovani spisoveho planu
         */
        private setSpisPlanDleParam;
        private createForm;
        private createHeaderForm;
        private createBodyForm;
        private addSaveParams;
        private createCommandBar;
        private save;
        private doplnitSpisZnakClick;
        private PrizSpis;
        private IxpSpis;
        private createMenuBar;
        /**
        * metoda, která zvaliduje formulář a vrátí výsledek validace až je formulář připraven
        *
        * @param {JQuery<HTMLElement>} form předaný element formuláře
        * @returns {JQueryPromise<boolean>} výsledek stavu
        */
        private waitForValues;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class EditKatastrDlg extends GContentBase {
        private Ixp;
        private model;
        private addMode;
        private retValue?;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private createMenu;
        private createForm;
        private OKClick;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class GSslEklepNovePripominkoveRizeniDlg extends GContentBase {
        private Ixp;
        private model;
        private $Grid?;
        private previewDiv?;
        private panelPreviewOpened;
        private filePreviewOptions;
        private dialogDbParameters?;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private createActions;
        private createMenu;
        private createForm;
        private createSeznamPriloh;
        private novePripominkoveRizeni;
        createSideBar(): void;
        createPreviewPanel(): JQuery<HTMLElement>;
        loadPreview(row: any): void;
        enablePreview(enabled: any): void;
        /**
         * Metoda pro otevreni el. dokumentu
         */
        otevrit(): void;
        /**
         * Metoda pro nastaveni pristupnosti akci
         */
        nastavOpravneniAkce(row: Ssl.Interface.GAttachment2EklepDto): void;
        private zjistiPovinnostiPriloh;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class GSslEklepPripominkaDlg extends GContentBase {
        private Ixp;
        private model;
        private $Grid?;
        private previewDiv?;
        private panelPreviewOpened;
        private filePreviewOptions;
        private dialogDbParameters?;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private createActions;
        private createMenu;
        private createForm;
        private createSeznamPriloh;
        private odeslatPripominku;
        createSideBar(): void;
        createPreviewPanel(): JQuery<HTMLElement>;
        loadPreview(row: any): void;
        enablePreview(enabled: any): void;
        /**
         * Metoda pro otevreni el. dokumentu
         */
        otevrit(): void;
        /**
         * Metoda pro nastaveni pristupnosti akci
         */
        nastavOpravneniAkce(row: Ssl.Interface.GAttachment2EklepDto): void;
        private visibleCheckOdeslatPrilohy;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class PreevidenceDoSamostatneEvidenceDlg extends GContentBase {
        private Ixp;
        private OznaceniPreevidovaneho;
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private retValue?;
        private $Form;
        /**
         * OnContentReady.
         *
         * @author  rtomes
         * @date    09.03.2021
         */
        onContentReady(): void;
        createForm(): void;
        OKClick(): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.DetailBuilderComponents {
    /**
     * Content, se kterým komponenta pracuje.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    export interface SslProfilDokumentEkoComponentContent extends SslProfilDokumentEkoComponentContentRequirements, SslProfilDokumentEkoComponentContentExtensions {
    }
    /**
     * Interface, který musí splňovat content, pracující s componentou doručení zásilky.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    export interface SslProfilDokumentEkoComponentContentRequirements extends GContent {
    }
    /**
    * Funkce, které komponenta přidá na content.
    *
    * @author  TFeik
    * @date    04.06.2019
    * @since   482.1.0.453
    */
    export interface SslProfilDokumentEkoComponentContentExtensionsPublic {
        /**
        * Uložení eko profilu dokumentu
        *
        */
        saveEkoProfil: () => Gordic.Ssl.Interface.GDokumentDto;
        profilDokumentEkoComponentHasChanged: () => boolean;
        /**
        * Nastavení editmodu do záložky profilu
        */
        setEditmodeEkoProfil: (editMode: boolean) => void;
    }
    /**
     * Funkce, které komponenta přidá na content.
     *
     * @author  TFeik
     * @date    04.06.2019
     * @since   482.1.0.453
     */
    interface SslProfilDokumentEkoComponentContentExtensions extends SslProfilDokumentEkoComponentContentExtensionsPublic {
        enableProfilActions: () => void;
        nasetujProfil: (dto: Ssl.WebClient.GSslProfilDokumentComponentEkoDto, formName: string | null) => void;
        enableProfil: () => void;
        kontrolaPoctuPriloh: () => void;
        setPodaniMode: () => void;
        enableReadOnlyEkoProfil: (val: boolean) => void;
        enableProfilBase: () => void;
        enableSslDetailVyrizeni: () => void;
        pridejButonekDoOdesilatel: () => void;
        splnitDilciTermin: () => void;
        addDilciTermin: () => void;
        showSpisFromDokument: () => void;
        sslHeaderSetniVecPodrobnePokudJePrazdna: (vec: string) => void;
        sslPodrobnostiDokumentu: () => void;
        showInicVyrizDokument: (flagInicVyriz: number) => void;
        tryReloadDetail: (opt?: any, flashMessage?: {
            flashMessageClass: string | undefined;
            flashMessage: string | undefined;
        }) => void;
        DuvodZmenyTerminuCj: string;
        ReadOnlyEko: boolean;
        EditMode: boolean;
        SimpleMode: boolean;
        sslProfProfFieldsName: string;
        sslProfVyrizFieldsName: string;
        SslHeaderLastVec: string;
        otevriNovyDetail: (opt: {
            DetailDto: {
                ixp: string;
            };
        }) => void;
        zkusNasetovatOdesilatele: (dto: Ssl.WebClient.GSslProfilDokumentComponentEkoDto) => void;
    }
    export class SslProfilDokumentEko {
        static setTabsInitLazy(builder: Gin.DetailBuilder.GDetailBuilder): void;
        static create(content: SslProfilDokumentEkoComponentContent, componentDto: Ssl.WebClient.GSslProfilDokumentComponentEkoDto): Gin.DetailBuilder.GDetailBuilderComponent<Gin.DetailBuilder.GDetailBuilderContent & SslProfilDokumentEkoComponentContent>;
    }
    export {};
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * GDetailZasilkyHandler
     *
     * @author Dsebesta
     * @since 480.1.0.37
     */
    class GDetailUtils {
        /**
         * GetServer
         *
         * @author TFeik
         * @date    30.08.2018
         */
        static GetServer(content: GContent): GContent;
        static UpravKeywordsProOtevreniDialogu(content: GContent, field: JQuery<HTMLElement>, lzeKlicovaSlova: boolean): void;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class DuplikatNovyDlg extends GContentBase {
        private readonly Ixp;
        private readonly ZnackaLabelText;
        private GinSslDuplpPar;
        private OptionsForColumns;
        private readonly model;
        private readonly validators;
        readonly userSettings: Data.IGStorage;
        private readonly flashPanelTimer;
        private formOrig;
        private formDupl;
        private grid1;
        private grid2;
        private attachments1;
        private attachments2;
        private categories;
        private GroupResult?;
        private retValue?;
        /**
         * OnContentReady.
         *
         * @author  rtomes
         * @date    22.2.2021
         */
        onContentReady(): void;
        LoadGridFromDB(showCover: boolean): void;
        AddGrid1(): void;
        AddGrid2(): void;
        Reload(): void;
        ReloadGrid1(): void;
        ReloadGrid2(): void;
        OdebratVse(): void;
        PridatVse(): void;
        PridatJakoElObraz(): void;
        PridatJakoPrilohu(): void;
        OKClick(): void;
        Download(row: Partial<Wfl.Interface.GAttachmentDto>): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class VytvSpisBezInicPisDlg extends GContentBase {
        private Sslden?;
        private BezInicPis;
        private DoSoucasti;
        private NezakladatMistoTohoVratitHodnoty;
        private gin_n23_vecsk;
        private dto;
        private editovatelnostDeniku?;
        private $Form;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private vytvorFormular;
        private vytvorMenu;
        private okClick;
        private vypocitejEditovatelnost;
        private editovatelnostDleDenikuSpisuDone;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * Seznam příloh ze spisu seskupený za dokumenty.
     *
     * @author  RTomes
     * @date    02.09.2024
     * @since   524.20.0.53
     */
    class PrilohyObsahSpisuDlg extends GContentBase implements IGClientContent {
        private $Grid?;
        private previewDiv?;
        private panelPreviewOpened;
        private filePreviewOptions;
        private dialogDbParameters?;
        private ixpSbernyArchArray;
        IxpSpis: string;
        /**
         * prepareContent
         *
         * @author  RTomes
         * @date    02.09.2024
         */
        prepareContent(opts: any): void;
        /**
         * Vytvoří formulře s filtry pro seznam příloh.
         *
         * @author  TFeik
         * @date    21.02.2024
         * @since   524.20.0.53
         *
         * @returns {Forms.Form}
         */
        private static CreateFilterForm;
        createSideBar(): void;
        createPreviewPanel(): JQuery<HTMLElement>;
        loadPreview(row: any): void;
        enablePreview(enabled: any): void;
        /**
         * Metoda pro otevreni el. dokumentu
         */
        otevrit(): void;
        /**
         * Metoda pro nastaveni pristupnosti akci
         */
        nastavOpravneniAkce(row: Wfl.Interface.GAttachment2Dto): void;
        closing(): JQuery.Promise<void>;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class GSslDetailDokumentuPreview extends GContentBase {
        private readonly ixp?;
        private permission?;
        private IsSpis?;
        private grid?;
        private detailContent?;
        private dto;
        private $Form?;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        vykresliDokument(): void;
        vykresliSpis(): void;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * Vyřízení dokumentu
     *
     * @author thazmuka
     * @since 482.1.0.285
     */
    class GVyrizeniDokument extends GContentBase<GVyrizeniBase> {
        /** GIN LEG - věcné skupiny (NSESSS 2023) */
        private gin_n23_vecsk;
        /** pole názvů políček formuláře */
        private fieldsName;
        /** název formuláře */
        private FormName;
        /**
         * onContentReady
         */
        onContentReady(): void;
        closing(): Wfl.Interface.GVyrizeniDokSpisRetvalDto | null | undefined;
        private initControlDokument;
        private init;
        private createBars;
        private createForm;
        private collectData;
        private runSaveAction;
        private createSaveParams;
        private createCancelParams;
        private createMenuBar;
        private createCommandBar;
        private preSave;
        /** nastavení typu uložení */
        private setTypeOfSave;
        /** jednotlivé uložení */
        private saveSingle;
        /** hromadné uložení */
        private saveMulti;
        /**
         * vyřídit dokument nebo spis
         *
         * @param {boolean} IsCheckingMetadataOk je kontrola metadat OK?
         */
        private dealDocumentOrFile;
        /**
         * kontrola metadat
         */
        private checkingMetadata;
        private changeMinValueSkartLhuta;
        private addFilterToSpisZnak;
        private setDataToForm;
        /**
         * zablokování políčka - rok spouštěcí události, pokud je zaškrtnuto políčko "Neznámý"
         */
        private setFieldRokSpousteciUdalosti;
        private setStatesToForm;
        private changeZpusobVyrizeni;
        private changeDatumVyrizeni;
        private validateData;
        private changeEnableActions;
        private changeSpisPlan;
        private setValue;
        private getValueAsync;
        private changeSpisZnak;
        private changeUzavrit;
        private changeDatumUzavreni;
        private changeSkartLhuta;
        /**
         * změna pozastavení - platí pro políčka "Pozastavit", "Rok do", "Důvod pozastavení"
         */
        private changePozastaveni;
        private changeCheckSpUdal;
        private changeRokSpUdal;
    }
}
declare namespace Gordic.Ssl.WebClient {
    interface IGGroupResult {
        /** chybová zpráva */
        Error: string;
        /** došlo k chybě? */
        IsError: boolean;
        /** identifikátor */
        Key: string;
        /** stav řádku */
        RowState: number;
    }
    /**
     * Vyřízení spisu
     *
     * @author thazmuka
     * @since 482.1.0.285
     */
    class GVyrizeniSpis extends GContentBase<GVyrizeniBase> {
        /** pole názvů políček formuláře */
        private fieldsName;
        /** nastavit error na políčko spisového znaku? */
        private SetSpisZnakError;
        /** GIN LEG - věcné skupiny (NSESSS 2023) */
        private gin_n23_vecsk;
        /** Identifikátor funkčního místa ze SessionInfo */
        private SessionInfoIxsFun;
        /** Info o čísle jednacím - zda je vyřízeno */
        private SslsdcjSVyriz;
        /**
         * onContentReady
         */
        onContentReady(): void;
        closing(): Wfl.Interface.GVyrizeniDokSpisRetvalDto | null | undefined;
        /** validace dat pro spisový plán/znak */
        private validateData;
        private LzeUzavritSpisMetodika2023Text;
        private setFlashLzeUzavritSpisMetodika2023;
        private init;
        private createBars;
        /** název formuláře */
        private FormName;
        private createForm;
        private vecnaSkupinaChanged;
        private setValue;
        private getValueAsync;
        private collectData;
        private runSaveAction;
        private createSaveParams;
        private createCancelParams;
        private createMenuBar;
        private createCommandBar;
        private preSave;
        /** nastavení typu uložení */
        private setTypeOfSave;
        /** jednotlivé uložení */
        private saveSingle;
        /** hromadné uložení */
        private saveMulti;
        /**
         * vyřídit dokument nebo spis
         *
         * @param {boolean} IsCheckingMetadataOk je kontrola metadat OK?
         */
        private dealDocumentOrFile;
        /**
         * kontrola metadat
         */
        private checkingMetadata;
        private addFilterToSpisZnak;
        private setDataToForm;
        private setStatesToForm;
        /**
         * změna pozastavení - platí pro políčka "Pozastavit", "Rok do", "Důvod pozastavení"
         */
        private changePozastaveni;
        private changeZpusobVyrizeni;
        private changeDatumVyrizeni;
        private changeEnableActionsSchvalovatel;
        /**
         * enableActionsSchvalovatel
         *
         * @returns {boolean} na výstupu pokud příjde true - musím občerstvit nastavení políček (setStatesToForm)
         */
        private enableActionsSchvalovatel;
        private changeEnableActions;
        /** změna spisového plánu na základě spis. znaku */
        private changeSpisPlan;
        /** nastaveni flashe spisznaku */
        private setSpisZnakFlash;
        /** změna spisového znaku */
        private changeSpisZnak;
        private changeUzavrit;
        private changeDatumUzavreni;
        private changeSkartLhuta;
        private changeCheckSpUdal;
        private changeRokSpUdal;
    }
}
declare namespace Gordic.Ssl.WebClient.UdaVyveseniDialogs {
    interface VyveseniUda {
        cnt: GContent;
        nazev: string;
        popis: string;
        prilohy: any[];
        vybranePrilohy: any[];
        ixp: string;
    }
    function CreateVyveseniUda(options: VyveseniUda): void;
    function CreateVyveseniHistorieUda(options: VyveseniUda): void;
}
declare namespace Gordic.Ssl.WebClient {
    class GSslHromadnyImportDlg extends GContentBase {
        private Wizard?;
        private gridDokumenty;
        private gridSoubory;
        private fileField?;
        private gridDokumentyKrok2;
        private dataGridDokumenty;
        private dataGridSoubory;
        private gridSouboryKrok1;
        private dataGridSouboryKork1;
        private dataGridDokumentyKrok2;
        private aktualniIndexVDruhemKroku;
        private hromadnyImportItems;
        private dataKrok0Form;
        private vecPodrobneMaxLength;
        private ixsEsuSkupinaChanged;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private createWizard;
        private createActions;
        private vykreslitKrok0;
        private getGirdColumnsSoubory;
        private pridatDokumenty;
        private odebratDokumenty;
        private pridatSoubory;
        private odebratSoubory;
        private oznacitJakoObraz;
        private privateNaplnPrilohyPodleVybranehoSouboru;
        private dialogPridaniSouboru;
        private getModel;
        private setModel;
        private loadGrid;
        private addFiles;
        private createList;
        private getIdentifikator;
        private ContainsId;
        private addNewPrilohu;
        private checkPrilohuIfExists;
        private selectElObraz;
        private pripravitKrok1;
        private vykreslitKrok1;
        private dalsiDokument;
        private zkontrolovatESUSkupina;
        private predchoziDokument;
        private nastavKrok2PodleIndexu;
        private ulozKork2PredUlozenim;
        private vymazPoleKrok2;
        private vykreslitKrok2;
        private loadGridKork2;
        private zpracujHromadnePodaniDoSsl;
        private updateData;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class GVyberEsuSkupinyDlg extends GContentBase {
        private gridSkupiny;
        private viewTabulkaSkupiny;
        private ListDto;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private vytvorMenu;
        private vytvoritStromoGrid;
        private naplnSkupinyGrid;
        private okClick;
    }
}
declare namespace Gordic.Ssl.WebClient {
    type GDokumentColumnNames = GSslspidColumnNames;
    type GDokumentFieldNames = GSslspidFieldNames;
    type GDokumentPreviewIds = GSslspidPreviewIds;
    interface GDokumentIslFieldsOptions extends GSslspidIslFieldsOptions {
    }
    class GDokumentIsl {
        static Init(columns: Gin.WebClient.Names<GDokumentColumnNames>, fields: Gin.WebClient.Names<GDokumentFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GDokumentColumnNames>, fields: Gin.WebClient.Names<GDokumentFieldNames>): boolean;
        /**
         * createGridFormat
         *
         * @author  TFeik
         * @date    02.09.2020
         *
         * @returns {Data.GridFormat<Interface.GDokumentDto>}
         */
        static createGridFormat<TRow = Interface.GDokumentDto>(input: Interface.GDokumentGetCustomListParamsResponseDto, gridFormat?: Data.GridFormat<TRow>, columns?: GDokumentColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        static AddDokumentFilterFields(input: {
            content: GContent;
            form?: Forms.Form | null;
            initialValues?: Interface.GDokumentFilterDto | null;
            fields?: GDokumentFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput;
            fieldsOptions: GDokumentIslFieldsOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddDokumentFilterFieldsImmediate(input: {
            content: GContent;
            params: Wfl.Interface.GWflspidGetFilterParamsResponseDto;
            form?: Forms.Form | null;
            initialValues?: Interface.GDokumentFilterDto | null;
            fields?: GDokumentFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput;
            fieldsOptions: GDokumentIslFieldsOptions | null;
        }): Forms.Form;
        static createFilterForm(content: GContent, params: Interface.GDokumentGetCustomListParamsResponseDto, form?: Forms.Form | null, initialValues?: Interface.GDokumentFilterDto | null, fields?: GDokumentFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null, datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput, fieldsOptions?: GDokumentIslFieldsOptions | null): Forms.Form;
        /**
         * Vrátí objekt pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapper<Interface.GDokumentDto>}
         */
        static createActionPermissionMapper(): CustomView.ActionPermissionMapper<Interface.GDokumentDto>;
        /**
         * Vrátí jednotlivé položky objektu pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapperItem<Interface.GDokumentDto>[]}
         */
        static createActionPermissionMapperItems(): CustomView.ActionPermissionMapperItem<Interface.GDokumentDto>[];
        static createActionList(input: JQuery.Promise<CustomView.GContentCustomReadyArgs<Interface.GDokumentDto, Interface.GDokumentFilterDto>>, params: Interface.GDokumentGetCustomListParamsResponseDto, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider, 
        /**
         * Identifikátor poznámkového bloku (pro akci přidat do poznámkového bloku). Pokud není vyplněn, pak se akce nepřidá.
         * @type {string}
         */
        ixsBlp?: string): GActionList;
        /**
         * Vytvoří funkci upravující gridFormat před vytvořením dle contentu (userSettings).
         *
         * @author  TFeik
         * @date    05.01.2022
         *
         * @param {Data.GridFormat<Interface.GDokumentDto>} gridFormatOrigin
         * @param {CustomView.GContentDlg<Interface.GDokumentDto>} content
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {JQuery.Promise<Data.GridFormat<Interface.GDokumentDto>>}
         */
        static createUpdateGridFormat(gridFormatOrigin: Data.GridFormat<Interface.GDokumentDto>, content: CustomView.GContentDlg<Interface.GDokumentDto, Interface.GDokumentFilterDto>, scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<Interface.GDokumentDto>>;
        static createPreviewItems(input: Interface.GDokumentGetCustomListParamsResponseDto): CustomView.CustomViewPreviewItemOptions<Interface.GDokumentDto, GDokumentPreviewIds>[];
        static GetCustomListParams(isl: Isl.Client, requestData: Interface.GSslspidGetCustomListParamsRequestDto, includeSpis: boolean): JQuery.Promise<Interface.GSpisGetCustomListParamsResponseDto>;
        static CreateSource(input: CreateSourceDokumentInput): JQuery.Promise<Gordic.CustomView.Source<Interface.GDokumentDto, Interface.GDokumentFilterDto, GDokumentPreviewIds>>;
        /**
         * InitAndLoadParams
         *
         * @author  TFeik
         * @date    13.07.2023
         */
        static InitAndLoadParams(input: {
            isl: Isl.Client;
            /**
             * availableGridColumns
             * @type {GSslspidColumnNames[] | 'all' | undefined}
             */
            availableGridColumns?: GSslspidColumnNames[] | 'all';
            /**
             * availableFilterFields
             * @type {GSslspidFieldNames[] | 'all' | undefined}
             */
            availableFilterFields?: GSslspidFieldNames[] | 'all';
            /**
             * vlastnostiUzivatelskeSloupceIxxs
             * @type {string | 'all' | undefined | undefined}
             */
            vlastnostiUzivatelskeSloupceIxxs?: string | 'all';
        }): JQuery.Promise<Interface.GSpisGetCustomListParamsResponseDto>;
        /**
         * CreateMarkdownDescription
         *
         * @author  TFeik
         * @date    13.07.2023
         *
         * @returns {JQuery.Promise<string>}
         */
        static CreateMarkdownDescription(isl: Isl.Client): JQuery.Promise<string>;
        /**
         * Rozšíří gridformat o sloupečky pro dokument.
         *
         * @author  TFeik
         * @date    14.05.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat dokumentu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce dokumentu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, isl: Isl.Client, columns?: GDokumentColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro dokument.
         *
         * Před jejím voláním je nutné provést inicializaci GDokumentIsl pomocí fukce GDokumentIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Dokument.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GDokumentGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Dokument.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat dokumentu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce dokumentu.
         */
        static AddGridColumnsImmediate<TRow>(columnParams: Interface.GDokumentGetColumnParamsResponseDto, gridFormat: Data.GridFormat<TRow>, columns?: GDokumentColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.VlastnikFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.VlastnikAgendovyFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.TypAgendy, subentityColumnName: Gin.WebClient.GTypAgendyColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.ZmenuProvedl, subentityColumnName: Gin.WebClient.GZmenuProvedlColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.Sslstyp, subentityColumnName: Gin.WebClient.GTypDokumentuColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.SkartacniZnak, subentityColumnName: Wfl.WebClient.GSkartacniZnakColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.SpisovyZnak, subentityColumnName: Wfl.WebClient.GSpisovyZnakColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.SpisovyPlan, subentityColumnName: Wfl.WebClient.GSpisovyPlanColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.VlastnikSpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.VlastnikAgendovySpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.UzivatelskaPoznamka, subentityColumnName: Wfl.WebClient.GUzivatelskaPoznamkaColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.UlozenoListu, subentityColumnName: Wfl.WebClient.GWfldulpColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.UrovenPristupu, subentityColumnName: Gin.WebClient.GUrovenPristupuColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.TypSpousteciUdalosti, subentityColumnName: Gin.WebClient.GTypSpousteciUdalostiColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.Resitel, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.Schvalovatel, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.Spis, subentityColumnName: WebClient.GSpisColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.SpisPrirazeny, subentityColumnName: WebClient.GSpisColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.Redistribuce, subentityColumnName: Wfl.WebClient.GRedistribuceColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.HistorieRedistribuce, subentityColumnName: Wfl.WebClient.GWflhupiColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.Wflszne, subentityColumnName: Wfl.WebClient.GWflszneColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.VecnaSkupina, subentityColumnName: Gin.WebClient.GVecnaSkupinaColumnNames): GDokumentColumnNames;
        static CreateSubcolumnName(scope: Interface.GDokumentDtoNames.Doruceni, subentityColumnName: Wfl.WebClient.GProfilDoruceniColumnNames): GDokumentColumnNames;
    }
    type GDokumentSubentityNames = Interface.GDokumentDtoNames.VlastnikFunkce | Interface.GDokumentDtoNames.TypAgendy | Interface.GDokumentDtoNames.VlastnikAgendovyFunkce | Interface.GDokumentDtoNames.ZmenuProvedl | Interface.GDokumentDtoNames.Sslstyp | Interface.GDokumentDtoNames.SkartacniZnak | Interface.GDokumentDtoNames.SpisovyZnak | Interface.GDokumentDtoNames.SpisovyPlan | Interface.GDokumentDtoNames.VlastnikSpisovyUzel | Interface.GDokumentDtoNames.VlastnikAgendovySpisovyUzel | Interface.GDokumentDtoNames.UzivatelskaPoznamka | Interface.GDokumentDtoNames.Redistribuce | Interface.GDokumentDtoNames.HistorieRedistribuce | Interface.GDokumentDtoNames.UlozenoListu | Interface.GDokumentDtoNames.UrovenPristupu | Interface.GDokumentDtoNames.TypSpousteciUdalosti | Interface.GDokumentDtoNames.Doruceni | Interface.GDokumentDtoNames.HistorieZmen | Interface.GDokumentDtoNames.Wflszne | Interface.GDokumentDtoNames.VecnaSkupina | Interface.GDokumentDtoNames.Resitel | Interface.GDokumentDtoNames.Schvalovatel | Interface.GDokumentDtoNames.Spis | Interface.GDokumentDtoNames.SpisPrirazeny;
    interface CreateSourceDokumentInput extends CreateSourceSslInput<Interface.GDokumentDto, Interface.GDokumentFilterDto, GDokumentColumnNames, GDokumentFieldNames, string, GDokumentIslFieldsOptions> {
    }
    interface CustomListParamsDokumentTemp extends CustomListParamsTemp<Interface.GDokumentGetCustomListParamsRequestDto, Interface.GDokumentGetCustomListParamsResponseDto> {
    }
    class GDokumentIslMenuParams {
        static Detail(): MenuParams;
        static DetailDoNoveZalozky(): MenuParams;
        static Podani(): MenuParams;
        static Redistribuce(contentId: string): MenuParams;
        static Metadata(typDok: Wfl.WebClient.GTypPisemnosti): MenuParams;
        static ElektronickyDokument(): MenuParams;
        static PodpisovaKniha(): MenuParams;
        static ZmenitStavVyridit(): MenuParams;
        static ExterniAgendy(): MenuParams;
        static KlicovaSlova(): MenuParams;
        static Baliky(): MenuParams;
        static Tisk(): MenuParams;
    }
    class GDokumnetIslColumnsPreset {
        static Base(): GDokumentColumnNames[];
        static CiziIdentifikatory(): GDokumentColumnNames[];
        static Priznaky(): GDokumentColumnNames[];
        static UzivatelskeSloupce(): GDokumentColumnNames[];
        /**
         * Obsahuje základní informace (Base) a cizí identifikátory (CiziIdetfikatory).
         *
         * @returns {GDokumentColumnNames[]}
         */
        static Eko(): GDokumentColumnNames[];
    }
}
declare namespace Gordic.Ssl.WebClient {
    type GPreruseniSpisuColumnNames = 'ixp_spis' | 'por_cislo' | 'duvod' | 'poznamka' | 'dat_od' | 'dat_do' | 'ixs_zmp_zal';
    type GPreruseniSpisuFieldNames = 'ixp_spis' | 'por_cislo' | 'duvod' | 'poznamka' | 'dat_od' | 'dat_do' | 'ixs_zmp_zal';
    class GPreruseniSpisuIsl {
        static Init(columns: Gin.WebClient.Names<GPreruseniSpisuColumnNames>, fields: Gin.WebClient.Names<GPreruseniSpisuFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GPreruseniSpisuColumnNames>, fields: Gin.WebClient.Names<GPreruseniSpisuFieldNames>): boolean;
        private static CanAddColumn;
        private static addGridFormat;
        /**
         * createGridFormat<TRow = Interface.GUzivatelskaPoznamkaDto>
         *
         * @author  RTomes
         * @date    01.02.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} input
         * @param {Data.GridFormat<TRow>} [gridFormat]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {Data.GridFormat<TRow>}
         */
        static createGridFormat<TRow = Interface.GSsldospDto>(gridFormat?: Data.GridFormat<TRow>, columns?: GPreruseniSpisuColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * @author  RTomes
         * @date    01.02.2023
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat wflspidu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GPreruseniSpisuColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro typ agendy.
         *
         * Před jejím voláním je nutné provést inicializaci GUzivatelskaPoznamkaIsl pomocí fukce GUzivatelskaPoznamkaIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         *
         * @author  RTomes
         * @date    01.02.2023
         *
         * @param {Interface.GWflspidGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Wflspid.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Wfl.WebClient.Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat wflspidu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce wflspidu.
         */
        static AddGridColumnsImmediate<TRow>(gridFormat: Data.GridFormat<TRow>, columns?: GPreruseniSpisuColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        static AddFilterFields(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GPreruseniSpisuFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddFilterFieldsImmediate(input: {
            form?: Forms.Form | null;
            initialValues?: any | null;
            fields?: GPreruseniSpisuFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
        static createFilterForm(form?: Forms.Form | null, initialValues?: any | null, fields?: GPreruseniSpisuFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null): Forms.Form;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            initialValues?: any | null;
            fields?: GPreruseniSpisuFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
        }): Forms.Form;
    }
}
declare namespace Gordic.Ssl.WebClient {
    type GPripominkaPripominkovehoRizeniColumnNames = 'pid_eklep' | 'ixp_vyriz_eklep' | 'akt_znacka' | 'typ_pripominky_txt' | 'dat_vytvoreni' | 'dat_zmena' | 'zmenu_prov' | 'pid_eklep_pripomin';
    type GPripominkaPripominkovehoRizeniFieldNames = 'pid_eklep' | 'ixp_vyriz_eklep' | 'akt_znacka' | 'typ_pripominky' | 'dat_vytvoreni' | 'dat_zmena' | 'zmenu_prov' | 'pid_eklep_pripomin';
    type GPripominkaPripominkovehoRizeniNames = Interface.GSslsoekDtoNames.PripominkoveRizeniZpracovane;
    interface GPripominkaPripominkovehoRizeniFieldsOptions {
        pid_eklep_pripomin?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_vyriz_eklep?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        pid_eklep?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        akt_znacka?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        typ_pripominky?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslcektEnum, Ginis.DbModel.GSslcektDto>>;
        dat_vytvoreni?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        dat_zmena?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        zmenu_prov?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
    }
    class GPripominkaPripominkovehoRizeniIsl {
        /**
         * createGridFormat
         *
         * @author  TFeik
         * @date    02.10.2024
         *
         * @param {GPripominkaPripominkovehoRizeniColumnNames[] | 'all'} [columns]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @param {Interface.GSpisGetColumnParamsResponseDto | null} [spisParams]
         * @returns {Data.GridFormat<Interface.GSslsoekDto>}
         */
        static createGridFormat(columns?: GPripominkaPripominkovehoRizeniColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, spisParams?: Interface.GSpisGetColumnParamsResponseDto | null): Data.GridFormat<Interface.GSslsoekDto>;
        private static CanAddColumn;
        /**
         * addGridFormat
         *
         * @author  TFeik
         * @date    02.10.2024
         *
         * @param {Data.GridFormat<TRow>} gridFormat
         * @param {Gin.WebClient.AddMode} addMode
         * @param {GPripominkaPripominkovehoRizeniColumnNames[] | 'all'} [columns]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @param {Interface.GSpisGetColumnParamsResponseDto | null} [spisParams]
         * @returns {Data.GridFormat<TRow>}
         */
        static addGridFormat<TRow = Interface.GSslsoekDto>(gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GPripominkaPripominkovehoRizeniColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, spisParams?: Interface.GSpisGetColumnParamsResponseDto | null): Data.GridFormat<TRow>;
        static CreateSubcolumnName(scope: Interface.GSslsoekDtoNames.PripominkoveRizeniZpracovane, subentityColumnName: WebClient.GPripominkoveRizeniZpracovaneColumnNames): GPripominkaPripominkovehoRizeniColumnNames;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            addMode: Gin.WebClient.AddMode;
            fields?: GPripominkaPripominkovehoRizeniFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            fieldsOptions?: GPripominkaPripominkovehoRizeniFieldsOptions | null;
        }): Forms.Form;
        static createFilterForm(fields?: GPripominkaPripominkovehoRizeniFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null, fieldsOptions?: GPripominkaPripominkovehoRizeniFieldsOptions | null): Forms.Form;
    }
}
declare namespace Gordic.Ssl.WebClient {
    type GPripominkoveRizeniZpracovaneColumnNames = 'pid_eklep' | 'ixp_doc' | 'ixp_spis' | 'ixp_vyriz_eklep' | 'dat_vytvoreni' | 'dat_rev_proc_start' | 'dat_rev_proc_finis' | 'dat_discarded' | 'idno_ext' | 'title' | 'description' | 'dat_modified' | 'dat_zmena' | 'zmenu_prov' | 'typ_materialu_txt' | 'stav_materialu_txt' | 'stav_rizeni_txt' | 'priz_vznik_ginis' | 'mandate' | 'KeyWordsTxt' | 'LawAreasTxt';
    type GPripominkoveRizeniZpracovaneFieldNames = 'pid_eklep' | 'ixp_doc' | 'ixp_spis' | 'ixp_vyriz_eklep' | 'stav_rizeni' | 'dat_vytvoreni' | 'dat_rev_proc_start' | 'dat_rev_proc_finis' | 'dat_discarded' | 'idno_ext' | 'typ_materialu' | 'title' | 'description' | 'stav_materialu' | 'dat_modified' | 'dat_zmena' | 'zmenu_prov' | 'priz_vznik_ginis' | 'mandate';
    type GPripominkoveRizeniZpracovaneNames = Interface.GSslseklDtoNames.Spis | Interface.GSslseklDtoNames.DokumentIniciacni;
    interface GPripominkoveRizeniZpracovaneFieldsOptions {
        pid_eklep?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_doc?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_spis?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_vyriz_eklep?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        stav_rizeni?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslceksEnum, Ginis.DbModel.GSslceksDto>>;
        dat_vytvoreni?: Wfl.WebClient.GWflspidIslGDateComboBoxOptions;
        dat_rev_proc_start?: Wfl.WebClient.GWflspidIslGDateComboBoxOptions;
        dat_rev_proc_finis?: Wfl.WebClient.GWflspidIslGDateComboBoxOptions;
        dat_discarded?: Wfl.WebClient.GWflspidIslGDateComboBoxOptions;
        idno_ext?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        title?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        typ_materialu?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslcekmEnum, Ginis.DbModel.GSslcekmDto>>;
        description?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        stav_materialu?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslcekeEnum, Ginis.DbModel.GSslcekeDto>>;
        dat_modified?: Wfl.WebClient.GWflspidIslGDateComboBoxOptions;
        priz_vznik_ginis?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GGincpanEnum, Ginis.DbModel.GGincpanDto>>;
        mandate?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        dat_zmena?: Wfl.WebClient.GWflspidIslGDateComboBoxOptions;
        zmenu_prov?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
    }
    class GPripominkoveRizeniZpracovaneIsl {
        static GetSslceksEnumIconTemplate(value?: Gordic.Ginis.DbModel.GSslceksEnum | null): IconTemplate;
        static GetGincpanEnumIconTemplate(value?: Gordic.Ginis.DbModel.GGincpanEnum | null): IconTemplate;
        /**
         * createGridFormat
         *
         * @author  TFeik
         * @date    02.10.2024
         *
         * @param {GPripominkoveRizeniZpracovaneColumnNames[] | 'all'} [columns]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @param {Interface.GSpisGetColumnParamsResponseDto | null} [spisParams]
         * @returns {Data.GridFormat<Interface.GSslseklDto>}
         */
        static createGridFormat(columns?: GPripominkoveRizeniZpracovaneColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, spisParams?: Interface.GSpisGetColumnParamsResponseDto | null): Data.GridFormat<Interface.GSslseklDto>;
        private static CanAddColumn;
        /**
         * addGridFormat
         *
         * @author  TFeik
         * @date    02.10.2024
         *
         * @param {Data.GridFormat<TRow>} gridFormat
         * @param {Gin.WebClient.AddMode} addMode
         * @param {GPripominkoveRizeniZpracovaneColumnNames[] | 'all'} [columns]
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @param {Interface.GSpisGetColumnParamsResponseDto | null} [spisParams]
         * @returns {Data.GridFormat<TRow>}
         */
        static addGridFormat<TRow = Interface.GSslseklDto>(gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GPripominkoveRizeniZpracovaneColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, spisParams?: Interface.GSpisGetColumnParamsResponseDto | null): Data.GridFormat<TRow>;
        static CreateSubcolumnName(scope: Interface.GSslseklDtoNames.Spis, subentityColumnName: WebClient.GSpisColumnNames): GPripominkoveRizeniZpracovaneColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslseklDtoNames.DokumentIniciacni, subentityColumnName: WebClient.GDokumentColumnNames): GPripominkoveRizeniZpracovaneColumnNames;
        private static CanAddField;
        static addFilterForm(input: {
            form: Forms.Form;
            addMode: Gin.WebClient.AddMode;
            fields?: GPripominkoveRizeniZpracovaneFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            fieldsOptions?: GPripominkoveRizeniZpracovaneFieldsOptions | null;
            userSettings?: Gordic.Data.IGStorage | null;
        }): Forms.Form;
        static createFilterForm(fields?: GPripominkoveRizeniZpracovaneFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null, fieldsOptions?: GPripominkoveRizeniZpracovaneFieldsOptions | null, userSettings?: Gordic.Data.IGStorage | null): Forms.Form;
    }
}
declare namespace Gordic.Ssl.WebClient {
    type GSpisColumnNames = GSslspidColumnNames | 'sslden' | 'por_cislo' | 'cj_ext' | 'ixp_init' | 'ixp_vyriz' | 'ixs_su' | 'pocet_pis' | 'pocet_vlozenych_dok' | 'ixp_prior' | 's_prior' | 'kl_slova' | 'zp_vyriz' | 'stav_spis' | 'odeslano_listu' | 'ulozeno_listu' | 'sv_priloh' | 'velikost_el' | 'ixs_tss' | 'ixp_nad' | 'ixp_top_slozka' | 'ixs_zmp_zal' | 'dat_zal' | 'znacka_odes' | 'zkratka_su' | 'termin_spis_ico' | 'preruseno_duvod' | 'preruseno_dat_do' | 'DatumPodaniIniciacnihoDokumentu';
    type GSpisFieldNames = GSslspidFieldNames | 'sslden' | 'por_cislo' | 'cj_ext' | 'ixp_init' | 'ixp_vyriz' | 'ixs_su' | 'pocet_pis' | 'pocet_vlozenych_dok' | 'ixp_prior' | 's_prior' | 'kl_slova' | 'zp_vyriz' | 'stav_spis' | 'odeslano_listu' | 'ulozeno_listu' | 'sv_priloh' | 'velikost_el' | 'ixs_tss' | 'ixp_nad' | 'ixp_top_slozka' | 'ixs_zmp_zal' | 'dat_zal' | 'znacka_odes' | 'zkratka_su' | 'dat_vyriz_do_sslsdcj' | 'priz_akt';
    type GSpisPreviewIds = GSslspidPreviewIds;
    interface GSpisIslFieldsOptions extends GSslspidIslFieldsOptions {
        sslden?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        por_cislo?: Wfl.WebClient.GWflspidIslGNumberBoxOptions;
        cj_ext?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_init?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_vyriz?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixs_su?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        zkratka_su?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        pocet_pis?: Wfl.WebClient.GWflspidIslGNumberBoxOptions;
        pocet_vlozenych_dok?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        dat_zal?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        ixs_zmp_zal?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        znacka_odes?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_prior?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        s_prior?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslcsprEnum, Ginis.DbModel.GSslcsprDto>>;
        kl_slova?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        zp_vyriz?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        stav_spis?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslcspiEnum, Ginis.DbModel.GSslcspiDto>>;
        odeslano_listu?: Wfl.WebClient.GWflspidIslGNumberBoxOptions;
        ulozeno_listu?: Wfl.WebClient.GWflspidIslGNumberBoxOptions;
        sv_priloh?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        velikost_el?: Wfl.WebClient.GWflspidIslGNumberBoxOptions;
        ixs_tss?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_nad?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixp_top_slozka?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        dat_vyriz_do_sslsdcj?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        priz_akt?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
    }
    class GSpisIsl {
        private static IconColumnEnums?;
        /**
         * Vrátí ikonu pro Příznak priorace spisu.
         *
         * @author  TFeik
         * @date    22.12.2021
         *
         * @param {Gordic.Ginis.DbModel.GSslcsprEnum | null} [value]
         * @returns string
         */
        static GetSslcsprEnumIcon(value?: Gordic.Ginis.DbModel.GSslcsprEnum | null): string;
        /**
         * Vrátí ikonu pro Stav spisu.
         *
         * @author  TFeik
         * @date    22.12.2021
         *
         * @param {Gordic.Ginis.DbModel.GSslcspiEnum | null} [value]
         * @returns {string}
         */
        static GetSslcspiEnumIcon(value?: Gordic.Ginis.DbModel.GSslcspiEnum | null): string;
        static Init(columns: GSpisColumnNames[] | 'all' | undefined | null | false, fields: GSpisFieldNames[] | 'all' | undefined | null | false): JQuery.Promise<void>;
        static IsInitiated(columns: GSpisColumnNames[] | 'all' | undefined | null | false, fields: GSpisFieldNames[] | 'all' | undefined | null | false): boolean;
        private static loadEnums;
        private static CanAddColumn;
        /**
         * addDokumentGridFormat
         *
         * @author  TFeik
         * @date    19.10.2021
         *
         * @param {Data.GridFormat<Interface.GSpisDto>} gridFormat
         * @param {Interface.GSpisDto.FRAGMENT[]} [fragments]
         * @returns {Data.GridFormat<Interface.GSpisDto>}
         */
        static addSpisGridFormat<TRow = Interface.GSpisDto>(gridFormat: Data.GridFormat<TRow>, addMode: Gin.WebClient.AddMode, columns?: GSpisColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * createGridFormat
         *
         * @author  TFeik
         * @date    19.10.2021
         *
         * @returns {Data.GridFormat<Interface.GSpisDto>}
         */
        static createGridFormat<TRow = Interface.GSpisDto>(input: Interface.GSpisGetColumnParamsResponseDto, gridFormat?: Data.GridFormat<TRow>, columns?: GSpisColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        static AddSpisFilterFields(input: {
            content: GContent;
            form?: Forms.Form | null;
            initialValues?: Interface.GSpisFilterDto | null;
            fields?: GSpisFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput;
            fieldsOptions: GSpisIslFieldsOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddSpisFilterFieldsImmediate(input: {
            content: GContent;
            params: Wfl.Interface.GWflspidGetFilterParamsResponseDto;
            form?: Forms.Form | null;
            initialValues?: Interface.GSpisFilterDto | null;
            fields?: GSpisFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput;
            fieldsOptions: GSpisIslFieldsOptions | null;
        }): Forms.Form;
        private static CanAddField;
        static addSpisFilterForm(input: {
            content: GContent;
            form: Forms.Form;
            initialValues?: Interface.GSpisFilterDto | null;
            fields?: GSpisFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            addMode: Gin.WebClient.AddMode;
            fieldsOptions?: GSpisIslFieldsOptions | null;
        }): Forms.Form;
        static createFilterForm(content: GContent, params: Interface.GSslspidGetCustomListParamsResponseDto, form?: Forms.Form | null, initialValues?: Interface.GSpisFilterDto | null, fields?: GSpisFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null, datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput, fieldsOptions?: GSpisIslFieldsOptions | null): Forms.Form;
        /**
         * Vrátí objekt pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapper<Interface.GSpisDto>}
         */
        static createActionPermissionMapper(): CustomView.ActionPermissionMapper<Interface.GSpisDto>;
        /**
         * Vrátí jednotlivé položky objektu pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapperItem<Interface.GSpisDto>[]}
         */
        static createActionPermissionMapperItems(): CustomView.ActionPermissionMapperItem<Interface.GSpisDto>[];
        static createActionList(input: JQuery.Promise<CustomView.GContentCustomReadyArgs<Interface.GSpisDto, Interface.GSpisFilterDto>>, params: Interface.GSslspidGetCustomListParamsResponseDto, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider, 
        /**
         * Identifikátor poznámkového bloku (pro akci přidat do poznámkového bloku). Pokud není vyplněn, pak se akce nepřidá.
         * @type {string}
         */
        ixsBlp?: string): GActionList;
        /**
         * Vytvoří funkci upravující gridFormat před vytvořením dle contentu (userSettings).
         *
         * @author  TFeik
         * @date    05.01.2022
         *
         * @param {Data.GridFormat<Interface.GSpisDto>} gridFormatOrigin
         * @param {CustomView.GContentDlg<Interface.GSpisDto>} content
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {JQuery.Promise<Data.GridFormat<Interface.GSpisDto>>}
         */
        static createUpdateGridFormat(gridFormatOrigin: Data.GridFormat<Interface.GSpisDto>, content: CustomView.GContentDlg<Interface.GSpisDto, Interface.GSpisFilterDto>, scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<Interface.GSpisDto>>;
        static createPreviewItems(input: Interface.GSpisGetCustomListParamsResponseDto): CustomView.CustomViewPreviewItemOptions<Interface.GSpisDto, GSpisPreviewIds>[];
        private static CustomListParamsTemp?;
        private static CanUseCustomListParamsTemp;
        static GetCustomListParams(isl: Isl.Client, requestData: Interface.GSpisGetCustomListParamsRequestDto): JQuery.Promise<Interface.GSpisGetCustomListParamsResponseDto>;
        static CreateSource(input: CreateSourceSpisInput): JQuery.Promise<Gordic.CustomView.Source<Interface.GSpisDto, Interface.GSpisFilterDto, GSpisPreviewIds>>;
        /**
         * Rozšíří gridformat o sloupečky pro dokument.
         *
         * @author  TFeik
         * @date    14.05.2021
         *
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} scopeOptions Nastavení zanoření dat dokumentu.
         * @returns {JQuery.Promise<Data.GridFormat<TRow>>} Původní gridFormat rozšířený o sloupce dokumentu.
         */
        static AddGridColumns<TRow>(gridFormat: Data.GridFormat<TRow>, isl: Isl.Client, columns?: GSpisColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<TRow>>;
        /**
         * Rozšíří gridformat o sloupečky pro spis.
         *
         * Před jejím voláním je nutné provést inicializaci GSpisIsl pomocí fukce GSpisIsl.init()
         * a předat parametry, které lze načíst pomocí Gordic.Isl.Spis.getColumnParams().getData().
         *
         * @author  TFeik
         * @date    19.05.2021
         *
         * @param {Interface.GSpisGetColumnParamsResponseDto} columnParams Parametry načtené pomocí Gordic.Isl.Spis.getColumnParams().getData().
         * @param {Data.GridFormat<TRow>} gridFormat GridFormat, do kterého budou sloupce vloženy.
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions] Nastavení zanoření dat spisu.
         * @returns {Data.GridFormat<TRow>} Původní gridFormat rozšířený o sloupce spisu.
         */
        static AddGridColumnsImmediate<TRow>(columnParams: Interface.GSpisGetColumnParamsResponseDto, gridFormat: Data.GridFormat<TRow>, columns?: GSpisColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.VlastnikFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.VlastnikAgendovyFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.TypAgendy, subentityColumnName: Gin.WebClient.GTypAgendyColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.ZmenuProvedl, subentityColumnName: Gin.WebClient.GZmenuProvedlColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.Sslstyp, subentityColumnName: Gin.WebClient.GTypDokumentuColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.SkartacniZnak, subentityColumnName: Wfl.WebClient.GSkartacniZnakColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.SpisovyZnak, subentityColumnName: Wfl.WebClient.GSpisovyZnakColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.SpisovyPlan, subentityColumnName: Wfl.WebClient.GSpisovyPlanColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.VlastnikSpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.VlastnikAgendovySpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.UzivatelskaPoznamka, subentityColumnName: Wfl.WebClient.GUzivatelskaPoznamkaColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.UlozenoListu, subentityColumnName: Wfl.WebClient.GWfldulpColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.UrovenPristupu, subentityColumnName: Gin.WebClient.GUrovenPristupuColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.TypSpousteciUdalosti, subentityColumnName: Gin.WebClient.GTypSpousteciUdalostiColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.Resitel, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.Schvalovatel, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.Spis, subentityColumnName: WebClient.GSpisColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.SpisPrirazeny, subentityColumnName: WebClient.GSpisColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.Redistribuce, subentityColumnName: Wfl.WebClient.GRedistribuceColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.Wflszne, subentityColumnName: Wfl.WebClient.GWflszneColumnNames): GSpisColumnNames;
        static CreateSubcolumnName(scope: Interface.GSpisDtoNames.VecnaSkupina, subentityColumnName: Gin.WebClient.GVecnaSkupinaColumnNames): GSpisColumnNames;
    }
    type GSpisSubentityNames = Interface.GSpisDtoNames.VlastnikFunkce | Interface.GSpisDtoNames.TypAgendy | Interface.GSpisDtoNames.VlastnikAgendovyFunkce | Interface.GSpisDtoNames.ZmenuProvedl | Interface.GSpisDtoNames.Sslstyp | Interface.GSpisDtoNames.SkartacniZnak | Interface.GSpisDtoNames.SpisovyZnak | Interface.GSpisDtoNames.SpisovyPlan | Interface.GSpisDtoNames.VlastnikSpisovyUzel | Interface.GSpisDtoNames.VlastnikAgendovySpisovyUzel | Interface.GSpisDtoNames.UzivatelskaPoznamka | Interface.GSpisDtoNames.Redistribuce | Interface.GSpisDtoNames.UlozenoListu | Interface.GSpisDtoNames.UrovenPristupu | Interface.GSpisDtoNames.TypSpousteciUdalosti | Interface.GSpisDtoNames.Wflszne | Interface.GSpisDtoNames.VecnaSkupina | Interface.GSpisDtoNames.Resitel | Interface.GSpisDtoNames.Schvalovatel | Interface.GSpisDtoNames.Spis | Interface.GSpisDtoNames.SpisPrirazeny;
    interface CreateSourceSpisInput extends CreateSourceSslInput<Interface.GSpisDto, Interface.GSpisFilterDto, GSpisColumnNames, GSpisFieldNames, string, GSpisIslFieldsOptions> {
    }
    interface CustomListParamsSpisTemp extends CustomListParamsTemp<Interface.GSpisGetCustomListParamsRequestDto, Interface.GSpisGetCustomListParamsResponseDto> {
    }
    class GSpisIslMenuParams {
        static Detail(): MenuParams;
        static DetailDoNoveZalozky(): MenuParams;
        static Podani(): MenuParams;
        static Redistribuce(contentId: string): MenuParams;
        static Metadata(): MenuParams;
        static ElektronickyDokument(): MenuParams;
        static PodpisovaKniha(): MenuParams;
        static ZmenitStavVyridit(): MenuParams;
        static ExterniAgendy(): MenuParams;
        static KlicovaSlova(): MenuParams;
        static Baliky(): MenuParams;
    }
}
declare namespace Gordic.Ssl.WebClient {
    type GSslspidColumnNames = Wfl.WebClient.GWflspidColumnNames | 'obsah_text' | 'poznamka' | 'poc_kopii' | 'dat_prij_pod' | 'ixs_su_pod' | 'dat_evid' | 'cj_spis' | 'odeslano_kam' | 's_resitel' | 'ixs_fun_resitel' | 's_vyriz' | 'typ_vyriz' | 'vyriz_komu' | 'vyriz_pozn' | 'ixs_zmp_vyriz' | 'ixs_fun_schval' | 'ixs_zmp_schval' | 's_uzav' | 'dat_uzav' | 'ixs_zmp_uzav' | 's_stor' | 's_ztrat' | 'vztah_spis' | 's_orig' | 'pr_moc' | 'dat_pr_moc' | 's_agp' | 's_zastav' | 'obsah_text_pro_seznam' | 'SSchvalSsl' | 'PorCisloVSpisu' | 'dat_vykonav' | 'IdentifikatorOriginalu' | 'IxpPoslednihoSpisu' | 'VMinulostiVeSpisu';
    type GSslspidFieldNames = Wfl.WebClient.GWflspidFieldNames | 'obsah_text' | 'poznamka' | 'poc_kopii' | 'dat_prij_pod' | 'ixs_su_pod' | 'dat_evid' | 'cj_spis' | 'odeslano_kam' | 's_resitel' | 'ixs_fun_resitel' | 's_vyriz' | 'typ_vyriz' | 'vyriz_komu' | 'vyriz_pozn' | 'ixs_zmp_vyriz' | 'ixs_fun_schval' | 'ixs_zmp_schval' | 's_uzav' | 'dat_uzav' | 'ixs_zmp_uzav' | 's_stor' | 's_ztrat' | 'vztah_spis' | 's_orig' | 'pr_moc' | 'dat_pr_moc' | 's_agp' | 's_zastav' | 'Subjekt' | 'dat_vykonav';
    interface GSslspidIslFieldsOptions extends Wfl.WebClient.GWflspidIslFieldsOptions {
        obsah_text?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        poznamka?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        poc_kopii?: Wfl.WebClient.GWflspidIslGNumberBoxOptions;
        dat_prij_pod?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        ixs_su_pod?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        dat_evid?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        cj_spis?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        odeslano_kam?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        s_resitel?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        ixs_fun_resitel?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        s_vyriz?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        typ_vyriz?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslctvyEnum, Ginis.DbModel.GSslctvyDto>>;
        vyriz_komu?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        vyriz_pozn?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixs_zmp_vyriz?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixs_fun_schval?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        ixs_zmp_schval?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        s_uzav?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        dat_uzav?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        ixs_zmp_uzav?: Wfl.WebClient.GWflspidIslGStringBoxOptions;
        s_stor?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        s_ztrat?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        vztah_spis?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Ginis.DbModel.GEnumMetaDto<Ginis.DbModel.GSslcvspEnum, Ginis.DbModel.GSslcvspDto>>;
        s_orig?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        pr_moc?: Wfl.WebClient.GWflspidIslGNumberBoxOptions;
        dat_pr_moc?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
        s_agp?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        s_zastav?: Wfl.WebClient.GWflspidIslGSelectBoxOptions<Widget.selectboxData<number>>;
        dat_vykonav?: Wfl.WebClient.GWflspidIslGDateBoxOptions;
    }
    type GSslspidPreviewIds = 'elObraz' | 'userNote';
    class GSslspidIsl {
        private static IconColumnEnums?;
        static Init(columns: Gin.WebClient.Names<GSslspidColumnNames>, fields: Gin.WebClient.Names<GSslspidFieldNames>): JQuery.Promise<void>;
        static IsInitiated(columns: Gin.WebClient.Names<GSslspidColumnNames>, fields: Gin.WebClient.Names<GSslspidFieldNames>): boolean;
        private static loadEnums;
        static GetSslctvyEnumIcon(value?: Gordic.Ginis.DbModel.GSslctvyEnum | null): string;
        static GetSslcvspEnumIcon(value?: Gordic.Ginis.DbModel.GSslcvspEnum | null): string;
        private static CanAddColumn;
        /**
         * addSslspidGridFormat
         *
         * @author  TFeik
         * @date    02.09.2020
         *
         * @param {Data.GridFormat<Interface.GDokumentDto>} gridFormat
         * @param {Interface.GDokumentDto.FRAGMENT[]} [fragments]
         * @returns {Data.GridFormat<Interface.GDokumentDto>}
         */
        static addSslspidGridFormat<TRow = Interface.GDokumentDto>(gridFormat: Data.GridFormat<TRow>, typPisemnosti: Wfl.WebClient.GTypPisemnosti, columnParams: Interface.GSslspidGetCustomListParamsResponseDto, addMode: Gin.WebClient.AddMode, columns?: GSslspidColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions): Data.GridFormat<TRow>;
        /**
         * createGridFormat
         *
         * @author  TFeik
         * @date    02.09.2020
         *
         * @returns {Data.GridFormat<Interface.GDokumentDto>}
         */
        static createGridFormat<TRow = Interface.GDokumentDto>(input: Interface.GSslspidGetCustomListParamsResponseDto, typPisemnosti: Wfl.WebClient.GTypPisemnosti, gridFormat?: Data.GridFormat<TRow>, columns?: GSslspidColumnNames[] | 'all', scopeOptions?: Gin.WebClient.GScopeOptions, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider): Data.GridFormat<TRow>;
        static AddSslspidFilterFields(input: {
            content: GContent;
            form?: Forms.Form | null;
            initialValues?: Interface.GDokumentFilterDto | null;
            fields?: GSslspidFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            typPisemnosti: Wfl.WebClient.GTypPisemnosti;
            datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput;
            fieldsOptions: GSslspidIslFieldsOptions | null;
        }): JQuery.Promise<Forms.Form>;
        static AddSslspidFilterFieldsImmediate(input: {
            content: GContent;
            params: Wfl.Interface.GWflspidGetFilterParamsResponseDto;
            form?: Forms.Form | null;
            initialValues?: Interface.GDokumentFilterDto | null;
            fields?: GSslspidFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            typPisemnosti: Wfl.WebClient.GTypPisemnosti;
            datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput;
            fieldsOptions: GSslspidIslFieldsOptions | null;
        }): Forms.Form;
        private static CanAddField;
        static addSslspidFilterForm(input: {
            content: GContent;
            form: Forms.Form;
            typPisemnosti: Wfl.WebClient.GTypPisemnosti;
            addMode: Gin.WebClient.AddMode;
            initialValues?: Interface.GSslspidFilterDto | null;
            fields?: GSslspidFieldNames[] | 'all' | null;
            scope?: Gin.WebClient.GScopeOptions | null;
            fieldsOptions?: GSslspidIslFieldsOptions | null;
        }): Forms.Form;
        static createFilterForm(content: GContent, params: Interface.GSslspidGetCustomListParamsResponseDto, typPisemnosti: Wfl.WebClient.GTypPisemnosti, form?: Forms.Form | null, initialValues?: Interface.GDokumentFilterDto | null, fields?: GSslspidFieldNames[] | 'all' | null, scope?: Gin.WebClient.GScopeOptions | null, datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput, fieldsOptions?: GSslspidIslFieldsOptions | null): Forms.Form;
        /**
         * Vrátí objekt pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapper<Interface.GSslspidDto>}
         */
        static createActionPermissionMapper(): CustomView.ActionPermissionMapper<Interface.GSslspidDto>;
        /**
         * Vrátí jednotlivé položky objektu pro mapování oprávnění na akce.
         *
         * @author  TFeik
         * @date    18.05.2023
         *
         * @returns {CustomView.ActionPermissionMapperItem<TDto>[]}
         */
        static createActionPermissionMapperItems<TDto extends Interface.GSslspidDto>(): CustomView.ActionPermissionMapperItem<TDto>[];
        static createActionList(input: JQuery.Promise<CustomView.GContentCustomReadyArgs<Interface.GSslspidDto, Interface.GSslspidFilterDto>>, params: Interface.GSslspidGetCustomListParamsResponseDto, typPisemnosti: Wfl.WebClient.GTypPisemnosti, groupResultProvider?: Wfl.Globals.ListSupport.IGroupResultProvider, 
        /**
         * Identifikátor poznámkového bloku (pro akci přidat do poznámkového bloku). Pokud není vyplněn, pak se akce nepřidá.
         * @type {string}
         */
        ixsBlp?: string): GActionList;
        private static DocumentDtosToIxps;
        static DocumentDtosToSelectedRowInfoDtos(documents: Interface.GDokumentDto[]): Wfl.Interface.SelectedRowInfoDto[];
        private static OznacDle;
        /**
         * createPreviews
         *
         * @author  TFeik
         * @date    16.12.2021
         *
         * @param {Wfl.WebClient.GTypPisemnosti} typPisemnosti
         * @returns {CustomView.CustomViewPreviewItemOptions<Interface.GSslspidDto>[]}
         */
        static createPreviewItems(typPisemnosti: Wfl.WebClient.GTypPisemnosti, input: Interface.GSslspidGetCustomListParamsResponseDto): CustomView.CustomViewPreviewItemOptions<Interface.GSslspidDto, GSslspidPreviewIds>[];
        /**
         * Vytvoří funkci upravující gridFormat před vytvořením dle contentu (userSettings).
         *
         * @author  TFeik
         * @date    05.01.2022
         *
         * @param {Data.GridFormat<Interface.GSslspidDto>} gridFormatOrigin
         * @param {CustomView.GContentDlg<Interface.GSslspidDto>} content
         * @param {Gin.WebClient.GScopeOptions} [scopeOptions]
         * @returns {JQuery.Promise<Data.GridFormat<Interface.GSslspidDto>>}
         */
        static createUpdateGridFormat(gridFormatOrigin: Data.GridFormat<Interface.GSslspidDto>, content: CustomView.GContentDlg<Interface.GSslspidDto, Interface.GSslspidFilterDto>, scopeOptions?: Gin.WebClient.GScopeOptions): JQuery.Promise<Data.GridFormat<Interface.GSslspidDto>>;
        /**
         * Vytvoří filtry z pole dat.
         *
         * @author  TFeik
         * @date    21.01.2022
         *
         * @param {Interface.GSslspidDto[]} data
         * @returns {Interface.GSslspidFilterDto | undefined | null}
         */
        static createRefreshRowFilters(data: Interface.GSslspidDto[]): Interface.GSslspidFilterDto | undefined | null;
        /**
         * Vrátí klíče pro sslspid.
         *
         * @author  TFeik
         * @date    21.01.2022
         *
         * @returns {Data.ViewKeys<Interface.GSslspidDto>}
         */
        static createDtoKey(): Data.ViewKeys<Interface.GSslspidDto>;
        /**
         * Po vyhlednání filterpanelu vymaže group result (pokud je povoleno).
         *
         * @author  TFeik
         * @date    16.12.2021
         *
         * @param {{ groupResultProvider: Wfl.Globals.ListSupport.IGroupResultProvider } & Pick<CreateSourceSslInput<any, any, string, string>} input
         */
        static AddGroupResultClearOnApply(input: {
            groupResultProvider: Wfl.Globals.ListSupport.IGroupResultProvider;
        } & Pick<CreateSourceSslInput<any, any, string, string>, 'clearGroupResultOnFilterpanelApply' | 'customContentReadyArgs'>): void;
        private static CustomListParamsTemp?;
        static CanUseCustomListParamsTemp(requestData: Interface.GSslspidGetCustomListParamsRequestDto, tempRequestData: Interface.GSslspidGetCustomListParamsRequestDto | undefined): boolean;
        static GetCustomListParams(isl: Isl.Client, requestData: Interface.GSslspidGetCustomListParamsRequestDto, includeSpis: boolean): JQuery.Promise<Interface.GSpisGetCustomListParamsResponseDto>;
        /**
         * CreateSource
         *
         * @author  TFeik
         * @date    16.12.2021
         *
         * @param {CreateSourceSslspidInput} input
         * @returns {JQuery.Promise<Gordic.CustomView.Source<Interface.GSslspidDto}
         */
        static CreateSource(input: CreateSourceSslspidInput): JQuery.Promise<Gordic.CustomView.Source<Interface.GSslspidDto, Interface.GSslspidFilterDto, GSslspidPreviewIds>>;
        static CreateListTask<TDto, TFilterDto>(input: {
            list: ((rq?: TFilterDto | Isl.CallParams<Isl.GServiceListRequest>) => Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<TDto>>);
            listBezKontrolyOpravneni: ((rq?: TFilterDto | Isl.CallParams<Isl.GServiceListRequest>) => Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<TDto>>);
            bezKontrolyOpravneni: boolean | undefined | null;
            hardServerFilter: Interface.GSslspidFilterDto | undefined | null;
        }): Gordic.Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<TDto>>;
        static UpdateOrCreateSubtaskSources<TCreateSourceSslInput extends CreateSourceSslInput<TDto, TFilterDto, any, any, TPreviewId, any>, TDto, TFilterDto, TPreviewId extends string>(input: {
            createSourceInput: TCreateSourceSslInput;
            list: ((rq?: TFilterDto | Isl.CallParams<Isl.GServiceListRequest>) => Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<TDto>>);
            listBezKontrolyOpravneni: ((rq?: TFilterDto | Isl.CallParams<Isl.GServiceListRequest>) => Isl._Task<Isl.GServiceListRequest, Isl.GServiceListResponse<TDto>>);
            bezKontrolyOpravneni: boolean | undefined | null;
        }): void;
        /**
         * ContainsSpisNames
         *
         * @author  TFeik
         * @date    08.03.2022
         *
         * @param {string[] | 'all' | undefined | null | false} names
         */
        static ContainsSpisNames(names: (string | undefined)[] | 'all' | undefined | null | false): boolean;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.VlastnikFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.VlastnikAgendovyFunkce, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.TypAgendy, subentityColumnName: Gin.WebClient.GTypAgendyColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.ZmenuProvedl, subentityColumnName: Gin.WebClient.GZmenuProvedlColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.Sslstyp, subentityColumnName: Gin.WebClient.GTypDokumentuColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.SkartacniZnak, subentityColumnName: Wfl.WebClient.GSkartacniZnakColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.SpisovyZnak, subentityColumnName: Wfl.WebClient.GSpisovyZnakColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.SpisovyPlan, subentityColumnName: Wfl.WebClient.GSpisovyPlanColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.VlastnikSpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.VlastnikAgendovySpisovyUzel, subentityColumnName: Gin.WebClient.GSpisovyUzelColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.UzivatelskaPoznamka, subentityColumnName: Wfl.WebClient.GUzivatelskaPoznamkaColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.UlozenoListu, subentityColumnName: Wfl.WebClient.GWfldulpColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.UrovenPristupu, subentityColumnName: Gin.WebClient.GUrovenPristupuColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.TypSpousteciUdalosti, subentityColumnName: Gin.WebClient.GTypSpousteciUdalostiColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.Resitel, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.Schvalovatel, subentityColumnName: Gin.WebClient.GFunkcniMistoColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.Spis, subentityColumnName: WebClient.GSpisColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.SpisPrirazeny, subentityColumnName: WebClient.GSpisColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.Redistribuce, subentityColumnName: Wfl.WebClient.GRedistribuceColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.Wflszne, subentityColumnName: Wfl.WebClient.GWflszneColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.VecnaSkupina, subentityColumnName: Gin.WebClient.GVecnaSkupinaColumnNames): GSslspidColumnNames;
        static CreateSubcolumnName(scope: Interface.GSslspidDtoNames.Doruceni, subentityColumnName: Wfl.WebClient.GProfilDoruceniColumnNames): GSslspidColumnNames;
    }
    type GSslspidSubentityNames = Interface.GSslspidDtoNames.VlastnikFunkce | Interface.GSslspidDtoNames.TypAgendy | Interface.GSslspidDtoNames.VlastnikAgendovyFunkce | Interface.GSslspidDtoNames.ZmenuProvedl | Interface.GSslspidDtoNames.Sslstyp | Interface.GSslspidDtoNames.SkartacniZnak | Interface.GSslspidDtoNames.SpisovyZnak | Interface.GSslspidDtoNames.SpisovyPlan | Interface.GSslspidDtoNames.VlastnikSpisovyUzel | Interface.GSslspidDtoNames.VlastnikAgendovySpisovyUzel | Interface.GSslspidDtoNames.UzivatelskaPoznamka | Interface.GSslspidDtoNames.Redistribuce | Interface.GSslspidDtoNames.UlozenoListu | Interface.GSslspidDtoNames.UrovenPristupu | Interface.GSslspidDtoNames.TypSpousteciUdalosti | Interface.GSslspidDtoNames.Doruceni | Interface.GSslspidDtoNames.Wflszne | Interface.GSslspidDtoNames.VecnaSkupina | Interface.GSslspidDtoNames.Resitel | Interface.GSslspidDtoNames.Schvalovatel | Interface.GSslspidDtoNames.Spis | Interface.GSslspidDtoNames.SpisPrirazeny;
    interface CreateSourceSslInput<TDto, TFilterDto, TGridColumnNames extends string, TFilterFields extends string, TPreviewId extends string = string, TFieldOptions = GSslspidIslFieldsOptions> extends Omit<CustomView.Source<TDto, TFilterDto, TPreviewId>, 'islTask' | 'filter' | 'gridFormat' | 'actionList' | 'previewItems' | 'updateGridFormat' | 'createRefreshRowFilters' | 'dtoKey'> {
        customContentReadyArgs: JQuery.Promise<CustomView.GContentCustomReadyArgs<TDto, TFilterDto>>;
        isl: Isl.Client;
        hardServerFilter?: TFilterDto;
        filterInitialValues?: TFilterDto;
        /**
         * (default: false) Příznak, zda se má použít seznam s kontrolou oprávnění [false], nebo bez kontroly [true].
         * @type {boolean}
         */
        bezKontrolyOpravneni?: boolean;
        availableGridColumns?: TGridColumnNames[] | 'all';
        availableFilterFields?: TFilterFields[] | 'all';
        /**
         * (deault: true) Příznak, zda se má po načtení dat (filterpanelapply) vymazat groupResult.
         * @type {boolean}
         */
        clearGroupResultOnFilterpanelApply?: boolean;
        /**
         * Identifikátory vlastnotí jejichž sloupce se mají přidat oddělené pajpou "|" (například: 'DEMO00V0AAU6|DEMO00V0AAV1|').
         * @type {string}
         */
        vlastnostiUzivatelskeSloupceIxxs?: string;
        /**
         * Nastavení políčka pro datumový interval
         * @type {Wfl.WebClient.GDatumovyIntervalInput}
         */
        datumovyInterval?: Wfl.WebClient.GDatumovyIntervalInput;
        /**
         * Vlastní options políček.
         * @type {TFieldOptions | null}
         */
        fieldsOptions?: TFieldOptions | null;
        /**
         * Slouží pro označení aktuální akce v tasklistu.
         * @type {string}
         */
        taskId?: string;
        subtaskHardServerFilters?: {
            sourceId: string;
            hardServerFilter: TFilterDto;
        }[];
    }
    interface CreateSourceSslspidInput extends CreateSourceSslInput<Interface.GSslspidDto, Interface.GSslspidFilterDto, GSslspidColumnNames, GSslspidFieldNames, string, GSslspidIslFieldsOptions> {
    }
    interface CustomListParamsTemp<TRequest extends Interface.GSslspidGetCustomListParamsRequestDto, TResponse extends Interface.GSslspidGetCustomListParamsResponseDto> {
        request: TRequest;
        response: TResponse;
    }
    interface CustomListParamsSslspidTemp extends CustomListParamsTemp<Interface.GSslspidGetCustomListParamsRequestDto, Interface.GSslspidGetCustomListParamsResponseDto> {
    }
    class GSslspidIslMenuParams {
        static Detail(): MenuParams;
        static Podani(): MenuParams;
        static Redistribuce(): MenuParams;
        static Metadata(): MenuParams;
        static ElektronickyDokument(): MenuParams;
        static PodpisovaKniha(): MenuParams;
        static ZmenitStavVyridit(): MenuParams;
        static ExterniAgendy(): MenuParams;
        static KlicovaSlova(): MenuParams;
        static Baliky(): MenuParams;
    }
    class GSslspidIslPreviewBarProfile {
        static ElektronickyObraz(): CustomView.CustomViewPreviewBarProfile<GSslspidPreviewIds>;
        static UzivatelskePoznamky(): CustomView.CustomViewPreviewBarProfile<GSslspidPreviewIds>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class DokumentyTask extends GContentBase<Gordic.Ssl.List> {
        AkcePodaniFormularEnabled: boolean;
        sslListSupport: IslListSupport<Ssl.Interface.GDokumentDto>;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: DokumentyTask) => Forms.Form[];
        CreateMenu: (this: DokumentyTask) => void;
        LoadGrid: (this: DokumentyTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Ssl.Interface.GDokumentDto>;
        VyberRadkuClick(rowData: any): void;
        NevyrizeneClick(): void;
        VyrizeneClick(): void;
        NeaktivniClick(): void;
        getVisibleHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class DokumentyUzluTask extends GContentBase<Gordic.Ssl.List> {
        sslListSupport: IslListSupport<Ssl.Interface.GDokumentDto>;
        IxsSuAkt: string;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: PracovniStulTask) => Forms.Form[];
        CreateMenu: (this: PracovniStulTask) => void;
        LoadGrid: (this: PracovniStulTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Ssl.Interface.GDokumentDto>;
        VyberRadkuClick(rowData: any): void;
        getVisibleHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class EKlepTask extends GContentBase<Gordic.Ssl.List> {
        sslListSupport: IslListSupport<Ssl.Interface.GSpisDto>;
        ixsTyp: string;
        /**
         * Filterp ixs_su pro Spis.
         * @type {string}
         */
        private readonly FilterSpisIxsSuAkt?;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    28.8.2024
        */
        onContentReady(): void;
        CreateFilterForms: (this: EKlepTask) => Forms.Form[];
        CreateMenu: (this: EKlepTask) => void;
        LoadGrid: (this: EKlepTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Ssl.Interface.GSpisDto>;
        VyberRadkuClick(rowData: any): void;
        getVisibleHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * GEklepPripominkovaRizeniSeznamDlgInputDto
     *
     * @author  TFeik
     * @since   52510.6
     * @date    03.10.2024
     */
    interface GEklepPripominkovaRizeniSeznamDlgInputDto {
        StartFilter?: Interface.GSslseklFilterDto;
    }
    /**
     * GEklepPripominkovaRizeniSeznamDlgReturnDto
     *
     * @author  TFeik
     * @since   52510.6
     * @date    03.10.2024
     */
    interface GEklepPripominkovaRizeniSeznamDlgReturnDto {
    }
    /**
     * Seznam připomínkových řízení v eKLEP.
     *
     * @author  TFeik
     * @since   52510.
     * @date    03.10.2024
     */
    class GEklepPripominkovaRizeniSeznamDlg extends GContentBase {
        /**
         * StartFilter
         * @type {Interface.GSslseklFilterDto}
         */
        private readonly StartFilter?;
        /**
         * Příznak zda je téma pro filtry vytvořené.
         * @type {boolean}
         */
        private readonly IsTema?;
        /**
         * Filterp ixs_su pro Spis.
         * @type {string}
         */
        private readonly FilterSpisIxsSuAkt?;
        /**
         * Filterpanel
         * @type {JQuery<HTMLElement>}
         */
        private Filterpanel?;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private Grid?;
        private gin_eklep_role;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    03.10.2024
         */
        private onContentReady;
        /**
         * getFilterFavoriteFieldNames
         *
         * @author  TFeik
         * @date    03.10.2024
         *
         * @returns {GPripominkoveRizeniZpracovaneFieldNames[]}
         */
        private getFilterFavoriteFieldNames;
        /**
         * getColumnListDefault
         *
         * @author  TFeik
         * @date    03.10.2024
         *
         * @returns {GPripominkoveRizeniZpracovaneColumnNames[]}
         */
        private getColumnListDefault;
        /**
         * createActions
         *
         * @author  TFeik
         * @date    03.10.2024
         */
        private createActions;
        private enableActions;
        /**
         * createMenuBar
         *
         * @author  TFeik
         * @date    03.10.2024
         */
        private createMenuBar;
        /**
         * getActiveRow
         *
         * @author  TFeik
         * @date    03.10.2024
         *
         * @returns {Interface.GSslseklDto | undefined | null}
         */
        private getActiveRow;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * GEklepPripominkyPripominkovehoRizeniSeznamDlgInputDto
     *
     * @author  TFeik
     * @since   52510.10
     * @date    04.10.2024
     */
    interface GEklepPripominkyPripominkovehoRizeniSeznamDlgInputDto {
        StartFilter?: GEklepPripominkyPripominkovehoRizeniSeznamDlgInputStartFilterDto;
    }
    /**
     * GEklepPripominkyPripominkovehoRizeniSeznamDlgInputStartFilterDto
     *
     * @author TFeik
     * @since 52510.32
     */
    interface GEklepPripominkyPripominkovehoRizeniSeznamDlgInputStartFilterDto {
        pid_eklep_pripomin?: string | null;
        ixp_vyriz_eklep?: string | null;
        pid_eklep?: string | null;
        PripominkoveRizeniZpracovane_ixp_spis?: string | null;
    }
    /**
     * GEklepPripominkyPripominkovehoRizeniSeznamDlgReturnDto
     *
     * @author  TFeik
     * @since   52510.10
     * @date    04.10.2024
     */
    interface GEklepPripominkyPripominkovehoRizeniSeznamDlgReturnDto {
    }
    /**
     * Seznam připomínek připomínkových řízení v eKLEP.
     *
     * @author  TFeik
     * @since   52510.10
     * @date    04.10.2024
     */
    class GEklepPripominkyPripominkovehoRizeniSeznamDlg extends GContentBase {
        /**
         * StartFilter
         * @type {GEklepPripominkyPripominkovehoRizeniSeznamDlgInputStartFilterDto}
         */
        private readonly StartFilter?;
        /**
         * Příznak zda je téma pro filtry vytvořené.
         * @type {boolean}
         */
        private readonly IsTema?;
        /**
         * Filterp ixs_su pro Spis.
         * @type {string}
         */
        private readonly FilterSpisIxsSuAkt?;
        /**
         * Filterpanel
         * @type {JQuery<HTMLElement>}
         */
        private Filterpanel?;
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private Grid?;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    04.10.2024
         */
        private onContentReady;
        /**
         * getFilterFavoriteFieldNames
         *
         * @author  TFeik
         * @date    04.10.2024
         *
         * @returns {GPripominkaPripominkovehoRizeniFieldNames[]}
         */
        private getFilterFavoriteFieldNames;
        /**
         * getColumnListDefault
         *
         * @author  TFeik
         * @date    04.10.2024
         *
         * @returns {GPripominkaPripominkovehoRizeniColumnNames[]}
         */
        private getColumnListDefault;
        /**
         * createActions
         *
         * @author  TFeik
         * @date    04.10.2024
         */
        private createActions;
        /**
         * createMenuBar
         *
         * @author  TFeik
         * @date    04.10.2024
         */
        private createMenuBar;
        /**
         * getActiveRow
         *
         * @author  TFeik
         * @date    04.10.2024
         *
         * @returns {Interface.GSslsoekDto | undefined | null}
         */
        private getActiveRow;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class NerozdeleneTask extends GContentBase<Gordic.Ssl.List> {
        sslListSupport: IslListSupport<Ssl.Interface.GSslspidDto>;
        IxsSuAkt: string;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: NerozdeleneTask) => Forms.Form[];
        CreateMenu: (this: NerozdeleneTask) => void;
        LoadGrid: (this: NerozdeleneTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Ssl.Interface.GSslspidDto>;
        VyberRadkuClick(rowData: any): void;
        EnableActions(data: any): void;
        PredatNerozdeleneClick(): void;
        getVisibleHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class PodaciDenikTask extends GContentBase<Gordic.Ssl.List> {
        RokMax: number;
        sslListSupport: IslListSupport<Ssl.Interface.GSslspidDto>;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: PodaciDenikTask) => Forms.Form[];
        CreateMenu: (this: PodaciDenikTask) => void;
        LoadGrid: (this: PodaciDenikTask) => void;
        /**
         * GetIslViewSpis
         * @type {function () {}
         */
        GetIslViewSpis(): Gordic.Isl.View<Gordic.Ssl.Interface.GSpisDto>;
        /**
         * GetIslViewDokument
         * @type {function () {}
         */
        GetIslViewDokument(): Gordic.Isl.View<Gordic.Ssl.Interface.GDokumentDto>;
        VyberRadkuClick(rowData: any): void;
        DleDataClick(): void;
        DleSpZnClick(): void;
        DleCjClick(): void;
        getVisibleHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class PracovniStulTask extends GContentBase<Gordic.Ssl.List> {
        sslListSupport: IslListSupport<Ssl.Interface.GSslspidDto>;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: PracovniStulTask) => Forms.Form[];
        CreateMenu: (this: PracovniStulTask) => void;
        LoadGrid: (this: PracovniStulTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Ssl.Interface.GSslspidDto>;
        VyberRadkuClick(rowData: any): void;
        getVisibleHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class PrehledPraceTask extends GContentBase<Gordic.Ssl.List> {
        sslListSupport: IslListSupport<Ssl.Interface.GSslspidDto>;
        IxsZmpAkt: string;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: PrehledPraceTask) => Forms.Form[];
        CreateMenu: (this: PrehledPraceTask) => void;
        LoadGrid: (this: PrehledPraceTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Wfl.Interface.GWflhpisDto>;
        GetTypAgForInFilterWflhpis(Filters: Wfl.Interface.GWflhpisFilterDto): Wfl.Interface.GWflhpisFilterDto;
        VyberRadkuClick(rowData: any): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class RedistribuceOstatniTask extends GContentBase<Gordic.Ssl.List> {
        sslListSupport: IslListSupport<Ssl.Interface.GDokumentDto>;
        private readonly DefaultSubjectFun;
        private readonly DefaultSubjectSu;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: RedistribuceOstatniTask) => Forms.Form[];
        LoadGrid: (this: RedistribuceOstatniTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Wfl.Interface.DokSpisListDto>;
        VyberRadkuClick(rowData: any): void;
        manipulacniKnihaReportRetreive(rep: any): void;
        ClearFilters(this: RedistribuceOstatniTask): void;
        PredaneMimoUzelClick(): void;
        PredaneVRamciUzluClick(): void;
        PrevzateClick(): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class SpisovePlanyZnaky extends GContentBase<Gordic.Ssl.List> {
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    22.2.2021
        */
        onContentReady(): void;
        CreateFilterForms: (this: SpisovePlanyZnaky) => Forms.Form[];
        LoadGrid: (this: SpisovePlanyZnaky) => void;
        VyberRadkuClick(rowData: any): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class SpisovePlanyZnakyIsl extends GContentBase<Gordic.Ssl.List> {
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    22.2.2021
        */
        onContentReady(): void;
        CreateFilterForms: (this: SpisovePlanyZnaky) => Forms.Form[];
        LoadGrid: (this: SpisovePlanyZnaky) => void;
        VyberRadkuClick(rowData: any): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class SpisovePlanyZnakyTask extends GContentBase<Gordic.Ssl.List> {
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    22.2.2021
        */
        onContentReady(): void;
        CreateFilterForms: (this: SpisovePlanyZnaky) => Forms.Form[];
        LoadGrid: (this: SpisovePlanyZnaky) => void;
        VyberRadkuClick(rowData: any): void;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class SpisyTask extends GContentBase<Gordic.Ssl.List> {
        sslListSupport: IslListSupport<Ssl.Interface.GSslspidDto>;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    01.11.2022
        */
        onContentReady(): void;
        CreateFilterForms: (this: SpisyTask) => Forms.Form[];
        CreateMenu: (this: SpisyTask) => void;
        LoadGrid: (this: SpisyTask) => void;
        /**
        * GetIslView
        * @type {function () {}
        */
        GetIslView(): Gordic.Isl.View<Gordic.Ssl.Interface.GSpisDto>;
        VyberRadkuClick(rowData: any): void;
        NevyrizeneClick(): void;
        VyrizeneClick(): void;
        NeaktivniClick(): void;
        getVisibleHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getEnableHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        getFavoriteHromadneAkceDto_Ext(): Wfl.Interface.GHromadneWflAkceDto;
        closing(): JQueryPromise<string | undefined>;
    }
}
declare namespace Gordic.Ssl.WebClient.Lists {
    class VecneSkupinyTask extends GContentBase<Gordic.Ssl.List> {
        private ico;
        private readonly ActionSettings;
        /**
         * ParametrGIN LEG - posuzovatel skartační operace (NSESSS 2023)
         * @type {number | undefined | null}
         */
        private readonly gin_n23_poso;
        /**
        * OnContentReady.
        *
        * @author  rtomes
        * @date    22.2.2021
        */
        onContentReady(): void;
        CreateFilterForms: (this: VecneSkupinyTask) => Forms.Form[];
        LoadGrid: (this: VecneSkupinyTask) => void;
        VyberRadkuClick(rowData: any): void;
        createSidePanels(): void;
        LoadSidePanelVecnaSkupina(selectedRow: any): void;
        closing(): JQueryPromise<string | undefined>;
        private createActions;
        private createMenuBar;
        private enableAction;
        private isPretrideniVecneSkupinyEnabledFromGrid;
        private static isPretrideniVecneSkupinyEnabled;
        private isPozastaveniSkartacniOperaceEnabledFromGrid;
        private static isPozastaveniSkartacniOperaceEnabled;
    }
}
declare namespace Gordic.Ssl {
    class List extends GContentBase<Gordic.Wfl.List> {
        UzivSlA: string;
        UzivSlB: string;
        UzivSlA2: string;
        UzivSlB2: string;
        UzivSlA3: string;
        UzivSlB3: string;
        Parkontrola: number;
        SslCtiSezPar: number;
        PouzivatDilciTerminy: boolean;
        SslFiltrDok: number;
        SslFiltrDoksk: string;
        ginN23VeddPar: number;
        SslInit(): void;
        OznacDokumentyJakoPrectene(flagPrecteni: any): void;
        /**
         * NastavPrintRestrictionALFProNeaktivniFiltry
         * @param neaktivniSelected hodnota neaktivniho filtru
         */
        NastavPrintRestrictionALFProNeaktivniFiltry(NeaktivniSelected: number): void;
        /**
         * zjištění identifikátoru dokumentu s Cj
         * @param IxpArray
         */
        private GetDokIxpWithCj;
        /**
         * Otevřít dialog vyřízení
         * @param Ixp
         * @param IxpArray
         */
        private OpenGVyrizeniDlg;
        HromadneVyrizeniSpisu(IxpArray: string[], ActiveIxp: string): void;
        AddDokumentyFilters(DokumentyFilter: number[], AddFilterSOdes: boolean, Filters: Ssl.Interface.GDokumentFilterDto): Ssl.Interface.GDokumentFilterDto;
        AddTypSpisFilters(TypSpisFilter: number[], Filters: Ssl.Interface.GDokumentFilterDto): Ssl.Interface.GDokumentFilterDto;
        GetTypAgForInFilter(Filters: Ssl.Interface.GDokumentFilterDto): Ssl.Interface.GDokumentFilterDto;
        registerEvents(): void;
        private registerRefreshRowRequestEvent;
        refreshRows(data: Wfl.Interface.GWflspidDto[]): void;
        adjustResponse(response: Isl.GServiceListResponse<Ssl.Interface.GSslspidDto>, calledFrom: CustomView.GContentCustomOnListResponseCalledFrom): Isl.GServiceListResponse<Ssl.Interface.GSslspidDto>;
    }
    class IslListSupport<TDto> {
        registerRefreshRowRequestEvent(cnt: any): void;
        refreshRows(data: TDto[], cnt: Gordic.Ssl.List): void;
        adjustResponse(response: Isl.GServiceListResponse<TDto>, calledFrom: Gordic.CustomView.GContentCustomOnListResponseCalledFrom, cnt: any): Isl.GServiceListResponse<TDto>;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /** Preview na věcnou spupinu */
    class DetailVecneSkupiny extends GContentBase {
        /** element headerText */
        private headerText;
        /** element formVsk */
        private formVsk;
        /** itemy dto */
        private RowVsk;
        onContentReady(): void;
        private createForm;
        private ZapisPristupDoTransakcnihoProtokolu;
        private removeAll;
    }
    enum PlatnostEnum {
        predPlatnosti = 0,
        platne = 1,
        poPlatnosti = 2,
        neurceno = 3
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * GNenCekajiciOperaceDlgInputDto
     *
     * @author  TFeik
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenCekajiciOperaceDlgInputDto {
        ModVyber?: boolean;
    }
    /**
     * GNenCekajiciOperaceDlgReturnDto
     *
     * @author  TFeik
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenCekajiciOperaceDlgReturnDto {
    }
    /**
     * Seznam čekajících operací v NEN.
     *
     * @author  TFeik
     * @since   52530.67
     * @date    05.08.2025
     */
    class GNenCekajiciOperaceDlg extends GContentBase {
        /**
         * $Grid
         * @type {JQuery<HTMLElement>}
         */
        private Grid;
        private IslView;
        private ModVyber;
        /**
         * onContentReady
         *
         * @author  TFeik
         * @date    05.08.2025
         */
        private onContentReady;
        /**
         * createActions
         *
         * @author  TFeik
         * @date    05.08.2025
         */
        private createActions;
        /**
         * enableActions
         *
         * @author  TFeik
         * @date    05.08.2025
         */
        private enableActions;
        /**
         * createMenuBar
         *
         * @author  TFeik
         * @date    05.08.2025
         */
        private createMenuBar;
        /**
         * createCommandBar
         *
         * @author  TFeik
         * @date    05.08.2025
         */
        private createCommandBar;
        /**
         * createGrid
         *
         * @author  TFeik
         * @date    05.08.2025
         */
        private createGrid;
        /**
         * getActiveRow
         *
         * @author  TFeik
         * @date    05.08.2025
         *
         * @returns {Interface.GVratSeznamCekajicichOperaciDataDto | undefined | null}
         */
        private getActiveRow;
        /**
         * Načtení spisového objektu do SSL, načtení dat gridu a otevření detailu dokumentu .
         *
         * @author  TFeik
         * @date    07.08.2025
         *
         * @param {string | undefined | null} operaceIdentifikator
         * @returns {JQuery.Promise<void>}
         */
        private ziskejSpisovyObjektAOtevriDetailDokumentu;
        private otevriDetailCekajiciOperace;
        private vybratSoubor;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * GNenDetailCekajiciOperaceDlgInputDto
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenDetailCekajiciOperaceDlgInputDto {
        OperaceIdentifikator?: string;
        PovolitAkce?: boolean;
    }
    /**
     * GNenDetailCekajiciOperaceDlgReturnDto
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenDetailCekajiciOperaceDlgReturnDto {
    }
    /**
     * Odešli dokument do Nen.
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    class GNenDetailCekajiciOperaceDlg extends GContentBase {
        private $Formular?;
        private OperaceIdentifikator;
        private PovolitAkce;
        private InfoSpisovyObject;
        /**
         * onContentReady
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private onContentReady;
        /**
         * createActions
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createActions;
        /**
         * enableActions
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private enableActions;
        /**
         * createMenuBar
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createMenuBar;
        /**
         * createCommandBar
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createCommandBar;
        /**
         * createGrid
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createForm;
        private setModel;
        private otevriDetailDokumentu;
        private ukazInformaciSIdentifikatorem;
        private zalozdokument;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * GNenOdesliDokumentDoNenDlgInputDto
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenOdesliDokumentDoNenDlgInputDto {
        Ixp?: string;
        Prilohy?: Wfl.Interface.GAttachmentDto[];
    }
    /**
     * GNenOdesliDokumentDoNenDlgReturnDto
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenOdesliDokumentDoNenDlgReturnDto {
    }
    /**
     * Odešli dokument do Nen.
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    class GNenOdesliDokumentDoNenDlg extends GContentBase {
        private $Formular?;
        private Prilohy;
        private Ixp;
        private JeViceSouboru;
        /**
         * onContentReady
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private onContentReady;
        /**
         * createActions
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createActions;
        /**
         * enableActions
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private enableActions;
        /**
         * createMenuBar
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createMenuBar;
        /**
         * createCommandBar
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createCommandBar;
        /**
         * createGrid
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createForm;
        private setModel;
        private odeslat;
        private enableButtonDetailCekajiciOperace;
        private otevriDetailCekajiciOperace;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * GNenPrijmyDokumentZNenDlgInputDto
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenPrijmyDokumentZNenDlgInputDto {
        OperaceIdentifikator?: string;
    }
    /**
     * GGNenPrijmyDokumentZNenDlgReturnDto
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    interface GNenPrijmyDokumentZNenDlgReturnDto {
    }
    /**
     * Odešli dokument do Nen.
     *
     * @author  DSebesta
     * @since   52530.67
     * @date    05.08.2025
     */
    class GNenPrijmyDokumentZNenDlg extends GContentBase {
        private $Formular?;
        private OperaceIdentifikator;
        /**
         * onContentReady
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private onContentReady;
        /**
         * createActions
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createActions;
        /**
         * enableActions
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private enableActions;
        /**
         * createMenuBar
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createMenuBar;
        /**
         * createCommandBar
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createCommandBar;
        /**
         * createGrid
         *
         * @author  DSebesta
         * @date    05.08.2025
         */
        private createForm;
        private setModel;
        private prijmout;
        private enableButtonDetailCekajiciOperace;
        private otevriDetailCekajiciOperace;
        private vybratZNabidky;
    }
}
declare namespace Gordic.Ssl.WebClient {
    /**
     * DashboardModulInfoProviderRegisterInput
     *
     * @author  TFeik
     * @since   52430.21
     * @date    01.08.2024
     */
    interface DashboardModulInfoProviderRegisterInput extends DashboardModulInfoProviderCreateInput {
    }
    /**
     * DashboardModulInfoProviderCreateInput
     *
     * @author  TFeik
     * @since   52430.21
     * @date    01.08.2024
     */
    interface DashboardModulInfoProviderCreateInput {
    }
    /**
     * DashboardModulInfoProvider
     *
     * @author  TFeik
     * @since   52430.21
     * @date    01.08.2024
     */
    class DashboardModulInfoProvider {
        /**
         * register
         *
         * @author  TFeik
         * @date    01.08.2024
         *
         * @param {DashboardModulInfoProviderRegisterInput} input
         */
        static register(input: DashboardModulInfoProviderRegisterInput): void;
        /**
         * getName
         *
         * @author  TFeik
         * @date    01.08.2024
         *
         * @returns {string}
         */
        static getName(): string;
        /**
         * create
         *
         * @author  TFeik
         * @date    01.08.2024
         *
         * @param {DashboardModulInfoProviderCreateInput} input
         * @returns {Dashboard.CustomProvider}
         */
        static create(input: DashboardModulInfoProviderCreateInput): Dashboard.CustomProvider;
    }
}
declare namespace Gordic.Ssl.WebClient {
    interface DashboardStatsProviderRegisterInput extends DashboardStatsProviderCreateInput {
    }
    interface DashboardStatsProviderCreateInput {
        globalSettings: Data.IGStorage | undefined | null;
        fragments: Interface.GDashboardCountsDto.FRAGMENT[];
        requestData: Interface.GSslGetDashboardCountsRequestDto;
        adjustKpiItemOptions?: (input: GKpiItemOptions[]) => JQuery.Promise<GKpiItemOptions[]>;
        modul: DashboardStatsProviderModul;
    }
    type DashboardStatsProviderModul = 'SSD' | 'USU';
    enum DashboardStatsProviderArticleName {
        dokumentyKeZpracovani = "DokumentyKeZpracovani",
        spisyKeZpracovani = "SpisyKeZpracovani",
        spisyKUzavreni = "SpisyKUzavreni",
        terminy = "Terminy",
        ostatni = "Ostatni",
        barevneOznacene = "BarevneOznacene",
        dokumentyASpisySsd = "DokumentyASpisySsd"
    }
    /**
     * DashboardStatsProvider
     *
     * @author  TFeik
     * @since   486.1.0.302
     * @date    28.01.2022
     */
    class DashboardStatsProvider {
        /**
         * register
         *
         * @author  TFeik
         * @date    28.01.2022
         *
         * @param {DashboardStatsProviderRegisterInput} input
         */
        static register(input: DashboardStatsProviderRegisterInput): void;
        /**
         * getName
         *
         * @author  TFeik
         * @date    25.02.2022
         *
         * @returns {string}
         */
        static getName(): string;
        /**
         * create
         *
         * @author  TFeik
         * @date    28.01.2022
         *
         * @param {DashboardStatsProviderCreateInput} input
         * @returns {Gordic.Dashboard.CustomProvider}
         */
        static create(input: DashboardStatsProviderCreateInput): Gordic.Dashboard.CustomProvider;
        /**
         * createActionName
         *
         * @author  TFeik
         * @date    02.03.2022
         *
         * @param {Interface.GDashboardCountsDtoNames} id
         */
        private static createActionName;
        /**
         * parseIdFromActionName
         *
         * @author  TFeik
         * @date    02.03.2022
         *
         * @param {string} actionName
         * @returns {string}
         */
        private static parseIdFromActionName;
        /**
         * updateDataView
         *
         * @author  TFeik
         * @date    02.03.2022
         *
         * @param {{ dataView: Data.View<GObservableObject<GKpiItemOptions>> data: Interface.GDashboardCountsDto }} input
         */
        static updateDataView(input: {
            dataView: Data.View<GObservableObject<GKpiItemOptions>>;
            data: Interface.GDashboardCountsDto;
        }): void;
        /**
         * createDataView
         *
         * @author  TFeik
         * @date    02.03.2022
         *
         * @param {Interface.GDashboardCountsDto} data
         * @param {Data.IGStorage | undefined | null} globalSettings
         * @returns {Data.View}
         */
        static createDataView(data: Interface.GDashboardCountsDto, globalSettings: Data.IGStorage | undefined | null, modul: DashboardStatsProviderModul): Data.View;
        /**
         * createDataViewFromOptions
         *
         * @author  TFeik
         * @date    02.03.2022
         *
         * @param {GKpiItemOptions[]} kpiOptions
         * @returns {Data.View}
         */
        static createDataViewFromOptions(kpiOptions: GKpiItemOptions[]): Data.View;
        /**
         * Převede kpi option na element.
         *
         * @author  TFeik
         * @date    23.08.2024
         *
         * @param {GKpiItemOptions[]} kpiItems
         * @returns {JQuery<HTMLElement>}
         */
        static createElement(kpiItems: GKpiItemOptions[], basePanelOptoions?: IGBasePanelOptions<KpiTemplateData>): JQuery<HTMLElement>;
        /**
         * createKpiItemOptions
         *
         * @author  TFeik
         * @date    02.03.2022
         *
         * @param {Interface.GDashboardCountsDto} data
         * @param {Data.IGStorage | undefined | null} globalSettings
         * @returns {GKpiItemOptions[]}
         */
        static createKpiItemOptions(data: Interface.GDashboardCountsDto, globalSettings: Data.IGStorage | undefined | null, modul: DashboardStatsProviderModul): GKpiItemOptions[];
        /**
         * createDetails
         *
         * @author  TFeik
         * @date    28.01.2022
         *
         * @param {DashboardStatsDetailInput[]} items
         * @returns {DashboardStatsDetail[]}
         */
        private static createDetails;
    }
}
declare namespace Gordic.Ssl.WebClient {
    class GSslEklepOdeslanaPripominkaDlg extends GContentBase {
        private Ixp;
        private $Grid?;
        private previewDiv?;
        private panelPreviewOpened;
        private filePreviewOptions;
        private dialogDbParameters?;
        private modelOdeslanePripominky;
        private znackaLabelText;
        private gin_ele_dmsprev;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private createActions;
        private createMenu;
        private createForm;
        private naplnFormular;
        private createSeznamPriloh;
        createSideBar(): void;
        createPreviewPanel(): JQuery<HTMLElement>;
        loadPreview(row: any): void;
        enablePreview(enabled: any): void;
        /**
         * Metoda pro otevreni el. dokumentu
         */
        otevrit(): void;
        /**
         * Metoda pro nastaveni pristupnosti akci
         */
        nastavOpravneniAkce(row: Wfl.Interface.GAttachment2Dto): void;
    }
}
declare namespace Gordic.Ssl.WebClient {
    interface GSslEklepPripominkoveRizeniInputDlgDialogsDto {
        InputDto: GSslEklepPripominkoveRizeniInputDlgDto;
    }
    class GSslEklepPripominkoveRizeniDlg extends GContentBase {
        private Ixp;
        private $Grid?;
        private previewDiv?;
        private panelPreviewOpened;
        private filePreviewOptions;
        private dialogDbParameters?;
        private modelPripominkovehoRizeni;
        private znackaLabelText;
        private gin_ele_dmsprev;
        /**
         * OnContentReady.
         *
         * @author  dsebesta
         */
        onContentReady(): void;
        private createActions;
        private createMenu;
        private createForm;
        private naplnFormular;
        private createSeznamPriloh;
        createSideBar(): void;
        createPreviewPanel(): JQuery<HTMLElement>;
        loadPreview(row: any): void;
        enablePreview(enabled: any): void;
        /**
         * Metoda pro otevreni el. dokumentu
         */
        otevrit(): void;
        /**
         * Metoda pro nastaveni pristupnosti akci
         */
        nastavOpravneniAkce(row: Wfl.Interface.GAttachment2Dto): void;
    }
}
declare namespace Gordic.Ssl.Prefabs {
    interface FilterTypSpisData {
        nazev: string;
        id: number;
        disabled?: boolean;
        tooltip?: string;
    }
    interface FilterTypSpisOptions extends GSelectBoxOptions<FilterTypSpisData> {
        label?: string;
        FiltrDokumentyVisible?: boolean;
        FiltrSpisyVisible?: boolean;
        FiltrTypoveSpisyVisible?: boolean;
        FiltrSoucastiVisible?: boolean;
        FiltrDilyVisible?: boolean;
    }
    function FilterTypSpis(options: FilterDleStavuOptions): any;
    interface FilterDleStavuData {
        nazev: string;
        id: number;
        disabled?: boolean;
        tooltip?: string;
    }
    interface FilterDleStavuOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        nameSpZn?: string;
        labelSpZn?: string;
        modelSpZn?: string;
        FiltrCjVisible?: boolean;
        FiltrVcetneOdeslanychVisible?: boolean;
        FiltrElektronickeVisible?: boolean;
        FiltrZnackaVisible?: boolean;
        FiltrIDokumentyVeSpisech?: boolean;
        FiltrDokumentyMimoSpis?: boolean;
        FiltrDokumentyVeSpisu?: boolean;
    }
    function FilterDleStavu(options: FilterDleStavuOptions): any;
    interface FilterDleNeaktivnichStavuOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrStornovaneVisible?: boolean;
        FiltrZtraceneVisible?: boolean;
        FiltrPreruseneVisible?: boolean;
        FiltrOdeslaneVisible?: boolean;
        FiltrPriorovaneVisible?: boolean;
        FiltrUlozeneVisible?: boolean;
        FiltrArchivovaneVisible?: boolean;
        FiltrSkartovaneVisible?: boolean;
        FiltrPreevidovaneVisible?: boolean;
        ginN23VeddPar?: number;
    }
    function FilterDleNeaktivnichStavu(options: FilterDleNeaktivnichStavuOptions): any;
    interface FilterStavuProPracovniStulOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrVRedistribuciVisible?: boolean;
        FiltrVeSpisuVisible?: boolean;
    }
    function FilterStavuProPracovniStul(options: FilterStavuProPracovniStulOptions): any;
    interface FilterStavuProVlastnostiDleUrovneOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrVyrizeneUzavreneVisible?: boolean;
        FiltrStornovaneVisible?: boolean;
        FiltrJenSpisyVisible?: boolean;
    }
    function FilterStavuProVlastnostiDleUrovne(options: FilterStavuProVlastnostiDleUrovneOptions): any;
    interface FilterTypRedistribucnihoSubjektuOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrUzelVisible?: boolean;
        FiltrFunkceVisible?: boolean;
    }
    function FilterTypRedistribucnihoSubjektu(options: FilterTypRedistribucnihoSubjektuOptions): any;
    interface FilterTypRedistribucniPrevzetiOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrFyzickyVisible?: boolean;
        FiltrCileneVisible?: boolean;
    }
    function FilterTypRedistribucniPrevzeti(options: FilterTypRedistribucniPrevzetiOptions): any;
    interface FilterRedistribuceVariantOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrNaCesteVisible?: boolean;
    }
    function FilterRedistribuceVariant(options: FilterRedistribuceVariantOptions): any;
    interface FilterSpisuDenikuOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrDenikSuVisible?: boolean;
    }
    function FilterSpisuDeniku(options: FilterSpisuDenikuOptions): any;
    interface FilterTypEvidenceDokumentuOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrCiziVisible?: boolean;
    }
    function FilterTypEvidenceDokumentu(options: FilterTypEvidenceDokumentuOptions): any;
    interface FilterPuvodDokumentuOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrVlastniVisible?: boolean;
        FiltrDorucenyVisible?: boolean;
        FiltrAgendovyVisible?: boolean;
    }
    function FilterPuvodDokumentu(options: FilterPuvodDokumentuOptions): any;
    interface FilterTypTvorbyIxpOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
    }
    function FilterTypTvorbyIxp(options: FilterTypTvorbyIxpOptions): any;
    interface FilterPohledZaOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrVlastniVisible?: boolean;
        FiltrSuVisible?: boolean;
        Required?: boolean;
        Validators?: (Gordic.Validators.Validator<Gordic.Validators.ValidatorOptions> | Gordic.Validators.ValidatorOptions & {
            type?: string;
        } | null)[];
    }
    function FilterPohledZa(options: FilterPohledZaOptions): any;
    interface FilterTypovychSpisuSoucastiDiluOptions extends GSelectBoxOptions<FilterDleStavuData> {
        label?: string;
        FiltrTypoveSpisyVisible?: boolean;
        FiltrSoucastiVisible?: boolean;
        FiltrDilyVisible?: boolean;
    }
    function FilterTypovychSpisuSoucastiDilu(options: FilterTypovychSpisuSoucastiDiluOptions): any;
}
declare namespace Gordic.Ssl.WebClient {
    interface GPozastaveniSkartaceVecneSkupinyDlgInput {
        IxsVsk: string;
    }
    interface GPozastaveniSkartaceVecneSkupinyDlgOutput {
    }
    /**
     * Pozastavení skartace věcné skupiny.
     *
     * @author  TFeik
     * @since   52520.125
     */
    class GPozastaveniSkartaceVecneSkupinyDlg extends GContentBase {
        private readonly IxsVsk;
        private readonly VecnaSkupina;
        private readonly VecnaSkupinaValidators;
        private Form;
        private onContentReady;
        private createFormBuilder;
        private enableFields;
        private createActions;
        private createMenu;
        private save;
    }
}
declare namespace Gordic.Ssl.WebClient {
    interface GPretriditSpisyVecneSkupinyInput {
        ixs_vsk: string;
    }
    interface GPretriditSpisyVecneSkupinyOutput {
    }
    class GPretriditSpisyVecneSkupiny extends GContentBase {
        private formEl;
        private grid;
        private ixs_vsk;
        private islView;
        private ixs_fun;
        private ixs_fun_txt;
        private log_por_cislo;
        /**
         * GIN LEG - posuzovatel skartační operace (NSESSS 2023).
         *
         * Hodnoty:
         * - 0 - Ne
         * - 1 - Ano - Oprávnění: jakýkoliv dokument odstornovat vidět plnohodnotný detail stornovaného/zneplatněného dokumentu a další.
         *
         * @type {number | undefined | null}
         */
        private gin_n23_poso;
        private asyncTaskPretridit;
        private options;
        onContentReady(): void;
        private init;
        private createWizard;
        private createActions;
        private createFormEl;
        private getDataFromForm;
        private createSpecialValidator;
        private createGrid;
        private getIslView;
        private getDataFromGrid;
        private createSouhrnForm;
        private pretriditAsyncTask;
        private initAsyncTask;
    }
}
