"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Spr;
    (function (Spr) {
        var WebApp;
        (function (WebApp) {
            var gcontent = Decorators.gcontent;
            let GSeznamVazebSubjektu = class GSeznamVazebSubjektu extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.actions.addRange({
                        actPridatZastupce: {
                            caption: "jres:25200180", //RC 25200180 : Přidat
                            icon: "gi-plus",
                            visible: that.TypVzVazby == 0 /* Gordic.Spr.Interface.TypVzVazbyEnum.Zastupci */,
                            run: function (ev, obj) {
                                var width = 850;
                                var height = 650;
                                var modal = true;
                                that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberZastupcu", {}], {
                                    IxpSpis: that.IxpSpis,
                                }, { width: width, height: height, modal: modal })
                                    .on("close", (ev, retValue) => {
                                    if (retValue && retValue.IxsEsu) {
                                        that.call("Pridat", { ixsEsu: retValue.IxsEsu, typVazby: retValue.TypVazby, porZast: retValue.PorZast, licZast: retValue.LicZast }).done((data) => {
                                            that.loadData().done(function () {
                                                //that.grid.ggrid("activeRow", row.ixs_rad);
                                            });
                                        });
                                    }
                                });
                            }
                        },
                        actPridatZastupovaneho: {
                            caption: "jres:25200180", //RC 25200180 : Přidat
                            icon: "gi-plus",
                            visible: that.TypVzVazby == 1 /* Gordic.Spr.Interface.TypVzVazbyEnum.Zastupovani */,
                            run: function (ev, obj) {
                                var width = 850;
                                var height = 650;
                                var modal = true;
                                that.dialogs.showWindow(["Gordic.Spr.WebApp.GVyberDotcenehoSubjektu", {}], {
                                    IxpSpis: that.IxpSpis,
                                    IxsEsu: that.IxsEsu,
                                    TypVazby: that.TypVazby,
                                    LicZast: that.LicZast,
                                    PorZast: that.PorZast,
                                    Jednotlive: false,
                                    BezZastupcu: true,
                                    Zastupovani: true,
                                }, { width: width, height: height, modal: modal })
                                    .on("close", (ev, retValue) => {
                                    that.loadData().done(function () {
                                        //that.grid.ggrid("activeRow", row.ixs_rad);
                                    });
                                });
                            }
                        },
                        actOdstranit: {
                            caption: "jres:25200172", //RC 25200172 : Odstranit
                            icon: "fa-times-circle",
                            run: function (ev, ctx) {
                                that.odstranit();
                            }
                        },
                    });
                    this.menuBar([
                        { action: that.actions.actPridatZastupce, favorite: true },
                        { action: that.actions.actPridatZastupovaneho, favorite: true },
                        { action: that.actions.actOdstranit, favorite: true },
                        { action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent())), favorite: true } // Zavřít
                    ]);
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        //defaultAction: that.actions.actDetail,
                        columns: this.createGridFormat(),
                        multi: true,
                        //searchColumns: ["ixp_spis"]
                    });
                    //dataView
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixp_spis" });
                    that.loadData();
                }
                odstranit() {
                    var that = this;
                    console.log("odstranit()");
                    var msg = "jres:25200173"; //RC 25200173 : Opravdu si přejete odstranit vybraný záznam?
                    var selection;
                    selection = that.grid.ggrid("getSelection");
                    if (selection.length > 1)
                        msg = "jres:25200437"; //RC 25200437 : Opravdu si přejete odstranit vybrané záznamy?
                    console.log(selection);
                    that.dialogs.messageBox("jres:25200174", msg, GDlg.mbbYesNo, GDlg.mbiQuestion)
                        .on("yes", function () {
                        that.call("DeleteMulti", { detailDtoArray: selection }).done((data) => {
                            that.showFlash("jres:25200175", "g-state-success", 3000, "flash"); //RC 25200175 : Odstraněno
                            that.loadData().done(function () {
                                //that.grid.ggrid("activeRow", row.ixs_rad);
                            });
                        });
                    });
                }
                //nahrani dat
                loadData(filter) {
                    var that = this;
                    var prom = this.call("LoadData", {})
                        .done(function (ret) {
                        if (that.grid.hasClass("ggrid")) {
                            that.dataView.updateData(ret);
                            that.grid.ggrid("setData", that.dataView);
                        }
                    });
                    return prom;
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    if (this.TypVzVazby == 0 /* Gordic.Spr.Interface.TypVzVazbyEnum.Zastupci */) {
                        gridFormat = gridFormat
                            .addTextColumn({
                            name: "ixs_esu_1_txt",
                            caption: "jres:25200083", //RC 25200083 : Název
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "ixs_dva_1_nazev",
                            caption: "jres:25200170", //RC 25200170 : Typ
                            width: 300,
                            fragment: ""
                        });
                    }
                    else if (this.TypVzVazby == 1 /* Gordic.Spr.Interface.TypVzVazbyEnum.Zastupovani */) {
                        gridFormat = gridFormat
                            .addTextColumn({
                            name: "ixs_esu_2_txt",
                            caption: "jres:25200083", //RC 25200083 : Název
                            width: 300,
                            fragment: ""
                        })
                            .addTextColumn({
                            name: "ixs_dva_2_nazev",
                            caption: "jres:25200170", //RC 25200170 : Typ
                            width: 300,
                            fragment: ""
                        });
                    }
                    return gridFormat;
                }
            };
            GSeznamVazebSubjektu = __decorate([
                gcontent
            ], GSeznamVazebSubjektu);
            WebApp.GSeznamVazebSubjektu = GSeznamVazebSubjektu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVZhemViU3ViamVrdHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtVmF6ZWJTdWJqZWt0dS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsSUFBVSxNQUFNLENBNktmO0FBN0tELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTZLbkI7SUE3S2dCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQTZLMUI7UUE3S29CLFdBQUEsTUFBTTtZQUV2QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQVVsRCxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLGlCQUFpQixFQUNqQjs0QkFDSSxPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjs0QkFDaEQsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLHdEQUFnRDs0QkFDeEUsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztnQ0FDaEIsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO2dDQUNqQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Z0NBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsa0NBQWtDLEVBQUUsRUFBRSxDQUFDLEVBQUU7b0NBQzlELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztpQ0FDeEIsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7cUNBQzdDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVB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cUJBQXFCOzRCQUMvQyxLQUFLLEVBQUUsR0FBRzs0QkFDVixRQUFRLEVBQUUsRUFBRTt5QkFDZixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsaUJBQWlCOzRCQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjs0QkFDN0MsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsUUFBUSxFQUFFLEVBQUU7eUJBQ2YsQ0FBQyxDQUFBO29CQUNWLENBQUM7eUJBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSwyREFBbUQsRUFBRSxDQUFDO3dCQUMxRSxVQUFVLEdBQUcsVUFBVTs2QkFDbEIsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxlQUFlOzRCQUNyQixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjs0QkFDL0MsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsUUFBUSxFQUFFLEVBQUU7eUJBQ2YsQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLGlCQUFpQjs0QkFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7NEJBQzdDLEtBQUssRUFBRSxHQUFHOzRCQUNWLFFBQVEsRUFBRSxFQUFFO3lCQUNmLENBQUMsQ0FBQTtvQkFDVixDQUFDO29CQUNELE9BQU8sVUFBVSxDQUFDO2dCQUN0QixDQUFDO2FBQ0osQ0FBQTtZQXhLWSxvQkFBb0I7Z0JBRGhDLFFBQVE7ZUFDSSxvQkFBb0IsQ0F3S2hDO1lBeEtZLDJCQUFvQix1QkF3S2hDLENBQUE7UUFDTCxDQUFDLEVBN0tvQixNQUFNLEdBQU4sVUFBTSxLQUFOLFVBQU0sUUE2SzFCO0lBQUQsQ0FBQyxFQTdLZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNktuQjtBQUFELENBQUMsRUE3S1MsTUFBTSxLQUFOLE1BQU0sUUE2S2YiLCJzb3VyY2VzQ29udGVudCI6WyJcclxubmFtZXNwYWNlIEdvcmRpYy5TcHIuV2ViQXBwIHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVZhemViU3ViamVrdHUgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIEl4cFNwaXM6IHN0cmluZztcclxuICAgICAgICBUeXBWelZhemJ5OiBudW1iZXI7XHJcbiAgICAgICAgSXhzRXN1OiBzdHJpbmc7XHJcbiAgICAgICAgVHlwVmF6Ynk6IG51bWJlcjtcclxuICAgICAgICBMaWNaYXN0OiBzdHJpbmc7XHJcbiAgICAgICAgUG9yWmFzdDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0UHJpZGF0WmFzdHVwY2U6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTgwXCIsIC8vUkMgMjUyMDAxODAgOiBQxZlpZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wbHVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5UeXBWelZhemJ5ID09IEdvcmRpYy5TcHIuSW50ZXJmYWNlLlR5cFZ6VmF6YnlFbnVtLlphc3R1cGNpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gODUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gNjUwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd1dpbmRvdyhbXCJHb3JkaWMuU3ByLldlYkFwcC5HVnliZXJaYXN0dXBjdVwiLCB7fV0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFNwaXM6IHRoYXQuSXhwU3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0LCBtb2RhbDogbW9kYWwgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsdWUgJiYgcmV0VmFsdWUuSXhzRXN1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIlByaWRhdFwiLCB7IGl4c0VzdTogcmV0VmFsdWUuSXhzRXN1LCB0eXBWYXpieTogcmV0VmFsdWUuVHlwVmF6YnksIHBvclphc3Q6IHJldFZhbHVlLlBvclphc3QsIGxpY1phc3Q6IHJldFZhbHVlLkxpY1phc3QgfSkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIsIHJvdy5peHNfcmFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJpZGF0WmFzdHVwb3ZhbmVobzpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxODBcIiwgLy9SQyAyNTIwMDE4MCA6IFDFmWlkYXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LlR5cFZ6VmF6YnkgPT0gR29yZGljLlNwci5JbnRlcmZhY2UuVHlwVnpWYXpieUVudW0uWmFzdHVwb3ZhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSA4NTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSA2NTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93V2luZG93KFtcIkdvcmRpYy5TcHIuV2ViQXBwLkdWeWJlckRvdGNlbmVob1N1Ympla3R1XCIsIHt9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwU3BpczogdGhhdC5JeHBTcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzRXN1OiB0aGF0Lkl4c0VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cFZhemJ5OiB0aGF0LlR5cFZhemJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGljWmFzdDogdGhhdC5MaWNaYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9yWmFzdDogdGhhdC5Qb3JaYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSmVkbm90bGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBCZXpaYXN0dXBjdTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFphc3R1cG92YW5pOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQsIG1vZGFsOiBtb2RhbCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgcm93Lml4c19yYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdE9kc3RyYW5pdDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxNzJcIiwgLy9SQyAyNTIwMDE3MiA6IE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtdGltZXMtY2lyY2xlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9kc3RyYW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UHJpZGF0WmFzdHVwY2UsIGZhdm9yaXRlOiB0cnVlIH0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UHJpZGF0WmFzdHVwb3ZhbmVobywgZmF2b3JpdGU6IHRydWUgfSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2RzdHJhbml0LCBmYXZvcml0ZTogdHJ1ZSB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKEdvcmRpYy5QcmVmYWJzLkFjdGlvbnMuWmF2cml0Q29udGVudCgpKSksIGZhdm9yaXRlOiB0cnVlIH0gICAvLyBaYXbFmcOtdFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1tdWpHcmlkJz5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcIml4cF9zcGlzXCJdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vZGF0YVZpZXdcclxuICAgICAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHVuZGVmaW5lZCwgeyBrZXk6IFwiaXhwX3NwaXNcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9kc3RyYW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9kc3RyYW5pdCgpXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1zZyA9IFwianJlczoyNTIwMDE3M1wiOyAgLy9SQyAyNTIwMDE3MyA6IE9wcmF2ZHUgc2kgcMWZZWpldGUgb2RzdHJhbml0IHZ5YnJhbsO9IHrDoXpuYW0/XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1WYXplYlN1Ympla3R1RHRvW107XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgbXNnID0gXCJqcmVzOjI1MjAwNDM3XCI7IC8vUkMgMjUyMDA0MzcgOiBPcHJhdmR1IHNpIHDFmWVqZXRlIG9kc3RyYW5pdCB2eWJyYW7DqSB6w6F6bmFteT9cclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczoyNTIwMDE3NFwiLCBtc2csIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2FsbChcIkRlbGV0ZU11bHRpXCIsIHsgZGV0YWlsRHRvQXJyYXk6IHNlbGVjdGlvbiB9KS5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwianJlczoyNTIwMDE3NVwiLCBcImctc3RhdGUtc3VjY2Vzc1wiLCAzMDAwLCBcImZsYXNoXCIpOyAvL1JDIDI1MjAwMTc1IDogT2RzdHJhbsSbbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIiwgcm93Lml4c19yYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uYWhyYW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YShmaWx0ZXI/OiBPYmplY3QpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcm9tID0gdGhpcy5jYWxsKFwiTG9hZERhdGFcIiwgeyB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmdyaWQuaGFzQ2xhc3MoXCJnZ3JpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRhdGFWaWV3LnVwZGF0ZURhdGEocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0LmRhdGFWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1WYXplYlN1Ympla3R1RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbVZhemViU3ViamVrdHVEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBWelZhemJ5ID09IEdvcmRpYy5TcHIuSW50ZXJmYWNlLlR5cFZ6VmF6YnlFbnVtLlphc3R1cGNpKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0ID0gZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XzFfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDA4M1wiLCAvL1JDIDI1MjAwMDgzIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2R2YV8xX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDE3MFwiLCAvL1JDIDI1MjAwMTcwIDogVHlwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLlR5cFZ6VmF6YnkgPT0gR29yZGljLlNwci5JbnRlcmZhY2UuVHlwVnpWYXpieUVudW0uWmFzdHVwb3ZhbmkpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VfMl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMDgzXCIsIC8vUkMgMjUyMDAwODMgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZHZhXzJfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTcwXCIsIC8vUkMgMjUyMDAxNzAgOiBUeXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=