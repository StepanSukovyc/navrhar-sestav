namespace Gordic.Spr.Dialogs {

    export function VypocetLhutyDlg(
        parentContent: GContent,
        opt: WebApp.GVypocetLhutyDlgInputParams,
        ModOtevreni?: Gordic.Global.Enums.ModOtevreni
    ) {
        return Gordic.Gui.Dialogs.buildDialog<WebApp.GVypocetLhutyDlgInputParams, WebApp.GVypocetLhutyDlgReturnValue>({
            dialogName: 'Gordic.Spr.WebApp.GVypocetLhutyDlg',
            id: 'VypocetLhutyDlg#',
            openDialogParams: {
                parentContent: parentContent,
                ModOtevreni: ModOtevreni,
                opt: opt
            },
            windowParams: { height: 350, width: 509 }
        });
    }

    export function ZalozeniSprSpisu(
        mainContent: GContent,
        ixp: string
    ) {
        var width = 650;
        var height = 650;
        var modal = true;
        var content: GContent;
        var def = $.Deferred();

        content = mainContent.createServiceContent("Gordic.Spr.WebApp.GSprUtils");
        content.call("ExistSprSpis", { ixp: ixp }) // kontrola zda jiz neni zalozeno
            .done((zalozeno) => {
                console.log("Zda je zalozeno ...", zalozeno);
                if (!zalozeno) {
                    content.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDruhuRizeniProFunkci", {}], // vyber druhu rizeni 
                        { TypSr: Gordic.Spr.Interface.TypSprSpisuEnum.NeniSpravniSpis, showOkButton: true },
                        { width: width, height: height, modal: modal })
                        .on("close", (ev, retValue) => {
                            if (retValue != undefined && retValue.IxsDsr != undefined) {
                                console.log("Vybrany druh spravniho rizeni ...", retValue.IxsDsr)
                                mainContent.navigate(["Gordic.Spr.WebApp.GDetailSpravnihoRizeni", {}], { // zavolani detailu spravniho rizeni 
                                    RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.New,
                                    IxpSpis: ixp,
                                    IxsDsr: retValue.IxsDsr
                                })
                                    .on("close", () => {
                                        content.call("ExistSprSpis", { ixp: ixp })
                                            .done((zal) => {
                                                def.resolve(zal, ixp);
                                            })
                                            .fail(function (val) {
                                                def.reject(val);
                                            });
                                    })
                            }
                            else {
                                def.reject();
                            }
                        })
                }
                else {
                    content.dialogs.alert("jres:25500202") //RC 25500202 : Zadaný spis je již evidován.
                    def.reject(); 
                }
            }).fail(function (val) {
                def.reject(val);
            })

        return def.promise();
    }

    export function ZapisDoDdpDlg(
        parentContent: GContent,
        opt: WebApp.GZapisDoDdpDlgInputParams,
        ModOtevreni?: Gordic.Global.Enums.ModOtevreni
    ) {
        return Gordic.Gui.Dialogs.buildDialog < WebApp.GZapisDoDdpDlgInputParams, WebApp.GZapisDoDdpDlgReturnValue> ({
            dialogName: 'Gordic.Spr.WebApp.GZapisDoDdpDlg',
            id: 'zapisDoDdpDlg#',
            openDialogParams: {
                parentContent: parentContent,
                ModOtevreni: ModOtevreni,
                opt: opt
            },
            windowParams: { height: 350, width: 509 }
        });
    }

    export function TiskPrehleduDlg(
        parentContent: GContent,
        opt: WebApp.GTiskPrehleduDlgInputParams,
        ModOtevreni?: Gordic.Global.Enums.ModOtevreni
    ) {
        return Gordic.Gui.Dialogs.buildDialog<WebApp.GTiskPrehleduDlgInputParams, WebApp.GTiskPrehleduDlgReturnValue>({
            dialogName: 'Gordic.Spr.WebApp.GTiskPrehleduDlg',
            id: 'tiskPrehleduDlg#',
            openDialogParams: {
                parentContent: parentContent,
                ModOtevreni: ModOtevreni,
                opt: opt
            },
            windowParams: { height: 350, width: 509 }
        });
    }

}
