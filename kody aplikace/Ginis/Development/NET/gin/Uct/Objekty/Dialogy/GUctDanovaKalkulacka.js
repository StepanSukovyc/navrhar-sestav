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
            var gcontent = Decorators.gcontent;
            let GUctDanovaKalkulacka = class GUctDanovaKalkulacka extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.returnValue = null;
                }
                //a: string;
                //public globals: Gordic.Uct.Interface.GUcGlobalDto;
                // ************************************************************************
                // Inicializace formuláře
                prepareContent(par) {
                    debugger;
                    this.title = "";
                    var that = this;
                    this.actions.addRange({
                        zakladAct: {
                            name: "zakladAct", caption: "jres:30250839", run: function () {
                                that.vyberHodnoty(1 /* GETypHodnoty.Zaklad */);
                                that.tryClose( /*that.getFormData()*/);
                            }
                        },
                        danAct: {
                            name: "danAct", caption: "jres:30250832", run: function () {
                                that.vyberHodnoty(2 /* GETypHodnoty.Dan */);
                                that.tryClose( /*that.getFormData()*/);
                            }
                        },
                        celkemAct: {
                            name: "celkemAct", caption: "jres:30250833", run: function () {
                                that.vyberHodnoty(3 /* GETypHodnoty.Celkem */);
                                that.tryClose( /*that.getFormData()*/);
                            }
                        },
                        actionZrusit: Gordic.Eko.Action.actionZrusit({ enabled: true, run: function () { that.tryClose(); } })
                    });
                    // tlačítka do spodního pruhu
                    this.commandBar([
                        {
                            favorite: true,
                            action: this.actions.zakladAct
                        },
                        {
                            favorite: true,
                            action: this.actions.danAct
                        },
                        {
                            favorite: true,
                            action: this.actions.celkemAct
                        },
                        {
                            favorite: true,
                            action: this.actions.actionZrusit
                        },
                    ]);
                    // Kontrola vstupniho obdobi
                    if (par.Rok < 1990 || (par.Mesic < 1 && par.Mesic > 31)) {
                        // dam aktualni rok
                        const datum = new Date();
                        par.Rok = datum.getFullYear();
                        par.Mesic = datum.getMonth() + 1;
                    }
                    that.recapDPH = new GContent([Gordic.Gin.WebClient.recapDPH, {
                            checkVisible: false,
                            periodDPHVisible: true,
                            moveDirection: "right",
                            focusOnFirstColumn: true,
                            taxPeriod: () => { return this.datPole; },
                            behavOnFirstEditColumn: "edit",
                            prices: {
                                "10": { disabledTax: true },
                                //"20": { disabledTax: true },
                                //"30": { disabledTax: true },
                            },
                            visType: "grid",
                            model: {
                                taxDoc: false, // Daňový doklad
                                taxedByReciever: false, // Zdanění příjemcem
                                otherTaxedPayment: false, // Ostatní zdanitelné plnění do 10 000 CZK
                                useDeductionRatio: false, // Poměr pro odpočet
                                periodDPH: {
                                    month: par.Mesic,
                                    year: par.Rok
                                }
                                //prices: that.dataDoRekapitulace(),
                                // doplnění částek do gridu
                            },
                        }]);
                    that.recapDPH.element.appendTo(that.element);
                    this.myForm = new Gordic.Forms.Form({ name: "formular", layoutDescriptor: "L3M2S1" })
                        //.addSection({ label: "" })
                        //.addRow({ layoutDescriptor: "L1M1S1", customClass: "w-h" })
                        //.addText("Test")
                        .addSection({ label: " " })
                        //.addSection({
                        //    label: " "
                        //})
                        .addRow({ customClass: "w-h" })
                        .addField("gdatebox", "w-h", { name: "obdobi", disabled: true, initialValue: new Date(par.Rok, par.Mesic - 1) })
                        .addRow({ label: "jres:30250611" }) //RC 30250611 : Základ
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "zaklad", disabled: true })
                        .addSection(" ")
                        .addRow({ label: "jres:30250612" }) //RC 30250612 : Daň
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "dan", disabled: true })
                        .addSection(" ")
                        .addRow({ label: "jres:30250613" }) //RC 30250613 : Celkem
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), { name: "celkem", disabled: true });
                    $.newDiv()
                        .appendTo(that.element).gform('createFrom', this.myForm); // vytvoření formuláře
                    this.datPole = this.findFields("obdobi");
                    //$(that.contentDiv).resize();
                    // nutno pro 1. spusteni
                    that.recapDPH.element.on("gridprofilechange", ".ggrid", (ev, obj) => {
                        debugger;
                        let grid = $(ev.currentTarget);
                        var view = grid.ggrid("getView");
                        if (view.getDataRows().filter(i => { return i.dan_typ > 0; }).length === 0) {
                            that.dialogs.alert("Načtení sazeb DPH", "Neproběhlo korektní načtení sazeb DPH.");
                            return;
                        }
                        // znepristupneni sloupecku dan
                        view.findByKey(10).disabledTax = true;
                        view.findByKey(20).disabledTax = true;
                        view.findByKey(30).disabledTax = true;
                        view.updateData(undefined);
                        //skryti nepotrebnych radku
                        view.process(new Gordic.Data.FilterProcessor("dan_typ>0"));
                        grid.ggridcelleditor("start", { row: 0, col: 1 });
                    });
                    var grid = $(that.recapDPH.find(".ggrid"));
                    // nutno pra dalsi spusteni
                    if (grid.length > 0) {
                        var view = grid.ggrid("getView");
                        // znepristupneni sloupecku dan
                        view.findByKey(10).disabledTax = true;
                        view.findByKey(20).disabledTax = true;
                        view.findByKey(30).disabledTax = true;
                        view.updateData(undefined);
                        // skryti nepotrebnych radku
                        view.process(new Gordic.Data.FilterProcessor("dan_typ>0"));
                    }
                    // navazani na udalost zmeny focusu radku
                    that.recapDPH.element.on("selection select", ".ggrid", (ev) => {
                        let grid = $(ev.currentTarget);
                        let data = grid.ggrid("getSelection");
                        if (data.length == 1 && data[0].dan_typ > 0) {
                            // nastaveni hodnot z radku do policek
                            that.element.findFields("zaklad").gfield("setValue", data[0].baseValue);
                            that.element.findFields("dan").gfield("setValue", data[0].tax);
                            that.element.findFields("celkem").gfield("setValue", data[0].sum);
                        }
                        //that.dialogs.alert("Test");
                    });
                    // nutne k vuli zmene hodnoty
                    that.recapDPH.element.on("fieldchange", function (ev) {
                        // otestovani, zda to bylo v rezimu opravy
                        debugger;
                        let grid = $(that.recapDPH.find(".ggrid"));
                        var data = grid.ggrid("getSelection");
                        let updateAmounts = data[0].dan_typ > 0;
                        var hodnota = $(ev.target).closest(".gfield").gfield("getValue");
                        var nazev = $(ev.target).closest(".gfield").gfield("option", "name") ?? "";
                        let nameFielad = "";
                        if (updateAmounts && nazev === "sum") {
                            nameFielad = "celkem";
                            that.element.findFields("zaklad").gfield("setValue", data[0].baseValue);
                            that.element.findFields("dan").gfield("setValue", data[0].tax);
                        }
                        else if (updateAmounts && nazev === "tax") {
                            nameFielad = "dan";
                            that.element.findFields("zaklad").gfield("setValue", data[0].baseValue);
                            that.element.findFields("celkem").gfield("setValue", data[0].sum);
                        }
                        else if (updateAmounts && nazev === "baseValue") {
                            nameFielad = "zaklad";
                            that.element.findFields("dan").gfield("setValue", data[0].tax);
                            that.element.findFields("celkem").gfield("setValue", data[0].sum);
                        }
                        if (updateAmounts && nameFielad) {
                            // ulozeni hodnoty do prislusneho policka
                            that.element.findFields(nameFielad).gfield("setValue", hodnota);
                        }
                        else if (nazev?.indexOf("periodDPH") > -1) {
                            const year = Number((that.findFields("periodDPHEnd").gfield("getValue") ?? 1990));
                            const month = Number((that.findFields("periodDPHStart").gfield("getValue") ?? 1) - 1);
                            let canSet = true;
                            if (year < 1990 || year > 2999) {
                                that.dialogs.alert("Chybně zadaná hodnota", "Zadali jste chybnou hodnotu roku pro Období DPH (povolené rozmezí 1990 - 2999)");
                                canSet = false;
                            }
                            if (month < 0 || month > 11) {
                                that.dialogs.alert("Chybně zadaná hodnota", "Zadali jste chybnou hodnotu měsíce pro Období DPH");
                                canSet = false;
                            }
                            if (canSet) {
                                that.datPole?.gfield("setValue", new Date(year, month));
                            }
                            //(that.recapDPH as Gordic.Gin.WebClient.recapDPH).refresh()
                        }
                    });
                    //}
                    //);
                    that.inicializace();
                }
                /**
                 * Inicializace hodnot
                 * */
                inicializace() {
                    let grid = $(this.recapDPH.find(".ggrid"));
                    grid.ggridcelleditor("start", { row: 0, col: 1 });
                    if (grid.length === 0)
                        return;
                    //let view = grid.ggrid("getView");
                    //view.getLoadingPromise().always(() => {
                    //    debugger;
                    //    grid.ggridcelleditor("start", { row: 0, col: 1 });
                    //});
                    //view.findByKey(10);
                }
                /**
                 * vyber hodnoty
                 * */
                vyberHodnoty(typVyberu) {
                    let that = this;
                    let grid = that.recapDPH["grid"];
                    that.returnValue = null;
                    let view = grid.ggrid("getView");
                    if (view.getCount() == 0)
                        return;
                    let value = 0;
                    let rows = grid.ggrid("getSelection");
                    if (rows.length !== 1 || rows[0].dan_typ <= 0)
                        return;
                    let row = rows[0];
                    if (typVyberu == 1 /* GETypHodnoty.Zaklad */) {
                        //let cell = grid.ggrid("activeCellAddress");
                        //let data = view.getDataRows(false);
                        value = row.baseValue;
                    }
                    else if (typVyberu == 3 /* GETypHodnoty.Celkem */) {
                        value = row.sum;
                    }
                    else if (typVyberu == 2 /* GETypHodnoty.Dan */) {
                        value = row.tax;
                    }
                    that.returnValue = value;
                }
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    return def.resolve(that.returnValue).promise();
                }
            };
            GUctDanovaKalkulacka = __decorate([
                gcontent
            ], GUctDanovaKalkulacka);
            WebClient.GUctDanovaKalkulacka = GUctDanovaKalkulacka;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdERhbm92YUthbGt1bGFja2EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWN0RGFub3ZhS2Fsa3VsYWNrYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBbVNmO0FBblNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW1TbkI7SUFuU2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW1TN0I7UUFuU29CLFdBQUEsU0FBUztZQVcxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQUF0RDs7b0JBR1ksZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO2dCQWtSOUMsQ0FBQztnQkEvUUcsWUFBWTtnQkFDWixvREFBb0Q7Z0JBQ3BELDJFQUEyRTtnQkFDM0UseUJBQXlCO2dCQUN6QixjQUFjLENBQUMsR0FBZ0I7b0JBQzNCLFFBQVEsQ0FBQztvQkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzt3QkFDbEIsU0FBUyxFQUFFOzRCQUNQLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUU7Z0NBQzlDLElBQUksQ0FBQyxZQUFZLDZCQUFxQixDQUFDO2dDQUN2QyxJQUFJLENBQUMsUUFBUSxFQUFDLHNCQUFzQixDQUFDLENBQUM7NEJBQzFDLENBQUM7eUJBQ0o7d0JBQ0QsTUFBTSxFQUFFOzRCQUNKLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUU7Z0NBQzNDLElBQUksQ0FBQyxZQUFZLDBCQUFrQixDQUFDO2dDQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFDLHNCQUFzQixDQUFDLENB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QyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuRCxDQUFDO2FBR0osQ0FBQTtZQXJSWSxvQkFBb0I7Z0JBRGhDLFFBQVE7ZUFDSSxvQkFBb0IsQ0FxUmhDO1lBclJZLDhCQUFvQix1QkFxUmhDLENBQUE7UUFDTCxDQUFDLEVBblNvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtUzdCO0lBQUQsQ0FBQyxFQW5TZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbVNuQjtBQUFELENBQUMsRUFuU1MsTUFBTSxLQUFOLE1BQU0sUUFtU2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjdC5XZWJDbGllbnQge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR09iZG9iaURQSCB7XHJcbiAgICAgICAgTWVzaWM6IG51bWJlcixcclxuICAgICAgICBSb2s6IG51bWJlcjtcclxuICAgICAgICBWYWx1ZTogSnNvbkRlY2ltYWxcclxuICAgIH1cclxuICAgIGNvbnN0IGVudW0gR0VUeXBIb2Rub3R5IHtcclxuICAgICAgICBaYWtsYWQgPSAxLFxyXG4gICAgICAgIERhbiA9IDIsICAgICAgICBcclxuICAgICAgICBDZWxrZW0gPSAzLFxyXG4gICAgfVxyXG4gICAgdmFyIGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdVY3REYW5vdmFLYWxrdWxhY2thIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICAvLyB2c3R1cG5pIHBhcmFtZXRyeVxyXG4gICAgICAgIHByaXZhdGUgcmVjYXBEUEg6IEdDb250ZW50PEdvcmRpYy5HaW4uV2ViQ2xpZW50LnJlY2FwRFBIPjtcclxuICAgICAgICBwcml2YXRlIHJldHVyblZhbHVlOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICBwcml2YXRlIG15Rm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRQb2xlPzogSlF1ZXJ5O1xyXG4gICAgICAgIC8vYTogc3RyaW5nO1xyXG4gICAgICAgIC8vcHVibGljIGdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY0dsb2JhbER0bztcclxuICAgICAgICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAvLyBJbmljaWFsaXphY2UgZm9ybXVsw6HFmWVcclxuICAgICAgICBwcmVwYXJlQ29udGVudChwYXI6IElHT2Jkb2JpRFBIKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJcIjtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIHpha2xhZEFjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemFrbGFkQWN0XCIsIGNhcHRpb246IFwianJlczozMDI1MDgzOVwiLCBydW46IGZ1bmN0aW9uICgpIHsgLy9SQyAzMDI1MDgzOSA6IFrDoWtsYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eWJlckhvZG5vdHkoR0VUeXBIb2Rub3R5Llpha2xhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoLyp0aGF0LmdldEZvcm1EYXRhKCkqLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhbkFjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGFuQWN0XCIsIGNhcHRpb246IFwianJlczozMDI1MDgzMlwiLCBydW46IGZ1bmN0aW9uICgpIHsgLy9SQyAzMDI1MDgzMiA6IERhxYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eWJlckhvZG5vdHkoR0VUeXBIb2Rub3R5LkRhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoLyp0aGF0LmdldEZvcm1EYXRhKCkqLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNlbGtlbUFjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2Vsa2VtQWN0XCIsIGNhcHRpb246IFwianJlczozMDI1MDgzM1wiLCBydW46IGZ1bmN0aW9uICgpIHsgLy9SQyAzMDI1MDgzMyA6IENlbGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZ5YmVySG9kbm90eShHRVR5cEhvZG5vdHkuQ2Vsa2VtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgvKnRoYXQuZ2V0Rm9ybURhdGEoKSovKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uWnJ1c2l0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXQoeyBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC50cnlDbG9zZSgpOyB9IH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRsYcSNw610a2EgZG8gc3BvZG7DrWhvIHBydWh1XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuemFrbGFkQWN0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zLmRhbkFjdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuYWN0aW9ucy5jZWxrZW1BY3RcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0aW9uWnJ1c2l0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEtvbnRyb2xhIHZzdHVwbmlobyBvYmRvYmlcclxuICAgICAgICAgICAgaWYgKHBhci5Sb2sgPCAxOTkwIHx8IChwYXIuTWVzaWMgPCAxICYmIHBhci5NZXNpYyA+IDMxKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZGFtIGFrdHVhbG5pIHJva1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0dW0gPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcGFyLlJvayA9IGRhdHVtLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBwYXIuTWVzaWMgPSBkYXR1bS5nZXRNb250aCgpKzE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoYXQucmVjYXBEUEggPSBuZXcgR0NvbnRlbnQoW0dvcmRpYy5HaW4uV2ViQ2xpZW50LnJlY2FwRFBILCB7XHJcbiAgICAgICAgICAgICAgICBjaGVja1Zpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kRFBIVmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1vdmVEaXJlY3Rpb246IFwicmlnaHRcIixcclxuICAgICAgICAgICAgICAgIGZvY3VzT25GaXJzdENvbHVtbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRheFBlcmlvZDogKCkgPT4geyByZXR1cm4gdGhpcy5kYXRQb2xlIH0sICAgXHJcbiAgICAgICAgICAgICAgICBiZWhhdk9uRmlyc3RFZGl0Q29sdW1uOlwiZWRpdFwiLFxyXG4gICAgICAgICAgICAgICAgcHJpY2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCIxMFwiOiB7IGRpc2FibGVkVGF4OiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9cIjIwXCI6IHsgZGlzYWJsZWRUYXg6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL1wiMzBcIjogeyBkaXNhYmxlZFRheDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZpc1R5cGU6IFwiZ3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZWw6ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGF4RG9jOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEYcWIb3bDvSBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICB0YXhlZEJ5UmVjaWV2ZXI6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBaZGFuxJtuw60gcMWZw61qZW1jZW1cclxuICAgICAgICAgICAgICAgICAgICBvdGhlclRheGVkUGF5bWVudDogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9zdGF0bsOtIHpkYW5pdGVsbsOpIHBsbsSbbsOtIGRvIDEwIDAwMCBDWktcclxuICAgICAgICAgICAgICAgICAgICB1c2VEZWR1Y3Rpb25SYXRpbzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9txJtyIHBybyBvZHBvxI1ldFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZERQSDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aDogcGFyLk1lc2ljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBwYXIuUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcHJpY2VzOiB0aGF0LmRhdGFEb1Jla2FwaXR1bGFjZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuxJtuw60gxI3DoXN0ZWsgZG8gZ3JpZHVcclxuXHJcbiAgICAgICAgICAgICAgICB9IGFzIEdvcmRpYy5HaW4uV2ViQ2xpZW50LklHUmVjYXBNb2RlbER0byxcclxuICAgICAgICAgICAgfV0pO1xyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGF0LnJlY2FwRFBILmVsZW1lbnQuYXBwZW5kVG8odGhhdC5lbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubXlGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtdWxhclwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTJTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRTZWN0aW9uKHsgbGFiZWw6IFwiXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIsIGN1c3RvbUNsYXNzOiBcInctaFwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwiVGVzdFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyAgbGFiZWw6XCIgXCIgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbGFiZWw6IFwiIFwiXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwidy1oXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy1oXCIsIHsgbmFtZTogXCJvYmRvYmlcIiwgZGlzYWJsZWQ6IHRydWUsIGluaXRpYWxWYWx1ZTogbmV3IERhdGUocGFyLlJvaywgcGFyLk1lc2ljIC0gMSkgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNjExXCJ9KSAvL1JDIDMwMjUwNjExIDogWsOha2xhZFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBuYW1lOiBcInpha2xhZFwiLCBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDYxMlwiIH0pICAvL1JDIDMwMjUwNjEyIDogRGHFiFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSxcclxuICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwiZGFuXCIsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgICAgICAgICAgICAgICAgICApIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCIgXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDYxM1wiIH0pICAvL1JDIDMwMjUwNjEzIDogQ2Vsa2VtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IG5hbWU6IFwiY2Vsa2VtXCIsIGRpc2FibGVkOiB0cnVlIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHQoXCJWeXNsZWRlayB0ZXN0XCIsIFwianMtcmVzdWx0LXRleHRcIik7XHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpLmdmb3JtKCdjcmVhdGVGcm9tJywgdGhpcy5teUZvcm0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRQb2xlID0gdGhpcy5maW5kRmllbGRzKFwib2Jkb2JpXCIpO1xyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyQodGhhdC5jb250ZW50RGl2KS5yZXNpemUoKTtcclxuICAgICAgICAgICAgLy8gbnV0bm8gcHJvIDEuIHNwdXN0ZW5pXHJcbiAgICAgICAgICAgIHRoYXQucmVjYXBEUEguZWxlbWVudC5vbihcImdyaWRwcm9maWxlY2hhbmdlXCIsIFwiLmdncmlkXCIsIChldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gJChldi5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlldy5nZXREYXRhUm93cygpLmZpbHRlcihpID0+IHsgcmV0dXJuIGkuZGFuX3R5cCA+IDA7IH0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcIk5hxI10ZW7DrSBzYXplYiBEUEhcIiwgXCJOZXByb2LEm2hsbyBrb3Jla3Ruw60gbmHEjXRlbsOtIHNhemViIERQSC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gem5lcHJpc3R1cG5lbmkgc2xvdXBlY2t1IGRhblxyXG4gICAgICAgICAgICAgICAgdmlldy5maW5kQnlLZXkoMTApLmRpc2FibGVkVGF4ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdmlldy5maW5kQnlLZXkoMjApLmRpc2FibGVkVGF4ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdmlldy5maW5kQnlLZXkoMzApLmRpc2FibGVkVGF4ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAvL3Nrcnl0aSBuZXBvdHJlYm55Y2ggcmFka3VcclxuICAgICAgICAgICAgICAgIHZpZXcucHJvY2VzcyhuZXcgR29yZGljLkRhdGEuRmlsdGVyUHJvY2Vzc29yKFwiZGFuX3R5cD4wXCIpKTtcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRjZWxsZWRpdG9yKFwic3RhcnRcIiwgeyByb3c6IDAsIGNvbDogMSB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ3JpZCA9ICQodGhhdC5yZWNhcERQSC5maW5kKFwiLmdncmlkXCIpKTtcclxuICAgICAgICAgICAgLy8gbnV0bm8gcHJhIGRhbHNpIHNwdXN0ZW5pXHJcbiAgICAgICAgICAgIGlmIChncmlkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAvLyB6bmVwcmlzdHVwbmVuaSBzbG91cGVja3UgZGFuXHJcbiAgICAgICAgICAgICAgICB2aWV3LmZpbmRCeUtleSgxMCkuZGlzYWJsZWRUYXggPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB2aWV3LmZpbmRCeUtleSgyMCkuZGlzYWJsZWRUYXggPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB2aWV3LmZpbmRCeUtleSgzMCkuZGlzYWJsZWRUYXggPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgIC8vIHNrcnl0aSBuZXBvdHJlYm55Y2ggcmFka3VcclxuICAgICAgICAgICAgICAgIHZpZXcucHJvY2VzcyhuZXcgR29yZGljLkRhdGEuRmlsdGVyUHJvY2Vzc29yKFwiZGFuX3R5cD4wXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBuYXZhemFuaSBuYSB1ZGFsb3N0IHptZW55IGZvY3VzdSByYWRrdVxyXG4gICAgICAgICAgICB0aGF0LnJlY2FwRFBILmVsZW1lbnQub24oXCJzZWxlY3Rpb24gc2VsZWN0XCIsIFwiLmdncmlkXCIsIChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyaWQgPSAkKGV2LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDEgJiYgZGF0YVswXS5kYW5fdHlwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBob2Rub3QgeiByYWRrdSBkbyBwb2xpY2VrXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoXCJ6YWtsYWRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF0YVswXS5iYXNlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiZGFuXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGRhdGFbMF0udGF4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImNlbGtlbVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYXRhWzBdLnN1bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5kaWFsb2dzLmFsZXJ0KFwiVGVzdFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG51dG5lIGsgdnVsaSB6bWVuZSBob2Rub3R5XHJcbiAgICAgICAgICAgIHRoYXQucmVjYXBEUEguZWxlbWVudC5vbihcImZpZWxkY2hhbmdlXCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvdGVzdG92YW5pLCB6ZGEgdG8gYnlsbyB2IHJlemltdSBvcHJhdnlcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyaWQgPSAkKHRoYXQucmVjYXBEUEguZmluZChcIi5nZ3JpZFwiKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlQW1vdW50cyA9IGRhdGFbMF0uZGFuX3R5cCA+IDA7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBob2Rub3RhID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hemV2ID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcIm5hbWVcIikgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lRmllbGFkID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICh1cGRhdGVBbW91bnRzICYmIG5hemV2ID09PSBcInN1bVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUZpZWxhZCA9IFwiY2Vsa2VtXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoXCJ6YWtsYWRcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF0YVswXS5iYXNlVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiZGFuXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGRhdGFbMF0udGF4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVwZGF0ZUFtb3VudHMgJiYgbmF6ZXYgPT09IFwidGF4XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lRmllbGFkID0gXCJkYW5cIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcInpha2xhZFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYXRhWzBdLmJhc2VWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGaWVsZHMoXCJjZWxrZW1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF0YVswXS5zdW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodXBkYXRlQW1vdW50cyAmJiBuYXpldiA9PT0gXCJiYXNlVmFsdWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVGaWVsYWQgPSBcInpha2xhZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRmllbGRzKFwiZGFuXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGRhdGFbMF0udGF4KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhcImNlbGtlbVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYXRhWzBdLnN1bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodXBkYXRlQW1vdW50cyAmJiBuYW1lRmllbGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdWxvemVuaSBob2Rub3R5IGRvIHByaXNsdXNuZWhvIHBvbGlja2FcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZpZWxkcyhuYW1lRmllbGFkKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBob2Rub3RhKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmF6ZXY/LmluZGV4T2YoXCJwZXJpb2REUEhcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoKHRoYXQuZmluZEZpZWxkcyhcInBlcmlvZERQSEVuZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA/PyAxOTkwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9udGggPSBOdW1iZXIoKHRoYXQuZmluZEZpZWxkcyhcInBlcmlvZERQSFN0YXJ0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpID8/IDEpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhblNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHllYXIgPCAxOTkwIHx8IHllYXIgPiAyOTk5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5hbGVydChcIkNoeWJuxJsgemFkYW7DoSBob2Rub3RhXCIsIFwiWmFkYWxpIGpzdGUgY2h5Ym5vdSBob2Rub3R1IHJva3UgcHJvIE9iZG9iw60gRFBIIChwb3ZvbGVuw6kgcm96bWV6w60gMTk5MCAtIDI5OTkpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5TZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuYWxlcnQoXCJDaHlibsSbIHphZGFuw6EgaG9kbm90YVwiLCBcIlphZGFsaSBqc3RlIGNoeWJub3UgaG9kbm90dSBtxJtzw61jZSBwcm8gT2Jkb2LDrSBEUEhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhblNldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FuU2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGF0UG9sZT8uZ2ZpZWxkKFwic2V0VmFsdWVcIiwgbmV3IERhdGUoeWVhciwgbW9udGgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKHRoYXQucmVjYXBEUEggYXMgR29yZGljLkdpbi5XZWJDbGllbnQucmVjYXBEUEgpLnJlZnJlc2goKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgdGhhdC5pbmljaWFsaXphY2UoKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmljaWFsaXphY2UgaG9kbm90XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBpbmljaWFsaXphY2UoKSB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gJCh0aGlzLnJlY2FwRFBILmZpbmQoXCIuZ2dyaWRcIikpO1xyXG4gICAgICAgICAgICBncmlkLmdncmlkY2VsbGVkaXRvcihcInN0YXJ0XCIsIHsgcm93OiAwLCBjb2w6IDEgfSk7XHJcbiAgICAgICAgICAgIGlmIChncmlkLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL2xldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy8gICAgZ3JpZC5nZ3JpZGNlbGxlZGl0b3IoXCJzdGFydFwiLCB7IHJvdzogMCwgY29sOiAxIH0pO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy92aWV3LmZpbmRCeUtleSgxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5YmVyIGhvZG5vdHlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgdnliZXJIb2Rub3R5KHR5cFZ5YmVydTogR0VUeXBIb2Rub3R5KSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQ6IEpRdWVyeSA9IHRoYXQucmVjYXBEUEhbXCJncmlkXCJdO1xyXG4gICAgICAgICAgICB0aGF0LnJldHVyblZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTsgXHJcbiAgICAgICAgICAgIGlmICh2aWV3LmdldENvdW50KCkgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAwO1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCAhPT0gMSB8fCByb3dzWzBdLmRhbl90eXAgPD0gMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gcm93c1swXTtcclxuICAgICAgICAgICAgaWYgKHR5cFZ5YmVydSA9PSBHRVR5cEhvZG5vdHkuWmFrbGFkKSB7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBjZWxsID0gZ3JpZC5nZ3JpZChcImFjdGl2ZUNlbGxBZGRyZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgZGF0YSA9IHZpZXcuZ2V0RGF0YVJvd3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSByb3cuYmFzZVZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwVnliZXJ1ID09IEdFVHlwSG9kbm90eS5DZWxrZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcm93LnN1bVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cFZ5YmVydSA9PSBHRVR5cEhvZG5vdHkuRGFuKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvdy50YXhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LnJldHVyblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh0aGF0LnJldHVyblZhbHVlKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn0iXX0=