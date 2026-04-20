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
            let GPokHromadnePrevzetiTab = class GPokHromadnePrevzetiTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Převzetí";
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
                        preCheckAction: (data) => {
                            data.forEach(element => {
                                element["wiz_check"] = true; // nastavím element zatržení
                            });
                            return $.Deferred().resolve({ result: data }).promise();
                        },
                        indicatorType: "KPI",
                        firstStep: {
                            title: "Zadání",
                            description: "Akce provede převzetí vybraných pokladních dokladů.",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
                            form: Gordic.Eko.Prefabs.PrevzetiDokladuForm({
                                AktualniPrihlasenyZpracovatel: that.ixsFunAkt,
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
                                                meta.data.wiz_kind = data.LzePrevzit.value ? 200 /* Gordic.Isl.GOperationResultKind.Success */ : 400 /* Gordic.Isl.GOperationResultKind.Error */;
                                                meta.data.wiz_txt_err = data.LzePrevzit.message;
                                                meta.data.wiz_check = data.LzePrevzit.value;
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
                                    that.isl.PokDoklad.prevzit(rq => {
                                        return {
                                            ixp: row.ixp
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
                            gridTabTitle: "Seznam převzatých pokladních dokladů",
                            description: "Výsledek hromadného převzetí pokladních dokladů",
                            defaultAction: gridActionDetail,
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        completeDelegate: (view) => {
                            that.close(true);
                        },
                        cancelDelegate: () => {
                            that.close(false);
                        },
                    }, { title: "Hromadné převzetí pokladních dokladů" });
                }
            };
            GPokHromadnePrevzetiTab = __decorate([
                Decorators.gcontent
            ], GPokHromadnePrevzetiTab);
            WebClient.GPokHromadnePrevzetiTab = GPokHromadnePrevzetiTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lUHJldnpldGlUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rSHJvbWFkbmVQcmV2emV0aVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMkRBQTJEO0FBQzNELElBQVUsTUFBTSxDQWdQZjtBQWhQRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnUG5CO0lBaFBnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FnUDdCO1FBaFBvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxPQUFBLFlBQVk7Z0JBT3JELGNBQWM7b0JBRVYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztvQkFFeEIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0JBQy9FLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUVsQixJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUM7NEJBQ3JCLGtCQUFrQjs0QkFDbEIsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDaEMsQ0FBQzs0QkFFRCw0QkFBNEI7NEJBQzVCLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dDQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs0QkFDckQsQ0FBQzs0QkFFRCxJQUFJLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDWixJQUFJLENBQUMsUUFB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QUUsZ0JBQWdCLEVBQUUsQ0FBQzt5QkFDOUQ7d0JBQ0QsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFFdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDckIsQ0FBQzt3QkFDRCxjQUFjLEVBQUUsR0FBRyxFQUFFOzRCQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN0QixDQUFDO3FCQUNKLEVBQUUsRUFBRSxLQUFLLEVBQUUsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDO2dCQUUxRCxDQUFDO2FBU0osQ0FBQTtZQTFPWSx1QkFBdUI7Z0JBRG5DLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsdUJBQXVCLENBME9uQztZQTFPWSxpQ0FBdUIsMEJBME9uQyxDQUFBO1FBR0wsQ0FBQyxFQWhQb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBZ1A3QjtJQUFELENBQUMsRUFoUGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWdQbkI7QUFBRCxDQUFDLEVBaFBTLE1BQU0sS0FBTixNQUFNLFFBZ1BmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxubmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQb2tIcm9tYWRuZVByZXZ6ZXRpVGFiIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgcG9rRG9rbGFkeTogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgd2l6YXJkO1xyXG4gICAgICAgIGl4c0Z1bkFrdDogc3RyaW5nO1xyXG4gICAgICBcclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJQxZlldnpldMOtXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkQWN0aW9uRGV0YWlsID0gbmV3IEdBY3Rpb24oJC5leHRlbmQodHJ1ZSwgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAvL290ZXbFmWVuw60geiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdHguY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGEuaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vdGV2xZllbsOtIHogYWtjZSB2IG1lbnVCYXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5nZXRHcmlkKCkuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIilbMF0uaXhwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRGV0YWlsRG9rbGFkdVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BvZGFuaTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZDogXCJHUG9rRGV0YWlsRG9rbGFkdSNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9KSwgeyBuYW1lOiBcImFjdERldGFpbFwiIH0pKVxyXG5cclxuICAgICAgICAgICAgdmFyIGFjdFRpc2tQcmVkYXQgPSBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1ByZWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViVGlzazpQcmVkYXZhY2lQcm90b2tvbFwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uIChldmVudCwgcmVwSW5mbykge1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGF0LFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpeiA9IHRoYXQud2l6YXJkLmZpbmQoXCIuZ2dyaWRcIilbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0ICRncmlkID0gJCh3aXopO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlem5hbSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPigkZ3JpZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V6bmFtIHx8IHNlem5hbSEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJOZWJ5bHkgdnlicsOhbnkgxb7DoWRuw6kgZG9rbGFkeVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IHNlem5hbSEubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lml4cCEgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYXpldlJlZiA9IHRoYXQud2l6YXJkLmZpbmRGaWVsZHMoXCJpeHNfZnVuX2FrdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYXpldlJlZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXZSZWYgPSBuYXpldlJlZi5uYXpldl9yZWY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmF6ZXZSZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiTmVuw60gdnlwbG7Em24gY8OtbCBwxZllZMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgbmF6ZXZSZWY6IG5hemV2UmVmLCBhcnJheUl4cDogYXJyYXkgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlcCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LndpemFyZCA9IHRoaXMubmF2aWdhdGU8R29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzT3B0aW9uczxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViQmFzZS5DcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmUoKSxcclxuICAgICAgICAgICAgICAgIGtleXM6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnBva0Rva2xhZHksXHJcbiAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZWxlbWVudCA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hIHbFoWVjaCBkYXRlY2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFtcIndpel9jaGVja1wiXSA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2w61tIGVsZW1lbnQgemF0csW+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSh7IHJlc3VsdDogZGF0YSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlphZMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQWtjZSBwcm92ZWRlIHDFmWV2emV0w60gdnlicmFuw71jaCBwb2tsYWRuw61jaCBkb2tsYWTFry5cIixcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwiVnlicmFuw6kgcG9rbGFkbsOtIGRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsLCAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogR29yZGljLkVrby5QcmVmYWJzLlByZXZ6ZXRpRG9rbGFkdUZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBa3R1YWxuaVByaWhsYXNlbnlacHJhY292YXRlbDogdGhhdC5peHNGdW5Ba3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFZpZGl0ZWxub3N0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50Wm1lbmE6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cEFycmF5ID0gZGF0YS5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaXhwOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cEFycmF5LmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2tEb2tsYWQuc2V6bmFtUGVybWlzc2lvbnMocnEgPT4geyByZXR1cm4geyBpeHA6IHggfSB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhLmRhdGEuaXhwID09PSB4KSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfa2luZCA9IGRhdGEuTHplUHJldnppdC52YWx1ZSA/IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2VzcyA6IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel90eHRfZXJyID0gZGF0YS5MemVQcmV2eml0Lm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IGRhdGEuTHplUHJldnppdC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSBpeHBBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSh2aWV3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YS5kYXRhLml4cCA9PT0geCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhdGEud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLkVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGEuZGF0YS53aXpfdHh0X2VyciA9IHZvYmouYmFzZU1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kYXRhLndpel9jaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IGl4cEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbk5hbWU6IFwiUMWZZXZ6w610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2tEb2tsYWQucHJldnppdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHJvdy5peHAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X2tpbmQgPSBHb3JkaWMuSXNsLkdPcGVyYXRpb25SZXN1bHRLaW5kLlN1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfdHh0X2VyciA9IFwiRG9rbGFkIGJ5bCDDunNwxJvFoW7EmyBwxZlldnphdCFcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2b2JqLmJhc2VUeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIgfHwgdm9iai5leGNlcHRpb25UeXBlID09PSBcIkdvcmRpYy5HZW5lcmFsLkdIcGxWYWxpZGF0aW9uRXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy53aXpfa2luZCA9IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel90eHRfZXJyID0gdm9iai5iYXNlTWVzc2FnZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93Lndpel9raW5kID0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cud2l6X3R4dF9lcnIgPSB2b2JqLmJhc2VNZXNzYWdlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB5ICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ID09IGRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH0sIHsgZmF2b3JpdGU6IHRydWUsIGFjdGlvbjogYWN0VGlza1ByZWRhdCB9XSwgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVsO9c2xlZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlNlem5hbSBwxZlldnphdMO9Y2ggcG9rbGFkbsOtY2ggZG9rbGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWw71zbGVkZWsgaHJvbWFkbsOpaG8gcMWZZXZ6ZXTDrSBwb2tsYWRuw61jaCBkb2tsYWTFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUdyaWRCYXI6IFt7IGZhdm9yaXRlOiB0cnVlLCBhY3Rpb246IGdyaWRBY3Rpb25EZXRhaWwgfV0sICAgIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICh2aWV3KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sIHsgdGl0bGU6IFwiSHJvbWFkbsOpIHDFmWV2emV0w60gcG9rbGFkbsOtY2ggZG9rbGFkxa9cIiB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==