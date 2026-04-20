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
            let GPokHromadnePredaniTab = class GPokHromadnePredaniTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Předání";
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
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
                        tema: "wfl_ptm_hromprd",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:PredavaciProtokol",
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
                            let nazevRef = that.wizard.findFields("ixs_fun_akt").gfield("getValue");
                            if (nazevRef)
                                nazevRef = nazevRef.nazev_ref;
                            if (!nazevRef) {
                                return that.dialogs.warning("Není vyplněn cíl předání")
                                    .createDialogPromise(false);
                            }
                            rep.customDto = { nazevRef: nazevRef, arrayIxp: array };
                            return def.resolve(rep).promise();
                        }
                    });
                    that.wizard = this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: "",
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
                            description: "Akce provede předání vybraných pokladních dokladů.",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
                            form: Gordic.Eko.Prefabs.PredaniDokladuForm({
                                SouvisejiciViditelnost: false,
                                SouvisejiciZmena: false,
                                StartFiltrZpracovatel: {
                                    DlePovolenychFazi: ["GWAPOK05", "GSAPOK01"], //that.gpc.faze
                                    VrfuTypAg: "pok",
                                    VrfuAktivita: 100,
                                    VrfuIxpDen: that.ixpDen,
                                    VrfuSubrada: that.subrada,
                                    aktivita: 100,
                                    ReferentAktivita: 100
                                },
                                KompetentViditelnost: true
                            }),
                            checkAction: (model, data) => {
                                var view = new Gordic.Data.View(data, { key: "ixp" });
                                var ixpArray = data.map(function (d) { return d.ixp; });
                                let i = 0;
                                let def = $.Deferred();
                                ixpArray.forEach(function (x) {
                                    that.isl.PokDoklad.seznamPermissions(rq => { return { ixp: x }; }).get()
                                        .done(function (data) {
                                        view.getDataRows(true).forEach(function (meta) {
                                            if (meta.data.ixp === x) {
                                                i = i + 1;
                                                meta.data.wiz_kind = data.LzePredatFunkci.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = data.LzePredatFunkci.message;
                                                meta.data.wiz_check = data.LzePredatFunkci.value;
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
                                });
                                return def.promise();
                            },
                            nextActionName: "Předat",
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                let y = 0;
                                if (data.length == 0)
                                    def.resolve(data);
                                data.forEach(function (row) {
                                    that.isl.PokDoklad.predatDoklad(rq => {
                                        return {
                                            ixp: row.ixp,
                                            duvod: model.duvod,
                                            ixsFunPrijemce: model.ixs_fun_akt,
                                            ixsSuPrijemce: model.ixs_su,
                                            ixsRefPrijemce: model.ixs_ref
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
                            gridTabTitle: "Seznam předaných dokumentů",
                            description: "Výsledek hromadného předání dokumentů",
                            defaultAction: gridActionDetail,
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        completeDelegate: (view) => {
                            that.close(true);
                        },
                        cancelDelegate: () => {
                            that.close(false);
                        },
                    }, { title: "Hromadné předání dokumentů" });
                }
            };
            GPokHromadnePredaniTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePredaniTab);
            WebClient.GPokHromadnePredaniTab = GPokHromadnePredaniTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJlZGFuaVRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tIcm9tYWRuZVByZWRhbmlUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDJEQUEyRDtBQUMzRCxJQUFVLE1BQU0sQ0FtUWY7QUFuUUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbVFuQjtJQW5RZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbVE3QjtRQW5Rb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQU9wRCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFHaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBSXBFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO3dCQUMvRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFFbEIsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDOzRCQUNyQixrQkFBa0I7NEJBQ2xCLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNmLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ2hDLENBQUM7NEJBRUQsNEJBQTRCOzRCQUM1QixJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDWixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENB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QUFELENBQUMsRUFuUVMsTUFBTSxLQUFOLE1BQU0sUUFtUWYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0hyb21hZG5lUHJlZGFuaVRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICBcclxuICAgICAgICBwb2tEb2tsYWR5OiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBzdWJyYWRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBpeHBEZW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHdpemFyZDtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUMWZZWTDoW7DrVwiO1xyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGRlZmF1bHRBY3Rpb246IHRydWUgfV0pO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWRBY3Rpb25EZXRhaWwgPSBuZXcgR0FjdGlvbigkLmV4dGVuZCh0cnVlLCBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb3RldsWZZW7DrSB6IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguY2VsbEluZm8uZGF0YS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL290ZXbFmWVuw60geiBha2NlIHYgbWVudUJhcnVcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmdldEdyaWQoKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9kYW5pOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkOiBcIkdQb2tEZXRhaWxEb2tsYWR1I1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLCB7IG5hbWU6IFwiYWN0RGV0YWlsXCIgfSkpXHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0VGlza1ByZWRhdCA9IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrUHJlZGF0XCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcIndmbF9wdG1faHJvbXByZFwiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOlByZWRhdmFjaVByb3Rva29sXCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRGaW5pc2hlZDogZnVuY3Rpb24gKGV2ZW50LCByZXBJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2l6ID0gdGhhdC53aXphcmQuZmluZChcIi5nZ3JpZFwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJGdyaWQgPSAkKHdpeik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V6bmFtID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KCRncmlkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXpuYW0gfHwgc2V6bmFtIS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5hbGVydChcIk5lYnlseSB2eWJyw6FueSDFvsOhZG7DqSBkb2tsYWR5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gc2V6bmFtIS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguaXhwISB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hemV2UmVmID0gdGhhdC53aXphcmQuZmluZEZpZWxkcyhcIml4c19mdW5fYWt0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hemV2UmVmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXpldlJlZiA9IG5hemV2UmVmLm5hemV2X3JlZjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuYXpldlJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJOZW7DrSB2eXBsbsSbbiBjw61sIHDFmWVkw6Fuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBuYXpldlJlZjogbmF6ZXZSZWYsIGFycmF5SXhwOiBhcnJheSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVwKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgdGhhdC53aXphcmQgPSB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJCYXNlLkNyZWF0ZUdyaWRGb3JtYXRIcm9tYWRuZSgpLFxyXG4gICAgICAgICAgICAgICAga2V5czogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucG9rRG9rbGFkeSxcclxuICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZWxlbWVudCA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hIHbFoWVjaCBkYXRlY2hcclxuICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50W1wid2l6X2NoZWNrXCJdID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXbDrW0gZWxlbWVudCB6YXRyxb5lbsOtXHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh7IHJlc3VsdDogZGF0YSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJaYWTDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFrY2UgcHJvdmVkZSBwxZllZMOhbsOtIHZ5YnJhbsO9Y2ggcG9rbGFkbsOtY2ggZG9rbGFkxa8uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlZ5YnJhbsOpIHBva2xhZG7DrSBkb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiAgR29yZGljLkVrby5QcmVmYWJzLlByZWRhbmlEb2tsYWR1Rm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNvdXZpc2VqaWNpVmlkaXRlbG5vc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTb3V2aXNlamljaVptZW5hOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0clpwcmFjb3ZhdGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEbGVQb3ZvbGVueWNoRmF6aTogW1wiR1dBUE9LMDVcIiwgXCJHU0FQT0swMVwiXSwgLy90aGF0LmdwYy5mYXplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1VHlwQWc6IFwicG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVJeHBEZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IHRoYXQuc3VicmFkYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWZlcmVudEFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50VmlkaXRlbG5vc3Q6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHBBcnJheSA9IGRhdGEubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLml4cDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBBcnJheS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLnNlem5hbVBlcm1pc3Npb25zKHJxID0+IHsgcmV0dXJuIHsgaXhwOiB4IH0gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YS5kYXRhLml4cCA9PT0geCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2tpbmQgPSBkYXRhLkx6ZVByZWRhdEZ1bmtjaS52YWx1ZSA/IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyA6IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gZGF0YS5MemVQcmVkYXRGdW5rY2kubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2NoZWNrID0gZGF0YS5MemVQcmVkYXRGdW5rY2kudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaXhwQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5peHAgPT09IHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpeHBBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIlDFmWVkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5wcmVkYXREb2tsYWQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHV2b2Q6IG1vZGVsLmR1dm9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzRnVuUHJpamVtY2U6IG1vZGVsLml4c19mdW5fYWt0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzU3VQcmlqZW1jZTogbW9kZWwuaXhzX3N1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzUmVmUHJpamVtY2U6IG1vZGVsLml4c19yZWZcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSBcIkRva2xhZCBieWwgw7pzcMSbxaFuxJsgcMWZZWTDoW4hXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiIHx8IHZvYmouZXhjZXB0aW9uVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gdm9iai5iYXNlTWVzc2FnZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0geSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSA9PSBkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogW3sgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCB9LCB7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IGFjdFRpc2tQcmVkYXQgfV0sICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlbDvXNsZWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJTZXpuYW0gcMWZZWRhbsO9Y2ggZG9rdW1lbnTFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlbDvXNsZWRlayBocm9tYWRuw6lobyBwxZllZMOhbsOtIGRva3VtZW50xa9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH1dLCAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LCB7IHRpdGxlOiBcIkhyb21hZG7DqSBwxZllZMOhbsOtIGRva3VtZW50xa9cIiB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==