
namespace Gordic.Prr.UIWebClient {

    var gcontent = Decorators.gcontent;
    @gcontent
    export class GSeznamPovoleniDeniku extends GContentBase {

        private grid: JQuery;
        private filterForm: JQuery<HTMLElement>;
        private filterValidators: any;
        private dataView: Gordic.Data.View;
        TypDen: number;

        onContentReady() {
            var that = this;
            this.actions.addRange({
                actNovy:
                {
                    caption: "jres:25800014", //RC 25800014 : Nový
                    icon: "gi-plus",
                    run: function (ev, ctx) {
                        that.openDetail(Gordic.Gin.Interface.RegSpa.GRezimContentu.New);
                    }
                },
                actDetail:
                {
                    caption: "jres:25800013", //RC 25800013 : Detail
                    icon: "gi-detail",
                    run: function (ev, ctx) {
                        that.openDetail(Gordic.Gin.Interface.RegSpa.GRezimContentu.View);

                    }
                },
                actOdstranit:
                {
                    caption: "jres:25800011", //RC 25800011 : Odstranit
                    icon: "fa-times-circle",
                    run: function (ev, ctx) {
                        that.odstranit();

                    }
                },
                actObnovit:
                {
                    caption: "jres:25800012", //RC 25800012 : Obnovit
                    icon: "fa-retweet",
                    run: function (ev, ctx) {
                        that.obnovit();

                    }
                }

            });

            this.menuBar([
                { action: that.actions.actNovy, favorite: true },                                                    // Nový
                { action: that.actions.actDetail, favorite: true },                                                  // Detail
                { action: that.actions.actOdstranit, favorite: true },                                               // Odstranit
                { action: that.actions.actObnovit, favorite: true },                                                 // Obnovit               
            ]);

            console.log("Začátek stavby filtru");
            var filterF = new Gordic.Forms.Form({ tabLabel: "Kompletni filtr" })
                .addSection()
                .addRow("Aktivita").addField("gselectbox", Gordic.Prefabs.Select.gincakt(),
                    {
                        name: "aktivita",
                        model: "model.aktivita=value.aktivita",
                        initialValue: { aktivita: 100 },
                        dropdown: true
                    });

            this.filterForm = $("<div>")
                .appendTo(this.element)
                .gfilterpanel({
                    forms: [filterF],                                                  //predani definic formularu
                    favorites: ["aktivita"],                                                    //defaulty oblibenych polozek
                    //favoriteLayoutDescriptor: "L4M3S1",                                      //uprava layoutDescriptoru                                    
                    //filterStorageService: new Gordic.Gin.FilterStorageService.Store(),     // prirazeni custom storage sluzby pro praci s ulozenymi filtry
                    //tema: "prr_ptm_pre",
                    // 01.03.2021 - TFeik
                    // Nahrazení obsolete parametrů.
                    filterViewMode: FilterViewMode.Simple,
                    //simpleMode: true,
                    idSimpleMode: "seznamPovoleniDeniku",
                    saveOptionsForm: "all",
                    validators: this.filterValidators,
                    apply: function (ev, obj) {                                           //funkce volana v momente, kdy uzivatel klepne na tlac. filtrovat
                        console.log("obj.filter: " + JSON.stringify(obj.filter));
                        that.loadData(obj.filter);                                    //pristup k datum z gfilterpanelu (DTO filtru)
                    }
                });
                //.on("fieldchange", function (ev, changeObj) {
                //    console.log("Změna filtru");
                //    that.loadData(that.filterForm.gfilterpanel("getConfirmedData")!);
                //    //that.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                //});

            this.grid = $("<div class='js-mujGrid'>");
            this.grid
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    columnMode: "full",
                    defaultAction: that.actions.actDetail,
                    columns: this.createGridFormat(),
                    searchColumns: ["ginsfun_nazev_ref", "prrsrad_nazev", "prrsrad_rok"],
                    contextMenu: this.actions.createBar(["actNovy", "actDetail", "actOdstranit", "actObnovit"]),
                    selection: function (ev, info) {
                        var selection = info.getSelection()[0];
                        that.actions.actOdstranit!.visible(info.count == 0 || selection.aktivita == 100);
                        that.actions.actObnovit!.visible(info.count != 0 && selection.aktivita != 100);

                        that.actions.actOdstranit!.enabled(info.count != 0);
                        that.actions.actObnovit!.enabled(info.count != 0);
                        that.actions.actDetail!.enabled(info.count != 0);
                    },
                    rowsEnabled: function (metarow) {
                        return metarow.data.aktivita == 100;
                    }
                });

            this.dataView = new Gordic.Data.View(undefined, { key: ["ixs_rad", "ixs_fun"] });
                        
