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
            var gcontent = Decorators.gcontent;
            let GHistorieUkazatele = class GHistorieUkazatele extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /**
                     grid
                     */
                    //private grid: JQuery<HTMLElement>;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                }
                /**
                 * Okno pro historii a poznamky
                 * */
                //public data: Gordic.Inu.Interface.GNeprouctovaneDokladuDto[];
                prepareContent(vstup) {
                    var that = this;
                    that.vstup = vstup;
                    // definice gridu
                    $.newDiv(this.classGrid)
                        .css("height", "100%")
                        .appendTo(this.element)
                        .gautofit()
                        //.gtab({
                        //    title: "ROZ", opened: true, locked: true,
                        //})
                        .ggrid({
                        columnMode: "full",
                        data: vstup.data, //[{ agenda: "UCT", doklad: "dsd" }],
                        //showHeaderRow:false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                //that.ZobrazDetail(ctx.cellInfo.data as any);
                                /*
                                var row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                                GDlg.showWindow("Gordic.Uct.WebClient.GUctDetail", { Ixp: row.ixp }, "", 800, 600, true); //zobrazeni dalsiho detailu
                                */
                            }
                        }),
                        columns: new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "text",
                            caption: "jres:30250187", //RC 30250187 : Text
                            width: 500
                        })
                            .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:30250188", //RC 30250188 : Datum změny
                            width: 120
                        })
                            .addTextColumn({
                            name: "nazev_rf",
                            caption: "jres:30250189", //RC 30250189 : Změnu provedl
                            width: 120
                        })
                    });
                    that.definceAkci();
                    that.commandBar([
                        { action: that.actions.actZavrit },
                    ]);
                    if (that.vstup.notes)
                        that.menuBar([
                            { action: that.actions.actNovaPoznamka, favorite: true }
                        ]);
                    debugger;
                }
                /**
                 * Definice akci
                 * @param that
                 */
                definceAkci() {
                    let that = this;
                    that.actions.addRange({
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
                        actNovaPoznamka: Gordic.Eko.Action.actionNovy({
                            visible: that.vstup.notes,
                            enabled: true, caption: "jres:30250198", //RC 30250198 : Nová poznámka
                            run: function () {
                                that.novaPoznamka();
                            }
                        }),
                        //actNovaPoznamka: {
                        //    name: "actNovaPoznamka",
                        //    icon: "gi-list",
                        //    enabled: false,
                        //    caption: "jres:30250163", //RC 30250163 : Editovat
                        //    run: function (ev, ctx) {
                        //        var row = that.$grid.ggrid("activeRow");
                        //        //that.showUkazatel(row);
                        //        //return;
                        //        if (row === null)
                        //            return
                        //        //that.$grid.ggrid("activeCellAddress");
                        //        ////var column = that.$grid.ggrid("activeCellAddress").col;
                        //        that.showUkazatel(row);
                        //    }
                        //}
                    });
                }
                /**
                 * Nova poznamka
                 * */
                novaPoznamka() {
                    var that = this;
                    Gordic.Eko.WebClient.Common.ZadaniTextu(that, "jres:30250195" //RC 30250195 : Zadejte poznámku
                    , "jres:30250196") //RC 30250196 : Poznámka
                        .then((text) => {
                        if (text != null) {
                            that.beginOperation("jres:30250194"); //RC 30250194 : Probíhá ukládání
                            return that.isl.Ukazatel.addNote({
                                row: that.vstup.row,
                                note: text
                            })
                                .get()
                                .then((result) => {
                                that.endOperation();
                                //that.showFlash({ label: "jres:30250197", state: "success",  /*icon: "gi-tick",*/ customClass: "g-state-success", timer: 5000 }); //RC 30250197 : Poznámka přidána
                                that.reload();
                                return;
                            }, (jqXHR, type, obj) => {
                                //debugger;
                                that.endOperation();
                            }).always(() => { that.endOperation(); });
                            ;
                        }
                    });
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
                 * Znovunacteni
                 *
                 * */
                reload() {
                    var that = this;
                    that.beginOperation("jres:30250191"); //RC 30250191 : Probíhá načítání
                    that.isl.Ukazatel.listPoznamky({
                        ixsEvp: that.vstup.row.ixs_evp
                    })
                        .getData()
                        .then((result) => {
                        that.vstup.data = result;
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("setData", result);
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        that.endOperation();
                    }).always(() => { that.endOperation(); });
                }
            };
            GHistorieUkazatele = __decorate([
                gcontent
            ], GHistorieUkazatele);
            WebClient.GHistorieUkazatele = GHistorieUkazatele;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0hpc3RvcmllVWthemF0ZWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0hpc3RvcmllVWthemF0ZWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0F5TGY7QUF6TEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeUxuQjtJQXpMZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBeUw3QjtRQXpMb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxPQUFBLFlBQVk7Z0JBQXBEOztvQkFNSTs7dUJBRUc7b0JBQ0gsb0NBQW9DO29CQUNwQzs7dUJBRUc7b0JBQ08sY0FBUyxHQUFXLGNBQWMsQ0FBQztnQkF3S2pELENBQUM7Z0JBdktHOztxQkFFSztnQkFDTCwrREFBK0Q7Z0JBQy9ELGNBQWMsQ0FBQyxLQUFxSDtvQkFDaEksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFFbkIsaUJBQWlCO29CQUNqQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7eUJBQ25CLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDdEIsUUFBUSxFQUFFO3dCQUNYLFNBQVM7d0JBQ1QsK0NBQStDO3dCQUMvQyxJQUFJO3lCQUNILEtBQUssQ0FBQzt3QkFDSCxVQUFVLEVBQUUsTUFBTTt3QkFDbEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUMscUNBQXFDO3dCQUN0RCxzQkFBc0I7d0JBQ3RCLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQzs0QkFDdkIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsR0FBRyxFQUFFLFVBQVUs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O3lCQUNHLE9BQU8sRUFBRTt5QkFDVCxJQUFJLENBQ0QsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7d0JBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTs0QkFBRSxPQUFPO3dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFFbEMsQ0FBQyxFQUlELENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTt3QkFDakIsV0FBVzt3QkFDWCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3hCLENBQUMsQ0FDSixDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsQ0FBQzthQUNKLENBQUE7WUFyTFksa0JBQWtCO2dCQUQ5QixRQUFRO2VBQ0ksa0JBQWtCLENBcUw5QjtZQXJMWSw0QkFBa0IscUJBcUw5QixDQUFBO1FBQ0wsQ0FBQyxFQXpMb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeUw3QjtJQUFELENBQUMsRUF6TGdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlMbkI7QUFBRCxDQUFDLEVBekxTLE1BQU0sS0FBTixNQUFNLFFBeUxmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHSGlzdG9yaWVVa2F6YXRlbGUgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NsaWVudENvbnRlbnQge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICBUcnVlIC0gb2tubyBwcm8gcG96bmFta3lcclxuICAgICAgICAgKi9cclxuICAgICAgICAvL3ByaXZhdGUgbm90ZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIHZzdHVwOiB7IHJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb2F1a2FEdG8sIGRhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JVa2F6YXRlbEhpc3RvcnlEdG9bXSwgbm90ZXM6IGJvb2xlYW4gfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgZ3JpZCBcclxuICAgICAgICAgKi9cclxuICAgICAgICAvL3ByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0cmlkYSBncmlkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjbGFzc0dyaWQ6IHN0cmluZyA9IFwianMtZ3JpZC1iYXNlXCI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2tubyBwcm8gaGlzdG9yaWkgYSBwb3puYW1reVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgLy9wdWJsaWMgZGF0YTogR29yZGljLkludS5JbnRlcmZhY2UuR05lcHJvdWN0b3ZhbmVEb2tsYWR1RHRvW107XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQodnN0dXA6IHsgcm93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRWtvYXVrYUR0bywgZGF0YTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclVrYXphdGVsSGlzdG9yeUR0b1tdLCBub3RlczogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC52c3R1cCA9IHZzdHVwO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgZ3JpZHVcclxuICAgICAgICAgICAgJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpXHJcbiAgICAgICAgICAgICAgICAvLy5ndGFiKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRpdGxlOiBcIlJPWlwiLCBvcGVuZWQ6IHRydWUsIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdnN0dXAuZGF0YSwvL1t7IGFnZW5kYTogXCJVQ1RcIiwgZG9rbGFkOiBcImRzZFwiIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2hvd0hlYWRlclJvdzpmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5ab2JyYXpEZXRhaWwoY3R4LmNlbGxJbmZvLmRhdGEgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7ICAgIC8vZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdEbGcuc2hvd1dpbmRvdyhcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3REZXRhaWxcIiwgeyBJeHA6IHJvdy5peHAgfSwgXCJcIiwgODAwLCA2MDAsIHRydWUpOyAvL3pvYnJhemVuaSBkYWxzaWhvIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVWthemF0ZWxIaXN0b3J5RHRvPigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg3XCIsIC8vUkMgMzAyNTAxODcgOiBUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg4XCIsIC8vUkMgMzAyNTAxODggOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9yZlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg5XCIsIC8vUkMgMzAyNTAxODkgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kZWZpbmNlQWtjaSgpO1xyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXZyaXQgfSxcclxuXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBpZiAodGhhdC52c3R1cC5ub3RlcylcclxuICAgICAgICAgICAgICAgIHRoYXQubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3ROb3ZhUG96bmFta2EsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgYWtjaVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmNlQWtjaSgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0WmF2cml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25aYXZyaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92YVBvem5hbWthOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Ob3Z5KHtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGF0LnZzdHVwLm5vdGVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIGNhcHRpb246XCJqcmVzOjMwMjUwMTk4XCIsIC8vUkMgMzAyNTAxOTggOiBOb3bDoSBwb3puw6Fta2FcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ub3ZhUG96bmFta2EoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vYWN0Tm92YVBvem5hbWthOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImFjdE5vdmFQb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMDI1MDE2M1wiLCAvL1JDIDMwMjUwMTYzIDogRWRpdG92YXRcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2YXIgcm93ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3RoYXQuc2hvd1VrYXphdGVsKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKHJvdyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy90aGF0LiRncmlkLmdncmlkKFwiYWN0aXZlQ2VsbEFkZHJlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8vL3ZhciBjb2x1bW4gPSB0aGF0LiRncmlkLmdncmlkKFwiYWN0aXZlQ2VsbEFkZHJlc3NcIikuY29sO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuc2hvd1VrYXphdGVsKHJvdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTm92YSBwb3puYW1rYVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBub3ZhUG96bmFta2EoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlphZGFuaVRleHR1KHRoYXQsIFwianJlczozMDI1MDE5NVwiIC8vUkMgMzAyNTAxOTUgOiBaYWRlanRlIHBvem7DoW1rdVxyXG4gICAgICAgICAgICAgICAgLCBcImpyZXM6MzAyNTAxOTZcIikgLy9SQyAzMDI1MDE5NiA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHRleHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMTk0XCIpOyAvL1JDIDMwMjUwMTk0IDogUHJvYsOtaMOhIHVrbMOhZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5Va2F6YXRlbC5hZGROb3RlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogdGhhdC52c3R1cC5yb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RlOiB0ZXh0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDE5N1wiLCBzdGF0ZTogXCJzdWNjZXNzXCIsICAvKmljb246IFwiZ2ktdGlja1wiLCovIGN1c3RvbUNsYXNzOiBcImctc3RhdGUtc3VjY2Vzc1wiLCB0aW1lcjogNTAwMCB9KTsgLy9SQyAzMDI1MDE5NyA6IFBvem7DoW1rYSBwxZlpZMOhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoanFYSFIsIHR5cGUsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLlwiICsgdGhpcy5jbGFzc0dyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWxvYWQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTAxOTFcIik7IC8vUkMgMzAyNTAxOTEgOiBQcm9iw61ow6EgbmHEjcOtdMOhbsOtXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlVrYXphdGVsLmxpc3RQb3puYW1reSh7XHJcbiAgICAgICAgICAgICAgICBpeHNFdnA6IHRoYXQudnN0dXAucm93Lml4c19ldnAgYXMgc3RyaW5nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnN0dXAuZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwic2V0RGF0YVwiLCByZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgKGpxWEhSLCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLmFsd2F5cygoKSA9PiB7IHRoYXQuZW5kT3BlcmF0aW9uKCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==