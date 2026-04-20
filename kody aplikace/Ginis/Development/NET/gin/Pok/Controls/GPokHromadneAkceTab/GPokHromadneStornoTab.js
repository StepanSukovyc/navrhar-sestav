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
            let GPokHromadneStornoTab = class GPokHromadneStornoTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Hromadné storno";
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
                    that.doplnDatumOdparovani(that.pokDoklady)
                        .done(function (finishData) {
                        that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                            title: "",
                            gridFormat: new Gordic.Data.GridFormat().addDateColumn({ name: "wiz_datum", caption: "Datum odpárování", width: 120 }).add(Gordic.Pok.WebClient.GPokWebBase.CreateGridFormatHromadne()),
                            keys: "ixp",
                            data: finishData,
                            indicatorType: "KPI",
                            firstStep: {
                                title: "Hromadné storno pokladních dokladů",
                                description: "Kontrola a doplnění důvodu před hromadným stornem",
                                gridTabTitle: "Vybrané pokladní doklady",
                                defaultAction: gridActionDetail,
                                form: new Gordic.Forms.Form({ name: "wizParams" }).addSection().addRow("Důvod").addField("gstringbox", { name: "reason", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Required()] }).addRow("Případné datum odpárování").addField("gdatebox", { name: "datOdparovani", initialValue: new Date() }),
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
                                                    meta.data.wiz_kind = data.LzeStorno.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                    meta.data.wiz_txt_err = data.LzeStorno.message;
                                                    meta.data.wiz_check = data.LzeStorno.value;
                                                    //když můžu stornovat,tak si zkusím dotáhnout datum odpárování
                                                    if (data.LzeStorno.value == true) {
                                                        that.call("GetDatumOdparovani", { ixp: x })
                                                            .done(function (data) {
                                                            i = i + 1;
                                                            if (data.stav == 0) {
                                                                meta.data.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                                                meta.data.wiz_datum = data.dat_odp;
                                                                meta.data.wiz_check = true;
                                                            }
                                                            else if (data.stav == 1) {
                                                                //question
                                                                meta.data.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                                meta.data.wiz_txt_err = data.vysledek;
                                                            }
                                                            if (i == ixpArray.length) {
                                                                def.resolve(view);
                                                            }
                                                        });
                                                    }
                                                    else {
                                                        i = i + 1;
                                                        if (i == ixpArray.length) {
                                                            def.resolve(view);
                                                        }
                                                    }
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
                                nextActionName: "Storno",
                                nextAction: (model, data) => {
                                    let def = $.Deferred();
                                    let y = 0;
                                    if (data.length == 0)
                                        def.resolve(data);
                                    data.forEach(function (row) {
                                        that.isl.PokDoklad.storno(rq => {
                                            return {
                                                ixp: row.ixp,
                                                duvod: model.reason,
                                                datumOdparovani: row.wiz_datum ?? model.datOdparovani,
                                                kontorlovatRok: true
                                            };
                                        })
                                            .get()
                                            .done(function () {
                                            row.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                            row.wiz_txt_err = "Doklad byl úspěšně stornován!";
                                        })
                                            .fail(function (xhr, type, vobj) {
                                            if (type === "exception") {
                                                if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                                    vobj.handled = true;
                                                    row.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                    row.wiz_txt_err = vobj.baseMessage;
                                                }
                                                else if (vobj.data.member) {
                                                    if (vobj.data.member == "kontorlovatRok") {
                                                        vobj.handled = true;
                                                        //row.stavU = 2;
                                                        //row.vysledekU = vobj.baseMessage;
                                                        //question stav??
                                                        row.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
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
                                menuGridBar: [{ favorite: true, action: gridActionDetail }],
                            },
                            lastStep: {
                                title: "Výsledek",
                                gridTabTitle: "Seznam stornovaných pokladních dokladů",
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
                        }, { title: "Hromadné storno pokladních dokladů" });
                    });
                }
                doplnDatumOdparovani(pokDoklady) {
                    let i = 0;
                    let that = this;
                    that.beginOperation("Doplění podrobností(datum odpárování,...)");
                    let def = $.Deferred();
                    pokDoklady.forEach(function (x) {
                        that.call("GetDatumOdparovani", { ixp: x.ixp })
                            .done(function (data) {
                            i = i + 1;
                            if (data.stav == 0) {
                                x.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                x.wiz_datum = data.dat_odp;
                                x.wiz_check = true;
                            }
                            else if (data.stav == 1) {
                                //question
                                x.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                x.wiz_txt_err = data.vysledek;
                            }
                            if (i == pokDoklady.length) {
                                def.resolve(pokDoklady);
                                that.endOperation();
                            }
                        });
                    });
                    return def.promise();
                }
            };
            GPokHromadneStornoTab = __decorate([
                Decorators.gcontent
            ], GPokHromadneStornoTab);
            WebClient.GPokHromadneStornoTab = GPokHromadneStornoTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lU3Rvcm5vVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Bva0hyb21hZG5lU3Rvcm5vVGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwyREFBMkQ7QUFDM0QsSUFBVSxNQUFNLENBbVJmO0FBblJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1SbkI7SUFuUmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1SN0I7UUFuUm9CLFdBQUEsU0FBUztZQUcxQixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLE9BQUEsWUFBWTtnQkFRbkQsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7b0JBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRS9ELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO3dCQUNwRixHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRzs0QkFDbEIsSUFBSSxHQUFHLEdBQVcsRUFBRSxDQUFDOzRCQUNyQixrQkFBa0I7NEJBQ2xCLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dDQUNmLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ2hDLENBQUM7NEJBRUQsNEJBQTRCOzRCQUM1QixJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDWixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLENB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QUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7NEJBRXZCLENBQUM7aUNBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO2dDQUV4QixVQUFVO2dDQUNWLENBQUMsQ0FBQyxRQUFRLGtEQUF3QyxDQUFDO2dDQUNuRCxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7NEJBQ2xDLENBQUM7NEJBRUQsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dDQUN6QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dDQUN4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7NEJBQ3hCLENBQUM7d0JBRUwsQ0FBQyxDQUFDLENBQUM7b0JBRVgsQ0FBQyxDQUFDLENBQUM7b0JBSUgsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBR3pCLENBQUM7YUFDSixDQUFBO1lBN1FZLHFCQUFxQjtnQkFEakMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxxQkFBcUIsQ0E2UWpDO1lBN1FZLCtCQUFxQix3QkE2UWpDLENBQUE7UUFHTCxDQUFDLEVBblJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtUjdCO0lBQUQsQ0FBQyxFQW5SZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbVJuQjtBQUFELENBQUMsRUFuUlMsTUFBTSxLQUFOLE1BQU0sUUFtUmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0hyb21hZG5lU3Rvcm5vVGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZFN0b3Jub1N0ZXAxOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFN0b3Jub1N0ZXAyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFN0b3Jub1N0ZXA0OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHBva0Rva2xhZHk6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG9bXTtcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJIcm9tYWRuw6kgc3Rvcm5vXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgZGVmYXVsdEFjdGlvbjogdHJ1ZSB9XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRBY3Rpb25EZXRhaWwgPSBuZXcgR0FjdGlvbigkLmV4dGVuZCh0cnVlLCBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3c6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vdGV2xZllbsOtIHogZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhLml4cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vb3RldsWZZW7DrSB6IGFrY2UgdiBtZW51QmFydVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguZ2V0R3JpZCgpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpWzBdLml4cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0RldGFpbERva2xhZHVUYWJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb2Rhbmk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSWQ6IFwiR1Bva0RldGFpbERva2xhZHUjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgfSksIHsgbmFtZTogXCJhY3REZXRhaWxcIiB9KSlcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhhdC5kb3BsbkRhdHVtT2RwYXJvdmFuaSh0aGF0LnBva0Rva2xhZHkpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZmluaXNoRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpLmFkZERhdGVDb2x1bW4oeyBuYW1lOiBcIndpel9kYXR1bVwiLCBjYXB0aW9uOiBcIkRhdHVtIG9kcMOhcm92w6Fuw61cIiwgd2lkdGg6IDEyMCB9KS5hZGQoR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1dlYkJhc2UuQ3JlYXRlR3JpZEZvcm1hdEhyb21hZG5lKCkpLFxyXG4gICAgICAgICAgICAgICAga2V5czogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IGZpbmlzaERhdGEsXHJcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JUeXBlOiBcIktQSVwiLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7DqSBzdG9ybm8gcG9rbGFkbsOtY2ggZG9rbGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJLb250cm9sYSBhIGRvcGxuxJtuw60gZMWvdm9kdSBwxZllZCBocm9tYWRuw71tIHN0b3JuZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgcG9rbGFkbsOtIGRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIgfSkuYWRkU2VjdGlvbigpLmFkZFJvdyhcIkTFr3ZvZFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInJlYXNvblwiLCBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSB9KS5hZGRSb3coXCJQxZnDrXBhZG7DqSBkYXR1bSBvZHDDoXJvdsOhbsOtXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBuYW1lOiBcImRhdE9kcGFyb3ZhbmlcIiwgaW5pdGlhbFZhbHVlOiBuZXcgRGF0ZSgpIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cEFycmF5ID0gZGF0YS5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaXhwOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cEFycmF5LmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2tEb2tsYWQuc2V6bmFtUGVybWlzc2lvbnMocnEgPT4geyByZXR1cm4geyBpeHA6IHggfSB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YS5kYXRhLml4cCA9PT0geCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2tpbmQgPSBkYXRhLkx6ZVN0b3Juby52YWx1ZSA/IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyA6IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gZGF0YS5MemVTdG9ybm8ubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2NoZWNrID0gZGF0YS5MemVTdG9ybm8udmFsdWU7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2tkecW+IG3Fr8W+dSBzdG9ybm92YXQsdGFrIHNpIHprdXPDrW0gZG90w6Fobm91dCBkYXR1bSBvZHDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuTHplU3Rvcm5vLnZhbHVlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiR2V0RGF0dW1PZHBhcm92YW5pXCIsIHsgaXhwOiB4IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9kYXR1bSA9IGRhdGEuZGF0X29kcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zdGF2ID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcXVlc3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gZGF0YS52eXNsZWRlaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IGl4cEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaXhwQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5peHAgPT09IHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpeHBBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIlN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykgeyAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5zdG9ybm8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByb3cuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogbW9kZWwucmVhc29uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXR1bU9kcGFyb3Zhbmk6IHJvdy53aXpfZGF0dW0hID8/IG1vZGVsLmRhdE9kcGFyb3ZhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtvbnRvcmxvdmF0Um9rOiB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gXCJEb2tsYWQgYnlsIMO6c3DEm8WhbsSbIHN0b3Jub3bDoW4hXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgdm9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gdm9iai5iYXNlTWVzc2FnZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodm9iai5kYXRhLm1lbWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5kYXRhLm1lbWJlciA9PSBcImtvbnRvcmxvdmF0Um9rXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Jvdy5zdGF2VSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Jvdy52eXNsZWRla1UgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9xdWVzdGlvbiBzdGF2Pz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB5ICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogW3sgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCB9XSwgIFxyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJWw71zbGVkZWtcIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiU2V6bmFtIHN0b3Jub3ZhbsO9Y2ggcG9rbGFkbsOtY2ggZG9rbGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWw71zbGVkZWsgaHJvbWFkbsOpaG8gc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogW3sgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCB9XSwgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKHZpZXcpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSwgeyB0aXRsZTogXCJIcm9tYWRuw6kgc3Rvcm5vIHBva2xhZG7DrWNoIGRva2xhZMWvXCIgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkb3BsbkRhdHVtT2RwYXJvdmFuaShwb2tEb2tsYWR5OiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvW10pOiBKUXVlcnlQcm9taXNlPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG9bXT4ge1xyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiRG9wbMSbbsOtIHBvZHJvYm5vc3TDrShkYXR1bSBvZHDDoXJvdsOhbsOtLC4uLilcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgcG9rRG9rbGFkeS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiR2V0RGF0dW1PZHBhcm92YW5pXCIsIHsgaXhwOiB4Lml4cCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0YXYgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgud2l6X2RhdHVtID0gZGF0YS5kYXRfb2RwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC53aXpfY2hlY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN0YXYgPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcXVlc3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC53aXpfdHh0X2VyciA9IGRhdGEudnlzbGVkZWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IHBva0Rva2xhZHkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShwb2tEb2tsYWR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==