namespace Gordic.Spr.WebApp {
    export function GPopControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions), Param_SprRadEko: boolean): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GPopControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GPopControl"),
            searchColumns: ["ixs_esu_txt"],  
            showDelete: true,
            showRestore: false,
            showFilters: false,
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamPopDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamPopDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamPopDto>();
                //if ((window as any).ginisDebugMode) {
                //    gridFormat = gridFormat.addTextColumn({ name: "ixp_spis", caption: "IXP_SPIS", width: 150, fixedWidth: false });
                //}
                gridFormat = gridFormat
                    .addTextColumn({
                        name: "ixs_esu_txt",
                        caption: "jres:25200107", //RC 25200107 : Poplatník
                        width: 150,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "druh_pl_txt",
                        caption: "jres:25200108", //RC 25200108 : Druh platby
                        width: 150,
                        fragment: ""
                    })
                    .addNumberColumn({
                        name: "c_pop",
                        caption: "jres:25200109", //RC 25200109 : Výše platby
                        width: 150,
                        fragment: ""
                    });
                // Jen pro ekomode
                if (Param_SprRadEko)
                    gridFormat = gridFormat
                        .addTextColumn({
                            name: "typ_eko_txt",
                            caption: "jres:25200156", //RC 25200156 : Typ dokladu
                            width: 100,
                            fragment: ""
                        })
                        .addTextColumn({
                            name: "ixp_eko_dok",
                            caption: "jres:25200157", //RC 25200157 : PID dokladu
                            width: 100,
                            fragment: ""
                        });
                //
                gridFormat = gridFormat
                    .addTextColumn({
                        name: "vs",
                        caption: "jres:25200110", //RC 25200110 : VS
                        width: 100,
                        fragment: ""
                    })
                    .addDateColumn({
                        name: "dat_vyzvy",
                        caption: "jres:25200111", //RC 25200111 : Datum výzvy
                        width: 150,
                        fragment: ""
                    })
                    .addDateColumn({
                        name: "dat_zapl",
                        caption: "jres:25200112", //RC 25200112 : Datum zaplacení
                        width: 150,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "druh_sa_txt",
                        caption: "jres:25200113", //RC 25200113 : Druh sankce
                        width: 150,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "zpu_pl_txt",
                        caption: "jres:25200114", //RC 25200114 : Způsob platby
                        width: 150,
                        fragment: ""
                    });
                return gridFormat;
            },

            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                var ixpSpis;
                var radekPop;
                if (row != null && row != undefined) {
                    ixpSpis = row.ixp_spis;
                    radekPop = row.radek_pop;
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                    radekPop = this.detailContent.originalModel.radek_pop;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailPlatby", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxpSpis: ixpSpis,
                    RadekPop: radekPop,
                    Id: "detail_platby"
                });
            }
        });
    }
}