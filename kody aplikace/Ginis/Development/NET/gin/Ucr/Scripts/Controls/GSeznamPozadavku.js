"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * Seznam pozadavku
             *
             * @author tkares
             * @since 484.1.0.69
             */
            let GSeznamPozadavku = class GSeznamPozadavku extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    //private $grid: JQuery<HTMLElement>;        
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    // nastaveni id a titulku okna
                    this.taskId = "showSeznamPozAct";
                    this.title = "jres:31100165";
                }
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([
                        {
                            action: new GAction({
                                name: "actBack", caption: this.title, run: function () {
                                    that.tryClose();
                                    //that.tryCloseAllChildContents();
                                }
                            })
                        }
                    ]);
                    $.newDiv()
                        .appendTo(this.element)
                        .gsubtasks({
                        params: [
                            { action: new GAction({ name: "actAll", caption: "jres:31100002", run: function () { that.loadData(-1); } }) }, //RC 31100002 : Všechny
                            { action: new GAction({ name: "actPers", caption: "jres:31100003", run: function () { that.loadData(10); } }) }, //RC 31100003 : Osobní
                            { action: new GAction({ name: "actPublic", caption: "jres:31100004", run: function () { that.loadData(0); } }) } //RC 31100004 : Veřejné
                        ]
                    });
                    this.actions.add({
                        name: "newAct",
                        icon: "gi-plus",
                        caption: "jres:31100210", //RC 31100210 : Nový požadavek
                        run: function (ev, ctx) {
                            that.navigate('Gordic.Ucr.WebClient.GDetailPozadavkuControl', {});
                        }
                    });
                    this.actions.add({
                        name: "selAct",
                        icon: "gi-detail",
                        caption: "jres:31100156", //RC 31100156 : Detail
                        enabled: false,
                        run: (ev, ctx) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            that.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { ixsSes: row.ixs_ses } });
                        }
                    });
                    this.actions.add({
                        name: "delAct",
                        icon: "gi-bin",
                        caption: "jres:31100212", //RC 31100212 : Smazat
                        run: function (ev, ctx) {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var row = grid.ggrid("activeRow");
                            if (row === null)
                                return;
                            that.dialogs.confirm("jres:30250002".format(row.nazev)) //RC 30250002 : Opravdu chcete smazat vybraný požadavek ({0})?
                                .on("close", (ev, obj) => {
                                if (obj !== "yes")
                                    return;
                                Gordic.Isl.UcrPozadavek.delete({ identifikator: row.ixs_ses })
                                    .get()
                                    .then(function () {
                                    that.loadData();
                                    that.showFlash({ id: "flashDelete", icon: "gi-tick", label: "jres:30250003", customClass: "g-state-success", timer: 5000 }); //RC 30250003 : Požadavek byl vymazán
                                });
                            });
                        }
                    });
                    this.menuBar([
                        { action: that.actions.newAct, favorite: true, captionVisible: "never" },
                        { action: that.actions.selAct, favorite: true },
                        { action: that.actions.delAct, favorite: true }
                    ]);
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: [],
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                var row = ctx.cellInfo.data;
                                that.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { ixsSes: row.ixs_ses } });
                            }
                        }),
                        searchColumns: ["nazev", "poznamka"],
                        //#region Definice sloupcu
                        columns: new Gordic.Data.GridFormat()
                            .addIconColumn({
                            name: "ixs_fun",
                            caption: "",
                            width: 30,
                            iconTemplate: function (row, metarow) {
                                var icon = metarow.data.ixs_fun === Gordic.Ucr.Globals.GUcrGlobals.ixs_fun ? "gi-user" : "gi-group";
                                return { icon: icon };
                            },
                            sortable: false
                        })
                            .addTextColumn({
                            name: "nazev",
                            caption: "jres:31100006", //RC 31100006 : Název požadavku
                            width: 250
                        })
                            .addTextColumn({
                            name: "id_ses_alv",
                            caption: "jres:31100007", //RC 31100007 : Sestava
                            width: 75
                        })
                            .addTextColumn({
                            name: "nazev_alv",
                            caption: "jres:31100008", //RC 31100008 : Název sestavy
                            width: 250
                        })
                            .addTextColumn({
                            name: "nazev_frm",
                            caption: "jres:31100009", //RC 31100009 : Název formátu
                            width: 150
                        })
                            .addNumberColumn({
                            name: "rok",
                            caption: "jres:31100010", //RC 31100010 : Rok
                            width: 50
                        })
                            .addTextColumn({
                            name: "mesic_comp",
                            caption: "jres:31100011", //RC 31100011 : Měsíc
                            width: 80
                        })
                            .addTextColumn({
                            name: "msk_nazev",
                            caption: "jres:31100012", //RC 31100012 : Maska
                            width: 100
                        })
                            .addTextColumn({
                            name: "ico",
                            caption: Gordic.Ucr.Globals.GZkr.Ico,
                            width: 70
                        })
                            .addTextColumn({
                            name: "ucs",
                            caption: Gordic.Ucr.Globals.GZkr.Ucs,
                            width: 70
                        })
                            .addTextColumn({
                            name: "uus",
                            caption: Gordic.Ucr.Globals.GZkr.Uus,
                            width: 70
                        })
                            .addTextColumn({
                            name: "nks",
                            caption: Gordic.Ucr.Globals.GZkr.Nks,
                            width: 70
                        })
                            .addTextColumn({
                            name: "sns_nazev",
                            caption: "jres:31100013", //RC 31100013 : Seskupení
                            width: 100
                        })
                            .addTextColumn({
                            name: "poznamka",
                            caption: "jres:31100014", //RC 31100014 : Poznámka
                            width: 200
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:31100015", //RC 31100015 : Datum změny
                            width: 130
                        })
                        //#endregion
                    });
                    this.loadData(-1);
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find("." + this.classGrid);
                    return (data.length == 0 ? null : data);
                }
                /**
                 *  Nacteni dat
                 */
                loadData(typMask) {
                    var that = this;
                    var typMsk = typMask === undefined ? this.lastTypMsk : typMask;
                    this.lastTypMsk = typMsk;
                    //var view = new Gordic.Isl.View(Gordic.Isl.UcrPozadavek.list({ filters: { ixs_ses: typMsk } }));
                    Gordic.Isl.UcrPozadavek.list({ filters: { typ_msk: typMsk } })
                        .getData()
                        .then((result) => {
                        debugger;
                        that.actions["selAct"].enabled(result.length > 0);
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        //that.data = r;
                        grid.ggrid("setData", new Gordic.Data.View(result, { key: "ixs_ses" }));
                        return;
                    });
                }
            };
            GSeznamPozadavku = __decorate([
                Decorators.gcontent
            ], GSeznamPozadavku);
            WebClient.GSeznamPozadavku = GSeznamPozadavku;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVBvemFkYXZrdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Qb3phZGF2a3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQXdPZjtBQXhPRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3T25CO0lBeE9nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F3TzdCO1FBeE9vQixXQUFBLFNBQVM7WUFDMUI7Ozs7O2VBS0c7WUFFSCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFpQixTQUFRLE9BQUEsWUFBWTtnQkFBbEQ7O29CQUdJLDZDQUE2QztvQkFDN0M7O3VCQUVHO29CQUNPLGNBQVMsR0FBVyxjQUFjLENBQUM7b0JBQzdDLDhCQUE4QjtvQkFDOUIsV0FBTSxHQUFFLGtCQUFrQixDQUFDO29CQUMzQixVQUFLLEdBQUcsZUFBZSxDQUFDO2dCQXFONUIsQ0FBQztnQkFwTkcsY0FBYztvQkFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxjQUFjLENBQUM7d0JBQ2hCOzRCQUNJLE1BQU0sRUFBRSxJQUFJLE9BQU8sQ0FBQztnQ0FDaEIsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7b0NBQ3ZDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQ0FDaEIsa0NBQWtDO2dDQUN0QyxDQUFDOzZCQUNKLENBQUM7eUJBQ0w7cUJBQ0osQ0FBQyxDQUFDO29CQUVILENBQUMsQ0FBQyxNQUFNLEVBQUU7eUJBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFNBQVMsQ0FBQzt3QkFDUCxNQUFNLEVBQUU7NEJBQ0osRUFBRSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFHLHVCQUF1Qjs0QkFDeEksRUFBRSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRyxzQkFBc0I7NEJBQ3hJLEVBQUUsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUcsdUJBQXVCO3lCQUM3STtxQkFDSixDQUFDLENBQUM7b0JBRVAsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSw4QkFBOEI7d0JBQ3hELEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLDhDQUE4QyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RSxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDYixJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRyxzQkFBc0I7d0JBQ2pELE9BQU8sRUFBRSxLQUFLO3dCQUNkLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7Z0NBQUUsT0FBTzs0QkFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDbEMsSUFBSSxHQUFHLEtBQUssSUFBSTtnQ0FDWixPQUFPOzRCQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsOENBQThDLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDeEcsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7d0JBQ2hELEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRCQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7Z0NBQUUsT0FBTzs0QkFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDbEMsSUFBSSxHQUFHLEtBQUssSUFBSTtnQ0FDWixPQUFPOzRCQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsOERBQThEO2lDQUVqSCxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQVcsRUFBRSxFQUFFO2dDQUM3QixJQUFJLEdBQUcsS0FBSyxLQUFLO29DQUFFLE9BQU87Z0NBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7cUNBQ3pELEdBQUcsRUFBRTtxQ0FDTCxJQUFJLENBQUM7b0NBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29DQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUUscUNBQXFDO2dDQUN0SyxDQUFDLENBQUMsQ0FBQzs0QkFDWCxDQUFDLENBQUMsQ0FBQzt3QkFDWCxDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNULEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRTt3QkFDeEUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTt3QkFDL0MsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtxQkFDbEQsQ0FBQyxDQUFDO29CQUVILE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt5QkFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQ3RCLFFBQVEsRUFBRTt5QkFDVixLQUFLLENBQUM7d0JBQ0gsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLElBQUksRUFBRSxFQUFFO3dCQUNSLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQzs0QkFDdkIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2xCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dDQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLDhDQUE4QyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ3hHLENBQUM7eUJBQ0osQ0FBQzt3QkFFRixhQUFhLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO3dCQUVwQywwQkFBMEI7d0JBRTFCLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFOzZCQUNoQyxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsT0FBTyxFQUFFLEVBQUU7NEJBQ1gsS0FBSyxFQUFFLEVBQUU7NEJBQ1QsWUFBWSxFQUFFLFVBQVUsR0FBRyxFQUFFLE9BQU87Z0NBQ2hDLElBQUksSUFBSSxHQUFHLE9BQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO2dDQUNyRyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDOzRCQUMxQixDQUFDOzRCQUNELFFBQVEsRUFBRSxLQUFLO3lCQUNsQixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsT0FBTzs0QkFDYixPQUFPLEVBQUUsZUFBZSxFQUFFLCtCQUErQjs0QkFDekQsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLFlBQVk7NEJBQ2xCLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCOzRCQUNqRCxLQUFLLEVBQUUsRUFBRTt5QkFDWixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSw2QkFBNkI7NEJBQ3ZELEtBQUssRUFBRSxHQUFHO3lCQUNiLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjs0QkFDdkQsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzs2QkFDRCxlQUFlLENBQUM7NEJBQ2IsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7NEJBQzdDLEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxZQUFZOzRCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjs0QkFDL0MsS0FBSyxFQUFFLEVBQUU7eUJBQ1osQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCOzRCQUMvQyxLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsS0FBSzs0QkFDWCxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUc7NEJBQ3BDLEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxLQUFLOzRCQUNYLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzs0QkFDcEMsS0FBSyxFQUFFLEVBQUU7eUJBQ1osQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHOzRCQUNwQyxLQUFLLEVBQUUsRUFBRTt5QkFDWixDQUFDOzZCQUNELGFBQWEsQ0FBQzs0QkFDWCxJQUFJLEVBQUUsS0FBSzs0QkFDWCxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUc7NEJBQ3BDLEtBQUssRUFBRSxFQUFFO3lCQUNaLENBQUM7NkJBQ0QsYUFBYSxDQUFDOzRCQUNYLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5Qjs0QkFDbkQsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzs2QkFDRCxhQUFhLENBQUM7NEJBQ1gsSUFBSSxFQUFFLFVBQVU7NEJBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCOzRCQUNsRCxLQUFLLEVBQUUsR0FBRzt5QkFDYixDQUFDOzZCQUNELGlCQUFpQixDQUFDOzRCQUNmLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjs0QkFDckQsS0FBSyxFQUFFLEdBQUc7eUJBQ2IsQ0FBQzt3QkFFTixZQUFZO3FCQUNmLENBQUMsQ0FBQztvQkFFUCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0Q7OztrQkFHRTtnQkFDUSxPQUFPO29CQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0gsUUFBUSxDQUFDLE9BQWU7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUMvRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztvQkFDekIsaUdBQWlHO29CQUNqRyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQzt5QkFDekQsT0FBTyxFQUFFO3lCQUNULElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFO3dCQUNaLFFBQVEsQ0FBQzt3QkFDVCxJQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7NEJBQUUsT0FBTzt3QkFDekIsZ0JBQWdCO3dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3hFLE9BQU87b0JBQ1gsQ0FBQyxDQUFDLENBQ0Q7Z0JBQ1QsQ0FBQzthQUNKLENBQUE7WUEvTlksZ0JBQWdCO2dCQUQ1QixVQUFVLENBQUMsUUFBUTtlQUNQLGdCQUFnQixDQStONUI7WUEvTlksMEJBQWdCLG1CQStONUIsQ0FBQTtRQUNMLENBQUMsRUF4T29CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXdPN0I7SUFBRCxDQUFDLEVBeE9nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF3T25CO0FBQUQsQ0FBQyxFQXhPUyxNQUFNLEtBQU4sTUFBTSxRQXdPZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFNlem5hbSBwb3phZGF2a3VcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB0a2FyZXNcclxuICAgICAqIEBzaW5jZSA0ODQuMS4wLjY5XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVBvemFkYXZrdSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbGFzdFR5cE1zazogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cE1hc2t5O1xyXG4gICAgICAgIC8vcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjsgICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRyaWRhIGdyaWR1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNsYXNzR3JpZDogc3RyaW5nID0gXCJqcy1ncmlkLWJhc2VcIjtcclxuICAgICAgICAvLyBuYXN0YXZlbmkgaWQgYSB0aXR1bGt1IG9rbmFcclxuICAgICAgICB0YXNrSWQ9IFwic2hvd1Nlem5hbVBvekFjdFwiO1xyXG4gICAgICAgIHRpdGxlID0gXCJqcmVzOjMxMTAwMTY1XCI7XHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEJhY2tcIiwgY2FwdGlvbjogdGhpcy50aXRsZSwgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQudHJ5Q2xvc2VBbGxDaGlsZENvbnRlbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ3N1YnRhc2tzKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IG5ldyBHQWN0aW9uKHsgbmFtZTogXCJhY3RBbGxcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDAyXCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmxvYWREYXRhKC0xKTsgfSB9KSB9LCAgLy9SQyAzMTEwMDAwMiA6IFbFoWVjaG55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IFwiYWN0UGVyc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDNcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQubG9hZERhdGEoMTApOyB9IH0pIH0sICAvL1JDIDMxMTAwMDAzIDogT3NvYm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBcImFjdFB1YmxpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDRcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQubG9hZERhdGEoMCk7IH0gfSkgfSAgIC8vUkMgMzExMDAwMDQgOiBWZcWZZWpuw6lcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJuZXdBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjEwXCIsIC8vUkMgMzExMDAyMTAgOiBOb3bDvSBwb8W+YWRhdmVrXHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbFBvemFkYXZrdUNvbnRyb2wnLCB7fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNlbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE1NlwiLCAgLy9SQyAzMTEwMDE1NiA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxQb3phZGF2a3VDb250cm9sXCIsIHsgb3B0aW9uczogeyBpeHNTZXM6IHJvdy5peHNfc2VzIH0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRlbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxMlwiLCAvL1JDIDMxMTAwMjEyIDogU21hemF0XHJcbiAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczozMDI1MDAwMlwiLmZvcm1hdChyb3cubmF6ZXYpKSAvL1JDIDMwMjUwMDAyIDogT3ByYXZkdSBjaGNldGUgc21hemF0IHZ5YnJhbsO9IHBvxb5hZGF2ZWsgKHswfSk/XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIG9iajogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICE9PSBcInllc1wiKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLlVjclBvemFkYXZlay5kZWxldGUoeyBpZGVudGlmaWthdG9yOiByb3cuaXhzX3NlcyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7IGlkOiBcImZsYXNoRGVsZXRlXCIsIGljb246IFwiZ2ktdGlja1wiLCBsYWJlbDogXCJqcmVzOjMwMjUwMDAzXCIsIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiLCB0aW1lcjogNTAwMCB9KSAgLy9SQyAzMDI1MDAwMyA6IFBvxb5hZGF2ZWsgYnlsIHZ5bWF6w6FuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLm5ld0FjdCwgZmF2b3JpdGU6IHRydWUsIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuc2VsQWN0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5kZWxBY3QsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbFBvemFkYXZrdUNvbnRyb2xcIiwgeyBvcHRpb25zOiB7IGl4c1Nlczogcm93Lml4c19zZXMgfSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCJuYXpldlwiLCBcInBvem5hbWthXCJdLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gRGVmaW5pY2Ugc2xvdXBjdVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKHJvdywgbWV0YXJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpY29uID0gbWV0YXJvdyEuZGF0YS5peHNfZnVuID09PSBHb3JkaWMuVWNyLkdsb2JhbHMuR1Vjckdsb2JhbHMuaXhzX2Z1biA/IFwiZ2ktdXNlclwiIDogXCJnaS1ncm91cFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGljb246IGljb24gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDA2XCIsIC8vUkMgMzExMDAwMDYgOiBOw6F6ZXYgcG/FvmFkYXZrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX3Nlc19hbHZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAwN1wiLCAvL1JDIDMxMTAwMDA3IDogU2VzdGF2YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDc1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfYWx2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDhcIiwgLy9SQyAzMTEwMDAwOCA6IE7DoXpldiBzZXN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfZnJtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMDlcIiwgLy9SQyAzMTEwMDAwOSA6IE7DoXpldiBmb3Jtw6F0dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTBcIiwgLy9SQyAzMTEwMDAxMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNfY29tcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDExXCIsIC8vUkMgMzExMDAwMTEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogODBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtc2tfbmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxMlwiLCAvL1JDIDMxMTAwMDEyIDogTWFza2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5VY3IuR2xvYmFscy5HWmtyLkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLlVjci5HbG9iYWxzLkdaa3IuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuVWNyLkdsb2JhbHMuR1prci5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5VY3IuR2xvYmFscy5HWmtyLk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNuc19uYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDEzXCIsIC8vUkMgMzExMDAwMTMgOiBTZXNrdXBlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNFwiLCAvL1JDIDMxMTAwMDE0IDogUG96bsOhbWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE1XCIsIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBOYWN0ZW5pIGRhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxvYWREYXRhKHR5cE1hc2s/Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB0eXBNc2sgPSB0eXBNYXNrID09PSB1bmRlZmluZWQgPyB0aGlzLmxhc3RUeXBNc2sgOiB0eXBNYXNrO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RUeXBNc2sgPSB0eXBNc2s7XHJcbiAgICAgICAgICAgIC8vdmFyIHZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3KEdvcmRpYy5Jc2wuVWNyUG96YWRhdmVrLmxpc3QoeyBmaWx0ZXJzOiB7IGl4c19zZXM6IHR5cE1zayB9IH0pKTtcclxuICAgICAgICAgICAgR29yZGljLklzbC5VY3JQb3phZGF2ZWsubGlzdCh7IGZpbHRlcnM6IHsgdHlwX21zazogdHlwTXNrIH0gfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQhLmFjdGlvbnNbXCJzZWxBY3RcIl0hLmVuYWJsZWQocmVzdWx0Lmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kYXRhID0gcjtcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCBuZXcgR29yZGljLkRhdGEuVmlldyhyZXN1bHQsIHsga2V5OiBcIml4c19zZXNcIiB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=