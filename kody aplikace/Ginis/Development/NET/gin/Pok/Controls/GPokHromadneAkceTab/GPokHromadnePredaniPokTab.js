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
            let GPokHromadnePredaniPokTab = class GPokHromadnePredaniPokTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Předání do POK";
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
                    this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        title: "",
                        gridFormat: Gordic.Pok.WebClient.GPokWebBase.CreateGridFormatHromadne(),
                        keys: "ixp",
                        data: this.pokDoklady,
                        indicatorType: "KPI",
                        firstStep: {
                            title: "Zadání",
                            description: "Kontrola a doplnění údajů pro předání dokladů do POK",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
                            form: new Gordic.Forms.Form({ name: "formDlg2", layoutDescriptor: "L2M2S1, L-2-10-0, M-12-12-0, S-12-12-0" })
                                .addRow("Kniha")
                                .addField("gselectbox", Gordic.Prefabs.Select.poksden(), {
                                dropdown: true,
                                name: "ixp_den",
                                validators: [new Gordic.Validators.Required()],
                                serverFilters: {
                                    ico: that.gpc.ico,
                                    ucs: that.gpc.ucs,
                                    rok: that.gpc.rok,
                                    ixs_vpk: that.pokKniha.ixs_vpk,
                                    mena: that.pokKniha.mena
                                }
                            })
                                .addRow("Cíl")
                                .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                                name: "referent",
                                validators: [new Gordic.Validators.Required()],
                                serverFilters: {
                                    aktivita: 100,
                                    VrfuIxpDen: that.pokKniha.ixp_den,
                                    VrfuTypAg: "pok",
                                    DlePovolenychFazi: that.faze,
                                    VrfuAktivita: 100,
                                    VrfuSubrada: that.subrada
                                }
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
                                                meta.data.wiz_kind = data.LzePredatDoPok.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = data.LzePredatDoPok.message;
                                                meta.data.wiz_check = data.LzePredatDoPok.value;
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
                                    that.isl.PokDoklad.predatDoPok(rq => {
                                        return {
                                            ixp: row.ixp,
                                            ixsFunPrijemce: model.referent.ixs_fun,
                                            ixsSuPrijemce: model.referent.ixs_su,
                                            ixpDen: model.ixp_den.ixp_den,
                                            dotaz: true
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
                                            else if (vobj.data.member) {
                                                if (vobj.data.member == "dotaz") {
                                                    //question
                                                    vobj.handled = true;
                                                    row.wiz_kind = 206 /* Gordic.Isl.GOperationResultKind.Warning */;
                                                    row.wiz_txt_err = vobj.baseMessage;
                                                }
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
                        },
                        lastStep: {
                            title: "Výsledek",
                            gridTabTitle: "Seznam předaných dokladů do POK",
                            description: "Výsledek hromadného předání dokladů do POK"
                        },
                        completeDelegate: (view) => {
                            that.close(true);
                        },
                        cancelDelegate: () => {
                            that.close(false);
                        },
                    }, { title: "Hromadné předání do POK" });
                }
            };
            GPokHromadnePredaniPokTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePredaniPokTab);
            WebClient.GPokHromadnePredaniPokTab = GPokHromadnePredaniPokTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJlZGFuaVBva1RhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tIcm9tYWRuZVByZWRhbmlQb2tUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDJEQUEyRDtBQUMzRCxJQUFVLE1BQU0sQ0E0T2Y7QUE1T0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNE9uQjtJQTVPZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNE83QjtRQTVPb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsT0FBQSxZQUFZO2dCQU92RCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFHaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFcEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0JBQy9FLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUM7NEJBQ3JCLGtCQUFrQjs0QkFDbEIsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDaEMsQ0FBQzs0QkFFRCw0QkFBNEI7NEJBQzVCLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dDQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFD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QjtBQUFELENBQUMsRUE1T1MsTUFBTSxLQUFOLE1BQU0sUUE0T2YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0hyb21hZG5lUHJlZGFuaVBva1RhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHBva0Rva2xhZHk6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG9bXTtcclxuICAgICAgICBwcml2YXRlIHBva0tuaWhhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBzdWJyYWRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBmYXplOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIlDFmWVkw6Fuw60gZG8gUE9LXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgZGVmYXVsdEFjdGlvbjogdHJ1ZSB9XSk7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZEFjdGlvbkRldGFpbCA9IG5ldyBHQWN0aW9uKCQuZXh0ZW5kKHRydWUsIEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL290ZXbFmWVuw60geiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGEuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vdGV2xZllbsOtIHogYWtjZSB2IG1lbnVCYXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5nZXRHcmlkKCkuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilbMF0uaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRGV0YWlsRG9rbGFkdVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BvZGFuaTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZDogXCJHUG9rRGV0YWlsRG9rbGFkdSNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9KSwgeyBuYW1lOiBcImFjdERldGFpbFwiIH0pKVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViQmFzZS5DcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmUoKSwgXHJcbiAgICAgICAgICAgICAgICBrZXlzOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wb2tEb2tsYWR5LFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlphZMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiS29udHJvbGEgYSBkb3BsbsSbbsOtIMO6ZGFqxa8gcHJvIHDFmWVkw6Fuw60gZG9rbGFkxa8gZG8gUE9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlZ5YnJhbsOpIHBva2xhZG7DrSBkb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1EbGcyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTItMTAtMCwgTS0xMi0xMi0wLCBTLTEyLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiS25paGFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LnBva3NkZW4oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmdwYy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhhdC5ncGMudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQuZ3BjLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3ZwazogdGhhdC5wb2tLbmloYS5peHNfdnBrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW5hOiB0aGF0LnBva0tuaWhhLm1lbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkPDrWxcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJlZmVyZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZyZnVJeHBEZW46IHRoYXQucG9rS25paGEuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVR5cEFnOiBcInBva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEbGVQb3ZvbGVueWNoRmF6aTogdGhhdC5mYXplLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdVN1YnJhZGE6IHRoYXQuc3VicmFkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIml4cFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwQXJyYXkgPSBkYXRhLm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5peHA7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5zZXpuYW1QZXJtaXNzaW9ucyhycSA9PiB7IHJldHVybiB7IGl4cDogeCB9IH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5peHAgPT09IHgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gZGF0YS5MemVQcmVkYXREb1Bvay52YWx1ZSA/IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyA6IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gZGF0YS5MemVQcmVkYXREb1Bvay5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfY2hlY2sgPSBkYXRhLkx6ZVByZWRhdERvUG9rLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IGl4cEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZ2V0RGF0YVJvd3ModHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAobWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhLmRhdGEuaXhwID09PSB4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gdm9iai5iYXNlTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2NoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaXhwQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJQxZllZGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2tEb2tsYWQucHJlZGF0RG9Qb2soXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByb3cuaXhwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNGdW5QcmlqZW1jZTogbW9kZWwucmVmZXJlbnQuaXhzX2Z1bixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c1N1UHJpamVtY2U6IG1vZGVsLnJlZmVyZW50Lml4c19zdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cERlbjogbW9kZWwuaXhwX2Rlbi5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90YXo6IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSBcIkRva2xhZCBieWwgw7pzcMSbxaFuxJsgcMWZZWTDoW4hXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiIHx8IHZvYmouZXhjZXB0aW9uVHlwZSA9PT0gXCJHb3JkaWMuR2VuZXJhbC5HSHBsVmFsaWRhdGlvbkV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodm9iai5kYXRhLm1lbWJlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5kYXRhLm1lbWJlciA9PSBcImRvdGF6XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9xdWVzdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLldhcm5pbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVsO9c2xlZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlNlem5hbSBwxZllZGFuw71jaCBkb2tsYWTFryBkbyBQT0tcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWw71zbGVkZWsgaHJvbWFkbsOpaG8gcMWZZWTDoW7DrSBkb2tsYWTFryBkbyBQT0tcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sIHsgdGl0bGU6IFwiSHJvbWFkbsOpIHDFmWVkw6Fuw60gZG8gUE9LXCIgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=