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
            let GPokHromadneKonChodTab = class GPokHromadneKonChodTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.title = "Hromadný kontrolní chod";
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
                            title: "Hromadný kontrolní chod pokladních dokladů",
                            description: "Hromadný kontrolní chod",
                            gridTabTitle: "Vybrané pokladní doklady",
                            defaultAction: gridActionDetail,
                            checkAction: (model, data) => {
                                var view = new Gordic.Data.View(data, { key: "ixp" });
                                var ixpArray = data.map(function (d) { return d.ixp; });
                                let i = 0;
                                let def = $.Deferred();
                                that.call("KontrolniChodList", { ixpList: ixpArray })
                                    .done(function (data) {
                                    def.resolve(data);
                                    //Poznámka ze starého wizarda a jaké jsou stavy kontrolního chodu
                                    //row.stav = data.stav;
                                    //row.vysledek = data.text;
                                    //if (data.table != null)
                                    //    row.table = data.table;  
                                    //   case 0: return { icon: "fa-check-circle", text: "OK", tooltip: "" };
                                    //                            case 1: return { icon: "fa-question-circle", text: "?",tooltip: "" };
                                    //                            case 3: return { icon: "fa-question-circle", text: "?",tooltip: "" };
                                    //                            case 2: return { icon: "fa-times-circle", text: "CHYBA", tooltip: "" };
                                    //                            case 4: return { icon: "fa-times-circle", text: "CHYBA", tooltip: "" };
                                });
                                return def.promise();
                            },
                            nextActionName: "Pokračovat",
                            nextAction: (model, data) => {
                                return $.Deferred().resolve(data);
                            },
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        lastStep: {
                            title: "Výsledek",
                            gridTabTitle: "Pokladní doklady prošlé kontrolním chodem",
                            description: "Výsledek hromadného kontrolního chodu",
                            defaultAction: gridActionDetail,
                            menuGridBar: [{ favorite: true, action: gridActionDetail }],
                        },
                        completeDelegate: (view) => {
                            that.close();
                        },
                        cancelDelegate: () => {
                            that.close();
                        },
                    }, { title: "Hromadný kontrolní chod pokladních dokladů" });
                }
            };
            GPokHromadneKonChodTab = __decorate([
                Decorators.gcontent
            ], GPokHromadneKonChodTab);
            WebClient.GPokHromadneKonChodTab = GPokHromadneKonChodTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva0hyb21hZG5lS29uQ2hvZFRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tIcm9tYWRuZUtvbkNob2RUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDJEQUEyRDtBQUMzRCxJQUFVLE1BQU0sQ0EySGY7QUEzSEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMkhuQjtJQTNIZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMkg3QjtRQTNIb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQUtwRCxjQUFjO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFJcEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7d0JBQzNFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUN0QixJQUFJLEdBQUcsR0FBVyxFQUFFLENBQUM7NEJBQ3JCLGtCQUFrQjs0QkFDbEIsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7Z0NBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDaEMsQ0FBQzs0QkFFRCw0QkFBNEI7NEJBQzVCLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dDQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMs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QUUsQ0FBQzt3QkFDakIsQ0FBQzt3QkFDRCxjQUFjLEVBQUUsR0FBRyxFQUFFOzRCQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2pCLENBQUM7cUJBQ0osRUFBRSxFQUFFLEtBQUssRUFBRSw0Q0FBNEMsRUFBRSxDQUFDLENBQUM7Z0JBRWhFLENBQUM7YUFHSixDQUFBO1lBckhZLHNCQUFzQjtnQkFEbEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxzQkFBc0IsQ0FxSGxDO1lBckhZLGdDQUFzQix5QkFxSGxDLENBQUE7UUFHTCxDQUFDLEVBM0hvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEySDdCO0lBQUQsQ0FBQyxFQTNIZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMkhuQjtBQUFELENBQUMsRUEzSFMsTUFBTSxLQUFOLE1BQU0sUUEySGYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxyXG5uYW1lc3BhY2UgR29yZGljLlBvay5XZWJDbGllbnQge1xyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva0hyb21hZG5lS29uQ2hvZFRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgcG9rRG9rbGFkeTogR29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0b1tdO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIkhyb21hZG7DvSBrb250cm9sbsOtIGNob2RcIjtcclxuICAgICAgICAgICAgdGhpcy5zZXRCcmVhZGNydW1icyhbeyBjYXB0aW9uOiB0aGlzLnRpdGxlLCBkZWZhdWx0QWN0aW9uOiB0cnVlIH1dKTtcclxuXHJcbiAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZEFjdGlvbkRldGFpbCA9IG5ldyBHQWN0aW9uKCQuZXh0ZW5kKHRydWUsIEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3c6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vdGV2xZllbsOtIHogZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5jZWxsSW5mby5kYXRhLml4cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vb3RldsWZZW7DrSB6IGFrY2UgdiBtZW51QmFydVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBjdHguZ2V0R3JpZCgpLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpWzBdLml4cDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0RldGFpbERva2xhZHVUYWJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiByb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb2Rhbmk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSWQ6IFwiR1Bva0RldGFpbERva2xhZHUjXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksIHsgbmFtZTogXCJhY3REZXRhaWxcIiB9KSlcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1dlYkJhc2UuQ3JlYXRlR3JpZEZvcm1hdEhyb21hZG5lKCksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5wb2tEb2tsYWR5LFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkhyb21hZG7DvSBrb250cm9sbsOtIGNob2QgcG9rbGFkbsOtY2ggZG9rbGFkxa9cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJIcm9tYWRuw70ga29udHJvbG7DrSBjaG9kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlZ5YnJhbsOpIHBva2xhZG7DrSBkb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogZ3JpZEFjdGlvbkRldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cEFycmF5ID0gZGF0YS5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaXhwOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJLb250cm9sbmlDaG9kTGlzdFwiLCB7IGl4cExpc3Q6IGl4cEFycmF5IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUG96bsOhbWthIHplIHN0YXLDqWhvIHdpemFyZGEgYSBqYWvDqSBqc291IHN0YXZ5IGtvbnRyb2xuw61obyBjaG9kdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yb3cuc3RhdiA9IGRhdGEuc3RhdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcm93LnZ5c2xlZGVrID0gZGF0YS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAoZGF0YS50YWJsZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcm93LnRhYmxlID0gZGF0YS50YWJsZTsgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBjYXNlIDA6IHJldHVybiB7IGljb246IFwiZmEtY2hlY2stY2lyY2xlXCIsIHRleHQ6IFwiT0tcIiwgdG9vbHRpcDogXCJcIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4geyBpY29uOiBcImZhLXF1ZXN0aW9uLWNpcmNsZVwiLCB0ZXh0OiBcIj9cIix0b29sdGlwOiBcIlwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiB7IGljb246IFwiZmEtcXVlc3Rpb24tY2lyY2xlXCIsIHRleHQ6IFwiP1wiLHRvb2x0aXA6IFwiXCIgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcy1jaXJjbGVcIiwgdGV4dDogXCJDSFlCQVwiLCB0b29sdGlwOiBcIlwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiB7IGljb246IFwiZmEtdGltZXMtY2lyY2xlXCIsIHRleHQ6IFwiQ0hZQkFcIiwgdG9vbHRpcDogXCJcIiB9O1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogXCJQb2tyYcSNb3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH1dLCAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVsO9c2xlZGVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcIlBva2xhZG7DrSBkb2tsYWR5IHByb8WhbMOpIGtvbnRyb2xuw61tIGNob2RlbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlbDvXNsZWRlayBocm9tYWRuw6lobyBrb250cm9sbsOtaG8gY2hvZHVcIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbeyBmYXZvcml0ZTogdHJ1ZSwgYWN0aW9uOiBncmlkQWN0aW9uRGV0YWlsIH1dLCBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldykgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LCB7IHRpdGxlOiBcIkhyb21hZG7DvSBrb250cm9sbsOtIGNob2QgcG9rbGFkbsOtY2ggZG9rbGFkxa9cIiB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==