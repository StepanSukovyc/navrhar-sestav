"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokPocStavCeninTab = class GPokPocStavCeninTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    this.setBreadcrumbs([{ caption: this.title, defaultAction: true }]);
                    //var headerForm = new Gordic.Forms.Form({ name: "pokPocStavCeninForm" })
                    //    //    .addSection()
                    //    .addRow()
                    //    .addField("gcheck", {
                    //        name: "neaktivniZaznamy", label: "jres:31302299",
                    //        change: function (ev, changeObj) {
                    //            that.nactiData();
                    //        }} );  //RC 31302299 : Zobrazit neaktivní záznamy
                    //var tab = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    this.grid = $("<div>").appendTo(this.element)
                        .css("height", "100%")
                        .ggrid({
                        data: this.nactiData(), // this.modelPolozky[0]   //zatim nemam zadna data, nastavim prazdne pole. V momente nacteni je nastavim pres options (metoda loadJsGrid)
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit", // fit, full
                        navigationMode: "row", // row, cell
                        //scrollHelperTemplate: "{ac}",
                        //  searchColumns: ["ac"],
                        rowNumbers: false,
                        columns: this.createGridFormat()
                    });
                    that.actions.addRange({
                        actPrenestZustatek: {
                            caption: "jres:31302298", //RC 31302298 : Přenést poč. zůstatek
                            icon: "gi-arrow",
                            run: function (ev, ctx) {
                                that.prenestZustatek();
                            }
                        },
                        actNovy: {
                            caption: "jres:31302295", //RC 31302295 : Nový
                            icon: "gi-plus",
                            run: function (ev, ctx) {
                                that.noveCeniny();
                            }
                        },
                        actUpravit: {
                            caption: "jres:31302296", //RC 31302296 : Upravit
                            icon: "gi-pencil",
                            run: function (ev, ctx) {
                                that.upravCeniny();
                            }
                        },
                        actOdstranit: {
                            caption: "jres:31302297", //RC 31302297 : Odstranit
                            icon: "gi-bin",
                            run: function (ev, ctx) {
                                that.odstranCeniny();
                            }
                        }
                    });
                    this.menuBar([
                        { action: this.actions.actNovy, favorite: true },
                        { action: this.actions.actUpravit, favorite: true },
                        { action: this.actions.actOdstranit, favorite: true },
                        { action: this.actions.actPrenestZustatek, favorite: true }
                    ]);
                }
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addDecimalColumn({ name: "mjm", caption: "Hodnota" });
                    gridFormat.addDecimalColumn({ name: "m", caption: "Množství" });
                    gridFormat.addCurrencyColumn({ name: "celkem", caption: "Celkem" });
                    gridFormat.addTextColumn({ name: "ixs_fun_nazev", caption: "Změnu provedl" });
                    gridFormat.addDateTimeColumn({ name: "dat_zmena", caption: "jres:31302230" }); //RC 31302230 : Datum změny
                    gridFormat.addTextColumn({ name: "aktivita_txt", caption: "Aktivita" }); //RC 31302231 : Změnu provedl
                    return gridFormat;
                }
                nactiData() {
                    var that = this;
                    var test = new Gordic.Isl.View(Gordic.Isl.PokKniha.seznamCenin(rq => {
                        return {
                            filters: { ixp_den: that.ixpDen }
                        };
                    }));
                    test.process(new Gordic.Data.ComputedFieldsProcessor(function (rows) {
                        rows.forEach(function (row) {
                            row.data.celkem = Decimal.mul(parseDecimal(row.data.m), parseDecimal(row.data.mjm));
                        });
                    }));
                    return test;
                }
                noveCeniny() {
                    var that = this;
                    var windowOption = { width: 400, height: 300 };
                    var ParamsJSON = { Hodnota: 0, Mnozstvi: 0, Edit: true, AktivitaZaznamu: 100, ixpDen: that.ixpDen };
                    that.dialogs.showModalWindow("Gordic.Pok.WebClient.GPokEditCeninyTab", ParamsJSON, windowOption)
                        .on("close", function (ev) {
                        that.grid.ggrid("setData", that.nactiData());
                    });
                }
                odstranCeniny() {
                    var that = this;
                    var row = this.grid.ggrid("getSelection")[0];
                    if (row == undefined) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "Není vybrán žádný záznam!");
                        return;
                    }
                    if (row.aktivita === 100) {
                        this.dialogs.messageBox("dotaz", "jres:31302300", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31302300 : Opravdu chcete odstranit tento záznam?
                            .on("yes", function () {
                            row.aktivita = 900;
                            return Gordic.Isl.PokKniha.zalozUpravCenina(rq => { return { data: row }; })
                                .get()
                                .done(function (data) {
                                that.grid.ggrid("setData", that.nactiData());
                                Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, "Záznam úspěšně odstraněn!");
                            });
                        })
                            .on("no", function () { });
                    }
                }
                upravCeniny() {
                    var that = this;
                    var row = this.grid.ggrid("getSelection")[0];
                    if (row == undefined) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "Není vybrán žádný záznam!");
                        return;
                    }
                    var windowOption = { width: 400, height: 300 };
                    var ParamsJSON = { Hodnota: row.mjm, Mnozstvi: row.m, Edit: false, AktivitaZaznamu: row.aktivita, ixpDen: that.ixpDen };
                    that.dialogs.showModalWindow("Gordic.Pok.WebClient.GPokEditCeninyTab", ParamsJSON, windowOption)
                        .on("close", function (ev) {
                        that.grid.ggrid("setData", that.nactiData());
                    });
                }
                prenestZustatek() {
                    var that = this;
                    //Chcete počáteční zůstatek přičíst nebo přepsat?
                    that.dialogs.messageBox("jres:31302301", "jres:31302302", [{ text: "Přičíst", id: "yes" }, { text: "Přepsat", id: "no" }], "", 400, 200) //RC 31302302 : Chcete počáteční zůstatek přičíst nebo přepsat?
                        .on("close", function (ev, retVal) {
                        Gordic.Isl.PokKniha.pridatPocZustatekZCenin(rq => {
                            return {
                                ixpDen: that.ixpDen,
                                pripsat: retVal === "yes" ? true : false
                            };
                        })
                            .get()
                            .done(function () {
                            Gordic.Pok.WebClient.GPokFlash.showFlashSuccess(that, retVal === "yes" ? "Součet cenin byl přičten k zůstatku pokladní knihy." : "Součet cenin byl přepsán jako zůstatku pokladní knihy.");
                        });
                    });
                }
            };
            GPokPocStavCeninTab = __decorate([
                Decorators.gcontent
            ], GPokPocStavCeninTab);
            WebClient.GPokPocStavCeninTab = GPokPocStavCeninTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1BvY1N0YXZDZW5pblRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb2tQb2NTdGF2Q2VuaW5UYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWdPZjtBQWhPRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnT25CO0lBaE9nQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FnTzdCO1FBaE9vQixXQUFBLFNBQVM7WUFLMUIsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxPQUFBLFlBQVk7Z0JBTWpELGNBQWM7b0JBR1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRyxhQUFhLEVBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUd0RSx5RUFBeUU7b0JBQ3pFLHlCQUF5QjtvQkFDekIsZUFBZTtvQkFDZiwyQkFBMkI7b0JBQzNCLDJEQUEyRDtvQkFDM0QsNENBQTRDO29CQUU1QywrQkFBK0I7b0JBRS9CLDJEQUEyRDtvQkFFM0QsOEVBQThFO29CQUU5RSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzt5QkFDeEMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7eUJBQ3JCLEtBQUssQ0FBQzt3QkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUNsQix5SUFBeUk7d0JBQzdJLFVBQVUsRUFBRSxNQUFNLEVBQU0sNkNBQTZDO3dCQUNyRSxVQUFVLEVBQUUsS0FBSyxFQUFPLFlBQVk7d0JBQ3BDLGNBQWMsRUFBRSxLQUFLLEVBQUcsWUFBWTt3QkFDcEMsK0JBQStCO3dCQUMvQiwwQkFBMEI7d0JBQzFCLFVBQVUsRUFBRSxLQUFLO3dCQUNq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QUFNLFFBZ09mIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgIFxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva1BvY1N0YXZDZW5pblRhYiBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIGl4cERlbjogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEJyZWFkY3J1bWJzKFt7IGNhcHRpb246IHRoaXMudGl0bGUsICBkZWZhdWx0QWN0aW9uIDogdHJ1ZSB9XSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy92YXIgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwicG9rUG9jU3RhdkNlbmluRm9ybVwiIH0pXHJcbiAgICAgICAgICAgIC8vICAgIC8vICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcIm5lYWt0aXZuaVphem5hbXlcIiwgbGFiZWw6IFwianJlczozMTMwMjI5OVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Lm5hY3RpRGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgIH19ICk7ICAvL1JDIDMxMzAyMjk5IDogWm9icmF6aXQgbmVha3Rpdm7DrSB6w6F6bmFteVxyXG5cclxuICAgICAgICAgICAgLy92YXIgdGFiID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGhlYWRlckZvcm0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ncmlkID0gJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMubmFjdGlEYXRhKCkgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAsICAgLy8gdGhpcy5tb2RlbFBvbG96a3lbMF0gICAvL3phdGltIG5lbWFtIHphZG5hIGRhdGEsIG5hc3RhdmltIHByYXpkbmUgcG9sZS4gViBtb21lbnRlIG5hY3RlbmkgamUgbmFzdGF2aW0gcHJlcyBvcHRpb25zIChtZXRvZGEgbG9hZEpzR3JpZClcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsICAgICAgLy8gZml0LCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICAvL3Njcm9sbEhlbHBlclRlbXBsYXRlOiBcInthY31cIixcclxuICAgICAgICAgICAgICAgICAgICAvLyAgc2VhcmNoQ29sdW1uczogW1wiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFByZW5lc3RadXN0YXRlazoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjI5OFwiLC8vUkMgMzEzMDIyOTggOiBQxZllbsOpc3QgcG/EjS4gesWvc3RhdGVrXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1hcnJvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVuZXN0WnVzdGF0ZWsoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0Tm92eToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjI5NVwiLCAvL1JDIDMxMzAyMjk1IDogTm92w71cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBsdXNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubm92ZUNlbmlueSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RVcHJhdml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjk2XCIsLy9SQyAzMTMwMjI5NiA6IFVwcmF2aXRcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXBlbmNpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cHJhdkNlbmlueSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICwgYWN0T2RzdHJhbml0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMjk3XCIsLy9SQyAzMTMwMjI5NyA6IE9kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYmluXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9kc3RyYW5DZW5pbnkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcihbXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE5vdnksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFVwcmF2aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdE9kc3RyYW5pdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UHJlbmVzdFp1c3RhdGVrLCBmYXZvcml0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxufVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rQ2VuaW55RHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0NlbmlueUR0bz4oKTtcclxuXHJcbiAgICAgICAgICBncmlkRm9ybWF0LmFkZERlY2ltYWxDb2x1bW4oeyBuYW1lOiBcIm1qbVwiLCBjYXB0aW9uOiBcIkhvZG5vdGFcIiB9KTtcclxuICAgICAgICAgIGdyaWRGb3JtYXQuYWRkRGVjaW1hbENvbHVtbih7IG5hbWU6IFwibVwiLCBjYXB0aW9uOiBcIk1ub8W+c3R2w61cIiB9KTtcclxuICAgICAgICAgIGdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oeyBuYW1lOiBcImNlbGtlbVwiLCBjYXB0aW9uOiBcIkNlbGtlbVwiIH0pO1xyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcIml4c19mdW5fbmF6ZXZcIiwgY2FwdGlvbjogXCJabcSbbnUgcHJvdmVkbFwiIH0pOyBcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGREYXRlVGltZUNvbHVtbih7IG5hbWU6IFwiZGF0X3ptZW5hXCIsIGNhcHRpb246IFwianJlczozMTMwMjIzMFwiIH0pOy8vUkMgMzEzMDIyMzAgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJha3Rpdml0YV90eHRcIiwgY2FwdGlvbjogXCJBa3Rpdml0YVwiIH0pOyAvL1JDIDMxMzAyMjMxIDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBuYWN0aURhdGEoKTogR29yZGljLklzbC5WaWV3XHJcbiAgICAgICAgICAgIHsgICAgIFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHRlc3QgPSBuZXcgR29yZGljLklzbC5WaWV3KEdvcmRpYy5Jc2wuUG9rS25paGEuc2V6bmFtQ2VuaW4ocnEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogeyBpeHBfZGVuOiB0aGF0Lml4cERlbiB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgdGVzdC5wcm9jZXNzXHJcbiAgICAgICAgICAgICAgIChuZXcgR29yZGljLkRhdGEuQ29tcHV0ZWRGaWVsZHNQcm9jZXNzb3I8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0NlbmlueUR0bz4oZnVuY3Rpb24gKHJvd3MpIHtcclxuICAgICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcm93LmRhdGEuY2Vsa2VtID0gRGVjaW1hbC5tdWwocGFyc2VEZWNpbWFsKHJvdy5kYXRhLm0hKSwgcGFyc2VEZWNpbWFsKHJvdy5kYXRhLm1qbSEpKVxyXG5cclxuICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGVzdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG5vdmVDZW5pbnkoKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgd2lkdGg6IDQwMCwgaGVpZ2h0OiAzMDAgfTtcclxuICAgICAgICAgICAgdmFyIFBhcmFtc0pTT04gPSB7IEhvZG5vdGE6IDAsIE1ub3pzdHZpOiAwLCBFZGl0OiB0cnVlLCBBa3Rpdml0YVphem5hbXU6IDEwMCwgaXhwRGVuOiB0aGF0Lml4cERlbiB9O1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0VkaXRDZW5pbnlUYWJcIiwgUGFyYW1zSlNPTiwgd2luZG93T3B0aW9uKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2KSB7IC8vIHBvdMOpIGNvIHNlIG9rbm8gemF2xZllXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5uYWN0aURhdGEoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb2RzdHJhbkNlbmlueSgpOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0NlbmlueUR0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcblxyXG4gICAgICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyb3cuYWt0aXZpdGEgPT09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3goXCJkb3RhelwiLCBcImpyZXM6MzEzMDIzMDBcIiwgR0RsZy5tYmJZZXNObywgR0RsZy5tYmlRdWVzdGlvbikgLy9SQyAzMTMwMjMwMCA6IE9wcmF2ZHUgY2hjZXRlIG9kc3RyYW5pdCB0ZW50byB6w6F6bmFtP1xyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcInllc1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5ha3Rpdml0YSA9IDkwMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuSXNsLlBva0tuaWhhLnphbG96VXByYXZDZW5pbmEocnEgPT4geyByZXR1cm4geyBkYXRhOiByb3cgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC5uYWN0aURhdGEoKSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFN1Y2Nlc3ModGhhdCwgXCJaw6F6bmFtIMO6c3DEm8WhbsSbIG9kc3RyYW7Em24hXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwibm9cIiwgZnVuY3Rpb24gKCkgeyAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdXByYXZDZW5pbnkoKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rQ2VuaW55RHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IHrDoXpuYW0hXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHdpbmRvd09wdGlvbiA9IHsgd2lkdGg6IDQwMCwgaGVpZ2h0OiAzMDAgfTtcclxuICAgICAgICAgICAgdmFyIFBhcmFtc0pTT04gPSB7IEhvZG5vdGE6IHJvdy5tam0sIE1ub3pzdHZpOiByb3cubSwgRWRpdDogZmFsc2UsIEFrdGl2aXRhWmF6bmFtdTogcm93LmFrdGl2aXRhLCBpeHBEZW46IHRoYXQuaXhwRGVuIH07XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRWRpdENlbmlueVRhYlwiLCBQYXJhbXNKU09OLCB3aW5kb3dPcHRpb24pXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYpIHsgLy8gcG90w6kgY28gc2Ugb2tubyB6YXbFmWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwic2V0RGF0YVwiLCB0aGF0Lm5hY3RpRGF0YSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVuZXN0WnVzdGF0ZWsoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL0NoY2V0ZSBwb8SNw6F0ZcSNbsOtIHrFr3N0YXRlayBwxZlpxI3DrXN0IG5lYm8gcMWZZXBzYXQ/XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwianJlczozMTMwMjMwMVwiLCBcImpyZXM6MzEzMDIzMDJcIiwgW3sgdGV4dDogXCJQxZlpxI3DrXN0XCIsIGlkOiBcInllc1wiIH0sIHsgdGV4dDogXCJQxZllcHNhdFwiLCBpZDogXCJub1wiIH1dLCBcIlwiLCA0MDAsIDIwMCkgLy9SQyAzMTMwMjMwMiA6IENoY2V0ZSBwb8SNw6F0ZcSNbsOtIHrFr3N0YXRlayBwxZlpxI3DrXN0IG5lYm8gcMWZZXBzYXQ/XHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Jc2wuUG9rS25paGEucHJpZGF0UG9jWnVzdGF0ZWtaQ2VuaW4ocnEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cERlbjogdGhhdC5peHBEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlwc2F0OiByZXRWYWwgPT09IFwieWVzXCI/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hTdWNjZXNzKHRoYXQsIHJldFZhbCA9PT0gXCJ5ZXNcIiA/IFwiU291xI1ldCBjZW5pbiBieWwgcMWZacSNdGVuIGsgesWvc3RhdGt1IHBva2xhZG7DrSBrbmloeS5cIiA6IFwiU291xI1ldCBjZW5pbiBieWwgcMWZZXBzw6FuIGpha28gesWvc3RhdGt1IHBva2xhZG7DrSBrbmloeS5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG59XHJcblxyXG4iXX0=