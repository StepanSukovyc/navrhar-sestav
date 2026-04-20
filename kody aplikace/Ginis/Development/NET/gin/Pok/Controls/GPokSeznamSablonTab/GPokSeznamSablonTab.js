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
            let GPokSeznamSablonTab = class GPokSeznamSablonTab extends Gordic.GContentBase {
                onContentReady() {
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    var that = this;
                    that.beginOperation("Načítání dat");
                    that.isl.PokSablona.list(rq => { return { fragments: ["POKSPIT", "POKSPIT_TXT", "Permissions"], filters: {} }; })
                        .get()
                        .done(function (data) {
                        that.grid = $("<div>").appendTo(that.element)
                            .gautofit()
                            .ggrid({
                            data: data.data,
                            renderMode: "auto",
                            columnMode: "fit",
                            navigationMode: "row",
                            rowNumbers: true,
                            columns: that.createGridFormat(),
                            defaultAction: new GAction({
                                name: "actDetailGrid", run: function (ev, ctx) {
                                    that.detailSablony();
                                }
                            }),
                            selection: (ev, sel) => {
                                if (sel.count == 1) {
                                    that.actions.actOdstranit.updatePermission(sel.getSelection()[0].Permissions, "LzeSmazat");
                                    that.actions.actNova.updatePermission(sel.getSelection()[0].Permissions, "LzeZalozit");
                                    that.actions.actDetail.updatePermission(sel.getSelection()[0].Permissions, "LzeUpravit");
                                    that.actions.actPouzit.updatePermission(sel.getSelection()[0].Permissions, "LzePouzit");
                                    that.actions.actPrevod.updatePermission(sel.getSelection()[0].Permissions, "LzePrevod");
                                    that.actions.actZmenitZkratku.updatePermission({ value: true });
                                }
                            }
                        });
                        if (data.data.length == 0) { // nemám žádná data (řádky) tak si sáhnu po permission bokem
                            that.isl.PokSablona.seznamPermissions(rq => { })
                                .get()
                                .done(function (data) {
                                that.actions.actOdstranit.updatePermission(data, "LzeSmazat");
                                that.actions.actNova.updatePermission(data, "LzeZalozit");
                                that.actions.actDetail.updatePermission(data, "LzeUpravit");
                                that.actions.actPouzit.updatePermission(data, "LzePouzit");
                                that.actions.actPrevod.updatePermission(data, "LzePrevod");
                                that.actions.actZmenitZkratku.updatePermission({ value: false });
                            });
                        }
                    }).always(function () {
                        that.endOperation();
                    });
                    that.actions.addRange({
                        actNova: {
                            caption: "Nová",
                            icon: Gordic.Gin.Icons.ActionEnum.novyZaznam,
                            run: function (ev, ctx) {
                                that.novaSablona();
                            }
                        },
                        actDetail: {
                            caption: "Detail",
                            icon: Gordic.Gin.Icons.EntityEnum.detail,
                            run: function (ev, ctx) {
                                that.detailSablony();
                            }
                        },
                        actOdstranit: {
                            caption: "Odstranit",
                            icon: Gordic.Gin.Icons.ActionEnum.odstranit,
                            run: function (ev, ctx) {
                                var radek = that.grid.ggrid("getSelection")[0];
                                that.dialogs.messageBox("Potvrzení", "Opravdu chcete smazat vybraný záznam?", GDlg.mbbYesNo, GDlg.mbiQuestion)
                                    .on("yes", function () {
                                    that.promiseSmazSablona(radek.ixs_pit, true);
                                });
                            }
                        },
                        actZmenitZkratku: {
                            caption: "Změnit zkratku",
                            icon: Gordic.Gin.Icons.ActionEnum.zmenit,
                            run: function (ev, ctx) {
                                that.zmenitZkratku();
                            }
                        },
                        actPouzit: {
                            caption: "jres:31302042",
                            icon: Gordic.Gin.Icons.ActionEnum.pokracovat,
                            run: function (ev, ctx) {
                                that.pouzitiSablony();
                            }
                        },
                        actPrevod: {
                            caption: "Převod šablon",
                            icon: Gordic.Gin.Icons.ActionEnum.predat,
                            run: function (ev, ctx) {
                                var selectWindow = that.dialogs.showWindow("Gordic.Pok.WebClient.GPokVyberKnihyPrevodTab", { ixpDen: that.ixpDen }, "Výběr knihy", 600, 600, true);
                                var windowContent = $.content(selectWindow);
                                windowContent.close(function (ixpDen) {
                                    if (ixpDen != null) {
                                        that.isl.PokSablona.prevod(rq => { return { ixpDen: ixpDen }; })
                                            .get()
                                            .done(function (text) {
                                            that.showFlash(text, "g-state-success", 3000);
                                        })
                                            .fail(function (xhr, type, vobj) {
                                            if (type === "exception") {
                                                if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                                    vobj.handled = true;
                                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, vobj.baseMessage);
                                                }
                                            }
                                        });
                                    }
                                }); // end close
                            }
                        },
                    });
                    this.menuBar([
                        { action: this.actions.actNova, favorite: true },
                        { action: this.actions.actDetail, favorite: true },
                        { action: this.actions.actOdstranit, favorite: true },
                        { action: this.actions.actZmenitZkratku, favorite: true },
                        { action: this.actions.actPouzit, favorite: true },
                        { action: this.actions.actPrevod, favorite: true }
                    ]);
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixs_pit", caption: "PID" });
                    gridFormat.addTextColumn({ name: "nazev_sablony", caption: "Název šablony" });
                    gridFormat.addTextColumn({ name: "ixs_fun_txt", caption: "Vlastník šablony" });
                    gridFormat.addTextColumn({ name: "ktg_typ_txt", caption: "Typ dokladu" });
                    gridFormat.addTextColumn({ name: "ktg_dok_txt", caption: "Kategorie dokladu" });
                    gridFormat.addTextColumn({ name: "druh_dok_txt", caption: "Druh dokladu" });
                    gridFormat.addTextColumn({ name: "zpus_platby_txt", caption: "Zp. platby" });
                    gridFormat.addTextColumn({ name: "ps_sml_ac", caption: "Smlouva/Objednávka" });
                    gridFormat.addTextColumn({ name: "popis", caption: "Popis" });
                    gridFormat.addTextColumn({ name: "kontace", caption: "Předkontace" });
                    gridFormat.addCurrencyColumn({ name: "c_celkem_m", caption: "Částka v měne" });
                    gridFormat.addTextColumn({ name: "esu_txt", caption: "Název ESU" });
                    gridFormat.addTextColumn({ name: "esu_nazev", caption: "Název subjektu" });
                    gridFormat.addTextColumn({ name: "ixs_fun_nazev_rf", caption: "Změnu provedl" });
                    gridFormat.addDateColumn({ name: "dat_zmena", caption: "Datum změny" });
                    return gridFormat;
                }
                detailSablony() {
                    let that = this;
                    let radek = this.grid.ggrid("getSelection")[0];
                    let ParamsJSON = { ixsPit: radek.ixs_pit, uid: "GPokDetailSablonyTab#" };
                    let selectWindow = this.navigate("Gordic.Pok.WebClient.GPokDetailSablonaTab", ParamsJSON);
                    let windowContent = $.content(selectWindow);
                    windowContent.close(function () {
                        that.loadData();
                    });
                }
                novaSablona() {
                    let that = this;
                    let ParamsJSON = { ixsPit: "", uid: "GPokDetailSablonyTab#" };
                    let selectWindow = this.navigate("Gordic.Pok.WebClient.GPokDetailSablonaTab", ParamsJSON);
                    let windowContent = $.content(selectWindow);
                    windowContent.close(function () {
                        that.loadData();
                    });
                }
                zmenitZkratku() {
                    var radek = this.grid.ggrid("getSelection")[0];
                    this.dialogs.showModalWindow("Gordic.Pok.WebClient.GPokSablonyZkratkyTab", { editMode: true, ixsPitSeznam: radek.ixs_pit }, "Zkratky pokladních šablon");
                }
                pouzitiSablony() {
                    var that = this;
                    var radek = this.grid.ggrid("getSelection")[0];
                    Gordic.Pok.WebClient.GPokWebDoklad.promisePodaniSablona(this, true, radek.ixs_pit)
                        .done(function (ixp) {
                        var detailWindow = that.navigate("Gordic.Pok.WebClient.GPokDetailDokladuTab", {
                            ixp: ixp,
                            newPodani: true
                        });
                    })
                        .fail(function (zprava) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, zprava);
                    });
                }
                promiseSmazSablona(ixsPit, konPrirazeniZkratce) {
                    var that = this;
                    that.isl.PokSablona.smazat(rq => {
                        return {
                            ixsPit: ixsPit,
                            konPrirazeniZkratce: konPrirazeniZkratce
                        };
                    })
                        .get()
                        .done(function () {
                        Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Pokladní šablona byla smazána!");
                        that.loadData();
                    })
                        .fail(function (xhr, type, vobj) {
                        if (type === "exception") {
                            if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                vobj.handled = true;
                                Gordic.Pok.WebClient.GPokFlash.showFlashError(that, vobj.baseMessage);
                            }
                            else if (vobj.data.member) {
                                if (vobj.data.member == "konPrirazeniZkratce") {
                                    vobj.handled = true;
                                    return that.dialogs.confirm(vobj.baseMessage).createDialogPromise("yes").then(function () { return that.promiseSmazSablona(ixsPit, false); });
                                }
                            }
                        }
                    });
                }
                loadData() {
                    var view = new Gordic.Isl.View(this.isl.PokSablona.list(rq => { return { fragments: ["POKSPIT", "POKSPIT_TXT", "Permissions"], filters: {} }; }));
                    this.grid.ggrid({
                        data: view
                    });
                }
            };
            GPokSeznamSablonTab = __decorate([
                Decorators.gcontent
            ], GPokSeznamSablonTab);
            WebClient.GPokSeznamSablonTab = GPokSeznamSablonTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Nlem5hbVNhYmxvblRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tTZXpuYW1TYWJsb25UYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXVTZjtBQXZTRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1U25CO0lBdlNnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F1UzdCO1FBdlNvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQW9EO2dCQU16RixjQUFjO29CQUVWLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFHLGFBQWEsRUFBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRXRFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtvQkFFbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUM1RyxHQUFHLEVBQUU7eUJBQ0wsSUFBSSxDQUFDLFVBQVUsSUFBSTt3QkFFaEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7NkJBQ3hDLFFBQVEsRUFBRTs2QkFDVixLQUFLLENBQW1DOzRCQUNyQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7NEJBQ2YsVUFBVSxFQUFFLE1BQU07NEJBQ2xCLFVBQVUsRUFBRSxLQUFLOzRCQUNqQixjQUFjLEVBQUUs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RyxRQXVTbkI7QUFBRCxDQUFDLEVBdlNTLE1BQU0sS0FBTixNQUFNLFFBdVNmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tTZXpuYW1TYWJsb25UYWIgZXh0ZW5kcyBHQ29udGVudEJhc2UgPCBHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbiA+IHtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBpeHBEZW4gOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCAgZGVmYXVsdEFjdGlvbiA6IHRydWUgfV0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiTmHEjcOtdMOhbsOtIGRhdFwiKVxyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuUG9rU2FibG9uYS5saXN0KHJxID0+IHsgcmV0dXJuIHsgZnJhZ21lbnRzOiBbXCJQT0tTUElUXCIsIFwiUE9LU1BJVF9UWFRcIiwgXCJQZXJtaXNzaW9uc1wiXSwgZmlsdGVyczoge30gfTsgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tzcGl0RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbEdyaWRcIiwgcnVuOiBmdW5jdGlvbiAoZXY6IEpRdWVyeUV2ZW50T2JqZWN0LCBjdHg6IGFueSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZXRhaWxTYWJsb255KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgc2VsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5jb3VudCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLnVwZGF0ZVBlcm1pc3Npb24oc2VsLmdldFNlbGVjdGlvbigpWzBdLlBlcm1pc3Npb25zLCBcIkx6ZVNtYXphdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5vdmEhLnVwZGF0ZVBlcm1pc3Npb24oc2VsLmdldFNlbGVjdGlvbigpWzBdLlBlcm1pc3Npb25zLCBcIkx6ZVphbG96aXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwhLnVwZGF0ZVBlcm1pc3Npb24oc2VsLmdldFNlbGVjdGlvbigpWzBdLlBlcm1pc3Npb25zLCBcIkx6ZVVwcmF2aXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQb3V6aXQhLnVwZGF0ZVBlcm1pc3Npb24oc2VsLmdldFNlbGVjdGlvbigpWzBdLlBlcm1pc3Npb25zLCBcIkx6ZVBvdXppdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZXZvZCEudXBkYXRlUGVybWlzc2lvbihzZWwuZ2V0U2VsZWN0aW9uKClbMF0uUGVybWlzc2lvbnMsIFwiTHplUHJldm9kXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Wm1lbml0WmtyYXRrdSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhLmxlbmd0aCA9PSAwKSB7IC8vIG5lbcOhbSDFvsOhZG7DoSBkYXRhICjFmcOhZGt5KSB0YWsgc2kgc8OhaG51IHBvIHBlcm1pc3Npb24gYm9rZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rU2FibG9uYS5zZXpuYW1QZXJtaXNzaW9ucyhycSA9PiB7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPZHN0cmFuaXQhLnVwZGF0ZVBlcm1pc3Npb24oZGF0YSwgXCJMemVTbWF6YXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE5vdmEhLnVwZGF0ZVBlcm1pc3Npb24oZGF0YSwgXCJMemVaYWxveml0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWwhLnVwZGF0ZVBlcm1pc3Npb24oZGF0YSwgXCJMemVVcHJhdml0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQb3V6aXQhLnVwZGF0ZVBlcm1pc3Npb24oZGF0YSwgXCJMemVQb3V6aXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZXZvZCEudXBkYXRlUGVybWlzc2lvbihkYXRhLCBcIkx6ZVByZXZvZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Wm1lbml0WmtyYXRrdSEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0Tm92YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w6FcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkFjdGlvbkVudW0ubm92eVphem5hbSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7ICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubm92YVNhYmxvbmEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBHb3JkaWMuR2luLkljb25zLkVudGl0eUVudW0uZGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZXRhaWxTYWJsb255KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2RzdHJhbml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLm9kc3RyYW5pdCxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkZWsgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva3NwaXREdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJQb3R2cnplbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIk9wcmF2ZHUgY2hjZXRlIHNtYXphdCB2eWJyYW7DvSB6w6F6bmFtP1wiLCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb21pc2VTbWF6U2FibG9uYShyYWRlay5peHNfcGl0ISwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFptZW5pdFprcmF0a3U6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlptxJtuaXQgemtyYXRrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS56bWVuaXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnptZW5pdFprcmF0a3UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UG91eml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDQyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLnBva3JhY292YXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb3V6aXRpU2FibG9ueSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQcmV2b2Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWV2b2QgxaFhYmxvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IEdvcmRpYy5HaW4uSWNvbnMuQWN0aW9uRW51bS5wcmVkYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdFdpbmRvdyA9IHRoYXQuZGlhbG9ncy5zaG93V2luZG93KFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1Z5YmVyS25paHlQcmV2b2RUYWJcIiwgeyBpeHBEZW46IHRoYXQuaXhwRGVuIH0sIFwiVsO9YsSbciBrbmloeVwiLCA2MDAsIDYwMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KHNlbGVjdFdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dDb250ZW50LmNsb3NlKGZ1bmN0aW9uICggaXhwRGVuOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXhwRGVuICE9IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rU2FibG9uYS5wcmV2b2QocnEgPT4geyByZXR1cm4geyBpeHBEZW46IGl4cERlbiB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAodGV4dCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHRleHQsIFwiZy1zdGF0ZS1zdWNjZXNzXCIsIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgdm9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIHZvYmouYmFzZU1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgICAvLyBlbmQgY2xvc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE5vdmEsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0T2RzdHJhbml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RabWVuaXRaa3JhdGt1LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RQb3V6aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFByZXZvZCwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rc3BpdER0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tzcGl0RHRvPigpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpeHNfcGl0XCIsIGNhcHRpb246IFwiUElEXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZfc2FibG9ueVwiLCBjYXB0aW9uOiBcIk7DoXpldiDFoWFibG9ueVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19mdW5fdHh0XCIsIGNhcHRpb246IFwiVmxhc3Ruw61rIMWhYWJsb255XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia3RnX3R5cF90eHRcIiwgY2FwdGlvbjogXCJUeXAgZG9rbGFkdVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImt0Z19kb2tfdHh0XCIsIGNhcHRpb246IFwiS2F0ZWdvcmllIGRva2xhZHVcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJkcnVoX2Rva190eHRcIiwgY2FwdGlvbjogXCJEcnVoIGRva2xhZHVcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6cHVzX3BsYXRieV90eHRcIiwgY2FwdGlvbjogXCJacC4gcGxhdGJ5XCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicHNfc21sX2FjXCIsIGNhcHRpb246IFwiU21sb3V2YS9PYmplZG7DoXZrYVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInBvcGlzXCIsIGNhcHRpb246IFwiUG9waXNcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJrb250YWNlXCIsIGNhcHRpb246IFwiUMWZZWRrb250YWNlXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNfY2Vsa2VtX21cIiwgY2FwdGlvbjogXCLEjMOhc3RrYSB2IG3Em25lXCIgfSlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJlc3VfdHh0XCIsIGNhcHRpb246IFwiTsOhemV2IEVTVVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImVzdV9uYXpldlwiLCBjYXB0aW9uOiBcIk7DoXpldiBzdWJqZWt0dVwiIH0pXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2Z1bl9uYXpldl9yZlwiLCBjYXB0aW9uOiBcIlptxJtudSBwcm92ZWRsXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGF0ZUNvbHVtbih7IG5hbWU6IFwiZGF0X3ptZW5hXCIsIGNhcHRpb246IFwiRGF0dW0gem3Em255XCIgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRldGFpbFNhYmxvbnkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7ICAgIFxyXG5cclxuICAgICAgICAgICAgbGV0IHJhZGVrID0gdGhpcy5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tzcGl0RHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgbGV0IFBhcmFtc0pTT04gPSB7IGl4c1BpdDogcmFkZWsuaXhzX3BpdCEsIHVpZDogXCJHUG9rRGV0YWlsU2FibG9ueVRhYiNcIiB9XHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RXaW5kb3cgPSB0aGlzLm5hdmlnYXRlKFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0RldGFpbFNhYmxvbmFUYWJcIiwgUGFyYW1zSlNPTik7XHJcblxyXG4gICAgICAgICAgICBsZXQgd2luZG93Q29udGVudCA9ICQuY29udGVudChzZWxlY3RXaW5kb3cpO1xyXG4gICAgICAgICAgICB3aW5kb3dDb250ZW50LmNsb3NlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbm92YVNhYmxvbmEoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgUGFyYW1zSlNPTiA9IHsgaXhzUGl0OiBcIlwiLCB1aWQ6IFwiR1Bva0RldGFpbFNhYmxvbnlUYWIjXCIgfTtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdFdpbmRvdyA9IHRoaXMubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRGV0YWlsU2FibG9uYVRhYlwiLCBQYXJhbXNKU09OKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KHNlbGVjdFdpbmRvdyk7XHJcbiAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuY2xvc2UoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgem1lbml0WmtyYXRrdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciByYWRlayA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rc3BpdER0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rU2FibG9ueVprcmF0a3lUYWJcIiwgeyBlZGl0TW9kZTogdHJ1ZSwgaXhzUGl0U2V6bmFtOiByYWRlay5peHNfcGl0ISB9LCBcIlprcmF0a3kgcG9rbGFkbsOtY2ggxaFhYmxvblwiKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHBvdXppdGlTYWJsb255KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcmFkZWsgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva3NwaXREdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdO1xyXG5cclxuICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1dlYkRva2xhZC5wcm9taXNlUG9kYW5pU2FibG9uYSh0aGlzLCB0cnVlLCByYWRlay5peHNfcGl0ISlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpeHA6IHN0cmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGV0YWlsV2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBpeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BvZGFuaTogdHJ1ZSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh6cHJhdmE6IHN0cmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoV2FybmluZyh0aGF0LCB6cHJhdmEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcm9taXNlU21helNhYmxvbmEoaXhzUGl0OiBzdHJpbmcsIGtvblByaXJhemVuaVprcmF0Y2U6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva1NhYmxvbmEuc21hemF0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c1BpdDogaXhzUGl0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga29uUHJpcmF6ZW5pWmtyYXRjZToga29uUHJpcmF6ZW5pWmtyYXRjZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hTdWNjZXNzKHRoYXQsIFwiUG9rbGFkbsOtIMWhYWJsb25hIGJ5bGEgc21hesOhbmEhXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvYmouYmFzZVR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIiB8fCB2b2JqLmV4Y2VwdGlvblR5cGUgPT09IFwiR29yZGljLkdlbmVyYWwuR0hwbFZhbGlkYXRpb25FeGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoRXJyb3IodGhhdCwgdm9iai5iYXNlTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2b2JqLmRhdGEubWVtYmVyKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmRhdGEubWVtYmVyID09IFwia29uUHJpcmF6ZW5pWmtyYXRjZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKHZvYmouYmFzZU1lc3NhZ2UpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIikudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnByb21pc2VTbWF6U2FibG9uYShpeHNQaXQsIGZhbHNlKTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KHRoaXMuaXNsLlBva1NhYmxvbmEubGlzdChycSA9PiB7IHJldHVybiB7IGZyYWdtZW50czogW1wiUE9LU1BJVFwiLCBcIlBPS1NQSVRfVFhUXCIsIFwiUGVybWlzc2lvbnNcIl0sIGZpbHRlcnM6IHt9IH07IH0pKTtcclxuXHJcbiAgICAgICAgICAgdGhpcy5ncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IHZpZXdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl19