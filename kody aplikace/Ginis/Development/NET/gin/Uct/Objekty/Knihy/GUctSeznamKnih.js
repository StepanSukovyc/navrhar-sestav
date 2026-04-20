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
            let GUctSeznamKnih = 
            /**
             *  Seznam knih pro uzaverkove operace
             */
            class GUctSeznamKnih extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.loadingData = false; // atribut nacitani dat
                    this.logOptions = { name: "GUctSeznamKnih", authorCode: 302, file: "GUctSeznamKnih.ts" };
                }
                onContentReady() {
                    this.log.debug("Start onContentReady-GUctSeznamKnih");
                    //this.taskId = "actSeznamPredkontaci";
                    var that = this;
                    debugger;
                    // vytvoreni filtru panelu
                    this.createFilterPanel(this);
                    // vytvoreni gridu
                    that.createGrid();
                    // vytovreni akci
                    that.createAction();
                    this.menuBar([{
                            action: this.actions.actCloseBooks, favorite: true
                        },
                        { action: this.actions.actOpenBooks, favorite: true }
                        //, { type: "separator" }
                        //, { action: this.actions!.obcerstvitAct, favorite: true }
                    ]);
                    that.reload();
                }
                /**
                    * Hromadne operace
                    *
                    * function HromadneOperace
                    *
                    *
                    *
                    */
                hromadneOperace(typOperace) {
                    this.log.debug("Start hromadneOperace-GUctSeznamKnih");
                    // zjisteni oznacenych radku
                    let oznaceneRadky = Gordic.Eko.Grid.checkedRows(this.getGrid(), false);
                    if (oznaceneRadky === null || typeof oznaceneRadky == "undefined" || oznaceneRadky.length == 0) {
                        this.dialogs.alert("jres:30250035", //RC 30250035 : Upozornění
                        "jres:30250334"); //RC 30250334 : Nenalezeny žádné označené řádky
                        return;
                    }
                    this.actionsWithBooks(oznaceneRadky, typOperace);
                }
                /**
                 * Akce s knihou
                 * @param vybaneKnihy
                 * @param typAkce
                 */
                actionsWithBooks(vybaneKnihy, typAkce) {
                    this.log.debug("Start actionsWithBooks-GUctSeznamKnih");
                    var that = this;
                    let myTitle = typAkce == 1 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.ZNOVUOTEVRENI_KNIH */ ? "jres:30250730" //RC 30250730 : Zrušit otevření knih
                        : "jres:30250177"; //RC 30250177 : Uzavření knih
                    let myAkceName = typAkce == 1 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.ZNOVUOTEVRENI_KNIH */ ? "jres:30250731" //RC 30250731 : Zrušit otevření
                        : "jres:30250732"; //RC 30250732 : Uzavřít
                    let modelData = { duvod: void 0, ixs_fun_akt: "", ixs_ref: "", cis_real: "", ixs_fun_vyriz: "", ixp_den: "", ixs_su: "", subrada: 0 };
                    let validace = typAkce == 1 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.ZNOVUOTEVRENI_KNIH */ ? that.isl.UctKniha.kontrolaKnihOtevrit({ knihy: vybaneKnihy })
                        : that.isl.UctKniha.kontrolaKnihUzavrit({ knihy: vybaneKnihy });
                    //let formParams = PrevzittForm(this);
                    that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        // titulek v breadcrumbu
                        title: myTitle,
                        // formát gridu
                        gridFormat: that.createColumns(),
                        // primární klíč dat v gridu
                        keys: "ixp",
                        // data pro grid (pro první krok)
                        data: validace.getData(), //LoadDataPrevzeti(content, selectedRows as Gordic.Uct.Interface.GUctVybranyDokladDto[]),
                        // typ indikátorů nad gridem (KPI nebo badge)
                        indicatorType: "KPI",
                        // metoda volaná na při spuštění průvodce (na vstupu jsou data, vrací (omezená) data + výsledek kontroly)
                        preCheckAction: (data) => {
                            return typAkce == 1 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.ZNOVUOTEVRENI_KNIH */ ? that.isl.UctKniha.kontrolaKnihOtevrit({ knihy: data }).getData()
                                : that.isl.UctKniha.kontrolaKnihUzavrit({ knihy: data }).getData();
                        },
                        // první krok - zadání parametrů a kontrola, při přechodu na další krok se zavolá spuštění vlastní operace
                        firstStep: {
                            // název kroku
                            title: "jres:30250575", //RC 30250575 : Zadání
                            // popis operace
                            description: "jres:30250725", //RC 30250725 : Akce provede uzavření vybraných (zaškrtnutých) knih.
                            // nad gridem zobrazit KPI/badge s počty záznamů
                            showIndicator: true,
                            // formulář s parametry
                            //form: PrevzittForm(content),
                            // model pro parametry
                            //modelData: modelData,
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250726", //RC 30250726 : Vybrané knihy
                            // obsluha změny parametru
                            fieldChangeDelegate: void 0,
                            // akce pro spusteni kontrolu uzivatelem
                            checkAction: (model, data) => {
                                let validace = typAkce == 1 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.ZNOVUOTEVRENI_KNIH */ ? that.isl.UctKniha.kontrolaKnihOtevrit({ knihy: vybaneKnihy })
                                    : that.isl.UctKniha.kontrolaKnihUzavrit({ knihy: data });
                                return validace.getData();
                            },
                            // název akce, která provede požadovanou operaci (tlačítko vpravo dole)
                            nextActionName: myAkceName,
                            // metoda volaná při přechodu na další krok (provedení vlastní operace) (pracuje nad daty ze vstupu, vrací aktuální data z databáze + výsledek operace)
                            nextAction: (model, data) => {
                                modelData = model;
                                return ((typAkce == 1 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.ZNOVUOTEVRENI_KNIH */) ? that.isl.UctKniha.otevritKnihy({
                                    knihy: data
                                }).getData()
                                    : that.isl.UctKniha.uzavritKnihy({
                                        knihy: data
                                    }).getData());
                            },
                        },
                        // druhý (poslední) krok - zobrazení výsledku operace
                        lastStep: {
                            // název kroku
                            title: "jres:30250573", //RC 30250573 : Výsledek
                            // formulář s parametry
                            //form: formParams,
                            //model pro parametry
                            modelData: () => { return modelData; },
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // parametry jsou v tomto kroku již needitovatelné
                            enableFormFields: false,
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250741", //RC 30250741 : Zpracované knihy
                            // akce na tabu s gridem
                        },
                        // obsluha úspěšného ukončení průvodce (na rozdíl od zrušení průvodce přeselektovává seznam)
                        completeDelegate: (view) => {
                            let allview = this.$grid.ggrid("getView");
                            allview.updateData(view.getDataRows(), "update");
                            //that.reload();
                        },
                        // obsluha zrušení průvodce
                        cancelDelegate: () => {
                            //FucGrid.wizardEnd(that, ikc, false);
                        },
                    }, {
                        // titulek v breadcrumbu
                        title: "jres:30250729", //RC 30250729 : Uzavřít
                    });
                }
                /**
                 *  Definice sloupcu
                 * createColumns
                 *
                 * @returns {Gordic.Data.GridFormat<Gordic.Uct.Interface.GUctVybraneKnihyDto>}
                 */
                createColumns() {
                    this.log.debug("Start createColumns-GUctSeznamKnih");
                    var result = new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "ixp_den",
                        caption: "jres:30250026", //RC 30250026 : Identifikátor
                        width: 100,
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    });
                    result
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:30250766", //RC 30250766 : Název knihy
                        width: 170,
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "zkratka",
                        caption: "jres:30250392", //RC 30250392 : Zkratka knihy
                        width: 120,
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "stav_txt",
                        width: 150,
                        caption: "jres:30250182", //RC 30250182 : Stav knihy
                    })
                        .addNumberColumn({
                        name: "rok",
                        caption: "jres:30250187", //RC 30250187 : Rok
                    });
                    return result;
                }
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    var that = this;
                    var elmRowOpts = { label: "Elementy" };
                    elmRowOpts["favoriteRowLayoutDescriptor"] = "w-L-9 w-M-8 w-S-12";
                    //let fpForm: Gordic.Forms.Form;
                    let fpForm = new Gordic.Forms.Form({ tabLabel: "jres:30250719" }) //RC 30250719 : Knihy
                        .addSection()
                        .addRow().addField("gselectbox", {
                        name: "filter", multi: false, list: true, itemWidth: "",
                        dropdown: true
                        //, model: "model.s_zau=value.s_zau", itemTemplate: "{s_zau_txt}"
                        ,
                        itemTemplate: "{filter_txt}",
                        emptyValue: { filter_txt: "jres:30250721", filter: 0 } //RC 30250721 : Všechny
                        ,
                        model: "model.filter=value.filter",
                        helperColumns: ["rozpad_txt"],
                        data: new Gordic.Data.View([
                            { filter_txt: "jres:30250721", filter: 0 } //RC 30250721 : Všechny
                            ,
                            { filter_txt: "jres:30250132", filter: 1 } //RC 30250132 : Neuzavřené
                            ,
                            { filter_txt: "jres:30250720", filter: 2 } //RC 30250720 : Uzavřené
                        ], { key: "filter" }),
                        change: (ev, cnt) => {
                            debugger;
                            //let tst = cnt as any;
                            if (cnt.flags["isKontrolniDiv"] === true)
                                return;
                            if (cnt.flags["noChange"] === true)
                                return;
                            this.$filterPanel.gfilterpanel("applyFilter", this.$filterPanel.gfilterpanel("getCurrentData"), false);
                            //that.reload();
                        }
                    });
                    this.$filterPanel = $.newDiv("js-filtr")
                        .appendTo(this.element)
                        .gfilterpanel({
                        forms: [fpForm],
                        favorites: ["filter"],
                        favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                        filterViewMode: FilterViewMode.Simple,
                        //searchButtonOnMainRow: true,
                        //filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        //filterViewModeUserSettings: [FilterViewMode.Detail/*, FilterViewMode.Normal*/],
                        //saveOptionsForm: GUcrMaskaDetail.getForm(gf as any), //TODO: Dat spravny typ gridformatu!
                        //filterStorageService: new GUcrMaskaService({ typSestavy: this.typSestavy, parentContent: that.parentCnt }),                    
                        autoLoadAfter: ["ClearFilter", "ChoseFilter"],
                        //apply: (ev, data) => { this.loadDataOld(data.filter); },
                        //reset: (ev, data) => { this.$grid.ggridserverfilter("clear"); },
                        primaryButtonBehaviour: "AlwaysPrimary",
                        clearFilterButtonVisible: "AlwaysVisible",
                        poVyhledaniZobrazit: "OblibenePodminky",
                        poVyhledaniZobrazitUserSettings: "Deny" //NOTE: Zakazuje prepinani po vyhledani - pokud se nekdo pokousel vymazat filtr v tomto rezimu, tak musel kliknout na vyhledat, viz T3987
                    });
                }
                /**
                 * Znovunacteni dat
                 *
                 * */
                reload() {
                    let that = this;
                    if (that.loadingData)
                        return;
                    let view = this.$grid.ggrid("getView");
                    that.loadingData = true;
                    view.requestData().always(() => {
                        debugger;
                        that.loadingData = false;
                        that.nastaveniPristupnosti();
                    });
                }
                /**
                 * Vytvoreni gridu
                 * */
                createGrid() {
                    let that = this;
                    this.islView = this.createListView();
                    this.$grid = $.newDiv("js-uctSeznamKnihGrid")
                        .css("height", "100%")
                        .appendTo(that.element)
                        .ggrid({
                        columnMode: "full", //"fit",     // fit (defaultne by melo byt toto), full
                        multi: true,
                        data: this.islView,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                            }
                        }),
                        selection: function (ev, info) {
                            that.nastaveniPristupnosti();
                        },
                        columns: that.createGridFormat()
                    }).gautofit();
                }
                /**
                 * Vytvoreni view pro list
                 *
                 * */
                createListView() {
                    let that = this;
                    return new Gordic.Isl.View(that.isl.UctKniha.knihyKUzaverkam().use((req, next, ctx) => {
                        debugger;
                        if (req.filters) {
                            if (req.filters["filter"] == 1)
                                req.filters = { aktivita: { o: "IN", v: [100 /* Gordic.Uct.Interface.GEAktivitaKnihy.Otevreno */, 300 /* Gordic.Uct.Interface.GEAktivitaKnihy.Pripraveno_k_uzavreni */] } };
                            else if (req.filters["filter"] == 2)
                                req.filters = { aktivita: { o: "IN", v: [400 /* Gordic.Uct.Interface.GEAktivitaKnihy.Uzavreno_neodlito */, 500 /* Gordic.Uct.Interface.GEAktivitaKnihy.Uzavreno_odlito */] } };
                            else
                                req.filters = void 0;
                        }
                        return next(req);
                        //return this.getFilterData(that, req, next) as any;                    
                    }), {
                        filterPanel: that.$filterPanel,
                        startEmpty: true,
                    });
                }
                /**
                 * Vytvoreni gridformatu
                 * */
                createGridFormat() {
                    let gridFormat = new Gordic.Data.GridFormat()
                        .addRok({ caption: "jres:30250756", fragment: "sden", description: "jres:30250748" }) //RC 30250756 : Rok
                        .addTextColumn({
                        name: "nazev",
                        caption: "jres:30250863", //RC 30250747 : Název knihy
                        width: 170,
                        fragment: "sden"
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "zkratka",
                        caption: "jres:30250757", //RC 30250757 : Zkratka
                        description: "jres:30250392", //RC 30250392 : Zkratka knihy
                        width: 70,
                        fragment: "rdac"
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "ktg_den_txt",
                        caption: "jres:30250758", //RC 30250758 : Kategorie
                        description: "jres:30250749", //RC 30250749 : Kategorie knihy
                        width: 120,
                        fragment: "uctcktd"
                        //fixedWidth: true,
                        //customClass: "ui-disabled"
                    })
                        .addTextColumn({
                        name: "stav_txt",
                        width: 150,
                        caption: "jres:30250182", //RC 30250182 : Stav knihy
                        fragment: "ekocakr"
                    })
                        .addNumberColumn({
                        name: "pocet_vsech_dokladu",
                        width: 150,
                        caption: "jres:30250760", //RC 30250760 : Evidováno dokladů
                        description: "jres:30250759", //RC 30250759 : Počet dokladů aktuálně evidovaných v knize
                        fragment: "doklad_vse"
                    })
                        .addNumberColumn({
                        name: "pocet_uzav",
                        width: 150,
                        cellTemplate: (row) => {
                            let suma = parseInt(row.pocet_vsech_dokladu) - parseInt(row.pocet_neuzavrenych_dokladu);
                            return suma.toString();
                        },
                        caption: "jres:30250762", //RC 30250762 : Uzavřeno dokladů
                        description: "jres:30250761", //RC 30250761 : Počet dokladů evidovaných a uzavřených
                        fragment: "doklad"
                    })
                        .addNumberColumn({
                        name: "pocet_neuzavrenych_dokladu",
                        width: 150,
                        caption: "jres:30250764", //RC 30250764 : Neuzavřeno dokladů
                        description: "jres:30250763", //RC 30250763 : Počet evidovaných neuzavřených dokladů bránících uzavření knihy
                        fragment: "doklad_neuzavreno"
                    })
                        .addNumberColumn({
                        name: "pocet_neevid_dokladu",
                        width: 150,
                        caption: "jres:30250753", //RC 30250753 : Neevidováno dokladů
                        description: "jres:30250765", //RC 30250765 : Počet dokladů podaných do knihy a nezaevidovaných, které rovněž mohou bránit uzávěrce
                        fragment: "doklad_neevid"
                    })
                        .addIco({ fragment: "sden" })
                        .addUcs({ fragment: "sden" })
                        .addUus({ fragment: "sden" })
                        .addPid({ name: "ixp_den", fragment: "sden" });
                    return gridFormat;
                }
                /**
                 * Nastaveni pristupnosti akci dle stavu a prav formulare
                 *
                 * */
                nastaveniPristupnosti() {
                    let grid = this.getGrid();
                    let emptyRows = true;
                    let emptyMsg = "jres:30250724"; //RC 30250724 : Není vybrána žádná kniha
                    let oznaceneRadky = [];
                    if (grid !== null) {
                        oznaceneRadky = Gordic.Eko.Grid.checkedRows(grid, false);
                        if (oznaceneRadky !== null && typeof oznaceneRadky != "undefined" && oznaceneRadky.length > 0) {
                            emptyRows = false;
                        }
                    }
                    if (emptyRows) {
                        this.actions.actCloseBooks?.update({ enabled: false, tooltip: emptyMsg });
                        this.actions.actOpenBooks?.update({ enabled: false, tooltip: emptyMsg });
                    }
                    else {
                        let vybraneStavy = this.findOznaceneStavy(oznaceneRadky);
                        if (this.Permissions.EnableClosing.value) {
                            if (vybraneStavy.Otevrene)
                                this.actions.actCloseBooks?.updatePermission(this.Permissions.EnableClosing);
                            else
                                this.actions.actCloseBooks?.update({ enabled: false, tooltip: "jres:30250727" }); //RC 30250727 : Ve výběru není vybrána otevřená kniha
                            if (vybraneStavy.Uzavrene)
                                this.actions.actOpenBooks?.updatePermission(this.Permissions.EnableClosing);
                            else
                                this.actions.actOpenBooks?.update({ enabled: false, tooltip: "jres:30250728" }); //RC 30250728 : Ve výběru není vybrána uzavřená kniha
                        }
                        else {
                            this.actions.actCloseBooks?.updatePermission(this.Permissions.EnableClosing);
                            this.actions.actOpenBooks?.updatePermission(this.Permissions.EnableClosing);
                        }
                    }
                }
                /**
                 * Zjisteni stavu vybranych knih
                 * @param rows
                 */
                findOznaceneStavy(rows) {
                    let otevrena = false;
                    let uzavrena = false;
                    for (let i = 0; i < rows.length; i++) {
                        let item = rows[i];
                        otevrena = otevrena || (item.aktivita == 100 /* Gordic.Uct.Interface.GEAktivitaKnihy.Otevreno */ || item.aktivita == 300 /* Gordic.Uct.Interface.GEAktivitaKnihy.Pripraveno_k_uzavreni */);
                        uzavrena = uzavrena || (item.aktivita == 400 /* Gordic.Uct.Interface.GEAktivitaKnihy.Uzavreno_neodlito */ || item.aktivita == 500 /* Gordic.Uct.Interface.GEAktivitaKnihy.Uzavreno_odlito */);
                        if (otevrena && uzavrena)
                            break;
                    }
                    return { Otevrene: otevrena, Uzavrene: uzavrena };
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find(".ggrid.js-uctSeznamKnihGrid");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Vytvoreni akci
                 * */
                createAction() {
                    let that = this;
                    this.actions = new GActionList({
                        actCloseBooks: Gordic.Eko.Action.actionUzavrit({
                            caption: "jres:30250716", //RC 30250716 : Uzavřít
                            tooltip: "jres:30250767", //RC 30250767 : Uzavřít knihy
                            enabled: false,
                            run: function () {
                                that.hromadneOperace(0 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.UZAVRENI_KNIHY */);
                            }
                        }),
                        actOpenBooks: Gordic.Eko.Action.actionZrusitUzavreni({
                            caption: "jres:30250717", //RC 30250717 : Zrušit uzavření
                            tooltip: "jres:30250768", //RC 30250768 : Zrušit uzavření knihy
                            enabled: false,
                            run: function () {
                                that.hromadneOperace(1 /* Gordic.Uct.Interface.GEUCTTypyUzaverekKnih.ZNOVUOTEVRENI_KNIH */);
                            }
                        }),
                        obcerstvitAct: Gordic.Eko.Action.actionObcerstvit({
                            enabled: false, run: function () {
                            }
                        }),
                    });
                }
            };
            GUctSeznamKnih = __decorate([
                gcontent
                /**
                 *  Seznam knih pro uzaverkove operace
                 */
            ], GUctSeznamKnih);
            WebClient.GUctSeznamKnih = GUctSeznamKnih;
            /**
             *
             * Typy vybranych knih
             * */
            class GTypyVybranychKnih {
                constructor() {
                    this.Otevrene = false;
                    this.Uzavrene = false;
                }
            }
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdFNlem5hbUtuaWguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHVWN0U2V6bmFtS25paC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBeWlCZjtBQXppQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeWlCbkI7SUF6aUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5aUI3QjtRQXppQm9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBTW5DLElBQWEsY0FBYztZQUgzQjs7ZUFFRztZQUNILE1BQWEsY0FBZSxTQUFRLE9BQUEsWUFBWTtnQkFBaEQ7O29CQUljLGdCQUFXLEdBQVksS0FBSyxDQUFDLENBQUMsdUJBQXVCO29CQVcvRCxlQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztnQkF5Z0J4RixDQUFDO2dCQXhnQkcsY0FBYztvQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO29CQUN0RCx1Q0FBdUM7b0JBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsUUFBUSxDQUFDO29CQUNULDBCQUEwQjtvQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixrQkFBa0I7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQVEsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUk7eUJBQ3REO3dCQUNLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxP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QUFFO2dDQUNELElBQUksQ0FBQyxlQUFlLHVFQUErRCxDQUFDOzRCQUN4RixDQUFDO3lCQUNKLENBQUM7d0JBRUYsYUFBYSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDOzRCQUM5QyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTs0QkFFckIsQ0FBQzt5QkFDSixDQUFDO3FCQUdMLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBR0osQ0FBQTtZQXhoQlksY0FBYztnQkFKMUIsUUFBUTtnQkFDVDs7bUJBRUc7ZUFDVSxjQUFjLENBd2hCMUI7WUF4aEJZLHdCQUFjLGlCQXdoQjFCLENBQUE7WUFDRDs7O2lCQUdLO1lBQ0wsTUFBTSxrQkFBa0I7Z0JBQXhCO29CQUNXLGFBQVEsR0FBWSxLQUFLLENBQUM7b0JBQzFCLGFBQVEsR0FBWSxLQUFLLENBQUM7Z0JBQ3JDLENBQUM7YUFBQTtRQUVMLENBQUMsRUF6aUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUF5aUI3QjtJQUFELENBQUMsRUF6aUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUF5aUJuQjtBQUFELENBQUMsRUF6aUJTLE1BQU0sS0FBTixNQUFNLFFBeWlCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWN0LldlYkNsaWVudCB7XHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIEBnY29udGVudFxyXG4gICAgLyoqXHJcbiAgICAgKiAgU2V6bmFtIGtuaWggcHJvIHV6YXZlcmtvdmUgb3BlcmFjZVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1VjdFNlem5hbUtuaWggZXh0ZW5kcyBHQ29udGVudEJhc2UgIHtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJvdGVjdGVkIGxvYWRpbmdEYXRhOiBib29sZWFuID0gZmFsc2U7IC8vIGF0cmlidXQgbmFjaXRhbmkgZGF0XHJcbiAgICAgICAgcHJpdmF0ZSBQZXJtaXNzaW9uczogSW50ZXJmYWNlLkdVY3RLbmloYVBlcm1pc3Npb25zOyAgIC8vIHphc2xhbmUgc2Ugc2VydmVydVxyXG4gICAgICAgIC8vIElzbCB2aWV3IFxyXG4gICAgICAgIHByb3RlY3RlZCBpc2xWaWV3OiBHb3JkaWMuSXNsLlZpZXc7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRhc2sgcHJvIHNlem5hbVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHRhc2tMaXN0OiBJc2wuX1Rhc2s8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PjtcclxuICAgICAgICAvLyBmaWx0cm92YWNpIHBhbmVsXHJcbiAgICAgICAgcHJvdGVjdGVkICRmaWx0ZXJQYW5lbDogSlF1ZXJ5O1xyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR1VjdFNlem5hbUtuaWhcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdVY3RTZXpuYW1LbmloLnRzXCIgfTtcclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJTdGFydCBvbkNvbnRlbnRSZWFkeS1HVWN0U2V6bmFtS25paFwiKTtcclxuICAgICAgICAgICAgLy90aGlzLnRhc2tJZCA9IFwiYWN0U2V6bmFtUHJlZGtvbnRhY2lcIjtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjsgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gdnl0dm9yZW5pIGZpbHRydSBwYW5lbHVcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuICAgICAgICAgICAgLy8gdnl0dm9yZW5pIGdyaWR1XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB2eXRvdnJlbmkgYWtjaVxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIoW3tcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25zIS5hY3RDbG9zZUJvb2tzLCBmYXZvcml0ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAsIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMhLmFjdE9wZW5Cb29rcywgZmF2b3JpdGU6IHRydWUgfVxyXG4gICAgICAgICAgICAgICAgLy8sIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9XHJcbiAgICAgICAgICAgICAgICAvLywgeyBhY3Rpb246IHRoaXMuYWN0aW9ucyEub2JjZXJzdHZpdEFjdCwgZmF2b3JpdGU6IHRydWUgfVxyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBIcm9tYWRuZSBvcGVyYWNlXHJcbiAgICAgICAgICAgICogIFxyXG4gICAgICAgICAgICAqIGZ1bmN0aW9uIEhyb21hZG5lT3BlcmFjZVxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaHJvbWFkbmVPcGVyYWNlKHR5cE9wZXJhY2U6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVUNUVHlweVV6YXZlcmVrS25paCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhcIlN0YXJ0IGhyb21hZG5lT3BlcmFjZS1HVWN0U2V6bmFtS25paFwiKTtcclxuICAgICAgICAgICAgLy8gemppc3Rlbmkgb3puYWNlbnljaCByYWRrdVxyXG4gICAgICAgICAgICBsZXQgb3puYWNlbmVSYWRreSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0S25paGFEdG8+KHRoaXMuZ2V0R3JpZCgpLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChvem5hY2VuZVJhZGt5ID09PSBudWxsIHx8IHR5cGVvZiBvem5hY2VuZVJhZGt5ID09IFwidW5kZWZpbmVkXCIgfHwgb3puYWNlbmVSYWRreS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDAzNVwiLCAvL1JDIDMwMjUwMDM1IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMzM0XCIpOyAgLy9SQyAzMDI1MDMzNCA6IE5lbmFsZXplbnkgxb7DoWRuw6kgb3puYcSNZW7DqSDFmcOhZGt5XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1dpdGhCb29rcyhvem5hY2VuZVJhZGt5LCB0eXBPcGVyYWNlKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrY2UgcyBrbmlob3VcclxuICAgICAgICAgKiBAcGFyYW0gdnliYW5lS25paHlcclxuICAgICAgICAgKiBAcGFyYW0gdHlwQWtjZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWN0aW9uc1dpdGhCb29rcyh2eWJhbmVLbmloeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFZ5YnJhbmVLbmloeUR0b1tdLCB0eXBBa2NlOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVDVFR5cHlVemF2ZXJla0tuaWgpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoXCJTdGFydCBhY3Rpb25zV2l0aEJvb2tzLUdVY3RTZXpuYW1LbmloXCIpO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBteVRpdGxlID0gdHlwQWtjZSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVDVFR5cHlVemF2ZXJla0tuaWguWk5PVlVPVEVWUkVOSV9LTklIID9cImpyZXM6MzAyNTA3MzBcIiAvL1JDIDMwMjUwNzMwIDogWnJ1xaFpdCBvdGV2xZllbsOtIGtuaWhcclxuICAgICAgICAgICAgICAgIDogXCJqcmVzOjMwMjUwMTc3XCI7IC8vUkMgMzAyNTAxNzcgOiBVemF2xZllbsOtIGtuaWhcclxuICAgICAgICAgICAgbGV0IG15QWtjZU5hbWUgPSB0eXBBa2NlID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVUNUVHlweVV6YXZlcmVrS25paC5aTk9WVU9URVZSRU5JX0tOSUggPyBcImpyZXM6MzAyNTA3MzFcIiAvL1JDIDMwMjUwNzMxIDogWnJ1xaFpdCBvdGV2xZllbsOtXHJcbiAgICAgICAgICAgICAgICA6IFwianJlczozMDI1MDczMlwiOyAvL1JDIDMwMjUwNzMyIDogVXphdsWZw610XHJcblxyXG4gICAgICAgICAgICBsZXQgbW9kZWxEYXRhOiBJR1ByZWV2aWRlbmNlTW9kZWwgPSB7IGR1dm9kOiB2b2lkIDAsIGl4c19mdW5fYWt0OiBcIlwiLCBpeHNfcmVmOiBcIlwiLCBjaXNfcmVhbDogXCJcIiwgaXhzX2Z1bl92eXJpejogXCJcIiwgaXhwX2RlbjogXCJcIiwgaXhzX3N1OlwiXCIsc3VicmFkYTowIH07XHJcbiAgICAgICAgICAgIGxldCB2YWxpZGFjZSA9IHR5cEFrY2UgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVQ1RUeXB5VXphdmVyZWtLbmloLlpOT1ZVT1RFVlJFTklfS05JSCA/IHRoYXQuaXNsLlVjdEtuaWhhLmtvbnRyb2xhS25paE90ZXZyaXQoeyBrbmloeTogdnliYW5lS25paHkgfSlcclxuICAgICAgICAgICAgICAgIDogdGhhdC5pc2wuVWN0S25paGEua29udHJvbGFLbmloVXphdnJpdCh7IGtuaWh5OiB2eWJhbmVLbmloeSB9KTtcclxuICAgICAgICAgICAgLy9sZXQgZm9ybVBhcmFtcyA9IFByZXZ6aXR0Rm9ybSh0aGlzKTtcclxuICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG8+PihHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNDb250ZW50LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpdHVsZWsgdiBicmVhZGNydW1idVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBteVRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcm3DoXQgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiB0aGF0LmNyZWF0ZUNvbHVtbnMoKSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmltw6FybsOtIGtsw63EjSBkYXQgdiBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIGtleXM6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGF0YSBwcm8gZ3JpZCAocHJvIHBydm7DrSBrcm9rKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZhbGlkYWNlLmdldERhdGEoKSwvL0xvYWREYXRhUHJldnpldGkoY29udGVudCwgc2VsZWN0ZWRSb3dzIGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW10pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHR5cCBpbmRpa8OhdG9yxa8gbmFkIGdyaWRlbSAoS1BJIG5lYm8gYmFkZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgICAgICAvLyBtZXRvZGEgdm9sYW7DoSBuYSBwxZlpIHNwdcWhdMSbbsOtIHByxa92b2RjZSAobmEgdnN0dXB1IGpzb3UgZGF0YSwgdnJhY8OtIChvbWV6ZW7DoSkgZGF0YSArIHbDvXNsZWRlayBrb250cm9seSlcclxuICAgICAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cEFrY2UgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVQ1RUeXB5VXphdmVyZWtLbmloLlpOT1ZVT1RFVlJFTklfS05JSCA/IHRoYXQuaXNsLlVjdEtuaWhhLmtvbnRyb2xhS25paE90ZXZyaXQoeyBrbmloeTogZGF0YSB9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhhdC5pc2wuVWN0S25paGEua29udHJvbGFLbmloVXphdnJpdCh7IGtuaWh5OiBkYXRhIH0pLmdldERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBwcnZuw60ga3JvayAtIHphZMOhbsOtIHBhcmFtZXRyxa8gYSBrb250cm9sYSwgcMWZaSBwxZllY2hvZHUgbmEgZGFsxaHDrSBrcm9rIHNlIHphdm9sw6Egc3B1xaF0xJtuw60gdmxhc3Ruw60gb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYga3Jva3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDU3NVwiLCAvL1JDIDMwMjUwNTc1IDogWmFkw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9waXMgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNzI1XCIsIC8vUkMgMzAyNTA3MjUgOiBBa2NlIHByb3ZlZGUgdXphdsWZZW7DrSB2eWJyYW7DvWNoICh6YcWha3J0bnV0w71jaCkga25paC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFkIGdyaWRlbSB6b2JyYXppdCBLUEkvYmFkZ2UgcyBwb8SNdHkgesOhem5hbcWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcm11bMOhxZkgcyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtOiBQcmV2eml0dEZvcm0oY29udGVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vZGVsIHBybyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbERhdGE6IG1vZGVsRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFkcGlzIHRhYnUgcyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtVGFiVGl0bGU6IFwiUGFyYW1ldHJ5IHN0b3JuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMDI1MDcyNlwiLCAvL1JDIDMwMjUwNzI2IDogVnlicmFuw6kga25paHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB6bcSbbnkgcGFyYW1ldHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkQ2hhbmdlRGVsZWdhdGU6IHZvaWQgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gc3B1c3Rlbmkga29udHJvbHUgdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWRhY2UgPSB0eXBBa2NlID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVUNUVHlweVV6YXZlcmVrS25paC5aTk9WVU9URVZSRU5JX0tOSUggPyB0aGF0LmlzbC5VY3RLbmloYS5rb250cm9sYUtuaWhPdGV2cml0KHsga25paHk6IHZ5YmFuZUtuaWh5IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGF0LmlzbC5VY3RLbmloYS5rb250cm9sYUtuaWhVemF2cml0KHsga25paHk6IGRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhY2UuZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhemV2IGFrY2UsIGt0ZXLDoSBwcm92ZWRlIHBvxb5hZG92YW5vdSBvcGVyYWNpICh0bGHEjcOtdGtvIHZwcmF2byBkb2xlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogbXlBa2NlTmFtZSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ldG9kYSB2b2xhbsOhIHDFmWkgcMWZZWNob2R1IG5hIGRhbMWhw60ga3JvayAocHJvdmVkZW7DrSB2bGFzdG7DrSBvcGVyYWNlKSAocHJhY3VqZSBuYWQgZGF0eSB6ZSB2c3R1cHUsIHZyYWPDrSBha3R1w6FsbsOtIGRhdGEgeiBkYXRhYsOhemUgKyB2w71zbGVkZWsgb3BlcmFjZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGEgPSBtb2RlbDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgodHlwQWtjZSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVDVFR5cHlVemF2ZXJla0tuaWguWk5PVlVPVEVWUkVOSV9LTklIKSA/IHRoYXQuaXNsLlVjdEtuaWhhLm90ZXZyaXRLbmloeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga25paHk6IGRhdGF9KS5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRoYXQuaXNsLlVjdEtuaWhhLnV6YXZyaXRLbmloeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtuaWh5OiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJ1aMO9IChwb3NsZWRuw60pIGtyb2sgLSB6b2JyYXplbsOtIHbDvXNsZWRrdSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFN0ZXA6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuw6F6ZXYga3Jva3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDU3M1wiLCAvL1JDIDMwMjUwNTczIDogVsO9c2xlZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvcm11bMOhxZkgcyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9mb3JtOiBmb3JtUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsIHBybyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoKSA9PiB7IHJldHVybiBtb2RlbERhdGE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybVRhYlRpdGxlOiBcIlBhcmFtZXRyeSBzdG9ybmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IGpzb3UgdiB0b210byBrcm9rdSBqacW+IG5lZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFkcGlzIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzAyNTA3NDFcIiwgLy9SQyAzMDI1MDc0MSA6IFpwcmFjb3ZhbsOpIGtuaWh5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgbmEgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgw7pzcMSbxaFuw6lobyB1a29uxI1lbsOtIHByxa92b2RjZSAobmEgcm96ZMOtbCBvZCB6cnXFoWVuw60gcHLFr3ZvZGNlIHDFmWVzZWxla3RvdsOhdsOhIHNlem5hbSlcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZURlbGVnYXRlOiAodmlldzogRGF0YS5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG8+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbGx2aWV3ID0gdGhpcy4kZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvPihcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbHZpZXcudXBkYXRlRGF0YSh2aWV3LmdldERhdGFSb3dzKCksIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB6cnXFoWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9GdWNHcmlkLndpemFyZEVuZCh0aGF0LCBpa2MsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aXR1bGVrIHYgYnJlYWRjcnVtYnVcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNzI5XCIsIC8vUkMgMzAyNTA3MjkgOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgRGVmaW5pY2Ugc2xvdXBjdVxyXG4gICAgICAgICAqIGNyZWF0ZUNvbHVtbnNcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7R29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbHVtbnMoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvPiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLmRlYnVnKFwiU3RhcnQgY3JlYXRlQ29sdW1ucy1HVWN0U2V6bmFtS25paFwiKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMjZcIiwgLy9SQyAzMDI1MDAyNiA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczogXCJ1aS1kaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA3NjZcIiwgLy9SQyAzMDI1MDc2NiA6IE7DoXpldiBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInprcmF0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzOTJcIiwgLy9SQyAzMDI1MDM5MiA6IFprcmF0a2Ega25paHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTgyXCIsIC8vUkMgMzAyNTAxODIgOiBTdGF2IGtuaWh5XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTg3XCIsIC8vUkMgMzAyNTAxODcgOiBSb2tcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZmlsdHJvdmFjaWhvIHBhbmVsdVxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlclBhbmVsKHRoYXQ6IHRoaXMpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgZWxtUm93T3B0cyA9IHsgbGFiZWw6IFwiRWxlbWVudHlcIiB9O1xyXG4gICAgICAgICAgICBlbG1Sb3dPcHRzW1wiZmF2b3JpdGVSb3dMYXlvdXREZXNjcmlwdG9yXCJdID0gXCJ3LUwtOSB3LU0tOCB3LVMtMTJcIjtcclxuICAgICAgICAgICAgLy9sZXQgZnBGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICAgICAgbGV0IGZwRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MzAyNTA3MTlcIiB9KSAvL1JDIDMwMjUwNzE5IDogS25paHlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyXCIsIG11bHRpOiBmYWxzZSwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vLCBtb2RlbDogXCJtb2RlbC5zX3phdT12YWx1ZS5zX3phdVwiLCBpdGVtVGVtcGxhdGU6IFwie3NfemF1X3R4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgaXRlbVRlbXBsYXRlOiBcIntmaWx0ZXJfdHh0fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbXB0eVZhbHVlOiB7IGZpbHRlcl90eHQ6IFwianJlczozMDI1MDcyMVwiLCBmaWx0ZXI6IDAgfSAgLy9SQyAzMDI1MDcyMSA6IFbFoWVjaG55XHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC5maWx0ZXI9dmFsdWUuZmlsdGVyXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGhlbHBlckNvbHVtbnM6IFtcInJvenBhZF90eHRcIl1cclxuICAgICAgICAgICAgICAgICAgICAsIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBmaWx0ZXJfdHh0OiBcImpyZXM6MzAyNTA3MjFcIiwgZmlsdGVyOiAwIH0gLy9SQyAzMDI1MDcyMSA6IFbFoWVjaG55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgeyBmaWx0ZXJfdHh0OiBcImpyZXM6MzAyNTAxMzJcIiwgZmlsdGVyOiAxIH0gLy9SQyAzMDI1MDEzMiA6IE5ldXphdsWZZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIHsgZmlsdGVyX3R4dDogXCJqcmVzOjMwMjUwNzIwXCIsIGZpbHRlcjogMiB9IC8vUkMgMzAyNTA3MjAgOiBVemF2xZllbsOpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAsIHsga2V5OiBcImZpbHRlclwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IChldiwgY250KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB0c3QgPSBjbnQgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY250LmZsYWdzW1wiaXNLb250cm9sbmlEaXZcIl0gPT09IHRydWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNudC5mbGFnc1tcIm5vQ2hhbmdlXCJdID09PSB0cnVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpLGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgOyBcclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmcEZvcm1dLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlczogW1wiZmlsdGVyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNU0zUzEgTC0xMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQnV0dG9uT25NYWluUm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHb3JkaWMuR2luLkZpbHRlclN0b3JhZ2VTZXJ2aWNlLlN0b3JlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbC8qLCBGaWx0ZXJWaWV3TW9kZS5Ob3JtYWwqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zYXZlT3B0aW9uc0Zvcm06IEdVY3JNYXNrYURldGFpbC5nZXRGb3JtKGdmIGFzIGFueSksIC8vVE9ETzogRGF0IHNwcmF2bnkgdHlwIGdyaWRmb3JtYXR1IVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHVWNyTWFza2FTZXJ2aWNlKHsgdHlwU2VzdGF2eTogdGhpcy50eXBTZXN0YXZ5LCBwYXJlbnRDb250ZW50OiB0aGF0LnBhcmVudENudCB9KSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXI6IFtcIkNsZWFyRmlsdGVyXCIsXCJDaG9zZUZpbHRlclwiXSxcclxuICAgICAgICAgICAgICAgICAgICAvL2FwcGx5OiAoZXYsIGRhdGEpID0+IHsgdGhpcy5sb2FkRGF0YU9sZChkYXRhLmZpbHRlcik7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXNldDogKGV2LCBkYXRhKSA9PiB7IHRoaXMuJGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpbHRlckJ1dHRvblZpc2libGU6IFwiQWx3YXlzVmlzaWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6IFwiT2JsaWJlbmVQb2RtaW5reVwiLCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdFVzZXJTZXR0aW5nczogXCJEZW55XCIgLy9OT1RFOiBaYWthenVqZSBwcmVwaW5hbmkgcG8gdnlobGVkYW5pIC0gcG9rdWQgc2UgbmVrZG8gcG9rb3VzZWwgdnltYXphdCBmaWx0ciB2IHRvbXRvIHJlemltdSwgdGFrIG11c2VsIGtsaWtub3V0IG5hIHZ5aGxlZGF0LCB2aXogVDM5ODdcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1bmFjdGVuaSBkYXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCByZWxvYWQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWV3LnJlcXVlc3REYXRhKCkuYWx3YXlzKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByaXN0dXBub3N0aSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmlzbFZpZXcgPSB0aGlzLmNyZWF0ZUxpc3RWaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkLm5ld0RpdihcImpzLXVjdFNlem5hbUtuaWhHcmlkXCIpXHJcbiAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsLy9cImZpdFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmlzbFZpZXcsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaVByaXN0dXBub3N0aSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5jcmVhdGVHcmlkRm9ybWF0KClcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIHZpZXcgcHJvIGxpc3RcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVMaXN0VmlldygpOiBHb3JkaWMuSXNsLlZpZXcge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLklzbC5WaWV3KFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVWN0S25paGEua25paHlLVXphdmVya2FtKFxyXG4gICAgICAgICAgICAgICAgKS51c2UoKHJlcSwgbmV4dCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS5maWx0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXEuZmlsdGVycyFbXCJmaWx0ZXJcIl0gPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5maWx0ZXJzID0geyBha3Rpdml0YTogeyBvOiBcIklOXCIsIHY6IFtHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrdGl2aXRhS25paHkuT3RldnJlbm8sIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWt0aXZpdGFLbmloeS5QcmlwcmF2ZW5vX2tfdXphdnJlbmldIH0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVxLmZpbHRlcnMhW1wiZmlsdGVyXCJdID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXEuZmlsdGVycyA9IHsgYWt0aXZpdGE6IHsgbzogXCJJTlwiLCB2OiBbR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa3Rpdml0YUtuaWh5LlV6YXZyZW5vX25lb2RsaXRvLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrdGl2aXRhS25paHkuVXphdnJlbm9fb2RsaXRvXSB9IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcS5maWx0ZXJzID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChyZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGF0LCByZXEsIG5leHQpIGFzIGFueTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC4kZmlsdGVyUGFuZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG8+IHtcclxuICAgICAgICAgICAgbGV0IGdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFuZUtuaWh5RHRvPigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm9rKHsgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzU2XCIsIGZyYWdtZW50OiBcInNkZW5cIiwgZGVzY3JpcHRpb246IFwianJlczozMDI1MDc0OFwiIH0pIC8vUkMgMzAyNTA3NTYgOiBSb2tcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwODYzXCIsIC8vUkMgMzAyNTA3NDcgOiBOw6F6ZXYga25paHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50Olwic2RlblwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInprcmF0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOlwianJlczozMDI1MDc1N1wiLCAvL1JDIDMwMjUwNzU3IDogWmtyYXRrYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAzOTJcIiwgLy9SQyAzMDI1MDM5MiA6IFprcmF0a2Ega25paHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwicmRhY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z19kZW5fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzU4XCIsIC8vUkMgMzAyNTA3NTggOiBLYXRlZ29yaWVcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNzQ5XCIsIC8vUkMgMzAyNTA3NDkgOiBLYXRlZ29yaWUga25paHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50OlwidWN0Y2t0ZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwidWktZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxODJcIiwgLy9SQyAzMDI1MDE4MiA6IFN0YXYga25paHlcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJla29jYWtyXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY2V0X3ZzZWNoX2Rva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDc2MFwiLCAvL1JDIDMwMjUwNzYwIDogRXZpZG92w6FubyBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA3NTlcIiwgLy9SQyAzMDI1MDc1OSA6IFBvxI1ldCBkb2tsYWTFryBha3R1w6FsbsSbIGV2aWRvdmFuw71jaCB2IGtuaXplXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiZG9rbGFkX3ZzZVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb2NldF91emF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChyb3cpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1bWEgPSBwYXJzZUludChyb3cucG9jZXRfdnNlY2hfZG9rbGFkdSkgLSBwYXJzZUludChyb3cucG9jZXRfbmV1emF2cmVueWNoX2Rva2xhZHUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VtYS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzYyXCIsIC8vUkMgMzAyNTA3NjIgOiBVemF2xZllbm8gZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNzYxXCIsIC8vUkMgMzAyNTA3NjEgOiBQb8SNZXQgZG9rbGFkxa8gZXZpZG92YW7DvWNoIGEgdXphdsWZZW7DvWNoXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiZG9rbGFkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvY2V0X25ldXphdnJlbnljaF9kb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDc2NFwiLCAvL1JDIDMwMjUwNzY0IDogTmV1emF2xZllbm8gZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNzYzXCIsIC8vUkMgMzAyNTA3NjMgOiBQb8SNZXQgZXZpZG92YW7DvWNoIG5ldXphdsWZZW7DvWNoIGRva2xhZMWvIGJyw6Fuw61jw61jaCB1emF2xZllbsOtIGtuaWh5XHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiZG9rbGFkX25ldXphdnJlbm9cIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9jZXRfbmVldmlkX2Rva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDc1M1wiLCAvL1JDIDMwMjUwNzUzIDogTmVldmlkb3bDoW5vIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDc2NVwiLCAvL1JDIDMwMjUwNzY1IDogUG/EjWV0IGRva2xhZMWvIHBvZGFuw71jaCBkbyBrbmloeSBhIG5lemFldmlkb3ZhbsO9Y2gsIGt0ZXLDqSByb3ZuxJvFviBtb2hvdSBicsOhbml0IHV6w6F2xJtyY2VcclxuICAgICAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJkb2tsYWRfbmVldmlkXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkSWNvKHsgZnJhZ21lbnQ6IFwic2RlblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVWNzKHsgZnJhZ21lbnQ6IFwic2RlblwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVXVzKHsgZnJhZ21lbnQ6IFwic2RlblwiIH0pICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRQaWQoeyBuYW1lOiBcIml4cF9kZW5cIiwgZnJhZ21lbnQ6IFwic2RlblwiIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpIGRsZSBzdGF2dSBhIHByYXYgZm9ybXVsYXJlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaVByaXN0dXBub3N0aSgpIHtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgbGV0IGVtcHR5Um93czogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBlbXB0eU1zZyA9IFwianJlczozMDI1MDcyNFwiOyAvL1JDIDMwMjUwNzI0IDogTmVuw60gdnlicsOhbmEgxb7DoWRuw6Ega25paGFcclxuICAgICAgICAgICAgbGV0IG96bmFjZW5lUmFka3k6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG9bXXxudWxsID0gW107XHJcbiAgICAgICAgICAgIGlmIChncmlkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBvem5hY2VuZVJhZGt5ID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG8+KGdyaWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChvem5hY2VuZVJhZGt5ICE9PSBudWxsICYmIHR5cGVvZiBvem5hY2VuZVJhZGt5ICE9IFwidW5kZWZpbmVkXCIgJiYgb3puYWNlbmVSYWRreS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlSb3dzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbXB0eVJvd3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RDbG9zZUJvb2tzPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogZW1wdHlNc2cgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T3BlbkJvb2tzPy51cGRhdGUoeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogZW1wdHlNc2cgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHZ5YnJhbmVTdGF2eSA9IHRoaXMuZmluZE96bmFjZW5lU3Rhdnkob3puYWNlbmVSYWRreSBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuUGVybWlzc2lvbnMuRW5hYmxlQ2xvc2luZy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2eWJyYW5lU3RhdnkuT3RldnJlbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5hY3RDbG9zZUJvb2tzPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnMuRW5hYmxlQ2xvc2luZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0Q2xvc2VCb29rcz8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDcyN1wiIH0pIC8vUkMgMzAyNTA3MjcgOiBWZSB2w71ixJtydSBuZW7DrSB2eWJyw6FuYSBvdGV2xZllbsOhIGtuaWhhXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZ5YnJhbmVTdGF2eS5VemF2cmVuZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE9wZW5Cb29rcz8udXBkYXRlUGVybWlzc2lvbih0aGlzLlBlcm1pc3Npb25zLkVuYWJsZUNsb3NpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdE9wZW5Cb29rcz8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDcyOFwiIH0pIC8vUkMgMzAyNTA3MjggOiBWZSB2w71ixJtydSBuZW7DrSB2eWJyw6FuYSB1emF2xZllbsOhIGtuaWhhXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFjdENsb3NlQm9va3M/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5QZXJtaXNzaW9ucy5FbmFibGVDbG9zaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0T3BlbkJvb2tzPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuUGVybWlzc2lvbnMuRW5hYmxlQ2xvc2luZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pIHN0YXZ1IHZ5YnJhbnljaCBrbmloXHJcbiAgICAgICAgICogQHBhcmFtIHJvd3NcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGZpbmRPem5hY2VuZVN0YXZ5KHJvd3M6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW5lS25paHlEdG9bXSk6IEdUeXB5VnlicmFueWNoS25paCB7XHJcbiAgICAgICAgICAgIGxldCBvdGV2cmVuYTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdXphdnJlbmE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDtpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gcm93c1tpXTtcclxuICAgICAgICAgICAgICAgIG90ZXZyZW5hID0gb3RldnJlbmF8fChpdGVtLmFrdGl2aXRhID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWt0aXZpdGFLbmloeS5PdGV2cmVubyB8fCBpdGVtLmFrdGl2aXRhID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWt0aXZpdGFLbmloeS5QcmlwcmF2ZW5vX2tfdXphdnJlbmkpO1xyXG4gICAgICAgICAgICAgICAgdXphdnJlbmEgPSB1emF2cmVuYXx8KGl0ZW0uYWt0aXZpdGEgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa3Rpdml0YUtuaWh5LlV6YXZyZW5vX25lb2RsaXRvIHx8IGl0ZW0uYWt0aXZpdGEgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa3Rpdml0YUtuaWh5LlV6YXZyZW5vX29kbGl0byk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3RldnJlbmEgJiYgdXphdnJlbmEpIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7IE90ZXZyZW5lOm90ZXZyZW5hLCBVemF2cmVuZTp1emF2cmVuYSB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IC8qfCBudWxswqgqLyB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuZ2dyaWQuanMtdWN0U2V6bmFtS25paEdyaWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgYXMgYW55IDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBuZXcgR0FjdGlvbkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgYWN0Q2xvc2VCb29rczogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVXphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNzE2XCIsIC8vUkMgMzAyNTA3MTYgOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA3NjdcIiwgLy9SQyAzMDI1MDc2NyA6IFV6YXbFmcOtdCBrbmloeVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCBcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuZU9wZXJhY2UoR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVQ1RUeXB5VXphdmVyZWtLbmloLlVaQVZSRU5JX0tOSUhZKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE9wZW5Cb29rczogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWnJ1c2l0VXphdnJlbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDcxN1wiLCAvL1JDIDMwMjUwNzE3IDogWnJ1xaFpdCB1emF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwNzY4XCIsIC8vUkMgMzAyNTA3NjggOiBacnXFoWl0IHV6YXbFmWVuw60ga25paHlcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuZU9wZXJhY2UoR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVQ1RUeXB5VXphdmVyZWtLbmloLlpOT1ZVT1RFVlJFTklfS05JSCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgb2JjZXJzdHZpdEFjdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT2JjZXJzdHZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIFR5cHkgdnlicmFueWNoIGtuaWhcclxuICAgICAqICovXHJcbiAgICBjbGFzcyBHVHlweVZ5YnJhbnljaEtuaWgge1xyXG4gICAgICAgIHB1YmxpYyBPdGV2cmVuZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBVemF2cmVuZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufSJdfQ==