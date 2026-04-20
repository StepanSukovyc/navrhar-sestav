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
            let GVyberZastupcu = class GVyberZastupcu extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.CreateMenu();
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        navigationMode: "row",
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: (ev, ctx) => {
                                var row = ctx.cellInfo.data;
                                that.okClick(row);
                            }
                        }),
                        columns: this.createGridFormat(),
                        searchColumns: ["ixs_esu"]
                    });
                    //dataView
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixs_esu" });
                    that.loadData();
                }
                CreateMenu() {
                    const that = this;
                    const commandBarPole = [];
                    commandBarPole.push({
                        action: that.actions.add(new GAction({
                            name: "actOk",
                            caption: "jres:25200124", //RC 25200124 : Vybrat
                            tooltip: "jres:25200124", //RC 25200124 : Vybrat
                            run: function () {
                                var selection;
                                selection = that.grid.ggrid("getSelection");
                                if (selection.length == 1) {
                                    that.okClick(selection[0]);
                                }
                            }
                        })),
                        favorite: true,
                        customClass: "g-button--primary"
                    });
                    commandBarPole.push({
                        action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    that.commandBar(that.actions.createBar(commandBarPole));
                }
                //nahrani dat
                loadData(filter) {
                    var that = this;
                    var prom = this.call("LoadData")
                        .done(function (ret) {
                        if (that.grid.hasClass("ggrid")) {
                            that.dataView.updateData(ret);
                            that.grid.ggrid("setData", that.dataView);
                        }
                    });
                    return prom;
                }
                createGridFormat() {
                    var gridFormat;
                    gridFormat = new Gordic.Data.GridFormat();
                    if (window.ginisDebugMode) {
                        gridFormat = gridFormat.addTextColumn({ name: "ixs_esu", caption: "IXS_ESU", width: 150, fixedWidth: false });
                    }
                    gridFormat = gridFormat
                        .addTextColumn({
                        name: "ixs_esu_txt",
                        caption: "jres:25200130", //RC 25200130 : Název
                        width: 300,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "ixs_dva_nazev",
                        caption: "jres:25200131", //RC 25200131 : Typ
                        width: 300,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "poznamka",
                        caption: "jres:25200133", //RC 25200133 : Poznámka
                        width: 100,
                        fragment: ""
                    });
                    return gridFormat;
                }
                okClick(subjekt) {
                    var that = this;
                    console.log("Vybrane radky ", subjekt.ixs_esu);
                    that.tryClose({ IxsEsu: subjekt.ixs_esu, TypVazby: subjekt.typ_vazby, PorZast: subjekt.por_zast, LicZast: subjekt.lic_zast });
                }
            };
            GVyberZastupcu = __decorate([
                gcontent
            ], GVyberZastupcu);
            WebApp.GVyberZastupcu = GVyberZastupcu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyWmFzdHVwY3UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJaYXN0dXBjdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsSUFBVSxNQUFNLENBK0dmO0FBL0dELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStHbkI7SUEvR2dCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQStHMUI7UUEvR29CLFdBQUEsTUFBTTtZQUV2QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxPQUFBLFlBQVk7Z0JBSTVDLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxJQUFJO3lCQUNKLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNO3dCQUNsQixjQUFjLEVBQUUsS0FBSzt3QkFDckIsYUFBYSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUN2QixJQUFJLEVBQUUsb0JBQW9COzRCQUMxQixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0NBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3RCLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUNoQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUM7cUJBQzdCLENBQUMsQ0FBQztvQkFFUCxVQUFV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ZUFBZTt3QkFDckIsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7d0JBQzdDLEtBQUssRUFBRSxHQUFHO3dCQUNWLFFBQVEsRUFBRSxFQUFFO3FCQUNmLENBQUM7eUJBQ0QsYUFBYSxDQUFDO3dCQUNYLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjt3QkFDbEQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsUUFBUSxFQUFFLEVBQUU7cUJBQ2YsQ0FBQyxDQUNEO29CQUNMLE9BQU8sVUFBVSxDQUFDO2dCQUN0QixDQUFDO2dCQUVPLE9BQU8sQ0FBQyxPQUFnRDtvQkFDNUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEksQ0FBQzthQUNKLENBQUE7WUF6R1ksY0FBYztnQkFEMUIsUUFBUTtlQUNJLGNBQWMsQ0F5RzFCO1lBekdZLHFCQUFjLGlCQXlHMUIsQ0FBQTtRQUNMLENBQUMsRUEvR29CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQStHMUI7SUFBRCxDQUFDLEVBL0dnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErR25CO0FBQUQsQ0FBQyxFQS9HUyxNQUFNLEtBQU4sTUFBTSxRQStHZiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5uYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5YmVyWmFzdHVwY3UgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlTWVudSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXYgY2xhc3M9J2pzLW11akdyaWQnPlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2tDbGljayhyb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQ29sdW1uczogW1wiaXhzX2VzdVwiXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2RhdGFWaWV3XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh1bmRlZmluZWQsIHsga2V5OiBcIml4c19lc3VcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGNvbW1hbmRCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTI0XCIsIC8vUkMgMjUyMDAxMjQgOiBWeWJyYXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtWmFzdHVwY3VEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rQ2xpY2soc2VsZWN0aW9uWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiZy1idXR0b24tLXByaW1hcnlcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oR29yZGljLlByZWZhYnMuQWN0aW9ucy5aYXZyaXRDb250ZW50KCkpKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoY29tbWFuZEJhclBvbGUpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmFocmFuaSBkYXRcclxuICAgICAgICBwdWJsaWMgbG9hZERhdGEoZmlsdGVyPzogT2JqZWN0KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcHJvbSA9IHRoaXMuY2FsbChcIkxvYWREYXRhXCIpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZC5oYXNDbGFzcyhcImdncmlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0YVZpZXcudXBkYXRlRGF0YShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQuZGF0YVZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbU9zdGF0bmljaFN1Ympla3R1RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0OiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Pc3RhdG5pY2hTdWJqZWt0dUR0bz47XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtT3N0YXRuaWNoU3ViamVrdHVEdG8+KCk7XHJcbiAgICAgICAgICAgIGlmICgod2luZG93IGFzIGFueSkuZ2luaXNEZWJ1Z01vZGUpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19lc3VcIiwgY2FwdGlvbjogXCJJWFNfRVNVXCIsIHdpZHRoOiAxNTAsIGZpeGVkV2lkdGg6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEzMFwiLCAvL1JDIDI1MjAwMTMwIDogTsOhemV2XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19kdmFfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMzFcIiwgLy9SQyAyNTIwMDEzMSA6IFR5cFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEzM1wiLCAvL1JDIDI1MjAwMTMzIDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9rQ2xpY2soc3ViamVrdDogR29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbVphc3R1cGN1RHRvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5IFwiLCBzdWJqZWt0Lml4c19lc3UpO1xyXG4gICAgICAgICAgICB0aGF0LnRyeUNsb3NlKHsgSXhzRXN1OiBzdWJqZWt0Lml4c19lc3UsIFR5cFZhemJ5OiBzdWJqZWt0LnR5cF92YXpieSwgUG9yWmFzdDogc3ViamVrdC5wb3JfemFzdCwgTGljWmFzdDogc3ViamVrdC5saWNfemFzdCB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19