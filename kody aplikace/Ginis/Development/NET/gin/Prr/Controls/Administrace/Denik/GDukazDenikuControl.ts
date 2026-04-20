namespace Gordic.Prr.UIWebClient {
    export function GDukazDenikuControl(content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions, mp: boolean): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {

            idSettings: "GDukazDenikuControl",
            dataViewKey: ["ixs_rad", "por_cislo"],
            detailContent: content,
            //serviceContent: new GContent({ className: "Gordic.Prr.UIWebClient.GDukazDenikuControl", serverParams: {} }),
            serviceContent: content.createServiceContent("Gordic.Prr.UIWebClient.GDukazDenikuControl"),
            searchColumns: ["nazev", "poradi"],             
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto> {

                var gridFormat: Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>();

                if (content.contextProp("debugMode")) {
                    gridFormat = gridFormat.addNumberColumn({ name: "por_cislo", caption: "jres:25800059", width: 110, fixedWidth: false });  //RC 25800059 : PorCislo
                }

                gridFormat = gridFormat.addTextColumn({ name: "nazev", caption: "jres:25800004", width: 300, fixedWidth: false })//RC 25800004 : Název
                        .addNumberColumn({ name: "poradi", caption: "jres:25800060", width: 100, fixedWidth: false });//RC 25800060 : Pořadí

                return gridFormat;                   
            },
            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {

                var ixsRad;
                var porCislo;

                if (row != null && row != undefined) {
                    ixsRad = row.ixs_rad;
                    porCislo = row.por_cislo;
                } else if (this.detailContent != null) {
                    ixsRad = this.detailContent.originalModel.ixs_rad;
                }

                return this.detailContent.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailDukazDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxsRad: ixsRad,
                    PorCislo: porCislo,
                    Mp: mp,
                    Id: "detail_dukaz_deniku"
                }, { width: width, height: height, modal: modal });
            }
        });
    }
}