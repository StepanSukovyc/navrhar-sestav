"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/no-namespace
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokHromadnePredaniKnihaTab = class GPokHromadnePredaniKnihaTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Přeevidence";
                    //this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);         
                    const gridActionDetail = new GAction($.extend(true, Gordic.Eko.Action.actionDetail({
                        run: function (ev, ctx) {
                            let row = "";
                            //otevření z gridu
                            if (ctx.cellInfo) {
                                row = ctx.cellInfo.data.ixp;
                            }
                            //otevření z akce v menuBaru
                            if (row == "") {
                                row = ctx.getGrid().ggrid("getSelection")[0].ixp;
                            }
                            if (row != "") {
                                that.navigate("Gordic.Pok.WebClient.GPokDetailDokladuTab", {
                                    ixp: row,
                                    newPodani: false,
                                    Id: "GPokDetailDokladu#"
                                });
                            }
                        },
                        enabled: true
                    }), { name: "actDetail" }));
                    var actTiskPredat = Gordic.Eko.Action.actionTisk({
                        name: "actTiskPredat",
                        tema: "wfl_ptm_hromprk",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:PredaniDoJineKnihy",
                        reportFinished: function (event, repInfo) {
                        },
                        enabled: true,
                        favorite: false,
                        parentContent: that,
                        reportStarting: function (rep) {
                            let def = $.Deferred();
                            let wiz = that.wizard.find(".ggrid")[0];
                            let $grid = $(wiz);
                            const seznam = Gordic.Eko.Grid.checkedRows($grid, true);
                            if (!seznam || seznam.length === 0) {
                                return that.dialogs.alert("Nebyly vybrány žádné doklady")
                                    .createDialogPromise(false);
                            }
                            const array = seznam.map(function (x) { return x.ixp; });
                            let valueReferent = that.wizard.findFields("ixs_fun_akt").gfield("getValue");
                            let referentNazev = "";
                            let nazev = "";
                            if (valueReferent) {
                                referentNazev = valueReferent.nazev_ref;
                                nazev = valueReferent.nazev;
                            }
                            if (!valueReferent) {
                                return that.dialogs.warning("Není vyplněn cíl předání")
                                    .createDialogPromise(false);
                            }
                            let ixpDen = that.wizard.findFields("ixp_den").gfield("getValue");
                            if (ixpDen) {
                                ixpDen = ixpDen.ixp_den;
                            }
                            if (!ixpDen) {
                                return that.dialogs.warning("Není vyplěna kniha předání")
                                    .createDialogPromise(false);
                            }
                            rep.customDto = { nazevRef: referentNazev, arrayIxp: array, nazev: nazev, ixp_den: ixpDen };
                            return def.resolve(rep).promise();
                        }
                    });
                    that.wizard = this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: "", //"Přeevidence do jiné knihy",
                        gridFormat: Gordic.Pok.WebClient.GPokWebBase.CreateGridFormatHromadne(),
                        keys: "ixp",
                        data: this.pokDoklady,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            data.forEach(element => {
                                element["wiz_check"] = true; // nastavím element zatržení
                            });
                            return $.Deferred().resolve({ result: data }).promise();
                        },
                        firstStep: {
                            title: "Zadání",
                            description: "Akce provede přeevidenci do jiné vybrané knihy",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
                            form: Gordic.Eko.Prefabs.PreevidenceDokladuForm({
                                KompetentViditelnost: false,
                                KompetentZmena: false,
                                StartFiltrKniha: {
                                    typ_ag: 90,
                                    ico: that.gpc.ico,
                                    ucs: that.gpc.ucs,
                                    aktivita: 100,
                                    rok: that.pokKniha.rok,
                                    // ixp_den: that.pokKniha.ixp_den != null ? "!= " + that.pokKniha.ixp_den : undefined,
                                    // mena: that.pokKniha.mena,
                                    // ixs_vpk: that.pokKniha.ixs_vpk
                                },
                                StartFiltrZpracovatel: {
                                    DlePovolenychFazi: that.faze,
                                    VrfuAktivita: 100,
                                    VrfuSubrada: that.subrada,
                                    VrfuTypAg: "pok",
                                    VrfuIxpDen: that.pokKniha.ixp_den,
                                    aktivita: 100,
                                }
                            }),
                            checkAction: (model, data) => {
                                let def = $.Deferred();
                                //prvně kontrola knih a potom až jednotlivé doklady
                                that.call("KontrolaMenaSadaKontaci", { ixpDenCil: model.ixp_den }).done(function (permi) {
                                    var view = new Gordic.Data.View(data, { key: "ixp" });
                                    var ixpArray = data.map(function (d) { return d.ixp; });
                                    let i = 0;
                                    ixpArray.forEach(function (x) {
                                        if (permi.value == true) {
                                            that.isl.PokDoklad.seznamPermissions(rq => { return { ixp: x }; }).get()
                                                .done(function (data) {
                                                view.getDataRows(true).forEach(function (meta) {
                                                    if (meta.data.ixp === x) {
                                                        i = i + 1;
                                                        meta.data.wiz_kind = data.LzePredatDoJineKnihy.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                        meta.data.wiz_txt_err = data.LzePredatDoJineKnihy.message;
                                                        meta.data.wiz_check = data.LzePredatDoJineKnihy.value;
                                                    }
                                                    if (i == ixpArray.length) {
                                                        def.resolve(view);
                                                    }
                                                });
                                            })
                                                .fail(function (xhr, type, vobj) {
                                                view.getDataRows(true).forEach(function (meta) {
                                                    vobj.handled = true;
                                                    if (meta.data.ixp === x) {
                                                        i = i + 1;
                                                        meta.data.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                        meta.data.wiz_txt_err = vobj.baseMessage;
                                                        meta.data.wiz_check = false;
                                                    }
                                                    if (i == ixpArray.length) {
                                                        def.resolve(view);
                                                    }
                                                });
                                            });
                                        }
                                        else { //if permi
                                            view.getDataRows(true).forEach(function (meta) {
                                                meta.data.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = permi.message;
                                                meta.data.wiz_check = permi;
                                            });
                                            def.resolve(view);
                                        }
                                        ; //end if
                                    });
                                }); //end caLL
                                return def.promise();
                            },
                            nextActionName: "Předat",
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                let y = 0;
                                if (data.length == 0)
                                    def.resolve(data);
                                data.forEach(function (row) {
                                    that.isl.PokDoklad.predatDoJineKnihy(rq => {
                                        return {
                                            ixp: row.ixp,
                                            ixpDen: model.ixp_den,
                                            ixsFunPrijemce: model.ixs_fun_akt,
                                            ixsSuPrijemce: model.ixs_su
                                        };
                                    })
                                        .get()
                                        .done(function () {
                                        row.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                        row.wiz_txt_err = "Doklad byl úspěšně předán!";
                                    })
                                        .fail(function (xhr, type, vobj) {
                                        if (type === "exception") {
                                            if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                                vobj.handled = true;
                                                row.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                row.wiz_txt_err = vobj.baseMessage;
                                            }
                                            else {
                                                vobj.handled = true;
                                                row.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                row.wiz_txt_err = vobj.baseMessage;
                                            }
                                        }
                                    })
                                        .always(function () {
                                        y = y + 1;
                                        if (y == data.length) {
                                            def.resolve(data);
                                        }
                                    });
                                });
                                return def.promise();
                            },
                            menuGridBar: [{ favorite: true, action: gridActionDetail }, { favorite: true, action: actTiskPredat }],
                        },
                        lastStep: {
                            title: "Výsledek",
                            gridTabTitle: "Seznam předaných pokladních dokladů",
                            description: "Výsledek hromadného předání pokladních dokladů",
                            defaultAction: gridActionDetail,
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        completeDelegate: (view) => {
                            that.close(true);
                        },
                        cancelDelegate: () => {
                            that.close(false);
                        },
                    }, { title: "Hromadné předání pokladních dokladů" });
                }
            };
            GPokHromadnePredaniKnihaTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePredaniKnihaTab);
            WebClient.GPokHromadnePredaniKnihaTab = GPokHromadnePredaniKnihaTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJlZGFuaUtuaWhhVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva0hyb21hZG5lUHJlZGFuaUtuaWhhVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwyREFBMkQ7QUFDM0QsSUFBVSxNQUFNLENBNFNmO0FBNVNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRTbkI7SUE1U2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRTN0I7UUE1U29CLFdBQUEsU0FBUztZQUcxQixJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUE0QixTQUFRLE9BQUEsWUFBWTtnQkFTekQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO29CQUMzQiwrRUFBK0U7b0JBRS9FLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO3dCQUMvRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFFbEIsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDOzRCQUNyQixrQkFBa0I7NEJBQ2xCLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNmLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ2hDLENBQUM7NEJBRUQsNEJBQTRCOzRCQUM1QixJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDWixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7NEJBQ3JELENBQUM7NEJBRUQsSUFBSSxHQUFHLElBQUksRUFBRSxFQUFFLENB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U1ksMkJBQTJCO2dCQUR2QyxVQUFVLENBQUMsUUFBUTtlQUNQLDJCQUEyQixDQXNTdkM7WUF0U1kscUNBQTJCLDhCQXNTdkMsQ0FBQTtRQUdMLENBQUMsRUE1U29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTRTN0I7SUFBRCxDQUFDLEVBNVNnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0U25CO0FBQUQsQ0FBQyxFQTVTUyxNQUFNLEtBQU4sTUFBTSxRQTRTZiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXHJcbm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9rSHJvbWFkbmVQcmVkYW5pS25paGFUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICBwb2tEb2tsYWR5OiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBzdWJyYWRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBpeHBEZW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGZhemU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBva0tuaWhhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG87ICAgXHJcbiAgICAgICAgcHJpdmF0ZSB3aXphcmQ7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUMWZZWV2aWRlbmNlXCI7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTsgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWRBY3Rpb25EZXRhaWwgPSBuZXcgR0FjdGlvbigkLmV4dGVuZCh0cnVlLCBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb3RldsWZZW7DrSB6IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguY2VsbEluZm8uZGF0YS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL290ZXbFmWVuw60geiBha2NlIHYgbWVudUJhcnVcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmdldEdyaWQoKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9kYW5pOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkOiBcIkdQb2tEZXRhaWxEb2tsYWR1I1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLCB7IG5hbWU6IFwiYWN0RGV0YWlsXCIgfSkpXHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0VGlza1ByZWRhdCA9IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrUHJlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcIndmbF9wdG1faHJvbXBya1wiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOlByZWRhbmlEb0ppbmVLbmloeVwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uIChldmVudCwgcmVwSW5mbykge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpeiA9IHRoYXQud2l6YXJkLmZpbmQoXCIuZ2dyaWRcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRncmlkID0gJCh3aXopO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlem5hbSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPigkZ3JpZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V6bmFtIHx8IHNlem5hbSEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJOZWJ5bHkgdnlicsOhbnkgxb7DoWRuw6kgZG9rbGFkeVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IHNlem5hbSEubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lml4cCEgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZVJlZmVyZW50ID0gdGhhdC53aXphcmQuZmluZEZpZWxkcyhcIml4c19mdW5fYWt0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZWZlcmVudE5hemV2ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmF6ZXYgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVJlZmVyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW50TmF6ZXYgPSB2YWx1ZVJlZmVyZW50Lm5hemV2X3JlZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSB2YWx1ZVJlZmVyZW50Lm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZVJlZmVyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3Mud2FybmluZyhcIk5lbsOtIHZ5cGxuxJtuIGPDrWwgcMWZZWTDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpeHBEZW4gPSB0aGF0LndpemFyZC5maW5kRmllbGRzKFwiaXhwX2RlblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl4cERlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBEZW4gPSBpeHBEZW4uaXhwX2RlbjtcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpeHBEZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiTmVuw60gdnlwbMSbbmEga25paGEgcMWZZWTDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IG5hemV2UmVmOiByZWZlcmVudE5hemV2LCBhcnJheUl4cDogYXJyYXksIG5hemV2OiBuYXpldiwgaXhwX2RlbjogaXhwRGVuIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZShyZXApLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC53aXphcmQgPSB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLCAvL1wiUMWZZWV2aWRlbmNlIGRvIGppbsOpIGtuaWh5XCIsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViQmFzZS5DcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmUoKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnBva0Rva2xhZHksXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLCAgIFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYSB2xaFlY2ggZGF0ZWNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJ3aXpfY2hlY2tcIl0gPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdsOtbSBlbGVtZW50IHphdHLFvmVuw61cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoeyByZXN1bHQ6IGRhdGEgfSkucHJvbWlzZSgpOyAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiWmFkw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHByb3ZlZGUgcMWZZWV2aWRlbmNpIGRvIGppbsOpIHZ5YnJhbsOpIGtuaWh5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlZ5YnJhbsOpIHBva2xhZG7DrSBkb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOlxyXG4gICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5QcmVmYWJzLlByZWV2aWRlbmNlRG9rbGFkdUZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50VmlkaXRlbG5vc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50Wm1lbmE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0cktuaWhhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2FnOiA5MCwgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5ncGMuaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhhdC5ncGMudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0LnBva0tuaWhhLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl4cF9kZW46IHRoYXQucG9rS25paGEuaXhwX2RlbiAhPSBudWxsID8gXCIhPSBcIiArIHRoYXQucG9rS25paGEuaXhwX2RlbiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1lbmE6IHRoYXQucG9rS25paGEubWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl4c192cGs6IHRoYXQucG9rS25paGEuaXhzX3Zwa1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFN0YXJ0RmlsdHJacHJhY292YXRlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIERsZVBvdm9sZW55Y2hGYXppOiB0aGF0LmZhemUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IHRoYXQuc3VicmFkYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1VHlwQWc6IFwicG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUl4cERlbjogdGhhdC5wb2tLbmloYS5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgfSksICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJ2bsSbIGtvbnRyb2xhIGtuaWggYSBwb3RvbSBhxb4gamVkbm90bGl2w6kgZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJLb250cm9sYU1lbmFTYWRhS29udGFjaVwiLCB7IGl4cERlbkNpbDogbW9kZWwuaXhwX2RlbiB9KS5kb25lKGZ1bmN0aW9uIChwZXJtaSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwQXJyYXkgPSBkYXRhLm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5peHA7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cEFycmF5LmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pLnZhbHVlID09IHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5zZXpuYW1QZXJtaXNzaW9ucyhycSA9PiB7IHJldHVybiB7IGl4cDogeCB9IH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5peHAgPT09IHgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfa2luZCA9IGRhdGEuTHplUHJlZGF0RG9KaW5lS25paHkudmFsdWUgPyBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3MgOiBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gZGF0YS5MemVQcmVkYXREb0ppbmVLbmloeS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IGRhdGEuTHplUHJlZGF0RG9KaW5lS25paHkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IGl4cEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YS5kYXRhLml4cCA9PT0geCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2NoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IGl4cEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvL2lmIHBlcm1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gIEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSBwZXJtaS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IHBlcm1pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgLy9lbmQgaWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS8vZW5kIGNhTExcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiUMWZZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLnByZWRhdERvSmluZUtuaWh5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogcm93Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cERlbjogbW9kZWwuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c0Z1blByaWplbWNlOiBtb2RlbC5peHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c1N1UHJpamVtY2U6IG1vZGVsLml4c19zdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSBcIkRva2xhZCBieWwgw7pzcMSbxaFuxJsgcMWZZWTDoW4hXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiIHx8IHZvYmouZXhjZXB0aW9uVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IFt7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwgfSwgeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBhY3RUaXNrUHJlZGF0IH1dLCAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiU2V6bmFtIHDFmWVkYW7DvWNoIHBva2xhZG7DrWNoIGRva2xhZMWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVsO9c2xlZGVrIGhyb21hZG7DqWhvIHDFmWVkw6Fuw60gcG9rbGFkbsOtY2ggZG9rbGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH1dLCAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sIHsgdGl0bGU6IFwiSHJvbWFkbsOpIHDFmWVkw6Fuw60gcG9rbGFkbsOtY2ggZG9rbGFkxa9cIiB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==