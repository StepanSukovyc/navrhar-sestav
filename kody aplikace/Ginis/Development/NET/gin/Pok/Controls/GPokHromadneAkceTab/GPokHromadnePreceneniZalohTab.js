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
            let GPokHromadnePreceneniZalohTab = class GPokHromadnePreceneniZalohTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Hromadné přecenění záloh";
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    that.promiseDetailKurzu().done(function (detailKurzu) {
                        that.beginOperation("Probíhá načtení záloha");
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
                        that.isl.PokDoklad.listZalohy(rq => {
                            return {
                                filters: {
                                    minuly_rok: false,
                                    ostatni_knihy: false
                                }
                            };
                        })
                            .get()
                            .done(function (data) {
                            var wizard = new Gordic.Wizard();
                            let kurz;
                            if (that.pokKurTypkur == 0) {
                                kurz = detailKurzu.kurz_s;
                            }
                            else if (that.pokKurTypkur == 10) {
                                kurz = detailKurzu.kurz_n;
                            }
                            else {
                                kurz = detailKurzu.kurz_p;
                            }
                            data.data.forEach(function (x) {
                                x.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                x.wiz_check = true;
                            });
                            that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                                title: "",
                                gridFormat: Gordic.Pok.WebClient.GPokWebBase.CreateGridFormatHromadne(),
                                keys: "ixp",
                                data: data.data,
                                indicatorType: "KPI",
                                firstStep: {
                                    title: "Hromadné přecenění záloh",
                                    description: "Hromadné přecenění záloh",
                                    gridTabTitle: "Vybrané pokladní zálohy",
                                    form: new Gordic.Forms.Form({ name: "wizParams" })
                                        .addSection()
                                        .addRow("ID kur. lístku").addField("gstringbox", { name: "ixp_kur", initialValue: detailKurzu.ixp_kur, disabled: true })
                                        .addRow("Původ").addField("gstringbox", { name: "puvod", initialValue: detailKurzu.puvod_kur_txt, disabled: true })
                                        .addRow("Číslo").addField("gstringbox", { name: "cislo", initialValue: detailKurzu.cislo, disabled: true })
                                        .addRow("Řada").addField("gstringbox", { name: "rada", initialValue: detailKurzu.rada_kur, disabled: true })
                                        .addRow("Použity kurz CZK").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "kurz", initialValue: kurz, disabled: true })
                                        .addRow("Rok/Měsíc/Den").addField("gnumberbox", "w-4", { name: "rok", initialValue: detailKurzu.rok, disabled: true })
                                        .addField("gnumberbox", "w-4", { name: "mesic", initialValue: detailKurzu.mesic, disabled: true })
                                        .addField("gnumberbox", "w-4", { name: "den", initialValue: detailKurzu.den, disabled: true })
                                        .addRow("Množství").addField("gnumberbox", { name: "mnozstvi", initialValue: detailKurzu.m, disabled: true })
                                        .addRow("Platný od").addField("gdatebox", { name: "platny_od", initialValue: detailKurzu.dat_platnost_od, disabled: true }),
                                    defaultAction: gridActionDetail,
                                    checkAction: (model, data) => {
                                        let def = $.Deferred();
                                        return def.resolve(data).promise();
                                    },
                                    nextActionName: "Pokračovat",
                                    nextAction: (model, data) => {
                                        let def = $.Deferred();
                                        var view = new Gordic.Data.View(data, { key: "ixp" });
                                        var ixpArray = data.map(function (d) { return d.ixp; });
                                        let i = 0;
                                        that.beginOperation("Probíha přecenění záloh!");
                                        view.getDataRows(true).forEach(function (meta) {
                                            that.isl.PokDoklad.precenZalohu(rq => {
                                                return {
                                                    ixp: meta.data.ixp,
                                                    aktualniKurz: model.kurz
                                                };
                                            })
                                                .get()
                                                .done(function (zmena) {
                                                if (zmena) {
                                                    meta.data.wiz_txt_err = "Přecenění proběhlo v pořádku.";
                                                }
                                                else {
                                                    meta.data.wiz_txt_err = "Přecenění nebylo potřeba.";
                                                }
                                            })
                                                .fail(function (xhr, type, vobj) {
                                                if (type === "exception") {
                                                    meta.data.wiz_kind = 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                    if (vobj.baseType === "Gordic.General.GHplValidationException" || vobj.exceptionType === "Gordic.General.GHplValidationException") {
                                                        vobj.handled = true;
                                                        meta.data.wiz_txt_err = vobj.baseMessage;
                                                    }
                                                }
                                            })
                                                .always(function () {
                                                i = i + 1;
                                                if (i == ixpArray.length) {
                                                    def.resolve(view);
                                                    that.endOperation();
                                                }
                                            });
                                        });
                                        return def.promise();
                                    },
                                    menuGridBar: [{ favorite: true, action: gridActionDetail }],
                                },
                                lastStep: {
                                    title: "Výsledek",
                                    gridTabTitle: "Výsledek hromadného přecenění záloh",
                                    description: "Výsledek hromadného přecenění záloh",
                                    defaultAction: gridActionDetail,
                                    menuGridBar: [{ favorite: true, action: gridActionDetail }],
                                },
                                completeDelegate: (view) => {
                                    that.close();
                                },
                                cancelDelegate: () => {
                                    that.close();
                                },
                            }, { title: "Hromadné přecenění záloh" });
                        })
                            .always(function () {
                            that.endOperation();
                        });
                        ;
                    }).fail(function (text) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashError(that, text);
                    });
                }
                promiseDetailKurzu() {
                    let def = $.Deferred();
                    let that = this;
                    that.beginOperation("Dotažení detailu kurzovního lístku pro přecenění");
                    that.isl.PokKniha.detailKurzuProPreceneni().get().done(function (data) {
                        def.resolve(data);
                    })
                        .fail(function (xhr, type, vobj) {
                        if (type === "exception") {
                            if (vobj.baseType === "Gordic.Hpl.Server.GHplServerException") {
                                vobj.handled = true;
                                return def.reject(vobj.baseMessage);
                            }
                        }
                    })
                        .always(function () {
                        that.endOperation();
                    });
                    return def.promise();
                }
            };
            GPokHromadnePreceneniZalohTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePreceneniZalohTab);
            WebClient.GPokHromadnePreceneniZalohTab = GPokHromadnePreceneniZalohTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJlY2VuZW5pWmFsb2hUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rSHJvbWFkbmVQcmVjZW5lbmlaYWxvaFRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBME9mO0FBMU9ELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTBPbkI7SUExT2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTBPN0I7UUExT29CLFdBQUEsU0FBUztZQUcxQixJQUFhLDZCQUE2QixHQUExQyxNQUFhLDZCQUE4QixTQUFRLE9BQUEsWUFBWTtnQkFJM0QsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRXBFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLFdBQVc7d0JBRWhELElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQzt3QkFHOUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7NEJBQy9FLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUM7Z0NBQ3JCLGtCQUFrQjtnQ0FDbEIsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7b0NBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQ0FDaEMsQ0FBQztnQ0FFRCw0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R0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSTt3QkFJakUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFdEIsQ0FBQyxDQUFDO3lCQUNHLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTt3QkFDM0IsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7NEJBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyx1Q0FBdUMsRUFBRSxDQUFDO2dDQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQ0FDcEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFFeEMsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUM7d0JBRUosSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQztvQkFLUCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFekIsQ0FBQzthQUdKLENBQUE7WUF0T1ksNkJBQTZCO2dCQUR6QyxVQUFVLENBQUMsUUFBUTtlQUNQLDZCQUE2QixDQXNPekM7WUF0T1ksdUNBQTZCLGdDQXNPekMsQ0FBQTtRQUNMLENBQUMsRUExT29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTBPN0I7SUFBRCxDQUFDLEVBMU9nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEwT25CO0FBQUQsQ0FBQyxFQTFPUyxNQUFNLEtBQU4sTUFBTSxRQTBPZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9rSHJvbWFkbmVQcmVjZW5lbmlaYWxvaFRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcG9rS3VyVHlwa3VyOiBudW1iZXI7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiSHJvbWFkbsOpIHDFmWVjZW7Em27DrSB6w6Fsb2hcIjtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQucHJvbWlzZURldGFpbEt1cnp1KCkuZG9uZShmdW5jdGlvbiAoZGV0YWlsS3VyenUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiUHJvYsOtaMOhIG5hxI10ZW7DrSB6w6Fsb2hhXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBncmlkQWN0aW9uRGV0YWlsID0gbmV3IEdBY3Rpb24oJC5leHRlbmQodHJ1ZSwgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3c6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vb3RldsWZZW7DrSB6IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhLml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vdGV2xZllbsOtIHogYWtjZSB2IG1lbnVCYXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmdldEdyaWQoKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb2Rhbmk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkOiBcIkdQb2tEZXRhaWxEb2tsYWR1I1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIHsgbmFtZTogXCJhY3REZXRhaWxcIiB9KSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5saXN0WmFsb2h5KHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW51bHlfcm9rOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9zdGF0bmlfa25paHk6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2l6YXJkID0gbmV3IEdvcmRpYy5XaXphcmQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrdXJ6OiBKc29uRGVjaW1hbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBva0t1clR5cGt1ciA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdXJ6ID0gZGV0YWlsS3VyenUua3Vyel9zITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGF0LnBva0t1clR5cGt1ciA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga3VyeiA9IGRldGFpbEt1cnp1Lmt1cnpfbiE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrdXJ6ID0gZGV0YWlsS3VyenUua3Vyel9wITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC53aXpfY2hlY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva1phbG9oeUR0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1dlYkJhc2UuQ3JlYXRlR3JpZEZvcm1hdEhyb21hZG5lKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJIcm9tYWRuw6kgcMWZZWNlbsSbbsOtIHrDoWxvaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkhyb21hZG7DqSBwxZllY2VuxJtuw60gesOhbG9oXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlZ5YnJhbsOpIHBva2xhZG7DrSB6w6Fsb2h5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJ3aXpQYXJhbXNcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJRCBrdXIuIGzDrXN0a3VcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJpeHBfa3VyXCIsIGluaXRpYWxWYWx1ZTogZGV0YWlsS3VyenUuaXhwX2t1ciwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFr3ZvZFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInB1dm9kXCIsIGluaXRpYWxWYWx1ZTogZGV0YWlsS3VyenUucHV2b2Rfa3VyX3R4dCwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw61zbG9cIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJjaXNsb1wiLCBpbml0aWFsVmFsdWU6IGRldGFpbEt1cnp1LmNpc2xvLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwixZhhZGFcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJyYWRhXCIsIGluaXRpYWxWYWx1ZTogZGV0YWlsS3VyenUucmFkYV9rdXIsIGRpc2FibGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3XFvml0eSBrdXJ6IENaS1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgbmFtZTogXCJrdXJ6XCIsIGluaXRpYWxWYWx1ZToga3VyeiwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlJvay9NxJtzw61jL0RlblwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwgeyBuYW1lOiBcInJva1wiLCBpbml0aWFsVmFsdWU6IGRldGFpbEt1cnp1LnJvaywgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7IG5hbWU6IFwibWVzaWNcIiwgaW5pdGlhbFZhbHVlOiBkZXRhaWxLdXJ6dS5tZXNpYywgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7IG5hbWU6IFwiZGVuXCIsIGluaXRpYWxWYWx1ZTogZGV0YWlsS3VyenUuZGVuLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiTW5vxb5zdHbDrVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBuYW1lOiBcIm1ub3pzdHZpXCIsIGluaXRpYWxWYWx1ZTogZGV0YWlsS3VyenUubSwgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBsYXRuw70gb2RcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IG5hbWU6IFwicGxhdG55X29kXCIsIGluaXRpYWxWYWx1ZTogZGV0YWlsS3VyenUuZGF0X3BsYXRub3N0X29kLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKGRhdGEpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIlBva3JhxI1vdmF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cEFycmF5ID0gZGF0YS5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaXhwOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIlByb2LDrWhhIHDFmWVjZW7Em27DrSB6w6Fsb2ghXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLnByZWNlblphbG9odShycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiBtZXRhLmRhdGEuaXhwISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0dWFsbmlLdXJ6OiBtb2RlbC5rdXJ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoem1lbmE6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6bWVuYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gXCJQxZllY2VuxJtuw60gcHJvYsSbaGxvIHYgcG/FmcOhZGt1LlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gXCJQxZllY2VuxJtuw60gbmVieWxvIHBvdMWZZWJhLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgdm9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfdHh0X2VyciA9dm9iai5iYXNlTWVzc2FnZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaXhwQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IFt7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVsO9c2xlZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlbDvXNsZWRlayBocm9tYWRuw6lobyBwxZllY2VuxJtuw60gesOhbG9oXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVsO9c2xlZGVrIGhyb21hZG7DqWhvIHDFmWVjZW7Em27DrSB6w6Fsb2hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH1dLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7IHRpdGxlOiBcIkhyb21hZG7DqSBwxZllY2VuxJtuw60gesOhbG9oXCIgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7O1xyXG5cclxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAodGV4dCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIHRleHQpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJvbWlzZURldGFpbEt1cnp1KCk6IEpRdWVyeVByb21pc2U8SHBsLkludGVyZmFjZS5HUG9rSGlzdG9yaWVLdXJ6dUR0bz4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJEb3Rhxb5lbsOtIGRldGFpbHUga3Vyem92bsOtaG8gbMOtc3RrdSBwcm8gcMWZZWNlbsSbbsOtXCIpO1xyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5Qb2tLbmloYS5kZXRhaWxLdXJ6dVByb1ByZWNlbmVuaSgpLmdldCgpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodm9iai5iYXNlVHlwZSA9PT0gXCJHb3JkaWMuSHBsLlNlcnZlci5HSHBsU2VydmVyRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCh2b2JqLmJhc2VNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=