"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Buc;
    (function (Buc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Úvodní stránka (dashboard)
             *
             * @author vblabla
             * @since 488.1.0.22
             */
            let GDashboard = class GDashboard extends Gordic.GContentBase {
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    that.isl.ZustatekVl.napoctiZusDoTmpPoslVyp({ ikc: "0" }).get()
                        .done(function (ret) {
                        that.retValBankUcty = ret;
                        return ret;
                    });
                    that.gridColumns = that.createGridFormat();
                    //this.loadModuleInfo(); //VB: Volání odebráno z důvodu sjednocení s ostatními EKO moduly
                    this.kpiScoreCardsBUC = [];
                    this.kpiScoreCardsBUCVypisy = [];
                    this.kpiScoreCardsGrid = [];
                    this.kpiTable = [];
                    if (this.TypZobrazeni != true) {
                        // Platební příkazy
                        this.kpiScoreCardsBUC.push(new GObservableObject({
                            id: "prikazy",
                            title: "jres:33140044", //RC 33140044 : Počty příkazů
                            detailsDirection: "vertical",
                            name: "PrikazyItems",
                            details: [
                                {
                                    value: 0,
                                    description: "jres:33140045", //RC 33140045 : Připraveno k proplacení
                                    meaning: "info",
                                    formatter: "G",
                                    visible: true,
                                    action: new GAction({
                                        name: "actReady", run: function (ev, ctx) {
                                            //console.log(ctx);
                                        }
                                    })
                                },
                                {
                                    value: 0,
                                    description: "jres:33140046", //RC 33140046 : Odeslané do banky
                                    meaning: "info",
                                    formatter: "G",
                                    action: new GAction({
                                        name: "actSend",
                                        run: function (ev, ctx) {
                                            console.log(ctx);
                                        }
                                    })
                                },
                                {
                                    value: 0,
                                    description: "jres:33140047", //RC 33140047 : Pozastavené
                                    meaning: "info",
                                    formatter: "G",
                                    action: new GAction({
                                        name: "actStop",
                                        run: function (ev, ctx) {
                                            console.log(ctx);
                                        }
                                    })
                                }
                            ]
                        }));
                        this.kpiScoreCardsBUCVypisy.push(new GObservableObject({
                            id: "vypisy",
                            title: "jres:33140048", //RC 33140048 : Počty výpisů
                            detailsDirection: "vertical",
                            name: "BankVypisyItems",
                            details: [
                                {
                                    value: "?",
                                    description: "jres:33140049", //RC 33140049 : Nevyrovnané
                                    meaning: "info",
                                    formatter: "G",
                                    visible: true,
                                    //action: new GAction({
                                    //    name: "actAll", run:
                                    //        function (ev, ctx) {
                                    //            //console.log(ctx);
                                    //        }
                                    //})
                                },
                                {
                                    value: "?",
                                    description: "jres:33140050", //RC 33140050 : Připravené k párování
                                    meaning: "info",
                                    formatter: "G"
                                    //action: new GAction({
                                    //    name: "actOwner",
                                    //    run: function (ev, ctx) {
                                    //        console.log(ctx);
                                    //    }
                                    //})
                                },
                                {
                                    value: "?",
                                    description: "jres:33140051", //RC 33140051 : Nespárované položky
                                    meaning: "info",
                                    formatter: "G"
                                    //action: new GAction({
                                    //    name: "actOwner",
                                    //    run: function (ev, ctx) {
                                    //        console.log(ctx);
                                    //    }
                                    //})
                                }
                            ]
                        }));
                        this.kpiScoreCardsGrid.push(
                        //that.createGridZustatekBU();
                        new GObservableObject({
                        //title: "Přehled aktuálních zůstaků na bankovních účtech",
                        //: "horizontal",
                        //details: [
                        //    {
                        //        value: that.viewZustatekBU.getDataRows().length,
                        //        description: "Bankovních účtů",
                        //        meaning: "info",
                        //        formatter: "G",
                        //    }
                        //]
                        }));
                        // Bankovní výpisy
                        let poctyKpi2 = [];
                        //this.DostupneKnihyZapoctovychListu.forEach((kniha) => { knihyKpi2.push(that.createKpi2ZapoctoveListy(kniha)); });
                        this.kpiTable.push(new GObservableObject({
                            title: "jres:33140052", //RC 33140052 : Nevyrovnané
                            detailsDirection: "vertical",
                            name: "BankVypisyItems",
                            details: [
                                {
                                    value: "?",
                                    description: "jres:33140052", //RC 33140052 : Nevyrovnané
                                    meaning: "info",
                                    formatter: "G",
                                    visible: true,
                                },
                                {
                                    value: "?",
                                    description: "jres:33140053", //RC 33140053 : Připravené k párování
                                    meaning: "info",
                                    formatter: "G"
                                },
                                {
                                    value: "?",
                                    description: "jres:33140054", //RC 33140054 : Nespárované položky
                                    meaning: "info",
                                    formatter: "G"
                                }
                            ]
                        }), new GObservableObject({
                            title: "jres:33140055", //RC 33140055 : Připravené k párování
                            detailsDirection: "vertical",
                            name: "BankVypisyItems",
                            details: [
                                {
                                    value: "?",
                                    description: "jres:33140056", //RC 33140056 : Nevyrovnané
                                    meaning: "info",
                                    formatter: "G",
                                    visible: true,
                                },
                                {
                                    value: "?",
                                    description: "jres:33140057", //RC 33140057 : Připravené k párování
                                    meaning: "info",
                                    formatter: "G"
                                },
                                {
                                    value: "?",
                                    description: "jres:33140058", //RC 33140058 : Nespárované položky
                                    meaning: "info",
                                    formatter: "G"
                                }
                            ]
                        }), new GObservableObject({
                            title: "jres:33140059", //RC 33140059 : Nespárované položky
                            detailsDirection: "vertical",
                            name: "BankVypisyItems",
                            details: [
                                {
                                    value: "?",
                                    description: "jres:33140060", //RC 33140060 : Nevyrovnané
                                    meaning: "info",
                                    formatter: "G",
                                    visible: true,
                                },
                                {
                                    value: "?",
                                    description: "jres:33140061", //RC 33140061 : Připravené k párování
                                    meaning: "info",
                                    formatter: "G"
                                },
                                {
                                    value: "?",
                                    description: "jres:33140062", //RC 33140062 : Nespárované položky
                                    meaning: "info",
                                    formatter: "G"
                                }
                            ]
                        }));
                    }
                    // panel s prvky
                    let panelData = new Gordic.Data.View([
                        {
                            id: "0",
                            name: "panelScoreCardsBUC",
                            title: "jres:33140063", //RC 33140063 : Platební příkazy
                            //visible: this.jePovolenoUctovani(),
                            zone: 0,
                            mode: "vertical",
                            //mode: BasePanelMode.table,
                            itemTemplate: Gordic.Prefabs.Panels.kpiNewMultiRowTemplate().itemTemplate,
                            //itemTemplate: Gordic.Prefabs.Panels.kpiNewMultiRowTemplate().itemTemplate,
                            //itemTemplate: Gordic.Prefabs.Panels.tableTemplate().itemTemplate,
                            menuParams: [
                                {
                                    icon: "fa-retweet",
                                    action: new GAction({
                                        name: "actRefreshPlatebniPrikazy",
                                        captionVisible: GAction.captionVisibility.never,
                                        //caption: "Aktualizovat",
                                        run: function () {
                                            that.update(true, false);
                                        }
                                    })
                                }
                            ],
                            defaultSelected: false,
                            data: new Gordic.Data.View(this.kpiScoreCardsBUC),
                            //fixedWidth: true,
                            width: 100
                        },
                        {
                            id: "1",
                            name: "panelScoreCardsBUCVypisy",
                            title: "jres:33140064", //RC 33140064 : Bankovní výpisy
                            //visible: this.jePovolenoUctovani(),
                            zone: 1,
                            mode: "vertical",
                            //mode: BasePanelMode.table,
                            itemTemplate: Gordic.Prefabs.Panels.kpiNewMultiRowTemplate().itemTemplate,
                            //itemTemplate: Gordic.Prefabs.Panels.kpiNewMultiRowTemplate().itemTemplate,
                            //itemTemplate: Gordic.Prefabs.Panels.tableTemplate().itemTemplate,
                            menuParams: [
                                {
                                    icon: "fa-retweet",
                                    action: new GAction({
                                        name: "actRefreshBankovniVypisy",
                                        captionVisible: GAction.captionVisibility.never,
                                        //caption: "Aktualizovat",
                                        run: function () {
                                            //To do: aktulizace bank. vypisu
                                        }
                                    })
                                }
                            ],
                            defaultSelected: false,
                            data: new Gordic.Data.View(this.kpiScoreCardsBUCVypisy),
                            ////fixedWidth: true,
                            //width: 150
                        },
                    ] /*, { key: ["id"] }*/);
                    // panel s prvky
                    let panelDataGrid = new Gordic.Data.View([
                        {
                            id: "1",
                            name: "panelGrid",
                            title: "jres:33140065", //RC 33140065 : Zůstatky bankovních účtů
                            //visible: this.jePovolenoUctovani(),
                            zone: 0,
                            mode: "vertical",
                            //mode: BasePanelMode.table,
                            itemTemplate: Gordic.Prefabs.Panels.kpiSimpleTemplate().itemTemplate,
                            //itemTemplate: Gordic.Prefabs.Panels.kpiNewMultiRowTemplate().itemTemplate,
                            //itemTemplate: Gordic.Prefabs.Panels.tableTemplate().itemTemplate,
                            menuParams: [
                                {
                                    icon: "fa-retweet",
                                    action: new GAction({
                                        name: "actRefreshZustatky",
                                        captionVisible: GAction.captionVisibility.never,
                                        //caption: "Aktualizovat",
                                        run: function () {
                                            that.viewZustatekBU.requestData();
                                        },
                                    })
                                }
                            ],
                            defaultSelected: false,
                            data: new Gordic.Data.View(this.kpiScoreCardsGrid), //this.kpiScoreCardsGrid
                            //fixedWidth: true,
                        }
                    ] /*, { key: ["id"] }*/);
                    // přidání do formuláře
                    $.newDiv().appendTo(this.element).gdashboardpanel({
                        data: panelData,
                        layout: "horizontal",
                        title: "",
                        zones: 3,
                        //zonesSettings: [{width:33.3333}, {width: 66.6666}, {width:0}],
                        //fixedWidth: false,
                        sortable: true,
                    });
                    // přidání do formuláře
                    this.dashboardPanelGrid = $.newDiv().appendTo(this.element).css("height", "50px").gdashboardpanel({
                        data: panelDataGrid,
                        layout: "horizontal",
                        title: "",
                        zones: 2,
                        //zonesSettings: [{width:33.3333}, {width: 66.6666}, {width:0}],
                        //fixedWidth: false,
                        sortable: true,
                    });
                    //budoucí naplnění prvků
                    this.update(true, true);
                    this.createGridZustatekBU();
                }
                /**
                * vytvořit grid se zustatky bankovnich uctu
                */
                createGridZustatekBU() {
                    const that = this;
                    that.viewZustatekBU = new Gordic.Isl.View(that.isl.ZustatekVl.list(rq => { return { filters: { /*ikc: "0"*/} }; }));
                    //this.formZustatekBU = $.newDiv().appendTo(this.element).css("left", "30px").css("right", "20px").css("width", "50%");
                    //let Form: Gordic.Forms.Form = new Gordic.Forms.Form({						
                    //    name: "FormZustatekBU",
                    //    layoutDescriptor: "L1M1S1",
                    //    //customClass: "w-6"
                    //});
                    //Form.addSection({ name: "sekceZustatky", label: "jres:33140066", customClass: "w-6", }); //RC 33140066 : Zůstatky bankovních účtů
                    //Form.addSection();
                    ////this.formZustatekBU.gform("createFrom", Form);
                    //$(this.element).findForms("FormZustatekBU").findFormSections("sekceZustatky");
                    //this.gridZustatekBU = $("<div>").css("height", "400px").css("width", "635px").css("left", "20px").css("right", "30px").appendTo(this.element)/*.gautofit()*/.ggrid({
                    this.gridZustatekBU = $.newDiv().css("height", "400px").css("width", "48%").css("left", "20px").css("right", "30px").appendTo(this.element) /*.gautofit()*/.ggrid({
                        name: "gridZustatekBU",
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "full",
                        rowNumbers: true, // fit (defaultne by melo byt toto), full
                        navigationMode: "row",
                        data: that.viewZustatekBU,
                        columns: that.createGridFormat(),
                    }); //.gcover({text: "Načítání zůstatků bankovních účtů"});
                    //budoucí naplnění prvků
                    this.update(true, true);
                }
                /**
                * vytvořit formát sloupců seznamu
                */
                createGridFormat() {
                    var columnsDefinition = new Gordic.Data.GridFormat();
                    columnsDefinition
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:33140067", //RC 33140067 : Název účtu
                        width: 100,
                    })
                        .addTextColumn({
                        name: "bu_vl",
                        caption: "jres:33140068", //RC 33140068 : Číslo účtu
                        width: 120,
                    })
                        .addTextColumn({
                        name: "sk_vl",
                        caption: "jres:33140069", //RC 33140069 : Směr. kód
                        width: 90,
                    })
                        .addCurrencyColumn({
                        name: "nov_zus",
                        caption: "jres:33140070", //RC 33140070 : Zůstatek
                        width: 90,
                        //columnType: "currency",
                        //dataType: "number",
                    })
                        .addDateColumn({
                        name: "dat_zus",
                        caption: "jres:33140071", //RC 33140071 : Datum
                        width: 120,
                    });
                    return columnsDefinition;
                }
                /**
                 * Aktualizace počtů
                 */
                update(prikazy = false, vypisy = false) {
                    if (this.TypZobrazeni == true) {
                        // typ velká KPI
                        // if (this.kpiPlatebniPrikazy[0]?.details[0]?.visible === true) {
                        this.updatePrikazy(this.kpiScoreCardsBUC[0], 0, 1);
                        this.updatePrikazy(this.kpiScoreCardsBUC[0], 1, 1);
                        this.updatePrikazy(this.kpiScoreCardsBUC[0], 2, 1);
                        //}
                    }
                    else {
                        // typ malý seznam
                        //if (this.kpiPlatebniPrikazy[0]?.details[0]?.visible === true) {
                        this.updatePrikazy(this.kpiScoreCardsBUC[0], 0, 1);
                        this.updatePrikazy(this.kpiScoreCardsBUC[0], 1, 1);
                        this.updatePrikazy(this.kpiScoreCardsBUC[0], 2, 1);
                        //}
                    }
                }
                /**
                 * Aktualizace prvku pro Příkazy
                 *
                 * @param {GObservableObject<any | GKpiItemOptions>} kpi prvek
                 * @param {number | null} numDetail pořadové číslo (pro typ zobrazení seznam) nebo null (pro typ zobrazení velká KPI)
                 * @param {Gordic.Buc.Globals.Enums.TypPrikazu} typPrikazu typ příkazu
                 */
                updatePrikazy(kpi, numDetail, typPrikazu) {
                    let that = this;
                    // vymazání počtu
                    this.setValue(kpi, 0, null);
                    this.setValue(kpi, 1, null);
                    this.setValue(kpi, 2, null);
                    if (numDetail == 0) {
                        /*Gordic.Isl*/ this.isl.Prikaz.listCount(rq => {
                            return {
                                filters: {
                                    s_uhrp: 10
                                }
                            };
                        })
                            .get()
                            .done(function (response) {
                            // aktualizace počtu
                            that.setValue(kpi, numDetail, response);
                        });
                    }
                    if (numDetail == 1) {
                        /*Gordic.Isl*/ this.isl.Prikaz.listCount(rq => {
                            return {
                                filters: {
                                    s_uhrp: 25
                                }
                            };
                        })
                            .get()
                            .done(function (response) {
                            // aktualizace počtu
                            that.setValue(kpi, numDetail, response);
                        });
                    }
                    if (numDetail == 2) {
                        /*Gordic.Isl*/ this.isl.Prikaz.listCount(rq => {
                            return {
                                filters: {
                                    s_uhrp: 22
                                }
                            };
                        })
                            .get()
                            .done(function (response) {
                            // aktualizace počtu
                            that.setValue(kpi, numDetail, response);
                        });
                    }
                }
                /**
                 * Nastavení hodnoty prvku
                 *
                 * @param {GObservableObject<any | GKpiItemOptions>} kpi prvek
                 * @param {number | null} numDetail pořadové číslo (pro typ zobrazení seznam) nebo null (pro typ zobrazení velká KPI)
                 * @param {number | null} value hodnota
                 */
                setValue(kpi, numDetail, value) {
                    // v zobrazení malý seznam není možné nastavit prvek bez indexu
                    if (this.TypZobrazeni === false && numDetail === null)
                        return;
                    if (value === null) {
                        // prázdná (počáteční) hodnota
                        if (this.TypZobrazeni === true) {
                            kpi.value = null;
                            //kpi.bigValue = null;
                            kpi.icon = "gi-question";
                        }
                        else {
                            //kpi.value = "?";
                            //kpi.meaning = "neutral";
                            kpi.details[numDetail].value = "?";
                            kpi.details[numDetail].meaning = "neutral";
                        }
                    }
                    else {
                        // číselná hodnota
                        if (this.TypZobrazeni === true) {
                            if (value > 0) {
                                kpi.value = value;
                                //kpi.bigValue = value;
                                kpi.icon = null;
                            }
                            else {
                                kpi.value = null /*0*/;
                                //kpi.bigValue = null/*0*/;
                                kpi.icon = "gi-minus-small" /*"gi-minus"*/;
                            }
                        }
                        else {
                            if (value > 0) {
                                //kpi.value = value;
                                //kpi.meaning = "info";
                                kpi.details[numDetail].value = value;
                                kpi.details[numDetail].meaning = "info";
                            }
                            else {
                                //kpi.value = "-"/*0*/;
                                //kpi.meaning = "neutral";
                                kpi.details[numDetail].value = "-" /*0*/;
                                kpi.details[numDetail].meaning = "neutral";
                            }
                        }
                    }
                    kpi.update();
                }
                /** načíst informace o modulu */
                loadModuleInfo() {
                    var i = 0;
                    var result = [];
                    var secondaryText = this.NazevRef + " | " + this.NazevFun + " | " + "Poslední přihlášení" + ": " + this.DatLoginTxt;
                    result.push(new GObservableObject({
                        name: "kpiLastUsed" + "_" + i,
                        image: Gordic.Utils.IconBuilder.defaultInst.createModuleIcon("GWABUC05"),
                        primaryText: "jres:33140072", //RC 33140072 : Komunikace s bankou
                        secondaryText: secondaryText,
                    }));
                    this.moduleInfoItems = new Gordic.Data.View([{
                            id: "moduleInfo",
                            //title: "", //RC 32000140 : Modul
                            zone: 1,
                            mode: "vertical",
                            itemTemplate: Gordic.Prefabs.Panels.kpiImageTwoRowsTextTemplate().itemTemplate,
                            defaultSelected: false,
                            data: new Gordic.Data.View(result)
                        }], { key: ["id"] });
                    $.newDiv().appendTo(this.element).gdashboardpanel({
                        data: this.moduleInfoItems,
                        layout: "horizontal",
                        //title: " ",
                        sortable: true,
                    });
                }
            };
            GDashboard = __decorate([
                gcontent
            ], GDashboard);
            WebClient.GDashboard = GDashboard;
        })(WebClient = Buc.WebClient || (Buc.WebClient = {}));
    })(Buc = Gordic.Buc || (Gordic.Buc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0Rhc2hib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdEYXNoYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQStwQmY7QUEvcEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQStwQm5CO0lBL3BCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBK3BCN0I7UUEvcEJvQixXQUFBLFNBQVM7WUFDMUIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUVuQzs7Ozs7ZUFLRztZQUVILElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVcsU0FBUSxPQUFBLFlBQVk7Z0JBNkR4Qzs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRTt5QkFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRzt3QkFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQzt3QkFDMUIsT0FBTyxHQUFHLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDM0MseUZBQXlGO29CQUN6RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO29CQUMzQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFJbkIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRSxDQUFDO3dCQUM1QixtQkFBbUI7d0JBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FB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c3BhY2UgR29yZGljLkJ1Yy5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIMOadm9kbsOtIHN0csOhbmthIChkYXNoYm9hcmQpXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdmJsYWJsYVxyXG4gICAgICogQHNpbmNlIDQ4OC4xLjAuMjJcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0Rhc2hib2FyZCBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW9kdWxlSW5mb0l0ZW1zOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBOYXpldlJlZjogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgTmF6ZXZGdW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIERhdExvZ2luVHh0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHBydmt5IHBybyBwb8SNdHkgcGxhdGVibsOtY2ggcMWZw61rYXrFr1xyXG4gICAgICAgICAqIEB0eXBlIHtHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBrcGlTY29yZUNhcmRzQlVDOiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W107XHJcblxyXG4gICAgICAgIHByaXZhdGUga3BpU2NvcmVDYXJkc0JVQ1Z5cGlzeTogR09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPltdO1xyXG5cclxuICAgICAgICBwcml2YXRlIGtwaVNjb3JlQ2FyZHNHcmlkOiBHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W107XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmV0VmFsQmFua1VjdHk6IGFueTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcHJ2a3kgcHJvIHBvxI10eSBiYW5rb3Zuw61jaCB2w71waXPFr1xyXG4gICAgICAgICAqIEB0eXBlIHtHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+W119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBrcGlUYWJsZTogR09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPltdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGVsZW1lbnQgZm9ybXVsYXJlIHBybyBzZXpuYW0genVzdGF0a3UgYmFua292bmljaCB1Y3R1XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGZvcm1adXN0YXRla0JVOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBkYXNoYm9hcmRQYW5lbEdyaWRcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5PEhUTUxFbGVtZW50Pn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRhc2hib2FyZFBhbmVsR3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBlbGVtZW50IHNlem5hbXUgcHJvIHp1c3RhdGt5IGJhbmtvdm5pY2ggdWN0dVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkWnVzdGF0ZWtCVTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkQ29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaXNsIHZpZXcgZ3JpZHUgc2UgenVzdGF0a3kgQlVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHZpZXdadXN0YXRla0JVOiBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkJ1Yy5JbnRlcmZhY2UuR1p1c3RhdGVrVmxEdG8+O1xyXG5cclxuICAgICAgICAvLyB2bGFzdG5vc3RpIHogQyNcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHlwIHpvYnJhemVuw60gKHRydWUgPSB2ZWxrw6EgS1BJLCBmYWxzZSA9IG1hbMO9IHNlem5hbSlcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVHlwWm9icmF6ZW5pOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWRlZmlub3bDoW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5adXN0YXRla1ZsLm5hcG9jdGladXNEb1RtcFBvc2xWeXAoeyBpa2M6IFwiMFwiIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXRWYWxCYW5rVWN0eSA9IHJldDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZENvbHVtbnMgPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgLy90aGlzLmxvYWRNb2R1bGVJbmZvKCk7IC8vVkI6IFZvbMOhbsOtIG9kZWJyw6FubyB6IGTFr3ZvZHUgc2plZG5vY2Vuw60gcyBvc3RhdG7DrW1pIEVLTyBtb2R1bHlcclxuICAgICAgICAgICAgdGhpcy5rcGlTY29yZUNhcmRzQlVDID0gW107XHJcbiAgICAgICAgICAgIHRoaXMua3BpU2NvcmVDYXJkc0JVQ1Z5cGlzeSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmtwaVNjb3JlQ2FyZHNHcmlkID0gW107XHJcbiAgICAgICAgICAgIHRoaXMua3BpVGFibGUgPSBbXTtcclxuICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuVHlwWm9icmF6ZW5pICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFBsYXRlYm7DrSBwxZnDrWthenlcclxuICAgICAgICAgICAgICAgIHRoaXMua3BpU2NvcmVDYXJkc0JVQy5wdXNoKCBcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwcmlrYXp5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwNDRcIiwgLy9SQyAzMzE0MDA0NCA6IFBvxI10eSBwxZnDrWthesWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJQcmlrYXp5SXRlbXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzMxNDAwNDVcIiwgLy9SQyAzMzE0MDA0NSA6IFDFmWlwcmF2ZW5vIGsgcHJvcGxhY2Vuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UmVhZHlcIiwgcnVuOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzE0MDA0NlwiLCAvL1JDIDMzMTQwMDQ2IDogT2Rlc2xhbsOpIGRvIGJhbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTZW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzMTQwMDQ3XCIsIC8vUkMgMzMxNDAwNDcgOiBQb3phc3RhdmVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFN0b3BcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtwaVNjb3JlQ2FyZHNCVUNWeXBpc3kucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ2eXBpc3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzE0MDA0OFwiLCAvL1JDIDMzMTQwMDQ4IDogUG/EjXR5IHbDvXBpc8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJCYW5rVnlwaXN5SXRlbXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzMTQwMDQ5XCIsIC8vUkMgMzMxNDAwNDkgOiBOZXZ5cm92bmFuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJhY3RBbGxcIiwgcnVuOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzE0MDA1MFwiLCAvL1JDIDMzMTQwMDUwIDogUMWZaXByYXZlbsOpIGsgcMOhcm92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImFjdE93bmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyhjdHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzMTQwMDUxXCIsIC8vUkMgMzMxNDAwNTEgOiBOZXNww6Fyb3ZhbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJhY3RPd25lclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coY3R4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmtwaVNjb3JlQ2FyZHNHcmlkLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmNyZWF0ZUdyaWRadXN0YXRla0JVKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aXRsZTogXCJQxZllaGxlZCBha3R1w6FsbsOtY2ggesWvc3Rha8WvIG5hIGJhbmtvdm7DrWNoIMO6xI10ZWNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vOiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXRhaWxzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbHVlOiB0aGF0LnZpZXdadXN0YXRla0JVLmdldERhdGFSb3dzKCkubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZGVzY3JpcHRpb246IFwiQmFua292bsOtY2ggw7rEjXTFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJhbmtvdm7DrSB2w71waXN5XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9jdHlLcGkyOiBHS3BpSXRlbU9wdGlvbnNbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLkRvc3R1cG5lS25paHlaYXBvY3RvdnljaExpc3R1LmZvckVhY2goKGtuaWhhKSA9PiB7IGtuaWh5S3BpMi5wdXNoKHRoYXQuY3JlYXRlS3BpMlphcG9jdG92ZUxpc3R5KGtuaWhhKSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rcGlUYWJsZS5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwNTJcIiwgLy9SQyAzMzE0MDA1MiA6IE5ldnlyb3ZuYW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzRGlyZWN0aW9uOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQmFua1Z5cGlzeUl0ZW1zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzMxNDAwNTJcIiwgLy9SQyAzMzE0MDA1MiA6IE5ldnlyb3ZuYW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJHXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzMxNDAwNTNcIiwgLy9SQyAzMzE0MDA1MyA6IFDFmWlwcmF2ZW7DqSBrIHDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBcIkdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCI/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzE0MDA1NFwiLCAvL1JDIDMzMTQwMDU0IDogTmVzcMOhcm92YW7DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJHXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHT2JzZXJ2YWJsZU9iamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwNTVcIiwgLy9SQyAzMzE0MDA1NSA6IFDFmWlwcmF2ZW7DqSBrIHDDoXJvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJCYW5rVnlwaXN5SXRlbXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzMTQwMDU2XCIsIC8vUkMgMzMxNDAwNTYgOiBOZXZ5cm92bmFuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzMTQwMDU3XCIsIC8vUkMgMzMxNDAwNTcgOiBQxZlpcHJhdmVuw6kgayBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJHXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzMxNDAwNThcIiwgLy9SQyAzMzE0MDA1OCA6IE5lc3DDoXJvdmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgR09ic2VydmFibGVPYmplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzMTQwMDU5XCIsIC8vUkMgMzMxNDAwNTkgOiBOZXNww6Fyb3ZhbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNEaXJlY3Rpb246IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJCYW5rVnlwaXN5SXRlbXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzMTQwMDYwXCIsIC8vUkMgMzMxNDAwNjAgOiBOZXZ5cm92bmFuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIj9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzMTQwMDYxXCIsIC8vUkMgMzMxNDAwNjEgOiBQxZlpcHJhdmVuw6kgayBww6Fyb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogXCJHXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzMxNDAwNjJcIiwgLy9SQyAzMzE0MDA2MiA6IE5lc3DDoXJvdmFuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IFwiR1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gcGFuZWwgcyBwcnZreVxyXG4gICAgICAgICAgICBsZXQgcGFuZWxEYXRhID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhbmVsU2NvcmVDYXJkc0JVQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwNjNcIiwgLy9SQyAzMzE0MDA2MyA6IFBsYXRlYm7DrSBwxZnDrWthenlcclxuICAgICAgICAgICAgICAgICAgICAvL3Zpc2libGU6IHRoaXMuamVQb3ZvbGVub1VjdG92YW5pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgem9uZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBcInZlcnRpY2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlOiBCYXNlUGFuZWxNb2RlLnRhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaU5ld011bHRpUm93VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlOZXdNdWx0aVJvd1RlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMudGFibGVUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51UGFyYW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtcmV0d2VldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RSZWZyZXNoUGxhdGVibmlQcmlrYXp5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IEdBY3Rpb24uY2FwdGlvblZpc2liaWxpdHkubmV2ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBcIkFrdHVhbGl6b3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZSh0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNlbGVjdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyh0aGlzLmtwaVNjb3JlQ2FyZHNCVUMpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjFcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhbmVsU2NvcmVDYXJkc0JVQ1Z5cGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwNjRcIiwgLy9SQyAzMzE0MDA2NCA6IEJhbmtvdm7DrSB2w71waXN5XHJcbiAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlOiB0aGlzLmplUG92b2xlbm9VY3RvdmFuaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZTogQmFzZVBhbmVsTW9kZS50YWJsZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlOZXdNdWx0aVJvd1RlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpTmV3TXVsdGlSb3dUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2l0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLnRhYmxlVGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVBhcmFtczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLXJldHdlZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UmVmcmVzaEJhbmtvdm5pVnlwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IEdBY3Rpb24uY2FwdGlvblZpc2liaWxpdHkubmV2ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBcIkFrdHVhbGl6b3ZhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RvIGRvOiBha3R1bGl6YWNlIGJhbmsuIHZ5cGlzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhpcy5rcGlTY29yZUNhcmRzQlVDVnlwaXN5KSxcclxuICAgICAgICAgICAgICAgICAgICAvLy8vZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiAxNTBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0vKiwgeyBrZXk6IFtcImlkXCJdIH0qLyk7XHJcblxyXG4gICAgICAgICAgICAvLyBwYW5lbCBzIHBydmt5XHJcbiAgICAgICAgICAgIGxldCBwYW5lbERhdGFHcmlkID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIjFcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBhbmVsR3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzMxNDAwNjVcIiwgLy9SQyAzMzE0MDA2NSA6IFrFr3N0YXRreSBiYW5rb3Zuw61jaCDDusSNdMWvXHJcbiAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlOiB0aGlzLmplUG92b2xlbm9VY3RvdmFuaSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHpvbmU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbW9kZTogQmFzZVBhbmVsTW9kZS50YWJsZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlTaW1wbGVUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2l0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaU5ld011bHRpUm93VGVtcGxhdGUoKS5pdGVtVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy50YWJsZVRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVQYXJhbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZXR3ZWV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFJlZnJlc2hadXN0YXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBHQWN0aW9uLmNhcHRpb25WaXNpYmlsaXR5Lm5ldmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJBa3R1YWxpem92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3WnVzdGF0ZWtCVS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2VsZWN0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHRoaXMua3BpU2NvcmVDYXJkc0dyaWQpLCAgLy90aGlzLmtwaVNjb3JlQ2FyZHNHcmlkXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXS8qLCB7IGtleTogW1wiaWRcIl0gfSovKTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGRvIGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZGFzaGJvYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTogcGFuZWxEYXRhLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgem9uZXM6IDMsXHJcbiAgICAgICAgICAgICAgICAvL3pvbmVzU2V0dGluZ3M6IFt7d2lkdGg6MzMuMzMzM30sIHt3aWR0aDogNjYuNjY2Nn0sIHt3aWR0aDowfV0sXHJcbiAgICAgICAgICAgICAgICAvL2ZpeGVkV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBkbyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICB0aGlzLmRhc2hib2FyZFBhbmVsR3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5jc3MoXCJoZWlnaHRcIiwgXCI1MHB4XCIpLmdkYXNoYm9hcmRwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwYW5lbERhdGFHcmlkLFxyXG4gICAgICAgICAgICAgICAgbGF5b3V0OiBcImhvcml6b250YWxcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgem9uZXM6IDIsXHJcbiAgICAgICAgICAgICAgICAvL3pvbmVzU2V0dGluZ3M6IFt7d2lkdGg6MzMuMzMzM30sIHt3aWR0aDogNjYuNjY2Nn0sIHt3aWR0aDowfV0sXHJcbiAgICAgICAgICAgICAgICAvL2ZpeGVkV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vYnVkb3Vjw60gbmFwbG7Em27DrSBwcnZrxa9cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWRadXN0YXRla0JVKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiB2eXR2b8WZaXQgZ3JpZCBzZSB6dXN0YXRreSBiYW5rb3ZuaWNoIHVjdHVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZFp1c3RhdGVrQlUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnZpZXdadXN0YXRla0JVID0gbmV3IEdvcmRpYy5Jc2wuVmlldyh0aGF0LmlzbC5adXN0YXRla1ZsLmxpc3QocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IC8qaWtjOiBcIjBcIiovIH0gfSB9KSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5mb3JtWnVzdGF0ZWtCVSA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5jc3MoXCJsZWZ0XCIsIFwiMzBweFwiKS5jc3MoXCJyaWdodFwiLCBcIjIwcHhcIikuY3NzKFwid2lkdGhcIiwgXCI1MCVcIik7XHJcbiAgICAgICAgICAgIC8vbGV0IEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcdFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJGb3JtWnVzdGF0ZWtCVVwiLFxyXG4gICAgICAgICAgICAvLyAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiLFxyXG4gICAgICAgICAgICAvLyAgICAvL2N1c3RvbUNsYXNzOiBcInctNlwiXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIC8vRm9ybS5hZGRTZWN0aW9uKHsgbmFtZTogXCJzZWtjZVp1c3RhdGt5XCIsIGxhYmVsOiBcImpyZXM6MzMxNDAwNjZcIiwgY3VzdG9tQ2xhc3M6IFwidy02XCIsIH0pOyAvL1JDIDMzMTQwMDY2IDogWsWvc3RhdGt5IGJhbmtvdm7DrWNoIMO6xI10xa9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vRm9ybS5hZGRTZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmZvcm1adXN0YXRla0JVLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBGb3JtKTtcclxuICAgICAgICAgICAgLy8kKHRoaXMuZWxlbWVudCkuZmluZEZvcm1zKFwiRm9ybVp1c3RhdGVrQlVcIikuZmluZEZvcm1TZWN0aW9ucyhcInNla2NlWnVzdGF0a3lcIik7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuZ3JpZFp1c3RhdGVrQlUgPSAkKFwiPGRpdj5cIikuY3NzKFwiaGVpZ2h0XCIsIFwiNDAwcHhcIikuY3NzKFwid2lkdGhcIiwgXCI2MzVweFwiKS5jc3MoXCJsZWZ0XCIsIFwiMjBweFwiKS5jc3MoXCJyaWdodFwiLCBcIjMwcHhcIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS8qLmdhdXRvZml0KCkqLy5nZ3JpZCh7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZFp1c3RhdGVrQlUgPSAkLm5ld0RpdigpLmNzcyhcImhlaWdodFwiLCBcIjQwMHB4XCIpLmNzcyhcIndpZHRoXCIsIFwiNDglXCIpLmNzcyhcImxlZnRcIiwgXCIyMHB4XCIpLmNzcyhcInJpZ2h0XCIsIFwiMzBweFwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLyouZ2F1dG9maXQoKSovLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFp1c3RhdGVrQlVcIixcclxuICAgICAgICAgICAgICAgIHJlbmRlck1vZGU6IFwiYXV0b1wiLFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gYXV0bywgYWxsLWF0LW9uY2UsIHBhZ2VkLXN5bmMsIHBhZ2VkLWFzeW5jXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IHRydWUsLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBcInJvd1wiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhhdC52aWV3WnVzdGF0ZWtCVSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICB9KS8vLmdjb3Zlcih7dGV4dDogXCJOYcSNw610w6Fuw60gesWvc3RhdGvFryBiYW5rb3Zuw61jaCDDusSNdMWvXCJ9KTtcclxuXHJcbiAgICAgICAgICAgIC8vYnVkb3Vjw60gbmFwbG7Em27DrSBwcnZrxa9cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIHZ5dHZvxZlpdCBmb3Jtw6F0IHNsb3VwY8WvIHNlem5hbXVcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zRGVmaW5pdGlvbiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICBjb2x1bW5zRGVmaW5pdGlvblxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMxNDAwNjdcIiwgLy9SQyAzMzE0MDA2NyA6IE7DoXpldiDDusSNdHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1X3ZsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDY4XCIsIC8vUkMgMzMxNDAwNjggOiDEjMOtc2xvIMO6xI10dVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2tfdmxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzMxNDAwNjlcIiwgLy9SQyAzMzE0MDA2OSA6IFNtxJtyLiBrw7NkXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJub3ZfenVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDcwXCIsIC8vUkMgMzMxNDAwNzAgOiBaxa9zdGF0ZWtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2x1bW5UeXBlOiBcImN1cnJlbmN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kYXRhVHlwZTogXCJudW1iZXJcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfenVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzMTQwMDcxXCIsIC8vUkMgMzMxNDAwNzEgOiBEYXR1bVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbnNEZWZpbml0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgcG/EjXTFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlKHByaWthenk6IGJvb2xlYW4gPSBmYWxzZSwgdnlwaXN5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVHlwWm9icmF6ZW5pID09IHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0eXAgdmVsa8OhIEtQSVxyXG4gICAgICAgICAgICAgICAvLyBpZiAodGhpcy5rcGlQbGF0ZWJuaVByaWthenlbMF0/LmRldGFpbHNbMF0/LnZpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJpa2F6eSh0aGlzLmtwaVNjb3JlQ2FyZHNCVUNbMF0sIDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcmlrYXp5KHRoaXMua3BpU2NvcmVDYXJkc0JVQ1swXSwgMSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVByaWthenkodGhpcy5rcGlTY29yZUNhcmRzQlVDWzBdLCAyLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHR5cCBtYWzDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMua3BpUGxhdGVibmlQcmlrYXp5WzBdPy5kZXRhaWxzWzBdPy52aXNpYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVByaWthenkodGhpcy5rcGlTY29yZUNhcmRzQlVDWzBdLCAwLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJpa2F6eSh0aGlzLmtwaVNjb3JlQ2FyZHNCVUNbMF0sIDEsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcmlrYXp5KHRoaXMua3BpU2NvcmVDYXJkc0JVQ1swXSwgMiwgMSk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1YWxpemFjZSBwcnZrdSBwcm8gUMWZw61rYXp5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHT2JzZXJ2YWJsZU9iamVjdDxhbnkgfCBHS3BpSXRlbU9wdGlvbnM+fSBrcGkgcHJ2ZWtcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bGx9IG51bURldGFpbCBwb8WZYWRvdsOpIMSNw61zbG8gKHBybyB0eXAgem9icmF6ZW7DrSBzZXpuYW0pIG5lYm8gbnVsbCAocHJvIHR5cCB6b2JyYXplbsOtIHZlbGvDoSBLUEkpXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuQnVjLkdsb2JhbHMuRW51bXMuVHlwUHJpa2F6dX0gdHlwUHJpa2F6dSB0eXAgcMWZw61rYXp1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVQcmlrYXp5KGtwaTogR09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPiwgbnVtRGV0YWlsOiBudW1iZXIgfCBudWxsLCB0eXBQcmlrYXp1OiBHb3JkaWMuQnVjLkdsb2JhbHMuRW51bXMuVHlwUHJpa2F6dSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIHZ5bWF6w6Fuw60gcG/EjXR1XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUoa3BpLCAwLCBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShrcGksIDEsIG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKGtwaSwgMiwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmIChudW1EZXRhaWwgPT0gMCkge1xyXG4gICAgICAgICAgICAvKkdvcmRpYy5Jc2wqL3RoaXMuaXNsLlByaWthei5saXN0Q291bnQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNfdWhycDogMTBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBwb8SNdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShrcGksIG51bURldGFpbCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChudW1EZXRhaWwgPT0gMSkge1xyXG4gICAgICAgICAgICAvKkdvcmRpYy5Jc2wqL3RoaXMuaXNsLlByaWthei5saXN0Q291bnQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNfdWhycDogMjVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBwb8SNdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShrcGksIG51bURldGFpbCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChudW1EZXRhaWwgPT0gMikge1xyXG4gICAgICAgICAgICAvKkdvcmRpYy5Jc2wqL3RoaXMuaXNsLlByaWthei5saXN0Q291bnQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNfdWhycDogMjJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBwb8SNdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShrcGksIG51bURldGFpbCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIGhvZG5vdHkgcHJ2a3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dPYnNlcnZhYmxlT2JqZWN0PGFueSB8IEdLcGlJdGVtT3B0aW9ucz59IGtwaSBwcnZla1xyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgbnVsbH0gbnVtRGV0YWlsIHBvxZlhZG92w6kgxI3DrXNsbyAocHJvIHR5cCB6b2JyYXplbsOtIHNlem5hbSkgbmVibyBudWxsIChwcm8gdHlwIHpvYnJhemVuw60gdmVsa8OhIEtQSSlcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlciB8IG51bGx9IHZhbHVlIGhvZG5vdGFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldFZhbHVlKGtwaTogR09ic2VydmFibGVPYmplY3Q8YW55IHwgR0twaUl0ZW1PcHRpb25zPiwgbnVtRGV0YWlsOiBudW1iZXIgfCBudWxsLCB2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyB2IHpvYnJhemVuw60gbWFsw70gc2V6bmFtIG5lbsOtIG1vxb5uw6kgbmFzdGF2aXQgcHJ2ZWsgYmV6IGluZGV4dVxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBab2JyYXplbmkgPT09IGZhbHNlICYmIG51bURldGFpbCA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwcsOhemRuw6EgKHBvxI3DoXRlxI1uw60pIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFpvYnJhemVuaSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaS52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9rcGkuYmlnVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGtwaS5pY29uID0gXCJnaS1xdWVzdGlvblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9rcGkudmFsdWUgPSBcIj9cIjtcclxuICAgICAgICAgICAgICAgICAgICAvL2twaS5tZWFuaW5nID0gXCJuZXV0cmFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0udmFsdWUgPSBcIj9cIjtcclxuICAgICAgICAgICAgICAgICAgICBrcGkuZGV0YWlsc1tudW1EZXRhaWwhXS5tZWFuaW5nID0gXCJuZXV0cmFsXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDEjcOtc2VsbsOhIGhvZG5vdGFcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFpvYnJhemVuaSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va3BpLmJpZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtwaS5pY29uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtwaS52YWx1ZSA9IG51bGwvKjAqLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rcGkuYmlnVmFsdWUgPSBudWxsLyowKi87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtwaS5pY29uID0gXCJnaS1taW51cy1zbWFsbFwiLypcImdpLW1pbnVzXCIqLztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va3BpLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8va3BpLm1lYW5pbmcgPSBcImluZm9cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0ubWVhbmluZyA9IFwiaW5mb1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9rcGkudmFsdWUgPSBcIi1cIi8qMCovO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2twaS5tZWFuaW5nID0gXCJuZXV0cmFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtwaS5kZXRhaWxzW251bURldGFpbCFdLnZhbHVlID0gXCItXCIvKjAqLztcclxuICAgICAgICAgICAgICAgICAgICAgICAga3BpLmRldGFpbHNbbnVtRGV0YWlsIV0ubWVhbmluZyA9IFwibmV1dHJhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrcGkudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogbmHEjcOtc3QgaW5mb3JtYWNlIG8gbW9kdWx1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkTW9kdWxlSW5mbygpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIHNlY29uZGFyeVRleHQgPSB0aGlzLk5hemV2UmVmICsgXCIgfCBcIiArIHRoaXMuTmF6ZXZGdW4gKyBcIiB8IFwiICsgXCJQb3NsZWRuw60gcMWZaWhsw6HFoWVuw61cIiArIFwiOiBcIiArIHRoaXMuRGF0TG9naW5UeHQ7IFxyXG5cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IEdPYnNlcnZhYmxlT2JqZWN0KHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpTGFzdFVzZWRcIiArIFwiX1wiICsgaSxcclxuICAgICAgICAgICAgICAgIGltYWdlOiBHb3JkaWMuVXRpbHMuSWNvbkJ1aWxkZXIuZGVmYXVsdEluc3QuY3JlYXRlTW9kdWxlSWNvbihcIkdXQUJVQzA1XCIpLFxyXG4gICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ6IFwianJlczozMzE0MDA3MlwiLCAgLy9SQyAzMzE0MDA3MiA6IEtvbXVuaWthY2UgcyBiYW5rb3VcclxuICAgICAgICAgICAgICAgIHNlY29uZGFyeVRleHQ6IHNlY29uZGFyeVRleHQsXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubW9kdWxlSW5mb0l0ZW1zID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoW3tcclxuICAgICAgICAgICAgICAgIGlkOiBcIm1vZHVsZUluZm9cIixcclxuICAgICAgICAgICAgICAgIC8vdGl0bGU6IFwiXCIsIC8vUkMgMzIwMDAxNDAgOiBNb2R1bFxyXG4gICAgICAgICAgICAgICAgem9uZTogMSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IFwidmVydGljYWxcIixcclxuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaUltYWdlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRTZWxlY3RlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHJlc3VsdClcclxuICAgICAgICAgICAgfV0sIHsga2V5OiBbXCJpZFwiXSB9KTtcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZGFzaGJvYXJkcGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy5tb2R1bGVJbmZvSXRlbXMsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IFwiaG9yaXpvbnRhbFwiLFxyXG4gICAgICAgICAgICAgICAgLy90aXRsZTogXCIgXCIsXHJcbiAgICAgICAgICAgICAgICBzb3J0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==