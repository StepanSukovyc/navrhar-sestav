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
            class IGDetaiUkazatelData {
            }
            WebClient.IGDetaiUkazatelData = IGDetaiUkazatelData;
            class GDetaiUkazatelResult {
            }
            WebClient.GDetaiUkazatelResult = GDetaiUkazatelResult;
            let GDetailUkazatel = class GDetailUkazatel extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.uid = "GDetailDUkazatele#";
                    //// Editovatelny gridu
                    //private editGrid: JQuery;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-ucrUkazatele";
                    this.refresh = false;
                }
                //title = "jres:30250098"; //RC 30250098 : Detail daňové evidence
                prepareContent(options) {
                    if (!options)
                        return;
                    this.init(options);
                    //this.fillform(options.currentRow);
                }
                /*
                 * Inicializace formulare
                 *
                 * */
                init(options) {
                    //if (!options) return;
                    let that = this;
                    that.refresh = false;
                    that.DefinceAkci();
                    // prikazova lista
                    that.commandBar([
                        //{ action: that.actions.actPrednastavit },
                        { action: that.actions.actUlozit },
                        { action: that.actions.actZavrit, primary: true },
                    ]);
                    // definice menu
                    that.menuBar([
                        { action: that.actions.actPrednastavit, favorite: true }
                    ]);
                    that.inputValues = options;
                    //var form = new Gordic.Forms.Form({ layoutDescriptor: "L2M2S1", tabLabel: "", opened: true })
                    //    .addSection() 
                    //    .addRow().addText("jres:30250176", "right w-5") //RC 30250176 : Příjmy
                    //    .addRow("jres:30250178").addField("gnumberbox", "w-6", { disabled: true }) //RC 30250178 : Automatická
                    //    .addRow("jres:30250179").addField("gnumberbox", "w-6", { disabled: true }) //RC 30250179 : Manuální
                    //    .addRow("jres:30250181").addField("gnumberbox", "w-6") //RC 30250181 : Nová
                    //    .addRow("jres:30250180").addField("gnumberbox", "w-6",{ disabled: true }) //RC 30250180 : Aktuální
                    //    .addSection() 
                    //    .addRow().addText("jres:30250177", "right w-5") //RC 30250177 : Výdaje
                    //    .addRow().addField("gnumberbox", "w-6", { disabled: true })
                    //    .addRow().addField("gnumberbox", "w-6", { disabled: true })
                    //    .addRow().addField("gnumberbox", "w-6")
                    //    .addRow().addField("gnumberbox", "w-6", { disabled: true })
                    //    .addSection();
                    //$("<div>").appendTo(this.element).gform("createFrom", form);
                    const grid = $.newDiv(this.classGrid)
                        .css("height", "100%")
                        .appendTo(this.element)
                        .ggrid({
                        //id: "idpredkontacegrid",
                        columnMode: "fit",
                        profileVisible: false,
                        showTopPanel: false,
                        showBottomPanel: false,
                        userSettings: false,
                        multi: false,
                        //rowNumbers: false,
                        marking: false,
                        navigationMode: "cell",
                        customClass: "dphRecap",
                        //rowsEnabled: function (meta) {
                        //    debugger;
                        //    //return true;
                        //    return meta && meta.data && (meta.data.radek === 2
                        //    ) ? true : false;
                        //},
                        data: new Gordic.Data.View(that.getdata(options.currentRow)
                        //[
                        //{ _nazev: "Automatická", radek: 0, prijem: 100, vydej: 120.12 },
                        //{ _nazev: "Manuální", radek: 1, prijem: 100, vydej: 120.12 },
                        //{ _nazev: "Nová", radek: 2, prijem: 0, vydej: 0 },
                        //{ _nazev: "Aktuální", radek: 3, prijem: 102, vydej: 120.12 },
                        //]
                        , { key: "radek" }),
                        columns: that.createCols(),
                    }).ggridcelleditor({
                        change: function (ev, obj) {
                            that.NastaveniAkci();
                        },
                        start: function (ev, obj) { }
                    })
                        .gautofit();
                    grid.ggridcelleditor("start", { row: 2, col: 1 });
                }
                /**
                 * vyplaneni formulare
                 * @param data
                 */
                getdata(data) {
                    //data: new Gordic.Data.View([
                    //    { _nazev: "Automatická", radek: 0, prijem: 100, vydej: 120.12 },
                    //    { _nazev: "Manuální", radek: 1, prijem: 100, vydej: 120.12 },
                    //    { _nazev: "Nová", radek: 2, prijem: 0, vydej: 0 },
                    //    { _nazev: "Aktuální", radek: 3, prijem: 102, vydej: 120.12 },
                    //], { key: "radek" }),
                    //let result: [{}];
                    let manprijem = null;
                    let manavydej = null;
                    if (data.priz_uziv != null && typeof data.priz_uziv !== "undefined" && data.priz_uziv > 0) {
                        manprijem = data.c0;
                        manavydej = data.c1;
                    }
                    var result = [{ _nazev: "Automatická", radek: 0, prijem: data.c0_aut, vydej: data.c1_aut },
                        { _nazev: "Manuální", radek: 1, prijem: manprijem, vydej: manavydej },
                        { _nazev: "Nová", radek: 2, prijem: null, vydej: null },
                        { _nazev: "Manuální", radek: 3, prijem: data.c0, vydej: data.c1 }
                    ];
                    return result;
                }
                /**
                 *  Definice sloupcu
                 *
                 * */
                createCols() {
                    var gridFormat = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "_nazev",
                        caption: "",
                        width: 120,
                        sortable: false,
                        customClass: "ui-disabled",
                    })
                        .addCurrencyColumn({
                        name: "prijem",
                        caption: "jres:30250176", //RC 30250176 : Příjmy
                        sortable: false,
                        width: 130,
                        customClass: function (meta, column, rowIndex, colIndex) {
                            return (rowIndex != 2) ? "ui-disabled right" : "right";
                        },
                        editor: {
                            widget: "gnumberbox",
                            //start: alert("start MD"),
                            options: [
                                Gordic.Prefabs.Number.decimal(2, true), { name: "prijem", customClass: "js-MD" /*, model: "model.c0=value",*/ }
                            ]
                        }
                    })
                        .addCurrencyColumn({
                        name: "vydej",
                        caption: "jres:30250177", //RC 30250177 : Výdaje
                        sortable: false,
                        width: 130,
                        customClass: function (meta, column, rowIndex, colIndex) {
                            return (rowIndex != 2) ? "ui-disabled right" : "right";
                        },
                        editor: {
                            widget: "gnumberbox",
                            options: [
                                Gordic.Prefabs.Number.decimal(2, true), { name: "vydej", customClass: "js-DAL" }
                            ]
                        }
                    });
                    return gridFormat;
                }
                /**
                 * Definice akci
                 * @param that
                 */
                DefinceAkci() {
                    let that = this;
                    that.actions.addRange({
                        actPrednastavit: {
                            caption: "jres:30250182", //RC 30250182 : Přednastavit
                            run: () => {
                                that.Prenastavit();
                            }
                        },
                        actUlozit: Gordic.Eko.Action.actionUlozit({ enabled: false, run: function () { that.Ulozit(); } }),
                        actZavrit: Gordic.Eko.Action.actionZavrit({ enabled: true, run: function () { that.tryClose(); } }),
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
                 * Nacteni zadanych dat
                 *
                 * */
                getNewData() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return { prijem: null, vydej: null };
                    //if (typeof this.editGrid === "undefined")
                    //    return { prijem: null, vydej: null };
                    var dtoSaveDateRow = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                    for (var i = 0; i < dtoSaveDateRow.length; i++) {
                        if (dtoSaveDateRow[i].radek == 2) {
                            return { prijem: dtoSaveDateRow[i].prijem, vydej: dtoSaveDateRow[i].vydej };
                        }
                    }
                    return { prijem: null, vydej: null };
                }
                /**
                 * Ulozit
                 * */
                Ulozit() {
                    var that = this;
                    var data = that.getNewData();
                    if (data.prijem == null || data.vydej == null)
                        return;
                    debugger;
                    that.beginOperation("jres:30250183"); //RC 30250183 : Probíhá ukládání
                    //return
                    that.isl.Ukazatel.update({
                        row: that.inputValues.currentRow, c0: data.prijem, c1: data.vydej, userChange: true,
                        typUlohy: this.inputValues.typUlohy
                    })
                        .get()
                        .then((result) => {
                        // preberu hodnoty
                        //if (!content.otevreniBezSeznamu)
                        //    Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, content.Ixp, true);
                        //debugger;
                        that.refresh = true;
                        that.endOperation();
                        that.showFlash({
                            label: "jres:30250610", //RC 30250610 : Změna provedena
                            state: "success", /*icon: "gi-tick",*/ customClass: "g-state-success", timer: 5000
                        });
                        that.inputValues.currentRow = result;
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("setData", new Gordic.Data.View(that.getdata(result)));
                        //a.updateData(result);
                        //that.tryClose();
                        //return deferrer.resolve();
                    }, (jqXHR, type, obj) => {
                        //debugger;
                        that.endOperation();
                    }).always(() => { that.endOperation(); });
                    ;
                    //LoadData(new GUkazatele(UserProcess).EditAndRead(uka, tbPriEdit.Value, tbVydEdit.Value, true));
                }
                /**
                 * Zmenit rezim
                 *
                 * */
                Prenastavit() {
                    var that = this;
                    var served = false;
                    that.dialogs.messageBox({
                        title: "jres:30250184" //RC 30250184 : Dotaz
                        ,
                        html: "jres:30250185" //RC 30250185 : Opravdu chcete přepnout nápočet stavu ukazatele do automatického režimu?
                        ,
                        buttons: GDlg.mbbYesNo, icon: GDlg.mbiQuestion
                    })
                        .on("yes", function () {
                        that.log.trace("Dotaz - odpoved Ano");
                        served = true;
                        that.beginOperation("jres:30250186"); //RC 30250186 : Probíhá změna režimu
                        that.isl.Ukazatel.update({
                            row: that.inputValues.currentRow, c0: that.inputValues.currentRow.c0_aut, c1: that.inputValues.currentRow.c1_aut, userChange: true,
                            typUlohy: that.inputValues.typUlohy
                        })
                            .get()
                            .then((result) => {
                            // preberu hodnoty
                            //if (!content.otevreniBezSeznamu)
                            //    Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, content.Ixp, true);
                            //debugger;
                            that.showFlash({
                                label: "jres:30250611", //RC 30250611 : Režim přenastaven
                                state: "success", /*icon: "gi-tick",*/ customClass: "g-state-success", timer: 5000
                            });
                            that.endOperation();
                            that.refresh = true;
                            that.tryClose();
                            //return deferrer.resolve();
                        }, (jqXHR, type, obj) => {
                            //debugger;
                            that.endOperation();
                        }).always(() => { that.endOperation(); });
                        ;
                    })
                        .on("close", function () {
                        if (served)
                            return;
                    });
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                NastaveniAkci() {
                    var hodnoty = this.getNewData();
                    this.actions.actUlozit?.update({ enabled: !(typeof hodnoty.prijem === "undefined" || hodnoty.prijem == null || (hodnoty.prijem == this.inputValues.currentRow.c0 && hodnoty.vydej == this.inputValues.currentRow.c1)) });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    return def.resolve({ refresh: typeof that.refresh !== "undefined" && that.refresh === true }).promise();
                }
            };
            GDetailUkazatel = __decorate([
                Decorators.gcontent
            ], GDetailUkazatel);
            WebClient.GDetailUkazatel = GDetailUkazatel;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFVrYXphdGVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEZXRhaWxVa2F6YXRlbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQWlZZjtBQWpZRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FpWW5CO0lBallnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FpWTdCO1FBallvQixXQUFBLFNBQVM7WUFPMUIsTUFBYSxtQkFBbUI7YUFLL0I7WUFMWSw2QkFBbUIsc0JBSy9CLENBQUE7WUFDRCxNQUFhLG9CQUFvQjthQUdoQztZQUhZLDhCQUFvQix1QkFHaEMsQ0FBQTtZQUVELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxZQUFZO2dCQUFqRDs7b0JBQ0ksUUFBRyxHQUFHLG9CQUFvQixDQUFDO29CQUMzQix1QkFBdUI7b0JBQ3ZCLDJCQUEyQjtvQkFDM0I7O3VCQUVHO29CQUNPLGNBQVMsR0FBVyxpQkFBaUIsQ0FBQztvQkFHeEMsWUFBTyxHQUFZLEtBQUssQ0FBQztnQkFtV3JDLENBQUM7Z0JBaldHLGlFQUFpRTtnQkFDakUsY0FBYyxDQUFDLE9BQStCO29CQUUxQyxJQUFJLENBQUMsT0FBTzt3QkFBRSxPQUFPO29CQUVyQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuQixvQ0FBb0M7Z0JBQ3hDLENBQUM7Z0JBQ0Q7OztxQkFHSztnQkFDRSxJQUFJLENBQUMsT0FBK0I7b0JBRXZDLHVCQUF1QjtvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUM7d0JBQ1osMkNBQTJDO3dCQUMzQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMs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LENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1RyxDQUFDO2FBRUosQ0FBQTtZQTdXWSxlQUFlO2dCQUQzQixVQUFVLENBQUMsUUFBUTtlQUNQLGVBQWUsQ0E2VzNCO1lBN1dZLHlCQUFlLGtCQTZXM0IsQ0FBQTtRQUVMLENBQUMsRUFqWW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlZN0I7SUFBRCxDQUFDLEVBallnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFpWW5CO0FBQUQsQ0FBQyxFQWpZUyxNQUFNLEtBQU4sTUFBTSxRQWlZZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR0RldGFpVWthemF0ZWxPcHRpb25zIHtcclxuICAgICAgICBjdXJyZW50Um93OiBVY3QuSW50ZXJmYWNlLkdFa29hdWthRHRvO1xyXG4gICAgICAgIHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgIHZpZXdNb2RlOiBib29sZWFuO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIElHRGV0YWlVa2F6YXRlbERhdGEge1xyXG4gICAgICAgIF9uYXpldjogc3RyaW5nO1xyXG4gICAgICAgIHJhZGVrOiBudW1iZXI7XHJcbiAgICAgICAgcHJpamVtOiBKc29uRGVjaW1hbCB8IG51bGx8dW5kZWZpbmVkO1xyXG4gICAgICAgIHZ5ZGVqOiBKc29uRGVjaW1hbCB8IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpVWthemF0ZWxSZXN1bHQge1xyXG4gICAgICAgIHByaWplbTogSnNvbkRlY2ltYWwgfCBudWxsIHwgdW5kZWZpbmVkIDtcclxuICAgICAgICB2eWRlajogSnNvbkRlY2ltYWwgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsVWthemF0ZWwgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG4gICAgICAgIHVpZCA9IFwiR0RldGFpbERVa2F6YXRlbGUjXCI7XHJcbiAgICAgICAgLy8vLyBFZGl0b3ZhdGVsbnkgZ3JpZHVcclxuICAgICAgICAvL3ByaXZhdGUgZWRpdEdyaWQ6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiB0cmlkYSBncmlkdVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjbGFzc0dyaWQ6IHN0cmluZyA9IFwianMtdWNyVWthemF0ZWxlXCI7XHJcbiAgICAgICAgLy8gdnN0dXBuaSBob2Rub3R5XHJcbiAgICAgICAgcHJpdmF0ZSBpbnB1dFZhbHVlczogSUdEZXRhaVVrYXphdGVsT3B0aW9ucztcclxuICAgICAgICBwcml2YXRlIHJlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy90aXRsZSA9IFwianJlczozMDI1MDA5OFwiOyAvL1JDIDMwMjUwMDk4IDogRGV0YWlsIGRhxYhvdsOpIGV2aWRlbmNlXHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQob3B0aW9uczogSUdEZXRhaVVrYXphdGVsT3B0aW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluaXQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5maWxsZm9ybShvcHRpb25zLmN1cnJlbnRSb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEluaWNpYWxpemFjZSBmb3JtdWxhcmVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBpbml0KG9wdGlvbnM6IElHRGV0YWlVa2F6YXRlbE9wdGlvbnMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vaWYgKCFvcHRpb25zKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5yZWZyZXNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoYXQuRGVmaW5jZUFrY2koKTtcclxuICAgICAgICAgICAgLy8gcHJpa2F6b3ZhIGxpc3RhXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0UHJlZG5hc3Rhdml0IH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFVsb3ppdCB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RaYXZyaXQsIHByaW1hcnk6dHJ1ZSB9LFxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgbWVudVxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQcmVkbmFzdGF2aXQsIGZhdm9yaXRlOiB0cnVlIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoYXQuaW5wdXRWYWx1ZXMgPSBvcHRpb25zO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIsIHRhYkxhYmVsOiBcIlwiLCBvcGVuZWQ6IHRydWUgfSlcclxuXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRTZWN0aW9uKCkgXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coKS5hZGRUZXh0KFwianJlczozMDI1MDE3NlwiLCBcInJpZ2h0IHctNVwiKSAvL1JDIDMwMjUwMTc2IDogUMWZw61qbXlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdyhcImpyZXM6MzAyNTAxNzhcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUgfSkgLy9SQyAzMDI1MDE3OCA6IEF1dG9tYXRpY2vDoVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KFwianJlczozMDI1MDE3OVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSB9KSAvL1JDIDMwMjUwMTc5IDogTWFudcOhbG7DrVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KFwianJlczozMDI1MDE4MVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIikgLy9SQyAzMDI1MDE4MSA6IE5vdsOhXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMTgwXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLHsgZGlzYWJsZWQ6IHRydWUgfSkgLy9SQyAzMDI1MDE4MCA6IEFrdHXDoWxuw61cclxuICAgICAgICAgICAgLy8gICAgLmFkZFNlY3Rpb24oKSBcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdygpLmFkZFRleHQoXCJqcmVzOjMwMjUwMTc3XCIsIFwicmlnaHQgdy01XCIpIC8vUkMgMzAyNTAxNzcgOiBWw71kYWplXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFNlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgIC8vJChcIjxkaXY+XCIpLmFwcGVuZFRvKHRoaXMuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZDogXCJpZHByZWRrb250YWNlZ3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3BQYW5lbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0JvdHRvbVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3Jvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcImNlbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJkcGhSZWNhcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcm93c0VuYWJsZWQ6IGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9yZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gbWV0YSAmJiBtZXRhLmRhdGEgJiYgKG1ldGEuZGF0YS5yYWRlayA9PT0gMlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuZ2V0ZGF0YShvcHRpb25zLmN1cnJlbnRSb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3sgX25hemV2OiBcIkF1dG9tYXRpY2vDoVwiLCByYWRlazogMCwgcHJpamVtOiAxMDAsIHZ5ZGVqOiAxMjAuMTIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy97IF9uYXpldjogXCJNYW51w6FsbsOtXCIsIHJhZGVrOiAxLCBwcmlqZW06IDEwMCwgdnlkZWo6IDEyMC4xMiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3sgX25hemV2OiBcIk5vdsOhXCIsIHJhZGVrOiAyLCBwcmlqZW06IDAsIHZ5ZGVqOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8veyBfbmF6ZXY6IFwiQWt0dcOhbG7DrVwiLCByYWRlazogMywgcHJpamVtOiAxMDIsIHZ5ZGVqOiAxMjAuMTIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwicmFkZWtcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGF0LmNyZWF0ZUNvbHMoKSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5nZ3JpZGNlbGxlZGl0b3Ioe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAsIHN0YXJ0OiBmdW5jdGlvbiAoZXYsIG9iaikgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWRjZWxsZWRpdG9yKFwic3RhcnRcIiwgeyByb3c6Mixjb2w6MSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHZ5cGxhbmVuaSBmb3JtdWxhcmVcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0ZGF0YShkYXRhOiBVY3QuSW50ZXJmYWNlLkdFa29hdWthRHRvKTogYW55IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAvLyAgICB7IF9uYXpldjogXCJBdXRvbWF0aWNrw6FcIiwgcmFkZWs6IDAsIHByaWplbTogMTAwLCB2eWRlajogMTIwLjEyIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgX25hemV2OiBcIk1hbnXDoWxuw61cIiwgcmFkZWs6IDEsIHByaWplbTogMTAwLCB2eWRlajogMTIwLjEyIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgX25hemV2OiBcIk5vdsOhXCIsIHJhZGVrOiAyLCBwcmlqZW06IDAsIHZ5ZGVqOiAwIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgX25hemV2OiBcIkFrdHXDoWxuw61cIiwgcmFkZWs6IDMsIHByaWplbTogMTAyLCB2eWRlajogMTIwLjEyIH0sXHJcbiAgICAgICAgICAgIC8vXSwgeyBrZXk6IFwicmFkZWtcIiB9KSxcclxuICAgICAgICAgICAgLy9sZXQgcmVzdWx0OiBbe31dO1xyXG4gICAgICAgICAgICBsZXQgbWFucHJpamVtOiBKc29uRGVjaW1hbCB8IG51bGwgfCB1bmRlZmluZWQ9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBtYW5hdnlkZWo6IEpzb25EZWNpbWFsIHwgbnVsbCB8IHVuZGVmaW5lZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5wcml6X3V6aXYgIT0gbnVsbCAmJiB0eXBlb2YgZGF0YS5wcml6X3V6aXYgIT09IFwidW5kZWZpbmVkXCIgJiYgZGF0YS5wcml6X3V6aXYgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBtYW5wcmlqZW0gPSBkYXRhLmMwO1xyXG4gICAgICAgICAgICAgICAgbWFuYXZ5ZGVqID0gZGF0YS5jMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFt7IF9uYXpldjogXCJBdXRvbWF0aWNrw6FcIiwgcmFkZWs6IDAsIHByaWplbTogZGF0YS5jMF9hdXQsIHZ5ZGVqOiBkYXRhLmMxX2F1dCB9XHJcbiAgICAgICAgICAgICAgICAsIHsgX25hemV2OiBcIk1hbnXDoWxuw61cIiwgcmFkZWs6IDEsIHByaWplbTogbWFucHJpamVtLCB2eWRlajogbWFuYXZ5ZGVqIH1cclxuICAgICAgICAgICAgICAgICwgeyBfbmF6ZXY6IFwiTm92w6FcIiwgcmFkZWs6IDIsIHByaWplbTogbnVsbCwgdnlkZWo6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgLCB7IF9uYXpldjogXCJNYW51w6FsbsOtXCIsIHJhZGVrOiAzLCBwcmlqZW06IGRhdGEuYzAsIHZ5ZGVqOiBkYXRhLmMxIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBEZWZpbmljZSBzbG91cGN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiX25hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmlqZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNzZcIiwgLy9SQyAzMDI1MDE3NiA6IFDFmcOtam15XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IGZ1bmN0aW9uIChtZXRhLCBjb2x1bW4sIHJvd0luZGV4LCBjb2xJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJvd0luZGV4ICE9IDIpICA/IFwidWktZGlzYWJsZWQgcmlnaHRcIiA6IFwicmlnaHRcIjsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9ICxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnbnVtYmVyYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0OiBhbGVydChcInN0YXJ0IE1EXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLk51bWJlci5kZWNpbWFsKDIsIHRydWUpLCB7IG5hbWU6IFwicHJpamVtXCIsIGN1c3RvbUNsYXNzOiBcImpzLU1EXCIvKiwgbW9kZWw6IFwibW9kZWwuYzA9dmFsdWVcIiwqLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2eWRlalwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE3N1wiLCAvL1JDIDMwMjUwMTc3IDogVsO9ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBmdW5jdGlvbiAobWV0YSwgY29sdW1uLCByb3dJbmRleCwgY29sSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChyb3dJbmRleCAhPSAyKSA/IFwidWktZGlzYWJsZWQgcmlnaHRcIiA6IFwicmlnaHRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5OdW1iZXIuZGVjaW1hbCgyLCB0cnVlKSwgeyBuYW1lOiBcInZ5ZGVqXCIsIGN1c3RvbUNsYXNzOiBcImpzLURBTFwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIGFrY2lcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRGVmaW5jZUFrY2koKSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdFByZWRuYXN0YXZpdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE4MlwiLCAvL1JDIDMwMjUwMTgyIDogUMWZZWRuYXN0YXZpdFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlByZW5hc3Rhdml0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFVsb3ppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVWxveml0KHsgZW5hYmxlZDogZmFsc2UsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LlVsb3ppdCgpO30gfSksXHJcbiAgICAgICAgICAgICAgICBhY3RaYXZyaXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdnJpdCh7IGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnRyeUNsb3NlKCk7IH0gfSksXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmNsYXNzR3JpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSB6YWRhbnljaCBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0TmV3RGF0YSgpOiBHRGV0YWlVa2F6YXRlbFJlc3VsdCB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiB7IHByaWplbTogbnVsbCwgdnlkZWo6IG51bGwgfTtcclxuICAgICAgICAgICAgLy9pZiAodHlwZW9mIHRoaXMuZWRpdEdyaWQgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB7IHByaWplbTogbnVsbCwgdnlkZWo6IG51bGwgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkdG9TYXZlRGF0ZVJvdyA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzPElHRGV0YWlVa2F6YXRlbERhdGE+KGdyaWQpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdG9TYXZlRGF0ZVJvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGR0b1NhdmVEYXRlUm93W2ldLnJhZGVrID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBwcmlqZW06IGR0b1NhdmVEYXRlUm93W2ldLnByaWplbSwgdnlkZWo6IGR0b1NhdmVEYXRlUm93W2ldLnZ5ZGVqIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHsgcHJpamVtOiBudWxsICwgdnlkZWo6IG51bGwgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxveml0IFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBVbG96aXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhhdC5nZXROZXdEYXRhKCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnByaWplbSA9PSBudWxsIHx8IGRhdGEudnlkZWogPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwMTgzXCIpOyAvL1JDIDMwMjUwMTgzIDogUHJvYsOtaMOhIHVrbMOhZMOhbsOtXHJcbiAgICAgICAgICAgIC8vcmV0dXJuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlVrYXphdGVsLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICByb3c6IHRoYXQuaW5wdXRWYWx1ZXMuY3VycmVudFJvdywgYzA6IGRhdGEucHJpamVtLCBjMTogZGF0YS52eWRlaiwgdXNlckNoYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR5cFVsb2h5OiB0aGlzLmlucHV0VmFsdWVzLnR5cFVsb2h5XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG5cclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlYmVydSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKCFjb250ZW50Lm90ZXZyZW5pQmV6U2V6bmFtdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihudWxsLCBjb250ZW50Lkl4cCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAyNTA2MTBcIiwgLy9SQyAzMDI1MDYxMCA6IFptxJtuYSBwcm92ZWRlbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBcInN1Y2Nlc3NcIiwgIC8qaWNvbjogXCJnaS10aWNrXCIsKi8gY3VzdG9tQ2xhc3M6IFwiZy1zdGF0ZS1zdWNjZXNzXCIsIHRpbWVyOiA1MDAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzZXREYXRhXCIsIG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoYXQuZ2V0ZGF0YShyZXN1bHQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYS51cGRhdGVEYXRhKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWZlcnJlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAoanFYSFIsIHR5cGUsIG9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpOyB9KTtcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy9Mb2FkRGF0YShuZXcgR1VrYXphdGVsZShVc2VyUHJvY2VzcykuRWRpdEFuZFJlYWQodWthLCB0YlByaUVkaXQuVmFsdWUsIHRiVnlkRWRpdC5WYWx1ZSwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabWVuaXQgcmV6aW1cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgUHJlbmFzdGF2aXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlcnZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMTg0XCIgLy9SQyAzMDI1MDE4NCA6IERvdGF6XHJcbiAgICAgICAgICAgICAgICAsIGh0bWw6IFwianJlczozMDI1MDE4NVwiIC8vUkMgMzAyNTAxODUgOiBPcHJhdmR1IGNoY2V0ZSBwxZllcG5vdXQgbsOhcG/EjWV0IHN0YXZ1IHVrYXphdGVsZSBkbyBhdXRvbWF0aWNrw6lobyByZcW+aW11P1xyXG4gICAgICAgICAgICAgICAgLCBidXR0b25zOiBHRGxnLm1iYlllc05vLCBpY29uOiBHRGxnLm1iaVF1ZXN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZy50cmFjZShcIkRvdGF6IC0gb2Rwb3ZlZCBBbm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDE4NlwiKTsgLy9SQyAzMDI1MDE4NiA6IFByb2LDrWjDoSB6bcSbbmEgcmXFvmltdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlVrYXphdGVsLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LCBjMDogdGhhdC5pbnB1dFZhbHVlcy5jdXJyZW50Um93LmMwX2F1dCBhcyBhbnksIGMxOiB0aGF0LmlucHV0VmFsdWVzLmN1cnJlbnRSb3cuYzFfYXV0IGFzIGFueSwgdXNlckNoYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHk6IHRoYXQuaW5wdXRWYWx1ZXMudHlwVWxvaHlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmViZXJ1IGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICghY29udGVudC5vdGV2cmVuaUJlelNlem5hbXUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihudWxsLCBjb250ZW50Lkl4cCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAyNTA2MTFcIiwgLy9SQyAzMDI1MDYxMSA6IFJlxb5pbSBwxZllbmFzdGF2ZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IFwic3VjY2Vzc1wiLCAgLyppY29uOiBcImdpLXRpY2tcIiwqLyBjdXN0b21DbGFzczogXCJnLXN0YXRlLXN1Y2Nlc3NcIiwgdGltZXI6IDUwMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVmcmVzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50cnlDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZmVycmVyLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChqcVhIUiwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKTt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBOYXN0YXZlbmlBa2NpKCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBob2Rub3R5ID0gdGhpcy5nZXROZXdEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RVbG96aXQ/LnVwZGF0ZSh7IGVuYWJsZWQ6ICEodHlwZW9mIGhvZG5vdHkucHJpamVtID09PSBcInVuZGVmaW5lZFwiIHx8IGhvZG5vdHkucHJpamVtID09IG51bGwgfHwgKGhvZG5vdHkucHJpamVtID09IHRoaXMuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5jMCAmJiBob2Rub3R5LnZ5ZGVqID09IHRoaXMuaW5wdXRWYWx1ZXMuY3VycmVudFJvdy5jMSkpIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoeyByZWZyZXNoOiB0eXBlb2YgdGhhdC5yZWZyZXNoICE9PSBcInVuZGVmaW5lZFwiICYmIHRoYXQucmVmcmVzaCA9PT0gdHJ1ZSB9KS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSJdfQ==