namespace Gordic.Prr.UIWebClient {
    export function GFormularTypUdalostiControl(content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions, mp: boolean): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GFormularTypUdalostiControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Prr.UIWebClient.GFormularTypUdalostiControl"),
            showDetail: false,
            searchColumns: ["typ_uda_txt"],
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrFormularTypUdalostiDto> {

                var gridFormat: Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrFormularTypUdalostiDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrFormularTypUdalostiDto>();
                
                if(!mp)gridFormat = gridFormat.addTextColumn({ name: "typ_uda_txt", caption: "jres:25800064", width: 470, fixedWidth: false });//RC 25800064 : Typ události
                else gridFormat = gridFormat.addTextColumn({ name: "typ_uda_txt", caption: "jres:25800095", width: 470, fixedWidth: false });//RC 25800095 : Typ řešení
                return gridFormat;                   
            },
            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                
                var sablona = this.detailContent.originalModel.sablona;
                
                return this.detailContent.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailFormularTypUdalosti", { GridRc: gridRc, RezimDetailu: rezim }], {
                    Sablona: sablona,
                    Mp: mp,
                    Id: "detail_formular_typ_udalosti"
                }, { width: width, height: height, modal: modal });
            }
        });
    }
}