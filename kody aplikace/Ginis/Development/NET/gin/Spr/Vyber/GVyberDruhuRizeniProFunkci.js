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
            let GVyberDruhuRizeniProFunkci = class GVyberDruhuRizeniProFunkci extends Gordic.GContentBase {
                //private filterForm: JQuery<HTMLElement>;
                onContentReady() {
                    var that = this;
                    this.CreateMenu();
                    this.grid = $("<div class='js-mujGrid'>");
                    this.grid
                        //.css("height", "calc(100% - " + that.$filterForm.height() + "px)") // nastavení výšky elementu, na který bude přidán grid.
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
                        searchColumns: ["nazev", "typ_sr_txt"]
                    });
                    //dataView
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixs_dsr" });
                    //this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
                    that.loadData();
                }
                CreateMenu() {
                    const that = this;
                    const commandBarPole = [];
                    if (that.ShowOkButton) {
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
                    }
                    commandBarPole.push({
                        action: that.actions.add(new GAction(Gordic.Prefabs.Actions.ZavritContent()))
                    });
                    that.commandBar(that.actions.createBar(commandBarPole));
                }
                //nahrani dat
                loadData(filter) {
                    var that = this;
                    //if (filter == undefined)
                    //    filter = new Object();
                    var prom = this.call("GetDruhRizeniProFunkci")
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
                        gridFormat = gridFormat.addTextColumn({ name: "ixs_dsr", caption: "IXS_DSR", width: 150, fixedWidth: false });
                    }
                    gridFormat = gridFormat
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:25200125", //RC 25200125 : Název druhu řízení
                        width: 300,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "typ_sr_txt",
                        caption: "jres:25200126", //RC 25200126 : Typ řízení
                        width: 300,
                        fragment: ""
                    });
                    return gridFormat;
                }
                okClick(druhRizeni) {
                    var that = this;
                    console.log("Vybrane radky ", druhRizeni.ixs_dsr);
                    this.dialogs.confirm("jres:25200127".format(druhRizeni.nazev?.toString())) //RC 25200127 : Opravdu chcete zvolit druh řízení {0}?
                        .on('close', (ev, value) => {
                        if (value === "yes") {
                            that.close({ IxsDsr: druhRizeni.ixs_dsr });
                        }
                    });
                }
            };
            GVyberDruhuRizeniProFunkci = __decorate([
                gcontent
            ], GVyberDruhuRizeniProFunkci);
            WebApp.GVyberDruhuRizeniProFunkci = GVyberDruhuRizeniProFunkci;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyRHJ1aHVSaXplbmlQcm9GdW5rY2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVnliZXJEcnVodVJpemVuaVByb0Z1bmtjaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsSUFBVSxNQUFNLENBMEhmO0FBMUhELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTBIbkI7SUExSGdCLFdBQUEsR0FBRztRQUFDLElBQUEsTUFBTSxDQTBIMUI7UUExSG9CLFdBQUEsTUFBTTtZQUV2QixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBR25DLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEsT0FBQSxZQUFZO2dCQU14RCwwQ0FBMEM7Z0JBRTFDLGNBQWM7b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBRWxCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxJQUFJO3dCQUNMLDRIQUE0SDt5QkFDM0gsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixhQUFhLEVBQUUsSUFBSSxPQUFPLENBQUM7NEJBQ3ZCLElBQUksRUFBRSxvQkFBb0I7NEJBQzFCLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQ0FDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDckIsQ0FBQzt5QkFDSixDQUFDO3dCQUNGLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7d0JB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bkI7QUFBRCxDQUFDLEVBMUhTLE1BQU0sS0FBTixNQUFNLFFBMEhmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJEcnVodVJpemVuaVByb0Z1bmtjaSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIFR5cFNyOiBudW1iZXI7XHJcbiAgICAgICAgU2hvd09rQnV0dG9uOiBib29sZWFuO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcbiAgICAgICAgLy9wcml2YXRlIGZpbHRlckZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlTWVudSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXYgY2xhc3M9J2pzLW11akdyaWQnPlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSBcIiArIHRoYXQuJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKSAvLyBuYXN0YXZlbsOtIHbDvcWha3kgZWxlbWVudHUsIG5hIGt0ZXLDvSBidWRlIHDFmWlkw6FuIGdyaWQuXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2tDbGljayhyb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJuYXpldlwiLCBcInR5cF9zcl90eHRcIl1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9kYXRhVmlld1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFWaWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodW5kZWZpbmVkLCB7IGtleTogXCJpeHNfZHNyXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGlmICh0aGF0LlNob3dPa0J1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1EcnVodVJpemVuaVByb091b0R0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2tDbGljayhzZWxlY3Rpb25bMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJnLWJ1dHRvbi0tcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21tYW5kQmFyUG9sZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFkZChuZXcgR0FjdGlvbihHb3JkaWMuUHJlZmFicy5BY3Rpb25zLlphdnJpdENvbnRlbnQoKSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihjb21tYW5kQmFyUG9sZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uYWhyYW5pIGRhdFxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YShmaWx0ZXI/OiBPYmplY3QpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL2lmIChmaWx0ZXIgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAvLyAgICBmaWx0ZXIgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvbSA9IHRoaXMuY2FsbChcIkdldERydWhSaXplbmlQcm9GdW5rY2lcIilcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ncmlkLmhhc0NsYXNzKFwiZ2dyaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXRhVmlldy51cGRhdGVEYXRhKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5kYXRhVmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtRHJ1aHVSaXplbmlQcm9PdW9EdG8+IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbURydWh1Uml6ZW5pUHJvT3VvRHRvPjtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1EcnVodVJpemVuaVByb091b0R0bz4oKTtcclxuICAgICAgICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5naW5pc0RlYnVnTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2RzclwiLCBjYXB0aW9uOiBcIklYU19EU1JcIiwgd2lkdGg6IDE1MCwgZml4ZWRXaWR0aDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTI1XCIsIC8vUkMgMjUyMDAxMjUgOiBOw6F6ZXYgZHJ1aHUgxZnDrXplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9zcl90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMjZcIiwgLy9SQyAyNTIwMDEyNiA6IFR5cCDFmcOtemVuw61cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9rQ2xpY2soZHJ1aFJpemVuaTogR29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbURydWh1Uml6ZW5pUHJvT3VvRHRvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWeWJyYW5lIHJhZGt5IFwiLCBkcnVoUml6ZW5pLml4c19kc3IpO1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MjUyMDAxMjdcIi5mb3JtYXQoZHJ1aFJpemVuaS5uYXpldj8udG9TdHJpbmcoKSkpIC8vUkMgMjUyMDAxMjcgOiBPcHJhdmR1IGNoY2V0ZSB6dm9saXQgZHJ1aCDFmcOtemVuw60gezB9P1xyXG4gICAgICAgICAgICAgICAgLm9uKCdjbG9zZScsIChldiwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSh7IEl4c0RzcjogZHJ1aFJpemVuaS5peHNfZHNyIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=