namespace Gordic.Spr.WebApp {
    export function GOUOControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GOUOControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GOUOControl"),
            searchColumns: ["nazev_ouo"],
            showDelete: false,
            showRestore: false,
            showFilters: false,
            //showResizersOnTab: true,
            gridAutofitEnabled: false,

            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOuoProSprSpisDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOuoProSprSpisDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOuoProSprSpisDto>();
                if ((window as any).ginisDebugMode) {
                    gridFormat = gridFormat.addTextColumn({ name: "ixp_ouo", caption: "IXP_OUO", width: 150, fixedWidth: false });
                }
                gridFormat = gridFormat
                    .addTextColumn({
                        name: "nazev_ouo",
                        caption: "jres:25200083", //RC 25200083 : Název
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "typ_ouo_txt",
                        caption: "jres:25200084", //RC 25200084 : Typ
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "ucinnost_txt",
                        caption: "jres:25200198", //RC 25200198 : Účinnost
                        width: 300,
                        fragment: ""
                    })
                    .addDateColumn({
                        name: "dat_roz_pov",
                        caption: "jres:25200199", //RC 25200199 : Datum pověření
                        width: 150,
                        fragment: ""
                    })
                    .addDateColumn({
                        name: "dat_roz_odv",
                        caption: "jres:25200200", //RC 25200200 : Datum odvolání
                        width: 150,
                        fragment: ""
                    });
                return gridFormat;                   
            },

            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                var that = this;
                var ixpSpis;
                var ixsOuo;
                //var typVazby;
                //var licZast;
                //var porZast;
                if (row != null && row != undefined) {
                    ixpSpis = row.ixp_spis;
                    ixsOuo = row.ixs_ouo
                    //ixsEsu = row.ixs_esu;
                    //typVazby = row.typ_vazby;
                    //licZast = row.lic_zast;
                    //porZast = row.por_zast;
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailOUO", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxpSpis: ixpSpis,
                    IxsOuo: ixsOuo,
                    IxsDsr: content.model.ixs_dsr,
                    //IxsEsu: ixsEsu,
                    //TypVazby: typVazby,
                    //LicZast: licZast,
                    //PorZast: porZast,
                    Id: "detail_ouo"
                });
            }
        });
    }
}