            //načtení
            this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
        }

        openDetail(rezim: Gordic.Gin.Interface.RegSpa.GRezimContentu): void {
            var that = this;
            var ixsRad: string | null | undefined = undefined;
            var ixsFun: string | null | undefined = undefined;
            var width = 800;
            var height = 500;
            var modal = true;
            var gridRc: Gordic.Components.GridRC<Gordic.Prr.Interface.GPrrPovoleniDenikuDto> | undefined = undefined;

            if (rezim == Gordic.Gin.Interface.RegSpa.GRezimContentu.View) {
                var selection: Gordic.Prr.Interface.GPrrPovoleniDenikuDto[];
                selection = that.grid.ggrid("getSelection");
                if (selection.length == 1) {
                    var row = selection[0];
                    console.log("Vybrane radky", selection[0].ixs_rad, selection[0].ixs_fun);
                    ixsRad = row.ixs_rad;
                    ixsFun = row.ixs_fun;
                    gridRc = new Gordic.Components.GridRC(that.grid);
                } else return;
            }

            //that.navigate(["Gordic.Prr.UIWebClient.GDetailPovoleniDeniku", { GridRc: gridRc }], {
            that.dialogs.showWindow(["Gordic.Prr.UIWebClient.GDetailPovoleniDeniku", { GridRc: gridRc, RezimDetailu: rezim }], {            
                IxsRad: ixsRad,
                IxsFun: ixsFun,
                Mp: that.TypDen == 20,
                Id: "detail_povoleni_deniku"
            }, { width: width, height: height, modal: modal })
                .on("close", (ev, r) => {
                    if (r != undefined && r.Zmena) {
                        this.loadData((that.filterForm as any).gfilterpanel("getCurrentData")!).done(function () {
                            that.grid.ggrid("activeRow", [r.Model.ixs_rad, r.Model.ixs_fun]);
                        });
                    }
                });
        }

        odstranit(): void{
            var that = this;

            console.log("odstranit()");

            var selection: Gordic.Prr.Interface.GPrrPovoleniDenikuDto[];
            selection = that.grid.ggrid("getSelection");
            if (selection.length == 1) {
                var row = selection[0];
                console.log("Vybrane radky", selection[0].ixs_rad, selection[0].ixs_fun);

                that.dialogs.messageBox("jres:25800017", "jres:25800018", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800018 : Opravdu si přejete odstranit vybraný záznam?
                    .on("yes", function () {
                        that.call("Delete", { detailDto: row }).done((data) => {
                            //that.showFlash("jres:25800015", "g-state-success", 3000, "flash"); //RC 25800015 : Odstraněno
                            that.loadData((that.filterForm as any).gfilterpanel("getCurrentData")!).done(function () {
                                that.grid.ggrid("activeRow", [row.ixs_rad, row.ixs_fun]);
                            });
                    });                
                });

            } else return;
        }

        obnovit(): void {
            var that = this;

            console.log("obnovit()");

            var selection: Gordic.Prr.Interface.GPrrPovoleniDenikuDto[];
            selection = that.grid.ggrid("getSelection");
            if (selection.length == 1) {
                var row = selection[0];
                console.log("Vybrane radky", selection[0].ixs_rad, selection[0].ixs_fun);

                that.dialogs.messageBox("jres:25800017", "jres:25800019", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25800019 : Opravdu si přejete obnovit vybraný záznam?
                    .on("yes", function () {
                        that.call("Restore", { detailDto: row }).done((data) => {
                            //that.showFlash("jres:25800016", "g-state-success", 3000, "flash"); //RC 25800016 : Obnoveno
                            that.loadData((that.filterForm as any).gfilterpanel("getCurrentData")!).done(function () {
                                that.grid.ggrid("activeRow", [row.ixs_rad, row.ixs_fun]);
                            });
                    });
                });

            } else return;
        }

        //nahrani dat
        public loadData(filter?: Object): JQueryPromise<any> {
            var Content = this;

            if (filter == undefined)
                filter = new Object();

            var prom = this.call("LoadData", { filter: filter })
                .done(function (ret) {
                    if (Content.grid.hasClass("ggrid")) {
                        Content.dataView.updateData(ret);
                        Content.grid.ggrid("setData", Content.dataView);
                    }
                });

            return prom;
        }

        public createGridFormat(): Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrDenikDto> {

            var that = this;

            var gridFormat: Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>;
            gridFormat = new Gordic.Data.GridFormat<Gordic.Prr.Interface.GPrrPovoleniDenikuDto>();
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
            if (that.contextProp("debugMode")) {
                gridFormat = gridFormat.addTextColumn({ name: "ixs_rad", caption: "jres:25800054", width: 110, fixedWidth: false })  //RC 25800054 : IxsRad
                    .addTextColumn({ name: "ixs_fun", caption: "jres:25800055", width: 110, fixedWidth: false });  //RC 25800055 : IxsFun
            }
            gridFormat = gridFormat.addTextColumn({ name: "ginsfun_nazev_ref", caption: "jres:25800049", width: 150, fixedWidth: false })//RC 25800049 : Funkční místo
                .addTextColumn({ name: "prrsrad_nazev", caption: "jres:25800020", width: 150, fixedWidth: false })//RC 25800020 : Deník
                .addNumberColumn({ name: "prrsrad_rok", caption: "jres:25800007", width: 60, fixedWidth: false });//RC 25800007 : Rok        

            return gridFormat;
        }
    }
}
