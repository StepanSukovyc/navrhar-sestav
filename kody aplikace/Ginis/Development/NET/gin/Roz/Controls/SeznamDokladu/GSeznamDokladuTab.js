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
            var GSeznamDokladuTab_1;
            const gcontent = Decorators.gcontent;
            ;
            /**
             * Seznam rozpoctovych dokladu
             * */
            let GSeznamDokladuTab = GSeznamDokladuTab_1 = class GSeznamDokladuTab extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.taskId = "actSeznamDokladu";
                }
                //////////////////////////////////////////
                //#region Metoda onContentReady
                /**
                 * Prvotni zobrazeni seznamu
                 * */
                onContentReady() {
                    // Ulozim si this na aktualni tridu
                    const that = this;
                    // flash se stavem knihy
                    Gordic.Eko.Utils.ShowEkoBookStateFlash(that);
                    // Vytvoreni akci
                    // Kolekce actions je primo nad contentem, zapisuji tedy do this.actions
                    that.createActions();
                    ////////////////////////////////////
                    // Zaciname nacinat data
                    //this.beginOperation();
                    // Nacteni udaju ze SSL (dokument)
                    $.when(Gordic.Ssl.WebClient.GDokumentIsl.Init(GSeznamDokladuTab_1.getPresetDokumentColumns(), GSeznamDokladuTab_1.getPresetDokumentFields()), Gordic.Isl.Dokument.getColumnParams().getData())
                        .then((_, columnParams) => columnParams)
                        .then((dokumentParams) => {
                        // Pridani filtrovaciho panelu do stranky (vytvoreni jQuery elementu)
                        that.$filterForm = $("<div class='js-filtr'>").appendTo(this.element).gfilterpanel(new GRozFilterPanelParams().getFilterPanelParams(that, dokumentParams, this.filter));
                        // Vytvoreni gridu a naplneni objektu nactenymi daty
                        that.createGrid(dokumentParams);
                        // Zaregistrovani nahledu seznamu
                        that.registerPreview();
                        // Focus na grid
                        //-------------------
                        let focusFunc = function () {
                            let grid = WebClient.getGrid(that);
                            if (grid == null)
                                return;
                            let view = grid.ggrid("getView");
                            grid.ggrid("focus");
                            // focus pouze pri prvnim zpracovani
                            view.off("change.focus", focusFunc);
                        };
                        let view = that.$grid.ggrid("getView");
                        view.on("change.focus", focusFunc);
                    });
                    /*
                    
                                this.beginOperation();
                    
                                // Nacteni sloupecku dokumentu
                                //-----------------------------
                                this.dokumentInit().then((dokumentParams) => {
                                    this.endOperation();
                    
                                    // Pridani filtrovaciho panelu
                                    that.createFilterPanel(dokumentParams);
                    
                                    // Vytvoreni gridu a naplneni objektu nactenymi daty
                                    that.createGrid(dokumentParams);
                    
                                    // Zaregistrovani nahledu seznamu
                                    that.registerPreview();
                                    // Focus na grid
                                    //-------------------
                                    let focusFunc = function () {
                                        let grid = getGrid(that);
                                        if (grid == null) return;
                                        let view = grid.ggrid("getView");
                                        grid.ggrid("focus");
                                        // focus pouze pri prvnim zpracovani
                                        (view as any).off("change.focus", focusFunc);
                                    };
                                    let view = that.$grid.ggrid("getView");
                                    view.on("change.focus", focusFunc);
                    
                                    //view.getLoadingPromise()
                                });
                    
                    */
                    // úvodní rozbor přístupnosti tlačítek a akcí na seznamu
                    //if (that.needLoad)
                    //    that.actions!.actObcerstvit!.run();
                    //else
                    //  that.pristupnostAkciSeznamu(); 
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda akceSeznamu
                createActions() {
                    var that = this;
                    // Nejprve vytvorim jednotlive akce, ktere priradim do kolekce
                    // that.actions: GActionList
                    // !! POZOR, neumi priradit kolekci, musi se to po jednom !!
                    that.actions.addRange({
                        tiskKnihaRDAct: GAction.createPrintAction({
                            name: "tiskKnihaRDAct",
                            caption: "jres:30250083", //RC 30250083 : Tisk knihy RD
                            tooltip: "jres:30250083", //RC 30250083 : Tisk knihy RD
                            tema: "roz_ptm_krddok",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                // nacteni filtru
                                rep.customDto = { Tema: rep.tema, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                            }
                        }),
                        tiskPolozekRDAct: GAction.createPrintAction({
                            name: "tiskPolozekRDAct",
                            caption: "jres:30250084", //RC 30250084 : Tisk položek RD
                            tooltip: "jres:30250084", //RC 30250084 : Tisk položek RD
                            tema: "roz_ptm_krdpol2",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                //rep.customDto.Tema = "uct_ptm_kudpol";
                                rep.customDto = { Tema: rep.tema, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                                //rep.customDto = that.PredanaData;
                            }
                        }),
                        tiskvsechRDDAct: GAction.createPrintAction({
                            name: "tiskvsechRDDAct",
                            caption: "jres:30250086", //RC 30250086 : Tisk všech rozpočtových dokladů
                            tooltip: "jres:30250086", //RC 30250086 : Tisk všech rozpočtových dokladů
                            tema: "roz_ptm_dokzau1",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            reportStarting: function (rep) {
                                rep.customDto = { Tema: rep.tema, IDSestavy: 13, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData"), SeznamPidu: that.$grid.ggrid("getSelection") };
                            }
                        }),
                        tiskvybranychRDAct: GAction.createPrintAction({
                            name: "tiskvybranychRDAct",
                            caption: "jres:30250087", //RC 30250087 : Tisk vybraných rozpočtových dokladů
                            tooltip: "jres:30250087", //RC 30250087 : Tisk vybraných rozpočtových dokladů
                            tema: "roz_ptm_dokzau1",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                rep.customDto = { Tema: rep.tema, IDSestavy: 10, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData"), SeznamPidu: that.$grid.ggrid("getSelection") };
                            }
                        }),
                        tiskZaverRozpOpatreniAct: GAction.createPrintAction({
                            // tisk zaverecne rozpoctove opatreni
                            name: "tiskZaverRozpOpatreniAct",
                            caption: "jres:30250089", //RC 30250089 : Závěrečné rozpočtové opatření
                            tooltip: "jres:30250089", //RC 30250089 : Závěrečné rozpočtové opatření
                            tema: "roz_ptm_krdpol3",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                // nacteni filtru
                                rep.customDto = { Tema: rep.tema, IDSestavy: 3, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                            }
                        }),
                        tiskOcekavanaSkutecnostAct: GAction.createPrintAction({
                            // tisk zaverecne rozpoctove opatreni
                            name: "tiskOcekavanaSkutecnostAct",
                            caption: "jres:30250090", //RC 30250090 : Očekávaná skutečnost
                            tooltip: "jres:30250090", //RC 30250090 : Očekávaná skutečnost
                            tema: "roz_ptm_krdpol3",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                // nacteni filtru
                                rep.customDto = { Tema: rep.tema, IDSestavy: 13, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                            }
                        }),
                        tiskVyporadaniRozpoctuAct: GAction.createPrintAction({
                            // tisk zaverecne rozpoctove opatreni
                            name: "tiskVyporadaniRozpoctuAct",
                            caption: "jres:30250091", //RC 30250091 : Vypořádání rozpočtu
                            tooltip: "jres:30250091", //RC 30250091 : Vypořádání rozpočtu
                            tema: "roz_ptm_krdpol3",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                // nacteni filtru
                                rep.customDto = { Tema: rep.tema, IDSestavy: 14, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                            }
                        }),
                        tiskMimorozpoctoveProstredkyAct: GAction.createPrintAction({
                            // tisk zaverecne rozpoctove opatreni
                            name: "tiskMimorozpoctoveProstredkyAct",
                            caption: "jres:30250092", //RC 30250092 : Mimorozpočtové prostředky
                            tooltip: "jres:30250092", //RC 30250092 : Mimorozpočtové prostředky
                            tema: "roz_ptm_krdpol3",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                // nacteni filtru
                                rep.customDto = { Tema: rep.tema, IDSestavy: 23, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                            }
                        }),
                        tiskPrevodDoRFAct: GAction.createPrintAction({
                            // tisk zaverecne rozpoctove opatreni
                            name: "tiskPrevodDoRFAct",
                            caption: "jres:30250093", //RC 30250093 : Převod RZ do rezervního fondu
                            tooltip: "jres:30250093", //RC 30250093 : Převod RZ do rezervního fondu
                            tema: "roz_ptm_krdpol3",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                // nacteni filtru
                                rep.customDto = { Tema: rep.tema, IDSestavy: 24, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                            }
                        }),
                        tiskPrevodMRZDoRFAct: GAction.createPrintAction({
                            // tisk zaverecne rozpoctove opatreni
                            name: "tiskPrevodMRZDoRFAct",
                            caption: "jres:30250094", //RC 30250094 : Převod MRZ do a z rezervního fondu
                            tooltip: "jres:30250094", //RC 30250094 : Převod MRZ do a z rezervního fondu
                            tema: "roz_ptm_krdpol3",
                            serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                            enabled: false,
                            favorite: false,
                            reportStarting: function (rep) {
                                // nacteni filtru
                                rep.customDto = { Tema: rep.tema, IDSestavy: 25, Filtry: WebClient.getFilter(that).gfilterpanel("getCurrentData") };
                            }
                        }),
                        ["actPodani" /* Actions.Podani */]: Gordic.Eko.Action.actionPodat({
                            run: function () {
                                this.setPending(that.akcePodani());
                            }
                        }),
                        ["actDetail" /* Actions.Detail */]: Gordic.Eko.Action.actionDetail({
                            enabled: false,
                            run: (ev, ctx) => {
                                var currentRow;
                                // Dle podminek si zjisti aktivni radek
                                if (ctx.cellInfo != null) { // double click z gridu
                                    currentRow = ctx.cellInfo.data; // data, ze kterych byl vytvoren radek
                                }
                                else if (ctx.comparatorItem != null) { // pokud bylo spuštěno z porovnávače, bude předán comparatorItem
                                    currentRow = ctx.comparatorItem;
                                }
                                else { //jinak je potřeba načíst vysvícený řádek v gridu
                                    // Odkaz na grid mam v modularni promenne $grid
                                    currentRow = Gordic.Eko.Grid.currentRow(that.$grid);
                                }
                                // Pro aktivni radek zobraz detail
                                if (currentRow != null)
                                    that.openDetail(currentRow, 2 /* Gordic.Uct.Interface.GEAkceFormulare.Read */);
                                else
                                    that.dialogs.warning("jres:30250505", //RC 30250505 : Upozornění
                                    "jres:30250506"); //RC 30250506 : Není vybraný řádný řádek
                            }
                        }),
                        actDetailDoZalozky: Gordic.Eko.Action.actionDetailDoZalozky({ run: function () { this.setPending(that.openDetailInNewTab()); } }),
                        actOznacitPrectene: Gordic.Eko.Action.actionOznacitJakoPrectene({
                            name: "actOznacitPrectene",
                            caption: "jres:30250070", //RC 30250070 : Označit jako přečtené
                            //icon: "fa-envelope-open-o",
                            enabled: false,
                            run: function () {
                                Gordic.Roz.WebClient.OznacitDoklady(that, true, Gordic.Eko.Grid.checkedRows(that.$grid));
                            }
                        }),
                        actOznacitNeprectene: Gordic.Eko.Action.actionOznacitJakoNeprectene({
                            //name: "actOznacitNeprectene",
                            //caption: "jres:30250071", //RC 30250071 : Označit jako nepřečtené
                            //icon: "fa-envelope",
                            enabled: false,
                            run: function () {
                                Gordic.Roz.WebClient.OznacitDoklady(that, false, Gordic.Eko.Grid.checkedRows(that.$grid));
                            }
                        }),
                        actHromadnaKontrolaMetadat: Gordic.Eko.Action.actionKontrolaMetadat({
                            name: "actHromadnaKontrolaMetadat",
                            //caption: "jres:30250072", //RC 30250072 : Kontrola metadat
                            //tooltip: "jres:30250073", //RC 30250073 : Hromadné kontrola metadat
                            enabled: false,
                            run: function () {
                                that.HromadneOperace(that, 8 /* Gordic.Uct.Interface.GEUctHromadneOperace.KontrolaMetadat */);
                            }
                        }),
                        actHromadnePrevzeti: Gordic.Eko.Action.actionPrevzit({
                            name: "actHromadnePrevzeti",
                            //caption: "jres:30250074", //RC 30250074 : Převzetí
                            //tooltip: "jres:30250075", //RC 30250075 : Hromadné převzetí dokladů
                            //icon: Gordic.Gin.Icons.ActionEnum.prevzit,
                            enabled: false,
                            run: function () {
                                that.HromadneOperace(that, 0 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prevzeti */);
                            }
                        }),
                        actHromadnaPreevidence: Gordic.Eko.Action.actionPreevidovat({
                            name: "actHromadnaPreevidence",
                            //caption: "jres:30150043", //RC 30150043 : Přeevidence
                            //tooltip: "jres:30250076", //RC 30250076 : Hromadná přeevidence dokladů
                            enabled: false,
                            run: function () {
                                that.HromadneOperace(that, 1 /* Gordic.Uct.Interface.GEUctHromadneOperace.Preevidence */);
                            }
                        }),
                        actHromednePridelit: Gordic.Eko.Action.actionPridelit({
                            //icon: "gi-pridelit g-state-error g-state-text",                                                       // TODO
                            enabled: false, // vždy editovatelné
                            run: function (ev, ctx) {
                                that.HromadneOperace(that, 6 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prideleni */); // hromadná operace - PŘIDĚLENÍ
                            }
                        }),
                        actHromadnePredat: Gordic.Eko.Action.actionPredat({
                            //icon: "gi-predat g-state-warning g-state-text",                                                         // TODO
                            enabled: false, // vždy editovatelné
                            run: function (ev, ctx) {
                                that.HromadneOperace(that, 7 /* Gordic.Uct.Interface.GEUctHromadneOperace.Predani */); // hromadná operace - PŘEDÁNÍ
                            }
                        }),
                        actHromUzavDoklVyb: Gordic.Eko.Action.actionUzavrit({
                            name: "actHromUzavDoklVyb",
                            //caption: "jres:30250077", //RC 30250077 : Uzavření dokladů
                            //tooltip: "jres:30250078", //RC 30250078 : Hromadné uzavření dokladů
                            enabled: false,
                            run: function () {
                                that.HromadneOperace(that, 3 /* Gordic.Uct.Interface.GEUctHromadneOperace.Uzavreni */);
                            }
                        }),
                    });
                    // Definice menu tisku
                    let menuTisk = {
                        id: "actTiskSeznam",
                        type: "static",
                        caption: "jres:30150045", //RC 30150045 : Tisk
                        tooltip: "jres:30150045", //RC 30150045 : Tisk
                        icon: "gi-print",
                        favorite: true,
                        //enabled: false,
                        children: [
                            {
                                action: that.actions["tiskKnihaRDAct"],
                            },
                            {
                                action: that.actions["tiskPolozekRDAct"],
                            },
                            {
                                type: "static",
                                id: "tiskPrehleduPorPolozekAct",
                                caption: "jres:30250088", //RC 30250088 : Přehled pořízených položek RD
                                tooltip: "jres:30250088", //RC 30250088 : Přehled pořízených položek RD
                                favorite: false,
                                children: [
                                    {
                                        action: that.actions["tiskZaverRozpOpatreniAct"],
                                    },
                                    {
                                        action: that.actions["tiskOcekavanaSkutecnostAct"],
                                    },
                                    {
                                        action: that.actions["tiskVyporadaniRozpoctuAct"],
                                    },
                                    {
                                        action: that.actions["tiskMimorozpoctoveProstredkyAct"],
                                    },
                                    {
                                        action: that.actions["tiskPrevodDoRFAct"],
                                    },
                                    {
                                        action: that.actions["tiskPrevodMRZDoRFAct"],
                                    }
                                ]
                            },
                            {
                                action: that.actions["tiskvsechRDDAct"],
                            },
                            {
                                action: that.actions["tiskvybranychRDAct"],
                            }
                        ]
                    };
                    // Definovane akce pridam do menu (atribut favorite zobrazi polozku v hornim panelu)
                    // that.actions obsahuje akce vlozene vyse. Je to kolekce akci
                    that.menuBar([
                        { action: that.actions.actPodani, favorite: true },
                        { action: that.actions.actDetail, favorite: true },
                        { action: that.actions.actDetailDoZalozky, favorite: false },
                        //{ type: "separator" },
                        menuTisk,
                        //{ type: "separator" },
                        //{
                        //id: "menuHromadOperace", caption: "jres:30250069", type: "static", favorite: true, children: [ //RC 30250069 : Hromadné operace
                        { id: "menuRozSezHromUzavDoklVyb", action: that.actions["actHromUzavDoklVyb"], favorite: false },
                        { type: "separator" },
                        { id: "menuRozSezHromadnePreevidence", action: that.actions.actHromadnaPreevidence },
                        { id: "menuRozSezHromadnePrivzeti", action: that.actions.actHromadnePrevzeti },
                        { id: "menuUctSezPredaniDokladu", action: that.actions.actHromadnePredat },
                        { id: "menuUctSezPrideleniDokladu", action: that.actions.actHromednePridelit },
                        { type: "separator" },
                        { id: "menuRozSezHromadnaKontrolaMetadat", action: that.actions.actHromadnaKontrolaMetadat },
                        { type: "separator" },
                        { id: "menuaRoztSezOznacitPrectene", action: that.actions.actOznacitPrectene },
                        { id: "menuRozSezOznacitNeprectene", action: that.actions.actOznacitNeprectene }
                        //]
                        //},
                        //{ action: that.actions.actTisk, favorite: true },
                        //{ action: that.actions.actObcerstvit, favorite: true }
                    ]);
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda createGrid - vytvoreni gridu a jeho funkcnosti
                /**
                 * Metoda pro vytvoreni a obslouzeni funkcnosti gridu seznamu
                 * */
                createGrid(documentParams) {
                    const that = this;
                    const view = new Gordic.Isl.View(that.isl.RozDoklad.list( // Vytvori TaskIsl. Posila se mu vzdycky jen filtry a fragmenty. Vnitrne si vola get()
                    ).use((req, next, ctx) => {
                        return next(req).then((result) => {
                            this.pristupnostAkciSeznamu(result.meta, result.data.length);
                            return result;
                        });
                    }), {
                        filterPanel: that.$filterForm,
                        key: "ixp",
                        startEmpty: true,
                    });
                    const gridFormat = this.createGridFormat(documentParams);
                    // defaultni profil
                    const defaultProfile = gridFormat.columns.filter((item) => {
                        // z defaultniho profilu vyradim vlastnosti z WFL (prisene moc sloupcu) a soucty Prijem a Vydej
                        return item.name?.toLowerCase().indexOf("vlastnost") === -1
                            && item.name?.toLowerCase().indexOf("dokument" /* Uct.Interface.GRozSeznamDokladuDtoFragments.dokument */) === -1
                            && "c0".search(item.name?.toLowerCase()) === -1
                            && "c1".search(item.name?.toLowerCase()) === -1;
                    });
                    // Podminene formatovani
                    const condFormat = this.createConditionFormat();
                    // Grid si ulozim do modularni promenne, abych se na nej nemusel vsude odkazovat
                    that.$grid = $.newDiv("js-seznamDokladu") // Vytvor div pro vlozeni gridu a oznac si jej js-tirdou pro snazsi identifikaci pomoci jQuery
                        .gautofit() //  .css("height", "100%") -- vyplnění widgetu na celou obrazovku. Lze použít místo nastavení height.
                        .appendTo(that.element) // vloz grid dovnitr html elementu this (aktualni element). Vrat odkaz na jQuery grid do promenne $grid
                        ////////////////////////////////////
                        // Obsluha funkcnosti widgetu
                        .ggrid({
                        columnMode: "full", // rezim  sirek sloupcu (typ zobrazeni gridu). Absolutni sirky sloupcu (default fit - responzivni)
                        sort: "ac_ag DESC",
                        scrollHelperTemplate: "{ixp}/{ac_ag}",
                        multi: true, // Integrovaná podpora výběru více než jednoho řádku (zapíná integrované checkboxy a jiné mechanismy pro hromadný výběr). 
                        userSettings: that.userSettings, // Vlozim mu objekt uzivatelskeho nastaveni - zŕejmne pro dalsi zpracovani
                        defaultAction: that.actions.actDetail, // vychozi akce gridu pro akcni vyber (dvojklik, enter atd)
                        searchColumns: ["ixp", "popis"], // sloupce, podle kterých se vyhledává v searchboxu
                        data: view, /*new Gordic.Data.View(that.data, { key: "ixp" }),*/
                        columns: gridFormat,
                        /**
                            * Lokalni nabidka
                            * @param cellContext
                            */
                        contextMenu: function (cellContext) {
                            return that.actions.createBar(that.getMenuActions(true, cellContext));
                        },
                        // Událost nastává při změně výběru řádků v gridu. 
                        // OPTIMALIZACE: Událost se typicky volá během přejíždění kurzorem po řádcích gridu. Proto v události neprovádějte náročné operace, např. zbytečné getSelection() na velkých datech.
                        // info.count -	počet označených řádků
                        // info.getSelection() - instanční delegát na metodu getSelection(). OPTIMALIZACE: protože getSelection() je relativně pomalá (musí procházet všechny řádky), je vhodnější, kde to jde, dělat rozhodnutí na základě počtu řádků, který je k dispozici ihned. 
                        // info.view - aktualně zobrazená data
                        selection: function (ev, info) {
                            // Zde se nemohu odkazovat na objekt $grid, musim nacitat pres class gridu
                            //var vybraneRadky = that.find(".js-seznamDokladu").ggrid("getSelection");                // načtení přes vyhledání gridu (přes class)
                            //if (vybraneRadky !== null && vybraneRadky.length === 1) {                           // je vybrán jeden řádek
                            //    that.actions.actStornoDokladu.update({ enabled: true });                        // STORNO aktivní
                            //}
                            //else {                                                                              // je vybráno více dokladů
                            //    that.actions.actStornoDokladu.update({ enabled: false });                       // STORNO neaktivní
                            //}
                        },
                        // Událost nastává při změně polohy kurzoru. 
                        // OPTIMALIZACE: V naprosté většině případů se (např. pro zobrazení přípustných akcí) má použít událost selection. cellActivate je určena pro speciální operace, které téměř výhradně zajímá index řádku a navigaci obecně, místo jeho dat.
                        // info.cellInfo -informace o buňce/řádku, který se nově označil
                        // info.originalCellInfo - informace o buňce/řádku který byl původně označený
                        // info.view - aktualně zobrazená data
                        cellActivate: function (ev, info) {
                            // Zobrazeni ci skryti preview
                            if (info != null && info.cellInfo != null && info.cellInfo.data != null) {
                                that.previewController.enable(true);
                                that.previewController.show(info.cellInfo.data);
                            }
                            else {
                                that.previewController.enable(false);
                            }
                        },
                        defaultProfile: { sort: "!ac_ag", columnList: defaultProfile.map((c) => c.name).join(","), condFormats: condFormat }, //columnList: "zpracovatel, aktivita, cislo, nazev" },
                        profiles: [
                            {
                                name: "jres:30250264", sort: "!ac_ag", columnList: "ixp,ac_ag,ac,drd,ac_ixe,rok,mesic,den,ktgTypNazev,stav_txt, c,popis", //RC 30250264 : Zjednodušený
                                condFormats: condFormat
                            },
                            { name: "jres:30250265", condFormats: condFormat, sort: "!ac_ag", columnList: gridFormat.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1 && item.name?.toLowerCase().indexOf("dokument" /* Uct.Interface.GRozSeznamDokladuDtoFragments.dokument */) === -1).map((c) => c.name).join(",") } //RC 30250265 : Úplný
                        ],
                    })
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        // dlouhý seznam
                        longListAllowed: true,
                        //longListModel: "Global.Uct.AppSettings",
                        longListCountMethod: rq => { return that.isl.RozDoklad.count(rq).get(); },
                        longListModifyRqMethod: rq => { return rq?.filters ? true : false; }
                    });
                }
                /**
                 * Podminene formatovani
                 *
                 * */
                createConditionFormat() {
                    return [{
                            description: "jres:30250259", //RC 30250259 : Nepřečtené doklady
                            formula: "@priz_view==10",
                            //italic: true,
                            bold: true
                        },
                        {
                            description: "jres:30250260", //RC 30250260 : Schválené doklady
                            formula: "@s_zau==30",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.green
                        },
                        {
                            description: "jres:30250261", //RC 30250261 : Realizované doklady
                            formula: "@s_zau==40",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.blue
                        },
                        {
                            description: "jres:30250262", //RC 30250262 : Stornované doklady
                            formula: "@s_zau==90 or @preevidence==2",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.gray
                        },
                        {
                            description: "jres:30250263", //RC 30250263 : Uzavřené doklady
                            formula: "@s_zau==50",
                            text: Gordic.Components.Grid.CondFormats.CondFormatText.gray
                        },
                    ];
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda registerPreview
                registerPreview() {
                    console.log("Gordic.Roz.WebClient.GSeznamDokladuTab.registerPreview", this);
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
                    var that = this;
                    // Nastaveni options pro preview
                    var optionsPreview = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "roz:Doklad" // id preview, které má být zobrazeno, případně funkce která podle loadParams vrátí viewId
                            }),
                            Gordic.Previews.getFilePreviewTab({
                                ixpProvider: function (loadParams) { return loadParams.ixp; } // funkce, která má za úkol poskytnout ixp pro načtení el. obrazu
                            })
                        ]
                    };
                    that.previewController = new Gordic.Previews.GPreviewController(this.element, optionsPreview);
                    //that.previewController.registerPanel();
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda pristupnostAkciSeznam
                pristupnostAkciSeznamu(permisions, pocetRadku) {
                    console.log("Gordic.Roz.WebClient.GSeznamDokladuTab.pristupnostAkciSeznamu", this);
                    if (typeof permisions === "undefined")
                        permisions = this.permisions;
                    else
                        this.permisions = permisions;
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content
                    var that = this;
                    //var pocetRadku = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(that.$grid);
                    // podani
                    that.actions.actPodani?.updatePermission(permisions.CanCreate);
                    // zobrazit detail
                    that.actions.actDetail?.updatePermission(permisions.CanShowDetail);
                    that.actions.actDetail.update({
                        enabled: pocetRadku > 0,
                    });
                    // otevrit detail do nove zalozky
                    that.actions.actDetailDoZalozky.update({ enabled: that.actions.actDetail.enabled() });
                    // oznacit prectene
                    that.actions.actOznacitPrectene?.updatePermission(permisions.PovolenOznacitPrectene);
                    // oznacit neprectene
                    that.actions.actOznacitNeprectene?.updatePermission(permisions.PovolenOznacitNeprectene);
                    // kontrola metadat
                    that.actions.actHromadnaKontrolaMetadat?.updatePermission(permisions.PovoleniKontrolyMetadat);
                    // prevzit
                    that.actions.actHromadnePrevzeti?.updatePermission(permisions.PovoleniPrevzit);
                    // predani
                    that.actions.actHromadnePredat?.updatePermission(permisions.PovoleniPredat);
                    // preevidence
                    that.actions.actHromadnaPreevidence?.updatePermission(permisions.PovoleniPreevidence);
                    // pridelit
                    that.actions.actHromednePridelit?.updatePermission(permisions.PovoleniPridelit);
                    // uzavrit
                    that.actions.actHromUzavDoklVyb?.updatePermission(permisions.PovoleniUzavreni);
                    // Tisky
                    // knihy rozpoctovych dokladu
                    that.actions.tiskKnihaRDAct?.updatePermission(permisions.PovoleniTiskuKnihaRD);
                    // tisk polozek
                    that.actions.tiskPolozekRDAct?.updatePermission(permisions.PovoleniTiskuPolozekRD);
                    // tisk vsech dokladu
                    that.actions.tiskvsechRDDAct?.updatePermission(permisions.PovoleniTiskuVsechRD);
                    // tisk vybranych dokladu
                    that.actions.tiskvybranychRDAct?.updatePermission(permisions.PovoleniTiskuVybranychRD);
                    // tisk vybranych dokladu
                    that.actions.tiskZaverRozpOpatreniAct?.updatePermission(permisions.PovoleniTiskuZaverRozpOpatreni);
                    // tisk ocekavane skutecnosti
                    that.actions.tiskOcekavanaSkutecnostAct?.updatePermission(permisions.PovoleniTiskuOcekavanaSkutecnost);
                    // tisk vyporadani rozpoctu
                    that.actions.tiskVyporadaniRozpoctuAct?.updatePermission(permisions.PovoleniTiskuVyporadaniRozpoctu);
                    // tisk mimorozpoctove prostredky
                    that.actions.tiskMimorozpoctoveProstredkyAct?.updatePermission(permisions.PovoleniTiskuMimorozpoctoveProstredky);
                    // tisk prevod do rezervniho fondu
                    that.actions.tiskPrevodDoRFAct?.updatePermission(permisions.PovoleniTiskuPrevodDoRF);
                    // tisk prevod  mimorozpoctovych zdroju do rezervniho fondu
                    that.actions.tiskPrevodMRZDoRFAct?.updatePermission(permisions.PovoleniTiskuPrevodMRZDoRF);
                    //that.actions.actPodani!.visible(true); //that.akceSeznamu.PodaniVisible!);              
                    //that.actions.actPodani!.enabled(true); // that.akceSeznamu.PodaniEnable!);              
                    return;
                    //    that.actions.actDetail!.visible(that.akceSeznamu.DetailVisible!);
                    //    that.actions.actDetail!.enabled(that.akceSeznamu.DetailEnable!);
                    //    that.actions.actPredani!.visible(that.akceSeznamu.PredaniVisible!);
                    //    that.actions.actPredani!.enabled(that.akceSeznamu.PredaniEnable!);
                    //    that.actions.actPrideleni!.visible(that.akceSeznamu.PrideleniVisible!);
                    //    that.actions.actPrideleni!.enabled(that.akceSeznamu.PrideleniEnable!);
                    //    that.actions.actPreevidence!.visible(that.akceSeznamu.PreevidenceVisible!);
                    //    that.actions.actPreevidence!.enabled(that.akceSeznamu.PreevidenceEnable!);
                    //    that.actions.actPreevidence!.visible(that.akceSeznamu.KlicovaSlovaVisible!);
                    //    that.actions.actPreevidence!.enabled(that.akceSeznamu.KlicovaSlovaEnable!);
                    //    that.actions.actPreevidence!.visible(that.akceSeznamu.TiskVisible!);
                    //    that.actions.actPreevidence!.enabled(that.akceSeznamu.TiskEnable!);
                    //    that.actions.actPreevidence!.visible(that.akceSeznamu.ObcerstvitVisible!);
                    //    that.actions.actPreevidence!.enabled(that.akceSeznamu.ObcerstvitEnable!);
                }
                ;
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda openDetail
                /**
                 * Zobrazeni detailu rozpoctoveho dokladu
                 * @param currentRow aktivni radek | null
                 * @param action spustena akce ktera otevira detail
                 */
                openDetail(currentRow, action) {
                    let that = this;
                    // Pokud neni nalezeny aktualni radek, nic nedelej
                    if (!currentRow)
                        return;
                    // Otevreni detailu
                    let $detailWindow = that.navigate([
                        "Gordic.Roz.WebClient.GDetailDokladuTab", // nazev okna detailu (c# nebo ts ?)
                        {
                            uid: "RozDetailDokladu#",
                            // Vzdy se vytvori nove GPC s konkretni knihou. Tj. i kdyz je pohled pres vsechny knihy, tak pri zobrazeni detailu stojim v knize.
                            // Podani tedy probiha do knizy, ze ktere je zobrazeny detail
                            gpc: Gordic.Eko.Utils.createBookGpc(that.gpc, currentRow.ixp_den), // GPC s knihou z aktuálního záznamu
                            gridRemoteControl: new Gordic.Components.GridRC(that.$grid)
                        },
                    ], {
                        ixp: currentRow.ixp,
                        datumZmeny: currentRow.dat_zmena,
                        action: action, // Nacteni existujiciho detailu (read) nebo podani noveho dokladu (podani)
                    });
                    // obsluha aktivní operace na detailu
                    $.content($detailWindow).on("detail_change", (retVal) => {
                        // pokud byl záznam změněn, musí se načíst znovu
                        if (retVal != null && retVal.data && retVal.data.ixp && retVal.data.ixp != null) {
                            // aktualizace základního gridu
                            // Jak je to s View ????
                            //that.view.requestData({ filters: { ixp: retVal.data.ixp }, onlyPKWithoutFilters: true }, { updateMode: "update" });
                        }
                    });
                    // Nastaveni focusu do gridu po uzavreni contentu detailu 
                    // Parametry udalosti nejsou potreba, mohu je vyhodit
                    //$detailWindow.on("contentclosed", (ev, ctx) => { // function(ev,ctx) { ..... puvodni verze
                    $detailWindow.on("closed", (ev, ctx) => {
                        that.$grid.ggrid("focus");
                    });
                }
                //#endregion
                //////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                //#region PODANI DOKLADU
                /**
                 * akcePodani
                 *
                 * Zavolani akce podani
                 * @returns promise slibujici vysledek
                 * */
                akcePodani() {
                    var that = this; // this je zde content
                    // Vytvorim si promise, na nemz bude navazan cely retezec provadenych asynchronnich operaci 
                    // Cela operace by mela probehnout asynchronne, aby uzivatel mohl dal pracovat s prohlizecem
                    return $.Deferred().resolve().promise()
                        // V ramci retezce promise zobrazim informaci hlasku
                        .then(() => {
                        that.beginOperation("jres:30150072"); //RC 30150072 : Probíhá podání dokladu
                        return; // neni potreba vracet 
                    })
                        // A nyni jiz vlastni prubeh zpracovani. Volam asynchronni ISL metodu, ktera provede podani na serveru
                        // Jako vysledek volani je vracena do odpovedi promisu response
                        .then(() => {
                        return that.islPodani({
                            ixp: null,
                            dat_zmena: null,
                            action: 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */,
                            parameters: {
                                "RezimZadavaniPidu": Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(that, that.globals.DatabaseParams.PovolitGenerovaniPiduDokladu ? "ano" : "ne"),
                                // I kdyz je zapnuty pohled pres vsechny knihy, tak pri zobrazeni detailu stojim v knize.
                                // Podani tedy probiha do knihy, ze ktere je zobrazeny detail. Na detailu je VZDY kniha vyplnena
                                "PohledPresKnihy": (Gordic.Eko.Utils.getEkoBookVariant(that) === 1 /* Eko.Interface.GEkoBookVariant.One */) ? 0 : 1 // zapnuty pohled pres vsechny knihy(0 - ne, 1 - ano)
                            }
                        });
                    })
                        // V pripade, ze vse probehlo v poradku, tak nacti data
                        .then((response) => {
                        that.openDetail({ ixp: response.data.header.ixp, dat_zmena: response.data.header.dat_zmena }, 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */);
                    })
                        // Nakonec smaz informacni hlasku
                        .always(() => {
                        that.endOperation(); // smaz informacni hlasku
                        return;
                    });
                }
                /**
                 * islPodani
                 *
                 * Metoda ktera spusti serverove ISL podani
                 *
                 * @param request vstupni parametry ISL metody obsahujici ixp, datum zmeny + dalsi mozne parametry pro opakovani operace - viz. popis GRozDokladInDto
                 * @returns promise vraceni slibu, ze provede na serveru podani a vrati vyplnene GRozDokladInDto
                 * */
                islPodani(request) {
                    let that = this;
                    let promise = this.isl.RozDoklad.create(request).get();
                    // Pokud vse probehne spravne, vratim promise.resolve a po vraceni si zobrazi data
                    // V pripade chyby ji zde zpracuji. Obecne chyby posilam dal ke spolecnemu zpracovani. Zde si zpracuji pouze ty "svoje"
                    // Je to proto, ze metodu zde volam rekuzivne
                    promise = promise.catch((err) => {
                        // Pokud err neni chyba ze serveru, tak ji jen posli vys
                        if (!(err instanceof GServerError))
                            throw err;
                        // Nutna kontrola, ne vzdy vyjimka obsahuje DataInvalidDetails, pak je potreba nechat zpracovat standardne.
                        if (!err.data || !err.data.DataInvalidDetails)
                            throw err;
                        const exc = err.details;
                        // Promenna pro ulozeni dailogu
                        let $dialog;
                        exc.handled = true; // Nastav si priznak, ze chyba byla osetrena
                        that.endOperation(); // smaz informacni hlasku
                        //////////////////////////////////////////////////////
                        // Osetreni chyby
                        if (exc.data.DataInvalidDetails.exceptionType == 4 /* Uct.Interface.GETypyChyb.error */) {
                            $dialog = that.dialogs.error(exc.baseMessage);
                            return $dialog.createDialogPromise("yes"); // Vraci se vzdy OK, tudiz vzdy vrati reject (error nevraci yes/no ale OK)
                        }
                        ;
                        //////////////////////////////////////////////////////
                        // Osetreni dotazu
                        if (exc.data.DataInvalidDetails.exceptionType == 2 /* Uct.Interface.GETypyChyb.question */) {
                            exc.baseMessage += "jres:30150073"; //RC 30150073 : ;Chcete pokračovat ?
                            $dialog = that.dialogs.confirm(exc.baseMessage);
                            return $dialog.createDialogPromise("yes")
                                .then(() => {
                                request.member = exc.data.member; // Ulozim si chybovy kod
                                request.addInfo = exc.data.addInfo;
                                return that.islPodani(request); // Volam rekurzivne akci zmenenym requestem
                            });
                        }
                        ;
                        //////////////////////////////////////////////////////
                        // Zobrazeni formulare
                        if (exc.data.DataInvalidDetails.exceptionType == 5 /* Uct.Interface.GETypyChyb.showForm */) {
                            // Vytvorim formular pro zadani pidu
                            $dialog = Gordic.Wfl.Dialogs.GenerovaniIxpDlg(that, // parentContent
                            {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                                DotazPriExistenciVJineAgende: false,
                                HlaseniPriExistenciVAgende: false,
                                ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremGinGenIxp
                            }, Gordic.Global.Enums.ModOtevreni.showModalWindow // Mod otevreni
                            // Vytvorim z okna promise. A testuji navratovou hodnotu z okna.
                            );
                            // Vratim promise, ktery slibuje, ze vrati vyplnenou hodnotu
                            return $dialog.createDialogPromise(data => data !== undefined)
                                .then((data) => {
                                request.ixp = data.Ixp; // Ulozim si zadane cislo dokladu
                                request.member = exc.data.member; // Ulozim si chybovy kod
                                request.addInfo = exc.data.addInfo;
                                return that.islPodani(request); // Volam rekurzivne podani dokladu se zmenenym requestem
                            })
                                .catch(() => {
                                // Vytvor si jQuery dialog
                                const $dialog = that.dialogs.error("jres:30150102"); //RC 30150102 : Akce byla stornována uživatelem
                                // a vrat slib, ze 
                                return $dialog.createDialogPromise("yes"); //vždy reject, nikdy nevrati yes
                            });
                        }
                    });
                    return promise;
                }
                //#endregion PODANI DOKLADU
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                /**
                 * Metoda pro vytvoreni sloupcu seznamu
                 *
                 * @returns {Gordic.Data.GridFormat<TDto>} pole sloupců pro ggrid
                 * @description Vsechny metody jsou v Gordic.Eko.WebClient/Eko/Seznam/grid.methods.ts
                 * */
                createGridFormat(documentParams) {
                    const columns = new Gordic.Data.GridFormat()
                        .addTypEntity({ fragment: "*" /* Uct.Interface.GRozSeznamDokladuDtoFragments.typ_entity_ico */ })
                        .addVlastnictvi({ fragment: "vlastnictvi" /* Uct.Interface.GRozSeznamDokladuDtoFragments.vlastnictvi */ })
                        .addPrecteno()
                        .addPreevidence({ fragment: "*" /* Uct.Interface.GRozSeznamDokladuDtoFragments.preevidence */ })
                        .addPocetElPriloh({ name: "poc_epri", field: "poc_epri", fragment: "el_prilohy_pocet" /* Eko.Interface.GWflForEkoDtoNames.el_prilohy_pocet */ })
                        .addElObraz()
                        // Pridani sloupcu WFL
                        .addWflColumns()
                        // barevne oznaceni radku
                        .addBarevneOznaceni({ fragment: "*" /* Uct.Interface.GRozSeznamDokladuDtoFragments.uzo */ }, undefined, undefined, (row) => row.ixs_fun_akt != $.content("main").IxsFunAkt, this.globalSettings)
                        // Data z hlavicky dokladu 
                        // TODO - nutno vsude doplnit fragmenty z duvodu profilu
                        .addPid() //, { fragment: Gordic.Uct.Interface.ixp });
                        .addAgendoveCislo()
                        .addEvidencniCislo()
                        .addDruhDokladu()
                        .addRok()
                        .addMesic()
                        .addDen()
                        .addCisloDokladu() //, { fragment: Gordic.Uct.Interface.ac_ixe });
                        .addTypDokladu() //, { fragment: Gordic.Uct.Interface.ixs_typ_txt });
                        .addStavDokladu() //, { fragment: Gordic.Uct.Interface.s_zau_txt });
                        .addCastka({ name: "c", field: "c", description: "jres:30250258" }) //, { fragment: Gordic.Uct.Interface.c }); //RC 30250258 : částka na dokladu
                        .addZpracovatel({ fragment: "*" /* Gordic.Uct.Interface.GRozSeznamDokladuDtoFragments.ixs_fun_akt_txt */ }) //, { fragment: Gordic.Uct.Interface.ixs_fun_akt_txt });
                        .addPopis()
                        // pomocne neviditelne pole pro podminene formatovani
                        .addNumberColumn({ name: "s_zau", hidden: true })
                        .addNumberColumn({ name: "preevidovano", hidden: true })
                        .addNumberColumn({ name: "priz_view", hidden: true });
                    let scopeDokument = this.extendScope(undefined, "dokument" /* Uct.Interface.GRozSeznamDokladuDtoFragments.dokument */, "Dokument", //"jres:30250500", //RC 30250500 : Dokument
                    "");
                    // sloupce dokumentu
                    if (documentParams != null)
                        Gordic.Ssl.WebClient.GDokumentIsl.AddGridColumnsImmediate(documentParams, columns, GSeznamDokladuTab_1.getPresetDokumentColumns(), {
                            scopeLevels: scopeDokument
                        });
                    let scopeVlastnosti = this.extendScope(undefined, "vlastnost" /* Uct.Interface.GRozSeznamDokladuDtoFragments.vlastnosti */, "jres:30250501");
                    let scoV = scopeVlastnosti.map(i => i.scope).join(Gordic.Gin.WebClient.GSharedIsl.NameSeparator);
                    let scoVT = scopeVlastnosti.map(i => i?.scopeTitle).filter(i => i?.trim()).join(" - ");
                    let sxsTyp = [{ sxs: null, typ_obj: 436 /* Uct.Interface.GETypObjektu.KnihaROZ */ }];
                    this.ixsTypy.forEach(item => sxsTyp.push({ sxs: item, typ_obj: 680 /* Uct.Interface.GETypObjektu.TypDokumentu */ }));
                    // Rozsirene vlastnosti
                    columns.add(Gordic.PopisneVlastnosti.createSxsTypGridFormat({
                        scope: scoV,
                        ixs_typ: this.ixsTypy,
                        typ_obj: [436 /* Uct.Interface.GETypObjektu.KnihaROZ */],
                        sxs_typ: sxsTyp,
                        scopeTitle: scoVT
                    }));
                    // vlastnosti
                    //columns.add(Gordic.PopisneVlastnosti.createGridFormat("vlastnosti"))
                    //    ;
                    return columns;
                }
                /**
                    * Seznam akcí pro menu (hamburger nebo kontextové menu gridu)
                    *
                    * @param {boolean} contextMenu formát pro kontextové menu gridu (true (default) = ano, false = ne)
                    * @param {IGGridCellContext<Gordic.Fuc.Interface.GZapoctovyListDto> | undefined} cellContext kontext z gridu (pouze pro contextMenu = true) (default = undefined)
                    * @returns {(string | undefined)[] | (string | (string | undefined)[] | { action: GAction | undefined; primary: true; favorite: true; })[]} seznam akcí
                    */
                getMenuActions(contextMenu = false, cellContext = undefined) {
                    return ["actPodani", "actDetail", "-", ["jres:30250271", "tiskPolozekRDAct", "tiskvsechRDDAct", //RC 30250271 : Tisk
                            "-", "jres:30250088", "tiskZaverRozpOpatreniAct", "tiskOcekavanaSkutecnostAct", "tiskVyporadaniRozpoctuAct", "tiskMimorozpoctoveProstredkyAct", "tiskPrevodDoRFAct", "tiskPrevodMRZDoRFAct", //RC 30250088 : Přehled pořízených položek RD
                            "-", "tiskvsechRDDAct", "tiskvybranychRDAct"] /*, "-", "actObcerstvitSeznam"*/];
                    //                : ["actPodaniDokladu*", { action: content.actions.actDetailDokladu, primary: true, favorite: true }, ["jres:30250596", "actHromUzavDoklVyb", "actHromadneZauctovani", "actHromadnaPreevidence", "actHromadnePrevzeti", "actHromadnaKontrolaMetadat", "actOznacitPrectene"], "actOznacitNeprectene*"]; //RC 30250596 : Hromadné operace
                }
                /**
                * Přidání další úrovně do scope
                *
                * @param {Gin.WebClient.GScopeOptionLevel[] | undefined} scope scope
                * @param {string} newScope nový scope
                * @param {string} [newScopeTitleWOScope] titulek nového scope pro přidání do prázdného scope
                * @param {string} [newScopeTitleWScope] titulek nového scope pro přidání do neprázdného scope
                * @returns {Gin.WebClient.GScopeOptionLevel[]} výsledný scope
                */
                extendScope(scope, newScope, newScopeTitleWOScope, newScopeTitleWScope) {
                    // TODO: dočesat
                    let extendedScope = [];
                    let scopeLen = scope?.length || 0;
                    scope?.forEach((item, l) => {
                        if (l == scopeLen - 1 && newScopeTitleWScope)
                            extendedScope.push({ scope: item.scope });
                        else
                            extendedScope.push(item);
                    });
                    extendedScope.push({ scope: newScope, scopeTitle: (scope ? (newScopeTitleWScope ?? newScopeTitleWOScope) : newScopeTitleWOScope) });
                    return extendedScope;
                }
                /**
                 * Hromadne operace
                 * @param typOperace enumerator provadene hromadne operace
                 */
                HromadneOperace(content, typOperace) {
                    // zjisteni oznacenych radku
                    let oznaceneRadky = Gordic.Eko.Grid.checkedRows(this.$grid, false);
                    if (oznaceneRadky === null || oznaceneRadky === undefined || oznaceneRadky.length == 0) {
                        this.dialogs.alert("jres:30250067", //RC 30250067 : Upozornění
                        "jres:30250106"); //RC 30250106 : Nenalezeny žádné označené řádky
                        return;
                    }
                    // definice akce detail
                    var gridActionDetail = new GAction($.extend(true, Gordic.Eko.Action.actionDetail({
                        run: function (ev, ctx) {
                            const cnt = $.content(ev.target);
                            const $grid = $(ctx.grid);
                            if ($grid != null) {
                                // dohledání aktuálního záznamu a zobrazení detailu
                                const aktRadek = $grid.ggrid("activeRow");
                                if (aktRadek && !(aktRadek instanceof jQuery))
                                    Gordic.Roz.WebClient.ZobrazDetailDleIXP(cnt, aktRadek.ixp, null, false, undefined, undefined, aktRadek.ixp_den);
                                //ZobrazDetail(cnt, aktRadek)
                            }
                        },
                        enabled: true
                    }), { name: "actDetail" /* Actions.Detail */ }));
                    switch (typOperace) {
                        case 1 /* Gordic.Uct.Interface.GEUctHromadneOperace.Preevidence */:
                            this.HromadnaAkciRun(this, oznaceneRadky, {
                                action: typOperace,
                                IDSestavy: 12,
                                actioName: "jres:30250312", //RC 30250312 : Přeevidovat
                                description: "jres:30250278", //RC 30250278 : Akce provede přeevidenci vybraných dokladů do jiné knihy. Při přeevidenci je možné změnit Zpracovatele, případně Kompetenta.
                                serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                                tema: "wfl_ptm_hromprk",
                                title: "jres:30250276", //RC 30250276 : Přeevidence
                                titleBreadCrumb: "jres:30250285" //RC 30250285 : Přeevidence
                            }, gridActionDetail);
                            return;
                        case 7 /* Gordic.Uct.Interface.GEUctHromadneOperace.Predani */:
                            this.HromadnaAkciRun(this, oznaceneRadky, {
                                action: typOperace,
                                IDSestavy: 22,
                                actioName: "jres:30250351", //RC 30250351 : Předat
                                description: "jres:30250289", //RC 30250289 : Akce provede předání vybraných (zaškrtnutých) dokladů jinému zpracovateli. Při předání je případně možné změnit Kompetenta dokladu.
                                serverParameterMethod: "Gordic.Uct.WebClient.GUctPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                                tema: "wfl_ptm_hromprd",
                                title: "jres:30250290", //RC 30250290 : Předání
                                titleBreadCrumb: "jres:30250291" //RC 30250291 : Předání
                            }, gridActionDetail);
                            return;
                        case 8 /* Gordic.Uct.Interface.GEUctHromadneOperace.KontrolaMetadat */:
                            Gordic.Eko.Utils.KontrolaMetadat({ content: content, listIxp: oznaceneRadky.map((row) => row.ixp), detailAkce: WebClient.ZobrazDetailIxp });
                            return;
                        case 0 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prevzeti */:
                            this.HromadnaAkciRun(this, oznaceneRadky, {
                                action: typOperace,
                                IDSestavy: 0,
                                actioName: "jres:30250353", //RC 30250353 : Převzít
                                description: "jres:30250296", //RC 30250296 : Akce provede převzetí vybraných (zaškrtnutých) dokladů od jiného zpracovatele. Při převzetí je případně možné změnit Kompetenta dokladu.
                                serverParameterMethod: "",
                                tema: "wfl_ptm_hromprd",
                                title: "jres:30250297", //RC 30250297 : Převzít
                                titleBreadCrumb: "jres:30250297" //RC 30250297 : Převzít
                            }, gridActionDetail);
                            return;
                        case 6 /* Gordic.Uct.Interface.GEUctHromadneOperace.Prideleni */:
                            this.HromadnaAkciRun(this, oznaceneRadky, {
                                action: typOperace,
                                IDSestavy: 0,
                                actioName: "jres:30250299", //RC 30250299 : Přidělit
                                description: "jres:30250298", //RC 30250298 : Přidělit doklady jiné funkci
                                serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu",
                                tema: "wfl_ptm_hromprd",
                                title: "jres:30250299", //RC 30250299 : Přidělit
                                titleBreadCrumb: "jres:30250299" //RC 30250299 : Přidělit
                            }, gridActionDetail);
                            return;
                        case 3 /* Gordic.Uct.Interface.GEUctHromadneOperace.Uzavreni */:
                            this.HromadnaAkciRun(this, oznaceneRadky, {
                                action: typOperace,
                                IDSestavy: 0,
                                actioName: "jres:30250300", //RC 30250300 : Uzavřít
                                description: "jres:30250302", //RC 30250302 : Uzavření dokladů. S uzavřenými doklady již nejde dále pracovat.
                                serverParameterMethod: "",
                                tema: "wfl_ptm_hromprd",
                                title: "jres:30250300", //RC 30250300 : Uzavřít
                                titleBreadCrumb: "jres:30250300" //RC 30250300 : Uzavřít
                            }, gridActionDetail);
                            return;
                            return;
                        default:
                            content.dialogs.alert("jres:30250309", //RC 30250309 : Upozornění
                            "jres:30250308"); //RC 30250308 : Neznámá operace
                            return;
                    }
                }
                /**
                     * Spusteni hromade operace
                     * @param content
                     * @param selectedRows
                     * @param detailAkce
                 */
                HromadnaAkciRun(content, selectedRows, nastaveni, detailAkce) {
                    var that = content;
                    let cntWiz;
                    var actTiskHromadnaAkce = new GAction({
                        name: "actSelect", visible: false,
                        caption: "", run: function () { }
                    });
                    if (nastaveni.IDSestavy != 0) {
                        actTiskHromadnaAkce = Gordic.Eko.Action.actionTisk({
                            name: "actTiskHromadnaAkce",
                            tema: nastaveni.tema, //tema
                            serverParameterMethod: nastaveni.serverParameterMethod,
                            enabled: true,
                            favorite: false,
                            visible: nastaveni.IDSestavy != 0,
                            parentContent: that,
                            reportStarting: function (rep) {
                                debugger;
                                console.log(cntWiz);
                                let wiz = cntWiz.find(".ggrid")[0];
                                let $grid = $(wiz);
                                var seznam = Gordic.Eko.Grid.checkedRows($grid, true);
                                var def = $.Deferred();
                                WebClient.HromadnaOperaceGetParam(that.dialogs, cntWiz, seznam)
                                    .then((result) => {
                                    rep.customDto = { Tema: rep.tema, IDSestavy: nastaveni.IDSestavy, SeznamPidu: seznam, Data: result };
                                    def.resolve(rep);
                                    return;
                                });
                                return def.promise();
                            }
                        });
                    }
                    let modelData = { duvod: undefined, ixs_fun_akt: "", ixs_su: "", ixs_ref: "", cis_real: "", ixs_fun_vyriz: "", ixp_den: "", subrada: null };
                    let formParams = WebClient.HromadnaOperaceform(nastaveni.action, content, content.ekoBook.ixp_den);
                    cntWiz = that.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        // titulek v breadcrumbu
                        title: nastaveni.title, //RC 30250684 : Předání
                        // formát gridu
                        gridFormat: that.createGridFormatHromadneOperace(),
                        // primární klíč dat v gridu
                        keys: "ixp",
                        // data pro grid (pro první krok)
                        data: that.SetDataSelected(selectedRows),
                        // typ indikátorů nad gridem (KPI nebo badge)
                        indicatorType: "KPI",
                        // první krok - zadání parametrů a kontrola, při přechodu na další krok se zavolá spuštění vlastní operace
                        firstStep: {
                            // název kroku
                            title: "jres:30250295", //RC 30250295 : Zadání
                            // popis operace
                            description: nastaveni.description, //RC 30250649 : Akce provede předání vybraných (zaškrtnutých) dokladů jinému zpracovateli. Při předání je případně možné změnit Kompetenta dokladu.
                            // nad gridem zobrazit KPI/badge s počty záznamů
                            showIndicator: true,
                            // formulář s parametry
                            form: formParams,
                            // model pro parametry
                            modelData: modelData,
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250294", //RC 30250294 : Vybrané doklady
                            // obsluha změny parametru
                            fieldChangeDelegate: undefined,
                            // akce pro spusteni kontrolu uzivatelem
                            checkAction: (model, data) => {
                                modelData = model;
                                return content.isl.RozDoklad.hromadneOperaceValidace({
                                    rq: {
                                        Akce: nastaveni.action,
                                        Seznam: data,
                                        IxpDenNew: model.ixp_den,
                                        IxsFunNew: model.ixs_fun_akt,
                                        IxsRefNew: model.ixs_ref,
                                        CisReal: model.cis_real
                                    }
                                }).getData();
                            },
                            // název akce, která provede požadovanou operaci (tlačítko vpravo dole)
                            nextActionName: nastaveni.actioName, //RC 30250650 : Předat
                            // metoda volaná při přechodu na další krok (provedení vlastní operace) (pracuje nad daty ze vstupu, vrací aktuální data z databáze + výsledek operace)
                            nextAction: (model, data) => {
                                modelData = model;
                                return that.isl.RozDoklad.hromadneOperace({
                                    rq: {
                                        Akce: nastaveni.action,
                                        Seznam: data,
                                        Duvod: modelData.duvod,
                                        IxsFunNew: modelData.ixs_fun_akt,
                                        ixpDen: WebClient.getIxpDen(that),
                                        IxpDenNew: modelData.ixp_den,
                                        IxsSu: modelData.ixs_su,
                                        CisReal: modelData.cis_real,
                                        IxsRefNew: modelData.ixs_ref,
                                        IxsFunVyriz: modelData.ixs_fun_vyriz
                                    }
                                })
                                    .getData()
                                    .done(function (returnData) {
                                    //content.showFlash({ label: "jres:30250647" }) //RC 30250647 : Akce provedena
                                    return returnData;
                                });
                            },
                            // akce na tabu s gridem
                            menuGridBar: [
                                {
                                    // detail
                                    favorite: true,
                                    action: detailAkce
                                },
                                {
                                    // detail
                                    favorite: true,
                                    action: actTiskHromadnaAkce
                                },
                            ],
                            // akce volaná na dvojklik v gridu
                            defaultAction: detailAkce
                        },
                        // druhý (poslední) krok - zobrazení výsledku operace
                        lastStep: {
                            // název kroku
                            title: "jres:30250292", //RC 30250292 : Výsledek
                            // formulář s parametry
                            form: formParams,
                            // model pro parametry
                            modelData: () => { return modelData; },
                            // nadpis tabu s parametry
                            //formTabTitle: "Parametry storna",
                            // parametry jsou v tomto kroku již needitovatelné
                            enableFormFields: false,
                            // nadpis tabu s gridem
                            gridTabTitle: "jres:30250293", //RC 30250293 : Zpracované doklady
                            // akce na tabu s gridem
                            menuGridBar: [
                                {
                                    // detail
                                    favorite: true,
                                    action: detailAkce
                                },
                            ],
                            // akce volaná na dvojklik v gridu
                            defaultAction: detailAkce
                        },
                        // obsluha úspěšného ukončení průvodce (na rozdíl od zrušení průvodce přeselektovává seznam)
                        completeDelegate: (view) => {
                            WebClient.refreshRowsFromDB(content, view.getDataRows(false));
                            WebClient.refreshRowsFromDB(content, view.getDataRows(false));
                        },
                        // obsluha zrušení průvodce
                        cancelDelegate: () => {
                            //FucGrid.wizardEnd(that, ikc, false);
                        },
                    }, {
                        title: nastaveni.titleBreadCrumb, //RC 30250684 : Předání
                    });
                }
                /**
                 * Oznaceni dokladu
                 * @param content
                 * @param selectedRows
                 */
                SetDataSelected(selectedRows) {
                    selectedRows.forEach((row) => { row["wiz_check"] = true; });
                    return $.Deferred().resolve(selectedRows).promise();
                }
                /**
                * Metoda pro vytvoreni sloupcu seznamu  hromadnych operaci
                *
                * @returns {Gordic.Data.GridFormat<TDto>} pole sloupců pro ggrid
                * */
                createGridFormatHromadneOperace() {
                    // Vsechny metody jsou v Gordic.Eko.WebClient/Eko/Seznam/grid.methods.ts
                    // Prazdne pole sloupcu pro grid
                    let columns = new Gordic.Data.GridFormat()
                        // Data z hlavicky dokladu 
                        .addPid() //, { fragment: Gordic.Uct.Interface.ixp });
                        .addAgendoveCislo()
                        .addEvidencniCislo()
                        .addDruhDokladu()
                        .addRok()
                        .addMesic()
                        .addDen()
                        .addCisloDokladu() //, { fragment: Gordic.Uct.Interface.ac_ixe });
                        .addTypDokladu() //, { fragment: Gordic.Uct.Interface.ixs_typ_txt });
                        .addStavDokladu() //, { fragment: Gordic.Uct.Interface.s_zau_txt });
                        .addCastka({ name: "c", field: "c", description: "jres:30250258" }) //, { fragment: Gordic.Uct.Interface.c }); //RC 30250258 : částka na dokladu
                        .addZpracovatel({ fragment: "*" /* Gordic.Uct.Interface.GRozSeznamDokladuDtoFragments.ixs_fun_akt_txt */ }) //, { fragment: Gordic.Uct.Interface.ixs_fun_akt_txt });
                        .addPopis();
                    return columns;
                }
                /**
                    * Zobrazení detailu dokladu v nove zalozce prohlizece
                    *
                    * @returns {JQuery.Promise<any>} promise s operací
                    */
                openDetailInNewTab() {
                    const myGrid = WebClient.getGrid(this);
                    if (myGrid !== null) {
                        // aktuální vybraná položka
                        const aktRadek = Gordic.Eko.Grid.currentRow(myGrid);
                        if (aktRadek && !(aktRadek instanceof jQuery)) {
                            // otevření detailu aktuální vybrané položky v nové záložce
                            return WebClient.openDetailInOtherTab(aktRadek.typ_ag, aktRadek.ixp);
                        }
                    }
                    return $.Deferred().reject().promise();
                }
            };
            /**
             * Sloupce, ktere se pridaji do seznamu z dokumentu (SSL)
             * @returns Pole sloupce ktere lze zobrazit na seznamu
             * */
            GSeznamDokladuTab.getPresetDokumentColumns = () => {
                return ["pozice_spis_ico", "ixp_spis", "priz_spis", "ixs_su_akt", "nazev", "akt_znacka", "stav_dist", "stav_pis", "s_prij", "s_ssl", "dat_zmena", "zmenu_prov",
                    "s_ele", "s_fyz", "spis_pl", "spis_znak", "ixs_fun_wfl", "ixs_su_wfl", "dat_vyriz", "s_schval", "skar_znak", "skar_lhuta", "rok_spo_uda", "rok_skartace",
                    "poc_listu", "poc_stran", "poc_kop", "poc_priloh", "poc_l_priloh", "cj", "PrizVBaliku", "ixs_zup", "PrizPozSkar", "technicke_vlastnosti_ico"];
            };
            /**
             * Filtry SSL, dle kterych lze seznam z dokumentu (SSL)
             * */
            GSeznamDokladuTab.getPresetDokumentFields = () => {
                return ["ixp_spis", "priz_spis", "ixs_su_akt", "nazev", "akt_znacka", "stav_dist", "stav_pis", "s_prij", "s_ssl", "dat_zmena", "zmenu_prov", "s_ele", "s_fyz",
                    "uzo", "spis_pl", "spis_znak", "ixs_fun_wfl", "ixs_su_wfl", "dat_vyriz", "s_schval", "skar_znak", "skar_lhuta", "rok_spo_uda", "rok_skartace", "poc_listu",
                    "poc_stran", "poc_kop", "poc_priloh", "poc_l_priloh", "cj", "ixs_zup"];
            };
            GSeznamDokladuTab = GSeznamDokladuTab_1 = __decorate([
                gcontent
            ], GSeznamDokladuTab);
            WebClient.GSeznamDokladuTab = GSeznamDokladuTab;
            ;
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            //#region Obsluha filter panelu
            /**
             * Trida pro vytvoreni pararametru pomoci kterych se vytvori filterPanel
             * */
            class GRozFilterPanelParams {
                constructor() {
                    /**
                     * Vytvoření parametrů filterpanelu pro ROZ
                     * @returns { IGFilterPanelOptions<TData> } výsledné parametry filterpanelu
                     * */
                    this.getFilterPanelParams = (seznam, dokumentParams, filter) => {
                        // Oblibene polozky ve filtru
                        const favorites = ["ixp", "ixs_typ", "vlastni_doklady"];
                        // Nazev tema pro tiskovou sestavu
                        const tiskoveTema = "roz_ptm_dokzau1";
                        // sloupec z DTO pro filtr "*vlastní" nebo null, pokud nemá být. pokud je zadáno pole o jednom prvku, bere se, že políčko je typu multi
                        const filtrVlastni = "ixs_fun_cil"; // TODO: Je tohle dobre ? Proc tam neni ixs_fun_akt ??
                        // Vytvoření standardních parametrů filterpanelu pro EKO moduly
                        // @returns { IGFilterPanelOptions<TData> } výsledné parametry filterpanelu
                        return Gordic.Eko.Filters.getFilterParams(new GRozFilterForm(seznam).createFilterForm(dokumentParams), // Vytvoreni pole jednotlivych formu tvoricich filterPanel
                        favorites, tiskoveTema, filtrVlastni, undefined, // [apply] metoda pro načtení seznamu
                        this.getHardFilter(filter), // hardFilter
                        true, // [navigatorInDetail] zobrazit navigátor v detailu filtru?
                        seznam // [gcontent] content
                        );
                    };
                    /**
                     * Vytvoreni objektu pevneho filtru dle filtru zaslaneho z jineho fomulare
                     * */
                    this.getHardFilter = (filter) => {
                        switch (filter) {
                            case 5 /* Uct.Interface.GEUctFiltrSeznamPevne.Neevidovane */:
                                return { stav_evi: { v: 20 } };
                            case 1 /* Uct.Interface.GEUctFiltrSeznamPevne.KeSchvaleni */:
                                return { s_zau: { v: 300 } };
                            case 0 /* Uct.Interface.GEUctFiltrSeznamPevne.KZauctovani */:
                                return { s_zau: { v: 400 } };
                            case 2 /* Uct.Interface.GEUctFiltrSeznamPevne.Stornovane */:
                                return { s_zau: { v: 90 } };
                            case 3 /* Uct.Interface.GEUctFiltrSeznamPevne.Uzavrene */:
                                return { s_zau: { v: 50 } };
                        }
                    };
                }
            }
            /**
             * Trida pro vytvoreni filtrovaciho panelu nad gridem
             * */
            class GRozFilterForm {
                /**
                 * Konstruktor
                 * @param seznam Odkaz na tridu, ke ktere budu filtr vazat
                 */
                constructor(seznam) {
                    /**
                     * Vytvoreni kolekce formularu Forms pro vytvoreni filterFormu
                     * @param dokumentParams Informace o SSL ziskane pomoci funkce v Seznamu
                     * @returns Vraci pole jednotlivych formularu ktere tvori filtrForm
                     * */
                    this.createFilterForm = (dokumentParams) => {
                        return [
                            this.createZalozkaObecna(),
                            this.createZalozkaStavy(),
                            this.createZalozkaZapisy(),
                            this.createZalozkaVlastnosti(),
                            this.createZalozkaDokument(dokumentParams),
                        ];
                    };
                    /**
                     * Vytvoreni obecne casti z formulare Detail filtru
                     * */
                    this.createZalozkaObecna = () => {
                        return new Gordic.Forms.Form({
                            opened: true,
                            layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",
                            tabLabel: "jres:30250004", //RC 30250004 : Obecná
                        })
                            .addSection()
                            .addRow("jres:30650012") //RC 30650012 : Identifikátor
                            .addField("gstringbox", { name: "ixp" })
                            .addRow("jres:30150050") //RC 30150050 : Typ dokladu
                            .addField("gselectbox", // fieldType
                        Gordic.Prefabs.Select.sslstyp(), // fieldOptions
                        {
                            name: "ixs_typ",
                            model: "ixs_typ",
                            serverFilters: {
                                aktivita: 100,
                                PouzeROZ: 1,
                                ktg_typ: this.seznam.globals.DatabaseParams.PouzitiMaterialovychKompetentu ? [1100, 1185] : null
                            },
                            multi: false
                        })
                            .addRow("jres:30150055") //RC 30150055 : Druh dokladu
                            .addField("gselectbox", // fieldType
                        Gordic.Prefabs.Select.ekocdrd(), // fieldOptions
                        {
                            dropdown: false,
                            name: "drd",
                            model: "drd",
                            helperLimit: 100,
                            serverFilters: {
                                drd: [2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 30, 31, 34, 54, 62, 63, 66, 69],
                            },
                        })
                            .addRow("jres:30250005") //RC 30250005 : Číslo účtárny
                            .addField("gselectbox", // fieldType
                        Gordic.Prefabs.Select.ekosuus(), // fieldOptions
                        {
                            name: "uus",
                            dropdown: false,
                            model: "model.ico1=value.ico;model.ucs1=value.ucs;model.uus=value.uus",
                            itemTemplate: "{uus:trim:encode}",
                            serverFilters: {
                                rok_od: "<= " + this.seznam.globals.EkoParams?.Rok, //   content.serverContext.rok,
                                rok_do: ">= " + this.seznam.globals.EkoParams?.Rok, // content.serverContext.rok,
                                aktivita: 100,
                                ico: this.seznam.globals.EkoParams?.Ico, // content.serverContext.ico,
                                ucs: this.seznam.globals.EkoParams?.Ucs // content.serverContext.ucs,
                            },
                        })
                            // Druhy sloupec
                            .addSection()
                            .addField("gcheck", // fieldType
                        {
                            name: "vlastni_doklady",
                            label: "jres:30250006", //RC 30250006 : Vlastní doklady
                            initialValue: false,
                            emptyValue: false
                        })
                            .addRow("jres:30150025") //RC 30150025 : Vlastník
                            .addField("gselectbox", // fieldType
                        "w-8", // fieldWidth
                        Gordic.Prefabs.Select.ginsfun(), // fieldOptions
                        {
                            name: "ixs_fun_cil",
                            model: "ixs_fun_cil=ixs_fun;ixs_fun_txt=nazev;ixs_fun_ref_txt=nazev_ref;ixs_fun_su_txt=nazev_su",
                            serverFilters: {
                                aktivita: 100,
                                DlePovolenychAgend: true,
                                VrfuAktivita: 100,
                                VrfuIxpDen: this.seznam.globals.EkoParams.IxpDen,
                                VrfuSubrada: this.seznam.globals.EkoParams.Subrada,
                            },
                        })
                            .addField("gcheck", // fieldType
                        "w-4", // fieldWidth
                        {
                            name: "fun_hist",
                            label: "jres:30250040", //RC 30250040 : Historie
                            initialValue: false,
                            emptyValue: false,
                        })
                            .addRow("jres:30150054") //RC 30150054 : Realizátor
                            .addField("gselectbox", // fieldType
                        Gordic.Prefabs.Select.ekosrea(), // fieldOptions
                        {
                            name: "cis_real",
                            dropdown: false,
                            model: "ico3=ico; cis_real=cis_real;cis_real_txt=nazev",
                            serverFilters: {
                                aktivita: 100,
                                ico: this.seznam.globals.EkoParams?.Ico,
                            },
                        })
                            .addRow("jres:30150053") //RC 30150053 : Kompetent
                            .addField("gselectbox", Gordic.Prefabs.Select.ekoskom(), {
                            name: "ixs_fun_vyriz",
                            model: "model.ico4=value.ico;model.ixs_fun_vyriz=value.ixs_fun",
                            serverFilters: {
                                aktivita: 100,
                                priz_kom: 10,
                                ico: this.seznam.globals.EkoParams?.Ico,
                            },
                        })
                            // Skupina intrvalu s cislama
                            .addSection()
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "string",
                            label: "jres:30150011", //RC 30150011 : Agendové číslo
                            name: "ac_ag",
                            pathInModel: "model.ac_ag",
                            emptyValue: null,
                        }))
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "string",
                            label: "jres:30150010", //RC 30150010 : Evidenční číslo
                            name: "ac",
                            pathInModel: "model.ac",
                            emptyValue: null,
                        }))
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "string",
                            label: "jres:30250007", //RC 30250007 : Číslo rozpočtového dokladu
                            name: "ac_ixe",
                            pathInModel: "model.ac_ixe",
                            emptyValue: null,
                        }))
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:30150036", //RC 30150036 : Částka dokladu
                            name: "c",
                            pathInModel: "model.c",
                            emptyValue: null,
                            customOptAll: { decimals: 2, returnType: "decimal", thousandsSeparator: ' ', fixed: false, },
                        }))
                            // Intervaly datumove
                            .addSection()
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:30150030", //RC 30150030 : Rok
                            name: "rok",
                            pathInModel: "model.rok",
                            emptyValue: null,
                        }))
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:30150031", //RC 30150031 : Měsíc
                            name: "mesic",
                            pathInModel: "model.mesic",
                            emptyValue: null,
                        }))
                            .addPrefab(Gordic.Gin.Prefabs.interval({
                            type: "number",
                            label: "jres:30150032", //RC 30150032 : Den
                            name: "den",
                            pathInModel: "model.den",
                            emptyValue: null,
                        }))
                            .addRow("jres:30250008") //RC 30250008 : Posledních
                            .addField("gnumberbox", Gordic.Prefabs.Number.decimal(0), {
                            name: "num_row",
                            returnType: "number",
                            step: 10,
                            minValue: 0,
                            emptyValue: null,
                        })
                            // Sekce s popisem
                            .addSection({ customClass: "w-L-12 w-M-12 w-S-12" })
                            .addRow("jres:30250009") //RC 30250009 : Popis dokladu
                            .addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                            name: "popis_doklad"
                        })
                            .addRow("jres:30250010") //RC 30250010 : Poznámka dokladu
                            .addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                            name: "poznamka_ixp"
                        })
                            .addRow("jres:30150044") //RC 30150044 : Klíčová slova
                            .addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), {
                            name: "ks_db",
                            placeholder: "jres:30250011", //RC 30250011 : Zadejte klíčová slova
                            model: "model.ks_db=value.kl_slovo",
                            multi: true,
                            dropdown: true,
                            showSelectButton: true,
                            verticalButtons: false,
                        });
                    };
                    /**
                    * Vytvoreni casti se stavy z formulare Detail filtru
                    * */
                    this.createZalozkaStavy = () => {
                        return new Gordic.Forms.Form({
                            opened: false,
                            layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",
                            tabLabel: "jres:30250012", //RC 30250012 : Stavy
                        })
                            .addSection("jres:30250014") //RC 30250014 : Stavy dokladů
                            .addRow("jres:30150161") //RC 30150161 : Stav realizace
                            .addField("gselectbox", {
                            name: "s_zau",
                            multi: false,
                            list: false,
                            itemWidth: "",
                            dropdown: true,
                            itemTemplate: "{s_zau_txt}",
                            model: "s_zau",
                            helperColumns: ["s_zau_txt"],
                            data: new Gordic.Data.View([
                                { s_zau_txt: "jres:30250015", s_zau: -1 }, //RC 30250015 : neurčeno
                                { s_zau_txt: "jres:30250016", s_zau: 5 }, //RC 30250016 : návrh
                                { s_zau_txt: "jres:30250017", s_zau: 700 }, //RC 30250017 : nepřipraveno k uzávěrce
                                { s_zau_txt: "jres:30250018", s_zau: 800 }, //RC 30250018 : neuzavřeno
                                { s_zau_txt: "jres:30250019", s_zau: 0 }, //RC 30250019 : nerealizováno
                                { s_zau_txt: "jres:30250020", s_zau: 30 }, //RC 30250020 : schváleno
                                { s_zau_txt: "jres:30250201", s_zau: 300 }, //RC 30250201 : ke schválení
                                { s_zau_txt: "jres:30250021", s_zau: 90 }, //RC 30250021 : storno
                                { s_zau_txt: "jres:30250022", s_zau: 50 }, //RC 30250022 : uzavřeno
                                { s_zau_txt: "jres:30250023", s_zau: 40 }, //RC 30250023 : realizováno;
                                { s_zau_txt: "jres:30250200", s_zau: 400 }, //RC 30250200 : k realizaci
                                { s_zau_txt: "jres:30250024", s_zau: 10 }, //RC 30250024 : realizovánoo částečně
                            ], { key: "s_zau" }),
                        })
                            .addRow("jres:30250025") //RC 30250025 : Stav evidence
                            .addField("gselectbox", {
                            name: "stav_evi",
                            multi: false,
                            list: false,
                            itemWidth: "",
                            dropdown: true,
                            helperColumns: ["stav_evi_txt"],
                            itemTemplate: "{stav_evi_txt}",
                            model: "stav_evi",
                            data: new Gordic.Data.View([
                                { stav_evi_txt: "jres:30250026", stav_evi: 10 }, //RC 30250026 : evidované
                                { stav_evi_txt: "jres:30250027", stav_evi: 20 }, //RC 30250027 : neevidované
                                { stav_evi_txt: "jres:30250028", stav_evi: 30 }, //RC 30250028 : aktuálně evidované
                                { stav_evi_txt: "jres:30250029", stav_evi: 40 }, //RC 30250029 : přeevidované z
                                { stav_evi_txt: "jres:30250030", stav_evi: 50 }, //RC 30250030 : přeevidované do
                                { stav_evi_txt: "jres:30250031", stav_evi: 60 }, //RC 30250031 : původní
                            ], { key: "stav_evi" }),
                        })
                            .addSection("jres:30150162") //RC 30150162 : Zobrazení
                            .addRow("jres:30250032") //RC 30250032 : Příznak zobrazení
                            .addField("gselectbox", {
                            name: "priz_view",
                            multi: false,
                            list: false,
                            itemWidth: "",
                            dropdown: true,
                            helperColumns: ["priz_view_txt"],
                            itemTemplate: "{priz_view_txt}",
                            model: "priz_view",
                            emptyValue: null,
                            data: new Gordic.Data.View([
                                { priz_view_txt: "jres:30250033", priz_view: 0 }, //RC 30250033 : přečteno
                                { priz_view_txt: "jres:30250034", priz_view: 10 }, //RC 30250034 : nepřečteno
                            ], { key: "priz_view" }),
                        });
                    };
                    /**
                    * Vytvoreni casti s rozpoctovymi zapisy z formulare Detail filtru
                    * */
                    this.createZalozkaZapisy = () => {
                        const gf = new Gordic.Data.GridFormat()
                            .addTextColumn({
                            name: "nks", //Je povinny pro spravne mapovani nazvu property a caption!
                            caption: "Nks", //Je povinny pro spravne mapovani nazvu property a caption!
                            width: 60,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("nks", d); }, //Nutne pridat cellTemplate pro spravne zobrazeni hodnoty (lze pouzit default)
                            editor: Gordic.Eko.Filters.nksInterval(//Nutne pridat editor (prefaby jsou v NS Gordic.Eko.Filters)
                            {
                                ico: this.seznam.globals.EkoParams?.Ico ?? "",
                                onlyActive: true,
                                aktProhl: 100,
                                caption: "Nks",
                                model: "nks"
                            })
                        })
                            .add(Gordic.Eko.CfuUtils.getCfuSetEditors(this.seznam, { checkUete: this.seznam.globals.EkoParams?.PrizCheckUete, wildcard: this.seznam.globals.Others?.Wildcard }))
                            .addCurrencyColumn({
                            name: "c0",
                            caption: "jres:30250035", //RC 30250035 : Příjmy
                            width: 120,
                            // 8.9. TK: uprave dle Bohouse
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c0", d); },
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c0", d, { wildcard: content.Globals.Others?.Wildcard }); },
                            //cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.c0); },
                            editor: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "MD" })
                        })
                            .addCurrencyColumn({
                            name: "c1",
                            caption: "jres:30250036", //RC 30250036 : Výdaje
                            width: 120,
                            // 8.9. TK: uprave dle Bohouse
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c1", d); },
                            //cellTemplate: function (dto) { return Gordic.Eko.Filters.Utils.formatIntervalValue(dto.c1); },
                            editor: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "Dal" })
                        });
                        return new Gordic.Forms.Form({
                            opened: false,
                            layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1",
                            tabLabel: "jres:30250037", //RC 30250037 : Rozpočtové zápisy
                        })
                            .addSection({ label: "jres:30250038", customClass: "w-L-12 w-M-12 w-S-12" }) //RC 30250038 : Finanční profil
                            .addRow("jres:30250037") //RC 30250037 : Rozpočtové zápisy
                            .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({ gridFormat: gf }), { name: "zapisy" })
                            .addSection({ customClass: "w-L-12 w-M-12 w-S-12" })
                            .addRow("jres:30250039") //RC 30250039 : Popis položky
                            .addField("gstringbox", Gordic.Prefabs.String.withOperators(), {
                            name: "popis_pep"
                        });
                    };
                    /**
                    * Vytvoreni casti s vlastnostmi z formulare Detail filtru
                    * */
                    this.createZalozkaVlastnosti = () => {
                        // Tohle zkontrolovat a predelat
                        let sxsTyp = [{ sxs: null, typ_obj: 436 /* Uct.Interface.GETypObjektu.KnihaROZ */ }];
                        this.seznam.ixsTypy.forEach(item => sxsTyp.push({ sxs: item, typ_obj: 680 /* Uct.Interface.GETypObjektu.TypDokumentu */ }));
                        return new Gordic.Forms.Form({
                            tabLabel: "jres:30250503", //RC 30250503 : Vlastnosti
                        })
                            .addSection()
                            .addRow("jres:30250502") //RC 30250502 : Rozšiřující vlastnosti
                            .addPrefab(Gordic.Gin.Prefabs.Field.GGinVlastnostiExtPropsFilterField({
                            name: "vlastnosti_r",
                            esuLogovani: {
                                Ixp: "",
                                AktZnacka: "",
                                DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani
                            },
                        }, {
                            rpp_ixs_typ: this.seznam.ixsTypy,
                            typ_obj: [436 /* Uct.Interface.GETypObjektu.KnihaROZ */],
                            t_sxs: sxsTyp
                        }));
                    };
                    /**
                    * Vytvoreni casti s dokumentem z formulare Detail filtru
                    * @param dokumentParams Informace o SSL ziskane pomoci funkce v Seznamu
                    * */
                    this.createZalozkaDokument = (dokumentParams) => {
                        return Gordic.Ssl.WebClient.GDokumentIsl.AddDokumentFilterFieldsImmediate({
                            content: this.seznam,
                            params: dokumentParams,
                            form: new Gordic.Forms.Form({ tabLabel: "Dokument" }).addSection(),
                            fields: GSeznamDokladuTab.getPresetDokumentFields(),
                            scope: {
                                scopeLevels: [
                                    // Všechny napojené filtry budou mít v názvu prefix "dokument" (zde tedy filtrační enum bude obsahovat hodnoty dokument_ixp, dokument_ixs_fun_akt a dokument_nazev). Tím je možné odlišit filtry, které spravuji sám jako autor entity a ty, které si řeší dokument sám.
                                    { scope: "dokument" }
                                ]
                            },
                            fieldsOptions: {},
                        });
                    };
                    this.seznam = seznam;
                }
            }
            //#endregion
            //////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            //#region Obsluha gridu
            ///**
            // * Trida obsluhujici sloupce v gridu
            // * */
            //class GRozGridColumns {
            //    /**
            //     * Metoda pro vytvoreni sloupce gridu
            //     * @param documentParams SSL
            //     */
            //    public getGridFormatColumns = (
            //        seznam: GSeznamDokladuTab,
            //        documentParams: Gordic.Ssl.Interface.GDokumentGetColumnParamsResponseDto
            //    ): Gordic.Data.GridFormat<Uct.Interface.GRozSeznamDokladuDto> => {
            //        const columns: Gordic.Data.GridFormat<Uct.Interface.GRozSeznamDokladuDto> = new Gordic.Data.GridFormat<Uct.Interface.GRozSeznamDokladuDto>()
            //            .addTypEntity({ fragment: Uct.Interface.GRozSeznamDokladuDtoFragments.typ_entity_ico })
            //            .addVlastnictvi({ fragment: Uct.Interface.GRozSeznamDokladuDtoFragments.vlastnictvi })
            //            .addPrecteno()
            //            .addPreevidence({ fragment: Uct.Interface.GRozSeznamDokladuDtoFragments.preevidence })
            //            .addPocetElPriloh({ name: "poc_epri", field: "poc_epri", fragment: Eko.Interface.GWflForEkoDtoNames.el_prilohy_pocet })
            //            .addElObraz()
            //            // Pridani sloupcu WFL
            //            .addWflColumns()
            //            // barevne oznaceni radku
            //            .addBarevneOznaceni({ fragment: Uct.Interface.GRozSeznamDokladuDtoFragments.uzo }, void 0, void 0,
            //                (row) => row.ixs_fun_akt != ($.content("main") as any).IxsFunAkt, seznam.globalSettings
            //            )
            //            // Data z hlavicky dokladu
            //            // TODO - nutno vsude doplnit fragmenty z duvodu profilu
            //            .addPid() //, { fragment: Gordic.Uct.Interface.ixp });
            //            .addAgendoveCislo()
            //            .addEvidencniCislo()
            //            .addDruhDokladu()
            //            .addRok()
            //            .addMesic()
            //            .addDen()
            //            .addCisloDokladu() //, { fragment: Gordic.Uct.Interface.ac_ixe });
            //            .addTypDokladu() //, { fragment: Gordic.Uct.Interface.ixs_typ_txt });
            //            .addStavDokladu() //, { fragment: Gordic.Uct.Interface.s_zau_txt });
            //            .addCastka({ name: "c", field: "c", description: "jres:30250258" }) //, { fragment: Gordic.Uct.Interface.c }); //RC 30250258 : částka na dokladu
            //            .addZpracovatel({ fragment: Gordic.Uct.Interface.GRozSeznamDokladuDtoFragments.ixs_fun_akt_txt }) //, { fragment: Gordic.Uct.Interface.ixs_fun_akt_txt });
            //            .addPopis()
            //            // pomocne neviditelne pole pro podminene formatovani
            //            .addNumberColumn({ name: "s_zau", hidden: true })
            //            .addNumberColumn({ name: "preevidovano", hidden: true })
            //            .addNumberColumn({ name: "priz_view", hidden: true });
            //        let scopeDokument = seznam.extendScope(
            //            undefined,
            //            Uct.Interface.GRozSeznamDokladuDtoFragments.dokument,
            //            "Dokument", //"jres:30250500", //RC 30250500 : Dokument
            //            ""
            //        );
            //        // sloupce dokumentu
            //        if (documentParams != null)
            //            Gordic.Ssl.WebClient.GDokumentIsl.AddGridColumnsImmediate(
            //                documentParams,
            //                columns,
            //                GSeznamDokladuTab.getPresetDokumentColumns(),
            //                {
            //                    scopeLevels: scopeDokument
            //                }
            //            );
            //        let scopeVlastnosti = this.extendScope(
            //            undefined,
            //            Uct.Interface.GRozSeznamDokladuDtoFragments.vlastnosti,
            //            "jres:30250501", //RC 30250501 : Vlastnosti
            //            //"Vlastnosti soupisky"
            //        );
            //        let scoV = (scopeVlastnosti.map(i => i.scope) as string[]).join(Gin.WebClient.GSharedIsl.NameSeparator);
            //        let scoVT = (scopeVlastnosti.map(i => i?.scopeTitle).filter(i => i?.trim()) as string[]).join(" - ");
            //        let sxsTyp: { sxs: string | null, typ_obj: number }[] = [{ sxs: null, typ_obj: Uct.Interface.GETypObjektu.KnihaROZ }];
            //        this.ixsTypy.forEach(item => sxsTyp.push({ sxs: item, typ_obj: Uct.Interface.GETypObjektu.TypDokumentu }));
            //        // Rozsirene vlastnosti
            //        columns.add(Gordic.PopisneVlastnosti.createSxsTypGridFormat(
            //            {
            //                scope: scoV,
            //                ixs_typ: this.ixsTypy,
            //                typ_obj: [Uct.Interface.GETypObjektu.KnihaROZ],
            //                sxs_typ: sxsTyp,
            //                scopeTitle: scoVT
            //            }
            //        ));
            //        // vlastnosti
            //        columns.add(Gordic.PopisneVlastnosti.createGridFormat("vlastnosti"));
            //        return columns;
            //    }
            //}
            //#endregion
            //////////////////////////////////////////
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbURva2xhZHVUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtRG9rbGFkdVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBcW1FZjtBQXJtRUQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcW1FbkI7SUFybUVnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxbUU3QjtRQXJtRW9CLFdBQUEsU0FBUzs7WUFDMUIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQVdwQyxDQUFDO1lBb0JGOztpQkFFSztZQUVMLElBQWEsaUJBQWlCLHlCQUE5QixNQUFhLGlCQUFrQixTQUFRLE9BQUEsWUFBMEY7Z0JBQWpJOztvQkFrQ0ksV0FBTSxHQUFXLGtCQUFrQixDQUFDO2dCQXE0Q3hDLENBQUM7Z0JBbjRDRywwQ0FBMEM7Z0JBQzFDLCtCQUErQjtnQkFFL0I7O3FCQUVLO2dCQUNFLGNBQWM7b0JBQ2pCLG1DQUFtQztvQkFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVsQix3QkFBd0I7b0JBQ3hCLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFdEMsaUJBQWlCO29CQUNqQix3RUFBd0U7b0JBQ3hFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFckIsb0NBQW9DO29CQUNwQyx3QkFBd0I7b0JBQ3hCLHdCQUF3QjtvQkFFeEIsa0NBQWtDO29CQUNsQyxDQUFDLENBQUMsSUFBSSxDQUNGLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ2xDLG1CQUFpQixDQUFDLHdCQUF3QixFQUFFLEVBQzVDLG1CQUFpQixDQUFDLHVCQUF1QixFQUFFLENBQzlDLEVBQ0QsT0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUMz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eUJBQXlCO1lBRXpCLE9BQU87WUFDUCxHQUFHO1lBRUgsWUFBWTtZQUNaLDBDQUEwQztRQUM5QyxDQUFDLEVBcm1Fb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcW1FN0I7SUFBRCxDQUFDLEVBcm1FZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcW1FbkI7QUFBRCxDQUFDLEVBcm1FUyxNQUFNLEtBQU4sTUFBTSxRQXFtRWYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlJvei5XZWJDbGllbnQge1xyXG4gICAgY29uc3QgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIC8vIFNlem5hbSBha2NpIG5hIHNlem5hbXUgZG9rbGFkdVxyXG4gICAgY29uc3QgZW51bSBBY3Rpb25zIHtcclxuICAgICAgICBQb2RhbmkgPSBcImFjdFBvZGFuaVwiLFxyXG4gICAgICAgIERldGFpbCA9IFwiYWN0RGV0YWlsXCIsXHJcblxyXG4gICAgICAgIFByZWV2aWRlbmNlID0gXCJhY3RQcmVldmlkZW5jZVwiLFxyXG4gICAgICAgIFByZWRhbmkgPSBcImFjdFByZWRhbmlcIixcclxuICAgICAgICBQcmV2emV0aSA9IFwiYWN0UHJldnpldGlcIixcclxuICAgICAgICBQcmlkZWxlbmkgPSBcImFjdFByaWRlbGVuaVwiLFxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR0hyb21hZG5lT3BlcmFjZSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrY2UgXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlXHJcbiAgICAgICAgdGVtYTogc3RyaW5nO1xyXG4gICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogc3RyaW5nO1xyXG4gICAgICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICBhY3Rpb05hbWU6IHN0cmluZztcclxuICAgICAgICB0aXRsZUJyZWFkQ3J1bWI6IHN0cmluZztcclxuICAgICAgICBJRFNlc3Rhdnk6IG51bWJlcjtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V6bmFtIHJvenBvY3RvdnljaCBkb2tsYWR1XHJcbiAgICAgKiAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbURva2xhZHVUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2U8R29yZGljLkNvbnRleHRzLkdFa29Cb29rQ29udGVudENvbnRleHQgJiBHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbj4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZGtheiBuYSBzZXpuYW0gKGdyaWQpXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlICRncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZGtheiBuYSBmaWx0ciBuYWQgZ3JpZGVtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyRm9ybTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGV2bnkgZmlsdHIgemFzbGFueSB6IGRhc2hib2FyZHUsIHBvcHIuIGhvZG5vdGEgTmV6YWRhblxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZTtcclxuXHJcblxyXG4gICAgICAgIC8vIERhdG92eSBvYmpla3QgcyBvYmVjbnltaSBkYXR5IGFwbGlrYWNlXHJcbiAgICAgICAgcHVibGljIGdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pHbG9iYWxzRHRvOyAvLyBOdXRubyBkYXQgamFrbyBwcml2YXRlLCB2c2VjaG5vIHNlIHByZW1pc3RpIGRvdm5pdHIgY29udGVudHVcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwZXJtaXNpb25zOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96RG9rbGFkUGVybWlzc2lvbnNMaXN0Oy8vIHBvdm9sZW5pIGFrY2lcclxuXHJcbiAgICAgICAgLy8gTW96bmUgdHlweSBkb2t1bWVudHVcclxuICAgICAgICBwdWJsaWMgaXhzVHlweTogc3RyaW5nW107XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvdmxhZGHEjSBwcm8gbsOhaGxlZHlcclxuICAgICAgICAgKiBAdHlwZSB7YW55fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI7XHJcblxyXG5cclxuICAgICAgICB0YXNrSWQ6IHN0cmluZyA9IFwiYWN0U2V6bmFtRG9rbGFkdVwiO1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gTWV0b2RhIG9uQ29udGVudFJlYWR5XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBydm90bmkgem9icmF6ZW5pIHNlem5hbXUgXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vIFVsb3ppbSBzaSB0aGlzIG5hIGFrdHVhbG5pIHRyaWR1XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gZmxhc2ggc2Ugc3RhdmVtIGtuaWh5XHJcbiAgICAgICAgICAgIEVrby5VdGlscy5TaG93RWtvQm9va1N0YXRlRmxhc2godGhhdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b3JlbmkgYWtjaVxyXG4gICAgICAgICAgICAvLyBLb2xla2NlIGFjdGlvbnMgamUgcHJpbW8gbmFkIGNvbnRlbnRlbSwgemFwaXN1amkgdGVkeSBkbyB0aGlzLmFjdGlvbnNcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgLy8gWmFjaW5hbWUgbmFjaW5hdCBkYXRhXHJcbiAgICAgICAgICAgIC8vdGhpcy5iZWdpbk9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gTmFjdGVuaSB1ZGFqdSB6ZSBTU0wgKGRva3VtZW50KVxyXG4gICAgICAgICAgICAkLndoZW4oXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuU3NsLldlYkNsaWVudC5HRG9rdW1lbnRJc2wuSW5pdChcclxuICAgICAgICAgICAgICAgICAgICBHU2V6bmFtRG9rbGFkdVRhYi5nZXRQcmVzZXREb2t1bWVudENvbHVtbnMoKSxcclxuICAgICAgICAgICAgICAgICAgICBHU2V6bmFtRG9rbGFkdVRhYi5nZXRQcmVzZXREb2t1bWVudEZpZWxkcygpXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgSXNsLkRva3VtZW50LmdldENvbHVtblBhcmFtcygpLmdldERhdGEoKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAudGhlbigoXywgY29sdW1uUGFyYW1zKSA9PiBjb2x1bW5QYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZG9rdW1lbnRQYXJhbXMpID0+IHsgLy8gZGF0YSBTU0wgbWFtIG5hY3RlbmEsIHBvdXppamkgamUgZGFsZSBwcm8gdHZvcmJ1IFVJXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByaWRhbmkgZmlsdHJvdmFjaWhvIHBhbmVsdSBkbyBzdHJhbmt5ICh2eXR2b3JlbmkgalF1ZXJ5IGVsZW1lbnR1KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGZpbHRlckZvcm0gPSAkKFwiPGRpdiBjbGFzcz0nanMtZmlsdHInPlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLmdmaWx0ZXJwYW5lbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdSb3pGaWx0ZXJQYW5lbFBhcmFtcygpLmdldEZpbHRlclBhbmVsUGFyYW1zKHRoYXQsIGRva3VtZW50UGFyYW1zLCB0aGlzLmZpbHRlcilcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JlbmkgZ3JpZHUgYSBuYXBsbmVuaSBvYmpla3R1IG5hY3RlbnltaSBkYXR5XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jcmVhdGVHcmlkKGRva3VtZW50UGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWmFyZWdpc3Ryb3ZhbmkgbmFobGVkdSBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWdpc3RlclByZXZpZXcoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9jdXMgbmEgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c0Z1bmMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gZ2V0R3JpZCh0aGF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvY3VzIHBvdXplIHByaSBwcnZuaW0genByYWNvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodmlldyBhcyBhbnkpLm9mZihcImNoYW5nZS5mb2N1c1wiLCBmb2N1c0Z1bmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3Lm9uKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hY3Rlbmkgc2xvdXBlY2t1IGRva3VtZW50dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9rdW1lbnRJbml0KCkudGhlbigoZG9rdW1lbnRQYXJhbXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJpZGFuaSBmaWx0cm92YWNpaG8gcGFuZWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUZpbHRlclBhbmVsKGRva3VtZW50UGFyYW1zKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JlbmkgZ3JpZHUgYSBuYXBsbmVuaSBvYmpla3R1IG5hY3RlbnltaSBkYXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNyZWF0ZUdyaWQoZG9rdW1lbnRQYXJhbXMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFphcmVnaXN0cm92YW5pIG5haGxlZHUgc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWdpc3RlclByZXZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvY3VzIG5hIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzRnVuYyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IGdldEdyaWQodGhhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvY3VzIHBvdXplIHByaSBwcnZuaW0genByYWNvdmFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2aWV3IGFzIGFueSkub2ZmKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcub24oXCJjaGFuZ2UuZm9jdXNcIiwgZm9jdXNGdW5jKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICovXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIMO6dm9kbsOtIHJvemJvciBwxZnDrXN0dXBub3N0aSB0bGHEjcOtdGVrIGEgYWtjw60gbmEgc2V6bmFtdVxyXG5cclxuICAgICAgICAgICAgLy9pZiAodGhhdC5uZWVkTG9hZClcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zIS5hY3RPYmNlcnN0dml0IS5ydW4oKTtcclxuICAgICAgICAgICAgLy9lbHNlXHJcbiAgICAgICAgICAgIC8vICB0aGF0LnByaXN0dXBub3N0QWtjaVNlem5hbXUoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gTWV0b2RhIGFrY2VTZXpuYW11XHJcbiAgICAgICAgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gTmVqcHJ2ZSB2eXR2b3JpbSBqZWRub3RsaXZlIGFrY2UsIGt0ZXJlIHByaXJhZGltIGRvIGtvbGVrY2VcclxuICAgICAgICAgICAgLy8gdGhhdC5hY3Rpb25zOiBHQWN0aW9uTGlzdFxyXG4gICAgICAgICAgICAvLyAhISBQT1pPUiwgbmV1bWkgcHJpcmFkaXQga29sZWtjaSwgbXVzaSBzZSB0byBwbyBqZWRub20gISFcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICB0aXNrS25paGFSREFjdDogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXNrS25paGFSREFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA4M1wiLCAvL1JDIDMwMjUwMDgzIDogVGlzayBrbmloeSBSRFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDA4M1wiLCAvL1JDIDMwMjUwMDgzIDogVGlzayBrbmloeSBSRFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwicm96X3B0bV9rcmRkb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlJvei5XZWJDbGllbnQuR1ByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNreU5hU2V6bmFtdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgRmlsdHJ5OiBnZXRGaWx0ZXIodGhhdCkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICB0aXNrUG9sb3pla1JEQWN0OiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpc2tQb2xvemVrUkRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwODRcIiwgLy9SQyAzMDI1MDA4NCA6IFRpc2sgcG9sb8W+ZWsgUkRcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAwODRcIiwgLy9SQyAzMDI1MDA4NCA6IFRpc2sgcG9sb8W+ZWsgUkRcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcInJvel9wdG1fa3JkcG9sMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFRpc2t5TmFTZXpuYW11XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVwLmN1c3RvbUR0by5UZW1hID0gXCJ1Y3RfcHRtX2t1ZHBvbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgRmlsdHJ5OiBnZXRGaWx0ZXIodGhhdCkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXAuY3VzdG9tRHRvID0gdGhhdC5QcmVkYW5hRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHRpc2t2c2VjaFJEREFjdDogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXNrdnNlY2hSRERBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwODZcIiwgLy9SQyAzMDI1MDA4NiA6IFRpc2sgdsWhZWNoIHJvenBvxI10b3bDvWNoIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMDg2XCIsIC8vUkMgMzAyNTAwODYgOiBUaXNrIHbFoWVjaCByb3pwb8SNdG92w71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwicm96X3B0bV9kb2t6YXUxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgSURTZXN0YXZ5OiAxMywgRmlsdHJ5OiBnZXRGaWx0ZXIodGhhdCkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIiksIFNlem5hbVBpZHU6IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIikgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHRpc2t2eWJyYW55Y2hSREFjdDogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXNrdnlicmFueWNoUkRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwODdcIiwgLy9SQyAzMDI1MDA4NyA6IFRpc2sgdnlicmFuw71jaCByb3pwb8SNdG92w71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDA4N1wiLCAvL1JDIDMwMjUwMDg3IDogVGlzayB2eWJyYW7DvWNoIHJvenBvxI10b3bDvWNoIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJyb3pfcHRtX2Rva3phdTFcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlJvei5XZWJDbGllbnQuR1ByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNreU5hU2V6bmFtdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgSURTZXN0YXZ5OiAxMCwgRmlsdHJ5OiBnZXRGaWx0ZXIodGhhdCkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIiksIFNlem5hbVBpZHU6IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIikgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHRpc2taYXZlclJvenBPcGF0cmVuaUFjdDogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlzayB6YXZlcmVjbmUgcm96cG9jdG92ZSBvcGF0cmVuaVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGlza1phdmVyUm96cE9wYXRyZW5pQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDg5XCIsIC8vUkMgMzAyNTAwODkgOiBaw6F2xJtyZcSNbsOpIHJvenBvxI10b3bDqSBvcGF0xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMDg5XCIsIC8vUkMgMzAyNTAwODkgOiBaw6F2xJtyZcSNbsOpIHJvenBvxI10b3bDqSBvcGF0xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJyb3pfcHRtX2tyZHBvbDNcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlJvei5XZWJDbGllbnQuR1ByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNreU5hU2V6bmFtdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgSURTZXN0YXZ5OiAzLCBGaWx0cnk6IGdldEZpbHRlcih0aGF0KS5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgdGlza09jZWthdmFuYVNrdXRlY25vc3RBY3Q6IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRpc2sgemF2ZXJlY25lIHJvenBvY3RvdmUgb3BhdHJlbmlcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRpc2tPY2VrYXZhbmFTa3V0ZWNub3N0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkwXCIsIC8vUkMgMzAyNTAwOTAgOiBPxI1la8OhdmFuw6Egc2t1dGXEjW5vc3RcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAwOTBcIiwgLy9SQyAzMDI1MDA5MCA6IE/EjWVrw6F2YW7DoSBza3V0ZcSNbm9zdFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwicm96X3B0bV9rcmRwb2wzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFjdGVuaSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogMTMsIEZpbHRyeTogZ2V0RmlsdGVyKHRoYXQpLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB0aXNrVnlwb3JhZGFuaVJvenBvY3R1QWN0OiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aXNrIHphdmVyZWNuZSByb3pwb2N0b3ZlIG9wYXRyZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXNrVnlwb3JhZGFuaVJvenBvY3R1QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkxXCIsIC8vUkMgMzAyNTAwOTEgOiBWeXBvxZnDoWTDoW7DrSByb3pwb8SNdHVcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTAwOTFcIiwgLy9SQyAzMDI1MDA5MSA6IFZ5cG/FmcOhZMOhbsOtIHJvenBvxI10dVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwicm96X3B0bV9rcmRwb2wzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFjdGVuaSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogMTQsIEZpbHRyeTogZ2V0RmlsdGVyKHRoYXQpLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB0aXNrTWltb3JvenBvY3RvdmVQcm9zdHJlZGt5QWN0OiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aXNrIHphdmVyZWNuZSByb3pwb2N0b3ZlIG9wYXRyZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXNrTWltb3JvenBvY3RvdmVQcm9zdHJlZGt5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDkyXCIsIC8vUkMgMzAyNTAwOTIgOiBNaW1vcm96cG/EjXRvdsOpIHByb3N0xZllZGt5XHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMDkyXCIsIC8vUkMgMzAyNTAwOTIgOiBNaW1vcm96cG/EjXRvdsOpIHByb3N0xZllZGt5XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJyb3pfcHRtX2tyZHBvbDNcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlJvei5XZWJDbGllbnQuR1ByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNreU5hU2V6bmFtdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgSURTZXN0YXZ5OiAyMywgRmlsdHJ5OiBnZXRGaWx0ZXIodGhhdCkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHRpc2tQcmV2b2REb1JGQWN0OiBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aXNrIHphdmVyZWNuZSByb3pwb2N0b3ZlIG9wYXRyZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0aXNrUHJldm9kRG9SRkFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDA5M1wiLCAvL1JDIDMwMjUwMDkzIDogUMWZZXZvZCBSWiBkbyByZXplcnZuw61obyBmb25kdVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDA5M1wiLCAvL1JDIDMwMjUwMDkzIDogUMWZZXZvZCBSWiBkbyByZXplcnZuw61obyBmb25kdVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwicm96X3B0bV9rcmRwb2wzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFjdGVuaSBmaWx0cnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogMjQsIEZpbHRyeTogZ2V0RmlsdGVyKHRoYXQpLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB0aXNrUHJldm9kTVJaRG9SRkFjdDogR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGlzayB6YXZlcmVjbmUgcm96cG9jdG92ZSBvcGF0cmVuaVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidGlza1ByZXZvZE1SWkRvUkZBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwOTRcIiwgLy9SQyAzMDI1MDA5NCA6IFDFmWV2b2QgTVJaIGRvIGEgeiByZXplcnZuw61obyBmb25kdVxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDA5NFwiLCAvL1JDIDMwMjUwMDk0IDogUMWZZXZvZCBNUlogZG8gYSB6IHJlemVydm7DrWhvIGZvbmR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJyb3pfcHRtX2tyZHBvbDNcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlJvei5XZWJDbGllbnQuR1ByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNreU5hU2V6bmFtdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgSURTZXN0YXZ5OiAyNSwgRmlsdHJ5OiBnZXRGaWx0ZXIodGhhdCkuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlBvZGFuaV06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblBvZGF0KHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuYWtjZVBvZGFuaSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5EZXRhaWxdOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgLy8ga2R5IGplIHZvbGFuYSBtZXRvZGEgcyBwYXJhbWV0cnkgPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3c6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSb3pzcGlkRHRvIHwgbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERsZSBwb2RtaW5layBzaSB6amlzdGkgYWt0aXZuaSByYWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LmNlbGxJbmZvICE9IG51bGwpIHsgLy8gZG91YmxlIGNsaWNrIHogZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cgPSBjdHguY2VsbEluZm8uZGF0YTsgLy8gZGF0YSwgemUga3RlcnljaCBieWwgdnl0dm9yZW4gcmFkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdHguY29tcGFyYXRvckl0ZW0gIT0gbnVsbCkgeyAvLyBwb2t1ZCBieWxvIHNwdcWhdMSbbm8geiBwb3Jvdm7DoXZhxI1lLCBidWRlIHDFmWVkw6FuIGNvbXBhcmF0b3JJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um93ID0gY3R4LmNvbXBhcmF0b3JJdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8vamluYWsgamUgcG90xZllYmEgbmHEjcOtc3QgdnlzdsOtY2Vuw70gxZnDoWRlayB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPZGtheiBuYSBncmlkIG1hbSB2IG1vZHVsYXJuaSBwcm9tZW5uZSAkZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFJvdyA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdSb3pzcGlkRHRvPih0aGF0LiRncmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvIGFrdGl2bmkgcmFkZWsgem9icmF6IGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFJvdyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVuRGV0YWlsKGN1cnJlbnRSb3csIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5SZWFkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjMwMjUwNTA1XCIsIC8vUkMgMzAyNTA1MDUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTA1MDZcIik7IC8vUkMgMzAyNTA1MDYgOiBOZW7DrSB2eWJyYW7DvSDFmcOhZG7DvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWxEb1phbG96a3k6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbERvWmFsb3preSh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5vcGVuRGV0YWlsSW5OZXdUYWIoKSkgfSB9KSxcclxuICAgICAgICAgICAgICAgIGFjdE96bmFjaXRQcmVjdGVuZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT3puYWNpdEpha29QcmVjdGVuZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPem5hY2l0UHJlY3RlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwNzBcIiwgLy9SQyAzMDI1MDA3MCA6IE96bmHEjWl0IGpha28gcMWZZcSNdGVuw6lcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZmEtZW52ZWxvcGUtb3Blbi1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Sb3ouV2ViQ2xpZW50Lk96bmFjaXREb2tsYWR5KHRoYXQsIHRydWUsIEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93cyh0aGF0LiRncmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RPem5hY2l0TmVwcmVjdGVuZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uT3puYWNpdEpha29OZXByZWN0ZW5lKHtcclxuICAgICAgICAgICAgICAgICAgICAvL25hbWU6IFwiYWN0T3puYWNpdE5lcHJlY3RlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2NhcHRpb246IFwianJlczozMDI1MDA3MVwiLCAvL1JDIDMwMjUwMDcxIDogT3puYcSNaXQgamFrbyBuZXDFmWXEjXRlbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImZhLWVudmVsb3BlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Sb3ouV2ViQ2xpZW50Lk96bmFjaXREb2tsYWR5KHRoYXQsIGZhbHNlLCBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3ModGhhdC4kZ3JpZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0SHJvbWFkbmFLb250cm9sYU1ldGFkYXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbktvbnRyb2xhTWV0YWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RIcm9tYWRuYUtvbnRyb2xhTWV0YWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJqcmVzOjMwMjUwMDcyXCIsIC8vUkMgMzAyNTAwNzIgOiBLb250cm9sYSBtZXRhZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAwNzNcIiwgLy9SQyAzMDI1MDA3MyA6IEhyb21hZG7DqSBrb250cm9sYSBtZXRhZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuSHJvbWFkbmVPcGVyYWNlKHRoYXQsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLktvbnRyb2xhTWV0YWRhdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RIcm9tYWRuZVByZXZ6ZXRpOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmV2eml0KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEhyb21hZG5lUHJldnpldGlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2NhcHRpb246IFwianJlczozMDI1MDA3NFwiLCAvL1JDIDMwMjUwMDc0IDogUMWZZXZ6ZXTDrVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMDc1XCIsIC8vUkMgMzAyNTAwNzUgOiBIcm9tYWRuw6kgcMWZZXZ6ZXTDrSBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogR29yZGljLkdpbi5JY29ucy5BY3Rpb25FbnVtLnByZXZ6aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuSHJvbWFkbmVPcGVyYWNlKHRoYXQsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByZXZ6ZXRpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdEhyb21hZG5hUHJlZXZpZGVuY2U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZWV2aWRvdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEhyb21hZG5hUHJlZXZpZGVuY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2NhcHRpb246IFwianJlczozMDE1MDA0M1wiLCAvL1JDIDMwMTUwMDQzIDogUMWZZWV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAwNzZcIiwgLy9SQyAzMDI1MDA3NiA6IEhyb21hZG7DoSBwxZllZXZpZGVuY2UgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5Icm9tYWRuZU9wZXJhY2UodGhhdCwgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJlZXZpZGVuY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICBhY3RIcm9tZWRuZVByaWRlbGl0OlxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByaWRlbGl0KHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcG9sZcSNbsOhIGFrY2UgUMWZaWTEm2xpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktcHJpZGVsaXQgZy1zdGF0ZS1lcnJvciBnLXN0YXRlLXRleHRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcHXFoXTEm27DrSBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lkhyb21hZG5lT3BlcmFjZSh0aGF0LCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmlkZWxlbmkpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBocm9tYWRuw6Egb3BlcmFjZSAtIFDFmElExJpMRU7DjVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RIcm9tYWRuZVByZWRhdDpcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmVkYXQoeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BvbGXEjW7DoSBha2NlIFDFmWVkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pY29uOiBcImdpLXByZWRhdCBnLXN0YXRlLXdhcm5pbmcgZy1zdGF0ZS10ZXh0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsW+ZHkgZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcHXFoXTEm27DrSBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lkhyb21hZG5lT3BlcmFjZSh0aGF0LCBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmVkYW5pKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBocm9tYWRuw6Egb3BlcmFjZSAtIFDFmEVEw4FOw41cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0SHJvbVV6YXZEb2tsVnliOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25VemF2cml0KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEhyb21VemF2RG9rbFZ5YlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJqcmVzOjMwMjUwMDc3XCIsIC8vUkMgMzAyNTAwNzcgOiBVemF2xZllbsOtIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAwNzhcIiwgLy9SQyAzMDI1MDA3OCA6IEhyb21hZG7DqSB1emF2xZllbsOtIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuSHJvbWFkbmVPcGVyYWNlKHRoYXQsIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlV6YXZyZW5pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEZWZpbmljZSBtZW51IHRpc2t1XHJcbiAgICAgICAgICAgIGxldCBtZW51VGlzazogTWVudVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBcImFjdFRpc2tTZXpuYW1cIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAxNTAwNDVcIiwgLy9SQyAzMDE1MDA0NSA6IFRpc2tcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDE1MDA0NVwiLCAvL1JDIDMwMTUwMDQ1IDogVGlza1xyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1wcmludFwiLFxyXG4gICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvL2VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1widGlza0tuaWhhUkRBY3RcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1widGlza1BvbG96ZWtSREFjdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGlza1ByZWhsZWR1UG9yUG9sb3pla0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwODhcIiwgLy9SQyAzMDI1MDA4OCA6IFDFmWVobGVkIHBvxZnDrXplbsO9Y2ggcG9sb8W+ZWsgUkRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwMDg4XCIsIC8vUkMgMzAyNTAwODggOiBQxZllaGxlZCBwb8WZw616ZW7DvWNoIHBvbG/FvmVrIFJEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcInRpc2taYXZlclJvenBPcGF0cmVuaUFjdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJ0aXNrT2Nla2F2YW5hU2t1dGVjbm9zdEFjdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJ0aXNrVnlwb3JhZGFuaVJvenBvY3R1QWN0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcInRpc2tNaW1vcm96cG9jdG92ZVByb3N0cmVka3lBY3RcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1widGlza1ByZXZvZERvUkZBY3RcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1widGlza1ByZXZvZE1SWkRvUkZBY3RcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1widGlza3ZzZWNoUkREQWN0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcInRpc2t2eWJyYW55Y2hSREFjdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIERlZmlub3ZhbmUgYWtjZSBwcmlkYW0gZG8gbWVudSAoYXRyaWJ1dCBmYXZvcml0ZSB6b2JyYXppIHBvbG96a3UgdiBob3JuaW0gcGFuZWx1KVxyXG4gICAgICAgICAgICAvLyB0aGF0LmFjdGlvbnMgb2JzYWh1amUgYWtjZSB2bG96ZW5lIHZ5c2UuIEplIHRvIGtvbGVrY2UgYWtjaVxyXG4gICAgICAgICAgICB0aGF0Lm1lbnVCYXIoW1xyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RQb2RhbmksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsRG9aYWxvemt5LCBmYXZvcml0ZTogZmFsc2UgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvL3sgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxyXG4gICAgICAgICAgICAgICAgbWVudVRpc2ssXHJcbiAgICAgICAgICAgICAgICAvL3sgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxyXG4gICAgICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgICAgICAvL2lkOiBcIm1lbnVIcm9tYWRPcGVyYWNlXCIsIGNhcHRpb246IFwianJlczozMDI1MDA2OVwiLCB0eXBlOiBcInN0YXRpY1wiLCBmYXZvcml0ZTogdHJ1ZSwgY2hpbGRyZW46IFsgLy9SQyAzMDI1MDA2OSA6IEhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVSb3pTZXpIcm9tVXphdkRva2xWeWJcIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RIcm9tVXphdkRva2xWeWJcIl0sIGZhdm9yaXRlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVSb3pTZXpIcm9tYWRuZVByZWV2aWRlbmNlXCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdEhyb21hZG5hUHJlZXZpZGVuY2UgfSxcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVJvelNlekhyb21hZG5lUHJpdnpldGlcIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0SHJvbWFkbmVQcmV2emV0aSB9LFxyXG4gICAgICAgICAgICAgICAgeyBpZDogXCJtZW51VWN0U2V6UHJlZGFuaURva2xhZHVcIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0SHJvbWFkbmVQcmVkYXQgfSxcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVVjdFNlelByaWRlbGVuaURva2xhZHVcIiwgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0SHJvbWVkbmVQcmlkZWxpdCB9LFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVSb3pTZXpIcm9tYWRuYUtvbnRyb2xhTWV0YWRhdFwiLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RIcm9tYWRuYUtvbnRyb2xhTWV0YWRhdCB9LFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVhUm96dFNlek96bmFjaXRQcmVjdGVuZVwiLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RPem5hY2l0UHJlY3RlbmUgfSxcclxuICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVJvelNlek96bmFjaXROZXByZWN0ZW5lXCIsIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdE96bmFjaXROZXByZWN0ZW5lIH1cclxuICAgICAgICAgICAgICAgIC8vXVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFRpc2ssIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0T2JjZXJzdHZpdCwgZmF2b3JpdGU6IHRydWUgfVxyXG5cclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gTWV0b2RhIGNyZWF0ZUdyaWQgLSB2eXR2b3JlbmkgZ3JpZHUgYSBqZWhvIGZ1bmtjbm9zdGlcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b3JlbmkgYSBvYnNsb3V6ZW5pIGZ1bmtjbm9zdGkgZ3JpZHUgc2V6bmFtdSBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZChkb2N1bWVudFBhcmFtczogR29yZGljLlNzbC5JbnRlcmZhY2UuR0Rva3VtZW50R2V0Q29sdW1uUGFyYW1zUmVzcG9uc2VEdG8gfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG8+KFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUm96RG9rbGFkLmxpc3QoIC8vIFZ5dHZvcmkgVGFza0lzbC4gUG9zaWxhIHNlIG11IHZ6ZHlja3kgamVuIGZpbHRyeSBhIGZyYWdtZW50eS4gVm5pdHJuZSBzaSB2b2xhIGdldCgpXHJcblxyXG4gICAgICAgICAgICAgICAgKS51c2UoKHJlcSwgbmV4dCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQocmVxKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmlzdHVwbm9zdEFrY2lTZXpuYW11KHJlc3VsdC5tZXRhISwgcmVzdWx0LmRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGF0LiRmaWx0ZXJGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoZG9jdW1lbnRQYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmYXVsdG5pIHByb2ZpbFxyXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0UHJvZmlsZSA9IGdyaWRGb3JtYXQuY29sdW1ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHogZGVmYXVsdG5paG8gcHJvZmlsdSB2eXJhZGltIHZsYXN0bm9zdGkgeiBXRkwgKHByaXNlbmUgbW9jIHNsb3VwY3UpIGEgc291Y3R5IFByaWplbSBhIFZ5ZGVqXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZT8udG9Mb3dlckNhc2UoKS5pbmRleE9mKFwidmxhc3Rub3N0XCIpID09PSAtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBpdGVtLm5hbWU/LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmRva3VtZW50KSA9PT0gLTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgXCJjMFwiLnNlYXJjaChpdGVtLm5hbWU/LnRvTG93ZXJDYXNlKCkpID09PSAtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBcImMxXCIuc2VhcmNoKGl0ZW0ubmFtZT8udG9Mb3dlckNhc2UoKSkgPT09IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyBQb2RtaW5lbmUgZm9ybWF0b3ZhbmlcclxuICAgICAgICAgICAgY29uc3QgY29uZEZvcm1hdCA9IHRoaXMuY3JlYXRlQ29uZGl0aW9uRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBHcmlkIHNpIHVsb3ppbSBkbyBtb2R1bGFybmkgcHJvbWVubmUsIGFieWNoIHNlIG5hIG5laiBuZW11c2VsIHZzdWRlIG9ka2F6b3ZhdFxyXG4gICAgICAgICAgICB0aGF0LiRncmlkID0gJC5uZXdEaXYoXCJqcy1zZXpuYW1Eb2tsYWR1XCIpIC8vIFZ5dHZvciBkaXYgcHJvIHZsb3plbmkgZ3JpZHUgYSBvem5hYyBzaSBqZWoganMtdGlyZG91IHBybyBzbmF6c2kgaWRlbnRpZmlrYWNpIHBvbW9jaSBqUXVlcnlcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpICAvLyAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIikgLS0gdnlwbG7Em27DrSB3aWRnZXR1IG5hIGNlbG91IG9icmF6b3ZrdS4gTHplIHBvdcW+w610IG3DrXN0byBuYXN0YXZlbsOtIGhlaWdodC5cclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGF0LmVsZW1lbnQpIC8vIHZsb3ogZ3JpZCBkb3ZuaXRyIGh0bWwgZWxlbWVudHUgdGhpcyAoYWt0dWFsbmkgZWxlbWVudCkuIFZyYXQgb2RrYXogbmEgalF1ZXJ5IGdyaWQgZG8gcHJvbWVubmUgJGdyaWRcclxuXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vIE9ic2x1aGEgZnVua2Nub3N0aSB3aWRnZXR1XHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoeyAvLyBzdHJ1a3R1cmEgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgIC8vIHJlemltICBzaXJlayBzbG91cGN1ICh0eXAgem9icmF6ZW5pIGdyaWR1KS4gQWJzb2x1dG5pIHNpcmt5IHNsb3VwY3UgKGRlZmF1bHQgZml0IC0gcmVzcG9ueml2bmkpXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogXCJhY19hZyBERVNDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGVscGVyVGVtcGxhdGU6IFwie2l4cH0ve2FjX2FnfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLCAgLy8gSW50ZWdyb3ZhbsOhIHBvZHBvcmEgdsO9YsSbcnUgdsOtY2UgbmXFviBqZWRub2hvIMWZw6Fka3UgKHphcMOtbsOhIGludGVncm92YW7DqSBjaGVja2JveHkgYSBqaW7DqSBtZWNoYW5pc215IHBybyBocm9tYWRuw70gdsO9YsSbcikuIFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogdGhhdC51c2VyU2V0dGluZ3MhLCAvLyBWbG96aW0gbXUgb2JqZWt0IHV6aXZhdGVsc2tlaG8gbmFzdGF2ZW5pIC0gesWVZWptbmUgcHJvIGRhbHNpIHpwcmFjb3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsLCAvLyB2eWNob3ppIGFrY2UgZ3JpZHUgcHJvIGFrY25pIHZ5YmVyIChkdm9qa2xpaywgZW50ZXIgYXRkKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaENvbHVtbnM6IFtcIml4cFwiLCBcInBvcGlzXCJdLCAvLyBzbG91cGNlLCBwb2RsZSBrdGVyw71jaCBzZSB2eWhsZWTDoXbDoSB2IHNlYXJjaGJveHVcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LC8qbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5kYXRhLCB7IGtleTogXCJpeHBcIiB9KSwqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICogTG9rYWxuaSBuYWJpZGthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIGNlbGxDb250ZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IGZ1bmN0aW9uIChjZWxsQ29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5hY3Rpb25zLmNyZWF0ZUJhcih0aGF0LmdldE1lbnVBY3Rpb25zKHRydWUsIGNlbGxDb250ZXh0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBVZMOhbG9zdCBuYXN0w6F2w6EgcMWZaSB6bcSbbsSbIHbDvWLEm3J1IMWZw6Fka8WvIHYgZ3JpZHUuIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9QVElNQUxJWkFDRTogVWTDoWxvc3Qgc2UgdHlwaWNreSB2b2zDoSBixJtoZW0gcMWZZWrDrcW+ZMSbbsOtIGt1cnpvcmVtIHBvIMWZw6FkY8OtY2ggZ3JpZHUuIFByb3RvIHYgdWTDoWxvc3RpIG5lcHJvdsOhZMSbanRlIG7DoXJvxI1uw6kgb3BlcmFjZSwgbmFwxZkuIHpieXRlxI1uw6kgZ2V0U2VsZWN0aW9uKCkgbmEgdmVsa8O9Y2ggZGF0ZWNoLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluZm8uY291bnQgLVx0cG/EjWV0IG96bmHEjWVuw71jaCDFmcOhZGvFr1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluZm8uZ2V0U2VsZWN0aW9uKCkgLSBpbnN0YW7EjW7DrSBkZWxlZ8OhdCBuYSBtZXRvZHUgZ2V0U2VsZWN0aW9uKCkuIE9QVElNQUxJWkFDRTogcHJvdG/FvmUgZ2V0U2VsZWN0aW9uKCkgamUgcmVsYXRpdm7EmyBwb21hbMOhIChtdXPDrSBwcm9jaMOhemV0IHbFoWVjaG55IMWZw6Fka3kpLCBqZSB2aG9kbsSbasWhw60sIGtkZSB0byBqZGUsIGTEm2xhdCByb3pob2RudXTDrSBuYSB6w6FrbGFkxJsgcG/EjXR1IMWZw6Fka8WvLCBrdGVyw70gamUgayBkaXNwb3ppY2kgaWhuZWQuIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluZm8udmlldyAtIGFrdHVhbG7EmyB6b2JyYXplbsOhIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmdW5rY2UgbmEgcmVha2NpIHphxaFrcnRudXTDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBaZGUgc2UgbmVtb2h1IG9ka2F6b3ZhdCBuYSBvYmpla3QgJGdyaWQsIG11c2ltIG5hY2l0YXQgcHJlcyBjbGFzcyBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciB2eWJyYW5lUmFka3kgPSB0aGF0LmZpbmQoXCIuanMtc2V6bmFtRG9rbGFkdVwiKS5nZ3JpZChcImdldFNlbGVjdGlvblwiKTsgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHDFmWVzIHZ5aGxlZMOhbsOtIGdyaWR1IChwxZllcyBjbGFzcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodnlicmFuZVJhZGt5ICE9PSBudWxsICYmIHZ5YnJhbmVSYWRreS5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBqZSB2eWJyw6FuIGplZGVuIMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdFN0b3Jub0Rva2xhZHUudXBkYXRlKHsgZW5hYmxlZDogdHJ1ZSB9KTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBTVE9STk8gYWt0aXZuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gamUgdnlicsOhbm8gdsOtY2UgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdFN0b3Jub0Rva2xhZHUudXBkYXRlKHsgZW5hYmxlZDogZmFsc2UgfSk7ICAgICAgICAgICAgICAgICAgICAgICAvLyBTVE9STk8gbmVha3Rpdm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVZMOhbG9zdCBuYXN0w6F2w6EgcMWZaSB6bcSbbsSbIHBvbG9oeSBrdXJ6b3J1LiBcclxuICAgICAgICAgICAgICAgICAgICAvLyBPUFRJTUFMSVpBQ0U6IFYgbmFwcm9zdMOpIHbEm3TFoWluxJsgcMWZw61wYWTFryBzZSAobmFwxZkuIHBybyB6b2JyYXplbsOtIHDFmcOtcHVzdG7DvWNoIGFrY8OtKSBtw6EgcG91xb7DrXQgdWTDoWxvc3Qgc2VsZWN0aW9uLiBjZWxsQWN0aXZhdGUgamUgdXLEjWVuYSBwcm8gc3BlY2nDoWxuw60gb3BlcmFjZSwga3RlcsOpIHTDqW3Em8WZIHbDvWhyYWRuxJsgemFqw61tw6EgaW5kZXggxZnDoWRrdSBhIG5hdmlnYWNpIG9iZWNuxJssIG3DrXN0byBqZWhvIGRhdC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbmZvLmNlbGxJbmZvIC1pbmZvcm1hY2UgbyBidcWIY2UvxZnDoWRrdSwga3RlcsO9IHNlIG5vdsSbIG96bmHEjWlsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5mby5vcmlnaW5hbENlbGxJbmZvIC0gaW5mb3JtYWNlIG8gYnXFiGNlL8WZw6Fka3Uga3RlcsO9IGJ5bCBwxa92b2RuxJsgb3puYcSNZW7DvVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluZm8udmlldyAtIGFrdHVhbG7EmyB6b2JyYXplbsOhIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXplbmkgY2kgc2tyeXRpIHByZXZpZXdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8gIT0gbnVsbCAmJiBpbmZvLmNlbGxJbmZvICE9IG51bGwgJiYgaW5mby5jZWxsSW5mby5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KGluZm8uY2VsbEluZm8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IHNvcnQ6IFwiIWFjX2FnXCIsIGNvbHVtbkxpc3Q6IGRlZmF1bHRQcm9maWxlLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSwgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXQgfSwgLy9jb2x1bW5MaXN0OiBcInpwcmFjb3ZhdGVsLCBha3Rpdml0YSwgY2lzbG8sIG5hemV2XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImpyZXM6MzAyNTAyNjRcIiwgc29ydDogXCIhYWNfYWdcIiwgY29sdW1uTGlzdDogXCJpeHAsYWNfYWcsYWMsZHJkLGFjX2l4ZSxyb2ssbWVzaWMsZGVuLGt0Z1R5cE5hemV2LHN0YXZfdHh0LCBjLHBvcGlzXCIsIC8vUkMgMzAyNTAyNjQgOiBaamVkbm9kdcWhZW7DvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcImpyZXM6MzAyNTAyNjVcIiwgY29uZEZvcm1hdHM6IGNvbmRGb3JtYXQsIHNvcnQ6IFwiIWFjX2FnXCIsIGNvbHVtbkxpc3Q6IGdyaWRGb3JtYXQuY29sdW1ucy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubmFtZT8udG9Mb3dlckNhc2UoKS5pbmRleE9mKFwidmxhc3Rub3N0XCIpID09PSAtMSAmJiBpdGVtLm5hbWU/LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLmRva3VtZW50KSA9PT0gLTEpLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9ICAvL1JDIDMwMjUwMjY1IDogw5pwbG7DvVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkZWtvKFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc291xI10b3bDvSDFmcOhZGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkbG91aMO9IHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdEFsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RNb2RlbDogXCJHbG9iYWwuVWN0LkFwcFNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0Q291bnRNZXRob2Q6IHJxID0+IHsgcmV0dXJuIHRoYXQuaXNsLlJvekRva2xhZC5jb3VudChycSkuZ2V0KCkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RNb2RpZnlScU1ldGhvZDogcnEgPT4geyByZXR1cm4gcnE/LmZpbHRlcnMgPyB0cnVlIDogZmFsc2U7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9kbWluZW5lIGZvcm1hdG92YW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUNvbmRpdGlvbkZvcm1hdCgpOiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDI1OVwiLCAvL1JDIDMwMjUwMjU5IDogTmVwxZllxI10ZW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBwcml6X3ZpZXc9PTEwXCIsXHJcbiAgICAgICAgICAgICAgICAvL2l0YWxpYzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJvbGQ6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDI2MFwiLCAvL1JDIDMwMjUwMjYwIDogU2NodsOhbGVuw6kgZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgZm9ybXVsYTogXCJAc196YXU9PTMwXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyZWVuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAyNjFcIiwgLy9SQyAzMDI1MDI2MSA6IFJlYWxpem92YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3phdT09NDBcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMjYyXCIsIC8vUkMgMzAyNTAyNjIgOiBTdG9ybm92YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3phdT09OTAgb3IgQHByZWV2aWRlbmNlPT0yXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyYXlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDI2M1wiLCAvL1JDIDMwMjUwMjYzIDogVXphdsWZZW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiBcIkBzX3phdT09NTBcIixcclxuICAgICAgICAgICAgICAgIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuZ3JheVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBNZXRvZGEgcmVnaXN0ZXJQcmV2aWV3XHJcbiAgICAgICAgcmVnaXN0ZXJQcmV2aWV3KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdTZXpuYW1Eb2tsYWR1VGFiLnJlZ2lzdGVyUHJldmlld1wiLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgc2UgbmV1c3RhbGUgbWVuaSBkbGUgb2JqZWt0dS4gWmRlIHNpIHRlZHkgdWxvemltIG9ka2F6IG5hIGNlbHkgQ29udGVudFxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbmkgb3B0aW9ucyBwcm8gcHJldmlld1xyXG4gICAgICAgICAgICB2YXIgb3B0aW9uc1ByZXZpZXcgPSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0lkOiBcInJvejpEb2tsYWRcIiAvLyBpZCBwcmV2aWV3LCBrdGVyw6kgbcOhIGLDvXQgem9icmF6ZW5vLCBwxZnDrXBhZG7EmyBmdW5rY2Uga3RlcsOhIHBvZGxlIGxvYWRQYXJhbXMgdnLDoXTDrSB2aWV3SWRcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RmlsZVByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBQcm92aWRlcjogZnVuY3Rpb24gKGxvYWRQYXJhbXMpIHsgcmV0dXJuIGxvYWRQYXJhbXMuaXhwOyB9ICAgICAgICAgICAgICAgLy8gZnVua2NlLCBrdGVyw6EgbcOhIHphIMO6a29sIHBvc2t5dG5vdXQgaXhwIHBybyBuYcSNdGVuw60gZWwuIG9icmF6dVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGlzLmVsZW1lbnQsIG9wdGlvbnNQcmV2aWV3KTtcclxuICAgICAgICAgICAgLy90aGF0LnByZXZpZXdDb250cm9sbGVyLnJlZ2lzdGVyUGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gTWV0b2RhIHByaXN0dXBub3N0QWtjaVNlem5hbVxyXG4gICAgICAgIHByaXN0dXBub3N0QWtjaVNlem5hbXUocGVybWlzaW9uczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFBlcm1pc3Npb25zTGlzdCB8IHVuZGVmaW5lZCwgcG9jZXRSYWRrdTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR29yZGljLlJvei5XZWJDbGllbnQuR1Nlem5hbURva2xhZHVUYWIucHJpc3R1cG5vc3RBa2NpU2V6bmFtdVwiLCB0aGlzKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwZXJtaXNpb25zID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgcGVybWlzaW9ucyA9IHRoaXMucGVybWlzaW9ucztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJtaXNpb25zID0gcGVybWlzaW9ucztcclxuICAgICAgICAgICAgLy8gVGhpcyBzZSBuZXVzdGFsZSBtZW5pIGRsZSBvYmpla3R1LiBaZGUgc2kgdGVkeSB1bG96aW0gb2RrYXogbmEgY2VseSBDb250ZW50XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy92YXIgcG9jZXRSYWRrdSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdSh0aGF0LiRncmlkKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gcG9kYW5pXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQb2Rhbmk/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5DYW5DcmVhdGUpO1xyXG4gICAgICAgICAgICAvLyB6b2JyYXppdCBkZXRhaWxcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLkNhblNob3dEZXRhaWwpO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsIS51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXRSYWRrdSA+IDAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gb3RldnJpdCBkZXRhaWwgZG8gbm92ZSB6YWxvemt5XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3REZXRhaWxEb1phbG96a3khLnVwZGF0ZSh7IGVuYWJsZWQ6IHRoYXQuYWN0aW9ucy5hY3REZXRhaWwhLmVuYWJsZWQoKSB9KTtcclxuICAgICAgICAgICAgLy8gb3puYWNpdCBwcmVjdGVuZVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T3puYWNpdFByZWN0ZW5lPy51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc2lvbnMuUG92b2xlbk96bmFjaXRQcmVjdGVuZSk7XHJcbiAgICAgICAgICAgIC8vIG96bmFjaXQgbmVwcmVjdGVuZVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0T3puYWNpdE5lcHJlY3RlbmU/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5Qb3ZvbGVuT3puYWNpdE5lcHJlY3RlbmUpO1xyXG4gICAgICAgICAgICAvLyBrb250cm9sYSBtZXRhZGF0XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RIcm9tYWRuYUtvbnRyb2xhTWV0YWRhdD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLlBvdm9sZW5pS29udHJvbHlNZXRhZGF0KTtcclxuICAgICAgICAgICAgLy8gcHJldnppdFxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0SHJvbWFkbmVQcmV2emV0aT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLlBvdm9sZW5pUHJldnppdCk7XHJcbiAgICAgICAgICAgIC8vIHByZWRhbmlcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEhyb21hZG5lUHJlZGF0Py51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc2lvbnMuUG92b2xlbmlQcmVkYXQpO1xyXG4gICAgICAgICAgICAvLyBwcmVldmlkZW5jZVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0SHJvbWFkbmFQcmVldmlkZW5jZT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLlBvdm9sZW5pUHJlZXZpZGVuY2UpO1xyXG4gICAgICAgICAgICAvLyBwcmlkZWxpdFxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0SHJvbWVkbmVQcmlkZWxpdD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLlBvdm9sZW5pUHJpZGVsaXQpO1xyXG4gICAgICAgICAgICAvLyB1emF2cml0XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RIcm9tVXphdkRva2xWeWI/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5Qb3ZvbGVuaVV6YXZyZW5pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRpc2t5XHJcbiAgICAgICAgICAgIC8vIGtuaWh5IHJvenBvY3RvdnljaCBkb2tsYWR1XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy50aXNrS25paGFSREFjdD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLlBvdm9sZW5pVGlza3VLbmloYVJEKTtcclxuICAgICAgICAgICAgLy8gdGlzayBwb2xvemVrXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy50aXNrUG9sb3pla1JEQWN0Py51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc2lvbnMuUG92b2xlbmlUaXNrdVBvbG96ZWtSRCk7XHJcbiAgICAgICAgICAgIC8vIHRpc2sgdnNlY2ggZG9rbGFkdVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMudGlza3ZzZWNoUkREQWN0Py51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc2lvbnMuUG92b2xlbmlUaXNrdVZzZWNoUkQpO1xyXG4gICAgICAgICAgICAvLyB0aXNrIHZ5YnJhbnljaCBkb2tsYWR1XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy50aXNrdnlicmFueWNoUkRBY3Q/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5Qb3ZvbGVuaVRpc2t1VnlicmFueWNoUkQpO1xyXG4gICAgICAgICAgICAvLyB0aXNrIHZ5YnJhbnljaCBkb2tsYWR1XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy50aXNrWmF2ZXJSb3pwT3BhdHJlbmlBY3Q/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5Qb3ZvbGVuaVRpc2t1WmF2ZXJSb3pwT3BhdHJlbmkpO1xyXG4gICAgICAgICAgICAvLyB0aXNrIG9jZWthdmFuZSBza3V0ZWNub3N0aVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMudGlza09jZWthdmFuYVNrdXRlY25vc3RBY3Q/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5Qb3ZvbGVuaVRpc2t1T2Nla2F2YW5hU2t1dGVjbm9zdCk7XHJcbiAgICAgICAgICAgIC8vIHRpc2sgdnlwb3JhZGFuaSByb3pwb2N0dVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMudGlza1Z5cG9yYWRhbmlSb3pwb2N0dUFjdD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLlBvdm9sZW5pVGlza3VWeXBvcmFkYW5pUm96cG9jdHUpO1xyXG4gICAgICAgICAgICAvLyB0aXNrIG1pbW9yb3pwb2N0b3ZlIHByb3N0cmVka3lcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLnRpc2tNaW1vcm96cG9jdG92ZVByb3N0cmVka3lBY3Q/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5Qb3ZvbGVuaVRpc2t1TWltb3JvenBvY3RvdmVQcm9zdHJlZGt5KTtcclxuICAgICAgICAgICAgLy8gdGlzayBwcmV2b2QgZG8gcmV6ZXJ2bmlobyBmb25kdVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMudGlza1ByZXZvZERvUkZBY3Q/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzaW9ucy5Qb3ZvbGVuaVRpc2t1UHJldm9kRG9SRik7XHJcbiAgICAgICAgICAgIC8vIHRpc2sgcHJldm9kICBtaW1vcm96cG9jdG92eWNoIHpkcm9qdSBkbyByZXplcnZuaWhvIGZvbmR1XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy50aXNrUHJldm9kTVJaRG9SRkFjdD8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNpb25zLlBvdm9sZW5pVGlza3VQcmV2b2RNUlpEb1JGKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLmFjdFBvZGFuaSEudmlzaWJsZSh0cnVlKTsgLy90aGF0LmFrY2VTZXpuYW11LlBvZGFuaVZpc2libGUhKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy5hY3RQb2RhbmkhLmVuYWJsZWQodHJ1ZSk7IC8vIHRoYXQuYWtjZVNlem5hbXUuUG9kYW5pRW5hYmxlISk7ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEudmlzaWJsZSh0aGF0LmFrY2VTZXpuYW11LkRldGFpbFZpc2libGUhKTtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdERldGFpbCEuZW5hYmxlZCh0aGF0LmFrY2VTZXpuYW11LkRldGFpbEVuYWJsZSEpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdFByZWRhbmkhLnZpc2libGUodGhhdC5ha2NlU2V6bmFtdS5QcmVkYW5pVmlzaWJsZSEpO1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmFjdGlvbnMuYWN0UHJlZGFuaSEuZW5hYmxlZCh0aGF0LmFrY2VTZXpuYW11LlByZWRhbmlFbmFibGUhKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlkZWxlbmkhLnZpc2libGUodGhhdC5ha2NlU2V6bmFtdS5QcmlkZWxlbmlWaXNpYmxlISk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlkZWxlbmkhLmVuYWJsZWQodGhhdC5ha2NlU2V6bmFtdS5QcmlkZWxlbmlFbmFibGUhKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVldmlkZW5jZSEudmlzaWJsZSh0aGF0LmFrY2VTZXpuYW11LlByZWV2aWRlbmNlVmlzaWJsZSEpO1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmFjdGlvbnMuYWN0UHJlZXZpZGVuY2UhLmVuYWJsZWQodGhhdC5ha2NlU2V6bmFtdS5QcmVldmlkZW5jZUVuYWJsZSEpO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdFByZWV2aWRlbmNlIS52aXNpYmxlKHRoYXQuYWtjZVNlem5hbXUuS2xpY292YVNsb3ZhVmlzaWJsZSEpO1xyXG4gICAgICAgICAgICAvLyAgICB0aGF0LmFjdGlvbnMuYWN0UHJlZXZpZGVuY2UhLmVuYWJsZWQodGhhdC5ha2NlU2V6bmFtdS5LbGljb3ZhU2xvdmFFbmFibGUhKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVldmlkZW5jZSEudmlzaWJsZSh0aGF0LmFrY2VTZXpuYW11LlRpc2tWaXNpYmxlISk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVldmlkZW5jZSEuZW5hYmxlZCh0aGF0LmFrY2VTZXpuYW11LlRpc2tFbmFibGUhKTtcclxuXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVldmlkZW5jZSEudmlzaWJsZSh0aGF0LmFrY2VTZXpuYW11Lk9iY2Vyc3R2aXRWaXNpYmxlISk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVldmlkZW5jZSEuZW5hYmxlZCh0aGF0LmFrY2VTZXpuYW11Lk9iY2Vyc3R2aXRFbmFibGUhKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIE1ldG9kYSBvcGVuRGV0YWlsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBkZXRhaWx1IHJvenBvY3RvdmVobyBkb2tsYWR1XHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbnRSb3cgYWt0aXZuaSByYWRlayB8IG51bGxcclxuICAgICAgICAgKiBAcGFyYW0gYWN0aW9uIHNwdXN0ZW5hIGFrY2Uga3RlcmEgb3RldmlyYSBkZXRhaWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoY3VycmVudFJvdzogR29yZGljLkVrby5JbnRlcmZhY2UuR1JvenNwaWREdG8gfCBudWxsLCBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBQb2t1ZCBuZW5pIG5hbGV6ZW55IGFrdHVhbG5pIHJhZGVrLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRSb3cpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vIE90ZXZyZW5pIGRldGFpbHVcclxuICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIFwiR29yZGljLlJvei5XZWJDbGllbnQuR0RldGFpbERva2xhZHVUYWJcIiwgLy8gbmF6ZXYgb2tuYSBkZXRhaWx1IChjIyBuZWJvIHRzID8pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IFwiUm96RGV0YWlsRG9rbGFkdSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnpkeSBzZSB2eXR2b3JpIG5vdmUgR1BDIHMga29ua3JldG5pIGtuaWhvdS4gVGouIGkga2R5eiBqZSBwb2hsZWQgcHJlcyB2c2VjaG55IGtuaWh5LCB0YWsgcHJpIHpvYnJhemVuaSBkZXRhaWx1IHN0b2ppbSB2IGtuaXplLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2RhbmkgdGVkeSBwcm9iaWhhIGRvIGtuaXp5LCB6ZSBrdGVyZSBqZSB6b2JyYXplbnkgZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdwYzogR29yZGljLkVrby5VdGlscy5jcmVhdGVCb29rR3BjKHRoYXQuZ3BjLCBjdXJyZW50Um93Lml4cF9kZW4hKSwgLy8gR1BDIHMga25paG91IHogYWt0dcOhbG7DrWhvIHrDoXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuJGdyaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiBjdXJyZW50Um93Lml4cCxcclxuICAgICAgICAgICAgICAgICAgICBkYXR1bVptZW55OiBjdXJyZW50Um93LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbiwgLy8gTmFjdGVuaSBleGlzdHVqaWNpaG8gZGV0YWlsdSAocmVhZCkgbmVibyBwb2Rhbmkgbm92ZWhvIGRva2xhZHUgKHBvZGFuaSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oXCJkZXRhaWxfY2hhbmdlXCIsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgYnlsIHrDoXpuYW0gem3Em27Em24sIG11c8OtIHNlIG5hxI3DrXN0IHpub3Z1XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwgJiYgcmV0VmFsLmRhdGEgJiYgcmV0VmFsLmRhdGEuaXhwICYmIHJldFZhbC5kYXRhLml4cCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgesOha2xhZG7DrWhvIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSmFrIGplIHRvIHMgVmlldyA/Pz8/XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnZpZXcucmVxdWVzdERhdGEoeyBmaWx0ZXJzOiB7IGl4cDogcmV0VmFsLmRhdGEuaXhwIH0sIG9ubHlQS1dpdGhvdXRGaWx0ZXJzOiB0cnVlIH0sIHsgdXBkYXRlTW9kZTogXCJ1cGRhdGVcIiB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbmkgZm9jdXN1IGRvIGdyaWR1IHBvIHV6YXZyZW5pIGNvbnRlbnR1IGRldGFpbHUgXHJcbiAgICAgICAgICAgIC8vIFBhcmFtZXRyeSB1ZGFsb3N0aSBuZWpzb3UgcG90cmViYSwgbW9odSBqZSB2eWhvZGl0XHJcbiAgICAgICAgICAgIC8vJGRldGFpbFdpbmRvdy5vbihcImNvbnRlbnRjbG9zZWRcIiwgKGV2LCBjdHgpID0+IHsgLy8gZnVuY3Rpb24oZXYsY3R4KSB7IC4uLi4uIHB1dm9kbmkgdmVyemVcclxuICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kZ3JpZC5nZ3JpZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBQT0RBTkkgRE9LTEFEVVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBha2NlUG9kYW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogWmF2b2xhbmkgYWtjZSBwb2RhbmlcclxuICAgICAgICAgKiBAcmV0dXJucyBwcm9taXNlIHNsaWJ1amljaSB2eXNsZWRla1xyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBha2NlUG9kYW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueSwgYW55LCBhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzOyAvLyB0aGlzIGplIHpkZSBjb250ZW50XHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlLCBuYSBuZW16IGJ1ZGUgbmF2YXphbiBjZWx5IHJldGV6ZWMgcHJvdmFkZW55Y2ggYXN5bmNocm9ubmljaCBvcGVyYWNpIFxyXG4gICAgICAgICAgICAvLyBDZWxhIG9wZXJhY2UgYnkgbWVsYSBwcm9iZWhub3V0IGFzeW5jaHJvbm5lLCBhYnkgdXppdmF0ZWwgbW9obCBkYWwgcHJhY292YXQgcyBwcm9obGl6ZWNlbVxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKClcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWIHJhbWNpIHJldGV6Y2UgcHJvbWlzZSB6b2JyYXppbSBpbmZvcm1hY2kgaGxhc2t1XHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAxNTAwNzJcIik7IC8vUkMgMzAxNTAwNzIgOiBQcm9iw61ow6EgcG9kw6Fuw60gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy8gbmVuaSBwb3RyZWJhIHZyYWNldCBcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQSBueW5pIGppeiB2bGFzdG5pIHBydWJlaCB6cHJhY292YW5pLiBWb2xhbSBhc3luY2hyb25uaSBJU0wgbWV0b2R1LCBrdGVyYSBwcm92ZWRlIHBvZGFuaSBuYSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAvLyBKYWtvIHZ5c2xlZGVrIHZvbGFuaSBqZSB2cmFjZW5hIGRvIG9kcG92ZWRpIHByb21pc3UgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2xQb2RhbmkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF96bWVuYTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJlemltWmFkYXZhbmlQaWR1XCI6IEVrby5VdGlscy5HZXRFa29Vc2VyU2V0dGluZ3NQaWRTZWptdXRpKHRoYXQsIHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUG92b2xpdEdlbmVyb3ZhbmlQaWR1RG9rbGFkdSEgPyBcImFub1wiIDogXCJuZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJIGtkeXogamUgemFwbnV0eSBwb2hsZWQgcHJlcyB2c2VjaG55IGtuaWh5LCB0YWsgcHJpIHpvYnJhemVuaSBkZXRhaWx1IHN0b2ppbSB2IGtuaXplLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvZGFuaSB0ZWR5IHByb2JpaGEgZG8ga25paHksIHplIGt0ZXJlIGplIHpvYnJhemVueSBkZXRhaWwuIE5hIGRldGFpbHUgamUgVlpEWSBrbmloYSB2eXBsbmVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUG9obGVkUHJlc0tuaWh5XCI6IChFa28uVXRpbHMuZ2V0RWtvQm9va1ZhcmlhbnQodGhhdCkgPT09IEVrby5JbnRlcmZhY2UuR0Vrb0Jvb2tWYXJpYW50Lk9uZSkgPyAwIDogMSAvLyB6YXBudXR5IHBvaGxlZCBwcmVzIHZzZWNobnkga25paHkoMCAtIG5lLCAxIC0gYW5vKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFBvZGFuaUluRHRvXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gViBwcmlwYWRlLCB6ZSB2c2UgcHJvYmVobG8gdiBwb3JhZGt1LCB0YWsgbmFjdGkgZGF0YVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVuRGV0YWlsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGl4cDogcmVzcG9uc2UuZGF0YS5oZWFkZXIuaXhwLCBkYXRfem1lbmE6IHJlc3BvbnNlLmRhdGEuaGVhZGVyLmRhdF96bWVuYSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9kYW5pXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTmFrb25lYyBzbWF6IGluZm9ybWFjbmkgaGxhc2t1XHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpOyAvLyBzbWF6IGluZm9ybWFjbmkgaGxhc2t1XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpc2xQb2RhbmlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBNZXRvZGEga3RlcmEgc3B1c3RpIHNlcnZlcm92ZSBJU0wgcG9kYW5pXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHJlcXVlc3QgdnN0dXBuaSBwYXJhbWV0cnkgSVNMIG1ldG9keSBvYnNhaHVqaWNpIGl4cCwgZGF0dW0gem1lbnkgKyBkYWxzaSBtb3puZSBwYXJhbWV0cnkgcHJvIG9wYWtvdmFuaSBvcGVyYWNlIC0gdml6LiBwb3BpcyBHUm96RG9rbGFkSW5EdG9cclxuICAgICAgICAgKiBAcmV0dXJucyBwcm9taXNlIHZyYWNlbmkgc2xpYnUsIHplIHByb3ZlZGUgbmEgc2VydmVydSBwb2RhbmkgYSB2cmF0aSB2eXBsbmVuZSBHUm96RG9rbGFkSW5EdG9cclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNsUG9kYW5pKHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFBvZGFuaUluRHRvKTogSlF1ZXJ5LlByb21pc2U8YW55LCBhbnksIGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhpcy5pc2wuUm96RG9rbGFkLmNyZWF0ZShyZXF1ZXN0KS5nZXQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBva3VkIHZzZSBwcm9iZWhuZSBzcHJhdm5lLCB2cmF0aW0gcHJvbWlzZS5yZXNvbHZlIGEgcG8gdnJhY2VuaSBzaSB6b2JyYXppIGRhdGFcclxuICAgICAgICAgICAgLy8gViBwcmlwYWRlIGNoeWJ5IGppIHpkZSB6cHJhY3VqaS4gT2JlY25lIGNoeWJ5IHBvc2lsYW0gZGFsIGtlIHNwb2xlY25lbXUgenByYWNvdmFuaS4gWmRlIHNpIHpwcmFjdWppIHBvdXplIHR5IFwic3ZvamVcIlxyXG4gICAgICAgICAgICAvLyBKZSB0byBwcm90bywgemUgbWV0b2R1IHpkZSB2b2xhbSByZWt1eml2bmVcclxuICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UuY2F0Y2goXHJcbiAgICAgICAgICAgICAgICAoZXJyOiBJR0V4Y2VwdGlvbkluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBlcnIgbmVuaSBjaHliYSB6ZSBzZXJ2ZXJ1LCB0YWsgamkgamVuIHBvc2xpIHZ5c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGVyciBpbnN0YW5jZW9mIEdTZXJ2ZXJFcnJvcikpIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTnV0bmEga29udHJvbGEsIG5lIHZ6ZHkgdnlqaW1rYSBvYnNhaHVqZSBEYXRhSW52YWxpZERldGFpbHMsIHBhayBqZSBwb3RyZWJhIG5lY2hhdCB6cHJhY292YXQgc3RhbmRhcmRuZS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVyci5kYXRhIHx8ICFlcnIuZGF0YS5EYXRhSW52YWxpZERldGFpbHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhjOiBzdHJpbmcgJiBJR0V4Y2VwdGlvbkluZm8gPSBlcnIuZGV0YWlscztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvbWVubmEgcHJvIHVsb3plbmkgZGFpbG9ndVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCAkZGlhbG9nOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBleGMuaGFuZGxlZCA9IHRydWU7IC8vIE5hc3RhdiBzaSBwcml6bmFrLCB6ZSBjaHliYSBieWxhIG9zZXRyZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTsgLy8gc21heiBpbmZvcm1hY25pIGhsYXNrdVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgICAgICAvLyBPc2V0cmVuaSBjaHlieVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChleGMhLmRhdGEhLkRhdGFJbnZhbGlkRGV0YWlscy5leGNlcHRpb25UeXBlID09IFVjdC5JbnRlcmZhY2UuR0VUeXB5Q2h5Yi5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGlhbG9nID0gdGhhdC5kaWFsb2dzLmVycm9yKGV4Yy5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZGlhbG9nLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIik7ICAgIC8vIFZyYWNpIHNlIHZ6ZHkgT0ssIHR1ZGl6IHZ6ZHkgdnJhdGkgcmVqZWN0IChlcnJvciBuZXZyYWNpIHllcy9ubyBhbGUgT0spXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3NldHJlbmkgZG90YXp1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4YyEuZGF0YSEuRGF0YUludmFsaWREZXRhaWxzLmV4Y2VwdGlvblR5cGUgPT0gVWN0LkludGVyZmFjZS5HRVR5cHlDaHliLnF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4Yy5iYXNlTWVzc2FnZSArPSBcImpyZXM6MzAxNTAwNzNcIjsgLy9SQyAzMDE1MDA3MyA6IDtDaGNldGUgcG9rcmHEjW92YXQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZGlhbG9nID0gdGhhdC5kaWFsb2dzLmNvbmZpcm0oZXhjLmJhc2VNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRkaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZShcInllc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QubWVtYmVyID0gZXhjIS5kYXRhIS5tZW1iZXI7IC8vIFVsb3ppbSBzaSBjaHlib3Z5IGtvZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuYWRkSW5mbyA9IGV4YyEuZGF0YSEuYWRkSW5mbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2xQb2RhbmkocmVxdWVzdCk7IC8vIFZvbGFtIHJla3Vyeml2bmUgYWtjaSB6bWVuZW55bSByZXF1ZXN0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFpvYnJhemVuaSBmb3JtdWxhcmVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXhjIS5kYXRhIS5EYXRhSW52YWxpZERldGFpbHMuZXhjZXB0aW9uVHlwZSA9PSBVY3QuSW50ZXJmYWNlLkdFVHlweUNoeWIuc2hvd0Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm9yaW0gZm9ybXVsYXIgcHJvIHphZGFuaSBwaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRkaWFsb2cgPSBXZmwuRGlhbG9ncy5HZW5lcm92YW5pSXhwRGxnKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCwgLy8gcGFyZW50Q29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyAgLy8gb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cERvazogV2ZsLkdsb2JhbHMuRW51bXMuVHlwRG9rLlZsYXN0bmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwSWQ6IFdmbC5HbG9iYWxzLkVudW1zLlR5cElkLklYUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb3RhelByaUV4aXN0ZW5jaVZKaW5lQWdlbmRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIbGFzZW5pUHJpRXhpc3RlbmNpVkFnZW5kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWnB1c29iR2VuZXJvdmFuaTogR29yZGljLldmbC5HbG9iYWxzLkVudW1zLlpwdXNvYkdlbmVyb3ZhbmlJeHAuUGFyYW1ldHJlbUdpbkdlbkl4cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93IC8vIE1vZCBvdGV2cmVuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm9yaW0geiBva25hIHByb21pc2UuIEEgdGVzdHVqaSBuYXZyYXRvdm91IGhvZG5vdHUgeiBva25hLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApITtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYXRpbSBwcm9taXNlLCBrdGVyeSBzbGlidWplLCB6ZSB2cmF0aSB2eXBsbmVub3UgaG9kbm90dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGRpYWxvZy5jcmVhdGVEaWFsb2dQcm9taXNlPElHUG9kYW5pTW9kZWw+KGRhdGEgPT4gZGF0YSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IElHUG9kYW5pTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0Lml4cCA9IGRhdGEuSXhwOyAvLyBVbG96aW0gc2kgemFkYW5lIGNpc2xvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0Lm1lbWJlciA9IGV4YyEuZGF0YSEubWVtYmVyOyAvLyBVbG96aW0gc2kgY2h5Ym92eSBrb2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFkZEluZm8gPSBleGMhLmRhdGEhLmFkZEluZm87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsUG9kYW5pKHJlcXVlc3QpOyAvLyBWb2xhbSByZWt1cnppdm5lIHBvZGFuaSBkb2tsYWR1IHNlIHptZW5lbnltIHJlcXVlc3RlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm9yIHNpIGpRdWVyeSBkaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZGlhbG9nID0gdGhhdC5kaWFsb2dzLmVycm9yKFwianJlczozMDE1MDEwMlwiKSAvL1JDIDMwMTUwMTAyIDogQWtjZSBieWxhIHN0b3Jub3bDoW5hIHXFvml2YXRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSB2cmF0IHNsaWIsIHplIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZGlhbG9nLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIik7IC8vdsW+ZHkgcmVqZWN0LCBuaWtkeSBuZXZyYXRpIHllc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBQT0RBTkkgRE9LTEFEVVxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm9yZW5pIHNsb3VwY3Ugc2V6bmFtdSBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7R29yZGljLkRhdGEuR3JpZEZvcm1hdDxURHRvPn0gcG9sZSBzbG91cGPFryBwcm8gZ2dyaWRcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gVnNlY2hueSBtZXRvZHkganNvdSB2IEdvcmRpYy5Fa28uV2ViQ2xpZW50L0Vrby9TZXpuYW0vZ3JpZC5tZXRob2RzLnRzXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoZG9jdW1lbnRQYXJhbXM6IEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudEdldENvbHVtblBhcmFtc1Jlc3BvbnNlRHRvIHwgbnVsbCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8VWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0bz4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PFVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG8+ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8VWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0bz4oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFR5cEVudGl0eSh7IGZyYWdtZW50OiBVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnR5cF9lbnRpdHlfaWNvIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVmxhc3RuaWN0dmkoeyBmcmFnbWVudDogVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy52bGFzdG5pY3R2aSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWN0ZW5vKClcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVldmlkZW5jZSh7IGZyYWdtZW50OiBVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnByZWV2aWRlbmNlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUG9jZXRFbFByaWxvaCh7IG5hbWU6IFwicG9jX2VwcmlcIiwgZmllbGQ6IFwicG9jX2VwcmlcIiwgZnJhZ21lbnQ6IEVrby5JbnRlcmZhY2UuR1dmbEZvckVrb0R0b05hbWVzLmVsX3ByaWxvaHlfcG9jZXQgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRFbE9icmF6KClcclxuICAgICAgICAgICAgICAgIC8vIFByaWRhbmkgc2xvdXBjdSBXRkxcclxuICAgICAgICAgICAgICAgIC5hZGRXZmxDb2x1bW5zKClcclxuICAgICAgICAgICAgICAgIC8vIGJhcmV2bmUgb3puYWNlbmkgcmFka3VcclxuICAgICAgICAgICAgICAgIC5hZGRCYXJldm5lT3puYWNlbmkoeyBmcmFnbWVudDogVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy51em8gfSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgKHJvdykgPT4gcm93Lml4c19mdW5fYWt0ICE9ICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0LCB0aGlzLmdsb2JhbFNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAvLyBEYXRhIHogaGxhdmlja3kgZG9rbGFkdSBcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gLSBudXRubyB2c3VkZSBkb3Bsbml0IGZyYWdtZW50eSB6IGR1dm9kdSBwcm9maWx1XHJcbiAgICAgICAgICAgICAgICAuYWRkUGlkKCkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLml4cCB9KTtcclxuICAgICAgICAgICAgICAgIC5hZGRBZ2VuZG92ZUNpc2xvKClcclxuICAgICAgICAgICAgICAgIC5hZGRFdmlkZW5jbmlDaXNsbygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRHJ1aERva2xhZHUoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvaygpXHJcbiAgICAgICAgICAgICAgICAuYWRkTWVzaWMoKVxyXG4gICAgICAgICAgICAgICAgLmFkZERlbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ2lzbG9Eb2tsYWR1KCkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLmFjX2l4ZSB9KTtcclxuICAgICAgICAgICAgICAgIC5hZGRUeXBEb2tsYWR1KCkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLml4c190eXBfdHh0IH0pO1xyXG4gICAgICAgICAgICAgICAgLmFkZFN0YXZEb2tsYWR1KCkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLnNfemF1X3R4dCB9KTtcclxuICAgICAgICAgICAgICAgIC5hZGRDYXN0a2EoeyBuYW1lOiBcImNcIiwgZmllbGQ6IFwiY1wiLCBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMjU4XCIgfSkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLmMgfSk7IC8vUkMgMzAyNTAyNTggOiDEjcOhc3RrYSBuYSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkWnByYWNvdmF0ZWwoeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuaXhzX2Z1bl9ha3RfdHh0IH0pIC8vLCB7IGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5peHNfZnVuX2FrdF90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAuYWRkUG9waXMoKVxyXG4gICAgICAgICAgICAgICAgLy8gcG9tb2NuZSBuZXZpZGl0ZWxuZSBwb2xlIHBybyBwb2RtaW5lbmUgZm9ybWF0b3ZhbmlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInNfemF1XCIsIGhpZGRlbjogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicHJlZXZpZG92YW5vXCIsIGhpZGRlbjogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicHJpel92aWV3XCIsIGhpZGRlbjogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY29wZURva3VtZW50ID0gdGhpcy5leHRlbmRTY29wZShcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIFVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuZG9rdW1lbnQsXHJcbiAgICAgICAgICAgICAgICBcIkRva3VtZW50XCIsIC8vXCJqcmVzOjMwMjUwNTAwXCIsIC8vUkMgMzAyNTA1MDAgOiBEb2t1bWVudFxyXG4gICAgICAgICAgICAgICAgXCJcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyBzbG91cGNlIGRva3VtZW50dVxyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnRQYXJhbXMgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Tc2wuV2ViQ2xpZW50LkdEb2t1bWVudElzbC5BZGRHcmlkQ29sdW1uc0ltbWVkaWF0ZShcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAgICAgIEdTZXpuYW1Eb2tsYWR1VGFiLmdldFByZXNldERva3VtZW50Q29sdW1ucygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGVMZXZlbHM6IHNjb3BlRG9rdW1lbnRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBsZXQgc2NvcGVWbGFzdG5vc3RpID0gdGhpcy5leHRlbmRTY29wZShcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIFVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG9GcmFnbWVudHMudmxhc3Rub3N0aSxcclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDUwMVwiLCAvL1JDIDMwMjUwNTAxIDogVmxhc3Rub3N0aVxyXG4gICAgICAgICAgICAgICAgLy9cIlZsYXN0bm9zdGkgc291cGlza3lcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBsZXQgc2NvViA9IChzY29wZVZsYXN0bm9zdGkubWFwKGkgPT4gaS5zY29wZSkgYXMgc3RyaW5nW10pLmpvaW4oR2luLldlYkNsaWVudC5HU2hhcmVkSXNsLk5hbWVTZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICBsZXQgc2NvVlQgPSAoc2NvcGVWbGFzdG5vc3RpLm1hcChpID0+IGk/LnNjb3BlVGl0bGUpLmZpbHRlcihpID0+IGk/LnRyaW0oKSkgYXMgc3RyaW5nW10pLmpvaW4oXCIgLSBcIik7XHJcbiAgICAgICAgICAgIGxldCBzeHNUeXA6IHsgc3hzOiBzdHJpbmcgfCBudWxsLCB0eXBfb2JqOiBudW1iZXIgfVtdID0gW3sgc3hzOiBudWxsLCB0eXBfb2JqOiBVY3QuSW50ZXJmYWNlLkdFVHlwT2JqZWt0dS5LbmloYVJPWiB9XTtcclxuICAgICAgICAgICAgdGhpcy5peHNUeXB5LmZvckVhY2goaXRlbSA9PiBzeHNUeXAucHVzaCh7IHN4czogaXRlbSwgdHlwX29iajogVWN0LkludGVyZmFjZS5HRVR5cE9iamVrdHUuVHlwRG9rdW1lbnR1IH0pKTtcclxuICAgICAgICAgICAgLy8gUm96c2lyZW5lIHZsYXN0bm9zdGlcclxuICAgICAgICAgICAgY29sdW1ucy5hZGQoR29yZGljLlBvcGlzbmVWbGFzdG5vc3RpLmNyZWF0ZVN4c1R5cEdyaWRGb3JtYXQoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb1YsXHJcbiAgICAgICAgICAgICAgICAgICAgaXhzX3R5cDogdGhpcy5peHNUeXB5LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cF9vYmo6IFtVY3QuSW50ZXJmYWNlLkdFVHlwT2JqZWt0dS5LbmloYVJPWl0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3hzX3R5cDogc3hzVHlwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlVGl0bGU6IHNjb1ZUXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICAvLyB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgIC8vY29sdW1ucy5hZGQoR29yZGljLlBvcGlzbmVWbGFzdG5vc3RpLmNyZWF0ZUdyaWRGb3JtYXQoXCJ2bGFzdG5vc3RpXCIpKVxyXG4gICAgICAgICAgICAvLyAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogU2V6bmFtIGFrY8OtIHBybyBtZW51IChoYW1idXJnZXIgbmVibyBrb250ZXh0b3bDqSBtZW51IGdyaWR1KVxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29udGV4dE1lbnUgZm9ybcOhdCBwcm8ga29udGV4dG92w6kgbWVudSBncmlkdSAodHJ1ZSAoZGVmYXVsdCkgPSBhbm8sIGZhbHNlID0gbmUpXHJcbiAgICAgICAgICAgICogQHBhcmFtIHtJR0dyaWRDZWxsQ29udGV4dDxHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwb2N0b3Z5TGlzdER0bz4gfCB1bmRlZmluZWR9IGNlbGxDb250ZXh0IGtvbnRleHQgeiBncmlkdSAocG91emUgcHJvIGNvbnRleHRNZW51ID0gdHJ1ZSkgKGRlZmF1bHQgPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICogQHJldHVybnMgeyhzdHJpbmcgfCB1bmRlZmluZWQpW10gfCAoc3RyaW5nIHwgKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IHsgYWN0aW9uOiBHQWN0aW9uIHwgdW5kZWZpbmVkOyBwcmltYXJ5OiB0cnVlOyBmYXZvcml0ZTogdHJ1ZTsgfSlbXX0gc2V6bmFtIGFrY8OtXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRNZW51QWN0aW9ucyhjb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlLCBjZWxsQ29udGV4dDogSUdHcmlkQ2VsbENvbnRleHQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbURva2xhZHVEdG8+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKTogKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IChzdHJpbmcgfCAoc3RyaW5nIHwgdW5kZWZpbmVkKVtdIHwgeyBhY3Rpb246IEdBY3Rpb24gfCB1bmRlZmluZWQ7IHByaW1hcnk6IHRydWU7IGZhdm9yaXRlOiB0cnVlOyB9KVtdIHwgTWVudVBhcmFtc1tdIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbXCJhY3RQb2RhbmlcIiwgXCJhY3REZXRhaWxcIiwgXCItXCIsIFtcImpyZXM6MzAyNTAyNzFcIiwgXCJ0aXNrUG9sb3pla1JEQWN0XCIsIFwidGlza3ZzZWNoUkREQWN0XCIsLy9SQyAzMDI1MDI3MSA6IFRpc2tcclxuICAgICAgICAgICAgICAgIFwiLVwiLCBcImpyZXM6MzAyNTAwODhcIiwgXCJ0aXNrWmF2ZXJSb3pwT3BhdHJlbmlBY3RcIiwgXCJ0aXNrT2Nla2F2YW5hU2t1dGVjbm9zdEFjdFwiLCBcInRpc2tWeXBvcmFkYW5pUm96cG9jdHVBY3RcIiwgXCJ0aXNrTWltb3JvenBvY3RvdmVQcm9zdHJlZGt5QWN0XCIsIFwidGlza1ByZXZvZERvUkZBY3RcIiwgXCJ0aXNrUHJldm9kTVJaRG9SRkFjdFwiLCAvL1JDIDMwMjUwMDg4IDogUMWZZWhsZWQgcG/FmcOtemVuw71jaCBwb2xvxb5layBSRFxyXG4gICAgICAgICAgICAgICAgXCItXCIsIFwidGlza3ZzZWNoUkREQWN0XCIsIFwidGlza3Z5YnJhbnljaFJEQWN0XCJdLyosIFwiLVwiLCBcImFjdE9iY2Vyc3R2aXRTZXpuYW1cIiovXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgOiBbXCJhY3RQb2RhbmlEb2tsYWR1KlwiLCB7IGFjdGlvbjogY29udGVudC5hY3Rpb25zLmFjdERldGFpbERva2xhZHUsIHByaW1hcnk6IHRydWUsIGZhdm9yaXRlOiB0cnVlIH0sIFtcImpyZXM6MzAyNTA1OTZcIiwgXCJhY3RIcm9tVXphdkRva2xWeWJcIiwgXCJhY3RIcm9tYWRuZVphdWN0b3ZhbmlcIiwgXCJhY3RIcm9tYWRuYVByZWV2aWRlbmNlXCIsIFwiYWN0SHJvbWFkbmVQcmV2emV0aVwiLCBcImFjdEhyb21hZG5hS29udHJvbGFNZXRhZGF0XCIsIFwiYWN0T3puYWNpdFByZWN0ZW5lXCJdLCBcImFjdE96bmFjaXROZXByZWN0ZW5lKlwiXTsgLy9SQyAzMDI1MDU5NiA6IEhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFDFmWlkw6Fuw60gZGFsxaHDrSDDunJvdm7EmyBkbyBzY29wZVxyXG4gICAgICAgICogXHJcbiAgICAgICAgKiBAcGFyYW0ge0dpbi5XZWJDbGllbnQuR1Njb3BlT3B0aW9uTGV2ZWxbXSB8IHVuZGVmaW5lZH0gc2NvcGUgc2NvcGVcclxuICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdTY29wZSBub3bDvSBzY29wZVxyXG4gICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtuZXdTY29wZVRpdGxlV09TY29wZV0gdGl0dWxlayBub3bDqWhvIHNjb3BlIHBybyBwxZlpZMOhbsOtIGRvIHByw6F6ZG7DqWhvIHNjb3BlXHJcbiAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW25ld1Njb3BlVGl0bGVXU2NvcGVdIHRpdHVsZWsgbm92w6lobyBzY29wZSBwcm8gcMWZaWTDoW7DrSBkbyBuZXByw6F6ZG7DqWhvIHNjb3BlXHJcbiAgICAgICAgKiBAcmV0dXJucyB7R2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdfSB2w71zbGVkbsO9IHNjb3BlXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGV4dGVuZFNjb3BlKHNjb3BlOiBHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10gfCB1bmRlZmluZWQsIG5ld1Njb3BlOiBzdHJpbmcsIG5ld1Njb3BlVGl0bGVXT1Njb3BlPzogc3RyaW5nLCBuZXdTY29wZVRpdGxlV1Njb3BlPzogc3RyaW5nKTogR2luLldlYkNsaWVudC5HU2NvcGVPcHRpb25MZXZlbFtdIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvxI1lc2F0XHJcbiAgICAgICAgICAgIGxldCBleHRlbmRlZFNjb3BlOiBHaW4uV2ViQ2xpZW50LkdTY29wZU9wdGlvbkxldmVsW10gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHNjb3BlTGVuID0gc2NvcGU/Lmxlbmd0aCB8fCAwO1xyXG4gICAgICAgICAgICBzY29wZT8uZm9yRWFjaCgoaXRlbSwgbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGwgPT0gc2NvcGVMZW4gLSAxICYmIG5ld1Njb3BlVGl0bGVXU2NvcGUpIGV4dGVuZGVkU2NvcGUucHVzaCh7IHNjb3BlOiBpdGVtLnNjb3BlIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBleHRlbmRlZFNjb3BlLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBleHRlbmRlZFNjb3BlLnB1c2goeyBzY29wZTogbmV3U2NvcGUsIHNjb3BlVGl0bGU6IChzY29wZSA/IChuZXdTY29wZVRpdGxlV1Njb3BlID8/IG5ld1Njb3BlVGl0bGVXT1Njb3BlKSA6IG5ld1Njb3BlVGl0bGVXT1Njb3BlKSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGV4dGVuZGVkU2NvcGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhyb21hZG5lIG9wZXJhY2VcclxuICAgICAgICAgKiBAcGFyYW0gdHlwT3BlcmFjZSBlbnVtZXJhdG9yIHByb3ZhZGVuZSBocm9tYWRuZSBvcGVyYWNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBIcm9tYWRuZU9wZXJhY2UoY29udGVudDogR1Nlem5hbURva2xhZHVUYWIsIHR5cE9wZXJhY2U6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlKSB7XHJcbiAgICAgICAgICAgIC8vIHpqaXN0ZW5pIG96bmFjZW55Y2ggcmFka3VcclxuICAgICAgICAgICAgbGV0IG96bmFjZW5lUmFka3kgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG8+KHRoaXMuJGdyaWQsIGZhbHNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAob3puYWNlbmVSYWRreSA9PT0gbnVsbCB8fCBvem5hY2VuZVJhZGt5ID09PSB1bmRlZmluZWQgfHwgb3puYWNlbmVSYWRreS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDA2N1wiLCAvL1JDIDMwMjUwMDY3IDogVXBvem9ybsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMTA2XCIpOyAgLy9SQyAzMDI1MDEwNiA6IE5lbmFsZXplbnkgxb7DoWRuw6kgb3puYcSNZW7DqSDFmcOhZGt5XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgYWtjZSBkZXRhaWxcclxuICAgICAgICAgICAgdmFyIGdyaWRBY3Rpb25EZXRhaWwgPSBuZXcgR0FjdGlvbigkLmV4dGVuZCh0cnVlLCBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNudCA9ICQuY29udGVudChldi50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRncmlkID0gJChjdHguZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRncmlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9obGVkw6Fuw60gYWt0dcOhbG7DrWhvIHrDoXpuYW11IGEgem9icmF6ZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFrdFJhZGVrOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0byA9ICgkZ3JpZCBhcyBhbnkpLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWt0UmFkZWsgJiYgIShha3RSYWRlayBpbnN0YW5jZW9mIGpRdWVyeSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUm96LldlYkNsaWVudC5ab2JyYXpEZXRhaWxEbGVJWFAoY250LCBha3RSYWRlay5peHAgYXMgYW55LCBudWxsLCBmYWxzZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGFrdFJhZGVrLml4cF9kZW4gYXMgYW55KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1pvYnJhekRldGFpbChjbnQsIGFrdFJhZGVrKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pLCB7IG5hbWU6IEFjdGlvbnMuRGV0YWlsIH0pKTtcclxuXHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cE9wZXJhY2UpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VVY3RIcm9tYWRuZU9wZXJhY2UuUHJlZXZpZGVuY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Icm9tYWRuYUFrY2lSdW4odGhpcywgb3puYWNlbmVSYWRreSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHR5cE9wZXJhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogMTJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBhY3Rpb05hbWU6IFwianJlczozMDI1MDMxMlwiLCAvL1JDIDMwMjUwMzEyIDogUMWZZWV2aWRvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAyNzhcIiwgLy9SQyAzMDI1MDI3OCA6IEFrY2UgcHJvdmVkZSBwxZllZXZpZGVuY2kgdnlicmFuw71jaCBkb2tsYWTFryBkbyBqaW7DqSBrbmloeS4gUMWZaSBwxZllZXZpZGVuY2kgamUgbW/Fvm7DqSB6bcSbbml0IFpwcmFjb3ZhdGVsZSwgcMWZw61wYWRuxJsgS29tcGV0ZW50YS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDI3NlwiLCAvL1JDIDMwMjUwMjc2IDogUMWZZWV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlQnJlYWRDcnVtYjogXCJqcmVzOjMwMjUwMjg1XCIgLy9SQyAzMDI1MDI4NSA6IFDFmWVldmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGdyaWRBY3Rpb25EZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmVkYW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSHJvbWFkbmFBa2NpUnVuKHRoaXMsIG96bmFjZW5lUmFka3ksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0eXBPcGVyYWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRFNlc3Rhdnk6IDIyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgYWN0aW9OYW1lOiBcImpyZXM6MzAyNTAzNTFcIiwgLy9SQyAzMDI1MDM1MSA6IFDFmWVkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDI4OVwiLCAvL1JDIDMwMjUwMjg5IDogQWtjZSBwcm92ZWRlIHDFmWVkw6Fuw60gdnlicmFuw71jaCAoemHFoWtydG51dMO9Y2gpIGRva2xhZMWvIGppbsOpbXUgenByYWNvdmF0ZWxpLiBQxZlpIHDFmWVkw6Fuw60gamUgcMWZw61wYWRuxJsgbW/Fvm7DqSB6bcSbbml0IEtvbXBldGVudGEgZG9rbGFkdS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5VY3QuV2ViQ2xpZW50LkdVY3RQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDI5MFwiLCAvL1JDIDMwMjUwMjkwIDogUMWZZWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUJyZWFkQ3J1bWI6IFwianJlczozMDI1MDI5MVwiIC8vUkMgMzAyNTAyOTEgOiBQxZllZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZ3JpZEFjdGlvbkRldGFpbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLktvbnRyb2xhTWV0YWRhdDpcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLktvbnRyb2xhTWV0YWRhdCh7IGNvbnRlbnQ6IGNvbnRlbnQsIGxpc3RJeHA6IG96bmFjZW5lUmFka3kubWFwKChyb3cpID0+IHJvdy5peHAhKSwgZGV0YWlsQWtjZTogWm9icmF6RGV0YWlsSXhwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlByZXZ6ZXRpOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSHJvbWFkbmFBa2NpUnVuKHRoaXMsIG96bmFjZW5lUmFka3ksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0eXBPcGVyYWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRFNlc3Rhdnk6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBhY3Rpb05hbWU6IFwianJlczozMDI1MDM1M1wiLCAvL1JDIDMwMjUwMzUzIDogUMWZZXZ6w610XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAyOTZcIiwgLy9SQyAzMDI1MDI5NiA6IEFrY2UgcHJvdmVkZSBwxZlldnpldMOtIHZ5YnJhbsO9Y2ggKHphxaFrcnRudXTDvWNoKSBkb2tsYWTFryBvZCBqaW7DqWhvIHpwcmFjb3ZhdGVsZS4gUMWZaSBwxZlldnpldMOtIGplIHDFmcOtcGFkbsSbIG1vxb5uw6kgem3Em25pdCBLb21wZXRlbnRhIGRva2xhZHUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDI5N1wiLCAvL1JDIDMwMjUwMjk3IDogUMWZZXZ6w610XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlQnJlYWRDcnVtYjogXCJqcmVzOjMwMjUwMjk3XCIgLy9SQyAzMDI1MDI5NyA6IFDFmWV2esOtdFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGdyaWRBY3Rpb25EZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEhyb21hZG5lT3BlcmFjZS5QcmlkZWxlbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Icm9tYWRuYUFrY2lSdW4odGhpcywgb3puYWNlbmVSYWRreSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHR5cE9wZXJhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEU2VzdGF2eTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIGFjdGlvTmFtZTogXCJqcmVzOjMwMjUwMjk5XCIsIC8vUkMgMzAyNTAyOTkgOiBQxZlpZMSbbGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAyOThcIiwgLy9SQyAzMDI1MDI5OCA6IFDFmWlkxJtsaXQgZG9rbGFkeSBqaW7DqSBmdW5rY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdQcmludFBhcmFtZXRlcnM6U2VydmVyUGFyYW1ldGVyTWV0aG9kVGlza3lOYVNlem5hbXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJ3ZmxfcHRtX2hyb21wcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDI5OVwiLCAvL1JDIDMwMjUwMjk5IDogUMWZaWTEm2xpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUJyZWFkQ3J1bWI6IFwianJlczozMDI1MDI5OVwiIC8vUkMgMzAyNTAyOTkgOiBQxZlpZMSbbGl0XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZ3JpZEFjdGlvbkRldGFpbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0SHJvbWFkbmVPcGVyYWNlLlV6YXZyZW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSHJvbWFkbmFBa2NpUnVuKHRoaXMsIG96bmFjZW5lUmFka3ksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0eXBPcGVyYWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRFNlc3Rhdnk6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBhY3Rpb05hbWU6IFwianJlczozMDI1MDMwMFwiLCAvL1JDIDMwMjUwMzAwIDogVXphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAzMDJcIiwgLy9SQyAzMDI1MDMwMiA6IFV6YXbFmWVuw60gZG9rbGFkxa8uIFMgdXphdsWZZW7DvW1pIGRva2xhZHkgamnFviBuZWpkZSBkw6FsZSBwcmFjb3ZhdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcIndmbF9wdG1faHJvbXByZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMzAwXCIsIC8vUkMgMzAyNTAzMDAgOiBVemF2xZnDrXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVCcmVhZENydW1iOiBcImpyZXM6MzAyNTAzMDBcIiAvL1JDIDMwMjUwMzAwIDogVXphdsWZw610XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZ3JpZEFjdGlvbkRldGFpbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZGlhbG9ncy5hbGVydChcImpyZXM6MzAyNTAzMDlcIiwgLy9SQyAzMDI1MDMwOSA6IFVwb3pvcm7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpyZXM6MzAyNTAzMDhcIik7ICAvL1JDIDMwMjUwMzA4IDogTmV6bsOhbcOhIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTcHVzdGVuaSBocm9tYWRlIG9wZXJhY2VcclxuICAgICAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgICAgICogQHBhcmFtIHNlbGVjdGVkUm93c1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0gZGV0YWlsQWtjZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEhyb21hZG5hQWtjaVJ1bihjb250ZW50OiBHU2V6bmFtRG9rbGFkdVRhYiwgc2VsZWN0ZWRSb3dzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b1tdXHJcbiAgICAgICAgICAgICwgbmFzdGF2ZW5pOiBJR0hyb21hZG5lT3BlcmFjZSwgZGV0YWlsQWtjZTogR0FjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICBsZXQgY250V2l6OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgICAgICB2YXIgYWN0VGlza0hyb21hZG5hQWtjZSA9IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2VsZWN0XCIsIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJcIiwgcnVuOiBmdW5jdGlvbiAoKSB7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKG5hc3RhdmVuaS5JRFNlc3RhdnkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgYWN0VGlza0hyb21hZG5hQWtjZSA9IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza0hyb21hZG5hQWtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IG5hc3RhdmVuaS50ZW1hLCAgICAvL3RlbWFcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IG5hc3RhdmVuaS5zZXJ2ZXJQYXJhbWV0ZXJNZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogbmFzdGF2ZW5pLklEU2VzdGF2eSAhPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNudFdpeik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aXogPSBjbnRXaXouZmluZChcIi5nZ3JpZFwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICRncmlkID0gJCh3aXopO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlem5hbSA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93czxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0VnlicmFueURva2xhZER0bz4oJGdyaWQsIHRydWUpIGFzIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RWeWJyYW55RG9rbGFkRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhyb21hZG5hT3BlcmFjZUdldFBhcmFtKHRoYXQuZGlhbG9ncywgY250V2l6LCBzZXpuYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgVGVtYTogcmVwLnRlbWEsIElEU2VzdGF2eTogbmFzdGF2ZW5pLklEU2VzdGF2eSwgU2V6bmFtUGlkdTogc2V6bmFtLCBEYXRhOiByZXN1bHQgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtb2RlbERhdGE6IElHUHJlZXZpZGVuY2VNb2RlbCA9IHsgZHV2b2Q6IHVuZGVmaW5lZCwgaXhzX2Z1bl9ha3Q6IFwiXCIsIGl4c19zdTogXCJcIiwgaXhzX3JlZjogXCJcIiwgY2lzX3JlYWw6IFwiXCIsIGl4c19mdW5fdnlyaXo6IFwiXCIsIGl4cF9kZW46IFwiXCIsIHN1YnJhZGE6IG51bGwgfTtcclxuICAgICAgICAgICAgbGV0IGZvcm1QYXJhbXMgPSBIcm9tYWRuYU9wZXJhY2Vmb3JtKG5hc3RhdmVuaS5hY3Rpb24sIGNvbnRlbnQsIGNvbnRlbnQuZWtvQm9vay5peHBfZGVuISk7XHJcblxyXG5cclxuICAgICAgICAgICAgY250V2l6ID0gdGhhdC5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvPj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCxcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGl0dWxlayB2IGJyZWFkY3J1bWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5hc3RhdmVuaS50aXRsZSwgLy9SQyAzMDI1MDY4NCA6IFDFmWVkw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3Jtw6F0IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogdGhhdC5jcmVhdGVHcmlkRm9ybWF0SHJvbWFkbmVPcGVyYWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJpbcOhcm7DrSBrbMOtxI0gZGF0IHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICBrZXlzOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRhdGEgcHJvIGdyaWQgKHBybyBwcnZuw60ga3JvaylcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LlNldERhdGFTZWxlY3RlZChzZWxlY3RlZFJvd3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHR5cCBpbmRpa8OhdG9yxa8gbmFkIGdyaWRlbSAoS1BJIG5lYm8gYmFkZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJ2bsOtIGtyb2sgLSB6YWTDoW7DrSBwYXJhbWV0csWvIGEga29udHJvbGEsIHDFmWkgcMWZZWNob2R1IG5hIGRhbMWhw60ga3JvayBzZSB6YXZvbMOhIHNwdcWhdMSbbsOtIHZsYXN0bsOtIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhemV2IGtyb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAyNTAyOTVcIiwgLy9SQyAzMDI1MDI5NSA6IFphZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcGlzIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IG5hc3RhdmVuaS5kZXNjcmlwdGlvbiwgLy9SQyAzMDI1MDY0OSA6IEFrY2UgcHJvdmVkZSBwxZllZMOhbsOtIHZ5YnJhbsO9Y2ggKHphxaFrcnRudXTDvWNoKSBkb2tsYWTFryBqaW7DqW11IHpwcmFjb3ZhdGVsaS4gUMWZaSBwxZllZMOhbsOtIGplIHDFmcOtcGFkbsSbIG1vxb5uw6kgem3Em25pdCBLb21wZXRlbnRhIGRva2xhZHUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hZCBncmlkZW0gem9icmF6aXQgS1BJL2JhZGdlIHMgcG/EjXR5IHrDoXpuYW3Fr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3JtdWzDocWZIHMgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1QYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vZGVsIHBybyBwYXJhbWV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiBtb2RlbERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9ybVRhYlRpdGxlOiBcIlBhcmFtZXRyeSBzdG9ybmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFkcGlzIHRhYnUgcyBncmlkZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzAyNTAyOTRcIiwgLy9SQyAzMDI1MDI5NCA6IFZ5YnJhbsOpIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB6bcSbbnkgcGFyYW1ldHJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkQ2hhbmdlRGVsZWdhdGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gc3B1c3Rlbmkga29udHJvbHUgdXppdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGEgPSBtb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50LmlzbC5Sb3pEb2tsYWQuaHJvbWFkbmVPcGVyYWNlVmFsaWRhY2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrY2U6IG5hc3RhdmVuaS5hY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBTZXpuYW06IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJeHBEZW5OZXc6IG1vZGVsLml4cF9kZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJeHNGdW5OZXc6IG1vZGVsLml4c19mdW5fYWt0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgSXhzUmVmTmV3OiBtb2RlbC5peHNfcmVmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgQ2lzUmVhbDogbW9kZWwuY2lzX3JlYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5nZXREYXRhKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsOhemV2IGFrY2UsIGt0ZXLDoSBwcm92ZWRlIHBvxb5hZG92YW5vdSBvcGVyYWNpICh0bGHEjcOtdGtvIHZwcmF2byBkb2xlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uTmFtZTogbmFzdGF2ZW5pLmFjdGlvTmFtZSwgLy9SQyAzMDI1MDY1MCA6IFDFmWVkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWV0b2RhIHZvbGFuw6EgcMWZaSBwxZllY2hvZHUgbmEgZGFsxaHDrSBrcm9rIChwcm92ZWRlbsOtIHZsYXN0bsOtIG9wZXJhY2UpIChwcmFjdWplIG5hZCBkYXR5IHplIHZzdHVwdSwgdnJhY8OtIGFrdHXDoWxuw60gZGF0YSB6IGRhdGFiw6F6ZSArIHbDvXNsZWRlayBvcGVyYWNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YSA9IG1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlJvekRva2xhZC5ocm9tYWRuZU9wZXJhY2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrY2U6IG5hc3RhdmVuaS5hY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBTZXpuYW06IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBEdXZvZDogbW9kZWxEYXRhLmR1dm9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgSXhzRnVuTmV3OiBtb2RlbERhdGEuaXhzX2Z1bl9ha3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBpeHBEZW46IGdldEl4cERlbih0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEl4cERlbk5ldzogbW9kZWxEYXRhLml4cF9kZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJeHNTdTogbW9kZWxEYXRhLml4c19zdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIENpc1JlYWw6IG1vZGVsRGF0YS5jaXNfcmVhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIEl4c1JlZk5ldzogbW9kZWxEYXRhLml4c19yZWZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBJeHNGdW5WeXJpejogbW9kZWxEYXRhLml4c19mdW5fdnlyaXpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0dXJuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnRlbnQuc2hvd0ZsYXNoKHsgbGFiZWw6IFwianJlczozMDI1MDY0N1wiIH0pIC8vUkMgMzAyNTA2NDcgOiBBa2NlIHByb3ZlZGVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBuYSB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVHcmlkQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBkZXRhaWxBa2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogYWN0VGlza0hyb21hZG5hQWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2Ugdm9sYW7DoSBuYSBkdm9qa2xpayB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGRldGFpbEFrY2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBkcnVow70gKHBvc2xlZG7DrSkga3JvayAtIHpvYnJhemVuw60gdsO9c2xlZGt1IG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICBsYXN0U3RlcDpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoXpldiBrcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMjkyXCIsIC8vUkMgMzAyNTAyOTIgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9ybXVsw6HFmSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RlbCBwcm8gcGFyYW1ldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YTogKCkgPT4geyByZXR1cm4gbW9kZWxEYXRhOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWRwaXMgdGFidSBzIHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Zvcm1UYWJUaXRsZTogXCJQYXJhbWV0cnkgc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmFtZXRyeSBqc291IHYgdG9tdG8ga3Jva3UgamnFviBuZWVkaXRvdmF0ZWxuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlRm9ybUZpZWxkczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hZHBpcyB0YWJ1IHMgZ3JpZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMwMjUwMjkzXCIsIC8vUkMgMzAyNTAyOTMgOiBacHJhY292YW7DqSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgbmEgdGFidSBzIGdyaWRlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogZGV0YWlsQWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrY2Ugdm9sYW7DoSBuYSBkdm9qa2xpayB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IGRldGFpbEFrY2VcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIMO6c3DEm8WhbsOpaG8gdWtvbsSNZW7DrSBwcsWvdm9kY2UgKG5hIHJvemTDrWwgb2QgenJ1xaFlbsOtIHByxa92b2RjZSBwxZllc2VsZWt0b3bDoXbDoSBzZXpuYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKHZpZXcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFJvd3NGcm9tREIoY29udGVudCwgdmlldy5nZXREYXRhUm93cyhmYWxzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUm93c0Zyb21EQihjb250ZW50LCB2aWV3LmdldERhdGFSb3dzKGZhbHNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb2JzbHVoYSB6cnXFoWVuw60gcHLFr3ZvZGNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9GdWNHcmlkLndpemFyZEVuZCh0aGF0LCBpa2MsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5hc3RhdmVuaS50aXRsZUJyZWFkQ3J1bWIsIC8vUkMgMzAyNTA2ODQgOiBQxZllZMOhbsOtXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPem5hY2VuaSBkb2tsYWR1IFxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHNlbGVjdGVkUm93c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgU2V0RGF0YVNlbGVjdGVkKHNlbGVjdGVkUm93czogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelZ5YnJhbnlEb2tsYWREdG9bXSk6IEpRdWVyeVByb21pc2U8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelZ5YnJhbnlEb2tsYWREdG9bXT4ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJvd3MuZm9yRWFjaCgocm93KSA9PiB7IHJvd1tcIndpel9jaGVja1wiXSA9IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShzZWxlY3RlZFJvd3MpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm9yZW5pIHNsb3VwY3Ugc2V6bmFtdSAgaHJvbWFkbnljaCBvcGVyYWNpXHJcbiAgICAgICAgKiBcclxuICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PFREdG8+fSBwb2xlIHNsb3VwY8WvIHBybyBnZ3JpZFxyXG4gICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXRIcm9tYWRuZU9wZXJhY2UoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvPiB7XHJcblxyXG4gICAgICAgICAgICAvLyBWc2VjaG55IG1ldG9keSBqc291IHYgR29yZGljLkVrby5XZWJDbGllbnQvRWtvL1Nlem5hbS9ncmlkLm1ldGhvZHMudHNcclxuICAgICAgICAgICAgLy8gUHJhemRuZSBwb2xlIHNsb3VwY3UgcHJvIGdyaWRcclxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvPigpXHJcbiAgICAgICAgICAgICAgICAvLyBEYXRhIHogaGxhdmlja3kgZG9rbGFkdSBcclxuICAgICAgICAgICAgICAgIC5hZGRQaWQoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgLmFkZEFnZW5kb3ZlQ2lzbG8oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEV2aWRlbmNuaUNpc2xvKClcclxuICAgICAgICAgICAgICAgIC5hZGREcnVoRG9rbGFkdSgpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm9rKClcclxuICAgICAgICAgICAgICAgIC5hZGRNZXNpYygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRGVuKClcclxuICAgICAgICAgICAgICAgIC5hZGRDaXNsb0Rva2xhZHUoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuYWNfaXhlIH0pO1xyXG4gICAgICAgICAgICAgICAgLmFkZFR5cERva2xhZHUoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuaXhzX3R5cF90eHQgfSk7XHJcbiAgICAgICAgICAgICAgICAuYWRkU3RhdkRva2xhZHUoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2Uuc196YXVfdHh0IH0pO1xyXG4gICAgICAgICAgICAgICAgLmFkZENhc3RrYSh7IG5hbWU6IFwiY1wiLCBmaWVsZDogXCJjXCIsIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAyNThcIiB9KSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuYyB9KTsgLy9SQyAzMDI1MDI1OCA6IMSNw6FzdGthIG5hIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRacHJhY292YXRlbCh7IGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy5peHNfZnVuX2FrdF90eHQgfSkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLml4c19mdW5fYWt0X3R4dCB9KTtcclxuICAgICAgICAgICAgICAgIC5hZGRQb3BpcygpXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW5zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogWm9icmF6ZW7DrSBkZXRhaWx1IGRva2xhZHUgdiBub3ZlIHphbG96Y2UgcHJvaGxpemVjZVxyXG4gICAgICAgICAgICAqIFxyXG4gICAgICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWxJbk5ld1RhYigpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG15R3JpZCA9IGdldEdyaWQodGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChteUdyaWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFrdFJhZGVrID0gRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtRG9rbGFkdUR0bz4obXlHcmlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChha3RSYWRlayAmJiAhKGFrdFJhZGVrIGluc3RhbmNlb2YgalF1ZXJ5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdSBha3R1w6FsbsOtIHZ5YnJhbsOpIHBvbG/Fvmt5IHYgbm92w6kgesOhbG/FvmNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZW5EZXRhaWxJbk90aGVyVGFiKGFrdFJhZGVrLnR5cF9hZywgYWt0UmFkZWsuaXhwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNsb3VwY2UsIGt0ZXJlIHNlIHByaWRhamkgZG8gc2V6bmFtdSB6IGRva3VtZW50dSAoU1NMKVxyXG4gICAgICAgICAqIEByZXR1cm5zIFBvbGUgc2xvdXBjZSBrdGVyZSBsemUgem9icmF6aXQgbmEgc2V6bmFtdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRQcmVzZXREb2t1bWVudENvbHVtbnMgPSAoKTogR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50Q29sdW1uTmFtZXNbXSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXCJwb3ppY2Vfc3Bpc19pY29cIiwgXCJpeHBfc3Bpc1wiLCBcInByaXpfc3Bpc1wiLCBcIml4c19zdV9ha3RcIiwgXCJuYXpldlwiLCBcImFrdF96bmFja2FcIiwgXCJzdGF2X2Rpc3RcIiwgXCJzdGF2X3Bpc1wiLCBcInNfcHJpalwiLCBcInNfc3NsXCIsIFwiZGF0X3ptZW5hXCIsIFwiem1lbnVfcHJvdlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzX2VsZVwiLCBcInNfZnl6XCIsIFwic3Bpc19wbFwiLCBcInNwaXNfem5ha1wiLCBcIml4c19mdW5fd2ZsXCIsIFwiaXhzX3N1X3dmbFwiLCBcImRhdF92eXJpelwiLCBcInNfc2NodmFsXCIsIFwic2thcl96bmFrXCIsIFwic2thcl9saHV0YVwiLCBcInJva19zcG9fdWRhXCIsIFwicm9rX3NrYXJ0YWNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInBvY19saXN0dVwiLCBcInBvY19zdHJhblwiLCBcInBvY19rb3BcIiwgXCJwb2NfcHJpbG9oXCIsIFwicG9jX2xfcHJpbG9oXCIsIFwiY2pcIiwgXCJQcml6VkJhbGlrdVwiLCBcIml4c196dXBcIiwgXCJQcml6UG96U2thclwiLCBcInRlY2huaWNrZV92bGFzdG5vc3RpX2ljb1wiXTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaWx0cnkgU1NMLCBkbGUga3RlcnljaCBsemUgc2V6bmFtIHogZG9rdW1lbnR1IChTU0wpIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRQcmVzZXREb2t1bWVudEZpZWxkcyA9ICgpOiBHb3JkaWMuU3NsLldlYkNsaWVudC5HRG9rdW1lbnRGaWVsZE5hbWVzW10gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gW1wiaXhwX3NwaXNcIiwgXCJwcml6X3NwaXNcIiwgXCJpeHNfc3VfYWt0XCIsIFwibmF6ZXZcIiwgXCJha3Rfem5hY2thXCIsIFwic3Rhdl9kaXN0XCIsIFwic3Rhdl9waXNcIiwgXCJzX3ByaWpcIiwgXCJzX3NzbFwiLCBcImRhdF96bWVuYVwiLCBcInptZW51X3Byb3ZcIiwgXCJzX2VsZVwiLCBcInNfZnl6XCIsXHJcbiAgICAgICAgICAgICAgICBcInV6b1wiLCBcInNwaXNfcGxcIiwgXCJzcGlzX3puYWtcIiwgXCJpeHNfZnVuX3dmbFwiLCBcIml4c19zdV93ZmxcIiwgXCJkYXRfdnlyaXpcIiwgXCJzX3NjaHZhbFwiLCBcInNrYXJfem5ha1wiLCBcInNrYXJfbGh1dGFcIiwgXCJyb2tfc3BvX3VkYVwiLCBcInJva19za2FydGFjZVwiLCBcInBvY19saXN0dVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwb2Nfc3RyYW5cIiwgXCJwb2Nfa29wXCIsIFwicG9jX3ByaWxvaFwiLCBcInBvY19sX3ByaWxvaFwiLCBcImNqXCIsIFwiaXhzX3p1cFwiXTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gTmF2cmF0b3ZlIGhvZG5vdHkgeiBmb3JtdWxhcmUgcHJvIHBvZGFuaVxyXG4gICAgaW50ZXJmYWNlIElHUG9kYW5pTW9kZWwge1xyXG4gICAgICAgIEl4cDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBJeHBFeGlzdDogYm9vbGVhbiB8IG51bGwsXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vI3JlZ2lvbiBPYnNsdWhhIGZpbHRlciBwYW5lbHVcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaWRhIHBybyB2eXR2b3JlbmkgcGFyYXJhbWV0cnUgcG9tb2NpIGt0ZXJ5Y2ggc2Ugdnl0dm9yaSBmaWx0ZXJQYW5lbFxyXG4gICAgICogKi9cclxuICAgIGNsYXNzIEdSb3pGaWx0ZXJQYW5lbFBhcmFtcyB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvxZllbsOtIHBhcmFtZXRyxa8gZmlsdGVycGFuZWx1IHBybyBST1pcclxuICAgICAgICAgKiBAcmV0dXJucyB7IElHRmlsdGVyUGFuZWxPcHRpb25zPFREYXRhPiB9IHbDvXNsZWRuw6kgcGFyYW1ldHJ5IGZpbHRlcnBhbmVsdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGdldEZpbHRlclBhbmVsUGFyYW1zID0gKFxyXG4gICAgICAgICAgICBzZXpuYW06IEdTZXpuYW1Eb2tsYWR1VGFiLFxyXG4gICAgICAgICAgICBkb2t1bWVudFBhcmFtczogU3NsLkludGVyZmFjZS5HRG9rdW1lbnRHZXRDb2x1bW5QYXJhbXNSZXNwb25zZUR0byxcclxuICAgICAgICAgICAgZmlsdGVyOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVVjdEZpbHRyU2V6bmFtUGV2bmVcclxuICAgICAgICApOiBJR0ZpbHRlclBhbmVsT3B0aW9uczxhbnk+ID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIE9ibGliZW5lIHBvbG96a3kgdmUgZmlsdHJ1XHJcbiAgICAgICAgICAgIGNvbnN0IGZhdm9yaXRlczogc3RyaW5nW10gPSBbXCJpeHBcIiwgXCJpeHNfdHlwXCIsIFwidmxhc3RuaV9kb2tsYWR5XCJdO1xyXG5cclxuICAgICAgICAgICAgLy8gTmF6ZXYgdGVtYSBwcm8gdGlza292b3Ugc2VzdGF2dVxyXG4gICAgICAgICAgICBjb25zdCB0aXNrb3ZlVGVtYTogc3RyaW5nID0gXCJyb3pfcHRtX2Rva3phdTFcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIHNsb3VwZWMgeiBEVE8gcHJvIGZpbHRyIFwiKnZsYXN0bsOtXCIgbmVibyBudWxsLCBwb2t1ZCBuZW3DoSBiw710LiBwb2t1ZCBqZSB6YWTDoW5vIHBvbGUgbyBqZWRub20gcHJ2a3UsIGJlcmUgc2UsIMW+ZSBwb2zDrcSNa28gamUgdHlwdSBtdWx0aVxyXG4gICAgICAgICAgICBjb25zdCBmaWx0clZsYXN0bmk6IHN0cmluZyA9IFwiaXhzX2Z1bl9jaWxcIjsgLy8gVE9ETzogSmUgdG9obGUgZG9icmUgPyBQcm9jIHRhbSBuZW5pIGl4c19mdW5fYWt0ID8/XHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b8WZZW7DrSBzdGFuZGFyZG7DrWNoIHBhcmFtZXRyxa8gZmlsdGVycGFuZWx1IHBybyBFS08gbW9kdWx5XHJcbiAgICAgICAgICAgIC8vIEByZXR1cm5zIHsgSUdGaWx0ZXJQYW5lbE9wdGlvbnM8VERhdGE+IH0gdsO9c2xlZG7DqSBwYXJhbWV0cnkgZmlsdGVycGFuZWx1XHJcbiAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuZ2V0RmlsdGVyUGFyYW1zPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pGaWx0ckRva2xhZHU+KFxyXG4gICAgICAgICAgICAgICAgbmV3IEdSb3pGaWx0ZXJGb3JtKHNlem5hbSkuY3JlYXRlRmlsdGVyRm9ybShkb2t1bWVudFBhcmFtcyksIC8vIFZ5dHZvcmVuaSBwb2xlIGplZG5vdGxpdnljaCBmb3JtdSB0dm9yaWNpY2ggZmlsdGVyUGFuZWxcclxuICAgICAgICAgICAgICAgIGZhdm9yaXRlcywgXHJcbiAgICAgICAgICAgICAgICB0aXNrb3ZlVGVtYSxcclxuICAgICAgICAgICAgICAgIGZpbHRyVmxhc3RuaSxcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCwgLy8gW2FwcGx5XSBtZXRvZGEgcHJvIG5hxI10ZW7DrSBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEhhcmRGaWx0ZXIoZmlsdGVyKSwgLy8gaGFyZEZpbHRlclxyXG4gICAgICAgICAgICAgICAgdHJ1ZSwgIC8vIFtuYXZpZ2F0b3JJbkRldGFpbF0gem9icmF6aXQgbmF2aWfDoXRvciB2IGRldGFpbHUgZmlsdHJ1P1xyXG4gICAgICAgICAgICAgICAgc2V6bmFtIC8vIFtnY29udGVudF0gY29udGVudFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIG9iamVrdHUgcGV2bmVobyBmaWx0cnUgZGxlIGZpbHRydSB6YXNsYW5laG8geiBqaW5laG8gZm9tdWxhcmVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0SGFyZEZpbHRlciA9IChmaWx0ZXI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBVY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5OZWV2aWRvdmFuZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBzdGF2X2V2aTogeyB2OiAyMCB9IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLktlU2NodmFsZW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHNfemF1OiB7IHY6IDMwMCB9IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLktaYXVjdG92YW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHNfemF1OiB7IHY6IDQwMCB9IH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIFVjdC5JbnRlcmZhY2UuR0VVY3RGaWx0clNlem5hbVBldm5lLlN0b3Jub3ZhbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgc196YXU6IHsgdjogOTAgfSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSBVY3QuSW50ZXJmYWNlLkdFVWN0RmlsdHJTZXpuYW1QZXZuZS5VemF2cmVuZTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBzX3phdTogeyB2OiA1MCB9IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmlkYSBwcm8gdnl0dm9yZW5pIGZpbHRyb3ZhY2lobyBwYW5lbHUgbmFkIGdyaWRlbVxyXG4gICAgICogKi9cclxuICAgIGNsYXNzIEdSb3pGaWx0ZXJGb3JtIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZGtheiBuYSB0cmlkdSwga2Uga3RlcmUgYnVkdSBmaWx0ciB2YXphdFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXpuYW06IEdTZXpuYW1Eb2tsYWR1VGFiO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb25zdHJ1a3RvclxyXG4gICAgICAgICAqIEBwYXJhbSBzZXpuYW0gT2RrYXogbmEgdHJpZHUsIGtlIGt0ZXJlIGJ1ZHUgZmlsdHIgdmF6YXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3Ioc2V6bmFtOiBHU2V6bmFtRG9rbGFkdVRhYikge1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbSA9IHNlem5hbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrb2xla2NlIGZvcm11bGFydSBGb3JtcyBwcm8gdnl0dm9yZW5pIGZpbHRlckZvcm11XHJcbiAgICAgICAgICogQHBhcmFtIGRva3VtZW50UGFyYW1zIEluZm9ybWFjZSBvIFNTTCB6aXNrYW5lIHBvbW9jaSBmdW5rY2UgdiBTZXpuYW11XHJcbiAgICAgICAgICogQHJldHVybnMgVnJhY2kgcG9sZSBqZWRub3RsaXZ5Y2ggZm9ybXVsYXJ1IGt0ZXJlIHR2b3JpIGZpbHRyRm9ybVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlckZvcm0gPSAoZG9rdW1lbnRQYXJhbXM6IFNzbC5JbnRlcmZhY2UuR0Rva3VtZW50R2V0Q29sdW1uUGFyYW1zUmVzcG9uc2VEdG8pOiBGb3Jtcy5Gb3JtW10gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVaYWxvemthT2JlY25hKCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVphbG96a2FTdGF2eSgpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVaYWxvemthWmFwaXN5KCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVphbG96a2FWbGFzdG5vc3RpKCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVphbG96a2FEb2t1bWVudChkb2t1bWVudFBhcmFtcyksXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3Jlbmkgb2JlY25lIGNhc3RpIHogZm9ybXVsYXJlIERldGFpbCBmaWx0cnVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlWmFsb3prYU9iZWNuYSA9ICgpOiBGb3Jtcy5Gb3JtID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwMDRcIiwgLy9SQyAzMDI1MDAwNCA6IE9iZWNuw6FcclxuICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzA2NTAwMTJcIikgLy9SQyAzMDY1MDAxMiA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJpeHBcIiB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMTUwMDUwXCIpIC8vUkMgMzAxNTAwNTAgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKCBcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIiwgLy8gZmllbGRUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwgLy8gZmllbGRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgeyAvLyBleHRlbmRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3V6ZVJPWjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IHRoaXMuc2V6bmFtLmdsb2JhbHMuRGF0YWJhc2VQYXJhbXMhLlBvdXppdGlNYXRlcmlhbG92eWNoS29tcGV0ZW50dSA/IFsxMTAwLCAxMTg1XSA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMTUwMDU1XCIpIC8vUkMgMzAxNTAwNTUgOiBEcnVoIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIiwgLy8gZmllbGRUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NkcmQoKSwgLy8gZmllbGRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgeyAvLyBleHRlbmRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZHJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckxpbWl0OiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogWzIsIDMsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDIxLCAyMiwgMjMsIDI0LCAyNSwgMzAsIDMxLCAzNCwgNTQsIDYyLCA2MywgNjYsIDY5XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDAwNVwiKSAvL1JDIDMwMjUwMDA1IDogxIzDrXNsbyDDusSNdMOhcm55XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnc2VsZWN0Ym94XCIsIC8vIGZpZWxkVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXVzKCksICAvLyBmaWVsZE9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICB7IC8vIGV4dGVuZE9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY28xPXZhbHVlLmljbzttb2RlbC51Y3MxPXZhbHVlLnVjczttb2RlbC51dXM9dmFsdWUudXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dXVzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfb2Q6IFwiPD0gXCIgKyB0aGlzLnNlem5hbS5nbG9iYWxzLkVrb1BhcmFtcz8uUm9rLCAvLyAgIGNvbnRlbnQuc2VydmVyQ29udGV4dC5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfZG86IFwiPj0gXCIgKyB0aGlzLnNlem5hbS5nbG9iYWxzLkVrb1BhcmFtcz8uUm9rLCAvLyBjb250ZW50LnNlcnZlckNvbnRleHQucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5zZXpuYW0uZ2xvYmFscy5Fa29QYXJhbXM/LkljbywgLy8gY29udGVudC5zZXJ2ZXJDb250ZXh0LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhpcy5zZXpuYW0uZ2xvYmFscy5Fa29QYXJhbXM/LlVjcyAvLyBjb250ZW50LnNlcnZlckNvbnRleHQudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRHJ1aHkgc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2NoZWNrXCIsIC8vIGZpZWxkVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIHsgLy8gZmllbGRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidmxhc3RuaV9kb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAyNTAwMDZcIiwgLy9SQyAzMDI1MDAwNiA6IFZsYXN0bsOtIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMTUwMDI1XCIpIC8vUkMgMzAxNTAwMjUgOiBWbGFzdG7DrWtcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIiwgLy8gZmllbGRUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ3LThcIiwgLy8gZmllbGRXaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksIC8vIGZpZWxkT3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIHsgLy8gZXh0ZW5kT3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fY2lsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19mdW5fY2lsPWl4c19mdW47aXhzX2Z1bl90eHQ9bmF6ZXY7aXhzX2Z1bl9yZWZfdHh0PW5hemV2X3JlZjtpeHNfZnVuX3N1X3R4dD1uYXpldl9zdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEFnZW5kOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVnJmdUFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1SXhwRGVuOiB0aGlzLnNlem5hbS5nbG9iYWxzIS5Fa29QYXJhbXMhLkl4cERlbiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBWcmZ1U3VicmFkYTogdGhpcy5zZXpuYW0uZ2xvYmFscyEuRWtvUGFyYW1zIS5TdWJyYWRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkgXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgLy8gZmllbGRUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ3LTRcIiwgLy8gZmllbGRXaWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmdW5faGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMjUwMDQwXCIsIC8vUkMgMzAyNTAwNDAgOiBIaXN0b3JpZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAxNTAwNTRcIikgLy9SQyAzMDE1MDA1NCA6IFJlYWxpesOhdG9yXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnc2VsZWN0Ym94XCIsIC8vIGZpZWxkVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zcmVhKCksIC8vIGZpZWxkT3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjaXNfcmVhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImljbzM9aWNvOyBjaXNfcmVhbD1jaXNfcmVhbDtjaXNfcmVhbF90eHQ9bmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5zZXpuYW0uZ2xvYmFscy5Fa29QYXJhbXM/LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDE1MDA1M1wiKSAvL1JDIDMwMTUwMDUzIDogS29tcGV0ZW50XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3Nrb20oKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl92eXJpelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY280PXZhbHVlLmljbzttb2RlbC5peHNfZnVuX3Z5cml6PXZhbHVlLml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfa29tOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5zZXpuYW0uZ2xvYmFscy5Fa29QYXJhbXM/LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAvLyBTa3VwaW5hIGludHJ2YWx1IHMgY2lzbGFtYVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMTUwMDExXCIsIC8vUkMgMzAxNTAwMTEgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmFjX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMDE1MDAxMFwiLCAvL1JDIDMwMTUwMDEwIDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMDI1MDAwN1wiLCAvL1JDIDMwMjUwMDA3IDogxIzDrXNsbyByb3pwb8SNdG92w6lobyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfaXhlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmFjX2l4ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAxNTAwMzZcIiwgLy9SQyAzMDE1MDAzNiA6IMSMw6FzdGthIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhJbk1vZGVsOiBcIm1vZGVsLmNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tT3B0QWxsOiB7IGRlY2ltYWxzOiAyLCByZXR1cm5UeXBlOiBcImRlY2ltYWxcIiwgdGhvdXNhbmRzU2VwYXJhdG9yOiAnICcsIGZpeGVkOiBmYWxzZSwgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy8gSW50ZXJ2YWx5IGRhdHVtb3ZlXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcImpyZXM6MzAxNTAwMzBcIiwgLy9SQyAzMDE1MDAzMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoSW5Nb2RlbDogXCJtb2RlbC5yb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMTUwMDMxXCIsIC8vUkMgMzAxNTAwMzEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwibW9kZWwubWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuR2luLlByZWZhYnMuaW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJqcmVzOjMwMTUwMDMyXCIsIC8vUkMgMzAxNTAwMzIgOiBEZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aEluTW9kZWw6IFwibW9kZWwuZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDA4XCIpIC8vUkMgMzAyNTAwMDggOiBQb3NsZWRuw61jaFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLk51bWJlci5kZWNpbWFsKDApLCBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibnVtX3Jvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5UeXBlOiBcIm51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy8gU2VrY2UgcyBwb3Bpc2VtXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcInctTC0xMiB3LU0tMTIgdy1TLTEyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDA5XCIpIC8vUkMgMzAyNTAwMDkgOiBQb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoKSxcclxuICAgICAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzX2Rva2xhZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMTBcIikgLy9SQyAzMDI1MDAxMCA6IFBvem7DoW1rYSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuU3RyaW5nLndpdGhPcGVyYXRvcnMoKSwgXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvem5hbWthX2l4cFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAxNTAwNDRcIikgLy9SQyAzMDE1MDA0NCA6IEtsw63EjW92w6Egc2xvdmFcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsS2xpY1Nsb3ZhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrc19kYlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJqcmVzOjMwMjUwMDExXCIsIC8vUkMgMzAyNTAwMTEgOiBaYWRlanRlIGtsw63EjW92w6Egc2xvdmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3NfZGI9dmFsdWUua2xfc2xvdm9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0QnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEJ1dHRvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFZ5dHZvcmVuaSBjYXN0aSBzZSBzdGF2eSB6IGZvcm11bGFyZSBEZXRhaWwgZmlsdHJ1XHJcbiAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlWmFsb3prYVN0YXZ5ID0gKCk6IEZvcm1zLkZvcm0gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIixcclxuICAgICAgICAgICAgICAgIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwMTJcIiwgLy9SQyAzMDI1MDAxMiA6IFN0YXZ5XHJcbiAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMwMjUwMDE0XCIpIC8vUkMgMzAyNTAwMTQgOiBTdGF2eSBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAxNTAxNjFcIikgLy9SQyAzMDE1MDE2MSA6IFN0YXYgcmVhbGl6YWNlXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3phdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3NfemF1X3R4dH1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic196YXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyQ29sdW1uczogW1wic196YXVfdHh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwMDE1XCIsIHNfemF1OiAtMSB9LCAvL1JDIDMwMjUwMDE1IDogbmV1csSNZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwMDE2XCIsIHNfemF1OiA1IH0sIC8vUkMgMzAyNTAwMTYgOiBuw6F2cmhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc196YXVfdHh0OiBcImpyZXM6MzAyNTAwMTdcIiwgc196YXU6IDcwMCB9LCAvL1JDIDMwMjUwMDE3IDogbmVwxZlpcHJhdmVubyBrIHV6w6F2xJtyY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc196YXVfdHh0OiBcImpyZXM6MzAyNTAwMThcIiwgc196YXU6IDgwMCB9LCAvL1JDIDMwMjUwMDE4IDogbmV1emF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc196YXVfdHh0OiBcImpyZXM6MzAyNTAwMTlcIiwgc196YXU6IDAgfSwgLy9SQyAzMDI1MDAxOSA6IG5lcmVhbGl6b3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNfemF1X3R4dDogXCJqcmVzOjMwMjUwMDIwXCIsIHNfemF1OiAzMCB9LCAvL1JDIDMwMjUwMDIwIDogc2NodsOhbGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDIwMVwiLCBzX3phdTogMzAwIH0sIC8vUkMgMzAyNTAyMDEgOiBrZSBzY2h2w6FsZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDAyMVwiLCBzX3phdTogOTAgfSwgLy9SQyAzMDI1MDAyMSA6IHN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDAyMlwiLCBzX3phdTogNTAgfSwgLy9SQyAzMDI1MDAyMiA6IHV6YXbFmWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzX3phdV90eHQ6IFwianJlczozMDI1MDAyM1wiLCBzX3phdTogNDAgfSwgLy9SQyAzMDI1MDAyMyA6IHJlYWxpem92w6FubztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc196YXVfdHh0OiBcImpyZXM6MzAyNTAyMDBcIiwgc196YXU6IDQwMCB9LCAvL1JDIDMwMjUwMjAwIDogayByZWFsaXphY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc196YXVfdHh0OiBcImpyZXM6MzAyNTAwMjRcIiwgc196YXU6IDEwIH0sIC8vUkMgMzAyNTAwMjQgOiByZWFsaXpvdsOhbm9vIMSNw6FzdGXEjW7Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBcInNfemF1XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzAyNTAwMjVcIikgLy9SQyAzMDI1MDAyNSA6IFN0YXYgZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfZXZpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1XaWR0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcInN0YXZfZXZpX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntzdGF2X2V2aV90eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInN0YXZfZXZpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3Rhdl9ldmlfdHh0OiBcImpyZXM6MzAyNTAwMjZcIiwgc3Rhdl9ldmk6IDEwIH0sIC8vUkMgMzAyNTAwMjYgOiBldmlkb3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpX3R4dDogXCJqcmVzOjMwMjUwMDI3XCIsIHN0YXZfZXZpOiAyMCB9LCAvL1JDIDMwMjUwMDI3IDogbmVldmlkb3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpX3R4dDogXCJqcmVzOjMwMjUwMDI4XCIsIHN0YXZfZXZpOiAzMCB9LCAvL1JDIDMwMjUwMDI4IDogYWt0dcOhbG7EmyBldmlkb3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpX3R4dDogXCJqcmVzOjMwMjUwMDI5XCIsIHN0YXZfZXZpOiA0MCB9LCAvL1JDIDMwMjUwMDI5IDogcMWZZWV2aWRvdmFuw6kgelxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzdGF2X2V2aV90eHQ6IFwianJlczozMDI1MDAzMFwiLCBzdGF2X2V2aTogNTAgfSwgLy9SQyAzMDI1MDAzMCA6IHDFmWVldmlkb3ZhbsOpIGRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHN0YXZfZXZpX3R4dDogXCJqcmVzOjMwMjUwMDMxXCIsIHN0YXZfZXZpOiA2MCB9LCAvL1JDIDMwMjUwMDMxIDogcMWvdm9kbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBcInN0YXZfZXZpXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMwMTUwMTYyXCIpIC8vUkMgMzAxNTAxNjIgOiBab2JyYXplbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMDI1MDAzMlwiKSAvL1JDIDMwMjUwMDMyIDogUMWZw616bmFrIHpvYnJhemVuw61cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfdmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtV2lkdGg6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXJDb2x1bW5zOiBbXCJwcml6X3ZpZXdfdHh0XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3ByaXpfdmlld190eHR9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInByaXpfdmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiBudWxsLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBwcml6X3ZpZXdfdHh0OiBcImpyZXM6MzAyNTAwMzNcIiwgcHJpel92aWV3OiAwIH0sIC8vUkMgMzAyNTAwMzMgOiBwxZllxI10ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHByaXpfdmlld190eHQ6IFwianJlczozMDI1MDAzNFwiLCBwcml6X3ZpZXc6IDEwIH0sIC8vUkMgMzAyNTAwMzQgOiBuZXDFmWXEjXRlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IFwicHJpel92aWV3XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVnl0dm9yZW5pIGNhc3RpIHMgcm96cG9jdG92eW1pIHphcGlzeSB6IGZvcm11bGFyZSBEZXRhaWwgZmlsdHJ1XHJcbiAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlWmFsb3prYVphcGlzeSA9ICgpOiBGb3Jtcy5Gb3JtID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLCAgICAgICAgLy9KZSBwb3Zpbm55IHBybyBzcHJhdm5lIG1hcG92YW5pIG5henZ1IHByb3BlcnR5IGEgY2FwdGlvbiFcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOa3NcIiwgICAgIC8vSmUgcG92aW5ueSBwcm8gc3ByYXZuZSBtYXBvdmFuaSBuYXp2dSBwcm9wZXJ0eSBhIGNhcHRpb24hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcIm5rc1wiLCBkKTsgfSwgLy9OdXRuZSBwcmlkYXQgY2VsbFRlbXBsYXRlIHBybyBzcHJhdm5lIHpvYnJhemVuaSBob2Rub3R5IChsemUgcG91eml0IGRlZmF1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTnV0bmUgcHJpZGF0IGVkaXRvciAocHJlZmFieSBqc291IHYgTlMgR29yZGljLkVrby5GaWx0ZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5zZXpuYW0uZ2xvYmFscy5Fa29QYXJhbXM/LkljbyA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ubHlBY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0UHJvaGw6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm5rc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGQoR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRFZGl0b3JzKHRoaXMuc2V6bmFtLCB7IGNoZWNrVWV0ZTogdGhpcy5zZXpuYW0uZ2xvYmFscy5Fa29QYXJhbXM/LlByaXpDaGVja1VldGUsIHdpbGRjYXJkOiB0aGlzLnNlem5hbS5nbG9iYWxzLk90aGVycz8uV2lsZGNhcmQgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAzNVwiLCAvL1JDIDMwMjUwMDM1IDogUMWZw61qbXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gOC45LiBUSzogdXByYXZlIGRsZSBCb2hvdXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJjMFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwiYzBcIiwgZCwgeyB3aWxkY2FyZDogY29udGVudC5HbG9iYWxzLk90aGVycz8uV2lsZGNhcmQgfSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAoZHRvKSB7IHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZShkdG8uYzApOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcIk1EXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAzNlwiLCAvL1JDIDMwMjUwMDM2IDogVsO9ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA4LjkuIFRLOiB1cHJhdmUgZGxlIEJvaG91c2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImMxXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGR0bykgeyByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZvcm1hdEludGVydmFsVmFsdWUoZHRvLmMxKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFcIiwgY2FwdGlvbjogXCJEYWxcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHtcclxuICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMSwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTFcIixcclxuICAgICAgICAgICAgICAgIHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwMzdcIiwgLy9SQyAzMDI1MDAzNyA6IFJvenBvxI10b3bDqSB6w6FwaXN5XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGxhYmVsOiBcImpyZXM6MzAyNTAwMzhcIiwgY3VzdG9tQ2xhc3M6IFwidy1MLTEyIHctTS0xMiB3LVMtMTJcIiB9KSAvL1JDIDMwMjUwMDM4IDogRmluYW7EjW7DrSBwcm9maWxcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDM3XCIpIC8vUkMgMzAyNTAwMzcgOiBSb3pwb8SNdG92w6kgesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uUHJlZmFicy5jZnVFbGVtZW50cyh7IGdyaWRGb3JtYXQ6IGdmIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJ6YXBpc3lcIiB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IGN1c3RvbUNsYXNzOiBcInctTC0xMiB3LU0tMTIgdy1TLTEyXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwMDM5XCIpIC8vUkMgMzAyNTAwMzkgOiBQb3BpcyBwb2xvxb5reVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlN0cmluZy53aXRoT3BlcmF0b3JzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc19wZXBcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFZ5dHZvcmVuaSBjYXN0aSBzIHZsYXN0bm9zdG1pIHogZm9ybXVsYXJlIERldGFpbCBmaWx0cnVcclxuICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVaYWxvemthVmxhc3Rub3N0aSA9ICgpOiBGb3Jtcy5Gb3JtID0+IHtcclxuICAgICAgICAgICAgLy8gVG9obGUgemtvbnRyb2xvdmF0IGEgcHJlZGVsYXRcclxuICAgICAgICAgICAgbGV0IHN4c1R5cDogeyBzeHM6IHN0cmluZyB8IG51bGwsIHR5cF9vYmo6IG51bWJlciB9W10gPSBbeyBzeHM6IG51bGwsIHR5cF9vYmo6IFVjdC5JbnRlcmZhY2UuR0VUeXBPYmpla3R1LktuaWhhUk9aIH1dO1xyXG4gICAgICAgICAgICB0aGlzLnNlem5hbS5peHNUeXB5LmZvckVhY2goaXRlbSA9PiBzeHNUeXAucHVzaCh7IHN4czogaXRlbSwgdHlwX29iajogVWN0LkludGVyZmFjZS5HRVR5cE9iamVrdHUuVHlwRG9rdW1lbnR1IH0pKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oe1xyXG4gICAgICAgICAgICAgICAgdGFiTGFiZWw6IFwianJlczozMDI1MDUwM1wiLCAvL1JDIDMwMjUwNTAzIDogVmxhc3Rub3N0aVxyXG4gICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNTAyXCIpIC8vUkMgMzAyNTA1MDIgOiBSb3rFoWnFmXVqw61jw60gdmxhc3Rub3N0aVxyXG4gICAgICAgICAgICAgICAgLmFkZFByZWZhYihcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuR2luLlByZWZhYnMuRmllbGQuR0dpblZsYXN0bm9zdGlFeHRQcm9wc0ZpbHRlckZpZWxkKCBcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2bGFzdG5vc3RpX3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVzdUxvZ292YW5pOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmk6IEdvcmRpYy5HaW4uR2xvYmFscy5FbnVtcy5EdXZvZEhsZWRhbmlFc3UuemFkYW5pRXN1VkhsZWRhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJwcF9peHNfdHlwOiB0aGlzLnNlem5hbS5peHNUeXB5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwX29iajogW1VjdC5JbnRlcmZhY2UuR0VUeXBPYmpla3R1LktuaWhhUk9aXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRfc3hzOiBzeHNUeXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJqcmVzOjMwMjUwNTA0XCIpIC8vUkMgMzAyNTA1MDQgOiBQb3Bpc27DqSB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRQcmVmYWIoXHJcbiAgICAgICAgICAgIC8vICAgICAgICBHb3JkaWMuR2luLlByZWZhYnMuRmllbGQuR0dpblZsYXN0bm9zdGlGaWx0ZXJGaWVsZCggXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBuYW1lOiBcInZsYXN0bm9zdGlfc1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBlc3VMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgSXhwOiBcIlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaUVzdVZIbGVkYW5pXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICApXHJcbiAgICAgICAgICAgIC8vKVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBWeXR2b3JlbmkgY2FzdGkgcyBkb2t1bWVudGVtIHogZm9ybXVsYXJlIERldGFpbCBmaWx0cnVcclxuICAgICAgICAqIEBwYXJhbSBkb2t1bWVudFBhcmFtcyBJbmZvcm1hY2UgbyBTU0wgemlza2FuZSBwb21vY2kgZnVua2NlIHYgU2V6bmFtdVxyXG4gICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVphbG96a2FEb2t1bWVudCA9IChkb2t1bWVudFBhcmFtczogU3NsLkludGVyZmFjZS5HRG9rdW1lbnRHZXRDb2x1bW5QYXJhbXNSZXNwb25zZUR0byk6IEZvcm1zLkZvcm0gPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50SXNsLkFkZERva3VtZW50RmlsdGVyRmllbGRzSW1tZWRpYXRlKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuc2V6bmFtLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogZG9rdW1lbnRQYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiRG9rdW1lbnRcIiB9KS5hZGRTZWN0aW9uKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBHU2V6bmFtRG9rbGFkdVRhYi5nZXRQcmVzZXREb2t1bWVudEZpZWxkcygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlTGV2ZWxzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWxaFlY2hueSBuYXBvamVuw6kgZmlsdHJ5IGJ1ZG91IG3DrXQgdiBuw6F6dnUgcHJlZml4IFwiZG9rdW1lbnRcIiAoemRlIHRlZHkgZmlsdHJhxI1uw60gZW51bSBidWRlIG9ic2Fob3ZhdCBob2Rub3R5IGRva3VtZW50X2l4cCwgZG9rdW1lbnRfaXhzX2Z1bl9ha3QgYSBkb2t1bWVudF9uYXpldikuIFTDrW0gamUgbW/Fvm7DqSBvZGxpxaFpdCBmaWx0cnksIGt0ZXLDqSBzcHJhdnVqaSBzw6FtIGpha28gYXV0b3IgZW50aXR5IGEgdHksIGt0ZXLDqSBzaSDFmWXFocOtIGRva3VtZW50IHPDoW0uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNjb3BlOiBcImRva3VtZW50XCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHNPcHRpb25zOiB7fSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8jcmVnaW9uIE9ic2x1aGEgZ3JpZHVcclxuXHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBUcmlkYSBvYnNsdWh1amljaSBzbG91cGNlIHYgZ3JpZHVcclxuICAgIC8vICogKi9cclxuICAgIC8vY2xhc3MgR1JvekdyaWRDb2x1bW5zIHtcclxuXHJcbiAgICAvLyAgICAvKipcclxuICAgIC8vICAgICAqIE1ldG9kYSBwcm8gdnl0dm9yZW5pIHNsb3VwY2UgZ3JpZHVcclxuICAgIC8vICAgICAqIEBwYXJhbSBkb2N1bWVudFBhcmFtcyBTU0xcclxuICAgIC8vICAgICAqL1xyXG4gICAgLy8gICAgcHVibGljIGdldEdyaWRGb3JtYXRDb2x1bW5zID0gKFxyXG4gICAgLy8gICAgICAgIHNlem5hbTogR1Nlem5hbURva2xhZHVUYWIsXHJcbiAgICAvLyAgICAgICAgZG9jdW1lbnRQYXJhbXM6IEdvcmRpYy5Tc2wuSW50ZXJmYWNlLkdEb2t1bWVudEdldENvbHVtblBhcmFtc1Jlc3BvbnNlRHRvXHJcbiAgICAvLyAgICApOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PFVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG8+ID0+IHtcclxuXHJcbiAgICAvLyAgICAgICAgY29uc3QgY29sdW1uczogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvPiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PFVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG8+KClcclxuICAgIC8vICAgICAgICAgICAgLmFkZFR5cEVudGl0eSh7IGZyYWdtZW50OiBVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnR5cF9lbnRpdHlfaWNvIH0pXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRWbGFzdG5pY3R2aSh7IGZyYWdtZW50OiBVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnZsYXN0bmljdHZpIH0pXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRQcmVjdGVubygpXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRQcmVldmlkZW5jZSh7IGZyYWdtZW50OiBVY3QuSW50ZXJmYWNlLkdSb3pTZXpuYW1Eb2tsYWR1RHRvRnJhZ21lbnRzLnByZWV2aWRlbmNlIH0pXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRQb2NldEVsUHJpbG9oKHsgbmFtZTogXCJwb2NfZXByaVwiLCBmaWVsZDogXCJwb2NfZXByaVwiLCBmcmFnbWVudDogRWtvLkludGVyZmFjZS5HV2ZsRm9yRWtvRHRvTmFtZXMuZWxfcHJpbG9oeV9wb2NldCB9KVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkRWxPYnJheigpXHJcbiAgICAvLyAgICAgICAgICAgIC8vIFByaWRhbmkgc2xvdXBjdSBXRkxcclxuICAgIC8vICAgICAgICAgICAgLmFkZFdmbENvbHVtbnMoKVxyXG4gICAgLy8gICAgICAgICAgICAvLyBiYXJldm5lIG96bmFjZW5pIHJhZGt1XHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRCYXJldm5lT3puYWNlbmkoeyBmcmFnbWVudDogVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy51em8gfSwgdm9pZCAwLCB2b2lkIDAsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAocm93KSA9PiByb3cuaXhzX2Z1bl9ha3QgIT0gKCQuY29udGVudChcIm1haW5cIikgYXMgYW55KS5JeHNGdW5Ba3QsIHNlem5hbS5nbG9iYWxTZXR0aW5nc1xyXG4gICAgLy8gICAgICAgICAgICApXHJcbiAgICAvLyAgICAgICAgICAgIC8vIERhdGEgeiBobGF2aWNreSBkb2tsYWR1XHJcbiAgICAvLyAgICAgICAgICAgIC8vIFRPRE8gLSBudXRubyB2c3VkZSBkb3Bsbml0IGZyYWdtZW50eSB6IGR1dm9kdSBwcm9maWx1XHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRQaWQoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuaXhwIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAuYWRkQWdlbmRvdmVDaXNsbygpXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRFdmlkZW5jbmlDaXNsbygpXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGREcnVoRG9rbGFkdSgpXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRSb2soKVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkTWVzaWMoKVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkRGVuKClcclxuICAgIC8vICAgICAgICAgICAgLmFkZENpc2xvRG9rbGFkdSgpIC8vLCB7IGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5hY19peGUgfSk7XHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRUeXBEb2tsYWR1KCkgLy8sIHsgZnJhZ21lbnQ6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLml4c190eXBfdHh0IH0pO1xyXG4gICAgLy8gICAgICAgICAgICAuYWRkU3RhdkRva2xhZHUoKSAvLywgeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2Uuc196YXVfdHh0IH0pO1xyXG4gICAgLy8gICAgICAgICAgICAuYWRkQ2FzdGthKHsgbmFtZTogXCJjXCIsIGZpZWxkOiBcImNcIiwgZGVzY3JpcHRpb246IFwianJlczozMDI1MDI1OFwiIH0pIC8vLCB7IGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5jIH0pOyAvL1JDIDMwMjUwMjU4IDogxI3DoXN0a2EgbmEgZG9rbGFkdVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkWnByYWNvdmF0ZWwoeyBmcmFnbWVudDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuaXhzX2Z1bl9ha3RfdHh0IH0pIC8vLCB7IGZyYWdtZW50OiBHb3JkaWMuVWN0LkludGVyZmFjZS5peHNfZnVuX2FrdF90eHQgfSk7XHJcbiAgICAvLyAgICAgICAgICAgIC5hZGRQb3BpcygpXHJcbiAgICAvLyAgICAgICAgICAgIC8vIHBvbW9jbmUgbmV2aWRpdGVsbmUgcG9sZSBwcm8gcG9kbWluZW5lIGZvcm1hdG92YW5pXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInNfemF1XCIsIGhpZGRlbjogdHJ1ZSB9KVxyXG4gICAgLy8gICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJwcmVldmlkb3Zhbm9cIiwgaGlkZGVuOiB0cnVlIH0pXHJcbiAgICAvLyAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInByaXpfdmlld1wiLCBoaWRkZW46IHRydWUgfSk7XHJcblxyXG4gICAgLy8gICAgICAgIGxldCBzY29wZURva3VtZW50ID0gc2V6bmFtLmV4dGVuZFNjb3BlKFxyXG4gICAgLy8gICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAvLyAgICAgICAgICAgIFVjdC5JbnRlcmZhY2UuR1JvelNlem5hbURva2xhZHVEdG9GcmFnbWVudHMuZG9rdW1lbnQsXHJcbiAgICAvLyAgICAgICAgICAgIFwiRG9rdW1lbnRcIiwgLy9cImpyZXM6MzAyNTA1MDBcIiwgLy9SQyAzMDI1MDUwMCA6IERva3VtZW50XHJcbiAgICAvLyAgICAgICAgICAgIFwiXCJcclxuICAgIC8vICAgICAgICApO1xyXG4gICAgLy8gICAgICAgIC8vIHNsb3VwY2UgZG9rdW1lbnR1XHJcbiAgICAvLyAgICAgICAgaWYgKGRvY3VtZW50UGFyYW1zICE9IG51bGwpXHJcbiAgICAvLyAgICAgICAgICAgIEdvcmRpYy5Tc2wuV2ViQ2xpZW50LkdEb2t1bWVudElzbC5BZGRHcmlkQ29sdW1uc0ltbWVkaWF0ZShcclxuICAgIC8vICAgICAgICAgICAgICAgIGRvY3VtZW50UGFyYW1zLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgY29sdW1ucyxcclxuICAgIC8vICAgICAgICAgICAgICAgIEdTZXpuYW1Eb2tsYWR1VGFiLmdldFByZXNldERva3VtZW50Q29sdW1ucygpLFxyXG4gICAgLy8gICAgICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIHNjb3BlTGV2ZWxzOiBzY29wZURva3VtZW50XHJcbiAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICk7XHJcbiAgICAvLyAgICAgICAgbGV0IHNjb3BlVmxhc3Rub3N0aSA9IHRoaXMuZXh0ZW5kU2NvcGUoXHJcbiAgICAvLyAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgIC8vICAgICAgICAgICAgVWN0LkludGVyZmFjZS5HUm96U2V6bmFtRG9rbGFkdUR0b0ZyYWdtZW50cy52bGFzdG5vc3RpLFxyXG4gICAgLy8gICAgICAgICAgICBcImpyZXM6MzAyNTA1MDFcIiwgLy9SQyAzMDI1MDUwMSA6IFZsYXN0bm9zdGlcclxuICAgIC8vICAgICAgICAgICAgLy9cIlZsYXN0bm9zdGkgc291cGlza3lcIlxyXG4gICAgLy8gICAgICAgICk7XHJcbiAgICAvLyAgICAgICAgbGV0IHNjb1YgPSAoc2NvcGVWbGFzdG5vc3RpLm1hcChpID0+IGkuc2NvcGUpIGFzIHN0cmluZ1tdKS5qb2luKEdpbi5XZWJDbGllbnQuR1NoYXJlZElzbC5OYW1lU2VwYXJhdG9yKTtcclxuICAgIC8vICAgICAgICBsZXQgc2NvVlQgPSAoc2NvcGVWbGFzdG5vc3RpLm1hcChpID0+IGk/LnNjb3BlVGl0bGUpLmZpbHRlcihpID0+IGk/LnRyaW0oKSkgYXMgc3RyaW5nW10pLmpvaW4oXCIgLSBcIik7XHJcbiAgICAvLyAgICAgICAgbGV0IHN4c1R5cDogeyBzeHM6IHN0cmluZyB8IG51bGwsIHR5cF9vYmo6IG51bWJlciB9W10gPSBbeyBzeHM6IG51bGwsIHR5cF9vYmo6IFVjdC5JbnRlcmZhY2UuR0VUeXBPYmpla3R1LktuaWhhUk9aIH1dO1xyXG4gICAgLy8gICAgICAgIHRoaXMuaXhzVHlweS5mb3JFYWNoKGl0ZW0gPT4gc3hzVHlwLnB1c2goeyBzeHM6IGl0ZW0sIHR5cF9vYmo6IFVjdC5JbnRlcmZhY2UuR0VUeXBPYmpla3R1LlR5cERva3VtZW50dSB9KSk7XHJcbiAgICAvLyAgICAgICAgLy8gUm96c2lyZW5lIHZsYXN0bm9zdGlcclxuICAgIC8vICAgICAgICBjb2x1bW5zLmFkZChHb3JkaWMuUG9waXNuZVZsYXN0bm9zdGkuY3JlYXRlU3hzVHlwR3JpZEZvcm1hdChcclxuICAgIC8vICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgc2NvcGU6IHNjb1YsXHJcbiAgICAvLyAgICAgICAgICAgICAgICBpeHNfdHlwOiB0aGlzLml4c1R5cHksXHJcbiAgICAvLyAgICAgICAgICAgICAgICB0eXBfb2JqOiBbVWN0LkludGVyZmFjZS5HRVR5cE9iamVrdHUuS25paGFST1pdLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgc3hzX3R5cDogc3hzVHlwLFxyXG4gICAgLy8gICAgICAgICAgICAgICAgc2NvcGVUaXRsZTogc2NvVlRcclxuICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICkpO1xyXG4gICAgLy8gICAgICAgIC8vIHZsYXN0bm9zdGlcclxuICAgIC8vICAgICAgICBjb2x1bW5zLmFkZChHb3JkaWMuUG9waXNuZVZsYXN0bm9zdGkuY3JlYXRlR3JpZEZvcm1hdChcInZsYXN0bm9zdGlcIikpO1xyXG5cclxuICAgIC8vICAgICAgICByZXR1cm4gY29sdW1ucztcclxuXHJcbiAgICAvLyAgICB9XHJcbiAgICAvL31cclxuXHJcbiAgICAvLyNlbmRyZWdpb25cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG59Il19