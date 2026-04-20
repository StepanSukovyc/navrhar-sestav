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
            let GPokHromadnePrideleniTab = class GPokHromadnePrideleniTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Přidělení";
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
                            description: "Akce provede přidělení vybraných pokladních dokladů.",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
                            form: Gordic.Eko.Prefabs.PrideleniDokladuForm({
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
                                KompetentViditelnost: false,
                                KompetentZmena: false
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
                                                meta.data.wiz_kind = data.LzePridelitFunkci.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = data.LzePridelitFunkci.message;
                                                meta.data.wiz_check = data.LzePridelitFunkci.value;
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
                            nextActionName: "Přidělit",
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                let y = 0;
                                if (data.length == 0)
                                    def.resolve(data);
                                data.forEach(function (row) {
                                    that.isl.PokDoklad.pridelitDoklad(rq => {
                                        return {
                                            ixp: row.ixp,
                                            duvod: model.duvod,
                                            ixsFunPrijemce: model.ixs_fun_akt,
                                            ixsSuPrijemce: model.ixs_su
                                        };
                                    })
                                        .get()
                                        .done(function () {
                                        row.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                        row.wiz_txt_err = "Doklad byl úspěšně přidělen!";
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
                            gridTabTitle: "Seznam přidělených dokumentů",
                            description: "Výsledek hromadného storna",
                            defaultAction: gridActionDetail,
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        completeDelegate: (view) => {
                            that.close(true);
                        },
                        cancelDelegate: () => {
                            that.close(false);
                        },
                    }, { title: "Hromadné přidělení dokumentů" });
                }
            };
            GPokHromadnePrideleniTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePrideleniTab);
            WebClient.GPokHromadnePrideleniTab = GPokHromadnePrideleniTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJpZGVsZW5pVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva0hyb21hZG5lUHJpZGVsZW5pVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwyREFBMkQ7QUFDM0QsSUFBVSxNQUFNLENBa1FmO0FBbFFELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQWtRbkI7SUFsUWdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtRN0I7UUFsUW9CLFdBQUEsU0FBUztZQUcxQixJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLE9BQUEsWUFBWTtnQkFPdEQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO29CQUt6QixNQUFNLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzt3QkFDL0UsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBRWxCLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQzs0QkFDckIsa0JBQWtCOzRCQUNsQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDZixHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNoQyxDQUFDOzRCQUVELDRCQUE0Qjs0QkFDNUIsSUFBSSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7Z0NBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDOzRCQUNyRCxDQUFDOzRCQUVELElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dDQUNaLElBQUksQ0FBQyxR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L25vLW5hbWVzcGFjZVxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0hyb21hZG5lUHJpZGVsZW5pVGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgIFxyXG4gICAgICAgIHBva0Rva2xhZHk6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG9bXTtcclxuICAgICAgICBwcml2YXRlIHN1YnJhZGE6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlDFmWlkxJtsZW7DrVwiO1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkQWN0aW9uRGV0YWlsID0gbmV3IEdBY3Rpb24oJC5leHRlbmQodHJ1ZSwgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL290ZXbFmWVuw60geiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGEuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vdGV2xZllbsOtIHogYWtjZSB2IG1lbnVCYXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5nZXRHcmlkKCkuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilbMF0uaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRGV0YWlsRG9rbGFkdVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BvZGFuaTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZDogXCJHUG9rRGV0YWlsRG9rbGFkdSNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9KSwgeyBuYW1lOiBcImFjdERldGFpbFwiIH0pKVxyXG5cclxuICAgICAgICAgICAgdmFyIGFjdFRpc2tQcmVkYXQgPSBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1ByZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViVGlzazpQcmVkYXZhY2lQcm90b2tvbFwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uIChldmVudCwgcmVwSW5mbykge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpeiA9IHRoYXQud2l6YXJkLmZpbmQoXCIuZ2dyaWRcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRncmlkID0gJCh3aXopO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlem5hbSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPigkZ3JpZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V6bmFtIHx8IHNlem5hbSEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJOZWJ5bHkgdnlicsOhbnkgxb7DoWRuw6kgZG9rbGFkeVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IHNlem5hbSEubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lml4cCEgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYXpldlJlZiA9IHRoYXQud2l6YXJkLmZpbmRGaWVsZHMoXCJpeHNfZnVuX2FrdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYXpldlJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXZSZWYgPSBuYXpldlJlZi5uYXpldl9yZWY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmF6ZXZSZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiTmVuw60gdnlwbG7Em24gY8OtbCBwxZllZMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgbmF6ZXZSZWY6IG5hemV2UmVmLCBhcnJheUl4cDogYXJyYXkgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlcCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LndpemFyZCA9IHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViQmFzZS5DcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmUoKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnBva0Rva2xhZHksXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLFxyXG4gICAgICAgICAgICAgICAgcHJlQ2hlY2tBY3Rpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYSB2xaFlY2ggZGF0ZWNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbXCJ3aXpfY2hlY2tcIl0gPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdsOtbSBlbGVtZW50IHphdHLFvmVuw61cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoeyByZXN1bHQ6IGRhdGEgfSkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlphZMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWtjZSBwcm92ZWRlIHDFmWlkxJtsZW7DrSB2eWJyYW7DvWNoIHBva2xhZG7DrWNoIGRva2xhZMWvLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeWJyYW7DqSBwb2tsYWRuw60gZG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogIEdvcmRpYy5Fa28uUHJlZmFicy5QcmlkZWxlbmlEb2tsYWR1Rm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNvdXZpc2VqaWNpVmlkaXRlbG5vc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTb3V2aXNlamljaVptZW5hOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0clpwcmFjb3ZhdGVsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEbGVQb3ZvbGVueWNoRmF6aTogW1wiR1dBUE9LMDVcIiwgXCJHU0FQT0swMVwiXSwgLy90aGF0LmdwYy5mYXplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1VHlwQWc6IFwicG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVJeHBEZW46IHRoYXQuaXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IHRoYXQuc3VicmFkYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWZlcmVudEFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50VmlkaXRlbG5vc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRabWVuYTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHBBcnJheSA9IGRhdGEubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLml4cDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBBcnJheS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLnNlem5hbVBlcm1pc3Npb25zKHJxID0+IHsgcmV0dXJuIHsgaXhwOiB4IH0gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YS5kYXRhLml4cCA9PT0geCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2tpbmQgPSBkYXRhLkx6ZVByaWRlbGl0RnVua2NpLnZhbHVlID8gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzIDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSBkYXRhLkx6ZVByaWRlbGl0RnVua2NpLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IGRhdGEuTHplUHJpZGVsaXRGdW5rY2kudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaXhwQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5peHAgPT09IHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpeHBBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIlDFmWlkxJtsaXRcIixcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5wcmlkZWxpdERva2xhZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogbW9kZWwuZHV2b2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNGdW5QcmlqZW1jZTogbW9kZWwuaXhzX2Z1bl9ha3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNTdVByaWplbWNlOiBtb2RlbC5peHNfc3VcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSBcIkRva2xhZCBieWwgw7pzcMSbxaFuxJsgcMWZaWTEm2xlbiFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgdm9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gdm9iai5iYXNlTWVzc2FnZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB5ICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ID09IGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH0sIHsgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogYWN0VGlza1ByZWRhdCB9XSwgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiU2V6bmFtIHDFmWlkxJtsZW7DvWNoIGRva3VtZW50xa9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWw71zbGVkZWsgaHJvbWFkbsOpaG8gc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogW3sgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCB9XSwgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LCB7IHRpdGxlOiBcIkhyb21hZG7DqSBwxZlpZMSbbGVuw60gZG9rdW1lbnTFr1wiIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuIl19