"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            let GUctHledaniDokladu = class GUctHledaniDokladu extends Gordic.GContentBase {
                onContentReady() {
                    debugger;
                    var that = this;
                    that.title = "jres:30250406"; //RC 30250406 : Hledání dokladu
                    this.setBreadcrumbs([{ caption: this.title, action: new GAction({ name: "actBack", run: () => { this.tryCloseAllChildContents(); } }) }]);
                    var headerForm = new Gordic.Forms.Form({ name: "UctHledaniDokladuForm" })
                        .addSection("jres:30250399") //RC 30250399 : Výběrové podmínky
                        .addRow("jres:30250026") //RC 30250026 : Identifikátor
                        .addField("gstringbox", {
                        name: "ixp"
                    })
                        .addRow("jres:30250588") //RC 30250588 : Evidenční číslo
                        .addField("gstringbox", {
                        name: "ac"
                    })
                        .addRow("jres:30250861") //RC 30250861 : Agendové číslo
                        .addField("gstringbox", {
                        name: "ac_ag"
                    })
                        .addSection("jres:30250402"); //RC 30250402 : Výsledky vyhledávání
                    var tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    this.grid = $("<div class='js-Grid'>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: [], // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        multi: false,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                that.ZobrazDetail( /*ctx.cellInfo.data*/);
                            }
                        }),
                        selection: function (ev, ctx) {
                            that.enabledAction( /*ctx.getSelection*/);
                        },
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                    that.actions.addRange({
                        actVyhledat: {
                            caption: "jres:30250403", //RC 30250403 : Vyhledat
                            icon: "gi-magglass",
                            run: function (ev, ctx) {
                                that.vyhledat();
                            }
                        },
                        actVycistit: {
                            caption: "jres:30250404", //RC 30250404 : Vyčistit
                            icon: "gi-window-close",
                            run: function (ev, ctx) {
                                that.vycistit();
                            }
                        },
                        actZobazitDetail: {
                            caption: "jres:30250171", //RC 30250171 : Detail
                            icon: "gi-detail",
                            enabled: false,
                            run: function (ev, ctx) {
                                that.ZobrazDetail();
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actVyhledat, favorite: true },
                        { action: this.actions.actVycistit, favorite: true },
                        { action: this.actions.actZobazitDetail, favorite: true }
                    ]);
                }
                /**
                 * Povoleni akce zobrazit doklad
                 *
                 * */
                enabledAction() {
                    let result = false;
                    var row = Gordic.Eko.Grid.currentRow(this.GetGrid());
                    if (row != null)
                        result = row.typ_ag == 40 && row.rok == this.Globals.EkoParams.Rok;
                    this.actions.actZobazitDetail.update({
                        enabled: result
                    });
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addTextColumn({ name: "ixp", caption: "jres:30250026" }); //RC 30250026 : Identifikátor
                    gridFormat.addTextColumn({ name: "zkr_ag", caption: "jres:30250100" }); //RC 30250100 : Agenda
                    gridFormat.addTextColumn({ name: "kniha", caption: "jres:30250321" }); //RC 30250321 : Kniha
                    gridFormat.addNumberColumn({ name: "rok", caption: "jres:30250187" }); //RC 30250187 : Rok
                    gridFormat.addTextColumn({ name: "ac", caption: "jres:30250669" }); //RC 30250669 : Agendové číslo
                    gridFormat.addTextColumn({ name: "ixs_typ_txt", caption: "jres:30250093" }); //RC 30250093 : Typ dokladu
                    //gridFormat.addTextColumn({ name: "nazev", caption: "jres:31302013" }); //RC 31302013 : Popis
                    gridFormat.addTextColumn({ name: "ixs_fun_akt_txt", caption: "jres:30250670" }); //RC 30250670 : Vlastník
                    return gridFormat;
                }
                vyhledat() {
                    var ixp = this.element.findForms("UctHledaniDokladuForm").findFields("ixp").gfield("getValue");
                    var ac = this.element.findForms("UctHledaniDokladuForm").findFields("ac").gfield("getValue");
                    var ac_ag = this.element.findForms("UctHledaniDokladuForm").findFields("ac_ag").gfield("getValue");
                    var that = this;
                    //Gordic.Isl.UctDoklad.findDocuments({ ixp: ixp, ac: ac, ac_ag: ac_ag })
                    //    . get()
                    //    .done(function (result) {
                    //        debugger;
                    //        var view = new Gordic.Data.View(result);
                    //        that.grid.ggrid("setData", view, true);
                    //        if (result.length === 0) {
                    //            that.showFlash({ label: "jres:30250405", timer: 3000, customClass: "g-state-warning" }) //RC 30250405 : Dle zadaného kritéria doklad nenalezen
                    //            that.actions.actZobazitDetail!.update({
                    //                enabled: false,
                    //            });
                    //        }
                    //        else {
                    //            that.enabledAction();
                    //        }
                    //        //def.resolve(radek);
                    //    })
                    //    .always(function () {
                    //     //   content.endOperation();
                    //    })
                    //    ;
                }
                vycistit() {
                    this.element.findForms("UctHledaniDokladuForm").findFields("ixp").gfield("clear");
                    this.element.findForms("UctHledaniDokladuForm").findFields("ac").gfield("clear");
                    this.element.findForms("UctHledaniDokladuForm").findFields("ac_ag").gfield("clear");
                }
                /**
                 * Zobrazeni okna dle aktualniho radku
                 * @param content
                 * @param row
                 */
                ZobrazDetail() {
                    var row = Gordic.Eko.Grid.currentRow(this.GetGrid());
                    if (row != null) {
                        if (row.typ_ag != 40) {
                            this.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                            "jres:30250407"); //RC 30250407 : Doklad z jiné agendy
                        }
                        if (this.Globals.EkoParams.Rok != row.rok) {
                            this.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                            "jres:30250408"); //RC 30250408 : Doklad není z aktualního období
                        }
                        Gordic.Uct.WebClient.ZobrazDetailDleIXP({ content: this, ixp: row.ixp, samostaneOkno: false, editace: false, polozky: false });
                        //Gordic.Uct.WebClient.ZobrazDetailDleIXPOld(this, row.ixp as any, false, false);
                    }
                    else
                        this.dialogs.messageBox("jres:30250035", //RC 30250035 : Upozornění
                        "jres:30250034"); //RC 30250034 : Není vybrán žádný řádek!
                }
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                 */
                GetGrid() {
                    return $(".js-Grid");
                }
            };
            GUctHledaniDokladu = __decorate([
                Decorators.gcontent
            ], GUctHledaniDokladu);
            WebClient.GUctHledaniDokladu = GUctHledaniDokladu;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdEhsZWRhbmlEb2tsYWR1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1VjdEhsZWRhbmlEb2tsYWR1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0E0TWY7QUE1TUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNE1uQjtJQTVNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNE03QjtRQTVNb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxZQUFZO2dCQU9oRCxjQUFjO29CQUVWLFFBQVEsQ0FBQztvQkFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsK0JBQStCO29CQUU3RCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzFJLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQzt5QkFDcEUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGlDQUFpQzt5QkFDN0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDZCQUE2Qjt5QkFDckQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsK0JBQStCO3lCQUN2RCxRQUFRLENBQUMsWUFBWSxFQUFF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QUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7d0JBQy9ILGlGQUFpRjtvQkFDckYsQ0FBQzs7d0JBRUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLDBCQUEwQjt3QkFDL0QsZUFBZSxDQUFDLENBQUMsQ0FBRSx3Q0FBd0M7Z0JBQ3ZFLENBQUM7Z0JBQ0Q7Ozs7bUJBSUc7Z0JBQ0gsT0FBTztvQkFDSCxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsQ0FBQzthQUNKLENBQUE7WUF2TVksa0JBQWtCO2dCQUQ5QixVQUFVLENBQUMsUUFBUTtlQUNQLGtCQUFrQixDQXVNOUI7WUF2TVksNEJBQWtCLHFCQXVNOUIsQ0FBQTtRQUVMLENBQUMsRUE1TW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTRNN0I7SUFBRCxDQUFDLEVBNU1nQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0TW5CO0FBQUQsQ0FBQyxFQTVNUyxNQUFNLEtBQU4sTUFBTSxRQTRNZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWN0LldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHVWN0SGxlZGFuaURva2xhZHUgZXh0ZW5kcyBHQ29udGVudEJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIC8vIEdsb2JhbG5pIG5hc3RhdmVuaSAtIHBhcmFtZXRyeSwgZWtvLC4uXHJcbiAgICAgICAgcHVibGljIEdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RHbG9iYWxEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6dm9pZCB7XHJcblxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC50aXRsZSA9IFwianJlczozMDI1MDQwNlwiOyAvL1JDIDMwMjUwNDA2IDogSGxlZMOhbsOtIGRva2xhZHVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QnJlYWRjcnVtYnMoW3sgY2FwdGlvbjogdGhpcy50aXRsZSwgYWN0aW9uOiBuZXcgR0FjdGlvbih7IG5hbWU6IFwiYWN0QmFja1wiLCBydW46ICgpID0+IHsgdGhpcy50cnlDbG9zZUFsbENoaWxkQ29udGVudHMoKTsgfSB9KSB9XSk7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJVY3RIbGVkYW5pRG9rbGFkdUZvcm1cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMwMjUwMzk5XCIpIC8vUkMgMzAyNTAzOTkgOiBWw71ixJtyb3bDqSBwb2Rtw61ua3lcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDI2XCIpIC8vUkMgMzAyNTAwMjYgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNTg4XCIpIC8vUkMgMzAyNTA1ODggOiBFdmlkZW7EjW7DrSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDg2MVwiKSAvL1JDIDMwMjUwODYxIDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfYWdcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzAyNTA0MDJcIik7Ly9SQyAzMDI1MDQwMiA6IFbDvXNsZWRreSB2eWhsZWTDoXbDoW7DrVxyXG5cclxuICAgICAgICAgICAgdmFyIHRhYiA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBoZWFkZXJGb3JtKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZCA9ICQoXCI8ZGl2IGNsYXNzPSdqcy1HcmlkJz5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogW10sICAvLyB0aGlzLm1vZGVsUG9sb3preVswXSAgIC8vemF0aW0gbmVtYW0gemFkbmEgZGF0YSwgbmFzdGF2aW0gcHJhemRuZSBwb2xlLiBWIG1vbWVudGUgbmFjdGVuaSBqZSBuYXN0YXZpbSBwcmVzIG9wdGlvbnMgKG1ldG9kYSBsb2FkSnNHcmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLCAgICAgLy8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmaXRcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uTW9kZTogXCJyb3dcIiwgIC8vIHJvdywgY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOmZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKCAvKmN0eC5jZWxsSW5mby5kYXRhKi8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVkQWN0aW9uKC8qY3R4LmdldFNlbGVjdGlvbiovKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2Nyb2xsSGVscGVyVGVtcGxhdGU6IFwie2FjfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICBzZWFyY2hDb2x1bW5zOiBbXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2Uoe1xyXG4gICAgICAgICAgICAgICAgYWN0VnlobGVkYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MDNcIiwgLy9SQyAzMDI1MDQwMyA6IFZ5aGxlZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1tYWdnbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eWhsZWRhdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RWeWNpc3RpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQwNFwiLCAvL1JDIDMwMjUwNDA0IDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnljaXN0aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Wm9iYXppdERldGFpbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE3MVwiLCAvL1JDIDMwMjUwMTcxIDogRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuWm9icmF6RGV0YWlsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFZ5aGxlZGF0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RWeWNpc3RpdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Wm9iYXppdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQb3ZvbGVuaSBha2NlIHpvYnJheml0IGRva2xhZCBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlZEFjdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkVrby5JbnRlcmZhY2UuR1dmbHNwaWRTaW1wbGVEdG8+KHRoaXMuR2V0R3JpZCgpKTtcclxuICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcm93LnR5cF9hZyA9PSA0MCAmJiByb3cucm9rID09IHRoaXMuR2xvYmFscy5Fa29QYXJhbXMhLlJvaztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3Rab2Jheml0RGV0YWlsIS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcmVzdWx0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMDI1MDAyNlwiIH0pOyAvL1JDIDMwMjUwMDI2IDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ6a3JfYWdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTAwXCIgfSk7IC8vUkMgMzAyNTAxMDAgOiBBZ2VuZGFcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJrbmloYVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzMjFcIiB9KTsgLy9SQyAzMDI1MDMyMSA6IEtuaWhhXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJyb2tcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg3XCIgfSk7Ly9SQyAzMDI1MDE4NyA6IFJva1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImFjXCIsIGNhcHRpb246IFwianJlczozMDI1MDY2OVwiIH0pOyAgLy9SQyAzMDI1MDY2OSA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX3R5cF90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkzXCIgfSk7ICAgLy9SQyAzMDI1MDA5MyA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgIC8vZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJuYXpldlwiLCBjYXB0aW9uOiBcImpyZXM6MzEzMDIwMTNcIiB9KTsgLy9SQyAzMTMwMjAxMyA6IFBvcGlzXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2Z1bl9ha3RfdHh0XCIsIGNhcHRpb246IFwianJlczozMDI1MDY3MFwiIH0pOyAvL1JDIDMwMjUwNjcwIDogVmxhc3Ruw61rXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2eWhsZWRhdCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpeHAgPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHZhciBhYyA9IHRoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJVY3RIbGVkYW5pRG9rbGFkdUZvcm1cIikuZmluZEZpZWxkcyhcImFjXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgYWNfYWcgPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJhY19hZ1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL0dvcmRpYy5Jc2wuVWN0RG9rbGFkLmZpbmREb2N1bWVudHMoeyBpeHA6IGl4cCwgYWM6IGFjLCBhY19hZzogYWNfYWcgfSlcclxuICAgICAgICAgICAgLy8gICAgLiBnZXQoKVxyXG4gICAgICAgICAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy8gICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcocmVzdWx0KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDQwNVwiLCB0aW1lcjogMzAwMCwgY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS13YXJuaW5nXCIgfSkgLy9SQyAzMDI1MDQwNSA6IERsZSB6YWRhbsOpaG8ga3JpdMOpcmlhIGRva2xhZCBuZW5hbGV6ZW5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Wm9iYXppdERldGFpbCEudXBkYXRlKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmVuYWJsZWRBY3Rpb24oKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIC8vZGVmLnJlc29sdmUocmFkZWspO1xyXG4gICAgICAgICAgICAvLyAgICB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vICAgY29udGVudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy8gICAgO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2eWNpc3RpdCgpOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJVY3RIbGVkYW5pRG9rbGFkdUZvcm1cIikuZmluZEZpZWxkcyhcImFjXCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJhY19hZ1wiKS5nZmllbGQoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIG9rbmEgZGxlIGFrdHVhbG5paG8gcmFka3VcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBab2JyYXpEZXRhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRWtvLkludGVyZmFjZS5HV2Zsc3BpZFNpbXBsZUR0bz4odGhpcy5HZXRHcmlkKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93LnR5cF9hZyAhPSA0MCApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAwMzVcIiwgLy9SQyAzMDI1MDAzNSA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTA0MDdcIik7ICAvL1JDIDMwMjUwNDA3IDogRG9rbGFkIHogamluw6kgYWdlbmR5XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2xvYmFscy5Fa29QYXJhbXMhLlJvayAhPSByb3cucm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMDM1XCIsIC8vUkMgMzAyNTAwMzUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwNDA4XCIpOyAgLy9SQyAzMDI1MDQwOCA6IERva2xhZCBuZW7DrSB6IGFrdHVhbG7DrWhvIG9iZG9iw61cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFAoeyBjb250ZW50OiB0aGlzLCBpeHA6IHJvdy5peHAhLCBzYW1vc3RhbmVPa25vOiBmYWxzZSwgZWRpdGFjZTogZmFsc2UsIHBvbG96a3k6ZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0dvcmRpYy5VY3QuV2ViQ2xpZW50LlpvYnJhekRldGFpbERsZUlYUE9sZCh0aGlzLCByb3cuaXhwIGFzIGFueSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAwMzVcIiwgLy9SQyAzMDI1MDAzNSA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDAzNFwiKTsgIC8vUkMgMzAyNTAwMzQgOiBOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IMWZw6FkZWshXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBHZXRHcmlkKCk6IEpRdWVyeTxIVE1MRWxlbWVudD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gJChcIi5qcy1HcmlkXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=