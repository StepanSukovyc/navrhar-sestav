"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            let GRozHledaniDokladu = class GRozHledaniDokladu extends Gordic.GContentBase {
                onContentReady() {
                    debugger;
                    var that = this;
                    that.title = "jres:30250095"; //RC 30250095 : Hledání dokladu
                    this.setBreadcrumbs([{ caption: this.title, action: new GAction({ name: "actBack", run: () => { this.tryCloseAllChildContents(); } }) }]);
                    var headerForm = new Gordic.Forms.Form({ name: "UctHledaniDokladuForm" })
                        .addSection("jres:30250097") //RC 30250097 : Výběrové podmínky
                        .addRow("jres:30650012") //RC 30650012 : Identifikátor
                        .addField("gstringbox", {
                        name: "ixp"
                    })
                        .addRow("jres:30150010") //RC 30150010 : Evidenční číslo
                        .addField("gstringbox", {
                        name: "ac"
                    })
                        .addRow("jres:30150011") //RC 30150011 : Agendové číslo
                        .addField("gstringbox", {
                        name: "ac_ag"
                    })
                        .addSection("jres:30250098"); //RC 30250098 : Výsledky vyhledávání
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
                            caption: "jres:30250099", //RC 30250099 : Vyhledat
                            icon: "gi-magglass",
                            run: function (ev, ctx) {
                                that.vyhledat();
                            }
                        },
                        actVycistit: {
                            caption: "jres:30250100", //RC 30250100 : Vyčistit
                            icon: "gi-window-close",
                            run: function (ev, ctx) {
                                that.vycistit();
                            }
                        },
                        actZobazitDetail: {
                            caption: "jres:30150040", //RC 30150040 : Detail
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
                    gridFormat.addTextColumn({ name: "ixp", caption: "jres:30650012" }); //RC 30650012 : Identifikátor
                    gridFormat.addTextColumn({ name: "zkr_ag", caption: "jres:30250101" }); //RC 30250101 : Agenda
                    gridFormat.addTextColumn({ name: "kniha", caption: "jres:30150005" }); //RC 30150005 : Kniha
                    gridFormat.addNumberColumn({ name: "rok", caption: "jres:30150030" }); //RC 30150030 : Rok
                    gridFormat.addTextColumn({ name: "ac", caption: "jres:30150011" }); //RC 30150011 : Agendové číslo
                    gridFormat.addTextColumn({ name: "ixs_typ_txt", caption: "jres:30150050" }); //RC 30150050 : Typ dokladu
                    //gridFormat.addTextColumn({ name: "nazev", caption: "jres:30150037" }); //RC 30150037 : Popis
                    gridFormat.addTextColumn({ name: "ixs_fun_akt_txt", caption: "jres:30150025" }); //RC 30150025 : Vlastník
                    return gridFormat;
                }
                vyhledat() {
                    var ixp = this.element.findForms("UctHledaniDokladuForm").findFields("ixp").gfield("getValue");
                    var ac = this.element.findForms("UctHledaniDokladuForm").findFields("ac").gfield("getValue");
                    var ac_ag = this.element.findForms("UctHledaniDokladuForm").findFields("ac_ag").gfield("getValue");
                    var that = this;
                    Gordic.Isl.UctDoklad.findDocuments({ ixp: ixp, ac: ac, ac_ag: ac_ag })
                        .get()
                        .done(function (result) {
                        debugger;
                        var view = new Gordic.Data.View(result);
                        that.grid.ggrid("setData", view, true);
                        if (result.length === 0) {
                            that.showFlash({ label: "jres:30250102", timer: 3000, customClass: "g-state-warning" }); //RC 30250102 : Dle zadaného kritéria doklad nenalezen
                            that.actions.actZobazitDetail.update({
                                enabled: false,
                            });
                        }
                        else {
                            that.enabledAction();
                        }
                        //def.resolve(radek);
                    })
                        .always(function () {
                        //   content.endOperation();
                    });
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
                            this.dialogs.messageBox("jres:30250067", //RC 30250067 : Upozornění
                            "jres:30250103"); //RC 30250103 : Doklad z jiné agendy
                        }
                        if (this.Globals.EkoParams.Rok != row.rok) {
                            this.dialogs.messageBox("jres:30250067", //RC 30250067 : Upozornění
                            "jres:30250104"); //RC 30250104 : Doklad není z aktualního období
                        }
                        Gordic.Roz.WebClient.ZobrazDetailDleIXP(this, row.ixp, row.dat_zmena, false, false);
                    }
                    else
                        this.dialogs.messageBox("jres:30250067", //RC 30250067 : Upozornění
                        "jres:30250105"); //RC 30250105 : Není vybrán žádný řádek!
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
            GRozHledaniDokladu = __decorate([
                Decorators.gcontent
            ], GRozHledaniDokladu);
            WebClient.GRozHledaniDokladu = GRozHledaniDokladu;
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1JvekhsZWRhbmlEb2tsYWR1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1JvekhsZWRhbmlEb2tsYWR1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EyTWY7QUEzTUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMk1uQjtJQTNNZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMk03QjtRQTNNb0IsV0FBQSxTQUFTO1lBRzFCLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsT0FBQSxZQUFZO2dCQU9oRCxjQUFjO29CQUVWLFFBQVEsQ0FBQztvQkFDVCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsK0JBQStCO29CQUU3RCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzFJLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQzt5QkFDcEUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGlDQUFpQzt5QkFDN0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLDZCQUE2Qjt5QkFDckQsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDcEIsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsQ0FBQzt5QkFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsK0JBQStCO3lCQUN2RCxRQUFRLENBQUMsWUFBWSxFQUFF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Iiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Sb3ouV2ViQ2xpZW50IHtcclxuXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdSb3pIbGVkYW5pRG9rbGFkdSBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLy8gR2xvYmFsbmkgbmFzdGF2ZW5pIC0gcGFyYW1ldHJ5LCBla28sLi5cclxuICAgICAgICBwdWJsaWMgR2xvYmFsczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Jvekdsb2JhbHNEdG87XHJcblxyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQudGl0bGUgPSBcImpyZXM6MzAyNTAwOTVcIjsgLy9SQyAzMDI1MDA5NSA6IEhsZWTDoW7DrSBkb2tsYWR1XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsIGFjdGlvbjogbmV3IEdBY3Rpb24oeyBuYW1lOiBcImFjdEJhY2tcIiwgcnVuOiAoKSA9PiB7IHRoaXMudHJ5Q2xvc2VBbGxDaGlsZENvbnRlbnRzKCk7IH0gfSkgfV0pO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMDI1MDA5N1wiKSAvL1JDIDMwMjUwMDk3IDogVsO9YsSbcm92w6kgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDY1MDAxMlwiKSAvL1JDIDMwNjUwMDEyIDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDE1MDAxMFwiKSAvL1JDIDMwMTUwMDEwIDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAxNTAwMTFcIikgLy9SQyAzMDE1MDAxMSA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2FnXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMwMjUwMDk4XCIpOy8vUkMgMzAyNTAwOTggOiBWw71zbGVka3kgdnlobGVkw6F2w6Fuw61cclxuXHJcbiAgICAgICAgICAgIHZhciB0YWIgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmdyaWQgPSAkKFwiPGRpdiBjbGFzcz0nanMtR3JpZCc+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLCAgLy8gdGhpcy5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgLy9vYnNsdXpuYSBha2NlLCBrdGVyYSBzZSBzcG91c3RpIGRibCBjbGlja2VtIG5hZCByYWRrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ab2JyYXpEZXRhaWwoIC8qY3R4LmNlbGxJbmZvLmRhdGEqLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlZEFjdGlvbigvKmN0eC5nZXRTZWxlY3Rpb24qLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL3Njcm9sbEhlbHBlclRlbXBsYXRlOiBcInthY31cIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgc2VhcmNoQ29sdW1uczogW1wiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFZ5aGxlZGF0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDk5XCIsIC8vUkMgMzAyNTAwOTkgOiBWeWhsZWRhdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbWFnZ2xhc3NcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnlobGVkYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0VnljaXN0aXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMDBcIiwgLy9SQyAzMDI1MDEwMCA6IFZ5xI1pc3RpdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5Y2lzdGl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFpvYmF6aXREZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAxNTAwNDBcIiwgLy9SQyAzMDE1MDA0MCA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlpvYnJhekRldGFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RWeWhsZWRhdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VnljaXN0aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFpvYmF6aXREZXRhaWwsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG92b2xlbmkgYWtjZSB6b2JyYXppdCBkb2tsYWQgXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZWRBY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHJvdyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdXZmxzcGlkU2ltcGxlRHRvPih0aGlzLkdldEdyaWQoKSk7XHJcbiAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJvdy50eXBfYWcgPT0gNDAgJiYgcm93LnJvayA9PSB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zIS5Sb2s7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Wm9iYXppdERldGFpbCEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHJlc3VsdFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IHtcclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4cFwiLCBjYXB0aW9uOiBcImpyZXM6MzA2NTAwMTJcIiB9KTsgLy9SQyAzMDY1MDAxMiA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiemtyX2FnXCIsIGNhcHRpb246IFwianJlczozMDI1MDEwMVwiIH0pOyAvL1JDIDMwMjUwMTAxIDogQWdlbmRhXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia25paGFcIiwgY2FwdGlvbjogXCJqcmVzOjMwMTUwMDA1XCIgfSk7IC8vUkMgMzAxNTAwMDUgOiBLbmloYVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicm9rXCIsIGNhcHRpb246IFwianJlczozMDE1MDAzMFwiIH0pOy8vUkMgMzAxNTAwMzAgOiBSb2tcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJhY1wiLCBjYXB0aW9uOiBcImpyZXM6MzAxNTAwMTFcIiB9KTsgIC8vUkMgMzAxNTAwMTEgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c190eXBfdHh0XCIsIGNhcHRpb246IFwianJlczozMDE1MDA1MFwiIH0pOyAgIC8vUkMgMzAxNTAwNTAgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAvL2dyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwibmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMwMTUwMDM3XCIgfSk7IC8vUkMgMzAxNTAwMzcgOiBQb3Bpc1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19mdW5fYWt0X3R4dFwiLCBjYXB0aW9uOiBcImpyZXM6MzAxNTAwMjVcIiB9KTsgLy9SQyAzMDE1MDAyNSA6IFZsYXN0bsOta1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdnlobGVkYXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXhwID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcIlVjdEhsZWRhbmlEb2tsYWR1Rm9ybVwiKS5maW5kRmllbGRzKFwiaXhwXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICB2YXIgYWMgPSB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJhY1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGFjX2FnID0gdGhpcy5lbGVtZW50LmZpbmRGb3JtcyhcIlVjdEhsZWRhbmlEb2tsYWR1Rm9ybVwiKS5maW5kRmllbGRzKFwiYWNfYWdcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgR29yZGljLklzbC5VY3REb2tsYWQuZmluZERvY3VtZW50cyh7IGl4cDogaXhwLCBhYzogYWMsIGFjX2FnOiBhY19hZyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdmlldywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goeyBsYWJlbDogXCJqcmVzOjMwMjUwMTAyXCIsIHRpbWVyOiAzMDAwLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXdhcm5pbmdcIiB9KSAvL1JDIDMwMjUwMTAyIDogRGxlIHphZGFuw6lobyBrcml0w6lyaWEgZG9rbGFkIG5lbmFsZXplblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0Wm9iYXppdERldGFpbCEudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlZEFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL2RlZi5yZXNvbHZlKHJhZGVrKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIGNvbnRlbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2eWNpc3RpdCgpOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJpeHBcIikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRm9ybXMoXCJVY3RIbGVkYW5pRG9rbGFkdUZvcm1cIikuZmluZEZpZWxkcyhcImFjXCIpLmdmaWVsZChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZvcm1zKFwiVWN0SGxlZGFuaURva2xhZHVGb3JtXCIpLmZpbmRGaWVsZHMoXCJhY19hZ1wiKS5nZmllbGQoXCJjbGVhclwiKTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIG9rbmEgZGxlIGFrdHVhbG5paG8gcmFka3VcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBab2JyYXpEZXRhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRWtvLkludGVyZmFjZS5HV2Zsc3BpZFNpbXBsZUR0bz4odGhpcy5HZXRHcmlkKCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvdyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93LnR5cF9hZyAhPSA0MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDA2N1wiLCAvL1JDIDMwMjUwMDY3IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDEwM1wiKTsgIC8vUkMgMzAyNTAxMDMgOiBEb2tsYWQgeiBqaW7DqSBhZ2VuZHlcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5HbG9iYWxzLkVrb1BhcmFtcyEuUm9rICE9IHJvdy5yb2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzAyNTAwNjdcIiwgLy9SQyAzMDI1MDA2NyA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAxMDRcIik7ICAvL1JDIDMwMjUwMTA0IDogRG9rbGFkIG5lbsOtIHogYWt0dWFsbsOtaG8gb2Jkb2LDrVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Sb3ouV2ViQ2xpZW50LlpvYnJhekRldGFpbERsZUlYUCh0aGlzLCByb3cuaXhwIGFzIGFueSwgcm93LmRhdF96bWVuYSBhcyBEYXRlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMDI1MDA2N1wiLCAvL1JDIDMwMjUwMDY3IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMTA1XCIpOyAgLy9SQyAzMDI1MDEwNSA6IE5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gxZnDoWRlayFcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdldEdyaWQoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAkKFwiLmpzLUdyaWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==