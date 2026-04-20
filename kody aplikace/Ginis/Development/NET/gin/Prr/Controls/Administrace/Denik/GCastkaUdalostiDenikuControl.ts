namespace Gordic.Prr.UIWebClient {
    export function GCastkaUdalostiDenikuControl(content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions, mp: boolean): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {

            idSettings: "GCastkaUdalostiDenikuControl",
            dataViewKey: ["ixs_rad", "typ_uda", "typ_pla"],
            detailContent: content,
            //serviceContent: new GContent({ className: "Gordic.Prr.UIWebClient.GCastkaUdalostiDenikuControl", serverParams: {} }),
            serviceContent: content.createServiceContent("Gordic.Prr.UIWebClient.GCastkaUdalostiDenikuControl"),
            searchColumns: ["typ_uda_txt", "typ_pla_txt", "castka"],
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto> {

                var gridFormat: Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>();
                gridFormat = gridFormat.addTextColumn({ name: "typ_uda_txt", caption: "jres:25800064", width: 200, fixedWidth: false })//RC 25800064 : Typ události
                    .addTextColumn({ name: "typ_pla_txt", caption: "jres:25800065", width: 160, fixedWidth: false })//RC 25800065 : Typ částky
                    .addCurrencyColumn({ name: "castka", caption: "jres:25800066", width: 110, fixedWidth: false })//RC 25800066 : Částka                                
                return gridFormat;                   
            },
            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {

                var ixsRad;
                var typUda;
                var typPla;

                if (row != null && row != undefined) {
                    ixsRad = row.ixs_rad;
                    typUda = row.typ_uda;
                    typPla = row.typ_pla;
                } else if (this.detailContent != null) {
                    ixsRad = this.detailContent.originalModel.ixs_rad;
                }

                return this.detailContent.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailCastkaDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxsRad: ixsRad,
                    TypUda: typUda,
                    TypPla: typPla,
                    Mp: mp,
                    Id: "detail_castka_deniku"
                }, { width: width, height: height, modal: modal });
            }
        });
    }
}