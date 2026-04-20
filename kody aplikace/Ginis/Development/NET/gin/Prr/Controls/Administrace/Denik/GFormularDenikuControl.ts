namespace Gordic.Prr.UIWebClient {
    export function GFormularDenikuControl(content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions, mp: boolean): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {

            idSettings: "GFormularDenikuControl",
            dataViewKey: ["sablona"],
            detailContent: content,
            //serviceContent: new GContent({ className: "Gordic.Prr.UIWebClient.GFormularDenikuControl", serverParams: {} }),
            serviceContent: content.createServiceContent("Gordic.Prr.UIWebClient.GFormularDenikuControl"),
            searchColumns: ["sablona", "prrsfrm_nazev"],
            showDetail: false,
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto> {
                return new Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>()
                    .addTextColumn({ name: "sablona", caption: "jres:25800051", width: 150, fixedWidth: false })//RC 25800051 : Formulář
                    .addTextColumn({ name: "prrsfrm_nazev", caption: "jres:25800004", width: 250, fixedWidth: false });//RC 25800004 : Název
            },
            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {

                var ixsRad;
                var sablona;
                if (row != null && row != undefined) {
                    ixsRad = row.ixs_rad;
                    sablona = row.sablona;
                } else if (this.detailContent != null) {
                    ixsRad = this.detailContent.originalModel.ixs_rad;
                }

                return this.detailContent.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailFormularDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxsRad: ixsRad,
                    Sablona: sablona,
                    Mp: mp,
                    Id: "detail_formular_deniku"
                }, { width: width, height: height, modal: modal });
            },
            //additionalActions: {
            //    actTest:
            //    {
            //        caption: "Test",
            //        icon: "gi-plus",
            //        run: function (ev, ctx) {
            //            console.log("TTTTEST !!!");
            //        }
            //    }
            //},
            //additionalMenu: [                
            //    { action: "actTest", favorite: true }                
            //],
            //additionalContextMenu: ["actTest"]
        });
    }
}