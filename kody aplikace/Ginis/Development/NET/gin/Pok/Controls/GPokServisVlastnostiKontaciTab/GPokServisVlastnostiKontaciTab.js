"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokServisVlastnostiKontaciTab = class GPokServisVlastnostiKontaciTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Vlastnosti kontací";
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var headerForm = new Gordic.Forms.Form({ name: "pokVyberKontaceFiltrForm", layoutDescriptor: "L1M1S1" })
                        .addSection("")
                        .addRow("Sada kontací")
                        .addField("gselectbox", Gordic.Prefabs.Select.poksvpk(), {
                        name: "ixs_vpk",
                        change: function (ev, changeObj) {
                            let ixsVpk = changeObj.value;
                            if (ixsVpk != null) {
                                that.beginOperation("Načtení kontace");
                                Gordic.Isl.PokKontace.list(rq => {
                                    return {
                                        filters: {
                                            ixs_vpk: ixsVpk.ixs_vpk
                                        },
                                        fragments: ["POKSKON", "*", "Vlastnosti"]
                                    };
                                }).getData().done(function (data) {
                                    //kontace
                                    if (that.gridKontace != null)
                                        that.gridKontace.ggrid("setData", data);
                                    //vlastnosti
                                    if (that.gridVlastnosti != null)
                                        that.gridVlastnosti.ggrid("setData", that.pokcvlk);
                                    //hodnoty??
                                })
                                    .always(function () {
                                    that.endOperation();
                                });
                            }
                            else { //smazání hodnoty v políčku
                                //kontace
                                if (that.gridKontace != null)
                                    that.gridKontace.ggrid("setData", []);
                                //vlastnosti
                                if (that.gridVlastnosti != null)
                                    that.gridVlastnosti.ggrid("setData", []);
                                //hodnoty
                                if (that.gridHodnoty != null)
                                    that.gridHodnoty.ggrid("setData", []);
                            }
                        }
                    }).addSection({ name: "sekceKontace" })
                        .addSection({ name: "sekceVlastnosti" })
                        .addSection({ name: "sekceHodnoty" });
                    let form = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    let tab1 = $("<div>").appendTo(form.findFormSections("sekceKontace")).gtab({
                        title: "Pokladní kontace",
                        opened: true,
                        locked: true,
                    });
                    that.gridKontace = //vytvoreni gridu + definice                
                        $("<div>") //vytvoreni elementu pro grid
                            .appendTo(tab1)
                            .gautofit()
                            .ggrid({
                            data: [], //this.view,   // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                            renderMode: "paged-async", // auto, all-at-once, paged-sync, paged-async
                            columnMode: "full", // fit, full
                            navigationMode: "row", // row, cell
                            scrollHelperTemplate: "{nazev}",
                            //   searchColumns: ["mjm"],
                            rowNumbers: true,
                            multi: true,
                            columns: that.createGridFormatKontace(),
                            selection: (ev, obj) => {
                                // když změním kontaci, musím nastavit sroávně vlastnosti
                                let selectKontace = obj.getSelection(false)[0];
                                //když není kontace ,tak nepokračuji - když smažu v políčku ixsVpk
                                if (selectKontace != null) {
                                    let vybranaVlastnost = that.gridVlastnosti.ggrid("getSelection")[0];
                                    if (vybranaVlastnost != null) {
                                        //vyberu vlastnosti které se mají zaškrtnou
                                        let ulozeneVlastnosti = selectKontace.Vlastnosti.filter(x => x.vlk == vybranaVlastnost.vlk && x.aktivita == 100).map(t => t.hodnota);
                                        if (ulozeneVlastnosti.length > 0) {
                                            that.gridHodnoty.ggrid("getView").getDataRows(true).forEach(function (meta) {
                                                if (ulozeneVlastnosti.indexOf(meta.data.hodnota) > -1) {
                                                    meta.checked = true;
                                                }
                                                else {
                                                    (meta.checked = false);
                                                }
                                            });
                                            if (that.gridHodnoty != null)
                                                that.gridHodnoty.ggrid("refreshRows");
                                        }
                                        else {
                                            that.gridHodnoty.ggrid("getView").getDataRows(true).forEach(function (meta) {
                                                meta.checked = false;
                                            });
                                            if (that.gridHodnoty != null)
                                                that.gridHodnoty.ggrid("refreshRows");
                                        }
                                    }
                                }
                            }
                        });
                    let tab2 = $("<div>").appendTo(form.findFormSections("sekceVlastnosti")).gtab({
                        title: "Vlastnosti pokladních kontací",
                        opened: true,
                        locked: true,
                    });
                    that.gridVlastnosti = //vytvoreni gridu + definice
                        $("<div>") //vytvoreni elementu pro grid
                            .appendTo(tab2)
                            .gautofit()
                            .ggrid({
                            data: [], // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                            renderMode: "paged-async", // auto, all-at-once, paged-sync, paged-async
                            columnMode: "full", // fit, full
                            navigationMode: "row", // row, cell
                            scrollHelperTemplate: "{vlk_txt}",
                            //   searchColumns: ["mjm"],
                            rowNumbers: true,
                            multi: false,
                            columns: that.createGridFormatVlastnosti(),
                            selection: (ev, obj) => {
                                let selectRowVlastnost = obj.getSelection(false)[0];
                                if (selectRowVlastnost != null) {
                                    var view = new Gordic.Data.View(this.pokcvkh.filter(x => x.vlk == selectRowVlastnost.vlk), { key: "ixs_kon" });
                                    //vyberu vlastnosti které se mají zaškrtnou
                                    let ulozeneVlastnosti = that.gridKontace.ggrid("getSelection")[0].Vlastnosti.filter(x => x.vlk == selectRowVlastnost.vlk && x.aktivita == 100).map(t => t.hodnota);
                                    if (ulozeneVlastnosti.length > 0) {
                                        view.getDataRows(true).forEach(function (meta) {
                                            if (ulozeneVlastnosti.indexOf(meta.data.hodnota) > -1) {
                                                meta.checked = true;
                                            }
                                            else {
                                                (meta.checked = false);
                                            }
                                        });
                                    }
                                    if (that.gridHodnoty != null)
                                        that.gridHodnoty.ggrid("setData", view);
                                }
                                else {
                                    that.gridHodnoty.ggrid("getView").getDataRows(true).forEach(function (meta) {
                                        meta.checked = false;
                                    });
                                    if (that.gridHodnoty != null)
                                        that.gridHodnoty.ggrid("refreshRows");
                                }
                            }
                        });
                    let tab3 = $("<div>").appendTo(form.findFormSections("sekceHodnoty")).gtab({
                        title: "Hodnoty vlastností pokladních kontací",
                        opened: true,
                        locked: true,
                    });
                    that.gridHodnoty = //vytvoreni gridu + definice                
                        $("<div>") //vytvoreni elementu pro grid
                            .appendTo(tab3)
                            .gautofit()
                            .ggrid({
                            data: [], // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                            renderMode: "paged-async", // auto, all-at-once, paged-sync, paged-async
                            columnMode: "full", // fit, full
                            navigationMode: "row", // row, cell
                            scrollHelperTemplate: "{hodnota_txt}",
                            //   searchColumns: ["mjm"],
                            rowNumbers: true,
                            multi: true,
                            columns: that.createGridFormatHodnoty(),
                            selection: (ev, obj) => {
                                //pořešit, které vlastnosti můžou mít více hodnot a které ne
                                let vybranaVlastnost = that.gridVlastnosti.ggrid("getSelection")[0];
                                let prizMulti = that.pokcvlk.filter(x => x.vlk == vybranaVlastnost.vlk)[0].priz_multi;
                                //může nabývat x hdnot, noc neřeším
                                if (prizMulti == 1) {
                                }
                                else { //může nabývat pouze jedné hodnoty, takže ty ostatní musím odoznačit
                                    obj.view.getDataRows(true).forEach(function (x) {
                                        if (x.data.hodnota == obj.getSelection(false)[0].hodnota) {
                                            x.checked = !x.checked;
                                        }
                                        else {
                                            x.checked = false;
                                        }
                                    });
                                    if (that.gridHodnoty != null)
                                        that.gridHodnoty.ggrid("refreshRows");
                                }
                                ;
                            }
                        });
                    that.actions.addRange({
                        actUlozit: {
                            caption: "Uložit",
                            icon: "gi-save",
                            run: function (ev, ctx) {
                                that.ulozit();
                            }
                        },
                        actTiskvyber: {
                            caption: "Tisk vybraných",
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tiskVyber();
                            }
                        },
                        actTisk: {
                            caption: "Tisk",
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tisk();
                            }
                        },
                    });
                    that.menuBar([
                        { action: that.actions.actUlozit, favorite: true },
                        { action: that.actions.actTiskvyber, favorite: true },
                        { action: that.actions.actTisk, favorite: true },
                    ]);
                }
                ulozit() {
                    var that = this;
                    let rowKontace = that.gridKontace.ggrid("getSelection"); //aktuální řádek na kterém stojím
                    let rowsKontace = that.gridKontace.ggrid("getSelection", false, true); //skutečně zatrhlé řádky bez toho, na kterém stojím
                    let rowVlastnost = that.gridVlastnosti.ggrid("getSelection")[0];
                    let rowHodnoty = that.gridHodnoty.ggrid("getSelection", false, true); // skutečně zatrhlé hodnoty
                    let pidyKontace = [];
                    let vybraneHodnoty = [];
                    if (rowsKontace.length > 0) {
                        pidyKontace = rowsKontace.map(function (x) { return x.ixs_kon; });
                    }
                    else {
                        pidyKontace.push(rowKontace[0].ixs_kon);
                    }
                    vybraneHodnoty = rowHodnoty.map(function (x) { return x.hodnota; });
                    that.beginOperation("Ukládání");
                    that.isl.PokKontace.ulozitVlastnostiKontaci(rq => {
                        return {
                            ixsKon: pidyKontace,
                            vlk: rowVlastnost.vlk,
                            hodnoty: vybraneHodnoty
                        };
                    }).getData().done(function () {
                        let ixsVpk = that.element.findFields("ixs_vpk").gfield("getValue").ixs_vpk;
                        //Dotažení nově uložených vlastností
                        Gordic.Isl.PokKontace.list(rq => {
                            return {
                                filters: {
                                    ixs_vpk: ixsVpk
                                },
                                fragments: ["POKSKON", "*", "Vlastnosti"]
                            };
                        }).getData().done(function (data) {
                            //kontace
                            if (that.gridKontace != null)
                                that.gridKontace.ggrid("setData", data);
                            that.endOperation();
                        });
                    })
                        .fail(function (xhr, type, vobj) {
                        if (type === "exception") {
                            if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                vobj.handled = true;
                                Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, vobj.baseMessage);
                            }
                        }
                    });
                }
                tiskVyber() {
                    var that = this;
                    if (that.gridKontace.ggrid("getSelection").length < 1) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "jres:31302460");
                        return;
                    }
                    var actVnitrniTiskKontaceVyber = GAction.createPrintAction({
                        name: "actPokKontaceVyber",
                        caption: "Výběr pokladních kontací",
                        tema: "adp_ptm_pok",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:PokladniKontaceVyber",
                        reportStarting: function (rep) {
                            var pidy = that.gridKontace.ggrid("getSelection").map(function (x) { return "'" + x.ixs_kon + "'"; });
                            rep.customDto = { list_ixp: pidy.join() };
                        }
                    });
                    actVnitrniTiskKontaceVyber.run();
                }
                tisk() {
                    var that = this;
                    if (that.element.findFields("ixs_vpk").gfield("getValue") == null) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "Není vybrána sada kontací");
                        return;
                    }
                    var actVnitrniTiskKontace = GAction.createPrintAction({
                        name: "actPokKontace",
                        caption: "Pokladní kontace",
                        tema: "adp_ptm_pok",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:PokladniKontace",
                        reportStarting: function (rep) {
                            let ixsVpk = that.element.findFields("ixs_vpk").gfield("getValue").ixs_vpk;
                            rep.customDto = { list_ixp: ixsVpk };
                        }
                    });
                    actVnitrniTiskKontace.run();
                }
                createGridFormatKontace() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({
                        name: "ktg_typ", caption: "Typ", cellTemplate: function (metarow) {
                            switch (metarow.ktg_typ) {
                                case 1500: return "P";
                                case 1510: return "V";
                                default: return "";
                            }
                        },
                    });
                    gridFormat.addTextColumn({ name: "kod", caption: "Kód" });
                    gridFormat.addTextColumn({ name: "nazev", caption: "Název" });
                    gridFormat.addTextColumn({ name: "ixs_kon", caption: "Identifikátor" });
                    return gridFormat;
                }
                createGridFormatVlastnosti() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "vlk_txt", caption: "Název vlastnosti" });
                    return gridFormat;
                }
                createGridFormatHodnoty() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "hodnota_txt", caption: "Nastavená hodnota vlastnosti" });
                    return gridFormat;
                }
            };
            GPokServisVlastnostiKontaciTab = __decorate([
                Decorators.gcontent
            ], GPokServisVlastnostiKontaciTab);
            WebClient.GPokServisVlastnostiKontaciTab = GPokServisVlastnostiKontaciTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1NlcnZpc1ZsYXN0bm9zdGlLb250YWNpVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva1NlcnZpc1ZsYXN0bm9zdGlLb250YWNpVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyZWY7QUEzZUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMmVuQjtJQTNlZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMmU3QjtRQTNlb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQStCLFNBQVEsT0FBQSxZQUFZO2dCQWM1RCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztvQkFFbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFcEUsSUFBSSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsQ0FBQzt5QkFDbkcsVUFBVSxDQUFDLEVBQUUsQ0FBQzt5QkFDZCxNQUFNLENBQUMsY0FBYyxDQUFDO3lCQUN0QixRQUFRLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUNyRCxJQUFJLEVBQUUsU0FBUzt3QkFDZixNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUzs0QkFFM0IsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQU0sQ0FBQzs0QkFFOUIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBRWpCLElBQUksQ0FBQyxjQUFjLENBQUMs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LGFBQVMsS0FBVCxhQUFTLFFBMmU3QjtJQUFELENBQUMsRUEzZWdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJlbkI7QUFBRCxDQUFDLEVBM2VTLE1BQU0sS0FBTixNQUFNLFFBMmVmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tTZXJ2aXNWbGFzdG5vc3RpS29udGFjaVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBncmlkS29udGFjZTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIGdyaWRWbGFzdG5vc3RpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEhvZG5vdHk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIGl4c1Zwazogc3RyaW5nO1xyXG4gICAgICAgIHBva2N2bGs6IGFueTsgLy9uYcSNdGVuw70gxI3DrXNlbG7DrWsgdmxhdG5vc3TDrVxyXG4gICAgICAgIHBva2N2a2g6IGFueTsgLy9uYcSNdGVuw6kgdmxhc3Rub3N0aSDEjcOtc2VsbsOta3UgdmxhdG5vc3TDrVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiVmxhc3Rub3N0aSBrb250YWPDrVwiO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJwb2tWeWJlcktvbnRhY2VGaWx0ckZvcm1cIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTYWRhIGtvbnRhY8OtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5wb2tzdnBrKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c192cGtcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXhzVnBrID0gY2hhbmdlT2JqLnZhbHVlITsgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl4c1ZwayAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIk5hxI10ZW7DrSBrb250YWNlXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLklzbC5Qb2tLb250YWNlLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c192cGs6IGl4c1Zway5peHNfdnBrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiUE9LU0tPTlwiLCBcIipcIiwgXCJWbGFzdG5vc3RpXCJdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXREYXRhKCkuZG9uZShmdW5jdGlvbiAoZGF0YTogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva3Nrb25EdG9bXSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8va29udGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmdyaWRLb250YWNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEtvbnRhY2UuZ2dyaWQoXCJzZXREYXRhXCIsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZsYXN0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ncmlkVmxhc3Rub3N0aSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRWbGFzdG5vc3RpLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LnBva2N2bGspO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2hvZG5vdHk/P1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vc21hesOhbsOtIGhvZG5vdHkgdiBwb2zDrcSNa3VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2tvbnRhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmdyaWRLb250YWNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkS29udGFjZS5nZ3JpZChcInNldERhdGFcIiwgW10pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmxhc3Rub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZFZsYXN0bm9zdGkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRWbGFzdG5vc3RpLmdncmlkKFwic2V0RGF0YVwiLCBbXSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZEhvZG5vdHkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRIb2Rub3R5LmdncmlkKFwic2V0RGF0YVwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmFkZFNlY3Rpb24oeyBuYW1lOiBcInNla2NlS29udGFjZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwic2VrY2VWbGFzdG5vc3RpXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKHsgbmFtZTogXCJzZWtjZUhvZG5vdHlcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGhlYWRlckZvcm0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCB0YWIxID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKGZvcm0uZmluZEZvcm1TZWN0aW9ucyhcInNla2NlS29udGFjZVwiKSkuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJQb2tsYWRuw60ga29udGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWRLb250YWNlID0gICAgICAgICAgICAgIC8vdnl0dm9yZW5pIGdyaWR1ICsgZGVmaW5pY2UgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkKFwiPGRpdj5cIikvL3Z5dHZvcmVuaSBlbGVtZW50dSBwcm8gZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIxKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkPEhwbC5JbnRlcmZhY2UuR1Bva3Nrb25EdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sLy90aGlzLnZpZXcsICAgLy8gdGhpcy5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJwYWdlZC1hc3luY1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxIZWxwZXJUZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgc2VhcmNoQ29sdW1uczogW1wibWptXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVHcmlkRm9ybWF0S29udGFjZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgb2JqKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2R5xb4gem3Em27DrW0ga29udGFjaSwgbXVzw61tIG5hc3Rhdml0IHNyb8Ohdm7EmyB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0S29udGFjZSA9IG9iai5nZXRTZWxlY3Rpb24oZmFsc2UpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8va2R5xb4gbmVuw60ga29udGFjZSAsdGFrIG5lcG9rcmHEjXVqaSAtIGtkecW+IHNtYcW+dSB2IHBvbMOtxI1rdSBpeHNWcGtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RLb250YWNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdnlicmFuYVZsYXN0bm9zdCA9IHRoYXQuZ3JpZFZsYXN0bm9zdGkuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodnlicmFuYVZsYXN0bm9zdCAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Z5YmVydSB2bGFzdG5vc3RpIGt0ZXLDqSBzZSBtYWrDrSB6YcWha3J0bm91XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1bG96ZW5lVmxhc3Rub3N0aSA9IHNlbGVjdEtvbnRhY2UuVmxhc3Rub3N0aSEuZmlsdGVyKHggPT4geC52bGsgPT0gdnlicmFuYVZsYXN0bm9zdC52bGsgJiYgeC5ha3Rpdml0YSA9PSAxMDApLm1hcCh0ID0+IHQuaG9kbm90YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodWxvemVuZVZsYXN0bm9zdGkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEhvZG5vdHkuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVsb3plbmVWbGFzdG5vc3RpLmluZGV4T2YobWV0YS5kYXRhLmhvZG5vdGEpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXRhLmNoZWNrZWQgPSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZEhvZG5vdHkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRIb2Rub3R5LmdncmlkKFwicmVmcmVzaFJvd3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkSG9kbm90eS5nZ3JpZChcImdldFZpZXdcIikuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ncmlkSG9kbm90eSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEhvZG5vdHkuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgdGFiMiA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyhmb3JtLmZpbmRGb3JtU2VjdGlvbnMoXCJzZWtjZVZsYXN0bm9zdGlcIikpLmd0YWIoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVmxhc3Rub3N0aSBwb2tsYWRuw61jaCBrb250YWPDrVwiLFxyXG4gICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWRWbGFzdG5vc3RpID0gICAgICAgICAgICAgIC8vdnl0dm9yZW5pIGdyaWR1ICsgZGVmaW5pY2VcclxuICAgICAgICAgICAgICAgICQoXCI8ZGl2PlwiKS8vdnl0dm9yZW5pIGVsZW1lbnR1IHBybyBncmlkXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiMilcclxuICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLCAgIC8vIHRoaXMubW9kZWxQb2xvemt5WzBdICAgLy96YXRpbSBuZW1hbSB6YWRuYSBkYXRhLCBuYXN0YXZpbSBwcmF6ZG5lIHBvbGUuIFYgbW9tZW50ZSBuYWN0ZW5pIGplIG5hc3RhdmltIHByZXMgb3B0aW9ucyAobWV0b2RhIGxvYWRKc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwicGFnZWQtYXN5bmNcIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGVscGVyVGVtcGxhdGU6IFwie3Zsa190eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgc2VhcmNoQ29sdW1uczogW1wibWptXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlR3JpZEZvcm1hdFZsYXN0bm9zdGkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIG9iaikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RSb3dWbGFzdG5vc3QgPSBvYmouZ2V0U2VsZWN0aW9uKGZhbHNlKVswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0Um93Vmxhc3Rub3N0ICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLnBva2N2a2guZmlsdGVyKHggPT4geC52bGsgPT0gc2VsZWN0Um93Vmxhc3Rub3N0LnZsayksIHsga2V5OiBcIml4c19rb25cIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92eWJlcnUgdmxhc3Rub3N0aSBrdGVyw6kgc2UgbWFqw60gemHFoWtydG5vdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1bG96ZW5lVmxhc3Rub3N0aSA9IHRoYXQuZ3JpZEtvbnRhY2UuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilbMF0uVmxhc3Rub3N0aS5maWx0ZXIoeCA9PiB4LnZsayA9PSBzZWxlY3RSb3dWbGFzdG5vc3QudmxrICYmIHguYWt0aXZpdGEgPT0gMTAwKS5tYXAodCA9PiB0LmhvZG5vdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodWxvemVuZVZsYXN0bm9zdGkubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVsb3plbmVWbGFzdG5vc3RpLmluZGV4T2YobWV0YS5kYXRhLmhvZG5vdGEpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG1ldGEuY2hlY2tlZCA9IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmdyaWRIb2Rub3R5ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEhvZG5vdHkuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEhvZG5vdHkuZ2dyaWQoXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ncmlkSG9kbm90eSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWRIb2Rub3R5LmdncmlkKFwicmVmcmVzaFJvd3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHRhYjMgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8oZm9ybS5maW5kRm9ybVNlY3Rpb25zKFwic2VrY2VIb2Rub3R5XCIpKS5ndGFiKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkhvZG5vdHkgdmxhc3Rub3N0w60gcG9rbGFkbsOtY2gga29udGFjw61cIixcclxuICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkSG9kbm90eSA9ICAgICAgICAgICAgICAvL3Z5dHZvcmVuaSBncmlkdSArIGRlZmluaWNlICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJChcIjxkaXY+XCIpLy92eXR2b3JlbmkgZWxlbWVudHUgcHJvIGdyaWRcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sICAgLy8gdGhpcy5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyTW9kZTogXCJwYWdlZC1hc3luY1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgIC8vIGZpdCwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxIZWxwZXJUZW1wbGF0ZTogXCJ7aG9kbm90YV90eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgc2VhcmNoQ29sdW1uczogW1wibWptXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVHcmlkRm9ybWF0SG9kbm90eSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgb2JqKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wb8WZZcWhaXQsIGt0ZXLDqSB2bGFzdG5vc3RpIG3Fr8W+b3UgbcOtdCB2w61jZSBob2Rub3QgYSBrdGVyw6kgbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2eWJyYW5hVmxhc3Rub3N0ID0gdGhhdC5ncmlkVmxhc3Rub3N0aS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcml6TXVsdGkgPSB0aGF0LnBva2N2bGsuZmlsdGVyKHggPT4geC52bGsgPT0gdnlicmFuYVZsYXN0bm9zdC52bGspWzBdLnByaXpfbXVsdGk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbcWvxb5lIG5hYsO9dmF0IHggaGRub3QsIG5vYyBuZcWZZcWhw61tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJpek11bHRpID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgLy9txa/FvmUgbmFiw712YXQgcG91emUgamVkbsOpIGhvZG5vdHksIHRha8W+ZSB0eSBvc3RhdG7DrSBtdXPDrW0gb2Rvem5hxI1pdFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHguZGF0YS5ob2Rub3RhID09IG9iai5nZXRTZWxlY3Rpb24oZmFsc2UpWzBdLmhvZG5vdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHguY2hlY2tlZCA9ICF4LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHguY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZEhvZG5vdHkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkSG9kbm90eS5nZ3JpZChcInJlZnJlc2hSb3dzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVWxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VGlza3Z5YmVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrIHZ5YnJhbsO9Y2hcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tWeWJlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUaXNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50aXNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RVbG96aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRpc2t2eWJlciwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0VGlzaywgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1bG96aXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93S29udGFjZSA9IHRoYXQuZ3JpZEtvbnRhY2UuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7IC8vYWt0dcOhbG7DrSDFmcOhZGVrIG5hIGt0ZXLDqW0gc3RvasOtbVxyXG4gICAgICAgICAgICBsZXQgcm93c0tvbnRhY2UgPSB0aGF0LmdyaWRLb250YWNlLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCB0cnVlKTsgLy9za3V0ZcSNbsSbIHphdHJobMOpIMWZw6Fka3kgYmV6IHRvaG8sIG5hIGt0ZXLDqW0gc3RvasOtbVxyXG4gICAgICAgICAgICBsZXQgcm93Vmxhc3Rub3N0ID0gdGhhdC5ncmlkVmxhc3Rub3N0aS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgbGV0IHJvd0hvZG5vdHkgPSB0aGF0LmdyaWRIb2Rub3R5LmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsZmFsc2UsdHJ1ZSk7IC8vIHNrdXRlxI1uxJsgemF0cmhsw6kgaG9kbm90eVxyXG5cclxuICAgICAgICAgICAgbGV0IHBpZHlLb250YWNlOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdnlicmFuZUhvZG5vdHk6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAocm93c0tvbnRhY2UubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBpZHlLb250YWNlID0gcm93c0tvbnRhY2UubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lml4c19rb24gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGlkeUtvbnRhY2UucHVzaChyb3dLb250YWNlWzBdLml4c19rb24pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdnlicmFuZUhvZG5vdHkgPSByb3dIb2Rub3R5Lm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5ob2Rub3RhIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlVrbMOhZMOhbsOtXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuUG9rS29udGFjZS51bG96aXRWbGFzdG5vc3RpS29udGFjaShycSA9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhzS29uOiBwaWR5S29udGFjZSxcclxuICAgICAgICAgICAgICAgICAgICB2bGs6IHJvd1ZsYXN0bm9zdC52bGssXHJcbiAgICAgICAgICAgICAgICAgICAgaG9kbm90eTogdnlicmFuZUhvZG5vdHlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldERhdGEoKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaXhzVnBrID0gdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoXCJpeHNfdnBrXCIpLmdmaWVsZChcImdldFZhbHVlXCIpLml4c192cGs7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Eb3Rhxb5lbsOtIG5vdsSbIHVsb8W+ZW7DvWNoIHZsYXN0bm9zdMOtXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLlBva0tvbnRhY2UubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3ZwazogaXhzVnBrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiUE9LU0tPTlwiLCBcIipcIiwgXCJWbGFzdG5vc3RpXCJdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KS5nZXREYXRhKCkuZG9uZShmdW5jdGlvbiAoZGF0YTogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva3Nrb25EdG9bXSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8va29udGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmdyaWRLb250YWNlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZEtvbnRhY2UuZ2dyaWQoXCJzZXREYXRhXCIsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgdm9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoV2FybmluZyh0aGF0LHZvYmouYmFzZU1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGlza1Z5YmVyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5ncmlkS29udGFjZS5nZ3JpZChcImdldFNlbGVjdGlvblwiKS5sZW5ndGggPCAxKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoYXQsIFwianJlczozMTMwMjQ2MFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0Vm5pdHJuaVRpc2tLb250YWNlVnliZXIgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UG9rS29udGFjZVZ5YmVyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbDvWLEm3IgcG9rbGFkbsOtY2gga29udGFjw61cIiwgXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImFkcF9wdG1fcG9rXCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1dlYlRpc2s6UG9rbGFkbmlLb250YWNlVnliZXJcIixcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBpZHkgPSB0aGF0LmdyaWRLb250YWNlLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tza29uRHRvPihcImdldFNlbGVjdGlvblwiKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFwiJ1wiICsgeC5peHNfa29uICsgXCInXCI7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IGxpc3RfaXhwOiBwaWR5LmpvaW4oKSB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGFjdFZuaXRybmlUaXNrS29udGFjZVZ5YmVyLnJ1bigpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRpc2soKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcIml4c192cGtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoYXQsIFwiTmVuw60gdnlicsOhbmEgc2FkYSBrb250YWPDrVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RWbml0cm5pVGlza0tvbnRhY2UgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UG9rS29udGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2tsYWRuw60ga29udGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJhZHBfcHRtX3Bva1wiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOlBva2xhZG5pS29udGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl4c1ZwayA9IHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiaXhzX3Zwa1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS5peHNfdnBrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBsaXN0X2l4cDogaXhzVnBrIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhY3RWbml0cm5pVGlza0tvbnRhY2UucnVuKCk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdEtvbnRhY2UoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxIcGwuSW50ZXJmYWNlLkdQb2tzdGtvRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SHBsLkludGVyZmFjZS5HUG9rc3Rrb0R0bz4oKTtcclxuXHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfdHlwXCIsIGNhcHRpb246IFwiVHlwXCIsIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKG1ldGFyb3cpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobWV0YXJvdy5rdGdfdHlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTUwMDogcmV0dXJuIFwiUFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE1MTA6IHJldHVybiBcIlZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia29kXCIsIGNhcHRpb246IFwiS8OzZFwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIm5hemV2XCIsIGNhcHRpb246IFwiTsOhemV2XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2tvblwiLCBjYXB0aW9uOiBcIklkZW50aWZpa8OhdG9yXCIgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXRWbGFzdG5vc3RpKCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ2bGtfdHh0XCIsIGNhcHRpb246IFwiTsOhemV2IHZsYXN0bm9zdGlcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdEhvZG5vdHkoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImhvZG5vdGFfdHh0XCIsIGNhcHRpb246IFwiTmFzdGF2ZW7DoSBob2Rub3RhIHZsYXN0bm9zdGlcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==