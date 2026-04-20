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
            let GPokHromadnePrevzetiPpdTab = class GPokHromadnePrevzetiPpdTab extends Gordic.GContentBase {
                onContentReady() {
                    this.title = "Převzetí do PPD";
                    var that = this;
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
                        preCheckAction: (data) => {
                            data.forEach(element => {
                                element["wiz_check"] = true; // nastavím element zatržení
                            });
                            return $.Deferred().resolve({ result: data }).promise();
                        },
                        firstStep: {
                            title: "Zadání",
                            description: "Akce provede převzetí vybraných dokladů do PPD",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
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
                                                meta.data.wiz_kind = data.LzePrevzitZpetPpd.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = data.LzePrevzitZpetPpd.message;
                                                meta.data.wiz_check = data.LzePrevzitZpetPpd.value;
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
                            nextActionName: "Převzít",
                            nextAction: (model, data) => {
                                let def = $.Deferred();
                                let y = 0;
                                if (data.length == 0)
                                    def.resolve(data);
                                data.forEach(function (row) {
                                    that.isl.PokDoklad.prevzitZpetDoPpd(rq => {
                                        return {
                                            ixp: row.ixp,
                                            dotaz: true
                                        };
                                    })
                                        .get()
                                        .done(function () {
                                        row.wiz_kind = 200 /* Gordic.Isl.GOperationResultKind.Success */;
                                        row.wiz_txt_err = "Doklad byl úspěšně převzat!";
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
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        lastStep: {
                            title: "Výsledek",
                            gridTabTitle: "Seznam převzatých dokladů do PPD",
                            description: "Výsledek hromadného převzetí dokladů do PPD",
                            defaultAction: gridActionDetail,
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        completeDelegate: (view) => {
                            that.close(true);
                        },
                        cancelDelegate: () => {
                            that.close(false);
                        },
                    }, { title: "Hromadné převzetí do PPD" });
                }
            };
            GPokHromadnePrevzetiPpdTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePrevzetiPpdTab);
            WebClient.GPokHromadnePrevzetiPpdTab = GPokHromadnePrevzetiPpdTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJldnpldGlQcGRUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rSHJvbWFkbmVQcmV2emV0aVBwZFRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELElBQVUsTUFBTSxDQStNZjtBQS9NRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0ErTW5CO0lBL01nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErTTdCO1FBL01vQixXQUFBLFNBQVM7WUFHMUIsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSxPQUFBLFlBQVk7Z0JBT3hELGNBQWM7b0JBRVYsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztvQkFFL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUdoQixNQUFNLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzt3QkFDL0UsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7NEJBQ2xCLElBQUksR0FBRyxHQUFXLEVBQUUsQ0FBQzs0QkFDckIsa0JBQWtCOzRCQUNsQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQ0FDZixHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNoQyxDQUFDOzRCQUVELDRCQUE0Qjs0QkFDNUIsSUFBSSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUM7Z0NBQ1osR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDOzRCQUNyRCxDQUFDOzRCQUVELElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dDQUNaLElBQUks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WUF6TVksMEJBQTBCO2dCQUR0QyxVQUFVLENBQUMsUUFBUTtlQUNQLDBCQUEwQixDQXlNdEM7WUF6TVksb0NBQTBCLDZCQXlNdEMsQ0FBQTtRQUdMLENBQUMsRUEvTW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQStNN0I7SUFBRCxDQUFDLEVBL01nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErTW5CO0FBQUQsQ0FBQyxFQS9NUyxNQUFNLEtBQU4sTUFBTSxRQStNZiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXHJcbm5hbWVzcGFjZSBHb3JkaWMuUG9rLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG9rSHJvbWFkbmVQcmV2emV0aVBwZFRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHBva0Rva2xhZHk6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG9bXTtcclxuICAgICAgICBwcml2YXRlIHBva0tuaWhhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBzdWJyYWRhOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBmYXplOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IFwiUMWZZXZ6ZXTDrSBkbyBQUERcIjtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkQWN0aW9uRGV0YWlsID0gbmV3IEdBY3Rpb24oJC5leHRlbmQodHJ1ZSwgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb3RldsWZZW7DrSB6IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguY2VsbEluZm8uZGF0YS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL290ZXbFmWVuw60geiBha2NlIHYgbWVudUJhcnVcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmdldEdyaWQoKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKVswXS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogcm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9kYW5pOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkOiBcIkdQb2tEZXRhaWxEb2tsYWR1I1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLCB7IG5hbWU6IFwiYWN0RGV0YWlsXCIgfSkpXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJCYXNlLkNyZWF0ZUdyaWRGb3JtYXRIcm9tYWRuZSgpLFxyXG4gICAgICAgICAgICAgICAga2V5czogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMucG9rRG9rbGFkeSxcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZWxlbWVudCA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hIHbFoWVjaCBkYXRlY2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFtcIndpel9jaGVja1wiXSA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2w61tIGVsZW1lbnQgemF0csW+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh7IHJlc3VsdDogZGF0YSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiWmFkw6Fuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBa2NlIHByb3ZlZGUgcMWZZXZ6ZXTDrSB2eWJyYW7DvWNoIGRva2xhZMWvIGRvIFBQRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJWeWJyYW7DqSBwb2tsYWRuw60gZG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwsICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHBBcnJheSA9IGRhdGEubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLml4cDsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBBcnJheS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLnNlem5hbVBlcm1pc3Npb25zKHJxID0+IHsgcmV0dXJuIHsgaXhwOiB4IH0gfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YS5kYXRhLml4cCA9PT0geCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2tpbmQgPSBkYXRhLkx6ZVByZXZ6aXRacGV0UHBkLnZhbHVlID8gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzIDogR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSBkYXRhLkx6ZVByZXZ6aXRacGV0UHBkLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IGRhdGEuTHplUHJldnppdFpwZXRQcGQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaXhwQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUodmlldylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHhociwgdHlwZSwgdm9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGEuZGF0YS5peHAgPT09IHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpeHBBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb25OYW1lOiBcIlDFmWV2esOtdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLnByZXZ6aXRacGV0RG9QcGQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByb3cuaXhwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3RhejogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IFwiRG9rbGFkIGJ5bCDDunNwxJvFoW7EmyBwxZlldnphdCFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgdm9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gdm9iai5iYXNlTWVzc2FnZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2b2JqLmRhdGEubWVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZvYmouZGF0YS5tZW1iZXIgPT0gXCJkb3RhelwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcXVlc3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5XYXJuaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdm9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgPT0gZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IFt7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwgfV0sIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlbDvXNsZWRla1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJTZXpuYW0gcMWZZXZ6YXTDvWNoIGRva2xhZMWvIGRvIFBQRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlbDvXNsZWRlayBocm9tYWRuw6lobyBwxZlldnpldMOtIGRva2xhZMWvIGRvIFBQRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IFt7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwgfV0sIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sIHsgdGl0bGU6IFwiSHJvbWFkbsOpIHDFmWV2emV0w60gZG8gUFBEXCIgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=