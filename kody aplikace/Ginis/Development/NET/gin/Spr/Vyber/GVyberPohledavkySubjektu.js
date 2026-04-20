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
            let GVyberPohledavkySubjektu = class GVyberPohledavkySubjektu extends Gordic.GContentBase {
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
                        searchColumns: ["ixp_eko_dok"]
                    });
                    //dataView
                    this.dataView = new Gordic.Data.View(undefined, { key: "ixp_eko_dok" });
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
                    var prom = this.call("GetPohledavkySubjektu")
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
                        name: "ixs_esu_txt",
                        caption: "jres:25200107", //RC 25200107 : Poplatník
                        width: 150,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "ixp_eko_dok",
                        caption: "jres:25200418", //RC 25200418 : PID
                        width: 100,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "vs",
                        caption: "jres:25200110", //RC 25200110 : VS
                        width: 100,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "druh_pl_txt",
                        caption: "jres:25200108", //RC 25200108 : Druh platby
                        width: 150,
                        fragment: ""
                    })
                        .addNumberColumn({
                        name: "c_pop",
                        caption: "jres:25200109", //RC 25200109 : Výše platby
                        width: 150,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "typ_eko_txt",
                        caption: "jres:25200156", //RC 25200156 : Typ dokladu
                        width: 100,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "ixp_eko_dok",
                        caption: "jres:25200157", //RC 25200157 : PID dokladu
                        width: 100,
                        fragment: ""
                    })
                        .addDateColumn({
                        name: "dat_vyzvy",
                        caption: "jres:25200111", //RC 25200111 : Datum výzvy
                        width: 150,
                        fragment: ""
                    })
                        .addDateColumn({
                        name: "dat_zapl",
                        caption: "jres:25200112", //RC 25200112 : Datum zaplacení
                        width: 150,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "druh_sa_txt",
                        caption: "jres:25200113", //RC 25200113 : Druh sankce
                        width: 150,
                        fragment: ""
                    })
                        .addTextColumn({
                        name: "zpu_pl_txt",
                        caption: "jres:25200114", //RC 25200114 : Způsob platby
                        width: 150,
                        fragment: ""
                    });
                    return gridFormat;
                }
                okClick(dto) {
                    var that = this;
                    console.log("Vybrane radky ", dto);
                    that.close({ ixp_eko_dok: dto.ixp_eko_dok, vs: dto.vs });
                    //this.dialogs.confirm("jres:25200127".format(druhRizeni.nazev?.toString())) //RC 25200127 : Opravdu chcete zvolit druh řízení {0}?
                    //    .on('close', (ev, value) => {
                    //        if (value === "yes") {
                    //            that.close({ IxsDsr: druhRizeni.ixs_dsr });
                    //        }
                    //    });
                }
            };
            GVyberPohledavkySubjektu = __decorate([
                gcontent
            ], GVyberPohledavkySubjektu);
            WebApp.GVyberPohledavkySubjektu = GVyberPohledavkySubjektu;
        })(WebApp = Spr.WebApp || (Spr.WebApp = {}));
    })(Spr = Gordic.Spr || (Gordic.Spr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Z5YmVyUG9obGVkYXZreVN1Ympla3R1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Z5YmVyUG9obGVkYXZreVN1Ympla3R1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFVLE1BQU0sQ0EyS2Y7QUEzS0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMktuQjtJQTNLZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxNQUFNLENBMksxQjtRQTNLb0IsV0FBQSxNQUFNO1lBRXZCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFHbkMsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBeUIsU0FBUSxPQUFBLFlBQVk7Z0JBTXRELDBDQUEwQztnQkFFMUMsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLElBQUk7d0JBQ0wsNEhBQTRIO3lCQUMzSCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsUUFBUSxFQUFFO3lCQUNWLEtBQUssQ0FBQzt3QkFDSCxVQUFVLEVBQUUsTUFBTTt3QkFDbEIsY0FBYyxFQUFFLEtBQUs7d0JBQ3JCLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQzs0QkFDdkIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dDQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUNyQixDQUFDO3lCQUNKLENBQUM7d0JBQ0YsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTt3QkFDaEMs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QUNYLElBQUksRUFBRSxhQUFhO3dCQUNuQixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsUUFBUSxFQUFFLEVBQUU7cUJBQ2YsQ0FBQzt5QkFDRCxhQUFhLENBQUM7d0JBQ1gsSUFBSSxFQUFFLFlBQVk7d0JBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNkJBQTZCO3dCQUN2RCxLQUFLLEVBQUUsR0FBRzt3QkFDVixRQUFRLEVBQUUsRUFBRTtxQkFDZixDQUFDLENBQUM7b0JBQ1AsT0FBTyxVQUFVLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRU8sT0FBTyxDQUFDLEdBQXVDO29CQUNuRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3pELG1JQUFtSTtvQkFDbkksbUNBQW1DO29CQUNuQyxnQ0FBZ0M7b0JBQ2hDLHlEQUF5RDtvQkFDekQsV0FBVztvQkFDWCxTQUFTO2dCQUNiLENBQUM7YUFDSixDQUFBO1lBcktZLHdCQUF3QjtnQkFEcEMsUUFBUTtlQUNJLHdCQUF3QixDQXFLcEM7WUFyS1ksK0JBQXdCLDJCQXFLcEMsQ0FBQTtRQUNMLENBQUMsRUEzS29CLE1BQU0sR0FBTixVQUFNLEtBQU4sVUFBTSxRQTJLMUI7SUFBRCxDQUFDLEVBM0tnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyS25CO0FBQUQsQ0FBQyxFQTNLUyxNQUFNLEtBQU4sTUFBTSxRQTJLZiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5uYW1lc3BhY2UgR29yZGljLlNwci5XZWJBcHAge1xyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Z5YmVyUG9obGVkYXZreVN1Ympla3R1IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgSXhwU3Bpczogc3RyaW5nO1xyXG4gICAgICAgIEl4c0VzdTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVZpZXc6IEdvcmRpYy5EYXRhLlZpZXc7XHJcbiAgICAgICAgLy9wcml2YXRlIGZpbHRlckZvcm06IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuQ3JlYXRlTWVudSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXYgY2xhc3M9J2pzLW11akdyaWQnPlwiKTtcclxuICAgICAgICAgICAgdGhpcy5ncmlkXHJcbiAgICAgICAgICAgICAgICAvLy5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMCUgLSBcIiArIHRoYXQuJGZpbHRlckZvcm0uaGVpZ2h0KCkgKyBcInB4KVwiKSAvLyBuYXN0YXZlbsOtIHbDvcWha3kgZWxlbWVudHUsIG5hIGt0ZXLDvSBidWRlIHDFmWlkw6FuIGdyaWQuXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBjdHguY2VsbEluZm8uZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2tDbGljayhyb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJpeHBfZWtvX2Rva1wiXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL2RhdGFWaWV3XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh1bmRlZmluZWQsIHsga2V5OiBcIml4cF9la29fZG9rXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZmlsdGVyRm9ybS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoYXQubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQ3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kQmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcbiAgICAgICAgICAgIGNvbW1hbmRCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTI0XCIsIC8vUkMgMjUyMDAxMjQgOiBWeWJyYXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MjUyMDAxMjRcIiwgLy9SQyAyNTIwMDEyNCA6IFZ5YnJhdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uOiBHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtUG9wRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5va0NsaWNrKHNlbGVjdGlvblswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbW1hbmRCYXJQb2xlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKG5ldyBHQWN0aW9uKEdvcmRpYy5QcmVmYWJzLkFjdGlvbnMuWmF2cml0Q29udGVudCgpKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKGNvbW1hbmRCYXJQb2xlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25haHJhbmkgZGF0XHJcbiAgICAgICAgcHVibGljIGxvYWREYXRhKGZpbHRlcj86IE9iamVjdCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKGZpbHRlciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIC8vICAgIGZpbHRlciA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9tID0gdGhpcy5jYWxsKFwiR2V0UG9obGVkYXZreVN1Ympla3R1XCIpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZC5oYXNDbGFzcyhcImdncmlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0YVZpZXcudXBkYXRlRGF0YShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIHRoYXQuZGF0YVZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlNwci5JbnRlcmZhY2UuR1Nlem5hbVBvcER0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuU3ByLkludGVyZmFjZS5HU2V6bmFtUG9wRHRvPjtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Qb3BEdG8+KCk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQgPSBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEwN1wiLCAvL1JDIDI1MjAwMTA3IDogUG9wbGF0bsOta1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfZWtvX2Rva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDQxOFwiLCAvL1JDIDI1MjAwNDE4IDogUElEXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTEwXCIsIC8vUkMgMjUyMDAxMTAgOiBWU1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkcnVoX3BsX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEwOFwiLCAvL1JDIDI1MjAwMTA4IDogRHJ1aCBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BvcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDEwOVwiLCAvL1JDIDI1MjAwMTA5IDogVsO9xaFlIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfZWtvX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDE1NlwiLCAvL1JDIDI1MjAwMTU2IDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2Vrb19kb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MjUyMDAxNTdcIiwgLy9SQyAyNTIwMDE1NyA6IFBJRCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXp2eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczoyNTIwMDExMVwiLCAvL1JDIDI1MjAwMTExIDogRGF0dW0gdsO9enZ5XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96YXBsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTEyXCIsIC8vUkMgMjUyMDAxMTIgOiBEYXR1bSB6YXBsYWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRydWhfc2FfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTEzXCIsIC8vUkMgMjUyMDAxMTMgOiBEcnVoIHNhbmtjZVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6cHVfcGxfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI1MjAwMTE0XCIsIC8vUkMgMjUyMDAxMTQgOiBacMWvc29iIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2tDbGljayhkdG86IEdvcmRpYy5TcHIuSW50ZXJmYWNlLkdTZXpuYW1Qb3BEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZ5YnJhbmUgcmFka3kgXCIsIGR0byk7XHJcbiAgICAgICAgICAgIHRoYXQuY2xvc2UoeyBpeHBfZWtvX2RvazogZHRvLml4cF9la29fZG9rLCB2czogZHRvLnZzIH0pO1xyXG4gICAgICAgICAgICAvL3RoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczoyNTIwMDEyN1wiLmZvcm1hdChkcnVoUml6ZW5pLm5hemV2Py50b1N0cmluZygpKSkgLy9SQyAyNTIwMDEyNyA6IE9wcmF2ZHUgY2hjZXRlIHp2b2xpdCBkcnVoIMWZw616ZW7DrSB7MH0/XHJcbiAgICAgICAgICAgIC8vICAgIC5vbignY2xvc2UnLCAoZXYsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodmFsdWUgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmNsb3NlKHsgSXhzRHNyOiBkcnVoUml6ZW5pLml4c19kc3IgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=