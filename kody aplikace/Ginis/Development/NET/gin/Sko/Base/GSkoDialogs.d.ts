declare namespace Gordic.Sko.Dialogs {
    function OpenDetail(content: GContent, modal: boolean, contentInitializer?: string | object | IGClientContentObject | (string | ObjectLiteral<any>)[], inputParams?: ObjectLiteral<any>, options?: GDialogOptions): JQuery<any>;
    function DuvodStornaSkodyDlg(content: GContent): JQuery.Deferred<any, any, any>;
    function VyberTypuPohledavky(content: GContent): JQuery.Deferred<any, any, any>;
    function VyberFunkceNksDlg(content: GContent): JQuery.Deferred<any, any, any>;
    function PodaniSkody(content: GContent, modal: boolean): JQueryPromise<any>;
    function HledaniSkody(content: GContent, modal: boolean): JQueryPromise<any>;
    function TiskSestav(content: GContent): JQueryPromise<any>;
    function VyberVlastniSeskupeniNs(content: GContent, vyber: boolean): JQueryPromise<string>;
    function VyberMajetku(content: GContent): JQuery.Promise<any, any, any>;
}
