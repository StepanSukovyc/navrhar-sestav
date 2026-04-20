declare namespace Gordic.Spr.Dialogs {
    function VypocetLhutyDlg(parentContent: GContent, opt: WebApp.GVypocetLhutyDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebApp.GVypocetLhutyDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    function ZalozeniSprSpisu(mainContent: GContent, ixp: string): JQuery.Promise<any, any, any>;
    function ZapisDoDdpDlg(parentContent: GContent, opt: WebApp.GZapisDoDdpDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebApp.GZapisDoDdpDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
    function TiskPrehleduDlg(parentContent: GContent, opt: WebApp.GTiskPrehleduDlgInputParams, ModOtevreni?: Gordic.Global.Enums.ModOtevreni): JQuery.Promise<WebApp.GTiskPrehleduDlgReturnValue | undefined, Gui.Dialogs.OpenDialogRejectType | undefined, any>;
}
