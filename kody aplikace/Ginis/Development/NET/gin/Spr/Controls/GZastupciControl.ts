namespace Gordic.Spr.WebApp {
    export function GZastupciControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GZastupciControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GZastupciControl"),
            searchColumns: ["ixs_esu_txt", "ixs_dva_nazev"],  
            showDelete: false,
            showRestore: false,
            showFilters: false,
            gridAutofitEnabled: false,
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamZastupcuDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamZastupcuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamZastupcuDto>();
                //if ((window as any).ginisDebugMode) {
                //    gridFormat = gridFormat.addTextColumn({ name: "ixp_spis", caption: "IXP_SPIS", width: 150, fixedWidth: false });
                //}
                gridFormat = gridFormat
                    .addIconColumn({
                        name: "zmena_esu",
                        caption: "jres:35600005", //RC 35600005 : Změna
                        width: 20,
                        fixedWidth: false,
                        iconTemplate: (val) => {
                            if (val.zmena_esu == 1) return { icon: "fa-exclamation-triangle g-state-text g-state-warning" };
                            else return { icon: "" };
                        }
                    })
                    .addTextColumn({
                        name: "ixs_esu_txt",
                        caption: "jres:25200083", //RC 25200083 : Název
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "ixs_dva_nazev",
                        caption: "jres:25200084", //RC 25200084 : Typ
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "poznamka",
                        caption: "jres:25200088", //RC 25200088 : Poznámka
                        width: 300,
                        fragment: ""
                    });
                return gridFormat;                   
            },

            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                var ixpSpis;
                var ixsEsu;
                var licZast;
                var porZast;
                if (row != null && row != undefined) {
                    ixpSpis = row.ixp_spis;
                    ixsEsu = row.ixs_esu;  
                    licZast = row.lic_zast;
                    porZast = row.por_zast;
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailZastupce", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxpSpis: ixpSpis,
                    IxsEsu: ixsEsu,
                    //TypVazby: typVazby, ... Neni potreba. Bude vzdy Gordic.Spr.Interface.TypSubjektuEnum.Zastupce
                    LicZast: licZast,
                    PorZast: porZast,
                    Id: "detail_zastupce"
                });
            }
        });
    }
}