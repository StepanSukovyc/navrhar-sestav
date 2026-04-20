namespace Gordic.Spr.WebApp {
    export function GOstatniSubjektyControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GOstatniSubjektyControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GOstatniSubjektyControl"),
            searchColumns: ["ixs_esu_txt", "ixs_dva_nazev", "zastupce"],  
            showDelete: false,
            showRestore: false,
            showFilters: false,
            gridAutofitEnabled: false,
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamOstatnichSubjektuDto>();
                if ((window as any).ginisDebugMode) {
                    gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
                }
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
                        caption: "jres:25200085", //RC 25200085 : Název
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "ixs_dva_nazev",
                        caption: "jres:25200086", //RC 25200086 : Typ
                        width: 300,
                        fragment: ""
                    })
                    .addTextColumn({
                        name: "zastupce",
                        caption: "jres:25200087", //RC 25200087 : Zástupce subjektu
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
                var typVazby;
                var licZast;
                var porZast;
                if (row != null && row != undefined) {
                    ixpSpis = row.ixp_spis;
                    ixsEsu = row.ixs_esu; 
                    typVazby = row.typ_vazby;
                    licZast = row.lic_zast;
                    porZast = row.por_zast;
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailOstatnihoSubjektu", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxpSpis: ixpSpis,
                    IxsEsu: ixsEsu,
                    TypVazby: typVazby,
                    LicZast: licZast,
                    PorZast: porZast,
                    Id: "detail_ostatniho_subjektu"
                });
            }
        });
    }
}