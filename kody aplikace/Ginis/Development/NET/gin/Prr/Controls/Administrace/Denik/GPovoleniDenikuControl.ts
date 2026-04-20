namespace Gordic.Prr.UIWebClient {
    export function GPovoleniDenikuControl(content: GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions, mp: boolean): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            
            idSettings: "GPovoleniDenikuControl",
            dataViewKey: ["ixs_rad", "ixs_fun"],
            detailContent: content,
            //serviceContent: new GContent({ className: "Gordic.Prr.UIWebClient.GPovoleniDenikuControl", serverParams: {} }),
            serviceContent: content.createServiceContent("Gordic.Prr.UIWebClient.GPovoleniDenikuControl"),
            searchColumns: ["ginsfun_nazev_ref", "prrsrad_rok"],   
            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {

                var ixsRad;
                var ixsFun;
                if (row != null && row != undefined) {
                    ixsRad = row.ixs_rad;
                    ixsFun = row.ixs_fun;
                } else if (this.detailContent!=null)
                {
                    ixsRad = this.detailContent.originalModel.ixs_rad;
                }
                
                return this.detailContent.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailPovoleniDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxsRad: ixsRad,
                    IxsFun: ixsFun,
                    Mp: mp,
                    ProDenik: true,
                    Id: "detail_povoleni_deniku"
                }, { width: width, height: height, modal: modal });
            },
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto> {

                var gridFormat: Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>();
                console.log("ginisDebugMode: " + content.contextProp("debugMode"));
                //console.log("ginisDevelopMode: " + (window as any).ginisDevelopMode);
                console.log("ginisDevelopMode: " + content.contextProp("developMode"));
                gridFormat = gridFormat.addIconColumn({
                    name: "pristup",
                    description: "jres:25800056", //RC 25800056 : Přístup
                    width: 40,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row: any) {
                        switch (row["s_pristup"]) {
                            case 0: return { icon: "gi-window-close g-state-text g-state-important", tooltip: "jres:25800058" };  //RC 25800058 : Povoleno pouze prohlížení záznamů na deníku
                            case 1: return { icon: "gi-tick g-state-text g-state-success", tooltip: "jres:25800057" }; //RC 25800057 : Povoleno pořizování a editace záznamů na deníku
                            default: return null;
                        }
                    }
                });
                if (content.contextProp("debugMode"))
                {
                    gridFormat = gridFormat.addTextColumn({ name: "ixs_rad", caption: "jres:25800054", width: 110, fixedWidth: false })  //RC 25800054 : IxsRad
                        .addTextColumn({ name: "ixs_fun", caption: "jres:25800055", width: 110, fixedWidth: false });  //RC 25800055 : IxsFun
                }
                gridFormat = gridFormat.addTextColumn({ name: "ginsfun_nazev_ref", caption: "jres:25800049", width: 150, fixedWidth: false })//RC 25800049 : Funkční místo
                                       .addTextColumn({ name: "prrsrad_nazev", caption: "jres:25800020", width: 150, fixedWidth: false })//RC 25800020 : Deník
                                       .addNumberColumn({ name: "prrsrad_rok", caption: "jres:25800007", width: 60, fixedWidth: false });//RC 25800007 : Rok        
                
                return gridFormat;
            }

        });
    }
}