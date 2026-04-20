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
            let GVyberDokumentuProVazbuCJ = class GVyberDokumentuProVazbuCJ extends Gordic.GContentBase {
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
                        searchColumns: ["nazev"]
                    });
                    //dataView
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixp_spis, ixp" });
                    //this.filterForm.gfilterpanel("applyFilter", undefined, undefined, true);
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
                    //if (filter == undefined)
                    //    filter = new Object();
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
                    gridFormat = gridFormat
                        .addTextColumn({
                        name: "ixp",
                        caption: "PID",
                        width: 150,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "cj",
                        caption: "jres:25200243", //RC 25200243 : ČJ
                        width: 150,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:25200244", //RC 25200244 : Název
                        width: 200,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "akt_znacka",
                        caption: "jres:25200245", //RC 25200245 : Značka
                        width: 150,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "misto_vzniku",
                        caption: "jres:25200246", //RC 25200246 : Odesílatel
                        width: 150,
                        fragment: ""
                    });
                    return gridFormat;
                }
                closing(result) {
                    return $.Deferred().resolve(result).promise();
                }
                //private okClick2(dok: Gordic.Spr.Interface.GSeznamDokumentuProVazbuCJDto): void {
                //    this.tryClose({ Ixp: dok.ixp });
                //}
                okClick(dok) {
                    var that = this;
                    console.log("Vybrane radky ", dok.ixp);
                    //this.dialogs.confirm("jres:25200247" + dok.ixp + "?") //RC 25200247 : Opravdu chcete zvolit dokument 
                    //    .on('close', (ev, value) => {
                    //        if (value === "yes") {
                    //            that.tryClose({ Ixp: dok.ixp });
                    //        }
                    //    });
                    // nepomohlo
                    //this.dialogs.messageBox("jres:25200174", "jres:25200247" + dok.ixp + "?", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200174 : Dotaz
                    //    .on("yes", function () {
                    //        that.tryClose({ Ixp: dok.ixp });
                    //    });
                    this.dialogs.messageBox("jres:25200174", "jres:25200247" + dok.ixp + "?", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 25200174 : Dotaz
                        .on("yes", function () {
                        that.close({ Ixp: dok.ixp });
                    });
                }
            };
            GVyberDokumentuProVazbuCJ = __decorate([
                gcontent
            ], GVyberDokumentuProVazbuCJ);
            WebApp.GVyberDokumentuProVazbuCJ = GVyberDokumentuProVazbuCJ;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyRG9rdW1lbnR1UHJvVmF6YnVDSi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdWeWJlckRva3VtZW50dVByb1ZhemJ1Q0oudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLElBQVUsTUFBTSxDQTJKZjtBQTNKRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EySm5CO0lBM0pnQixXQUFBLEdBQUc7UUFBQyxJQUFBLE1BQU0sQ0EySjFCO1FBM0pvQixXQUFBLE1BQU07WUFFdkIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUduQyxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUEwQixTQUFRLE9BQUEsWUFBWTtnQkFLdkQsMENBQTBDO2dCQUUxQyxjQUFjO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUVsQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsSUFBSTt3QkFDTCw0SEFBNEg7eUJBQzNILFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3lCQUN0QixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILFVBQVUsRUFBRSxNQUFNO3dCQUNsQixjQUFjLEVBQUUsS0FBSzt3QkFDckIsYUFBYSxFQUFFLElBQUksT0FBTyxDQUFDOzRCQUN2QixJQUFJLEVBQUUsb0JBQW9COzRCQUMxQixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0NBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7NEJBQ3JCLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUNo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RSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxxQkFBcUI7eUJBQzNILEVBQUUsQ0FBQyxLQUFLLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDakMsQ0FBQyxDQUFDLENBQUM7Z0JBSVgsQ0FBQzthQUNKLENBQUE7WUFySlkseUJBQXlCO2dCQURyQyxRQUFRO2VBQ0kseUJBQXlCLENBcUpyQztZQXJKWSxnQ0FBeUIsNEJBcUpyQyxDQUFBO1FBQ0wsQ0FBQyxFQTNKb0IsTUFBTSxHQUFOLFVBQU0sS0FBTixVQUFNLFFBMkoxQjtJQUFELENBQUMsRUEzSmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTJKbkI7QUFBRCxDQUFDLEVBM0pTLE1BQU0sS0FBTixNQUFNLFFBMkpmIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbm5hbWVzcGFjZSBHb3JkaWMuU3ByLldlYkFwcCB7XHJcblxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVnliZXJEb2t1bWVudHVQcm9WYXpidUNKIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgSXhwU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcbiAgICAgICAgLy9wcml2YXRlIGZpbHRlckZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlTWVudSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXYgY2xhc3M9J2pzLW11akdyaWQnPlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSBcIiArIHRoYXQuJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKSAvLyBuYXN0YXZlbsOtIHbDvcWha3kgZWxlbWVudHUsIG5hIGt0ZXLDvSBidWRlIHDFmWlkw6FuIGdyaWQuXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2tDbGljayhyb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJuYXpldlwiXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2RhdGFWaWV3XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh1bmRlZmluZWQsIHsga2V5OiBcIml4cF9zcGlzLCBpeHBcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5maWx0ZXJGb3JtLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBDcmVhdGVNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRCYXJQb2xlOiBNZW51UGFyYW1zW10gPSBbXTtcclxuICAgICAgICAgICAgY29tbWFuZEJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczoyNTIwMDEyNFwiLCAvL1JDIDI1MjAwMTI0IDogVnlicmF0XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3Rpb246IEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Eb2t1bWVudHVQcm9WYXpidUNKRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5va0NsaWNrKHNlbGVjdGlvblswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbW1hbmRCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKEdvcmRpYy5QcmVmYWJzLkFjdGlvbnMuWmF2cml0Q29udGVudCgpKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKGNvbW1hbmRCYXJQb2xlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25haHJhbmkgZGF0XHJcbiAgICAgICAgcHVibGljIGxvYWREYXRhKGZpbHRlcj86IE9iamVjdCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKGZpbHRlciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIC8vICAgIGZpbHRlciA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9tID0gdGhpcy5jYWxsKFwiTG9hZERhdGFcIilcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5ncmlkLmhhc0NsYXNzKFwiZ2dyaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXRhVmlldy51cGRhdGVEYXRhKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5kYXRhVmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtRG9rdW1lbnR1UHJvVmF6YnVDSkR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtRG9rdW1lbnR1UHJvVmF6YnVDSkR0bz47XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtRG9rdW1lbnR1UHJvVmF6YnVDSkR0bz4oKTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IGdyaWRGb3JtYXRcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUElEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjQzXCIsIC8vUkMgMjUyMDAyNDMgOiDEjEpcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAyNDRcIiwgLy9SQyAyNTIwMDI0NCA6IE7DoXpldlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJha3Rfem5hY2thXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMjQ1XCIsIC8vUkMgMjUyMDAyNDUgOiBabmHEjWthXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1pc3RvX3Z6bmlrdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDI0NlwiLCAvL1JDIDI1MjAwMjQ2IDogT2Rlc8OtbGF0ZWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNsb3NpbmcocmVzdWx0KTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJlc3VsdCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIG9rQ2xpY2syKGRvazogR29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbURva3VtZW50dVByb1ZhemJ1Q0pEdG8pOiB2b2lkIHtcclxuICAgICAgICAvLyAgICB0aGlzLnRyeUNsb3NlKHsgSXhwOiBkb2suaXhwIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9rQ2xpY2soZG9rOiBHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtRG9rdW1lbnR1UHJvVmF6YnVDSkR0byk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVnlicmFuZSByYWRreSBcIiwgZG9rLml4cCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5kaWFsb2dzLmNvbmZpcm0oXCJqcmVzOjI1MjAwMjQ3XCIgKyBkb2suaXhwICsgXCI/XCIpIC8vUkMgMjUyMDAyNDcgOiBPcHJhdmR1IGNoY2V0ZSB6dm9saXQgZG9rdW1lbnQgXHJcbiAgICAgICAgICAgIC8vICAgIC5vbignY2xvc2UnLCAoZXYsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LnRyeUNsb3NlKHsgSXhwOiBkb2suaXhwIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5lcG9tb2hsb1xyXG4gICAgICAgICAgICAvL3RoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczoyNTIwMDE3NFwiLCBcImpyZXM6MjUyMDAyNDdcIiArIGRvay5peHAgKyBcIj9cIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAyNTIwMDE3NCA6IERvdGF6XHJcbiAgICAgICAgICAgIC8vICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGF0LnRyeUNsb3NlKHsgSXhwOiBkb2suaXhwIH0pO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczoyNTIwMDE3NFwiLCBcImpyZXM6MjUyMDAyNDdcIiArIGRvay5peHAgKyBcIj9cIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAyNTIwMDE3NCA6IERvdGF6XHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBJeHA6IGRvay5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19