namespace Gordic.Spr.WebApp {
    export function GNemovitostiControl(content: (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailComponentExtensions) | (GContent & Gordic.Gin.WebClient.RegSpa.GBaseDetailReloadComponentExtensions)): GContent {
        const predek = (Gordic.Gin.WebClient.RegSpa.GSubListControl as any as Gordic.Gin.WebClient.RegSpa.GSubListControl);
        return $.extend({}, predek, {
            idSettings: "GNemovitostiControl",
            detailContent: content,
            serviceContent: content.createServiceContent("Gordic.Spr.WebApp.GNemovitostiControl"),
            searchColumns: ["por_cislo"],  
            showRestore: false,
            showFilters: false,
            createGridFormat: function (): Gordic.Data.GridFormat<Gordic.Spr.Interface.GNemovitostSpravnihoRizeniDto> {
                var gridFormat: Gordic.Data.GridFormat<Gordic.Spr.Interface.GNemovitostSpravnihoRizeniDto>;
                gridFormat = new Gordic.Data.GridFormat<Gordic.Spr.Interface.GNemovitostSpravnihoRizeniDto>();
                gridFormat = gridFormat
                    //.addDecimalColumn({ name: "por_cislo", caption: "jres:25200459", width: 80, fixedWidth: false }) //RC 25200459 : Pč.
                    .addTextColumn({ name: "druh_poz_nazev", caption: "jres:25200460", width: 300, fixedWidth: false }) //RC 25200460 : Druh pozemku
                    .addTextColumn({ name: "obec_nazev", caption: "jres:25200461", width: 300, fixedWidth: false }) //RC 25200461 : Obec
                    .addTextColumn({ name: "kat_uzemi_nazev", caption: "jres:25200462", width: 300, fixedWidth: false }) //RC 25200462 : Katastrální území
                    .addNumberColumn({ name: "vymera_par", caption: "jres:25200463", width: 100, fragment: "" }) //RC 25200463 : Výměra
                    .addTextColumn({ name: "cislo_par_nazev", caption: "jres:25200464", width: 150, fixedWidth: false }); //RC 25200464 : Číslo parcely
               return gridFormat;                   
            },

            enableRowActions: function (gridSelection: IGGridSelection<any>) {
                console.log("GNemovitostiControl.enableRowActions");
                var readOnly = (content as any).RezimDetailu == Gordic.Gin.Interface.RegSpa.GRezimContentu.View;
                (this as any).actions!.actDetail!.enabled(readOnly &&
                    gridSelection.count != 0); //&& (content as any).readOnly); //this.detailContent.readOnly);
                (this as any).actions!.actDelete!.enabled(gridSelection.count != 0 && gridSelection.getSelection()[0].Permissions.CanDelete.value &&
                    readOnly && this.detailContent.model.Permissions.CanUpdate.value);
                (this as any).actions!.actNew!.enabled(readOnly);
                (this as any).actions!.actRefresh!.enabled(readOnly);
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

                return this.detailContent.navigate(["Gordic.Spr.WebApp.GDetailNemovitosti", { gridRemoteControl: gridRc }], {
                //return this.detailContent.navigate(["Gordic.Spr.WebApp.RRRGDetailLhuty", { GridRc: gridRc, RezimDetailu: rezim }], {
                    RezimDetailu: rezim,
                    IxpSpis: ixpSpis,
                    PorCislo: porCislo,
                    //Rezim: rezim,
                    Id: "detail_nemovitosti",
                });
            },

            onCloseDetail: function (ev, r) {
                var that = this;
                // Pokud je přidána nebo změněna nemovitost, předej id nadřazenému detailu pro nové načtení dat a nastavení activeRow.
                if (r != undefined && r.Zmena) {
                    var gTabManager = content.find(".gtabmanager");
                    var active;
                    if (gTabManager != null && gTabManager != undefined) active = gTabManager.gtabmanager("getActive");
                    content.load({ RezimDetailu: Gordic.Gin.Interface.RegSpa.GRezimContentu.View, internal: true, selectedTabGroup: active, porCisloNemovitosti: r.Model["por_cislo"] });
                }
            }

        });
    }
}