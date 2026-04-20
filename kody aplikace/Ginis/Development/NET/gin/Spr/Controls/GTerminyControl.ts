namespace Gordic.Spr.WebApp {
    export function GTerminyControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GTerminyControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GTerminyControl"),
            searchColumns: ["por_cislo"],  
            showDelete: false,
            showRestore: false,
            showFilters: false,
            showNew: false, 
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamTerminuDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamTerminuDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GSeznamTerminuDto>();
                gridFormat = gridFormat
                    .addDecimalColumn({ name: "por_cislo", caption: "jres:25200065", width: 80, fixedWidth: false }) //RC 25200065 : Pč.
                    .addTextColumn({ name: "stav_txt", caption: "jres:25200066", width: 150, fixedWidth: false }) //RC 25200066 : Stav
                    .addTextColumn({ name: "typ_term_txt", caption: "jres:25200067", width: 300, fixedWidth: false }) //RC 25200067 : Termín
                    .addDateColumn({ name: "dat_od", caption: "jres:25200068", width: 80, fixedWidth: false })  //RC 25200068 : Zahájeno
                    .addDateColumn({ name: "dat_do", caption: "jres:25200069", width: 100, fixedWidth: false })  //RC 25200069 : Ukončit do
                    .addTextColumn({ name: "stav_lh_txt", caption: "jres:25200070", width: 150, fixedWidth: false }) //RC 25200070 : Stav lhůty
                    .addDateColumn({ name: "dat_konlh", caption: "jres:25200071", width: 90, fixedWidth: false })  //RC 25200071 : Ukončeno
                    .addTextColumn({ name: "nazev_ukon", caption: "jres:25200072", width: 300, fixedWidth: false }); //RC 25200072 : Název úkonu
                return gridFormat;                   
            },


            enableRowActions: function (gridSelection: IGGridSelection<any>) {
                console.log("GTerminyControl.enableRowActions");
                (this as any).actions!.actDetail!.enabled((content as any).RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View &&
                    gridSelection.count != 0); //&& (content as any).readOnly); //this.detailContent.readOnly);
                (this as any).actions!.actRefresh!.enabled((content as any).RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View);
            },


            enableActions: function () {
            },

            openDetail: function (row: any, rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu, gridRc: Gordic.Components.GridRC<any> | undefined, width: number, height: number, modal: boolean): JQuery<HTMLElement> | undefined {
                var ixpSpis;
                var porCislo;
                if (row != null && row != undefined) {
                    ixpSpis = row.ixp_spis;
                    porCislo = row.por_cislo;
                } else if (this.detailContent != null) {
                    ixpSpis = this.detailContent.originalModel.ixp_spis;
                }

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailLhuty", { GridRc: gridRc, RezimDetailu: rezim }], {
                    IxpSpis: ixpSpis,
                    PorCislo: porCislo,
                    Rezim: rezim,
                    Id: "detail_terminu",
                });
            }
        });
    }
}