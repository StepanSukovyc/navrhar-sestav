namespace Gordic.Spr.WebApp {
    export function GVecnaPrislusnostControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions), typVazby: Gordic.Spr.Interface.TypVecnaPrislusnost): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        var con = content.createServiceContent("Gordic.Spr.WebApp.GVecnaPrislusnostControl");
        return $.extend({}, predek, {
            idSettings: "GVecnaPrislusnostControl",
            detailContent: content,
            serviceContent: content.createServiceContent({ className: "Gordic.Spr.WebApp.GVecnaPrislusnostControl", serverParams: { TypVazby: typVazby } }),
            searchColumns: ["zakon_txt"],
            showNew: false,
            showDelete: true,
            showRestore: false,
            showFilters: false,
            showReload: true,
            showDetail: false,
            additionalActions: [
                new GAction({
                    name: "actPridat",
                    caption: "jres:25200236", //RC 25200236 : Přidat
                    favorite: true,
                    icon: "fa-plus",
                    run: function (this: GAction) {
                        let currentContent = $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(this);
                        var width = 650;
                        var height = 650;
                        var modal = true;
                        var druhZar = content.model.druh_zar;
                        currentContent.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberVecnePrislusnostiProSpis", { serverParams: { TypVazby: typVazby, DruhZar: druhZar }}], {
                            IxpSpis: (currentContent.parentContent as any).IxpSpis,
                            IxsVpr: (currentContent.parentContent as any).IxpVpr,
                        }, { width: width, height: height, modal: modal })
                            .on("close", (retValue, filter) => { 
                                if (filter != undefined) {
                                    if (filter.ixp_spis != null && filter.ixs_vpr != null) {
                                        con.call("PridatVpr", filter); 
                                    }
                                    else {
                                        filter.ixs_vpr = "";
                                        filter.ixp_spis = "";
                                    }
                                }
                            })
                            .on("close", () => { //ev, retValue
                                currentContent.reloadData();
                            });
                    }
                })
            ],
            additionalMenu: [
                { id: "pridat", action: "actPridat", favorite: true },
            ],

            currentContent: $.content<GContent & Gordic.Gin.WebClient.RegSpa.GSubListControl>(),
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVPrProSprSpisDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVPrProSprSpisDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamVPrProSprSpisDto>();
                // Věcná příslušnost - zařízení
                if (typVazby == 10) {
                    gridFormat = gridFormat
                        .addTextColumn({
                            name: "paragraf",
                            caption: "jres:25500102", //RC 25500102 : Paragraf
                            width: 80,
                            fragment: ""
                        })
                        .addTextColumn({
                            name: "zakon_txt",
                            caption: "jres:25500100", //RC 25500100 : Zařízení
                            width: 120,
                            fragment: ""
                        })
                        .addTextColumn({
                            name: "pismeno",
                            caption: "jres:25500104", //RC 25500104 : Písmeno
                            width: 80,
                            fragment: ""
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:25200058", //RC 25200058 : Poznámka
                            width: 300,
                            fragment: ""
                        })
                }
                // Věcná příslušnost - státní dozor
                else if (typVazby == 20) {
                    gridFormat = gridFormat
                        .addNumberColumn({
                            name: "kategorie",
                            caption: "jres:25500105", //RC 25500105 : Číslo kategorie
                            width: 150,
                            fragment: ""
                        })
                        .addTextColumn({
                            name: "zakon_txt",
                            caption: "jres:25500106", //RC 25500106 : Kategorie nedostatků
                            width: 300,
                            fragment: ""
                        })
                }
                // Věcná příslušnost - obecná
                else {
                    gridFormat = gridFormat
                        .addTextColumn({
                            name: "zakon_txt",
                            caption: "jres:25500107", //RC 25500107 : Zákon
                            width: 300,
                            fragment: "",
                            fixedWidth: false
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:25200058", //RC 25200058 : Poznámka
                            width: 300,
                            fragment: "",
                            fixedWidth: false
                        })
                }
                return gridFormat;
            },
        });
    }
} 